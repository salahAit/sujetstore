import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 1AM T1 SVG Builders (Pure Arabic / Separate Badges, Zero paint-order)
// ═══════════════════════════════════════════════════════════════════════════════

function buildCharringLabSvg(sampleA: string, sampleB: string, charsA: boolean, charsB: boolean): string {
	const drawSide = (x: number, title: string, sample: string, chars: boolean) =>
		`<rect x="${x}" y="42" width="198" height="172" rx="9" fill="${chars ? '#fffbeb' : '#eff6ff'}" stroke="${chars ? '#d97706' : '#2563eb'}" stroke-width="1.7"/>` +
		`<text x="${x + 99}" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${esc(title)}</text>` +
		`<text x="${x + 99}" y="84" text-anchor="middle" font-size="11" font-weight="bold" fill="${chars ? '#b45309' : '#1d4ed8'}">${esc(sample)}</text>` +
		`<path d="M ${x + 68} 118 Q ${x + 99} 134 ${x + 130} 118 L ${x + 124} 134 Q ${x + 99} 144 ${x + 74} 134 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.4"/>` +
		`<ellipse cx="${x + 99}" cy="116" rx="22" ry="8" fill="${chars ? '#1e293b' : '#f8fafc'}" stroke="#475569" stroke-width="1.3"/>` +
		`<path d="M ${x + 99} 144 Q ${x + 91} 158 ${x + 99} 170 Q ${x + 107} 158 ${x + 99} 144 Z" fill="#f97316"/>` +
		`<path d="M ${x + 99} 151 Q ${x + 95} 160 ${x + 99} 166 Q ${x + 103} 160 ${x + 99} 151 Z" fill="#fde047"/>` +
		`<text x="${x + 99}" y="196" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${chars ? '#991b1b' : '#1e40af'}">${chars ? 'يحترق ويتفحم (لون أسود)' : 'لا يحترق ولا يتفحم'}</text>`;

	return wrapSciencesSvg(
		460,
		230,
		`<rect x="6" y="6" width="448" height="218" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة التسخين والحرق للكشف عن مصدر الغذاء</text>` +
			drawSide(242, 'التجربة 1', sampleA, charsA) +
			drawSide(20, 'التجربة 2', sampleB, charsB)
	);
}

function buildReagentRackSvg(
	foodName: string,
	tests: Array<{ tube: string; reagent: string; fill: string; result: string }>
): string {
	const xs = [362, 230, 98];
	const tubesHtml = tests
		.slice(0, 3)
		.map((t, i) => {
			const cx = xs[i];
			return (
				`<text x="${cx}" y="52" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(t.tube)}</text>` +
				`<rect x="${cx - 16}" y="60" width="32" height="86" rx="14" fill="#ffffff" stroke="#334155" stroke-width="1.9"/>` +
				`<rect x="${cx - 14}" y="102" width="28" height="42" rx="10" fill="${t.fill}" opacity="0.86"/>` +
				`<text x="${cx}" y="168" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">${esc(t.reagent)}</text>` +
				`<text x="${cx}" y="188" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f766e">${esc(t.result)}</text>`
			);
		})
		.join('');

	return wrapSciencesSvg(
		460,
		215,
		`<rect x="6" y="6" width="448" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`نتائج الكشف الكيميائي على عينة: ${foodName}`)}</text>` +
			tubesHtml
	);
}

function buildCompositionBarsSvg(
	foodName: string,
	g: number,
	p: number,
	l: number
): string {
	const maxVal = Math.max(g, p, l, 20);
	const bars = [
		{ x: 320, val: g, lbl: 'غلوسيدات', col: '#d97706' },
		{ x: 196, val: p, lbl: 'بروتينات', col: '#dc2626' },
		{ x: 72, val: l, lbl: 'دسم', col: '#2563eb' }
	];
	const barsHtml = bars
		.map((b) => {
			const h = Math.max(8, Math.round((b.val / maxVal) * 118));
			return (
				`<rect x="${b.x}" y="${178 - h}" width="68" height="${h}" rx="5" fill="${b.col}" opacity="0.86"/>` +
				haloText(
					`x="${b.x + 34}" y="${178 - h - 7}" text-anchor="middle" font-size="11" font-weight="bold"`,
					b.col,
					`${b.val} غ`
				) +
				`<text x="${b.x + 34}" y="198" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${esc(b.lbl)}</text>`
			);
		})
		.join('');

	return wrapSciencesSvg(
		460,
		225,
		`<rect x="6" y="6" width="448" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`التركيب العضوي لكل 100 غرام من ${foodName}`)}</text>` +
			`<line x1="44" y1="178" x2="424" y2="178" stroke="#334155" stroke-width="1.6"/>` +
			barsHtml
	);
}

function buildRationCompareSvg(
	p1: { label: string; kj: number },
	p2: { label: string; kj: number },
	p3: { label: string; kj: number }
): string {
	const items = [
		{ x: 326, ...p1, col: '#2563eb' },
		{ x: 196, ...p2, col: '#16a34a' },
		{ x: 66, ...p3, col: '#dc2626' }
	];
	const maxKj = Math.max(p1.kj, p2.kj, p3.kj, 15000);
	const bars = items
		.map((it) => {
			const h = Math.max(16, Math.round((it.kj / maxKj) * 116));
			return (
				`<rect x="${it.x}" y="${182 - h}" width="68" height="${h}" rx="5" fill="${it.col}" opacity="0.86"/>` +
				haloText(
					`x="${it.x + 34}" y="${182 - h - 7}" text-anchor="middle" font-size="10.5" font-weight="bold"`,
					it.col,
					`${it.kj}`
				) +
				`<text x="${it.x + 34}" y="202" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#0f172a">${esc(it.label)}</text>`
			);
		})
		.join('');

	return wrapSciencesSvg(
		460,
		230,
		`<rect x="6" y="6" width="448" height="218" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">الحاجة الطاقوية اليومية خلال 24 ساعة (كيلو جول)</text>` +
			`<line x1="44" y1="182" x2="424" y2="182" stroke="#334155" stroke-width="1.6"/>` +
			bars
	);
}

