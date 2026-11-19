import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	calloutBadge,
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgBioFlowchart,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function buildGerminationCondSvg(missingFactor: 'water' | 'heat' | 'healthy_seed'): string {
	const box2Label =
		missingFactor === 'water'
			? 'قطن جاف (دون ماء)'
			: missingFactor === 'heat'
				? 'في الثلاجة (برد شديد)'
				: 'بذور مسلوقة (تالفة)';
	return wrapSciencesSvg(
		440,
		225,
		`<rect x="6" y="6" width="428" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تجربة مقارنة لاستنتاج شروط إنتاش البذرة</text>` +
			// Box 1: Control (Right) -> Germinates
			`<rect x="234" y="44" width="184" height="158" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>` +
			`<text x="326" y="65" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">العلبة (أ): الشاهد</text>` +
			`<text x="326" y="84" text-anchor="middle" font-size="10" fill="#14532d">بذور سليمة + ماء + حرارة معتدلة</text>` +
			`<rect x="266" y="138" width="120" height="24" rx="4" fill="#dbeafe"/>` +
			`<ellipse cx="326" cy="136" rx="13" ry="8" fill="#d97706"/>` +
			`<line x1="326" y1="144" x2="326" y2="159" stroke="#78350f" stroke-width="2.5"/>` +
			`<line x1="326" y1="128" x2="326" y2="102" stroke="#16a34a" stroke-width="3"/>` +
			`<ellipse cx="315" cy="100" rx="11" ry="6" fill="#4ade80" stroke="#15803d"/>` +
			`<ellipse cx="337" cy="100" rx="11" ry="6" fill="#4ade80" stroke="#15803d"/>` +
			`<text x="326" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">النتيجة: إنتاش جيد ✓</text>` +
			// Box 2: Experimental (Left) -> Fails
			`<rect x="22" y="44" width="184" height="158" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>` +
			`<text x="114" y="65" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">العلبة (ب): التجربة</text>` +
			`<text x="114" y="84" text-anchor="middle" font-size="10" fill="#7f1d1d">${esc(box2Label)}</text>` +
			`<rect x="54" y="138" width="120" height="24" rx="4" fill="${missingFactor === 'water' ? '#f1f5f9' : '#dbeafe'}"/>` +
			`<ellipse cx="114" cy="136" rx="13" ry="8" fill="#a16207"/>` +
			`<text x="114" y="186" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">النتيجة: عدم الإنتاش ✕</text>`
	);
}

function buildSaltsComparisonSvg(waterType: 'distilled' | 'excess'): string {
	const isDistilled = waterType === 'distilled';
	return wrapSciencesSvg(
		440,
		225,
		`<rect x="6" y="6" width="428" height="213" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تأثير الأملاح المعدنية على نمو النبات الأخضر</text>` +
			// Control pot right
			`<rect x="234" y="44" width="184" height="158" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.9"/>` +
			`<text x="326" y="64" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">أصيص (1): ماء معدني</text>` +
			`<polygon points="302,166 350,166 344,138 308,138" fill="#d97706" stroke="#78350f"/>` +
			`<line x1="326" y1="138" x2="326" y2="84" stroke="#15803d" stroke-width="3.5"/>` +
			`<ellipse cx="308" cy="108" rx="16" ry="8" fill="#22c55e" transform="rotate(-18 308 108)"/>` +
			`<ellipse cx="344" cy="104" rx="16" ry="8" fill="#22c55e" transform="rotate(18 344 104)"/>` +
			`<text x="326" y="188" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#15803d">نمو جيد وأوراق خضراء</text>` +
			// Test pot left
			`<rect x="22" y="44" width="184" height="158" rx="9" fill="${isDistilled ? '#fffbeb' : '#fef2f2'}" stroke="${isDistilled ? '#d97706' : '#dc2626'}" stroke-width="1.9"/>` +
			`<text x="114" y="64" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${isDistilled ? '#92400e' : '#991b1b'}">${isDistilled ? 'أصيص (2): ماء مقطر' : 'أصيص (2): إفراط في الأملاح'}</text>` +
			`<polygon points="90,166 138,166 132,138 96,138" fill="#d97706" stroke="#78350f"/>` +
			(isDistilled
				? `<line x1="114" y1="138" x2="114" y2="108" stroke="#ca8a04" stroke-width="2.6"/><ellipse cx="101" cy="116" rx="11" ry="5" fill="#fde047"/><ellipse cx="127" cy="116" rx="11" ry="5" fill="#fde047"/>`
				: `<path d="M 114 138 Q 118 118 134 124" fill="none" stroke="#991b1b" stroke-width="2.6"/><ellipse cx="136" cy="128" rx="10" ry="4" fill="#fca5a5"/>`) +
			`<text x="114" y="188" text-anchor="middle" font-size="10.8" font-weight="bold" fill="${isDistilled ? '#b45309' : '#dc2626'}">${isDistilled ? 'نمو ضعيف واصفرار' : 'ذبول وموت النبات'}</text>`
	);
}

