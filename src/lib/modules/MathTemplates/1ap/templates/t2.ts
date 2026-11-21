import type { ContentBlock, ExerciseBlock, TableCell } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import {
	saveSvgAsset,
	svgAnalogClock,
	svgBaseTenBlocks,
	svgCountingObjects,
	svgNumberLine,
	svgShapesStrip
} from '../../svg-helpers';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';

const ONES_WORDS_1AP = [
	'صِفْرٌ',
	'وَاحِدٌ',
	'اثْنَانِ',
	'ثَلَاثَةٌ',
	'أَرْبَعَةٌ',
	'خَمْسَةٌ',
	'سِتَّةٌ',
	'سَبْعَةٌ',
	'ثَمَانِيَةٌ',
	'تِسْعَةٌ'
] as const;

const TEENS_WORDS_1AP = [
	'عَشَرَةٌ',
	'أَحَدَ عَشَرَ',
	'اثْنَا عَشَرَ',
	'ثَلَاثَةَ عَشَرَ',
	'أَرْبَعَةَ عَشَرَ',
	'خَمْسَةَ عَشَرَ',
	'سِتَّةَ عَشَرَ',
	'سَبْعَةَ عَشَرَ',
	'ثَمَانِيَةَ عَشَرَ',
	'تِسْعَةَ عَشَرَ'
] as const;

const TENS_WORDS_1AP = ['', 'عَشَرَةٌ', 'عِشْرُونَ', 'ثَلَاثُونَ'] as const;

const HOUR_WORDS_1AP = [
	'',
	'الوَاحِدَةُ',
	'الثَّانِيَةُ',
	'الثَّالِثَةُ',
	'الرَّابِعَةُ',
	'الخَامِسَةُ',
	'السَّادِسَةُ',
	'السَّابِعَةُ',
	'الثَّامِنَةُ',
	'التَّاسِعَةُ',
	'العَاشِرَةُ',
	'الحَادِيَةَ عَشْرَةَ',
	'الثَّانِيَةَ عَشْرَةَ'
] as const;

interface ChildActor {
	name: string;
	fem: boolean;
}

const CHILDREN_1AP: readonly ChildActor[] = [
	{ name: 'أَمِين', fem: false },
	{ name: 'سَارَة', fem: true },
	{ name: 'يَاسِين', fem: false },
	{ name: 'مَرْيَم', fem: true },
	{ name: 'كَرِيم', fem: false },
	{ name: 'لِينَا', fem: true },
	{ name: 'آدَم', fem: false },
	{ name: 'إِيمَان', fem: true }
];

type ObjectKind = 'apple' | 'star' | 'ball' | 'pencil';

interface ObjectMeta {
	kind: ObjectKind;
	singularAcc: string;
	pluralGen: string;
	captionAr: string;
}

const COUNTING_OBJECTS_META: readonly ObjectMeta[] = [
	{ kind: 'apple', singularAcc: 'تُفَّاحَةً', pluralGen: 'تُفَّاحَاتٍ', captionAr: 'تُفَّاحَاتٌ' },
	{ kind: 'star', singularAcc: 'نَجْمَةً', pluralGen: 'نَجَمَاتٍ', captionAr: 'نَجَمَاتٌ' },
	{ kind: 'ball', singularAcc: 'كُرَةً', pluralGen: 'كُرَاتٍ', captionAr: 'كُرَاتٌ' },
	{ kind: 'pencil', singularAcc: 'قَلَمًا', pluralGen: 'أَقْلَامٍ', captionAr: 'أَقْلَامٌ' }
];

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	const mixed = ((cleanSeed * 1009 + diffCode * 97 + salt * 31) >>> 0) || 1;
	return new SeededRng(mixed);
}

function pad2(n: number): string {
	return String(n).padStart(2, '0');
}

function numberToArabicWordsUnder40(n: number): string {
	const val = Math.max(0, Math.min(39, Math.trunc(n)));
	if (val < 10) return ONES_WORDS_1AP[val];
	if (val < 20) return TEENS_WORDS_1AP[val - 10];
	const t = Math.floor(val / 10);
	const u = val % 10;
	if (u === 0) return TENS_WORDS_1AP[t];
	return `${ONES_WORDS_1AP[u]} وَ${TENS_WORDS_1AP[t]}`;
}

function pickNoCarryAddPair(
	rng: SeededRng,
	minA: number,
	maxA: number,
	minB: number,
	maxB: number,
	maxSum = 39
): [number, number] {
	const pairs: [number, number][] = [];
	for (let a = minA; a <= maxA; a++) {
		const ua = a % 10;
		for (let b = minB; b <= maxB; b++) {
			const ub = b % 10;
			if (ua + ub <= 9 && a + b <= maxSum) {
				pairs.push([a, b]);
			}
		}
	}
	if (pairs.length === 0) return [12, 5];
	return rng.pick(pairs);
}

function pickNoBorrowSubPair(
	rng: SeededRng,
	minTotal: number,
	maxTotal: number,
	minSub: number,
	maxSub: number
): [number, number] {
	const pairs: [number, number][] = [];
	for (let total = minTotal; total <= maxTotal; total++) {
		const ut = total % 10;
		const tt = Math.floor(total / 10);
		for (let sub = minSub; sub <= Math.min(maxSub, total - 1); sub++) {
			const us = sub % 10;
			const ts = Math.floor(sub / 10);
			if (us <= ut && ts <= tt && total - sub >= 1) {
				pairs.push([total, sub]);
			}
		}
	}
	if (pairs.length === 0) return [27, 4];
	return rng.pick(pairs);
}

function objectCountLabel(count: number, meta: ObjectMeta): string {
	return count >= 11 ? meta.singularAcc : meta.pluralGen;
}

// ---------------------------------------------------------------------------
// 1. Numbers 10..19: Reading, Writing & Decomposing (10 + units)
// ---------------------------------------------------------------------------
const templateNumbers10To19: ParameterizedTemplate = {
	id: '1ap_t2_numbers_10_to_19_decomp',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t2_numbers_10_to_19_decomp',
	titleAr: 'الأَعْدَادُ مِنْ 10 إِلَى 19: القِرَاءَةُ وَالكِتَابَةُ وَالتَّفْكِيكُ',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 1);

		const variant = rng.int(0, 2);
		let n = 14;
		if (difficulty === 'easy') {
			n = rng.int(11, 15);
		} else if (difficulty === 'medium') {
			n = rng.int(12, 19);
		} else {
			n = variant === 0 ? rng.int(10, 19) : rng.int(13, 19);
		}

		const ones = n - 10;
		const wordsAr = numberToArabicWordsUnder40(n);
		const svg = svgBaseTenBlocks(0, 1, ones);
		const svgPath = saveSvgAsset(`1ap_t2_b10_${difficulty}_s${cleanSeed}`, svg);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = String(n);

		if (variant === 0) {
			const questionText =
				'تَأَمَّلِ العَمُودَ الأَخْضَرَ (عَشَرَةً وَاحِدَةً) وَالمُرَبَّعَاتِ الصَّفْرَاءَ (الوَحَدَاتِ)، ثُمَّ اكْتُبِ العَدَدَ بِالأَرْقَامِ:';
			quizQuestion = {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'عَمُودُ العَشَرَةِ وَمُرَبَّعَاتُ الوَحَدَاتِ',
				questionData: {
					sentence: 'العَدَدُ المُمَثَّلُ فِي الرَّسْمِ هُوَ ___',
					acceptedAnswers: [String(n)]
				},
				explanation: `يُوجَدُ عَمُودٌ وَاحِدٌ مِنَ العَشَرَاتِ ($10$) وَ $${ones}$ مِنَ الوَحَدَاتِ، إِذَنْ العَدَدُ هُوَ $${n}$ (${wordsAr}).`
			};
			finalAnswer = String(n);
		} else if (variant === 1) {
			const altOnes = ones === 9 ? 8 : ones + 1;
			const built = buildUniqueMcqOptions(
				`$10 + ${ones}$`,
				[
					{
						text: `$1 + ${ones}$`,
						diagnosticFeedback:
							'انْتَبِهْ! الرَّقْمُ $1$ عَلَى اليَسَارِ يُمَثِّلُ عَشَرَةً وَاحِدَةً ($10$) وَلَيْسَ وَحْدَةً وَاحِدَةً.'
					},
					{
						text: `$10 + ${altOnes}$`,
						diagnosticFeedback:
							'عُدَّ المُرَبَّعَاتِ الصَّفْرَاءَ جَيِّدًا لِتَعْرِفَ عَدَدَ الوَحَدَاتِ الصَّحِيحَ.'
					},
					{
						text: `$20 + ${ones}$`,
						diagnosticFeedback:
							'يُوجَدُ عَمُودٌ أَخْضَرُ وَاحِدٌ فَقَطْ ($10$) وَلَيْسَ عَمُودَانِ ($20$).'
					}
				],
				rng
			);
			const questionText = `تَأَمَّلِ الرَّسْمَ: مَا هُوَ التَّفْكِيكُ الصَّحِيحُ لِلْعَدَدِ $${n}$ إِلَى عَشَرَةٍ وَوَحَدَاتٍ؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `تَمْثِيلُ العَدَدِ ${n}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `العَدَدُ $${n}$ يَتَكَوَّنُ مِنْ عَشَرَةٍ وَاحِدَةٍ ($10$) وَ $${ones}$ وَحَدَاتٍ، إِذَنْ $${n} = 10 + ${ones}$.`
			};
			finalAnswer = `10 + ${ones}`;
		} else {
			const wrongSum = 1 + ones;
			const wrongAdjacent = n === 19 ? 18 : n + 1;
			const wrongTwenties = ones <= 9 ? 20 + ones : 25;
			const built = buildUniqueMcqOptions(
				`$${n}$`,
				[
					{
						text: `$${wrongSum}$`,
						diagnosticFeedback:
							'لَا تَجْمَعْ $1 + ' + ones + '$! العَمُودُ الأَخْضَرُ يُمَثِّلُ $10$ وَلَيْسَ $1$.'
					},
					{
						text: `$${wrongAdjacent}$`,
						diagnosticFeedback: 'عُدَّ المُرَبَّعَاتِ الصَّفْرَاءَ وَاحِدًا فَوَاحِدًا بَعْدَ العَدَدِ $10$.'
					},
					{
						text: `$${wrongTwenties}$`,
						diagnosticFeedback:
							'عِنْدَنَا عَشَرَةٌ وَاحِدَةٌ فَقَطْ ($10$)، فَالْعَدَدُ أَصْغَرُ مِنْ $20$.'
					}
				],
				rng
			);
			const questionText = `مَا هُوَ العَدَدُ الَّذِي يُكْتَبُ بِالحُرُوفِ: «${wordsAr}»؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'عَشَرَةٌ وَاحِدَةٌ وَوَحَدَاتٌ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `العَدَدُ «${wordsAr}» يُمَثَّلُ بِعَشَرَةٍ وَاحِدَةٍ وَ $${ones}$ وَحَدَاتٍ، وَيُكْتَبُ بِالأَرْقَامِ $${n}$.`
			};
			finalAnswer = String(n);
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content:
							'1) عُدَّ العَشَرَةَ وَالوَحَدَاتِ فِي الرَّسْمِ، ثُمَّ اكْتُبِ العَدَدَ:\n\nأ) بِالأَرْقَامِ: ........\n\nب) بِالحُرُوفِ: ....................................',
						answer: `أ) بِالأَرْقَامِ: $${n}$\n\nب) بِالحُرُوفِ: ${wordsAr}.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'عَشَرَةٌ وَوَحَدَاتٌ'
					}
				]
			},
			{
				type: 'text',
				content: `2) أَكْمِلْ تَفْكِيكَ العَدَدِ إِلَى عَشَرَةٍ وَوَحَدَاتٍ:  $${n} = 10 + dots$`,
				answer: `$${n} = 10 + ${ones}$`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) احْصُرِ العَدَدَ $${n}$ بَيْنَ عَدَدَيْنِ مُتَتَالِيَيْنِ:  $dots < ${n} < dots$`,
				answer: `$${n - 1} < ${n} < ${n + 1}$`,
				mark: '0.5'
			}
		];

		return {
			templateId: '1ap_t2_numbers_10_to_19_decomp',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: 'الأَعْدَادُ مِنْ 10 إِلَى 19: القِرَاءَةُ وَالكِتَابَةُ وَالتَّفْكِيكُ',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'تَأَمَّلِ الرَّسْمَ جَيِّدًا، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'العَمُودُ الأَخْضَرُ الوَاحِدُ يَعْنِي عَشَرَةً وَاحِدَةً ($10$).',
				'عُدَّ المُرَبَّعَاتِ الصَّفْرَاءَ لِتَعْرِفَ رَقْمَ الوَحَدَاتِ.',
				`نَكْتُبُ التَّفْكِيكَ عَلَى الشَّكْلِ: $${n} = 10 + ${ones}$.`
			],
			solutionStepsAr: [
				`نَعُدُّ عَمُودَ العَشَرَاتِ: نَجِدُ عَشَرَةً وَاحِدَةً ($10$).`,
				`نَعُدُّ مُرَبَّعَاتِ الوَحَدَاتِ: نَجِدُ $${ones}$، إِذَنْ العَدَدُ هُوَ $${n}$ (${wordsAr}).`,
				`التَّفْكِيكُ هُوَ $${n} = 10 + ${ones}$، وَالحَصْرُ هُوَ $${n - 1} < ${n} < ${n + 1}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Numbers 20..39: Counting, Comparing & Ordering (svgNumberLine)
