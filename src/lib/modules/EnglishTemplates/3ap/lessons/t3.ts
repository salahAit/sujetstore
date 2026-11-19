import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPrimaryCards,
	svgEnglishWritingStructure
} from '../../svg-english';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimester 3 (Animals & Nature, Healthy Food, Likes/Dislikes, Guided Sentences)
// ═══════════════════════════════════════════════════════════════════════════════

const svgAnimalsDiscover = svgEnglishPrimaryCards({
	title: 'Clean Animals & Nature — الحيوانات الطاهرة والطبيعة',
	subtitle: 'Animals and Plants Around Us',
	cards: [
		{ word: 'cat', arabic: 'قطة', color: '#2563eb' },
		{ word: 'bird', arabic: 'عصفور', color: '#059669' },
		{ word: 'sheep', arabic: 'خروف', color: '#d97706' },
		{ word: 'camel', arabic: 'جمل', color: '#7c3aed' },
		{ word: 'tree', arabic: 'شجرة', color: '#0284c7' }
	],
	width: 520,
	height: 185
});

const svgAnimalsSummary = svgEnglishGrammarMap({
	title: 'Animals, Nature & Singular / Plural — المفرد والجمع البسيط',
	rootLabel: 'One vs Many (Plural -s)',
	rootSub: 'Add -s to count two or more',
	branches: [
		{
			label: 'Clean Animals',
			rule: 'cat, bird, camel, horse, rabbit',
			example: 'one cat / two cats',
			color: '#1d4ed8'
		},
		{
			label: 'Nature',
			rule: 'tree, flower, sun, garden',
			example: 'three green trees',
			color: '#047857'
		},
		{
			label: 'Special Word',
			rule: 'sheep stays sheep!',
			example: 'one sheep / four sheep',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgFoodDiscover = svgEnglishPrimaryCards({
	title: 'Healthy Food & Drinks — الغذاء الصحي والمشروبات',
	subtitle: 'Good Food Keeps Us Strong',
	cards: [
		{ word: 'apple', arabic: 'تفاحة', color: '#dc2626' },
		{ word: 'dates', arabic: 'تمر', color: '#b45309' },
		{ word: 'bread', arabic: 'خبز', color: '#d97706' },
		{ word: 'milk', arabic: 'حليب', color: '#2563eb' },
		{ word: 'water', arabic: 'ماء', color: '#0284c7' }
	],
	width: 520,
	height: 185
});

const svgFoodSummary = svgEnglishGrammarMap({
	title: 'Healthy Food Groups — مجموعات الغذاء الصحي',
	rootLabel: 'Healthy Algerian Table',
	rootSub: 'Eat good food and say Bismillah',
	branches: [
		{
			label: 'Fruits',
			rule: 'apple, dates, orange, banana',
			example: 'an apple and dates',
			color: '#047857'
		},
		{
			label: 'Daily Food',
			rule: 'bread, cheese, honey, egg',
			example: 'bread with honey',
			color: '#b45309'
		},
		{
			label: 'Drinks',
			rule: 'water, milk, orange juice',
			example: 'I drink cold water.',
			color: '#1d4ed8'
		}
	],
	width: 520,
	height: 250
});

const svgLikesDiscover = svgEnglishPrimaryCards({
	title: 'Likes & Dislikes — ما أحبّه وما لا أحبّه',
	subtitle: 'I like ... / I do not like ...',
	cards: [
		{ word: 'I like', arabic: 'أنا أحبّ', color: '#059669' },
		{ word: 'I do not like', arabic: 'أنا لا أحبّ', color: '#dc2626' },
		{ word: 'Yes, I do.', arabic: 'نعم، أحبّ ذلك', color: '#2563eb' },
		{ word: 'No, I do not.', arabic: 'لا، لا أحبّ ذلك', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgLikesSummary = svgEnglishGrammarMap({
	title: 'Expressing Likes & Dislikes — التعبير عن التفضيل',
	rootLabel: 'Verb: like (يحبّ)',
	rootSub: 'Affirmative, Negative & Question',
	branches: [
		{
			label: 'Affirmative',
			rule: 'I like + food / animal',
			example: 'I like dates and milk.',
			color: '#047857'
		},
		{
			label: 'Negative',
			rule: 'I do not like + noun',
			example: 'I do not like sweets.',
			color: '#dc2626'
		},
		{
			label: 'Question',
			rule: 'Do you like ...?',
			example: 'Yes, I do. / No, I do not.',
			color: '#1d4ed8'
		}
	],
	width: 520,
	height: 250
});

const svgGuidedWritingDiscover = svgEnglishPrimaryCards({
	title: 'My ID Card — بطاقتي الشخصية البسيطة',
	subtitle: 'Read the Card and Write 3 Easy Sentences',
	cards: [
		{ word: 'Name: Youssef', arabic: 'My name is Youssef.', color: '#2563eb' },
		{ word: 'Age: 8', arabic: 'I am 8 years old.', color: '#059669' },
		{ word: 'Food: dates', arabic: 'I like dates.', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgGuidedWritingSummary = svgEnglishWritingStructure({
	title: 'How to Write 3 Guided Sentences in 3AP',
	steps: [
		{ stage: 'Greeting + Name', detail: 'Hello! My name is Amine.', color: '#1d4ed8' },
		{ stage: 'Age + School', detail: 'I am 8 years old. I am a pupil.', color: '#047857' },
		{ stage: 'Like + Full Stop', detail: 'I like apples and milk.', color: '#b45309' }
	],
	width: 520
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T3 (4 Lessons — yearSubjectId: 799)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T3: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_3ap_t3_animals_nature',
		slug: 'eng-3ap-t3-animals-nature',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: الحيوانات والطبيعة (Animals and Nature)',
		order: 1,
		titleAr: 'الحيوانات الطاهرة والطبيعة (Clean Animals and Nature)',
		objectives: [
			'حفظ أسماء حيوانات طاهرة وعناصر الطبيعة (cat, bird, sheep, camel, tree, flower)',
			'تشكيل الجمع البسيط بإضافة الحرف (s) إلى آخر الاسم المفرد (two cats, three trees)',
			'التعرف على استثناء بسيط مثل كلمة sheep التي تبقى كما هي في الجمع'
		],
		keywordsAr: ['الحيوانات', 'cat', 'bird', 'sheep', 'camel', 'tree', 'flower', 'Plural -s'],
		discover: {
			scenarioAr:
				'في زيارة جميلة إلى مزرعة الجدّ، رأت خديجة قطة بيضاء وعصافير فوق شجرة زيتون وخروفاً وجملاً، فبدأت تعدّها وتسمّيها باللغة الإنجليزية.',
			svg: svgAnimalsDiscover,
			steps: [
				{
					promptAr: 'ماذا نسمي «القطة» و«العصفور» و«الجمل» باللغة الإنجليزية؟',
					hintAr: 'cat — bird — camel.',
					expectedInput: 'cat, bird, camel',
					revealAr: 'القطة «cat»، والعصفور «bird»، والجمل «camel»، والخروف «sheep»، والحصان «horse».'
				},
				{
					promptAr: 'كيف نحول كلمة «bird» (عصفور واحد) إلى الجمع «ثلاثة عصافير»؟',
					hintAr: 'نضيف حرف s في نهاية الكلمة.',
					expectedInput: 'three birds',
					revealAr: 'نضيف الحرف «s» في آخر الاسم فنقول: «three birds»، ومثلها «two cats» و«four trees».'
				},
				{
					promptAr: 'ماذا نسمي «الشجرة» و«الزهرة» في الطبيعة بالإنجليزية؟',
					hintAr: 'الشجرة: tree، والزهرة: flower.',
					expectedInput: 'tree and flower',
					revealAr: 'الشجرة «tree» والزهرة «flower»، ونحافظ على الطبيعة والحيوانات لأن الإسلام يأمرنا بالرفق بها.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حيوانات طاهرة وجميلة: cat (قطة), bird (عصفور), sheep (خروف), camel (جمل), horse (حصان), rabbit (أرنب).',
				'عناصر الطبيعة: tree (شجرة), flower (زهرة), sun (شمس), garden (حديقة).',
				'قاعدة الجمع البسيط: نضيف «s» في آخر الاسم المفرد عند وجود اثنين فأكثر: one cat / two cats، one tree / five trees.',
				'ملاحظة: كلمة «sheep» (خروف) لا نضيف لها s في الجمع: one sheep / three sheep.'
			],
			visualSvg: svgAnimalsSummary,
			visualCaptionAr: 'أسماء الحيوانات وعناصر الطبيعة وقاعدة الجمع بإضافة s',
			examples: [
				{
					problemAr: 'اكتب الجمع الصحيح: one camel / three ...... — one flower / five ......',
					solutionAr: 'three camels — five flowers.'
				},
				{
					problemAr: 'اختر الكلمة الدخيلة (Odd one out): (cat — bird — pen — camel)',
					solutionAr: 'الكلمة الدخيلة هي «pen» لأنها أداة مدرسية وليست حيواناً.'
				}
			],
			watchOutAr:
				'انتبه عند الجمع: نكتب «two birds» بإضافة s، ولا نكتب أداة النكرة «a» مع الجمع أبداً (لا نقول a two birds)!'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «camel» باللغة العربية؟',
				options: ['أرنب', 'جمل', 'عصفور', 'زهرة'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأرنب هو rabbit.',
					'أحسنت! camel تعني الجمل وهو حيوان صحراوي أصيل.',
					'العصفور هو bird.',
					'الزهرة هي flower.'
				],
				explanationAr: 'كلمة camel تعني الجمل، ويُعرف بسفينة الصحراء.'
			},
			{
				questionAr: 'اختر الجمع الصحيح لكلمة «tree» عند الحديث عن أربع أشجار:',
				options: ['four tree', 'four trees', 'a four trees', 'tree four'],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب إضافة s في الجمع.',
					'ممتاز! نضع العدد ثم الاسم مضافاً إليه s: four trees.',
					'لا نستعمل a مع الجمع.',
					'العدد يأتي قبل الاسم في الإنجليزية.'
				],
				explanationAr: 'في الجمع نضيف s إلى آخر الاسم: four trees.'
			},
			{
				questionAr: 'أيّ كلمة تدلّ على عنصر من عناصر الطبيعة وليس حيواناً؟',
				options: ['sheep', 'bird', 'flower', 'cat'],
				correctIndex: 2,
				diagnosticFeedback: [
					'sheep حيوان (خروف).',
					'bird حيوان (عصفور).',
					'صحيح! flower تعني زهرة وهي من النباتات والطبيعة.',
					'cat حيوان (قطة).'
				],
				explanationAr: 'flower تعني زهرة، أما sheep و bird و cat فحيوانات.'
			},
			{
				questionAr: 'أكمل الجملة: «The ...... is white and small.» (القطة)',
				options: ['cat', 'tree', 'desk', 'ruler'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! cat تعني قطة.',
					'tree تعني شجرة.',
					'desk تعني طاولة.',
					'ruler تعني مسطرة.'
				],
				explanationAr: 'كلمة قطة باللغة الإنجليزية هي cat.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t3_healthy_food',
		slug: 'eng-3ap-t3-healthy-food',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الغذاء الصحي (Healthy Food)',
		order: 2,
		titleAr: 'الغذاء الصحي والمشروبات (Healthy Food and Drinks)',
		objectives: [
			'حفظ أسماء الأطعمة والمشروبات الصحية بالإنجليزية (apple, dates, bread, milk, water, honey)',
			'التمييز بين الطعام (Food) والشراب (Drinks)',
			'توظيف كلمات الغذاء الصحي في جمل قصيرة ومفيدة (I eat..., I drink...)'
		],
		keywordsAr: ['الغذاء الصحي', 'apple', 'dates', 'bread', 'milk', 'water', 'honey', 'Healthy food'],
		discover: {
			scenarioAr:
				'جهّزت الأم فطوراً صحياً لأبنائها قبل المدرسة: تمراً جزائرياً (dates)، وحليباً دافئاً (milk)، وخبزاً (bread)، وتفاحة حمراء (an apple)، وكأس ماء نقي (water).',
			svg: svgFoodDiscover,
			steps: [
				{
					promptAr: 'ما اسم «التمر» و«التفاحة» باللغة الإنجليزية؟',
					hintAr: 'التمر: dates، والتفاحة: apple.',
					expectedInput: 'dates and apple',
					revealAr: 'التمر «dates» والتفاحة «apple»، وهما من أطيب الثمار الصحية.'
				},
				{
					promptAr: 'ما اسم «الحليب» و«الماء» اللذين نشربهما كل يوم؟',
					hintAr: 'الحليب: milk، والماء: water.',
					expectedInput: 'milk and water',
					revealAr: 'الحليب «milk» والماء «water»، وهما من المشروبات (Drinks).'
				},
				{
					promptAr: 'ما الفعل الذي نستعمله مع الطعام وما الفعل الذي نستعمله مع الشراب؟',
					hintAr: 'أكل: eat، وشرب: drink.',
					expectedInput: 'eat and drink',
					revealAr: 'نقول «I eat bread and dates.» (آكل الخبز والتمر) و«I drink milk and water.» (أشرب الحليب والماء).'
				}
			]
		},
		summary: {
			rulesAr: [
				'فواكه صحية (Fruits): apple (تفاحة), dates (تمر), orange (برتقالة), banana (موزة).',
				'أطعمة يومية (Food): bread (خبز), cheese (جبن), honey (عسل), egg (بيضة).',
				'مشروبات نافعة (Drinks): water (ماء), milk (حليب), juice (عصير).',
				'نقول قبل الأكل «بسم الله»، ونعبّر بالإنجليزية بـ: «I eat healthy food.» و«I drink clean water.».'
			],
			visualSvg: svgFoodSummary,
			visualCaptionAr: 'تصنيف الأطعمة الصحية والمشروبات على مائدة التلميذ',
			examples: [
				{
					problemAr: 'صنّف الكلمات الآتية إلى Food (طعام) و Drinks (مشروبات): (bread — water — dates — milk)',
					solutionAr: 'Food: bread, dates.\nDrinks: water, milk.'
				},
				{
					problemAr: 'أكمل بالفعل المناسب (eat أو drink): I ...... an apple. / I ...... milk.',
					solutionAr: 'I eat an apple. / I drink milk.'
				}
			],
			watchOutAr:
				'تذكّر: مع apple و orange نستعمل أداة النكرة «an» لأنها تبدأ بحرف متحرك: «an apple», «an orange»!'
		},
		practice: [
			{
				questionAr: 'ما معنى كلمة «dates» باللغة العربية؟',
				options: ['خبز', 'تمر', 'جبن', 'عسل'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخبز هو bread.',
					'أحسنت! dates تعني التمر وهو غذاء صحي مبارك.',
					'الجبن هو cheese.',
					'العسل هو honey.'
				],
				explanationAr: 'كلمة dates تعني التمر الذي تشتهر به صحراء الجزائر.'
			},
			{
				questionAr: 'أيّ كلمة تنتمي إلى المشروبات (Drinks)؟',
				options: ['bread', 'apple', 'milk', 'cheese'],
				correctIndex: 2,
				diagnosticFeedback: [
					'bread طعام نأكله (الخبز).',
					'apple فاكهة نأكلها (التفاحة).',
					'ممتاز! milk (الحليب) من المشروبات الصحية.',
					'cheese طعام نأكله (الجبن).'
				],
				explanationAr: 'الحليب (milk) والماء (water) من المشروبات (Drinks).'
			},
			{
				questionAr: 'أكمل الجملة بالفعل الصحيح: «I ...... clean water every morning.»',
				options: ['eat', 'drink', 'am', 'is'],
				correctIndex: 1,
				diagnosticFeedback: [
					'eat تعني يأكل، والماء يُشرب.',
					'صحيح! drink تعني يشرب: I drink clean water.',
					'am تعني أكون ولا تناسب المعنى.',
					'is لا تناسب الضمير I ولا المعنى.'
				],
				explanationAr: 'مع الماء والحليب نستعمل الفعل drink (يشرب).'
			},
			{
				questionAr: 'اختر العبارة الصحيحة لغوياً:',
				options: ['a apple', 'an apple', 'an bread', 'an milk'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة apple تبدأ بحرف متحرك a، لذا تحتاج an.',
					'أحسنت! «an apple» صحيحة لأن apple تبدأ بحرف متحرك.',
					'bread تبدأ بحرف ساكن ولا تُعدّ مفرداً هكذا.',
					'milk تبدأ بحرف ساكن وهو سائل لا يأخذ an.'
				],
				explanationAr: 'نستعمل an قبل الكلمة المفردة المعدودة التي تبدأ بحرف متحرك: an apple.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t3_likes_dislikes',
		slug: 'eng-3ap-t3-likes-dislikes',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الغذاء الصحي (Healthy Food)',
		order: 3,
		titleAr: 'التعبير عن التفضيل (I like / I do not like)',
		objectives: [
			'التعبير عما يحبه التلميذ باستعمال: I like...',
			'التعبير عما لا يحبه التلميذ باستعمال: I do not like...',
			'طرح السؤال «Do you like...?» والإجابة القصيرة بـ «Yes, I do.» أو «No, I do not.»'
		],
		keywordsAr: ['I like', 'I do not like', 'Do you like', 'Yes, I do', 'No, I do not'],
		discover: {
			scenarioAr:
				'في استراحة المدرسة، سأل آدم صديقه عمر: «Do you like dates?» (هل تحب التمر؟) فابتسم عمر وقال: «Yes, I do. I like dates and apples, but I do not like sweets.».',
			svg: svgLikesDiscover,
			steps: [
				{
					promptAr: 'كيف تعبّر بالإنجليزية عن أنك تحبّ الحليب؟',
					hintAr: 'ابدأ بـ I like ثم أضف milk.',
					expectedInput: 'I like milk',
					revealAr: 'نقول: «I like milk.» ومعناها: أنا أحب الحليب.'
				},
				{
					promptAr: 'كيف ننفي الجملة لنقول «أنا لا أحبّ الحلوى»؟',
					hintAr: 'نضع «do not» قبل كلمة like.',
					expectedInput: 'I do not like sweets',
					revealAr: 'نقول: «I do not like sweets.» بإضافة «do not» بين I و like.'
				},
				{
					promptAr: 'إذا سألك صديقك: «Do you like apples?» كيف تجيب بـ «نعم» إجابة قصيرة؟',
					hintAr: 'Yes, I ...',
					expectedInput: 'Yes, I do',
					revealAr: 'نجيب بـ «Yes, I do.» للموافقة، وبـ «No, I do not.» للرفض.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعبير عن المحبة والتفضيل: «I like + الاسم.» مثل: «I like dates and honey.».',
				'للتعبير عن عدم التفضيل (النفي): «I do not like + الاسم.» مثل: «I do not like soda.».',
				'للسؤال عن تفضيل الصديق: «Do you like + الاسم؟» مثل: «Do you like bananas?».',
				'الإجابة القصيرة: «Yes, I do.» (نعم) أو «No, I do not.» (لا).'
			],
			visualSvg: svgLikesSummary,
			visualCaptionAr: 'صيغ الإثبات والنفي والسؤال مع الفعل like',
			examples: [
				{
					problemAr: 'حوّل إلى النفي: «I like candy.»',
					solutionAr: '«I do not like candy.».'
				},
				{
					problemAr: 'أجب عن السؤال: «Do you like milk?» (بنعم).',
					solutionAr: '«Yes, I do.».'
				}
			],
			watchOutAr:
				'لا تنسَ كلمة «do» في النفي والسؤال! لا نقول «I no like» بل نقول دائماً: «I do not like».'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة التي تعني «أنا أحبّ التفاح»:',
				options: ['I am apples.', 'I like apples.', 'I do apples.', 'My like apples.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'I am apples تعني أنا تفاح وهذا خطأ!',
					'أحسنت! I like apples تعني أنا أحب التفاح.',
					'ناقص كلمة like في الجملة.',
					'نستعمل الضمير I وليس My قبل الفعل.'
				],
				explanationAr: 'للتعبير عما نحبه نكتب: I like + الاسم.'
			},
			{
				questionAr: 'ما الصيغة الصحيحة لنفي الجملة «I like soda.»؟',
				options: ['I no like soda.', 'I not like soda.', 'I do not like soda.', 'I is not like soda.'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نستعمل no قبل الفعل like.',
					'ينقص الفعل المساعد do قبل not.',
					'ممتاز! النفي الصحيح هو: I do not like soda.',
					'لا نستعمل is مع I أو الفعل like.'
				],
				explanationAr: 'نفي الفعل like مع الضمير I يكون دائماً بـ do not like.'
			},
			{
				questionAr: 'أكمل السؤال: «...... you like honey?»',
				options: ['Am', 'Is', 'Do', 'My'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Am تأتي مع I فقط.',
					'Is لا تأتي مع you والفعل like.',
					'صحيح! نبدأ السؤال بـ Do: Do you like honey?',
					'My ليست أداة استفهام.'
				],
				explanationAr: 'لطرح سؤال حول التفضيل نقول: Do you like ...?'
			},
			{
				questionAr: 'اختر الإجابة القصيرة الصحيحة للسؤال: «Do you like dates?»',
				options: ['Yes, I am.', 'Yes, I do.', 'Yes, it is.', 'Yes, my name.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السؤال بدأ بـ Do وليس بـ Are.',
					'أحسنت! السؤال يبدأ بـ Do فتكون الإجابة القصيرة: Yes, I do.',
					'It is ليست إجابة عن you.',
					'هذه ليست إجابة صحيحة عن السؤال.'
				],
				explanationAr: 'عندما يبدأ السؤال بـ Do you، نجيب بـ Yes, I do. أو No, I do not.'
			}
		]
	},
	{
		id: 'eng_lesson_3ap_t3_guided_sentences',
		slug: 'eng-3ap-t3-guided-sentences',
		grade: '3ap',
		yearSubjectId: 799,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المقطع الخامس: الغذاء الصحي والتعبير الموجّه (Guided Sentences)',
		order: 4,
		titleAr: 'كتابة جمل بسيطة موجّهة وبطاقة التعريف (ID Card and Guided Sentences)',
		objectives: [
			'ملء بطاقة تعريف بسيطة (ID Card: Name, Age, School, Favourite food)',
			'تحويل معلومات البطاقة إلى ثلاث جمل إنجليزية صحيحة ومترابطة',
			'احترام علامات الوقف الأساسية: الحرف الكبير في البداية والنقطة (.) في النهاية'
		],
		keywordsAr: ['ID card', 'Guided writing', 'Capital letter', 'Full stop', 'My name is', 'I like'],
		discover: {
			scenarioAr:
				'في نهاية السنة الثالثة ابتدائي، طلب الأستاذ من التلاميذ ملء بطاقة صغيرة (ID Card) ثم كتابة ثلاث جمل جميلة تعرّف بكل تلميذ وبما يحبه من الغذاء الصحي.',
			svg: svgGuidedWritingDiscover,
			steps: [
				{
					promptAr: 'إذا كان في البطاقة «Name: Fatima»، كيف نكتب الجملة الأولى؟',
					hintAr: 'ابدأ بـ Hello! ثم My name is ...',
					expectedInput: 'Hello! My name is Fatima.',
					revealAr: 'نكتب: «Hello! My name is Fatima.» ونضع نقطة (.) في نهاية الجملة.'
				},
				{
					promptAr: 'إذا كان في البطاقة «Age: 8»، كيف نكتب الجملة الثانية؟',
					hintAr: 'تذكّر قاعدة العمر: I am ... years old.',
					expectedInput: 'I am 8 years old.',
					revealAr: 'نكتب: «I am 8 years old.» بحرف I كبير ونقطة في النهاية.'
				},
				{
					promptAr: 'إذا كان في البطاقة «Like: dates and milk»، كيف نكتب الجملة الثالثة؟',
					hintAr: 'نستعمل I like ...',
					expectedInput: 'I like dates and milk.',
					revealAr: 'نكتب: «I like dates and milk.» وهكذا نكون كتبنا أول فقرة إنجليزية ناجحة!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الإنجليزية البسيطة تبدأ دائماً بالفاعل ثم الفعل ثم التكملة: Subject + Verb + Object (مثل: I like apples.).',
				'كل جملة تبدأ بحرف كبير (Capital letter) وتنتهي بنقطة (.) في الجملة الخبرية أو علامة استفهام (?) في السؤال.',
				'للربط بين شيئين نحبهما نستعمل كلمة «and» (و): «I like bread and honey.».',
				'للكتابة من بطاقة (ID Card): 1) الاسم (My name is...)، 2) العمر (I am 8 years old.)، 3) الغذاء أو الحيوان المفضل (I like...).'
			],
			visualSvg: svgGuidedWritingSummary,
			visualCaptionAr: 'مخطط كتابة ثلاث جمل موجّهة من بطاقة التعريف',
			examples: [
				{
					problemAr: 'رتّب الكلمات لتكوّن جملة صحيحة: (milk / like / I / dates / and / .)',
					solutionAr: '«I like milk and dates.» (أو «I like dates and milk.»).'
				},
				{
					problemAr: 'حوّل البطاقة إلى فقرة من 3 جمل: (Name: Bilal — Age: 8 — Like: apples)',
					solutionAr: 'Hello! My name is Bilal. I am 8 years old. I like apples.'
				}
			],
			watchOutAr:
				'بعد إنهاء كتابة الجمل الثلاث، راجع شيئين مهمين: هل بدأت كل جملة بحرف كبير؟ وهل وضعت نقطة (.) في آخر كل جملة؟'
		},
		practice: [
			{
				questionAr: 'اختر الترتيب الصحيح للكلمات: (Amine / name / is / My / .)',
				options: ['Name my is Amine.', 'My name is Amine.', 'Amine is name my.', 'Is my name Amine.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نبدأ بـ My قبل name.',
					'أحسنت! الترتيب الصحيح: My name is Amine.',
					'الترتيب غير صحيح؛ نبدأ بـ My name.',
					'البدء بـ Is يحوّلها لسؤال وليس جملة تعريف.'
				],
				explanationAr: 'جملة التعريف الصحيحة تبدأ بـ My name is ثم الاسم.'
			},
			{
				questionAr: 'ما الكلمة المناسبة للربط بين «apples» و«bananas»؟',
				options: ['is', 'and', 'am', 'who'],
				correctIndex: 1,
				diagnosticFeedback: [
					'is فعل كينونة وليس أداة ربط.',
					'ممتاز! and تعني (و) وتربط بين كلمتين.',
					'am فعل كينونة مع I.',
					'who أداة سؤال.'
				],
				explanationAr: 'أداة الربط «and» تجمع بين شيئين: apples and bananas.'
			},
			{
				questionAr: 'أيّ جملة مكتوبة بترقيم وحروف كبيرة صحيحة 100 بالمئة؟',
				options: ['i like bread and honey', 'I like bread and honey.', 'I like bread and honey?', 'i Like bread and honey.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها الحرف الكبير I والنقطة في الأخير.',
					'رائع! تبدأ بحرف كبير I وتنتهي بنقطة (.).',
					'هذه جملة خبرية فلا نضع علامة استفهام.',
					'الضمير I يجب أن يكون كبيراً وكلمة like صغيرة.'
				],
				explanationAr: 'الجملة الخبرية تبدأ بحرف كبير وتنتهي بنقطة (.).'
			},
			{
				questionAr: 'إذا كانت بطاقة تلميذة تقول (Name: Ines / Age: 8)، فأيّ فقرة تطابق البطاقة؟',
				options: [
					'My name is Ines. I am 8 years old.',
					'My name is 8. I am Ines years old.',
					'Hello! She is a book.',
					'I am a pen. My name is red.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الفقرة صحيحة ومطابقة تماماً للبطاقة.',
					'وقع خلط بين الاسم والعمر.',
					'هذه الجملة لا علاقة لها بالبطاقة.',
					'هذه جملة غير منطقية.'
				],
				explanationAr: 'نضع الاسم بعد My name is والعمر بعد I am ... years old.'
			}
		]
	}
];
