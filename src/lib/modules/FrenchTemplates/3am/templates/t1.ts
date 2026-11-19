import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension de l’écrit 1 (7 pts) — Secours et solidarité en Algérie
// ═══════════════════════════════════════════════════════════════════════════════
const compSecoursSolidarite3amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t1_comp_secours_solidarite',
	grade: '3am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): خبر صحفي حول الإنقاذ والتضامن في الجزائر (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t1_structure_fait_divers',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Sauvetage réussi d’un randonneur égaré dans le Djurdjura',
				paragraphs: [
					'Vendredi dernier, en fin d’après-midi, un jeune randonneur âgé de vingt ans s’est égaré dans les sentiers enneigés du massif du Djurdjura, près de Tikjda (wilaya de Bouira). Alertés par un appel téléphonique de ses compagnons, les agents de la Protection Civile ont immédiatement lancé une opération de recherche malgré le brouillard épais.',
					'Des villageois connaissant parfaitement les pistes de la montagne ont accompagné les secouristes. Grâce à cette belle coordination, le jeune homme a été retrouvé sain et sauf vers vingt-et-une heures dans un abri naturel. [[Il]] a reçu les premiers soins sur place avant d’être ramené auprès de sa famille, très soulagée.'
				],
				source: 'D’après un quotidien national algérien, janvier 2025',
				glossary: [
					{ term: 's’égarer', meaning: 'perdre son chemin' },
					{ term: 'sain et sauf', meaning: 'en bonne santé et hors de danger' }
				],
				rubrique: 'Société / Secours',
				gridRows: [
					{ label: 'Qui ? (Acteurs)', val: 'Les agents de la Protection Civile, des villageois et un jeune randonneur' },
					{ label: 'Quoi ? (Événement)', val: 'Sauvetage d’un randonneur égaré dans la neige' },
					{ label: 'Où ? (Lieu)', val: 'Massif du Djurdjura, près de Tikjda (Bouira)' },
					{ label: 'Quand ? (Date)', val: 'Vendredi dernier, en fin d’après-midi' }
				],
				q1: 'Comment le randonneur a-t-il été retrouvé malgré le brouillard ?',
				a1: 'Il a été retrouvé grâce à la coordination entre la Protection Civile et des villageois connaissant bien les pistes.',
				tf1Q: 'Le jeune randonneur a été blessé gravement lors de cet incident.',
				tf1A: 'Faux',
				tf1C: 'Il a été retrouvé sain et sauf vers vingt-et-une heures.',
				tf2Q: 'Les villageois ont aidé les agents de la Protection Civile.',
				tf2A: 'Vrai',
				refWord: 'Il',
				refAns: 'le jeune randonneur (le jeune homme)',
				lexQ: 'Relevez du texte le synonyme de « perdus / qui a perdu son chemin » et un mot du champ lexical du secours.',
				lexA: 'Synonyme : égaré | Champ lexical du secours : sauvetage, Protection Civile, secouristes, premiers soins.',
				mcqCorrect: 'La Protection Civile et des villageois ont secouru sain et sauf un randonneur égaré près de Tikjda.',
				mcqD1: 'Des villageois ont fermé les routes du Djurdjura pendant une semaine.',
				mcqD2: 'Un randonneur a remporté une course de montagne à Oran.',
				mcqD3: 'Les recherches ont été annulées à cause de la chaleur.'
			},
			{
				title: 'Élan de solidarité hivernale dans les villages du nord de Sétif',
				paragraphs: [
					'À la suite des fortes chutes de neige enregistrées mardi dernier dans les hauteurs du nord de Sétif, plusieurs pistes rurales ont été momentanément coupées. Dès les premières heures du matin, des jeunes bénévoles et des scouts algériens se sont mobilisés aux côtés des services communaux pour déneiger les accès.',
					'Parallèlement, une caravane de solidarité a distribué des denrées alimentaires, des couvertures chaudes et des médicaments à soixante familles isolées. [[Elles]] ont exprimé leur vive gratitude devant cette générosité exemplaire qui illustre les valeurs d’entraide de la société algérienne.'
				],
				source: 'D’après la presse locale algérienne, février 2025',
				glossary: [
					{ term: 'denrées alimentaires', meaning: 'produits de nourriture de première nécessité' },
					{ term: 'gratitude', meaning: 'reconnaissance, remerciement sincère' }
				],
				rubrique: 'Solidarité / Société',
				gridRows: [
					{ label: 'Qui ? (Acteurs)', val: 'Des jeunes bénévoles, des scouts algériens et les services communaux' },
					{ label: 'Quoi ? (Événement)', val: 'Déneigement des routes et distribution d’aides à 60 familles' },
					{ label: 'Où ? (Lieu)', val: 'Les villages du nord de Sétif' },
					{ label: 'Quand ? (Date)', val: 'Mardi dernier, dès les premières heures du matin' }
				],
				q1: 'Quelles aides la caravane de solidarité a-t-elle distribuées aux familles isolées ?',
				a1: 'Elle a distribué des denrées alimentaires, des couvertures chaudes et des médicaments.',
				tf1Q: 'Les routes ont été coupées à cause de fortes chutes de neige.',
				tf1A: 'Vrai',
				tf2Q: 'Seulement dix familles ont bénéficié de cette caravane de solidarité.',
				tf2A: 'Faux',
				tf2C: 'Soixante familles isolées ont reçu des aides.',
				refWord: 'Elles',
				refAns: 'les soixante familles isolées',
				lexQ: 'Relevez du texte le synonyme de « volontaires » et un mot du champ lexical de la solidarité.',
				lexA: 'Synonyme : bénévoles | Champ lexical de la solidarité : solidarité, caravane, générosité, entraide.',
				mcqCorrect: 'Des bénévoles et des scouts ont déneigé les pistes et distribué des aides à 60 familles isolées à Sétif.',
				mcqD1: 'Les chutes de neige ont eu lieu en plein mois de juillet à Sétif.',
				mcqD2: 'Aucun bénévole n’a participé à l’opération de déneigement.',
				mcqD3: 'La caravane a distribué uniquement des fournitures scolaires.'
			},
			{
				title: 'Reboisement citoyen : deux mille cèdres plantés à Chréa',
				paragraphs: [
					'Samedi dernier, quatre cents collégiens, enseignants et membres des scouts musulmans algériens ont pris part à une vaste campagne de reboisement sur les hauteurs de Chréa, dans la wilaya de Blida. Encadrés par des agents des forêts, les participants ont planté deux mille jeunes cèdres de l’Atlas afin de restaurer les zones touchées par la sécheresse.',
					'Tout au long de la journée, des ateliers pédagogiques ont rappelé l’importance de protéger le patrimoine forestier national. [[Ils]] ont promis de revenir au printemps pour arroser et suivre la croissance de chaque arbre planté.'
				],
				source: 'D’après un journal scolaire algérien, novembre 2025',
				glossary: [
					{ term: 'reboisement', meaning: 'action de planter de nouveaux arbres dans une forêt' },
					{ term: 'restaurer', meaning: 'remettre en bon état' }
				],
				rubrique: 'Environnement / Société',
				gridRows: [
					{ label: 'Qui ? (Acteurs)', val: '400 collégiens, enseignants, scouts et agents des forêts' },
					{ label: 'Quoi ? (Événement)', val: 'Plantation de deux mille jeunes cèdres de l’Atlas' },
					{ label: 'Où ? (Lieu)', val: 'Sur les hauteurs de Chréa (wilaya de Blida)' },
					{ label: 'Quand ? (Date)', val: 'Samedi dernier' }
				],
				q1: 'Pourquoi les participants ont-ils planté ces deux mille jeunes cèdres ?',
				a1: 'Pour restaurer les zones forestières touchées par la sécheresse et protéger le patrimoine forestier.',
				tf1Q: 'Les agents des forêts ont encadré cette campagne de reboisement.',
				tf1A: 'Vrai',
				tf2Q: 'Les participants ne reviendront plus jamais sur le site de Chréa.',
				tf2A: 'Faux',
				tf2C: 'Ils ont promis de revenir au printemps pour arroser et suivre la croissance des arbres.',
				refWord: 'Ils',
				refAns: 'les participants (collégiens, enseignants et scouts)',
				lexQ: 'Relevez du texte un verbe de la même famille que « plantation » et un nom dérivé de « reboiser ».',
				lexA: 'Verbe : planter (ont planté) | Nom dérivé : reboisement.',
				mcqCorrect: 'Quatre cents collégiens, enseignants et scouts ont planté 2 000 cèdres à Chréa pour protéger la forêt.',
				mcqD1: 'Deux mille arbres ont été coupés dans la wilaya de Blida.',
				mcqD2: 'L’opération s’est déroulée en mer Méditerranée.',
				mcqD3: 'Les agents des forêts se sont opposés à la plantation des cèdres.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'أعد قراءة الفقرة الأولى للتحقق من طبيعة الحدث.' },
				{ text: v.mcqD2, diagnosticFeedback: 'المكان أو الحدث يختلف عمّا ورد في النص.' },
				{ text: v.mcqD3, diagnosticFeedback: 'هذه المعلومة مناقضة للفقرة الثانية من الخبر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture du fait divers « ${v.title} », quel résumé est exact ?`,
				questionTextAr: `اقرأ الخبر الصحفي « ${v.title} » واختر الملخص الصحيح:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit (07 pts)',
				points: 7,
				instruction: 'Lisez attentivement le fait divers ci-dessous puis répondez aux questions :',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						numberedParagraphs: true,
						glossary: v.glossary
					}),
					{
						type: 'text',
						content: '1) Ce texte est un fait divers. À quelle rubrique de journal appartient-il ? (01 pt)',
						answer: `Il appartient à la rubrique : ${v.rubrique}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '2) Complétez le tableau suivant à partir du texte (02 pts) :'
					},
					{
						type: 'table',
						headers: ['Question', 'Information relevée du texte'],
						cells: [],
						rows: v.gridRows.map((r) => [
							{ content: r.label, bold: true },
							{ content: '....................................', answer: r.val, mark: '0.5' }
						]),
						align: 'left',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `3) Répondez à la question suivante : ${v.q1} (01 pt)`,
						answer: v.a1,
						mark: '1'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C ?? '', mark: '0.5' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C ?? '', mark: '0.5' }
						]
					},
					{
						type: 'text',
						content: `5) À qui renvoie le pronom souligné « ${v.refWord} » dans le deuxième paragraphe ? (01 pt)`,
						answer: `Le pronom « ${v.refWord} » renvoie à : ${v.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `6) ${v.lexQ} (01 pt)`,
						answer: v.lexA,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج عناصر جدول (Qui / Quoi / Où / Quand) بدقة من الفقرة الأولى (التمهيد).',
				'تحقّق من صحة كل جملة في سؤال (Vrai / Faux) بالعودة الحرفية إلى النص.',
				'انظر إلى الاسم الذي يسبق الضمير المسطّر مباشرة وطابقه في التذكير والتأنيث والعدد.'
			],
			solutionStepsAr: [
				`الباب الصحفي: ${v.rubrique}`,
				v.gridRows.map((r) => `${r.label} : ${r.val}`).join(' | '),
				`الإجابة: ${v.a1}`,
				`مرجع الضمير (${v.refWord}): ${v.refAns} | المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension de l’écrit 2 (7 pts) — Exploits civiques et scientifiques