// ---------------------------------------------------------------------------
const templateNumbers20To39: ParameterizedTemplate = {
	id: '1ap_t2_numbers_20_to_39_compare',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t2_numbers_20_to_39',
	titleAr: 'الأَعْدَادُ مِنْ 20 إِلَى 39: العَدُّ وَالمُقَارَنَةُ وَالتَّرْتِيبُ',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 2);

		// Keep (winMax - winMin) an exact multiple of step = 2 so tick labels never misalign.
		const useUpperWindow = difficulty === 'hard' || (difficulty === 'medium' && rng.int(0, 1) === 1);
		const winMin = difficulty === 'easy' ? 20 : useUpperWindow ? 21 : 20;
		const winMax = difficulty === 'easy' ? 32 : useUpperWindow ? 39 : 38;

		// Odd/even unlabeled ticks inside [winMin + 1, winMax - 1]
		const unmarkedTicks: number[] = [];
		for (let x = winMin + 1; x <= winMax - 1; x += 2) {
			unmarkedTicks.push(x);
		}
		const missingTarget = rng.pick(unmarkedTicks);

		// Pick 3 well-spaced distinct numbers in [winMin, winMax] (min spacing >= 3)
		const allInRange: number[] = [];
		for (let x = winMin; x <= winMax; x++) allInRange.push(x);
		let cmpTriple: number[] = [];
		for (let attempt = 0; attempt < 50; attempt++) {
			const picked = rng.pickDistinct(allInRange, 3).sort((a, b) => a - b);
			if (picked[1] - picked[0] >= 3 && picked[2] - picked[1] >= 3) {
				cmpTriple = picked;
				break;
			}
		}
		if (cmpTriple.length < 3) {
			cmpTriple = [winMin + 1, winMin + 5, winMin + 9];
		}

		// For medium/hard, allow classic reversed-digits pair (23, 32) on comparison when in range
		let pairA = cmpTriple[0];
		let pairB = cmpTriple[2];
		if (difficulty !== 'easy' && winMin <= 23 && winMax >= 32 && rng.int(0, 1) === 1) {
			pairA = 23;
			pairB = 32;
		}
		if (rng.int(0, 1) === 1) {
			[pairA, pairB] = [pairB, pairA];
		}

		const variant = rng.int(0, 2);

		let marks: { value: number; label: string; color?: string }[];
		if (variant === 0) {
			marks = [{ value: missingTarget, label: '?', color: '#dc2626' }];
		} else if (variant === 1) {
			marks = [
				{ value: pairA, label: String(pairA), color: '#dc2626' },
				{ value: pairB, label: String(pairB), color: '#2563eb' }
			];
		} else {
			marks = [
				{ value: cmpTriple[0], label: String(cmpTriple[0]), color: '#dc2626' },
				{ value: cmpTriple[1], label: String(cmpTriple[1]), color: '#2563eb' },
				{ value: cmpTriple[2], label: String(cmpTriple[2]), color: '#16a34a' }
			];
		}

		const svg = svgNumberLine({
			min: winMin,
			max: winMax,
			step: 2,
			subTicks: 2,
			marks
		});
		const svgPath = saveSvgAsset(`1ap_t2_nl_${difficulty}_s${cleanSeed}`, svg);

		const shuffledTriple = rng.shuffle(cmpTriple);
		const isAsc = rng.int(0, 1) === 0;
		const orderedTriple = isAsc ? [...cmpTriple] : [...cmpTriple].reverse();

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const questionText =
				'انْظُرْ إِلَى الشَّرِيطِ العَدَدِيِّ: مَا هُوَ العَدَدُ المَوْجُودُ عِنْدَ العَلَامَةِ (?)؟';
			quizQuestion = {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'الشَّرِيطُ العَدَدِيُّ',
				questionData: {
					sentence: 'العَدَدُ المَوْجُودُ عِنْدَ العَلَامَةِ (?) هُوَ ___',
					acceptedAnswers: [String(missingTarget)]
				},
				explanation: `يَقَعُ العَدَدُ $${missingTarget}$ مُبَاشَرَةً بَيْنَ $${missingTarget - 1}$ وَ $${missingTarget + 1}$ عَلَى الشَّرِيطِ العَدَدِيِّ.`
			};
			finalAnswer = String(missingTarget);
		} else if (variant === 1) {
			const smaller = Math.min(pairA, pairB);
			const larger = Math.max(pairA, pairB);
			const correctCmp = `$${smaller} < ${larger}$`;
			const built = buildUniqueMcqOptions(
				correctCmp,
				[
					{
						text: `$${larger} < ${smaller}$`,
						diagnosticFeedback: `انْتَبِهْ لِاتِّجَاهِ الرَّمْزِ! العَدَدُ $${smaller}$ هُوَ الأَصْغَرُ وَيَأْتِي قَبْلَ $${larger}$ عَلَى الشَّرِيطِ العَدَدِيِّ.`
					},
					{
						text: `$${smaller} > ${larger}$`,
						diagnosticFeedback: `العَدَدُ $${smaller}$ أَصْغَرُ مِنْ $${larger}$، فَنَسْتَعْمِلُ الرَّمْزَ ($<$) وَلَيْسَ ($>$).`
					},
					{
						text: `$${smaller} = ${larger}$`,
						diagnosticFeedback: `العَدَدَانِ $${smaller}$ وَ $${larger}$ مُخْتَلِفَانِ وَلَيْسَا مُتَسَاوِيَيْنِ.`
					}
				],
				rng
			);
			const questionText = `تَأَمَّلِ العَدَدَيْنِ $${pairA}$ وَ $${pairB}$ عَلَى الشَّرِيطِ العَدَدِيِّ: مَا هِيَ المُقَارَنَةُ الصَّحِيحَةُ؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'مُقَارَنَةُ عَدَدَيْنِ عَلَى الشَّرِيطِ العَدَدِيِّ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `عَلَى الشَّرِيطِ العَدَدِيِّ يَقَعُ $${smaller}$ قَبْلَ $${larger}$، إِذَنْ $${smaller} < ${larger}$.`
			};
			finalAnswer = `${smaller} < ${larger}`;
		} else {
			// Ordering question using string items (matches Ordering.svelte & quiz-grading.ts)
			let displayItems = shuffledTriple.map((x) => `$${x}$`);
			if (displayItems.every((txt, idx) => txt === `$${orderedTriple[idx]}$`)) {
				displayItems = [displayItems[1], displayItems[2], displayItems[0]];
			}
			const correctOrder = orderedTriple.map((val) => displayItems.indexOf(`$${val}$`));
			const dirLabel = isAsc ? 'تَصَاعُدِيًّا (مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ)' : 'تَنَازُلِيًّا (مِنَ الأَكْبَرِ إِلَى الأَصْغَرِ)';
			const questionText = `تَأَمَّلِ الأَعْدَادَ المُعَلَّمَةَ عَلَى الشَّرِيطِ العَدَدِيِّ، ثُمَّ رَتِّبْهَا ${dirLabel}:`;
			quizQuestion = {
				type: 'ordering',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'تَرْتِيبُ الأَعْدَادِ عَلَى الشَّرِيطِ العَدَدِيِّ',
				questionData: {
					items: displayItems,
					correctOrder
				},
				explanation: `التَّرْتِيبُ ${isAsc ? 'التَّصَاعُدِيُّ' : 'التَّنَازُلِيُّ'} الصَّحِيحُ هُوَ: $${orderedTriple.join(isAsc ? ' < ' : ' > ')}$.`
			};
			finalAnswer = orderedTriple.join(isAsc ? ' < ' : ' > ');
		}

		const p1Smaller = Math.min(pairA, pairB);
		const p1Larger = Math.max(pairA, pairB);
		const typstSub1 =
			variant === 0
				? `1) أَكْمِلِ العَدَدَ المَفْقُودَ عِنْدَ العَلَامَةِ (?) عَلَى الشَّرِيطِ العَدَدِيِّ: ........`
				: `1) قَارِنْ بَيْنَ العَدَدَيْنِ بِوَضْعِ الرَّمْزِ المُناسِبِ ($<$ أَوْ $>$):  $${pairA}$ ..... $${pairB}$`;
		const typstAns1 =
			variant === 0
				? `1) العَدَدُ المَفْقُودُ هُوَ: $${missingTarget}$.`
				: `1) المُقَارَنَةُ: $${pairA} ${pairA < pairB ? '<' : '>'} ${pairB}$.`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgPath,
				caption: 'الشَّرِيطُ العَدَدِيُّ'
			},
			{
				type: 'text',
				content: typstSub1,
				answer: typstAns1,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `2) رَتِّبِ الأَعْدَادَ التَّالِيَةَ تَصَاعُدِيًّا (مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ):  $${shuffledTriple[0]}$ ، $${shuffledTriple[1]}$ ، $${shuffledTriple[2]}$`,
				answer: `2) التَّرْتِيبُ التَّصَاعُدِيُّ: $${cmpTriple.join(' < ')}$`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `3) فَكِّكِ العَدَدَ $${cmpTriple[1]}$ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ:  $${cmpTriple[1]} = dots + dots$`,
				answer: `3) التَّفْكِيكُ: $${cmpTriple[1]} = ${Math.floor(cmpTriple[1] / 10) * 10} + ${cmpTriple[1] % 10}$`,
				mark: '0.5'
			},
			buildIllustratedFigureBlock('pri_math_02_colored_pencils_bundles', {
				maxHeight: 112,
				width: '58%',
				mode: 'image_only',
				title: 'التَّجْمِيعُ بِالعَشَرَاتِ وَالوَحَدَاتِ (حُزَمُ الأَقْلَامِ)'
			})
		];

		return {
			templateId: '1ap_t2_numbers_20_to_39_compare',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: 'الأَعْدَادُ مِنْ 20 إِلَى 39: العَدُّ وَالمُقَارَنَةُ وَالتَّرْتِيبُ',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'لَاحِظِ الشَّرِيطَ العَدَدِيَّ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:',
				content
			},
			hints: [
				'عَلَى الشَّرِيطِ العَدَدِيِّ، تَكْبُرُ الأَعْدَادُ كُلَّمَا اتَّجَهْنَا نَحْوَ اليَمِينِ.',
				'لِمُقَارَنَةِ عَدَدَيْنِ مِنْ رَقْمَيْنِ، نَقَارِنُ رَقْمَ العَشَرَاتِ أَوَّلًا ثُمَّ رَقْمَ الوَحَدَاتِ.',
				`انْظُرْ إِلَى التَّدْرِيجَاتِ المُتَتَالِيَةِ؛ كُلُّ تَدْرِيجَةٍ تَزِيدُ بِـ $1$ عنْ سَابِقَتِهَا.`
			],
			solutionStepsAr: [
				`نُحَدِّدُ مَوْضِعَ الأَعْدَادِ عَلَى الشَّرِيطِ العَدَدِيِّ بَيْنَ $${winMin}$ وَ $${winMax}$.`,
				variant === 0
					? `العَدَدُ بَيْنَ $${missingTarget - 1}$ وَ $${missingTarget + 1}$ هُوَ $${missingTarget}$.`
					: `فِي المُقَارَنَةِ نَجِدُ $${p1Smaller} < ${p1Larger}$، وَالتَّرْتِيبُ التَّصَاعُدِيُّ هُوَ $${cmpTriple.join(' < ')}$.`,
				`رَقْمُ العَشَرَاتِ فِي $${cmpTriple[1]}$ هُوَ $${Math.floor(cmpTriple[1] / 10)}$ وَالوَحَدَاتُ $${cmpTriple[1] % 10}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Small Add/Sub (< 40) & Doubles/Halves (svgCountingObjects)
