import { buildUniqueMcqOptions, gcd, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgFractionBar, svgGridPoints, svgRectangle, svgTriangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import type { ContentBlock, TableBlock } from '../../../SujetBuilder/types';

function formatFracKatex(num: number, den: number): string {
	return den === 1 ? `${num}` : `\\frac{${num}}{${den}}`;
}

function formatFracTypst(num: number, den: number): string {
	return den === 1 ? `${num}` : `frac(${num}, ${den})`;
}

function fmtNum(val: number, maxDec = 4): string {
	return String(roundTo(val, maxDec));
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

/** Custom SVG for 1AM T2 composite field (rectangle ABCD + right triangle BCE right-angled at C). */
function svgCompositeRectRightTriangle(opts: {
	lengthL: number;
	widthW: number;
	baseB: number;
	hypotenuseC: number;
}): string {
	const w = 360;
	const h = 175;
	const parts = [
		`<rect x="45" y="38" width="160" height="90" fill="#dcfce7" stroke="#15803d" stroke-width="2.2"/>`,
		`<polygon points="205,38 205,128 305,128" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.2"/>`,
		`<line x1="205" y1="38" x2="205" y2="128" stroke="#15803d" stroke-width="2" stroke-dasharray="4 3"/>`,
		`<rect x="45" y="38" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="45" y="118" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="195" y="118" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<rect x="205" y="118" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>`,
		`<text x="34" y="34" font-size="12.5" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="206" y="30" font-size="12.5" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="200" y="146" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="34" y="142" font-size="12.5" font-weight="bold" fill="#0f172a">D</text>`,
		`<text x="312" y="135" font-size="12.5" font-weight="bold" fill="#0f172a">E</text>`,
		`<text x="125" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">${opts.lengthL} m</text>`,
		`<text x="22" y="88" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">${opts.widthW} m</text>`,
		`<text x="255" y="148" text-anchor="middle" font-size="12" font-weight="bold" fill="#854d0e">${opts.baseB} m</text>`,
		`<text x="272" y="76" font-size="12" font-weight="bold" fill="#b45309">${opts.hypotenuseC} m</text>`
	];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Euclidean Division & Divisibility Rules (2, 3, 4, 5, 9)
// ═══════════════════════════════════════════════════════════════════════════════
const t2EuclideanDivisionDivisibility: ParameterizedTemplate = {
	id: '1am_t2_euclidean_division_divisibility',
	grade: '1am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'القسمة الإقليدية وقواعد قابلية القسمة (2، 3، 4، 5، 9)',
	curriculumLessonId: 'lesson_1am_t2_euclidean_division_divisibility',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let b: number;
		let q: number;
		if (difficulty === 'easy') {
			b = rng.int(4, 9);
			q = rng.int(12, 34);
		} else if (difficulty === 'medium') {
			b = rng.int(11, 19);
			q = rng.int(12, 29);
		} else {
			b = rng.int(12, 26);
			q = rng.int(15, 39);
		}
		const r = rng.int(1, b - 1);
		const a = b * q + r;
		const minContainers = q + 1;
		const missingToFill = b - r;

		const ctx = rng.pick([
			{
				item: 'علبة تمر',
				defItems: 'علب التمر',
				container: 'صناديق',
				defContainer: 'الصناديق',
				perContainer: 'صندوق',
				verb: 'توضيب'
			},
			{
				item: 'كتاباً',
				defItems: 'الكتب',
				container: 'رفوف',
				defContainer: 'الرفوف',
				perContainer: 'رف',
				verb: 'ترتيب'
			},
			{
				item: 'قارورة زيت',
				defItems: 'قوارير الزيت',
				container: 'علب كرتونية',
				defContainer: 'العلب الكرتونية',
				perContainer: 'علبة',
				verb: 'تعبئة'
			},
			{
				item: 'كراساً',
				defItems: 'الكراريس',
				container: 'رزم',
				defContainer: 'الرزم',
				perContainer: 'رزمة',
				verb: 'تجميع'
			}
		]);

		// Three distinct numbers for divisibility table (2, 3, 4, 5, 9)
		const n1 = 36 * rng.int(11, 26); // div by 2, 3, 4, 9 (maybe 5)
		const n2 = 15 * rng.pick([11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]); // div by 3, 5; NOT 2, 4, 9
		const n3 = rng.pick([124, 148, 212, 236, 316, 352, 412, 428, 512, 536, 628, 712, 724, 832]); // div by 2, 4; NOT 3, 5, 9

		const divRow = (n: number) =>
			[2, 3, 4, 5, 9].map((d) => ({
				content: '...',
				answer: n % d === 0 ? 'نعم' : 'لا'
			}));

		const divTable: TableBlock = {
			type: 'table',
			headers: ['العدد', '$2$', '$3$', '$4$', '$5$', '$9$'],
			cells: [],
			rows: [
				[`$${n1}$`, ...divRow(n1)],
				[`$${n2}$`, ...divRow(n2)],
				[`$${n3}$`, ...divRow(n3)]
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const correctEq = `$${a} = ${b} \\times ${q} + ${r}$`;
			const mcq = buildUniqueMcqOptions(
				correctEq,
				[
					{
						text: `$${a} = ${b} \\times ${q - 1} + ${r + b}$`,
						diagnosticFeedback: `تحقق من شرط الباقي! هنا الباقي $${r + b}$ أكبر من القاسم $${b}$، ويجب دوماً أن يكون الباقي أصغر تماماً من القاسم.`
					},
					{
						text: `$${a} = ${b} \\times ${q + 1} - ${b - r}$`,
						diagnosticFeedback: 'في المساواة الإقليدية نضيف الباقي ($0 \\le r < b$) ولا نطرح!'
					},
					{
						text: `$${a} = ${b} \\times ${q + 1} + ${r}$`,
						diagnosticFeedback: `تحقق من الحساب: $${b} \\times ${q + 1} + ${r} = ${b * (q + 1) + r} \\neq ${a}$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `أيّ مساواة تعبّر بشكل صحيح عن القسمة الإقليدية للعدد $${a}$ على $${b}$؟`,
				questionTextAr: `أيّ مساواة تعبّر بشكل صحيح عن القسمة الإقليدية للعدد $${a}$ على $${b}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $${b} \\times ${q} = ${b * q}$ و $${a} - ${b * q} = ${r}$، وبما أن $${r} < ${b}$ فإن المساواة الإقليدية الصحيحة هي $${a} = ${b} \\times ${q} + ${r}$.`
			};
			hints = [
				'في القسمة الإقليدية، المساواة هي: المقسوم = القاسم × الحاصل + الباقي.',
				`تحقق من أن الباقي موجب أو معدوم وأصغر تماماً من القاسم $${b}$.`,
				`احسب $${b} \\times ${q}$ ثم أضف الباقي لتتأكد من الوصول إلى $${a}$.`
			];
			solutionStepsAr = [
				`نبحث عن أكبر مضاعف للعدد $${b}$ لا يتجاوز $${a}$: $${b} \\times ${q} = ${b * q}$.`,
				`نحسب الباقي: $${a} - ${b * q} = ${r}$، ونتحقق من أن $0 \\le ${r} < ${b}$.`,
				`إذن المساواة الإقليدية هي: $${a} = ${b} \\times ${q} + ${r}$.`
			];
			finalAnswer = `${a} = ${b} × ${q} + ${r}`;
		} else if (difficulty === 'medium') {
			const askAllContainers = seed % 2 === 0;
			const expected = askAllContainers ? minContainers : r;
			const questionText = askAllContainers
				? `أراد تاجر ${ctx.verb} $${a}$ ${ctx.item} في ${ctx.container} يسع كل ${ctx.perContainer} $${b}$ ${ctx.item}. ما هو أقل عدد من ${ctx.defContainer} اللازمة لتخزين **جميع** الكمية؟`
				: `أراد تاجر ${ctx.verb} $${a}$ ${ctx.item} بالتساوي في ${ctx.container} يسع كل ${ctx.perContainer} $${b}$ ${ctx.item}. أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$ ثم اكتب **الباقي** (عدد القطع المتبقية خارج ${ctx.defContainer} المملوءة).`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				questionData: {
					answer: expected,
					displayTemplate: askAllContainers ? `${a} ÷ ${b}  ← أقل عدد من ${ctx.defContainer}` : `${a} = ${b} × q + r  ←  r = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: askAllContainers
					? `القسمة الإقليدية تعطي $${a} = ${b} \\times ${q} + ${r}$. تملأ $${q}$ ${ctx.container} بالكامل ويبقى $${r}$ خارجها، لذا نحتاج إلى $${q} + 1 = ${minContainers}$ ${ctx.perContainer}.`
					: `القسمة الإقليدية للعدد $${a}$ على $${b}$ تعطي $${a} = ${b} \\times ${q} + ${r}$، إذن الحاصل $${q}$ والباقي هو $${r}$.`
			};
			hints = [
				`أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$ لتعيين الحاصل $q$ والباقي $r$.`,
				`نجد $${b} \\times ${q} = ${b * q}$ والباقي $${a} - ${b * q} = ${r}$.`,
				askAllContainers
					? `بما أن الباقي $${r} > 0$، نحتاج إلى ${ctx.perContainer} إضافي للكمية المتبقية: $${q} + 1$.`
					: `الباقي هو العدد $${r}$ الذي يحقق $0 \\le ${r} < ${b}$.`
			];
			solutionStepsAr = [
				`القسمة الإقليدية: $${a} = ${b} \\times ${q} + ${r}$ (حيث $${r} < ${b}$).`,
				askAllContainers
					? `${ctx.defContainer} الـ $${q}$ المملوءة تترك $${r}$ ${ctx.item}، فنضيف ${ctx.perContainer} واحداً: $${q} + 1 = ${minContainers}$.`
					: `الباقي هو $${r}$ لأن $${a} - ${b * q} = ${r}$.`
			];
			finalAnswer = `${expected}`;
		} else {
			// hard: MCQ testing divisibility by 4 and 9 simultaneously
			const cBoth = n1; // div by 4 and 9
			const cDiv4Only = 4 * rng.pick([31, 41, 43, 53, 61, 71, 83, 101, 103, 113, 131, 143]); // last 2 digits mult of 4, sum not mult of 9
			const cDiv9Only = 9 * rng.pick([13, 15, 17, 19, 23, 25, 29, 31, 35, 37, 41, 43]); // odd mult of 9 -> never div by 4
			const cNeither = 2 * rng.pick([107, 113, 119, 127, 131, 137, 149, 157, 167, 173]); // even not div by 4, not div by 9

			const mcq = buildUniqueMcqOptions(
				`$${cBoth}$`,
				[
					{
						text: `$${cDiv4Only}$`,
						diagnosticFeedback: `العدد $${cDiv4Only}$ يقبل القسمة على $4$ فقط، لأن مجموع أرقامه لا يقبل القسمة على $9$.`
					},
					{
						text: `$${cDiv9Only}$`,
						diagnosticFeedback: `العدد $${cDiv9Only}$ يقبل القسمة على $9$ (مجموع أرقامه مضاعف لـ $9$)، لكنه فردي فلا يقبل القسمة على $4$.`
					},
					{
						text: `$${cNeither}$`,
						diagnosticFeedback: `العدد $${cNeither}$ يقبل القسمة على $2$ فقط، لكنه لا يقبل القسمة على $4$ ولا على $9$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: 'أيّ من الأعداد الطبيعية التالية يقبل القسمة على **$4$ و $9$ معاً**؟',
				questionTextAr: 'أيّ من الأعداد الطبيعية التالية يقبل القسمة على $4$ و $9$ معاً؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نختبر العدد $${cBoth}$: العدد المكوّن من رقمي آحاده وعشراته (${cBoth % 100}) يقبل القسمة على $4$، ومجموع أرقامه مضاعف للعدد $9$، إذن $${cBoth}$ يقبل القسمة على $4$ و $9$ معاً.`
			};
			hints = [
				'يقبل عدد طبيعي القسمة على $4$ إذا كان العدد المشكّل من آخر رقمين فيه يقبل القسمة على $4$.',
				'يقبل عدد طبيعي القسمة على $9$ إذا كان مجموع أرقامه مضاعفاً للعدد $9$.',
				'تحقق من الشرطين معاً في كل خيار لاستبعاد الأعداد الفردية أو التي لا يحقق مجموع أرقامها مضاعفات $9$.'
			];
			solutionStepsAr = [
				`نختبر قابلية القسمة على $4$ بالنظر إلى آخر رقمين في كل عدد (مضاعف للعدد $4$).`,
				`نختبر قابلية القسمة على $9$ بجمع أرقام كل عدد: العدد $${cBoth}$ يحقق الشرطين معاً.`
			];
			finalAnswer = `${cBoth}`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أراد تاجر ${ctx.verb} $${a}$ ${ctx.item} في ${ctx.container} يسع كل ${ctx.perContainer} $${b}$ ${ctx.item}:`,
				content: [
					{
						type: 'text',
						content: `1) أنجز القسمة الإقليدية للعدد $${a}$ على $${b}$، ثم عبّر عنها بالمساواة المناسبة مع تحديد الحاصل والباقي.`,
						answer: `1) الحاصل هو $${q}$ والباقي هو $${r}$ (مع $${r} < ${b}$)، والمساواة الإقليدية: $${a} = ${b} times ${q} + ${r}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) ما هو أقل عدد من ${ctx.defContainer} اللازمة لجمع جميع ${ctx.defItems}؟ وكم ${ctx.item} تنقص لملء آخر ${ctx.perContainer} بالكامل؟`,
						answer: `2) يلزم $${q} + 1 = ${minContainers}$ ${ctx.perContainer}، وتنقص $${b} - ${r} = ${missingToFill}$ ${ctx.item} لملء آخر ${ctx.perContainer} بالكامل.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '3) أكمل الجدول التالي بوضع (نعم) أو (لا) لتحديد قابلية قسمة كل عدد على 2، 3، 4، 5، 9:',
						answer: '3) جدول قابلية القسمة (تطبيق قواعد قابلية القسمة على 2، 3، 4، 5، 9):',
						mark: '1'
					},
					divTable
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Decimal Division by Natural & Approximations / Framing / Rounding to Unit
// ═══════════════════════════════════════════════════════════════════════════════
const t2DecimalDivisionApproximations: ParameterizedTemplate = {
	id: '1am_t2_decimal_division_approximations',
	grade: '1am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'القسمة العشرية والقيم المقربة والحصر والمدور',
	curriculumLessonId: 'lesson_1am_t2_decimal_division_approximations_rounding',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Exact decimal division D_exact / d = q_exact
		let d: number;
		let fracH: number;
		let uExact: number;
		if (difficulty === 'easy') {
			d = rng.pick([4, 5, 8]);
			uExact = rng.int(2, 9);
			fracH = d === 5 ? rng.pick([14, 26, 38, 42, 64, 78, 86]) : rng.pick([25, 75, 15, 35, 65, 85]);
		} else {
			d = rng.pick([6, 8, 12, 15]);
			uExact = rng.int(3, 12);
			fracH =
				d === 6 || d === 12
					? rng.pick([25, 75, 15, 35, 45, 65, 85])
					: rng.pick([12, 24, 36, 48, 62, 74, 86]);
		}
		const qExact = roundTo(uExact + fracH / 100, 2);
		const DExact = roundTo(qExact * d, 2);

		// Part 2: Non-terminating division a / b for approximations & rounding
		const b = difficulty === 'easy' ? rng.pick([3, 6, 7]) : rng.pick([3, 6, 7, 9, 11]);
		const u0 = rng.int(4, 16);
		const remChoices = Array.from({ length: b - 1 }, (_, i) => i + 1).filter((r) => !(b === 6 && r === 3));
		const rem = rng.pick(remChoices);
		const a = u0 * b + rem;

		// Exact digits via integer arithmetic
		const r1 = a % b;
		const d1 = Math.floor((r1 * 10) / b);
		const r2 = (r1 * 10) % b;
		const d2 = Math.floor((r2 * 10) / b);
		const r3 = (r2 * 10) % b;
		const d3 = Math.floor((r3 * 10) / b);
		const approx3Str = `${u0}.${d1}${d2}${d3}`;

		const defUnit = u0;
		const excUnit = u0 + 1;
		const defTenth = roundTo(u0 + d1 / 10, 1);
		const excTenth = roundTo(defTenth + 0.1, 1);
		const roundedUnit = d1 >= 5 ? excUnit : defUnit;
		const wrongRoundedUnit = d1 >= 5 ? defUnit : excUnit;

		const approxTable: TableBlock = {
			type: 'table',
			headers: [
				'بالنقصان إلى الوحدة',
				'بالزيادة إلى الوحدة',
				'الحصر إلى $0.1$',
				'المدور إلى الوحدة'
			],
			cells: [
				{ content: '...', answer: `$${defUnit}$` },
				{ content: '...', answer: `$${excUnit}$` },
				{ content: '...', answer: `$${defTenth} < frac(${a}, ${b}) < ${excTenth}$` },
				{ content: '...', answer: `$${roundedUnit}$` }
			],
			align: 'center',
			borders: 'grid',
			headerBackground: true
		};

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			quizQuestion = {
				type: 'calculated',
				questionText: `احسب الحاصل المضبوط للقسمة العشرية: $${DExact} \\div ${d}$`,
				questionTextAr: `احسب الحاصل المضبوط للقسمة العشرية: $${DExact} \\div ${d}$`,
				questionData: {
					answer: qExact,
					displayTemplate: `${DExact} ÷ ${d} = ?`,
					variables: [],
					tolerance: 0.001
				},
				explanation: `بإجراء القسمة العشرية للعدد $${DExact}$ على $${d}$، ينعدم الباقي ونجد الحاصل المضبوط $${qExact}$.`
			};
			hints = [
				`ابدأ بقسمة الجزء الصحيح من $${DExact}$ على $${d}$.`,
				'ضع الفاصلة في الحاصل بمجرد إنزال رقم الأعشار.',
				'أضف أصفاراً على يمين الباقي عند الحاجة حتى ينعدم الباقي تماماً.'
			];
			solutionStepsAr = [
				`نقسم الجزء الصحيح على $${d}$ ثم نضع الفاصلة في الحاصل عند المرور إلى الأعشار.`,
				`نكمل القسمة بإضافة صفر عند الحاجة حتى ينعدم الباقي، فنجد القيمة المضبوطة $${DExact} \\div ${d} = ${qExact}$.`
			];
			finalAnswer = `${qExact}`;
		} else if (difficulty === 'medium') {
			const correctText = `$${defTenth} < \\frac{${a}}{${b}} < ${excTenth}$ والمدور إلى الوحدة هو $${roundedUnit}$`;
			const shiftedTenth = roundTo(excTenth + 0.1, 1);
			const mcq = buildUniqueMcqOptions(
				correctText,
				[
					{
						text: `$${defTenth} < \\frac{${a}}{${b}} < ${excTenth}$ والمدور إلى الوحدة هو $${wrongRoundedUnit}$`,
						diagnosticFeedback:
							d1 >= 5
								? `الحصر إلى $0.1$ صحيح، لكن رقم الأعشار هو $${d1} \\ge 5$ لذا فالمدور إلى الوحدة هو $${roundedUnit}$ وليس $${wrongRoundedUnit}$.`
								: `الحصر إلى $0.1$ صحيح، لكن رقم الأعشار هو $${d1} < 5$ لذا فالمدور إلى الوحدة هو $${roundedUnit}$ وليس $${wrongRoundedUnit}$.`
					},
					{
						text: `$${defUnit} < \\frac{${a}}{${b}} < ${excUnit}$ والمدور إلى الوحدة هو $${roundedUnit}$`,
						diagnosticFeedback: `انتبه! الحصر $${defUnit} < \\frac{${a}}{${b}} < ${excUnit}$ هو الحصر إلى **الوحدة** وليس الحصر إلى $0.1$ المطلوب.`
					},
					{
						text: `$${excTenth} < \\frac{${a}}{${b}} < ${shiftedTenth}$ والمدور إلى الوحدة هو $${wrongRoundedUnit}$`,
						diagnosticFeedback: `القيمة المقربة بالنقصان إلى $0.1$ للعدد $${approx3Str}\\dots$ هي $${defTenth}$ وليست $${excTenth}$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في القسمة العشرية غير المنتهية $${a} \\div ${b} = ${approx3Str}\\dots$، ما هو **الحصر إلى $0.1$** وما هو **المدور إلى الوحدة** لحاصل القسمة؟`,
				questionTextAr: `في القسمة العشرية $${a} \\div ${b} = ${approx3Str}\\dots$، ما هو الحصر إلى $0.1$ والمدور إلى الوحدة؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقطع بعد رقم الأعشار فنحصل على $${defTenth}$ بالنقصان و $${excTenth}$ بالزيادة، أي $${defTenth} < \\frac{${a}}{${b}} < ${excTenth}$. ولأن رقم الأعشار هو $${d1}$، فالمدور إلى الوحدة هو $${roundedUnit}$.`
			};
			hints = [
				`للحصر إلى $0.1$، نأخذ رقماً واحداً بعد الفاصلة بالنقصان ($${defTenth}$) ثم نضيف $0.1$ بالزيادة ($${excTenth}$).`,
				`لتعيين المدور إلى الوحدة، ننظر إلى رقم الأعشار (أول رقم بعد الفاصلة) وهو $${d1}$.`,
				`إذا كان رقم الأعشار أصغر من $5$ نأخذ $${defUnit}$، وإذا كان $5$ أو أكبر نأخذ $${excUnit}$.`
			];
			solutionStepsAr = [
				`القيمة المقربة بالنقصان إلى $0.1$ هي $${defTenth}$ وبالزيادة إلى $0.1$ هي $${excTenth}$، ومنه الحصر: $${defTenth} < \\frac{${a}}{${b}} < ${excTenth}$.`,
				`رقم الأعشار في $${approx3Str}\\dots$ هو $${d1}$، إذن المدور إلى الوحدة هو $${roundedUnit}$.`
			];
			finalAnswer = `${defTenth} < ${a}/${b} < ${excTenth} | المدور: ${roundedUnit}`;
		} else {
			// hard: pair (excess to unit, deficit to 0.1)
			const correctPair = `$${excUnit}$ و $${defTenth}$`;
			const mcq = buildUniqueMcqOptions(
				correctPair,
				[
					{
						text: `$${defUnit}$ و $${defTenth}$`,
						diagnosticFeedback: `القيمة $${defUnit}$ هي القيمة المقربة **بالنقصان** إلى الوحدة وليست **بالزيادة** إلى الوحدة!`
					},
					{
						text: `$${excUnit}$ و $${excTenth}$`,
						diagnosticFeedback: `القيمة $${excTenth}$ هي القيمة المقربة **بالزيادة** إلى $0.1$ وليست **بالنقصان** إلى $0.1$!`
					},
					{
						text: `$${defUnit}$ و $${excTenth}$`,
						diagnosticFeedback: 'عكستَ الاتجاهين: المطلوب أولاً بالزيادة إلى الوحدة ($' + excUnit + '$) وثانياً بالنقصان إلى $0.1$ ($' + defTenth + '$).'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `وزّع مزارع $${a}\\text{ L}$ من زيت الزيتون بالتساوي على $${b}$ دلاء، فوجد $${a} \\div ${b} = ${approx3Str}\\dots$. ما هي القيمة المقربة **بالزيادة إلى الوحدة**، وما هي القيمة المقربة **بالنقصان إلى $0.1$** لهذا الحاصل على الترتيب؟`,
				questionTextAr: `في القسمة $${a} \\div ${b} = ${approx3Str}\\dots$، ما القيمة المقربة بالزيادة إلى الوحدة وبالنقصان إلى $0.1$ على الترتيب؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الجزء الصحيح هو $${defUnit}$، إذن القيمة المقربة بالزيادة إلى الوحدة هي $${defUnit} + 1 = ${excUnit}$. أما القيمة المقربة بالنقصان إلى $0.1$ فنأخذها بقطع العدد بعد رقم الأعشار أي $${defTenth}$.`
			};
			hints = [
				`الجزء الصحيح للحاصل هو $${defUnit}$، إذن القيمة المقربة بالزيادة إلى الوحدة هي $${defUnit} + 1$.`,
				'القيمة المقربة بالنقصان إلى $0.1$ هي أخذ رقم الأعشار الأول بعد الفاصلة كما هو.',
				`رتّب الإجابتين بدقة: أولاً بالزيادة إلى الوحدة ($${excUnit}$)، وثانياً بالنقصان إلى $0.1$ ($${defTenth}$).`
			];
			solutionStepsAr = [
				`القيمة المقربة بالنقصان إلى الوحدة هي $${defUnit}$، لذا بالزيادة إلى الوحدة هي $${excUnit}$.`,
				`نقطع $${approx3Str}\\dots$ بعد رقم الأعشار فنجد القيمة المقربة بالنقصان إلى $0.1$ وهي $${defTenth}$.`
			];
			finalAnswer = `${excUnit} و ${defTenth}`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أنجز العمليات العشرية التالية بتمعّن ثم أكمل المطلوب:',
				content: [
					{
						type: 'text',
						content: `1) أنجز القسمة العشرية المضبوطة عمودياً: $${DExact} div ${d}$`,
						answer: `1) الباقي ينعدم، والحاصل المضبوط هو: $${DExact} div ${d} = ${qExact}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) أنجز القسمة العشرية للعدد $${a}$ على $${b}$ بالتوقف عند رقمين بعد الفاصلة، وهل الحاصل قيمة مضبوطة أم مقربة؟`,
						answer: `2) نجد $${a} div ${b} approx ${u0}.${d1}${d2}$ (الباقي لا ينعدم، إذن الحاصل قيمة مقربة).`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) اعتماداً على حاصل القسمة $${a} div ${b} = ${approx3Str} dots.h$، أكمل الجدول التالي:`,
						answer: `3) القيم المقربة والحصر والمدور للحاصل $frac(${a}, ${b})$ (رقم الأعشار $${d1}$):`,
						mark: '1'
					},
					approxTable
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fractions: Quotient, Simplification & k × a/b (svgFractionBar)
// ═══════════════════════════════════════════════════════════════════════════════
const t2FractionsQuotientSimplifyProduct: ParameterizedTemplate = {
	id: '1am_t2_fractions_quotient_simplify_product',
	grade: '1am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الكتابات الكسرية والاختزال وحساب k × a/b',
	curriculumLessonId: 'lesson_1am_t2_fractions_quotient_simplifying_product',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Choose irreducible proper fraction (p, q) with p*2 !== q so shaded !== unshaded
		const basePairs: [number, number][] = [
			[1, 3],
			[2, 3],
			[1, 4],
			[3, 4],
			[1, 5],
			[2, 5],
			[3, 5],
			[4, 5]
		];
		const [p, q] = rng.pick(basePairs);
		const m = difficulty === 'easy' ? 2 : q <= 4 ? rng.pick([2, 3]) : rng.pick([2, 3]);
		const shaded = p * m;
		const total = q * m;
		const unshaded = total - shaded;

		// Larger fraction for simplification practice in Sujet
		const bigMult = rng.pick([6, 7, 8, 9, 12]);
		const bigNum = p * bigMult;
		const bigDen = q * bigMult;

		// k * (p / q) where k is multiple of q
		const multK = difficulty === 'easy' ? rng.int(3, 7) : rng.int(5, 12);
		const k = q * multK;
		const partAmount = multK * p;
		const remAmount = k - partAmount;

		const svg = svgFractionBar(shaded, total);
		const imageUrl = saveSvgAsset(`1am_t2_frac_${difficulty}_${seed}`, svg);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const correctOpt = `$${formatFracKatex(p, q)}$`;
			const [uP, uQ] = simplifyFraction(unshaded, total);
			const invText = `$${formatFracKatex(q, p)}$`;
			const rawText = `$${formatFracKatex(shaded, total)}$`;
			const unshadedOpt = `$${formatFracKatex(uP, uQ)}$`;
			const fallbackInv = `$${formatFracKatex(total, shaded)}$`;

			const mcq = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: rawText,
						diagnosticFeedback: `الكسر $${formatFracKatex(shaded, total)}$ يعبّر عن الجزء الملوّن لكنه **غير مختزل** إلى أبسط شكل! اقسم البسط والمقام على $${m}$.`
					},
					{
						text: unshadedOpt,
						diagnosticFeedback: 'انتبه! هذا الكسر يعبّر عن الجزء الأبيض (غير الملوّن) وليس الجزء الملوّن بالأزرق.'
					},
					{
						text: invText === correctOpt ? fallbackInv : invText,
						diagnosticFeedback: 'عكست البسط والمقام! عدد الأجزاء الملوّنة في البسط ومجموع الأجزاء المتساوية في المقام.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `يمثّل الشريط المقابل وحدة مجزّأة إلى $${total}$ أجزاء متساوية. ما هو الكسر **المختزل إلى أبسط شكل ممكن** الذي يمثّل الجزء الملوّن بالأزرق؟`,
				questionTextAr: `ما الكسر المختزل إلى أبسط شكل الذي يمثّل الجزء الملوّن بالأزرق في الشريط المقابل؟`,
				imageUrl,
				imageCaption: `شريط مقسّم إلى ${total} ${total <= 10 ? 'أجزاء متساوية' : 'جزءاً متساوياً'}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الشريط مقسّم إلى $${total}$ أجزاء متساوية ولُوّن منها $${shaded}$ أجزاء، فنحصل على الكسر $\\frac{${shaded}}{${total}}$، وبقسمة البسط والمقام على $${m}$ نجد الكسر المختزل $\\frac{${p}}{${q}}$.`
			};
			hints = [
				`عدّ الأجزاء الملوّنة بالأزرق ($${shaded}$) ومجموع كل الأجزاء ($${total}$) لتكوين الكسر الأولي.`,
				`ابحث عن قاسم مشترك بين $${shaded}$ و $${total}$ (مثل $${m}$).`,
				`اقسم البسط والمقام معاً على $${m}$ للحصول على أبسط كتابة كسرية.`
			];
			solutionStepsAr = [
				`الكسر الممثل للجزء الملوّن هو $\\frac{${shaded}}{${total}}$.`,
				`نختزل بقسمة البسط والمقام على $${m}$: $\\frac{${shaded} \\div ${m}}{${total} \\div ${m}} = \\frac{${p}}{${q}}$.`
			];
			finalAnswer = `${p}/${q}`;
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `خزان ماء سعته $${k}\\text{ L}$، استُهلك منه الكسر $\\frac{${shaded}}{${total}}$ المبيّن على الشريط المقابل. احسب كمية الماء **المستهلكة** باللتر.`,
				questionTextAr: `خزان ماء سعته $${k}\\text{ L}$، استُهلك منه $\\frac{${shaded}}{${total}}$. احسب كمية الماء المستهلكة باللتر.`,
				imageUrl,
				imageCaption: `الجزء الملوّن يمثل الحصة المستهلكة`,
				questionData: {
					answer: partAmount,
					displayTemplate: `${k} × (${p}/${q}) = ? L`,
					variables: [],
					tolerance: 0
				},
				explanation: `أولاً نختزل $\\frac{${shaded}}{${total}} = \\frac{${p}}{${q}}$، ثم نحسب $${k} \\times \\frac{${p}}{${q}} = (${k} \\div ${q}) \\times ${p} = ${multK} \\times ${p} = ${partAmount}\\text{ L}$.`
			};
			hints = [
				`اختزل أولاً الكسر $\\frac{${shaded}}{${total}}$ بقسمة البسط والمقام على $${m}$ لتجد $\\frac{${p}}{${q}}$.`,
				`لحساب $${k} \\times \\frac{${p}}{${q}}$، يُفضّل البدء بقسمة $${k}$ على المقام $${q}$.`,
				`احسب $(${k} \\div ${q}) \\times ${p} = ${multK} \\times ${p}$.`
			];
			solutionStepsAr = [
				`نختزل الكسر: $\\frac{${shaded}}{${total}} = \\frac{${p}}{${q}}$.`,
				`نحسب الجداء: $${k} \\times \\frac{${p}}{${q}} = (${k} \\div ${q}) \\times ${p} = ${multK} \\times ${p} = ${partAmount}\\text{ L}$.`
			];
			finalAnswer = `${partAmount} L`;
		} else {
			// hard: remaining amount after consuming shaded/total of k
			const wrongFlipped = (multK + 1) * p;
			const wrongSubtractNumerator = k - shaded;
			const mcq = buildUniqueMcqOptions(
				`$${remAmount}\\text{ L}$`,
				[
					{
						text: `$${partAmount}\\text{ L}$`,
						diagnosticFeedback: `القيمة $${partAmount}\\text{ L}$ تمثّل الكمية **المستهلكة**، بينما السؤال يطلب الكمية **المتبقية** ($${k} - ${partAmount}$)!`
					},
					{
						text: `$${wrongFlipped}\\text{ L}$`,
						diagnosticFeedback: `تحقق من الحساب: اختزل أولاً $\\frac{${shaded}}{${total}} = \\frac{${p}}{${q}}$، ثم احسب $(${k} \\div ${q}) \\times ${p}$ واطرحه من $${k}$.`
					},
					{
						text: `$${wrongSubtractNumerator}\\text{ L}$`,
						diagnosticFeedback: 'لا نطرح البسط مباشرة من السعة! يجب حساب حصة الكسر من السعة الكلية أولاً.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `خزان ماء سعته $${k}\\text{ L}$، استُهلك منه الكسر $\\frac{${shaded}}{${total}}$ الممثّل بالجزء الملوّن في الشريط المقابل. ما هي كمية الماء **المتبقية** في الخزان باللتر؟`,
				questionTextAr: `خزان سعته $${k}\\text{ L}$ استُهلك منه $\\frac{${shaded}}{${total}}$. ما كمية الماء المتبقية؟`,
				imageUrl,
				imageCaption: `الشريط يمثل حصة الاستهلاك (${shaded}/${total})`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نختزل $\\frac{${shaded}}{${total}} = \\frac{${p}}{${q}}$، فتكون الكمية المستهلكة $${k} \\times \\frac{${p}}{${q}} = (${k} \\div ${q}) \\times ${p} = ${partAmount}\\text{ L}$، ومنه المتبقي $${k} - ${partAmount} = ${remAmount}\\text{ L}$.`
			};
			hints = [
				`اكتب كسر الجزء الملوّن $\\frac{${shaded}}{${total}}$ ثم اختزله إلى $\\frac{${p}}{${q}}$.`,
				`احسب الكمية المستهلكة: $${k} \\times \\frac{${p}}{${q}} = (${k} \\div ${q}) \\times ${p}$.`,
				`اطرح الكمية المستهلكة من السعة الكلية $${k}\\text{ L}$ لإيجاد المتبقي.`
			];
			solutionStepsAr = [
				`الاختزال: $\\frac{${shaded}}{${total}} = \\frac{${p}}{${q}}$.`,
				`الكمية المستهلكة: $(${k} \\div ${q}) \\times ${p} = ${multK} \\times ${p} = ${partAmount}\\text{ L}$.`,
				`الكمية المتبقية: $${k} - ${partAmount} = ${remAmount}\\text{ L}$.`
			];
			finalAnswer = `${remAmount} L`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اعتماداً على الشريط المقابل ومعارفك حول الكسور، أجب عن الأسئلة التالية:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اكتب الكسر الذي يمثّل الجزء الملوّن بالأزرق في الشريط، ثم اختزله إلى أبسط شكل ممكن.\n\n2) أكمل الفراغات بالعدد المناسب اعتماداً على تعريف الكسر كحاصل قسمة: $${q} times "..." = ${p}$، واختزل الكسر $${formatFracTypst(bigNum, bigDen)}$ إلى أبسط شكل.`,
								answer: `1) الكسر الممثل للشريط هو $${formatFracTypst(shaded, total)}$، وبعد الاختزال على $${m}$ نجد $${formatFracTypst(p, q)}$.\n\n2) $${q} times ${formatFracTypst(p, q)} = ${p}$، وباختزال $${formatFracTypst(bigNum, bigDen)}$ على $${bigMult}$ نجد $${formatFracTypst(p, q)}$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `وحدة مجزّأة إلى ${total} ${total <= 10 ? 'أجزاء متساوية' : 'جزءاً متساوياً'}`
							}
						]
					},
					{
						type: 'text',
						content:
							difficulty === 'hard'
								? `3) خزان سعته $${k}$ لتر، استُهلك منه $${formatFracTypst(shaded, total)}$ من سعته. احسب الكمية المستهلكة ثم استنتج الكمية المتبقية في الخزان.`
								: `3) احسب بأبسط طريقة دون إجراء القسمة العشرية: $${k} times ${formatFracTypst(p, q)}$ (علماً أن خزاناً سعته $${k}$ لتر استُهلك منه $${formatFracTypst(p, q)}$).`,
						answer:
							difficulty === 'hard'
								? `3) الكمية المستهلكة: $${k} times ${formatFracTypst(p, q)} = (${k} div ${q}) times ${p} = ${multK} times ${p} = ${partAmount}$ لتر، والمتبقي: $${k} - ${partAmount} = ${remAmount}$ لتر.`
								: `3) $${k} times ${formatFracTypst(p, q)} = (${k} div ${q}) times ${p} = ${multK} times ${p} = ${partAmount}$ لتر.`,
						mark: '1'
					}
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Plane Perimeters & Areas (Rectangle, Square, Right Triangle, Circle 2πR)
// ═══════════════════════════════════════════════════════════════════════════════
const t2PlaneSurfacesPerimeterAreaCircle: ParameterizedTemplate = {
	id: '1am_t2_plane_surfaces_perimeter_area_circle',
	grade: '1am',
	trimesterId: 't2',
	domain: 'measurement',
	titleAr: 'محيطات ومساحات السطوح المستوية وطول الدائرة',
	curriculumLessonId: 'lesson_1am_t2_plane_surfaces_perimeter_area_circle',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Circle parameters (strictly circumference 2*pi*R or pi*D, NEVER disc area pi*R^2 in 1AM!)
		const circleRadius = rng.int(3, 9);
		const circleDiameter = circleRadius * 2;
		const circleLength = roundTo(circleDiameter * 3.14, 2);

		// Area conversion values
		const convM2 = roundTo(rng.int(2, 9) + rng.pick([0.4, 0.5, 0.25, 0.75]), 2);
		const convDm2 = roundTo(convM2 * 100, 0);
		const convCm2 = roundTo(convM2 * 10000, 0);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let sujetContent: ContentBlock[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const isSquare = seed % 2 === 0;
			if (isSquare) {
				const side = rng.int(5, 14);
				const sqArea = side * side;
				const sqPerim = 4 * side;
				const svg = svgRectangle({
					lengthLabel: `${side} cm`,
					widthLabel: `${side} cm`,
					shapeLabel: 'مربع',
					vertices: ['A', 'B', 'C', 'D']
				});
				const imageUrl = saveSvgAsset(`1am_t2_meas_easy_${seed}`, svg);

				quizQuestion = {
					type: 'calculated',
					questionText: `لاحظ المربع $ABCD$ المقابل الذي طول ضلعه $${side}\\text{ cm}$. احسب **مساحته** بـ $\\text{cm}^2$.`,
					questionTextAr: `مربع طول ضلعه $${side}\\text{ cm}$. احسب مساحته بـ $\\text{cm}^2$.`,
					imageUrl,
					imageCaption: `مربع ABCD ضلعه ${side} cm`,
					questionData: {
						answer: sqArea,
						displayTemplate: `c = ${side} cm  →  S = ? cm²`,
						variables: [],
						tolerance: 0
					},
					explanation: `مساحة المربع تساوي طول الضلع في نفسه: $S = ${side} \\times ${side} = ${sqArea}\\text{ cm}^2$.`
				};
				sujetContent = [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب محيط ومساحة المربع $A B C D$ المقابل الذي طول ضلعه $${side}$ سم.`,
								answer: `1) المحيط: $P = 4 times ${side} = ${sqPerim}$ سم. المساحة: $S = ${side} times ${side} = ${sqArea}$ سم².`,
								mark: '1'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `المربع ABCD (${side} cm)`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب طول دائرة (محيط قرص) نصف قطرها $R = ${circleRadius}$ سم بأخذ $pi approx 3.14$.`,
						answer: `2) $P = 2 times pi times R approx 2 times 3.14 times ${circleRadius} = ${circleLength}$ سم.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حوّل المساحة $${convM2}$ م² إلى الديسيمتر المربع (dm²) وإلى السنتيمتر المربع (cm²).`,
						answer: `3) $${convM2}$ م² $= ${convDm2}$ dm² $= ${convCm2}$ cm².`,
						mark: '1'
					}
				];
				hints = [
					'مساحة المربع تساوي الضلع × الضلع، بينما محيطه يساوي 4 × الضلع.',
					`اضرب $${side} \\times ${side}$ للحصول على المساحة بالسنتيمتر المربع.`,
					'لا تخلط بين المحيط ($4 \\times c$) والمساحة ($c \\times c$).'
				];
				solutionStepsAr = [
					`قانون مساحة المربع: $S = c \\times c$.`,
					`التطبيق العددي: $S = ${side} \\times ${side} = ${sqArea}\\text{ cm}^2$.`
				];
				finalAnswer = `${sqArea} cm²`;
			} else {
				const L = rng.int(9, 18);
				const W = rng.int(4, L - 2);
				const rectPerim = 2 * (L + W);
				const rectArea = L * W;
				const svg = svgRectangle({
					lengthLabel: `${L} cm`,
					widthLabel: `${W} cm`,
					vertices: ['A', 'B', 'C', 'D']
				});
				const imageUrl = saveSvgAsset(`1am_t2_meas_easy_${seed}`, svg);

				quizQuestion = {
					type: 'calculated',
					questionText: `لاحظ المستطيل $ABCD$ المقابل الذي طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب **محيطه** بـ $\\text{cm}$.`,
					questionTextAr: `مستطيل طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$. احسب محيطه بـ $\\text{cm}$.`,
					imageUrl,
					imageCaption: `مستطيل ABCD (${L} cm × ${W} cm)`,
					questionData: {
						answer: rectPerim,
						displayTemplate: `P = 2 × (${L} + ${W}) = ? cm`,
						variables: [],
						tolerance: 0
					},
					explanation: `محيط المستطيل هو $P = 2 \\times (L + \\ell) = 2 \\times (${L} + ${W}) = 2 \\times ${L + W} = ${rectPerim}\\text{ cm}$.`
				};
				sujetContent = [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب محيط ومساحة المستطيل $A B C D$ المقابل ($A B = ${L}$ سم و $B C = ${W}$ سم).`,
								answer: `1) المحيط: $P = 2 times (${L} + ${W}) = ${rectPerim}$ سم. المساحة: $S = ${L} times ${W} = ${rectArea}$ سم².`,
								mark: '1'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: `المستطيل ABCD (${L} cm × ${W} cm)`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب طول دائرة نصف قطرها $R = ${circleRadius}$ سم بأخذ $pi approx 3.14$.`,
						answer: `2) $P = 2 times pi times R approx 2 times 3.14 times ${circleRadius} = ${circleLength}$ سم.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حوّل المساحة $${convM2}$ م² إلى الديسيمتر المربع (dm²) وإلى السنتيمتر المربع (cm²).`,
						answer: `3) $${convM2}$ م² $= ${convDm2}$ dm² $= ${convCm2}$ cm².`,
						mark: '1'
					}
				];
				hints = [
					'محيط المستطيل يساوي ضعف مجموع الطول والعرض: $2 \\times (L + \\ell)$.',
					`اجمع أولاً الطول والعرض: $${L} + ${W} = ${L + W}\\text{ cm}$.`,
					`اضرب المجموع في $2$: $2 \\times ${L + W} = ${rectPerim}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`نطبق قانون محيط المستطيل: $P = 2 \\times (L + \\ell)$.`,
					`نجد: $P = 2 \\times (${L} + ${W}) = 2 \\times ${L + W} = ${rectPerim}\\text{ cm}$.`
				];
				finalAnswer = `${rectPerim} cm`;
			}
		} else if (difficulty === 'medium') {
			// Right triangle with genuine integer Pythagorean triples where P !== S
			const triple = rng.pick([
				[9, 12, 15],
				[8, 15, 17],
				[12, 16, 20],
				[10, 24, 26],
				[7, 24, 25],
				[15, 20, 25]
			] as const);
			const [ab, ac, bc] = triple;
			const triArea = (ab * ac) / 2;
			const triPerim = ab + ac + bc;
			const wrongNoDiv2 = ab * ac;
			const wrongHyp = roundTo((ab * bc) / 2, 1);

			const svg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${ab} cm`,
				sideAC: `${ac} cm`,
				sideBC: `${bc} cm`
			});
			const imageUrl = saveSvgAsset(`1am_t2_meas_med_${seed}`, svg);

			const mcq = buildUniqueMcqOptions(
				`$${triArea}\\text{ cm}^2$`,
				[
					{
						text: `$${wrongNoDiv2}\\text{ cm}^2$`,
						diagnosticFeedback: 'نسيت القسمة على $2$! مساحة المثلث القائم تساوي نصف جداء الضلعين القائمين: $(AB \\times AC) \\div 2$.'
					},
					{
						text: `$${wrongHyp}\\text{ cm}^2$`,
						diagnosticFeedback: `انتبه! الضلع $BC = ${bc}\\text{ cm}$ هو الوتر، ولحساب مساحة المثلث القائم نستعمل الضلعين القائمين المحيطين بالزاوية القائمة في $A$ فقط ($AB$ و $AC$).`
					},
					{
						text: `$${triPerim}\\text{ cm}^2$`,
						diagnosticFeedback: 'حسبتَ مجموع الأضلاع الثلاثة (المحيط) بدلاً من المساحة!'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `لاحظ المثلث القائم $ABC$ في $A$ المقابل حيث $AB = ${ab}\\text{ cm}$ و $AC = ${ac}\\text{ cm}$ و $BC = ${bc}\\text{ cm}$. ما هي **مساحته**؟`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ ($AB = ${ab}\\text{ cm}$، $AC = ${ac}\\text{ cm}$، $BC = ${bc}\\text{ cm}$). ما مساحته؟`,
				imageUrl,
				imageCaption: `مثلث قائم في A`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الضلعان القائمان في $A$ هما $AB = ${ab}\\text{ cm}$ و $AC = ${ac}\\text{ cm}$، إذن مساحة المثلث القائم هي $S = (${ab} \\times ${ac}) \\div 2 = ${wrongNoDiv2} \\div 2 = ${triArea}\\text{ cm}^2$.`
			};
			sujetContent = [
				{
					type: 'columns',
					widths: ['1.5fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) لاحظ المثلث القائم $A B C$ في $A$ المقابل ($A B = ${ab}$ سم، $A C = ${ac}$ سم، $B C = ${bc}$ سم). احسب محيطه ثم احسب مساحته.`,
							answer: `1) المحيط: $P = ${ab} + ${ac} + ${bc} = ${triPerim}$ سم.\n\nالمساحة: $S = (${ab} times ${ac}) div 2 = ${wrongNoDiv2} div 2 = ${triArea}$ سم².`,
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'المثلث القائم ABC'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب طول دائرة قطرها $D = ${circleDiameter}$ سم بأخذ $pi approx 3.14$.`,
					answer: `2) $P = D times pi approx ${circleDiameter} times 3.14 = ${circleLength}$ سم.`,
					mark: '0.75'
				},
				{
					type: 'text',
					content: `3) حوّل المساحات التالية: $${convM2}$ م² إلى dm²، و $${rng.int(2, 6)}$ هكتار (ha) إلى م².`,
					answer: `3) $${convM2}$ م² $= ${convDm2}$ dm²، والهكتار يساوي $10000$ م².`,
					mark: '0.75'
				}
			];
			hints = [
				'الزاوية القائمة تقع عند الرأس $A$، إذن الضلعان القائمان هما $[AB]$ و $[AC]$.',
				'مساحة المثلث القائم تساوي نصف جداء الضلعين القائمين (لا نستعمل الوتر $[BC]$).',
				`احسب $(${ab} \\times ${ac}) \\div 2$.`
			];
			solutionStepsAr = [
				`نحدّد الضلعين القائمين عند $A$: $AB = ${ab}\\text{ cm}$ و $AC = ${ac}\\text{ cm}$.`,
				`نحسب المساحة: $S = (${ab} \\times ${ac}) \\div 2 = ${wrongNoDiv2} \\div 2 = ${triArea}\\text{ cm}^2$.`
			];
			finalAnswer = `${triArea} cm²`;
		} else {
			// hard: circle length given diameter D (trap: 2*D*pi vs (D/2)*pi) + composite rectangle & right triangle in Sujet
			const diam = rng.pick([5, 6, 7, 8, 9, 10, 12, 14, 15, 16]);
			const circLen = roundTo(diam * 3.14, 2);
			const wrongMul2 = roundTo(2 * diam * 3.14, 2);
			const wrongHalf = roundTo((diam / 2) * 3.14, 2);
			const wrongAdd = roundTo(diam + 3.14, 2);

			const L = rng.int(10, 16);
			const W = rng.pick([6, 8, 10]);
			const triLeg = rng.int(3, 7);
			const rectS = L * W;
			const triS = (W * triLeg) / 2;
			const compS = rectS + triS;
			const haVal = roundTo(rng.int(1, 5) + rng.pick([0.2, 0.4, 0.5, 0.8]), 1);
			const haInM2 = roundTo(haVal * 10000, 0);

			const svg = svgRectangle({
				lengthLabel: `${L} cm`,
				widthLabel: `${W} cm`,
				shapeLabel: 'مستطيل',
				vertices: ['A', 'B', 'C', 'D']
			});
			const imageUrl = saveSvgAsset(`1am_t2_meas_hard_${seed}`, svg);

			const mcq = buildUniqueMcqOptions(
				`$${circLen}\\text{ cm}$`,
				[
					{
						text: `$${wrongMul2}\\text{ cm}$`,
						diagnosticFeedback: `انتبه! $${diam}\\text{ cm}$ هو **القطر $D$** وليس نصف القطر $R$؛ لذلك نضرب في $\\pi$ مباشرة ($D \\times \\pi$) ولا نضرب في $2$!`
					},
					{
						text: `$${wrongHalf}\\text{ cm}$`,
						diagnosticFeedback: 'استعملتَ نصف القطر دون الضرب في $2$! الصيغة هي $P = 2 \\times \\pi \\times R = D \\times \\pi$.'
					},
					{
						text: `$${wrongAdd}\\text{ cm}$`,
						diagnosticFeedback: 'طول الدائرة يُحسب بضرب القطر في $\\pi \\approx 3.14$ وليس بالجمع.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `ما هو طول دائرة (محيط قرص) **قطرها** $D = ${diam}\\text{ cm}$ بأخذ $\\pi \\approx 3.14$؟`,
				questionTextAr: `ما طول دائرة قطرها $D = ${diam}\\text{ cm}$ بأخذ $\\pi \\approx 3.14$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لأن المعطى هو القطر $D = ${diam}\\text{ cm}$، نستعمل القانون $P = D \\times \\pi \\approx ${diam} \\times 3.14 = ${circLen}\\text{ cm}$.`
			};
			sujetContent = [
				{
					type: 'text',
					content: `1) احسب طول دائرة (محيط قرص) قطرها $D = ${diam}$ سم بأخذ $pi approx 3.14$.`,
					answer: `1) $P = D times pi approx ${diam} times 3.14 = ${circLen}$ سم.`,
					mark: '1'
				},
				{
					type: 'columns',
					widths: ['1.5fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `2) يلاصق المستطيل $A B C D$ المقابل ($A B = ${L}$ سم و $B C = ${W}$ سم) مثلث قائم $B C E$ (قائم في $C$ حيث $C E = ${triLeg}$ سم). احسب المساحة الكلية للشكل بالتجزئة.`,
							answer: `2) مساحة المستطيل: $S_1 = ${L} times ${W} = ${rectS}$ سم².\n\nمساحة المثلث القائم: $S_2 = (${W} times ${triLeg}) div 2 = ${triS}$ سم².\n\nالمساحة الكلية: $S = ${rectS} + ${triS} = ${compS}$ سم².`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `المستطيل ABCD (${L} cm × ${W} cm)`
						}
					]
				},
				{
					type: 'text',
					content: `3) حوّل المساحة الزراعية $${haVal}$ هكتار (ha) إلى الآر (a) وإلى المتر المربع (m²).`,
					answer: `3) $${haVal}$ ha $= ${roundTo(haVal * 100, 0)}$ a $= ${haInM2}$ m².`,
					mark: '0.75'
				}
			];
			hints = [
				'ميّز جيداً بين القطر $D$ ونصف القطر $R$ ($D = 2 \\times R$).',
				'طول الدائرة بدلالة القطر يساوي $P = D \\times \\pi$.',
				`اضرب القطر $${diam}$ في $3.14$ مباشرة: $${diam} \\times 3.14 = ${circLen}\\text{ cm}$.`
			];
			solutionStepsAr = [
				`القانون المستعمل بدلالة القطر: $P = D \\times \\pi$.`,
				`نعوّض $D = ${diam}\\text{ cm}$ و $\\pi \\approx 3.14$: $P \\approx ${diam} \\times 3.14 = ${circLen}\\text{ cm}$.`
			];
			finalAnswer = `${circLen} cm`;
		}

		// Clean extra conversion answer in medium Sujet if needed: ensure exact calculation
		if (difficulty === 'medium') {
			const haM = rng.int(2, 6);
			sujetContent[2] = {
				type: 'text',
				content: `3) حوّل المساحات التالية: $${convM2}$ م² إلى dm²، و $${haM}$ هكتار (ha) إلى م².`,
				answer: `3) $${convM2}$ م² $= ${convDm2}$ dm²، و $${haM}$ ha $= ${haM * 10000}$ م².`,
				mark: '0.75'
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة القياس والمساحات والمحيطات التالية:',
				content: sujetContent
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Axial Symmetry & Perpendicular Bisector / Angle Bisector (svgGridPoints)
// ═══════════════════════════════════════════════════════════════════════════════
const t2AxialSymmetryPerpendicularBisector: ParameterizedTemplate = {
	id: '1am_t2_axial_symmetry_perpendicular_bisector',
	grade: '1am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'التناظر المحوري ومحور قطعة مستقيم ومنصف زاوية',
	curriculumLessonId: 'lesson_1am_t2_axial_symmetry_perpendicular_angle_bisector',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const cols = 8;
		const rows = 6;
		const isVerticalAxis = seed % 2 === 0;

		let pA: { col: number; row: number };
		let pTrue: { col: number; row: number };
		let pDiag: { col: number; row: number };
		let pShift: { col: number; row: number };
		let pWrongDist: { col: number; row: number };
		let axisPts: { col: number; row: number }[];
		let axisLabelPt: { col: number; row: number; label: string; color: string };
		let distSteps: number;

		if (isVerticalAxis) {
			distSteps = rng.int(1, 3);
			const rA = rng.pick([1, 2, 4, 5]);
			pA = { col: 4 - distSteps, row: rA };
			pTrue = { col: 4 + distSteps, row: rA };
			pDiag = { col: 4 + distSteps, row: 6 - rA };
			pShift = { col: 4 + distSteps, row: 3 };
			pWrongDist = { col: 4 + (distSteps === 3 ? 2 : distSteps + 1), row: rA };
			axisPts = [
				{ col: 4, row: 0 },
				{ col: 4, row: 6 }
			];
			axisLabelPt = { col: 4, row: 0, label: '(d)', color: '#1d4ed8' };
		} else {
			distSteps = rng.int(1, 2);
			const cA = rng.pick([1, 2, 3, 5, 6]);
			pA = { col: cA, row: 3 - distSteps };
			pTrue = { col: cA, row: 3 + distSteps };
			pDiag = { col: 8 - cA, row: 3 + distSteps };
			pShift = { col: 4, row: 3 + distSteps };
			pWrongDist = { col: cA, row: 3 + (distSteps === 1 ? 2 : 1) };
			axisPts = [
				{ col: 0, row: 3 },
				{ col: 8, row: 3 }
			];
			axisLabelPt = { col: 0, row: 3, label: '(d)', color: '#1d4ed8' };
		}

		const labels = rng.shuffle(['M', 'N', 'P', 'K']);
		const trueLbl = labels[0];
		const diagLbl = labels[1];
		const shiftLbl = labels[2];
		const distLbl = labels[3];

		// Perpendicular bisector & angle bisector parameters (strictly 1AM T2)
		const halfSeg = rng.int(3, 7);
		const segAB = halfSeg * 2;
		const sideMA = halfSeg + rng.int(2, 5); // guarantees sideMA * 2 > segAB (valid triangle MAB)
		const perimMAB = segAB + 2 * sideMA;
		const halfAng = rng.pick([26, 28, 32, 34, 36, 38, 42, 44]);
		const fullAng = halfAng * 2;

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let imageUrl: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const svg = svgGridPoints({
				cols,
				rows,
				polygon: axisPts,
				points: [
					axisLabelPt,
					{ col: pA.col, row: pA.row, label: 'A', color: '#2563eb' },
					{ col: pTrue.col, row: pTrue.row, label: trueLbl, color: '#0f172a' },
					{ col: pDiag.col, row: pDiag.row, label: diagLbl, color: '#0f172a' },
					{ col: pShift.col, row: pShift.row, label: shiftLbl, color: '#0f172a' },
					{ col: pWrongDist.col, row: pWrongDist.row, label: distLbl, color: '#0f172a' }
				]
			});
			imageUrl = saveSvgAsset(`1am_t2_sym_easy_${seed}`, svg);

			const mcq = buildUniqueMcqOptions(
				`النقطة $${trueLbl}$`,
				[
					{
						text: `النقطة $${diagLbl}$`,
						diagnosticFeedback: `النقطة $${diagLbl}$ ليست على المستقيم العمودي على $(d)$ المار من $A$؛ عند طيّ الورقة وفق $(d)$ لا تنطبق على $A$.`
					},
					{
						text: `النقطة $${shiftLbl}$`,
						diagnosticFeedback: `تحقق من التعامد: القطعة الواصلة بين $A$ ونظيرتها يجب أن تكون عمودية على المحور $(d)$.`
					},
					{
						text: `النقطة $${distLbl}$`,
						diagnosticFeedback: `خطأ في المسافة! تبعد $A$ عن المحور $(d)$ بـ $${distSteps}$ تدريجات، لذا يجب أن تبعد نظيرتها نفس المسافة تماماً.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: 'تأمّل المرصوفة المقابلة حيث المستقيم الأزرق $(d)$ هو محور التناظر. أيّ نقطة هي نظيرة النقطة $A$ بالتناظر المحوري بالنسبة إلى $(d)$؟',
				questionTextAr: 'أيّ نقطة هي نظيرة النقطة $A$ بالتناظر المحوري بالنسبة إلى المستقيم $(d)$؟',
				imageUrl,
				imageCaption: 'التناظر المحوري على ورق مرصوف',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لكي تكون النقطة نظيرة $A$ بالنسبة إلى $(d)$، يجب أن يكون $(d)$ محور القطعة الواصلة بينهما (عمودياً عليها في منتصفها). تبعد $A$ بـ $${distSteps}$ تدريجات عمودية عن $(d)$، وبنفس البعد في الجهة المقابلة نجد النقطة $${trueLbl}$.`
			};
			hints = [
				'في التناظر المحوري، عند طيّ الورقة وفق المستقيم $(d)$ تنطبق النقطة $A$ على نظيرتها.',
				`ارسم ذهنياً خطاً عمودياً على $(d)$ انطلاقاً من $A$ وعدّ عدد المربعات حتى $(d)$ ($${distSteps}$).`,
				`تابع في الجهة الأخرى من $(d)$ بنفس عدد المربعات ($${distSteps}$) على نفس الخط العمودي.`
			];
			solutionStepsAr = [
				`تبعد النقطة $A$ عن المستقيم $(d)$ بمسافة $${distSteps}$ مربعات عمودياً.`,
				`في الجهة المقابلة على نفس الخط العمودي وعلى بُعد $${distSteps}$ مربعات نجد النقطة $${trueLbl}$.`
			];
			finalAnswer = trueLbl;
		} else if (difficulty === 'medium') {
			const isTrue = seed % 2 === 0;
			const fakePt = rng.pick([pDiag, pShift, pWrongDist]);
			const pShown = isTrue ? pTrue : fakePt;

			const svg = svgGridPoints({
				cols,
				rows,
				polygon: axisPts,
				points: [
					axisLabelPt,
					{ col: pA.col, row: pA.row, label: 'A', color: '#2563eb' },
					{ col: pShown.col, row: pShown.row, label: 'M', color: '#16a34a' }
				]
			});
			imageUrl = saveSvgAsset(`1am_t2_sym_med_${seed}`, svg);

			quizQuestion = {
				type: 'true_false',
				questionText: 'تأمّل المرصوفة المقابلة ثم أجب بصحيح أو خطأ:\n\nالنقطة $M$ هي نظيرة النقطة $A$ بالتناظر المحوري بالنسبة إلى المستقيم $(d)$.',
				questionTextAr: 'النقطة $M$ هي نظيرة النقطة $A$ بالنسبة إلى المستقيم $(d)$.',
				imageUrl,
				imageCaption: 'التحقق من التناظر المحوري على مرصوفة',
				questionData: {
					correctAnswer: isTrue
				},
				explanation: isTrue
					? `صحيح: المستقيم $(d)$ عمودي على القطعة $[AM]$ ويمر بمنتصفها (تبعد كل من $A$ و $M$ بـ $${distSteps}$ تدريجات عن $(d)$).`
					: `خطأ: لكي تكون $M$ نظيرة $A$ بالنسبة إلى $(d)$، يجب أن يكون $(d)$ عمودياً على $[AM]$ وفي منتصفها على بُعد $${distSteps}$ تدريجات من الجهتين، وهذا غير محقق للنقطة $M$ المعروضة.`
			};
			hints = [
				'المستقيم $(d)$ هو محور التناظر، أي يجب أن يكون محور القطعة $[AM]$.',
				'تحقق من شرطين: هل $(AM) \\perp (d)$؟ وهل تبعد $M$ عن $(d)$ نفس بعد $A$ عن $(d)$؟',
				isTrue
					? 'الشرطان محققان على المربعات.'
					: 'أحد الشرطين (التعامد أو تساوي البعد عن المحور) غير محقق!'
			];
			solutionStepsAr = [
				`تبعد $A$ عن المحور $(d)$ عمودياً بـ $${distSteps}$ مربعات.`,
				isTrue
					? `النقطة $M$ تقع على نفس الخط العمودي وتبعد $${distSteps}$ مربعات في الجهة الأخرى، فالعبارة صحيحة.`
					: 'النقطة $M$ لا تحفظ التعامد أو البعد عن المستقيم $(d)$، فالعبارة خاطئة.'
			];
			finalAnswer = isTrue ? 'صحيح' : 'خطأ';
		} else {
			// hard: Grid SVG for Sujet Q1, plus calculated quizQuestion on perpendicular bisector OR angle bisector + axial symmetry
			const svg = svgGridPoints({
				cols,
				rows,
				polygon: axisPts,
				points: [
					axisLabelPt,
					{ col: pA.col, row: pA.row, label: 'A', color: '#2563eb' },
					{ col: pTrue.col, row: pTrue.row, label: trueLbl, color: '#0f172a' },
					{ col: pDiag.col, row: pDiag.row, label: diagLbl, color: '#0f172a' },
					{ col: pWrongDist.col, row: pWrongDist.row, label: distLbl, color: '#0f172a' }
				]
			});
			imageUrl = saveSvgAsset(`1am_t2_sym_hard_${seed}`, svg);

			const askPerim = seed % 2 === 0;
			if (askPerim) {
				quizQuestion = {
					type: 'calculated',
					questionText: `$[AB]$ قطعة مستقيم طولها $${segAB}\\text{ cm}$، والمستقيم $(\\Delta)$ هو محورها. إذا كانت $M$ نقطة تنتمي إلى $(\\Delta)$ بحيث $MA = ${sideMA}\\text{ cm}$، فما هو **محيط المثلث $MAB$** بـ $\\text{cm}$؟`,
					questionTextAr: `$[AB]$ طولها $${segAB}\\text{ cm}$ و $M$ تنتمي لمحورها بحيث $MA = ${sideMA}\\text{ cm}$. ما محيط المثلث $MAB$؟`,
					questionData: {
						answer: perimMAB,
						displayTemplate: `AB + MA + MB = ? cm`,
						variables: [],
						tolerance: 0
					},
					explanation: `كل نقطة من محور قطعة مستقيم متساوية البعد عن طرفيها؛ إذن $MB = MA = ${sideMA}\\text{ cm}$. ومنه محيط المثلث $MAB$ هو $AB + MA + MB = ${segAB} + ${sideMA} + ${sideMA} = ${perimMAB}\\text{ cm}$.`
				};
				hints = [
					'تذكّر خاصية محور قطعة مستقيم: كل نقطة تنتمي إليه متساوية البعد عن طرفي القطعة.',
					`بما أن $M \\in (\\Delta)$ محور $[AB]$، فإن $MB = MA = ${sideMA}\\text{ cm}$.`,
					`محيط المثلث $MAB$ يساوي مجموع أطوال أضلاعه: $AB + MA + MB$.`
				];
				solutionStepsAr = [
					`بما أن $M$ تنتمي إلى محور $[AB]$، فإن $MB = MA = ${sideMA}\\text{ cm}$.`,
					`محيط المثلث $MAB$: $P = ${segAB} + ${sideMA} + ${sideMA} = ${perimMAB}\\text{ cm}$.`
				];
				finalAnswer = `${perimMAB} cm`;
			} else {
				quizQuestion = {
					type: 'calculated',
					questionText: `زاوية $\\widehat{AOB}$ قيسها $${fullAng}^\\circ$، أنشأنا نظيرتها $\\widehat{A'O'B'}$ بالتناظر المحوري بالنسبة إلى المستقيم $(d)$، ثم رسمنا نصف المستقيم $[O'z')$ منصفاً للزاوية $\\widehat{A'O'B'}$. احسب قيس الزاوية $\\widehat{A'O'z'}$ بالدرجات.`,
					questionTextAr: `$\\widehat{A'O'B'}$ نظيرة $\\widehat{AOB} = ${fullAng}^\\circ$ بالتناظر المحوري، و $[O'z')$ منصفها. ما قيس $\\widehat{A'O'z'}$؟`,
					questionData: {
						answer: halfAng,
						displayTemplate: `(${fullAng}° ÷ 2) = ?°`,
						variables: [],
						tolerance: 0
					},
					explanation: `التناظر المحوري يحفظ أقياس الزوايا، إذن $\\widehat{A'O'B'} = \\widehat{AOB} = ${fullAng}^\\circ$. وبما أن $[O'z')$ منصف لها فإنه يقسمها إلى زاويتين متقايستين قيس كل منهما $${fullAng}^\\circ \\div 2 = ${halfAng}^\\circ$.`
				};
				hints = [
					'التناظر المحوري يحفظ أقياس الزوايا، فما قيس الزاوية النظيرة $\\widehat{A\'O\'B\'}$؟',
					'منصف الزاوية هو محور تناظرها ويقسمها إلى زاويتين متقايستين.',
					`اقسم قيس الزاوية النظيرة ($${fullAng}^\\circ$) على $2$.`
				];
				solutionStepsAr = [
					`بما أن التناظر المحوري يحفظ أقياس الزوايا، فإن $\\widehat{A'O'B'} = \\widehat{AOB} = ${fullAng}^\\circ$.`,
					`بما أن $[O'z')$ منصف للزاوية $\\widehat{A'O'B'}$، فإن $\\widehat{A'O'z'} = ${fullAng}^\\circ \\div 2 = ${halfAng}^\\circ$.`
				];
				finalAnswer = `${halfAng}°`;
			}
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اعتماداً على المرصوفة المقابلة وخواص التناظر المحوري، أجب عما يلي:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content:
									difficulty === 'medium'
										? `1) تأمّل المرصوفة المقابلة: هل النقطة $M$ هي نظيرة النقطة $A$ بالنسبة إلى المستقيم $(d)$؟ برّر جوابك باستعمال التعامد والمسافة على المربعات.\n\n2) $[A B]$ قطعة مستقيم طولها $${segAB}$ سم، ومحورها $(Delta)$ يقطعها في $I$. تنتمي النقطة $P$ إلى $(Delta)$ بحيث $P A = ${sideMA}$ سم. احسب الطولين $A I$ و $P B$ ثم استنتج محيط المثلث $P A B$.`
										: `1) حدّد من بين النقط المعروضة على المرصوفة نظيرة النقطة $A$ بالنسبة إلى المستقيم $(d)$ مع التبرير.\n\n2) $[A B]$ قطعة مستقيم طولها $${segAB}$ سم، ومحورها $(Delta)$ يقطعها في $I$. تنتمي النقطة $M$ إلى $(Delta)$ بحيث $M A = ${sideMA}$ سم. احسب الطول $A I$ ثم استنتج محيط المثلث $M A B$.`,
								answer:
									difficulty === 'medium'
										? `1) ${finalAnswer === 'صحيح' ? `نعم، $M$ نظيرة $A$ لأن $(d)$ عمودي على $[A M]$ في منتصفها (بعد $${distSteps}$ تدريجات).` : 'لا، $M$ ليست نظيرة $A$ لأن $(d)$ ليس محوراً للقطعة $[A M]$.'}\n\n2) $I$ منتصف $[A B]$ إذن $A I = ${segAB} div 2 = ${halfSeg}$ سم. و $P$ تنتمي لمحور $[A B]$ إذن $P B = P A = ${sideMA}$ سم، ومحيط المثلث $P A B$ هو $${segAB} + ${sideMA} + ${sideMA} = ${perimMAB}$ سم.`
										: `1) نظيرة $A$ بالنسبة إلى $(d)$ هي النقطة $${trueLbl}$ لأن $(d)$ محور القطعة $[A ${trueLbl}]$ (عمودي عليها ويمر بمنتصفها، ببعد $${distSteps}$ تدريجات من كل جهة).\n\n2) $A I = ${segAB} div 2 = ${halfSeg}$ سم، و $M B = M A = ${sideMA}$ سم لأن $M$ من محور $[A B]$، إذن محيط المثلث $M A B$ هو $${segAB} + ${sideMA} + ${sideMA} = ${perimMAB}$ سم.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مرصوفة التناظر المحوري'
							}
						]
					},
					{
						type: 'text',
						content: `3) أنشأنا الزاوية $hat(A' O' B')$ نظيرة الزاوية $hat(A O B) = ${fullAng}°$ بالتناظر المحوري بالنسبة إلى $(d)$، ثم رسمنا نصف المستقيم $[O' z')$ منصفاً للزاوية $hat(A' O' B')$. احسب قيس كل من $hat(A' O' B')$ و $hat(A' O' z')$ مع التعليل.`,
						answer: `3) بما أن التناظر المحوري يحفظ أقياس الزوايا، فإن $hat(A' O' B') = hat(A O B) = ${fullAng}°$. وبما أن $[O' z')$ منصف للزاوية $hat(A' O' B')$، فإن $hat(A' O' z') = ${fullAng}° div 2 = ${halfAng}°$.`,
						mark: '1'
					}
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration Situation (الوضعية الإدماجية) — Composite Field + Fractional Share
// ═══════════════════════════════════════════════════════════════════════════════
interface FieldScenario {
	L: number;
	W: number;
	b: number;
	c: number;
	p: number;
	q: number;
}