function buildVegetativeWaterSvg(plantName: string, methodLabel: string): string {
	return wrapSciencesSvg(
		440,
		220,
		`<rect x="6" y="6" width="428" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<text x="220" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">التكاثر الخضري ومسار الماء في النبات</text>` +
			`<rect x="234" y="46" width="184" height="148" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>` +
			`<text x="326" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">نبات: ${esc(plantName)}</text>` +
			`<circle cx="326" cy="118" r="24" fill="#dcfce7" stroke="#15803d" stroke-width="1.8"/>` +
			`<text x="326" y="122" text-anchor="middle" font-size="11" font-weight="bold" fill="#14532d">${esc(methodLabel)}</text>` +
			`<text x="326" y="172" text-anchor="middle" font-size="10" fill="#166534">تكاثر خضري (دون بذور)</text>` +
			`<rect x="22" y="46" width="184" height="148" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
			`<text x="114" y="70" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">مسار الماء الملون</text>` +
			`<rect x="82" y="132" width="64" height="44" rx="4" fill="#fca5a5" stroke="#334155" stroke-width="1.6"/>` +
			`<rect x="110" y="88" width="8" height="72" fill="#22c55e" stroke="#15803d"/>` +
			`<line x1="114" y1="158" x2="114" y2="90" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3"/>` +
			`<circle cx="114" cy="84" r="10" fill="#fecdd3" stroke="#e11d48"/>` +
			calloutBadge(60, 108, '↑', '#dc2626')
	);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Seed Anatomy & Germination Stages (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const seedAnatomyGerminationTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t2_seed_anatomy_germination',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'مكونات البذرة ومراحل إنتاشها',
	curriculumLessonId: 'sci_lesson_4ap_t2_seed_structure_germination',
	defaultPoints: 2,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const parts = [
			{
				part: 'الفلقتان',
				role: 'تخزين المدخرات الغذائية اللازمة لنمو الرشيم في بداية الإنتاش',
				wrong: ['اللحافة', 'الجذير', 'السويقة']
			},
			{
				part: 'اللحافة',
				role: 'حماية مكونات البذرة الداخلية من المؤثرات الخارجية',
				wrong: ['الفلقتان', 'الرشيم', 'الوريقتان الأوليتان']
			},
			{
				part: 'الرشيم',
				role: 'النمو والتطور ليعطي النبيتة الجديدة (ويتكون من جذير وسويقة ووريقتين أوليتين)',
				wrong: ['اللحافة', 'الفلقتان', 'القشرة الخارجية']
			}
		];
		const chosen = rng.pick(parts);
		const svg = svgPlantAndPrimaryDiagram('seed_germination');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t2_seed_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.part,
			chosen.wrong.map((w) => ({
				text: w,
				diagnosticFeedback: `راجع دور كل جزء من أجزاء البذرة؛ ليس (${w}) هو المسؤول عن: ${chosen.role}.`
			})),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أثناء تفحّص بذرة فاصولياء منقوعة في الماء، ما الجزء الذي تتمثّل وظيفته في: **«${chosen.role}»**؟`,
			questionTextAr: `ما مكون البذرة الذي يقوم بـ: ${chosen.role}؟`,
			imageUrl,
			imageCaption: 'مراحل إنتاش البذرة ونمو النبيتة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تتكون البذرة من اللحافة (للحماية)، والفلقتين (لتخزين الغذاء)، والرشيم (يعطي النبتة الجديدة). إذن الإجابة هي **${chosen.part}**.`
		};

		const hints: [string, string, string] = [
			'تذكّر الأجزاء الثلاثة الأساسية للبذرة: اللحافة، الفلقتان، والرشيم.',
			'اللحافة غلاف خارجي، والفلقتان مخزن غذاء، والرشيم هو الجنين النباتي.',
			`طابق الوظيفة المذكورة مع الجزء المناسب لتجد (${chosen.part}).`
		];

		const solutionStepsAr = [
			'مكونات بذرة الفاصولياء: اللحافة + الفلقتان + الرشيم.',
			`الوظيفة المذكورة تخص **${chosen.part}**.`,
			'مراحل الإنتاش: انتفاخ البذرة ← بروز الجذير ← نمو السويقة ← ظهور الأوراق الخضراء.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'لاحظ رسم مراحل إنتاش البذرة المقابل، ثم أجب عن السؤالين:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: `1) اذكر مكونات البذرة الثلاثة الأساسية، ثم حدّد الجزء الذي يقوم بـ: *${chosen.role}*.`,
							answer: `1) مكونات البذرة: *اللحافة، الفلقتان، والرشيم* (جذير + سويقة + وريقتان أوليتان). الجزء المطلوب هو: *${chosen.part}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مراحل إنتاش بذرة الفاصولياء'
						}
					]
				},
				{
					type: 'text',
					content: '2) رتّب مراحل إنتاش البذرة الآتية بالأرقام من 1 إلى 4: (..... نمو السويقة نحو الأعلى — ..... انتفاخ البذرة وتمزق اللحافة — ..... ظهور الأوراق الخضراء وذبول الفلقتين — ..... بروز الجذير نحو الأسفل).',
					answer: '2) الترتيب الصحيح: *(1) انتفاخ البذرة وتمزق اللحافة ← (2) بروز الجذير نحو الأسفل ← (3) نمو السويقة نحو الأعلى ← (4) ظهور الأوراق الخضراء وذبول الفلقتين*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.part
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Germination Conditions Experimental Analysis (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const germinationConditionsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t2_germination_conditions',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'تحليل تجارب شروط إنتاش البذرة',
	curriculumLessonId: 'sci_lesson_4ap_t2_seed_structure_germination',
	defaultPoints: 2,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				factor: 'water' as const,
				conditionAr: 'الماء (الرطوبة)',
				descAr: 'في قطن جاف تماماً داخل غرفة دافئة',
				conclusion: 'الماء شرط أساسي لإنتاش البذرة'
			},
			{
				factor: 'heat' as const,
				conditionAr: 'الحرارة المناسبة',
				descAr: 'في قطن مبلل داخل الثلاجة الباردة',
				conclusion: 'الحرارة المناسبة شرط أساسي لإنتاش البذرة'
			},
			{
				factor: 'healthy_seed' as const,
				conditionAr: 'سلامة البذرة',
				descAr: 'باستعمال بذور مسلوقة (مغلية) في قطن مبلل وغرفة دافئة',
				conclusion: 'سلامة البذرة (الرشيم الحي) شرط أساسي للإنتاش'
			}
		];
		const chosen = rng.pick(scenarios);
		const svg = buildGerminationCondSvg(chosen.factor);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t2_germcond_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			chosen.conclusion,
			scenarios
				.filter((s) => s.factor !== chosen.factor)
				.map((s) => ({
					text: s.conclusion,
					diagnosticFeedback: `راقب العامل الذي تغيّر بين العلبة (أ) والعلبة (ب)؛ الشرط الغائب هنا هو ${chosen.conditionAr}.`
				}))
				.concat([
					{
						text: 'ضوء الشمس القوي ضروري لبدء إنتاش البذرة تحت التربة',
						diagnosticFeedback: 'انتبه: البذرة تنتش في الظلام ولا تحتاج الضوء إلا بعد ظهور الأوراق الخضراء.'
					}
				]),
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أنجز فوج تلاميذ تجربة مقارنة لإنتاش بذور العدس: في العلبة (أ) انتشت البذور جيداً، أما في العلبة (ب) التي وُضعت **${chosen.descAr}** فلم تنتش البذور. ماذا نستنتج من هذه التجربة؟`,
			questionTextAr: `ما الاستنتاج العلمي من عدم إنتاش البذور في العلبة (ب)؟`,
			imageUrl,
			imageCaption: 'مقارنة بين العلبة الشاهدة (أ) وعلبة التجربة (ب)',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `لأن الشرط الوحيد الذي غاب في العلبة (ب) هو **${chosen.conditionAr}**، نستنتج أن **${chosen.conclusion}**.`
		};

		const hints: [string, string, string] = [
			'قارن بين شروط العلبة (أ) وشروط العلبة (ب) لتعرف العامل الناقص.',
			`العامل الناقص في العلبة (ب) هو ${chosen.conditionAr}.`,
			'عدم الإنتاش عند غياب شرط معين يثبت أن ذلك الشرط ضروري للإنتاش.'
		];

		const solutionStepsAr = [
			'في العلبة الشاهدة (أ) توفرت جميع الشروط فانتشت البذور.',
			`في العلبة (ب) غاب شرط **${chosen.conditionAr}** فلم تنتش البذور.`,
			`الاستنتاج: **${chosen.conclusion}**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: `قارن بين العلبة (أ) والعلبة (ب) في الوثيقة المقابلة (حيث وُضعت العلبة ب ${chosen.descAr})، ثم أجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) لماذا لم تنتش البذور في العلبة (ب)؟ وما الشرط الذي تثبته هذه التجربة؟',
							answer: `1) لم تنتش البذور في العلبة (ب) لغياب *${chosen.conditionAr}*، ونستنتج أن: *${chosen.conclusion}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تجربة شروط إنتاش البذرة'
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر الشروط الأربعة الأساسية لإنتاش البذرة، ثم بيّن: هل تحتاج البذرة إلى الضوء في بداية الإنتاش؟',
					answer: '2) الشروط الأربعة هي: *سلامة البذرة، الماء (الرطوبة)، الحرارة المناسبة، والهواء*. لا تحتاج البذرة إلى الضوء في بداية الإنتاش لأنها تتغذى من مدخرات الفلقتين.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: chosen.conclusion
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mineral Salts Experiment (2.5 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const mineralSaltsExperimentTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t2_mineral_salts_experiment',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'حاجات النبات الأخضر للأملاح المعدنية',
	curriculumLessonId: 'sci_lesson_4ap_t2_mineral_salts_needs',
	defaultPoints: 2.5,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const isDistilled = seed % 2 === 0;
		const svg = buildSaltsComparisonSvg(isDistilled ? 'distilled' : 'excess');
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t2_salts_s${seed}`, svg);

		const correctAnswer = isDistilled
			? 'ضعف نمو النبتة واصفرار أوراقها بسبب خلو الماء المقطر من الأملاح المعدنية'
			: 'ذبول وموت النبتة بسبب الإفراط المفرط في تركيز الأملاح المعدنية';

		const mcq = buildUniqueMcqOptions(
			correctAnswer,
			[
				{
					text: isDistilled
						? 'موت النبتة بسبب الإفراط المفرط في الأملاح المعدنية داخل الماء المقطر'
						: 'نمو النبتة بسرعة مضاعفة لأن زيادة الملح تفيد الجذور دائماً',
					diagnosticFeedback: isDistilled
						? 'الماء المقطر خالٍ تماماً من الأملاح المعدنية وليس مفرطاً فيها!'
						: 'الإفراط في الأملاح يضر الجذور ويسبب ذبول وموت النبات!'
				},
				{
					text: 'نمو النبتتين بنفس الشكل تماماً لأن النبات يحتاج الماء فقط دون أملاح',
					diagnosticFeedback: 'خطأ! النبات الأخضر يحتاج الأملاح المعدنية (الأزوت، الفوسفور، البوتاسيوم) لنمو سليم.'
				},
				{
					text: 'عدم تأثر النبتة إلا إذا غاب الهواء والتربة الطينية',
					diagnosticFeedback: 'غياب الأملاح أو الإفراط فيها يؤثر مباشرة في صحة النبات الأخضر.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `سقى تلميذ نبتة الأصيص (1) بماء معدني، وسقى نبتة الأصيص (2) بـ**${isDistilled ? 'الماء المقطر' : 'ماء مضاف إليه كمية مفرطة جداً من الأملاح'}** كما في الوثيقة المقابلة. كيف تفسّر نتيجة الأصيص (2)؟`,
			questionTextAr: `فسّر النتيجة الملاحظة في الأصيص (2).`,
			imageUrl,
			imageCaption: 'مقارنة نمو نبتتين حسب توفر الأملاح المعدنية',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يحتاج النبات الأخضر إلى الأملاح المعدنية (الأزوت، الفوسفور، البوتاسيوم) **بكمية معتدلة ومناسبة**؛ ولذلك حدث في الأصيص (2): **${correctAnswer}**.`
		};

		const hints: [string, string, string] = [
			'قارن حالة أوراق وسيقان النبتة في الأصيص (1) والأصيص (2).',
			isDistilled
				? 'تذكّر أن الماء المقطر خالٍ من الأملاح المعدنية.'
				: 'تذكّر أن الإفراط في الأملاح والأسمدة يحرق النبات ويذبله.',
			'اختر التفسير الذي يربط النتيجة بالتركيز الصحيح للأملاح.'
		];

		const solutionStepsAr = [
			'في الأصيص (1) نما النبات جيداً لتوفر الماء والأملاح المعدنية بكميات مناسبة.',
			`في الأصيص (2): **${correctAnswer}**.`,
			'الأملاح الأساسية الثلاثة هي: الأزوت، الفوسفور، والبوتاسيوم.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 2.5,
			instruction: `زرع تلميذ نبتتين متماثلتين في رمل مغسول ومعرض للضوء؛ سقى الأصيص (1) بماء معدني وسقى الأصيص (2) بـ*${isDistilled ? 'ماء مقطر' : 'محلول مفرط جداً بالأملاح المعدنية'}*. لاحظ الرسم وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) صف حالة النبتة في الأصيص (2)، ثم فسّر سبب هذه النتيجة علمياً.',
							answer: `1) *${correctAnswer}*.`,
							mark: '1'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تجربة الأملاح المعدنية'
						}
					]
				},
				{
					type: 'text',
					content: '2) اذكر *الأملاح المعدنية الثلاثة الأساسية* التي يحتاجها النبات الأخضر، وبيّن القاعدة الذهبية عند استعمالها في الفلاحة.',
					answer: '2) الأملاح الثلاثة هي: *الأزوت، الفوسفور، والبوتاسيوم*. القاعدة: يجب تقديمها للنبات *بكميات مناسبة ومعتدلة دون إفراط* لتجنب ذبوله وموته.',
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Vegetative Reproduction & Colored Water Path (2 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const vegetativeAndWaterPathTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t2_vegetative_and_water_path',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'التكاثر الخضري ومسار الماء في النبات الأخضر',
	curriculumLessonId: 'sci_lesson_4ap_t2_vegetative_reproduction',
	defaultPoints: 2,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const plants = [
			{ name: 'البطاطا', method: 'الدرنات', detail: 'تنمو من البراعم (العيون) على الدرنة' },
			{ name: 'النخيل', method: 'الفسائل', detail: 'فصل نبتة صغيرة بجوار النخلة الأم وغرسها' },
			{ name: 'البصل والثوم', method: 'الأبصال', detail: 'غرس البصلة أو الفصّ مباشرة في التربة' },
			{ name: 'الورد والعنب', method: 'الافتسال (العقل)', detail: 'غرس غصن يحتوي على براعم في تربة رطبة' }
		];
		const chosen = rng.pick(plants);
		const svg = buildVegetativeWaterSvg(chosen.name, chosen.method);
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t2_vegwater_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`يتكاثر بـ${chosen.method}، ويصعد الماء فيه من الجذور عبر الأوعية الناقلة في الساق إلى الأوراق`,
			[
				{
					text: `يتكاثر بالبذور فقط، ويمتص الماء عبر الأزهار ليهبط إلى الجذور`,
					diagnosticFeedback: 'خطأ في كلا المعلومتين! هذا النبات يتكاثر خضرياً، والماء يصعد من الجذور إلى الأعلى.'
				},
				{
					text: `يتكاثر بـ${plants.find((p) => p.method !== chosen.method)!.method}، ولا يحتوي ساقه على أوعية ناقلة`,
					diagnosticFeedback: `تأكد من طريقة التكاثر الخضري لنبات ${chosen.name}، وتذكر أن الساق يحوي أوعية ناقلة.`
				},
				{
					text: `يتكاثر بـ${chosen.method}، ويمتص الماء عبر أوراقه فقط دون الحاجة للجذور`,
					diagnosticFeedback: 'طريقة التكاثر صحيحة، لكن امتصاص الماء يتم أساساً عبر الجذور في التربة.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `بأي طريقة يتكاثر نبات **${chosen.name}** خضرياً (دون بذور)؟ وما المسار الصحيح للماء داخل النبات الأخضر كما تثبته تجربة الماء الملون؟`,
			questionTextAr: `حدّد طريقة تكاثر ${chosen.name} ومسار الماء في النبات.`,
			imageUrl,
			imageCaption: `التكاثر الخضري لنبات ${chosen.name} ومسار الماء الملون`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `يتكاثر **${chosen.name}** خضرياً بواسطة **${chosen.method}** (${chosen.detail})، ويُمتص الماء عبر **الجذور** ليصعد في **الأوعية الناقلة** بالساق إلى **الأوراق والزهور**.`
		};

		const hints: [string, string, string] = [
			`تذكّر كيف نزرع ${chosen.name} في الفلاحة دون بذور.`,
			'الماء يتحرك دائماً من الأسفل إلى الأعلى: الجذور ← الساق ← الأوراق.',
			'تجربة غصن الكرفس في الماء الملون تظهر تلون الأوعية الناقلة داخل الساق وعروق الأوراق.'
		];

		const solutionStepsAr = [
			`طريقة التكاثر الخضري لنبات ${chosen.name}: **${chosen.method}**.`,
			`مسار الماء في النبات: **الجذور ← الساق (الأوعية الناقلة) ← الأوراق والزهور**.`,
			`يطرح النبات بخار الماء الزائد عبر الأوراق في ظاهرة تسمى **النتح**.`
		];

		const sujetExercise: ExerciseBlock = {
			points: 2,
			instruction: 'أكمل الجدول الآتي حول التكاثر الخضري، ثم فسّر تجربة الماء الملون في السند المقابل:',
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'table',
							headers: ['النبات', 'نمط التكاثر الخضري'],
							cells: [],
							rows: [
								['البطاطا', { content: '..................', answer: 'الدرنات', mark: '0.25' }],
								['البصل والثوم', { content: '..................', answer: 'الأبصال', mark: '0.25' }],
								['النخيل', { content: '..................', answer: 'الفسائل', mark: '0.25' }],
								['الورد والعنب', { content: '..................', answer: 'الافتسال (العقل)', mark: '0.25' }]
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'التكاثر الخضري وتجربة الماء الملون'
						}
					]
				},
				{
					type: 'text',
					content: '2) وضعنا زهرة بيضاء بساقها في كأس به ماء ملون بالأحمر فتلونت بتلاتها بعد ساعات. فسّر سبب تلون البتلات واذكر مسار الماء في النبات.',
					answer: '2) صعد الماء الملون عبر *الأوعية الناقلة* داخل الساق حتى وصل إلى البتلات. مسار الماء هو: *الجذور ← الساق (الأوعية الناقلة) ← الأوراق والزهور*.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: `${chosen.method} — الجذور ← الساق ← الأوراق`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration Situation: School Garden Project (4 pts)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSchoolGardenTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_4ap_t2_integration_school_garden',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: مشروع حديقة المدرسة (عالم النبات)',
	curriculumLessonId: 'sci_lesson_4ap_t2_water_path_plant',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const schoolCity = rng.pick(['بسكرة', 'البليدة', 'عنابة', 'مستغانم']);
		const svg = svgBioFlowchart({
			title: 'خطوات إنجاح حديقة المدرسة الابتدائية',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: '1. إنتاش البذور', sublabel: 'بذور سليمة + ماء + دفء', color: '#d97706', bg: '#fffbeb' },
				{ label: '2. التكاثر الخضري', sublabel: 'درنات وأبصال وفسائل', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: '3. السقي والتسميد', sublabel: 'ماء وأملاح دون إفراط', color: '#0284c7', bg: '#f0f9ff' },
				{ label: '4. حديقة مزدهرة', sublabel: 'امتصاص وصعود الماء', color: '#16a34a', bg: '#f0fdf4' }
			]
		});
		const imageUrl = saveSciencesSvgAsset(`sci_4ap_t2_integ_garden_s${seed}`, svg);

		const correctChoice =
			'بذور فاصولياء سليمة في تربة رطبة ودافئة + درنات بطاطا بها براعم + سقي عند الجذور بأملاح معتدلة';

		const mcq = buildUniqueMcqOptions(
			correctChoice,
			[
				{
					text: 'بذور فاصولياء مسلوقة + قطع بطاطا بلا براعم + سقي بماء مقطر فقط',
					diagnosticFeedback: 'البذور المسلوقة والبطاطا بلا براعم لا تنمو، والماء المقطر خالٍ من الأملاح!'
				},
				{
					text: 'بذور سليمة في تربة جافة تماماً + إضافة كمية مفرطة جداً من الملح',
					diagnosticFeedback: 'الجفاف يمنع الإنتاش، والإفراط في الأملاح يقتل النبات.'
				},
				{
					text: 'رش الأوراق بالماء المقطر فقط دون سقي التربة عند الجذور',
					diagnosticFeedback: 'النبات يمتص الماء والأملاح من التربة بواسطة الجذور.'
				}
			],
			rng
		);

		const quizQuestion: SciencesGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `أطلق تلاميذ السنة الرابعة بمدرسة في ولاية **${schoolCity}** مشروع إنشاء حديقة مدرسية لغرس الفاصولياء والبطاطا والنرجس. أيّ خطة زراعية مما يلي تضمن نجاح المشروع علمياً؟`,
			questionTextAr: `ما الخطة العلمية الصحيحة لإنجاح حديقة المدرسة؟`,
			imageUrl,
			imageCaption: 'مراحل إنشاء ورعاية حديقة المدرسة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `لنجاح الحديقة نحتاج بذوراً سليمة مع الماء والحرارة والهواء، ودرنات بها براعم للتكاثر الخضري، وسقياً عند الجذور بماء يحتوي على أملاح معدنية معتدلة.`
		};

		const hints: [string, string, string] = [
			'تحقق من شروط إنتاش بذرة الفاصولياء (سليمة، ماء، حرارة مناسبة، هواء).',
			'تحقق من شرط التكاثر الخضري للبطاطا (وجود البراعم/العيون على الدرنة).',
			'تذكّر أن الجذور تمتص الماء والأملاح المعدنية بكميات معتدلة دون إفراط.'
		];

		const solutionStepsAr = [
			'الإنتاش يتطلب بذوراً سليمة ورطوبة وحرارة مناسبة وهواءً.',
			'تكاثر البطاطا يكون بالدرنات الحاملة للبراعم، والنرجس بالأبصال.',
			'يسقى النبات عند الجذور بماء وأملاح معدنية معتدلة لتصعد عبر الساق إلى الأوراق.'
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			instruction: `قرّر تلاميذ قسم السنة الرابعة بولاية ${schoolCity} تزيين حديقة مدرستهم بزرع بذور الفاصولياء وغرس درنات البطاطا وأبصال البصل. غير أن فوجاً منهم غرس قطع بطاطا خالية من العيون، وترك تربة الفاصولياء جافة، بينما أفرط فوج آخر في إضافة السماد المعدني فذبلت نباتاته. استعن بالسند وأجب:`,
			content: [
				{
					type: 'columns',
					widths: ['1.25fr', '1.25fr'],
					children: [
						{
							type: 'text',
							content: '1) لماذا لم تنتش بذور الفاصولياء ولم تنمُ قطع البطاطا في الفوج الأول؟',
							answer: '1) لم تنتش بذور الفاصولياء لغياب *الماء (الرطوبة)*، ولم تنمُ قطع البطاطا لأنها خالية من *البراعم (العيون)* الضرورية للتكاثر الخضري بالدرنات.',
							mark: '1.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'السند: خطوات إنجاح حديقة المدرسة'
						}
					]
				},
				{
					type: 'text',
					content: '2) فسّر سبب ذبول نباتات الفوج الثاني، واذكر أين يجب توجيه ماء السقي وكيف ينتقل داخل النبتة.',
					answer: '2) ذبلت النباتات بسبب *الإفراط في الأملاح المعدنية (السماد)*. يجب سقي التربة عند *الجذور* لأنها تمتص الماء والأملاح، ثم يصعدان عبر *الأوعية الناقلة في الساق* إلى الأوراق.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) صنّف طرق التكاثر المستعملة في الحديقة (الفاصولياء، البطاطا، البصل) إلى تكاثر بالبذور وتكاثر خضري.',
					answer: '3) *الفاصولياء*: تكاثر بالبذور. *البطاطا*: تكاثر خضري بالدرنات. *البصل*: تكاثر خضري بالأبصال.',
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer: correctChoice
		};
	}
};

export const SCIENCES_TEMPLATES_4AP_T2: SciencesParameterizedTemplate[] = [
	seedAnatomyGerminationTemplate,
	germinationConditionsTemplate,
	mineralSaltsExperimentTemplate,
	vegetativeAndWaterPathTemplate,
	integrationSchoolGardenTemplate
];
