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
	svgBioCurvePlot,
	wrapSciencesSvg
} from '../../svg-sciences';

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 2AM T2 SVG Builders (Pure Arabic / Clean Separate Badges)
// ═══════════════════════════════════════════════════════════════════════════════

function buildSoilWaterRetentionSvg(sandPass: number, humusPass: number, clayPass: number): string {
	const soils = [
		{ x: 362, name: 'التربة أ (رملية)', pass: sandPass, hold: 100 - sandPass, col: '#d97706' },
		{ x: 230, name: 'التربة ب (دبالية)', pass: humusPass, hold: 100 - humusPass, col: '#16a34a' },
		{ x: 98, name: 'التربة ج (غضارية)', pass: clayPass, hold: 100 - clayPass, col: '#2563eb' }
	];
	const html = soils
		.map((s) => {
			const h = Math.max(8, Math.round((s.pass / 100) * 90));
			return (
				`<rect x="${s.x - 54}" y="42" width="108" height="172" rx="8" fill="#ffffff" stroke="${s.col}" stroke-width="1.6"/>` +
				`<text x="${s.x}" y="60" text-anchor="middle" font-size="10.2" font-weight="bold" fill="${s.col}">${esc(s.name)}</text>` +
				`<rect x="${s.x - 24}" y="76" width="48" height="92" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1.4"/>` +
				`<rect x="${s.x - 22}" y="${168 - h}" width="44" height="${h}" rx="3" fill="#38bdf8" opacity="0.82"/>` +
				haloText(`x="${s.x}" y="${162 - h / 2}" text-anchor="middle" font-size="9.8" font-weight="bold"`, '#0c4a6e', `${s.pass} مل`) +
				`<text x="${s.x}" y="186" text-anchor="middle" font-size="9.4" fill="#334155">الماء النافذ: ${s.pass} مل</text>` +
				`<text x="${s.x}" y="203" text-anchor="middle" font-size="9.4" font-weight="bold" fill="${s.col}">المحتفظ به: ${s.hold} مل</text>`
			);
		})
		.join('');
	return wrapSciencesSvg(
		460,
		228,
		`<rect x="6" y="6" width="448" height="216" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة مقارنة نفاذية والاحتفاظ بالماء لثلاث عينات تربة (سكب 100 مل)</text>` +
			html
	);
}

function buildDesertAdaptationCardSvg(plantName: string, shootMod: string, rootMod: string): string {
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">${esc(`تحورات الجهاز الإعاشي عند نبات صحراوي: ${plantName}`)}</text>` +
			// Shoot panel
			`<rect x="242" y="44" width="198" height="156" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="341" y="68" text-anchor="middle" font-size="11.8" font-weight="bold" fill="#166534">المجموع الخضري (فوق التربة)</text>` +
			`<rect x="256" y="84" width="170" height="54" rx="6" fill="#dcfce7"/>` +
			`<text x="341" y="115" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#14532d">${esc(shootMod)}</text>` +
			`<text x="341" y="166" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#15803d">الهدف: تقليص النتح وتخزين الماء</text>` +
			// Root panel
			`<rect x="20" y="44" width="198" height="156" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="1.8"/>` +
			`<text x="119" y="68" text-anchor="middle" font-size="11.8" font-weight="bold" fill="#92400e">المجموع الجذري (تحت التربة)</text>` +
			`<rect x="34" y="84" width="170" height="54" rx="6" fill="#fef3c7"/>` +
			`<text x="119" y="115" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#78350f">${esc(rootMod)}</text>` +
			`<text x="119" y="166" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#b45309">الهدف: البحث عن الماء وامتصاصه</text>`
	);
}