const FIELD_SCENARIOS: FieldScenario[] = [
	{ L: 24, W: 12, b: 16, c: 20, p: 1, q: 3 },
	{ L: 30, W: 12, b: 16, c: 20, p: 3, q: 4 },
	{ L: 36, W: 12, b: 16, c: 20, p: 5, q: 8 },
	{ L: 42, W: 12, b: 16, c: 20, p: 2, q: 5 },
	{ L: 30, W: 15, b: 20, c: 25, p: 2, q: 5 },
	{ L: 40, W: 15, b: 20, c: 25, p: 3, q: 5 },
	{ L: 50, W: 15, b: 20, c: 25, p: 4, q: 9 },
	{ L: 27, W: 24, b: 18, c: 30, p: 3, q: 8 },
	{ L: 36, W: 24, b: 18, c: 30, p: 4, q: 9 },
	{ L: 45, W: 24, b: 18, c: 30, p: 5, q: 6 },
	{ L: 30, W: 20, b: 15, c: 25, p: 3, q: 10 },
	{ L: 45, W: 20, b: 15, c: 25, p: 2, q: 7 }
];

const t2IntegrationField: ParameterizedTemplate = {
	id: '1am_t2_integration',
	grade: '1am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'إدماج الفصل الثاني: المساحات والمحيطات والكسور والقسمة',
	curriculumLessonId: 'lesson_1am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sc = rng.pick(FIELD_SCENARIOS);
		const { L, W, b, c, p, q } = sc;

		const rectArea = L * W;
		const triArea = (W * b) / 2;
		const totalArea = rectArea + triArea;

		// Outer perimeter (BC = W is interior shared edge!)
		const outerPerim = 2 * L + W + b + c;
		const gate = rng.pick([2, 3, 4]);
		const fenceLen = outerPerim - gate;

		// Fractional share (a/b * k)
		const unsimFactor = difficulty === 'hard' ? rng.pick([2, 3]) : 1;
		const fracNumShow = p * unsimFactor;
		const fracDenShow = q * unsimFactor;
		const plantedArea = (totalArea / q) * p;
		const remArea = totalArea - plantedArea;

		// Part 3: Harvest packing (Euclidean division) + circular basin perimeter (2*pi*R)
		const crateCap = rng.int(12, 18);
		const harvestCrates = rng.int(16, 32);
		const harvestRem = rng.int(1, crateCap - 1);
		const harvestKg = crateCap * harvestCrates + harvestRem;
		const minCrates = harvestCrates + 1;

		const basinRadius = rng.int(2, 5);
		const basinPerim = roundTo(2 * 3.14 * basinRadius, 2);
		const basinTenths = Math.floor((Math.round(basinPerim * 100) % 100) / 10);
		const basinRounded = basinTenths >= 5 ? Math.floor(basinPerim) + 1 : Math.floor(basinPerim);

		const svg = svgCompositeRectRightTriangle({
			lengthL: L,
			widthW: W,
			baseB: b,
			hypotenuseC: c
		});
		const imageUrl = saveSvgAsset(`1am_t2_integration_${difficulty}_${seed}`, svg);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			quizQuestion = {
				type: 'calculated',
				questionText: `يملك فلاح قطعة أرض مبيّنة في الشكل المقابل تتكوّن من مستطيل $ABCD$ (طوله $${L}\\text{ m}$ وعرضه $${W}\\text{ m}$) ومثلث قائم $BCE$ (قائم في $C$ حيث $BC = ${W}\\text{ m}$ و $CE = ${b}\\text{ m}$). احسب **المساحة الكلية** للأرض بـ $\\text{m}^2$.`,
				questionTextAr: `قطعة أرض مركبة من مستطيل ($${L}\\text{ m} \\times ${W}\\text{ m}$) ومثلث قائم ($${W}\\text{ m}$ و $${b}\\text{ m}$). احسب المساحة الكلية بـ $\\text{m}^2$.`,
				imageUrl,
				imageCaption: `مخطط قطعة الأرض المركبة ABED`,
				questionData: {
					answer: totalArea,
					displayTemplate: `S = (${L} × ${W}) + (${W} × ${b}) ÷ 2 = ? m²`,
					variables: [],
					tolerance: 0
				},
				explanation: `نحسب بالتجزئة: مساحة المستطيل $S_1 = ${L} \\times ${W} = ${rectArea}\\text{ m}^2$، ومساحة المثلث القائم $S_2 = (${W} \\times ${b}) \\div 2 = ${triArea}\\text{ m}^2$. إذن المساحة الكلية هي $S = ${rectArea} + ${triArea} = ${totalArea}\\text{ m}^2$.`
			};
			finalAnswer = `${totalArea} m²`;
		} else if (difficulty === 'medium') {
			const wrongForgotDiv2Total = rectArea + W * b;
			const wrongForgotDiv2Share =
				wrongForgotDiv2Total % q === 0
					? (wrongForgotDiv2Total / q) * p
					: Math.round((wrongForgotDiv2Total * p) / q);
			const wrongRectOnlyShare = Math.max(1, Math.round((rectArea * p) / q));

			const mcq = buildUniqueMcqOptions(
				`$${plantedArea}\\text{ m}^2$`,
				[
					{
						text: `$${remArea}\\text{ m}^2$`,
						diagnosticFeedback: `هذه مساحة الجزء **المتبقي**، بينما السؤال يطلب مساحة الجزء **المغروس** بأشجار الزيتون ($${totalArea} \\times \\frac{${p}}{${q}}$).`
					},
					{
						text: `$${wrongForgotDiv2Share === plantedArea ? plantedArea + q : wrongForgotDiv2Share}\\text{ m}^2$`,
						diagnosticFeedback: 'تحقق من مساحة المثلث القائم $BCE$: يجب القسمة على $2$ في قانون مساحة المثلث القائم!'
					},
					{
						text: `$${wrongRectOnlyShare === plantedArea ? plantedArea + p : wrongRectOnlyShare}\\text{ m}^2$`,
						diagnosticFeedback: 'احسب المساحة الكلية للأرض (المستطيل مع المثلث القائم معاً) قبل أخذ الكسر!'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `قطعة الأرض المقابلة مساحتها الكلية $S = ${totalArea}\\text{ m}^2$ (مستطيل $ABCD$ طوله $${L}\\text{ m}$ وعرضه $${W}\\text{ m}$ ومثلث قائم $BCE$ حيث $CE = ${b}\\text{ m}$). غرس الفلاح $\\frac{${p}}{${q}}$ من المساحة الكلية أشجار زيتون. ما هي مساحة الجزء المغروس بالزيتون؟`,
				questionTextAr: `أرض مساحتها الكلية $${totalArea}\\text{ m}^2$، غُرِس $\\frac{${p}}{${q}}$ منها زيتوناً. ما مساحة الجزء المغروس؟`,
				imageUrl,
				imageCaption: `مخطط قطعة الأرض المركبة ABED`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحسب $${totalArea} \\times \\frac{${p}}{${q}} = (${totalArea} \\div ${q}) \\times ${p} = ${totalArea / q} \\times ${p} = ${plantedArea}\\text{ m}^2$.`
			};
			finalAnswer = `${plantedArea} m²`;
		} else {
			// hard: outer perimeter minus gate (avoiding shared interior edge BC = W!)
			const wrongCountSharedSide = fenceLen + W;
			const wrongForgotGate = outerPerim;
			const wrongRectOnly = 2 * (L + W) - gate;

			const mcq = buildUniqueMcqOptions(
				`$${fenceLen}\\text{ m}$`,
				[
					{
						text: `$${wrongCountSharedSide}\\text{ m}$`,
						diagnosticFeedback: `انتبه! الضلع $[BC]$ ($${W}\\text{ m}$) يقع **داخل** القطعة ويفصل المستطيل عن المثلث، فلا نضع عليه سياجاً!`
					},
					{
						text: `$${wrongForgotGate}\\text{ m}$`,
						diagnosticFeedback: `نسيت طرح عرض المدخل ($${gate}\\text{ m}$) من المحيط الخارجي للقطعة!`
					},
					{
						text: `$${wrongRectOnly}\\text{ m}$`,
						diagnosticFeedback: 'حسبتَ سياج المستطيل فقط دون إدراج الضلعين الخارجيين للمثلث القائم ($CE$ و $BE$).'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `يريد الفلاح إحاطة قطعة الأرض المبيّنة في الشكل المقابل (المضلع $ABECD$) بسياج خارجي مع ترك مدخل عرضه $${gate}\\text{ m}$، علماً أن $AB = CD = ${L}\\text{ m}$، $DA = ${W}\\text{ m}$، $CE = ${b}\\text{ m}$ و $BE = ${c}\\text{ m}$. ما طول السياج اللازم؟`,
				questionTextAr: `ما طول السياج اللازم لإحاطة حدود المضلع الخارجي $ABECD$ مع ترك مدخل عرضه $${gate}\\text{ m}$؟`,
				imageUrl,
				imageCaption: `مخطط قطعة الأرض المركبة ABED`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المحيط الخارجي هو مجموع الأضلاع الخارجية فقط (دون الضلع الداخلي $[BC]$): $P = AB + BE + EC + CD + DA = ${L} + ${c} + ${b} + ${L} + ${W} = ${outerPerim}\\text{ m}$. نطرح عرض المدخل: $${outerPerim} - ${gate} = ${fenceLen}\\text{ m}$.`
			};
			finalAnswer = `${fenceLen} m`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					`يملك فلاح قطعة أرض مركبة الشكل (انظر المخطط المقابل) تتألف من مستطيل $A B C D$ طوله $A B = ${L}$ م وعرضه $D A = ${W}$ م، يلاصقه مثلث قائم $B C E$ (قائم في $C$) حيث $C E = ${b}$ م و $B E = ${c}$ م.`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (المساحة والمحيط الخارجي):\n\n1) احسب مساحة المستطيل $A B C D$ ومساحة المثلث القائم $B C E$، ثم استنتج المساحة الكلية $S$ لقطعة الأرض بالمتر المربع.\n\n2) يريد الفلاح إحاطة القطعة بسياج خارجي مع ترك مدخل عرضه $${gate}$ م. احسب المحيط الخارجي $P$ للقطعة ثم استنتج طول السياج اللازم.`,
								answer: `الجزء الأول:\n\n1) مساحة المستطيل: $S_1 = ${L} times ${W} = ${rectArea}$ م². مساحة المثلث القائم: $S_2 = (${W} times ${b}) div 2 = ${triArea}$ م². المساحة الكلية: $S = ${rectArea} + ${triArea} = ${totalArea}$ م².\n\n2) المحيط الخارجي (دون الضلع الداخلي $[B C]$): $P = ${L} + ${c} + ${b} + ${L} + ${W} = ${outerPerim}$ م. طول السياج: $${outerPerim} - ${gate} = ${fenceLen}$ م.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مخطط قطعة الأرض المركبة'
							}
						]
					},
					{
						type: 'text',
						content:
							difficulty === 'hard'
								? `الجزء الثاني (الاختزال وضرب عدد في كسر):\n\nغرس الفلاح $frac(${fracNumShow}, ${fracDenShow})$ من المساحة الكلية $S$ أشجار زيتون، وترك الباقي لزراعة الخضر.\n\n1) اختزل الكسر $frac(${fracNumShow}, ${fracDenShow})$ إلى أبسط شكل ممكن.\n\n2) احسب مساحة الجزء المغروس بأشجار الزيتون ثم استنتج المساحة المخصصة للخضر.`
								: `الجزء الثاني (ضرب عدد في كسر):\n\nغرس الفلاح $frac(${p}, ${q})$ من المساحة الكلية $S$ أشجار زيتون، وترك الباقي لزراعة الخضر.\n\n1) احسب مساحة الجزء المغروس بأشجار الزيتون بأبسط طريقة ($S times frac(${p}, ${q})$).\n\n2) استنتج المساحة المتبقية المخصصة للخضر.`,
						answer:
							difficulty === 'hard'
								? `الجزء الثاني:\n\n1) باختزال $frac(${fracNumShow}, ${fracDenShow})$ على $${unsimFactor}$ نجد $frac(${p}, ${q})$.\n\n2) مساحة الزيتون: $${totalArea} times frac(${p}, ${q}) = (${totalArea} div ${q}) times ${p} = ${totalArea / q} times ${p} = ${plantedArea}$ م². مساحة الخضر: $${totalArea} - ${plantedArea} = ${remArea}$ م².`
								: `الجزء الثاني:\n\n1) مساحة الزيتون: $${totalArea} times frac(${p}, ${q}) = (${totalArea} div ${q}) times ${p} = ${totalArea / q} times ${p} = ${plantedArea}$ م².\n\n2) مساحة الخضر: $${totalArea} - ${plantedArea} = ${remArea}$ م².`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `الجزء الثالث (طول الدائرة والمدور والقسمة الإقليدية):\n\n1) أنشأ الفلاح حوض سقي دائري الشكل نصف قطره $R = ${basinRadius}$ م. احسب طول محيط هذا الحوض (بأخذ $pi approx 3.14$) ثم أعطِ المدور إلى الوحدة لهذا الطول.\n\n2) بعد الجني، جمع الفلاح $${harvestKg}$ كغ من الزيتون ووضعها في صناديق يسع كل صندوق $${crateCap}$ كغ. كم صندوقاً يملأ تماماً؟ وما أقل عدد من الصناديق اللازمة لنقل كل المحصول؟`,
						answer: `الجزء الثالث:\n\n1) طول الحوض الدائري: $P_c = 2 times 3.14 times ${basinRadius} = ${basinPerim}$ م. رقم الأعشار هو $${basinTenths}$، إذن المدور إلى الوحدة هو $${basinRounded}$ م.\n\n2) بالقسمة الإقليدية: $${harvestKg} = ${crateCap} times ${harvestCrates} + ${harvestRem}$ (مع $${harvestRem} < ${crateCap}$). يملأ $${harvestCrates}$ صندوقاً تماماً، ويلزم لنقل كل المحصول $${harvestCrates} + 1 = ${minCrates}$ صندوقاً.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				`مساحة قطعة الأرض بالتجزئة تساوي مساحة المستطيل ($${L} \\times ${W}$) مضافاً إليها مساحة المثلث القائم ($(${W} \\times ${b}) \\div 2$).`,
				`لحساب السياج، نجمع الأضلاع الخارجية الخمسة للمضلع $ABECD$ فقط (دون الضلع الداخلي $[BC]$) ثم نطرح عرض المدخل ($${gate}\\text{ m}$).`,
				`لحساب الحصة الكسرية $${totalArea} \\times \\frac{${p}}{${q}}$، اقسم المساحة الكلية على $${q}$ أولاً ثم اضرب الناتج في $${p}$.`
			],
			solutionStepsAr: [
				`حساب المساحة الكلية بالتجزئة: $S = ${L} \\times ${W} + (${W} \\times ${b}) \\div 2 = ${rectArea} + ${triArea} = ${totalArea}\\text{ m}^2$.`,
				`حساب طول السياج الخارجي: $P - ${gate} = (${L} + ${c} + ${b} + ${L} + ${W}) - ${gate} = ${outerPerim} - ${gate} = ${fenceLen}\\text{ m}$.`,
				`المساحة المغروسة بالزيتون: $${totalArea} \\times \\frac{${p}}{${q}} = (${totalArea} \\div ${q}) \\times ${p} = ${plantedArea}\\text{ m}^2$، والمتبقي للخضر: $${remArea}\\text{ m}^2$.`,
				`طول الحوض الدائري: $2 \\times 3.14 \\times ${basinRadius} = ${basinPerim}\\text{ m}$ (المدور إلى الوحدة: $${basinRounded}\\text{ m}$)، والقسمة الإقليدية للمحصول: $${harvestKg} = ${crateCap} \\times ${harvestCrates} + ${harvestRem}$ (يلزم $${minCrates}$ صندوقاً).`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_1AM_T2: ParameterizedTemplate[] = [
	t2EuclideanDivisionDivisibility,
	t2DecimalDivisionApproximations,
	t2FractionsQuotientSimplifyProduct,
	t2PlaneSurfacesPerimeterAreaCircle,
	t2AxialSymmetryPerpendicularBisector,
	t2IntegrationField
].map(withSafeKatex);
