<script lang="ts">
	import {
		ChevronLeft,
		ChevronRight,
		Clock,
		Brain,
		Trophy,
		CheckCircle,
		XCircle,
		RotateCcw,
		AlertTriangle,
		Zap,
		BookOpen,
		Share2,
		Eye,
		EyeOff
	} from 'lucide-svelte';
	import MathRenderer from '../shared/MathRenderer.svelte';
	import MCQ from './questions/MCQ.svelte';
	import TrueFalse from './questions/TrueFalse.svelte';
	import Ordering from './questions/Ordering.svelte';
	import DragDrop from './questions/DragDrop.svelte';
	import Matching from './questions/Matching.svelte';
	import FillBlank from './questions/FillBlank.svelte';
	import ShortAnswer from './questions/ShortAnswer.svelte';
	import Cloze from './questions/Cloze.svelte';
	import Calculated from './questions/Calculated.svelte';
	import SentenceReorder from './questions/SentenceReorder.svelte';
	import Hotspot from './questions/Hotspot.svelte';
	import DragToImage from './questions/DragToImage.svelte';
	import Matrix from './questions/Matrix.svelte';
	import Essay from './questions/Essay.svelte';
	import ShareModal from '#lib/components/ShareModal.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';

	let {
		quiz,
		rawQuestions,
		examDisabled = false,
		onSubmit,
		onShare
	}: {
		quiz: any;
		rawQuestions: any[];
		examDisabled?: boolean;
		onSubmit?: (data: any) => Promise<any> | any;
		onShare?: () => void;
	} = $props();

	function prepareQuestions(list: any[], shuffle: boolean) {
		if (!shuffle) return list || [];
		return (list || []).map((q: any) => {
			if (q.type !== 'mcq' || !Array.isArray(q.questionData?.options)) return q;
			const opts = q.questionData.options.map((opt: any, idx: number) =>
				typeof opt === 'string'
					? { text: opt, originalIndex: idx }
					: { ...opt, originalIndex: opt.originalIndex ?? idx }
			);
			for (let i = opts.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[opts[i], opts[j]] = [opts[j], opts[i]];
			}
			return { ...q, questionData: { ...q.questionData, options: opts } };
		});
	}

	let shuffleSeed = $state(0);
	let questions = $derived.by(() => {
		void shuffleSeed;
		return prepareQuestions(rawQuestions, Boolean(quiz?.shuffleOptions));
	});

	// Mode: 'choose' | 'exam' | 'practice'
	let mode = $state<'choose' | 'exam' | 'practice'>('choose');

	// State
	let currentIndex = $state(0);
	let answers = $state<Record<number, any>>({});
	let submitted = $state(false);
	let isSubmitting = $state(false);
	let submitError = $state<string | null>(null);
	let results = $state<{ score: number; total: number; details: any[] } | null>(null);
	let reward = $state<{ xpEarned: number; newBadges: any[]; streakDays: number } | null>(null);
	let startTime = $state(Date.now());
	let elapsed = $state(0);
	let timerInterval: any;
	let autoSubmitted = $state(false);
	let showReview = $state(false);
	let isShareModalOpen = $state(false);

	// Practice mode state
	let practiceChecked = $state<Record<number, boolean>>({});
	let practiceResults = $state<Record<number, boolean>>({});

	let currentQuestion = $derived(questions[currentIndex]);
	let progress = $derived(questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0);
	let allAnswered = $derived(questions.length > 0 && Object.keys(answers).length === questions.length);
	let percentage = $derived(results && results.total > 0 ? Math.round((results.score / results.total) * 100) : 0);
	let passed = $derived(percentage >= (quiz?.passingScore || 60));
	let canPractice = $derived(Boolean(quiz?.practiceMode) || !quiz?.maxAttempts);
	let allowShowAnswers = $derived(quiz?.showAnswers !== false);

	onMount(() => {
		import('mobile-drag-drop')
			.then(({ polyfill }) => {
				polyfill();
			})
			.catch(() => {});
	});

	// Smart timer
	let hasTimeLimit = $derived(quiz?.timeLimit && quiz.timeLimit > 0);
	let remaining = $derived(hasTimeLimit ? Math.max(0, quiz.timeLimit - elapsed) : 0);
	let timerPercentage = $derived(hasTimeLimit ? (remaining / quiz.timeLimit) * 100 : 100);
	let timerColor = $derived(
		timerPercentage > 50
			? 'text-emerald-400'
			: timerPercentage > 20
				? 'text-amber-400'
				: 'text-red-400'
	);
	let timerBarColor = $derived(
		timerPercentage > 50 ? 'bg-emerald-500' : timerPercentage > 20 ? 'bg-amber-500' : 'bg-red-500'
	);
	let timerUrgent = $derived(hasTimeLimit && remaining <= 30 && remaining > 0);

	const typeLabels: Record<string, string> = {
		mcq: 'اختيار متعدد',
		true_false: 'صحيح / خطأ',
		ordering: 'ترتيب',
		drag_drop: 'سحب وإفلات',
		matching: 'ربط',
		fill_blank: 'ملء فراغ',
		short_answer: 'إجابة قصيرة',
		cloze: 'اختيار من قائمة',
		calculated: 'سؤال حسابي',
		sentence_reorder: 'ترتيب جملة',
		hotspot: 'تحديد منطقة',
		drag_to_image: 'تسميات على صورة',
		matrix: 'شبكة اختيارات',
		essay: 'مقال'
	};

	function startQuiz(selectedMode: 'exam' | 'practice') {
		mode = selectedMode;
		startTime = Date.now();
		elapsed = 0;
		timerInterval = setInterval(() => {
			elapsed = Math.floor((Date.now() - startTime) / 1000);
			// Auto-submit when time is up (exam mode only)
			if (hasTimeLimit && remaining <= 0 && mode === 'exam' && !submitted) {
				autoSubmitted = true;
				submit();
			}
		}, 1000);
	}

	onDestroy(() => {
		clearInterval(timerInterval);
	});

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	function onAnswer(answer: any) {
		answers = { ...answers, [currentQuestion.id]: answer };
	}

	function next() {
		if (currentIndex < questions.length - 1) currentIndex++;
	}

	function prev() {
		if (currentIndex > 0) currentIndex--;
	}

	function goTo(i: number) {
		currentIndex = i;
	}

	function getCorrectAnswer(question: any): string {
		const qd = question.questionData;
		switch (question.type) {
			case 'mcq': {
				const opts = qd.options || [];
				if (qd.correctIndexes) {
					return qd.correctIndexes
						.map((origIdx: number) => {
							const match = opts.find((o: any, idx: number) =>
								typeof o === 'object' ? (o.originalIndex ?? idx) === origIdx : idx === origIdx
							);
							return typeof match === 'string' ? match : match?.text;
						})
						.filter(Boolean)
						.join(', ');
				}
				const correct = opts.filter((o: any) => typeof o === 'object' && o.isCorrect);
				return correct.map((o: any) => o.text).join(', ');
			}
			case 'true_false':
				return qd.correctAnswer ? 'صحيح ✓' : 'خطأ ✗';
			case 'fill_blank':
				return (qd.answers || qd.acceptedAnswers)?.join(' أو ') || '';
			case 'ordering':
				return qd.correctOrder?.map((i: number) => qd.items?.[i]).join(' → ') || '';
			case 'short_answer':
				return (qd.keywords || qd.acceptedKeywords)?.join(', ') || '';
			case 'cloze':
				return qd.options?.[qd.correctIndex] || '';
			case 'calculated':
				return 'يتم حسابه تلقائياً';
			case 'sentence_reorder':
				return qd.correctOrder?.map((i: number) => qd.words?.[i]).join(' ') || '';
			case 'hotspot':
				return qd.zones?.[qd.correctZone]?.label || `المنطقة ${qd.correctZone + 1}`;
			case 'drag_to_image':
				return (qd.labels || []).map((l: any) => l.text).join(', ');
			case 'matrix':
				return (qd.statements || []).map((s: string, i: number) => `${s}: ${qd.columns?.[qd.correctAnswers?.[i]]}`).join(' | ');
			case 'essay':
				return qd.keywords?.length ? `يجب أن تحتوي على: ${qd.keywords.join('، ')}` : 'تصحيح يدوي';
			case 'drag_drop':
				return (qd.items || []).map((item: any) => `${item.text} → ${item.category}`).join(' | ');
			case 'matching':
				return (qd.pairs || []).map((p: any) => `${p.left} ↔ ${p.right}`).join(' | ');
			default:
				return '';
		}
	}

	function getUserAnswer(question: any, answer: any): string {
		if (!answer) return 'لم تتم الإجابة';
		const qd = question.questionData;
		switch (question.type) {
			case 'mcq': {
				const opts = qd.options || [];
				if (answer.selectedIndexes) {
					return answer.selectedIndexes
						.map((origIdx: number) => {
							const match = opts.find((o: any, idx: number) =>
								typeof o === 'object' ? (o.originalIndex ?? idx) === origIdx : idx === origIdx
							);
							return typeof match === 'string' ? match : match?.text;
						})
						.filter(Boolean)
						.join(', ');
				}
				return 'لم تتم الإجابة';
			}
			case 'true_false':
				return answer.value === true
					? 'صحيح ✓'
					: answer.value === false
						? 'خطأ ✗'
						: 'لم تتم الإجابة';
			case 'fill_blank':
			case 'short_answer':
				return answer.text || 'لم تتم الإجابة';
			case 'ordering':
				return answer.order?.join(' → ') || 'لم تتم الإجابة';
			case 'cloze':
				return qd.options?.[answer.selectedIndex] || 'لم تتم الإجابة';
			case 'calculated':
				return answer.value !== undefined ? `${answer.value}` : 'لم تتم الإجابة';
			case 'sentence_reorder':
				return answer.order?.map((i: number) => qd.words?.[i]).join(' ') || 'لم تتم الإجابة';
			case 'hotspot':
				return answer.zone !== undefined ? (qd.zones?.[answer.zone]?.label || `المنطقة ${answer.zone + 1}`) : 'لم تتم الإجابة';
			case 'drag_to_image':
				return Object.keys(answer.placements || {}).length > 0 ? `تم وضع ${Object.keys(answer.placements).length} تسمية` : 'لم تتم الإجابة';
			case 'matrix':
				return Object.keys(answer.answers || {}).length > 0 ? (qd.statements || []).map((s: string, i: number) => `${s}: ${qd.columns?.[answer.answers?.[i]]}`).join(' | ') : 'لم تتم الإجابة';
			case 'essay':
				return answer.text ? `${answer.text.substring(0, 80)}${answer.text.length > 80 ? '...' : ''}` : 'لم تتم الإجابة';
			case 'drag_drop': {
				const assigned = Object.entries(answer.assignments || {}).filter(([_, v]) => v !== null);
				return assigned.length > 0 ? assigned.map(([item, catIdx]) => `${item} → ${qd.categories?.[catIdx as number] || catIdx}`).join(' | ') : 'لم تتم الإجابة';
			}
			case 'matching': {
				const pairs = qd.pairs || [];
				return Object.entries(answer.matches || {}).map(([leftIdx, rightIdx]) => `${pairs[Number(leftIdx)]?.left} ↔ ${pairs[Number(rightIdx)]?.right}`).join(' | ') || 'لم تتم الإجابة';
			}
			default:
				return JSON.stringify(answer);
		}
	}

	function checkAnswer(question: any, answer: any): boolean {
		const qd = question.questionData;
		switch (question.type) {
			case 'mcq': {
				const opts = qd.options || [];
				const correctIdx = qd.correctIndexes
					? [...qd.correctIndexes].map(Number).sort((a, b) => a - b)
					: opts
							.map((opt: any, i: number) =>
								typeof opt === 'object' && opt.isCorrect ? (opt.originalIndex ?? i) : -1
							)
							.filter((i: number) => i >= 0)
							.sort((a: number, b: number) => a - b);
				const picked = [...(answer?.selectedIndexes || [])].map(Number).sort((a, b) => a - b);
				return correctIdx.length > 0 && JSON.stringify(picked) === JSON.stringify(correctIdx);
			}
			case 'true_false':
				return answer?.value === qd.correctAnswer;
			case 'ordering':
				if (!answer?.order) return false;
				const correctItems = (qd.correctOrder || []).map((idx: number) => qd.items?.[idx]);
				return JSON.stringify(answer.order) === JSON.stringify(correctItems);
			case 'drag_drop':
				if (!answer?.assignments || !qd.items?.length) return false;
				return qd.items.every((item: any) => {
					const assignedIdx = answer.assignments[item.text];
					if (assignedIdx === null || assignedIdx === undefined) return false;
					if (typeof item.category === 'number') return Number(assignedIdx) === item.category;
					return qd.categories?.[assignedIdx] === item.category;
				});
			case 'matching':
				if (!answer?.matches || !qd.pairs?.length) return false;
				if (Object.keys(answer.matches).length !== qd.pairs.length) return false;
				return Object.entries(answer.matches).every(([left, right]) => Number(left) === Number(right));
			case 'fill_blank': {
				if (!answer?.text) return false;
				const accepted = qd.answers || qd.acceptedAnswers || [];
				return accepted.some((a: string) => a.toLowerCase().trim() === answer.text.toLowerCase().trim());
			}
			case 'short_answer': {
				if (!answer?.text) return false;
				const kws = qd.keywords || qd.acceptedKeywords || [];
				if (kws.length === 0) return false;
				const matchCount = kws.filter((kw: string) => answer.text.toLowerCase().includes(kw.toLowerCase())).length;
				return matchCount >= (qd.minKeywords || 1);
			}
			case 'cloze':
				return answer?.selectedIndex === qd.correctIndex;
			case 'calculated':
				if (answer?.value === undefined || answer?.value === null) return false;
				return Math.abs(Number(answer.value) - Number(answer.expected)) <= (qd.tolerance ?? 0);
			case 'sentence_reorder':
				if (!answer?.order) return false;
				return JSON.stringify(answer.order) === JSON.stringify(qd.correctOrder);
			case 'hotspot':
				if (answer?.zone === undefined) return false;
				return answer.zone === qd.correctZone;
			case 'drag_to_image':
				return answer?.correct === true;
			case 'matrix':
				return answer?.correct === true;
			case 'essay':
				return answer?.correct === true;
			default:
				return false;
		}
	}

	function parseQuizImageMeta(rawUrl?: string | null): {
		src: string;
		title?: string;
		pins: Array<{ num: string; xPct: number; yPct: number; color: string }>;
		legend: Array<{ num: string; label: string }>;
	} | null {
		if (!rawUrl || typeof rawUrl !== 'string') return null;
		const hashIdx = rawUrl.indexOf('#fig=');
		const baseSrc = (hashIdx >= 0 ? rawUrl.slice(0, hashIdx) : rawUrl).replace(
			/^(\/documents\/illustrations\/.+)\.jpg$/i,
			'$1.webp'
		);
		if (hashIdx < 0) {
			return { src: baseSrc, pins: [], legend: [] };
		}
		try {
			const parsed = JSON.parse(decodeURIComponent(rawUrl.slice(hashIdx + 5))) as {
				title?: string;
				pins?: Array<{ num?: string | number; xPct?: number; yPct?: number; color?: string }>;
				legend?: Array<{ num?: string | number; label?: string }>;
			};
			return {
				src: baseSrc,
				title: parsed.title || undefined,
				pins: Array.isArray(parsed.pins)
					? parsed.pins
							.filter((p) => p && Number.isFinite(p.xPct) && Number.isFinite(p.yPct))
							.map((p) => ({
								num: String(p.num ?? ''),
								xPct: Number(p.xPct),
								yPct: Number(p.yPct),
								color: p.color || '#1d4ed8'
							}))
					: [],
				legend: Array.isArray(parsed.legend)
					? parsed.legend
							.filter((it) => it && it.label)
							.map((it) => ({ num: String(it.num ?? ''), label: String(it.label) }))
					: []
			};
		} catch {
			return { src: baseSrc, pins: [], legend: [] };
		}
	}

	// Practice mode: check current question
	function checkPractice() {
		const q = currentQuestion;
		const answer = answers[q.id];
		const correct = checkAnswer(q, answer);
		practiceChecked = { ...practiceChecked, [q.id]: true };
		practiceResults = { ...practiceResults, [q.id]: correct };
	}

	async function submit() {
		if (submitted || isSubmitting) return;
		isSubmitting = true;
		submitError = null;
		clearInterval(timerInterval);

		let details = questions.map((q: any) => {
			const answer = answers[q.id] || null;
			const correct = checkAnswer(q, answer);
			return {
				question: q,
				answer,
				correct,
				points: correct ? q.points : 0,
				correctAnswer: getCorrectAnswer(q),
				userAnswer: getUserAnswer(q, answer)
			};
		});

		let score = details.reduce((sum: number, d: any) => sum + d.points, 0);
		let total = questions.reduce((sum: number, q: any) => sum + q.points, 0);
		const pct = total > 0 ? Math.round((score / total) * 100) : 0;

		if (mode === 'exam' && onSubmit) {
			try {
				const serverRes = await onSubmit({
					quizId: quiz.id,
					answers,
					score,
					totalPoints: total,
					percentage: pct,
					timeTaken: elapsed,
					details
				});
				if (serverRes?.error) {
					submitError = serverRes.error;
				} else if (serverRes && typeof serverRes.score === 'number') {
					score = serverRes.score;
					total = serverRes.totalPoints ?? total;
					if (Array.isArray(serverRes.gradedDetails)) {
						const byKey = new Map(
							serverRes.gradedDetails.map((gd: any) => [gd.quizQuestionId ?? gd.questionId, gd])
						);
						details = details.map((d: any) => {
							const gd: any = byKey.get(d.question.id) ?? byKey.get(d.question.questionId);
							if (!gd) return d;
							return {
								...d,
								correct: gd.correct,
								points: gd.pointsEarned,
								correctAnswer: gd.correctAnswerDisplay ?? d.correctAnswer,
								userAnswer: gd.userAnswerDisplay ?? d.userAnswer
							};
						});
					}
					if (serverRes.xpEarned || (serverRes.newBadges && serverRes.newBadges.length > 0)) {
						reward = {
							xpEarned: serverRes.xpEarned || 0,
							newBadges: serverRes.newBadges || [],
							streakDays: serverRes.streakDays || 0
						};
					}
				}
			} catch {
				// keep client feedback if offline
			}
		}

		results = { score, total, details };
		submitted = true;
		isSubmitting = false;
	}

	function restart() {
		currentIndex = 0;
		answers = {};
		submitted = false;
		isSubmitting = false;
		submitError = null;
		results = null;
		reward = null;
		autoSubmitted = false;
		showReview = false;
		practiceChecked = {};
		practiceResults = {};
		shuffleSeed += 1;
		startTime = Date.now();
		elapsed = 0;
		timerInterval = setInterval(() => {
			elapsed = Math.floor((Date.now() - startTime) / 1000);
			if (hasTimeLimit && remaining <= 0 && mode === 'exam' && !submitted) {
				autoSubmitted = true;
				submit();
			}
		}, 1000);
	}

	function openShare() {
		if (onShare) onShare(); else isShareModalOpen = true;
	}
