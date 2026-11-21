import type { ContentBlock, ExerciseBlock, TableCell } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { saveSvgAsset, svgAnalogClock, svgGridPoints, svgRectangle } from '../../svg-helpers';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';

interface PersonMeta {
	name: string;
	isFemale: boolean;
}

const STUDENTS: readonly PersonMeta[] = [
	{ name: 'أمين', isFemale: false },
	{ name: 'ليلى', isFemale: true },
	{ name: 'ياسين', isFemale: false },
	{ name: 'سارة', isFemale: true },
	{ name: 'آدم', isFemale: false },
	{ name: 'مريم', isFemale: true },
	{ name: 'ريان', isFemale: false },
	{ name: 'نور', isFemale: true }
];

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

function pad2(n: number): string {
	return String(Math.trunc(n)).padStart(2, '0');
}

function ltr(text: string): string {
	return `#text(dir: ltr)[${text}]`;
}

function fmtClock(h: number, m: number): string {
	return `${pad2(h)}:${pad2(m)}`;
}

function fmtDuration(h: number, m: number): string {
	if (h === 0) return `${m} min`;
	if (m === 0) return `${h} h`;
	return `${h} h ${pad2(m)} min`;
}

function pickDistinctNumbers(
	correct: number,
	candidates: { val: number; feedback: string }[],
	minVal: number,
	maxVal: number,
	step = 1
): { val: number; feedback: string }[] {
	const seen = new Set<number>([correct]);
	const out: { val: number; feedback: string }[] = [];
	for (const c of candidates) {
		const v = Math.trunc(c.val);
		if (v >= minVal && v <= maxVal && !seen.has(v)) {
			seen.add(v);
			out.push({ val: v, feedback: c.feedback });
		}
		if (out.length === 3) break;
	}
	let k = 1;
	while (out.length < 3) {
		const delta = k * step;
		for (const cand of [correct + delta, correct - delta]) {
			if (cand >= minVal && cand <= maxVal && !seen.has(cand)) {
				seen.add(cand);
				out.push({ val: cand, feedback: 'راجع خطوات الحساب وتحقق من النتيجة.' });
				if (out.length === 3) break;
			}
		}
		k++;
	}
	return out;
}

// ============================================================================
// 1. Equal Sharing & Exact Division Tables Inverse (quotients <= 10)
// ============================================================================

