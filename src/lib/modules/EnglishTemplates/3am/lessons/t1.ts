import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_3AM_T1: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Expressing Ability & Inability (can / cannot / be able to)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t1_ability_can_cant',
		slug: 'eng-3am-t1-ability-can-cant',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، قدراتي، اهتماماتي وشخصيتي (Me, My Abilities, My Interests and My Personality)',
		order: 1,
		titleAr: 'التعبير عن القدرة وعدم القدرة (can / cannot / be able to)',
		objectives: [
			'استعمال الفعل الناقص can و cannot للتعبير عن القدرة وعدم القدرة في الحاضر بدقة',
			'صياغة الجمل المثبتة والمنفية والاستفهامية مع can واستعمال be able to كبديل مماثل'
		],
		keywordsAr: ['can', 'cannot', 'ability', 'inability', 'be able to', 'stem'],
		discover: {
			scenarioAr:
				'يقدّم التلميذ أمين نفسه في نادي العلوم بمتوسطته في الجزائر العاصمة قائلاً: "I can solve maths puzzles and I can recite Surah Al-Mulk, but I cannot speak Japanese. Can you play chess?" لاحظ شكل الفعل الذي جاء مباشرة بعد can و cannot!',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Ability in Present (can / cannot)',
				rootLabel: 'Modal Verb: CAN',
				rootSub: 'Always followed by bare stem (no to, no -s)',
				branches: [
					{ label: 'Affirmative (+)', rule: 'Subject + can + stem', example: 'Amine can swim well.', color: '#047857' },
					{ label: 'Negative (-)', rule: 'Subject + cannot + stem', example: 'He cannot drive a car.', color: '#b45309' },
					{ label: 'Question (?)', rule: 'Can + Subject + stem?', example: 'Can you speak English?', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي استعملها أمين للتعبير عن قدرته على حل الألغاز الرياضية؟',
					hintAr: 'تبدأ بحرف c وتسبق الفعل solve مباشرة.',
					expectedInput: 'can',
					revealAr: 'استعمل الفعل الناقص (can) متبوعاً بأصل الفعل (solve) دون أي إضافة.'
				},
				{
					promptAr: 'هل يتغير الفعل (can) أو الفعل بعده مع الضمير (He / She)؟ مثلاً: هل نقول She cans swims؟',
					hintAr: 'الأفعال الناقصة في الإنجليزية لا تأخذ s أبداً مع المفرد الغائب.',
					expectedInput: 'لا، نقول She can swim',
					revealAr: 'لا يتغير أبداً! الصحيح هو: She can swim (بدون s على can وبدون s على swim).'
				},
				{
					promptAr: 'كيف نسأل زميلنا عن قدرته على كتابة الخط العربي؟',
					hintAr: 'ابدأ بـ Can ثم الفاعل ثم أصل الفعل.',
					expectedInput: 'Can you write Arabic calligraphy?',
					revealAr: 'نقدّم Can على الفاعل: Can you write Arabic calligraphy? والإجابة القصيرة: Yes, I can. / No, I cannot.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعبير عن القدرة (Ability) في الحاضر: Subject + can + Verb stem (مثال: Meriem can recite the Quran clearly).',
				'للتعبير عن عدم القدرة (Inability): Subject + cannot (can not / cannot) + Verb stem (مثال: Sami cannot lift this heavy box).',
				'للسؤال عن القدرة: Can + Subject + Verb stem? والإجابة المختصرة: Yes, I can / No, I cannot.',
				'تُستعمل الصيغة (am / is / are + able to + stem) بنفس معنى can، مثل: Karim is able to fix computers.',
				'قاعدة ذهبية: بعد (can / cannot) يأتي الفعل في صورته الأصلية دائماً بدون (to) وبدون (-s) وبدون (-ing).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Present Ability',
				tenseName: 'can / be able to',
				formula: 'Subject + can / cannot + Verb (stem)',
				activeZone: 'present',
				example: 'Youssef can draw geometric shapes, and he is able to code.',
				markers: 'now, today, very well, easily'
			}),
			visualCaptionAr: 'صيغة التعبير عن القدرة الحالية بالفعل الناقص can وما يكافئه be able to',
			examples: [
				{
					problemAr: 'صحّح الخطأ في الجملة: "Salma cans to speak three languages."',
					solutionAr: 'Salma can speak three languages. (حذفنا s من can وحذفنا to قبل speak).'
				},
				{
					problemAr: 'حوّل الجملة إلى النفي ثم إلى الاستفهام: "Tariq can play chess."',
					solutionAr: 'Negative: Tariq cannot play chess. | Question: Can Tariq play chess?'
				},
				{
					problemAr: 'أعد كتابة الجملة باستعمال (be able to): "We can help our neighbours."',
					solutionAr: 'We are able to help our neighbours.'
				}
			],
			watchOutAr:
				'أشهر خطأين في الفروض والاختبارات: إضافة (to) بعد can مثل (can to write) أو إضافة (-s) مع he/she مثل (He can writes). تذكّر دائماً: بعد can يأتي الفعل مجرداً تماماً!'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة نحوياً:',
				options: [
					'Amina can speaks English well.',
					'Amina can to speak English well.',
					'Amina can speak English well.',
					'Amina cans speak English well.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نضيف -s للفعل بعد can.',
					'لا نستعمل to بعد الفعل الناقص can.',
					'أحسنت! بعد can يأتي أصل الفعل (speak) مجرداً تماماً.',
					'الفعل الناقص can لا يقبل -s أبداً.'
				],
				explanationAr: 'القاعدة: Subject + can + bare stem (speak).'
			},
			{
				questionAr: 'كيف نكمل الجملة المنفية: "My little brother is four; he ...... ride a bicycle yet."',
				options: ['can', 'cannot', 'is able', 'cans not'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة تتحدث عن طفل صغير وكلمة yet تدل على عدم القدرة.',
					'ممتاز! cannot تعبّر عن عدم القدرة في الحاضر.',
					'صيغة is able تحتاج إلى to وتعبّر عن الإثبات.',
					'لا توجد صيغة cans not في اللغة الإنجليزية.'
				],
				explanationAr: 'للتعبير عن عدم القدرة نستعمل cannot متبوعة بأصل الفعل (ride).'
			},
			{
				questionAr: 'ما السؤال الصحيح للإجابة: "Yes, she can draw maps accurately."',
				options: [
					'Does she can draw maps accurately?',
					'Can she draws maps accurately?',
					'Can she draw maps accurately?',
					'Is she can draw maps accurately?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نستعمل Does مع الفعل الناقص can.',
					'الفعل بعد can يبقى مجرداً (draw) دون s.',
					'صحيح! نبدأ بـ Can + Subject + bare stem.',
					'لا نجمع بين Is و can.'
				],
				explanationAr: 'في السؤال مع can نقلب الفاعل مع can: Can she draw...?'
			},
			{
				questionAr: 'اختر الجملة المكافئة لـ: "They can build a wooden model."',
				options: [
					'They are able to build a wooden model.',
					'They is able to build a wooden model.',
					'They are able build a wooden model.',
					'They able to build a wooden model.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! They تأخذ are، وتُتبع بـ able to + stem.',
					'الضمير They يأخذ are وليس is.',
					'نحتاج إلى حرف الجر to بعد able.',
					'لا بد من وجود الفعل المساعد be (are) قبل able to.'
				],
				explanationAr: 'البديل الصحيح لـ can مع They هو: They are able to + stem.'
			},
			{
				questionAr: 'أكمل الحوار القصير: "Can you swim across the pool?" — "No, ...... ."',
				options: ['I can', 'I cannot', 'I am not', 'I do not'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة No تتطلب نفياً.',
					'إجابة صحيحة ومطابقة لبداية السؤال بـ Can.',
					'السؤال بدأ بـ Can وليس بـ Are.',
					'السؤال بدأ بـ Can وليس بـ Do.'
				],
				explanationAr: 'الإجابة المختصرة المنفية على سؤال يبدأ بـ Can هي: No, I cannot.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Adverbs of Frequency & Asking "How often...?"
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t1_frequency_adverbs',
		slug: 'eng-3am-t1-frequency-adverbs',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، قدراتي، اهتماماتي وشخصيتي (Me, My Abilities, My Interests and My Personality)',
		order: 2,
		titleAr: 'ظروف التكرار والسؤال بـ How often (Adverbs of Frequency)',
		objectives: [
			'ترتيب ظروف التكرار حسب نسبتها (always, usually, often, sometimes, rarely, never)',
			'وضع ظرف التكرار في موضعه الصحيح قبل الفعل الرئيسي وبعد الفعل to be وطرح السؤال بـ How often'
		],
		keywordsAr: ['always', 'usually', 'often', 'sometimes', 'never', 'How often'],
		discover: {
			scenarioAr:
				'تحدّثت خديجة عن يومها الدراسي: "I always pray Fajr on time. I am usually early for school. I never waste my study time." تأمّل موقع always و never مقارنة بموقع usually!',
			svg: svgEnglishGrammarMap({
				title: 'Position of Frequency Adverbs',
				rootLabel: 'always (100%) - usually (80%) - often (60%) - sometimes (40%) - never (0%)',
				rootSub: 'Used with Present Simple to describe routines',
				branches: [
					{ label: 'Before Main Verb', rule: 'Subject + Adv + Verb', example: 'He always reads books.', color: '#1d4ed8' },
					{ label: 'After Verb TO BE', rule: 'Subject + am/is/are + Adv', example: 'She is always polite.', color: '#047857' },
					{ label: 'Asking Frequency', rule: 'How often + do/does + S + V?', example: 'How often do you revise?', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في جملة "I always pray Fajr"، هل جاء ظرف التكرار (always) قبل الفعل الرئيسي أم بعده؟',
					hintAr: 'انظر إلى ترتيب الكلمتين always و pray.',
					expectedInput: 'قبل الفعل الرئيسي',
					revealAr: 'جاء قبل الفعل الرئيسي (pray): Subject + always + main verb.'
				},
				{
					promptAr: 'في جملة "I am usually early"، لماذا جاء ظرف التكرار (usually) بعد (am)؟',
					hintAr: 'الفعل am هو تصريف الفعل المساعد to be في الحاضر.',
					expectedInput: 'لأن ظرف التكرار يأتي بعد الفعل to be',
					revealAr: 'مع الفعل (to be: am / is / are)، نضع ظرف التكرار بعده مباشرة: She is always kind.'
				},
				{
					promptAr: 'ما أداة الاستفهام التي نطرح بها سؤالاً عن عدد مرات تكرار الفعل؟',
					hintAr: 'تتكوّن من كلمتين وتبدأ بـ How.',
					expectedInput: 'How often',
					revealAr: 'نستعمل (How often) متبوعة بـ (do / does + Subject + stem)، مثل: How often do you visit the library?'
				}
			]
		},
		summary: {
			rulesAr: [
				'سلّم التكرار من الأكثر إلى الأقل: always (دائماً 100%)، usually (عادةً 80%)، often (غالباً 60%)، sometimes (أحياناً 40%)، rarely (نادراً 15%)، never (أبداً 0%).',
				'الموضع الأول: يأتي ظرف التكرار قبل الفعل الرئيسي العادي: I often help my mother.',
				'الموضع الثاني: يأتي ظرف التكرار بعد الفعل (to be): Bilal is never late for class.',
				'للسؤال عن التكرار نستعمل: How often + do / does + Subject + bare stem? (مثال: How often does Nabil read history books?).',
				'تُستعمل ظروف التكرار مع زمن الحاضر البسيط (Present Simple)؛ ولا ننسى إضافة (-s / -es) للفعل مع (he / she / it).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Daily Habits & Frequency',
				tenseName: 'Present Simple + Frequency Adverbs',
				formula: 'S + adv + Verb(-s)  |  S + am/is/are + adv',
				activeZone: 'present',
				example: 'Omar always revises his lessons and is never lazy.',
				markers: 'always, usually, often, sometimes, rarely, never, every day'
			}),
			visualCaptionAr: 'الفرق الدقيق بين موضع ظرف التكرار مع الفعل العادي ومع الفعل to be',
			examples: [
				{
					problemAr: 'ضع ظرف التكرار في مكانه الصحيح: "Nadia helps her grandmother. (always)"',
					solutionAr: 'Nadia always helps her grandmother. (قبل الفعل الرئيسي helps).'
				},
				{
					problemAr: 'ضع ظرف التكرار في مكانه الصحيح: "They are respectful to their teachers. (always)"',
					solutionAr: 'They are always respectful to their teachers. (بعد الفعل are).'
				},
				{
					problemAr: 'اطرح سؤالاً مناسباً للجملة: "I visit the school library twice a week."',
					solutionAr: 'How often do you visit the school library?'
				}
			],
			watchOutAr:
				'لا تستعمل النفي (do not / does not) مع كلمة (never)! خطأ شائع: "He does not never tell lies." الصواب: "He never tells lies." لأن never تفيد النفي بذاتها، ولا تنسَ الـ s في tells.'
		},
		practice: [
			{
				questionAr: 'اختر الترتيب الصحيح للجملة:',
				options: [
					'Karim reads always the Quran after Fajr.',
					'Karim always reads the Quran after Fajr.',
					'Always Karim reads the Quran after Fajr.',
					'Karim always read the Quran after Fajr.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ظرف التكرار يأتي قبل الفعل العادي (reads) وليس بعده.',
					'أحسنت! always قبل الفعل الرئيسي reads مع إضافة -s للغائب المفرد.',
					'الموضع القياسي لـ always هو بين الفاعل والفعل.',
					'مع الفاعل المفرد Karim يجب إضافة -s للفعل: reads.'
				],
				explanationAr: 'القاعدة: Subject + adverb + main verb (مع -s للمفرد الغائب).'
			},
			{
				questionAr: 'اختر الجملة الصحيحة مع الفعل (to be):',
				options: [
					'Our teacher always is patient.',
					'Our teacher is patient always.',
					'Our teacher is always patient.',
					'Our teacher are always patient.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع الفعل to be يأتي ظرف التكرار بعده لا قبله.',
					'الموضع الطبيعي لـ always هو مباشرة بعد is.',
					'ممتاز! Subject + is + always + adjective.',
					'Our teacher مفرد فيأخذ is وليس are.'
				],
				explanationAr: 'ظرف التكرار يقع مباشرة بعد (am / is / are).'
			},
			{
				questionAr: 'أي جملة صحيحة للتعبير عن 0% من التكرار؟',
				options: [
					'Salim does not never arrive late.',
					'Salim never arrives late.',
					'Salim never arrive late.',
					'Salim is never arrives late.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجوز الجمع بين النفي (does not) و (never).',
					'صحيح! never تغني عن النفي ويأخذ الفعل arrives حرف -s.',
					'الفاعل Salim مفرد، لذا نحتاج إلى arrives.',
					'لا نجمع بين is وفعل مضارع بسيط arrives.'
				],
				explanationAr: 'تستعمل never في جملة مثبتة الشكل وتعطي معنى النفي التام.'
			},
			{
				questionAr: 'أكمل السؤال: "...... does Fatima practise Arabic calligraphy?" — "Three times a week."',
				options: ['How many', 'How much', 'How often', 'How old'],
				correctIndex: 2,
				diagnosticFeedback: [
					'How many تُسأل بها عن العدد مع اسم جمع.',
					'How much تُسأل بها عن الكمية أو السعر.',
					'صحيح! How often تُستعمل للسؤال عن التكرار.',
					'How old تُسأل بها عن العمر.'
				],
				explanationAr: 'عندما تتضمن الإجابة (twice a week / every day / always) نطرح السؤال بـ How often.'
			},
			{
				questionAr: 'رتّب ظروف التكرار الآتية من الأعلى نسبة إلى الأدنى:',
				options: [
					'always - sometimes - usually - never',
					'always - usually - sometimes - never',
					'usually - always - never - sometimes',
					'never - sometimes - usually - always'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'usually (80%) أعلى من sometimes (40%).',
					'ممتاز! 100% always ثم 80% usually ثم 40% sometimes ثم 0% never.',
					'always أعلى نسبة (100%) وتبدأ السلسلة بها.',
					'هذا الترتيب تصاعدي من الأدنى إلى الأعلى.'
				],
				explanationAr: 'الترتيب التنازلي الصحيح هو: always (100%), usually (80%), sometimes (40%), never (0%).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Personality Adjectives & Clean Interests (keen on / fond of + V-ing)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t1_personality_interests',
		slug: 'eng-3am-t1-personality-interests',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، قدراتي، اهتماماتي وشخصيتي (Me, My Abilities, My Interests and My Personality)',
		order: 3,
		titleAr: 'صفات الشخصية والاهتمامات الهادفة (Personality & Interests)',
		objectives: [
			'استعمال صفات الشخصية الإيجابية والسلبية وأضدادها لوصف النفس والآخرين',
			'التعبير عن الهوايات والاهتمامات النافعة باستعمال keen on / fond of / interested in + V-ing'
		],
		keywordsAr: ['personality', 'hard-working', 'polite', 'keen on', 'fond of', 'interested in'],
		discover: {
			scenarioAr:
				'كتب يونس في بطاقة التعارف المدرسية: "I am a calm, honest, and hard-working pupil. I am keen on reading Islamic history, fond of playing chess, and interested in robotics." لاحظ نوع الكلمة التي تأتي بعد (keen on / fond of / interested in)!',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Interests & Personality',
				rootLabel: 'My Personality & Clean Interests',
				rootSub: 'be + keen on / fond of / interested in + (Noun or V-ing)',
				branches: [
					{ label: 'keen on + V-ing', rule: 'Strong enthusiasm', example: 'I am keen on reading.', color: '#1d4ed8' },
					{ label: 'fond of + V-ing', rule: 'Liking something much', example: 'She is fond of drawing.', color: '#047857' },
					{ label: 'interested in + V-ing', rule: 'Curiosity & focus', example: 'He is interested in coding.', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الصفات الثلاث التي وصف بها يونس شخصيته في النص القصير؟',
					hintAr: 'جاءت قبل كلمة pupil.',
					expectedInput: 'calm, honest, hard-working',
					revealAr: 'وصف شخصيته بـ: calm (هادئ)، honest (صادق/أمين)، و hard-working (مجتهد).'
				},
				{
					promptAr: 'ماذا أضفنا إلى الفعل (read) بعد العبارة (keen on) وإلى الفعل (play) بعد (fond of)؟',
					hintAr: 'انظر إلى آخر كلمتي reading و playing.',
					expectedInput: '-ing',
					revealAr: 'أضفنا اللاحقة (-ing) لأن حروف الجر (on / of / in) تُتبع دائماً باسم أو فعل ينتهي بـ (-ing) (Gerund).'
				},
				{
					promptAr: 'ما ضد صفتي (hard-working) و (polite)؟',
					hintAr: 'ضد مجتهد كسول، وضد مؤدب غير مؤدب بإضافة بادئة im-.',
					expectedInput: 'lazy و impolite',
					revealAr: 'ضد hard-working هو lazy، وضد polite هو impolite (أو rude).'
				}
			]
		},
		summary: {
			rulesAr: [
				'للسؤال عن الشخصية نستعمل: What is he/she like? (كيف هي شخصيته/شخصيتها؟) — والإجابة بصفات الشخصية: He is polite, tidy, and helpful.',
				'أهم صفات الشخصية وأضدادها في 3AM: hard-working / lazy، polite / impolite، honest / dishonest، shy / sociable، tidy / messy، calm / nervous، generous / selfish.',
				'للتعبير عن الاهتمامات الهادفة (مثل القراءة، حفظ القرآن، الخط العربي، الشطرنج، البرمجة، السباحة): be + keen on / fond of / interested in + Noun أو Verb-ing.',
				'مثال تطبيقي: Asma is fond of writing short stories and interested in astronomy.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'How to Write Your Personal Profile (3AM)',
				steps: [
					{ stage: 'Greeting & Name', detail: 'Hello! My name is... I am a 3MS pupil from Algeria.' },
					{ stage: 'Personality', detail: 'I am calm, honest, and hard-working.' },
					{ stage: 'Abilities', detail: 'I can solve maths problems and speak two languages.' },
					{ stage: 'Clean Interests', detail: 'I am keen on reading books and fond of playing football.' }
				]
			}),
			visualCaptionAr: 'خطوات كتابة بطاقة شخصية منظمة تجمع الشخصية والقدرات والاهتمامات في 3AM',
			examples: [
				{
					problemAr: 'صغ جملة صحيحة من الكلمات: (Zineb / be / keen on / learn / calligraphy).',
					solutionAr: 'Zineb is keen on learning calligraphy.'
				},
				{
					problemAr: 'ميّز بين السؤالين: "What is Omar like?" و "What does Omar like?"',
					solutionAr: 'What is Omar like? يسأل عن شخصيته (He is kind and serious). أما What does Omar like? فيسأل عن هواياته وما يحبه (He likes reading and swimming).'
				}
			],
			watchOutAr:
				'احذر الخلط بين السؤال عن الشخصية (What is he like?) والسؤال عن الميول (What does he like?)! وتذكّر دائماً إضافة (-ing) للفعل بعد حروف الجر (on / of / in).'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بالفعل الصحيح: "Houssam is keen on ...... science books."',
				options: ['read', 'reads', 'reading', 'to read'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد حرف الجر on نحتاج إلى الفعل مع -ing.',
					'لا نستعمل المضارع البسيط بعد حرف الجر.',
					'أحسنت! بعد keen on يأتي الفعل مضافاً إليه -ing.',
					'لا نجمع بين on و to read.'
				],
				explanationAr: 'العبارات keen on / fond of / interested in تتبعها دائماً صيغة (V-ing) أو اسم.'
			},
			{
				questionAr: 'ما حرف الجر الصحيح مع كلمة (fond): "My sister is fond ...... Arabic calligraphy."',
				options: ['in', 'on', 'of', 'at'],
				correctIndex: 2,
				diagnosticFeedback: [
					'in تأتي مع interested in.',
					'on تأتي مع keen on.',
					'ممتاز! الصيغة الصحيحة هي: fond of.',
					'at تأتي مع good at.'
				],
				explanationAr: 'احفظ التلازمات الثلاثة: keen on، fond of، interested in.'
			},
			{
				questionAr: 'ما ضد الصفة (tidy) (منظّم ومرتّب)؟',
				options: ['messy', 'clever', 'polite', 'kind'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! messy تعني فوضوي وغير مرتّب (أو untidy).',
					'clever تعني ذكي.',
					'polite تعني مؤدب.',
					'kind تعني لطيف.'
				],
				explanationAr: 'ضد tidy هو messy أو untidy.'
			},
			{
				questionAr: 'اختر الإجابة المناسبة للسؤال: "What is your best friend like?"',
				options: [
					'He likes football and chess.',
					'He is honest, calm, and helpful.',
					'He is 14 years old.',
					'He lives in Setif.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه إجابة لسؤال What does he like? وليس What is he like?',
					'رائع! السؤال What is he like? يستفسر عن صفات الشخصية.',
					'هذه إجابة لسؤال How old is he?',
					'هذه إجابة لسؤال Where does he live?'
				],
				explanationAr: 'السؤال (What + be + subject + like?) مخصص لوصف الشخصية.'
			},
			{
				questionAr: 'اختر الصفة المناسبة: "A pupil who works hard every day and revises all lessons is ...... ."',
				options: ['lazy', 'selfish', 'hard-working', 'nervous'],
				correctIndex: 2,
				diagnosticFeedback: [
					'lazy تعني كسول وهو عكس المعنى.',
					'selfish تعني أناني.',
					'صحيح! hard-working تعني مجتهد ومثابر.',
					'nervous تعني متوتر أو عصبي.'
				],
				explanationAr: 'التلميذ الذي يجتهد ويراجع دروسه يومياً يوصف بـ hard-working.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Pronunciation of can / cannot (Weak & Strong Forms) and Final -s
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t1_pronunciation_can_final_s',
		slug: 'eng-3am-t1-pronunciation-can-final-s',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، قدراتي، اهتماماتي وشخصيتي (Me, My Abilities, My Interests and My Personality)',
		order: 4,
		titleAr: 'نطق can / cannot (الصيغة الضعيفة والقوية) ونطق النهاية -s',
		objectives: [
			'التمييز بين النطق الضعيف والنطق القوي لـ can ونطق النفي cannot في الجملة الإنجليزية',
			'تصنيف الكلمات المنتهية بـ -s / -es في الجدول الصوتي (/s/ و /z/ و /iz/) بدقة تامة'
		],
		keywordsAr: ['weak form', 'strong form', 'final -s', '/s/', '/z/', '/iz/'],
		discover: {
			scenarioAr:
				'استمع في القسم لجملتين: 1) "I can speak English." 2) "Yes, I can! No, I cannot." ثم تأمّل نهاية الكلمات: (books, pens, watches). لماذا يتغيّر صوت الحرف الأخير -s بين هذه الكلمات الثلاث؟',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -s / -es',
				subtitle: 'Look at the LAST SOUND before -s (not the silent letter)',
				columns: [
					{ sound: '/s/', rule: 'After p, t, k, f, th', examples: 'books, helps, writes', color: '#1d4ed8' },
					{ sound: '/z/', rule: 'After vowels & b,d,g,l,m,n,r,v', examples: 'pens, reads, plays', color: '#047857' },
					{ sound: '/iz/', rule: 'After s, sh, ch, x, z, ge', examples: 'watches, washes, boxes', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة المثبتة العادية "I can read fast"، هل تُنطق (can) بصوت قصير مخفّف (weak form) أم بصوت قوي ممدود؟',
					hintAr: 'الكلمة الأساسية المشدّدة في الجملة هي الفعل read وليس can.',
					expectedInput: 'بصوت ضعيف مخفّف (weak form)',
					revealAr: 'في وسط الجملة المثبتة والسؤال، تُنطق (can) بصيغة ضعيفة مخفّفة (weak form)، بينما تُنطق بصيغة قوية (strong form) في الإجابة المختصرة (Yes, I can).'
				},
				{
					promptAr: 'انظر إلى الحرف الذي يسبق -s في كلمة (books). أي صوت نسمعه في النهاية؟',
					hintAr: 'الحرف k صوت مهموس لا تهتز فيه الحبال الصوتية.',
					expectedInput: '/s/',
					revealAr: 'لأن k صوت مهموس، تُنطق النهاية /s/ في كلمة books.'
				},
				{
					promptAr: 'لماذا نسمع مقطعاً إضافياً /iz/ في نهاية كلمة (watches) وكلمة (classes)؟',
					hintAr: 'انتهت الكلمتان بـ ch و s وهي أصوات صفيرية.',
					expectedInput: 'لأنها تنتهي بأصوات صفيرية (ch و s)',
					revealAr: 'بعد الأصوات الصفيرية (s, ss, sh, ch, x, z, ce, ge) نضيف صوتاً فاصلاً /iz/ لتسهيل النطق.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النطق الضعيف لـ (can) (Weak Form): يقع في الجملة المثبتة العادية (I can draw) وفي بداية السؤال (Can you swim?)، حيث يختصر صوت العلة.',
				'النطق القوي لـ (can) (Strong Form): يقع في نهاية الإجابة المختصرة المثبتة (Yes, I can.) أو عند التأكيد.',
				'النفي (cannot) يُنطق دائماً بصوت طويل واضح وقوي (Strong Form) للتمييز الواضح بين القدرة وعدمها.',
				'قاعدة النهاية (-s / -es): 1) تُنطق /s/ بعد (p, t, k, f, ph, gh=/f/, th). 2) تُنطق /iz/ بعد (s, ss, sh, ch, x, z, ce, ge). 3) تُنطق /z/ بعد بقية الأصوات المجهورة وحروف العلة (b, d, g, l, m, n, r, v, y, vowels).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Weak vs Strong Forms of CAN / CANNOT',
				subtitle: 'How pronunciation changes with sentence position',
				columns: [
					{ sound: 'Weak (can)', rule: 'Inside statement / question', examples: 'I can swim. Can you?', color: '#1d4ed8' },
					{ sound: 'Strong (can)', rule: 'Short positive answer', examples: 'Yes, I can.', color: '#047857' },
					{ sound: 'Strong (cannot)', rule: 'Always stressed (negative)', examples: 'No, I cannot.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'مواضع الصيغة الضعيفة والصيغة القوية للفعل الناقص can والنفي cannot',
			examples: [
				{
					problemAr: 'صنّف الكلمات في الجدول الصوتي للنهاية -s: (speaks - teaches - plays - helps - boxes - reads).',
					solutionAr: '/s/: speaks, helps | /z/: plays, reads | /iz/: teaches, boxes.'
				},
				{
					problemAr: 'حدّد هل نطق (can) ضعيف أم قوي في: "Can you solve it? — Yes, I can."',
					solutionAr: 'الأولى في السؤال (Can you) نطقها ضعيف (Weak form)، والثانية في الإجابة المختصرة (Yes, I can) نطقها قوي (Strong form).'
				}
			],
			watchOutAr:
				'انتبه لكلمات مثل (languages, bridges, pages, classes, watches): وجود الحرف e قبل s لا يعني /s/ بل تُنطق كلها /iz/ لأن الصوت الأخير قبل النهاية هو صوت صفيري!'
		},
		practice: [
			{
				questionAr: 'كيف تُنطق النهاية (-s) في كلمة (helps)؟',
				options: ['/s/', '/z/', '/iz/', 'صامتة لا تُنطق'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الحرف p مهموس فتُنطق النهاية /s/.',
					'الصوت /z/ يأتي بعد الأصوات المجهورة وحروف العلة.',
					'الصوت /iz/ يأتي بعد s, sh, ch, x, z, ge.',
					'النهاية -s في الإنجليزية تُنطق دائماً.'
				],
				explanationAr: 'القاعدة: بعد (p, t, k, f) تُنطق النهاية /s/.'
			},
			{
				questionAr: 'أي كلمة مما يلي تُنطق نهايتها بصوت /iz/؟',
				options: ['books', 'plays', 'washes', 'friends'],
				correctIndex: 2,
				diagnosticFeedback: [
					'books تنتهي بـ k فتُنطق /s/.',
					'plays تنتهي بحرف علة فتُنطق /z/.',
					'ممتاز! washes تنتهي بـ sh فتُنطق /iz/.',
					'friends تنتهي بـ d مجهور فتُنطق /z/.'
				],
				explanationAr: 'الكلمات المنتهية بـ sh مثل washes تُنطق نهايتها /iz/.'
			},
			{
				questionAr: 'في أي جملة مما يلي تُنطق كلمة (can) بالصيغة القوية (Strong form)؟',
				options: [
					'I can read Arabic well.',
					'Can you play chess?',
					'Yes, I can.',
					'She can draw maps.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'في وسط الجملة المثبتة تُنطق بصيغة ضعيفة.',
					'في بداية السؤال تُنطق بصيغة ضعيفة.',
					'صحيح! في الإجابة القصيرة المثبتة (Yes, I can) تُنطق بصيغة قوية.',
					'في وسط الجملة المثبتة تُنطق بصيغة ضعيفة.'
				],
				explanationAr: 'الصيغة القوية لـ can تظهر في نهاية الإجابات القصيرة (Yes, I can).'
			},
			{
				questionAr: 'كيف تُنطق النهاية (-s) في كلمة (reads) وكلمة (days)؟',
				options: ['/s/', '/z/', '/iz/', '/id/'],
				correctIndex: 1,
				diagnosticFeedback: [
					'd وحرف العلة ليست أصواتاً مهموسة.',
					'صحيح! بعد الصوت المجهور d وحرف العلة تُنطق النهاية /z/.',
					'لا يوجد صوت صفيري قبل النهاية.',
					'/id/ خاص بنهاية الماضي -ed وليس -s.'
				],
				explanationAr: 'بعد الأصوات المجهورة (مثل d) وحروف العلة تُنطق النهاية /z/.'
			},
			{
				questionAr: 'أي مجموعة تنتمي جميع كلماتها إلى العمود /s/؟',
				options: [
					'writes, books, stops',
					'pens, bags, doors',
					'watches, boxes, buses',
					'reads, likes, washes'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! t و k و p كلها أصوات مهموسة تأخذ /s/.',
					'كلها أصوات مجهورة تأخذ /z/.',
					'كلها أصوات صفيرية تأخذ /iz/.',
					'هذه المجموعة مختلطة بين /z/ و /s/ و /iz/.'
				],
				explanationAr: 'writes (t), books (k), stops (p) كلها تنتهي بصوت /s/.'
			}
		]
	}
];
