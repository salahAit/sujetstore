import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, gcd, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgGridPoints, svgParallelAngles, svgRectangle } from '../../svg-helpers';

function formatFracKatex(num: number, den: number): string {
	return den === 1 ? `${num}` : `\\frac{${num}}{${den}}`;
}

function formatFracTypst(num: number, den: number): string {
	return den === 1 ? `${num}` : `frac(${num}, ${den})`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Order of Operations (With / Without Brackets) & Distributivity
// ═══════════════════════════════════════════════════════════════════════════════
const orderOpsDistributivityTemplate: ParameterizedTemplate = {
	id: '2am_t1_order_ops_distributivity',
	grade: '2am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'سلاسل العمليات بالأقواس ودونها وتوزيع الضرب',
	curriculumLessonId: 'lesson_2am_t1_order_of_operations_distributivity',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const a = rng.int(4, 15);
			const b = rng.int(3, 9);
			const c = rng.int(3, 9);
			const ansA = a + b * c;
			const wrongPriority = (a + b) * c;
			const wrongAdd = a + b + c;
			const wrongSwap = a * b + c === ansA ? ansA + 2 : a * b + c;

			const k = rng.int(3, 9);
			const m = rng.int(10, 25);
			const n = rng.int(2, 9);
			const ansB = k * (m + n);

			const f = rng.int(4, 14);
			const p1 = rng.int(14, 86);
			const p2 = 100 - p1;
			const ansC = f * 100;

			const mcq = buildUniqueMcqOptions(
				`$${ansA}$`,
				[
					{
						text: `$${wrongPriority}$`,
						diagnosticFeedback:
							'خطأ شائع: أنجزت الجمع قبل الضرب! في سلسلة عمليات دون أقواس، الأولوية للضرب قبل الجمع.'
					},
					{
						text: `$${wrongAdd}$`,
						diagnosticFeedback:
							'انتبه إلى علامة الضرب: العملية هي ضرب ثم جمع، وليست جمعاً للأعداد الثلاثة.'
					},
					{
						text: `$${wrongSwap}$`,
						diagnosticFeedback:
							'تحقق من موضع علامة الضرب: يجب ضرب العددين المرتبطين بها أولاً قبل الجمع.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب بتمعّن نتيجة سلسلة العمليات التالية:\n\n$$A = ${a} + ${b} \\times ${c}$$`,
					questionTextAr: `احسب بتمعّن نتيجة سلسلة العمليات التالية: $A = ${a} + ${b} \\times ${c}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الأولوية للضرب قبل الجمع: $${b} \\times ${c} = ${b * c}$، ثم نجمع: $${a} + ${b * c} = ${ansA}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'احسب العبارات التالية مع إبراز مراحل الحساب:',
					content: [
						{
							type: 'text',
							content: `1) احسب سلسلة العمليات دون أقواس: $A = ${a} + ${b} times ${c}$`,
							answer: `1) $A = ${a} + ${b * c} = ${ansA}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب بطريقتين مختلفتين باستعمال خاصية توزيع الضرب على الجمع: $B = ${k} times (${m} + ${n})$`,
							answer: `2) الطريقة 1: $B = ${k} times ${m + n} = ${ansB}$\n\nالطريقة 2 (التوزيع): $B = ${k} times ${m} + ${k} times ${n} = ${k * m} + ${k * n} = ${ansB}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حلّل ثم احسب ذهنياً: $C = ${f} times ${p1} + ${f} times ${p2}$`,
							answer: `3) $C = ${f} times (${p1} + ${p2}) = ${f} times 100 = ${ansC}$`,
							mark: '1'
						}
					]
				},
				hints: [
					'في سلسلة عمليات دون أقواس تحتوي على الجمع والضرب، نبدأ دائماً بعملية الضرب.',
					`احسب أولاً الجداء $${b} \\times ${c}$ قبل جمع العدد $${a}$.`,
					`في خاصية التوزيع، $k \\times (a + b) = k \\times a + k \\times b$، وعند التحليل نُخرج العامل المشترك $${f}$.`
				],
				solutionStepsAr: [
					`الأولوية للضرب: $${b} \\times ${c} = ${b * c}$.`,
					`نجمع الناتج مع $${a}$: $A = ${a} + ${b * c} = ${ansA}$.`,
					`توزيع الضرب: $B = ${k} \\times (${m} + ${n}) = ${k} \\times ${m} + ${k} \\times ${n} = ${ansB}$.`,
					`التحليل الذهني: $C = ${f} \\times (${p1} + ${p2}) = ${f} \\times 100 = ${ansC}$.`
				],
				finalAnswer: `${ansA}`
			};
		}

		if (difficulty === 'medium') {
			const a = rng.int(8, 20);
			const b = rng.int(3, 9);
			const c = rng.int(3, 9);
			const d = rng.int(2, Math.min(12, a + b * c - 2));
			const ansA = a + b * c - d;
			const wrongPriority = (a + b) * c - d;
			const wrongSubGroup = c > d ? a + b * (c - d) : a + b * c + d;
			const wrongNoMult = a + b + c - d;

			const u = rng.int(3, 8);
			const v = rng.int(2, 7);
			const outer = u + v + rng.int(4, 12);
			const k = rng.int(3, 8);
			const ansB = k * (outer - (u + v));

			const f = rng.int(4, 15);
			const q2 = rng.int(12, 65);
			const q1 = q2 + 100;
			const ansC = f * 100;

			const mcq = buildUniqueMcqOptions(
				`$${ansA}$`,
				[
					{
						text: `$${wrongPriority}$`,
						diagnosticFeedback:
							'خطأ شائع: حسبت $(a + b)$ قبل الضرب! الأولوية للضرب قبل الجمع والطرح.'
					},
					{
						text: `$${wrongSubGroup}$`,
						diagnosticFeedback:
							'تحقق من أولوية العمليات ومن إشارة الطرح في نهاية السلسلة.'
					},
					{
						text: `$${wrongNoMult}$`,
						diagnosticFeedback:
							'انتبه إلى وجود عملية الضرب بين الحدين الأوسطين قبل إجراء الجمع والطرح.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب بتمعّن سلسلة العمليات التالية:\n\n$$A = ${a} + ${b} \\times ${c} - ${d}$$`,
					questionTextAr: `احسب بتمعّن سلسلة العمليات التالية: $A = ${a} + ${b} \\times ${c} - ${d}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الأولوية للضرب: $${b} \\times ${c} = ${b * c}$، ثم من اليسار إلى اليمين: $${a} + ${b * c} - ${d} = ${a + b * c} - ${d} = ${ansA}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'احسب العبارات التالية موضحاً مراحل الحساب:',
					content: [
						{
							type: 'text',
							content: `1) احسب سلسلة العمليات دون أقواس: $A = ${a} + ${b} times ${c} - ${d}$`,
							answer: `1) $A = ${a} + ${b * c} - ${d} = ${a + b * c} - ${d} = ${ansA}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب سلسلة العمليات المتضمنة لأقواس متداخلة: $B = ${k} times [${outer} - (${u} + ${v})]$`,
							answer: `2) $B = ${k} times [${outer} - ${u + v}] = ${k} times ${outer - (u + v)} = ${ansB}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) استعمل خاصية توزيع الضرب على الطرح لحساب العبارة ذهنياً: $C = ${f} times ${q1} - ${f} times ${q2}$`,
							answer: `3) $C = ${f} times (${q1} - ${q2}) = ${f} times 100 = ${ansC}$`,
							mark: '1'
						}
					]
				},
				hints: [
					'تُنجز عملية الضرب أولاً، ثم الجمع والطرح من اليسار إلى اليمين.',
					'في العبارة التي تحتوي أقواساً متداخلة، نبدأ دائماً بالأقواس الداخلية.',
					`في التحليل، أخرج العامل المشترك $${f}$ ثم احسب الفرق داخل القوسين.`
				],
				solutionStepsAr: [
					`الأولوية للضرب: $${b} \\times ${c} = ${b * c}$.`,
					`نحسب من اليسار إلى اليمين: $${a} + ${b * c} = ${a + b * c}$، ثم $${a + b * c} - ${d} = ${ansA}$.`,
					`الأقواس المتداخلة: $${u} + ${v} = ${u + v}$، ثم $${outer} - ${u + v} = ${outer - (u + v)}$، وأخيراً $B = ${ansB}$.`,
					`بالتوزيع العكسي: $C = ${f} \\times (${q1} - ${q2}) = ${f} \\times 100 = ${ansC}$.`
				],
				finalAnswer: `${ansA}`
			};
		}

		// hard
		const v = rng.int(2, 6);
		const q = rng.int(2, 7);
		const u1 = rng.int(3, v * q - 2);
		const u2 = v * q - u1;
		const b = rng.int(3, 9);
		const c = rng.int(3, 9);
		const a = rng.int(q + 3, q + 14);
		const ansA = a + b * c - q;
		const wrongPriority = (a + b) * c - q;
		const wrongSign = a + b * c + q;
		const wrongNoMult = a + b + c - q;

		const m = rng.int(12, 45);
		const ansB = m * 99;

		const f = rng.int(3, 12);
		const x1 = rng.int(25, 65);
		const x2 = rng.int(15, 45);
		const x3 = x1 + x2 - 10;
		const ansC = f * 10;

		const mcq = buildUniqueMcqOptions(
			`$${ansA}$`,
			[
				{
					text: `$${wrongPriority}$`,
					diagnosticFeedback:
						'خطأ شائع: جمعت قبل إجراء الضرب! يجب حساب الجداء ونتيجة الكسر أولاً.'
				},
				{
					text: `$${wrongSign}$`,
					diagnosticFeedback:
						'انتبه لإشارة الطرح قبل خط الكسر: نطرح حاصل القسمة ولا نجمعه.'
				},
				{
					text: `$${wrongNoMult}$`,
					diagnosticFeedback:
						'تحقق من أولوية الضرب في الحد الأوسط قبل الجمع والطرح.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `احسب بتمعّن سلسلة العمليات التالية:\n\n$$A = ${a} + ${b} \\times ${c} - \\frac{${u1} + ${u2}}{${v}}$$`,
				questionTextAr: `احسب بتمعّن سلسلة العمليات التالية: $A = ${a} + ${b} \\times ${c} - \\frac{${u1} + ${u2}}{${v}}$`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `خط الكسر يقوم مقام الأقواس: $\\frac{${u1} + ${u2}}{${v}} = \\frac{${u1 + u2}}{${v}} = ${q}$، والضرب له الأولوية: $${b} \\times ${c} = ${b * c}$، إذن $A = ${a} + ${b * c} - ${q} = ${ansA}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أنجز الحسابات التالية بدقة دون استعمال الآلة الحاسبة:',
				content: [
					{
						type: 'text',
						content: `1) احسب سلسلة العمليات التالية (يمثّل خط الكسر أقواساً): $A = ${a} + ${b} times ${c} - frac(${u1} + ${u2}, ${v})$`,
						answer: `1) $A = ${a} + ${b * c} - frac(${u1 + u2}, ${v}) = ${a + b * c} - ${q} = ${ansA}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب بذكاء باستعمال خاصية التوزيع: $B = ${m} times 99$`,
						answer: `2) $B = ${m} times (100 - 1) = ${m * 100} - ${m} = ${ansB}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حلّل ثم احسب ذهنياً: $C = ${f} times ${x1} + ${f} times ${x2} - ${f} times ${x3}$`,
						answer: `3) $C = ${f} times (${x1} + ${x2} - ${x3}) = ${f} times 10 = ${ansC}$`,
						mark: '1'
					}
				]
			},
			hints: [
				'تذكّر أن خط الكسر يقوم مقام الأقواس، فنحسب البسط أولاً ثم نقسم على المقام.',
				`لحساب $${m} \\times 99$ ذهنياً، اكتب $99 = 100 - 1$ ثم وزّع الضرب على الطرح.`,
				`أخرج العامل المشترك $${f}$ في العبارة الثالثة ثم احسب ما بداخل القوسين.`
			],
			solutionStepsAr: [
				`نحسب الكسر: $\\frac{${u1} + ${u2}}{${v}} = \\frac{${u1 + u2}}{${v}} = ${q}$.`,
				`نحسب الضرب: $${b} \\times ${c} = ${b * c}$، فيكون $A = ${a} + ${b * c} - ${q} = ${ansA}$.`,
				`الحساب الذهني: $B = ${m} \\times (100 - 1) = ${m * 100} - ${m} = ${ansB}$.`,
				`التحليل: $C = ${f} \\times (${x1} + ${x2} - ${x3}) = ${f} \\times 10 = ${ansC}$.`
			],
			finalAnswer: `${ansA}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Decimal Quotient Framing (الحصر) & Fraction Comparisons
// ═══════════════════════════════════════════════════════════════════════════════
const divisionFramingCompareTemplate: ParameterizedTemplate = {
	id: '2am_t1_division_framing_compare',
	grade: '2am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'القسمة العشرية، حصر حاصل القسمة ومقارنة الكسور',
	curriculumLessonId: 'lesson_2am_t1_division_approximation_framing',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Fraction comparison pair for SujetBuilder (same or multiple denominator)
		const bComp = rng.pick([3, 4, 5, 6]);
		const kComp = rng.pick([2, 3, 4]);
		const dComp = bComp * kComp;
		const aComp = rng.int(1, bComp - 1);
		let cComp = rng.int(2, dComp - 1);
		if (cComp === aComp * kComp) {
			cComp = cComp > 2 ? cComp - 1 : cComp + 1;
		}
		const compSign = aComp * kComp > cComp ? '>' : '<';

		const bigNum = rng.int(5, 11);
		const smallDen = rng.int(2, bigNum - 1);
		const smallNum = rng.int(2, 7);
		const bigDen = smallNum + rng.int(2, 6);

		if (difficulty === 'easy') {
			const d = rng.pick([3, 6, 7, 9]);
			const q0 = rng.int(3, 14);
			const r = rng.int(1, d - 1);
			const n = d * q0 + r;
			const upper = q0 + 1;

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: `أكمل حصر حاصل القسمة $\\frac{${n}}{${d}}$ إلى الوحدة:\n\n$$${q0} < \\frac{${n}}{${d}} < ?$$`,
					questionTextAr: `أكمل حصر حاصل القسمة $\\frac{${n}}{${d}}$ إلى الوحدة: $${q0} < \\frac{${n}}{${d}} < ?$`,
					questionData: {
						sentence: `القيمة المقربة بالزيادة إلى الوحدة لحاصل قسمة ${n} على ${d} هي: ___`,
						acceptedAnswers: [`${upper}`],
						answers: [`${upper}`]
					},
					explanation: `في القسمة الإقليدية: $${n} = ${d} \\times ${q0} + ${r}$، إذن القيمة المقربة بالنقصان إلى الوحدة هي $${q0}$ وبالزيادة هي $${upper}$، والحصر هو $${q0} < \\frac{${n}}{${d}} < ${upper}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة التالية بدقة:',
					content: [
						{
							type: 'text',
							content: `1) أكتب المساواة الإقليدية لقسمة $${n}$ على $${d}$، ثم أعطِ حصراً لحاصل القسمة $frac(${n}, ${d})$ إلى الوحدة.`,
							answer: `1) $${n} = ${d} times ${q0} + ${r}$ (الحاصل $${q0}$ والباقي $${r}$)، والحصر إلى الوحدة: $${q0} < frac(${n}, ${d}) < ${upper}$`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) قارن بين الكسرين مع التعليل: أ) $frac(${bigNum}, ${smallDen})$ و $1$ ، ب) $frac(${smallNum}, ${bigDen})$ و $1$ ، جـ) $frac(${aComp}, ${bComp})$ و $frac(${cComp}, ${dComp})$`,
							answer: `2) أ) $frac(${bigNum}, ${smallDen}) > 1$ لأن البسط أكبر من المقام. ب) $frac(${smallNum}, ${bigDen}) < 1$ لأن البسط أصغر من المقام. جـ) $frac(${aComp}, ${bComp}) = frac(${aComp * kComp}, ${dComp})$ ومنه $frac(${aComp}, ${bComp}) ${compSign} frac(${cComp}, ${dComp})$`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`أنجز القسمة الإقليدية للعدد $${n}$ على $${d}$ لإيجاد الجزء الصحيح من الحاصل.`,
					`الباقي غير معدوم، إذن الحاصل يقع بين $${q0}$ والعدد الطبيعي الموالي له مباشرة.`,
					`القيمة المقربة بالزيادة إلى الوحدة تساوي القيمة المقربة بالنقصان مضافاً إليها $1$.`
				],
				solutionStepsAr: [
					`نقسم $${n}$ على $${d}$: الحاصل الطبيعي هو $${q0}$ والباقي $${r}$ (لأن $${d} \\times ${q0} = ${d * q0}$).`,
					`إذن الحصر إلى الوحدة هو: $${q0} < \\frac{${n}}{${d}} < ${upper}$.`,
					`القيمة المقربة بالزيادة إلى الوحدة هي $${upper}$.`
				],
				finalAnswer: `${upper}`
			};
		}

		if (difficulty === 'medium') {
			const d = rng.pick([3, 6, 7, 9, 11]);
			let n = rng.int(d * 2 + 1, d * 9 - 1);
			for (let tries = 0; tries < 30; tries++) {
				const k1 = Math.floor((10 * n) / d);
				if ((10 * n) % d !== 0 && k1 % 10 !== 0 && k1 % 10 !== 9) break;
				n++;
			}
			const k1 = Math.floor((10 * n) / d);
			const q0 = Math.floor(n / d);
			const lower1 = (k1 / 10).toFixed(1);
			const upper1 = ((k1 + 1) / 10).toFixed(1);
			const lower1Comma = lower1.replace('.', ',');
			const upper1Comma = upper1.replace('.', ',');

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: `أنجز القسمة العشرية للعدد $${n}$ على $${d}$ ثم أكمل الحصر إلى $0.1$:\n\n$$${lower1} < \\frac{${n}}{${d}} < ?$$`,
					questionTextAr: `أنجز القسمة العشرية للعدد $${n}$ على $${d}$ ثم أكمل الحصر إلى $0.1$: $${lower1} < \\frac{${n}}{${d}} < ?$`,
					questionData: {
						sentence: `أكتب القيمة المقربة بالزيادة إلى 0.1 لحاصل القسمة: ___`,
						acceptedAnswers: [upper1, upper1Comma],
						answers: [upper1, upper1Comma]
					},
					explanation: `عند قسمة $${n}$ على $${d}$ نجد في الجزء العشري رقم الأعشار $${k1 % 10}$، فالقيمة المقربة بالنقصان إلى $0.1$ هي $${lower1}$ وبالزيادة هي $${upper1}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة التالية:',
					content: [
						{
							type: 'text',
							content: `1) أنجز القسمة العشرية للعدد $${n}$ على $${d}$، ثم أتمم الجدول التالي لحاصل القسمة $frac(${n}, ${d})$:`,
							answer: `1) الحصر إلى الوحدة: $${q0} < frac(${n}, ${d}) < ${q0 + 1}$ ، وإلى $0.1$: $${lower1} < frac(${n}, ${d}) < ${upper1}$`,
							mark: '1.5'
						},
						{
							type: 'table',
							headers: ['الدقة', 'القيمة المقربة بالنقصان', 'القيمة المقربة بالزيادة', 'حصر حاصل القسمة'],
							cells: [],
							rows: [
								[
									'إلى الوحدة',
									{ content: '...', answer: `$${q0}$`, mark: '0.5' },
									{ content: '...', answer: `$${q0 + 1}$` },
									{ content: '...', answer: `$${q0} < frac(${n}, ${d}) < ${q0 + 1}$` }
								],
								[
									'إلى $0.1$',
									{ content: '...', answer: `$${lower1}$`, mark: '0.5' },
									{ content: '...', answer: `$${upper1}$` },
									{ content: '...', answer: `$${lower1} < frac(${n}, ${d}) < ${upper1}$` }
								]
							],
							align: 'center',
							borders: 'grid',
							headerBackground: true,
							width: 'full'
						},
						{
							type: 'text',
							content: `2) قارن بين الكسرين $frac(${aComp}, ${bComp})$ و $frac(${cComp}, ${dComp})$ ثم قارنهما بالعدد $1$.`,
							answer: `2) $frac(${aComp}, ${bComp}) = frac(${aComp * kComp}, ${dComp})$ ومنه $frac(${aComp}, ${bComp}) ${compSign} frac(${cComp}, ${dComp})$، وكلاهما أصغر من $1$.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					`أنجز القسمة العشرية لـ $${n} \\div ${d}$ وتوقف عند رقم واحد بعد الفاصلة لإيجاد القيمة بالنقصان إلى $0.1$.`,
					`القيمة المقربة بالنقصان إلى $0.1$ هي $${lower1}$.`,
					`لإيجاد القيمة المقربة بالزيادة إلى $0.1$ أضف $0.1$ إلى $${lower1}$ (يمكنك كتابة الفاصلة كنقطة أو فاصلة).`
				],
				solutionStepsAr: [
					`نجري القسمة العشرية: $${n} \\div ${d} = ${lower1}\\dots$`,
					`القيمة المقربة بالنقصان إلى $0.1$ هي $${lower1}$ (و$${lower1Comma}$).`,
					`نضيف $0.1$ فنحصل على القيمة المقربة بالزيادة: $${upper1}$.`
				],
				finalAnswer: upper1
			};
		}

		// hard: decimal divisor + framing to 0.01
		const dInt = rng.pick([3, 6, 7, 9]);
		let nInt = rng.int(dInt * 2 + 1, dInt * 8 - 1);
		for (let tries = 0; tries < 40; tries++) {
			const k2 = Math.floor((100 * nInt) / dInt);
			if (nInt % 10 !== 0 && (100 * nInt) % dInt !== 0 && k2 % 10 !== 0 && k2 % 10 !== 9) {
				break;
			}
			nInt++;
		}
		const nDec = (nInt / 10).toFixed(1);
		const dDec = (dInt / 10).toFixed(1);
		const k1 = Math.floor((10 * nInt) / dInt);
		const k2 = Math.floor((100 * nInt) / dInt);
		const lower1 = (k1 / 10).toFixed(1);
		const upper1 = ((k1 + 1) / 10).toFixed(1);
		const lower2 = (k2 / 100).toFixed(2);
		const upper2 = ((k2 + 1) / 100).toFixed(2);
		const upper2Comma = upper2.replace('.', ',');

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'fill_blank',
				questionText: `حوّل القسمة $${nDec} \\div ${dDec}$ إلى قسمة على عدد طبيعي، ثم أكمل الحصر إلى $0.01$:\n\n$$${lower2} < \\frac{${nDec}}{${dDec}} < ?$$`,
				questionTextAr: `حوّل القسمة $${nDec} \\div ${dDec}$ إلى قسمة على عدد طبيعي، ثم أكمل الحصر إلى $0.01$: $${lower2} < \\frac{${nDec}}{${dDec}} < ?$`,
				questionData: {
					sentence: `القيمة المقربة بالزيادة إلى 0.01 لحاصل القسمة هي: ___`,
					acceptedAnswers: [upper2, upper2Comma],
					answers: [upper2, upper2Comma]
				},
				explanation: `نضرب المقسوم والقاسم في $10$: $${nDec} \\div ${dDec} = ${nInt} \\div ${dInt}$، ثم نجد في الجزء من مئة القيمة بالنقصان $${lower2}$ وبالزيادة $${upper2}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن التعليمات التالية بدقة:',
				content: [
					{
						type: 'text',
						content: `1) حوّل القسمة العشرية $frac(${nDec}, ${dDec})$ إلى قسمة قاسمها عدد طبيعي، ثم أنجزها إلى رقمين بعد الفاصلة.`,
						answer: `1) $frac(${nDec}, ${dDec}) = frac(${nDec} times 10, ${dDec} times 10) = frac(${nInt}, ${dInt}) approx ${lower2}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) أعطِ حصراً لحاصل القسمة $frac(${nDec}, ${dDec})$ إلى $0.1$ وإلى $0.01$.`,
						answer: `2) الحصر إلى $0.1$: $${lower1} < frac(${nDec}, ${dDec}) < ${upper1}$ ، وإلى $0.01$: $${lower2} < frac(${nDec}, ${dDec}) < ${upper2}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) رتّب تصاعدياً الأعداد الكسرية التالية: $frac(${aComp}, ${bComp})$ ، $frac(${cComp}, ${dComp})$ ، $frac(${bigNum}, ${smallDen})$`,
						answer: `3) الترتيب التصاعدي: $${aComp * kComp < cComp ? `frac(${aComp}, ${bComp}) < frac(${cComp}, ${dComp})` : `frac(${cComp}, ${dComp}) < frac(${aComp}, ${bComp})`} < 1 < frac(${bigNum}, ${smallDen})$`,
						mark: '1'
					}
				]
			},
			hints: [
				`للتخلص من الفاصلة في القاسم $${dDec}$، اضرب كلا من المقسوم والقاسم في $10$.`,
				`القيمة المقربة بالنقصان إلى $0.01$ لقسمة $${nInt} \\div ${dInt}$ هي $${lower2}$.`,
				`أضف $0.01$ إلى القيمة المقربة بالنقصان للحصول على القيمة المقربة بالزيادة.`
			],
			solutionStepsAr: [
				`نضرب البسط والمقام في $10$: $\\frac{${nDec}}{${dDec}} = \\frac{${nInt}}{${dInt}}$.`,
				`نجري القسمة حتى رقمين بعد الفاصلة فنجد $${lower2}\\dots$`,
				`الحصر إلى $0.01$: $${lower2} < \\frac{${nDec}}{${dDec}} < ${upper2}$، فالقيمة بالزيادة هي $${upper2}$.`
			],
			finalAnswer: upper2
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fraction Operations (Multiple Denominators, Multiply, Simplify; NO division)
// ═══════════════════════════════════════════════════════════════════════════════
const fractionsOperationsTemplate: ParameterizedTemplate = {
	id: '2am_t1_fractions_operations',
	grade: '2am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'العمليات على الكسور والاختزال',
	curriculumLessonId: 'lesson_2am_t1_fractions_operations',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Helper to build a valid addition where one denominator is a multiple of the other
		const pickAddPair = (kChoices: number[]) => {
			const b = rng.pick([2, 3, 4, 5, 6, 7]);
			const k = rng.pick(kChoices);
			const d = b * k;
			let a = rng.int(1, b - 1);
			while (gcd(a, b) !== 1 && a > 1) a--;
			let c = rng.int(1, d - 1);
			if (c % k === 0) c = c > 1 ? c - 1 : c + 1;
			let [p, q] = simplifyFraction(a * k + c, d);
			if (q === 1) {
				c = c + 1 < d ? c + 1 : c - 1;
				if (c % k === 0) c = c + 1 < d ? c + 1 : c - 1;
				[p, q] = simplifyFraction(a * k + c, d);
			}
			return { a, b, k, c, d, p, q };
		};

		// Helper to build a valid positive subtraction where one denominator is a multiple of the other
		const pickSubPair = (kChoices: number[]) => {
			const b = rng.pick([3, 4, 5, 6]);
			const k = rng.pick(kChoices);
			const d = b * k;
			const a = rng.int(2, b + 1);
			let c = rng.int(1, a - 1); // guarantees a > c AND a*k > c
			if (c % k === 0 && c > 1) c--;
			let [p, q] = simplifyFraction(a * k - c, d);
			if (q === 1) {
				c = c + 1 < a ? c + 1 : 1;
				[p, q] = simplifyFraction(a * k - c, d);
			}
			return { a, b, k, c, d, p, q };
		};

		// Multiplication pair with common factor to practice simplification
		const pickMulPair = () => {
			const factor = rng.pick([2, 3, 4, 5]);
			const m1 = rng.int(1, 5) * factor;
			const n1 = rng.pick([2, 3, 4, 5, 7]);
			const m2 = rng.int(1, 5);
			const n2 = factor * rng.pick([2, 3]);
			const [mp, mq] = simplifyFraction(m1 * m2, n1 * n2);
			return { m1, n1, m2, n2, mp, mq };
		};

		const mul = pickMulPair();

		if (difficulty === 'easy') {
			const add = pickAddPair([2, 3]);
			const sub = pickSubPair([2]);
			const ansKatex = `$${formatFracKatex(add.p, add.q)}$`;

			const mcq = buildUniqueMcqOptions(
				ansKatex,
				[
					{
						text: `$${formatFracKatex(add.a + add.c, add.b + add.d)}$`,
						diagnosticFeedback:
							'خطأ شائع: قمت بجمع البسطين معاً والمقامين معاً! عند جمع كسرين يجب توحيد المقامين أولاً ثم جمع البسطين فقط.'
					},
					{
						text: `$${formatFracKatex(add.a + add.c, add.d)}$`,
						diagnosticFeedback: `تذكّر: عند ضرب المقام $${add.b}$ في $${add.k}$ لتوحيد المقامات، يجب ضرب البسط $${add.a}$ في $${add.k}$ أيضاً!`
					},
					{
						text: `$${formatFracKatex(add.a * add.k + add.c, add.b)}$`,
						diagnosticFeedback: `انتبه إلى المقام الموحد: المقام المشترك هو المضاعف $${add.d}$ وليس $${add.b}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب ثم اختزل المجموع التالي إلى أبسط شكل ممكن:\n\n$$A = \\frac{${add.a}}{${add.b}} + \\frac{${add.c}}{${add.d}}$$`,
					questionTextAr: `احسب ثم اختزل المجموع التالي إلى أبسط شكل ممكن: $A = \\frac{${add.a}}{${add.b}} + \\frac{${add.c}}{${add.d}}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `المقام $${add.d}$ مضاعف لـ $${add.b}$ لأن $${add.b} \\times ${add.k} = ${add.d}$. نوحد المقام: $\\frac{${add.a} \\times ${add.k}}{${add.b} \\times ${add.k}} + \\frac{${add.c}}{${add.d}} = \\frac{${add.a * add.k + add.c}}{${add.d}} = ${formatFracKatex(add.p, add.q)}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'احسب العبارات الكسرية التالية، ثم اختزل الناتج إلى أبسط شكل ممكن:',
					content: [
						{
							type: 'text',
							content: `1) $A = ${formatFracTypst(add.a, add.b)} + ${formatFracTypst(add.c, add.d)}$`,
							answer: `1) $A = frac(${add.a} times ${add.k}, ${add.b} times ${add.k}) + ${formatFracTypst(add.c, add.d)} = ${formatFracTypst(add.a * add.k + add.c, add.d)} = ${formatFracTypst(add.p, add.q)}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) $B = ${formatFracTypst(sub.a, sub.b)} - ${formatFracTypst(sub.c, sub.d)}$`,
							answer: `2) $B = frac(${sub.a} times ${sub.k}, ${sub.b} times ${sub.k}) - ${formatFracTypst(sub.c, sub.d)} = ${formatFracTypst(sub.a * sub.k - sub.c, sub.d)} = ${formatFracTypst(sub.p, sub.q)}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) $C = ${formatFracTypst(mul.m1, mul.n1)} times ${formatFracTypst(mul.m2, mul.n2)}$`,
							answer: `3) $C = frac(${mul.m1} times ${mul.m2}, ${mul.n1} times ${mul.n2}) = ${formatFracTypst(mul.m1 * mul.m2, mul.n1 * mul.n2)} = ${formatFracTypst(mul.mp, mul.mq)}$`,
							mark: '1'
						}
					]
				},
				hints: [
					`لاحظ أن المقام $${add.d}$ هو مضاعف للمقام $${add.b}$ ($${add.b} \\times ${add.k} = ${add.d}$).`,
					`اضرب بسط الكسر الأول ومقامه في $${add.k}$، ثم اجمع البسطين مع الاحتفاظ بالمقام $${add.d}$.`,
					'تحقق مما إذا كان البسط والمقام يقبلان الاختزال على قاسم مشترك.'
				],
				solutionStepsAr: [
					`نوحد المقامين: $\\frac{${add.a}}{${add.b}} = \\frac{${add.a * add.k}}{${add.d}}$.`,
					`نجمع البسطين فقط: $\\frac{${add.a * add.k}}{${add.d}} + \\frac{${add.c}}{${add.d}} = \\frac{${add.a * add.k + add.c}}{${add.d}}$.`,
					`نختزل الكسر الناتج فنحصل على $${formatFracKatex(add.p, add.q)}$.`
				],
				finalAnswer: `${add.p}/${add.q}`
			};
		}

		if (difficulty === 'medium') {
			const add = pickAddPair([3, 4, 5]);
			const sub = pickSubPair([3, 4]);
			const ansKatex = `$${formatFracKatex(add.p, add.q)}$`;

			const mcq = buildUniqueMcqOptions(
				ansKatex,
				[
					{
						text: `$${formatFracKatex(add.a + add.c, add.b + add.d)}$`,
						diagnosticFeedback:
							'خطأ شائع: جمعت البسط مع البسط والمقام مع المقام! المقامات لا تُجمع بل تُوحَّد أولاً.'
					},
					{
						text: `$${formatFracKatex(add.a + add.c, add.d)}$`,
						diagnosticFeedback: `نسيت ضرب البسط $${add.a}$ في $${add.k}$ عند توحيد المقامات إلى $${add.d}$.`
					},
					{
						text: `$${formatFracKatex(add.a * add.c, add.b * add.d)}$`,
						diagnosticFeedback:
							'العملية هي جمع كسرين وليست ضرب كسرين! في الجمع نوحد المقامات ثم نجمع البسطين.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `احسب ثم اكتب الناتج على شكل كسر مختزل:\n\n$$A = \\frac{${add.a}}{${add.b}} + \\frac{${add.c}}{${add.d}}$$`,
					questionTextAr: `احسب ثم اكتب الناتج على شكل كسر مختزل: $A = \\frac{${add.a}}{${add.b}} + \\frac{${add.c}}{${add.d}}$`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نوحد المقامين بضرب بسط ومقام $\\frac{${add.a}}{${add.b}}$ في $${add.k}$: $\\frac{${add.a * add.k}}{${add.d}} + \\frac{${add.c}}{${add.d}} = \\frac{${add.a * add.k + add.c}}{${add.d}} = ${formatFracKatex(add.p, add.q)}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'احسب العبارات الكسرية التالية مع الاختزال إن أمكن:',
					content: [
						{
							type: 'text',
							content: `1) $A = ${formatFracTypst(add.a, add.b)} + ${formatFracTypst(add.c, add.d)}$`,
							answer: `1) $A = frac(${add.a * add.k}, ${add.d}) + ${formatFracTypst(add.c, add.d)} = ${formatFracTypst(add.a * add.k + add.c, add.d)} = ${formatFracTypst(add.p, add.q)}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) $B = ${formatFracTypst(sub.a, sub.b)} - ${formatFracTypst(sub.c, sub.d)}$`,
							answer: `2) $B = frac(${sub.a * sub.k}, ${sub.d}) - ${formatFracTypst(sub.c, sub.d)} = ${formatFracTypst(sub.a * sub.k - sub.c, sub.d)} = ${formatFracTypst(sub.p, sub.q)}$`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) $C = ${formatFracTypst(mul.m1, mul.n1)} times ${formatFracTypst(mul.m2, mul.n2)}$`,
							answer: `3) $C = frac(${mul.m1} times ${mul.m2}, ${mul.n1} times ${mul.n2}) = ${formatFracTypst(mul.m1 * mul.m2, mul.n1 * mul.n2)} = ${formatFracTypst(mul.mp, mul.mq)}$`,
							mark: '1'
						}
					]
				},
				hints: [
					`أوجد العامل الذي يربط بين المقامين: $${add.d} = ${add.b} \\times ${add.k}$.`,
					`بعد التوحيد، يصبح البسط $${add.a * add.k} + ${add.c} = ${add.a * add.k + add.c}$ والمقام $${add.d}$.`,
					'اختزل الكسر الناتج بقسمة البسط والمقام على نفس العدد الطبيعي إن وُجد.'
				],
				solutionStepsAr: [
					`نوحد المقامات: $\\frac{${add.a}}{${add.b}} = \\frac{${add.a * add.k}}{${add.d}}$.`,
					`نجمع البسطين مع الاحتفاظ بالمقام: $\\frac{${add.a * add.k + add.c}}{${add.d}}$.`,
					`نختزل الكسر فنحصل على $${formatFracKatex(add.p, add.q)}$.`
				],
				finalAnswer: `${add.p}/${add.q}`
			};
		}

		// hard: subtraction with multiple denominators + 3-term fraction chain in sujetExercise
		const sub = pickSubPair([3, 4, 5]);
		const add = pickAddPair([2, 4]);
		const ansKatex = `$${formatFracKatex(sub.p, sub.q)}$`;

		// Build a 3-term chain A_chain = 1/d1 + (n2/d2) * (n3/d3) where product simplifies to denominator d1*2
		const bChain = rng.pick([3, 4, 5]);
		const prodNum = 1;
		const prodDen = bChain * 2;
		const aChain = rng.int(1, bChain - 1);
		const [chainP, chainQ] = simplifyFraction(aChain * 2 + prodNum, prodDen);

		const mcq = buildUniqueMcqOptions(
			ansKatex,
			[
				{
					text: `$${formatFracKatex(sub.a - sub.c, sub.d - sub.b)}$`,
					diagnosticFeedback:
						'خطأ شائع: طرحت البسط من البسط والمقام من المقام! في الطرح نوحد المقامات أولاً ثم نطرح البسطين فقط.'
				},
				{
					text: `$${formatFracKatex(sub.a - sub.c, sub.d)}$`,
					diagnosticFeedback: `نسيت ضرب البسط $${sub.a}$ في $${sub.k}$ عند توحيد المقامين إلى $${sub.d}$.`
				},
				{
					text: `$${formatFracKatex(sub.a * sub.k + sub.c, sub.d)}$`,
					diagnosticFeedback:
						'انتبه لإشارة العملية: العملية المطلوبة هي طرح الكسرين وليست جمعهما.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `احسب الفرق التالي واكتب الناتج في أبسط شكل ممكن:\n\n$$B = \\frac{${sub.a}}{${sub.b}} - \\frac{${sub.c}}{${sub.d}}$$`,
				questionTextAr: `احسب الفرق التالي واكتب الناتج في أبسط شكل ممكن: $B = \\frac{${sub.a}}{${sub.b}} - \\frac{${sub.c}}{${sub.d}}$`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نوحد المقامين: $\\frac{${sub.a} \\times ${sub.k}}{${sub.b} \\times ${sub.k}} - \\frac{${sub.c}}{${sub.d}} = \\frac{${sub.a * sub.k} - ${sub.c}}{${sub.d}} = \\frac{${sub.a * sub.k - sub.c}}{${sub.d}} = ${formatFracKatex(sub.p, sub.q)}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'احسب العبارات التالية باحترام أولويات العمليات ثم اختزل النتائج:',
				content: [
					{
						type: 'text',
						content: `1) $A = ${formatFracTypst(add.a, add.b)} + ${formatFracTypst(add.c, add.d)}$`,
						answer: `1) $A = ${formatFracTypst(add.a * add.k + add.c, add.d)} = ${formatFracTypst(add.p, add.q)}$`,
						mark: '0.75'
					},
					{
						type: 'text',
						content: `2) $B = ${formatFracTypst(sub.a, sub.b)} - ${formatFracTypst(sub.c, sub.d)}$`,
						answer: `2) $B = ${formatFracTypst(sub.a * sub.k - sub.c, sub.d)} = ${formatFracTypst(sub.p, sub.q)}$`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) $C = ${formatFracTypst(aChain, bChain)} + ${formatFracTypst(1, bChain)} times ${formatFracTypst(1, 2)}$`,
						answer: `3) الأولوية للضرب: $C = ${formatFracTypst(aChain, bChain)} + ${formatFracTypst(1, prodDen)} = ${formatFracTypst(aChain * 2 + 1, prodDen)} = ${formatFracTypst(chainP, chainQ)}$`,
						mark: '1.25'
					}
				]
			},
			hints: [
				`المقام $${sub.d}$ مضاعف للمقام $${sub.b}$ لأن $${sub.b} \\times ${sub.k} = ${sub.d}$.`,
				`اضرب بسط الكسر الأول ومقامه في $${sub.k}$ فتتحصل على $\\frac{${sub.a * sub.k}}{${sub.d}}$.`,
				'اطرح البسطين فقط واحتفظ بالمقام الموحد ثم اختزل الكسر الناتج.'
			],
			solutionStepsAr: [
				`نوحد المقامين: $\\frac{${sub.a}}{${sub.b}} = \\frac{${sub.a * sub.k}}{${sub.d}}$.`,
				`نطرح البسطين: $\\frac{${sub.a * sub.k} - ${sub.c}}{${sub.d}} = \\frac{${sub.a * sub.k - sub.c}}{${sub.d}}$.`,
				`نختزل الناتج فنحصل على $${formatFracKatex(sub.p, sub.q)}$.`
			],
			finalAnswer: `${sub.p}/${sub.q}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Central Symmetry (التناظر المركزي) Properties & Symmetric Images on Grid
// ═══════════════════════════════════════════════════════════════════════════════
const centralSymmetryTemplate: ParameterizedTemplate = {
	id: '2am_t1_central_symmetry',
	grade: '2am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'التناظر المركزي وخواصه على المرصوفة',
	curriculumLessonId: 'lesson_2am_t1_central_symmetry',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const cols = 8;
		const rows = 6;
		const cO = 4;
		const rO = 3;
		const dx = rng.int(2, 3);
		const dy = rng.int(1, 2);

		const pA = { col: cO - dx, row: rO - dy };
		const pTrue = { col: cO + dx, row: rO + dy }; // Central symmetry
		const pVert = { col: cO + dx, row: rO - dy }; // Axial vertical across O
		const pHoriz = { col: cO - dx, row: rO + dy }; // Axial horizontal across O
		const pDist = { col: cO + dx - 1, row: rO + dy }; // Wrong horizontal step

		const segLen = rng.int(4, 9);
		const angleDeg = rng.pick([40, 50, 55, 65, 70, 75]);

		if (difficulty === 'medium') {
			// true_false with svgGridPoints
			const isTrue = rng.int(0, 1) === 1;
			const fakePt = rng.pick([pVert, pHoriz, pDist]);
			const pM = isTrue ? pTrue : fakePt;

			const svg = svgGridPoints({
				cols,
				rows,
				points: [
					{ col: pA.col, row: pA.row, label: 'A', color: '#2563eb' },
					{ col: cO, row: rO, label: 'O', color: '#dc2626' },
					{ col: pM.col, row: pM.row, label: 'M', color: '#16a34a' }
				]
			});
			const imageUrl = saveSvgAsset(`2am_t1_central_sym_${difficulty}_${seed}`, svg);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'true_false',
					questionText: `تأمّل المرصوفة المقابلة ثم أجب بصحيح أو خطأ:\n\nالنقطة $M$ هي نظيرة النقطة $A$ بالتناظر المركزي الذي مركزه $O$.`,
					questionTextAr: `تأمّل المرصوفة المقابلة: النقطة $M$ هي نظيرة النقطة $A$ بالنسبة إلى المركز $O$.`,
					imageUrl,
					imageCaption: 'مرصوفة التناظر المركزي بالنسبة إلى النقطة O',
					questionData: {
						correctAnswer: isTrue
					},
					explanation: isTrue
						? `صحيح: من $A$ إلى $O$ نتجه بمقدار $${dx}$ وحدات يميناً و$${dy}$ وحدات للأسفل، ومن $O$ إلى $M$ نتجه بنفس الإزاحة ($${dx}$ يميناً و$${dy}$ للأسفل)، فالنقطة $O$ هي منتصف القطعة $[AM]$.`
						: `خطأ: في التناظر المركزي تكون $O$ منتصف القطعة $[AM]$ (نفس الإزاحة من $A$ إلى $O$ ومن $O$ إلى $M$: $${dx}$ يميناً و$${dy}$ للأسفل)، وهذا لا يتحقق بالنسبة للنقطة $M$ المعروضة.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'لاحظ المرصوفة المقابلة ثم أجب عن الأسئلة مع التبرير:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `لتكن النقطة $A$ والنقطة $O$ معلمتين على المرصوفة، ونريد إنشاء $A'$ نظيرة $A$ بالنسبة إلى $O$، والنقطة $B$ بحيث $A B = ${segLen}$ سم والزاوية $hat(A B C) = ${angleDeg}°$ حيث $B'$ و $C'$ نظيرتا $B$ و $C$ بالنسبة إلى $O$.\n\n1) حدّد موضع النقطة $A'$ نظيرة $A$ بالنسبة إلى $O$ على المرصوفة، وبيّن علاقة $O$ بالقطعة $[A A']$.\n\n2) ما هو طول القطعة $[A' B']$ وما قيس الزاوية $hat(A' B' C')$؟ علّل إجابتك.\n\n3) ما هي الوضعية النسبية للمستقيمين $(A B)$ و $(A' B')$؟`,
									answer: `1) للانتقال من $A$ إلى $O$ نتقدم بـ $${dx}$ مربعات يميناً و $${dy}$ للأسفل، ونكرر نفس الانتقال من $O$ فنجد $A'$ في الموقع المحدد، وتكون $O$ منتصف $[A A']$.\n\n2) $A' B' = A B = ${segLen}$ سم و $hat(A' B' C') = hat(A B C) = ${angleDeg}°$ لأن التناظر المركزي يحفظ الأطوال وأقياس الزوايا.\n\n3) المستقيمان $(A B)$ و $(A' B')$ متوازيان لأن التناظر المركزي يحفظ التوازي (نظير مستقيم هو مستقيم يوازيه).`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'الشكل المرافق'
								}
							]
						}
					]
				},
				hints: [
					'تكون $M$ نظيرة $A$ بالنسبة إلى $O$ إذا وفقط إذا كانت $O$ منتصف القطعة $[AM]$.',
					`احسب عدد التربيعات أفقياً ($${dx}$) وعمودياً ($${dy}$) للانتقال من $A$ إلى $O$.`,
					'تحقق مما إذا كان الانتقال نفسه من $O$ يوصلك تماماً إلى النقطة $M$ على خط مستقيم واحد.'
				],
				solutionStepsAr: [
					`من $A$ إلى $O$: نتجه أفقياً بـ $${dx}$ نحو اليمين وعمودياً بـ $${dy}$ نحو الأسفل.`,
					`إذن النظيرة الصحيحة لـ $A$ بالنسبة إلى $O$ تقع على بُعد $${dx}$ يميناً و$${dy}$ للأسفل من $O$.`,
					isTrue
						? 'النقطة $M$ تقع في هذا الموضع تماماً، فالجملة صحيحة.'
						: 'النقطة $M$ لا تقع في هذا الموضع (إما تناظر محوري أو إزاحة خاطئة)، فالجملة خاطئة.'
				],
				finalAnswer: isTrue ? 'صحيح' : 'خطأ'
			};
		}

		// easy & hard: mcq with 4 candidate points on the grid (and polygon on hard)
		const labels = rng.shuffle(['M', 'N', 'P', 'K']);
		const correctLabel = labels[0];
		const vertLabel = labels[1];
		const horizLabel = labels[2];
		const distLabel = labels[3];

		const polygon =
			difficulty === 'hard'
				? [
						{ col: pA.col, row: pA.row },
						{ col: cO - 1, row: pA.row },
						{ col: pA.col, row: rO }
					]
				: undefined;

		const svg = svgGridPoints({
			cols,
			rows,
			polygon,
			points: [
				{ col: pA.col, row: pA.row, label: 'A', color: '#2563eb' },
				{ col: cO, row: rO, label: 'O', color: '#dc2626' },
				{ col: pTrue.col, row: pTrue.row, label: correctLabel, color: '#0f172a' },
				{ col: pVert.col, row: pVert.row, label: vertLabel, color: '#0f172a' },
				{ col: pHoriz.col, row: pHoriz.row, label: horizLabel, color: '#0f172a' },
				{ col: pDist.col, row: pDist.row, label: distLabel, color: '#0f172a' }
			]
		});
		const imageUrl = saveSvgAsset(`2am_t1_central_sym_${difficulty}_${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`النقطة $${correctLabel}$`,
			[
				{
					text: `النقطة $${vertLabel}$`,
					diagnosticFeedback:
						'انتبه: هذه النقطة ناتجة عن تناظر محوري بالنسبة للمستقيم العمودي المار من $O$، وليس تناظراً مركزياً حول $O$!'
				},
				{
					text: `النقطة $${horizLabel}$`,
					diagnosticFeedback:
						'انتبه: هذه النقطة ناتجة عن تناظر محوري بالنسبة للمستقيم الأفقي المار من $O$، وليست على استقامية واحدة مع $A$ و $O$.'
				},
				{
					text: `النقطة $${distLabel}$`,
					diagnosticFeedback:
						'خطأ في المسافة: في التناظر المركزي يجب أن تكون $O$ منتصف القطعة أي $OA = OA\'$ تماماً.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تأمّل المرصوفة المقابلة. أيّ نقطة هي نظيرة النقطة $A$ بالتناظر المركزي الذي مركزه $O$؟`,
				questionTextAr: `تأمّل المرصوفة المقابلة. أيّ نقطة هي نظيرة النقطة $A$ بالتناظر المركزي الذي مركزه $O$؟`,
				imageUrl,
				imageCaption: 'اختر نظيرة النقطة A بالنسبة إلى المركز O',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `النقطة $O$ يجب أن تكون منتصف القطعة التي طرفاها $A$ ونظيرتها. بالانتقال من $A$ إلى $O$ ($${dx}$ يميناً و$${dy}$ للأسفل) وتكرار نفس الانتقال من $O$ نصل إلى النقطة $${correctLabel}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'اعتماداً على المرصوفة المقابلة، أجب عن الأسئلة التالية:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content:
									difficulty === 'hard'
										? `على المرصوفة المقابلة، نعتبر المثلث القائم الذي أحد رؤوسه $A$ ومركز التناظر $O$، علماً أن طول الضلع $[A B] = ${segLen}$ سم وقيس الزاوية عند $A$ هو $90°$ وقيس زاوية أخرى فيه هو $${angleDeg}°$.\n\n1) عيّن من بين النقط المعروضة نظيرة النقطة $A$ بالنسبة إلى $O$ مع التبرير.\n\n2) ما طول الضلع النظير $[A' B']$ وما قيس الزاوية النظيرة للزاوية $${angleDeg}°$؟ برّر جوابك.\n\n3) هل المستقيم النظير للمستقيم $(A B)$ يوازيه أم يقطعه؟ علّل.`
										: `على المرصوفة المقابلة معلم عليها النقطة $A$ ومركز التناظر $O$ وأربع نقط أخرى.\n\n1) ما هي النقطة التي تمثّل نظيرة $A$ بالنسبة إلى $O$؟ علّل إجابتك باستعمال مفهوم المنتصف.\n\n2) لتكن $B'$ نظيرة نقطة $B$ بالنسبة إلى $O$ حيث $A B = ${segLen}$ سم. استنتج طول القطعة $[A' B']$.\n\n3) إذا كانت الزاوية $hat(B A C) = ${angleDeg}°$، فما قيس نظيرتها $hat(B' A' C')$؟ وما وضع المستقيمين $(A B)$ و $(A' B')$؟`,
								answer: `1) نظيرة $A$ بالنسبة إلى $O$ هي النقطة $${correctLabel}$ لأن $O$ منتصف القطعة $[A ${correctLabel}]$ (نفس الإزاحة أفقياً $${dx}$ وعمودياً $${dy}$).\n\n2) $A' B' = A B = ${segLen}$ سم، وقيس الزاوية النظيرة هو $${angleDeg}°$ لأن التناظر المركزي يحفظ الأطوال وأقياس الزوايا.\n\n3) المستقيمان $(A B)$ و $(A' B')$ متوازيان لأن نظير مستقيم بالتناظر المركزي هو مستقيم يوازيه.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مرصوفة التناظر المركزي'
							}
						]
					}
				]
			},
			hints: [
				'في التناظر المركزي حول $O$، تدور النقطة $A$ بنصف دورة ($180^\\circ$) حول $O$.',
				`انتقل من $A$ إلى $O$: تحرّك $${dx}$ وحدات يميناً و$${dy}$ وحدات للأسفل.`,
				'كرّر نفس التحرّك انطلاقاً من $O$ للوصول إلى النظيرة.'
			],
			solutionStepsAr: [
				`الانتقال من $A$ إلى $O$ هو $${dx}$ نحو اليمين و$${dy}$ نحو الأسفل.`,
				`نكرّر نفس الانتقال انطلاقاً من $O$ فنصل إلى النقطة $${correctLabel}$.`,
				`بخواص التناظر المركزي: يحفظ الاستقامية والأطوال وأقياس الزوايا والتوازي.`
			],
			finalAnswer: correctLabel
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Angles & Parallel Lines Cut by a Transversal
// ═══════════════════════════════════════════════════════════════════════════════
const anglesParallelismTemplate: ParameterizedTemplate = {
	id: '2am_t1_angles_parallelism',
	grade: '2am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'الزوايا والمستقيمان المتوازيان والقاطع',
	curriculumLessonId: 'lesson_2am_t1_angles_and_parallelism',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		let alpha = rng.int(34, 74);
		while (alpha === 45 || alpha === 60) {
			alpha = rng.int(34, 74);
		}
		const beta = 180 - alpha;
		const comp = 90 - alpha;

		const topGiven = difficulty !== 'hard';
		const svg = svgParallelAngles({
			angleTopLabel: topGiven ? `${alpha}°` : '?',
			angleBottomLabel: topGiven ? '?' : `${beta}°`,
			lineNames: ['(d)', "(d')"]
		});
		const imageUrl = saveSvgAsset(`2am_t1_angles_par_${difficulty}_${seed}`, svg);

		if (difficulty === 'easy') {
			const mcq = buildUniqueMcqOptions(
				`$${beta}^\\circ$`,
				[
					{
						text: `$${alpha}^\\circ$`,
						diagnosticFeedback:
							'انتبه: الزاويتان المحدّدتان تقعان في نفس الجهة داخل المستقيمين المتوازيين، إحداهما حادة والأخرى منفرجة، فهما متكاملتان وليستا متقايستين!'
					},
					{
						text: `$${comp}^\\circ$`,
						diagnosticFeedback:
							'خلطت بين الزاويتين المتكاملتين (مجموعهما $180^\\circ$) والزاويتين المتتامتين (مجموعهما $90^\\circ$)!'
					},
					{
						text: `$${90 + alpha}^\\circ$`,
						diagnosticFeedback:
							'تحقق من الحساب: مجموع الزاويتين المتكاملتين يساوي $180^\\circ$، إذن نطرح من $180^\\circ$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان يقطعهما قاطع. إذا كان قيس الزاوية العلوية المحدّدة هو $${alpha}^\\circ$، فما قيس الزاوية السفلية المشار إليها بـ ($?$)؟`,
					questionTextAr: `في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان. ما قيس الزاوية المشار إليها بـ ($?$) إذا كانت الزاوية المعطاة تقيس $${alpha}^\\circ$؟`,
					imageUrl,
					imageCaption: "المستقيمان (d) و (d') متوازيان",
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `بما أن $(d)$ و $(d')$ متوازيان، فإن الزاوية المتبادلة داخلياً (أو المتماثلة) مع الزاوية $${alpha}^\\circ$ تقيس $${alpha}^\\circ$، والزاوية المطلوبة متكاملة معها، إذن: $180^\\circ - ${alpha}^\\circ = ${beta}^\\circ$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: "في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان ويقطعهما قاطع:",
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب قيس الزاوية المشار إليها بـ ($?$) مع التعليل.\n\n2) ما هو قيس كلّ من: الزاوية المتقابلة بالرأس مع الزاوية $${alpha}°$، والزاوية المتبادلة داخلياً معها، والزاوية المتماثلة معها؟\n\n3) احسب قيس الزاوية المتمّمة للزاوية التي قيسها $${alpha}°$.`,
									answer: `1) بما أن $(d)$ و $(d')$ متوازيان، فالزاوية المتماثلة مع الزاوية $${alpha}°$ تقيس $${alpha}°$، وتكملها الزاوية المطلوبة، إذن: $180° - ${alpha}° = ${beta}°$.\n\n2) تقايس كلّ من المتقابلة بالرأس والمتبادلة داخلياً والمتماثلة معها، أي قيس كل منها $${alpha}°$.\n\n3) الزاويتان المتتامتان مجموع قيسيهما $90°$، إذن قيس المتممة هو $90° - ${alpha}° = ${comp}°$.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: "المستقيمان (d) و (d') متوازيان"
								}
							]
						}
					]
				},
				hints: [
					'تذكّر أن الزاوية المتماثلة مع الزاوية الحادة (تحت $(d\')$ يميناً) تقيس أيضاً $' + alpha + '^\\circ$.',
					'الزاوية المطلوبة ($?$) والزاوية التي تقع تحتها متجاورتان على مستقيم واحد، فهما متكاملتان.',
					`مجموع الزاويتين المتكاملتين يساوي $180^\\circ$، إذن اطرح $${alpha}^\\circ$ من $180^\\circ$.`
				],
				solutionStepsAr: [
					`بما أن $(d)$ و $(d')$ متوازيان، فالزاوية المتماثلة مع $${alpha}^\\circ$ تقيس $${alpha}^\\circ$.`,
					`الزاوية المطلوبة متكاملة معها لأن مجموعهما يشكل زاوية مستقيمة $180^\\circ$.`,
					`إذن قيس الزاوية المطلوبة هو $180^\\circ - ${alpha}^\\circ = ${beta}^\\circ$.`
				],
				finalAnswer: `${beta}°`
			};
		}

		if (difficulty === 'medium') {
			// Test relationship & complementary / alternate-interior reasoning
			const askComplementary = seed % 2 === 0;
			if (askComplementary) {
				const mcq = buildUniqueMcqOptions(
					`$${comp}^\\circ$`,
					[
						{
							text: `$${beta}^\\circ$`,
							diagnosticFeedback:
								'انتبه: $180^\\circ - \\alpha$ هو قيس الزاوية المكملة (متكاملتان)، أما المطلوب فهو الزاوية المتممة (متتامتان مجموعهما $90^\\circ$)!'
						},
						{
							text: `$${alpha}^\\circ$`,
							diagnosticFeedback:
								'القيس المعطى يساوي قيس الزوايا المتقابلة بالرأس أو المتبادلة داخلياً، وليس المتممة.'
						},
						{
							text: `$${180 - 2 * alpha}^\\circ$`,
							diagnosticFeedback: 'تحقق من القاعدة: زاويتان متتامتان يعني مجموع قيسيهما يساوي $90^\\circ$.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2am',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'mcq',
						questionText: `في الشكل المقابل $(d)$ و $(d')$ متوازيان. ما قيس الزاوية المتمّمة للزاوية المعطاة التي قيسها $${alpha}^\\circ$؟`,
						questionTextAr: `في الشكل المقابل $(d)$ و $(d')$ متوازيان. ما قيس الزاوية المتمّمة للزاوية التي قيسها $${alpha}^\\circ$؟`,
						imageUrl,
						imageCaption: "المستقيمان (d) و (d') متوازيان",
						questionData: {
							options: mcq.options,
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: `زاويتان متتامتان مجموع قيسيهما $90^\\circ$، إذن قيس الزاوية المتممة للزاوية $${alpha}^\\circ$ هو $90^\\circ - ${alpha}^\\circ = ${comp}^\\circ$.`
					},
					sujetExercise: {
						points: this.defaultPoints,
						instruction: "في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان:",
						content: [
							{
								type: 'columns',
								widths: ['1.5fr', '1fr'],
								children: [
									{
										type: 'text',
										content: `1) ما نوع العلاقة بين الزاوية المعطاة ($${alpha}°$) والزاوية المشار إليها بـ ($?$)؟ استنتج قيس الزاوية ($?$).\n\n2) أذكر قيس الزاوية المتبادلة خارجياً مع الزاوية ($?$)، وقيس الزاوية المتقابلة بالرأس مع الزاوية $${alpha}°$.\n\n3) احسب قيس الزاوية المتممة للزاوية $${alpha}°$.`,
										answer: `1) الزاويتان داخليتان في نفس الجهة بالنسبة للقاطع وهما متكاملتان ($180°$)، إذن قيس ($?$) هو $180° - ${alpha}° = ${beta}°$.\n\n2) المتبادلة خارجياً مع ($?$) تقيس $${beta}°$ لأن $(d)$ و $(d')$ متوازيان، والمتقابلة بالرأس مع $${alpha}°$ تقيس $${alpha}°$.\n\n3) قيس الزاوية المتممة هو $90° - ${alpha}° = ${comp}°$.`,
										mark: '3'
									},
									{
										type: 'image',
										src: imageUrl,
										caption: "المستقيمان (d) و (d') متوازيان"
									}
								]
							}
						]
					},
					hints: [
						'ميّز جيداً بين المصطلحين: متتامتان ($90^\\circ$) ومتكاملتان ($180^\\circ$).',
						'المطلوب في هذا السؤال هو الزاوية المتمّمة، أي مجموع القيسين يساوي $90^\\circ$.',
						`احسب الفرق: $90^\\circ - ${alpha}^\\circ$.`
					],
					solutionStepsAr: [
						'مجموع قيسي زاويتين متتامتين يساوي $90^\\circ$.',
						`نطرح: $90^\\circ - ${alpha}^\\circ = ${comp}^\\circ$.`
					],
					finalAnswer: `${comp}°`
				};
			}

			const mcq = buildUniqueMcqOptions(
				'زاويتان متكاملتان مجموع قيسيهما $180^\\circ$',
				[
					{
						text: 'زاويتان متتامتان مجموع قيسيهما $90^\\circ$',
						diagnosticFeedback:
							'انتبه: إحدى الزاويتين حادة والأخرى منفرجة؛ مجموعهما لا يمكن أن يكون $90^\\circ$ بل $180^\\circ$.'
					},
					{
						text: 'زاويتان متبادلتان داخلياً ومتقايستان',
						diagnosticFeedback:
							'الزاويتان المتبادلتان داخلياً تقعان على جهتين مختلفتين من القاطع، أما هاتان الزاويتان فتقعان في نفس الجهة.'
					},
					{
						text: 'زاويتان متقابلتان بالرأس',
						diagnosticFeedback:
							'الزاويتان المتقابلتان بالرأس تشتركان في نفس الرأس، أما هنا فلكل زاوية رأس مختلف.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في الشكل المقابل المستقيمان $(d)$ و $(d')$ متوازيان. ما هي العلاقة بين الزاوية العلوية ($${alpha}^\\circ$) والزاوية السفلية المشار إليها بـ ($?$)؟`,
					questionTextAr: `في الشكل المقابل $(d)$ و $(d')$ متوازيان. ما العلاقة بين الزاوية ($${alpha}^\\circ$) والزاوية ($?$)؟`,
					imageUrl,
					imageCaption: "المستقيمان (d) و (d') متوازيان",
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `بما أن $(d)$ و $(d')$ متوازيان والزاويتين تقعان داخلياً في نفس الجهة بالنسبة للقاطع، فهما متكاملتان ومجموع قيسيهما $180^\\circ$، أي قيس ($?$) يساوي $${beta}^\\circ$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: "في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان:",
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) بيّن العلاقة بين الزاوية $${alpha}°$ والزاوية ($?$)، ثم احسب قيس ($?$).\n\n2) استنتج قيس الزاوية المتماثلة مع $${alpha}°$ وقيس الزاوية المتبادلة خارجياً مع ($?$).\n\n3) ما قيس الزاوية المتممة للزاوية $${alpha}°$؟`,
									answer: `1) الزاويتان متكاملتان، وقيس ($?$) هو $180° - ${alpha}° = ${beta}°$.\n\n2) المتماثلة مع $${alpha}°$ تقيس $${alpha}°$، والمتبادلة خارجياً مع ($?$) تقيس $${beta}°$.\n\n3) المتممة لـ $${alpha}°$ تقيس $90° - ${alpha}° = ${comp}°$.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: "المستقيمان (d) و (d') متوازيان"
								}
							]
						}
					]
				},
				hints: [
					'لاحظ موضع الزاويتين: كلتاهما بين المستقيمين المتوازيين وفي نفس الجهة من القاطع.',
					'إحدى الزاويتين حادة والأخرى منفرجة، وليستا على نفس الرأس.',
					'عند توازي المستقيمين، تكون الزاويتان الداخليتان في نفس الجهة متكاملتين ($180^\\circ$).'
				],
				solutionStepsAr: [
					'الزاويتان محصورتان بين المتوازيين وفي نفس الجهة من القاطع.',
					'الزاوية المتبادلة داخلياً مع $' + alpha + '^\\circ$ تجاور الزاوية ($?$) على خط مستقيم واحد.',
					'إذن الزاويتان متكاملتان ومجموع قيسيهما $180^\\circ$.'
				],
				finalAnswer: 'زاويتان متكاملتان مجموع قيسيهما 180°'
			};
		}

		// hard: bottom obtuse beta given, find top acute (?) or its complement
		const mcq = buildUniqueMcqOptions(
			`$${alpha}^\\circ$`,
			[
				{
					text: `$${beta}^\\circ$`,
					diagnosticFeedback:
						'انتبه: الزاوية المعطاة منفرجة ($' + beta + '^\\circ$) بينما الزاوية المطلوبة ($?$) حادة، فهما متكاملتان وليستا متقايستين.'
				},
				{
					text: `$${comp}^\\circ$`,
					diagnosticFeedback:
						'هذا قيس الزاوية المتمّمة لـ ($?$)، أما المطلوب فهو قيس الزاوية ($?$) نفسها: $180^\\circ - ' + beta + '^\\circ$.'
				},
				{
					text: `$${beta - 90}^\\circ$`,
					diagnosticFeedback: 'طرحت $90^\\circ$ بدلاً من الطرح من $180^\\circ$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في الشكل المقابل، المستقيمان $(d)$ و $(d')$ متوازيان، وقيس الزاوية السفلية المنفرجة هو $${beta}^\\circ$. ما قيس الزاوية العلوية المشار إليها بـ ($?$)؟`,
				questionTextAr: `في الشكل المقابل، $(d)$ و $(d')$ متوازيان وقيس الزاوية السفلية $${beta}^\\circ$. ما قيس الزاوية ($?$)؟`,
				imageUrl,
				imageCaption: "المستقيمان (d) و (d') متوازيان",
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بما أن $(d)$ و $(d')$ متوازيان، فالزاويتان متكاملتان: $180^\\circ - ${beta}^\\circ = ${alpha}^\\circ$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: "معطيات الشكل: المستقيمان $(d)$ و $(d')$ متوازيان ويقطعهما قاطع:",
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب قيس الزاوية المشار إليها بـ ($?$) مع التبرير باستعمال الزوايا المتبادلة داخلياً أو المتماثلة.\n\n2) أوجد قيس الزاوية المتبادلة خارجياً مع الزاوية $${beta}°$، وقيس الزاوية المتقابلة بالرأس مع ($?$).\n\n3) هل توجد زاوية متمّمة للزاوية ($?$)؟ إذا كان نعم، ما قيسها؟`,
								answer: `1) الزاوية المتبادلة داخلياً مع ($?$) تجاور الزاوية $${beta}°$ على خط مستقيم، إذن قيس ($?$) هو $180° - ${beta}° = ${alpha}°$.\n\n2) المتبادلة خارجياً مع $${beta}°$ تقيس $${beta}°$، والمتقابلة بالرأس مع ($?$) تقيس $${alpha}°$.\n\n3) نعم، لأن $${alpha}° < 90°$، وقيس متممتها هو $90° - ${alpha}° = ${comp}°$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: "المستقيمان (d) و (d') متوازيان"
							}
						]
					}
				]
			},
			hints: [
				'استعن بالزاوية المتماثلة أو المتبادلة داخلياً لإرجاع الزاويتين إلى نفس الرأس.',
				'تلاحظ أن الزاويتين متكاملتان (مجموعهما $180^\\circ$).',
				`احسب $180^\\circ - ${beta}^\\circ$.`
			],
			solutionStepsAr: [
				`الزاوية المتماثلة مع ($?$) تقع تحت $(d')$ وتكمل الزاوية $${beta}^\\circ$.`,
				`إذن قيس ($?$) يساوي $180^\\circ - ${beta}^\\circ = ${alpha}^\\circ$.`
			],
			finalAnswer: `${alpha}°`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T1 Integration Situation (الوضعية الإدماجية - 8 pts, 3 Parts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT1Template: ParameterizedTemplate = {
	id: '2am_t1_integration',
	grade: '2am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: حصيلة الفصل الأول',
	curriculumLessonId: 'lesson_2am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Curated fraction scenarios (n1/d1 + n2/D, where D = k * d1 and sum < 1)
		const scenarios: Array<{ n1: number; d1: number; n2: number; k: number; dims: [number, number][] }> = [
			{
				n1: 1,
				d1: 3,
				n2: 1,
				k: 2,
				dims: [
					[30, 20],
					[36, 20],
					[45, 24],
					[60, 18]
				]
			},
			{
				n1: 1,
				d1: 4,
				n2: 3,
				k: 2,
				dims: [
					[40, 20],
					[48, 20],
					[40, 24],
					[60, 24]
				]
			},
			{
				n1: 2,
				d1: 5,
				n2: 1,
				k: 2,
				dims: [
					[40, 20],
					[50, 20],
					[50, 24],
					[60, 25]
				]
			},
			{
				n1: 1,
				d1: 3,
				n2: 2,
				k: 3,
				dims: [
					[36, 18],
					[45, 18],
					[45, 24],
					[54, 20]
				]
			},
			{
				n1: 1,
				d1: 4,
				n2: 5,
				k: 3,
				dims: [
					[36, 20],
					[48, 20],
					[40, 24],
					[60, 24]
				]
			},
			{
				n1: 2,
				d1: 5,
				n2: 4,
				k: 3,
				dims: [
					[45, 20],
					[50, 24],
					[60, 20],
					[60, 30]
				]
			}
		];

		const sc = rng.pick(scenarios);
		const [L, W] = rng.pick(sc.dims);
		const S = L * W;
		const D = sc.d1 * sc.k;

		const [pUsed, qUsed] = simplifyFraction(sc.n1 * sc.k + sc.n2, D);
		const [pRem, qRem] = simplifyFraction(qUsed - pUsed, qUsed);
		const sRem = (S / qRem) * pRem;
		const sUsed = S - sRem;

		// Part 2: Distributive calculation for saplings
		const sumQ = rng.pick([40, 50, 60, 80, 100]);
		const q1 = rng.int(12, Math.floor(sumQ * 0.6));
		const q2 = sumQ - q1;
		const unitPrice = rng.priceDA(150, 400, 50);
		const costSaplings = unitPrice * sumQ;

		// Part 3: Central symmetry & perimeter/fencing
		const gate = rng.int(2, 4);
		const perim = 2 * (L + W);
		const wireLen = perim - gate;
		const wirePrice = rng.priceDA(100, 250, 50);
		const costWire = wireLen * wirePrice;
		const totalExpense = costSaplings + costWire;

		const svg = svgRectangle({
			lengthLabel: `${L} m`,
			widthLabel: `${W} m`,
			shapeLabel: `S = ${S} m2`,
			vertices: ['A', 'B', 'C', 'D']
		});
		const imageUrl = saveSvgAsset(`2am_t1_integration_${difficulty}_${seed}`, svg);

		// Build quizQuestion adapted to difficulty while keeping full 3-part sujetExercise
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongDenAddNum = Math.round((S * (sc.n1 + sc.n2)) / (sc.d1 + D));
			const wrongForgetSub = sUsed;
			const wrongHalf = Math.round(S / 2) === sRem ? sRem + L : Math.round(S / 2);
			const mcq = buildUniqueMcqOptions(
				`$${sRem}\\text{ m}^2$`,
				[
					{
						text: `$${wrongForgetSub}\\text{ m}^2$`,
						diagnosticFeedback:
							'هذه مساحة الجزء المغروس، لكن السؤال يطلب مساحة الجزء المتبقي (اطرح من $1$ أو من المساحة الكلية).'
					},
					{
						text: `$${wrongDenAddNum}\\text{ m}^2$`,
						diagnosticFeedback:
							'انتبه: عند جمع كسرين يجب توحيد المقامين أولاً ولا نجمع المقامين معاً!'
					},
					{
						text: `$${wrongHalf}\\text{ m}^2$`,
						diagnosticFeedback:
							'تحقق من توحيد المقامات وحساب الكسر المتبقي من الوحدة $1$.'
					}
				],
				rng
			);
			finalAnswer = `${sRem} m²`;
			quizQuestion = {
				type: 'mcq',
				questionText: `يملك فلاح قطعة أرض مستطيلة الشكل $ABCD$ أبعادها $${L}\\text{ m}$ و $${W}\\text{ m}$. غرس $\\frac{${sc.n1}}{${sc.d1}}$ من مساحتها أشجار زيتون، وغرس $\\frac{${sc.n2}}{${D}}$ خضروات، وترك الجزء المتبقي لبناء حوض. ما هي مساحة الجزء المتبقي؟`,
				questionTextAr: `قطعة أرض مستطيلة أبعادها $${L}\\text{ m}$ و $${W}\\text{ m}$. غُرِس $\\frac{${sc.n1}}{${sc.d1}}$ منها زيتوناً و$\\frac{${sc.n2}}{${D}}$ خضروات. ما مساحة الجزء المتبقي؟`,
				imageUrl,
				imageCaption: `مخطط القطعة المستطيلة ABCD (${L}m × ${W}m)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المساحة الكلية $S = ${L} \\times ${W} = ${S}\\text{ m}^2$. الكسر المغروس: $\\frac{${sc.n1}}{${sc.d1}} + \\frac{${sc.n2}}{${D}} = \\frac{${pUsed}}{${qUsed}}$، إذن المتبقي هو $\\frac{${pRem}}{${qRem}}$ ومساحته $${S} \\times \\frac{${pRem}}{${qRem}} = ${sRem}\\text{ m}^2$.`
			};
		} else if (difficulty === 'medium') {
			const wrongPriority = 2 * L + W - gate;
			const wrongAddGate = perim + gate;
			const wrongHalfPerim = L + W - gate;
			const mcq = buildUniqueMcqOptions(
				`$${wireLen}\\text{ m}$`,
				[
					{
						text: `$${wrongPriority}\\text{ m}$`,
						diagnosticFeedback:
							'خطأ في أولوية العمليات: محيط المستطيل هو $2 \\times (L + W)$ وليس $2 \\times L + W$!'
					},
					{
						text: `$${wrongAddGate}\\text{ m}$`,
						diagnosticFeedback:
							'يجب طرح عرض الباب ($' + gate + '\\text{ m}$) من المحيط وليس إضافته!'
					},
					{
						text: `$${wrongHalfPerim}\\text{ m}$`,
						diagnosticFeedback:
							'المحيط يساوي ضعف مجموع الطول والعرض، نسيت الضرب في $2$.'
					}
				],
				rng
			);
			finalAnswer = `${wireLen} m`;
			quizQuestion = {
				type: 'mcq',
				questionText: `أنجز الفلاح حوضاً مستطيلاً $EFGH$ نظير المستطيل $ABCD$ (طوله $${L}\\text{ m}$ وعرضه $${W}\\text{ m}$) بالنسبة إلى نقطة $O$. يريد تسييج الحوض $EFGH$ بسياج مع ترك مدخل عرضه $${gate}\\text{ m}$. ما طول السياج اللازم؟`,
				questionTextAr: `الحوض $EFGH$ نظير المستطيل $ABCD$ ($${L}\\text{ m} \\times ${W}\\text{ m}$) بالتناظر المركزي. ما طول السياج اللازم لتسييجه بعد ترك مدخل عرضه $${gate}\\text{ m}$؟`,
				imageUrl,
				imageCaption: `مخطط القطعة المستطيلة ABCD (${L}m × ${W}m)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التناظر المركزي يحفظ الأطوال، إذن أبعاد $EFGH$ هي $${L}\\text{ m}$ و $${W}\\text{ m}$. طول السياج $= 2 \\times (${L} + ${W}) - ${gate} = ${perim} - ${gate} = ${wireLen}\\text{ m}$.`
			};
		} else {
			// hard: total combined cost (saplings via distributivity + fencing wire around symmetric annex)
			const wrongPriorityTotal = costSaplings + (2 * L + W - gate) * wirePrice;
			const wrongNoGateTotal = costSaplings + perim * wirePrice;
			const wrongOneSapling = unitPrice * q1 + costWire;
			const mcq = buildUniqueMcqOptions(
				`$${totalExpense}\\text{ DA}$`,
				[
					{
						text: `$${wrongPriorityTotal}\\text{ DA}$`,
						diagnosticFeedback:
							'تحقق من محيط المستطيل: $2 \\times (L + W)$ وليس $2 \\times L + W$!'
					},
					{
						text: `$${wrongNoGateTotal}\\text{ DA}$`,
						diagnosticFeedback:
							'نسيت طرح عرض المدخل ($' + gate + '\\text{ m}$) من طول السياج!'
					},
					{
						text: `$${wrongOneSapling}\\text{ DA}$`,
						diagnosticFeedback:
							'تأكّد من حساب ثمن شتلات المنطقتين معاً ($' + q1 + ' + ' + q2 + '$ شتلة) باستعمال التوزيع.'
					}
				],
				rng
			);
			finalAnswer = `${totalExpense} DA`;
			quizQuestion = {
				type: 'mcq',
				questionText: `اشترى فلاح $${q1}$ شتلة للقطعة الأولى و$${q2}$ شتلة للقطعة الثانية بسعر $${unitPrice}\\text{ DA}$ للشتلة الواحدة، ثم سيّج حوضاً $EFGH$ نظير المستطيل $ABCD$ (أبعاده $${L}\\text{ m}$ و $${W}\\text{ m}$) بالنسبة إلى $O$ مع ترك باب عرضه $${gate}\\text{ m}$، حيث سعر المتر الواحد من السياج $${wirePrice}\\text{ DA}$. ما الكلفة الإجمالية؟`,
				questionTextAr: `اشترى فلاح $${q1} + ${q2}$ شتلة بسعر $${unitPrice}\\text{ DA}$ للواحدة، وسيّج الحوض $EFGH$ نظير $ABCD$ (بترك باب $${gate}\\text{ m}$) بسعر $${wirePrice}\\text{ DA/m}$. ما الكلفة الإجمالية؟`,
				imageUrl,
				imageCaption: `مخطط القطعة المستطيلة ABCD (${L}m × ${W}m)`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `كلفة الشتلات: $${unitPrice} \\times (${q1} + ${q2}) = ${costSaplings}\\text{ DA}$. التناظر المركزي يحفظ الأطوال، فطول السياج $= 2 \\times (${L} + ${W}) - ${gate} = ${wireLen}\\text{ m}$ وكلفته $${wireLen} \\times ${wirePrice} = ${costWire}\\text{ DA}$. المجموع $= ${totalExpense}\\text{ DA}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'يملك فلاح قطعة أرض مستطيلة الشكل $A B C D$ طولها $A B = ' +
					L +
					'$ م وعرضها $B C = ' +
					W +
					'$ م (انظر الشكل).',
				content: [
					{
						type: 'columns',
						widths: ['1.6fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (الكسور والمساحة):\n\nغرس الفلاح $frac(${sc.n1}, ${sc.d1})$ من مساحة الأرض أشجار زيتون، وغرس $frac(${sc.n2}, ${D})$ من مساحتها خضروات، وخصّص الجزء المتبقي لبناء حوض مائي.\n\n1) احسب مساحة الأرض $S$ بالمتر المربع، ثم اكتب على شكل كسر مختزل مجموع الجزأين المغروسين.\n\n2) استنتج الكسر الذي يمثّل الجزء المتبقي، ثم احسب مساحته بالمتر المربع.`,
								answer: `الجزء الأول:\n\n1) المساحة: $S = ${L} times ${W} = ${S}$ م². الكسر المغروس: $frac(${sc.n1}, ${sc.d1}) + frac(${sc.n2}, ${D}) = frac(${sc.n1 * sc.k}, ${D}) + frac(${sc.n2}, ${D}) = frac(${sc.n1 * sc.k + sc.n2}, ${D}) = ${formatFracTypst(pUsed, qUsed)}$.\n\n2) الكسر المتبقي: $1 - ${formatFracTypst(pUsed, qUsed)} = ${formatFracTypst(pRem, qRem)}$. مساحة الجزء المتبقي: $${S} times ${formatFracTypst(pRem, qRem)} = ${sRem}$ م².`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'قطعة الأرض المستطيلة'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (سلاسل العمليات والتوزيع):\n\nلتشجير الجزأين، اشترى الفلاح $${q1}$ شتلة زيتون و $${q2}$ شتلة حمضيات بسعر $${unitPrice}$ دج للشتلة الواحدة.\n\n1) اكتب سلسلة عمليات واحدة تسمح بحساب الكلفة الإجمالية $M$ للشتلات.\n\n2) احسب $M$ بطريقتين مختلفتين باستعمال خاصية توزيع الضرب على الجمع.`,
						answer: `الجزء الثاني:\n\n1) العبارة: $M = ${unitPrice} times (${q1} + ${q2})$.\n\n2) الطريقة 1: $M = ${unitPrice} times ${sumQ} = ${costSaplings}$ دج.\n\nالطريقة 2 (التوزيع): $M = ${unitPrice} times ${q1} + ${unitPrice} times ${q2} = ${unitPrice * q1} + ${unitPrice * q2} = ${costSaplings}$ دج.`,
						mark: '2'
					},
					{
						type: 'text',
						content:
							difficulty === 'hard'
								? `الجزء الثالث (التناظر المركزي والمحيط):\n\nصمّم الفلاح حوضاً مستطيلاً $E F G H$ نظير المستطيل $A B C D$ بالتناظر المركزي بالنسبة إلى نقطة $O$، وأراد إحاطته بسياج مع ترك مدخل عرضه $${gate}$ م، علماً أن سعر المتر الواحد من السياج هو $${wirePrice}$ دج.\n\n1) اعتماداً على خواص التناظر المركزي، استنتج الطول $E F$ والعرض $F G$ وقيس الزاوية $hat(E F G)$.\n\n2) اكتب سلسلة عمليات لحساب طول السياج اللازم ثم احسبه، واستنتج الكلفة الإجمالية للشتلات والسياج معاً.`
								: `الجزء الثالث (التناظر المركزي والمحيط):\n\nصمّم الفلاح مساحة مجاورة مستطيلة $E F G H$ نظيرة للمستطيل $A B C D$ بالتناظر المركزي بالنسبة إلى نقطة $O$، وأراد إحاطتها بسياج مع ترك مدخل عرضه $${gate}$ م.\n\n1) اعتماداً على خواص التناظر المركزي، استنتج الطول $E F$ والعرض $F G$ وقيس الزاوية $hat(E F G)$.\n\n2) اكتب سلسلة عمليات تسمح بحساب طول السياج اللازم، ثم احسبه.`,
						answer:
							difficulty === 'hard'
								? `الجزء الثالث:\n\n1) بما أن التناظر المركزي يحفظ الأطوال وأقياس الزوايا، فإن: $E F = A B = ${L}$ م، و $F G = B C = ${W}$ م، و $hat(E F G) = hat(A B C) = 90°$.\n\n2) طول السياج: $P = 2 times (${L} + ${W}) - ${gate} = ${perim} - ${gate} = ${wireLen}$ م. كلفة السياج: $${wireLen} times ${wirePrice} = ${costWire}$ دج، والكلفة الإجمالية: $${costSaplings} + ${costWire} = ${totalExpense}$ دج.`
								: `الجزء الثالث:\n\n1) بما أن التناظر المركزي يحفظ الأطوال وأقياس الزوايا، فإن: $E F = A B = ${L}$ م، و $F G = B C = ${W}$ م، و $hat(E F G) = hat(A B C) = 90°$.\n\n2) طول السياج: $P = 2 times (${L} + ${W}) - ${gate} = ${perim} - ${gate} = ${wireLen}$ م.`,
						mark: '3'
					}
				]
			},
			hints: [
				`في الكسور، وحّد المقامات نحو المقام المضاعف $${D}$ ثم اطرح المجموع من $1$ لإيجاد الكسر المتبقي.`,
				`في خاصية التوزيع، يمكنك الحساب بجمع القوسين أولاً أو بنشر الضرب: $${unitPrice} \\times ${q1} + ${unitPrice} \\times ${q2}$.`,
				'تذكّر أن التناظر المركزي يحفظ الأطوال وأقياس الزوايا، وأن محيط المستطيل هو $2 \\times (L + W)$.'
			],
			solutionStepsAr: [
				`الجزء 1: $S = ${L} \\times ${W} = ${S}\\text{ m}^2$، الكسر المغروس $\\frac{${pUsed}}{${qUsed}}$، المتبقي $\\frac{${pRem}}{${qRem}}$ ومساحته $${sRem}\\text{ m}^2$.`,
				`الجزء 2: كلفة الشتلات $= ${unitPrice} \\times (${q1} + ${q2}) = ${costSaplings}\\text{ DA}$.`,
				`الجزء 3: بالتناظر المركزي $EF = ${L}\\text{ m}$ و $FG = ${W}\\text{ m}$ و $\\widehat{EFG} = 90^\\circ$، وطول السياج $= 2 \\times (${L} + ${W}) - ${gate} = ${wireLen}\\text{ m}$${difficulty === 'hard' ? `، والكلفة الإجمالية $= ${totalExpense}\\text{ DA}$` : ''}.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_2AM_T1: ParameterizedTemplate[] = [
	orderOpsDistributivityTemplate,
	divisionFramingCompareTemplate,
	fractionsOperationsTemplate,
	centralSymmetryTemplate,
	anglesParallelismTemplate,
	integrationT1Template
];