</script>

<svelte:head>
	<title>{quiz.titleAr || quiz.title} - SujetStore</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
	{#if mode === 'choose'}
		<!-- Mode Selection Screen -->
		<div class="py-10 text-center">
			<div
				class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10 dark:bg-purple-500/20"
			>
				<Brain size={40} class="text-purple-600 dark:text-purple-400" />
			</div>
			<h1 class="mb-2 text-2xl font-extrabold sm:text-3xl">{quiz.titleAr || quiz.title}</h1>
			{#if quiz.description}
				<p class="text-muted-foreground mx-auto mb-6 max-w-md">{quiz.description}</p>
			{/if}

			<div class="text-muted-foreground mb-8 flex flex-wrap justify-center gap-4 text-sm">
				<span class="flex items-center gap-1"><Brain size={16} /> {questions.length} سؤال</span>
				{#if hasTimeLimit}
					<span class="flex items-center gap-1"
						><Clock size={16} /> {Math.floor(quiz.timeLimit / 60)} دقيقة</span
					>
				{/if}
				<span class="flex items-center gap-1"
					><Trophy size={16} /> {quiz.passingScore || 60}% للنجاح</span
				>
			</div>

			<div class="mx-auto flex max-w-sm flex-col gap-3">
				<!-- Exam Mode -->
				<button
					onclick={() => startQuiz('exam')}
					disabled={examDisabled}
					class="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-600/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
				>
					<Trophy size={22} class="transition-transform group-hover:scale-110" />
					{examDisabled ? 'تم استنفاد المحاولات المسجلة' : 'وضع الامتحان'}
				</button>
				<p class="text-muted-foreground -mt-1 text-xs">
					يتم حفظ النتيجة • مؤقت {hasTimeLimit ? 'محدود' : 'غير محدود'}
				</p>

				{#if canPractice}
					<!-- Practice Mode -->
					<button
						onclick={() => startQuiz('practice')}
						class="group flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-4 text-lg font-bold text-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-500/20 dark:text-emerald-400"
					>
						<BookOpen size={22} class="transition-transform group-hover:scale-110" />
						وضع التدريب
					</button>
					<p class="text-muted-foreground -mt-1 text-xs">تحقق فوري لكل سؤال • بدون حفظ النتيجة</p>
				{/if}
			</div>

			<!-- Share -->
			<button
				onclick={openShare}
				class="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-8 py-3.5 text-sm font-bold text-emerald-600 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 dark:text-emerald-400"
			>
				<div
					class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity group-hover:opacity-10"
				></div>
				<Share2 size={18} class="transition-transform group-hover:rotate-12" />
				مشاركة الرابط مع زملائك
			</button>
		</div>
	{:else if !submitted}
		<!-- Quiz Header -->
		<div class="mb-4">
			<div class="flex items-center justify-between">
				<h1 class="text-lg font-bold sm:text-xl">{quiz.titleAr || quiz.title}</h1>
				{#if mode === 'practice'}
					<span
						class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
					>
						<BookOpen size={12} class="-mt-0.5 mr-1 inline" /> وضع التدريب
					</span>
				{/if}
			</div>
			<div class="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
				<span class="flex items-center gap-1"><Brain size={16} /> {questions.length} سؤال</span>
				{#if hasTimeLimit && mode === 'exam'}
					<span
						class="flex items-center gap-1 {timerColor} {timerUrgent
							? 'animate-pulse font-bold'
							: ''}"
					>
						<Clock size={16} />
						{formatTime(remaining)}
					</span>
				{:else}
					<span class="flex items-center gap-1"><Clock size={16} /> {formatTime(elapsed)}</span>
				{/if}
			</div>
		</div>

		<!-- Timer Bar (when time limited) -->
		{#if hasTimeLimit && mode === 'exam'}
			<div class="mb-4">
				<div class="bg-muted h-1.5 overflow-hidden rounded-full">
					<div
						class="{timerBarColor} h-full rounded-full transition-all duration-1000"
						style="width: {timerPercentage}%"
					></div>
				</div>
			</div>
		{/if}

		<!-- Progress Bar -->
		<div class="mb-4">
			<div class="bg-muted h-2 overflow-hidden rounded-full">
				<div
					class="h-full rounded-full bg-purple-500 transition-all duration-500"
					style="width: {progress}%"
				></div>
			</div>
			<p class="text-muted-foreground mt-1 text-center text-xs">
				السؤال {currentIndex + 1} من {questions.length}
			</p>
		</div>

		<!-- Question Dots -->
		<div class="mb-6 flex flex-wrap justify-center gap-1.5">
			{#each questions as q, i}
				<button
					onclick={() => goTo(i)}
					class="h-7 w-7 rounded-full text-[11px] font-bold transition-all
						{currentIndex === i
						? 'scale-110 bg-purple-500 text-white shadow-md'
						: practiceChecked[q.id]
							? practiceResults[q.id]
								? 'bg-emerald-500/30 text-emerald-300'
								: 'bg-red-500/30 text-red-300'
							: answers[q.id]
								? 'bg-purple-500/20 text-purple-600 dark:text-purple-300'
								: 'text-muted-foreground bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20'}"
				>
					{i + 1}
				</button>
			{/each}
		</div>

		<!-- Question Card -->
		{#if currentQuestion}
			{#key currentQuestion.id}
				<div class="bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
					<div class="mb-4 flex items-center justify-between">
						<span
							class="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400"
						>
							{typeLabels[currentQuestion.type] || currentQuestion.type}
						</span>
						<span class="text-muted-foreground text-xs">{currentQuestion.points} نقطة</span>
					</div>

					<h2 class="mb-6 text-lg font-bold sm:text-xl">
						
					{#if currentQuestion.imageUrl}
						{@const qFig = parseQuizImageMeta(currentQuestion.imageUrl)}
						{#if qFig}
							<div class="mb-4 flex flex-col items-center">
								<div class="border-border inline-flex max-w-full flex-col items-center rounded-xl border bg-white p-3 text-slate-900 shadow-2xs">
									{#if qFig.title}
										<div class="mb-2 text-center text-xs font-extrabold text-slate-900 sm:text-sm">
											{qFig.title}
										</div>
									{/if}
									<div class="relative inline-block max-w-full">
										<img
											src={qFig.src}
											alt={qFig.title || 'صورة السؤال'}
											loading="eager"
											decoding="async"
											class="block max-h-64 max-w-full rounded-lg object-contain"
										/>
										{#each qFig.pins as pin}
											<span
												dir="ltr"
												style="left: {pin.xPct}%; top: {pin.yPct}%; background-color: {pin.color};"
												class="pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[11px] font-extrabold text-white shadow-md"
											>
												{pin.num}
											</span>
										{/each}
									</div>
									{#if qFig.legend.length > 0}
										<div class="mt-2.5 grid w-full grid-cols-1 gap-1.5 border-t border-slate-200 pt-2 text-right text-xs font-normal sm:grid-cols-2">
											{#each qFig.legend as item}
												<div class="flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1 text-slate-800">
													{#if item.num}
														<span dir="ltr" class="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[10px] font-extrabold text-white">
															{item.num}
														</span>
													{/if}
													<span class="font-medium">{item.label}</span>
												</div>
											{/each}
										</div>
									{/if}
								</div>
								{#if currentQuestion.imageCaption}
									<p class="text-muted-foreground mt-2 text-sm font-normal">{currentQuestion.imageCaption}</p>
								{/if}
							</div>
						{/if}
					{/if}
					<MathRenderer content={currentQuestion.questionTextAr || currentQuestion.questionText} inline />
					</h2>

					<!-- Dynamic Question Component -->
					{#if currentQuestion.type === 'mcq'}
						<MCQ data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'true_false'}
						<TrueFalse data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'ordering'}
						<Ordering data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'drag_drop'}
						<DragDrop data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'matching'}
						<Matching data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'fill_blank'}
						<FillBlank data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'short_answer'}
						<ShortAnswer data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'cloze'}
						<Cloze data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'calculated'}
						<Calculated data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'sentence_reorder'}
						<SentenceReorder data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'hotspot'}
						<Hotspot data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'drag_to_image'}
						<DragToImage data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'matrix'}
						<Matrix data={currentQuestion.questionData} {onAnswer} />
					{:else if currentQuestion.type === 'essay'}
						<Essay data={currentQuestion.questionData} {onAnswer} />
					{/if}

					<!-- Practice Mode: Instant Check Button -->
					{#if mode === 'practice' && answers[currentQuestion.id] && !practiceChecked[currentQuestion.id]}
						<button
							onclick={checkPractice}
							class="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
						>
							<Zap size={18} class="-mt-0.5 mr-1 inline" /> تحقق من الإجابة
						</button>
					{/if}

					<!-- Practice Mode: Result Feedback -->
					{#if mode === 'practice' && practiceChecked[currentQuestion.id]}
						<div
							class="mt-6 rounded-xl border p-4 {practiceResults[currentQuestion.id]
								? 'border-emerald-500/30 bg-emerald-500/10'
								: 'border-red-500/30 bg-red-500/10'}"
						>
							<div
								class="flex items-center gap-2 font-bold {practiceResults[currentQuestion.id]
									? 'text-emerald-600 dark:text-emerald-400'
									: 'text-red-600 dark:text-red-400'}"
							>
								{#if practiceResults[currentQuestion.id]}
									<CheckCircle size={20} /> إجابة صحيحة! 🎉
								{:else}
									<XCircle size={20} /> إجابة خاطئة
								{/if}
							</div>
							{#if !practiceResults[currentQuestion.id]}
								<p class="mt-2 text-sm">
									<span class="font-semibold text-emerald-600 dark:text-emerald-400"
										>الإجابة الصحيحة:</span
									>
									<MathRenderer content={getCorrectAnswer(currentQuestion)} inline />
								</p>
							{/if}
							{#if currentQuestion.explanation}
								<p
									class="mt-2 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300"
								>
									💡 <span class="font-semibold">شرح:</span>
									<MathRenderer content={currentQuestion.explanation} inline />
								</p>
							{/if}
						</div>
					{/if}
				</div>
			{/key}

			<!-- Navigation -->
			<div class="mt-6 flex items-center justify-between">
				<button
					onclick={prev}
					disabled={currentIndex === 0}
					class="flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5 disabled:opacity-30 dark:hover:bg-white/10"
				>
					<ChevronRight size={18} /> السابق
				</button>

				{#if currentIndex === questions.length - 1 && mode === 'exam'}
					<button
						onclick={submit}
						disabled={!allAnswered}
						class="rounded-xl bg-purple-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-700 disabled:opacity-50"
					>
						<Trophy size={18} class="-mt-0.5 mr-1 inline" /> إرسال الإجابات
					</button>
				{:else if currentIndex === questions.length - 1 && mode === 'practice'}
					<button
						onclick={submit}
						class="rounded-xl bg-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700"
					>
						<Trophy size={18} class="-mt-0.5 mr-1 inline" /> عرض النتيجة النهائية
					</button>
				{:else}
					<button
						onclick={next}
						class="flex items-center gap-1 rounded-lg bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-500/20 dark:bg-purple-600/20 dark:text-purple-300 dark:hover:bg-purple-600/30"
					>
						التالي <ChevronLeft size={18} />
					</button>
				{/if}
			</div>
		{/if}
	{:else if results}
		<!-- Results Page -->
		<div class="text-center">
			{#if autoSubmitted}
				<div
					class="mb-6 flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 px-4 py-3 text-amber-400"
				>
					<AlertTriangle size={20} /> انتهى الوقت! تم إرسال إجاباتك تلقائياً.
				</div>
			{/if}

			<!-- Score Circle -->
			<div class="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center">
				<svg class="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
					<circle
						cx="60"
						cy="60"
						r="54"
						fill="none"
						stroke="currentColor"
						stroke-width="8"
						class="text-black/5 dark:text-white/10"
					/>
					<circle
						cx="60"
						cy="60"
						r="54"
						fill="none"
						stroke-width="8"
						stroke-dasharray={2 * Math.PI * 54}
						stroke-dashoffset={2 * Math.PI * 54 * (1 - percentage / 100)}
						stroke-linecap="round"
						class="{passed ? 'text-emerald-500' : 'text-red-500'} transition-all duration-1000"
					/>
				</svg>
				<div>
					<p
						class="text-4xl font-extrabold {passed
							? 'text-emerald-600 dark:text-emerald-400'
							: 'text-red-600 dark:text-red-400'}"
					>
						{percentage}%
					</p>
					<p class="text-muted-foreground text-sm">{results.score}/{results.total}</p>
				</div>
			</div>

			<h2 class="mb-2 text-2xl font-bold">
				{#if percentage === 100}
					🏆 ممتاز! علامة كاملة
				{:else if percentage >= 80}
					🌟 أحسنت! أداء رائع
				{:else if percentage >= 60}
					🎉 جيد! لقد اجتزت التمرين
				{:else if percentage >= 40}
					📚 لا بأس، راجع الدروس وحاول مجدداً
				{:else}
					💪 لا تستسلم! المحاولة هي الطريق للنجاح
				{/if}
			</h2>
			<p class="text-muted-foreground mb-2">الوقت: {formatTime(elapsed)}</p>
			{#if mode === 'practice'}
				<p class="mb-4 text-sm text-emerald-600 dark:text-emerald-400">
					وضع التدريب — لم يتم حفظ النتيجة
				</p>
			{/if}
			<p class="text-muted-foreground mb-6">
				{passed ? 'لقد اجتزت التمرين بنجاح!' : `تحتاج ${quiz.passingScore || 60}% للنجاح`}
			</p>

			{#if submitError}
				<div class="mx-auto mb-6 max-w-md rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
					{submitError}
				</div>
			{/if}

			{#if reward}
				<div class="mx-auto mb-6 max-w-md rounded-2xl border border-amber-500/30 bg-gradient-to-l from-amber-500/10 to-emerald-500/10 p-4 text-center">
					<div class="flex flex-wrap items-center justify-center gap-4 text-sm font-bold">
						<span class="flex items-center gap-1.5 text-amber-500">
							<Zap size={16} /> +{reward.xpEarned} نقطة XP
						</span>
						{#if reward.streakDays > 0}
							<span class="text-orange-500">🔥 سلسلة {reward.streakDays} أيام</span>
						{/if}
					</div>
					{#if reward.newBadges.length > 0}
						<div class="mt-3 border-t border-amber-500/20 pt-2.5">
							<p class="mb-2 text-xs font-bold text-emerald-500">🎉 شارات جديدة مكتسبة!</p>
							<div class="flex flex-wrap justify-center gap-2">
								{#each reward.newBadges as badge}
									<span class="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-500">
										{badge.name_ar} (+{badge.points})
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}

			{#if allowShowAnswers}
				<!-- Toggle Review -->
				<button
					onclick={() => (showReview = !showReview)}
					class="mb-6 inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-6 py-2.5 text-sm font-bold transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
				>
					{#if showReview}
						<EyeOff size={16} /> إخفاء مراجعة الإجابات
					{:else}
						<Eye size={16} /> مراجعة الإجابات المفصّلة
					{/if}
				</button>
			{/if}

			<!-- Detailed Answer Review -->
			{#if allowShowAnswers && showReview}
				<div class="mb-8 space-y-4 text-right">
					{#each results.details as detail, i}
						<div
							class="bg-card overflow-hidden rounded-xl border {detail.correct
								? 'border-emerald-500/20'
								: 'border-red-500/20'}"
						>
							<div class="flex items-start gap-3 p-4">
								<div class="mt-0.5 shrink-0">
									{#if detail.correct}
										<CheckCircle size={20} class="text-emerald-500" />
									{:else}
										<XCircle size={20} class="text-red-500" />
									{/if}
								</div>
								<div class="min-w-0 flex-1">
									<p class="font-semibold">
										{i + 1}. <MathRenderer content={detail.question.questionTextAr || detail.question.questionText} inline />
									</p>
									<span class="text-muted-foreground text-xs">
										{typeLabels[detail.question.type]} • {detail.points}/{detail.question.points} نقطة
									</span>

									<!-- User Answer vs Correct Answer -->
									<div class="mt-3 space-y-2">
										<div
											class="flex items-start gap-2 rounded-lg {detail.correct
												? 'bg-emerald-500/5'
												: 'bg-red-500/5'} p-2"
										>
											<span
												class="shrink-0 text-xs font-bold {detail.correct
													? 'text-emerald-400'
													: 'text-red-400'}">إجابتك:</span
											>
											<span class="text-sm {detail.correct ? 'text-emerald-300' : 'text-red-300'}"
												><MathRenderer content={String(detail.userAnswer ?? '')} inline /></span
											>
										</div>
										{#if !detail.correct}
											<div class="flex items-start gap-2 rounded-lg bg-emerald-500/5 p-2">
												<span class="shrink-0 text-xs font-bold text-emerald-400">الصحيحة:</span>
												<span class="text-sm text-emerald-300"
													><MathRenderer content={String(detail.correctAnswer ?? '')} inline /></span
												>
											</div>
										{/if}
									</div>

									<!-- Explanation (always shown) -->
									{#if detail.question.explanation}
										<p class="mt-2 rounded-lg bg-amber-500/10 p-2 text-sm text-amber-300">
											💡 <MathRenderer content={detail.question.explanation} inline />
										</p>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Actions -->
			<div class="flex flex-wrap justify-center gap-3">
				<button
					onclick={restart}
					class="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-purple-700"
				>
					<RotateCcw size={18} /> إعادة المحاولة
				</button>
				<button
					onclick={openShare}
					class="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95"
				>
					<div
						class="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10"
					></div>
					<Share2 size={20} class="transition-transform group-hover:rotate-12" />
					شارك النتيجة مع أصدقائك
				</button>
				<a
					href="/quizzes"
					class="flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-6 py-3 font-bold transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
				>
					تمارين أخرى
				</a>
			</div>
		</div>
	{/if}

	<ShareModal
		bind:isOpen={isShareModalOpen}
		url={page.url.href}
		title={quiz.titleAr || quiz.title}
	/>
</div>
