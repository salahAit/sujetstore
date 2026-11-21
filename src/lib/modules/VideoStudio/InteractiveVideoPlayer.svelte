<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		Play,
		Pause,
		Search,
		X,
		CheckCircle2,
		XCircle,
		Sparkles,
		HelpCircle,
		Lock,
		ListVideo,
		Clock,
		RotateCcw,
		ArrowDownToLine
	} from 'lucide-svelte';
	import {
		formatTimestamp,
		normalizeArabicText,
		type VideoProvider
	} from './transcript-parser';
	import MathRenderer from '../QuizBuilder/components/shared/MathRenderer.svelte';
	import MCQ from '../QuizBuilder/components/player/questions/MCQ.svelte';
	import TrueFalse from '../QuizBuilder/components/player/questions/TrueFalse.svelte';
	import FillBlank from '../QuizBuilder/components/player/questions/FillBlank.svelte';
	import ShortAnswer from '../QuizBuilder/components/player/questions/ShortAnswer.svelte';
	import Cloze from '../QuizBuilder/components/player/questions/Cloze.svelte';
	import Calculated from '../QuizBuilder/components/player/questions/Calculated.svelte';
	import Ordering from '../QuizBuilder/components/player/questions/Ordering.svelte';
	import DragDrop from '../QuizBuilder/components/player/questions/DragDrop.svelte';
	import Matching from '../QuizBuilder/components/player/questions/Matching.svelte';
	import SentenceReorder from '../QuizBuilder/components/player/questions/SentenceReorder.svelte';
	import Hotspot from '../QuizBuilder/components/player/questions/Hotspot.svelte';
	import DragToImage from '../QuizBuilder/components/player/questions/DragToImage.svelte';
	import Matrix from '../QuizBuilder/components/player/questions/Matrix.svelte';
	import Essay from '../QuizBuilder/components/player/questions/Essay.svelte';

	export interface VideoPlayerVideo {
		id: number;
		slug: string;
		title: string;
		titleAr: string;
		provider: VideoProvider;
		externalId: string;
		embedUrl: string;
		durationSec: number;
		thumbnailUrl?: string | null;
	}

	export interface VideoTranscriptSegmentItem {
		id?: number;
		seqIndex: number;
		startSec: number;
		endSec: number;
		textAr: string;
		textNormalized: string;
	}

	export interface VideoCueQuestionItem {
		id: number;
		triggerSec: number;
		questionId: number;
		isMandatory: boolean;
		pauseVideo: boolean;
		type: string;
		difficulty?: string | null;
		questionText: string;
		questionTextAr?: string | null;
		imageUrl?: string | null;
		imageCaption?: string | null;
		questionData: any;
	}

	interface CueSubmitFeedback {
		isCorrect: boolean;
		explanation: string | null;
		correctAnswer: string;
		xpEarned: number;
	}

	let {
		video,
		segments = [],
		cueQuestions = [],
		initialStartSec = 0,
		initialAnsweredCueIds = [],
		isAuthenticated = false
	}: {
		video: VideoPlayerVideo;
		segments?: VideoTranscriptSegmentItem[];
		cueQuestions?: VideoCueQuestionItem[];
		initialStartSec?: number;
		initialAnsweredCueIds?: number[];
		isAuthenticated?: boolean;
	} = $props();

	// Playback state
	let currentTime = $state(0);
	let detectedDuration = $state(0);
	let isPlaying = $state(false);
	let playerReady = $state(false);

	// Transcript state
	let searchQuery = $state('');
	let autoScroll = $state(true);
	let transcriptContainerEl = $state<HTMLDivElement | null>(null);
	let lastScrolledSeq = $state(-1);

	// Cue modal state
	let activeCue = $state<VideoCueQuestionItem | null>(null);
	let cueDraftAnswer = $state<any>(null);
	let cueSubmitting = $state(false);
	let cueSubmitError = $state<string | null>(null);
	let cueFeedback = $state<CueSubmitFeedback | null>(null);
	let answeredCueMap = $state<Record<number, boolean>>({});
	let triggeredCueIds = $state<Set<number>>(new Set());

	// Player DOM refs & instances
	let ytMountEl = $state<HTMLDivElement | null>(null);
	let cfIframeEl = $state<HTMLIFrameElement | null>(null);
	let htmlVideoEl = $state<HTMLVideoElement | null>(null);
	let ytPlayer: any = null;
	let cfStreamPlayer: any = null;
	let pollTimer: ReturnType<typeof setInterval> | null = null;
	let progressTimer: ReturnType<typeof setInterval> | null = null;
	let lastSavedPos = -1;
	let lastTimeTick = 0;

	// Sync initial answered cue IDs and start time once
	let initializedProps = $state(false);
	$effect(() => {
		if (!initializedProps) {
			currentTime = Math.max(0, Math.floor(initialStartSec || 0));
			const map: Record<number, boolean> = {};
			for (const cid of initialAnsweredCueIds || []) {
				map[cid] = true;
			}
			answeredCueMap = map;
			initializedProps = true;
		}
	});

	let effectiveDuration = $derived.by(() => {
		const fromPlayer = Math.floor(detectedDuration || 0);
		const fromMeta = Math.floor(video.durationSec || 0);
		const fromSegments =
			segments.length > 0 ? Math.max(...segments.map((s) => s.endSec || 0)) : 0;
		const fromCues =
			cueQuestions.length > 0 ? Math.max(...cueQuestions.map((c) => c.triggerSec + 10)) : 0;
		return Math.max(fromPlayer, fromMeta, fromSegments, fromCues, 1);
	});

	let sortedCues = $derived([...cueQuestions].sort((a, b) => a.triggerSec - b.triggerSec));

	let isDirectHtmlVideo = $derived(
		video.provider === 'external' &&
			/\.(mp4|webm|ogg|m4v)(\?.*)?$/i.test(video.embedUrl || '')
	);

	let cloudflareIframeSrc = $derived.by(() => {
		if (video.provider !== 'cloudflare_stream') return video.embedUrl;
		try {
			const u = new URL(video.embedUrl);
			if (initialStartSec > 0) {
				u.searchParams.set('startTime', String(Math.floor(initialStartSec)));
			}
			return u.toString();
		} catch {
			return video.embedUrl;
		}
	});

	let normalizedQuery = $derived(normalizeArabicText(searchQuery));

	let filteredSegments = $derived.by(() => {
		if (!normalizedQuery) return segments;
		return segments.filter((seg) => {
			const haystack = seg.textNormalized || normalizeArabicText(seg.textAr);
			return haystack.includes(normalizedQuery);
		});
	});

	let activeSegmentSeq = $derived.by(() => {
		const t = currentTime;
		for (let i = 0; i < segments.length; i++) {
			const seg = segments[i];
			if (t >= seg.startSec && t < seg.endSec) {
				return seg.seqIndex;
			}
		}
		// Fallback to latest segment that already started
		let latest = -1;
		for (const seg of segments) {
			if (t >= seg.startSec) latest = seg.seqIndex;
		}
		return latest;
	});

	// Smooth auto-scroll inside transcript panel only (never scrolls whole window)
	$effect(() => {
		const seq = activeSegmentSeq;
		if (!autoScroll || normalizedQuery || seq < 0 || seq === lastScrolledSeq) return;
		const container = transcriptContainerEl;
		if (!container) return;
		const activeEl = container.querySelector<HTMLElement>(`[data-seg-seq="${seq}"]`);
		if (!activeEl) return;

		lastScrolledSeq = seq;
		const targetTop =
			activeEl.offsetTop - container.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;
		container.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
	});

	function handleTimeUpdate(newSec: number) {
		if (!Number.isFinite(newSec) || newSec < 0) return;
		const prev = lastTimeTick;
		currentTime = newSec;
		lastTimeTick = newSec;

		// Check cue crossings while playing forward (not during big seeks)
		if (activeCue || sortedCues.length === 0) return;
		const delta = newSec - prev;
		if (delta < 0 || delta > 4) return;

		for (const cue of sortedCues) {
			if (triggeredCueIds.has(cue.id)) continue;
			if (answeredCueMap[cue.id]) continue;
			if (prev <= cue.triggerSec && newSec >= cue.triggerSec) {
				triggerCue(cue);
				break;
			}
		}
	}

	function triggerCue(cue: VideoCueQuestionItem, manual = false) {
		if (!manual) {
			const next = new Set(triggeredCueIds);
			next.add(cue.id);
			triggeredCueIds = next;
		}
		if (cue.pauseVideo || manual) {
			pausePlayback();
		}
		activeCue = cue;
		cueDraftAnswer = null;
		cueSubmitError = null;
		cueFeedback = null;
	}

	function playPlayback() {
		try {
			if (video.provider === 'youtube' && ytPlayer?.playVideo) {
				ytPlayer.playVideo();
			} else if (video.provider === 'cloudflare_stream' && cfStreamPlayer?.play) {
				cfStreamPlayer.play();
			} else if (htmlVideoEl) {
				htmlVideoEl.play().catch(() => {});
			}
		} catch {
			// Ignore autoplay restrictions
		}
	}

	function pausePlayback() {
		try {
			if (video.provider === 'youtube' && ytPlayer?.pauseVideo) {
				ytPlayer.pauseVideo();
			} else if (video.provider === 'cloudflare_stream' && cfStreamPlayer?.pause) {
				cfStreamPlayer.pause();
			} else if (htmlVideoEl) {
				htmlVideoEl.pause();
			}
		} catch {
			// Ignore player pause errors
		}
	}

	function seekTo(sec: number, autoPlay = true) {
		const target = Math.max(0, Math.floor(sec));
		currentTime = target;
		lastTimeTick = target;

		try {
			if (video.provider === 'youtube' && ytPlayer?.seekTo) {
				ytPlayer.seekTo(target, true);
				if (autoPlay && ytPlayer.playVideo) ytPlayer.playVideo();
			} else if (video.provider === 'cloudflare_stream' && cfStreamPlayer) {
				cfStreamPlayer.currentTime = target;
				if (autoPlay && cfStreamPlayer.play) cfStreamPlayer.play();
			} else if (htmlVideoEl) {
				htmlVideoEl.currentTime = target;
				if (autoPlay) htmlVideoEl.play().catch(() => {});
			}
		} catch {
			// Ignore seek error if player is still booting
		}
	}

	async function saveWatchProgress(forceCompleted = false) {
		if (!isAuthenticated) return;
		const pos = Math.floor(currentTime);
		if (!forceCompleted && pos === lastSavedPos) return;
		lastSavedPos = pos;

		const completed =
			forceCompleted || (effectiveDuration > 10 && pos >= Math.floor(effectiveDuration * 0.9));

		try {
			await fetch(`/api/v1/videos/${video.id}/progress`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				keepalive: true,
				body: JSON.stringify({ lastPositionSec: pos, completed })
			});
		} catch {
			// Ignore transient network failures
		}
	}

	async function submitCueAnswer() {
		if (!activeCue || cueSubmitting) return;
		if (cueDraftAnswer === null || cueDraftAnswer === undefined) {
			cueSubmitError = 'يرجى اختيار أو كتابة إجابة قبل التحقق.';
			return;
		}

		cueSubmitting = true;
		cueSubmitError = null;
		try {
			const res = await fetch(`/api/v1/videos/${video.id}/cue-answer`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cueId: activeCue.id,
					questionId: activeCue.questionId,
					answer: cueDraftAnswer
				})
			});
			const data = await res.json();
			if (!res.ok) {
				cueSubmitError = data?.error || 'تعذر تصحيح الإجابة حالياً.';
				return;
			}
			cueFeedback = {
				isCorrect: Boolean(data.isCorrect),
				explanation: data.explanation ?? null,
				correctAnswer: String(data.correctAnswer ?? ''),
				xpEarned: Number(data.xpEarned ?? 0)
			};
			answeredCueMap = {
				...answeredCueMap,
				[activeCue.id]: Boolean(data.isCorrect) || Boolean(answeredCueMap[activeCue.id])
			};
		} catch {
			cueSubmitError = 'تعذر الاتصال بالخادم لتصحيح الإجابة.';
		} finally {
			cueSubmitting = false;
		}
	}

	function closeCueAndResume() {
		activeCue = null;
		cueFeedback = null;
		cueDraftAnswer = null;
		cueSubmitError = null;
		playPlayback();
	}

	function retryActiveCue() {
		cueFeedback = null;
		cueDraftAnswer = null;
		cueSubmitError = null;
	}

	function handleCueDraftAnswer(ans: unknown) {
		cueDraftAnswer = ans;
	}

	function loadExternalScript(src: string, id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (document.getElementById(id)) {
				resolve();
				return;
			}
			const s = document.createElement('script');
			s.id = id;
			s.src = src;
			s.async = true;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error(`Failed to load ${src}`));
			document.head.appendChild(s);
		});
	}

	async function initYouTubePlayer() {
		if (!ytMountEl) return;

		const setup = () => {
			const YT = (window as any).YT;
			if (!YT?.Player || !ytMountEl) return;

			ytPlayer = new YT.Player(ytMountEl, {
				videoId: video.externalId,
				width: '100%',
				height: '100%',
				playerVars: {
					rel: 0,
					modestbranding: 1,
					playsinline: 1,
					hl: 'ar',
					start: Math.max(0, Math.floor(initialStartSec || 0))
				},
				events: {
					onReady: (ev: any) => {
						playerReady = true;
						const dur = Number(ev?.target?.getDuration?.() || 0);
						if (dur > 0) detectedDuration = dur;
						if (initialStartSec > 0) {
							ev.target.seekTo(Math.floor(initialStartSec), true);
						}
					},
					onStateChange: (ev: any) => {
						const YTState = (window as any).YT?.PlayerState;
						if (!YTState) return;
						if (ev.data === YTState.PLAYING) {
							isPlaying = true;
							const dur = Number(ytPlayer?.getDuration?.() || 0);
							if (dur > 0) detectedDuration = dur;
						} else if (ev.data === YTState.PAUSED) {
							isPlaying = false;
							saveWatchProgress(false);
						} else if (ev.data === YTState.ENDED) {
							isPlaying = false;
							saveWatchProgress(true);
						}
					}
				}
			});

			pollTimer = setInterval(() => {
				if (ytPlayer?.getCurrentTime) {
					const t = Number(ytPlayer.getCurrentTime());
					if (Number.isFinite(t)) {
						handleTimeUpdate(t);
					}
					if (!detectedDuration && ytPlayer.getDuration) {
						const d = Number(ytPlayer.getDuration());
						if (d > 0) detectedDuration = d;
					}
				}
			}, 250);
		};

		if ((window as any).YT?.Player) {
			setup();
			return;
		}

		const prevReady = (window as any).onYouTubeIframeAPIReady;
		(window as any).onYouTubeIframeAPIReady = () => {
			if (typeof prevReady === 'function') prevReady();
			setup();
		};

		try {
			await loadExternalScript('https://www.youtube.com/iframe_api', 'yt-iframe-api-script');
			if ((window as any).YT?.Player && !ytPlayer) {
				setup();
			}
		} catch {
			// Fallback handled gracefully
		}
	}

	async function initCloudflareStreamPlayer() {
		if (!cfIframeEl) return;
		try {
			await loadExternalScript(
				'https://embed.cloudflarestream.com/embed/sdk.latest.js',
				'cf-stream-sdk-script'
			);
			const StreamCtor = (window as any).Stream;
			if (typeof StreamCtor === 'function' && cfIframeEl) {
				cfStreamPlayer = StreamCtor(cfIframeEl);
				playerReady = true;

				cfStreamPlayer.addEventListener('loadedmetadata', () => {
					const dur = Number(cfStreamPlayer?.duration || 0);
					if (dur > 0) detectedDuration = dur;
					if (initialStartSec > 0) {
						cfStreamPlayer.currentTime = Math.floor(initialStartSec);
					}
				});
				cfStreamPlayer.addEventListener('play', () => {
					isPlaying = true;
				});
				cfStreamPlayer.addEventListener('pause', () => {
					isPlaying = false;
					saveWatchProgress(false);
				});
				cfStreamPlayer.addEventListener('ended', () => {
					isPlaying = false;
					saveWatchProgress(true);
				});
				cfStreamPlayer.addEventListener('timeupdate', () => {
					const t = Number(cfStreamPlayer?.currentTime || 0);
					handleTimeUpdate(t);
					const dur = Number(cfStreamPlayer?.duration || 0);
					if (dur > 0 && !detectedDuration) detectedDuration = dur;
				});
			}
		} catch {
			playerReady = true;
		}
	}

	onMount(() => {
		if (video.provider === 'youtube') {
			initYouTubePlayer();
		} else if (video.provider === 'cloudflare_stream') {
			initCloudflareStreamPlayer();
		} else if (htmlVideoEl) {
			playerReady = true;
		}

		if (isAuthenticated) {
			progressTimer = setInterval(() => {
				if (isPlaying) {
					saveWatchProgress(false);
				}
			}, 10_000);
		}
	});

	onDestroy(() => {
		if (pollTimer) clearInterval(pollTimer);
		if (progressTimer) clearInterval(progressTimer);
		if (isAuthenticated && currentTime > 0) {
			saveWatchProgress(false);
		}
		try {
			ytPlayer?.destroy?.();
		} catch {
			// Ignore
		}
	});

	let answeredCount = $derived(Object.values(answeredCueMap).filter(Boolean).length);
	let progressPct = $derived(Math.min(100, Math.max(0, (currentTime / effectiveDuration) * 100)));
