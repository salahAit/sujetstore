import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { chemEquation, chemSpecies, type ChemTerm } from '../../chem-helpers';
import {
	savePhysicsSvgAsset,
	svgElectrolysisCell,
	wrapPhysicsSvg
} from '../../svg-physics';

// ─── Helper SVG Builders for 3AM T1 ──────────────────────────────────────────

function svgCombustionFlame(opts: {
	isComplete: boolean;
	fuelLabel: string;
	airHoleLabel: string;
}): string {
	const flameFill = opts.isComplete ? '#3b82f6' : '#f59e0b';
	const flameStroke = opts.isComplete ? '#1d4ed8' : '#d97706';
	const title = opts.isComplete ? 'لهب أزرق (احتراق تام)' : 'لهب أصفر منير + هباب (احتراق غير تام)';
	let body = `<rect x="8" y="8" width="344" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="180" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="${opts.isComplete ? '#1d4ed8' : '#b91c1c'}">${title}</text>`;
	if (!opts.isComplete) {
		body += `<path d="M168,48 Q180,38 192,48" fill="none" stroke="#334155" stroke-width="2.5"/>`;
		body += `<circle cx="176" cy="45" r="2.2" fill="#0f172a"/><circle cx="185" cy="42" r="2" fill="#0f172a"/>`;
	}
	body += `<path d="M180,56 Q204,96 180,118 Q156,96 180,56 Z" fill="${flameFill}" stroke="${flameStroke}" stroke-width="1.6"/>`;
	body += `<rect x="166" y="118" width="28" height="44" rx="3" fill="#64748b" stroke="#334155" stroke-width="1.4"/>`;
	body += `<rect x="148" y="162" width="64" height="12" rx="3" fill="#334155"/>`;
	body += `<text x="180" y="190" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${opts.fuelLabel}  |  ${opts.airHoleLabel}</text>`;
	return wrapPhysicsSvg(360, 210, body);
}

function svgReactionFactorsBeakers(opts: {
	mode: 'temperature' | 'surface';
	leftLabel: string;
	rightLabel: string;
	fastSide: 'left' | 'right';
}): string {
	let body = `<rect x="8" y="8" width="344" height="194" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="180" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">${
		opts.mode === 'temperature' ? 'دراسة تأثير درجة الحرارة' : 'دراسة تأثير سطح التلامس'
	}</text>`;

	const drawBeaker = (bx: number, label: string, isFast: boolean) => {
		let s = `<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="${bx},56 ${bx},142 ${bx + 80},142 ${bx + 80},56"/>`;
		s += `<rect x="${bx + 1}" y="84" width="78" height="57" fill="${
			opts.mode === 'temperature' && isFast ? '#fee2e2' : '#dbeafe'
		}"/>`;
		if (opts.mode === 'surface' && isFast) {
			s += `<circle cx="${bx + 26}" cy="132" r="2.2" fill="#b45309"/><circle cx="${bx + 38}" cy="134" r="2.2" fill="#b45309"/><circle cx="${bx + 50}" cy="131" r="2.2" fill="#b45309"/>`;
		} else {
			s += `<rect x="${bx + 26}" y="124" width="28" height="10" rx="2" fill="#eab308" stroke="#a16207"/>`;
		}
		if (isFast) {
			s += `<circle cx="${bx + 32}" cy="102" r="3" fill="#ffffff"/><circle cx="${bx + 44}" cy="94" r="3" fill="#ffffff"/><circle cx="${bx + 38}" cy="112" r="2.5" fill="#ffffff"/>`;
		} else {
			s += `<circle cx="${bx + 40}" cy="108" r="2" fill="#ffffff"/>`;
		}
		s += `<text x="${bx + 40}" y="164" text-anchor="middle" font-size="11" font-weight="bold" fill="${
			isFast ? '#dc2626' : '#1d4ed8'
		}">${label}</text>`;
		return s;
	};

	body += drawBeaker(48, opts.leftLabel, opts.fastSide === 'left');
	body += drawBeaker(232, opts.rightLabel, opts.fastSide === 'right');
	body += `<text x="180" y="188" text-anchor="middle" font-size="11" fill="#475569">لاحظ كثافة الفقاعات الغازية المنطلقة في الكأسين</text>`;
	return wrapPhysicsSvg(360, 210, body);
}

