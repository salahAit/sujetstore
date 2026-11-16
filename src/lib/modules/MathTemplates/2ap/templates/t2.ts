import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { SeededRng, buildUniqueMcqOptions } from '../../rng';
import {
	saveSvgAsset,
	svgAnalogClock,
	svgBaseTenBlocks,
	svgCoinsDinar,
	svgRectangle
} from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';

const DAYS_OF_WEEK_AR = [
	'الأحد',
	'الاثنين',
	'الثلاثاء',
	'الأربعاء',
	'الخميس',
	'الجمعة',
	'السبت'
] as const;

const ONES_AR = [
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

const TEENS_AR = [
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

const TENS_AR = [
	'',
	'عشرة',
	'عشرون',
	'ثلاثون',
	'أربعون',
	'خمسون',
	'ستون',
	'سبعون',
	'ثمانون',
	'تسعون'
] as const;

const HUNDREDS_AR = [
	'',
	'مئة',
	'مئتان',
	'ثلاثمئة',
	'أربعمئة',
	'خمسمئة',
	'ستمئة',
	'سبعمئة',
	'ثمانمئة',
	'تسعمئة'
] as const;

function pad2(n: number): string {
	return String(n).padStart(2, '0');
}

/** Converts an integer in 0..999 into Modern Standard Arabic words (Algerian 2AP conventions). */
function numberToArabicWords(n: number): string {
	const clamped = Math.max(0, Math.min(999, Math.trunc(n)));
	if (clamped === 0) return ONES_AR[0];

	const h = Math.floor(clamped / 100);
	const rem = clamped % 100;
	const parts: string[] = [];

	if (h > 0) parts.push(HUNDREDS_AR[h]);

	if (rem > 0) {
		if (rem < 10) {
			parts.push(ONES_AR[rem]);
		} else if (rem < 20) {
			parts.push(TEENS_AR[rem - 10]);
		} else {
			const t = Math.floor(rem / 10);
			const o = rem % 10;
			if (o === 0) {
				parts.push(TENS_AR[t]);
			} else {
				parts.push(`${ONES_AR[o]} و${TENS_AR[t]}`);
			}
		}
	}

	return parts.join(' و');
}

/** Generates an addition pair (a1 + a2 <= 999) guaranteed to involve carry. */
function generateCarryAddition(rng: SeededRng, difficulty: Difficulty) {
	if (difficulty === 'easy') {
		const u1 = rng.int(2, 9);
		const u2 = rng.int(10 - u1, 9);
		const t1 = rng.int(1, 8);
		const t2 = rng.int(1, 8);
		const a1 = t1 * 10 + u1;
		const a2 = t2 * 10 + u2;
		return { a1, a2, sum: a1 + a2, forgotOnesCarry: (t1 + t2) * 10 + ((u1 + u2) % 10) };
	}

	if (difficulty === 'medium') {
		const u1 = rng.int(2, 9);
		const u2 = rng.int(10 - u1, 9);
		const t1 = rng.int(1, 6);
		const t2 = rng.int(1, 8 - t1);
		const h1 = rng.int(1, 4);
		const h2 = rng.int(0, 3);
		const a1 = h1 * 100 + t1 * 10 + u1;
		const a2 = h2 * 100 + t2 * 10 + u2;
		const sum = a1 + a2;
		const forgotOnesCarry = (h1 + h2) * 100 + (t1 + t2) * 10 + ((u1 + u2) % 10);
		return { a1, a2, sum, forgotOnesCarry };
	}

	// hard: 3-digit + 3-digit with double carry (ones and tens) and sum <= 998
	const u1 = rng.int(2, 9);
	const u2 = rng.int(10 - u1, 9);
	const t1 = rng.int(2, 9);
	const t2 = rng.int(9 - t1, 9);
	const h1 = rng.int(1, 5);
	const h2 = rng.int(1, 8 - h1);
	const a1 = h1 * 100 + t1 * 10 + u1;
	const a2 = h2 * 100 + t2 * 10 + u2;
	const sum = a1 + a2;
	const forgotOnesCarry = sum - 10;
	return { a1, a2, sum, forgotOnesCarry };
}

/** Generates a 2-digit subtraction without borrowing (s1 - s2, s2 in 11..88, s1 <= 999). */
function generateNoBorrowSubtraction(rng: SeededRng, difficulty: Difficulty) {
	if (difficulty === 'easy') {
		const su2 = rng.int(1, 6);
		const su1 = rng.int(su2, 9);
		const st2 = rng.int(1, 6);
		const st1 = rng.int(st2 + 1, 9);
		const s1 = st1 * 10 + su1;
		const s2 = st2 * 10 + su2;
		return { s1, s2, diff: s1 - s2 };
	}

	if (difficulty === 'medium') {
		const sh1 = rng.int(1, 5);
		const su2 = rng.int(1, 7);
		const su1 = rng.int(su2, 9);
		const st2 = rng.int(1, 7);
		const st1 = rng.int(st2, 9);
		const s1 = sh1 * 100 + st1 * 10 + su1;
		const s2 = st2 * 10 + su2;
		return { s1, s2, diff: s1 - s2 };
	}

	const sh1 = rng.int(6, 9);
	const su2 = rng.int(2, 8);
	const su1 = rng.int(su2, 9);
	const st2 = rng.int(2, 8);
	const st1 = rng.int(st2, 9);
	const s1 = sh1 * 100 + st1 * 10 + su1;
	const s2 = st2 * 10 + su2;
	return { s1, s2, diff: s1 - s2 };
}

/** Builds realistic Algerian Dinar coin/note combinations whose total is strictly < 1000 DA. */
function generateDinarSet(rng: SeededRng, difficulty: Difficulty) {
	let denominations: number[];
	if (difficulty === 'easy') {
		const base = rng.pick([
			[100],
			[50, 50]
		]);
		const mid = rng.pick([50, 20]);
		const low1 = rng.pick([20, 10]);
		const low2 = rng.pick([10, 5]);
		denominations = [...base, mid, low1, low2];
	} else if (difficulty === 'medium') {
		const notes = rng.pick([
			[200, 100],
			[200, 200],
			[100, 100, 50],
			[200, 50, 50]
		]);
		const coins = rng.pick([
			[50, 20, 10],
			[20, 20, 5],
			[50, 10, 5]
		]);
		denominations = [...notes, ...coins];
	} else {
		const notes = rng.pick([
			[500, 200, 100],
			[500, 200, 200],
			[500, 100, 100, 50]
		]);
		const coins = rng.pick([
			[50, 20, 10],
			[50, 20, 5],
			[20, 20, 10, 5]
		]);
		denominations = [...notes, ...coins];
	}

	const total = denominations.reduce((acc, v) => acc + v, 0);
	return { denominations, total };
}

function swapTensOnes(n: number): number {
	const h = Math.floor(n / 100);
	const t = Math.floor((n % 100) / 10);
	const o = n % 10;
	return h * 100 + o * 10 + t;
}

/**
 * 1) Reading / decomposing / framing 3-digit numbers < 1000
 */
const tplNumbersTo999: ParameterizedTemplate = {
	id: '2ap_t2_numbers_to_999',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'قراءة وتفكيك وحصر الأعداد الأصغر من 1000',
	curriculumLessonId: 'lesson_2ap_t2_numbers_to_999_decomp',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 101 + 1);
		const variant = rng.int(0, 2); // 0: read blocks, 1: canonical decomposition, 2: framing

		let h = 1;
		let t = 1;
		let o = 1;
		if (difficulty === 'easy') {
			h = 1;
			t = rng.int(1, 8);
			o = rng.int(1, 9);
		} else if (difficulty === 'medium') {
			h = rng.int(2, 5);
			t = variant === 1 ? rng.int(1, 8) : rng.int(0, 8);
			o = rng.int(1, 9);
		} else {
			h = rng.int(6, 8);
			t = variant === 1 ? rng.int(1, 9) : rng.int(0, 9);
			o = rng.int(1, 9);
		}

		const n = h * 100 + t * 10 + o;
		const words = numberToArabicWords(n);
		const decompKaTeX = t > 0 ? `$${h * 100} + ${t * 10} + ${o}$` : `$${h * 100} + ${o}$`;
		const decompTypst = t > 0 ? `$${h * 100} + ${t * 10} + ${o}$` : `$${h * 100} + ${o}$`;

		const tLow = h * 100 + t * 10;
		const tHigh = tLow + 10;
		const hLow = h * 100;
		const hHigh = (h + 1) * 100;
		const frameBetweenHundreds = difficulty === 'hard';
		const frameLow = frameBetweenHundreds ? hLow : tLow;
		const frameHigh = frameBetweenHundreds ? hHigh : tHigh;

		const svg = svgBaseTenBlocks(h, t, o);
		const imgPath = saveSvgAsset(`2ap-t2-t1-s${seed}-${difficulty}`, svg);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];

		if (variant === 0) {
			quizQuestion = {
				type: 'fill_blank',
				questionText: 'لاحظ التمثيل بالمئات والعشرات والوحدات، ثم اكتب العدد الممثل بالأرقام:',
				questionTextAr: 'لاحظ التمثيل بالمئات والعشرات والوحدات، ثم اكتب العدد الممثل بالأرقام:',
				imageUrl: imgPath,
				imageCaption: 'تمثيل العدد بصفائح المئات وأعمدة العشرات ومربعات الوحدات',
				questionData: {
					sentence: 'العدد الممثل في الشكل هو ___',
					acceptedAnswers: [String(n)]
				},
				explanation: `نعد المئات (${h}) ثم العشرات (${t}) ثم الوحدات (${o})، فنحصل على العدد $${n}$ (${words}).`
			};
		} else if (variant === 1) {
			const { options, correctIndices } = buildUniqueMcqOptions(
				decompKaTeX,
				[
					{
						text: `$${h} + ${t} + ${o}$`,
						diagnosticFeedback:
							'انتبه لقيمة المراتب! رقم المئات يمثل مئات ( $100$ ) ورقم العشرات يمثل عشرات ( $10$ ).'
					},
					{
						text: `$${h * 100} + ${t} + ${o * 10}$`,
						diagnosticFeedback: 'خلطت بين مرتبة العشرات ومرتبة الوحدات!'
					},
					{
						text: `$${h * 10} + ${t * 10} + ${o}$`,
						diagnosticFeedback: 'رقم المئات يجب أن يُكتب بالمئات وليس بالعشرات.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما هو التفكيك النموذجي الصحيح للعدد $${n}$ الممثل في الشكل ؟`,
				questionTextAr: `ما هو التفكيك النموذجي الصحيح للعدد $${n}$ الممثل في الشكل ؟`,
				imageUrl: imgPath,
				imageCaption: 'تمثيل العدد بالمئات والعشرات والوحدات',
				questionData: { options, correctIndices },
				explanation: `العدد $${n}$ يتكون من $${h}$ مئات و $${t}$ عشرات و $${o}$ وحدات، لذا تفكيكه النموذجي هو ${decompKaTeX} .`
			};
		} else {
			const correctFrame = `$${frameLow} < ${n} < ${frameHigh}$`;
			const altFrame = frameBetweenHundreds
				? `$${tLow} < ${n} < ${tHigh}$`
				: `$${hLow} < ${n} < ${hHigh}$`;
			const altMsg = frameBetweenHundreds
				? 'هذا حصر بين عشرتين متتاليتين، والمطلوب الحصر بين مئتين متتاليتين!'
				: 'هذا حصر بين مئتين متتاليتين، والمطلوب الحصر بين عشرتين متتاليتين!';

			const { options, correctIndices } = buildUniqueMcqOptions(
				correctFrame,
				[
					{
						text: altFrame,
						diagnosticFeedback: altMsg
					},
					{
						text: `$${n - 1} < ${n} < ${n + 1}$`,
						diagnosticFeedback:
							'هذا حصر بين عددين متتاليين، وليس بين عشرتين أو مئتين متتاليتين.'
					},
					{
						text: `$${frameHigh} < ${n} < ${frameLow}$`,
						diagnosticFeedback:
							'انتبه لترتيب الرمز ( $<$ ) : العدد الأصغر يأتي على اليسار والعدد الأكبر على اليمين.'
					}
				],
				rng
			);
			const frameAsk = frameBetweenHundreds ? 'بين مئتين متتاليتين' : 'بين عشرتين متتاليتين';
			quizQuestion = {
				type: 'mcq',
				questionText: `اختر الحصر الصحيح للعدد $${n}$ ${frameAsk} :`,
				questionTextAr: `اختر الحصر الصحيح للعدد $${n}$ ${frameAsk} :`,
				imageUrl: imgPath,
				imageCaption: 'تمثيل العدد بالمئات والعشرات والوحدات',
				questionData: { options, correctIndices },
				explanation: `لحصر العدد $${n}$ ${frameAsk}، نبحث عن الحد الأصغر $${frameLow}$ والحد الأكبر $${frameHigh}$ ، فيكون $${frameLow} < ${n} < ${frameHigh}$ .`
			};
		}

		const decompBlank = t > 0 ? `$${n} = dots + dots + dots$` : `$${n} = dots + dots$`;
		const frameLabel = frameBetweenHundreds ? 'بين مئتين متتاليتين' : 'بين عشرتين متتاليتين';
		const frameShort = frameBetweenHundreds ? 'بين مئتين' : 'بين عشرتين';

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t1-${seed}-${difficulty}`,
			points: 2,
			instruction: 'لاحظ التمثيل المقابل بالمئات والعشرات والوحدات، ثم أجب عما يلي:',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1- اكتب العدد الممثل بالأرقام: ........\n\n2- اكتبه بالحروف: ...................................\n\n3- التفكيك النموذجي: ${decompBlank}\n\n4- الحصر ${frameShort}: $dots < ${n} < dots$`,
							answer: `1- العدد بالأرقام: $${n}$\n\n2- بالحروف: ${words}\n\n3- التفكيك النموذجي: $${n} = ${decompTypst.slice(1, -1)}$\n\n4- الحصر: $${frameLow} < ${n} < ${frameHigh}$`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: imgPath,
							caption: 'تمثيل العدد'
						}
					]
				},
				{
					type: 'text',
					content: '5- انقل وأكمل جدول المراتب التالي:',
					answer: '5- جدول المراتب:',
					mark: '0.5'
				},
				{
					type: 'table',
					headers: ['الوحدات', 'العشرات', 'المئات'],
					cells: [
						{ content: '...', answer: String(o) },
						{ content: '...', answer: String(t) },
						{ content: '...', answer: String(h) }
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			]
		};

		return {
			templateId: '2ap_t2_numbers_to_999',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: tplNumbersTo999.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ بعدّ صفائح المئات، ثم أعمدة العشرات، ثم مربعات الوحدات.',
				`يتكون العدد من ${h} مئات و ${t} عشرات و ${o} وحدات.`,
				`في التفكيك النموذجي نكتب قيمة كل مرتبة، وفي الحصر نضع الأصغر على اليسار والأكبر على اليمين.`
			],
			solutionStepsAr: [
				`نعد القطع في الرسم: ${h} صفائح مئات ( $${h * 100}$ )، ${t} أعمدة عشرات ( $${t * 10}$ )، و ${o} وحدات ( $${o}$ ).`,
				`العدد بالأرقام هو $${n}$ ، وبالحروف: ${words}.`,
				`التفكيك النموذجي: $${n} = ${decompTypst.slice(1, -1)}$ .`,
				`الحصر ${frameLabel}: $${frameLow} < ${n} < ${frameHigh}$ .`
			],
			finalAnswer: `${n}`
		};
	}
};

