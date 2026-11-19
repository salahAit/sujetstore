import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 47;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 97 + salt) >>> 0) || 1);
}

const KIDS = ['أمين', 'سارة', 'آدم', 'مريم', 'رائد', 'إيمان', 'وسيم', 'لينا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Food Groups & Healthy Ration
// ═══════════════════════════════════════════════════════════════════════════════
const foodGroupsClassifyTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t1_food_groups_classify',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'المجموعات الغذائية والراتب الغذائي المتوازن',
	curriculumLessonId: 'sci_lesson_3ap_t1_food_groups_ration',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 701);
		const foods = [
			{ item: 'السمك والدجاج والبيض', group: 'مجموعة اللحوم والأسماك والبيض (البناء والنمو)', role: 'أغذية البناء' },
			{ item: 'الحليب والجبن والياغورت', group: 'مجموعة الحليب ومشتقاته (تقوية العظام)', role: 'أغذية البناء' },
			{ item: 'الجزر والطماطم والتفاح والبرتقال', group: 'مجموعة الخضر والفواكه (الوقاية والفيتامينات)', role: 'أغذية الوقاية' },
			{ item: 'الخبز والكسكس والأرز', group: 'مجموعة الحبوب والعجائن (الطاقة والنشاط)', role: 'أغذية الطاقة' },
			{ item: 'زيت الزيتون والزبدة', group: 'مجموعة الدهون والزيوت (طاقة بكمية معتدلة)', role: 'أغذية الطاقة' }
		] as const;

		const target = rng.pick(foods);
		const others = rng.pickDistinct(
			foods.filter((f) => f.group !== target.group),
			3
		);

		const mcq = buildUniqueMcqOptions(
			target.group,
			others.map((o) => ({
				text: o.group,
				diagnosticFeedback: `انتبه: ${o.item} هي التي تنتمي إلى ${o.group}.`
			})),
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('balanced_diet', {
			title: 'المجموعات الغذائية الأساسية في الراتب الصحي'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t1_food_groups_classify_${difficulty}_s${seed}`, svg);

		const qText = `إلى أي مجموعة غذائية ينتمي كلٌّ من: **${target.item}**؟`;

		const tableItems = rng.shuffle([target, ...others.slice(0, 2)]);
		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجواب: ........................................`,
						answer: target.group,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'وظائف المجموعات الغذائية'
					}
				]
			},
			{
				type: 'table',
				headers: ['الأغذية', 'المجموعة الغذائية', 'الدور (بناء / طاقة / وقاية)'],
				cells: [],
				rows: tableItems.map((f) => [
					f.item,
					{ content: '....................', answer: f.group, mark: '0.25' },
					{ content: '....................', answer: f.role, mark: '0.25' }
				])
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t1_food_groups_classify',
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'nutrition_digestion',
			titleAr: 'المجموعات الغذائية والراتب الغذائي المتوازن',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'المجموعات الغذائية الأساسية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ينتمي (${target.item}) إلى ${target.group}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'صنّف الأغذية التالية في مجموعاتها الغذائية المناسبة:',
				content
			},
			hints: [
				'تذكر المجموعات الست: اللحوم والبيض، الحليب ومشتقاته، الخضر والفواكه، الحبوب والعجائن، الدهون، والماء.',
				'اللحوم والحليب للبناء، الحبوب والدهون للطاقة، والخضر والفواكه للوقاية.',
				`الإجابة: ${target.group}.`
			],
			solutionStepsAr: [
				`الأغذية المعطاة: ${target.item}.`,
				`تصنيفها: ${target.group}.`
			],
			finalAnswer: target.group
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Malnutrition Diagnosis
// ═══════════════════════════════════════════════════════════════════════════════
const malnutritionDiagnosisTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t1_malnutrition_diagnosis',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'تشخيص حالات سوء التغذية والوقاية منها',
	curriculumLessonId: 'sci_lesson_3ap_t1_malnutrition_risks',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 702);
		const kid = rng.pick(KIDS);
		const cases = [
			{
				habit: `يكثر ${kid} من الوجبات السريعة والبطاطا المقلية والمشروبات الغازية ولا يمارس الرياضة`,
				disease: 'السمنة (سوء تغذية بالإفراط)',
				advice: 'التقليل من السكريات والدهون، تنويع الأغذية، وممارسة الرياضة بانتظام',
				col: '#dc2626',
				bg: '#fef2f2'
			},
			{
				habit: `يأكل ${kid} كميات قليلة جداً ويهمل اللحوم والعدس والخضر والفواكه فأصبح نحيلاً وشاحباً`,
				disease: 'الهزال وفقر الدم (سوء تغذية بالتفريط)',
				advice: 'تناول وجبات كاملة ومتوازنة غنية باللحوم والبقول والخضر والفواكه',
				col: '#d97706',
				bg: '#fffbeb'
			},
			{
				habit: `يتناول ${kid} الحلويات والشوكولاطة باستمرار وينام دون تنظيف أسنانه`,
				disease: 'تسوس الأسنان وآلام الضرس',
				advice: 'تنظيف الأسنان بالفرشاة والمعجون بعد كل وجبة والتقليل من السكريات',
				col: '#7c3aed',
				bg: '#f5f3ff'
			}
		] as const;

		const c = rng.pick(cases);
		const others = cases.filter((x) => x.disease !== c.disease);

		const mcq = buildUniqueMcqOptions(
			c.disease,
			[
				...others.map((o) => ({
					text: o.disease,
					diagnosticFeedback: `راجع الأعراض والسلوك الغذائي: هذا السلوك يؤدي إلى ${c.disease}.`
				})),
				{
					text: 'نمو صحي سليم وقوة عضلية ممتازة',
					diagnosticFeedback: 'هذا سلوك غذائي غير صحي يؤدي إلى أمراض سوء التغذية.'
				}
			],
			rng
		);

		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="${c.bg}" stroke="${c.col}" stroke-width="1.8"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="${c.col}">بطاقة الفحص الطبي المدرسي</text>` +
				`<rect x="24" y="46" width="372" height="72" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="86" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(c.habit)}</text>` +
				`<text x="210" y="152" text-anchor="middle" font-size="11.2" font-weight="bold" fill="${c.col}">ما المرض المتوقع وما النصيحة المناسبة؟</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t1_malnutrition_diagnosis_${difficulty}_s${seed}`, svg);

		const qText = `${c.habit}. ما مرض سوء التغذية الذي يهدد صحة ${kid}؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: 'حالة سوء تغذية للفحص والتشخيص'
			},
			{
				type: 'text',
				content: `1) حدّد مرض سوء التغذية الذي يهدد ${kid}، واذكر سببه (إفراط أم تفريط).`,
				answer: `${c.disease}.`,
				mark: '1.25'
			},
			{
				type: 'text',
				content: `2) قدّم نصيحتين صحيتين لمساعدة ${kid} على استعادة صحته.`,
				answer: c.advice,
				mark: '1.25'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t1_malnutrition_diagnosis',
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'nutrition_digestion',
			titleAr: 'تشخيص حالات سوء التغذية والوقاية منها',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'تشخيص سوء التغذية',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `ينتج عن هذا السلوك ${c.disease}، والحل هو: ${c.advice}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'اقرأ بطاقة الفحص الطبي ثم أجب عن السؤالين:',
				content
			},
			hints: [
				'الإفراط في الدهون والسكريات يسبب السمنة والتسوس.',
				'التفريط ونقص الأغذية الأساسية يسببان الهزال وفقر الدم.',
				`التشخيص الصحيح: ${c.disease}.`
			],
			solutionStepsAr: [
				`نحلل العادة الغذائية لـ ${kid}.`,
				`المرض المتوقع: ${c.disease}.`,
				`النصيحة: ${c.advice}.`
			],
			finalAnswer: c.disease
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Blood Circulation & Pulse Activity
// ═══════════════════════════════════════════════════════════════════════════════
const bloodPulseActivityTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t1_blood_pulse_activity',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'النبض ودوران الدم والجهد العضلي',
	curriculumLessonId: 'sci_lesson_3ap_t1_pulse_blood_circulation',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 703);
		const kid = rng.pick(KIDS);
		const restBeats = rng.int(72, 82);
		const effortBeats = restBeats + rng.int(38, 52);
		const askNumber = difficulty !== 'easy' && seed % 2 === 0;

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دقات قلب ${esc(kid)} ودوران الدم</text>` +
				`<rect x="224" y="48" width="174" height="118" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
				`<text x="311" y="74" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">أثناء الراحة</text>` +
				`<text x="311" y="108" text-anchor="middle" font-size="18" font-weight="bold" fill="#2563eb">${restBeats}</text>` +
				`<text x="311" y="132" text-anchor="middle" font-size="10.2" fill="#334155">دقة في الدقيقة</text>` +
				`<text x="311" y="152" text-anchor="middle" font-size="9.5" fill="#1d4ed8">تساوي عدد النبضات بالمعصم</text>` +
				`<rect x="22" y="48" width="174" height="118" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
				`<text x="109" y="74" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">بعد الجري السريع</text>` +
				`<text x="109" y="108" text-anchor="middle" font-size="18" font-weight="bold" fill="#dc2626">${effortBeats}</text>` +
				`<text x="109" y="132" text-anchor="middle" font-size="10.2" fill="#334155">دقة في الدقيقة</text>` +
				`<text x="109" y="152" text-anchor="middle" font-size="9.5" fill="#dc2626">زيادة ضخ الدم للعضلات</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t1_blood_pulse_activity_${difficulty}_s${seed}`, svg);

		const correctText = askNumber
			? `${restBeats} نبضة (يساوي تماماً عدد دقات القلب)`
			: 'القلب يضخ الدم باستمرار في الأوعية الدموية ليزوّد الأعضاء بالغذاء والهواء';

		const distractors = askNumber
			? [
					{ text: `${Math.round(restBeats / 2)} نبضة (نصف دقات القلب)`, diagnosticFeedback: 'عدد النبضات في المعصم يساوي تماماً عدد دقات القلب في الدقيقة.' },
					{ text: `${restBeats * 2} نبضة (ضعف دقات القلب)`, diagnosticFeedback: 'كل دقة قلب واحدة تقابلها نبضة واحدة فقط.' },
					{ text: '0 نبضة أثناء الراحة', diagnosticFeedback: 'القلب لا يتوقف عن النبض أبداً حتى في الراحة.' }
				]
			: [
					{ text: 'يتوقف دوران الدم عند الجلوس والراحة', diagnosticFeedback: 'يدور الدم باستمرار ليلاً ونهاراً دون توقف.' },
					{ text: 'المعدة هي المضخة التي تدفع الدم في العروق', diagnosticFeedback: 'القلب هو المضخة التي تدفع الدم، أما المعدة فللهضم.' },
					{ text: 'ينخفض عدد دقات القلب كلما زاد الجهد العضلي', diagnosticFeedback: `لاحظ ارتفاع الدقات من ${restBeats} إلى ${effortBeats} بعد الجري.` }
				];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askNumber
			? `دقّ قلب ${kid} أثناء الراحة **${restBeats} مرة** في الدقيقة. كم عدد النبضات التي سيتحسسها في معصمه خلال نفس الدقيقة؟`
			: `ما العبارة العلمية الصحيحة حول دوران الدم ودور القلب في جسم الإنسان؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) إذا دقّ قلب ${kid} أثناء الراحة ${restBeats} مرة في الدقيقة، فكم نبضة سيسجلها في معصمه؟ علّل إجابتك.`,
						answer: `${restBeats} نبضة في الدقيقة؛ لأن كل دقة قلب تقابلها نبضة دموية في الأوعية الدموية.`,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `مقارنة دقات قلب ${kid}`
					}
				]
			},
			{
				type: 'text',
				content: `2) ارتفعت دقات قلب ${kid} إلى ${effortBeats} بعد الجري. فسّر سبب هذا الارتفاع وما دور الدم في الجسم.`,
				answer: 'لأن العضلات أثناء الجري تحتاج كمية أكبر من الغذاء والهواء، فيضخ القلب الدم أسرع عبر الأوعية الدموية لتزويدها بها.',
				mark: '1.5'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t1_blood_pulse_activity',
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'النبض ودوران الدم والجهد العضلي',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'دقات القلب في الراحة وبعد الجري',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `القلب مضخة تدفع الدم باستمرار عبر الأوعية الدموية، وعدد النبضات في المعصم يساوي عدد دقات القلب (${restBeats} في الراحة و${effortBeats} بعد الجري).`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لاحظ معطيات الرسم ثم أجب عن السؤالين:',
				content
			},
			hints: [
				'القلب مضخة تدفع الدم في الأوعية الدموية باستمرار.',
				'كل دقة قلب = نبضة واحدة في المعصم أو الرقبة.',
				`الإجابة: ${correctText}.`
			],
			solutionStepsAr: [
				`دقات القلب في الراحة: ${restBeats} ← عدد النبضات = ${restBeats}.`,
				`عند الجري ترتفع إلى ${effortBeats} لتلبية حاجة العضلات للغذاء والأكسجين.`
			],
			finalAnswer: askNumber ? `${restBeats} نبضة` : 'القلب يضخ الدم باستمرار عبر الأوعية الدموية'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Animal Teeth & Diet Classification
