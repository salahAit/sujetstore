import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards
} from '../../svg-french';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 3AP Trimestre 1 (Projet 1 : Vive l'école ! / Se présenter et saluer)
// ═══════════════════════════════════════════════════════════════════════════════

const svgAlphabetDiscover = svgFrenchPrimaryCards({
	title: "Les 6 voyelles en français — الحروف المتحركة الستة",
	subtitle: 'L’alphabet français compte 26 lettres : 6 voyelles + 20 consonnes',
	cards: [
		{ word: 'A a / E e', arabic: 'ami - école', color: '#2563eb' },
		{ word: 'I i / O o', arabic: 'image - orange', color: '#059669' },
		{ word: 'U u / Y y', arabic: 'usine - stylo', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgAlphabetSummary = svgFrenchConjugationChart({
	title: "L'alphabet français (26 lettres) — الأبجدية الفرنسية",
	subtitle: 'Majuscules (A, B, C...) et minuscules (a, b, c...)',
	columns: [
		{
			header: 'Voyelles (6)',
			rule: 'a, e, i, o, u, y',
			examples: 'ami, école, stylo',
			color: '#1d4ed8'
		},
		{
			header: 'Consonnes (20)',
			rule: 'b, c, d, f, m, n, p, t...',
			examples: 'table, livre, papa',
			color: '#047857'
		},
		{
			header: 'Majuscules',
			rule: 'Début de phrase et noms',
			examples: 'Amine, Alger, Bonjour',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgSalutationsDiscover = svgFrenchPrimaryCards({
	title: 'Saluer et se présenter — التحية والتعريف بالنفس',
	subtitle: 'Mes premiers mots de politesse en 3AP',
	cards: [
		{ word: 'Bonjour !', arabic: 'صباح الخير', color: '#2563eb' },
		{ word: 'Bonsoir !', arabic: 'مساء الخير', color: '#059669' },
		{ word: "Je m'appelle...", arabic: 'اسمي...', color: '#d97706' },
		{ word: 'Au revoir !', arabic: 'إلى اللقاء', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgSalutationsSummary = svgFrenchGrammarMap({
	title: 'Se présenter en 3 étapes — التعريف بالنفس في 3 خطوات',
	rootLabel: 'Bonjour ! Je me présente',
	rootSub: 'Phrases simples de politesse (3AP)',
	branches: [
		{
			label: '1. Saluer',
			rule: 'Bonjour / Salut / Bonsoir',
			example: 'Bonjour maîtresse !',
			color: '#1d4ed8'
		},
		{
			label: '2. Dire son nom',
			rule: "Je m'appelle + Prénom",
			example: "Je m'appelle Amine.",
			color: '#047857'
		},
		{
			label: '3. Dire son âge',
			rule: "J'ai + nombre + ans",
			example: "J'ai huit ans.",
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgSyllabesDiscover = svgFrenchPrimaryCards({
	title: 'Les syllabes simples — المقاطع الصوتية البسيطة',
	subtitle: 'Consonne (m, n, t, d, p, b) + Voyelle (a, i)',
	cards: [
		{ word: 'm + a = ma', arabic: 'maman', color: '#2563eb' },
		{ word: 'p + a = pa', arabic: 'papa', color: '#059669' },
		{ word: 't + a = ta', arabic: 'tapis', color: '#d97706' },
		{ word: 'b + a = ba', arabic: 'banane', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgSyllabesSummary = svgFrenchConjugationChart({
	title: 'Assembler des syllabes simples — تركيب المقاطع الصوتية',
	subtitle: 'Pour lire un mot, on découpe en syllabes',
	columns: [
		{
			header: 'm / n + a, i',
			rule: 'ma - mi / na - ni',
			examples: 'maman, ami, nid',
			color: '#1d4ed8'
		},
		{
			header: 't / d + a, i',
			rule: 'ta - ti / da - di',
			examples: 'tapis, midi, datte',
			color: '#047857'
		},
		{
			header: 'p / b + a, i',
			rule: 'pa - pi / ba - bi',
			examples: 'papa, banane, bille',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgFournituresDiscover = svgFrenchPrimaryCards({
	title: 'Les fournitures scolaires — الأدوات المدرسية',
	subtitle: 'Dans mon cartable de 3AP',
	cards: [
		{ word: 'un cahier', arabic: 'كراس', color: '#2563eb' },
		{ word: 'un stylo', arabic: 'قلم سيال', color: '#059669' },
		{ word: 'une trousse', arabic: 'مقلمة', color: '#d97706' },
		{ word: 'une règle', arabic: 'مسطرة', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgFournituresSummary = svgFrenchGrammarMap({
	title: 'Les déterminants : un / une / le / la — أدوات التنكير والتعريف',
	rootLabel: 'Nom singulier (المفرد)',
	rootSub: 'Masculin (مذكر) ou Féminin (مؤنث)',
	branches: [
		{
			label: 'Masculin',
			rule: 'un (نكرة) / le (معرفة)',
			example: 'un livre / le cartable',
			color: '#1d4ed8'
		},
		{
			label: 'Féminin',
			rule: 'une (نكرة) / la (معرفة)',
			example: 'une gomme / la trousse',
			color: '#047857'
		},
		{
			label: "Devant voyelle",
			rule: "l' + (a, e, i, o, u, h)",
			example: "l'ardoise / l'école",
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_3AP_T1 (4 Lessons — yearSubjectId: 592)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AP_T1: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_3ap_t1_alphabet',
		slug: 'fre-3ap-t1-alphabet',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: تحيا المدرسة! التعارف والتحية (Projet 1 : Vive l'école !)",
		order: 1,
		titleAr: "الأبجدية الفرنسية: الحروف المتحركة والساكنة (L'alphabet français)",
		objectives: [
			'التعرف على حروف الأبجدية الفرنسية الـ 26 بصورتيها الكبيرة (majuscule) والصغيرة (minuscule)',
			'التمييز الدقيق بين الحروف المتحركة الستة (voyelles : a, e, i, o, u, y) والحروف الساكنة العشرين (consonnes)',
			'استعمال الحرف الكبير في بداية الجملة وأسماء الأشخاص والمدن'
		],
		keywordsAr: ['L’alphabet', 'Voyelles', 'Consonnes', 'Majuscule', 'Minuscule', '26 lettres'],
		discover: {
			scenarioAr:
				'في أول حصة لغة فرنسية بالسنة الثالثة ابتدائي، علّقت الأستاذة لوحة الأبجدية الفرنسية على السبورة ولوّنت ستة حروف باللون الأحمر: (a, e, i, o, u, y)، ثم سألت أمين ومريم عن دور هذه الحروف في قراءة الكلمات.',
			svg: svgAlphabetDiscover,
			steps: [
				{
					promptAr: 'كم عدد الحروف في الأبجدية الفرنسية كلها؟ وكم عدد الحروف المتحركة (les voyelles)؟',
					hintAr: 'المجموع 26 حرفاً، والمتحركة هي: a, e, i, o, u, y.',
					expectedInput: '6',
					revealAr: 'في اللغة الفرنسية 26 حرفاً: 6 حروف متحركة (les voyelles : a, e, i, o, u, y) و20 حرفاً ساكناً (les consonnes).'
				},
				{
					promptAr: 'استخرج الحروف المتحركة (voyelles) الموجودة في كلمة «stylo» (قلم سيال).',
					hintAr: 'ابحث بين حروف s - t - y - l - o عن الحروف الستة (a, e, i, o, u, y).',
					expectedInput: 'y, o',
					revealAr: 'الحرفان المتحركان في كلمة «stylo» هما «y» و«o»، أما «s, t, l» فهي حروف ساكنة (consonnes).'
				},
				{
					promptAr: 'كيف نكتب الحرف الأول من اسم «amine» ومدينة «alger»؟',
					hintAr: 'أسماء الأشخاص والمدن تبدأ دائماً بحرف كبير (majuscule).',
					expectedInput: 'A',
					revealAr: 'نكتبها بحرف كبير: «Amine» و«Alger» لأن أسماء الأشخاص والمدن تبدأ دائماً بحرف كبير (majuscule).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تتكون الأبجدية الفرنسية من 26 حرفاً: 6 حروف متحركة (voyelles) و20 حرفاً ساكناً (consonnes).',
				'الحروف المتحركة الستة (les voyelles) هي: a, e, i, o, u, y.',
				'الحروف الساكنة (les consonnes) هي باقي الحروف: b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, z.',
				'لكل حرف شكل كبير (majuscule : A, B, C...) نضعه في بداية الجملة وأسماء الأعلام، وشكل صغير (minuscule : a, b, c...).'
			],
			visualSvg: svgAlphabetSummary,
			visualCaptionAr: 'تقسيم الأبجدية الفرنسية إلى حروف متحركة وحروف ساكنة مع مواضع الحرف الكبير',
			examples: [
				{
					problemAr: 'صنّف الحروف الآتية إلى متحركة (voyelles) وساكنة (consonnes) : (m, a, t, y, b, i)',
					solutionAr: 'Voyelles : a, y, i.\nConsonnes : m, t, b.'
				},
				{
					problemAr: 'اكتب الحروف التالية بالحرف الكبير (majuscule) : a — b — d — m',
					solutionAr: 'A — B — D — M.'
				}
			],
			watchOutAr:
				'تذكّر جيداً: في اللغة الفرنسية الحرف «y» يُحسب من الحروف المتحركة (voyelles)، إذن عددها 6 حروف (a, e, i, o, u, y) وليس 5!'
		},
		practice: [
			{
				questionAr: 'كم عدد الحروف المتحركة (les voyelles) في اللغة الفرنسية؟',
				options: ['4 حروف', '5 حروف', '6 حروف', '7 حروف'],
				correctIndex: 2,
				diagnosticFeedback: [
					'عددها أكثر من 4؛ أعد عدّ المجموعة a, e, i, o, u, y.',
					'انتبه! في الفرنسية نضيف الحرف y إلى a, e, i, o, u فتصبح 6 حروف.',
					'أحسنت! الحروف المتحركة في الفرنسية ستة: a, e, i, o, u, y.',
					'لا، عددها ستة فقط.'
				],
				explanationAr: 'الحروف المتحركة في اللغة الفرنسية ستة: a, e, i, o, u, y.'
			},
			{
				questionAr: 'أيّ حرف من الحروف الآتية هو حرف متحرك (voyelle)؟',
				options: ['m', 'p', 'y', 't'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف m حرف ساكن (consonne).',
					'الحرف p حرف ساكن (consonne).',
					'ممتاز! الحرف y من الحروف المتحركة الستة في الفرنسية.',
					'الحرف t حرف ساكن (consonne).'
				],
				explanationAr: 'الحرف y ينتمي إلى الحروف المتحركة (a, e, i, o, u, y).'
			},
			{
				questionAr: 'أيّ حرف من الحروف الآتية هو حرف ساكن (consonne)؟',
				options: ['a', 'd', 'e', 'o'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف a حرف متحرك (voyelle).',
					'أحسنت! الحرف d حرف ساكن (consonne).',
					'الحرف e حرف متحرك (voyelle).',
					'الحرف o حرف متحرك (voyelle).'
				],
				explanationAr: 'الحرف d ليس من مجموعة (a, e, i, o, u, y)، فهو حرف ساكن.'
			},
			{
				questionAr: 'ما الحرف الذي يأتي مباشرة بعد الحرف «C» في الأبجدية الفرنسية؟',
				options: ['B', 'D', 'E', 'F'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف B يأتي قبل C.',
					'رائع! الترتيب هو: A, B, C, D, E.',
					'الحرف E يأتي بعد D.',
					'الحرف F يأتي بعد E.'
				],
				explanationAr: 'ترتيب بداية الأبجدية الفرنسية هو: A, B, C, D, E, F.'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة لاسم «كريم» ومدينته «وهران» بالحرف الكبير (majuscule):',
				options: ['karim et oran', 'Karim et oran', 'karim et Oran', 'Karim et Oran'],
				correctIndex: 3,
				diagnosticFeedback: [
					'يجب تكبير الحرف الأول من اسم الشخص واسم المدينة معاً.',
					'مدينة Oran اسم علم ويجب أن تبدأ بحرف كبير O.',
					'اسم الشخص Karim يجب أن يبدأ بحرف كبير K.',
					'ممتاز! أسماء الأشخاص والمدن تبدأ دائماً بحرف كبير: Karim et Oran.'
				],
				explanationAr: 'نكتب الحرف الكبير (majuscule) في بداية أسماء الأشخاص والمدن.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t1_salutations',
		slug: 'fre-3ap-t1-salutations',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: تحيا المدرسة! التعارف والتحية (Projet 1 : Vive l'école !)",
		order: 2,
		titleAr: 'التحية والتعريف بالنفس (Les salutations et se présenter)',
		objectives: [
			'إلقاء التحية بأدب باللغة الفرنسية حسب الوقت (Bonjour, Bonsoir, Salut, Au revoir)',
			'تقديم النفس بذكر الاسم والعمر بجمل قصيرة (Je m’appelle..., J’ai 8 ans)',
			'السؤال عن اسم الصديق والرد عليه بلطف (Comment tu t’appelles ?)'
		],
		keywordsAr: ['Bonjour', 'Bonsoir', 'Au revoir', "Je m'appelle", "J'ai 8 ans", 'Salut'],
		discover: {
			scenarioAr:
				'في ساحة المدرسة صباحاً، التقت سارة بتلميذة جديدة في قسم السنة الثالثة ابتدائي. ابتسمت سارة وقالت: «Bonjour ! Je m’appelle Sara. Et toi, comment tu t’appelles ?».',
			svg: svgSalutationsDiscover,
			steps: [
				{
					promptAr: 'ما كلمة التحية التي قالتها سارة في الصباح؟',
					hintAr: 'تبدأ بـ Bon وتنتهي بـ jour.',
					expectedInput: 'Bonjour',
					revealAr: 'قالت سارة: «Bonjour !» ومعناها صباح الخير / نهارك سعيد، أما في المساء فنقول: «Bonsoir !».'
				},
				{
					promptAr: 'كيف تعرّف التلميذة الجديدة مريم بنفسها بالفرنسية؟',
					hintAr: "نستعمل عبارة Je m'appelle ثم نكتب الاسم.",
					expectedInput: "Je m'appelle Meriem",
					revealAr: 'تقول مريم: «Bonjour ! Je m’appelle Meriem.» (مرحباً! اسمي مريم).'
				},
				{
					promptAr: 'ماذا تقول التلميذتان لبعضهما عند الانصراف إلى البيت؟',
					hintAr: 'عبارة الوداع بالفرنسية معناها إلى اللقاء.',
					expectedInput: 'Au revoir',
					revealAr: 'عند الانصراف نقول بأدب: «Au revoir !» (إلى اللقاء)، وعند الشكر نقول: «Merci !».'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتحية في النهار والصباح نقول: «Bonjour !»، وفي المساء نقول: «Bonsoir !»، وبين الأصدقاء نقول: «Salut !».',
				'عند الوداع نقول: «Au revoir !» (إلى اللقاء)، وللشكر نقول: «Merci !» (شكراً).',
				'لتقديم النفس نقول: «Je m’appelle + الاسم.» مثل: «Je m’appelle Youssef.».',
				'للسؤال عن الاسم نقول: «Comment tu t’appelles ?»، ولذكر العمر نقول: «J’ai 8 ans.» (عمري 8 سنوات).'
			],
			visualSvg: svgSalutationsSummary,
			visualCaptionAr: 'خطوات التحية والتعريف بالنفس في ثلاث جمل سهلة لتلاميذ 3AP',
			examples: [
				{
					problemAr: 'أكمل الحوار بين أمين وبلال:\nAmine : Bonjour ! Comment tu t’appelles ?\nBilal : ........ ! Je ........ Bilal.',
					solutionAr: 'Bilal : Bonjour ! Je m’appelle Bilal.'
				},
				{
					problemAr: 'أجب عن السؤال إذا كان عمرك 8 سنوات: «Quel âge as-tu ?»',
					solutionAr: 'J’ai 8 ans. (أو: J’ai huit ans.)'
				}
			],
			watchOutAr:
				'في اللغة الفرنسية نستعمل فعل الملكية للعمر فنقول «J’ai 8 ans» (عندي 8 سنوات)، ولا نقول أبداً «Je suis 8 ans»!'
		},
		practice: [
			{
				questionAr: 'ما التحية المناسبة عند دخول القسم صباحاً؟',
				options: ['Au revoir !', 'Bonjour !', 'Merci !', 'Bonne nuit !'],
				correctIndex: 1,
				diagnosticFeedback: [
					'«Au revoir !» تقال عند الوداع والمغادرة.',
					'أحسنت! «Bonjour !» تحية الصباح والنهار.',
					'«Merci !» تقال للشكر وليست للتحية.',
					'«Bonne nuit !» تقال قبل النوم ليلاً.'
				],
				explanationAr: 'في الصباح نحيّي المعلم والأصدقاء بـ «Bonjour !».'
			},
			{
				questionAr: 'كيف يقول يوسف «اسمي يوسف» باللغة الفرنسية؟',
				options: ["J'ai Youssef.", 'Au revoir Youssef.', "Je m'appelle Youssef.", 'Bonsoir Youssef.'],
				correctIndex: 2,
				diagnosticFeedback: [
					"عبارة J'ai تستعمل للعمر أو الملكية وليس للاسم.",
					'هذه عبارة وداع وليست للتعريف بالاسم.',
					"ممتاز! «Je m'appelle Youssef.» تعني اسمي يوسف.",
					'هذه تحية مسائية فقط.'
				],
				explanationAr: "لتقديم الاسم بالفرنسية نستعمل: Je m'appelle + الاسم."
			},
			{
				questionAr: 'ماذا نقول عند مغادرة المدرسة في نهاية اليوم؟',
				options: ['Bonjour !', 'Au revoir !', "Je m'appelle...", 'Comment ?'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Bonjour تقال عند اللقاء وليس عند المغادرة.',
					'أحسنت! «Au revoir !» تعني إلى اللقاء.',
					'هذه عبارة لتقديم الاسم.',
					'Comment أداة استفهام.'
				],
				explanationAr: 'عبارة الوداع باللغة الفرنسية هي «Au revoir !».'
			},
			{
				questionAr: 'اختر الجملة الصحيحة التي تعبّر عن العمر (8 سنوات):',
				options: ['Je suis 8 ans.', "J'ai 8 ans.", "Je m'appelle 8 ans.", 'Bonjour 8 ans.'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نستعمل Je suis مع العمر بالفرنسية.',
					"رائع! نقول «J'ai 8 ans.» للتعبير عن العمر.",
					"عبارة Je m'appelle خاصة بالاسم.",
					'Bonjour كلمة تحية فقط.'
				],
				explanationAr: "في الفرنسية نعبر عن العمر بالفعل avoir: J'ai 8 ans."
			},
			{
				questionAr: 'ما السؤال المناسب للإجابة: «Je m’appelle Ines.»؟',
				options: ['Au revoir ?', 'Quel âge as-tu ?', "Comment tu t'appelles ?", 'Merci ?'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Au revoir عبارة وداع.',
					'Quel âge as-tu ? يسأل عن العمر.',
					"صحيح! «Comment tu t'appelles ?» معناه ما اسمك؟",
					'Merci عبارة شكر.'
				],
				explanationAr: "للسؤال عن اسم شخص نقول: Comment tu t'appelles ?"
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t1_syllabes',
		slug: 'fre-3ap-t1-syllabes',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: تحيا المدرسة! التعارف والتحية (Projet 1 : Vive l'école !)",
		order: 3,
		titleAr: 'المقاطع الصوتية البسيطة (Les syllabes simples : a, i, m, n, t, d, p, b)',
		objectives: [
			'تركيب مقاطع صوتية بسيطة من حرف ساكن (m, n, t, d, p, b) وحرف متحرك (a, i)',
			'قراءة كلمات فرنسية سهلة بتقطيعها إلى مقاطع صوتية (ma-man, pa-pa, ta-pis, mi-di)',
			'التمييز الصوتي والكتابي بين الحروف المتقاربة (p / b) و (t / d) و (m / n)'
		],
		keywordsAr: ['Syllabes', 'ma / mi', 'na / ni', 'ta / ti', 'da / di', 'pa / pi / ba / bi'],
		discover: {
			scenarioAr:
				'كتبت المعلمة على بطاقات ملونة الحروف الساكنة (m, n, t, d, p, b) والحرفين المتحركين (a, i)، ثم طلبت من التلاميذ جمع بطاقتين معاً لتشكيل مقاطع صوتية وقراءة كلمات مألوفة.',
			svg: svgSyllabesDiscover,
			steps: [
				{
					promptAr: 'إذا جمعنا الحرف الساكن «m» مع الحرف المتحرك «a»، فما المقطع الصوتي الناتج؟',
					hintAr: 'نقرأ m ثم a معاً: ma.',
					expectedInput: 'ma',
					revealAr: 'm + a = «ma» مثل كلمة «maman»، و m + i = «mi» مثل كلمة «ami» و«midi».'
				},
				{
					promptAr: 'قطّع كلمة «ta-pis» (سجادة) إلى مقاطع صوتية. كم عدد مقاطعها؟',
					hintAr: 'المقطع الأول ta والمقطع الثاني pis.',
					expectedInput: '2',
					revealAr: 'كلمة «tapis» تتكون من مقطعين صوتيين: «ta / pis» (والحرف s في النهاية صامت لا يُنطق).'
				},
				{
					promptAr: 'ما المقطع الناقص في كلمة «....-na-ne» (موزة)؟ هل هو «pa» أم «ba»؟',
					hintAr: 'موزة بالفرنسية هي banane.',
					expectedInput: 'ba',
					revealAr: 'الكلمة الصحيحة هي «ba-na-ne» (موزة)، وننتبه للفرق بين «b» (بطنها للأمام) و«p» (رأسها للأعلى).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المقطع الصوتي البسيط (la syllabe) يتكوّن من حرف ساكن (consonne) + حرف متحرك (voyelle).',
				'مقاطع (m, n): m+a = ma، m+i = mi | n+a = na، n+i = ni (مثل: maman, ami, banane, nid).',
				'مقاطع (t, d): t+a = ta، t+i = ti | d+a = da، d+i = di (مثل: tapis, table, datte, midi).',
				'مقاطع (p, b): p+a = pa، p+i = pi | b+a = ba، b+i = bi (مثل: papa, pile, banane, bille).'
			],
			visualSvg: svgSyllabesSummary,
			visualCaptionAr: 'جدول تركيب المقاطع الصوتية البسيطة لقراءة الكلمات الفرنسية بسهولة',
			examples: [
				{
					problemAr: 'رتّب المقاطع لتكوين كلمتين صحيحتين: (mi / a) — (di / mi)',
					solutionAr: 'a-mi (صديق) — mi-di (الظهر / منتصف النهار).'
				},
				{
					problemAr: 'أكمل المقطع الناقص (pa / ta / ma) : ....-pis ، ....-man ، ....-pa',
					solutionAr: 'ta-pis (سجادة) ، ma-man (أمي) ، pa-pa (أبي).'
				}
			],
			watchOutAr:
				'احذر الخلط بين «b» و«d» و«p»! تذكّر: في كلمة «papa» الحرف p ينزل تحت السطر، أما «b» في «banane» و«d» في «datte» فيصعدان فوق السطر.'
		},
		practice: [
			{
				questionAr: 'ما المقطع الصوتي الذي نحصل عليه عند جمع الحرف «d» مع الحرف «i»؟',
				options: ['da', 'di', 'ti', 'bi'],
				correctIndex: 1,
				diagnosticFeedback: [
					'da ناتج عن d + a.',
					'أحسنت! d + i = di كما في كلمة midi.',
					'ti ناتج عن t + i.',
					'bi ناتج عن b + i.'
				],
				explanationAr: 'عند جمع الحرف الساكن d مع الحرف المتحرك i نقرأ المقطع «di».'
			},
			{
				questionAr: 'ما المقطع الناقص لإكمال كلمة «....-pa» (أبي)؟',
				options: ['ba', 'pa', 'da', 'na'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ba لا تكوّن كلمة أبي.',
					'ممتاز! الكلمة هي «pa-pa» (أبي).',
					'da لا تكوّن كلمة أبي.',
					'na لا تكوّن كلمة أبي.'
				],
				explanationAr: 'كلمة أبي بالفرنسية هي «papa» وتتكون من المقطعين pa + pa.'
			},
			{
				questionAr: 'أيّ كلمة تحتوي على المقطع الصوتي «mi»؟',
				options: ['papa', 'table', 'midi', 'datte'],
				correctIndex: 2,
				diagnosticFeedback: [
					'كلمة papa فيها المقطع pa فقط.',
					'كلمة table تبدأ بالمقطع ta.',
					'رائع! كلمة «mi-di» تبدأ بالمقطع «mi».',
					'كلمة datte تبدأ بالمقطع da.'
				],
				explanationAr: 'كلمة «midi» تتكون من المقطعين mi + di.'
			},
			{
				questionAr: 'رتّب المقاطع الآتية لتكوين اسم فاكهة معروفة: (ne / ba / na)',
				options: ['na-ba-ne', 'ba-na-ne', 'ne-ba-na', 'ba-ne-na'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترتيب غير صحيح؛ تبدأ الكلمة بالمقطع ba.',
					'أحسنت! الكلمة الصحيحة هي «ba-na-ne» (موزة).',
					'المقطع ne يأتي في نهاية الكلمة.',
					'نضع المقطع na في الوسط ثم ne في النهاية.'
				],
				explanationAr: 'الترتيب الصحيح للمقاطع هو: ba + na + ne = banane.'
			},
			{
				questionAr: 'ما الكلمة التي تبدأ بالمقطع «ta»؟',
				options: ['tapis', 'bille', 'maman', 'nid'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! كلمة «ta-pis» تبدأ بالمقطع ta.',
					'كلمة bille تبدأ بالمقطع bi.',
					'كلمة maman تبدأ بالمقطع ma.',
					'كلمة nid تبدأ بالمقطع ni.'
				],
				explanationAr: 'كلمة «tapis» (سجادة) تبدأ بالمقطع الصوتي ta.'
			}
		]
	},
	{
		id: 'fre_lesson_3ap_t1_fournitures',
		slug: 'fre-3ap-t1-fournitures',
		grade: '3ap',
		yearSubjectId: 592,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: "المشروع الأول: تحيا المدرسة! التعارف والتحية (Projet 1 : Vive l'école !)",
		order: 4,
		titleAr: 'الأدوات المدرسية وأدوات التعريف والتنكير (Les fournitures scolaires : un / une / le / la)',
		objectives: [
			'حفظ أسماء الأدوات المدرسية الأساسية (cartable, cahier, livre, stylo, trousse, règle, gomme, ardoise)',
			'استعمال أدوات التنكير (un للمذكر، une للمؤنث) مع الأسماء المفردة بشكل صحيح',
			'استعمال أدوات التعريف (le للمذكر، la للمؤنث، l’ قبل الحرف المتحرك) بشكل صحيح'
		],
		keywordsAr: ['Fournitures', 'un / une', 'le / la / l’', 'cahier', 'trousse', 'cartable'],
		discover: {
			scenarioAr:
				'في المساء، يحضّر أنس محفظته للذهاب إلى المدرسة غداً، فيضع أدواته واحداً تلو الآخر ويسمّيها بالفرنسية: «un cahier, un livre, une trousse, une gomme, l’ardoise».',
			svg: svgFournituresDiscover,
			steps: [
				{
					promptAr: 'ما الأداة التي وضعها أنس قبل كلمتي «cahier» (كراس) و«livre» (كتاب)؟',
					hintAr: 'الكلمتان مذكر مفرد بالفرنسية.',
					expectedInput: 'un',
					revealAr: 'استعمل «un» (un cahier, un livre, un stylo, un cartable) لأنها أسماء مذكر مفرد.'
				},
				{
					promptAr: 'ما الأداة التي نستعملها قبل كلمتي «trousse» (مقلمة) و«règle» (مسطرة)؟',
					hintAr: 'الكلمتان مؤنث مفرد بالفرنسية.',
					expectedInput: 'une',
					revealAr: 'نستعمل «une» للنكرة و«la» للمعرفة مع المؤنث المفرد: une trousse / la trousse، une règle / la règle.'
				},
				{
					promptAr: 'لماذا كتبنا «l’ardoise» (اللوحة) بـ «l’» ولم نكتب «la ardoise»؟',
					hintAr: 'انظر إلى الحرف الأول في كلمة ardoise.',
					expectedInput: 'voyelle',
					revealAr: 'لأن كلمة «ardoise» تبدأ بحرف متحرك (voyelle : a)، فنحذف حرف a من «la» ونكتب «l’ardoise» لتسهيل النطق.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات مدرسية مذكرة (un / le): un cartable (محفظة)، un cahier (كراس)، un livre (كتاب)، un stylo (قلم سيال)، un crayon (قلم رصاص).',
				'أدوات مدرسية مؤنثة (une / la): une trousse (مقلمة)، une règle (مسطرة)، une gomme (ممحاة)، une ardoise (لوحة).',
				'نستعمل للمذكر المفرد: «un» (نكرة) أو «le» (معرفة) مثل: un cahier -> le cahier.',
				'نستعمل للمؤنث المفرد: «une» (نكرة) أو «la» (معرفة)، وإذا بدأ الاسم بحرف متحرك نضع «l’» مثل: l’ardoise، l’école.'
			],
			visualSvg: svgFournituresSummary,
			visualCaptionAr: 'قاعدة استعمال un / une و le / la / l’ مع الأدوات المدرسية',
			examples: [
				{
					problemAr: 'أكمل بـ «un» أو «une» : ...... stylo — ...... gomme — ...... cahier — ...... règle',
					solutionAr: 'un stylo — une gomme — un cahier — une règle.'
				},
				{
					problemAr: 'حوّل من النكرة إلى المعرفة (le / la / l’) : un livre — une trousse — une ardoise',
					solutionAr: 'le livre — la trousse — l’ardoise.'
				}
			],
			watchOutAr:
				'انتبه! بعض الكلمات مؤنثة بالعربية لكنها مذكرة بالفرنسية مثل «un cartable» (محفظة)؛ والعكس صحيح مثل «une gomme» و«une règle»!'
		},
		practice: [
			{
				questionAr: 'اختر الأداة الصحيحة لكلمة «cahier» (كراس):',
				options: ['une cahier', 'un cahier', 'la cahier', "l'cahier"],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة cahier مذكر بالفرنسية وليست مؤنثاً.',
					'أحسنت! نقول «un cahier» أو «le cahier».',
					'la تستعمل للمؤنث فقط.',
					"l' تستعمل قبل الحرف المتحرك فقط."
				],
				explanationAr: 'الاسم «cahier» مذكر مفرد، لذا نضع قبله «un» أو «le».'
			},
			{
				questionAr: 'اختر الأداة الصحيحة لكلمة «trousse» (مقلمة):',
				options: ['un trousse', 'le trousse', 'une trousse', "l'trousse"],
				correctIndex: 2,
				diagnosticFeedback: [
					'un تستعمل للمذكر المفرد.',
					'le تستعمل للمذكر المفرد.',
					'ممتاز! كلمة trousse مؤنث فنقول «une trousse» أو «la trousse».',
					'كلمة trousse تبدأ بحرف ساكن (t) وليس بحرف متحرك.'
				],
				explanationAr: 'الاسم «trousse» مؤنث مفرد، لذا نضع قبله «une» أو «la».'
			},
			{
				questionAr: 'كيف نكتب «اللوحة» بأداة التعريف الصحيحة بالفرنسية؟',
				options: ['le ardoise', 'la ardoise', "l'ardoise", 'un ardoise'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ardoise مؤنث وتبدأ بحرف متحرك.',
					'لا نكتب la قبل حرف متحرك؛ نحذف a ونضع فاصلة عليا.',
					"رائع! نكتب «l'ardoise» لأن الكلمة تبدأ بالحرف المتحرك a.",
					'un أداة تنكير للمذكر وليست أداة تعريف.'
				],
				explanationAr: "قبل الاسم المفرد الذي يبدأ بحرف متحرك نضع أداة التعريف «l'»."
			},
			{
				questionAr: 'ما معنى كلمة «un cartable» باللغة العربية؟',
				options: ['مسطرة', 'ممحاة', 'محفظة', 'كتاب'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المسطرة هي une règle.',
					'الممحاة هي une gomme.',
					'أحسنت! un cartable تعني محفظة مدرسية.',
					'الكتاب هو un livre.'
				],
				explanationAr: 'كلمة «un cartable» تعني محفظة، وهي اسم مذكر في اللغة الفرنسية.'
			},
			{
				questionAr: 'أيّ كلمة لا تنتمي إلى الأدوات المدرسية (les fournitures scolaires)؟',
				options: ['un stylo', 'une gomme', 'une banane', 'un livre'],
				correctIndex: 2,
				diagnosticFeedback: [
					'un stylo (قلم سيال) من الأدوات المدرسية.',
					'une gomme (ممحاة) من الأدوات المدرسية.',
					'ممتاز! une banane (موزة) فاكهة وليست أداة مدرسية.',
					'un livre (كتاب) من الأدوات المدرسية.'
				],
				explanationAr: 'الكلمات stylo و gomme و livre أدوات مدرسية، أما banane فهي فاكهة.'
			}
		]
	}
];
