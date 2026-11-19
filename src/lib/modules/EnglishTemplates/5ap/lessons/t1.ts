import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPrimaryCards,
	svgEnglishWritingStructure
} from '../../svg-english';

// ===============================================================================
// Interactive Lessons - 5AP English - Trimester 1 (Jobs, Occupations & Hobbies)
// ===============================================================================

export const LESSONS_5AP_T1: EnglishInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: Jobs and Workplaces
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t1_jobs_workplaces',
		slug: 'eng-5ap-t1-jobs-workplaces',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: المهن والهوايات (Jobs, Occupations and Hobbies)',
		order: 1,
		titleAr: 'المهن النافعة وأماكن العمل (Jobs and Workplaces)',
		objectives: [
			'تسمية أبرز المهن النافعة باللغة الإنجليزية (teacher, doctor, nurse, baker, farmer, engineer, carpenter, firefighter).',
			'ربط كل مهنة بمكان عملها المناسب (school, hospital, bakery, farm, office, workshop, fire station).',
			'تكوين جملة إنجليزية بسيطة لوصف مهنة شخص ومكان عمله.'
		],
		keywordsAr: ['المهن', 'Jobs', 'Workplaces', 'doctor', 'teacher', 'baker', 'farmer'],
		discover: {
			scenarioAr:
				'في حصة الإنجليزية، عرض الأستاذ بطاقات لأصحاب مهن نافعة تخدم الحي والوطن: طبيب يعالج المرضى في المستشفى، ومعلم يدرّس في المدرسة، وخباز يخبز الخبز في المخبزة. لاحظ العلاقة بين المهنة ومكان العمل.',
			svg: svgEnglishPrimaryCards({
				title: 'Useful Jobs in Our Community',
				subtitle: 'المهن النافعة في مجتمعنا الجزائري',
				cards: [
					{ word: 'Teacher', arabic: 'معلم', color: '#2563eb' },
					{ word: 'Doctor', arabic: 'طبيب', color: '#059669' },
					{ word: 'Baker', arabic: 'خباز', color: '#d97706' },
					{ word: 'Farmer', arabic: 'فلاح', color: '#15803d' },
					{ word: 'Engineer', arabic: 'مهندس', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما اسم الطبيب باللغة الإنجليزية؟ وأين يعمل؟',
					hintAr: 'تبدأ الكلمة بحرف D ويعمل في المستشفى.',
					expectedInput: 'doctor',
					revealAr: 'الطبيب هو «doctor» ويعمل في المستشفى «hospital»: A doctor works in a hospital.'
				},
				{
					promptAr: 'ماذا نسمي الشخص الذي يخبز الخبز في المخبزة (bakery)؟',
					hintAr: 'تُشتق كلمة الخباز من الفعل bake.',
					expectedInput: 'baker',
					revealAr: 'الخباز هو «baker»: A baker works in a bakery.'
				},
				{
					promptAr: 'لاحظ الجملة: «A farmer works on a farm.» ما حرف الجر المستعمل قبل كلمة farm؟',
					hintAr: 'نستعمل in مع المستشفى والمدرسة، أما المزرعة فحرف جرها مختلف.',
					expectedInput: 'on',
					revealAr: 'نقول «in a school / in a hospital / in a bakery»، ولكن نقول «on a farm».'
				}
			]
		},
		summary: {
			rulesAr: [
				'للسؤال عن مهنة شخص نقول: «What is your father job?» أو «What does your father do?» (ما مهنة والدك؟).',
				'للإجابة نستعمل النمط البسيط: «He is a doctor.» (هو طبيب) أو «She is a teacher.» (هي معلمة).',
				'لوصف مكان العمل نستعمل الفعل «works»: مثال «A teacher works in a school.» و«A nurse works in a hospital.».',
				'معظم أماكن العمل تأخذ حرف الجر «in» (in a hospital, in a bakery, in a workshop, in an office)، أما المزرعة فتأخذ «on» (on a farm).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Jobs and Workplaces Pattern',
				rootLabel: 'A / An + Job + works + Place',
				rootSub: 'نمط الجملة الوصفية للمهنة ومكان العمل',
				branches: [
					{ label: 'Education', rule: 'Teacher', example: 'in a school', color: '#1d4ed8' },
					{ label: 'Health', rule: 'Doctor / Nurse', example: 'in a hospital', color: '#047857' },
					{ label: 'Food', rule: 'Baker / Farmer', example: 'in a bakery / on a farm', color: '#b45309' },
					{ label: 'Safety', rule: 'Firefighter', example: 'in a fire station', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خريطة المهن النافعة وأماكن عملها في اللغة الإنجليزية',
			examples: [
				{
					problemAr: 'عرّف بمهنة والدك (نجار يعمل في ورشة).',
					solutionAr: 'My father is a carpenter. He works in a workshop.'
				},
				{
					problemAr: 'عرّف بمهنة والدتك (ممرضة تعمل في مستشفى).',
					solutionAr: 'My mother is a nurse. She works in a hospital.'
				}
			],
			watchOutAr:
				'انتبه! نكتب «A doctor works in a hospital» بحرف s في نهاية الفعل «works» لأن الفاعل مفرد غائب، ونقول «on a farm» وليس «in a farm».'
		},
		practice: [
			{
				questionAr: 'Where does a doctor work?',
				options: ['In a hospital', 'In a bakery', 'On a farm', 'In a workshop'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الطبيب يعمل في المستشفى (hospital).',
					'المخبزة (bakery) مكان عمل الخباز وليس الطبيب.',
					'المزرعة (farm) مكان عمل الفلاح (farmer).',
					'الورشة (workshop) مكان عمل النجار (carpenter).'
				],
				explanationAr: 'A doctor treats sick people in a hospital.'
			},
			{
				questionAr: 'Who makes fresh bread every morning?',
				options: ['A farmer', 'A baker', 'A teacher', 'A firefighter'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفلاح يزرع الخضر والحبوب في المزرعة.',
					'أحسنت! الخباز (baker) يصنع الخبز الطازج في المخبزة.',
					'المعلم يدرّس التلاميذ في المدرسة.',
					'رجل الإطفاء يطفئ الحرائق وينقذ الناس.'
				],
				explanationAr: 'A baker bakes bread in a bakery.'
			},
			{
				questionAr: 'Complete the sentence: A carpenter works in a ............ .',
				options: ['school', 'hospital', 'workshop', 'farm'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المدرسة مكان عمل المعلم.',
					'المستشفى مكان عمل الطبيب والممرض.',
					'ممتاز! النجار (carpenter) يعمل في الورشة (workshop).',
					'المزرعة مكان عمل الفلاح.'
				],
				explanationAr: 'A carpenter makes wooden tables and doors in a workshop.'
			},
			{
				questionAr: 'Choose the right preposition: My uncle is a farmer. He works ............ a farm.',
				options: ['on', 'in', 'under', 'between'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! نستعمل حرف الجر «on» مع كلمة farm.',
					'مع كلمة farm في الإنجليزية نستعمل on وليس in.',
					'under تعني تحت ولا تناسب مكان العمل.',
					'between تعني بين شيئين.'
				],
				explanationAr: 'We always say: A farmer works on a farm.'
			},
			{
				questionAr: 'Which job helps put out fires and save people?',
				options: ['A nurse', 'An engineer', 'A firefighter', 'A baker'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الممرضة تساعد الطبيب والمرضى في المستشفى.',
					'المهندس يصمّم المباني والطرقات.',
					'أحسنت! رجل الإطفاء (firefighter) يطفئ الحرائق وينقذ الناس.',
					'الخباز يخبز الخبز.'
				],
				explanationAr: 'A firefighter puts out fires and works in a fire station.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: Present Simple (Affirmative & Negative)
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t1_present_simple',
		slug: 'eng-5ap-t1-present-simple',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: المهن والهوايات (Jobs, Occupations and Hobbies)',
		order: 2,
		titleAr: 'المضارع البسيط: الإثبات والنفي (Present Simple: Affirmative and Negative)',
		objectives: [
			'تصريف الأفعال في المضارع البسيط مع جميع الضمائر (I, You, We, They / He, She, It).',
			'إضافة -s أو -es للفعل مع ضمائر المفرد الغائب (He, She, It).',
			'صياغة النفي باستعمال «do not» و«does not» بشكل صحيح.'
		],
		keywordsAr: ['المضارع البسيط', 'Present Simple', 'verb + s', 'do not', 'does not'],
		discover: {
			scenarioAr:
				'قارن بين قول يوسف عن نفسه: «I read a book every day.» وقوله عن أخته مريم: «She reads a book every day. She does not watch television at night.» لاحظ التغيير الذي طرأ على الفعل.',
			svg: svgEnglishGrammarMap({
				title: 'Present Simple Tense',
				rootLabel: 'Present Simple (Daily Habits and Facts)',
				rootSub: 'للتعبير عن العادات اليومية والحقائق',
				branches: [
					{ label: 'I / You / We / They', rule: 'Base Verb (no -s)', example: 'I work / They read', color: '#1d4ed8' },
					{ label: 'He / She / It', rule: 'Verb + s / es', example: 'He works / She teaches', color: '#047857' },
					{ label: 'Negative (Plural/I)', rule: 'do not + Base Verb', example: 'We do not play', color: '#b45309' },
					{ label: 'Negative (He/She/It)', rule: 'does not + Base Verb', example: 'He does not work', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الذي أضفناه إلى الفعل «read» عندما استعملنا الضمير «She»؟',
					hintAr: 'قارن بين I read و She reads.',
					expectedInput: 's',
					revealAr: 'أضفنا الحرف «s» ليصبح «She reads» لأن الفاعل مفرد غائب (He / She / It).'
				},
				{
					promptAr: 'ما الفعل المساعد الذي استعملناه للنفي مع «She»؟',
					hintAr: 'ابحث عن الكلمتين قبل watch في الجملة المنفية.',
					expectedInput: 'does not',
					revealAr: 'استعملنا «does not» (أو اختصاراً doesn t) مع He / She / It، و«do not» مع I / You / We / They.'
				},
				{
					promptAr: 'هل بقي حرف s في الفعل «watch» بعد «does not»؟',
					hintAr: 'تأمل: She does not watch.',
					expectedInput: 'لا',
					revealAr: 'لا! بعد «does not» يعود الفعل دائماً إلى أصله المجرد (watch) بلا s ولا es.'
				}
			]
		},
		summary: {
			rulesAr: [
				'نستعمل المضارع البسيط (Present Simple) للحديث عن المهن والعادات اليومية والهوايات.',
				'في الإثبات مع (I, You, We, They) يبقى الفعل كما هو: «I like reading. / They play football.».',
				'في الإثبات مع (He, She, It) نضيف «s» للفعل (works, reads, plays)، ونضيف «es» إذا انتهى الفعل بـ o, s, sh, ch, x (goes, teaches, washes).',
				'في النفي نضع «do not» مع (I, You, We, They) و«does not» مع (He, She, It)، ويأتي بعدهما الفعل مجرداً دائماً دون «s».'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '3 Steps to Use Present Simple Correctly',
				steps: [
					{ stage: 'Check Subject', detail: 'Is it I/You/We/They or He/She/It?', color: '#1d4ed8' },
					{ stage: 'Affirmative', detail: 'Add -s or -es ONLY with He, She, It (He works)', color: '#047857' },
					{ stage: 'Negative', detail: 'Use do not / does not + Base Verb (no -s!)', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'خطوات تصريف الفعل في المضارع البسيط إثباتاً ونفياً',
			examples: [
				{
					problemAr: 'صرّف الفعل بين قوسين: Amin (teach) Arabic at school.',
					solutionAr: 'Amin teaches Arabic at school. (لأن Amin = He والفعل ينتهي بـ ch فنضيف es).'
				},
				{
					problemAr: 'حوّل إلى النفي: She likes cycling.',
					solutionAr: 'She does not like cycling. (نضع does not ونحذف s من الفعل like).'
				}
			],
			watchOutAr:
				'خطأ شائع جداً: كتابة «He does not works» بحرف s! الصواب دائماً «He does not work» لأن «does» أخذت العلامة عن الفعل.'
		},
		practice: [
			{
				questionAr: 'Choose the right verb: My father ............ in a hospital.',
				options: ['work', 'works', 'working', 'to work'],
				correctIndex: 1,
				diagnosticFeedback: [
					'My father مفرد غائب (He) لذلك نحتاج لإضافة s.',
					'أحسنت! مع He / She / It نضيف s للفعل في المضارع البسيط.',
					'working لا تُستعمل هنا بدون am/is/are.',
					'نحتاج فعلاً مصرّفاً وليس مصدراً بـ to.'
				],
				explanationAr: 'My father equals He, so we add -s: works.'
			},
			{
				questionAr: 'Choose the right verb: Every morning, Meriem ............ to school on foot.',
				options: ['go', 'gos', 'goes', 'going'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Meriem مفرد مؤنث (She) لذلك لا يبقى الفعل go مجرداً.',
					'الفعل المنتهي بحرف o يأخذ es وليس s فقط.',
					'ممتاز! الفعل go ينتهي بـ o فنضيف es مع She ليصبح goes.',
					'going غير مناسبة للمضارع البسيط.'
				],
				explanationAr: 'Verbs ending in -o take -es with he/she/it: go becomes goes.'
			},
			{
				questionAr: 'Choose the correct negative sentence:',
				options: [
					'He does not plays football.',
					'He do not play football.',
					'He does not play football.',
					'He not plays football.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ! بعد does not نحذف s من الفعل.',
					'مع He نستعمل does not وليس do not.',
					'أحسنت! الصيغة الصحيحة: He does not play football.',
					'لا نضع not مباشرة قبل الفعل في المضارع البسيط.'
				],
				explanationAr: 'With He, negative is: does not + base verb (play).'
			},
			{
				questionAr: 'Complete: We ............ books in the library every Friday.',
				options: ['reads', 'read', 'reading', 'is read'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع الضمير We لا نضيف s للفعل.',
					'أحسنت! مع I / You / We / They يبقى الفعل مجرداً: read.',
					'reading تحتاج فعلاً مساعداً وهي لزمن آخر.',
					'is read تركيب غير صحيح هنا.'
				],
				explanationAr: 'With We, the Present Simple uses the base verb: read.'
			},
			{
				questionAr: 'Turn into negative: They work on a farm.',
				options: [
					'They does not work on a farm.',
					'They do not works on a farm.',
					'They do not work on a farm.',
					'They are not work on a farm.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع They نستعمل do not وليس does not.',
					'بعد do not يبقى الفعل مجرداً بلا s.',
					'ممتاز! They do not work on a farm.',
					'ننفي الفعل الأساسي بـ do not وليس are not.'
				],
				explanationAr: 'With They, we use do not + base verb: They do not work.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Pronouns, To Be and To Have
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t1_pronouns_be_have',
		slug: 'eng-5ap-t1-pronouns-be-have',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: المهن والهوايات (Jobs, Occupations and Hobbies)',
		order: 3,
		titleAr: 'الضمائر وفعلا الكينونة والملكية (Pronouns, To Be and To Have)',
		objectives: [
			'استعمال ضمائر الفاعل (I, You, He, She, It, We, They) بدقة في الجملة.',
			'تصريف فعل الكينونة (to be: am / is / are) لتقديم النفس والعمر والمهنة.',
			'تصريف فعل الملكية (to have: have / has) للحديث عن الأسرة والمقتنيات.'
		],
		keywordsAr: ['الضمائر', 'To be', 'To have', 'am is are', 'have has'],
		discover: {
			scenarioAr:
				'تقدّم تلميذة جزائرية نفسها لزميلاتها: «Hello! I am Khadidja. I am ten years old. I have two brothers. My father is an engineer and he has a big office.» تأمل الكلمات am, is, have, has.',
			svg: svgEnglishGrammarMap({
				title: 'Verb To Be (فعل الكينونة)',
				rootLabel: 'To Be = am / is / are',
				rootSub: 'للاسم والعمر والمهنة والجنسية',
				branches: [
					{ label: 'I', rule: 'am', example: 'I am ten years old.', color: '#1d4ed8' },
					{ label: 'He / She / It', rule: 'is', example: 'He is a doctor.', color: '#047857' },
					{ label: 'You / We / They', rule: 'are', example: 'We are Algerian.', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي تأتي بعد الضمير «I» لتقديم الاسم أو العمر؟',
					hintAr: 'انظر إلى جملة: I ... Khadidja.',
					expectedInput: 'am',
					revealAr: 'بعد «I» نستعمل دائماً «am»: I am Khadidja. I am ten years old.'
				},
				{
					promptAr: 'لماذا استعملنا «is» في جملة «My father is an engineer»؟',
					hintAr: 'ما الضمير الذي يعوّض My father؟',
					expectedInput: 'He',
					revealAr: 'لأن «My father» مفرد مذكر يعوضه الضمير «He»، ومع (He / She / It) نستعمل «is».'
				},
				{
					promptAr: 'قارن بين «I have two brothers» و«He has a big office». متى نستعمل «has»؟',
					hintAr: 'انظر إلى الضمير قبل has.',
					expectedInput: 'He / She / It',
					revealAr: 'نستعمل «has» مع (He / She / It)، ونستعمل «have» مع (I / You / We / They).'
				}
			]
		},
		summary: {
			rulesAr: [
				'فعل الكينونة (To Be): «I am»، و«He / She / It is»، و«You / We / They are». نستعمله للاسم والعمر والمهنة والجنسية.',
				'فعل الملكية (To Have): «I / You / We / They have»، و«He / She / It has». نستعمله للأسرة والأشياء التي نملكها.',
				'صفات الملكية المفيدة في التعريف: «my» (لي)، «his» (له)، «her» (لها)، «our» (لنا). مثال: «My name is Youssef. His job is a baker.».',
				'في العمر بالإنجليزية نستعمل «to be» وليس «to have»: نقول «I am ten years old» (وليس I have ten years).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Verb To Have (فعل الملكية)',
				rootLabel: 'To Have = have / has',
				rootSub: 'للحديث عن الأسرة والمقتنيات',
				branches: [
					{ label: 'I / You', rule: 'have', example: 'I have a bicycle.', color: '#1d4ed8' },
					{ label: 'We / They', rule: 'have', example: 'They have a garden.', color: '#047857' },
					{ label: 'He / She / It', rule: 'has', example: 'She has two sisters.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'تصريف فعل الملكية To Have مع الضمائر',
			examples: [
				{
					problemAr: 'أكمل بـ am / is / are: My friends ............ polite pupils.',
					solutionAr: 'My friends are polite pupils. (لأن My friends جمع = They).'
				},
				{
					problemAr: 'أكمل بـ have / has: Bilal ............ a new English book.',
					solutionAr: 'Bilal has a new English book. (لأن Bilal مفرد مذكر = He).'
				}
			],
			watchOutAr:
				'تذكّر دائماً! في الإنجليزية نعبر عن العمر بفعل الكينونة (to be): نقول «She is eleven years old» ولا نقول «She has eleven years»!'
		},
		practice: [
			{
				questionAr: 'Complete: Hello! I ............ eleven years old.',
				options: ['is', 'are', 'am', 'have'],
				correctIndex: 2,
				diagnosticFeedback: [
					'is تأتي مع He / She / It.',
					'are تأتي مع You / We / They.',
					'أحسنت! نعبّر عن العمر بـ to be ومع I نقول: I am eleven years old.',
					'في الإنجليزية لا نستعمل have للعمر بل نستعمل am / is / are.'
				],
				explanationAr: 'For age in English, we use verb to be: I am eleven years old.'
			},
			{
				questionAr: 'Complete: My sister ............ a nice blue bag.',
				options: ['have', 'has', 'are', 'am'],
				correctIndex: 1,
				diagnosticFeedback: [
					'have تأتي مع I / You / We / They.',
					'ممتاز! My sister = She لذلك نستعمل has.',
					'are فعل كينونة للجمع وليس للملكية.',
					'am تأتي فقط مع الضمير I.'
				],
				explanationAr: 'My sister equals She, so we use has for possession.'
			},
			{
				questionAr: 'Complete: Ahmed and Karim ............ good friends.',
				options: ['is', 'am', 'are', 'has'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Ahmed and Karim اثنان (جمع = They) فلا نضع is.',
					'am خاصة بالضمير I فقط.',
					'صحيح! Ahmed and Karim = They لذلك نضع are.',
					'الجملة تصفهما فتحتاج فعل الكينونة are.'
				],
				explanationAr: 'Two people (Ahmed and Karim) equal They, so we use are.'
			},
			{
				questionAr: 'Replace the underlined subject with a pronoun: «Amina» is a teacher.',
				options: ['He', 'She', 'It', 'They'],
				correctIndex: 1,
				diagnosticFeedback: [
					'He للمفرد المذكر.',
					'أحسنت! أمينة اسم مؤنث مفرد يعوّضه الضمير She.',
					'It لغير العاقل المفرد.',
					'They للجمع.'
				],
				explanationAr: 'Amina is one female person, so we replace it with She.'
			},
			{
				questionAr: 'Choose the right sentence:',
				options: [
					'We has a clean school.',
					'We is a clean school.',
					'We have a clean school.',
					'We am a clean school.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع We نستعمل have وليس has.',
					'is لا تأتي مع We ولا تعبّر عن الملكية.',
					'ممتاز! We have a clean school.',
					'am خاصة بالضمير I فقط.'
				],
				explanationAr: 'With We, we use have: We have a clean school.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: Articles a / an, Capitalization and Punctuation
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t1_articles_punctuation',
		slug: 'eng-5ap-t1-articles-punctuation',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: المهن والهوايات (Jobs, Occupations and Hobbies)',
		order: 4,
		titleAr: 'أدوات النكرة والحروف الكبيرة وعلامات الترقيم (a / an, Capitals and Punctuation)',
		objectives: [
			'التمييز بين أداتي النكرة «a» و«an» قبل الأسماء المفردة (خاصة المهن).',
			'توظيف الحروف الكبيرة (Capital Letters) في مواضعها الصحيحة.',
			'وضع النقطة (.) وعلامة الاستفهام (?) والفاصلة (,) بدقة في الجملة الإنجليزية.'
		],
		keywordsAr: ['أدوات النكرة', 'a / an', 'Capitalization', 'Punctuation', 'vowels'],
		discover: {
			scenarioAr:
				'كتب أمين جملتين على اللوحة: «My uncle is a doctor.» و«My aunt is an engineer.» ثم سأل: لماذا وضعنا «a» قبل doctor و«an» قبل engineer؟ ولماذا كتبنا حرف M كبيراً؟',
			svg: svgEnglishGrammarMap({
				title: 'Indefinite Articles: a / an',
				rootLabel: 'Singular Countable Noun',
				rootSub: 'قبل الاسم المفرد النكرة',
				branches: [
					{ label: 'Use: a', rule: 'Before consonant sound', example: 'a teacher / a baker / a nurse', color: '#1d4ed8' },
					{ label: 'Use: an', rule: 'Before vowel sound (a,e,i,o,u)', example: 'an engineer / an architect', color: '#047857' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الأول في كلمة «engineer»؟ وهل هو حرف متحرك (vowel) أم ساكن (consonant)؟',
					hintAr: 'الحروف المتحركة الخمسة هي: a, e, i, o, u.',
					expectedInput: 'e',
					revealAr: 'تبدأ كلمة «engineer» بالحرف المتحرك «e»، لذلك نضع قبلها «an»: an engineer.'
				},
				{
					promptAr: 'ما أداة النكرة المناسبة قبل كلمة «baker»؟',
					hintAr: 'الحرف b حرف ساكن (consonant).',
					expectedInput: 'a',
					revealAr: 'نضع «a» لأن b حرف ساكن: a baker.'
				},
				{
					promptAr: 'بأي علامة ننهي الجملة الخبرية، وبأي علامة ننهي السؤال؟',
					hintAr: 'قارن بين: I am Algerian. و Where do you live?',
					expectedInput: 'النقطة وعلامة الاستفهام',
					revealAr: 'ننهي الجملة الخبرية بنقطة (.) وننهي السؤال بعلامة استفهام (?).'
				}
			]
		},
		summary: {
			rulesAr: [
				'نستعمل «an» قبل الاسم المفرد الذي يبدأ بصوت متحرك (a, e, i, o, u): مثل «an engineer, an architect, an apple, an orange, an umbrella».',
				'نستعمل «a» قبل الاسم المفرد الذي يبدأ بصوت ساكن (باقي الحروف): مثل «a doctor, a teacher, a farmer, a carpenter, a book».',
				'نكتب الحرف الكبير (Capital Letter) في: بداية كل جملة، أسماء الأشخاص (Youssef, Meriem)، أسماء الدول والمدن (Algeria, Oran, Setif)، أيام الأسبوع والشهور (Friday, May)، والضمير «I» أينما ورد في الجملة.',
				'علامات الترقيم الأساسية: النقطة (.) في نهاية الجملة الخبرية، وعلامة الاستفهام (?) في نهاية السؤال، والفاصلة (,) للتعداد أو بعد التحية (Hello,).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Capitalization and Punctuation Checklist',
				steps: [
					{ stage: 'Start of Sentence', detail: 'Always begin with a Capital letter (My father...)', color: '#1d4ed8' },
					{ stage: 'Names and Places', detail: 'Capitalize people, cities, countries, pronoun I', color: '#047857' },
					{ stage: 'End Mark', detail: 'Put a full stop (.) for statements, (?) for questions', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'بطاقة مراجعة الحروف الكبيرة وعلامات الترقيم في اللغة الإنجليزية',
			examples: [
				{
					problemAr: 'أكمل بـ a أو an: My cousin is ............ architect and his sister is ............ nurse.',
					solutionAr: 'My cousin is an architect and his sister is a nurse.'
				},
				{
					problemAr: 'أعد كتابة الجملة بالحروف الكبيرة وعلامات الترقيم: hello i live in tlemcen',
					solutionAr: 'Hello, I live in Tlemcen.'
				}
			],
			watchOutAr:
				'لا تنسَ أبداً كتابة الضمير «I» (أنا) بحرف كبير حتى لو جاء في وسط الجملة: «My sister and I like reading.» وليس «My sister and i».'
		},
		practice: [
			{
				questionAr: 'Choose the right article: My uncle is ............ engineer.',
				options: ['a', 'an', 'are', 'am'],
				correctIndex: 1,
				diagnosticFeedback: [
					'engineer تبدأ بحرف متحرك e فلا نضع a.',
					'أحسنت! نضع an قبل الكلمات التي تبدأ بصوت متحرك (a, e, i, o, u).',
					'are فعل وليس أداة نكرة.',
					'am فعل وليس أداة نكرة.'
				],
				explanationAr: 'Engineer begins with the vowel sound /e/, so we write: an engineer.'
			},
			{
				questionAr: 'Choose the right article: She wants to be ............ teacher.',
				options: ['an', 'a', 'is', 'the an'],
				correctIndex: 1,
				diagnosticFeedback: [
					'teacher تبدأ بحرف ساكن t فلا نضع an.',
					'ممتاز! teacher تبدأ بصوت ساكن فتأخذ a.',
					'is فعل كينونة وليس أداة نكرة.',
					'لا نجمع بين the و an.'
				],
				explanationAr: 'Teacher begins with the consonant t, so we write: a teacher.'
			},
			{
				questionAr: 'Which sentence has correct capitalization and punctuation?',
				options: [
					'my name is karim i live in oran.',
					'My name is Karim. I live in Oran.',
					'My name is karim, i live in oran?',
					'my name is Karim. i live in Oran'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتاج حروفاً كبيرة لبداية الجملة والاسم والضمير I واسم المدينة.',
					'أحسنت! بداية الجملة، الاسم Karim، الضمير I، المدينة Oran كلها بحروف كبيرة ومع نقطتين.',
					'الجملة خبرية فلا تنتهي بعلامة استفهام، والاسم والمدينة والضمير I تحتاج حروفاً كبيرة.',
					'بداية الجملة والضمير I تحتاج حروفاً كبيرة والنقطة ناقصة في الآخر.'
				],
				explanationAr: 'Capitalize sentence starts, names (Karim), cities (Oran), and pronoun I, and end statements with a full stop.'
			},
			{
				questionAr: 'Which end punctuation fits: Where do you live',
				options: ['.', '?', ',', ':'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النقطة للجملة الخبرية وهذه جملة استفهامية تبدأ بـ Where.',
					'ممتاز! السؤال الذي يبدأ بـ Where ينتهي بعلامة استفهام (?).',
					'الفاصلة لا تنهي الجملة.',
					'النقطتان لا تنهيان السؤال.'
				],
				explanationAr: 'Where do you live? is a question, so it ends with a question mark (?).'
			},
			{
				questionAr: 'Choose the group where ALL words take «an»:',
				options: [
					'apple, doctor, orange',
					'engineer, architect, orange',
					'baker, farmer, teacher',
					'umbrella, school, park'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'doctor تبدأ بحرف ساكن فتأخذ a.',
					'أحسنت! engineer و architect و orange تبدأ كلها بحروف متحركة (e, a, o).',
					'كلها تبدأ بحروف ساكنة وتأخذ a.',
					'school و park تبدآن بحروف ساكنة وتأخذان a.'
				],
				explanationAr: 'An engineer, an architect, an orange all start with vowel sounds.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: Clean Hobbies and Daily Routine
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t1_hobbies_routine',
		slug: 'eng-5ap-t1-hobbies-routine',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: المهن والهوايات (Jobs, Occupations and Hobbies)',
		order: 5,
		titleAr: 'الهوايات النافعة والروتين اليومي (Clean Hobbies and Daily Routine)',
		objectives: [
			'التعبير عن الهوايات النافعة والرياضات المفيدة باستعمال «like / likes + verb-ing».',
			'ترتيب الأنشطة اليومية البسيطة باللغة الإنجليزية (wake up, pray, have breakfast, go to school, do homework).',
			'كتابة ثلاث إلى أربع جمل سليمة عن هواياتك ويومك الدراسي.'
		],
		keywordsAr: ['الهوايات', 'Hobbies', 'Daily Routine', 'like + ing', 'reading', 'swimming'],
		discover: {
			scenarioAr:
				'ينظّم بلال وقته بين الدراسة والهوايات المفيدة، فيقول: «I wake up early, pray Fajr, and go to school at eight. In my free time, I like reading stories and playing football. My sister likes swimming and cycling.»',
			svg: svgEnglishPrimaryCards({
				title: 'Clean Hobbies and Sports',
				subtitle: 'هوايات ورياضات نافعة لتلميذ السنة الخامسة',
				cards: [
					{ word: 'Reading', arabic: 'المطالعة', color: '#2563eb' },
					{ word: 'Swimming', arabic: 'السباحة', color: '#0284c7' },
					{ word: 'Football', arabic: 'كرة القدم', color: '#059669' },
					{ word: 'Chess', arabic: 'الشطرنج', color: '#7c3aed' },
					{ word: 'Cycling', arabic: 'ركوب الدراجة', color: '#d97706' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الصيغة التي جاءت بعد الفعل «like» في جملة «I like reading stories»؟',
					hintAr: 'تأمل نهاية الفعل read.',
					expectedInput: 'reading',
					revealAr: 'بعد «like / likes» نضع الفعل مضافاً إليه «ing»: like reading, like swimming, like playing.'
				},
				{
					promptAr: 'ما حرف الجر المستعمل قبل الساعة (eight) في «at eight»؟',
					hintAr: 'ابحث عن الكلمة القصيرة قبل eight.',
					expectedInput: 'at',
					revealAr: 'قبل الساعات نستعمل دائماً حرف الجر «at»: at seven, at eight o clock.'
				},
				{
					promptAr: 'كيف عبّر بلال عن هواية أخته مريم؟ لماذا أضاف s إلى like؟',
					hintAr: 'تأمل: My sister likes swimming.',
					expectedInput: 'likes',
					revealAr: 'قال «My sister likes swimming» بإضافة s لأن «My sister» مفرد غائب (She).'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعبير عن الهواية نستعمل: «I like + verb-ing» أو «My favourite hobby is ...». مثال: «I like reading books.» و«My favourite sport is swimming.».',
				'مع (He / She) نقول «likes + verb-ing»: مثال «He likes playing chess.» و«She likes cycling.».',
				'أهم أفعال الروتين اليومي: wake up (أستيقظ)، pray (أصلي)، have breakfast (أتناول الفطور)، go to school (أذهب إلى المدرسة)، do my homework (أنجز واجباتي)، sleep early (أنام باكراً).',
				'نستعمل «at» مع الساعات (at 7:00)، و«in» مع فترات اليوم (in the morning, in the afternoon, in the evening)، و«on» مع أيام الأسبوع (on Friday).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'My Daily Routine Blueprint',
				steps: [
					{ stage: 'Morning', detail: 'I wake up early, pray, and have breakfast.', color: '#1d4ed8' },
					{ stage: 'School', detail: 'I go to school at eight o clock.', color: '#047857' },
					{ stage: 'Afternoon', detail: 'I do my homework and read books.', color: '#b45309' },
					{ stage: 'Free Time', detail: 'On Friday, I like playing football or cycling.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'خطوات وصف الروتين اليومي والهوايات باللغة الإنجليزية',
			examples: [
				{
					problemAr: 'كوّن جملة عن هوايتك (المطالعة ولعب الشطرنج).',
					solutionAr: 'In my free time, I like reading books and playing chess.'
				},
				{
					problemAr: 'كوّن جملة عن روتين أختك (الاستيقاظ باكراً والذهاب للمدرسة على الثامنة).',
					solutionAr: 'My sister wakes up early and goes to school at eight o clock.'
				}
			],
			watchOutAr:
				'تذكّر حروف الجر الزمنية الثلاثة: «at» للساعات (at 8:00)، «on» للأيام (on Friday)، و«in» لفترات اليوم (in the morning).'
		},
		practice: [
			{
				questionAr: 'Complete: In my free time, I like ............ useful books.',
				options: ['read', 'reading', 'reads', 'am read'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد like في التعبير عن الهوايات نضيف ing للفعل.',
					'أحسنت! like + verb-ing: I like reading useful books.',
					'لا نضع reads بعد like.',
					'am read صيغة غير صحيحة.'
				],
				explanationAr: 'To talk about hobbies, we use like + verb-ing: like reading.'
			},
			{
				questionAr: 'Choose the right preposition: I go to school ............ eight o clock.',
				options: ['in', 'on', 'at', 'under'],
				correctIndex: 2,
				diagnosticFeedback: [
					'in تُستعمل لفترات اليوم (in the morning) وليس للساعة.',
					'on تُستعمل لأيام الأسبوع (on Friday).',
					'ممتاز! نستعمل «at» قبل الساعات المحددة.',
					'under حرف مكان يعني تحت.'
				],
				explanationAr: 'We always use at before clock times: at eight o clock.'
			},
			{
				questionAr: 'Choose the right preposition: We visit our grandparents ............ Friday.',
				options: ['at', 'in', 'on', 'to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'at للساعات وليس لأيام الأسبوع.',
					'in للشهور والفصول وفترات اليوم.',
					'أحسنت! نستعمل «on» قبل أيام الأسبوع: on Friday.',
					'to تعني إلى ولا تستعمل قبل أيام الأسبوع.'
				],
				explanationAr: 'Days of the week take the preposition on: on Friday.'
			},
			{
				questionAr: 'Complete: Karim ............ playing chess with his brother.',
				options: ['like', 'likes', 'liking', 'are like'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Karim = He لذلك نحتاج لإضافة s إلى الفعل like.',
					'أحسنت! Karim likes playing chess.',
					'liking لا تُستعمل وحدها كفعل رئيسي.',
					'are like تركيب غير صحيح.'
				],
				explanationAr: 'Karim equals He, so we write likes + playing.'
			},
			{
				questionAr: 'Which daily routine action comes FIRST in the morning?',
				options: ['Sleep early', 'Do homework', 'Wake up early', 'Have dinner'],
				correctIndex: 2,
				diagnosticFeedback: [
					'النوم باكراً يكون في الليل.',
					'إنجاز الواجبات يكون بعد العودة من المدرسة.',
					'ممتاز! أول نشاط في الصباح هو الاستيقاظ باكراً (Wake up early).',
					'تناول العشاء يكون في المساء.'
				],
				explanationAr: 'Every morning starts with waking up early (Wake up early).'
			}
		]
	}
];
