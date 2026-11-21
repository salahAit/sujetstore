<script lang="ts">
	import QuizPlayer from '#lib/modules/QuizBuilder/components/player/QuizPlayer.svelte';
	import SmartExamReader from '#lib/components/SmartExamReader.svelte';
	import type { WebExamPayload } from '#lib/types/web-exam';
	import {
		Sparkles,
		Brain,
		FileText,
		Download,
		Loader2,
		AlertCircle,
		RotateCcw,
		CheckCircle2,
		Eye
	} from 'lucide-svelte';

	let { data }: { data: any } = $props();

	let activeTab = $state<'quiz' | 'pdf'>('quiz');
	let selectedYsId = $state<number>(0);

	$effect(() => {
		if (!selectedYsId && data.yearSubjects.length > 0) {
			selectedYsId = data.yearSubjects[0].yearSubjectId;
		}
	});

	let selectedYsObj = $derived(
		data.yearSubjects.find((ys: any) => ys.yearSubjectId === selectedYsId)
	);

	const SECONDARY_COEFFS: Record<string, number> = {
		'1as:MAT-SE:TCST': 5,
		'2as:MAT-SE:SE': 5,
		'2as:MAT-TM:TM': 6,
		'2as:MAT-MATH:MATH': 7,
		'3as:MAT-SE:SE': 5,
		'3as:MAT-TM:TM': 6,
		'3as:MAT-MATH:MATH': 7,
		'1as:PHY-SE:TCST': 4,
		'2as:PHY-SE:SE': 5,
		'2as:PHY-MTM:TM': 5,
		'2as:PHY-MTM:MATH': 6,
		'3as:PHY-SE:SE': 5,
		'3as:PHY-MTM:TM': 5,
		'3as:PHY-MTM:MATH': 6,
		'1as:SCI-SE:TCST': 4,
		'2as:SCI-SE:SE': 6,
		'2as:SCI-MATH:MATH': 2,
		'3as:SCI-SE:SE': 6,
		'3as:SCI-MATH:MATH': 2,
		'1as:ARB-SCI:TCST': 3,
		'1as:ARB-LP:TCL': 5,
		'2as:ARB-SCI:SE': 2,
		'2as:ARB-SCI:TM': 2,
		'2as:ARB-SCI:MATH': 2,
		'2as:ARB-SCI:GE': 2,
		'2as:ARB-LP:LP': 5,
		'2as:ARB-LE:LE': 4,
		'3as:ARB-SCI:SE': 3,
		'3as:ARB-SCI:TM': 3,
		'3as:ARB-SCI:MATH': 3,
		'3as:ARB-SCI:GE': 3,
		'3as:ARB-LP:LP': 6,
		'3as:ARB-LE:LE': 5,
		'1as:ENG-SEC:TCST': 2,
		'1as:ENG-SEC:TCL': 3,
		'2as:ENG-SEC:SE': 2,
		'2as:ENG-SEC:TM': 2,
		'2as:ENG-SEC:MATH': 2,
		'2as:ENG-SEC:GE': 2,
		'2as:ENG-SEC:LP': 3,
		'2as:ENG-SEC:LE': 5,
		'3as:ENG-SEC:SE': 2,
		'3as:ENG-SEC:TM': 2,
		'3as:ENG-SEC:MATH': 2,
		'3as:ENG-SEC:GE': 2,
		'3as:ENG-SEC:LP': 3,
		'3as:ENG-SEC:LE': 5,
		'1as:FRE-SEC:TCST': 2,
		'1as:FRE-SEC:TCL': 3,
		'2as:FRE-SEC:SE': 2,
		'2as:FRE-SEC:TM': 2,
		'2as:FRE-SEC:MATH': 2,
		'2as:FRE-SEC:GE': 2,
		'2as:FRE-SEC:LP': 3,
		'2as:FRE-SEC:LE': 5,
		'3as:FRE-SEC:SE': 2,
		'3as:FRE-SEC:TM': 2,
		'3as:FRE-SEC:MATH': 2,
		'3as:FRE-SEC:GE': 2,
		'3as:FRE-SEC:LP': 3,
		'3as:FRE-SEC:LE': 5,
		'1as:ISL-ALL:TCST': 2,
		'1as:ISL-ALL:TCL': 2,
		'2as:ISL-ALL:SE': 2,
		'2as:ISL-ALL:TM': 2,
		'2as:ISL-ALL:MATH': 2,
		'2as:ISL-ALL:GE': 2,
		'2as:ISL-ALL:LP': 2,
		'2as:ISL-ALL:LE': 2,
		'3as:ISL-ALL:SE': 2,
		'3as:ISL-ALL:TM': 2,
		'3as:ISL-ALL:MATH': 2,
		'3as:ISL-ALL:GE': 2,
		'3as:ISL-ALL:LP': 2,
		'3as:ISL-ALL:LE': 2
	};

	function formatYsLabel(ys: any): string {
		const subjLabel =
			ys.subjectId === 'SCI-B' && typeof ys.yearId === 'string' && ys.yearId.endsWith('ap')
				? 'التربية العلمية والتكنولوجية'
				: ys.subjectId === 'ISL-ALL'
					? 'العلوم الإسلامية'
					: ys.subjectName;
		if (ys.streamName && ys.streamId !== 'GEN') {
			const coeff = ys.coefficient ?? SECONDARY_COEFFS[`${ys.yearId}:${ys.subjectId}:${ys.streamId}`];
			const coeffPart = coeff ? ` (معامل ${coeff})` : '';
			return `${ys.yearName} — ${ys.streamName} — ${subjLabel}${coeffPart}`;
		}
		return `${ys.yearName} — ${subjLabel}`;
	}

	// Quiz mode options
	let difficulty = $state<'all' | 'easy' | 'medium' | 'hard'>('all');
	let questionCount = $state(5);
	let generatingQuiz = $state(false);
	let generatedQuizData = $state<{ quiz: any; questions: any[] } | null>(null);

	// PDF mode options
	let trimesterId = $state('t1');
	let docType = $state<'exam' | 'test'>('exam');
	let pdfDifficulty = $state<'easy' | 'medium' | 'hard'>('medium');
	let exerciseCount = $state(2);
	let pdfVariant = $state<'trimester_exam' | 'bac_mock'>('trimester_exam');
	let generatingPdf = $state(false);
	let pdfReaderMode = $state<'exam' | 'solution'>('exam');
	let pdfResult = $state<{
		pdfUrl: string;
		solutionUrl: string;
		title: string;
		webExam?: WebExamPayload | null;
	} | null>(null);

	let errorMsg = $state<string | null>(null);

	async function generateQuiz() {
		generatingQuiz = true;
		errorMsg = null;
		generatedQuizData = null;
		try {
			const res = await fetch('/api/generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mode: 'quiz',
					yearSubjectId: selectedYsId,
					difficulty,
					count: questionCount
				})
			});
			const out = await res.json();
			if (!res.ok) throw new Error(out.error || 'تعذر توليد التمرين');
			generatedQuizData = { quiz: out.quiz, questions: out.questions };
		} catch (e: any) {
			errorMsg = e.message;
		} finally {
			generatingQuiz = false;
		}
	}

	async function handleGeneratedQuizSubmit(payload: any) {
		try {
			const res = await fetch('/api/generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					mode: 'grade',
					answers: payload.answers,
					timeTaken: payload.timeTaken
				})
			});
			return await res.json();
		} catch {
			return { error: 'تعذر حفظ النتيجة' };
		}
	}

	async function generatePdf() {
		generatingPdf = true;
		errorMsg = null;
		pdfResult = null;
		pdfReaderMode = 'exam';
		try {
			const payload: Record<string, any> = {
				mode: 'pdf',
				yearSubjectId: selectedYsId,
				trimesterId,
				docType,
				difficulty: pdfDifficulty,
				exerciseCount,
				...(selectedYsObj?.yearId === '3as' ? { variant: pdfVariant } : {})
			};
			const res = await fetch('/api/generator', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const out = await res.json();
			if (!res.ok) throw new Error(out.error || 'تعذر توليد ملف PDF');
			pdfResult = out;
		} catch (e: any) {
			errorMsg = e.message;
		} finally {
			generatingPdf = false;
		}
	}
</script>

<svelte:head>
	<title>المولّد الذكي للفروض والاختبارات - SujetStore</title>
</svelte:head>

{#if generatedQuizData}
	<div class="mb-4 flex items-center justify-between">
		<button
			onclick={() => (generatedQuizData = null)}
			class="bg-card inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold hover:bg-accent"
		>
			<RotateCcw size={15} /> توليد تمرين جديد
		</button>
	</div>
	<QuizPlayer
		quiz={generatedQuizData.quiz}
		rawQuestions={generatedQuizData.questions}
		onSubmit={handleGeneratedQuizSubmit}
	/>
{:else}
	<div class="space-y-6">
		<div class="bg-card rounded-2xl border p-6 shadow-sm">
			<div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<div>
					<h2 class="flex items-center gap-2 text-xl font-extrabold">
						<Sparkles size={22} class="text-purple-500" /> المولّد الذكي للتمارين والمواضيع
					</h2>
					<p class="text-muted-foreground mt-1 text-sm">
						كوّن اختباراً تفاعلياً مخصصاً من بنك الأسئلة أو قم بتوليد موضوع فرض/اختبار رسمي بصيغة PDF مع الحل النموذجي.
					</p>
				</div>

				<div class="bg-muted flex shrink-0 rounded-xl p-1 text-xs font-bold">
					<button
						onclick={() => {
							activeTab = 'quiz';
							errorMsg = null;
						}}
						class="flex items-center gap-1.5 rounded-lg px-4 py-2 transition {activeTab === 'quiz'
							? 'bg-background text-purple-500 shadow'
							: 'text-muted-foreground'}"
					>
						<Brain size={15} /> تمرين تفاعلي
					</button>
					<button
						onclick={() => {
							activeTab = 'pdf';
							errorMsg = null;
						}}
						class="flex items-center gap-1.5 rounded-lg px-4 py-2 transition {activeTab === 'pdf'
							? 'bg-background text-blue-500 shadow'
							: 'text-muted-foreground'}"
					>
						<FileText size={15} /> موضوع PDF + الحل
					</button>
				</div>
			</div>

			{#if errorMsg}
				<div class="mb-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-semibold text-red-500">
					<AlertCircle size={18} />
					<span>{errorMsg}</span>
				</div>
			{/if}

			{#if data.yearSubjects.length === 0}
				<p class="text-muted-foreground py-8 text-center text-sm">
					لا توجد مواد منشورة حالياً.
				</p>
			{:else if activeTab === 'quiz'}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div>
						<label for="gen-ys-quiz" class="mb-1.5 block text-xs font-bold">السنة والمادة</label>
						<select
							id="gen-ys-quiz"
							bind:value={selectedYsId}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-purple-500"
						>
							{#each data.yearSubjects as ys}
								<option value={ys.yearSubjectId}>
									{formatYsLabel(ys)}
								</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="gen-diff" class="mb-1.5 block text-xs font-bold">مستوى الصعوبة</label>
						<select
							id="gen-diff"
							bind:value={difficulty}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-purple-500"
						>
							<option value="all">جميع المستويات</option>
							<option value="easy">سهل</option>
							<option value="medium">متوسط</option>
							<option value="hard">صعب</option>
						</select>
					</div>

					<div>
						<label for="gen-count" class="mb-1.5 block text-xs font-bold">عدد الأسئلة</label>
						<select
							id="gen-count"
							bind:value={questionCount}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-purple-500"
						>
							<option value={3}>3 أسئلة</option>
							<option value={5}>5 أسئلة</option>
							<option value={10}>10 أسئلة</option>
							<option value={15}>15 سؤالاً</option>
						</select>
					</div>
				</div>

				<button
					onclick={generateQuiz}
					disabled={generatingQuiz}
					class="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
				>
					{#if generatingQuiz}
						<Loader2 size={18} class="animate-spin" /> جاري تحضير الأسئلة...
					{:else}
						<Sparkles size={18} /> ابدأ التمرين المخصّص الآن
					{/if}
				</button>
			{:else}
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 {selectedYsObj?.yearId === '3as' ? 'lg:grid-cols-3 xl:grid-cols-6' : 'lg:grid-cols-5'}">
					<div>
						<label for="gen-ys-pdf" class="mb-1.5 block text-xs font-bold">السنة والمادة</label>
						<select
							id="gen-ys-pdf"
							bind:value={selectedYsId}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
						>
							{#each data.yearSubjects as ys}
								<option value={ys.yearSubjectId}>
									{formatYsLabel(ys)}
								</option>
							{/each}
						</select>
					</div>

					{#if selectedYsObj?.yearId === '3as'}
						<div>
							<label for="gen-pdf-variant" class="mb-1.5 block text-xs font-bold">صيغة الامتحان</label>
							<select
								id="gen-pdf-variant"
								bind:value={pdfVariant}
								class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
							>
								<option value="trimester_exam">اختبار فصلي عادي</option>
								<option value="bac_mock">بكالوريا تجريبية نموذجية</option>
							</select>
						</div>
					{/if}

					<div>
						<label for="gen-trim" class="mb-1.5 block text-xs font-bold">الفصل الدراسي</label>
						<select
							id="gen-trim"
							bind:value={trimesterId}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
						>
							{#each data.trimesters as t}
								<option value={t.id}>{t.name_ar}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="gen-doctype" class="mb-1.5 block text-xs font-bold">نوع الموضوع</label>
						<select
							id="gen-doctype"
							bind:value={docType}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
						>
							<option value="test">تقويم مرحلي / فرض محروس</option>
							<option value="exam">اختبار فصلي</option>
						</select>
					</div>

					<div>
						<label for="gen-pdf-diff" class="mb-1.5 block text-xs font-bold">مستوى الصعوبة</label>
						<select
							id="gen-pdf-diff"
							bind:value={pdfDifficulty}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
						>
							<option value="easy">سهل</option>
							<option value="medium">متوسط</option>
							<option value="hard">صعب</option>
						</select>
					</div>

					<div>
						<label for="gen-excount" class="mb-1.5 block text-xs font-bold">عدد التمارين</label>
						<select
							id="gen-excount"
							bind:value={exerciseCount}
							class="bg-background w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
						>
							<option value={2}>تمرينان</option>
							<option value={3}>3 تمارين</option>
							<option value={4}>4 تمارين</option>
						</select>
					</div>
				</div>

				<button
					onclick={generatePdf}
					disabled={generatingPdf}
					class="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
				>
					{#if generatingPdf}
						<Loader2 size={18} class="animate-spin" /> جاري تركيب وتوليد ملف PDF...
					{:else}
						<FileText size={18} /> توليد موضوع PDF + الحل
					{/if}
				</button>

				{#if pdfResult}
					<div class="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
						<div class="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
							<div class="flex items-center gap-2 font-extrabold text-emerald-600 dark:text-emerald-400">
								<CheckCircle2 size={20} />
								<span>تم توليد الموضوع: {pdfResult.title}</span>
							</div>
							<div class="flex flex-wrap items-center gap-2">
								<div class="bg-background inline-flex items-center rounded-xl border p-1">
									<button
										type="button"
										onclick={() => (pdfReaderMode = 'exam')}
										class="rounded-lg px-3 py-1.5 text-xs font-bold transition {pdfReaderMode === 'exam'
											? 'bg-blue-600 text-white shadow-sm'
											: 'text-muted-foreground hover:text-foreground'}"
									>
										الموضوع
									</button>
									<button
										type="button"
										onclick={() => (pdfReaderMode = 'solution')}
										class="rounded-lg px-3 py-1.5 text-xs font-bold transition {pdfReaderMode === 'solution'
											? 'bg-emerald-600 text-white shadow-sm'
											: 'text-muted-foreground hover:text-foreground'}"
									>
										الحل
									</button>
								</div>
								<a
									href={pdfResult.pdfUrl}
									target="_blank"
									download
									class="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
								>
									<Download size={14} /> تحميل الموضوع (PDF)
								</a>
								<a
									href={pdfResult.solutionUrl}
									target="_blank"
									download
									class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
								>
									<Eye size={14} /> تحميل الحل (PDF)
								</a>
							</div>
						</div>

						<div class="h-[680px] overflow-hidden rounded-xl border">
							<SmartExamReader
								subjectUrl={pdfResult.pdfUrl}
								solutionUrl={pdfResult.solutionUrl}
								initialPayload={pdfResult.webExam ?? null}
								bind:mode={pdfReaderMode}
								title={pdfResult.title}
							/>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}
