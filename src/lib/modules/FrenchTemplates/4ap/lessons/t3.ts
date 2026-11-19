import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchPrimaryCards,
	svgFrenchTenseTimeline
} from '../../svg-french';

// ═══════════════════════════════════════════════════════════════════════════════
// SVGs — 4AP Trimestre 3 (Projet 3 : L'eau, la mer et les vacances utiles)
// ═══════════════════════════════════════════════════════════════════════════════

const svgEauNatureDiscover = svgFrenchPrimaryCards({
	title: "L'eau et la nature algérienne — الماء والطبيعة الجزائرية",
	subtitle: "L'eau est précieuse : protégeons-la !",
	cards: [
		{ word: 'la source', arabic: 'المنبع', color: '#2563eb' },
		{ word: 'la rivière', arabic: 'النهر / الوادي', color: '#0284c7' },
		{ word: 'la pluie', arabic: 'المطر', color: '#059669' },
		{ word: 'la mer', arabic: 'البحر', color: '#7c3aed' }
	],
	width: 520,
	height: 185
});

const svgEauNatureSummary = svgFrenchGrammarMap({
	title: "Protéger l'eau et passer des vacances utiles",
	rootLabel: "L'eau, c'est la vie !",
	rootSub: 'Vocabulaire du Projet 3 (4AP)',
	branches: [
		{
			label: "Sources d'eau",
			rule: 'pluie, source, rivière, mer',
			example: 'la mer Méditerranée',
			color: '#1d4ed8'
		},
		{
			label: 'Bons gestes',
			rule: 'économiser, fermer, protéger',
			example: 'Je ferme le robinet.',
			color: '#047857'
		},
		{
			label: 'Vacances utiles',
			rule: 'lire, réviser, visiter la famille',
			example: 'Une plage propre',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgFuturDiscover = svgFrenchTenseTimeline({
	title: 'Le futur simple — زمن المستقبل البسيط',
	tenseName: 'Futur simple',
	formula: 'Infinitif (-er) + (-ai, -as, -a, -ons, -ez, -ont)',
	activeZone: 'future',
	example: 'Demain, nous visiterons la plage de Jijel et nous serons heureux.',
	markers: 'demain, bientôt, la semaine prochaine, cet été',
	width: 520,
	height: 215
});

const svgFuturSummary = svgFrenchConjugationChart({
	title: 'Le futur simple : 1er groupe + Être et Avoir (4AP)',
	subtitle: 'Mêmes terminaisons pour tous : -ai, -as, -a, -ons, -ez, -ont',
	columns: [
		{
			header: '1er groupe (parler)',
			rule: 'infinitif + terminaisons',
			examples: 'je parlerai, nous parlerons',
			color: '#1d4ed8'
		},
		{
			header: 'ÊTRE (ser-)',
			rule: 'je serai, tu seras, il sera',
			examples: 'nous serons, ils seront',
			color: '#047857'
		},
		{
			header: 'AVOIR (aur-)',
			rule: "j'aurai, tu auras, il aura",
			examples: 'nous aurons, ils auront',
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgCodComplementsDiscover = svgFrenchPrimaryCards({
	title: 'Les compléments de la phrase — مكملات الجملة',
	subtitle: 'Trois questions magiques pour les trouver !',
	cards: [
		{ word: 'COD', arabic: 'Qui ? / Quoi ?', color: '#1d4ed8' },
		{ word: 'CCL (Lieu)', arabic: 'Où ? (المكان)', color: '#047857' },
		{ word: 'CCT (Temps)', arabic: 'Quand ? (الزمان)', color: '#d97706' }
	],
	width: 520,
	height: 185
});

const svgCodComplementsSummary = svgFrenchGrammarMap({
	title: 'Identifier COD, CCL et CCT dans une phrase',
	rootLabel: 'Cet été, Amine protège la plage à Tipaza.',
	rootSub: 'Sujet + Verbe + Compléments',
	branches: [
		{
			label: 'COD (Quoi ?)',
			rule: 'Juste après le verbe',
			example: 'la plage (protège quoi ?)',
			color: '#1d4ed8'
		},
		{
			label: 'CCL (Où ?)',
			rule: 'Indique le lieu',
			example: 'à Tipaza (où ?)',
			color: '#047857'
		},
		{
			label: 'CCT (Quand ?)',
			rule: 'Indique le temps',
			example: 'Cet été (quand ?)',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

const svgHomophonesDiscover = svgFrenchConjugationChart({
	title: 'Homophones : a / à — et / est (الألفاظ المتشابهة نطقاً)',
	subtitle: 'Astuces infaillibles pour ne plus les confondre !',
	columns: [
		{
			header: 'a  /  à',
			rule: 'a = avait (فعل) | à = préposition',
			examples: 'Il a une gourde à la main.',
			color: '#1d4ed8'
		},
		{
			header: 'est  /  et',
			rule: 'est = était (فعل) | et = و (ربط)',
			examples: 'La mer est calme et propre.',
			color: '#047857'
		},
		{
			header: 'Accord S-V',
			rule: 'Singulier vs Pluriel',
			examples: "L'eau coule / Les eaux coulent",
			color: '#b45309'
		}
	],
	width: 520,
	height: 210
});

const svgHomophonesSummary = svgFrenchGrammarMap({
	title: 'Vérifier son orthographe avant de rendre sa copie',
	rootLabel: '3 réflexes simples (4AP)',
	rootSub: 'Remplacer dans sa tête !',
	branches: [
		{
			label: 'Tester « a »',
			rule: 'Remplace par « avait »',
			example: 'Sara a (avait) un livre.',
			color: '#1d4ed8'
		},
		{
			label: 'Tester « est »',
			rule: 'Remplace par « était »',
			example: 'Le ciel est (était) bleu.',
			color: '#047857'
		},
		{
			label: 'Accord S-V',
			rule: 'Trouve le sujet (Qui ?)',
			example: 'Les enfants protègent l’eau.',
			color: '#b45309'
		}
	],
	width: 520,
	height: 250
});

// ═══════════════════════════════════════════════════════════════════════════════
// LESSONS_4AP_T3 (4 Lessons — yearSubjectId: 599)
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_4AP_T3: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_4ap_t3_eau_nature',
		slug: 'fre-4ap-t3-eau-nature',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: "المشروع الثالث: الماء والبحر والعطلة المفيدة (Projet 3 : L'eau, la mer et les vacances)",
		order: 1,
		titleAr: 'رصيد الماء والبحر والطبيعة الجزائرية (Vocabulaire de l’eau et de la nature)',
		objectives: [
			'حفظ مفردات الماء والبحر والطبيعة الجزائرية (la source, la rivière, la pluie, la mer Méditerranée, la plage)',
			'استعمال أفعال الحفاظ على الماء والبيئة (économiser, protéger, ne pas gaspiller, nettoyer)',
			'التعبير عن قضاء عطلة صيفية مفيدة (lire des livres, réviser le Coran, visiter la famille, garder la plage propre)'
		],
		keywordsAr: ["L'eau", 'la mer', 'la source', 'économiser', 'protéger', 'vacances utiles'],
		discover: {
			scenarioAr:
				'في بداية العطلة الصيفية، زارت عائلة بلال شواطئ جيجل وبجاية على البحر الأبيض المتوسط. رأى بلال منبع ماء عذب في الجبل، فقال له أبوه: «L’eau est une grande richesse. Nous devons l’économiser et garder la plage propre !».',
			svg: svgEauNatureDiscover,
			steps: [
				{
					promptAr: 'ما الكلمات الفرنسية التي تعني: المنبع، المطر، النهر، البحر؟',
					hintAr: 'la source, la pluie, la rivière, la mer.',
					expectedInput: 'la source, la pluie, la rivière, la mer',
					revealAr: 'مصادر الماء وأماكنه: la source (المنبع)، la pluie (المطر)، la rivière (النهر/الوادي)، la mer Méditerranée (البحر الأبيض المتوسط).'
				},
				{
					promptAr: 'ما ضدّ الفعل «gaspiller l’eau» (تبذير الماء) باللغة الفرنسية؟',
					hintAr: 'يقتصد في الماء: économiser l’eau.',
					expectedInput: "économiser l'eau",
					revealAr: 'ضدّ «gaspiller» (يبذّر) هو «économiser» (يقتصد ويحافظ)، فديننا الحنيف ينهانا عن الإسراف والتبذير!'
				},
				{
					promptAr: 'اذكر نشاطين مفيدين يمكن للتلميذ القيام بهما خلال العطلة الصيفية (les vacances utiles).',
					hintAr: 'مثلاً: قراءة الكتب (lire des livres)، زيارة العائلة (visiter la famille)، أو المحافظة على نظافة الشاطئ.',
					expectedInput: 'lire des livres et visiter la famille',
					revealAr: 'من أنشطة العطلة المفيدة: lire des livres utiles، réviser ses leçons، aider ses parents، visiter sa famille في المدن الجزائرية الجميلة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مفردات الماء والطبيعة: l’eau potable (الماء الصالح للشرب)، la source (المنبع)، la rivière (النهر)، la pluie (المطر)، la mer (البحر)، la plage (الشاطئ)، la montagne (الجبل).',
				'أفعال حماية الماء والبيئة: économiser l’eau (الاقتصاد في الماء)، fermer le robinet (إغلاق الحنفية)، protéger la nature (حماية الطبيعة)، ne pas polluer (عدم التلويث).',
				'صفات مفيدة: l’eau est précieuse (الماء ثمين)، la plage est propre (الشاطئ نظيف)، des vacances utiles (عطلة مفيدة).',
				'السلوك الحضاري في الشاطئ والطبيعة: أرمي الفضلات في سلة المهملات (la poubelle) وأحافظ على نظافة بلدي الجزائر.'
			],
			visualSvg: svgEauNatureSummary,
			visualCaptionAr: 'رصيد الماء والطبيعة الجزائرية وأنشطة العطلة المفيدة',
			examples: [
				{
					problemAr: 'أكمل بـ (robinet / gaspiller / propre) :\n1) Il ne faut pas ........ l’eau.\n2) Je ferme le ........ après usage.\n3) Nous gardons la plage ........',
					solutionAr: '1) gaspiller.\n2) robinet.\n3) propre.'
				},
				{
					problemAr: 'اربط كل كلمة بضدّها: propre — économiser — utile',
					solutionAr: 'propre ≠ sale — économiser ≠ gaspiller — utile ≠ inutile.'
				}
			],
			watchOutAr:
				'انتبه لكتابة كلمة «la mer» (البحر) بدون «e» في النهاية، أما «la mère» (الأم) فتُكتب مع accent grave و«e» في النهاية!'
		},
		practice: [
			{
				questionAr: 'ما معنى الفعل «économiser l’eau» باللغة العربية؟',
				options: ['تبذير الماء', 'الاقتصاد في الماء والمحافظة عليه', 'تلويث الماء', 'فتح الحنفية طويلاً'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تبذير الماء هو gaspiller l’eau.',
					'أحسنت! économiser تعني الاقتصاد وعدم التبذير.',
					'تلويث الماء هو polluer l’eau.',
					'ترك الحنفية مفتوحة هو تبذير.'
				],
				explanationAr: 'الفعل «économiser» معناه الاقتصاد والمحافظة على النعمة.'
			},
			{
				questionAr: 'ما الكلمة الفرنسية التي تعني «الشاطئ»؟',
				options: ['la montagne', 'la plage', 'la forêt', 'la rue'],
				correctIndex: 1,
				diagnosticFeedback: [
					'la montagne تعني الجبل.',
					'ممتاز! la plage تعني الشاطئ.',
					'la forêt تعني الغابة.',
					'la rue تعني الشارع.'
				],
				explanationAr: 'الشاطئ بالفرنسية هو «la plage».'
			},
			{
				questionAr: 'ما ضدّ الصفة «propre» (نظيف) باللغة الفرنسية؟',
				options: ['beau', 'grand', 'sale', 'calme'],
				correctIndex: 2,
				diagnosticFeedback: [
					'beau تعني جميل.',
					'grand تعني كبير.',
					'رائع! ضدّ propre (نظيف) هو sale (متسخ).',
					'calme تعني هادئ.'
				],
				explanationAr: 'الضدان في النظافة هما: propre (نظيف) ≠ sale (متسخ).'
			},
			{
				questionAr: 'اختر الكتابة الصحيحة لكلمة «البحر» في الجملة: «Nous regardons ...... Méditerranée.»',
				options: ['la mère', 'la mer', 'le mer', 'la maire'],
				correctIndex: 1,
				diagnosticFeedback: [
					'la mère تعني الأم.',
					'أحسنت! البحر هو «la mer» (بدون accent وبدون e في النهاية).',
					'كلمة mer مؤنث وليست مذكرة.',
					'maire تعني رئيس البلدية.'
				],
				explanationAr: 'البحر يُكتب «la mer»، أما الأم فتُكتب «la mère».'
			},
			{
				questionAr: 'أيّ سلوك يُعدّ تصرفاً حسناً لحماية الماء؟',
				options: [
					'Laisser le robinet ouvert.',
					'Jeter des plastiques dans la rivière.',
					'Fermer le robinet après se laver les mains.',
					'Gaspiller l’eau potable.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ترك الحنفية مفتوحة يبذّر الماء.',
					'رمي البلاستيك يلوّث النهر.',
					'ممتاز! إغلاق الحنفية بعد غسل اليدين يحفظ الماء.',
					'تبذير الماء الصالح للشرب سلوك سيئ.'
				],
				explanationAr: 'من أهم سلوكيات الاقتصاد في الماء: إغلاق الحنفية مباشرة بعد الاستعمال.'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t3_futur_simple',
		slug: 'fre-4ap-t3-futur-simple',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: "المشروع الثالث: الماء والبحر والعطلة المفيدة (Projet 3 : L'eau, la mer et les vacances)",
		order: 2,
		titleAr: 'زمن المستقبل البسيط (Le futur simple : 1er groupe + être et avoir)',
		objectives: [
			'فهم دلالة المستقبل البسيط ومؤشراته الزمنية (demain, bientôt, la semaine prochaine, cet été)',
			'تصريف أفعال الفوج الأول (-er) في المستقبل البسيط (المصدر كاملاً + ai, as, a, ons, ez, ont)',
			'حفظ تصريف الفعلين «être» (ser-) و«avoir» (aur-) في المستقبل البسيط'
		],
		keywordsAr: ['Le futur simple', 'demain / bientôt', '-ai, -as, -a, -ons, -ez, -ont', 'serai', 'aurai'],
		discover: {
			scenarioAr:
				'يخطط أمين وعائلته للعطلة الصيفية المقبلة فيقول: «Cet été, nous visiterons Tipaza. Je nagerai dans la mer propre. Nous serons très contents et nous aurons de beaux souvenirs !».',
			svg: svgFuturDiscover,
			steps: [
				{
					promptAr: 'هل وقعت الأفعال (visiterons, nagerai, serons, aurons) في الماضي أم الحاضر أم المستقبل؟ وكيف عرفت؟',
					hintAr: 'انظر إلى العبارة الزمنية «Cet été» (هذا الصيف القادم).',
					expectedInput: 'futur',
					revealAr: 'ستقع في المستقبل (le futur simple)؛ ويدل على ذلك المؤشر الزمني «Cet été» (مثل demain و bientôt).'
				},
				{
					promptAr: 'لاحظ الفعل «je nagerai» و«nous visiterons». هل حذفنا «-er» من المصدر كما في الحاضر؟',
					hintAr: 'انظر إلى كلمة nager داخل nagerai!',
					expectedInput: 'non',
					revealAr: 'في المستقبل البسيط لأفعال الفوج الأول لا نحذف «-er»، بل نترك المصدر كاملاً (nager, visiter) ونضيف النهايات: -ai, -as, -a, -ons, -ez, -ont!'
				},
				{
					promptAr: 'ما الجذر الخاص بالفعل «être» والفعل «avoir» في المستقبل البسيط؟',
					hintAr: 'être -> ser... ، و avoir -> aur...',
					expectedInput: 'ser- et aur-',
					revealAr: 'فعل «être» جذره «ser-» (je serai, nous serons)، وفعل «avoir» جذره «aur-» (j’aurai, nous aurons)، بنفس النهايات الستة!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المستقبل البسيط (le futur simple) يعبّر عن فعل سيحدث لاحقاً؛ ومن مؤشراته: demain (غداً)، bientôt (قريباً)، la semaine prochaine (الأسبوع القادم)، cet été (هذا الصيف).',
				'قاعدة الفوج الأول (-er): نحتفظ بالمصدر كاملاً (infinitif) ونضيف النهايات: je -> -ai | tu -> -as | il/elle -> -a | nous -> -ons | vous -> -ez | ils/elles -> -ont. مثال (visiter): je visiterai, tu visiteras, il visitera, nous visiterons, vous visiterez, ils visiteront.',
				'فعل «être» في المستقبل البسيط: je serai, tu seras, il/elle sera, nous serons, vous serez, ils/elles seront.',
				'فعل «avoir» في المستقبل البسيط: j’aurai, tu auras, il/elle aura, nous aurons, vous aurez, ils/elles auront.'
			],
			visualSvg: svgFuturSummary,
			visualCaptionAr: 'قاعدة تصريف أفعال الفوج الأول وفعلي être و avoir في المستقبل البسيط',
			examples: [
				{
					problemAr: 'صرّف في المستقبل البسيط:\n1) Demain, tu (protéger) ........ la nature.\n2) Cet été, nous (visiter) ........ Béjaïa.',
					solutionAr: '1) Demain, tu protégeras la nature.\n2) Cet été, nous visiterons Béjaïa.'
				},
				{
					problemAr: 'صرّف (être / avoir) في المستقبل البسيط:\n1) Bientôt, je (être) ........ en 5AP.\n2) Ils (avoir) ........ de bonnes vacances.',
					solutionAr: '1) Bientôt, je serai en 5AP.\n2) Ils auront de bonnes vacances.'
				}
			],
			watchOutAr:
				'احذر حذف حرف «e» قبل «r» في أفعال الفوج الأول بالمستقبل! نكتب «je mangerai» و«nous parlerons» بحرف e قبل r!'
		},
		practice: [
			{
				questionAr: 'صرّف الفعل (visiter) في المستقبل البسيط: «Demain, je ...... la plage de Jijel.»',
				options: ['visite', 'visiterai', 'visiteras', 'visiterons'],
				correctIndex: 1,
				diagnosticFeedback: [
					'visite في الحاضر وليس المستقبل.',
					'أحسنت! المصدر visiter + ai = «je visiterai».',
					'-as تستعمل مع الضمير tu.',
					'-ons تستعمل مع الضمير nous.'
				],
				explanationAr: 'في المستقبل البسيط مع je نكتب المصدر كاملاً + ai: je visiterai.'
			},
			{
				questionAr: 'صرّف الفعل (économiser) في المستقبل البسيط: «Nous ...... l’eau chaque jour.»',
				options: ['économisons', 'économiserai', 'économiserons', 'économiserez'],
				correctIndex: 2,
				diagnosticFeedback: [
					'économisons في الحاضر (ينقصها er للمستقبل).',
					'économiserai تستعمل مع je.',
					'ممتاز! المصدر économiser + ons = «nous économiserons».',
					'économiserez تستعمل مع vous.'
				],
				explanationAr: 'مع الضمير nous نضيف «-ons» إلى المصدر كاملاً: nous économiserons.'
			},
			{
				questionAr: 'صرّف الفعل (être) في المستقبل البسيط: «Bientôt, tu ...... en cinquième année !»',
				options: ['es', 'serai', 'seras', 'sera'],
				correctIndex: 2,
				diagnosticFeedback: [
					'es هو الحاضر وليس المستقبل.',
					'serai تستعمل مع الضمير je.',
					'رائع! تصريف être مع tu في المستقبل هو «tu seras».',
					'sera تستعمل مع il / elle.'
				],
				explanationAr: 'فعل être في المستقبل: je serai, tu seras, il/elle sera.'
			},
			{
				questionAr: 'صرّف الفعل (avoir) في المستقبل البسيط: «Les enfants ...... de beaux livres pour les vacances.»',
				options: ['ont', 'aurons', 'aurez', 'auront'],
				correctIndex: 3,
				diagnosticFeedback: [
					'ont في الحاضر.',
					'aurons تستعمل مع nous.',
					'aurez تستعمل مع vous.',
					'أحسنت! Les enfants = ils، وتصريف avoir في المستقبل هو «auront».'
				],
				explanationAr: 'مع الضمير ils / elles نكتب «auront» (جذر aur- + ont).'
			},
			{
				questionAr: 'صرّف الفعل (nettoyer) أو (protéger) في المستقبل البسيط: «Vous (protéger) ...... la mer.»',
				options: ['protégez', 'protégerai', 'protégerez', 'protégeront'],
				correctIndex: 2,
				diagnosticFeedback: [
					'protégez في الحاضر (ينقصها er للمستقبل).',
					'protégerai تستعمل مع je.',
					'ممتاز! المصدر protéger + ez = «vous protégerez».',
					'protégeront تستعمل مع ils / elles.'
				],
				explanationAr: 'مع الضمير vous نضع المصدر كاملاً + ez: vous protégerez.'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t3_cod_complements',
		slug: 'fre-4ap-t3-cod-complements',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: "المشروع الثالث: الماء والبحر والعطلة المفيدة (Projet 3 : L'eau, la mer et les vacances)",
		order: 3,
		titleAr: 'المفعول به المباشر ومكملات المكان والزمان (Le COD, le CCL et le CCT)',
		objectives: [
			'استخراج المفعول به المباشر (COD) بطرح السؤال: «Qui ?» أو «Quoi ?» بعد الفعل مباشرة',
			'استخراج ظرف المكان (CCL) بطرح السؤال: «Où ?» وظرف الزمان (CCT) بطرح السؤال: «Quand ?»',
			'إثراء جملة بسيطة بمكملات مكان وزمان لكتابة فقرة واضحة وجميلة'
		],
		keywordsAr: ['COD (Qui/Quoi)', 'CCL (Où)', 'CCT (Quand)', 'Compléments', 'Sujet + Verbe'],
		discover: {
			scenarioAr:
				'تقرأ سارة الجملة التالية على السبورة: «Chaque matin, Karim arrose les fleurs dans le jardin.» وطلبت منها الأستاذة الإجابة عن ثلاث أسئلة بسيطة: ماذا يسقي كريم؟ أين؟ متى؟',
			svg: svgCodComplementsDiscover,
			steps: [
				{
					promptAr: 'اطرح السؤال: «Karim arrose QUOI ?» (ماذا يسقي كريم؟). ما الكلمة التي تجيبنا؟',
					hintAr: 'تأتي مباشرة بعد الفعل arrose.',
					expectedInput: 'les fleurs',
					revealAr: '«les fleurs» هو المفعول به المباشر (COD : Complément d’Objet Direct) لأنه يجيب عن السؤال «Quoi ?» ويأتي مباشرة بعد الفعل بدون حرف جر.'
				},
				{
					promptAr: 'اطرح السؤال: «OÙ Karim arrose-t-il les fleurs ?» (أين؟). ماذا نسمي هذا المكمل؟',
					hintAr: 'يدل على المكان: dans le jardin (CCL).',
					expectedInput: 'dans le jardin',
					revealAr: '«dans le jardin» هو مكمل المكان (CCL : Complément Circonstanciel de Lieu) لأنه يجيب عن السؤال «Où ?».'
				},
				{
					promptAr: 'اطرح السؤال: «QUAND Karim arrose-t-il les fleurs ?» (متى؟). ماذا نسمي هذا المكمل؟',
					hintAr: 'يدل على الزمان: Chaque matin (CCT).',
					expectedInput: 'Chaque matin',
					revealAr: '«Chaque matin» هو مكمل الزمان (CCT : Complément Circonstanciel de Temps) لأنه يجيب عن السؤال «Quand ?».'
				}
			]
		},
		summary: {
			rulesAr: [
				'المفعول به المباشر (COD): يتصل بالفعل مباشرة (بدون حرف جر)، ولإيجاده نطرح السؤال «Qui ?» (للشخص) أو «Quoi ?» (للشيء) بعد الفعل: «Amine ferme le robinet.» (Amine ferme quoi ? -> le robinet = COD).',
				'مكمل المكان (CCL — Lieu): يبيّن مكان وقوع الفعل، ولإيجاده نطرح السؤال «Où ?» (أين؟) مثل: «à la plage», «dans la forêt», «en Algérie».',
				'مكمل الزمان (CCT — Temps): يبيّن وقت وقوع الفعل، ولإيجاده نطرح السؤال «Quand ?» (متى؟) مثل: «demain», «cet été», «le matin».',
				'يمكن نقل CCL و CCT داخل الجملة أو حذفهما دون أن تفسد الجملة، أما COD فلا يُحذف غالباً لأنه يكمل معنى الفعل.'
			],
			visualSvg: svgCodComplementsSummary,
			visualCaptionAr: 'تحليل جملة كاملة إلى COD (Quoi) و CCL (Où) و CCT (Quand)',
			examples: [
				{
					problemAr: 'حدّد (COD / CCL / CCT) في الجملة: «Demain, les élèves nettoieront la plage à Skikda.»',
					solutionAr: 'Demain = CCT (Quand ?)\nla plage = COD (nettoieront quoi ?)\nà Skikda = CCL (Où ?).'
				},
				{
					problemAr: 'استخرج المفعول به المباشر (COD) من الجملة: «Lina lit un livre intéressant.»',
					solutionAr: 'Lina lit quoi ? -> «un livre intéressant» (COD).'
				}
			],
			watchOutAr:
				'تذكّر الأسئلة الثلاثة الذهبية: COD = Qui / Quoi؟ — CCL = Où؟ (المكان) — CCT = Quand؟ (الزمان). لا تخلط بين المكان والزمان!'
		},
		practice: [
			{
				questionAr: 'ما السؤال الذي نطرحه بعد الفعل لإيجاد المفعول به المباشر (COD)؟',
				options: ['Où ?', 'Quand ?', 'Qui ? ou Quoi ?', 'Comment ?'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Où ? لإيجاد مكمل المكان (CCL).',
					'Quand ? لإيجاد مكمل الزمان (CCT).',
					'أحسنت! نطرح Qui ? أو Quoi ? بعد الفعل لإيجاد COD.',
					'Comment ? لإيجاد مكمل الحال.'
				],
				explanationAr: 'لإيجاد COD نطرح السؤال: Sujet + Verbe + Qui ? / Quoi ?'
			},
			{
				questionAr: 'في الجملة: «Amine protège la nature.»، ما هو المفعول به المباشر (COD)؟',
				options: ['Amine', 'protège', 'la nature', 'لا يوجد'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Amine هو الفاعل (Sujet).',
					'protège هو الفعل (Verbe).',
					'ممتاز! Amine protège quoi ? -> «la nature» هو COD.',
					'يوجد COD مباشر بعد الفعل protège.'
				],
				explanationAr: '«la nature» تجيب عن السؤال «protège quoi ?» فهي COD.'
			},
			{
				questionAr: 'في الجملة: «Cet été, nous visiterons Tipaza.»، ما وظيفة العبارة «Cet été»؟',
				options: ['Sujet', 'COD', 'CCL (lieu)', 'CCT (temps)'],
				correctIndex: 3,
				diagnosticFeedback: [
					'الفاعل هنا هو الضمير nous.',
					'Tipaza هي COD (visiterons quoi ?).',
					'Cet été تدل على وقت (الصيف) وليس مكاناً.',
					'رائع! Cet été تجيب عن السؤال «Quand ?» فهي مكمل زمان (CCT).'
				],
				explanationAr: '«Cet été» تبيّن زمن الزيارة -> CCT (Complément Circonstanciel de Temps).'
			},
			{
				questionAr: 'في الجملة: «Les poissons nagent dans la mer.»، ما وظيفة العبارة «dans la mer»؟',
				options: ['CCT (temps)', 'CCL (lieu)', 'Verbe', 'Sujet'],
				correctIndex: 1,
				diagnosticFeedback: [
					'dans la mer مكان وليس زماناً.',
					'أحسنت! تجيب عن السؤال «Où ?» فهي مكمل مكان (CCL).',
					'الفعل في الجملة هو nagent.',
					'الفاعل هو Les poissons.'
				],
				explanationAr: '«dans la mer» تدل على المكان (Où ?) -> CCL.'
			},
			{
				questionAr: 'في الجملة: «Le matin, maman prépare le petit-déjeuner dans la cuisine.»، ما هو COD؟',
				options: ['Le matin', 'maman', 'le petit-déjeuner', 'dans la cuisine'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Le matin مكمل زمان (CCT).',
					'maman هي الفاعل (Sujet).',
					'ممتاز! maman prépare quoi ? -> «le petit-déjeuner» هو COD.',
					'dans la cuisine مكمل مكان (CCL).'
				],
				explanationAr: 'الجملة تحتوي على الثلاثة: CCT (Le matin)، COD (le petit-déjeuner)، CCL (dans la cuisine).'
			}
		]
	},
	{
		id: 'fre_lesson_4ap_t3_homophones_accord',
		slug: 'fre-4ap-t3-homophones-accord',
		grade: '4ap',
		yearSubjectId: 599,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: "المشروع الثالث: الماء والبحر والعطلة المفيدة (Projet 3 : L'eau, la mer et les vacances)",
		order: 4,
		titleAr: 'المتشابهات نطقاً (a / à و et / est) ومطابقة الفعل للفاعل (Homophones et accord S-V)',
		objectives: [
			'التمييز الدقيق بين «a» (فعل avoir = avait) و«à» (حرف جر عليه شدة مائلة)',
			'التمييز الدقيق بين «est» (فعل être = était) و«et» (أداة ربط تعني «و»)',
			'مطابقة الفعل مع فاعله مفرداً وجمعاً في الجمل البسيطة (L’enfant joue / Les enfants jouent)'
		],
		keywordsAr: ['a / à', 'et / est', 'Homophones', 'Accord sujet-verbe', 'avait / était'],
		discover: {
			scenarioAr:
				'أثناء الإملاء، سمعت لينا الجملة التالية: «Bilal a une gourde à la main. La mer est calme et propre.» فتعجبت قائلة: نسمع نفس الصوت في (a / à) ونفس الصوت في (est / et)، فكيف نفرّق بينها عند الكتابة؟',
			svg: svgHomophonesDiscover,
			steps: [
				{
					promptAr: 'في جملة «Bilal (a / à) une gourde»، أيّهما يمكن تعويضه بكلمة «avait» (كان عنده)؟',
					hintAr: 'Bilal avait une gourde: الجملة صحيحة! إذن هو الفعل avoir.',
					expectedInput: 'a',
					revealAr: 'إذا أمكن تعويض الكلمة بـ «avait» فهي الفعل «a» (بدون شدة): «Bilal a une gourde». وإذا لم يمكن فهي حرف الجر «à» (مع شدة): «à la main».'
				},
				{
					promptAr: 'في جملة «La mer (est / et) calme (est / et) propre»، أيّهما يمكن تعويضه بـ «était» (كان)؟',
					hintAr: 'La mer était calme: صحيحة! إذن الأولى «est» والثانية للربط «et».',
					expectedInput: 'est / et',
					revealAr: 'إذا أمكن التعويض بـ «était» فهو الفعل «est» (La mer est calme)، وإذا كانت للربط بمعنى «و» فهي «et» (calme et propre).'
				},
				{
					promptAr: 'حوّل الفاعل للجمع وراقب الفعل: «L’élève protège l’eau.» -> «Les élèves ........ l’eau.»',
					hintAr: 'الفاعل جمع (Les élèves = ils)، فماذا نضع في نهاية الفعل؟',
					expectedInput: 'protègent',
					revealAr: 'يتطابق الفعل مع الفاعل دائماً: في المفرد «L’élève protège»، وفي الجمع «Les élèves protègent» (نضيف -ent)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'التمييز بين «a» و«à»: «a» هو فعل avoir في الحاضر ويمكن تعويضه بـ «avait» (Amine a un chapeau). أما «à» فهو حرف جر (préposition) لا يتغير ولا يُعوّض بـ avait (Il va à la mer).',
				'التمييز بين «est» و«et»: «est» هو فعل être في الحاضر ويمكن تعويضه بـ «était» (L’eau est fraîche). أما «et» فهو أداة ربط تعني «و» (الماء والهواء : l’eau et l’air).',
				'مطابقة الفعل للفاعل (l’accord sujet-verbe): يتبع الفعل فاعله في العدد (مفرد / جمع)؛ إذا كان الفاعل مفرداً يكون الفعل مفرداً (Le bateau avance)، وإذا كان الفاعل جمعاً يكون الفعل جمعاً (Les bateaux avancent).',
				'للتأكد من مطابقة الفعل، اسأل دائماً قبل الفعل: «Qui est-ce qui + الفعل؟» لتحدد الفاعل بدقة.'
			],
			visualSvg: svgHomophonesSummary,
			visualCaptionAr: 'حيل سريعة ومضمونة للتمييز بين a/à و est/et وضبط مطابقة الفعل للفاعل',
			examples: [
				{
					problemAr: 'أكمل بـ (a / à) ثم (est / et) :\n1) Sara ...... un livre ...... la bibliothèque.\n2) Le ciel ...... bleu ...... le soleil brille.',
					solutionAr: '1) Sara a un livre à la bibliothèque.\n2) Le ciel est bleu et le soleil brille.'
				},
				{
					problemAr: 'صحّح مطابقة الفعل مع الفاعل: «Les vacances (commence / commencent) en juin.»',
					solutionAr: 'Les vacances commencent en juin (لأن الفاعل Les vacances جمع).'
				}
			],
			watchOutAr:
				'قاعدة الاختبار السريع: «a» -> جرّب «avait» | «est» -> جرّب «était»! إذا صحّ المعنى فاكتب الفعل (a / est)، وإذا لم يصحّ فاكتب (à / et)!'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة بـ «a» أو «à»: «Cet été, Karim va ...... Béjaïa.»',
				options: ['a', 'à', 'as', 'est'],
				correctIndex: 1,
				diagnosticFeedback: [
					'جرّب avait: «Karim va avait Béjaïa» لا معنى لها! إذن ليست فعلاً.',
					'أحسنت! نكتب «à» (حرف جر للمكان) لأننا لا نستطيع تعويضها بـ avait.',
					'as فعل avoir مع الضمير tu.',
					'est فعل être لا يناسب هنا.'
				],
				explanationAr: 'قبل اسم المدينة (Béjaïa) نضع حرف الجر «à» مع accent grave.'
			},
			{
				questionAr: 'أكمل الجملة بـ «a» أو «à»: «Meriem ...... un beau livre de lecture.»',
				options: ['à', 'a', 'et', 'est'],
				correctIndex: 1,
				diagnosticFeedback: [
					'à حرف جر ولا يدل على الملكية.',
					'ممتاز! يمكن القول «Meriem avait un beau livre»، إذن هو الفعل «a».',
					'et أداة ربط تعني «و».',
					'est فعل être لا يعبر عن ملكية الكتاب.'
				],
				explanationAr: 'لأن «a» فعل avoir (يمكن تعويضه بـ avait)، نكتبه بدون accent.'
			},
			{
				questionAr: 'أكمل الجملة بـ «est» أو «et»: «La source ...... propre ...... fraîche.»',
				options: ['et / est', 'est / et', 'est / est', 'et / et'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأولى فعل (La source était propre) والثانية أداة ربط (و).',
					'رائع! «La source est propre et fraîche.» (المنبع نظيف ومنعش).',
					'بين الصفتين نضع أداة الربط «et» وليس الفعل est.',
					'الجملة تحتاج إلى الفعل «est» بعد الفاعل La source.'
				],
				explanationAr: 'الأولى «est» (يمكن تعويضها بـ était)، والثانية «et» للربط بمعنى «و».'
			},
			{
				questionAr: 'اختر الفعل المطابق للفاعل: «Les vagues ...... sur le sable.»',
				options: ['roule', 'roules', 'roulent', 'roulons'],
				correctIndex: 2,
				diagnosticFeedback: [
					'roule للمفرد، والفاعل Les vagues جمع.',
					'roules تستعمل مع الضمير tu.',
					'أحسنت! الفاعل جمع (Les vagues = elles) فنكتب «roulent».',
					'roulons تستعمل مع الضمير nous.'
				],
				explanationAr: 'يتطابق الفعل مع الفاعل الجمع «Les vagues» بأخذ النهاية «-ent».'
			},
			{
				questionAr: 'اختر الجملة الخالية من أي خطأ إملائي:',
				options: [
					'Amine à un ballon et il est à la plage.',
					'Amine a un ballon est il et à la plage.',
					'Amine a un ballon et il est à la plage.',
					'Amine a un ballon et il est a la plage.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'الأولى فعل avoir: نكتب «a» بدون accent.',
					'الربط هو «et» والفعل بعد il هو «est».',
					'ممتاز! a (avait) — et (و) — est (était) — à (حرف جر للمكان).',
					'أمام «la plage» نكتب حرف الجر «à» مع accent.'
				],
				explanationAr: 'Amine a (avait) un ballon et (و) il est (était) à (حرف جر) la plage.'
			}
		]
	}
];
