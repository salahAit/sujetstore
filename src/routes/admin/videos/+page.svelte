<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Video,
		Plus,
		Trash2,
		Edit3,
		ExternalLink,
		CheckCircle2,
		ShieldAlert,
		FileText,
		HelpCircle,
		Clock,
		Link2,
		Upload,
		Save,
		X
	} from 'lucide-svelte';
	import {
		formatTimestamp,
		parseTranscript,
		parseVideoUrl
	} from '#lib/modules/VideoStudio/transcript-parser';

	let { data, form } = $props();

	// Editor Form State
	let editingId = $state<number | null>(null);
	let titleAr = $state('');
	let slug = $state('');
	let description = $state('');
	let yearSubjectId = $state<number | ''>('');
	let trimesterId = $state('');
	let lessonId = $state<number | ''>('');
	let videoUrl = $state('');
	let durationInput = $state('');
	let thumbnailUrl = $state('');
	let accessTier = $state<'public' | 'registered' | 'premium'>('public');
	let isPublished = $state(true);
	let transcriptRaw = $state('');

	// Cue Manager State
	let selectedCueVideoId = $state<number | null>(null);
	let questionSearch = $state('');
	let selectedQuestionId = $state<number | ''>('');
	let cueTriggerTime = $state('00:30');
	let cuePauseVideo = $state(true);
	let cueIsMandatory = $state(false);

	// Preload if navigated with ?edit=<id>
	let preloadedEditId = $state<number | null>(null);
	$effect(() => {
		if (data.editingVideoId && preloadedEditId !== data.editingVideoId) {
			const found = data.videos.find((v) => v.id === data.editingVideoId);
			if (found) {
				loadIntoEditor(found, data.editingTranscriptVtt);
				preloadedEditId = data.editingVideoId;
			}
		}
	});

	function loadIntoEditor(
		v: (typeof data.videos)[number],
		vtt = ''
	) {
		editingId = v.id;
		titleAr = v.titleAr;
		slug = v.slug;
		description = v.description;
		yearSubjectId = v.yearSubjectId;
		trimesterId = v.trimesterId || '';
		lessonId = v.lessonId || '';
		videoUrl = v.embedUrl;
		durationInput = v.durationSec > 0 ? formatTimestamp(v.durationSec) : '';
		thumbnailUrl = v.thumbnailUrl;
		accessTier =
			v.accessTier === 'registered' || v.accessTier === 'premium' ? v.accessTier : 'public';
		isPublished = v.isPublished;
		transcriptRaw = vtt;
		selectedCueVideoId = v.id;
	}

	function resetEditor() {
		editingId = null;
		titleAr = '';
		slug = '';
		description = '';
		yearSubjectId = data.yearSubjects[0]?.id ?? '';
		trimesterId = '';
		lessonId = '';
		videoUrl = '';
		durationInput = '';
		thumbnailUrl = '';
		accessTier = 'public';
		isPublished = true;
		transcriptRaw = '';
	}

	// Live URL auto-detection
	let detectedVideo = $derived(parseVideoUrl(videoUrl));

	// Live transcript parsing preview
	let parsedSegmentsPreview = $derived(parseTranscript(transcriptRaw));

	// Filter lessons by selected yearSubjectId when chosen
	let availableLessons = $derived(
		yearSubjectId
			? data.lessons.filter((l) => l.year_subject_id === Number(yearSubjectId))
			: data.lessons
	);

	// Searchable question bank for cue attachment
	let filteredQuestions = $derived.by(() => {
		const q = questionSearch.trim().toLowerCase();
		if (!q) return data.bankQuestions.slice(0, 80);
		return data.bankQuestions
			.filter((item) => {
				const text = `${item.question_text_ar || ''} ${item.question_text || ''} ${item.category_name || ''} ${item.id}`.toLowerCase();
				return text.includes(q);
			})
			.slice(0, 80);
	});

	let activeCueVideo = $derived(
		data.videos.find((v) => v.id === selectedCueVideoId) ?? data.videos[0] ?? null
	);
	let activeVideoCues = $derived(
		activeCueVideo ? (data.cuesByVideo[activeCueVideo.id] ?? []) : []
	);

	async function handleTranscriptFilePick(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		transcriptRaw = await file.text();
	}

	const PROVIDER_BADGE: Record<string, string> = {
		youtube: 'bg-red-500/15 text-red-500 border-red-500/30',
		cloudflare_stream: 'bg-orange-500/15 text-orange-500 border-orange-500/30',
		external: 'bg-blue-500/15 text-blue-500 border-blue-500/30'
	};
