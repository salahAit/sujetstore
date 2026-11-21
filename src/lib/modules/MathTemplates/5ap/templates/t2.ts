import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { saveSvgAsset, svgNumberLine, svgRectangle, svgTriangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import type { ContentBlock, TableBlock } from '../../../SujetBuilder/types';

function difficultyOffset(difficulty: Difficulty): number {
	return difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
}

function fmtNum(val: number, maxDec = 4): string {
	return String(roundTo(val, maxDec));
}

function decimalAcceptedAnswers(val: number, unit?: string): string[] {
	const base = fmtNum(val, 4);
	const comma = base.replace('.', ',');
	const out = new Set<string>([base, comma]);
	if (unit) {
		out.add(`${base} ${unit}`);
		out.add(`${comma} ${unit}`);
		if (unit === 'دج') {
			out.add(`${base} DA`);
			out.add(`${comma} DA`);
		}
	}
	return [...out];
}

function shiftScaled(intVal: number, decPlaces: number, shiftRight: number): number {
	const newDec = decPlaces - shiftRight;
	if (newDec <= 0) {
		return intVal * Math.pow(10, -newDec);
	}
	return roundTo(intVal / Math.pow(10, newDec), newDec);
}

/** Ensures inline `$...$` delimiters satisfy marked-katex-extension spacing rules with Arabic punctuation. */
function safeKatex(text: string): string {
	const parts = text.split('$');
	if (parts.length < 3 || parts.length % 2 === 0) return text;
	for (let i = 0; i < parts.length - 1; i += 2) {
		if (parts[i].length > 0 && !/\s$/.test(parts[i])) {
			parts[i] += ' ';
		}
		const next = parts[i + 2];
		if (next.length > 0 && !/^[\s.!?:]/.test(next)) {
			parts[i + 2] = ' ' + next;
		}
	}
	return parts.join('$');
}

function withSafeKatex(tpl: ParameterizedTemplate): ParameterizedTemplate {
	return {
		...tpl,
		generate(seed, difficulty) {
			const inst = tpl.generate(seed, difficulty);
			const q = inst.quizQuestion;
			const qd = { ...q.questionData };
			if (q.type === 'mcq' && Array.isArray(qd.options)) {
				qd.options = qd.options.map((o: any) => ({
					...o,
					text: typeof o.text === 'string' ? safeKatex(o.text) : o.text,
					...(o.diagnosticFeedback ? { diagnosticFeedback: safeKatex(o.diagnosticFeedback) } : {})
				}));
			}
			return {
				...inst,
				quizQuestion: {
					...q,
					questionText: safeKatex(q.questionText),
					...(q.questionTextAr ? { questionTextAr: safeKatex(q.questionTextAr) } : {}),
					explanation: safeKatex(q.explanation),
					questionData: qd
				},
				hints: [safeKatex(inst.hints[0]), safeKatex(inst.hints[1]), safeKatex(inst.hints[2])],
				solutionStepsAr: inst.solutionStepsAr.map(safeKatex)
			};
		}
	};
}

/**
 * 1) القسمة الإقليدية (المقسوم = القاسم × الحاصل + الباقي، وحصر الحاصل)
 */
const t2EuclideanDivision: ParameterizedTemplate = {
	id: '5ap-t2-euclidean-division',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'القسمة الإقليدية وحصر الحاصل',
	curriculumLessonId: 'lesson_5ap_t2_euclidean_division',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 131 + difficultyOffset(difficulty));

		let b: number;
		let q: number;
		if (difficulty === 'easy') {
			b = rng.int(3, 9);
			q = rng.int(12, 48);
		} else if (difficulty === 'medium') {
			b = rng.int(12, 24);
			q = rng.int(12, 68);
		} else {
			b = rng.int(15, 36);
			q = rng.int(105, 245);
		}
		const r = rng.int(1, b - 1);
		const a = b * q + r;

		const powLow = q < 10 ? 1 : q < 100 ? 10 : 100;
		const powHigh = powLow * 10;
		const lowBound = b * powLow;
		const highBound = b * powHigh;
		const digitsLabel = q < 10 ? 'رقم واحد' : q < 100 ? 'رقمين' : '3 أرقام';

		const ctx = rng.pick([
			{ item: 'حبة حلوى', container: 'علب', perContainer: 'علبة', verb: 'توزيع' },
			{ item: 'قلما', container: 'حزم', perContainer: 'حزمة', verb: 'تجميع' },
			{ item: 'كراسا', container: 'رزم', perContainer: 'رزمة', verb: 'ترتيب' },
			{ item: 'كتابا', container: 'رفوف', perContainer: 'رف', verb: 'تنظيم' }
		]);

		const variant = ((seed - 1) % 3 + 3) % 3;

		let questionText: string;
		let displayTemplate: string;
		let expectedAnswer: number;
		let finalAnswer: string;
		let sujetContent: ContentBlock[];
		let instruction: string;

		if (variant === 0) {
			expectedAnswer = q;
			finalAnswer = String(q);
			questionText = `أراد بائع ${ctx.verb} $${a}$ ${ctx.item} بالتساوي في ${ctx.container} تتسع كل ${ctx.perContainer} لـ $${b}$. أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$ ثم اكتب **الحاصل** (عدد الـ${ctx.container} الكاملة).`;
			displayTemplate = `${a} ÷ ${b}`;
			instruction = `أراد بائع ${ctx.verb} $${a}$ ${ctx.item} بالتساوي في ${ctx.container} تتسع كل ${ctx.perContainer} لـ $${b}$:`;
			sujetContent = [
				{
					type: 'text',
					content: `1) احصر العدد $${a}$ بين مضاعفين متتاليين للعدد $${b}$ مضروبا في قوى $10$، ثم استنتج عدد أرقام حاصل القسمة.`,
					answer: `1) الحصر: $${lowBound} <= ${a} < ${highBound}$ أي $${b} times ${powLow} <= ${a} < ${b} times ${powHigh}$، إذن الحاصل يتكون من ${digitsLabel}.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$ عموديا ثم أكمل المساواة: $${a} = ${b} times "..." + "..."$`,
					answer: `2) الحاصل هو $${q}$ والباقي هو $${r}$ (مع $${r} < ${b}$)، والمساواة: $${a} = ${b} times ${q} + ${r}$.`,
					mark: '1'
				}
			];
		} else if (variant === 1) {
			expectedAnswer = r;
			finalAnswer = String(r);
			questionText = `تم ${ctx.verb} $${a}$ ${ctx.item} بالتساوي في ${ctx.container} سعة كل ${ctx.perContainer} $${b}$. أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$ ثم اكتب **الباقي** (عدد القطع المتبقية دون تعبئة).`;
			displayTemplate = `${a} ÷ ${b}`;
			instruction = `تم ${ctx.verb} $${a}$ ${ctx.item} بالتساوي في ${ctx.container} سعة كل ${ctx.perContainer} $${b}$:`;
			sujetContent = [
				{
					type: 'text',
					content: `1) حدد عدد أرقام حاصل القسمة باستعمال الحصر قبل إجراء العملية.`,
					answer: `1) بما أن $${b} times ${powLow} <= ${a} < ${b} times ${powHigh}$، فإن الحاصل يتكون من ${digitsLabel}.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `2) أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$، ثم جد عدد الـ${ctx.container} الكاملة والباقي واكتب المساواة الموافقة.`,
					answer: `2) عدد الـ${ctx.container} الكاملة (الحاصل) هو $${q}$ والباقي هو $${r}$، والمساواة: $${a} = ${b} times ${q} + ${r}$.`,
					mark: '1'
				}
			];
		} else {
			expectedAnswer = a;
			finalAnswer = String(a);
			questionText = `في قسمة إقليدية، القاسم هو $${b}$، والحاصل هو $${q}$، والباقي هو $${r}$. احسب **المقسوم**.`;
			displayTemplate = `${b} × ${q} + ${r} = ?`;
			instruction = `في قسمة إقليدية، القاسم هو $${b}$، والحاصل هو $${q}$، والباقي هو $${r}$:`;
			sujetContent = [
				{
					type: 'text',
					content: `1) تحقق من أن الباقي أصغر من القاسم، ثم احسب المقسوم بوضع العملية المناسبة.`,
					answer: `1) لدينا $${r} < ${b}$، والمقسوم يساوي: $${b} times ${q} + ${r} = ${b * q} + ${r} = ${a}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) اكتب المساواة المعبرة عن هذه القسمة الإقليدية.`,
					answer: `2) المساواة هي: $${a} = ${b} times ${q} + ${r}$.`,
					mark: '0.5'
				}
			];
		}

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				questionData: {
					answer: expectedAnswer,
					displayTemplate,
					variables: [],
					tolerance: 0
				},
				explanation: `نطبق علاقة القسمة الإقليدية: المقسوم = القاسم × الحاصل + الباقي، حيث الباقي أصغر تماما من القاسم: $${a} = ${b} \\times ${q} + ${r}$ لأن $${r} < ${b}$.`
			},
			sujetExercise: {
				points: 1.5,
				instruction,
				content: sujetContent
			},
			hints: [
				variant === 2
					? `تذكر القاعدة الأساسية: المقسوم = (القاسم × الحاصل) + الباقي.`
					: `ابدأ بحصر المقسوم $${a}$ بين $${b} \\times ${powLow} = ${lowBound}$ و $${b} \\times ${powHigh} = ${highBound}$ لمعرفة عدد أرقام الحاصل (${digitsLabel}).`,
				variant === 2
					? `احسب أولا الجداء $${b} \\times ${q} = ${b * q}$، ثم أضف الباقي $${r}$.`
					: `أنشئ جدول مضاعفات القاسم $${b}$ ليساعدك في إيجاد أكبر مضاعف لا يتجاوز المقسوم في كل مرحلة من القسمة العمودية.`,
				`تحقق دائما في النهاية من أن $${b} \\times ${q} + ${r} = ${a}$ وأن الباقي $${r}$ أصغر تماما من القاسم $${b}$.`
			],
			solutionStepsAr: [
				`حصر الحاصل: $${b} \\times ${powLow} = ${lowBound} \\le ${a} < ${highBound} = ${b} \\times ${powHigh}$، إذن الحاصل مكون من ${digitsLabel}.`,
				variant === 2
					? `حساب المقسوم: $${b} \\times ${q} = ${b * q}$، ثم $${b * q} + ${r} = ${a}$.`
					: `إنجاز القسمة الإقليدية للعدد $${a}$ على $${b}$ يعطي الحاصل $${q}$ والباقي $${r}$.`,
				`التحقق: $${r} < ${b}$ و $${b} \\times ${q} + ${r} = ${a}$.`
			],
			finalAnswer
		};
	}
};

/**
 * 2) المستقيم المدرج والمقارنة وجمع وطرح الأعداد العشرية (مع مموهات محاذاة الفاصلة)
 */
const t2DecimalNumberLine: ParameterizedTemplate = {
	id: '5ap-t2-decimal-number-line-ops',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الأعداد العشرية على المستقيم المدرج والجمع والطرح',
	curriculumLessonId: 'lesson_5ap_t2_decimal_number_line_compare_decompose',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 157 + difficultyOffset(difficulty));

		let min: number;
		let max: number;
		let step: number;
		let valA: number;
		let valB: number;
		let questionText: string;
		let correctNum: number;
		let distractors: { text: string; diagnosticFeedback: string }[];
		let sujetOpContent: string;
		let sujetOpAnswer: string;
		let steps: string[];

		if (difficulty === 'easy') {
			const baseInt = rng.int(1, 5);
			min = baseInt;
			max = baseInt + 3;
			step = 1;
			const aT = rng.pick([2, 3, 4, 6, 7, 8, 9, 12, 13, 14]);
			const bT = rng.pick([16, 17, 18, 22, 23, 24, 26, 27, 28]);
			valA = roundTo(baseInt + aT / 10, 1);
			valB = roundTo(baseInt + bT / 10, 1);

			const isAdd = seed % 2 === 0;
			if (isAdd) {
				const nat = rng.int(2, 7);
				correctNum = roundTo(valA + nat, 1);
				const misalign = roundTo(valA + nat / 10, 1);
				const readWrongPoint = roundTo(valB + nat, 1);
				const offByOne = roundTo(valA + nat + 1, 1);
				questionText = `لاحظ المستقيم المدرج التالي، اقرأ فاصلة النقطة $A$ ثم احسب المجموع: $A + ${nat}$`;
				distractors = [
					{
						text: fmtNum(misalign, 1),
						diagnosticFeedback: `أخطأت في محاذاة الفاصلة! العدد الطبيعي $${nat}$ يساوي $${nat}.0$ فيُجمع مع الجزء الصحيح ($${Math.floor(valA)}$) وليس مع رقم الأعشار.`
					},
					{
						text: fmtNum(readWrongPoint, 1),
						diagnosticFeedback: `قرأت فاصلة النقطة $B$ ($${valB}$) بدل النقطة $A$ ($${valA}$).`
					},
					{
						text: fmtNum(offByOne, 1),
						diagnosticFeedback: `تأكد من جمع الأجزاء الصحيحة والأجزاء العشرية بعد محاذاة الفاصلة تحت الفاصلة.`
					}
				];
				sujetOpContent = `2) ضع ثم أنجز العملية عموديا: $${valA} + ${nat}$`;
				sujetOpAnswer = `2) $${valA} + ${nat}.0 = ${fmtNum(correctNum, 1)}$.`;
				steps = [
					`قراءة الفواصل من المستقيم المدرج: كل تدريجة صغيرة تمثل $0.1$، إذن $A = ${valA}$ و $B = ${valB}$.`,
					`لجمع العدد العشري $${valA}$ مع العدد الطبيعي $${nat}$ نكتب $${nat} = ${nat}.0$ مع وضع الفاصلة تحت الفاصلة.`,
					`النتيجة: $${valA} + ${nat}.0 = ${fmtNum(correctNum, 1)}$.`
				];
			} else {
				const nat = rng.int(1, baseInt + 1);
				correctNum = roundTo(valB - nat, 1);
				const misalign = roundTo(valB - nat / 10, 1);
				const addedInstead = roundTo(valB + nat, 1);
				const offByTenth = roundTo(Math.max(0.2, correctNum - 0.1), 1);
				questionText = `لاحظ المستقيم المدرج التالي، اقرأ فاصلة النقطة $B$ ثم احسب الفرق: $B - ${nat}$`;
				distractors = [
					{
						text: fmtNum(misalign, 1),
						diagnosticFeedback: `أخطأت في محاذاة الفاصلة! العدد الطبيعي $${nat}$ يوضع تحت الجزء الصحيح للعدد $${valB}$ وليس تحت رقم الأعشار.`
					},
					{
						text: fmtNum(addedInstead, 1),
						diagnosticFeedback: `انتبه! العملية المطلوبة هي الطرح ($-$) وليس الجمع ($+$).`
					},
					{
						text: fmtNum(offByTenth, 1),
						diagnosticFeedback: `تحقق من قراءة فاصلة النقطة $B$ بدقة على التدريجات ($B = ${valB}$).`
					}
				];
				sujetOpContent = `2) ضع ثم أنجز العملية عموديا: $${valB} - ${nat}$`;
				sujetOpAnswer = `2) $${valB} - ${nat}.0 = ${fmtNum(correctNum, 1)}$.`;
				steps = [
					`قراءة الفواصل من المستقيم المدرج: $A = ${valA}$ و $B = ${valB}$.`,
					`نكتب العدد الطبيعي $${nat}$ على الشكل $${nat}.0$ ونحاذي الفاصلة تحت الفاصلة.`,
					`النتيجة: $${valB} - ${nat}.0 = ${fmtNum(correctNum, 1)}$.`
				];
			}
		} else if (difficulty === 'medium') {
			const baseInt = rng.int(1, 7);
			const baseTenth = rng.int(1, 5);
			min = roundTo(baseInt + baseTenth / 10, 1);
			max = roundTo(min + 0.4, 1);
			step = 0.1;
			const h = rng.int(2, 8);
			valA = roundTo(min + 0.1, 1);
			valB = roundTo(min + 0.3 + h / 100, 2);

			const aTenthsDigit = Math.round(valA * 10) % 10;
			const isAdd = seed % 2 === 0;
			if (isAdd) {
				correctNum = roundTo(valA + valB, 2);
				const misalign = roundTo(Math.floor(valA) + aTenthsDigit / 100 + valB, 2);
				const diffInstead = roundTo(valB - valA, 2);
				const offByTenth = roundTo(correctNum + 0.1, 2);
				questionText = `لاحظ المستقيم المدرج التالي، اقرأ فاصلتي $A$ و $B$ ثم احسب المجموع: $A + B$`;
				distractors = [
					{
						text: fmtNum(misalign, 2),
						diagnosticFeedback: `خطأ في محاذاة الفاصلة! الرقم $${aTenthsDigit}$ في $${valA}$ هو رقم الأعشار ($${valA}0$) وليس الأجزاء من مئة.`
					},
					{
						text: fmtNum(diffInstead, 2),
						diagnosticFeedback: `حسبت الفرق ($B - A$) بدل المجموع ($A + B$)! انتبه للعملية المطلوبة.`
					},
					{
						text: fmtNum(offByTenth, 2),
						diagnosticFeedback: `تحقق من قراءة التدريجات ومن الاحتفاظ عند جمع الأعشار.`
					}
				];
				sujetOpContent = `2) ضع ثم أنجز عموديا مع محاذاة الفاصلة: $${valA} + ${valB}$`;
				sujetOpAnswer = `2) نكتب $${valA} = ${valA}0$ ثم نجمع: $${valA}0 + ${valB} = ${fmtNum(correctNum, 2)}$.`;
				steps = [
					`كل تدريجة كبيرة تزيد بـ $0.1$ وكل تدريجة صغيرة تزيد بـ $0.01$، إذن $A = ${valA}$ و $B = ${valB}$.`,
					`للمحاذاة نكتب $${valA}$ على الشكل $${valA}0$ ثم نضع الفاصلة تحت الفاصلة.`,
					`$${valA}0 + ${valB} = ${fmtNum(correctNum, 2)}$.`
				];
			} else {
				correctNum = roundTo(valB - valA, 2);
				const misalign = roundTo(valB - (Math.floor(valA) + aTenthsDigit / 100), 2);
				const sumInstead = roundTo(valA + valB, 2);
				const offByTenth = roundTo(correctNum + 0.1, 2);
				questionText = `لاحظ المستقيم المدرج التالي، اقرأ فاصلتي $A$ و $B$ ثم احسب الفرق: $B - A$`;
				distractors = [
					{
						text: fmtNum(misalign, 2),
						diagnosticFeedback: `خطأ في محاذاة الفاصلة! في العدد $${valA}$ الرقم $${aTenthsDigit}$ يمثل الأعشار ($${valA}0$) ولا يوضع تحت الأجزاء من مئة.`
					},
					{
						text: fmtNum(sumInstead, 2),
						diagnosticFeedback: `قمت بجمع العددين بدل طرحهما! المطلوب هو $B - A$.`
					},
					{
						text: fmtNum(offByTenth, 2),
						diagnosticFeedback: `تحقق من قراءة فاصلتي $A$ و $B$ على المستقيم المدرج بدقة.`
					}
				];
				sujetOpContent = `2) ضع ثم أنجز عموديا مع محاذاة الفاصلة: $${valB} - ${valA}$`;
				sujetOpAnswer = `2) نكتب $${valA} = ${valA}0$ ثم نطرح: $${valB} - ${valA}0 = ${fmtNum(correctNum, 2)}$.`;
				steps = [
					`قراءة الفواصل: $A = ${valA}$ و $B = ${valB}$.`,
					`نضيف صفرا على يمين $${valA}$ ليصبح $${valA}0$ ونضع الفاصلة تحت الفاصلة.`,
					`$${valB} - ${valA}0 = ${fmtNum(correctNum, 2)}$.`
				];
			}
		} else {
			// hard: B has 1 decimal place and is larger than A (which has 2 decimal places) -> B - A requires trailing zero + borrowing!
			const baseInt = rng.int(2, 8);
			const baseTenth = rng.int(1, 5);
			min = roundTo(baseInt + baseTenth / 10, 1);
			max = roundTo(min + 0.4, 1);
			step = 0.1;
			const h = rng.int(2, 8);
			valA = roundTo(min + 0.1 + h / 100, 2);
			valB = roundTo(min + 0.3, 1);

			correctNum = roundTo(valB - valA, 2);
			// Misconception 1: drop down hundredths digit h without borrowing (0.20 + h/100)
			const forgotTrailingZero = roundTo(
				(Math.round(valB * 10) / 10 - Math.floor(valA * 10) / 10) + h / 100,
				2
			);
			// Misconception 2: forgot to decrement tenths after borrowing
			const forgotBorrow = roundTo(correctNum + 0.1, 2);
			// Misconception 3: added instead of subtracted
			const sumInstead = roundTo(valA + valB, 2);

			questionText = `لاحظ المستقيم المدرج التالي، اقرأ فاصلتي $A$ و $B$ ثم احسب الفرق: $B - A$`;
			distractors = [
				{
					text: fmtNum(forgotTrailingZero, 2),
					diagnosticFeedback: `أخطأت لأنك أنزلت رقم الأجزاء من مئة ($${h}$) مباشرة! يجب كتابة $${valB}0$ وإجراء الاستلاف: $10 - ${h} = ${10 - h}$.`
				},
				{
					text: fmtNum(forgotBorrow, 2),
					diagnosticFeedback: `نسيت إنقاص $1$ من رقم الأعشار بعد الاستلاف في مرتبة الأجزاء من مئة!`
				},
				{
					text: fmtNum(sumInstead, 2),
					diagnosticFeedback: `انتبه! حسبت المجموع $A + B$ والمطلوب هو الفرق $B - A$.`
				}
			];
			sujetOpContent = `2) ضع ثم أنجز عموديا: $${valB} - ${valA}$`;
			sujetOpAnswer = `2) نكتب $${valB} = ${valB}0$ ثم ننجز الطرح بالاستلاف: $${valB}0 - ${valA} = ${fmtNum(correctNum, 2)}$.`;
			steps = [
				`قراءة الفواصل: كل تدريجة صغيرة تساوي $0.01$، إذن $A = ${valA}$ و $B = ${valB}$.`,
				`لإنجاز $${valB} - ${valA}$ نكتب $${valB} = ${valB}0$ تحت محاذاة الفاصلة.`,
				`ننجز الطرح بالاستلاف: $${valB}0 - ${valA} = ${fmtNum(correctNum, 2)}$.`
			];
		}

		const svg = svgNumberLine({
			min,
			max,
			step,
			subTicks: 10,
			marks: [
				{ value: valA, label: 'A', color: '#dc2626' },
				{ value: valB, label: 'B', color: '#2563eb' }
			]
		});
		const svgPath = saveSvgAsset(`5ap-t2-numline-${difficulty}-${seed}`, svg);
		const finalStr = fmtNum(correctNum, 2);
		const { options, correctIndices } = buildUniqueMcqOptions(finalStr, distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: 'المستقيم المدرج',
				questionData: {
					options,
					correctIndices
				},
				explanation: steps.join(' ')
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ المستقيم المدرج التالي جيدا ثم أجب عن السؤالين:',
				content: [
					{ type: 'image', src: svgPath, caption: 'المستقيم المدرج' },
					{
						type: 'text',
						content: `1) اقرأ فاصلتي النقطتين $A$ و $B$ ثم قارن بينهما باستعمال الرمز المناسب ($<$ أو $>$).`,
						answer: `1) فاصلة $A$ هي $${valA}$ وفاصلة $B$ هي $${valB}$، والمقارنة: $${valA} < ${valB}$ (أو $${valB} > ${valA}$).`,
						mark: '0.5'
					},
					{
						type: 'text',
						content: sujetOpContent,
						answer: sujetOpAnswer,
						mark: '1'
					}
				]
			},
			hints: [
				`حدد قيمة التدريجة الصغيرة الواحدة: بين كل تدريجتين رئيسيتين متتاليتين توجد $10$ أجزاء متساوية.`,
				`عند قراءة الفاصلتين، ضع الفاصلة تحت الفاصلة وأضف أصفارا على يمين الجزء العشري عند الحاجة لتتساوى المراتب.`,
				`تحقق من عملية الجمع أو الطرح والاستلاف في كل مرتبة (الأجزاء من مئة، الأعشار، ثم الوحدات).`
			],
			solutionStepsAr: steps,
			finalAnswer: finalStr
		};
	}
};

/**
 * 3) الضرب والقسمة على 10، 100، 1000 وضرب عدد عشري في عدد طبيعي
 */
const t2DecimalMulDivPowers10: ParameterizedTemplate = {
	id: '5ap-t2-decimal-mul-div-powers10-natural',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الضرب والقسمة على 10 و100 و1000 وضرب عشري في طبيعي',
	curriculumLessonId: 'lesson_5ap_t2_decimal_mul_div_10_100_1000_natural',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 179 + difficultyOffset(difficulty));

		const decPlaces = rng.pick([1, 2]);
		let intVal = decPlaces === 1 ? rng.int(12, 98) : rng.int(112, 987);
		if (intVal % 10 === 0) intVal += 3;
		const decNum = shiftScaled(intVal, decPlaces, 0);
		const decStr = fmtNum(decNum, decPlaces);

		// Companion values for the second part of the printable sujet exercise
		const auxNat = rng.int(4, 9);
		const auxDecInt = rng.int(23, 87);
		const auxDec = shiftScaled(auxDecInt % 10 === 0 ? auxDecInt + 1 : auxDecInt, 1, 0);
		const auxProd = roundTo(auxDec * auxNat, 1);

		const auxPow = rng.pick([10, 100, 1000]);
		const auxIsMul = seed % 2 === 0;
		const auxPowRes = auxIsMul
			? shiftScaled(intVal, decPlaces, auxPow === 10 ? 1 : auxPow === 100 ? 2 : 3)
			: shiftScaled(intVal, decPlaces, auxPow === 10 ? -1 : auxPow === 100 ? -2 : -3);

		let questionText: string;
		let correctStr: string;
		let distractors: { text: string; diagnosticFeedback: string }[];
		let sujetContent: ContentBlock[];
		let steps: string[];

		const usePowersMode = difficulty === 'easy' || seed % 2 === 0;

		if (usePowersMode) {
			type PowOp = { kind: 'mul' | 'div'; factor: 10 | 100 | 1000; shift: number };
			const opsEasy: PowOp[] = [
				{ kind: 'mul', factor: 10, shift: 1 },
				{ kind: 'mul', factor: 100, shift: 2 },
				{ kind: 'div', factor: 10, shift: -1 },
				{ kind: 'div', factor: 100, shift: -2 }
			];
			const opsMedHard: PowOp[] = [
				{ kind: 'mul', factor: 1000, shift: 3 },
				{ kind: 'div', factor: 100, shift: -2 },
				{ kind: 'div', factor: 1000, shift: -3 },
				{ kind: 'mul', factor: 100, shift: 2 }
			];
			const op = rng.pick(difficulty === 'easy' ? opsEasy : opsMedHard);

			const correctVal = shiftScaled(intVal, decPlaces, op.shift);
			correctStr = fmtNum(correctVal, 5);

			const wrongDirVal = shiftScaled(intVal, decPlaces, -op.shift);
			const offShiftVal = shiftScaled(
				intVal,
				decPlaces,
				op.shift > 0 ? Math.max(1, op.shift - 1 || 2) : Math.min(-1, op.shift + 1 || -2)
			);
			const offShiftAlt =
				offShiftVal === correctVal
					? shiftScaled(intVal, decPlaces, op.shift > 0 ? op.shift + 1 : op.shift - 1)
					: offShiftVal;
			const trailingZeroTrap = `${decStr}${op.factor === 10 ? '0' : '00'}`;

			if (op.kind === 'mul') {
				questionText = `احسب ذهنيا ناتج الضرب: $${decStr} \\times ${op.factor}$`;
				distractors = [
					{
						text: fmtNum(wrongDirVal, 5),
						diagnosticFeedback: `أزحت الفاصلة نحو اليسار بدل اليمين! عند الضرب في $${op.factor}$ يكبر العدد فتُزاح الفاصلة يمينا بمقدار $${op.shift}$ مراتب.`
					},
					{
						text: trailingZeroTrap,
						diagnosticFeedback: `انتبه! إضافة أصفار على يمين الجزء العشري لا تغير قيمة العدد ($${trailingZeroTrap} = ${decStr}$)، بل يجب إزاحة الفاصلة نحو اليمين.`
					},
					{
						text: fmtNum(offShiftAlt, 5),
						diagnosticFeedback: `عدد الأصفار في $${op.factor}$ هو $${op.shift}$، لذا يجب إزاحة الفاصلة نحو اليمين بـ $${op.shift}$ مراتب بالضبط.`
					}
				];
				steps = [
					`عند الضرب في $${op.factor}$ نزيح الفاصلة نحو اليمين بـ $${op.shift}$ مراتب (بعدّ الأصفار).`,
					`نكمل بالأصفار على اليمين إذا لم تكفِ الأرقام، فنجد: $${decStr} \\times ${op.factor} = ${correctStr}$.`
				];
				sujetContent = [
					{
						type: 'text',
						content: `1) احسب ذهنيا: $${decStr} times ${op.factor} = "..."$`,
						answer: `1) $${decStr} times ${op.factor} = ${correctStr}$ (إزاحة الفاصلة يمينا بـ $${op.shift}$ مراتب).`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `2) ضع ثم أنجز عموديا: $${auxDec} times ${auxNat}$`,
						answer: `2) $${auxDec} times ${auxNat} = ${fmtNum(auxProd, 2)}$.`,
						mark: '0.75'
					}
				];
			} else {
				const absShift = Math.abs(op.shift);
				questionText = `احسب ذهنيا حاصل القسمة: $${decStr} \\div ${op.factor}$`;
				const extraZeroVal = shiftScaled(intVal, decPlaces, op.shift - 1);
				const offShiftDiv = shiftScaled(intVal, decPlaces, op.shift === -1 ? -2 : op.shift + 1);
				const extraZeroAlt =
					extraZeroVal === offShiftDiv ? shiftScaled(intVal, decPlaces, op.shift - 2) : extraZeroVal;
				distractors = [
					{
						text: fmtNum(wrongDirVal, 6),
						diagnosticFeedback: `أزحت الفاصلة نحو اليمين بدل اليسار! عند القسمة على $${op.factor}$ يصغر العدد فتُزاح الفاصلة يسارا بمقدار $${absShift}$ مراتب.`
					},
					{
						text: fmtNum(offShiftDiv, 6),
						diagnosticFeedback: `في $${op.factor}$ يوجد $${absShift}$ أصفار، لذا نزيح الفاصلة نحو اليسار بـ $${absShift}$ مراتب بالضبط.`
					},
					{
						text: fmtNum(extraZeroAlt, 6),
						diagnosticFeedback: `تحقق من عدد الأصفار المضافة على يسار العدد بعد إزاحة الفاصلة نحو اليسار.`
					}
				];
				steps = [
					`عند القسمة على $${op.factor}$ نزيح الفاصلة نحو اليسار بـ $${absShift}$ مراتب.`,
					`نضيف أصفارا على اليسار عند الحاجة، فنجد: $${decStr} \\div ${op.factor} = ${correctStr}$.`
				];
				sujetContent = [
					{
						type: 'text',
						content: `1) احسب ذهنيا: $${decStr} div ${op.factor} = "..."$`,
						answer: `1) $${decStr} div ${op.factor} = ${correctStr}$ (إزاحة الفاصلة يسارا بـ $${absShift}$ مراتب).`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `2) ضع ثم أنجز عموديا: $${auxDec} times ${auxNat}$`,
						answer: `2) $${auxDec} times ${auxNat} = ${fmtNum(auxProd, 2)}$.`,
						mark: '0.75'
					}
				];
			}
		} else {
			// medium/hard odd seeds: decimal × natural with comma-shift distractors
			let nat = difficulty === 'medium' ? rng.int(3, 9) : rng.int(12, 27);
			if (nat % 10 === 0) nat += 3;
			let rawProd = intVal * nat;
			if (rawProd % 10 === 0) {
				nat += 1;
				if (nat % 10 === 0) nat += 1;
				rawProd = intVal * nat;
			}
			const correctVal = shiftScaled(rawProd, decPlaces, 0);
			correctStr = fmtNum(correctVal, decPlaces);

			const shiftedRight1 = shiftScaled(rawProd, decPlaces, 1);
			const shiftedRightAll = rawProd; // forgot decimal comma completely
			const shiftedLeft1 = shiftScaled(rawProd, decPlaces, -1);

			questionText =
				difficulty === 'hard'
					? `ثمن المتر الواحد من سلك نحاسي هو $${decStr}\\text{ DA}$. احسب ثمن $${nat}\\text{ m}$ من هذا السلك: $${decStr} \\times ${nat}$`
					: `احسب ناتج ضرب العدد العشري في العدد الطبيعي: $${decStr} \\times ${nat}$`;

			distractors = [
				{
					text: fmtNum(shiftedRightAll, 0),
					diagnosticFeedback: `نسيت وضع الفاصلة في النتيجة! بما أن في العدد $${decStr}$ يوجد $${decPlaces}$ أرقام بعد الفاصلة، نضع الفاصلة في الجداء بنفس العدد من اليمين.`
				},
				{
					text: fmtNum(shiftedLeft1, decPlaces + 1),
					diagnosticFeedback: `أزحت الفاصلة مرتبة زائدة نحو اليسار! عدد الأرقام بعد الفاصلة في النتيجة يساوي عددها في $${decStr}$ (${decPlaces}).`
				},
				{
					text: fmtNum(shiftedRight1 === shiftedRightAll ? shiftScaled(rawProd, decPlaces, 2) : shiftedRight1, decPlaces),
					diagnosticFeedback: `تحقق من موضع الفاصلة ورتبة مقدار الجداء ($${Math.round(decNum)} \\times ${nat} \\approx ${Math.round(decNum) * nat}$).`
				}
			];

			steps = [
				`نحسب الجداء دون اعتبار الفاصلة: $${intVal} \\times ${nat} = ${rawProd}$.`,
				`في العدد العشري $${decStr}$ يوجد $${decPlaces}$ ${decPlaces === 1 ? 'رقم واحد' : 'رقمان'} بعد الفاصلة.`,
				`نضع الفاصلة في الناتج بعد $${decPlaces}$ ${decPlaces === 1 ? 'رقم' : 'رقمين'} من اليمين فنجد: $${correctStr}$.`
			];

			sujetContent = [
				{
					type: 'text',
					content: `1) احسب ذهنيا: $${decStr} ${auxIsMul ? 'times' : 'div'} ${auxPow} = "..."$`,
					answer: `1) $${decStr} ${auxIsMul ? 'times' : 'div'} ${auxPow} = ${fmtNum(auxPowRes, 5)}$.`,
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						difficulty === 'hard'
							? `2) ثمن المتر الواحد من سلك هو $${decStr}$ دج. احسب ثمن $${nat}$ m من هذا السلك بوضع العملية عموديا.`
							: `2) ضع ثم أنجز العملية عموديا: $${decStr} times ${nat}$`,
					answer: `2) $${decStr} times ${nat} = ${correctStr}$${difficulty === 'hard' ? ' دج' : ''}.`,
					mark: '1'
				}
			];
		}

		const { options, correctIndices } = buildUniqueMcqOptions(correctStr, distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				questionData: {
					options,
					correctIndices
				},
				explanation: steps.join(' ')
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'أنجز العمليات التالية بدقة:',
				content: sujetContent
			},
			hints: [
				usePowersMode
					? `الضرب في $10$ أو $100$ أو $1000$ يكبّر العدد (إزاحة الفاصلة يمينا)، والقسمة تصغّر العدد (إزاحة الفاصلة يسارا).`
					: `في ضرب عدد عشري في عدد طبيعي، أنجز الضرب العمودي أولا وكأن الفاصلة غير موجودة.`,
				usePowersMode
					? `عدّ الأصفار في المقسوم عليه أو المضروب فيه ($1$ أو $2$ أو $3$) لتحريك الفاصلة بنفس عدد المراتب.`
					: `احسب عدد الأرقام الموجودة بعد الفاصلة في العدد العشري، وضع الفاصلة في النتيجة بنفس العدد بدءا من اليمين.`,
				`راقب معقولية نتيجتك بتقدير رتبة المقدار قبل وضع الفاصلة النهائية.`
			],
			solutionStepsAr: steps,
			finalAnswer: correctStr
		};
	}
};

/**
 * 4) جدول التناسبية والمرور بالوحدة
 */
const t2ProportionalityUnitRate: ParameterizedTemplate = {
	id: '5ap-t2-proportionality-unit-rate',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'proportionality',
	titleAr: 'جدول التناسبية والمرور بالوحدة',
	curriculumLessonId: 'lesson_5ap_t2_proportionality_linearity_unit_rate',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 193 + difficultyOffset(difficulty));

		const ctx = rng.pick([
			{
				row1: 'عدد الكراريس',
				row2: 'الثمن (دج)',
				unitItem: 'كراريس',
				unitSingle: 'الكراس الواحد',
				measureUnit: 'دج',
				phrase: 'ثمن',
				intro: 'اشترى تلميذ كراريس من نفس النوع بسعر موحد.'
			},
			{
				row1: 'عدد الأقلام',
				row2: 'الثمن (دج)',
				unitItem: 'أقلام',
				unitSingle: 'القلم الواحد',
				measureUnit: 'دج',
				phrase: 'ثمن',
				intro: 'اشترت مريم أقلاما متماثلة من المكتبة.'
			},
			{
				row1: 'الكتلة (kg)',
				row2: 'الثمن (دج)',
				unitItem: 'kg من التفاح',
				unitSingle: '1 kg من التفاح',
				measureUnit: 'دج',
				phrase: 'ثمن',
				intro: 'يبيع فلاح التفاح بسعر متناسب مع الكتلة.'
			},
			{
				row1: 'كمية البنزين (L)',
				row2: 'المسافة (km)',
				unitItem: 'L من البنزين',
				unitSingle: '1 L من البنزين',
				measureUnit: 'km',
				phrase: 'المسافة المقطوعة باستعمال',
				intro: 'تستهلك سيارة كمية بنزين متناسبة مع المسافة المقطوعة.'
			}
		]);

		let unitVal: number;
		let q1: number;
		let q2: number;
		let q3: number;

		if (difficulty === 'easy') {
			unitVal = rng.int(4, 15) * 5;
			q1 = rng.int(2, 5);
			q2 = rng.pick([3, 4, 6, 7, 8, 9].filter((x) => x !== q1));
			q3 = 10;
			if (q3 === q1 || q3 === q2) q3 = 12;
		} else if (difficulty === 'medium') {
			unitVal = rng.int(16, 85);
			q1 = rng.int(3, 8);
			const candidates = [5, 7, 9, 11, 13, 14, 15].filter((x) => x !== q1 && x % q1 !== 0 && q1 % x !== 0);
			q2 = rng.pick(candidates);
			q3 = rng.int(q2 + 2, 20);
			if (q3 === q1 || q3 === q2) q3 += 1;
		} else {
			unitVal = roundTo(rng.int(15, 95) + rng.pick([0.25, 0.5, 0.75]), 2);
			q1 = rng.pick([4, 8]);
			q2 = rng.pick([3, 5, 7, 9, 11]);
			q3 = rng.pick([10, 12, 14].filter((x) => x !== q1));
		}

		const p1 = roundTo(unitVal * q1, 2);
		const p2 = roundTo(unitVal * q2, 2);
		const p3 = roundTo(unitVal * q3, 2);

		const unitValStr = fmtNum(unitVal, 2);
		const p1Str = fmtNum(p1, 2);
		const p2Str = fmtNum(p2, 2);
		const p3Str = fmtNum(p3, 2);

		const tableBlock: TableBlock = {
			type: 'table',
			headers: [ctx.row1, `$${q1}$`, `$1$`, `$${q2}$`, `$${q3}$`],
			cells: [
				ctx.row2,
				`$${p1Str}$`,
				{ content: '...', answer: `$${unitValStr}$`, mark: '0.5' },
				{ content: '...', answer: `$${p2Str}$`, mark: '0.5' },
				{ content: '...', answer: `$${p3Str}$`, mark: '0.5' }
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true,
			width: 'full'
		};

		const questionText = `${ctx.intro} إذا كان ${ctx.phrase} $${q1}$ ${ctx.unitItem} هو $${p1Str}$ ${ctx.measureUnit}، فما ${ctx.phrase} $${q2}$ ${ctx.unitItem} باستعمال المرور بالوحدة؟`;
		const sentence = `${ctx.phrase} ${q1} ${ctx.unitItem} هو ${p1Str} ${ctx.measureUnit}، فيكون ${ctx.phrase} ${q2} ${ctx.unitItem} بالمرور بالوحدة هو ___ ${ctx.measureUnit}.`;

		const steps = [
			`المرور بالوحدة (حساب قيمة $1$): $${p1Str} \\div ${q1} = ${unitValStr}$ ${ctx.measureUnit} (لـ ${ctx.unitSingle}).`,
			`حساب قيمة $${q2}$: نضرب قيمة الوحدة في $${q2}$ فنجد $${unitValStr} \\times ${q2} = ${p2Str}$ ${ctx.measureUnit}.`,
			`لإكمال الجدول عند $${q3}$: $${unitValStr} \\times ${q3} = ${p3Str}$ ${ctx.measureUnit}.`
		];

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'proportionality',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'fill_blank',
				questionText,
				questionTextAr: questionText,
				questionData: {
					sentence,
					acceptedAnswers: decimalAcceptedAnswers(p2, ctx.measureUnit)
				},
				explanation: steps.join(' ')
			},
			sujetExercise: {
				points: 1.5,
				instruction: `${ctx.intro} أكمل جدول التناسبية التالي باستعمال المرور بالوحدة:`,
				content: [
					buildIllustratedFigureBlock(
						ctx.row1.includes('(L)')
							? 'pri_math_07_measuring_vessels_liter'
							: ctx.row1.includes('(kg)')
								? 'pri_math_04_two_pan_balance'
								: 'pri_math_02_colored_pencils_bundles',
						{
							maxHeight: 112,
							width: '58%',
							mode: 'image_only',
							title: ctx.intro
						}
					),
					tableBlock,
					{
						type: 'text',
						content: `وضح طريقة حساب قيمة الوحدة وقيمة $${q2}$:`,
						answer: `قيمة الوحدة: $${p1Str} div ${q1} = ${unitValStr}$ ${ctx.measureUnit}، ومنه قيمة $${q2}$ هي: $${unitValStr} times ${q2} = ${p2Str}$ ${ctx.measureUnit}.`,
						mark: ''
					}
				]
			},
			hints: [
				`ابدأ بالبحث عن قيمة الوحدة الواحدة (أي ما يقابل العدد $1$ في الجدول).`,
				`اقسم $${p1Str}$ على $${q1}$ لتجد قيمة ${ctx.unitSingle}.`,
				`اضرب قيمة الوحدة التي وجدتها في $${q2}$ للحصول على الإجابة النهائية.`
			],
			solutionStepsAr: steps,
			finalAnswer: `${p2Str} ${ctx.measureUnit}`
		};
	}
};

/**
 * 5) محيط ومساحة المربع والمستطيل والمثلث القائم
 */
const t2PerimeterAreaShapes: ParameterizedTemplate = {
	id: '5ap-t2-perimeter-area-shapes',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'measurement',
	titleAr: 'محيط ومساحة المربع والمستطيل والمثلث القائم',
	curriculumLessonId: 'lesson_5ap_t2_perimeter_and_area_squares_rectangles',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 211 + difficultyOffset(difficulty));
		const shapeKind = (['square', 'rectangle', 'right_triangle'] as const)[((seed - 1) % 3 + 3) % 3];

		let svg: string;
		let svgCaption: string;
		let questionText: string;
		let displayTemplate: string;
		let expected: number;
		let unitOut: string;
		let sujetText: string;
		let sujetAnswer: string;
		let hints: [string, string, string];
		let steps: string[];

		if (shapeKind === 'square') {
			if (difficulty === 'easy') {
				const s = rng.int(5, 16);
				const askArea = seed % 2 === 0;
				svg = svgRectangle({ lengthLabel: `${s} cm`, widthLabel: `${s} cm`, vertices: ['A', 'B', 'C', 'D'] });
				svgCaption = 'مربع ABCD';
				if (askArea) {
					expected = s * s;
					unitOut = 'cm²';
					questionText = `لاحظ المربع $ABCD$ الذي طول ضلعه $${s}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`;
					displayTemplate = `c = ${s} cm  →  A = ? cm²`;
					sujetText = `1) احسب محيط المربع $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $4 times ${s} = ${4 * s}$ cm.\n\n2) المساحة: $${s} times ${s} = ${expected}$ cm².`;
					hints = [
						`المربع جميع أضلاعه الأربعة متقايسة في الطول ($${s}\\text{ cm}$).`,
						`تذكّر قانون مساحة المربع: المساحة = الضلع × الضلع.`,
						`احسب الجداء $${s} \\times ${s}$.`
					];
					steps = [
						`قانون مساحة المربع: المساحة = الضلع × الضلع.`,
						`$${s} \\times ${s} = ${expected}\\text{ cm}^2$.`
					];
				} else {
					expected = 4 * s;
					unitOut = 'cm';
					questionText = `لاحظ المربع $ABCD$ الذي طول ضلعه $${s}\\text{ cm}$. احسب **محيطه** بـ $\\text{cm}$.`;
					displayTemplate = `c = ${s} cm  →  P = ? cm`;
					sujetText = `1) احسب محيط المربع $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $4 times ${s} = ${expected}$ cm.\n\n2) المساحة: $${s} times ${s} = ${s * s}$ cm².`;
					hints = [
						`محيط أي مضلع هو مجموع أطوال أضلاعه الخارجية.`,
						`تذكّر قانون محيط المربع: المحيط = 4 × الضلع.`,
						`احسب $4 \\times ${s}$.`
					];
					steps = [
						`قانون محيط المربع: المحيط = $4 \\times$ طول الضلع.`,
						`$4 \\times ${s} = ${expected}\\text{ cm}$.`
					];
				}
			} else if (difficulty === 'medium') {
				if (seed % 2 === 0) {
					const s = roundTo(rng.int(6, 18) + 0.5, 1);
					expected = roundTo(4 * s, 1);
					unitOut = 'cm';
					svg = svgRectangle({ lengthLabel: `${s} cm`, widthLabel: `${s} cm`, vertices: ['A', 'B', 'C', 'D'] });
					svgCaption = 'مربع ABCD';
					questionText = `لاحظ المربع $ABCD$ الذي طول ضلعه $${s}\\text{ cm}$. احسب **محيطه** بـ $\\text{cm}$.`;
					displayTemplate = `c = ${s} cm  →  P = ? cm`;
					sujetText = `احسب محيط المربع $A B C D$ الذي طول ضلعه $${s}$ cm.`;
					sujetAnswer = `محيط المربع: $4 times ${s} = ${expected}$ cm.`;
					hints = [
						`للمربع أربعة أضلاع متساوية الطول.`,
						`استعمل قانون محيط المربع: 4 × طول الضلع (ضرب عدد عشري في عدد طبيعي).`,
						`احسب $4 \\times ${s}$.`
					];
					steps = [
						`محيط المربع = $4 \\times$ طول الضلع.`,
						`$4 \\times ${s} = ${expected}\\text{ cm}$.`
					];
				} else {
					const s = rng.int(12, 24);
					expected = s * s;
					unitOut = 'm²';
					svg = svgRectangle({ lengthLabel: `${s} m`, widthLabel: `${s} m`, vertices: ['A', 'B', 'C', 'D'] });
					svgCaption = 'مربع ABCD';
					questionText = `ساحة مربعة الشكل $ABCD$ طول ضلعها $${s}\\text{ m}$. احسب **مساحتها** بـ $\\text{m}^2$.`;
					displayTemplate = `c = ${s} m  →  A = ? m²`;
					sujetText = `1) احسب محيط الساحة المربعة $A B C D$.\n\n2) احسب مساحتها.`;
					sujetAnswer = `1) المحيط: $4 times ${s} = ${4 * s}$ m.\n\n2) المساحة: $${s} times ${s} = ${expected}$ m².`;
					hints = [
						`المساحة تقيس الحيز الداخلي للمربع ووحدتها المتر المربع.`,
						`استعمل قانون مساحة المربع: الضلع × الضلع.`,
						`أنجز الضرب العمودي: $${s} \\times ${s}$.`
					];
					steps = [
						`مساحة المربع = الضلع × الضلع.`,
						`$${s} \\times ${s} = ${expected}\\text{ m}^2$.`
					];
				}
			} else {
				// hard: given perimeter P, find side then area
				const s = rng.int(8, 22);
				const P = 4 * s;
				expected = s * s;
				unitOut = 'm²';
				svg = svgRectangle({ lengthLabel: '? m', widthLabel: '? m', vertices: ['A', 'B', 'C', 'D'] });
				svgCaption = 'مربع ABCD';
				questionText = `حديقة مربعة الشكل $ABCD$ محيطها $${P}\\text{ m}$. احسب طول ضلعها ثم احسب **مساحتها** بـ $\\text{m}^2$.`;
				displayTemplate = `P = ${P} m  →  A = ? m²`;
				sujetText = `قطعة أرض مربعة الشكل $A B C D$ محيطها $${P}$ m.\n\n1) احسب طول ضلعها.\n\n2) استنتج مساحتها.`;
				sujetAnswer = `1) طول الضلع: $${P} div 4 = ${s}$ m.\n\n2) المساحة: $${s} times ${s} = ${expected}$ m².`;
				hints = [
					`محيط المربع يساوي $4 \\times$ طول الضلع، إذن لإيجاد الضلع نقسم المحيط على $4$.`,
					`طول الضلع = $${P} \\div 4 = ${s}\\text{ m}$.`,
					`الآن احسب المساحة: $${s} \\times ${s}$.`
				];
				steps = [
					`طول ضلع المربع = المحيط ÷ $4$ = $${P} \\div 4 = ${s}\\text{ m}$.`,
					`مساحة المربع = الضلع × الضلع = $${s} \\times ${s} = ${expected}\\text{ m}^2$.`
				];
			}
		} else if (shapeKind === 'rectangle') {
			if (difficulty === 'easy') {
				const W = rng.int(4, 12);
				const L = rng.int(W + 3, W + 12);
				const askArea = seed % 2 === 0;
				svg = svgRectangle({ lengthLabel: `${L} cm`, widthLabel: `${W} cm`, vertices: ['A', 'B', 'C', 'D'] });
				svgCaption = 'مستطيل ABCD';
				if (askArea) {
					expected = L * W;
					unitOut = 'cm²';
					questionText = `لاحظ المستطيل $ABCD$ الذي طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`;
					displayTemplate = `L = ${L} cm, l = ${W} cm  →  A = ? cm²`;
					sujetText = `1) احسب محيط المستطيل $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $2 times (${L} + ${W}) = ${2 * (L + W)}$ cm.\n\n2) المساحة: $${L} times ${W} = ${expected}$ cm².`;
					hints = [
						`ميّز بين المحيط (الجمع) والمساحة (الضرب).`,
						`مساحة المستطيل = الطول × العرض.`,
						`احسب $${L} \\times ${W}$.`
					];
					steps = [
						`قانون مساحة المستطيل = الطول × العرض.`,
						`$${L} \\times ${W} = ${expected}\\text{ cm}^2$.`
					];
				} else {
					expected = 2 * (L + W);
					unitOut = 'cm';
					questionText = `لاحظ المستطيل $ABCD$ الذي طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب **محيطه** بـ $\\text{cm}$.`;
					displayTemplate = `L = ${L} cm, l = ${W} cm  →  P = ? cm`;
					sujetText = `1) احسب محيط المستطيل $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $2 times (${L} + ${W}) = ${expected}$ cm.\n\n2) المساحة: $${L} times ${W} = ${L * W}$ cm².`;
					hints = [
						`للمستطيل طولان متقايسان وعرضان متقايسان.`,
						`محيط المستطيل = 2 × (الطول + العرض).`,
						`احسب أولا نصف المحيط $${L} + ${W} = ${L + W}$ ثم اضربه في $2$.`
					];
					steps = [
						`نصف المحيط = الطول + العرض = $${L} + ${W} = ${L + W}\\text{ cm}$.`,
						`المحيط = $2 \\times ${L + W} = ${expected}\\text{ cm}$.`
					];
				}
			} else if (difficulty === 'medium') {
				const W = rng.int(4, 10);
				const L = roundTo(rng.int(W + 3, W + 12) + 0.5, 1);
				const askArea = seed % 2 === 0;
				svg = svgRectangle({ lengthLabel: `${L} cm`, widthLabel: `${W} cm`, vertices: ['A', 'B', 'C', 'D'] });
				svgCaption = 'مستطيل ABCD';
				if (askArea) {
					expected = roundTo(L * W, 1);
					unitOut = 'cm²';
					questionText = `مستطيل $ABCD$ طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`;
					displayTemplate = `L = ${L} cm, l = ${W} cm  →  A = ? cm²`;
					sujetText = `1) احسب محيط المستطيل $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $2 times (${L} + ${W}) = ${roundTo(2 * (L + W), 1)}$ cm.\n\n2) المساحة: $${L} times ${W} = ${expected}$ cm².`;
					hints = [
						`مساحة المستطيل = الطول × العرض.`,
						`نضرب العدد العشري $${L}$ في العدد الطبيعي $${W}$.`,
						`تذكر وضع الفاصلة في الجداء بعد رقم واحد من اليمين.`
					];
					steps = [
						`مساحة المستطيل = الطول × العرض = $${L} \\times ${W}$.`,
						`$${L} \\times ${W} = ${expected}\\text{ cm}^2$.`
					];
				} else {
					expected = roundTo(2 * (L + W), 1);
					unitOut = 'cm';
					questionText = `مستطيل $ABCD$ طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب **محيطه** بـ $\\text{cm}$.`;
					displayTemplate = `L = ${L} cm, l = ${W} cm  →  P = ? cm`;
					sujetText = `1) احسب محيط المستطيل $A B C D$.\n\n2) احسب مساحته.`;
					sujetAnswer = `1) المحيط: $2 times (${L} + ${W}) = ${expected}$ cm.\n\n2) المساحة: $${L} times ${W} = ${roundTo(L * W, 1)}$ cm².`;
					hints = [
						`اجمع الطول والعرض أولا: $${L} + ${W}.0$.`,
						`نصف المحيط هو $${roundTo(L + W, 1)}\\text{ cm}$.`,
						`اضرب نصف المحيط في $2$: $2 \\times ${roundTo(L + W, 1)}$.`
					];
					steps = [
						`نصف المحيط = $${L} + ${W} = ${roundTo(L + W, 1)}\\text{ cm}$.`,
						`محيط المستطيل = $2 \\times ${roundTo(L + W, 1)} = ${expected}\\text{ cm}$.`
					];
				}
			} else {
				// hard: mixed units (m and cm) -> convert to cm first!
				const L_m = roundTo(rng.int(12, 32) / 10, 1);
				const L_cm = Math.round(L_m * 100);
				const W_cm = rng.int(35, 95);
				const askArea = seed % 2 === 0;
				svg = svgRectangle({ lengthLabel: `${L_m} m`, widthLabel: `${W_cm} cm`, vertices: ['A', 'B', 'C', 'D'] });
				svgCaption = 'مستطيل ABCD';
				if (askArea) {
					expected = L_cm * W_cm;
					unitOut = 'cm²';
					questionText = `لوح خشبي مستطيل الشكل $ABCD$ طوله $${L_m}\\text{ m}$ وعرضه $${W_cm}\\text{ cm}$. احسب **مساحته بـ $\\text{cm}^2$** بعد توحيد الوحدة.`;
					displayTemplate = `L = ${L_m} m, l = ${W_cm} cm  →  A = ? cm²`;
					sujetText = `لوح مستطيل $A B C D$ طوله $${L_m}$ m وعرضه $${W_cm}$ cm.\n\n1) حوّل الطول إلى السنتيمتر (cm).\n\n2) احسب مساحة اللوح بـ cm².`;
					sujetAnswer = `1) التحويل: $${L_m}$ m $= ${L_cm}$ cm.\n\n2) المساحة: $${L_cm} times ${W_cm} = ${expected}$ cm².`;
					hints = [
						`انتبه إلى اختلاف الوحدتين! يجب التحويل إلى نفس الوحدة (السنتيمتر) قبل الحساب.`,
						`$1\\text{ m} = 100\\text{ cm}$، إذن $${L_m}\\text{ m} = ${L_cm}\\text{ cm}$.`,
						`الآن احسب المساحة: $${L_cm} \\times ${W_cm}$.`
					];
					steps = [
						`تحويل الطول إلى $\\text{cm}$: $${L_m}\\text{ m} = ${L_m} \\times 100 = ${L_cm}\\text{ cm}$.`,
						`حساب المساحة: $${L_cm} \\times ${W_cm} = ${expected}\\text{ cm}^2$.`
					];
				} else {
					expected = 2 * (L_cm + W_cm);
					unitOut = 'cm';
					questionText = `إطار مستطيل الشكل $ABCD$ طوله $${L_m}\\text{ m}$ وعرضه $${W_cm}\\text{ cm}$. احسب **محيطه بـ $\\text{cm}$** بعد توحيد الوحدة.`;
					displayTemplate = `L = ${L_m} m, l = ${W_cm} cm  →  P = ? cm`;
					sujetText = `إطار مستطيل $A B C D$ طوله $${L_m}$ m وعرضه $${W_cm}$ cm.\n\n1) حوّل الطول إلى cm.\n\n2) احسب محيط الإطار بـ cm.`;
					sujetAnswer = `1) التحويل: $${L_m}$ m $= ${L_cm}$ cm.\n\n2) المحيط: $2 times (${L_cm} + ${W_cm}) = ${expected}$ cm.`;
					hints = [
						`لا يمكن جمع المتر مع السنتيمتر مباشرة؛ حوّل أولا إلى السنتيمتر.`,
						`$${L_m}\\text{ m} = ${L_cm}\\text{ cm}$.`,
						`استعمل قانون المحيط: $2 \\times (${L_cm} + ${W_cm})$.`
					];
					steps = [
						`تحويل الطول إلى $\\text{cm}$: $${L_m}\\text{ m} = ${L_cm}\\text{ cm}$.`,
						`حساب المحيط: $2 \\times (${L_cm} + ${W_cm}) = 2 \\times ${L_cm + W_cm} = ${expected}\\text{ cm}$.`
					];
				}
			}
		} else {
			// right_triangle
			if (difficulty === 'easy') {
				const leg1 = rng.pick([4, 6, 8, 10, 12]);
				const leg2 = rng.int(5, 15);
				expected = (leg1 * leg2) / 2;
				unitOut = 'cm²';
				svg = svgTriangle({
					labels: ['A', 'B', 'C'],
					rightAngleAtA: true,
					sideAB: `${leg1} cm`,
					sideAC: `${leg2} cm`
				});
				svgCaption = 'مثلث قائم في A';
				questionText = `لاحظ المثلث القائم $ABC$ في $A$ حيث $AB = ${leg1}\\text{ cm}$ و $AC = ${leg2}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`;
				displayTemplate = `AB = ${leg1} cm, AC = ${leg2} cm  →  A = ? cm²`;
				sujetText = `مثلث $A B C$ قائم في $A$ حيث $A B = ${leg1}$ cm و $A C = ${leg2}$ cm. احسب مساحة المثلث القائم $A B C$.`;
				sujetAnswer = `مساحة المثلث القائم = $(${leg1} times ${leg2}) div 2 = ${leg1 * leg2} div 2 = ${expected}$ cm².`;
				hints = [
					`المثلث القائم يمثل نصف مستطيل طوله وعرضه هما الضلعان القائمان.`,
					`قانون مساحة المثلث القائم = (الضلع القائم 1 × الضلع القائم 2) ÷ 2.`,
					`احسب $(${leg1} \\times ${leg2}) \\div 2$.`
				];
				steps = [
					`مساحة المثلث القائم = $(AB \\times AC) \\div 2$.`,
					`$(${leg1} \\times ${leg2}) \\div 2 = ${leg1 * leg2} \\div 2 = ${expected}\\text{ cm}^2$.`
				];
			} else if (difficulty === 'medium') {
				const triple = rng.pick([
					[6, 8, 10],
					[9, 12, 15],
					[12, 16, 20],
					[5, 12, 13],
					[8, 15, 17],
					[10, 24, 26]
				] as const);
				const [ab, ac, bc] = triple;
				const areaVal = (ab * ac) / 2;
				const perimVal = ab + ac + bc;
				const askPerim = seed % 2 === 1;
				svg = svgTriangle({
					labels: ['A', 'B', 'C'],
					rightAngleAtA: true,
					sideAB: `${ab} cm`,
					sideAC: `${ac} cm`,
					sideBC: `${bc} cm`
				});
				svgCaption = 'مثلث قائم في A';
				if (askPerim) {
					expected = perimVal;
					unitOut = 'cm';
					questionText = `لاحظ المثلث القائم $ABC$ في $A$ بأطواله المبينة على الشكل ($AB = ${ab}\\text{ cm}$، $AC = ${ac}\\text{ cm}$، $BC = ${bc}\\text{ cm}$). احسب **محيطه** بـ $\\text{cm}$.`;
					displayTemplate = `AB = ${ab}, AC = ${ac}, BC = ${bc}  →  P = ? cm`;
					hints = [
						`محيط المثلث هو مجموع أطوال أضلاعه الثلاثة.`,
						`اجمع: $AB + AC + BC$.`,
						`احسب $${ab} + ${ac} + ${bc}$.`
					];
					steps = [
						`محيط المثلث $ABC$ = $AB + AC + BC$.`,
						`$${ab} + ${ac} + ${bc} = ${perimVal}\\text{ cm}$.`
					];
				} else {
					expected = areaVal;
					unitOut = 'cm²';
					questionText = `لاحظ المثلث القائم $ABC$ في $A$ ($AB = ${ab}\\text{ cm}$، $AC = ${ac}\\text{ cm}$، $BC = ${bc}\\text{ cm}$). احسب **مساحته** بـ $\\text{cm}^2$.`;
					displayTemplate = `AB = ${ab}, AC = ${ac}, BC = ${bc}  →  A = ? cm²`;
					hints = [
						`انتبه! لحساب مساحة المثلث القائم نستعمل الضلعين القائمين المحيطين بالزاوية القائمة في $A$ فقط (لا نستعمل الوتر $BC$).`,
						`قانون المساحة = $(AB \\times AC) \\div 2$.`,
						`احسب $(${ab} \\times ${ac}) \\div 2$.`
					];
					steps = [
						`الضلعان القائمان عند $A$ هما $AB = ${ab}\\text{ cm}$ و $AC = ${ac}\\text{ cm}$.`,
						`المساحة = $(${ab} \\times ${ac}) \\div 2 = ${ab * ac} \\div 2 = ${areaVal}\\text{ cm}^2$.`
					];
				}
				sujetText = `لاحظ المثلث القائم $A B C$ في $A$ حيث $A B = ${ab}$ cm و $A C = ${ac}$ cm و $B C = ${bc}$ cm.\n\n1) احسب محيط المثلث $A B C$.\n\n2) احسب مساحته.`;
				sujetAnswer = `1) المحيط: $${ab} + ${ac} + ${bc} = ${perimVal}$ cm.\n\n2) المساحة: $(${ab} times ${ac}) div 2 = ${areaVal}$ cm².`;
			} else {
				const leg1 = roundTo(rng.int(5, 15) + 0.5, 1);
				const leg2 = rng.pick([4, 6, 8, 10, 12]);
				const rectArea = roundTo(leg1 * leg2, 1);
				expected = roundTo(rectArea / 2, 1);
				unitOut = 'cm²';
				svg = svgTriangle({
					labels: ['A', 'B', 'C'],
					rightAngleAtA: true,
					sideAB: `${leg1} cm`,
					sideAC: `${leg2} cm`
				});
				svgCaption = 'مثلث قائم في A';
				questionText = `مثلث قائم $ABC$ في $A$ طولا ضلعيه القائمين $AB = ${leg1}\\text{ cm}$ و $AC = ${leg2}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`;
				displayTemplate = `AB = ${leg1} cm, AC = ${leg2} cm  →  A = ? cm²`;
				sujetText = `مثلث $A B C$ قائم في $A$ حيث $A B = ${leg1}$ cm و $A C = ${leg2}$ cm. احسب مساحته بـ cm².`;
				sujetAnswer = `المساحة: $(${leg1} times ${leg2}) div 2 = ${rectArea} div 2 = ${expected}$ cm².`;
				hints = [
					`مساحة المثلث القائم = (الضلع القائم 1 × الضلع القائم 2) ÷ 2.`,
					`احسب أولا جداء الضلعين القائمين: $${leg1} \\times ${leg2} = ${rectArea}$.`,
					`اقسم النتيجة على $2$: $${rectArea} \\div 2$.`
				];
				steps = [
					`جداء الضلعين القائمين: $${leg1} \\times ${leg2} = ${rectArea}$.`,
					`القسمة على $2$: $${rectArea} \\div 2 = ${expected}\\text{ cm}^2$.`
				];
			}
		}

		const svgPath = saveSvgAsset(`5ap-t2-shape-${difficulty}-${seed}`, svg);
		const expectedStr = fmtNum(expected, 2);

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'measurement',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: svgCaption,
				questionData: {
					answer: expected,
					displayTemplate,
					variables: [],
					tolerance: 0.01
				},
				explanation: steps.join(' ')
			},
			sujetExercise: {
				points: 1.5,
				instruction: 'لاحظ الشكل الهندسي المرفق ثم أجب عن المطلوب:',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: sujetText,
								answer: sujetAnswer,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: svgCaption
							}
						]
					}
				]
			},
			hints,
			solutionStepsAr: steps,
			finalAnswer: `${expectedStr} ${unitOut}`
		};
	}
};

/**
 * 6) الوضعية الإدماجية (حديقة مستطيلة: المساحة، القسمة الإقليدية، المحيط والتكلفة بالدينار العشري)
 * حد أقصى 3 أسئلة مترابطة، السؤال الأول مستقل تماما.
 */
const t2IntegrationGarden: ParameterizedTemplate = {
	id: '5ap-t2-integration-garden',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تهيئة حديقة مستطيلة',
	curriculumLessonId: 'lesson_5ap_t2_perimeter_and_area_squares_rectangles',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed * 251 + difficultyOffset(difficulty));

		const ctx = rng.pick([
			{
				place: 'حديقة المدرسة',
				actor: 'جمعية أولياء التلاميذ',
				unitLabel: 'أحواض الزهور',
				unitSingle: 'حوض زهور',
				unitCostWord: 'الحوض الواحد',
				unitPlural: 'حوضا',
				vOwn: 'تملك',
				vWant: 'أرادت',
				vPlan: 'تعتزم',
				vAssign: 'خصّصت',
				vFence: 'أحاطت'
			},
			{
				place: 'بستان عائلي',
				actor: 'العم صالح',
				unitLabel: 'أشجار الزيتون',
				unitSingle: 'شجرة زيتون',
				unitCostWord: 'الشجرة الواحدة',
				unitPlural: 'شجرة',
				vOwn: 'يملك',
				vWant: 'أراد',
				vPlan: 'يعتزم',
				vAssign: 'خصّص',
				vFence: 'أحاط'
			},
			{
				place: 'حديقة الحي',
				actor: 'فريق المتطوعين',
				unitLabel: 'شجيرات الورد',
				unitSingle: 'شجيرة ورد',
				unitCostWord: 'الشجيرة الواحدة',
				unitPlural: 'شجيرة',
				vOwn: 'يملك',
				vWant: 'أراد',
				vPlan: 'يعتزم',
				vAssign: 'خصّص',
				vFence: 'أحاط'
			}
		]);

		let L: number;
		let W: number;
		let d: number;
		if (difficulty === 'easy') {
			L = rng.int(16, 28);
			W = rng.int(8, 14);
			d = rng.int(4, 9);
		} else if (difficulty === 'medium') {
			L = rng.int(22, 36);
			W = rng.int(12, 19);
			d = rng.int(11, 18);
		} else {
			L = rng.int(28, 44);
			W = rng.int(14, 24);
			d = rng.int(12, 23);
		}

		let A = L * W;
		while (A % d === 0) {
			d += 1;
		}
		const q = Math.floor(A / d);
		const r = A % d;
		const P = 2 * (L + W);

		const svg = svgRectangle({ lengthLabel: `${L} m`, widthLabel: `${W} m`, vertices: ['A', 'B', 'C', 'D'] });
		const svgPath = saveSvgAsset(`5ap-t2-garden-${difficulty}-${seed}`, svg);

		if (difficulty === 'easy') {
			const fencePrice = roundTo(rng.int(110, 240) + 0.5, 1);
			const fenceCost = roundTo(P * fencePrice, 2);
			const fenceCostStr = fmtNum(fenceCost, 2);

			const introText = `${ctx.vOwn} ${ctx.actor} قطعة أرض مستطيلة الشكل لتهيئة ${ctx.place}، طولها $${L}$ m وعرضها $${W}$ m. ${ctx.vWant} إحاطتها بسياج ثمن المتر الواحد منه $${fencePrice}$ DA، وتخصيص مساحتها لغرس ${ctx.unitLabel} بحيث تحتاج كل واحدة إلى $${d}$ m².`;
			const questionText = `${ctx.vOwn} ${ctx.actor} قطعة أرض مستطيلة الشكل طولها $${L}\\text{ m}$ وعرضها $${W}\\text{ m}$. ${ctx.vWant} إحاطتها بسياج ثمن المتر الواحد منه $${fencePrice}\\text{ DA}$. احسب **تكلفة السياج** بالدينار الجزائري (بعد حساب المحيط).`;

			const steps = [
				`1) مساحة قطعة الأرض: $${L} \\times ${W} = ${A}\\text{ m}^2$.`,
				`2) القسمة الإقليدية لإيجاد العدد الكامل من ${ctx.unitLabel}: $${A} = ${d} \\times ${q} + ${r}$، إذن العدد هو $${q}$ ${ctx.unitPlural} وتبقى $${r}\\text{ m}^2$.`,
				`3) محيط الأرض: $2 \\times (${L} + ${W}) = ${P}\\text{ m}$، ومنه تكلفة السياج: $${P} \\times ${fencePrice} = ${fenceCostStr}\\text{ DA}$.`
			];

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't2',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: `${ctx.place} (${L} m × ${W} m)`,
					questionData: {
						answer: fenceCost,
						displayTemplate: `P = 2 × (${L} + ${W})  →  ? × ${fencePrice} DA`,
						variables: [],
						tolerance: 0.01
					},
					explanation: steps.join(' ')
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 4,
					instruction: 'أجب عن الأسئلة الثلاثة التالية مع توضيح العمليات العمودية والأفقية وذكر الوحدات:',
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{ type: 'text', content: introText },
								{ type: 'image', src: svgPath, caption: ctx.place }
							]
						},
						{
							type: 'text',
							content: `1) احسب مساحة قطعة الأرض المستطيلة.`,
							answer: `1) مساحة الأرض: $${L} times ${W} = ${A}$ m².`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) ما هو أكبر عدد من ${ctx.unitLabel} يمكن تهيئته في هذه المساحة، وما هي المساحة المتبقية؟`,
							answer: `2) بالقسمة الإقليدية: $${A} = ${d} times ${q} + ${r}$، إذن العدد هو $${q}$ ${ctx.unitPlural} وتبقى $${r}$ m².`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب محيط الأرض ثم احسب تكلفة السياج بالدينار الجزائري.`,
							answer: `3) المحيط: $2 times (${L} + ${W}) = ${P}$ m. تكلفة السياج: $${P} times ${fencePrice} = ${fenceCostStr}$ DA.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`احسب أولا محيط المستطيل: المحيط = 2 × (الطول + العرض) = $2 \\times (${L} + ${W})$.`,
					`بعد إيجاد المحيط ($${P}\\text{ m}$)، اضربه في ثمن المتر الواحد ($${fencePrice}\\text{ DA}$).`,
					`عند ضرب العدد العشري $${fencePrice}$ في $${P}$، تذكر وضع الفاصلة بعد رقم واحد من اليمين.`
				],
				solutionStepsAr: steps,
				finalAnswer: `${fenceCostStr} DA`
			};
		}

		if (difficulty === 'medium') {
			const gate = rng.int(2, 4);
			const fenceLen = P - gate;
			const fencePrice = roundTo(rng.int(140, 320) + rng.pick([0.25, 0.5, 0.75]), 2);
			const fenceCost = roundTo(fenceLen * fencePrice, 2);
			const fenceCostStr = fmtNum(fenceCost, 2);

			const introText = `${ctx.vPlan} ${ctx.actor} تهيئة قطعة أرض مستطيلة الشكل لإنشاء ${ctx.place}، طولها $${L}$ m وعرضها $${W}$ m. ${ctx.vAssign} كل $${d}$ m² لـ ${ctx.unitSingle}، ثم ${ctx.vFence} القطعة بسياج ثمن المتر الواحد منه $${fencePrice}$ DA مع ترك مدخل غير مسيج عرضه $${gate}$ m.`;
			const questionText = `${ctx.vPlan} ${ctx.actor} إحاطة قطعة أرض مستطيلة ($${L}\\text{ m} \\times ${W}\\text{ m}$) بسياج مع ترك مدخل عرضه $${gate}\\text{ m}$، حيث ثمن المتر الواحد من السياج $${fencePrice}\\text{ DA}$. احسب **تكلفة السياج** بالدينار الجزائري.`;

			const steps = [
				`1) مساحة قطعة الأرض: $${L} \\times ${W} = ${A}\\text{ m}^2$.`,
				`2) القسمة الإقليدية: $${A} = ${d} \\times ${q} + ${r}$، إذن نحصل على $${q}$ ${ctx.unitPlural} وتبقى $${r}\\text{ m}^2$.`,
				`3) المحيط: $2 \\times (${L} + ${W}) = ${P}\\text{ m}$، وطول السياج بعد طرح المدخل: $${P} - ${gate} = ${fenceLen}\\text{ m}$.`,
				`تكلفة السياج: $${fenceLen} \\times ${fencePrice} = ${fenceCostStr}\\text{ DA}$.`
			];

			return {
				templateId: this.id,
				seed,
				grade: '5ap',
				trimesterId: 't2',
				difficulty,
				domain: 'integration',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: `${ctx.place} (${L} m × ${W} m)`,
					questionData: {
						answer: fenceCost,
						displayTemplate: `(2 × (${L} + ${W}) - ${gate}) × ${fencePrice} = ? DA`,
						variables: [],
						tolerance: 0.01
					},
					explanation: steps.join(' ')
				},
				sujetExercise: {
					customTitle: 'الوضعية الإدماجية',
					points: 4,
					instruction: 'أجب عن الأسئلة الثلاثة التالية مع توضيح العمليات العمودية والأفقية وذكر الوحدات:',
					content: [
						{
							type: 'columns',
							widths: ['1.35fr', '1fr'],
							children: [
								{ type: 'text', content: introText },
								{ type: 'image', src: svgPath, caption: ctx.place }
							]
						},
						{
							type: 'text',
							content: `1) احسب مساحة قطعة الأرض المستطيلة.`,
							answer: `1) المساحة: $${L} times ${W} = ${A}$ m².`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) ما هو أكبر عدد من ${ctx.unitLabel} يمكن تهيئته، وما المساحة المتبقية كممر؟`,
							answer: `2) بالقسمة الإقليدية: $${A} = ${d} times ${q} + ${r}$، إذن العدد هو $${q}$ ${ctx.unitPlural} وتبقى $${r}$ m².`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) احسب طول السياج اللازم ثم احسب تكلفته بالدينار الجزائري.`,
							answer: `3) المحيط: $2 times (${L} + ${W}) = ${P}$ m، وطول السياج: $${P} - ${gate} = ${fenceLen}$ m، والتكلفة: $${fenceLen} times ${fencePrice} = ${fenceCostStr}$ DA.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`احسب أولا محيط المستطيل: $2 \\times (${L} + ${W}) = ${P}\\text{ m}$.`,
					`لا تنسَ طرح عرض المدخل ($${gate}\\text{ m}$) من المحيط للحصول على طول السياج: $${P} - ${gate} = ${fenceLen}\\text{ m}$.`,
					`اضرب طول السياج ($${fenceLen}\\text{ m}$) في ثمن المتر الواحد ($${fencePrice}\\text{ DA}$).`
				],
				solutionStepsAr: steps,
				finalAnswer: `${fenceCostStr} DA`
			};
		}

		// hard: 3 linked steps ending in remaining budget after fence cost + q items cost
		const gate = rng.int(2, 5);
		const fenceLen = P - gate;
		const fencePrice = roundTo(rng.int(180, 360) + rng.pick([0.25, 0.5, 0.75]), 2);
		const treePrice = rng.priceDA(150, 420, 10);
		const fenceCost = roundTo(fenceLen * fencePrice, 2);
		const treesCost = q * treePrice;
		const totalCost = roundTo(fenceCost + treesCost, 2);
		const budget = Math.ceil((totalCost + rng.int(1500, 4500)) / 500) * 500;
		const remaining = roundTo(budget - totalCost, 2);

		const fenceCostStr = fmtNum(fenceCost, 2);
		const totalCostStr = fmtNum(totalCost, 2);
		const remainingStr = fmtNum(remaining, 2);

		const introText = `${ctx.vOwn} ${ctx.actor} مبلغا ماليا قدره $${budget}$ DA لتهيئة قطعة أرض مستطيلة الشكل لإنشاء ${ctx.place}، طولها $${L}$ m وعرضها $${W}$ m. ${ctx.vAssign} مساحة $${d}$ m² لكل ${ctx.unitSingle} (تكلفة ${ctx.unitCostWord} $${treePrice}$ DA)، كما ${ctx.vFence} القطعة بسياج ثمن المتر الواحد منه $${fencePrice}$ DA مع ترك مدخل عرضه $${gate}$ m.`;
		const questionText = `${ctx.vOwn} ${ctx.actor} مبلغا ماليا قدره $${budget}\\text{ DA}$ لتهيئة قطعة أرض مستطيلة الشكل طولها $${L}\\text{ m}$ وعرضها $${W}\\text{ m}$. ${ctx.vAssign} مساحة $${d}\\text{ m}^2$ لكل ${ctx.unitSingle} بتكلفة $${treePrice}\\text{ DA}$ لـ ${ctx.unitCostWord}، ثم ${ctx.vFence} القطعة بسياج ثمن المتر الواحد منه $${fencePrice}\\text{ DA}$ مع ترك مدخل عرضه $${gate}\\text{ m}$. احسب المساحة، ثم عدد ${ctx.unitLabel} بالقسمة الإقليدية، ثم احسب **المبلغ المتبقي** من الميزانية بعد دفع ثمن السياج وثمن ${ctx.unitLabel}.`;

		const steps = [
			`1) مساحة الأرض المستطيلة: $${L} \\times ${W} = ${A}\\text{ m}^2$.`,
			`2) عدد ${ctx.unitLabel} بالقسمة الإقليدية: $${A} = ${d} \\times ${q} + ${r}$، إذن العدد هو $${q}$ ${ctx.unitPlural} والباقي $${r}\\text{ m}^2$.`,
			`3) طول السياج: $2 \\times (${L} + ${W}) - ${gate} = ${P} - ${gate} = ${fenceLen}\\text{ m}$، فثمنه $${fenceLen} \\times ${fencePrice} = ${fenceCostStr}\\text{ DA}$.`,
			`تكلفة ${ctx.unitLabel}: $${q} \\times ${treePrice} = ${treesCost}\\text{ DA}$، والتكلفة الإجمالية: $${fenceCostStr} + ${treesCost} = ${totalCostStr}\\text{ DA}$.`,
			`المبلغ المتبقي: $${budget} - ${totalCostStr} = ${remainingStr}\\text{ DA}$.`
		];

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `${ctx.place} (${L} m × ${W} m)`,
				questionData: {
					answer: remaining,
					displayTemplate: `(${L} m × ${W} m)  |  ${budget} DA  →  ? DA`,
					variables: [],
					tolerance: 0.01
				},
				explanation: steps.join(' ')
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'أجب عن الأسئلة الثلاثة التالية بوضوح مع كتابة العمليات العمودية والأفقية:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{ type: 'text', content: introText },
							{ type: 'image', src: svgPath, caption: ctx.place }
						]
					},
					{
						type: 'text',
						content: `1) احسب مساحة قطعة الأرض المستطيلة.`,
						answer: `1) المساحة: $${L} times ${W} = ${A}$ m².`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) ما أكبر عدد ممكن من ${ctx.unitLabel} يمكن تهيئته، وما هي المساحة المتبقية؟`,
						answer: `2) بالقسمة الإقليدية: $${A} = ${d} times ${q} + ${r}$، إذن العدد هو $${q}$ ${ctx.unitPlural} وتبقى $${r}$ m².`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `3) احسب المبلغ المتبقي لدى ${ctx.actor} بعد دفع تكلفة السياج وثمن ${ctx.unitLabel}.`,
						answer: `3) طول السياج: $2 times (${L} + ${W}) - ${gate} = ${fenceLen}$ m، وثمنه $${fenceLen} times ${fencePrice} = ${fenceCostStr}$ DA، وثمن الغرس $${q} times ${treePrice} = ${treesCost}$ DA، والمجموع $${totalCostStr}$ DA، والمتبقي $${budget} - ${totalCostStr} = ${remainingStr}$ DA.`,
						mark: '1.75'
					}
				]
			},
			hints: [
				`الخطوة 1: احسب المساحة ($${L} \\times ${W} = ${A}\\text{ m}^2$) ثم استعمل القسمة الإقليدية على $${d}$ لإيجاد عدد ${ctx.unitLabel} الكامل ($${q}$).`,
				`الخطوة 2: احسب طول السياج ($2 \\times (${L} + ${W}) - ${gate} = ${fenceLen}\\text{ m}$) ثم اضربه في $${fencePrice}\\text{ DA}$، وأضف ثمن $${q}$ وحدة ($${q} \\times ${treePrice}$).`,
				`الخطوة 3: اطرح التكلفة الإجمالية ($${totalCostStr}\\text{ DA}$) من الميزانية ($${budget}\\text{ DA}$) مع محاذاة الفاصلة وإضافة أصفار عشرية عند الطرح.`
			],
			solutionStepsAr: steps,
			finalAnswer: `${remainingStr} DA`
		};
	}
};

export const TEMPLATES_5AP_T2: ParameterizedTemplate[] = [
	t2EuclideanDivision,
	t2DecimalNumberLine,
	t2DecimalMulDivPowers10,
	t2ProportionalityUnitRate,
	t2PerimeterAreaShapes,
	t2IntegrationGarden
].map(withSafeKatex);
