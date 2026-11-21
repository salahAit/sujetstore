import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishPrimaryCards
} from '../../svg-english';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimester 1 (Greetings, Alphabet & Phonics, Numbers & Colors, Family)
// ═══════════════════════════════════════════════════════════════════════════════

const svgGreetingsDiscover = renderLessonIllustration('pri_ara_01_school_bag_supplies', {
	lang: 'en',
	title: 'My School Things & First Greetings in 3AP',
	customLegend: [
		{ num: '1', label: 'A clean school bag, books and copybooks (Hello! Good morning!)' },
		{ num: '2', label: 'A pencil case, pens, pencils and a ruler' }
	]
});

const svgGreetingsSummary = svgEnglishGrammarMap({
	title: 'How to Greet & Introduce Yourself — التحية والتعريف بالنفس',
	rootLabel: 'Polite English Introduction',
	rootSub: '3 Simple Steps for 3AP',
	branches: [
		{
			label: '1. Greet',
			rule: 'Hello / Good morning',
			example: 'Hello, my friend!',
			color: '#1d4ed8'
		},
		{
			label: '2. Name',
			rule: 'My name is + Name',
			example: 'My name is Amine.',
			color: '#047857'
		},
		{
			label: '3. Age',
			rule: 'I am + number + years old',
			example: 'I am 8 years old.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgAlphabetDiscover = svgEnglishPrimaryCards({
	title: 'The Five English Vowels — الحروف المتحركة الخمسة',
	subtitle: 'English has 26 letters: 5 Vowels + 21 Consonants',
	cards: [
		{ word: 'A a', arabic: 'apple (تفاحة)', color: '#2563eb' },
		{ word: 'E e', arabic: 'egg (بيضة)', color: '#059669' },
		{ word: 'I i', arabic: 'ink (حبر)', color: '#d97706' },
		{ word: 'O o', arabic: 'orange (برتقالة)', color: '#7c3aed' },
		{ word: 'U u', arabic: 'umbrella (مظلة)', color: '#0284c7' }
	],
	width: 520,
	height: 185
});

const svgAlphabetSummary = svgEnglishPhoneticsChart({
	title: 'English Letters: Vowels & Consonants — الحروف المتحركة والساكنة',
	subtitle: 'Capital Letters (A, B, C) & Small Letters (a, b, c)',
	columns: [
		{
			sound: 'Vowels (5)',
			rule: 'a - e - i - o - u',
			examples: 'apple, egg, ink',
			color: '#1d4ed8'
		},
		{
			sound: 'Consonants (21)',
			rule: 'b, c, d, f, g, h, m, n, p, s, t...',
			examples: 'bag, pen, book',
			color: '#047857'
		},
		{
			sound: 'Capitals',
			rule: 'Start names & sentences',
			examples: 'Amine, Algiers, Hello',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgNumbersColorsDiscover = renderLessonIllustration('pri_lang_08_birthday_cake_party', {
	lang: 'en',
	title: 'Numbers & Colors: School Success Celebration',
	customLegend: [
		{ num: '1', label: 'One red strawberry cake' },
		{ num: '2', label: 'Colorful balloons (red, blue, green, yellow)' },
		{ num: '3', label: 'Three wrapped gift boxes with bright ribbons' }
	]
});

const svgNumbersColorsSummary = svgEnglishGrammarMap({
	title: 'Numbers (0-10) & Basic Colors — الأرقام والألوان الأساسية',
	rootLabel: 'Count & Describe',
	rootSub: 'Number + Color + Noun',
	branches: [
		{
			label: '0 to 5',
			rule: 'zero, one, two, three, four, five',
			example: 'three books',
			color: '#1d4ed8'
		},
		{
			label: '6 to 10',
			rule: 'six, seven, eight, nine, ten',
			example: 'eight years old',
			color: '#047857'
		},
		{
			label: 'Colors',
			rule: 'red, blue, green, yellow, white',
			example: 'a green bag',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgFamilyDiscover = svgEnglishPrimaryCards({
	title: 'My Loving Family — عائلتي الجميلة',
	subtitle: 'This is my family in Algeria',
	cards: [
		{ word: 'Father', arabic: 'الأب', color: '#1d4ed8' },
		{ word: 'Mother', arabic: 'الأم', color: '#047857' },
		{ word: 'Brother', arabic: 'الأخ', color: '#d97706' },
		{ word: 'Sister', arabic: 'الأخت', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgFamilySummary = svgEnglishGrammarMap({
	title: 'Presenting Family Members — تقديم أفراد العائلة',
	rootLabel: 'My Family — عائلتي',
	rootSub: 'Who is this? -> This is my...',
	branches: [
		{
			label: 'Parents',
			rule: 'father (dad) / mother (mum)',
			example: 'This is my father.',
			color: '#1d4ed8'
		},
		{
			label: 'Siblings',
			rule: 'brother / sister',
			example: 'This is my sister.',
			color: '#047857'
		},
		{
			label: 'Grandparents',
			rule: 'grandfather / grandmother',
			example: 'This is my grandmother.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T1 (4 Lessons — yearSubjectId: 799)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T1: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_3ap_t1_greetings_intro',
		slug: 'eng-3ap-t1-greetings-intro',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأسرتي وأصدقائي (Me, My Family and My Friends)',
		order: 1,
		titleAr: 'التحية والتعريف بالنفس (Greetings and Introducing Myself)',
		objectives: [
			'إلقاء التحية بالأدب باللغة الإنجليزية حسب الوقت (Hello, Good morning, Good afternoon, Goodbye)',
			'التعريف بالاسم والعمر بجمل قصيرة وصحيحة (My name is..., I am 8 years old)',
			'السؤال عن اسم الصديق بالإنجليزية (What is your name?)'
		],
		keywordsAr: ['التحية', 'Hello', 'Good morning', 'My name is', 'I am 8 years old', 'Goodbye'],
		discover: {
			scenarioAr:
				'في أول حصة للغة الإنجليزية بالسنة الثالثة ابتدائي، ابتسم الأستاذ وقال للتلاميذ: «Good morning! My name is Mr Karim. What is your name?». وقف أمين بأدب ليردّ عليه ويعرّف بنفسه.',
			svg: svgGreetingsDiscover,
			steps: [
				{
					promptAr: 'ما العبارة التي نقولها للتحية في الصباح باللغة الإنجليزية؟',
					hintAr: 'تبدأ بكلمة Good وتنتهي بكلمة morning.',
					expectedInput: 'Good morning',
					revealAr: 'نقول في الصباح: «Good morning» ومعناها صباح الخير، وفي أي وقت نقول: «Hello» أو «Hi».'
				},
				{
					promptAr: 'كيف يقول أمين «اسمي أمين» باللغة الإنجليزية؟',
					hintAr: 'نستعمل العبارة My name is ثم نضيف الاسم.',
					expectedInput: 'My name is Amine',
					revealAr: 'يقول أمين: «My name is Amine.» ويمكنه أيضاً أن يقول: «I am Amine.».'
				},
				{
					promptAr: 'عمر أمين 8 سنوات. كيف يعبّر عن عمره بالإنجليزية؟',
					hintAr: 'نستعمل: I am + الرقم + years old.',
					expectedInput: 'I am 8 years old',
					revealAr: 'يقول أمين: «I am 8 years old.» (عمري ثماني سنوات)، وعند الوداع يقول: «Goodbye!».'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتحية بالأدب نستعمل: «Hello / Hi» (مرحباً)، و«Good morning» (صباح الخير)، و«Good afternoon» (مساء الخير)، وعند الانصراف «Goodbye» (إلى اللقاء).',
				'للسؤال عن الاسم نقول: «What is your name?» (ما اسمك؟)، وللإجابة نقول: «My name is ...» أو «I am ...».',
				'للتعبير عن العمر نستعمل القاعدة: «I am + العدد + years old.» مثل: «I am 8 years old.».',
				'نبدأ دائماً الجملة الإنجليزية وأسماء الأشخاص بحرف كبير (Capital letter) مثل: Amine, Sara, Hello.'
			],
			visualSvg: svgGreetingsSummary,
			visualCaptionAr: 'خطوات التعريف بالنفس في ثلاث جمل سهلة لتلاميذ السنة الثالثة ابتدائي',
			examples: [
				{
					problemAr: 'أكمل الحوار بين سارة ويوسف:\nSara: Hello! What is your name?\nYoussef: ........ My name is Youssef.',
					solutionAr: 'Sara: Hello! What is your name?\nYoussef: Hello! My name is Youssef.'
				},
				{
					problemAr: 'رتّب الكلمات لتكوين جملة صحيحة: (years / am / I / 8 / old / .)',
					solutionAr: 'الجملة الصحيحة هي: «I am 8 years old.».'
				}
			],
			watchOutAr:
				'في اللغة الإنجليزية لا نقول «I have 8 years» للعمر، بل نستعمل دائماً فعل الكينونة: «I am 8 years old.»!'
		},
		practice: [
			{
				questionAr: 'ما التحية المناسبة عند دخول القسم في الصباح؟',
				options: ['Goodbye', 'Good morning', 'Good night', 'Thank you'],
				correctIndex: 1,
				diagnosticFeedback: [
					'«Goodbye» تقال عند الانصراف والوداع.',
					'أحسنت! «Good morning» تعني صباح الخير وتقال في الصباح.',
					'«Good night» تقال عند النوم ليلاً.',
					'«Thank you» تعني شكراً لك وليست تحية صباحية.'
				],
				explanationAr: 'في الصباح نحيّي الأستاذ والزملاء بعبارة «Good morning».'
			},
			{
				questionAr: 'اختر الإجابة الصحيحة على السؤال: «What is your name?»',
				options: ['I am 8 years old.', 'Good afternoon.', 'My name is Meriem.', 'Goodbye!'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذه الجملة تخبر عن العمر وليس الاسم.',
					'هذه تحية للمساء وليست إجابة عن الاسم.',
					'ممتاز! «My name is Meriem.» تعني اسمي مريم.',
					'هذه عبارة وداع وليست إجابة عن السؤال.'
				],
				explanationAr: 'السؤال «What is your name?» يسأل عن الاسم، لذا نجيب بـ «My name is ...».'
			},
			{
				questionAr: 'أيّ جملة تعبّر بشكل صحيح عن عمر تلميذ يبلغ 8 سنوات؟',
				options: ['I am 8 years old.', 'My name 8 years.', 'I 8 am old.', 'Hello 8 years.'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! الترتيب الصحيح هو: I am 8 years old.',
					'عبارة My name خاصة بالاسم وليست للعمر.',
					'ترتيب الكلمات غير صحيح؛ يجب وضع am بعد I مباشرة.',
					'هذه الجملة غير صحيحة؛ نستعمل I am للعمر.'
				],
				explanationAr: 'للتعبير عن العمر نكتب: I am + الرقم + years old.'
			},
			{
				questionAr: 'ماذا نقول للأستاذ والزملاء عند مغادرة المدرسة؟',
				options: ['Good morning', 'My name is Ali', 'What is your name?', 'Goodbye'],
				correctIndex: 3,
				diagnosticFeedback: [
					'«Good morning» تقال صباحاً عند الوصول.',
					'هذه الجملة للتعريف بالاسم فقط.',
					'هذا سؤال عن الاسم.',
					'أحسنت! «Goodbye» معناها إلى اللقاء عند الوداع.'
				],
				explanationAr: 'عند انتهاء الدروس ومغادرة القسم نقول «Goodbye».'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t1_alphabet_phonics',
		slug: 'eng-3ap-t1-alphabet-phonics',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأسرتي وأصدقائي (Me, My Family and My Friends)',
		order: 2,
		titleAr: 'الحروف الإنجليزية والصوتيات: المتحركة والساكنة (Alphabet and Vowels)',
		objectives: [
			'التعرف على حروف الأبجدية الإنجليزية الـ 26 بصورتيها الكبيرة والصغيرة (A-Z / a-z)',
			'التمييز الدقيق بين الحروف المتحركة الخمسة (a, e, i, o, u) والحروف الساكنة',
			'استعمال الحرف الكبير (Capital letter) في بداية الجملة وأسماء الأشخاص والبلدان'
		],
		keywordsAr: ['الأبجدية', 'Alphabet', 'Vowels', 'Consonants', 'Capital letter', 'Small letter'],
		discover: {
			scenarioAr:
				'كتبت الأستاذة على السبورة خمسة حروف بلون أزرق مميّز هي: (a, e, i, o, u)، وقالت للتلاميذ: هذه الحروف الخمسة هي أصدقاء كلّ كلمة إنجليزية لأنها تساعدنا على نطق الكلمات بسهولة.',
			svg: svgAlphabetDiscover,
			steps: [
				{
					promptAr: 'كم عدد حروف الأبجدية الإنجليزية كلها؟ وكم عدد الحروف المتحركة (Vowels)؟',
					hintAr: 'المجموع 26 حرفاً، والمتحركة هي a, e, i, o, u.',
					expectedInput: '5',
					revealAr: 'في اللغة الإنجليزية 26 حرفاً، منها 5 حروف متحركة (Vowels) هي: a, e, i, o, u، و21 حرفاً ساكناً (Consonants).'
				},
				{
					promptAr: 'ما الحرف المتحرك (Vowel) الموجود في كلمة «pen» (قلم)؟',
					hintAr: 'ابحث بين حروف p - e - n عن حرف من مجموعة (a, e, i, o, u).',
					expectedInput: 'e',
					revealAr: 'الحرف المتحرك في كلمة «pen» هو الحرف «e»، أما «p» و«n» فهما حرفان ساكنان.'
				},
				{
					promptAr: 'انظر إلى اسم «youssef». كيف نكتب حرفه الأول بشكل صحيح؟',
					hintAr: 'أسماء الأشخاص تبدأ دائماً بحرف كبير (Capital letter).',
					expectedInput: 'Y',
					revealAr: 'نكتبه «Youssef» بحرف «Y» كبير لأن أسماء الأشخاص تبدأ دائماً بحرف كبير.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تتكوّن الأبجدية الإنجليزية من 26 حرفاً، ولكل حرف شكلان: كبير (Capital: A, B, C...) وصغير (Small: a, b, c...).',
				'الحروف المتحركة (Vowels) عددها خمسة فقط، وهي: a, e, i, o, u.',
				'باقي الحروف الـ 21 تسمى حروفاً ساكنة (Consonants) مثل: b, c, d, f, m, n, p, r, s, t.',
				'نكتب الحرف الكبير (Capital letter) في بداية الجملة، وفي بداية أسماء الأشخاص (Amine, Fatima) والبلدان (Algeria) والضمير (I).'
			],
			visualSvg: svgAlphabetSummary,
			visualCaptionAr: 'الفرق بين الحروف المتحركة والساكنة ومواضع الحرف الكبير',
			examples: [
				{
					problemAr: 'صنّف الحروف الآتية إلى متحركة (Vowels) وساكنة (Consonants): (b, a, m, i, t, o)',
					solutionAr: 'الحروف المتحركة (Vowels): a, i, o.\nالحروف الساكنة (Consonants): b, m, t.'
				},
				{
					problemAr: 'أعد كتابة الجملة بوضع الحروف الكبيرة الصحيحة: «hello, i am amine.»',
					solutionAr: 'الجملة الصحيحة: «Hello, I am Amine.».'
				}
			],
			watchOutAr:
				'الضمير «I» (أنا) يُكتب دائماً حرفاً كبيراً (I) أينما جاء في الجملة، لا نكتبه صغيراً أبداً!'
		},
		practice: [
			{
				questionAr: 'أيّ مجموعة تحتوي فقط على حروف متحركة (Vowels)؟',
				options: ['a, b, c, d, e', 'a, e, i, o, u', 'm, n, p, r, s', 'e, i, k, o, t'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحروف b, c, d ساكنة وليست متحركة.',
					'أحسنت! الحروف المتحركة الخمسة هي: a, e, i, o, u.',
					'كل هذه الحروف ساكنة (Consonants).',
					'الحرفان k و t ساكنان وليسا من الحروف المتحركة.'
				],
				explanationAr: 'الحروف المتحركة في اللغة الإنجليزية خمسة: a, e, i, o, u.'
			},
			{
				questionAr: 'ما الحرف المتحرك (Vowel) في كلمة «bag» (محفظة)؟',
				options: ['b', 'g', 'a', 'لا يوجد'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف b ساكن (Consonant).',
					'الحرف g ساكن (Consonant).',
					'ممتاز! الحرف a من الحروف المتحركة الخمسة.',
					'توجد في كلمة bag علامة متحركة هي الحرف a.'
				],
				explanationAr: 'كلمة bag فيها حرفان ساكنان (b, g) وحرف متحرك واحد هو a.'
			},
			{
				questionAr: 'أيّ حرف يأتي مباشرة بعد الحرف «D» في الترتيب الأبجدي؟',
				options: ['C', 'F', 'E', 'G'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف C يأتي قبل D.',
					'الحرف F يأتي بعد E.',
					'صحيح! الترتيب هو: A, B, C, D, E.',
					'الحرف G يأتي بعد F.'
				],
				explanationAr: 'بداية الأبجدية الإنجليزية هي: A, B, C, D, E, F, G.'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة للجملة من حيث الحروف الكبيرة (Capital letters):',
				options: ['hello, i am sara.', 'Hello, i am sara.', 'Hello, I am Sara.', 'hello, I am Sara.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'يجب تكبير الحرف الأول من الجملة والضمير I واسم Sara.',
					'يجب تكبير الضمير I وأول حرف من اسم Sara.',
					'أحسنت! Hello تبدأ بحرف كبير، والضمير I كبير، واسم Sara يبدأ بحرف كبير.',
					'بداية الجملة Hello يجب أن تبدأ بحرف كبير H.'
				],
				explanationAr: 'نستعمل الحرف الكبير في أول الجملة (Hello) ومع الضمير (I) وأسماء الأشخاص (Sara).'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t1_numbers_colors',
		slug: 'eng-3ap-t1-numbers-colors',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأسرتي وأصدقائي (Me, My Family and My Friends)',
		order: 3,
		titleAr: 'الأرقام من 0 إلى 10 والألوان الأساسية (Numbers 0-10 and Colors)',
		objectives: [
			'قراءة وكتابة الأرقام من 0 إلى 10 بالحروف الإنجليزية (zero to ten)',
			'تسمية الألوان الأساسية باللغة الإنجليزية (red, blue, green, yellow, white, black, orange)',
			'استعمال الأرقام والألوان لوصف الأشياء البسيطة (two red pens, a green bag)'
		],
		keywordsAr: ['الأرقام', 'Numbers', 'الألوان', 'Colors', 'zero to ten', 'green white red'],
		discover: {
			scenarioAr:
				'أخرجت إيناس أقلامها الملوّنة لترسم علم الجزائر الجميل، فعدّت الأقلام بالإنجليزية: one, two, three ثم سمّت ألوان العلم: green, white, red.',
			svg: svgNumbersColorsDiscover,
			steps: [
				{
					promptAr: 'ما ألوان علم الجزائر الثلاثة باللغة الإنجليزية؟',
					hintAr: 'الأخضر والأبيض والأحمر.',
					expectedInput: 'green, white, red',
					revealAr: 'ألوان علم الجزائر هي: «green» (أخضر)، و«white» (أبيض)، و«red» (أحمر).'
				},
				{
					promptAr: 'كيف نكتب العدد 8 بالحروف الإنجليزية؟',
					hintAr: 'نستعمله كثيراً لقول عمرنا في السنة الثالثة ابتدائي.',
					expectedInput: 'eight',
					revealAr: 'العدد 8 يُكتب «eight»، والعدد 9 يُكتب «nine»، والعدد 10 يُكتب «ten».'
				},
				{
					promptAr: 'كيف نقول «قلم أزرق» بالإنجليزية: هل نضع اللون قبل الشيء أم بعده؟',
					hintAr: 'في الإنجليزية نذكر اللون أولاً ثم اسم الشيء.',
					expectedInput: 'a blue pen',
					revealAr: 'نقول «a blue pen»؛ فاللون (blue) يأتي دائماً قبل الاسم (pen) في اللغة الإنجليزية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأرقام من 0 إلى 5: zero (0), one (1), two (2), three (3), four (4), five (5).',
				'الأرقام من 6 إلى 10: six (6), seven (7), eight (8), nine (9), ten (10).',
				'الألوان الأساسية: red (أحمر), blue (أزرق), green (أخضر), yellow (أصفر), white (أبيض), black (أسود), orange (برتقالي).',
				'قاعدة الوصف: في الإنجليزية يأتي اللون قبل الاسم، فنقول: «a green book» (كتاب أخضر) و«three blue pens» (ثلاثة أقلام زرقاء).'
			],
			visualSvg: svgNumbersColorsSummary,
			visualCaptionAr: 'جدول الأرقام من 0 إلى 10 والألوان الأساسية مع طريقة تركيب الوصف',
			examples: [
				{
					problemAr: 'اكتب الأرقام التالية بالحروف الإنجليزية: 3 — 7 — 10',
					solutionAr: '3: three — 7: seven — 10: ten.'
				},
				{
					problemAr: 'ترجم إلى الإنجليزية: «محفظة زرقاء».',
					solutionAr: '«a blue bag» (نضع اللون blue قبل كلمة bag).'
				}
			],
			watchOutAr:
				'لا تكتب «pen red» كما في الترتيب العربي! في الإنجليزية الصفة واللون يسبقان الاسم دائماً: «a red pen».'
		},
		practice: [
			{
				questionAr: 'ما الكتابة الصحيحة للعدد «7» باللغة الإنجليزية؟',
				options: ['six', 'seven', 'eight', 'nine'],
				correctIndex: 1,
				diagnosticFeedback: [
					'six هو العدد 6.',
					'أحسنت! seven هو العدد 7.',
					'eight هو العدد 8.',
					'nine هو العدد 9.'
				],
				explanationAr: 'ترتيب الأعداد هو: six (6), seven (7), eight (8), nine (9).'
			},
			{
				questionAr: 'ما معنى اللون «yellow» باللغة العربية؟',
				options: ['أخضر', 'أزرق', 'أصفر', 'أسود'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأخضر هو green.',
					'الأزرق هو blue.',
					'ممتاز! yellow تعني أصفر.',
					'الأسود هو black.'
				],
				explanationAr: 'كلمة yellow تعني اللون الأصفر مثل لون الشمس.'
			},
			{
				questionAr: 'أكمل سلسلة الأعداد: two, three, four, ......, six',
				options: ['one', 'five', 'seven', 'ten'],
				correctIndex: 1,
				diagnosticFeedback: [
					'one يأتي قبل two.',
					'رائع! العدد الذي بين four (4) و six (6) هو five (5).',
					'seven يأتي بعد six.',
					'ten هو العدد 10.'
				],
				explanationAr: 'العدد 5 بالإنجليزية هو five.'
			},
			{
				questionAr: 'اختر العبارة الصحيحة التي تعني «كتاب أخضر»:',
				options: ['a book green', 'a green book', 'green a book', 'book a green'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الإنجليزية اللون يسبق الاسم ولا يأتي بعده.',
					'أحسنت! نضع أداة النكرة ثم اللون ثم الاسم: a green book.',
					'أداة النكرة a تأتي أولاً قبل اللون.',
					'هذا الترتيب غير صحيح في اللغة الإنجليزية.'
				],
				explanationAr: 'في اللغة الإنجليزية نقول: a + color + noun، إذن: a green book.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t1_my_family',
		slug: 'eng-3ap-t1-my-family',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا وأسرتي وأصدقائي (Me, My Family and My Friends)',
		order: 4,
		titleAr: 'عائلتي الحبيبة (My Family)',
		objectives: [
			'حفظ أسماء أفراد العائلة بالإنجليزية (father, mother, brother, sister, grandfather, grandmother)',
			'تقديم أفراد العائلة باستعمال العبارة: This is my...',
			'السؤال عن شخص من العائلة بـ: Who is this?'
		],
		keywordsAr: ['العائلة', 'My family', 'father', 'mother', 'brother', 'sister', 'This is my'],
		discover: {
			scenarioAr:
				'أحضر أنس صورة جميلة لعائلته إلى القسم، وسأله صديقه عمر: «Who is this?» (من هذا؟)، فأشار أنس إلى أبيه وأمه وأخته وبدأ يقدّمهم باللغة الإنجليزية.',
			svg: svgFamilyDiscover,
			steps: [
				{
					promptAr: 'كيف يقدّم أنس والده لصديقه بالإنجليزية؟',
					hintAr: 'نستعمل عبارة This is my ثم كلمة الأب (father).',
					expectedInput: 'This is my father',
					revealAr: 'يقول أنس: «This is my father.» (هذا أبي)، أو «This is my dad.».'
				},
				{
					promptAr: 'ماذا نسمّي «الأم» و«الأخت» باللغة الإنجليزية؟',
					hintAr: 'الأم: mother، والأخت: sister.',
					expectedInput: 'mother and sister',
					revealAr: 'الأم هي «mother» (أو mum)، والأخت هي «sister»، والأخ هو «brother».'
				},
				{
					promptAr: 'كيف نسمّي الجدّ والجدّة باللغة الإنجليزية؟',
					hintAr: 'نضيف كلمة grand قبل father و mother.',
					expectedInput: 'grandfather and grandmother',
					revealAr: 'الجدّ هو «grandfather» والجدّة هي «grandmother»، ونحن نحترمهم ونبرّهم دائماً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أفراد العائلة الأساسيون: father (أب), mother (أم), brother (أخ), sister (أخت).',
				'الأجداد: grandfather (جدّ), grandmother (جدّة).',
				'لتقديم أي فرد من عائلتنا نقول: «This is my + فرد العائلة.» مثل: «This is my mother.» (هذه أمي).',
				'للسؤال عن شخص قريب أو في صورة نقول: «Who is this?» (من هذا / من هذه؟).'
			],
			visualSvg: svgFamilySummary,
			visualCaptionAr: 'شجرة العائلة البسيطة وأسلوب تقديم الأفراد بعبارة This is my',
			examples: [
				{
					problemAr: 'أجب عن السؤال: «Who is this?» (أشِر إلى أخيك).',
					solutionAr: '«This is my brother.» (هذا أخي).'
				},
				{
					problemAr: 'أكمل الحروف الناقصة في الكلمتين: f..ther — s..ster',
					solutionAr: 'father (أب) — sister (أخت).'
				}
			],
			watchOutAr:
				'انتبه إلى أن «This is my...» تُستعمل للمذكر والمؤنث معاً في الإنجليزية: «This is my father» و«This is my mother»!'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «grandmother» باللغة العربية؟',
				options: ['الأخت', 'الأم', 'الجدّة', 'الجدّ'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأخت هي sister.',
					'الأم هي mother.',
					'أحسنت! grandmother تعني الجدّة.',
					'الجدّ هو grandfather.'
				],
				explanationAr: 'grand + mother تعني الجدّة، و grand + father تعني الجدّ.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة لتقديم أختك:',
				options: ['This is my brother.', 'This is my sister.', 'This is my father.', 'This is my grandfather.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'brother تعني الأخ.',
					'ممتاز! «This is my sister.» تعني هذه أختي.',
					'father تعني الأب.',
					'grandfather تعني الجدّ.'
				],
				explanationAr: 'كلمة أخت بالإنجليزية هي sister، ونقدمها بـ This is my sister.'
			},
			{
				questionAr: 'ما السؤال المناسب للإجابة: «This is my father.»؟',
				options: ['What is your name?', 'How old are you?', 'Who is this?', 'Goodbye!'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا السؤال يطلب الاسم.',
					'هذا السؤال يطلب العمر.',
					'صحيح! «Who is this?» معناها من هذا؟',
					'هذه عبارة وداع وليست سؤالاً.'
				],
				explanationAr: 'نستعمل أداة الاستفهام Who (مَن) للسؤال عن الأشخاص: Who is this?'
			},
			{
				questionAr: 'أيّ كلمة لا تنتمي إلى أفراد العائلة؟',
				options: ['mother', 'brother', 'blue', 'sister'],
				correctIndex: 2,
				diagnosticFeedback: [
					'mother تعني الأم وهي من العائلة.',
					'brother تعني الأخ وهو من العائلة.',
					'أحسنت! blue لون (أزرق) وليس من أفراد العائلة.',
					'sister تعني الأخت وهي من العائلة.'
				],
				explanationAr: 'كلمات mother و brother و sister من العائلة، أما blue فاسم لون.'
			}
		]
	}
];
