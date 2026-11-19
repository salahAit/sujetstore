import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ============================================================================
// 5 Parameterized Templates — 1AS TCST Trimester 1 (Points split: 7 + 7 + 6 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// Projet 1 : Texte de vulgarisation scientifique
// ============================================================================

// 1. Compréhension 1 — Ressources naturelles et technologies durables en Algérie (7 pts)
const tpl1asTcstT1EnergieEauComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t1_energie_eau_comp',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — نص تبسيط علمي (الطاقة الشمسية، تحلية المياه، والمياه الجوفية)',
	curriculumLessonId: 'fre_lesson_1as_tcst_t1_procedes_explicatifs',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'L’énergie solaire photovoltaïque en Algérie',
				source: 'Revue Algérienne des Sciences Appliquées (texte adapté)',
				paragraphs: [
					'L’énergie solaire photovoltaïque est une source d’électricité renouvelable obtenue grâce au rayonnement du soleil. Ce phénomène repose sur un principe physique appelé l’effet photovoltaïque : lorsque la lumière frappe des cellules en silicium, [[elles]] produisent directement un courant électrique continu.',
					'En Algérie, les régions sahariennes comme Adrar, Tamanrasset et Ghardaïa bénéficient de plus de trois mille heures d’ensoleillement par an. Autrement dit, le pays dispose d’un gisement solaire considérable qui sert à alimenter les habitations, les écoles et les stations de pompage agricole.',
					'Sur le plan écologique, cette énergie propre ne rejette aucun gaz à effet de serre durant son fonctionnement. Il convient toutefois d’entretenir régulièrement les panneaux afin d’éliminer la poussière saharienne et de maintenir [[leur]] rendement optimal.'
				],
				glossary: [
					{ term: 'silicium', meaning: 'élément minéral extrait du sable, utilisé dans les capteurs solaires' },
					{ term: 'rendement', meaning: 'efficacité de production d’énergie d’un appareil' }
				],
				tfItems: [
					{
						q: 'L’effet photovoltaïque transforme la lumière solaire en courant électrique.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le sud algérien reçoit moins de mille heures de soleil par an.',
						a: 'Faux',
						c: 'Les régions sahariennes bénéficient de plus de trois mille heures d’ensoleillement par an.',
						mark: '0.5'
					},
					{
						q: 'Les panneaux solaires nécessitent un nettoyage contre la poussière pour garder leur efficacité.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'À quoi sert l’énergie solaire dans les régions sahariennes selon le paragraphe 2 ?',
				a1: 'Elle sert à alimenter les habitations, les écoles et les stations de pompage agricole.',
				q2: 'Relevez dans le texte un procédé de reformulation et un procédé d’illustration.',
				a2: 'Reformulation : « Autrement dit, le pays dispose d’un gisement solaire considérable ». Illustration : « comme Adrar, Tamanrasset et Ghardaïa ».',
				q3: 'Pourquoi l’auteur emploie-t-il le présent de l’indicatif et évite-t-il le pronom « je » ?',
				a3: 'Il emploie le présent de vérité générale et s’efface pour assurer l’objectivité scientifique de l’explication.',
				ref1Word: 'elles (§1)',
				ref1Ans: 'des cellules en silicium',
				ref2Word: 'leur (§3)',
				ref2Ans: 'des panneaux (les panneaux solaires)',
				viseeCorrect: 'Informer et expliquer le fonctionnement et les atouts de l’énergie solaire en Algérie',
				viseeDistractors: [
					{
						text: 'Raconter une anecdote personnelle vécue dans le désert',
						diagnosticFeedback: 'Le texte ne contient aucun récit personnel ni événement passé.'
					},
					{
						text: 'Critiquer sévèrement l’installation de panneaux solaires en Algérie',
						diagnosticFeedback: 'L’auteur présente les avantages écologiques et un simple conseil technique d’entretien.'
					},
					{
						text: 'Donner une recette de fabrication industrielle détaillée du verre',
						diagnosticFeedback: 'Le texte vulgarise l’énergie photovoltaïque, non la fabrication du verre.'
					}
				],
				themeSummary: 'le fonctionnement et l’intérêt de l’énergie solaire photovoltaïque'
			},
			{
				title: 'Le dessalement de l’eau de mer par osmose inverse',
				source: 'Cahiers Méditerranéens de l’Eau (texte adapté)',
				paragraphs: [
					'Le dessalement est un procédé technique qui consiste à retirer le sel dissous dans l’eau de mer afin de la rendre potable. Face à la baisse des précipitations, plusieurs stations côtières algériennes utilisent aujourd’hui une méthode moderne nommée l’osmose inverse.',
					'Concrètement, l’eau marine est d’abord filtrée pour éliminer le sable et les algues. Ensuite, [[elle]] est poussée à très haute pression à travers des membranes semi-perméables. C’est-à-dire que ces filtres microscopiques retiennent les sels minéraux tout en laissant passer les molécules d’eau pure.',
					'Enfin, l’eau douce obtenue est reminéralisée puis distribuée aux villes côtières telles que Tipaza, Oran et Skikda. Bien que [[cette technologie]] demande beaucoup d’énergie, on l’associe désormais à des sources renouvelables pour garantir la sécurité hydrique.'
				],
				glossary: [
					{ term: 'membrane semi-perméable', meaning: 'paroi très fine qui laisse passer l’eau mais bloque le sel' },
					{ term: 'sécurité hydrique', meaning: 'approvisionnement durable et suffisant en eau potable' }
				],
				tfItems: [
					{
						q: 'Le dessalement permet de transformer l’eau salée en eau potable.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Dans l’osmose inverse, les membranes laissent passer le sel et bloquent l’eau.',
						a: 'Faux',
						c: 'Les membranes retiennent les sels minéraux et laissent passer les molécules d’eau pure.',
						mark: '0.5'
					},
					{
						q: 'Avant la distribution, l’eau dessalée est reminéralisée.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelles sont les deux étapes principales du traitement de l’eau de mer décrites au paragraphe 2 ?',
				a1: 'D’abord un filtrage pour éliminer le sable et les algues, puis le passage à haute pression à travers des membranes semi-perméables.',
				q2: 'Relevez dans le texte une définition (§1) et une dénomination (§1).',
				a2: 'Définition : « Le dessalement est un procédé technique qui consiste à retirer le sel... ». Dénomination : « une méthode moderne nommée l’osmose inverse ».',
				q3: 'Quelle solution scientifique permet de réduire le coût énergétique des stations de dessalement (§3) ?',
				a3: 'On associe cette technologie à des sources d’énergie renouvelables.',
				ref1Word: 'elle (§2)',
				ref1Ans: 'l’eau marine',
				ref2Word: 'cette technologie (§3)',
				ref2Ans: 'le dessalement par osmose inverse',
				viseeCorrect: 'Expliquer de manière objective le principe et les étapes du dessalement par osmose inverse',
				viseeDistractors: [
					{
						text: 'Convaincre les lecteurs d’abandonner la consommation d’eau minérale',
						diagnosticFeedback: 'Le texte explique un procédé scientifique sans polémiquer sur l’eau en bouteille.'
					},
					{
						text: 'Décrire les paysages touristiques des plages algériennes',
						diagnosticFeedback: 'Les villes côtières sont citées uniquement comme exemples de distribution.'
					},
					{
						text: 'Raconter la biographie d’un marin méditerranéen',
						diagnosticFeedback: 'Il s’agit d’un texte de vulgarisation technique, non d’un récit biographique.'
					}
				],
				themeSummary: 'le procédé de dessalement de l’eau de mer par osmose inverse'
			},
			{
				title: 'Les nappes phréatiques du Sahara et le système des foggaras',
				source: 'Encyclopédie de l’Hydrologie Maghrébine (texte adapté)',
				paragraphs: [
					'Une nappe phréatique désigne une réserve naturelle d’eau douce stockée dans les roches poreuses du sous-sol. Sous le Sahara algérien s’étend un immense réservoir souterrain appelé le Système Aquifère du Sahara Septentrional, formé il y a plusieurs millénaires.',
					'Depuis des siècles, les habitants des oasis du Touat et du Gourara captent cette eau grâce aux foggaras. Autrement dit, [[ils]] creusent des galeries souterraines légèrement inclinées qui conduisent l’eau par simple gravité jusqu’aux jardins, sans aucune pompe mécanique.',
					'Ce savoir-faire ingénieux permet d’éviter l’évaporation intense due à la chaleur désertique. Aujourd’hui, les hydrologues étudient [[ces réserves]] avec rigueur car une exploitation raisonnée demeure essentielle pour les préserver durablement.'
				],
				glossary: [
					{ term: 'roches poreuses', meaning: 'roches contenant de minuscules espaces capables de retenir l’eau' },
					{ term: 'gravité', meaning: 'force naturelle qui fait couler l’eau vers le bas' }
				],
				tfItems: [
					{
						q: 'Une nappe phréatique est une réserve d’eau située dans le sous-sol.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les foggaras fonctionnent grâce à de puissantes pompes électriques.',
						a: 'Faux',
						c: 'Elles conduisent l’eau par simple gravité, sans aucune pompe mécanique.',
						mark: '0.5'
					},
					{
						q: 'Les galeries souterraines limitent l’évaporation de l’eau sous la chaleur.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Comment les galeries des foggaras acheminent-elles l’eau jusqu’aux oasis selon le paragraphe 2 ?',
				a1: 'Elles sont légèrement inclinées et conduisent l’eau naturellement par simple gravité.',
				q2: 'Relevez dans le texte une définition (§1) et un procédé de fonction (§3).',
				a2: 'Définition : « Une nappe phréatique désigne une réserve naturelle d’eau douce... ». Fonction : « permet d’éviter l’évaporation intense due à la chaleur désertique ».',
				q3: 'Pourquoi les hydrologues recommandent-ils une exploitation raisonnée des nappes sahariennes ?',
				a3: 'Parce que ces réserves souterraines sont anciennes et doivent être préservées durablement.',
				ref1Word: 'ils (§2)',
				ref1Ans: 'les habitants des oasis du Touat et du Gourara',
				ref2Word: 'ces réserves (§3)',
				ref2Ans: 'les nappes phréatiques du Sahara (le Système Aquifère)',
				viseeCorrect: 'Vulgariser le fonctionnement des nappes phréatiques sahariennes et du système traditionnel des foggaras',
				viseeDistractors: [
					{
						text: 'Raconter une légende imaginaire sur les dunes du désert',
						diagnosticFeedback: 'Le texte repose sur des faits hydrologiques et techniques réels.'
					},
					{
						text: 'Faire la publicité d’une agence de voyages au Sahara',
						diagnosticFeedback: 'Aucune intention publicitaire ou touristique n’apparaît dans le texte.'
					},
					{
						text: 'Interdire l’agriculture dans les oasis du sud algérien',
						diagnosticFeedback: 'L’auteur valorise l’irrigation ingénieuse tout en prônant une gestion raisonnée.'
					}
				],
				themeSummary: 'les nappes phréatiques sahariennes et le génie hydraulique des foggaras'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.viseeCorrect, variant.viseeDistractors, rng);
		const tfNote =
			difficulty === 'hard'
				? 'Répondez par Vrai ou Faux en justifiant les énoncés faux à partir du texte :'
				: 'Répondez par Vrai ou Faux d’après le texte :';

		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{ type: 'text', content: `1) ${tfNote}` },
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes à partir du texte :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) À quoi ou à qui renvoient les mots soulignés dans le texte ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quelle est la visée communicative principale de l’auteur ?',
						options: mcq.options.map((o) => o.text),
						correct: variant.viseeCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans le texte de vulgarisation « ${variant.title} », quelle est la visée communicative de l’auteur ?`,
				questionTextAr: 'اختر الغاية التواصلية الأدق لنص التبسيط العلمي المقترح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Ce texte explicatif informe le lecteur sur ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le texte puis répondez aux questions suivantes :',
				content
			},
			hints: [
				'اقرأ الفقرات الثلاث مع ربط كل سؤال برقم الفقرة المشار إليها (§1, §2, §3).',
				'في سؤال الإحالة الضميرية، تأكد من الجنس والعدد في الجملة التي تسبق الضمير مباشرة.',
				'تذكّر أن غاية نص التبسيط العلمي هي دائما الإعلام والشرح الموضوعي (informer et expliquer).'
			],
			solutionStepsAr: [
				`Vrai/Faux : ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q2-a : ${variant.a1}`,
				`Q2-b : ${variant.a2}`,
				`Q2-c : ${variant.a3}`,
				`Substituts : ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.viseeCorrect
		};
	}
};

// 2. Compréhension 2 — Sciences, médecine et héritage scientifique musulman (7 pts)
const tpl1asTcstT1SciencesMedecineComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t1_sciences_medecine_comp',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — نص علمي حول البصريات، المناعة، والتطبيقات الرقمية الطبية',
	curriculumLessonId: 'fre_lesson_1as_tcst_t1_objectivite_effacement',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Comment fonctionne la vision selon Ibn Al-Haytham ?',
				source: 'Dossier Histoire des Sciences Physiques (texte adapté)',
				paragraphs: [
					'Pendant longtemps, certains penseurs anciens croyaient que l’œil émettait un rayon invisible pour percevoir les objets. Au XIe siècle, le savant musulman Ibn Al-Haytham a démontré par l’expérience que la vision fonctionne de manière exactement inverse.',
					'Dans son Traité d’optique, il explique que la lumière provient d’une source lumineuse, telle que le soleil ou une lampe, se réfléchit sur un objet puis pénètre dans l’œil par la pupille. [[Elle]] traverse ensuite le cristallin qui joue le rôle d’une lentille convergente et forme une image nette sur la rétine.',
					'Pour prouver cette loi physique, [[ce chercheur]] a utilisé un dispositif appelé la chambre noire. Autrement dit, il a fondé la méthode expérimentale moderne fondée sur l’observation mesurée et la vérification rigoureuse.'
				],
				glossary: [
					{ term: 'cristallin', meaning: 'lentille transparente naturelle située à l’intérieur de l’œil' },
					{ term: 'rétine', meaning: 'membrane au fond de l’œil qui reçoit la lumière' }
				],
				tfItems: [
					{
						q: 'Ibn Al-Haytham a prouvé que la lumière entre dans l’œil après s’être réfléchie sur les objets.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le cristallin empêche la lumière d’atteindre la rétine.',
						a: 'Faux',
						c: 'Le cristallin joue le rôle d’une lentille convergente qui forme une image nette sur la rétine.',
						mark: '0.5'
					},
					{
						q: 'La chambre noire a servi à vérifier expérimentalement les lois de la lumière.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle croyance ancienne Ibn Al-Haytham a-t-il réfutée par ses expériences (§1) ?',
				a1: 'Il a réfuté l’idée selon laquelle l’œil émettrait lui-même un rayon invisible vers les objets.',
				q2: 'Quel est le rôle du cristallin dans le mécanisme de la vision (§2) ?',
				a2: 'Il joue le rôle d’une lentille convergente et forme une image nette sur la rétine.',
				q3: 'Relevez dans le texte deux procédés explicatifs différents et nommez-les.',
				a3: 'Illustration : « telle que le soleil ou une lampe » ; Dénomination : « appelé la chambre noire » (ou Reformulation : « Autrement dit... »).',
				ref1Word: 'Elle (§2)',
				ref1Ans: 'la lumière',
				ref2Word: 'ce chercheur (§3)',
				ref2Ans: 'le savant musulman Ibn Al-Haytham',
				viseeCorrect: 'Expliquer le mécanisme scientifique de la vision et l’apport expérimental d’Ibn Al-Haytham',
				viseeDistractors: [
					{
						text: 'Comparer les prix des lunettes optiques modernes',
						diagnosticFeedback: 'Le texte ne parle jamais du commerce des lunettes.'
					},
					{
						text: 'Raconter un voyage maritime au Moyen Âge',
						diagnosticFeedback: 'Le texte explique un phénomène d’optique physique.'
					},
					{
						text: 'Adresser une plainte à un hôpital ophtalmologique',
						diagnosticFeedback: 'Il n’y a ni plainte ni structure de lettre ouverte.'
					}
				],
				themeSummary: 'le mécanisme de la vision et la méthode expérimentale d’Ibn Al-Haytham'
			},
			{
				title: 'Le système immunitaire : une défense naturelle organisée',
				source: 'Manuel de Vulgarisation Biologique (texte adapté)',
				paragraphs: [
					'Le système immunitaire désigne l’ensemble des organes, des cellules et des molécules qui protègent l’organisme humain contre les agents infectieux tels que les bactéries et les virus. Sans [[ce bouclier biologique]], le corps ne pourrait pas résister aux agressions microbiennes quotidiennes.',
					'La défense s’organise en deux lignes complémentaires. D’abord, la peau et les muqueuses forment une barrière physique qui bloque la majorité des microbes. Si un microbe franchit cette barrière, les globules blancs — appelés aussi leucocytes — interviennent rapidement pour [[le]] neutraliser.',
					'Certaines cellules spécialisées conservent en mémoire la trace des microbes déjà combattus. C’est-à-dire que l’organisme réagit beaucoup plus vite lors d’une seconde rencontre, ce qui explique le principe scientifique de la vaccination.'
				],
				glossary: [
					{ term: 'muqueuses', meaning: 'membranes humides tapissant l’intérieur du nez, de la bouche et des bronches' },
					{ term: 'leucocytes', meaning: 'nom scientifique des globules blancs' }
				],
				tfItems: [
					{
						q: 'La peau constitue une première barrière physique contre les microbes.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les globules blancs sont également nommés leucocytes.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le système immunitaire oublie toujours les microbes qu’il a déjà combattus.',
						a: 'Faux',
						c: 'Certaines cellules spécialisées conservent en mémoire la trace des microbes déjà combattus.',
						mark: '0.5'
					}
				],
				q1: 'Quels sont les deux niveaux de défense de l’organisme décrits au paragraphe 2 ?',
				a1: 'La barrière physique (peau et muqueuses) puis l’intervention des globules blancs (leucocytes).',
				q2: 'Comment la mémoire immunitaire explique-t-elle l’efficacité de la vaccination (§3) ?',
				a2: 'Grâce à la mémoire cellulaire, l’organisme reconnaît plus vite un microbe déjà rencontré et le combat plus rapidement.',
				q3: 'Relevez dans le texte un substitut lexical (§1) et un procédé de reformulation (§3).',
				a3: 'Substitut lexical : « ce bouclier biologique » (pour le système immunitaire). Reformulation : « C’est-à-dire que l’organisme réagit beaucoup plus vite... ».',
				ref1Word: 'ce bouclier biologique (§1)',
				ref1Ans: 'le système immunitaire',
				ref2Word: 'le (§2)',
				ref2Ans: 'un microbe',
				viseeCorrect: 'Expliquer clairement le rôle et le fonctionnement du système immunitaire humain',
				viseeDistractors: [
					{
						text: 'Vendre un médicament antibiotique sans ordonnance',
						diagnosticFeedback: 'Le texte est strictement explicatif et ne fait aucune publicité.'
					},
					{
						text: 'Critiquer le travail des médecins généralistes',
						diagnosticFeedback: 'Aucune critique médicale ne figure dans le texte.'
					},
					{
						text: 'Raconter une journée vécue par un patient à l’hôpital',
						diagnosticFeedback: 'Il n’y a ni personnage ni récit narratif.'
					}
				],
				themeSummary: 'le fonctionnement organisé du système immunitaire'
			},
			{
				title: 'L’imagerie médicale numérique au service du diagnostic',
				source: 'Revue Santé et Technologie (texte adapté)',
				paragraphs: [
					'L’imagerie médicale regroupe les techniques scientifiques qui permettent d’observer l’intérieur du corps humain sans pratiquer d’opération chirurgicale. Elle comprend des examens variés, par exemple la radiographie, l’échographie et le scanner.',
					'Chaque appareil repose sur un principe physique précis. L’échographie utilise des ondes sonores à haute fréquence appelées ultrasons : [[elles]] se réfléchissent sur les organes et dessinent une image en temps réel sur un écran. Cette méthode est totalement indolore et sans danger pour le patient.',
					'Aujourd’hui, des logiciels informatiques d’aide au diagnostic analysent ces images en quelques secondes. Autrement dit, [[ces outils numériques]] assistent le médecin pour détecter plus tôt certaines anomalies, mais la décision médicale finale appartient toujours au spécialiste humain.'
				],
				glossary: [
					{ term: 'ultrasons', meaning: 'ondes acoustiques de très haute fréquence, inaudibles pour l’oreille humaine' },
					{ term: 'indolore', meaning: 'qui ne provoque aucune douleur' }
				],
				tfItems: [
					{
						q: 'L’imagerie médicale nécessite toujours une opération chirurgicale.',
						a: 'Faux',
						c: 'Elle permet justement d’observer l’intérieur du corps sans pratiquer d’opération chirurgicale.',
						mark: '0.5'
					},
					{
						q: 'L’échographie fonctionne grâce aux ultrasons et ne provoque aucune douleur.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les logiciels d’analyse remplacent complètement la décision finale du médecin.',
						a: 'Faux',
						c: 'La décision médicale finale appartient toujours au spécialiste humain.',
						mark: '0.5'
					}
				],
				q1: 'Citez trois techniques d’imagerie médicale mentionnées au paragraphe 1.',
				a1: 'La radiographie, l’échographie et le scanner.',
				q2: 'Comment l’échographie produit-elle une image des organes (§2) ?',
				a2: 'Elle utilise des ultrasons qui se réfléchissent sur les organes et forment une image en temps réel sur un écran.',
				q3: 'Quel est le rôle exact des logiciels d’aide au diagnostic selon le paragraphe 3 ?',
				a3: 'Ils assistent le médecin en analysant rapidement les images pour repérer des anomalies, sans le remplacer.',
				ref1Word: 'elles (§2)',
				ref1Ans: 'des ondes sonores à haute fréquence (les ultrasons)',
				ref2Word: 'ces outils numériques (§3)',
				ref2Ans: 'des logiciels informatiques d’aide au diagnostic',
				viseeCorrect: 'Informer sur les principes et l’utilité de l’imagerie médicale moderne',
				viseeDistractors: [
					{
						text: 'Persuader les lycéens d’abandonner les études de médecine',
						diagnosticFeedback: 'Au contraire, le texte souligne le rôle irremplaçable du médecin.'
					},
					{
						text: 'Raconter l’invention imaginaire d’un robot médecin',
						diagnosticFeedback: 'Le texte expose des techniques médicales réelles et actuelles.'
					},
					{
						text: 'Dénoncer l’usage de tous les ordinateurs dans les hôpitaux',
						diagnosticFeedback: 'Le texte présente les logiciels comme une aide utile au diagnostic.'
					}
				],
				themeSummary: 'l’imagerie médicale et l’aide numérique au diagnostic'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.viseeCorrect, variant.viseeDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{
				type: 'text',
				content:
					difficulty === 'hard'
						? '1) Dites si ces affirmations sont Vraies ou Fausses puis justifiez les phrases fausses :'
						: '1) Répondez par Vrai ou Faux selon le texte :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) Précisez à quoi ou à qui renvoient les expressions soulignées :\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Cochez la bonne réponse : dans ce texte, l’auteur cherche principalement à...',
						options: mcq.options.map((o) => o.text),
						correct: variant.viseeCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture de « ${variant.title} », quel est l’objectif principal de l’auteur ?`,
				questionTextAr: 'حدّد الهدف التواصلي الرئيسي للكاتب في النص العلمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Le texte explique de manière neutre et structurée ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'استعن بالمعجم المساعد (Lexique) أسفل النص لفهم المصطلحات العلمية الدقيقة.',
				'لاحظ المؤشرات التفسيرية (tel que, appelé, autrement dit, c’est-à-dire) لاستخراج الأساليب بسهولة.',
				'تحقق دائما من مطابقة الضمير المسطّر مع مرجعه في الجنس والعدد.'
			],
			solutionStepsAr: [
				`Vrai/Faux : ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q2-a : ${variant.a1}`,
				`Q2-b : ${variant.a2}`,
				`Q2-c : ${variant.a3}`,
				`Référents : ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.viseeCorrect
		};
	}
};

// 3. Fonctionnement de la langue 1 — Procédés explicatifs, Voix passive, Tournure impersonnelle & Famille de mots (7 pts)
const tpl1asTcstT1ProcedesPassifLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t1_procedes_passif_lang',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — الأساليب التفسيرية، المبني للمجهول، الصيغة غير الشخصية، وعائلة الكلمة',
	curriculumLessonId: 'fre_lesson_1as_tcst_t1_objectivite_effacement',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wfRows: [
					{
						verbe: { given: true, value: 'filtrer' },
						nom: { value: 'filtration / filtre', mark: '0.5' },
						adjectif: { value: 'filtrant(e) / filtré(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'produire', mark: '0.5' },
						nom: { given: true, value: 'production' },
						adjectif: { value: 'productif / productive', mark: '0.5' }
					}
				],
				passive1Prompt: 'a) Les capteurs photovoltaïques transforment la lumière solaire en courant électrique.',
				passive1Ans: 'La lumière solaire est transformée en courant électrique par les capteurs photovoltaïques.',
				passive2Prompt: 'b) On observe les bactéries à l’aide d’un microscope optique.',
				passive2Ans: 'Les bactéries sont observées à l’aide d’un microscope optique.',
				impersPrompt:
					'Réécrivez ces deux phrases à la tournure impersonnelle (utilisez « Il existe » puis « Il est nécessaire de ») :\na) Plusieurs sources d’énergie propre existent en Algérie.\nb) Protéger les nappes phréatiques est nécessaire.',
				impersAns:
					'a) Il existe plusieurs sources d’énergie propre en Algérie.\nb) Il est nécessaire de protéger les nappes phréatiques.',
				procPrompt:
					'Identifiez le procédé explicatif utilisé dans chaque phrase :\na) « L’atmosphère est l’enveloppe gazeuse qui entoure la Terre. »\nb) « Les énergies vertes, autrement dit les sources non polluantes, se développent. »\nc) « Le thermomètre sert à mesurer la température. »',
				procAns: 'a) La définition   b) La reformulation   c) La fonction',
				mcqQuestion: 'Quelle phrase correspond à la transformation passive correcte de : « On purifie les eaux usées dans cette station. » ?',
				mcqCorrect: 'Les eaux usées sont purifiées dans cette station.',
				mcqDistractors: [
					{
						text: 'Les eaux usées sont purifiées par on dans cette station.',
						diagnosticFeedback: 'On n’emploie jamais « par on » à la voix passive.'
					},
					{
						text: 'Les eaux usées est purifiée dans cette station.',
						diagnosticFeedback: 'Le sujet « Les eaux usées » est féminin pluriel : sont purifiées.'
					},
					{
						text: 'Les eaux usées ont été purifiés dans cette station.',
						diagnosticFeedback: 'Le temps original est le présent (sont) et le participe doit s’accorder au féminin pluriel.'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'absorber' },
						nom: { value: 'absorption', mark: '0.5' },
						adjectif: { value: 'absorbant(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'protéger', mark: '0.5' },
						nom: { given: true, value: 'protection' },
						adjectif: { value: 'protecteur / protectrice', mark: '0.5' }
					}
				],
				passive1Prompt: 'a) Des ingénieurs algériens entretiennent les centrales solaires du Sud.',
				passive1Ans: 'Les centrales solaires du Sud sont entretenues par des ingénieurs algériens.',
				passive2Prompt: 'b) Les membranes semi-perméables retiennent le sel marin.',
				passive2Ans: 'Le sel marin est retenu par les membranes semi-perméables.',
				impersPrompt:
					'Réécrivez ces deux phrases à la tournure impersonnelle (utilisez « Il convient de » puis « Il se produit ») :\na) Économiser l’eau douce convient à tous.\nb) Une évaporation rapide se produit sous la chaleur.',
				impersAns:
					'a) Il convient d’économiser l’eau douce.\nb) Il se produit une évaporation rapide sous la chaleur.',
				procPrompt:
					'Identifiez le procédé explicatif employé dans chaque phrase :\na) « Ce phénomène physique s’appelle la condensation. »\nb) « Des métaux tels que le fer et le cuivre conduisent bien la chaleur. »\nc) « Les globules rouges permettent de transporter l’oxygène. »',
				procAns: 'a) La dénomination   b) L’illustration (exemple)   c) La fonction',
				mcqQuestion: 'Dans la phrase : « L’osmose inverse, c’est-à-dire la filtration sous pression, rend l’eau potable », quel procédé explicatif est employé ?',
				mcqCorrect: 'La reformulation',
				mcqDistractors: [
					{
						text: 'La dénomination',
						diagnosticFeedback: 'La dénomination utilise des verbes comme « s’appelle » ou « est nommé ».'
					},
					{
						text: 'La fonction',
						diagnosticFeedback: 'La fonction précise le rôle avec « sert à » ou « permet de ».'
					},
					{
						text: 'L’illustration',
						diagnosticFeedback: 'L’illustration introduit un exemple concret (par exemple, tel que).'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'mesurer' },
						nom: { value: 'mesure', mark: '0.5' },
						adjectif: { value: 'mesurable', mark: '0.5' }
					},
					{
						verbe: { value: 'observer', mark: '0.5' },
						nom: { given: true, value: 'observation' },
						adjectif: { value: 'observable / observateur', mark: '0.5' }
					}
				],
				passive1Prompt: 'a) Le savant Ibn Al-Haytham a démontré les lois de la réflexion lumineuse.',
				passive1Ans: 'Les lois de la réflexion lumineuse ont été démontrées par le savant Ibn Al-Haytham.',
				passive2Prompt: 'b) On utilise les ultrasons en échographie médicale.',
				passive2Ans: 'Les ultrasons sont utilisés en échographie médicale.',
				impersPrompt:
					'Réécrivez ces deux phrases à la tournure impersonnelle (utilisez « Il est prouvé que » puis « Il faut ») :\na) La vaccination renforce l’immunité : cela est prouvé.\nb) Vérifier les mesures au laboratoire est indispensable.',
				impersAns:
					'a) Il est prouvé que la vaccination renforce l’immunité.\nb) Il faut vérifier les mesures au laboratoire.',
				procPrompt:
					'Identifiez le procédé explicatif employé dans chaque phrase :\na) « Un vaccin consiste à stimuler la mémoire immunitaire sans provoquer la maladie. »\nb) « Les globules blancs sont appelés leucocytes. »\nc) « Plusieurs examens existent, par exemple le scanner et la radiographie. »',
				procAns: 'a) La définition   b) La dénomination   c) L’illustration (exemple)',
				mcqQuestion: 'Quelle phrase emploie une tournure impersonnelle marquant l’objectivité scientifique ?',
				mcqCorrect: 'Il existe trois états principaux de la matière : solide, liquide et gazeux.',
				mcqDistractors: [
					{
						text: 'Il analyse attentivement un échantillon d’eau au laboratoire.',
						diagnosticFeedback: 'Ici « Il » est un pronom personnel qui remplace un chercheur.'
					},
					{
						text: 'Je trouve que cette expérience de chimie est extraordinaire.',
						diagnosticFeedback: 'Présence explicite de « Je » et d’un adjectif subjectif.'
					},
					{
						text: 'Il a présenté son exposé devant la classe de 1AS.',
						diagnosticFeedback: '« Il » désigne un élève précis, ce n’est pas un « il » impersonnel.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complétez le tableau de la famille de mots suivant (2.0 pts) :' },
			buildFrenchWordFamilyTableBlock(variant.wfRows),
			{
				type: 'text',
				content: `2) Transformez les phrases suivantes à la voix passive en respectant le temps et les accords (2.0 pts) :\n${variant.passive1Prompt}\n${variant.passive2Prompt}`,
				answer: `a) ${variant.passive1Ans}\nb) ${variant.passive2Ans}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) ${variant.impersPrompt} (1.5 pts)`,
				answer: variant.impersAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) ${variant.procPrompt} (1.5 pts)`,
				answer: variant.procAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة حول القواعد والموضوعية في النص العلمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'L’objectivité scientifique repose sur la voix passive (sans « par on »), la tournure impersonnelle et des procédés explicatifs précis.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Effectuez les exercices de lexique, de grammaire et de discours suivants :',
				content
			},
			hints: [
				'في المبني للمجهول، يأخذ المساعد être نفس زمن الفعل الأصلي ويُطابق اسم المفعول مع الفاعل الجديد.',
				'عندما يكون الفاعل « on » نحذفه تماما في المبني للمجهول ولا نكتب « par on ».',
				'ميّز بين التعريف (est/consiste à)، التسمية (s’appelle)، إعادة الصياغة (c’est-à-dire/autrement dit)، التمثيل (tel que/par exemple)، والوظيفة (sert à/permet de).'
			],
			solutionStepsAr: [
				`Passif (a) : ${variant.passive1Ans}`,
				`Passif (b) : ${variant.passive2Ans}`,
				`Impersonnel : ${variant.impersAns}`,
				`Procédés : ${variant.procAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Substitution, Progression thématique, Présent atemporel & Champ lexical (7 pts)
const tpl1asTcstT1SubstitutionPresentLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t1_substitution_present_lang',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة — التعويض، التدرج الموضوعاتي، المضارع العام، والحقل المعجمي العلمي',
	curriculumLessonId: 'fre_lesson_1as_tcst_t1_present_atemporel_lexique',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['cellule', 'panneau', 'silicium', 'globule', 'vaccin', 'rayonnement'],
				classifyCols: [
					{ header: 'Champ lexical de l’énergie solaire', items: ['panneau', 'silicium', 'rayonnement'], mark: '1.0' },
					{ header: 'Champ lexical de la biologie', items: ['cellule', 'globule', 'vaccin'], mark: '1.0' }
				],
				subPrompt:
					'Évitez les répétitions en remplaçant les mots entre parenthèses par un substitut grammatical ou lexical adapté :\na) Les chercheurs étudient la couche d’ozone ; (les chercheurs) protègent (la couche d’ozone).\nb) L’eau potable devient rare ; il faut préserver (l’eau potable).',
				subAns:
					'a) Les chercheurs étudient la couche d’ozone ; ils la protègent.\nb) L’eau potable devient rare ; il faut préserver cette ressource vitale (ou la préserver).',
				conjPrompt:
					'Mettez les verbes entre parenthèses au présent de vérité générale :\na) Les végétaux verts (absorber) le dioxyde de carbone et (produire) de l’oxygène.\nb) L’eau pure (bouillir) à 100 degrés et les sels minéraux (se dissoudre) dans ce liquide.',
				conjAns: 'a) absorbent / produisent   b) bout / se dissolvent',
				progPrompt:
					'Indiquez le type de progression thématique (constante, linéaire ou à thème éclaté) :\na) « Le Soleil chauffe l’océan. Cette chaleur provoque l’évaporation. L’évaporation forme les nuages. »\nb) « L’air se compose de plusieurs gaz. L’azote représente 78 pour cent. L’oxygène représente 21 pour cent. »',
				progAns: 'a) Progression linéaire   b) Progression à thème éclaté',
				mcqQuestion: 'Choisissez la conjugaison correcte au présent de vérité générale : « Les océans .......... d’immenses quantités de chaleur et .......... le climat. » (contenir / réguler)',
				mcqCorrect: 'contiennent / régulent',
				mcqDistractors: [
					{
						text: 'contient / régule',
						diagnosticFeedback: 'Le sujet « Les océans » est au pluriel.'
					},
					{
						text: 'contenent / régulent',
						diagnosticFeedback: 'Le verbe « contenir » prend « i » et double le « n » : contiennent.'
					},
					{
						text: 'contenaient / régulaient',
						diagnosticFeedback: 'Il s’agit de l’imparfait, non du présent de vérité générale.'
					}
				]
			},
			{
				classifyBank: ['cristallin', 'membrane', 'rétine', 'dessalement', 'ultrason', 'salinité'],
				classifyCols: [
					{ header: 'Champ lexical de la médecine / optique', items: ['cristallin', 'rétine', 'ultrason'], mark: '1.0' },
					{ header: 'Champ lexical de l’hydrologie', items: ['membrane', 'dessalement', 'salinité'], mark: '1.0' }
				],
				subPrompt:
					'Évitez les répétitions à l’aide d’un pronom convenable (y, en, leur) :\na) Les étudiants visitent le laboratoire de physique et ils travaillent (dans le laboratoire).\nb) Les vaccins protègent les nourrissons et (aux nourrissons) assurent une défense durable.',
				subAns:
					'a) Les étudiants visitent le laboratoire de physique et ils y travaillent.\nb) Les vaccins protègent les nourrissons et leur assurent une défense durable.',
				conjPrompt:
					'Conjuguez les verbes entre parenthèses au présent atemporel :\na) Les globules blancs (réagir) rapidement et (défendre) l’organisme.\nb) La lumière (parcourir) de grandes distances et (permettre) la vision.',
				conjAns: 'a) réagissent / défendent   b) parcourt / permet',
				progPrompt:
					'Identifiez le type de progression thématique de chaque extrait :\na) « Le fer est un métal conducteur. Il s’oxyde au contact de l’air humide. Ce matériau sert à fabriquer l’acier. »\nb) « Le cœur possède deux parties. Le cœur droit envoie le sang aux poumons. Le cœur gauche le propulse vers tout le corps. »',
				progAns: 'a) Progression à thème constant   b) Progression à thème éclaté',
				mcqQuestion: 'Quel type de progression thématique caractérise : « La lumière frappe les feuilles. Les feuilles produisent du glucose. Ce sucre nourrit toute la plante. » ?',
				mcqCorrect: 'La progression linéaire',
				mcqDistractors: [
					{
						text: 'La progression à thème constant',
						diagnosticFeedback: 'Le thème change à chaque phrase : lumière, puis feuilles, puis ce sucre.'
					},
					{
						text: 'La progression à thème éclaté',
						diagnosticFeedback: 'Il n’y a pas de découpage d’un thème global en sous-thèmes parallèles.'
					},
					{
						text: 'La progression chronologique narrative',
						diagnosticFeedback: 'Ce n’est pas une des trois progressions thématiques du programme.'
					}
				]
			},
			{
				classifyBank: ['nappe', 'aquifère', 'foggara', 'microbe', 'anticorps', 'immunité'],
				classifyCols: [
					{ header: 'Champ lexical des eaux souterraines', items: ['nappe', 'aquifère', 'foggara'], mark: '1.0' },
					{ header: 'Champ lexical de la défense immunitaire', items: ['microbe', 'anticorps', 'immunité'], mark: '1.0' }
				],
				subPrompt:
					'Remplacez les groupes entre parenthèses par le substitut demandé :\na) Ibn Al-Haytham a écrit un livre célèbre ; (substitut lexical) a fondé l’optique moderne.\nb) Les plantes ont besoin de lumière ; elles ne peuvent pas vivre (sans lumière : employez le pronom en).',
				subAns:
					'a) Ibn Al-Haytham a écrit un livre célèbre ; ce grand savant a fondé l’optique moderne.\nb) Les plantes ont besoin de lumière ; elles ne peuvent pas s’en passer.',
				conjPrompt:
					'Mettez les verbes entre parenthèses au présent de vérité générale :\na) Les centrales hybrides (fournir) une énergie stable et (réduire) la pollution.\nb) La gravité (maintenir) les planètes sur leur orbite et (attirer) les corps vers le sol.',
				conjAns: 'a) fournissent / réduisent   b) maintient / attire',
				progPrompt:
					'Identifiez la valeur du présent dans chaque phrase (vérité générale ou énonciation actuelle) :\na) « Le mercure reste liquide à température ambiante. »\nb) « En ce moment, notre classe réalise une expérience sur la densité. »',
				progAns: 'a) Présent de vérité générale (atemporel)   b) Présent d’énonciation (actuel)',
				mcqQuestion: 'Choisissez la conjugaison correcte au présent : « Ces membranes microscopiques .......... le sel et .......... passer l’eau pure. » (retenir / laisser)',
				mcqCorrect: 'retiennent / laissent',
				mcqDistractors: [
					{
						text: 'retient / laisse',
						diagnosticFeedback: 'Le sujet « Ces membranes » est pluriel.'
					},
					{
						text: 'retenent / laissent',
						diagnosticFeedback: 'Le verbe « retenir » se conjugue comme « venir » : retiennent.'
					},
					{
						text: 'retiennent / laissaient',
						diagnosticFeedback: 'Gardez le même temps (présent atemporel) pour les deux verbes.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les termes scientifiques suivants dans le tableau ci-dessous (2.0 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{
				type: 'text',
				content: `2) ${variant.subPrompt} (1.5 pts)`,
				answer: variant.subAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `3) ${variant.conjPrompt} (2.0 pts)`,
				answer: variant.conjAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `4) ${variant.progPrompt} (1.5 pts)`,
				answer: variant.progAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة حول المضارع العلمي والتدرج الموضوعاتي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Le présent atemporel exprime les lois scientifiques durables ; la progression et les substituts assurent la cohérence du texte.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Répondez avec précision aux activités de vocabulaire, de conjugaison et de cohérence :',
				content
			},
			hints: [
				'انتبه لتصريف أفعال المجموعة الثانية (-issent) والمجموعة الثالثة (contiennent, retiennent, produisent, fournissent).',
				'في التدرج الموضوعاتي: إذا بقي الموضوع نفسه فهو constant، وإذا صار الجديد موضوعا للثانية فهو linéaire، وإذا تفرّع الكل إلى أجزاء فهو éclaté.',
				'تذكّر أن الضمير y يعوّض المكان، وleur يعوّض الأشخاص المسبوقين بـ à.'
			],
			solutionStepsAr: [
				`Champ lexical : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Substitution : ${variant.subAns}`,
				`Conjugaison : ${variant.conjAns}`,
				`Progression / Valeur : ${variant.progAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Compte rendu objectif / Texte explicatif scientifique (6 pts)
const tpl1asTcstT1CompteRenduWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t1_compte_rendu_we',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — التقرير الموضوعي لنص تبسيط علمي أو تحرير نص تفسيري علمي',
	curriculumLessonId: 'fre_lesson_1as_tcst_t1_compte_rendu_objectif',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'À l’occasion de la journée scientifique de votre lycée, faites le compte rendu objectif (environ 10 lignes) d’un texte de vulgarisation scientifique portant sur l’énergie solaire photovoltaïque en Algérie (source : Revue Algérienne des Sciences Appliquées).',
				sujetUnNotes: [
					'Rédigez une accroche complète : type du texte, titre, source, thème et visée explicative.',
					'Reformulez fidèlement les idées essentielles (principe photovoltaïque, atout du Sahara, avantage écologique et entretien).',
					'Employez la troisième personne (L’auteur présente, explique, souligne...) et le présent de l’indicatif.',
					'Respectez une objectivité totale : aucune opinion personnelle ni recopiage intégral.'
				],
				sujetDeuxPrompt:
					'Rédigez un court texte de vulgarisation scientifique (10 à 12 lignes) pour expliquer à vos camarades le cycle naturel de l’eau. Utilisez le présent atemporel, la voix passive et au moins deux procédés explicatifs (définition, reformulation ou illustration).',
				modelAnswer:
					'Ce texte explicatif, intitulé « L’énergie solaire photovoltaïque en Algérie » et extrait de la Revue Algérienne des Sciences Appliquées, aborde le thème de la production d’électricité solaire dans notre pays. L’auteur vise à informer le lecteur et à expliquer le fonctionnement ainsi que les bénéfices de cette technologie propre.\nD’abord, il définit l’énergie photovoltaïque comme une ressource renouvelable produite grâce à l’action de la lumière sur des cellules en silicium. Ensuite, il souligne l’importance du gisement solaire saharien, qui permet d’alimenter divers secteurs tels que l’éducation et l’agriculture. Enfin, il précise que cette énergie respecte l’environnement tout en rappelant la nécessité d’un entretien régulier des panneaux pour préserver leur efficacité.',
				rubricSummary:
					'Accroche complète et respect du plan (1.5 pts), Fidélité aux idées et reformulation personnelle sans avis subjectif (2.0 pts), Cohérence et connecteurs (1.0 pt), Correction linguistique et orthographe (1.5 pts).',
				mcqQuestion: 'Quelle phrase est parfaitement adaptée à l’accroche d’un compte rendu objectif ?',
				mcqCorrect:
					'Ce texte de vulgarisation scientifique, extrait de la Revue des Sciences Appliquées, explique le fonctionnement de l’énergie solaire.',
				mcqDistractors: [
					{
						text: 'Je vais vous résumer un texte magnifique que j’ai beaucoup aimé sur le soleil.',
						diagnosticFeedback: 'Un compte rendu objectif bannit le « je » et tout jugement personnel.'
					},
					{
						text: 'Monsieur le Proviseur, nous vous écrivons au sujet des panneaux solaires.',
						diagnosticFeedback: 'Cette formule appartient à la lettre ouverte, pas au compte rendu.'
					},
					{
						text: 'Il était une fois un ingénieur qui construisit une centrale au Sahara.',
						diagnosticFeedback: 'Cette ouverture relève du conte narratif.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Rédigez le compte rendu objectif (environ 10 lignes) d’un article explicatif intitulé « Le dessalement de l’eau de mer par osmose inverse » (extrait des Cahiers Méditerranéens de l’Eau), destiné au journal mural de votre club scientifique.',
				sujetUnNotes: [
					'Présentez le document dans une accroche claire (nature, titre, source, thème, visée).',
					'Condensez les idées clés : définition du dessalement, étapes de filtration et membranes, distribution et énergies renouvelables.',
					'Utilisez des verbes introducteurs neutres au présent (définit, décrit, explique, conclut).',
					'Évitez les exemples secondaires détaillés et toute marque de subjectivité.'
				],
				sujetDeuxPrompt:
					'Expliquez dans un texte scientifique objectif (10 à 12 lignes) le rôle de la photosynthèse chez les plantes vertes. Veillez à l’effacement de l’énonciateur, au présent de vérité générale et à l’emploi de procédés explicatifs variés.',
				modelAnswer:
					'Ce texte de vulgarisation scientifique, intitulé « Le dessalement de l’eau de mer par osmose inverse » et tiré des Cahiers Méditerranéens de l’Eau, traite des techniques permettant de transformer l’eau marine en eau potable. L’auteur vise à informer le lecteur sur ce procédé essentiel face à la rareté des pluies.\nDans un premier temps, il définit le dessalement et présente la méthode de l’osmose inverse adoptée par les stations côtières algériennes. Ensuite, il décrit les étapes du traitement : préfiltrage des impuretés, passage sous haute pression à travers des membranes filtrantes, puis reminéralisation avant la distribution. Enfin, il indique que l’association aux énergies renouvelables contribue à rendre cette solution plus durable.',
				rubricSummary:
					'Présentation complète du texte (1.5 pts), Synthèse fidèle et reformulée (2.0 pts), Progression cohérente et connecteurs (1.0 pt), Maîtrise de la langue et de l’orthographe (1.5 pts).',
				mcqQuestion: 'Quel pronom et quel temps doit-on employer pour rédiger un compte rendu objectif ?',
				mcqCorrect: 'La troisième personne (l’auteur, il) et le présent de l’indicatif',
				mcqDistractors: [
					{
						text: 'La première personne (je) et l’imparfait de narration',
						diagnosticFeedback: 'Le « je » introduit la subjectivité, interdite dans le compte rendu objectif.'
					},
					{
						text: 'La deuxième personne (tu) et l’impératif présent',
						diagnosticFeedback: 'Le compte rendu ne donne pas d’ordres au lecteur.'
					},
					{
						text: 'La première personne du pluriel (nous) et le futur antérieur',
						diagnosticFeedback: 'On reste neutre à la 3e personne et au présent.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Faites le compte rendu objectif (environ 10 lignes) d’un texte de vulgarisation intitulé « Le système immunitaire : une défense naturelle organisée » (extrait d’un Manuel de Vulgarisation Biologique) pour le panneau d’affichage de la salle de sciences.',
				sujetUnNotes: [
					'Introduisez le texte par une accroche rigoureuse (type, titre, source, thème et visée informative).',
					'Résumez les trois axes principaux : définition du système immunitaire, double barrière de protection, mémoire cellulaire et vaccination.',
					'Reformulez les phrases avec votre propre vocabulaire scientifique neutre.',
					'N’ajoutez aucune critique ni appréciation personnelle.'
				],
				sujetDeuxPrompt:
					'Rédigez un texte explicatif objectif (10 à 12 lignes) présentant l’importance de l’eau potable pour le fonctionnement du corps humain. Employez une définition, une fonction, une tournure impersonnelle et le présent atemporel.',
				modelAnswer:
					'Ce texte explicatif, intitulé « Le système immunitaire : une défense naturelle organisée » et issu d’un Manuel de Vulgarisation Biologique, présente les mécanismes naturels qui protègent l’organisme humain contre les infections. Son objectif est d’informer le lecteur et d’expliquer le fonctionnement de cette protection.\nTout d’abord, l’auteur définit le système immunitaire comme un ensemble d’organes et de cellules luttant contre les microbes. Ensuite, il décrit les deux niveaux de défense : la barrière physique assurée par la peau et les muqueuses, suivie de l’action rapide des globules blancs. Enfin, il explique que la mémoire immunitaire permet une réaction plus efficace lors d’une nouvelle exposition, principe sur lequel repose la vaccination.',
				rubricSummary:
					'Respect du format du compte rendu (1.5 pts), Exactitude et reformulation des idées (2.0 pts), Articulation logique (1.0 pt), Langue, accords et ponctuation (1.5 pts).',
				mcqQuestion: 'Quelle règle essentielle faut-il absolument respecter dans un compte rendu objectif ?',
				mcqCorrect: 'Reformuler fidèlement les idées essentielles du texte sans donner son avis personnel',
				mcqDistractors: [
					{
						text: 'Recopier mot pour mot les phrases les plus longues du texte',
						diagnosticFeedback: 'Le recopiage littéral est sanctionné dans l’évaluation.'
					},
					{
						text: 'Ajouter en conclusion un paragraphe critique commençant par « À mon avis »',
						diagnosticFeedback: 'La partie critique appartient au compte rendu critique, jamais au compte rendu objectif.'
					},
					{
						text: 'Inventer de nouveaux exemples qui ne figurent pas dans le texte source',
						diagnosticFeedback: 'On doit rester strictement fidèle aux informations du texte source.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
				sujetUnPrompt: variant.sujetUnPrompt,
				sujetUnNotes: variant.sujetUnNotes,
				sujetDeuxPrompt: variant.sujetDeuxPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '6'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة المنهجية السليمة لتحرير التقرير الموضوعي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Le compte rendu objectif comporte une accroche complète et une reformulation fidèle au présent, à la 3e personne et sans jugement personnel.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 6,
				instruction: 'Traitez l’un des deux sujets suivants avec soin et clarté :',
				content
			},
			hints: [
				'ابدأ بمقدمة تعريفية واضحة (Accroche) تتضمن: النوع، العنوان، المصدر، الموضوع، والغاية.',
				'استعمل أفعال التقديم في المضارع: D’abord, l’auteur définit... Ensuite, il explique... Enfin, il conclut...',
				'ابتعد تماما عن « Je / À mon avis » وتجنب نسخ جمل النص حرفيا.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T1: FrenchParameterizedTemplate[] = [
	tpl1asTcstT1EnergieEauComp,
	tpl1asTcstT1SciencesMedecineComp,
	tpl1asTcstT1ProcedesPassifLang,
	tpl1asTcstT1SubstitutionPresentLang,
	tpl1asTcstT1CompteRenduWe
];