/**
 * 2) Addition with carry & 2-digit subtraction without borrowing < 1000
 */
const tplAddCarrySubSimple: ParameterizedTemplate = {
	id: '2ap_t2_add_carry_sub_simple',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الجمع بالاحتفاظ والطرح دون استلاف',
	curriculumLessonId: 'lesson_2ap_t2_addition_with_carry',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 137 + 2);
		const add = generateCarryAddition(rng, difficulty);
		const sub = generateNoBorrowSubtraction(rng, difficulty);
		const isAdditionQuiz = seed % 2 === 0;

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (isAdditionQuiz) {
			const u1 = add.a1 % 10;
			const u2 = add.a2 % 10;
			const uSum = u1 + u2;

			const misalignCandidate =
				add.a2 < 100 && add.a1 + add.a2 * 10 < 1000
					? add.a1 + add.a2 * 10
					: add.sum + 10 <= 999
						? add.sum + 10
						: add.sum - 20;
			const misalignMsg =
				add.a2 < 100 && add.a1 + add.a2 * 10 < 1000
					? 'خطأ في رصف المراتب! يجب وضع الوحدات تحت الوحدات والعشرات تحت العشرات.'
					: 'تحقق من جمع رقم العشرات مع الواحد المحتفظ به فقط.';

			const thirdCandidate =
				add.sum >= 110
					? add.sum - 100
					: add.sum + 100 <= 999
						? add.sum + 100
						: add.sum + 20;

			const { options, correctIndices } = buildUniqueMcqOptions(
				String(add.sum),
				[
					{
						text: String(add.forgotOnesCarry),
						diagnosticFeedback:
							'نسيت إضافة الواحد المحتفظ به (1) إلى مرتبة العشرات بعد تبديل 10 وحدات بعشرة واحدة.'
					},
					{
						text: String(misalignCandidate),
						diagnosticFeedback: misalignMsg
					},
					{
						text: String(thirdCandidate),
						diagnosticFeedback: 'راجع جمع كل مرتبة من اليمين إلى اليسار بانتباه.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `احسب نتيجة عملية الجمع بالاحتفاظ : $${add.a1} + ${add.a2} = ?$`,
				questionTextAr: `احسب نتيجة عملية الجمع بالاحتفاظ : $${add.a1} + ${add.a2} = ?$`,
				questionData: { options, correctIndices },
				explanation: `نجمع الوحدات $${u1} + ${u2} = ${uSum}$ ، نكتب $${uSum % 10}$ ونحتفظ بـ $1$ في العشرات، ثم نكمل الجمع لنجد $${add.sum}$ .`
			};
			finalAnswer = String(add.sum);
			hints = [
				'ضع الوحدات تحت الوحدات والعشرات تحت العشرات والمئات تحت المئات.',
				`ابدأ بالوحدات: $${u1} + ${u2} = ${uSum}$ ، اكتب $${uSum % 10}$ واحتفظ بـ $1$ .`,
				'لا تنسَ جمع الواحد المحتفظ به مع رقم العشرات (ثم المئات إن وُجد احتفاظ ثانٍ).'
			];
			solutionStepsAr = [
				`نضع العملية عمودياً: الوحدات تحت الوحدات والعشرات تحت العشرات.`,
				`نجمع الوحدات: $${u1} + ${u2} = ${uSum}$ (نكتب $${uSum % 10}$ ونحتفظ بـ $1$ فوق العشرات).`,
				`نكمل جمع العشرات والمئات مع الاحتفاظ فنجد: $${add.a1} + ${add.a2} = ${add.sum}$ .`
			];
		} else {
			const su1 = sub.s1 % 10;
			const su2 = sub.s2 % 10;
			const st1 = Math.floor((sub.s1 % 100) / 10);
			const st2 = Math.floor(sub.s2 / 10);

			const addMistake = sub.s1 + sub.s2 <= 999 ? sub.s1 + sub.s2 : sub.diff + 20;
			const addMistakeMsg =
				sub.s1 + sub.s2 <= 999
					? 'انتبه للرمز ( $-$ ) ! العملية هي طرح وليست جمعاً.'
					: 'تحقق من عملية الطرح في مرتبة العشرات.';

			const misalignSub =
				sub.s1 >= 100 && sub.s1 - sub.s2 * 10 > 0
					? sub.s1 - sub.s2 * 10
					: sub.diff + 10 <= 999
						? sub.diff + 10
						: sub.diff - 10;
			const misalignSubMsg =
				sub.s1 >= 100 && sub.s1 - sub.s2 * 10 > 0
					? 'خطأ في رصف المراتب! ضع العشرات تحت العشرات والوحدات تحت الوحدات.'
					: 'راجع طرح رقمي العشرات بعناية.';

			const swapped = swapTensOnes(sub.diff);
			const thirdSub =
				swapped !== sub.diff && swapped > 0 && swapped < 1000
					? swapped
					: sub.diff > 15
						? sub.diff - 10
						: sub.diff + 2;

			const { options, correctIndices } = buildUniqueMcqOptions(
				String(sub.diff),
				[
					{ text: String(addMistake), diagnosticFeedback: addMistakeMsg },
					{ text: String(misalignSub), diagnosticFeedback: misalignSubMsg },
					{
						text: String(thirdSub),
						diagnosticFeedback:
							'ابدأ بطرح الوحدات من الوحدات ثم العشرات من العشرات مع الحفاظ على ترتيب المراتب.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `احسب نتيجة عملية الطرح : $${sub.s1} - ${sub.s2} = ?$`,
				questionTextAr: `احسب نتيجة عملية الطرح : $${sub.s1} - ${sub.s2} = ?$`,
				questionData: { options, correctIndices },
				explanation: `نطرح الوحدات $${su1} - ${su2} = ${su1 - su2}$ ، ثم العشرات $${st1} - ${st2} = ${st1 - st2}$ ، فنحصل على $${sub.diff}$ .`
			};
			finalAnswer = String(sub.diff);
			hints = [
				'ضع العدد الأكبر في الأعلى، ورصّ الوحدات تحت الوحدات والعشرات تحت العشرات.',
				`ابدأ بطرح الوحدات: $${su1} - ${su2} = ${su1 - su2}$ .`,
				`أكمل طرح العشرات ( $${st1} - ${st2} = ${st1 - st2}$ ) وأنزل المئات كما هي إن وُجدت.`
			];
			solutionStepsAr = [
				`نضع عملية الطرح عمودياً بترتيب المراتب.`,
				`الوحدات: $${su1} - ${su2} = ${su1 - su2}$ .`,
				`العشرات: $${st1} - ${st2} = ${st1 - st2}$ ، فتكون النتيجة: $${sub.s1} - ${sub.s2} = ${sub.diff}$ .`
			];
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t2-${seed}-${difficulty}`,
			points: 2,
			instruction: 'ضع وأنجز العمليتين التاليتين عمودياً:',
			content: [
				{
					type: 'table',
					headers: ['1- الجمع بالاحتفاظ', '2- الطرح دون استلاف'],
					cells: [
						{
							content: `$${add.a1} + ${add.a2} = dots$\n\n............................\n\n............................`,
							answer: `$${add.a1} + ${add.a2} = ${add.sum}$`,
							mark: '1'
						},
						{
							content: `$${sub.s1} - ${sub.s2} = dots$\n\n............................\n\n............................`,
							answer: `$${sub.s1} - ${sub.s2} = ${sub.diff}$`,
							mark: '1'
						}
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			]
		};

		return {
			templateId: '2ap_t2_add_carry_sub_simple',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: tplAddCarrySubSimple.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

/**
 * 3) Algerian Dinar (DA) coins/notes counting & m / cm length conversion
 */
const tplCurrencyAndLength: ParameterizedTemplate = {
	id: '2ap_t2_currency_da_and_length_m_cm',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'measurement',
	titleAr: 'العملة (الدينار الجزائري) وقياس الأطوال بالمتر والسنتيمتر',
	curriculumLessonId: 'lesson_2ap_t2_currency_lengths_m_cm',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 193 + 3);
		const { denominations, total } = generateDinarSet(rng, difficulty);

		let meters = 2;
		let remCm = 0;
		if (difficulty === 'easy') {
			meters = rng.int(1, 5);
			remCm = 0;
		} else if (difficulty === 'medium') {
			meters = rng.int(1, 6);
			remCm = rng.int(12, 89);
		} else {
			meters = rng.int(2, 9);
			remCm = rng.int(1, 9); // tricky zero in tens: e.g. 4 m 7 cm = 407 cm
		}
		const cmTotal = meters * 100 + remCm;

		const revMeters = rng.int(2, difficulty === 'easy' ? 5 : 8);
		const revRem = difficulty === 'easy' ? 0 : rng.int(1, 9) * 10 + rng.int(0, 9);
		const revCmTotal = revMeters * 100 + revRem;

		const coinsSvg = svgCoinsDinar(denominations);
		const imgPath = saveSvgAsset(`2ap-t2-t3-s${seed}-${difficulty}`, coinsSvg);

		const isCurrencyQuiz = seed % 2 === 0;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (isCurrencyQuiz) {
			const lastCoin = denominations[denominations.length - 1];
			const d1 = total - lastCoin;
			const d2 = total + 100 <= 999 ? total + 100 : total - 100;
			const d3 = total >= 70 ? total - 50 : total + 50;

			const { options, correctIndices } = buildUniqueMcqOptions(
				`$${total}\\text{ DA}$`,
				[
					{
						text: `$${d1}\\text{ DA}$`,
						diagnosticFeedback: 'انتبه! نسيت عدّ إحدى القطع النقدية الصغيرة في الصورة.'
					},
					{
						text: `$${d2}\\text{ DA}$`,
						diagnosticFeedback:
							'تحقق جيداً من قيمة كل ورقة أو قطعة نقدية ( $500$ أو $200$ أو $100$ ) قبل الجمع.'
					},
					{
						text: `$${d3}\\text{ DA}$`,
						diagnosticFeedback: 'أعد جمع المبالغ من القطعة الأكبر إلى الأصغر بدقة.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: 'احسب المبلغ المالي الممثل في الصورة (بالدينار الجزائري) :',
				questionTextAr: 'احسب المبلغ المالي الممثل في الصورة (بالدينار الجزائري) :',
				imageUrl: imgPath,
				imageCaption: 'أوراق وقطع نقدية جزائرية',
				questionData: { options, correctIndices },
				explanation: `نجمع قيم القطع والأوراق: $${denominations.join(' + ')} = ${total}\\text{ DA}$ .`
			};
			finalAnswer = `${total} DA`;
			hints = [
				'اقرأ قيمة كل ورقة وقطعة نقدية بوضوح أولاً.',
				'ابدأ بجمع الأوراق والقطع الكبيرة ( $500$ أو $200$ أو $100$ ) ثم أضف القطع الصغيرة.',
				`اجمع: $${denominations.join(' + ')}$ لتحصل على المبلغ الكلي بالدينار الجزائري.`
			];
			solutionStepsAr = [
				`القطع والأوراق الظاهرة هي: ${denominations.map((v) => `${v} DA`).join('، ')}.`,
				`المجموع الكلي: $${denominations.join(' + ')} = ${total}$ .`,
				`المبلغ الممثل هو: $${total}$ DA.`
			];
		} else {
			const promptExpr =
				remCm > 0 ? `$${meters}\\text{ m } ${remCm}\\text{ cm} = ?\\text{ cm}$` : `$${meters}\\text{ m} = ?\\text{ cm}$`;

			const d1 = remCm > 0 ? meters * 10 + remCm : meters * 10;
			const d2 =
				difficulty === 'hard'
					? meters * 100 + remCm * 10
					: meters + 100 + remCm < 1000
						? meters + 100 + remCm
						: cmTotal + 10;
			const d3 =
				(meters + 1) * 100 + remCm < 1000
					? (meters + 1) * 100 + remCm
					: Math.max(10, (meters - 1) * 100 + remCm);

			const { options, correctIndices } = buildUniqueMcqOptions(
				`$${cmTotal}\\text{ cm}$`,
				[
					{
						text: `$${d1}\\text{ cm}$`,
						diagnosticFeedback: 'تذكّر أن $1\\text{ m} = 100\\text{ cm}$ وليس $10\\text{ cm}$ !'
					},
					{
						text: `$${d2}\\text{ cm}$`,
						diagnosticFeedback:
							difficulty === 'hard'
								? `انتبه لمرتبة العشرات! $${remCm}\\text{ cm}$ تمثل وحدات وليس عشرات.`
								: 'المتر الواحد يساوي $100\\text{ cm}$ ، فنضع رقم الأمتار في مرتبة المئات.'
					},
					{
						text: `$${d3}\\text{ cm}$`,
						diagnosticFeedback: 'تأكد من عدد الأمتار المعطى في السؤال قبل التحويل.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `حوّل الطول التالي إلى السنتيمتر : ${promptExpr}`,
				questionTextAr: `حوّل الطول التالي إلى السنتيمتر : ${promptExpr}`,
				questionData: { options, correctIndices },
				explanation: `نعلم أن $1\\text{ m} = 100\\text{ cm}$ ، إذن $${meters}\\text{ m} = ${meters * 100}\\text{ cm}$ ، وبإضافة $${remCm}\\text{ cm}$ نجد $${cmTotal}\\text{ cm}$ .`
			};
			finalAnswer = `${cmTotal} cm`;
			hints = [
				'تذكّر القاعدة الأساسية: $1\\text{ m} = 100\\text{ cm}$ .',
				`كل متر يساوي مئة سنتيمتر، إذن $${meters}\\text{ m} = ${meters * 100}\\text{ cm}$ .`,
				remCm > 0
					? `أضف السنتيمترات الباقية: $${meters * 100} + ${remCm}$ .`
					: 'اكتب النتيجة مباشرة بالسنتيمتر.'
			];
			solutionStepsAr = [
				`نستعمل العلاقة: $1\\text{ m} = 100\\text{ cm}$ .`,
				`$${meters}\\text{ m} = ${meters * 100}\\text{ cm}$ .`,
				remCm > 0
					? `نضيف $${remCm}\\text{ cm}$ : $${meters * 100} + ${remCm} = ${cmTotal}\\text{ cm}$ .`
					: `إذن الطول هو $${cmTotal}\\text{ cm}$ .`
			];
		}

		const lenQ1 =
			remCm > 0
				? `\u2066${meters} m ${remCm} cm = ..... cm\u2069`
				: `\u2066${meters} m = ..... cm\u2069`;
		const lenA1 =
			remCm > 0
				? `\u2066${meters} m ${remCm} cm = ${cmTotal} cm\u2069`
				: `\u2066${meters} m = ${cmTotal} cm\u2069`;
		const lenA2 =
			revRem > 0
				? `\u2066${revCmTotal} cm = ${revMeters} m ${revRem} cm\u2069`
				: `\u2066${revCmTotal} cm = ${revMeters} m\u2069`;
		const lenQ2 =
			revRem > 0
				? `\u2066${revCmTotal} cm = ..... m ..... cm\u2069`
				: `\u2066${revCmTotal} cm = ..... m\u2069`;

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t3-${seed}-${difficulty}`,
			points: 2,
			instruction: 'أجب عن سؤالي العملة والأطوال:',
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1- كم يملك سامي من الدينار الجزائري في الصورة المقابلة؟\n\nيملك سامي: ............ DA`,
							answer: `1- يملك سامي:\n\n$${denominations.join(' + ')} = ${total}$\n\nالمبلغ هو: \u2066${total} DA\u2069`,
							mark: '1'
						},
						{
							type: 'image',
							src: imgPath,
							caption: 'قطع وأوراق نقدية'
						}
					]
				},
				{
					type: 'text',
					content: `2- أكمل التحويلات التالية (تذكّر: \u20661 m = 100 cm\u2069 ):\n\nأ) ${lenQ1}\n\nب) ${lenQ2}`,
					answer: `2- التحويلات:\n\nأ) ${lenA1}\n\nب) ${lenA2}`,
					mark: '1'
				}
			]
		};

		return {
			templateId: '2ap_t2_currency_da_and_length_m_cm',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'measurement',
			titleAr: tplCurrencyAndLength.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

/**
 * 4) Time reading (hours, :00 and :30 / :15) & calendar duration
 */
const tplTimeAndCalendar: ParameterizedTemplate = {
	id: '2ap_t2_time_clock_calendar',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'measurement',
	titleAr: 'الساعة (تحديد الأوقات)، قياس المدد والرزنامة',
	curriculumLessonId: 'lesson_2ap_t2_time_clock_calendar',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + 4);

		let isEvening = false;
		let h12 = 8;
		let min = 0;

		if (difficulty === 'easy') {
			isEvening = false;
			h12 = rng.int(7, 11);
			min = 0;
		} else if (difficulty === 'medium') {
			isEvening = rng.int(0, 1) === 1;
			h12 = isEvening ? rng.int(1, 8) : rng.int(7, 11);
			min = 30;
		} else {
			isEvening = rng.int(0, 1) === 1;
			h12 = isEvening ? rng.int(1, 9) : rng.int(7, 11);
			min = rng.pick([15, 30]);
		}

		const h24 = isEvening ? h12 + 12 : h12;
		const timeStr = `${pad2(h24)}:${pad2(min)}`;
		const periodLabel = isEvening ? 'مساءً' : 'صباحاً';

		const startDayIdx = rng.int(0, 6);
		const daysDelta = rng.int(2, difficulty === 'easy' ? 3 : 5);
		const endDayIdx = (startDayIdx + daysDelta) % 7;
		const startDay = DAYS_OF_WEEK_AR[startDayIdx];
		const endDay = DAYS_OF_WEEK_AR[endDayIdx];

		const clockSvg = svgAnalogClock(h24, min);
		const imgPath = saveSvgAsset(`2ap-t2-t4-s${seed}-${difficulty}`, clockSvg);

		const isCalendarQuiz = seed % 3 === 2;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (!isCalendarQuiz) {
			const otherPeriodH = isEvening ? h24 - 12 : h24 + 12;
			const wrongMinFromDial = min === 0 ? 12 : min / 5; // e.g. 6->:06, 3->:03, 12->:12
			const nextH = h24 === 23 ? 0 : h24 + 1;

			const { options, correctIndices } = buildUniqueMcqOptions(
				`$${timeStr}$`,
				[
					{
						text: `$${pad2(otherPeriodH)}:${pad2(min)}$`,
						diagnosticFeedback: `انتبه إلى الفترة (${periodLabel})! في المساء نضيف $12$ إلى عدد الساعات.`
					},
					{
						text: `$${pad2(h24)}:${pad2(wrongMinFromDial)}$`,
						diagnosticFeedback:
							'عقرب الدقائق الطويل يشير إلى الدقائق (كل عدد يضرب في $5$ : العدد $3$ يعني $15$ دقيقة، والعدد $6$ يعني $30$ دقيقة، والعدد $12$ يعني $00$ ).'
					},
					{
						text: `$${pad2(nextH)}:${pad2(min)}$`,
						diagnosticFeedback:
							'راقب العقرب القصير الأحمر (الساعات): لم يتجاوز بعد إلى الساعة الموالية.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `تشير الساعة ذات العقارب إلى توقيت **${periodLabel}**. ما هو التوقيت الرقمي الموافق لها ؟`,
				questionTextAr: `تشير الساعة ذات العقارب إلى توقيت **${periodLabel}**. ما هو التوقيت الرقمي الموافق لها ؟`,
				imageUrl: imgPath,
				imageCaption: `الساعة (${periodLabel})`,
				questionData: { options, correctIndices },
				explanation: `يشير عقرب الساعات إلى $${h12}$ ( ${periodLabel} = $${h24}$ )، ويشير عقرب الدقائق إلى $${min}$ دقيقة، إذن الساعة هي $${timeStr}$ .`
			};
			finalAnswer = timeStr;
			hints = [
				'العقرب الأحمر القصير يدل على الساعات، والعقرب الأزرق الطويل يدل على الدقائق.',
				isEvening
					? `لأن التوقيت مساءً، نضيف $12$ إلى رقم الساعة ( $${h12} + 12 = ${h24}$ ).`
					: `التوقيت صباحاً، لذا رقم الساعات يبقى كما هو ( $${pad2(h24)}$ ).`,
				min === 0
					? 'عقرب الدقائق على $12$ يعني تماماً ( $:00$ ).'
					: min === 15
						? 'عقرب الدقائق على $3$ يعني ربع ساعة ( $:15$ ).'
						: 'عقرب الدقائق على $6$ يعني نصف ساعة ( $:30$ ).'
			];
			solutionStepsAr = [
				`نقرأ الساعات من العقرب الأحمر القصير: ${h12} (${periodLabel} توافق ${pad2(h24)}).`,
				`نقرأ الدقائق من العقرب الأزرق الطويل: ${pad2(min)} دقيقة.`,
				`إذن التوقيت الرقمي الصحيح هو: ${timeStr}.`
			];
		} else {
			const { options, correctIndices } = buildUniqueMcqOptions(
				endDay,
				[
					{
						text: DAYS_OF_WEEK_AR[(endDayIdx + 6) % 7],
						diagnosticFeedback: 'لقد حسبت يوماً أقل! عدّ الأيام بعد اليوم الأول خطوة بخطوة.'
					},
					{
						text: DAYS_OF_WEEK_AR[(endDayIdx + 1) % 7],
						diagnosticFeedback: 'لقد أضفت يوماً زائداً! ابدأ العد من اليوم التالي لليوم المذكور.'
					},
					{
						text: DAYS_OF_WEEK_AR[(endDayIdx + 2) % 7],
						diagnosticFeedback: 'راجع ترتيب أيام الأسبوع السبعة بدقة.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `إذا كان اليوم هو **${startDay}** ، فما اسم اليوم بعد **${daysDelta}** أيام ؟`,
				questionTextAr: `إذا كان اليوم هو **${startDay}** ، فما اسم اليوم بعد **${daysDelta}** أيام ؟`,
				questionData: { options, correctIndices },
				explanation: `نعدّ ${daysDelta} أيام انطلاقاً من ${startDay}، فنصل إلى يوم **${endDay}**.`
			};
			finalAnswer = endDay;
			hints = [
				'اذكر أيام الأسبوع بالترتيب: الأحد، الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت.',
				`ابدأ العدّ بعد يوم ${startDay} (اليوم الأول بعده هو ${DAYS_OF_WEEK_AR[(startDayIdx + 1) % 7]}).`,
				`تقدّم بمقدار ${daysDelta} أيام لتجد اليوم المطلوب.`
			];
			solutionStepsAr = [
				`ننطلق من يوم ${startDay} ونعدّ ${daysDelta} أيام متتالية:`,
				`نصل إلى يوم ${endDay}.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t4-${seed}-${difficulty}`,
			points: 2,
			instruction: 'أجب عن سؤالي الساعة والرزنامة:',
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1- لاحظ الساعة المقابلة واكتب التوقيت الرقمي الموافق لها (${periodLabel}):\n\nالساعة هي: ........ : ........`,
							answer: `1- التوقيت الرقمي (${periodLabel}): \u2066${timeStr}\u2069`,
							mark: '1'
						},
						{
							type: 'image',
							src: imgPath,
							caption: `التوقيت (${periodLabel})`
						}
					]
				},
				{
					type: 'text',
					content: `2- في الرزنامة: إذا كان اليوم هو ${startDay}، فما هو اليوم بعد ${daysDelta} أيام؟\n\nاليوم هو: ........................\n\n- أكمل: $1$ يوم $= dots$ ساعة ، و $1$ ساعة $= dots$ دقيقة.`,
					answer: `2- اليوم بعد ${daysDelta} أيام هو: ${endDay}.\n\n- $1$ يوم $= 24$ ساعة ، و $1$ ساعة $= 60$ دقيقة.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: '2ap_t2_time_clock_calendar',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'measurement',
			titleAr: tplTimeAndCalendar.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

/**
 * 5) Right angle & plane shapes (المربع، المستطيل، المثلث القائم)
 */
const tplRightAngleShapes: ParameterizedTemplate = {
	id: '2ap_t2_right_angle_plane_shapes',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'الزاوية القائمة والأشكال المستوية المألوفة',
	curriculumLessonId: 'lesson_2ap_t2_right_angle_plane_shapes',
	defaultPoints: 2,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 257 + 5);
		const vertexSets: [string, string, string, string][] = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['K', 'L', 'M', 'N']
		];
		const vertices = rng.pick(vertexSets);
		const shapeName = vertices.join('');
		const typstShape = `"${shapeName}"`;
		const len = rng.int(5, 12);
		const wid = rng.int(2, len - 2);

		const rectSvg = svgRectangle({
			lengthLabel: `${len} cm`,
			widthLabel: `${wid} cm`,
			shapeLabel: 'مستطيل',
			vertices
		});
		const imgPath = saveSvgAsset(`2ap-t2-t5-s${seed}-${difficulty}`, rectSvg);

		interface TfStatement {
			quizQ: string;
			typstQ: string;
			isTrue: boolean;
			correctionTypst: string;
			explanationKaTeX: string;
		}

		const pools: Record<Difficulty, TfStatement[]> = {
			easy: [
				{
					quizQ: `الشكل $${shapeName}$ المرسوم هو مستطيل، وله $4$ زوايا قائمة.`,
					typstQ: `الشكل $${typstShape}$ المرسوم هو مستطيل، وله $4$ زوايا قائمة.`,
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: `نعم، المستطيل $${shapeName}$ شكل مستوٍ له $4$ زوايا قائمة.`
				},
				{
					quizQ: 'للتحقق من الزاوية القائمة في الشكل نستعمل المسطرة فقط دون الكوس.',
					typstQ: 'للتحقق من الزاوية القائمة في الشكل نستعمل المسطرة فقط دون الكوس.',
					isTrue: false,
					correctionTypst: 'للتحقق من الزاوية القائمة نستعمل الكوس.',
					explanationKaTeX: 'خطأ! الأداة الهندسية المناسبة للتحقق من الزاوية القائمة هي **الكوس**.'
				},
				{
					quizQ: `للمستطيل $${shapeName}$ المرسوم $4$ أضلاع و $4$ رؤوس.`,
					typstQ: `للمستطيل $${typstShape}$ المرسوم $4$ أضلاع و $4$ رؤوس.`,
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: 'نعم، المستطيل رباعي له $4$ أضلاع و $4$ رؤوس.'
				},
				{
					quizQ: 'المثلث القائم ليس له أي زاوية قائمة.',
					typstQ: 'المثلث القائم ليس له أي زاوية قائمة.',
					isTrue: false,
					correctionTypst: 'للمثلث القائم زاوية قائمة واحدة.',
					explanationKaTeX: 'خطأ! المثلث القائم يتميز بوجود **زاوية قائمة واحدة**.'
				}
			],
			medium: [
				{
					quizQ: 'للمربع $4$ أضلاع متقايسة الطول و $4$ زوايا قائمة.',
					typstQ: 'للمربع $4$ أضلاع متقايسة الطول و $4$ زوايا قائمة.',
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: 'نعم، كل أضلاع المربع الأربعة متقايسة وله $4$ زوايا قائمة.'
				},
				{
					quizQ: `في المستطيل $${shapeName}$ المرسوم (طوله $${len}\\text{ cm}$ وعرضه $${wid}\\text{ cm}$ )، جميع أضلاعه الأربعة متقايسة.`,
					typstQ: `في المستطيل $${typstShape}$ المرسوم (طوله \u2066${len} cm\u2069 وعرضه \u2066${wid} cm\u2069)، جميع أضلاعه الأربعة متقايسة.`,
					isTrue: false,
					correctionTypst: `في المستطيل كل ضلعين متقابلين متقايسان فقط (\u2066${len} cm\u2069 و \u2066${wid} cm\u2069).`,
					explanationKaTeX: `خطأ! في المستطيل كل ضلعين متقابلين متقايسان، أما هنا فطول الضلعين المتجاورين مختلف ( $${len} \\neq ${wid}$ ).`
				},
				{
					quizQ: 'للمثلث القائم $3$ أضلاع و $3$ رؤوس وزاوية قائمة واحدة.',
					typstQ: 'للمثلث القائم $3$ أضلاع و $3$ رؤوس وزاوية قائمة واحدة.',
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: 'نعم، للمثلث القائم $3$ أضلاع و $3$ رؤوس وزاوية قائمة واحدة.'
				},
				{
					quizQ: 'للمربع زاويتان قائمتان فقط.',
					typstQ: 'للمربع زاويتان قائمتان فقط.',
					isTrue: false,
					correctionTypst: 'للمربع $4$ زوايا قائمة.',
					explanationKaTeX: 'خطأ! للمربع $4$ زوايا قائمة نتحقق منها بالكوس.'
				}
			],
			hard: [
				{
					quizQ: `في المستطيل $${shapeName}$ المرسوم، مجموع طول الضلع الطويل والضلع القصير هو $${len + wid}\\text{ cm}$ .`,
					typstQ: `في المستطيل $${typstShape}$ المرسوم، مجموع طول الضلع الطويل والضلع القصير هو \u2066${len + wid} cm\u2069.`,
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: `نعم، الطول $${len}\\text{ cm}$ والعرض $${wid}\\text{ cm}$ ، ومجموعهما $${len} + ${wid} = ${len + wid}\\text{ cm}$ .`
				},
				{
					quizQ: `في المستطيل $${shapeName}$ المرسوم توجد $3$ زوايا قائمة فقط.`,
					typstQ: `في المستطيل $${typstShape}$ المرسوم توجد $3$ زوايا قائمة فقط.`,
					isTrue: false,
					correctionTypst: 'للمستطيل $4$ زوايا قائمة.',
					explanationKaTeX: 'خطأ! للمستطيل $4$ زوايا قائمة في رؤوسه الأربعة.'
				},
				{
					quizQ: 'نستعمل الكوس للتحقق من الزاوية القائمة في المربع والمستطيل والمثلث القائم.',
					typstQ: 'نستعمل الكوس للتحقق من الزاوية القائمة في المربع والمستطيل والمثلث القائم.',
					isTrue: true,
					correctionTypst: 'العبارة صحيحة.',
					explanationKaTeX: 'نعم، الكوس هو الأداة المستعملة للتحقق من كل زاوية قائمة.'
				},
				{
					quizQ: 'المستطيل شكل له $3$ أضلاع، بينما للمثلث القائم $4$ أضلاع.',
					typstQ: 'المستطيل شكل له $3$ أضلاع، بينما للمثلث القائم $4$ أضلاع.',
					isTrue: false,
					correctionTypst: 'المستطيل له $4$ أضلاع والمثلث القائم له $3$ أضلاع.',
					explanationKaTeX: 'خطأ! العكس هو الصحيح: للمستطيل $4$ أضلاع وللمثلث القائم $3$ أضلاع.'
				}
			]
		};

		const pool = pools[difficulty];
		const chosenIdx = seed % pool.length;
		const chosen = pool[chosenIdx];

		// Pick 3 statements for the Typst True/False block (including the chosen one + 2 others)
		const otherStmts = pool.filter((_, i) => i !== chosenIdx).slice(0, 2);
		const tfItems = [chosen, ...otherStmts];
		const marks = ['0.75', '0.75', '0.5'];

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t5-${seed}-${difficulty}`,
			points: 2,
			instruction: 'لاحظ الشكل المقابل وأجب بـ (صحيح) أو (خطأ) مع تصحيح الخطأ:',
			content: [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'true_false',
							items: tfItems.map((st, idx) => ({
								q: st.typstQ,
								a: st.isTrue ? 'صحيح' : 'خطأ',
								c: st.correctionTypst,
								mark: marks[idx]
							}))
						},
						{
							type: 'image',
							src: imgPath,
							caption: `المستطيل ${shapeName}`
						}
					]
				}
			]
		};

		return {
			templateId: '2ap_t2_right_angle_plane_shapes',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
			titleAr: tplRightAngleShapes.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: chosen.quizQ,
				questionTextAr: chosen.quizQ,
				imageUrl: imgPath,
				imageCaption: `الشكل المستوي ${shapeName}`,
				questionData: { correctAnswer: chosen.isTrue },
				explanation: chosen.explanationKaTeX
			},
			sujetExercise,
			hints: [
				'استحضر خصائص الأشكال المألوفة: عدد الأضلاع وعدد الرؤوس وعدد الزوايا القائمة.',
				'للتحقق من وجود زاوية قائمة نستعمل الكوس دائماً.',
				'للمربع والمستطيل $4$ زوايا قائمة، وللمثلث القائم زاوية قائمة واحدة فقط.'
			],
			solutionStepsAr: [
				`الشكل المرسوم هو المستطيل $${shapeName}$ طوله $${len}\\text{ cm}$ وعرضه $${wid}\\text{ cm}$ .`,
				chosen.explanationKaTeX,
				`الإجابة الصحيحة: ${chosen.isTrue ? 'صحيح' : 'خطأ'}.`
			],
			finalAnswer: chosen.isTrue ? 'صحيح' : 'خطأ'
		};
	}
};