</script>

<svelte:head>
	<title>استوديو الفيديو التفاعلي — SujetStore Admin</title>
</svelte:head>

<div class="mx-auto max-w-7xl space-y-6 p-2 sm:p-4" dir="rtl">
	<!-- Header -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="flex items-center gap-2.5 text-2xl font-extrabold">
				<Video class="text-primary" size={28} />
				استوديو الفيديو التفاعلي (Video Studio)
			</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				أضف دروس YouTube أو Cloudflare Stream مع تفريغ نصي متزامن (.vtt / .srt) وأسئلة تفاعلية عند لحظات محددة.
			</p>
		</div>

		<button
			type="button"
			onclick={resetEditor}
			class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold shadow-sm transition hover:opacity-90"
		>
			<Plus size={16} />
			فيديو جديد
		</button>
	</div>

	<!-- Action Feedback -->
	{#if form?.success}
		<div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
			<CheckCircle2 size={18} class="shrink-0" />
			<span>{form.message}</span>
		</div>
	{:else if form?.error}
		<div class="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm font-bold text-red-600 dark:text-red-400">
			<ShieldAlert size={18} class="shrink-0" />
			<span>{form.error}</span>
		</div>
	{/if}

	<!-- Main Two-Column Grid: Video Form + Cue Manager -->
	<div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
		<!-- Create / Edit Video & Transcript Form -->
		<form
			method="POST"
			action="?/saveVideo"
			enctype="multipart/form-data"
			use:enhance
			class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm xl:col-span-7"
		>
			<div class="flex items-center justify-between border-b border-border pb-3">
				<h2 class="text-base font-extrabold">
					{editingId ? `تعديل الفيديو #${editingId}` : 'إضافة فيديو تفاعلي جديد'}
				</h2>
				{#if editingId}
					<button
						type="button"
						onclick={resetEditor}
						class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-bold"
					>
						<X size={14} /> إلغاء التعديل
					</button>
				{/if}
			</div>

			{#if editingId}
				<input type="hidden" name="id" value={editingId} />
			{/if}

			<!-- Video Link Auto-Detector -->
			<div class="space-y-2">
				<label for="videoUrl" class="flex items-center gap-1.5 text-xs font-bold">
					<Link2 size={14} class="text-primary" />
					رابط الفيديو (YouTube أو Cloudflare Stream)
				</label>
				<input
					id="videoUrl"
					name="videoUrl"
					type="url"
					dir="ltr"
					required
					bind:value={videoUrl}
					placeholder="https://www.youtube.com/watch?v=... أو https://iframe.videodelivery.net/..."
					class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none"
				/>

				{#if videoUrl.trim()}
					{#if detectedVideo}
						<div class="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
							{#if detectedVideo.thumbnailUrl}
								<img
									src={detectedVideo.thumbnailUrl}
									alt="معاينة"
									class="h-12 w-20 rounded-lg object-cover"
								/>
							{/if}
							<div class="min-w-0 flex-1 space-y-1">
								<div class="flex flex-wrap items-center gap-2">
									<span class="rounded-md border px-2 py-0.5 text-[11px] font-extrabold {PROVIDER_BADGE[detectedVideo.provider]}">
										{detectedVideo.provider}
									</span>
									<span class="font-mono text-[11px] font-bold" dir="ltr">
										ID: {detectedVideo.externalId}
									</span>
								</div>
								<p class="text-muted-foreground truncate font-mono text-[11px]" dir="ltr">
									{detectedVideo.embedUrl}
								</p>
							</div>
						</div>
					{:else}
						<p class="text-xs font-bold text-red-500">
							لم يتم التعرف على رابط صالح — تأكد من لصق رابط http/https كامل.
						</p>
					{/if}
				{/if}
			</div>

			<!-- Basic Info -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<label for="titleAr" class="mb-1.5 block text-xs font-bold">عنوان الفيديو (بالعربية)</label>
					<input
						id="titleAr"
						name="titleAr"
						required
						bind:value={titleAr}
						placeholder="مثال: شرح نظرية طالس وتطبيقاتها — الرابعة متوسط"
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2 text-sm outline-none"
					/>
				</div>

				<div>
					<label for="slug" class="mb-1.5 block text-xs font-bold">الرابط المختصر Slug (اختياري)</label>
					<input
						id="slug"
						name="slug"
						dir="ltr"
						bind:value={slug}
						placeholder="thales-theorem-4am"
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2 font-mono text-xs outline-none"
					/>
				</div>

				<div>
					<label for="durationSec" class="mb-1.5 block text-xs font-bold">المدة (MM:SS أو ثوانٍ)</label>
					<input
						id="durationSec"
						name="durationSec"
						dir="ltr"
						bind:value={durationInput}
						placeholder="12:45"
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2 font-mono text-xs outline-none"
					/>
				</div>

				<div>
					<label for="yearSubjectId" class="mb-1.5 block text-xs font-bold">المستوى والمادة</label>
					<select
						id="yearSubjectId"
						name="yearSubjectId"
						required
						bind:value={yearSubjectId}
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3 py-2 text-sm outline-none"
					>
						<option value="">-- اختر المستوى والمادة --</option>
						{#each data.yearSubjects as ys}
							<option value={ys.id}>
								{ys.level_ar} · {ys.year_ar} {ys.stream_ar ? `(${ys.stream_ar})` : ''} — {ys.subject_ar}
							</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="trimesterId" class="mb-1.5 block text-xs font-bold">الفصل الدراسي (اختياري)</label>
					<select
						id="trimesterId"
						name="trimesterId"
						bind:value={trimesterId}
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3 py-2 text-sm outline-none"
					>
						<option value="">-- غير محدد --</option>
						{#each data.trimesters as t}
							<option value={t.id}>{t.name_ar}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="lessonId" class="mb-1.5 block text-xs font-bold">ربط بدرس تفاعلي (اختياري)</label>
					<select
						id="lessonId"
						name="lessonId"
						bind:value={lessonId}
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3 py-2 text-sm outline-none"
					>
						<option value="">-- بدون درس مرتبط --</option>
						{#each availableLessons as lesson}
							<option value={lesson.id}>{lesson.title_ar || lesson.title}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="accessTier" class="mb-1.5 block text-xs font-bold">مستوى الوصول</label>
					<select
						id="accessTier"
						name="accessTier"
						bind:value={accessTier}
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3 py-2 text-sm outline-none"
					>
						<option value="public">عام (للجميع)</option>
						<option value="registered">للمسجلين فقط (حساب مجاني)</option>
						<option value="premium">مشتركو Pro فقط</option>
					</select>
				</div>

				<div class="sm:col-span-2">
					<label for="description" class="mb-1.5 block text-xs font-bold">وصف مختصر</label>
					<textarea
						id="description"
						name="description"
						rows="2"
						bind:value={description}
						placeholder="ملخص ما سيتعلمه التلميذ في هذا الفيديو..."
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2 text-sm outline-none"
					></textarea>
				</div>

				<div class="sm:col-span-2">
					<label for="thumbnailUrl" class="mb-1.5 block text-xs font-bold">
						صورة مصغرة مخصّصة (اختياري — تُستخرج تلقائياً إن تُركت فارغة)
					</label>
					<input
						id="thumbnailUrl"
						name="thumbnailUrl"
						dir="ltr"
						bind:value={thumbnailUrl}
						placeholder="https://..."
						class="bg-background border-border focus:border-primary w-full rounded-xl border px-3.5 py-2 text-xs outline-none"
					/>
				</div>
			</div>

			<!-- Transcript Paste / Upload -->
			<div class="border-border space-y-2.5 border-t pt-4">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<label for="transcriptRaw" class="flex items-center gap-1.5 text-xs font-extrabold">
						<FileText size={15} class="text-primary" />
						التفريغ النصي المتزامن (WebVTT / SRT / [MM:SS])
					</label>

					<label class="border-border hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition">
						<Upload size={13} />
						رفع ملف .vtt / .srt
						<input
							type="file"
							name="transcriptFile"
							accept=".vtt,.srt,.txt"
							onchange={handleTranscriptFilePick}
							class="sr-only"
						/>
					</label>
				</div>

				<textarea
					id="transcriptRaw"
					name="transcriptRaw"
					rows="6"
					bind:value={transcriptRaw}
					placeholder={`WEBVTT\n\n00:00.000 --> 00:12.000\nمرحباً بكم في درس اليوم حول نظرية طالس.\n\nأو ببساطة:\n[00:00] مرحباً بكم في درس اليوم\n[00:15] نبدأ بشرح الشروط الأساسية للنظرية`}
					class="bg-background border-border focus:border-primary w-full rounded-xl border p-3 font-mono text-xs leading-relaxed outline-none"
				></textarea>

				<div class="flex flex-wrap items-center justify-between gap-2 text-xs">
					<span class="font-bold {parsedSegmentsPreview.length > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}">
						عدد الفقرات المكتشفة تلقائياً: {parsedSegmentsPreview.length} فقرة
					</span>
					{#if parsedSegmentsPreview.length > 0}
						<span class="text-muted-foreground text-[11px]">
							أول فقرة: [{formatTimestamp(parsedSegmentsPreview[0].startSec)}] {parsedSegmentsPreview[0].textAr.slice(0, 45)}...
						</span>
					{/if}
				</div>
			</div>

			<!-- Publish Checkbox + Submit -->
			<div class="flex flex-wrap items-center justify-between gap-3 pt-2">
				<label class="inline-flex cursor-pointer items-center gap-2 text-xs font-bold">
					<input type="checkbox" name="isPublished" bind:checked={isPublished} class="h-4 w-4 rounded" />
					نشر الفيديو للجمهور
				</label>

				<button
					type="submit"
					class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-extrabold shadow-md transition hover:opacity-90"
				>
					<Save size={16} />
					{editingId ? 'حفظ التعديلات' : 'إنشاء الفيديو وحفظ التفريغ'}
				</button>
			</div>
		</form>

		<!-- In-Video Cue Questions Manager -->
		<section class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm xl:col-span-5">
			<div class="border-border border-b pb-3">
				<h2 class="flex items-center gap-2 text-base font-extrabold">
					<HelpCircle size={18} class="text-primary" />
					الأسئلة التفاعلية داخل الفيديو (Cue Quizzes)
				</h2>
				<p class="text-muted-foreground mt-1 text-xs">
					اختر فيديو ثم اربط أسئلة من بنك الأسئلة عند طوابع زمنية محددة (MM:SS).
				</p>
			</div>

			{#if data.videos.length === 0}
				<p class="text-muted-foreground py-8 text-center text-xs font-semibold">
					أنشئ أول فيديو تفاعلي لإضافة الأسئلة المدمجة عليه.
				</p>
			{:else}
				<div class="space-y-2">
					<label for="cueVideoSelect" class="block text-xs font-bold">الفيديو المحدد</label>
					<select
						id="cueVideoSelect"
						value={activeCueVideo?.id ?? ''}
						onchange={(e) => (selectedCueVideoId = Number(e.currentTarget.value))}
						class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm font-semibold outline-none"
					>
						{#each data.videos as v}
							<option value={v.id}>
								#{v.id} — {v.titleAr} ({v.cueCount} سؤال)
							</option>
						{/each}
					</select>
				</div>

				{#if activeCueVideo}
					<!-- Add Cue Form -->
					<form method="POST" action="?/addCue" use:enhance class="bg-muted/40 border-border space-y-3 rounded-xl border p-4">
						<input type="hidden" name="videoId" value={activeCueVideo.id} />

						<div>
							<label for="questionSearch" class="mb-1 block text-xs font-bold">ابحث في بنك الأسئلة</label>
							<input
								id="questionSearch"
								type="text"
								bind:value={questionSearch}
								placeholder="ابحث بنص السؤال أو التصنيف أو المعرف..."
								class="bg-background border-border w-full rounded-lg border px-3 py-1.5 text-xs outline-none"
							/>
						</div>

						<div>
							<label for="questionId" class="mb-1 block text-xs font-bold">السؤال</label>
							<select
								id="questionId"
								name="questionId"
								required
								bind:value={selectedQuestionId}
								class="bg-background border-border w-full rounded-lg border px-3 py-2 text-xs outline-none"
							>
								<option value="">-- اختر سؤالاً ({filteredQuestions.length}) --</option>
								{#each filteredQuestions as q}
									<option value={q.id}>
										[#{q.id} · {q.type}] {(q.question_text_ar || q.question_text).slice(0, 75)}
									</option>
								{/each}
							</select>
						</div>

						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div>
								<label for="triggerTime" class="mb-1 block text-xs font-bold">التوقيت (MM:SS)</label>
								<input
									id="triggerTime"
									name="triggerTime"
									dir="ltr"
									required
									bind:value={cueTriggerTime}
									placeholder="02:15"
									class="bg-background border-border w-full rounded-lg border px-3 py-1.5 font-mono text-xs outline-none"
								/>
							</div>

							<div class="flex flex-col justify-center gap-1.5 text-xs font-bold">
								<label class="inline-flex cursor-pointer items-center gap-1.5">
									<input type="checkbox" name="pauseVideo" bind:checked={cuePauseVideo} />
									إيقاف الفيديو تلقائياً
								</label>
								<label class="inline-flex cursor-pointer items-center gap-1.5">
									<input type="checkbox" name="isMandatory" bind:checked={cueIsMandatory} />
									سؤال إجباري للمتابعة
								</label>
							</div>
						</div>

						<button
							type="submit"
							class="bg-primary text-primary-foreground inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-extrabold transition hover:opacity-90"
						>
							<Plus size={15} />
							ربط السؤال عند {cueTriggerTime}
						</button>
					</form>

					<!-- Attached Cues List -->
					<div class="space-y-2">
						<h3 class="text-xs font-extrabold">
							الأسئلة المربوطة بهذا الفيديو ({activeVideoCues.length})
						</h3>

						{#if activeVideoCues.length === 0}
							<p class="text-muted-foreground rounded-xl border border-dashed p-4 text-center text-xs">
								لا توجد أسئلة مربوطة بهذا الفيديو بعد.
							</p>
						{:else}
							<div class="space-y-2">
								{#each activeVideoCues as cue (cue.id)}
									<div class="bg-background border-border flex items-start justify-between gap-2 rounded-xl border p-3">
										<div class="min-w-0 flex-1 space-y-1">
											<div class="flex flex-wrap items-center gap-1.5">
												<span
													dir="ltr"
													class="bg-primary/15 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-extrabold"
												>
													<Clock size={11} />
													{formatTimestamp(cue.triggerSec)}
												</span>
												<span class="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-[10px]">
													{cue.type}
												</span>
												{#if cue.isMandatory}
													<span class="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-500">
														إجباري
													</span>
												{/if}
											</div>
											<p class="line-clamp-2 text-xs font-semibold">{cue.questionPreview}</p>
										</div>

										<form method="POST" action="?/deleteCue" use:enhance>
											<input type="hidden" name="cueId" value={cue.id} />
											<button
												type="submit"
												class="text-muted-foreground rounded-lg p-1.5 transition hover:bg-red-500/10 hover:text-red-500"
												title="حذف الربط"
											>
												<Trash2 size={15} />
											</button>
										</form>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/if}
		</section>
	</div>

	<!-- Videos Catalog Table -->
	<section class="bg-card border-border space-y-4 rounded-2xl border p-5 shadow-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-base font-extrabold">الفيديوهات المسجّلة ({data.videos.length})</h2>
		</div>

		{#if data.videos.length === 0}
			<div class="text-muted-foreground py-12 text-center text-sm">
				لا توجد فيديوهات مسجّلة حتى الآن. استخدم النموذج أعلاه لإضافة أول فيديو تفاعلي.
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each data.videos as v (v.id)}
					<div class="bg-background border-border flex flex-col justify-between overflow-hidden rounded-2xl border">
						<div>
							<div class="bg-muted relative aspect-video overflow-hidden">
								{#if v.thumbnailUrl}
									<img src={v.thumbnailUrl} alt={v.titleAr} class="h-full w-full object-cover" />
								{:else}
									<div class="flex h-full w-full items-center justify-center">
										<Video size={36} class="text-muted-foreground opacity-40" />
									</div>
								{/if}
								<span
									class="absolute top-2 right-2 rounded-md border px-2 py-0.5 text-[10px] font-extrabold backdrop-blur-sm {PROVIDER_BADGE[v.provider] || 'bg-black/60 text-white'}"
								>
									{v.provider}
								</span>
								{#if v.durationSec > 0}
									<span
										dir="ltr"
										class="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[11px] font-bold text-white"
									>
										{formatTimestamp(v.durationSec)}
									</span>
								{/if}
							</div>

							<div class="space-y-2 p-4">
								<h3 class="line-clamp-2 text-sm font-extrabold">{v.titleAr}</h3>
								<p class="text-muted-foreground text-xs">
									{v.yearNameAr} · {v.subjectNameAr}
									{#if v.trimesterNameAr} · {v.trimesterNameAr}{/if}
								</p>
								<div class="flex flex-wrap gap-1.5 text-[11px] font-bold">
									<span class="bg-muted rounded-md px-2 py-0.5">
										{v.segmentCount} فقرة نصية
									</span>
									<span class="bg-primary/10 text-primary rounded-md px-2 py-0.5">
										{v.cueCount} سؤال مدمج
									</span>
									<span class="rounded-md px-2 py-0.5 {v.isPublished ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'}">
										{v.isPublished ? 'منشور' : 'مسودة'}
									</span>
								</div>
							</div>
						</div>

						<div class="border-border flex items-center justify-between gap-2 border-t px-4 py-3">
							<div class="flex items-center gap-1.5">
								<a
									href={`/admin/videos?edit=${v.id}`}
									class="border-border hover:bg-muted inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition"
								>
									<Edit3 size={13} />
									تعديل
								</a>
								<a
									href={`/videos/${v.slug}`}
									target="_blank"
									rel="noreferrer"
									class="border-border hover:bg-muted inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition"
								>
									<ExternalLink size={13} />
									معاينة
								</a>
							</div>

							<form method="POST" action="?/deleteVideo" use:enhance>
								<input type="hidden" name="id" value={v.id} />
								<button
									type="submit"
									class="rounded-lg p-1.5 text-red-500 transition hover:bg-red-500/10"
									title="حذف الفيديو"
								>
									<Trash2 size={15} />
								</button>
							</form>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
