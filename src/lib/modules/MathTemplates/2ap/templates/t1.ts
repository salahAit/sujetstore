import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import {
	saveSvgAsset,
	svgBaseTenBlocks,
	svgCoinsDinar,
	svgGridPoints,
	svgNumberLine,
	svgRectangle
} from '../../svg-helpers';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';

const ONES_WORDS = [
	'صفر',
	'واحد',
	'اثنان',
	'ثلاثة',
	'أربعة',
	'خمسة',
	'ستة',
	'سبعة',
	'ثمانية',
	'تسعة'
] as const;

const TEENS_WORDS = [
	'عشرة',
	'أحد عشر',
	'اثنا عشر',
	'ثلاثة عشر',
	'أربعة عشر',
	'خمسة عشر',
	'ستة عشر',
	'سبعة عشر',
	'ثمانية عشر',
	'تسعة عشر'
] as const;

const TENS_WORDS = [
	'',
	'',
	'عشرون',
	'ثلاثون',
	'أربعون',
	'خمسون',
	'ستون',
	'سبعون',
	'ثمانون',
	'تسعون'
] as const;

const CHILDREN = [
	{ name: 'أمين', fem: false },
	{ name: 'سارة', fem: true },
	{ name: 'ياسين', fem: false },
	{ name: 'مريم', fem: true },
	{ name: 'كريم', fem: false },
	{ name: 'إيناس', fem: true }
] as const;

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

function numberToArabicWords(n: number): string {
	const val = Math.max(0, Math.min(99, Math.trunc(n)));
	if (val < 10) return ONES_WORDS[val];
	if (val < 20) return TEENS_WORDS[val - 10];
	const t = Math.floor(val / 10);
	const u = val % 10;
	if (u === 0) return TENS_WORDS[t];
	return `${ONES_WORDS[u]} و${TENS_WORDS[t]}`;
}

function pickNoCarryPair(
	rng: SeededRng,
	minSum: number,
	maxSum: number,
	minPart = 11
): [number, number] {
	const pairs: [number, number][] = [];
	for (let a = minPart; a <= maxSum - minPart; a++) {
		const ta = Math.floor(a / 10);
		const ua = a % 10;
		if (ua === 0) continue;
		for (let b = minPart; b <= maxSum - a; b++) {
			const tb = Math.floor(b / 10);
			const ub = b % 10;
			if (ub === 0) continue;
			if (ua + ub <= 9 && ta + tb <= 9 && a + b >= minSum && a + b <= maxSum) {
				pairs.push([a, b]);
			}
		}
	}
	if (pairs.length === 0) return [12, 13];
	return rng.pick(pairs);
}

function pickNoBorrowPair(
	rng: SeededRng,
	minTotal: number,
	maxTotal: number,
	minSub = 11
): [number, number] {
	const pairs: [number, number][] = [];
	for (let total = minTotal; total <= maxTotal; total++) {
		const tt = Math.floor(total / 10);
		const ut = total % 10;
		for (let sub = minSub; sub <= total - 2; sub++) {
			const ts = Math.floor(sub / 10);
			const us = sub % 10;
			if (us === 0) continue;
			if (ut >= us && tt >= ts && total - sub >= 2) {
				pairs.push([total, sub]);
			}
		}
	}
	if (pairs.length === 0) return [38, 14];
	return rng.pick(pairs);
}

// ---------------------------------------------------------------------------
// 1. Reading, Writing & Decomposing Numbers 0..99
// ---------------------------------------------------------------------------
const templateNumbersDecomp: ParameterizedTemplate = {
	id: '2ap_t1_numbers_decomp',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_2ap_t1_numbers_to_99',
	titleAr: 'قراءة وكتابة وتفكيك الأعداد من 0 إلى 99',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 1);

		const minN = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 31 : 71;
		const maxN = difficulty === 'easy' ? 29 : difficulty === 'medium' ? 69 : 98;
		const candidates: number[] = [];
		for (let x = minN; x <= maxN; x++) {
			const t = Math.floor(x / 10);
			const u = x % 10;
			if (u !== 0 && t !== u) candidates.push(x);
		}
		const n = rng.pick(candidates);
		const tens = Math.floor(n / 10);
		const ones = n % 10;
		const wordsAr = numberToArabicWords(n);

		const svg = svgBaseTenBlocks(0, tens, ones);
		const svgPath = saveSvgAsset(`2ap_t1_b10_${difficulty}_s${cleanSeed}`, svg);

		const variant = rng.int(0, 2);
		let questionText = '';
		let sentence = '';
		let acceptedAnswers: string[] = [];
		let finalAnswer = '';
		let explanation = '';

		if (variant === 0) {
			questionText = 'عُدّ أعمدة العشرات ومربعات الوحدات في الصورة، ثم اكتب العدد بالأرقام:';
			sentence = `العدد "${wordsAr}" يكتب بالأرقام: ___`;
			acceptedAnswers = [String(n)];
			finalAnswer = String(n);
			explanation = `يوجد ${tens} عشرات (${tens * 10}) و ${ones} وحدات، إذن العدد هو ${n} (${wordsAr}).`;
		} else if (variant === 1) {
			const hideOnes = rng.int(0, 1) === 0;
			questionText = `تأمل تمثيل العدد $${n}$ في الصورة، ثم أكمل التفكيك النموذجي:`;
			if (hideOnes) {
				sentence = `${n} = ${tens * 10} + ___`;
				acceptedAnswers = [String(ones)];
				finalAnswer = String(ones);
			} else {
				sentence = `${n} = ___ + ${ones}`;
				acceptedAnswers = [String(tens * 10)];
				finalAnswer = String(tens * 10);
			}
			explanation = `العدد $${n}$ فيه $${tens}$ عشرات تساوي $${tens * 10}$، و $${ones}$ وحدات، إذن $${n} = ${tens * 10} + ${ones}$.`;
		} else {
			const askTens = rng.int(0, 1) === 0;
			questionText = `تأمل العدد $${n}$ وتمثيله في الصورة، ثم أجب:`;
			if (askTens) {
				sentence = `في العدد ${n}، رقم العشرات هو ___`;
				acceptedAnswers = [String(tens)];
				finalAnswer = String(tens);
			} else {
				sentence = `في العدد ${n}، رقم الوحدات هو ___`;
				acceptedAnswers = [String(ones)];
				finalAnswer = String(ones);
			}
			explanation = `في العدد $${n}$، الرقم الأيمن $${ones}$ هو رقم الوحدات، والرقم الأيسر $${tens}$ هو رقم العشرات.`;
		}

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اكتب العدد الممثل في الصورة بالأرقام ثم بالحروف.',
						answer: `العدد بالأرقام: $${n}$، وبالحروف: ${wordsAr}.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'تمثيل العشرات والوحدات'
					}
				]
			},
			{
				type: 'text',
				content: '2) أكمل الجدول التالي بتحديد رقم العشرات ورقم الوحدات والتفكيك النموذجي:',
				answer: `العشرات: $${tens}$، الوحدات: $${ones}$، والتفكيك النموذجي:\n$ ${n} = ${tens * 10} + ${ones} $`,
				mark: '1'
			},
			{
				type: 'table',
				headers: ['العدد', 'رقم العشرات', 'رقم الوحدات', 'التفكيك النموذجي'],
				cells: [],
				rows: [
					[
						{ content: `$${n}$`, bold: true },
						{ content: '.....', answer: `$${tens}$` },
						{ content: '.....', answer: `$${ones}$` },
						{ content: '$..... + .....$', answer: `$${tens * 10} + ${ones}$` }
					]
				],
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		return {
			templateId: '2ap_t1_numbers_decomp',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'قراءة وكتابة وتفكيك الأعداد من 0 إلى 99',
			quizQuestion: {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'تمثيل العشرات والوحدات',
				questionData: {
					sentence,
					acceptedAnswers
				},
				explanation
			},
			sujetExercise: {
				points: 2,
				instruction: 'تأمل تمثيل العشرات والوحدات، ثم أجب عن الأسئلة.',
				content
			},
			hints: [
				'كل عمود أخضر يمثل عشرة واحدة (10)، وكل مربع أصفر يمثل وحدة واحدة (1).',
				`عُدّ الأعمدة الخضراء أولاً لمعرفة العشرات، ثم المربعات الصغيرة للوحدات.`,
				`التفكيك النموذجي يكتب على شكل: عشرات + وحدات مثل $${tens * 10} + ${ones}$.`
			],
			solutionStepsAr: [
				`نعدّ أعمدة العشرات: نجد ${tens} أعمدة، أي ${tens * 10}.`,
				`نعدّ مربعات الوحدات: نجد ${ones} وحدات.`,
				`العدد هو ${n}، ويكتب بالحروف: ${wordsAr}، وتفكيكه النموذجي: ${n} = ${tens * 10} + ${ones}.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Comparing, Ordering & Bracketing Numbers < 100