</script>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-12" dir="rtl">
	<!-- Main Video Column -->
	<div class="space-y-4 lg:col-span-8">
		<!-- Video Container -->
		<div class="bg-card border-border relative overflow-hidden rounded-2xl border shadow-lg">
			<div class="relative aspect-video w-full bg-black">
				{#if video.provider === 'youtube'}
					<div bind:this={ytMountEl} class="h-full w-full"></div>
				{:else if video.provider === 'cloudflare_stream'}
					<iframe
						bind:this={cfIframeEl}
						src={cloudflareIframeSrc}
						title={video.titleAr || video.title}
						class="h-full w-full border-0"
						allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
						allowfullscreen
					></iframe>
				{:else if isDirectHtmlVideo}
					<video
						bind:this={htmlVideoEl}
						src={video.embedUrl}
						poster={video.thumbnailUrl || undefined}
						controls
						playsinline
						class="h-full w-full"
						onloadedmetadata={() => {
							if (htmlVideoEl) {
								if (htmlVideoEl.duration > 0) detectedDuration = htmlVideoEl.duration;
								if (initialStartSec > 0) htmlVideoEl.currentTime = Math.floor(initialStartSec);
							}
						}}
						onplay={() => (isPlaying = true)}
						onpause={() => {
							isPlaying = false;
							saveWatchProgress(false);
						}}
						onended={() => {
							isPlaying = false;
							saveWatchProgress(true);
						}}
						ontimeupdate={() => {
							if (htmlVideoEl) handleTimeUpdate(htmlVideoEl.currentTime);
						}}
					>
						<track kind="captions" />
					</video>
				{:else}
					<iframe
						src={video.embedUrl}
						title={video.titleAr || video.title}
						class="h-full w-full border-0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowfullscreen
					></iframe>
				{/if}
			</div>

			<!-- Cue Timeline Strip -->
			<div class="border-border bg-card space-y-3 border-t p-4">
				<div class="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={() => (isPlaying ? pausePlayback() : playPlayback())}
							class="bg-primary text-primary-foreground inline-flex h-8 w-8 items-center justify-center rounded-xl transition hover:opacity-90"
							aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
						>
							{#if isPlaying}
								<Pause size={15} />
							{:else}
								<Play size={15} />
							{/if}
						</button>
						<span class="font-mono text-xs" dir="ltr">
							{formatTimestamp(currentTime)} / {formatTimestamp(effectiveDuration)}
						</span>
						{#if !playerReady && video.provider === 'youtube'}
							<span class="text-muted-foreground text-[11px]">جاري تحميل المشغّل...</span>
						{/if}
					</div>

					{#if sortedCues.length > 0}
						<div class="flex items-center gap-1.5 text-xs">
							<HelpCircle size={14} class="text-primary" />
							<span>الأسئلة التفاعلية:</span>
							<span class="text-primary font-extrabold">
								{answeredCount} / {sortedCues.length}
							</span>
						</div>
					{/if}
				</div>

				<!-- Progress Track with Visual Cue Markers -->
				<div class="relative py-2" dir="ltr">
					<div class="bg-muted relative h-2.5 w-full overflow-visible rounded-full">
						<div
							class="bg-primary h-full rounded-full transition-all duration-200"
							style="width: {progressPct}%"
						></div>

						{#each sortedCues as cue, idx (cue.id)}
							{@const leftPct = Math.min(98, Math.max(2, (cue.triggerSec / effectiveDuration) * 100))}
							{@const done = Boolean(answeredCueMap[cue.id])}
							<button
								type="button"
								onclick={() => triggerCue(cue, true)}
								title={`سؤال #${idx + 1} عند ${formatTimestamp(cue.triggerSec)}${cue.isMandatory ? ' (إجباري)' : ''}`}
								style="left: {leftPct}%"
								class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform hover:scale-125 {done
									? 'bg-emerald-500 text-white'
									: cue.isMandatory
										? 'bg-amber-500 text-white'
										: 'bg-indigo-600 text-white'}"
							>
								{#if done}
									<CheckCircle2 size={11} />
								{:else if cue.isMandatory}
									<Lock size={10} />
								{:else}
									<span class="text-[9px] font-extrabold">{idx + 1}</span>
								{/if}
							</button>
						{/each}
					</div>
				</div>

				<!-- Mobile-friendly Cue Pills -->
				{#if sortedCues.length > 0}
					<div class="flex flex-wrap gap-2 pt-1">
						{#each sortedCues as cue, idx (cue.id)}
							{@const done = Boolean(answeredCueMap[cue.id])}
							<button
								type="button"
								onclick={() => triggerCue(cue, true)}
								class="inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition {done
									? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
									: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 dark:text-indigo-400'}"
							>
								{#if done}
									<CheckCircle2 size={13} />
								{:else}
									<HelpCircle size={13} />
								{/if}
								<span>سؤال {idx + 1}</span>
								<span class="font-mono text-[11px] opacity-80" dir="ltr">
									{formatTimestamp(cue.triggerSec)}
								</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Synchronized Transcript Column -->
	<aside class="bg-card border-border flex max-h-[640px] flex-col overflow-hidden rounded-2xl border shadow-sm lg:col-span-4">
		<div class="border-border space-y-3 border-b p-4">
			<div class="flex items-center justify-between gap-2">
				<h2 class="flex items-center gap-2 text-sm font-extrabold">
					<ListVideo size={17} class="text-primary" />
					التفريغ النصي المتزامن
					<span class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px]">
						{segments.length}
					</span>
				</h2>

				<button
					type="button"
					onclick={() => (autoScroll = !autoScroll)}
					class="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition {autoScroll
						? 'border-primary/30 bg-primary/10 text-primary'
						: 'border-border text-muted-foreground hover:text-foreground'}"
					title="التمرير التلقائي مع الفيديو"
				>
					<ArrowDownToLine size={12} />
					تلقائي
				</button>
			</div>

			<!-- In-Video Instant Transcript Search -->
			<div class="relative">
				<Search
					size={15}
					class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
				/>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="ابحث داخل شرح الفيديو..."
					class="bg-background border-border focus:border-primary w-full rounded-xl border py-2 pr-9 pl-8 text-xs outline-none transition"
				/>
				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="text-muted-foreground hover:text-foreground absolute top-1/2 left-2.5 -translate-y-1/2"
						aria-label="مسح البحث"
					>
						<X size={14} />
					</button>
				{/if}
			</div>

			{#if normalizedQuery}
				<p class="text-muted-foreground text-[11px] font-semibold">
					تم العثور على <span class="text-primary font-extrabold">{filteredSegments.length}</span> مقطع مطابق
				</p>
			{/if}
		</div>

		<!-- Scrollable Transcript List -->
		<div
			bind:this={transcriptContainerEl}
			class="flex-1 space-y-1.5 overflow-y-auto p-3"
		>
			{#if segments.length === 0}
				<div class="text-muted-foreground flex flex-col items-center justify-center py-12 text-center text-xs">
					<Clock size={26} class="mb-2 opacity-40" />
					<p class="font-bold">لا يوجد تفريغ نصي متاح لهذا الفيديو بعد.</p>
				</div>
			{:else if filteredSegments.length === 0}
				<div class="text-muted-foreground flex flex-col items-center justify-center py-10 text-center text-xs">
					<Search size={24} class="mb-2 opacity-40" />
					<p class="font-bold">لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
				</div>
			{:else}
				{#each filteredSegments as seg (seg.seqIndex)}
					{@const isActive = seg.seqIndex === activeSegmentSeq}
					<button
						type="button"
						data-seg-seq={seg.seqIndex}
						onclick={() => seekTo(seg.startSec, true)}
						class="flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-right transition-all {isActive
							? 'border-primary/40 bg-primary/10 shadow-sm'
							: 'border-transparent hover:bg-muted/60'}"
					>
						<span
							dir="ltr"
							class="mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold {isActive
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground'}"
						>
							{formatTimestamp(seg.startSec)}
						</span>
						<span class="flex-1 text-xs leading-relaxed {isActive ? 'text-foreground font-bold' : 'text-muted-foreground'}">
							{seg.textAr}
						</span>
					</button>
				{/each}
			{/if}
		</div>
	</aside>
</div>

<!-- Inline Interactive Cue Question Modal -->
{#if activeCue}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		dir="rtl"
	>
		<div class="bg-card border-border flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-2xl">
			<!-- Modal Header -->
			<div class="border-border flex items-center justify-between gap-3 border-b px-5 py-4">
				<div class="flex items-center gap-2">
					<span class="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
						<HelpCircle size={20} />
					</span>
					<div>
						<h3 class="text-sm font-extrabold">سؤال تفاعلي داخل الفيديو</h3>
						<p class="text-muted-foreground text-xs">
							عند الدقيقة <span class="font-mono font-bold" dir="ltr">{formatTimestamp(activeCue.triggerSec)}</span>
							{#if activeCue.isMandatory}
								· <span class="font-bold text-amber-500">سؤال إجباري</span>
							{/if}
						</p>
					</div>
				</div>

				{#if !activeCue.isMandatory || cueFeedback}
					<button
						type="button"
						onclick={closeCueAndResume}
						class="text-muted-foreground hover:text-foreground rounded-xl p-1.5 transition"
						aria-label="إغلاق"
					>
						<X size={20} />
					</button>
				{/if}
			</div>

			<!-- Modal Body -->
			<div class="flex-1 space-y-5 overflow-y-auto p-5">
				<div class="text-base leading-relaxed font-bold">
					<MathRenderer content={activeCue.questionTextAr || activeCue.questionText} />
				</div>

				{#if activeCue.imageUrl}
					<figure class="space-y-1.5 text-center">
						<img
							src={activeCue.imageUrl}
							alt={activeCue.imageCaption || 'صورة السؤال'}
							class="mx-auto max-h-60 rounded-xl border object-contain"
						/>
						{#if activeCue.imageCaption}
							<figcaption class="text-muted-foreground text-xs">{activeCue.imageCaption}</figcaption>
						{/if}
					</figure>
				{/if}

				{#if !cueFeedback}
					{#key activeCue.id}
						{#if activeCue.type === 'mcq'}
							<MCQ data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'true_false'}
							<TrueFalse data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'fill_blank'}
							<FillBlank data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'short_answer'}
							<ShortAnswer data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'cloze'}
							<Cloze data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'calculated'}
							<Calculated data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'ordering'}
							<Ordering data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'drag_drop'}
							<DragDrop data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'matching'}
							<Matching data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'sentence_reorder'}
							<SentenceReorder data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'hotspot'}
							<Hotspot data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'drag_to_image'}
							<DragToImage data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'matrix'}
							<Matrix data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else if activeCue.type === 'essay'}
							<Essay data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{:else}
							<ShortAnswer data={activeCue.questionData} onAnswer={handleCueDraftAnswer} />
						{/if}
					{/key}

					{#if cueSubmitError}
						<div class="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-bold text-red-500">
							{cueSubmitError}
						</div>
					{/if}
				{:else}
					<!-- Result & Immediate Explanation -->
					<div
						class="space-y-3 rounded-2xl border p-4 {cueFeedback.isCorrect
							? 'border-emerald-500/40 bg-emerald-500/10'
							: 'border-red-500/40 bg-red-500/10'}"
					>
						<div class="flex flex-wrap items-center justify-between gap-2">
							<div
								class="flex items-center gap-2 text-base font-extrabold {cueFeedback.isCorrect
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-red-600 dark:text-red-400'}"
							>
								{#if cueFeedback.isCorrect}
									<CheckCircle2 size={22} />
									<span>إجابة صحيحة! أحسنت</span>
								{:else}
									<XCircle size={22} />
									<span>إجابة غير صحيحة — تم حفظها في دفتر الأخطاء للمراجعة</span>
								{/if}
							</div>

							{#if cueFeedback.xpEarned > 0}
								<span class="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-600 dark:text-amber-300">
									<Sparkles size={13} />
									+{cueFeedback.xpEarned} XP
								</span>
							{/if}
						</div>

						{#if !cueFeedback.isCorrect && cueFeedback.correctAnswer}
							<div class="bg-background/70 rounded-xl p-3 text-xs">
								<span class="text-muted-foreground font-bold">الإجابة الصحيحة: </span>
								<span class="text-foreground font-extrabold">{cueFeedback.correctAnswer}</span>
							</div>
						{/if}

						{#if cueFeedback.explanation}
							<div class="bg-background/70 rounded-xl p-3 text-xs leading-relaxed">
								<p class="text-primary mb-1 font-extrabold">التوضيح البيداغوجي:</p>
								<MathRenderer content={cueFeedback.explanation} />
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="border-border flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4">
				{#if !cueFeedback}
					{#if !activeCue.isMandatory}
						<button
							type="button"
							onclick={closeCueAndResume}
							class="text-muted-foreground hover:text-foreground text-xs font-bold transition"
						>
							تخطي ومتابعة الفيديو
						</button>
					{:else}
						<span class="text-muted-foreground text-xs font-semibold">
							أجب عن السؤال لمتابعة الشرح
						</span>
					{/if}

					<button
						type="button"
						disabled={cueSubmitting}
						onclick={submitCueAnswer}
						class="bg-primary text-primary-foreground rounded-xl px-6 py-2.5 text-sm font-extrabold shadow-md transition hover:opacity-90 disabled:opacity-50"
					>
						{cueSubmitting ? 'جاري التصحيح...' : 'تحقق من الإجابة'}
					</button>
				{:else}
					<button
						type="button"
						onclick={retryActiveCue}
						class="border-border hover:bg-muted inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition"
					>
						<RotateCcw size={14} />
						إعادة المحاولة
					</button>
					<button
						type="button"
						onclick={closeCueAndResume}
						class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-extrabold shadow-md transition hover:opacity-90"
					>
						<Play size={15} />
						متابعة المشاهدة
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
