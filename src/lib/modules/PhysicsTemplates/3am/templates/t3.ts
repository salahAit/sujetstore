import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	svgPhysicsCurvePlot,
	wrapPhysicsSvg
} from '../../svg-physics';

// ─── Helper SVG Builders for 3AM T3 ──────────────────────────────────────────

function svgPrismAndRvb(opts: {
	mode: 'prism' | 'rvb';
	highlightLabel?: string;
}): string {
	const w = 360;
	const h = 195;
	if (opts.mode === 'prism') {
		let body = `<rect x="6" y="6" width="348" height="183" rx="10" fill="#0f172a"/>`;
		body += `<text x="180" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">تحليل الضوء الأبيض بواسطة الموشور الزجاجي</text>`;
		body += `<line x1="20" y1="108" x2="128" y2="88" stroke="#ffffff" stroke-width="3.2"/>`;
		body += `<text x="64" y="82" text-anchor="middle" font-size="10.5" fill="#e2e8f0">ضوء أبيض</text>`;
		body += `<polygon points="116,144 166,46 216,144" fill="#bae6fd" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2"/>`;
		const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'];
		colors.forEach((col, i) => {
			body += `<line x1="${184 + i * 2}" y1="${88 + i * 4}" x2="322" y2="${52 + i * 15}" stroke="${col}" stroke-width="2.5"/>`;
		});
		body += `<text x="328" y="55" font-size="10" font-weight="bold" fill="#ef4444">أحمر</text>`;
		body += `<text x="328" y="146" font-size="10" font-weight="bold" fill="#c084fc">بنفسجي</text>`;
		body += `<text x="180" y="175" text-anchor="middle" font-size="11" fill="#cbd5e1">شاشة بيضاء تستقبل الطيف المستمر (7 ألوان)</text>`;
		return wrapPhysicsSvg(w, h, body);
	}

	let body = `<rect x="6" y="6" width="348" height="183" rx="10" fill="#0f172a"/>`;
	body += `<text x="180" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f8fafc">نموذج التركيب الجمعي للألوان (RVB)</text>`;
	body += `<circle cx="152" cy="84" r="44" fill="#ff0000" fill-opacity="0.72"/>`;
	body += `<circle cx="208" cy="84" r="44" fill="#00ff00" fill-opacity="0.72"/>`;
	body += `<circle cx="180" cy="126" r="44" fill="#0000ff" fill-opacity="0.72"/>`;
	body += `<text x="128" y="72" font-size="13" font-weight="bold" fill="#ffffff">R</text>`;
	body += `<text x="226" y="72" font-size="13" font-weight="bold" fill="#ffffff">V</text>`;
	body += `<text x="180" y="158" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">B</text>`;
	body += `<text x="180" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">J</text>`;
	body += `<text x="145" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">M</text>`;
	body += `<text x="215" y="114" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">C</text>`;
	body += `<text x="180" y="102" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${opts.highlightLabel ?? 'أبيض'}</text>`;
	return wrapPhysicsSvg(w, h, body);
}

