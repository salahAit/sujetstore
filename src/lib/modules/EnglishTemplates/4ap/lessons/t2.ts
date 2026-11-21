import type { EnglishInteractiveLessonData } from '../../types';
import { svgEnglishGrammarMap } from '../../svg-english';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimester 2 (School Facilities & Prepositions, Clean Hobbies, Present Simple, Can)
// ═══════════════════════════════════════════════════════════════════════════════

const svgPrepositionsDiscover = renderLessonIllustration('pri_lang_04_house_rooms_cutaway', {
	lang: 'en',
	title: 'Prepositions of Place (in, on, under, next to) in Rooms & School',
	customLegend: [
		{ num: '1', label: 'The lamp is next to the bed in the bedroom' },
		{ num: '2', label: 'The sink is next to the bathtub in the bathroom' },
		{ num: '3', label: 'The plates are in the cupboards in the kitchen' },
		{ num: '4', label: 'The flowers are in the garden next to the house' }
	]
});

const svgPrepositionsSummary = svgEnglishGrammarMap({
	title: 'School Places & Prepositions of Place — المدرسة وحروف المكان',
	rootLabel: 'Where is ...?',
	rootSub: 'Classroom, Library, Courtyard, Canteen',
	branches: [
		{
			label: 'in / on',
			rule: 'inside vs on top',
			example: 'The book is on the desk.',
			color: '#1d4ed8'
		},
		{
			label: 'under',
			rule: 'below something',
			example: 'The bag is under the chair.',
			color: '#047857'
		},
		{
			label: 'next to',
			rule: 'beside / near',
			example: 'The library is next to the office.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgHobbiesDiscover = renderLessonIllustration('pri_lang_07_clean_park_planting', {
	lang: 'en',
	title: 'Fun Time & Clean Hobbies: Gardening and Protecting Nature',
	customLegend: [
		{ num: '1', label: 'Gardening: planting a green sapling in the soil' },
		{ num: '2', label: 'Watering colorful flowers in free time' },
		{ num: '3', label: 'Keeping our park clean for sports and walking' }
	]
});

const svgHobbiesSummary = svgEnglishGrammarMap({
	title: 'Expressing Free-Time Hobbies — التعبير عن الهوايات النافعة',
	rootLabel: 'What is your hobby?',
	rootSub: 'My favourite hobby is ... / I love + verb-ing',
	branches: [
		{
			label: 'Sports',
			rule: 'playing football, running, swimming',
			example: 'I love swimming.',
			color: '#047857'
		},
		{
			label: 'Mind & Study',
			rule: 'reading books, playing chess',
			example: 'I like reading stories.',
			color: '#1d4ed8'
		},
		{
			label: 'Nature & Art',
			rule: 'drawing nature, gardening',
			example: 'She likes drawing trees.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgPresentSimpleDiscover = renderLessonIllustration('pri_lang_01_red_bus_train', {
	lang: 'en',
	title: 'Present Simple Tense: Daily School Bus & Train Routines',
	customLegend: [
		{ num: '1', label: 'I go to school by bus / He goes to school by bus (-es)' },
		{ num: '2', label: 'The fast train leaves at eight o clock every morning' }
	]
});

const svgPresentSimpleSummary = svgEnglishGrammarMap({
	title: 'Present Simple Rule — قاعدة المضارع البسيط (s مع He/She/It)',
	rootLabel: 'Present Simple (المضارع البسيط)',
	rootSub: 'Add -s or -es ONLY with He, She, It',
	branches: [
		{
			label: 'I / You / We / They',
			rule: 'Base Verb (no -s)',
			example: 'I read / We play',
			color: '#1d4ed8'
		},
		{
			label: 'He / She / It (+s)',
			rule: 'Verb + s',
			example: 'He plays / She reads',
			color: '#047857'
		},
		{
			label: 'He / She / It (+es)',
			rule: 'After o, sh, ch, x',
			example: 'He goes / She washes',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgModalCanDiscover = renderLessonIllustration('pri_lang_02_airplane_ship', {
	lang: 'en',
	title: 'Expressing Ability with Can / Cannot: Sky and Sea',
	customLegend: [
		{ num: '1', label: 'An airplane can fly high in the sky' },
		{ num: '2', label: 'A ship can sail on the sea, but it cannot fly' }
	]
});

const svgModalCanSummary = svgEnglishGrammarMap({
	title: 'Modal Verb Can — قاعدة الاستطاعة (can / cannot)',
	rootLabel: 'Subject + can / cannot + Base Verb',
	rootSub: 'NEVER add -s after can (He can swim!)',
	branches: [
		{
			label: 'Affirmative',
			rule: 'Subject + can + verb',
			example: 'She can draw well.',
			color: '#047857'
		},
		{
			label: 'Negative',
			rule: 'Subject + cannot + verb',
			example: 'He cannot swim yet.',
			color: '#dc2626'
		},
		{
			label: 'Question',
			rule: 'Can + subject + verb?',
			example: 'Can you play chess? Yes, I can.',
			color: '#1d4ed8'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T2 (4 Lessons — yearSubjectId: 800)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T2: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_4ap_t2_school_prepositions',
		slug: 'eng-4ap-t2-school-prepositions',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدرستي ومرافقها (My School Facilities)',
		order: 1,
		titleAr: 'مرافق المدرسة وحروف المكان (School Facilities and Prepositions)',
		objectives: [
			'حفظ أسماء مرافق المدرسة بالإنجليزية (classroom, library, courtyard, canteen, office)',
			'استعمال حروف المكان الأربعة بدقة: in (في)، on (على)، under (تحت)، next to (بجانب)',
			'وصف موقع القاعات والأدوات داخل المدرسة بجمل واضحة'
		],
		keywordsAr: ['مرافق المدرسة', 'library', 'courtyard', 'canteen', 'in', 'on', 'under', 'next to'],
		discover: {
			scenarioAr:
				'جال يوسف مع زميله الجديد في المدرسة ليعرّفه بمرافقها فقال: «Our classroom is next to the library. The pupils play in the courtyard. Look, my book is on the desk and my bag is under the chair!».',
			svg: svgPrepositionsDiscover,
			steps: [
				{
					promptAr: 'أين يقرأ التلاميذ الكتب القصصية والمفيدة في المدرسة؟',
					hintAr: 'المكتبة بالإنجليزية هي library.',
					expectedInput: 'library',
					revealAr: 'يقرأ التلاميذ في المكتبة «the library»، ويلعبون في الساحة «the courtyard»، ويأكلون في المطعم «the canteen».'
				},
				{
					promptAr: 'ما الفرق بين «on the desk» و«under the desk»؟',
					hintAr: 'on تعني فوق/على، و under تعني تحت.',
					expectedInput: 'on is top, under is below',
					revealAr: '«on» تعني على السطح (فوق الطاولة)، أما «under» فتعني تحت الطاولة.'
				},
				{
					promptAr: 'ما العبارة التي نستعملها لنقول إن القسم «بجانب» المكتبة؟',
					hintAr: 'كلمتان تبدآن بـ next ...',
					expectedInput: 'next to',
					revealAr: 'نستعمل «next to» (بجانب): «The classroom is next to the library.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'مرافق المدرسة: classroom (القسم), library (المكتبة), courtyard (الساحة), canteen (المطعم), office (مكتب المدير).',
				'«in» (في / داخل): The pen is in the pencil case. / The pupils are in the courtyard.',
				'«on» (على / فوق ملامساً): The book is on the desk.',
				'«under» (تحت) و«next to» (بجانب): The bag is under the chair. / The canteen is next to the courtyard.'
			],
			visualSvg: svgPrepositionsSummary,
			visualCaptionAr: 'حروف المكان الأربعة الأساسية مع أمثلة من داخل المدرسة',
			examples: [
				{
					problemAr: 'أكمل بحرف المكان المناسب (in / on / under / next to):\n1) The ruler is ...... the bag.\n2) The library is ...... the office.',
					solutionAr: '1) The ruler is in the bag.\n2) The library is next to the office.'
				},
				{
					problemAr: 'أين نجد الكتب للقراءة في المدرسة؟ وأين نتناول الغداء؟',
					solutionAr: 'Books for reading: in the library. / Lunch: in the canteen.'
				}
			],
			watchOutAr:
				'لا تكتب «next» وحدها بدون «to»! حرف المكان الصحيح هو دائماً كلمتان معاً: «next to».'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «library» باللغة العربية؟',
				options: ['المطعم', 'المكتبة', 'الساحة', 'الحديقة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المطعم هو canteen.',
					'أحسنت! library هي المكتبة التي نطالع فيها الكتب.',
					'الساحة هي courtyard.',
					'الحديقة هي garden.'
				],
				explanationAr: 'library تعني المكتبة المدرسية.'
			},
			{
				questionAr: 'الكتاب موضوع فوق سطح الطاولة. اختر حرف المكان الصحيح: «The book is ...... the desk.»',
				options: ['under', 'in', 'on', 'next'],
				correctIndex: 2,
				diagnosticFeedback: [
					'under تعني تحت الطاولة.',
					'in تعني داخل الطاولة.',
					'ممتاز! on تعني على سطح الطاولة.',
					'next وحدها ناقصة ولا تعني فوق.'
				],
				explanationAr: 'عندما يكون الشيء فوق سطح ما نستعمل on.'
			},
			{
				questionAr: 'أكمل الجملة: «The classroom is ...... the library.» (بجانب)',
				options: ['next to', 'under', 'on', 'in'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! next to تعني بجانب.',
					'under تعني تحت.',
					'on تعني فوق.',
					'in تعني داخل.'
				],
				explanationAr: 'للتعبير عن المجاورة بين غرفتين نستعمل next to.'
			},
			{
				questionAr: 'أين يلعب التلاميذ في وقت الاستراحة بالمدرسة؟',
				options: ['In the courtyard', 'In the kitchen', 'On the board', 'Under the pen'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! courtyard هي ساحة المدرسة.',
					'kitchen هو المطبخ في المنزل.',
					'board هي السبورة.',
					'هذه عبارة غير منطقية.'
				],
				explanationAr: 'في الاستراحة يلعب التلاميذ في الساحة: in the courtyard.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t2_clean_hobbies',
		slug: 'eng-4ap-t2-clean-hobbies',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: وقت الفراغ والهوايات المفيدة (Fun Time and Hobbies)',
		order: 2,
		titleAr: 'وقت الفراغ والهوايات النافعة (Fun Time and Clean Hobbies)',
		objectives: [
			'حفظ أسماء الهوايات والرياضات النافعة بالإنجليزية (reading, running, playing football, swimming, chess, drawing)',
			'التعبير عن الهواية المفضلة بجمل صحيحة: My favourite hobby is... / I like + verb-ing',
			'إدراك أهمية استثمار وقت الفراغ في القراءة والرياضة النافعة'
		],
		keywordsAr: ['الهوايات', 'Hobbies', 'reading', 'playing football', 'swimming', 'running', 'drawing', 'chess'],
		discover: {
			scenarioAr:
				'في عطلة نهاية الأسبوع، يقضي أمين وأخته مريم وقتهما في هوايات مفيدة؛ أمين يحب كرة القدم (playing football) والجري (running)، ومريم تحب القراءة (reading) ورسم الطبيعة (drawing).',
			svg: svgHobbiesDiscover,
			steps: [
				{
					promptAr: 'ماذا نسمي هواية «القراءة» و«السباحة» باللغة الإنجليزية؟',
					hintAr: 'القراءة: reading، والسباحة: swimming.',
					expectedInput: 'reading and swimming',
					revealAr: 'القراءة هي «reading»، والسباحة «swimming»، وهما من أنفع الهوايات للعقل والجسم.'
				},
				{
					promptAr: 'ما الحروف الثلاثة التي نجدها في نهاية أسماء معظم الهوايات مثل reading, running, drawing؟',
					hintAr: 'انظر إلى آخر ثلاث أحرف في كل كلمة.',
					expectedInput: 'ing',
					revealAr: 'تنتهي بـ «ing» لأننا نحوّل الفعل إلى اسم هواية بعد like / love: «I like reading.», «I love swimming.».'
				},
				{
					promptAr: 'كيف نسأل صديقنا عن هوايته المفضلة؟',
					hintAr: 'What is your favourite ...?',
					expectedInput: 'What is your favourite hobby?',
					revealAr: 'نسأل: «What is your favourite hobby?» ويجيب: «My favourite hobby is playing football.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'هوايات رياضية نافعة: playing football (لعب كرة القدم), running (الجري), swimming (السباحة), riding a bike (ركوب الدراجة).',
				'هوايات فكرية وفنية: reading books (قراءة الكتب), playing chess (لعب الشطرنج), drawing nature (رسم الطبيعة), gardening (البستنة).',
				'للتعبير عن الهواية المفضلة نقول: «My favourite hobby is reading.» أو «I like playing football.».',
				'بعد الفعلين (like / love) نضيف (ing) للفعل: read تصبح reading، draw تصبح drawing، swim تصبح swimming.'
			],
			visualSvg: svgHobbiesSummary,
			visualCaptionAr: 'تصنيف الهوايات المفيدة والرياضات النافعة في وقت الفراغ',
			examples: [
				{
					problemAr: 'أكمل الجملة بالهواية المناسبة: I like ...... books in the library. / He loves ...... football in the stadium.',
					solutionAr: 'I like reading books in the library. / He loves playing football in the stadium.'
				},
				{
					problemAr: 'أجب عن السؤال: «What is your favourite hobby?»',
					solutionAr: '«My favourite hobby is swimming.» (أو reading / playing football / drawing).'
				}
			],
			watchOutAr:
				'انتبه لمضاعفة الحرف الأخير قبل إضافة (ing) في كلمتين مشهورتين: run تصبح «running»، و swim تصبح «swimming»!'
		},
		practice: [
			{
				questionAr: 'ما معنى هواية «reading» باللغة العربية؟',
				options: ['الجري', 'القراءة', 'السباحة', 'الرسم'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجري هو running.',
					'أحسنت! reading هي القراءة وهي خير هواية.',
					'السباحة هي swimming.',
					'الرسم هو drawing.'
				],
				explanationAr: 'reading تعني القراءة والمطالعة.'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة لهواية السباحة:',
				options: ['swiming', 'swimming', 'swimsing', 'swimm'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نضاعف حرف m قبل ing فتصبح swimming.',
					'ممتاز! swimming تُكتب بحرفَي m.',
					'هذه كتابة غير صحيحة.',
					'ينقصها المقطع ing.'
				],
				explanationAr: 'الفعل swim نضاعف فيه الحرف m عند إضافة ing: swimming.'
			},
			{
				questionAr: 'أكمل الجملة: «On Saturday, Omar likes ...... football with his friends.»',
				options: ['reading', 'playing', 'drawing', 'eating'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نقرأ كرة القدم، بل نلعبها.',
					'صحيح! نستعمل playing مع football: playing football.',
					'drawing تعني الرسم.',
					'eating تعني الأكل.'
				],
				explanationAr: 'نستعمل playing مع الألعاب والرياضات مثل football و chess.'
			},
			{
				questionAr: 'أيّ جملة تعبّر بشكل صحيح عن الهواية المفضلة؟',
				options: [
					'My favourite hobby is drawing nature.',
					'My favourite hobby is kitchen.',
					'My favourite hobby is ruler.',
					'My favourite hobby is Tuesday.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! رسم الطبيعة (drawing nature) هواية جميلة ومفيدة.',
					'kitchen غرفة في المنزل وليست هواية.',
					'ruler أداة مدرسية.',
					'Tuesday يوم من أيام الأسبوع.'
				],
				explanationAr: 'الهواية نشاط مفيد نمارسه في وقت الفراغ مثل drawing nature أو reading.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t2_present_simple',
		slug: 'eng-4ap-t2-present-simple',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: وقت الفراغ والهوايات المفيدة (Fun Time and Hobbies)',
		order: 3,
		titleAr: 'زمن المضارع البسيط (Present Simple: I play / He plays)',
		objectives: [
			'تصريف الأفعال البسيطة في المضارع البسيط (Present Simple) للتعبير عن العادات والهوايات',
			'تطبيق قاعدة إضافة (s) أو (es) مع الضمائر (He, She, It) فقط',
			'التمييز بين «I play / We play» و«He plays / She plays» في الجمل'
		],
		keywordsAr: ['Present Simple', 'المضارع البسيط', 'I play', 'He plays', 'She reads', 'Daily habits'],
		discover: {
			scenarioAr:
				'قارنْ بين جملتين كتبهما الأستاذ على السبورة: الأولى «I play football on Friday.» والثانية «Amine plays football on Friday.». لاحظ الحرف الصغير الذي أضيف إلى الفعل في الجملة الثانية!',
			svg: svgPresentSimpleDiscover,
			steps: [
				{
					promptAr: 'لماذا قلنا «Amine plays» بحرف (s)، بينما قلنا «I play» بدون (s)؟',
					hintAr: 'أمين يعادل الضمير He (المفرد الغائب).',
					expectedInput: 'He takes s',
					revealAr: 'في المضارع البسيط، نضيف «s» إلى آخر الفعل عندما يكون الفاعل «He» أو «She» أو «It» (أو اسماً مفرداً مثل Amine و Sara).'
				},
				{
					promptAr: 'كيف نصرّف الفعل «read» مع «She» (مريم)؟',
					hintAr: 'نضيف حرف s في نهاية الفعل read.',
					expectedInput: 'She reads',
					revealAr: 'نقول «She reads a story every evening.»، أما مع I و We و They فنقول «I read / We read».'
				},
				{
					promptAr: 'ماذا نضيف إلى الفعل «go» أو «wash» مع الضمير «He»؟',
					hintAr: 'الأفعال التي تنتهي بـ o أو sh نضيف لها es.',
					expectedInput: 'es',
					revealAr: 'نضيف «es» فتصبح «He goes to school.» و«She washes her hands.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'نستعمل المضارع البسيط (Present Simple) للحديث عن العادات اليومية والهوايات (every day, on Friday, always).',
				'مع الضمائر (I, You, We, They) يبقى الفعل كما هو بدون تغيير: I play, You read, We run, They draw.',
				'مع الضمائر (He, She, It) والاسم المفرد نضيف «s» للفعل: He plays, She reads, It runs.',
				'الأفعال التي تنتهي بـ (o, sh, ch, x) نضيف لها «es» مع He / She / It: go تصبح goes، و wash تصبح washes.'
			],
			visualSvg: svgPresentSimpleSummary,
			visualCaptionAr: 'قاعدة تصريف المضارع البسيط بين الضمائر العادية وضمائر الغائب المفرد',
			examples: [
				{
					problemAr: 'صرّف الفعل بين قوسين في المضارع البسيط:\n1) I (read) ...... books.\n2) Bilal (play) ...... chess.',
					solutionAr: '1) I read books.\n2) Bilal plays chess.'
				},
				{
					problemAr: 'صحّح الخطأ: «My sister go to the library on Monday.»',
					solutionAr: 'الصواب: «My sister goes to the library on Monday.» (لأن My sister تعادل She).'
				}
			],
			watchOutAr:
				'لا تنسَ أبداً حرف «s» مع He و She و It، ولا تضِفه أبداً مع I أو We أو They!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: «He ...... football every Friday.»',
				options: ['play', 'plays', 'playing', 'am play'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع He يجب إضافة s إلى آخر الفعل.',
					'أحسنت! He تأخذ الفعل مضافاً إليه s: plays.',
					'playing تحتاج قبلها is أو like، وهنا نتحدث عن عادة في المضارع البسيط.',
					'لا نستعمل am مع He.'
				],
				explanationAr: 'في المضارع البسيط مع He نضيف s للفعل: He plays.'
			},
			{
				questionAr: 'أكمل الجملة: «We ...... our lessons every evening.»',
				options: ['reads', 'read', 'is read', 'reading'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع We لا نضيف s للفعل.',
					'ممتاز! مع We يبقى الفعل كما هو: We read.',
					'لا نضع is قبل الفعل read في المضارع البسيط.',
					'نحتاج الفعل الأساسي read في المضارع البسيط.'
				],
				explanationAr: 'الضمائر I, You, We, They تأخذ الفعل في صورته الأصلية بدون s.'
			},
			{
				questionAr: 'اختر التصريف الصحيح للفعل (go): «Sara ...... to school at 8 o clock.»',
				options: ['go', 'gos', 'goes', 'going'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Sara تعادل She فتحتاج إضافة es.',
					'الفعل الذي ينتهي بـ o نضيف له es وليس s فقط.',
					'صحيح! go تنتهي بـ o فنضيف لها es مع She: goes.',
					'نحتاج تصريف المضارع البسيط goes.'
				],
				explanationAr: 'مع She والفعل المنتهي بـ o نضيف es: Sara goes.'
			},
			{
				questionAr: 'أيّ جملة صحيحة تماماً في زمن المضارع البسيط؟',
				options: [
					'I draws a green tree.',
					'My brother draw a tree.',
					'She draws a green tree.',
					'They draws green trees.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع I لا نضيف s.',
					'My brother يعادل He فيحتاج s: draws.',
					'رائع! She draws صحيحة 100 بالمئة.',
					'مع They لا نضيف s.'
				],
				explanationAr: 'فقط He / She / It تأخذ حرف s في المضارع البسيط.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t2_modal_can',
		slug: 'eng-4ap-t2-modal-can',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: وقت الفراغ والهوايات المفيدة (Fun Time and Hobbies)',
		order: 4,
		titleAr: 'التعبير عن القدرة والسؤال بـ Can (Can you...? Yes, I can / No, I cannot)',
		objectives: [
			'التعبير عن القدرة باستعمال «can» وعدم القدرة باستعمال «cannot»',
			'طرح السؤال «Can you...?» والإجابة القصيرة بـ «Yes, I can.» أو «No, I cannot.»',
			'استعمال الفعل في مصدره المجرد بعد can بدون أي إضافة'
		],
		keywordsAr: ['Can', 'Cannot', 'Can you', 'Yes, I can', 'No, I cannot', 'Ability'],
		discover: {
			scenarioAr:
				'في حصة التربية البدنية، سأل المدرب التلاميذ: «Can you run fast?» فأجاب بلال: «Yes, I can.» ثم سأل: «Can you swim?» فأجاب صديقه: «No, I cannot, but I can play football!».',
			svg: svgModalCanDiscover,
			steps: [
				{
					promptAr: 'ماذا تعني كلمة «can» وكلمة «cannot»؟',
					hintAr: 'can للاستطاعة، و cannot لعدم الاستطاعة.',
					expectedInput: 'ability and inability',
					revealAr: '«can» تعني (أستطيع / يقدر على)، و«cannot» تعني (لا أستطيع / لا يقدر على).'
				},
				{
					promptAr: 'كيف نطرح سؤالاً بـ «can» لنسأل صديقنا إن كان يستطيع لعب الشطرنج؟',
					hintAr: 'نبدأ السؤال بـ Can ثم الضمير you ثم الفعل.',
					expectedInput: 'Can you play chess?',
					revealAr: 'نقدّم «Can» في أول السؤال: «Can you play chess?» (هل تستطيع لعب الشطرنج؟).'
				},
				{
					promptAr: 'هل نضيف «s» للفعل بعد «can» مع الضمير He؟ (He can swim أم He can swims؟)',
					hintAr: 'الفعل بعد can يبقى دائماً مجرداً كما هو.',
					expectedInput: 'He can swim',
					revealAr: 'نقول «He can swim.» بدون s أبداً؛ لأن الفعل بعد can و cannot يبقى دائماً في صورته الأصلية!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإثبات (القدرة): Subject + can + Base Verb. مثال: «I can read English.», «She can draw well.».',
				'النفي (عدم القدرة): Subject + cannot + Base Verb. مثال: «A camel cannot fly.», «I cannot swim yet.».',
				'السؤال: Can + Subject + Base Verb + ? مثال: «Can you ride a bike?».',
				'الإجابة القصيرة: «Yes, I can.» (نعم أستطيع) أو «No, I cannot.» (لا أستطيع). ولا نضيف s أبداً للفعل بعد can!'
			],
			visualSvg: svgModalCanSummary,
			visualCaptionAr: 'قواعد صياغة الإثبات والنفي والسؤال بالفعل الناقص Can',
			examples: [
				{
					problemAr: 'أجب عن السؤالين بإجابة قصيرة:\n1) Can a bird fly? — 2) Can a cat read?',
					solutionAr: '1) Yes, it can.\n2) No, it cannot.'
				},
				{
					problemAr: 'رتّب الكلمات لتكوين سؤال صحيح: (swim / Can / you / ?)',
					solutionAr: '«Can you swim?».'
				}
			],
			watchOutAr:
				'احذر من خطأ شائع جداً: لا تقل «He can plays» ولا «Can you to swim»! بعد «can» نضع الفعل مجرداً مباشرة: «He can play», «Can you swim?».'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بشكل صحيح: «Amine ...... play chess very well.»',
				options: ['can', 'cans', 'is can', 'can to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! can لا تتغير مع أي ضمير ولا تأخذ s ولا to.',
					'كلمة can لا نضيف لها s أبداً.',
					'لا نضع is قبل can.',
					'لا نضع to بعد can.'
				],
				explanationAr: 'الفعل can ثابت مع جميع الضمائر ويأتي بعده الفعل مجرداً.'
			},
			{
				questionAr: 'اختر الإجابة القصيرة الصحيحة للسؤال: «Can you read English?»',
				options: ['Yes, I am.', 'Yes, I do.', 'Yes, I can.', 'Yes, I have.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'السؤال بدأ بـ Can وليس بـ Are.',
					'السؤال بدأ بـ Can وليس بـ Do.',
					'ممتاز! السؤال يبدأ بـ Can فتكون الإجابة: Yes, I can.',
					'السؤال لم يبدأ بـ Have.'
				],
				explanationAr: 'الأسئلة التي تبدأ بـ Can نجيب عنها بـ Yes, ... can. أو No, ... cannot.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة علمياً ولغوياً:',
				options: [
					'A bird can fly.',
					'A bird can flies.',
					'A fish can run.',
					'A sheep can read.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! العصفور يستطيع الطيران والفعل fly مجرد بعد can.',
					'لا نضيف s للفعل بعد can.',
					'السمكة تسبح ولا تجري.',
					'الخروف لا يستطيع القراءة.'
				],
				explanationAr: 'بعد can نستعمل الفعل المجرد (fly) بدون أي إضافة.'
			},
			{
				questionAr: 'ما النفي الصحيح للجملة: «I can swim.»؟',
				options: ['I no can swim.', 'I cannot swim.', 'I do not can swim.', 'I am not can swim.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع no قبل can.',
					'رائع! النفي الصحيح هو: I cannot swim.',
					'لا نستعمل do not مع can.',
					'لا نستعمل am not مع can.'
				],
				explanationAr: 'نفي can يكون بـ cannot مباشرة قبل الفعل المجرد.'
			}
		]
	}
];