const tplDivisionEqualSharing: ParameterizedTemplate = {
	id: '3ap_t3_division_equal_sharing',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المدخل إلى القسمة: التوزيع المتساوي والتجميع ومعكوس جداول الضرب',
	curriculumLessonId: 'lesson_3ap_t3_division_equal_sharing',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 101);
		const person = rng.pick(STUDENTS);
		const verbHave = person.isFemale ? 'تملك' : 'يملك';
		const verbWant = person.isFemale ? 'أرادت' : 'أراد';

		let d = 4;
		let q = 6;
		if (difficulty === 'easy') {
			d = rng.pick([2, 3, 4, 5] as const);
			q = rng.int(2, 6);
		} else if (difficulty === 'medium') {
			d = rng.pick([3, 4, 5, 6, 7, 8] as const);
			q = rng.int(4, 9);
		} else {
			d = rng.pick([6, 7, 8, 9] as const);
			q = rng.int(5, 10);
		}
		const n = d * q;

		// Secondary pairs for the SujetBuilder table (ensure d2 !== q2 so two divisions differ)
		const otherDivisors = ([2, 3, 4, 5, 6, 7, 8, 9] as const).filter((x) => x !== d);
		const d2 = rng.pick(otherDivisors);
		const q2Candidates = [3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x !== d2);
		const q2 = rng.pick(q2Candidates);
		const n2 = d2 * q2;

		const sharingContexts = [
			{ unit: 'قصة', plural: 'قصص', container: 'طاولات', singleCont: 'طاولة', verb: 'توزيعها بالتساوي على' },
			{ unit: 'كرة', plural: 'كرات', container: 'سلات', singleCont: 'سلة', verb: 'توزيعها بالتساوي على' },
			{ unit: 'حلوى', plural: 'قطع حلوى', container: 'أطباق', singleCont: 'طبق', verb: 'توزيعها بالتساوي على' },
			{ unit: 'زهرة', plural: 'زهرات', container: 'مزهريات', singleCont: 'مزهرية', verb: 'توزيعها بالتساوي في' }
		] as const;
		const groupingContexts = [
			{ unit: 'قلماً', container: 'علبة', containerPlural: 'علب', perWord: 'أقلام' },
			{ unit: 'دفتر', container: 'رزمة', containerPlural: 'رزم', perWord: 'دفاتر' },
			{ unit: 'كتاباً', container: 'رف', containerPlural: 'رفوف', perWord: 'كتب' }
		] as const;

		const scShare = rng.pick(sharingContexts);
		const scGroup = rng.pick(groupingContexts);
		const mode = seed % 3; // 0: equal sharing MCQ, 1: grouping MCQ, 2: inverse mult calculated

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let sujetWordText = '';
		let sujetWordAnswer = '';

		if (mode === 0) {
			const questionText = `${verbHave} ${person.name} $${n}$ من الـ${scShare.plural}، و${verbWant} ${scShare.verb} $${d}$ ${scShare.container}. كم نصيب كل ${scShare.singleCont}؟`;
			const dVals = pickDistinctNumbers(
				q,
				[
					{ val: q + 1, feedback: `تحقق بجدول الضرب: $${d} \\times ${q + 1} = ${d * (q + 1)}$ وليس $${n}$!` },
					{ val: Math.max(1, q - 1), feedback: `تحقق بجدول الضرب: $${d} \\times ${Math.max(1, q - 1)} = ${d * Math.max(1, q - 1)}$ وليس $${n}$!` },
					{ val: n - d, feedback: `لقد طرحت $${d}$ من $${n}$ فقط؛ التوزيع بالتساوي يتطلب القسمة ($${n} \\div ${d}$).` },
					{ val: d, feedback: `$${d}$ هو عدد الـ${scShare.container} (القاسم) وليس نصيب الواحدة!` }
				],
				1,
				99
			);
			const mcq = buildUniqueMcqOptions(
				`$${q}$`,
				dVals.map((item) => ({ text: `$${item.val}$`, diagnosticFeedback: item.feedback })),
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نوزّع $${n}$ بالتساوي على $${d}$: نبحث عن $${d} \\times ? = ${n}$. من جدول ضرب $${d}$ نجد $${d} \\times ${q} = ${n}$، إذن $${n} \\div ${d} = ${q}$.`
			};
			sujetWordText = `2) ${verbHave} ${person.name} $${n}$ من الـ${scShare.plural}، ${verbWant} ${scShare.verb} $${d}$ ${scShare.container}. اكتب عملية القسمة التامة وأوجد نصيب كل ${scShare.singleCont}.`;
			sujetWordAnswer = `عملية القسمة: $${n} div ${d} = ${q}$ (لأن $${d} times ${q} = ${n}$). نصيب كل ${scShare.singleCont}: $${q}$.`;
		} else if (mode === 1) {
			const questionText = `أرادت المعلمة وضع $${n}$ ${scGroup.unit} في ${scGroup.containerPlural} تتسع كل ${scGroup.container} لـ $${d}$ ${scGroup.perWord}. ما هو عدد الـ${scGroup.containerPlural} اللازمة؟`;
			const dVals = pickDistinctNumbers(
				q,
				[
					{ val: q + 1, feedback: `راجع جدول ضرب $${d}$: $${d} \\times ${q + 1} = ${d * (q + 1)}$ وليس $${n}$!` },
					{ val: Math.max(1, q - 1), feedback: `راجع جدول ضرب $${d}$: $${d} \\times ${Math.max(1, q - 1)} = ${d * Math.max(1, q - 1)}$ وليس $${n}$!` },
					{ val: n - d, feedback: `طرحت $${d}$ مرة واحدة فقط! التجميع في حصص متساوية يعني القسمة: $${n} \\div ${d}$.` },
					{ val: d, feedback: `$${d}$ هو عدد القطع في كل ${scGroup.container} وليس عدد الـ${scGroup.containerPlural}!` }
				],
				1,
				99
			);
			const mcq = buildUniqueMcqOptions(
				`$${q}$`,
				dVals.map((item) => ({ text: `$${item.val}$`, diagnosticFeedback: item.feedback })),
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `هذه وضعية تجميع في حصص متساوية: نحسب $${n} \\div ${d}$. بما أن $${d} \\times ${q} = ${n}$، فإن عدد الـ${scGroup.containerPlural} هو $${q}$.`
			};
			sujetWordText = `2) لجمع $${n}$ ${scGroup.unit} في ${scGroup.containerPlural} تتسع كل ${scGroup.container} لـ $${d}$ ${scGroup.perWord}، اكتب عملية القسمة التامة وأوجد عدد الـ${scGroup.containerPlural} اللازمة.`;
			sujetWordAnswer = `عملية القسمة: $${n} div ${d} = ${q}$ (لأن $${d} times ${q} = ${n}$). عدد الـ${scGroup.containerPlural}: $${q}$.`;
		} else {
			const questionText = `أكمل المساواة باستعمال معكوس جدول الضرب: $${n} \\div ${d} = \\square$ (أي $${d} \\times \\square = ${n}$)؟`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					answer: q,
					displayTemplate: `${n} ÷ ${d} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نبحث عن العدد الذي نضربه في $${d}$ لنحصل على $${n}$: بما أن $${d} \\times ${q} = ${n}$، فإن $${n} \\div ${d} = ${q}$.`
			};
			sujetWordText = `2) ${verbHave} ${person.name} $${n}$ من الـ${scShare.plural}، ${verbWant} ${scShare.verb} $${d}$ ${scShare.container}. اكتب عملية القسمة التامة وأوجد نصيب كل ${scShare.singleCont}.`;
			sujetWordAnswer = `عملية القسمة: $${n} div ${d} = ${q}$ (لأن $${d} times ${q} = ${n}$). نصيب كل ${scShare.singleCont}: $${q}$.`;
		}

		const rows: (string | TableCell)[][] = [
			[
				{ content: `$${d} times "....." = ${n}$`, answer: `$${d} times ${q} = ${n}$`, mark: '0.25' },
				{ content: `$${n} div ${d} = "....."$`, answer: `$${n} div ${d} = ${q}$`, mark: '0.25' },
				`$${n}$`
			],
			[
				`$${d2} times ${q2} = ${n2}$`,
				{ content: `$${n2} div ${d2} = "....."$`, answer: `$${n2} div ${d2} = ${q2}$`, mark: '0.25' },
				{ content: `$${n2} div ${q2} = "....."$`, answer: `$${n2} div ${q2} = ${d2}$`, mark: '0.25' }
			]
		];

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'وظّف معكوس جداول الضرب لإتمام الجدول وحل مسألة التوزيع المتساوي:',
				content: [
					{
						type: 'table',
						headers: ['المساواة الضربية', 'القسمة التامة الأولى', 'المقسوم / القسمة الثانية'],
						cells: [],
						rows,
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: sujetWordText,
						answer: sujetWordAnswer,
						mark: '0.5'
					}
				]
			},
			hints: [
				`العدد $${n}$ هو المقسوم، والعدد $${d}$ هو القاسم.`,
				`فكّر في جدول ضرب $${d}$: ما العدد الذي يحقق $${d} \\times ? = ${n}$؟`,
				`تحقق من إجابتك بالضرب: إذا ضربت الحاصل في $${d}$ يجب أن تجد $${n}$.`
			],
			solutionStepsAr: [
				`نربط القسمة التامة بمعكوس جدول ضرب $${d}$: نبحث عن $${d} \\times ? = ${n}$.`,
				`من جدول الضرب نجد أن $${d} \\times ${q} = ${n}$.`,
				`إذن حاصل القسمة التامة هو: $${n} \\div ${d} = ${q}$.`
			],
			finalAnswer: String(q)
		};
	}
};

// ============================================================================
// 2. Complement / Arithmetic Relations & Doubles / Halves (< 10000)
// ============================================================================

const tplArithmeticRelationsDoubles: ParameterizedTemplate = {
	id: '3ap_t3_arithmetic_relations_doubles',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'العلاقات الحسابية: الضعف والنصف والمتمم والحساب السريع',
	curriculumLessonId: 'lesson_3ap_t3_arithmetic_relations_calculator',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 202);
		const mode = seed % 4; // 0: double, 1: half, 2: complement (calculated), 3: fast mental / mult 10/100

		let questionText = '';
		let explanation = '';
		let finalAnswerNum = 0;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (mode === 0) {
			// Double of n with 2*n < 10000
			let n = 240;
			if (difficulty === 'easy') {
				const h = rng.int(1, 4);
				const t = rng.int(1, 4);
				n = h * 100 + t * 10; // no carry, <= 440, double <= 880
			} else if (difficulty === 'medium') {
				const th = rng.int(1, 3);
				const h = rng.int(2, 8);
				const t = rng.int(1, 9);
				n = th * 1000 + h * 100 + t * 10; // double < 8000
			} else {
				const th = rng.int(1, 4);
				const h = rng.int(3, 8);
				const t = rng.int(4, 9);
				const u = rng.pick([2, 4, 5, 6, 8] as const);
				n = th * 1000 + h * 100 + t * 10 + u; // max 4898 -> double 9796 < 10000
			}
			const dbl = 2 * n;
			finalAnswerNum = dbl;
			questionText = `ما هو **ضعف** العدد $${n}$؟`;
			const halfCandidate = n % 2 === 0 ? n / 2 : n + 100;
			const dVals = pickDistinctNumbers(
				dbl,
				[
					{ val: halfCandidate, feedback: 'لقد حسبت نصف العدد أو قيمة قريبة منه؛ المطلوب هو **الضعف** (الضرب في $2$ أو الجمع إلى نفسه)!' },
					{ val: dbl - 100, feedback: 'نسيت الاحتفاظ عند مضاعفة مرتبة العشرات أو المئات!' },
					{ val: dbl + 100, feedback: 'تأكد من الجمع عند حساب الضعف بتفكيك المراتب.' },
					{ val: Math.min(9999, n + 200), feedback: 'الضعف يعني ضرب العدد كاملاً في $2$ وليس زيادة رقم واحد فقط.' }
				],
				2,
				9999
			);
			const mcq = buildUniqueMcqOptions(
				`$${dbl}$`,
				dVals.map((d) => ({ text: `$${d.val}$`, diagnosticFeedback: d.feedback })),
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `ضعف العدد $${n}$ هو $${n} + ${n} = ${n} \\times 2 = ${dbl}$.`
			};
			hints = [
				`لإيجاد ضعف عدد، نضربه في $2$ (أو نجمعه إلى نفسه: $${n} + ${n}$).`,
				'فكّك العدد إلى آلاف ومئات وعشرات ووحدات واحسب ضعف كل مرتبة.',
				'اجمع أضعاف كل مرتبة مع الانتباه للاحتفاظ لتحصل على النتيجة النهائية.'
			];
			solutionStepsAr = [
				`لحساب ضعف $${n}$، نحسب $${n} \\times 2$ (أو $${n} + ${n}$).`,
				`بتفكيك المراتب ومضاعفة كل مرتبة نجد الناتج: $${dbl}$.`
			];
		} else if (mode === 1) {
			// Half of an even number n < 10000
			let half = 1230;
			if (difficulty === 'easy') {
				const h = rng.int(1, 4);
				const t = rng.int(1, 4);
				half = h * 100 + t * 10; // n <= 880, all even digits
			} else if (difficulty === 'medium') {
				const th = rng.int(1, 4);
				const h = rng.pick([1, 3, 5, 7, 9] as const);
				const t = rng.int(1, 9);
				half = th * 1000 + h * 100 + t * 10; // n <= 9980
				if (half >= 5000) half -= 1000;
			} else {
				const th = rng.int(1, 4);
				const h = rng.int(2, 9);
				const t = rng.pick([1, 3, 5, 7, 9] as const);
				const u = rng.int(1, 9);
				half = th * 1000 + h * 100 + t * 10 + u;
				if (half >= 5000) half -= 1000;
			}
			const n = half * 2; // strictly < 10000 and even
			finalAnswerNum = half;
			questionText = `ما هو **نصف** العدد $${n}$؟`;
			const dVals = pickDistinctNumbers(
				half,
				[
					{ val: n < 5000 ? n * 2 : half + 1000, feedback: 'انتبه! المطلوب هو **النصف** (القسمة على $2$) وليس الضعف!' },
					{ val: half + 50, feedback: 'تحقق من نصف رقم المئات والعشرات عند تفكيك العدد.' },
					{ val: Math.max(1, half - 50), feedback: 'أخطأت في حساب نصف العشرات أو المئات؛ جرب تفكيك العدد ثم التحقق بالضعف.' },
					{ val: half + 10, feedback: 'راجع رقم العشرات عند أخذ النصف.' }
				],
				1,
				9999
			);
			const mcq = buildUniqueMcqOptions(
				`$${half}$`,
				dVals.map((d) => ({ text: `$${d.val}$`, diagnosticFeedback: d.feedback })),
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `نصف العدد $${n}$ يساوي $${half}$ لأن $${half} + ${half} = ${n}$.`
			};
			hints = [
				'فكّك العدد إلى مراتب (الآلاف + المئات + العشرات + الوحدات).',
				'احسب نصف كل مرتبة على حدة (تذكّر مثلاً أن نصف $1\\,000$ هو $500$ ونصف $100$ هو $50$).',
				`تحقق من نتيجتك بجمعها إلى نفسها للتأكد من أن المجموع يساوي $${n}$.`
			];
			solutionStepsAr = [
				`نفكّك العدد $${n}$ إلى مجموع أعداد مألوفة ثم نأخذ نصف كل جزء.`,
				`نجمع الأنصاف فنجد نصف $${n}$ هو $${half}$ (التحقق: $${half} \\times 2 = ${n}$).`
			];
		} else if (mode === 2) {
			// Complement to a target (< 10000) using calculated question type
			let a = 340;
			let target = 1000;
			if (difficulty === 'easy') {
				target = 1000;
				a = rng.int(2, 8) * 100 + rng.int(1, 9) * 10;
			} else if (difficulty === 'medium') {
				target = rng.pick([1000, 2000, 5000] as const);
				a = rng.int(2, Math.floor(target / 100) - 2) * 100 + rng.pick([25, 35, 45, 65, 75] as const);
			} else {
				target = rng.pick([4000, 6000, 8000, 9000] as const);
				a = rng.int(12, Math.floor(target / 100) - 5) * 100 + rng.int(14, 88);
			}
			const comp = target - a;
			finalAnswerNum = comp;
			questionText = `أوجد العدد المتمم الذي يكمل المساواة: $${a} + \\square = ${target}$`;
			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: null,
				imageCaption: null,
				questionData: {
					answer: comp,
					displayTemplate: `${a} + ? = ${target}`,
					variables: [],
					tolerance: 0
				},
				explanation: `نكمل أولاً إلى المئة الموالية ثم إلى $${target}$ (أو نطرح: $${target} - ${a} = ${comp}$).`
			};
			hints = [
				`لإيجاد المتمم إلى $${target}$، يمكنك الإكمال تدريجياً (من الوحدات إلى العشرات ثم المئات والآلاف) أو استعمال الطرح.`,
				`احسب $${target} - ${a}$ مع الانتباه للاستعارة.`,
				`تحقق بجمع نتيجتك مع $${a}$ لتجد $${target}$.`
			];
			solutionStepsAr = [
				`المتمم يحقق المساواة: $${a} + ? = ${target}$ أي $? = ${target} - ${a}$.`,
				`بعد الحساب نجد المتمم هو $${comp}$ (لأن $${a} + ${comp} = ${target}$).`
			];
		} else {
			// Mode 3: Fast mental calculation (+9, +11, -19) or multiply by multiples of 10/100 (< 10000)
			if (seed % 8 === 3) {
				// Multiply by multiples of 10 or 100 with result < 10000
				const mult = difficulty === 'easy' ? rng.pick([20, 30, 40] as const) : rng.pick([200, 300, 400] as const);
				const base =
					mult < 100
						? rng.int(12, 48)
						: rng.int(11, Math.floor(9500 / mult));
				const prod = base * mult; // strictly < 10000
				finalAnswerNum = prod;
				const nonZeroMult = mult >= 100 ? mult / 100 : mult / 10;
				const zerosCount = mult >= 100 ? 2 : 1;
				questionText = `احسب ذهنياً الجداء التالي: $${base} \\times ${mult}$`;
				const dVals = pickDistinctNumbers(
					prod,
					[
						{ val: Math.floor(prod / 10), feedback: `نسيت صفراً واحداً! للعدد $${mult}$ يوجد ${zerosCount === 2 ? 'صفران' : 'صفر واحد'} نضيفهما يمين جداء $${base} \\times ${nonZeroMult}$.` },
						{ val: base * 100, feedback: `ضربت في $100$ بدل $${mult}$! اضرب أولاً في $${nonZeroMult}$ ثم أضف الأصفار.` },
						{ val: Math.min(9999, prod + 100), feedback: `راجع جداء $${base} \\times ${nonZeroMult}$ بدقة.` }
					],
					10,
					9999
				);
				const mcq = buildUniqueMcqOptions(
					`$${prod}$`,
					dVals.map((d) => ({ text: `$${d.val}$`, diagnosticFeedback: d.feedback })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: null,
					imageCaption: null,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `نضرب $${base} \\times ${nonZeroMult} = ${base * nonZeroMult}$، ثم نضيف ${zerosCount === 2 ? 'صفرين' : 'صفراً واحداً'} على اليمين فنجد $${prod}$.`
				};
				hints = [
					`فكّك $${mult}$ إلى $${nonZeroMult} \\times ${mult >= 100 ? 100 : 10}$.`,
					`احسب أولاً $${base} \\times ${nonZeroMult} = ${base * nonZeroMult}$.`,
					`أضف ${zerosCount === 2 ? 'صفرين' : 'صفراً واحداً'} على يمين النتيجة.`
				];
				solutionStepsAr = [
					`نحسب أولاً الجداء: $${base} \\times ${nonZeroMult} = ${base * nonZeroMult}$.`,
					`نضرب في $${mult >= 100 ? 100 : 10}$ بإضافة ${zerosCount === 2 ? 'صفرين' : 'صفر'} فنحصل على $${prod}$.`
				];
			} else {
				// Fast mental arithmetic: +9, +11, -19 (< 10000)
				const trick = rng.pick(['+9', '+11', '-19'] as const);
				const base =
					difficulty === 'easy'
						? rng.int(32, 88)
						: difficulty === 'medium'
							? rng.int(124, 865)
							: rng.int(1235, 8475);
				const ans = trick === '+9' ? base + 9 : trick === '+11' ? base + 11 : base - 19;
				finalAnswerNum = ans;
				const opLabel = trick === '+9' ? `${base} + 9` : trick === '+11' ? `${base} + 11` : `${base} - 19`;
				questionText = `نظّم حسابك واحسب ذهنياً: $${opLabel}$`;
				const wrongSign = trick === '+9' ? base + 11 : trick === '+11' ? base + 9 : base - 21;
				const forgotAdjust = trick === '-19' ? base - 20 : base + 10;
				const dVals = pickDistinctNumbers(
					ans,
					[
						{ val: wrongSign, feedback: trick === '-19' ? 'لطرح $19$ نطرح $20$ ثم **نضيف** $1$ (ولا نطرح $1$)!' : 'انتبه: لإضافة $9$ نضيف $10$ ثم نطرح $1$، ولإضافة $11$ نضيف $10$ ثم نضيف $1$.' },
						{ val: forgotAdjust, feedback: 'تذكّر تعديل النتيجة بـ $1$ بعد إضافة أو طرح العشرة/العشرين!' },
						{ val: ans + 10, feedback: 'راجع رقم العشرات في الحساب الذهني.' }
					],
					1,
					9999
				);
				const mcq = buildUniqueMcqOptions(
					`$${ans}$`,
					dVals.map((d) => ({ text: `$${d.val}$`, diagnosticFeedback: d.feedback })),
					rng
				);
				const trickRule =
					trick === '+9'
						? `لإضافة $9$ نضيف $10$ ثم نطرح $1$: $${base} + 10 - 1 = ${ans}$`
						: trick === '+11'
							? `لإضافة $11$ نضيف $10$ ثم نضيف $1$: $${base} + 10 + 1 = ${ans}$`
							: `لطرح $19$ نطرح $20$ ثم نضيف $1$: $${base} - 20 + 1 = ${ans}$`;
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: null,
					imageCaption: null,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${trickRule}.`
				};
				hints = [
					trick === '-19' ? 'قرّب $19$ إلى $20$ ليسهل الطرح.' : `قرّب ${trick.slice(1)} إلى $10$ ليسهل الجمع.`,
					trick === '+9'
						? `احسب $${base} + 10 = ${base + 10}$ ثم اطرح $1$.`
						: trick === '+11'
							? `احسب $${base} + 10 = ${base + 10}$ ثم أضف $1$.`
							: `احسب $${base} - 20 = ${base - 20}$ ثم أضف $1$.`,
					`تحقق من رقم الوحدات في النتيجة (${ans % 10}).`
				];
				solutionStepsAr = [
					trickRule.split(':')[0] + '.',
					trickRule.split(':')[1].trim() + '.'
				];
			}
		}

		// SujetBuilder table of doubles & halves (all numbers strictly < 10000 and even)
		const hA = difficulty === 'easy' ? rng.int(11, 44) * 10 : rng.int(62, 184) * 10; // even number <= 1840, half <= 920, double <= 3680
		const numA = hA * 2; // <= 3680, double <= 7360 < 10000
		const hB = difficulty === 'easy' ? rng.int(12, 38) * 10 : rng.int(115, 235) * 10; // numB <= 4700, double <= 9400 < 10000
		const numB = hB * 2;
		const compTarget = difficulty === 'easy' ? 1000 : rng.pick([1000, 2000, 5000] as const);
		const compPart = rng.int(2, Math.floor(compTarget / 100) - 2) * 100 + rng.pick([20, 30, 40, 60, 70] as const);
		const compRem = compTarget - compPart;
		const mentalBase = rng.int(12, 42);
		const mentalMult = rng.pick([20, 30, 200] as const);

		const tableRows: (string | TableCell)[][] = [
			[
				`$${numA}$`,
				{ content: '........', answer: `$${hA}$`, mark: '0.25' },
				{ content: '........', answer: `$${numA * 2}$`, mark: '0.25' }
			],
			[
				{ content: '........', answer: `$${numB}$`, mark: '0.25' },
				`$${hB}$`,
				{ content: '........', answer: `$${numB * 2}$`, mark: '0.25' }
			]
		];

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أكمل جدول الضعف والنصف، ثم أتمم العلاقات الحسابية التالية:',
				content: [
					{
						type: 'table',
						headers: ['العدد', 'نصفه', 'ضعفه'],
						cells: [],
						rows: tableRows,
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `أكمل المساويات التالية:\n\n- $${compPart} + "....." = ${compTarget}$\n\n- $${mentalBase} times ${mentalMult} = "....."$`,
						answer: `- $${compPart} + ${compRem} = ${compTarget}$\n\n- $${mentalBase} times ${mentalMult} = ${mentalBase * mentalMult}$`,
						mark: '0.5'
					}
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer: String(finalAnswerNum)
		};
	}
};

