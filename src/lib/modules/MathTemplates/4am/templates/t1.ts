import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import { buildUniqueMcqOptions, gcd, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgThalesConfig, svgTriangle } from '../../svg-helpers';

function formatFracKatex(num: number, den: number): string {
	return den === 1 ? `${num}` : `\\frac{${num}}{${den}}`;
}

function formatFracTypst(num: number, den: number): string {
	return den === 1 ? `${num}` : `frac(${num}, ${den})`;
}

interface EuclideanStep {
	a: number;
	b: number;
	q: number;
	r: number;
}

function euclideanSteps(a: number, b: number): EuclideanStep[] {
	let x = Math.max(Math.trunc(a), Math.trunc(b));
	let y = Math.min(Math.trunc(a), Math.trunc(b));
	const steps: EuclideanStep[] = [];
	while (y > 0) {
		const q = Math.floor(x / y);
		const r = x % y;
		steps.push({ a: x, b: y, q, r });
		x = y;
		y = r;
	}
	return steps;
}

function formatEuclideanTypst(steps: EuclideanStep[]): string {
	return steps.map((s) => `$${s.a} = ${s.b} times ${s.q} + ${s.r}$`).join(' ، ');
}

function formatEuclideanKatex(steps: EuclideanStep[]): string {
	return steps.map((s) => `$${s.a} = ${s.b} \\times ${s.q} + ${s.r}$`).join(' ، ');
}

function formatRadicalKatex(coeff: number, rad: number): string {
	if (rad === 1) return `${coeff}`;
	if (coeff === 1) return `\\sqrt{${rad}}`;
	if (coeff === -1) return `-\\sqrt{${rad}}`;
	return `${coeff}\\sqrt{${rad}}`;
}

function formatRadicalTypst(coeff: number, rad: number): string {
	if (rad === 1) return `${coeff}`;
	if (coeff === 1) return `sqrt(${rad})`;
	if (coeff === -1) return `-sqrt(${rad})`;
	return `${coeff} sqrt(${rad})`;
}

function buildIntegrationPlotSvg(opts: {
	abLabel: string;
	acLabel: string;
	bcLabel: string;
	bmLabel: string;
	mnLabel: string;
	ratio: number;
}): string {
	const w = 320;
	const h = 215;
	const Ax = 72;
	const Ay = 160;
	const Bx = 288;
	const By = 160;
	const Cx = 72;
	const Cy = 32;

	const r = Math.min(0.78, Math.max(0.32, opts.ratio));
	const Mx = Bx - r * (Bx - Ax);
	const My = Ay;
	const Nx = Mx;
	const Ny = Ay - r * (Ay - Cy);

	const esc = (s: string) =>
		s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

	const parts = [
		`<polygon points="${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}" fill="#f0fdf4" stroke="#15803d" stroke-width="2.2"/>`,
		`<polygon points="${Mx.toFixed(1)},${My} ${Bx},${By} ${Nx.toFixed(1)},${Ny.toFixed(1)}" fill="#dbeafe" fill-opacity="0.55" stroke="#2563eb" stroke-width="1.8"/>`,
		`<line x1="${Mx.toFixed(1)}" y1="${My}" x2="${Nx.toFixed(1)}" y2="${Ny.toFixed(1)}" stroke="#2563eb" stroke-width="2.4"/>`,
		// Right angle at A
		`<polyline points="${Ax},${Ay - 12} ${Ax + 12},${Ay - 12} ${Ax + 12},${Ay}" fill="none" stroke="#dc2626" stroke-width="1.6"/>`,
		// Angle arc at B
		`<path d="M ${Bx - 28} ${By} A 28 28 0 0 1 ${Bx - 24} ${By - 14.2}" fill="none" stroke="#dc2626" stroke-width="2"/>`,
		// Vertex points & labels
		`<circle cx="${Mx.toFixed(1)}" cy="${My}" r="3" fill="#2563eb"/>`,
		`<circle cx="${Nx.toFixed(1)}" cy="${Ny.toFixed(1)}" r="3" fill="#2563eb"/>`,
		`<text x="${Ax - 14}" y="${Ay + 14}" font-size="13" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${Bx + 8}" y="${By + 14}" font-size="13" font-weight="bold" fill="#dc2626">B</text>`,
		`<text x="${Cx - 14}" y="${Cy + 4}" font-size="13" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${Mx.toFixed(1)}" y="${My + 16}" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">M</text>`,
		`<text x="${(Nx + 8).toFixed(1)}" y="${(Ny - 4).toFixed(1)}" font-size="12" font-weight="bold" fill="#1d4ed8">N</text>`,
		// Side labels
		`<text x="36" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">${esc(opts.acLabel)}</text>`,
		`<text x="${((Mx + Bx) / 2).toFixed(1)}" y="${By + 18}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">${esc(opts.bmLabel)}</text>`,
		`<text x="${(Ax + Bx) / 2}" y="${By + 36}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(opts.abLabel)}</text>`,
		`<text x="196" y="84" text-anchor="middle" font-size="11" font-weight="bold" fill="#7c3aed">${esc(opts.bcLabel)}</text>`,
		`<text x="${(Mx - 24).toFixed(1)}" y="${((My + Ny) / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#2563eb">${esc(opts.mnLabel)}</text>`
	];

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Euclidean PGCD & Irreducible Fractions (Classic BEM Ex 1)
// ═══════════════════════════════════════════════════════════════════════════════
const pgcdIrreducibleFractionTemplate: ParameterizedTemplate = {
	id: '4am_t1_pgcd_irreducible_fraction',
	grade: '4am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'القاسم المشترك الأكبر (PGCD) والكسور غير القابلة للاختزال',
	curriculumLessonId: 'lesson_4am_t1_divisors_pgcd_irreducible_fractions',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const g = rng.pick([6, 8, 10, 12, 14, 15, 16, 18, 20, 24]);
			const coprimePairs: [number, number][] = [
				[7, 5],
				[8, 5],
				[9, 4],
				[9, 5],
				[11, 4],
				[11, 6],
				[11, 7],
				[13, 5],
				[13, 8],
				[14, 9],
				[15, 8],
				[17, 6]
			];
			const [p, q] = rng.pick(coprimePairs);
			const a = g * p;
			const b = g * q;
			const steps = euclideanSteps(a, b);
			const divReason =
				g % 2 === 0
					? `العددان $${a}$ و $${b}$ زوجيان (رقم آحادهما زوجي)، فكلاهما يقبل القسمة على $2$، إذن قاسمهما المشترك الأكبر أكبر من $1$.`
					: `رقم آحاد كل من $${a}$ و $${b}$ هو $0$ أو $5$، فكلاهما يقبل القسمة على $5$، إذن قاسمهما المشترك الأكبر أكبر من $1$.`;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `احسب القاسم المشترك الأكبر للعددين $${a}$ و $${b}$ باستعمال خوارزمية إقليدس: $\\text{PGCD}(${a} ; ${b})$.`,
					questionTextAr: `احسب القاسم المشترك الأكبر للعددين $${a}$ و $${b}$: $\\text{PGCD}(${a} ; ${b})$.`,
					questionData: {
						answer: g,
						displayTemplate: `PGCD(${a} ; ${b}) = ?`,
						variables: [],
						tolerance: 0
					},
					explanation: `نطبق خوارزمية القسمات المتتالية: ${formatEuclideanKatex(steps)}. آخر باقٍ غير معدوم هو $${g}$، إذن $\\text{PGCD}(${a} ; ${b}) = ${g}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر العددين الطبيعيين $${a}$ و $${b}$:`,
					content: [
						{
							type: 'text',
							content: `1) دون حساب، برّر لماذا العددان $${a}$ و $${b}$ ليسا أوليين فيما بينهما.`,
							answer: `1) ${divReason}`,
							mark: '0.5'
						},
						{
							type: 'text',
							content: `2) احسب القاسم المشترك الأكبر $upright("PGCD")(${a} ; ${b})$ باستعمال خوارزمية إقليدس (القسمات المتتالية).`,
							answer: `2) بتطبيق خوارزمية إقليدس: ${formatEuclideanTypst(steps)}. إذن $upright("PGCD")(${a} ; ${b}) = ${g}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) اكتب الكسر $frac(${a}, ${b})$ على الشكل غير القابل للاختزال.`,
							answer: `3) نقسم البسط والمقام على $upright("PGCD")(${a} ; ${b}) = ${g}$: $frac(${a}, ${b}) = frac(${a} div ${g}, ${b} div ${g}) = frac(${p}, ${q})$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'يكون عددان أوليين فيما بينهما إذا كان قاسمهما المشترك الأكبر يساوي $1$ فقط.',
					`ابدأ بقسمة $${a}$ على $${b}$: $${a} = ${b} \\times ${steps[0].q} + ${steps[0].r}$، ثم واصل قسمة القاسم على الباقي.`,
					'القاسم المشترك الأكبر هو آخر باقٍ غير معدوم في خوارزمية إقليدس.'
				],
				solutionStepsAr: [
					divReason,
					`القسمات المتتالية: ${formatEuclideanKatex(steps)}.`,
					`إذن $\\text{PGCD}(${a} ; ${b}) = ${g}$، ومنه $\\frac{${a}}{${b}} = \\frac{${p}}{${q}}$.`
				],
				finalAnswer: `${g}`
			};
		}

		if (difficulty === 'medium') {
			const g = rng.pick([14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 28, 30, 32, 35, 36, 40, 42, 45]);
			const pairs: [number, number][] = [
				[11, 7],
				[13, 8],
				[15, 11],
				[17, 10],
				[17, 12],
				[18, 11],
				[19, 12],
				[20, 13],
				[21, 13],
				[22, 15],
				[23, 9],
				[23, 14]
			];
			const [p, q] = rng.pick(pairs);
			const a = g * p;
			const b = g * q;
			const steps = euclideanSteps(a, b);

			const extraFracs: [number, number][] = [
				[1, 2],
				[1, 3],
				[2, 3],
				[1, 4],
				[3, 4],
				[1, 5],
				[2, 5],
				[3, 5]
			].filter(([, d]) => d !== q) as [number, number][];
			const [c, d] = rng.pick(extraFracs);
			const [numA, denA] = simplifyFraction(p * d + c * q, q * d);

			// Smallest prime factor of g so dividing by k leaves a partially reduced fraction
			let k = 2;
			while (g % k !== 0) k++;
			const [numBadPlus, denBadPlus] = simplifyFraction(p + 1, q);

			const mcq = buildUniqueMcqOptions(
				`$${formatFracKatex(p, q)}$`,
				[
					{
						text: `$${formatFracKatex(a / k, b / k)}$`,
						diagnosticFeedback: `هذا الكسر مختزل جزئياً فقط (بالقسمة على $${k}$)، وليس على الشكل غير القابل للاختزال؛ اقسم على $\\text{PGCD}(${a} ; ${b}) = ${g}$.`
					},
					{
						text: `$${formatFracKatex(q, p)}$`,
						diagnosticFeedback: 'انتبه: قلبت البسط والمقام عند كتابة الكسر المختزل.'
					},
					{
						text: `$${formatFracKatex(numBadPlus, denBadPlus)}$`,
						diagnosticFeedback: `تحقق من ناتج القسمة: $${a} \\div ${g} = ${p}$ و $${b} \\div ${g} = ${q}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `ما هو الشكل غير القابل للاختزال للكسر $\\frac{${a}}{${b}}$؟`,
					questionTextAr: `ما هو الشكل غير القابل للاختزال للكسر $\\frac{${a}}{${b}}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نجد بخوارزمية إقليدس $\\text{PGCD}(${a} ; ${b}) = ${g}$، ومنه $\\frac{${a}}{${b}} = \\frac{${a} \\div ${g}}{${b} \\div ${g}} = \\frac{${p}}{${q}}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أجب عن الأسئلة التالية مع توضيح مراحل الحساب:',
					content: [
						{
							type: 'text',
							content: `1) احسب القاسم المشترك الأكبر $upright("PGCD")(${a} ; ${b})$ باستعمال خوارزمية إقليدس.`,
							answer: `1) ${formatEuclideanTypst(steps)}. إذن $upright("PGCD")(${a} ; ${b}) = ${g}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) اكتب الكسر $frac(${a}, ${b})$ على الشكل غير القابل للاختزال.`,
							answer: `2) $frac(${a}, ${b}) = frac(${a} div ${g}, ${b} div ${g}) = frac(${p}, ${q})$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب العدد $A = frac(${a}, ${b}) + frac(${c}, ${d})$ واكتب النتيجة على شكل كسر غير قابل للاختزال.`,
							answer: `3) $A = frac(${p}, ${q}) + frac(${c}, ${d}) = frac(${p * d} + ${c * q}, ${q * d}) = frac(${p * d + c * q}, ${q * d}) = ${formatFracTypst(numA, denA)}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`احسب أولاً $\\text{PGCD}(${a} ; ${b})$ بقسمات إقليدس المتتالية.`,
					`اقسم كلاً من $${a}$ و $${b}$ على القاسم المشترك الأكبر لتحصل على الكسر المختزل.`,
					`لحساب $A$، عوّض $\\frac{${a}}{${b}}$ بشكله المختزل ثم وحّد المقامين نحو $${q * d}$.`
				],
				solutionStepsAr: [
					`خوارزمية إقليدس: ${formatEuclideanKatex(steps)}، إذن $\\text{PGCD}(${a} ; ${b}) = ${g}$.`,
					`الاختزال: $\\frac{${a}}{${b}} = \\frac{${p}}{${q}}$.`,
					`حساب $A$: $A = \\frac{${p}}{${q}} + \\frac{${c}}{${d}} = ${formatFracKatex(numA, denA)}$.`
				],
				finalAnswer: `${p}/${q}`
			};
		}

		// hard
		const g = rng.pick([24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 56, 60, 64, 72]);
		const pairs: [number, number][] = [
			[13, 9],
			[16, 11],
			[17, 12],
			[19, 11],
			[19, 13],
			[21, 13],
			[23, 15],
			[25, 14],
			[26, 15],
			[27, 16],
			[29, 17]
		];
		const [p, q] = rng.pick(pairs);
		const a = g * p;
		const b = g * q;
		const steps = euclideanSteps(a, b);
		const [c, d] = rng.pick([
			[1, 2],
			[1, 3],
			[2, 3],
			[1, 4],
			[3, 4],
			[2, 5],
			[3, 5]
		]);
		const [numB, denB] = simplifyFraction(p * d - c * q, q * d);
		const [numAdd, denAdd] = simplifyFraction(p * d + c * q, q * d);
		const [numBadDirect, denBadDirect] = simplifyFraction(Math.abs(p - c), Math.max(1, Math.abs(q - d)));

		const mcq = buildUniqueMcqOptions(
			`$${formatFracKatex(numB, denB)}$`,
			[
				{
					text: `$${formatFracKatex(numAdd, denAdd)}$`,
					diagnosticFeedback: 'انتبه للإشارة: العملية هي طرح $\\frac{a}{b} - \\frac{c}{d}$ وليست جمعاً!'
				},
				{
					text: `$${formatFracKatex(numBadDirect, denBadDirect)}$`,
					diagnosticFeedback: 'خطأ شائع: لا نطرح البسط من البسط والمقام من المقام مباشرة، بل نوحّد المقامين أولاً!'
				},
				{
					text: `$${formatFracKatex(numB + 1, denB)}$`,
					diagnosticFeedback: 'تحقق من توحيد المقامات بعد اختزال الكسر الأول إلى $\\frac{' + p + '}{' + q + '}$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `احسب العبارة $B = \\frac{${a}}{${b}} - \\frac{${c}}{${d}}$ واكتب النتيجة على شكل كسر غير قابل للاختزال.`,
				questionTextAr: `ما هو الشكل غير القابل للاختزال للعدد $B = \\frac{${a}}{${b}} - \\frac{${c}}{${d}}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نختزل أولاً $\\frac{${a}}{${b}} = \\frac{${p}}{${q}}$ (لأن $\\text{PGCD}(${a} ; ${b}) = ${g}$)، ثم نوحّد المقامين: $B = \\frac{${p}}{${q}} - \\frac{${c}}{${d}} = \\frac{${p * d - c * q}}{${q * d}} = ${formatFracKatex(numB, denB)}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'تمرين عددي وفق نمط شهادة التعليم المتوسط:',
				content: [
					{
						type: 'text',
						content: `1) احسب $upright("PGCD")(${a} ; ${b})$ باستعمال خوارزمية إقليدس، ثم اختزل الكسر $frac(${a}, ${b})$.`,
						answer: `1) ${formatEuclideanTypst(steps)}. إذن $upright("PGCD")(${a} ; ${b}) = ${g}$، ومنه $frac(${a}, ${b}) = frac(${p}, ${q})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) احسب العدد $B = frac(${a}, ${b}) - frac(${c}, ${d})$ واكتب الناتج على الشكل غير القابل للاختزال.`,
						answer: `2) $B = frac(${p}, ${q}) - frac(${c}, ${d}) = frac(${p * d} - ${c * q}, ${q * d}) = frac(${p * d - c * q}, ${q * d}) = ${formatFracTypst(numB, denB)}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) يملك بائع $${a}$ كراساً و $${b}$ قلماً ويريد توزيعها على أكبر عدد ممكن من السلال المتماثلة دون باقٍ. ما أكبر عدد من السلال يمكن تحضيره، وما محتوى كل سلة؟`,
						answer: `3) أكبر عدد من السلال هو $upright("PGCD")(${a} ; ${b}) = ${g}$ سلة؛ وتحتوي كل سلة على $${a} div ${g} = ${p}$ كراساً و $${b} div ${g} = ${q}$ قلماً.`,
						mark: '1'
					}
				]
			},
			hints: [
				`اختزل أولاً الكسر $\\frac{${a}}{${b}}$ بقسمة بسطه ومقامه على $\\text{PGCD}(${a} ; ${b})$.`,
				`عوّض الكسر المختزل في عبارة $B$ ثم وحّد المقامين قبل الطرح.`,
				'أكبر عدد من السلال المتماثلة في مسائل التوزيع هو القاسم المشترك الأكبر للكميتين.'
			],
			solutionStepsAr: [
				`خوارزمية إقليدس: ${formatEuclideanKatex(steps)}، إذن $\\text{PGCD}(${a} ; ${b}) = ${g}$ و $\\frac{${a}}{${b}} = \\frac{${p}}{${q}}$.`,
				`حساب $B$: $B = \\frac{${p}}{${q}} - \\frac{${c}}{${d}} = ${formatFracKatex(numB, denB)}$.`,
				`عدد السلال هو $${g}$ سلة، في كل منها $${p}$ كراساً و $${q}$ قلماً.`
			],
			finalAnswer: denB === 1 ? `${numB}` : `${numB}/${denB}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Square Roots Simplification to a√b, Operations & Solving x² = b
