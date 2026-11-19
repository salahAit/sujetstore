import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AM_T1: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Physical Description & Personality Adjectives
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t1_appearance_personality',
		slug: 'eng-2am-t1-appearance-personality',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي وعائلتي — Me, My Friends and My Family',
		order: 1,
		titleAr: 'الوصف الجسدي وصفات الشخصية (Physical Description & Personality Adjectives)',
		objectives: [
			'التمييز الدقيق بين استعمال (to be) واستعمال (have got / has got) في الوصف الجسدي',
			'توظيف صفات الشخصية الإيجابية (polite, helpful, honest, tidy, kind) لوصف الأصدقاء والأسرة',
			'السؤال عن الشكل الخارجي (What does he look like?) وعن الأخلاق والشخصية (What is he like?)'
		],
		keywordsAr: ['Physical Appearance', 'Personality Adjectives', 'tall / slim', 'polite / helpful', 'has got'],
		discover: {
			scenarioAr:
				'يصف عمر صديقه المقرب في المتوسطة قائلا: "My best friend is Bilal. He is tall and slim. He has got short black hair and brown eyes. He is very polite, honest, and helpful." لاحظ متى استعمل عمر "is" ومتى استعمل "has got".',
			svg: svgEnglishGrammarMap({
				title: 'Describing a Person: Appearance vs Personality',
				rootLabel: 'Describing a Friend or Family Member',
				rootSub: 'Use is with adjectives and has got with hair / eyes',
				branches: [
					{
						label: 'Height & Build (is)',
						rule: 'Subject + is + adjective',
						example: 'He is tall and slim.',
						color: '#1d4ed8'
					},
					{
						label: 'Hair & Eyes (has got)',
						rule: 'Subject + has got + adj + noun',
						example: 'She has got brown eyes.',
						color: '#047857'
					},
					{
						label: 'Personality (is)',
						rule: 'Good manners & character',
						example: 'He is polite and helpful.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الذي استعمله عمر لوصف الطول والبنية (tall and slim)؟',
					hintAr: 'اقرأ الجملة الثانية في النص: He ...... tall and slim.',
					expectedInput: 'is',
					revealAr: 'استعمل فعل الكينونة "is" لأن (tall, slim) صفات للقامة والبنية.'
				},
				{
					promptAr: 'ما الفعل الذي استعمله عمر لوصف الشعر والعينين (short black hair and brown eyes)؟',
					hintAr: 'تأمل الجملة الثالثة: He ...... short black hair.',
					expectedInput: 'has got',
					revealAr: 'نستعمل "has got" (أو have got) عند وصف الشعر والعينين واللحية والنظارات.'
				},
				{
					promptAr: 'استخرج ثلاث صفات أخلاقية (Personality adjectives) ذُكرت في وصف بلال.',
					hintAr: 'اقرأ الجملة الأخيرة في كلام عمر.',
					expectedInput: 'polite, honest, helpful',
					revealAr: 'الصفات الأخلاقية هي: polite (مؤدب)، honest (صادق)، helpful (متعاون).'
				}
			]
		},
		summary: {
			rulesAr: [
				'وصف القامة والبنية والعمر بـ (to be): tall (طويل)، short (قصير)، of medium height (متوسط القامة)، slim (نحيف)، strong (قوي).',
				'وصف الشعر والعينين بـ (have got / has got): short black hair (شعر أسود قصير)، big brown eyes (عينان بنيتان كبيرتان)، glasses (نظارات).',
				'ترتيب الصفات قبل الشعر والعينين: الطول أو الحجم أولا، ثم اللون، ثم الاسم (short black hair — big brown eyes).',
				'صفات الشخصية الإيجابية (to be): polite (مؤدب)، helpful (متعاون)، honest (صادق)، kind (لطيف)، clever (ذكي)، tidy (منظّم)، calm (هادئ).',
				'الفرق في السؤال: "What does he look like?" يسأل عن الشكل الخارجي، أما "What is he like?" فيسأل عن الشخصية والأخلاق.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Describing a Friend in 4 Clear Sentences',
				steps: [
					{ stage: 'Name & Age', detail: 'My best friend is Meriem. She is 12 years old.' },
					{ stage: 'Height & Build', detail: 'She is tall and slim.' },
					{ stage: 'Hair & Eyes', detail: 'She has got big brown eyes and a warm smile.' },
					{ stage: 'Personality', detail: 'She is polite, tidy, and helpful to everyone.' }
				]
			}),
			visualCaptionAr: 'نموذج جاهز من أربع جمل واضحة لوصف صديق في الشكل والأخلاق',
			examples: [
				{
					problemAr: 'أكمل بـ (is / has got): "Amina ...... of medium height. She ...... big black eyes. She ...... very kind."',
					solutionAr: 'Amina is of medium height. She has got big black eyes. She is very kind.'
				},
				{
					problemAr: 'رتّب الكلمات لتكوين جملة وصفية سليمة: (hair / got / short / has / Yusuf / black).',
					solutionAr: 'Yusuf has got short black hair.'
				}
			],
			watchOutAr:
				'انتبه! لا تقل "He is black eyes" ولا تقل "He has got tall"! القامة والأخلاق تأخذ دائما (am / is / are)، أما الشعر والعينان فتأخذ دائما (have got / has got).'
		},
		practice: [
			{
				questionAr: 'اختر الفعل الصحيح للوصف: "My brother Hamza ...... short dark hair."',
				options: ['is', 'are', 'has got', 'am'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نستعمل is لوصف الشعر، بل للقامة والشخصية.',
					'are للجمع ولا تستعمل لوصف الشعر.',
					'أحسنت! لوصف الشعر والعينين مع المفرد الغائب نستعمل has got.',
					'am للضمير I فقط.'
				],
				explanationAr: 'وصف الشعر والعينين يستعمل دائما have got أو has got.'
			},
			{
				questionAr: 'اختر الترتيب الصحيح للصفات قبل كلمة (eyes):',
				options: [
					'brown big eyes',
					'big brown eyes',
					'eyes big brown',
					'brown eyes big'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحجم (big) يأتي قبل اللون (brown).',
					'ممتاز! الحجم أولا ثم اللون ثم الاسم: big brown eyes.',
					'في الإنجليزية تأتي الصفة قبل الاسم وليس بعده.',
					'يجب وضع الصفتين قبل الاسم.'
				],
				explanationAr: 'الترتيب القياسي للصفات في الإنجليزية هو: الحجم/الطول ثم اللون ثم الاسم.'
			},
			{
				questionAr: 'ما معنى الصفة "helpful" عند وصف صديقك؟',
				options: ['كسول', 'متعاون ومحب للمساعدة', 'غاضب', 'فوضوي'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كسول هي lazy.',
					'أحسنت! helpful تعني متعاون ومساعد للآخرين.',
					'غاضب هي angry.',
					'فوضوي هي messy.'
				],
				explanationAr: 'الصفة helpful مشتقة من help (يساعد) وتعني متعاون ومفيد.'
			},
			{
				questionAr: 'ما السؤال الصحيح للاستفسار عن أخلاق وشخصية زميلتك؟',
				options: [
					'What does she look like?',
					'What is she like?',
					'How old is she?',
					'Where does she live?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا السؤال يسأل عن الشكل الجسدي الخارجي.',
					'ممتاز! What is she like? تسأل عن الشخصية والأخلاق.',
					'هذا السؤال عن العمر.',
					'هذا السؤال عن مكان السكن.'
				],
				explanationAr: 'نفرق بين: What does she look like (الشكل) و What is she like (الشخصية).'
			},
			{
				questionAr: 'اختر الصفة المضادة (Opposite) لكلمة "polite" (مؤدب):',
				options: ['tidy', 'honest', 'rude', 'calm'],
				correctIndex: 2,
				diagnosticFeedback: [
					'tidy تعني مرتب (ضدها messy).',
					'honest تعني صادق (ضدها dishonest).',
					'أحسنت! ضد polite هو rude (أو impolite).',
					'calm تعني هادئ (ضدها noisy).'
				],
				explanationAr: 'ضد الصفة polite هو rude أو impolite.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Present Simple vs Present Continuous
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t1_present_simple_vs_continuous',
		slug: 'eng-2am-t1-present-simple-vs-continuous',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي وعائلتي — Me, My Friends and My Family',
		order: 2,
		titleAr: 'المقارنة بين المضارع البسيط والمضارع المستمر (Present Simple vs Present Continuous)',
		objectives: [
			'التمييز بين العادة الدائمة (Present Simple) والحدث الجاري الآن (Present Continuous)',
			'التعرف على المؤشرات الزمنية (Time Markers) لكل زمن لتصريف الفعل الصحيح في الامتحان',
			'تصريف الأفعال بدقة في الإثبات والنفي والاستفهام في الزمنين'
		],
		keywordsAr: ['Present Simple', 'Present Continuous', 'Time Markers', 'Habits vs Now'],
		discover: {
			scenarioAr:
				'قارن بين جملتي خديجة: "Every afternoon, I revise my lessons in my room. Right now, I am helping my mother in the kitchen." لاحظ كيف تغير شكل الفعل بتغير المؤشر الزمني.',
			svg: svgEnglishTenseTimeline({
				title: 'Habits vs Happening Now',
				tenseName: 'Simple vs Continuous',
				formula: 'Habit: V / V+s  |  Right Now: am/is/are + V-ing',
				activeZone: 'present',
				example: 'He usually reads at 5:00, but now he is writing a letter.',
				markers: 'Simple: every day, always, usually | Continuous: now, at the moment, Look!'
			}),
			steps: [
				{
					promptAr: 'ما المؤشر الزمني في الجملة الأولى ("Every afternoon, I revise...")؟ وما الزمن المناسب له؟',
					hintAr: 'هل يدل على عادة متكررة أم على هذه اللحظة فقط؟',
					expectedInput: 'Every afternoon — Present Simple',
					revealAr: 'المؤشر "Every afternoon" يدل على التكرار والروتين، لذلك استعملنا المضارع البسيط (revise).'
				},
				{
					promptAr: 'ما المؤشر الزمني في الجملة الثانية ("Right now, I am helping...")؟ وما الزمن المناسب له؟',
					hintAr: 'كلمة right now تعني في هذه اللحظة تماما.',
					expectedInput: 'Right now — Present Continuous',
					revealAr: 'المؤشر "Right now" يدل على حدث يقع الآن، لذلك استعملنا المضارع المستمر (am helping).'
				},
				{
					promptAr: 'لو كان الفاعل "My sister" في الجملتين، كيف نكتب الفعلين (revise) و (help)؟',
					hintAr: 'تذكّر نهاية (-s) في البسيط و (is + V-ing) في المستمر.',
					expectedInput: 'revises / is helping',
					revealAr: 'في المضارع البسيط: My sister revises. وفي المضارع المستمر: She is helping.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المضارع البسيط (Present Simple): للعادات والروتين والحقائق الثابتة. الصيغة: Verb مع (I, you, we, they) و Verb+s/es مع (He, She, It).',
				'مؤشرات المضارع البسيط: every day / week، always، usually، often، sometimes، never، on Fridays.',
				'المضارع المستمر (Present Continuous): لما يحدث لحظة الكلام الآن. الصيغة: am / is / are + Verb-ing.',
				'مؤشرات المضارع المستمر: now، right now، at the moment، today، Look!، Listen!.',
				'في النفي: المضارع البسيط يستعمل (don\'t / doesn\'t + Verb)، أما المضارع المستمر فيستعمل (am not / isn\'t / aren\'t + V-ing).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Exam Decision Rule: Simple or Continuous?',
				rootLabel: 'Read the Time Marker First!',
				rootSub: 'The time word tells you which tense to pick',
				branches: [
					{
						label: 'Present Simple',
						rule: 'every day / always / usually',
						example: 'Omar reads every evening.',
						color: '#1d4ed8'
					},
					{
						label: 'Present Continuous',
						rule: 'now / Look! / at the moment',
						example: 'Look! Omar is reading now.',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'قاعدة القرار السريع في الامتحان: ابحث عن المؤشر الزمني أولا قبل تصريف الفعل',
			examples: [
				{
					problemAr: 'صرّف الفعلين في الزمن المناسب: "Usually, my father (drink) mint tea after dinner, but today he (drink) milk."',
					solutionAr: 'Usually, my father drinks mint tea after dinner, but today he is drinking milk.'
				},
				{
					problemAr: 'صحّح الخطأ في الجملة: "Look! The children plays in the garden."',
					solutionAr: 'Look! The children are playing in the garden. (بسبب Look! والفاعل الجمع children).'
				}
			],
			watchOutAr:
				'احذر من الخلط بين الزمنين في جملة واحدة! لا تكتب أبدا "He is plays" ولا "He playing now"؛ إما (plays) للعادة وإما (is playing) للحظة الراهنة.'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "Listen! The Imam ...... the Quran now."',
				options: ['recites', 'is reciting', 'recite', 'are reciting'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Listen! و now يدلان على المضارع المستمر وليس البسيط.',
					'أحسنت! The Imam مفرد غائب مع Listen! و now، فتصبح is reciting.',
					'recite صيغة المضارع البسيط مع الجمع.',
					'The Imam مفرد وليس جمعا.'
				],
				explanationAr: 'وجود Listen! و now يستوجب المضارع المستمر: is reciting.'
			},
			{
				questionAr: 'أكمل الجملة: "Every Friday, our family ...... couscous for lunch."',
				options: ['is eating', 'are eating', 'eats', 'eating'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Every Friday تدل على عادة أسبوعية (مضارع بسيط).',
					'ليست حدثا مؤقتا الآن.',
					'ممتاز! our family مفرد ومع Every Friday نستعمل المضارع البسيط: eats.',
					'ينقصها فعل مساعد وليست للعادة.'
				],
				explanationAr: 'المؤشر Every Friday يدل على عادة متكررة فنستعمل المضارع البسيط: eats.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة تماما:',
				options: [
					'She is always helps her mother.',
					'She always helps her mother.',
					'She always helping her mother.',
					'She is help her mother always.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نجمع بين is و helps معا.',
					'أحسنت! always تدل على المضارع البسيط: She always helps.',
					'ينقصها فعل مساعد كما أن always للعادة.',
					'تركيب غير صحيح.'
				],
				explanationAr: 'مع always نستعمل المضارع البسيط: She always helps her mother.'
			},
			{
				questionAr: 'أكمل النفي: "At the moment, the boys ...... football; they are studying."',
				options: ['don\'t play', 'doesn\'t play', 'aren\'t playing', 'isn\'t playing'],
				correctIndex: 2,
				diagnosticFeedback: [
					'At the moment تستوجب المضارع المستمر.',
					'doesn\'t للمضارع البسيط والمفرد.',
					'ممتاز! The boys جمع مع At the moment فتصبح aren\'t playing.',
					'The boys جمع فتأخذ aren\'t وليس isn\'t.'
				],
				explanationAr: 'في المضارع المستمر مع الجمع المنفي نستعمل: aren\'t + V-ing.'
			},
			{
				questionAr: 'أكمل الجملة: "I usually ...... to school on foot, but today I ...... with my father."',
				options: [
					'go / am going',
					'am going / go',
					'goes / going',
					'going / am going'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! usually تأخذ المضارع البسيط (go)، و today تأخذ المضارع المستمر (am going).',
					'عكست الزمنين؛ usually للعادة و today للحاضر المؤقت.',
					'الضمير I لا يأخذ goes.',
					'الجزء الأول يحتاج المضارع البسيط go.'
				],
				explanationAr: 'usually + المضارع البسيط (go)، و today + المضارع المستمر (am going).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: Locating Rooms & Prepositions of Place
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t1_house_prepositions_place',
		slug: 'eng-2am-t1-house-prepositions-place',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي وعائلتي — Me, My Friends and My Family',
		order: 3,
		titleAr: 'وصف المنزل وحروف جر المكان (Locating Rooms & Prepositions of Place)',
		objectives: [
			'تسمية غرف المنزل الجزائري ومرافقه باللغة الإنجليزية (living room, kitchen, bedroom, garden)',
			'استعمال حروف جر المكان بدقة (next to, opposite, between, on the right, on the left, upstairs)',
			'تحديد موقع الغرف والأثاث في فقرة وصفية واضحة'
		],
		keywordsAr: ['Rooms of the House', 'Prepositions of Place', 'next to / opposite', 'between', 'upstairs / downstairs'],
		discover: {
			scenarioAr:
				'تصف سلمى بيت أسرتها في سطيف: "My house has two floors. Downstairs, the kitchen is next to the dining room, and the living room is opposite the garden. Upstairs, my bedroom is between my parents\' room and the bathroom." لاحظ الكلمات التي تحدّد موقع كل غرفة.',
			svg: svgEnglishGrammarMap({
				title: 'Prepositions of Place for Describing a House',
				rootLabel: 'Where is the room?',
				rootSub: 'Use these clear location expressions',
				branches: [
					{
						label: 'next to / beside',
						rule: 'بجانب / بجوار',
						example: 'Kitchen is next to hall.',
						color: '#1d4ed8'
					},
					{
						label: 'opposite',
						rule: 'مقابل / أمام',
						example: 'Living room opposite door.',
						color: '#047857'
					},
					{
						label: 'between ... and',
						rule: 'بين شيئين اثنين',
						example: 'Between room A and B.',
						color: '#b45309'
					},
					{
						label: 'in / on / under',
						rule: 'في / على / تحت',
						example: 'The book is on the desk.',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'أين يقع المطبخ (kitchen) في بيت سلمى؟ وما حرف الجر المستعمل؟',
					hintAr: 'اقرأ الجملة الثانية في وصف سلمى.',
					expectedInput: 'next to the dining room',
					revealAr: 'المطبخ بجانب غرفة الأكل، وحرف الجر هو "next to" (بجانب).'
				},
				{
					promptAr: 'متى نستعمل حرف الجر "between" كما فعلت سلمى عند وصف غرفتها؟',
					hintAr: 'لاحظ وجود غرفتين مذكورتين بعد between مع كلمة and.',
					expectedInput: 'between two places',
					revealAr: 'نستعمل "between ... and ..." عندما يقع الشيء بين مكانين أو شيئين اثنين.'
				},
				{
					promptAr: 'ما الفرق بين "upstairs" و "downstairs" في وصف البيت؟',
					hintAr: 'تأمّل الكلمتين: up (فوق) و down (تحت).',
					expectedInput: 'upstairs is upper floor, downstairs is ground floor',
					revealAr: 'upstairs تعني في الطابق العلوي، و downstairs تعني في الطابق السفلي (الأرضي).'
				}
			]
		},
		summary: {
			rulesAr: [
				'غرف ومرافق البيت: living room (غرفة الجلوس)، kitchen (المطبخ)، dining room (غرفة الأكل)، bedroom (غرفة النوم)، bathroom (الحمام)، hall (البهو)، garden (الحديقة)، garage (المرآب).',
				'أهم حروف جر المكان للغرف: next to (بجانب)، opposite (مقابل)، between ... and ... (بين ... و ...)، on the right of (على يمين)، on the left of (على يسار)، in front of (أمام)، behind (خلف).',
				'حروف جر الأثاث داخل الغرفة: in (داخل)، on (فوق ملامس)، under (تحت)، near (قريب من).',
				'للسؤال عن موقع غرفة أو شيء نستعمل "Where is ...?" للمفرد و "Where are ...?" للجمع.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Describing My Family House (Layout Plan)',
				steps: [
					{ stage: 'Overview', detail: 'I live in a comfortable house with a small garden.' },
					{ stage: 'Downstairs', detail: 'Downstairs, there is a living room opposite the kitchen.' },
					{ stage: 'Upstairs', detail: 'Upstairs, my bedroom is next to my brother\'s room.' },
					{ stage: 'My Desk', detail: 'My books are on the desk, near the window.' }
				]
			}),
			visualCaptionAr: 'خطة منظمة لوصف البيت من الطابق الأرضي إلى الطابق العلوي باستخدام حروف جر المكان',
			examples: [
				{
					problemAr: 'أكمل بحرف الجر المناسب (between / opposite / on): 1) My desk is ...... the window and the bed. 2) The prayer mat is ...... the floor.',
					solutionAr: '1) between the window and the bed. 2) on the floor.'
				},
				{
					problemAr: 'ترجم إلى الإنجليزية: "غرفة الجلوس بجانب المطبخ."',
					solutionAr: 'The living room is next to the kitchen.'
				}
			],
			watchOutAr:
				'انتبه! نكتب "next to" مع كلمة "to" دائما (next to the kitchen)، أما "opposite" فلا تأخذ "to" بعدها (opposite the garden وليس opposite to).'
		},
		practice: [
			{
				questionAr: 'اختر حرف الجر المناسب: "The bathroom is ...... the two bedrooms."',
				options: ['on', 'under', 'between', 'in'],
				correctIndex: 2,
				diagnosticFeedback: [
					'on تعني فوق السطح.',
					'under تعني تحت.',
					'أحسنت! لوجود مكانين (the two bedrooms) نستعمل between.',
					'in تعني داخل.'
				],
				explanationAr: 'للدلالة على التوسط بين مكانين اثنين نستعمل between.'
			},
			{
				questionAr: 'أكمل الجملة بشكل صحيح: "My school bag is ...... the chair."',
				options: ['between', 'next', 'under', 'opposite to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'between تحتاج شيئين اثنين.',
					'next ناقصة بدون كلمة to.',
					'ممتاز! under the chair تعني تحت الكرسي.',
					'opposite لا تأخذ to ولا تناسب الحقيبة والكرسي هنا.'
				],
				explanationAr: 'تحت الكرسي تُعبّر عنها بـ under the chair.'
			},
			{
				questionAr: 'أين تقع غرفة النوم غالبا في بيت من طابقين (Upper floor)؟',
				options: ['downstairs', 'upstairs', 'under', 'behind'],
				correctIndex: 1,
				diagnosticFeedback: [
					'downstairs تعني الطابق السفلي.',
					'أحسنت! upstairs تعني في الطابق العلوي.',
					'under تعني تحت.',
					'behind تعني خلف.'
				],
				explanationAr: 'الطابق العلوي في البيت يُسمى upstairs والطابق الأرضي downstairs.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا:',
				options: [
					'The kitchen is next the living room.',
					'The kitchen is next to the living room.',
					'The kitchen is opposite to the living room.',
					'The kitchen is between the living room.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها حرف الجر to بعد next.',
					'ممتاز! الصيغة الصحيحة هي next to.',
					'نقول opposite مباشرة بدون to.',
					'between تحتاج مكانين مع and.'
				],
				explanationAr: 'الصيغة الثابتة لبجانب هي next to + المكان.'
			},
			{
				questionAr: 'ما معنى عبارة "on the left of the hall" بالعربية؟',
				options: [
					'على يمين البهو',
					'على يسار البهو',
					'خلف البهو',
					'فوق البهو'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'على يمين هي on the right of.',
					'أحسنت! left تعني يسار، إذن: على يسار البهو.',
					'خلف هي behind.',
					'فوق هي above / upstairs.'
				],
				explanationAr: 'on the left of تعني على يسار، و on the right of تعني على يمين.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Silent Letters (h, k, w, t) & Can / Cannot
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t1_silent_letters_can',
		slug: 'eng-2am-t1-silent-letters-can',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأصدقائي وعائلتي — Me, My Friends and My Family',
		order: 4,
		titleAr: 'الحروف الصامتة (Silent Letters: h, k, w, t) والتعبير عن القدرة (can / cannot)',
		objectives: [
			'التعرف على الحروف الصامتة الأربعة المقررة في الثانية متوسط (h, k, w, t) واستخراجها بدقة',
			'استعمال الفعل الناقص (can / cannot / can\'t) للتعبير عن القدرة والاستطاعة',
			'التمييز بين نطق can القوي ونطق can الضعيف في الجملة والسؤال'
		],
		keywordsAr: ['Silent Letters', 'Silent h / k / w / t', 'Ability', 'can / cannot', 'Phonology'],
		discover: {
			scenarioAr:
				'قال أنس لصديقه: "I can write neatly and I know how to listen carefully, so I finish my homework in an hour." لاحظ الكلمات (write, know, listen, hour): في كل منها حرف يُكتب ولا يُنطق!',
			svg: svgEnglishPhoneticsChart({
				title: 'Silent Letters in 2MS English (h, k, w, t)',
				subtitle: 'Written in spelling, NOT pronounced when speaking',
				columns: [
					{
						sound: 'Silent k & w',
						rule: 'kn- / wr- / wh-',
						examples: 'know, knife / write, wrong',
						color: '#1d4ed8'
					},
					{
						sound: 'Silent h',
						rule: 'wh- / hour / honest',
						examples: 'what, where, hour, honest',
						color: '#047857'
					},
					{
						sound: 'Silent t',
						rule: '-sten / -stle / often',
						examples: 'listen, castle, often, mustn\'t',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الصامت في كلمتي "know" (يعرف) و "knee" (ركبة)؟',
					hintAr: 'انطق الكلمتين ببطء: نبدأ بصوت /n/ مباشرة.',
					expectedInput: 'k',
					revealAr: 'الحرف "k" صامت دائما عندما يأتي قبل الحرف "n" في بداية الكلمة: know, knee, knife.'
				},
				{
					promptAr: 'ما الحرف الصامت في كلمتي "write" و "wrong"، وفي كلمتي "hour" و "honest"؟',
					hintAr: 'انظر الحرف الأول في كل زوج.',
					expectedInput: 'w and h',
					revealAr: 'الحرف "w" صامت قبل "r" في (write, wrong)، والحرف "h" صامت في (hour, honest, what, where).'
				},
				{
					promptAr: 'كيف نعبّر عن القدرة وعدم القدرة باستعمال "can" في جملة عن الرياضة أو الدراسة؟',
					hintAr: 'الفعل بعد can يأتي في المصدر المجرد دائما.',
					expectedInput: 'can / cannot + base verb',
					revealAr: 'نستعمل Subject + can + Verb (للقدرة) و Subject + cannot / can\'t + Verb (لعدم القدرة): I can swim, but I can\'t dive.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الحرف الصامت "k": لا يُنطق قبل الحرف (n) في أول الكلمة: know, knife, knee, knock, knowledge.',
				'الحرف الصامت "w": لا يُنطق قبل الحرف (r) في أول الكلمة: write, wrong, wrap، وكذلك في كلمة (who, two, answer).',
				'الحرف الصامت "h": لا يُنطق في (hour, honest, honour) ولا بعد (w) في أدوات السؤال: what, where, when, why, white.',
				'الحرف الصامت "t": لا يُنطق في كلمات مثل: listen, castle, often, whistle, mustn\'t.',
				'التعبير عن القدرة بـ (can / cannot): يأتي بعدها الفعل مجردا بدون (to) ولا (-s): He can speak Arabic and English. / Can you draw? — Yes, I can. / No, I can\'t.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Modal Verb CAN (Ability)',
				rootLabel: 'Same Form for ALL Subjects (I, He, She, They)',
				rootSub: 'Never add -s or to after can!',
				branches: [
					{
						label: 'Affirmative',
						rule: 'Subject + can + Verb',
						example: 'She can read Arabic well.',
						color: '#047857'
					},
					{
						label: 'Negative',
						rule: 'Subject + cannot / can\'t + V',
						example: 'He cannot lift heavy boxes.',
						color: '#b45309'
					},
					{
						label: 'Question',
						rule: 'Can + Subject + Verb?',
						example: 'Can you swim? Yes, I can.',
						color: '#1d4ed8'
					}
				]
			}),
			visualCaptionAr: 'قاعدة الفعل الناقص can في الإثبات والنفي والسؤال لجميع الضمائر دون استثناء',
			examples: [
				{
					problemAr: 'حدّد الحرف الصامت في كل كلمة: 1) honest  2) knife  3) listen  4) write.',
					solutionAr: '1) h في honest. 2) k في knife. 3) t في listen. 4) w في write.'
				},
				{
					problemAr: 'صحّح الجملة: "Bilal cans to ride a bicycle."',
					solutionAr: 'Bilal can ride a bicycle. (لا نضيف -s لـ can ولا نضع to بعدها).'
				}
			],
			watchOutAr:
				'احذر من كلمتي "house" و "happy": حرف (h) فيهما منطوق وليس صامتا! أما في "hour" و "honest" و "what" فحرف (h) صامت تماما.'
		},
		practice: [
			{
				questionAr: 'ما الحرف الصامت في كلمة "knowledge" (المعرفة)؟',
				options: ['n', 'k', 'l', 'd'],
				correctIndex: 1,
				diagnosticFeedback: [
					'حرف n منطوق بوضوح.',
					'أحسنت! الحرف k قبل n صامت دائما: know, knowledge.',
					'حرف l منطوق في الكلمة.',
					'المقطع dge يُنطق /dj/ والحرف الصامت الأساسي في أولها هو k.'
				],
				explanationAr: 'في كل الكلمات المبدوءة بـ kn (know, knife, knowledge) يكون حرف k صامتا.'
			},
			{
				questionAr: 'في أيّ كلمة يكون الحرف "h" صامتا (Silent h)؟',
				options: ['house', 'happy', 'honest', 'helpful'],
				correctIndex: 2,
				diagnosticFeedback: [
					'في house يُنطق الحرف h.',
					'في happy يُنطق الحرف h.',
					'ممتاز! في honest (صادق) و hour (ساعة) يكون حرف h صامتا.',
					'في helpful يُنطق الحرف h.'
				],
				explanationAr: 'الكلمات honest و hour و what تحتوي على حرف h صامت.'
			},
			{
				questionAr: 'ما الحرف الصامت في كلمة "listen" (يستمع)؟',
				options: ['l', 's', 't', 'n'],
				correctIndex: 2,
				diagnosticFeedback: [
					'حرف l منطوق في بداية الكلمة.',
					'حرف s منطوق في الكلمة.',
					'أحسنت! حرف t صامت في listen و castle و often.',
					'حرف n منطوق في نهاية الكلمة.'
				],
				explanationAr: 'حرف t لا يُنطق في listen (تُنطق لِسِن).'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا باستعمال "can":',
				options: [
					'My sister cans cook couscous.',
					'My sister can to cook couscous.',
					'My sister can cook couscous.',
					'My sister can cooking couscous.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نضيف -s إلى الفعل الناقص can أبدا.',
					'لا نضع to بعد can.',
					'ممتاز! Subject + can + الفعل المجرد (cook).',
					'لا نضيف -ing بعد can.'
				],
				explanationAr: 'الفعل الناقص can لا يتغير مع أي ضمير ويليه مصدر مجرد بدون to.'
			},
			{
				questionAr: 'ما الحرف الصامت في كلمتي "write" و "answer"؟',
				options: ['r', 'w', 't', 's'],
				correctIndex: 1,
				diagnosticFeedback: [
					'حرف r منطوق في write.',
					'أحسنت! حرف w صامت في write و wrong و answer و two.',
					'حرف t منطوق في write.',
					'حرف s منطوق في answer.'
				],
				explanationAr: 'حرف w صامت في wr- (write, wrong) وفي كلمة answer.'
			}
		]
	}
];