// ═══════════════════════════════════════════════════════════════════════════════
const compExploitCivique3amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t1_comp_exploit_civique',
	grade: '3am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): خبر صحفي حول إنجاز علمي أو سلوك مدني مشرّف (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t1_structure_fait_divers',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Des collégiens de Constantine primés pour un robot agricole écologique',
				paragraphs: [
					'Jeudi dernier, à Alger, une équipe de quatre collégiens venus de Constantine a remporté le premier prix du concours national de la jeune innovation scientifique. Les élèves ont conçu un petit robot fonctionnant à l’énergie solaire capable de mesurer l’humidité du sol et d’économiser l’eau d’irrigation.',
					'Le jury a salué la simplicité et l’utilité de [[ce prototype]] destiné aux petits agriculteurs algériens. De retour dans leur établissement, les jeunes inventeurs ont été chaleureusement félicités par leurs professeurs et leurs camarades.'
				],
				source: 'D’après la presse nationale algérienne, mars 2025',
				glossary: [
					{ term: 'primé', meaning: 'récompensé par un prix' },
					{ term: 'prototype', meaning: 'premier modèle expérimental d’une invention' }
				],
				q1: 'Quelle invention les collégiens de Constantine ont-ils présentée au concours ?',
				a1: 'Ils ont conçu un petit robot solaire capable de mesurer l’humidité du sol et d’économiser l’eau d’irrigation.',
				q2: 'Pourquoi le jury a-t-il salué leur projet ?',
				a2: 'Parce que leur prototype est simple, utile et destiné aux petits agriculteurs algériens.',
				gridRows: [
					{ label: 'Qui ?', val: 'Une équipe de quatre collégiens de Constantine' },
					{ label: 'Quoi ?', val: 'Obtention du premier prix national de la jeune innovation' },
					{ label: 'Où et Quand ?', val: 'À Alger, jeudi dernier' }
				],
				tf1Q: 'Le robot conçu par les élèves fonctionne au pétrole.',
				tf1A: 'Faux',
				tf1C: 'Il fonctionne à l’énergie solaire.',
				tf2Q: 'Les jeunes inventeurs ont été félicités à leur retour au collège.',
				tf2A: 'Vrai',
				refWord: 'ce prototype',
				refAns: 'le petit robot agricole écologique fonctionnant à l’énergie solaire',
				lexQ: 'Relevez du texte deux mots appartenant au champ lexical de la science et de l’innovation.',
				lexA: 'innovation, scientifique, robot, énergie solaire, prototype, inventeurs (deux au choix).',
				mcqCorrect: 'Quatre collégiens de Constantine ont gagné le premier prix national grâce à un robot agricole solaire.',
				mcqD1: 'Des collégiens de Constantine ont perdu leur robot pendant le voyage.',
				mcqD2: 'Le concours national portait sur la peinture sur verre.',
				mcqD3: 'Le jury a refusé d’évaluer le projet des élèves.'
			},
			{
				title: 'Acte de civisme exemplaire : un collégien restitue un dossier médical urgent à Oran',
				paragraphs: [
					'Lundi matin, en se rendant à son collège dans le centre-ville d’Oran, Yacine, un élève de troisième année moyenne, a découvert un sac oublié sur un banc près de l’arrêt de tramway. En cherchant une carte permettant d’identifier le propriétaire, il a constaté que le sac contenait des analyses médicales urgentes et des ordonnances.',
					'Sans hésiter, le garçon a remis [[l’objet]] au poste de police le plus proche. Deux heures plus tard, un père de famille inquiet a pu récupérer le dossier intact pour l’opération de son enfant. Les habitants du quartier ont salué l’honnêteté de Yacine.'
				],
				source: 'D’après un quotidien de l’Ouest algérien, octobre 2025',
				glossary: [
					{ term: 'restituer', meaning: 'rendre un objet à son propriétaire' },
					{ term: 'intact', meaning: 'complet, qui n’a subi aucun dommage' }
				],
				q1: 'Que contenait le sac découvert par Yacine près de l’arrêt de tramway ?',
				a1: 'Il contenait des analyses médicales urgentes et des ordonnances.',
				q2: 'Comment Yacine a-t-il agi pour retrouver le propriétaire ?',
				a2: 'Il a remis le sac sans hésiter au poste de police le plus proche.',
				gridRows: [
					{ label: 'Qui ?', val: 'Yacine, un collégien de 3AM à Oran' },
					{ label: 'Quoi ?', val: 'Restitution d’un sac contenant un dossier médical urgent' },
					{ label: 'Où et Quand ?', val: 'Centre-ville d’Oran, lundi matin' }
				],
				tf1Q: 'Yacine a trouvé le sac oublié dans la cour de son collège.',
				tf1A: 'Faux',
				tf1C: 'Il l’a trouvé sur un banc près de l’arrêt de tramway.',
				tf2Q: 'Le père de famille a récupéré le dossier intact deux heures plus tard.',
				tf2A: 'Vrai',
				refWord: 'l’objet',
				refAns: 'le sac oublié contenant le dossier médical',
				lexQ: 'Relevez du texte un synonyme de « rendre » et une qualité morale de Yacine.',
				lexA: 'Synonyme : restituer (ou remettre) | Qualité morale : honnêteté (ou civisme).',
				mcqCorrect: 'Un collégien d’Oran a fait preuve d’honnêteté en remettant à la police un sac contenant un dossier médical urgent.',
				mcqD1: 'Un père de famille a perdu son sac dans un avion à Alger.',
				mcqD2: 'Yacine a gardé le sac chez lui pendant une semaine.',
				mcqD3: 'Le sac ne contenait que des journaux anciens.'
			},
			{
				title: 'Mobilisation citoyenne à Béjaïa : trois tonnes de plastique collectées sur le littoral',
				paragraphs: [
					'Vendredi matin, plus de deux cents volontaires de tous âges se sont rassemblés sur les plages de la côte est de Béjaïa pour une grande opération de nettoyage. Munis de gants et de sacs biodégradables, les participants ont trié et collecté près de trois tonnes de déchets plastiques en quatre heures.',
					'Les déchets recyclables ont été immédiatement acheminés vers un centre de valorisation. [[Cette initiative]] vise à protéger les espèces marines et à sensibiliser les familles au respect de la propreté du littoral algérien.'
				],
				source: 'D’après une revue algérienne de l’environnement, mai 2025',
				glossary: [
					{ term: 'littoral', meaning: 'zone côtière au bord de la mer' },
					{ term: 'acheminer', meaning: 'transporter vers une destination précise' }
				],
				q1: 'Quelle quantité de déchets les volontaires ont-ils collectée à Béjaïa ?',
				a1: 'Ils ont collecté près de trois tonnes de déchets plastiques en quatre heures.',
				q2: 'Quel est le double objectif de cette initiative citoyenne ?',
				a2: 'Protéger les espèces marines et sensibiliser les familles à la propreté du littoral.',
				gridRows: [
					{ label: 'Qui ?', val: 'Plus de deux cents volontaires de tous âges' },
					{ label: 'Quoi ?', val: 'Collecte et tri de trois tonnes de déchets plastiques' },
					{ label: 'Où et Quand ?', val: 'Sur les plages de la côte est de Béjaïa, vendredi matin' }
				],
				tf1Q: 'Les déchets recyclables ont été abandonnés sur le sable.',
				tf1A: 'Faux',
				tf1C: 'Ils ont été immédiatement acheminés vers un centre de valorisation.',
				tf2Q: 'Les volontaires portaient des gants et utilisaient des sacs biodégradables.',
				tf2A: 'Vrai',
				refWord: 'Cette initiative',
				refAns: 'la grande opération de nettoyage des plages de Béjaïa',
				lexQ: 'Relevez du texte le nom dérivé du verbe « nettoyer » et deux mots du champ lexical de la mer.',
				lexA: 'Nom dérivé : nettoyage | Champ lexical de la mer : plages, côte, littoral, espèces marines (deux au choix).',
				mcqCorrect: 'Plus de 200 volontaires ont collecté trois tonnes de plastique sur les plages de Béjaïa pour protéger la mer.',
				mcqD1: 'Les plages de Béjaïa ont été fermées aux bénévoles.',
				mcqD2: 'Seuls dix volontaires ont participé à l’action en une semaine.',
				mcqD3: 'Les déchets plastiques ont été jetés dans la mer.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'تحقّق من الحدث الرئيسي المذكور في الفقرة الأولى.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه المعلومة لا تطابق معطيات الخبر الصحفي.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة الفقرة الثانية لتصحيح الفهم.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quel énoncé résume fidèlement le fait divers « ${v.title} » ?`,
				questionTextAr: `ما الملخص المطابق للخبر الصحفي « ${v.title} »؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit (07 pts)',
				points: 7,
				instruction: 'Lisez attentivement le texte puis répondez aux questions suivantes :',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						numberedParagraphs: true,
						glossary: v.glossary
					}),
					{
						type: 'text',
						content: '1) Complétez la grille du fait divers à partir du texte (01.5 pt) :'
					},
					{
						type: 'table',
						headers: ['Élément', 'Réponse tirée du texte'],
						cells: [],
						rows: v.gridRows.map((r) => [
							{ content: r.label, bold: true },
							{ content: '....................................', answer: r.val, mark: '0.5' }
						]),
						align: 'left',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `2) Répondez aux questions suivantes (02 pts) :\n  a) ${v.q1}\n  b) ${v.q2}`,
						answer: `a) ${v.a1}\nb) ${v.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C, mark: '0.75' },
							{ q: v.tf2Q, a: v.tf2A, mark: '0.75' }
						]
					},
					{
						type: 'text',
						content: `4) Que remplace l’expression soulignée « ${v.refWord} » dans le texte ? (01 pt)`,
						answer: `« ${v.refWord} » remplace : ${v.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `5) ${v.lexQ} (01 pt)`,
						answer: v.lexA,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الإجابات عن Qui / Quoi / Où et Quand من الفقرة الأولى مباشرة.',
				'عند الإجابة بـ Faux، اكتب الجملة المصحّحة من النص.',
				'تأكّد من الصنف النحوي المطلوب في سؤال المعجم (اسم، فعل، صفة).'
			],
			solutionStepsAr: [
				v.gridRows.map((r) => `${r.label} ${r.val}`).join(' | '),
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (6 pts) — Nominalisation & Voix passive
// ═══════════════════════════════════════════════════════════════════════════════
const langNominalisationPassif3amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t1_lang_nominalisation_passif',
	grade: '3am',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (3AM): تحويل العناوين للاسمية والمبني للمجهول وعائلة الكلمات (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t1_voix_active_passive',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				nom1Q: 'a) Les volontaires reboisent les collines de Blida.',
				nom1A: 'a) Reboisement des collines de Blida par les volontaires.',
				nom2Q: 'b) On a inauguré une nouvelle bibliothèque communale à Tlemcen.',
				nom2A: 'b) Inauguration d’une nouvelle bibliothèque communale à Tlemcen.',
				pas1Q: 'a) Les agents de la Protection Civile ont secouru la famille.',
				pas1A: 'a) La famille a été secourue par les agents de la Protection Civile.',
				pas2Q: 'b) Les collégiens protègent les forêts algériennes.',
				pas2A: 'b) Les forêts algériennes sont protégées par les collégiens.',
				wfRows: [
					{
						verbe: { given: true, value: 'sauver' },
						nom: { value: 'le sauvetage', mark: '0.5' },
						adjectif: { value: 'sauf (sauvé)', mark: '0.5' }
					},
					{
						verbe: { value: 'protéger', mark: '0.5' },
						nom: { given: true, value: 'la protection' },
						adjectif: { value: 'protecteur (protégé)', mark: '0.5' }
					}
				],
				mcqQ: 'Quelle est la transformation correcte à la voix passive de : « Les pompiers ont maîtrisé les flammes. » ?',
				mcqCorrect: 'Les flammes ont été maîtrisées par les pompiers.',
				mcqD1: 'Les flammes sont maîtrisées par les pompiers.',
				mcqD2: 'Les flammes a été maîtrisée par les pompiers.',
				mcqD3: 'Les flammes ont été maîtrisé par les pompiers.'
			},
			{
				nom1Q: 'a) Les secouristes ont sauvé deux pêcheurs près d’Oran.',
				nom1A: 'a) Sauvetage de deux pêcheurs près d’Oran par les secouristes.',
				nom2Q: 'b) La commune a fermé la route enneigée par précaution.',
				nom2A: 'b) Fermeture de la route enneigée par précaution par la commune.',
				pas1Q: 'a) Des scouts ont distribué des couvertures chaudes.',
				pas1A: 'a) Des couvertures chaudes ont été distribuées par des scouts.',
				pas2Q: 'b) On a retrouvé le dossier médical à la gare.',
				pas2A: 'b) Le dossier médical a été retrouvé à la gare.',
				wfRows: [
					{
						verbe: { given: true, value: 'nettoyer' },
						nom: { value: 'le nettoyage', mark: '0.5' },
						adjectif: { value: 'net (nettoyé)', mark: '0.5' }
					},
					{
						verbe: { value: 'solidariser', mark: '0.5' },
						nom: { given: true, value: 'la solidarité' },
						adjectif: { value: 'solidaire', mark: '0.5' }
					}
				],
				mcqQ: 'Quel titre nominal correspond correctement à : « On a ouvert un centre de secours à Béjaïa. » ?',
				mcqCorrect: 'Ouverture d’un centre de secours à Béjaïa',
				mcqD1: 'Ouvrage d’un centre de secours à Béjaïa',
				mcqD2: 'Ouvrir un centre de secours à Béjaïa',
				mcqD3: 'Un centre de secours ouvre à Béjaïa'
			},
			{
				nom1Q: 'a) Les bénévoles nettoient les sentiers du parc national.',
				nom1A: 'a) Nettoyage des sentiers du parc national par les bénévoles.',
				nom2Q: 'b) Les policiers ont arrêté un conducteur imprudent.',
				nom2A: 'b) Arrestation d’un conducteur imprudent par les policiers.',
				pas1Q: 'a) Le jury a récompensé les jeunes inventeurs de Constantine.',
				pas1A: 'a) Les jeunes inventeurs de Constantine ont été récompensés par le jury.',
				pas2Q: 'b) La solidarité renforce les liens entre les voisins.',
				pas2A: 'b) Les liens entre les voisins sont renforcés par la solidarité.',
				wfRows: [
					{
						verbe: { given: true, value: 'reboiser' },
						nom: { value: 'le reboisement', mark: '0.5' },
						adjectif: { value: 'boisé (reboisé)', mark: '0.5' }
					},
					{
						verbe: { value: 'secourir', mark: '0.5' },
						nom: { given: true, value: 'le secours' },
						adjectif: { value: 'secourable (secouru)', mark: '0.5' }
					}
				],
				mcqQ: 'Quelle est la voix passive correcte de : « On a planté mille oliviers à Tizi Ouzou. » ?',
				mcqCorrect: 'Mille oliviers ont été plantés à Tizi Ouzou.',
				mcqD1: 'Mille oliviers ont été plantés par on à Tizi Ouzou.',
				mcqD2: 'Mille oliviers sont plantés à Tizi Ouzou.',
				mcqD3: 'Mille oliviers a été planté à Tizi Ouzou.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'انتبه لزمن الفعل الأصلي ولحذف الضمير (on) في المبني للمجهول.' },
				{ text: s.mcqD2, diagnosticFeedback: 'تحقّق من تطابق الفاعل مع الفعل ومن اشتقاق الاسم الصحيح.' },
				{ text: s.mcqD3, diagnosticFeedback: 'راجع توافق اسم المفعول مع الفاعل الجديد في المبني للمجهول.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر التحويل النحوي الصحيح وفق برنامج 3AM:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: s.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue (06 pts)',
				points: 6,
				instruction: 'Effectuez les transformations et complétez le tableau lexical ci-dessous :',
				content: [
					{
						type: 'text',
						content: `1) Transformez les phrases verbales suivantes en titres nominaux (02 pts) :\n  ${s.nom1Q}\n  ${s.nom2Q}`,
						answer: `${s.nom1A}\n${s.nom2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) Mettez les phrases suivantes à la voix passive en faisant attention aux accords (02 pts) :\n  ${s.pas1Q}\n  ${s.pas2Q}`,
						answer: `${s.pas1A}\n${s.pas2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: '3) Complétez le tableau de dérivation suivant (02 pts) :'
					},
					buildFrenchWordFamilyTableBlock(s.wfRows)
				]
			},
			hints: [
				'في الـ Nominalisation نحذف الفعل المصرف ونحوله إلى اسم مشتق (-tion, -ment, -age, -ure).',
				'في المبني للمجهول نُبقي المساعد être في نفس زمن الجملة الأصلية ونُطابق اسم المفعول مع الفاعل الجديد.',
				'عندما يكون الفاعل (On) يُحذف تماماً في المبني للمجهول (لا نكتب أبداً par on).'
			],
			solutionStepsAr: [
				`العناوين الاسمية: ${s.nom1A} | ${s.nom2A}`,
				`المبني للمجهول: ${s.pas1A} | ${s.pas2A}`,
				`إكمال جدول الاشتقاق: ${s.wfRows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' ; ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (6 pts) — Passé composé, accords & lexique
// ═══════════════════════════════════════════════════════════════════════════════
const langPasseComposeLexique3amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t1_lang_passe_compose_lexique',
	grade: '3am',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة (3AM): الماضي المركّب وتوافق اسم المفعول والحقل المعجمي للخبر (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t1_passe_compose_accord',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				pc1Q: 'a) Hier matin, les équipes de secours (arriver) ............ très vite sur les lieux.',
				pc1A: 'a) Hier matin, les équipes de secours sont arrivées très vite sur les lieux.',
				pc2Q: 'b) Les bénévoles (offrir) ............ des vivres aux familles isolées.',
				pc2A: 'b) Les bénévoles ont offert des vivres aux familles isolées.',
				pc3Q: 'c) Les couvertures que les scouts (distribuer) ............ ont protégé les enfants du froid.',
				pc3A: 'c) Les couvertures que les scouts ont distribuées ont protégé les enfants du froid.',
				accQ: 'Accordez correctement les participes passés entre parenthèses :\n  « La route enneigée a été (dégager) ............ et les voitures (bloquer) ............ ont repris leur chemin. »',
				accA: 'La route enneigée a été dégagée et les voitures bloquées ont repris leur chemin.',
				words: ['secouriste', 'samedi dernier', 'Tikjda', 'sauvetage', 'à l’aube', 'Béjaïa'],
				col1: { header: 'Lexique du secours', items: ['secouriste', 'sauvetage'] },
				col2: { header: 'Indicateurs de temps', items: ['samedi dernier', 'à l’aube'] },
				col3: { header: 'Indicateurs de lieu', items: ['Tikjda', 'Béjaïa'] },
				mcqQ: 'Choisissez la phrase correctement accordée au passé composé :',
				mcqCorrect: 'Les cèdres que les collégiens ont plantés poussent bien.',
				mcqD1: 'Les cèdres que les collégiens ont planté poussent bien.',
				mcqD2: 'Les collégiens ont plantés deux mille cèdres.',
				mcqD3: 'Les équipes de secours ont arrivé tôt.'
			},
			{
				pc1Q: 'a) Les volontaires (se mobiliser) ............ dès l’aube pour nettoyer la plage.',
				pc1A: 'a) Les volontaires se sont mobilisés (ou mobilisées) dès l’aube pour nettoyer la plage.',
				pc2Q: 'b) La Protection Civile (prendre) ............ toutes les mesures nécessaires.',
				pc2A: 'b) La Protection Civile a pris toutes les mesures nécessaires.',
				pc3Q: 'c) La forêt que les citoyens (protéger) ............ reste verte.',
				pc3A: 'c) La forêt que les citoyens ont protégée reste verte.',
				accQ: 'Accordez correctement les participes passés entre parenthèses :\n  « Les victimes (retrouver) ............ saines et sauves sont (rentrer) ............ chez elles. »',
				accA: 'Les victimes retrouvées saines et sauves sont rentrées chez elles.',
				words: ['bénévolat', 'hier soir', 'Chréa', 'entraide', 'le 12 février', 'Constantine'],
				col1: { header: 'Lexique de la solidarité', items: ['bénévolat', 'entraide'] },
				col2: { header: 'Indicateurs de temps', items: ['hier soir', 'le 12 février'] },
				col3: { header: 'Indicateurs de lieu', items: ['Chréa', 'Constantine'] },
				mcqQ: 'Complétez correctement : « Les aides que la commune a ...... ont soulagé le village. »',
				mcqCorrect: 'envoyées',
				mcqD1: 'envoyé',
				mcqD2: 'envoyés',
				mcqD3: 'envoyée'
			},
			{
				pc1Q: 'a) Les scouts algériens (partir) ............ très tôt vers les villages de montagne.',
				pc1A: 'a) Les scouts algériens sont partis très tôt vers les villages de montagne.',
				pc2Q: 'b) Yacine (remettre) ............ le sac médical au poste de police.',
				pc2A: 'b) Yacine a remis le sac médical au poste de police.',
				pc3Q: 'c) Les lettres de remerciement que les habitants (écrire) ............ ont ému les jeunes.',
				pc3A: 'c) Les lettres de remerciement que les habitants ont écrites ont ému les jeunes.',
				accQ: 'Accordez correctement les participes passés entre parenthèses :\n  « Les plages (nettoyer) ............ par les jeunes sont (devenir) ............ impeccables. »',
				accA: 'Les plages nettoyées par les jeunes sont devenues impeccables.',
				words: ['reboisement', 'vendredi matin', 'Djurdjura', 'biodiversité', 'en hiver', 'Oran'],
				col1: { header: 'Lexique de l’écologie', items: ['reboisement', 'biodiversité'] },
				col2: { header: 'Indicateurs de temps', items: ['vendredi matin', 'en hiver'] },
				col3: { header: 'Indicateurs de lieu', items: ['Djurdjura', 'Oran'] },
				mcqQ: 'Choisissez le bon auxiliaire et le bon accord : « Les secours ...... à temps sur les lieux. »',
				mcqCorrect: 'sont intervenus',
				mcqD1: 'ont intervenu',
				mcqD2: 'sont intervenu',
				mcqD3: 'est intervenus'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'راجع موقع المفعول به المباشر (COD) واختيار المساعد الصحيح.' },
				{ text: s.mcqD2, diagnosticFeedback: 'تأكّد من جنس وعدد الاسم الذي يتوافق معه اسم المفعول.' },
				{ text: s.mcqD3, diagnosticFeedback: 'انتبه لتصريف الفعل المساعد être في الجمع (sont).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر التصريف والتوافق الصحيح في الماضي المركّب:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${s.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue (06 pts)',
				points: 6,
				instruction: 'Répondez aux exercices de conjugaison, d’orthographe et de lexique suivants :',
				content: [
					{
						type: 'text',
						content: `1) Conjuguez les verbes entre parenthèses au passé composé en veillant à l’accord du participe passé (03 pts) :\n  ${s.pc1Q}\n  ${s.pc2Q}\n  ${s.pc3Q}`,
						answer: `${s.pc1A}\n${s.pc2A}\n${s.pc3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) ${s.accQ} (01.5 pt)`,
						answer: s.accA,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) Classez les mots et expressions suivants dans le tableau (01.5 pt) :\nListe : ${s.words.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: s.col1.header, items: s.col1.items, mark: '0.5' },
							{ header: s.col2.header, items: s.col2.items, mark: '0.5' },
							{ header: s.col3.header, items: s.col3.items, mark: '0.5' }
						]
					})
				]
			},
			hints: [
				'مع المساعد être يتوافق اسم المفعول دائماً مع الفاعل.',
				'مع المساعد avoir يتوافق اسم المفعول فقط إذا سبق الـ COD الفعل (مثل الضمير que).',
				'ميّز بين مؤشرات الزمان (Quand) ومؤشرات المكان (Où) والكلمات المعجمية.'
			],
			solutionStepsAr: [
				`${s.pc1A} | ${s.pc2A} | ${s.pc3A}`,
				s.accA,
				`${s.col1.header}: ${s.col1.items.join(', ')} | ${s.col2.header}: ${s.col2.items.join(', ')} | ${s.col3.header}: ${s.col3.items.join(', ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (7 pts) — Rédiger un fait divers (solidarité / secours)
// ═══════════════════════════════════════════════════════════════════════════════
const writeFaitDivers3amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t1_write_fait_divers',
	grade: '3am',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة خبر صحفي حول الإنقاذ أو التضامن في الجزائر (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t1_rediger_fait_divers',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				theme: 'Sauvetage d’une famille bloquée par la neige',
				notes: [
					'Qui ? Les éléments de la Protection Civile et des jeunes bénévoles',
					'Quoi ? Sauvetage d’une famille bloquée dans sa voiture par une tempête de neige',
					'Où ? Sur la route nationale reliant Bouira à Tikjda',
					'Quand ? Jeudi soir, vers 19 h',
					'Comment / Résultat ? Intervention rapide, route dégagée, toute la famille retrouvée saine et sauve',
					'Consignes linguistiques : Donnez un titre nominal, employez le passé composé et au moins une phrase à la voix passive.'
				],
				modelAnswer:
					'Sauvetage réussi d’une famille bloquée par la neige près de Tikjda\nJeudi soir, vers dix-neuf heures, une famille dont le véhicule était bloqué par la neige sur la route reliant Bouira à Tikjda a été secourue par la Protection Civile et des jeunes bénévoles.\nAlertés rapidement par des automobilistes, les secouristes ont bravé le vent glacial pour atteindre la voiture. La route a été dégagée grâce aux engins communaux et à l’entraide des habitants. Vers vingt-et-une heures, les parents et leurs deux enfants ont été conduits dans un abri chauffé, sains et saufs. Ce bel acte de solidarité a été chaleureusement salué par toute la région.\n(Journal scolaire, janvier 2025)'
			},
			{
				theme: 'Campagne de solidarité et collecte scolaire pour les élèves démunis',
				notes: [
					'Qui ? Les collégiens, leurs enseignants et les parents d’élèves',
					'Quoi ? Collecte et distribution de cartables, livres et manteaux d’hiver',
					'Où ? Dans un collège de la wilaya de Tlemcen',
					'Quand ? La semaine dernière, à l’occasion de la rentrée hivernale',
					'Comment / Résultat ? Plus de quatre-vingts élèves aidés dans la discrétion et la fraternité',
					'Consignes linguistiques : Donnez un titre nominal, utilisez un chapeau court, le passé composé et une phrase passive.'
				],
				modelAnswer:
					'Belle opération de solidarité scolaire dans un collège de Tlemcen\nLa semaine dernière, les élèves, les enseignants et les parents d’un collège de Tlemcen ont organisé une grande collecte de fournitures scolaires et de manteaux d’hiver.\nDurant trois jours, des dizaines de cartables, de cahiers et de vêtements chauds ont été rassemblés dans la salle polyvalente par le club de solidarité. Plus de quatre-vingts élèves issus de familles modestes ont reçu ces kits dans le respect et la fraternité. Le directeur a félicité les collégiens pour leur esprit civique exemplaire.\n(La Gazette du Collège, décembre 2025)'
			},
			{
				theme: 'Reboisement d’une forêt incendiée à Jijel',
				notes: [
					'Qui ? Trois cents scouts, collégiens et agents des forêts',
					'Quoi ? Plantation de mille cinq cents jeunes chênes et oliviers',
					'Où ? Sur les collines boisées de la wilaya de Jijel',
					'Quand ? Samedi dernier, de 8 h à 15 h',
					'Comment / Résultat ? Reboisement réussi d’une parcelle dégradée et sensibilisation des jeunes à l’écologie',
					'Consignes linguistiques : Titre nominal obligatoire, emploi de la 3e personne, du passé composé et de la voix passive.'
				],
				modelAnswer:
					'Plantation de mille cinq cents arbres sur les collines de Jijel\nSamedi dernier, trois cents scouts, collégiens et agents des forêts se sont mobilisés de huit heures à quinze heures pour reboiser une parcelle dégradée de la wilaya de Jijel.\nEncadrés par des techniciens forestiers, les jeunes volontaires ont creusé et arrosé chaque plant avec soin. Mille cinq cents jeunes chênes et oliviers ont été plantés en une seule journée dans une ambiance enthousiaste. Cette initiative écologique a permis de redonner vie à la colline et de sensibiliser la jeunesse à la protection de la nature.\n(Écho de la Nature, novembre 2025)'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Un titre nominal, un chapeau résumant Qui/Quoi/Où/Quand, le passé composé, la 3e personne et une phrase à la voix passive.',
			[
				{ text: 'Un dialogue imaginaire entre deux animaux au futur simple.', diagnosticFeedback: 'الخبر الصحفي ينقل حدثاً واقعياً بضمير الغائب وفي الماضي المركّب.' },
				{ text: 'Une liste de mots sans verbes ni ponctuation.', diagnosticFeedback: 'المطلوب نص صحفي متماسك من 8 إلى 10 أسطر.' },
				{ text: 'Un récit personnel écrit uniquement avec le pronom « Je » sans titre.', diagnosticFeedback: 'الخبر الصحفي يتطلب عنواناً اسمياً والكتابة بضمير الغائب.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Quels éléments sont indispensables pour réussir la rédaction d’un fait divers en 3AM ?',
				questionTextAr: 'ما العناصر الأساسية للنجاح في كتابة خبر صحفي (fait divers) في 3AM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'عنوان اسمي، تمهيد مختصر، ضمير الغائب، الماضي المركّب، وجملة في المبني للمجهول.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration (07 pts)',
				points: 7,
				instruction: 'Rédigez un fait divers cohérent (8 à 10 lignes) destiné au journal de votre collège :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: `Situation d’intégration (${item.theme}) :`,
						sujetUnPrompt:
							'À partir des informations de la grille ci-dessous, rédigez un fait divers complet comprenant un titre nominal, un chapeau et un court développement.',
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et respect de la grille (2 pts) + Structure du fait divers : titre nominal, chapeau, corps (1.5 pt) + Correction linguistique : passé composé, voix passive, accords (2.5 pts) + Présentation et ponctuation (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'ابدأ بعنوان اسمي موجز دون فعل مصرف (مثل: Sauvetage réussi... / Plantation de...).',
				'لخّص Qui و Quoi و Où و Quand في التمهيد (chapeau) ثم فصّل في الفقرة الثانية.',
				'اكتب بضمير الغائب (il / ils) وأدرج جملة واحدة على الأقل في المبني للمجهول (a été / ont été + P.P).'
			],
			solutionStepsAr: [
				`الموضوع: ${item.theme}`,
				'بناء عنوان اسمي وتمهيد يجيب عن الأسئلة الأربعة للصحفي.',
				'استعمال الماضي المركّب والمبني للمجهول ومراجعة توافق اسم المفعول.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T1: FrenchParameterizedTemplate[] = [
	compSecoursSolidarite3amT1,
	compExploitCivique3amT1,
	langNominalisationPassif3amT1,
	langPasseComposeLexique3amT1,
	writeFaitDivers3amT1
];