// ═══════════════════════════════════════════════════════════════════════════════
const squareRootsEquationsTemplate: ParameterizedTemplate = {
	id: '4am_t1_square_roots_equations',
	grade: '4am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'تبسيط الجذور التربيعية إلى الشكل a√b وحل المعادلة x² = b',
	curriculumLessonId: 'lesson_4am_t1_square_roots_equations_x2_b',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const b = rng.pick([2, 3, 5, 6, 7]);

		if (difficulty === 'easy') {
			const [k1, k2, k3] = rng.pickDistinct([2, 3, 4, 5, 6, 7], 3).sort((x, y) => y - x);
			const aCoeff = k1 + k2 - k3; // >= 3 since k1 > k2 > k3
			const n1 = k1 * k1 * b;
			const n2 = k2 * k2 * b;
			const n3 = k3 * k3 * b;

			const r = rng.int(3, 9);
			const m1 = r * r;
			const m2 = rng.int(4, 25);

			const mcq = buildUniqueMcqOptions(
				`للمعادلة حلان هما $${r}$ و $-${r}$`,
				[
					{
						text: `للمعادلة حل وحيد هو $${r}$`,
						diagnosticFeedback: 'خطأ شائع: عندما يكون $b > 0$، للمعادلة $x^2 = b$ حلان متعاكسان هما $\\sqrt{b}$ و $-\\sqrt{b}$!'
					},
					{
						text: `للمعادلة حلان هما $${m1}$ و $-${m1}$`,
						diagnosticFeedback: 'نسيت أخذ الجذر التربيعي للعدد $' + m1 + '$: تحقق أن $(' + r + ')^2 = ' + m1 + '$.'
					},
					{
						text: 'المعادلة لا تقبل حلولاً حقيقية',
						diagnosticFeedback: 'العدد $' + m1 + ' > 0$ موجب تماماً، إذن المعادلة تقبل حلين حقيقيين.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `ما هي حلول المعادلة $x^2 = ${m1}$؟`,
					questionTextAr: `ما هي حلول المعادلة $x^2 = ${m1}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `بما أن $${m1} > 0$، فإن للمعادلة $x^2 = ${m1}$ حلين هما $x = \\sqrt{${m1}} = ${r}$ و $x = -\\sqrt{${m1}} = -${r}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'بسط الجذور التربيعية ثم حل المعادلتين:',
					content: [
						{
							type: 'text',
							content: `1) اكتب العبارة $A = sqrt(${n1}) + sqrt(${n2}) - sqrt(${n3})$ على الشكل $a sqrt(${b})$ حيث $a$ عدد طبيعي.`,
							answer: `1) $A = sqrt(${k1 * k1} times ${b}) + sqrt(${k2 * k2} times ${b}) - sqrt(${k3 * k3} times ${b}) = ${k1} sqrt(${b}) + ${k2} sqrt(${b}) - ${k3} sqrt(${b}) = ${aCoeff} sqrt(${b})$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) حل في مجموعة الأعداد الحقيقية المعادلتين التاليتين:\n\nأ) $x^2 = ${m1}$ \n\nب) $x^2 = -${m2}$`,
							answer: `2) أ) بما أن $${m1} > 0$، للمعادلة حلان هما $x = sqrt(${m1}) = ${r}$ و $x = -sqrt(${m1}) = -${r}$.\n\nب) بما أن $-${m2} < 0$ ومربع أي عدد حقيقي موجب دائماً ($x^2 >= 0$)، فإن المعادلة لا تقبل حلولاً حقيقية.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`أخرج مربعاً تاماً من كل جذر في $A$ بقسمة كل عدد تحت الجذر على $${b}$.`,
					'المعادلة $x^2 = b$ تقبل حلين عندما $b > 0$، وحلاً واحداً هو $0$ عندما $b = 0$، ولا حلول عندما $b < 0$.',
					`تحقق أن $(-${r})^2 = ${m1}$ وكذلك $(${r})^2 = ${m1}$.`
				],
				solutionStepsAr: [
					`تبسيط $A$: $A = ${k1}\\sqrt{${b}} + ${k2}\\sqrt{${b}} - ${k3}\\sqrt{${b}} = ${aCoeff}\\sqrt{${b}}$.`,
					`المعادلة $x^2 = ${m1}$: لها حلان هما $${r}$ و $-${r}$.`,
					`المعادلة $x^2 = -${m2}$: مستحيلة الحل لأن $-${m2} < 0$.`
				],
				finalAnswer: `${r} و -${r}`
			};
		}

		if (difficulty === 'medium') {
			const k1 = rng.int(4, 6);
			const k2 = rng.int(2, 3);
			const k3 = rng.int(2, 5);
			const c1 = rng.int(2, 3);
			const c2 = rng.int(2, 3);
			const aCoeff = c1 * k1 - c2 * k2 + k3; // >= 2*4 - 3*3 + 2 = 1; ensure >= 2
			const safeC1 = aCoeff < 2 ? c1 + 1 : c1;
			const finalACoeff = safeC1 * k1 - c2 * k2 + k3;

			const n1 = k1 * k1 * b;
			const n2 = k2 * k2 * b;
			const n3 = k3 * k3 * b;

			const [m1, m2] = rng.pickDistinct([2, 3, 4, 5], 2);
			const p1 = m1 * m1 * b;
			const p2 = m2 * m2 * b;
			const prodB = m1 * m2 * b;

			const u = rng.int(2, 5);
			const q = rng.pick([3, 5, 6, 7, 10, 11]);
			const v = u * q;

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `احسب القيمة المضبوطة للجداء $B = \\sqrt{${p1}} \\times \\sqrt{${p2}}$ واكتب الناتج في شكل عدد طبيعي.`,
					questionTextAr: `احسب الجداء $B = \\sqrt{${p1}} \\times \\sqrt{${p2}}$ (عدد طبيعي):`,
					questionData: {
						answer: prodB,
						displayTemplate: `B = ?`,
						variables: [],
						tolerance: 0
					},
					explanation: `نبسّط كل جذر: $\\sqrt{${p1}} = ${m1}\\sqrt{${b}}$ و $\\sqrt{${p2}} = ${m2}\\sqrt{${b}}$، ومنه $B = (${m1} \\times ${m2}) \\times (\\sqrt{${b}})^2 = ${m1 * m2} \\times ${b} = ${prodB}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'أنجز الحسابات على الجذور التربيعية ثم حل المعادلة:',
					content: [
						{
							type: 'text',
							content: `1) بسّط العبارة $A = ${safeC1} sqrt(${n1}) - ${c2} sqrt(${n2}) + sqrt(${n3})$ إلى الشكل $a sqrt(${b})$.`,
							answer: `1) $A = ${safeC1} times ${k1} sqrt(${b}) - ${c2} times ${k2} sqrt(${b}) + ${k3} sqrt(${b}) = (${safeC1 * k1} - ${c2 * k2} + ${k3}) sqrt(${b}) = ${finalACoeff} sqrt(${b})$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب العدد $B = sqrt(${p1}) times sqrt(${p2})$ وبيّن أنه عدد طبيعي.`,
							answer: `2) $B = ${m1} sqrt(${b}) times ${m2} sqrt(${b}) = ${m1 * m2} times (sqrt(${b}))^2 = ${m1 * m2} times ${b} = ${prodB}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حل المعادلة التالية: $${u} x^2 = ${v}$.`,
							answer: `3) $x^2 = frac(${v}, ${u}) = ${q}$. بما أن $${q} > 0$، فللمعادلة حلان هما $x = sqrt(${q})$ و $x = -sqrt(${q})$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`اكتب كل جذر على الشكل $k\\sqrt{${b}}$ ثم اجمع المعاملات.`,
					`تذكّر أن $\\sqrt{a} \\times \\sqrt{a} = (\\sqrt{a})^2 = a$ من أجل كل $a \\ge 0$.`,
					`في المعادلة $${u}x^2 = ${v}$، اقسم الطرفين أولاً على $${u}$ للحصول على الشكل $x^2 = b$.`
				],
				solutionStepsAr: [
					`تبسيط $A$: $A = ${finalACoeff}\\sqrt{${b}}$.`,
					`حساب $B$: $B = ${m1}\\sqrt{${b}} \\times ${m2}\\sqrt{${b}} = ${m1 * m2} \\times ${b} = ${prodB}$.`,
					`حل المعادلة: $x^2 = ${q}$، الحلان هما $\\sqrt{${q}}$ و $-\\sqrt{${q}}$.`
				],
				finalAnswer: `${prodB}`
			};
		}

		// hard
		const [k1, k2, k3] = rng.pickDistinct([2, 3, 4, 5, 6], 3);
		const bigK = Math.max(k1, k2);
		const smallK = Math.min(k1, k2);
		const c1 = rng.int(2, 3);
		const c2 = rng.int(2, 3);
		const aCoeff = c1 * bigK + c2 * smallK - k3; // >= 2*3 + 2*2 - 6 = 4 >= 2
		const prodP = (bigK - smallK) * b;

		const m = rng.int(2, 5);
		const q = rng.pick([2, 3, 5, 6, 7, 11]);
		const n = rng.int(1, m * q - 1);
		const pEq = m * q - n;

		const mcq = buildUniqueMcqOptions(
			`$x = \\sqrt{${q}}$ أو $x = -\\sqrt{${q}}$`,
			[
				{
					text: `$x = \\sqrt{${q}}$ فقط`,
					diagnosticFeedback: 'تنقصك الإجابة السالبة! المعادلة $x^2 = ' + q + '$ ($' + q + ' > 0$) تقبل حلين متعاكسين.'
				},
				{
					text: `$x = ${q}$ أو $x = -${q}$`,
					diagnosticFeedback: 'انتبه: هذا هو قيم $x^2$ وليس قيم $x$! يجب إدخال الجذر التربيعي.'
				},
				{
					text: `$x = \\sqrt{${m * q}}$ أو $x = -\\sqrt{${m * q}}$`,
					diagnosticFeedback: 'نسيت القسمة على معامل $x^2$ وهو $' + m + '$ قبل أخذ الجذر التربيعي!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي حلول المعادلة $${m}x^2 - ${n} = ${pEq}$؟`,
				questionTextAr: `ما هي حلول المعادلة $${m}x^2 - ${n} = ${pEq}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ننقل $-${n}$ للطرف الثاني: $${m}x^2 = ${pEq} + ${n} = ${m * q}$، ومنه $x^2 = ${q}$. بما أن $${q} > 0$، فللمعادلة حلان هما $x = \\sqrt{${q}}$ و $x = -\\sqrt{${q}}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجب عن الأسئلة التالية مبرزاً خطوات التبسيط والحل:',
				content: [
					{
						type: 'text',
						content: `1) اكتب العبارة $A = ${c1} sqrt(${bigK * bigK * b}) + ${c2} sqrt(${smallK * smallK * b}) - sqrt(${k3 * k3 * b})$ على الشكل $a sqrt(${b})$.`,
						answer: `1) $A = ${c1 * bigK} sqrt(${b}) + ${c2 * smallK} sqrt(${b}) - ${k3} sqrt(${b}) = ${aCoeff} sqrt(${b})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) بيّن أن العدد $P = (sqrt(${bigK * bigK * b}) - sqrt(${smallK * smallK * b})) times sqrt(${b})$ عدد طبيعي.`,
						answer: `2) $P = (${bigK} sqrt(${b}) - ${smallK} sqrt(${b})) times sqrt(${b}) = ${bigK - smallK} sqrt(${b}) times sqrt(${b}) = ${bigK - smallK} times ${b} = ${prodP}$، وهو عدد طبيعي.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) حل المعادلة التالية: $${m} x^2 - ${n} = ${pEq}$.`,
						answer: `3) $${m} x^2 = ${pEq} + ${n} = ${m * q}$، إذن $x^2 = ${q}$. بما أن $${q} > 0$، الحلان هما $x = sqrt(${q})$ و $x = -sqrt(${q})$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`قسّم كل عدد تحت الجذر على $${b}$ لاستخراج المربع التام.`,
				'في $P$، بسّط ما بداخل القوسين أولاً إلى الشكل $k\\sqrt{b}$ ثم اضرب في $\\sqrt{b}$.',
				`عزل $x^2$: أضف $${n}$ إلى الطرفين ثم اقسم على $${m}$.`
			],
			solutionStepsAr: [
				`تبسيط $A$: $A = ${aCoeff}\\sqrt{${b}}$.`,
				`حساب $P$: $P = (${bigK - smallK}\\sqrt{${b}}) \\times \\sqrt{${b}} = ${prodP}$.`,
				`المعادلة: $${m}x^2 = ${m * q} \\implies x^2 = ${q}$، الحلان هما $\\sqrt{${q}}$ و $-\\sqrt{${q}}$.`
			],
			finalAnswer: `x = √${q} أو x = -√${q}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Rationalizing Denominators (a + √b)/√c & Combined Radical/PGCD Calculations
// ═══════════════════════════════════════════════════════════════════════════════
const rationalizingCombinedTemplate: ParameterizedTemplate = {
	id: '4am_t1_rationalizing_combined',
	grade: '4am',
	trimesterId: 't1',
	domain: 'numeric',
	titleAr: 'تنطيق المقام (جعل مقام نسبة عدداً ناطقاً) وحساب العبارات الجذرية',
	curriculumLessonId: 'lesson_4am_t1_square_roots_operations_rationalizing',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const b = rng.pick([2, 3, 5, 7]);
			const k = rng.int(2, 6);
			const m = rng.int(2, 5);
			const n = k * b;
			const a = m * b;

			const mcq = buildUniqueMcqOptions(
				`$${m}\\sqrt{${b}} + 1$`,
				[
					{
						text: `$${m}\\sqrt{${b}} + \\sqrt{${b}}$`,
						diagnosticFeedback: 'انتبه: عند ضرب $\\sqrt{' + b + '} \\times \\sqrt{' + b + '}$ في البسط نحصل على $' + b + '$ وليس $\\sqrt{' + b + '}$!'
					},
					{
						text: `$${a}\\sqrt{${b}} + ${b}$`,
						diagnosticFeedback: 'نسيت اختزال البسط بقسمته على المقام الناطق $' + b + '$!'
					},
					{
						text: `$${m} + \\sqrt{${b}}$`,
						diagnosticFeedback: 'ضربت المقام في $\\sqrt{' + b + '}$ دون ضرب البسط كاملاً في $\\sqrt{' + b + '}$!'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `اجعل مقام النسبة $F = \\frac{${a} + \\sqrt{${b}}}{\\sqrt{${b}}}$ عدداً ناطقاً وبسّطها.`,
					questionTextAr: `ما هو الشكل المبسط للعدد $F = \\frac{${a} + \\sqrt{${b}}}{\\sqrt{${b}}}$ بعد تنطيق المقام؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نضرب البسط والمقام في $\\sqrt{${b}}$: $F = \\frac{(${a} + \\sqrt{${b}})\\sqrt{${b}}}{(\\sqrt{${b}})^2} = \\frac{${a}\\sqrt{${b}} + ${b}}{${b}} = ${m}\\sqrt{${b}} + 1$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'اكتب كل نسبة مما يلي بمقام عدد ناطق ثم بسّط:',
					content: [
						{
							type: 'text',
							content: `1) اجعل مقام النسبة $E = frac(${n}, sqrt(${b}))$ عدداً ناطقاً وبسّطها.`,
							answer: `1) $E = frac(${n} times sqrt(${b}), sqrt(${b}) times sqrt(${b})) = frac(${n} sqrt(${b}), ${b}) = ${k} sqrt(${b})$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) اجعل مقام النسبة $F = frac(${a} + sqrt(${b}), sqrt(${b}))$ عدداً ناطقاً وبيّن أن $F = ${m} sqrt(${b}) + 1$.`,
							answer: `2) $F = frac((${a} + sqrt(${b})) sqrt(${b}), (sqrt(${b}))^2) = frac(${a} sqrt(${b}) + ${b}, ${b}) = ${m} sqrt(${b}) + 1$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `3) استنتج القيمة المبسطة للمجموع $E + F$.`,
							answer: `3) $E + F = ${k} sqrt(${b}) + ${m} sqrt(${b}) + 1 = ${k + m} sqrt(${b}) + 1$.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					`لجعل مقام من الشكل $\\sqrt{${b}}$ ناطقاً، نضرب كلاً من البسط والمقام في $\\sqrt{${b}}$.`,
					'تذكّر توزيع الضرب على الجمع في البسط: $(a + \\sqrt{b})\\sqrt{b} = a\\sqrt{b} + b$.',
					`بعد توحيد المقام الناطق $${b}$، قسّم كل حد من حدي البسط على $${b}$.`
				],
				solutionStepsAr: [
					`تنطيق $E$: $E = \\frac{${n}\\sqrt{${b}}}{${b}} = ${k}\\sqrt{${b}}$.`,
					`تنطيق $F$: $F = \\frac{${a}\\sqrt{${b}} + ${b}}{${b}} = ${m}\\sqrt{${b}} + 1$.`,
					`المجموع: $E + F = ${k + m}\\sqrt{${b}} + 1$.`
				],
				finalAnswer: `${m}√${b} + 1`
			};
		}

		const m = rng.pick([10, 14, 15, 21, 22, 26, 30, 33, 35]);
		const [k1, k2] = rng.pick([
			[3, 2],
			[4, 3],
			[5, 2],
			[5, 3],
			[5, 4]
		]);
		const X = m * k1 * k1;
		const Y = m * k2 * k2;
		const steps = euclideanSteps(X, Y);

		if (difficulty === 'medium') {
			const c = rng.pick([2, 3, 5]);
			const b = rng.pick([2, 3, 5, 7].filter((v) => v !== c));
			const aCandidates = [1, 2, 3, 4, 5, 7].filter((v) => gcd(v, c) === 1);
			const a = rng.pick(aCandidates);
			const aPrefix = a === 1 ? '' : `${a}`;

			const mcq = buildUniqueMcqOptions(
				`$\\frac{${aPrefix}\\sqrt{${c}} + \\sqrt{${b * c}}}{${c}}$`,
				[
					{
						text: `$\\frac{${aPrefix}\\sqrt{${c}} + \\sqrt{${b}}}{${c}}$`,
						diagnosticFeedback: `نسيت ضرب الحد الثاني $\\sqrt{${b}}$ في $\\sqrt{${c}}$! يجب ضرب البسط بأكمله في $\\sqrt{${c}}$.`
					},
					{
						text: `$\\frac{${a} + \\sqrt{${b * c}}}{${c}}$`,
						diagnosticFeedback: `نسيت ضرب الحد الأول $${a}$ في $\\sqrt{${c}}$!`
					},
					{
						text: `$\\frac{${aPrefix}\\sqrt{${c}} + ${b}}{${c}}$`,
						diagnosticFeedback: `خطأ: $\\sqrt{${b}} \\times \\sqrt{${c}} = \\sqrt{${b * c}}$ وليس $${b}$!`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `اجعل مقام النسبة $F = \\frac{${a} + \\sqrt{${b}}}{\\sqrt{${c}}}$ عدداً ناطقاً.`,
					questionTextAr: `ما الكتابة المكافئة للنسبة $F = \\frac{${a} + \\sqrt{${b}}}{\\sqrt{${c}}}$ بمقام عدد ناطق؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `نضرب البسط والمقام في $\\sqrt{${c}}$: $F = \\frac{(${a} + \\sqrt{${b}})\\sqrt{${c}}}{(\\sqrt{${c}})^2} = \\frac{${aPrefix}\\sqrt{${c}} + \\sqrt{${b * c}}}{${c}}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تمرين يدمج تنطيق المقام والقاسم المشترك الأكبر:',
					content: [
						{
							type: 'text',
							content: `1) اكتب النسبة $F = frac(${a} + sqrt(${b}), sqrt(${c}))$ بمقام عدد ناطق.`,
							answer: `1) $F = frac((${a} + sqrt(${b})) sqrt(${c}), (sqrt(${c}))^2) = frac(${aPrefix ? aPrefix + ' ' : ''}sqrt(${c}) + sqrt(${b * c}), ${c})$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب $upright("PGCD")(${X} ; ${Y})$، ثم اختزل الكسر $frac(${X}, ${Y})$.`,
							answer: `2) ${formatEuclideanTypst(steps)}، إذن $upright("PGCD")(${X} ; ${Y}) = ${m}$، ومنه $frac(${X}, ${Y}) = frac(${k1 * k1}, ${k2 * k2})$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) بسّط العبارة $sqrt(${X}) - sqrt(${Y})$ إلى الشكل $p sqrt(q)$، ثم احسب القيمة المضبوطة للعدد $sqrt(frac(${X}, ${Y}))$.`,
							answer: `3) $sqrt(${X}) - sqrt(${Y}) = ${k1} sqrt(${m}) - ${k2} sqrt(${m}) = ${formatRadicalTypst(k1 - k2, m)}$، و $sqrt(frac(${X}, ${Y})) = sqrt(frac(${k1 * k1}, ${k2 * k2})) = frac(${k1}, ${k2})$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`اضرب كلاً من البسط والمقام في $\\sqrt{${c}}$ واستعمل $\\sqrt{${b}} \\times \\sqrt{${c}} = \\sqrt{${b * c}}$.`,
					`استعمل خوارزمية إقليدس لإيجاد $\\text{PGCD}(${X} ; ${Y}) = ${m}$.`,
					`بعد اختزال $\\frac{${X}}{${Y}}$ تحصل على كسر بسطه ومقامه مربعان تامان.`
				],
				solutionStepsAr: [
					`تنطيق $F$: $F = \\frac{${aPrefix}\\sqrt{${c}} + \\sqrt{${b * c}}}{${c}}$.`,
					`خوارزمية إقليدس: $\\text{PGCD}(${X} ; ${Y}) = ${m}$ و $\\frac{${X}}{${Y}} = \\frac{${k1 * k1}}{${k2 * k2}}$.`,
					`$\\sqrt{${X}} - \\sqrt{${Y}} = ${formatRadicalKatex(k1 - k2, m)}$ و $\\sqrt{\\frac{${X}}{${Y}}} = \\frac{${k1}}{${k2}}$.`
				],
				finalAnswer: `(${aPrefix}√${c} + √${b * c})/${c}`
			};
		}

		// hard
		const d = rng.pick([2, 3]);
		const c = rng.pick([2, 3, 5]);
		const b = rng.pick([2, 3, 5, 7].filter((v) => v !== c));
		const aCandidates = [1, 2, 3, 4, 5, 7].filter((v) => gcd(v, d * c) === 1);
		const a = rng.pick(aCandidates);
		const aPrefix = a === 1 ? '' : `${a}`;
		const natSum = k1 + k2;

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `بسّط ثم احسب القيمة المضبوطة للعدد الطبيعي $N = \\frac{\\sqrt{${X}} + \\sqrt{${Y}}}{\\sqrt{${m}}}$.`,
				questionTextAr: `احسب القيمة المضبوطة للعدد الطبيعي $N = \\frac{\\sqrt{${X}} + \\sqrt{${Y}}}{\\sqrt{${m}}}$:`,
				questionData: {
					answer: natSum,
					displayTemplate: `N = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `$\\sqrt{${X}} = ${k1}\\sqrt{${m}}$ و $\\sqrt{${Y}} = ${k2}\\sqrt{${m}}$، إذن $N = \\frac{(${k1} + ${k2})\\sqrt{${m}}}{\\sqrt{${m}}} = ${natSum}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'حلل العبارات العددية التالية مع توضيح مراحل التبسيط:',
				content: [
					{
						type: 'text',
						content: `1) احسب $upright("PGCD")(${X} ; ${Y})$، ثم اكتب العبارة $S = sqrt(${X}) + sqrt(${Y})$ على الشكل $p sqrt(q)$.`,
						answer: `1) ${formatEuclideanTypst(steps)}، إذن $upright("PGCD")(${X} ; ${Y}) = ${m}$. ومنه $S = ${k1} sqrt(${m}) + ${k2} sqrt(${m}) = ${natSum} sqrt(${m})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) اجعل مقام النسبة $D = frac(${a} + sqrt(${b}), ${d} sqrt(${c}))$ عدداً ناطقاً.`,
						answer: `2) نضرب البسط والمقام في $sqrt(${c})$: $D = frac((${a} + sqrt(${b})) sqrt(${c}), ${d} times (sqrt(${c}))^2) = frac(${aPrefix ? aPrefix + ' ' : ''}sqrt(${c}) + sqrt(${b * c}), ${d * c})$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) استنتج أن العدد $N = frac(sqrt(${X}) + sqrt(${Y}), sqrt(${m}))$ عدد طبيعي، ثم احسب قيمته.`,
						answer: `3) $N = frac(${natSum} sqrt(${m}), sqrt(${m})) = ${natSum}$ (عدد طبيعي).`,
						mark: '1'
					}
				]
			},
			hints: [
				`احسب $\\text{PGCD}(${X} ; ${Y})$ أو حلل كلاً من $${X}$ و $${Y}$ إلى جداء مربع تام في $${m}$.`,
				`لتنطيق مقام من الشكل $${d}\\sqrt{${c}}$، يكفي الضرب في $\\sqrt{${c}}$ (لا داعي للضرب في $${d}$).`,
				`عوّض $\\sqrt{${X}} + \\sqrt{${Y}}$ بالعبارة المبسطة $${natSum}\\sqrt{${m}}$ ثم اختزل بـ $\\sqrt{${m}}$.`
			],
			solutionStepsAr: [
				`تبسيط $S$: $\\text{PGCD}(${X} ; ${Y}) = ${m}$، ومنه $S = ${k1}\\sqrt{${m}} + ${k2}\\sqrt{${m}} = ${natSum}\\sqrt{${m}}$.`,
				`تنطيق $D$: $D = \\frac{${aPrefix}\\sqrt{${c}} + \\sqrt{${b * c}}}{${d * c}}$.`,
				`تعيين $N$: $N = \\frac{${natSum}\\sqrt{${m}}}{\\sqrt{${m}}} = ${natSum}$.`
			],
			finalAnswer: `${natSum}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Thalès Theorem & Converse in Triangle and Butterfly Configurations
