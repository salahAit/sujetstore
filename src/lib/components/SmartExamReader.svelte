<script lang="ts">
	import { onMount } from 'svelte';
	import katex from 'katex';
	import 'katex/contrib/mhchem';
	import 'katex/dist/katex.min.css';
	import {
		Loader2,
		AlertCircle,
		RefreshCw,
		FileText,
		CheckCircle2,
		Eye,
		EyeOff,
		Sun,
		BookOpen,
		Moon,
		ExternalLink,
		Clock,
		Award,
		ArrowLeft,
		ArrowRight
	} from 'lucide-svelte';
	import PdfCanvasViewer from './PdfCanvasViewer.svelte';
	import type { WebBlock, WebExamPayload, WebTableCell } from '#lib/types/web-exam';

	interface Props {
		subjectUrl: string;
		solutionUrl?: string | null;
		initialPayload?: WebExamPayload | null;
		mode?: 'exam' | 'solution';
		title?: string;
		class?: string;
	}

	let {
		subjectUrl,
		solutionUrl = null,
		initialPayload = null,
		mode = $bindable<'exam' | 'solution'>('exam'),
		title = 'قارئ الموضوع الذكي',
		class: className = ''
	}: Props = $props();

	type ReaderTheme = 'light' | 'sepia' | 'dark';

	let loading = $state(false);
	let errorMsg = $state<string | null>(null);
	let unsupportedWeb = $state(false);
	let payload = $state<WebExamPayload | null>(null);
	let serverAllowsSolution = $state(false);
	let reloadNonce = $state(0);

	// Per-exercise inline solution reveal (when global mode === 'exam')
	let revealedExercises = $state<Record<number, boolean>>({});
	// Highlighted pin in an illustrated figure (`exIdx-pinNum`)
	let activePinKey = $state<string | null>(null);

	// Reader display preferences (persisted in localStorage)
	let fontScale = $state(100);
	let readerTheme = $state<ReaderTheme>('sepia');

	onMount(() => {
		try {
			const savedScale = Number(localStorage.getItem('sujetstore_reader_scale'));
			if (Number.isFinite(savedScale) && savedScale >= 85 && savedScale <= 150) {
				fontScale = savedScale;
			}
			const savedTheme = localStorage.getItem('sujetstore_reader_theme') as ReaderTheme | null;
			if (savedTheme === 'light' || savedTheme === 'sepia' || savedTheme === 'dark') {
				readerTheme = savedTheme;
			} else if (document.documentElement.classList.contains('dark')) {
				readerTheme = 'dark';
			}
		} catch {
			// Ignore storage errors in private mode
		}
	});

	function setFontScale(next: number) {
		const clamped = Math.max(85, Math.min(150, next));
		fontScale = clamped;
		try {
			localStorage.setItem('sujetstore_reader_scale', String(clamped));
		} catch {}
	}

	function setTheme(next: ReaderTheme) {
		readerTheme = next;
		try {
			localStorage.setItem('sujetstore_reader_theme', next);
		} catch {}
	}

	function appendQuery(base: string, param: string): string {
		const clean = base.split('#')[0];
		return clean.includes('?') ? `${clean}&${param}` : `${clean}?${param}`;
	}

	let reqSeq = 0;

	async function loadWebExam(targetSubjectUrl: string) {
		const myReq = ++reqSeq;
		loading = true;
		errorMsg = null;
		unsupportedWeb = false;
		revealedExercises = {};

		try {
			const res = await fetch(
				appendQuery(targetSubjectUrl, reloadNonce > 0 ? `render=web&r=${reloadNonce}` : 'render=web'),
				{ credentials: 'include' }
			);
			if (!res.ok) {
				throw new Error(
					res.status === 403
						? 'انتهت صلاحية رابط العرض أو غير مصرح به — يرجى إعادة فتح الموضوع'
						: res.status === 429
							? 'تم تجاوز حد المشاهدات المؤقت، يرجى الانتظار قليلاً'
							: `تعذر تحميل الموضوع (HTTP ${res.status})`
				);
			}
			const data = (await res.json()) as {
				supported?: boolean;
				hasSolution?: boolean;
				exam?: WebExamPayload;
			};
			if (myReq !== reqSeq) return;
			if (!data.supported || !data.exam) {
				unsupportedWeb = true;
				payload = null;
				loading = false;
				return;
			}
			payload = data.exam;
			serverAllowsSolution = Boolean(data.hasSolution);
			loading = false;
		} catch (err: any) {
			if (myReq !== reqSeq) return;
			loading = false;
			errorMsg = err?.message || 'حدث خطأ أثناء تحميل الموضوع';
		}
	}

	// React ONLY to document identity (`subjectUrl` or `initialPayload`), NEVER re-fetching when toggling `mode`!
	$effect(() => {
		const init = initialPayload;
		const u = subjectUrl;
		const _n = reloadNonce;
		if (init) {
			payload = init;
			serverAllowsSolution = Boolean(init.hasAnySolution);
			unsupportedWeb = false;
			errorMsg = null;
			loading = false;
			revealedExercises = {};
			return;
		}
		if (typeof window === 'undefined' || !u) return;
		loadWebExam(u);
	});

	let canShowSolution = $derived(
		Boolean(payload?.hasAnySolution && (serverAllowsSolution || Boolean(solutionUrl) || Boolean(initialPayload)))
	);

	let activeOriginalPdfUrl = $derived(
		mode === 'solution' && solutionUrl ? solutionUrl : subjectUrl
	);

	function toggleExerciseSolution(idx: number) {
		revealedExercises = {
			...revealedExercises,
			[idx]: !revealedExercises[idx]
		};
	}

	function escapeHtml(s: string): string {
		return s
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function renderKatexSafe(latex: string, displayMode: boolean): string {
		try {
			return katex.renderToString(latex, {
				displayMode,
				throwOnError: false,
				strict: 'ignore'
			});
		} catch {
			return `<code>${escapeHtml(latex)}</code>`;
		}
	}

	/**
	 * Deterministic, XSS-safe rich text & KaTeX math renderer.
	 * Preserves question numbers (`1)`, `2)`, `أ)`), inequalities (`<`, `>`),
	 * underlined `إعراب` words (`<u>...</u>`), bold, italic, and dotted blanks.
	 */
	function renderRichProse(
		raw: string | undefined | null,
		opts?: { multiline?: boolean; quran?: boolean }
	): string {
		if (!raw) return '';
		const multiline = opts?.multiline ?? false;
		const isQuran = opts?.quran ?? false;

		// Isolate `$$...$$` and `$...$` math expressions first
		const tokens = String(raw).split(/(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g);
		const htmlParts = tokens.map((tok, idx) => {
			if (idx % 2 === 1) {
				if (tok.startsWith('$$') && tok.endsWith('$$')) {
					const inner = tok.slice(2, -2).trim();
					return `<span class="ser-math-display" dir="ltr">${renderKatexSafe(inner, true)}</span>`;
				}
				const inner = tok.slice(1, -1).trim();
				return `<span class="ser-math-inline" dir="ltr">${renderKatexSafe(inner, false)}</span>`;
			}

			// Protect trusted `<u>` / `</u>` tags emitted by `typstProseToWebMarkdown`
			let s = tok
				.replace(/<u>/g, '\u0001U_OPEN\u0002')
				.replace(/<\/u>/g, '\u0001U_CLOSE\u0002');

			s = escapeHtml(s);

			s = s
				.replace(/\u0001U_OPEN\u0002/g, '<u class="ser-irab-underline">')
				.replace(/\u0001U_CLOSE\u0002/g, '</u>')
				.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
				.replace(/(?<![A-Za-z0-9])_([^_\n]+)_(?![A-Za-z0-9])/g, '<em>$1</em>')
				// Dotted or underscored fill-in-the-blank spans (rendered in standard sans font so UthmanTN never hits missing glyphs)
				.replace(/(?:\.{4,}|…{2,}|_{4,})/g, '<span class="ser-blank" aria-label="فراغ">............</span>');

			if (isQuran) {
				// Style inline verse numbers `(1)` or `(١)` gracefully inside Quranic verses
				s = s.replace(/\((\d+|[\u0660-\u0669]+)\)/g, '<span class="ser-ayah-num">﴿$1﴾</span>');
			}

			if (multiline) {
				s = s.replace(/\n/g, '<br />');
			}
			return s;
		});

		return htmlParts.join('');
	}

	function normalizeMatchOption(opt: string, correct: string): boolean {
		if (!correct) return false;
		const cleanOpt = opt.replace(/[$*_`]/g, '').trim().toLowerCase();
		const cleanCorr = correct.replace(/[$*_`]/g, '').trim().toLowerCase();
		return (
			cleanOpt === cleanCorr ||
			(cleanCorr.length >= 2 && cleanOpt.includes(cleanCorr)) ||
			(cleanOpt.length >= 2 && cleanCorr.includes(cleanOpt))
		);
	}
</script>

{#if unsupportedWeb && activeOriginalPdfUrl}
	<PdfCanvasViewer url={activeOriginalPdfUrl} {title} class={className} />
{:else}
	<div
		class="ser-root ser-theme-{readerTheme} relative flex h-full w-full flex-col overflow-hidden {className}"
		aria-label={title}
	>
		<!-- Sticky Mobile-First Reader Control Bar -->
		<div class="ser-toolbar z-20 flex shrink-0 flex-wrap items-center justify-between gap-2 px-3 py-2 text-xs">
			<!-- Font Scale Controls -->
			<div class="flex items-center gap-1" dir="ltr">
				<button
					type="button"
					onclick={() => setFontScale(fontScale - 10)}
					disabled={fontScale <= 85}
					class="ser-tool-btn px-2 font-extrabold disabled:opacity-40"
					title="تصغير الخط"
					aria-label="تصغير الخط"
				>
					A-
				</button>
				<span class="min-w-[38px] text-center font-mono text-[11px] font-bold opacity-80">
					{fontScale}%
				</span>
				<button
					type="button"
					onclick={() => setFontScale(fontScale + 10)}
					disabled={fontScale >= 150}
					class="ser-tool-btn px-2 font-extrabold disabled:opacity-40"
					title="تكبير الخط"
					aria-label="تكبير الخط"
				>
					A+
				</button>
			</div>

			<!-- Paper Theme Switcher (Light / Sepia / Dark) -->
			<div class="flex items-center gap-1 rounded-lg border border-current/10 bg-black/[0.04] p-0.5 dark:bg-white/[0.05]">
				<button
					type="button"
					onclick={() => setTheme('light')}
					class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold transition {readerTheme === 'light'
						? 'bg-white text-slate-900 shadow-sm'
						: 'opacity-70 hover:opacity-100'}"
					title="وضع نهاري أبيض"
				>
					<Sun size={13} />
					<span class="hidden sm:inline">نهاري</span>
				</button>
				<button
					type="button"
					onclick={() => setTheme('sepia')}
					class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold transition {readerTheme === 'sepia'
						? 'bg-[#efe6d5] text-[#3d2e1e] shadow-sm'
						: 'opacity-70 hover:opacity-100'}"
					title="وضع القراءة الورقي المريح للعين"
				>
					<BookOpen size={13} />
					<span class="hidden sm:inline">ورقي</span>
				</button>
				<button
					type="button"
					onclick={() => setTheme('dark')}
					class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold transition {readerTheme === 'dark'
						? 'bg-slate-800 text-slate-100 shadow-sm'
						: 'opacity-70 hover:opacity-100'}"
					title="وضع ليلي داكن"
				>
					<Moon size={13} />
					<span class="hidden sm:inline">ليلي</span>
				</button>
			</div>

			<!-- Original A4 PDF Native Viewer Link (Android/iOS native PDF viewer & print) -->
			{#if activeOriginalPdfUrl}
				<a
					href={activeOriginalPdfUrl}
					target="_blank"
					rel="noopener"
					class="ser-tool-btn inline-flex items-center gap-1.5 px-2.5 font-bold"
					title="فتح ورقة A4 الأصلية بصيغة PDF للطباعة أو المعاينة"
				>
					<ExternalLink size={13} />
					<span>ورقة PDF</span>
				</a>
			{/if}
		</div>

		<!-- Scrollable Reflowable Exam Sheet -->
		<div class="ser-scroller relative flex-1 overflow-y-auto px-2.5 py-3 pb-24 sm:px-5 sm:py-6">
			{#if loading}
				<div class="mx-auto max-w-3xl space-y-4 py-6">
					<div class="ser-card animate-pulse rounded-2xl p-5">
						<div class="mx-auto mb-3 h-4 w-48 rounded bg-current/10"></div>
						<div class="mx-auto h-6 w-64 rounded bg-current/15"></div>
					</div>
					{#each [1, 2] as sk}
						<div class="ser-card animate-pulse space-y-3 rounded-2xl p-5" data-sk={sk}>
							<div class="h-5 w-36 rounded bg-current/15"></div>
							<div class="h-4 w-full rounded bg-current/10"></div>
							<div class="h-4 w-5/6 rounded bg-current/10"></div>
						</div>
					{/each}
					<div class="flex items-center justify-center gap-2 pt-2 text-xs font-bold opacity-70">
						<Loader2 size={15} class="animate-spin" />
						<span>جاري فتح الموضوع الذكي...</span>
					</div>
				</div>
			{:else if errorMsg}
				<div class="flex min-h-[280px] flex-col items-center justify-center gap-3 px-4 text-center">
					<AlertCircle size={36} class="text-red-500" />
					<p class="max-w-md text-sm font-bold">{errorMsg}</p>
					<div class="flex flex-wrap items-center justify-center gap-2">
						<button
							type="button"
							onclick={() => (reloadNonce += 1)}
							class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
						>
							<RefreshCw size={14} /> إعادة المحاولة
						</button>
						{#if activeOriginalPdfUrl}
							<a
								href={activeOriginalPdfUrl}
								target="_blank"
								rel="noopener"
								class="ser-tool-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
							>
								<FileText size={14} /> فتح ملف PDF مباشرة
							</a>
						{/if}
					</div>
				</div>
			{:else if payload}
				{@const meta = payload.metadata}
				{@const isRtl = meta.dir === 'rtl'}
				<div
					class="ser-exam-paper mx-auto max-w-3xl space-y-4 sm:space-y-5"
					dir={meta.dir}
					style="font-size: {fontScale * 1.08}%;"
				>
					<!-- Official Exam Header Banner -->
					<header class="ser-card ser-header-card relative overflow-hidden rounded-2xl p-4 sm:p-6">
						<div class="mb-2 text-center text-[0.75em] font-bold tracking-wide opacity-75">
							{isRtl
								? 'الجمهورية الجزائرية الديمقراطية الشعبية — وزارة التربية الوطنية'
								: meta.lang === 'es'
									? 'República Argelina Democrática y Popular'
									: meta.lang === 'de'
										? 'Demokratische Volksrepublik Algerien'
										: meta.lang === 'it'
											? 'Repubblica Algerina Democratica e Popolare'
											: meta.lang === 'en'
												? "People's Democratic Republic of Algeria"
												: 'République Algérienne Démocratique et Populaire'}
						</div>

						<div class="flex flex-wrap items-center justify-center gap-1.5 text-center text-[0.82em] font-bold opacity-90">
							{#if meta.yearName}
								<span class="ser-meta-pill">{meta.yearName}</span>
							{/if}
							{#if meta.streamName}
								<span class="ser-meta-pill">{meta.streamName}</span>
							{/if}
							{#if meta.trimesterName}
								<span class="ser-meta-pill">{meta.trimesterName}</span>
							{/if}
							{#if meta.examSessionAr}
								<span class="ser-meta-pill">{meta.examSessionAr}</span>
							{/if}
						</div>

						<h1 class="mt-3 text-center text-[1.2em] leading-snug font-extrabold sm:text-[1.35em]">
							{meta.docTitle}
							{#if meta.subjectName && !meta.docTitle.includes(meta.subjectName)}
								<span> — {meta.subjectName}</span>
							{/if}
						</h1>

						{#if mode === 'solution' && canShowSolution}
							<div class="mt-2.5 flex justify-center">
								<span class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1 text-[0.8em] font-extrabold text-emerald-700 dark:text-emerald-300">
									<CheckCircle2 size={15} />
									{isRtl
										? 'التصحيح النموذجي وسلم التنقيط المفصل'
										: meta.lang === 'es'
											? 'Corrección Modelo y Baremo Detallado'
											: meta.lang === 'de'
												? 'Musterlösung und Detaillierte Bewertungsskala'
												: meta.lang === 'it'
													? 'Correzione Modello e Griglia di Valutazione'
													: meta.lang === 'en'
														? 'Model Answer & Detailed Marking Scheme'
														: 'Corrigé Type & Barème Détaillé'}
								</span>
							</div>
						{/if}

						<div class="mt-3.5 flex flex-wrap items-center justify-center gap-3 border-t border-current/10 pt-3 text-[0.8em] font-bold opacity-85">
							{#if meta.duration}
								<span class="inline-flex items-center gap-1">
									<Clock size={14} class="opacity-75" />
									<span>{isRtl ? 'المدة:' : meta.lang === 'es' ? 'Duración :' : meta.lang === 'de' ? 'Dauer :' : meta.lang === 'it' ? 'Durata :' : meta.lang === 'en' ? 'Duration:' : 'Durée :'} {meta.duration}</span>
								</span>
							{/if}
							{#if meta.coefficient}
								<span>• {isRtl ? 'المعامل:' : 'Coeff :'} {meta.coefficient}</span>
							{/if}
							<span class="inline-flex items-center gap-1">
								<Award size={14} class="opacity-75" />
								<span>
									{isRtl ? `العلامة الكاملة: ${meta.totalPoints}` : `Total : ${meta.totalPoints} pts`}
								</span>
							</span>
						</div>
					</header>

					<!-- Recursive Block Snippet -->
					{#snippet renderBlock(block: WebBlock, showSol: boolean, exIdx: number, blkIdx: number)}
						{#if block.type === 'quran_box'}
							<div class="ser-quran-box my-3 rounded-2xl p-4 sm:p-5" dir="rtl">
								<div class="mb-2 flex items-center justify-between gap-2 text-[0.88em] font-extrabold text-emerald-800 dark:text-emerald-300">
									<span>{block.label || 'قال الله تعالى:'}</span>
									{#if block.mark}
										<span class="ser-mark-badge">{block.mark}</span>
									{/if}
								</div>
								<div class="ser-quran-verses py-1 text-justify">
									﴿<!-- eslint-disable-next-line svelte/no-at-html-tags -->{@html renderRichProse(block.verses, { multiline: true, quran: true })}﴾
								</div>
								{#if block.surah}
									<div class="mt-2 text-left text-[0.82em] font-bold text-emerald-800/85 dark:text-emerald-300/85">
										[سورة {block.surah}{block.ayahRange ? `: ${block.ayahRange}` : ''}]
									</div>
								{/if}
								{#if block.vocabulary && block.vocabulary.length > 0}
									<div class="mt-3 flex flex-wrap gap-2 border-t border-emerald-700/15 pt-2.5 text-[0.84em]">
										{#each block.vocabulary as v}
											<span class="rounded-lg bg-emerald-900/[0.06] px-2.5 py-1 dark:bg-emerald-400/10">
												<strong>{v.word}:</strong> {v.meaning}
											</span>
										{/each}
									</div>
								{/if}
								{#if showSol && block.answer}
									<div class="ser-sol-box mt-3">
										<div class="ser-sol-title">الإجابة النموذجية (الآيات الكريمة):</div>
										<div class="ser-quran-verses mt-1 text-[1.05em]">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html renderRichProse(block.answer, { multiline: true, quran: true })}
										</div>
									</div>
								{/if}
							</div>
						{:else if block.type === 'hadith_box'}
							<div class="ser-hadith-box my-3 rounded-2xl p-4 sm:p-5" dir="rtl">
								<div class="mb-2 flex items-center justify-between gap-2 text-[0.88em] font-extrabold text-amber-800 dark:text-amber-300">
									<span>{block.label || 'السند النبوي الشريف:'}</span>
									{#if block.mark}
										<span class="ser-mark-badge">{block.mark}</span>
									{/if}
								</div>
								<p class="leading-[2] text-justify">
									{#if block.narrator}
										<span class="font-bold">{block.narrator} </span>
									{/if}
									<span class="font-bold">«<!-- eslint-disable-next-line svelte/no-at-html-tags -->{@html renderRichProse(block.text, { multiline: true })}»</span>
								</p>
								{#if block.source}
									<div class="mt-2 text-left text-[0.82em] font-bold text-amber-900/80 dark:text-amber-300/85">
										[{block.source}]
									</div>
								{/if}
								{#if block.vocabulary && block.vocabulary.length > 0}
									<div class="mt-3 flex flex-wrap gap-2 border-t border-amber-700/15 pt-2.5 text-[0.84em]">
										{#each block.vocabulary as v}
											<span class="rounded-lg bg-amber-900/[0.06] px-2.5 py-1 dark:bg-amber-400/10">
												<strong>{v.word}:</strong> {v.meaning}
											</span>
										{/each}
									</div>
								{/if}
								{#if showSol && block.answer}
									<div class="ser-sol-box mt-3">
										<div class="ser-sol-title">الإجابة النموذجية:</div>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<div class="mt-1 leading-relaxed">{@html renderRichProse(block.answer, { multiline: true })}</div>
									</div>
								{/if}
							</div>
						{:else if block.type === 'arabic_poem'}
							<div class="ser-passage-box my-3 rounded-2xl p-4 sm:p-5" dir="rtl">
								{#if block.title}
									<h4 class="mb-3 text-center text-[1.02em] font-extrabold">{block.title}</h4>
								{/if}
								<div class="space-y-2.5">
									{#each block.verses as verse, vIdx}
										<div class="rounded-xl bg-black/[0.025] px-3 py-2 dark:bg-white/[0.03]">
											<div class="grid grid-cols-1 gap-1.5 sm:grid-cols-[auto_1fr_auto_1fr] sm:items-center sm:gap-3">
												{#if block.numbered}
													<span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/15 text-[0.75em] font-extrabold text-blue-700 dark:text-blue-300">
														{vIdx + 1}
													</span>
												{/if}
												<div class="text-right font-semibold leading-loose">
													<!-- eslint-disable-next-line svelte/no-at-html-tags -->
													{@html renderRichProse(verse[0])}
												</div>
												<span class="hidden text-current/30 sm:inline">✦</span>
												<div class="pr-6 text-left font-semibold leading-loose sm:pr-0">
													<!-- eslint-disable-next-line svelte/no-at-html-tags -->
													{@html renderRichProse(verse[1])}
												</div>
											</div>
										</div>
									{/each}
								</div>
								{#if block.author || block.source}
									<div class="mt-3 text-left text-[0.82em] font-bold opacity-75">
										— {[block.author, block.source].filter(Boolean).join('، ')}
									</div>
								{/if}
								{#if block.vocabulary && block.vocabulary.length > 0}
									<div class="mt-3 flex flex-wrap gap-2 border-t border-current/10 pt-2.5 text-[0.84em]">
										{#each block.vocabulary as v}
											<span class="rounded-lg bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.06]">
												<strong>{v.word}:</strong> {v.meaning}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						{:else if block.type === 'passage_box'}
							{@const pDir = block.lang === 'ar' ? 'rtl' : 'ltr'}
							<div class="ser-passage-box my-3 rounded-2xl p-4 sm:p-5" dir={pDir}>
								{#if block.title}
									<h4 class="mb-2.5 text-center text-[1.04em] font-extrabold">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderRichProse(block.title)}
									</h4>
								{/if}
								<div class="space-y-2.5 leading-[1.9] text-justify">
									{#each block.paragraphs as para, pIdx}
										<p>
											{#if block.numberedParagraphs}
												<span class="mx-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded bg-blue-600/15 px-1 text-[0.76em] font-extrabold text-blue-700 dark:text-blue-300">
													§{pIdx + 1}
												</span>
											{/if}
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html renderRichProse(para, { multiline: true })}
										</p>
									{/each}
								</div>
								{#if block.author || block.source}
									<div class="mt-3 text-end text-[0.82em] font-bold italic opacity-75">
										— {[block.author, block.source].filter(Boolean).join(', ')}
									</div>
								{/if}
								{#if block.vocabulary && block.vocabulary.length > 0}
									<div class="mt-3 flex flex-wrap gap-2 border-t border-current/10 pt-2.5 text-[0.84em]">
										{#each block.vocabulary as v}
											<span class="rounded-lg bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.06]">
												<strong>{v.word}:</strong> {v.meaning}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						{:else if block.type === 'text'}
							<div class="my-2">
								<div class="flex items-start justify-between gap-2.5 leading-[1.85]">
									<div class="min-w-0 flex-1">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderRichProse(block.content, { multiline: true })}
									</div>
									{#if block.mark}
										<span class="ser-mark-badge shrink-0">{block.mark}</span>
									{/if}
								</div>
								{#if showSol && block.answer}
									<div class="ser-sol-box mt-2">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<div class="leading-[1.85]">{@html renderRichProse(block.answer, { multiline: true })}</div>
									</div>
								{/if}
							</div>
						{:else if block.type === 'math'}
							<div class="ser-math-container my-2.5 overflow-x-auto rounded-xl bg-black/[0.02] px-3 py-2.5 text-center dark:bg-white/[0.03]" dir="ltr">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html renderKatexSafe(block.latex, block.display)}
							</div>
						{:else if block.type === 'table'}
							<div class="my-3 overflow-x-auto rounded-xl border border-current/15">
								<table class="w-full border-collapse text-[0.92em]">
									{#if block.headers.length > 0}
										<thead>
											<tr class="bg-black/[0.05] dark:bg-white/[0.07]">
												{#each block.headers as hCell}
													<th
														colspan={hCell.colspan}
														rowspan={hCell.rowspan}
														class="border-b border-e border-current/15 px-3 py-2 font-extrabold last:border-e-0"
														style="text-align: {block.align || 'center'};"
													>
														<!-- eslint-disable-next-line svelte/no-at-html-tags -->
														{@html renderRichProse(hCell.content, { multiline: true })}
													</th>
												{/each}
											</tr>
										</thead>
									{/if}
									<tbody>
										{#each block.rows as row}
											<tr class="border-b border-current/10 last:border-b-0">
												{#each row as cell}
													{@const typedCell = cell as WebTableCell}
													<td
														colspan={typedCell.colspan}
														rowspan={typedCell.rowspan}
														class="border-e border-current/10 px-3 py-2 align-middle last:border-e-0 {typedCell.bold ? 'font-bold' : ''}"
														style="text-align: {block.align || 'center'};"
													>
														{#if showSol && typedCell.answer}
															<div class="font-bold text-emerald-700 dark:text-emerald-300">
																<!-- eslint-disable-next-line svelte/no-at-html-tags -->
																{@html renderRichProse(typedCell.answer, { multiline: true })}
															</div>
														{:else}
															<!-- eslint-disable-next-line svelte/no-at-html-tags -->
															{@html renderRichProse(typedCell.content, { multiline: true })}
														{/if}
													</td>
												{/each}
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else if block.type === 'true_false'}
							<div class="my-3 space-y-2">
								{#each block.items as item, iIdx}
									<div class="rounded-xl border border-current/10 bg-black/[0.02] p-3 dark:bg-white/[0.03]">
										<div class="flex items-start justify-between gap-2">
											<div class="leading-relaxed">
												<span class="font-bold opacity-70">{iIdx + 1}.</span>
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html renderRichProse(item.q)}
											</div>
											<div class="flex shrink-0 items-center gap-1.5">
												{#if !showSol}
													<span class="rounded-md border border-current/20 px-2 py-0.5 text-[0.8em] font-bold opacity-65">
														( ...... )
													</span>
												{/if}
												{#if item.mark}
													<span class="ser-mark-badge">{item.mark}</span>
												{/if}
											</div>
										</div>
										{#if showSol && item.a}
											<div class="mt-2 flex flex-wrap items-center gap-2 border-t border-emerald-500/20 pt-2 text-[0.9em]">
												<span class="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[0.82em] font-extrabold text-white">
													{item.a}
												</span>
												{#if item.c}
													<span class="font-semibold text-emerald-800 dark:text-emerald-300">
														— <!-- eslint-disable-next-line svelte/no-at-html-tags -->{@html renderRichProse(item.c)}
													</span>
												{/if}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else if block.type === 'multiple_choice'}
							<div class="my-3 space-y-3">
								{#each block.groups as grp, gIdx}
									<div class="rounded-xl border border-current/10 bg-black/[0.02] p-3 dark:bg-white/[0.03]">
										<div class="mb-2 flex items-start justify-between gap-2 font-bold">
											<div>
												<span class="opacity-70">{gIdx + 1})</span>
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html renderRichProse(grp.header)}
											</div>
											{#if grp.mark}
												<span class="ser-mark-badge shrink-0">{grp.mark}</span>
											{/if}
										</div>
										<div class="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
											{#each grp.options as opt}
												{@const isRight = showSol && normalizeMatchOption(opt, grp.correct)}
												<div
													class="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[0.92em] transition {isRight
														? 'border-emerald-500 bg-emerald-500/15 font-bold text-emerald-800 dark:text-emerald-200'
														: 'border-current/10 bg-black/[0.015] dark:bg-white/[0.02]'}"
												>
													{#if isRight}
														<CheckCircle2 size={15} class="shrink-0 text-emerald-600 dark:text-emerald-400" />
													{:else}
														<span class="h-3.5 w-3.5 shrink-0 rounded-full border border-current/35"></span>
													{/if}
													<div>
														<!-- eslint-disable-next-line svelte/no-at-html-tags -->
														{@html renderRichProse(opt)}
													</div>
												</div>
											{/each}
										</div>
										{#if showSol && grp.correct && !grp.options.some((o) => normalizeMatchOption(o, grp.correct))}
											<div class="ser-sol-box mt-2 text-[0.9em]">
												<strong>الإجابة الصحيحة:</strong>
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html renderRichProse(grp.correct)}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else if block.type === 'diagram_flow'}
							<div class="my-3 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-current/10 bg-black/[0.02] p-3.5 dark:bg-white/[0.03]">
								<span class="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 font-bold">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderRichProse(block.flow[0])}
								</span>
								{#if isRtl}
									<ArrowLeft size={18} class="opacity-60" />
								{:else}
									<ArrowRight size={18} class="opacity-60" />
								{/if}
								<span class="rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 font-bold">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderRichProse(block.flow[1])}
								</span>
								{#if isRtl}
									<ArrowLeft size={18} class="opacity-60" />
								{:else}
									<ArrowRight size={18} class="opacity-60" />
								{/if}
								<span class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 font-bold">
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderRichProse(block.flow[2])}
								</span>
							</div>
						{:else if block.type === 'labeling'}
							<div class="my-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
								{#each block.labels as lbl, lIdx}
									<div class="flex items-center gap-2 rounded-lg border border-current/10 bg-black/[0.02] px-3 py-1.5 text-[0.9em] dark:bg-white/[0.03]">
										<span class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[0.75em] font-extrabold text-white">
											{lIdx + 1}
										</span>
										<div>
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html renderRichProse(lbl)}
										</div>
									</div>
								{/each}
							</div>
						{:else if block.type === 'figure'}
							<figure class="my-3.5 overflow-hidden rounded-2xl border border-current/15 bg-black/[0.02] p-3 dark:bg-white/[0.03]">
								{#if block.title}
									<div class="mb-2 text-center text-[0.92em] font-extrabold">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderRichProse(block.title)}
									</div>
								{/if}

								<!-- Crisp white plate canvas so #FFFFFF textbook illustrations blend seamlessly in all 3 themes -->
								<div class="mx-auto max-w-md rounded-xl bg-white p-2 shadow-inner ring-1 ring-black/5">
									<div class="relative mx-auto w-fit">
										<img
											src={block.src}
											alt={block.title || block.caption || 'وثيقة علمية'}
											loading="lazy"
											decoding="async"
											class="block max-h-[300px] w-auto max-w-full rounded-lg object-contain select-none"
										/>
										{#each block.pins as pin}
											{@const pinKey = `${exIdx}-${blkIdx}-${pin.num}`}
											<button
												type="button"
												onclick={() => (activePinKey = activePinKey === pinKey ? null : pinKey)}
												style="left: {pin.xPct}%; top: {pin.yPct}%; background-color: {pin.color || '#1d4ed8'};"
												class="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[11px] font-extrabold text-white shadow-md transition-transform hover:scale-110 {activePinKey === pinKey
													? 'scale-125 ring-2 ring-amber-400'
													: ''}"
												title="البيان رقم {pin.num}"
											>
												{pin.num}
											</button>
										{/each}
									</div>
								</div>

								{#if block.legend.length > 0}
									<div class="mt-3 grid grid-cols-1 gap-1.5 text-[0.88em] sm:grid-cols-2">
										{#each block.legend as item}
											{@const pinKey = `${exIdx}-${blkIdx}-${item.num}`}
											{@const isQuizHidden = block.legendMode === 'quiz' && !showSol}
											<div
												class="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 transition {activePinKey === pinKey
													? 'border-amber-500 bg-amber-500/15 font-bold'
													: isQuizHidden
														? 'border-current/10 bg-black/[0.02] dark:bg-white/[0.02]'
														: block.legendMode === 'quiz' && showSol
															? 'border-emerald-500/40 bg-emerald-500/10 font-bold text-emerald-800 dark:text-emerald-200'
															: 'border-current/10 bg-black/[0.02] dark:bg-white/[0.03]'}"
											>
												<div class="flex items-center gap-2">
													<span class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[0.76em] font-extrabold text-white">
														{item.num}
													</span>
													{#if isQuizHidden}
														<span class="ser-blank">............</span>
													{:else}
														<span>
															<!-- eslint-disable-next-line svelte/no-at-html-tags -->
															{@html renderRichProse(item.label)}
														</span>
													{/if}
												</div>
												{#if item.mark}
													<span class="ser-mark-badge">{item.mark}</span>
												{/if}
											</div>
										{/each}
									</div>
								{/if}

								{#if block.caption}
									<figcaption class="mt-2 text-center text-[0.82em] font-semibold opacity-75">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderRichProse(block.caption)}
									</figcaption>
								{/if}
							</figure>
						{:else if block.type === 'image_grid'}
							<div class="my-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
								{#each block.items as it}
									<div class="flex flex-col items-center rounded-xl border border-current/15 bg-black/[0.02] p-2.5 text-center dark:bg-white/[0.03]">
										{#if it.src}
											<div class="mb-2 flex h-28 w-full items-center justify-center rounded-lg bg-white p-1.5">
												<img
													src={it.src}
													alt={it.label}
													loading="lazy"
													decoding="async"
													class="max-h-full max-w-full object-contain"
												/>
											</div>
										{/if}
										<div class="text-[0.88em] font-bold">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html renderRichProse(it.label)}
										</div>
										{#if showSol && it.answer}
											<div class="mt-1.5 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[0.84em] font-extrabold text-emerald-700 dark:text-emerald-300">
												<!-- eslint-disable-next-line svelte/no-at-html-tags -->
												{@html renderRichProse(it.answer)}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else if block.type === 'columns'}
							<!-- Stacks vertically on portrait phones (< 768px) and splits side-by-side on tablet/desktop -->
							<div class="my-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:items-start">
								{#each block.children as child, cIdx}
									<div class="min-w-0">
										{@render renderBlock(child, showSol, exIdx, blkIdx * 100 + cIdx)}
									</div>
								{/each}
							</div>
						{/if}
					{/snippet}

					<!-- Exercises List -->
					{#each payload.exercises as ex (ex.index)}
						{@const isExSolVisible = canShowSolution && (mode === 'solution' || Boolean(revealedExercises[ex.index]))}
						<article class="ser-card overflow-hidden rounded-2xl">
							<!-- Exercise Header Strip -->
							<div class="ser-ex-header flex items-center justify-between gap-2 px-4 py-2.5 sm:px-5">
								<h2 class="text-[1.02em] font-extrabold">
									{ex.heading}
								</h2>
								{#if ex.points}
									<span class="rounded-full bg-blue-600/15 px-2.5 py-0.5 text-[0.8em] font-extrabold text-blue-700 dark:bg-blue-400/20 dark:text-blue-200">
										{ex.points}
									</span>
								{/if}
							</div>

							<!-- Exercise Body -->
							<div class="px-4 py-3.5 sm:px-5 sm:py-4">
								{#if ex.instruction}
									<p class="mb-2.5 border-s-3 border-blue-500/60 ps-2.5 text-[0.95em] font-bold opacity-90">
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html renderRichProse(ex.instruction, { multiline: true })}
									</p>
								{/if}

								{#each ex.blocks as block, bIdx}
									{@render renderBlock(block, isExSolVisible, ex.index, bIdx)}
								{/each}

								<!-- Per-Exercise Inline Solution Toggle (available in 'exam' mode!) -->
								{#if mode === 'exam' && canShowSolution && ex.hasSolution}
									<div class="mt-4 flex justify-end border-t border-current/10 pt-3">
										<button
											type="button"
											onclick={() => toggleExerciseSolution(ex.index)}
											class="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-[0.82em] font-extrabold transition {isExSolVisible
												? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
												: 'border-current/15 bg-black/[0.03] hover:bg-black/[0.06] dark:bg-white/[0.05] dark:hover:bg-white/[0.1]'}"
										>
											{#if isExSolVisible}
												<EyeOff size={14} />
												<span>{isRtl ? 'إخفاء الحل' : meta.lang === 'es' ? 'Ocultar solución' : meta.lang === 'de' ? 'Lösung ausblenden' : meta.lang === 'it' ? 'Nascondi soluzione' : meta.lang === 'en' ? 'Hide solution' : 'Masquer le corrigé'}</span>
											{:else}
												<Eye size={14} />
												<span>{isRtl ? 'إظهار الحل' : meta.lang === 'es' ? 'Ver solución' : meta.lang === 'de' ? 'Lösung' : meta.lang === 'it' ? 'Soluzione' : meta.lang === 'en' ? 'View solution' : 'Voir le corrigé'}</span>
											{/if}
										</button>
									</div>
								{/if}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* =========================================================================
	   Paper Themes (Light / Eye-Care Sepia / AMOLED Dark)
	   ========================================================================= */
	.ser-exam-paper {
		font-family: var(--font-exam);
	}
	.ser-quran-verses {
		font-family: 'KFGQPC Uthman Taha Naskh', 'Noto Naskh Arabic', serif;
		font-size: 1.22em;
		line-height: 2.2;
		letter-spacing: 0;
	}
	.ser-theme-light {
		background-color: #eef2f6;
		color: #0f172a;
	}
	.ser-theme-light .ser-toolbar {
		background-color: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid rgba(15, 23, 42, 0.08);
	}
	.ser-theme-light .ser-card {
		background-color: #ffffff;
		border: 1px solid rgba(15, 23, 42, 0.09);
		box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
	}
	.ser-theme-light .ser-ex-header {
		background-color: #f8fafc;
		border-bottom: 1px solid rgba(15, 23, 42, 0.07);
	}

	.ser-theme-sepia {
		background-color: #f0e9db;
		color: #261e15;
	}
	.ser-theme-sepia .ser-toolbar {
		background-color: rgba(251, 247, 238, 0.96);
		border-bottom: 1px solid rgba(61, 46, 30, 0.12);
	}
	.ser-theme-sepia .ser-card {
		background-color: #fcf9f2;
		border: 1px solid rgba(61, 46, 30, 0.12);
		box-shadow: 0 2px 10px rgba(61, 46, 30, 0.05);
	}
	.ser-theme-sepia .ser-ex-header {
		background-color: #f5efe2;
		border-bottom: 1px solid rgba(61, 46, 30, 0.1);
	}

	.ser-theme-dark {
		background-color: #020617;
		color: #f1f5f9;
	}
	.ser-theme-dark .ser-toolbar {
		background-color: rgba(15, 23, 42, 0.96);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	.ser-theme-dark .ser-card {
		background-color: #0f172a;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
	}
	.ser-theme-dark .ser-ex-header {
		background-color: rgba(30, 41, 59, 0.7);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.ser-tool-btn {
		height: 30px;
		border-radius: 0.5rem;
		border: 1px solid rgba(128, 128, 128, 0.22);
		background-color: rgba(128, 128, 128, 0.06);
		transition: background-color 0.15s ease;
	}
	.ser-tool-btn:hover:not(:disabled) {
		background-color: rgba(128, 128, 128, 0.14);
	}

	.ser-meta-pill {
		border-radius: 9999px;
		border: 1px solid rgba(128, 128, 128, 0.22);
		background-color: rgba(128, 128, 128, 0.06);
		padding: 0.15rem 0.65rem;
	}

	.ser-mark-badge {
		border-radius: 0.4rem;
		border: 1px solid rgba(128, 128, 128, 0.25);
		background-color: rgba(128, 128, 128, 0.08);
		padding: 0.08rem 0.45rem;
		font-size: 0.78em;
		font-weight: 800;
		white-space: nowrap;
	}

	/* =========================================================================
	   Authentic Quranic, Hadith & Literary Passage Cards
	   ========================================================================= */
	.ser-quran-box {
		background-color: rgba(16, 185, 129, 0.07);
		border: 1px solid rgba(16, 185, 129, 0.28);
		border-inline-start: 4px solid #059669;
	}
	:global(.ser-ayah-num) {
		display: inline-block;
		margin-inline: 0.18em;
		font-size: 0.86em;
		font-weight: 700;
		color: #059669;
	}
	.ser-theme-dark :global(.ser-ayah-num) {
		color: #34d399;
	}

	.ser-hadith-box {
		background-color: rgba(217, 119, 6, 0.06);
		border: 1px solid rgba(217, 119, 6, 0.25);
		border-inline-start: 4px solid #d97706;
	}

	.ser-passage-box {
		background-color: rgba(59, 130, 246, 0.04);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-inline-start: 4px solid #2563eb;
	}

	/* Solution Callout Box */
	.ser-sol-box {
		border-radius: 0.75rem;
		border: 1px solid rgba(16, 185, 129, 0.35);
		border-inline-start: 4px solid #10b981;
		background-color: rgba(16, 185, 129, 0.09);
		padding: 0.65rem 0.85rem;
	}
	.ser-sol-title {
		font-size: 0.82em;
		font-weight: 800;
		color: #047857;
	}
	.ser-theme-dark .ser-sol-title {
		color: #34d399;
	}

	/* Inline Rich Tokens (Irab Underlines, Dotted Blanks, LTR Isolated KaTeX) */
	:global(.ser-irab-underline) {
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
		text-decoration-color: #2563eb;
	}
	.ser-theme-dark :global(.ser-irab-underline) {
		text-decoration-color: #60a5fa;
	}

	:global(.ser-blank) {
		font-family: 'Cairo', system-ui, sans-serif;
		font-size: 0.85em;
		font-weight: 700;
		letter-spacing: 2px;
		opacity: 0.65;
		padding-inline: 0.2em;
	}

	:global(.ser-math-inline) {
		display: inline-block;
		direction: ltr;
		unicode-bidi: isolate;
		padding-inline: 0.08em;
	}
	:global(.ser-math-display) {
		display: block;
		overflow-x: auto;
		overflow-y: hidden;
		direction: ltr;
		unicode-bidi: isolate;
		margin: 0.45em 0;
	}
	.ser-math-container :global(.katex-display) {
		margin: 0.25em 0;
	}
	:global(.ser-root .katex) {
		font-size: 1.08em;
	}
</style>
