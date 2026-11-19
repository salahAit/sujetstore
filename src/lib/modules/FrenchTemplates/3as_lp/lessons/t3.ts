import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Lettres et Philosophie (آداب وفلسفة — yearSubjectId: 769, coeff 3, 02h30, 7+6+7=20)
 * Interactive Lessons — Trimestre 3 : Projet 3 « L’Appel » & Synthèse BAC LP (5 lessons)
 */
export const LESSONS_3AS_LP_T3: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Structure tripartite de l’Appel
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t3_structure_appel',
		slug: 'fre-3as-lp-t3-structure-appel',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (نص النداء والمراجعة الشاملة لبكالوريا آداب وفلسفة)',
		order: 1,
		titleAr: 'البنية الثلاثية لنص النداء (Partie expositive, argumentative et exhortative)',
		objectives: [
			'التعرف على الأطراف التواصلية لنص النداء: المرسل (Destinateur)، المرسل إليهم (Destinataires)، والهدف الإنساني أو البيئي أو المدني',
			'تحليل البنية الثلاثية الكلاسيكية للنداء: الجزء العرضي (التشخيص السلبي)، الجزء الحجاجي (ضرورة التغيير)، والجزء التحريضي (الدعوة للفعل)',
			'تصنيف فقرات وجمل النداء في جدول البنية الثلاثية بدقة في امتحان البكالوريا'
		],
		keywordsAr: ['L’Appel', 'Partie expositive', 'Partie argumentative', 'Partie exhortative', 'Constat négatif'],
		discover: {
			scenarioAr:
				'نص النداء (L’Appel / texte exhortatif) نص ملتزم يُوجَّه إلى فئة أو إلى المواطنين عامة لتغيير وضع مقلق (مثل تبذير الماء، حرائق الغابات، حماية التراث، أو التكافل الاجتماعي). ويمتاز بهيكلة منطقية ثلاثية واضحة جداً في أسئلة البكالوريا.',
			svg: svgFrenchWritingBlueprint({
				title: 'Structure tripartite du texte exhortatif (L’Appel)',
				steps: [
					{
						stage: '1. Partie expositive',
						detail: 'Constat négatif ou alarmant de la situation actuelle'
					},
					{
						stage: '2. Partie argumentative',
						detail: 'Nécessité urgente d’agir et bienfaits du changement'
					},
					{
						stage: '3. Partie exhortative',
						detail: 'Appel direct à l’action (verbes performatifs, impératif)'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي يعرضه الكاتب في القسم الأول (La partie expositive) من نص النداء؟',
					hintAr: 'قبل أن تطلب من الناس التحرك، ماذا تشرح لهم أولاً؟',
					expectedInput: 'تشخيص الواقع السلبي أو الخطر المحدق (Un constat négatif / alarmant)',
					revealAr: 'يفتتح النداء بـ partie expositive تصف الوضع السلبي المقلق بالأرقام والوقائع (مثلاً: تراجع منسوب المياه وتبذير الموارد).'
				},
				{
					promptAr: 'ما دور القسم الثاني (La partie argumentative) في إقناع المتلقي؟',
					hintAr: 'إنه الجسر بين المشكلة والنداء المباشر.',
					expectedInput: 'إثبات ضرورة التغيير وإمكانية الحل بالحجج (La nécessité et la possibilité d’agir)',
					revealAr: 'يبرهن القسم الحجاجي على أن التغيير واجب وممكن إذا تضافرت الجهود، مستعملاً صيغ الإلزام (il faut, nous devons).'
				},
				{
					promptAr: 'بماذا يتميز القسم الثالث والأخير (La partie exhortative)؟',
					hintAr: 'تظهر فيه أفعال مثل appeler, exhorter وصيغة الأمر.',
					expectedInput: 'الدعوة الصريحة والمباشرة إلى التحرك والالتزام (L’appel à l’action)',
					revealAr: 'القسم التحريضي (exhortative) هو ذروة النص: يخاطب المتلقي مباشرة بأفعال إنجازية (Nous vous appelons à...) وصيغة الأمر (Agissons ensemble !).'
				}
			]
		},
		summary: {
			rulesAr: [
				'تعريف نص النداء (L’Appel): نص إقناعي تحريضي (texte argumentatif à visée exhortative) يهدف إلى توعية المتلقي وحثّه على القيام بفعل إيجابي لتغيير وضع غير مُرضٍ.',
				'القسم 1 — العرضي (Partie expositive): يقدم تشخيصاً سلبياً للواقع (constat négatif / état des lieux) يبرر إطلاق النداء.',
				'القسم 2 — الحجاجي (Partie argumentative): يثبت ضرورة التحرك (nécessité d’agir) ويعرض الحلول العملية والفوائد المرتقبة لإقناع المخاطبين.',
				'القسم 3 — التحريضي (Partie exhortative): يوجّه الدعوة الصريحة للفعل باستعمال الأفعال الإنجازية (exhorter, inviter, appeler) والأمر (Impératif) وضمير الجمع الشامل (nous inclusif).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Paramètres de communication de l’Appel',
				rootLabel: 'Qui appelle qui et pourquoi ?',
				rootSub: 'Question fréquente en Compréhension BAC LP',
				branches: [
					{
						label: 'Destinateur',
						rule: 'Auteur, association, citoyens',
						example: 'Des jeunes volontaires algériens'
					},
					{
						label: 'Destinataires',
						rule: 'Public ciblé par l’appel',
						example: 'Citoyens, lycéens, responsables'
					},
					{
						label: 'Objet / But',
						rule: 'Cause à défendre',
						example: 'Préserver l’eau et les forêts'
					}
				]
			}),
			visualCaptionAr: 'عناصر وضعية التواصل التي يُسأل عنها دوماً في فهم نص النداء.',
			examples: [
				{
					problemAr: 'À quelle partie de l’Appel appartient : « Chaque été, des milliers d’hectares de forêts partent en fumée à cause de l’imprudence. » ?',
					solutionAr: 'Partie expositive (constat négatif / alarmant).'
				},
				{
					problemAr: 'À quelle partie appartient : « Il est impératif de reboiser nos collines car l’arbre protège nos sols et régule le climat. » ?',
					solutionAr: 'Partie argumentative (nécessité d’agir appuyée par un argument).'
				},
				{
					problemAr: 'À quelle partie appartient : « Chers concitoyens, nous vous exhortons à rejoindre la campagne nationale de plantation dès samedi ! » ?',
					solutionAr: 'Partie exhortative (appel direct à l’action).'
				}
			],
			watchOutAr: 'لا تخلط بين نص نقاش الأفكار (Débat d’idées) ونص النداء (L’Appel): نص النقاش يعارض بين أطروحتين لإقناع العقل بفكرة، أما النداء فيتجاوز الإقناع الفكري إلى استنهاض المتلقي للقيام بعمل ميداني ملموس!'
		},
		practice: [
			{
				questionAr: 'Quel est l’ordre logique exact des trois parties d’un texte d’Appel ?',
				options: [
					'Exhortative, puis expositive, puis argumentative',
					'Expositive (constat), puis argumentative (nécessité), puis exhortative (appel)',
					'Argumentative, puis narrative, puis descriptive',
					'Exhortative uniquement sans constat ni arguments'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نبدأ بالتحريض قبل تشخيص المشكلة وإقناع القارئ.',
					'ممتاز: الترتيب المنطقي هو تشخيص الواقع، ثم الحجاج على ضرورة الحل، ثم النداء للفعل.',
					'خطأ: هذه ليست بنية نص النداء.',
					'خطأ: النداء المقنع يتطلب تشخيصاً وحججاً.'
				],
				explanationAr: 'تقوم هندسة النداء على ثلاث مراحل متكاملة: Expositive -> Argumentative -> Exhortative.'
			},
			{
				questionAr: 'Quel élément caractérise la « partie expositive » de l’Appel ?',
				options: [
					'Le constat négatif ou préoccupant d’une situation réelle',
					'Une suite de verbes à l’impératif',
					'La signature finale du comité',
					'Une liste de dates du XIXe siècle'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: يعرض القسم الأول تشخيصاً للوضع السلبي الذي يستدعي التدخل.',
					'خطأ: صيغة الأمر تظهر في القسم التحريضي الأخير.',
					'خطأ: التوقيع يختم النداء.',
					'خطأ: هذا يخص النص التاريخي.'
				],
				explanationAr: 'الجزء العرضي يصف المشكلة القائمة لإيقاظ وعي القارئ.'
			},
			{
				questionAr: 'Identifiez la partie correspondante : « Mobilisons-nous tous pour restaurer la propreté de nos quartiers ! »',
				options: [
					'Partie expositive',
					'Partie historique',
					'Partie exhortative',
					'Partie biographique'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الجملة ليست تشخيصاً سلبياً.',
					'خطأ: لا توجد في بنية النداء.',
					'صحيح: استعمال الأمر (Mobilisons-nous) يميز القسم التحريضي (exhortative).',
					'خطأ: ليست سيرة ذاتية.'
				],
				explanationAr: 'الدعوة المباشرة للفعل بصيغة الأمر تنتمي إلى الجزء التحريضي.'
			},
			{
				questionAr: 'Quelle est la visée communicative propre au texte de l’Appel ?',
				options: [
					'Raconter un événement ancien avec neutralité',
					'Décrire un paysage sans impliquer le lecteur',
					'Divertir par une anecdote légère',
					'Sensibiliser et inciter (exhorter) les destinataires à agir concrètement'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: هذه غاية النص التاريخي.',
					'خطأ: النداء يشرك المتلقي بقوة.',
					'خطأ: النداء جاد وملتزم.',
					'أحسنت: الغاية هي التوعية والتحريض على الفعل (visée exhortative / incitative).'
				],
				explanationAr: 'يهدف نص النداء إلى التوعية وحث المتلقي على التحرك الإيجابي.'
			},
			{
				questionAr: 'Dans un appel lancé par une association écologique aux lycéens d’Algérie, qui sont les destinataires ?',
				options: [
					'Les lycéens d’Algérie',
					'L’association écologique uniquement',
					'Les historiens du passé',
					'Les auteurs du dictionnaire'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المرسل إليهم (destinataires) هم الفئة المخاطَبة المدعوة للاستجابة.',
					'خطأ: الجمعية هي المرسِل (destinateur).',
					'خطأ: ليسوا المخاطبين هنا.',
					'خطأ: لا صلة لهم بالموقف التواصلي.'
				],
				explanationAr: 'المرسل (destinateur) يطلق النداء، والمرسل إليهم (destinataires) هم المستهدفون بالتحرك.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Verbes performatifs, modalité déontique et subjonctif présent
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t3_performatifs_deontique_subjonctif',
		slug: 'fre-3as-lp-t3-performatifs-deontique-subjonctif',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (نص النداء والمراجعة الشاملة لبكالوريا آداب وفلسفة)',
		order: 2,
		titleAr: 'الأفعال الإنجازية، صيغ الإلزام والمنصوب (Verbes performatifs, modalité déontique et subjonctif)',
		objectives: [
			'استخراج الأفعال الإنجازية (Verbes performatifs : appeler, exhorter, inviter, prier, demander) وفهم دورها في تنفيذ فعل النداء',
			'توظيف أفعال وتراكيب الإلزام والوجوب (Modalité déontique : devoir, falloir, il est urgent / impératif que)',
			'تصريف الأفعال بدقة في Subjonctif présent بعد تراكيب الوجوب (Il faut que, Il est indispensable que) والتحويل بين المصدر والمنصوب'
		],
		keywordsAr: ['Verbes performatifs', 'Modalité déontique', 'Il faut que', 'Devoir', 'Subjonctif présent'],
		discover: {
			scenarioAr:
				'في نص النداء، يحمل الفعل طاقة عملية: عندما يقول المرسل « Nous vous appelons à protéger nos forêts »، فإن مجرد النطق بالفعل « appelons » يُنجز النداء نفسه! وتُدعم هذه الأفعال الإنجازية بصيغ الوجوب (Il faut que + subjonctif) لإشعار القارئ بالاستعجال.',
			svg: svgFrenchGrammarMap({
				title: 'Outils linguistiques de l’exhortation',
				rootLabel: 'Inciter à agir (L’Appel)',
				rootSub: 'Distinguer performatifs et modalité déontique',
				branches: [
					{
						label: 'Verbes performatifs',
						rule: 'Réalisent l’appel en le disant',
						example: 'J’appelle, nous exhortons, j’invite'
					},
					{
						label: 'Modalité (Infinitif)',
						rule: 'devoir / il faut + INFINITIF',
						example: 'Nous devons préserver l’eau.'
					},
					{
						label: 'Modalité (Subjonctif)',
						rule: 'Il faut que / Il est urgent que',
						example: 'Il faut que chacun agisse.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا يُسمى الفعل « exhorter » في الجملة « Nous vous exhortons à économiser l’eau » فعلاً إنجازياً (verbe performatif)؟',
					hintAr: 'هل يكتفي بالوصف أم ينجز فعل الحثّ بمجرد النطق به في المضارع بضمير المتكلم؟',
					expectedInput: 'لأنه ينجز الفعل المقصود (الدعوة والحثّ) بمجرد التلفظ به في المضارع مع je أو nous',
					revealAr: 'الفعل الإنجازي (verbe performatif) المصرف في المضارع مع المتكلم (j’appelle, nous invitons, nous exhortons) يحقق فعل النداء ذاته لحظة الكلام.'
				},
				{
					promptAr: 'حوّل من « Il faut + infinitif » إلى « Il faut que + subjonctif »: « Il faut préserver le patrimoine algérien. » (مع الفاعل nous)',
					hintAr: 'كيف نصرف الفعل préserver في Subjonctif présent مع nous؟',
					expectedInput: 'Il faut que nous préservions le patrimoine algérien.',
					revealAr: 'بعد « Il faut que » نصرف الفعل في Subjonctif présent: préserver -> que nous préservions (نضيف i قبل ons).'
				},
				{
					promptAr: 'ما الفرق بين « Nous pouvons agir » و « Nous devons agir » في الدلالة الإلزامية؟',
					hintAr: 'pouvoir = إمكانية/قدرة، devoir = واجب/التزام أخلاقي.',
					expectedInput: 'pouvoir يعبر عن القدرة والإمكان، أما devoir فيعبر عن الواجب والإلزام (modalité déontique)',
					revealAr: 'يجمع كاتب النداء بين فعل القدرة (nous pouvons) لإقناع القارئ بإمكانية التغيير، وفعل الوجوب (nous devons / il faut) لإلزامه بالتحرك.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأفعال الإنجازية (Verbes performatifs): appeler à، exhorter à، inviter à، encourager à، solliciter، prier de، demander de — وتكون في المضارع مع ضمير المتكلم (je / nous) لإطلاق النداء مباشرة.',
				'أفعال وتراكيب الوجوب والإلزام (Modalité déontique): devoir + infinitif، il faut + infinitif، il faut que + subjonctif، il est urgent / indispensable / impératif que + subjonctif.',
				'صياغة Subjonctif présent: نأخذ جذر الفعل في المضارع مع ils (ex. : ils agissent -> agiss-) ونضيف النهايات: -e, -es, -e, -ions, -iez, -ent. مثال: qu’il agisse, que nous agissions, qu’ils préservent.',
				'الشواذ الضرورية للبكالوريا في Subjonctif présent: être (sois, soit, soyons, soyez, soient)، avoir (aie, ait, ayons, ayez, aient)، faire (fasse, fassions)، pouvoir (puisse, puissions)، aller (aille, allions)، savoir (sache, sachions)، prendre (prenne, prenions).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Subjonctif présent après « Il faut que »',
				subtitle: 'Verbes incontournables dans les sujets d’Appel',
				columns: [
					{
						header: '1er & 2e groupes',
						rule: 'protéger / agir / unir',
						examples: 'qu’il protège / qu’il agisse'
					},
					{
						header: 'Être / Avoir',
						rule: 'Très fréquents au BAC',
						examples: 'que nous soyons / ayons'
					},
					{
						header: 'Faire / Prendre / Aller',
						rule: 'Irréguliers à retenir',
						examples: 'qu’on fasse / prenne / aille'
					}
				]
			}),
			visualCaptionAr: 'ملخص تصريف الأفعال المفتاحية في Subjonctif présent بعد تراكيب الوجوب.',
			examples: [
				{
					problemAr: 'Réécrivez en commençant par « Il faut que nous... » : « Nous devons prendre conscience de l’urgence écologique. »',
					solutionAr: 'Il faut que nous prenions conscience de l’urgence écologique.'
				},
				{
					problemAr: 'Relevez le verbe performatif et le verbe de modalité : « Nous vous invitons à agir vite car il faut sauver nos oasis. »',
					solutionAr: 'Verbe performatif : « invitons ». | Verbe de modalité (obligation) : « faut » (falloir).'
				},
				{
					problemAr: 'Mettez le verbe au mode convenable : « Il est impératif que chaque citoyen (faire) preuve de civisme. »',
					solutionAr: 'Il est impératif que chaque citoyen fasse preuve de civisme.'
				}
			],
			watchOutAr: 'انتبه في Subjonctif présent مع الضميرين nous و vous لأفعال الفوج الأول: نضيف دائماً حرف i (مثل Imparfait)! نكتب « Il faut que nous protégions » و« que vous agissiez » وليس protégeons!'
		},
		practice: [
			{
				questionAr: 'Quel verbe de cette liste est un verbe performatif d’exhortation ?',
				options: ['exhorter', 'mesurer', 'dormir', 'diviser'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل exhorter (يحثّ / يناشد) فعل إنجازي أصيل في نص النداء.',
					'خطأ: mesurer فعل قياس علمي.',
					'خطأ: dormir لا علاقة له بالنداء.',
					'خطأ: diviser لا يعبر عن الدعوة والتحريض.'
				],
				explanationAr: 'الأفعال الإنجازية في النداء تشمل: appeler, exhorter, inviter, prier, demander.'
			},
			{
				questionAr: 'Complétez correctement : « Il est urgent que les citoyens .......... solidaires face aux incendies. »',
				options: ['sont', 'soient', 'seront', 'étaient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: sont في Indicatif.',
					'ممتاز: بعد « Il est urgent que » نضع être في Subjonctif présent جمع: soient.',
					'خطأ: seront في Futur.',
					'خطأ: étaient في Imparfait.'
				],
				explanationAr: 'العبارات اللاشخصية الدالة على الضرورة (Il faut que, Il est urgent que) تفرض Subjonctif.'
			},
			{
				questionAr: 'Transformez avec « Il faut que vous... » : « Vous devez agir avec responsabilité. »',
				options: [
					'Il faut que vous agissez avec responsabilité.',
					'Il faut que vous agirez avec responsabilité.',
					'Il faut que vous agissiez avec responsabilité.',
					'Il faut que vous avez agi avec responsabilité.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: agissez هو Indicatif présent.',
					'خطأ: agirez هو Futur simple.',
					'صحيح: الفعل agir في Subjonctif présent مع vous هو agissiez.',
					'خطأ: ليس في صيغة Subjonctif présent.'
				],
				explanationAr: 'أفعال الفوج الثاني في Subjonctif présent مع vous تنتهي بـ -issiez (agissiez, unissiez).'
			},
			{
				questionAr: 'Dans : « Il faut que chacun prenne part à cette campagne », quelle valeur exprime « Il faut que » ?',
				options: [
					'Le doute historique',
					'La concession',
					'La description neutre',
					'L’obligation et la nécessité (modalité déontique)'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: لا يعبر عن الشك.',
					'خطأ: ليس استدراكاً.',
					'خطأ: ليس وصفاً محايداً.',
					'أحسنت: يعبّر عن الوجوب والضرورة الملحّة (obligation / nécessité).'
				],
				explanationAr: 'الفعل falloir وتعبير Il faut que هما أبرز أدوات صيغة الإلزام (modalité déontique).'
			},
			{
				questionAr: 'Choisissez la forme correcte du verbe « faire » au subjonctif présent : « Il est indispensable que nous .......... un effort collectif. »',
				options: ['fassions', 'faisons', 'ferons', 'faisions'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تصريف faire في Subjonctif présent مع nous هو fassions.',
					'خطأ: faisons هو Indicatif présent.',
					'خطأ: ferons هو Futur simple.',
					'خطأ: faisions هو Imparfait.'
				],
				explanationAr: 'جذر الفعل faire في Subjonctif présent هو fass- (fasse, fasses, fasse, fassions, fassiez, fassent).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Impératif, futur de certitude et interpellation du destinataire
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t3_imperatif_futur_interpellation',
		slug: 'fre-3as-lp-t3-imperatif-futur-interpellation',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (نص النداء والمراجعة الشاملة لبكالوريا آداب وفلسفة)',
		order: 3,
		titleAr: 'صيغة الأمر ومستقبل اليقين ومخاطبة المتلقي (Impératif, futur simple, nous inclusif)',
		objectives: [
			'تصريف الأفعال في صيغة الأمر (Impératif présent) مع الضمائر الثلاثة (tu, nous, vous) وضبط قاعدة حذف حرف s في الفوج الأول',
			'فهم القيمة الدلالية لضمير « nous inclusif » (المرسل + المرسل إليه) ومخاطبة « vous » والنداء الاستهلالي (Vocatif)',
			'إدراك قيمة المستقبل البسيط (Futur simple) في النداء كوعد واثق بالنتيجة الإيجابية أو تحذير من العواقب'
		],
		keywordsAr: ['Impératif présent', 'Nous inclusif', 'Interpellation', 'Futur simple', 'Exhortation'],
		discover: {
			scenarioAr:
				'يخاطب كاتب النداء قارئه مباشرة كأنه يقف أمامه: « Chers citoyens, économisons l’eau, protégez nos sources : ainsi nous construirons une Algérie plus verte ! » تأمل كيف تتكامل صيغة الأمر وضمير الجمع الشامل والمستقبل لتحريك الهمم.',
			svg: svgFrenchTenseTimeline({
				title: 'Temps et modes de l’engagement',
				tenseName: 'Impératif (présent) + Futur simple (promesse)',
				formula: 'Agissons aujourd’hui -> Nous réussirons demain',
				activeZone: 'future',
				example: 'Unissons nos efforts aujourd’hui et nous sauverons nos forêts demain.',
				markers: 'dès aujourd’hui, ensemble, demain, pour les générations futures'
			}),
			steps: [
				{
					promptAr: 'ما الفرق بين « nous exclusif » و « nous inclusif » في نص النداء؟',
					hintAr: 'في عبارة « Protégeons notre pays », هل يشمل « nous » الكاتب والقارئ معاً؟',
					expectedInput: 'nous inclusif يجمع الكاتب والمتلقي معاً في مسؤولية مشتركة؛ أما nous exclusif فيقتصر على الكاتب وجماعته فقط',
					revealAr: 'يُفضّل كاتب النداء ضمير « nous inclusif » (نحن جميعاً: الكاتب + القراء) لإزالة الحاجز الفوقي وبث روح الشراكة والمسؤولية الجماعية.'
				},
				{
					promptAr: 'حوّل الجملة إلى صيغة الأمر مع nous: « Il faut que nous protégions nos monuments. »',
					hintAr: 'احذف « Il faut que nous » وضع الفعل مباشرة في صيغة الأمر للجمع المتكلم.',
					expectedInput: 'Protégeons nos monuments !',
					revealAr: 'في صيغة الأمر لا نكتب ضمير الفاعل أبداً: Protégeons nos monuments ! (لاحظ إضافة e قبل ons للحفاظ على نطق g لينة).'
				},
				{
					promptAr: 'ما قيمة المستقبل البسيط (Futur simple) في: « Ensemble, nous bâtirons une société solidaire. »؟',
					hintAr: 'هل هو شك أم ثقة ووعد إيجابي يشجع على الفعل؟',
					expectedInput: 'التعبير عن الأمل واليقين في نجاح العمل الجماعي (Certitude, promesse et espoir)',
					revealAr: 'يُستعمل Futur simple في خاتمة النداء لإظهار الثقة واليقين في ثمار التحرك الإيجابي وتحفيز المتلقي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'صيغة الأمر (L’impératif présent): لا تتضمن ضميراً ظاهراً وتُصرف فقط مع ثلاث صور: المفرد المخاطب (Protège ! Agis !)، الجمع الشامل (Protégeons ! Agissons !)، والجمع المخاطب (Protégez ! Agissez !).',
				'قاعدة إملائية ذهبية: أفعال الفوج الأول (-er) والفعل aller تفقد حرف « s » في الأمر المفرد: Préserve (وليس Préserves)، Va (وليس Vas)، إلا قبل y و en (Vas-y, Penses-y).',
				'شواذ الأمر المتكررة في البكالوريا: être -> Sois, Soyons, Soyez | avoir -> Aie, Ayons, Ayez | savoir -> Sache, Sachons, Sachez | vouloir -> Veuillez.',
				'أدوات إشراك المتلقي (Interpellation): النداء المباشر (Chers concitoyens, Jeunes d’Algérie)، ضمير المخاطب (vous / votre)، ضمير الجمع الشامل (nous inclusif / notre)، والمستقبل الواثق (Futur de certitude / promesse).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Impératif présent des verbes clés',
				subtitle: 'Sans pronom sujet — Forme directe d’appel',
				columns: [
					{
						header: 'Verbes en -er',
						rule: 'Pas de -s à la 2e pers. sing.',
						examples: 'Agis / Protège / Protégeons'
					},
					{
						header: 'Être / Avoir',
						rule: 'Formes irrégulières clés',
						examples: 'Soyons / Soyez / Ayons'
					},
					{
						header: 'Verbes pronominaux',
						rule: 'Pronom après le verbe (-)',
						examples: 'Mobilisons-nous ! Unissez-vous !'
					}
				]
			}),
			visualCaptionAr: 'قواعد صياغة الأمر للأفعال العادية والشاذة والضمائرية في نص النداء.',
			examples: [
				{
					problemAr: 'Mettez à l’impératif (1re pers. pluriel) : « Nous devons nous mobiliser pour la propreté de la ville. »',
					solutionAr: 'Mobilisons-nous pour la propreté de la ville !'
				},
				{
					problemAr: 'Mettez à l’impératif (2e pers. pluriel) : « Il faut que vous soyez vigilants face au gaspillage. »',
					solutionAr: 'Soyez vigilants face au gaspillage !'
				},
				{
					problemAr: 'Quelle est la valeur du futur dans : « Si nous agissons dès aujourd’hui, nos enfants hériteront d’une terre fertile. » ?',
					solutionAr: 'Le futur simple exprime la promesse et la certitude d’un résultat positif si l’appel est suivi.'
				}
			],
			watchOutAr: 'في الأفعال الضمائرية في صيغة الأمر المثبت، ينتقل الضمير بعد الفعل مع شرطة وصل (trait d’union): « Mobilisons-nous ! », « Engagez-vous ! »، أما في النفي فيعود قبل الفعل: « Ne nous résignons pas ! ».'
		},
		practice: [
			{
				questionAr: 'Transformez à l’impératif (2e pers. pluriel) : « Il faut que vous soyez solidaires. »',
				options: ['Êtes solidaires !', 'Soyez solidaires !', 'Vous soyez solidaires !', 'Serez solidaires !'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: êtes في Indicatif présent لا في الأمر.',
					'صحيح: أمر الفعل être مع vous هو Soyez (بدون ضمير فاعل).',
					'خطأ: لا نكتب ضمير الفاعل « vous » مع صيغة الأمر.',
					'خطأ: serez في المستقبل البسيط.'
				],
				explanationAr: 'أمر الفعل être هو: Sois, Soyons, Soyez دون ضمير فاعل.'
			},
			{
				questionAr: 'Choisissez la bonne forme de l’impératif pronominal :',
				options: [
					'Unissons-nous pour protéger les forêts !',
					'Nous unissons pour protéger les forêts !',
					'Unissons nous sans trait d’union !',
					'Unissez-nous pour protéger les forêts !'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الفعل في الأمر متبوعاً بشرطة وصل ثم الضمير: Unissons-nous !',
					'خطأ: هذه جملة خبرية في المضارع لا أمر.',
					'خطأ: نحتاج شرطة الوصل (-) في الأمر المثبت.',
					'خطأ: عدم تطابق بين unissez (vous) و nous.'
				],
				explanationAr: 'الأمر الضمائري المثبت يوضع فيه الضمير بعد الفعل مربوطاً بشرطة: Unissons-nous, Mobilisez-vous.'
			},
			{
				questionAr: 'Dans un appel citoyen, pourquoi l’auteur emploie-t-il le « nous inclusif » (Agissons, notre avenir) ?',
				options: [
					'Pour exclure le lecteur du problème',
					'Pour rester totalement neutre et distant',
					'Pour impliquer le destinataire et partager la responsabilité avec lui',
					'Pour situer le texte dans l’Antiquité'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: العكس تماماً، فهو يشرك القارئ.',
					'خطأ: ضمير المتكلم ينفي الحياد التام.',
					'صحيح: يشرك القارئ مع الكاتب في مسؤولية جماعية مشتركة.',
					'خطأ: لا علاقة له بالزمن القديم.'
				],
				explanationAr: 'ضمير « nous inclusif » يحقق الألفة والمسؤولية المشتركة بين المرسل والمرسل إليهم.'
			},
			{
				questionAr: 'Quelle est l’orthographe correcte à l’impératif (2e pers. singulier) du verbe « préserver » ?',
				options: ['Préserves l’eau !', 'Préservons l’eau !', 'Préservé l’eau !', 'Préserve l’eau !'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: نحذف حرف s في أمر الفوج الأول للمفرد.',
					'خطأ: هذا للجمع المتكلم (nous).',
					'خطأ: هذا اسم مفعول لا أمر.',
					'أحسنت: أفعال الفوج الأول لا تأخذ s في الأمر المفرد: Préserve !'
				],
				explanationAr: 'في الأمر المفرد، تنتهي أفعال الفوج الأول (-er) بـ -e بدون s.'
			},
			{
				questionAr: 'Quelle nuance apporte le futur simple dans : « En économisant chaque goutte, nous sauverons nos ressources » ?',
				options: [
					'Une promesse confiante et la certitude d’un résultat positif',
					'Un regret sur le passé',
					'Un doute absolu sur l’utilité de l’action',
					'Une simple description passée'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: يبرز اليقين والثقة في الأثر الإيجابي لتحرك المواطنين.',
					'خطأ: لا يعبر عن الندم الماضي.',
					'خطأ: المستقبل البسيط يعبر عن اليقين لا الشك.',
					'خطأ: يتجه نحو المستقبل لا الماضي.'
				],
				explanationAr: 'يستخدم المستقبل البسيط في النداء كوعد مشجّع بالنجاح عند الاستجابة للنداء.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Visée communicative et question de synthèse BAC LP
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t3_visee_synthese_bac_lp',
		slug: 'fre-3as-lp-t3-visee-synthese-bac-lp',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (نص النداء والمراجعة الشاملة لبكالوريا آداب وفلسفة)',
		order: 4,
		titleAr: 'الغاية التواصلية وسؤال التركيب والنقد في بكالوريا آداب وفلسفة (Visée et question de synthèse)',
		objectives: [
			'صياغة الغاية التواصلية (Visée communicative) بدقة حسب نوع النص (تاريخي، نقاش أفكار، نداء)',
			'الإجابة المنهجية على السؤال الأخير في فهم النص (Question de synthèse / réflexion — 1.5 إلى 2 نقطتان) في 3 إلى 4 أسطر معلّلة',
			'الجمع بين إبداء الرأي الشخصي وتبريره بحجتين واضحتين أو بمثال من الواقع الجزائري'
		],
		keywordsAr: ['Visée communicative', 'Question de synthèse', 'Point de vue justifié', 'BAC LP', 'Compréhension'],
		discover: {
			scenarioAr:
				'آخر سؤال في قسم « Compréhension de l’écrit » في بكالوريا آداب وفلسفة يكون دوماً سؤال تركيب وإبداء رأي شخصي (مثل: « Partagez-vous l’appel lancé par l’auteur ? Justifiez votre réponse en deux ou trois lignes. »). كيف تضمن علامته الكاملة بسهولة؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Réussir la question de synthèse (BAC LP)',
				steps: [
					{
						stage: '1. Position claire',
						detail: 'Oui, je partage entièrement / Certes, mais je nuance...'
					},
					{
						stage: '2. Argument clé',
						detail: 'Car / En effet + raison logique personnelle (sans copier)'
					},
					{
						stage: '3. Exemple bref',
						detail: 'Par exemple + illustration concrète de la vie réelle'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الغاية التواصلية (Visée) لكل من المشاريع الثلاثة في البكالوريا؟',
					hintAr: 'اربط كل مشروع بأفعاله الدقيقة: Informer / Convaincre / Exhorter.',
					expectedInput: 'تاريخي: Informer et commémorer | نقاش: Convaincre et persuader | نداء: Sensibiliser et exhorter à agir',
					revealAr: 'لكل مشروع غايته المميزة: التاريخي يخبر ويكرّم الذاكرة، النقاش يقنع العقل بأطروحة، والنداء يوعّي ويحرّض على الفعل.'
				},
				{
					promptAr: 'لماذا يخسر بعض المترشحين نصف نقطة سؤال التركيب رغم أن إجابتهم « Oui, je suis d’accord » صحيحة؟',
					hintAr: 'لاحظ كلمة « Justifiez » في منطوق السؤال.',
					expectedInput: 'لأنهم لا يعلّلون موقفهم بحجة شخصية واضحة ومصاغة بأسلوبهم الخاص',
					revealAr: 'كلمة « Oui » وحدها لا تكفي! يشترط المصحّح تعليلاً شخصياً بلغة سليمة في 3 إلى 4 أسطر دون نسخ جملة من النص.'
				},
				{
					promptAr: 'ما الحدّ المناسب لطول إجابة سؤال التركيب في البكالوريا؟',
					hintAr: 'ليس كلمة واحدة وليس صفحة كاملة!',
					expectedInput: 'من 3 إلى 4 أسطر مركزة (حوالي 40 إلى 60 كلمة)',
					revealAr: 'الإجابة النموذجية تقع في 3 إلى 4 أسطر مترابطة: جملة الموقف + جملة الحجة بـ « En effet / Car » + مثال ملموس أو خاتمة موجزة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الغاية التواصلية حسب نوع النص: (1) النص التاريخي: Informer sur un fait historique (+ rendre hommage / dénoncer / témoigner)؛ (2) نص النقاش: Convaincre / persuader le lecteur d’adopter une thèse (ou l’amener à réfléchir)؛ (3) نص النداء: Sensibiliser les destinataires et les exhorter (inciter) à agir.',
				'وصفة سؤال التركيب المضمونة (3 à 4 lignes): ابدأ بـ « Oui, je partage pleinement le point de vue de l’auteur car... » أو « Personnellement, j’adhère à cet appel... »، ثم أضف « En effet, ... » بحجة واضحة من فهمك، واختم بـ « Par exemple, ... » أو « Ainsi, ... ».',
				'معايير تصحيح سؤال التركيب: وضوح الموقف الشخصي (0.5)، وجاهة التعليل وعدم النسخ الحرفي (0.5–1)، وسلامة اللغة والترقيم (0.5).',
				'في حال كان السؤال بصيغة « Proposez deux solutions pour... »، اكتب حلين عمليين واضحين بربط منطقي (D’une part... D’autre part...) في جمل فعلية كاملة.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Les trois visées communicatives du BAC',
				rootLabel: 'Identifier la visée de l’auteur',
				rootSub: 'Adapter les verbes au projet étudié',
				branches: [
					{
						label: 'Projet 1 : Histoire',
						rule: 'Informer, témoigner, commémorer',
						example: 'Rendre hommage aux martyrs.'
					},
					{
						label: 'Projet 2 : Débat',
						rule: 'Convaincre, persuader, réfuter',
						example: 'Défendre une thèse raisonnée.'
					},
					{
						label: 'Projet 3 : Appel',
						rule: 'Sensibiliser, inciter, exhorter',
						example: 'Pousser le public à agir.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة الغايات التواصلية للمشاريع الثلاثة المقررة في بكالوريا آداب وفلسفة.',
			examples: [
				{
					problemAr: 'Question de synthèse : « Pensez-vous que les jeunes peuvent réellement contribuer à la préservation du patrimoine ? Justifiez en 3 lignes. »',
					solutionAr: 'Oui, je suis convaincu que les jeunes jouent un rôle décisif dans la sauvegarde du patrimoine. En effet, leur maîtrise des outils numériques leur permet de documenter et faire connaître des sites comme la Casbah ou Timgad. De plus, leur engagement dans les associations locales favorise le nettoyage et la valorisation de ces trésors.'
				},
				{
					problemAr: 'Formulez la visée communicative d’un appel sur l’économie de l’eau.',
					solutionAr: 'L’auteur vise à sensibiliser les citoyens à la gravité du gaspillage hydrique et à les exhorter à adopter des gestes quotidiens responsables.'
				},
				{
					problemAr: 'Proposez deux gestes concrets pour encourager la solidarité au lycée.',
					solutionAr: 'D’une part, les élèves peuvent créer des clubs d’entraide pour soutenir leurs camarades en difficulté scolaire. D’autre part, ils peuvent organiser des collectes de livres et de fournitures au profit des familles modestes.'
				}
			],
			watchOutAr: 'لا تنسخ فقرة من النص لتجيب عن سؤال التركيب! فهذا السؤال يقيس قدرتك على التفكير الشخصي وإعادة الصياغة في بضعة أسطر سليمة.'
		},
		practice: [
			{
				questionAr: 'Quelle visée correspond exactement à un texte du Projet 3 (L’Appel) ?',
				options: [
					'Sensibiliser les destinataires et les exhorter à agir pour changer une situation',
					'Raconter un mythe antique sans morale',
					'Expliquer uniquement une équation mathématique',
					'Rester neutre sans inviter à aucune action'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: غاية النداء هي التوعية والتحريض على الفعل الإيجابي.',
					'خطأ: لا صلة له بالأساطير.',
					'خطأ: ليس نصاً رياضياً بحتاً.',
					'خطأ: النداء نص ملتزم يطلب التحرك.'
				],
				explanationAr: 'يركز النداء على التوعية (sensibiliser) والدعوة للفعل (inciter / exhorter à agir).'
			},
			{
				questionAr: 'Quelle est la meilleure méthode pour répondre à la question de synthèse (2 à 3 lignes) au BAC LP ?',
				options: [
					'Répondre simplement « Oui » sans aucune justification',
					'Recopier intégralement le premier paragraphe du texte',
					'Exprimer une position claire, ajouter un argument personnel et un bref exemple',
					'Écrire deux pages complètes hors sujet'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الجواب بلا تعليل يفقدك معظم النقطة.',
					'خطأ: النسخ الحرفي يُرفض في سؤال التركيب.',
					'ممتاز: موقف واضح + تعليل شخصي + مثال موجز في 3-4 أسطر هو المفتاح الذهبي.',
					'خطأ: الإطالة الزائدة تهدر الوقت وتكثر الأخطاء.'
				],
				explanationAr: 'الإجابة المركزة والمعلّلة بأسلوب شخصي تضمن العلامة الكاملة.'
			},
			{
				questionAr: 'Dans une question demandant « Partagez-vous l’avis de l’auteur ? », quelle expression ouvre élégamment votre réponse ?',
				options: [
					'Le texte a été écrit en 1954.',
					'Je partage entièrement ce point de vue car...',
					'Il y a quatre verbes au passé simple.',
					'Définissons d’abord la voix passive.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا تجيب عن سؤال الرأي الشخصي.',
					'صحيح: عبارة راقية تعلن موقفك وتفتح باب التعليل بـ car.',
					'خطأ: خارج المطلوب.',
					'خطأ: خارج المطلوب.'
				],
				explanationAr: 'نستعمل عبارات إبداء الرأي المعلل: Je partage pleinement..., Personnellement, j’estime que..., À mon avis...'
			},
			{
				questionAr: 'Si le texte étudié est un texte d’histoire rendant hommage aux savants algériens, quelle visée faut-il retenir ?',
				options: [
					'Exhorter à acheter un appareil',
					'Critiquer la médecine moderne',
					'Divertir par une devinette',
					'Informer sur leur rôle historique et leur rendre hommage'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: ليس إعلاناً تجارياً.',
					'خطأ: ليس موضوع النص.',
					'خطأ: النص جاد وتاريخي.',
					'أحسنت: يجمع بين الإخبار التاريخي وتكريم العلماء الجزائريين.'
				],
				explanationAr: 'تتطابق الغاية دائماً مع نوع النص وموقف كاتبه.'
			},
			{
				questionAr: 'Quel articulateur permet d’introduire le deuxième argument dans une réponse de synthèse ?',
				options: ['De plus / Par ailleurs', 'Hier soir', 'C’est-à-dire rien', 'Bien que donc'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: De plus و Par ailleurs و En outre تربط الحجة الثانية بسلاسة.',
					'خطأ: مؤشر زمني لا رابط حجاجي.',
					'خطأ: عبارة غير صحيحة.',
					'خطأ: جمع خاطئ بين رابطين.'
				],
				explanationAr: 'الروابط المنطقية (En effet, De plus, Par exemple, Ainsi) تجعل فقرة التركيب متماسكة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Stratégie complète du BAC Français LP (13 pts + 7 pts, 02h30)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_lp_t3_strategie_bac_lp',
		slug: 'fre-3as-lp-t3-strategie-bac-lp',
		grade: '3as_lp',
		yearSubjectId: 769,
		trimesterId: 't3',
		sequenceId: 'projet3',
		sequenceTitleAr: 'المشروع 3: L’Appel (نص النداء والمراجعة الشاملة لبكالوريا آداب وفلسفة)',
		order: 5,
		titleAr: 'الاستراتيجية الشاملة لبكالوريا الفرنسية آداب وفلسفة (13 نقطة فهم + 7 نقاط إنتاج كتابي — 02h30)',
		objectives: [
			'إتقان إدارة الوقت الرسمي لامتحان البكالوريا (02 h 30، المعامل 3) وتوزيع الدقائق بين اختيار الموضوع والفهم والإنتاج الكتابي والمراجعة',
			'اتخاذ القرار السليم عند اختيار الموضوع (Sujet 1 أو Sujet 2) واختيار صيغة الإنتاج الكتابي (Compte rendu critique أو Production libre)',
			'تجنب الأخطاء الإملائية والنحوية العشرة الأكثر تضييعاً للنقاط في أوراق بكالوريا آداب وفلسفة'
		],
		keywordsAr: ['Stratégie BAC LP', 'Gestion du temps', '13+7=20', 'Compte rendu critique', 'Relecture'],
		discover: {
			scenarioAr:
				'في يوم امتحان البكالوريا (شعبة آداب وفلسفة، المعامل 3، المدة ساعتان ونصف)، يُعرض عليك موضوعان اختياريان (Sujet 1 et Sujet 2)، كل موضوع بـ 13 نقطة لـ Compréhension de l’écrit و 7 نقاط لـ Production écrite. الخطة الذكية تصنع فارقاً بـ 3 إلى 5 نقاط كاملة!',
			svg: svgFrenchWritingBlueprint({
				title: 'Gestion optimale des 02 h 30 (150 min — BAC LP)',
				steps: [
					{
						stage: '1. Choix (15 min)',
						detail: 'Lire les 2 sujets en entier et choisir le plus clair'
					},
					{
						stage: '2. Compréhension (65 min)',
						detail: 'Répondre aux 13 pts (lecture, langue, synthèse) au propre'
					},
					{
						stage: '3. Production (55 min)',
						detail: 'Brouillon structuré + rédaction soignée (7 pts : CRC ou Libre)'
					},
					{
						stage: '4. Relecture (15 min)',
						detail: 'Vérifier accords, temps, subjonctif, ponctuation, propreté'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كم دقيقة يجب تخصيصها لقراءة الموضوعين معاً قبل الحسم في أحدهما؟',
					hintAr: 'لا تبدأ الحل في الموضوع الأول فور فتح الورقة قبل تفحص الموضوع الثاني!',
					expectedInput: 'حوالي 15 دقيقة لقراءة النصين وأسئلتهما وموضوعي الإنتاج الكتابي',
					revealAr: 'خصص 15 دقيقة لفحص الموضوعين معاً: اختر الموضوع الذي تفهم نصه بوضوح وتضمن فيه أكبر عدد من أسئلة اللغة والإنتاج الكتابي.'
				},
				{
					promptAr: 'متى يُنصح باختيار « Compte rendu critique » ومتى يُنصح بـ « Production libre » في قسم الـ 7 نقاط؟',
					hintAr: 'قارن بين قدرتك على تلخيص النص ونقده وبين امتلاكك لأفكار ثرية في الموضوع الحر.',
					expectedInput: 'التقرير النقدي مضمون المنهجية إذا فهمت النص جيداً؛ والإنتاج الحر مناسب إذا أتقنت موضوعه وأفكاره ولغتك قوية',
					revealAr: 'التقرير النقدي (CRC) خيار آمن ومربح جداً لطلبة آداب وفلسفة لأنه يستمد أفكاره من النص مع فقرة نقدية مدروسة، أما الإنتاج الحر فيتألق فيه من يملك رصيداً لغوياً وأفكاراً منظمة.'
				},
				{
					promptAr: 'ما أبرز أربعة أخطاء يجب فحصها في آخر 15 دقيقة من المراجعة؟',
					hintAr: 'فكّر في المطابقة، الأزمنة، المنصوب، وعلامات الترقيم.',
					expectedInput: 'مطابقة الفاعل والفعل، مطابقة اسم المفعول مع être، تصريف subjonctif بعد bien que / il faut que، والنقط والفواصل',
					revealAr: 'المراجعة الهادئة لربع ساعة تكشف أخطاء تافهة مكلفة: نسيان -s الجمع، نسيان -e المؤنث، نسيان accent في الماضي المركب، وكتابة جمل بلا نقاط.'
				}
			]
		},
		summary: {
			rulesAr: [
				'بطاقة الامتحان الرسمي لشعبة آداب وفلسفة: المعامل 3 | المدة 02 h 30 | التوزيع: 13 نقطة (Compréhension de l’écrit : 7 للفهم + 6 للبناء اللغوي) + 7 نقاط (Production écrite).',
				'خطة الوقت الذهبية (150 دقيقة): 15 د لاختيار الموضوع | 65 د للإجابة المتأنية على أسئلة الـ 13 نقطة | 55 د للمسودة والتحرير النظيف للإنتاج الكتابي | 15 د للمراجعة النهائية الشاملة.',
				'قائمة الفحص قبل تسليم الورقة (Check-list BAC LP): (1) هل أجبت عن كل الأسئلة بالترقيم الصحيح؟ (2) هل علّلت أسئلة Vrai/Faux وأسئلة الرأي الشخصي؟ (3) هل طابقت الأفعال والصفات واسم المفعول؟ (4) هل يشتمل التقرير النقدي على الفقرات الثلاث (تقديم + تلخيص + نقد)؟',
				'إياك وترك أي سؤال فارغاً، وإياك والتشطيب العشوائي؛ الورقة المنظمة والخط المقروء يتركان انطباعاً ممتازاً لدى المصحح.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Barème et Pièges BAC 3AS LP',
				subtitle: 'Coefficient 3 — Durée 02 h 30 — Total 20 points',
				columns: [
					{
						header: 'Compréhension (7)',
						rule: 'Idées, Vrai/Faux, visée, synthèse',
						examples: 'Justifier sans recopier'
					},
					{
						header: 'Langue (6)',
						rule: 'Passif, discours, subjonctif, lexique',
						examples: 'Vérifier temps et accords'
					},
					{
						header: 'Production (7)',
						rule: 'CRC (3 parties) ou Essai/Appel',
						examples: 'Plan clair + 150-180 mots'
					}
				]
			}),
			visualCaptionAr: 'ملخص توزيع النقاط وأولويات المراجعة النهائية لامتحان بكالوريا آداب وفلسفة.',
			examples: [
				{
					problemAr: 'Corrigez les deux erreurs fréquentes : « Bien que les élèves ont révisé, ils doivent fais attention. »',
					solutionAr: '« Bien que les élèves aient révisé, ils doivent faire attention. » (subjonctif après bien que + infinitif après doivent).'
				},
				{
					problemAr: 'Corrigez l’accord du participe passé : « Ces écoles furent fondé par les réformateurs. »',
					solutionAr: '« Ces écoles furent fondées par les réformateurs. » (féminin pluriel avec être).'
				},
				{
					problemAr: 'Comment répartir les trois paragraphes du Compte rendu critique sur la copie ?',
					solutionAr: 'Paragraphe 1 (3-4 lignes) : accroche. Saut de ligne. Paragraphe 2 (8-10 lignes) : résumé objectif. Saut de ligne. Paragraphe 3 (4-5 lignes) : critique constructive.'
				}
			],
			watchOutAr: 'لا تغيّر الموضوع بعد مرور ساعة من الامتحان! خذ وقتك الكافي (15 دقيقة) في البداية لاختيار الموضوع الأنسب، ثم ثبُت عليه بثقة وهدوء حتى النهاية.'
		},
		practice: [
			{
				questionAr: 'Quels sont la durée officielle, le coefficient et la répartition des points au BAC Français 3AS Lettres et Philosophie ?',
				options: [
					'02 h 30, coefficient 3, 13 pts Compréhension + 7 pts Production écrite',
					'03 h 30, coefficient 5, 12 pts Compréhension + 8 pts Production écrite',
					'02 h 00, coefficient 2, 14 pts Compréhension + 6 pts Production écrite',
					'01 h 30, coefficient 1, 10 pts Compréhension + 10 pts Production écrite'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: هذه هي المعايير الرسمية الدقيقة لشعبة آداب وفلسفة.',
					'خطأ: هذه المعايير تخص شعبة اللغات الأجنبية (3AS LE).',
					'خطأ: توزيع 14 + 6 يخص الشعب العلمية وتسيير واقتصاد.',
					'خطأ: غير مطابق لنظام البكالوريا.'
				],
				explanationAr: 'بكالوريا الفرنسية آداب وفلسفة: المدة 02h30، المعامل 3، والتنقيط 13 (7+6) + 7 = 20.'
			},
			{
				questionAr: 'Combien de temps est-il conseillé de consacrer à la lecture comparative des deux sujets au début de l’épreuve ?',
				options: [
					'1 minute seulement',
					'Environ 15 minutes avant de trancher définitivement',
					'1 heure et demie',
					'Aucune lecture : il faut toujours prendre le Sujet 1 au hasard'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: دقيقة واحدة لا تكفي لفهم النصين والأسئلة.',
					'ممتاز: ربع ساعة تكفي لاختيار الموضوع الأوضح والأضمن نقاطاً.',
					'خطأ: ستضيع أكثر من نصف وقت الامتحان.',
					'خطأ: الاختيار العشوائي مخاطرة كبيرة.'
				],
				explanationAr: 'قراءة الموضوعين بهدوء لمدة 15 دقيقة تضمن اختيار الموضوع الأنسب لمستواك.'
			},
			{
				questionAr: 'Repérez et corrigez l’erreur dans : « Malgré que le texte est long, il reste clair. »',
				options: [
					'Malgré de le texte est long, il reste clair.',
					'Bien que le texte est long, il reste clair.',
					'Bien que le texte soit long, il reste clair.',
					'Quoique le texte sera long, il reste clair.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نضع de ولا جملة فعلية بعد malgré.',
					'خطأ: الفعل « est » لم يُصرف في Subjonctif.',
					'صحيح: نبدّل « Malgré que » بـ « Bien que » ونصرف الفعل في Subjonctif (soit).',
					'خطأ: لا نستعمل المستقبل بعد quoique.'
				],
				explanationAr: 'تصحيح « malgré que » الشائع يكون باستعمال « bien que / quoique + subjonctif ».'
			},
			{
				questionAr: 'Pourquoi faut-il réserver les 15 dernières minutes de l’épreuve à la relecture ?',
				options: [
					'Pour changer entièrement de sujet',
					'Pour effacer la partie critique du compte rendu',
					'Pour recopier le texte de l’examen',
					'Pour corriger les fautes d’accord, de conjugaison et vérifier que chaque question est traitée'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: يستحيل تغيير الموضوع في آخر 15 دقيقة.',
					'خطأ: حذف الفقرة النقدية يضيع نقاطاً أساسية.',
					'خطأ: لا فائدة من نسخ النص.',
					'أحسنت: المراجعة النهائية تنقذ نقاطاً ثمينة في الإملاء والتصريف والاكتمال.'
				],
				explanationAr: 'المراجعة المنهجية قبل التسليم ترفع العلامة بتدارك الأخطاء السهلة.'
			},
			{
				questionAr: 'Parmi ces trois productions, laquelle impose systématiquement trois paragraphes distincts (accroche, résumé, critique) en BAC LP ?',
				options: [
					'Le compte rendu critique',
					'Un simple tableau de nominalisation',
					'Une liste de mots de vocabulaire',
					'Un questionnaire Vrai ou Faux'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التقرير النقدي يتألف من ثلاث فقرات واضحة: التقديم، التلخيص الموضوعي، والنقد البناء.',
					'خطأ: ليس إنتاجاً كتابياً.',
					'خطأ: ليس إنتاجاً كتابياً.',
					'خطأ: هذا تمرين فهم.'
				],
				explanationAr: 'الالتزام بالفقرات الثلاث المنظمة هو العمود الفقري للتقرير النقدي في بكالوريا آداب وفلسفة.'
			}
		]
	}
];
