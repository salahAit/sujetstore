import type {
	Difficulty,
	HistoryGeneratedExerciseInstance,
	HistoryParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildHistoricalDocumentBlock, buildHistoryTableBlock } from '../../history-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين (تدعم تقييم المكتسبات) — السنة الخامسة ابتدائي — الفصل الأول
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. التاريخ (5 نقاط): الاحتلال الفرنسي للجزائر 1830م
// ───────────────────────────────────────────────────────────────────────────────
const tplHistOccupation1830: HistoryParameterizedTemplate = {
	id: 'his_tpl_5ap_t1_hist_occupation_1830',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'hist_colonial_resistance',
	titleAr: 'التاريخ: الاحتلال الفرنسي للجزائر (1830م) أسبابه ومراحله',
	curriculumLessonId: 'his_lesson_5ap_t1_french_occupation_1830',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const orderedStages = [
			'حادثة المروحة يوم 29 أفريل 1827م',
			'فرض الحصار البحري الفرنسي على الجزائر (1827 – 1830م)',
			'إنزال الجيش الفرنسي بشاطئ سيدي فرج يوم 14 جوان 1830م',
			'معركة سطاوالي (19 جوان 1830م) ثم معاهدة 5 جويلية 1830م'
		];

		const variants = [
			{
				label: 'الأسباب الحقيقية والذريعة لحملة 1830م',
				docText:
					'اتخذت الحكومة الفرنسية من حادثة المروحة (29 أفريل 1827م) ذريعة لإخفاء أطماعها القديمة في ثروات الجزائر وموقعها الاستراتيجي وتحطيم أسطولها، فنزلت قواتها بسيدي فرج يوم 14 جوان 1830م.',
				tableRows: [
					[{ label: 'السبب الظاهري (الذريعة الواهية)' }, { answer: 'حادثة المروحة 29 أفريل 1827م', mark: '0.75' }],
					[{ label: 'سبب اقتصادي حقيقي للاحتلال' }, { answer: 'الطمع في خيرات الجزائر وأموال خزينتها', mark: '0.75' }],
					[{ label: 'سبب عسكري واستراتيجي حقيقي' }, { answer: 'موقع الجزائر وتدمير أسطولها البحري', mark: '0.75' }],
					[{ label: 'الهدف السياسي الداخلي لفرنسا' }, { answer: 'تصدير أزمتها الداخلية وإلهاء شعبها', mark: '0.75' }]
				],
				q2: '2) تتبع باختصار مراحل الحملة العسكرية الفرنسية من 14 جوان 1830م إلى 5 جويلية 1830م.',
				a2: '2) الإنزال بسيدي فرج (14 جوان 1830م)، ثم معركة سطاوالي (19 جوان 1830م)، ثم دخول مدينة الجزائر وتوقيع معاهدة الاستسلام (5 جويلية 1830م).'
			},
			{
				label: 'تقييم المكتسبات: مراحل سقوط مدينة الجزائر',
				docText:
					'فرض الأسطول الفرنسي حصارا بحريا دام ثلاث سنوات لإضعاف الجزائر بعد معركة نافارين (1827م)، ثم انطلقت الحملة من ميناء طولون ونزلت بسيدي فرج غرب العاصمة، وخاض الجزائريون معركة سطاوالي دفاعا عن أرضهم.',
				tableRows: [
					[{ label: '29 أفريل 1827م' }, { answer: 'حادثة المروحة بين الداي حسين والقنصل الفرنسي', mark: '0.75' }],
					[{ label: '14 جوان 1830م' }, { answer: 'إنزال الجيش الفرنسي بشاطئ سيدي فرج', mark: '0.75' }],
					[{ label: '19 جوان 1830م' }, { answer: 'وقوع معركة سطاوالي ضد الغزاة', mark: '0.75' }],
					[{ label: '5 جويلية 1830م' }, { answer: 'سقوط العاصمة وتوقيع معاهدة الاستسلام', mark: '0.75' }]
				],
				q2: '2) لماذا فرضت فرنسا حصارا بحريا على الجزائر ثلاث سنوات قبل الإنزال في سيدي فرج؟',
				a2: '2) لإضعاف الجزائر اقتصاديا وعسكريا ومنع وصول الإمدادات إليها وتهيئة الظروف للغزو.'
			},
			{
				label: 'نقد الذريعة الاستعمارية وبداية الرفض الشعبي',
				docText:
					'بعد توقيع معاهدة 5 جويلية 1830م التي لم تحترمها فرنسا، اعتدت على المقدسات والممتلكات، فرفض الشعب الجزائري الاحتلال منذ يومه الأول وهبّ للمقاومة.',
				tableRows: [
					[{ label: 'المعركة البحرية التي أضعفت الأسطول الجزائري (1827)' }, { answer: 'معركة نافارين', mark: '0.75' }],
					[{ label: 'الميناء الفرنسي الذي انطلقت منه الحملة' }, { answer: 'ميناء طولون', mark: '0.75' }],
					[{ label: 'البعد الديني من الدوافع الحقيقية للاحتلال' }, { answer: 'الحقد الصليبي ونشر التنصير', mark: '0.75' }],
					[{ label: 'موقف الشعب الجزائري من الاحتلال الفرنسي' }, { answer: 'الرفض القاطع والمقاومة المسلحة', mark: '0.75' }]
				],
				q2: '2) فسّر لماذا لا يمكن اعتبار حادثة المروحة سببا حقيقيا لاحتلال الجزائر.',
				a2: '2) لأن خطط احتلال الجزائر كانت مبيتة قبلها بسنوات طمعا في ثرواتها وموقعها، وإنما اتُّخذت الحادثة مجرد ذريعة.'
			}
		];

		const v = rng.pick(variants);
		const indexed = orderedStages.map((label, rank) => ({ label, rank }));
		const shuffled = rng.shuffle(indexed);
		if (shuffled.every((e, i) => e.rank === i)) {
			[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
		}
		const items = shuffled.map((e) => e.label);
		const correctOrder = orderedStages.map((_, rank) => shuffled.findIndex((e) => e.rank === rank));

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'اقرأ السند التاريخي الآتي حول الاحتلال الفرنسي للجزائر سنة 1830م ثم أجب:',
			content: [
				buildHistoricalDocumentBlock({
					title: 'سند تاريخي: حملة 1830م على الجزائر',
					text: v.docText
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بالمعلومات التاريخية الدقيقة:' },
				buildHistoryTableBlock(['المعطى أو التاريخ', 'التوضيح / الدلالة التاريخية'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_colonial_resistance',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'ordering',
				questionText: 'رتّب مراحل الاحتلال الفرنسي للجزائر من الأقدم إلى الأحدث:',
				questionTextAr: 'رتّب وقائع احتلال الجزائر زمنيا:',
				questionData: {
					items,
					correctOrder
				},
				explanation: `الترتيب الزمني الصحيح: ${orderedStages.join(' ← ')}.`
			},
			sujetExercise,
			hints: [
				'ميّز بين الذريعة الظاهرية (حادثة المروحة) والأسباب الحقيقية (الخيرات، الموقع، تحطيم الأسطول، الصليبية).',
				'دام الحصار البحري ثلاث سنوات من 1827م إلى 1830م.',
				'تذكّر التواريخ الثلاثة لعام 1830: 14 جوان سيدي فرج، 19 جوان سطاوالي، 5 جويلية الاستسلام.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: orderedStages.join(' ← ')
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. التاريخ (5 نقاط): المقاومات الشعبية المسلحة في الجزائر
// ───────────────────────────────────────────────────────────────────────────────
const tplHistArmedResistances: HistoryParameterizedTemplate = {
	id: 'his_tpl_5ap_t1_hist_armed_resistances',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'hist_colonial_resistance',
	titleAr: 'التاريخ: المقاومات الشعبية المسلحة وأبطالها',
	curriculumLessonId: 'his_lesson_5ap_t1_popular_armed_resistances',
	defaultPoints: 5,
	onecRole: 'pri_history',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'الأمير عبد القادر وأحمد باي ونسومر والمقراني',
				tableRows: [
					[{ label: 'الأمير عبد القادر رحمه الله (1832–1847)' }, { answer: 'الغرب والوسط (انطلاقا من معسكر)', mark: '0.75' }],
					[{ label: 'أحمد باي رحمه الله (1836–1848)' }, { answer: 'قسنطينة والشرق الجزائري', mark: '0.75' }],
					[{ label: 'لالا فاطمة نسومر (1851–1857)' }, { answer: 'منطقة القبائل وجرجرة', mark: '0.75' }],
					[{ label: 'الشيخ المقراني والشيخ الحداد (1871)' }, { answer: 'ثورة شاملة بالوسط والشرق', mark: '0.75' }]
				],
				q2: '2) اذكر مظهرين يدلان على بناء الأمير عبد القادر رحمه الله لدولة جزائرية منظمة أثناء مقاومته.',
				a2: '2) تأسيس جيش نظامي ومصانع أسلحة، وسكّ العملة الوطنية وتحديد العلم الوطني وتقسيم البلاد إلى خلافات.',
				pairs: [
					{ left: 'الأمير عبد القادر رحمه الله', right: 'معسكر والغرب الجزائري (1832–1847)' },
					{ left: 'أحمد باي رحمه الله', right: 'قسنطينة والشرق الجزائري (1836–1848)' },
					{ left: 'لالا فاطمة نسومر', right: 'جرجرة والقبائل (1851–1857)' },
					{ left: 'المقراني والشيخ الحداد', right: 'ثورة 1871م الكبرى' }
				]
			},
			{
				label: 'مقاومة الزعاطشة والمعارك والنتائج',
				tableRows: [
					[{ label: 'الشيخ بوزيان (1849م)' }, { answer: 'مقاومة واحة الزعاطشة ببسكرة', mark: '0.75' }],
					[{ label: 'معركة المقطع ومعاهدة التافنة (1835–1837)' }, { answer: 'من محطات مقاومة الأمير عبد القادر رحمه الله', mark: '0.75' }],
					[{ label: 'الانتصار في معركة قسنطينة الأولى (1836)' }, { answer: 'بقيادة أحمد باي رحمه الله', mark: '0.75' }],
					[{ label: 'سبب عدم تحقيق الاستقلال الفوري' }, { answer: 'التشتت الجغرافي والزمني وتفوق عتاد العدو', mark: '0.75' }]
				],
				q2: '2) اذكر سببين حالَا دون استمرار المقاومات الشعبية المسلحة رغم بسالة قادتها.',
				a2: '2) تشتتها في الزمان والمكان وعدم توحيد قيادتها، إضافة إلى سياسة الأرض المحروقة وتفوق جيش العدو في العدة والعدد.',
				pairs: [
					{ left: 'الشيخ بوزيان', right: 'مقاومة الزعاطشة ببسكرة (1849م)' },
					{ left: 'معاهدة التافنة (1837م)', right: 'الأمير عبد القادر رحمه الله' },
					{ left: 'صد حملة قسنطينة الأولى (1836م)', right: 'أحمد باي رحمه الله' },
					{ left: 'سياسة الأرض المحروقة', right: 'أسلوب استعماري همجي لقمع المقاومات' }
				]
			},
			{
				label: 'تقييم المكتسبات: دور المقاومة الشعبية في الوعي الوطني',
				tableRows: [
					[{ label: 'تاريخ مبايعة الأمير عبد القادر رحمه الله' }, { answer: '27 نوفمبر 1832م بمعسكر', mark: '0.75' }],
					[{ label: 'عاصمة الأمير عبد القادر بعد معسكر' }, { answer: 'تاقدمت ثم الزمالة المتنقلة', mark: '0.75' }],
					[{ label: 'مقاومة أولاد سيدي الشيخ (1864)' }, { answer: 'الجنوب الغربي الوهراني', mark: '0.75' }],
					[{ label: 'قيمة المقاومات الشعبية تاريخيا' }, { answer: 'رفض الاستعمار والتمهيد للعمل الموحد', mark: '0.75' }]
				],
				q2: '2) ما الدرس الذي استفادته الحركة الوطنية لاحقا من تجربة المقاومات الشعبية المسلحة؟',
				a2: '2) ضرورة توحيد العمل الوطني عبر كامل التراب الجزائري والانتقال للوعي السياسي قبل الثورة الشاملة.',
				pairs: [
					{ left: 'مبايعة 27 نوفمبر 1832م', right: 'الأمير عبد القادر رحمه الله' },
					{ left: 'الدفاع عن قسنطينة', right: 'أحمد باي رحمه الله' },
					{ left: 'ثورة جرجرة', right: 'لالا فاطمة نسومر' },
					{ left: 'انتفاضة 1871م', right: 'الشيخ المقراني والشيخ الحداد' }
				]
			}
		];

		const v = rng.pick(variants);
		const shuffledPairs = rng.shuffle(v.pairs);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة التاريخ',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول المقاومات الشعبية المسلحة في الجزائر:',
			content: [
				{ type: 'text', content: '1) أكمل الجدول الآتي بذكر المنطقة أو الحدث المناسب لكل مقاوم:' },
				buildHistoryTableBlock(['القائد أو الحدث المقاوم', 'المنطقة / الدلالة التاريخية'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'hist_colonial_resistance',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_history',
			quizQuestion: {
				type: 'matching',
				questionText: 'اربط كل قائد من قادة المقاومة الشعبية بالمنطقة أو الحدث المرتبط به:',
				questionTextAr: 'اربط كل مقاوم بمنطقته أو حدثه:',
				questionData: { pairs: shuffledPairs },
				explanation: 'عمّت المقاومات الشعبية كل ربوع الجزائر من الأمير عبد القادر غربا إلى أحمد باي شرقا ونسومر وبوزيان والمقراني.'
			},
			sujetExercise,
			hints: [
				'قاد الأمير عبد القادر رحمه الله المقاومة في الغرب وأسس الدولة الجزائرية الحديثة.',
				'قاد أحمد باي رحمه الله مقاومة قسنطينة والشرق، وقادت لالا فاطمة نسومر منطقة القبائل.',
				'من أسباب تعثرها تشتتها جغرافيا وزمنيا وتفوق تسليح الاستعمار.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.a2
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجغرافيا (5 نقاط): الموقع الفلكي للجزائر وإحداثياته
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoAstronomicalLocation: HistoryParameterizedTemplate = {
	id: 'his_tpl_5ap_t1_geo_astronomical_location',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: الموقع الفلكي للجزائر وتأثيراته',
	curriculumLessonId: 'his_lesson_5ap_t1_algeria_astronomical_geo_location',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'دوائر العرض وخطوط الطول في الجزائر',
				tableRows: [
					[{ label: 'دائرتا العرض اللتان تنحصر بينهما الجزائر' }, { answer: 'بين 19 درجة و37 درجة شمالا', mark: '0.75' }],
					[{ label: 'خطا الطول اللذان تنحصر بينهما الجزائر' }, { answer: 'بين 9 درجات غربا و12 درجة شرقا', mark: '0.75' }],
					[{ label: 'الخط الرئيسي المار قرب مستغانم غربا' }, { answer: 'خط غرينيتش (خط الطول الرئيسي)', mark: '0.75' }],
					[{ label: 'الدائرة العرضية المارة بجنوب الجزائر' }, { answer: 'مدار السرطان', mark: '0.75' }]
				],
				q2: '2) كيف يؤثر الموقع الفلكي للجزائر (من 19 درجة إلى 37 درجة شمالا) في مناخها؟',
				a2: '2) يجعلها تمتد بين المنطقة المعتدلة شمالا والمنطقة الحارة جنوبا عند مدار السرطان، مما ينوّع مناخها ونباتها ومحاصيلها.',
				blankSentence: 'يمرّ خط الطول الرئيسي ___ قرب مدينة مستغانم في غرب الجزائر.',
				blankAnswers: ['غرينيتش', 'غرينتش', 'جرينتش']
			},
			{
				label: 'خط غرينيتش ومدار السرطان بالجزائر',
				tableRows: [
					[{ label: 'وظيفة خط غرينيتش (0 درجة)' }, { answer: 'تحديد التوقيت العالمي والموقع شرقا وغربا', mark: '0.75' }],
					[{ label: 'موقع مدار السرطان في الجزائر' }, { answer: 'يمر بجنوب الجزائر قرب تمنراست', mark: '0.75' }],
					[{ label: 'نصف الكرة الذي تقع فيه الجزائر بالنسبة للاستواء' }, { answer: 'النصف الشمالي بالكامل', mark: '0.75' }],
					[{ label: 'عدد دوائر العرض التي تشغلها الجزائر' }, { answer: 'حوالي 18 دائرة عرض', mark: '0.75' }]
				],
				q2: '2) قارن بين فائدة خطوط الطول وفائدة دوائر العرض في دراسة الجغرافيا.',
				a2: '2) تفيد خطوط الطول في تحديد الموقع شرقا وغربا وضبط التوقيت، وتفيد دوائر العرض في تحديد الموقع شمالا وجنوبا ومعرفة النطاقات المناخية.',
				blankSentence: 'تقع الجزائر بأكملها شمال خط الاستواء، وتمتد بين دائرتي عرض 19 و___ درجة شمالا.',
				blankAnswers: ['37', '٣٧']
			},
			{
				label: 'التمييز بين الموقع الفلكي والموقع الجغرافي',
				tableRows: [
					[{ label: 'تعريف الموقع الفلكي' }, { answer: 'موقع البلد بالنسبة لخطوط الطول ودوائر العرض', mark: '0.75' }],
					[{ label: 'دائرتا عرض الجزائر' }, { answer: '19 درجة إلى 37 درجة شمالا', mark: '0.75' }],
					[{ label: 'أقصى شرق وغرب الجزائر فلكيا' }, { answer: 'من 12 درجة شرقا إلى 9 درجات غربا', mark: '0.75' }],
					[{ label: 'النطاق الحار الذي يمس جنوب الجزائر' }, { answer: 'منطقة مرور مدار السرطان', mark: '0.75' }]
				],
				q2: '2) اذكر النتيجة المناخية لوقوع شمال الجزائر في الدائرة المعتدلة ومرور مدار السرطان بجنوبها.',
				a2: '2) يتنوع المناخ بين المتوسطي المعتدل شمالا والقاري في الهضاب والصحراوي الحار جنوبا، مما ينوّع الإنتاج الفلاحي.',
				blankSentence: 'يمرّ مدار ___ في جنوب الجزائر قرب تمنراست، فيجعل الجنوب ضمن النطاق الحار.',
				blankAnswers: ['السرطان']
			}
		];

		const v = rng.pick(variants);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'أجب عن الأسئلة الآتية حول الموقع الفلكي للجزائر وأهميته:',
			content: [
				{ type: 'text', content: '1) أكمل الجدول الآتي بالمعلومات الفلكية الدقيقة للجزائر:' },
				buildHistoryTableBlock(['المعطى الفلكي', 'الإجابة الدقيقة'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'fill_blank',
				questionText: 'أكمل الفراغ بالكلمة أو الرقم الجغرافي الصحيح:',
				questionTextAr: 'اكتب الإجابة المناسبة في الفراغ:',
				questionData: {
					sentence: v.blankSentence,
					answers: v.blankAnswers,
					acceptedAnswers: v.blankAnswers
				},
				explanation: `الإجابة الصحيحة: ${v.blankAnswers[0]}.`
			},
			sujetExercise,
			hints: [
				'الجزائر بين دائرتي عرض 19 و37 درجة شمالا، وبين خطي طول 9 غربا و12 شرقا.',
				'يمر خط غرينيتش غرب الجزائر قرب مستغانم، ومدار السرطان جنوبا قرب تمنراست.',
				'خطوط الطول تضبط التوقيت ودوائر العرض تفسر تنوع المناخ.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.blankAnswers[0]
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجغرافيا (5 نقاط): الموقع الجغرافي للجزائر وأهميته الإقليمية والقارية
// ───────────────────────────────────────────────────────────────────────────────
const tplGeoRegionalImportance: HistoryParameterizedTemplate = {
	id: 'his_tpl_5ap_t1_geo_regional_importance',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'geo_algeria',
	titleAr: 'الجغرافيا: الموقع الجغرافي للجزائر وأهميته الإقليمية والعالمية',
	curriculumLessonId: 'his_lesson_5ap_t1_algeria_astronomical_geo_location',
	defaultPoints: 5,
	onecRole: 'pri_geography',
	generate(seed: number, difficulty: Difficulty = 'medium'): HistoryGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				label: 'الأهمية المغاربية والإفريقية والعالمية',
				docText:
					'تحتل الجزائر موقعا جغرافيا متميزا شمال قارة إفريقيا، بمساحة تبلغ 2381741 كيلومترا مربعا، وشريط ساحلي يمتد على البحر الأبيض المتوسط، مما يجعلها قلب المغرب العربي وبوابة إفريقيا نحو أوروبا.',
				tableRows: [
					[{ label: 'الأهمية المغاربية للجزائر' }, { answer: 'تتوسط بلدان المغرب العربي وتربط شرقها بغربها', mark: '1' }],
					[{ label: 'الأهمية الإفريقية للجزائر' }, { answer: 'أكبر دولة إفريقية وبوابة القارة عبر طريق الوحدة', mark: '1' }],
					[{ label: 'الأهمية العالمية للجزائر' }, { answer: 'تتوسط قارات العالم القديم وتشرف على البحر المتوسط', mark: '1' }]
				],
				q2: '2) اذكر دولتين تحدان الجزائر من الشرق ودولتين من الجنوب، وبيّن طول الساحل الجزائري.',
				a2: '2) من الشرق: تونس وليبيا. من الجنوب: مالي والنيجر. طول الساحل الجزائري نحو 1622 كيلومترا.',
				quizQ: 'لماذا تُوصف الجزائر بأنها «بوابة إفريقيا نحو أوروبا»؟',
				correctOpt: 'لإشرافها على البحر المتوسط شمالا واتصالها بعمق القارة الإفريقية جنوبا',
				distractors: [
					{ text: 'لوقوعها في أقصى جنوب الكرة الأرضية', diagnosticFeedback: 'تقع الجزائر في شمال قارة إفريقيا مقابلة لأوروبا.' },
					{ text: 'لعدم وجود أي حدود برية مع دول إفريقيا', diagnosticFeedback: 'للجزائر حدود برية واسعة مع مالي والنيجر وموريتانيا وتونس وليبيا والمغرب والصحراء الغربية.' },
					{ text: 'لأنها جزيرة صغيرة وسط المحيط الأطلسي', diagnosticFeedback: 'الجزائر أكبر بلد في قارة إفريقيا وعرضها على المتوسط.' }
				]
			},
			{
				label: 'حدود الجزائر وإطلالتها المتوسطية',
				docText:
					'تتنوع جغرافية الجزائر بين ساحل طويل يمتد قرابة 1622 كم على البحر المتوسط وحدود برية مترامية تصلها بتونس وليبيا شرقا، والمغرب والصحراء الغربية وموريتانيا غربا، ومالي والنيجر جنوبا.',
				tableRows: [
					[{ label: 'المساحة الإجمالية للجزائر' }, { answer: '2381741 كيلومترا مربعا (الأكبر إفريقيا وعربيا)', mark: '1' }],
					[{ label: 'الحد البحري الشمالي' }, { answer: 'البحر الأبيض المتوسط (بطول 1622 كم)', mark: '1' }],
					[{ label: 'طريق الربط القاري نحو الجنوب' }, { answer: 'طريق الوحدة الإفريقية (العابر للصحراء)', mark: '1' }]
				],
				q2: '2) اذكر فائدتين اقتصاديتين تمنحهما الإطلالة الطويلة على البحر الأبيض المتوسط للجزائر.',
				a2: '2) سهولة التجارة البحرية والموانئ مع العالم، وثروة الصيد البحري والسياحة الساحلية.',
				quizQ: 'ما ترتيب الجزائر من حيث المساحة في قارة إفريقيا وفي الوطن العربي؟',
				correctOpt: 'الأولى إفريقيا والأولى عربيا بمساحة 2381741 كم مربع',
				distractors: [
					{ text: 'الأصغر مساحة في المغرب العربي', diagnosticFeedback: 'الجزائر هي أكبر دول المغرب العربي وإفريقيا مساحة.' },
					{ text: 'الخامسة في إفريقيا والثانية في أوروبا', diagnosticFeedback: 'الجزائر بلد إفريقي يحتل المرتبة الأولى في إفريقيا والعالم العربي.' },
					{ text: 'دولة حبيسة بلا ساحل بحري', diagnosticFeedback: 'تملك الجزائر ساحلا طويلا يمتد 1622 كم على البحر المتوسط.' }
				]
			},
			{
				label: 'تقييم المكتسبات: الموقع الاستراتيجي في حوض المتوسط',
				docText:
					'بفضل موقعها الفلكي والجغرافي الوسطي بين إفريقيا وأوروبا وآسيا، أدت الجزائر دورا تاريخيا واقتصاديا محوريا في التجارة البحرية والصحراوية وتصدير الطاقة.',
				tableRows: [
					[{ label: 'التوسط بين قارات العالم القديم' }, { answer: 'تلتقي عندها إفريقيا وأوروبا وآسيا', mark: '1' }],
					[{ label: 'الدور التجاري الصحراوي والإفريقي' }, { answer: 'ربط السواحل المتوسطية بدول الساحل الإفريقي', mark: '1' }],
					[{ label: 'امتدادها من الشرق للغرب والشمال للجنوب' }, { answer: 'ثراء التضاريس والمناخ والموارد الطبيعية', mark: '1' }]
				],
				q2: '2) اشرح باختصار الأهمية المغاربية للموقع الجغرافي للجزائر.',
				a2: '2) تتوسط دول المغرب العربي الخمس وتشترك في الحدود مع معظمها، مما يسهل التبادل والتكامل بينها.',
				quizQ: 'أيُّ قارات ثلاث تتوسطها الجزائر في موقعها العالمي عبر البحر المتوسط؟',
				correctOpt: 'إفريقيا وأوروبا وآسيا',
				distractors: [
					{ text: 'أستراليا وأمريكا الجنوبية والقطب المتجمد', diagnosticFeedback: 'هذه القارات بعيدة عن حوض البحر الأبيض المتوسط.' },
					{ text: 'أمريكا الشمالية والقارة القطبية فقط', diagnosticFeedback: 'تتوسط الجزائر قارات العالم القديم المحيطة بالمتوسط.' },
					{ text: 'أستراليا ونيوزيلندا فقط', diagnosticFeedback: 'أستراليا في النصف الجنوبي الشرقي البعيد عن الجزائر.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'مادة الجغرافيا',
			points: 5,
			instruction: 'تأمّل الخريطة المرفقة واقرأ السند الجغرافي ثم أجب:',
			content: [
				buildIllustratedFigureBlock('hg_13_maghrib_mediterranean_mute_map', {
					title: 'موقع الجزائر في المغرب العربي وحوض البحر الأبيض المتوسط',
					maxHeight: 112,
					width: '60%',
					mode: 'labeled',
					pins: []
				}),
				buildHistoricalDocumentBlock({
					title: 'سند جغرافي: أهمية موقع الجزائر',
					text: v.docText
				}),
				{ type: 'text', content: '1) أكمل الجدول الآتي بتوضيح أهمية موقع الجزائر وأبعاده:' },
				buildHistoryTableBlock(['البعد الجغرافي أو العنصر', 'الشرح / الأهمية'], v.tableRows),
				{ type: 'text', content: v.q2, answer: v.a2, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: 'geo_algeria',
			titleAr: `${this.titleAr} — ${v.label}`,
			onecRole: 'pri_geography',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				imageUrl: '/documents/illustrations/history_geo/hg_13_maghrib_mediterranean_mute_map.webp',
				imageCaption: 'المغرب العربي وحوض المتوسط',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${v.correctOpt}.`
			},
			sujetExercise,
			hints: [
				'الجزائر أكبر دولة إفريقية وعربية بمساحة 2381741 كم مربع وساحل 1622 كم.',
				'تتوسط المغرب العربي وتربط إفريقيا بأوروبا عبر المتوسط.',
				'يحدها شرقا تونس وليبيا، وغربا المغرب والصحراء الغربية وموريتانيا، وجنوبا مالي والنيجر.'
			],
			solutionStepsAr: [...v.tableRows.map((r) => `${r[0].label}: ${r[1].answer}`), v.a2],
			finalAnswer: v.correctOpt
		};
	}
};

export const TEMPLATES_5AP_T1: HistoryParameterizedTemplate[] = [
	tplHistOccupation1830,
	tplHistArmedResistances,
	tplGeoAstronomicalLocation,
	tplGeoRegionalImportance
];