// ---------------------------------------------------------------------------
const templateAddSubDoublesHalves: ParameterizedTemplate = {
	id: '1ap_t2_add_sub_doubles_halves',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_1ap_t2_add_sub_small_numbers_to_39',
	titleAr: 'الجَمْعُ وَالطَّرْحُ البَسِيطُ ضِمْنَ 39 وَالضِّعْفُ وَالنِّصْفُ',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 3);

		const objMeta = rng.pick(COUNTING_OBJECTS_META);
		const variant = rng.int(0, 2); // 0: addition, 1: subtraction, 2: double/half

		// Keep SVG counts <= 29 because svgCountingObjects caps each group at 30.
		const [addA, addB] =
			difficulty === 'easy'
				? pickNoCarryAddPair(rng, 11, 16, 2, 7, 23)
				: pickNoCarryAddPair(rng, 20, 29, 2, 9, 38);
		const addSum = addA + addB;

		const [subTotal, subTake] =
			difficulty === 'easy'
				? pickNoBorrowSubPair(rng, 14, 19, 2, 6)
				: pickNoBorrowSubPair(rng, 22, 29, 2, 8);
		const subDiff = subTotal - subTake;

		// For Sujet Part 2 (text-only), we also include an operation up to 39
		const [textA, textB] = pickNoCarryAddPair(rng, 30, 36, 2, 8, 39);
		const [textSubA, textSubB] = pickNoBorrowSubPair(rng, 32, 39, 2, 7);

		const doubleBase = difficulty === 'easy' ? rng.int(2, 5) : rng.int(4, 9);
		const doubleRes = doubleBase + doubleBase;
		const halfPool =
			difficulty === 'easy' ? [4, 6, 8, 10] : [10, 12, 14, 16, 18];
		const halfBase = rng.pick(halfPool);
		const halfRes = halfBase / 2;

		let svg = '';
		let imageCaption = '';
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			svg = svgCountingObjects({
				count: addA,
				secondGroupCount: addB,
				operatorLabel: '+',
				kind: objMeta.kind,
				perRow: 5
			});
			imageCaption = `جَمْعُ ${objMeta.captionAr}`;
		} else if (variant === 1) {
			svg = svgCountingObjects({
				count: subTotal,
				secondGroupCount: subTake,
				operatorLabel: '-',
				kind: objMeta.kind,
				perRow: 5
			});
			imageCaption = `طَرْحُ ${objMeta.captionAr}`;
		} else {
			const askDouble = rng.int(0, 1) === 0;
			if (askDouble) {
				svg = svgCountingObjects({
					count: doubleBase,
					secondGroupCount: doubleBase,
					operatorLabel: '+',
					kind: objMeta.kind,
					perRow: 5
				});
				imageCaption = `ضِعْفُ العَدَدِ ${doubleBase}`;
			} else {
				svg = svgCountingObjects({
					count: halfBase,
					kind: objMeta.kind,
					perRow: halfRes
				});
				imageCaption = `نِصْفُ العَدَدِ ${halfBase}`;
			}
		}

		const svgPath = saveSvgAsset(`1ap_t2_cnt_${difficulty}_s${cleanSeed}`, svg);

		if (variant === 0) {
			const questionText = `عُدَّ المَجْمُوعَتَيْنِ فِي الصُّورَةِ وَاحْسُبِ المَجْمُوعَ: $${addA} + ${addB}$`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption,
				questionData: {
					answer: addSum,
					displayTemplate: `$${addA} + ${addB} = ?$`,
					variables: [],
					tolerance: 0
				},
				explanation: `نَبْدَأُ مِنَ العَدَدِ $${addA}$ وَنَضِيفُ $${addB}$ خَطَوَاتٍ: $${addA} + ${addB} = ${addSum}$.`
			};
			finalAnswer = String(addSum);
		} else if (variant === 1) {
			const wrongAdded = subTotal + subTake <= 39 ? subTotal + subTake : subDiff + 10;
			const built = buildUniqueMcqOptions(
				`$${subDiff}$`,
				[
					{
						text: `$${wrongAdded}$`,
						diagnosticFeedback:
							'انْتَبِهْ لِلرَّمْزِ ($-$)! نَحْنُ نَطْرَحُ (نُنْقِصُ) وَلَا نَجْمَعُ.'
					},
					{
						text: `$${subDiff + 1}$`,
						diagnosticFeedback: 'رَاجِعِ العَدَّ إِلَى الخَلْفِ مِنْ $' + subTotal + '$ بِـ $' + subTake + '$ خَطَوَاتٍ.'
					},
					{
						text: `$${Math.max(1, subDiff - 1)}$`,
						diagnosticFeedback: 'رَاجِعْ طَرْحَ الوَحَدَاتِ: $' + (subTotal % 10) + ' - ' + subTake + ' = ' + ((subTotal % 10) - subTake) + '$.'
					}
				],
				rng
			);
			const questionText = `تَأَمَّلِ الرَّسْمَ وَاحْسُبْ نَاتِجَ الطَّرْحِ: $${subTotal} - ${subTake} = ?$`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَنْقُصُ $${subTake}$ مِنْ $${subTotal}$ فَنَجِدُ: $${subTotal} - ${subTake} = ${subDiff}$.`
			};
			finalAnswer = String(subDiff);
		} else {
			const askDouble = imageCaption.startsWith('ضِعْفُ');
			if (askDouble) {
				const built = buildUniqueMcqOptions(
					`$${doubleRes}$`,
					[
						{
							text: `$${doubleBase + 2 === doubleRes ? doubleRes + 2 : doubleBase + 2}$`,
							diagnosticFeedback: `ضِعْفُ العَدَدِ يَعْنِي جَمْعَهُ مَعَ نَفْسِهِ ($${doubleBase} + ${doubleBase}$) وَلَيْسَ إِضَافَةَ $2$.`
						},
						{
							text: `$${doubleRes + 1}$`,
							diagnosticFeedback: `أَعِدِ العَدَّ فِي المَجْمُوعَتَيْنِ: $${doubleBase} + ${doubleBase} = ${doubleRes}$.`
						},
						{
							text: `$${doubleRes - 1}$`,
							diagnosticFeedback: `تَأَكَّدْ مِنَ الجَمْعِ: $${doubleBase} + ${doubleBase} = ${doubleRes}$.`
						}
					],
					rng
				);
				const questionText = `تَأَمَّلِ المَجْمُوعَتَيْنِ المُتَسَاوِيَتَيْنِ فِي الصُّورَةِ: مَا هُوَ ضِعْفُ العَدَدِ $${doubleBase}$؟`;
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `ضِعْفُ العَدَدِ $${doubleBase}$ هُوَ مَجْمُوعُهُ مَعَ نَفْسِهِ: $${doubleBase} + ${doubleBase} = ${doubleRes}$.`
				};
				finalAnswer = String(doubleRes);
			} else {
				const built = buildUniqueMcqOptions(
					`$${halfRes}$`,
					[
						{
							text: `$${halfBase + halfBase <= 39 ? halfBase + halfBase : halfRes + 4}$`,
							diagnosticFeedback:
								'انْتَبِهْ! المَطْلُوبُ هُوَ نِصْفُ العَدَدِ (تَقْسِيمُهُ إِلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ) وَلَيْسَ ضِعْفَهُ.'
						},
						{
							text: `$${halfRes + 1}$`,
							diagnosticFeedback: `عُدَّ عَنَاصِرَ السَّطْرِ الوَاحِدِ فِي الصُّورَةِ: هِيَ $${halfRes}$ وَلَيْسَ $${halfRes + 1}$.`
						},
						{
							text: `$${Math.max(1, halfRes - 1)}$`,
							diagnosticFeedback: `تَحَقَّقْ: يَجِبُ أَنْ يَكُونَ النِّصْفُ + النِّصْفُ = $${halfBase}$.`
						}
					],
					rng
				);
				const questionText = `رُتِّبَتْ $${halfBase}$ ${objectCountLabel(halfBase, objMeta)} فِي سَطْرَيْنِ مُتَسَاوِيَيْنِ. مَا هُوَ نِصْفُ العَدَدِ $${halfBase}$؟`;
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `نِصْفُ $${halfBase}$ هُوَ $${halfRes}$ لِأَنَّ $${halfRes} + ${halfRes} = ${halfBase}$.`
				};
				finalAnswer = String(halfRes);
			}
		}

		const sujetPart1 =
			variant === 1
				? `1) تَأَمَّلِ الرَّسْمَ ثُمَّ احْسُبْ:  $${subTotal} - ${subTake} = dots$`
				: `1) عُدَّ وَأَكْمِلْ حِسَابَ المَجْمُوعِ:  $${addA} + ${addB} = dots$`;
		const sujetAns1 =
			variant === 1
				? `1) $${subTotal} - ${subTake} = ${subDiff}$`
				: `1) $${addA} + ${addB} = ${addSum}$`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `${sujetPart1}\n\n2) أَكْمِلِ الحِسَابَ:\n\nأ) $${textA} + ${textB} = dots$\n\nب) $${textSubA} - ${textSubB} = dots$`,
						answer: `${sujetAns1}\n\n2) أ) $${textA} + ${textB} = ${textA + textB}$\n\nب) $${textSubA} - ${textSubB} = ${textSubA - textSubB}$`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: imageCaption
					}
				]
			},
			{
				type: 'text',
				content: `3) أَكْمِلْ مَا يَلِي:\n\nأ) ضِعْفُ العَدَدِ $${doubleBase}$ هُوَ: ........\n\nب) نِصْفُ العَدَدِ $${halfBase}$ هُوَ: ........`,
				answer: `3) أ) ضِعْفُ $${doubleBase}$ هُوَ $${doubleRes}$ (لِأَنَّ $${doubleBase} + ${doubleBase} = ${doubleRes}$).\n\nب) نِصْفُ $${halfBase}$ هُوَ $${halfRes}$ (لِأَنَّ $${halfRes} + ${halfRes} = ${halfBase}$).`,
				mark: '0.5'
			},
			buildIllustratedFigureBlock('pri_math_01_apple_baskets', {
				maxHeight: 112,
				width: '58%',
				mode: 'image_only',
				title: 'تَذْكِيرٌ بَصَرِيٌّ: الضَّمُّ وَالمَجْمُوعَاتُ'
			})
		];

		return {
			templateId: '1ap_t2_add_sub_doubles_halves',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: 'الجَمْعُ وَالطَّرْحُ البَسِيطُ ضِمْنَ 39 وَالضِّعْفُ وَالنِّصْفُ',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'لَاحِظِ الرَّسْمَ ثُمَّ أَنْجِزِ العَمَلِيَّاتِ التَّالِيَةَ:',
				content
			},
			hints: [
				'الرَّمْزُ ($+$) يَعْنِي الإِضَافَةَ وَالجَمْعَ، وَالرَّمْزُ ($-$) يَعْنِي الطَّرْحَ وَالنُّقْصَانَ.',
				'ضِعْفُ عَدَدٍ هُوَ مَجْمُوعُهُ مَعَ نَفْسِهِ (مِثْلُ $5 + 5 = 10$).',
				'نِصْفُ عَدَدٍ زَوْجِيٍّ هُوَ تَقْسِيمُهُ إِلَى جُزْأَيْنِ مُتَسَاوِيَيْنِ.'
			],
			solutionStepsAr: [
				variant === 1
					? `فِي الطَّرْحِ نُنْقِصُ $${subTake}$ مِنْ $${subTotal}$ فَنَحْصُلُ عَلَى $${subDiff}$.`
					: `فِي الجَمْعِ نُضِيفُ $${addB}$ إِلَى $${addA}$ فَنَحْصُلُ عَلَى $${addSum}$.`,
				`ضِعْفُ $${doubleBase}$ هُوَ $${doubleBase} + ${doubleBase} = ${doubleRes}$، وَنِصْفُ $${halfBase}$ هُوَ $${halfRes}$.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Plane Shapes & Familiar Solids (svgShapesStrip)
