import type {
	Difficulty,
	HistoryGeneratedExerciseInstance,
	HistoryParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildHistoricalDocumentBlock, buildHistoryTableBlock } from '../../history-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين — السنة الرابعة ابتدائي — التاريخ والجغرافيا — الفصل الثاني
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): الفتح الإسلامي لبلاد المغرب
// ───────────────────────────────────────────────────────────────────────────────
const tplHistIslamicConquest: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t2_hist_islamic_conquest',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'hist_islamic',
	titleAr: 'التاريخ: الفتح الإسلامي لبلاد المغرب وبناء القيروان',
	curriculumLessonId: 'his_lesson_4ap_t2_islamic_conquest_maghrib',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const orderedSteps = [
			'بداية الحملات الاستطلاعية الأولى (27هـ)',
			'تأسيس مدينة القيروان على يد عقبة بن نافع رحمه الله (50هـ)',
			'تحرير قرطاج على يد حسان بن النعمان (79هـ)',
			'استقرار الفتح وعبور طارق بن زياد وموسى بن نصير للأندلس (92هـ)'
		];

		const variants = [
			{
				label: 'قادة الفتح الإسلامي ومراحله',
				docText:
					'انطلقت فتوحات بلاد المغرب لنشر دين الإسلام وتخليص السكان من الظلم البيزنطي، فبنى عقبة بن نافع رحمه الله مدينة القيروان سنة 50هـ، وأتمّ حسان بن النعمان وموسى بن نصير توطيد الأمن والفتح.',
				tableRows: [
					[{ label: 'عقبة بن نافع رحمه الله' }, { answer: 'بنى مدينة القيروان سنة 50هـ', mark: '0.75' }],
					[{ label: 'حسان بن النعمان' }, { answer: 'حرر قرطاج ونظّم الإدارة والدواوين', mark: '0.75' }],
					[{ label: 'موسى بن نصير وطارق بن زياد' }, { answer: 'أتمّا الفتح وفتحا بلاد الأندلس سنة 92هـ', mark: '0.75' }],
					[{ label: 'التحول الديني والثقافي في المغرب' }, { answer: 'اعتناق الإسلام وتعلم اللغة العربية', mark: '0.75' }]
				],
				q2: '2) لماذا أسس عقبة بن نافع رحمه الله مدينة القيروان سنة 50هـ؟',
				a2: '2) لتكون قاعدة ثابتة لجيوش الفتح ومنارة لتعليم القرآن الكريم واللغة العربية.'
			},
			{
				label: 'دوافع الفتح الإسلامي ونتائجه الحضارية',
				docText:
					'أقبل سكان بلاد المغرب على الإسلام لما رأوا فيه من عدل وتوحيد ومساواة، فتعلّموا القرآن الكريم واللغة العربية، وشاركوا في بناء الحضارة الإسلامية في شمال إفريقيا والأندلس.',
				tableRows: [
					[{ label: 'السبب الديني للفتح الإسلامي' }, { answer: 'نشر التوحيد والإسلام والعدل', mark: '0.75' }],
					[{ label: 'القوة المحتلة التي حُرّرت منها البلاد' }, { answer: 'الدولة البيزنطية', mark: '0.75' }],
					[{ label: 'العاصمة الإسلامية الأولى بالمغرب' }, { answer: 'القيروان (50هـ)', mark: '0.75' }],
					[{ label: 'نتيجة اجتماعية بارزة للفتح' }, { answer: 'التآخي بين الفاتحين وسكان المغرب', mark: '0.75' }]
				],
				q2: '2) اذكر نتيجتين حضاريتين للفتح الإسلامي في بلاد المغرب والجزائر.',
				a2: '2) انتشار الإسلام والعقيدة الصحيحة، وتعلّم اللغة العربية وبناء المساجد والمدن العلمية.'
			},
			{
				label: 'الفتح الإسلامي وجسر العبور إلى الأندلس',
				docText:
					'بعد أن استقر الإسلام في بلاد المغرب بفضل جهود القادة الفاتحين واستجابة السكان، انطلقت راية الفتح من المغرب إلى الأندلس سنة 92هـ بقيادة طارق بن زياد وموسى بن نصير.',
				tableRows: [
					[{ label: 'سنة تأسيس مدينة القيروان' }, { answer: 'سنة 50 هجرية', mark: '0.75' }],
					[{ label: 'القائد الذي فتح قرطاج' }, { answer: 'حسان بن النعمان', mark: '0.75' }],
					[{ label: 'سنة عبور المسلمين إلى الأندلس' }, { answer: 'سنة 92 هجرية', mark: '0.75' }],
					[{ label: 'الأثر اللغوي والعقدي للفتح' }, { answer: 'تعريب اللسان وترسيخ التوحيد', mark: '0.75' }]
				],
				q2: '2) كيف قابل سكان بلاد المغرب الإسلام بعد أن عرفوا سماحته وعدله؟',
				a2: '2) أقبلوا على اعتناق الإسلام بمحبة وقناعة، وأسهموا في نشره والدفاع عنه في المغرب والأندلس.'
			}
		];

		const v = rng.pick(variants);
		const indexed = orderedSteps.map((label, rank) => ({ label, rank }));
		const shuffled = rng.shuffle(indexed);
		if (shuffled.every((e, i) => e.rank === i)) {
			[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
		}
		const items = shuffled.map((e) => e.label);
		const correctOrder = orderedSteps.map((_, rank) => shuffled.findIndex((e) => e.rank === rank));

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'اقرأ السند التاريخي الآتي حول الفتح الإسلامي لبلاد المغرب ثم أجب:',
			content: [
				buildHistoricalDocumentBlock({
					title: 'سند تاريخي: الفتح الإسلامي لبلاد المغرب',
					text: v.docText
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بالمعطيات التاريخية الصحيحة:' },
				buildHistoryTableBlock(['القائد أو العنصر', 'الدور أو الدلالة التاريخية'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'hist_islamic',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'ordering',
				questionText: 'رتّب مراحل الفتح الإسلامي لبلاد المغرب والأندلس من الأقدم إلى الأحدث:',
				questionTextAr: 'رتّب مراحل الفتح الإسلامي زمنيا:',
				questionData: {
					items,
					correctOrder
				},
				explanation: `الترتيب الزمني الصحيح: ${orderedSteps.join(' ← ')}.`
			},
			sujetExercise,
			hints: [
				'أسس عقبة بن نافع رحمه الله مدينة القيروان سنة 50هـ.',
				'حرر حسان بن النعمان قرطاج سنة 79هـ ونظم الإدارة.',
				'تم فتح الأندلس سنة 92هـ بقيادة طارق بن زياد وموسى بن نصير.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: orderedSteps.join(' ← ')
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): الدول الإسلامية المستقلة بالجزائر
// ───────────────────────────────────────────────────────────────────────────────
const tplHistIndependentStates: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t2_hist_independent_states',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'hist_islamic',
	titleAr: 'التاريخ: الدول الإسلامية المستقلة بالجزائر (الرستمية، الحمادية، الزيانية)',
	curriculumLessonId: 'his_lesson_4ap_t2_independent_islamic_states',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'عواصم الدول الإسلامية ومؤسسوها',
				tableRows: [
					[{ label: 'الدولة الرستمية (160هـ / 777م)' }, { content: '................', answer: 'عبد الرحمن بن رستم', mark: '0.5' }, { content: '................', answer: 'تيهرت (تيارت)', mark: '0.5' }],
					[{ label: 'الدولة الحمادية (405هـ / 1014م)' }, { content: '................', answer: 'حماد بن بلكين', mark: '0.5' }, { content: '................', answer: 'قلعة بني حماد ثم بجاية', mark: '0.5' }],
					[{ label: 'الدولة الزيانية (633هـ / 1236م)' }, { content: '................', answer: 'يغمراسن بن زيان', mark: '0.5' }, { content: '................', answer: 'تلمسان', mark: '0.5' }]
				],
				q2: '2) اذكر مظهرين من مظاهر الازدهار العلمي والعمراني في بجاية وتلمسان في تلك الحقبة.',
				a2: '2) بناء المساجد والمدارس كمسجد سيدي بومدين وقصور قلعة بني حماد، واستقطاب كبار العلماء والرحالة وتنشيط التجارة.',
				pairs: [
					{ left: 'الدولة الرستمية', right: 'تيهرت — عبد الرحمن بن رستم' },
					{ left: 'الدولة الحمادية', right: 'قلعة بني حماد وبجاية — حماد بن بلكين' },
					{ left: 'الدولة الزيانية', right: 'تلمسان — يغمراسن بن زيان' },
					{ left: 'القيروان', right: 'عقبة بن نافع رحمه الله (50هـ)' }
				]
			},
			{
				label: 'الإشعاع الحضاري لتيهرت والقلعة وتلمسان',
				tableRows: [
					[{ label: 'أول دولة إسلامية مستقلة بالجزائر' }, { content: '................', answer: 'الدولة الرستمية', mark: '0.5' }, { content: '................', answer: 'تيهرت', mark: '0.5' }],
					[{ label: 'دولة أسسها حماد بن بلكين بالمسيلة' }, { content: '................', answer: 'الدولة الحمادية', mark: '0.5' }, { content: '................', answer: 'القلعة ثم بجاية', mark: '0.5' }],
					[{ label: 'دولة دامت ثلاثة قرون في الغرب الجزائري' }, { content: '................', answer: 'الدولة الزيانية', mark: '0.5' }, { content: '................', answer: 'تلمسان', mark: '0.5' }]
				],
				q2: '2) بمَ اشتُهرت مدينة تيهرت في عهد الدولة الرستمية، وبمَ لُقّبت مدينة بجاية؟',
				a2: '2) اشتُهرت تيهرت بالعلم والتجارة والتسامح، ولُقّبت بجاية بالناصرية وبمكة الصغرى لكثرة علمائها.',
				pairs: [
					{ left: 'تيهرت (تيارت)', right: 'عاصمة الدولة الرستمية' },
					{ left: 'بجاية (الناصرية)', right: 'العاصمة الساحلية للحماديين' },
					{ left: 'تلمسان', right: 'عاصمة الدولة الزيانية' },
					{ left: 'قلعة بني حماد', right: 'ولاية المسيلة' }
				]
			},
			{
				label: 'المقارنة بين الدول الثلاث ومعالمها',
				tableRows: [
					[{ label: 'تأسيس تيهرت عام 160هـ' }, { content: '................', answer: 'عبد الرحمن بن رستم', mark: '0.5' }, { content: '................', answer: 'الدولة الرستمية', mark: '0.5' }],
					[{ label: 'بناء قلعة بني حماد وتوسيع بجاية' }, { content: '................', answer: 'حماد بن بلكين', mark: '0.5' }, { content: '................', answer: 'الدولة الحمادية', mark: '0.5' }],
					[{ label: 'بناء المشور ومساجد تلمسان' }, { content: '................', answer: 'يغمراسن بن زيان', mark: '0.5' }, { content: '................', answer: 'الدولة الزيانية', mark: '0.5' }]
				],
				q2: '2) ما الدور الذي أدّته هذه الدول الإسلامية في الحفاظ على وحدة الجزائر وهويتها؟',
				a2: '2) رسّخت الإسلام واللغة العربية وأنشأت مدنا وموانئ علمية وتجارية ربطت الجزائر بالعالم الإسلامي.',
				pairs: [
					{ left: 'عبد الرحمن بن رستم', right: 'تيهرت (160هـ)' },
					{ left: 'حماد بن بلكين', right: 'قلعة بني حماد (405هـ)' },
					{ left: 'يغمراسن بن زيان', right: 'تلمسان (633هـ)' },
					{ left: 'مسجد سيدي بومدين', right: 'من معالم تلمسان الزيانية' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledPairs = rng.shuffle(v.pairs);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'لاحظ لوحة معالم الدول الإسلامية المستقلة في المغرب الإسلامي ثم أجب:',
			content: [
				buildIllustratedFigureBlock('hg_05_islamic_states_maghrib_landmarks', {
					title: 'معالم الدول الإسلامية المستقلة في المغرب الإسلامي',
					maxHeight: 115,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بذكر المؤسس (أو الدولة) والعاصمة المناسبة:' },
				buildHistoryTableBlock(['الدولة الإسلامية', 'المؤسس / الدولة', 'العاصمة'], v.tableRows, 'center'),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'hist_islamic',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل دولة إسلامية في الجزائر بمؤسسها وعاصمتها الصحيحة:',
				questionTextAr: 'اربط كل دولة بعاصمتها ومؤسسها:',
				imageUrl: '/documents/illustrations/history_geo/hg_05_islamic_states_maghrib_landmarks.webp',
				imageCaption: 'معالم الدول الإسلامية المستقلة في المغرب الإسلامي',
				questionData: { pairs: shuffledPairs },
				explanation: 'الرستمية عاصمتها تيهرت، والحمادية قلعة بني حماد ثم بجاية، والزيانية تلمسان.'
			},
			sujetExercise,
			hints: [
				'الدولة الرستمية: عبد الرحمن بن رستم — تيهرت.',
				'الدولة الحمادية: حماد بن بلكين — قلعة بني حماد ثم بجاية.',
				'الدولة الزيانية: يغمراسن بن زيان — تلمسان.'
			],
			solutionStepsAr: [
				'الرستمية: تيهرت (160هـ) — الحمادية: القلعة ثم بجاية (405هـ) — الزيانية: تلمسان (633هـ).',
				v.a2
			],
			finalAnswer: v.a2
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): المناخ والغطاء النباتي في الجزائر
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoClimateVegetation: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t2_geo_climate_vegetation',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: الأقاليم المناخية والغطاء النباتي في الجزائر',
	curriculumLessonId: 'his_lesson_4ap_t2_climate_vegetation_resources',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'تدرج المناخ والنبات من الشمال إلى الجنوب',
				tableRows: [
					[{ label: 'الإقليم التلي الساحلي (الشمال)' }, { content: '................', answer: 'المناخ المتوسطي المعتدل الممطر', mark: '0.5' }, { content: '................', answer: 'غابات الفلين والصنوبر والأرز', mark: '0.5' }],
					[{ label: 'إقليم الهضاب العليا (الوسط)' }, { content: '................', answer: 'المناخ القاري شبه الجاف', mark: '0.5' }, { content: '................', answer: 'نبات الحلفاء والشيح والسهوب', mark: '0.5' }],
					[{ label: 'الإقليم الصحراوي (الجنوب)' }, { content: '................', answer: 'المناخ الصحراوي الحار الجاف', mark: '0.5' }, { content: '................', answer: 'واحات النخيل والنباتات الشوكية', mark: '0.5' }]
				],
				q2: '2) لماذا تتناقص كثافة الغطاء النباتي كلما اتجهنا من شمال الجزائر نحو جنوبها؟',
				a2: '2) بسبب تناقص كمية الأمطار وارتفاع درجات الحرارة والجفاف كلما ابتعدنا عن البحر نحو الصحراء.',
				clozeSentence: 'يسود الشريط الساحلي وإقليم التل في شمال الجزائر المناخ ___ المعتدل الممطر شتاءً.',
				clozeCorrect: 'المتوسطي',
				clozeDistractors: ['الصحراوي', 'القطبي', 'الاستوائي']
			},
			{
				label: 'العلاقة بين الأمطار والنبات الطبيعي',
				tableRows: [
					[{ label: 'غابات البلوط والفلين والأرز' }, { content: '................', answer: 'شمال الجزائر (التل)', mark: '0.5' }, { content: '................', answer: 'وفرة الأمطار والمناخ المتوسطي', mark: '0.5' }],
					[{ label: 'أعشاب الحلفاء والشيح' }, { content: '................', answer: 'الهضاب العليا', mark: '0.5' }, { content: '................', answer: 'قلة الأمطار والمناخ شبه الجاف', mark: '0.5' }],
					[{ label: 'أشجار النخيل بالواحات' }, { content: '................', answer: 'الصحراء الجنوبية', mark: '0.5' }, { content: '................', answer: 'الجفاف ووجود المياه الجوفية', mark: '0.5' }]
				],
				q2: '2) سمّ الأقاليم المناخية الثلاثة للجزائر بالترتيب من الشمال إلى الجنوب.',
				a2: '2) 1) المناخ المتوسطي، 2) المناخ القاري شبه الجاف، 3) المناخ الصحراوي.',
				clozeSentence: 'يشتهر إقليم الهضاب العليا ذو المناخ القاري شبه الجاف بنمو نبات ___ والشيح.',
				clozeCorrect: 'الحلفاء',
				clozeDistractors: ['الفلين الكثيف', 'الأرز الثلجي', 'الأناناس']
			},
			{
				label: 'حماية الغطاء النباتي وتأقلم النباتات',
				tableRows: [
					[{ label: 'شتاء دافئ ممطر وصيف حار جاف' }, { content: '................', answer: 'المناخ المتوسطي', mark: '0.5' }, { content: '................', answer: 'الزيتون والكروم والفلين', mark: '0.5' }],
					[{ label: 'شتاء بارد وصيف حار وأمطار متذبذبة' }, { content: '................', answer: 'المناخ القاري شبه الجاف', mark: '0.5' }, { content: '................', answer: 'الحلفاء والمراعي', mark: '0.5' }],
					[{ label: 'حرارة شديدة وأمطار نادرة جدا' }, { content: '................', answer: 'المناخ الصحراوي', mark: '0.5' }, { content: '................', answer: 'النخيل والنبات الشوكي', mark: '0.5' }]
				],
				q2: '2) كيف تتأقلم النباتات الصحراوية مثل النخيل والنباتات الشوكية مع قلة الأمطار؟',
				a2: '2) تمتد جذورها عميقا لامتصاص المياه الجوفية، ولها أوراق إبرية أو شوكية تقلل تبخر الماء.',
				clozeSentence: 'ينتج تناقص الغطاء النباتي كلما اتجهنا جنوبا عن قلة ___ وارتفاع الحرارة.',
				clozeCorrect: 'الأمطار',
				clozeDistractors: ['الجبال', 'الأنهار الجليدية', 'السكان فقط']
			}
		];

		const v = rng.pick(variants);
		const clozeOptions = rng.shuffle([v.clozeCorrect, ...v.clozeDistractors]);
		const clozeCorrectIdx = clozeOptions.indexOf(v.clozeCorrect);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'لاحظ المقطع التضاريسي والمناخي للجزائر ثم أجب عن الأسئلة:',
			content: [
				buildIllustratedFigureBlock('hg_03_algeria_relief_climate_cross_section', {
					title: 'المقطع التضاريسي والمناخي للجزائر من الشمال إلى الجنوب',
					maxHeight: 112,
					width: '62%',
					mode: 'labeled',
					pins: []
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بالربط بين الإقليم والمناخ والنبات الطبيعي:' },
				buildHistoryTableBlock(['الإقليم / النبات', 'المناخ / الموقع', 'الغطاء النباتي / السبب'], v.tableRows, 'center'),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'cloze',
				questionText: 'اختر الكلمة المناسبة لإكمال الجملة الجغرافية:',
				questionTextAr: 'أكمل الفراغ بالكلمة المناسبة:',
				imageUrl: '/documents/illustrations/history_geo/hg_03_algeria_relief_climate_cross_section.webp',
				imageCaption: 'المقطع التضاريسي والمناخي للجزائر',
				questionData: {
					sentence: v.clozeSentence,
					options: clozeOptions,
					correctIndex: clozeCorrectIdx
				},
				explanation: `الإجابة الصحيحة هي: ${v.clozeCorrect}.`
			},
			sujetExercise,
			hints: [
				'يتدرج المناخ في الجزائر من الشمال إلى الجنوب: متوسطي، فقاري شبه جاف، فصحراوي.',
				'تقل الأمطار كلما ابتعدنا عن البحر المتوسط نحو الجنوب.',
				'الحلفاء نبات الهضاب العليا، والفلين والبلوط في التل، والنخيل في واحات الصحراء.'
			],
			solutionStepsAr: ['أقاليم المناخ: المتوسطي (التل)، القاري شبه الجاف (الهضاب)، الصحراوي (الجنوب).', v.a2],
			finalAnswer: v.clozeCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): الموارد الطبيعية في الجزائر (مائية، طاقوية، معدنية)
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoNaturalResources: HistoryParameterizedTemplate = {
	id: 'his_tpl_4ap_t2_geo_natural_resources',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: الموارد الطبيعية في الجزائر وترشيدها',
	curriculumLessonId: 'his_lesson_4ap_t2_climate_vegetation_resources',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'تصنيف الموارد المائية والطاقوية والمعدنية',
				tableRows: [
					[{ label: 'السدود والمياه الجوفية ومحطات التحلية' }, { answer: 'موارد مائية', mark: '0.75' }],
					[{ label: 'البترول بحاسي مسعود والغاز بحاسي الرمل' }, { answer: 'موارد طاقوية (محروقات)', mark: '0.75' }],
					[{ label: 'الحديد بالونزة وغار جبيلات والفوسفات بتبسة' }, { answer: 'موارد معدنية', mark: '0.75' }],
					[{ label: 'الطاقة الشمسية وطاقة الرياح' }, { answer: 'طاقات متجددة نظيفة', mark: '0.75' }]
				],
				q2: '2) لماذا يُنصح بترشيد استغلال البترول والمعادن وتطوير الطاقة الشمسية؟',
				a2: '2) لأن البترول والمعادن موارد غير متجددة قابلة للنفاد، بينما الطاقة الشمسية متجددة ونظيفة لا تلوث البيئة.',
				dragCategories: ['موارد مائية', 'موارد طاقوية', 'موارد معدنية'],
				dragItems: [
					{ text: 'مياه السدود والأودية', category: 'موارد مائية' },
					{ text: 'المياه الجوفية بالصحراء', category: 'موارد مائية' },
					{ text: 'بترول حاسي مسعود', category: 'موارد طاقوية' },
					{ text: 'غاز حاسي الرمل والطاقة الشمسية', category: 'موارد طاقوية' },
					{ text: 'حديد الونزة وغار جبيلات', category: 'موارد معدنية' },
					{ text: 'فوسفات جبل العنق بتبسة', category: 'موارد معدنية' }
				]
			},
			{
				label: 'أهمية الموارد الطبيعية للاقتصاد الجزائري',
				tableRows: [
					[{ label: 'أكبر حقل للبترول في ولاية ورقلة' }, { answer: 'حاسي مسعود', mark: '0.75' }],
					[{ label: 'أشهر حقل للغاز الطبيعي بولاية الأغواط' }, { answer: 'حاسي الرمل', mark: '0.75' }],
					[{ label: 'منجم الحديد الضخم بالجنوب الغربي (تندوف)' }, { answer: 'منجم غار جبيلات', mark: '0.75' }],
					[{ label: 'ثروة مائية تروي واحات الصحراء' }, { answer: 'المياه الجوفية', mark: '0.75' }]
				],
				q2: '2) اذكر طريقتين للمحافظة على الثروة المائية من التبذير والتلوث.',
				a2: '2) استعمال السقي بالتقطير في الفلاحة، وتنظيف السدود ومنع رمي النفايات الصناعية في الأودية.',
				dragCategories: ['موارد متجددة', 'موارد غير متجددة'],
				dragItems: [
					{ text: 'الطاقة الشمسية', category: 'موارد متجددة' },
					{ text: 'طاقة الرياح', category: 'موارد متجددة' },
					{ text: 'مياه الأمطار إذا حُفظت', category: 'موارد متجددة' },
					{ text: 'البترول', category: 'موارد غير متجددة' },
					{ text: 'الغاز الطبيعي', category: 'موارد غير متجددة' },
					{ text: 'معدن الحديد والفوسفات', category: 'موارد غير متجددة' }
				]
			},
			{
				label: 'مواقع الثروات الباطنية والمائية في الجزائر',
				tableRows: [
					[{ label: 'استخراج الفوسفات والحديد بولاية تبسة' }, { answer: 'جبل العنق والونزة', mark: '0.75' }],
					[{ label: 'تحلية مياه البحر لتزويد المدن الساحلية' }, { answer: 'مورد مائي عصري', mark: '0.75' }],
					[{ label: 'أشعة الشمس الوفيرة في الصحراء الجزائرية' }, { answer: 'طاقة شمسية متجددة', mark: '0.75' }],
					[{ label: 'إنتاج الكهرباء والوقود للتصنيع والتصدير' }, { answer: 'دور الموارد الطاقوية', mark: '0.75' }]
				],
				q2: '2) كيف تسهم الموارد المعدنية كالحديد والفوسفات في تنمية البلاد؟',
				a2: '2) تدخل في الصناعة الثقيلة والبناء (الحديد والصلب) وصناعة الأسمدة الفلاحية (الفوسفات).',
				dragCategories: ['موارد طاقوية', 'موارد معدنية'],
				dragItems: [
					{ text: 'البترول بحاسي مسعود', category: 'موارد طاقوية' },
					{ text: 'الغاز الطبيعي بحاسي الرمل', category: 'موارد طاقوية' },
					{ text: 'الطاقة الشمسية بالصحراء', category: 'موارد طاقوية' },
					{ text: 'الحديد بالونزة', category: 'موارد معدنية' },
					{ text: 'الحديد بغار جبيلات', category: 'موارد معدنية' },
					{ text: 'الفوسفات بجبل العنق', category: 'موارد معدنية' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledDrag = rng.shuffle(v.dragItems);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول الموارد الطبيعية في الجزائر:',
			content: [
				{ type: 'text', content: '1) أكمل الجدول الآتي بتحديد نوع المورد الطبيعي أو موقعه:' },
				buildHistoryTableBlock(['المورد أو الموقع', 'التصنيف / الاسم الدقيق'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'drag_drop',
				questionText: 'صنّف الموارد الطبيعية الآتية في فئاتها المناسبة:',
				questionTextAr: 'صنّف الموارد الطبيعية حسب نوعها:',
				questionData: {
					categories: v.dragCategories,
					items: shuffledDrag
				},
				explanation: 'تتنوع موارد الجزائر بين مائية (سدود، جوفية)، وطاقوية (بترول، غاز، شمسية)، ومعدنية (حديد، فوسفات).'
			},
			sujetExercise,
			hints: [
				'البترول بحاسي مسعود والغاز بحاسي الرمل والطاقة الشمسية موارد طاقوية.',
				'الحديد بالونزة وغار جبيلات والفوسفات بجبل العنق موارد معدنية.',
				'السدود والمياه الجوفية وتحلية البحر موارد مائية.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

export const TEMPLATES_4AP_T2: HistoryParameterizedTemplate[] = [
	tplHistIslamicConquest,
	tplHistIndependentStates,
	tplGeoClimateVegetation,
	tplGeoNaturalResources
];