function buildRespirationAnimalsSvg(animals: Array<{ name: string; medium: string; organ: string }>): string {
	const xs = [356, 230, 104];
	const cards = animals
		.slice(0, 3)
		.map((a, i) => {
			const x = xs[i];
			const cols = ['#dc2626', '#0284c7', '#d97706'];
			const bgs = ['#fef2f2', '#f0f9ff', '#fffbeb'];
			return (
				`<rect x="${x - 58}" y="46" width="116" height="156" rx="9" fill="${bgs[i]}" stroke="${cols[i]}" stroke-width="1.8"/>` +
				`<text x="${x}" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="${cols[i]}">${esc(a.name)}</text>` +
				`<text x="${x}" y="114" text-anchor="middle" font-size="10.2" font-weight="bold" fill="#0f172a">${esc(a.medium)}</text>` +
				`<rect x="${x - 46}" y="138" width="92" height="42" rx="6" fill="#ffffff" stroke="${cols[i]}" stroke-width="1.2"/>` +
				`<text x="${x}" y="163" text-anchor="middle" font-size="10" font-weight="bold" fill="${cols[i]}">${esc(a.organ)}</text>`
			);
		})
		.join('');
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تنوع أعضاء التنفس عند الحيوانات حسب وسط عيشها</text>` +
			cards
	);
}

function buildLocomotionSupportSvg(): string {
	const cards = [
		{ x: 356, animal: 'الدب والإنسان', style: 'أخمصي المشي', area: 'مساحة إسناد واسعة', col: '#2563eb', bg: '#eff6ff' },
		{ x: 230, animal: 'القط والفهد', style: 'إصبعي المشي', area: 'مساحة إسناد متوسطة', col: '#16a34a', bg: '#f0fdf4' },
		{ x: 104, animal: 'الحصان والغزال', style: 'ذو حوافر', area: 'إسناد ضيق ← عدو سريع', col: '#dc2626', bg: '#fef2f2' }
	];
	return wrapSciencesSvg(
		460,
		220,
		`<rect x="6" y="6" width="448" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="230" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">العلاقة بين مساحة الإسناد على الأرض وسرعة الجري عند الحيوانات</text>` +
			cards
				.map(
					(c) =>
						`<rect x="${c.x - 58}" y="46" width="116" height="154" rx="9" fill="${c.bg}" stroke="${c.col}" stroke-width="1.8"/>` +
						`<text x="${c.x}" y="76" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${c.col}">${esc(c.animal)}</text>` +
						`<text x="${c.x}" y="114" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(c.style)}</text>` +
						`<text x="${c.x}" y="156" text-anchor="middle" font-size="9.6" font-weight="bold" fill="${c.col}">${esc(c.area)}</text>`
				)
				.join('')
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Climatic Factors, Soil Permeability & Resistance Strategies (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const climaticFactorsResistanceTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_climatic_factors_resistance',
	grade: '2am',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'تأثير العوامل الفيزيوكيميائية والتربة ومقاومة المواسم القاسية',
	curriculumLessonId: 'sci_lesson_2am_t2_physicochemical_factors_distribution',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sandPass = rng.pick([82, 85, 88]);
		const humusPass = rng.pick([45, 50, 55]);
		const clayPass = rng.pick([4, 6, 8]);

		const svg = buildSoilWaterRetentionSvg(sandPass, humusPass, clayPass);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_soil_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`التربة (ب) الدبالية هي الأفضل للزراعة لتوازن نفاذيتها واحتفاظها بالماء والهواء`,
			[
				{
					text: 'التربة (أ) الرملية هي الأكثر احتفاظاً بالماء',
					diagnosticFeedback: `التربة الرملية نفذ منها ${sandPass} مل واحتفظت بـ ${100 - sandPass} مل فقط! فهي ضعيفة الاحتفاظ بالماء.`
				},
				{
					text: 'التربة (ج) الغضارية شديدة النفاذية للماء',
					diagnosticFeedback: `التربة الغضارية لم ينفذ منها سوى ${clayPass} مل، فهي كتيمة جداً!`
				},
				{
					text: 'لا تؤثر نوعية التربة ولا المغياثية على توزع النباتات إطلاقاً',
					diagnosticFeedback: 'التربة والرطوبة والحرارة والإضاءة هي العوامل الفيزيوكيميائية الرئيسية المتحكمة في توزع الكائنات.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `سكبنا $100\\text{ mL}$ من الماء على ثلاث عينات تربة فحصلنا على النتائج الموضحة في الوثيقة (التربة أ: نفذ $${sandPass}\\text{ mL}$، التربة ب: نفذ $${humusPass}\\text{ mL}$، التربة ج: نفذ $${clayPass}\\text{ mL}$). أيّ استنتاج صحيح؟`,
			questionTextAr: `قارن نفاذية الترب الثلاث في الوثيقة واستنتج التربة الأفضل للزراعة.`,
			imageUrl,
			imageCaption: 'تجربة قياس نفاذية ثلاث عينات تربة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `التربة (ب) **الدبالية** تجمع بين نفاذية معتدلة ($${humusPass}\\text{ mL}$) واحتفاظ مناسب بالماء ($${100 - humusPass}\\text{ mL}$) والتهوية، فتكون المثلى لنمو النباتات.`
		};

		const hints: [string, string, string] = [
			'الماء المحتفظ به = 100 مل − الماء النافذ.',
			'الرملية: نفاذية عالية جداً؛ الغضارية: كتيمة؛ الدبالية: متوازنة وخصبة.',
			'في الشتاء: القنفذ يدخل في سبات، اللقلق يهاجر، والنباتات تقاوم بالبذور والأبصال والدرنات.'
		];
		const solutionStepsAr = [
			`التربة أ (رملية): شديدة النفاذية (${sandPass} مل)، تحتفظ بـ ${100 - sandPass} مل فقط.`,
			`التربة ج (غضارية): كتيمة (${clayPass} مل نافذ)، تمنع تهوية الجذور.`,
			`التربة ب (دبالية): متوازنة (احتفاظ ${100 - humusPass} مل) ومناسبة للغطاء النباتي.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتوزع الغطاء النباتي والحيواني في الجزائر حسب عوامل فيزيوكيميائية متعددة منها *طبيعة التربة* والمناخ. تمثل الوثيقة نتائج سكب $100$ مل من الماء على ثلاث عينات تربة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) قارن بين نفاذية وقدرة الاحتفاظ بالماء للترب الثلاث، ثم استنتج التربة الأكثر ملاءمة لنمو النباتات مع التعليل.`,
							answer: `1) التربة أ (*رملية*) شديدة النفاذية وضعيفة الاحتفاظ بالماء (${100 - sandPass} مل)، والتربة ج (*غضارية*) كتيمة تحتفظ بأغلب الماء (${100 - clayPass} مل) فتختنق الجذور. *التربة ب (الدبالية)* هي الأفضل لتوازنها في الاحتفاظ بالماء (${100 - humusPass} مل) والتهوية والأملاح.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'نتائج تجربة نفاذية التربة'
						}
					]
				},
				{
					type: 'table',
					headers: ['الكائن الحي', 'استراتيجية مقاومة فصل الشتاء البارد'],
					cells: [],
					rows: [
						['القنفذ والدب والضفدع', { content: '................', answer: 'السبات الشتوي (حياة بطيئة)', mark: '1' }],
						['طائر اللقلق والسنونو', { content: '................', answer: 'الهجرة الموسمية نحو المناطق الدافئة', mark: '1' }],
						['نبات البطاطا والبصل', { content: '................', answer: 'الحياة البطيئة بأعضاء ترابية (درنات وأبصال)', mark: '1' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) اذكر ثلاثة عوامل مناخية (فيزيوكيميائية) أخرى تفسّر كثافة الغابات في شمال الجزائر وندرتها في الصحراء.`,
					answer: `3) العوامل هي: *المغياثية (الرطوبة والماء)*، *درجة الحرارة*، و*شدة الإضاءة*.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'التربة الدبالية الأفضل — السبات والهجرة والحياة البطيئة'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Desert Plant Morphological Adaptations (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const desertPlantMorphologyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_desert_plant_morphological',
	grade: '2am',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'تحورات المجموع الخضري والجذري عند النباتات الصحراوية',
	curriculumLessonId: 'sci_lesson_2am_t2_desert_plant_adaptations',
	defaultPoints: 6,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plants = [
			{
				name: 'التين الشوكي (الصبار)',
				shoot: 'أوراق متحورة لأشواك + ساق لحمية خضراء',
				root: 'جذور سطحية أفقية كثيفة وواسعة',
				purpose: 'تقليص النتح وتخزين الماء وامتصاص الندى والأمطار النادرة'
			},
			{
				name: 'نبات الحلفاء',
				shoot: 'التفاف الأوراق على نفسها لإخفاء الثغور',
				root: 'مجموع جذري عميق وكثيف التفرع',
				purpose: 'حماية الثغور من الرياح الجافة لتقليل النتح وامتصاص الرطوبة العميقة'
			},
			{
				name: 'نبات الشيح',
				shoot: 'اختزال شديد لمساحة الأوراق الصغيرة',
				root: 'جذور متوغلة عميقاً في التربة',
				purpose: 'تقليل سطح التبادل لتقليص النتح والبحث عن المياه الباطنية'
			}
		];
		const p = rng.pick(plants);
		const others = plants.filter((x) => x.name !== p.name);

		const svg = buildDesertAdaptationCardSvg(p.name, p.shoot, p.root);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_desert_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			p.purpose,
			[
				{
					text: 'زيادة شدة عملية النتح وفقدان أكبر كمية من الماء للجو',
					diagnosticFeedback: 'النبات الصحراوي يعيش في وسط جاف، لذا يسعى لتقليص النتح لا زيادته!'
				},
				{
					text: 'التوقف نهائياً عن عملية التركيب الضوئي',
					diagnosticFeedback: 'النباتات الصحراوية تواصل التركيب الضوئي (في السيقان الخضراء اللحمية للصبار مثلاً)!'
				},
				{
					text: 'الانتقال بالسباحة في المياه العميقة',
					diagnosticFeedback: 'النباتات ثابتة في التربة وتعيش في وسط صحراوي جاف.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يوضح المخطط المقابل تحورات **${p.name}** (${p.shoot}، و${p.root}). ما الهدف البيولوجي من هذه التحورات المورفولوجية؟`,
			questionTextAr: `ما الهدف من تحورات ${p.name} الموضحة في الوثيقة؟`,
			imageUrl,
			imageCaption: `تحورات المجموع الخضري والجذري عند ${p.name}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تحورات **${p.name}** تهدف إلى **${p.purpose}** للتكيف مع الجفاف وقلة المياه.`
		};

		const hints: [string, string, string] = [
			'المجموع الخضري يتحور لتقليص النتح (فقدان الماء) أو تخزين الماء.',
			'المجموع الجذري يتحور (عمقاً أو أفقياً) لزيادة امتصاص الماء.',
			`في ${p.name}: ${p.purpose}.`
		];
		const solutionStepsAr = [
			`تحور المجموع الخضري في ${p.name}: ${p.shoot}.`,
			`تحور المجموع الجذري: ${p.root}.`,
			`الهدف المزدوج: ${p.purpose}.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تبدي النباتات الصحراوية والسهبية في الجزائر تحورات بنيوية مدهشة تسمح لها بمقاومة الجفاف الشديد، ومنها *${p.name}* الموضح في الوثيقة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) اشرح كيف يسمح كل من تحور المجموع الخضري وتحور المجموع الجذري لـ *${p.name}* بالبقاء حياً في الوسط الجاف.`,
							answer: `1) *المجموع الخضري* (${p.shoot}): يقلص مساحة الأوراق والثغور المعرضة للحرارة فيقلل فقدان الماء بظاهرة *النتح* (ويخزن الماء في الساق اللحمية للصبار). *المجموع الجذري* (${p.root}): يزيد سطح الامتصاص للبحث عن الماء في الوسط الجاف.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: `تحورات الجهاز الإعاشي عند ${p.name}`
						}
					]
				},
				{
					type: 'table',
					headers: ['النبات الصحراوي', 'التحور المورفولوجي المميز', 'وظيفة التحور'],
					cells: [],
					rows: [
						[
							others[0].name,
							{ content: '................', answer: others[0].shoot, mark: '1' },
							{ content: '................', answer: 'تقليص النتح وتخزين الماء / الحماية', mark: '0.75' }
						],
						[
							others[1].name,
							{ content: '................', answer: others[1].shoot, mark: '1' },
							{ content: '................', answer: 'تقليل فقدان الماء بالنتح', mark: '0.75' }
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: p.purpose
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Animal Respiration Organs & Media (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const animalRespirationOrgansTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_animal_respiration_organs',
	grade: '2am',
	trimesterId: 't2',
	domain: 'human_body',
	titleAr: 'أنماط التنفس عند الحيوانات وتكيف أعضائها مع الوسط',
	curriculumLessonId: 'sci_lesson_2am_t2_animal_respiration_modes',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				animals: [
					{ name: 'الجرادة', medium: 'وسط بري (هواء)', organ: 'قصبات هوائية', mode: 'تنفس قصبي' },
					{ name: 'سمكة السردين', medium: 'وسط مائي', organ: 'غلاصم', mode: 'تنفس غلصمي' },
					{ name: 'الضفدع البالغ', medium: 'برمائي (بر وماء)', organ: 'رئتان + جلد رطب', mode: 'تنفس رئوي وجلدي' }
				],
				askIdx: 2
			},
			{
				animals: [
					{ name: 'الدلفين', medium: 'مائي (ثديي)', organ: 'رئتان (يصعد للسطح)', mode: 'تنفس رئوي' },
					{ name: 'دودة الأرض', medium: 'تربة رطبة', organ: 'جلد رقيق رطب', mode: 'تنفس جلدي' },
					{ name: 'النحلة', medium: 'وسط بري وهوائي', organ: 'قصبات هوائية', mode: 'تنفس قصبي' }
				],
				askIdx: 0
			}
		];
		const st = rng.pick(sets);
		const asked = st.animals[st.askIdx];

		const svg = buildRespirationAnimalsSvg(st.animals);
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_resp_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`${asked.mode} بواسطة (${asked.organ})`,
			[
				{
					text: asked.mode === 'تنفس رئوي' ? 'تنفس غلصمي بواسطة الغلاصم' : 'تنفس غلصمي فقط في الماء والبر',
					diagnosticFeedback: `${asked.name} لا يتنفس بالغلاصم! تذكّر أن الدلفين ثديي رئوي والضفدع البالغ رئوي-جلدي.`
				},
				{
					text: 'تنفس قصبي بواسطة الفتحات البطنية',
					diagnosticFeedback: 'التنفس القصبي خاص بالحشرات (كالجرادة والنحلة).'
				},
				{
					text: 'لا يقوم بأي مبادلات غازية تنفسية',
					diagnosticFeedback: 'جميع الحيوانات تتنفس لامتصاص O₂ وطرح CO₂ وإنتاج الطاقة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `تبيّن الوثيقة المقابلة ثلاثة حيوانات وأوساط عيشها. ما نمط التنفس الدقيق عند **${asked.name}**؟`,
			questionTextAr: `حدد نمط وعضو التنفس عند ${asked.name}.`,
			imageUrl,
			imageCaption: 'مقارنة أعضاء التنفس عند ثلاثة حيوانات',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يتنفس **${asked.name}** **${asked.mode}** بفضل **${asked.organ}**.`
		};

		const hints: [string, string, string] = [
			'أنماط التنفس الأربعة: رئوي، غلصمي، قصبي، جلدي (ومزدوج رئوي-جلدي عند الضفدع).',
			'انتبه: الدلفين والحوت من الثدييات لذا تنفسهما رئوي رغم عيشهما في البحر!',
			`عند ${asked.name}: ${asked.mode} (${asked.organ}).`
		];
		const solutionStepsAr = st.animals.map((a) => `**${a.name}** (${a.medium}): **${a.mode}** عبر ${a.organ}.`);

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تختلف الأنماط والأعضاء التنفسية عند الحيوانات حسب أوساط عيشها لضمان التزود بغاز ثنائي الأكسجين كما توضحه الوثيقة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.1fr', '1.4fr'],
					children: [
						{
							type: 'text',
							content: `1) أكمل الجدول أسفله بتحديد *نمط التنفس* و*مصدر الأكسجين* (الهواء الجوي أم المنحل في الماء) لكل حيوان.`,
							answer: `1) انظر استكمال الجدول أسفله بدقة.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'أعضاء التنفس عند ثلاثة حيوانات مختلفة'
						}
					]
				},
				{
					type: 'table',
					headers: ['الحيوان', 'عضو التنفس', 'نمط التنفس', 'مصدر الأكسجين'],
					cells: [],
					rows: st.animals.map((a) => [
						a.name,
						a.organ,
						{ content: '................', answer: a.mode, mark: '0.5' },
						{
							content: '................',
							answer: a.mode.includes('غلصمي') ? 'منحل في الماء' : a.mode.includes('رئوي وجلدي') ? 'الهواء والماء' : 'الهواء الجوي',
							mark: '0.5'
						}
					]),
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `2) علّل لماذا تموت الجرادة اختناقاً إذا غُمر بطنها في الماء، ولماذا يصعد الدلفين باستمرار إلى سطح البحر.`,
					answer: `2) تموت الجرادة عند غمر بطنها لأن الفتحات التنفسية للقصبات الهوائية توجد على جانبي *البطن* فينقطع عنها الهواء. أما الدلفين فيصعد إلى السطح لأنه من الثدييات ويمتلك *رئتين* فيتنفس الأكسجين من الهواء الجوي.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${asked.mode} (${asked.organ})`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Water Pollution & Dissolved Oxygen Curve (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const waterPollutionOxygenTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_water_pollution_oxygen',
	grade: '2am',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'تأثير التلوث المائي ودرجة الحرارة على الأكسجين المنحل وتوزع الأسماك',
	curriculumLessonId: 'sci_lesson_2am_t2_animal_respiration_modes',
	defaultPoints: 6,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const o2Clean = rng.pick([10, 11, 12]);
		const o2Drop = rng.pick([2, 2.5, 3]);
		const o2Recover = Math.round((o2Clean + o2Drop) * 0.65);

		const svg = svgBioCurvePlot({
			title: 'تطور كمية الأكسجين المنحل على طول وادٍ بعد نقطة تلوث (مغ/ل)',
			xMin: 0,
			xMax: 12,
			xStep: 2,
			yMin: 0,
			yMax: 14,
			yStep: 2,
			xLabel: 'المسافة (كم)',
			yLabel: 'الأكسجين المنحل (مغ/ل)',
			eventArrows: [{ x: 3, label: 'نقطة صرف ملوث', color: '#dc2626' }],
			shadedZones: [
				{ x1: 3, x2: 7, fill: '#fee2e2', label: 'منطقة تلوث حاد', textColor: '#991b1b' }
			],
			curves: [
				{
					fn: (x) =>
						x <= 3
							? o2Clean
							: x <= 5
								? o2Clean - ((o2Clean - o2Drop) * (x - 3)) / 2
								: o2Drop + ((o2Recover - o2Drop) * (x - 5)) / 7,
					color: '#0284c7',
					label: 'تركيز الأكسجين'
				}
			],
			points: [
				{ x: 1.5, y: o2Clean, label: `محطة 1: ${o2Clean}`, color: '#15803d' },
				{ x: 5, y: o2Drop, label: `محطة 2: ${o2Drop}`, color: '#dc2626' },
				{ x: 11, y: o2Recover, label: `محطة 3: ${o2Recover}`, color: '#2563eb' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_o2curve_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تكاثر البكتيريا المحللة للمواد العضوية استهلك O₂ المنحل فانخفض إلى ${o2Drop} مغ/ل واختنقت الأسماك`,
			[
				{
					text: 'المياه الملوثة ترفع كمية الأكسجين المنحل فتتكاثر الأسماك',
					diagnosticFeedback: `انظر للمنحنى عند المحطة 2: انخفض الأكسجين من ${o2Clean} إلى ${o2Drop} مغ/ل!`
				},
				{
					text: 'الأسماك لا تحتاج إلى الأكسجين المنحل لأنها تتنفس بالقصبات',
					diagnosticFeedback: 'الأسماك تتنفس بالغلاصم وتعتمد كلياً على الأكسجين المنحل في الماء.'
				},
				{
					text: 'ارتفاع درجة حرارة الماء يزيد من ذوبان غاز الأكسجين في الماء',
					diagnosticFeedback: 'بالعكس! ارتفاع درجة الحرارة يقلل من كمية الأكسجين المنحل في الماء.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `يمثل المنحنى تغير كمية $\\text{O}_2$ المنحل على طول وادٍ تعرض لصرف مياه ملوثة عند الكيلومتر $3$، حيث انخفض الأكسجين من $${o2Clean}\\text{ mg/L}$ في المحطة 1 إلى $${o2Drop}\\text{ mg/L}$ في المحطة 2 مع نفوق الأسماك. ما التفسير العلمي لذلك؟`,
			questionTextAr: `فسّر انخفاض الأكسجين المنحل إلى ${o2Drop} مغ/ل ونفوق الأسماك في المحطة 2.`,
			imageUrl,
			imageCaption: 'منحنى تغير الأكسجين المنحل بعد نقطة التلوث',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تتكاثر البكتيريا المحللة للمواد العضوية في المياه الملوثة وتستهلك معظم **$\\text{O}_2$ المنحل**، فينخفض تركيزه إلى $${o2Drop}\\text{ mg/L}$ وتختنق الأسماك ذات التنفس الغلصمي.`
		};

		const hints: [string, string, string] = [
			'اقرأ قيم المنحنى في المحطات الثلاث: 1 (قبل التلوث)، 2 (بعد التلوث مباشرة)، 3 (بعيداً عن التلوث).',
			'المياه الملوثة العضوية تغذي البكتيريا التي تستهلك O₂ المنحل.',
			'ارتفاع الحرارة أيضاً يخفض كمية O₂ المنحل.'
		];
		const solutionStepsAr = [
			`المحطة 1 (ماء نقي): $${o2Clean}\\text{ mg/L}$ $\\leftarrow$ وفرة وتنوع للأسماك.`,
			`المحطة 2 (تلوث حاد): هبوط إلى $${o2Drop}\\text{ mg/L}$ بسبب استهلاك البكتيريا للأكسجين $\\leftarrow$ اختناق وموت الأسماك.`,
			`المحطة 3 (تنقية ذاتية): ارتفاع تدريجي إلى $${o2Recover}\\text{ mg/L}$ $\\leftarrow$ عودة تدريجية لبعض الكائنات.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تعرض وادٍ لصب مياه الصرف الصحي الملوثة عند المسافة $3$ كم، فقام فريق بيئي بقياس تركيز الأكسجين المنحل في ثلاث محطات كما يوضحه المنحنى المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.1fr', '1.4fr'],
					children: [
						{
							type: 'text',
							content: `1) حلّل المنحنى في المحطات الثلاث (1، 2، و 3) مع ذكر القيم العددية لتركيز الأكسجين المنحل.`,
							answer: `1) قبل نقطة التلوث (المحطة 1) يكون الأكسجين المنحل مرتفعاً ($${o2Clean}$ مغ/ل). بعد الصرف الملوث مباشرة (المحطة 2) ينخفض بشكل حاد إلى $${o2Drop}$ مغ/ل. ثم يبدأ بالارتفاع التدريجي بعيداً عن التلوث (المحطة 3) ليصل إلى $${o2Recover}$ مغ/ل.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تغير الأكسجين المنحل على طول الوادي'
						}
					]
				},
				{
					type: 'text',
					content: `2) فسّر سبب الانخفاض الحاد في الأكسجين المنحل في المحطة 2، وبيّن عاقبة ذلك على الأسماك مع ذكر نمط تنفسها.`,
					answer: `2) يرجع الانخفاض إلى *تكاثر البكتيريا* التي تستهلك الأكسجين المنحل لتحليل المواد العضوية الملوثة. ونتيجة لذلك *تختنق الأسماك وتموت* لأنها تعتمد على *التنفس الغلصمي* الذي يتطلب وفرة الأكسجين المنحل.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) اقترح حلّين عمليين لحماية الوديان والأنهار الجزائرية والحفاظ على ثروتها السمكية.`,
					answer: `3) إنشاء *محطات تصفية وتنقية المياه المستعملة* قبل صرفها في الوديان، ومنع رمي النفايات الصناعية والمياه الساخنة في المجاري المائية.`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `استهلاك البكتيريا لـ O₂ ← انخفاضه إلى ${o2Drop} مغ/ل ← اختناق الأسماك`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5: Animal Locomotion & Support Surface (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const locomotionAdaptationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_locomotion_adaptation',
	grade: '2am',
	trimesterId: 't2',
	domain: 'human_body',
	titleAr: 'أنماط التنقل عند الحيوانات وتكيف الأعضاء ومساحة الإسناد',
	curriculumLessonId: 'sci_lesson_2am_t2_animal_locomotion_adaptation',
	defaultPoints: 6,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const askJump = seed % 2 === 0;

		const svg = buildLocomotionSupportSvg();
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_loco_s${seed}`, svg);

		const correctOpt = askJump
			? 'أطراف خلفية طويلة وقوية ومطوية على شكل حرف Z (الأرنب، الكنغر، الضفدع، الجرادة)'
			: 'كلما قلّت مساحة الإسناد على الأرض (ذو حوافر كالحصان) زادت سرعة الجري';

		const mcq = buildUniqueMcqOptions(
			correctOpt,
			[
				{
					text: 'كلما زادت مساحة الإسناد على الأرض (أخمصي كالدب) زادت سرعة العدو للحد الأقصى',
					diagnosticFeedback: 'بالعكس! ذوات الحوافر (مساحة إسناد ضيقة جداً) أسرع في الجري من الأخمصيات!'
				},
				{
					text: 'تطير الطيور بفضل حراشف بطنية ثقيلة وعظام مصمتة بدون أجنحة',
					diagnosticFeedback: 'الطيور تمتلك أجنحة واسعة وريشاً وعظاماً مجوفة خفيفة، أما الحراشف البطنية فللزحف!'
				},
				{
					text: 'تسبح السمكة بواسطة أطراف مطوية على شكل حرف Z',
					diagnosticFeedback: 'تسبح السمكة بفضل شكلها المغزلي والزعانف.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: askJump
				? 'ما التكيف البنيوي الذي يسمح للأرنب والضفدع والجرادة بالتنقل بـ **القفز**؟'
				: 'بالاعتماد على الوثيقة المقابلة، ما العلاقة الصحيحة بين **مساحة الإسناد** على الأرض وسرعة الجري عند الثدييات البرية؟',
			questionTextAr: askJump
				? 'حدد تكيف الأطراف الخلفية للقفز.'
				: 'ما العلاقة بين مساحة الإسناد وسرعة الجري؟',
			imageUrl,
			imageCaption: 'مقارنة مساحة الإسناد عند الأخمصي والإصبعي وذي الحافر',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: correctOpt + '.'
		};

		const hints: [string, string, string] = [
			'السباحة: شكل مغزلي + زعانف أو أقدام راحية؛ الطيران: أجنحة واسعة + عظام خفيفة مجوفة.',
			'القفز: أطراف خلفية طويلة وقوية بشكل حرف Z.',
			'الجري: أضيق مساحة إسناد (الحافر) ← أكبر سرعة.'
		];
		const solutionStepsAr = [
			'الحيوانات الأخمصية (الدب، الإنسان): إسناد واسع ← توازن ومشي.',
			'الحيوانات الإصبعية (القط، الفهد): إسناد متوسط ← جري سريع.',
			'ذوات الحوافر (الحصان، الغزال): إسناد ضيق جداً ← عدو سريع جداً.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `تبدي الحيوانات تكيفاً دقيقاً بين أعضاء حركتها ومساحة إسنادها ونمط تنقلها في الوسط كما توضحه الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.15fr', '1.35fr'],
					children: [
						{
							type: 'text',
							content: `1) قارن مساحة الإسناد على الأرض بين *الدب* و*الحصان*، واستنتج العلاقة بين مساحة الإسناد وسرعة الجري.`,
							answer: `1) الدب *أخمصي المشي* (مساحة إسناد واسعة) أما الحصان فـ *ذو حافر* (مساحة إسناد ضيقة جداً). *الاستنتاج:* كلما قلّت مساحة الإسناد على الأرض زادت سرعة الجري.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مقارنة مساحة الإسناد عند ثلاثة ثدييات'
						}
					]
				},
				{
					type: 'table',
					headers: ['الحيوان', 'نمط التنقل', 'البنية المتكيفة (العضو وصفاته)'],
					cells: [],
					rows: [
						[
							'سمكة السردين',
							{ content: '............', answer: 'السباحة', mark: '0.5' },
							{ content: '................', answer: 'شكل مغزلي + زعانف', mark: '0.5' }
						],
						[
							'الحمامة',
							{ content: '............', answer: 'الطيران', mark: '0.5' },
							{ content: '................', answer: 'شكل انسيابي + أجنحة واسعة وريش وعظام مجوفة', mark: '0.5' }
						],
						[
							'الأرنب والضفدع',
							{ content: '............', answer: 'القفز', mark: '0.5' },
							{ content: '................', answer: 'أطراف خلفية طويلة قوية مطوية بشكل حرف Z', mark: '0.5' }
						],
						[
							'الأفعى',
							{ content: '............', answer: 'الزحف', mark: '0.5' },
							{ content: '................', answer: 'غياب الأطراف + عضلات قوية وحراشف بطنية', mark: '0.5' }
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
			trimesterId: 't2',
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
const integrationWadiAdaptationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2am_t2_integration_wadi_adaptation',
	grade: '2am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تلوث وادٍ وتأثيره على الكائنات المائية وتكيفها',
	curriculumLessonId: 'sci_lesson_2am_t2_animal_respiration_modes',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const wadi = rng.pick(['وادي سيبوس', 'وادي الشلف', 'وادي الصومام']);

		const svg = svgBioCurvePlot({
			title: `السند 1: قياس الأكسجين المنحل في ثلاث مناطق من ${wadi}`,
			xMin: 0,
			xMax: 10,
			xStep: 2,
			yMin: 0,
			yMax: 14,
			yStep: 2,
			xLabel: 'المسافة (كم)',
			yLabel: 'الأكسجين المنحل (مغ/ل)',
			eventArrows: [{ x: 3, label: 'مصب مصنع ملوث', color: '#dc2626' }],
			shadedZones: [
				{ x1: 3, x2: 6.5, fill: '#fee2e2', label: 'نقص حاد للأكسجين', textColor: '#991b1b' }
			],
			curves: [
				{
					fn: (x) => (x <= 3 ? 11.5 : x <= 4.5 ? 11.5 - (x - 3) * 6 : 2.5 + (x - 4.5) * 1.15),
					color: '#0284c7',
					label: 'الأكسجين المنحل'
				}
			],
			points: [
				{ x: 1.5, y: 11.5, label: 'منطقة أ (11.5)', color: '#15803d' },
				{ x: 4.5, y: 2.5, label: 'منطقة ب (2.5)', color: '#dc2626' },
				{ x: 9, y: 7.7, label: 'منطقة ج (7.7)', color: '#2563eb' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_2am_t2_integ_wadi_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'تلوث المياه الساخنة والعضوية خفض O₂ إلى 2.5 مغ/ل فماتت الأسماك الغلصمية وبقي الضفدع لتنفسه الرئوي الجلدي',
			[
				{
					text: 'ماتت الأسماك في المنطقة ب لارتفاع نسبة الأكسجين المنحل إلى 11.5 مغ/ل',
					diagnosticFeedback: 'في المنطقة ب انخفض الأكسجين المنحل إلى 2.5 مغ/ل فقط!'
				},
				{
					text: 'بقي الضفدع حياً لأنه يتنفس بالغلاصم مثل الأسماك تماماً',
					diagnosticFeedback: 'الضفدع البالغ يمتلك تنفساً رئوياً (يأخذ هواءً جوياً) وجلدياً!'
				},
				{
					text: 'الأسماك انتقلت من المنطقة ب إلى البر بفضل أجنحتها',
					diagnosticFeedback: 'الأسماك كائنات مائية ذات زعانف وغلاصم لا تستطيع التنقل أو التنفس على البر.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `بعد إقامة مصنع قرب **${wadi}**، لوحظ نفوق أسماك التروتة والباربو في المنطقة (ب) ($2.5\\text{ mg/L}$ من $\\text{O}_2$ وحرارة $30^\\circ\\text{C}$)، بينما شوهدت ضفادع تخرج إلى الضفة وتبقى حية. ما التفسير العلمي الصحيح؟`,
			questionTextAr: `فسّر نفوق الأسماك وبقاء الضفدع في المنطقة (ب) من ${wadi}.`,
			imageUrl,
			imageCaption: `السند 1: منحنى الأكسجين المنحل في ${wadi}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `التلوث العضوي والحراري خفض $\\text{O}_2$ المنحل إلى $2.5\\text{ mg/L}$ فاختنقت الأسماك ذات **التنفس الغلصمي**، بينما نجا **الضفدع** لقدرته على القفز إلى اليابسة والتنفس بـ **الرئتين**.`
		};

		const hints: [string, string, string] = [
			'استعمل معطيات السند 1 (قيم O₂) والسند 2 (درجة الحرارة وتوزع الكائنات).',
			'اذكر نمط تنفس وتنقل كل من السمكة (غلصمي/سباحة بالزعانف) والضفدع (رئوي-جلدي/سباحة وقفز).',
			'اقترح 3 حلول بيئية لإعادة التوازن إلى الوادي.'
		];
		const solutionStepsAr = [
			`تفسير موت الأسماك (السند 1 و 2): طرح مياه ملوثة وساخنة خفض O₂ إلى 2.5 مغ/ل فاختنقت الأسماك الغلصمية.`,
			'تفسير نجاة الضفدع: تنفسه المزدوج (رئوي في البر) وقدرته على القفز بأطرافه الخلفية (حرف Z).',
			'الحلول: محطة تصفية للمصنع، تبريد المياه قبل الصرف، وحماية الأوساط المائية.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `*السياق:* يشتهر *${wadi}* بتنوع ثروته السمكية ونباتاته المائية. بعد تشييد مصنع قريب منه يرمي مياهه الساخنة والملوثة بالمواد العضوية مباشرة في الوادي، سجل سكان المنطقة (ب) نفوقاً جماعياً لأسماك الشبوط والتروتة، في حين لاحظوا استمرار وجود الضفادع على الضفاف. لدراسة هذه الكارثة البيئية نقدم لك السندات التالية:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'image',
							src: imageUrl,
							caption: `السند 1: تغير الأكسجين المنحل في ${wadi}`
						},
						{
							type: 'table',
							headers: ['السند 2: المنطقة', 'الحرارة', 'الأسماك', 'الضفادع'],
							cells: [],
							rows: [
								['المنطقة أ (قبل المصنع)', '16 درجة', 'كثيرة ومتنوعة', 'موجودة'],
								['المنطقة ب (بعد المصنع)', '30 درجة', 'نفوق كامل', 'تخرج للضفة'],
								['المنطقة ج (بعيدة)', '20 درجة', 'عودة تدريجية', 'موجودة']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'text',
					content: `*السند 3:* تحتاج أسماك التروتة إلى مياه باردة ونقية غنية بالأكسجين المنحل (أكثر من 7 مغ/ل)، بينما تنخفض قابلية انحلال الأكسجين كلما ارتفعت درجة حرارة الماء أو زاد التلوث العضوي.\n\n*التعليمات:* بالاعتماد على السياق والسندات ومكتسباتك القبلية:`
				},
				{
					type: 'text',
					content: `1) فسّر علمياً سبب النفوق الجماعي للأسماك في المنطقة (ب) مباشرة بعد مصب المصنع.`,
					answer: `1) اعتماداً على السياق والسندات 1 و 2 و 3 ومكتسباتي القبلية: يعود نفوق الأسماك إلى *اختناقها بسبب الانخفاض الحاد في الأكسجين المنحل* (هبط من 11.5 إلى 2.5 مغ/ل)، وذلك لسببين: *تكاثر البكتيريا* المستهلكة للأكسجين لتحليل المواد العضوية الملوثة، و*ارتفاع درجة حرارة الماء* (30 درجة) الذي يقلل من انحلال الأكسجين، وبما أن الأسماك تتنفس *تنفساً غلصمياً* فلا يمكنها العيش في هذا النقص الحاد.`,
					mark: '3'
				},
				{
					type: 'text',
					content: `2) فسّر كيف استطاع *الضفدع* البقاء حياً في المنطقة (ب) مقارنة بالأسماك، مبرزاً نمط تنفسه ونمط تنقله وتكيف أعضائه.`,
					answer: `2) اعتماداً على السند 2 ومكتسباتي القبلية: نجا الضفدع لأنه *حيوان برمائي*؛ يستطيع الخروج إلى اليابسة بـ *القفز* بفضل أطرافه الخلفية الطويلة والقوية المطوية بشكل حرف Z (والسباحة بأقدامه الراحية)، كما يمتلك *تنفساً مزدوجاً* (يتنفس *رئوياً* في الهواء الجوي على الضفة، و*جلدياً* في الماء النقي).`,
					mark: '2.5'
				},
				{
					type: 'text',
					content: `3) اقترح ثلاث إجراءات عملية مستعجلة لإعادة التوازن البيئي والثروة السمكية إلى *${wadi}*.`,
					answer: `3) اعتماداً على السندات ومكتسباتي القبلية، أقترح:\n- إلزام المصنع بتركيب *محطة تصفية ومعالجة* لمياهه الملوثة قبل صرفها.\n- *تبريد المياه الصناعية* قبل طرحها لمنع التلوث الحراري والحفاظ على انحلال الأكسجين.\n- مراقبة نوعية المياه بانتظام ومنع رمي النفايات في الوديان وإعادة استزراع الأسماك بعد التنقية.`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: 'اختناق الأسماك بنقص O₂ المنحل (2.5 مغ/ل) + نجاة الضفدع لتنفسه الرئوي'
		};
	}
};

export const SCIENCES_TEMPLATES_2AM_T2: SciencesParameterizedTemplate[] = [
	climaticFactorsResistanceTemplate,
	desertPlantMorphologyTemplate,
	animalRespirationOrgansTemplate,
	waterPollutionOxygenTemplate,
	locomotionAdaptationTemplate,
	integrationWadiAdaptationTemplate
];