// ---------------------------------------------------------------------------
type PlaneShapeKey = 'square' | 'rectangle' | 'triangle' | 'circle';

interface PlaneShapeInfo {
	key: PlaneShapeKey;
	nameDef: string;
	nameIndef: string;
	sides: number;
	vertices: number;
	sidesSummary: string;
}

const PLANE_SHAPES_INFO: Record<PlaneShapeKey, PlaneShapeInfo> = {
	square: {
		key: 'square',
		nameDef: 'المُرَبَّعُ',
		nameIndef: 'مُرَبَّعٌ',
		sides: 4,
		vertices: 4,
		sidesSummary: '$4$ أَضْلَاعٍ وَ $4$ رُؤُوسٍ'
	},
	rectangle: {
		key: 'rectangle',
		nameDef: 'المُسْتَطِيلُ',
		nameIndef: 'مُسْتَطِيلٌ',
		sides: 4,
		vertices: 4,
		sidesSummary: '$4$ أَضْلَاعٍ وَ $4$ رُؤُوسٍ'
	},
	triangle: {
		key: 'triangle',
		nameDef: 'المُثَلَّثُ',
		nameIndef: 'مُثَلَّثٌ',
		sides: 3,
		vertices: 3,
		sidesSummary: '$3$ أَضْلَاعٍ وَ $3$ رُؤُوسٍ'
	},
	circle: {
		key: 'circle',
		nameDef: 'القُرْصُ',
		nameIndef: 'قُرْصٌ',
		sides: 0,
		vertices: 0,
		sidesSummary: '$0$ ضِلْعٍ وَ $0$ رَأْسٍ'
	}
};

interface SolidStatement {
	text: string;
	isTrue: boolean;
	correction: string;
	explanation: string;
}

const SOLID_STATEMENTS: readonly SolidStatement[] = [
	{
		text: 'عُلْبَةُ الدَّوَاءِ وَعُلْبَةُ الأَحْذِيَةِ تُشْبِهَانِ البَلَاطَةَ القَائِمَةَ، وَهِيَ لَا تَتَدَحْرَجُ.',
		isTrue: true,
		correction: 'العِبَارَةُ صَحِيحَةٌ.',
		explanation: 'نَعَمْ، البَلَاطَةُ القَائِمَةُ وُجُوهُهَا مُسْتَطِيلَاتٌ مُسْتَوِيَةٌ وَلَا تَتَدَحْرَجُ.'
	},
	{
		text: 'حَجَرُ النَّرْدِ يُشْبِهُ المُكَعَّبَ، وَوُجُوهُهُ السِّتَّةُ كُلُّهَا مُرَبَّعَاتٌ.',
		isTrue: true,
		correction: 'العِبَارَةُ صَحِيحَةٌ.',
		explanation: 'نَعَمْ، لِلْمُكَعَّبِ $6$ وُجُوهٍ كُلُّهَا مُرَبَّعَاتٌ، وَ $8$ رُؤُوسٍ، وَ $12$ حَرْفًا.'
	},
	{
		text: 'المُكَعَّبُ وَالبَلَاطَةُ القَائِمَةُ يَتَدَحْرَجَانِ مِثْلَ الكُرَةِ عَلَى الطَّاوِلَةِ.',
		isTrue: false,
		correction: 'المُكَعَّبُ وَالبَلَاطَةُ القَائِمَةُ لَا يَتَدَحْرَجَانِ لِأَنَّ وُجُوهَهُمَا مُسْتَوِيَةٌ.',
		explanation: 'خَطَأٌ! المُكَعَّبُ وَالبَلَاطَةُ القَائِمَةُ لَا يَتَدَحْرَجَانِ، بَيْنَمَا الكُرَةُ وَالأُسْطُوَانَةُ تَتَدَحْرَجَانِ.'
	},
	{
		text: 'عُلْبَةُ العَصِيرِ الأُسْطُوَانِيَّةُ تَسْتَطِيعُ أَنْ تَتَدَحْرَجَ عَلَى جَانِبِهَا المُنْحَنِي.',
		isTrue: true,
		correction: 'العِبَارَةُ صَحِيحَةٌ.',
		explanation: 'نَعَمْ، الأُسْطُوَانَةُ لَهَا جَانِبٌ مُنْحَنٍ وَقَاعِدَتَانِ دَائِرِيَّتَانِ فَتَتَدَحْرَجُ.'
	},
	{
		text: 'لِلْمُكَعَّبِ $4$ وُجُوهٍ فَقَطْ وَ $4$ رُؤُوسٍ.',
		isTrue: false,
		correction: 'لِلْمُكَعَّبِ $6$ وُجُوهٍ وَ $8$ رُؤُوسٍ وَ $12$ حَرْفًا.',
		explanation: 'خَطَأٌ! لِلْمُكَعَّبِ $6$ وُجُوهٍ، وَ $8$ رُؤُوسٍ، وَ $12$ حَرْفًا.'
	}
];

