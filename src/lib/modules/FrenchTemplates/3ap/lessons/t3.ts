import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimestre 3 (Projet 3 : À la campagne / Protéger la nature)
// ═══════════════════════════════════════════════════════════════════════════════

const svgFruitsSaisonsDiscover = svgFrenchPrimaryCards({
	title: 'Les 4 saisons et les fruits — الفصول الأربعة والفواكه',
	subtitle: 'À la campagne, la nature change à chaque saison',
	cards: [
		{ word: 'le printemps', arabic: 'الربيع', color: '#059669' },
		{ word: "l'été", arabic: 'الصيف', color: '#d97706' },
		{ word: "l'automne", arabic: 'الخريف', color: '#b45309' },
		{ word: "l'hiver", arabic: 'الشتاء', color: '#2563eb' }
	],
	width: 520,
	height: 185
});

const svgFruitsSaisonsSummary = svgFrenchGrammarMap({
	title: 'Fruits, légumes et saisons — الفواكه والخضر والفصول',
	rootLabel: 'Les bienfaits de la nature',
	rootSub: 'Vocabulaire du Projet 3 (3AP)',
	branches: [
		{
			label: 'Les fruits',
			rule: 'pomme, orange, datte',
			example: 'Je mange une pomme.',
			color: '#1d4ed8'
		},
		{
			label: 'Les légumes',
			rule: 'carotte, tomate, laitue',
			example: 'La carotte est orange.',
			color: '#047857'
		},
		{
			label: 'Les 4 saisons',
			rule: 'printemps, été, automne, hiver',
			example: 'En hiver, il pleut.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgSonsT3Discover = svgFrenchPrimaryCards({
	title: 'Les sons : an/en, in, eau/au — أصوات الفصل الثالث',
	subtitle: 'Des lettres différentes peuvent faire le même son !',
	cards: [
		{ word: 'an / en', arabic: 'orange - enfant', color: '#2563eb' },
		{ word: 'in', arabic: 'jardin - lapin', color: '#059669' },
		{ word: 'eau', arabic: 'oiseau - gâteau', color: '#d97706' },
		{ word: 'au', arabic: 'automne - jaune', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgSonsT3Summary = svgFrenchConjugationChart({
	title: 'Bien lire : an/en — in — eau/au',
	subtitle: 'Trois grands sons de lecture en 3AP',
	columns: [
		{
			header: 'an / en',
			rule: 'Même son nasal',
			examples: 'orange, maman, vent',
			color: '#1d4ed8'
		},
		{
			header: 'in',
			rule: 'Son nasal «in»',
			examples: 'jardin, lapin, raisin',
			color: '#047857'
		},
		{
			header: 'eau / au',
			rule: 'Se lisent «o»',
			examples: 'eau, oiseau, jaune',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgPlurielVerbesDiscover = svgFrenchPrimaryCards({
	title: 'Le pluriel (-s) et le 1er groupe — الجمع وأفعال الفوج الأول',
	subtitle: 'Singulier (1) -> Pluriel (2 ou plus)',
	cards: [
		{ word: 'une pomme', arabic: 'des pommes', color: '#2563eb' },
		{ word: 'un arbre', arabic: 'des arbres', color: '#059669' },
		{ word: 'je plante', arabic: 'أنا أغرس', color: '#d97706' },
		{ word: 'il mange', arabic: 'هو يأكل', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgPlurielVerbesSummary = svgFrenchConjugationChart({
	title: 'Pluriel avec -s et Verbes en -er au présent',
	subtitle: 'Exemples : aimer, manger, planter',
	columns: [
		{
			header: 'Pluriel (-s)',
			rule: 'un/une -> des | le/la -> les',
			examples: 'les fleurs, des fruits',
			color: '#1d4ed8'
		},
		{
			header: 'Singulier (-er)',
			rule: 'je -e | tu -es | il/elle -e',
			examples: 'Je plante, il mange',
			color: '#047857'
		},
		{
			header: 'Pluriel (-er)',
			rule: 'nous -ons | vous -ez | ils -ent',
			examples: 'Nous aimons, ils plantent',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgPhraseDiscover = svgFrenchWritingBlueprint({
	title: 'Construire une phrase simple — بناء الجملة البسيطة',
	steps: [
		{ stage: 'Majuscule', detail: 'La phrase commence toujours par une lettre majuscule.', color: '#1d4ed8' },
		{ stage: 'Sujet + Verbe', detail: 'Qui fait l’action ? Que fait-il ? (Amine plante...)', color: '#047857' },
		{ stage: 'Sens complet', detail: 'Les mots sont dans le bon ordre (...un petit arbre).', color: '#b45309' },
		{ stage: 'Point final', detail: 'La phrase se termine par un point ( . ).', color: '#7c3aed' }
	],
	width: 520
});

const svgPhraseSummary = svgFrenchGrammarMap({
	title: 'Les 3 secrets de la phrase simple — أسرار الجملة البسيطة',
	rootLabel: 'Amine plante un arbre.',
	rootSub: 'Majuscule + Sens + Point',
	branches: [
		{
			label: '1. Majuscule',
			rule: 'Au début de la phrase',
			example: 'Amine / Le / La',
			color: '#1d4ed8'
		},
		{
			label: '2. Bon ordre',
			rule: 'Sujet + Verbe + Objet',
			example: 'Amine + plante + un arbre',
			color: '#047857'
		},
		{
			label: '3. Point (.)',
			rule: 'À la fin de la phrase',
			example: '... un arbre.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T3 (4 Lessons — yearSubjectId: 592)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T3: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_3ap_t3_fruits_saisons',
		slug: 'fre-3ap-t3-fruits-saisons',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: في الريف وحماية الطبيعة (Projet 3 : À la campagne)',
		order: 1,
		titleAr: 'الفواكه والخضر والفصول الأربعة (Les fruits, les légumes et les saisons)',
		objectives: [
			'التمييز بين أسماء الفواكه (pomme, orange, datte, raisin) وأسماء الخضر (carotte, tomate, pomme de terre)',
			'حفظ أسماء الفصول الأربعة بالفرنسية (le printemps, l’été, l’automne, l’hiver)',
			'ربط كل فصل بمظهره الطبيعي (الزهور في الربيع، الشمس في الصيف، المطر في الشتاء)'
		],
		keywordsAr: ['Les fruits', 'Les légumes', 'Le printemps', "L'été", "L'automne", "L'hiver"],
		discover: {
			scenarioAr:
				'في بستان الجدّ ببسكرة والجزائر، قطفت آية تمراً حلواً وتفاحاً وبرتقالاً، وجلبت خضراً طازجة للغداء مثل الجزر والطماطم. قال لها الجدّ: «الله يرزقنا فواكه وخضراً لذيذة في كل فصل من الفصول الأربعة».',
			svg: svgFruitsSaisonsDiscover,
			steps: [
				{
					promptAr: 'صنّف الكلمتين الآتيتين: هل «la carotte» فاكهة أم خضار؟ وهل «la datte» فاكهة أم خضار؟',
					hintAr: 'carotte = جزر، datte = تمر.',
					expectedInput: 'légume / fruit',
					revealAr: '«la carotte» (الجزر) من الخضر (un légume)، و«la datte» (التمر) من الفواكه (un fruit).'
				},
				{
					promptAr: 'ما اسم فصل «الربيع» الذي تتفتح فيه الأزهار بالفرنسية؟',
					hintAr: 'يبدأ بـ le prin...',
					expectedInput: 'le printemps',
					revealAr: 'الربيع هو «le printemps»، وفيه تزهر الأشجار وتخضرّ الحقول.'
				},
				{
					promptAr: 'ما الفصلان الحارّ والبارد من الفصول الأربعة؟',
					hintAr: 'الصيف: l’été، والشتاء: l’hiver.',
					expectedInput: "l'été et l'hiver",
					revealAr: 'في الصيف «l’été» يكون الجو حاراً (il fait chaud)، وفي الشتاء «l’hiver» يكون الجو بارداً (il fait froid) ويسقط المطر.'
				}
			]
		},
		summary: {
			rulesAr: [
				'من الفواكه (les fruits): la pomme (التفاحة)، l’orange (البرتقالة)، la banane (الموزة)، la datte (التمرة)، le raisin (العنب)، la fraise (الفراولة).',
				'من الخضر (les légumes): la carotte (الجزر)، la tomate (الطماطم)، la pomme de terre (البطاطا)، la laitue (الخس).',
				'الفصول الأربعة (les quatre saisons): le printemps (الربيع)، l’été (الصيف)، l’automne (الخريف)، l’hiver (الشتاء).',
				'نقول قبل الفصول: au printemps (في الربيع)، en été (في الصيف)، en automne (في الخريف)، en hiver (في الشتاء).'
			],
			visualSvg: svgFruitsSaisonsSummary,
			visualCaptionAr: 'تصنيف الفواكه والخضر والفصول الأربعة للسنة الثالثة ابتدائي',
			examples: [
				{
					problemAr: 'صنّف الكلمات في جدول (Fruits / Légumes) : orange — tomate — pomme — carotte',
					solutionAr: 'Fruits : orange, pomme.\nLégumes : tomate, carotte.'
				},
				{
					problemAr: 'أكمل باسم الفصل المناسب: Les fleurs poussent au ........ — Il neige en ........',
					solutionAr: 'Les fleurs poussent au printemps. — Il neige en hiver.'
				}
			],
			watchOutAr:
				'انتبه! كلمة «la pomme» تعني التفاحة (فاكهة)، أما «la pomme de terre» فتعني البطاطا وهي من الخضر!'
		},
		practice: [
			{
				questionAr: 'أيّ كلمة من الكلمات الآتية هي اسم خضار (un légume)؟',
				options: ['la banane', 'la datte', 'la carotte', 'la fraise'],
				correctIndex: 2,
				diagnosticFeedback: [
					'la banane (الموز) فاكهة.',
					'la datte (التمر) فاكهة.',
					'أحسنت! la carotte (الجزر) من الخضر.',
					'la fraise (الفراولة) فاكهة.'
				],
				explanationAr: 'الجزر (la carotte) من الخضر (les légumes).'
			},
			{
				questionAr: 'ما اسم فصل «الشتاء» باللغة الفرنسية؟',
				options: ['le printemps', "l'été", "l'automne", "l'hiver"],
				correctIndex: 3,
				diagnosticFeedback: [
					'le printemps هو فصل الربيع.',
					"l'été هو فصل الصيف.",
					"l'automne هو فصل الخريف.",
					"ممتاز! «l'hiver» هو فصل الشتاء."
				],
				explanationAr: "فصل الشتاء بالفرنسية هو «l'hiver» (الحرف h صامت لا يُنطق)."
			},
			{
				questionAr: 'في أيّ فصل تتفتح الأزهار وتخضرّ الطبيعة؟',
				options: ['en hiver', 'au printemps', 'en été', 'en automne'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في الشتاء يكون البرد والمطر.',
					'رائع! في فصل الربيع (au printemps) تتفتح الأزهار.',
					'في الصيف يكون الجو حاراً.',
					'في الخريف تتساقط أوراق الأشجار.'
				],
				explanationAr: 'فصل الأزهار والطبيعة الخضراء هو الربيع (le printemps).'
			},
			{
				questionAr: 'ما معنى «la pomme de terre» باللغة العربية؟',
				options: ['التفاحة الحمراء', 'البطاطا', 'الطماطم', 'العنب'],
				correctIndex: 1,
				diagnosticFeedback: [
					'التفاحة هي la pomme فقط.',
					'أحسنت! la pomme de terre تعني البطاطا.',
					'الطماطم هي la tomate.',
					'العنب هو le raisin.'
				],
				explanationAr: '«la pomme de terre» تعني البطاطا وهي من الخضر.'
			},
			{
				questionAr: 'أيّ كلمة لا تنتمي إلى الفواكه (les fruits)؟',
				options: ["l'orange", 'le raisin', 'la tomate', 'la pomme'],
				correctIndex: 2,
				diagnosticFeedback: [
					"l'orange (البرتقالة) فاكهة.",
					'le raisin (العنب) فاكهة.',
					'ممتاز! la tomate (الطماطم) تُصنّف مع الخضر في المطبخ والكتاب المدرسي.',
					'la pomme (التفاحة) فاكهة.'
				],
				explanationAr: 'البرتقال والعنب والتفاح فواكه، أما الطماطم (la tomate) فخضار.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t3_sons_nasaux',
		slug: 'fre-3ap-t3-sons-nasaux',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: في الريف وحماية الطبيعة (Projet 3 : À la campagne)',
		order: 2,
		titleAr: 'الأصوات المركّبة: an/en و in و eau/au (Les sons : an/en, in, eau/au)',
		objectives: [
			'تمييز ونطق الصوت «an / en» في الكلمات (orange, maman, enfant, vent)',
			'تمييز ونطق الصوت «in» في الكلمات (jardin, lapin, matin, raisin)',
			'إدراك أن المقطعين «eau» و«au» يُنطقان «o» مثل: eau, oiseau, gâteau, jaune, automne'
		],
		keywordsAr: ['an / en', 'in', 'eau / au', 'orange / enfant', 'jardin / lapin', 'oiseau / jaune'],
		discover: {
			scenarioAr:
				'قرأ سامي جملة جميلة عن الحديقة: «Le matin, un oiseau jaune chante dans le jardin près d’un oranger.» فلاحظ وجود أصوات جديدة مميّزة هي: in و eau و au و an!',
			svg: svgSonsT3Discover,
			steps: [
				{
					promptAr: 'ما الصوت المشترك في النطق بين كلمتي «orange» و«enfant»؟',
					hintAr: 'في الأولى an وفي الثانية en، ولهما النطق نفسه.',
					expectedInput: 'an / en',
					revealAr: 'المقطعان «an» و«en» لهما النطق الأنفي نفسه في كلمات مثل: orange, maman, enfant, vent, planter.'
				},
				{
					promptAr: 'ما الصوت الموجود في نهاية الكلمات: «jardin» (حديقة) و«lapin» (أرنب) و«raisin» (عنب)؟',
					hintAr: 'حرف i متبوع بحرف n.',
					expectedInput: 'in',
					revealAr: 'الصوت هو «in» ونجده في: jardin, lapin, matin, sapin, raisin.'
				},
				{
					promptAr: 'كيف ننطق «eau» في كلمة «oiseau» و«au» في كلمة «jaune» (أصفر)؟',
					hintAr: 'كلاهما يُنطق مثل الحرف المتحرك o.',
					expectedInput: 'o',
					revealAr: 'المقطع «eau» (ماء: eau، عصفور: oiseau، كعكة: gâteau) والمقطع «au» (أصفر: jaune، خريف: automne) يُنطقان «o»!'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصوت «an / en»: يُكتب an (مثل: maman, orange, planter, manger) أو en (مثل: enfant, vent, dent) ويُنطق بالصوت نفسه.',
				'الصوت «in»: يُكتب i + n مثل: jardin (حديقة)، lapin (أرنب)، matin (صباح)، raisin (عنب)، chemin (طريق).',
				'الصوت «eau / au»: كلاهما يُنطق «o» مثل: eau (ماء)، oiseau (عصفور)، gâteau (حلوى)، bateau (سفينة)، jaune (أصفر)، automne (خريف).',
				'عند القراءة نجمع الحروف المركّبة في صوت واحد ولا ننطق كل حرف على حدة.'
			],
			visualSvg: svgSonsT3Summary,
			visualCaptionAr: 'الأصوات الثلاثة الكبرى في الفصل الثالث (an/en — in — eau/au)',
			examples: [
				{
					problemAr: 'صنّف الكلمات حسب الصوت (an/en — in — eau/au) : lapin — gâteau — enfant — jaune',
					solutionAr: 'an/en : enfant — in : lapin — eau/au : gâteau, jaune.'
				},
				{
					problemAr: 'أكمل بالصوت المناسب (in / eau / an) : un jard.... — un ois.... — une or....ge',
					solutionAr: 'un jardin — un oiseau — une orange.'
				}
			],
			watchOutAr:
				'احذر! في كلمة «banane» لا نسمع الصوت الأنفي «an»، لأن بعد حرف n يوجد حرف متحرك (e) فتُنطق ba-na-ne!'
		},
		practice: [
			{
				questionAr: 'ما الصوت المركّب في نهاية كلمة «jardin» (حديقة)؟',
				options: ['an', 'en', 'in', 'eau'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يوجد an في كلمة jardin.',
					'لا يوجد en في كلمة jardin.',
					'أحسنت! كلمة «jardin» تنتهي بالصوت «in».',
					'لا يوجد eau في كلمة jardin.'
				],
				explanationAr: 'كلمة «jardin» تنتهي بالحرفين i + n = in مثل lapin و raisin.'
			},
			{
				questionAr: 'أيّ كلمة تحتوي على الصوت «eau» الذي يُنطق «o»؟',
				options: ['vent', 'oiseau', 'matin', 'orange'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة vent تحتوي على الصوت en.',
					'ممتاز! كلمة «oiseau» تنتهي بالمقطع eau الذي يُنطق o.',
					'كلمة matin تنتهي بالصوت in.',
					'كلمة orange تحتوي على الصوت an.'
				],
				explanationAr: 'في كلمة «oiseau» نجد المقطع «eau» في النهاية ويُنطق «o».'
			},
			{
				questionAr: 'أيّ كلمتين لهما نفس الصوت (an / en)؟',
				options: ['orange et enfant', 'lapin et bateau', 'jaune et matin', 'eau et raisin'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! orange (an) و enfant (en/an) فيهما الصوت نفسه.',
					'lapin فيها in و bateau فيها eau.',
					'jaune فيها au و matin فيها in.',
					'eau يُنطق o و raisin فيها in.'
				],
				explanationAr: 'الحرفان an و en يعطيان الصوت نفسه في orange و enfant.'
			},
			{
				questionAr: 'كيف نكتب كلمة «أصفر» بالفرنسية بالمقطع الصحيح؟',
				options: ['jane', 'jaune', 'jine', 'jeune'],
				correctIndex: 1,
				diagnosticFeedback: [
					'jane ليست اسم اللون أصفر.',
					'أحسنت! اللون الأصفر هو «jaune» بالمقطع au.',
					'jine ليست كلمة فرنسية.',
					'jeune تعني شاباً وليس أصفر.'
				],
				explanationAr: 'اللون الأصفر بالفرنسية هو «jaune» ويُكتب بـ au.'
			},
			{
				questionAr: 'أكمل الكلمة لتعني «حلوى / كعكة»: un gât....',
				options: ['in', 'an', 'eau', 'en'],
				correctIndex: 2,
				diagnosticFeedback: [
					'gâtin ليست كلمة صحيحة.',
					'gâtan ليست كلمة صحيحة.',
					'ممتاز! «un gâteau» تعني حلوى وتنتهي بـ eau.',
					'gâten ليست كلمة صحيحة.'
				],
				explanationAr: 'كلمة حلوى بالفرنسية هي «gâteau» وتنتهي بالمقطع eau.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t3_pluriel_verbes1',
		slug: 'fre-3ap-t3-pluriel-verbes1',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: في الريف وحماية الطبيعة (Projet 3 : À la campagne)',
		order: 3,
		titleAr: 'الجمع بـ -s وأفعال الفوج الأول في الحاضر (Le pluriel en -s et les verbes du 1er groupe)',
		objectives: [
			'تحويل الأسماء من المفرد إلى الجمع بتغيير الأداة (un/une -> des، le/la -> les) وإضافة الحرف «-s»',
			'تصريف أفعال الفوج الأول المنتهية بـ «-er» في الحاضر (manger, aimer, planter)',
			'اختيار النهاية الصحيحة للفعل حسب الضمير الفاعل (e, es, e, ons, ez, ent)'
		],
		keywordsAr: ['Le pluriel', 'des / les', '-s', '1er groupe (-er)', 'manger / aimer / planter'],
		discover: {
			scenarioAr:
				'في يوم الشجرة بالمدرسة، غرس أمين شجرة واحدة: «Amine plante un arbre.» ثم انضمّ إليه أصدقاؤه فغرسوا عدة أشجار: «Les élèves plantent des arbres.». لاحظ كيف تغيّر الاسم والفعل في الجمع!',
			svg: svgPlurielVerbesDiscover,
			steps: [
				{
					promptAr: 'كيف حوّلنا «un arbre» (شجرة واحدة) إلى الجمع (أشجار)؟',
					hintAr: 'نغيّر un إلى des ونضيف حرفاً في نهاية arbre.',
					expectedInput: 'des arbres',
					revealAr: 'لتحويل الاسم إلى الجمع نغيّر «un / une» إلى «des» (و«le / la» إلى «les») ونضيف «-s» في نهاية الاسم: un arbre -> des arbres.'
				},
				{
					promptAr: 'احذف «-er» من الفعل «planter» (غرس). ما الجذر الذي يبقى؟ وكيف نكتبه مع «Je» و«Il»؟',
					hintAr: 'الجذر هو plant- ونضيف e مع Je و Il.',
					expectedInput: 'je plante / il plante',
					revealAr: 'مع أفعال الفوج الأول نحذف «-er» ونضيف: je -e، tu -es، il/elle -e. إذن: je plante، tu plantes، il plante.'
				},
				{
					promptAr: 'كيف نكتب الفعل «aimer» مع «Les élèves» (أي Ils)؟',
					hintAr: 'مع Ils / Elles نضيف «-ent» في نهاية الجذر.',
					expectedInput: 'aiment',
					revealAr: 'نقول: «Les élèves aiment la nature.» (نضيف -ent وهي لا تُنطق في آخر الفعل).'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة الجمع (le pluriel): un / une تصبح «des»، و le / la / l’ تصبح «les»، ونضيف حرف «-s» في آخر الاسم (une pomme -> des pommes، le cahier -> les cahiers).',
				'أفعال الفوج الأول (les verbes du 1er groupe) تنتهي في المصدر بـ «-er» مثل: aimer (أحبّ)، manger (أكل)، planter (غرس).',
				'لتصريفها في الحاضر، نحذف «-er» ونضيف النهايات: je -> -e | tu -> -es | il / elle -> -e | nous -> -ons | vous -> -ez | ils / elles -> -ent.',
				'مثال للفعل «planter»: je plante, tu plantes, il/elle plante, nous plantons, vous plantez, ils/elles plantent.'
			],
			visualSvg: svgPlurielVerbesSummary,
			visualCaptionAr: 'قاعدة الجمع بإضافة -s ونهايات أفعال الفوج الأول في الحاضر',
			examples: [
				{
					problemAr: 'حوّل إلى الجمع: une fleur -> ........ | le fruit -> ........',
					solutionAr: 'une fleur -> des fleurs | le fruit -> les fruits.'
				},
				{
					problemAr: 'صرّف الفعل بين قوسين في الحاضر:\n1) Sara (manger) ...... une orange.\n2) Nous (aimer) ...... la nature.',
					solutionAr: '1) Sara mange une orange.\n2) Nous aimons la nature.'
				}
			],
			watchOutAr:
				'انتبه! النهاية «-s» في آخر الاسم الجمع و«-ent» في آخر الفعل مع ils/elles تُكتبان ولا تُنطقان؛ لا تنسَ كتابتهما!'
		},
		practice: [
			{
				questionAr: 'ما جمع العبارة «une pomme» (تفاحة)؟',
				options: ['des pomme', 'une pommes', 'des pommes', 'les pomme'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا تنسَ إضافة الحرف s في نهاية الاسم الجمع.',
					'يجب تحويل الأداة une إلى des في الجمع.',
					'أحسنت! جمع une pomme هو «des pommes».',
					'أولاً une تتحول إلى des، وثانياً نضيف s إلى pomme.'
				],
				explanationAr: 'في الجمع تصبح une -> des ونضيف -s للاسم: des pommes.'
			},
			{
				questionAr: 'ما جمع العبارة «le jardin» (الحديقة)؟',
				options: ['des jardins', 'les jardin', 'les jardins', 'le jardins'],
				correctIndex: 2,
				diagnosticFeedback: [
					'le أداة تعريف وجمعها هو les وليس des.',
					'يجب إضافة -s في نهاية الاسم jardin.',
					'ممتاز! جمع le jardin هو «les jardins».',
					'يجب تحويل le إلى les.'
				],
				explanationAr: 'أداة التعريف le تتحول إلى les ونضيف -s في آخر الاسم: les jardins.'
			},
			{
				questionAr: 'أكمل تصريف الفعل (aimer) في الحاضر: «Je ...... les fruits.»',
				options: ['aimes', 'aime', 'aimons', 'aiment'],
				correctIndex: 1,
				diagnosticFeedback: [
					'-es هي نهاية الضمير tu.',
					'رائع! مع الضمير je نضع النهاية -e (j’aime).',
					'-ons هي نهاية الضمير nous.',
					'-ent هي نهاية ils / elles.'
				],
				explanationAr: 'مع الضمير je (تُكتب j’ قبل حرف متحرك) نضيف -e: J’aime.'
			},
			{
				questionAr: 'أكمل تصريف الفعل (planter) في الحاضر: «Tu ...... une fleur.»',
				options: ['plante', 'plantes', 'plantons', 'plantez'],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع tu نضيف -es وليس -e فقط.',
					'أحسنت! «Tu plantes une fleur.» بالنهاية -es.',
					'-ons تستعمل مع nous.',
					'-ez تستعمل مع vous.'
				],
				explanationAr: 'نهاية أفعال الفوج الأول مع الضمير tu هي دائماً «-es».'
			},
			{
				questionAr: 'أكمل تصريف الفعل (manger) في الحاضر: «Les enfants ...... des dattes.»',
				options: ['mange', 'manges', 'mangent', 'mangez'],
				correctIndex: 2,
				diagnosticFeedback: [
					'mange تستعمل للمفرد (il/elle).',
					'manges تستعمل مع tu فقط.',
					'ممتاز! Les enfants جمع (= ils)، لذا نضع النهاية -ent: mangent.',
					'mangez تستعمل مع vous.'
				],
				explanationAr: 'الفاعل «Les enfants» جمع (ils)، ونهاية الفعل معه هي «-ent».'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t3_phrase_simple',
		slug: 'fre-3ap-t3-phrase-simple',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع الثالث: في الريف وحماية الطبيعة (Projet 3 : À la campagne)',
		order: 4,
		titleAr: 'بناء الجملة البسيطة: الحرف الكبير والنقطة (Construire une phrase simple)',
		objectives: [
			'التعرف على شروط الجملة الصحيحة: حرف كبير في البداية + معنى واضح + نقطة في النهاية',
			'ترتيب كلمات مبعثرة لتكوين جملة فرنسية بسيطة (فاعل + فعل + مفعول)',
			'كتابة جملتين بسيطتين عن حماية الطبيعة والحديقة دون أخطاء في الترقيم'
		],
		keywordsAr: ['La phrase', 'Majuscule', 'Point', 'Sujet + Verbe', 'Ordre des mots'],
		discover: {
			scenarioAr:
				'كتبت المعلمة كلمات مبعثرة على السبورة: (un arbre / plante / Amine / .) وطلبت من التلاميذ ترتيبها لتصبح جملة مفيدة وصحيحة تبدأ بحرف كبير وتنتهي بنقطة.',
			svg: svgPhraseDiscover,
			steps: [
				{
					promptAr: 'بأيّ كلمة نبدأ الجملة في المجموعة: (un arbre / plante / Amine / .)؟ ولماذا؟',
					hintAr: 'انظر إلى الكلمة التي تبدأ بحرف كبير (Majuscule).',
					expectedInput: 'Amine',
					revealAr: 'نبدأ بكلمة «Amine» لأنها الفاعل وتبدأ بحرف كبير (A majuscule).'
				},
				{
					promptAr: 'ما الكلمة التي تأتي مباشرة بعد الفاعل «Amine»؟',
					hintAr: 'نبحث عن الفعل الذي يبيّن ماذا يفعل أمين.',
					expectedInput: 'plante',
					revealAr: 'بعد الفاعل (Amine) نضع الفعل (plante)، ثم المفعول (un arbre) ثم النقطة (.).'
				},
				{
					promptAr: 'اقرأ الجملة كاملة بعد الترتيب، وتأكد من وجود الحرف الكبير والنقطة!',
					hintAr: 'Amine + plante + un arbre + .',
					expectedInput: 'Amine plante un arbre.',
					revealAr: 'الجملة الصحيحة هي: «Amine plante un arbre.» (يغرس أمين شجرة)؛ تبدأ بحرف كبير، لها معنى تام، وتنتهي بنقطة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة البسيطة (la phrase simple) مجموعة كلمات مرتّبة لها معنى واضح ومفهوم.',
				'تبدأ الجملة دائماً بحرف كبير (une majuscule) وتنتهي بعلامة وقف مثل النقطة ( . ).',
				'الترتيب الأساسي للجملة الفرنسية هو: الفاعل (Sujet) + الفعل (Verbe) + المكمل (Complément).',
				'مثال: «Maman lave les pommes.» — «Le lapin mange une carotte.».'
			],
			visualSvg: svgPhraseSummary,
			visualCaptionAr: 'الأركان الثلاثة للجملة البسيطة الصحيحة في السنة الثالثة ابتدائي',
			examples: [
				{
					problemAr: 'رتّب الكلمات لتكوين جملة صحيحة: (mange / Le lapin / carotte / une / .)',
					solutionAr: 'Le lapin mange une carotte.'
				},
				{
					problemAr: 'صحّح الجملة التالية بوضع الحرف الكبير والنقطة: «sara arrose les fleurs»',
					solutionAr: 'Sara arrose les fleurs.'
				}
			],
			watchOutAr:
				'لا تنسَ النقطة في آخر الجملة ولا الحرف الكبير في بدايتها! الكلمات المبعثرة بدون ترتيب لا تُسمّى جملة حتى لو كانت صحيحة الإملاء.'
		},
		practice: [
			{
				questionAr: 'بماذا تبدأ الجملة الفرنسية وبماذا تنتهي؟',
				options: [
					'تبدأ بحرف صغير وتنتهي بفاصلة',
					'تبدأ بحرف كبير (majuscule) وتنتهي بنقطة (point)',
					'تبدأ بنقطة وتنتهي بحرف كبير',
					'لا تحتاج إلى نقطة في النهاية'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الجملة تبدأ دائماً بحرف كبير وتنتهي بنقطة.',
					'أحسنت! كل جملة تبدأ بحرف كبير (majuscule) وتنتهي بنقطة (.).',
					'هذا عكس القاعدة تماماً.',
					'النقطة ضرورية لإغلاق الجملة.'
				],
				explanationAr: 'القاعدة الذهبية: الجملة تبدأ بحرف كبير وتنتهي بنقطة.'
			},
			{
				questionAr: 'أيّ سطر يمثّل جملة صحيحة وكاملة؟',
				options: [
					'amine aime les pommes',
					'Amine aime les pommes.',
					'pommes les aime Amine.',
					'aime Amine les pommes'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها الحرف الكبير في البداية والنقطة في النهاية.',
					'ممتاز! تبدأ بحرف كبير (A)، مرتبة (Sujet + Verbe + Objet)، وتنتهي بنقطة.',
					'ترتيب الكلمات غير صحيح وليس له معنى.',
					'الترتيب غير صحيح وتنقصها النقطة.'
				],
				explanationAr: 'الجملة «Amine aime les pommes.» مستوفية للشروط الثلاثة: حرف كبير + معنى مرتّب + نقطة.'
			},
			{
				questionAr: 'رتّب الكلمات الآتية لتكوين جملة صحيحة: (les / arrose / Karim / fleurs / .)',
				options: [
					'Karim les fleurs arrose.',
					'Karim arrose les fleurs.',
					'Arrose Karim les fleurs.',
					'Les fleurs Karim arrose.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الفعل arrose يأتي مباشرة بعد الفاعل Karim.',
					'رائع! «Karim arrose les fleurs.» (يسقي كريم الأزهار).',
					'نبدأ بالفاعل الذي يحمل الحرف الكبير Karim.',
					'الفاعل الذي يقوم بالفعل هو Karim.'
				],
				explanationAr: 'الترتيب الصحيح هو: الفاعل (Karim) + الفعل (arrose) + المفعول (les fleurs) + نقطة.'
			},
			{
				questionAr: 'رتّب الكلمات لتكوين جملة صحيحة: (une / mange / Sara / orange / .)',
				options: [
					'Sara mange une orange.',
					'Mange Sara une orange.',
					'Sara orange une mange.',
					'Une orange Sara mange.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! «Sara mange une orange.» جملة صحيحة ومرتّبة.',
					'نضع الفاعل Sara قبل الفعل mange.',
					'الفعل mange يجب أن يلي الفاعل مباشرة.',
					'الفاعل هو Sara التي تأكل البرتقالة.'
				],
				explanationAr: 'الفاعل Sara + الفعل mange + المفعول une orange.'
			},
			{
				questionAr: 'ما الكلمة التي تنقص الجملة التالية لتصبح تامّة المعنى؟ «La vache ...... de l’herbe.»',
				options: ['mange', 'cahier', 'orange', 'printemps'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الفعل «mange» (تأكل) يكمل معنى الجملة: البقرة تأكل العشب.',
					'cahier اسم وليس فعلاً.',
					'orange فاكهة أو لون وليست فعلاً.',
					'printemps اسم فصل وليس فعلاً.'
				],
				explanationAr: 'كل جملة بسيطة تحتاج إلى فعل، والفعل المناسب هنا هو «mange».'
			}
		]
	}
];