/**
 * 6) Integration: Simple Algerian market/school word problem with DA currency < 1000
 */
const tplIntegrationMarketSchool: ParameterizedTemplate = {
	id: '2ap_t2_integration_market_school_da',
	grade: '2ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: الشراء والمبادلة بالدينار الجزائري',
	curriculumLessonId: 'lesson_2ap_t2_integration',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 307 + 6);

		const contexts = [
			{
				buyer: 'أمين',
				boughtVerb: 'اشترى',
				hasVerb: 'يملك',
				withPron: 'معه',
				paidVerb: 'دفع',
				place: 'المكتبة المدرسية',
				item1: 'كراساً',
				item2: 'مقلمة'
			},
			{
				buyer: 'سلمى',
				boughtVerb: 'اشترت',
				hasVerb: 'تملك',
				withPron: 'معها',
				paidVerb: 'دفعت',
				place: 'المكتبة',
				item1: 'كتاباً',
				item2: 'علبة ألوان'
			},
			{
				buyer: 'ياسين',
				boughtVerb: 'اشترى',
				hasVerb: 'يملك',
				withPron: 'معه',
				paidVerb: 'دفع',
				place: 'السوق',
				item1: 'كيلوغراماً من التفاح',
				item2: 'كيلوغراماً من البرتقال'
			},
			{
				buyer: 'مريم',
				boughtVerb: 'اشترت',
				hasVerb: 'تملك',
				withPron: 'معها',
				paidVerb: 'دفعت',
				place: 'المتجر',
				item1: 'لوحة للكتابة',
				item2: 'علبة أقلام'
			}
		] as const;

		const ctx = rng.pick(contexts);

		let p1 = 0;
		let p2 = 0;
		let totalCost = 0;
		let step2Left = 0;
		let step2Right = 0;
		let finalVal = 0;
		let storyTypst = '';
		let storyKaTeX = '';
		let step2QuestionText = '';
		let step2AnswerTypst = '';
		let step2PromptOnly = '';
		let forgotCarryFinal = 0;
		let wrongAddStep2 = 0;

		if (difficulty === 'easy' || difficulty === 'medium') {
			// Step 1: 2-digit + 2-digit with ones carry (sum in 30..89)
			const u1 = rng.int(2, 8);
			const u2 = rng.int(10 - u1, 9);
			const t1 = rng.int(1, 4);
			const t2 = rng.int(1, 7 - t1);
			p1 = t1 * 10 + u1;
			p2 = t2 * 10 + u2;
			totalCost = p1 + p2; // 30..89

			const totalU = totalCost % 10;
			const totalT = Math.floor(totalCost / 10);
			const wh = difficulty === 'easy' ? 1 : rng.int(2, 6);
			const wt = rng.int(totalT, 9);
			const wu = rng.int(totalU, 9);
			const wallet = wh * 100 + wt * 10 + wu; // 130..699

			step2Left = wallet;
			step2Right = totalCost;
			finalVal = wallet - totalCost; // no borrowing

			forgotCarryFinal = wallet - (totalCost - 10);
			wrongAddStep2 = wallet + totalCost <= 999 ? wallet + totalCost : finalVal + 20;

			storyTypst = `${ctx.hasVerb} ${ctx.buyer} مبلغ \u2066${wallet} DA\u2069 ، ذهب إلى ${ctx.place} ف${ctx.boughtVerb} ${ctx.item1} بـ \u2066${p1} DA\u2069 و${ctx.item2} بـ \u2066${p2} DA\u2069.`;
			storyKaTeX = `${ctx.hasVerb} ${ctx.buyer} مبلغ $${wallet}\\text{ DA}$ ، ذهب إلى ${ctx.place} ف${ctx.boughtVerb} ${ctx.item1} بـ $${p1}\\text{ DA}$ و${ctx.item2} بـ $${p2}\\text{ DA}$ .`;
			step2QuestionText = `كم ديناراً بقي ${ctx.withPron} ؟`;
			step2PromptOnly = `2- كم ديناراً بقي ${ctx.withPron}؟`;
			step2AnswerTypst = `بقي ${ctx.withPron}: \u2066${finalVal} DA\u2069.`;
		} else {
			// hard: Step 1 is 3-digit + 3-digit with double carry (totalCost in 322..888)
			// Step 2 is 2-digit discount subtraction without borrowing
			const u1 = rng.int(3, 9);
			const u2 = rng.int(Math.max(10 - u1, 12 - u1), 9); // u1 + u2 in 12..18 -> totalU in 2..8
			const t1 = rng.int(2, 9);
			const t2 = rng.int(Math.max(9 - t1, 11 - t1), 9); // t1 + t2 + 1 in 12..18 -> totalT in 2..8
			const h1 = rng.int(1, 4);
			const h2 = rng.int(1, 7 - h1);

			p1 = h1 * 100 + t1 * 10 + u1;
			p2 = h2 * 100 + t2 * 10 + u2;
			totalCost = p1 + p2; // 322..888

			const totalU = totalCost % 10;
			const totalT = Math.floor((totalCost % 100) / 10);
			const du = rng.int(1, totalU);
			const dt = rng.int(1, totalT);
			const discount = dt * 10 + du;

			step2Left = totalCost;
			step2Right = discount;
			finalVal = totalCost - discount; // 2-digit subtraction without borrowing

			forgotCarryFinal = finalVal - 10;
			wrongAddStep2 = totalCost + discount <= 999 ? totalCost + discount : finalVal + 20;

			storyTypst = `ذهب ${ctx.buyer} إلى ${ctx.place} ف${ctx.boughtVerb} ${ctx.item1} بـ \u2066${p1} DA\u2069 و${ctx.item2} بـ \u2066${p2} DA\u2069. خفّض له البائع مبلغ \u2066${discount} DA\u2069 من الثمن الكلي.`;
			storyKaTeX = `ذهب ${ctx.buyer} إلى ${ctx.place} ف${ctx.boughtVerb} ${ctx.item1} بـ $${p1}\\text{ DA}$ و${ctx.item2} بـ $${p2}\\text{ DA}$ . خفّض له البائع مبلغ $${discount}\\text{ DA}$ من الثمن الكلي.`;
			step2QuestionText = `كم ديناراً ${ctx.paidVerb} للبائع بعد التخفيض ؟`;
			step2PromptOnly = `2- كم ديناراً ${ctx.paidVerb} للبائع بعد التخفيض؟`;
			step2AnswerTypst = `${ctx.paidVerb} للبائع بعد التخفيض: \u2066${finalVal} DA\u2069.`;
		}

		const { options, correctIndices } = buildUniqueMcqOptions(
			`$${finalVal}\\text{ DA}$`,
			[
				{
					text: `$${totalCost}\\text{ DA}$`,
					diagnosticFeedback:
						'انتبه! هذا هو ثمن المشتريات فقط، لم تكمل الخطوة الثانية (عملية الطرح) بعد.'
				},
				{
					text: `$${wrongAddStep2}\\text{ DA}$`,
					diagnosticFeedback: 'في الخطوة الثانية يجب أن نطرح ( $-$ ) وليس أن نجمع ( $+$ )!'
				},
				{
					text: `$${forgotCarryFinal}\\text{ DA}$`,
					diagnosticFeedback: 'راجع عملية الجمع بالاحتفاظ في الخطوة الأولى بدقة.'
				}
			],
			rng
		);

		const quizQuestion: GeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `${storyKaTeX}\n\n${step2QuestionText}`,
			questionTextAr: `${storyKaTeX}\n\n${step2QuestionText}`,
			questionData: { options, correctIndices },
			explanation: `أولاً نحسب ثمن المشتريات: $${p1} + ${p2} = ${totalCost}\\text{ DA}$ . ثانياً نحسب الباقي بالطرح: $${step2Left} - ${step2Right} = ${finalVal}\\text{ DA}$ .`
		};

		const sujetExercise: ExerciseBlock = {
			id: `ex-2ap-t2-t6-${seed}-${difficulty}`,
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: storyTypst,
			content: [
				{
					type: 'text',
					content: `1- احسب ثمن المشتريات.\n\nالعملية: ....................................\n\nثمن المشتريات هو: .................. DA`,
					answer: `1- حساب ثمن المشتريات:\n\n$${p1} + ${p2} = ${totalCost}$\n\nثمن المشتريات هو: \u2066${totalCost} DA\u2069.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `${step2PromptOnly}\n\nالعملية: ....................................\n\nالإجابة: .................................`,
					answer: `2- حساب الجواب:\n\n$${step2Left} - ${step2Right} = ${finalVal}$\n\n${step2AnswerTypst}`,
					mark: '2'
				}
			]
		};

		return {
			templateId: '2ap_t2_integration_market_school_da',
			seed,
			grade: '2ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: tplIntegrationMarketSchool.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				'المسألة تُحلّ على مرحلتين: الجمع أولاً لمعرفة ثمن المشتريات، ثم الطرح.',
				`في المرحلة الأولى اجمع الثمنين بالاحتفاظ: $${p1} + ${p2}$ .`,
				`في المرحلة الثانية اطرح: $${step2Left} - ${step2Right}$ .`
			],
			solutionStepsAr: [
				`1- نحسب ثمن المشتريات بعملية الجمع بالاحتفاظ: $${p1} + ${p2} = ${totalCost}$ DA.`,
				`2- نطرح في المرحلة الثانية: $${step2Left} - ${step2Right} = ${finalVal}$ DA.`,
				`النتيجة النهائية: $${finalVal}$ DA.`
			],
			finalAnswer: `${finalVal} DA`
		};
	}
};

export const TEMPLATES_2AP_T2: ParameterizedTemplate[] = [
	tplNumbersTo999,
	tplAddCarrySubSimple,
	tplCurrencyAndLength,
	tplTimeAndCalendar,
	tplRightAngleShapes,
	tplIntegrationMarketSchool
];