// ============================================================================
// 3. Time & Elapsed Durations (svgAnalogClock)
// ============================================================================

const tplTimeDurations: ParameterizedTemplate = {
	id: '3ap_t3_time_durations',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'قياس المدد والزمن: قراءة الساعة والتحويل والمخطط الزمني',
	curriculumLessonId: 'lesson_3ap_t3_time_durations',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 303);
		const person = rng.pick(STUDENTS);
		const mode = seed % 3; // 0: find end time, 1: read analog clock (AM/PM), 2: find elapsed duration

		let startH = 8;
		let startM = 15;
		let durH = 1;
		let durM = 20;
		let endH = 9;
		let endM = 35;

		if (difficulty === 'easy') {
			startH = rng.int(7, 10);
			startM = rng.pick([0, 10, 15, 20] as const);
			durH = rng.int(1, 2);
			durM = rng.pick([10, 15, 20, 30] as const); // startM + durM <= 50 < 60
			endH = startH + durH;
			endM = startM + durM;
		} else if (difficulty === 'medium') {
			startH = rng.int(7, 10);
			startM = rng.pick([35, 40, 45, 50] as const);
			durH = rng.int(0, 1);
			durM = rng.pick([25, 30, 35, 40] as const); // guarantees crossing 60 min
			const totalM = startM + durM;
			endH = startH + durH + Math.floor(totalM / 60);
			endM = totalM % 60;
		} else {
			startH = rng.int(7, 9);
			startM = rng.pick([25, 35, 40, 45, 50, 55] as const);
			durH = rng.int(1, 2);
			durM = rng.pick([25, 35, 40, 45] as const);
			const totalM = startM + durM;
			endH = startH + durH + Math.floor(totalM / 60);
			endM = totalM % 60;
		}

		const isEveningRead = mode === 1 && difficulty !== 'easy' && seed % 2 === 1;
		const readH24 = isEveningRead ? startH + 12 : startH;
		const startStr = fmtClock(startH, startM);
		const endStr = fmtClock(endH, endM);
		const durStr = fmtDuration(durH, durM);

		const svgStr = svgAnalogClock(startH, startM);
		const svgPath = saveSvgAsset(`3ap_t3_clock_${difficulty}_s${seed}`, svgStr);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = '';
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (mode === 0) {
			// Find arrival / end time using timeline
			finalAnswer = endStr;
			const questionText = `بدأ ${person.name} مراجعة دروسه صباحاً على الساعة $${startStr}$ (كما توضّح الساعة المرفقة)، واستمر ذلك مدة $${durStr}$. في أي ساعة ينتهي؟`;
			const wrongForgetCarry = fmtClock(startH + durH, (startM + durM) % 60);
			const wrongBase100 = `${pad2(startH + durH)}:${startM + durM >= 60 ? startM + durM : startM + durM + 10}`;
			const wrongMinusOne = fmtClock(endH, (endM + 10) % 60);
			const wrongAddMore = fmtClock(endH + 1, endM);
			const candidateTexts = [
				{ text: `$${wrongForgetCarry}$`, fb: 'انتبه! عندما يبلغ مجموع الدقائق $60$ دقيقة أو أكثر، نبادل كل $60\\text{ min}$ بـ $1\\text{ h}$ ونضيفها إلى الساعات.' },
				{ text: `$${wrongBase100}$`, fb: 'لا نجمع الدقائق مثل النظام العشري ($1\\text{ h} = 60\\text{ min}$ وليس $100$)!' },
				{ text: `$${wrongMinusOne}$`, fb: 'راجع جمع الدقائق باستعمال المخطط الزمني.' },
				{ text: `$${wrongAddMore}$`, fb: 'تحقق من عدد الساعات الكاملة المضافة.' }
			];
			const uniqueD: { text: string; diagnosticFeedback: string }[] = [];
			const seen = new Set<string>([`$${endStr}$`]);
			for (const c of candidateTexts) {
				if (!seen.has(c.text)) {
					seen.add(c.text);
					uniqueD.push({ text: c.text, diagnosticFeedback: c.fb });
				}
			}
			const mcq = buildUniqueMcqOptions(`$${endStr}$`, uniqueD, rng);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `ساعة البداية: ${startStr}`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `باستعمال المخطط الزمني: نضيف إلى $${startStr}$ مدة $${durStr}$ مع تذكر أن $60\\text{ min} = 1\\text{ h}$، فنصل إلى $${endStr}$.`
			};
			hints = [
				`اقرأ وقت البداية من الساعة (${startStr}).`,
				'استعمل المخطط الزمني: أضف الساعات الكاملة أولاً، ثم أضف الدقائق.',
				'تذكّر دائماً أن كل $60$ دقيقة تعادل $1$ ساعة.'
			];
			solutionStepsAr = [
				`وقت البداية صباحاً هو ${startStr}.`,
				durH > 0
					? `نضيف ${durH} ساعة فنصل إلى ${fmtClock(startH + durH, startM)}، ثم نضيف ${durM} دقيقة.`
					: `نضيف ${durM} دقيقة إلى ${startStr} مع مبادلة كل 60 دقيقة بساعة واحدة.`,
				`إذن توقيت النهاية هو ${endStr}.`
			];
		} else if (mode === 1) {
			// Read analog clock (morning or evening)
			const readStr = fmtClock(readH24, startM);
			finalAnswer = readStr;
			const periodAr = isEveningRead ? 'مساءً' : 'صباحاً';
			const questionText = `تشير الساعة ذات العقارب المرفقة إلى توقيت **${periodAr}**. ما هو التوقيت الرقمي الموافق لها (بنظام $24$ ساعة)؟`;
			const otherPeriod = fmtClock(isEveningRead ? startH : startH + 12, startM);
			const wrongMinDial = fmtClock(readH24, startM === 0 ? 12 : Math.floor(startM / 5));
			const wrongNextHour = fmtClock(readH24 + 1, startM);
			const mcq = buildUniqueMcqOptions(
				`$${readStr}$`,
				[
					{ text: `$${otherPeriod}$`, diagnosticFeedback: `انتبه إلى الفترة (${periodAr})! في التوقيت المسائي نضيف $12$ إلى رقم الساعات.` },
					{ text: `$${wrongMinDial}$`, diagnosticFeedback: 'عقرب الدقائق الطويل يُقرأ بضرب التدريجة في $5$ (لأن كل فاصلة بين عددين تمثل $5$ دقائق).' },
					{ text: `$${wrongNextHour}$`, diagnosticFeedback: 'راقب العقرب القصير الأحمر: لم يبلغ بعد الساعة الموالية!' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `الساعة (${periodAr})`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `العقرب القصير يشير إلى $${startH}$ (بالتوقيت ${periodAr}: $${pad2(readH24)}$)، والعقرب الطويل يشير إلى $${pad2(startM)}$ دقيقة، إذن الساعة هي $${readStr}$.`
			};
			hints = [
				'العقرب الأحمر القصير يدل على الساعات، والعقرب الأزرق الطويل يدل على الدقائق.',
				isEveningRead ? `بما أن التوقيت مساءً، أضف $12$ إلى رقم الساعات ($${startH} + 12 = ${readH24}$).` : 'التوقيت صباحاً، لذا رقم الساعات يبقى كما هو.',
				'احسب الدقائق بضرب الرقم الذي يشير إليه العقرب الطويل في $5$.'
			];
			solutionStepsAr = [
				`نقرأ الساعات من العقرب القصير: ${startH}، وبما أن الوقت ${periodAr} فالعدد هو ${pad2(readH24)}.`,
				`نقرأ الدقائق من العقرب الطويل: ${pad2(startM)} دقيقة.`,
				`إذن التوقيت الرقمي هو ${readStr}.`
			];
		} else {
			// Mode 2: Find elapsed duration between startStr (clock) and endStr
			finalAnswer = durStr;
			const questionText = `خرج ${person.name} في نزهة على الساعة $${startStr}$ صباحاً (كما تشير الساعة المرفقة)، وعاد على الساعة $${endStr}$. ما هي **المدة الزمنية** التي قضاها؟`;
			const wrongNoBorrow = fmtDuration(endH - startH, endM < startM ? endM + 60 - startM : (durM + 10) % 60);
			const wrongBase100 = fmtDuration(Math.max(0, endH - startH - 1), endM < startM ? endM + 100 - startM : durM + 15);
			const wrongReversed = fmtDuration(endH - startH, Math.abs(endM - startM) === durM ? durM + 5 : Math.abs(endM - startM));
			const candidates = [
				{ text: `$\\text{${wrongNoBorrow}}$`, fb: 'انتبه! عند المرور عبر الساعة الموالية أو الاستلاف نُبادل $1\\text{ h}$ بـ $60\\text{ min}$.' },
				{ text: `$\\text{${wrongBase100}}$`, fb: 'الساعة تساوي $60$ دقيقة وليس $100$ دقيقة!' },
				{ text: `$\\text{${wrongReversed}}$`, fb: 'لا تطرح الدقائق الصغرى من الكبرى بالعكس؛ استعمل المخطط الزمني للقفز إلى الساعة الموالية.' }
			];
			const seen = new Set<string>([`$\\text{${durStr}}$`]);
			const uniqueD: { text: string; diagnosticFeedback: string }[] = [];
			for (const c of candidates) {
				if (!seen.has(c.text)) {
					seen.add(c.text);
					uniqueD.push({ text: c.text, diagnosticFeedback: c.fb });
				}
			}
			const mcq = buildUniqueMcqOptions(`$\\text{${durStr}}$`, uniqueD, rng);
			quizQuestion = {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `ساعة الانطلاق: ${startStr}`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `بالمخطط الزمني من $${startStr}$ إلى $${endStr}$: المدة المستغرقة هي $${durStr}$.`
			};
			hints = [
				`استعمل المخطط الزمني انطلاقاً من $${startStr}$ نحو $${endStr}$.`,
				startM > 0 ? `احسب أولاً الدقائق للوصول إلى الساعة الموالية $${pad2(startH + 1)}:00$ ($${60 - startM}$ دقيقة).` : 'عدّ الساعات الكاملة أولاً.',
				'اجمع الدقائق والساعات للوصول إلى التوقيت النهائي.'
			];
			solutionStepsAr = [
				`نحسب المدة بين ${startStr} و ${endStr} باستعمال المخطط الزمني.`,
				startM > 0 && endM < startM
					? `من ${startStr} إلى ${pad2(startH + 1)}:00 توجد ${60 - startM} دقيقة، ثم نكمل إلى ${endStr}.`
					: `نحسب الفرق في الساعات والدقائق مباشرة.`,
				`المدة المستغرقة هي: ${durStr}.`
			];
		}

		// Time conversion sub-question in sujetExercise
		const convH = rng.int(1, 3);
		const convM = rng.pick([10, 15, 20, 25, 30, 45] as const);
		const totalConvMin = convH * 60 + convM;
		const convSecMin = rng.int(2, 5);
		const totalConvSec = convSecMin * 60;

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'لاحظ الساعة المرفقة ثم أجب عن أسئلة قراءة الوقت والمدد والتحويل:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) تشير الساعة المقابلة إلى توقيت الانطلاق صباحاً. اكتب هذا التوقيت بالأرقام: ................\n\n2) إذا دامت الرحلة مدة ${ltr(durStr)}، فما هو وقت الوصول؟`,
								answer: `1) وقت الانطلاق صباحاً هو: ${ltr(startStr)}.\n\n2) وقت الوصول: ${ltr(`${startStr} + ${durStr} = ${endStr}`)}.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'ساعة الانطلاق'
							}
						]
					},
					{
						type: 'text',
						content: `3) حوّل إلى الوحدة المطلوبة:\n\n- ${ltr(`${convH} h ${convM} min = ........ min`)}   ؛   ${ltr(`${convSecMin} min = ........ s`)}`,
						answer: `- ${ltr(`${convH} h ${convM} min = ${totalConvMin} min`)} (لأن ${ltr('1 h = 60 min')})\n\n- ${ltr(`${convSecMin} min = ${totalConvSec} s`)} (لأن ${ltr('1 min = 60 s')})`,
						mark: '0.5'
					},
					buildIllustratedFigureBlock('pri_math_05_analog_clock_ticks', {
						maxHeight: 112,
						width: '58%',
						mode: 'image_only',
						title: 'تَذْكِيرٌ بَصَرِيٌّ: العَقْرَبُ الصَّغِيرُ لِلسَّاعَاتِ وَالكَبِيرُ لِلدَّقَائِقِ (1 h = 60 min)'
					})
				]
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 4. Perimeter of Square & Rectangle (svgRectangle — perimeter ONLY, NO area!)
// ============================================================================

const tplPerimeterSquareRectangle: ParameterizedTemplate = {
	id: '3ap_t3_perimeter_square_rectangle',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'محيط المربع والمستطيل والمضلعات المألوفة',
	curriculumLessonId: 'lesson_3ap_t3_perimeter_square_rectangle',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 404);
		const verticesSets: [string, string, string, string][] = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['M', 'N', 'P', 'K']
		];
		const vertices = rng.pick(verticesSets);
		const shapeName = vertices.join('');
		const mode = seed % 3; // 0: square perimeter (or side on hard), 1: rectangle perimeter MCQ, 2: rectangle perimeter calculated

		let svgStr = '';
		let svgCaption = '';
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let sujetBlocks: ContentBlock[];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer = '';

		if (mode === 0) {
			// Square perimeter (and on hard, half the time find missing side from P = 4 * s with s <= 10)
			const findSide = difficulty === 'hard' && seed % 2 === 1;
			if (findSide) {
				const s = rng.int(4, 10);
				const P = s * 4;
				const unit = 'm';
				svgStr = svgRectangle({
					lengthLabel: `? ${unit}`,
					widthLabel: `? ${unit}`,
					shapeLabel: 'مربع',
					vertices
				});
				const svgPath = saveSvgAsset(`3ap_t3_perim_${difficulty}_s${seed}`, svgStr);
				svgCaption = `المربع ${shapeName} محيطه ${P} ${unit}`;

				const questionText = `لافتة مربعة الشكل $${shapeName}$ محيطها $${P}\\text{ ${unit}}$. ما هو **طول ضلعها**؟`;
				const dVals = pickDistinctNumbers(
					s,
					[
						{ val: P - 4, feedback: 'طرحت $4$ من المحيط بدل القسمة على $4$! لمحيط المربع $4$ أضلاع متقايسة.' },
						{ val: P / 2, feedback: 'قسمت على $2$ فقط، بينما للمربع $4$ أضلاع متقايسة الطول!' },
						{ val: s + 2, feedback: 'تحقق بجدول ضرب $4$: اضرب طول الضلع في $4$ لتتأكد أن الناتج هو المحيط.' }
					],
					1,
					99
				);
				const mcq = buildUniqueMcqOptions(
					`$${s}\\text{ ${unit}}$`,
					dVals.map((d) => ({ text: `$${d.val}\\text{ ${unit}}$`, diagnosticFeedback: d.feedback })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: svgCaption,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `للمربع $4$ أضلاع متقايسة، إذن طول الضلع يساوي المحيط $\\div 4$: $${P} \\div 4 = ${s}\\text{ ${unit}}$.`
				};
				finalAnswer = `${s} ${unit}`;
				hints = [
					'للمربع $4$ أضلاع لها نفس الطول تماماً.',
					'محيط المربع = طول الضلع × $4$.',
					`ابحث في جدول ضرب $4$: $4 \\times ? = ${P}$.`
				];
				solutionStepsAr = [
					`محيط المربع يساوي $4 \\times$ طول الضلع، وهو هنا $${P}\\text{ ${unit}}$.`,
					`لإيجاد طول الضلع الواحد نقسم المحيط على $4$: $${P} \\div 4 = ${s}\\text{ ${unit}}$.`
				];

				const rL = rng.int(9, 16);
				const rW = rng.int(4, rL - 2);
				const rP = 2 * (rL + rW);
				sujetBlocks = [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) الشكل المقابل مربع ${ltr(shapeName)} محيطه ${ltr(`${P} ${unit}`)}. احسب طول ضلعه.`,
								answer: `طول ضلع المربع: $${P} div 4 = ${s}$ ${unit} (لأن $4 times ${s} = ${P}$).`,
								mark: '0.75'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `المربع ${shapeName}`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب محيط مستطيل طوله ${ltr(`${rL} cm`)} وعرضه ${ltr(`${rW} cm`)}.`,
						answer: `محيط المستطيل: $(${rL} + ${rW}) times 2 = ${rL + rW} times 2 = ${rP}$ cm.`,
						mark: '0.75'
					}
				];
			} else {
				const s =
					difficulty === 'easy'
						? rng.int(3, 9)
						: difficulty === 'medium'
							? rng.int(12, 35)
							: rng.int(36, 95);
				const unit = difficulty === 'easy' ? 'cm' : 'm';
				const P = s * 4;
				svgStr = svgRectangle({
					lengthLabel: `${s} ${unit}`,
					widthLabel: `${s} ${unit}`,
					shapeLabel: 'مربع',
					vertices
				});
				const svgPath = saveSvgAsset(`3ap_t3_perim_${difficulty}_s${seed}`, svgStr);
				svgCaption = `المربع ${shapeName} (ضلعه ${s} ${unit})`;

				const questionText = `احسب **محيط** المربع $${shapeName}$ المرسوم أمامك، إذا كان طول ضلعه $${s}\\text{ ${unit}}$.`;
				const dVals = pickDistinctNumbers(
					P,
					[
						{ val: s + 4, feedback: 'لقد جمعت $+ 4$ بدل الضرب في $4$! محيط المربع $=$ طول الضلع $\\times 4$.' },
						{ val: s * 2, feedback: 'ضربت في $2$ فقط (طول ضلعين)، بينما للمربع $4$ أضلاع متقايسة!' },
						{ val: s * 3, feedback: 'حسبت $3$ أضلاع فقط ونسيت الضلع الرابع!' }
					],
					4,
					999
				);
				const mcq = buildUniqueMcqOptions(
					`$${P}\\text{ ${unit}}$`,
					dVals.map((d) => ({ text: `$${d.val}\\text{ ${unit}}$`, diagnosticFeedback: d.feedback })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: svgCaption,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `محيط المربع = طول الضلع $\\times 4$: $${s} \\times 4 = ${P}\\text{ ${unit}}$.`
				};
				finalAnswer = `${P} ${unit}`;
				hints = [
					'المحيط هو مجموع أطوال الأضلاع الخارجية للشكل.',
					'للمربع $4$ أضلاع متقايسة في الطول.',
					`احسب محيط المربع بالضرب: $${s} \\times 4$.`
				];
				solutionStepsAr = [
					'قاعدة محيط المربع = طول الضلع × $4$.',
					`نعوّض طول الضلع ($${s}\\text{ ${unit}}$): $${s} \\times 4 = ${P}\\text{ ${unit}}$.`
				];

				// Triangle polygon perimeter as sub-question 2
				const tA = rng.int(5, 11);
				const tB = rng.int(6, 12);
				const tC = rng.int(4, 9);
				const tP = tA + tB + tC;
				sujetBlocks = [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب محيط المربع ${ltr(shapeName)} المرسوم أمامك، إذا كان طول ضلعه ${ltr(`${s} ${unit}`)}.`,
								answer: `محيط المربع: $${s} times 4 = ${P}$ ${unit}.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `المربع ${shapeName}`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب محيط مثلث أطوال أضلاعه ${ltr(`${tA} cm`)} و ${ltr(`${tB} cm`)} و ${ltr(`${tC} cm`)}.`,
						answer: `محيط المثلث = مجموع أطوال أضلاعه: $${tA} + ${tB} + ${tC} = ${tP}$ cm.`,
						mark: '0.5'
					}
				];
			}
		} else {
			// Rectangle perimeter (mode 1: MCQ, mode 2: calculated)
			let W = 4;
			let L = 7;
			let unit = 'cm';
			if (difficulty === 'easy') {
				W = rng.int(3, 7);
				L = rng.int(W + 2, 12);
				unit = 'cm';
			} else if (difficulty === 'medium') {
				W = rng.int(10, 30);
				L = rng.int(W + 8, 55);
				unit = 'm';
			} else {
				W = rng.int(25, 75);
				L = rng.int(W + 15, 130);
				unit = 'm';
			}
			const halfP = L + W;
			const P = halfP * 2;

			svgStr = svgRectangle({
				lengthLabel: `${L} ${unit}`,
				widthLabel: `${W} ${unit}`,
				shapeLabel: 'مستطيل',
				vertices
			});
			const svgPath = saveSvgAsset(`3ap_t3_perim_${difficulty}_s${seed}`, svgStr);
			svgCaption = `المستطيل ${shapeName} (${L} ${unit} و ${W} ${unit})`;

			if (mode === 1) {
				const questionText = `لاحظ المستطيل $${shapeName}$ الذي طوله $${L}\\text{ ${unit}}$ وعرضه $${W}\\text{ ${unit}}$. ما هو **محيطه**؟`;
				const dVals = pickDistinctNumbers(
					P,
					[
						{ val: halfP, feedback: `$${halfP}\\text{ ${unit}}$ هو نصف المحيط (الطول $+$ العرض) فقط! تذكّر الضرب في $2$ لأن للمستطيل طولين وعرضين.` },
						{ val: 2 * L + W, feedback: 'جمعت طولين وعرضاً واحداً فقط ونسيت العرض الثاني!' },
						{ val: L + 2 * W, feedback: 'جمعت طولاً واحداً وعرضين ونسيت الطول الثاني!' }
					],
					4,
					999
				);
				const mcq = buildUniqueMcqOptions(
					`$${P}\\text{ ${unit}}$`,
					dVals.map((d) => ({ text: `$${d.val}\\text{ ${unit}}$`, diagnosticFeedback: d.feedback })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: svgCaption,
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `محيط المستطيل = (الطول + العرض) $\\times 2$: نحسب $(${L} + ${W}) = ${halfP}$ ثم نضرب في $2$: $${halfP} \\times 2 = ${P}\\text{ ${unit}}$.`
				};
			} else {
				const questionText = `احسب **محيط** المستطيل $${shapeName}$ المرسوم أمامك بـ ($\\text{${unit}}$)، علماً أن طوله $${L}\\text{ ${unit}}$ وعرضه $${W}\\text{ ${unit}}$.`;
				quizQuestion = {
					type: 'calculated',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: svgCaption,
					questionData: {
						answer: P,
						displayTemplate: `(${L} + ${W}) × 2 = ? ${unit}`,
						variables: [],
						tolerance: 0
					},
					explanation: `نصف المحيط: $${L} + ${W} = ${halfP}\\text{ ${unit}}$، ثم نضرب في $2$: $${halfP} \\times 2 = ${P}\\text{ ${unit}}$.`
				};
			}

			finalAnswer = `${P} ${unit}`;
			hints = [
				'للمستطيل طولان متقايسان وعرضان متقايسان.',
				`احسب أولاً نصف المحيط: الطول $+$ العرض ($${L} + ${W} = ${halfP}$).`,
				`اضرب نصف المحيط في $2$: $${halfP} \\times 2$.`
			];
			solutionStepsAr = [
				`نحسب نصف المحيط (الطول + العرض): $${L} + ${W} = ${halfP}\\text{ ${unit}}$.`,
				`نضرب في $2$ لنجد المحيط: $${halfP} \\times 2 = ${P}\\text{ ${unit}}$.`
			];

			const sqSide = rng.int(5, 15);
			sujetBlocks = [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب محيط المستطيل ${ltr(shapeName)} المرسوم أمامك، طوله ${ltr(`${L} ${unit}`)} وعرضه ${ltr(`${W} ${unit}`)}.`,
							answer: `نصف المحيط: $${L} + ${W} = ${halfP}$ ${unit}.\n\nمحيط المستطيل: $${halfP} times 2 = ${P}$ ${unit}.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgPath,
							caption: `المستطيل ${shapeName}`
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب محيط مربع طول ضلعه ${ltr(`${sqSide} cm`)}.`,
					answer: `محيط المربع: $${sqSide} times 4 = ${sqSide * 4}$ cm.`,
					mark: '0.5'
				}
			];
		}

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'لاحظ الشكل المرسوم وأجب عن أسئلة حساب المحيط مع كتابة القانون والوحدة:',
				content: sujetBlocks
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ============================================================================
// 5. Grid Axial Symmetry & Solids (Faces, Vertices, Edges) with svgGridPoints
// ============================================================================

const tplSymmetryAndSolids: ParameterizedTemplate = {
	id: '3ap_t3_symmetry_and_solids',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'التناظر المحوري على المرصوفة وخصائص المجسمات المألوفة',
	curriculumLessonId: 'lesson_3ap_t3_axial_symmetry_grid',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 505);
		const isSymmetryPrimary = seed % 2 === 0;

		if (isSymmetryPrimary) {
			if (seed % 4 === 0) {
				// Point symmetry across vertical axis on svgGridPoints (cols=8, axis at col=4)
				const cols = 8;
				const rows = difficulty === 'easy' ? 4 : 5;
				const d = difficulty === 'easy' ? rng.int(1, 2) : rng.int(1, 3);
				const cP = 4 - d; // in {1, 2, 3}
				const rP = rng.int(1, rows - 1);
				const rAlt = rP === 1 ? 2 : rP - 1;

				const pTrue = { col: 4 + d, row: rP };
				const pWrongDist = { col: d === 1 ? 6 : 4 + (d - 1), row: rP };
				const pWrongRow = { col: 4 + d, row: rAlt };
				const pExtra = { col: d === 1 ? 7 : 5, row: rAlt };

				const candidateLabels = rng.shuffle(['M', 'N', 'K', 'B']);
				const lblTrue = candidateLabels[0];
				const lblWrongDist = candidateLabels[1];
				const lblWrongRow = candidateLabels[2];
				const lblExtra = candidateLabels[3];

				const svgStr = svgGridPoints({
					cols,
					rows,
					polygon: [
						{ col: 4, row: 0 },
						{ col: 4, row: rows }
					],
					points: [
						{ col: cP, row: rP, label: 'A', color: '#2563eb' },
						{ col: pTrue.col, row: pTrue.row, label: lblTrue, color: '#0f172a' },
						{ col: pWrongDist.col, row: pWrongDist.row, label: lblWrongDist, color: '#0f172a' },
						{ col: pWrongRow.col, row: pWrongRow.row, label: lblWrongRow, color: '#0f172a' },
						{ col: pExtra.col, row: pExtra.row, label: lblExtra, color: '#0f172a' }
					]
				});
				const svgPath = saveSvgAsset(`3ap_t3_geom_${difficulty}_s${seed}`, svgStr);

				const mcq = buildUniqueMcqOptions(
					`النقطة $${lblTrue}$`,
					[
						{
							text: `النقطة $${lblWrongDist}$`,
							diagnosticFeedback: `النقطة $${lblWrongDist}$ على نفس السطر لكنها لا تبعد نفس عدد المربعات ($${d}$) عن المحور الأزرق!`
						},
						{
							text: `النقطة $${lblWrongRow}$`,
							diagnosticFeedback: `النقطة $${lblWrongRow}$ تبعد $${d}$ مربعات لكنها ليست على نفس السطر الأفقي (التناظر يحافظ على التعامد مع المحور)!`
						},
						{
							text: `النقطة $${lblExtra}$`,
							diagnosticFeedback: `تحقق من السطر والمسافة: يجب أن تكون النظيرة على نفس السطر وعلى بُعد $${d}$ مربعات يمين المحور.`
						}
					],
					rng
				);

				const questionText = `تأمّل المرصوفة والخط الأزرق العمودي (محور التناظر). أي نقطة تمثل **نظيرة النقطة $A$** بالنسبة إلى محور التناظر؟`;

				return {
					templateId: this.id,
					seed,
					grade: this.grade,
					trimesterId: this.trimesterId,
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'mcq',
						questionText,
						questionTextAr: questionText,
						imageUrl: svgPath,
						imageCaption: 'المرصوفة ومحور التناظر العمودي',
						questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
						explanation: `النقطة $A$ تبعد عن محور التناظر بـ $${d}$ مربعات نحو اليسار، إذن نظيرتها تقع على نفس السطر وتبعد بـ $${d}$ مربعات نحو اليمين، وهي النقطة $${lblTrue}$.`
					},
					sujetExercise: {
						points: this.defaultPoints,
						instruction: 'تأمّل المرصوفة ذات محور التناظر، ثم أكمل جدول خصائص المجسمات المألوفة:',
						content: [
							{
								type: 'columns',
								widths: ['1.3fr', '1fr'],
								children: [
									{
										type: 'text',
										content: `1) ما هي النقطة النظيرة للنقطة $A$ بالنسبة إلى الخط الأزرق (محور التناظر)؟ ولماذا؟\n\nالنقطة هي: ............\n\n2) كم محور تناظر للمربع؟ ............ وكم محور تناظر للمستطيل؟ ............`,
										answer: `1) النظيرة هي النقطة $${lblTrue}$ لأنها تقع على نفس السطر وتبعد بنفس المسافة ($${d}$ مربعات) عن المحور.\n\n2) للمربع $4$ محاور تناظر، وللمستطيل محورا ($2$) تناظر فقط.`,
										mark: '0.75'
									},
									{
										type: 'image',
										src: svgPath,
										caption: 'محور التناظر على المرصوفة'
									}
								]
							},
							buildIllustratedFigureBlock('pri_math_06_3d_geometric_solids', {
								maxHeight: 112,
								width: '58%',
								mode: 'image_only',
								title: '3) أَكْمِلْ جَدْوَلَ خَصَائِصِ المُجَسَّمَاتِ المَأْلُوفَةِ'
							}),
							{
								type: 'table',
								headers: ['المجسم', 'عدد الوجوه', 'عدد الأحرف', 'عدد الرؤوس', 'يتدحرج؟'],
								cells: [],
								rows: [
									[
										'المكعب',
										{ content: '......', answer: '$6$', mark: '0.25' },
										'$12$',
										'$8$',
										'لا'
									],
									[
										'الهرم (قاعدته مربعة)',
										'$5$',
										{ content: '......', answer: '$8$', mark: '0.25' },
										{ content: '......', answer: '$5$', mark: '0.25' },
										'لا'
									]
								],
								align: 'center',
								borders: 'grid',
								headerBackground: true,
								width: 'full'
							}
						]
					},
					hints: [
						'عدّ كم مربعاً يفصل النقطة $A$ عن الخط الأزرق أفقياً.',
						'اتجه على نفس السطر الأفقي نحو الجهة اليمنى من المحور.',
						`عدّ $${d}$ مربعات على اليمين لتصل إلى النظيرة الصحيحة.`
					],
					solutionStepsAr: [
						`تقع النقطة $A$ على بُعد $${d}$ مربعات إلى يسار محور التناظر.`,
						`نتحرك عمودياً على المحور بنفس المسافة ($${d}$ مربعات) إلى اليمين على نفس السطر.`,
						`نجد أن نظيرة النقطة $A$ هي النقطة $${lblTrue}$.`
					],
					finalAnswer: lblTrue
				};
			}

			// seed % 4 === 2: Shaded cell symmetry on labeled 6x4 / 6x5 grid
			const cols = 6;
			const rows = difficulty === 'easy' ? 4 : 5;
			const colLabels = ['1', '2', '3', '4', '5', '6'];
			const rowLabels = ['A', 'B', 'C', 'D', 'E'].slice(0, rows);

			const targetColIdx = rng.int(0, 2);
			const targetRowIdx = rng.int(0, rows - 1);
			const symColIdx = 5 - targetColIdx;

			const leftCells: { col: number; row: number }[] = [];
			for (let c = 0; c <= 2; c++) {
				for (let r = 0; r < rows; r++) {
					if (c !== targetColIdx || r !== targetRowIdx) {
						leftCells.push({ col: c, row: r });
					}
				}
			}
			const decoCount = difficulty === 'easy' ? 2 : 3;
			const decoCells = rng.pickDistinct(leftCells, decoCount);
			const shadedCells = [
				...decoCells.map((cell) => ({ col: cell.col, row: cell.row, color: '#93c5fd' })),
				{ col: targetColIdx, row: targetRowIdx, color: '#fb923c' }
			];

			const svgStr = svgGridPoints({
				cols,
				rows,
				colLabels,
				rowLabels,
				shadedCells,
				polygon: [
					{ col: 3, row: 0 },
					{ col: 3, row: rows }
				]
			});
			const svgPath = saveSvgAsset(`3ap_t3_geom_${difficulty}_s${seed}`, svgStr);

			const tCol = colLabels[targetColIdx];
			const tRow = rowLabels[targetRowIdx];
			const sCol = colLabels[symColIdx];
			const wrongCol = colLabels[symColIdx === 3 ? 4 : symColIdx - 1];
			const wrongRow = rowLabels[(targetRowIdx + 1) % rows];
			const correctPos = `العمود ${sCol}، السطر ${tRow}`;

			const mcq = buildUniqueMcqOptions(
				correctPos,
				[
					{ text: `العمود ${tCol}، السطر ${tRow}`, diagnosticFeedback: 'هذه هي الخانة الأصلية! ابحث عن نظيرتها في الجهة اليمنى من المحور.' },
					{ text: `العمود ${wrongCol}، السطر ${tRow}`, diagnosticFeedback: 'احسب المسافة من المحور الأزرق: يجب أن تساوي نفس عدد الخانات إلى اليمين.' },
					{ text: `العمود ${sCol}، السطر ${wrongRow}`, diagnosticFeedback: 'السطر لا يتغير عند التناظر بالنسبة لمحور عمودي!' }
				],
				rng
			);

			const questionText = `تأمّل المرصوفة والخط الأزرق (محور التناظر). ما هو موقع الخانة المناظرة للخانة البرتقالية (${tCol}، ${tRow})؟`;
			const distCells = 3 - targetColIdx;

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText,
					questionTextAr: questionText,
					imageUrl: svgPath,
					imageCaption: 'المرصوفة ومحور التناظر العمودي',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الخانة البرتقالية في (العمود ${tCol}، السطر ${tRow}) تبعد عن المحور إلى اليسار، إذن نظيرتها على نفس السطر ${tRow} في العمود ${sCol}.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل المرصوفة ثم أجب عن سؤالي التناظر المحوري والمجسمات:',
					content: [
						{
							type: 'columns',
							widths: ['1.3fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) حدّد موقع الخانة المناظرة للخانة البرتقالية (العمود ${tCol}، السطر ${tRow}) بالنسبة لمحور التناظر الأزرق: ................`,
									answer: `الموقع المناظر هو: ${correctPos} (على نفس السطر ${tRow} وبنفس البعد عن المحور).`,
									mark: '0.75'
								},
								{
									type: 'image',
									src: svgPath,
									caption: 'المرصوفة ومحور التناظر'
								}
							]
						},
						{
							type: 'table',
							headers: ['المجسم', 'عدد الوجوه', 'عدد الأحرف', 'عدد الرؤوس', 'شكل الوجوه'],
							cells: [],
							rows: [
								[
									'متوازي المستطيلات',
									{ content: '......', answer: '$6$', mark: '0.25' },
									'$12$',
									{ content: '......', answer: '$8$', mark: '0.25' },
									'مستطيل'
								],
								[
									'الأسطوانة',
									'قرصان + سطح منحنٍ',
									'$0$',
									{ content: '......', answer: '$0$', mark: '0.25' },
									'دائري (تتدحرج)'
								]
							],
							align: 'center',
							borders: 'grid',
							headerBackground: true,
							width: 'full'
						}
					]
				},
				hints: [
					'عند التناظر بالنسبة لمحور عمودي، يبقى السطر نفسه.',
					`عدّ ترتيب الخانة البرتقالية انطلاقاً من الخط الأزرق إلى اليسار (${distCells}).`,
					`عدّ نفس العدد (${distCells}) انطلاقاً من الخط الأزرق إلى اليمين لتصل إلى العمود ${sCol}.`
				],
				solutionStepsAr: [
					`الخانة البرتقالية في العمود ${tCol} والسطر ${tRow}.`,
					`نبقي على نفس السطر ${tRow} ونعكس المسافة أفقياً عبر محور التناظر فنصل إلى العمود ${sCol}.`,
					`إذن الخانة المناظرة تقع في: ${correctPos}.`
				],
				finalAnswer: correctPos
			};
		}

		// isSymmetryPrimary === false -> Cube net on svgGridPoints + 3AP Solids (Cube, Cuboid, Pyramid, Cylinder)
		const netCells =
			seed % 4 === 1
				? [
						{ col: 2, row: 0, color: '#a5f3fc' },
						{ col: 1, row: 1, color: '#93c5fd' },
						{ col: 2, row: 1, color: '#60a5fa' },
						{ col: 3, row: 1, color: '#93c5fd' },
						{ col: 4, row: 1, color: '#a5f3fc' },
						{ col: 2, row: 2, color: '#a5f3fc' }
					]
				: [
						{ col: 1, row: 0, color: '#a5f3fc' },
						{ col: 1, row: 1, color: '#93c5fd' },
						{ col: 2, row: 1, color: '#60a5fa' },
						{ col: 3, row: 1, color: '#93c5fd' },
						{ col: 4, row: 1, color: '#a5f3fc' },
						{ col: 3, row: 2, color: '#a5f3fc' }
					];

		const svgStr = svgGridPoints({
			cols: 6,
			rows: 4,
			colLabels: ['1', '2', '3', '4', '5', '6'],
			rowLabels: ['A', 'B', 'C', 'D'],
			shadedCells: netCells
		});
		const svgPath = saveSvgAsset(`3ap_t3_geom_${difficulty}_s${seed}`, svgStr);

		interface SolidFact {
			solid: string;
			question: string;
			correct: string;
			distractors: { text: string; diagnosticFeedback: string }[];
			explanation: string;
			hints: [string, string, string];
			steps: string[];
		}

		const factPool: SolidFact[] =
			difficulty === 'easy'
				? [
						{
							solid: 'المكعب',
							question: 'يمثّل الرسم المرفق على المرصوفة **نشر المكعب**. كم عدد وجوه المكعب؟',
							correct: '$6$',
							distractors: [
								{ text: '$8$', diagnosticFeedback: '$8$ هو عدد الرؤوس وليس عدد الوجوه!' },
								{ text: '$12$', diagnosticFeedback: '$12$ هو عدد الأحرف وليس عدد الوجوه!' },
								{ text: '$4$', diagnosticFeedback: 'حسبت الوجوه الجانبية فقط ونسيت القاعدتين!' }
							],
							explanation: 'نعدّ المربعات في نشر المكعب: للمكعب $6$ وجوه مربعة متقايسة.',
							hints: [
								'عدّ المربعات الملونة في المنشور على المرصوفة.',
								'تذكّر حجر النرد: كم وجهاً يحمل الأرقام من 1 إلى 6؟',
								'للمكعب $6$ وجوه، و $8$ رؤوس، و $12$ حرفاً.'
							],
							steps: [
								'نعدّ المربعات في النشر المرسوم على المرصوفة فنجد $6$ مربعات.',
								'إذن للمكعب $6$ وجوه مربعة متقايسة.'
							]
						},
						{
							solid: 'متوازي المستطيلات',
							question: 'كم عدد **رؤوس** مجسم متوازي المستطيلات؟',
							correct: '$8$',
							distractors: [
								{ text: '$6$', diagnosticFeedback: '$6$ هو عدد الوجوه وليس عدد الرؤوس!' },
								{ text: '$12$', diagnosticFeedback: '$12$ هو عدد الأحرف وليس عدد الرؤوس!' },
								{ text: '$4$', diagnosticFeedback: 'يوجد $4$ رؤوس في الأعلى و $4$ رؤوس في الأسفل، فالمجموع $8$.' }
							],
							explanation: 'لمتوازي المستطيلات (مثل المكعب) $8$ رؤوس: $4$ في القاعدة العلوية و $4$ في السفلية.',
							hints: [
								'الرأس هو النقطة المدببة التي تلتقي فيها $3$ أحرف.',
								'عدّ الرؤوس في الوجه العلوي ($4$) وفي الوجه السفلي ($4$).',
								'اجمع: $4 + 4 = 8$ رؤوس.'
							],
							steps: [
								'في القاعدة العلوية لمتوازي المستطيلات توجد $4$ رؤوس، وفي السفلية $4$ رؤوس.',
								'المجموع هو $4 + 4 = 8$ رؤوس.'
							]
						}
					]
				: difficulty === 'medium'
					? [
							{
								solid: 'الهرم ذو القاعدة المربعة',
								question: 'كم عدد **وجوه** الهرم ذي القاعدة المربعة (قاعدته مربع ووجوهه الجانبية مثلثات)؟',
								correct: '$5$',
								distractors: [
									{ text: '$4$', diagnosticFeedback: 'عدّدت الوجوه المثلثة الجانبية فقط ونسيت القاعدة المربعة!' },
									{ text: '$6$', diagnosticFeedback: '$6$ هو عدد وجوه المكعب ومتوازي المستطيلات، أما الهرم المربع القاعدة فله $5$ وجوه.' },
									{ text: '$8$', diagnosticFeedback: '$8$ هو عدد أحرف هذا الهرم وليس عدد وجوهه!' }
								],
								explanation: 'للهرم ذي القاعدة المربعة قاعدة واحدة ($1$) مربعة و $4$ وجوه جانبية مثلثة، فالمجموع $5$ وجوه.',
								hints: [
									'للهرم قاعدة واحدة على شكل مربع.',
									'ترتفع من أضلاع القاعدة المربعة $4$ وجوه مثلثة تلتقي في القمة.',
									'اجمع: $1 + 4 = 5$ وجوه.'
								],
								steps: [
									'القاعدة المربعة تمثل وجهاً واحداً ($1$).',
									'الوجوه الجانبية $4$ مثلثات، إذن المجموع $1 + 4 = 5$ وجوه.'
								]
							},
							{
								solid: 'متوازي المستطيلات',
								question: 'كم عدد **أحرف** متوازي المستطيلات؟',
								correct: '$12$',
								distractors: [
									{ text: '$6$', diagnosticFeedback: '$6$ هو عدد الوجوه وليس عدد الأحرف!' },
									{ text: '$8$', diagnosticFeedback: '$8$ هو عدد الرؤوس وليس عدد الأحرف!' },
									{ text: '$10$', diagnosticFeedback: 'تأكد من العد: $4$ أحرف في الأعلى و $4$ في الأسفل و $4$ عمودية.' }
								],
								explanation: 'لمتوازي المستطيلات $12$ حرفاً ($4$ في الأعلى + $4$ في الأسفل + $4$ جانبية).',
								hints: [
									'الحرف هو الضلع المستقيم الذي يلتقي عنده وجهان.',
									'عدّ أضلاع الوجه العلوي ($4$) وأضلاع الوجه السفلي ($4$).',
									'أضف الأحرف العمودية الأربعة: $4 + 4 + 4 = 12$.'
								],
								steps: [
									'توجد $4$ أحرف في الوجه العلوي و $4$ أحرف في الوجه السفلي.',
									'توجد $4$ أحرف عمودية تصل بينهما، فالمجموع $12$ حرفاً.'
								]
							}
						]
					: [
							{
								solid: 'الهرم ذو القاعدة المربعة',
								question: 'كم عدد **أحرف** الهرم ذي القاعدة المربعة؟',
								correct: '$8$',
								distractors: [
									{ text: '$5$', diagnosticFeedback: '$5$ هو عدد الوجوه (أو الرؤوس) وليس عدد الأحرف!' },
									{ text: '$12$', diagnosticFeedback: '$12$ هو عدد أحرف المكعب ومتوازي المستطيلات!' },
									{ text: '$6$', diagnosticFeedback: 'تذكّر: في القاعدة المربعة $4$ أحرف وتصعد $4$ أحرف نحو القمة.' }
								],
								explanation: 'للهرم ذي القاعدة المربعة $4$ أحرف في القاعدة المربعة و $4$ أحرف جانبية تصعد إلى الرأس العلوي: $4 + 4 = 8$ أحرف.',
								hints: [
									'القاعدة مربعة الشكل، فلها $4$ أحرف.',
									'من كل رأس من رؤوس القاعدة الأربعة يصعد حرف إلى القمة.',
									'اجمع: $4 + 4 = 8$ أحرف.'
								],
								steps: [
									'القاعدة المربعة تحتوي على $4$ أحرف.',
									'تصعد $4$ أحرف جانبية إلى القمة، فالمجموع $8$ أحرف.'
								]
							},
							{
								solid: 'الأسطوانة',
								question: 'أيّ مجسم مما يلي **يتدحرج** وله **قرصان دائريان** مستويان وليس له رؤوس ($0$)؟',
								correct: 'الأسطوانة',
								distractors: [
									{ text: 'المكعب', diagnosticFeedback: 'المكعب لا يتدحرج وله $8$ رؤوس و $6$ وجوه مربعة.' },
									{ text: 'متوازي المستطيلات', diagnosticFeedback: 'متوازي المستطيلات له وجوه مستطيلة ولا يتدحرج.' },
									{ text: 'الهرم', diagnosticFeedback: 'الهرم له $5$ رؤوس ووجوه مستوية (مربع ومثلثات) ولا يتدحرج.' }
								],
								explanation: 'الأسطوانة لها وجهان مستويان على شكل قرصين دائريين وسطح منحنٍ يجعلها تتدحرج، وليس لها رؤوس.',
								hints: [
									'المجسمات ذات الوجوه المستوية فقط لا تتدحرج.',
									'فكّر في علبة المصبرات الدائرية.',
									'الأسطوانة هي المجسم الذي يتدحرج وله قرصان دائريان.'
								],
								steps: [
									'المكعب ومتوازي المستطيلات والهرم لها وجوه مستوية فقط ولا تتدحرج.',
									'الأسطوانة لها سطح منحنٍ فتتدحرج، ولها قرصان دائريان مستويان.'
								]
							}
						];

		const pickedFact = rng.pick(factPool);
		const useMatrix = seed % 4 === 3;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer = pickedFact.correct.replace(/\$/g, '');

		if (useMatrix) {
			finalAnswer = 'المكعب: 6 وجوه | الهرم: 5 وجوه | الأسطوانة: تتدحرج';
			quizQuestion = {
				type: 'matrix',
				questionText: 'صنّف كل عبارة هندسية حول المجسمات المألوفة باختيار الإجابة المناسبة:',
				questionTextAr: 'صنّف كل عبارة هندسية حول المجسمات المألوفة باختيار (صحيح) أو (خطأ):',
				imageUrl: svgPath,
				imageCaption: 'نشر المكعب على المرصوفة (6 وجوه مربعة)',
				questionData: {
					statements: [
						'المكعب له 6 وجوه كلها مربعات و 8 رؤوس',
						'الهرم ذو القاعدة المربعة له 6 وجوه مستطيلة',
						'الأسطوانة مجسم يتدحرج وله قرصان دائريان'
					],
					columns: ['صحيح', 'خطأ'],
					correctAnswers: [0, 1, 0]
				},
				explanation: 'المكعب له 6 وجوه مربعة و8 رؤوس، والهرم ذو القاعدة المربعة له 5 وجوه (قاعدة مربعة و4 مثلثات)، والأسطوانة تتدحرج ولها قرصان دائريان.'
			};
		} else {
			const mcq = buildUniqueMcqOptions(pickedFact.correct, pickedFact.distractors, rng);
			quizQuestion = {
				type: 'mcq',
				questionText: pickedFact.question,
				questionTextAr: pickedFact.question,
				imageUrl: svgPath,
				imageCaption: 'نشر المكعب على المرصوفة',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: pickedFact.explanation
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'لاحظ النشر المرسوم على المرصوفة، ثم أكمل جدول خصائص المجسمات:',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1fr'],
						children: [
							{
								type: 'text',
								content: '1) ما اسم المجسم الذي يمثّله هذا النشر على المرصوفة؟ وكم وجهاً له؟\n\nالمجسم هو: ................ وعدد وجوهه: ........',
								answer: 'المجسم هو: المكعب، وعدد وجوهه $6$ وجوه مربعة متقايسة.',
								mark: '0.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'نشر مجسم على المرصوفة'
							}
						]
					},
					{
						type: 'table',
						headers: ['المجسم', 'عدد الوجوه', 'عدد الأحرف', 'عدد الرؤوس', 'الخاصية'],
						cells: [],
						rows: [
							[
								'المكعب',
								'$6$',
								{ content: '......', answer: '$12$', mark: '0.25' },
								'$8$',
								'وجوه مربعة'
							],
							[
								'متوازي المستطيلات',
								{ content: '......', answer: '$6$', mark: '0.25' },
								'$12$',
								{ content: '......', answer: '$8$', mark: '0.25' },
								'وجوه مستطيلة'
							],
							[
								'الهرم (قاعدته مربعة)',
								'$5$',
								{ content: '......', answer: '$8$', mark: '0.25' },
								'$5$',
								'قاعدة مربعة + 4 مثلثات'
							]
						],
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					}
				]
			},
			hints: pickedFact.hints,
			solutionStepsAr: pickedFact.steps,
			finalAnswer
		};
	}
};

