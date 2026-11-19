import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWordFormation,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_SCI_T2: FrenchInteractiveLessonData[] = [
	// [1] Le plaidoyer et le réquisitoire (thèse, arguments, visée persuasive)
	{
		id: 'fre_lesson_2as_sci_t2_plaidoyer_requisitoire',
		slug: 'fre-2as-sci-t2-plaidoyer-requisitoire',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع 2: المرافعة للدفاع عن قضية والادعاء لرفض ظاهرة (Le plaidoyer et le réquisitoire)',
		order: 1,
		titleAr: 'المرافعة والادعاء: الأطروحة والحجج والغاية الإقناعية (Le plaidoyer et le réquisitoire)',
		objectives: [
			'التمييز الدقيق بين نص المرافعة (le plaidoyer) للدفاع عن قضية ونص الادعاء/الاتهام (le réquisitoire) لرفض ظاهرة سلبية',
			'استخراج الموضوع (le thème) والأطروحة (la thèse) والحجج (les arguments) والأمثلة الداعمة في نص حجاجي',
			'تحديد الغاية الإقناعية (la visée argumentative / persuasive) وروابط تنظيم الحجج'
		],
		keywordsAr: [
			'Plaidoyer',
			'Réquisitoire',
			'Thème',
			'Thèse',
			'Arguments',
			'Exemples',
			'Visée argumentative'
		],
		discover: {
			scenarioAr:
				'في نادي البيئة بالثانوية، قدّم تلميذان كلمتين قصيرتين: الأول دافع بحماس عن ترشيد استهلاك الماء الصالح للشرب، واصفا إياه بالثروة الحيوية التي تحفظ الحياة والزراعة؛ بينما هاجم الثاني ظاهرة تبذير الخبز والغذاء، مبيّنا أضرارها الاقتصادية والأخلاقية. النص الأول « مرافعة » (plaidoyer) والثاني « ادعاء / اتهام » (réquisitoire).',
			svg: svgFrenchGrammarMap({
				title: 'Les deux visages de l’argumentation engagée',
				rootLabel: 'Argumenter (Convaincre)',
				rootSub: 'Thème + Thèse + Arguments + Exemples',
				branches: [
					{ label: 'Le Plaidoyer', rule: 'Défendre une cause', example: 'Pour la lecture et l’eau' },
					{ label: 'Le Réquisitoire', rule: 'Dénoncer un fléau', example: 'Contre le gaspillage' },
					{ label: 'Les Arguments', rule: 'Preuves ordonnées', example: 'D’abord, ensuite, enfin' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي بين « le plaidoyer » و« le réquisitoire » من حيث موقف الكاتب؟',
					hintAr: 'هل الكاتب يدافع ويؤيّد (pour)، أم يندّد ويهاجم (contre)؟',
					expectedInput: 'المرافعة للدفاع عن قضية (pour) والادعاء للتنديد بظاهرة سلبية (contre)',
					revealAr:
						'المرافعة (le plaidoyer) خطاب حجاجي للدفاع عن فكرة أو قضية نبيلة (être pour)، أما الادعاء (le réquisitoire) فخطاب للتنديد بظاهرة ضارة ومهاجمتها بالحجج (être contre).'
				},
				{
					promptAr: 'كيف نفرّق بين الموضوع (le thème) والأطروحة (la thèse) في النص الحجاجي؟',
					hintAr: 'الموضوع يكون كلمة أو عبارة محايدة، بينما الأطروحة جملة تعلن موقف الكاتب.',
					expectedInput: 'الموضوع هو القضية العامة، والأطروحة هي موقف الكاتب منها',
					revealAr:
						'الموضوع (le thème) هو العنوان العام (مثل: la préservation de l’eau)، أما الأطروحة (la thèse) فهي الرأي الذي يدافع عنه الكاتب أو يرفضه (مثل: Préserver l’eau est un devoir vital pour tous).'
				},
				{
					promptAr: 'لماذا يدعم الكاتب كل حجة بمثال واقعي (exemple)؟',
					hintAr: 'فكّر في أثر الإحصاء أو التجربة الواقعية في إقناع القارئ.',
					expectedInput: 'لتقوية الحجة وإقناع القارئ بواقعيتها',
					revealAr:
						'المثال (l’exemple) يجسّد الحجة المجردة في الواقع، مما يزيد قوة الإقناع (convaincre par la raison et persuader).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المرافعة (Le plaidoyer): نص حجاجي يتخذ فيه الكاتب موقفا مؤيدا (pour) للدفاع عن قضية نبيلة مثل: القراءة، العلم الأخلاقي، حماية الماء والبيئة.',
				'الادعاء / التنديد (Le réquisitoire): نص حجاجي يتخذ فيه الكاتب موقفا رافضا (contre) لفضح آفة أو سلوك ضار مثل: التبذير الغذائي، التلوث البلاستيكي، التضليل الرقمي.',
				'عناصر البناء الحجاجي: (1) الموضوع (le thème)، (2) الأطروحة (la thèse)، (3) الحجج المنطقية (les arguments)، (4) الأمثلة الملموسة (les exemples).',
				'روابط ترتيب الحجج (Les articulateurs d’énumération): D’abord / En premier lieu -> Ensuite / De plus / En outre / Par ailleurs -> Enfin / Pour conclure.',
				'الغاية التواصلية (La visée): إقناع القارئ بالمنطق والعقل (convaincre) والتأثير فيه ليتبنى الموقف أو يتحرك (persuader / faire réagir).'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Architecture d’un texte argumentatif (Plaidoyer / Réquisitoire)',
				steps: [
					{ stage: 'Introduction', detail: 'Annoncer le thème et formuler clairement la thèse', color: '#1d4ed8' },
					{ stage: 'Argument 1 + Ex.', detail: 'D’abord, présenter une preuve solide et un fait concret', color: '#047857' },
					{ stage: 'Argument 2 + Ex.', detail: 'Ensuite / De plus, renforcer la thèse par un autre angle', color: '#b45309' },
					{ stage: 'Conclusion', detail: 'Réaffirmer la position et lancer un appel responsable', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'البنية المنهجية لنص المرافعة ونص الادعاء في مستوى الثانية ثانوي',
			examples: [
				{
					problemAr: 'S’agit-il d’un plaidoyer ou d’un réquisitoire ? « Il est urgent de mettre fin au gaspillage scandaleux du pain, qui nuit à notre économie et bafoue la solidarité. »',
					solutionAr: 'C’est un réquisitoire (خطاب ادعاء وتنديد)، لأن الكاتب يهاجم ظاهرة التبذير بعبارات رافضة (mettre fin, scandaleux, nuit).'
				},
				{
					problemAr: 'Relevez le thème et la thèse : « La lecture quotidienne demeure un levier indispensable pour enrichir l’esprit critique des lycéens. »',
					solutionAr: 'Thème : La lecture chez les lycéens. Thèse : La lecture quotidienne est indispensable pour développer l’esprit critique.'
				}
			],
			watchOutAr:
				'في الامتحان، عند السؤال عن « la thèse défendue par l’auteur »، لا تكتفِ بكتابة كلمة واحدة (لأن تلك هي le thème فقط!)؛ بل صُغ جملة كاملة توضح رأي الكاتب وموقفه بدقة.'
		},
		practice: [
			{
				questionAr: 'Qu’est-ce qui caractérise un plaidoyer par rapport à un réquisitoire ?',
				options: [
					'Le plaidoyer raconte une histoire sans donner d’avis',
					'Le plaidoyer défend une cause ou une valeur, tandis que le réquisitoire dénonce un fléau',
					'Le plaidoyer interdit l’emploi d’exemples',
					'Le réquisitoire défend toujours une cause positive'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المرافعة نص حجاجي يحمل أطروحة واضحة لا مجرد قصة.',
					'أحسنت! المرافعة للدفاع (pour) والادعاء للتنديد والرفض (contre).',
					'الأمثلة ضرورية في كل من المرافعة والادعاء لتعزيز الحجج.',
					'العكس هو الصحيح: الادعاء يهاجم ظاهرة سلبية.'
				],
				explanationAr: 'المرافعة (plaidoyer) تدافع عن قضية نافعة، بينما الادعاء (réquisitoire) يندّد بآفة أو سلوك سلبي.'
			},
			{
				questionAr: 'Dans l’énoncé « Le plastique à usage unique détruit les sols et menace la faune marine », quel type de discours reconnaît-on ?',
				options: ['Un réquisitoire', 'Un plaidoyer', 'Un compte rendu objectif', 'Un mode d’emploi'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الأفعال القوية السلبية (détruit, menace) تندّد بآفة البلاستيك، فهو réquisitoire.',
					'الكاتب لا يدافع عن البلاستيك بل يهاجم أضراره.',
					'التقرير الموضوعي يلخص نصا آخر بضمير الغائب.',
					'ليست تعليمات استخدام.'
				],
				explanationAr: 'التنديد بأضرار البلاستيك وتدميره للبيئة يعبّر بوضوح عن خطاب الادعاء (le réquisitoire).'
			},
			{
				questionAr: 'Quel rôle jouent les connecteurs « D’abord », « En outre » et « Enfin » dans un plaidoyer ?',
				options: [
					'Ils indiquent la date exacte d’un événement',
					'Ils organisent et hiérarchisent la progression des arguments',
					'Ils expriment une opposition totale entre deux idées',
					'Ils servent uniquement à poser des questions'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ليست مؤشرات زمنية تأريخية.',
					'ممتاز! هي روابط تعداد وتنظيم ترتّب الحجج وتجعل النص متماسكا.',
					'روابط التعارض هي cependant و pourtant و mais.',
					'لا علاقة لها بالاستفهام.'
				],
				explanationAr: 'روابط التعداد (d’abord, ensuite, en outre, enfin) تنظّم تسلسل الحجج داخل العرض الحجاجي.'
			},
			{
				questionAr: 'Quelle différence distingue le « thème » de la « thèse » ?',
				options: [
					'Il n’existe aucune différence entre les deux',
					'Le thème est le sujet général ; la thèse est le point de vue pris par l’auteur sur ce sujet',
					'La thèse est toujours un seul mot',
					'Le thème figure uniquement dans la conclusion'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بل بينهما فرق جوهري يُسأل عنه دائما في الامتحانات.',
					'إجابة دقيقة! الموضوع عام ومحايد، والأطروحة تمثل موقف الكاتب الواضح.',
					'بالعكس، الموضوع غالبا عبارة موجزة أما الأطروحة ففكرة/جملة تامة.',
					'الموضوع يُطرح منذ العنوان والمقدمة.'
				],
				explanationAr: 'الموضوع (thème) يجيب عن « De quoi parle le texte ? »، والأطروحة (thèse) تجيب عن « Quelle est la position de l’auteur ? ».'
			},
			{
				questionAr: 'Quelle est la visée communicative d’un plaidoyer pour une science éthique ?',
				options: [
					'Convaincre le lecteur de la nécessité d’encadrer la science par des valeurs morales',
					'Décrire un paysage saharien au printemps',
					'Expliquer sans prendre position comment fonctionne un thermomètre',
					'Dénoncer l’utilité des livres scientifiques'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! المرافعة تسعى لإقناع القارئ وتبنيه موقف الكاتب المؤيد للعلم الأخلاقي.',
					'هذا غرض وصفي سياحي لا حجاجي.',
					'هذا خطاب تفسيري محايد بلا موقف.',
					'هذا يناقض الدفاع عن العلم الأخلاقي.'
				],
				explanationAr: 'الغاية التواصلية للمرافعة هي إقناع القارئ بقضية نبيلة وحثّه على تبنّيها.'
			}
		]
	},

	// [2] Les modalisateurs et le lexique mélioratif / péjoratif
	{
		id: 'fre_lesson_2as_sci_t2_modalisateurs_lexique',
		slug: 'fre-2as-sci-t2-modalisateurs-lexique',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع 2: المرافعة للدفاع عن قضية والادعاء لرفض ظاهرة (Le plaidoyer et le réquisitoire)',
		order: 2,
		titleAr: 'المؤشرات الذاتية والمعجم الإيجابي والسلبي (Les modalisateurs et le lexique mélioratif / péjoratif)',
		objectives: [
			'التمييز بين النص الموضوعي والنص الذاتي عبر رصد علامات حضور المتكلم (indices de subjectivité)',
			'توظيف المعجم التقديري الإيجابي (lexique mélioratif) في المرافعة والمعجم القدحي السلبي (lexique péjoratif) في الادعاء',
			'استعمال المؤشرات الموقفيّة (les modalisateurs) للتعبير عن اليقين أو الشك أو الإلزام أو الحكم القيمي'
		],
		keywordsAr: [
			'Subjectivité',
			'Modalisateurs',
			'Lexique mélioratif',
			'Lexique péjoratif',
			'Verbes d’opinion',
			'Certitude',
			'Jugement'
		],
		discover: {
			scenarioAr:
				'تأمل هذين التعبيرين: في مرافعة حول العلم الأخلاقي نقرأ: « Indéniablement, la recherche médicale constitue un progrès précieux et salutaire ». وفي ادعاء ضد التلوث نقرأ: « Malheureusement, le rejet irresponsable des déchets provoque une dégradation catastrophique ». لاحظ كيف تكشف الكلمات عن مشاعر الكاتب وموقفه دون أن يحتاج دائما لكتابة كلمة « je »!',
			svg: svgFrenchGrammarMap({
				title: 'Les outils de la subjectivité (Modalisateurs)',
				rootLabel: 'Marquer son point de vue',
				rootSub: 'L’auteur s’implique dans son discours',
				branches: [
					{ label: 'Mélioratif (+)', rule: 'Valoriser une cause', example: 'précieux, bénéfique' },
					{ label: 'Péjoratif (-)', rule: 'Dénoncer un fléau', example: 'nuisible, désastreux' },
					{ label: 'Adverbes', rule: 'Certitude / Jugement', example: 'certes, hélas, sans doute' },
					{ label: 'Verbes modaux', rule: 'Devoir / Opinion', example: 'affirmer, déplorer, falloir' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما الصفات التي تُظهر تقدير الكاتب للبحث الطبي؟',
					hintAr: 'ابحث عن الصفتين اللتين تصفان كلمة (progrès).',
					expectedInput: 'précieux و salutaire (معجم إيجابي / mélioratif)',
					revealAr:
						'الصفتان (précieux, salutaire) تنتميان إلى المعجم الإيجابي (le lexique mélioratif / valorisant) وتُستعملان بكثرة في المرافعة (plaidoyer).'
				},
				{
					promptAr: 'ما دلالة الكلمات « Malheureusement », « irresponsable », « catastrophique » في الجملة الثانية؟',
					hintAr: 'هل تمنح قيمة إيجابية أم تندّد بسلوك خطير؟',
					expectedInput: 'تعبر عن موقف سلبي وتنديد (lexique péjoratif et modalisateur)',
					revealAr:
						'الظرف (Malheureusement) مؤشر حكم وأسف، والصفتان (irresponsable, catastrophique) من المعجم السلبي (lexique péjoratif / dévalorisant) المميز للادعاء (réquisitoire).'
				},
				{
					promptAr: 'هل يمكن أن يكون الكاتب حاضرا بذاتيته في النص حتى دون استعمال الضمير « je »؟',
					hintAr: 'انظر إلى الجملتين السابقتين: هل ورد فيهما ضمير « je »؟',
					expectedInput: 'نعم، بفضل المعجم الإيجابي/السلبي والمؤشرات الذاتية (modalisateurs)',
					revealAr:
						'نعم! تُسمى هذه الحالة « الحضور الضمني للكاتب » (subjectivité implicite) عبر اختيار الصفات والظروف وأفعال الحكم واليقين.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المؤشرات الذاتية (Les modalisateurs): هي كل الوسائل اللغوية التي يُظهر بها الكاتب موقفه أو درجة يقينه أو مشاعره تجاه ما يقول.',
				'المعجم الإيجابي التقديري (Lexique mélioratif): يرفع من قيمة الشيء في المرافعة؛ مثل: bénéfique, indispensable, précieux, exemplaire, vertueux, atout, richesse.',
				'المعجم السلبي القدحي (Lexique péjoratif): يحطّ من قيمة الظاهرة في الادعاء؛ مثل: nuisible, désastreux, fléau, gaspilleur, alarmant, menace, scandaleux.',
				'أصناف أخرى من الـ modalisateurs: ظروف اليقين والشك (certainement, indéniablement, probablement)، ظروف التقييم (heureusement, malheureusement, gravement)، أفعال الرأي والحكم (affirmer, dénoncer, déplorer, estimer)، أفعال الإلزام (devoir, falloir)، والشرطي للتخفيف أو التحفظ (serait, pourrait).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Lexique mélioratif vs Lexique péjoratif',
				subtitle: 'Adapter le vocabulaire à la visée argumentative',
				columns: [
					{ header: 'Plaidoyer (+)', rule: 'Valoriser la cause', examples: 'vital, salutaire, progrès' },
					{ header: 'Réquisitoire (-)', rule: 'Dénoncer le danger', examples: 'fléau, toxique, désastre' },
					{ header: 'Certitude / Devoir', rule: 'Appuyer la thèse', examples: 'indéniablement, il faut' }
				]
			}),
			visualCaptionAr: 'التقابل المعجمي بين المرافعة والادعاء في التعبير عن الذاتية',
			examples: [
				{
					problemAr: 'Relevez les modalisateurs et précisez leur nuance : « Il est indéniable que le gaspillage d’eau constitue une menace grave. »',
					solutionAr: '« Il est indéniable que » (يقين / certitude) ; « menace grave » (معجم سلبي وحكم قيمي / lexique péjoratif).'
				},
				{
					problemAr: 'Remplacez l’expression neutre par un terme mélioratif : « La lecture est une activité utile. »',
					solutionAr: 'La lecture est une activité enrichissante / indispensable / précieuse.'
				}
			],
			watchOutAr:
				'في الامتحان، عندما يُسأل: « L’auteur s’implique-t-il dans son texte ? Justifiez »، لا تكتفِ بالبحث عن « je » فقط! ابحث أيضا عن « nous », « notre », والمعجم المادح أو القادح (mélioratif/péjoratif) وظروف الحكم (heureusement, certes, il faut).'
		},
		practice: [
			{
				questionAr: 'Dans un plaidoyer pour la lecture, quel adjectif relève du lexique mélioratif ?',
				options: ['nuisible', 'enrichissant', 'désastreux', 'stérile'],
				correctIndex: 1,
				diagnosticFeedback: [
					'nuisible (ضار) صفة سلبية قدحية.',
					'صحيح! « enrichissant » (مُثرٍ) صفة تقديرية إيجابية تخدم المرافعة.',
					'désastreux (كارثي) صفة سلبية قدحية.',
					'stérile (عقيم) صفة سلبية.'
				],
				explanationAr: 'المعجم التقديري الإيجابي يبرز منافع القضية المدافَع عنها، ومنه: enrichissant, précieux, indispensable.'
			},
			{
				questionAr: 'Quelle nuance exprime le modalisateur souligné dans : « Indéniablement, l’eau potable devient une ressource rare » ?',
				options: ['Le doute', 'La certitude', 'Le souhait', 'La comparaison'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الشك يُعبّر عنه بـ peut-être أو probablement.',
					'أحسنت! « Indéniablement » (بما لا يدع مجالا للشك) تعبر عن اليقين القوي.',
					'التمني يُعبّر عنه بأفعال مثل souhaiter.',
					'لا توجد مقارنة في الجملة.'
				],
				explanationAr: 'الظرف « indéniablement » (مثل certainement و sans aucun doute) يعبر عن اليقين (la certitude).'
			},
			{
				questionAr: 'Repérez l’intrus qui N’APPARTIENT PAS au lexique péjoratif :',
				options: ['fléau', 'catastrophique', 'salutaire', 'irresponsable'],
				correctIndex: 2,
				diagnosticFeedback: [
					'fléau (آفة) كلمة سلبية.',
					'catastrophique (كارثي) صفة سلبية.',
					'ممتاز! « salutaire » (نافع ومنقذ) صفة إيجابية (mélioratif) فهي الدخيل هنا.',
					'irresponsable (غير مسؤول) صفة سلبية.'
				],
				explanationAr: 'كلمة « salutaire » إيجابية تقديرية، بينما الكلمات الثلاث الأخرى قدحية سلبية.'
			},
			{
				questionAr: 'Quel verbe introducteur convient le mieux dans un réquisitoire contre la pollution ?',
				options: ['féliciter', 'dénoncer', 'applaudir', 'encourager'],
				correctIndex: 1,
				diagnosticFeedback: [
					'féliciter (يهنّئ) إيجابي لا يناسب التنديد.',
					'صحيح! « dénoncer » (يندد ويفضح) فعل مركزي في خطاب الادعاء.',
					'applaudir (يصفّق) يفيد التأييد.',
					'encourager (يشجّع) يفيد الدفاع والتأييد.'
				],
				explanationAr: 'في خطاب الادعاء (réquisitoire) نستعمل أفعالا مثل: dénoncer, condamner, déplorer, critiquer.'
			},
			{
				questionAr: 'Pourquoi dit-on que l’auteur est implicitement présent dans : « Ce gaspillage révoltant met en péril notre avenir » ?',
				options: [
					'Parce qu’il utilise des dates historiques précises',
					'Parce qu’il emploie un adjectif péjoratif (révoltant) et le possessif inclusif (notre)',
					'Parce qu’il cite uniquement des formules mathématiques',
					'Parce qu’il emploie la voix passive neutre'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التواريخ مؤشر موضوعي لا ذاتي.',
					'إجابة دقيقة! الصفة القوية (révoltant) وضمير الملكية (notre) يكشفان انخراط الكاتب الذاتي.',
					'لا توجد معادلات رياضية هنا.',
					'الجملة مبنية للمعلوم ومشحونة بالحكم القيمي.'
				],
				explanationAr: 'حضور الذاتية يظهر في النعت القدحي (révoltant) والضمير الجامع (notre) دون حاجة إلى كتابة « je ».'
			}
		]
	},

	// [3] Les rapports d'opposition et de concession
	{
		id: 'fre_lesson_2as_sci_t2_opposition_concession',
		slug: 'fre-2as-sci-t2-opposition-concession',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع 2: المرافعة للدفاع عن قضية والادعاء لرفض ظاهرة (Le plaidoyer et le réquisitoire)',
		order: 3,
		titleAr: 'التعارض والاستدراك (L’opposition et la concession : cependant, bien que + subjonctif, malgré)',
		objectives: [
			'التمييز الدلالي بين التعارض البسيط (l’opposition) والاستدراك/التسليم الجزئي (la concession) في الحجاج',
			'توظيف أدوات الاستدراك مع الصيغة الصحيحة: bien que / quoique + subjonctif، même si + indicatif، malgré + nom',
			'تصريف الأفعال الأساسية في الحاضر المنصوب (le subjonctif présent) بعد أدوات الاستدراك دون أخطاء'
		],
		keywordsAr: [
			'Opposition',
			'Concession',
			'Bien que',
			'Quoique',
			'Subjonctif',
			'Malgré',
			'Cependant',
			'Même si'
		],
		discover: {
			scenarioAr:
				'في مرافعة عن ترشيد الماء، كتب التلميذ: (1) « Certains citoyens gaspillent l’eau, alors que d’autres l’économisent soigneusement ». (2) « Bien que l’Algérie dispose de stations de dessalement, la préservation de chaque goutte reste indispensable ». (3) « Malgré la sécheresse, les oasis du M’Zab demeurent verdoyantes ». لاحظ الفرق بين الربط بين حقيقتين متقابلتين والربط بين عائق ونتيجة غير متوقعة.',
			svg: svgFrenchGrammarMap({
				title: 'Opposition et Concession : Modes et Structures',
				rootLabel: 'Opposer / Concéder',
				rootSub: 'Bien choisir le mode verbal après le connecteur',
				branches: [
					{ label: 'Bien que / Quoique', rule: '+ SUBJONCTIF', example: 'Bien qu’il soit cher...' },
					{ label: 'Même si / Alors que', rule: '+ INDICATIF', example: 'Même s’il pleut peu...' },
					{ label: 'Malgré / En dépit de', rule: '+ GROUPE NOMINAL', example: 'Malgré le danger...' },
					{ label: 'Mais / Cependant', rule: 'Coordination', example: 'cependant, il agit.' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الثانية « Bien que l’Algérie dispose de stations... »، أي صيغة فعلية تلي دائما « bien que »؟',
					hintAr: 'تذكر الصيغة التي تقابل (être -> soit، avoir -> ait، faire -> fasse).',
					expectedInput: 'المنصوب (Le subjonctif)',
					revealAr:
						'يتبع « bien que » و« quoique » دائما صيغة المنصوب (le subjonctif): Bien qu’il soit..., Bien que nous fassions..., Bien qu’elles puissent...'
				},
				{
					promptAr: 'ما الذي يأتي مباشرة بعد « Malgré » في الجملة الثالثة « Malgré la sécheresse... »؟',
					hintAr: 'هل « la sécheresse » اسم أم فعل مصرف؟ وهل يصح قول « malgré que »؟',
					expectedInput: 'اسم (groupe nominal)، ولا نكتب malgré que في الفرنسية الفصيحة',
					revealAr:
						'يأتي بعد « malgré » و« en dépit de » دائما اسم أو مجموعة اسمية (Malgré la sécheresse / Malgré ses efforts)، ويُتجنّب تماما استعمال (malgré que).'
				},
				{
					promptAr: 'ما الفرق في المعنى بين التعارض (opposition) والاستدراك (concession)؟',
					hintAr: 'الاستدراك يعترف بواقع أو عائق كان يُفترض أن يمنع النتيجة، لكنها وقعت رغم ذلك.',
					expectedInput: 'التعارض يقابل بين فكرتين، والاستدراك يعترف بعائق لم يمنع تحقق النتيجة',
					revealAr:
						'في التعارض (alors que, tandis que) نقابل بين وضعين مختلفين؛ أما في الاستدراك (bien que, malgré, pourtant) فنعترف بحقيقة مخالفة ثم نؤكد أن النتيجة وقعت رغمها، وهي استراتيجية حجاجية قوية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستدراك بربط مركّب + المنصوب (Subjonctif): bien que, quoique. مثال: Bien que la technologie soit avancée, l’éthique demeure prioritaire.',
				'الاستدراك بربط مركّب + الإخباري (Indicatif): même si. مثال: Même si le recyclage demande des efforts, il protège notre santé.',
				'الاستدراك في جملة بسيطة + اسم (Groupe nominal): malgré, en dépit de. مثال: Malgré le coût initial, l’énergie solaire est rentable.',
				'روابط التنسيق للاستدراك والتعارض: mais, cependant, pourtant, toutefois, néanmoins (تُربط بين جملتين مستقلتين). وروابط التعارض الخالص: alors que, tandis que, en revanche, au contraire.',
				'تذكير بأهم أفعال الـ subjonctif présent: être (sois, soit, soyons, soient) — avoir (aie, ait, ayons, aient) — faire (fasse, fassent) — pouvoir (puisse, puissent) — savoir (sache) — aller (aille).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Subjonctif présent des verbes clés (après bien que)',
				subtitle: 'Radical de « ils » au présent + -e, -es, -e, -ions, -iez, -ent',
				columns: [
					{ header: 'être / avoir', rule: 'Irréguliers à retenir', examples: 'qu’il soit / qu’il ait' },
					{ header: 'faire / pouvoir', rule: 'Fass- / Puiss-', examples: 'qu’il fasse / puisse' },
					{ header: 'Verbes réguliers', rule: 'finir -> finiss-', examples: 'qu’il finisse / agisse' }
				]
			}),
			visualCaptionAr: 'تصريف أهم الأفعال في الحاضر المنصوب بعد bien que و quoique',
			examples: [
				{
					problemAr: 'Reliez par « bien que » : « Les écrans sont pratiques. Ils fatiguent la vue des élèves. »',
					solutionAr: 'Bien que les écrans soient pratiques, ils fatiguent la vue des élèves. (être -> soient au subjonctif).'
				},
				{
					problemAr: 'Transformez en utilisant « malgré » : « Bien que les campagnes soient nombreuses, le gaspillage persiste. »',
					solutionAr: 'Malgré le grand nombre de campagnes (ou : Malgré de nombreuses campagnes), le gaspillage persiste.'
				}
			],
			watchOutAr:
				'ثلاثة أخطاء شائعة احذر منها في البناء اللغوي: (1) لا تكتب أبدا « malgré que »، بل « bien que + subjonctif » أو « malgré + nom ». (2) « même si » يتبعها الإخباري (indicatif) لا المنصوب! (3) لا تجمع « bien que » مع « mais » في الجملة نفسها (لا تقل: Bien qu’il soit tard, mais il travaille).'
		},
		practice: [
			{
				questionAr: 'Complétez correctement : « Bien que le plastique ........ léger et bon marché, il pollue durablement les océans. »',
				options: ['est', 'sera', 'soit', 'était'],
				correctIndex: 2,
				diagnosticFeedback: [
					'« bien que » تفرض المنصوب (subjonctif) لا الإخباري.',
					'المستقبل غير صحيح بعد bien que.',
					'أحسنت! (soit) هو الحاضر المنصوب للفعل être.',
					'الماضي الناقص إخباري ولا يصح بعد bien que.'
				],
				explanationAr: 'أداة الاستدراك « bien que » تتبع وجوبا بالـ subjonctif (être -> qu’il soit).'
			},
			{
				questionAr: 'Choisissez la transformation correcte avec « malgré » : « Bien que les coûts soient élevés, la ville investit dans le solaire. »',
				options: [
					'Malgré que les coûts soient élevés, la ville investit dans le solaire.',
					'Malgré les coûts élevés, la ville investit dans le solaire.',
					'Malgré sont élevés les coûts, la ville investit dans le solaire.',
					'Malgré les coûts élevés, mais la ville investit dans le solaire.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'صيغة « malgré que » خاطئة في الفرنسية السليمة.',
					'إجابة مثالية! « malgré » متبوعة مباشرة بمجموعة اسمية (les coûts élevés).',
					'لا يصح وضع فعل مصرف بعد malgré.',
					'لا يجوز الجمع بين malgré و mais في الجملة نفسها.'
				],
				explanationAr: '« Malgré » حرف جر يُتبع باسم أو مجموعة اسمية دون « que » ودون تكرار « mais ».'
			},
			{
				questionAr: 'Complétez avec le mode correct : « Même si ce projet ........ du temps, il garantit l’avenir des générations futures. »',
				options: ['demande', 'demandât', 'fasse', 'soit demandé'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! « même si » يتبعها الإخباري (indicatif : demande).',
					'لا نستخدم المنصوب بعد même si.',
					'الفعل لا يناسب المعنى والصيغة منصوبة خطأ.',
					'صيغة منصوبة مبنية للمجهول غير مناسبة بعد même si.'
				],
				explanationAr: 'خلاف « bien que »، فإن « même si » تتبع دائما بصيغة الإخباري (indicatif).'
			},
			{
				questionAr: 'Conjuguez correctement le verbe entre parenthèses : « Quoique les chercheurs (faire) des progrès remarquables, la vigilance éthique reste essentielle. »',
				options: ['font', 'feront', 'fassent', 'faisaient'],
				correctIndex: 2,
				diagnosticFeedback: [
					'font في الإخباري، و« quoique » تفرض المنصوب.',
					'المستقبل خطأ بعد quoique.',
					'ممتاز! (fassent) هو الحاضر المنصوب للفعل faire مع الضمير الجمع.',
					'faisaient في الماضي الناقص الإخباري.'
				],
				explanationAr: '« Quoique » ترادف « bien que » وتفرض الـ subjonctif: faire -> qu’ils fassent.'
			},
			{
				questionAr: 'Laquelle de ces phrases exprime une concession SANS faute grammaticale ?',
				options: [
					'Bien qu’il y ait des lois, mais certains polluent encore.',
					'Certes la voiture est rapide ; cependant, les transports publics réduisent la pollution.',
					'Malgré qu’il pleut, les agriculteurs sèment.',
					'Bien que l’eau a une grande valeur, on la gaspille.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ الجمع بين bien que و mais في جملة واحدة.',
					'صحيح 100%! ثنائية « Certes... cependant... » أسلوب حجاجي راقٍ وسليم تماما.',
					'خطأ استعمال malgré que مع الإخباري.',
					'بعد bien que يجب تصريف avoir في المنصوب (ait) لا (a).'
				],
				explanationAr: 'البنية الحجاجية « Certes..., cependant / pourtant... » تعبّر عن التسليم الجزئي ثم الاستدراك بسلامة تامة.'
			}
		]
	},

	// [4] La nominalisation et les champs lexicaux dans l'argumentation
	{
		id: 'fre_lesson_2as_sci_t2_nominalisation_champs_lexicaux',
		slug: 'fre-2as-sci-t2-nominalisation-champs-lexicaux',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع 2: المرافعة للدفاع عن قضية والادعاء لرفض ظاهرة (Le plaidoyer et le réquisitoire)',
		order: 4,
		titleAr: 'الاسمية والحقول المعجمية في النص الحجاجي (La nominalisation et les champs lexicaux)',
		objectives: [
			'تحويل الأفعال والصفات إلى أسماء (nominalisation verbale et adjectivale) لتكثيف الحجج وصياغة عناوين قوية',
			'توظيف اللواحق الاسمية الدقيقة (-tion, -ment, -age, -ité, -ance/-ence) وإكمال جدول عائلة الكلمة',
			'استخراج الحقل المعجمي المهيمن في المرافعة أو الادعاء وبيان علاقته بأطروحة الكاتب'
		],
		keywordsAr: [
			'Nominalisation',
			'Suffixes nominaux',
			'Famille de mots',
			'Champ lexical',
			'Phrase nominale',
			'Synthèse'
		],
		discover: {
			scenarioAr:
				'في حملة توعوية بالثانوية، اقترح التلاميذ تحويل الجمل الطويلة إلى شعارات وعناوين مكثفة: بدل « On doit préserver l’eau potable » كتبوا « La préservation de l’eau potable »؛ وبدل « Les déchets plastiques sont dangereux » كتبوا « La dangerosité (أو le danger) des déchets plastiques ». هذه العملية اللغوية تُسمى الاسمية (la nominalisation).',
			svg: svgFrenchWordFormation({
				title: 'La nominalisation dans le texte argumentatif',
				prefix: 'Verbe : gaspiller',
				root: 'gaspill-',
				suffix: '-age (nom)',
				derivedWord: 'Le gaspillage (Nom d’action)',
				meaningNote: 'Permet de condenser les titres, les arguments et les structures avec « malgré »'
			}),
			steps: [
				{
					promptAr: 'كيف حوّلنا الفعل « préserver » إلى اسم في العنوان « La préservation de l’eau »؟',
					hintAr: 'انظر إلى اللاحقة المضافة إلى جذر الفعل (préserv-).',
					expectedInput: 'بإضافة اللاحقة -ation لتحويل الفعل إلى اسم (préservation)',
					revealAr:
						'أضفنا اللاحقة الاسمية (-ation) إلى الجذر، وهذه تُسمّى الاسمية الفعلية (nominalisation à base verbale).'
				},
				{
					promptAr: 'لماذا تفيدنا الاسمية مباشرة عند استعمال أدوات مثل « grâce à » و« malgré » و« à cause de »؟',
					hintAr: 'تذكر ما نوع الكلمة التي تتبع هذه الأدوات في الجملة البسيطة.',
					expectedInput: 'لأن هذه الأدوات تتطلب اسما بعدها (groupe nominal) لا فعلا مصرفا',
					revealAr:
						'أدوات مثل (malgré, grâce à, à cause de) تتطلب مجموعة اسمية؛ فالاسمية تحول جملة فعلية إلى اسم سليم: « On gaspille le pain » -> « À cause du gaspillage du pain ».'
				},
				{
					promptAr: 'ما المقصود بالحقل المعجمي (le champ lexical) في سؤال الفهم؟',
					hintAr: 'هل يجب أن تكون كل كلمات الحقل المعجمي من نفس الجذر، أم يكفي أن تنتمي إلى نفس الموضوع؟',
					expectedInput: 'مجموعة كلمات (أسماء، أفعال، صفات) ترتبط بموضوع أو فكرة واحدة',
					revealAr:
						'الحقل المعجمي هو مجموع الكلمات (أسماء، أفعال، صفات) التي تحيل إلى فكرة واحدة، حتى لو اختلفت جذورها؛ مثل حقل البيئة: eau, forêt, recycler, vert, pollution, protéger.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاسمية الفعلية (Nominalisation d’un verbe): تحويل الفعل إلى اسم باللواحق: -tion / -ation (protéger -> protection, polluer -> pollution)، -ment (développer -> développement)، -age (gaspiller -> gaspillage, recycler -> recyclage)، -ure (lire -> lecture)، -ance/-ence (tolérer -> tolérance).',
				'الاسمية الصفاتية (Nominalisation d’un adjectif): تحويل الصفة إلى اسم باللواحق: -ité (responsable -> responsabilité, solidaire -> solidarité)، -eur (lent -> lenteur)، -esse (sage -> sagesse)، -ance/-ence (prudent -> prudence).',
				'تُستعمل الاسمية لكتابة عناوين جذابة، وتلخيص الأفكار في التقرير الموضوعي، والربط بأدوات الاسم (malgré, grâce à, à cause de, en cas de).',
				'الحقل المعجمي (Le champ lexical): يضم كلمات تنتمي للمجال الدلالي نفسه (أسماء، أفعال، صفات)؛ بينما عائلة الكلمة (la famille de mots) تضم كلمات تشترك في الجذر نفسه (éduquer, éducation, éducatif).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Principaux suffixes de nominalisation',
				rootLabel: 'Former un nom précis',
				rootSub: 'À partir d’un verbe ou d’un adjectif',
				branches: [
					{ label: '-tion / -ation', rule: 'Action / Résultat', example: 'préserver -> préservation' },
					{ label: '-ment / -age', rule: 'Processus / Fait', example: 'recycler -> recyclage' },
					{ label: '-ité / -esse', rule: 'Qualité (adjectif)', example: 'solidaire -> solidarité' },
					{ label: '-ance / -ence', rule: 'État / Attitude', example: 'prudent -> prudence' }
				]
			}),
			visualCaptionAr: 'أشهر اللواحق الاسمية المطلوبة في تمارين البناء اللغوي للسنة الثانية ثانوي',
			examples: [
				{
					problemAr: 'Nominalisez la phrase suivante : « Les citoyens recyclent les déchets ménagers. »',
					solutionAr: 'Le recyclage des déchets ménagers par les citoyens.'
				},
				{
					problemAr: 'Complétez la famille de mots : Verbe : sensibiliser | Nom : ........ | Adjectif : ........',
					solutionAr: 'Nom : sensibilisation (ou : sensibilité) | Adjectif : sensible.'
				}
			],
			watchOutAr:
				'فرّق بدقة بين « famille de mots » (نفس الجذر: polluer, pollution, polluant) و« champ lexical » (نفس الموضوع حتى بجذور مختلفة: pollution, déchets, toxique, enfumer, dégrader).'
		},
		practice: [
			{
				questionAr: 'Quelle est la nominalisation correcte de la phrase : « Les écoles encouragent la lecture » ?',
				options: [
					'L’encouragement de la lecture par les écoles',
					'L’encourageation de la lecture par les écoles',
					'Le courage de la lecture par les écoles',
					'L’encourageable lecture des écoles'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! اسم الفعل (encourager) هو (l’encouragement).',
					'هذه الكلمة غير موجودة في الفرنسية.',
					'« le courage » يغيّر معنى الفعل الأصلي (encourager).',
					'« encourageable » صفة لا اسم.'
				],
				explanationAr: 'الفعل « encourager » يُحوّل إلى الاسم « encouragement » باللاحقة (-ment).'
			},
			{
				questionAr: 'Quel est le nom dérivé de l’adjectif « responsable » ?',
				options: ['responsablement', 'responsabilité', 'réponse', 'responsabiliser'],
				correctIndex: 1,
				diagnosticFeedback: [
					'responsablement ظرف (adverbe).',
					'ممتاز! اللاحقة (-ité) تحول الصفة (responsable) إلى الاسم (responsabilité).',
					'réponse تعني إجابة لا مسؤولية.',
					'responsabiliser فعل لا اسم.'
				],
				explanationAr: 'الصفات المنتهية بـ (-ble) تُحوّل غالبا إلى أسماء باللاحقة (-bilité): responsable -> responsabilité.'
			},
			{
				questionAr: 'Parmi ces séries, laquelle constitue un CHAMP LEXICAL de l’écologie (et non une simple famille de mots) ?',
				options: [
					'forêt, forestier, déforestation, reboisement',
					'nature, recyclage, biodégradable, préserver, écosystème',
					'polluer, pollution, polluant, dépolluer',
					'libre, liberté, libérer, libération'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه عائلة كلمات (جذر forêt/bois) أكثر منها حقلا معجميا واسعا.',
					'أحسنت! كلمات متنوعة الجذور والأقسام (أسماء، صفة، فعل) يجمعها موضوع البيئة.',
					'هذه عائلة كلمة واحدة من جذر (pollu-).',
					'هذه عائلة كلمة واحدة من جذر (libr-).'
				],
				explanationAr: 'الحقل المعجمي يجمع مفردات مختلفة الجذور والأقسام النحوية مرتبطة بموضوع واحد.'
			},
			{
				questionAr: 'Transformez en groupe nominal pour compléter : « Les eaux sont contaminées -> À cause de ........ . »',
				options: [
					'la contamination des eaux',
					'le contaminer des eaux',
					'la contaminant des eaux',
					'le contamineux des eaux'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفعل (contaminer) يعطي الاسم (la contamination).',
					'المصدر لا يصح هنا كاسم.',
					'contaminant صفة أو اسم فاعل للمادة الملوِّثة وليس الحدث.',
					'كلمة غير صحيحة في الفرنسية.'
				],
				explanationAr: 'نحوّل (être contaminées) إلى الاسم (la contamination) لتشكيل مجموعة اسمية بعد « à cause de ».'
			},
			{
				questionAr: 'Quel trio (Verbe / Nom / Adjectif) est entièrement EXACT ?',
				options: [
					'gaspiller / gaspillage / gaspilleur',
					'protéger / protègement / protecteur',
					'informer / informage / informatif',
					'détruire / détruisance / destructeur'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الثلاثي (gaspiller / gaspillage / gaspilleur) سليم إملائيا وصرفيا.',
					'الاسم الصحيح من protéger هو protection وليس protègement.',
					'الاسم الصحيح من informer هو information وليس informage.',
					'الاسم الصحيح من détruire هو destruction وليس détruisance.'
				],
				explanationAr: 'الأسماء الصحيحة هي: gaspillage (gaspiller)، protection (protéger)، information (informer)، destruction (détruire).'
			}
		]
	},

	// [5] Rédiger un plaidoyer ou un réquisitoire
	{
		id: 'fre_lesson_2as_sci_t2_rediger_plaidoyer_requisitoire',
		slug: 'fre-2as-sci-t2-rediger-plaidoyer-requisitoire',
		grade: '2as_se',
		yearSubjectId: 675,
		trimesterId: 't2',
		sequenceId: 'proj2',
		sequenceTitleAr: 'المشروع 2: المرافعة للدفاع عن قضية والادعاء لرفض ظاهرة (Le plaidoyer et le réquisitoire)',
		order: 5,
		titleAr: 'منهجية تحرير مرافعة أو ادعاء (Rédiger un plaidoyer ou un réquisitoire)',
		objectives: [
			'بناء خطة محكمة لمرافعة (عن القراءة أو العلم الأخلاقي أو الماء) أو ادعاء (ضد التبذير أو التلوث)',
			'توظيف الحجج المتدرجة مع الأمثلة الواقعية والروابط المنطقية (إضافة، استدراك، نتيجة) والمعجم المناسب',
			'الالتزام بمعايير التصحيح الرسمية في الثانية ثانوي علمي (الملاءمة، الانسجام، سلامة اللغة، الإتقان)'
		],
		keywordsAr: [
			'Production écrite',
			'Plaidoyer',
			'Réquisitoire',
			'Plan argumentatif',
			'Connecteurs logiques',
			'Concession réfutée',
			'Appel final'
		],
		discover: {
			scenarioAr:
				'في موضوع الإنتاج الكتابي للفصل الثاني، يُطلب منك تحرير فقرة حجاجية (12 إلى 16 سطرا) للدفاع عن قضية (مثل حماية الماء أو القراءة أو العلم الأخلاقي) أو للتنديد بآفة (مثل التبذير الغذائي أو التلوث البلاستيكي). السر في نيل العلامة الكاملة (6/6) هو الانتقال المنظم من الأطروحة إلى ثلاث حجج مدعمة بأمثلة، مع استدراك ذكي وخاتمة داعية للعمل.',
			svg: svgFrenchWritingBlueprint({
				title: 'Feuille de route : Rédiger un plaidoyer ou un réquisitoire',
				steps: [
					{ stage: '1. Introduction', detail: 'Situer le thème + annoncer clairement sa thèse (pour/contre)', color: '#1d4ed8' },
					{ stage: '2. Arg. 1 et 2', detail: 'D’abord... En effet... Ensuite / De plus... Par exemple...', color: '#047857' },
					{ stage: '3. Concession', detail: 'Certes / Bien que + subjonctif, cependant (réfuter l’objection)', color: '#b45309' },
					{ stage: '4. Conclusion', detail: 'En somme, réaffirmer la thèse + appel responsable à l’action', color: '#7c3aed' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الخطوة الأولى التي نبدأ بها المقدمة في المرافعة أو الادعاء؟',
					hintAr: 'نحتاج إلى تمهيد قصير للموضوع ثم إعلان الموقف بوضوح.',
					expectedInput: 'تقديم الموضوع العام ثم التصريح الواضح بالأطروحة',
					revealAr:
						'تتكون المقدمة من جملتين واضحتين: جملة تمهيدية للموضوع (constat général) تليها جملة تعلن الأطروحة بوضوح (je suis convaincu que... / il est indispensable de...).'
				},
				{
					promptAr: 'لماذا يرفع توظيف جملة استدراك (Bien que... / Certes..., cependant...) من جودة النص الحجاجي؟',
					hintAr: 'تخيل قارئا لديه اعتراض مسبق؛ كيف يُظهر الكاتب أنه فكّر فيه وتجاوزه؟',
					expectedInput: 'لأنه يستبق الاعتراض المحتمل ويفنّده بموضوعية ومنطق',
					revealAr:
						'الاستدراك المتبوع بالرد (Certes le numérique est rapide ; cependant, le livre papier développe mieux la concentration) يُظهر نضجا فكريا ويقنع القارئ المتردد.'
				},
				{
					promptAr: 'كيف نختم المرافعة أو الادعاء بطريقة مؤثرة؟',
					hintAr: 'بعد تلخيص الموقف، ماذا نطلب من القارئ أو المجتمع؟',
					expectedInput: 'إعادة تأكيد الأطروحة وتوجيه دعوة مسؤولة إلى العمل',
					revealAr:
						'في الخاتمة نلخص الموقف بعبارة (En conclusion / En somme) ونختم بدعوة واضحة للتغيير الإيجابي باستعمال (Il faut, Nous devons, Agissons).'
				}
			]
		},
		summary: {
			rulesAr: [
				'معايير التقويم (6 نقاط): (1) احترام التعليمة والنوع الحجاجي (plaidoyer أو réquisitoire) (2) بنية ثلاثية واضحة (مقدمة، عرض منظم، خاتمة) (3) توظيف 2 إلى 3 حجج مدعمة بأمثلة وروابط منطقية (4) سلامة اللغة (المعجم الإيجابي أو السلبي، الاستدراك بـ bien que + subjonctif أو malgré + nom، الترقيم والإملاء).',
				'عبارات جاهزة للمرافعة (Plaidoyer): Il est indéniable que... / Défendre cette cause est un devoir vital... / D’abord, elle permet de... / En outre, elle favorise... / En somme, mobilisons-nous pour...',
				'عبارات جاهزة للادعاء (Réquisitoire): Il est temps de dénoncer ce fléau... / Ce comportement irresponsable entraîne... / En premier lieu, il nuit à... / Par ailleurs, il menace... / Il est urgent d’agir pour mettre fin à...',
				'تجنب الحشو والتكرار، وخصص لكل فقرة فكرة رئيسية واحدة مع ترك فراغ في بدايتها (alinéa).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Boîte à outils pour réussir la production (6 pts)',
				rootLabel: 'Critères d’excellence',
				rootSub: '12 à 16 lignes bien structurées',
				branches: [
					{ label: 'Thèse nette', rule: 'Visible dès l’intro', example: 'Il est vital de...' },
					{ label: 'Connecteurs', rule: 'Ordre + Logique', example: 'D’abord, Certes, Donc' },
					{ label: 'Lexique ciblé', rule: 'Mélioratif / Péjoratif', example: 'précieux / fléau' },
					{ label: 'Relecture', rule: 'Accords + Subjonctif', example: 'bien qu’il soit...' }
				]
			}),
			visualCaptionAr: 'عناصر التميز الأربعة لضمان العلامة الكاملة في الإنتاج الكتابي للفصل الثاني',
			examples: [
				{
					problemAr: 'Formulez une phrase d’ouverture et une thèse pour un plaidoyer sur la préservation de l’eau.',
					solutionAr: 'L’eau douce est la source première de toute vie sur Terre. Face aux défis climatiques actuels, je suis convaincu que sa préservation rigoureuse constitue un devoir collectif absolu.'
				},
				{
					problemAr: 'Rédigez une phrase de concession réfutée pour un réquisitoire contre le gaspillage alimentaire.',
					solutionAr: 'Bien que les produits alimentaires paraissent abondants sur les étals, leur gaspillage demeure un acte irresponsable qui pèse sur les familles et bafoue la solidarité.'
				}
			],
			watchOutAr:
				'احذر من الخلط بين الموضوعين في الورقة: اقرأ التعليمة جيدا لتعرف هل المطلوب « défendre » (مرافعة بقاموس إيجابي) أم « dénoncer » (ادعاء بقاموس سلبي)، ولا تكتب نصا إخباريا باردا خاليا من الحجج والذاتية.'
		},
		practice: [
			{
				questionAr: 'Quelle doit être la place normale de la thèse dans un plaidoyer bien structuré ?',
				options: [
					'Uniquement dans une note en bas de page',
					'Dès l’introduction, puis réaffirmée dans la conclusion',
					'Nulle part, le lecteur doit la deviner seul',
					'Seulement dans le deuxième exemple'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأطروحة عنصر رئيسي في صلب النص لا في هامش.',
					'صحيح! تُعلن الأطروحة بوضوح في المقدمة وتُؤكد مجددا في الخاتمة.',
					'إخفاء الأطروحة يُفقد النص الحجاجي وضوحه.',
					'الأمثلة تخدم الحجج التي تدعم أطروحة سبق إعلانها.'
				],
				explanationAr: 'في النص الحجاجي المنظم تُقدّم الأطروحة في المقدمة، وتُدعم بالحجج في العرض، وتُعاد صياغتها في الخاتمة.'
			},
			{
				questionAr: 'Quelle phrase convient le mieux comme conclusion d’un réquisitoire contre la pollution plastique ?',
				options: [
					'Le plastique a été inventé au siècle dernier dans un laboratoire.',
					'En somme, il est urgent de réduire le plastique à usage unique et d’adopter des gestes écologiques durables.',
					'Hier, j’ai visité une belle plage avec ma famille.',
					'D’abord, les sacs plastiques sont très légers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'معلومة تاريخية لا تصلح خاتمة حجاجية.',
					'أحسنت! تبدأ برابط ختامي (En somme) وتجمع بين تلخيص الموقف والدعوة للعمل.',
					'جملة سردية شخصية خارج نوع النص الحجاجي.',
					'« D’abord » رابط بداية للعرض لا للخاتمة.'
				],
				explanationAr: 'الخاتمة الحجاجية تُستهل برابط ختامي (En somme / En conclusion) وتنتهي بدعوة واضحة للتغيير.'
			},
			{
				questionAr: 'Dans un plaidoyer pour la science éthique, quel argument est le plus pertinent ?',
				options: [
					'La science encadrée par la morale protège la dignité humaine et prévient les dérives dangereuses.',
					'Les laboratoires ont souvent des murs peints en blanc.',
					'Les élèves aiment les vacances d’été.',
					'Il existe plusieurs couleurs dans un arc-en-ciel.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! حجة قوية ومرتبطة مباشرة بموضوع العلم الأخلاقي.',
					'تفصيل وصفي لا علاقة له بالأخلاق العلمية.',
					'خارج الموضوع تماما.',
					'معلومة عامة غير حجاجية.'
				],
				explanationAr: 'الحجة القوية يجب أن ترتبط مباشرة بالأطروحة وتبيّن أثرها الملموس على الإنسان والمجتمع.'
			},
			{
				questionAr: 'Quel enchaînement de connecteurs convient pour structurer le développement d’un plaidoyer ?',
				options: [
					'Enfin -> D’abord -> En conclusion',
					'D’abord -> De plus -> Certes..., cependant -> En somme',
					'Parce que -> Mais -> Bien que -> Ou',
					'Hier -> Demain -> Soudain -> Autrefois'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترتيب معكوس! لا نبدأ بـ Enfin.',
					'صحيح! تسلسل منطقي متكامل: افتتاح، إضافة، استدراك مفنّد، ثم خلاصة.',
					'هذه روابط داخل الجملة وليست هيكلا لتنظيم فقرات العرض.',
					'هذه مؤشرات زمنية للسرد القصصي لا للحجاج.'
				],
				explanationAr: 'الهيكل النموذجي يستعمل روابط الترتيب (D’abord, De plus)، ثم الاستدراك (Certes..., cependant)، فالختام (En somme).'
			},
			{
				questionAr: 'Lors de la relecture d’un plaidoyer ou d’un réquisitoire, que faut-il vérifier en priorité ?',
				options: [
					'Que le texte ne contient aucun connecteur logique',
					'Le respect de la consigne, l’accord des verbes/adjectifs, le subjonctif après « bien que » et la ponctuation',
					'Que toutes les phrases sont recopiées du texte de compréhension',
					'Que le texte dépasse cinq pages manuscrites'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'غياب الروابط يُضعف التماسك النصي.',
					'إجابة شاملة! هذه هي نقاط المراجعة الحاسمة لتفادي الأخطاء اللغوية والمنهجية.',
					'النسخ من نص الفهم مرفوض تماما.',
					'المطلوب نص موجز ومتقن (نحو 12 إلى 16 سطرا) وليس الإطالة.'
				],
				explanationAr: 'المراجعة الذكية تتحقق من الملاءمة والانسجام والتوافق النحوي والمنصوب بعد bien que وعلامات الوقف.'
			}
		]
	}
];