// ═══════════════════════════════════════════════════════════════════════════════
const thalesConverseTemplate: ParameterizedTemplate = {
	id: '4am_t1_thales_converse',
	grade: '4am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'خاصية طالس والخاصية العكسية لإثبات التوازي',
	curriculumLessonId: 'lesson_4am_t1_thales_theorem_segment_division',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const [p, q] = rng.pick([
			[2, 3],
			[3, 4],
			[2, 5],
			[3, 5],
			[4, 5]
		]);
		const [u, v, w] = rng.pick([
			[3, 4, 5],
			[3, 5, 6],
			[4, 5, 6],
			[4, 5, 7],
			[5, 6, 7]
		]);

		const AB = u * q;
		const AM = u * p;
		const AC = v * q;
		const AN = v * p;
		const BC = w * q;
		const MN = w * p;

		if (difficulty === 'easy') {
			const svg = svgThalesConfig({
				mode: 'triangle',
				vertices: ['A', 'B', 'C', 'M', 'N'],
				sideLabels: {
					AM: `AM=${AM}`,
					AB: `AB=${AB}`,
					AC: `AC=${AC}`,
					AN: 'AN=?',
					BC: `BC=${BC}`,
					MN: 'MN=?'
				}
			});
			const imageUrl = saveSvgAsset(`4am_t1_thales_${difficulty}_${seed}`, svg);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `في الشكل المقابل (مثلث $ABC$)، لدينا $M \\in [AB]$ و $N \\in [AC]$ بحيث $(MN) \\parallel (BC)$، ومعطى $AM = ${AM}\\text{ cm}$، $AB = ${AB}\\text{ cm}$ و $AC = ${AC}\\text{ cm}$. احسب الطول $AN$ بالسنتيمتر.`,
					questionTextAr: `في المثلث $ABC$ المقابل، $(MN) \\parallel (BC)$، $AM = ${AM}\\text{ cm}$، $AB = ${AB}\\text{ cm}$، $AC = ${AC}\\text{ cm}$. احسب الطول $AN$:`,
					imageUrl,
					imageCaption: 'وضعية طالس (شكل المثلث)',
					questionData: {
						answer: AN,
						displayTemplate: 'AN = ? cm',
						variables: [],
						tolerance: 0.01
					},
					explanation: `بتطبيق خاصية طالس: $\\frac{AM}{AB} = \\frac{AN}{AC}$، أي $\\frac{${AM}}{${AB}} = \\frac{AN}{${AC}}$، ومنه $AN = \\frac{${AM} \\times ${AC}}{${AB}} = ${AN}\\text{ cm}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل الشكل المقابل حيث $A B C$ مثلث، $M in [A B]$ و $N in [A C]$ مع $(M N) parallel (B C)$:',
					content: [
						{
							type: 'columns',
							widths: ['1.55fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `نعطي (بوحدة السنتيمتر): $A M = ${AM}$، $A B = ${AB}$، $A C = ${AC}$ و $B C = ${BC}$.\n\n1) اكتب تساوي النسب الثلاث الناتجة عن تطبيق خاصية طالس.\n\n2) احسب الطولين $A N$ و $M N$.\n\n3) استنتج الطولين $M B$ و $N C$.`,
									answer: `1) في المثلث $A B C$، لدينا $M in [A B]$، $N in [A C]$ و $(M N) parallel (B C)$، وحسب خاصية طالس: $frac(A M, A B) = frac(A N, A C) = frac(M N, B C)$.\n\n2) $frac(${AM}, ${AB}) = frac(A N, ${AC}) = frac(M N, ${BC})$، ومنه $A N = frac(${AM} times ${AC}, ${AB}) = ${AN}$ سم، و $M N = frac(${AM} times ${BC}, ${AB}) = ${MN}$ سم.\n\n3) $M B = A B - A M = ${AB} - ${AM} = ${AB - AM}$ سم، و $N C = A C - A N = ${AC} - ${AN} = ${AC - AN}$ سم.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'شكل المثلث (طالس)'
								}
							]
						}
					]
				},
				hints: [
					'تحقق من شروط طالس: استقامية النقط $(A, M, B)$ و $(A, N, C)$ وتوازي $(MN) \\parallel (BC)$.',
					`اكتب المساواة: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.`,
					`استعمل الرابع المتناسب: $AN = \\frac{${AM} \\times ${AC}}{${AB}}$.`
				],
				solutionStepsAr: [
					'بتطبيق خاصية طالس في المثلث $ABC$: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.',
					`بالتعويض: $AN = \\frac{${AM} \\times ${AC}}{${AB}} = ${AN}\\text{ cm}$ و $MN = \\frac{${AM} \\times ${BC}}{${AB}} = ${MN}\\text{ cm}$.`,
					`نطرح: $MB = ${AB - AM}\\text{ cm}$ و $NC = ${AC - AN}\\text{ cm}$.`
				],
				finalAnswer: `${AN} cm`
			};
		}

		if (difficulty === 'medium') {
			const isConvParallel = seed % 2 === 0;
			const AE = u;
			const AF = isConvParallel ? v : v + 1;
			const svg = svgThalesConfig({
				mode: 'butterfly',
				vertices: ['A', 'B', 'C', 'M', 'N'],
				sideLabels: {
					AB: `AB=${AB}`,
					AM: `AM=${AM}`,
					BC: `BC=${BC}`,
					MN: 'MN=?'
				}
			});
			const imageUrl = saveSvgAsset(`4am_t1_thales_${difficulty}_${seed}`, svg);

			const wrongInv = roundTo((AB * BC) / AM, 2);
			const wrongSub = Math.abs(BC - (AB - AM)) === MN ? MN + 3 : Math.abs(BC - (AB - AM));
			const wrongAdd = MN + 2;

			const mcq = buildUniqueMcqOptions(
				`$${MN}\\text{ cm}$`,
				[
					{
						text: `$${wrongInv}\\text{ cm}$`,
						diagnosticFeedback: 'انتبه: قلبت الكسر في نسبة طالس! قسّم أطوال المثلث $AMN$ على نظائرها في $ABC$.'
					},
					{
						text: `$${wrongSub}\\text{ cm}$`,
						diagnosticFeedback: 'خاصية طالس تعتمد على تناسبية الأطوال (جداء وقسمة) وليس طرح الأطوال!'
					},
					{
						text: `$${wrongAdd}\\text{ cm}$`,
						diagnosticFeedback: `تحقق من الحساب: $MN = \\frac{${AM} \\times ${BC}}{${AB}}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في شكل الفراشة المقابل، المستقيمان $(BM)$ و $(CN)$ يتقاطعان في $A$، ولدينا $(MN) \\parallel (BC)$، حيث $AM = ${AM}\\text{ cm}$، $AB = ${AB}\\text{ cm}$ و $BC = ${BC}\\text{ cm}$. ما طول القطعة $[MN]$؟`,
					questionTextAr: `في شكل الفراشة المقابل حيث $(MN) \\parallel (BC)$، ما طول القطعة $[MN]$؟`,
					imageUrl,
					imageCaption: 'وضعية طالس (شكل الفراشة)',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `في وضعية الفراشة، $\\frac{AM}{AB} = \\frac{MN}{BC}$، ومنه $MN = \\frac{${AM} \\times ${BC}}{${AB}} = ${MN}\\text{ cm}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'في الشكل المقابل (شكل الفراشة)، المستقيمان $(B M)$ و $(C N)$ يتقاطعان في $A$، ومعطى $A C = ' + AC + '$ سم:',
					content: [
						{
							type: 'columns',
							widths: ['1.55fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) علماً أن $(M N) parallel (B C)$، احسب الطولين $M N$ و $A N$ بتطبيق خاصية طالس.\n\n2) نعين نقطة $E in [A B]$ حيث $A E = ${AE}$ سم، ونقطة $F in [A C]$ حيث $A F = ${AF}$ سم. هل المستقيمان $(E F)$ و $(B C)$ متوازيان؟ برّر.`,
									answer: `1) النقط $B, A, M$ و $C, A, N$ على استقامية واحدة، و $(M N) parallel (B C)$. حسب خاصية طالس: $frac(A M, A B) = frac(A N, A C) = frac(M N, B C)$، أي $frac(${AM}, ${AB}) = frac(A N, ${AC}) = frac(M N, ${BC})$.\nومنه $M N = ${MN}$ سم و $A N = ${AN}$ سم.\n\n2) نحسب النسبتين: $frac(A E, A B) = frac(${AE}, ${AB}) = frac(1, ${q})$ و $frac(A F, A C) = frac(${AF}, ${AC}) ${isConvParallel ? `= frac(1, ${q})$` : `!= frac(1, ${q})$`}.${isConvParallel ? ` بما أن $frac(A E, A B) = frac(A F, A C)$ والنقط $A, E, B$ و $A, F, C$ بنفس الترتيب، فإن $(E F) parallel (B C)$ حسب الخاصية العكسية لطالس.` : ` (لأن $${AE} times ${AC} = ${AE * AC}$ و $${AF} times ${AB} = ${AF * AB}$)، إذن $(E F)$ و $(B C)$ غير متوازيين.`}`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'شكل الفراشة (طالس)'
								}
							]
						}
					]
				},
				hints: [
					'في شكل الفراشة، انطلق دائماً من نقطة التقاطع $A$ لكتابة النسب: $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$.',
					`لحساب $MN$، استعمل الرابع المتناسب في التناسب $\\frac{${AM}}{${AB}} = \\frac{MN}{${BC}}$.`,
					'للتحقق من توازي $(EF)$ و $(BC)$، قارن النسبتين المضبوطتين $\\frac{AE}{AB}$ و $\\frac{AF}{AC}$ ثم تحقق من ترتيب النقط.'
				],
				solutionStepsAr: [
					`بتطبيق خاصية طالس: $MN = \\frac{${AM} \\times ${BC}}{${AB}} = ${MN}\\text{ cm}$ و $AN = \\frac{${AM} \\times ${AC}}{${AB}} = ${AN}\\text{ cm}$.`,
					`نقارن $\\frac{AE}{AB} = \\frac{${AE}}{${AB}} = \\frac{1}{${q}}$ مع $\\frac{AF}{AC} = \\frac{${AF}}{${AC}}$.`,
					isConvParallel
						? 'النسبتان متساويتان والنقط بنفس الترتيب، إذن $(EF) \\parallel (BC)$ بالخاصية العكسية لطالس.'
						: 'النسبتان غير متساويتين، إذن المستقيمان $(EF)$ و $(BC)$ غير متوازيين.'
				],
				finalAnswer: `${MN} cm`
			};
		}

		// hard: converse proof (50% parallel, 50% not parallel) across both triangle & butterfly
		const isParallel = seed % 2 === 0;
		const mode: 'triangle' | 'butterfly' = rng.pick(['triangle', 'butterfly']);
		const ANTest = isParallel ? AN : AN + 1;
		const svg = svgThalesConfig({
			mode,
			vertices: ['A', 'B', 'C', 'M', 'N'],
			sideLabels:
				mode === 'triangle'
					? {
							AM: `AM=${AM}`,
							AB: `AB=${AB}`,
							AN: `AN=${ANTest}`,
							AC: `AC=${AC}`
						}
					: {
							AM: `AM=${AM}`,
							AB: `AB=${AB}`
						}
		});
		const imageUrl = saveSvgAsset(`4am_t1_thales_${difficulty}_${seed}`, svg);
		const [rNum1, rDen1] = simplifyFraction(AM, AB);
		const [rNum2, rDen2] = simplifyFraction(ANTest, AC);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'true_false',
				questionText: `في الشكل المقابل (${mode === 'triangle' ? 'حالة المثلث' : 'حالة الفراشة'})، النقط $M, A, B$ و $N, A, C$ على استقامية واحدة بنفس الترتيب، حيث $AB = ${AB}\\text{ cm}$، $AM = ${AM}\\text{ cm}$، $AC = ${AC}\\text{ cm}$ و $AN = ${ANTest}\\text{ cm}$.\n\nأجب بصحيح أو خطأ: المستقيمان $(MN)$ و $(BC)$ متوازيان.`,
				questionTextAr: `في الشكل المقابل ($AB = ${AB}\\text{ cm}$، $AM = ${AM}\\text{ cm}$، $AC = ${AC}\\text{ cm}$، $AN = ${ANTest}\\text{ cm}$): المستقيمان $(MN)$ و $(BC)$ متوازيان.`,
				imageUrl,
				imageCaption: mode === 'triangle' ? 'اختبار التوازي في المثلث' : 'اختبار التوازي في شكل الفراشة',
				questionData: {
					correctAnswer: isParallel
				},
				explanation: isParallel
					? `صحيح: $\\frac{AM}{AB} = \\frac{${AM}}{${AB}} = \\frac{${rNum1}}{${rDen1}}$ و $\\frac{AN}{AC} = \\frac{${ANTest}}{${AC}} = \\frac{${rNum2}}{${rDen2}}$، والنقط بنفس الترتيب، إذن $(MN) \\parallel (BC)$ حسب الخاصية العكسية لطالس.`
					: `خطأ: $\\frac{AM}{AB} = \\frac{${rNum1}}{${rDen1}}$ بينما $\\frac{AN}{AC} = \\frac{${rNum2}}{${rDen2}}$ (بالمقص: $${AM} \\times ${AC} = ${AM * AC} \\neq ${ANTest * AB} = ${ANTest} \\times ${AB}$)، إذن $(MN)$ و $(BC)$ غير متوازيين.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction:
					mode === 'triangle'
						? 'في المثلث $A B C$ المقابل، $M in [A B]$ و $N in [A C]$، ومعطى $A M = ' +
							AM +
							'$ سم، $A B = ' +
							AB +
							'$ سم، $A N = ' +
							ANTest +
							'$ سم و $A C = ' +
							AC +
							'$ سم:'
						: 'في الشكل المقابل (شكل الفراشة)، المستقيمان $(B M)$ و $(C N)$ يتقاطعان في $A$، حيث $A M = ' +
							AM +
							'$ سم، $A B = ' +
							AB +
							'$ سم، $A N = ' +
							ANTest +
							'$ سم و $A C = ' +
							AC +
							'$ سم:',
				content: [
					{
						type: 'columns',
						widths: ['1.55fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب النسبتين $frac(A M, A B)$ و $frac(A N, A C)$ على شكل كسرين غير قابلين للاختزال.\n\n2) استنتج هل المستقيمان $(M N)$ و $(B C)$ متوازيان أم لا، مع التبرير.\n\n3) ${isParallel ? `علماً أن $B C = ${BC}$ سم، احسب الطول $M N$.` : `ما الطول $A N'$ الذي يجب أن تأخذه النقطة $N'$ على ${mode === 'triangle' ? '$[A C]$' : 'نصف المستقيم $[A N)$'} حتى يتحقق التوازي $(M N') parallel (B C)$؟`}`,
								answer: `1) $frac(A M, A B) = frac(${AM}, ${AB}) = frac(${rNum1}, ${rDen1})$ و $frac(A N, A C) = frac(${ANTest}, ${AC}) = frac(${rNum2}, ${rDen2})$.\n\n2) ${isParallel ? `بما أن $frac(A M, A B) = frac(A N, A C)$ والنقط ${mode === 'triangle' ? '$A, M, B$ و $A, N, C$' : '$M, A, B$ و $N, A, C$'} على استقامية وبنفس الترتيب، فإن $(M N) parallel (B C)$ حسب الخاصية العكسية لخاصية طالس.` : `بما أن $frac(A M, A B) != frac(A N, A C)$ (لأن $${AM} times ${AC} = ${AM * AC} != ${ANTest * AB}$)، فإن المستقيمين $(M N)$ و $(B C)$ غير متوازيين.`}\n\n3) ${isParallel ? `بتطبيق خاصية طالس: $frac(M N, ${BC}) = frac(${rNum1}, ${rDen1})$ ومنه $M N = ${MN}$ سم.` : `نحل التناسب $frac(A N', ${AC}) = frac(${rNum1}, ${rDen1})$ فنجد $A N' = ${AN}$ سم.`}`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: mode === 'triangle' ? 'شكل المثلث' : 'شكل الفراشة'
							}
						]
					}
				]
			},
			hints: [
				'اختزل كلا الكسرين $\\frac{AM}{AB}$ و $\\frac{AN}{AC}$ أو استعمل الجداء المتصالب دون تقريب.',
				'للإثبات بالخاصية العكسية لطالس يجب ذكر شرطين: تساوي نسبتين مضبوطتين + استقامية وترتيب النقط.',
				isParallel
					? 'بعد إثبات التوازي، استعمل خاصية طالس المباشرة لحساب $MN$.'
					: `لتحقيق التوازي، نضع $\\frac{AN'}{${AC}} = \\frac{${rNum1}}{${rDen1}}$.`
			],
			solutionStepsAr: [
				`النسبتان: $\\frac{AM}{AB} = \\frac{${rNum1}}{${rDen1}}$ و $\\frac{AN}{AC} = \\frac{${rNum2}}{${rDen2}}$.`,
				isParallel
					? 'النسبتان متساويتان والنقط بنفس الترتيب، إذن $(MN) \\parallel (BC)$.'
					: 'النسبتان مختلفتان، إذن $(MN)$ و $(BC)$ غير متوازيين.',
				isParallel
					? `طول القطعة $MN = \\frac{${rNum1} \\times ${BC}}{${rDen1}} = ${MN}\\text{ cm}$.`
					: `الطول المطلوب لتحقيق التوازي هو $AN' = ${AN}\\text{ cm}$.`
			],
			finalAnswer: isParallel ? 'صحيح (متوازيان)' : 'خطأ (غير متوازيين)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Trigonometry in Right Triangle (sin, cos, tan) & Trig Identities
