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
// 5 Parameterized Templates — 1AS TCL Trimester 3 (Points split: 7 + 6 + 7 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
// Projet 3 : La nouvelle réaliste morale et le fait divers algérien
// ============================================================================

// 1. Compréhension 1 — La nouvelle réaliste morale (7 pts)
const tpl1asTclT3NouvelleRealisteComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t3_nouvelle_realiste_comp',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — القصة القصيرة الواقعية الهادفة (الخزّاف، الخطّاط، والدفتر الضائع)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t3_schema_narratif_focalisation',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'La leçon de patience du maître calligraphe',
				source: 'Nouvelles Réalistes Algériennes (texte original adapté)',
				paragraphs: [
					'Dans une ruelle paisible de la vieille ville de Tlemcen se trouvait l’atelier modeste de Maître Othmane. C’était un homme âgé au visage serein, à la barbe argentée et au regard vif comme une étincelle. D’une patience infinie et d’une grande modestie, il accueillait chaque samedi de jeunes élèves venus apprendre l’art de la calligraphie arabe.',
					'Sur sa table de cèdre s’alignaient des roseaux taillés, des flacons d’encre noire, des feuilles épaisses et des règles en bois. Un matin, le jeune Hamza, pressé de réussir dès le premier essai, tacha sa feuille et soupira de découragement. « Je n’y arriverai jamais, Maître ! murmura-t-il en baissant la tête. — La patience est un pont vers la maîtrise, mon fils, répondit doucement [[le vieil artisan]]. Recommence avec calme. »',
					'Touché par ces paroles apaisantes, Hamza respira profondément, tint son roseau avec soin et traça enfin une ligne harmonieuse. Il sourit avec fierté, ignorant encore que [[cette matinée simple]] lui enseignerait la règle la plus précieuse de sa vie : tout beau travail naît de la persévérance.'
				],
				glossary: [
					{ term: 'roseau taillé', meaning: 'calame traditionnel servant à écrire la calligraphie' },
					{ term: 'harmonieux', meaning: 'bien proportionné, équilibré et agréable à regarder' }
				],
				tfItems: [
					{
						q: 'L’atelier de Maître Othmane se situe dans la vieille ville de Tlemcen.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Maître Othmane a grondé sévèrement Hamza lorsqu’il a taché sa feuille.',
						a: 'Faux',
						c: 'Il lui a répondu doucement pour l’encourager à recommencer avec calme.',
						mark: '0.5'
					},
					{
						q: 'Grâce aux conseils du maître, Hamza a réussi à tracer une ligne harmonieuse.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Relevez au paragraphe 1 deux traits du portrait physique et deux traits du portrait moral de Maître Othmane.',
				a1: 'Portrait physique : homme âgé, visage serein, barbe argentée, regard vif (deux au choix). Portrait moral : patience infinie, grande modestie.',
				q2: 'Relevez dans le texte une comparaison (§1), une métaphore (§2) et une énumération (§2).',
				a2: 'Comparaison : « regard vif comme une étincelle ». Métaphore : « La patience est un pont vers la maîtrise ». Énumération : « des roseaux taillés, des flacons d’encre noire, des feuilles épaisses et des règles en bois ».',
				q3: 'Quel est le point de vue du narrateur à la fin du récit (« ignorant encore que... ») ? Justifiez.',
				a3: 'C’est le point de vue omniscient (focalisation zéro) car le narrateur connaît le futur de Hamza que le personnage lui-même ignore encore.',
				ref1Word: 'le vieil artisan (§2)',
				ref1Ans: 'Maître Othmane (le maître calligraphe)',
				ref2Word: 'cette matinée simple (§3)',
				ref2Ans: 'la séance de calligraphie où Hamza a appris la patience',
				viseeCorrect: 'Raconter une scène réaliste de transmission artisanale pour enseigner la valeur de la patience',
				viseeDistractors: [
					{
						text: 'Expliquer la composition chimique de l’encre noire',
						diagnosticFeedback: 'L’encre est simplement citée dans la description de la table.'
					},
					{
						text: 'Rédiger une lettre ouverte demandant la fermeture des ateliers anciens',
						diagnosticFeedback: 'Ce texte est une nouvelle réaliste valorisant l’artisanat.'
					},
					{
						text: 'Dénoncer le manque d’intérêt des jeunes pour l’école',
						diagnosticFeedback: 'Au contraire, Hamza fréquente volontairement l’atelier chaque samedi.'
					}
				],
				themeSummary: 'la transmission patiente de la calligraphie et la valeur de la persévérance'
			},
			{
				title: 'Le carnet d’esquisses retrouvé à Annaba',
				source: 'Recueil de Nouvelles Morales Contemporaines (texte original adapté)',
				paragraphs: [
					'Un après-midi de printemps, Meriem marchait le long du cours de la Révolution à Annaba. C’était une lycéenne discrète aux yeux attentifs, toujours vêtue d’un manteau sobre et connue de ses camarades pour sa droiture exemplaire.',
					'Soudain, près d’une librairie, elle remarqua un vieux carnet relié en toile bleue glissé sous un banc. En l’ouvrant délicatement, [[la jeune fille]] découvrit de magnifiques dessins des monuments anciens de la ville ainsi que l’adresse d’un architecte retraité. Sans hésiter, elle se rendit aussitôt à l’adresse indiquée. « Ce carnet est le trésor de toute ma carrière ! s’exclama l’homme âgé, les yeux brillants d’émotion. Comment vous remercier ? — Rendre un bien qui ne m’appartient pas est un simple devoir, Monsieur », répondit Meriem avec un sourire calme.',
					'Le vieil architecte lui offrit un beau livre sur le patrimoine algérien en guise de gratitude. Sur le chemin du retour, [[ce geste sincère]] emplit le cœur de Meriem d’une joie sereine telle une douce lumière d’avril.'
				],
				glossary: [
					{ term: 'esquisses', meaning: 'premiers dessins rapides préparatoires d’un monument ou d’un paysage' },
					{ term: 'en guise de', meaning: 'pour servir de, en signe de' }
				],
				tfItems: [
					{
						q: 'Meriem a trouvé le carnet d’esquisses près d’une librairie à Annaba.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Le carnet appartenait à un élève qui avait oublié ses exercices de mathématiques.',
						a: 'Faux',
						c: 'Il appartenait à un architecte retraité et contenait des dessins des monuments anciens.',
						mark: '0.5'
					},
					{
						q: 'Meriem a considéré son acte d’honnêteté comme un simple devoir moral.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Comment Meriem a-t-elle réussi à retrouver le propriétaire du carnet (§2) ?',
				a1: 'En ouvrant le carnet, elle a trouvé l’adresse de l’architecte retraité et s’y est rendue aussitôt.',
				q2: 'Relevez dans le texte deux verbes de parole différents (§2) et une comparaison (§3).',
				a2: 'Verbes de parole : « s’exclama » et « répondit ». Comparaison : « une joie sereine telle une douce lumière d’avril ».',
				q3: 'Relevez une métaphore dans les paroles de l’architecte (§2) et expliquez ce qu’elle montre.',
				a3: '« Ce carnet est le trésor de toute ma carrière ! » : elle montre la valeur sentimentale et professionnelle immense de ce carnet.',
				ref1Word: 'la jeune fille (§2)',
				ref1Ans: 'Meriem (la lycéenne)',
				ref2Word: 'ce geste sincère (§3)',
				ref2Ans: 'la restitution honnête du carnet et le remerciement de l’architecte',
				viseeCorrect: 'Raconter un épisode réaliste mettant en lumière la droiture et le désintéressement d’une jeune fille',
				viseeDistractors: [
					{
						text: 'Donner un cours d’architecture moderne sur les ponts suspendus',
						diagnosticFeedback: 'Il s’agit d’une nouvelle réaliste morale, non d’un texte technique.'
					},
					{
						text: 'Critiquer le manque de librairies dans la ville d’Annaba',
						diagnosticFeedback: 'Aucune critique des librairies n’apparaît dans le texte.'
					},
					{
						text: 'Présenter les résultats d’un sondage sur les loisirs des retraités',
						diagnosticFeedback: 'Le texte ne contient ni chiffres ni sondage.'
					}
				],
				themeSummary: 'l’honnêteté désintéressée d’une lycéenne retrouvant le carnet d’un architecte'
			},
			{
				title: 'Les mains d’or de la potière des montagnes',
				source: 'Récits du Terroir et des Valeurs (texte original adapté)',
				paragraphs: [
					'Dans un village perché sur les hauteurs verdoyantes de Kabylie vivait Khalti Yamina, une potière respectée de tous. Malgré son âge avancé, elle gardait une silhouette droite, un sourire franc et des mains agiles qui façonnaient l’argile comme une dentelle fine.',
					'Chaque été, elle rassemblait les jeunes filles du village sous la véranda fraîche où s’empilaient des cruches, des plats peints, des lampes d’argile et des bols décorés de motifs géométriques. Un jour, sa petite-fille Ines lui demanda avec curiosité : « Grand-mère, pourquoi continues-tu à travailler l’argile alors que les ustensiles modernes coûtent moins cher ? — Parce que chaque poterie est une page vivante de notre mémoire, répondit fièrement [[la vieille dame]]. Un savoir-faire oublié est une richesse perdue. »',
					'Dès cet instant, Ines observa chaque geste avec une attention nouvelle et décida d’apprendre cet art ancestral. [[Ce dialogue simple]] venait de tisser un lien durable entre deux générations.'
				],
				glossary: [
					{ term: 'façonner', meaning: 'modeler et donner forme avec habileté à une matière comme l’argile' },
					{ term: 'ancestral', meaning: 'hérité des ancêtres et transmis de génération en génération' }
				],
				tfItems: [
					{
						q: 'Khalti Yamina transmettait son art traditionnel aux jeunes filles de son village.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Ines pensait au début que la poterie traditionnelle était moins chère que les ustensiles modernes.',
						a: 'Faux',
						c: 'Elle remarquait au contraire que les ustensiles modernes coûtent moins cher.',
						mark: '0.5'
					},
					{
						q: 'À la fin du récit, Ines décide d’apprendre à son tour le métier de sa grand-mère.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Selon Khalti Yamina, pourquoi est-il important de continuer à pratiquer la poterie traditionnelle (§2) ?',
				a1: 'Parce que chaque poterie est une page vivante de la mémoire collective et qu’un savoir-faire oublié est une richesse perdue.',
				q2: 'Relevez dans le texte une comparaison (§1), une énumération (§2) et une métaphore (§2).',
				a2: 'Comparaison : « façonnaient l’argile comme une dentelle fine ». Énumération : « des cruches, des plats peints, des lampes d’argile et des bols ». Métaphore : « chaque poterie est une page vivante de notre mémoire ».',
				q3: 'Relevez dans le paragraphe 1 deux éléments du portrait physique de Khalti Yamina.',
				a3: 'Une silhouette droite, un sourire franc, des mains agiles (deux au choix).',
				ref1Word: 'la vieille dame (§2)',
				ref1Ans: 'Khalti Yamina (la potière)',
				ref2Word: 'Ce dialogue simple (§3)',
				ref2Ans: 'l’échange entre Ines et sa grand-mère sur la valeur du patrimoine artisanal',
				viseeCorrect: 'Raconter une rencontre réaliste entre générations pour valoriser la transmission du patrimoine artisanal',
				viseeDistractors: [
					{
						text: 'Expliquer la formule chimique de cuisson de l’argile en four électrique',
						diagnosticFeedback: 'Aucune explication chimique ou industrielle ne figure dans cette nouvelle.'
					},
					{
						text: 'Convaincre les villageois d’abandonner les métiers traditionnels',
						diagnosticFeedback: 'La nouvelle défend précisément la sauvegarde du savoir-faire ancestral.'
					},
					{
						text: 'Relater un accident de la route survenu en montagne',
						diagnosticFeedback: 'Il ne s’agit pas d’un fait divers d’accident.'
					}
				],
				themeSummary: 'la transmission du savoir-faire artisanal entre générations'
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
						: '1) Dites si ces affirmations sont Vraies ou Fausses :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes à partir de la nouvelle :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
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
						header: '4) Quelle est la visée principale de cette nouvelle réaliste ?',
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
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans la nouvelle réaliste « ${variant.title} », quel message l’auteur souhaite-t-il transmettre ?`,
				questionTextAr: 'حدّد المغزى الأخلاقي من هذه القصة القصيرة الواقعية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Cette nouvelle réaliste célèbre ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement la nouvelle réaliste ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'فرّق بدقة بين البورتريه الجسدي (الملامح الظاهرة) والبورتريه الأخلاقي (الطباع والقيم).',
				'في الصور البلاغية: التشبيه فيه أداة (comme / tel)، والاستعارة بدون أداة، والتعداد يجمع 3 عناصر فأكثر.',
				'لاحظ أفعال القول داخل الحوار (murmura, répondit, s’exclama) لمعرفة نبرة الشخصيات.'
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

// 2. Compréhension 2 — Le fait divers algérien (7 pts)
const tpl1asTclT3FaitDiversAlgerienComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t3_fait_divers_algerien_comp',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — الخبر المتنوع الجزائري (التضامن الشتوي، إنقاذ مخطوطات، وشجاعة مواطنية)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t3_discours_direct_indirect',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Élan de solidarité exemplaire après les chutes de neige à Sétif',
				source: 'Quotidien de l’Est Algérien, 19 janvier 2026 (texte adapté)',
				paragraphs: [
					'Hier matin, après une tempête hivernale qui a bloqué plusieurs routes secondaires dans le nord de la wilaya de Sétif, des dizaines de voyageurs ont été accueillis et secourus grâce à la mobilisation rapide des habitants et des jeunes bénévoles.',
					'Dès l’aube, les villageois ont dégagé les accès à l’aide de pelles et de tracteurs tandis que les familles préparaient des repas chauds, du thé et des couvertures. « Nous ne pouvions pas laisser des familles bloquées dans le froid », a déclaré M. Belkacem, l’un des volontaires. Grâce à [[leur dévouement]], aucun blessé n’a été enregistré.',
					'Vers midi, les équipes des travaux publics ont rouvert la circulation sur l’axe principal. Avant de reprendre la route, les automobilistes ont chaleureusement remercié [[les habitants]] pour cette hospitalité digne des traditions algériennes.'
				],
				glossary: [
					{ term: 'dévouement', meaning: 'engagement généreux et désintéressé au service des autres' },
					{ term: 'hospitalité', meaning: 'accueil chaleureux et généreux offert aux voyageurs' }
				],
				tfItems: [
					{
						q: 'Des chutes de neige ont bloqué plusieurs routes secondaires au nord de Sétif.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les voyageurs bloqués ont dû attendre sans aucun secours ni repas jusqu’au lendemain.',
						a: 'Faux',
						c: 'Les habitants les ont accueillis dès l’aube avec des repas chauds, du thé et des couvertures.',
						mark: '0.5'
					},
					{
						q: 'La circulation sur l’axe principal a été rouverte vers midi.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Comment les villageois et les familles ont-ils aidé les voyageurs bloqués (§2) ?',
				a1: 'Les villageois ont dégagé les accès avec des pelles et des tracteurs, et les familles ont préparé des repas chauds, du thé et des couvertures.',
				q2: 'Relevez dans le texte une phrase au discours direct (§2) et une énumération (§2).',
				a2: 'Discours direct : « Nous ne pouvions pas laisser des familles bloquées dans le froid », a déclaré M. Belkacem. Énumération : « des repas chauds, du thé et des couvertures ».',
				q3: 'Relevez une phrase à la voix passive au paragraphe 1 et donnez le temps dominant du fait divers.',
				a3: 'Voix passive : « des dizaines de voyageurs ont été accueillis et secourus... ». Temps dominant : le passé composé.',
				ref1Word: 'leur dévouement (§2)',
				ref1Ans: 'le dévouement des habitants, des villageois et des jeunes bénévoles',
				ref2Word: 'les habitants (§3)',
				ref2Ans: 'les villageois et familles solidaires du nord de Sétif',
				viseeCorrect: 'Informer sur un élan de solidarité hivernale à Sétif et valoriser l’hospitalité citoyenne',
				viseeDistractors: [
					{
						text: 'Expliquer la formation physique des flocons de neige',
						diagnosticFeedback: 'Cet article est un fait divers et non un texte de météorologie scientifique.'
					},
					{
						text: 'Déconseiller définitivement de voyager dans l’Est algérien',
						diagnosticFeedback: 'Le texte souligne au contraire l’hospitalité et la réouverture rapide de la route.'
					},
					{
						text: 'Raconter une légende antique sur une montagne enneigée',
						diagnosticFeedback: 'Les faits sont réels, datés et localisés.'
					}
				],
				themeSummary: 'la solidarité hivernale des habitants de Sétif envers des voyageurs bloqués'
			},
			{
				title: 'Découverte d’une collection de manuscrits anciens dans une bibliothèque familiale d’Adrar',
				source: 'La Tribune Culturelle du Sud, 11 mars 2026 (texte adapté)',
				paragraphs: [
					'Une trentaine de manuscrits anciens traitant de jurisprudence, d’astronomie et de médecine traditionnelle ont été découverts cette semaine lors de la réorganisation d’une vieille demeure familiale dans un ksar près d’Adrar.',
					'En nettoyant une armoire en bois de palmier scellée depuis plusieurs décennies, un jeune étudiant en lettres a aperçu des coffrets soigneusement enveloppés de tissu. « J’ai immédiatement compris qu’il s’agissait d’un héritage précieux pour toute la région », a expliqué [[le découvreur]] aux journalistes. Il a aussitôt contacté le centre local des manuscrits pour assurer leur conservation.',
					'Les spécialistes qui ont examiné les feuillets estiment que certains ouvrages remontent au XVIIe siècle. Grâce à ce geste responsable, [[ces archives rares]] seront restaurées, numérisées puis mises à la disposition des chercheurs.'
				],
				glossary: [
					{ term: 'scellée', meaning: 'fermée hermétiquement depuis longtemps' },
					{ term: 'feuillets', meaning: 'pages anciennes d’un manuscrit' }
				],
				tfItems: [
					{
						q: 'Les manuscrits ont été découverts dans une maison familiale d’un ksar près d’Adrar.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'L’étudiant a gardé sa découverte secrète et a refusé de contacter les spécialistes.',
						a: 'Faux',
						c: 'Il a aussitôt contacté le centre local des manuscrits pour assurer leur conservation.',
						mark: '0.5'
					},
					{
						q: 'Certains des manuscrits retrouvés dateraient du XVIIe siècle.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels trois domaines de connaissance sont abordés dans les manuscrits découverts (§1) ?',
				a1: 'La jurisprudence, l’astronomie et la médecine traditionnelle.',
				q2: 'Que va-t-on faire de ces manuscrits après l’examen des spécialistes (§3) ?',
				a2: 'Ils seront restaurés, numérisés puis mis à la disposition des chercheurs.',
				q3: 'Relevez la phrase au discours direct (§2) et nommez le verbe de parole utilisé.',
				a3: '« J’ai immédiatement compris qu’il s’agissait d’un héritage précieux pour toute la région », a expliqué le découvreur — verbe de parole : « expliquer » (a expliqué).',
				ref1Word: 'le découvreur (§2)',
				ref1Ans: 'le jeune étudiant en lettres',
				ref2Word: 'ces archives rares (§3)',
				ref2Ans: 'la trentaine de manuscrits anciens découverts',
				viseeCorrect: 'Relater la découverte culturelle de manuscrits anciens et saluer le sens civique d’un étudiant',
				viseeDistractors: [
					{
						text: 'Dénoncer le vol d’ouvrages dans un musée national',
						diagnosticFeedback: 'Il s’agit d’une découverte et d’une remise volontaire pour sauvegarde.'
					},
					{
						text: 'Expliquer comment fabriquer des meubles en bois de palmier',
						diagnosticFeedback: 'L’armoire n’est qu’un détail du lieu de découverte.'
					},
					{
						text: 'Rédiger une lettre ouverte pour demander la fermeture du centre des manuscrits',
						diagnosticFeedback: 'Ce texte est un fait divers journalistique qui valorise le centre.'
					}
				],
				themeSummary: 'la découverte et la sauvegarde de manuscrits anciens près d’Adrar'
			},
			{
				title: 'Sauvetage courageux d’un enfant sur la corniche d’Oran',
				source: 'L’Écho de l’Ouest, 28 mars 2026 (texte adapté)',
				paragraphs: [
					'Vendredi après-midi, un enfant de huit ans qui avait glissé sur des rochers humides près de la corniche d’Oran a été sauvé de justesse grâce à la rapidité d’un jeune maître-nageur bénévole et à l’intervention des agents de la Protection civile.',
					'Alerté par les cris des parents sur la promenade, Sofiane, âgé de vingt ans, a saisi une bouée de secours accrochée au poste de veille et s’est approché prudemment des vagues. « Je suis resté calme pour rassurer le petit garçon avant de le ramener vers la rive », a confié [[le jeune secouriste]]. Quelques minutes plus tard, les ambulanciers ont examiné l’enfant qui s’en est sorti avec une simple frayeur.',
					'Les autorités locales ont salué le sang-froid exemplaire de Sofiane tout en rappelant aux familles de redoubler de vigilance près des rochers glissants. [[Cet acte héroïque]] a suscité l’admiration de nombreux témoins.'
				],
				glossary: [
					{ term: 'de justesse', meaning: 'au tout dernier moment, de peu' },
					{ term: 'sang-froid', meaning: 'capacité à garder son calme et sa lucidité face au danger' }
				],
				tfItems: [
					{
						q: 'L’enfant a glissé sur des rochers humides près de la corniche d’Oran.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'L’enfant a été gravement blessé lors de cet incident.',
						a: 'Faux',
						c: 'Il s’en est sorti avec une simple frayeur après l’examen des ambulanciers.',
						mark: '0.5'
					},
					{
						q: 'Les autorités ont rappelé aux familles d’être prudentes près des rochers glissants.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Comment Sofiane a-t-il été alerté et quel matériel a-t-il utilisé pour le sauvetage (§2) ?',
				a1: 'Il a été alerté par les cris des parents et a utilisé une bouée de secours accrochée au poste de veille.',
				q2: 'Pourquoi Sofiane est-il resté calme pendant l’opération selon ses propres paroles (§2) ?',
				a2: 'Pour rassurer le petit garçon avant de le ramener vers la rive.',
				q3: 'Quel procédé a permis de former le titre de l’article ? Relevez une phrase à la voix passive (§1).',
				a3: 'La nominalisation (phrase nominale sans verbe conjugué : « Sauvetage courageux... »). Voix passive : « un enfant de huit ans (...) a été sauvé de justesse... ».',
				ref1Word: 'le jeune secouriste (§2)',
				ref1Ans: 'Sofiane (le jeune maître-nageur bénévole)',
				ref2Word: 'Cet acte héroïque (§3)',
				ref2Ans: 'le sauvetage courageux de l’enfant par Sofiane',
				viseeCorrect: 'Relater un sauvetage réel sur la corniche d’Oran et sensibiliser les familles à la prudence',
				viseeDistractors: [
					{
						text: 'Faire la publicité d’un hôtel en bord de mer',
						diagnosticFeedback: 'Aucune visée touristique ou commerciale n’apparaît.'
					},
					{
						text: 'Expliquer le phénomène astronomique des marées océaniques',
						diagnosticFeedback: 'Le texte est un fait divers narratif et informatif.'
					},
					{
						text: 'Critiquer la lenteur des ambulanciers',
						diagnosticFeedback: 'Les ambulanciers sont intervenus quelques minutes plus tard.'
					}
				],
				themeSummary: 'le sauvetage courageux d’un enfant sur la corniche d’Oran'
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
				content: `2) Répondez aux questions suivantes à partir de l’article :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
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
						header: '4) Quelle est l’intention principale du journaliste dans ce fait divers ?',
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
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans le fait divers « ${variant.title} », que cherche principalement à faire le journaliste ?`,
				questionTextAr: 'حدّد الهدف الرئيسي للصحفي من هذا الخبر المتنوع الجزائري:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Ce fait divers relate de manière vivante et fidèle ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le fait divers ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'في الخبر المتنوع غالبا ما يُدرج الصحفي شهادة مباشرة (discours direct) لإضفاء المصداقية والحيوية.',
				'استخرج مؤشرات الزمان والمكان والفاعلين من الفقرة الأولى (le chapeau / l’attaque).',
				'تذكّر أن العنوان الاسمي الخالي من الفعل المصرف ناتج عن الاسمية (la nominalisation).'
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

// 3. Fonctionnement de la langue 1 — Discours direct / indirect, Verbes de parole & Portrait physique/moral (6 pts — TCL!)
const tpl1asTclT3DiscoursPortraitLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t3_discours_portrait_lang',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — الكلام المباشر وغير المباشر، أفعال القول، والبورتريه الجسدي والأخلاقي',
	curriculumLessonId: 'fre_lesson_1as_tcl_t3_discours_direct_indirect',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['barbe argentée', 'modestie', 'regard vif', 'patience', 'silhouette droite', 'droiture'],
				classifyCols: [
					{ header: 'Portrait physique', items: ['barbe argentée', 'regard vif', 'silhouette droite'], mark: '0.75' },
					{ header: 'Portrait moral', items: ['modestie', 'patience', 'droiture'], mark: '0.75' }
				],
				diPrompt:
					'Transposez les paroles suivantes du discours direct au discours indirect (attention à la concordance des temps) :\na) Maître Othmane déclara à son élève : « Je t’apprendrai cet art demain ici. »\nb) L’étudiant expliqua aux journalistes : « J’ai découvert ces manuscrits hier. »\nc) L’architecte demanda à Meriem : « Avez-vous lu mon adresse dans le carnet ? »',
				diAns:
					'a) Maître Othmane déclara à son élève qu’il lui apprendrait cet art le lendemain là.\nb) L’étudiant expliqua aux journalistes qu’il avait découvert ces manuscrits la veille.\nc) L’architecte demanda à Meriem si elle avait lu son adresse dans le carnet.',
				vpPrompt:
					'Remplacez le verbe « dit » par un verbe de parole plus précis (murmura, s’exclama, conseilla) :\na) « Quel magnifique cadeau ! » dit l’architecte avec joie.\nb) « Recommence calmement sans te presser », dit le maître à son apprenti.',
				vpAns: 'a) s’exclama   b) conseilla',
				mcqQuestion: 'Choisissez la transposition correcte au discours indirect de : « Le volontaire a déclaré : "Nous avons aidé les voyageurs hier." »',
				mcqCorrect: 'Le volontaire a déclaré qu’ils avaient aidé les voyageurs la veille.',
				mcqDistractors: [
					{
						text: 'Le volontaire a déclaré qu’ils ont aidé les voyageurs hier.',
						diagnosticFeedback: 'Avec un verbe introducteur au passé, le passé composé devient plus-que-parfait et « hier » devient « la veille ».'
					},
					{
						text: 'Le volontaire a déclaré s’ils avaient aidé les voyageurs la veille.',
						diagnosticFeedback: 'Une phrase déclarative s’introduit par « que », jamais par « si ».'
					},
					{
						text: 'Le volontaire a déclaré qu’ils aideront les voyageurs le lendemain.',
						diagnosticFeedback: 'Le sens temporel du passé a été totalement modifié.'
					}
				]
			},
			{
				classifyBank: ['sourire franc', 'générosité', 'mains agiles', 'persévérance', 'visage serein', 'courage'],
				classifyCols: [
					{ header: 'Portrait physique', items: ['sourire franc', 'mains agiles', 'visage serein'], mark: '0.75' },
					{ header: 'Portrait moral', items: ['générosité', 'persévérance', 'courage'], mark: '0.75' }
				],
				diPrompt:
					'Passez du discours direct au discours indirect (ou inversement pour la phrase c) :\na) La potière répondit à sa petite-fille : « Chaque poterie raconte notre mémoire. »\nb) Le maître conseilla à Hamza : « Trace cette ligne avec patience ! »\nc) (Passez au discours direct) Sofiane affirma qu’il était resté calme pour rassurer l’enfant.',
				diAns:
					'a) La potière répondit à sa petite-fille que chaque poterie racontait leur mémoire.\nb) Le maître conseilla à Hamza de tracer cette ligne avec patience.\nc) Sofiane affirma : « Je suis resté calme pour rassurer l’enfant. »',
				vpPrompt:
					'Choisissez le verbe de parole le mieux adapté (chuchota, interrogea, rassura) :\na) « N’aie pas peur, je vais te ramener vers la rive », .......... le jeune secouriste.\nb) « Pourquoi aimes-tu autant travailler l’argile ? » .......... la jeune fille.',
				vpAns: 'a) rassura   b) interrogea',
				mcqQuestion: 'Comment ponctue-t-on correctement une proposition incise au discours direct ?',
				mcqCorrect: '« Ce carnet est précieux ! », s’exclama-t-il.',
				mcqDistractors: [
					{
						text: '« Ce carnet est précieux ! », il s’exclama.',
						diagnosticFeedback: 'Dans une proposition incise, on inverse toujours le sujet et le verbe.'
					},
					{
						text: '« Ce carnet est précieux ! » que s’exclama-t-il.',
						diagnosticFeedback: 'On n’emploie jamais « que » devant une proposition incise.'
					},
					{
						text: '« Ce carnet est précieux ! » s’exclama il.',
						diagnosticFeedback: 'Il faut un trait d’union et un -t- euphonique : s’exclama-t-il.'
					}
				]
			},
			{
				classifyBank: ['yeux attentifs', 'hospitalité', 'front large', 'bienveillance', 'manteau sobre', 'honnêteté'],
				classifyCols: [
					{ header: 'Portrait physique', items: ['yeux attentifs', 'front large', 'manteau sobre'], mark: '0.75' },
					{ header: 'Portrait moral', items: ['hospitalité', 'bienveillance', 'honnêteté'], mark: '0.75' }
				],
				diPrompt:
					'Transformez les phrases suivantes au discours indirect :\na) Le villageois déclara : « Nous accueillerons les voyageurs aujourd’hui. »\nb) La grand-mère demanda à Ines : « Veux-tu apprendre la poterie ? »\nc) Le libraire recommanda à l’élève : « Prends soin de cet ouvrage ancien ! »',
				diAns:
					'a) Le villageois déclara qu’ils accueilleraient les voyageurs ce jour-là.\nb) La grand-mère demanda à Ines si elle voulait apprendre la poterie.\nc) Le libraire recommanda à l’élève de prendre soin de cet ouvrage ancien.',
				vpPrompt:
					'Précisez si chacun des portraits suivants est valorisant ou dévalorisant :\na) « Un artisan patient au sourire chaleureux et aux mains habiles. »\nb) « Un passant pressé à l’air indifférent et au regard glacial. »',
				vpAns: 'a) Portrait valorisant (mélioratif)   b) Portrait dévalorisant (péjoratif)',
				mcqQuestion: 'Quelle phrase transpose correctement l’impératif au discours indirect : « Le maître recommanda à l’élève : "Relis calmement ton travail !" » ?',
				mcqCorrect: 'Le maître recommanda à l’élève de relire calmement son travail.',
				mcqDistractors: [
					{
						text: 'Le maître recommanda à l’élève que relis calmement ton travail.',
						diagnosticFeedback: 'L’impératif se transforme en « de + infinitif » et le possessif change (ton -> son).'
					},
					{
						text: 'Le maître recommanda à l’élève s’il relit calmement son travail.',
						diagnosticFeedback: '« si » sert uniquement pour une interrogation totale.'
					},
					{
						text: 'Le maître recommanda à l’élève de relire calmement ton travail.',
						diagnosticFeedback: 'Il faut adapter le déterminant possessif : « ton » devient « son ».'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les expressions descriptives suivantes dans le tableau (1.5 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{
				type: 'text',
				content: `2) ${variant.diPrompt} (3.0 pts)`,
				answer: variant.diAns,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.vpPrompt} (1.5 pts)`,
				answer: variant.vpAns,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة في الكلام المنقول وأفعال القول:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Avec un verbe de parole au passé, on adapte les temps (présent -> imparfait, passé composé -> PQP, futur -> conditionnel, impératif -> de + infinitif), les pronoms et les repères temporels.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités suivantes sur le portrait, les verbes de parole et le discours rapporté :',
				content
			},
			hints: [
				'البورتريه الجسدي يصف الملامح الظاهرة، والبورتريه الأخلاقي يصف القيم والطباع.',
				'عند التحويل للكلام غير المباشر مع فعل قول ماضٍ: راقب التغييرات الأربعة (الرابط، الضمير، الزمن، وظرف الزمان/المكان).',
				'في الجملة المعترضة (incise) نقلب الفاعل والفعل دائما: « ... », répondit-il / s’exclama-t-elle.'
			],
			solutionStepsAr: [
				`Portrait : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Discours rapporté : ${variant.diAns}`,
				`Verbes de parole / Portrait : ${variant.vpAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Figures de style, Point de vue (focalisation) & Nominalisation (6 pts — TCL!)
const tpl1asTclT3FiguresFocalisationLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t3_figures_focalisation_lang',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'discours_rhetorique',
	titleAr: 'قواعد اللغة — الصور البلاغية (التشبيه، الاستعارة، التعداد)، التبئير، والاسمية',
	curriculumLessonId: 'fre_lesson_1as_tcl_t3_figures_de_style',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				figPrompt:
					'Identifiez la figure de style employée dans chaque phrase (comparaison, métaphore ou énumération) :\na) « Son regard vif brillait comme une étincelle. »\nb) « La bibliothèque du quartier était un phare silencieux au cœur de la ville. »\nc) « Les habitants apportèrent des couvertures, du thé chaud, du pain et des remèdes. »',
				figAns: 'a) Comparaison (outil : comme)   b) Métaphore (sans outil)   c) Énumération (suite de 4 noms)',
				focPrompt:
					'Précisez le point de vue adopté dans chaque extrait (omniscient, interne ou externe) :\na) « Un homme au manteau gris entra dans la librairie, posa un sac sur le comptoir et sortit sans un mot. »\nb) « En ouvrant le carnet, Meriem éprouva une vive émotion ; les dessins lui parurent remarquables. »',
				focAns: 'a) Point de vue externe (focalisation externe : observation extérieure neutre)   b) Point de vue interne (focalisation interne : perception et ressenti de Meriem)',
				wfRows: [
					{
						verbe: { given: true, value: 'témoigner' },
						nom: { value: 'témoignage / témoin', mark: '0.5' },
						adjectif: { value: 'témoigné(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'admirer', mark: '0.5' },
						nom: { given: true, value: 'admiration' },
						adjectif: { value: 'admirable', mark: '0.5' }
					}
				],
				mcqQuestion: 'Quelle phrase contient une métaphore (et non une comparaison) ?',
				mcqCorrect: 'La patience est une clé qui ouvre toutes les portes du savoir.',
				mcqDistractors: [
					{
						text: 'La patience est comme une clé qui ouvre les portes du savoir.',
						diagnosticFeedback: 'La présence de l’outil « comme » en fait une comparaison.'
					},
					{
						text: 'La patience ressemble à une clé précieuse.',
						diagnosticFeedback: 'Le verbe « ressembler à » est un outil de comparaison.'
					},
					{
						text: 'La patience, le calme, la rigueur et l’écoute mènent au succès.',
						diagnosticFeedback: 'Cette phrase illustre une énumération.'
					}
				]
			},
			{
				figPrompt:
					'Identifiez la figure de style dans chaque phrase puis transformez la phrase (a) en métaphore :\na) « Le savoir est pareil à une lumière qui guide les voyageurs. »\nb) « Sur l’établi s’alignaient des calames, des encres, des compas et des feuilles épaisses. »',
				figAns:
					'a) Comparaison (outil : pareil à) ; en métaphore : « Le savoir est une lumière qui guide les voyageurs. »\nb) Énumération.',
				focPrompt:
					'Indiquez le point de vue du narrateur (omniscient ou externe) en justifiant brièvement :\na) « Hamza sourit fièrement, ignorant encore que cette matinée changerait sa façon de travailler toute sa vie. »\nb) « Deux volontaires dégagèrent l’entrée du village à l’aide de pelles métalliques. »',
				focAns:
					'a) Point de vue omniscient (le narrateur connaît le futur que Hamza ignore).\nb) Point de vue externe (le narrateur décrit seulement des actions visibles de l’extérieur).',
				wfRows: [
					{
						verbe: { given: true, value: 'persévérer' },
						nom: { value: 'persévérance', mark: '0.5' },
						adjectif: { value: 'persévérant(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'encourager', mark: '0.5' },
						nom: { given: true, value: 'encouragement' },
						adjectif: { value: 'encourageant(e)', mark: '0.5' }
					}
				],
				mcqQuestion: 'Dans la phrase : « Les ponts de Constantine se dressent tels des géants de pierre », quelle figure de style est employée ?',
				mcqCorrect: 'Une comparaison (introduite par l’outil « tels »)',
				mcqDistractors: [
					{
						text: 'Une métaphore',
						diagnosticFeedback: '« tels » est un outil explicite de comparaison.'
					},
					{
						text: 'Une énumération',
						diagnosticFeedback: 'Il n’y a pas de liste de trois éléments ou plus.'
					},
					{
						text: 'Une proposition incise',
						diagnosticFeedback: 'Il ne s’agit pas d’un verbe de parole dans un dialogue.'
					}
				]
			},
			{
				figPrompt:
					'Relevez le comparé, l’outil de comparaison et le comparant dans (a), puis nommez la figure dans (b) :\na) « La potière façonnait l’argile avec finesse comme une dentelle délicate. »\nb) « Chaque poterie ancienne est une page vivante de notre mémoire. »',
				figAns:
					'a) Comparé : l’argile façonnée | Outil : comme | Comparant : une dentelle délicate (Comparaison).\nb) Métaphore.',
				focPrompt:
					'Nominalisez ces deux phrases pour créer des titres de faits divers concis :\na) Les spécialistes ont restauré trente manuscrits anciens à Adrar.\nb) Un jeune maître-nageur a secouru un enfant sur la corniche d’Oran.',
				focAns:
					'a) Restauration de trente manuscrits anciens à Adrar par les spécialistes.\nb) Secours (ou Sauvetage) d’un enfant sur la corniche d’Oran par un jeune maître-nageur.',
				wfRows: [
					{
						verbe: { given: true, value: 'transmettre' },
						nom: { value: 'transmission', mark: '0.5' },
						adjectif: { value: 'transmissible / transmis(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'secourir', mark: '0.5' },
						nom: { given: true, value: 'secours' },
						adjectif: { value: 'secouru(e) / secourable', mark: '0.5' }
					}
				],
				mcqQuestion: 'Quel point de vue narratif est utilisé dans : « Un jeune garçon s’assit sur le banc, ouvrit un livre rouge et tourna lentement les pages sans que l’on sache ce qu’il pensait. » ?',
				mcqCorrect: 'Le point de vue externe (focalisation externe)',
				mcqDistractors: [
					{
						text: 'Le point de vue omniscient (focalisation zéro)',
						diagnosticFeedback: 'Le narrateur ignore explicitement les pensées du garçon.'
					},
					{
						text: 'Le point de vue interne (focalisation interne)',
						diagnosticFeedback: 'Nous n’avons accès à aucun sentiment intérieur du personnage.'
					},
					{
						text: 'Le discours indirect libre',
						diagnosticFeedback: 'Il s’agit d’une description externe objective.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${variant.figPrompt} (2.0 pts)`,
				answer: variant.figAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ${variant.focPrompt} (2.0 pts)`,
				answer: variant.focAns,
				mark: '2.0'
			},
			{ type: 'text', content: '3) Complétez le tableau de la famille de mots suivant (2.0 pts) :' },
			buildFrenchWordFamilyTableBlock(variant.wfRows)
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الدقيقة حول الصور البلاغية ووجهة نظر الراوي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'La comparaison comporte un outil (comme, tel, pareil à), la métaphore relie directement sans outil, et la focalisation dépend de ce que sait le narrateur.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les exercices suivants sur les figures de style, la focalisation et le lexique :',
				content
			},
			hints: [
				'لتحويل التشبيه إلى استعارة، يكفي حذف أداة التشبيه (comme / pareil à / tel que).',
				'في التبئير: العالم بكل شيء (omniscient) يعرف الباطن والمستقبل، والداخلي (interne) يرى بعين شخصية واحدة، والخارجي (externe) يصف الظاهر فقط كالكاميرا.',
				'راجع لواحق الأسماء (-tion, -ment, -ance, -age) في جدول عائلة الكلمة.'
			],
			solutionStepsAr: [
				`Figures de style : ${variant.figAns}`,
				`Focalisation / Nominalisation : ${variant.focAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Récit réaliste moral ou Compte rendu objectif d'un texte narratif (7 pts — TCL!)
const tpl1asTclT3RecitCompteRenduWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t3_recit_compte_rendu_we',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — كتابة قصة واقعية هادفة أو التقرير الموضوعي لنص سردي (1AS آداب)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t3_rediger_recit_compte_rendu',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'Rédigez une courte nouvelle réaliste à portée morale (14 à 18 lignes) mettant en scène une rencontre entre un jeune lycéen et un artisan ou un aîné de votre ville, illustrant la valeur de la patience, du respect ou de l’honnêteté.',
				sujetUnNotes: [
					'Respectez les étapes du schéma narratif avec une alternance cohérente entre imparfait et passé simple.',
					'Insérez un bref portrait physique et moral du personnage principal.',
					'Intégrez deux répliques au discours direct correctement ponctuées (avec verbes de parole variés).',
					'Enrichissez le style par au moins une figure de style (comparaison, métaphore ou énumération) et terminez par une morale claire.'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) de la nouvelle réaliste intitulée « La leçon de patience du maître calligraphe » (Recueil de Nouvelles Réalistes Algériennes) : accroche complète, synthèse fidèle au présent à la 3e personne sans recopier le dialogue direct ni donner d’avis personnel.',
				modelAnswer:
					'Chaque après-midi d’automne, le jeune Rayan passait devant la vieille librairie de son quartier à Tlemcen. Son propriétaire, M. Abdelkader, était un homme âgé au visage doux, aux lunettes rondes et d’une grande bienveillance. Sur ses étagères soignées s’alignaient des dictionnaires, des livres d’histoire, des cahiers reliés et des cartes anciennes.\nUn mercredi, alors que Rayan feuilletait un atlas qu’il n’avait pas les moyens d’acheter, une enveloppe glissa de sa poche sans qu’il s’en aperçoive : elle contenait l’argent destiné aux courses de sa mère. Le libraire la ramassa aussitôt et le rappela avant qu’il ne franchisse le seuil. « Mon fils, tu as laissé tomber ceci, dit-il avec un sourire chaleureux comme un rayon d’hiver. — Merci infiniment, Monsieur, vous m’évitez une grande peine ! », s’exclama Rayan soulagé.\nTouché par la curiosité intellectuelle du garçon, M. Abdelkader lui prêta l’atlas pour toute la semaine. En rentrant chez lui, Rayan comprit que la bonté et la probité sont les véritables phares qui éclairent la vie d’un quartier.',
				rubricSummary:
					'Respect du schéma narratif et ancrage réaliste (1.5 pts), Intégration réussie du portrait, du dialogue ponctué et d’une figure de style (2.0 pts), Cohérence des temps (imparfait/passé simple) et portée morale (2.0 pts), Correction de la langue et de l’orthographe (1.5 pts).',
				mcqQuestion: 'Dans le compte rendu objectif d’une nouvelle réaliste, comment traite-t-on un dialogue au discours direct ?',
				mcqCorrect: 'On résume l’essentiel de son contenu au discours indirect et au présent',
				mcqDistractors: [
					{
						text: 'On recopie toutes les répliques mot pour mot entre guillemets',
						diagnosticFeedback: 'Le compte rendu objectif reformule et condense sans recopier les dialogues.'
					},
					{
						text: 'On ajoute son opinion personnelle sur les personnages en conclusion',
						diagnosticFeedback: 'Un compte rendu objectif exclut tout commentaire personnel.'
					},
					{
						text: 'On supprime totalement la fin et la morale de l’histoire',
						diagnosticFeedback: 'La résolution et la portée morale sont des éléments clés du texte narratif.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) du fait divers intitulé « Élan de solidarité exemplaire après les chutes de neige à Sétif » (Quotidien de l’Est Algérien, 19 janvier 2026) afin de le publier dans la revue du lycée.',
				sujetUnNotes: [
					'Rédigez une accroche complète : nature du texte (fait divers), titre, source, thème et visée informative.',
					'Condensez fidèlement les étapes principales au présent de l’indicatif (blocage routier par la neige, accueil solidaire des villageois, réouverture de la route et gratitude des voyageurs).',
					'Transposez brièvement au discours indirect le témoignage du volontaire sans recopier les guillemets.',
					'Gardez un ton strictement objectif à la troisième personne, sans jugement personnel.'
				],
				sujetDeuxPrompt:
					'Rédigez une nouvelle réaliste morale (14 à 18 lignes) sur le thème de la solidarité entre voisins ou camarades de classe. Veillez à inclure un bref portrait moral, un court dialogue direct, une métaphore ou comparaison et une leçon finale.',
				modelAnswer:
					'Ce fait divers, intitulé « Élan de solidarité exemplaire après les chutes de neige à Sétif » et paru dans le Quotidien de l’Est Algérien le 19 janvier 2026, relate la mobilisation des habitants en faveur de voyageurs bloqués par une tempête hivernale. Le journaliste vise à informer les lecteurs de cet événement et à souligner l’esprit d’entraide citoyenne.\nD’abord, il indique que d’importantes chutes de neige ont coupé plusieurs routes secondaires dans le nord de la wilaya, immobilisant des dizaines d’automobilistes. Ensuite, il explique comment les villageois et les jeunes bénévoles interviennent dès l’aube pour dégager les accès tout en offrant repas chauds et couvertures aux familles bloquées ; l’un des volontaires rappelle qu’il était impossible d’abandonner ces personnes dans le froid. Enfin, l’article précise que les travaux publics rouvrent l’axe principal vers midi et que les voyageurs repartent en saluant l’hospitalité chaleureuse des habitants.',
				rubricSummary:
					'Accroche complète adaptée au fait divers (2.0 pts), Fidélité au déroulement chronologique et transposition du discours direct au présent (2.0 pts), Cohérence, connecteurs et objectivité stricte (1.5 pts), Correction syntaxique et orthographique (1.5 pts).',
				mcqQuestion: 'Quel temps emploie-t-on pour résumer les actions dans le compte rendu objectif d’un fait divers ou d’un récit ?',
				mcqCorrect: 'Le présent de l’indicatif',
				mcqDistractors: [
					{
						text: 'Le futur antérieur',
						diagnosticFeedback: 'Le compte rendu se rédige toujours au présent de l’indicatif.'
					},
					{
						text: 'L’impératif présent',
						diagnosticFeedback: 'On n’adresse pas d’ordres dans un compte rendu.'
					},
					{
						text: 'Le subjonctif imparfait',
						diagnosticFeedback: 'Ce temps littéraire rare ne sert pas à rédiger un compte rendu.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Écrivez une nouvelle réaliste à portée morale (14 à 18 lignes) racontant comment une élève ou un élève a découvert le plaisir d’aider un camarade en difficulté avant les examens, démontrant que le partage du savoir enrichit celui qui donne autant que celui qui reçoit.',
				sujetUnNotes: [
					'Développez un schéma narratif complet (cadre réaliste algérien à l’imparfait, élément déclencheur et péripéties au passé simple, résolution et morale).',
					'Faites un court portrait physique et moral des deux personnages.',
					'Insérez un bref dialogue direct (2 répliques) avec des verbes de parole précis.',
					'Intégrez une comparaison ou une métaphore valorisant le partage du savoir.'
				],
				sujetDeuxPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) d’un fait divers relatant la découverte et la remise de manuscrits anciens dans une bibliothèque familiale d’Adrar.',
				modelAnswer:
					'Durant tout le deuxième trimestre, Kenza figurait parmi les meilleures élèves de sa classe de 1AS Lettres à Oran. Calme, organisée et dotée d’un regard attentif, elle aimait particulièrement la littérature et la grammaire. Non loin d’elle s’asseyait Nabila, une camarade timide au visage inquiet qui peinait à structurer ses rédactions.\nUn jeudi après les cours, Kenza aperçut Nabila seule dans la cour, relisant tristement une copie difficile. Prise d’un élan sincère de fraternité, elle s’approcha d’elle avec douceur. « Si tu veux, nous pouvons réviser ensemble deux fois par semaine à la bibliothèque, proposa-t-elle chaleureusement. — Tu m’aiderais vraiment ? Merci du fond du cœur ! », répondit Nabila, le visage soudain illuminé.\nPendant six semaines, elles relurent leurs leçons, préparèrent des plans et corrigèrent leurs phrases. Non seulement Nabila obtint une excellente note à la composition, mais Kenza constata qu’expliquer à autrui avait rendu ses propres idées claires comme de l’eau de source. Elles comprirent toutes deux que le savoir est une flamme qui grandit lorsqu’on la partage.',
				rubricSummary:
					'Structure complète de la nouvelle réaliste (1.5 pts), Qualité du portrait, du dialogue et des figures de style (2.0 pts), Maîtrise des temps du récit et clarté de la morale (2.0 pts), Orthographe, accords et ponctuation (1.5 pts).',
				mcqQuestion: 'Quel ensemble d’éléments littéraires est particulièrement attendu dans une nouvelle réaliste de 1AS TCL ?',
				mcqCorrect: 'Un schéma narratif cohérent, un bref portrait physique et moral, un dialogue ponctué, une figure de style et une portée morale',
				mcqDistractors: [
					{
						text: 'Une formule d’appel « Monsieur le Maire », une thèse et une prise de congé',
						diagnosticFeedback: 'Ces éléments appartiennent à la lettre ouverte argumentée.'
					},
					{
						text: 'Uniquement des définitions scientifiques sans personnages ni actions',
						diagnosticFeedback: 'Cela correspond au texte de vulgarisation scientifique.'
					},
					{
						text: 'Des créatures magiques et des sortilèges imaginaires',
						diagnosticFeedback: 'La nouvelle réaliste exclut totalement la magie et le fantastique.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildFrenchWrittenProductionBlock({
				sujetUnTitle: 'Sujet 1 (Guidé) :',
				sujetUnPrompt: variant.sujetUnPrompt,
				sujetUnNotes: variant.sujetUnNotes,
				sujetDeuxPrompt: variant.sujetDeuxPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '7'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة السليمة لإنتاج القصة الواقعية أو التقرير الموضوعي السردي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'En 1AS TCL, la nouvelle réaliste combine narration, portrait, bref dialogue et image stylistique ; le compte rendu narratif reformule objectivement au présent.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets au choix en veillant à la qualité narrative et linguistique :',
				content
			},
			hints: [
				'في القصة الواقعية: اجمع بين البنية السردية، بورتريه جسدي وأخلاقي موجز، جملتي حوار مباشر بعلاماته، وصورة بلاغية معبّرة.',
				'في التقرير الموضوعي السردي: استعمل المضارع الدلالي، وحوّل مضمون الحوار إلى كلام غير مباشر بإيجاز دون رأي شخصي.',
				'احرص على التوازن بين الفقرات وسلامة مطابقة الصفات والأفعال (الماضي الناقص والماضي البسيط).'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T3: FrenchParameterizedTemplate[] = [
	tpl1asTclT3NouvelleRealisteComp,
	tpl1asTclT3FaitDiversAlgerienComp,
	tpl1asTclT3DiscoursPortraitLang,
	tpl1asTclT3FiguresFocalisationLang,
	tpl1asTclT3RecitCompteRenduWe
];
