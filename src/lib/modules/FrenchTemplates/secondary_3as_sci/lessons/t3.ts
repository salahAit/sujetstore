import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T3
// Projet 3 : L'Appel (Texte exhortatif : forêts, sécurité routière, eau, solidarité) + Révision BAC
// 5 Leçons BAC concises, claires et complètes
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T3: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 1 : Les 3 parties de l'Appel (expositive, argumentative, exhortative)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t3_structure_appel',
		slug: 'fre-3as-sci-structure-appel',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 3: النص الندائي / التحسيسي ومراجعة البكالوريا (L’Appel)',
		order: 1,
		titleAr: 'الأقسام الثلاثة لنص النداء (Les 3 parties de l’Appel)',
		objectives: [
			'التعرف على البنية الثلاثية الرسمية لنص النداء: القسم الإخباري (expositive)، القسم الحجاجي (argumentative)، القسم التحريضي (exhortative)',
			'تحديد أطراف وضعية التواصل في النداء: المرسِل (énonciateur)، المرسَل إليه (destinataire)، القضية (problème)، والغاية (but)',
			'تصنيف جمل النص بدقة في جدول البنية الثلاثية الذي يتكرر في مواضيع البكالوريا'
		],
		keywordsAr: ['Appel', 'Partie expositive', 'Partie argumentative', 'Partie exhortative', 'Situation négative'],
		discover: {
			scenarioAr:
				'تأمل نداءً لحماية الغابات الجزائرية: (1) « Chaque été, des milliers d’hectares de forêts algériennes partent en fumée à cause de l’imprudence. » (2) « Il faut agir vite car les arbres protègent nos sols, purifient l’air et préservent la biodiversité. » (3) « Citoyens, nous vous exhortons à signaler tout départ de feu et à participer aux campagnes de reboisement ! » هذا هو التصميم الثلاثي الكلاسيكي لنص النداء (L’Appel) في البكالوريا.',
			svg: svgFrenchWritingBlueprint({
				title: 'Les 3 parties officielles du texte exhortatif (L’Appel)',
				steps: [
					{
						stage: '1. Expositive',
						detail: 'Constat négatif : exposer le problème urgent et ses causes',
						color: '#b45309'
					},
					{
						stage: '2. Argumentative',
						detail: 'Nécessité du changement + arguments (devoir, falloir)',
						color: '#1d4ed8'
					},
					{
						stage: '3. Exhortative',
						detail: 'Lancer l’appel direct : verbes performatifs + impératif',
						color: '#047857'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما اسم الجزء الأول من نص النداء الذي يشخص المشكلة والوضع السلبي القائم (le constat négatif)؟',
					hintAr: 'مشتق من الفعل « exposer ».',
					expectedInput: 'partie expositive',
					revealAr:
						'يُسمى القسم الإخباري / العرضي (la partie expositive) وفيه يعرض الكاتب الواقع السلبي المقلق الذي يبرر إطلاق النداء.'
				},
				{
					promptAr: 'ما الهدف من الجزء الثاني (la partie argumentative) قبل توجيه النداء المباشر؟',
					hintAr: 'لماذا نحتاج لتقديم الحجج وإثبات ضرورة التغيير أولا؟',
					expectedInput: 'convaincre',
					revealAr:
						'يهدف القسم الحجاجي (partie argumentative) إلى إقناع المرسَل إليه بضرورة التغيير وإمكانية الحل (nécessité et possibilité du changement).'
				},
				{
					promptAr: 'ما اسم الجزء الثالث الذي يتضمن فعل النداء الصريح (« nous vous exhortons ») وصيغة الأمر لحث المتلقي على التحرك؟',
					hintAr: 'مشتق من الفعل « exhorter ».',
					expectedInput: 'partie exhortative',
					revealAr:
						'يُسمى القسم الندائي / التحريضي (la partie exhortative أو l’appel proprement dit)، وفيه يدعو الكاتب المتلقي مباشرة للقيام بفعل عملي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'1) القسم الإخباري (La partie expositive): يعرض الوضع السلبي الراهن (constat d’une situation négative / alarmante) بالوقائع والأرقام (مثال: حرائق الغابات، حوادث المرور، تبذير الماء).',
				'2) القسم الحجاجي (La partie argumentative): يُبيّن ضرورة التغيير وإمكانية إنقاذ الوضع (la nécessité et la possibilité de changer la situation) بحجج منطقية وباستعمال أفعال الإلزام والإمكانية (il faut, nous devons, nous pouvons).',
				'3) القسم الندائي / التحريضي (La partie exhortative): يطلق النداء المباشر للمخاطَب (destinataire) بأفعال إنجازية (nous appelons, nous exhortons, nous invitons) وبصيغة الأمر (Protégeons, Respectez) لحثّه على العمل الفوري.',
				'مخطط التواصل في النداء: من يتكلم؟ (L’énonciateur: غالبا جمعية، مواطنون، شباب، بضمير nous) -> إلى من؟ (Le destinataire: المواطنون، السائقون، التلاميذ، بضمير vous) -> حول ماذا؟ (Le problème) -> لماذا؟ (La visée exhortative : inciter à agir).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Schéma de communication dans L’Appel',
				rootLabel: 'Passer d’un constat négatif à une action positive',
				rootSub: 'Qui parle ? À qui ? De quoi ? Dans quel but ?',
				branches: [
					{
						label: 'Partie 1',
						rule: 'Constat alarmant',
						example: 'L’eau diminue chaque été.',
						color: '#b45309'
					},
					{
						label: 'Partie 2',
						rule: 'Raisons d’agir',
						example: 'Il faut agir car l’eau est vie.',
						color: '#1d4ed8'
					},
					{
						label: 'Partie 3',
						rule: 'Appel à l’action',
						example: 'Citoyens, économisons l’eau !',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'الانتقال المنطقي بين الأقسام الثلاثة في نص النداء (L’Appel)',
			examples: [
				{
					problemAr: 'Classez ces deux phrases dans les parties de l’Appel : (a) « Les accidents de la route causent chaque année des centaines de drames familiaux. » (b) « Conducteurs, nous vous appelons à ralentir et à respecter le code de la route ! »',
					solutionAr: '(a) Partie expositive (constat négatif). | (b) Partie exhortative (appel direct avec verbe performatif et destinataire nommé).'
				},
				{
					problemAr: 'Identifiez l’énonciateur et le destinataire dans : « Nous, élèves du lycée, invitons tous les habitants du quartier à participer à la journée de plantation d’arbres. »',
					solutionAr: 'Énonciateur : les élèves du lycée (Nous). | Destinataire : tous les habitants du quartier.'
				}
			],
			watchOutAr:
				'احذر عند تقسيم نص النداء في البكالوريا: القسم الحجاجي (partie argumentative) ليس مجرد وصف للمشكلة، بل يجيب عن سؤال « لماذا يجب أن نتحرك وكيف يمكن التغيير؟ »، أما القسم التحريضي (exhortative) فيبدأ عند توجيه الخطاب المباشر والدعوة الصريحة للفعل (nous appelons / agissons).'
		},
		practice: [
			{
				questionAr: 'Quel est l’ordre logique des trois parties d’un Appel (texte exhortatif) ?',
				options: [
					'Exhortative -> Expositive -> Argumentative',
					'Expositive -> Argumentative -> Exhortative',
					'Argumentative -> Exhortative -> Expositive',
					'Exhortative -> Argumentative -> Expositive'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نبدأ بالنداء قبل شرح المشكلة وإقناع القارئ.',
					'أحسنت! نعرض المشكلة (expositive) ثم نقنع بضرورة الحل (argumentative) ثم نطلق النداء (exhortative).',
					'خطأ: لا بد من تشخيص المشكلة أولا في القسم الإخباري.',
					'خطأ: القسم الندائي هو الذروة الختامية للنص.'
				],
				explanationAr: 'التسلسل الرسمي لنص النداء هو: expositive ثم argumentative ثم exhortative.'
			},
			{
				questionAr: 'À quelle partie de l’Appel appartient la phrase : « En Algérie, le gaspillage domestique aggrave la pénurie d’eau potable durant la saison sèche » ?',
				options: [
					'La partie expositive (constat négatif)',
					'La partie exhortative (appel direct)',
					'La signature de l’auteur',
					'Le contre-argument d’un débat littéraire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الجملة ترصد واقعا سلبيا بالأسباب، وهي تنتمي للقسم الإخباري (expositive).',
					'خطأ: لا يوجد هنا أمر ولا فعل نداء مباشر.',
					'خطأ: التوقيع يأتي في نهاية الوثيقة فقط.',
					'خطأ: نحن في نص نداء تحسيسي لا جدل أدبي.'
				],
				explanationAr: 'عرض الواقع المقلق (تفاقم شح المياه بسبب التبذير) يمثل القسم الإخباري (partie expositive).'
			},
			{
				questionAr: 'À quelle partie de l’Appel appartient : « Chers voisins, unissons nos efforts dès samedi pour nettoyer notre cité ! » ?',
				options: [
					'La partie expositive',
					'La partie argumentative',
					'La partie exhortative',
					'Le chapeau biographique'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا تشرح الجملة أسباب المشكلة بل تدعو للفعل.',
					'خطأ: لا تقدم حجة بل توجه نداء مباشرا.',
					'صحيح! نداء المخاطب (« Chers voisins ») وفعل الأمر (« unissons ») من علامات القسم التحريضي (exhortative).',
					'خطأ: ليست نبذة عن حياة الكاتب.'
				],
				explanationAr: 'توجيه الخطاب المباشر للمرسل إليه مع الأمر « unissons » ينتمي للقسم الندائي (partie exhortative).'
			},
			{
				questionAr: 'Dans la partie argumentative d’un Appel, que cherche à démontrer l’énonciateur ?',
				options: [
					'Que la situation est désespérée et impossible à changer',
					'La nécessité et la possibilité d’agir pour changer la situation négative',
					'L’histoire ancienne des langues européennes',
					'Une simple description neutre sans aucune prise de position'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النداء يُظهر إمكانية التغيير لتحفيز القارئ على العمل لا تيئيسه.',
					'رائع! القسم الحجاجي يثبت وجوب التغيير وإمكانية نجاحه لتشجيع المتلقي على الاستجابة.',
					'خطأ: خارج السياق تماما.',
					'خطأ: نص النداء نص ملتزم يرمي للتغيير وليس وصفا محايدا.'
				],
				explanationAr: 'القسم الحجاجي يقنع المتلقي بضرورة التحرك وبأن التغيير الإيجابي ممكن.'
			},
			{
				questionAr: 'Qui est le « destinataire » dans un Appel intitulé « Appel aux automobilistes pour des routes plus sûres » ?',
				options: [
					'Les historiens du XIXe siècle',
					'Les automobilistes (conducteurs)',
					'Uniquement les fabricants de pneus',
					'Les touristes étrangers uniquement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا علاقة للمؤرخين بهذا النداء.',
					'صحيح! العنوان يحدد بوضوح أن المرسل إليهم هم السائقون (les automobilistes).',
					'خطأ: العنوان يخاطب السائقين لا المصنّعين.',
					'خطأ: النداء موجه لجميع السائقين.'
				],
				explanationAr: 'العنوان « Appel aux automobilistes » يحدد مباشرة المرسَل إليهم (les destinataires).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 2 : Les verbes performatifs et les verbes de modalité
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t3_verbes_performatifs_modalite',
		slug: 'fre-3as-sci-verbes-performatifs-modalite',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 3: النص الندائي / التحسيسي ومراجعة البكالوريا (L’Appel)',
		order: 2,
		titleAr: 'الأفعال الإنجازية وأفعال الإلزام والقدرة في النداء (Verbes performatifs et de modalité)',
		objectives: [
			'تمييز الأفعال الإنجازية (verbes performatifs) وتوظيفها بالصيغة الصحيحة (je / nous + présent de l’indicatif)',
			'توظيف أفعال الإلزام والإمكانية (verbes de modalité: devoir, falloir, pouvoir) في القسم الحجاجي',
			'ضبط التراكيب النحوية مع « il faut » (مصدر أم subjonctif) ومع « appeler à / exhorter à »'
		],
		keywordsAr: ['Verbes performatifs', 'Verbes de modalité', 'Exhorter', 'Appeler', 'Devoir', 'Falloir'],
		discover: {
			scenarioAr:
				'قارن بين هاتين الجملتين في نداء للحفاظ على الماء: (1) « Nous devons réduire notre consommation d’eau et il faut que chaque famille répare les fuites. » (أفعال إلزام في القسم الحجاجي). (2) « Nous vous appelons à préserver chaque goutte et nous exhortons les jeunes à sensibiliser leur entourage. » (أفعال إنجازية في القسم التحريضي، فمجرد قول « nous appelons » يُنجز فعل النداء في اللحظة نفسها!).',
			svg: svgFrenchGrammarMap({
				title: 'Les deux moteurs verbaux de L’Appel',
				rootLabel: 'Verbes de modalité + Verbes performatifs',
				rootSub: 'Convaincre de la nécessité puis lancer l’action',
				branches: [
					{
						label: 'Obligation',
						rule: 'devoir + inf. | il faut + inf./subj.',
						example: 'Il faut que nous agissions.',
						color: '#1d4ed8'
					},
					{
						label: 'Possibilité',
						rule: 'pouvoir + inf. (solution)',
						example: 'Nous pouvons sauver nos forêts.',
						color: '#047857'
					},
					{
						label: 'Performatifs',
						rule: 'je / nous + présent + à + inf.',
						example: 'Nous vous exhortons à agir.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يُسمى الفعل في « Nous vous appelons à protéger la forêt » فعلا إنجازيا (verbe performatif)؟',
					hintAr: 'هل النطق به هو في حد ذاته إنجاز لعملية النداء؟',
					expectedInput: 'réalise l’action',
					revealAr:
						'لأن التلفظ بالفعل بالضمير الأول (je / nous) وفي الحاضر يُنجز الفعل في لحظة الكلام ذاتها (dire, c’est faire : dire « nous appelons », c’est déjà lancer l’appel).'
				},
				{
					promptAr: 'ما الشرطان النحويان لكي يكون الفعل « exhorter » أو « appeler » إنجازيا (performatif) حقا؟',
					hintAr: 'فكر في الضمير (الشخص) وفي الزمن.',
					expectedInput: '1re personne, présent',
					revealAr:
						'يجب أن يُصرّف في ضمير المتكلم (1re personne : je / nous) وفي الحاضر الإخباري (présent de l’indicatif). أما « Il a appelé hier » فليس إنجازيا بل إخبار عن الماضي!'
				},
				{
					promptAr: 'ما الصيغة الفعلية التي تأتي بعد « Il faut que » مقابل « Il faut » وحدها؟',
					hintAr: 'مثال: « Il faut agir » مقابل « Il faut que nous agissions ».',
					expectedInput: 'subjonctif',
					revealAr:
						'بعد « Il faut » دون « que » نضع المصدر (infinitif: Il faut protéger)، وبعد « Il faut que » نضع وجوبا الـ subjonctif (Il faut que nous protégions).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأفعال الإنجازية للنداء (Verbes performatifs): appeler à، exhorter à، inviter à، inciter à، prier de، demander de، conjurer de، encourager à. شرطها: ضمير المتكلم (je / nous) + الحاضر الإخباري (présent de l’indicatif).',
				'أفعال الإلزام والضرورة (Verbes de modalité — obligation / nécessité): devoir + infinitif (Nous devons protéger la nature)، falloir (بصيغة غير شخصية: Il faut + infinitif أو Il faut que + subjonctif)، وكذلك التراكيب الاسمية: il est indispensable de / il est urgent de + infinitif.',
				'فعل الإمكانية والأمل (Possibilité): pouvoir + infinitif (Ensemble, nous pouvons réduire les accidents)؛ وهو ضروري في القسم الحجاجي لإقناع القارئ أن التغيير ممكن وليس مستحيلا.',
				'حرف الجر الصحيح مع الأفعال الإنجازية: « appeler / exhorter / inviter / inciter / encourager + quelqu’un + À + infinitif »، بينما « demander / prier / conjurer + quelqu’un + DE + infinitif ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Construction exacte des verbes de L’Appel',
				subtitle: 'Attention aux prépositions (à / de) et aux modes',
				columns: [
					{
						header: 'Verbe + À + inf.',
						rule: 'appeler, exhorter, inviter',
						examples: 'Nous vous appelons à agir.',
						color: '#047857'
					},
					{
						header: 'Verbe + DE + inf.',
						rule: 'prier, demander, conjurer',
						examples: 'Nous vous prions de réagir.',
						color: '#1d4ed8'
					},
					{
						header: 'Il faut...',
						rule: '+ infinitif OU + que + subj.',
						examples: 'Il faut qu’on soit prudent.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'التراكيب النحوية السليمة للأفعال الإنجازية وأفعال الإلزام في النداء',
			examples: [
				{
					problemAr: 'Transformez en utilisant un verbe performatif : « Respectez les limitations de vitesse sur nos autoroutes ! »',
					solutionAr: 'Nous vous exhortons (ou : nous vous appelons / invitons) à respecter les limitations de vitesse sur nos autoroutes.'
				},
				{
					problemAr: 'Réécrivez avec « Il faut que » : « Les citoyens doivent trier les déchets ménagers. »',
					solutionAr: 'Il faut que les citoyens trient les déchets ménagers.'
				}
			],
			watchOutAr:
				'احذر من فخّين في البكالوريا: (1) الفعل « appeler » بالماضي أو الغائب (« L’association a appelé les jeunes ») ليس فعلا إنجازيا بل خبر؛ ليصبح إنجازيا لا بد من « Nous appelons » في الحاضر! (2) لا تقل أبدا « Nous vous exhortons de protéger » بل « Nous vous exhortons À protéger ».'
		},
		practice: [
			{
				questionAr: 'Dans quelle phrase le verbe est-il employé de manière réellement PERFORMATIVE ?',
				options: [
					'Le maire a appelé les citoyens la semaine dernière.',
					'Nous vous exhortons aujourd’hui à planter un arbre dans votre quartier.',
					'Les associations inviteront les bénévoles l’an prochain.',
					'Il priait souvent ses voisins de fermer les robinets.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل غائب والزمن ماضٍ (خبر عن الماضي وليس فعلا إنجازيا).',
					'أحسنت! ضمير المتكلم « Nous » + الحاضر الإخباري « exhortons » يُنجز فعل النداء لحظة التلفظ.',
					'خطأ: الفاعل غائب والزمن مستقبل.',
					'خطأ: الفاعل غائب والزمن ماضٍ ناقص.'
				],
				explanationAr: 'الفعل الإنجازي يشترط ضمير المتكلم (je / nous) والزمن الحاضر الإخباري (présent de l’indicatif).'
			},
			{
				questionAr: 'Complétez avec la préposition correcte : « Nous invitons chaque conducteur ........ faire preuve de vigilance. »',
				options: ['de', 'à', 'par', 'pour'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل « inviter quelqu’un » يأخذ حرف الجر « à ».',
					'ممتاز! نقول: inviter / appeler / exhorter quelqu’un À + infinitif.',
					'خطأ: حرف الجر « par » لا يناسب هذا التركيب.',
					'خطأ: نحتاج « à » مباشرة بعد « inviter quelqu’un ».'
				],
				explanationAr: 'الفعل « inviter » (مثل appeler و exhorter) يتعدى بحرف الجر « à » قبل المصدر.'
			},
			{
				questionAr: 'Complétez correctement : « Il faut que tous les élèves ........ conscients de la valeur de l’eau. »',
				options: ['sont', 'soient', 'seront', 'étaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « sont » في الإخباري، بينما « Il faut que » تفرض الـ subjonctif.',
					'رائع! « soient » هو تصريف « être » في الـ subjonctif présent مع الجمع.',
					'خطأ: المستقبل لا يلي « Il faut que ».',
					'خطأ: الماضي الناقص غير صحيح هنا.'
				],
				explanationAr: 'بعد التركيب الإلزامي « Il faut que » يُصرف الفعل وجوبا في الـ subjonctif présent: soient.'
			},
			{
				questionAr: 'Quelle nuance exprime le verbe de modalité « pouvoir » dans : « En adoptant des gestes simples, nous pouvons sauver nos forêts » ?',
				options: ['L’interdiction absolue', 'La possibilité d’agir et de réussir le changement', 'Le regret d’un fait passé', 'Le doute total'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المنع يُعبر عنه بـ « ne pas devoir / interdire ».',
					'صحيح! الفعل « pouvoir » يُبرز إمكانية التغيير الإيجابي لتشجيع المتلقي.',
					'خطأ: لا يوجد ندم هنا.',
					'خطأ: الجملة تحفز بثقة وإيجابية.'
				],
				explanationAr: 'في القسم الحجاجي من النداء، يدل فعل الإمكانية « pouvoir » على أن الحل متاح وقابل للتحقيق.'
			},
			{
				questionAr: 'Réécrivez en remplaçant « devoir » par « falloir + infinitif » : « Nous devons aider les familles démunies. »',
				options: [
					'Il faut aider les familles démunies.',
					'Nous fallons aider les familles démunies.',
					'Il faut que aider les familles démunies.',
					'Il faut aidons les familles démunies.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « falloir » فعل غير شخصي يُصرف فقط مع « Il » ويتبعه المصدر مباشرة: Il faut aider.',
					'خطأ: « falloir » لا يُصرف أبدا مع « nous » أو « je »!',
					'خطأ: لا نضع « que » قبل المصدر مباشرة.',
					'خطأ: بعد « Il faut » نضع المصدر « aider » لا فعلا مصرفا.'
				],
				explanationAr: 'الفعل « falloir » غير شخصي (impersonnel)؛ نكتب « Il faut + infinitif » أو « Il faut que + sujet + subjonctif ».'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 3 : L'impératif présent, le subjonctif présent et le futur simple
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t3_imperatif_subjonctif_futur',
		slug: 'fre-3as-sci-imperatif-subjonctif-futur',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 3: النص الندائي / التحسيسي ومراجعة البكالوريا (L’Appel)',
		order: 3,
		titleAr: 'صيغ الأمر والنصب والمستقبل البسيط في نص النداء (Impératif, subjonctif, futur)',
		objectives: [
			'تصريف الأفعال في الأمر الحاضر (impératif présent) مع الضمائر الثلاثة وفهم قيمته التحريضية (exhortation / conseil)',
			'توظيف الـ subjonctif présent بعد عبارات الإلزام والغاية (il faut que, afin que, pour que)',
			'توظيف المستقبل البسيط (futur simple) لإبراز الثمرة الإيجابية الموعودة عند الاستجابة للنداء'
		],
		keywordsAr: ['Impératif présent', 'Subjonctif présent', 'Futur simple', 'Afin que', 'Exhortation'],
		discover: {
			scenarioAr:
				'تأمل خاتمة نداء للسلامة المرورية: « Conducteurs, ralentissez aux abords des écoles et restons tous solidaires afin que chaque enfant rentre sain et sauf ! Ainsi, nos routes deviendront plus sûres pour tous. » جمعت هذه الخاتمة الأزمنة والصيغ الثلاثة الكبرى لنص النداء: الأمر (ralentissez, restons)، الـ subjonctif بعد الغاية (afin que... rentre)، والمستقبل البسيط للنتيجة المأمولة (deviendront).',
			svg: svgFrenchTenseTimeline({
				title: 'Projection temporelle dans L’Appel',
				tenseName: 'Impératif + Subjonctif + Futur simple',
				formula: 'Agissez maintenant (Imp.) -> afin que + Subj. -> Résultat positif (Futur)',
				activeZone: 'future',
				example: 'Protégeons nos forêts afin qu’elles survivent et embellissent demain notre pays.',
				markers: 'dès aujourd’hui, ensemble, afin que, demain, ainsi'
			}),
			steps: [
				{
					promptAr: 'كم ضميرا يُصرف معها فعل الأمر (impératif présent) في الفرنسية، وهل نكتب الضمير أمامه؟',
					hintAr: 'تذكر: Protège ! Protégeons ! Protégez !',
					expectedInput: '3 sans pronom',
					revealAr:
						'يُصرف الأمر مع 3 أشخاص فقط (tu, nous, vous) ودون كتابة الضمير الشخصي أمام الفعل: Protège / Protégeons / Protégez.'
				},
				{
					promptAr: 'ما الفرق الإملائي المهم في نهاية الفوج الأول (-er) في الأمر مع المفرد « tu »؟',
					hintAr: 'هل نكتب « Protèges la forêt ! » أم « Protège la forêt ! »؟',
					expectedInput: 'sans s',
					revealAr:
						'في أفعال الفوج الأول (-er) وكذلك « aller » (va)، نحذف حرف « s » في الأمر مع المفرد (Protège ! Parle ! Respecte !).'
				},
				{
					promptAr: 'لماذا يُختم نص النداء غالبا بأفعال في المستقبل البسيط مثل « Nos villes deviendront plus propres »؟',
					hintAr: 'إنه يُظهر للمتلقي النتيجة الإيجابية التي ستتحقق في الغد إذا استجاب للنداء.',
					expectedInput: 'espoir futur',
					revealAr:
						'يُستعمل المستقبل البسيط (futur simple) للتعبير عن الأمل والنتيجة الإيجابية الموعودة (promesse / projection optimiste) لتحفيز المتلقي على التحرك.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأمر الحاضر (L’impératif présent): يُصرف دون ضمير مع 3 أشخاص فقط (2e sg, 1re pl, 2e pl). أفعال « -er » تحذف « s » مع المفرد (Respecte, Plante). أفعال شاذة يجب حفظها: être (sois, soyons, soyez)، avoir (aie, ayons, ayez)، savoir (sache, sachons, sachez). استعمال « nous » (Protégeons) يُشرك الكاتب مع المتلقي ويُقوّي روح التضامن.',
				'صيغة الـ Subjonctif présent: تُستعمل وجوبا بعد: الإلزام (il faut que, il est essentiel que)، الإرادة (nous voulons que, nous souhaitons que)، والغاية (pour que, afin que). مثال: « Agissons afin que nos enfants vivent dans un pays propre. »',
				'المستقبل البسيط (Le futur simple): يُستعمل لوعد المتلقي بنتيجة إيجابية ملموسة إذا استجاب للنداء (Ensemble, nous préserverons nos ressources et nous bâtirons un avenir meilleur).',
				'الفرق في التعبير عن الغاية (Le but): إذا اختلف الفاعلان نستعمل « pour que / afin que + subjonctif »، وإذا كان الفاعل واحدا نستعمل « pour / afin de + infinitif »!'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Modes et temps incontournables de L’Appel',
				subtitle: 'Bien maîtriser les irréguliers clés pour le BAC',
				columns: [
					{
						header: 'Impératif',
						rule: 'Sans pronom sujet',
						examples: 'Sois, Soyons, Soyez | Agissons',
						color: '#047857'
					},
					{
						header: 'Subjonctif',
						rule: 'Après il faut que / afin que',
						examples: 'qu’il soit, qu’ils fassent',
						color: '#1d4ed8'
					},
					{
						header: 'Futur simple',
						rule: 'Espoir et résultat promis',
						examples: 'nous sauv-erons, ils verr-ont',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الأزمنة والصيغ الثلاثة المميزة لنص النداء ووظيفتها التداولية في البكالوريا',
			examples: [
				{
					problemAr: 'Mettez les verbes entre parenthèses aux modes convenables : « (Être, 1re pl. impératif) prudents au volant afin que nos familles (vivre) en sécurité. »',
					solutionAr: 'Soyons prudents au volant afin que nos familles vivent en sécurité.'
				},
				{
					problemAr: 'Reliez par un rapport de but : « Les bénévoles plantent des arbres. La forêt retrouvera sa verdure. »',
					solutionAr: 'Les bénévoles plantent des arbres afin que (ou : pour que) la forêt retrouve sa verdure. (Deux sujets différents -> subjonctif !)'
				}
			],
			watchOutAr:
				'احذر من فخّين متكررين في البكالوريا: (1) لا تكتب أبدا « Afin que nous pouvons » بل « Afin que nous puissions » (الـ subjonctif إلزامي بعد afin que / pour que). (2) لا تستعمل « afin que » إذا كان الفاعل واحدا في الجملتين! لا تقل « Je plante un arbre afin que je protège la nature » بل « Je plante un arbre afin de protéger la nature ».'
		},
		practice: [
			{
				questionAr: 'Quelle forme de l’impératif présent du verbe « être » est correcte pour impliquer l’auteur et les lecteurs ensemble ?',
				options: ['Nous soyons', 'Soyons', 'Sommes', 'Sois'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: فعل الأمر لا يُسبق بالضمير الشخصي أبدا.',
					'أحسنت! « Soyons » (لنكن) هي صيغة الأمر الشاذة للفعل « être » مع المتكلم الجمع دون ضمير.',
					'خطأ: « sommes » للحاضر الإخباري وليست للأمر.',
					'خطأ: « Sois » للمفرد المخاطب (tu) ولا تشمل المتكلم مع الجماعة.'
				],
				explanationAr: 'صيغة الأمر للفعل « être » مع المتكلم الجمع هي « Soyons » دون ضمير فاعل.'
			},
			{
				questionAr: 'Complétez correctement : « Économisons l’eau potable afin que les générations futures ........ en bénéficier. »',
				options: ['peuvent', 'pourront', 'puissent', 'pouvaient'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « peuvent » في الحاضر الإخباري.',
					'خطأ: المستقبل لا يأتي بعد « afin que ».',
					'ممتاز! بعد « afin que » نضع وجوبا الـ subjonctif: « puissent ».',
					'خطأ: الماضي الناقص غير صحيح بعد رابط الغاية.'
				],
				explanationAr: 'الرابط « afin que » يفرض الـ subjonctif présent: pouvoir -> qu’elles puissent.'
			},
			{
				questionAr: 'Reliez correctement (même sujet) : « Les lycéens lancent une campagne. Ils veulent sensibiliser leurs camarades. »',
				options: [
					'Les lycéens lancent une campagne afin qu’ils sensibilisent leurs camarades.',
					'Les lycéens lancent une campagne afin de sensibiliser leurs camarades.',
					'Les lycéens lancent une campagne pour qu’ils sensibiliser leurs camarades.',
					'Les lycéens lancent une campagne grâce à sensibiliser leurs camarades.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل واحد في الجملتين (Les lycéens)، لذا يجب استعمال « afin de + infinitif ».',
					'رائع! عند اتحاد الفاعل نستعمل « afin de / pour + infinitif » ونحذف « veulent ».',
					'خطأ: تركيب غير سليم نحويا.',
					'خطأ: « grâce à » للسبب لا للغاية.'
				],
				explanationAr: 'مع فاعل واحد في الجملتين نعبر عن الغاية بـ « afin de / pour + infinitif ».'
			},
			{
				questionAr: 'Quelle phrase est correctement orthographiée à l’impératif présent (2e personne du singulier) ?',
				options: [
					'Protèges la forêt algérienne !',
					'Protège la forêt algérienne !',
					'Tu protège la forêt algérienne !',
					'Protèger la forêt algérienne !'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: أفعال الفوج الأول (-er) تحذف حرف « s » في الأمر مع المفرد.',
					'صحيح! « Protège » دون « s » ودون ضمير فاعل.',
					'خطأ: لا نكتب الضمير « Tu » في صيغة الأمر.',
					'خطأ: « Protéger » مصدر وليس صيغة أمر مصرف مع المفرد.'
				],
				explanationAr: 'في الأمر الحاضر مع المفرد، تحذف أفعال الفوج الأول حرف « s »: Protège !'
			},
			{
				questionAr: 'Quel effet produit le futur simple dans la dernière phrase d’un Appel : « Grâce à votre mobilisation, nos forêts retrouveront leur éclat » ?',
				options: [
					'Rappeler un événement du XIXe siècle',
					'Projeter un résultat positif et motiver le destinataire à agir',
					'Exprimer un ordre sévère immédiat',
					'Dénoncer l’inutilité de toute action'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المستقبل البسيط يتطلع للغد لا للماضي.',
					'أحسنت! المستقبل البسيط يرسم ثمرة الاستجابة للنداء ويشجع القارئ على المبادرة.',
					'خطأ: الأمر المباشر يُصاغ بالـ impératif.',
					'خطأ: الجملة متفائلة ومحفزة على العمل.'
				],
				explanationAr: 'يُستعمل المستقبل البسيط في نهاية النداء لرسم أفق إيجابي واعد يحفز على الاستجابة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 4 : La cohérence, le lexique de l'engagement et la visée exhortative
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t3_coherence_engagement_visee',
		slug: 'fre-3as-sci-coherence-engagement-visee',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 3: النص الندائي / التحسيسي ومراجعة البكالوريا (L’Appel)',
		order: 4,
		titleAr: 'الاتساق ومعجم الالتزام والهدف التحريضي في النداء (Cohérence, engagement et visée)',
		objectives: [
			'التمييز بين المعجم المنذر بالخطر (lexique de l’alerte) ومعجم الالتزام والعمل (lexique de l’engagement)',
			'تحديد الهدف التواصلي لنص النداء (la visée exhortative) وتمييزه عن النص التاريخي والنص الحجاجي',
			'مراجعة شاملة لأسئلة الترابط والاتساق (remettre en ordre, substituts, visée) للبكالوريا'
		],
		keywordsAr: ['Visée exhortative', 'Engagement', 'Solidarité', 'Cohérence', 'Destinataire'],
		discover: {
			scenarioAr:
				'في مواضيع البكالوريا، تتكرر أسئلة تمييز نوع النص وهدفه التواصلي بين المشاريع الثلاثة: إذا كان النص يخبر عن الثورة -> هدفه إخباري/تخليدي (informative / commémorative). إذا كان يعرض رأيين متقابلين -> هدفه حجاجي إقناعي (argumentative / convaincre). أما إذا كان ينبّه من خطر ويخاطب القارئ لحثّه على فعل فوري -> فهدفه تحريضي ندائي (visée exhortative : inciter le destinataire à agir / réagir).',
			svg: svgFrenchGrammarMap({
				title: 'Révision BAC : Les 3 Visées Communicatives de 3AS',
				rootLabel: 'Identifier sans erreur le projet et la visée',
				rootSub: 'Question fréquente (1 à 1.5 pt) en fin de Compréhension',
				branches: [
					{
						label: 'Projet 1 (Histoire)',
						rule: 'Informer / Commémorer',
						example: 'Rendre hommage aux martyrs',
						color: '#1d4ed8'
					},
					{
						label: 'Projet 2 (Débat)',
						rule: 'Convaincre / Réfuter',
						example: 'Défendre une thèse par preuves',
						color: '#b45309'
					},
					{
						label: 'Projet 3 (Appel)',
						rule: 'Exhorter / Inciter à agir',
						example: 'Mobiliser contre un danger',
						color: '#047857'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصفة الدقيقة التي نُطلقها على الهدف التواصلي لنص النداء (L’Appel) في البكالوريا؟',
					hintAr: 'صفة مشتقة من الفعل « exhorter ».',
					expectedInput: 'exhortative',
					revealAr:
						'تُسمى الغاية التحريضية أو الندائية: « une visée exhortative » (الهدف: sensibiliser et inciter le destinataire à agir).'
				},
				{
					promptAr: 'إلى أي حقل معجمي تنتمي الكلمات: « solidarité, mobilisation, bénévolat, responsabilité, entraide »؟',
					hintAr: 'إنها كلمات العمل المدني والالتزام الجماعي.',
					expectedInput: 'engagement',
					revealAr:
						'تنتمي إلى الحقل المعجمي للالتزام والتضامن (champ lexical de l’engagement / de la solidarité civique).'
				},
				{
					promptAr: 'كيف نعرف بسرعة أن نصا في البكالوريا هو « Appel » (مشروع 3) وليس مجرد « Débat d’idées » (مشروع 2)؟',
					hintAr: 'ابحث عن مخاطبة مباشرة (vous / citoyens)، أفعال أمر، وأفعال إنجازية (nous appelons).',
					expectedInput: 'impératif, appelons',
					revealAr:
						'يتميز النداء بمخاطبة صريحة للمرسل إليه (vous / Citoyens)، وأفعال إلزام (il faut, nous devons)، وأفعال إنجازية وأمرية تدعو لتحرك عملي فوري.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الهدف التواصلي للنداء (Visée exhortative): يحذّر من خطر حقيقي (alerter / sensibiliser) ويحثّ المتلقي على تغيير سلوكه أو المشاركة في عمل إيجابي (inciter / exhorter à agir).',
				'الحقلان المعجميان الرئيسيان في النداء: 1) معجم الخطر والتنبيه في القسم الإخباري (péril, urgence, fléau, gaspillage, incendie, menace). 2) معجم الالتزام والأمل في القسمين الحجاجي والندائي (mobilisation, vigilance, solidarité, bénévolat, préserver, agir, sauver).',
				'قواعد الاتساق النصي (Cohérence textuelle) لأسئلة البكالوريا: الترتيب المنطقي للفقرات (مشكلة -> حجة -> نداء)، احترام الضمائر والبدائل (nous = المرسل، vous = المرسل إليه، أو nous الشاملة = المرسل + المتلقي معا)، وتناسق الروابط المنطقية.',
				'مقارنة سريعة للمراجعة الشاملة (3AS): المشروع 1 (تواريخ + ماضٍ / مضارع تاريخي -> إخبار وتوثيق) | المشروع 2 (أطروحة + أطروحة مضادة + concession -> إقناع وتفنيد) | المشروع 3 (وضع سلبي + il faut / devoir + nous appelons / impératif -> تحفيز على العمل).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Lexique clé de L’Appel (Alerte -> Action)',
				subtitle: 'Vocabulaire prêt à l’emploi pour Compréhension et Production',
				columns: [
					{
						header: 'Alerte (P1)',
						rule: 'Décrire la menace',
						examples: 'fléau, urgence, pénurie, danger',
						color: '#b45309'
					},
					{
						header: 'Devoir (P2)',
						rule: 'Justifier l’action',
						examples: 'responsabilité, vital, nécessaire',
						color: '#1d4ed8'
					},
					{
						header: 'Engagement (P3)',
						rule: 'Mobiliser le public',
						examples: 'solidarité, agir, reboiser, sauver',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'المعجم المتدرج في نص النداء من التنبيه بالخطر إلى المسؤولية ثم الالتزام العملي',
			examples: [
				{
					problemAr: 'Question BAC : Quelle est la valeur du pronom « nous » dans : « Ensemble, nous devons protéger les ressources hydriques de notre pays » ?',
					solutionAr: 'C’est un « nous » inclusif : il associe l’auteur (l’énonciateur) et les lecteurs (les destinataires) pour créer un sentiment de responsabilité collective.'
				},
				{
					problemAr: 'Question BAC : Formulez la visée communicative d’un appel contre les incendies de forêts en Algérie.',
					solutionAr: 'L’auteur a une visée exhortative : il cherche à sensibiliser les citoyens à la gravité des incendies de forêts et à les inciter à agir concrètement pour préserver ce patrimoine naturel.'
				}
			],
			watchOutAr:
				'احذر من الخلط بين « nous » الحصرية (exclusif: تمثل المرسل فقط مثل « Nous, membres de l’association, vous appelons... ») و « nous » الشاملة (inclusif: تجمع المرسل والمتلقي معا مثل « Protégeons notre environnement ! »). التمييز بينهما سؤال متكرر في البكالوريا!'
		},
		practice: [
			{
				questionAr: 'Quelle est la visée communicative d’un Appel (Projet 3) ?',
				options: [
					'Une visée uniquement ludique pour divertir',
					'Une visée exhortative : sensibiliser et inciter le destinataire à agir concrètement',
					'Une visée strictement biographique',
					'Une visée neutre sans aucun but de changement'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النداء نص جاد يتناول قضايا مصيرية كالبيئة والسلامة والتضامن.',
					'أحسنت! الغاية الندائية (exhortative) تهدف للتحسيس والتحفيز على الفعل الإيجابي.',
					'خطأ: السيرة الذاتية ليست هدف نص النداء.',
					'خطأ: جوهر النداء هو السعي إلى تغيير وضع سلبي قائم.'
				],
				explanationAr: 'يتميز نص النداء بغاية تحريضية (visée exhortative) لحث المتلقي على التحرك الإيجابي.'
			},
			{
				questionAr: 'Dans « Nous, jeunes bénévoles du croissant citoyen, nous vous invitons à donner des livres scolaires », qui représente le pronom « Nous » ?',
				options: [
					'L’auteur et les destinataires ensemble (nous inclusif)',
					'Uniquement les énonciateurs : les jeunes bénévoles (nous exclusif)',
					'Uniquement les autorités locales',
					'Un pronom indéfini sans référent précis'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لاحظ وجود « vous » بجانب « nous »، فكل ضمير يشير لطرف مستقل.',
					'ممتاز! هذا « nous exclusif » يمثل المرسلين فقط (les jeunes bénévoles)، بينما « vous » يمثل المرسل إليهم.',
					'خطأ: العبارة تحدد بوضوح « jeunes bénévoles ».',
					'خطأ: المرجع محدد وصريح داخل الجملة.'
				],
				explanationAr: 'عندما يقابل « nous » الضمير « vous » في الجملة نفسها، يكون « nous » حصريا للمرسل فقط.'
			},
			{
				questionAr: 'Dans « Protégeons nos routes, sauvons des vies ! », quel est l’effet du « nous » implicite de l’impératif ?',
				options: [
					'Exclure l’auteur de toute responsabilité',
					'Impliquer ensemble l’auteur et les lecteurs dans un devoir commun (nous inclusif)',
					'S’adresser uniquement à un enfant',
					'Raconter un souvenir passé'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بل يُشرك الكاتب نفسه مع القراء.',
					'صحيح! الأمر بصيغة الجمع المتكلم (Protégeons, sauvons) يجمع الكاتب والمخاطب في مسؤولية مشتركة.',
					'خطأ: صيغة الجمع تشمل الجميع.',
					'خطأ: الأمر يتجه للحاضر والمستقبل لا الماضي.'
				],
				explanationAr: 'الأمر بصيغة « nous » يُشرك المرسل مع المرسل إليه لتقوية روح التضامن والالتزام.'
			},
			{
				questionAr: 'Parmi ces mots, lequel appartient au champ lexical de l’ENGAGEMENT citoyen ?',
				options: ['Indifférence', 'Mobilisation', 'Paresse', 'Négligence'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Indifférence » (اللامبالاة) ضد الالتزام.',
					'أحسنت! « Mobilisation » (التعبئة والمشاركة) من صميم معجم الالتزام.',
					'خطأ: « Paresse » (الكسل) تعاكس الالتزام.',
					'خطأ: « Négligence » (الإهمال) سبب للمشاكل لا علامة التزام.'
				],
				explanationAr: 'كلمة « mobilisation » تنتمي لمعجم الالتزام والعمل التضامني.'
			},
			{
				questionAr: 'Si un texte du BAC contient des dates de 1954 à 1962 et des témoignages de moudjahidine sans verbe performatif d’appel, de quel projet relève-t-il ?',
				options: [
					'Projet 3 : L’Appel',
					'Projet 1 : Le texte d’histoire',
					'Projet 2 : Le débat sur les écrans',
					'Un mode d’emploi technique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد فعل إنجازي للنداء ولا دعوة لمبادرة مستقبلية.',
					'ممتاز! التواريخ الثورية (1954-1962) والشهادات التاريخية تحدد المشروع الأول (Texte d’histoire).',
					'خطأ: لا يتناول مناظرة حول الشاشات.',
					'خطأ: نص تاريخي وليس دليلا تقنيا.'
				],
				explanationAr: 'التعرف الصحيح على المشروع (تاريخي / مناظرة / نداء) هو المفتاح الأول لنجاح التقرير الموضوعي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 5 : Plan complet de la Production Écrite BAC Scientifique (Sujet 1 / Sujet 2)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t3_production_ecrite_bac',
		slug: 'fre-3as-sci-production-ecrite-bac',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't3',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 3: النص الندائي / التحسيسي ومراجعة البكالوريا (L’Appel)',
		order: 5,
		titleAr: 'المخطط الشامل للوضعية الإدماجية في البكالوريا العلمية (Compte rendu / Rédiger un Appel)',
		objectives: [
			'الاختيار الذكي يوم البكالوريا بين الموضوع الأول (Compte rendu objectif) والموضوع الثاني (Production libre / Appel)',
			'إتقان منهجية كتابة « Compte rendu objectif » لنص النداء (المشروع 3) بدقة كاملة',
			'إتقان تحرير « Appel » كامل ومنظم من 3 فقرات (expositive + argumentative + exhortative) لنيل 6/6'
		],
		keywordsAr: ['Production écrite BAC', 'Compte rendu objectif', 'Rédiger un Appel', 'Barème 6 pts', 'Révision finale'],
		discover: {
			scenarioAr:
				'في يوم امتحان البكالوريا (الشعب العلمية والتسيير، المدة 02h30، المعامل 2)، تُمثل الوضعية الإدماجية 6 نقاط حاسمة من أصل 20، وتمنحك خيارين: الموضوع 1 هو التقرير الموضوعي (Compte rendu objectif) لنص الامتحان، والموضوع 2 هو تحرير نص حر (غالبا نداء حول قضية بيئية أو اجتماعية أو مقال حجاجي). إتقان المخططين معا يمنحك ثقة كاملة يوم الامتحان!',
			svg: svgFrenchWritingBlueprint({
				title: 'Stratégie Production Écrite BAC Sci (6 points)',
				steps: [
					{
						stage: 'Sujet 1 (C.R.O)',
						detail: 'Intro (paratexte + thème) + Résumé objectif (3e pers., sans avis)',
						color: '#1d4ed8'
					},
					{
						stage: 'Sujet 2 (Appel)',
						detail: 'Titre incitatif + P1 Expositive + P2 Argumentative + P3 Exhortative',
						color: '#047857'
					},
					{
						stage: 'Outils langue',
						detail: 'Connecteurs, verbes performatifs, modalité, impératif, futur',
						color: '#b45309'
					},
					{
						stage: 'Relecture',
						detail: 'Accords, conjugaison, ponctuation, propreté (10 min avant fin)',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في التقرير الموضوعي لنص نداء (Sujet 1 — Projet 3)، ما نوع النص وما الفعل المناسب للتعبير عن هدف الكاتب؟',
					hintAr: 'نكتب: Ce texte exhortatif (un appel)... l’auteur exhorte / appelle à...',
					expectedInput: 'texte exhortatif',
					revealAr:
						'نقدم النص بـ « Ce texte exhortatif (ou : cet appel), intitulé "..."... » ونُبرز في العرض أن الكاتب يشخص المشكلة ثم يقدم حججا ثم يدعو المتلقي للتحرك (exhorte / appelle les citoyens à...).'
				},
				{
					promptAr: 'إذا اخترت الموضوع الثاني (Rédiger un Appel) حول حماية الغابات أو السلامة المرورية، كم فقرة يجب أن يتكون منها نصك؟',
					hintAr: 'فقرة لكل قسم من أقسام النداء الثلاثة مع عنوان جذاب.',
					expectedInput: '3 paragraphes',
					revealAr:
						'نكتب عنوانا محفزا ثم 3 فقرات واضحة ومنفصلة بمسافة بادئة (alinéa): الفقرة 1 إخبارية (المشكلة)، الفقرة 2 حجاجية (لماذا وكيف نتحرك)، الفقرة 3 ندائية (النداء الصريح بالأمر والفعل الإنجازي).'
				},
				{
					promptAr: 'كم عدد النقاط المخصص للوضعية الإدماجية في بكالوريا الشعب العلمية والتسيير، وما أهم معيارين في التصحيح؟',
					hintAr: 'المجموع 20 = 14 فهما وبناء لغويا + ...',
					expectedInput: '6 points',
					revealAr:
						'تُنقّط الوضعية الإدماجية على 6 نقاط (6/20)، وأهم معاييرها: الالتزام بالتعليمة والملاءمة (pertinence)، التنظيم والاتساق (cohérence)، سلامة اللغة والصرف (correction linguistique)، والإتقان والنظافة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'خيار Sujet 1 — التقرير الموضوعي لنص النداء: (مقدمة) « Cet appel (texte exhortatif), intitulé "...", écrit par [Auteur], extrait de [Source], sensibilise les [destinataires] à [problème]. » (عرض) « Dans un premier temps, l’auteur expose le constat alarmant de... Ensuite, il montre la nécessité d’agir en soulignant que... Enfin, il exhorte [les destinataires] à [actions proposées] afin de... » (دون رأي شخصي).',
				'خيار Sujet 2 — تحرير نداء متكامل (100 إلى 140 كلمة): عنوان قوي (مثال: « Sauvons nos forêts avant qu’il ne soit trop tard ! ») + الفقرة 1 (Expositive: تشخيص الخطر بالأسباب والنتائج) + الفقرة 2 (Argumentative: توظيف il faut, nous devons, nous pouvons + حجتين واضحتين بـ D’une part / D’autre part) + الفقرة 3 (Exhortative: توجيه الخطاب « Chers citoyens, nous vous appelons à... Agissons dès aujourd’hui afin que... ! » + توقيع).',
				'توزيع الوقت الذهبي في امتحان البكالوريا (02h30): 20 دقيقة لقراءة النص وفهمه جيدا، 60 دقيقة لأسئلة الفهم والبناء اللغوي (14 نقطة)، 55 دقيقة لتحرير ومراجعة الوضعية الإدماجية على المسودة ثم ورقة الإجابة (6 نقاط)، و15 دقيقة للمراجعة النهائية الشاملة.',
				'قائمة التحقق الأخيرة قبل تسليم الورقة: هل ذكرتُ الكاتب والمصدر في التقرير؟ هل حذفتُ ضمير « je » في التقرير الموضوعي؟ هل طابقتُ الصفات وأسماء المفعول؟ هل استعملتُ علامات الترقيم (الفاصلة، النقطة، علامة التعجب في النداء)؟'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Checklist de réussite : Choisir entre Sujet 1 et Sujet 2',
				rootLabel: 'Production écrite BAC (6 / 20)',
				rootSub: 'Les deux sujets mènent à 6/6 si la méthode est respectée',
				branches: [
					{
						label: 'Sujet 1 : C.R.O.',
						rule: 'Si le texte est bien compris',
						example: 'Reformuler sans recopier',
						color: '#1d4ed8'
					},
					{
						label: 'Sujet 2 : Libre',
						rule: 'Si tu maîtrises le thème',
						example: '3 parties + lexique riche',
						color: '#047857'
					},
					{
						label: 'Correction (2 pts)',
						rule: 'Verbes + Accords + Clarté',
						example: 'Phrases courtes et exactes',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل القرار السريع يوم الامتحان ومعايير حصد العلامة الكاملة في الوضعية الإدماجية',
			examples: [
				{
					problemAr: 'Donnez un modèle concis de partie exhortative (3e paragraphe) pour un Appel sur la préservation de l’eau en Algérie.',
					solutionAr: 'Chers citoyens, l’heure n’est plus à l’indifférence ! Nous vous appelons vivement à éviter tout gaspillage au quotidien, à réparer chaque fuite et à sensibiliser nos enfants à la valeur de cette richesse vitale. Agissons ensemble dès aujourd’hui afin que nos générations futures puissent vivre sereinement !'
				},
				{
					problemAr: 'Formulez la phrase finale du Compte rendu objectif d’un appel pour la sécurité routière.',
					solutionAr: 'Enfin, l’auteur exhorte les conducteurs et les piétons à respecter rigoureusement le code de la route afin de protéger les vies humaines et de réduire durablement le nombre d’accidents.'
				}
			],
			watchOutAr:
				'نصيحة ذهبية ليوم البكالوريا: لا تكتب جملا شديدة الطول تتوه فيها القواعد النحوية! الجمل المتوسطة الواضحة (فاعل + فعل + مفعول + رابط منطقي) أضمن بكثير لتفادي الأخطاء الإملائية والنحوية. وتأكد دائما من معالجة موضوع واحد فقط (Sujet 1 أو Sujet 2) وكتابة رقمه بوضوح.'
		},
		practice: [
			{
				questionAr: 'Quelle est la structure obligatoire si vous choisissez le Sujet 2 : « Rédiger un Appel aux citoyens pour protéger les forêts » ?',
				options: [
					'Un seul paragraphe narratif au passé simple',
					'Un titre incitatif suivi de 3 parties distinctes : expositive, argumentative et exhortative',
					'Une liste de 10 mots isolés sans verbes conjugués',
					'Un compte rendu du texte de compréhension'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النداء نص تحريضي بالحاضر والأمر والمستقبل وليس قصة بالماضي البسيط.',
					'أحسنت! العنوان المحفز + الفقرات الثلاث المتدرجة هي البنية القياسية لنص النداء.',
					'خطأ: لا بد من فقرات مترابطة وجمل تامة.',
					'خطأ: التقرير الموضوعي يخص الموضوع الأول لا الثاني.'
				],
				explanationAr: 'تحرير نداء ناجح يتطلب عنوانا محفزا و3 فقرات واضحة: عرض المشكلة، الحجاج لضرورة التغيير، ثم النداء المباشر.'
			},
			{
				questionAr: 'Dans le barème du BAC Scientifique (3AS SE / TM / MATH / GE), quelle est la répartition exacte des 20 points en français ?',
				options: [
					'10 pts Compréhension + 10 pts Production écrite',
					'14 pts Compréhension de l’écrit (7 + 7) + 6 pts Production écrite',
					'12 pts Compréhension + 8 pts Production écrite',
					'13 pts Compréhension + 7 pts Production écrite'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا ليس سلم البكالوريا في الجزائر.',
					'ممتاز! الشعب العلمية والتسيير: 14 نقطة للفهم والبناء اللغوي (7 + 7) و6 نقاط للوضعية الإدماجية.',
					'خطأ: 12 + 8 يخص شعبة اللغات الأجنبية (LE).',
					'خطأ: 13 + 7 يخص شعبة الآداب والفلسفة (LP).'
				],
				explanationAr: 'في بكالوريا الشعب العلمية والتسيير، سلم التنقيط هو 14 نقطة لفهم المكتوب + 6 نقاط للتعبير الكتابي.'
			},
			{
				questionAr: 'Quel titre convient le mieux à un Appel (Sujet 2) sur la sécurité routière ?',
				options: [
					'Les voitures en 1920',
					'Prudence au volant : sauvons nos vies sur les routes !',
					'Résumé du texte de l’examen',
					'Exercice numéro deux'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا عنوان نص تاريخي وليس نداء.',
					'رائع! عنوان مباشر ومحفز يتضمن الأمر الشامل « sauvons » وموضوع النداء.',
					'خطأ: هذا ليس عنوانا لنداء حر.',
					'خطأ: يجب كتابة عنوان موضوعي وجذاب.'
				],
				explanationAr: 'عنوان النداء الجيد يكون قصيرا ومعبرا وغالبا ما يتضمن جملة اسمية قوية أو فعل أمر.'
			},
			{
				questionAr: 'Lors de la rédaction du Sujet 1 (Compte rendu objectif d’un Appel), quel piège faut-il absolument éviter ?',
				options: [
					'Mentionner le nom de l’auteur et la source dans l’introduction',
					'Garder l’impératif direct du texte (« Agissez ! ») au lieu de le rapporter à la 3e personne (« L’auteur exhorte les lecteurs à agir »)',
					'Utiliser des connecteurs comme « D’abord », « Ensuite », « Enfin »',
					'Respecter les alinéas et la ponctuation'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ذكر الكاتب والمصدر واجب في المقدمة.',
					'ممتاز! في التقرير الموضوعي ننقل النداء بضمير الغائب (L’auteur exhorte à...) ولا نعيد توجيه الأوامر المباشرة للقارئ.',
					'خطأ: الروابط ضرورية لتنظيم التقرير.',
					'خطأ: التنسيق والترقيم عنصران إيجابيان جدا.'
				],
				explanationAr: 'في التقرير الموضوعي لنص نداء، نحوّل الخطاب المباشر والأمر إلى صيغة التقرير بضمير الغائب (L’auteur appelle / exhorte à...).'
			},
			{
				questionAr: 'Quelle phrase combine correctement un verbe performatif et une proposition de but dans la conclusion d’un Appel ?',
				options: [
					'Nous vous appelons à trier vos déchets afin que notre quartier soit propre.',
					'Nous vous appelons de trier vos déchets afin que notre quartier est propre.',
					'Il a appelé hier à trier vos déchets afin que notre quartier sera propre.',
					'Nous vous appelons à trier vos déchets grâce à notre quartier propre.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! « appelons à + infinitif » (فعل إنجازي صحيح) + « afin que + subjonctif (soit) » (غاية صحيحة).',
					'خطأ: « appeler » يأخذ « à » لا « de »، وبعد « afin que » نستعمل « soit » لا « est ».',
					'خطأ: الزمن ماضٍ وغائب (ليس إنجازيا) والمستقبل لا يأتي بعد « afin que ».',
					'خطأ: « grâce à » للسبب لا للغاية.'
				],
				explanationAr: 'التركيب المثالي لختام النداء: « Nous vous appelons à + infinitif + afin que + subjonctif ».'
			}
		]
	}
];
