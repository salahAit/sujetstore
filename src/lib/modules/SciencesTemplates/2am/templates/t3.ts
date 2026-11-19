import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	saveSciencesSvgAsset,
	svgGeologyDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 2AM T3 SVG Builders (Pure Arabic / Clean Separate Badges)
// ═══════════════════════════════════════════════════════════════════════════════

function buildReproCompareCardSvg(
	a1: { name: string; count: string; care: string; fert: string },
	a2: { name: string; count: string; care: string; fert: string }
): string {
	const drawBox = (x: number, a: typeof a1, col: string, bg: string) =>
		`<rect x="${x}" y="44" width="198" height="164" rx="9" fill="${bg}" stroke="${col}" stroke-width="1.8"/>` +
		`<text x="${x + 99}" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="${col}">${esc(a.name)}</text>` +
		`<text x="${x + 99}" y="100" text-anchor="middle" font-size="10.4" font-weight="bold" fill="#0f172a">${esc(`عدد الأنسال: ${a.count}`)}</text>` +
		`<text x="${x + 99}" y="130" text-anchor="middle" font-size="10.2" fill="#334155">${esc(`الرعاية: ${a.care}`)}</text>` +
		`<text x="${x + 99}" y="162" text-anchor="middle" font-size="10.2" font-weight="bold" fill="${col}">${esc(`الإلقاح: ${a.fert}`)}</text>`;

	return wrapSciencesSvg(
		460,
		224,
		`<rect x="6" y="6" width="448" height="212" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مقارنة استراتيجيتي التكاثر الجنسي عند حيوانين</text>` +
			drawBox(242, a1, '#2563eb', '#eff6ff') +
			drawBox(20, a2, '#16a34a', '#f0fdf4')
	);
}

function buildSpeciesCrossSvg(
	parent1: string,
	parent2: string,
	offspring: string,
	fertile: boolean
): string {
	const col = fertile ? '#15803d' : '#dc2626';
	const bg = fertile ? '#f0fdf4' : '#fef2f2';
	return wrapSciencesSvg(
		460,
		210,
		`<rect x="6" y="6" width="448" height="198" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">اختبار معيار التلاقح والنسل الخصب لتحديد النوع</text>` +
			`<rect x="266" y="50" width="152" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>` +
			`<text x="342" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e40af">${esc(parent1)}</text>` +
			`<text x="230" y="78" text-anchor="middle" font-size="18" font-weight="bold" fill="#334155">×</text>` +
			`<rect x="42" y="50" width="152" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>` +
			`<text x="118" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e40af">${esc(parent2)}</text>` +
			`<text x="230" y="122" text-anchor="middle" font-size="18" font-weight="bold" fill="${col}">↓</text>` +
			`<rect x="92" y="132" width="276" height="54" rx="9" fill="${bg}" stroke="${col}" stroke-width="2"/>` +
			`<text x="230" y="156" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${col}">${esc(offspring)}</text>` +
			`<text x="230" y="176" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#334155">${fertile ? 'قادر على التكاثر وإنجاب أفراد جديدة' : 'عقيم غير قادر على التكاثر'}</text>`
	);
}

function buildClassificationKeySvg(specimenName: string, traits: string[]): string {
	return wrapSciencesSvg(
		460,
		215,
		`<rect x="6" y="6" width="448" height="203" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`بطاقة المعايير التشريحية للكائن الحي: ${specimenName}`)}</text>` +
			traits
				.map(
					(t, i) =>
						`<rect x="34" y="${46 + i * 38}" width="392" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>` +
						`<text x="230" y="${65 + i * 38}" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#1e3a8a">${esc(`${i + 1}. ${t}`)}</text>`
				)
				.join('')
	);
}