// ═══════════════════════════════════════════════════════════════════════════════
const teethDietMatchTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t1_teeth_diet_match',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'ecology_environment',
	titleAr: 'تصنيف الحيوانات حسب نظامها الغذائي وشكل أسنانها',
	curriculumLessonId: 'sci_lesson_3ap_t1_animal_diets_teeth',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 704);
		const animals = [
			{
				name: 'الأسد',
				teethDesc: 'أنياب طويلة وحادة وأضراس مسننة كالمنشار',
				diet: 'حيوان لاحم (آكل لحوم)',
				toothRole: 'الأنياب لتمزيق اللحم'
			},
			{
				name: 'الخروف',
				teethDesc: 'قواطع أمامية وأضراس عريضة مسطحة مع غياب الأنياب',
				diet: 'حيوان عاشب (آكل أعشاب)',
				toothRole: 'الأضراس العريضة لطحن العشب'
			},
			{
				name: 'الدب',
				teethDesc: 'نظام أسنان كامل (قواطع وأنياب متوسطة وأضراس مستديرة)',
				diet: 'حيوان قارت (آكل لكل شيء)',
				toothRole: 'تناسب الأغذية النباتية والحيوانية معاً'
			}
		] as const;

		const target = rng.pick(animals);
		const mcq = buildUniqueMcqOptions(
			target.diet,
			[
				...animals
					.filter((a) => a.diet !== target.diet)
					.map((o) => ({
						text: o.diet,
						diagnosticFeedback: `تذكّر: ${o.diet} يتميز بـ (${o.teethDesc}).`
					})),
				{ text: 'حيوان لا يملك أسناناً ولا يتغذى', diagnosticFeedback: 'شكل الأسنان المذكور يدل بوضوح على نوع غذاء الحيوان.' }
			],
			rng
		);

		const svg = svgPlantAndPrimaryDiagram('teeth_types', {
			title: 'أنواع الأسنان وعلاقتها بالنظام الغذائي للحيوان'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t1_teeth_diet_match_${difficulty}_s${seed}`, svg);

		const qText = `لاحظنا في جمجمة **${target.name}** أن له: **${target.teethDesc}**. ما نظامه الغذائي؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجواب: ....................`,
						answer: `${target.diet} (${target.toothRole}).`,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'أنواع الأسنان الثلاثة ووظائفها'
					}
				]
			},
			{
				type: 'table',
				headers: ['نوع السن', 'الوظيفة الأساسية', 'الحيوانات التي تتطور عندها'],
				cells: [],
				rows: [
					['القواطع', { content: '....................', answer: 'قطع وقضم الغذاء', mark: '0.25' }, { content: '....................', answer: 'العواشب والقوارض', mark: '0.25' }],
					['الأنياب', { content: '....................', answer: 'تمزيق اللحوم', mark: '0.25' }, { content: '....................', answer: 'اللواحم (الأسد والذئب)', mark: '0.25' }],
					['الأضراس المسطحة', { content: '....................', answer: 'طحن وسحق الأعشاب', mark: '0.25' }, { content: '....................', answer: 'العواشب (الخروف والبقرة)', mark: '0.25' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t1_teeth_diet_match',
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'تصنيف الحيوانات حسب نظامها الغذائي وشكل أسنانها',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'الأسنان والنظام الغذائي',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `أسنان ${target.name} (${target.teethDesc}) تتكيف مع نظامه الغذائي: ${target.diet}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أجب عن السؤال ثم أكمل جدول أنواع الأسنان ووظائفها:',
				content
			},
			hints: [
				'الأنياب الحادة الطويلة تدل على حيوان لاحم.',
				'غياب الأنياب والأضراس العريضة المسطحة تدل على حيوان عاشب.',
				`نظام ${target.name} الغذائي هو: ${target.diet}.`
			],
			solutionStepsAr: [
				`وصف أسنان ${target.name}: ${target.teethDesc}.`,
				`النظام الغذائي المستنتج: ${target.diet}.`
			],
			finalAnswer: target.diet
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: Sports & Health Camp
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHealthCampTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3ap_t1_integration_health_camp',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: التغذية والنشاط الرياضي عند الطفل',
	curriculumLessonId: 'sci_lesson_3ap_t1_malnutrition_risks',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 705);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">تقرير طبي رياضي للطفل ${esc(kid)}</text>` +
				`<rect x="298" y="48" width="122" height="118" rx="9" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="359" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#991b1b">قبل النصائح</text>` +
				`<text x="359" y="102" text-anchor="middle" font-size="9.8" fill="#334155">وجبات سريعة وسكريات</text>` +
				`<text x="359" y="124" text-anchor="middle" font-size="9.8" fill="#dc2626">تعب سريع وزيادة وزن</text>` +
				`<rect x="159" y="48" width="122" height="118" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="220" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#1e3a8a">دوران الدم والنبض</text>` +
				`<text x="220" y="102" text-anchor="middle" font-size="9.8" fill="#334155">راحة: 76 نبضة/دقيقة</text>` +
				`<text x="220" y="124" text-anchor="middle" font-size="9.8" fill="#1d4ed8">جري: 124 نبضة/دقيقة</text>` +
				`<rect x="20" y="48" width="122" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="81" y="74" text-anchor="middle" font-size="11.2" font-weight="bold" fill="#166534">الراتب المتوازن</text>` +
				`<text x="81" y="102" text-anchor="middle" font-size="9.8" fill="#334155">خضر، فواكه، لحوم</text>` +
				`<text x="81" y="124" text-anchor="middle" font-size="9.8" fill="#15803d">حبوب، حليب، ماء</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_3ap_t1_integration_health_camp_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'يتبع راتباً غذائياً متوازناً يضم المجموعات الأساسية ويمارس الرياضة لتقوية قلبه والوقاية من السمنة',
			[
				{ text: 'يمتنع عن شرب الماء وعن أكل الخضر والفواكه تماماً', diagnosticFeedback: 'الماء والخضر والفواكه أساسية للوقاية وتوازن الراتب.' },
				{ text: 'يتوقف عن الحركة نهائياً حتى لا يرتفع نبض قلبه', diagnosticFeedback: 'ارتفاع النبض أثناء الرياضة طبيعي ويقوّي عضلة القلب.' },
				{ text: 'يكتفي بالحلويات لأنها تعطي طاقة كافية للنمو', diagnosticFeedback: 'الحلويات تسبب السمنة وتسوس الأسنان ولا تبني الجسم.' }
			],
			rng
		);

		const qText = `أراد ${kid} تحسين لياقته البدنية بعد أن عانى من زيادة الوزن والتعب السريع. ما البرنامج الصحي الصحيح الذي يجمع بين التغذية والنشاط؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `التقرير الطبي الرياضي لـ ${kid}`
			},
			{
				type: 'text',
				content: `1) ما الخطر الصحي الذي كان يهدد ${kid} بسبب إفراطه في الوجبات السريعة والسكريات وقلة الحركة؟`,
				answer: 'السمنة والتعب السريع وتسوس الأسنان (سوء التغذية بالإفراط).',
				mark: '0.75'
			},
			{
				type: 'text',
				content: `2) اقترح على ${kid} وجبة غداء صحية تضم عناصر من المجموعات الغذائية الأساسية (البناء، الطاقة، الوقاية، والماء).`,
				answer: 'سلطة خضر + طبق كسكس أو أرز مع سمك أو دجاج + علبة ياغورت + فاكهة + ماء نقي.',
				mark: '1'
			},
			{
				type: 'text',
				content: `3) عند الجري ارتفع نبض ${kid} من 76 إلى 124 نبضة في الدقيقة. ما العضو المسؤول عن ضخ الدم، ولماذا ارتفع النبض؟`,
				answer: 'القلب هو الذي يضخ الدم، وارتفع النبض لتزويد العضلات بالغذاء والهواء (الأكسجين) أثناء الجري.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_3ap_t1_integration_health_camp',
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وضعية إدماجية: التغذية والنشاط الرياضي عند الطفل',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'التغذية والرياضة وصحة القلب',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'للوقاية من السمنة والحفاظ على صحة القلب، نلتزم براتب غذائي متوازن يضم المجموعات الغذائية الأساسية مع ممارسة الرياضة بانتظام.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوضعية الإدماجية',
				instruction: `استعن بالتقرير الطبي الرياضي للطفل ${kid} ثم أجب عن التعليمات التالية:`,
				content
			},
			hints: [
				'الإفراط في السكريات والدهون مع قلة الحركة يسبب السمنة.',
				'الوجبة المتوازنة تشمل خضراً وفواكه ولحوماً/بيضاً وحبوباً وحليباً وماءً.',
				'القلب يضخ الدم أسرع عند الجري لتزويد العضلات بالغذاء والأكسجين.'
			],
			solutionStepsAr: [
				'الخطر الصحي: السمنة وتسوس الأسنان.',
				'الوجبة المتوازنة تجمع أغذية البناء والطاقة والوقاية والماء.',
				'القلب يضخ الدم عبر الأوعية الدموية ويزداد النبض عند الجري لتغذية العضلات.'
			],
			finalAnswer: 'السمنة — وجبة متوازنة — القلب يضخ الدم لتزويد العضلات'
		};
	}
};

export const SCIENCES_TEMPLATES_3AP_T1: SciencesParameterizedTemplate[] = [
	foodGroupsClassifyTemplate,
	malnutritionDiagnosisTemplate,
	bloodPulseActivityTemplate,
	teethDietMatchTemplate,
	integrationHealthCampTemplate
];