// ═══════════════════════════════════════════════════════════════════════════════
const trigonometryRightTriangleTemplate: ParameterizedTemplate = {
	id: '4am_t1_trigonometry_right_triangle',
	grade: '4am',
	trimesterId: 't1',
	domain: 'geometry',
	titleAr: 'النسب المثلثية في المثلث القائم والعلاقتان المثلثيتان',
	curriculumLessonId: 'lesson_4am_t1_trigonometry_sin_cos_tan_identities',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const triples: [number, number, number][] = [
			[3, 4, 5],
			[4, 3, 5],
			[5, 12, 13],
			[12, 5, 13],
			[8, 15, 17],
			[15, 8, 17],
			[7, 24, 25]
		];

		if (difficulty === 'easy') {
			const [u, v, w] = rng.pick([
				[3, 4, 5],
				[4, 3, 5],
				[5, 12, 13],
				[12, 5, 13]
			]);
			const k = rng.pick([1, 2]);
			const AB = k * u;
			const AC = k * v;
			const BC = k * w;
			const degB = Math.round((Math.atan2(v, u) * 180) / Math.PI);

			const svg = svgTriangle({
				rightAngleAtA: true,
				labels: ['A', 'B', 'C'],
				sideAB: `${AB} cm`,
				sideAC: `${AC} cm`,
				sideBC: '?'
			});
			const imageUrl = saveSvgAsset(`4am_t1_trig_${difficulty}_${seed}`, svg);

			const mcq = buildUniqueMcqOptions(
				`$\\frac{${v}}{${w}}$`,
				[
					{
						text: `$\\frac{${u}}{${w}}$`,
						diagnosticFeedback: 'هذه قيمة $\\cos \\widehat{B}$ (المجاور على الوتر)، أما $\\sin \\widehat{B}$ فهو المقابل $[AC]$ على الوتر $[BC]$.'
					},
					{
						text: `$\\frac{${v}}{${u}}$`,
						diagnosticFeedback: 'هذه قيمة $\\tan \\widehat{B}$ (المقابل على المجاور) وليست $\\sin \\widehat{B}$!'
					},
					{
						text: `$\\frac{${w}}{${v}}$`,
						diagnosticFeedback: 'تذكّر أن $0 < \\sin \\widehat{B} < 1$ دائماً لأن الوتر هو أطول ضلع في المثلث القائم.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `في المثلث $ABC$ القائم في $A$ المقابل، لدينا $AB = ${AB}\\text{ cm}$، $AC = ${AC}\\text{ cm}$ و $BC = ${BC}\\text{ cm}$. ما هي القيمة المضبوطة لـ $\\sin \\widehat{B}$؟`,
					questionTextAr: `في المثلث القائم $ABC$ في $A$ ($AB = ${AB}\\text{ cm}$، $AC = ${AC}\\text{ cm}$، $BC = ${BC}\\text{ cm}$)، ما هي القيمة المضبوطة لـ $\\sin \\widehat{B}$؟`,
					imageUrl,
					imageCaption: 'مثلث ABC قائم في A',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الضلع المقابل للزاوية $\\widehat{B}$ هو $[AC] = ${AC}\\text{ cm}$ والوتر هو $[BC] = ${BC}\\text{ cm}$، إذن $\\sin \\widehat{B} = \\frac{AC}{BC} = \\frac{${AC}}{${BC}} = \\frac{${v}}{${w}}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'تأمّل المثلث $A B C$ القائم في $A$ الموضح في الشكل المقابل:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `نعطي $A B = ${AB}$ سم و $A C = ${AC}$ سم.\n\n1) احسب طول الوتر $B C$ بتطبيق خاصية فيثاغورس.\n\n2) احسب القيم المضبوطة لـ $sin hat(B)$ و $cos hat(B)$ و $tan hat(B)$ على شكل كسور غير قابلة للاختزال.\n\n3) استنتج قيس الزاوية $hat(B)$ مدوراً إلى الوحدة بالدرجة.`,
									answer: `1) المثلث $A B C$ قائم في $A$، وحسب خاصية فيثاغورس: $B C^2 = A B^2 + A C^2 = ${AB}^2 + ${AC}^2 = ${AB * AB + AC * AC}$، ومنه $B C = sqrt(${BC * BC}) = ${BC}$ سم.\n\n2) $sin hat(B) = frac(A C, B C) = frac(${v}, ${w})$، $cos hat(B) = frac(A B, B C) = frac(${u}, ${w})$، $tan hat(B) = frac(A C, A B) = frac(${v}, ${u})$.\n\n3) باستعمال الحاسبة (وضع DEG) نجد $hat(B) approx ${degB}°$.`,
									mark: '3'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'المثلث القائم ABC'
								}
							]
						}
					]
				},
				hints: [
					'احسب أولاً الوتر $BC = \\sqrt{AB^2 + AC^2}$.',
					'للزاوية $\\widehat{B}$: الضلع المقابل هو $[AC]$، المجاور هو $[AB]$، والوتر هو $[BC]$.',
					'احرص على ضبط الآلة الحاسبة على وضع الدرجات (**DEG**) عند حساب قيس الزاوية.'
				],
				solutionStepsAr: [
					`فيثاغورس: $BC^2 = ${AB}^2 + ${AC}^2 = ${BC * BC} \\implies BC = ${BC}\\text{ cm}$.`,
					`$\\sin \\widehat{B} = \\frac{${v}}{${w}}$، $\\cos \\widehat{B} = \\frac{${u}}{${w}}$، $\\tan \\widehat{B} = \\frac{${v}}{${u}}$.`,
					`بوضع DEG في الحاسبة: $\\widehat{B} \\approx ${degB}^\\circ$.`
				],
				finalAnswer: `${v}/${w}`
			};
		}

		if (difficulty === 'medium') {
			const FG = rng.pick([8, 10, 12, 14, 15, 16, 20]);
			const theta = rng.pick([28, 32, 35, 38, 42, 48, 52, 55, 58, 62]);
			const rad = (theta * Math.PI) / 180;
			const EF = roundTo(FG * Math.sin(rad), 1);
			const EG = roundTo(FG * Math.cos(rad), 1);

			const [u, v, w] = rng.pick(triples);

			const svg = svgTriangle({
				rightAngleAtA: true,
				labels: ['E', 'F', 'G'],
				sideBC: `${FG} cm`,
				angleLabels: [undefined, undefined, `${theta}°`]
			});
			const imageUrl = saveSvgAsset(`4am_t1_trig_${difficulty}_${seed}`, svg);

			const mcq = buildUniqueMcqOptions(
				`$\\frac{${v}}{${w}}$`,
				[
					{
						text: `$\\frac{${v * v}}{${w * w}}$`,
						diagnosticFeedback: 'هذه قيمة $\\sin^2 x$ وليست $\\sin x$! لا تنسَ أخذ الجذر التربيعي.'
					},
					{
						text: `$\\frac{${w - u}}{${w}}$`,
						diagnosticFeedback: 'خطأ: العلاقة هي $\\cos^2 x + \\sin^2 x = 1$ (مع التربيع)، وليس $\\cos x + \\sin x = 1$!'
					},
					{
						text: `$\\frac{${w}}{${v}}$`,
						diagnosticFeedback: 'جيب زاوية حادة يكون دائماً أصغر من $1$ ($0 < \\sin x < 1$).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '4am',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `ليكن $x$ قيس زاوية حادة بحيث $\\cos x = \\frac{${u}}{${w}}$. باستعمال العلاقة $\\cos^2 x + \\sin^2 x = 1$، ما هي القيمة المضبوطة لـ $\\sin x$؟`,
					questionTextAr: `إذا كان $x$ قيس زاوية حادة و $\\cos x = \\frac{${u}}{${w}}$، فما القيمة المضبوطة لـ $\\sin x$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `$\\sin^2 x = 1 - \\left(\\frac{${u}}{${w}}\\right)^2 = 1 - \\frac{${u * u}}{${w * w}} = \\frac{${v * v}}{${w * w}}$. بما أن $\\sin x > 0$، فإن $\\sin x = \\frac{${v}}{${w}}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: 'يتكوّن هذا التمرين من جزأين مستقلين:',
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) في المثلث $E F G$ القائم في $E$ المقابل، $F G = ${FG}$ سم و $hat(G) = ${theta}°$. احسب الطولين $E F$ و $E G$ مدورين إلى $0.1$ سم.`,
									answer: `1) $E F = F G times sin(${theta}°) = ${FG} times sin(${theta}°) approx ${EF}$ سم، و $E G = F G times cos(${theta}°) = ${FG} times cos(${theta}°) approx ${EG}$ سم.`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: imageUrl,
									caption: 'المثلث القائم EFG'
								}
							]
						},
						{
							type: 'text',
							content: `2) ليكن $x$ قيس زاوية حادة بحيث $cos x = frac(${u}, ${w})$. باستعمال العلاقتين المثلثيتين، احسب القيمة المضبوطة لكل من $sin x$ و $tan x$.`,
							answer: `2) لدينا $cos^2 x + sin^2 x = 1$، ومنه $sin^2 x = 1 - (frac(${u}, ${w}))^2 = 1 - frac(${u * u}, ${w * w}) = frac(${v * v}, ${w * w})$.\n\nبما أن $x$ زاوية حادة ($sin x > 0$)، فإن $sin x = frac(${v}, ${w})$.\n\nثم $tan x = frac(sin x, cos x) = frac(${v} slash ${w}, ${u} slash ${w}) = frac(${v}, ${u})$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'لإيجاد ضلع في مثلث قائم بمعلومية الوتر والزاوية الحادة $x$: طول الضلع المقابل يساوي الوتر مضروباً في $\\sin x$ وطول الضلع المجاور يساوي الوتر مضروباً في $\\cos x$.',
					'عوّض قيمة $\\cos x$ في $\\cos^2 x + \\sin^2 x = 1$ واحسب $\\sin^2 x$ قبل أخذ الجذر التربيعي.',
					'احسب $\\tan x$ من العلاقة $\\tan x = \\frac{\\sin x}{\\cos x}$.'
				],
				solutionStepsAr: [
					`$EF = ${FG} \\times \\sin ${theta}^\\circ \\approx ${EF}\\text{ cm}$ و $EG = ${FG} \\times \\cos ${theta}^\\circ \\approx ${EG}\\text{ cm}$.`,
					`$\\sin^2 x = 1 - \\frac{${u * u}}{${w * w}} = \\frac{${v * v}}{${w * w}} \\implies \\sin x = \\frac{${v}}{${w}}$.`,
					`$\\tan x = \\frac{\\sin x}{\\cos x} = \\frac{${v}}{${u}}$.`
				],
				finalAnswer: `${v}/${w}`
			};
		}

		// hard
		const [u, v, w] = rng.pick(triples);
		const k = rng.pick([2, 3, 4]);
		const AB = k * u;
		const AC = k * v;
		const BC = k * w;
		const degB = Math.round((Math.atan2(v, u) * 180) / Math.PI);

		const svg = svgTriangle({
			rightAngleAtA: true,
			labels: ['A', 'B', 'C'],
			sideAB: '?',
			sideAC: '?',
			sideBC: `${BC} cm`,
			angleLabels: [undefined, 'B']
		});
		const imageUrl = saveSvgAsset(`4am_t1_trig_${difficulty}_${seed}`, svg);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `في المثلث $ABC$ القائم في $A$ المقابل، طول الوتر $BC = ${BC}\\text{ cm}$ وجيب الزاوية الحادة $\\widehat{B}$ هو $\\sin \\widehat{B} = \\frac{${v}}{${w}}$. باستعمال العلاقة $\\cos^2 \\widehat{B} + \\sin^2 \\widehat{B} = 1$ ثم نسبة جيب التمام، احسب الطول المضبوط للضلع $AB$ بالسنتيمتر.`,
				questionTextAr: `مثلث $ABC$ قائم في $A$ حيث $BC = ${BC}\\text{ cm}$ و $\\sin \\widehat{B} = \\frac{${v}}{${w}}$. احسب الطول المضبوط $AB$ بالسنتيمتر:`,
				imageUrl,
				imageCaption: 'المثلث القائم ABC',
				questionData: {
					answer: AB,
					displayTemplate: 'AB = ? cm',
					variables: [],
					tolerance: 0
				},
				explanation: `نحسب $\\cos^2 \\widehat{B} = 1 - \\frac{${v * v}}{${w * w}} = \\frac{${u * u}}{${w * w}}$ ومنه $\\cos \\widehat{B} = \\frac{${u}}{${w}}$. ثم $AB = BC \\times \\cos \\widehat{B} = ${BC} \\times \\frac{${u}}{${w}} = ${AB}\\text{ cm}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'ليكن $A B C$ مثلثاً قائماً في $A$ حيث $B C = ' + BC + '$ سم و $sin hat(B) = frac(' + v + ', ' + w + ')$:',
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) باستعمال العلاقتين المثلثيتين، احسب القيمة المضبوطة لكل من $cos hat(B)$ و $tan hat(B)$.\n\n2) استنتج الطولين المضبوطين $A B$ و $A C$ بالسنتيمتر.\n\n3) احسب قيس الزاوية $hat(B)$ مدوراً إلى الوحدة بالدرجة.`,
								answer: `1) $cos^2 hat(B) = 1 - sin^2 hat(B) = 1 - frac(${v * v}, ${w * w}) = frac(${u * u}, ${w * w})$، ولأن $hat(B)$ حادة فإن $cos hat(B) = frac(${u}, ${w})$.\nومنه $tan hat(B) = frac(sin hat(B), cos hat(B)) = frac(${v}, ${u})$.\n\n2) $A B = B C times cos hat(B) = ${BC} times frac(${u}, ${w}) = ${AB}$ سم، و $A C = B C times sin hat(B) = ${BC} times frac(${v}, ${w}) = ${AC}$ سم.\n\n3) باستعمال الحاسبة (وضع DEG): $hat(B) approx ${degB}°$.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'المثلث القائم ABC'
							}
						]
					}
				]
			},
			hints: [
				'استعمل أولاً $\\cos^2 \\widehat{B} + \\sin^2 \\widehat{B} = 1$ لإيجاد القيمة المضبوطة لـ $\\cos \\widehat{B}$.',
				'في المثلث القائم في $A$، لدينا $AB = BC \\times \\cos \\widehat{B}$ و $AC = BC \\times \\sin \\widehat{B}$.',
				`تحقّق أن $AB^2 + AC^2 = ${AB}^2 + ${AC}^2 = ${BC}^2 = BC^2$.`
			],
			solutionStepsAr: [
				`$\\cos \\widehat{B} = \\sqrt{1 - \\left(\\frac{${v}}{${w}}\\right)^2} = \\frac{${u}}{${w}}$ و $\\tan \\widehat{B} = \\frac{${v}}{${u}}$.`,
				`$AB = ${BC} \\times \\frac{${u}}{${w}} = ${AB}\\text{ cm}$ و $AC = ${BC} \\times \\frac{${v}}{${w}} = ${AC}\\text{ cm}$.`,
				`قيس الزاوية $\\widehat{B} \\approx ${degB}^\\circ$.`
			],
			finalAnswer: `${AB} cm`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. T1 BEM Integration Situation (الوضعية الإدماجية - 8 pts)
//    Combines: Right-Triangle Trig + Thalès + PGCD Equal Perimeter Trees
// ═══════════════════════════════════════════════════════════════════════════════
const integrationT1Template: ParameterizedTemplate = {
	id: '4am_t1_integration',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: حصيلة الفصل الأول (هندسة فلاحية ومعمارية)',
	curriculumLessonId: 'lesson_4am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const [u, v, w] = rng.pick([
			[3, 4, 5],
			[4, 3, 5],
			[5, 12, 13],
			[12, 5, 13],
			[8, 15, 17]
		]);
		const [p, q] = rng.pick([
			[2, 3],
			[3, 4],
			[2, 5],
			[3, 5],
			[4, 5]
		]);
		const t = rng.pick([2, 3]);
		const g = q * t; // PGCD(AB, AC) = g and divides BC too!

		const AB = g * u;
		const AC = g * v;
		const BC = g * w;
		const BM = p * t * u;
		const MN = p * t * v;
		const BN = p * t * w;

		const areaABC = (AB * AC) / 2;
		const areaBMN = (BM * MN) / 2;
		const areaTrap = areaABC - areaBMN;

		const [tanNum, tanDen] = simplifyFraction(v, u);
		const degB = Math.round((Math.atan2(v, u) * 180) / Math.PI);

		const stepsPgcd = euclideanSteps(AB, AC);
		const perim = AB + AC + BC;
		const nTrees = u + v + w; // perim / g

		const treePrice = rng.priceDA(800, 1800, 100);
		const pipePrice = rng.priceDA(400, 900, 50);
		const treesCost = nTrees * treePrice;
		const pipeCost = MN * pipePrice;
		const totalCost = treesCost + pipeCost;

		const svg = buildIntegrationPlotSvg({
			abLabel: `AB = ${AB} m`,
			acLabel: `AC = ${AC} m`,
			bcLabel: `BC = ?`,
			bmLabel: `BM = ${BM} m`,
			mnLabel: 'MN = ?',
			ratio: p / q
		});
		const imageUrl = saveSvgAsset(`4am_t1_integration_${difficulty}_${seed}`, svg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${MN} m`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يملك فلاح قطعة أرض مثلثة الشكل $ABC$ قائمة في $A$ حيث $AB = ${AB}\\text{ m}$ و $AC = ${AC}\\text{ m}$. لري جزء من الحقل، مدّ قناة $[MN]$ موازية لـ $[AC]$ حيث $M \\in [AB]$ على بُعد $BM = ${BM}\\text{ m}$ و $N \\in [BC]$. احسب طول القناة $MN$ بالمتر.`,
				questionTextAr: `قطعة أرض $ABC$ قائمة في $A$ ($AB = ${AB}\\text{ m}$، $AC = ${AC}\\text{ m}$). القناة $[MN] \\parallel [AC]$ مع $BM = ${BM}\\text{ m}$. احسب طول $MN$ بالمتر:`,
				imageUrl,
				imageCaption: `مخطط القطعة الفلاحية ABC (${AB}m × ${AC}m)`,
				questionData: {
					answer: MN,
					displayTemplate: 'MN = ? m',
					variables: [],
					tolerance: 0
				},
				explanation: `بتطبيق خاصية طالس في المثلث $ABC$ انطلاقاً من $B$ (بما أن $(MN) \\parallel (AC)$): $\\frac{BM}{BA} = \\frac{MN}{AC}$، ومنه $MN = \\frac{${BM} \\times ${AC}}{${AB}} = ${MN}\\text{ m}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${nTrees} شجرة`;
			quizQuestion = {
				type: 'calculated',
				questionText: `حقل مثلث الشكل أبعاده $AB = ${AB}\\text{ m}$، $AC = ${AC}\\text{ m}$ و $BC = ${BC}\\text{ m}$. يريد الفلاح غرس أشجار زيتون على كامل محيط المثلث بمسافات متساوية وأكبر ما يمكن ($d = \\text{PGCD}(${AB} ; ${AC} ; ${BC})$)، مع وضع شجرة عند كل رأس من الرؤوس الثلاثة. ما هو العدد الإجمالي للأشجار اللازمة؟`,
				questionTextAr: `مثلث أبعاده $${AB}\\text{ m}$، $${AC}\\text{ m}$، $${BC}\\text{ m}$. نغرس أشجاراً حول المحيط بأكبر مسافة متساوية صحيحة $d$ (مع شجرة في كل رأس). ما عدد الأشجار؟`,
				imageUrl,
				imageCaption: `محيط الحقل ABC (${AB}m + ${AC}m + ${BC}m)`,
				questionData: {
					answer: nTrees,
					displayTemplate: 'عدد الأشجار = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `أكبر مسافة متساوية هي $d = \\text{PGCD}(${AB} ; ${AC}) = ${g}\\text{ m}$ (وهي تقسم أيضاً $BC = ${BC}$). المحيط $P = ${AB} + ${AC} + ${BC} = ${perim}\\text{ m}$، إذن عدد الأشجار $= \\frac{${perim}}{${g}} = ${nTrees}$ شجرة.`
			};
		} else {
			const wrongPlusThree = (nTrees + 3) * treePrice + pipeCost;
			const wrongUseBM = treesCost + BM * pipePrice;
			const wrongTreesOnly = treesCost;
			const mcq = buildUniqueMcqOptions(
				`$${totalCost}\\text{ DA}$`,
				[
					{
						text: `$${wrongPlusThree}\\text{ DA}$`,
						diagnosticFeedback: 'انتبه: على محيط مغلق (مضلع)، عدد الأشجار يساوي المحيط مقسوماً على المسافة $d$ دون إضافة $3$ رؤوس!'
					},
					{
						text: `$${wrongUseBM}\\text{ DA}$`,
						diagnosticFeedback: 'تحقق من طول قناة الري: يجب ضرب السعر في $MN = ' + MN + '\\text{ m}$ وليس في $BM = ' + BM + '\\text{ m}$!'
					},
					{
						text: `$${wrongTreesOnly}\\text{ DA}$`,
						diagnosticFeedback: 'هذا ثمن الأشجار فقط! نسيت إضافة تكلفة قناة الري $[MN]$.'
					}
				],
				rng
			);
			finalAnswer = `${totalCost} DA`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في القطعة المثلثة $ABC$ القائمة في $A$ ($AB = ${AB}\\text{ m}$، $AC = ${AC}\\text{ m}$، $BC = ${BC}\\text{ m}$)، مدّ الفلاح قناة ري $[MN] \\parallel [AC]$ ($BM = ${BM}\\text{ m}$) بسعر $${pipePrice}\\text{ DA/m}$، وغرس أشجار زيتون حول المحيط كله بأكبر مسافة متساوية $d$ بسعر $${treePrice}\\text{ DA}$ للشجرة. ما التكلفة الإجمالية للمشروع؟`,
				questionTextAr: `ما هي التكلفة الإجمالية لغرس الأشجار حول محيط $ABC$ ($d = \\text{PGCD}$) ومدّ القناة $[MN] \\parallel [AC]$؟`,
				imageUrl,
				imageCaption: `المشروع الفلاحي في القطعة ABC`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `طول القناة $MN = \\frac{${BM} \\times ${AC}}{${AB}} = ${MN}\\text{ m}$ (تكلفتها $${pipeCost}\\text{ DA}$). أكبر مسافة $d = \\text{PGCD}(${AB}; ${AC}) = ${g}\\text{ m}$، وعدد الأشجار $= \\frac{${perim}}{${g}} = ${nTrees}$ (تكلفتها $${treesCost}\\text{ DA}$). المجموع $= ${totalCost}\\text{ DA}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction:
					'يملك فلاح قطعة أرض فلاحية على شكل مثلث $A B C$ قائم في $A$ حيث $A B = ' +
					AB +
					'$ م و $A C = ' +
					AC +
					'$ م (انظر المخطط المقابل).',
				content: [
					{
						type: 'columns',
						widths: ['1.55fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (فيثاغورس وحساب المثلثات):\n\n1) احسب الطول $B C$ بتطبيق خاصية فيثاغورس.\n\n2) احسب القيمة المضبوطة لـ $tan hat(B)$ على شكل كسر مختزل، ثم استنتج قيس الزاوية $hat(B)$ مدوراً إلى الدرجة.`,
								answer: `الجزء الأول:\n\n1) المثلث $A B C$ قائم في $A$، وحسب فيثاغورس: $B C^2 = A B^2 + A C^2 = ${AB}^2 + ${AC}^2 = ${BC * BC}$، ومنه $B C = ${BC}$ م.\n\n2) $tan hat(B) = frac(A C, A B) = frac(${AC}, ${AB}) = ${formatFracTypst(tanNum, tanDen)}$، وبالحاسبة (وضع DEG) نجد $hat(B) approx ${degB}°$.`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'مخطط القطعة الفلاحية ABC'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (خاصية طالس والمساحة):\n\nلتقسيم الحقل إلى منطقة للخضر ($B M N$) ومنطقة للأشجار ($A M N C$)، مدّ الفلاح قناة ري مستقيمة $[M N]$ موازية لـ $[A C]$ حيث $M in [A B]$ على بُعد $B M = ${BM}$ م و $N in [B C]$.\n\n1) احسب طول القناة $M N$ والمسافة $B N$ بتطبيق خاصية طالس.\n\n2) احسب مساحة المنطقة المخصصة للخضر $B M N$ (المثلث قائم في $M$ لأن $(M N) parallel (A C) perp (A B)$) ثم استنتج مساحة المنطقة المتبقية $A M N C$.`,
						answer: `الجزء الثاني:\n\n1) في المثلث $A B C$، لدينا $M in [A B]$، $N in [B C]$ و $(M N) parallel (A C)$. بتطبيق خاصية طالس من $B$: $frac(B M, B A) = frac(B N, B C) = frac(M N, A C)$، أي $frac(${BM}, ${AB}) = frac(B N, ${BC}) = frac(M N, ${AC})$.\nومنه: $M N = frac(${BM} times ${AC}, ${AB}) = ${MN}$ م، و $B N = frac(${BM} times ${BC}, ${AB}) = ${BN}$ م.\n\n2) مساحة الخضر: $cal(A)_(B M N) = frac(${BM} times ${MN}, 2) = ${areaBMN}$ م².\nالمساحة الكلية: $cal(A)_(A B C) = frac(${AB} times ${AC}, 2) = ${areaABC}$ م²، ومنه مساحة $A M N C = ${areaABC} - ${areaBMN} = ${areaTrap}$ م².`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `الجزء الثالث (القاسم المشترك الأكبر والميزانية):\n\nيريد الفلاح غرس أشجار زيتون على كامل محيط المثلث $A B C$ بمسافة متساوية $d$ (عدد طبيعي بالمتر) وأكبر ما يمكن، مع وضع شجرة عند كل رأس ($A$ و $B$ و $C$).\n\n1) احسب أكبر مسافة $d$ ممكنة باستعمال $upright("PGCD")(${AB} ; ${AC})$، وتحقّق أنها تقسم $B C$ أيضاً.\n\n2) احسب عدد الأشجار اللازمة حول المحيط، ثم احسب التكلفة الإجمالية للمشروع علماً أن سعر الشجرة الواحدة $${treePrice}$ دج وسعر المتر الواحد من قناة الري $[M N]$ هو $${pipePrice}$ دج.`,
						answer: `الجزء الثالث:\n\n1) بخوارزمية إقليدس: ${formatEuclideanTypst(stepsPgcd)}، إذن $upright("PGCD")(${AB} ; ${AC}) = ${g}$ م. وبما أن $B C = ${BC} = ${g} times ${w}$، فإن $d = ${g}$ م تقسم الأضلاع الثلاثة وهي أكبر مسافة متساوية ممكنة.\n\n2) محيط المثلث $P = ${AB} + ${AC} + ${BC} = ${perim}$ م، إذن عدد الأشجار $= ${perim} div ${g} = ${nTrees}$ شجرة.\nتكلفة الأشجار: $${nTrees} times ${treePrice} = ${treesCost}$ دج.\nتكلفة القناة $[M N]$: $${MN} times ${pipePrice} = ${pipeCost}$ دج.\nالتكلفة الإجمالية: $${treesCost} + ${pipeCost} = ${totalCost}$ دج.`,
						mark: '3'
					}
				]
			},
			hints: [
				`في الجزء الأول، احسب الوتر $BC = \\sqrt{${AB}^2 + ${AC}^2}$ ثم استعمل $\\tan \\widehat{B} = \\frac{AC}{AB}$.`,
				'في الجزء الثاني، طبّق خاصية طالس من الرأس $B$: $\\frac{BM}{BA} = \\frac{MN}{AC} = \\frac{BN}{BC}$.',
				`في الجزء الثالث، أكبر مسافة تساوي $\\text{PGCD}(${AB} ; ${AC} ; ${BC}) = ${g}\\text{ m}$، وعدد الأشجار حول مضلع مغلق يساوي المحيط مقسوماً على $d$.`
			],
			solutionStepsAr: [
				`الجزء 1: $BC = ${BC}\\text{ m}$، و $\\tan \\widehat{B} = ${formatFracKatex(tanNum, tanDen)}$، ومنه $\\widehat{B} \\approx ${degB}^\\circ$.`,
				`الجزء 2: بطالس $MN = ${MN}\\text{ m}$ و $BN = ${BN}\\text{ m}$، ومساحة $BMN$ تساوي $${areaBMN}\\text{ m}^2$ والمتبقي $${areaTrap}\\text{ m}^2$.`,
				`الجزء 3: $d = \\text{PGCD}(${AB}; ${AC}) = ${g}\\text{ m}$، عدد الأشجار $= ${perim} \\div ${g} = ${nTrees}$، والتكلفة الإجمالية $= ${treesCost} + ${pipeCost} = ${totalCost}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

export const TEMPLATES_4AM_T1: ParameterizedTemplate[] = [
	pgcdIrreducibleFractionTemplate,
	squareRootsEquationsTemplate,
	rationalizingCombinedTemplate,
	thalesConverseTemplate,
	trigonometryRightTriangleTemplate,
	integrationT1Template
];
