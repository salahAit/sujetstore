import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishPrimaryCards,
	svgEnglishWritingStructure
} from '../../svg-english';

// ===============================================================================
// Interactive Lessons - 5AP English - Trimester 2 (Hometown, Amenities & Directions)
// ===============================================================================

export const LESSONS_5AP_T2: EnglishInteractiveLessonData[] = [
	// ---------------------------------------------------------------------------
	// Lesson 1: Places and Amenities in Town
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t2_places_in_town',
		slug: 'eng-5ap-t2-places-in-town',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدينتي والمرافق والاتجاهات (Hometown, Amenities and Directions)',
		order: 1,
		titleAr: 'المرافق والأماكن في المدينة (Places and Amenities in Town)',
		objectives: [
			'تسمية أهم مرافق المدينة باللغة الإنجليزية (mosque, school, library, hospital, park, bakery, post office, bookshop).',
			'استعمال التركيبين «There is» للمفرد و«There are» للجمع لوصف الحي والمدينة.',
			'ربط كل مرفق بالخدمة النافعة التي يقدمها للسكان.'
		],
		keywordsAr: ['المدينة', 'Places in town', 'mosque', 'library', 'There is', 'There are'],
		discover: {
			scenarioAr:
				'يصف أنس حيّه النظيف في مدينة سطيف قائلاً: «In my neighbourhood, there is a big mosque, a primary school, and a public library. There are two bakeries and a green park.» لاحظ الفرق بين There is و There are.',
			svg: svgEnglishPrimaryCards({
				title: 'Places in My Algerian Town',
				subtitle: 'أهم المرافق في مدينتي الجزائرية',
				cards: [
					{ word: 'Mosque', arabic: 'مسجد', color: '#059669' },
					{ word: 'School', arabic: 'مدرسة', color: '#2563eb' },
					{ word: 'Library', arabic: 'مكتبة', color: '#7c3aed' },
					{ word: 'Hospital', arabic: 'مستشفى', color: '#0284c7' },
					{ word: 'Bakery', arabic: 'مخبزة', color: '#d97706' }
				]
			}),
			steps: [
				{
					promptAr: 'ما اسم «المسجد» و«المكتبة» باللغة الإنجليزية؟',
					hintAr: 'انظر إلى البطاقات الملونة أعلاه.',
					expectedInput: 'mosque, library',
					revealAr: 'المسجد هو «mosque» والمكتبة العمومية هي «library» (أما محل بيع الكتب فهو «bookshop»).'
				},
				{
					promptAr: 'متى استعمل أنس «There is» في وصف حيّه؟',
					hintAr: 'تأمل: there is a big mosque.',
					expectedInput: 'مع المفرد',
					revealAr: 'نستعمل «There is» مع الاسم المفرد (يوجد مكان واحد): There is a big mosque.'
				},
				{
					promptAr: 'ولماذا قال أنس «There are two bakeries»؟',
					hintAr: 'هل two bakeries مفرد أم جمع؟',
					expectedInput: 'جمع',
					revealAr: 'نستعمل «There are» مع الاسم الجمع (يوجد اثنان أو أكثر): There are two bakeries.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أهم المرافق في المدينة: mosque (مسجد)، school (مدرسة)، library (مكتبة للمطالعة)، hospital (مستشفى)، park (حديقة)، bakery (مخبزة)، post office (مكتب البريد)، bookshop (مكتبة لبيع الكتب)، market (سوق).',
				'نستعمل «There is + a / an + اسم مفرد» للحديث عن وجود مرفق واحد: «There is a post office in my town.».',
				'نستعمل «There are + عدد أو اسم جمع» للحديث عن وجود أكثر من مرفق: «There are three schools in my town.».',
				'للنفي نقول: «There is not a ...» (لا يوجد) للمفرد، و«There are not any ...» للجمع.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'There is vs There are',
				rootLabel: 'Describing Places in Town',
				rootSub: 'التعبير عن وجود المرافق في المدينة',
				branches: [
					{ label: 'Singular (مفرد)', rule: 'There is + a/an + Noun', example: 'There is a clean park.', color: '#1d4ed8' },
					{ label: 'Plural (جمع)', rule: 'There are + Plural Noun', example: 'There are two mosques.', color: '#047857' },
					{ label: 'Negative', rule: 'There is not / are not', example: 'There is not a zoo.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'الفرق بين There is للمفرد و There are للجمع',
			examples: [
				{
					problemAr: 'أكمل بـ There is أو There are: ............ a big hospital near my house.',
					solutionAr: 'There is a big hospital near my house. (لأن a big hospital مفرد).'
				},
				{
					problemAr: 'أكمل بـ There is أو There are: ............ four parks in my city.',
					solutionAr: 'There are four parks in my city. (لأن four parks جمع).'
				}
			],
			watchOutAr:
				'فرّق بين «library» (مكتبة عمومية نقرأ ونستعير منها الكتب) و«bookshop» (متجر نشتري منه الكتب والأدوات المدرسية).'
		},
		practice: [
			{
				questionAr: 'Where do Muslims go to pray together in town?',
				options: ['A bakery', 'A mosque', 'A post office', 'A bookshop'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المخبزة (bakery) لشراء الخبز.',
					'أحسنت! المسلمون يؤدون الصلاة في المسجد (mosque).',
					'مكتب البريد (post office) لإرسال الرسائل والطرود.',
					'المكتبة التجارية (bookshop) لشراء الكتب.'
				],
				explanationAr: 'People go to the mosque to pray.'
			},
			{
				questionAr: 'Complete: ............ a nice library in my school.',
				options: ['There are', 'There is', 'They is', 'It are'],
				correctIndex: 1,
				diagnosticFeedback: [
					'There are للجمع، وهنا a nice library مفرد.',
					'ممتاز! نستعمل There is مع الاسم المفرد.',
					'They لا تأخذ is.',
					'It لا تأخذ are.'
				],
				explanationAr: 'A nice library is singular, so we use: There is.'
			},
			{
				questionAr: 'Complete: ............ three primary schools in my town.',
				options: ['There is', 'There are', 'This is', 'Is there'],
				correctIndex: 1,
				diagnosticFeedback: [
					'There is للمفرد فقط.',
					'أحسنت! three primary schools جمع فنستعمل There are.',
					'This is للإشارة إلى مفرد قريب.',
					'Is there لصياغة سؤال للمفرد.'
				],
				explanationAr: 'Three primary schools is plural, so we use: There are.'
			},
			{
				questionAr: 'Where can you send a letter or a parcel?',
				options: ['At the hospital', 'At the post office', 'At the bakery', 'At the farm'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستشفى لعلاج المرضى.',
					'أحسنت! نرسل الرسائل والطرود من مكتب البريد (post office).',
					'المخبزة لشراء الخبز.',
					'المزرعة لزراعة المحاصيل.'
				],
				explanationAr: 'You send letters and parcels at the post office.'
			},
			{
				questionAr: 'Where do you go to read books and borrow stories for free?',
				options: ['A library', 'A bakery', 'A fire station', 'A workshop'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! المكتبة العمومية (library) للمطالعة واستعارة الكتب.',
					'المخبزة لشراء الخبز.',
					'مركز الإطفاء لرجال الإطفاء.',
					'الورشة للنجار والحرفيين.'
				],
				explanationAr: 'A library is a quiet place to read and borrow books.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 2: Prepositions of Place and Giving Directions
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t2_prepositions_directions',
		slug: 'eng-5ap-t2-prepositions-directions',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدينتي والمرافق والاتجاهات (Hometown, Amenities and Directions)',
		order: 2,
		titleAr: 'حروف المكان ووصف الاتجاهات (Prepositions of Place and Directions)',
		objectives: [
			'تحديد موقع المرافق باستعمال حروف المكان (next to, opposite, between, near, in front of, behind).',
			'السؤال عن الطريق بأدب: «Excuse me, where is the ...?» أو «How do I get to the ...?».',
			'إعطاء تعليمات الطريق البسيطة: «Go straight», «Turn left», «Turn right».'
		],
		keywordsAr: ['حروف المكان', 'الاتجاهات', 'next to', 'opposite', 'between', 'turn left', 'turn right'],
		discover: {
			scenarioAr:
				'سأل زائر في مدينة تلمسان تلميذاً مؤدباً: «Excuse me, where is the post office?» فأجابه التلميذ: «Go straight ahead, then turn right. The post office is opposite the mosque and next to the bakery.»',
			svg: svgEnglishGrammarMap({
				title: 'Prepositions of Place (حروف المكان)',
				rootLabel: 'Where is the place?',
				rootSub: 'تحديد موقع المرفق في الحي',
				branches: [
					{ label: 'Next to (بجانب)', rule: 'Right beside it', example: 'next to the bakery', color: '#1d4ed8' },
					{ label: 'Opposite (مقابل)', rule: 'Across the street', example: 'opposite the mosque', color: '#047857' },
					{ label: 'Between (بين)', rule: 'In the middle of two', example: 'between A and B', color: '#b45309' },
					{ label: 'Near (قرب)', rule: 'Not far from', example: 'near the school', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العبارة المهذبة التي بدأ بها الزائر سؤاله عن الطريق؟',
					hintAr: 'الكلمتان الأوليان في السؤال.',
					expectedInput: 'Excuse me',
					revealAr: 'بدأ السؤال بعبارة «Excuse me» (عفواً / من فضلك) وهي من آداب الاستئذان في الإنجليزية.'
				},
				{
					promptAr: 'ماذا تعني عبارة «Go straight ahead» وعبارة «Turn right»؟',
					hintAr: 'straight تعني مستقيم، و right تعني يمين.',
					expectedInput: 'سر مباشرة ثم انعطف يميناً',
					revealAr: '«Go straight ahead» تعني سر مباشرة إلى الأمام، و«Turn right» تعني انعطف يميناً.'
				},
				{
					promptAr: 'إذا كان المستشفى يقع بين المدرسة والحديقة، أي حرف مكان نستعمله؟',
					hintAr: 'نحتاج كلمة تدل على الوسط بين شيئين وتأتي معها كلمة and.',
					expectedInput: 'between',
					revealAr: 'نستعمل «between»: The hospital is between the school and the park.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حروف المكان الأساسية: next to (بجانب)، opposite (مقابل / في الجهة المقابلة)، between ... and ... (بين شيئين)، near (قريب من)، in front of (أمام)، behind (خلف).',
				'للسؤال عن المكان بأدب نقول: «Excuse me, where is the library, please?».',
				'لإعطاء الاتجاهات نستعمل صيغة الأمر المهذبة: «Go straight ahead.» (سر مباشرة)، «Turn left.» (انعطف يساراً)، «Turn right.» (انعطف يميناً).',
				'تأتي كلمة «between» دائماً متبوعة بمكانين يربط بينهما حرف العطف «and»: مثال «The park is between the school and the mosque.».'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'How to Give Clear Directions',
				steps: [
					{ stage: 'Move Forward', detail: 'Go straight ahead along the street.', color: '#1d4ed8' },
					{ stage: 'Turn', detail: 'Turn left / Turn right at the corner.', color: '#047857' },
					{ stage: 'Locate', detail: 'It is opposite the mosque / next to the park.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'خطوات وصف الطريق بدقة باللغة الإنجليزية',
			examples: [
				{
					problemAr: 'صف موقع المدرسة إذا كانت مقابل المسجد وبجانب المكتبة.',
					solutionAr: 'The school is opposite the mosque and next to the library.'
				},
				{
					problemAr: 'صف الطريق إلى المخبزة: سر مباشرة ثم انعطف يساراً.',
					solutionAr: 'Go straight ahead, then turn left. The bakery is on your left.'
				}
			],
			watchOutAr:
				'انتبه! نكتب «next to» (بكلمتين مع to) ولكن «opposite» و«near» لا نضع بعدهما «to»! نقول «opposite the park» وليس «opposite to the park».'
		},
		practice: [
			{
				questionAr: 'The bakery is ............ the school and the post office.',
				options: ['next to', 'between', 'opposite', 'behind'],
				correctIndex: 1,
				diagnosticFeedback: [
					'next to تُستعمل مع مكان واحد وليس مكانين بينهما and.',
					'أحسنت! نختار between لوجود مكانين مرتبطين بـ and.',
					'opposite تعني مقابل لمكان واحد.',
					'behind تعني خلف.'
				],
				explanationAr: 'When a place is in the middle of two places (A and B), we use between.'
			},
			{
				questionAr: 'What does «Turn left» mean in Arabic?',
				options: ['سر مباشرة', 'انعطف يميناً', 'انعطف يساراً', 'قف هنا'],
				correctIndex: 2,
				diagnosticFeedback: [
					'سر مباشرة هي Go straight ahead.',
					'انعطف يميناً هي Turn right.',
					'ممتاز! Turn left تعني انعطف يساراً.',
					'قف هنا هي Stop here.'
				],
				explanationAr: 'Left means يسار, so Turn left means انعطف يساراً.'
			},
			{
				questionAr: 'Choose the correct sentence:',
				options: [
					'The mosque is next the school.',
					'The mosque is next to the school.',
					'The mosque is opposite to the school.',
					'The mosque is between the school.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة next تحتاج حرف الجر to بعدها.',
					'أحسنت! الصيغة السليمة هي: next to the school.',
					'opposite لا تحتاج حرف الجر to بعدها.',
					'between تحتاج مكانين (A and B).'
				],
				explanationAr: 'Always write next to (two words), and opposite without to.'
			},
			{
				questionAr: 'The hospital is across the street from the park. It is ............ the park.',
				options: ['opposite', 'between', 'under', 'in'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! Across the street تعني في الجهة المقابلة (opposite).',
					'between تحتاج مكانين.',
					'under تعني تحت.',
					'in تعني داخل.'
				],
				explanationAr: 'Across the street from means opposite.'
			},
			{
				questionAr: 'Complete the polite question: «............ , where is the library?»',
				options: ['Turn right', 'Go straight', 'Excuse me', 'Opposite'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Turn right أمر لإعطاء الاتجاه وليس للبدء بالسؤال.',
					'Go straight تعليمات للسير وليست عبارة استئذان.',
					'أحسنت! نبدأ السؤال عن الطريق بأدب بعبارة Excuse me.',
					'Opposite حرف مكان وليس عبارة استئذان.'
				],
				explanationAr: 'We politely start asking for directions with Excuse me.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 3: Wh-Questions (Who, Where, What, When)
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t2_wh_questions',
		slug: 'eng-5ap-t2-wh-questions',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدينتي والمرافق والاتجاهات (Hometown, Amenities and Directions)',
		order: 3,
		titleAr: 'أدوات الاستفهام (Wh-Questions: Who, Where, What, When)',
		objectives: [
			'التمييز بين معاني أدوات الاستفهام الأربع: Who (مَن)، Where (أين)، What (ما/ماذا)، When (متى).',
			'اختيار أداة الاستفهام المناسبة بناءً على نوع الإجابة (شخص، مكان، شيء/مهنة، زمان).',
			'ترتيب كلمات السؤال بشكل سليم ينتهي بعلامة الاستفهام (?).'
		],
		keywordsAr: ['أدوات الاستفهام', 'Wh-Questions', 'Who', 'Where', 'What', 'When'],
		discover: {
			scenarioAr:
				'أجرت سلمى مقابلة قصيرة مع جارتها المعلمة، فطرحت أربعة أسئلة: «Who is your teacher?», «Where is your school?», «What is your job?», «When do you start work?». لاحظ أن كل سؤال يبحث عن نوع محدد من المعلومات.',
			svg: svgEnglishGrammarMap({
				title: 'Four Essential Wh-Questions',
				rootLabel: 'Wh-Question Words',
				rootSub: 'اختر الأداة حسب نوع المعلومة المطلوبة',
				branches: [
					{ label: 'Who (مَن؟)', rule: 'Person (شخص)', example: 'Who is he? My uncle.', color: '#1d4ed8' },
					{ label: 'Where (أين؟)', rule: 'Place (مكان)', example: 'Where is it? In Oran.', color: '#047857' },
					{ label: 'What (ما/ماذا؟)', rule: 'Thing / Job / Name', example: 'What is his job? Doctor.', color: '#b45309' },
					{ label: 'When (متى؟)', rule: 'Time / Day (زمان)', example: 'When? At 8:00 / On Friday.', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'إذا كانت الإجابة هي «In Constantine» (مكان)، ما أداة الاستفهام المناسبة؟',
					hintAr: 'نبحث عن كلمة تعني «أين».',
					expectedInput: 'Where',
					revealAr: 'نستعمل «Where» للسؤال عن المكان: Where do you live? I live in Constantine.'
				},
				{
					promptAr: 'إذا كانت الإجابة هي «Mr. Karim» (شخص)، ما أداة الاستفهام المناسبة؟',
					hintAr: 'نبحث عن كلمة تعني «مَن».',
					expectedInput: 'Who',
					revealAr: 'نستعمل «Who» للسؤال عن الأشخاص: Who is your English teacher? Mr. Karim.'
				},
				{
					promptAr: 'إذا كانت الإجابة هي «At eight o clock» (وقت)، ما أداة الاستفهام المناسبة؟',
					hintAr: 'نبحث عن كلمة تعني «متى».',
					expectedInput: 'When',
					revealAr: 'نستعمل «When» للسؤال عن الزمن والوقت واليوم: When does school start? At eight o clock.'
				}
			]
		},
		summary: {
			rulesAr: [
				'«Who» (مَن): للسؤال عن الشخص العاقل. مثال: «Who works in a hospital? A doctor.».',
				'«Where» (أين): للسؤال عن المكان والمدينة والموقع. مثال: «Where is the mosque? Next to the park.».',
				'«What» (ما / ماذا): للسؤال عن الاسم أو الشيء أو المهنة أو الهواية. مثال: «What is your favourite hobby? Reading.».',
				'«When» (متى): للسؤال عن الوقت أو اليوم أو الفصل. مثال: «When do you play football? On Friday.».',
				'ترتيب السؤال مع to be: «Wh-word + is / are + الفاعل + ?»، ومع باقي الأفعال: «Wh-word + do / does + الفاعل + الفعل المجرد + ?».'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'How to Build a Correct Wh-Question',
				steps: [
					{ stage: 'Wh-Word', detail: 'Start with Who / Where / What / When', color: '#1d4ed8' },
					{ stage: 'Auxiliary', detail: 'Add is / are OR do / does', color: '#047857' },
					{ stage: 'Subject + Rest', detail: 'Add the subject + base verb (if do/does) + (?)', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'قاعدة ترتيب كلمات السؤال بأدوات Wh-Questions',
			examples: [
				{
					problemAr: 'رتب الكلمات لتكوين سؤال صحيح: live / do / Where / you / ?',
					solutionAr: 'Where do you live?'
				},
				{
					problemAr: 'اختر الأداة المناسبة: ............ is your father job? He is a baker.',
					solutionAr: 'What is your father job? (لأن الإجابة مهنة).'
				}
			],
			watchOutAr:
				'انتبه لترتيب السؤال! لا نقول «Where you live?» بل نضع الفعل المساعد «do / does» قبل الفاعل: «Where do you live?» و«Where does he work?».'
		},
		practice: [
			{
				questionAr: 'Complete the question: ............ is the hospital? It is opposite the park.',
				options: ['Who', 'Where', 'When', 'What'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Who للسؤال عن شخص وليس مكاناً.',
					'أحسنت! الإجابة تذكر مكاناً (opposite the park) فنستعمل Where.',
					'When للسؤال عن الزمان.',
					'What للسؤال عن شيء أو مهنة.'
				],
				explanationAr: 'Opposite the park is a place, so we ask with Where.'
			},
			{
				questionAr: 'Complete the question: ............ bakes fresh bread? The baker.',
				options: ['Where', 'When', 'Who', 'What'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Where للمكان.',
					'When للزمان.',
					'ممتاز! الإجابة شخص (The baker) فنستعمل Who.',
					'للسؤال عن الشخص الفاعل نستعمل Who.'
				],
				explanationAr: 'The baker is a person, so we ask with Who.'
			},
			{
				questionAr: 'Complete the question: ............ do you go to the library? On Saturday.',
				options: ['Who', 'Where', 'What', 'When'],
				correctIndex: 3,
				diagnosticFeedback: [
					'Who للشخص.',
					'Where للمكان.',
					'What للشيء.',
					'أحسنت! On Saturday زمان/يوم فنستعمل When.'
				],
				explanationAr: 'On Saturday indicates time, so we ask with When.'
			},
			{
				questionAr: 'Complete the question: ............ is your favourite sport? Swimming.',
				options: ['What', 'Who', 'Where', 'When'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! للسؤال عن الهواية أو الرياضة المفضلة نستعمل What.',
					'Who للأشخاص فقط.',
					'Where للأماكن فقط.',
					'When للزمان فقط.'
				],
				explanationAr: 'Swimming is an activity/thing, so we use What.'
			},
			{
				questionAr: 'Choose the correctly ordered question:',
				options: [
					'Where does work your father?',
					'Where your father does work?',
					'Where does your father work?',
					'Does where your father work?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفاعل (your father) يأتي بين does والفعل work.',
					'الفعل المساعد does يجب أن يسبق الفاعل.',
					'أحسنت! الترتيب الصحيح: Wh-word + does + Subject + base verb.',
					'يجب أن نبدأ بأداة الاستفهام Where.'
				],
				explanationAr: 'Correct order: Where + does + your father + work?'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 4: Plural Nouns (-s, -es, -ies) and Final -s Pronunciation
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t2_plurals_final_s',
		slug: 'eng-5ap-t2-plurals-final-s',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدينتي والمرافق والاتجاهات (Hometown, Amenities and Directions)',
		order: 4,
		titleAr: 'جمع الأسماء ونطق الحرف الأخير (Plural Nouns and Final -s Pronunciation)',
		objectives: [
			'تحويل الأسماء المفردة إلى الجمع بإضافة (-s) أو (-es) أو (-ies) بشكل صحيح.',
			'تمييز الأصوات الثلاثة لنطق الحرف الأخير (-s): /s/ و /z/ و /iz/.',
			'تصنيف كلمات مألوفة من المحيط المدرسي والمدينة في جدول النطق.'
		],
		keywordsAr: ['الجمع', 'Plural Nouns', 'Final -s', '/s/ /z/ /iz/', 'spelling'],
		discover: {
			scenarioAr:
				'قرأت مريم قائمة المرافق في مدينتها بصوت واضح: «parks, schools, buses, libraries». لاحظت أن بعض الكلمات أخذت -s وأخرى -es وأخرى -ies، وأن حرف s في آخرها ينطق بثلاثة أصوات مختلفة!',
			svg: svgEnglishGrammarMap({
				title: 'Plural Nouns Spelling Rules',
				rootLabel: 'Singular to Plural (المفرد إلى الجمع)',
				rootSub: 'قواعد كتابة الجمع المنتظم في الإنجليزية',
				branches: [
					{ label: 'Add -s', rule: 'Most nouns', example: 'park : parks / school : schools', color: '#1d4ed8' },
					{ label: 'Add -es', rule: 'Ends in s, sh, ch, x, o', example: 'bus : buses / box : boxes', color: '#047857' },
					{ label: 'Change y to -ies', rule: 'Consonant + y', example: 'library : libraries / city : cities', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'كيف نجمع كلمة «bus» وكلمة «box»؟ ولماذا؟',
					hintAr: 'لاحظ الحرف الأخير في bus (s) و box (x).',
					expectedInput: 'buses, boxes',
					revealAr: 'نضيف «es» فتصبحان «buses» و«boxes» لأن الكلمة تنتهي بـ s أو x.'
				},
				{
					promptAr: 'ماذا حدث لحرف y في كلمة «library» و«bakery» عند الجمع؟',
					hintAr: 'قبل y يوجد حرف ساكن (r).',
					expectedInput: 'تحول إلى ies',
					revealAr: 'عندما يسبق حرف y حرف ساكن، نحذف y ونضيف «ies»: libraries, bakeries, cities.'
				},
				{
					promptAr: 'انطق الكلمات الثلاث ببطء: «books»، «schools»، «buses». هل صوت النهاية متشابه؟',
					hintAr: 'لاحظ صوت السين في books والزاي في schools و إز في buses.',
					expectedInput: 'لا، ثلاثة أصوات مختلفة',
					revealAr: 'تُنطق النهاية /s/ في books، و /z/ في schools، و /iz/ في buses.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة الكتابة 1 (أغلب الأسماء): نضيف «s» فقط: book : books, park : parks, hospital : hospitals, boy : boys (لأن قبل y حرف متحرك o).',
				'قاعدة الكتابة 2: إذا انتهى الاسم بـ (s, ss, sh, ch, x, o) نضيف «es»: bus : buses, box : boxes, watch : watches, dish : dishes.',
				'قاعدة الكتابة 3: إذا انتهى الاسم بحرف ساكن + y، نحذف y ونضيف «ies»: city : cities, library : libraries, bakery : bakeries.',
				'قاعدة نطق (-s / -es) الأخيرة: يُنطق /s/ بعد الأصوات المهموسة (p, t, k, f) مثل books, parks, shops, cats؛ ويُنطق /iz/ بعد (s, ss, sh, ch, x, ge) مثل buses, boxes, bridges, watches؛ ويُنطق /z/ مع باقي الأصوات المجهورة (l, m, n, r, d, b, g, v, vowels) مثل schools, trains, hospitals, farms.'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Final -s Pronunciation (/s/ , /z/ , /iz/)',
				subtitle: 'كيف ننطق الحرف الأخير في الجمع أو المضارع البسيط؟',
				columns: [
					{ sound: '/s/', rule: 'After p, t, k, f', examples: 'books, parks, shops, cats', color: '#1d4ed8' },
					{ sound: '/z/', rule: 'After l, m, n, r, d, b, vowels', examples: 'schools, farms, trains, cars', color: '#047857' },
					{ sound: '/iz/', rule: 'After s, sh, ch, x, ge', examples: 'buses, boxes, watches, bridges', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'جدول نطق النهاية -s / -es في اللغة الإنجليزية',
			examples: [
				{
					problemAr: 'اكتب جمع الكلمات: bakery / dish / boy / hospital.',
					solutionAr: 'bakeries / dishes / boys (قبل y حرف متحرك o) / hospitals.'
				},
				{
					problemAr: 'صنّف حسب النطق: parks / buses / trains.',
					solutionAr: '/s/: parks | /z/: trains | /iz/: buses.'
				}
			],
			watchOutAr:
				'تنبيه ذكي: كلمة «boy» تنتهي بـ y لكن قبلها حرف متحرك (o)، لذلك لا نحذف y بل نكتب «boys»! أما «city» فقبل y حرف ساكن (t) فتصبح «cities».'
		},
		practice: [
			{
				questionAr: 'What is the correct plural of «library»?',
				options: ['librarys', 'libraries', 'libraryes', 'librares'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف r قبل y ساكن، لذا نحذف y ونضيف ies.',
					'أحسنت! library تصبح libraries.',
					'لا نجمع بين y و es.',
					'ينقصها حرف i قبل es.'
				],
				explanationAr: 'Library ends in consonant + y (r + y), so y changes to -ies: libraries.'
			},
			{
				questionAr: 'What is the correct plural of «bus»?',
				options: ['buss', 'busies', 'buses', 'bus'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأسماء المنتهية بـ s تأخذ es في الجمع.',
					'لا يوجد حرف y هنا.',
					'ممتاز! bus تنتهي بـ s فنضيف es لتصبح buses.',
					'bus هي صيغة المفرد.'
				],
				explanationAr: 'Nouns ending in -s take -es: bus becomes buses.'
			},
			{
				questionAr: 'How is the final -s pronounced in «parks»?',
				options: ['/s/', '/z/', '/iz/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! قبل s يوجد الصوت /k/ المهموس، فتُنطق /s/.',
					'الصوت /k/ مهموس وليس مجهوراً.',
					'ننطق /iz/ فقط بعد s, sh, ch, x, ge.',
					'حرف s منطوق في parks.'
				],
				explanationAr: 'Park ends with the voiceless sound /k/, so parks is pronounced with /s/.'
			},
			{
				questionAr: 'How is the final -es pronounced in «bridges» and «boxes»?',
				options: ['/s/', '/z/', '/iz/', '/t/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'النهاية بعد x و ge لا تُنطق /s/.',
					'النهاية بعد x و ge تضيف مقطعاً هو /iz/.',
					'ممتاز! بعد x و ge ننطق النهاية /iz/.',
					'/t/ تخص نهاية الماضي -ed وليس -s.'
				],
				explanationAr: 'After x and ge sounds, -es is pronounced /iz/: boxes, bridges.'
			},
			{
				questionAr: 'Which word has the final -s pronounced /z/?',
				options: ['books', 'shops', 'schools', 'watches'],
				correctIndex: 2,
				diagnosticFeedback: [
					'books تنتهي بعد k فتنطق /s/.',
					'shops تنتهي بعد p فتنطق /s/.',
					'أحسنت! school تنتهي بصوت مجهور /l/ فتنطق النهاية /z/.',
					'watches تنتهي بعد ch فتنطق /iz/.'
				],
				explanationAr: 'School ends with the voiced sound /l/, so schools ends with /z/.'
			}
		]
	},

	// ---------------------------------------------------------------------------
	// Lesson 5: Describing My Algerian Hometown
	// ---------------------------------------------------------------------------
	{
		id: 'eng_lesson_5ap_t2_describing_hometown',
		slug: 'eng-5ap-t2-describing-hometown',
		grade: '5ap',
		yearSubjectId: 801,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدينتي والمرافق والاتجاهات (Hometown, Amenities and Directions)',
		order: 5,
		titleAr: 'وصف مدينتي الجزائرية (Describing My Algerian Hometown)',
		objectives: [
			'تسمية مدن ومعالم جزائرية معروفة باللغة الإنجليزية (Constantine, Tlemcen, Ghardaia, Bejaia, Oran, Algiers).',
			'استعمال صفات وصفية مناسبة للمدينة (clean, quiet, beautiful, old, big, historic).',
			'كتابة فقرة قصيرة مترابطة لوصف مدينتك باستعمال «and» و«but» وحروف المكان.'
		],
		keywordsAr: ['وصف المدينة', 'Hometown', 'Algeria', 'Constantine', 'Tlemcen', 'Ghardaia'],
		discover: {
			scenarioAr:
				'كتب ياسين فقرة قصيرة لصديقه عن مدينته: «I live in Constantine. It is a historic and beautiful city in Algeria. There are famous bridges, big mosques, and many schools. My house is near the mosque and opposite a green park. I love my hometown.»',
			svg: svgEnglishPrimaryCards({
				title: 'Beautiful Algerian Cities',
				subtitle: 'مدن جزائرية عريقة وجميلة',
				cards: [
					{ word: 'Constantine', arabic: 'قسنطينة', color: '#1d4ed8' },
					{ word: 'Tlemcen', arabic: 'تلمسان', color: '#047857' },
					{ word: 'Ghardaia', arabic: 'غرداية', color: '#d97706' },
					{ word: 'Bejaia', arabic: 'بجاية', color: '#0284c7' },
					{ word: 'Oran', arabic: 'وهران', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'بأي جملة بدأ ياسين فقرته للتعريف بمدينته؟',
					hintAr: 'انظر إلى الجملة الأولى.',
					expectedInput: 'I live in Constantine.',
					revealAr: 'بدأ بـ «I live in + اسم المدينة»: I live in Constantine.'
				},
				{
					promptAr: 'ما الصفتان اللتان وصف بهما ياسين مدينة قسنطينة؟',
					hintAr: 'ابحث عن صفتين في الجملة الثانية.',
					expectedInput: 'historic and beautiful',
					revealAr: 'وصفها بأنها «historic» (تاريخية) و«beautiful» (جميلة).'
				},
				{
					promptAr: 'ما الكلمة التي ربطت بين الصفتين والمكانين في الفقرة؟',
					hintAr: 'أداة عطف تعني «و».',
					expectedInput: 'and',
					revealAr: 'استعمل أداة الربط «and» للجمع بين فكرتين، ونستعمل «but» (لكن) للمقابلة بين فكرتين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الأولى (التقديم): «I live in (City). It is a clean / beautiful / quiet town in Algeria.» (أعيش في ... وهي مدينة جميلة في الجزائر).',
				'الجملة الثانية (المرافق): «In my town, there is a big mosque, a hospital, and a library. There are green parks too.».',
				'الجملة الثالثة (موقع بيتي): «My house is next to the school and opposite the bakery.».',
				'الجملة الرابعة (الخاتمة): «I love my hometown because it is calm and clean.»، ولا تنسَ الحروف الكبيرة لأسماء المدن والبلد (Algeria) والنقاط.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '4 Steps to Describe Your Hometown',
				steps: [
					{ stage: 'Name and Country', detail: 'I live in Tlemcen, a historic city in Algeria.', color: '#1d4ed8' },
					{ stage: 'Amenities', detail: 'There is a great mosque, a library, and a park.', color: '#047857' },
					{ stage: 'Location', detail: 'My school is next to the mosque.', color: '#b45309' },
					{ stage: 'Closing', detail: 'I love my hometown very much.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'مخطط كتابة فقرة قصيرة لوصف مدينتك الجزائرية',
			examples: [
				{
					problemAr: 'اربط الجملتين بـ and أو but: My town is small. It is very clean.',
					solutionAr: 'My town is small, but it is very clean. (استعملنا but للمقابلة بين صغر الحجم والنظافة).'
				},
				{
					problemAr: 'اكتب جملتين عن مدينة غرداية.',
					solutionAr: 'I live in Ghardaia. It is a calm and historic city in the south of Algeria.'
				}
			],
			watchOutAr:
				'في وصف المدينة نستعمل الصفة قبل الاسم دائماً في الإنجليزية: نقول «a clean park» و«a big mosque»، ولا نقول «a park clean».'
		},
		practice: [
			{
				questionAr: 'Choose the right word order in English:',
				options: [
					'There is a mosque big.',
					'There is a big mosque.',
					'There is big a mosque.',
					'There big is a mosque.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الإنجليزية تأتي الصفة (big) قبل الاسم (mosque).',
					'أحسنت! الصفة تسبق الاسم: a big mosque.',
					'أداة النكرة a تسبق الصفة والاسم.',
					'الترتيب غير سليم؛ نبدأ بـ There is.'
				],
				explanationAr: 'In English, adjectives always come before nouns: a big mosque.'
			},
			{
				questionAr: 'Complete with the right linker: My town is small, ............ it has a big library.',
				options: ['and', 'but', 'where', 'who'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هنا مقابلة بين صغر المدينة ووجود مكتبة كبيرة، فـ but أدق.',
					'ممتاز! نستعمل but (لكن) للربط بين فكرتين متقابلتين.',
					'where أداة استفهام للمكان وليست أداة ربط هنا.',
					'who أداة استفهام للشخص.'
				],
				explanationAr: 'We use but to link two contrasting ideas: small vs big library.'
			},
			{
				questionAr: 'Which Algerian city is famous for its high bridges?',
				options: ['Constantine', 'Tassili', 'Adrar', 'El Oued'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! قسنطينة (Constantine) مشهورة بجسورها المعلقة.',
					'التاسيلي مشهورة بجبالها ونقوشها الصخرية.',
					'أدرار مدينة صحراوية مشهورة بواحاتها.',
					'الوادي مشهورة بقبابها وواحات النخيل.'
				],
				explanationAr: 'Constantine is famous for its historic bridges.'
			},
			{
				questionAr: 'Choose the best opening sentence for a paragraph about your hometown:',
				options: [
					'I live in Bejaia. It is a beautiful city in Algeria.',
					'Next to the bakery.',
					'Turn left and go straight.',
					'There are books.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذه جملة افتتاحية كاملة تعرّف باسم المدينة وبلدها وصفتها.',
					'هذه عبارة ناقصة لا تصلح كبداية فقرة.',
					'هذه تعليمة طريق وليست تقديماً للمدينة.',
					'جملة عامة لا تقدم المدينة.'
				],
				explanationAr: 'A good opening sentence states your hometown name and describes it clearly.'
			},
			{
				questionAr: 'Choose the sentence with NO mistakes:',
				options: [
					'i live in tlemcen in algeria',
					'I live in Tlemcen in Algeria.',
					'I lives in Tlemcen in Algeria.',
					'I living in Tlemcen in Algeria.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تنقصها الحروف الكبيرة والنقطة.',
					'أحسنت! تصريف صحيح، وحروف كبيرة لـ I و Tlemcen و Algeria، ونقطة في النهاية.',
					'مع I لا نضيف s للفعل live.',
					'living لا تُستعمل بدون am.'
				],
				explanationAr: 'I live in Tlemcen in Algeria. has correct grammar, capitalization, and punctuation.'
			}
		]
	}
];
