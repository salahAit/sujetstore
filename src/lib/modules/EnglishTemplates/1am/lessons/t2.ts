import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_1AM_T2: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Telling Time & Present Simple (Daily Routine)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t2_time_present_simple',
		slug: 'eng-1am-t2-time-present-simple',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا ونشاطاتي اليومية — Me and My Daily Activities',
		order: 1,
		titleAr: 'قراءة الساعة والمضارع البسيط للروتين اليومي (Telling Time & Present Simple)',
		objectives: [
			'قراءة وكتابة الساعة باللغة الإنجليزية (o\'clock, half past, quarter past, quarter to)',
			'تصريف الأفعال في المضارع البسيط (Present Simple) لوصف الأنشطة اليومية',
			'استخدام النفي والسؤال بـ (do / does) بشكل صحيح'
		],
		keywordsAr: ['Telling Time', 'Daily Routine', 'Present Simple', 'o\'clock / half past', 'do / does'],
		discover: {
			scenarioAr:
				'يصف بلال يومه المدرسي المنتظم قائلا: "I get up at six o\'clock. I pray Fajr, have breakfast at seven o\'clock, and go to school at half past seven. My brother Omar gets up early too, and he reads the Quran." لاحظ الفرق بين تصريف الفعل مع I وتصريفه مع He.',
			svg: svgEnglishTenseTimeline({
				title: 'Daily Routine & Habits',
				tenseName: 'Present Simple',
				formula: 'I/You/We/They + Verb  |  He/She/It + Verb + s/es',
				activeZone: 'present',
				example: 'Amine gets up at 6:00 and goes to school at 7:30.',
				markers: 'every day, every morning, always, usually'
			}),
			steps: [
				{
					promptAr: 'كيف عبّر بلال عن الساعة السابعة والنصف (07:30) بالإنجليزية؟',
					hintAr: 'اقرأ آخر الجملة الثانية في كلام بلال.',
					expectedInput: 'half past seven',
					revealAr: 'عبّر عنها بعبارة "half past seven" (النصف بعد السابعة = 07:30).'
				},
				{
					promptAr: 'ما الفرق بين "I get up" و "Omar gets up"؟ ولماذا أضفنا (-s)؟',
					hintAr: 'تأمل الفاعل في الجملتين: I مقابل Omar (He).',
					expectedInput: 'He takes s',
					revealAr: 'في المضارع البسيط نضيف "-s" (أو "-es") للفعل مع المفرد الغائب (He, She, It) فقط.'
				},
				{
					promptAr: 'ماذا أضفنا للفعل "go" مع الفاعل المفرد الغائب (He / She)؟',
					hintAr: 'الأفعال المنتهية بـ o, ch, sh, ss, x تأخذ نهاية خاصة.',
					expectedInput: 'goes',
					revealAr: 'الأفعال المنتهية بـ o (مثل go و do) نضيف لها "-es" فتصبح: he goes / she does.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قراءة الساعة: 07:00 = seven o\'clock، 07:15 = quarter past seven، 07:30 = half past seven، 07:45 = quarter to eight.',
				'المضارع البسيط للروتين اليومي: مع (I, You, We, They) يبقى الفعل كما هو (I pray, We study).',
				'مع المفرد الغائب (He, She, It): نضيف (-s) للفعل (gets up, reads)، أو (-es) إذا انتهى بـ (o, ch, sh, ss, x) مثل (goes, washes, watches)، أو (-ies) إذا انتهى بـ (ساكن + y) مثل (study تصبح studies).',
				'الفعل "have" يصبح "has" مع المفرد الغائب: I have breakfast / She has breakfast.',
				'للنفي نستعمل (don\'t / doesn\'t + مصدر الفعل): I don\'t sleep late. He doesn\'t waste time.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Telling the Time in English',
				rootLabel: 'What time is it?',
				rootSub: 'Four essential clock expressions',
				branches: [
					{
						label: 'Exact (:00)',
						rule: 'Hour + o\'clock',
						example: '08:00 = eight o\'clock',
						color: '#1d4ed8'
					},
					{
						label: 'Quarter (:15)',
						rule: 'quarter past + Hour',
						example: '08:15 = quarter past 8',
						color: '#047857'
					},
					{
						label: 'Half (:30)',
						rule: 'half past + Hour',
						example: '08:30 = half past 8',
						color: '#b45309'
					},
					{
						label: 'To (:45)',
						rule: 'quarter to + Next Hour',
						example: '07:45 = quarter to 8',
						color: '#7c3aed'
					}
				]
			}),
			visualCaptionAr: 'الصيغ الأربع الأساسية لقراءة الساعة باللغة الإنجليزية بوضوح تام',
			examples: [
				{
					problemAr: 'صرّف الأفعال بين قوسين في المضارع البسيط: "Amina (get up) at 6:00. She (wash) her face and (have) breakfast."',
					solutionAr: 'Amina gets up at 6:00. She washes her face and has breakfast.'
				},
				{
					problemAr: 'اكتب التوقيتين بالحروف: (06:15) و (09:45).',
					solutionAr: '06:15 = It is quarter past six. 09:45 = It is quarter to ten.'
				}
			],
			watchOutAr:
				'انتبه عند النفي بـ "doesn\'t" أو السؤال بـ "Does": يعود الفعل إلى أصله دون (-s)! نقول "He doesn\'t go" ولا نقول "He doesn\'t goes".'
		},
		practice: [
			{
				questionAr: 'كيف نكتب الساعة (08:30) باللغة الإنجليزية؟',
				options: [
					'eight o\'clock',
					'quarter past eight',
					'half past eight',
					'quarter to eight'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'eight o\'clock تعني 08:00 تماما.',
					'quarter past eight تعني 08:15 (والربع).',
					'أحسنت! half past eight تعني الثامنة والنصف (08:30).',
					'quarter to eight تعني 07:45 (إلا ربعا).'
				],
				explanationAr: 'النصف يُعبّر عنه بـ half past، إذن 08:30 هي half past eight.'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل: "My sister ...... her homework every evening."',
				options: ['do', 'does', 'doing', 'is do'],
				correctIndex: 1,
				diagnosticFeedback: [
					'do تُستعمل مع I, you, we, they وليس مع She.',
					'ممتاز! الفاعل مفرد غائب (She) والفعل do ينتهي بـ o فيصبح does.',
					'doing تحتاج فعل كينونة وتدل على الحاضر المستمر.',
					'لا نجمع بين is ومصدر الفعل المجرد.'
				],
				explanationAr: 'مع المفرد الغائب (My sister = She) يصبح الفعل do في المضارع البسيط does.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة لتصريف الفعل (study) مع الضمير (He):',
				options: [
					'He studys English.',
					'He study English.',
					'He studies English.',
					'He studying English.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'عندما ينتهي الفعل بساكن + y نحذف y ونضيف ies.',
					'يجب إضافة نهاية المفرد الغائب مع He.',
					'أحسنت! study تصبح studies مع He / She / It.',
					'هذه الصيغة ناقصة وغير مناسبة للروتين اليومي.'
				],
				explanationAr: 'الفعل study ينتهي بحرف ساكن (d) ثم y، فتقلب y إلى ies: He studies.'
			},
			{
				questionAr: 'اختر الصيغة المنفية الصحيحة: "Youssef ...... late to school."',
				options: [
					'doesn\'t goes',
					'don\'t go',
					'doesn\'t go',
					'isn\'t go'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد doesn\'t نرجع الفعل إلى أصله بدون es.',
					'Youssef مفرد غائب نستخدم معه doesn\'t وليس don\'t.',
					'ممتاز! doesn\'t + الفعل المجرد (go).',
					'لا نستعمل isn\'t لنفي فعل حركة في المضارع البسيط.'
				],
				explanationAr: 'ننفي الفعل مع المفرد الغائب بـ doesn\'t متبوعة بالمصدر المجرد: doesn\'t go.'
			},
			{
				questionAr: 'ما التوقيت الذي تمثله عبارة "quarter to nine"؟',
				options: ['09:15', '09:30', '08:45', '09:45'],
				correctIndex: 2,
				diagnosticFeedback: [
					'09:15 هي quarter past nine.',
					'09:30 هي half past nine.',
					'أحسنت! التاسعة إلا ربعا هي 08:45.',
					'09:45 هي quarter to ten.'
				],
				explanationAr: 'كلمة to تعني «إلا»، فـ quarter to nine تعني التاسعة إلا ربعا أي 08:45.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Prepositions of Time (at, on, in) & Adverbs of Frequency
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t2_prepositions_time_adverbs',
		slug: 'eng-1am-t2-prepositions-time-adverbs',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا ونشاطاتي اليومية — Me and My Daily Activities',
		order: 2,
		titleAr: 'حروف الجر الزمنية (at, on, in) وظروف التكرار (always, usually, never)',
		objectives: [
			'الاستعمال الصحيح لحروف الجر الزمنية الثلاثة: at و on و in',
			'معرفة معاني ظروف التكرار (always, usually, sometimes, never) وموقعها في الجملة',
			'وصف العادات الأسبوعية واليومية بدقة ووضوح'
		],
		keywordsAr: ['Prepositions of Time', 'at / on / in', 'Adverbs of Frequency', 'always / never'],
		discover: {
			scenarioAr:
				'كتبت أسماء جدولها الأسبوعي: "I always wake up at 6:00 in the morning. On Friday, I usually visit my grandparents. I never go to school on Saturday." تأمّل الحروف (at, in, on) ومكان الكلمات (always, usually, never).',
			svg: svgEnglishGrammarMap({
				title: 'Prepositions of Time: AT / ON / IN',
				rootLabel: 'Time Prepositions',
				rootSub: 'Exact time | Days | Longer periods',
				branches: [
					{
						label: 'AT (Exact Time)',
						rule: 'Hours & night',
						example: 'at 7:30 / at night',
						color: '#1d4ed8'
					},
					{
						label: 'ON (Days)',
						rule: 'Days of the week & dates',
						example: 'on Sunday / on Friday',
						color: '#047857'
					},
					{
						label: 'IN (Periods)',
						rule: 'Parts of day, months, seasons',
						example: 'in the morning / in winter',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما حرف الجر الذي استعملته أسماء قبل الساعة "6:00"؟',
					hintAr: 'انظر الجملة الأولى: ...... 6:00.',
					expectedInput: 'at',
					revealAr: 'نستعمل "at" دائما قبل الساعات المحددة: at 6:00, at midday, at night.'
				},
				{
					promptAr: 'ما حرف الجر المستعمل قبل أيام الأسبوع مثل "Friday" و "Saturday"؟',
					hintAr: 'اقرأ الجملة الثانية والثالثة في كلام أسماء.',
					expectedInput: 'on',
					revealAr: 'نستعمل "on" دائما قبل أيام الأسبوع: on Sunday, on Friday, on the weekend.'
				},
				{
					promptAr: 'أين جاءت الكلمات "always" و "never" بالنسبة للفعل (wake up / go)؟',
					hintAr: 'هل جاءت قبل الفعل أم بعده؟',
					expectedInput: 'before the verb',
					revealAr: 'تأتي ظروف التكرار (always, usually, sometimes, never) قبل الفعل الرئيسي: I always wake up.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حرف الجر "at": للساعات المحددة (at 7:30, at noon) وكلمة (at night).',
				'حرف الجر "on": لأيام الأسبوع (on Sunday, on Monday, on Friday) والتواريخ الكاملة (on July 5th).',
				'حرف الجر "in": لفترات اليوم (in the morning, in the afternoon, in the evening) وللأشهر والفصول والسنوات (in May, in winter, in 2026).',
				'ظروف التكرار: always (دائما 100%)، usually (عادة 80%)، sometimes (أحيانا 50%)، never (أبدا 0%).',
				'موقع ظرف التكرار: يأتي قبل الفعل الرئيسي (He always prays Fajr)، ويأتي بعد فعل الكينونة to be (He is always polite).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Adverbs of Frequency Scale & Position',
				steps: [
					{ stage: 'always (100%)', detail: 'I always say Bismillah before eating.' },
					{ stage: 'usually (80%)', detail: 'She usually revises her lessons at 5:00.' },
					{ stage: 'sometimes (50%)', detail: 'We sometimes visit our uncle on Friday.' },
					{ stage: 'never (0%)', detail: 'A good pupil is never late to class.' }
				]
			}),
			visualCaptionAr: 'تدرّج ظروف التكرار من 100% إلى 0% وموضعها الدقيق قبل الفعل وبعد to be',
			examples: [
				{
					problemAr: 'أكمل بحرف الجر المناسب (at / on / in): "Classes start ...... 8:00 ...... Sunday ...... the morning."',
					solutionAr: 'Classes start at 8:00 on Sunday in the morning.'
				},
				{
					problemAr: 'رتّب الكلمات لتكوين جملة صحيحة: (early / always / is / Hamza).',
					solutionAr: 'Hamza is always early. (لأن always تأتي بعد is).'
				}
			],
			watchOutAr:
				'احذر من استثناء مهم! نقول "in the morning / in the afternoon / in the evening"، لكن مع الليل نقول دائما "at night" وليس "in night"!'
		},
		practice: [
			{
				questionAr: 'اختر حرف الجر الصحيح: "We have English lessons ...... Monday."',
				options: ['at', 'in', 'on', 'to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'at تُستعمل للساعات وليس لأيام الأسبوع.',
					'in تُستعمل للأشهر وفترات اليوم وليس للأيام.',
					'أحسنت! نضع on قبل جميع أيام الأسبوع.',
					'to لا تُستعمل هنا مع أيام الأسبوع.'
				],
				explanationAr: 'أيام الأسبوع تأخذ دائما حرف الجر on: on Monday, on Friday.'
			},
			{
				questionAr: 'أكمل الجملة: "I do my homework ...... the evening."',
				options: ['on', 'at', 'in', 'by'],
				correctIndex: 2,
				diagnosticFeedback: [
					'on لأيام الأسبوع والتواريخ.',
					'at للساعات وكلمة night فقط.',
					'ممتاز! فترات اليوم (morning, afternoon, evening) تأخذ in.',
					'by ليست من حروف الجر الزمنية هنا.'
				],
				explanationAr: 'نستعمل in مع فترات اليوم الثلاث: in the morning, in the afternoon, in the evening.'
			},
			{
				questionAr: 'أكمل الجملة: "My grandfather reads the Quran ...... night."',
				options: ['in', 'on', 'at', 'for'],
				correctIndex: 2,
				diagnosticFeedback: [
					'انتبه! night استثناء لا يأخذ in.',
					'on لأيام الأسبوع.',
					'أحسنت! التعبير الصحيح دائما هو at night.',
					'for تُستعمل للمدة الزمنية.'
				],
				explanationAr: 'من الاستثناءات الثابتة في الإنجليزية: at night و at noon.'
			},
			{
				questionAr: 'اختر الجملة ذات الترتيب الصحيح لظرف التكرار:',
				options: [
					'Bilal prays always Fajr.',
					'Bilal always prays Fajr.',
					'Always Bilal prays Fajr.',
					'Bilal prays Fajr always.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ظرف التكرار يأتي قبل الفعل الرئيسي وليس بعده.',
					'ممتاز! Subject + Adverb (always) + Verb (prays).',
					'الموضع القياسي الصحيح هو بين الفاعل والفعل.',
					'نضع always قبل الفعل الرئيسي.'
				],
				explanationAr: 'ظرف التكرار يسبق الفعل الرئيسي: Bilal always prays Fajr.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة مع فعل الكينونة (is):',
				options: [
					'Ines never is rude.',
					'Ines is never rude.',
					'Ines is rude never.',
					'Never Ines is rude.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع verb to be يأتي ظرف التكرار بعد الفعل وليس قبله.',
					'أحسنت! بعد is نضع never: Ines is never rude.',
					'لا نضع never في نهاية الجملة.',
					'الموضع الصحيح هو بعد is مباشرة.'
				],
				explanationAr: 'القاعدة: ظرف التكرار يأتي قبل الفعل العادي، لكنه يأتي بعد am / is / are.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: School Rules (Present Continuous + must / must not)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t2_school_rules_continuous',
		slug: 'eng-1am-t2-school-rules-continuous',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا ومدرستي — Me and My School',
		order: 3,
		titleAr: 'المضارع المستمر (Present Continuous) وقواعد المدرسة (must / must not)',
		objectives: [
			'تكوين المضارع المستمر (am / is / are + verb-ing) لوصف ما يحدث في القسم الآن',
			'التعبير عن الواجبات المدرسية بـ (must) والممنوعات بـ (must not / mustn\'t)',
			'كتابة قائمة واضحة من حقوق التلميذ وواجباته داخل المتوسطة'
		],
		keywordsAr: ['Present Continuous', 'verb-ing', 'School Rules', 'must / must not', 'Rights & Duties'],
		discover: {
			scenarioAr:
				'داخل القسم الآن: "Look! The teacher is writing on the board, and the pupils are listening carefully. In our school, we must keep our classroom clean, and we must not throw papers on the floor." لاحظ زمن الفعلين الأولين وكيفية صياغة قواعد المدرسة.',
			svg: svgEnglishTenseTimeline({
				title: 'Action Happening Right Now',
				tenseName: 'Present Continuous',
				formula: 'Subject + am / is / are + Verb-ing',
				activeZone: 'present',
				example: 'The pupils are listening to the teacher right now.',
				markers: 'now, right now, at the moment, Look!, Listen!'
			}),
			steps: [
				{
					promptAr: 'ممّ يتكون الفعل في الجملة: "The teacher is writing on the board"؟',
					hintAr: 'يتكون من جزأين: فعل مساعد + فعل مضاف إليه نهاية.',
					expectedInput: 'is + verb-ing',
					revealAr: 'يتكون من فعل الكينونة (is) متبوعا بالفعل مضافا إليه (-ing): is writing.'
				},
				{
					promptAr: 'ما الكلمة التي استعملها النص للتعبير عن واجب إلزامي في المدرسة؟',
					hintAr: 'اقرأ عبارة: we ...... keep our classroom clean.',
					expectedInput: 'must',
					revealAr: 'نستعمل الفعل الناقص "must" (يجب) للواجب والإلزام: We must keep our classroom clean.'
				},
				{
					promptAr: 'كيف نمنع سلوكا غير لائق في المدرسة مثل رمي الأوراق على الأرض؟',
					hintAr: 'لاحظ النفي بعد must.',
					expectedInput: 'must not',
					revealAr: 'نستعمل "must not" (أو mustn\'t) متبوعة بالفعل المجرد: We must not throw papers on the floor.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المضارع المستمر (Present Continuous) يصف فعلا يقع لحظة الكلام الآن: Subject + am / is / are + Verb-ing.',
				'مؤشرات المضارع المستمر: now (الآن)، right now، at the moment، Look! (انظر!)، Listen! (استمع!).',
				'قواعد إملاء (-ing): نحذف حرف e الصامت في الآخر قبل ing (write تصبح writing)، ونضاعف الساكن الأخير في الفعل القصير (sit تصبح sitting).',
				'الإلزام والواجب المدرسي: Subject + must + Verb (مصدر مجرد بدون to). مثال: Pupils must respect their teachers.',
				'المنع والتحذير المدرسي: Subject + must not (mustn\'t) + Verb (مصدر مجرد). مثال: You must not eat in class.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'School Rules: Duties vs Prohibitions',
				rootLabel: 'My Middle School Rules',
				rootSub: 'Always use the base verb after must / must not',
				branches: [
					{
						label: 'MUST (Duties)',
						rule: 'Obligation & Good manners',
						example: 'We must arrive on time.',
						color: '#047857'
					},
					{
						label: 'MUST NOT (Prohibition)',
						rule: 'Forbidden actions',
						example: 'We must not shout in class.',
						color: '#b45309'
					},
					{
						label: 'NOW (Continuous)',
						rule: 'am / is / are + V-ing',
						example: 'Amine is reading a book.',
						color: '#1d4ed8'
					}
				]
			}),
			visualCaptionAr: 'التمييز بين الواجب (must) والمنع (must not) والحدث الجاري الآن (Present Continuous)',
			examples: [
				{
					problemAr: 'صرّف الفعلين في المضارع المستمر: "Listen! Sami (read) the lesson and we (write) the date."',
					solutionAr: 'Listen! Sami is reading the lesson and we are writing the date.'
				},
				{
					problemAr: 'أكمل بـ (must) أو (must not): 1) You ...... respect your teachers. 2) You ...... write on the walls.',
					solutionAr: '1) You must respect your teachers. 2) You must not write on the walls.'
				}
			],
			watchOutAr:
				'انتبه لخطأين شائعين: لا نكتب "to" ولا "-s" بعد must (الصواب: He must listen وليس He must to listens)، ولا ننسى am/is/are قبل Verb-ing!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "Look! The pupils ...... the school yard now."',
				options: ['clean', 'cleaning', 'are cleaning', 'is cleaning'],
				correctIndex: 2,
				diagnosticFeedback: [
					'كلمة Look! و now تدلان على المضارع المستمر وليس البسيط.',
					'ينقصها فعل الكينونة are قبل cleaning.',
					'أحسنت! The pupils جمع فتأخذ are + cleaning.',
					'The pupils جمع وليس مفردا، فلا تأخذ is.'
				],
				explanationAr: 'بوجود Look! و now نستخدم المضارع المستمر مع الجمع: are cleaning.'
			},
			{
				questionAr: 'ما الإملاء الصحيح لإضافة (-ing) إلى الفعل "write"؟',
				options: ['writeing', 'writing', 'writting', 'writes'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحذف حرف e الصامت في آخر write قبل إضافة ing.',
					'ممتاز! write تصبح writing.',
					'لا نضاعف الحرف t في write.',
					'writes صيغة المضارع البسيط.'
				],
				explanationAr: 'الأفعال المنتهية بحرف e صامت (مثل write, make) نحذف e قبل إضافة ing: writing.'
			},
			{
				questionAr: 'أكمل القاعدة المدرسية: "We ...... keep our school clean and tidy."',
				options: ['must', 'must not', 'are', 'does'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! المحافظة على نظافة المدرسة واجب نعبر عنه بـ must.',
					'must not للممنوعات، والنظافة واجب.',
					'are لا تأتي قبل مصدر مجرد (keep).',
					'does لا تصلح هنا.'
				],
				explanationAr: 'النظافة من واجبات التلميذ، فنستعمل must: We must keep our school clean.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا:',
				options: [
					'Pupils must not to chew gum in class.',
					'Pupils must not chewing gum in class.',
					'Pupils must not chew gum in class.',
					'Pupils must not chews gum in class.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نضع to بعد must not.',
					'لا نضيف ing بعد must not.',
					'ممتاز! بعد must / must not يأتي الفعل في المصدر المجرد (chew).',
					'لا نضيف s بعد must not.'
				],
				explanationAr: 'بعد must و must not نضع دائما الفعل في مصدره المجرد دون أي زيادة.'
			},
			{
				questionAr: 'أيّ مؤشر زمني يدل على استعمال المضارع المستمر (Present Continuous)؟',
				options: ['every Friday', 'at the moment', 'usually', 'always'],
				correctIndex: 1,
				diagnosticFeedback: [
					'every Friday يدل على الروتين (المضارع البسيط).',
					'أحسنت! at the moment (في هذه اللحظة) يدل على المضارع المستمر.',
					'usually يدل على العادة المتكررة.',
					'always يدل على العادة الدائمة.'
				],
				explanationAr: 'عبارة at the moment مثل now تدل على حدث يقع لحظة الكلام.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Final -s Pronunciation (/s/, /z/, /iz/)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_1am_t2_final_s_pronunciation',
		slug: 'eng-1am-t2-final-s-pronunciation',
		grade: '1am',
		yearSubjectId: 616,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا ونشاطاتي اليومية — Me and My Daily Activities',
		order: 4,
		titleAr: 'نطق حرف (-s) في آخر الكلمة: /s/ و /z/ و /iz/ (Final -s Pronunciation)',
		objectives: [
			'معرفة القاعدة الذهبية لتصنيف النهاية (-s / -es) إلى الأصوات الثلاثة /s/ و /z/ و /iz/',
			'تصنيف الأفعال في المضارع البسيط وأسماء الجمع في جدول الصوتيات دون أخطاء',
			'إتقان سؤال الصوتيات الثابت في اختبارات اللغة الإنجليزية بالمتوسط'
		],
		keywordsAr: ['Final -s', '/s/ /z/ /iz/', 'Phonology', 'Pronunciation Table'],
		discover: {
			scenarioAr:
				'في حصة القراءة، لاحظ أيمن أن نهاية الفعل تتغير في النطق حسب الحرف الذي يسبقها: "He gets up, he reads, and he washes his face." فلماذا نطقنا النهاية بـ /s/ في gets، وبـ /z/ في reads، وبـ /iz/ في washes؟',
			svg: svgEnglishPhoneticsChart({
				title: 'Final -s / -es Pronunciation Rules',
				subtitle: 'Always look at the sound right BEFORE the final -s',
				columns: [
					{
						sound: '/s/',
						rule: 'After: p, t, k, f, th',
						examples: 'gets, books, helps, laughs',
						color: '#1d4ed8'
					},
					{
						sound: '/z/',
						rule: 'After: b, d, g, l, m, n, r, v, vowels',
						examples: 'reads, prays, schools, goes',
						color: '#047857'
					},
					{
						sound: '/iz/',
						rule: 'After: s, ss, sh, ch, x, z, ge, ce',
						examples: 'washes, watches, classes, boxes',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الأخير قبل (-s) في الفعل "gets" و "helps"؟ وفي أيّ عمود نضعهما؟',
					hintAr: 'انظر العمود الأول في البطاقة: p, t, k, f.',
					expectedInput: '/s/',
					revealAr: 'الحرفان t و p من الحروف المهموسة (p, t, k, f)، لذلك تُنطق النهاية /s/.'
				},
				{
					promptAr: 'بمَ ينتهي الفعل "wash" و "watch" قبل إضافة (-es)؟ وكيف تُنطق النهاية؟',
					hintAr: 'لاحظ المقطعين sh و ch في العمود الثالث.',
					expectedInput: '/iz/',
					revealAr: 'ينتهيان بـ sh و ch، فتُنطق النهاية مقطعا كاملا /iz/: washes, watches.'
				},
				{
					promptAr: 'كيف تُنطق النهاية (-s) في "reads" و "prays" و "goes"؟',
					hintAr: 'الأصوات d والحروف المتحركة (vowels) تنتمي للعمود الثاني.',
					expectedInput: '/z/',
					revealAr: 'تُنطق /z/ لأنها سبقت بأصوات مجهورة (d وحروف العلة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'عمود /s/: إذا سبق الـ s أحد الحروف المهموسة الخمسة: (p, t, k, f / ph / gh=f, th). أمثلة: stops, gets, books, speaks, cooks.',
				'عمود /iz/: إذا انتهت الكلمة الأصلية بأحد أصوات الصفير: (s, ss, sh, ch, x, z, ge, ce). أمثلة: washes, watches, finishes, buses, boxes, pages.',
				'عمود /z/: في جميع الحالات الأخرى (b, d, g, l, m, n, r, v, y وكل حروف العلة). أمثلة: reads, plays, prays, schools, goes, rooms.',
				'نصيحة ذهبية للامتحان: احفظ حروف عمود /s/ (p, t, k, f) وحروف عمود /iz/ (s, sh, ch, x, z, ge/ce)، وكل ما عداهما يذهب مباشرة إلى /z/!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: '3-Step Method to Solve Final -s in Exams',
				rootLabel: 'Remove the final -s / -es first',
				rootSub: 'Check the last sound of the root word',
				branches: [
					{
						label: 'Step 1: Check /iz/',
						rule: 's, ss, sh, ch, x, z, ge, ce',
						example: 'finishes, classes',
						color: '#b45309'
					},
					{
						label: 'Step 2: Check /s/',
						rule: 'p, t, k, f',
						example: 'books, gets, sleeps',
						color: '#1d4ed8'
					},
					{
						label: 'Step 3: Else = /z/',
						rule: 'All other letters & vowels',
						example: 'reads, prays, teachers',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'طريقة الخطوات الثلاث السريعة لحل جدول نطق النهاية -s بعلامة كاملة في الاختبار',
			examples: [
				{
					problemAr: 'صنّف الكلمات في الجدول (/s/ , /z/ , /iz/): sleeps, brushes, prayers, desks.',
					solutionAr: '/s/: sleeps, desks. /z/: prayers. /iz/: brushes.'
				},
				{
					problemAr: 'لماذا نصنّف "practices" في عمود /iz/ بينما نصنّف "writes" في عمود /s/؟',
					solutionAr: 'لأن "practice" تنتهي بصوت /s/ (المقطع ce) فتأخذ /iz/، بينما "write" تنتهي بصوت /t/ (حرف e صامت) فتأخذ /s/.'
				}
			],
			watchOutAr:
				'احذر من حرف (e) الصامت في آخر الكلمة! في كلمة "writes" الحرف المنطوق قبل s هو (t) فتُصنّف في /s/، أما في كلمة "pages" فالمقطع ge يُنطق /dj/ فتُصنّف في /iz/.'
		},
		practice: [
			{
				questionAr: 'كيف تُنطق النهاية (-s) في كلمة "books"؟',
				options: ['/s/', '/z/', '/iz/', 'صامتة لا تُنطق'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الحرف k من حروف عمود /s/ (p, t, k, f).',
					'الحرف k مهموس فيأخذ /s/ وليس /z/.',
					'عمود /iz/ لحروف الصفير (s, sh, ch, x, z, ge, ce).',
					'حرف الجمع s يُنطق دائما هنا.'
				],
				explanationAr: 'أصل الكلمة book ينتهي بـ k، لذلك تُنطق النهاية /s/.'
			},
			{
				questionAr: 'في أيّ عمود نصنّف الفعل "finishes"؟',
				options: ['/s/', '/z/', '/iz/', '/t/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المقطع sh لا ينتمي لعمود /s/.',
					'المقطع sh من أصوات الصفير فيأخذ /iz/.',
					'ممتاز! finish تنتهي بـ sh فتُنطق النهاية /iz/.',
					'/t/ تخص نهاية الماضي -ed وليس -s.'
				],
				explanationAr: 'الأفعال المنتهية بـ sh مثل finish و wash تُنطق نهايتها /iz/.'
			},
			{
				questionAr: 'اختر الكلمة التي تُنطق نهايتها /z/:',
				options: ['stops', 'watches', 'prays', 'cats'],
				correctIndex: 2,
				diagnosticFeedback: [
					'stops تنتهي بـ p فتُنطق /s/.',
					'watches تنتهي بـ ch فتُنطق /iz/.',
					'أحسنت! pray تنتهي بصوت علة (ay) فتُنطق النهاية /z/.',
					'cats تنتهي بـ t فتُنطق /s/.'
				],
				explanationAr: 'الأفعال والأسماء المنتهية بصوت علة مثل prays و plays و goes تُنطق /z/.'
			},
			{
				questionAr: 'ما الكلمة الدخيلة (Odd one out) في نطق النهاية (-s)؟',
				options: ['gets', 'helps', 'reads', 'speaks'],
				correctIndex: 2,
				diagnosticFeedback: [
					'gets تُنطق /s/ (بعد t).',
					'helps تُنطق /s/ (بعد p).',
					'صحيح! reads تُنطق بـ /z/ (بعد d) بينما البقية تُنطق بـ /s/.',
					'speaks تُنطق /s/ (بعد k).'
				],
				explanationAr: 'الكلمات gets, helps, speaks تنتهي بحروف t, p, k (/s/) أما reads فـ d (/z/).'
			},
			{
				questionAr: 'في أيّ عمود نصنّف كلمة "classes"؟',
				options: ['/s/', '/z/', '/iz/', '/id/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأصل class ينتهي بـ ss فيأخذ /iz/.',
					'ss من حروف الصفير فتأخذ /iz/ وليس /z/.',
					'أحسنت! كل كلمة تنتهي بـ s أو ss تأخذ /iz/.',
					'/id/ تخص الماضي -ed.'
				],
				explanationAr: 'كلمة class تنتهي بـ ss، لذلك تُنطق classes بالصوت /iz/.'
			}
		]
	}
];
