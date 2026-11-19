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
// 5 Parameterized Templates — 1AS TCST Trimester 3 (Points split: 7 + 7 + 6 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (7 pts) + 1 written_expression (6 pts)
// Projet 3 : Le fait divers et le récit réaliste à portée morale
// ============================================================================

// 1. Compréhension 1 — Le fait divers algérien (7 pts)
const tpl1asTcstT3FaitDiversComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t3_fait_divers_comp',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — الخبر المتنوع الجزائري (إنقاذ، أمانة، وتضامن بيئي)',
	curriculumLessonId: 'fre_lesson_1as_tcst_t3_voix_passive_nominalisation',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Sauvetage rapide de deux randonneurs égarés dans les monts de Tikjda',
				source: 'Quotidien National d’Information, 18 mars 2026 (texte adapté)',
				paragraphs: [
					'Deux jeunes randonneurs qui s’étaient égarés samedi après-midi dans un brouillard épais près de Tikjda (Bouira) ont été retrouvés sains et saufs hier à l’aube par les unités spécialisées de la Protection civile.',
					'Vers quinze heures, les conditions météorologiques se sont brusquement dégradées sur les hauteurs du Djurdjura. Ne parvenant plus à distinguer le sentier balisé, [[les deux marcheurs]] ont eu le réflexe prudent de rester abrités près d’un rocher et d’alerter les secours avant que la charge de leur téléphone ne s’épuise.',
					'Aussitôt, une équipe de secouristes accompagnée de guides locaux a lancé les recherches malgré le froid vif. Après cinq heures d’efforts constants, les randonneurs ont été localisés, réchauffés puis conduits au poste médical. [[Ce dénouement heureux]] rappelle l’importance de consulter la météo avant toute sortie en montagne.'
				],
				glossary: [
					{ term: 'sentier balisé', meaning: 'chemin de randonnée marqué par des repères visibles' },
					{ term: 'dénouement', meaning: 'issue finale d’un événement ou d’une situation' }
				],
				tfItems: [
					{
						q: 'Les deux randonneurs se sont égarés à cause d’un brouillard épais en montagne.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les marcheurs ont continué à courir au hasard dans la nuit sans appeler les secours.',
						a: 'Faux',
						c: 'Ils ont eu le réflexe prudent de rester abrités et d’alerter les secours.',
						mark: '0.5'
					},
					{
						q: 'Des guides locaux ont participé aux recherches aux côtés de la Protection civile.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Où et quand ce fait divers s’est-il déroulé (§1) ?',
				a1: 'Près de Tikjda (wilaya de Bouira), entre samedi après-midi et dimanche à l’aube.',
				q2: 'Quel bon comportement les randonneurs ont-ils adopté face au brouillard (§2) ?',
				a2: 'Ils sont restés abrités près d’un rocher et ont alerté les secours avant l’épuisement de la charge de leur téléphone.',
				q3: 'Dans quelle catégorie classe-t-on ce fait divers (méfait, catastrophe naturelle, sauvetage / accident) ? Relevez une phrase à la voix passive.',
				a3: 'Catégorie : sauvetage / incident de montagne. Voix passive : « les randonneurs ont été localisés » (ou « ont été retrouvés sains et saufs par les unités... »).',
				ref1Word: 'les deux marcheurs (§2)',
				ref1Ans: 'les deux jeunes randonneurs égarés',
				ref2Word: 'Ce dénouement heureux (§3)',
				ref2Ans: 'le fait que les randonneurs aient été retrouvés sains et saufs',
				viseeCorrect: 'Informer les lecteurs sur un sauvetage réussi en montagne et rappeler une règle de prudence',
				viseeDistractors: [
					{
						text: 'Interdire définitivement toutes les randonnées en Algérie',
						diagnosticFeedback: 'L’article recommande simplement de vérifier la météo avant de partir.'
					},
					{
						text: 'Expliquer la formation géologique des montagnes du Djurdjura',
						diagnosticFeedback: 'Il s’agit d’un fait divers journalistique, non d’un cours de géologie.'
					},
					{
						text: 'Raconter une légende ancienne inventée de toutes pièces',
						diagnosticFeedback: 'Le texte ancre l’événement dans un lieu et une date précis.'
					}
				],
				themeSummary: 'le sauvetage réussi de deux randonneurs dans les monts de Tikjda'
			},
			{
				title: 'Geste d’honnêteté exemplaire d’un lycéen de Sétif',
				source: 'Presse Régionale de l’Est, 04 avril 2026 (texte adapté)',
				paragraphs: [
					'Mardi matin, dans le centre-ville de Sétif, une sacoche contenant une importante somme d’argent et des documents médicaux a été restituée intacte à son propriétaire grâce à l’intégrité d’un élève de première année secondaire.',
					'En attendant le bus scolaire devant la station principale, Bilal, âgé de seize ans, a aperçu le sac oublié sur un banc public. Sans la moindre hésitation, [[le jeune homme]] s’est rendu au poste de police voisin afin que les agents puissent identifier rapidement le propriétaire grâce aux pièces d’identité.',
					'Deux heures plus tard, un père de famille très inquiet a récupéré l’argent destiné aux soins de sa mère. Profondément ému, [[il]] a remercié chaleureusement le lycéen devant les policiers qui ont salué son sens moral et son éducation exemplaire.'
				],
				glossary: [
					{ term: 'intégrité', meaning: 'qualité d’une personne parfaitement honnête et droite' },
					{ term: 'restituer', meaning: 'rendre un bien à son légitime propriétaire' }
				],
				tfItems: [
					{
						q: 'La sacoche retrouvée contenait uniquement des cahiers scolaires.',
						a: 'Faux',
						c: 'Elle contenait une importante somme d’argent et des documents médicaux.',
						mark: '0.5'
					},
					{
						q: 'Bilal a immédiatement déposé la sacoche au poste de police voisin.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le propriétaire avait besoin de cette somme pour les soins de sa mère.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Qui est l’auteur de ce geste exemplaire et où a-t-il trouvé la sacoche (§2) ?',
				a1: 'C’est Bilal, un lycéen de 1AS âgé de seize ans ; il l’a trouvée sur un banc public devant la station principale de Sétif.',
				q2: 'Comment les agents de police ont-ils pu contacter rapidement le propriétaire (§2) ?',
				a2: 'Grâce aux pièces d’identité qui se trouvaient dans la sacoche.',
				q3: 'Pourquoi le titre de cet article est-il une phrase nominale ? Quel temps domine dans le récit des faits ?',
				a3: 'Le titre nominal résume le fait avec concision et attire le lecteur. Le temps dominant pour les événements accomplis est le passé composé.',
				ref1Word: 'le jeune homme (§2)',
				ref1Ans: 'Bilal (le lycéen de 1AS)',
				ref2Word: 'il (§3)',
				ref2Ans: 'le père de famille (le propriétaire de la sacoche)',
				viseeCorrect: 'Relater un acte de civisme réel et mettre en valeur l’honnêteté d’un jeune lycéen',
				viseeDistractors: [
					{
						text: 'Dénoncer un vol organisé dans une gare routière',
						diagnosticFeedback: 'Au contraire, le texte relate un geste exemplaire d’honnêteté.'
					},
					{
						text: 'Expliquer le fonctionnement du réseau de bus urbains',
						diagnosticFeedback: 'La station de bus n’est que le cadre spatial de l’événement.'
					},
					{
						text: 'Demander la construction d’un nouvel hôpital à Sétif',
						diagnosticFeedback: 'Il ne s’agit pas d’une lettre ouverte revendicative.'
					}
				],
				themeSummary: 'l’acte d’honnêteté remarquable d’un lycéen algérien'
			},
			{
				title: 'Reboisement massif réussi par les volontaires dans les Aurès',
				source: 'L’Écho de Batna, 25 mars 2026 (texte adapté)',
				paragraphs: [
					'Plus de trois mille jeunes cèdres et pins d’Alep ont été plantés vendredi dernier sur les versants de la forêt de Chélia (Batna) lors d’une vaste opération citoyenne réunissant lycéens, scouts et agents forestiers.',
					'Dès sept heures du matin, les participants se sont répartis en petits groupes encadrés par des techniciens des forêts qui leur avaient préparé les plants la veille. Malgré un vent frais, [[les bénévoles]] ont creusé les fosses, mis les arbustes en terre et installé des protections naturelles autour de chaque jeune tige.',
					'En fin d’après-midi, le responsable local des forêts a félicité l’ensemble des équipes pour leur discipline. Grâce à [[cette mobilisation solidaire]], plusieurs hectares fragilisés par les incendies des années précédentes retrouveront progressivement leur couvert végétal.'
				],
				glossary: [
					{ term: 'versants', meaning: 'pentes inclinées d’une montagne' },
					{ term: 'couvert végétal', meaning: 'ensemble des arbres et plantes recouvrant un sol' }
				],
				tfItems: [
					{
						q: 'L’opération de reboisement s’est déroulée dans la forêt de Chélia à Batna.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les volontaires ont travaillé sans aucun encadrement technique.',
						a: 'Faux',
						c: 'Ils étaient encadrés par des techniciens des forêts qui avaient préparé les plants.',
						mark: '0.5'
					},
					{
						q: 'Cette action vise à restaurer des zones touchées auparavant par des incendies.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels trois groupes de participants ont pris part à cette campagne (§1) ?',
				a1: 'Des lycéens, des scouts et des agents forestiers.',
				q2: 'Quelles actions précises les volontaires ont-ils réalisées sur le terrain (§2) ?',
				a2: 'Ils ont creusé les fosses, planté les arbustes et installé des protections naturelles autour des jeunes tiges.',
				q3: 'Relevez dans le texte un verbe au plus-que-parfait et expliquez sa valeur temporelle.',
				a3: '« avaient préparé » (§2) : il exprime l’antériorité dans le passé (action réalisée la veille, avant la plantation).',
				ref1Word: 'les bénévoles (§2)',
				ref1Ans: 'les participants (lycéens, scouts et citoyens volontaires)',
				ref2Word: 'cette mobilisation solidaire (§3)',
				ref2Ans: 'la vaste opération citoyenne de reboisement',
				viseeCorrect: 'Informer sur une campagne de reboisement réussie et valoriser l’entraide citoyenne',
				viseeDistractors: [
					{
						text: 'Raconter un incendie catastrophique survenu la semaine dernière',
						diagnosticFeedback: 'L’événement rapporté est un reboisement réussi, non un incendie récent.'
					},
					{
						text: 'Présenter les différentes espèces d’oiseaux du Sahara',
						diagnosticFeedback: 'Le texte porte sur la forêt des Aurès et la plantation de cèdres.'
					},
					{
						text: 'Critiquer le manque de discipline des jeunes volontaires',
						diagnosticFeedback: 'Au contraire, le responsable a félicité les équipes pour leur discipline.'
					}
				],
				themeSummary: 'une opération solidaire de reboisement dans la forêt de Chélia'
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
						? '1) Répondez par Vrai ou Faux en justifiant les phrases fausses :'
						: '1) Dites si les énoncés suivants sont Vrais ou Faux :'
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
				content: `3) Précisez à qui ou à quoi renvoient les expressions soulignées :\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quelle est l’intention principale du journaliste dans cet article ?',
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans le fait divers « ${variant.title} », quel est l’objectif principal du journaliste ?`,
				questionTextAr: 'حدّد الهدف الرئيسي للصحفي من كتابة هذا الخبر المتنوع:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Ce fait divers informe les lecteurs sur ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le fait divers ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'استخرج عناصر الخبر الصحفي الخمسة من الفقرة الأولى (Qui, Quoi, Où, Quand, Comment).',
				'في الخبر المتنوع، يغلب الماضي المركب (passé composé) والمبني للمجهول (a été / ont été + P.P.).',
				'انتبه للفرق بين التعويض النحوي (il) والتعويض المعجمي (les deux marcheurs / cette mobilisation).'
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

// 2. Compréhension 2 — Le récit réaliste à portée morale (7 pts)
const tpl1asTcstT3RecitRealisteComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t3_recit_realiste_comp',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — القصة الواقعية الهادفة (المثابرة، التضامن، والأمانة)',
	curriculumLessonId: 'fre_lesson_1as_tcst_t3_schema_narratif_temps',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'La persévérance d’Imane au concours de mathématiques',
				source: 'Recueil de Récits Éducatifs Algériens (texte original adapté)',
				paragraphs: [
					'Au début de sa première année au lycée d’Annaba, Imane éprouvait de réelles difficultés en géométrie. Chaque soir, elle relisait ses cahiers dans sa chambre calme, mais les problèmes complexes la décourageaient parfois.',
					'Un jour, son professeur annonça l’ouverture d’un concours inter-lycées de sciences. Au lieu de renoncer, [[la jeune élève]] décida de s’inscrire et demanda conseil à sa camarade Salma. Dès lors, elles travaillèrent ensemble deux heures après les cours : d’abord elles revoyaient les définitions, ensuite elles résolvaient des exercices progressifs.',
					'Deux mois plus tard, le jour de l’épreuve arriva enfin. Concentrée et sereine, Imane rédigea des démonstrations claires et remporta la deuxième place de la wilaya. [[Ce succès mérité]] lui prouva que la persévérance et l’entraide viennent toujours à bout des obstacles.'
				],
				glossary: [
					{ term: 'inter-lycées', meaning: 'organisé entre plusieurs lycées d’une même région' },
					{ term: 'venir à bout de', meaning: 'réussir à surmonter une difficulté' }
				],
				tfItems: [
					{
						q: 'Au début de l’année, Imane trouvait la géométrie très facile.',
						a: 'Faux',
						c: 'Elle éprouvait de réelles difficultés en géométrie et se sentait parfois découragée.',
						mark: '0.5'
					},
					{
						q: 'Imane a préparé le concours avec méthode grâce à l’aide de sa camarade Salma.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'À l’issue du concours, Imane a obtenu la deuxième place de la wilaya.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quel événement constitue l’élément perturbateur du récit (§2) ?',
				a1: 'L’annonce par le professeur de l’ouverture d’un concours inter-lycées de sciences.',
				q2: 'Quelle méthode de travail Imane et Salma ont-elles adoptée (§2) ?',
				a2: 'Elles travaillaient deux heures après les cours : elles revoyaient d’abord les définitions puis résolvaient des exercices progressifs.',
				q3: 'Quelle est la morale (la leçon) tirée de ce récit réaliste (§3) ?',
				a3: 'La persévérance et l’entraide permettent toujours de surmonter les difficultés.',
				ref1Word: 'la jeune élève (§2)',
				ref1Ans: 'Imane',
				ref2Word: 'Ce succès mérité (§3)',
				ref2Ans: 'la deuxième place remportée par Imane au concours de la wilaya',
				viseeCorrect: 'Raconter un parcours scolaire réaliste pour montrer la valeur de la persévérance et de l’entraide',
				viseeDistractors: [
					{
						text: 'Expliquer une formule avancée de géométrie dans l’espace',
						diagnosticFeedback: 'Aucune formule mathématique n’est expliquée dans ce récit.'
					},
					{
						text: 'Décourager les élèves de participer aux concours scientifiques',
						diagnosticFeedback: 'Le récit encourage au contraire l’effort et la participation.'
					},
					{
						text: 'Présenter la géographie touristique de la ville d’Annaba',
						diagnosticFeedback: 'Annaba n’est mentionnée que comme cadre réaliste du lycée.'
					}
				],
				themeSummary: 'la persévérance scolaire et l’entraide récompensées'
			},
			{
				title: 'L’entraide d’un soir d’hiver à Médéa',
				source: 'Nouvelles Réalistes de nos Régions (texte original adapté)',
				paragraphs: [
					'En janvier, un vent glacial soufflait sur les collines de Médéa et la neige recouvrait déjà les toits des maisons. Dans le quartier paisible de la vieille ville, M. Rahmani, un retraité âgé qui vivait seul, constata soudain que son chauffage était tombé en panne.',
					'Apercevant la lumière allumée tard dans la cuisine du vieil homme, son voisin Karim, jeune technicien sérieux, vint aussitôt prendre de ses nouvelles. Comprenant la situation, [[il]] courut chercher ses outils, examina le conduit bloqué par le givre et appela son frère aîné pour réparer la pièce défectueuse avec soin.',
					'Une heure plus tard, la chaleur revint enfin dans la maison. Le lendemain, le retraité invita les deux frères à partager un thé chaud et affirma que la véritable richesse d’un quartier réside dans la solidarité entre voisins. [[Cette leçon de fraternité]] marqua profondément les jeunes du quartier.'
				],
				glossary: [
					{ term: 'givre', meaning: 'couche de glace fine formée par le froid intense' },
					{ term: 'défectueuse', meaning: 'qui ne fonctionne plus correctement' }
				],
				tfItems: [
					{
						q: 'L’histoire se déroule pendant une chaude journée d’été à Médéa.',
						a: 'Faux',
						c: 'Elle se déroule en janvier, par un vent glacial et sous la neige.',
						mark: '0.5'
					},
					{
						q: 'Karim et son frère ont réparé le chauffage du voisin retraité le soir même.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'M. Rahmani estime que la solidarité entre voisins est la vraie richesse d’un quartier.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle était la situation initiale au début du récit (§1) et quel incident l’a rompue ?',
				a1: 'Situation initiale : un soir d’hiver enneigé dans un quartier paisible de Médéa où vit le retraité M. Rahmani. Incident : son chauffage est soudain tombé en panne.',
				q2: 'Comment Karim a-t-il réagi en découvrant la panne (§2) ?',
				a2: 'Il est allé chercher ses outils, a examiné le conduit bloqué et a appelé son frère aîné pour réparer la pièce.',
				q3: 'Relevez dans le texte deux verbes à l’imparfait (description) et deux verbes au passé simple (actions).',
				a3: 'Imparfait : soufflait, recouvrait (ou vivait). Passé simple : constata, vint, courut, examina, appela, revint, invita (deux de chaque au choix).',
				ref1Word: 'il (§2)',
				ref1Ans: 'Karim (le voisin jeune technicien)',
				ref2Word: 'Cette leçon de fraternité (§3)',
				ref2Ans: 'l’acte d’entraide des deux frères et les paroles du retraité sur la solidarité',
				viseeCorrect: 'Raconter une scène de vie réaliste pour célébrer la solidarité et le bon voisinage',
				viseeDistractors: [
					{
						text: 'Expliquer techniquement le fonctionnement d’une chaudière industrielle',
						diagnosticFeedback: 'La panne n’est qu’un incident déclencheur permettant de montrer l’entraide.'
					},
					{
						text: 'Adresser une plainte officielle à la compagnie de gaz',
						diagnosticFeedback: 'Ce texte est un récit narratif, pas une lettre ouverte.'
					},
					{
						text: 'Décrire la faune sauvage des montagnes algériennes',
						diagnosticFeedback: 'Le récit se concentre sur la relation humaine entre voisins.'
					}
				],
				themeSummary: 'la solidarité et le bon voisinage lors d’une soirée d’hiver'
			},
			{
				title: 'La balance juste du jeune commerçant',
				source: 'Récits de Sagesse et de Vie Quotidienne (texte original adapté)',
				paragraphs: [
					'Chaque jeudi matin, le marché de Tlemcen s’animait tôt et les étals débordaient de fruits frais. Parmi les commerçants travaillait Tarek, un jeune vendeur honnête qui avait hérité de son père le respect scrupuleux de la parole donnée.',
					'Un matin, une cliente pressée acheta deux kilogrammes d’oranges, paya avec un billet de grande valeur et repartit aussitôt en oubliant sa monnaie sur le comptoir. Dès que Tarek aperçut les billets restés près de la balance, [[il]] confia son étal à son voisin et traversa tout le marché à la recherche de la dame.',
					'Quelques minutes plus tard, il la rejoignit près de la porte principale et lui remit fidèlement la somme exacte. Étonnée et reconnaissante, la cliente salua sa droiture devant les passants. Depuis ce jour, [[la réputation du jeune homme]] attira encore plus de clients confiants, preuve que l’honnêteté porte toujours ses fruits.'
				],
				glossary: [
					{ term: 'scrupuleux', meaning: 'très attentif à respecter exactement son devoir moral' },
					{ term: 'droiture', meaning: 'loyauté et honnêteté constante dans la conduite' }
				],
				tfItems: [
					{
						q: 'La cliente a oublié de prendre sa monnaie parce qu’elle était pressée.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Tarek a décidé d’attendre la semaine suivante avant de chercher la cliente.',
						a: 'Faux',
						c: 'Il a immédiatement confié son étal à son voisin et traversé tout le marché pour la rejoindre.',
						mark: '0.5'
					},
					{
						q: 'La conduite honnête de Tarek a renforcé la confiance des clients envers lui.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelle qualité morale Tarek avait-il héritée de son père (§1) ?',
				a1: 'Le respect scrupuleux de la parole donnée et l’honnêteté.',
				q2: 'Quelles actions successives Tarek a-t-il accomplies pour rendre la monnaie (§2 et §3) ?',
				a2: 'Il a confié son étal à son voisin, traversé le marché, rejoint la cliente près de la porte principale et lui a remis la somme exacte.',
				q3: 'Relevez dans le texte deux connecteurs chronologiques et précisez la morale finale.',
				a3: 'Connecteurs : « Chaque jeudi matin », « Un matin », « Dès que », « Quelques minutes plus tard », « Depuis ce jour » (deux au choix). Morale : l’honnêteté porte toujours ses fruits et gagne la confiance.',
				ref1Word: 'il (§2)',
				ref1Ans: 'Tarek (le jeune vendeur honnête)',
				ref2Word: 'la réputation du jeune homme (§3)',
				ref2Ans: 'la renommée d’honnêteté et de droiture de Tarek',
				viseeCorrect: 'Raconter une histoire réaliste pour montrer que l’honnêteté gagne toujours la confiance',
				viseeDistractors: [
					{
						text: 'Donner des conseils économiques sur la culture des agrumes',
						diagnosticFeedback: 'Les oranges ne sont qu’un détail réaliste du marché.'
					},
					{
						text: 'Critiquer les marchés traditionnels de l’Ouest algérien',
						diagnosticFeedback: 'Le marché est décrit dans une atmosphère vivante et positive.'
					},
					{
						text: 'Expliquer le fonctionnement d’une balance électronique moderne',
						diagnosticFeedback: 'Le texte n’est pas une notice scientifique mais un récit moral.'
					}
				],
				themeSummary: 'la droiture d’un jeune commerçant et les fruits de l’honnêteté'
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
						? '1) Répondez par Vrai ou Faux en justifiant les énoncés faux :'
						: '1) Dites si ces affirmations sont Vraies ou Fausses :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes à partir du récit :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) À qui ou à quoi renvoient les expressions soulignées ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quelle est la visée principale de ce récit réaliste ?',
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans le récit « ${variant.title} », quelle est l’intention principale de l’auteur ?`,
				questionTextAr: 'حدّد الغاية الأخلاقية والتربوية من هذه القصة الواقعية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Ce récit réaliste met en valeur ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le récit réaliste puis répondez aux questions :',
				content
			},
			hints: [
				'ميّز بين الوضعية الابتدائية (بالماضي الناقص) والعنصر المخل (Un jour / Soudain + الماضي البسيط).',
				'العبرة الأخلاقية (la morale) تظهر عادة بوضوح في نهاية الفقرة الأخيرة (§3).',
				'عند استخراج الأفعال، انتبه لنهايات الماضي الناقص (-ait/-aient) ونهايات الماضي البسيط (-a/-it/-ut/-èrent).'
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

// 3. Fonctionnement de la langue 1 — Nominalisation des titres, Voix passive & Champ lexical du fait divers (7 pts)
const tpl1asTcstT3PassifNominalisationLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t3_passif_nominalisation_lang',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'vocabulaire_lexique',
	titleAr: 'قواعد اللغة — الاسمية في العناوين، المبني للمجهول في الماضي المركب، ومعجم الخبر المتنوع',
	curriculumLessonId: 'fre_lesson_1as_tcst_t3_voix_passive_nominalisation',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wfRows: [
					{
						verbe: { given: true, value: 'sauver' },
						nom: { value: 'sauvetage', mark: '0.5' },
						adjectif: { value: 'sauvé(e) / sauveur', mark: '0.5' }
					},
					{
						verbe: { value: 'secourir', mark: '0.5' },
						nom: { given: true, value: 'secours' },
						adjectif: { value: 'secourable / secouru(e)', mark: '0.5' }
					}
				],
				nomPrompt:
					'Transformez ces phrases verbales en titres nominaux de fait divers :\na) La Protection civile a secouru deux randonneurs à Tikjda.\nb) Les autorités ont fermé la route nationale à cause de la neige.\nc) Des volontaires ont reboisé la forêt de Chélia.',
				nomAns:
					'a) Secours (ou Sauvetage) de deux randonneurs à Tikjda par la Protection civile.\nb) Fermeture de la route nationale à cause de la neige.\nc) Reboisement de la forêt de Chélia par des volontaires.',
				passPrompt:
					'Transformez à la voix passive (attention au passé composé et aux accords) :\na) Un lycéen honnête a restitué la sacoche perdue.\nb) Les guides locaux ont retrouvé les deux jeunes marcheurs.',
				passAns:
					'a) La sacoche perdue a été restituée par un lycéen honnête.\nb) Les deux jeunes marcheurs ont été retrouvés par les guides locaux.',
				mcqQuestion: 'Quel titre nominal correspond correctement à la phrase : « Les habitants ont inauguré une nouvelle médiathèque à Tlemcen. » ?',
				mcqCorrect: 'Inauguration d’une nouvelle médiathèque à Tlemcen',
				mcqDistractors: [
					{
						text: 'Inaugurer une nouvelle médiathèque à Tlemcen',
						diagnosticFeedback: 'Un titre nominal utilise un nom dérivé, non un verbe à l’infinitif.'
					},
					{
						text: 'Une nouvelle médiathèque a été inaugurée à Tlemcen',
						diagnosticFeedback: 'Cette phrase contient un verbe conjugué ; ce n’est pas une phrase nominale.'
					},
					{
						text: 'Inaugurement d’une nouvelle médiathèque à Tlemcen',
						diagnosticFeedback: 'Le nom dérivé correct du verbe « inaugurer » est « inauguration ».'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'découvrir' },
						nom: { value: 'découverte', mark: '0.5' },
						adjectif: { value: 'découvert(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'restituer', mark: '0.5' },
						nom: { given: true, value: 'restitution' },
						adjectif: { value: 'restitué(e)', mark: '0.5' }
					}
				],
				nomPrompt:
					'Nominalisez les phrases suivantes pour en faire des titres de presse concis :\na) Les équipes médicales ont vacciné trois cents enfants.\nb) Les bénévoles ont nettoyé la plage de Béjaïa.\nc) Les secouristes ont évacué les familles isolées.',
				nomAns:
					'a) Vaccination de trois cents enfants par les équipes médicales.\nb) Nettoyage de la plage de Béjaïa par les bénévoles.\nc) Évacuation des familles isolées par les secouristes.',
				passPrompt:
					'Passez les phrases suivantes à la voix passive :\na) Les techniciens des forêts ont préparé trois mille plants de cèdres.\nb) La Protection civile a ouvert la route bloquée par la neige.',
				passAns:
					'a) Trois mille plants de cèdres ont été préparés par les techniciens des forêts.\nb) La route bloquée par la neige a été ouverte par la Protection civile.',
				mcqQuestion: 'Choisissez la transformation passive exacte de : « Les secouristes ont évacué toutes les familles. »',
				mcqCorrect: 'Toutes les familles ont été évacuées par les secouristes.',
				mcqDistractors: [
					{
						text: 'Toutes les familles ont été évacué par les secouristes.',
						diagnosticFeedback: 'Le participe passé s’accorde avec le sujet féminin pluriel : évacuées.'
					},
					{
						text: 'Toutes les familles sont évacuées par les secouristes.',
						diagnosticFeedback: 'Il faut respecter le temps original (passé composé : ont été évacuées).'
					},
					{
						text: 'Toutes les familles a été évacuées par les secouristes.',
						diagnosticFeedback: 'Accord de l’auxiliaire au pluriel : ont été.'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'disparaître' },
						nom: { value: 'disparition', mark: '0.5' },
						adjectif: { value: 'disparu(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'solidariser', mark: '0.5' },
						nom: { given: true, value: 'solidarité' },
						adjectif: { value: 'solidaire', mark: '0.5' }
					}
				],
				nomPrompt:
					'Réécrivez ces faits divers sous forme de titres nominaux :\na) Des archéologues ont découvert une mosaïque antique à Tipaza.\nb) Un pont ancien s’est effondré après les fortes pluies.\nc) Les lycéens ont distribué des fournitures scolaires.',
				nomAns:
					'a) Découverte d’une mosaïque antique à Tipaza par des archéologues.\nb) Effondrement d’un pont ancien après les fortes pluies.\nc) Distribution de fournitures scolaires par les lycéens.',
				passPrompt:
					'Mettez les phrases ci-dessous à la voix passive :\na) Le jury a félicité la jeune lauréate du concours.\nb) Les habitants du quartier ont dégagé les trottoirs enneigés.',
				passAns:
					'a) La jeune lauréate du concours a été félicitée par le jury.\nb) Les trottoirs enneigés ont été dégagés par les habitants du quartier.',
				mcqQuestion: 'Quel nom dérive correctement du verbe « s’effondrer » pour titrer un fait divers ?',
				mcqCorrect: 'L’effondrement',
				mcqDistractors: [
					{
						text: 'L’effondration',
						diagnosticFeedback: 'Ce nom n’existe pas ; le suffixe correct est -ment.'
					},
					{
						text: 'L’effondrage',
						diagnosticFeedback: 'Mauvais suffixe ; on dit « effondrement ».'
					},
					{
						text: 'L’effondrure',
						diagnosticFeedback: 'Forme incorrecte ; la forme juste est « effondrement ».'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complétez le tableau de la famille de mots ci-dessous (2.0 pts) :' },
			buildFrenchWordFamilyTableBlock(variant.wfRows),
			{
				type: 'text',
				content: `2) ${variant.nomPrompt} (3.0 pts)`,
				answer: variant.nomAns,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.passPrompt} (2.0 pts)`,
				answer: variant.passAns,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة في الاسمية والمبني للمجهول:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Les titres de faits divers emploient la nominalisation (sans verbe conjugué) et le corps utilise souvent le passé composé passif accordé.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Répondez aux exercices suivants sur la nominalisation et la voix passive :',
				content
			},
			hints: [
				'الجملة الاسمية (phrase nominale) خالية تماما من الأفعال المصرفة وتبدأ باسم مشتق (-tion, -ment, -age, -ure).',
				'في الماضي المركب المبني للمجهول نكتب: a été / ont été + اسم المفعول مطابقا للفاعل الجديد في الجنس والعدد.',
				'احفظ الاسم الصحيح للأفعال الشائعة: sauver -> sauvetage، fermer -> fermeture، découvrir -> découverte.'
			],
			solutionStepsAr: [
				`Nominalisation : ${variant.nomAns}`,
				`Voix passive : ${variant.passAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Temps du récit, Caractérisation & Connecteurs chronologiques (7 pts)
const tpl1asTcstT3TempsCaractLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t3_temps_caract_lang',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة — أزمنة السرد، النعت (Caractérisation)، والروابط الزمنية',
	curriculumLessonId: 'fre_lesson_1as_tcst_t3_caracterisation_valeurs_temps',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['d’abord', 'un matin', 'soudain', 'finalement', 'ensuite', 'enfin'],
				classifyCols: [
					{ header: 'Début / Rupture', items: ['d’abord', 'un matin', 'soudain'], mark: '0.75' },
					{ header: 'Suite / Clôture', items: ['ensuite', 'finalement', 'enfin'], mark: '0.75' }
				],
				conjPrompt:
					'Conjuguez les verbes entre parenthèses à l’imparfait, au passé simple ou au plus-que-parfait selon le sens :\nChaque soir, le vieil artisan (fermer) son atelier avant la nuit. Un soir, alors qu’il (ranger) ses outils, un voisin (frapper) brusquement à la porte pour lui rendre la clé qu’il (oublier) sur le banc.',
				conjAns: 'fermait (imparfait) / rangeait (imparfait) / frappa (passé simple) / avait oubliée (plus-que-parfait)',
				caractPrompt:
					'Indiquez la nature grammaticale de chaque expansion du nom soulignée entre guillemets (adjectif qualificatif, complément du nom ou subordonnée relative) :\na) Un lycéen « intègre » a trouvé un portefeuille.\nb) Il s’agissait d’une sacoche « en cuir ».\nc) Le jeune homme « qui a aidé son voisin » a été remercié.',
				caractAns: 'a) Adjectif qualificatif   b) Complément du nom   c) Proposition subordonnée relative',
				relPrompt:
					'Reliez ces deux phrases en une seule à l’aide du pronom relatif convenable (qui, que ou où) :\na) C’est la librairie. Imane y achetait ses manuels de mathématiques.\nb) Bilal a restitué la sacoche. Un voyageur avait oublié cette sacoche.',
				relAns:
					'a) C’est la librairie où Imane achetait ses manuels de mathématiques.\nb) Bilal a restitué la sacoche qu’un voyageur avait oubliée.',
				mcqQuestion: 'Choisissez la conjugaison correcte : « Les élèves .......... tranquillement lorsque le directeur .......... dans la salle. » (travailler / entrer)',
				mcqCorrect: 'travaillaient / entra',
				mcqDistractors: [
					{
						text: 'travaillèrent / entrait',
						diagnosticFeedback: 'L’action qui dure en arrière-plan prend l’imparfait (travaillaient) et l’action soudaine prend le passé simple (entra).'
					},
					{
						text: 'travaillent / entrera',
						diagnosticFeedback: 'Le récit au passé exige l’imparfait et le passé simple.'
					},
					{
						text: 'travaillaient / entrait',
						diagnosticFeedback: 'L’entrée soudaine du directeur est un événement bref au passé simple.'
					}
				]
			},
			{
				classifyBank: ['autrefois', 'tout à coup', 'la veille', 'puis', 'le lendemain', 'dès lors'],
				classifyCols: [
					{ header: 'Antériorité / Rupture', items: ['autrefois', 'la veille', 'tout à coup'], mark: '0.75' },
					{ header: 'Postériorité / Suite', items: ['puis', 'le lendemain', 'dès lors'], mark: '0.75' }
				],
				conjPrompt:
					'Mettez les verbes entre parenthèses au temps convenable du récit (imparfait, passé simple ou plus-que-parfait) :\nLa neige (tomber) sans arrêt sur les hauteurs de Sétif. Soudain, une voiture (glisser) près du virage. Les habitants qui (observer) la scène (accourir) aussitôt pour aider le conducteur.',
				conjAns: 'tombait (imparfait) / glissa (passé simple) / avaient observé (plus-que-parfait) / accoururent (passé simple)',
				caractPrompt:
					'Identifiez le procédé de caractérisation entre guillemets :\na) Une élève « persévérante » a remporté le concours.\nb) Le chauffeur a dégagé une route « de montagne ».\nc) Voici l’artisan « dont tout le quartier admire la patience ».',
				caractAns: 'a) Adjectif qualificatif   b) Complément du nom   c) Proposition subordonnée relative',
				relPrompt:
					'Complétez avec le pronom relatif juste (qui, que, où) :\na) Le commerçant .......... a rendu la monnaie est très respecté.\nb) Le quartier .......... vit M. Rahmani est connu pour sa solidarité.',
				relAns: 'a) qui   b) où',
				mcqQuestion: 'Quelle phrase emploie correctement le plus-que-parfait pour marquer l’antériorité dans le passé ?',
				mcqCorrect: 'Le voyageur retrouva enfin le passeport qu’il avait perdu la veille.',
				mcqDistractors: [
					{
						text: 'Le voyageur retrouva enfin le passeport qu’il perdra la veille.',
						diagnosticFeedback: 'Le futur simple contredit « la veille » et le récit au passé.'
					},
					{
						text: 'Le voyageur retrouva enfin le passeport qu’il perd la veille.',
						diagnosticFeedback: 'L’action antérieure à un passé simple exige le plus-que-parfait.'
					},
					{
						text: 'Le voyageur avait retrouvé enfin le passeport qu’il perdit la veille.',
						diagnosticFeedback: 'L’ordre chronologique est inversé : la perte précède la découverte.'
					}
				]
			},
			{
				classifyBank: ['au début', 'brusquement', 'pendant que', 'peu après', 'auparavant', 'au terme de'],
				classifyCols: [
					{ header: 'Cadre / Simultanéité / Rupture', items: ['au début', 'pendant que', 'brusquement'], mark: '0.75' },
					{ header: 'Avant / Après / Fin', items: ['auparavant', 'peu après', 'au terme de'], mark: '0.75' }
				],
				conjPrompt:
					'Conjuguez au temps du récit qui convient (imparfait, passé simple ou plus-que-parfait) :\nLes rues de Constantine (être) encore désertes à l’aube. Tout à coup, Sami (voir) une enveloppe tombée près de l’arrêt de bus. Il (ramasser) le pli qu’un médecin (égarer) quelques minutes plus tôt.',
				conjAns: 'étaient (imparfait) / vit (passé simple) / ramassa (passé simple) / avait égaré (plus-que-parfait)',
				caractPrompt:
					'Précisez la nature de chaque expansion du nom entre guillemets :\na) Un gilet « de secours » brillait dans le brouillard.\nb) Un vent « glacial » balayait la vallée.\nc) Le sentier « que suivaient les randonneurs » était enneigé.',
				caractAns: 'a) Complément du nom   b) Adjectif qualificatif   c) Proposition subordonnée relative',
				relPrompt:
					'Remplacez les repères temporels pour les adapter à un récit au passé :\na) « Hier, il a neigé. » devient : « .........., il avait neigé. »\nb) « Demain, il le remerciera. » devient : « .........., il le remercia. »',
				relAns: 'a) La veille   b) Le lendemain',
				mcqQuestion: 'Quelle valeur temporelle possède l’imparfait dans : « Tous les jeudis, Tarek installait son étal dès six heures du matin. » ?',
				mcqCorrect: 'Une action répétée (imparfait d’habitude)',
				mcqDistractors: [
					{
						text: 'Une action soudaine et unique',
						diagnosticFeedback: 'Une action soudaine et unique se conjugue au passé simple.'
					},
					{
						text: 'Une vérité scientifique atemporelle',
						diagnosticFeedback: 'Une vérité scientifique emploie le présent de l’indicatif.'
					},
					{
						text: 'Une antériorité par rapport au passé simple',
						diagnosticFeedback: 'L’antériorité dans le passé est exprimée par le plus-que-parfait.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les indicateurs et connecteurs chronologiques suivants dans le tableau (1.5 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{
				type: 'text',
				content: `2) ${variant.conjPrompt} (2.5 pts)`,
				answer: variant.conjAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.caractPrompt} (1.5 pts)`,
				answer: variant.caractAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) ${variant.relPrompt} (1.5 pts)`,
				answer: variant.relAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الدقيقة حول أزمنة السرد وقيمها:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Dans un récit au passé, l’imparfait décrit le décor ou l’habitude, le passé simple marque l’événement soudain, et le plus-que-parfait exprime l’antériorité.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les exercices de cohérence temporelle, de conjugaison et de caractérisation :',
				content
			},
			hints: [
				'الماضي الناقص للوصف والعادة والخلفية، والماضي البسيط للحدث المفاجئ، والماضي الأسبق (plus-que-parfait) لما سبق ذلك زمنيا.',
				'تذكّر وسائل النعت الثلاث: صفة (adjectif)، حرف جر + اسم (complément du nom)، وضمير موصول + فعل (relative).',
				'في السرد الماضي: hier تصبح la veille، وdemain تصبح le lendemain.'
			],
			solutionStepsAr: [
				`Connecteurs : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Conjugaison : ${variant.conjAns}`,
				`Caractérisation : ${variant.caractAns}`,
				`Cohérence : ${variant.relAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Récit réaliste éducatif / Fait divers structuré (6 pts)
const tpl1asTcstT3RecitRealisteWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcst_t3_recit_realiste_we',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — إنتاج قصة واقعية هادفة أو خبر متنوع جزائري',
	curriculumLessonId: 'fre_lesson_1as_tcst_t3_produire_recit_realiste',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'Rédigez un court récit réaliste à portée morale (12 à 15 lignes) racontant comment un lycéen ou une lycéenne a fait preuve d’honnêteté en retrouvant un objet précieux égaré dans sa ville.',
				sujetUnNotes: [
					'Respectez les cinq étapes du schéma narratif (situation initiale, élément perturbateur, péripéties, résolution, situation finale).',
					'Alternez avec justesse l’imparfait (cadre et portrait) et le passé simple (actions principales).',
					'Employez au moins trois connecteurs chronologiques (Un matin, Soudain, Aussitôt, Finalement...) et deux caractérisations.',
					'Terminez par une morale claire mettant en valeur l’honnêteté.'
				],
				sujetDeuxPrompt:
					'Rédigez un fait divers réaliste (10 à 12 lignes) précédé d’un titre nominal relatant une opération réussie d’entraide ou de sauvetage dans votre wilaya. Utilisez le passé composé et au moins une phrase à la voix passive.',
				modelAnswer:
					'Chaque matin d’hiver, Youssef traversait le jardin public de Constantine pour se rendre au lycée. L’air était frais et les allées demeuraient encore calmes avant l’ouverture des magasins.\nUn matin, alors qu’il marchait d’un pas rapide, il aperçut soudain une pochette en cuir noir posée sur un banc humide. Curieux mais prudent, le jeune garçon l’ouvrit pour chercher un numéro de téléphone : elle contenait des ordonnances médicales et une somme importante. Sans hésiter une seconde, il appela le numéro inscrit sur la carte et attendit patiemment près de l’entrée du jardin.\nDix minutes plus tard, un vieil homme essoufflé arriva enfin, le visage illuminé par le soulagement. Il remercia chaleureusement le lycéen pour sa droiture exemplaire. Ce jour-là, Youssef rentra chez lui heureux, convaincu que l’honnêteté est un trésor qui dépasse toutes les richesses matérielles.',
				rubricSummary:
					'Respect du schéma narratif et de la consigne réaliste (1.5 pts), Maîtrise des temps du récit (imparfait / passé simple) (1.5 pts), Connecteurs chronologiques, caractérisation et morale claire (1.5 pts), Correction de la langue et de l’orthographe (1.5 pts).',
				mcqQuestion: 'Quel couple de temps assure la meilleure cohérence dans un récit réaliste littéraire au passé ?',
				mcqCorrect: 'L’imparfait (décor et habitude) et le passé simple (événements principaux)',
				mcqDistractors: [
					{
						text: 'Le futur simple et l’impératif présent',
						diagnosticFeedback: 'Ces temps ne conviennent pas à un récit au passé.'
					},
					{
						text: 'Le subjonctif présent et le futur antérieur',
						diagnosticFeedback: 'Ce ne sont pas des temps narratifs principaux.'
					},
					{
						text: 'Le présent de vérité générale uniquement',
						diagnosticFeedback: 'Le présent atemporel caractérise le texte scientifique, non le récit au passé.'
					}
				]
			},
			{
				sujetUnPrompt:
					'À l’occasion de la semaine de la solidarité au lycée, écrivez un récit réaliste éducatif (12 à 15 lignes) illustrant la valeur de l’entraide entre camarades ou entre voisins face à une difficulté inattendue.',
				sujetUnNotes: [
					'Ancrez l’histoire dans un lieu réel d’Algérie et présentez brièvement les personnages à l’imparfait.',
					'Introduisez l’incident imprévu par un connecteur de rupture (Soudain / Un soir) et racontez la réaction solidaire au passé simple.',
					'Enrichissez vos phrases grâce à des adjectifs moraux et au moins une proposition subordonnée relative.',
					'Concluez par un dénouement heureux et une leçon morale inspirante.'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (environ 10 lignes) d’un fait divers relatant une campagne citoyenne de reboisement réussie dans votre région.',
				modelAnswer:
					'En février, une pluie battante tombait sur le village paisible de Miliana et rendait les ruelles glissantes. Amine, un élève de 1AS sérieux qui aidait souvent sa famille, rentrait de la bibliothèque avec son ami Rayan.\nSoudain, ils aperçurent leur voisin âgé, M. Saidi, dont le panier de provisions venait de se renverser près du trottoir. Aussitôt, les deux camarades coururent vers lui sous la pluie. D’abord, ils ramassèrent soigneusement les fruits et les paquets ; ensuite, ils accompagnèrent le vieil homme jusqu’à sa porte pour éviter qu’il ne glisse sur les marches mouillées.\nTouché par cette attention spontanée, M. Saidi les bénit et loua leur belle éducation. Finalement, les deux lycéens poursuivirent leur chemin le cœur léger, comprenant que les petits gestes d’entraide suffisent à réchauffer toute une communauté.',
				rubricSummary:
					'Cohérence du schéma narratif et réalisme (1.5 pts), Emploi correct de l’imparfait et du passé simple (1.5 pts), Caractérisation, connecteurs et portée morale (1.5 pts), Correction orthographique et syntaxique (1.5 pts).',
				mcqQuestion: 'Dans un récit réaliste à portée morale, où place-t-on généralement le cadre spatio-temporel calme ?',
				mcqCorrect: 'Dans la situation initiale, rédigée à l’imparfait',
				mcqDistractors: [
					{
						text: 'Dans la formule de prise de congé finale',
						diagnosticFeedback: 'La prise de congé appartient à la lettre ouverte, non au récit.'
					},
					{
						text: 'Uniquement dans le titre nominal',
						diagnosticFeedback: 'Un récit réaliste développe son cadre dans la situation initiale.'
					},
					{
						text: 'Après la morale finale du texte',
						diagnosticFeedback: 'Le cadre initial ouvre le récit avant l’élément perturbateur.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Rédigez un court récit réaliste édifiant (12 à 15 lignes) montrant comment la persévérance et la discipline ont permis à un élève en difficulté de réussir brillamment son examen de fin d’année.',
				sujetUnNotes: [
					'Décrivez la difficulté de départ dans une situation initiale à l’imparfait.',
					'Introduisez le déclic (conseil d’un enseignant ou décision personnelle) et racontez les étapes d’effort avec des connecteurs chronologiques.',
					'Utilisez le passé simple pour les événements marquants et au moins un plus-que-parfait d’antériorité.',
					'Terminez par le résultat obtenu et la morale éducative sur la valeur du travail.'
				],
				sujetDeuxPrompt:
					'Rédigez un fait divers (10 à 12 lignes) coiffé d’un titre nominal annonçant le sauvetage d’un enfant ou d’un randonneur grâce au courage d’un citoyen et de la Protection civile. Employez le passé composé et la voix passive.',
				modelAnswer:
					'Au premier trimestre, Sofiane rencontrait de grandes difficultés en physique et en langue française. Malgré sa bonne volonté, ses résultats modestes le décourageaient et il redoutait l’approche des compositions.\nUn après-midi, son professeur principal remarqua son inquiétude et lui proposa un plan de révision quotidien simple et régulier. Dès le lendemain, le lycéen déterminé appliqua fidèlement les conseils qu’il avait notés dans son carnet. D’abord, il relisait ses cours chaque soir ; ensuite, il refaisait deux exercices sans regarder le corrigé et posait ses questions en classe sans timidité.\nQuelques mois plus tard, les résultats du troisième trimestre furent affichés : Sofiane figura parmi les meilleurs élèves de sa classe. Ce succès bien mérité lui apprit que la persévérance et la méthode triomphent toujours du découragement.',
				rubricSummary:
					'Progression narrative complète et vraisemblable (1.5 pts), Conjugaison juste des temps du passé (1.5 pts), Richesse lexicale, connecteurs et morale (1.5 pts), Syntaxe, ponctuation et orthographe (1.5 pts).',
				mcqQuestion: 'Quel élément caractérise impérativement un fait divers journalistique réussi ?',
				mcqCorrect: 'Un titre nominal concis, les réponses aux 5 questions (Qui, Quoi, Où, Quand, Comment) et le passé composé',
				mcqDistractors: [
					{
						text: 'Des créatures fantastiques et une formule « Il était une fois »',
						diagnosticFeedback: 'Le fait divers rapporte un événement réel, jamais un conte merveilleux.'
					},
					{
						text: 'Une formule d’appel « Monsieur le Maire » et une signature collective',
						diagnosticFeedback: 'Ces éléments appartiennent à la lettre ouverte.'
					},
					{
						text: 'Uniquement des définitions scientifiques au présent atemporel',
						diagnosticFeedback: 'Cela caractérise le texte de vulgarisation scientifique.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Récit réaliste à portée morale) :',
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة الصحيحة لإنتاج القصة الواقعية أو الخبر المتنوع:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Le récit réaliste associe schéma narratif complet, imparfait/passé simple, caractérisation et morale claire ; le fait divers utilise un titre nominal et le passé composé.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 6,
				instruction: 'Traitez l’un des deux sujets au choix en soignant la cohérence et la langue :',
				content
			},
			hints: [
				'في القصة الواقعية: ابدأ بإطار حقيقي بالماضي الناقص، ثم عنصر مخل بـ Soudain/Un jour مع الماضي البسيط، واختم بعبرة واضحة.',
				'تجنب تكرار « et puis » ونوّع الروابط الزمنية (D’abord, Aussitôt, Quelques minutes plus tard, Finalement).',
				'في الخبر المتنوع البديل، ابدأ بعنوان اسمي موجز واستعمل الماضي المركب وجملة واحدة على الأقل في المبني للمجهول.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T3: FrenchParameterizedTemplate[] = [
	tpl1asTcstT3FaitDiversComp,
	tpl1asTcstT3RecitRealisteComp,
	tpl1asTcstT3PassifNominalisationLang,
	tpl1asTcstT3TempsCaractLang,
	tpl1asTcstT3RecitRealisteWe
];
