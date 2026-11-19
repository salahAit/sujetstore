import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T2
// Projet 2 : Le débat d'idées (Science et éthique, lecture vs écrans, travail honnête, solidarité)
// 5 Modèles BAC : 2 Compréhension (7 pts) + 2 Fonctionnement langue (7 pts) + 1 Production écrite (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T2: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPRÉHENSION (7 pts) — Science & éthique, Lecture vs écrans, IA à l'école
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t2_comp_science_ethique',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): العلم والأخلاق والقراءة أمام الشاشات الرقمية',
		curriculumLessonId: 'fre_lesson_3as_sci_t2_theses_strategies_arg',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Le progrès scientifique peut-il se passer d’éthique ?',
					source: 'D’après une chronique de la revue « Savoirs et Responsabilité » (2025)',
					paragraphs: [
						'Aujourd’hui, certains chercheurs enthousiastes estiment que la science doit avancer sans aucune limite morale afin d’accélérer les découvertes médicales et techniques. Selon [[ces partisans du progrès absolu]], toute règle éthique ralentirait l’innovation et priverait l’humanité de solutions rapides.',
						'Cependant, cette vision purement utilitaire comporte de graves dangers. Bien que la technologie permette de guérir des maladies et de faciliter la vie quotidienne, un savoir dépourvu de conscience peut conduire à la pollution industrielle, au piratage des données privées et à des abus médicaux. L’histoire de la civilisation islamique offre un modèle inspirant : des savants comme Ibn Al-Haytham en optique et Al-Zahrawi en chirurgie associaient toujours la rigueur expérimentale à la responsabilité morale envers l’être humain.',
						'Il est donc incontestable que la science et l’éthique doivent marcher ensemble. Le véritable progrès ne se mesure pas seulement à la puissance des machines, mais à la dignité et au bien-être qu’[[il]] garantit à toute la société.'
					],
					glossary: [
						{ term: 'utilitaire', meaning: 'qui ne recherche que l’efficacité matérielle immédiate' },
						{ term: 'rigueur', meaning: 'précision, sérieux et exactitude dans la méthode' }
					],
					tfItems: [
						{ q: 'Les partisans du progrès absolu jugent que les règles éthiques ralentissent l’innovation.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur approuve l’idée que la science avance sans aucune limite morale.', a: 'Faux', c: 'L’auteur réfute cette vision et affirme que la science et l’éthique doivent marcher ensemble.', mark: '0.5' },
						{ q: 'Ibn Al-Haytham et Al-Zahrawi sont cités comme des exemples de savants alliant science et morale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Pour l’auteur, le véritable progrès se mesure uniquement à la puissance des machines.', a: 'Faux', c: 'Il se mesure à la dignité et au bien-être garantis à toute la société.', mark: '0.5' }
					],
					tableIntro: '2. Classez dans le tableau les arguments relevant de la thèse adverse et ceux qui appuient la thèse défendue par l’auteur :',
					tableCols: [
						{ header: 'Thèse adverse (réfutée)', items: ['l’éthique ralentirait l’innovation', 'avancer sans limite pour des solutions rapides'], mark: '0.75' },
						{ header: 'Thèse défendue (auteur)', items: ['sans morale la science crée des abus', 'rigueur alliée à la responsabilité humaine'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes à partir du texte :\na) Quels dangers menace un savoir scientifique dépourvu de conscience morale ?\nb) Pourquoi l’auteur cite-t-il les savants Ibn Al-Haytham et Al-Zahrawi dans le paragraphe 2 ?',
					whA: '3. a) La pollution industrielle, le piratage des données privées et les abus médicaux.\nb) Pour illustrer son argumentation par un exemple historique concret prouvant que la rigueur scientifique est parfaitement compatible avec l’éthique morale.',
					refQ: '4. a) À qui ou à quoi renvoient « ces partisans du progrès absolu » (§1) et « il » (§3) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « ces partisans du progrès absolu » : certains chercheurs enthousiastes | « il » : le véritable progrès.\nb) Visée argumentative : débattre du rapport entre science et éthique et convaincre le lecteur que le progrès scientifique exige un encadrement moral.',
					easyQ: 'Dans le texte « Le progrès scientifique peut-il se passer d’éthique ? », quelle est la thèse défendue par l’auteur ?',
					easyCorrect: 'La science et l’éthique morale doivent impérativement marcher ensemble',
					easyDistractors: [
						{ text: 'Il faut supprimer toutes les limites morales en recherche', diagnosticFeedback: 'هذه هي الأطروحة المضادة التي يفنّدها الكاتب في الفقرة الثانية.' },
						{ text: 'Il faut arrêter complètement toute recherche médicale', diagnosticFeedback: 'الكاتب يثمن فوائد العلم في علاج الأمراض لكنه يشترط الأخلاق.' },
						{ text: 'La puissance des machines suffit à définir le progrès', diagnosticFeedback: 'الفقرة الثالثة تنفي هذا المقياس وحده.' }
					],
					medQ: 'Quel rapport logique exprime la locution « Bien que » dans le paragraphe 2 du texte ?',
					medCorrect: 'La concession (suivie du subjonctif « permette »)',
					medDistractors: [
						{ text: 'La cause simple', diagnosticFeedback: '« Bien que » لا تعبر عن السبب بل عن التنازل الاستدراكي.' },
						{ text: 'La conséquence logique', diagnosticFeedback: 'النتيجة يُعبر عنها بـ « donc / si bien que ».' },
						{ text: 'Le but futur', diagnosticFeedback: 'الغاية يُعبر عنها بـ « afin que / pour que ».' }
					],
					hardQ: 'Quelle est la valeur de l’expression « Il est donc incontestable que » au début du paragraphe 3 ?',
					hardCorrect: 'Un modalisateur de certitude concluant la démonstration de l’auteur',
					hardDistractors: [
						{ text: 'Un modalisateur de doute et d’hésitation', diagnosticFeedback: 'كلمة « incontestable » تعني يقينا لا جدال فيه.' },
						{ text: 'Une marque de discours direct', diagnosticFeedback: 'لا توجد مزدوجتان ولا قول منقول.' },
						{ text: 'Un connecteur chronologique de récit historique', diagnosticFeedback: '« donc » رابط استنتاج منطقي في نص حجاجي.' }
					]
				},
				{
					title: 'Le livre papier face aux écrans : un débat toujours vivant',
					source: 'D’après la revue pédagogique « Cahiers du Lycéen » (2025)',
					paragraphs: [
						'Les défenseurs des supports numériques soutiennent que la tablette et le téléphone intelligent vont bientôt remplacer le livre imprimé. Ils font valoir qu’un seul appareil léger contient des centaines d’ouvrages et permet de trouver une définition en une seconde. Pour [[eux]], le papier appartiendrait déjà au passé.',
						'Certes, l’outil numérique présente une praticité indéniable pour les recherches rapides, mais de nombreux pédagogues démontrent que le livre papier reste irremplaçable pour l’apprentissage profond. En effet, la lecture imprimée évite les notifications incessantes, réduit la fatigue visuelle et favorise une meilleure mémorisation des idées complexes.',
						'Plutôt que d’opposer stérilement les deux supports, la solution sage consiste à accorder à chacun sa juste place : recourir au numérique pour vérifier une donnée ponctuelle, et privilégier le livre papier pour étudier sérieusement et cultiver son esprit. [[Cet équilibre]] profitera durablement aux lycéens.'
					],
					glossary: [
						{ term: 'praticité', meaning: 'caractère pratique et commode à utiliser' },
						{ term: 'ponctuelle', meaning: 'précise, limitée à un moment ou un besoin précis' }
					],
					tfItems: [
						{ q: 'Les défenseurs du numérique apprécient la capacité d’une tablette à stocker des centaines de livres.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur rejette totalement toute utilisation des outils numériques à l’école.', a: 'Faux', c: 'Il recommande un équilibre : le numérique pour vérifier une donnée ponctuelle et le livre papier pour l’étude approfondie.', mark: '0.5' },
						{ q: 'Selon les pédagogues cités, le livre papier réduit la fatigue visuelle et améliore la mémorisation.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les notifications sur écran aident les lycéens à rester parfaitement concentrés.', a: 'Faux', c: 'La lecture papier évite justement les notifications incessantes qui nuisent à la concentration.', mark: '0.5' }
					],
					tableIntro: '2. Classez ces arguments dans le tableau : stockage de centaines d’ouvrages, réduction de la fatigue visuelle, recherche rapide d’une définition, meilleure mémorisation :',
					tableCols: [
						{ header: 'Avantages du numérique', items: ['stockage de centaines d’ouvrages', 'recherche rapide d’une définition'], mark: '0.75' },
						{ header: 'Avantages du livre papier', items: ['réduction de la fatigue visuelle', 'meilleure mémorisation'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes selon le texte :\na) Quelle nuance le conditionnel « appartiendrait » (§1) traduit-il quant à la position de l’auteur ?\nb) Quelle solution équilibrée l’auteur propose-t-il aux lycéens dans le dernier paragraphe ?',
					whA: '3. a) Le conditionnel traduit la réserve et la distanciation de l’auteur qui ne partage pas cette affirmation des défenseurs du numérique.\nb) Utiliser le numérique pour des vérifications ponctuelles et privilégier le livre papier pour l’étude approfondie et la culture personnelle.',
					refQ: '4. a) À qui ou à quoi renvoient « eux » (§1) et « Cet équilibre » (§3) ?\nb) Relevez dans le paragraphe 2 le couple de connecteurs qui introduit la concession puis la réfutation.',
					refA: '4. a) « eux » : les défenseurs des supports numériques | « Cet équilibre » : accorder au numérique et au livre papier leur juste place complémentaire.\nb) Le couple « Certes ... mais ».',
					easyQ: 'Dans le texte « Le livre papier face aux écrans », pourquoi le livre papier favorise-t-il une meilleure étude selon le paragraphe 2 ?',
					easyCorrect: 'Il évite les notifications, réduit la fatigue visuelle et renforce la mémorisation',
					easyDistractors: [
						{ text: 'Il contient une connexion internet permanente', diagnosticFeedback: 'العكس تماما؛ الكتاب الورقي يقي من تشتيت الإشعارات.' },
						{ text: 'Il empêche toute recherche documentaire', diagnosticFeedback: 'الكتاب الورقي يدعم الفهم العميق.' },
						{ text: 'Il est impossible à transporter dans un cartable', diagnosticFeedback: 'لم يذكر النص هذا العيب في الفقرة الثانية.' }
					],
					medQ: 'Quelle est la position finale de l’auteur dans « Le livre papier face aux écrans » ?',
					medCorrect: 'Une position nuancée recommandant la complémentarité des deux supports',
					medDistractors: [
						{ text: 'L’interdiction absolue de tous les livres imprimés', diagnosticFeedback: 'الكاتب يدافع بقوة عن مكانة الكتاب الورقي.' },
						{ text: 'Le rejet total de toute technologie moderne', diagnosticFeedback: 'الكاتب يقرّ بفائدة الرقمي للبحث السريع.' },
						{ text: 'L’indifférence totale envers la lecture scolaire', diagnosticFeedback: 'الكاتب حريص على مصلحة التلاميذ وتحصيلهم.' }
					],
					hardQ: 'Dans « Pour eux, le papier appartiendrait déjà au passé », quelle valeur a le conditionnel présent « appartiendrait » ?',
					hardCorrect: 'Il exprime une prise de distance de l’auteur face à une affirmation non confirmée',
					hardDistractors: [
						{ text: 'Il exprime une certitude absolue partagée par l’auteur', diagnosticFeedback: 'لليقين نستعمل الإخباري لا الشرطي الحاضر.' },
						{ text: 'Il donne un ordre direct aux lecteurs', diagnosticFeedback: 'الأمر يُصاغ بالـ impératif.' },
						{ text: 'Il situe un fait historique précis en 1954', diagnosticFeedback: 'نحن في نص مناظرة فكرية لا نص تاريخي.' }
					]
				},
				{
					title: 'L’intelligence artificielle dans les études : aide précieuse ou piège ?',
					source: 'D’après une tribune universitaire sur l’éducation numérique (2025)',
					paragraphs: [
						'Depuis l’essor rapide des assistants numériques, un débat vif anime les lycées et les universités. Certains étudiants affirment que l’intelligence artificielle révolutionne l’apprentissage : [[elle]] corrige les erreurs, résume les cours et explique des notions scientifiques complexes à toute heure.',
						'Toutefois, les enseignants mettent en garde contre un usage passif de ces logiciels. Lorsque l’élève confie systématiquement la rédaction de ses devoirs à une machine, il perd peu à peu son esprit critique, sa capacité de synthèse et son autonomie intellectuelle. De plus, ces programmes produisent parfois des réponses inexactes qu’un esprit non formé ne sait pas détecter.',
						'Par conséquent, l’intelligence artificielle ne doit jamais remplacer l’effort personnel ni le dialogue avec le professeur. Utilisée avec honnêteté et discernement comme un simple tuteur complémentaire, [[elle]] peut soutenir la réussite ; mais utilisée pour tricher, elle détruit la véritable formation du futur scientifique.'
					],
					glossary: [
						{ term: 'usage passif', meaning: 'utilisation sans réflexion ni effort personnel' },
						{ term: 'discernement', meaning: 'capacité de juger clairement et sagement' }
					],
					tfItems: [
						{ q: 'Les étudiants favorables à l’IA apprécient sa capacité à expliquer des notions scientifiques à toute heure.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les logiciels d’intelligence artificielle ne commettent jamais aucune erreur.', a: 'Faux', c: 'Ils produisent parfois des réponses inexactes qu’un esprit non formé ne détecte pas.', mark: '0.5' },
						{ q: 'Confier systématiquement ses devoirs à la machine affaiblit l’esprit critique et l’autonomie.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, l’IA utilisée avec honnêteté peut servir de tuteur complémentaire sans remplacer le professeur.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez dans le tableau deux aspects positifs et deux risques de l’intelligence artificielle mentionnés dans le texte :',
					tableCols: [
						{ header: 'Aspects positifs (aide)', items: ['corriger des erreurs', 'expliquer des notions complexes'], mark: '0.75' },
						{ header: 'Risques d’un usage passif', items: ['perte de l’esprit critique et de l’autonomie', 'risque de réponses inexactes'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Que risque de perdre l’élève qui fait rédiger tous ses devoirs par une machine ?\nb) À quelles conditions l’auteur juge-t-il que l’intelligence artificielle peut aider à la réussite ?',
					whA: '3. a) Il risque de perdre son esprit critique, sa capacité de synthèse et son autonomie intellectuelle.\nb) À condition de l’utiliser avec honnêteté et discernement comme un simple tuteur complémentaire, sans jamais remplacer l’effort personnel ni le professeur.',
					refQ: '4. a) À quoi renvoie le pronom « elle » dans le §1 et le §3 ?\nb) Quel rapport logique exprime « Par conséquent » au début du paragraphe 3 ?',
					refA: '4. a) « elle » (§1 et §3) renvoie à l’intelligence artificielle.\nb) « Par conséquent » exprime un rapport de conséquence (conclusion logique).',
					easyQ: 'Selon le texte sur l’intelligence artificielle dans les études, quel danger présente le fait de confier systématiquement ses devoirs à une machine ?',
					easyCorrect: 'La perte de l’esprit critique, de la capacité de synthèse et de l’autonomie intellectuelle',
					easyDistractors: [
						{ text: 'L’amélioration automatique du dialogue avec le professeur', diagnosticFeedback: 'النص يؤكد ألا تحل الآلة محل الحوار مع الأستاذ.' },
						{ text: 'La disparition de toutes les erreurs scientifiques', diagnosticFeedback: 'الفقرة الثانية تنبه إلى أن البرامج تنتج أحيانا إجابات غير دقيقة.' },
						{ text: 'L’augmentation immédiate du temps de lecture papier', diagnosticFeedback: 'لم يذكر النص هذه النتيجة.' }
					],
					medQ: 'Quel connecteur logique introduit la réfutation des enseignants au début du paragraphe 2 ?',
					medCorrect: 'Toutefois',
					medDistractors: [
						{ text: 'Par conséquent', diagnosticFeedback: '« Par conséquent » رابط نتيجة يرد في بداية الفقرة الثالثة.' },
						{ text: 'De plus', diagnosticFeedback: '« De plus » رابط إضافة داخل الفقرة الثانية.' },
						{ text: 'Depuis', diagnosticFeedback: '« Depuis » ظرف زمان في الفقرة الأولى.' }
					],
					hardQ: 'Quelle stratégie argumentative domine dans le paragraphe 2 du texte sur l’intelligence artificielle ?',
					hardCorrect: 'Convaincre par des arguments logiques et concrets sur les effets de la passivité cognitive',
					hardDistractors: [
						{ text: 'Raconter une biographie historique de 1954', diagnosticFeedback: 'النص مناظرة فكرية معاصرة وليس سردا تاريخيا.' },
						{ text: 'Donner un ordre impératif de fermeture des lycées', diagnosticFeedback: 'لا توجد أوامر متطرفة بل حجاج متزن.' },
						{ text: 'Décrire les caractéristiques techniques d’un clavier', diagnosticFeedback: 'النقاش تربوي وأخلاقي حول التعلم.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement ce texte de débat d’idées puis répondez aux questions suivantes.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Répondez par « Vrai » ou « Faux » (justifiez les réponses fausses) :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Repérez d’abord la thèse adverse (souvent en §1) puis les connecteurs d’opposition qui introduisent la thèse de l’auteur (§2).',
					'Vérifiez toujours si l’auteur propose une synthèse nuancée dans le dernier paragraphe.',
					'Pour la visée du débat d’idées, précisez : « débattre de... et convaincre le lecteur que... ».'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPRÉHENSION (7 pts) — Travail honnête, Solidarité algérienne (Touiza), Éducation
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t2_comp_education_solidarite',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): العمل الشريف والتضامن الجزائري ومسؤولية التربية',
		curriculumLessonId: 'fre_lesson_3as_sci_t2_modalisateurs_anaphores_visee',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Travail honnête ou recherche du gain facile ?',
					source: 'D’après une chronique sociale et éducative (2025)',
					paragraphs: [
						'Dans une époque marquée par la vitesse, quelques jeunes croient à tort que la réussite consiste à obtenir des richesses rapidement sans effort prolongé. Séduits par des promesses illusoires sur internet, [[ils]] négligent parfois la formation sérieuse et la maîtrise d’un métier utile.',
						'Pourtant, l’expérience sociale prouve que les gains faciles s’évaporent aussi vite qu’ils apparaissent. En revanche, le travail honnête, fondé sur la compétence, la patience et la probité, procure une dignité durable et gagne la confiance de la communauté. Les grands bâtisseurs de la civilisation, d’Al-Khwarizmi à Fatima Al-Fihriya, n’ont laissé une trace féconde que grâce à une persévérance constante au service du savoir et du bien commun.',
						'Ainsi, les familles et les lycées doivent valoriser le mérite authentique plutôt que les apparences trompeuses. C’est uniquement par l’effort loyal et la persévérance qu’une génération construit une économie solide et un avenir respectable.'
					],
					glossary: [
						{ term: 'probité', meaning: 'honnêteté morale scrupuleuse dans le travail' },
						{ term: 'féconde', meaning: 'riche en résultats utiles et durables' }
					],
					tfItems: [
						{ q: 'L’auteur approuve l’idée que le gain rapide sans effort garantit une réussite durable.', a: 'Faux', c: 'L’auteur affirme que les gains faciles s’évaporent vite et défend le travail honnête.', mark: '0.5' },
						{ q: 'Selon le texte, la compétence, la patience et la probité gagnent la confiance de la communauté.', a: 'Vrai', mark: '0.5' },
						{ q: 'Al-Khwarizmi et Fatima Al-Fihriya sont évoqués comme des modèles de persévérance utile.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur conseille aux écoles de valoriser les apparences trompeuses plutôt que le mérite.', a: 'Faux', c: 'Les familles et les lycées doivent valoriser le mérite authentique.', mark: '0.5' }
					],
					tableIntro: '2. Classez ces expressions selon qu’elles caractérisent le « Gain facile » ou le « Travail honnête » : promesses illusoires, dignité durable, confiance de la communauté, s’évapore vite :',
					tableCols: [
						{ header: 'Gain facile (rejeté)', items: ['promesses illusoires', 's’évapore vite'], mark: '0.75' },
						{ header: 'Travail honnête (défendu)', items: ['dignité durable', 'confiance de la communauté'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quel modalisateur du paragraphe 1 montre immédiatement que l’auteur désapprouve l’avis des partisans du gain facile ?\nb) Quelles valeurs fondent le travail honnête selon le paragraphe 2 ?',
					whA: '3. a) La locution « à tort » (ainsi que l’adjectif péjoratif « illusoires »).\nb) La compétence, la patience et la probité (ainsi que la persévérance).',
					refQ: '4. a) À qui renvoie le pronom « ils » (§1) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « ils » renvoie à « quelques jeunes » (qui croient au gain facile).\nb) Convaincre les jeunes lecteurs que seul le travail honnête et persévérant assure la dignité personnelle et le progrès social.',
					easyQ: 'Dans le texte « Travail honnête ou recherche du gain facile ? », quelle expression du §1 montre le désaccord de l’auteur ?',
					easyCorrect: '« croient à tort » et « promesses illusoires »',
					easyDistractors: [
						{ text: '« maîtrise d’un métier utile »', diagnosticFeedback: 'هذه قيمة إيجابية يدافع عنها الكاتب.' },
						{ text: '« dignité durable »', diagnosticFeedback: 'هذه ثمرة العمل الشريف في الفقرة الثانية.' },
						{ text: '« persévérance constante »', diagnosticFeedback: 'صفة محمودة في الفقرة الثانية.' }
					],
					medQ: 'Quel rapport logique exprime « En revanche » au paragraphe 2 du texte ?',
					medCorrect: 'L’opposition entre le gain facile éphémère et le travail honnête durable',
					medDistractors: [
						{ text: 'La cause chronologique', diagnosticFeedback: '« En revanche » رابط تقابل ومعارضة لا سبب.' },
						{ text: 'Le but final', diagnosticFeedback: 'الغاية يُعبر عنها بـ « afin de / pour que ».' },
						{ text: 'L’addition simple sans contraste', diagnosticFeedback: '« En revanche » تبرز التضاد والمقابلة بين فكرتين.' }
					],
					hardQ: 'Pourquoi l’auteur évoque-t-il Al-Khwarizmi et Fatima Al-Fihriya dans son argumentation ?',
					hardCorrect: 'Comme des exemples historiques d’autorité prouvant que la persévérance honnête produit une œuvre durable',
					hardDistractors: [
						{ text: 'Pour illustrer les dangers des réseaux sociaux modernes', diagnosticFeedback: 'ذُكرا كقدوتين في المثابرة والعمل العلمي والاجتماعي النافع.' },
						{ text: 'Pour prouver que la richesse rapide est la meilleure voie', diagnosticFeedback: 'العكس تماما؛ استشهد بهما لتفنيد فكرة الربح السهل.' },
						{ text: 'Pour transformer le débat en biographie purement géographique', diagnosticFeedback: 'هما مثال حجاجي يخدم أطروحة الكاتب.' }
					]
				},
				{
					title: 'La solidarité algérienne face à l’individualisme moderne',
					source: 'D’après la revue sociologique « Société et Valeurs » (2025)',
					paragraphs: [
						'Beaucoup d’observateurs constatent avec inquiétude la montée de l’individualisme dans les grandes villes modernes. Certains prétendent que le rythme de vie actuel oblige chacun à ne penser qu’à ses propres intérêts, affirmant que l’entraide traditionnelle serait devenue inutile face aux services publics.',
						'Or, cette thèse néglige une vérité humaine fondamentale. En Algérie, la tradition séculaire de la « Touiza » — cette entraide collective lors des récoltes, de la construction ou du soutien aux familles nécessiteuses — prouve que les institutions ne suffisent pas sans la fraternité des citoyens. Bien que les modes de vie évoluent, [[cette solidarité vivante]] demeure un bouclier efficace lors des crises, comme les campagnes de reboisement ou l’aide en hiver.',
						'Il est donc essentiel de transmettre cet esprit de partage aux nouvelles générations. Une société unie par la bienveillance et le respect mutuel résiste infiniment mieux aux difficultés qu’une somme d’individus isolés.'
					],
					glossary: [
						{ term: 'séculaire', meaning: 'qui existe depuis plusieurs siècles' },
						{ term: 'bouclier', meaning: 'moyen de protection solide contre les épreuves' }
					],
					tfItems: [
						{ q: 'Selon la thèse adverse, les services publics rendraient l’entraide traditionnelle inutile.', a: 'Vrai', mark: '0.5' },
						{ q: 'La « Touiza » est une tradition algérienne fondée sur l’individualisme et l’isolement.', a: 'Faux', c: 'C’est une tradition d’entraide collective lors des récoltes, de la construction ou du soutien aux familles nécessiteuses.', mark: '0.5' },
						{ q: 'L’auteur estime que la solidarité citoyenne reste utile aujourd’hui malgré l’évolution des modes de vie.', a: 'Vrai', mark: '0.5' },
						{ q: 'D’après le texte, une société d’individus isolés résiste mieux aux crises qu’une société solidaire.', a: 'Faux', c: 'Une société unie par la bienveillance résiste infiniment mieux aux difficultés.', mark: '0.5' }
					],
					tableIntro: '2. Relevez deux exemples concrets de solidarité traditionnelle et deux exemples de solidarité actuelle mentionnés dans le paragraphe 2 :',
					tableCols: [
						{ header: 'Entraide traditionnelle (Touiza)', items: ['entraide lors des récoltes', 'aide à la construction / aux familles'], mark: '0.75' },
						{ header: 'Solidarité actuelle', items: ['campagnes de reboisement', 'aide en hiver'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quel connecteur au début du paragraphe 2 introduit la réfutation de la thèse individualiste ?\nb) Pourquoi l’auteur juge-t-il que les institutions publiques ne remplacent pas totalement la solidarité citoyenne ?',
					whA: '3. a) Le connecteur d’opposition « Or ».\nb) Parce que la fraternité humaine et l’entraide directe forment un bouclier indispensable lors des crises et renforcent la cohésion sociale.',
					refQ: '4. a) À quoi renvoie le substitut lexical « cette solidarité vivante » (§2) ?\nb) Relevez dans le texte un mot exprimant le sentiment d’inquiétude de l’auteur (§1) et un verbe de modalité (§3).',
					refA: '4. a) Il renvoie à la tradition de la « Touiza » (l’entraide collective algérienne).\nb) Sentiment : « avec inquiétude » | Expression de modalité/nécessité : « Il est essentiel de ».',
					easyQ: 'Dans le texte sur la solidarité algérienne, qu’est-ce que la « Touiza » ?',
					easyCorrect: 'Une tradition algérienne d’entraide collective entre voisins et citoyens',
					easyDistractors: [
						{ text: 'Une forme d’isolement urbain récent', diagnosticFeedback: 'التويزة نقيض الفردانية، فهي تعاون وتكافل جماعي.' },
						{ text: 'Une taxe commerciale imposée aux villes', diagnosticFeedback: 'التويزة عمل تطوعي تكافلي وليست ضريبة.' },
						{ text: 'Une nouvelle application mobile payante', diagnosticFeedback: 'النص يصفها بتقليد جزائري عريق ممتد عبر القرون.' }
					],
					medQ: 'Quel rapport logique exprime le connecteur « Or » au début du paragraphe 2 ?',
					medCorrect: 'Une opposition qui introduit la réfutation de la thèse adverse',
					medDistractors: [
						{ text: 'Une simple énumération chronologique', diagnosticFeedback: '« Or » رابط منطقي حجاجي للمعارضة والاستدراك.' },
						{ text: 'Une conséquence finale', diagnosticFeedback: 'النتيجة في الفقرة الثالثة بـ « donc ».' },
						{ text: 'Un exemple secondaire', diagnosticFeedback: '« Or » تفند أطروحة الفقرة الأولى.' }
					],
					hardQ: 'Dans « Bien que les modes de vie évoluent », à quel mode est conjugué le verbe « évoluent » ?',
					hardCorrect: 'Au subjonctif présent imposé par la locution concessive « Bien que »',
					hardDistractors: [
						{ text: 'À l’imparfait de l’indicatif', diagnosticFeedback: 'الماضي الناقص هو « évoluaient ».' },
						{ text: 'Au futur simple', diagnosticFeedback: 'المستقبل هو « évolueront ».' },
						{ text: 'Au passé simple', diagnosticFeedback: 'الماضي البسيط هو « évoluèrent ».' }
					]
				},
				{
					title: 'Éducation des jeunes : rôle exclusif de l’école ou responsabilité partagée ?',
					source: 'D’après une tribune éducative algérienne (2025)',
					paragraphs: [
						'Face aux difficultés scolaires ou comportementales de certains adolescents, une tendance consiste à rejeter toute la responsabilité sur l’école. Selon ce point de vue, les enseignants disposeraient seuls des outils nécessaires pour instruire et éduquer pleinement les jeunes.',
						'Néanmoins, l’observation quotidienne montre que l’école ne peut pas accomplir sa mission isolément. La famille constitue la première école où l’enfant apprend le respect, l’honnêteté, le goût de l’effort et l’organisation du temps. Lorsque les parents suivent régulièrement le travail de [[leurs enfants]] et dialoguent avec les professeurs, les résultats scolaires progressent nettement.',
						'En somme, l’éducation réussie repose sur un partenariat sincère entre la maison et l’établissement scolaire. Plutôt que de se renvoyer la faute, parents et éducateurs doivent unir leurs efforts afin de former des citoyens instruits et responsables.'
					],
					glossary: [
						{ term: 'partenariat', meaning: 'coopération régulière en vue d’un objectif commun' },
						{ term: 'comportementales', meaning: 'liées à la conduite et aux manières d’agir' }
					],
					tfItems: [
						{ q: 'La thèse adverse estime que l’école porte seule toute la responsabilité de l’éducation.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, l’école peut accomplir parfaitement sa mission sans aucune implication familiale.', a: 'Faux', c: 'L’école ne peut pas accomplir sa mission isolément ; la famille est la première école.', mark: '0.5' },
						{ q: 'Le suivi parental et le dialogue avec les professeurs améliorent les résultats scolaires.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur conclut que parents et éducateurs doivent coopérer dans un partenariat sincère.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez ces rôles selon qu’ils relèvent de la « Famille » ou de la « Coopération famille-école » d’après le texte :',
					tableCols: [
						{ header: 'Rôle premier de la famille', items: ['enseigner le respect et l’honnêteté', 'inculquer le goût de l’effort'], mark: '0.75' },
						{ header: 'Partenariat famille-école', items: ['dialoguer avec les professeurs', 'former des citoyens instruits et responsables'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Pourquoi l’auteur appelle-t-il la famille « la première école » ?\nb) Quelle est la thèse finale défendue par l’auteur dans le paragraphe 3 ?',
					whA: '3. a) Parce que c’est au sein de la famille que l’enfant acquiert les bases morales essentielles : respect, honnêteté, goût de l’effort et organisation.\nb) Une éducation réussie repose sur un partenariat sincère et complémentaire entre les parents et l’établissement scolaire.',
					refQ: '4. a) À qui renvoie « leurs enfants » (§2) ?\nb) Quelle expression au début du paragraphe 3 introduit la synthèse conclusive ?',
					refA: '4. a) Aux enfants des parents (les élèves suivis par leurs parents).\nb) Le connecteur de conclusion « En somme ».',
					easyQ: 'Dans le texte sur la responsabilité éducative, que défend l’auteur face à ceux qui blâment uniquement l’école ?',
					easyCorrect: 'Un partenariat sincère et complémentaire entre la famille et l’école',
					easyDistractors: [
						{ text: 'La suppression totale du rôle des parents', diagnosticFeedback: 'الكاتب يصف الأسرة بالمدرسة الأولى.' },
						{ text: 'La fermeture des établissements scolaires', diagnosticFeedback: 'الكاتب يدعو لتكامل الأسرة والمدرسة معا.' },
						{ text: 'L’absence de dialogue entre parents et enseignants', diagnosticFeedback: 'النص يشيد بالحوار المنتظم بين الأولياء والأساتذة.' }
					],
					medQ: 'Quel connecteur logique ouvre la réfutation au début du paragraphe 2 ?',
					medCorrect: 'Néanmoins',
					medDistractors: [
						{ text: 'En somme', diagnosticFeedback: '« En somme » رابط خاتمة في الفقرة الثالثة.' },
						{ text: 'Lorsque', diagnosticFeedback: '« Lorsque » رابط زمني أو شرطي داخل الفقرة الثانية.' },
						{ text: 'Selon', diagnosticFeedback: '« Selon » تقدم الرأي المخالف في الفقرة الأولى.' }
					],
					hardQ: 'Dans « afin de former des citoyens instruits et responsables » (§3), pourquoi l’auteur utilise-t-il « afin de + infinitif » au lieu de « afin que + subjonctif » ?',
					hardCorrect: 'Parce que les deux actions ont exactement le même sujet (parents et éducateurs)',
					hardDistractors: [
						{ text: 'Parce que « afin que » n’existe pas en français', diagnosticFeedback: '« afin que » موجودة وتُستعمل عند اختلاف الفاعلين.' },
						{ text: 'Parce que le verbe « former » n’a pas de subjonctif', diagnosticFeedback: 'له تصريف في الـ subjonctif (qu’ils forment).' },
						{ text: 'Parce que la phrase exprime une cause passée', diagnosticFeedback: 'العبارة تعبر عن الغاية (le but).' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Bonne réponse : ${qMap.ans}.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement le texte argumentatif puis répondez aux questions proposées.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Répondez par « Vrai » ou « Faux » (en justifiant chaque réponse fausse) :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Repérez les verbes et expressions qui distancent l’auteur de la thèse adverse (prétendent, à tort, conditionnel).',
					'Observez les connecteurs au début de chaque paragraphe : Or / Néanmoins (réfutation), Ainsi / En somme (conclusion).',
					'Les exemples historiques ou sociaux servent toujours à prouver un argument précis.'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. FONCTIONNEMENT DE LA LANGUE (7 pts) — Concession, Réfutation & Rapports logiques
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t2_expl_concession_logique',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'grammaire_syntaxe',
		titleAr: 'البناء اللغوي (7 ن): الاستدراك التنازلي والتفنيد والعلاقات المنطقية في البكالوريا',
		curriculumLessonId: 'fre_lesson_3as_sci_t2_concession_refutation',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Relevez les quatre mots appartenant au champ lexical du « débat d’idées » :\n(thèse - argument - forêt - réfutation - désert - conviction - pluie)',
					lexA: '1. Champ lexical du débat d’idées : thèse, argument, réfutation, conviction.',
					tableIntro: '2. Classez les connecteurs suivants dans le tableau : « parce que », « si bien que », « bien que », « grâce à », « par conséquent », « malgré » :',
					tableCols: [
						{ header: 'Cause', items: ['parce que', 'grâce à'], mark: '0.5' },
						{ header: 'Conséquence', items: ['si bien que', 'par conséquent'], mark: '0.5' },
						{ header: 'Concession / Opposition', items: ['bien que', 'malgré'], mark: '0.5' }
					],
					rewriteQ:
						'3. Réécrivez les phrases suivantes selon la consigne donnée :\na) Remplacez « mais » par « Bien que » : « Les tablettes sont rapides, mais elles fatiguent les yeux. »\nb) Remplacez « Bien que » par « Malgré » : « Bien que la recherche soit difficile, les savants persévèrent. »\nc) Transformez ce rapport de cause en rapport de conséquence : « La science doit respecter l’éthique car elle touche à la dignité humaine. »',
					rewriteA:
						'3. a) Bien que les tablettes soient rapides, elles fatiguent les yeux.\nb) Malgré la difficulté de la recherche, les savants persévèrent.\nc) La science touche à la dignité humaine ; donc (par conséquent / c’est pourquoi) elle doit respecter l’éthique.',
					logicQ: '4. Identifiez le rapport logique implicite dans la phrase suivante puis réécrivez-la en l’explicitant par un connecteur :\n« Cet étudiant organise son temps avec discipline : il obtient d’excellents résultats. »',
					logicA: '4. Rapport logique implicite : la conséquence. Phrase explicitée : « Cet étudiant organise son temps avec discipline, c’est pourquoi (donc) il obtient d’excellents résultats. »',
					gapQ: '5. Complétez avec les connecteurs convenables : (Certes - mais - grâce à - donc)\n(1) ........ l’outil numérique accélère l’accès à l’information, (2) ........ il ne remplace pas la réflexion. C’est (3) ........ la lecture attentive que l’esprit mûrit ; il faut (4) ........ équilibrer les deux supports.',
					gapA: '5. (1) Certes | (2) mais | (3) grâce à | (4) donc',
					easyQ: 'Complétez avec le bon connecteur de cause : « Les élèves ont brillamment réussi ........ leur travail honnête. »',
					easyCorrect: 'grâce à',
					easyDistractors: [
						{ text: 'à cause de', diagnosticFeedback: '« à cause de » مخصصة للسبب السلبي، بينما النجاح نتيجة إيجابية.' },
						{ text: 'parce que', diagnosticFeedback: '« parce que » تتبعها جملة فعلية لا مجموعة اسمية.' },
						{ text: 'bien que', diagnosticFeedback: '« bien que » للاستدراك ويتبعها فعل في الـ subjonctif.' }
					],
					medQ: 'Réécrivez avec « Bien que » : « Les tablettes sont rapides, mais elles fatiguent les yeux. »',
					medCorrect: 'Bien que les tablettes soient rapides, elles fatiguent les yeux.',
					medDistractors: [
						{ text: 'Bien que les tablettes sont rapides, mais elles fatiguent les yeux.', diagnosticFeedback: 'يجب تصريف « être » في الـ subjonctif (soient) وحذف « mais ».' },
						{ text: 'Bien que les tablettes soient rapides, mais elles fatiguent les yeux.', diagnosticFeedback: 'لا نجمع أبدا بين « Bien que » و « mais ».' },
						{ text: 'Bien que les tablettes étaient rapides, elles fatiguent les yeux.', diagnosticFeedback: 'الـ imparfait ليس صيغة subjonctif.' }
					],
					hardQ: 'Remplacez « Bien que » par « Malgré » : « Bien que la recherche soit difficile, les savants persévèrent. »',
					hardCorrect: 'Malgré la difficulté de la recherche, les savants persévèrent.',
					hardDistractors: [
						{ text: 'Malgré que la recherche soit difficile, les savants persévèrent.', diagnosticFeedback: 'نحول الصفة/الجملة إلى اسم بعد « Malgré » ونتجنب « malgré que ».' },
						{ text: 'Malgré la recherche soit difficile, les savants persévèrent.', diagnosticFeedback: '« Malgré » لا يتبعها فعل مصرف.' },
						{ text: 'Malgré difficile la recherche, les savants persévèrent.', diagnosticFeedback: 'يجب تكوين مجموعة اسمية سليمة « la difficulté de la recherche ».' }
					]
				},
				{
					lexQ: '1. Donnez l’antonyme (le contraire) de chacun des mots suivants en lien avec le débat d’idées :\na) honnête   b) solidarité   c) utile   d) avantage',
					lexA: '1. a) malhonnête | b) individualisme / égoïsme | c) inutile | d) inconvénient',
					tableIntro: '2. Classez ces phrases selon le mode ou la nature exigés par le connecteur concessif : (A) Bien qu’il ait raison... | (B) Même s’il a raison... | (C) En dépit de sa raison...',
					tableCols: [
						{ header: '+ Subjonctif', items: ['(A) Bien qu’il ait raison'], mark: '0.5' },
						{ header: '+ Indicatif', items: ['(B) Même s’il a raison'], mark: '0.5' },
						{ header: '+ Groupe nominal', items: ['(C) En dépit de sa raison'], mark: '0.5' }
					],
					rewriteQ:
						'3. Effectuez les transformations grammaticales suivantes :\na) Reliez par « Bien que » : « Le progrès technique fait gagner du temps. Il pose des questions morales. »\nb) Remplacez « parce que » par « à cause de » : « La concentration baisse parce que les écrans distraient les élèves. »\nc) Transformez la conséquence en cause : « Les parents dialoguent avec l’école, si bien que l’enfant progresse. »',
					rewriteA:
						'3. a) Bien que le progrès technique fasse gagner du temps, il pose des questions morales.\nb) La concentration baisse à cause de la distraction causée par les écrans (ou : à cause des écrans distrayants).\nc) L’enfant progresse parce que (car) les parents dialoguent avec l’école.',
					logicQ: '4. Quel rapport logique exprime « tandis que » dans : « Certains préfèrent la rapidité des écrans, tandis que d’autres privilégient la profondeur du livre papier » ?',
					logicA: '4. Un rapport d’opposition (contraste entre deux attitudes ou deux points de vue).',
					gapQ: '5. Complétez avec les bons articulateurs : (pourtant - car - c’est pourquoi - même si)\nL’entraide reste vitale (1) ........ elle unit le quartier. (2) ........ le rythme moderne est rapide, la solidarité ne doit pas disparaître ; (3) ........, certains l’oublient ; (4) ........ il faut sensibiliser les jeunes.',
					gapA: '5. (1) car | (2) Même si | (3) pourtant | (4) c’est pourquoi',
					easyQ: 'Quel mode verbal emploie-t-on après « Même si » ?',
					easyCorrect: 'L’indicatif (ex. : Même si la technologie est utile...)',
					easyDistractors: [
						{ text: 'Le subjonctif obligatoire (Même si la technologie soit...)', diagnosticFeedback: 'عكس « bien que »، فإن « même si » يتبعها الإخباري (indicatif).' },
						{ text: 'L’impératif présent', diagnosticFeedback: 'لا يأتي الأمر بعد « même si ».' },
						{ text: 'Uniquement l’infinitif sans sujet', diagnosticFeedback: '« même si » يليها فاعل وفعل مصرف.' }
					],
					medQ: 'Reliez correctement par « Bien que » : « Le progrès technique fait gagner du temps. Il pose des questions morales. »',
					medCorrect: 'Bien que le progrès technique fasse gagner du temps, il pose des questions morales.',
					medDistractors: [
						{ text: 'Bien que le progrès technique fait gagner du temps, il pose des questions morales.', diagnosticFeedback: 'الفعل « faire » في الـ subjonctif présent يصبح « fasse ».' },
						{ text: 'Bien que le progrès technique fasse gagner du temps, mais il pose des questions morales.', diagnosticFeedback: 'احذف « mais » عند استعمال « Bien que ».' },
						{ text: 'Bien que le progrès technique fera gagner du temps, il pose des questions morales.', diagnosticFeedback: 'لا نستعمل المستقبل بعد « Bien que ».' }
					],
					hardQ: 'Transformez ce rapport de conséquence en cause sans inverser le sens : « Les parents suivent leurs enfants, si bien que les résultats s’améliorent. »',
					hardCorrect: 'Les résultats s’améliorent parce que les parents suivent leurs enfants.',
					hardDistractors: [
						{ text: 'Les parents suivent leurs enfants parce que les résultats s’améliorent.', diagnosticFeedback: 'عكست المعنى المنطقي بين السبب والنتيجة.' },
						{ text: 'Les résultats s’améliorent donc les parents suivent leurs enfants.', diagnosticFeedback: '« donc » رابط نتيجة وليس سببا.' },
						{ text: 'Bien que les parents suivent leurs enfants, les résultats s’améliorent.', diagnosticFeedback: 'المطلوب علاقة سبب لا استدراك.' }
					]
				},
				{
					lexQ: '1. Indiquez la fonction argumentative de chacune des expressions suivantes dans un débat :\na) Certes... mais   b) En effet   c) Par conséquent   d) En revanche',
					lexA: '1. a) Concession + réfutation | b) Explication / justification | c) Conséquence / conclusion | d) Opposition',
					tableIntro: '2. Classez les verbes suivants conjugués au subjonctif présent après « Bien qu’il... » : être, avoir, pouvoir, faire, savoir, devoir :',
					tableCols: [
						{ header: 'Être / Avoir / Pouvoir', items: ['soit', 'ait', 'puisse'], mark: '0.75' },
						{ header: 'Faire / Savoir / Devoir', items: ['fasse', 'sache', 'doive'], mark: '0.75' }
					],
					rewriteQ:
						'3. Effectuez les réécritures demandées :\na) Complétez au subjonctif : « Quoique l’intelligence artificielle (pouvoir) aider les élèves, elle ne (devoir, indicatif) pas faire leurs devoirs. »\nb) Exprimez la cause en début de phrase avec « Comme » : « La Touiza survit parce que les Algériens tiennent à l’entraide. »\nc) Remplacez « Malgré » par « Bien que » : « Malgré son efficacité, la machine reste sans conscience. »',
					rewriteA:
						'3. a) Quoique l’intelligence artificielle puisse aider les élèves, elle ne doit pas faire leurs devoirs.\nb) Comme les Algériens tiennent à l’entraide, la Touiza survit.\nc) Bien que la machine soit efficace, elle reste sans conscience.',
					logicQ: '4. Pourquoi la phrase suivante est-elle incorrecte ? Corrigez-la : « Car la lecture développe l’esprit, les lycéens doivent lire chaque jour. »',
					logicA: '4. Le connecteur « car » ne se place jamais en début de phrase. Correction : « Comme (ou : Puisque) la lecture développe l’esprit, les lycéens doivent lire chaque jour. »',
					gapQ: '5. Complétez ce bilan méthodologique : (subjonctif - nom - indicatif - réfutation)\nDans la concession, « bien que » exige le (1) ........, « malgré » est suivi d’un (2) ........, et « même si » s’emploie avec l’(3) ........ . La concession prépare habilement la (4) ........ .',
					gapA: '5. (1) subjonctif | (2) nom | (3) indicatif | (4) réfutation',
					easyQ: 'Complétez correctement : « Quoique cet outil numérique ........ utile, la lecture papier garde toute sa valeur. »',
					easyCorrect: 'soit',
					easyDistractors: [
						{ text: 'est', diagnosticFeedback: '« Quoique » (كلمة واحدة) مثل « Bien que » تفرض الـ subjonctif: soit.' },
						{ text: 'sera', diagnosticFeedback: 'لا يأتي المستقبل بعد « Quoique ».' },
						{ text: 'était', diagnosticFeedback: 'الماضي الناقص ليس subjonctif.' }
					],
					medQ: 'Comment corriger la phrase fautive : « Car la solidarité renforce le pays, nous devons l’encourager » ?',
					medCorrect: 'Comme (ou : Puisque) la solidarité renforce le pays, nous devons l’encourager.',
					medDistractors: [
						{ text: 'Car la solidarité renforcera le pays, nous devons l’encourager.', diagnosticFeedback: 'المشكلة في وضع « Car » في بداية الجملة، وهو ممنوع في الفرنسية.' },
						{ text: 'Donc la solidarité renforce le pays, nous devons l’encourager.', diagnosticFeedback: '« Donc » للنتيجة ولا يوضع في صدارة السبب.' },
						{ text: 'Grâce à la solidarité renforce le pays, nous devons l’encourager.', diagnosticFeedback: '« Grâce à » يتبعها اسم لا جملة فعلية.' }
					],
					hardQ: 'Transformez « Malgré son efficacité, la machine reste sans conscience » en employant « Bien que » :',
					hardCorrect: 'Bien que la machine soit efficace, elle reste sans conscience.',
					hardDistractors: [
						{ text: 'Bien que la machine est efficace, elle reste sans conscience.', diagnosticFeedback: 'بعد « Bien que » نصرف « être » في الـ subjonctif: soit.' },
						{ text: 'Bien que son efficacité, la machine reste sans conscience.', diagnosticFeedback: '« Bien que » تتطلب جملة فعلية بفاعل وفعل مصرف.' },
						{ text: 'Bien que la machine soit efficace, mais elle reste sans conscience.', diagnosticFeedback: 'لا نجمع بين « Bien que » و « mais ».' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les exercices suivants sur la concession, la réfutation et les rapports logiques.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.logicQ, answer: v.logicA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Bien que / Quoique + subjonctif (jamais de « mais » après la virgule).',
					'Malgré / En dépit de + groupe nominal ; Même si + indicatif.',
					'Pour passer de la cause à la conséquence, placez d’abord la cause puis donc / par conséquent / c’est pourquoi.'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.logicA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. FONCTIONNEMENT DE LA LANGUE (7 pts) — Modalisateurs, Substituts, Stratégies
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t2_expl_modalisateurs_anaphores',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (7 ن): الموجّهات والبدائل النصية واستراتيجيات الإقناع',
		curriculumLessonId: 'fre_lesson_3as_sci_t2_modalisateurs_anaphores_visee',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Distinguez pour chaque modalisateur s’il exprime la « certitude », le « doute » ou le « jugement appréciatif » :\na) sans aucun doute   b) probablement   c) remarquable   d) il semble que',
					lexA: '1. a) certitude | b) doute / probabilité | c) jugement appréciatif (mélioratif) | d) doute / réserve',
					wordRows: [
						{ verbe: { given: true, value: 'convaincre' }, nom: { value: 'conviction', mark: '0.25' }, adjectif: { value: 'convaincant / convaincu', mark: '0.25' } },
						{ verbe: { value: 'argumenter', mark: '0.25' }, nom: { given: true, value: 'argumentation' }, adjectif: { value: 'argumentatif', mark: '0.25' } },
						{ verbe: { value: 'réfuter', mark: '0.25' }, nom: { value: 'réfutation', mark: '0.25' }, adjectif: { given: true, value: 'réfutable / irréfutable' } }
					],
					rewriteQ:
						'3. Évitez les répétitions en remplaçant les mots répétés par des substituts grammaticaux ou lexicaux appropriés :\na) « Le livre papier développe la mémoire. Le livre papier offre une concentration durable aux lycéens. »\nb) « Ibn Al-Haytham a posé les bases de l’optique moderne. Les chercheurs admirent encore la méthode d’Ibn Al-Haytham. »\nc) « Les jeunes utilisent souvent les réseaux sociaux. Les jeunes doivent garder un esprit critique face aux réseaux sociaux. »',
					rewriteA:
						'3. a) Le livre papier développe la mémoire. Il (ou : Cet ouvrage imprimé) offre une concentration durable aux lycéens.\nb) Ibn Al-Haytham a posé les bases de l’optique moderne. Les chercheurs admirent encore la méthode de ce grand savant (ou : sa méthode).\nc) Les jeunes utilisent souvent les réseaux sociaux. Ils (ou : Ces derniers) doivent garder un esprit critique face à ces plateformes (ou : devant eux).',
					stratQ: '4. Indiquez si l’énoncé suivant relève de la stratégie « convaincre » ou « persuader » et justifiez :\n« Une étude universitaire révèle que les élèves qui dorment huit heures et limitent les écrans améliorent leur moyenne de deux points. »',
					stratA: '4. Stratégie : convaincre (appel à la raison) car l’auteur s’appuie sur une étude universitaire et des données chiffrées objectives.',
					gapQ: '5. Complétez avec les mots convenables : (cohérence - répétition - substituts - modalisateurs)\nDans un texte argumentatif, les (1) ........ révèlent le degré de certitude ou le jugement de l’auteur, tandis que les (2) ........ évitent la (3) ........ et assurent la (4) ........ du discours.',
					gapA: '5. (1) modalisateurs | (2) substituts | (3) répétition | (4) cohérence',
					easyQ: 'Quel est le rôle principal des substituts grammaticaux et lexicaux dans un texte ?',
					easyCorrect: 'Éviter les répétitions et assurer la cohérence textuelle',
					easyDistractors: [
						{ text: 'Rendre le texte plus long et plus difficile à comprendre', diagnosticFeedback: 'البدائل تجعل النص أكثر سلاسة وترابطا.' },
						{ text: 'Supprimer tous les arguments du débat', diagnosticFeedback: 'البدائل تربط الأفكار والحجج ولا تحذفها.' },
						{ text: 'Remplacer la ponctuation par des chiffres', diagnosticFeedback: 'لا علاقة للبدائل بإلغاء علامات الوقف.' }
					],
					medQ: 'Quel nom correspond exactement au verbe « convaincre » ?',
					medCorrect: 'La conviction',
					medDistractors: [
						{ text: 'Le convainquement', diagnosticFeedback: 'كلمة غير موجودة؛ الاسم الصحيح هو « la conviction ».' },
						{ text: 'La convaincance', diagnosticFeedback: 'اللاحقة غير صحيحة.' },
						{ text: 'La convaincation', diagnosticFeedback: 'الاسم القياسي من « convaincre » هو « la conviction ».' }
					],
					hardQ: 'Dans « Les élèves utilisent les écrans ; ces derniers doivent être régulés », à quoi renvoie « ces derniers » ?',
					hardCorrect: 'Les écrans (dernier nom masculin pluriel cité)',
					hardDistractors: [
						{ text: 'Les élèves', diagnosticFeedback: '« ces derniers » تحيل دائما على أقرب اسم مذكر جمع قبلها مباشرة (les écrans).' },
						{ text: 'Les enseignants', diagnosticFeedback: 'كلمة غير مذكورة في الجملة.' },
						{ text: 'Les devoirs scolaires', diagnosticFeedback: 'غير واردة في الجملة.' }
					]
				},
				{
					lexQ: '1. Classez ces expressions en deux paires (certitude vs doute/réserve) :\n« il est évident que » / « il se pourrait que » / « assurément » / « semble-t-il »',
					lexA: '1. Certitude : il est évident que, assurément | Doute / réserve : il se pourrait que, semble-t-il.',
					wordRows: [
						{ verbe: { given: true, value: 'persuader' }, nom: { value: 'persuasion', mark: '0.25' }, adjectif: { value: 'persuasif / persuadé', mark: '0.25' } },
						{ verbe: { value: 'éduquer', mark: '0.25' }, nom: { given: true, value: 'éducation' }, adjectif: { value: 'éducatif / éduqué', mark: '0.25' } },
						{ verbe: { value: 'progresser', mark: '0.25' }, nom: { value: 'progrès / progression', mark: '0.25' }, adjectif: { given: true, value: 'progressif' } }
					],
					rewriteQ:
						'3. Réécrivez les phrases en appliquant la consigne :\na) Exprimez la certitude de l’auteur (ajoutez un modalisateur) : « Le travail honnête mène à la réussite durable. »\nb) Exprimez la réserve au conditionnel : « Les tablettes remplacent définitivement les manuels scolaires. »\nc) Remplacez le groupe répété par « en » ou « y » : « Les lycéens participent à ce débat ; les lycéens s’intéressent beaucoup à ce débat. »',
					rewriteA:
						'3. a) Sans aucun doute (ou : Il est évident que), le travail honnête mène à la réussite durable.\nb) Selon certains, les tablettes remplaceraient définitivement les manuels scolaires.\nc) Les lycéens participent à ce débat ; ils s’y intéressent beaucoup.',
					stratQ: '4. Identifiez la stratégie (convaincre ou persuader) dans : « Quelle douleur de voir la solidarité s’effacer devant l’égoïsme ! » Justifiez.',
					stratA: '4. Stratégie : persuader (appel aux sentiments) grâce à la phrase exclamative et au lexique affectif (« douleur », « égoïsme »).',
					gapQ: '5. Complétez le texte à trous avec : (raison - sentiments - thèse - exemple)\nDans un débat, l’auteur défend sa (1) ........ en cherchant à convaincre par la (2) ........ ou à persuader par les (3) ........ . Chaque argument est souvent renforcé par un (4) ........ concret.',
					gapA: '5. (1) thèse | (2) raison | (3) sentiments | (4) exemple',
					easyQ: 'Quel adjectif correspond au nom « persuasion » ?',
					easyCorrect: 'persuasif',
					easyDistractors: [
						{ text: 'persuadantif', diagnosticFeedback: 'الصفة الصحيحة هي « persuasif / persuasive ».' },
						{ text: 'persuateur', diagnosticFeedback: 'الصفة المدرسية القياسية هي « persuasif ».' },
						{ text: 'persuasionnel', diagnosticFeedback: 'كلمة غير موجودة في الفرنسية.' }
					],
					medQ: 'Remplacez correctement « à ce débat » par un pronom dans : « Les lycéens s’intéressent beaucoup à ce débat. »',
					medCorrect: 'Les lycéens s’y intéressent beaucoup.',
					medDistractors: [
						{ text: 'Les lycéens s’en intéressent beaucoup.', diagnosticFeedback: 'الضمير « en » يعوض مفعولا مسبوقا بـ « de »، أما المسبوق بـ « à » فيعوض بـ « y ».' },
						{ text: 'Les lycéens se le intéressent beaucoup.', diagnosticFeedback: '« le » للمفعول المباشر دون حرف جر.' },
						{ text: 'Les lycéens se lui intéressent beaucoup.', diagnosticFeedback: '« lui » يخص العاقل المسبوق بـ « à » لا الشيء غير العاقل.' }
					],
					hardQ: 'Comment l’auteur marque-t-il sa réserve face à la phrase « Les tablettes remplacent définitivement les manuels » ?',
					hardCorrect: 'En conjuguant le verbe au conditionnel présent : « remplaceraient »',
					hardDistractors: [
						{ text: 'En utilisant « sans aucun doute »', diagnosticFeedback: '« sans aucun doute » تعبر عن اليقين التام لا التحفظ.' },
						{ text: 'En conjuguant le verbe au futur antérieur', diagnosticFeedback: 'صيغة التحفظ على خبر غير مؤكد هي الشرطي الحاضر (conditionnel présent).' },
						{ text: 'En ajoutant un point d’exclamation à l’impératif', diagnosticFeedback: 'الأمر لا يعبر عن التحفظ.' }
					]
				},
				{
					lexQ: '1. Distinguez pour chaque couple lequel est un substitut « grammatical » et lequel est un substitut « lexical » remplaçant « la Touiza » :\na) « elle »   b) « cette tradition d’entraide »   c) « cette dernière »   d) « cette coutume algérienne »',
					lexA: '1. Substituts grammaticaux : elle, cette dernière | Substituts lexicaux : cette tradition d’entraide, cette coutume algérienne.',
					wordRows: [
						{ verbe: { given: true, value: 'nuancer' }, nom: { value: 'nuance', mark: '0.25' }, adjectif: { value: 'nuancé', mark: '0.25' } },
						{ verbe: { value: 'coopérer', mark: '0.25' }, nom: { given: true, value: 'coopération' }, adjectif: { value: 'coopératif', mark: '0.25' } },
						{ verbe: { value: 'respecter', mark: '0.25' }, nom: { value: 'respect', mark: '0.25' }, adjectif: { given: true, value: 'respectueux' } }
					],
					rewriteQ:
						'3. Effectuez les transformations suivantes :\na) Remplacez le groupe répété par « en » : « Les jeunes ont besoin de modèles honnêtes ; ils parlent souvent de modèles honnêtes. »\nb) Relevez les deux modalisateurs dans : « Malheureusement, certains élèves négligent peut-être la lecture quotidienne. »\nc) Transformez cette phrase neutre en phrase subjective méliorative (ajoutez deux adjectifs ou un adverbe) : « La solidarité aide les familles. »',
					rewriteA:
						'3. a) Les jeunes ont besoin de modèles honnêtes ; ils en parlent souvent.\nb) « Malheureusement » (jugement affectif) et « peut-être » (doute / probabilité).\nc) Exemple : « Heureusement, la noble solidarité aide efficacement les familles vulnérables. »',
					stratQ: '4. Quelle est la visée communicative d’un texte qui compare les avantages du livre papier et ceux de l’écran avant de recommander un équilibre ?',
					stratA: '4. Confronter deux points de vue sur les supports de lecture et convaincre le lecteur d’adopter un usage équilibré et réfléchi.',
					gapQ: '5. Complétez avec les termes exacts : (anaphore - lexique - nuance - visée)\nL’(1) ........ relie les phrases par reprise d’un même référent. Un auteur sérieux fait preuve de (2) ........ dans le débat, choisit un (3) ........ précis et oriente tout son texte vers sa (4) ........ communicative.',
					gapA: '5. (1) anaphore | (2) nuance | (3) lexique | (4) visée',
					easyQ: 'Quel pronom remplace correctement « de modèles honnêtes » dans : « Ils parlent souvent de modèles honnêtes » ?',
					easyCorrect: 'Ils en parlent souvent.',
					easyDistractors: [
						{ text: 'Ils y parlent souvent.', diagnosticFeedback: 'الفعل « parler de » مسبوق بـ « de » فيعوض بالضمير « en » لا « y ».' },
						{ text: 'Ils les parlent souvent.', diagnosticFeedback: '« les » للمفعول المباشر دون حرف جر.' },
						{ text: 'Ils leur parlent souvent.', diagnosticFeedback: '« leur » تعوض مفعولا عاقلا مسبوقا بـ « à ».' }
					],
					medQ: 'Parmi ces expressions qui remplacent « la science », laquelle est un substitut LEXICAL ?',
					medCorrect: 'ce savoir méthodique',
					medDistractors: [
						{ text: 'elle', diagnosticFeedback: '« elle » ضمير فهو بديل نحوي (grammatical).' },
						{ text: 'celle-ci', diagnosticFeedback: '« celle-ci » ضمير إشارة (بديل نحوي).' },
						{ text: 'la', diagnosticFeedback: '« la » ضمير مفعول (بديل نحوي).' }
					],
					hardQ: 'Dans « Malheureusement, certains élèves négligent peut-être la lecture », quelles nuances expriment « Malheureusement » et « peut-être » ?',
					hardCorrect: 'Un jugement affectif de regret (« Malheureusement ») et une hypothèse / probabilité (« peut-être »)',
					hardDistractors: [
						{ text: 'Deux marques de certitude scientifique absolue', diagnosticFeedback: '« peut-être » تفيد الاحتمال لا اليقين.' },
						{ text: 'Deux connecteurs de cause et de but', diagnosticFeedback: 'هما موجّهان (modalisateurs) وليسا رابطي سبب وغاية.' },
						{ text: 'Deux repères chronologiques du passé simple', diagnosticFeedback: 'ليسا مؤشرين زمنيين.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Répondez aux activités suivantes portant sur la modalisation, la substitution et les stratégies argumentatives.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: '2. Complétez le tableau de la famille de mots ci-dessous :' },
					buildFrenchWordFamilyTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.stratQ, answer: v.stratA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Distinguez bien les substituts grammaticaux (pronoms : il, elle, en, y, celui-ci) des substituts lexicaux (périphrases, synonymes).',
					'Le pronom « en » remplace un complément introduit par « de » ; le pronom « y » remplace un complément introduit par « à ».',
					'Convaincre = raison et faits prouvés ; Persuader = sentiments et valeurs affectives.'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.stratA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. PRODUCTION ÉCRITE (6 pts) — Compte Rendu Objectif d'un débat / Texte argumentatif
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t2_written_cr_debat',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'production_ecrite',
		titleAr: 'التعبير الكتابي (6 ن): التقرير الموضوعي لنص مناظرة أفكار أو تحرير نص حجاجي',
		curriculumLessonId: 'fre_lesson_3as_sci_t2_compte_rendu_argumentatif',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Rédigez le compte rendu objectif (environ 100 à 120 mots) d’un texte argumentatif intitulé « Le livre papier face aux écrans : un débat toujours vivant », extrait de la revue « Cahiers du Lycéen » (2025), afin d’informer vos camarades sur les arguments échangés.',
					sujetUnNotes: [
						'Introduction : nature (texte argumentatif), titre, source, date et problème posé.',
						'Développement (3e personne, au présent) : exposer d’abord les arguments des partisans du numérique puis la réfutation en faveur du livre papier.',
						'Conclure sur la synthèse équilibrée de l’auteur et sa visée argumentative (sans opinion personnelle).',
						'Employer des verbes de débat (soutient, réfute, souligne, conclut) et éviter tout recopiage.'
					],
					sujetDeuxPrompt:
						'Certains jeunes affirment que le progrès scientifique n’a pas besoin de règles éthiques, tandis que d’autres estiment que la science sans conscience morale représente un danger pour l’humanité. Rédigez un texte argumentatif structuré (110 à 140 mots) dans lequel vous présenterez la thèse adverse puis défendrez votre point de vue à l’aide de deux arguments et d’un exemple.',
					modelAnswer:
						'Ce texte argumentatif, intitulé « Le livre papier face aux écrans : un débat toujours vivant » et extrait de la revue « Cahiers du Lycéen » parue en 2025, aborde la question de la place du livre imprimé face à l’essor des supports numériques.\nDans un premier temps, l’auteur rapporte l’opinion des partisans du numérique, qui estiment que la tablette, pratique et riche en ouvrages, rendrait le livre papier dépassé. Toutefois, tout en reconnaissant l’utilité des écrans pour des recherches ponctuelles, il défend la thèse selon laquelle le livre imprimé demeure indispensable pour étudier en profondeur, car il préserve la vue, évite les distractions et favorise la mémorisation. Enfin, il conclut en préconisant un équilibre raisonné entre les deux supports afin de convaincre les lycéens d’en tirer le meilleur profit.',
					rubricSummary: 'Respect de la consigne et fidélité aux thèses du texte (2 pts) | Cohérence, progression argumentative et connecteurs (1.5 pt) | Correction grammaticale, conjugaison et orthographe (2 pts) | Présentation (0.5 pt)',
					easyQ: 'Quelle formule convient le mieux pour débuter l’introduction du compte rendu objectif d’un texte du Projet 2 ?',
					easyCorrect: 'Ce texte argumentatif, intitulé « ... », extrait de ..., soulève le débat autour de...',
					easyDistractors: [
						{ text: 'Ce texte historique raconté en 1954 prouve que j’aime lire.', diagnosticFeedback: 'المشروع الثاني نص حجاجي (texte argumentatif) ولا نضع « je » في التقرير الموضوعي.' },
						{ text: 'Je vais donner mon avis personnel sur les tablettes numériques.', diagnosticFeedback: 'التقرير الموضوعي يخلُو من الرأي الشخصي.' },
						{ text: 'Voici une copie de la première et de la troisième phrase du texte.', diagnosticFeedback: 'النسخ الحرفي مرفوض في البكالوريا.' }
					],
					medQ: 'Si vous choisissez le Sujet 2 (rédiger un texte argumentatif sur science et éthique), quelle structure garantit une note maximale ?',
					medCorrect: 'Introduction (thème + thèse adverse/problématique) -> Développement (concession + thèse défendue + arguments + exemple) -> Conclusion synthétique',
					medDistractors: [
						{ text: 'Une suite de 8 phrases isolées sans aucun connecteur logique', diagnosticFeedback: 'الروابط المنطقية أساسية في بناء الحجاج.' },
						{ text: 'Uniquement des dates historiques sans défendre de point de vue', diagnosticFeedback: 'المطلوب نص حجاجي يتضمن أطروحة وحججا.' },
						{ text: 'Un seul mot répété avec des points d’exclamation', diagnosticFeedback: 'لا يحقق معايير التعبير الكتابي.' }
					],
					hardQ: 'Dans le Sujet 1 (Compte rendu d’un débat), quel verbe traduit le mieux la concession faite par l’auteur dans le modèle ci-dessus ?',
					hardCorrect: '« Tout en reconnaissant l’utilité des écrans..., il défend la thèse selon laquelle... »',
					hardDistractors: [
						{ text: '« L’auteur raconte son voyage en vacances... »', diagnosticFeedback: 'خارج سياق الحجاج تماما.' },
						{ text: '« Je suis tout à fait d’accord avec l’auteur... »', diagnosticFeedback: 'إبداء الرأي الشخصي ممنوع في التقرير الموضوعي.' },
						{ text: '« L’auteur interdit définitivement l’électricité... »', diagnosticFeedback: 'تحريف تام لموقف الكاتب المعتدل.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Faites le compte rendu objectif (environ 100 à 120 mots) d’un texte argumentatif intitulé « Le progrès scientifique peut-il se passer d’éthique ? » (revue « Savoirs et Responsabilité », 2025) pour la rubrique scientifique du journal de votre lycée.',
					sujetUnNotes: [
						'Rédiger une accroche complète (nature, titre, source, date, problématique).',
						'Présenter la thèse adverse (science sans limites) puis les arguments de réfutation de l’auteur.',
						'Intégrer de manière synthétique la référence aux savants musulmans (Ibn Al-Haytham, Al-Zahrawi) sans recopier.',
						'Clôturer par la conclusion de l’auteur et sa visée argumentative (sans « je »).'
					],
					sujetDeuxPrompt:
						'Certains pensent que l’entraide traditionnelle comme la « Touiza » n’a plus de place dans la société moderne, alors que d’autres estiment que la solidarité demeure indispensable. Rédigez un texte argumentatif (110 à 140 mots) défendant la valeur de la solidarité en utilisant une concession (Certes... mais ou Bien que) et deux arguments illustrés.',
					modelAnswer:
						'Ce texte argumentatif, intitulé « Le progrès scientifique peut-il se passer d’éthique ? » et paru en 2025 dans la revue « Savoirs et Responsabilité », examine le lien nécessaire entre l’avancée scientifique et les valeurs morales.\nD’abord, l’auteur expose le point de vue de chercheurs estimant que les règles éthiques freineraient la rapidité des découvertes. Cependant, il réfute cette vision utilitaire en soulignant qu’une science privée de conscience expose la société à de graves dérives écologiques, numériques et médicales. Pour appuyer sa thèse, il évoque l’exemple de grands savants tels qu’Ibn Al-Haytham et Al-Zahrawi, qui alliaient rigueur et éthique. En conclusion, l’auteur vise à convaincre le lecteur que le véritable progrès se mesure à la dignité humaine qu’il protège.',
					rubricSummary: 'Pertinence et exactitude de la synthèse (2 pts) | Cohérence et connecteurs d’opposition/conclusion (1.5 pt) | Maîtrise linguistique (2 pts) | Soin et lisibilité (0.5 pt)',
					easyQ: 'Pourquoi le modèle du compte rendu utilise-t-il « Cependant, il réfute cette vision » ?',
					easyCorrect: 'Pour marquer clairement le passage de la thèse adverse à la position de l’auteur',
					easyDistractors: [
						{ text: 'Pour donner l’opinion personnelle du candidat', diagnosticFeedback: 'الضمير « il » يعود على الكاتب لا المترشح.' },
						{ text: 'Pour indiquer une date du passé simple', diagnosticFeedback: '« Cependant » رابط معارضة حجاجي لا زمني.' },
						{ text: 'Pour recopier intégralement le titre du texte', diagnosticFeedback: 'هذه صياغة تحليلية لبنية الحجاج.' }
					],
					medQ: 'Si vous traitez le Sujet 2 sur la solidarité (Touiza), quelle phrase intègre correctement une concession ?',
					medCorrect: 'Bien que le rythme de la vie urbaine soit rapide, la solidarité reste le pilier de notre cohésion sociale.',
					medDistractors: [
						{ text: 'Bien que le rythme de la vie urbaine est rapide, mais la solidarité reste utile.', diagnosticFeedback: 'بعد « Bien que » نكتب « soit » ونحذف « mais ».' },
						{ text: 'Malgré le rythme de la vie urbaine soit rapide, la solidarité reste utile.', diagnosticFeedback: '« Malgré » يليها اسم لا جملة فعلية.' },
						{ text: 'Parce que la solidarité est utile, mais personne ne s’entraide.', diagnosticFeedback: 'تعارض غير سليم بين رابط السبب ورابط المعارضة.' }
					],
					hardQ: 'Comment résumer efficacement un exemple historique (Ibn Al-Haytham, Al-Zahrawi) dans un compte rendu objectif ?',
					hardCorrect: 'En le mentionnant brièvement pour indiquer l’idée qu’il illustre sans détailler la biographie',
					hardDistractors: [
						{ text: 'En ajoutant deux paragraphes entiers sur leur enfance absents du texte', diagnosticFeedback: 'يمنع إضافة معلومات مطولة من خارج النص.' },
						{ text: 'En affirmant que le texte ne contient aucun exemple', diagnosticFeedback: 'يناقض الأمانة للنص الأصلي.' },
						{ text: 'En supprimant la thèse de l’auteur pour ne garder que les noms propres', diagnosticFeedback: 'الأولوية دائما للأطروحة والحجج ثم ذكر مختصر لدور المثال.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Rédigez le compte rendu objectif (environ 100 à 120 mots) d’un texte argumentatif consacré au débat « Travail honnête ou recherche du gain facile ? » (chronique sociale et éducative, 2025) destiné au club d’orientation de votre lycée.',
					sujetUnNotes: [
						'Accroche complète : texte argumentatif, titre, source, année et thématique.',
						'Résumer à la 3e personne : illusion du gain facile chez certains jeunes vs solidité du travail honnête (compétence, probité, exemples historiques).',
						'Mentionner l’appel conclusif de l’auteur aux familles et aux lycées pour valoriser le mérite.',
						'Respecter l’objectivité totale et la correction linguistique.'
					],
					sujetDeuxPrompt:
						'L’utilisation de l’intelligence artificielle par les lycéens suscite un vif débat : certains la jugent indispensable pour progresser, d’autres craignent qu’elle nuise à l’effort personnel et à l’esprit critique. Rédigez un texte argumentatif (110 à 140 mots) exposant votre point de vue nuancé, étayé par des arguments précis et des connecteurs logiques.',
					modelAnswer:
						'Ce texte argumentatif, intitulé « Travail honnête ou recherche du gain facile ? » et tiré d’une chronique éducative de 2025, oppose la tentation de la richesse rapide aux vertus du labeur sincère.\nDans un premier temps, l’auteur relève que certains jeunes, trompés par des promesses illusoires en ligne, négligent l’effort sérieux au profit d’un gain immédiat. Toutefois, il réfute cette illusion en montrant que seul le travail honnête, appuyé sur la compétence et la probité, offre une dignité durable et la confiance d’autrui, à l’image de figures persévérantes comme Al-Khwarizmi et Fatima Al-Fihriya. Enfin, il conclut que la famille et l’école doivent encourager le mérite authentique, visant ainsi à convaincre la jeunesse de la valeur de l’effort loyal.',
					rubricSummary: 'Conformité au sujet et fidélité au sens (2 pts) | Cohérence textuelle et articulation logique (1.5 pt) | Correction de la langue (2 pts) | Propreté et mise en page (0.5 pt)',
					easyQ: 'Quel connecteur de conclusion introduit naturellement la dernière idée du compte rendu ?',
					easyCorrect: 'Enfin / En conclusion',
					easyDistractors: [
						{ text: 'Il était une fois', diagnosticFeedback: 'عبارة حكاية خيالية لا تصلح لتقرير موضوعي.' },
						{ text: 'D’abord', diagnosticFeedback: '« D’abord » لبداية العرض لا لختامه.' },
						{ text: 'Bonjour à tous', diagnosticFeedback: 'تحية شفوية لا تُكتب في تقرير موضوعي.' }
					],
					medQ: 'Dans le Sujet 2 sur l’intelligence artificielle à l’école, quel argument défend le mieux un usage honnête et raisonné ?',
					medCorrect: 'L’IA peut expliquer une notion difficile, mais elle ne doit pas rédiger le devoir à la place de l’élève au risque de détruire son esprit critique.',
					medDistractors: [
						{ text: 'Il vaut mieux faire rédiger tous ses examens par un robot sans jamais lire le cours.', diagnosticFeedback: 'يشجع على الغش والكسل الفكري ويعاكس الأمانة العلمية.' },
						{ text: 'L’électricité n’est jamais utile dans un lycée moderne.', diagnosticFeedback: 'حجة غير منطقية وخارجة عن النقاش التربوي.' },
						{ text: 'IA, ordinateur, école, devoir, point final.', diagnosticFeedback: 'كلمات متناثرة وليست حجة مصاغة في جملة تامة.' }
					],
					hardQ: 'Pourquoi faut-il soigner particulièrement les verbes introducteurs (relève, réfute, montre, conclut) dans le Compte rendu d’un débat ?',
					hardCorrect: 'Parce qu’ils rendent visible la progression logique du débat (constat -> réfutation -> démonstration -> conclusion)',
					hardDistractors: [
						{ text: 'Parce qu’ils permettent d’éviter toute ponctuation dans la copie', diagnosticFeedback: 'علامات الترقيم تبقى ضرورية دائما.' },
						{ text: 'Parce qu’ils transforment le texte en poème rimé', diagnosticFeedback: 'لا علاقة لها بالشعر.' },
						{ text: 'Parce qu’ils remplacent l’accroche introductive', diagnosticFeedback: 'المقدمة تبقى فقرة مستقلة وإلزامية.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Bon choix méthodologique : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 6,
				instruction: 'Traitez au choix l’un des deux sujets proposés ci-dessous.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: v.sujetUnTitle,
						sujetUnPrompt: v.sujetUnPrompt,
						sujetUnNotes: v.sujetUnNotes,
						sujetDeuxPrompt: v.sujetDeuxPrompt,
						modelAnswer: v.modelAnswer,
						rubricSummary: v.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'Pour le Sujet 1 (Compte rendu d’un débat), mettez clairement en évidence l’opposition entre thèse adverse et thèse défendue.',
					'Utilisez des verbes argumentatifs précis (expose, réfute, nuance, démontre, conclut) toujours au présent et à la 3e personne.',
					'Pour le Sujet 2 (texte argumentatif libre), intégrez au moins une concession (Certes... mais / Bien que + subjonctif) et deux arguments illustrés.'
				],
				solutionStepsAr: [
					'Introduction : nature (texte argumentatif), titre, source, problématique.',
					'Développement : thèse adverse puis thèse défendue et arguments reformulés (sans copier).',
					'Conclusion : synthèse finale et visée argumentative (sans « je » pour le Sujet 1).'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