const templatePlaneShapesSolids: ParameterizedTemplate = {
	id: '1ap_t2_plane_shapes_solids',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'geometry',
	curriculumLessonId: 'lesson_1ap_t2_plane_shapes',
	titleAr: 'الأَشْكَالُ المُسْتَوِيَةُ وَالمُجَسَّمَاتُ المَأْلُوفَةُ',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 4);

		const shapeOrder = rng.shuffle<PlaneShapeKey>(['square', 'rectangle', 'triangle', 'circle']);
		const labels = ['A', 'B', 'C', 'D'];
		const hiIdx = rng.int(0, 3);
		const hiShape = PLANE_SHAPES_INFO[shapeOrder[hiIdx]];
		const hiLabel = labels[hiIdx];

		const svg = svgShapesStrip({
			shapes: shapeOrder,
			highlightIndex: hiIdx,
			labels
		});
		const svgPath = saveSvgAsset(`1ap_t2_shp_${difficulty}_s${cleanSeed}`, svg);

		const solidPair = rng.pickDistinct(SOLID_STATEMENTS, 2);
		const variant = rng.int(0, 2);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const askSides = rng.int(0, 1) === 1;
			if (!askSides) {
				const otherNames = (['square', 'rectangle', 'triangle', 'circle'] as const)
					.filter((k) => k !== hiShape.key)
					.map((k) => PLANE_SHAPES_INFO[k]);
				const built = buildUniqueMcqOptions(
					hiShape.nameDef,
					otherNames.map((other) => ({
						text: other.nameDef,
						diagnosticFeedback: `لَا، الشَّكْلُ (${hiLabel}) هُوَ ${hiShape.nameDef}؛ ${hiShape.sides > 0 ? `لَهُ ${hiShape.sides} أَضْلَاعٍ` : 'لَيْسَ لَهُ أَضْلَاعٌ مُسْتَقِيمَةٌ'}.`
					})),
					rng
				);
				const questionText = `تَأَمَّلْ شَرِيطَ الأَشْكَالِ: مَا اسْمُ الشَّكْلِ المُلَوَّنِ بِالأَصْفَرِ (${hiLabel})؟`;
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: 'الأَشْكَالُ المُسْتَوِيَةُ المَأْلُوفَةُ',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `الشَّكْلُ المُلَوَّنُ بِالأَصْفَرِ (${hiLabel}) هُوَ ${hiShape.nameDef}.`
				};
				finalAnswer = hiShape.nameDef;
			} else {
				const allChoices = [
					{ text: '$4$ أَضْلَاعٍ وَ $4$ رُؤُوسٍ', val: 4 },
					{ text: '$3$ أَضْلَاعٍ وَ $3$ رُؤُوسٍ', val: 3 },
					{ text: '$0$ ضِلْعٍ وَ $0$ رَأْسٍ', val: 0 },
					{ text: '$6$ أَضْلَاعٍ وَ $6$ رُؤُوسٍ', val: 6 }
				];
				const correctChoice =
					allChoices.find((c) => c.val === hiShape.sides) ?? allChoices[0];
				const distractors = allChoices
					.filter((c) => c.val !== hiShape.sides)
					.map((c) => ({
						text: c.text,
						diagnosticFeedback: `عُدَّ حَوَافَّ وَزَوَايَا الشَّكْلِ (${hiLabel}) بِعِنَايَةٍ: إِنَّهُ ${hiShape.nameDef}.`
					}));
				const built = buildUniqueMcqOptions(correctChoice.text, distractors, rng);
				const questionText = `تَأَمَّلِ الشَّكْلَ المُلَوَّنَ بِالأَصْفَرِ (${hiLabel}): مَا عَدَدُ أَضْلَاعِهِ وَرُؤُوسِهِ؟`;
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: 'أَضْلَاعُ وَرُؤُوسُ الأَشْكَالِ المُسْتَوِيَةِ',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `الشَّكْلُ (${hiLabel}) هُوَ ${hiShape.nameDef}، وَلَهُ ${hiShape.sidesSummary}.`
				};
				finalAnswer = `${hiShape.sides} أضلاع و ${hiShape.vertices} رؤوس`;
			}
		} else if (variant === 1) {
			const stmt = solidPair[0];
			const questionText = `أَجِبْ بِصَحِيحٍ أَوْ خَطَأٍ: ${stmt.text}`;
			quizQuestion = {
				type: 'true_false',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'الأَشْكَالُ وَالمُجَسَّمَاتُ المَأْلُوفَةُ',
				questionData: {
					correctAnswer: stmt.isTrue
				},
				explanation: stmt.explanation
			};
			finalAnswer = stmt.isTrue ? 'صحيح' : 'خطأ';
		} else {
			const categories = ['مُجَسَّمَاتٌ تَتَدَحْرَجُ', 'مُجَسَّمَاتٌ لَا تَتَدَحْرَجُ'];
			const items = rng.shuffle([
				{ text: 'الكُرَةُ', category: 0 },
				{ text: 'الأُسْطُوَانَةُ (عُلْبَةُ عَصِيرٍ)', category: 0 },
				{ text: 'المُكَعَّبُ (حَجَرُ النَّرْدِ)', category: 1 },
				{ text: 'البَلَاطَةُ القَائِمَةُ (عُلْبَةُ دَوَاءٍ)', category: 1 }
			]);
			const questionText = 'صَنِّفِ المُجَسَّمَاتِ المَأْلُوفَةَ التَّالِيَةَ إِلَى مُجَسَّمَاتٍ تَتَدَحْرَجُ وَمُجَسَّمَاتٍ لَا تَتَدَحْرَجُ:';
			quizQuestion = {
				type: 'drag_drop',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'الأَشْكَالُ وَالمُجَسَّمَاتُ',
				questionData: {
					categories,
					items
				},
				explanation:
					'الكُرَةُ وَالأُسْطُوَانَةُ لَهُمَا سَطْحٌ مُنْحَنٍ فَتَتَدَحْرَجَانِ، أَمَّا المُكَعَّبُ وَالبَلَاطَةُ القَائِمَةُ فَوُجُوهُهُمَا مُسْتَوِيَةٌ وَلَا تَتَدَحْرَجُ.'
			};
			finalAnswer = 'الكرة والأسطوانة تتدحرجان؛ المكعب والبلاطة القائمة لا يتدحرجان';
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) تَأَمَّلْ شَرِيطَ الأَشْكَالِ المُسْتَوِيَةِ المُقَابِلَ:\n\nأ) الشَّكْلُ (${hiLabel}) المُلَوَّنُ بِالأَصْفَرِ هُوَ: ....................\n\nب) عَدَدُ أَضْلَاعِهِ: ........ وَعَدَدُ رُؤُوسِهِ: ........`,
						answer: `1) أ) الشَّكْلُ (${hiLabel}) هُوَ: ${hiShape.nameDef}.\n\nب) عَدَدُ أَضْلَاعِهِ: $${hiShape.sides}$، وَعَدَدُ رُؤُوسِهِ: $${hiShape.vertices}$.`,
						mark: '0.5'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'الأَشْكَالُ المُسْتَوِيَةُ'
					}
				]
			},
			buildIllustratedFigureBlock('pri_math_06_3d_geometric_solids', {
				maxHeight: 112,
				width: '58%',
				mode: 'image_only',
				title: '2) المُجَسَّمَاتُ المَأْلُوفَةُ: أَجِبْ بِصَحِيحٍ أَوْ خَطَإٍ'
			}),
			{
				type: 'true_false',
				items: solidPair.map((st) => ({
					q: st.text,
					a: st.isTrue ? 'صَحِيحٌ' : 'خَطَأٌ',
					c: st.correction,
					mark: '0.5'
				}))
			}
		];

		return {
			templateId: '1ap_t2_plane_shapes_solids',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
			titleAr: 'الأَشْكَالُ المُسْتَوِيَةُ وَالمُجَسَّمَاتُ المَأْلُوفَةُ',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'أَجِبْ عَنِ الأَسْئِلَةِ الخَاصَّةِ بِالأَشْكَالِ المُسْتَوِيَةِ وَالمُجَسَّمَاتِ:',
				content
			},
			hints: [
				'لِلْمُرَبَّعِ $4$ أَضْلَاعٍ مُتَسَاوِيَةٍ، وَلِلْمُسْتَطِيلِ ضِلْعَانِ طَوِيلَانِ وَضِلْعَانِ قَصِيرَانِ، وَلِلْمُثَلَّثِ $3$ أَضْلَاعٍ، وَلِلْقُرْصِ $0$ ضِلْعٍ.',
				'وُجُوهُ المُكَعَّبِ كُلُّهَا مُرَبَّعَاتٌ، أَمَّا وُجُوهُ البَلَاطَةِ القَائِمَةِ فَهِيَ مُسْتَطِيلَاتٌ.',
				'المُجَسَّمَاتُ ذَاتُ الجَانِبِ المُنْحَنِي (مِثْلُ الكُرَةِ وَالأُسْطُوَانَةِ) هِيَ الَّتِي تَتَدَحْرَجُ.'
			],
			solutionStepsAr: [
				`الشَّكْلُ (${hiLabel}) هُوَ ${hiShape.nameDef} وَلَهُ ${hiShape.sidesSummary}.`,
				`المُكَعَّبُ وَالبَلَاطَةُ القَائِمَةُ لَا يَتَدَحْرَجَانِ وَلِكُلٍّ مِنْهُمَا $6$ وُجُوهٍ وَ $8$ رُؤُوسٍ وَ $12$ حَرْفًا، بَيْنَمَا الكُرَةُ وَالأُسْطُوَانَةُ تَتَدَحْرَجَانِ.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Reading Analog Clock (تماماً / ونصف) & Daily Periods (svgAnalogClock)