// ---------------------------------------------------------------------------
const templateCompareOrder: ParameterizedTemplate = {
	id: '2ap_t1_compare_order',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_2ap_t1_numbers_0_29',
	titleAr: 'مقارنة وترتيب وحصر الأعداد الأصغر من 100',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 2);

		const poolSet = new Set<number>();
		if (difficulty === 'easy') {
			const bracketCand = rng.int(11, 28);
			poolSet.add(bracketCand % 10 === 0 ? bracketCand + 1 : bracketCand);
			while (poolSet.size < 4) {
				poolSet.add(rng.int(4, 29));
			}
		} else if (difficulty === 'medium') {
			const t = rng.int(2, 6);
			let u = rng.int(1, 6);
			if (u === t) u = t === 6 ? 5 : t + 1;
			poolSet.add(t * 10 + u);
			poolSet.add(u * 10 + t);
			while (poolSet.size < 4) {
				poolSet.add(rng.int(12, 69));
			}
		} else {
			const t = rng.int(3, 9);
			let u = rng.int(3, 9);
			if (u === t) u = t === 9 ? 8 : t + 1;
			const a = t * 10 + u;
			const b = u * 10 + t;
			poolSet.add(a);
			poolSet.add(b);
			const sameTens = t * 10 + (u === 9 ? 7 : u + 1);
			if (sameTens <= 99) poolSet.add(sameTens);
			while (poolSet.size < 4) {
				poolSet.add(rng.int(25, 98));
			}
		}

		const nums = rng.shuffle(Array.from(poolSet));
		const asc = [...nums].sort((x, y) => x - y);
		const desc = [...asc].reverse();

		const bracketTarget =
			nums.find((x) => x >= 11 && x <= 98 && x % 10 !== 0) ??
			(difficulty === 'easy' ? 14 : difficulty === 'medium' ? 46 : 78);
		const t0 = Math.floor(bracketTarget / 10) * 10;
		const t1 = t0 + 10;

		const variant = rng.int(0, 1);
		let questionText = '';
		let built: ReturnType<typeof buildUniqueMcqOptions>;
		let explanation = '';
		let finalAnswer = '';

		if (variant === 0) {
			const isAsc = rng.int(0, 1) === 0;
			const correctArr = isAsc ? asc : desc;
			const wrongArr = isAsc ? desc : asc;
			const sep = isAsc ? ' < ' : ' > ';
			const wrongSep = isAsc ? ' > ' : ' < ';

			const correctText = `$${correctArr.join(sep)}$`;
			const byUnits = [...nums].sort((x, y) =>
				isAsc ? (x % 10) - (y % 10) || x - y : (y % 10) - (x % 10) || y - x
			);
			if (byUnits.every((v, idx) => v === correctArr[idx])) {
				[byUnits[0], byUnits[1]] = [byUnits[1], byUnits[0]];
			}
			const swappedMid = [...correctArr];
			[swappedMid[1], swappedMid[2]] = [swappedMid[2], swappedMid[1]];

			questionText = `رتّب الأعداد التالية ترتيباً ${isAsc ? 'تصاعدياً (من الأصغر إلى الأكبر)' : 'تنازلياً (من الأكبر إلى الأصغر)'}: $${nums.join('$، $')}$`;
			built = buildUniqueMcqOptions(
				correctText,
				[
					{
						text: `$${wrongArr.join(wrongSep)}$`,
						diagnosticFeedback: `انتبه! الترتيب المطلوب هو ${isAsc ? 'التصاعدي (من الأصغر إلى الأكبر)' : 'التنازلي (من الأكبر إلى الأصغر)'}.`
					},
					{
						text: `$${byUnits.join(sep)}$`,
						diagnosticFeedback: 'عند مقارنة عددين من رقمين، نقارن رقم العشرات أولاً قبل رقم الوحدات.'
					},
					{
						text: `$${swappedMid.join(sep)}$`,
						diagnosticFeedback: 'تأكد من مقارنة كل عددين متجاورين بدقة.'
					}
				],
				rng
			);
			finalAnswer = correctArr.join(sep);
			explanation = `نرتب الأعداد بمقارنة العشرات أولاً ثم الوحدات: ${correctText}.`;
		} else {
			questionText = `ما هو الحصر الصحيح للعدد $${bracketTarget}$ بين عشرتين متتاليتين؟`;
			const correctText = `$${t0} < ${bracketTarget} < ${t1}$`;
			const prevTen = Math.max(0, t0 - 10);
			built = buildUniqueMcqOptions(
				correctText,
				[
					{
						text: `$${prevTen} < ${bracketTarget} < ${t0}$`,
						diagnosticFeedback: `العدد ${bracketTarget} رقم عشراته ${Math.floor(bracketTarget / 10)}، لذا فهو أكبر من ${t0} وليس أصغر منه.`
					},
					{
						text: `$${t1} < ${bracketTarget} < ${t1 + 10}$`,
						diagnosticFeedback: `العدد ${bracketTarget} أصغر من ${t1}، والعشرة التي تسبقه مباشرة هي ${t0}.`
					},
					{
						text: `$${bracketTarget - 1} < ${bracketTarget} < ${bracketTarget + 1}$`,
						diagnosticFeedback: `المطلوب حصر العدد بين عشرتين متتاليتين (تنتهيان بالصفر مثل ${t0} و ${t1}) وليس بين عددين متتاليين.`
					}
				],
				rng
			);
			finalAnswer = `${t0} < ${bracketTarget} < ${t1}`;
			explanation = `بما أن رقم عشرات ${bracketTarget} هو ${Math.floor(bracketTarget / 10)}، فإن العشرة السابقة هي ${t0} والعشرة الموالية هي ${t1}: ${correctText}.`;
		}

		const [p1a, p1b, p2a, p2b] = nums;
		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_math_02_colored_pencils_bundles', {
				maxHeight: 112,
				width: '58%'
			}),
			{
				type: 'text',
				content: `1) قارن باستعمال أحد الرمزين ($<$ أو $>$):  $${p1a}$ ..... $${p1b}$    و    $${p2a}$ ..... $${p2b}$`,
				answer: `1) المقارنة:\n$ ${p1a} ${p1a < p1b ? '<' : '>'} ${p1b} $\n$ ${p2a} ${p2a < p2b ? '<' : '>'} ${p2b} $`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `2) رتّب الأعداد التالية ترتيباً تصاعدياً:  $${nums[0]}$ ، $${nums[1]}$ ، $${nums[2]}$ ، $${nums[3]}$`,
				answer: `2) الترتيب التصاعدي:\n$ ${asc.join(' < ')} $`,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) احصر العدد $${bracketTarget}$ بين عشرتين متتاليتين:  ..... $<$ $${bracketTarget}$ $<$ .....`,
				answer: `3) الحصر:\n$ ${t0} < ${bracketTarget} < ${t1} $`,
				mark: '0.5'
			}
		];

		return {
			templateId: '2ap_t1_compare_order',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'مقارنة وترتيب وحصر الأعداد الأصغر من 100',
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 2,
				instruction: 'أنجز المقارنة والترتيب والحصر بدقة.',
				content
			},
			hints: [
				'لمقارنة عددين من رقمين، انظر إلى رقم العشرات أولاً.',
				'إذا تساوى رقما العشرات، قارن بين رقمي الوحدات.',
				`لحصر عدد بين عشرتين متتاليتين، خذ عشرته الحالية (${t0}) والعشرة التي تليها (${t1}).`
			],
			solutionStepsAr: [
				`نقارن العشرات أولاً: ${p1a} ${p1a < p1b ? '<' : '>'} ${p1b} و ${p2a} ${p2a < p2b ? '<' : '>'} ${p2b}.`,
				`الترتيب التصاعدي من الأصغر إلى الأكبر هو: ${asc.join(' < ')}.`,
				`حصر العدد ${bracketTarget} بين عشرتين متتاليتين هو: ${t0} < ${bracketTarget} < ${t1}.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Addition Without Carry & Doubles/Halves < 100