function svgFunctionalChain(blocks: string[], stateVerbs: string[], actionVerbs: string[]): string {
	const w = 440;
	const h = 155;
	const n = blocks.length;
	const stepX = (w - 40) / n;
	let body = `<defs><marker id="fcArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/></marker></defs>`;
	body += `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">نموذج السلسلة الوظيفية</text>`;

	for (let i = 0; i < n; i++) {
		const cx = 20 + stepX * i + stepX / 2;
		const rx = Math.min(42, stepX * 0.36);
		body += `<ellipse cx="${cx.toFixed(1)}" cy="78" rx="${rx.toFixed(1)}" ry="20" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>`;
		body += `<text x="${cx.toFixed(1)}" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">${blocks[i]}</text>`;
		body += `<text x="${cx.toFixed(1)}" y="118" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">${stateVerbs[i]}</text>`;
		if (i < n - 1) {
			const nextCx = 20 + stepX * (i + 1) + stepX / 2;
			const x1 = cx + rx + 2;
			const x2 = nextCx - rx - 3;
			body += `<line x1="${x1.toFixed(1)}" y1="78" x2="${x2.toFixed(1)}" y2="78" stroke="#2563eb" stroke-width="1.8" marker-end="url(#fcArr)"/>`;
			body += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="66" text-anchor="middle" font-size="10" font-weight="bold" fill="#059669">${actionVerbs[i]}</text>`;
		}
	}
	return wrapPhysicsSvg(w, h, body);
}

// ─── Reaction Pool for T1 ────────────────────────────────────────────────────

interface ReactionEntry {
	id: string;
	nameAr: string;
	contextAr: string;
	lhs: ChemTerm[];
	rhs: ChemTerm[];
	unbalancedKatex: string;
	unbalancedTypst: string;
	atomSummaryAr: string;
}

const REACTION_POOL: ReactionEntry[] = [
	{
		id: 'ch4_complete',
		nameAr: 'الاحتراق التام لغاز الميثان',
		contextAr: 'احتراق غاز المدينة (الميثان) في موقد مزود بتهوية كافية',
		lhs: [
			{ coeff: 1, formula: 'CH4', state: 'g' },
			{ coeff: 2, formula: 'O2', state: 'g' }
		],
		rhs: [
			{ coeff: 1, formula: 'CO2', state: 'g' },
			{ coeff: 2, formula: 'H2O', state: 'l' }
		],
		unbalancedKatex: chemEquation(
			[
				{ coeff: 1, formula: 'CH4', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).katex,
		unbalancedTypst: chemEquation(
			[
				{ coeff: 1, formula: 'CH4', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).typst,
		atomSummaryAr: 'C: 1=1 ، H: 4=4 ، O: 4=4'
	},
	{
		id: 'c3h8_complete',
		nameAr: 'الاحتراق التام لغاز البروبان',
		contextAr: 'احتراق غاز البروبان المستعمل في بعض السخانات الصناعية بوفرة ثنائي الأكسجين',
		lhs: [
			{ coeff: 1, formula: 'C3H8', state: 'g' },
			{ coeff: 5, formula: 'O2', state: 'g' }
		],
		rhs: [
			{ coeff: 3, formula: 'CO2', state: 'g' },
			{ coeff: 4, formula: 'H2O', state: 'l' }
		],
		unbalancedKatex: chemEquation(
			[
				{ coeff: 1, formula: 'C3H8', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).katex,
		unbalancedTypst: chemEquation(
			[
				{ coeff: 1, formula: 'C3H8', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).typst,
		atomSummaryAr: 'C: 3=3 ، H: 8=8 ، O: 10=10'
	},
	{
		id: 'c4h10_complete',
		nameAr: 'الاحتراق التام لغاز البوتان',
		contextAr: 'احتراق غاز البوتان في قارورة الطهي المنزلية بوفرة ثنائي الأكسجين',
		lhs: [
			{ coeff: 2, formula: 'C4H10', state: 'g' },
			{ coeff: 13, formula: 'O2', state: 'g' }
		],
		rhs: [
			{ coeff: 8, formula: 'CO2', state: 'g' },
			{ coeff: 10, formula: 'H2O', state: 'l' }
		],
		unbalancedKatex: chemEquation(
			[
				{ coeff: 1, formula: 'C4H10', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).katex,
		unbalancedTypst: chemEquation(
			[
				{ coeff: 1, formula: 'C4H10', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).typst,
		atomSummaryAr: 'C: 8=8 ، H: 20=20 ، O: 26=26'
	},
	{
		id: 'c2h6_complete',
		nameAr: 'الاحتراق التام لغاز الإيثان',
		contextAr: 'احتراق غاز الإيثان في وجود كمية كافية من ثنائي الأكسجين',
		lhs: [
			{ coeff: 2, formula: 'C2H6', state: 'g' },
			{ coeff: 7, formula: 'O2', state: 'g' }
		],
		rhs: [
			{ coeff: 4, formula: 'CO2', state: 'g' },
			{ coeff: 6, formula: 'H2O', state: 'l' }
		],
		unbalancedKatex: chemEquation(
			[
				{ coeff: 1, formula: 'C2H6', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).katex,
		unbalancedTypst: chemEquation(
			[
				{ coeff: 1, formula: 'C2H6', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[
				{ coeff: 1, formula: 'CO2', state: 'g' },
				{ coeff: 1, formula: 'H2O', state: 'l' }
			]
		).typst,
		atomSummaryAr: 'C: 4=4 ، H: 12=12 ، O: 14=14'
	},
	{
		id: 'water_electrolysis',
		nameAr: 'التحليل الكهربائي للماء',
		contextAr: 'تفكك الماء المقطر المضاف إليه الصودا بالتيار الكهربائي المستمر',
		lhs: [{ coeff: 2, formula: 'H2O', state: 'l' }],
		rhs: [
			{ coeff: 2, formula: 'H2', state: 'g' },
			{ coeff: 1, formula: 'O2', state: 'g' }
		],
		unbalancedKatex: chemEquation(
			[{ coeff: 1, formula: 'H2O', state: 'l' }],
			[
				{ coeff: 1, formula: 'H2', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			]
		).katex,
		unbalancedTypst: chemEquation(
			[{ coeff: 1, formula: 'H2O', state: 'l' }],
			[
				{ coeff: 1, formula: 'H2', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			]
		).typst,
		atomSummaryAr: 'H: 4=4 ، O: 2=2'
	},
	{
		id: 'iron_combustion',
		nameAr: 'احتراق الحديد في ثنائي الأكسجين',
		contextAr: 'احتراق سلك حديد متوهج داخل قارورة مملوءة بغاز ثنائي الأكسجين',
		lhs: [
			{ coeff: 3, formula: 'Fe', state: 's' },
			{ coeff: 2, formula: 'O2', state: 'g' }
		],
		rhs: [{ coeff: 1, formula: 'Fe3O4', state: 's' }],
		unbalancedKatex: chemEquation(
			[
				{ coeff: 1, formula: 'Fe', state: 's' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[{ coeff: 1, formula: 'Fe3O4', state: 's' }]
		).katex,
		unbalancedTypst: chemEquation(
			[
				{ coeff: 1, formula: 'Fe', state: 's' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[{ coeff: 1, formula: 'Fe3O4', state: 's' }]
		).typst,
		atomSummaryAr: 'Fe: 3=3 ، O: 4=4'
	}
];

// ═══════════════════════════════════════════════════════════════════════════════
// 1. التفاعل الكيميائي: الفرد والنوع والاحتراق التام وغير التام
// ═══════════════════════════════════════════════════════════════════════════════
const chemicalReactionModelTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_chemical_reaction_model',
	grade: '3am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'التفاعل الكيميائي: الفرد والنوع والاحتراق التام وغير التام',
	curriculumLessonId: 'phy_lesson_3am_t1_chemical_reaction_model',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const fuels = [
			{ nameAr: 'غاز الميثان', formula: 'CH4' },
			{ nameAr: 'غاز البروبان', formula: 'C3H8' },
			{ nameAr: 'غاز البوتان', formula: 'C4H10' }
		];
		const fuel = rng.pick(fuels);
		const isComplete = difficulty === 'easy' ? seed % 2 === 0 : false;
		const spFuel = chemSpecies(fuel.formula, 'g');
		const spO2 = chemSpecies('O2', 'g');
		const spCO2 = chemSpecies('CO2', 'g');
		const spCO = chemSpecies('CO', 'g');
		const spH2O = chemSpecies('H2O', 'l');
		const spC = chemSpecies('C', 's');

		const svg = svgCombustionFlame({
			isComplete,
			fuelLabel: `${fuel.nameAr} (${fuel.formula})`,
			airHoleLabel: isComplete ? 'تهوية مفتوحة' : 'تهوية مسدودة'
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t1_comb_${difficulty}_s${cleanSeed}`, svg);

		const correctMcqText = isComplete
			? `احتراق تام (وفرة ${spO2.katex}) وينتج ${spCO2.katex} و ${spH2O.katex}`
			: `احتراق غير تام (نقص ${spO2.katex}) وينتج عنه ${spCO.katex} السام و ${spC.katex}`;

		const mcq = buildUniqueMcqOptions(
			correctMcqText,
			[
				{
					text: isComplete
						? `احتراق غير تام (نقص ${spO2.katex}) وينتج عنه ${spCO.katex} و ${spC.katex}`
						: `احتراق تام (وفرة ${spO2.katex}) وينتج ${spCO2.katex} و ${spH2O.katex} فقط`,
					diagnosticFeedback: isComplete
						? 'اللون الأزرق المنتظم يدل على وفرة الأكسجين وحدوث احتراق تام.'
						: 'اللون الأصفر وظهور الهباب يدلان على نقص الأكسجين وحدوث احتراق غير تام.'
				},
				{
					text: `تحول فيزيائي فقط لا تتغير فيه طبيعة الجزيئات`,
					diagnosticFeedback: 'الاحتراق تحول كيميائي تتفكك فيه الجزيئات الابتدائية وتتشكل أنواع جديدة.'
				},
				{
					text: `احتراق تام ينتج غاز ثنائي الهيدروجين ${chemSpecies('H2', 'g').katex} فقط`,
					diagnosticFeedback: 'احتراق الفحوم الهيدروجينية لا ينتج غاز الهيدروجين الحر بل ينتج الماء وأكاسيد الكربون.'
				}
			],
			rng
		);

		const eqText = isComplete
			? chemEquation(
					[
						{ coeff: 1, formula: 'CH4', state: 'g' },
						{ coeff: 2, formula: 'O2', state: 'g' }
					],
					[
						{ coeff: 1, formula: 'CO2', state: 'g' },
						{ coeff: 2, formula: 'H2O', state: 'l' }
					]
				)
			: chemEquation(
					[
						{ coeff: 2, formula: 'CH4', state: 'g' },
						{ coeff: 3, formula: 'O2', state: 'g' }
					],
					[
						{ coeff: 2, formula: 'CO', state: 'g' },
						{ coeff: 4, formula: 'H2O', state: 'l' }
					]
				);
		void eqText;

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `أثناء مراقبة موقد غاز يعمل بـ ${fuel.nameAr} (${spFuel.katex})، لاحظنا الشكل المقابل (${
				isComplete ? 'لهب أزرق مستقر' : 'لهب أصفر منير مع ترسّب طبقة سوداء'
			}).\n\nما نوع هذا الاحتراق وما أبرز نواتجه؟`,
			questionTextAr: `ما نوع احتراق ${fuel.nameAr} الموضح في الشكل وما نواتجه؟`,
			imageUrl,
			imageCaption: isComplete ? 'موقد بلهب أزرق' : 'موقد بلهب أصفر وهباب',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: isComplete
				? `اللهب الأزرق دليل على وفرة ${spO2.katex} وحدوث احتراق تام نواتجه ${spCO2.katex} و ${spH2O.katex}.`
				: `اللهب الأصفر وهباب الفحم (${spC.katex}) يدلان على نقص ${spO2.katex} وحدوث احتراق غير تام يُنتج أيضاً غاز ${spCO.katex} السام.`
		};

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أثناء حصة مخبرية، فحص التلاميذ اشتعال ${fuel.nameAr} (${spFuel.typst}) في موقد بنزن كما يوضح الشكل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) صنّف في جملة مفيدة كلاً من: جزيء ${spFuel.typst} الواحد، وكمية الغاز المحجوزة في الأنبوب (فرد كيميائي أم نوع كيميائي).\n\n2) حدّد نوع الاحتراق المبين في الشكل مع التعليل.\n\n3) اذكر المتفاعلات والنواتج في هذا التحول الكيميائي، وبيّن كيف نكشف تجريبياً عن كل من ${spCO2.typst} والماء ${spH2O.typst}.`,
								answer: `1) جزيء ${spFuel.typst} الواحد هو *فرد كيميائي* (حبيبة مجهرية)، أما الغاز المحجوز في الأنبوب فهو *نوع كيميائي* (عياني).\n\n2) نوع الاحتراق: ${
									isComplete
										? `*احتراق تام* لوجود لهب أزرق يدل على وفرة ${spO2.typst}.`
										: `*احتراق غير تام* لوجود لهب أصفر وهباب الفحم ${spC.typst} بسبب نقص ${spO2.typst}.`
								}\n\n3) المتفاعلات: ${spFuel.typst} و ${spO2.typst}. النواتج: ${
									isComplete
										? `${spCO2.typst} و ${spH2O.typst}.`
										: `${spCO2.typst}، ${spH2O.typst}، ${spCO.typst} (سام)، وهباب الفحم ${spC.typst}.`
								}\n- الكشف عن ${spCO2.typst}: يعكّر رائق الكلس.\n- الكشف عن ${spH2O.typst}: قطرات مائية على جدار بارد أو يزرقّ كبريتات النحاس اللامائية.`,
								mark: '4.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'حالة لهب الموقد'
							}
						]
					},
					{
						type: 'text',
						content: isComplete
							? `4) ماذا يحدث لو أُغلقت فتحة التهوية في الموقد جزئياً؟`
							: `4) ما الغاز الأخطر الناتج في هذه الحالة، وما الحلّ العملي لتفادي اختناق السكان؟`,
						answer: isComplete
							? `4) ينقص غاز ${spO2.typst} ويتحوّل الاحتراق إلى احتراق غير تام بلهب أصفر وتنتج مواد ضارة (${spCO.typst} و ${spC.typst}).`
							: `4) الغاز الأخطر هو أحادي أكسيد الكربون ${spCO.typst} (سام، عديم اللون والرائحة). الحل: تنظيف منافذ الموقد وفتح التهوية باستمرار.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'ميّز بين المستوى المجهري (فرد كيميائي) والمستوى العياني (نوع كيميائي).',
				isComplete
					? 'اللهب الأزرق يرافق دائماً وفرة ثنائي الأكسجين.'
					: 'اللهب الأصفر والدخان الأسود دليلان على نقص ثنائي الأكسجين.',
				'الكشف عن $\\text{CO}_2$ يتم برائق الكلس، وعن الماء بكبريتات النحاس اللامائية.'
			],
			solutionStepsAr: [
				`جزيء ${spFuel.katex} فرد كيميائي، والغاز نوع كيميائي.`,
				isComplete
					? `الاحتراق تام لوفرة ${spO2.katex} وينتج ${spCO2.katex} و ${spH2O.katex}.`
					: `الاحتراق غير تام لنقص ${spO2.katex} وينتج أيضاً ${spCO.katex} و ${spC.katex}.`
			],
			finalAnswer: isComplete ? 'احتراق تام (CO₂ + H₂O)' : 'احتراق غير تام (CO + C + CO₂ + H₂O)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. موازنة معادلات التفاعل الكيميائي وانحفاظ الذرات
