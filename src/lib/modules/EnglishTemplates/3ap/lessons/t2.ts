import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishPrimaryCards
} from '../../svg-english';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimester 2 (School Objects, Pronouns & To Be, Days, My Home)
// ═══════════════════════════════════════════════════════════════════════════════

const svgSchoolObjectsDiscover = svgEnglishPrimaryCards({
	title: 'My School Bag & Classroom — أدواتي المدرسية وقسمي',
	subtitle: 'What is in my school bag?',
	cards: [
		{ word: 'a pen', arabic: 'قلم حبر', color: '#2563eb' },
		{ word: 'a book', arabic: 'كتاب', color: '#059669' },
		{ word: 'a ruler', arabic: 'مسطرة', color: '#d97706' },
		{ word: 'a bag', arabic: 'محفظة', color: '#7c3aed' },
		{ word: 'a desk', arabic: 'طاولة', color: '#0284c7' }
	],
	width: 520,
	height: 185
});

const svgSchoolObjectsSummary = svgEnglishGrammarMap({
	title: 'Classroom Objects & Articles (a / an) — الأدوات المدرسية',
	rootLabel: 'What is this? -> It is a / an...',
	rootSub: 'Use (a) before consonants, (an) before vowels',
	branches: [
		{
			label: 'In My Bag',
			rule: 'pen, book, ruler, rubber',
			example: 'It is a pen.',
			color: '#1d4ed8'
		},
		{
			label: 'In Class',
			rule: 'desk, chair, board, door',
			example: 'It is a board.',
			color: '#047857'
		},
		{
			label: 'a vs an',
			rule: 'an + (a, e, i, o, u)',
			example: 'an eraser / a bag',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgPronounsDiscover = svgEnglishPrimaryCards({
	title: 'Pronouns & Verb To Be — الضمائر وفعل الكينونة',
	subtitle: 'I am / He is / She is / It is',
	cards: [
		{ word: 'I am', arabic: 'أنا أكون', color: '#2563eb' },
		{ word: 'He is', arabic: 'هو يكون (للمذكر)', color: '#059669' },
		{ word: 'She is', arabic: 'هي تكون (للمؤنث)', color: '#d97706' },
		{ word: 'It is', arabic: 'هو/هي لغير العاقل', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgPronounsSummary = svgEnglishGrammarMap({
	title: 'Subject Pronouns + Verb To Be (am / is)',
	rootLabel: 'Verb To Be (Singular)',
	rootSub: 'Match each pronoun with am or is',
	branches: [
		{
			label: 'I + am',
			rule: 'For myself (أنا)',
			example: 'I am a pupil.',
			color: '#1d4ed8'
		},
		{
			label: 'He + is',
			rule: 'For a boy / man (هو)',
			example: 'He is my brother.',
			color: '#047857'
		},
		{
			label: 'She + is',
			rule: 'For a girl / woman (هي)',
			example: 'She is my teacher.',
			color: '#b45309'
		},
		{
			label: 'It + is',
			rule: 'For an object / animal',
			example: 'It is a book.',
			color: '#7c3aed'
		}
	],
	width: 520,
	height: 255
});

const svgDaysDiscover = svgEnglishPrimaryCards({
	title: 'Days of the Week — أيام الأسبوع',
	subtitle: 'School starts on Sunday in Algeria!',
	cards: [
		{ word: 'Sunday', arabic: 'الأحد', color: '#2563eb' },
		{ word: 'Monday', arabic: 'الاثنين', color: '#059669' },
		{ word: 'Tuesday', arabic: 'الثلاثاء', color: '#d97706' },
		{ word: 'Friday', arabic: 'الجمعة', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgDaysSummary = svgEnglishPhoneticsChart({
	title: 'The Seven Days of the Week — أيام الأسبوع السبعة',
	subtitle: 'Always start every day with a Capital Letter!',
	columns: [
		{
			sound: 'Start of Week',
			rule: 'Sunday - Monday - Tuesday',
			examples: 'We go to school.',
			color: '#1d4ed8'
		},
		{
			sound: 'Mid-Week',
			rule: 'Wednesday - Thursday',
			examples: 'English & Arabic.',
			color: '#047857'
		},
		{
			sound: 'Weekend',
			rule: 'Friday - Saturday',
			examples: 'Rest & family time.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgHomeDiscover = svgEnglishPrimaryCards({
	title: 'My Sweet Home — بيتي وغرفه',
	subtitle: 'Rooms in My House',
	cards: [
		{ word: 'bedroom', arabic: 'غرفة النوم', color: '#2563eb' },
		{ word: 'kitchen', arabic: 'المطبخ', color: '#059669' },
		{ word: 'living room', arabic: 'غرفة الجلوس', color: '#d97706' },
		{ word: 'garden', arabic: 'الحديقة', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgHomeSummary = svgEnglishGrammarMap({
	title: 'Rooms of the House — غرف المنزل والسؤال بـ Where',
	rootLabel: 'Where is ...? -> He / She is in the...',
	rootSub: 'Ask and answer about rooms at home',
	branches: [
		{
			label: 'Rest & Sit',
			rule: 'bedroom / living room',
			example: 'Dad is in the living room.',
			color: '#1d4ed8'
		},
		{
			label: 'Cook & Wash',
			rule: 'kitchen / bathroom',
			example: 'Mum is in the kitchen.',
			color: '#047857'
		},
		{
			label: 'Outside',
			rule: 'garden / house',
			example: 'My house has a garden.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T2 (4 Lessons — yearSubjectId: 799)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T2: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_3ap_t2_school_objects',
		slug: 'eng-3ap-t2-school-objects',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدرستي (My School)',
		order: 1,
		titleAr: 'مدرستي والأدوات المدرسية (My School and Classroom Objects)',
		objectives: [
			'تسمية الأدوات المدرسية وأثاث القسم بالإنجليزية (pen, book, ruler, bag, desk, board)',
			'استعمال أداة النكرة المناسبة (a / an) قبل الاسم المفرد',
			'السؤال والإجابة عن الأشياء بـ: What is this? / It is a...'
		],
		keywordsAr: ['الأدوات المدرسية', 'pen', 'book', 'ruler', 'bag', 'desk', 'board', 'a and an'],
		discover: {
			scenarioAr:
				'رتّب بلال محفظته المدرسية قبل الذهاب إلى المدرسة، ثم أمسك كل أداة ليراجع اسمها بالإنجليزية: pen, book, ruler, bag.',
			svg: svgSchoolObjectsDiscover,
			steps: [
				{
					promptAr: 'ماذا نسمي «الكتاب» و«المسطرة» باللغة الإنجليزية؟',
					hintAr: 'الكتاب: book، والمسطرة: ruler.',
					expectedInput: 'book and ruler',
					revealAr: 'الكتاب هو «book»، والمسطرة هي «ruler»، والقلم «pen»، والمحفظة «bag».'
				},
				{
					promptAr: 'كيف نسمي «السبورة» و«الطاولة» داخل القسم؟',
					hintAr: 'السبورة: board، والطاولة: desk.',
					expectedInput: 'board and desk',
					revealAr: 'داخل القسم نجد: «board» (سبورة)، و«desk» (طاولة)، و«chair» (كرسي).'
				},
				{
					promptAr: 'هل نقول «a eraser» أم «an eraser» (ممحاة)؟ ولماذا؟',
					hintAr: 'انظر إلى أول حرف في كلمة eraser: إنه حرف متحرك (e).',
					expectedInput: 'an eraser',
					revealAr: 'نقول «an eraser» لأننا نستعمل «an» قبل الكلمات التي تبدأ بحرف متحرك (a, e, i, o, u).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات المحفظة: pen (قلم حبر), pencil (قلم رصاص), book (كتاب), ruler (مسطرة), rubber / eraser (ممحاة), bag (محفظة).',
				'أثاث القسم: desk (طاولة), chair (كرسي), board (سبورة), table (منضدة).',
				'قاعدة (a / an): نستعمل «a» قبل الاسم المفرد الذي يبدأ بحرف ساكن (a book, a pen)، ونستعمل «an» قبل الاسم الذي يبدأ بحرف متحرك (an eraser, an apple).',
				'للسؤال عن شيء واحد نقول: «What is this?» ونجيب: «It is a ruler.».'
			],
			visualSvg: svgSchoolObjectsSummary,
			visualCaptionAr: 'الأدوات المدرسية وأثاث القسم مع قاعدة a و an',
			examples: [
				{
					problemAr: 'ضع الأداة المناسبة (a أو an): ...... desk / ...... eraser / ...... bag',
					solutionAr: 'a desk — an eraser — a bag.'
				},
				{
					problemAr: 'أجب عن السؤال: «What is this?» (صورة كتاب).',
					solutionAr: '«It is a book.».'
				}
			],
			watchOutAr:
				'انظر دائماً إلى أول حرف في الكلمة قبل اختيار a أو an: إذا كان من (a, e, i, o, u) فاختر «an»، وإلا فاختر «a».'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «ruler» باللغة العربية؟',
				options: ['محفظة', 'مسطرة', 'سبورة', 'طاولة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المحفظة هي bag.',
					'أحسنت! ruler تعني مسطرة.',
					'السبورة هي board.',
					'الطاولة هي desk.'
				],
				explanationAr: 'كلمة ruler تعني المسطرة التي نسطّر بها في الكراس.'
			},
			{
				questionAr: 'أكمل الجملة بالأداة الصحيحة: «It is ...... eraser.»',
				options: ['a', 'an', 'am', 'is'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة eraser تبدأ بالحرف المتحرك e، فلا نضع قبلها a.',
					'ممتاز! نستعمل an قبل الحرف المتحرك e.',
					'am فعل كينونة مع I وليس أداة نكرة.',
					'is فعل كينونة وقد ورد بالفعل في الجملة.'
				],
				explanationAr: 'لأن كلمة eraser تبدأ بحرف متحرك (e) نضع قبلها أداة النكرة an.'
			},
			{
				questionAr: 'أين يكتب الأستاذ الدرس في القسم؟ على:',
				options: ['the bag', 'the ruler', 'the board', 'the pen'],
				correctIndex: 2,
				diagnosticFeedback: [
					'bag هي المحفظة.',
					'ruler هي المسطرة.',
					'صحيح! يكتب الأستاذ على السبورة: the board.',
					'pen هو القلم.'
				],
				explanationAr: 'كلمة board تعني السبورة داخل القسم.'
			},
			{
				questionAr: 'اختر الإجابة الصحيحة على السؤال: «What is this?»',
				options: ['My name is Ali.', 'It is a blue bag.', 'Good morning!', 'This is my father.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه إجابة عن الاسم وليست عن شيء.',
					'رائع! نستعمل It is لوصف الأشياء مثل المحفظة.',
					'هذه تحية صباحية.',
					'father شخص وليس أداة مدرسية.'
				],
				explanationAr: 'للسؤال What is this? عن شيء غير عاقل نجيب بـ It is a ... .'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t2_pronouns_to_be',
		slug: 'eng-3ap-t2-pronouns-to-be',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدرستي (My School)',
		order: 2,
		titleAr: 'الضمائر وفعل الكينونة (I / He / She / It + am / is)',
		objectives: [
			'التمييز بين ضمائر المفرد: I (أنا)، He (هو)، She (هي)، It (لغير العاقل)',
			'تصريف فعل الكينونة (to be) بشكل صحيح: I am — He is — She is — It is',
			'استبدال الاسم بالضمير المناسب في جمل بسيطة'
		],
		keywordsAr: ['الضمائر', 'Pronouns', 'I am', 'He is', 'She is', 'It is', 'to be'],
		discover: {
			scenarioAr:
				'أشارت مريم إلى نفسها وقالت: «I am Meriem.» ثم أشارت إلى أخيها آدم وقالت: «He is Adam.» ثم أشارت إلى أختها آية وقالت: «She is Aya.» وأخيراً إلى كتابها وقالت: «It is a book.».',
			svg: svgPronounsDiscover,
			steps: [
				{
					promptAr: 'أيّ ضمير نستعمله للحديث عن ولد مثل «Adam»؟',
					hintAr: 'ضمير المذكر المفرد هو He.',
					expectedInput: 'He',
					revealAr: 'نستعمل الضمير «He» (هو) للمذكر العاقل، ويأتي معه «is»: «He is Adam.».'
				},
				{
					promptAr: 'أيّ ضمير نستعمله للحديث عن بنت مثل «Aya»؟',
					hintAr: 'ضمير المؤنث المفرد هو She.',
					expectedInput: 'She',
					revealAr: 'نستعمل الضمير «She» (هي) للمؤنث العاقل، ويأتي معه «is»: «She is Aya.».'
				},
				{
					promptAr: 'ما الفعل الذي يأتي دائماً بعد الضمير «I»؟',
					hintAr: 'لا نقول I is، بل نقول I ...',
					expectedInput: 'am',
					revealAr: 'بعد «I» نضع دائماً «am» فنقول: «I am a pupil.»، ومع He و She و It نضع «is».'
				}
			]
		},
		summary: {
			rulesAr: [
				'الضمير «I» (أنا) يأخذ دائماً «am»: I am a pupil. (أنا تلميذ).',
				'الضمير «He» (هو للمذكر) يأخذ «is»: He is my father. (هو أبي).',
				'الضمير «She» (هي للمؤنث) يأخذ «is»: She is my sister. (هي أختي).',
				'الضمير «It» (لغير العاقل: الأشياء والحيوانات) يأخذ «is»: It is a pen. (إنه قلم).'
			],
			visualSvg: svgPronounsSummary,
			visualCaptionAr: 'خريطة ضمائر المفرد مع فعل الكينونة am و is',
			examples: [
				{
					problemAr: 'أكمل بـ (am أو is): I ...... Youssef. / She ...... my mother. / It ...... a desk.',
					solutionAr: 'I am Youssef. / She is my mother. / It is a desk.'
				},
				{
					problemAr: 'عوّض الاسم بضمير مناسب (He / She / It): «Karim is a pupil.» — «The book is green.»',
					solutionAr: 'He is a pupil. — It is green.'
				}
			],
			watchOutAr:
				'تذكّر جيداً: للكتاب والقلم والقطة نستعمل «It» ولا نستعمل «He» أو «She»!'
		},
		practice: [
			{
				questionAr: 'اختر الفعل الصحيح: «I ...... a good pupil.»',
				options: ['is', 'am', 'he', 'she'],
				correctIndex: 1,
				diagnosticFeedback: [
					'is تُستعمل مع He و She و It وليس مع I.',
					'أحسنت! الضمير I يأخذ دائماً am.',
					'he ضمير وليس فعلاً.',
					'she ضمير وليس فعلاً.'
				],
				explanationAr: 'القاعدة الثابتة: I am.'
			},
			{
				questionAr: 'أيّ ضمير يعوّض كلمة «My sister» (أختي)؟',
				options: ['He', 'It', 'She', 'I'],
				correctIndex: 2,
				diagnosticFeedback: [
					'He للمذكر المفرد.',
					'It للأشياء والحيوانات.',
					'ممتاز! الأخت مؤنث عاقل فنستعمل She.',
					'I تعني أنا.'
				],
				explanationAr: 'نستعمل She للتعويض عن البنت أو المرأة.'
			},
			{
				questionAr: 'أكمل الجملة: «...... is a red pen.»',
				options: ['I', 'He', 'She', 'It'],
				correctIndex: 3,
				diagnosticFeedback: [
					'I تأخذ am وتدل على المتكلم.',
					'He للمذكر العاقل.',
					'She للمؤنث العاقل.',
					'رائع! القلم شيء غير عاقل فنستعمل معه It.'
				],
				explanationAr: 'للتحدث عن الأدوات المدرسية والأشياء المفردة نستعمل It is.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة تماماً:',
				options: ['He am my brother.', 'She is my teacher.', 'I is 8 years old.', 'It am a book.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع He نضع is وليس am.',
					'أحسنت! She تأخذ is فالجملة صحيحة تماماً.',
					'مع I نضع am وليس is.',
					'مع It نضع is وليس am.'
				],
				explanationAr: 'I am / He is / She is / It is.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t2_days_of_week',
		slug: 'eng-3ap-t2-days-of-week',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: مدرستي (My School)',
		order: 3,
		titleAr: 'أيام الأسبوع (Days of the Week)',
		objectives: [
			'حفظ أيام الأسبوع السبعة مرتبة باللغة الإنجليزية (Sunday to Saturday)',
			'تحديد أيام الدراسة في الجزائر (Sunday to Thursday) وعطلة نهاية الأسبوع (Friday, Saturday)',
			'كتابة أيام الأسبوع دائماً بحرف كبير في بدايتها'
		],
		keywordsAr: ['أيام الأسبوع', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		discover: {
			scenarioAr:
				'نظر يوسف إلى جدول توقيته المدرسي، فوجد أن الأسبوع الدراسي في الجزائر يبدأ يوم الأحد (Sunday) وينتهي يوم الخميس (Thursday)، وأن يوم الجمعة (Friday) يوم مبارك نصلي فيه ونزور الأقارب.',
			svg: svgDaysDiscover,
			steps: [
				{
					promptAr: 'ما اسم أول يوم في الأسبوع الدراسي بالجزائر بالإنجليزية؟',
					hintAr: 'يوم الأحد بالإنجليزية هو Sunday.',
					expectedInput: 'Sunday',
					revealAr: 'أول يوم في الأسبوع هو «Sunday» (الأحد)، ويليه «Monday» (الاثنين).'
				},
				{
					promptAr: 'ما يوما عطلة نهاية الأسبوع في الجزائر بالإنجليزية؟',
					hintAr: 'الجمعة والسبت.',
					expectedInput: 'Friday and Saturday',
					revealAr: 'عطلة نهاية الأسبوع هما «Friday» (الجمعة) و«Saturday» (السبت).'
				},
				{
					promptAr: 'بمَ تنتهي جميع أسماء أيام الأسبوع في اللغة الإنجليزية؟',
					hintAr: 'انظر إلى آخر 3 حروف في Sunday, Monday, Friday.',
					expectedInput: 'day',
					revealAr: 'كل أيام الأسبوع تنتهي بكلمة «day» (يوم)، وتبدأ دائماً بحرف كبير (Capital letter).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أيام الأسبوع السبعة بالترتيب: Sunday (الأحد), Monday (الاثنين), Tuesday (الثلاثاء), Wednesday (الأربعاء), Thursday (الخميس), Friday (الجمعة), Saturday (السبت).',
				'أيام الدراسة في الجزائر: من Sunday إلى Thursday.',
				'عطلة نهاية الأسبوع (The weekend): Friday و Saturday.',
				'ملاحظة إملائية مهمة: نبدأ اسم كل يوم من أيام الأسبوع بحرف كبير دائماً (Sunday, Friday).'
			],
			visualSvg: svgDaysSummary,
			visualCaptionAr: 'تقسيم أيام الأسبوع السبعة في الجزائر: أيام الدراسة والعطلة',
			examples: [
				{
					problemAr: 'أكمل اليوم الناقص: Sunday, Monday, ......, Wednesday',
					solutionAr: 'اليوم الناقص هو: «Tuesday» (الثلاثاء).'
				},
				{
					problemAr: 'ما اليوم الذي يأتي بعد Thursday (الخميس)؟',
					solutionAr: 'اليوم الذي يأتي بعد Thursday هو «Friday» (الجمعة).'
				}
			],
			watchOutAr:
				'انتبه لكتابة يوم الأربعاء «Wednesday»: نكتب حرف d فيها لكنه لا يُنطق بوضوح عند القراءة!'
		},
		practice: [
			{
				questionAr: 'ما معنى يوم «Sunday» باللغة العربية؟',
				options: ['السبت', 'الأحد', 'الاثنين', 'الجمعة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السبت هو Saturday.',
					'أحسنت! Sunday هو يوم الأحد.',
					'الاثنين هو Monday.',
					'الجمعة هو Friday.'
				],
				explanationAr: 'Sunday هو يوم الأحد، بداية الأسبوع الدراسي في الجزائر.'
			},
			{
				questionAr: 'ما اليوم الذي يأتي مباشرة بعد «Monday»؟',
				options: ['Sunday', 'Tuesday', 'Thursday', 'Friday'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Sunday يأتي قبل Monday.',
					'ممتاز! بعد الاثنين (Monday) يأتي الثلاثاء (Tuesday).',
					'Thursday هو الخميس.',
					'Friday هو الجمعة.'
				],
				explanationAr: 'الترتيب الصحيح هو: Sunday ثم Monday ثم Tuesday.'
			},
			{
				questionAr: 'أيّ يوم هو يوم الجمعة المبارك باللغة الإنجليزية؟',
				options: ['Thursday', 'Saturday', 'Friday', 'Wednesday'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Thursday هو يوم الخميس.',
					'Saturday هو يوم السبت.',
					'صحيح! Friday هو يوم الجمعة.',
					'Wednesday هو يوم الأربعاء.'
				],
				explanationAr: 'يوم الجمعة هو Friday، ويوم السبت هو Saturday.'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة ليوم الخميس:',
				options: ['thursday', 'Thursday', 'tuesday', 'Friday'],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب أن يبدأ اسم اليوم بحرف كبير.',
					'أحسنت! Thursday تبدأ بحرف T كبير وتعني الخميس.',
					'tuesday تعني الثلاثاء وتبدأ بحرف صغير خطأ.',
					'Friday تعني الجمعة.'
				],
				explanationAr: 'الخميس هو Thursday، وأيام الأسبوع تبدأ دائماً بحرف كبير.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t2_my_home_rooms',
		slug: 'eng-3ap-t2-my-home-rooms',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: بيتي (My Home)',
		order: 4,
		titleAr: 'بيتي وغرف المنزل (My Home and Rooms)',
		objectives: [
			'تسمية غرف المنزل بالإنجليزية (bedroom, kitchen, living room, bathroom, garden)',
			'السؤال عن مكان شخص داخل المنزل باستعمال: Where is...?',
			'الإجابة باستعمال حرف الجر (in): He / She is in the...'
		],
		keywordsAr: ['المنزل', 'My home', 'bedroom', 'kitchen', 'living room', 'bathroom', 'garden', 'Where is'],
		discover: {
			scenarioAr:
				'عاد أنس من المدرسة وسأل أخته: «Where is mother?» (أين أمي؟) فأجابته: «She is in the kitchen.»، ثم سأل: «Where is father?» فأجابت: «He is in the garden.».',
			svg: svgHomeDiscover,
			steps: [
				{
					promptAr: 'ما اسم الغرفة التي تطهو فيها الأم الطعام بالإنجليزية؟',
					hintAr: 'المطبخ هو kitchen.',
					expectedInput: 'kitchen',
					revealAr: 'المطبخ هو «kitchen»، ونقول: «Mother is in the kitchen.».'
				},
				{
					promptAr: 'ماذا نسمي غرفة النوم وغرفة الجلوس بالإنجليزية؟',
					hintAr: 'bed + room لغرفة النوم، و living + room لغرفة الجلوس.',
					expectedInput: 'bedroom and living room',
					revealAr: 'غرفة النوم هي «bedroom»، وغرفة الجلوس هي «living room»، والحمّام «bathroom».'
				},
				{
					promptAr: 'ما أداة الاستفهام التي نستعملها للسؤال عن المكان؟',
					hintAr: 'تبدأ بـ Wh وتعني (أين).',
					expectedInput: 'Where',
					revealAr: 'نستعمل «Where» (أين) للسؤال عن المكان: «Where is father? He is in the garden.».'
				}
			]
		},
		summary: {
			rulesAr: [
				'غرف المنزل: bedroom (غرفة النوم), kitchen (المطبخ), living room (غرفة الجلوس), bathroom (الحمام), garden (الحديقة).',
				'للسؤال عن مكان شخص أو شيء نقول: «Where is + الاسم؟» مثل: «Where is Youssef?».',
				'للإجابة نستعمل حرف الجر «in» (في): «He is in the bedroom.» أو «She is in the kitchen.».',
				'لوصف بيتنا نقول: «My house is big and clean.» (بيتي كبير ونظيف).'
			],
			visualSvg: svgHomeSummary,
			visualCaptionAr: 'غرف البيت الأساسية وأسلوب السؤال والإجابة بـ Where is / in the',
			examples: [
				{
					problemAr: 'أجب عن السؤال: «Where is mother?» (المطبخ).',
					solutionAr: '«She is in the kitchen.».'
				},
				{
					problemAr: 'اربط كل نشاط بالغرفة المناسبة: (I sleep : ......) / (We sit with family : ......)',
					solutionAr: 'I sleep : bedroom / We sit with family : living room.'
				}
			],
			watchOutAr:
				'فرّق بين «Who» (مَن للشخص) و«Where» (أين للمكان): «Who is this?» ≠ «Where is father?».'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «kitchen» باللغة العربية؟',
				options: ['غرفة النوم', 'المطبخ', 'الحديقة', 'القسم'],
				correctIndex: 1,
				diagnosticFeedback: [
					'غرفة النوم هي bedroom.',
					'أحسنت! kitchen تعني المطبخ.',
					'الحديقة هي garden.',
					'القسم هو classroom.'
				],
				explanationAr: 'كلمة kitchen تعني المطبخ حيث نُعدّ الطعام الصحي.'
			},
			{
				questionAr: 'أين ننام ليلاً؟ في:',
				options: ['the kitchen', 'the garden', 'the bedroom', 'the board'],
				correctIndex: 2,
				diagnosticFeedback: [
					'kitchen هو المطبخ.',
					'garden هي الحديقة.',
					'ممتاز! ننام في غرفة النوم: the bedroom.',
					'board هي السبورة.'
				],
				explanationAr: 'كلمة bed تعني سرير، ولذلك bedroom هي غرفة النوم.'
			},
			{
				questionAr: 'أكمل السؤال عن المكان: «...... is grandfather? He is in the garden.»',
				options: ['Who', 'What', 'Where', 'Hello'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Who تسأل عن الشخص وليس المكان.',
					'What تسأل عن الاسم أو الشيء.',
					'صحيح! Where تعني أين وتُستعمل للسؤال عن المكان.',
					'Hello تحية وليست أداة سؤال.'
				],
				explanationAr: 'لأن الإجابة تذكر مكاناً (in the garden)، نستعمل Where.'
			},
			{
				questionAr: 'اختر الإجابة الصحيحة: «Where is Sara? ...... is in the living room.»',
				options: ['He', 'She', 'It', 'I'],
				correctIndex: 1,
				diagnosticFeedback: [
					'سارة بنت، فلا نستعمل He.',
					'رائع! نعوّض Sara بالضمير She.',
					'It لغير العاقل.',
					'I تعني أنا.'
				],
				explanationAr: 'سارة اسم مؤنث، ولذلك نستخدم الضمير She.'
			}
		]
	}
];