function svgFilterAndObject(opts: {
	incidentLabel: string;
	filterLabel: string;
	filterHex: string;
	objectLabel: string;
	objectHex: string;
}): string {
	const w = 380;
	const h = 175;
	let body = `<defs><marker id="rayArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f8fafc"/></marker></defs>`;
	body += `<rect x="6" y="6" width="368" height="163" rx="10" fill="#1e293b"/>`;
	body += `<text x="190" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">التركيب الطرحي: ترشيح الضوء ورؤية الجسم</text>`;
	// Source
	body += `<circle cx="40" cy="92" r="16" fill="#fef08a" stroke="#eab308" stroke-width="2"/>`;
	body += `<text x="40" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#fde047">${opts.incidentLabel}</text>`;
	// Ray to filter
	body += `<line x1="58" y1="92" x2="136" y2="92" stroke="#ffffff" stroke-width="3" marker-end="url(#rayArr)"/>`;
	// Filter
	body += `<rect x="144" y="48" width="18" height="88" rx="3" fill="${opts.filterHex}" stroke="#cbd5e1" stroke-width="1.5"/>`;
	body += `<text x="153" y="154" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#e2e8f0">${opts.filterLabel}</text>`;
	// Ray from filter to object
	body += `<line x1="164" y1="92" x2="246" y2="92" stroke="${opts.filterHex}" stroke-width="3" marker-end="url(#rayArr)"/>`;
	body += `<text x="206" y="80" text-anchor="middle" font-size="10" fill="#cbd5e1">ضوء نافذ</text>`;
	// Object
	body += `<rect x="254" y="56" width="52" height="72" rx="6" fill="${opts.objectHex}" stroke="#ffffff" stroke-width="1.5"/>`;
	body += `<text x="280" y="148" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#f8fafc">${opts.objectLabel}</text>`;
	// Eye
	body += `<ellipse cx="342" cy="92" rx="14" ry="9" fill="#ffffff" stroke="#94a3b8"/><circle cx="342" cy="92" r="4" fill="#0f172a"/>`;
	body += `<line x1="306" y1="92" x2="325" y2="92" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,2"/>`;
	body += `<text x="342" y="114" text-anchor="middle" font-size="10" fill="#cbd5e1">العين (؟)</text>`;
	return wrapPhysicsSvg(w, h, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. قانون أوم ومنحنى المميزة U = f(I)
// ═══════════════════════════════════════════════════════════════════════════════
const ohmsLawGraphTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_ohms_law_graph',
	grade: '3am',
	trimesterId: 't3',
	domain: 'electricity',
	titleAr: 'قانون أوم (U = R·I) وقراءة المنحنى البياني U = f(I)',
	curriculumLessonId: 'phy_lesson_3am_t3_ohms_law_emf_electric_power',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const rVal = rng.pick([15, 20, 25, 30, 40, 50]);
		const iMax = 0.4;
		const uMax = roundTo(rVal * iMax, 1);

		const iSample = rng.pick([0.1, 0.2, 0.3, 0.4]);
		const uSample = roundTo(rVal * iSample, 1);

		const iQueryMa = rng.pick([150, 250, 350]);
		const iQueryA = roundTo(iQueryMa / 1000, 3);
		const uQuery = roundTo(rVal * iQueryA, 2);

		const uReverse = roundTo(rVal * 0.25, 2);
		const iReverseMa = 250;

		const curveSvg = svgPhysicsCurvePlot({
			xMin: 0,
			xMax: iMax,
			yMin: 0,
			yMax: uMax,
			xLabel: 'I (A)',
			yLabel: 'U (V)',
			xStep: 0.1,
			yStep: roundTo(uMax / 4, 2),
			title: 'مميزة الناقل الأومي U = f(I)',
			curves: [{ fn: (x) => rVal * x, color: '#2563eb' }],
			dashedGuides: [
				{ x1: iSample, y1: 0, x2: iSample, y2: uSample, color: '#dc2626' },
				{ x1: 0, y1: uSample, x2: iSample, y2: uSample, color: '#dc2626' }
			],
			points: [{ x: iSample, y: uSample, label: `(${iSample} , ${uSample})`, color: '#dc2626' }]
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t3_ohm_${difficulty}_s${cleanSeed}`, curveSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${rVal} Ω`;
			quizQuestion = {
				type: 'calculated',
				questionText: `انطلاقاً من منحنى المميزة $U = f(I)$ المقابل لناقل أومي، نلاحظ النقطة المشار إليها حيث $I = ${iSample}\\text{ A}$ و $U = ${uSample}\\text{ V}$.\n\nبتطبيق قانون أوم، احسب مقاومة هذا الناقل الأومي $R$ بالأوم ($\\Omega$).`,
				questionTextAr: `من المنحنى $U = f(I)$ ($I=${iSample}\\text{ A}, U=${uSample}\\text{ V}$)، احسب المقاومة $R$ بالأوم:`,
				imageUrl,
				imageCaption: 'منحنى قانون أوم U = f(I)',
				questionData: {
					answer: rVal,
					displayTemplate: 'R = ? Ω',
					variables: [],
					tolerance: 0.01
				},
				explanation: `قانون أوم: $R = \\frac{U}{I} = \\frac{${uSample}}{${iSample}} = ${rVal}\\,\\Omega$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${uQuery} V`;
			quizQuestion = {
				type: 'calculated',
				questionText: `من المنحنى المرفق، حدّد أولاً قيمة المقاومة $R$ انطلاقاً من النقطة $(${iSample}\\text{ A},\\, ${uSample}\\text{ V})$، ثم احسب التوتر الكهربائي $U$ بين طرفي هذا الناقل عندما يمر فيه تيار شدته $I = ${iQueryMa}\\text{ mA}$.`,
				questionTextAr: `احسب التوتر $U$ عند شدة تيار $${iQueryMa}\\text{ mA}$ باستعمال مقاومة المنحنى:`,
				imageUrl,
				imageCaption: 'منحنى مميزة الناقل الأومي',
				questionData: {
					answer: uQuery,
					displayTemplate: 'U = ? V',
					variables: [],
					tolerance: 0.05
				},
				explanation: `أولاً: $R = \\frac{${uSample}}{${iSample}} = ${rVal}\\,\\Omega$. ثم نحوّل الشدة: $I = ${iQueryMa}\\text{ mA} = ${iQueryA}\\text{ A}$، ومنه $U = R \\times I = ${rVal} \\times ${iQueryA} = ${uQuery}\\text{ V}$.`
			};
		} else {
			const wrongNoConvert = rVal * iQueryMa;
			const wrongDiv = roundTo(rVal / iQueryA, 2);
			const mcq = buildUniqueMcqOptions(
				`$R = ${rVal}\\,\\Omega$ و $U = ${uQuery}\\text{ V}$`,
				[
					{
						text: `$R = ${rVal}\\,\\Omega$ و $U = ${wrongNoConvert}\\text{ V}$`,
						diagnosticFeedback: 'نسيت تحويل الميلي أمبير ($\\text{mA}$) إلى الأمبير ($\\text{A}$) بالقسمة على $1000$!'
					},
					{
						text: `$R = ${roundTo(iSample / uSample, 3)}\\,\\Omega$ و $U = ${uQuery}\\text{ V}$`,
						diagnosticFeedback: 'المقاومة هي $R = U / I$ وليس $I / U$!'
					},
					{
						text: `$R = ${rVal}\\,\\Omega$ و $U = ${wrongDiv}\\text{ V}$`,
						diagnosticFeedback: 'التوتر يحسب بالجداء $U = R \\times I$ وليس بالقسمة $R / I$.'
					}
				],
				rng
			);
			finalAnswer = `R=${rVal} Ω, U=${uQuery} V`;
			quizQuestion = {
				type: 'mcq',
				questionText: `يمثّل البيان المقابل تغيرات التوتر $U$ بدلالة الشدة $I$ لناقل أومي. ما قيمة مقاومته $R$ وما التوتر $U$ بين طرفيه من أجل شدة تيار $I = ${iQueryMa}\\text{ mA}$؟`,
				questionTextAr: `استنتج $R$ ثم احسب $U$ عند $I = ${iQueryMa}\\text{ mA}$:`,
				imageUrl,
				imageCaption: 'البيان U = f(I)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ميل المستقيم المار بالمبدأ: $R = \\frac{${uSample}}{${iSample}} = ${rVal}\\,\\Omega$. ومع $I = ${iQueryA}\\text{ A}$ نجد $U = ${rVal} \\times ${iQueryA} = ${uQuery}\\text{ V}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'لتحقيق قانون أوم تجريبياً، ركّب تلميذ دارة تحتوي على مولد متغير التوتر وناقل أومي مقاومته $R$، ورسم المنحنى البياني $U = f(I)$ المقابل:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) كيف نربط جهاز الفولطمتر والأمبيرمتر للتحقق من قانون أوم؟\n\n2) صف شكل البيان $U = f(I)$، وماذا تستنتج عن العلاقة بين $U$ و $I$؟ اكتب عبارة قانون أوم.`,
								answer: `1) يُربط الأمبيرمتر *على التسلسل* مع الناقل الأومي، والفولطمتر *على التفرع* بين طرفيه.\n\n2) البيان خط مستقيم يمر بالمبدأ؛ إذن التوتر $U$ يتناسب طردياً مع شدة التيار $I$. قانون أوم: $U = R times I$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'بيان قانون أوم'
							}
						]
					},
					{
						type: 'text',
						content: `3) اعتماداً على الإحداثيات المبينة على البيان ($I = ${iSample}$ أمبير، $U = ${uSample}$ فولط)، احسب قيمة المقاومة $R$.\n\n4) احسب التوتر $U$ اللازم لتمرير شدة تيار $I = ${iQueryMa}$ ميلي أمبير في هذا الناقل الأومي، ثم احسب الشدة $I'$ (بالميلي أمبير) الموافقة لتوتر $U' = ${uReverse}$ فولط.`,
						answer: `3) $R = frac(U, I) = frac(${uSample}, ${iSample}) = ${rVal} Omega$.\n\n4) نحوّل الشدة: $I = ${iQueryMa}$ $"mA"$ $= ${iQueryA}$ أمبير، ومنه $U = R times I = ${rVal} times ${iQueryA} = ${uQuery}$ فولط.\nومن أجل $U' = ${uReverse}$ فولط: $I' = frac(U', R) = frac(${uReverse}, ${rVal}) = 0.25$ أمبير $= ${iReverseMa}$ ميلي أمبير.`,
						mark: '4'
					}
				]
			},
			hints: [
				'الخط المستقيم المار بالمبدأ يعني تناسباً طردياً: $U = R \\times I$.',
				'لحساب $R$ اقسم إحداثي التوتر $U$ على إحداثي الشدة $I$ عند أي نقطة على المستقيم.',
				'حوّل دائماً الميلي أمبير إلى الأمبير بالقسمة على 1000 قبل الضرب في المقاومة.'
			],
			solutionStepsAr: [
				`من البيان: $R = \\frac{${uSample}}{${iSample}} = ${rVal}\\,\\Omega$.`,
				`عند $I = ${iQueryMa}\\text{ mA} = ${iQueryA}\\text{ A}$: $U = ${rVal} \\times ${iQueryA} = ${uQuery}\\text{ V}$.`,
				`عند $U' = ${uReverse}\\text{ V}$: $I' = \\frac{${uReverse}}{${rVal}} = 0.25\\text{ A} = ${iReverseMa}\\text{ mA}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. القوة المحركة الكهربائية والاستطاعة والطاقة الكهربائية (P = U·I)
// ═══════════════════════════════════════════════════════════════════════════════
const emfElectricPowerTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_emf_electric_power',
	grade: '3am',
	trimesterId: 't3',
	domain: 'electricity',
	titleAr: 'القوة المحركة الكهربائية (e)، الاستطاعة الكهربائية (P = U·I)، وانحفاظ الاستطاعة',
	curriculumLessonId: 'phy_lesson_3am_t3_ohms_law_emf_electric_power',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const eGen = rng.pick([6, 9, 12]);
		const r1 = rng.pick([10, 15, 20]);
		const r2 = rng.pick([20, 25, 30, 40]);
		const rTot = r1 + r2;
		const iSeries = roundTo(eGen / rTot, 2);

		// Parallel lamp power check
		const iL1 = rng.pick([0.2, 0.3, 0.4]);
		const iL2 = rng.pick([0.3, 0.5, 0.6]);
		const pL1 = roundTo(eGen * iL1, 2);
		const pL2 = roundTo(eGen * iL2, 2);
		const pTotal = roundTo(pL1 + pL2, 2);
		const tMin = rng.pick([10, 20, 30]);
		const eJ = Math.round(pTotal * tMin * 60);
		const eWh = roundTo((pTotal * tMin) / 60, 2);

		const cktSvg = svgCircuitDiagram({
			kind: difficulty === 'easy' ? 'parallel' : 'rl',
			labels: {
				e: `e=${eGen}V`,
				r: `R1=${r1}Ω`,
				l: `R2=${r2}Ω`,
				lamp1: `L1`,
				lamp2: `L2`,
				ammeter: true
			}
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t3_emf_${difficulty}_s${cleanSeed}`, cktSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${pTotal} W`;
			quizQuestion = {
				type: 'calculated',
				questionText: `يغذي مولد توتره $U = ${eGen}\\text{ V}$ مصباحين على التفرع كما في المخطط: يمر في الأول $I_1 = ${iL1}\\text{ A}$ وفي الثاني $I_2 = ${iL2}\\text{ A}$.\n\nاحسب الاستطاعة الكهربائية الإجمالية $P = P_1 + P_2$ التي يقدّمها المولد بالواط ($\\text{W}$).`,
				questionTextAr: `احسب الاستطاعة الكلية $P$ لمصباحين على التفرع ($U=${eGen}\\text{ V}$, $I_1=${iL1}\\text{ A}$, $I_2=${iL2}\\text{ A}$):`,
				imageUrl,
				imageCaption: 'مصباحان على التفرع مع مولد',
				questionData: {
					answer: pTotal,
					displayTemplate: 'P = ? W',
					variables: [],
					tolerance: 0.05
				},
				explanation: `$P_1 = ${eGen} \\times ${iL1} = ${pL1}\\text{ W}$ و $P_2 = ${eGen} \\times ${iL2} = ${pL2}\\text{ W}$، وبانحفاظ الاستطاعة $P = P_1 + P_2 = ${pTotal}\\text{ W}$.`
			};
		} else {
			finalAnswer = `${iSeries} A`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في دارة على التسلسل تضم مولداً قوته المحركة الكهربائية $e = ${eGen}\\text{ V}$ وناقلين أوميين $R_1 = ${r1}\\,\\Omega$ و $R_2 = ${r2}\\,\\Omega$، احسب شدة التيار الكهربائي $I = \\frac{e}{R_t}$ بالأمبير ($\\text{A}$).`,
				questionTextAr: `احسب شدة التيار $I$ لدارة تسلسل ($e=${eGen}\\text{ V}$, $R_1=${r1}\\,\\Omega$, $R_2=${r2}\\,\\Omega$):`,
				questionData: {
					answer: iSeries,
					displayTemplate: 'I = ? A',
					variables: [],
					tolerance: 0.02
				},
				explanation: `المقاومة الكلية على التسلسل: $R_t = R_1 + R_2 = ${r1} + ${r2} = ${rTot}\\,\\Omega$، ومنه $I = \\frac{e}{R_t} = \\frac{${eGen}}{${rTot}} = ${iSeries}\\text{ A}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندرس في هذا التمرين جزأين مستقلين حول القوة المحركة الكهربائية والاستطاعة الكهربائية باستعمال مولد قوته المحركة الكهربائية $e = ${eGen}$ فولط:`,
				content: [
					{
						type: 'text',
						content: `1) في دارة على التسلسل، نربط المولد ($e = ${eGen}$ فولط) بمقاومتين $R_1 = ${r1} Omega$ و $R_2 = ${r2} Omega$.\nأ) احسب المقاومة الكلية للدارة $R_t = R_1 + R_2$، ثم استنتج شدة التيار $I = frac(e, R_t)$.\nب) كيف تتغير شدة التيار $I$ لو استبدلنا $R_2$ بمقاومة أكبر منها؟`,
						answer: `1) أ) المقاومة الكلية: $R_t = ${r1} + ${r2} = ${rTot} Omega$.\nشدة التيار: $I = frac(${eGen}, ${rTot}) = ${iSeries}$ أمبير.\nب) كلما زادت المقاومة الكلية $R_t$ للدارة، *تنقص* شدة التيار $I$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) في دارة أخرى على التفرع، يغذي نفس المولد ($U = ${eGen}$ فولط) مصباحين $L_1$ ($I_1 = ${iL1}$ أمبير) و $L_2$ ($I_2 = ${iL2}$ أمبير) لمدة $t = ${tMin}$ دقيقة.\nأ) احسب استطاعة كل مصباح ($P_1$ و $P_2$)، ثم تحقق من انحفاظ الاستطاعة بحساب الاستطاعة الكلية $P = U times I_("كلية")$.\nب) احسب الطاقة الكهربائية الكلية المحولة $E = U times I_("كلية") times t$ بالجول ($"J"$) وبالواط ساعي ($"Wh"$).`,
						answer: `2) أ) $P_1 = ${eGen} times ${iL1} = ${pL1}$ واط، $P_2 = ${eGen} times ${iL2} = ${pL2}$ واط.\nمجموعهما: $P_1 + P_2 = ${pTotal}$ واط.\nالشدة الكلية: $I_("كلية") = ${iL1} + ${iL2} = ${roundTo(iL1 + iL2, 2)}$ أمبير، ومنه $P = ${eGen} times ${roundTo(iL1 + iL2, 2)} = ${pTotal}$ واط (محفوظة).\nب) بالجول ($t = ${tMin * 60}$ ثا): $E = ${pTotal} times ${tMin * 60} = ${eJ}$ جول.\nبالواط ساعي ($t = ${roundTo(tMin / 60, 3)}$ سا): $E = ${eWh}$ $"Wh"$.`,
						mark: '3.5'
					}
				]
			},
			hints: [
				'في دارة التسلسل المقاومة الكلية هي مجموع المقاومات: $R_t = R_1 + R_2$.',
				'استطاعة التحويل الكهربائي: $P = U \\times I$.',
				'للحصول على الجول حوّل الدقائق إلى ثوانٍ، وللواط ساعي حوّل الدقائق إلى ساعات.'
			],
			solutionStepsAr: [
				`التسلسل: $R_t = ${rTot}\\,\\Omega$ ومنه $I = \\frac{${eGen}}{${rTot}} = ${iSeries}\\text{ A}$.`,
				`الاستطاعة الكلية: $P = P_1 + P_2 = ${pL1} + ${pL2} = ${pTotal}\\text{ W}$.`,
				`الطاقة المحولة: $E = ${eJ}\\text{ J} = ${eWh}\\text{ Wh}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. طيف الضوء الأبيض والتركيب الجمعي للألوان (RVB)
// ═══════════════════════════════════════════════════════════════════════════════
const spectrumAdditiveRvbTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_spectrum_additive_rvb',
	grade: '3am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'طيف الضوء الأبيض ونموذج التركيب الجمعي للألوان (RVB)',
	curriculumLessonId: 'phy_lesson_3am_t3_white_light_spectrum_additive_mixing',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const combinations = [
			{
				expr: '$R + V$',
				descAr: 'الأحمر ($R$) والأخضر ($V$)',
				resultAr: 'الأصفر ($J$)',
				compNeeded: 'الأزرق ($B$)',
				wrong1: 'السماوي ($C$)',
				wrong2: 'الوردي ($M$)',
				wrong3: 'الأسود'
			},
			{
				expr: '$V + B$',
				descAr: 'الأخضر ($V$) والأزرق ($B$)',
				resultAr: 'السماوي ($C$)',
				compNeeded: 'الأحمر ($R$)',
				wrong1: 'الأصفر ($J$)',
				wrong2: 'الوردي ($M$)',
				wrong3: 'البني'
			},
			{
				expr: '$R + B$',
				descAr: 'الأحمر ($R$) والأزرق ($B$)',
				resultAr: 'الوردي / الأرجواني ($M$)',
				compNeeded: 'الأخضر ($V$)',
				wrong1: 'الأصفر ($J$)',
				wrong2: 'السماوي ($C$)',
				wrong3: 'البرتقالي'
			}
		];

		const combo = rng.pick(combinations);
		const isPrismMode = difficulty === 'easy' && seed % 2 === 0;
		const svg = svgPrismAndRvb({ mode: isPrismMode ? 'prism' : 'rvb' });
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t3_rvb_${difficulty}_s${cleanSeed}`, svg);

		const mcq = isPrismMode
			? buildUniqueMcqOptions(
					'الأحمر أقل انحرافاً والبنفسجي أكثر انحرافاً، ونعيد تركيبهما بقرص نيوتن السريع',
					[
						{
							text: 'البنفسجي أقل انحرافاً والأحمر أكثر انحرافاً',
							diagnosticFeedback: 'في الموشور الزجاجي، البنفسجي هو الذي ينحرف أكثر من الأحمر!'
						},
						{
							text: 'الضوء الأبيض ضوء أحادي اللون بسيط لا يتحلل',
							diagnosticFeedback: 'الموشور يثبت أن الضوء الأبيض مركّب من طيف مستمر من الألوان.'
						},
						{
							text: 'ينتج الموشور ثلاثة ألوان فقط ولا يمكن إعادة تركيبها',
							diagnosticFeedback: 'طيف الضوء الأبيض مستمر ويبرز فيه 7 ألوان رئيسية ويعيد قرص نيوتن تركيبها.'
						}
					],
					rng
				)
			: buildUniqueMcqOptions(
					`${combo.resultAr}، ونحصل على الأبيض بإضافة ${combo.compNeeded}`,
					[
						{
							text: `${combo.wrong1}، ونحصل على الأبيض بإضافة ${combo.compNeeded}`,
							diagnosticFeedback: `راجع ناتج الجمع الضوئي لـ ${combo.descAr} في نموذج RVB.`
						},
						{
							text: `${combo.wrong2}، ونحصل على الأبيض بإضافة ${combo.resultAr}`,
							diagnosticFeedback: 'تأكد من الألوان الثانوية الثلاثة: R+V=J، V+B=C، R+B=M.'
						},
						{
							text: `${combo.wrong3}، ولا يمكن الحصول على الضوء الأبيض`,
							diagnosticFeedback: 'التركيب الجمعي للألوان الأساسية الثلاثة R+V+B يعطي دائماً الضوء الأبيض.'
						}
					],
					rng
				);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: isPrismMode
					? 'عند توجيه حزمة ضوء أبيض نحو موشور زجاجي كما في الشكل، أيّ العبارات التالية تصف الطيف الناتج وإعادة تركيبه بدقة؟'
					: `نسلط على شاشة بيضاء في غرفة مظلمة ضوءين أساسيين هما ${combo.descAr} كما في نموذج التركيب الجمعي المرفق.\n\nما اللون الثانوي الظاهر في منطقة التقاطع، وما الضوء الذي نضيفه للحصول على الضوء الأبيض؟`,
				questionTextAr: isPrismMode
					? 'خصائص تحليل الضوء الأبيض بالموشور وإعادة تركيبه:'
					: `ما ناتج التركيب الجمعي لـ ${combo.descAr} ولونه المكمل؟`,
				imageUrl,
				imageCaption: isPrismMode ? 'تحليل الضوء الأبيض بالموشور' : 'دوائر التركيب الجمعي RVB',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: isPrismMode
					? 'يتحلل الضوء الأبيض بالموشور إلى 7 ألوان (الأحمر أقلها انحرافاً والبنفسجي أكثرها انحرافاً)، ويعيد قرص نيوتن تركيبها إلى أبيض.'
					: `وفق التركيب الجمعي: ${combo.expr} يعطي ${combo.resultAr}، وإضافة ${combo.compNeeded} تعطي $R + V + B = \\text{أبيض}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'أجرى أستاذ العلوم الفيزيائية تجربتين حول الضوء والألوان كما هو موضح في الوثيقة المرفقة:',
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) التجربة الأولى: عند توجيه ضوء أبيض نحو موشور زجاجي يظهر طيف مستمر على الشاشة.\nأ) اذكر بالترتيب الألوان السبعة الرئيسية للطيف من الأقل انحرافاً إلى الأكثر انحرافاً.\nب) كيف نثبت تجريبياً بوسيلة بسيطة أن الضوء الأبيض مركّب من هذه الألوان؟`,
								answer: `1) أ) الألوان بالترتيب: أحمر، برتقالي، أصفر، أخضر، أزرق، نيلي، بنفسجي (الأحمر أقل انحرافاً والبنفسجي أكثر انحرافاً).\nب) باستعمال *قرص نيوتن* الملوّن بألوان الطيف: عند تدويره بسرعة نرى القرص أبيض (أو أبيض رمادياً).`,
								mark: '2.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الوثيقة الضوئية المرفقة'
							}
						]
					},
					{
						type: 'text',
						content: `2) التجربة الثانية (التركيب الجمعي $"RVB"$):\nأ) سمّ الألوان الأساسية الثلاثة للضوء، واكتب معادلات الحصول على الألوان الثانوية الثلاثة ($J$، $C$، $M$) والضوء الأبيض.\nب) عند مزج الضوءين ${combo.descAr}، ما اللون الناتج؟ وما لونه المكمّل للحصول على الضوء الأبيض؟`,
						answer: `2) أ) الألوان الأساسية: الأحمر ($R$)، الأخضر ($V$)، الأزرق ($B$).\nالمعادلات: $R + V = J$ (أصفر)، $V + B = C$ (سماوي)، $R + B = M$ (وردي)، و $R + V + B = "أبيض"$.\nب) ينتج اللون ${combo.resultAr.replace(/\$/g, '')}، ولونه المكمل للحصول على الأبيض هو ${combo.compNeeded.replace(/\$/g, '')}.`,
						mark: '3.5'
					}
				]
			},
			hints: [
				'الأحمر أقل انحرافاً والبنفسجي أكثر انحرافاً في الموشور.',
				'تذكّر الألوان الأساسية للضوء: أحمر R، أخضر V، أزرق B.',
				'الألوان الثانوية: R+V=J (أصفر)، V+B=C (سماوي)، R+B=M (وردي).'
			],
			solutionStepsAr: [
				'الموشور يحلل الأبيض إلى 7 ألوان وقرص نيوتن يعيد تركيبها.',
				`${combo.expr} = ${combo.resultAr}، ومكمله هو ${combo.compNeeded}.`
			],
			finalAnswer: isPrismMode ? '7 ألوان (أحمر ← بنفسجي)' : `${combo.resultAr}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. التركيب الطرحي وترشيح الألوان ورؤية الأجسام
// ═══════════════════════════════════════════════════════════════════════════════
const subtractiveFiltersVisionTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_subtractive_filters_vision',
	grade: '3am',
	trimesterId: 't3',
	domain: 'optics',
	titleAr: 'التركيب الطرحي: المرشحات اللونية ورؤية الأجسام بالألوان',
	curriculumLessonId: 'phy_lesson_3am_t3_subtractive_mixing_color_vision',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const scenarios = [
			{
				filterLabel: 'مرشح أصفر (J = R+V)',
				filterHex: '#facc15',
				filterPasses: 'الأحمر ($R$) والأخضر ($V$)',
				filterAbsorbs: 'الأزرق ($B$)',
				objectLabel: 'جسم سماوي (C = V+B)',
				objectHex: '#06b6d4',
				apparentColor: 'أخضر ($V$)',
				reasonAr: 'يمرر المرشح الأصفر $(R+V)$، فيمتص الجسم السماوي $R$ وينثر المركبة المشتركة $V$ فقط',
				wrongColors: ['أصفر ($J$)', 'سماوي ($C$)', 'أسود']
			},
			{
				filterLabel: 'مرشح سماوي (C = V+B)',
				filterHex: '#06b6d4',
				filterPasses: 'الأخضر ($V$) والأزرق ($B$)',
				filterAbsorbs: 'الأحمر ($R$)',
				objectLabel: 'جسم أحمر (R)',
				objectHex: '#ef4444',
				apparentColor: 'أسود',
				reasonAr: 'يمرر المرشح السماوي $(V+B)$ الخالي من الأحمر؛ وبما أن الجسم الأحمر يمتص $V$ و $B$ فلا ينثر أي ضوء للعين',
				wrongColors: ['أحمر ($R$)', 'سماوي ($C$)', 'بنفسجي']
			},
			{
				filterLabel: 'مرشح وردي (M = R+B)',
				filterHex: '#d946ef',
				filterPasses: 'الأحمر ($R$) والأزرق ($B$)',
				filterAbsorbs: 'الأخضر ($V$)',
				objectLabel: 'جسم أصفر (J = R+V)',
				objectHex: '#eab308',
				apparentColor: 'أحمر ($R$)',
				reasonAr: 'يمرر المرشح الوردي $(R+B)$، فيمتص الجسم الأصفر $B$ وينثر المركبة المشتركة $R$ فقط',
				wrongColors: ['وردي ($M$)', 'أصفر ($J$)', 'أخضر ($V$)']
			},
			{
				filterLabel: 'مرشح أحمر (R)',
				filterHex: '#ef4444',
				filterPasses: 'الأحمر ($R$) فقط',
				filterAbsorbs: 'الأخضر ($V$) والأزرق ($B$)',
				objectLabel: 'جسم أبيض',
				objectHex: '#ffffff',
				apparentColor: 'أحمر ($R$)',
				reasonAr: 'الجسم الأبيض ينثر جميع الأضواء الساقطة عليه، وبما أن الساقط أحمر فينثره للعين',
				wrongColors: ['أبيض', 'أسود', 'وردي ($M$)']
			}
		];

		const sc =
			difficulty === 'easy'
				? scenarios[3]
				: difficulty === 'medium'
					? scenarios[rng.int(1, 2)]
					: scenarios[rng.int(0, 2)];

		const svg = svgFilterAndObject({
			incidentLabel: 'ضوء أبيض (R+V+B)',
			filterLabel: sc.filterLabel,
			filterHex: sc.filterHex,
			objectLabel: sc.objectLabel,
			objectHex: sc.objectHex
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t3_sub_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			sc.apparentColor,
			sc.wrongColors.map((wc) => ({
				text: wc,
				diagnosticFeedback: `تتبّع مسار المركبات: المرشح يمرر ${sc.filterPasses}، والجسم ينثر فقط المركبة المشتركة مع لونه!`
			})),
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نسلّط ضوءاً أبيض ($R + V + B$) عبر **${sc.filterLabel}** ليسقط الضوء النافذ على **${sc.objectLabel}** كما في المخطط.\n\nبأي لون ترى العين هذا الجسم؟`,
				questionTextAr: `ما اللون المرئي لـ ${sc.objectLabel} بعد مرور الضوء الأبيض عبر ${sc.filterLabel}؟`,
				imageUrl,
				imageCaption: 'ترشيح الضوء الأبيض وسقوطه على الجسم',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${sc.reasonAr}، لذلك يظهر الجسم باللون: **${sc.apparentColor}**.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في تجربة التركيب الطرحي الموضحة بالرسم، نمرّر حزمة ضوء أبيض ($R + V + B$) عبر **${sc.filterLabel}** ثم نسقطها على **${sc.objectLabel}**:`,
				content: [
					{
						type: 'image',
						src: imageUrl,
						caption: 'التركيب التجريبي للترشيح والرؤية'
					},
					{
						type: 'text',
						content: `1) حدّد مركبات الضوء الأبيض التي يمتصها المرشح، والمركبات التي يسمح بنفاذها.`,
						answer: `1) يمتص المرشح: ${sc.filterAbsorbs.replace(/\$/g, '')}، ويسمح بنفاذ: ${sc.filterPasses.replace(/\$/g, '')}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) بأي لون ترى العين ${sc.objectLabel}؟ فسّر إجابتك بتحديد الضوء الساقط والضوء الممتص والضوء المنثور نحو العين.`,
						answer: `2) ترى العين الجسم باللون *${sc.apparentColor.replace(/\$/g, '')}*.\nالتفسير: ${sc.reasonAr.replace(/\$/g, '')}.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) إذا أزحنا المرشح وأضأنا علماً وطنياً جزائرياً (أخضر، أبيض، أحمر) بضوء أحمر ($R$) فقط، فبأي ألوان تظهر أقسامه الثلاثة؟`,
						answer: `3) القسم الأخضر يمتص الأحمر فيبدو *أسود*، والقسم الأبيض ينثر الأحمر فيبدو *أحمر*، والقسم الأحمر ينثر الأحمر فيبدو *أحمر*.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'المرشح اللوني يمتص ما لا يطابق مركباته ويمرّر مركباته فقط.',
				'اللون المرئي للجسم هو التقاطع (المركبة المشتركة) بين الضوء الساقط عليه ومركبات لونه في الضوء الأبيض.',
				'إذا لم توجد مركبة مشتركة، يمتص الجسم الضوء الساقط ويُرى أسود.'
			],
			solutionStepsAr: [
				`الضوء النافذ من المرشح: ${sc.filterPasses}.`,
				`النتيجة: ${sc.reasonAr} $\\implies$ يُرى ${sc.apparentColor}.`
			],
			finalAnswer: sc.apparentColor
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. وضعية إدماجية 1: إضاءة المسرح المدرسي (الكهرباء + الألوان)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationStageLightingTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_integration_stage_lighting',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تجهيز إضاءة مسرح مدرسي (قانون أوم والألوان)',
	curriculumLessonId: 'phy_lesson_3am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const uSupply = 12;
		const iLamp = rng.pick([0.4, 0.5, 0.6]);
		const rProt = rng.pick([10, 15, 20]);
		const uRes = roundTo(rProt * iLamp, 2);
		const pOneLamp = roundTo(uSupply * iLamp, 2);
		const pTwoLamps = roundTo(2 * pOneLamp, 2);
		const showMinutes = rng.pick([30, 45, 60]);
		const eTotalJ = Math.round(pTwoLamps * showMinutes * 60);

		const pairOptions = [
			{
				lampsAr: 'الأحمر ($R$) والأخضر ($V$)',
				stageColor: 'الأصفر ($J = R + V$)',
				costumeAr: 'الأزرق ($B$)',
				costumeSeen: 'أسود'
			},
			{
				lampsAr: 'الأخضر ($V$) والأزرق ($B$)',
				stageColor: 'السماوي ($C = V + B$)',
				costumeAr: 'الأحمر ($R$)',
				costumeSeen: 'أسود'
			},
			{
				lampsAr: 'الأحمر ($R$) والأزرق ($B$)',
				stageColor: 'الوردي ($M = R + B$)',
				costumeAr: 'الأصفر ($J = R + V$)',
				costumeSeen: 'أحمر ($R$)'
			}
		];
		const lightPair =
			difficulty === 'easy' ? pairOptions[0] : rng.pick(pairOptions);

		const svg = svgPrismAndRvb({ mode: 'rvb' });
		const imageUrl = savePhysicsSvgAsset(
			`phy_3am_t3_int_stage_${difficulty}_s${cleanSeed}`,
			svg
		);

		const mcq = buildUniqueMcqOptions(
			`استطاعة الكشافين $${pTwoLamps}\\text{ W}$، إضاءة المسرح ${lightPair.stageColor}، ويُرى الزي ${lightPair.costumeSeen}`,
			[
				{
					text: `استطاعة الكشافين $${pOneLamp}\\text{ W}$، إضاءة المسرح ${lightPair.stageColor}، ويُرى الزي أبيض`,
					diagnosticFeedback: 'عند تشغيل كشافين متماثلين على التفرع تُجمع استطاعتهما ($P = P_1 + P_2$)!'
				},
				{
					text: `استطاعة الكشافين $${pTwoLamps}\\text{ W}$، إضاءة المسرح أبيض، ويُرى الزي ${lightPair.costumeAr}`,
					diagnosticFeedback: 'الضوء الأبيض يتطلب تشغيل الكشافات الثلاثة R+V+B معاً، وليس اثنين فقط!'
				},
				{
					text: `استطاعة الكشافين $${roundTo(uSupply / iLamp, 1)}\\text{ W}$، إضاءة المسرح ${lightPair.stageColor}، ويُرى الزي ${lightPair.costumeSeen}`,
					diagnosticFeedback: 'الاستطاعة هي الجداء $P = U \\times I$ وليس القسمة $U / I$.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `على خشبة مسرح مدرسي، شغّلنا كشافين متماثلين على التفرع بتوتر $U = ${uSupply}\\text{ V}$ وشدة $I = ${iLamp}\\text{ A}$ لكل منهما: الكشافان هما ${lightPair.lampsAr}، وسُلطت إضاءتهما المشتركة على زيّ ممثل لونه في الضوء الأبيض هو ${lightPair.costumeAr}.\n\nما الاستطاعة الكلية للكشافين، ولون إضاءة الخشبة، واللون الذي يظهر به الزي؟`,
				questionTextAr: `حساب استطاعة كشافي المسرح (${lightPair.lampsAr}) ولون الزي (${lightPair.costumeAr}):`,
				imageUrl,
				imageCaption: 'التركيب الجمعي لكشافات المسرح RVB',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `استطاعة كل كشاف $P_1 = ${uSupply} \\times ${iLamp} = ${pOneLamp}\\text{ W}$، والمجموع $${pTwoLamps}\\text{ W}$. بالتركيب الجمعي ينتج ${lightPair.stageColor}، وبالتركيب الطرحي يبدو الزي ${lightPair.costumeSeen}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `بمناسبة حفل تكريم المتفوقين، كلّفت إدارة المتوسطة تلاميذ 3AM بتجهيز إضاءة المسرح باستعمال 3 كشافات ($R, V, B$) مربوطة على التفرع بمولد توتره $U = ${uSupply}$ فولط، تستهلك في كل كشاف شدة تيار $I = ${iLamp}$ أمبير.`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (الدراسة الكهربائية):\n\n1) لحماية أحد الكشافات أدرجنا معه على التسلسل مقاومة $R_p = ${rProt} Omega$ يمر فيها التيار $I = ${iLamp}$ أمبير. احسب التوتر $U_R$ بين طرفي هذه المقاومة.\n\n2) عند تشغيل كشافين معاً على التفرع لمدة $${showMinutes}$ دقيقة، احسب الاستطاعة الكهربائية الكلية $P$ والطاقة المحوّلة $E$ بالجول ($"J"$).`,
								answer: `1) حسب قانون أوم: $U_R = R_p times I = ${rProt} times ${iLamp} = ${uRes}$ فولط.\n\n2) استطاعة الكشاف الواحد: $P_1 = U times I = ${uSupply} times ${iLamp} = ${pOneLamp}$ واط.\nالاستطاعة الكلية لكشافين (انحفاظ الاستطاعة): $P = 2 times ${pOneLamp} = ${pTwoLamps}$ واط.\nالطاقة المحوّلة ($t = ${showMinutes * 60}$ ثا): $E = ${pTwoLamps} times ${showMinutes * 60} = ${eTotalJ}$ جول.`,
								mark: '4'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'سند: نموذج التركيب الجمعي RVB'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (الدراسة الضوئية):\n\n3) شغّل التلاميذ الكشافين ${lightPair.lampsAr} معاً على الخشبة البيضاء. ما اللون الناتج عنهما في منطقة التقاطع، وما اسم هذا النموذج؟ وكيف نحصل على الضوء الأبيض؟\n\n4) وقف ممثل يرتدي معطفاً لونه ${lightPair.costumeAr.replace(/\$/g, '')} (في الضوء الأبيض) تحت هذه الإضاءة. بأي لون يراه الجمهور؟ علّل ذلك.`,
						answer: `3) ينتج اللون *${lightPair.stageColor.replace(/\$/g, '')}*، ويسمى *التركيب الجمعي للألوان*.\nنحصل على الضوء الأبيض بتشغيل الكشافات الثلاثة ($R + V + B$) معاً.\n\n4) يرى الجمهور المعطف باللون *${lightPair.costumeSeen.replace(/\$/g, '')}*، لأن المعطف يمتص المركبات غير الموافقة للونه وينثر فقط المركبة المشتركة (إن وُجدت) مع الضوء الساقط (التركيب الطرحي).`,
						mark: '4'
					}
				]
			},
			hints: [
				'طبّق قانون أوم $U = R \\times I$ على المقاومة.',
				'الاستطاعة الكلية في التفرع تساوي مجموع استطاعات الكشافات المشتغلة.',
				'التركيب الجمعي يحدد لون الإضاءة على الخشبة، والتركيب الطرحي يحدد لون المعطف المرئي.'
			],
			solutionStepsAr: [
				`قانون أوم للمقاومة: $U_R = ${rProt} \\times ${iLamp} = ${uRes}\\text{ V}$.`,
				`استطاعة الكشافين: $P = ${pTwoLamps}\\text{ W}$ والطاقة $E = ${eTotalJ}\\text{ J}$.`,
				`لون الإضاءة: ${lightPair.stageColor}، ولون المعطف المرئي: ${lightPair.costumeSeen}.`
			],
			finalAnswer: `P = ${pTwoLamps} W, الإضاءة: ${lightPair.stageColor}, المعطف: ${lightPair.costumeSeen}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. وضعية إدماجية 2: مخبر الكهرباء والبصريات (القوة المحركة + الترشيح والطيف)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationOpticalLabTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t3_integration_optical_lab',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: طاولة التجارب الكهربائية والضوئية في المخبر',
	curriculumLessonId: 'phy_lesson_3am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const eGen = rng.pick([9, 12]);
		const r1 = rng.pick([15, 20]);
		const r2 = rng.pick([25, 30, 40]);
		const rTot = r1 + r2;
		const iCurr = roundTo(eGen / rTot, 2);
		const u1 = roundTo(r1 * iCurr, 2);
		const pTotal = roundTo(eGen * iCurr, 2);
		const tHours = rng.pick([2, 3]);
		const eWh = roundTo(pTotal * tHours, 2);

		const filterCombos = [
			{
				f1: 'مرشح أصفر (J = R+V)',
				f2: 'مرشح سماوي (C = V+B)',
				transmitted: 'الأخضر ($V$)',
				f1Hex: '#facc15',
				objHex: '#06b6d4',
				explain: 'يمرر الأصفر $(R+V)$، ثم يمتص السماوي $R$ ويمرر **الأخضر ($V$)** فقط'
			},
			{
				f1: 'مرشح وردي (M = R+B)',
				f2: 'مرشح أصفر (J = R+V)',
				transmitted: 'الأحمر ($R$)',
				f1Hex: '#d946ef',
				objHex: '#facc15',
				explain: 'يمرر الوردي $(R+B)$، ثم يمتص الأصفر $B$ ويمرر **الأحمر ($R$)** فقط'
			},
			{
				f1: 'مرشح سماوي (C = V+B)',
				f2: 'مرشح وردي (M = R+B)',
				transmitted: 'الأزرق ($B$)',
				f1Hex: '#06b6d4',
				objHex: '#d946ef',
				explain: 'يمرر السماوي $(V+B)$، ثم يمتص الوردي $V$ ويمرر **الأزرق ($B$)** فقط'
			}
		];
		const fc = difficulty === 'easy' ? filterCombos[0] : rng.pick(filterCombos);

		const svg = svgFilterAndObject({
			incidentLabel: 'منبع ضوء أبيض',
			filterLabel: fc.f1,
			filterHex: fc.f1Hex,
			objectLabel: fc.f2,
			objectHex: fc.objHex
		});
		const imageUrl = savePhysicsSvgAsset(
			`phy_3am_t3_int_lab_${difficulty}_s${cleanSeed}`,
			svg
		);

		const mcq = buildUniqueMcqOptions(
			`$I = ${iCurr}\\text{ A}$ و الضوء النافذ النهائي هو ${fc.transmitted}`,
			[
				{
					text: `$I = ${roundTo(eGen / r1, 2)}\\text{ A}$ و الضوء النافذ النهائي هو ${fc.transmitted}`,
					diagnosticFeedback: 'نسيت جمع المقاومتين $R_t = R_1 + R_2$ عند حساب شدة التيار!'
				},
				{
					text: `$I = ${iCurr}\\text{ A}$ و الضوء النافذ النهائي هو الأبيض`,
					diagnosticFeedback: 'المرشحات تمتص المركبات ولا تسمح بمرور الضوء الأبيض كاملاً.'
				},
				{
					text: `$I = ${iCurr}\\text{ A}$ و الضوء النافذ النهائي هو الأسود (ينعدم الضوء)`,
					diagnosticFeedback: 'يوجد لون أساسي مشترك بين المرشحين الثانويين، لذا ينفذ ذلك اللون!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في مخبر الفيزياء، يغذّي مولد قوته المحركة $e = ${eGen}\\text{ V}$ دارة تسلسل تضم مقاومتين $R_1 = ${r1}\\,\\Omega$ و $R_2 = ${r2}\\,\\Omega$ لتشغيل منبع ضوء أبيض، ثم يمرّ الضوء عبر **${fc.f1}** متبوعاً بـ **${fc.f2}**.\n\nما شدة التيار $I$ في الدارة وما لون الضوء النافذ بعد المرشحين؟`,
				questionTextAr: `شدة التيار في دارة التسلسل ($e=${eGen}\\text{ V}, R_1=${r1}\\,\\Omega, R_2=${r2}\\,\\Omega$) وناتج المرشحين:`,
				imageUrl,
				imageCaption: 'مرور الضوء الأبيض عبر مرشحين متتاليين',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$R_t = ${r1} + ${r2} = ${rTot}\\,\\Omega$ ومنه $I = \\frac{${eGen}}{${rTot}} = ${iCurr}\\text{ A}$. أما المرشحان فيمرران المركبة المشتركة: ${fc.explain}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `أرادت أستاذة الفيزياء تقويم تلاميذها حول الدارة الكهربائية والظواهر الضوئية، فركّبت مولداً قوته المحركة $e = ${eGen}$ فولط يغذي دارة على التسلسل فيها مقاومتان $R_1 = ${r1} Omega$ و $R_2 = ${r2} Omega$، واستعملت منبعاً للضوء الأبيض في التجربة الضوئية الموضحة في السند.`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (الكهرباء: قانون أوم والاستطاعة):\n\n1) احسب المقاومة الكلية $R_t$ للدارة، ثم استنتج شدة التيار الكهربائي $I = frac(e, R_t)$.\n\n2) احسب التوتر $U_1$ بين طرفي المقاومة $R_1$، ثم احسب الاستطاعة الكلية $P = e times I$ والطاقة المحوّلة خلال $${tHours}$ ساعات بالواط ساعي ($"Wh"$).`,
								answer: `1) المقاومة الكلية: $R_t = R_1 + R_2 = ${r1} + ${r2} = ${rTot} Omega$.\nشدة التيار: $I = frac(${eGen}, ${rTot}) = ${iCurr}$ أمبير.\n\n2) قانون أوم لـ $R_1$: $U_1 = R_1 times I = ${r1} times ${iCurr} = ${u1}$ فولط.\nالاستطاعة الكلية: $P = ${eGen} times ${iCurr} = ${pTotal}$ واط.\nالطاقة خلال $${tHours}$ ساعات: $E = ${pTotal} times ${tHours} = ${eWh}$ $"Wh"$.`,
								mark: '4'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'سند: تتابع المرشحين اللونيين'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (البصريات: التركيب الطرحي وتحليل الضوء):\n\n3) يمرّ الضوء الأبيض عبر ${fc.f1} ثم ${fc.f2}. ما لون الضوء النهائي النافذ إلى العين؟ وضّح خطوة بخطوة أي الألوان تُمتص وأيها تنفذ.\n\n4) لو استبدلنا المرشحين بموشور زجاجي، ثم وضعنا أمام الطيف الناتج قرص نيوتن يدور بسرعة، ماذا نلاحظ في كلتا الحالتين؟`,
						answer: `3) اللون النهائي النافذ هو *${fc.transmitted.replace(/\$/g, '')}*.\nالتوضيح: ${fc.explain.replace(/\$/g, '')}.\n\n4) الموشور الزجاجي يحلل الضوء الأبيض إلى ألوان الطيف السبعة المستمرة (من الأحمر إلى البنفسجي)، أما تدوير قرص نيوتن بسرعة فيعيد تركيبها فتراه العين *أبيض*.`,
						mark: '4'
					}
				]
			},
			hints: [
				'احسب أولاً $R_t = R_1 + R_2$ ثم طبق $I = e / R_t$.',
				'المرشح الثانوي يمرر مركبتيه الأساسيتين ويمتص الثالثة.',
				'عند تتابع مرشحين، ينفذ فقط اللون المشترك بينهما.'
			],
			solutionStepsAr: [
				`$R_t = ${rTot}\\,\\Omega$، و $I = ${iCurr}\\text{ A}$، و $U_1 = ${u1}\\text{ V}$، و $P = ${pTotal}\\text{ W}$، و $E = ${eWh}\\text{ Wh}$.`,
				`الضوء النافذ بعد المرشحين: ${fc.transmitted} (${fc.explain}).`
			],
			finalAnswer: `I = ${iCurr} A, اللون النافذ: ${fc.transmitted}`
		};
	}
};

export const PHYSICS_TEMPLATES_3AM_T3: PhysicsParameterizedTemplate[] = [
	ohmsLawGraphTemplate,
	emfElectricPowerTemplate,
	spectrumAdditiveRvbTemplate,
	subtractiveFiltersVisionTemplate,
	integrationStageLightingTemplate,
	integrationOpticalLabTemplate
];
