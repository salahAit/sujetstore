import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishPrimaryCards
} from '../../svg-english';
import { renderLessonIllustration } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimester 1 (Nationalities, Numbers 11-30 & Subjects, To Be / To Have, Possessives)
// ═══════════════════════════════════════════════════════════════════════════════

const svgNationalitiesDiscover = renderLessonIllustration(
	'pri_ara_04_algeria_flag_martyrs_memorial',
	{
		lang: 'en',
		title: 'My Country Algeria & Nationalities (4AP)',
		customLegend: [
			{ num: '1', label: 'Martyrs Memorial and the Casbah of Algiers' },
			{ num: '2', label: 'The Algerian flag: I am from Algeria. I am Algerian.' }
		]
	}
);

const svgNationalitiesSummary = svgEnglishGrammarMap({
	title: 'Asking About Origin & Nationality — السؤال عن البلد والجنسية',
	rootLabel: 'Where are you from?',
	rootSub: 'Country (البلد) + Nationality (الجنسية)',
	branches: [
		{
			label: 'Question',
			rule: 'Where are you from?',
			example: 'Where is Ali from?',
			color: '#1d4ed8'
		},
		{
			label: 'Country',
			rule: 'I am from + Country',
			example: 'I am from Algeria.',
			color: '#047857'
		},
		{
			label: 'Nationality',
			rule: 'I am + Nationality',
			example: 'I am Algerian.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgNumbersSubjectsDiscover = svgEnglishPrimaryCards({
	title: 'Numbers 11 to 30 & School Subjects — الأرقام والمواد الدراسية',
	subtitle: 'Count from 11 to 30 and Name Your Lessons',
	cards: [
		{ word: 'eleven (11)', arabic: 'Arabic (العربية)', color: '#2563eb' },
		{ word: 'fifteen (15)', arabic: 'English (الإنجليزية)', color: '#059669' },
		{ word: 'twenty (20)', arabic: 'Maths (الرياضيات)', color: '#d97706' },
		{ word: 'thirty (30)', arabic: 'Science (العلوم)', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgNumbersSubjectsSummary = svgEnglishPhoneticsChart({
	title: 'Numbers 11-30 Patterns — قواعد كتابة الأعداد من 11 إلى 30',
	subtitle: 'Watch the endings: -teen (13-19) and -ty (20, 30)',
	columns: [
		{
			sound: '11 - 12',
			rule: 'eleven, twelve',
			examples: '11 pupils, 12 books',
			color: '#1d4ed8'
		},
		{
			sound: '13 - 19 (-teen)',
			rule: 'thirteen, fifteen, eighteen',
			examples: '14, 16, 17, 19',
			color: '#047857'
		},
		{
			sound: '20 - 30',
			rule: 'twenty, twenty-five, thirty',
			examples: '21 twenty-one, 30 thirty',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgBeHaveDiscover = renderLessonIllustration('pri_lang_05_professions_tools', {
	lang: 'en',
	title: 'Verb To Be & Verb To Have: Family Jobs and Tools',
	customLegend: [
		{ num: '1', label: 'He is a doctor. He has a stethoscope.' },
		{ num: '2', label: 'He is a firefighter. He has a red helmet.' },
		{ num: '3', label: 'He is a baker. He has warm bread.' },
		{ num: '4', label: 'She is a teacher. She has books and a ruler.' }
	]
});

const svgBeHaveSummary = svgEnglishGrammarMap({
	title: 'To Be (am / is / are) & To Have (have / has)',
	rootLabel: 'Two Essential Verbs in 4AP',
	rootSub: 'Match the verb with the subject pronoun',
	branches: [
		{
			label: 'I',
			rule: 'I am / I have',
			example: 'I am 9. I have a brother.',
			color: '#1d4ed8'
		},
		{
			label: 'He / She / It',
			rule: 'is / has',
			example: 'She is kind. She has a cat.',
			color: '#047857'
		},
		{
			label: 'You / We / They',
			rule: 'are / have',
			example: 'We are pupils. We have books.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgPossessivesDiscover = renderLessonIllustration('pri_lang_08_birthday_cake_party', {
	lang: 'en',
	title: 'Possessive Adjectives (my, your, his, her): School Success Celebration',
	customLegend: [
		{ num: '1', label: 'Our strawberry cake for school success' },
		{ num: '2', label: 'My colorful balloons and your nice banner' },
		{ num: '3', label: 'His gift box and her new storybook' }
	]
});

const svgPossessivesSummary = svgEnglishGrammarMap({
	title: 'How to Use my, your, his, her — قاعدة صفات الملكية',
	rootLabel: 'Possessive Adjective + Noun',
	rootSub: 'Look at the owner (صاحب الشيء)',
	branches: [
		{
			label: 'I (my)',
			rule: 'Belongs to me',
			example: 'My name is Amine.',
			color: '#1d4ed8'
		},
		{
			label: 'You (your)',
			rule: 'Belongs to you',
			example: 'What is your name?',
			color: '#047857'
		},
		{
			label: 'He (his)',
			rule: 'Belongs to a boy',
			example: 'His bag is green.',
			color: '#b45309'
		},
		{
			label: 'She (her)',
			rule: 'Belongs to a girl',
			example: 'Her book is clean.',
			color: '#7c3aed'
		}
	],
	width: 520,
	height: 255
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T1 (4 Lessons — yearSubjectId: 800)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T1: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_4ap_t1_family_nationalities',
		slug: 'eng-4ap-t1-family-nationalities',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: العائلة والأصدقاء والجنسيات (Family and Friends)',
		order: 1,
		titleAr: 'العائلة والأصدقاء والجنسيات (Family, Friends and Nationalities)',
		objectives: [
			'طرح السؤال عن البلد والإجابة عنه: Where are you from? / I am from Algeria.',
			'التمييز بين اسم البلد (Country) والجنسية (Nationality) وكتابتهما بحرف كبير',
			'تقديم الصديق مع ذكر بلده وجنسيته (He is from Palestine. He is Palestinian.)'
		],
		keywordsAr: ['البلدان', 'الجنسيات', 'Algeria', 'Algerian', 'Where are you from', 'Nationalities'],
		discover: {
			scenarioAr:
				'في مسابقة قرآنية وثقافية جمعت أطفالاً من بلدان عربية مختلفة، سأل أنس صديقه الجديد: «Where are you from?» فأجاب: «I am from Palestine. I am Palestinian.» وقال أنس بفخر: «I am from Algeria. I am Algerian.».',
			svg: svgNationalitiesDiscover,
			steps: [
				{
					promptAr: 'ما السؤال الذي نطرحه لمعرفة بلد صديق جديد بالإنجليزية؟',
					hintAr: 'يبدأ بـ Where are you ...',
					expectedInput: 'Where are you from?',
					revealAr: 'نسأل: «Where are you from?» (من أين أنت؟) ونجيب: «I am from Algeria.».'
				},
				{
					promptAr: 'ما الفرق بين «Algeria» و«Algerian»؟',
					hintAr: 'الأولى اسم البلد، والثانية الجنسية.',
					expectedInput: 'country and nationality',
					revealAr: '«Algeria» هي اسم البلد (الجزائر)، و«Algerian» هي الجنسية (جزائري / جزائرية).'
				},
				{
					promptAr: 'كيف نكتب أسماء البلدان والجنسيات في اللغة الإنجليزية؟',
					hintAr: 'هل نبدأ بحرف كبير أم صغير؟',
					expectedInput: 'capital letter',
					revealAr: 'تبدأ أسماء البلدان والجنسيات دائماً بحرف كبير (Capital letter) مثل: Algeria, Algerian, Tunisia, Tunisian.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للسؤال عن البلد: «Where are you from?» (من أين أنت؟) أو «Where is he/she from?» (من أين هو/هي؟).',
				'للإجابة بذكر البلد نستعمل «from»: «I am from Algeria.» — «He is from Tunisia.».',
				'للإجابة بذكر الجنسية لا نستعمل «from»: «I am Algerian.» — «She is Palestinian.».',
				'بلدان وجنسيات مهمة: Algeria (Algerian), Tunisia (Tunisian), Morocco (Moroccan), Egypt (Egyptian), Palestine (Palestinian), Britain (British).'
			],
			visualSvg: svgNationalitiesSummary,
			visualCaptionAr: 'الفرق الدقيق بين ذكر البلد مع from وذكر الجنسية بدون from',
			examples: [
				{
					problemAr: 'أكمل بذكر البلد أو الجنسية: I am from Algeria. I am .......... / He is from Egypt. He is .......... .',
					solutionAr: 'I am Algerian. / He is Egyptian.'
				},
				{
					problemAr: 'صحّح الخطأ في الجملة: «I am from Algerian.»',
					solutionAr: 'الصواب: «I am from Algeria.» (أو «I am Algerian.» بدون from).'
				}
			],
			watchOutAr:
				'احذر من الخلط بين البلد والجنسية! بعد كلمة «from» نضع اسم البلد فقط (from Algeria)، وبدون «from» نضع الجنسية (Algerian).'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بشكل صحيح: «I am from ...... . I am Algerian.»',
				options: ['Algerian', 'Algeria', 'Tunisian', 'Egypt'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Algerian هي الجنسية، وبعد from نضع اسم البلد.',
					'أحسنت! بعد from نضع اسم البلد: Algeria.',
					'Tunisian جنسية وليست بلداً.',
					'الجملة الثانية تقول Algerian، لذا البلد هو Algeria.'
				],
				explanationAr: 'نستعمل اسم البلد بعد حرف الجر from: I am from Algeria.'
			},
			{
				questionAr: 'ما الجنسية المقابلة لبلد «Palestine»؟',
				options: ['Palestin', 'Palestinian', 'Palestiner', 'Palestish'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه الصيغة غير صحيحة.',
					'ممتاز! جنسية Palestine هي Palestinian.',
					'لا نضيف er لاسم هذا البلد.',
					'هذه اللاحقة غير صحيحة.'
				],
				explanationAr: 'Palestine (البلد) يقابلها Palestinian (الجنسية).'
			},
			{
				questionAr: 'اختر السؤال المناسب للإجابة: «He is from Tunisia.»',
				options: ['What is his name?', 'How old is he?', 'Where is he from?', 'Who is he?'],
				correctIndex: 2,
				diagnosticFeedback: [
					'هذا السؤال يطلب الاسم.',
					'هذا السؤال يطلب العمر.',
					'صحيح! Where is he from? تعني من أين هو؟',
					'Who is he? تسأل عن هويته وليس بلده.'
				],
				explanationAr: 'للسؤال عن بلد شخص ما نستعمل: Where is he/she from?'
			},
			{
				questionAr: 'أيّ جملة صحيحة تماماً من حيث القاعدة والحروف الكبيرة؟',
				options: [
					'She is from morocco.',
					'She is Moroccan.',
					'She is from Moroccan.',
					'She is algerian.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'اسم البلد Morocco يجب أن يبدأ بحرف كبير M.',
					'أحسنت! She is Moroccan. صحيحة المعنى والإملاء.',
					'لا نضع from قبل الجنسية Moroccan.',
					'الجنسية Algerian تبدأ دائماً بحرف كبير A.'
				],
				explanationAr: 'البلدان والجنسيات تبدأ بحرف كبير، ولا نضع from قبل الجنسية.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t1_numbers_subjects',
		slug: 'eng-4ap-t1-numbers-subjects',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: العائلة والأصدقاء والجنسيات (Family and Friends)',
		order: 2,
		titleAr: 'الأرقام من 11 إلى 30 والمواد الدراسية (Numbers 11-30 and School Subjects)',
		objectives: [
			'قراءة وكتابة الأعداد من 11 إلى 30 بالحروف الإنجليزية بدقة (eleven to thirty)',
			'التعرف على أسماء المواد الدراسية في المدرسة الجزائرية (Arabic, Islamic Education, English, Maths, Science)',
			'التعبير عن المادة المفضلة وعدد التلاميذ في القسم'
		],
		keywordsAr: ['الأرقام 11-30', 'eleven', 'twenty', 'thirty', 'School subjects', 'Arabic', 'Maths'],
		discover: {
			scenarioAr:
				'في قسم السنة الرابعة ابتدائي، عدّت المعلمة التلاميذ فوجدتهم خمسة وعشرين تلميذاً (twenty-five pupils)، ثم كتبت على السبورة جدول المواد المفضلة: Arabic, Islamic Education, English, Maths, Science.',
			svg: svgNumbersSubjectsDiscover,
			steps: [
				{
					promptAr: 'ما المقطع الذي تنتهي به الأعداد من 13 إلى 19 بالإنجليزية؟',
					hintAr: 'تأمّل: thirteen, fourteen, fifteen, sixteen.',
					expectedInput: 'teen',
					revealAr: 'الأعداد من 13 إلى 19 تنتهي بـ «teen»، أما 11 فهي «eleven» و12 هي «twelve».'
				},
				{
					promptAr: 'كيف نكتب العدد 24 بالحروف الإنجليزية؟',
					hintAr: 'نكتب 20 (twenty) ثم شرطة (-) ثم 4 (four).',
					expectedInput: 'twenty-four',
					revealAr: 'نكتب «twenty-four»، ومثلها «twenty-one» (21) و«twenty-nine» (29) ثم «thirty» (30).'
				},
				{
					promptAr: 'ماذا نسمي مواد «الرياضيات» و«العلوم» و«التربية الإسلامية» بالإنجليزية؟',
					hintAr: 'Maths — Science — Islamic Education.',
					expectedInput: 'Maths, Science, Islamic Education',
					revealAr: 'الرياضيات «Maths»، والعلوم «Science»، والتربية الإسلامية «Islamic Education»، والعربية «Arabic»، والإنجليزية «English».'
				}
			]
		},
		summary: {
			rulesAr: [
				'من 11 إلى 15: eleven (11), twelve (12), thirteen (13), fourteen (14), fifteen (15).',
				'من 16 إلى 20: sixteen (16), seventeen (17), eighteen (18), nineteen (19), twenty (20).',
				'من 21 إلى 30: نكتب twenty ثم شرطة ثم الآحاد: twenty-one (21), twenty-five (25), twenty-eight (28), thirty (30).',
				'المواد الدراسية: Arabic, Islamic Education, English, Maths, Science, History, Geography. للتعبير عن مادتك المفضلة قل: «My favourite subject is Arabic.».'
			],
			visualSvg: svgNumbersSubjectsSummary,
			visualCaptionAr: 'تقسيم الأعداد من 11 إلى 30 حسب نهاياتها لسهولة الحفظ والإملاء',
			examples: [
				{
					problemAr: 'اكتب الأعداد الآتية بالحروف: 12 — 15 — 27 — 30',
					solutionAr: '12: twelve — 15: fifteen — 27: twenty-seven — 30: thirty.'
				},
				{
					problemAr: 'أجب عن السؤال: «What is your favourite school subject?»',
					solutionAr: '«My favourite subject is English.» (أو Arabic / Maths / Islamic Education).'
				}
			],
			watchOutAr:
				'انتبه لكتابة 13 و15 و18: لا نكتب threeteen أو fiveteen، بل نكتب «thirteen» و«fifteen» و«eighteen» بحرف t واحد!'
		},
		practice: [
			{
				questionAr: 'ما الكتابة الصحيحة للعدد «15» باللغة الإنجليزية؟',
				options: ['fiveteen', 'fifteen', 'fifty', 'fourteen'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تتغير كتابة five إلى fif عند إضافة teen.',
					'أحسنت! العدد 15 يُكتب fifteen.',
					'fifty تعني 50 وليس 15.',
					'fourteen هي العدد 14.'
				],
				explanationAr: 'العدد 15 بالإنجليزية هو fifteen.'
			},
			{
				questionAr: 'ما العدد الذي يمثله الحرفان «twenty-eight»؟',
				options: ['18', '20', '28', '30'],
				correctIndex: 2,
				diagnosticFeedback: [
					'18 هي eighteen.',
					'20 هي twenty.',
					'ممتاز! twenty (20) + eight (8) = 28.',
					'30 هي thirty.'
				],
				explanationAr: 'twenty-eight تعني ثمانية وعشرون (28).'
			},
			{
				questionAr: 'أيّ كلمة من الآتي هي مادة دراسية (School subject)؟',
				options: ['Kitchen', 'Science', 'Camel', 'Sunday'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Kitchen غرفة في المنزل.',
					'صحيح! Science تعني مادة العلوم.',
					'Camel اسم حيوان.',
					'Sunday يوم من أيام الأسبوع.'
				],
				explanationAr: 'Science (العلوم) مادة دراسية مثل Arabic و Maths و English.'
			},
			{
				questionAr: 'أكمل سلسلة الأعداد: twenty-eight, twenty-nine, ......',
				options: ['thirteen', 'twenty', 'thirty', 'twelve'],
				correctIndex: 2,
				diagnosticFeedback: [
					'thirteen هي 13.',
					'twenty هي 20.',
					'رائع! بعد 29 يأتي العدد 30 وهو thirty.',
					'twelve هي 12.'
				],
				explanationAr: 'العدد 30 باللغة الإنجليزية هو thirty.'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t1_to_be_to_have',
		slug: 'eng-4ap-t1-to-be-to-have',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: العائلة والأصدقاء والجنسيات (Family and Friends)',
		order: 3,
		titleAr: 'فعلا الكينونة والملكية (Verb To Be and Verb To Have)',
		objectives: [
			'تصريف فعل الكينونة (to be: am / is / are) مع جميع الضمائر المفردة والجمع',
			'تصريف فعل الملكية (to have: have / has) بشكل صحيح حسب الضمير',
			'التمييز الدقيق بين متى نستعمل to be (للصفة والعمر والجنسية) ومتى نستعمل to have (للملكية وأفراد العائلة)'
		],
		keywordsAr: ['Verb to be', 'Verb to have', 'am is are', 'have has', 'Grammar 4AP'],
		discover: {
			scenarioAr:
				'عرّف آدم بصديقه عمر أمام القسم فقال: «He is Omar. He is 9 years old. He has two brothers and one sister. We are good friends and we have new English books.».',
			svg: svgBeHaveDiscover,
			steps: [
				{
					promptAr: 'ما تصريف الفعل (to be) مع ضمائر الجمع (You, We, They)؟',
					hintAr: 'انظر إلى جملة آدم: We ... good friends.',
					expectedInput: 'are',
					revealAr: 'مع (You, We, They) نستعمل «are»: You are / We are / They are.'
				},
				{
					promptAr: 'ما تصريف الفعل (to have) مع الضمائر (He, She, It)؟',
					hintAr: 'هل نقول He have أم He has؟',
					expectedInput: 'has',
					revealAr: 'مع (He, She, It) نستعمل «has»: «He has two brothers.»، ومع الباقي (I, You, We, They) نستعمل «have».'
				},
				{
					promptAr: 'هل نقول للعمر «I have 9 years old» أم «I am 9 years old»؟',
					hintAr: 'تذكّر: في الإنجليزية العمر يأخذ فعل الكينونة to be.',
					expectedInput: 'I am 9 years old',
					revealAr: 'نقول «I am 9 years old.» بـ (to be)، بينما للملكية أو الإخوة نقول «I have a brother.» بـ (to have).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تصريف فعل الكينونة (to be): I am — He / She / It is — You / We / They are.',
				'تصريف فعل الملكية (to have): I / You / We / They have — He / She / It has.',
				'نستعمل (to be) مع الاسم والعمر والصفة والجنسية: «She is Algerian.», «We are polite pupils.».',
				'نستعمل (to have) مع الأشياء التي نملكها وأفراد العائلة: «I have a blue bag.», «He has a sister.».'
			],
			visualSvg: svgBeHaveSummary,
			visualCaptionAr: 'مقارنة شاملة بين تصريف فعل الكينونة (to be) وفعل الملكية (to have)',
			examples: [
				{
					problemAr: 'أكمل بـ (am / is / are): We ...... Algerian. / Meriem ...... 9 years old.',
					solutionAr: 'We are Algerian. / Meriem is 9 years old.'
				},
				{
					problemAr: 'أكمل بـ (have / has): I ...... two books. / My brother ...... a green ruler.',
					solutionAr: 'I have two books. / My brother has a green ruler.'
				}
			],
			watchOutAr:
				'تنبّه لاسم الشخص المفرد مثل «Amine» أو «My mother»: إنه يعادل He أو She، لذلك يأخذ «is» و«has» (وليس have)!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: «They ...... good pupils in 4AP.»',
				options: ['am', 'is', 'are', 'has'],
				correctIndex: 2,
				diagnosticFeedback: [
					'am تُستعمل مع I فقط.',
					'is للمفرد (He, She, It).',
					'أحسنت! الضمير They يأخذ are.',
					'has فعل ملكية للمفرد ولا يناسب المعنى.'
				],
				explanationAr: 'ضمائر الجمع (We, You, They) تأخذ دائماً are.'
			},
			{
				questionAr: 'أكمل الجملة بفعل الملكية الصحيح: «Fatima ...... a red school bag.»',
				options: ['have', 'has', 'are', 'am'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Fatima مفرد مؤنث (She)، فلا نضع have.',
					'ممتاز! مع He / She / It نستعمل has.',
					'are فعل كينونة للجمع.',
					'am فعل كينونة مع I.'
				],
				explanationAr: 'Fatima تقابل الضمير She، وفعل الملكية مع She هو has.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة تماماً:',
				options: [
					'I has two sisters.',
					'He have a white cat.',
					'We have English on Monday.',
					'She are from Algeria.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'مع I نقول have وليس has.',
					'مع He نقول has وليس have.',
					'صحيح! We تأخذ have فالجملة سليمة تماماً.',
					'مع She نقول is وليس are.'
				],
				explanationAr: 'I / You / We / They تأخذ have، و He / She / It تأخذ has.'
			},
			{
				questionAr: 'أيّ فعل يكمل الجملتين: «Omar ...... 9 years old. He ...... one brother.»؟',
				options: ['is / has', 'am / have', 'are / has', 'has / is'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! للعمر نستعمل is، ولامتلاك أخ نستعمل has.',
					'Omar يعادل He وليس I.',
					'Omar مفرد وليس جمعاً.',
					'في الإنجليزية لا نستعمل has للعمر.'
				],
				explanationAr: 'العمر يأخذ to be (Omar is 9) والأخوة تأخذ to have (He has one brother).'
			}
		]
	},
	{
		id: 'eng_lesson_4ap_t1_possessive_adjectives',
		slug: 'eng-4ap-t1-possessive-adjectives',
		grade: '4ap',
		yearSubjectId: 800,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: العائلة والأصدقاء والجنسيات (Family and Friends)',
		order: 4,
		titleAr: 'صفات الملكية (Possessive Adjectives: my, your, his, her)',
		objectives: [
			'استعمال صفات الملكية الأربع بدقة: my (لي)، your (لك)، his (له)، her (لها)',
			'ربط كل ضمير فاعل بصفة الملكية المقابلة له (I-my, You-your, He-his, She-her)',
			'توظيف صفات الملكية في تقديم الأصدقاء وأفراد العائلة'
		],
		keywordsAr: ['صفات الملكية', 'my', 'your', 'his', 'her', 'Possessive adjectives'],
		discover: {
			scenarioAr:
				'قدّم كريم زميله وزميلته في الصف قائلاً: «My name is Karim. This is my friend Ali. His bag is blue. And this is my sister Sara. Her book is green. What is your name?».',
			svg: svgPossessivesDiscover,
			steps: [
				{
					promptAr: 'لماذا استعمل كريم كلمة «His» مع محفظة علي، وكلمة «Her» مع كتاب سارة؟',
					hintAr: 'علي ولد (مذكر)، وسارة بنت (مؤنث).',
					expectedInput: 'his for boy, her for girl',
					revealAr: 'نستعمل «his» لما يملكه المذكر (He)، ونستعمل «her» لما تملكه المؤنث (She).'
				},
				{
					promptAr: 'ما صفة الملكية التي تقابل الضمير «I» (أنا) والضمير «You» (أنت)؟',
					hintAr: 'My name / Your name.',
					expectedInput: 'my and your',
					revealAr: 'الضمير «I» تقابله «my» (ملكي)، والضمير «You» تقابله «your» (ملكك).'
				},
				{
					promptAr: 'هل تتغيّر «his» و«her» حسب الشيء المملوك أم حسب المالك (ولد أو بنت)؟',
					hintAr: 'أمّ أحمد نقول: his mother (لأن المالك أحمد ولد).',
					expectedInput: 'owner',
					revealAr: 'نختار his أو her حسب صاحب الشيء (المالك): إذا كان المالك ولداً نضع «his»، وإذا كانت المالك بنتاً نضع «her».'
				}
			]
		},
		summary: {
			rulesAr: [
				'I يقابلها «my» (لي): I am Amine. My school is clean.',
				'You يقابلها «your» (لك / لكِ): What is your favourite subject?',
				'He يقابلها «his» (له — للمالك المذكر): He is Youssef. His father is a teacher.',
				'She يقابلها «her» (لها — للمالك المؤنث): She is Meriem. Her brother is 7 years old.'
			],
			visualSvg: svgPossessivesSummary,
			visualCaptionAr: 'قاعدة اختيار my و your و his و her حسب الفاعل المالك',
			examples: [
				{
					problemAr: 'أكمل بـ (his أو her): This is Bilal. ...... bag is red. / This is Aya. ...... pen is blue.',
					solutionAr: 'This is Bilal. His bag is red. / This is Aya. Her pen is blue.'
				},
				{
					problemAr: 'أكمل بـ (my أو your): Hello! ...... name is Omar. What is ...... name?',
					solutionAr: 'Hello! My name is Omar. What is your name?'
				}
			],
			watchOutAr:
				'انتبه للفخ الشائع: نكتب «Amine loves his mother.» بـ (his) لأن المالك هو أمين (مذكر)، ونكتب «Sara loves her father.» بـ (her) لأن المالك هي سارة (مؤنث)!'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة: «This is my friend Youssef. ...... favourite subject is Maths.»',
				options: ['My', 'Her', 'His', 'Your'],
				correctIndex: 2,
				diagnosticFeedback: [
					'My تعني ملكي أنا وليس يوسف.',
					'Her للبنت، ويوسف ولد.',
					'أحسنت! يوسف مذكر فنستعمل His.',
					'Your للمخاطب (أنت).'
				],
				explanationAr: 'لأن المالك هو يوسف (He)، نختار صفة الملكية His.'
			},
			{
				questionAr: 'أكمل الجملة: «She is Khadidja. ...... school bag is green.»',
				options: ['His', 'Her', 'My', 'Your'],
				correctIndex: 1,
				diagnosticFeedback: [
					'His للمذكر، وخديجة مؤنث.',
					'ممتاز! خديجة بنت (She) فنستعمل Her.',
					'My تعني ملكي أنا.',
					'Your تعني ملكك أنت.'
				],
				explanationAr: 'مع الاسم المؤنث Khadidja (She) نستعمل Her.'
			},
			{
				questionAr: 'أكمل السؤال الموجه لصديقك: «What is ...... nationality?»',
				options: ['my', 'your', 'his', 'her'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السؤال موجّه لصديقك وليس لنفسك.',
					'صحيح! عندما نخاطب شخصاً نسأله بـ your.',
					'his تعني له (غائب).',
					'her تعني لها (غائبة).'
				],
				explanationAr: 'عند سؤال المخاطب مباشرة نستعمل صفة الملكية your.'
			},
			{
				questionAr: 'أكمل الجملة: «I am from Algeria. ...... flag is green, white and red.»',
				options: ['His', 'Her', 'My', 'Your'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الجملة تبدأ بـ I (أنا) وليس He.',
					'الجملة تتحدث عن المتكلم I وليس She.',
					'رائع! مع الضمير I نستعمل My: My flag.',
					'Your للمخاطب وليس للمتكلم.'
				],
				explanationAr: 'الضمير I تقابله صفة الملكية My.'
			}
		]
	}
];
