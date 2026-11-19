import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchWritingBlueprint
} from '../../svg-french';
import type { FrenchInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T2
// Projet 2 : Le débat d'idées (Science et éthique, éducation, lecture vs écrans, travail honnête, solidarité)
// 5 Leçons BAC concises, claires et complètes
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T2: FrenchInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 1 : Identifier les thèses en présence et les stratégies argumentatives
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t2_theses_strategies_arg',
		slug: 'fre-3as-sci-theses-strategies-arg',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 2: مناظرة الأفكار والنص الحجاجي (Le débat d’idées)',
		order: 1,
		titleAr: 'تحديد الأطروحات المتقابلة واستراتيجيات الحجاج (Thèse, antithèse, convaincre / persuader)',
		objectives: [
			'تحديد موضوع الجدل (thème) والأطروحة المدعومة (thèse défendue) والأطروحة المضادة (antithèse / thèse réfutée)',
			'التمييز الدقيق بين الإقناع العقلي (convaincre par la raison) والاستمالة العاطفية (persuader par les sentiments)',
			'استخراج الحجج (arguments) والأمثلة التوضيحية (exemples) في جدول المقارنة بالبكالوريا'
		],
		keywordsAr: ['Débat d’idées', 'Thèse', 'Antithèse', 'Convaincre', 'Persuader'],
		discover: {
			scenarioAr:
				'في نص حول « القراءة الورقية مقابل الشاشات الرقمية »، يبدأ الكاتب بعرض رأي المؤيدين للشاشات (Les partisans du numérique estiment que les écrans facilitent l’accès rapide au savoir) ثم ينتقل لعرض موقفه المخالف (Toutefois, la lecture du livre papier demeure indispensable car les études scientifiques prouvent qu’elle renforce la concentration). هكذا تُبنى مناظرة الأفكار (le débat d’idées) على أطروحتين متقابلتين!',
			svg: svgFrenchGrammarMap({
				title: 'Architecture du Débat d’Idées au BAC',
				rootLabel: 'Thème du débat (Question posée)',
				rootSub: 'Deux points de vue opposés appuyés par des arguments',
				branches: [
					{
						label: 'Thèse réfutée',
						rule: 'Point de vue adverse',
						example: 'Certains pensent que...',
						color: '#b45309'
					},
					{
						label: 'Thèse défendue',
						rule: 'Position de l’auteur',
						example: 'Cependant, il est évident que...',
						color: '#047857'
					},
					{
						label: 'Stratégies',
						rule: 'Convaincre / Persuader',
						example: 'Faits, chiffres vs émotions',
						color: '#1d4ed8'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في المثال السابق، ما هي الأطروحة التي يدافع عنها الكاتب (la thèse défendue)؟',
					hintAr: 'انظر إلى الجملة التي تأتي بعد رابط الاستدراك « Toutefois ».',
					expectedInput: 'livre papier',
					revealAr:
						'الأطروحة التي يدافع عنها الكاتب هي أن قراءة الكتاب الورقي تظل ضرورية لأنها تقوّي التركيز (la lecture du livre papier demeure indispensable).'
				},
				{
					promptAr: 'عندما يعتمد الكاتب على دراسات علمية وإحصائيات وأدلة منطقية، هل يهدف إلى « convaincre » أم « persuader »؟',
					hintAr: 'مخاطبة العقل والمنطق تكون بالفعل الذي يبدأ بحرف c.',
					expectedInput: 'convaincre',
					revealAr:
						'مخاطبة العقل عبر الحقائق والدراسات العلمية والمنطق تُسمى « convaincre » (الإقناع العقلي).'
				},
				{
					promptAr: 'بمَ نعرّف « persuader » في النص الحجاجي؟',
					hintAr: 'عكس مخاطبة العقل المجرد: مخاطبة المشاعر والقيم والقلب.',
					expectedInput: 'sentiments',
					revealAr:
						'« Persuader » تعني الاستمالة بمخاطبة المشاعر والعواطف والقيم الأخلاقية (faire appel aux sentiments et aux émotions) عبر معجم مؤثر.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأطروحة (La thèse): هي الرأي الذي يدافع عنه الكاتب في قضية خلافية. والأطروحة المضادة (L’antithèse / La thèse adverse): هي الرأي المخالف الذي يعرضه الكاتب ليفنده (réfuter) أو يناقشه.',
				'مؤشرات تقديم الأطروحة المضادة: « Certains affirment que... », « Les partisans de... prétendent que... », « Selon certains... »، يليها انتقال واضح نحو موقف الكاتب عبر: « Mais », « Cependant », « Toutefois », « En réalité ».',
				'الإقناع العقلي (Convaincre): يخاطب العقل والمنطق (la raison) باستعمال الحجج المنطقية، الأمثلة الواقعية، الإحصائيات، والروابط السببية.',
				'الاستمالة العاطفية (Persuader): تخاطب المشاعر والوجدان (les sentiments) باستعمال المعجم التقييمي (mélioratif/péjoratif)، الأسئلة البلاغية، ونداء القيم الأخلاقية كالأمانة والتضامن.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Convaincre vs Persuader — Repères BAC',
				subtitle: 'Deux stratégies complémentaires dans le débat d’idées',
				columns: [
					{
						header: 'Convaincre',
						rule: 'S’adresse à la RAISON',
						examples: 'Preuves, études, chiffres',
						color: '#1d4ed8'
					},
					{
						header: 'Persuader',
						rule: 'S’adresse aux SENTIMENTS',
						examples: 'Émotions, valeurs, images',
						color: '#047857'
					},
					{
						header: 'Réfuter',
						rule: 'Rejeter la thèse adverse',
						examples: 'Or, en fait, il est faux de...',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'الفرق الجوهري بين الإقناع العقلي والاستمالة العاطفية وتفنيد الرأي المخالف',
			examples: [
				{
					problemAr: 'Repérez la thèse adverse et la thèse défendue dans : « Beaucoup croient que le progrès scientifique suffit à assurer le bonheur humain. Pourtant, sans éthique morale, la science devient une source de dérives dangereuses. »',
					solutionAr: 'Thèse adverse (réfutée) : le progrès scientifique seul suffit au bonheur humain. | Thèse défendue par l’auteur : la science doit impérativement être encadrée par l’éthique morale.'
				},
				{
					problemAr: 'S’agit-il de convaincre ou de persuader dans : « Selon une enquête menée en 2025 auprès de 1 200 lycéens, lire trente minutes par jour améliore la compréhension de 40 pour cent » ?',
					solutionAr: 'L’auteur cherche à convaincre (stratégie rationnelle) en s’appuyant sur des données chiffrées et une enquête vérifiable.'
				}
			],
			watchOutAr:
				'احذر الفخ المشهور في بكالوريا الشعب العلمية: لا تظن أن أول فكرة في الفقرة الأولى هي دائما أطروحة الكاتب! في كثير من نصوص المناظرة، يبدأ الكاتب برأي الخصوم (Certains pensent que...) ثم يعلن أطروحته الحقيقية في الفقرة الثانية بعد رابط معارضة (Mais / Cependant / En réalité).'
		},
		practice: [
			{
				questionAr: 'Dans un débat d’idées, quelle expression annonce généralement la thèse ADVERSE (que l’auteur va réfuter) ?',
				options: [
					'En réalité, il est prouvé que...',
					'Certains prétendent à tort que...',
					'Pour ma part, je suis convaincu que...',
					'C’est pourquoi nous affirmons que...'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « En réalité » تُقدم عادة موقف الكاتب الحقيقي.',
					'أحسنت! « Certains prétendent à tort que » تعرض الرأي المخالف وتُظهر مسافة الكاتب عنه.',
					'خطأ: « Pour ma part » تعلن أطروحة الكاتب نفسه.',
					'خطأ: « C’est pourquoi nous affirmons » تلخص موقف الكاتب.'
				],
				explanationAr: 'الفعل « prétendre » والعبارة « à tort » يدلان بوضوح على رأي مخالف يستعد الكاتب لتفنيده.'
			},
			{
				questionAr: 'Quelle est la différence principale entre « convaincre » et « persuader » ?',
				options: [
					'Convaincre fait appel à la raison et aux preuves ; persuader fait appel aux sentiments et aux émotions',
					'Convaincre sert uniquement dans les récits historiques ; persuader uniquement dans les lettres',
					'Persuader repose sur des calculs mathématiques ; convaincre sur des exclamations',
					'Il n’existe aucune différence de stratégie entre les deux verbes'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الإقناع (convaincre) عقلي منطقي، والاستمالة (persuader) وجدانية عاطفية.',
					'خطأ: كلتا الاستراتيجيتين تستعملان في النص الحجاجي.',
					'خطأ: العكس هو الصحيح تماما.',
					'خطأ: بينهما فرق منهجي معروف ومطروح في البكالوريا.'
				],
				explanationAr: '« Convaincre » يعتمد على المنطق والأدلة العقلية، بينما « persuader » يخاطب الوجدان والمشاعر.'
			},
			{
				questionAr: 'Dans le débat « Travail honnête vs gain facile », quel argument relève de la stratégie rationnelle (convaincre) ?',
				options: [
					'Les études économiques montrent que les entreprises honnêtes fidélisent durablement leurs clients.',
					'Quelle honte de voir des jeunes sacrifier leur dignité pour un profit illusoire !',
					'Mon cœur souffre devant la perte des belles valeurs de nos ancêtres.',
					'N’est-il pas douloureux de trahir la confiance de ses proches ?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الاستناد إلى الدراسات الاقتصادية والنتائج الملموسة يهدف إلى الإقناع العقلي.',
					'خطأ: التعجب وكلمة « honte » يخاطبان العاطفة (persuader).',
					'خطأ: عبارة « Mon cœur souffre » عاطفية خالصة.',
					'خطأ: السؤال البلاغي وكلمة « douloureux » يستهدفان الاستمالة العاطفية.'
				],
				explanationAr: 'الحجة المدعومة بدراسات اقتصادية واقعية تخاطب العقل (convaincre).'
			},
			{
				questionAr: 'Qu’appelle-t-on « l’antithèse » dans un texte argumentatif ?',
				options: [
					'La conclusion finale du texte',
					'La thèse opposée à celle que l’auteur défend',
					'Un exemple chiffré tiré d’un journal',
					'Le titre principal de l’article'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الخاتمة تسمى « la conclusion ».',
					'أحسنت! « L’antithèse » هي الأطروحة المضادة للرأي الذي يدافع عنه الكاتب.',
					'خطأ: المثال التوضيحي يدعم حجة وليس أطروحة مضادة.',
					'خطأ: العنوان جزء من النص المحيط (paratexte).'
				],
				explanationAr: 'في المناظرة، تقابل الأطروحة (thèse) أطروحة مضادة (antithèse).'
			},
			{
				questionAr: 'Dans un débat sur la solidarité algérienne (Touiza), quel est le rôle d’un exemple concret (comme l’entraide lors d’une récolte ou d’une campagne de nettoyage) ?',
				options: [
					'Contredire le titre du texte',
					'Illustrer et rendre crédible un argument avancé par l’auteur',
					'Remplacer totalement la thèse du texte',
					'Transformer le débat en texte purement narratif'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المثال يدعم فكرة الكاتب ولا يناقض العنوان.',
					'رائع! المثال الواقعي يوضح الحجة ويجعلها ملموسة ومقنعة للقارئ.',
					'خطأ: المثال يخدم الحجة ولا يغني عن صياغة الأطروحة.',
					'خطأ: ورود مثال واقعي داخل حجاج يبقي النص حجاجيا.'
				],
				explanationAr: 'وظيفة المثال في النص الحجاجي هي توضيح الحجة وتدعيم مصداقيتها (illustrer et appuyer l’argument).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 2 : La concession et la réfutation (certes... mais, bien que + subj.)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t2_concession_refutation',
		slug: 'fre-3as-sci-concession-refutation',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 2: مناظرة الأفكار والنص الحجاجي (Le débat d’idées)',
		order: 2,
		titleAr: 'الاستدراك التنازلي والتفنيد في المناظرة (La concession et la réfutation)',
		objectives: [
			'فهم آلية التنازل الجزئي (la concession) متبوعا بالتفنيد (la réfutation) لإقناع القارئ بموضوعية',
			'إتقان الصيغ النحوية للـ concession في البكالوريا: bien que / quoique + subjonctif و malgré / en dépit de + nom',
			'إعادة كتابة جمل البكالوريا باستبدال روابط الاستدراك مع ضبط الصيغة الفعلية (indicatif / subjonctif / nom)'
		],
		keywordsAr: ['Concession', 'Réfutation', 'Bien que', 'Subjonctif', 'Malgré', 'Certes... mais'],
		discover: {
			scenarioAr:
				'المتحدث الذكي في المناظرة لا يرفض رأي خصمه بعنف، بل يعترف بجزء من الصواب فيه أولا (concession) ثم يُبرز حجته الأقوى لتفنيده (réfutation). تأمل: « Certes, les outils numériques accélèrent la recherche documentaire, mais ils ne remplacent pas la réflexion personnelle de l’élève. » ويمكن صياغتها أيضا بـ: « Bien que les outils numériques accélèrent la recherche, ils ne remplacent pas la réflexion personnelle. »',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 structures de la Concession au BAC',
				rootLabel: 'Concession -> Réfutation',
				rootSub: 'Admettre un point adverse pour mieux le dépasser',
				branches: [
					{
						label: 'Certes... mais',
						rule: 'Concession + Indicatif',
						example: 'Certes il aide, mais il distrait.',
						color: '#1d4ed8'
					},
					{
						label: 'Bien que / Quoique',
						rule: '+ SUBJONCTIF présent',
						example: 'Bien qu’il soit utile, il nuit.',
						color: '#047857'
					},
					{
						label: 'Malgré / En dépit de',
						rule: '+ GROUPE NOMINAL',
						example: 'Malgré son utilité, il distrait.',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصيغة الفعلية الإلزامية بعد الرابطين « bien que » و « quoique » في الفرنسية؟',
					hintAr: 'تذكر الأفعال الشائعة مثل: soit, ait, puisse, fasse.',
					expectedInput: 'subjonctif',
					revealAr:
						'بعد « bien que » و « quoique » نُصرّف الفعل وجوبا في صيغة النصب (le subjonctif): Bien que la technologie soit utile...'
				},
				{
					promptAr: 'ما الذي يأتي مباشرة بعد « malgré » أو « en dépit de »؟',
					hintAr: 'هل تأتي جملة فعلية أم اسم (groupe nominal)؟',
					expectedInput: 'nom',
					revealAr:
						'يلي « malgré » و « en dépit de » دائما اسم أو مجموعة اسمية (groupe nominal)، ولا نكتب أبدا « malgré que + verbe ».'
				},
				{
					promptAr: 'ما الفائدة الحجاجية من استعمال ثنائية « Certes... mais » في مناظرة الأفكار؟',
					hintAr: 'هل تجعل الكاتب يبدو منصفا وموضوعيا قبل عرض حجته الأقوى؟',
					expectedInput: 'nuancer',
					revealAr:
						'تُظهر الاعتدال والموضوعية (nuancer son propos) عبر الاعتراف بجانب من رأي الخصم ثم تفنيده بحجة أقوى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'ثنائيات التنازل والتفنيد (Concession + Réfutation): « Certes... mais », « Il est vrai que... cependant », « Sans doute... toutefois / pourtant / néanmoins ». يكون الفعل معها في الإخباري (indicatif).',
				'روابط التنازل المتبوعة بالـ Subjonctif: « Bien que + subjonctif », « Quoique + subjonctif » (احذر: نكتبها كلمة واحدة « quoique »). أشهر أفعال الـ subjonctif في البكالوريا: être (soit / soient)، avoir (ait / aient)، pouvoir (puisse / puissent)، faire (fasse / fassent)، savoir (sache / sachent)، devoir (doive / doivent).',
				'روابط التنازل المتبوعة باسم (Groupe nominal): « Malgré + nom », « En dépit de + nom ». عند التحويل من « Bien que » إلى « Malgré » نُحوّل الفعل أو الصفة إلى اسم (Nominalisation)!',
				'المعارضة الصريحة بـ « Même si »: تتبعها صيغة الإخباري (indicatif) وليس الـ subjonctif! مثال: « Même si l’écran est pratique, le livre reste irremplaçable. »'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Subjonctif présent des verbes clés (après Bien que)',
				subtitle: 'À mémoriser par cœur pour la réécriture au BAC',
				columns: [
					{
						header: 'Être / Avoir',
						rule: 'soit, soient | ait, aient',
						examples: 'Bien qu’il soit rapide...',
						color: '#1d4ed8'
					},
					{
						header: 'Pouvoir / Faire',
						rule: 'puisse | fasse',
						examples: 'Bien qu’elle puisse aider...',
						color: '#047857'
					},
					{
						header: '1er groupe (-er)',
						rule: '-e, -es, -e, -ions, -iez, -ent',
						examples: 'Bien qu’ils travaillent...',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تصريف الأفعال الأكثر تداولا في صيغة الـ Subjonctif بعد Bien que في البكالوريا',
			examples: [
				{
					problemAr: 'Réécrivez en commençant par « Bien que » : « Les écrans sont pratiques, pourtant ils fatiguent vite les yeux. »',
					solutionAr: 'Bien que les écrans soient pratiques, ils fatiguent vite les yeux. (On supprime « pourtant » !)'
				},
				{
					problemAr: 'Réécrivez en remplaçant « Bien que » par « Malgré » : « Bien que la solidarité soit ancienne, elle reste très vivante en Algérie. »',
					solutionAr: 'Malgré son ancienneté, la solidarité reste très vivante en Algérie.'
				}
			],
			watchOutAr:
				'فخّان يحذفان النقطة في البكالوريا: (1) إبقاء « mais / pourtant » في الجملة بعد بدء الجملة بـ « Bien que » (خطأ فادح: لا نكتب « Bien qu’il soit utile, mais il distrait » بل نحذف « mais » ونضع فاصلة فقط). (2) استعمال « malgré que » في الفصحى المدرسية (استعمل دائما « bien que + subjonctif » أو « malgré + nom »).'
		},
		practice: [
			{
				questionAr: 'Complétez correctement : « Bien que la science ........ des progrès immenses, elle a besoin de repères éthiques. »',
				options: ['fait', 'fasse', 'fera', 'faisait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « fait » في الإخباري، بينما « Bien que » تفرض الـ subjonctif.',
					'أحسنت! « fasse » هو تصريف الفعل « faire » في الـ subjonctif présent.',
					'خطأ: المستقبل لا يأتي بعد « Bien que ».',
					'خطأ: الماضي الناقص صيغة إخبارية وليست subjonctif.'
				],
				explanationAr: 'الرابط « Bien que » يفرض وجوبا صيغة الـ subjonctif: faire -> qu’elle fasse.'
			},
			{
				questionAr: 'Réécrivez correctement avec « Bien que » : « Cet élève a des difficultés, mais il persévère honnêtement. »',
				options: [
					'Bien que cet élève a des difficultés, mais il persévère honnêtement.',
					'Bien que cet élève ait des difficultés, mais il persévère honnêtement.',
					'Bien que cet élève ait des difficultés, il persévère honnêtement.',
					'Bien que cet élève avait des difficultés, il persévère honnêtement.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الفعل « a » ليس في الـ subjonctif ووجود « mais » زائد.',
					'خطأ: لا نجمع أبدا بين « Bien que » و « mais » في الجملة نفسها.',
					'ممتاز! استعملت الـ subjonctif (ait) وحذفت « mais » ووضعت الفاصلة.',
					'خطأ: الفعل « avait » في الـ imparfait لا الـ subjonctif.'
				],
				explanationAr: 'مع « Bien que » نصرف « avoir » في الـ subjonctif (ait) ونحذف رابط المعارضة « mais ».'
			},
			{
				questionAr: 'Quelle phrase emploie « Malgré » de manière grammaticalement correcte ?',
				options: [
					'Malgré que les écrans soient rapides, la lecture papier reste utile.',
					'Malgré la rapidité des écrans, la lecture papier reste utile.',
					'Malgré les écrans sont rapides, la lecture papier reste utile.',
					'Malgré être rapides, la lecture papier reste utile.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نتجنب صيغة « malgré que » ونستبدلها بـ « bien que ».',
					'صحيح! « Malgré » متبوعة بمجموعة اسمية « la rapidité des écrans ».',
					'خطأ: « Malgré » لا تتبعها جملة فعلية مباشرة.',
					'خطأ: « Malgré » لا تتبعها صيغة المصدر.'
				],
				explanationAr: 'يتبع حرف الجر « Malgré » دائما اسم أو مجموعة اسمية (la rapidité des écrans).'
			},
			{
				questionAr: 'Complétez : « Même si l’intelligence artificielle ........ rapide, elle ne remplace pas la conscience humaine. »',
				options: ['soit', 'est', 'fût', 'être'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: انتبه! « Même si » تتبعها صيغة الإخباري (indicatif) وليس الـ subjonctif.',
					'رائع! بعد « Même si » نستعمل الإخباري: « est ».',
					'خطأ: « fût » صيغة subjonctif غير مناسبة هنا.',
					'خطأ: نحتاج فعلا مصرفا لا مصدرا.'
				],
				explanationAr: 'على عكس « bien que »، فإن الرابط « même si » يتبعه دائما الفعل في صيغة الإخباري (indicatif).'
			},
			{
				questionAr: 'Dans « Certes la concurrence stimule la qualité, toutefois elle ne doit pas justifier la fraude », quel est le rôle de « Certes... toutefois » ?',
				options: [
					'Exprimer la cause et le but',
					'Établir une concession suivie d’une réfutation / limite',
					'Marquer la chronologie d’un récit historique',
					'Donner un ordre direct au lecteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد سبب ولا غاية في هذه البنية.',
					'أحسنت! « Certes » تقرّ بجانب صحيح (concession) و « toutefois » تضع الحد والتفنيد (réfutation).',
					'خطأ: هذه روابط حجاجية وليست زمنية.',
					'خطأ: الجملة حجاجية خبرية وليست أمرية.'
				],
				explanationAr: 'البنية « Certes... toutefois » تُستخدم للاعتراف الجزئي (concession) ثم التصحيح أو التفنيد (réfutation).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 3 : Les rapports logiques de cause, conséquence et opposition au BAC
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t2_rapports_logiques_bac',
		slug: 'fre-3as-sci-rapports-logiques-bac',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 2: مناظرة الأفكار والنص الحجاجي (Le débat d’idées)',
		order: 3,
		titleAr: 'الروابط والعلاقات المنطقية في البكالوريا: السبب والنتيجة والمعارضة (Rapports logiques)',
		objectives: [
			'التمييز الفوري بين السبب (la cause) والنتيجة (la conséquence) والمعارضة (l’opposition) في الجمل المعقدة',
			'الانتقال السلس بين التعبير الصريح والضمني (rapport explicite / implicite) وإعادة صياغة جمل السبب والنتيجة',
			'ضبط الفرق بين « grâce à » (سبب إيجابي) و « à cause de » (سبب سلبي) و « parce que » و « puisque »'
		],
		keywordsAr: ['Cause', 'Conséquence', 'Opposition', 'Grâce à', 'À cause de', 'Donc'],
		discover: {
			scenarioAr:
				'في كل موضوع بكالوريا تقريبا، يُطلب منك تحديد العلاقة المنطقية (Quel est le rapport logique exprimé ?) ثم إعادة التعبير عنها برابط آخر أو تحويل السبب إلى نتيجة. قارن: (1) « La solidarité renforce la société car elle unit les familles. » (سبب) و (2) « La solidarité unit les familles, si bien qu’elle renforce la société. » (نتيجة). هما وجهان لعملة منطقية واحدة!',
			svg: svgFrenchGrammarMap({
				title: 'Les 3 Rapports Logiques incontournables au BAC',
				rootLabel: 'Articulateurs logiques du texte argumentatif',
				rootSub: 'Identifier le rapport + Maîtriser la transformation',
				branches: [
					{
						label: 'Cause',
						rule: 'Pourquoi ? (Raison)',
						example: 'car, parce que, grâce à',
						color: '#1d4ed8'
					},
					{
						label: 'Conséquence',
						rule: 'Résultat obtenu',
						example: 'donc, si bien que, d’où',
						color: '#047857'
					},
					{
						label: 'Opposition',
						rule: 'Contraste / Limite',
						example: 'mais, tandis que, or',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة « Les élèves réussissent grâce à leur travail honnête »، ما العلاقة المنطقية المعبر عنها بـ « grâce à »؟',
					hintAr: 'هل « العمل الشريف » سبب إيجابي أم نتيجة؟',
					expectedInput: 'cause',
					revealAr:
						'العلاقة هي السبب الإيجابي (la cause favorable)؛ ونستعمل « grâce à + nom » للسبب الإيجابي و « à cause de + nom » للسبب السلبي.'
				},
				{
					promptAr: 'إذا حذفنا الرابط في جملة السبب « L’écran fatigue les yeux : les jeunes lisent moins longtemps »، هل العلاقة صريحة أم ضمنية؟',
					hintAr: 'هل يوجد رابط لغوي مكتوب أم نقطتان (:) فقط؟',
					expectedInput: 'implicite',
					revealAr:
						'العلاقة هنا ضمنية (implicite) لأنها مفهمة من علامة الترقيم (:) ومن المعنى دون وجود أداة ربط مكتوبة.'
				},
				{
					promptAr: 'لتحويل جملة السبب « Le livre est précieux parce qu’il développe l’esprit » إلى جملة نتيجة، بأي جزء نبدأ؟',
					hintAr: 'نبدأ بالسبب أولا ثم نضع « donc / par conséquent » ثم النتيجة.',
					expectedInput: 'le livre développe l’esprit',
					revealAr:
						'نبدأ بالسبب ثم رابط النتيجة: « Le livre développe l’esprit, donc il est précieux. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن السبب (La cause): مع جملة فعلية -> parce que (تأتي غالبا في الوسط)، car (لا توضع أبدا في أول الجملة)، puisque / comme (تأتيان غالبا في أول الجملة)، étant donné que. مع اسم -> grâce à (سبب إيجابي)، à cause de (سبب سلبي)، en raison de (محايد).',
				'التعبير عن النتيجة (La conséquence): مع جملة فعلية -> donc، par conséquent، c’est pourquoi، ainsi، si bien que، de sorte que، tel(le)... que / si... que. مع اسم -> d’où + nom.',
				'التعبير عن المعارضة (L’opposition): mais، cependant، pourtant، toutefois، néanmoins، en revanche، alors que، tandis que، au lieu de + infinitif / nom.',
				'القاعدة الذهبية للتحويل بين السبب والنتيجة: (نتيجة + parce que + سبب) <=> (سبب + donc / c’est pourquoi + نتيجة). لا تقلب المعنى المنطقي أبدا!'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Boîte à outils des connecteurs logiques',
				subtitle: 'Bien distinguer la nature grammaticale qui suit',
				columns: [
					{
						header: 'Cause',
						rule: 'Verbe vs Nom',
						examples: 'car, comme | grâce à, à cause de',
						color: '#1d4ed8'
					},
					{
						header: 'Conséquence',
						rule: 'Résultat logique',
						examples: 'donc, c’est pourquoi, si bien que',
						color: '#047857'
					},
					{
						header: 'Opposition',
						rule: 'Mise en contraste',
						examples: 'mais, tandis que, en revanche',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الروابط المنطقية حسب العلاقة والبنية النحوية في البكالوريا',
			examples: [
				{
					problemAr: 'Exprimez le rapport inverse (conséquence) : « Certains étudiants échouent parce qu’ils négligent la lecture régulière. »',
					solutionAr: 'Certains étudiants négligent la lecture régulière ; par conséquent (donc / c’est pourquoi), ils échouent.'
				},
				{
					problemAr: 'Remplacez « parce que » par « à cause de » : « La concentration diminue parce que les notifications se multiplient. »',
					solutionAr: 'La concentration diminue à cause de la multiplication des notifications.'
				}
			],
			watchOutAr:
				'انتبه لثلاثة أخطاء شائعة جدا: (1) لا تضع « car » في بداية الجملة أبدا (استعمل « Comme » أو « Puisque » في الصدارة). (2) لا تستعمل « grâce à » لسبب سيئ (لا تقل « grâce à la fraude » بل « à cause de la fraude »). (3) عند استبدال « parce que » بـ « grâce à / à cause de » يجب تحويل الفعل إلى اسم (nominalisation)!'
		},
		practice: [
			{
				questionAr: 'Quel rapport logique est exprimé dans : « Les réseaux sociaux captent l’attention des jeunes, si bien que le temps consacré à la lecture recule » ?',
				options: ['La cause', 'La conséquence', 'La concession', 'Le but'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « si bien que » تقدم النتيجة المترتبة على ما قبلها.',
					'أحسنت! « si bien que » رابط نتيجة (conséquence) يعني « لدرجة أن ».',
					'خطأ: لا يوجد استدراك أو تنازل هنا.',
					'خطأ: الغاية يُعبر عنها بـ « pour que / afin que ».'
				],
				explanationAr: 'الرابط « si bien que » يعبر عن علاقة النتيجة (la conséquence).'
			},
			{
				questionAr: 'Complétez avec le connecteur exact : « L’équipe a terminé le projet scientifique avant le délai ........ une excellente organisation. »',
				options: ['à cause d’', 'grâce à', 'parce que', 'donc'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « à cause de » مخصصة للسبب السلبي، بينما التنظيم الممتاز سبب إيجابي.',
					'ممتاز! « grâce à » تعبر عن السبب الإيجابي ويتبعها اسم.',
					'خطأ: « parce que » تتبعها جملة فعلية لا اسم.',
					'خطأ: « donc » للنتيجة وليس للسبب.'
				],
				explanationAr: 'السبب هنا إيجابي (« une excellente organisation ») وهو مجموعة اسمية، لذا نستعمل « grâce à ».'
			},
			{
				questionAr: 'Transformez ce rapport de cause en rapport de conséquence : « La science doit respecter l’éthique car elle influence la vie humaine. »',
				options: [
					'La science doit respecter l’éthique, donc elle influence la vie humaine.',
					'La science influence la vie humaine ; c’est pourquoi elle doit respecter l’éthique.',
					'La science influence la vie humaine parce qu’elle doit respecter l’éthique.',
					'Bien que la science influence la vie humaine, elle respecte l’éthique.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عكست السبب والنتيجة منطقيا!',
					'رائع! السبب أولا (تؤثر في حياة الإنسان) ثم رابط النتيجة (c’est pourquoi) ثم النتيجة (وجوب احترام الأخلاق).',
					'خطأ: أبقيت رابط السبب وعكست المعنى.',
					'خطأ: حوّلت العلاقة إلى استدراك لا نتيجة.'
				],
				explanationAr: 'لتحويل السبب إلى نتيجة، نُقدّم السبب أولا ثم نضع رابط النتيجة (c’est pourquoi / donc) ثم النتيجة.'
			},
			{
				questionAr: 'Quel connecteur de cause ne se place JAMAIS en début de phrase ?',
				options: ['Comme', 'Puisque', 'Car', 'Étant donné que'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: « Comme » توضع دائما في بداية الجملة.',
					'خطأ: « Puisque » يمكن أن تتصدر الجملة.',
					'صحيح! « Car » أداة ربط لا توضع أبدا في بداية الجملة، بل تربط بين جملتين في الوسط.',
					'خطأ: « Étant donné que » تأتي كثيرا في بداية الجملة.'
				],
				explanationAr: 'الرابط « car » يأتي دائما في وسط الجملة ولا يتصدرها أبدا.'
			},
			{
				questionAr: 'Dans « Les parents éduquent leurs enfants à la maison, tandis que l’école consolide leur instruction », quel rapport exprime « tandis que » ?',
				options: ['La cause', 'L’opposition (ou contraste)', 'La conséquence', 'La condition'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الجملة تقابل بين دور الأسرة ودور المدرسة ولا تذكر سببا.',
					'أحسنت! « tandis que » تعبر عن التقابل والمعارضة بين طرفين (opposition).',
					'خطأ: لا توجد علاقة نتيجة هنا.',
					'خطأ: الشرط يُعبر عنه بـ « si / à condition que ».'
				],
				explanationAr: 'الرابط « tandis que » (مثل « alors que ») يعبر عن التقابل والمعارضة (l’opposition).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 4 : Les modalisateurs, la substitution anaphorique et la visée communicative
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t2_modalisateurs_anaphores_visee',
		slug: 'fre-3as-sci-modalisateurs-anaphores-visee',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 2: مناظرة الأفكار والنص الحجاجي (Le débat d’idées)',
		order: 4,
		titleAr: 'الموجّهات والإحالة النصية والهدف التواصلي (Modalisateurs, substituts et visée)',
		objectives: [
			'تصنيف الموجّهات (les modalisateurs) إلى يقين (certitude) وشك (incertitude) وتقييم (appréciation)',
			'تحديد العائد الدقيق للضمائر والبدائل المعجمية (substituts grammaticaux et lexicaux) لضمان الترابط وتجنب التكرار',
			'صياغة الهدف التواصلي (la visée communicative) لنص المناظرة بدقة منهجية في البكالوريا'
		],
		keywordsAr: ['Modalisateurs', 'Certitude', 'Substituts', 'Anaphore', 'Visée communicative'],
		discover: {
			scenarioAr:
				'تأمل هذا المقطع من نص حول التضامن: « Certes, la Touiza algérienne appartient à notre héritage, mais cette tradition solidaire conserve sans doute une valeur précieuse aujourd’hui. Elle prouve que l’entraide peut résoudre bien des défis sociaux. » لاحظ كيف تجنب الكاتب تكرار كلمة « Touiza » باستعمال بديل معجمي ثم ضمير، وكيف عبّر عن موقفه بـ « sans doute » و « précieuse ».',
			svg: svgFrenchGrammarMap({
				title: 'Cohésion et Subjectivité dans le Débat d’Idées',
				rootLabel: 'Questions classiques du BAC (Compréhension)',
				rootSub: 'Modalisation + Substitution + Visée communicative',
				branches: [
					{
						label: 'Modalisateurs',
						rule: 'Certitude / Doute / Jugement',
						example: 'sans doute, certes, essentiel',
						color: '#1d4ed8'
					},
					{
						label: 'Substituts',
						rule: 'Grammaticaux & Lexicaux',
						example: 'elle, ce dernier / cet outil',
						color: '#047857'
					},
					{
						label: 'Visée arg.',
						rule: 'Convaincre / Sensibiliser',
						example: 'Défendre une thèse / Réfuter',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في النص السابق، على ماذا تعود العبارة « cette tradition solidaire » وما نوع هذا البديل؟',
					hintAr: 'هل هو ضمير أم عبارة اسمية تستبدل الكلمة السابقة؟',
					expectedInput: 'substitut lexical',
					revealAr:
						'تعود على « la Touiza algérienne » وهي بديل معجمي (substitut lexical) يُجنب التكرار ويُثري المعنى في آنٍ واحد.'
				},
				{
					promptAr: 'ما وظيفة البدائل النصية (les substituts) في السؤال المتكرر بالبكالوريا: « Quel est le rôle de ces substituts ? »',
					hintAr: 'اذكر وظيفتين: تجنب التكرار + ضمان ترابط النص.',
					expectedInput: 'éviter la répétition',
					revealAr:
						'وظيفتها: تجنب التكرار (éviter la répétition) وضمان ترابط النص واتساقه (assurer la cohérence / la progression thématique).'
				},
				{
					promptAr: 'صنّف الموجّه « sans doute » والصفة « précieuse »: أيهما للتقييم وأيهما للاحتمال/اليقين؟',
					hintAr: '« précieuse » صفة مادحة و « sans doute » ظرف دال على الترجيح/اليقين.',
					expectedInput: 'précieuse appréciation',
					revealAr:
						'« précieuse » موجّه تقييمي إيجابي (appréciation / jugement mélioratif)، بينما « sans doute » موجّه ترجيحي (probabilité / certitude atténuée).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الموجّهات (Les modalisateurs) تكشف موقف الكاتب تجاه كلامه: 1) اليقين (certitude): certainement, sans aucun doute, il est évident que, assurément. 2) الشك والاحتمال (doute / probabilité): peut-être, probablement, sembler, paraître, conditionnel présent (serait). 3) التقييم والحكم (jugement): hélas, heureusement, remarquable, néfaste, devoir, falloir.',
				'البدائل النحوية (Substituts grammaticaux): الضمائر الشخصية (il, elle, ils, le, la, les, lui, leur, en, y)، ضمائر الإشارة (celui-ci, ce dernier, cela)، صفات الملكية (son, leur)، وضمائر الوصل (qui, que, dont, lequel).',
				'البدائل المعجمية (Substituts lexicaux): مرادف (synonyme)، أو عبارة تعريفية (périphrase) مثل: « l’écran » -> « cet outil numérique »، أو كلمة جامعة (terme générique). وظيفتها: تجنب التكرار وضمان ترابط النص (cohérence textuelle).',
				'الهدف التواصلي (La visée communicative) في المشروع الثاني: إما « convaincre le lecteur de la justesse d’une thèse » (إقناع القارئ بصحة أطروحة)، أو « confronter deux points de vue sur un sujet d’actualité » (عرض ومناقشة وجهتي نظر)، أو « sensibiliser et inciter à adopter un comportement positif ».'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Les 3 familles de Modalisateurs au BAC',
				subtitle: 'Savoir les relever et nommer la nuance exprimée',
				columns: [
					{
						header: 'Certitude',
						rule: 'Affirmation forte',
						examples: 'évidemment, sans aucun doute',
						color: '#1d4ed8'
					},
					{
						header: 'Doute / Réserve',
						rule: 'Hypothèse, prudence',
						examples: 'peut-être, sembler, serait',
						color: '#b45309'
					},
					{
						header: 'Jugement',
						rule: 'Appréciation (+/-)',
						examples: 'essentiel, néfaste, hélas',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الموجّهات اللغوية للتعبير عن اليقين والشك والتقييم في النص الحجاجي',
			examples: [
				{
					problemAr: 'À quoi renvoient les mots soulignés dans : « Ibn Al-Haytham a fondé la méthode expérimentale. Ce savant musulman a inspiré des générations ; elles lui doivent la rigueur optique. » ?',
					solutionAr: '« Ce savant musulman » (substitut lexical) renvoie à Ibn Al-Haytham. | « elles » renvoie à des générations. | « lui » renvoie à Ibn Al-Haytham.'
				},
				{
					problemAr: 'Quelle nuance exprime le conditionnel dans : « Selon certains détracteurs, le livre papier disparaîtrait bientôt » ?',
					solutionAr: 'Le conditionnel présent (disparaîtrait) exprime une réserve / une information non confirmée dont l’auteur se distancie.'
				}
			],
			watchOutAr:
				'انتبه عند استخراج مرجع الضمير (À qui / À quoi renvoie le pronom ?): تحقق دائما من الجنس (مذكر/مؤنث) والعدد (مفرد/جمع) ومن موقع المرجع (عادة في الجملة نفسها أو الجملة السابقة مباشرة)! ولا تنسَ أن الضمير « y » يعود غالبا على مكان أو اسم مسبوق بـ « à »، والضمير « en » يعود على اسم مسبوق بـ « de ».'
		},
		practice: [
			{
				questionAr: 'Dans « Il est incontestable que le travail honnête élève la dignité de l’homme », que marque l’expression « Il est incontestable que » ?',
				options: ['Le doute', 'La certitude', 'Le regret', 'L’hésitation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « incontestable » تعني ما لا يقبل الجدال، فهي عكس الشك.',
					'أحسنت! « Il est incontestable que » موجّه يعبر عن اليقين التام (la certitude).',
					'خطأ: لا يوجد ندم في العبارة.',
					'خطأ: العبارة حاسمة ولا تردد فيها.'
				],
				explanationAr: 'العبارة « Il est incontestable que » (مما لا شك فيه) موجّه يقين (modalisateur de certitude).'
			},
			{
				questionAr: 'Dans « Les écrans séduisent les adolescents ; ces derniers passent parfois plusieurs heures devant eux », à quoi renvoie « ces derniers » ?',
				options: ['Les écrans', 'Les adolescents', 'Plusieurs heures', 'Les parents'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « ces derniers » تعود على أقرب اسم جمع مذكر مذكور قبلها مباشرة (les adolescents).',
					'ممتاز! « ces derniers » تشير دائما إلى العنصر الأقرب ذكرا، وهو « les adolescents ».',
					'خطأ: « heures » مؤنث جمع لا يطابق « derniers ».',
					'خطأ: كلمة « parents » غير واردة في الجملة.'
				],
				explanationAr: 'البديل « ces derniers » يحيل دائما على آخر اسم مذكر جمع ذُكر قبله مباشرة (les adolescents).'
			},
			{
				questionAr: 'Quel type de substitut est « cet outil précieux » lorsqu’il remplace « le livre » dans la phrase suivante ?',
				options: [
					'Un substitut grammatical',
					'Un substitut lexical (périphrase)',
					'Un connecteur de conséquence',
					'Un adverbe de temps'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: البديل النحوي يكون ضميرا مثل « il / le / celui-ci ».',
					'صحيح! استبدال كلمة « le livre » بعبارة « cet outil précieux » يُسمى بديلا معجميا.',
					'خطأ: ليست أداة ربط للنتيجة.',
					'خطأ: ليست ظرف زمان.'
				],
				explanationAr: 'تعويض اسم بعبارة اسمية وصفية جديدة يُسمى بديلا معجميا (substitut lexical).'
			},
			{
				questionAr: 'Quelle est la visée communicative la plus précise d’un texte de débat intitulé « La science sans conscience : progrès ou danger ? » ?',
				options: [
					'Raconter un voyage touristique en été',
					'Débattre d’une question d’actualité et convaincre de la nécessité d’encadrer la science par l’éthique',
					'Donner une recette de cuisine traditionnelle',
					'Décrire un paysage désertique sans prise de position'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العنوان يطرح قضية فكرية وعلمية لا رحلة سياحية.',
					'رائع! صياغة دقيقة لهدف النص الحجاجي في مناظرة الأفكار.',
					'خطأ: خارج موضوع المناظرة تماما.',
					'خطأ: النص الحجاجي يتضمن موقفا وحججا لا مجرد وصف.'
				],
				explanationAr: 'هدف نص المناظرة هو مناقشة قضية فكرية وإقناع القارئ بموقف مدعم بالحجج.'
			},
			{
				questionAr: 'Quel modalisateur exprime le DOUTE ou la réserve de l’auteur ?',
				options: ['Évidemment', 'Probablement', 'Assurément', 'Sans aucun doute'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: « Évidemment » تدل على البداهة واليقين.',
					'أحسنت! « Probablement » (من المحتمل) تعبر عن الاحتمال وعدم الجزم التام.',
					'خطأ: « Assurément » تعني بالتأكيد (يقين).',
					'خطأ: « Sans aucun doute » تعبر عن يقين قاطع.'
				],
				explanationAr: 'الظرف « probablement » يعبر عن الاحتمال والتحفظ (incertitude / probabilité).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LEÇON 5 : Méthodologie du Compte Rendu Objectif d'un débat d'idées
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_lesson_3as_sci_t2_compte_rendu_argumentatif',
		slug: 'fre-3as-sci-compte-rendu-argumentatif',
		grade: '3as_se',
		yearSubjectId: 685,
		trimesterId: 't2',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المشروع 2: مناظرة الأفكار والنص الحجاجي (Le débat d’idées)',
		order: 5,
		titleAr: 'منهجية التقرير الموضوعي لنص حجاجي / مناظرة أفكار (Compte rendu objectif)',
		objectives: [
			'صياغة التقرير الموضوعي لنص مناظرة الأفكار وفق شبكة تصحيح البكالوريا (الشعب العلمية والتسيير)',
			'إبراز بنية الحجاج داخل التقرير: عرض القضية، الأطروحة والأطروحة المضادة، والحجج الأساسية بإيجاز',
			'استعمال أفعال التقديم الحجاجية المناسبة (affirme, défend l’idée que, réfute, nuance, conclut)'
		],
		keywordsAr: ['Compte rendu objectif', 'Texte argumentatif', 'Thèse défendue', 'Arguments', 'Reformulation'],
		discover: {
			scenarioAr:
				'يختلف التقرير الموضوعي لنص « مناظرة الأفكار » عن النص التاريخي في طبيعة الأفعال والروابط المستعملة؛ فبدلا من « l’historien raconte / rappelle », نستعمل أفعالا حجاجية دقيقة تكشف مسار النقاش: « Dans un premier temps, l’auteur expose la thèse des partisans de... Toutefois, il réfute cette vision en avançant plusieurs arguments... Enfin, il conclut que... »',
			svg: svgFrenchWritingBlueprint({
				title: 'Plan du Compte Rendu Objectif — Débat d’Idées (6 pts)',
				steps: [
					{
						stage: 'Introduction',
						detail: 'Texte argumentatif + Titre + Auteur + Source + Problème posé',
						color: '#1d4ed8'
					},
					{
						stage: 'Thèses en jeu',
						detail: 'Présenter la thèse adverse puis la position défendue',
						color: '#047857'
					},
					{
						stage: 'Arguments clés',
						detail: 'Résumer les arguments majeurs (sans copier les exemples)',
						color: '#b45309'
					},
					{
						stage: 'Conclusion',
						detail: 'Synthèse et visée (convaincre / sensibiliser, sans avis perso)',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع النص الذي نكتبه في بداية مقدمة التقرير الموضوعي للمشروع الثاني؟',
					hintAr: 'بدلا من « texte historique » نكتب...',
					expectedInput: 'texte argumentatif',
					revealAr:
						'نكتب: « Ce texte argumentatif (ou : de débat d’idées), intitulé "...", écrit par..., aborde la question de... »'
				},
				{
					promptAr: 'اذكر فعلين حجاجيين دقيقين يُستعملان مع « L’auteur » عند تلخيص نص مناظرة.',
					hintAr: 'مثلا: يؤكد، يفند، يدافع، يوضح.',
					expectedInput: 'affirme, réfute',
					revealAr:
						'من أفضل الأفعال الحجاجية: « expose, affirme, défend la thèse selon laquelle, réfute, nuance, prouve, conclut ».'
				},
				{
					promptAr: 'هل يجوز أن نُدرج حججا من عندنا غير موجودة في النص داخل التقرير الموضوعي؟',
					hintAr: 'التقرير الموضوعي أمين لما ورد في النص فقط.',
					expectedInput: 'non',
					revealAr:
						'لا أبدا! نلتزم التزاما تاما بأفكار وحجج الكاتب فقط دون زيادة حجج خارجية ودون إبداء رأينا الشخصي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفقرة 1 — المقدمة (Accroche argumentative): « Ce texte argumentatif, intitulé "...", rédigé par [Auteur], extrait de [Source] et publié en [Date], soulève le débat autour de [Thème / Problématique]. »',
				'الفقرة 2 — العرض (Synthèse du débat): عرض الأطروحة الأولى أو المضادة إن وجدت (D’abord, l’auteur rapporte l’avis de ceux qui estiment que...)، ثم عرض أطروحة الكاتب وحججه المعاد صياغتها (Cependant, il défend l’idée que... Pour étayer sa thèse, il avance d’abord que... Ensuite, il souligne que...).',
				'ختام الفقرة الثانية (الهدف التواصلي): « En conclusion, l’écrivain appelle à... » أو « À travers ce débat, l’auteur cherche à convaincre le lecteur que... ».',
				'مؤشر النجاح (6/6): احترام طول الثلث (حوالي 90 إلى 120 كلمة)، حذف الأمثلة التفصيلية والإحصائيات الثانوية مع الاحتفاظ بالفكرة التي تخدمها، سلامة اللغة، والحياد التام (غياب « je »).'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Verbes introducteurs du Compte Rendu Argumentatif',
				rootLabel: 'L’auteur / Le journaliste / L’écrivain...',
				rootSub: 'Toujours au présent de l’indicatif (3e personne)',
				branches: [
					{
						label: 'Exposer',
						rule: 'Présenter le débat',
						example: 'soulève, aborde, rapporte',
						color: '#1d4ed8'
					},
					{
						label: 'Défendre',
						rule: 'Appuyer sa thèse',
						example: 'affirme, soutient, démontre',
						color: '#047857'
					},
					{
						label: 'Contester',
						rule: 'Nuancer ou rejeter',
						example: 'réfute, dénonce, nuance',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'بنك الأفعال التقديمية الدقيقة لكتابة تقرير موضوعي احترافي لنص حجاجي',
			examples: [
				{
					problemAr: 'Rédigez l’accroche d’un texte argumentatif intitulé « Le livre papier a-t-il dit son dernier mot ? », écrit par Karim Mansouri, extrait de la revue « Éducation et Savoir » (2025).',
					solutionAr: 'Ce texte argumentatif, intitulé « Le livre papier a-t-il dit son dernier mot ? », écrit par Karim Mansouri et extrait de la revue « Éducation et Savoir » parue en 2025, traite du débat opposant la lecture traditionnelle sur papier aux supports numériques.'
				},
				{
					problemAr: 'Condensez en une phrase de compte rendu : « Certes les tablettes stockent des centaines d’ouvrages en un clic, mais la lecture sur écran fatigue la vue et favorise la distraction par les messages instantanés. »',
					solutionAr: 'Tout en reconnaissant la capacité pratique des tablettes, l’auteur souligne que la lecture numérique provoque une fatigue visuelle et nuit à la concentration.'
				}
			],
			watchOutAr:
				'احذر من خطأين يقع فيهما الكثير من المترشحين في المشروع الثاني: (1) الخلط بين التقرير الموضوعي (الموضوع الأول) والمقال الحجاجي الحر (الموضوع الثاني)؛ ففي التقرير الموضوعي لا تكتب « Je suis d’accord avec l’auteur » ولا تضف أفكارا من عندك! (2) نسيان ذكر وجود رأيين متقابلين عندما يكون النص مناظرة صريحة.'
		},
		practice: [
			{
				questionAr: 'Quel verbe introducteur convient le mieux pour montrer que l’auteur rejette la thèse adverse dans un compte rendu ?',
				options: ['L’auteur réfute', 'L’auteur décrit le paysage', 'L’auteur raconte son enfance', 'L’auteur félicite la thèse adverse'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الفعل « réfute » (يفنّد) هو الأدق للدلالة على رفض الأطروحة المضادة بالحجج.',
					'خطأ: وصف المناظر يخص النص الوصفي لا الحجاجي.',
					'خطأ: السرد الشخصي غير وارد في التقرير الموضوعي.',
					'خطأ: هذا يعكس المعنى تماما.'
				],
				explanationAr: 'الفعل « réfuter » (يفند) أو « rejeter » يعبر بدقة عن نقض الكاتب للرأي المخالف.'
			},
			{
				questionAr: 'Parmi ces phrases, laquelle est INTERDITE dans un compte rendu objectif (3AS Scientifique) ?',
				options: [
					'Ce texte argumentatif soulève le débat autour de l’éthique scientifique.',
					'Selon l’auteur, le travail honnête garantit une réussite durable.',
					'Personnellement, je trouve que l’auteur a raison et son style est magnifique.',
					'Enfin, l’écrivain vise à sensibiliser les jeunes aux valeurs de solidarité.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذه مقدمة صحيحة وموضوعية.',
					'خطأ: هذه إعادة صياغة سليمة بضمير الغائب.',
					'ممتاز! التعبير عن الرأي الشخصي بـ « Personnellement, je trouve » ممنوع في التقرير الموضوعي.',
					'خطأ: بيان هدف الكاتب في آخر العرض أمر مطلوب وموضوعي.'
				],
				explanationAr: 'التقرير الموضوعي يمنع منعا باتا حضور ضمير المتكلم وإصدار أحكام شخصية.'
			},
			{
				questionAr: 'Comment résumer efficacement un paragraphe qui contient une idée principale suivie de trois longs exemples chiffrés ?',
				options: [
					'Recopier les trois exemples chiffrés et supprimer l’idée principale',
					'Reformuler l’idée principale en une phrase claire sans recopier les détails secondaires',
					'Ignorer complètement le paragraphe',
					'Remplacer l’idée par une citation inventée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العكس تماما؛ الأولوية للفكرة الرئيسية لا للتفاصيل المطولة.',
					'صحيح! نحتفظ بالفكرة المحورية ونعيد صياغتها بأسلوب موجز مع ترك الأمثلة المطولة.',
					'خطأ: حذف فكرة أساسية يخل بالأمانة للنص.',
					'خطأ: يمنع اختراع أفكار أو اقتباسات غير موجودة.'
				],
				explanationAr: 'في التلخيص والتقرير، نحتفظ بالأفكار والحجج الأساسية ونستغني عن الأمثلة المطولة والتفاصيل.'
			},
			{
				questionAr: 'Quelle structure d’organisation assure la meilleure cohérence dans le développement d’un compte rendu de débat ?',
				options: [
					'Énumérer des mots-clés isolés avec des tirets',
					'Enchaîner la thèse adverse, la thèse défendue et les arguments avec des connecteurs (D’abord, Cependant, En outre, Enfin)',
					'Copier une phrase sur deux du texte original',
					'Écrire un seul très long dialogue'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يمنع استعمال العوارض؛ يجب تحرير فقرة متماسكة.',
					'رائع! الترابط المنطقي بين الأطروحات والحجج عبر الروابط يضمن أعلى علامة للاتساق.',
					'خطأ: النسخ المقطع يفقد التقرير صفته التلخيصية.',
					'خطأ: التقرير الموضوعي نص سردي-تحليلي موجز وليس حوارا.'
				],
				explanationAr: 'الفقرة المتماسكة المدعمة بالروابط المنطقية تبرز بنية المناظرة بوضوح وتضمن علامة التماسك.'
			},
			{
				questionAr: 'Lorsqu’un texte du BAC ne porte pas de titre, que doit-on écrire dans l’accroche du compte rendu ?',
				options: [
					'On invente un faux nom d’auteur',
					'On précise « sans titre » tout en mentionnant la nature, l’auteur, la source et le thème',
					'On supprime toute l’introduction',
					'On recopie la première phrase comme nom de l’auteur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نختلق معلومات غير موجودة في الوثيقة.',
					'أحسنت! نكتب « Ce texte argumentatif, sans titre, écrit par... » بدقة وأمانة.',
					'خطأ: المقدمة عنصر إلزامي في سلم التنقيط.',
					'خطأ: خلط واضح بين النص والكاتب.'
				],
				explanationAr: 'إذا غاب العنوان نكتب « sans titre » ونستكمل بقية عناصر الـ paratexte المتوفرة.'
			}
		]
	}
];