// ═══════════════════════════════════════════════════════════════════════════════
const balancingEquationsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_balancing_equations',
	grade: '3am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'كتابة وموازنة معادلات التفاعل الكيميائي',
	curriculumLessonId: 'phy_lesson_3am_t1_balancing_chemical_equations',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const poolSubset =
			difficulty === 'easy'
				? REACTION_POOL.filter((r) => ['ch4_complete', 'water_electrolysis', 'iron_combustion'].includes(r.id))
				: difficulty === 'medium'
					? REACTION_POOL.filter((r) => ['ch4_complete', 'c3h8_complete', 'iron_combustion', 'water_electrolysis'].includes(r.id))
					: REACTION_POOL.filter((r) => ['c4h10_complete', 'c2h6_complete', 'c3h8_complete'].includes(r.id));

		const chosen = rng.pick(poolSubset);
		const second = rng.pick(REACTION_POOL.filter((r) => r.id !== chosen.id));

		const correctEq = chemEquation(chosen.lhs, chosen.rhs);
		const secondEq = chemEquation(second.lhs, second.rhs);

		// Build 3 realistic unbalanced / misbalanced distractors
		const distractor1 = chemEquation(
			chosen.lhs.map((t) => ({ ...t, coeff: 1 })),
			chosen.rhs.map((t) => ({ ...t, coeff: 1 }))
		).katex;
		const distractor2 = chemEquation(
			chosen.lhs.map((t, idx) => ({ ...t, coeff: idx === 1 ? Number(t.coeff ?? 1) + 1 : t.coeff })),
			chosen.rhs
		).katex;
		const distractor3 = chemEquation(
			chosen.lhs,
			chosen.rhs.map((t, idx) => ({ ...t, coeff: idx === 0 ? Number(t.coeff ?? 1) + 1 : t.coeff }))
		).katex;

		const mcq = buildUniqueMcqOptions(
			correctEq.katex,
			[
				{
					text: distractor1,
					diagnosticFeedback: 'الذرات غير محفوظة عدداً! يجب ضبط المعاملات الستوكيوميترية أمام الصيغ.'
				},
				{
					text: distractor2,
					diagnosticFeedback: 'تحقق من عدد ذرات المتفاعلات؛ أحد المعاملات في الطرف الأيسر زائد عن الحاجة.'
				},
				{
					text: distractor3,
					diagnosticFeedback: 'تحقق من موازنة النواتج في الطرف الأيمن بحيث يتساوى عدد كل نوع من الذرات.'
				}
			],
			rng
		);

		let imageUrl: string | undefined;
		if (chosen.id === 'water_electrolysis' || second.id === 'water_electrolysis') {
			const svg = svgElectrolysisCell({
				solutionLabel: 'ماء مقطر + صودا',
				anodeGas: 'O₂ (+)',
				cathodeLabel: 'H₂ (-)'
			});
			imageUrl = savePhysicsSvgAsset(`phy_3am_t1_elec_${difficulty}_s${cleanSeed}`, svg);
		}

		const spFe = chemSpecies('Fe', 's');
		const spS = chemSpecies('S', 's');
		const spFeS = chemSpecies('FeS', 's');
		const eqFeS = chemEquation(
			[
				{ coeff: 1, formula: 'Fe', state: 's' },
				{ coeff: 1, formula: 'S', state: 's' }
			],
			[{ coeff: 1, formula: 'FeS', state: 's' }]
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر التحول الكيميائي التالي: **${chosen.nameAr}** (${chosen.contextAr}).\n\nما المعادلة الكيميائية المتوازنة الصحيحة المرفقة بالحالات الفيزيائية؟`,
				questionTextAr: `اختر المعادلة المتوازنة الصحيحة لـ ${chosen.nameAr}:`,
				imageUrl: imageUrl ?? null,
				imageCaption: imageUrl ? 'جهاز التحليل الكهربائي للماء (وعاء فولطا)' : null,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بتطبيق مبدأ انحفاظ الذرات نوعاً وعدداً (${chosen.atomSummaryAr}) تكون المعادلة المتوازنة هي: ${correctEq.katex}.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: 'تحقّق من مبدأ انحفاظ الذرات نوعاً وعدداً بموازنة المعادلات الكيميائية التالية مع كتابة الحالة الفيزيائية:',
				content: [
					...(imageUrl
						? [
								{
									type: 'image' as const,
									src: imageUrl,
									caption: 'تركيب التحليل الكهربائي للماء'
								}
							]
						: []),
					{
						type: 'text',
						content: `1) اذكر نص مبدأ انحفاظ الذرات في التفاعل الكيميائي، وفسّر دلالات الرموز الفيزيائية $(s)$ و $(l)$ و $(g)$ و $(a q)$.`,
						answer: `1) تبقى الذرات محفوظة *نوعاً وعدداً* خلال التفاعل الكيميائي (لا تفنى ولا تُخلق، بل يُعاد ترتيبها).\nالدلالات: $(s)$ صلب، $(l)$ سائل، $(g)$ غاز، $(a q)$ محلول مائي.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) وازن المعادلتين التاليتين:\n- أ) ${chosen.nameAr}: ${chosen.unbalancedTypst}\n- ب) ${second.nameAr}: ${second.unbalancedTypst}`,
						answer: `2) أ) ${correctEq.typst} (${chosen.atomSummaryAr}).\n- ب) ${secondEq.typst} (${second.atomSummaryAr}).`,
						mark: '3'
					},
					{
						type: 'text',
						content: `3) عند تسخين مزيج من مسحوق الحديد ${spFe.typst} ومسحوق الكبريت ${spS.typst} يتشكّل كبريت الحديد الصلب ${spFeS.typst}. اكتب معادلة هذا التفاعل متوازنة.`,
						answer: `3) معادلة تشكل كبريت الحديد: ${eqFeS.typst}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'لا تغيّر أبداً الأرقام السفلية داخل الصيغة الكيميائية؛ أضف المعاملات أمام الصيغ فقط.',
				'في احتراق الفحوم الهيدروجينية، وازن بالترتيب: الكربون (C) ثم الهيدروجين (H) ثم الأكسجين (O).',
				`تحقق من تساوي عدد الذرات في الطرفين: (${chosen.atomSummaryAr}).`
			],
			solutionStepsAr: [
				`نكتب الصيغ بالحالات الفيزيائية: ${chosen.unbalancedKatex}.`,
				`نضبط المعاملات الستوكيوميترية لتحقيق الانحفاظ (${chosen.atomSummaryAr}).`,
				`المعادلة النهائية: ${correctEq.katex}.`
			],
			finalAnswer: correctEq.katex
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. العوامل المؤثرة في التحول الكيميائي (تجريبي)
// ═══════════════════════════════════════════════════════════════════════════════
const reactionFactorsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_reaction_factors',
	grade: '3am',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'العوامل المؤثرة في التحول الكيميائي (الحرارة وسطح التلامس)',
	curriculumLessonId: 'phy_lesson_3am_t1_chemical_reaction_factors',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const isTempMode = difficulty === 'easy' ? seed % 2 === 0 : rng.int(0, 1) === 0;
		const tCold = rng.int(8, 16);
		const tHot = rng.int(45, 65);
		const massG = rng.int(2, 6);
		const fastSide: 'left' | 'right' = seed % 2 === 0 ? 'right' : 'left';

		const leftLabel = isTempMode
			? fastSide === 'left'
				? `ماء ساخن (${tHot}°C)`
				: `ماء بارد (${tCold}°C)`
			: fastSide === 'left'
				? `قرص مسحوق (${massG} g)`
				: `قرص سليم (${massG} g)`;

		const rightLabel = isTempMode
			? fastSide === 'right'
				? `ماء ساخن (${tHot}°C)`
				: `ماء بارد (${tCold}°C)`
			: fastSide === 'right'
				? `قرص مسحوق (${massG} g)`
				: `قرص سليم (${massG} g)`;

		const svg = svgReactionFactorsBeakers({
			mode: isTempMode ? 'temperature' : 'surface',
			leftLabel,
			rightLabel,
			fastSide
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t1_factors_${difficulty}_s${cleanSeed}`, svg);

		const correctOption = isTempMode
			? 'عامل درجة الحرارة: ارتفاع درجة الحرارة يزيد من سرعة التحول الكيميائي'
			: 'عامل سطح التلامس: تفتيت القرص يزيد سطح التلامس فيسرّع التحول الكيميائي';

		const mcq = buildUniqueMcqOptions(
			correctOption,
			[
				{
					text: isTempMode
						? 'عامل سطح التلامس: الماء الساخن يفتت القرص قبل وضعه'
						: 'عامل درجة الحرارة: المسحوق يرفع حرارة الماء تلقائياً',
					diagnosticFeedback: isTempMode
						? 'في هذه التجربة القرصان متماثلان في الشكل، والمتغير الوحيد هو درجة حرارة الماء.'
						: 'في هذه التجربة درجة الحرارة متساوية في الكأسين، والمتغير هو حالة القرص (سليم مقابل مسحوق).'
				},
				{
					text: 'عامل الضغط الجوي: الكأس اليمنى معرضة لضغط أكبر',
					diagnosticFeedback: 'الكأسان مفتوحان في نفس الغرفة وتحت نفس الضغط الجوي.'
				},
				{
					text: 'عامل الكتلة: القرص في الكأس السريعة له كتلة مضاعفة',
					diagnosticFeedback: `لاحظ في السند أن كتلة القرصين متساوية ($${massG}\\text{ g}$).`
				}
			],
			rng
		);

		const tSlowSec = rng.int(55, 90);
		const tFastSec = rng.int(15, 32);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `وضع مخبري قرصين فوارين متماثلين كتلة كل منهما $${massG}\\text{ g}$ في كأسين بهما نفس حجم الماء ($100\\text{ mL}$):\n- الكأس اليسرى: ${leftLabel}\n- الكأس اليمنى: ${rightLabel}\n\nفانقضى التفاعل في ${fastSide === 'right' ? 'الكأس اليمنى' : 'الكأس اليسرى'} خلال $${tFastSec}\\text{ s}$ بينما استغرق $${tSlowSec}\\text{ s}$ في الكأس الأخرى. ما العامل المؤثر المبرز في هذه التجربة؟`,
				questionTextAr: 'ما العامل المؤثر المبرز في تجربة الكأسين بالوثيقة المرفقة؟',
				imageUrl,
				imageCaption: 'مقارنة سرعة فوران قرصين في كأسين',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: isTempMode
					? `ارتفاع درجة الحرارة من $${tCold}^\\circ\\text{C}$ إلى $${tHot}^\\circ\\text{C}$ زاد من سرعة التحول فنقص الزمن من $${tSlowSec}\\text{ s}$ إلى $${tFastSec}\\text{ s}$.`
					: `سحق القرص زاد من سطح التلامس مع الماء فزاد التصادم وتسارع التحول من $${tSlowSec}\\text{ s}$ إلى $${tFastSec}\\text{ s}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `لدراسة أحد العوامل المؤثرة في التحول الكيميائي، أجرى فوج من التلاميذ التجربة الموضحة في الشكل باستعمال قرصين فوارين كتلة كل منهما $${massG}$ غ ونفس حجم الماء $100$ مل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `- الكأس اليسرى: ${leftLabel} (المدة المسجلة: $${fastSide === 'left' ? tFastSec : tSlowSec}$ ثا).\n- الكأس اليمنى: ${rightLabel} (المدة المسجلة: $${fastSide === 'right' ? tFastSec : tSlowSec}$ ثا).\n\n1) حدّد في أي كأس كان التحول أسرع، وسمّ العامل المؤثر المدروس في هذه التجربة.`,
								answer: `1) كان التحول أسرع في *${fastSide === 'right' ? 'الكأس اليمنى' : 'الكأس اليسرى'}* ($${tFastSec}$ ثا مقابل $${tSlowSec}$ ثا).\nالعامل المؤثر المدروس هو: *${isTempMode ? 'درجة الحرارة' : 'سطح التلامس'}*.`,
								mark: '2'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'بروتوكول التجربة'
							}
						]
					},
					{
						type: 'text',
						content: `2) اذكر عاملاً ثانياً يؤثر في سرعة أو نواتج التحول الكيميائي مع مثال من الحياة اليومية.\n\n3) عند استبدال الماء بمحلول حمض كلور الماء المخفف مع برادة الحديد، اذكر قاعدتين للأمن المخبري يجب احترامهما.`,
						answer: `2) عامل آخر: *${isTempMode ? 'سطح التلامس' : 'درجة الحرارة'}* (أو *تركيب المزيج الابتدائي*). مثال: ${
							isTempMode
								? 'تتفاعل برادة الحديد أسرع من قطعة حديد، أو طحن القرص يسرع ذوبانه.'
								: 'حفظ الأغذية في الثلاجة يبطئ فسادها، أو تسخين الطعام في قدر الضغط يسرع طهيه.'
						}\n\n3) من قواعد الأمن المخبري: ارتداء القفازات والنظارات الواقية، وتوجيه فوهة أنبوب الاختبار بعيداً عن الأشخاص وتهوية المخبر.`,
						mark: '4'
					}
				]
			},
			hints: [
				'قارن المدة الزمنية في الكأسين: الزمن الأقصر يعني تفاعلاً أسرع.',
				'لاحظ ما الذي تغيّر بين الكأس اليسرى واليمنى مع ثبات الكتلة والحجم.',
				'العوامل الأساسية الثلاثة هي: درجة الحرارة، سطح التلامس، وتركيب/كمية المتفاعلات.'
			],
			solutionStepsAr: [
				`الكأس الأسرع هي ${fastSide === 'right' ? 'اليمنى' : 'اليسرى'} لأنها استغرقت $${tFastSec}\\text{ s}$ فقط.`,
				`العامل المدروس هو ${isTempMode ? 'درجة الحرارة' : 'سطح التلامس'}.`
			],
			finalAnswer: isTempMode ? 'عامل درجة الحرارة' : 'عامل سطح التلامس'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. السلسلة الوظيفية
// ═══════════════════════════════════════════════════════════════════════════════
const functionalChainTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_functional_chain',
	grade: '3am',
	trimesterId: 't1',
	domain: 'energy',
	titleAr: 'بناء السلسلة الوظيفية لتركيبة تكنولوجية',
	curriculumLessonId: 'phy_lesson_3am_t1_functional_chain',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const setups = [
			{
				title: 'إشعال مصباح بسقوط حجر',
				desc: 'نعلّق حجراً بخيط ملفوف حول بكرة متصلة بمنوبة (دينامو) موصولة بمصباح. عند تحرير الحجر يتوهج المصباح.',
				blocks: ['الحجر', 'البكرة', 'المنوبة', 'المصباح'],
				stateVerbs: ['يسقط', 'تدور', 'تدور', 'يتوهج'],
				actionVerbs: ['يدير', 'تدير', 'تغذي'],
				questionTarget: 'المنوبة والمصباح',
				answerPair: 'الحالة: تدور (المنوبة) / يتوهج (المصباح) — الأداء: تغذي',
				distractors: [
					{
						text: 'الحالة: تغذي (المنوبة) / يضيء (المصباح) — الأداء: تدور',
						diagnosticFeedback: 'عكست بين أفعال الحالة (تحت الفقاعة) وأفعال الأداء (فوق السهم)!'
					},
					{
						text: 'الحالة: يسقط (المنوبة) / يتبخر (المصباح) — الأداء: يسخن',
						diagnosticFeedback: 'المنوبة تدور ولا تسقط، والمصباح يتوهج ولا يتبخر.'
					},
					{
						text: 'الحالة: تتفرغ (المنوبة) / تدور (المصباح) — الأداء: تسحب',
						diagnosticFeedback: 'التفرغ خاص بالبطارية وليس بالمنوبة.'
					}
				]
			},
			{
				title: 'إضاءة مصباح بتدفق ماء سدٍّ مائي',
				desc: 'يتدفق الماء من أعلى سدٍّ مائي ليدير عنفة مرتبطة بمنوبة تغذي مصباح إنارة عمومية.',
				blocks: ['الماء', 'العنفة', 'المنوبة', 'المصباح'],
				stateVerbs: ['يتدفق', 'تدور', 'تدور', 'يتوهج'],
				actionVerbs: ['يدير', 'تدير', 'تغذي'],
				questionTarget: 'الماء والعنفة',
				answerPair: 'الحالة: يتدفق (الماء) / تدور (العنفة) — الأداء: يدير',
				distractors: [
					{
						text: 'الحالة: يدير (الماء) / يدور (العنفة) — الأداء: يتدفق',
						diagnosticFeedback: '«يدير» فعل أداء يُكتب فوق السهم، أما «يتدفق» ففعل حالة يُكتب تحت فقاعة الماء.'
					},
					{
						text: 'الحالة: يحترق (الماء) / تسخن (العنفة) — الأداء: يغذي',
						diagnosticFeedback: 'الماء في السد يتدفق ميكانيكياً ولا يحترق.'
					},
					{
						text: 'الحالة: يتمدد (الماء) / تتفرغ (العنفة) — الأداء: يضيء',
						diagnosticFeedback: 'هذه الأفعال تخص النابض والبطارية وليس السد المائي.'
					}
				]
			},
			{
				title: 'تحريك عربة صغيرة بخلية شمسية ومحرك',
				desc: 'تضيء الشمس لوحاً شمسياً متصلاً بمحرك كهربائي يدير عجلات عربة صغيرة.',
				blocks: ['الشمس', 'اللوح الشمسي', 'المحرك', 'العربة'],
				stateVerbs: ['تشع', 'يُثار', 'يدور', 'تتقدم'],
				actionVerbs: ['تضيء', 'يغذي', 'يدير'],
				questionTarget: 'المحرك والعربة',
				answerPair: 'الحالة: يدور (المحرك) / تتقدم (العربة) — الأداء: يدير',
				distractors: [
					{
						text: 'الحالة: يغذي (المحرك) / تسقط (العربة) — الأداء: يتوهج',
						diagnosticFeedback: '«يغذي» فعل أداء وليس فعل حالة، والعربة تتقدم أفقياً ولا تسقط.'
					},
					{
						text: 'الحالة: يحترق (المحرك) / يتوهج (العربة) — الأداء: يسخن',
						diagnosticFeedback: 'المحرك يدور والعربة تتحرك (تتقدم).'
					},
					{
						text: 'الحالة: يتفرغ (المحرك) / يدور (العربة) — الأداء: يضيء',
						diagnosticFeedback: 'المحرك يتغذى كهربائياً فيدور، ويدير العربة.'
					}
				]
			}
		];

		const setup =
			difficulty === 'easy'
				? setups[0]
				: difficulty === 'medium'
					? setups[rng.int(0, 1)]
					: setups[rng.int(1, 2)];

		const svgHidden = svgFunctionalChain(
			setup.blocks,
			setup.stateVerbs.map((_, i) => (i >= setup.blocks.length - 2 ? '؟' : setup.stateVerbs[i])),
			setup.actionVerbs.map((_, i) => (i === setup.actionVerbs.length - 1 ? '؟' : setup.actionVerbs[i]))
		);
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t1_fc_${difficulty}_s${cleanSeed}`, svgHidden);

		const mcq = buildUniqueMcqOptions(setup.answerPair, setup.distractors, rng);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نعتبر التركيبة الوظيفية التالية (**${setup.title}**): ${setup.desc}\n\nبالاعتماد على مخطط السلسلة الوظيفية المرفق، ما أفعال الحالة والأداء الصحيحة لـ **${setup.questionTarget}**؟`,
				questionTextAr: `أكمل السلسلة الوظيفية لـ ${setup.title} (${setup.questionTarget}):`,
				imageUrl,
				imageCaption: 'مخطط السلسلة الوظيفية المطلوب إكماله',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضع أفعال الحالة تحت الفقاعات (${setup.stateVerbs.join('، ')}) وأفعال الأداء فوق الأسهم (${setup.actionVerbs.join('، ')}).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `إليك التركيبة التكنولوجية الآتية (**${setup.title}**): ${setup.desc}`,
				content: [
					{
						type: 'image',
						src: imageUrl,
						caption: 'السلسلة الوظيفية غير المكتملة'
					},
					{
						type: 'text',
						content: `1) حدّد الجمل الأساسية المشاركة في هذه التركيبة (دون ذكر الأسلاك أو الحوامل).`,
						answer: `1) الجمل الأساسية هي بالترتيب: ${setup.blocks.join(' ← ')}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) ما الفرق بين موضع ودلالة «فعل الحالة» و«فعل الأداء» في السلسلة الوظيفية؟`,
						answer: `2) فعل الحالة يُكتب *تحت الفقاعة* ويصف حالة الجملة نفسها، بينما فعل الأداء يُكتب *فوق السهم* ويصف تأثير الجملة على التي تليها.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) أعد رسم السلسلة الوظيفية كاملة وأكمل أفعال الحالة وأفعال الأداء الناقصة في المخطط.`,
						answer: `3) السلسلة الكاملة:\n- الفقاعات: ${setup.blocks.join('  ←  ')}\n- أفعال الحالة (تحت الفقاعات): ${setup.stateVerbs.join('  |  ')}\n- أفعال الأداء (فوق الأسهم): ${setup.actionVerbs.join('  |  ')}.`,
						mark: '3'
					}
				]
			},
			hints: [
				'تُكتب الجمل الأساسية داخل فقاعات بيضاوية وتُهمل أسلاك التوصيل.',
				'تحت كل فقاعة نكتب فعل الحالة (ماذا تفعل الجملة؟).',
				'فوق كل سهم نكتب فعل الأداء (كيف تؤثر على الجملة التالية؟).'
			],
			solutionStepsAr: [
				`الجمل: ${setup.blocks.join(' ← ')}.`,
				`أفعال الحالة: ${setup.stateVerbs.join('، ')}.`,
				`أفعال الأداء: ${setup.actionVerbs.join('، ')}.`
			],
			finalAnswer: setup.answerPair
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. وضعية إدماجية 1: التسمم بغاز أحادي أكسيد الكربون ومدفأة الغاز
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHeaterTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_integration_heater',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: اختلال مدفأة الغاز المنزلية وسلسلة التهوية',
	curriculumLessonId: 'phy_lesson_3am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const useButane = difficulty === 'hard' || seed % 2 === 1;
		const fuelName = useButane ? 'غاز البوتان' : 'غاز المدينة (الميثان)';
		const fuelFormula = useButane ? 'C4H10' : 'CH4';
		const spFuel = chemSpecies(fuelFormula, 'g');
		const spO2 = chemSpecies('O2', 'g');
		const spCO2 = chemSpecies('CO2', 'g');
		const spCO = chemSpecies('CO', 'g');
		const spH2O = chemSpecies('H2O', 'l');
		const spC = chemSpecies('C', 's');

		const completeEq = useButane
			? chemEquation(
					[
						{ coeff: 2, formula: 'C4H10', state: 'g' },
						{ coeff: 13, formula: 'O2', state: 'g' }
					],
					[
						{ coeff: 8, formula: 'CO2', state: 'g' },
						{ coeff: 10, formula: 'H2O', state: 'l' }
					]
				)
			: chemEquation(
					[
						{ coeff: 1, formula: 'CH4', state: 'g' },
						{ coeff: 2, formula: 'O2', state: 'g' }
					],
					[
						{ coeff: 1, formula: 'CO2', state: 'g' },
						{ coeff: 2, formula: 'H2O', state: 'l' }
					]
				);

		const svg = svgCombustionFlame({
			isComplete: false,
			fuelLabel: `مدفأة بـ ${fuelName}`,
			airHoleLabel: 'غرفة مغلقة + انسداد التهوية'
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t1_int_heater_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`نقص ${spO2.katex} أدى لاحتراق غير تام أنتج غاز ${spCO.katex} السام، والحل فتح التهوية للحصول على ${completeEq.katex}`,
			[
				{
					text: `وفرة ${spO2.katex} أدت لاحتراق تام أنتج ${spCO2.katex} فقط ولا خطر في الغرفة`,
					diagnosticFeedback: 'اللهب الأصفر والهباب والصداع تدل على احتراق غير تام خطير.'
				},
				{
					text: `احتراق تام لـ ${spFuel.katex} يعطي هباب الفحم ${spC.katex} بالضرورة`,
					diagnosticFeedback: 'هباب الفحم يظهر فقط في الاحتراق غير التام عند نقص الأكسجين.'
				},
				{
					text: `تحول فيزيائي يتبخر فيه ${spFuel.katex} دون تفاعل كيميائي`,
					diagnosticFeedback: 'الاحتراق تحول كيميائي تتفاعل فيه مادة الوقود مع ثنائي الأكسجين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في ليلة شتوية باردة، شعرت عائلة بصداع ودوار داخل غرفة مغلقة تعمل فيها مدفأة بـ ${fuelName} (${spFuel.katex})، ولاحظ الأب أن لهب المدفأة صار **أصفر** مع ظهور سواد على الجدار الخلفي.\n\nما التشخيص العلمي الدقيق والمعادلة المرجوة بعد الإصلاح؟`,
				questionTextAr: `تشخيص خلل مدفأة ${fuelName} ومعادلة إصلاحه:`,
				imageUrl,
				imageCaption: 'ملاحظة لهب المدفأة داخل الغرفة المغلقة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نقص ${spO2.katex} سبب احتراقاً غير تام أنتج ${spCO.katex} السام و ${spC.katex}. بعد فتح التهوية يتحقق الاحتراق التام: ${completeEq.katex}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `في إحدى ليالي الشتاء، أغلقت عائلة جميع النوافذ لتدفئة المنزل بواسطة مدفأة تشتغل بـ ${fuelName} (${spFuel.typst})، وبعد ساعة أحسّ الأفراد بدوار وغثيان ولاحظوا تحوّل لون لهب المدفأة إلى *الأصفر* وظهور طبقة سوداء حول المدخنة.`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (التفسير الكيميائي ومعادلة التفاعل):\n\n1) فسّر سبب اصفرار اللهب وظهور السواد وأعراض الدوار، وحدّد العامل المؤثر الذي اختلّ في هذا التفاعل.\n\n2) اذكر الغاز السام المتشكل والأنواع الكيميائية الناتجة في هذه الحالة.`,
								answer: `الجزء الأول:\n\n1) سببه حدوث *احتراق غير تام* نتيجة نقص غاز ثنائي الأكسجين ${spO2.typst} (عامل تركيب/كمية المتفاعلات الابتدائية)، فظهر هباب الفحم ${spC.typst} وتشكّل غاز خطير.\n\n2) الغاز السام هو *أحادي أكسيد الكربون* ${spCO.typst} (عديم اللون والرائحة)، وتنتج أيضاً ${spCO2.typst} و ${spH2O.typst} و ${spC.typst}.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'سند: مظهر لهب المدفأة'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (الموازنة والتركيبة الوظيفية للتهوية):\n\n3) بعد تهوية الغرفة وتنظيف حاقن المدفأة عاد اللهب أزرق. اكتب ووازن معادلة الاحتراق التام لـ ${fuelName} مرفقة بالحالات الفيزيائية.\n\n4) ركّب الأب مروحة تهوية (شفاط هواء) تشتغل ببطارية احتياطية ومحرك كهربائي. أنشئ السلسلة الوظيفية لهذه التركيبة (` +
							`بطارية ← محرك ← مروحة` +
							`) مع كتابة أفعال الحالة وأفعال الأداء.`,
						answer: `3) معادلة الاحتراق التام المتوازنة:\n${completeEq.typst}\n\n4) السلسلة الوظيفية لمروحة التهوية:\n- الفقاعات: البطارية ← المحرك ← المروحة\n- أفعال الحالة (تحت الفقاعات): تتفرغ | يدور | تدور\n- أفعال الأداء (فوق الأسهم): تغذي | يدير`,
						mark: '3.5'
					},
					{
						type: 'text',
						content: `5) قدّم نصيحتين وقائيتين للعائلات لتجنب حوادث الاختناق بالغاز شتاءً.`,
						answer: `5) النصائح:\n- ضمان التهوية الدائمة وعدم سدّ منافذ الهواء.\n- الصيانة الدورية لأجهزة التدفئة قبل الشتاء وتركيب كاشف غاز ${spCO.typst}.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'اللون الأصفر والسواد يدلان على نقص الأكسجين (احتراق غير تام).',
				'في المعادلة، وازن C ثم H ثم O مع إرفاق الحالة الفيزيائية (g) و (l).',
				'في السلسلة الوظيفية للشفاط: البطارية تتفرغ وتغذي المحرك الذي يدور ويدير المروحة.'
			],
			solutionStepsAr: [
				`التفسير: احتراق غير تام بسبب نقص ${spO2.katex} مما أنتج ${spCO.katex} و ${spC.katex}.`,
				`المعادلة التامة المتوازنة: ${completeEq.katex}.`,
				'السلسلة الوظيفية: البطارية (تتفرغ) $\\xrightarrow{\\text{تغذي}}$ المحرك (يدور) $\\xrightarrow{\\text{يدير}}$ المروحة (تدور).'
			],
			finalAnswer: `احتراق غير تام (${spCO.katex})؛ الإصلاح: ${completeEq.katex}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. وضعية إدماجية 2: محطة إنتاج الهيدروجين النظيف (التحليل الكهربائي + السلسلة الوظيفية)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationElectrolysisEnergyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t1_integration_electrolysis_energy',
	grade: '3am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: إنتاج الهيدروجين بالتحليل الكهربائي وسلسلة الطاقة المتجددة',
	curriculumLessonId: 'phy_lesson_3am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const useWind = difficulty !== 'easy' && seed % 2 === 1;
		const sourceLabel = useWind ? 'توربين رياح (عنفة هوائية)' : 'توربين سد مائي';
		const firstBlock = useWind ? 'الرياح' : 'الماء';
		const firstState = useWind ? 'تهب' : 'يتدفق';

		const eqElec = chemEquation(
			[{ coeff: 2, formula: 'H2O', state: 'l' }],
			[
				{ coeff: 2, formula: 'H2', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			]
		);
		const eqH2Comb = chemEquation(
			[
				{ coeff: 2, formula: 'H2', state: 'g' },
				{ coeff: 1, formula: 'O2', state: 'g' }
			],
			[{ coeff: 2, formula: 'H2O', state: 'l' }]
		);

		const svg = svgElectrolysisCell({
			solutionLabel: 'ماء + صودا (NaOH)',
			anodeGas: 'O₂ (توهج)',
			cathodeLabel: 'H₂ (فرقعة)'
		});
		const imageUrl = savePhysicsSvgAsset(
			`phy_3am_t1_int_elec_${difficulty}_s${cleanSeed}`,
			svg
		);

		const mcq = buildUniqueMcqOptions(
			`المهبط (-) ينتج ${chemSpecies('H2', 'g').katex} (فرقعة باللهب) والمصعد (+) ينتج ${chemSpecies('O2', 'g').katex} (يزيد التوهج) وفق ${eqElec.katex}`,
			[
				{
					text: `المهبط (-) ينتج ${chemSpecies('O2', 'g').katex} والمصعد (+) ينتج ${chemSpecies('CO2', 'g').katex}`,
					diagnosticFeedback: 'الماء لا يحتوي على ذرات الكربون حتى ينتج ثنائي أكسيد الكربون!'
				},
				{
					text: `ينتج ${chemSpecies('H2', 'g').katex} فقط دون أي غاز آخر لأن المعادلة $\\ce{H2O -> H2 + O}$`,
					diagnosticFeedback: 'غاز الأكسجين يتشكل كجزيء ثنائي الذرة O₂ وليس ذرة منفردة O.'
				},
				{
					text: `هذا التحول فيزيائي لأنه يستهلك ماءً ويعطي غازات من الماء`,
					diagnosticFeedback: 'تفكك الماء إلى هيدروجين وأكسجين تحول كيميائي تتغير فيه الجزيئات.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تُستعمل طاقة متجددة (${sourceLabel}) لتشغيل وعاء تحليل كهربائي للماء من أجل إنتاج غاز الهيدروجين النظيف.\n\nما الغازان المنطلقان عند القطبين، وكيف نكشف عنهما، وما معادلة التحليل المتوازنة؟`,
				questionTextAr: 'نواتج التحليل الكهربائي للماء ومعادلته المتوازنة:',
				imageUrl,
				imageCaption: 'خلية التحليل الكهربائي للماء',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عند المهبط (-) ينطلق ${chemSpecies('H2', 'g').katex} (يُكشف عنه بالفرقعة) وعند المصعد (+) ينطلق ${chemSpecies('O2', 'g').katex} (يزيد التوهج)، وفق المعادلة: ${eqElec.katex}.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `في مشروع بيئي للانتقال الطاقوي، صمّم تلاميذ نموذجاً لإنتاج غاز ثنائي الهيدروجين ${chemSpecies('H2', 'g').typst} (وقود نظيف) انطلاقاً من التحليل الكهربائي للماء المغذى بواسطة ${sourceLabel}.`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (السلسلة الوظيفية للتغذية):\n\n1) أنشئ السلسلة الوظيفية التي تسمح بتشغيل وعاء التحليل الكهربائي انطلاقاً من (${firstBlock} ← عنفة ← منوبة ← وعاء التحليل) مع توضيح أفعال الحالة وأفعال الأداء.\n\n2) ما دور إضافة بضع قطرات من الصودا إلى الماء المقطر؟`,
								answer: `1) السلسلة الوظيفية:\n- الفقاعات: ${firstBlock} ← العنفة ← المنوبة ← وعاء التحليل\n- أفعال الحالة (تحت الفقاعات): ${firstState} | تدور | تدور | يتحلل (الماء)\n- أفعال الأداء (فوق الأسهم): ${useWind ? 'تدير' : 'يدير'} | تدير | تغذي\n\n2) الماء المقطر عازل تقريباً، وتُضاف الصودا لجعله ناقلاً للتيار الكهربائي دون أن تشارك في نواتج التفكك.`,
								mark: '3'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'وعاء التحليل الكهربائي للماء'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (التفاعل الكيميائي والموازنة):\n\n3) سمّ الغازين المنطلقين عند المسرَيين، واذكر تجربة الكشف عن كل منهما.\n\n4) اكتب ووازن معادلة التحليل الكهربائي للماء مع إرفاق الحالات الفيزيائية، ثم اكتب معادلة احتراق الهيدروجين الناتج في ثنائي الأكسجين.\n\n5) إذا أردنا تسريع التحليل الكهربائي بتسخين الماء قليلاً، فما العامل المؤثر الموظف هنا؟`,
						answer: `3) عند المهبط (-): ثنائي الهيدروجين ${chemSpecies('H2', 'g').typst} (يحدث فرقعة خفيفة بعود ثقاب مشتعل).\nعند المصعد (+): ثنائي الأكسجين ${chemSpecies('O2', 'g').typst} (يزيد توهج عود ثقاب على وشك الانطفاء).\n\n4) التحليل الكهربائي: ${eqElec.typst}.\nاحتراق الهيدروجين: ${eqH2Comb.typst}.\n\n5) العامل المؤثر الموظف هو *درجة الحرارة* (رفع الحرارة يسرّع التحول الكيميائي).`,
						mark: '5'
					}
				]
			},
			hints: [
				'في السلسلة الوظيفية، المنوبة تدور وتغذي وعاء التحليل الكهربائي.',
				'تذكّر الكشف عن الغازين: الهيدروجين يحدث فرقعة، والأكسجين يزيد التوهج.',
				'احرص على كتابة 2 أمام H₂O و 2 أمام H₂ لتحقيق انحفاظ ذرات الأكسجين والهيدروجين.'
			],
			solutionStepsAr: [
				`السلسلة الوظيفية: ${firstBlock} (${firstState}) ← العنفة (تدور) ← المنوبة (تدور) ← وعاء التحليل (يتحلل الماء).`,
				`المعادلة المتوازنة للتحليل: ${eqElec.katex}، وللاحتراق: ${eqH2Comb.katex}.`
			],
			finalAnswer: eqElec.katex
		};
	}
};

export const PHYSICS_TEMPLATES_3AM_T1: PhysicsParameterizedTemplate[] = [
	chemicalReactionModelTemplate,
	balancingEquationsTemplate,
	reactionFactorsTemplate,
	functionalChainTemplate,
	integrationHeaterTemplate,
	integrationElectrolysisEnergyTemplate
];