function buildPlantDispersalSvg(items: Array<{ plant: string; organ: string; agent: string }>): string {
	const xs = [356, 230, 104];
	const cols = ['#16a34a', '#0284c7', '#d97706'];
	const bgs = ['#f0fdf4', '#f0f9ff', '#fffbeb'];
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تنوع نواتج ووسائل غزو الأوساط عند النباتات</text>` +
			items
				.slice(0, 3)
				.map(
					(it, i) =>
						`<rect x="${xs[i] - 58}" y="46" width="116" height="154" rx="9" fill="${bgs[i]}" stroke="${cols[i]}" stroke-width="1.8"/>` +
						`<text x="${xs[i]}" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="${cols[i]}">${esc(it.plant)}</text>` +
						`<text x="${xs[i]}" y="114" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(it.organ)}</text>` +
						`<text x="${xs[i]}" y="158" text-anchor="middle" font-size="9.6" fill="#334155">${esc(it.agent)}</text>`
				)
				.join('')
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Animal Reproduction Strategies (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const animalReproStrategiesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_animal_repro_strategies',
	grade: '2am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'استراتيجيات التكاثر الجنسي عند الحيوانات وإعمار الأوساط',
	curriculumLessonId: 'sci_lesson_2am_t3_animal_reproduction_strategies',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const pairs = [
			{
				a1: { name: 'سمكة السردين', count: '50000 بيضة', care: 'منعدمة', fert: 'خارجي (في الماء)', strat: 'استراتيجية الكم' },
				a2: { name: 'البقرة', count: 'عجل واحد', care: 'حمل وإرضاع وحماية', fert: 'داخلي (ولودة)', strat: 'استراتيجية النوعية' }
			},
			{
				a1: { name: 'الضفدع', count: '4000 بيضة', care: 'منعدمة', fert: 'خارجي (في الماء)', strat: 'استراتيجية الكم' },
				a2: { name: 'الحمامة', count: 'بيضتان فقط', care: 'حضن وإطعام ورعاية', fert: 'داخلي (بيوضة)', strat: 'استراتيجية النوعية' }
			},
			{
				a1: { name: 'الجراد المهاجر', count: 'مئات البيوض', care: 'منعدمة', fert: 'داخلي (بيوض)', strat: 'استراتيجية الكم' },
				a2: { name: 'الفيل', count: 'صغير واحد', care: 'رعاية طويلة جداً', fert: 'داخلي (ولود)', strat: 'استراتيجية النوعية' }
			}
		];
		const pr = rng.pick(pairs);

		const svg = buildReproCompareCardSvg(pr.a1, pr.a2);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_repro_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${pr.a1.name}: استراتيجية الكم لتعويض الضياع الكبير؛ و${pr.a2.name}: استراتيجية النوعية بالرعاية`,
			[
				{
					text: `${pr.a1.name}: استراتيجية النوعية؛ و${pr.a2.name}: استراتيجية الكم`,
					diagnosticFeedback: 'انتبه: إنتاج عدد هائل من البيوض دون رعاية هو استراتيجية الكم، أما العدد القليل مع الرعاية فاستراتيجية النوعية!'
				},
				{
					text: 'كلا الحيوانين يتبعان التكاثر الخضري اللاجنسي',
					diagnosticFeedback: 'التكاثر الخضري خاص بالنباتات، أما هذان الحيوانان فيتكاثران جنسياً.'
				},
				{
					text: 'إنتاج عدد كبير من البيوض يعني عدم وجود أي ضياع للأنسال',
					diagnosticFeedback: 'على العكس، يُنتج عدد كبير من البيوض لتعويض الضياع الكبير بسبب الافتراس والعوامل الطبيعية.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تقارن الوثيقة خصائص التكاثر عند **${pr.a1.name}** (${pr.a1.count} دون رعاية) و**${pr.a2.name}** (${pr.a2.count} مع رعاية). ما استراتيجية التكاثر التي يعتمدها كل منهما؟`,
			questionTextAr: `حدّد استراتيجية التكاثر عند ${pr.a1.name} و${pr.a2.name}.`,
			imageUrl,
			imageCaption: `مقارنة استراتيجيتي التكاثر عند ${pr.a1.name} و${pr.a2.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يعتمد **${pr.a1.name}** على **استراتيجية الكم** (عدد كبير لتعويض الضياع)، بينما يعتمد **${pr.a2.name}** على **استراتيجية النوعية** (عدد قليل مع رعاية وحماية عالية).`
		};

		const hints: [string, string, string] = [
			'استراتيجية الكم = إنتاج عدد كبير جداً من الأنسال دون رعاية.',
			'استراتيجية النوعية = إنتاج عدد قليل من الصغار مع رعاية وحماية.',
			'الإلقاح الخارجي يتم في الماء، والإلقاح الداخلي داخل المجاري التناسلية للأنثى.'
		];
		const solutionStepsAr = [
			`${pr.a1.name}: **${pr.a1.strat}** — إلقاح ${pr.a1.fert}.`,
			`${pr.a2.name}: **${pr.a2.strat}** — إلقاح ${pr.a2.fert}.`,
			'كلا الاستراتيجيتين تضمنان استمرار النوع وإعمار الأوساط الحية.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تلجأ الحيوانات إلى استراتيجيات مختلفة في التكاثر الجنسي لضمان استمرار نوعها وإعمار أوساطها كما توضحه الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد استراتيجية التكاثر التي يتبعها كل من *${pr.a1.name}* و*${pr.a2.name}* مع التعليل.`,
							answer: `1) *${pr.a1.name}:* يتبع *استراتيجية الكم* لإنتاجه عدداً كبيراً جداً من البيوض (${pr.a1.count}) دون رعاية. *${pr.a2.name}:* يتبع *استراتيجية النوعية* لإنتاجه عدداً قليلاً (${pr.a2.count}) مع رعاية وحماية.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `مقارنة التكاثر عند ${pr.a1.name} و${pr.a2.name}`
						}
					]
				},
				{
					type: 'text',
					content: `2) فسّر لماذا يُنتج *${pr.a1.name}* هذا العدد الهائل من البيوض، وما الفرق بين *الإلقاح الخارجي* و*الإلقاح الداخلي*؟`,
					answer: `2) يُنتج ${pr.a1.name} عدداً كبيراً من البيوض *لتعويض الضياع الكبير* الناتج عن الافتراس والعوامل الطبيعية حتى يصل عدد كافٍ للبلوغ. *الفرق:* الإلقاح الخارجي يتم خارج جسم الأنثى في الوسط المائي، أما الإلقاح الداخلي فيتم داخل المجاري التناسلية للأنثى.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) لماذا تفرض الدولة فترة *الراحة البيولوجية* (منع الصيد البحري والبري في أشهر معينة)؟`,
					answer: `3) لحماية الحيوانات خلال *موسم التكاثر ووضع البيض* ومنح الأنسال فرصة للنمو وتجديد الثروة الحيوانية ومنع الانقراض.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${pr.a1.name}: الكم — ${pr.a2.name}: النوعية`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Plant Dispersal & Vegetative Colonization (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const plantDispersalVegetativeTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_plant_dispersal_vegetative',
	grade: '2am',
	trimesterId: 't3',
	domain: 'plant_biology',
	titleAr: 'إعمار وغزو الأوساط عند النباتات (البذور، الأبواغ، والتكاثر الخضري)',
	curriculumLessonId: 'sci_lesson_2am_t3_plant_colonization_reproduction',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askSpores = seed % 2 === 0;
		const items = [
			{ plant: 'الهندباء والقيقب', organ: 'بذور مجنحة وريشية', agent: 'الانتشار بواسطة الرياح' },
			{ plant: 'نبات السرخس', organ: 'أبواغ في أكياس بوغية', agent: 'نبات عديم الأزهار (رياح + رطوبة)' },
			{ plant: 'الفراولة والبطاطا', organ: 'مدادات ودرنات', agent: 'تكاثر خضري سريع دون بذور' }
		];

		const svg = buildPlantDispersalSvg(items);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_plantcol_s${seed}`, svg);

		const correctOpt = askSpores
			? 'يتكاثر السرخس بالأبواغ الخفيفة التي تنقلها الرياح نحو الأوساط الرطبة'
			: 'التكاثر الخضري (المدادات والدرنات والأبصال) يسمح بغزو سريع دون بذور ولا أزهار';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: 'يتكاثر نبات السرخس بأزهار ملونة وثمار كبيرة بها بذور',
					diagnosticFeedback: 'السرخس نبات عديم الأزهار لا ينتج بذوراً بل يتكاثر بالأبواغ!'
				},
				{
					text: 'التكاثر الخضري يحتاج دائماً إلى حدوث التأبير والإلقاح وتكوين بذور',
					diagnosticFeedback: 'التكاثر الخضري تكاثر لاجنسي يتم بأعضاء نباتية (درنات، أبصال، مدادات) دون بذور!'
				},
				{
					text: 'بذور الهندباء الثقيلة لا تنتشر إلا داخل بطون الأسماك',
					diagnosticFeedback: 'بذور الهندباء خفيفة ومزودة بمظلة ريشية تطير بها مع الرياح لمسافات بعيدة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: askSpores
				? 'كيف يغزو **نبات السرخس** الأوساط الرطبة والمظللة رغم أنه لا يمتلك أزهاراً ولا بذوراً؟'
				: 'ما الميزة الأساسية لـ **التكاثر الخضري** عند الفراولة والبطاطا والبصل؟',
			questionTextAr: askSpores ? 'كيف يعمر السرخس الأوساط؟' : 'ما ميزة التكاثر الخضري؟',
			imageUrl,
			imageCaption: 'ثلاث طرق لإعمار الأوساط عند النباتات',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOpt + '.'
		};

		const hints: [string, string, string] = [
			'النباتات الزهرية: البذور (تنتشر بالرياح أو الماء أو الحيوانات).',
			'النباتات عديمة الأزهار (السرخس): الأبواغ المحمولة تحت الأوراق.',
			'التكاثر الخضري: درنات (بطاطا)، مدادات (فراولة)، أبصال (بصل)، فسائل (نخيل).'
		];
		const solutionStepsAr = [
			'الهندباء والقيقب: بذور خفيفة مجنحة تنتشر بالرياح.',
			'السرخس: أكياس بوغية تطلق أبواغاً تنبت في وسط رطب.',
			'الفراولة والبطاطا: تكاثر خضري سريع ينتج أفراداً مماثلة للنبات الأم.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `رغم أن النباتات ثابتة في التربة ولا تتنقل كالحيوانات، فإنها قادرة على غزو وإعمار أوساط واسعة بطرق متنوعة كما في الوثيقة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.1fr', '1.4fr'],
					children: [
						{
							type: 'text',
							content: `1) فرّق بين ناتج التكاثر الجنسي عند *النباتات الزهرية* وعند *النباتات عديمة الأزهار (كالسرخس)*.`,
							answer: `1) عند النباتات الزهرية: ناتج التكاثر والانتشار هو *البذور*؛ أما عند النباتات عديمة الأزهار كالسرخس فناتج الانتشار هو *الأبواغ* (داخل أكياس بوغية تحت الورقة).`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'وسائل إعمار الأوساط عند النباتات'
						}
					]
				},
				{
					type: 'table',
					headers: ['النبات', 'العضو أو ناتج الإعمار', 'نمط التكاثر أو عامل الانتشار'],
					cells: [],
					rows: [
						[
							'نبات الهندباء',
							'بذور ذات شعيرات ريشية',
							{ content: '................', answer: 'تكاثر جنسي — انتشار بالرياح', mark: '1' }
						],
						[
							'جوز الهند',
							'ثمرة خفيفة طافية',
							{ content: '................', answer: 'تكاثر جنسي — انتشار بالماء', mark: '1' }
						],
						[
							'البطاطا والفراولة',
							{ content: '................', answer: 'الدرنات والمدادات (سيقان أفقية)', mark: '1' },
							{ content: '................', answer: 'التكاثر الخضري (اللاجنسي)', mark: '1' }
						]
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
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Species Concept & Fertility Criterion (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const speciesCriterionTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_species_criterion_test',
	grade: '2am',
	trimesterId: 't3',
	domain: 'reproduction_genetics',
	titleAr: 'مفهوم النوع البيولوجي ومعيار التلاقح والنسل الخصب',
	curriculumLessonId: 'sci_lesson_2am_t3_species_concept_classification',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cases = [
			{
				p1: 'حمار',
				p2: 'أنثى الحصان (الفرس)',
				off: 'بغل (هجين عقيم)',
				fertile: false,
				conclusion: 'ينتميان إلى نوعين مختلفين لأن البغل الناتج عقيم'
			},
			{
				p1: 'أسد',
				p2: 'أنثى النمر',
				off: 'ليغر (هجين عقيم)',
				fertile: false,
				conclusion: 'ينتميان إلى نوعين مختلفين لأن الليغر الناتج عقيم'
			},
			{
				p1: 'كلب سلوقي جزائري',
				p2: 'أنثى كلب راعي',
				off: 'جرو خصب (قادر على التكاثر)',
				fertile: true,
				conclusion: 'ينتميان إلى نفس النوع لأنهما يتلاقحان ويعطيان نسلاً خصباً'
			},
			{
				p1: 'حمام بري رمادي',
				p2: 'أنثى حمام أبيض منزلي',
				off: 'فراخ حمام خصبة',
				fertile: true,
				conclusion: 'ينتميان إلى نفس النوع لأنهما يعطيان نسلاً خصباً رغم اختلاف اللون'
			}
		];
		const c = rng.pick(cases);

		const svg = buildSpeciesCrossSvg(c.p1, c.p2, c.off, c.fertile);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_species_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			c.conclusion,
			[
				{
					text: c.fertile
						? 'ينتميان إلى نوعين مختلفين بسبب اختلاف اللون أو الحجم'
						: 'ينتميان إلى نفس النوع لمجرد تشابههما في الشكل الظاهري',
					diagnosticFeedback: 'التشابه الشكلي وحده غير كافٍ، والاختلاف البسيط في اللون لا يمنع الانتماء لنفس النوع! المعيار الحاسم هو النسل الخصب.'
				},
				{
					text: 'ينتميان إلى المملكة النباتية',
					diagnosticFeedback: 'هذه الحيوانات من المملكة الحيوانية (الفقاريات).'
				},
				{
					text: 'المعيار الوحيد للنوع هو العيش في نفس الغابة',
					diagnosticFeedback: 'العيش في نفس الوسط لا يعني الانتماء إلى نفس النوع البيولوجي.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أعطى تزاوج **${c.p1}** مع **${c.p2}** النسل الموضح في الوثيقة (**${c.off}**). ماذا نستنتج حول انتماء الأبوين إلى نفس النوع؟`,
			questionTextAr: `استنتج هل ${c.p1} و${c.p2} من نفس النوع من خلال نتيجة التزاوج.`,
			imageUrl,
			imageCaption: `نتيجة التزاوج بين ${c.p1} و${c.p2}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بتطبيق المعيار البيولوجي للنوع: **${c.conclusion}**.`
		};

		const hints: [string, string, string] = [
			'النوع: مجموعة أفراد متشابهة قادرة على التلاقح وإعطاء أفراد خصبة.',
			'إذا كان النسل خصباً ← نفس النوع؛ إذا كان النسل عقيماً ← نوعان مختلفان.',
			`في حالتنا: النسل (${c.off}) ← ${c.fertile ? 'نفس النوع' : 'نوعان مختلفان'}.`
		];
		const solutionStepsAr = [
			`الأبوان: ${c.p1} × ${c.p2}.`,
			`النسل الناتج: ${c.off} (${c.fertile ? 'خصب' : 'عقيم'}).`,
			`الاستنتاج: **${c.conclusion}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `لدراسة مفهوم النوع البيولوجي وتطبيق معاييره، ندرس نتيجة التزاوج الموضحة في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) هل ينتمي *${c.p1}* و*${c.p2}* إلى نفس النوع؟ علّل إجابتك بدقة.`,
							answer: `1) *${c.fertile ? 'نعم' : 'لا'}*، ${c.conclusion}.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `تزاوج ${c.p1} و${c.p2}`
						}
					]
				},
				{
					type: 'text',
					content: `2) قدّم التعريف العلمي الكامل لـ *النوع*، واذكر المعيارين المعتمدين لتحديده.`,
					answer: `2) *النوع:* هو مجموعة من الأفراد المتشابهة في صفاتها المورفولوجية والقادرة على التلاقح فيما بينها وإعطاء *أفراد خصبة* (قادرة بدورها على التكاثر). *المعياران:* 1- التشابه المورفولوجي، 2- التلاقح وإعطاء نسل خصب (المعيار الحاسم).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) أعط مثالاً مضاداً يثبت أن *التشابه المورفولوجي وحده غير كافٍ* لتصنيف كائنين في نفس النوع.`,
					answer: `3) مثال: *الحمار والحصان* متشابهان في الشكل، لكن تزاوجهما يعطي *البغل* وهو حيوان *عقيم*، مما يثبت أنهما من نوعين مختلفين (أو الأسد والنمر ← الليغر العقيم).`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: c.conclusion
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Taxonomic Classification Key (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const classificationKeyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_classification_key',
	grade: '2am',
	trimesterId: 't3',
	domain: 'ecology_environment',
	titleAr: 'معايير تصنيف الكائنات الحية (المملكتان الحيوانية والنباتية)',
	curriculumLessonId: 'sci_lesson_2am_t3_species_concept_classification',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const specimens = [
			{
				name: 'الدلفين',
				traits: ['يمتلك عموداً فقرياً (شعبة الفقاريات)', 'ولود وتُرضع الأنثى صغارها الحليب', 'يتنفس الهواء الجوي بواسطة رئتين'],
				classification: 'الفقاريات ← صف الثدييات',
				trap: 'الفقاريات ← صف الأسماك'
			},
			{
				name: 'الخفاش',
				traits: ['يمتلك عموداً فقرياً (شعبة الفقاريات)', 'يغطي جسمه الوبر (الشعر) لا الريش', 'ولود ويرضع صغاره الحليب رغم قدرته على الطيران'],
				classification: 'الفقاريات ← صف الثدييات',
				trap: 'الفقاريات ← صف الطيور'
			},
			{
				name: 'الجرادة',
				traits: ['لا تمتلك عموداً فقرياً (لافقاريات)', 'لها هيكل خارجي وأرجل مفصلية (مفصليات الأرجل)', 'تمتلك 3 أزواج من الأرجل (6 أرجل) وزوجاً من قرون الاستشعار'],
				classification: 'اللافقاريات ← مفصليات الأرجل ← الحشرات',
				trap: 'اللافقاريات ← العنكبوتيات (8 أرجل)'
			},
			{
				name: 'العنكبوت',
				traits: ['لا يمتلك عموداً فقرياً (لافقاريات)', 'جسمه ذو أرجل مفصلية (مفصليات الأرجل)', 'يمتلك 4 أزواج من الأرجل (8 أرجل) ولا يمتلك قرون استشعار'],
				classification: 'اللافقاريات ← مفصليات الأرجل ← العنكبوتيات',
				trap: 'اللافقاريات ← الحشرات (6 أرجل)'
			}
		];
		const sp = rng.pick(specimens);

		const svg = buildClassificationKeySvg(sp.name, sp.traits);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_class_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			sp.classification,
			[
				{
					text: sp.trap,
					diagnosticFeedback: `احذر من هذا الفخ الشهير! راجع المعايير التشريحية الثلاثة لـ (${sp.name}) في البطاقة.`
				},
				{
					text: 'الفقاريات ← صف الزواحف (حراشف ملتحمة)',
					diagnosticFeedback: `لا يغطي جسم ${sp.name} حراشف ملتحمة.`
				},
				{
					text: 'المملكة النباتية ← نباتات عديمة الأزهار',
					diagnosticFeedback: `${sp.name} ينتمي إلى المملكة الحيوانية!`
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `ادرس بطاقة الصفات التشريحية لـ **${sp.name}** في الوثيقة المقابلة. ما التصنيف العلمي الصحيح له؟`,
			questionTextAr: `صنّف ${sp.name} بالاعتماد على معايير البطاقة.`,
			imageUrl,
			imageCaption: `بطاقة معايير تصنيف ${sp.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `حسب معايير التصنيف التشريحية، ينتمي **${sp.name}** إلى **${sp.classification}**.`
		};

		const hints: [string, string, string] = [
			'الفقاريات تمتلك عموداً فقرياً، واللافقاريات تفتقر إليه.',
			'الثدييات: ولودة وترضع صغارها (حتى الدلفين والخفاش!).',
			'الحشرات لها 6 أرجل، والعنكبوتيات لها 8 أرجل.'
		];
		const solutionStepsAr = [
			`قراءة الصفات: ${sp.traits.join(' + ')}.`,
			`تحديد الشعبة والصف: **${sp.classification}**.`,
			'في المملكة النباتية نميز بين النباتات الزهرية (كاسيات وعاريات البذور) وعديمة الأزهار (السرخس).'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يعتمد العلماء معايير تشريحية دقيقة لتصنيف الكائنات الحية. تبيّن البطاقة المقابلة خصائص *${sp.name}*:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) صنّف *${sp.name}* (الشعبة والصف) اعتماداً على بطاقة المعايير، وعلّل لماذا لا يُصنّف خطأً ضمن (*${sp.trap}*).`,
							answer: `1) تصنيف ${sp.name}: *${sp.classification}*. التعليل: لأنه يتميز بالصفات المذكورة (${sp.traits[1]} و${sp.traits[2]}) التي تختلف عن صفات ${sp.trap}.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `معايير تصنيف ${sp.name}`
						}
					]
				},
				{
					type: 'table',
					headers: ['الكائن الحي', 'المملكة', 'المجموعة / الصف'],
					cells: [],
					rows: [
						[
							'الحلزون',
							'حيوانية',
							{ content: '................', answer: 'لافقاريات ← رخويات', mark: '1' }
						],
						[
							'الأفعى والسلحفاة',
							'حيوانية',
							{ content: '................', answer: 'فقاريات ← زواحف', mark: '1' }
						],
						[
							'شجرة الصنوبر والأرز',
							'نباتية',
							{ content: '................', answer: 'نباتات زهرية (عاريات البذور)', mark: '1' }
						],
						[
							'نبات السرخس',
							'نباتية',
							{ content: '................', answer: 'نباتات عديمة الأزهار (سرخسيات)', mark: '1' }
						]
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
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: sp.classification
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Fossils, Fossilization & Paleoenvironment (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const fossilsPaleoenvironmentTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_fossils_paleoenvironment',
	grade: '2am',
	trimesterId: 't3',
	domain: 'geology_earth',
	titleAr: 'المستحاثات، شروط الاستحاثة، وتحديد الأوساط الجغرافية القديمة',
	curriculumLessonId: 'sci_lesson_2am_t3_fossils_fossilization_paleoenvironments',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askOldest = seed % 2 === 0;

		const svg = svgGeologyDiagram('rock_strata_fossils', {
			title: 'مقطع في طبقات صخرية رسوبية تحتوي على مستحاثات مرشدة'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_fossils_s${seed}`, svg);

		const correctOpt = askOldest
			? 'الطبقة 4 السفلى (ثلاثية الفصوص) هي الأقدم، وكانت المنطقة وسطاً بحرياً قديماً'
			: 'تتشكل المستحاثات في الصخور الرسوبية بشرط الطمر السريع بالرسوبيات بعد الموت';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: 'الطبقة 1 العليا هي الأقدم والطبقة 4 السفلى هي الأحدث',
					diagnosticFeedback: 'حسب مبدأ التراكب في الطبقات الرسوبية غير المشوهة: السفلى هي الأقدم والعليا هي الأحدث!'
				},
				{
					text: 'تتشكل المستحاثات بكثرة داخل الحمم البركانية المنصهرة',
					diagnosticFeedback: 'الحرارة العالية للحمم البركانية تدمر البقايا؛ المستحاثات تتشكل في الصخور الرسوبية فقط!'
				},
				{
					text: 'الأمونيت وثلاثية الفصوص حيوانات صحراوية تعيش في الرمال الجافة',
					diagnosticFeedback: 'الأمونيت وثلاثية الفصوص حيوانات بحرية قديمة، ووجودها في الجبال أو الصحراء يثبت وجود بحر قديم!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: askOldest
				? 'يوضح المقطع الطبقي المقابل أربع طبقات رسوبية تحتوي على مستحاثات. أيّ طبقة هي **الأقدم** وما طبيعة الوسط القديم عند تشكل الطبقة 2 (أمونيت) والطبقة 4 (ثلاثية الفصوص)؟'
				: 'في أي نوع من الصخور تتشكل المستحاثات وما الشرط الأساسي لحدوث الاستحاثة؟',
			questionTextAr: askOldest
				? 'حدد الطبقة الأقدم وطبيعة الوسط القديم في المقطع.'
				: 'حدد نوع الصخور وشرط الاستحاثة.',
			imageUrl,
			imageCaption: 'مقطع طبقي يحتوي على مستحاثات مرشدة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOpt + '.'
		};

		const hints: [string, string, string] = [
			'الطبقة السفلى هي الأقدم والعليا هي الأحدث.',
			'الأمونيت وثلاثية الفصوص كائنات بحرية منقرضة.',
			'شرط الاستحاثة: الطمر السريع بالرسوبيات ووجود أجزاء صلبة.'
		];
		const solutionStepsAr = [
			'المستحاثة: بقايا أو آثار كائنات حية قديمة محفوظة في الصخور الرسوبية.',
			'الطبقة 4 السفلى (ثلاثية الفصوص — الحقب الأول) هي الأقدم، والطبقة 1 العليا هي الأحدث.',
			'الأمونيت وثلاثية الفصوص يثبتان أن المنطقة كانت مغمورة ببحر قديم.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `خلال دراسة جيولوجية في جبال الأطلس، تم الحصول على المقطع الصخري الموضح في الوثيقة المقابلة والذي يضم أربع طبقات رسوبية غنية بالمستحاثات:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) عرّف *المستحاثة*، وحدد أي طبقة هي *الأقدم* وأيها *الأحدث* في المقطع مع التعليل.`,
							answer: `1) *المستحاثة:* بقايا أو آثار كائنات حية قديمة حُفظت في الصخور الرسوبية. الطبقة *4 السفلى* هي الأقدم (الحقب الأول — ثلاثية الفصوص) والطبقة *1 العليا* هي الأحدث لأن الطبقات الرسوبية تتوضع الواحدة فوق الأخرى.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'توضع الطبقات الرسوبية والمستحاثات'
						}
					]
				},
				{
					type: 'text',
					content: `2) اذكر شرطين أساسيين لحدوث عملية *الاستحاثة*، واشرح لماذا لا نجد مستحاثات في الصخور البركانية.`,
					answer: `2) *شرطا الاستحاثة:* 1- *الطمر السريع* بالرسوبيات فور موت الكائن الحي لمنع تحلله الكلي، 2- وجود *أجزاء صلبة* (عظام أو قواقع) قابلة للتصخر. ولا توجد في الصخور البركانية لأن حرارة الماغما العالية تحرق وتصهر أي بقايا حية.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) ماذا يثبت العثور على مستحاثات *الأمونيت* البحرية في هذه المنطقة الجبلية الحالية؟ واذكر فائدة علمية أخرى للمستحاثات.`,
					answer: `3) يثبت أن هذه المنطقة الجبلية *كانت مغمورة ببحر قديم* في الأزمنة الجيولوجية السابقة (الحقب الثاني). *فائدة أخرى:* تأريخ الطبقات الرسوبية ومعرفة تطور الكائنات الحية عبر الزمن.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 6: OFFICIAL ALGERIAN INTEGRATION SITUATION (8 pts — الوضعية الإدماجية)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationBiodiversityFossilsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t3_integration_biodiversity_fossils',
	grade: '2am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: استكشاف المستحاثات الصحراوية والتصنيف وحماية التنوع البيولوجي',
	curriculumLessonId: 'sci_lesson_2am_t3_fossils_fossilization_paleoenvironments',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const region = rng.pick(['منطقة الطاسيلي بالجنوب الجزائري', 'منطقة الأطلس الصحراوي', 'منطقة بشار بالجنوب الغربي']);

		const svg = svgGeologyDiagram('rock_strata_fossils', {
			title: `السند 1: مقطع صخري رسوبي مكتشف في ${region}`
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t3_integ_fossils_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'المنطقة كانت بحراً قديماً ثم وسطاً قارياً رطباً قبل التصحر، وغزال الصحراء مهدد بسبب استراتيجية النوعية والصيد الجائر',
			[
				{
					text: 'المنطقة كانت صحراء قاحلة دائماً منذ نشأة الأرض لم تغمرها المياه قط',
					diagnosticFeedback: 'وجود مستحاثات الأمونيت وثلاثية الفصوص البحرية في السند 1 يثبت أنها كانت بحراً قديماً!'
				},
				{
					text: 'غزال الدوركاس يتكاثر بوضع آلاف البيوض في الماء دون رعاية',
					diagnosticFeedback: 'الغزال من الثدييات الولودة التي تتبع استراتيجية النوعية (صغير واحد مع رعاية)!'
				},
				{
					text: 'مستحاثة السرخس تثبت وجود مناخ جاف وحار جداً بدون ماء',
					diagnosticFeedback: 'السرخس نبات يعيش ويتكاثر بالأبواغ في الأوساط الرطبة والمظللة!'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في رحلة علمية إلى **${region}**، اكتشف فريق بحث مستحاثات **أمونيت وثلاثية فصوص** في الطبقات العميقة وبصمات **أوراق سرخس** في طبقة أحدث، كما سجل تراجع أعداد **غزال الدوركاس الصحراوي** (يلد صغيراً واحداً كل سنة). ما التحليل العلمي الصحيح؟`,
			questionTextAr: `حلّل تاريخ الوسط القديم في ${region} وسبب تهديد غزال الدوركاس.`,
			imageUrl,
			imageCaption: `السند 1: المقطع الرسوبي المكتشف في ${region}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `المستحاثات البحرية (الأمونيت وثلاثية الفصوص) تثبت وجود **بحر قديم**، ثم **السرخس** يثبت مناخاً رطباً قبل تحول المنطقة لصحراء؛ وغزال الدوركاس يتبع **استراتيجية النوعية** (عدد قليل من الصغار) لذا يتأثر بشدة بالصيد الجائر.`
		};

		const hints: [string, string, string] = [
			'اربط كل مستحاثة في السند 1 و 2 بوسط عيشها القديم (أمونيت ← بحري، سرخس ← قاري رطب).',
			'صنّف غزال الدوركاس (ثدييات) واستراتيجية تكاثره (النوعية) مقارنة بالجراد (الكم).',
			'اذكر 3 إجراءات لحماية التنوع البيولوجي والمستحاثات في الجزائر.'
		];
		const solutionStepsAr = [
			`تاريخ الوسط (السند 1 و 2): بحر قديم (ثلاثية فصوص وأمونيت) ← وسط قاري رطب (سرخس) ← صحراء حالية.`,
			'غزال الدوركاس (فقاريات / ثدييات / ولود / استراتيجية النوعية) شديد الحساسية للصيد الجائر.',
			'حماية الأنواع والمستحاثات: الحظائر الوطنية (الطاسيلي والهقار)، منع الصيد، وحماية المواقع الجيولوجية.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `*السياق:* خلال بعثة علمية إلى *${region}*، عثر الجيولوجيون على طبقات من الصخور الرسوبية تحوي مستحاثات *ثلاثية الفصوص* و*الأمونيت*، وفوقها بصمات أوراق *نبات السرخس*. وفي نفس الرحلة لاحظ علماء الأحياء التناقص الخطير في أعداد *غزال الدوركاس* مقابل الانتشار الواسع لأسراب *الجراد* بعد موسم أمطار نادر. لتفسير هذه الملاحظات نقدم لك السندات الآتية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.3fr', '1.2fr'],
					children: [
						{
							type: 'image',
							src: imageUrl,
							caption: `السند 1: المقطع الطبقي في ${region}`
						},
						{
							type: 'table',
							headers: ['السند 2: الكائن الحي', 'التصنيف', 'التكاثر'],
							cells: [],
							rows: [
								['غزال الدوركاس', 'فقاري ولود يرضع صغاره', 'صغير واحد/سنة مع رعاية'],
								['الجراد الصحراوي', 'لافقاري بـ 6 أرجل', 'مئات البيوض دون رعاية'],
								['نبات السرخس', 'نبات عديم الأزهار', 'أبواغ تحتاج وسطاً رطباً']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* تُصنّف حظيرتا *الطاسيلي* و*الهقار* بالجنوب الجزائري كمحميتين وطنيتين وتراث عالمي لحماية الكائنات الصحراوية المهددة بالانقراض والآثار الجيولوجية والمستحاثية.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) بالاعتماد على المستحاثات المكتشفة في *السند 1 و 2*، أعد تصور تطور وسط العيش والمناخ في *${region}* عبر الأزمنة الجيولوجية إلى غاية اليوم.`,
					answer: `1) اعتماداً على السياق والسندين 1 و 2 ومكتسباتي القبلية:\n- في الأزمنة القديمة (الطبقات السفلى): كانت المنطقة *وسطاً بحرياً مغموراً بالمياه* بدليل وجود مستحاثات *ثلاثية الفصوص* (الحقب الأول) و*الأمونيت* (الحقب الثاني).\n- لاحقاً (الطبقة الأحدث): انحسر البحر وأصبحت المنطقة *وسطاً قارياً رطباً ودافئاً* بدليل وجود بصمات *السرخس* الذي يحتاج وسطاً رطباً لإنبات أبواغه، قبل أن تتحول اليوم إلى صحراء جافة.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) صنّف كلاً من *غزال الدوركاس* و*الجراد* بدقة، ثم فسّر لماذا يغزو الجراد المنطقة بسرعة بينما يصبح الغزال مهدداً بالانقراض عند تعرضه للصيد.`,
					answer: `2) اعتماداً على السند 2 ومكتسباتي القبلية:\n- *التصنيف:* غزال الدوركاس ينتمي إلى *الفقاريات ← صف الثدييات*؛ والجراد ينتمي إلى *اللافقاريات ← مفصليات الأرجل ← الحشرات*.\n- *التفسير:* يغزو الجراد الوسط بسرعة لأنه يتبع *استراتيجية الكم* (مئات البيوض)، بينما يتبع الغزال *استراتيجية النوعية* (صغير واحد سنوياً مع حمل ورعاية)، فالصيد الجائر يُقلص أعداده بسرعة ويهدده بالانقراض.`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) قدّم ثلاث اقتراحات وجيهة لحماية *غزال الدوركاس* والثروة المستحاثية والبيئية في الجزائر.`,
					answer: `3) اعتماداً على السند 3 ومكتسباتي القبلية، أقترح:\n- *تطبيق قوانين صارمة لمنع الصيد الجائر* خاصة للأنواع المهددة كغزال الدوركاس.\n- *توسيع ودعم الحظائر والمحميات الوطنية* (كالطاسيلي والهقار) وبرامج الإكثار في المحميات.\n- *حماية المواقع الجيولوجية والمستحاثية* من النهب والتوعية بقيمتها العلمية والبيئية.`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'بحر قديم ← وسط رطب ← صحراء؛ الغزال (ثديي/النوعية) والجراد (حشرة/الكم)'
		};
	}
};

export const SCIENCES_TEMPLATES_2AM_T3: SciencesParameterizedTemplate[] = [
	animalReproStrategiesTemplate,
	plantDispersalVegetativeTemplate,
	speciesCriterionTemplate,
	classificationKeyTemplate,
	fossilsPaleoenvironmentTemplate,
	integrationBiodiversityFossilsTemplate
];
