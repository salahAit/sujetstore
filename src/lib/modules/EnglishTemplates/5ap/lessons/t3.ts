import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPrimaryCards,
	svgEnglishWritingStructure
} from '../../svg-english';

// ===============================================================================
// Interactive Lessons - 5AP English - Trimester 3 (Holidays, Seasons & Competency Evaluation)
// ===============================================================================

export const LESSONS_5AP_T3: EnglishInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: Seasons and Weather
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t3_seasons_weather',
		slug: 'eng-5ap-t3-seasons-weather',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: العطل والسفر والفصول وتقييم المكتسبات (Holidays, Seasons and Competency Evaluation)',
		order: 1,
		titleAr: 'الفصول الأربعة وحالة الطقس (Seasons and Weather)',
		objectives: [
			'تسمية الفصول الأربعة باللغة الإنجليزية (spring, summer, autumn, winter).',
			'وصف حالة الطقس باستعمال الصفات الأساسية (sunny, hot, warm, windy, cloudy, rainy, snowy, cold).',
			'السؤال عن حالة الطقس والإجابة عنه بجملة سليمة: «What is the weather like?».'
		],
		keywordsAr: ['الفصول', 'الطقس', 'Seasons', 'Weather', 'spring', 'summer', 'autumn', 'winter'],
		discover: {
			scenarioAr:
				'تتنوع الفصول الأربعة في الجزائر بجمالها: في الصيف يكون الجو حاراً ومشمساً على شواطئ بجاية ووهران، وفي الشتاء يكون بارداً وممطراً ومثلجاً في جبال جرجرة والأوراس. تأمل أسماء الفصول وصفات الطقس.',
			svg: svgEnglishPrimaryCards({
				title: 'The Four Seasons in Algeria',
				subtitle: 'الفصول الأربعة في الجزائر',
				cards: [
					{ word: 'Spring', arabic: 'الربيع', color: '#059669' },
					{ word: 'Summer', arabic: 'الصيف', color: '#d97706' },
					{ word: 'Autumn', arabic: 'الخريف', color: '#b45309' },
					{ word: 'Winter', arabic: 'الشتاء', color: '#2563eb' }
				]
			}),
			steps: [
				{
					promptAr: 'ما اسم فصل الربيع وفصل الشتاء باللغة الإنجليزية؟',
					hintAr: 'انظر إلى البطاقة الأولى والرابعة.',
					expectedInput: 'spring, winter',
					revealAr: 'الربيع هو «spring» والشتاء هو «winter»، والصيف «summer» والخريف «autumn».'
				},
				{
					promptAr: 'كيف نشتق صفة الطقس من الكلمات: sun (شمس)، rain (مطر)، wind (ريح)، snow (ثلج)؟',
					hintAr: 'أضف الحرف y إلى نهاية كل اسم (مع مضاعفة n في sunny).',
					expectedInput: 'sunny, rainy, windy, snowy',
					revealAr: 'نضيف الحرف «y» لتصبح صفات طقس: sunny (مشمس)، rainy (ممطر)، windy (عاصف)، snowy (مثلج).'
				},
				{
					promptAr: 'ما حرف الجر الذي يسبق الفصول الأربعة؟ مثل: «............ summer, it is hot.»',
					hintAr: 'نستعمل نفس حرف الجر مع الشهور وفترات اليوم.',
					expectedInput: 'In',
					revealAr: 'نستعمل حرف الجر «in» قبل الفصول الأربعة: In spring, in summer, in autumn, in winter.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفصول الأربعة (The four seasons): Spring (الربيع)، Summer (الصيف)، Autumn (الخريف)، Winter (الشتاء). وتُسبق دائماً بحرف الجر «in» (in winter).',
				'للسؤال عن حالة الطقس نقول: «What is the weather like in winter?» (كيف يكون الطقس في الشتاء؟).',
				'للإجابة نستعمل الضمير «It is»: مثال «It is cold and rainy in winter.» و«It is hot and sunny in summer.».',
				'صفات الطقس الأساسية: sunny (مشمس)، hot (حار)، warm (دافئ)، cool (معتدل مائل للبرودة)، cloudy (غائم)، windy (عاصف)، rainy (ممطر)، cold (بارد)، snowy (مثلج).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Seasons and Typical Weather',
				rootLabel: 'What is the weather like?',
				rootSub: 'It is + Weather Adjective',
				branches: [
					{ label: 'Spring', rule: 'Warm and sunny', example: 'Flowers bloom.', color: '#047857' },
					{ label: 'Summer', rule: 'Hot and sunny', example: 'We swim at the beach.', color: '#d97706' },
					{ label: 'Autumn', rule: 'Windy and cloudy', example: 'Leaves fall down.', color: '#b45309' },
					{ label: 'Winter', rule: 'Cold, rainy, snowy', example: 'We wear warm coats.', color: '#1d4ed8' }
				]
			}),
			visualCaptionAr: 'خريطة الفصول الأربعة وحالة الطقس المناسبة لكل فصل',
			examples: [
				{
					problemAr: 'أجب عن السؤال: What is the weather like in summer in Oran?',
					solutionAr: 'In summer, it is hot and sunny in Oran.'
				},
				{
					problemAr: 'أجب عن السؤال: What is your favourite season? Why?',
					solutionAr: 'My favourite season is spring because the weather is warm and nice.'
				}
			],
			watchOutAr:
				'لا نكتب «The weather is sun» بل «The weather is sunny» أو «It is sunny»؛ لأن sun اسم (شمس) أما sunny فهي الصفة (مشمس).'
		},
		practice: [
			{
				questionAr: 'What is the weather like in winter?',
				options: ['Hot and sunny', 'Cold and rainy', 'Very hot and dry', 'Warm with beaches'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحار والمشمس صفة فصل الصيف.',
					'أحسنت! الطقس في الشتاء بارد وممطر (cold and rainy).',
					'الجو الحار الجاف يميز الصيف.',
					'الشواطئ والدافئ تخص الصيف.'
				],
				explanationAr: 'In winter, the weather is cold, rainy, and sometimes snowy.'
			},
			{
				questionAr: 'In which season do yellow leaves fall and the weather becomes windy?',
				options: ['Spring', 'Summer', 'Autumn', 'Winter'],
				correctIndex: 2,
				diagnosticFeedback: [
					'في الربيع تتفتح الأزهار وتخضر الأشجار.',
					'الصيف حار ومشمس.',
					'ممتاز! في فصل الخريف (Autumn) تتساقط الأوراق ويكون الجو عاصفاً.',
					'الشتاء بارد ومثلج.'
				],
				explanationAr: 'Autumn is the season of falling leaves and windy weather.'
			},
			{
				questionAr: 'Complete with the right preposition: ............ spring, the weather is warm.',
				options: ['At', 'On', 'In', 'Next'],
				correctIndex: 2,
				diagnosticFeedback: [
					'At للساعات.',
					'On لأيام الأسبوع.',
					'أحسنت! الفصول الأربعة تأخذ حرف الجر In.',
					'Next حرف مكان وليس للزمان هنا.'
				],
				explanationAr: 'We always use in before seasons: in spring, in summer.'
			},
			{
				questionAr: 'Choose the weather adjective from the noun «snow»:',
				options: ['snowing coat', 'snows', 'snowy', 'snower'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا ليس صفة طقس قياسية.',
					'snows فعل مضارع.',
					'ممتاز! الصفة من snow هي snowy (مثلج).',
					'snower كلمة غير صحيحة.'
				],
				explanationAr: 'We add -y to snow to get the weather adjective snowy.'
			},
			{
				questionAr: 'Choose the right sentence to describe summer:',
				options: [
					'It is hot and sun.',
					'It is hot and sunny.',
					'It are hot and sunny.',
					'It is cold and snowy.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'sun اسم (شمس)، نحتاج الصفة sunny.',
					'أحسنت! It is hot and sunny.',
					'It تأخذ is وليس are.',
					'cold and snowy تصف الشتاء لا الصيف.'
				],
				explanationAr: 'Use It is + adjectives: It is hot and sunny.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: Means of Transport and Travel in Algeria
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t3_transport_travel',
		slug: 'eng-5ap-t3-transport-travel',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: العطل والسفر والفصول وتقييم المكتسبات (Holidays, Seasons and Competency Evaluation)',
		order: 2,
		titleAr: 'وسائل النقل والسفر داخل الجزائر (Means of Transport and Travel)',
		objectives: [
			'تسمية وسائل النقل المختلفة باللغة الإنجليزية (bus, train, car, plane, boat, bike).',
			'استعمال حرف الجر «by» مع وسائل النقل وحرف الجر «on» مع «on foot» (سيراً على الأقدام).',
			'السؤال عن وسيلة التنقل والإجابة عنها: «How do you go to ...?».'
		],
		keywordsAr: ['وسائل النقل', 'Transport', 'by bus', 'by train', 'on foot', 'Algeria'],
		discover: {
			scenarioAr:
				'في العطلة المدرسية، تسافر العائلات الجزائرية لزيارة الأقارب والمعالم الجميلة: يذهب يوسف إلى المدرسة «on foot»، ويسافر إلى بجاية «by train»، أما عمه فيسافر إلى تمنراست «by plane». لاحظ حروف الجر قبل وسائل النقل.',
			svg: svgEnglishPrimaryCards({
				title: 'Means of Transport',
				subtitle: 'وسائل النقل باللغة الإنجليزية',
				cards: [
					{ word: 'By Bus', arabic: 'بالحافلة', color: '#2563eb' },
					{ word: 'By Train', arabic: 'بالقطار', color: '#059669' },
					{ word: 'By Car', arabic: 'بالسيارة', color: '#d97706' },
					{ word: 'By Plane', arabic: 'بالطائرة', color: '#7c3aed' },
					{ word: 'On Foot', arabic: 'سيراً على الأقدام', color: '#0284c7' }
				]
			}),
			steps: [
				{
					promptAr: 'ما حرف الجر المستعمل قبل: bus, train, car, plane؟',
					hintAr: 'حرف جر قصير من حرفين يبدأ بحرف b.',
					expectedInput: 'by',
					revealAr: 'نستعمل «by» مع جميع وسائل النقل: by bus, by train, by car, by plane, by boat, by bike.'
				},
				{
					promptAr: 'هل نقول «by foot» أم «on foot» عندما نمشي على الأقدام؟',
					hintAr: 'تأمل البطاقة الخامسة في الأعلى.',
					expectedInput: 'on foot',
					revealAr: 'نقول دائماً «on foot» (سيراً على الأقدام)، ولا نقول by foot!'
				},
				{
					promptAr: 'ما أداة الاستفهام التي نسأل بها عن وسيلة السفر أو التنقل؟',
					hintAr: 'تبدأ بحرف H وتعني «كيف».',
					expectedInput: 'How',
					revealAr: 'نسأل بـ «How»: How do you go to school? I go to school on foot.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للسؤال عن وسيلة التنقل أو السفر نقول: «How do you go to school?» أو «How do you travel to Oran?».',
				'نستعمل «by + وسيلة النقل» مباشرة بلا أداة (a / the): by bus (بالحافلة)، by train (بالقطار)، by car (بالسيارة)، by plane (بالطائرة)، by boat (بالقارب)، by bike (بالدراجة).',
				'الاستثناء الوحيد المهم: المشي على الأقدام يأخذ «on» وليس «by»: نقول «I go to the mosque on foot.».',
				'وجهات جزائرية رائعة للسفر في العطلة: Bejaia (بجاية)، Oran (وهران)، Tlemcen (تلمسان)، Ghardaia (غرداية)، Constantine (قسنطينة)، Tassili (الطاسيلي).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Prepositions of Transport: by vs on',
				rootLabel: 'How do you travel?',
				rootSub: 'قاعدة حروف الجر مع وسائل النقل',
				branches: [
					{ label: 'Land (البر)', rule: 'by + vehicle', example: 'by bus / by train / by car', color: '#1d4ed8' },
					{ label: 'Air and Sea', rule: 'by + vehicle', example: 'by plane / by boat', color: '#047857' },
					{ label: 'Walking (المشي)', rule: 'on + foot', example: 'I walk / go on foot.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'الفرق الذهبي بين by مع المركبات و on مع foot',
			examples: [
				{
					problemAr: 'أكمل بـ by أو on: My school is near my house, so I go ............ foot.',
					solutionAr: 'My school is near my house, so I go on foot.'
				},
				{
					problemAr: 'أجب عن السؤال: How does your family travel to Ghardaia? (bus)',
					solutionAr: 'My family travels to Ghardaia by bus.'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين: لا تقل «by foot» (الصواب on foot)، ولا تضع «the» بعد by في «by the bus» (الصواب by bus مباشرة).'
		},
		practice: [
			{
				questionAr: 'Complete: I live near my school. I go to school ............ foot.',
				options: ['by', 'on', 'in', 'at'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نستعمل by مع المركبات وليس مع foot.',
					'أحسنت! المشي على الأقدام يأخذ دائماً: on foot.',
					'in لا تُستعمل مع foot.',
					'at للساعات والأماكن وليس مع foot.'
				],
				explanationAr: 'The fixed expression for walking is always: on foot.'
			},
			{
				questionAr: 'Complete: Next holiday, we travel to Bejaia ............ train.',
				options: ['on', 'at', 'by', 'under'],
				correctIndex: 2,
				diagnosticFeedback: [
					'on هنا مع foot فقط في منهج 5AP.',
					'at لا تُستعمل مع وسائل النقل.',
					'ممتاز! مع وسائل النقل نستعمل by: by train.',
					'under حرف مكان يعني تحت.'
				],
				explanationAr: 'We use by + transport: by train, by bus, by car, by plane.'
			},
			{
				questionAr: 'Which question asks about the means of transport?',
				options: [
					'Who do you go to Oran?',
					'How do you go to Oran?',
					'When is your bag?',
					'What is your name?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Who تسأل عن شخص.',
					'أحسنت! نسأل عن وسيلة السفر بأداة الاستفهام How.',
					'When تسأل عن الوقت.',
					'What is your name تسأل عن الاسم.'
				],
				explanationAr: 'We use How to ask about means of transport: How do you go to Oran?'
			},
			{
				questionAr: 'Which means of transport is the fastest to travel to Tassili in the far south of Algeria?',
				options: ['By bike', 'On foot', 'By plane', 'By boat'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الدراجة للمسافات القصيرة فقط.',
					'المشي للمسافات القريبة.',
					'ممتاز! الطائرة (by plane) أسرع وسيلة للسفر إلى أقصى الجنوب.',
					'الطاسيلي منطقة صحراوية جبلية وليس بها بحر.'
				],
				explanationAr: 'A plane is the fastest means of transport for long distances.'
			},
			{
				questionAr: 'Choose the sentence with NO mistakes:',
				options: [
					'He goes to the mosque by foot.',
					'He goes to the mosque on foot.',
					'He goes to the mosque by the car.',
					'He go to the mosque by bus.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نقول by foot بل on foot.',
					'أحسنت! He goes (مع es) و on foot صحيحة تماماً.',
					'لا نضع the بين by و car (الصواب by car).',
					'مع He نكتب goes وليس go.'
				],
				explanationAr: 'He goes to the mosque on foot. has both correct verb conjugation and correct preposition.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Future Holiday Plans with "Going To"
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t3_going_to_holidays',
		slug: 'eng-5ap-t3-going-to-holidays',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: العطل والسفر والفصول وتقييم المكتسبات (Holidays, Seasons and Competency Evaluation)',
		order: 3,
		titleAr: 'التخطيط للعطلة بالمستقبل القريب (Holiday Plans with Going To)',
		objectives: [
			'التعبير عن خطط العطلة المستقبلية باستعمال «am / is / are + going to + الفعل المجرد».',
			'صياغة الجملة المنفية بـ «am not / is not / are not + going to».',
			'استعمال المؤشرات الزمنية للمستقبل (next summer, next week, next holiday, tomorrow).'
		],
		keywordsAr: ['المستقبل', 'going to', 'Holiday Plans', 'next summer', 'Algeria'],
		discover: {
			scenarioAr:
				'تتحدث خديجة عن خطتها لعطلة الصيف القادمة: «Next summer, I am going to visit my grandparents in Tlemcen. My father is going to drive our car. We are going to see the Great Mosque and walk in the green parks.»',
			svg: svgEnglishGrammarMap({
				title: 'Future Plans: be + going to + Base Verb',
				rootLabel: 'Subject + am / is / are + going to + Verb',
				rootSub: 'للتعبير عن خطط ومشاريع العطلة القادمة',
				branches: [
					{ label: 'I', rule: 'am going to + Verb', example: 'I am going to visit Oran.', color: '#1d4ed8' },
					{ label: 'He / She / It', rule: 'is going to + Verb', example: 'He is going to swim.', color: '#047857' },
					{ label: 'You / We / They', rule: 'are going to + Verb', example: 'We are going to travel.', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي تدل على المستقبل في جملة خديجة الأولى؟',
					hintAr: 'الكلمتان الأوليان في الجملة.',
					expectedInput: 'Next summer',
					revealAr: 'العبارة «Next summer» (الصيف القادم) تدل على المستقبل، ومثلها «tomorrow» و«next holiday».'
				},
				{
					promptAr: 'ما الفعل المساعد الذي جاء قبل «going to» مع «I» ومع «My father» ومع «We»؟',
					hintAr: 'إنه فعل الكينونة to be.',
					expectedInput: 'am, is, are',
					revealAr: 'استعملنا «am» مع I، و«is» مع My father (He)، و«are» مع We.'
				},
				{
					promptAr: 'ما شكل الفعل الذي جاء بعد «going to» في «going to visit» و«going to drive»؟',
					hintAr: 'هل أضفنا له s أو ing؟',
					expectedInput: 'فعل مجرد (Base Verb)',
					revealAr: 'بعد «going to» يأتي الفعل دائماً مجرداً في أصله بلا s ولا ing: going to visit, going to swim.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية للمستقبل القريب (الخطط): «الفاعل + am / is / are + going to + الفعل المجرد».',
				'الإثبات: «I am going to visit Bejaia.» / «She is going to read stories.» / «They are going to travel by train.».',
				'النفي: نضع «not» بعد فعل الكينونة: «He is not going to travel by plane.» / «We are not going to stay at home.».',
				'المؤشرات الزمنية للمستقبل: tomorrow (غداً)، next week (الأسبوع القادم)، next summer (الصيف القادم)، next holiday (العطلة القادمة).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Planning My Algerian Holiday',
				steps: [
					{ stage: 'When and Where', detail: 'Next summer, I am going to visit Bejaia.', color: '#1d4ed8' },
					{ stage: 'How (Transport)', detail: 'My family is going to travel by train.', color: '#047857' },
					{ stage: 'Weather', detail: 'The weather is sunny and warm.', color: '#b45309' },
					{ stage: 'Activities', detail: 'We are going to swim and visit green parks.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خطة التعبير عن مشروع العطلة باستعمال going to',
			examples: [
				{
					problemAr: 'صرّف الفعل في المستقبل بـ going to: Next week, Amin (visit) Constantine.',
					solutionAr: 'Next week, Amin is going to visit Constantine.'
				},
				{
					problemAr: 'حوّل إلى النفي: They are going to travel by bus.',
					solutionAr: 'They are not going to travel by bus.'
				}
			],
			watchOutAr:
				'لا تنسَ أبداً فعل الكينونة (am / is / are) قبل «going to»! خطأ أن نكتب «I going to visit Oran»، والصواب «I am going to visit Oran».'
		},
		practice: [
			{
				questionAr: 'Complete: Next summer, I ............ visit Bejaia with my family.',
				options: ['is going to', 'am going to', 'are going to', 'going to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'is تأتي مع He / She / It وليس I.',
					'أحسنت! مع I نستعمل: am going to + base verb.',
					'are تأتي مع You / We / They.',
					'لا بد من وجود الفعل المساعد am قبل going to.'
				],
				explanationAr: 'With I, the future plan structure is: I am going to + base verb.'
			},
			{
				questionAr: 'Complete: Next Friday, Karim is going to ............ football with his friends.',
				options: ['plays', 'playing', 'play', 'played'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد going to لا نضيف s للفعل.',
					'بعد going to لا نضيف ing للفعل.',
					'ممتاز! بعد going to نضع الفعل المجرد دائماً: play.',
					'played في الماضي ولا تأتي بعد going to.'
				],
				explanationAr: 'Always use the base verb after going to: is going to play.'
			},
			{
				questionAr: 'Complete: My parents ............ travel to Ghardaia by bus next spring.',
				options: ['is going to', 'am going to', 'are going to', 'be going to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'My parents جمع (They) فلا نضع is.',
					'am خاصة بالضمير I فقط.',
					'أحسنت! My parents = They لذلك نكتب: are going to.',
					'يجب تصريف be إلى are مع الجمع.'
				],
				explanationAr: 'My parents equals They, so we use are going to.'
			},
			{
				questionAr: 'Choose the correct negative sentence:',
				options: [
					'She not going to swim.',
					'She is not going to swim.',
					'She does not going to swim.',
					'She are not going to swim.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها الفعل المساعد is.',
					'أحسنت! نضع not بعد is: She is not going to swim.',
					'لا نستعمل does مع going to.',
					'She مفرد فتأخذ is وليس are.'
				],
				explanationAr: 'Negative of is going to is: is not going to + base verb.'
			},
			{
				questionAr: 'Which time marker fits a future holiday plan with «going to»?',
				options: ['Yesterday', 'Last year', 'Next summer', 'Last Monday'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Yesterday تدل على الماضي.',
					'Last year تدل على الماضي.',
					'ممتاز! Next summer (الصيف القادم) مؤشر زمني للمستقبل.',
					'Last Monday تدل على الماضي.'
				],
				explanationAr: 'Next summer refers to the future, matching be + going to.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: Writing a Guided Paragraph from a Fact File
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t3_fact_file_writing',
		slug: 'eng-5ap-t3-fact-file-writing',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: العطل والسفر والفصول وتقييم المكتسبات (Holidays, Seasons and Competency Evaluation)',
		order: 4,
		titleAr: 'كتابة فقرة موجهة من بطاقة معلومات (Writing a Paragraph from a Fact File)',
		objectives: [
			'قراءة بطاقة المعلومات (Fact File) واستثمار جميع خاناتها (Name, Age, Hometown, Job / Dream Job, Hobbies).',
			'تحويل كل سطر في البطاقة إلى جملة إنجليزية كاملة وصحيحة نحوياً وإملائياً.',
			'التمييز بين الكتابة بضمير المتكلم (I / My) والكتابة بضمير الغائب (He / She / His / Her).'
		],
		keywordsAr: ['بطاقة المعلومات', 'Fact File', 'Guided Paragraph', 'Written Production'],
		discover: {
			scenarioAr:
				'في اختبارات السنة الخامسة ابتدائي، يُعطى للتلميذ جدول صغير يُسمّى «Fact File» فيه: Name: Bilal / Age: 10 / Hometown: Oran / Dream Job: Doctor / Hobbies: Reading, Swimming. كيف نحول هذا الجدول إلى فقرة جميلة من 5 جمل؟',
			svg: svgEnglishWritingStructure({
				title: 'From Fact File to a Great 5AP Paragraph',
				steps: [
					{ stage: 'Name and Age', detail: 'Hello! My name is Bilal. I am ten years old.', color: '#1d4ed8' },
					{ stage: 'Hometown', detail: 'I live in Oran, a beautiful city in Algeria.', color: '#047857' },
					{ stage: 'Job / Dream Job', detail: 'I want to be a doctor to help sick people.', color: '#b45309' },
					{ stage: 'Hobbies', detail: 'In my free time, I like reading and swimming.', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'إذا طلب منك السؤال التعريف بنفسك، أي ضمير تستعمله؟ وإذا طلب التعريف بصديقك بلال؟',
					hintAr: 'قارن بين المتكلم والغائب المذكر.',
					expectedInput: 'I / He',
					revealAr: 'عند التعريف بنفسي أستعمل «I / My»، وعند التعريف بصديقي بلال أستعمل «He / His»، ولصديقتي «She / Her».'
				},
				{
					promptAr: 'كيف نحوّل خانة «Age: 10» إلى جملة إنجليزية صحيحة بضمير الغائب (He)؟',
					hintAr: 'تذكّر أن العمر يأخذ فعل الكينونة to be.',
					expectedInput: 'He is ten years old.',
					revealAr: 'نكتب: «He is ten years old.» (أو «I am ten years old.» بضمير المتكلم).'
				},
				{
					promptAr: 'كيف نحوّل خانة «Hobbies: Reading, Swimming» إلى جملة كاملة؟',
					hintAr: 'استعمل الفعل like أو likes.',
					expectedInput: 'He likes reading and swimming.',
					revealAr: 'نكتب: «He likes reading and swimming.» (أو «I like reading and swimming.»).'
				}
			]
		},
		summary: {
			rulesAr: [
				'لا تترك أي معلومة في بطاقة المعلومات (Fact File)! حوّل كل خانة إلى جملة تامة تبدأ بحرف كبير وتنتهي بنقطة.',
				'للتحويل بضمير المتكلم (I): «My name is ... . I am ... years old. I live in ... . My father is a ... . I want to be a ... . I like ... .».',
				'للتحويل بضمير الغائب (He / She): «His/Her name is ... . He/She is ... years old. He/She lives in ... . He/She wants to be a ... . He/She likes ... .».',
				'احذر من نسخ الجدول كما هو على شكل نقاط! يجب كتابة فقرة متصلة الجمل باستعمال أدوات ربط بسيطة مثل «and».'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing the Right Pronoun for Your Paragraph',
				rootLabel: 'Read the Prompt Carefully!',
				rootSub: 'هل الفقرة عنك أم عن صديقك؟',
				branches: [
					{ label: 'About Yourself', rule: 'I / My / am / live / like', example: 'I live in Setif. I like chess.', color: '#1d4ed8' },
					{ label: 'About a Boy', rule: 'He / His / is / lives / likes', example: 'He lives in Oran. He likes football.', color: '#047857' },
					{ label: 'About a Girl', rule: 'She / Her / is / lives / likes', example: 'She lives in Tlemcen. She likes reading.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'الفرق بين ضمير المتكلم وضمير الغائب عند تحويل Fact File إلى فقرة',
			examples: [
				{
					problemAr: 'حوّل الخانات التالية إلى جملتين عن مريم: Hometown: Tlemcen / Dream Job: Teacher.',
					solutionAr: 'She lives in Tlemcen. She wants to be a teacher.'
				},
				{
					problemAr: 'حوّل الخانات التالية إلى جملتين عن نفسك: Father Job: Baker / Holiday Plan: Visit Bejaia.',
					solutionAr: 'My father is a baker. Next summer, I am going to visit Bejaia.'
				}
			],
			watchOutAr:
				'بعد كتابة الفقرة، راجع 3 أمور قبل تسليم الورقة: 1) الحروف الكبيرة في البداية ومع الأسماء والمدن، 2) النقاط بين الجمل، 3) إضافة s للفعل مع He / She (lives, likes, wants).'
		},
		practice: [
			{
				questionAr: 'Fact File says «Hometown: Ghardaia». Write a sentence about your friend Youssef:',
				options: [
					'He live in Ghardaia.',
					'He lives in Ghardaia.',
					'He is live in Ghardaia.',
					'His lives in Ghardaia.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع He نحتاج إضافة s للفعل live.',
					'أحسنت! He lives in Ghardaia.',
					'لا نجمع بين is و live هنا.',
					'His صفة ملكية وليست ضمير فاعل.'
				],
				explanationAr: 'With He in Present Simple, we add -s: He lives in Ghardaia.'
			},
			{
				questionAr: 'Fact File says «Dream Job: Engineer». Write a sentence about yourself:',
				options: [
					'I want to be a engineer.',
					'I want to be an engineer.',
					'I wants to be an engineer.',
					'My want to be an engineer.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'engineer تبدأ بحرف متحرك e فتأخذ an وليس a.',
					'ممتاز! I want to be an engineer.',
					'مع I لا نضيف s للفعل want.',
					'نبدأ بضمير الفاعل I وليس My.'
				],
				explanationAr: 'I want to be + an engineer (vowel sound /e/).'
			},
			{
				questionAr: 'Fact File says «Hobbies: Reading, Chess». Which sentence is correct for Khadidja?',
				options: [
					'She like reading and chess.',
					'She likes reading and playing chess.',
					'Her likes reading and chess.',
					'She is like reading and chess.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع She نضيف s للفعل like.',
					'أحسنت! She likes reading and playing chess.',
					'Her صفة ملكية وليست ضمير فاعل.',
					'لا نضع is قبل like.'
				],
				explanationAr: 'With She, we write: She likes reading and playing chess.'
			},
			{
				questionAr: 'Which mistake should you AVOID when writing from a Fact File?',
				options: [
					'Using capital letters for Algerian cities',
					'Copying the table list without making full sentences',
					'Checking full stops at the end of sentences',
					'Using «and» to connect two hobbies'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'استعمال الحروف الكبيرة للمدن عمل صحيح ومطلوب.',
					'ممتاز! يجب عدم نسخ الجدول كقائمة نقاط، بل تحويله إلى فقرة بجمل تامة.',
					'مراجعة النقاط أمر مهم جداً.',
					'الربط بـ and يجعل الفقرة أكثر انسجاماً.'
				],
				explanationAr: 'Always turn Fact File notes into complete, connected sentences instead of copying bullet points.'
			},
			{
				questionAr: 'Fact File says «Name: Amin / Age: 11». Which opening is best for Amin introducing himself?',
				options: [
					'Name Amin age 11.',
					'Hello! My name is Amin. I am eleven years old.',
					'Hello! My name are Amin. I have eleven years.',
					'His name is Amin. He am eleven.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تفتقر للأفعال والترقيم.',
					'أحسنت! تحية لطيفة، ثم My name is Amin و I am eleven years old.',
					'نستعمل is مع My name و am للعمر وليس have.',
					'أمين يقدم نفسه بـ My / I، كما أن He تأخذ is.'
				],
				explanationAr: 'Hello! My name is Amin. I am eleven years old. is clear, polite, and grammatically accurate.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: 5AP Competency Evaluation Guide (امتحان تقييم المكتسبات 2024-2025)
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t3_competency_eval_2025',
		slug: 'eng-5ap-t3-competency-eval-2025',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: العطل والسفر والفصول وتقييم المكتسبات (Holidays, Seasons and Competency Evaluation)',
		order: 5,
		titleAr: 'منهجية امتحان تقييم المكتسبات في اللغة الإنجليزية (5AP Competency Evaluation Guide)',
		objectives: [
			'التعرف على الهيكلة الجديدة لامتحان تقييم المكتسبات في اللغة الإنجليزية للسنة الخامسة ابتدائي (2024-2025).',
			'إتقان استراتيجية التعامل مع الكفاءات الثلاث: فهم المكتوب، التحكم في اللغة، والإنتاج الكتابي الموجه من بطاقة معلومات.',
			'فهم شبكة مستويات التملك الأربعة (أقصى A / مقبول B / جزئي C / أدنى D) ومعرفة شروط نيل التملك الأقصى.'
		],
		keywordsAr: ['تقييم المكتسبات', 'Competency Evaluation', 'تملك أقصى', '5AP', 'Fact File'],
		discover: {
			scenarioAr:
				'في نهاية السنة الخامسة ابتدائي، يجتاز التلميذ الجزائري «امتحان تقييم المكتسبات في اللغة الإنجليزية» الذي لا يكتفي بنقطة عددية فقط، بل يقيّم تمكّنك الفعلي في 3 أجزاء متكاملة وفق 4 مستويات تملك (A / B / C / D). تعرّف على أسرار التفوق فيه.',
			svg: svgEnglishWritingStructure({
				title: '5AP English Competency Evaluation Structure',
				steps: [
					{ stage: 'Part 1: Reading', detail: 'Comprehension: Global idea, True/False, Wh-Questions', color: '#1d4ed8' },
					{ stage: 'Part 2: Language', detail: 'Grammar, Articles, Prepositions, Plurals, Final -s', color: '#047857' },
					{ stage: 'Part 3: Writing', detail: 'Guided short paragraph from a Fact File (4-6 sentences)', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الأجزاء الثلاثة التي يتكون منها موضوع امتحان تقييم المكتسبات في الإنجليزية؟',
					hintAr: 'انظر إلى المخطط الأخضر أعلاه.',
					expectedInput: 'فهم المكتوب، التحكم في اللغة، الإنتاج الكتابي',
					revealAr: 'يتكون من: 1) Reading Comprehension (فهم المكتوب)، 2) Linguistic Competence / Mastery of Language (التحكم في اللغة)، 3) Guided Written Production (الإنتاج الكتابي الموجه).'
				},
				{
					promptAr: 'ما أعلى مستوى تملك في شبكة تقويم امتحان تقييم المكتسبات؟ وما رمزه؟',
					hintAr: 'المستويات الأربعة مرتبة من A إلى D.',
					expectedInput: 'تملك أقصى (A)',
					revealAr: 'أعلى مستوى هو «التملك الأقصى» ورمزه (A / Maximum Mastery)، يليه المقبول (B)، ثم الجزئي (C)، ثم الأدنى (D).'
				},
				{
					promptAr: 'قبل أن تجيب عن أسئلة فهم النص (Reading Comprehension)، كم مرة يُنصح بقراءة النص؟',
					hintAr: 'قراءة واحدة سريعة قد تجعلك تفوّت تفصيلاً مهماً.',
					expectedInput: 'مرتين أو ثلاثاً',
					revealAr: 'اقرأ النص مرتين على الأقل بهدوء، وسطّر الكلمات المفتاحية (الاسم، المدينة، المهنة، الفصل، وسيلة النقل) قبل الإجابة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجزء الأول (Reading Comprehension — فهم المكتوب): اقرأ النص مرتين، وحدد موضوعه العام، ثم أجب عن أسئلة True / False بالرجوع حرفياً إلى النص، وأجب عن أسئلة Who / Where / What / When بجمل قصيرة ودقيقة.',
				'الجزء الثاني (Linguistic Competence — التحكم في اللغة): راجع قواعد السنة الخامسة الأساسية: المضارع البسيط (he/she + s و does not)، فعل to be و to have، أدوات النكرة a/an، حروف المكان (next to, opposite, between)، الجمع ونطق Final -s، والمستقبل (going to) ووسائل النقل (by / on foot).',
				'الجزء الثالث (Guided Written Production — الإنتاج الكتابي): استثمر كل خانات بطاقة المعلومات (Fact File) في فقرة من 4 إلى 6 جمل مترابطة مع احترام الضمير المطلوب (I أو He/She) والحروف الكبيرة وعلامات الترقيم.',
				'مستويات التملك الأربعة: التملك الأقصى (A — إجابة كاملة ودقيقة بلا أخطاء مؤثرة)، التملك المقبول (B — إجابة صحيحة مع أخطاء طفيفة)، التملك الجزئي (C — نقص في بعض العناصر أو أخطاء متعددة)، التملك الأدنى (D — عدم الفهم أو الخروج عن المطلوب).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Four Official Mastery Levels (شبكة التملك الأربعة)',
				rootLabel: '5AP Competency Assessment Scale',
				rootSub: 'تقدير الكفاءات في تقييم المكتسبات',
				branches: [
					{ label: 'Level A (أقصى)', rule: 'Maximum Mastery', example: 'Full, accurate, neat', color: '#047857' },
					{ label: 'Level B (مقبول)', rule: 'Acceptable Mastery', example: 'Good with minor slips', color: '#1d4ed8' },
					{ label: 'Level C (جزئي)', rule: 'Partial Mastery', example: 'Incomplete / several errors', color: '#d97706' },
					{ label: 'Level D (أدنى)', rule: 'Minimum Mastery', example: 'Off-topic / very weak', color: '#dc2626' }
				]
			}),
			visualCaptionAr: 'مستويات التملك الأربعة في امتحان تقييم المكتسبات للسنة الخامسة ابتدائي',
			examples: [
				{
					problemAr: 'كيف تضمن التملك الأقصى (A) في معيار «الملاءمة» (Relevance) في الإنتاج الكتابي؟',
					solutionAr: 'باحترام الموضوع المطلوب وتوظيف جميع معطيات بطاقة المعلومات (Fact File) دون إهمال أي خانة.'
				},
				{
					problemAr: 'كيف تضمن التملك الأقصى (A) في معيار «سلامة اللغة والترقيم»؟',
					solutionAr: 'بتصريف الأفعال تصريفاً صحيحاً، واستعمال a/an و by/on بدقة، والبدء بحرف كبير وإنهاء كل جملة بنقطة.'
				}
			],
			watchOutAr:
				'تذكّر! نظافة الورقة ووضوح الخط الإنجليزي (كتابة الحروف على السطر مع ترك فراغ بين الكلمات) معيار أساسي يدخل في نيل التملك الأقصى (A).'
		},
		practice: [
			{
				questionAr: 'How many mastery levels are used in the 5AP Competency Evaluation grid?',
				options: ['Two levels (A, B)', 'Three levels (A, B, C)', 'Four levels (A, B, C, D)', 'Six levels'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الشبكة الرسمية فيها أربعة مستويات وليس اثنين.',
					'يوجد مستوى رابع هو التملك الأدنى (D).',
					'أحسنت! أربعة مستويات: تملك أقصى (A)، مقبول (B)، جزئي (C)، أدنى (D).',
					'ليست ستة بل أربعة مستويات فقط.'
				],
				explanationAr: 'The official 5AP Competency Evaluation uses 4 mastery levels: A (Maximum), B (Acceptable), C (Partial), and D (Minimum).'
			},
			{
				questionAr: 'What should you do FIRST when solving the Reading Comprehension part?',
				options: [
					'Guess True or False without reading',
					'Read the text twice and underline key facts',
					'Copy the whole text as your answer',
					'Skip the text and write random words'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التخمين العشوائي يؤدي إلى أخطاء كثيرة.',
					'ممتاز! قراءة النص مرتين وتسطير المعلومات المفتاحية يضمن الفهم الدقيق.',
					'نسخ النص كاملاً ليس إجابة صحيحة.',
					'لا يمكن الإجابة عن أسئلة الفهم دون قراءة النص.'
				],
				explanationAr: 'Reading the passage twice and locating key facts leads to Maximum Mastery (A).'
			},
			{
				questionAr: 'Which criterion guarantees Maximum Mastery (A) in Guided Written Production?',
				options: [
					'Using all Fact File details in 4 to 6 accurate, punctuated sentences',
					'Writing one word per line without verbs',
					'Leaving out capital letters and full stops',
					'Writing about a completely different topic'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! استثمار كل خانات البطاقة في جمل كاملة سليمة ومنظمة يحقق التملك الأقصى (A).',
					'الكلمات المفردة بلا أفعال لا تشكل فقرة سليمة.',
					'غياب الحروف الكبيرة والنقاط يخفض مستوى التملك.',
					'الخروج عن الموضوع يعطي تملكاً أدنى (D).'
				],
				explanationAr: 'Maximum Mastery (A) requires relevance, complete sentences using the Fact File, accurate grammar, and neat punctuation.'
			},
			{
				questionAr: 'Which of these belongs to Part 2 (Linguistic Competence / Mastery of Language)?',
				options: [
					'Giving a title to the reading text',
					'Saying True or False about the story',
					'Conjugating Present Simple verbs and classifying final -s sounds',
					'Drawing a picture of a bus'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'اختيار العنوان ينتمي لفهم المكتوب (Part 1).',
					'صح أو خطأ ينتمي لفهم المكتوب (Part 1).',
					'ممتاز! تصريف الأفعال وقواعد الجمع ونطق -s تنتمي للتحكم في اللغة (Part 2).',
					'الرسم ليس من أسئلة التحكم اللغوي.'
				],
				explanationAr: 'Grammar, spelling, articles, prepositions, and final -s pronunciation are tested in Linguistic Competence.'
			},
			{
				questionAr: 'In the 4-level evaluation scale, what does Level A mean?',
				options: [
					'Minimum Mastery (تملك أدنى)',
					'Partial Mastery (تملك جزئي)',
					'Maximum Mastery (تملك أقصى)',
					'No answer submitted'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'التملك الأدنى رمزه D.',
					'التملك الجزئي رمزه C.',
					'أحسنت! المستوى A يعني التملك الأقصى (Maximum Mastery).',
					'غياب الإجابة لا يمنح المستوى A.'
				],
				explanationAr: 'Level A stands for Maximum Mastery (التملك الأقصى), the highest competency rating.'
			}
		]
	}
];
