import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

// ============================================================================
// 5 Interactive Lessons — 1AS TCST Trimester 3
// Projet 3 : Le fait divers et le récit réaliste à portée morale
// ============================================================================

export const LESSONS_1AS_TCST_T3: FrenchInteractiveLessonData[] = [
	// 1. Le schéma narratif et les temps du récit (imparfait / passé simple / passé composé)
	{
		id: 'fre_lesson_1as_tcst_t3_schema_narratif_temps',
		slug: 'fre-1as-tcst-t3-schema-narratif-temps',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الخبر المتنوع والقصة الواقعية الهادفة (Le fait divers et le récit réaliste)',
		order: 1,
		titleAr: 'البنية السردية وأزمنة السرد (Le schéma narratif et les temps du récit)',
		objectives: [
			'تحديد مراحل البنية السردية الخمس (الوضعية الابتدائية، العنصر المخل، الأحداث، عنصر الانفراج، الوضعية النهائية)',
			'التمييز بين زمن الحدث الرئيسي في السرد الأدبي (passé simple) والسرد الصحفي/الواقعي (passé composé) وزمن الوصف والخلفية (imparfait)',
			'تصريف الأفعال الأساسية في الماضي الناقص والماضي البسيط والماضي المركب بدقة'
		],
		keywordsAr: [
			'Schéma narratif',
			'Situation initiale',
			'Élément perturbateur',
			'Imparfait',
			'Passé simple',
			'Passé composé'
		],
		discover: {
			scenarioAr:
				'اقرأ بداية هذه القصة الواقعية: « Chaque matin, Youssef marchait calmement vers son lycée à Tlemcen. Les rues étaient paisibles et le vent soufflait doucement. Soudain, il aperçut un vieil homme qui venait de glisser sur le trottoir mouillé. Sans hésiter, le lycéen courut vers lui, l’aida à se relever et ramassa ses affaires. Depuis ce jour, tout le quartier salua sa bonté. » لاحظ التناوب بين زمني السرد.',
			svg: svgFrenchWritingBlueprint({
				title: 'Les 5 étapes du Schéma Narratif',
				steps: [
					{
						stage: '1. Situation initiale',
						detail: 'Calme, cadre spatio-temporel, personnages (Imparfait).'
					},
					{
						stage: '2. Élément perturbateur',
						detail: 'Soudain / Un jour : rupture de l’équilibre (Passé simple).'
					},
					{
						stage: '3. Péripéties',
						detail: 'Suite d’actions et d’efforts pour réagir (Passé simple).'
					},
					{
						stage: '4. Résolution + Fin',
						detail: 'Solution trouvée -> Retour au calme et morale (Final).'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الزمن المستعمل في الجملتين الأوليين (marchait, étaient, soufflait)؟ ولماذا؟',
					hintAr: 'الجملتان تصفان العادة والجو الهادئ قبل وقوع الحدث المفاجئ.',
					expectedInput: 'الماضي الناقص (L’imparfait) للوصف والعادة والخلفية',
					revealAr: 'يُستعمل الماضي الناقص (l’imparfait) في الوضعية الابتدائية لوصف الشخصيات والمكان والعادات.'
				},
				{
					promptAr: 'ما الكلمة التي أعلنت عن العنصر المخل (l’élément perturbateur)؟ وما زمن الأفعال بعدها؟',
					hintAr: 'ابحث عن مؤشر المفاجأة ثم انظر إلى الفعل « aperçut » و« courut ».',
					expectedInput: '« Soudain » متبوعة بالماضي البسيط (Le passé simple)',
					revealAr: 'العنصر المخل يبدأ بـ « Soudain »، والأحداث المفاجئة المتسلسلة (aperçut, courut, aida, ramassa) مصرفّة في الماضي البسيط (passé simple).'
				},
				{
					promptAr: 'ما الزمن الذي يغلب على الخبر المتنوع الصحفي (le fait divers) بدل الماضي البسيط؟',
					hintAr: 'في الجريدة نقول: « Un jeune citoyen a secouru un enfant hier à Béjaïa. »',
					expectedInput: 'الماضي المركب (Le passé composé)',
					revealAr: 'في الخبر المتنوع الصحفي (le fait divers) يغلب الماضي المركب (passé composé) لقرب الحدث من الواقع، بينما يغلب الماضي البسيط في القصة الواقعية الأدبية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البنية السردية (Le schéma narratif): 1) الوضعية الابتدائية (Situation initiale: هدوء واستقرار)، 2) العنصر المخل (Élément perturbateur: حدث مفاجئ يبدأ بـ Soudain / Un jour)، 3) تسلسل الأحداث (Péripéties)، 4) عنصر الانفراج (Élément de résolution)، 5) الوضعية النهائية (Situation finale: عودة الاستقرار مع عبرة أخلاقية).',
				'الماضي الناقص (L’imparfait): يُستعمل للوصف والعادة والأحداث الطويلة في الخلفية (-ais, -ais, -ait, -ions, -iez, -aient).',
				'الماضي البسيط (Le passé simple): يُستعمل في القصة للأحداث المفاجئة والقصيرة والمتتابعة في الصدارة: المجموعة 1 (-ai, -as, -a, -âmes, -âtes, -èrent) | المجموعة 2 (-is, -is, -it, -îmes, -îtes, -irent) | أفعال شائعة: fut (être), eut (avoir), fit (faire), prit (prendre), courut (courir), vit (voir).',
				'الماضي المركب (Le passé composé): (avoir / être au présent + participe passé) هو الزمن الرئيسي للأحداث المنجزة في الخبر الصحفي (le fait divers).'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'Couple clé du récit',
				tenseName: 'Imparfait (décor) + Passé simple (action)',
				formula: 'Il marchait (fond) quand soudain il vit (événement)',
				activeZone: 'two_past',
				example: 'La pluie tombait lorsque les secouristes arrivèrent.',
				markers: 'chaque jour (imparfait) | soudain, tout à coup (passé simple)'
			}),
			visualCaptionAr: 'التكامل بين الماضي الناقص (الخلفية) والماضي البسيط (الحدث المفاجئ)',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين في الزمن المناسب: « Le ciel (être) sombre quand un éclair (illuminer) la montagne. »',
					solutionAr: 'Le ciel était sombre (imparfait: وصف) quand un éclair illumina (passé simple: حدث مفاجئ) la montagne.'
				},
				{
					problemAr: 'حوّل جملة الخبر الصحفي إلى الماضي المركب: « Les pompiers (sauver) trois randonneurs et (repartir) vers la ville. »',
					solutionAr: 'Les pompiers ont sauvé trois randonneurs et sont repartis vers la ville.'
				}
			],
			watchOutAr:
				'احذر من الخلط بين نهايات الماضي البسيط للمجموعة الأولى مع المفرد (-a: il aida) والجمع (-èrent: ils aidèrent)، ولا تنسَ مطابقة اسم المفعول مع المساعد être في الماضي المركب (elles sont arrivées).'
		},
		practice: [
			{
				questionAr: 'في أي مرحلة من البنية السردية تظهر عادة عبارات مثل « Soudain » و« Tout à coup » و« Brusquement »؟',
				options: [
					'La situation initiale',
					'L’élément perturbateur',
					'La situation finale',
					'Le portrait physique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الوضعية الابتدائية تتسم بالهدوء لا المفاجأة.',
					'أحسنت! هذه المؤشرات تعلن عن العنصر المخل الذي يكسر استقرار البداية.',
					'الوضعية النهائية تعلن عودة الهدوء.',
					'الوصف الجسدي ليس مرحلة سردية.'
				],
				explanationAr: 'العنصر المخل (élément perturbateur) يُقدّم عادة بظروف المفاجأة مثل Soudain وTout à coup.'
			},
			{
				questionAr: 'اختر التصريف السليم للماضي البسيط والماضي الناقص: « Karim .......... ses leçons lorsque son voisin .......... à la porte. » (réviser / frapper)',
				options: [
					'révisa / frappait',
					'révisait / frappa',
					'révisera / frappe',
					'révise / frappait'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست الأزمنة: المراجعة هي الحدث المستمر والطرق هو الحدث المفاجئ القاطع.',
					'ممتاز! « révisait » (imparfait للحدث المستمر) و« frappa » (passé simple للحدث القاطع).',
					'أزمنة لا تناسب السرد في الماضي.',
					'لا يصح المزج غير المبرر بين المضارع والماضي الناقص هنا.'
				],
				explanationAr: 'الحدث المستمر في الخلفية يأخذ Imparfait، والحدث المفاجئ الذي يقطعه يأخذ Passé simple.'
			},
			{
				questionAr: 'ما الزمن الغالب لسرد الأحداث المنجزة في الخبر المتنوع الصحفي (le fait divers)؟',
				options: [
					'Le futur simple',
					'Le passé composé',
					'Le subjonctif présent',
					'L’impératif présent'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الخبر الصحفي يروي أحداثا وقعت بالفعل لا أحداثا مستقبلية.',
					'صحيح! يعتمد الخبر المتنوع الصحفي على الماضي المركب (passé composé).',
					'المنصوب ليس زمن سرد صحفي.',
					'الأمر ليس زمن سرد.'
				],
				explanationAr: 'الصحفي يروي الوقائع الحديثة باستعمال الماضي المركب (a sauvé, ont retrouvé...).'
			},
			{
				questionAr: 'اختر تصريف الفعل « finir » مع الغائب الجمع في الماضي البسيط (passé simple): « Les volontaires .......... le nettoyage avant midi. »',
				options: ['finissaient', 'finirent', 'finiront', 'finissent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'finissaient ماضٍ ناقص وليس ماضيا بسيطا.',
					'أحسنت! نهاية المجموعة الثانية في الماضي البسيط مع الجمع هي -irent (finirent).',
					'finiront في المستقبل البسيط.',
					'finissent في المضارع.'
				],
				explanationAr: 'تصريف أفعال المجموعة الثانية في Passé simple مع ils/elles هو -irent.'
			},
			{
				questionAr: 'في الجملة: « Les secouristes sont .......... rapidement sur les lieux. » (arriver) ما الشكل الصحيح؟',
				options: ['arrivé', 'arrivés', 'arriver', 'arrivées'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقص s الجمع لأن المساعد هو être.',
					'إجابة دقيقة! مع المساعد être نطابق اسم المفعول مع الفاعل الجمع المذكر (les secouristes -> arrivés).',
					'نحتاج اسم المفعول لا المصدر.',
					'les secouristes هنا جمع مذكر لا مؤنث.'
				],
				explanationAr: 'اسم المفعول مع المساعد être يتبع الفاعل في الجنس والعدد.'
			}
		]
	},

	// 2. La voix passive et la nominalisation dans les titres
	{
		id: 'fre_lesson_1as_tcst_t3_voix_passive_nominalisation',
		slug: 'fre-1as-tcst-t3-voix-passive-nominalisation',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الخبر المتنوع والقصة الواقعية الهادفة (Le fait divers et le récit réaliste)',
		order: 2,
		titleAr: 'المبني للمجهول والاسميّة في عناوين الأخبار المتنوعة (La voix passive et la nominalisation)',
		objectives: [
			'تحويل الجملة الفعلية إلى جملة اسمية (la nominalisation) لصياغة عناوين صحفية موجزة وجذابة للخبر المتنوع',
			'إتقان اللواحق الاسمية الأساسية (-tion, -ation, -ment, -age, -ure, -ance)',
			'استعمال المبني للمجهول في الخبر المتنوع لإبراز الضحية أو الحدث (passif complet et passif incomplet)'
		],
		keywordsAr: [
			'Nominalisation',
			'Phrase nominale',
			'Titre de fait divers',
			'Voix passive',
			'Suffixes nominaux'
		],
		discover: {
			scenarioAr:
				'تأمل هذا العنوان الصحفي ومقدمته (le chapeau): العنوان: « Sauvetage réussi d’un randonneur égaré dans le Djurdjura ! » النص: « Hier matin, un randonneur a été secouru par les agents de la Protection civile après trois heures de recherche. » لماذا فضّل الصحفي العنوان الاسمي القصير، ولماذا بدأ النص بالمبني للمجهول؟',
			svg: svgFrenchWordFormation({
				title: 'Nominaliser un verbe pour créer un titre de presse',
				prefix: '—',
				root: 'sauv(er)',
				suffix: '-etage',
				derivedWord: 'Sauvetage d’un randonneur !',
				meaningNote: 'Phrase nominale (sans verbe conjugué) : courte, claire et percutante'
			}),
			steps: [
				{
					promptAr: 'هل يحتوي العنوان « Sauvetage réussi d’un randonneur égaré » على فعل مصرّف؟',
					hintAr: 'أين الفعل المصرف؟ كلمة « Sauvetage » اسم وكلمة « réussi / égaré » صفتان.',
					expectedInput: 'لا، إنها جملة اسمية (phrase nominale) بدون فعل مصرّف',
					revealAr: 'العنوان جملة اسمية (phrase nominale) ناتجة عن تحويل الفعل (sauver) إلى اسم (sauvetage) لتكثيف الخبر ولفت انتباه القارئ.'
				},
				{
					promptAr: 'حوّل الجملة الفعلية الآتية إلى عنوان اسمي: « Les volontaires ont planté deux mille arbres à Batna. »',
					hintAr: 'ما الاسم المشتق من الفعل « planter »؟ (لاحقة -ation).',
					expectedInput: 'Plantation de deux mille arbres à Batna.',
					revealAr: 'نشتق الاسم « Plantation » من الفعل « planter » فنحصل على العنوان: « Plantation de deux mille arbres à Batna. »'
				},
				{
					promptAr: 'لماذا استعمل الصحفي المبني للمجهول « un randonneur a été secouru par... » في نص الخبر؟',
					hintAr: 'من الشخص الذي يهم القارئ معرفة مصيره أولا؟',
					expectedInput: 'لإبراز المتأثر بالحدث (المتجوّل المُنقَذ) في صدارة الجملة',
					revealAr: 'في الخبر المتنوع يُستعمل المبني للمجهول لتسليط الضوء على الضحية أو الحدث الأهم قبل الفاعل، وأحيانا يُحذف الفاعل إذا كان مجهولا (La voiture a été retrouvée).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاسميّة (La nominalisation): هي تحويل جملة فعلية إلى جملة اسمية (بلا فعل مصرّف) عبر اشتقاق اسم من الفعل أو الصفة. وتُستخدم بكثرة في عناوين الأخبار المتنوعة للإيجاز والتشويق.',
				'أشهر اللواحق لتكوين الأسماء من الأفعال: -tion / -ation (restaurer -> restauration, inaugurer -> inauguration) | -ment (glisser -> glissement, sauver -> sauvetage [شاذة -age]) | -age (nettoyer -> nettoyage, reboiser -> reboisement) | -ure (fermer -> fermeture, blesser -> blessure).',
				'أشهر اللواحق لتكوين الأسماء من الصفات: -té (honnête -> honnêteté, solidaire -> solidarité) | -ance / -ence (prudent -> prudence) | -eur (grand -> grandeur).',
				'في المبني للمجهول بالماضي المركب (الأكثر شيوعا في الخبر المتنوع): (a été / ont été + participe passé accordé)، مثال: « Les habitants ont été évacués par les secouristes. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Suffixes de nominalisation (Titres de presse)',
				subtitle: 'Transformer un verbe en nom pour titrer un fait divers',
				columns: [
					{
						header: '-ation / -tion',
						rule: 'Verbes en -er / -ir',
						examples: 'arrestation, disparition'
					},
					{
						header: '-ment / -age',
						rule: 'Actions concrètes',
						examples: 'effondrement, sauvetage'
					},
					{
						header: '-ure / -té',
						rule: 'Résultats et qualités',
						examples: 'fermeture, solidarité'
					}
				]
			}),
			visualCaptionAr: 'أهم اللواحق الاسمية لتحويل الجمل الفعلية إلى عناوين صحفية موجزة',
			examples: [
				{
					problemAr: 'حوّل إلى عنوان اسمي: « La Protection civile a découvert deux randonneurs perdus. »',
					solutionAr: 'Découverte de deux randonneurs perdus par la Protection civile.'
				},
				{
					problemAr: 'حوّل إلى المبني للمجهول: « Un lycéen honnête a rendu un portefeuille égaré. »',
					solutionAr: 'Un portefeuille égaré a été rendu par un lycéen honnête.'
				}
			],
			watchOutAr:
				'لا تكتب فعلا مصرفا داخل الجملة الاسمية! إذا طُلب منك nominaliser الجملة « Le pont s’est effondré » فاكتب « Effondrement du pont » وليس « Effondrement s’est produit ».'
		},
		practice: [
			{
				questionAr: 'اختر العنوان الاسمي الصحيح للجملة: « Les autorités ont inauguré une nouvelle bibliothèque à Sétif. »',
				options: [
					'Inaugurer une nouvelle bibliothèque à Sétif.',
					'Inauguration d’une nouvelle bibliothèque à Sétif.',
					'Les autorités inaugurent une bibliothèque.',
					'Une bibliothèque est inaugurée à Sétif.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة مصدرية وليست اسمية مشتقة.',
					'أحسنت! « Inauguration » اسم مشتق من الفعل « inaugurer » بلا فعل مصرف.',
					'تحتوي على فعل مصرف في المضارع.',
					'جملة مبنية للمجهول بفعل مصرف وليست جملة اسمية.'
				],
				explanationAr: 'الاسم المشتق من « inaugurer » هو « inauguration ».'
			},
			{
				questionAr: 'ما الاسم المشتق من الفعل « disparaître » لصياغة عنوان خبر؟',
				options: ['Disparaîtement', 'Disparition', 'Disparage', 'Disparure'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلمة غير موجودة في الفرنسية.',
					'ممتاز! الفعل « disparaître » يعطي الاسم « disparition ».',
					'كلمة غير صحيحة.',
					'كلمة غير صحيحة.'
				],
				explanationAr: 'عائلة الكلمة: disparaître -> la disparition.'
			},
			{
				questionAr: 'حوّل إلى المبني للمجهول (في الماضي المركب): « Les bénévoles ont nettoyé toute la plage de Jijel. »',
				options: [
					'Toute la plage de Jijel est nettoyée par les bénévoles.',
					'Toute la plage de Jijel a été nettoyée par les bénévoles.',
					'Toute la plage de Jijel a été nettoyé par les bénévoles.',
					'Toute la plage de Jijel ont été nettoyées par les bénévoles.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'غيّرت الزمن من الماضي المركب إلى المضارع.',
					'صحيح تماما! الزمن ماضٍ مركب (a été) واسم المفعول مطابق للمؤنث المفرد (nettoyée).',
					'نسيت مطابقة المؤنث e في « nettoyée ».',
					'« Toute la plage » مفرد مؤنث فلا يأخذ ont été.'
				],
				explanationAr: 'في الماضي المركب للمجهول نكتب « a été nettoyée » مع مطابقة المؤنث المفرد.'
			},
			{
				questionAr: 'اختر الجملة الاسمية الصحيحة المقابلة لـ: « La route nationale a été fermée à cause de la neige. »',
				options: [
					'Fermement de la route nationale à cause de la neige.',
					'Fermeture de la route nationale à cause de la neige.',
					'Fermer la route nationale à cause de la neige.',
					'La route est fermée à cause de la neige.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'« fermement » ظرف معناه بحزم وليس اسم الإغلاق.',
					'أحسنت! « Fermeture » هو الاسم الدقيق من الفعل « fermer ».',
					'فعل في المصدر لا اسم.',
					'جملة فعلية وليست اسمية.'
				],
				explanationAr: 'اسم العملية من الفعل fermer هو « la fermeture ».'
			},
			{
				questionAr: 'في أي نوع من الأخبار المتنوعة يُصنّف الخبر التالي: « Un collégien remet une somme importante trouvée dans la rue à son propriétaire »؟',
				options: ['Catastrophe naturelle', 'Accident de la route', 'Fait insolite / Acte de civisme', 'Méfait'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ليست كارثة طبيعية كالزلزال أو الفيضان.',
					'ليس حادث مرور.',
					'إجابة موفقة! إنه سلوك مدني نبيل وخبر إيجابي لافت (acte de civisme / fait insolite).',
					'Méfait يعني جريمة أو فعلا سيئا، وهنا العكس تماما.'
				],
				explanationAr: 'تُصنّف الأخبار المتنوعة إلى: catastrophes naturelles, accidents, méfaits, et faits insolites / actes de civisme.'
			}
		]
	},

	// 3. La caractérisation et les valeurs des temps verbaux
	{
		id: 'fre_lesson_1as_tcst_t3_caracterisation_valeurs_temps',
		slug: 'fre-1as-tcst-t3-caracterisation-valeurs-temps',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الخبر المتنوع والقصة الواقعية الهادفة (Le fait divers et le récit réaliste)',
		order: 3,
		titleAr: 'النعت والوصف وقيم الأزمنة في السرد (La caractérisation et les valeurs des temps)',
		objectives: [
			'استعمال وسائل النعت الثلاث لإغناء السرد والوصف: الصفة (adjectif qualificatif)، المضاف إليه (complément du nom)، والجملة الموصولية (subordonnée relative)',
			'تمييز القيم الدقيقة للماضي الناقص (الوصف، العادة، الاستمرار) والماضي البسيط (الحدث المفاجئ، تسلسل الأفعال) والماضي الأسبق (plus-que-parfait: الأسبقية)',
			'إثراء جمل سردية قصيرة بنعوت دقيقة تبرز الصفات الأخلاقية والإنسانية للشخصيات'
		],
		keywordsAr: [
			'Caractérisation',
			'Adjectif qualificatif',
			'Complément du nom',
			'Proposition relative',
			'Valeurs des temps',
			'Plus-que-parfait'
		],
		discover: {
			scenarioAr:
				'قارن بين الجملة الفقيرة: « Un élève a trouvé un sac. » والجملة الثرية بالنعوت: « Un élève honnête du lycée Ben Badis a trouvé un sac en cuir qui contenait des papiers officiels qu’un voyageur avait perdus la veille. » لاحظ كيف أصبحت الصورة واضحة وحيّة بفضل النعوت والزمن الأسبق.',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 moyens de la caractérisation (Expansions du nom)',
				rootLabel: 'Enrichir un nom noyau (ex : un élève / un sac)',
				branches: [
					{
						label: 'Adjectif qualificatif',
						rule: 'Épithète ou attribut',
						example: 'un élève honnête'
					},
					{
						label: 'Complément du nom',
						rule: 'Préposition (de, à, en) + nom',
						example: 'un sac en cuir'
					},
					{
						label: 'Relative',
						rule: 'Pronom (qui, que, où, dont)',
						example: 'qui contenait des papiers'
					}
				]
			}),
			steps: [
				{
					promptAr: 'حدّد وسيلة النعت لكل عبارة: (1) « honnête »، (2) « en cuir »، (3) « qui contenait des papiers ».',
					hintAr: 'لاحظ وجود الصفة، ثم حرف الجر + اسم، ثم الضمير الموصول qui.',
					expectedInput: '(1) adjectif qualificatif — (2) complément du nom — (3) subordonnée relative',
					revealAr: '« honnête » صفة نعتية، « en cuir » مضاف إليه بحرف الجر en، و« qui contenait des papiers » جملة موصولية نعتية.'
				},
				{
					promptAr: 'لماذا صُرّف الفعل « avait perdus » في الماضي الأسبق (plus-que-parfait) في نهاية الجملة؟',
					hintAr: 'هل ضاع الكيس قبل أن يجده التلميذ أم بعد ذلك؟',
					expectedInput: 'للتعبير عن الأسبقية في الماضي (antériorité)',
					revealAr: 'الماضي الأسبق (plus-que-parfait = imparfait de avoir/être + participe passé) يعبّر عن حدث وقع قبل حدث ماضٍ آخر (ضاع أولا puis وُجد ثانيا).'
				},
				{
					promptAr: 'ما القيمتان الأساسيتان للماضي الناقص في السرد الواقعي؟',
					hintAr: 'فكّر في: « Chaque soir, il révisait » و« La maison était grande et lumineuse ».',
					expectedInput: 'العادة (l’habitude) والوصف (la description)',
					revealAr: 'للماضي الناقص ثلاث قيم مشهورة في السرد: الوصف (description)، العادة المتكررة (habitude)، والفعل المستمر في الخلفية (action qui dure).'
				}
			]
		},
		summary: {
			rulesAr: [
				'وسائل النعت وتوسيع الاسم (La caractérisation / Expansions du nom): 1) الصفة (l’adjectif qualificatif: épithète مرتبطة بالاسم أو attribut بعد فعل الكينونة être/paraître)، 2) المضاف إليه (le complément du nom: مسبوق بـ de, à, en, sans, pour)، 3) الجملة الموصولية (la proposition subordonnée relative: تبدأ بـ qui, que, dont, où).',
				'قيم الماضي الناقص (Imparfait): الوصف (La forêt était calme)، العادة (Chaque vendredi, ils visitaient...)، الاستمرارية (Il pleuvait depuis une heure).',
				'قيم الماضي البسيط (Passé simple): الحدث المفاجئ (Soudain, la porte s’ouvrit)، تسلسل الأحداث السريعة (Il courut, saisit la corde et sauva l’enfant).',
				'قيمة الماضي الأسبق (Plus-que-parfait): يعبّر عن الأسبقية الزمنية في الماضي (Il remit le livre qu’il avait emprunté la semaine précédente).'
			],
			visualSvg: svgFrenchTenseTimeline({
				title: 'L’antériorité dans le passé',
				tenseName: 'Plus-que-parfait -> Passé composé / simple',
				formula: 'avait / était + Participe passé (1re action)',
				activeZone: 'two_past',
				example: 'Il rendit le portefeuille que le commerçant avait perdu.',
				markers: 'la veille, auparavant, déjà'
			}),
			visualCaptionAr: 'التعبير عن الأسبقية الزمنية في السرد باستعمال الماضي الأسبق (Plus-que-parfait)',
			examples: [
				{
					problemAr: 'وسّع الاسم « un artisan » باستعمال صفة + مضاف إليه + جملة موصولية.',
					solutionAr: 'Un artisan patient (adjectif) de Constantine (complément du nom) qui travaillait le cuivre avec soin (subordonnée relative).'
				},
				{
					problemAr: 'حدّد قيمة الزمن المسطر في: « Tous les hivers, les habitants partageaient le bois avec leurs voisins âgés. »',
					solutionAr: 'Imparfait d’habitude (ماضٍ ناقص يدل على العادة المتكررة لوجود المؤشر Tous les hivers).'
				}
			],
			watchOutAr:
				'تذكّر قاعدة الضمير الموصول: « qui » يكون دائما فاعلا ويليه فعل مباشر (l’élève qui aide)، بينما « que » يكون مفعولا مباشرا ويليه فاعل + فعل (le sac que l’élève a trouvé).'
		},
		practice: [
			{
				questionAr: 'في الجملة: « Ce jeune volontaire courageux porte un gilet de secours. » ما الطبيعة النحوية لعبارة « de secours »؟',
				options: [
					'Un adjectif qualificatif',
					'Un complément du nom',
					'Une subordonnée relative',
					'Un adverbe de temps'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'« courageux » هي الصفة، أما « de secours » فاسم مسبوق بحرف الجر de.',
					'أحسنت! « de secours » مضاف إليه (complément du nom) يحدّد نوع السترة.',
					'لا يوجد فعل ولا ضمير موصول هنا.',
					'ليس ظرف زمان.'
				],
				explanationAr: 'كل اسم مسبوق بحرف جر (de, à, en, sans) يكمل اسما قبله يُسمى complément du nom.'
			},
			{
				questionAr: 'أكمل بالضمير الموصول الصحيح: « Voici le cahier .......... Meriem a retrouvé dans la cour. »',
				options: ['qui', 'que', 'où', 'dont'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« qui » فاعل، وهنا الفاعل موجود وهو Meriem.',
					'ممتاز! « que » يعوّض المفعول به المباشر (Meriem a retrouvé le cahier).',
					'« où » للمكان أو الزمان.',
					'« dont » يُستعمل مع de (parler de).'
				],
				explanationAr: 'الفعل « retrouver » يتعدى مباشرة، لذا نستعمل الضمير الموصول المفعول « que ».'
			},
			{
				questionAr: 'ما القيمة الزمنية للماضي الناقص في: « Chaque matin, le vieil homme ouvrait sa librairie à sept heures. »؟',
				options: [
					'Action soudaine',
					'Imparfait d’habitude (عادة متكررة)',
					'Antériorité dans le passé',
					'Vérité scientifique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدث المفاجئ يأخذ Passé simple.',
					'صحيح! وجود « Chaque matin » يثبت قيمة العادة (habitude).',
					'الأسبقية يعبّر عنها Plus-que-parfait.',
					'الحقيقة العلمية تأخذ المضارع العام.'
				],
				explanationAr: 'المؤشر « Chaque matin » يحدد قيمة العادة المتكررة للماضي الناقص.'
			},
			{
				questionAr: 'أكمل بالفعل في الزمن المناسب للأسبقية: « Le voyageur remercia le jeune homme qui .......... sa valise dans le bus. » (trouver)',
				options: ['trouvera', 'avait trouvé', 'trouve', 'trouverait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل يناقض السرد الماضي.',
					'أحسنت! العثور على الحقيبة سبق الشكر، لذا نصرّفه في Plus-que-parfait (avait trouvé).',
					'المضارع لا يعبر عن الأسبقية في الماضي.',
					'الشرط الحاضر لا يناسب الأسبقية.'
				],
				explanationAr: 'الحدث الأول في الماضي يُصرّف في Plus-que-parfait.'
			},
			{
				questionAr: 'أي جملة تحتوي على جملة موصولية نعتية (proposition subordonnée relative)؟',
				options: [
					'Je pense que la solidarité est une force.',
					'L’élève qui a organisé la collecte a reçu des félicitations.',
					'Il est resté parce qu’il voulait aider.',
					'Nous agissons afin que le quartier soit propre.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه جملة مفعولية تكميلية (complétive) بعد فعل الرأي.',
					'ممتاز! « qui a organisé la collecte » تصف الاسم « L’élève » وتبدأ بالضمير الموصول qui.',
					'هذه جملة سببية (de cause).',
					'هذه جملة غائية (de but).'
				],
				explanationAr: 'الجملة الموصولية (relative) تأتي دائما بعد اسم (antécédent) وتنعته.'
			}
		]
	},

	// 4. La cohérence textuelle et les connecteurs chronologiques
	{
		id: 'fre_lesson_1as_tcst_t3_coherence_connecteurs',
		slug: 'fre-1as-tcst-t3-coherence-connecteurs',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الخبر المتنوع والقصة الواقعية الهادفة (Le fait divers et le récit réaliste)',
		order: 4,
		titleAr: 'التماسك النصي والروابط الزمنية في السرد (La cohérence textuelle et les connecteurs chronologiques)',
		objectives: [
			'توظيف المؤشرات والروابط الزمنية (connecteurs chronologiques) لترتيب أحداث القصة أو الخبر المتنوع بوضوح',
			'ضبط قواعد التماسك النصي الأربعة: عدم التكرار، تتابع المعلومات، عدم التناقض، وترابط الجمل',
			'التمييز بين مؤشرات الزمان المطلقة (في الخبر الصحفي: mardi 12 mars) ومؤشرات السرد النسبي (la veille, le lendemain)'
		],
		keywordsAr: [
			'Cohérence textuelle',
			'Connecteurs chronologiques',
			'Indicateurs temporels',
			'Le lendemain',
			'La veille'
		],
		discover: {
			scenarioAr:
				'اقرأ هذه الفقرة المرتبكة: « L’équipe est arrivée au sommet. Ils ont préparé leurs sacs. Ils ont franchi la vallée. » الجمل مفهومة لكنها تفتقر إلى الترتيب والتماسك! والآن اقرأها بعد التنظيم: « D’abord, les jeunes scouts préparèrent leurs sacs à l’aube. Ensuite, ils franchirent la vallée avec prudence. Deux heures plus tard, ils atteignirent enfin le sommet et admirèrent le paysage. »',
			svg: svgFrenchGrammarMap({
				title: 'Organiser le temps dans un récit cohérent',
				rootLabel: 'Les connecteurs chronologiques',
				rootSub: 'Guider le lecteur du début jusqu’à la fin',
				branches: [
					{
						label: 'Début / Cadre',
						rule: 'Un matin / Au début / D’abord',
						example: 'Un matin d’hiver, la neige...'
					},
					{
						label: 'Rupture / Suite',
						rule: 'Soudain / Puis / Ensuite',
						example: 'Soudain, un cri retentit.'
					},
					{
						label: 'Fin / Bilan',
						rule: 'Enfin / Finalement / Dès lors',
						example: 'Enfin, la famille fut rassurée.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الدور الذي أدّته الكلمات « D’abord », « Ensuite », « Deux heures plus tard », « enfin »؟',
					hintAr: 'قارن وضوح التتابع الزمني في النسختين.',
					expectedInput: 'رتّبت الأحداث زمنيا وحققت التماسك النصي (la cohérence)',
					revealAr: 'الروابط الزمنية (connecteurs chronologiques) تربط الأفعال بتسلسل منطقي يجعل القارئ يتابع القصة بسلاسة.'
				},
				{
					promptAr: 'كيف نقول في سرد ماضٍ: « اليوم الذي سبق » و« اليوم الذي تلا » بدل hier وdemain؟',
					hintAr: 'في السرد الأدبي في الماضي تتغير مؤشرات الزمان إلى مؤشرات نسبية.',
					expectedInput: 'la veille (اليوم السابق) و le lendemain (اليوم الموالي)',
					revealAr: 'في السرد الماضي: hier -> la veille، وdemain -> le lendemain، وaujourd’hui -> ce jour-là.'
				},
				{
					promptAr: 'لماذا نذكر في الخبر المتنوع الصحفي (le fait divers) التاريخ والمكان الدقيقين مثل « Dimanche matin, sur la RN5 près de Bouira »؟',
					hintAr: 'هل الخبر الصحفي خيالي أم واقعي؟',
					expectedInput: 'لإثبات واقعية الخبر ومصداقيته (ancrage réel)',
					revealAr: 'الإطار الزماني والمكاني الدقيق في الخبر المتنوع يجيب عن سؤالي « Quand ? » و« Où ? » ويمنح الخبر مصداقية واقعية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الروابط الزمنية الأساسية للسرد: البداية (Un jour, Un matin, Au début, D’abord)، الانتقال والتسلسل (Puis, Ensuite, Alors, Quelques minutes plus tard, Peu après)، المفاجأة (Soudain, Tout à coup, Brusquement)، التزامن (Pendant que, Tandis que, Au moment où)، النهاية (Enfin, Finalement, Depuis ce jour, Dès lors).',
				'التحويل إلى المؤشرات الزمنية في السرد الماضي: hier -> la veille | demain -> le lendemain | aujourd’hui -> ce jour-là | la semaine dernière -> la semaine précédente.',
				'القواعد الأربع للتماسك النصي (La cohérence textuelle): (1) وحدة الموضوع وترابط الأفكار (progression)، (2) استعمال الضمائر والتعويض لتجنب التكرار الممل (reprises)، (3) عدم التناقض الزمني أو المعنوي، (4) توظيف الروابط الزمنية والمنطقية المناسبة.',
				'في الخبر المتنوع (Fait divers) نحرص على الإجابة الدقيقة عن الأسئلة الخمسة (Qui ? Quoi ? Où ? Quand ? Comment / Pourquoi ?).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Repères temporels : Réel vs Récit au passé',
				subtitle: 'Bien situer les événements sur la ligne du temps',
				columns: [
					{
						header: 'Avant',
						rule: 'hier / avant',
						examples: 'la veille, auparavant'
					},
					{
						header: 'Pendant',
						rule: 'aujourd’hui / en même temps',
						examples: 'ce jour-là, pendant que'
					},
					{
						header: 'Après',
						rule: 'demain / plus tard',
						examples: 'le lendemain, peu après'
					}
				]
			}),
			visualCaptionAr: 'المقابلة بين المؤشرات الزمنية للحاضر ومؤشرات السرد في الماضي',
			examples: [
				{
					problemAr: 'رتّب الأحداث الثلاثة باستعمال روابط زمنية مناسبة: (les secours arrivent / le conducteur freine / un rocher tombe sur la route).',
					solutionAr: 'Soudain, un rocher tomba sur la route. Aussitôt, le conducteur freina avec sang-froid. Quelques minutes plus tard, les secours arrivèrent enfin pour dégager la chaussée.'
				},
				{
					problemAr: 'حوّل المؤشر الزمني ليناسب سردا في الماضي: « Demain, Amine rendra le livre emprunté hier. »',
					solutionAr: 'Le lendemain, Amine rendit le livre qu’il avait emprunté la veille.'
				}
			],
			watchOutAr:
				'تجنب تكرار « et puis... et puis... et puis... » في كل جملة! نوّع الروابط الزمنية بين « D’abord, Aussitôt, Quelques instants plus tard, Finalement » ليكون أسلوبك راقيا.'
		},
		practice: [
			{
				questionAr: 'أي رابط زمني يدل على التزامن (وقوع حدثين في نفس الوقت)؟',
				options: ['Le lendemain', 'Pendant que', 'Finalement', 'La veille'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« Le lendemain » يدل على اليوم الموالي (بعد الحدث).',
					'أحسنت! « Pendant que » (بينما / أثناء ما) يعبّر عن التزامن.',
					'« Finalement » يدل على النهاية.',
					'« La veille » يدل على اليوم السابق.'
				],
				explanationAr: 'الرابطان « pendant que » و« tandis que » يعبران عن تزامن حدثين.'
			},
			{
				questionAr: 'في سرد بالماضي، بماذا نعوّض كلمة « demain »؟',
				options: ['la veille', 'le lendemain', 'ce jour-là', 'autrefois'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« la veille » تعوّض « hier ».',
					'ممتاز! « le lendemain » تعني اليوم الموالي وتعوض « demain » في السرد الماضي.',
					'« ce jour-là » تعوض « aujourd’hui ».',
					'« autrefois » تعني قديما.'
				],
				explanationAr: 'demain في الكلام المباشر تقابلها « le lendemain » في السرد الماضي.'
			},
			{
				questionAr: 'اختر الرابط الزمني الأنسب لإدخال الحل الأخير في القصة: « .......... , le propriétaire retrouva ses documents et remercia chaleureusement le lycéen. »',
				options: ['Soudain', 'Finalement', 'Auparavant', 'Avant-hier'],
				correctIndex: 1,
				diagnosticFeedback: [
					'« Soudain » للعنصر المخل المفاجئ.',
					'صحيح! « Finalement » (أخيرا / في النهاية) يقدّم نهاية سعيدة ومتماسكة.',
					'« Auparavant » تعني من قبل.',
					'« Avant-hier » مؤشر للحاضر لا لخاتمة السرد.'
				],
				explanationAr: '« Finalement / Enfin » من أبرز روابط الوضعية النهائية.'
			},
			{
				questionAr: 'أي سؤال من الأسئلة الصحفية الخمسة لا ينتمي إلى بنية الخبر المتنوع (Fait divers)؟',
				options: ['Qui ? (من؟)', 'Où et Quand ? (أين ومتى؟)', 'Comment et Pourquoi ? (كيف ولماذا؟)', 'Quelle formule chimique ? (ما الصيغة الكيميائية؟)'],
				correctIndex: 3,
				diagnosticFeedback: [
					'« Qui ? » سؤال أساسي لمعرفة الأشخاص المعنيين.',
					'« Où ? / Quand ? » ضروريان لتحديد الزمان والمكان.',
					'« Comment ? / Pourquoi ? » يفسران ظروف الحادثة وأسبابها.',
					'أحسنت! الصيغة الكيميائية ليست من أسئلة الخبر الصحفي الخمسة (5W/QQOQCP).'
				],
				explanationAr: 'يقوم الخبر المتنوع على الأسئلة الصحفية: Qui ? Quoi ? Où ? Quand ? Comment ? Pourquoi ?'
			},
			{
				questionAr: 'ما الخلل في التماسك النصي في الجملة: « Le matin, il réussit son examen. Le soir même, il échoua au même examen. »؟',
				options: [
					'غياب الفاصلة فقط',
					'تناقض منطقي في المعنى (contradiction)',
					'نقص صفة نعتية',
					'استعمال الماضي البسيط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العلامات الترقيمية سليمة لكن المعنى متناقض.',
					'إجابة موفقة! لا يمكن أن ينجح ويرسب في نفس الامتحان في اليوم نفسه؛ عدم التناقض شرط أساسي للتماسك النصي.',
					'ليس غياب الصفة هو الخلل الرئيسي.',
					'الماضي البسيط سليم نحويا.'
				],
				explanationAr: 'قاعدة عدم التناقض (règle de non-contradiction) ركيزة أساسية في التماسك النصي.'
			}
		]
	},

	// 5. Produire un court récit réaliste éducatif (entraide, honnêteté, persévérance)
	{
		id: 'fre_lesson_1as_tcst_t3_produire_recit_realiste',
		slug: 'fre-1as-tcst-t3-produire-recit-realiste',
		grade: '1as_tcst',
		yearSubjectId: 657,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: الخبر المتنوع والقصة الواقعية الهادفة (Le fait divers et le récit réaliste)',
		order: 5,
		titleAr: 'إنتاج قصة واقعية هادفة أو خبر متنوع (Produire un court récit réaliste éducatif)',
		objectives: [
			'كتابة قصة واقعية قصيرة (12 إلى 15 سطرا) ذات مغزى أخلاقي نبيل (التعاون، الأمانة، المثابرة)',
			'توظيف المراحل الخمس للبنية السردية وتناوب الماضي الناقص مع الماضي البسيط أو المركب بانسجام',
			'تضمين أوصاف واقعية (نعوت)، وروابط زمنية، وعبرة أخلاقية واضحة في الوضعية النهائية'
		],
		keywordsAr: [
			'Récit réaliste',
			'Portée morale',
			'Entraide',
			'Honnêteté',
			'Persévérance'
		],
		discover: {
			scenarioAr:
				'في اختبار الفصل الثالث للأولى ثانوي علوم، طُلب منك كتابة قصة واقعية قصيرة حدثت في مدينتك الجزائرية تُبرز قيمة الأمانة أو التعاون أو المثابرة في الدراسة. كيف تخطّط لقصتك قبل الكتابة حتى تكون متكاملة وواقعية وخالية من الحشو؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan de rédaction : Récit réaliste à portée morale',
				steps: [
					{
						stage: '1. Cadre réaliste',
						detail: 'Lieu algérien, époque réelle, personnage ordinaire (Imparfait).'
					},
					{
						stage: '2. Incident précis',
						detail: 'Soudain : objet perdu, panne, difficulté scolaire (Passé simple).'
					},
					{
						stage: '3. Action noble',
						detail: 'Choix honnête, entraide ou effort persévérant + connecteurs.'
					},
					{
						stage: '4. Fin + Morale',
						detail: 'Résultat heureux et leçon de vie claire et inspirante.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي يجعل القصة « واقعية » (réaliste)؟',
					hintAr: 'قارن بين قصة عن تلميذ في قسنطينة وقصة خيالية عن تنين.',
					expectedInput: 'أماكن حقيقية، شخصيات عادية، وأحداث محتملة في الحياة اليومية',
					revealAr: 'القصة الواقعية (récit réaliste) تتجنب الخيال والخوارق وتعتمد على أماكن حقيقية (ثانوية، حي، سوق)، وشخصيات عادية، وأحداث يمكن أن تقع فعلا.'
				},
				{
					promptAr: 'صُغ جملة ختامية تحمل عبرة أخلاقية (une morale) لقصة عن الأمانة (l’honnêteté).',
					hintAr: 'مثال: الأمانة أعظم من المال، أو الأمانة تكسب احترام الجميع.',
					expectedInput: 'L’honnêteté vaut plus que toutes les richesses et gagne la confiance de tous.',
					revealAr: 'خاتمة نموذجية: « Ce jour-là, Bilal comprit que l’honnêteté demeure la plus noble des qualités et apporte une paix intérieure incomparable. »'
				},
				{
					promptAr: 'ما القاعدة الأساسية عند كتابة خبر متنوع صحفي (fait divers) في الموضوع البديل؟',
					hintAr: 'تذكّر: العنوان الاسمي + الفقرة المختصرة (chapeau) + الإجابة عن 5 أسئلة + الماضي المركب والمبني للمجهول.',
					expectedInput: 'عنوان اسمي + إجابة عن من/ماذا/أين/متى/كيف + الماضي المركب والمبني للمجهول',
					revealAr: 'الخبر المتنوع يبدأ بعنوان اسمي موجز، ويُكتب في عمود منظم بالماضي المركب مع جملة بالمبني للمجهول والإجابة الواضحة عن الأسئلة الصحفية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطوة 1 — التخطيط قبل الكتابة: حدّد القيمة الأخلاقية (l’entraide التضامن / l’honnêteté الأمانة / la persévérance المثابرة)، المكان والزمان الواقعيين، والشخصية الرئيسية.',
				'الخطوة 2 — احترام البنية السردية والأزمنة: ابدأ بفقرة قصيرة بالماضي الناقص (Situation initiale)، ثم أدخل الحدث المفاجئ بـ « Un jour / Soudain » مع الماضي البسيط (أو الماضي المركب)، وواصل الأحداث بروابط زمنية متنوعة.',
				'الخطوة 3 — إغناء الأسلوب: وظّف على الأقل صفتين أخلاقيتين (honnête, courageux, persévérant, généreux)، مضافا إليه أو جملة موصولية، وقولا مباشرا قصيرا يضفي حيوية على المشهد.',
				'الخطوة 4 — الخاتمة والعبرة: اختم بعودة الهدوء وتأثر الشخصيات مع جملة تعبّر بوضوح عن الدرس الأخلاقي المستفاد.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Lexique des valeurs morales (1AS TCST)',
				rootLabel: 'Récit réaliste éducatif',
				branches: [
					{
						label: 'Honnêteté',
						rule: 'intègre, sincère, confier',
						example: 'rendre un bien égaré'
					},
					{
						label: 'Entraide',
						rule: 'solidaire, secourir, partager',
						example: 'porter secours à un voisin'
					},
					{
						label: 'Persévérance',
						rule: 'déterminé, effort, réussir',
						example: 'surmonter une difficulté'
					}
				]
			}),
			visualCaptionAr: 'معجم القيم الأخلاقية الثلاث المقررة في إنتاج القصة الواقعية',
			examples: [
				{
					problemAr: 'اكتب وضعية ابتدائية (سطرين) لقصة واقعية عن المثابرة في الدراسة بالماضي الناقص.',
					solutionAr: 'Au début de l’année scolaire, Sami éprouvait de grandes difficultés en physique et en français. Chaque soir, dans sa petite chambre à Sétif, il hésitait devant ses exercices mais refusait d’abandonner.'
				},
				{
					problemAr: 'اكتب عنصر انفراج وخاتمة أخلاقية لقصته بالماضي البسيط.',
					solutionAr: 'Grâce à l’aide d’un camarade sérieux et à un travail quotidien régulier, il progressa rapidement. À la fin du trimestre, il obtint une excellente note et comprit que la persévérance finit toujours par porter ses fruits.'
				}
			],
			watchOutAr:
				'احذر من خلط أزمنة السرد بلا مبرر (مثل الانتقال العشوائي من الماضي البسيط إلى المضارع ثم المستقبل)! التزم بزوج زمني متجانس: إما (Imparfait + Passé simple) للقصة، أو (Imparfait + Passé composé) للخبر المتنوع.'
		},
		practice: [
			{
				questionAr: 'ما الصفة التي تُميز القصة الواقعية (le récit réaliste) عن الحكاية العجائبية؟',
				options: [
					'تعتمد على أحداث وشخصيات وأماكن محتملة من الحياة الحقيقية',
					'تستعمل قوى خارقة وحيوانات ناطقة',
					'تبدأ دائما بعبارة « في كوكب بعيد سنة 4000 »',
					'تخلو تماما من التسلسل الزمني'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الواقعية تعني محاكاة الحياة اليومية بأشخاص عاديين وأماكن حقيقية.',
					'هذه خصائص الحكاية العجائبية أو الخرافية لا الواقعية.',
					'هذه خصائص الخيال العلمي.',
					'القصة الواقعية تقوم على تسلسل زمني واضح.'
				],
				explanationAr: 'القصة الواقعية ترتكز على الواقع اليومي القابل للتصديق (la vraisemblance).'
			},
			{
				questionAr: 'أي زوج زمني هو الأنسب لكتابة قصة واقعية أدبية متجانسة؟',
				options: [
					'Futur simple + Conditionnel',
					'Imparfait + Passé simple',
					'Subjonctif + Impératif',
					'Présent + Futur antérieur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المستقبل والشرط ليسا زمنَي السرد الماضي.',
					'ممتاز! الماضي الناقص للوصف والخلفية، والماضي البسيط للأحداث الرئيسية.',
					'المنصوب والأمر لا يُبنى عليهما السرد.',
					'ليسا زوج السرد الأدبي الماضي.'
				],
				explanationAr: 'النظام السردي الكلاسيكي في القصة يجمع بين Imparfait وPassé simple.'
			},
			{
				questionAr: 'اختر العبرة الأخلاقية (la morale) المناسبة لقصة عن مساعدة الجيران وقت العاصفة الثلجية:',
				options: [
					'La neige fond toujours lorsque le printemps arrive.',
					'Dans l’épreuve, la solidarité et l’entraide unissent les cœurs et surmontent les difficultés.',
					'Il faut acheter un manteau cher avant l’hiver.',
					'Les routes de montagne sont souvent étroites.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه حقيقة طبيعية وليست عبرة أخلاقية.',
					'صحيح! جملة معبّرة تبرز قيمة التضامن والتعاون الإنساني.',
					'مجرد نصيحة استهلاكية.',
					'مجرد معلومة جغرافية.'
				],
				explanationAr: 'العبرة الأخلاقية تستخلص قيمة إنسانية راقية من أحداث القصة.'
			},
			{
				questionAr: 'أي عنصر يُستحسن إدراجه في فقرة « الوضعية الابتدائية » من القصة الواقعية؟',
				options: [
					'الشخصية الرئيسية، المكان والزمان الواقعيان، وحالة الهدوء الأولية بالماضي الناقص',
					'حل المشكلة قبل وقوعها',
					'العبرة النهائية في السطر الأول',
					'صيغة الوداع « Veuillez agréer »'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! هذه هي العناصر الجوهرية للوضعية الابتدائية.',
					'الحل يأتي في مرحلة الانفراج لا في البداية.',
					'العبرة تأتي في الخاتمة عادة.',
					'« Veuillez agréer » خاصة بالرسالة المفتوحة لا القصة.'
				],
				explanationAr: 'الوضعية الابتدائية تقدم الإطار الزماني والمكاني والشخصيات في حالة استقرار.'
			},
			{
				questionAr: 'أي جملة تستعمل الصفة الأخلاقية والتعبير السليم للحديث عن الأمانة؟',
				options: [
					'Le jeune commerçant intègre rendit immédiatement l’enveloppe oubliée à sa propriétaire.',
					'Le jeune commerçant a gardé l’argent pour être riche.',
					'Le jeune commerçant oublia la morale du texte.',
					'Le jeune commerçant expliqua la définition scientifique du papier.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! صفة « intègre » (نزيه/أمين) وسلوك أمانة نبيل يصوّر القيمة بوضوح.',
					'هذا سلوك غير أمين يناقض القيمة الأخلاقية.',
					'جملة غامضة خارج السياق.',
					'أسلوب نص تفسيري لا قصة واقعية.'
				],
				explanationAr: 'تجسيد القيمة الأخلاقية عبر فعل ملموس للشخصية أقوى تأثيرا من الوعظ المباشر.'
			}
		]
	}
];