// ---------------------------------------------------------------------------
const templateClockHourHalf: ParameterizedTemplate = {
	id: '1ap_t2_time_telling_hour_half',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'measurement',
	curriculumLessonId: 'lesson_1ap_t2_time_telling_hour_half',
	titleAr: 'قِرَاءَةُ السَّاعَةِ (تَمَامًا وَنِصْفٌ) وَأَوْقَاتُ اليَوْمِ',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 5);

		let h = 8;
		let min = 0;

		if (difficulty === 'easy') {
			h = rng.pick([7, 8, 9, 10, 11, 12]);
			min = 0;
		} else if (difficulty === 'medium') {
			// Avoid h = 6 when min = 30 so hands stay visually distinct for 6-year-olds
			h = rng.pick([1, 2, 3, 4, 7, 8, 9, 10, 12]);
			min = 30;
		} else {
			min = rng.pick([0, 30]);
			h = min === 0 ? rng.int(1, 12) : rng.pick([1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]);
		}

		const timeStr = `${pad2(h)}:${pad2(min)}`;
		const timeWordsAr =
			min === 0 ? `${HOUR_WORDS_1AP[h]} تَمَامًا` : `${HOUR_WORDS_1AP[h]} وَالنِّصْفُ`;
		const periodNote =
			h >= 7 && h <= 11
				? 'صَبَاحًا'
				: h === 12
					? 'مُنْتَصَفَ النَّهَارِ'
					: h >= 1 && h <= 5
						? 'بَعْدَ الظُّهْرِ'
						: 'مَسَاءً';

		const svg = svgAnalogClock(h, min);
		const svgPath = saveSvgAsset(`1ap_t2_clk_${difficulty}_s${cleanSeed}`, svg);

		const dayPeriodsOrdered = ['صَبَاحًا', 'مُنْتَصَفَ النَّهَارِ', 'بَعْدَ الظُّهْرِ', 'مَسَاءً'];
		const shuffledPeriods = rng.shuffle(dayPeriodsOrdered);

		const variant = rng.int(0, 2);
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = timeStr;

		if (variant === 0) {
			const altMinStr = min === 0 ? '30' : '00';
			const dialMinStr = min === 0 ? '12' : '06';
			const nextH = h === 12 ? 1 : h + 1;

			const built = buildUniqueMcqOptions(
				`$${timeStr}$`,
				[
					{
						text: `$${pad2(h)}:${altMinStr}$`,
						diagnosticFeedback:
							'رَاقِبِ العَقْرَبَ الطَّوِيلَ الأَزْرَقَ: عَلَى $12$ يَعْنِي تَمَامًا ($:00$)، وَعَلَى $6$ يَعْنِي وَنِصْفًا ($:30$).'
					},
					{
						text: `$${pad2(h)}:${dialMinStr}$`,
						diagnosticFeedback:
							'انْتَبِهْ! العَقْرَبُ الطَّوِيلُ عَلَى $6$ يَعْنِي $30$ دَقِيقَةً وَلَيْسَ $6$، وَعَلَى $12$ يَعْنِي $00$ وَلَيْسَ $12$.'
					},
					{
						text: `$${pad2(nextH)}:${pad2(min)}$`,
						diagnosticFeedback: `انْظُرْ إِلَى العَقْرَبِ القَصِيرِ الأَحْمَرِ: السَّاعَةُ هِيَ ${HOUR_WORDS_1AP[h]} وَلَيْسَتْ ${HOUR_WORDS_1AP[nextH]}.`
					}
				],
				rng
			);
			const questionText = `تَأَمَّلِ السَّاعَةَ ذَاتَ العَقَارِبِ (${periodNote}): مَا هُوَ التَّوْقِيتُ الرَّقْمِيُّ المُوافِقُ لَهَا؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `السَّاعَةُ (${periodNote})`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `العَقْرَبُ القَصِيرُ الأَحْمَرُ يَدُلُّ عَلَى السَّاعَةِ $${h}$، وَالعَقْرَبُ الطَّوِيلُ الأَزْرَقُ عَلَى $${min === 0 ? 12 : 6}$ ($${pad2(min)}$ دَقِيقَةً)، إِذَنْ التَّوْقِيتُ هُوَ $${timeStr}$.`
			};
			finalAnswer = timeStr;
		} else if (variant === 1) {
			const nextH = h === 12 ? 1 : h + 1;
			const prevH = h === 1 ? 12 : h - 1;
			const wrongSuffix = min === 0 ? 'وَالنِّصْفُ' : 'تَمَامًا';
			const sameSuffix = min === 0 ? 'تَمَامًا' : 'وَالنِّصْفُ';
			const built = buildUniqueMcqOptions(
				timeWordsAr,
				[
					{
						text: `${HOUR_WORDS_1AP[h]} ${wrongSuffix}`,
						diagnosticFeedback:
							'تَأَكَّدْ مِنَ العَقْرَبِ الطَّوِيلِ الأَزْرَقِ: عَلَى $12$ نَقُولُ «تَمَامًا» وَعَلَى $6$ نَقُولُ «وَالنِّصْفُ».'
					},
					{
						text: `${HOUR_WORDS_1AP[nextH]} ${sameSuffix}`,
						diagnosticFeedback: `العَقْرَبُ القَصِيرُ لَمْ يَصِلْ إِلَى $${nextH}$ بَعْدُ، السَّاعَةُ هِيَ ${HOUR_WORDS_1AP[h]}.`
					},
					{
						text: `${HOUR_WORDS_1AP[prevH]} ${sameSuffix}`,
						diagnosticFeedback: `رَاقِبْ مَوْقِعَ العَقْرَبِ القَصِيرِ الأَحْمَرِ بِدِقَّةٍ؛ إِنَّهُ عِنْدَ ${HOUR_WORDS_1AP[h]}.`
					}
				],
				rng
			);
			const questionText = 'تَأَمَّلِ السَّاعَةَ فِي الصُّورَةِ: مَا هِيَ القِرَاءَةُ الصَّحِيحَةُ بِالحُرُوفِ؟';
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'قِرَاءَةُ السَّاعَةِ بِالحُرُوفِ',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `تُشِيرُ السَّاعَةُ إِلَى ${timeWordsAr}، وَتُكْتَبُ رَقْمِيًّا $${timeStr}$.`
			};
			finalAnswer = timeWordsAr;
		} else {
			const isTrue = rng.int(0, 1) === 1;
			const claimedTime = isTrue
				? timeStr
				: `${pad2(h)}:${min === 0 ? '30' : '00'}`;
			const questionText = `أَجِبْ بِصَحِيحٍ أَوْ خَطَأٍ: تُشِيرُ السَّاعَةُ ذَاتُ العَقَارِبِ إِلَى التَّوْقِيتِ $${claimedTime}$.`;
			quizQuestion = {
				type: 'true_false',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'التَّحَقُّقُ مِنَ التَّوْقِيتِ',
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `التَّوْقِيتُ الصَّحِيحُ فِي الصُّورَةِ هُوَ $${timeStr}$ (${timeWordsAr}).`
			};
			finalAnswer = isTrue ? 'صحيح' : 'خطأ';
		}

		const periodHeaders: string[] = shuffledPeriods;
		const periodAnswerRow: TableCell[] = shuffledPeriods.map((p) => ({
			content: '.....',
			answer: `$${dayPeriodsOrdered.indexOf(p) + 1}$`
		}));

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) لَاحِظِ السَّاعَةَ المُقَابِلَةَ (${periodNote})، ثُمَّ اكْتُبِ التَّوْقِيتَ:\n\nأ) بِالأَرْقَامِ:  ........ : ........\n\nب) بِالحُرُوفِ: ....................................`,
						answer: `1) أ) التَّوْقِيتُ الرَّقْمِيُّ: $${timeStr}$\n\nب) بِالحُرُوفِ: ${timeWordsAr}.`,
						mark: '0.75'
					},
					{
						type: 'image',
						src: svgPath,
						caption: `السَّاعَةُ (${periodNote})`
					}
				]
			},
			{
				type: 'text',
				content: '2) رَتِّبْ فَتَرَاتِ اليَوْمِ زَمَنِيًّا مِنَ البِدَايَةِ إِلَى النِّهَايَةِ بِالأَرْقَامِ ($1$، $2$، $3$، $4$):',
				mark: '0.75'
			},
			{
				type: 'table',
				headers: periodHeaders,
				cells: [],
				rows: [periodAnswerRow],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		return {
			templateId: '1ap_t2_time_telling_hour_half',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'measurement',
			titleAr: 'قِرَاءَةُ السَّاعَةِ (تَمَامًا وَنِصْفٌ) وَأَوْقَاتُ اليَوْمِ',
			quizQuestion,
			sujetExercise: {
				points: 1.5,
				instruction: 'أَجِبْ عَنْ سُؤَالَيِ السَّاعَةِ وَفَتَرَاتِ اليَوْمِ:',
				content
			},
			hints: [
				'العَقْرَبُ القَصِيرُ الأَحْمَرُ يَدُلُّ عَلَى السَّاعَاتِ، وَالعَقْرَبُ الطَّوِيلُ الأَزْرَقُ يَدُلُّ عَلَى الدَّقَائِقِ.',
				'عِنْدَمَا يَكُونُ العَقْرَبُ الطَّوِيلُ عَلَى $12$ تَكُونُ السَّاعَةُ تَمَامًا ($:00$)، وَعَلَى $6$ تَكُونُ وَنِصْفًا ($:30$).',
				'فَتَرَاتُ اليَوْمِ تَتَتَابَعُ كَالتَّالِي: صَبَاحًا، ثُمَّ مُنْتَصَفَ النَّهَارِ، ثُمَّ بَعْدَ الظُّهْرِ، ثُمَّ مَسَاءً.'
			],
			solutionStepsAr: [
				`نَقْرَأُ السَّاعَاتِ مِنَ العَقْرَبِ القَصِيرِ الأَحْمَرِ: $${h}$.`,
				min === 0
					? `العَقْرَبُ الطَّوِيلُ الأَزْرَقُ عَلَى $12$ يَعْنِي تَمَامًا ($00$ دَقِيقَةً)، إِذَنْ $${timeStr}$ (${timeWordsAr}).`
					: `العَقْرَبُ الطَّوِيلُ الأَزْرَقُ عَلَى $6$ يَعْنِي وَنِصْفًا ($30$ دَقِيقَةً)، إِذَنْ $${timeStr}$ (${timeWordsAr}).`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 6. Integration (الوضعية الإدماجية): 1AP T2 Story Problem (<= 39) with Visual Objects
// ---------------------------------------------------------------------------
const templateIntegrationStory: ParameterizedTemplate = {
	id: '1ap_t2_integration_story',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'integration',
	curriculumLessonId: 'lesson_1ap_t2_integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الأَعْدَادُ إِلَى 39 وَالأَشْكَالُ وَالسَّاعَةُ',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Number.isFinite(seed) ? Math.trunc(seed) : 1;
		const rng = createRng(cleanSeed, difficulty, 6);

		const actor = rng.pick(CHILDREN_1AP);
		const objMeta = rng.pick(COUNTING_OBJECTS_META);

		const verbCollected = actor.fem ? 'جَمَعَتْ' : 'جَمَعَ';
		const verbHad = 'كَانَ عِنْدَ';
		const verbAdded = actor.fem ? 'أَضَافَتْ' : 'أَضَافَ';
		const verbGave = actor.fem ? 'أَعْطَتْ' : 'أَعْطَى';
		const verbFinished = actor.fem ? 'أَنْهَتْ' : 'أَنْهَى';
		const pronFriend = actor.fem ? 'لِصَدِيقَتِهَا' : 'لِصَدِيقِهِ';
		const pronAt = actor.fem ? 'عِنْدَهَا' : 'عِنْدَهُ';

		const clockChoice = rng.pick([
			{ time: '09:00', words: 'التَّاسِعَةُ تَمَامًا', period: 'صَبَاحًا' },
			{ time: '10:30', words: 'العَاشِرَةُ وَالنِّصْفُ', period: 'صَبَاحًا' },
			{ time: '02:30', words: 'الثَّانِيَةُ وَالنِّصْفُ', period: 'بَعْدَ الظُّهْرِ' },
			{ time: '04:00', words: 'الرَّابِعَةُ تَمَامًا', period: 'بَعْدَ الظُّهْرِ' }
		]);

		const boxShape = rng.pick([
			{ solid: 'المُكَعَّبُ', face: 'مُرَبَّعٌ', sides: 4, desc: 'وُجُوهُهُ كُلُّهَا مُرَبَّعَاتٌ' },
			{ solid: 'البَلَاطَةُ القَائِمَةُ', face: 'مُسْتَطِيلٌ', sides: 4, desc: 'وُجُوهُهَا مُسْتَطِيلَاتٌ' }
		]);

		const variant = rng.int(0, 2); // 0: addition story, 1: subtraction story, 2: two-step add then subtract

		let svg = '';
		let storyTypst = '';
		let storyKaTeX = '';
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let content: ContentBlock[] = [];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer = '';

		if (variant === 0) {
			const [a, b] =
				difficulty === 'easy'
					? pickNoCarryAddPair(rng, 11, 16, 2, 7, 19)
					: pickNoCarryAddPair(rng, 21, 29, 2, 9, 39);
			const total = a + b;
			const cmpVal = total >= 30 ? total - 10 : total + 10;
			const tensPart = Math.floor(total / 10) * 10;
			const onesPart = total % 10;

			svg = svgCountingObjects({
				count: a,
				secondGroupCount: b,
				operatorLabel: '+',
				kind: objMeta.kind,
				perRow: 5
			});
			const svgPath = saveSvgAsset(`1ap_t2_int_${difficulty}_s${cleanSeed}`, svg);

			storyTypst = `${verbCollected} ${actor.name} $${a}$ ${objectCountLabel(a, objMeta)} فِي الصَّبَاحِ، ثُمَّ ${verbAdded} إِلَيْهَا $${b}$ ${objectCountLabel(b, objMeta)} فِي المَسَاءِ (كَمَا فِي الرَّسْمِ).`;
			storyKaTeX = `${verbCollected} ${actor.name} $${a}$ ${objectCountLabel(a, objMeta)} فِي الصَّبَاحِ، ثُمَّ ${verbAdded} إِلَيْهَا $${b}$ ${objectCountLabel(b, objMeta)} فِي المَسَاءِ.`;

			const questionText = `${storyKaTeX} كَمْ ${objMeta.singularAcc} صَارَ ${pronAt} فِي المَجْمُوعِ؟`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `${objMeta.captionAr} ${actor.name}`,
				questionData: {
					answer: total,
					displayTemplate: `$${a} + ${b} = ?$`,
					variables: [],
					tolerance: 0
				},
				explanation: `نَجْمَعُ الكَمِّيَّتَيْنِ: $${a} + ${b} = ${total}$ ${objectCountLabel(total, objMeta)}.`
			};

			content = [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: storyTypst
						},
						{
							type: 'image',
							src: svgPath,
							caption: objMeta.captionAr
						}
					]
				},
				{
					type: 'text',
					content: `1) كَمْ ${objMeta.singularAcc} صَارَ عِنْدَ ${actor.name} فِي المَجْمُوعِ؟\n\nالعَمَلِيَّةُ: $dots + dots = dots$\n\nالجَوَابُ: صَارَ ${pronAt} ........ ${objMeta.singularAcc}.`,
					answer: `1) العَمَلِيَّةُ: $${a} + ${b} = ${total}$\n\nالجَوَابُ: صَارَ ${pronAt} $${total}$ ${objectCountLabel(total, objMeta)}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) فَكِّكِ النَّاتِجَ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ: $${total} = dots + dots$ ، ثُمَّ قَارِنْ بَيْنَ $${total}$ وَ $${cmpVal}$: $${total}$ ..... $${cmpVal}$`,
					answer: `2) التَّفْكِيكُ: $${total} = ${tensPart} + ${onesPart}$ ، وَالمُقَارَنَةُ: $${total} ${total < cmpVal ? '<' : '>'} ${cmpVal}$.`,
					mark: '1'
				},
				buildIllustratedFigureBlock('pri_math_05_analog_clock_ticks', {
					maxHeight: 112,
					width: '58%',
					mode: 'image_only',
					title: 'تَذْكِيرٌ بَصَرِيٌّ: عَقْرَبَا السَّاعَاتِ وَالدَّقَائِقِ'
				}),
				{
					type: 'text',
					content: `3) وُضِعَتِ الأَغْرَاضُ فِي عُلْبَةٍ ${boxShape.desc} (${boxShape.solid})، وَ${verbFinished} ${actor.name} العَمَلَ عِنْدَ السَّاعَةِ $${clockChoice.time}$ (${clockChoice.period}).\n\nأ) مَا شَكْلُ كُلِّ وَجْهٍ مِنَ العُلْبَةِ؟ ............\n\nب) اكْتُبِ السَّاعَةَ بِالحُرُوفِ: ..............................`,
					answer: `3) شَكْلُ الوَجْهِ: ${boxShape.face}.\n\nالسَّاعَةُ بِالحُرُوفِ: ${clockChoice.words} ${clockChoice.period}.`,
					mark: '1.5'
				}
			];

			hints = [
				'كَلِمَةُ «أَضَافَ» وَ«المَجْمُوعُ» تَدُلَّانِ عَلَى اسْتِعْمَالِ عَمَلِيَّةِ الجَمْعِ ($+$).',
				`احْسُبِ الوَحَدَاتِ أَوَّلًا: $${a % 10} + ${b} = ${(a % 10) + b}$، ثُمَّ أَضِفِ العَشَرَاتِ.`,
				`النَّاتِجُ الكُلِّيُّ هُوَ $${total}$.`
			];
			solutionStepsAr = [
				`نَسْتَعْمِلُ عَمَلِيَّةَ الجَمْعِ: $${a} + ${b} = ${total}$.`,
				`تَفْكِيكُ $${total}$ هُوَ $${tensPart} + ${onesPart}$، وَشَكْلُ وَجْهِ العُلْبَةِ هُوَ ${boxShape.face}، وَالسَّاعَةُ هِيَ ${clockChoice.words}.`
			];
			finalAnswer = String(total);
		} else if (variant === 1) {
			const [total, given] =
				difficulty === 'easy'
					? pickNoBorrowSubPair(rng, 14, 19, 2, 6)
					: pickNoBorrowSubPair(rng, 23, 29, 2, 7);
			const rem = total - given;

			svg = svgCountingObjects({
				count: total,
				secondGroupCount: given,
				operatorLabel: '-',
				kind: objMeta.kind,
				perRow: 5
			});
			const svgPath = saveSvgAsset(`1ap_t2_int_${difficulty}_s${cleanSeed}`, svg);

			storyTypst = `${verbHad} ${actor.name} $${total}$ ${objectCountLabel(total, objMeta)}، فَ${verbGave} ${pronFriend} $${given}$ ${objectCountLabel(given, objMeta)}.`;
			storyKaTeX = `${verbHad} ${actor.name} $${total}$ ${objectCountLabel(total, objMeta)}، فَ${verbGave} ${pronFriend} $${given}$ ${objectCountLabel(given, objMeta)}.`;

			const wrongAdd = total + given <= 39 ? total + given : rem + 10;
			const built = buildUniqueMcqOptions(
				`$${rem}$`,
				[
					{
						text: `$${wrongAdd}$`,
						diagnosticFeedback:
							'عِنْدَمَا نُعْطِي أَوْ نُنْقِصُ مِنَ الكَمِّيَّةِ نَسْتَعْمِلُ الطَّرْحَ ($-$) وَلَيْسَ الجَمْعَ ($+$).'
					},
					{
						text: `$${rem + 1}$`,
						diagnosticFeedback: `أَعِدِ الطَّرْحَ: $${total} - ${given} = ${rem}$.`
					},
					{
						text: `$${Math.max(1, rem - 1)}$`,
						diagnosticFeedback: `احْسُبْ طَرْحَ الوَحَدَاتِ جَيِّدًا: $${total % 10} - ${given} = ${(total % 10) - given}$.`
					}
				],
				rng
			);

			const questionText = `${storyKaTeX} كَمْ ${objMeta.singularAcc} بَقِيَ ${pronAt}؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `${objMeta.captionAr} ${actor.name}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نَسْتَعْمِلُ الطَّرْحَ لِمَعْرِفَةِ البَاقِي: $${total} - ${given} = ${rem}$.`
			};

			content = [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: storyTypst
						},
						{
							type: 'image',
							src: svgPath,
							caption: objMeta.captionAr
						}
					]
				},
				{
					type: 'text',
					content: `1) كَمْ ${objMeta.singularAcc} بَقِيَ عِنْدَ ${actor.name}؟\n\nالعَمَلِيَّةُ: $dots - dots = dots$\n\nالجَوَابُ: بَقِيَ ${pronAt} ........ ${objMeta.singularAcc}.`,
					answer: `1) العَمَلِيَّةُ: $${total} - ${given} = ${rem}$\n\nالجَوَابُ: بَقِيَ ${pronAt} $${rem}$ ${objectCountLabel(rem, objMeta)}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احْصُرِ البَاقِي ($${rem}$) بَيْنَ عَدَدَيْنِ مُتَتَالِيَيْنِ:  $dots < ${rem} < dots$`,
					answer: `2) الحَصْرُ: $${rem - 1} < ${rem} < ${rem + 1}$`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) وُضِعَتِ البَقِيَّةُ فِي عُلْبَةٍ عَلَى شَكْلِ ${boxShape.solid} عِنْدَ السَّاعَةِ $${clockChoice.time}$ (${clockChoice.period}).\n\nأ) هَلْ تَتَدَحْرَجُ هَذِهِ العُلْبَةُ؟ ........\n\nب) اكْتُبِ التَّوْقِيتَ بِالحُرُوفِ: ..............................`,
					answer: `3) لَا، لَا تَتَدَحْرَجُ (لِأَنَّ وُجُوهَهَا مُسْتَوِيَةٌ).\n\nالتَّوْقِيتُ بِالحُرُوفِ: ${clockChoice.words} ${clockChoice.period}.`,
					mark: '1.5'
				}
			];

			hints = [
				'كَلِمَةُ «بَقِيَ» وَ«أَعْطَى» تَدُلَّانِ عَلَى عَمَلِيَّةِ الطَّرْحِ ($-$).',
				`اطْرَحِ الوَحَدَاتِ: $${total % 10} - ${given} = ${(total % 10) - given}$، وَأَبْقِ العَشَرَاتِ كَمَا هِيَ.`,
				`النَّاتِجُ الصَّحِيحُ هُوَ $${rem}$.`
			];
			solutionStepsAr = [
				`نَحْسُبُ البَاقِي بِالطَّرْحِ: $${total} - ${given} = ${rem}$.`,
				`الحَصْرُ هُوَ $${rem - 1} < ${rem} < ${rem + 1}$، وَ${boxShape.solid} لَا يَتَدَحْرَجُ، وَالسَّاعَةُ هِيَ ${clockChoice.words}.`
			];
			finalAnswer = String(rem);
		} else {
			// Two-step story: a + b = mid (no carry, a <= 19, b <= 7), then mid - c = rem (no borrow)
			const [a, b] = pickNoCarryAddPair(rng, 12, 19, 3, 7, 26);
			const mid = a + b;
			const maxC = Math.min(6, mid % 10);
			const c = maxC >= 2 ? rng.int(2, maxC) : 1;
			const rem = mid - c;

			svg = svgCountingObjects({
				count: a,
				secondGroupCount: b,
				operatorLabel: '+',
				kind: objMeta.kind,
				perRow: 5
			});
			const svgPath = saveSvgAsset(`1ap_t2_int_${difficulty}_s${cleanSeed}`, svg);

			const parentNote = actor.fem ? 'وَأُعْطِيَتْ' : 'وَأُعْطِيَ';
			storyTypst = `${verbHad} ${actor.name} $${a}$ ${objectCountLabel(a, objMeta)}، ${parentNote} $${b}$ ${objectCountLabel(b, objMeta)} أُخْرَى، ثُمَّ ${verbGave} ${pronFriend} $${c}$ مِنْهَا.`;
			storyKaTeX = `${verbHad} ${actor.name} $${a}$ ${objectCountLabel(a, objMeta)}، ${parentNote} $${b}$ ${objectCountLabel(b, objMeta)} أُخْرَى، ثُمَّ ${verbGave} ${pronFriend} $${c}$ مِنْهَا.`;

			const built = buildUniqueMcqOptions(
				`$${rem}$`,
				[
					{
						text: `$${mid}$`,
						diagnosticFeedback:
							'هَذَا هُوَ المَجْمُوعُ بَعْدَ الخَطْوَةِ الأُولَى فَقَطْ؛ لَا تَنْسَ طَرْحَ مَا أَعْطَاهُ فِي الخَطْوَةِ الثَّانِيَةِ!'
					},
					{
						text: `$${mid + c <= 39 ? mid + c : rem + 2}$`,
						diagnosticFeedback: 'فِي الخَطْوَةِ الثَّانِيَةِ نَسْتَعْمِلُ الطَّرْحَ ($-$) وَلَيْسَ الجَمْعَ!'
					},
					{
						text: `$${Math.max(1, rem - 1)}$`,
						diagnosticFeedback: `تَأَكَّدْ مِنَ الطَّرْحِ: $${mid} - ${c} = ${rem}$.`
					}
				],
				rng
			);

			const questionText = `${storyKaTeX} كَمْ ${objMeta.singularAcc} بَقِيَ ${pronAt} فِي النِّهَايَةِ؟`;
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `${objMeta.captionAr} ${actor.name}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `أَوَّلًا نَجْمَعُ: $${a} + ${b} = ${mid}$. ثَانِيًا نَطْرَحُ: $${mid} - ${c} = ${rem}$.`
			};

			content = [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: storyTypst
						},
						{
							type: 'image',
							src: svgPath,
							caption: objMeta.captionAr
						}
					]
				},
				{
					type: 'text',
					content: `1) كَمْ ${objMeta.singularAcc} صَارَ عِنْدَ ${actor.name} بَعْدَ الإِضَافَةِ؟\n\nالعَمَلِيَّةُ: $dots + dots = dots$\n\nالجَوَابُ: صَارَ ${pronAt} ........ ${objMeta.singularAcc}.`,
					answer: `1) العَمَلِيَّةُ: $${a} + ${b} = ${mid}$\n\nالجَوَابُ: صَارَ ${pronAt} $${mid}$ ${objectCountLabel(mid, objMeta)}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) كَمْ ${objMeta.singularAcc} بَقِيَ ${pronAt} بَعْدَ أَنْ ${verbGave} ${pronFriend} $${c}$؟\n\nالعَمَلِيَّةُ: $dots - dots = dots$\n\nالجَوَابُ: بَقِيَ ${pronAt} ........ ${objMeta.singularAcc}.`,
					answer: `2) العَمَلِيَّةُ: $${mid} - ${c} = ${rem}$\n\nالجَوَابُ: بَقِيَ ${pronAt} $${rem}$ ${objectCountLabel(rem, objMeta)}.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) رَتِّبِ الأَعْدَادَ التَّالِيَةَ تَصَاعُدِيًّا: $${mid}$ ، $${a}$ ، $${rem}$`,
					answer: `3) التَّرْتِيبُ التَّصَاعُدِيُّ: $${[mid, a, rem].sort((x, y) => x - y).join(' < ')}$`,
					mark: '1'
				}
			];

			hints = [
				'تُحَلُّ الوَضْعِيَّةُ عَلَى خَطْوَتَيْنِ: الجَمْعُ أَوَّلًا، ثُمَّ الطَّرْحُ.',
				`فِي الخَطْوَةِ الأُولَى نَحْسُبُ: $${a} + ${b} = ${mid}$.`,
				`فِي الخَطْوَةِ الثَّانِيَةِ نَطْرَحُ: $${mid} - ${c} = ${rem}$.`
			];
			solutionStepsAr = [
				`عَدَدُ المَجْمُوعِ بَعْدَ الإِضَافَةِ: $${a} + ${b} = ${mid}$.`,
				`العَدَدُ البَاقِي فِي النِّهَايَةِ: $${mid} - ${c} = ${rem}$.`,
				`التَّرْتِيبُ التَّصَاعُدِيُّ: $${[mid, a, rem].sort((x, y) => x - y).join(' < ')}$.`
			];
			finalAnswer = String(rem);
		}

		return {
			templateId: '1ap_t2_integration_story',
			seed: cleanSeed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: الأَعْدَادُ إِلَى 39 وَالأَشْكَالُ وَالسَّاعَةُ',
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'اقْرَأِ الوَضْعِيَّةَ جَيِّدًا وَتَأَمَّلِ الرَّسْمَ، ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_1AP_T2: ParameterizedTemplate[] = [
	templateNumbers10To19,
	templateNumbers20To39,
	templateAddSubDoublesHalves,
	templatePlaneShapesSolids,
	templateClockHourHalf,
	templateIntegrationStory
];