function buildClinicalCardSvg(title: string, patientLabel: string, symptoms: string[], causeHint: string): string {
	const symLines = symptoms
		.map(
			(s, idx) =>
				`<rect x="34" y="${78 + idx * 34}" width="392" height="26" rx="5" fill="#ffffff" stroke="#fca5a5" stroke-width="1.2"/>` +
				`<text x="230" y="${95 + idx * 34}" text-anchor="middle" font-size="10.6" font-weight="bold" fill="#7f1d1d">${esc(s)}</text>`
		)
		.join('');
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>` +
			`<text x="230" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#991b1b">${esc(title)}</text>` +
			`<text x="230" y="54" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#0f172a">${esc(patientLabel)}</text>` +
			symLines +
			`<text x="230" y="198" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#1e3a8a">${esc(causeHint)}</text>`
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Food Source & Origin (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const foodSourceOriginTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_food_source_origin',
	grade: '1am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'مصدر وأصل الأغذية (تجربة التفحم والتصنيف)',
	curriculumLessonId: 'sci_lesson_1am_t1_food_origin_composition',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const organicFoods = [
			{ name: 'قطعة خبز', origin: 'نباتي' },
			{ name: 'قطعة لحم', origin: 'حيواني' },
			{ name: 'قطعة جبن', origin: 'حيواني' },
			{ name: 'حبة بطاطا', origin: 'نباتي' },
			{ name: 'زبدة طبيعية', origin: 'حيواني' },
			{ name: 'قطعة تفاح', origin: 'نباتي' }
		];
		const mineralFoods = [
			{ name: 'ملح الطعام', origin: 'معدني' },
			{ name: 'ماء معدني', origin: 'معدني' }
		];
		const pickedOrg = rng.pickDistinct(organicFoods, 3);
		const pickedMin = rng.pick(mineralFoods);
		const focus = pickedOrg[0];

		const svg = buildCharringLabSvg(focus.name, pickedMin.name, true, false);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_charring_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`مصدر عضوي وأصل ${focus.origin}`,
			[
				{
					text: `مصدر معدني وأصل ${focus.origin}`,
					diagnosticFeedback: `${focus.name} تفحم عند التسخين، والمادة التي تتفحم مصدرها عضوي لا معدني.`
				},
				{
					text: `مصدر عضوي وأصل ${focus.origin === 'نباتي' ? 'حيواني' : 'نباتي'}`,
					diagnosticFeedback: `تحقق من منشأ (${focus.name}): هل يُستخرج من النبات أم من الحيوان؟`
				},
				{
					text: 'مصدر معدني وأصل معدني',
					diagnosticFeedback: 'المصدر والأصل المعدنيان يخصان الماء والأملاح المعدنية التي لا تتفحم.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أجرينا تجربة التسخين الشديد على عينة من **${focus.name}** فاحترقت وتفحمت، بينما لم يتفحم **${pickedMin.name}**. ما هو **مصدر** و**أصل** ${focus.name}؟`,
			questionTextAr: `تفحمت عينة ${focus.name} عند التسخين. حدد مصدرها وأصلها.`,
			imageUrl,
			imageCaption: `تجربة التفحم على ${focus.name} و${pickedMin.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بما أن ${focus.name} يتفحم لاحتوائه على عنصر الفحم ($\\text{C}$) فمصدره **عضوي**، وبما أنه مأخوذ من ${focus.origin === 'نباتي' ? 'النبات' : 'الحيوان'} فأصله **${focus.origin}**.`
		};

		const hints: [string, string, string] = [
			'المصدر له احتمالان فقط: عضوي (يتفحم) أو معدني (لا يتفحم).',
			'الأصل يحدد منشأ الغذاء: نباتي، حيواني، أو معدني.',
			`${focus.name} تفحّم عند الحرق فهو عضوي، وتأكد من أصله (${focus.origin}).`
		];
		const solutionStepsAr = [
			`التفحم عند الحرق يثبت وجود عنصر الفحم ($\\text{C}$) $\\leftarrow$ المصدر **عضوي**.`,
			`منشأ ${focus.name} هو ${focus.origin === 'نباتي' ? 'النبات' : 'الحيوان'} $\\leftarrow$ الأصل **${focus.origin}**.`,
			`أما ${pickedMin.name} فلم يتفحم فمصدره **معدني** وأصله **معدني**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `قصد التمييز بين مصدر وأصل الأغذية التي نتناولها يومياً، أجرى تلاميذ السنة الأولى متوسط تجربة التسخين على عينات غذائية كما توضحه الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1.2fr'],
					children: [
						{
							type: 'text',
							content: `1) فسّر سبب تفحّم *${focus.name}* في التجربة 1، وعدم تفحّم *${pickedMin.name}* في التجربة 2.`,
							answer: `1) تفحّم ${focus.name} لأنه يحتوي على *عنصر الفحم (الكربون)* فهو غذاء ذو مصدر *عضوي*، بينما لا يتفحّم ${pickedMin.name} لخلوّه من الفحم فهو ذو مصدر *معدني*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مقارنة التسخين الشديد بين غذائين'
						}
					]
				},
				{
					type: 'table',
					headers: ['الغذاء', 'مصدره (عضوي / معدني)', 'أصله (نباتي / حيواني / معدني)'],
					cells: [],
					rows: [
						[
							pickedOrg[0].name,
							{ content: '................', answer: 'عضوي', mark: '0.5' },
							{ content: '................', answer: pickedOrg[0].origin, mark: '0.5' }
						],
						[
							pickedOrg[1].name,
							{ content: '................', answer: 'عضوي', mark: '0.5' },
							{ content: '................', answer: pickedOrg[1].origin, mark: '0.5' }
						],
						[
							pickedMin.name,
							{ content: '................', answer: 'معدني', mark: '0.5' },
							{ content: '................', answer: 'معدني', mark: '0.5' }
						]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) لماذا يُصنّف الحليب كـ *غذاء مركب كامل* بينما يُصنّف السكر الأبيض كـ *غذاء بسيط*؟`,
					answer: `3) يُصنّف *الحليب* كغذاء مركب كامل لاحتوائه على جميع العناصر الغذائية العضوية والمعدنية بنسب متقاربة، أما *السكر الأبيض* فغذاء بسيط لأنه يتكون من مادة غذائية واحدة فقط (الغلوسيدات).`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `مصدر عضوي وأصل ${focus.origin}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Chemical Food Reagents Lab (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const foodReagentsLabTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_reagents_lab',
	grade: '1am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'الكواشف الكيميائية والكشف عن تركيب الأغذية المركبة',
	curriculumLessonId: 'sci_lesson_1am_t1_food_origin_composition',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				food: 'مصل الحليب والجبن',
				tests: [
					{ tube: 'أنبوب 1', reagent: 'فهلنغ + تسخين', fill: '#dc2626', result: 'راسب أحمر آجوري', nutrient: 'سكريات بسيطة' },
					{ tube: 'أنبوب 2', reagent: 'حمض الآزوت', fill: '#eab308', result: 'لون أصفر', nutrient: 'بروتين' },
					{ tube: 'أنبوب 3', reagent: 'ماء اليود', fill: '#92400e', result: 'بني (عدم تغير)', nutrient: 'غياب النشاء' }
				],
				askIdx: 0
			},
			{
				food: 'بذور الفاصولياء المبللة',
				tests: [
					{ tube: 'أنبوب 1', reagent: 'ماء اليود', fill: '#1e3a8a', result: 'لون أزرق بنفسجي', nutrient: 'النشاء' },
					{ tube: 'أنبوب 2', reagent: 'حمض الآزوت', fill: '#eab308', result: 'لون أصفر', nutrient: 'بروتين' },
					{ tube: 'أنبوب 3', reagent: 'فهلنغ + تسخين', fill: '#3b82f6', result: 'أزرق (لا يتغير)', nutrient: 'غياب سكر بسيط' }
				],
				askIdx: 0
			},
			{
				food: 'عصير العنب وبياض البيض',
				tests: [
					{ tube: 'أنبوب 1', reagent: 'حمض الآزوت', fill: '#eab308', result: 'لون أصفر', nutrient: 'بروتين' },
					{ tube: 'أنبوب 2', reagent: 'فهلنغ + تسخين', fill: '#dc2626', result: 'راسب أحمر آجوري', nutrient: 'سكريات بسيطة' },
					{ tube: 'أنبوب 3', reagent: 'ماء اليود', fill: '#92400e', result: 'بني (لا يتغير)', nutrient: 'غياب النشاء' }
				],
				askIdx: 0
			}
		];
		const sc = rng.pick(scenarios);
		const askTest = sc.tests[sc.askIdx];

		const svg = buildReagentRackSvg(sc.food, sc.tests);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_reagents_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يدل على وجود ${askTest.nutrient}`,
			[
				{
					text: 'يدل على وجود الدسم (الليبيدات)',
					diagnosticFeedback: 'الدسم يُكشف عنه بدلك الغذاء على ورقة بيضاء (بقعة شفافة لا تزول بالتسخين).'
				},
				{
					text: 'يدل على وجود ملح الكلور',
					diagnosticFeedback: 'ملح الكلور يُكشف عنه بنترات الفضة فيعطي راسباً أبيض يسود في الضوء.'
				},
				{
					text:
						askTest.nutrient === 'النشاء'
							? 'يدل على وجود البروتين'
							: 'يدل على وجود النشاء',
					diagnosticFeedback: 'راجع جدول الكواشف: ماء اليود للنشاء، حمض الآزوت للبروتين، فهلنغ للسكريات البسيطة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في التجربة المخبرية على **${sc.food}** (أنظر الوثيقة)، أضفنا كاشف **${askTest.reagent}** في ${askTest.tube} فظهر **${askTest.result}**. على ماذا تدل هذه النتيجة؟`,
			questionTextAr: `أضفنا ${askTest.reagent} فظهر ${askTest.result}. عن أي عنصر تم الكشف؟`,
			imageUrl,
			imageCaption: `تجارب الكواشف الكيميائية على ${sc.food}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `كاشف **${askTest.reagent}** عند إعطائه **${askTest.result}** يثبت وجود **${askTest.nutrient}**.`
		};

		const hints: [string, string, string] = [
			'ماء اليود ← النشاء (أزرق بنفسجي).',
			'محلول فهلنغ + تسخين ← السكريات البسيطة (راسب أحمر آجوري).',
			'حمض الآزوت ← البروتين (لون أصفر).'
		];
		const solutionStepsAr = [
			`الكاشف المستعمل في ${askTest.tube} هو: **${askTest.reagent}**.`,
			`الملاحظة المسجلة: **${askTest.result}** (تفاعل إيجابي).`,
			`الاستنتاج: تحتوي العينة على **${askTest.nutrient}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `للكشف عن المكونات العضوية في *${sc.food}*، أنجز فوج من التلاميذ ثلاث تجارب باستعمال الكواشف الكيميائية كما هو موضح في الوثيقة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) بالاعتماد على نتائج الأنابيب الثلاثة في الوثيقة، أكمل الجدول الآتي لتحديد العناصر الغذائية الموجودة أو الغائبة في العينة.`,
							answer: `1) انظر استكمال الجدول أدناه بدقة.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `نتائج الكشف الكيميائي على ${sc.food}`
						}
					]
				},
				{
					type: 'table',
					headers: ['الأنبوب', 'الكاشف المستعمل', 'الملاحظة المسجلة', 'الاستنتاج (العنصر الغذائي)'],
					cells: [],
					rows: sc.tests.map((t) => [
						t.tube,
						t.reagent,
						t.result,
						{ content: '................', answer: t.nutrient, mark: '1' }
					]),
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `2) كيف نكشف مخبرياً عن وجود *الدسم* في حبة فستق أو زيتون، وعن *ملح الكالسيوم* في مصل الحليب؟`,
					answer: `2) نكشف عن *الدسم* بحكّ العينة على ورقة بيضاء فتظهر بقعة شفافة لا تزول بالتسخين؛ ونكشف عن *ملح الكالسيوم* بإضافة كاشف *أكسلات الأمونيوم* فيتشكل راسب أبيض.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: askTest.nutrient
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Food Roles & Classification by Predominant Nutrient (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const foodRolesClassificationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_food_roles_classification',
	grade: '1am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'تصنيف الأغذية حسب تركيبها السائد ودورها في العضوية',
	curriculumLessonId: 'sci_lesson_1am_t1_food_roles_classification',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const foods = [
			{ name: 'البطاطا', g: 20, p: 2, l: 0.1, dominant: 'غذاء غلوسيدي', role: 'أغذية الطاقة' },
			{ name: 'سمك السردين', g: 0, p: 21, l: 5, dominant: 'غذاء بروتيني', role: 'أغذية البناء والنمو' },
			{ name: 'الزبدة', g: 0.5, p: 0.7, l: 82, dominant: 'غذاء دسم', role: 'أغذية الطاقة' },
			{ name: 'الخبز الأبيض', g: 55, p: 8, l: 1, dominant: 'غذاء غلوسيدي', role: 'أغذية الطاقة' },
			{ name: 'بياض البيض واللحم', g: 0.5, p: 24, l: 3, dominant: 'غذاء بروتيني', role: 'أغذية البناء والنمو' }
		];
		const chosen = rng.pick(foods);

		const svg = buildCompositionBarsSvg(chosen.name, chosen.g, chosen.p, chosen.l);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_roles_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${chosen.dominant} — ينتمي إلى ${chosen.role}`,
			[
				{
					text: `${chosen.dominant} — ينتمي إلى ${chosen.role === 'أغذية الطاقة' ? 'أغذية البناء والنمو' : 'أغذية الطاقة'}`,
					diagnosticFeedback: 'انتبه للدور الوظيفي: الغلوسيدات والدسم للطاقة، والبروتينات للبناء والنمو.'
				},
				{
					text: 'غذاء معدني — ينتمي إلى أغذية الوقاية فقط',
					diagnosticFeedback: 'هذا الغذاء يحتوي على مواد عضوية (غلوسيدات/بروتينات/دسم) فهو غذاء عضوي.'
				},
				{
					text: `${chosen.dominant === 'غذاء بروتيني' ? 'غذاء غلوسيدي' : 'غذاء بروتيني'} — ينتمي إلى أغذية البناء والنمو`,
					diagnosticFeedback: 'قارن الأعمدة الثلاثة في المخطط واختر المادة العضوية ذات القيمة الأكبر.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يوضح الرسم البياني المقابل تركيب $100\\text{ g}$ من **${chosen.name}** ($${chosen.g}\\text{ g}$ غلوسيدات، $${chosen.p}\\text{ g}$ بروتينات، $${chosen.l}\\text{ g}$ دسم). كيف نصنف هذا الغذاء حسب العنصر السائد وحسب دوره؟`,
			questionTextAr: `صنّف ${chosen.name} حسب المادة السائدة ودوره في الجسم.`,
			imageUrl,
			imageCaption: `تركيب 100 غرام من ${chosen.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `أكبر نسبة عضوية في ${chosen.name} تجعله **${chosen.dominant}**، ودوره الأساسي يندرج ضمن **${chosen.role}**.`
		};

		const hints: [string, string, string] = [
			'ابحث عن العمود الأطول في المخطط لتحديد المادة العضوية السائدة.',
			'الغلوسيدات والدسم تزودان الجسم بالطاقة، أما البروتينات فتبني الجسم وتضمن النمو.',
			`${chosen.name}: ${chosen.dominant} ← ${chosen.role}.`
		];
		const solutionStepsAr = [
			`بمقارنة الكتل في $100\\text{ g}$: غلوسيدات $${chosen.g}\\text{ g}$، بروتينات $${chosen.p}\\text{ g}$، دسم $${chosen.l}\\text{ g}$.`,
			`العنصر السائد يحدد تصنيف الغذاء: **${chosen.dominant}**.`,
			`الدور الأساسي في الجسم: **${chosen.role}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتناول الإنسان أغذية متنوعة لتلبية حاجات جسمه. تمثل الوثيقة المقابلة التركيب الكيميائي لكل $100$ غرام من *${chosen.name}*:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد المادة العضوية السائدة في *${chosen.name}*، ثم صنّفه حسب تركيبه السائد وحسب دوره في الجسم.`,
							answer: `1) *${chosen.name}* هو *${chosen.dominant}*، وينتمي حسب دوره إلى *${chosen.role}*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `التركيب العضوي لكل 100 غ من ${chosen.name}`
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'تُعدّ الغلوسيدات والدسم من أغذية البناء والنمو الأساسية في الجسم.',
							a: 'خاطئ',
							c: 'الغلوسيدات والدسم من *أغذية الطاقة*، أما البروتينات فمن أغذية البناء والنمو.',
							mark: '1'
						},
						{
							q: 'يحتاج الطفل في مرحلة النمو إلى أغذية غنية بالبروتينات والأملاح المعدنية كالحليب والبيض.',
							a: 'صحيح',
							c: 'العبارة صحيحة.',
							mark: '1'
						},
						{
							q: 'الفيتامينات والماء والأملاح المعدنية لا دور لها في وقاية الجسم.',
							a: 'خاطئ',
							c: 'الفيتامينات والأملاح المعدنية والماء ضرورية جداً للوقاية وللسير الحسن لوظائف الجسم.',
							mark: '1'
						}
					]
				},
				{
					type: 'text',
					content: `3) أعط مثالين لغذاءين غنيين بـ *البروتين* (أحدهما حيواني والآخر نباتي).`,
					answer: `3) بروتين حيواني: *اللحم أو السمك أو البيض أو الحليب*؛ بروتين نباتي: *العدس أو الفاصولياء أو الحمص*.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${chosen.dominant} (${chosen.role})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Food Ration & Factors of Variation (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const foodRationAnalysisTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_food_ration_analysis',
	grade: '1am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'الراتب الغذائي أنواعه وعوامل تغيّره',
	curriculumLessonId: 'sci_lesson_1am_t1_food_ration_factors',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				p1: { label: 'بالغ في راحة', kj: 9200, ration: 'راتب الصيانة' },
				p2: { label: 'مراهق (14 سنة)', kj: 11800, ration: 'راتب النمو' },
				p3: { label: 'عامل بناء شاق', kj: 14800, ration: 'راتب النشاط' },
				factorQuestion: 'المقارنة بين البالغ في راحة وعامل البناء من نفس العمر والجنس',
				factorAnswer: 'النشاط البدني',
				askPerson: 'عامل بناء شاق',
				askRation: 'راتب النشاط'
			},
			{
				p1: { label: 'طفل (5 سنوات)', kj: 6800, ration: 'راتب النمو' },
				p2: { label: 'امرأة غير حامل', kj: 8600, ration: 'راتب الصيانة' },
				p3: { label: 'امرأة مرضع', kj: 11600, ration: 'راتب الإنتاج' },
				factorQuestion: 'المقارنة بين المرأة غير الحامل والمرأة المرضع من نفس العمر',
				factorAnswer: 'الحالة الفيزيولوجية (الإرضاع)',
				askPerson: 'امرأة مرضع',
				askRation: 'راتب الإنتاج'
			},
			{
				p1: { label: 'شخص في الصيف', kj: 9400, ration: 'راتب الصيانة' },
				p2: { label: 'تلميذ (12 سنة)', kj: 10800, ration: 'راتب النمو' },
				p3: { label: 'نفس الشخص في الشتاء', kj: 12400, ration: 'راتب الصيانة (جو بارد)' },
				factorQuestion: 'المقارنة بين نفس الشخص البالغ في فصل الصيف وفي فصل الشتاء البارد',
				factorAnswer: 'المناخ (درجة الحرارة)',
				askPerson: 'تلميذ (12 سنة)',
				askRation: 'راتب النمو'
			}
		];
		const c = rng.pick(cases);

		const svg = buildRationCompareSvg(c.p1, c.p2, c.p3);
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_ration_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${c.askRation} — وعامل الاختلاف هو ${c.factorAnswer}`,
			[
				{
					text: `${c.askRation === 'راتب النمو' ? 'راتب الصيانة' : 'راتب النمو'} — وعامل الاختلاف هو الجنس`,
					diagnosticFeedback: 'راجع جدول الرواتب الغذائية الأربعة: النمو، النشاط، الصيانة، والإنتاج.'
				},
				{
					text: 'راتب الصيانة — وعامل الاختلاف هو الطول فقط',
					diagnosticFeedback: 'الطول وحده ليس من العوامل الخمسة الأساسية المعتمدة في المنهاج.'
				},
				{
					text: `${c.askRation} — وعامل الاختلاف هو لون الغذاء`,
					diagnosticFeedback: 'عوامل تغير الراتب هي: العمر، الجنس، النشاط، الحالة الفيزيولوجية، والمناخ.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يبين المخطط المقابل الحاجات الطاقوية اليومية لثلاثة أشخاص خلال $24$ ساعة. ما نوع الراتب الغذائي المناسب لـ (**${c.askPerson}**) وما عامل التغير الملاحظ عند (**${c.factorQuestion}**)؟`,
			questionTextAr: `حدد الراتب المناسب لـ ${c.askPerson} وعامل تغير الراتب في الوثيقة.`,
			imageUrl,
			imageCaption: 'مقارنة الحاجات الطاقوية اليومية (كيلو جول)',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يحتاج (**${c.askPerson}**) إلى **${c.askRation}**، والعامل المتحكم في المقارنة المذكورة هو **${c.factorAnswer}**.`
		};

		const hints: [string, string, string] = [
			'الراتب الغذائي هو كمية الأغذية اللازمة للجسم خلال 24 ساعة.',
			'الرواتب الأربعة هي: النمو، النشاط، الصيانة، الإنتاج.',
			`العامل الذي تغير بين الشخصين هو: ${c.factorAnswer}.`
		];
		const solutionStepsAr = [
			`قراءة الأعمدة البيانية توضح تباين الحاجات الطاقوية خلال $24$ ساعة.`,
			`نوع الراتب المناسب لـ (${c.askPerson}): **${c.askRation}**.`,
			`عامل تغير الراتب الغذائي في المقارنة هو: **${c.factorAnswer}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تتغير الحاجات الغذائية للأشخاص خلال 24 ساعة حسب عدة عوامل. يمثل المخطط المقابل الحاجة الطاقوية اليومية لثلاث حالات مختلفة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) عرّف *الراتب الغذائي*، ثم حدد العامل المسؤول عن تغير الحاجة الطاقوية في حالة (*${c.factorQuestion}*).`,
							answer: `1) *الراتب الغذائي* هو كمية الأغذية اللازمة لتلبية حاجيات الجسم خلال *24 ساعة*. العامل المتغير هنا هو: *${c.factorAnswer}*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تغير الحاجات الطاقوية خلال 24 ساعة'
						}
					]
				},
				{
					type: 'table',
					headers: ['الشخص / الحالة', 'الحاجة الطاقوية (كيلو جول)', 'نوع الراتب الغذائي المناسب'],
					cells: [],
					rows: [
						[c.p1.label, String(c.p1.kj), { content: '................', answer: c.p1.ration, mark: '1' }],
						[c.p2.label, String(c.p2.kj), { content: '................', answer: c.p2.ration, mark: '1' }],
						[c.p3.label, String(c.p3.kj), { content: '................', answer: c.p3.ration, mark: '1' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) اذكر *عاملين آخرين* يتحكمان في تغير الراتب الغذائي من شخص لآخر.`,
					answer: `3) من عوامل تغير الراتب الغذائي: *العمر (السن)*، *الجنس*، *النشاط البدني*، *الحالة الفيزيولوجية*، و*المناخ* (يُقبل أي عاملين صحيحين).`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${c.askRation} — ${c.factorAnswer}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Malnutrition Diseases Diagnosis (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const malnutritionDiseasesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_malnutrition_diseases',
	grade: '1am',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'تشخيص أمراض سوء التغذية والوقاية منها',
	curriculumLessonId: 'sci_lesson_1am_t1_nutritional_balance_diseases',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const diseases = [
			{
				name: 'الكواشيوركور',
				patient: 'طفل عمره 3 سنوات يعتمد غذاؤه على عصيدة الحبوب فقط',
				symptoms: ['انتفاخ واضح في البطن', 'ضمور في العضلات وبطء شديد في النمو', 'جفاف وتشقق الجلد'],
				cause: 'نقص حاد في البروتينات الحيوانية',
				prevention: 'تقديم أغذية غنية بالبروتينات مثل الحليب والبيض والسمك واللحوم والبقوليات'
			},
			{
				name: 'السلعة الدرقية',
				patient: 'مراهقة تقطن بمنطقة جبلية نائية ولا تتناول الأسماك',
				symptoms: ['تضخم واضح في الغدة الدرقية أسفل العنق', 'إرهاق عام وتعب سريع', 'صعوبة خفيفة في البلع'],
				cause: 'نقص ملح اليود في الغذاء اليومي',
				prevention: 'استعمال ملح الطعام المزود باليود وتناول الأسماك البحرية بانتظام'
			},
			{
				name: 'الإسقربوط (الحفر)',
				patient: 'شخص لا يتناول الفواكه والخضر الطازجة منذ أشهر',
				symptoms: ['نزيف متكرر وتورم في اللثة', 'تخلخل الأسنان وتأخر التئام الجروح', 'تعب عام وضعف مقاومة الجسم'],
				cause: 'نقص فيتامين C في الراتب الغذائي',
				prevention: 'الإكثار من تناول الحمضيات (البرتقال، الليمون) والخضر والفواكه الطازجة'
			},
			{
				name: 'فقر الدم (الأنيميا)',
				patient: 'تلميذة تشتكي من شحوب الوجه والدوار في القسم',
				symptoms: ['شحوب الوجه والجلد', 'تعب شديد وضيق تنفس عند أقل مجهود', 'انخفاض كريات الدم الحمراء في التحليل'],
				cause: 'نقص ملح الحديد في التغذية',
				prevention: 'تناول الأغذية الغنية بالحديد مثل العدس والسبانخ والكبد واللحوم الحمراء'
			}
		];
		const d = rng.pick(diseases);
		const others = diseases.filter((x) => x.name !== d.name);

		const svg = buildClinicalCardSvg('بطاقة فحص طبي — أعراض مرض سوء تغذية', d.patient, d.symptoms, 'ادرس الأعراض وحدد المرض وسببه الغذائي');
		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_disease_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${d.name} — بسبب ${d.cause}`,
			others.slice(0, 3).map((o) => ({
				text: `${o.name} — بسبب ${o.cause}`,
				diagnosticFeedback: `راجع الأعراض السريرية: ${o.name} يتميز بـ (${o.symptoms[0]}) وليس بما ورد في البطاقة.`
			})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تبيّن البطاقة الطبية المقابلة أعراض حالة مرضية ناتجة عن سوء التغذية (${d.symptoms[0]} و${d.symptoms[1]}). ما اسم هذا المرض وما سببه الغذائي؟`,
			questionTextAr: `شخّص المرض من خلال أعراض البطاقة الطبية وحدد سببه.`,
			imageUrl,
			imageCaption: 'بطاقة الأعراض السريرية لحالة سوء تغذية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الأعراض المذكورة تميّز مرض **${d.name}**، وسببه الرئيسي هو **${d.cause}**.`
		};

		const hints: [string, string, string] = [
			'اربط بين العرض الرئيسي في البطاقة وبين العنصر الغذائي الناقص.',
			'الكواشيوركور (بروتين حيواني)، السلعة الدرقية (يود)، الإسقربوط (فيتامين C)، فقر الدم (حديد).',
			`الحالة تشير إلى ${d.name} الناتج عن ${d.cause}.`
		];
		const solutionStepsAr = [
			`قراءة الأعراض: ${d.symptoms.join(' + ')}.`,
			`التشخيص الطبي: مرض **${d.name}**.`,
			`السبب الغذائي: **${d.cause}**.`,
			`العلاج والوقاية: ${d.prevention}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `خلال فحص طبي مدرسي، تم تسجيل الأعراض المرضية الموضحة في البطاقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ مرض سوء التغذية الذي يعاني منه هذا الشخص، وحدد سببه الغذائي المباشر.`,
							answer: `1) اسم المرض: *${d.name}*.\n\nالسبب الغذائي: *${d.cause}*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'بطاقة الأعراض السريرية'
						}
					]
				},
				{
					type: 'text',
					content: `2) هل ينتج هذا المرض عن *التفريط (النقص)* أم عن *الإفراط* الغذائي؟ اقترح نصيحتين غذائيتين للعلاج والوقاية منه.`,
					answer: `2) ينتج عن *التفريط (النقص الغذائي)*. للوقاية والعلاج: ${d.prevention}، والحرص على تناول راتب غذائي كامل ومتنوع ومتوازن.`,
					mark: '2'
				},
				{
					type: 'table',
					headers: ['المرض', 'العنصر الناقص أو المفرط فيه'],
					cells: [],
					rows: [
						[others[0].name, { content: '........................', answer: others[0].cause, mark: '1' }],
						['السمنة المفرطة', { content: '........................', answer: 'الإفراط في السكريات والدسم وقلة الحركة', mark: '1' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${d.name} (${d.cause})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6: OFFICIAL ALGERIAN INTEGRATION SITUATION (8 pts — الوضعية الإدماجية)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationNutritionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1am_t1_integration_nutrition',
	grade: '1am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تشخيص سوء التغذية وإصلاح الراتب الغذائي لمراهق',
	curriculumLessonId: 'sci_lesson_1am_t1_nutritional_balance_diseases',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isObesityCase = seed % 2 === 0;
		const studentName = rng.pick(['أمين', 'ياسين', 'كريم', 'نسيم']);

		const svg = isObesityCase
			? wrapSciencesSvg(
					460,
					230,
					`<rect x="6" y="6" width="448" height="218" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
						`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">السند 2: مقارنة الحاجات اليومية وما يتناوله التلميذ (غرام / يوم)</text>` +
						`<line x1="44" y1="180" x2="424" y2="180" stroke="#334155" stroke-width="1.6"/>` +
						// Glucides: eaten 560 vs needed 350
						`<rect x="330" y="62" width="32" height="118" rx="4" fill="#dc2626"/><rect x="366" y="106" width="32" height="74" rx="4" fill="#16a34a"/>` +
						haloText(`x="346" y="56" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#dc2626', '560') +
						haloText(`x="382" y="100" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#16a34a', '350') +
						`<text x="364" y="198" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">غلوسيدات</text>` +
						// Lipids: eaten 145 vs needed 75
						`<rect x="196" y="88" width="32" height="92" rx="4" fill="#dc2626"/><rect x="232" y="132" width="32" height="48" rx="4" fill="#16a34a"/>` +
						haloText(`x="212" y="82" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#dc2626', '145') +
						haloText(`x="248" y="126" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#16a34a', '75') +
						`<text x="230" y="198" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">دسم</text>` +
						// Proteins: eaten 40 vs needed 85
						`<rect x="64" y="154" width="32" height="26" rx="4" fill="#dc2626"/><rect x="100" y="124" width="32" height="56" rx="4" fill="#16a34a"/>` +
						haloText(`x="80" y="148" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#dc2626', '40') +
						haloText(`x="116" y="118" text-anchor="middle" font-size="9.5" font-weight="bold"`, '#16a34a', '85') +
						`<text x="98" y="198" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">بروتينات</text>` +
						`<rect x="130" y="206" width="12" height="10" fill="#dc2626"/><text x="148" y="215" font-size="9.8" font-weight="bold" fill="#991b1b">راتب التلميذ</text>` +
						`<rect x="256" y="206" width="12" height="10" fill="#16a34a"/><text x="274" y="215" font-size="9.8" font-weight="bold" fill="#166534">الراتب المتوازن</text>`
				)
			: svgPlantAndPrimaryDiagram('balanced_diet', {
					title: 'السند 2: المجموعات الغذائية الضرورية لراتب النمو المتوازن'
				});

		const imageUrl = saveSciencesSvgAsset(`sci_1am_t1_integ_s${seed}`, svg);

		const correctDiagnosis = isObesityCase
			? 'السمنة (وزيادة الوزن) بسبب الإفراط في الغلوسيدات والدسم وقلة الحركة'
			: 'فقر الدم (الأنيميا) والإرهاق بسبب نقص الحديد والبروتينات وغياب التنوع الغذائي';

		const mcq = buildUniqueMcqOptions(
			correctDiagnosis,
			[
				{
					text: isObesityCase
						? 'السلعة الدرقية بسبب نقص اليود'
						: 'السمنة المفرطة بسبب كثرة الدسم',
					diagnosticFeedback: 'راجع معطيات السياق والسند 1 و 2 لتحديد الخلل الغذائي الحقيقي بدقة.'
				},
				{
					text: 'الكواشيوركور بسبب كثرة تناول اللحوم والبيض',
					diagnosticFeedback: 'الكواشيوركور ينتج عن نقص البروتين الحيواني وليس كثرته.'
				},
				{
					text: 'حالة صحية طبيعية لا تستدعي تعديل النظام الغذائي',
					diagnosticFeedback: 'الفارق الكبير بين ما يتناوله التلميذ وحاجاته اليومية يؤكد وجود سوء تغذية واضح.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: isObesityCase
				? `يتناول ${studentName} (تلميذ 12 سنة) يومياً وجبات سريعة وبطاطا مقلية ومشروبات غازية ($560\\text{ g}$ غلوسيدات و $145\\text{ g}$ دسم مقابل حاجته لـ $350\\text{ g}$ غلوسيدات و $75\\text{ g}$ دسم) ويقضي ساعات طويلة أمام الشاشة دون رياضة. ما المرض الذي أصابه وما سببه؟`
				: `يعتمد ${studentName} (تلميذ 12 سنة) في أكله على الخبز والبطاطا المقلية فقط ويمتنع عن تناول العدس واللحوم والسبانخ والخضر، فأصيب بشحوب الوجه وتعب شديد وأظهر التحليل نقصاً حاداً في عنصر الحديد. ما المرض الذي أصابه وما سببه؟`,
			questionTextAr: `شخّص حالة ${studentName} بالاعتماد على السندات.`,
			imageUrl,
			imageCaption: 'السند 2 المرفق بالوضعية الإدماجية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بالاعتماد على السياق والسندات: يعاني ${studentName} من **${correctDiagnosis}**.`
		};

		const hints: [string, string, string] = [
			'اقرأ السياق والسند 1 و 2 وقارن بين الأغذية المتناولة وحاجات راتب النمو لمراهق.',
			'اذكر دائماً السندات التي استخرجت منها المعلومات (اعتماداً على السياق والسند 1 و 2...).',
			'قدّم 3 نصائح عملية متنوعة: تعديل الأكل، تنظيم الوجبات، وممارسة الرياضة.'
		];
		const solutionStepsAr = [
			`التشخيص (اعتماداً على السياق والسند 1 و 2): ${correctDiagnosis}.`,
			`تحديد نوع الراتب اللازم لتلميذ عمره 12 سنة: **راتب النمو** المتوازن.`,
			`تقديم 3 نصائح صحية وجيهة للوقاية واستعادة التوازن الغذائي.`
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: isObesityCase
				? `*السياق:* ${studentName} تلميذ في السنة الأولى متوسط (12 سنة)، يعاني من زيادة كبيرة في الوزن وصعوبة في الجري أثناء حصة التربية البدنية وآلام في أسنانه. يفضل ${studentName} القضم المستمر للحلويات والمشروبات الغازية والبطاطا المقلية، ويقضي أوقات فراغه في ألعاب الفيديو. لمساعدته، نقدم لك السندات التالية:`
				: `*السياق:* ${studentName} تلميذ في السنة الأولى متوسط (12 سنة)، لوحظ عليه شحوب شديد في الوجه وتعب متواصل وضعف التركيز في القسم. بعد استجوابه من طرف طبيب المدرسة تبين أنه يحذف وجبة الفطور ويقتصر في أكله على الخبز والحلويات، ويمتنع عن تناول العدس والسبانخ واللحوم والفواكه. نقدم لك السندات التالية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.2fr', '1.3fr'],
					children: [
						{
							type: 'table',
							headers: ['السند 1: المعطيات الغذائية والصحية', 'حالة التلميذ', 'الحالة الطبيعية'],
							cells: [],
							rows: isObesityCase
								? [
										['الغلوسيدات (غ/يوم)', '560', '350'],
										['الدسم (غ/يوم)', '145', '75'],
										['البروتينات (غ/يوم)', '40', '85'],
										['النشاط الرياضي', 'منعدم', 'منتظم']
									]
								: [
										['تناول اللحوم والعدس والسبانخ', 'منعدم', 'منتظم'],
										['نسبة الحديد في الدم', 'منخفضة جداً', 'طبيعية'],
										['تناول الخضر والفواكه', 'نادر جداً', 'يومي'],
										['تنظيم الوجبات', 'عشوائي', 'منتظم']
									],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: isObesityCase ? 'السند 2: مقارنة راتب التلميذ بالراتب المتوازن' : 'السند 2: مجموعات الراتب الغذائي المتوازن'
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* يحتاج التلميذ في مرحلة النمو إلى *راتب النمو* الذي يكون كاملاً، متنوعاً، كافياً، نظيفاً وموزعاً في وجبات منتظمة (فطور، غداء، لمجة، عشاء) مع ممارسة نشاط رياضي منتظم.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) حدد المرض الذي يعاني منه ${studentName}، وفسّر أسبابه الغذائية والسلوكية بدقة.`,
					answer: isObesityCase
						? `1) اعتماداً على السياق والسندين 1 و 2 ومكتسباتي القبلية: يعاني ${studentName} من مرض *السمنة* (إضافة إلى تسوس الأسنان). *التفسير:* يرجع ذلك إلى *الإفراط الغذائي* في تناول الغلوسيدات (560 غ بدل 350 غ) والدسم (145 غ بدل 75 غ) عبر الحلويات والمقليات والمشروبات الغازية، إضافة إلى القضم المستمر وانعدام النشاط الرياضي، مما يؤدي إلى تخزين فائض الطاقة على شكل شحوم.`
						: `1) اعتماداً على السياق والسندين 1 و 2 ومكتسباتي القبلية: يعاني ${studentName} من مرض *فقر الدم (الأنيميا)*. *التفسير:* يرجع ذلك إلى *التفريط (النقص الغذائي)* في معدن *الحديد* والبروتينات والفيتامينات بسبب امتناعه عن تناول العدس والسبانخ واللحوم والخضر والفواكه وحذف وجبة الفطور.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) حدد نوع الراتب الغذائي المناسب لعمر ${studentName}، واذكر الدور الوظيفي لكل من البروتينات والغلوسيدات في جسمه.`,
					answer: `2) اعتماداً على السند 3 ومكتسباتي: يحتاج ${studentName} (12 سنة) إلى *راتب النمو*. دور *البروتينات* هو البناء والنمو وترميم الأنسجة، ودور *الغلوسيدات* هو تزويد العضوية بالطاقة اللازمة للنشاط.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) قدّم ثلاث نصائح صحية وغذائية وجيهة تساعد ${studentName} على استعادة صحته والوقاية من أمراض سوء التغذية.`,
					answer: isObesityCase
						? `3) اعتماداً على السندات ومكتسباتي القبلية، أنصح ${studentName} بـ:\n- التقليل من السكريات والدسم وتجنب الوجبات السريعة والمشروبات الغازية والقضم بين الوجبات.\n- تناول راتب نمو كامل ومتوازن غني بالبروتينات والخضر والفواكه الطازجة وتنظيف الأسنان.\n- ممارسة الرياضة بانتظام وتقليل ساعات الجلوس أمام الشاشات.`
						: `3) اعتماداً على السندات ومكتسباتي القبلية، أنصح ${studentName} بـ:\n- تناول أغذية غنية بالحديد والبروتينات مثل العدس، السبانخ، الكبد، اللحوم، والبيض.\n- تناول الخضر والفواكه الطازجة (الغنية بفيتامين C الذي يسهل امتصاص الحديد).\n- احترام وجبة فطور الصباح وتنظيم الوجبات اليومية لتكون كاملة ومتنوعة.`,
					mark: '3'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctDiagnosis
		};
	}
};

export const SCIENCES_TEMPLATES_1AM_T1: SciencesParameterizedTemplate[] = [
	foodSourceOriginTemplate,
	foodReagentsLabTemplate,
	foodRolesClassificationTemplate,
	foodRationAnalysisTemplate,
	malnutritionDiseasesTemplate,
	integrationNutritionTemplate
];