// ---------------------------------------------------------------------------
const templateAddDoubleHalf: ParameterizedTemplate = {
	id: '2ap_t1_add_double_half',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'numeric',
	curriculumLessonId: 'lesson_2ap_t1_addition_no_carry_double_half',
	titleAr: 'الجمع دون احتفاظ والضعف والنصف (الأعداد إلى 99)',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 3);

		const [a, b] =
			difficulty === 'easy'
				? pickNoCarryPair(rng, 14, 39, 3)
				: difficulty === 'medium'
					? pickNoCarryPair(rng, 32, 79, 11)
					: pickNoCarryPair(rng, 61, 99, 12);
		const sum = a + b;

		const doublePool =
			difficulty === 'easy'
				? [2, 3, 4, 11, 12, 13, 14]
				: difficulty === 'medium'
					? [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34]
					: [15, 25, 35, 45, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];
		const halfPool =
			difficulty === 'easy'
				? [4, 6, 8, 10, 12, 14, 16, 18, 20]
				: difficulty === 'medium'
					? [22, 24, 26, 28, 42, 44, 46, 48, 62, 64, 66, 68]
					: [30, 32, 34, 36, 38, 50, 52, 54, 56, 58, 70, 72, 74, 76, 82, 84, 86, 88, 92, 94, 96, 98];

		const dBase = rng.pick(doublePool);
		const dRes = dBase * 2;
		const hBase = rng.pick(halfPool);
		const hRes = hBase / 2;

		const variant = rng.int(0, 2);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';

		if (variant === 0) {
			const tSum = Math.floor(sum / 10);
			const uSum = sum % 10;
			const swapped = tSum !== uSum ? uSum * 10 + tSum : sum + 10;
			const offTen = sum + 10 <= 99 ? sum + 10 : sum - 10;
			const forgotTens = a + (b % 10);

			const built = buildUniqueMcqOptions(
				`$${sum}$`,
				[
					{
						text: `$${swapped}$`,
						diagnosticFeedback: 'انتبه لترتيب المراتب: ناتج الوحدات يكتب على اليمين وناتج العشرات على اليسار.'
					},
					{
						text: `$${offTen}$`,
						diagnosticFeedback: 'تحقق من جمع رقمي العشرات بدقة.'
					},
					{
						text: `$${forgotTens}$`,
						diagnosticFeedback: `لا تنسَ جمع عشرات العدد ${b} أيضاً وليس وحداته فقط.`
					}
				],
				rng
			);
			finalAnswer = String(sum);
			quizQuestion = {
				type: 'mcq',
				questionText: `احسب المجموع التالي (دون احتفاظ): $${a} + ${b} = ?$`,
				questionTextAr: `احسب المجموع التالي (دون احتفاظ): $${a} + ${b} = ?$`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نجمع الوحدات ($${a % 10} + ${b % 10} = ${uSum}$) ثم العشرات ($${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${tSum}$)، فنجد $${sum}$.`
			};
		} else if (variant === 1) {
			const isTrue = rng.int(0, 1) === 1;
			const askDouble = rng.int(0, 1) === 0;
			if (askDouble) {
				const claimed = isTrue ? dRes : dBase + 2 !== dRes ? dBase + 2 : dRes + 10;
				finalAnswer = isTrue ? 'صحيح' : 'خطأ';
				quizQuestion = {
					type: 'true_false',
					questionText: `أجب بصحيح أو خطأ: ضعف العدد $${dBase}$ هو $${claimed}$.`,
					questionTextAr: `أجب بصحيح أو خطأ: ضعف العدد $${dBase}$ هو $${claimed}$.`,
					questionData: {
						correctAnswer: isTrue
					},
					explanation: `ضعف العدد يعني جمعه مع نفسه: $${dBase} + ${dBase} = ${dRes}$.`
				};
			} else {
				const claimed = isTrue ? hRes : hRes + 10 <= 99 ? hRes + 10 : hRes - 1;
				finalAnswer = isTrue ? 'صحيح' : 'خطأ';
				quizQuestion = {
					type: 'true_false',
					questionText: `أجب بصحيح أو خطأ: نصف العدد $${hBase}$ هو $${claimed}$.`,
					questionTextAr: `أجب بصحيح أو خطأ: نصف العدد $${hBase}$ هو $${claimed}$.`,
					questionData: {
						correctAnswer: isTrue
					},
					explanation: `نصف $${hBase}$ هو $${hRes}$ لأن $${hRes} + ${hRes} = ${hBase}$.`
				};
			}
		} else {
			const askDouble = rng.int(0, 1) === 0;
			if (askDouble) {
				const halfOfD = dBase % 2 === 0 ? dBase / 2 : dBase + 2;
				const built = buildUniqueMcqOptions(
					`$${dRes}$`,
					[
						{
							text: `$${dBase + 2}$`,
							diagnosticFeedback: `ضعف العدد يعني جمعه مع نفسه ($${dBase} + ${dBase}$) وليس إضافة 2.`
						},
						{
							text: `$${halfOfD}$`,
							diagnosticFeedback: 'انتبه! المطلوب هو ضعف العدد (جمعه مع نفسه) وليس نصفه.'
						},
						{
							text: `$${dRes + 10 <= 99 ? dRes + 10 : dRes - 10}$`,
							diagnosticFeedback: 'تأكد من جمع رقمي العشرات جيداً.'
						}
					],
					rng
				);
				finalAnswer = String(dRes);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما هو ضعف العدد $${dBase}$؟`,
					questionTextAr: `ما هو ضعف العدد $${dBase}$؟`,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `ضعف العدد $${dBase}$ هو $${dBase} + ${dBase} = ${dRes}$.`
				};
			} else {
				const doubleOfH = hBase * 2 <= 99 ? hBase * 2 : hBase - 2;
				const built = buildUniqueMcqOptions(
					`$${hRes}$`,
					[
						{
							text: `$${doubleOfH}$`,
							diagnosticFeedback: 'انتبه! المطلوب هو نصف العدد وليس ضعفه.'
						},
						{
							text: `$${hBase - 10}$`,
							diagnosticFeedback: 'النصف يعني تقسيم العدد إلى جزأين متساويين وليس طرح 10.'
						},
						{
							text: `$${hRes + 10 <= 99 ? hRes + 10 : hRes + 1}$`,
							diagnosticFeedback: `تحقق: يجب أن يكون النصف + النصف = ${hBase}.`
						}
					],
					rng
				);
				finalAnswer = String(hRes);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما هو نصف العدد $${hBase}$؟`,
					questionTextAr: `ما هو نصف العدد $${hBase}$؟`,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `نصف $${hBase}$ هو $${hRes}$ لأن $${hRes} + ${hRes} = ${hBase}$.`
				};
			}
		}

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_math_03_base_ten_blocks', {
				maxHeight: 112,
				width: '58%'
			}),
			{
				type: 'text',
				content: `1) احسب المجموع (دون احتفاظ):  $${a} + ${b} =$ .....`,
				answer: `1) المجموع:\n$ ${a} + ${b} = ${sum} $`,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) أكمل: ضعف العدد $${dBase}$ هو ..... ، ونصف العدد $${hBase}$ هو .....`,
				answer: `2) ضعف العدد $${dBase}$ هو $${dRes}$، ونصف العدد $${hBase}$ هو $${hRes}$.\n$ ${dBase} + ${dBase} = ${dRes} $`,
				mark: '1'
			}
		];

		return {
			templateId: '2ap_t1_add_double_half',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'numeric',
			titleAr: 'الجمع دون احتفاظ والضعف والنصف (الأعداد إلى 99)',
			quizQuestion,
			sujetExercise: {
				points: 2,
				instruction: 'احسب المجموع وأكمل بالضعف والنصف:',
				content
			},
			hints: [
				'في الجمع دون احتفاظ، اجمع الوحدات مع الوحدات، ثم العشرات مع العشرات.',
				`ضعف عدد هو جمعه مع نفسه: مثل $${dBase} + ${dBase}$.`,
				`نصف عدد هو إيجاد العدد الذي إذا جمعته مع نفسه يعطيك العدد الأصلي.`
			],
			solutionStepsAr: [
				`حساب المجموع: الوحدات ${a % 10} + ${b % 10} = ${sum % 10}، والعشرات ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(sum / 10)}، إذن ${a} + ${b} = ${sum}.`,
				`ضعف العدد ${dBase} هو ${dBase} + ${dBase} = ${dRes}.`,
				`نصف العدد ${hBase} هو ${hRes} لأن ${hRes} + ${hRes} = ${hBase}.`
			],
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Grid Coordinates & Locating Items on المرصوفة
// ---------------------------------------------------------------------------
const templateGridLocate: ParameterizedTemplate = {
	id: '2ap_t1_grid_locate',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'geometry',
	curriculumLessonId: 'lesson_2ap_t1_space_table_grid',
	titleAr: 'تعيين خانات ومواقع على المرصوفة',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 4);

		const cols = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
		const rows = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 3 : 4;
		const colLabels = ['A', 'B', 'C', 'D', 'E'].slice(0, cols);
		const rowLabels = ['1', '2', '3', '4'].slice(0, rows);

		const allCells: { col: number; row: number }[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				allCells.push({ col: c, row: r });
			}
		}

		const picked = rng.pickDistinct(allCells, 3);
		const markers = [
			{ ...picked[0], label: 'K', color: '#dc2626', bg: '#fee2e2' },
			{ ...picked[1], label: 'M', color: '#2563eb', bg: '#dbeafe' },
			{ ...picked[2], label: 'N', color: '#15803d', bg: '#dcfce7' }
		];

		const svg = svgGridPoints({
			cols,
			rows,
			colLabels,
			rowLabels,
			shadedCells: markers.map((m) => ({ col: m.col, row: m.row, color: m.bg })),
			points: markers.map((m) => ({
				col: m.col + 0.5,
				row: m.row + 0.5,
				label: m.label,
				color: m.color
			}))
		});
		const svgPath = saveSvgAsset(`2ap_t1_grid_${difficulty}_s${cleanSeed}`, svg);

		const target = markers[0];
		const second = markers[1];
		const third = markers[2];

		const targetColLbl = colLabels[target.col];
		const targetRowLbl = rowLabels[target.row];
		const correctCoord = `$(${targetColLbl}, ${targetRowLbl})$`;

		const wrongOrder = `$(${targetRowLbl}, ${targetColLbl})$`;
		const wrongCol = `$(${colLabels[(target.col + 1) % cols]}, ${targetRowLbl})$`;
		const wrongRow = `$(${targetColLbl}, ${rowLabels[(target.row + 1) % rows]})$`;

		const built = buildUniqueMcqOptions(
			correctCoord,
			[
				{
					text: wrongOrder,
					diagnosticFeedback: 'نكتب حرف العمود من الأعلى أولاً، ثم رقم السطر من اليسار.'
				},
				{
					text: wrongCol,
					diagnosticFeedback: `تحقق من حرف العمود الموجود مباشرة فوق الخانة التي فيها النقطة ${target.label}.`
				},
				{
					text: wrongRow,
					diagnosticFeedback: `تحقق من رقم السطر المقابل للخانة على الجهة اليسرى.`
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) عيّن إحداثيي كل من الرمزين $${target.label}$ و $${second.label}$ على المرصوفة.`,
						answer: `الرمز $${target.label}$ في الخانة $(${targetColLbl}, ${targetRowLbl})$، والرمز $${second.label}$ في الخانة $(${colLabels[second.col]}, ${rowLabels[second.row]})$.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'المرصوفة'
					}
				]
			},
			{
				type: 'text',
				content: `2) ما هو الرمز الموجود في الخانة $(${colLabels[third.col]}, ${rowLabels[third.row]})$؟`,
				answer: `الرمز الموجود في الخانة $(${colLabels[third.col]}, ${rowLabels[third.row]})$ هو $${third.label}$.`,
				mark: '0.5'
			}
		];

		return {
			templateId: '2ap_t1_grid_locate',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: 'تعيين خانات ومواقع على المرصوفة',
			quizQuestion: {
				type: 'mcq',
				questionText: `تأمل المرصوفة في الصورة. ما هي إحداثيات الخانة التي تحتوي على الرمز $${target.label}$؟`,
				questionTextAr: `تأمل المرصوفة في الصورة. ما هي إحداثيات الخانة التي تحتوي على الرمز $${target.label}$؟`,
				imageUrl: svgPath,
				imageCaption: 'المرصوفة',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نقرأ العمود فوق الخانة (${targetColLbl}) ثم السطر على اليسار (${targetRowLbl})، فنجد (${targetColLbl}, ${targetRowLbl}).`
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ المرصوفة المقابلة ثم أجب:',
				content
			},
			hints: [
				'لتعيين موقع خانة على المرصوفة، نبدأ أولاً بقراءة حرف العمود من الأعلى.',
				'بعد حرف العمود، نقرأ رقم السطر من الجهة اليسرى.',
				`اتبع عمود الرمز ${target.label} إلى الأعلى لتجد ${targetColLbl}، ثم سطره إلى اليسار لتجد ${targetRowLbl}.`
			],
			solutionStepsAr: [
				`الرمز ${target.label} يقع في العمود ${targetColLbl} والسطر ${targetRowLbl}، إذن خانته (${targetColLbl}, ${targetRowLbl}).`,
				`الرمز ${second.label} يقع في الخانة (${colLabels[second.col]}, ${rowLabels[second.row]}).`,
				`في الخانة (${colLabels[third.col]}, ${rowLabels[third.row]}) نجد الرمز ${third.label}.`
			],
			finalAnswer: `(${targetColLbl}, ${targetRowLbl})`
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Alignment, Segment Length Counting & Polygons
// ---------------------------------------------------------------------------
const templateAlignmentLengthPoly: ParameterizedTemplate = {
	id: '2ap_t1_alignment_length_poly',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'geometry',
	curriculumLessonId: 'lesson_2ap_t1_alignment_lengths_polygons',
	titleAr: 'الاستقامية وقياس الأطوال بالسنتيمتر والمضلعات',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 5);
		const variant = rng.int(0, 2);

		if (variant === 0) {
			// Ruler / Number line segment length in cm
			const maxVal = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 12 : 15;
			const start = difficulty === 'easy' ? 0 : difficulty === 'medium' ? rng.int(0, 2) : rng.int(2, 4);
			const end = rng.int(start + 3, maxVal - 1);
			const len = end - start;

			const svg = svgNumberLine({
				min: 0,
				max: maxVal,
				step: 1,
				marks: [
					{ value: start, label: 'A', color: '#2563eb' },
					{ value: end, label: 'B', color: '#dc2626' }
				]
			});
			const svgPath = saveSvgAsset(`2ap_t1_ruler_${difficulty}_s${cleanSeed}`, svg);

			const built = buildUniqueMcqOptions(
				`$${len}\\text{ cm}$`,
				[
					start > 0
						? {
								text: `$${end}\\text{ cm}$`,
								diagnosticFeedback: `انتبه! النقطة A عند التدريجة ${start} وليس عند 0، لذا نحسب: ${end} - ${start} = ${len}.`
							}
						: {
								text: `$${len + 2}\\text{ cm}$`,
								diagnosticFeedback: 'عُدّ المسافات بين النقطة A والنقطة B فقط دون الزيادة.'
							},
					{
						text: `$${len + 1}\\text{ cm}$`,
						diagnosticFeedback: 'عُدّ الفسح (المسافات) بين التدريجات وليس عدد النقاط المرسومة.'
					},
					{
						text: `$${Math.max(1, len - 1)}\\text{ cm}$`,
						diagnosticFeedback: 'أعد عدّ السنتيمترات من التدريجة A إلى التدريجة B بدقة.'
					}
				],
				rng
			);

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) اقرأ على الشريط المدرج بالسنتيمتر: عند أي تدريجة تقع النقطة $A$؟ وعند أي تدريجة تقع النقطة $B$؟',
							answer: `تقع $A$ عند $${start}$، وتقع $B$ عند $${end}$.`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'شريط مدرج بالسنتيمتر (cm)'
						}
					]
				},
				{
					type: 'text',
					content: '2) استنتج طول القطعة المستقيمة $[A B]$ بالسنتيمتر:',
					answer: `طول القطعة $[A B]$ هو $${len}$ cm${start > 0 ? `\n$ ${end} - ${start} = ${len} $` : ''}`,
					mark: '1'
				}
			];

			return {
				templateId: '2ap_t1_alignment_length_poly',
				seed: cleanSeed,
				grade: '2ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: 'الاستقامية وقياس الأطوال بالسنتيمتر والمضلعات',
				quizQuestion: {
					type: 'mcq',
					questionText: 'تأمل الشريط المدرج بالسنتيمتر (cm). ما هو طول القطعة المستقيمة $[AB]$؟',
					questionTextAr: 'تأمل الشريط المدرج بالسنتيمتر (cm). ما هو طول القطعة المستقيمة $[AB]$؟',
					imageUrl: svgPath,
					imageCaption: 'شريط مدرج بالسنتيمتر',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation:
						start === 0
							? `القطعة تبدأ من 0 وتنتهي عند ${end}، إذن طولها ${len} cm.`
							: `نحسب عدد الفسح من ${start} إلى ${end}: ${end} - ${start} = ${len} cm.`
				},
				sujetExercise: {
					points: 1.5,
					instruction: 'لاحظ الشريط المدرج بالسنتيمتر ثم أجب:',
					content
				},
				hints: [
					'انظر إلى التدريجة التي تبدأ عندها النقطة A والتدريجة التي تنتهي عندها النقطة B.',
					'نحسب طول القطعة بعدّ الفسح (خطوات 1 cm) بين A و B.',
					start > 0 ? `بما أن A تقع عند ${start}، اطرح ${start} من ${end}.` : `تبدأ القطعة من الصفر وتصل إلى ${end}.`
				],
				solutionStepsAr: [
					`النقطة A عند التدريجة ${start}، والنقطة B عند التدريجة ${end}.`,
					start === 0 ? `الطول من 0 إلى ${end} يساوي ${len} cm.` : `الطول هو ${end} - ${start} = ${len} cm.`
				],
				finalAnswer: `${len} cm`
			};
		}

		if (variant === 1) {
			// Rectangle polygon sides & properties
			const pairs: [number, number][] = [];
			const lMin = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 11;
			const lMax = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 12 : 16;
			const wMin = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
			const wMax = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 7;
			for (let l = lMin; l <= lMax; l++) {
				for (let w = wMin; w <= Math.min(wMax, l - 2); w++) {
					if ((l % 10) + (w % 10) <= 9) pairs.push([l, w]);
				}
			}
			const [L, W] = rng.pick(pairs);

			const svg = svgRectangle({
				lengthLabel: `${L} cm`,
				widthLabel: `${W} cm`,
				vertices: ['A', 'B', 'C', 'D']
			});
			const svgPath = saveSvgAsset(`2ap_t1_rect_${difficulty}_s${cleanSeed}`, svg);

			let questionText = '';
			let correctKatex = '';
			let distractors: { text: string; diagnosticFeedback: string }[] = [];
			let finalAnswer = '';
			let explanation = '';

			if (difficulty === 'hard') {
				const adjSum = L + W;
				questionText = `تأمل المستطيل $ABCD$ في الصورة. احسب مجموع طولي الضلعين $[AB]$ و $[BC]$:`;
				correctKatex = `$${adjSum}\\text{ cm}$`;
				distractors = [
					{
						text: `$${L}\\text{ cm}$`,
						diagnosticFeedback: `هذا طول الضلع [AB] فقط، أضف إليه طول الضلع [BC] (${W} cm).`
					},
					{
						text: `$${W}\\text{ cm}$`,
						diagnosticFeedback: `هذا طول الضلع [BC] فقط، أضف إليه طول الضلع [AB] (${L} cm).`
					},
					{
						text: `$${adjSum + 2}\\text{ cm}$`,
						diagnosticFeedback: `تحقق من جمع الوحدات والعشرات: ${L} + ${W} = ${adjSum}.`
					}
				];
				finalAnswer = `${adjSum} cm`;
				explanation = `في المستطيل، طول الضلع المقابل لـ [CD] هو [AB] = ${L} cm، ولدينا [BC] = ${W} cm، إذن المجموع: ${L} + ${W} = ${adjSum} cm.`;
			} else {
				const askLength = rng.int(0, 1) === 0;
				if (askLength) {
					questionText = `تأمل المستطيل $ABCD$ في الصورة. طول الضلع $[CD]$ هو $${L}\\text{ cm}$، فما هو طول الضلع المقابل له $[AB]$؟`;
					correctKatex = `$${L}\\text{ cm}$`;
					distractors = [
						{
							text: `$${W}\\text{ cm}$`,
							diagnosticFeedback: 'هذا طول الضلع الجانبي [BC] وليس الضلع المقابل لـ [CD].'
						},
						{
							text: `$${L + W}\\text{ cm}$`,
							diagnosticFeedback: 'المطلوب طول الضلع [AB] فقط وليس مجموع ضلعين.'
						},
						{
							text: `$${L - 1}\\text{ cm}$`,
							diagnosticFeedback: 'في المستطيل، كل ضلعين متقابلين لهما نفس الطول تماماً.'
						}
					];
					finalAnswer = `${L} cm`;
					explanation = `في المستطيل، كل ضلعين متقابلين متقايسان، لذا طول [AB] يساوي طول [CD] أي ${L} cm.`;
				} else {
					questionText = `تأمل المستطيل $ABCD$ في الصورة. طول الضلع $[BC]$ هو $${W}\\text{ cm}$، فما هو طول الضلع المقابل له $[AD]$؟`;
					correctKatex = `$${W}\\text{ cm}$`;
					distractors = [
						{
							text: `$${L}\\text{ cm}$`,
							diagnosticFeedback: 'هذا طول الضلع السفلي [CD] وليس الضلع المقابل لـ [BC].'
						},
						{
							text: `$${L + W}\\text{ cm}$`,
							diagnosticFeedback: 'المطلوب طول الضلع [AD] فقط.'
						},
						{
							text: `$${W + 1}\\text{ cm}$`,
							diagnosticFeedback: 'في المستطيل، الضلعان المتقابلان [AD] و [BC] متساويان في الطول.'
						}
					];
					finalAnswer = `${W} cm`;
					explanation = `في المستطيل، كل ضلعين متقابلين لهما نفس الطول، لذا طول [AD] يساوي طول [BC] أي ${W} cm.`;
				}
			}

			const built = buildUniqueMcqOptions(correctKatex, distractors, rng);

			const content: ContentBlock[] = [
				{
					type: 'columns',
					widths: ['1.2fr', '1fr'],
					children: [
						{
							type: 'text',
							content: '1) ما اسم هذا المضلع؟ وكم عدد أضلاعه ورؤوسه؟',
							answer: 'هذا الشكل مستطيل، له $4$ أضلاع و $4$ رؤوس.',
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'الشكل الهندسي ABCD'
						}
					]
				},
				{
					type: 'text',
					content: '2) استنتج طول الضلع $[A B]$ وطول الضلع $[A D]$:',
					answer: `طول $[A B]$ هو $${L}$ cm، وطول $[A D]$ هو $${W}$ cm.`,
					mark: '1'
				}
			];

			return {
				templateId: '2ap_t1_alignment_length_poly',
				seed: cleanSeed,
				grade: '2ap',
				trimesterId: 't1',
				difficulty,
				domain: 'geometry',
				titleAr: 'الاستقامية وقياس الأطوال بالسنتيمتر والمضلعات',
				quizQuestion: {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: 'المستطيل ABCD',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation
				},
				sujetExercise: {
					points: 1.5,
					instruction: 'تأمل الشكل الهندسي المقابل ثم أجب:',
					content
				},
				hints: [
					'المستطيل مضلع رباعي له 4 أضلاع و 4 رؤوس.',
					'في المستطيل، كل ضلعين متقابلين لهما نفس الطول.',
					`الضلع $[AB]$ يقابل الضلع $[CD]$ ($${L}$ cm)، والضلع $[AD]$ يقابل الضلع $[BC]$ ($${W}$ cm).`
				],
				solutionStepsAr: [
					'الشكل رباعي فيه زوايا قائمة وكل ضلعين متقابلين متساويان: إنه مستطيل (4 أضلاع و 4 رؤوس).',
					`طول الضلع المقابل لـ [CD] هو [AB] = ${L} cm.`,
					`طول الضلع المقابل لـ [BC] هو [AD] = ${W} cm.`
				],
				finalAnswer
			};
		}

		// Variant 2: Point Alignment (استقامية نقط) on grid intersections
		const cols = 5;
		const rows = 4;
		const alignedRow = rng.int(1, 3);
		const alignedCols = rng.pickDistinct([1, 2, 3, 4], 3).sort((x, y) => x - y);
		const offRowOptions = [1, 2, 3].filter((r) => r !== alignedRow);
		const offRow = rng.pick(offRowOptions);
		const offCol = rng.int(1, 4);

		const labels = rng.shuffle(['M', 'N', 'P', 'R']);
		const alignedLabels = [labels[0], labels[1], labels[2]];
		const outlierLabel = labels[3];

		const points = [
			{ col: alignedCols[0], row: alignedRow, label: alignedLabels[0], color: '#1d4ed8' },
			{ col: alignedCols[1], row: alignedRow, label: alignedLabels[1], color: '#1d4ed8' },
			{ col: alignedCols[2], row: alignedRow, label: alignedLabels[2], color: '#1d4ed8' },
			{ col: offCol, row: offRow, label: outlierLabel, color: '#1d4ed8' }
		];

		const svg = svgGridPoints({
			cols,
			rows,
			points
		});
		const svgPath = saveSvgAsset(`2ap_t1_align_${difficulty}_s${cleanSeed}`, svg);

		const built = buildUniqueMcqOptions(
			`النقطة $${outlierLabel}$`,
			alignedLabels.map((lbl) => ({
				text: `النقطة $${lbl}$`,
				diagnosticFeedback: `النقطة ${lbl} تقع على نفس الخط المستقيم مع نقطتين أخريين.`
			})),
			rng
		);

		const alignedDisplay = alignedLabels.join(' و ');
		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: '1) اذكر النقط الثلاث التي تقع على استقامية واحدة.',
						answer: `النقط التي على استقامية واحدة هي: ${alignedLabels.map((l) => `$${l}$`).join(' ، ')}.`,
						mark: '1'
					},
					{
						type: 'image',
						src: svgPath,
						caption: 'استقامية النقط على المرصوفة'
					}
				]
			},
			{
				type: 'text',
				content: '2) ما هي النقطة التي ليست على استقامية واحدة معها؟',
				answer: `النقطة التي ليست على استقامية واحدة هي: $${outlierLabel}$.`,
				mark: '0.5'
			}
		];

		return {
			templateId: '2ap_t1_alignment_length_poly',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geometry',
			titleAr: 'الاستقامية وقياس الأطوال بالسنتيمتر والمضلعات',
			quizQuestion: {
				type: 'mcq',
				questionText: 'تأمل النقط الأربع على المرصوفة. ثلاث نقط تقع على استقامية واحدة، أيّ نقطة ليست على استقامية معها؟',
				questionTextAr: 'تأمل النقط الأربع على المرصوفة. ثلاث نقط تقع على استقامية واحدة، أيّ نقطة ليست على استقامية معها؟',
				imageUrl: svgPath,
				imageCaption: 'استقامية نقط على مرصوفة',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `النقط ${alignedDisplay} تقع على نفس الخط المستقيم، أما النقطة ${outlierLabel} فهي خارجه.`
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ النقط المرسومة على المرصوفة ثم أجب:',
				content
			},
			hints: [
				'تكون ثلاث نقط على استقامية واحدة إذا أمكن وصلها بخط مستقيم واحد بالمسطرة.',
				'انظر إلى الخطوط الأفقية في المرصوفة وابحث عن الخط الذي يمر بثلاث نقط.',
				`تقع النقط ${alignedDisplay} على سطر واحد، بينما تبتعد نقطة واحدة عنه.`
			],
			solutionStepsAr: [
				`نلاحظ على المرصوفة أن النقط ${alignedDisplay} تقع كلها على نفس الخط المستقيم.`,
				`النقطة ${outlierLabel} لا تقع على ذلك الخط، إذن هي ليست على استقامية معها.`
			],
			finalAnswer: outlierLabel
		};
	}
};

// ---------------------------------------------------------------------------
// 6. Integration Word Problem: Daily-Life Addition / Subtraction (<= 99)
// ---------------------------------------------------------------------------
function coinsForAmount(amount: number): number[] {
	const coins: number[] = [];
	let rem = amount;
	for (const d of [50, 20, 10, 5, 2, 1]) {
		while (rem >= d) {
			coins.push(d);
			rem -= d;
		}
	}
	return coins;
}

const templateIntegrationWord: ParameterizedTemplate = {
	id: '2ap_t1_integration_word',
	grade: '2ap',
	trimesterId: 't1',
	domain: 'integration',
	curriculumLessonId: 'lesson_2ap_t1_integration',
	titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
	defaultPoints: 3,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 6);
		const person = rng.pick(CHILDREN);
		const child = person.name;
		const verbHas = person.fem ? 'تملك' : 'يملك';
		const verbBought = person.fem ? 'اشترت' : 'اشترى';
		const verbPaid = person.fem ? 'دفعت' : 'دفع';
		const pronWith = person.fem ? 'معها' : 'معه';
		const pronAt = person.fem ? 'عندها' : 'عنده';
		const pronParent = person.fem ? 'والدها' : 'والده';
		const pronSibling = person.fem ? 'أختها' : 'أخيه';
		const verbParentGave = person.fem ? 'فأعطاها' : 'فأعطاه';
		const verbGifted = person.fem ? 'أهدت' : 'أهدى';
		const pronGiftSibling = person.fem ? 'لأختها' : 'لأخيه';
		const variant = rng.int(0, 2);

		if (variant === 0) {
			// Algerian DA school supplies & coins
			const itemsPool: [string, string][] = [
				['كراساً', 'قلماً'],
				['مقلمةً', 'ممحاةً'],
				['دفتر رسم', 'مسطرةً']
			];
			const [item1, item2] = rng.pick(itemsPool);

			if (difficulty === 'easy') {
				const [p1, p2] = pickNoCarryPair(rng, 14, 38, 4);
				const total = p1 + p2;
				const coins = coinsForAmount(p1);
				const svgPath = saveSvgAsset(
					`2ap_t1_coins_${difficulty}_s${cleanSeed}`,
					svgCoinsDinar(coins)
				);

				const problemText = `${verbBought} ${child} من المكتبة ${item1} ثمنه $${p1}$ DA (كما توضحه القطع النقدية)، و${item2} ثمنه $${p2}$ DA.`;
				const questionText = `${verbBought} ${child} من المكتبة ${item1} ثمنه $${p1}$ DA، و${item2} ثمنه $${p2}$ DA. ما هو المبلغ الكلي الذي ${verbPaid}ه ${child}؟`;

				return {
					templateId: '2ap_t1_integration_word',
					seed: cleanSeed,
					grade: '2ap',
					trimesterId: 't1',
					difficulty,
					domain: 'integration',
					titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
					quizQuestion: {
						type: 'calculated',
						questionText,
						questionTextAr: questionText,
						questionData: {
							answer: total,
							displayTemplate: '? DA',
							variables: [],
							tolerance: 0
						},
						explanation: `نجمع ثمني المشتريين دون احتفاظ: $${p1} + ${p2} = ${total}$ DA.`
					},
					sujetExercise: {
						customTitle: 'الوضعية الإدماجية',
						points: 3,
						instruction: 'اقرأ الوضعية جيداً ثم أجب عن الأسئلة:',
						content: [
							{
								type: 'columns',
								widths: ['1.3fr', '1fr'],
								children: [
									{
										type: 'text',
										content: problemText
									},
									{
										type: 'image',
										src: svgPath,
										caption: `ثمن ${item1} بالدينار الجزائري`
									}
								]
							},
							{
								type: 'text',
								content: `1) احسب المبلغ الكلي الذي ${verbPaid}ه ${child}:`,
								answer: `العملية:\n$ ${p1} + ${p2} = ${total} $\nالجواب: ${verbPaid} ${child} مبلغ $${total}$ DA.`,
								mark: '3'
							}
						]
					},
					hints: [
						'نبحث عن الثمن الكلي، إذن نستعمل عملية الجمع.',
						`اجمع الوحدات مع الوحدات، ثم العشرات مع العشرات للعددين ${p1} و ${p2}.`,
						`تأكد من الحساب: ${p1} + ${p2} = ${total} DA.`
					],
					solutionStepsAr: [
						`ثمن ${item1} هو ${p1} DA، وثمن ${item2} هو ${p2} DA.`,
						`المبلغ الكلي: ${p1} + ${p2} = ${total} DA.`
					],
					finalAnswer: `${total} DA`
				};
			}

			if (difficulty === 'medium') {
				const [budget, cost] = pickNoBorrowPair(rng, 45, 89, 12);
				const remaining = budget - cost;
				const coins = coinsForAmount(budget);
				const svgPath = saveSvgAsset(
					`2ap_t1_coins_${difficulty}_s${cleanSeed}`,
					svgCoinsDinar(coins)
				);

				const problemText = `${verbHas} ${child} مبلغ $${budget}$ DA (المبين بالقطع النقدية في الصورة). ${verbBought} ${item1} ثمنه $${cost}$ DA.`;
				const questionText = `${verbHas} ${child} مبلغ $${budget}$ DA. ${verbBought} ${item1} ثمنه $${cost}$ DA. كم ديناراً بقي ${pronAt}؟`;

				return {
					templateId: '2ap_t1_integration_word',
					seed: cleanSeed,
					grade: '2ap',
					trimesterId: 't1',
					difficulty,
					domain: 'integration',
					titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
					quizQuestion: {
						type: 'calculated',
						questionText,
						questionTextAr: questionText,
						imageUrl: svgPath,
						imageCaption: `مبلغ ${child}: ${budget} DA`,
						questionData: {
							answer: remaining,
							displayTemplate: '? DA',
							variables: [],
							tolerance: 0
						},
						explanation: `نطرح الثمن من المبلغ الذي كان ${pronAt}: $${budget} - ${cost} = ${remaining}$ DA.`
					},
					sujetExercise: {
						customTitle: 'الوضعية الإدماجية',
						points: 3,
						instruction: 'اقرأ الوضعية جيداً ثم أجب:',
						content: [
							{
								type: 'columns',
								widths: ['1.3fr', '1fr'],
								children: [
									{
										type: 'text',
										content: problemText
									},
									{
										type: 'image',
										src: svgPath,
										caption: 'القطع النقدية (DA)'
									}
								]
							},
							{
								type: 'text',
								content: `1) احسب المبلغ الذي بقي ${pronAt}:`,
								answer: `العملية:\n$ ${budget} - ${cost} = ${remaining} $\nالجواب: بقي عند ${child} مبلغ $${remaining}$ DA.`,
								mark: '3'
							}
						]
					},
					hints: [
						'اشترى وأنفق من ماله، إذن نستعمل عملية الطرح لمعرفة الباقي.',
						`اطرح الوحدات من الوحدات والعشرات من العشرات: ${budget} - ${cost}.`,
						`الناتج هو ${remaining} DA.`
					],
					solutionStepsAr: [
						`المبلغ الذي كان عند ${child}: ${budget} DA.`,
						`المبلغ المتبقي بعد الشراء: ${budget} - ${cost} = ${remaining} DA.`
					],
					finalAnswer: `${remaining} DA`
				};
			}

			// Hard: 2-step (add two prices without carry, then subtract from budget without borrow)
			const budgets = [65, 75, 85, 95];
			const budget = rng.pick(budgets);
			const budgetT = Math.floor(budget / 10);
			const validPairs: [number, number][] = [];
			for (let p1 = 11; p1 <= budget - 20; p1++) {
				const u1 = p1 % 10;
				const t1 = Math.floor(p1 / 10);
				if (u1 === 0) continue;
				for (let p2 = 11; p2 <= budget - p1 - 10; p2++) {
					const u2 = p2 % 10;
					const t2 = Math.floor(p2 / 10);
					if (u2 === 0) continue;
					const sumU = u1 + u2;
					const sumT = t1 + t2;
					if (sumU <= 5 && sumT <= budgetT && p1 + p2 <= budget - 10) {
						validPairs.push([p1, p2]);
					}
				}
			}
			const [p1, p2] = validPairs.length > 0 ? rng.pick(validPairs) : [21, 13];
			const totalSpent = p1 + p2;
			const remaining = budget - totalSpent;
			const coins = coinsForAmount(budget);
			const svgPath = saveSvgAsset(
				`2ap_t1_coins_${difficulty}_s${cleanSeed}`,
				svgCoinsDinar(coins)
			);

			const problemText = `${verbHas} ${child} مبلغ $${budget}$ DA (كما يظهر في الصورة). ${verbBought} ${item1} بـ $${p1}$ DA و${item2} بـ $${p2}$ DA.`;
			const questionText = `${verbHas} ${child} مبلغ $${budget}$ DA. ${verbBought} ${item1} بـ $${p1}$ DA و${item2} بـ $${p2}$ DA. كم ديناراً بقي ${pronWith}؟`;

			return {
				templateId: '2ap_t1_integration_word',
				seed: cleanSeed,
				grade: '2ap',
				trimesterId: 't1',
				difficulty,
				domain: 'integration',
				titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
				quizQuestion: {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: `مبلغ ${child}: ${budget} DA`,
					questionData: {
						answer: remaining,
						displayTemplate: '? DA',
						variables: [],
						tolerance: 0
					},
					explanation: `أولاً نحسب ثمن المشتريات: $${p1} + ${p2} = ${totalSpent}$ DA، ثم نطرحه من $${budget}$: $${budget} - ${totalSpent} = ${remaining}$ DA.`
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 3,
					instruction: 'اقرأ الوضعية جيداً ثم أجب عن السؤالين:',
					content: [
						{
							type: 'columns',
							widths: ['1.3fr', '1fr'],
							children: [
								{
									type: 'text',
									content: problemText
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'المبلغ المتوفر'
								}
							]
						},
						{
							type: 'text',
							content: `1) احسب ثمن المشتريات معاً:`,
							answer: `العملية:\n$ ${p1} + ${p2} = ${totalSpent} $\nثمن المشتريات هو $${totalSpent}$ DA.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) كم ديناراً بقي عند ${child}؟`,
							answer: `العملية:\n$ ${budget} - ${totalSpent} = ${remaining} $\nبقي عند ${child} مبلغ $${remaining}$ DA.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'تتكون المسألة من خطوتين: نحسب أولاً مجموع المشتريات، ثم نحسب الباقي.',
					`احسب أولاً: ${p1} + ${p2} = ${totalSpent} DA.`,
					`الآن اطرح المجموع من ${budget}: ${budget} - ${totalSpent} = ${remaining} DA.`
				],
				solutionStepsAr: [
					`ثمن المشتريات معاً: ${p1} + ${p2} = ${totalSpent} DA.`,
					`المبلغ المتبقي عند ${child}: ${budget} - ${totalSpent} = ${remaining} DA.`
				],
				finalAnswer: `${remaining} DA`
			};
		}

		if (variant === 1) {
			// Reforestation campaign (حملة التشجير)
			if (difficulty === 'hard') {
				const goalCandidates: number[] = [];
				for (let g = 64; g <= 98; g++) {
					if (g % 10 >= 4) goalCandidates.push(g);
				}
				const totalGoal = rng.pick(goalCandidates);
				const goalT = Math.floor(totalGoal / 10);
				const goalU = totalGoal % 10;
				const valid: [number, number][] = [];
				for (let a = 11; a <= totalGoal - 22; a++) {
					const ua = a % 10;
					const ta = Math.floor(a / 10);
					if (ua === 0) continue;
					for (let b = 11; b <= totalGoal - a - 10; b++) {
						const ub = b % 10;
						const tb = Math.floor(b / 10);
						if (ub === 0) continue;
						if (ua + ub <= goalU && ta + tb <= goalT && totalGoal - (a + b) >= 10) {
							valid.push([a, b]);
						}
					}
				}
				const [a, b] = valid.length > 0 ? rng.pick(valid) : [21, 12];
				const planted = a + b;
				const rem = totalGoal - planted;

				const questionText = `في حملة التشجير بالمدرسة، أحضر التلاميذ $${totalGoal}$ شجيرة. غرسوا $${a}$ شجيرة في الصباح، و$${b}$ شجيرة في المساء. كم شجيرة بقيت دون غرس؟`;

				return {
					templateId: '2ap_t1_integration_word',
					seed: cleanSeed,
					grade: '2ap',
					trimesterId: 't1',
					difficulty,
					domain: 'integration',
					titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
					quizQuestion: {
						type: 'calculated',
						questionText,
						questionTextAr: questionText,
						questionData: {
							answer: rem,
							displayTemplate: '= ?',
							variables: [],
							tolerance: 0
						},
						explanation: `عدد الشجيرات المغروسة هو $${a} + ${b} = ${planted}$، والشجيرات المتبقية: $${totalGoal} - ${planted} = ${rem}$.`
					},
					sujetExercise: {
						customTitle: 'الوضعية الإدماجية',
						points: 3,
						instruction: 'اقرأ الوضعية جيداً ثم أجب عن السؤالين:',
						content: [
							{
								type: 'text',
								content: `في حملة التشجير بالمدرسة، أحضر التلاميذ $${totalGoal}$ شجيرة. غرسوا $${a}$ شجيرة في الصباح، و$${b}$ شجيرة في المساء.`
							},
							{
								type: 'text',
								content: '1) كم شجيرة غرس التلاميذ في الفترتين معاً؟',
								answer: `العملية:\n$ ${a} + ${b} = ${planted} $\nغرس التلاميذ $${planted}$ شجيرة.`,
								mark: '1.5'
							},
							{
								type: 'text',
								content: '2) كم شجيرة بقيت دون غرس؟',
								answer: `العملية:\n$ ${totalGoal} - ${planted} = ${rem} $\nبقيت $${rem}$ شجيرة.`,
								mark: '1.5'
							}
						]
					},
					hints: [
						'احسب أولاً مجموع الشجيرات المغروسة في الصباح والمساء.',
						`نجمع: ${a} + ${b} = ${planted} شجيرة.`,
						`نطرح المغروسة من الكل: ${totalGoal} - ${planted} = ${rem}.`
					],
					solutionStepsAr: [
						`مجموع الشجيرات المغروسة: ${a} + ${b} = ${planted} شجيرة.`,
						`الشجيرات المتبقية: ${totalGoal} - ${planted} = ${rem} شجيرة.`
					],
					finalAnswer: `${rem} شجيرة`
				};
			}

			const [a, b] =
				difficulty === 'easy'
					? pickNoCarryPair(rng, 14, 39, 4)
					: pickNoCarryPair(rng, 34, 89, 11);
			const total = a + b;
			const questionText = `في حملة التشجير بالمدرسة، غرس تلاميذ القسم $${a}$ شجيرة في الفناء الأمامي، وغرسوا $${b}$ شجيرة في الفناء الخلفي. ما هو العدد الكلي للشجيرات المغروسة؟`;

			return {
				templateId: '2ap_t1_integration_word',
				seed: cleanSeed,
				grade: '2ap',
				trimesterId: 't1',
				difficulty,
				domain: 'integration',
				titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
				quizQuestion: {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					questionData: {
						answer: total,
						displayTemplate: '= ?',
						variables: [],
						tolerance: 0
					},
					explanation: `نجمع عدد الشجيرات في الفناءين دون احتفاظ: $${a} + ${b} = ${total}$ شجيرة.`
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 3,
					instruction: 'اقرأ الوضعية جيداً ثم أجب:',
					content: [
						{
							type: 'text',
							content: `في حملة التشجير بالمدرسة، غرس تلاميذ القسم $${a}$ شجيرة في الفناء الأمامي، وغرسوا $${b}$ شجيرة في الفناء الخلفي.`
						},
						{
							type: 'text',
							content: '1) ما هو العدد الكلي للشجيرات التي غرسها التلاميذ؟',
							answer: `العملية:\n$ ${a} + ${b} = ${total} $\nالجواب: غرس التلاميذ $${total}$ شجيرة.`,
							mark: '3'
						}
					]
				},
				hints: [
					'لإيجاد العدد الكلي للشجيرات، نستعمل عملية الجمع.',
					`اجمع الوحدات مع الوحدات، ثم العشرات مع العشرات للعددين ${a} و ${b}.`,
					`الناتج هو ${total} شجيرة.`
				],
				solutionStepsAr: [
					`شجيرات الفناء الأمامي: ${a}، وشجيرات الفناء الخلفي: ${b}.`,
					`المجموع الكلي: ${a} + ${b} = ${total} شجيرة.`
				],
				finalAnswer: `${total} شجيرة`
			};
		}

		// Variant 2: Sweets / Marbles / Books subtraction (and 2-step on hard)
		const itemPairs: [string, string][] = [
			['حبة حلوى', 'حبات حلوى'],
			['كرية زجاجية', 'كريات'],
			['كتاباً قصصياً', 'كتباً']
		];
		const [itemSing] = rng.pick(itemPairs);

		if (difficulty === 'hard') {
			const [start, added] = pickNoCarryPair(rng, 45, 97, 12);
			const mid = start + added;
			const midT = Math.floor(mid / 10);
			const midU = mid % 10;
			const validSubCandidates: number[] = [];
			for (let s = 11; s <= mid - 2; s++) {
				if (s % 10 > 0 && s % 10 <= midU && Math.floor(s / 10) <= midT) {
					validSubCandidates.push(s);
				}
			}
			const chosenSub =
				validSubCandidates.length > 0
					? rng.pick(validSubCandidates)
					: (midT >= 1 ? 10 : 0) + (midU >= 1 ? 1 : 0);
			const rem = mid - chosenSub;

			const questionText = `كان عند ${child} $${start}$ ${itemSing}، ${verbParentGave} ${pronParent} $${added}$ أخرى، ثم ${verbGifted} ${pronGiftSibling} $${chosenSub}$ منها. كم ${itemSing} بقي ${pronAt}؟`;

			return {
				templateId: '2ap_t1_integration_word',
				seed: cleanSeed,
				grade: '2ap',
				trimesterId: 't1',
				difficulty,
				domain: 'integration',
				titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
				quizQuestion: {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					questionData: {
						answer: rem,
						displayTemplate: '= ?',
						variables: [],
						tolerance: 0
					},
					explanation: `أولاً نحسب ما صار ${pronAt}: $${start} + ${added} = ${mid}$، ثم نطرح ما ${verbGifted}: $${mid} - ${chosenSub} = ${rem}$.`
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 3,
					instruction: 'اقرأ الوضعية جيداً ثم أجب عن السؤالين:',
					content: [
						{
							type: 'text',
							content: `كان عند ${child} $${start}$ ${itemSing}، ${verbParentGave} ${pronParent} $${added}$ أخرى، ثم ${verbGifted} ${pronGiftSibling} $${chosenSub}$ منها.`
						},
						{
							type: 'text',
							content: `1) كم ${itemSing} صار عند ${child} بعد هدية ${pronParent}؟`,
							answer: `العملية:\n$ ${start} + ${added} = ${mid} $\nصار عند ${child} $${mid}$ ${itemSing}.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) كم ${itemSing} بقي عند ${child} في النهاية؟`,
							answer: `العملية:\n$ ${mid} - ${chosenSub} = ${rem} $\nبقي عند ${child} $${rem}$ ${itemSing}.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`تتكون المسألة من مرحلتين: الجمع أولاً لمعرفة ما صار ${pronAt}، ثم الطرح لمعرفة الباقي.`,
					`أضف أولاً: ${start} + ${added} = ${mid}.`,
					`اطرح ما ${verbGifted} ${pronGiftSibling}: ${mid} - ${chosenSub} = ${rem}.`
				],
				solutionStepsAr: [
					`بعد هدية ${pronParent} صار عند ${child}: ${start} + ${added} = ${mid}.`,
					`بعد الإهداء بقي ${pronAt}: ${mid} - ${chosenSub} = ${rem}.`
				],
				finalAnswer: `${rem}`
			};
		}

		const [total, sub] =
			difficulty === 'easy'
				? pickNoBorrowPair(rng, 16, 39, 4)
				: pickNoBorrowPair(rng, 42, 89, 12);
		const rem = total - sub;
		const verbGave = person.fem ? 'أعطت' : 'أعطى';
		const questionText = `${verbHas} ${child} $${total}$ ${itemSing}، ${verbGave} ${pronGiftSibling} $${sub}$ منها. كم ${itemSing} بقي ${pronAt}؟`;

		return {
			templateId: '2ap_t1_integration_word',
			seed: cleanSeed,
			grade: '2ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: مشكلات جمعية وطرحية من الحياة اليومية',
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				questionData: {
					answer: rem,
					displayTemplate: '= ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نستعمل عملية الطرح دون استلاف: $${total} - ${sub} = ${rem}$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 3,
				instruction: 'اقرأ الوضعية جيداً ثم أجب:',
				content: [
					{
						type: 'text',
						content: `عند ${child} $${total}$ ${itemSing}، ${verbGave} ${pronGiftSibling} $${sub}$ منها.`
					},
					{
						type: 'text',
						content: `1) كم ${itemSing} بقي عند ${child}؟`,
						answer: `العملية:\n$ ${total} - ${sub} = ${rem} $\nالجواب: بقي عند ${child} $${rem}$ ${itemSing}.`,
						mark: '3'
					}
				]
			},
			hints: [
				'عندما نعطي أو ننقص من الكمية، نستعمل عملية الطرح.',
				`اطرح الوحدات أولاً (${total % 10} - ${sub % 10}) ثم العشرات (${Math.floor(total / 10)} - ${Math.floor(sub / 10)}).`,
				`الباقي هو ${rem}.`
			],
			solutionStepsAr: [
				`العدد الأصلي: ${total}، والكمية المعطاة: ${sub}.`,
				`الباقي: ${total} - ${sub} = ${rem}.`
			],
			finalAnswer: `${rem}`
		};
	}
};

export const TEMPLATES_2AP_T1: ParameterizedTemplate[] = [
	templateNumbersDecomp,
	templateCompareOrder,
	templateAddDoubleHalf,
	templateGridLocate,
	templateAlignmentLengthPoly,
	templateIntegrationWord
];