// ============================================================================
// 6. Integration Problem (الوضعية الإدماجية): Fencing/Perimeter + Cost + Equal Sharing (< 100000)
// ============================================================================

const tplIntegrationFenceSharing: ParameterizedTemplate = {
	id: '3ap_t3_integration_fence_sharing',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تسييج ساحة أو حديقة مستطيلة وحساب التكلفة والتوزيع المتساوي',
	curriculumLessonId: 'lesson_3ap_t3_integration',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = createRng(seed, difficulty, 606);

		const scenarios = [
			{
				place: 'حديقة تعاونية الحي',
				shapeLabel: 'الحديقة المستطيلة',
				partners: 'جيران',
				singlePartner: 'جار',
				extraLabel: 'الباب الحديدي',
				contextIntro: 'اتفق مجموعة من الجيران على تسييج حديقة مستطيلة الشكل لحمايتها'
			},
			{
				place: 'ساحة المدرسة',
				shapeLabel: 'الساحة المستطيلة',
				partners: 'أقسام',
				singlePartner: 'قسم',
				extraLabel: 'الأعمدة الحديدية',
				contextIntro: 'بمناسبة التحضير لحفل نهاية السنة، تقرر تسييج ساحة مدرسة مستطيلة الشكل'
			},
			{
				place: 'بستان العائلة',
				shapeLabel: 'البستان المستطيل',
				partners: 'إخوة',
				singlePartner: 'أخ',
				extraLabel: 'البوابة الخشبية',
				contextIntro: 'تعاون عدة إخوة على إحاطة بستانهم المستطيل بسياج معدني'
			}
		] as const;
		const sc = rng.pick(scenarios);

		let L = 14;
		let W = 6;
		let gate = 0;
		let pricePerM = 200;
		let extraCost = 0;
		let partnersCount = 4;
		let sharePerPartner = 1000;
		let totalCost = 4000;

		if (difficulty === 'easy') {
			// Pick P from clean multiples so P * pricePerM = k * q * 100 with q in [2..10]
			const easySpecs: { L: number; W: number; pricePerM: number; k: number }[] = [
				{ L: 8, W: 4, pricePerM: 200, k: 6 }, // P=24, cost=4800, share=800 (48/6=8)
				{ L: 10, W: 5, pricePerM: 200, k: 6 }, // P=30, cost=6000, share=1000 (60/6=10)
				{ L: 9, W: 5, pricePerM: 100, k: 4 }, // P=28, cost=2800, share=700 (28/4=7)
				{ L: 12, W: 6, pricePerM: 100, k: 6 }, // P=36, cost=3600, share=600 (36/6=6)
				{ L: 11, W: 5, pricePerM: 100, k: 4 }, // P=32, cost=3200, share=800 (32/4=8)
				{ L: 15, W: 5, pricePerM: 200, k: 8 } // P=40, cost=8000, share=1000 (80/8=10)
			];
			const spec = rng.pick(easySpecs);
			L = spec.L;
			W = spec.W;
			gate = 0;
			pricePerM = spec.pricePerM;
			partnersCount = spec.k;
			const P = 2 * (L + W);
			totalCost = P * pricePerM;
			sharePerPartner = totalCost / partnersCount;
			extraCost = 0;
		} else {
			// Medium & Hard: rectangular perimeter P = 2*(L+W), gate left open, fenceLen = P - gate,
			// fenceCost = fenceLen * pricePerM (multiple of 100), plus extraCost (gate/posts)
			// chosen so totalCost = (k * q) * 1000 (< 100,000) with q in [3..10] -> inverse table division!
			W = difficulty === 'medium' ? rng.int(8, 13) : rng.int(12, 17);
			L = difficulty === 'medium' ? rng.int(W + 4, W + 10) : rng.int(W + 6, W + 12);
			const P = 2 * (L + W);
			gate = rng.pick([2, 3, 4, 5] as const);
			const fenceLen = P - gate;
			pricePerM = difficulty === 'medium' ? rng.pick([200, 300] as const) : rng.pick([200, 300, 400] as const);
			const fenceCost = fenceLen * pricePerM;

			partnersCount = difficulty === 'medium' ? rng.pick([3, 4, 5, 6] as const) : rng.pick([5, 6, 7, 8, 9] as const);
			const minQ = Math.max(3, Math.ceil((fenceCost + 1000) / (partnersCount * 1000)));
			const maxQ = Math.min(10, Math.floor(90000 / (partnersCount * 1000)));
			const q = minQ <= maxQ ? rng.int(minQ, Math.min(maxQ, minQ + 2)) : maxQ;
			totalCost = partnersCount * q * 1000;
			extraCost = totalCost - fenceCost;
			sharePerPartner = totalCost / partnersCount;
		}

		const P = 2 * (L + W);
		const fenceLen = P - gate;
		const fenceCost = fenceLen * pricePerM;

		const svgStr = svgRectangle({
			lengthLabel: `${L} m`,
			widthLabel: `${W} m`,
			shapeLabel: sc.shapeLabel,
			vertices: ['A', 'B', 'C', 'D']
		});
		const svgPath = saveSvgAsset(`3ap_t3_integ_${difficulty}_s${seed}`, svgStr);

		const halfP = L + W;
		const quizIntro =
			gate === 0
				? `${sc.contextIntro}، طولها $${L}\\text{ m}$ وعرضها $${W}\\text{ m}$.\n` +
					`اشتروا السياج بسعر $${pricePerM}\\text{ DA}$ للمتر الواحد، ثم تقاسموا التكلفة الإجمالية بالتساوي على $${partnersCount}$ ${sc.partners}.`
				: `${sc.contextIntro}، طولها $${L}\\text{ m}$ وعرضها $${W}\\text{ m}$، مع ترك مدخل طوله $${gate}\\text{ m}$ دون سياج.\n` +
					`بلغ سعر المتر الواحد من السياج $${pricePerM}\\text{ DA}$، وبلغ ثمن ${sc.extraLabel} $${extraCost}\\text{ DA}$، ثم تقاسم $${partnersCount}$ ${sc.partners} التكلفة الكلية بالتساوي.`;

		const questionText =
			`${quizIntro}\n\n` +
			`1) احسب محيط ${sc.place}${gate > 0 ? ' ثم طول السياج اللازم' : ''}.\n` +
			`2) احسب التكلفة الإجمالية للتسييج بالدينار الجزائري.\n` +
			`3) **كم ديناراً يدفع كل ${sc.singlePartner}**؟`;

		const wrongHalfPerimShare = Math.max(
			100,
			Math.round(((halfP - gate) * pricePerM + extraCost) / partnersCount)
		);
		const wrongForgotGateOrExtra =
			gate > 0
				? Math.round((P * pricePerM + extraCost) / partnersCount)
				: sharePerPartner + 100;
		const wrongNoShare = totalCost;

		const dVals = pickDistinctNumbers(
			sharePerPartner,
			[
				{
					val: wrongNoShare,
					feedback: `هذا هو المبلغ الإجمالي للتكلفة ($${totalCost}\\text{ DA}$)؛ لا تنس قسمته بالتساوي على $${partnersCount}$ ${sc.partners}!`
				},
				{
					val: wrongHalfPerimShare,
					feedback: `انتبه! استعملت نصف المحيط ($${L} + ${W}$) بدل المحيط الكامل ($(${L} + ${W}) \\times 2$).`
				},
				{
					val: wrongForgotGateOrExtra,
					feedback: gate > 0
						? `نسيت طرح طول المدخل ($${gate}\\text{ m}$) من المحيط قبل حساب ثمن السياج!`
						: 'تأكد من قسمة التكلفة الإجمالية على عدد المشاركين باستعمال معكوس جدول الضرب.'
				}
			],
			10,
			99999,
			100
		);

		const mcq = buildUniqueMcqOptions(
			`$${sharePerPartner}\\text{ DA}$`,
			dVals.map((d) => ({ text: `$${d.val}\\text{ DA}$`, diagnosticFeedback: d.feedback })),
			rng
		);

		const typstIntro =
			gate === 0
				? `${sc.contextIntro}، طولها ${ltr(`${L} m`)} وعرضها ${ltr(`${W} m`)}. اشتروا السياج بسعر ${ltr(`${pricePerM} DA`)} للمتر الواحد، وتقاسموا التكلفة الإجمالية بالتساوي بين $${partnersCount}$ ${sc.partners}.`
				: `${sc.contextIntro}، طولها ${ltr(`${L} m`)} وعرضها ${ltr(`${W} m`)}، مع ترك مدخل عرضه ${ltr(`${gate} m`)} دون تسييج. سعر المتر الواحد من السياج هو ${ltr(`${pricePerM} DA`)}، وثمن ${sc.extraLabel} هو ${ltr(`${extraCost} DA`)}. تقاسم $${partnersCount}$ ${sc.partners} التكلفة الكلية بالتساوي.`;

		const sujetStep1Q =
			gate === 0
				? `1) احسب محيط ${sc.place} بالمتر (طول السياج اللازم).`
				: `1) احسب محيط ${sc.place}، ثم استنتج طول السياج اللازم بعد ترك المدخل.`;
		const sujetStep1A =
			gate === 0
				? `1) محيط المستطيل: $(${L} + ${W}) times 2 = ${halfP} times 2 = ${P}$ ${ltr('m')}.`
				: `1) المحيط: $(${L} + ${W}) times 2 = ${halfP} times 2 = ${P}$ ${ltr('m')}.\n\nطول السياج: $${P} - ${gate} = ${fenceLen}$ ${ltr('m')}.`;

		const sujetStep2Q =
			extraCost === 0
				? '2) احسب ثمن السياج (التكلفة الإجمالية) بالدينار الجزائري.'
				: `2) احسب ثمن السياج، ثم احسب التكلفة الإجمالية بعد إضافة ثمن ${sc.extraLabel}.`;
		const sujetStep2A =
			extraCost === 0
				? `2) ثمن السياج: $${fenceLen} times ${pricePerM} = ${totalCost}$ ${ltr('DA')}.`
				: `2) ثمن السياج: $${fenceLen} times ${pricePerM} = ${fenceCost}$ ${ltr('DA')}.\n\nالتكلفة الإجمالية: $${fenceCost} + ${extraCost} = ${totalCost}$ ${ltr('DA')}.`;

		const sujetStep3Q = `3) ما هو المبلغ الذي يدفعه كل ${sc.singlePartner}؟`;
		const sujetStep3A = `3) حصة كل ${sc.singlePartner}: $${totalCost} div ${partnersCount} = ${sharePerPartner}$ ${ltr('DA')}.`;

		const stepsAr: string[] = [
			gate === 0
				? `1) محيط ${sc.place}: $(${L} + ${W}) \\times 2 = ${P}\\text{ m}$.`
				: `1) المحيط = $(${L} + ${W}) \\times 2 = ${P}\\text{ m}$، وطول السياج = $${P} - ${gate} = ${fenceLen}\\text{ m}$.`,
			extraCost === 0
				? `2) ثمن السياج: $${fenceLen} \\times ${pricePerM} = ${totalCost}\\text{ DA}$.`
				: `2) ثمن السياج: $${fenceLen} \\times ${pricePerM} = ${fenceCost}\\text{ DA}$، والتكلفة الإجمالية = $${fenceCost} + ${extraCost} = ${totalCost}\\text{ DA}$.`,
			`3) حصة كل ${sc.singlePartner} بالتساوي: $${totalCost} \\div ${partnersCount} = ${sharePerPartner}\\text{ DA}$.`
		];

		return {
			templateId: this.id,
			seed,
			grade: this.grade,
			trimesterId: this.trimesterId,
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `مخطط ${sc.place}: ${L} m × ${W} m`,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: stepsAr.join(' ')
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: this.defaultPoints,
				instruction: 'اقرأ الوضعية وتأمل المخطط المرفق ثم أجب عن الأسئلة الثلاثة بكتابة العمليات والوحدة:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{ type: 'text', content: typstIntro },
							{ type: 'image', src: svgPath, caption: `مخطط ${sc.place}` }
						]
					},
					{
						type: 'text',
						content: sujetStep1Q,
						answer: sujetStep1A,
						mark: '1.5'
					},
					{
						type: 'text',
						content: sujetStep2Q,
						answer: sujetStep2A,
						mark: '1.25'
					},
					{
						type: 'text',
						content: sujetStep3Q,
						answer: sujetStep3A,
						mark: '1.25'
					}
				]
			},
			hints: [
				`ابدأ بحساب محيط المستطيل: (الطول $+$ العرض) $\\times 2 = (${L} + ${W}) \\times 2$${gate > 0 ? `، ثم اطرح عرض المدخل (${gate} m)` : ''}.`,
				`اضرب طول السياج في سعر المتر الواحد ($${pricePerM}\\text{ DA}$)${extraCost > 0 ? ` ثم أضف ثمن ${sc.extraLabel} (${extraCost} DA)` : ''}.`,
				`اقسم التكلفة الإجمالية (${totalCost} DA) بالتساوي على ${partnersCount} باستعمال معكوس جدول الضرب.`
			],
			solutionStepsAr: stepsAr,
			finalAnswer: `${sharePerPartner} DA`
		};
	}
};

export const TEMPLATES_3AP_T3: ParameterizedTemplate[] = [
	tplDivisionEqualSharing,
	tplArithmeticRelationsDoubles,
	tplTimeDurations,
	tplPerimeterSquareRectangle,
	tplSymmetryAndSolids,
	tplIntegrationFenceSharing
];
