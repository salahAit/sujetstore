import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1 : Compréhension de l'écrit (07 pts) — Énergies propres & Soleil
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT2Energies: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t2_comp_energies_propres',
	grade: '1am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): الطاقات المتجددة والنظيفة (Énergie solaire, éolienne et électricité)',
	curriculumLessonId: 'fre_lesson_1am_t2_reformulation_synonymie',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'L’énergie solaire en Algérie',
				source: 'Texte explicatif adapté — Progrès scientifiques et énergies (1AM)',
				paragraphs: [
					'L’énergie solaire est une énergie renouvelable, c’est-à-dire une ressource inépuisable fournie par le rayonnement du soleil. Grâce aux panneaux photovoltaïques qui captent la lumière, on produit une électricité [[propre]] pour éclairer les maisons et les écoles.',
					'En Algérie, les régions du Sud bénéficient d’un ensoleillement exceptionnel toute l’année ; c’est pourquoi les ingénieurs ont installé de grandes centrales solaires dans le Sahara. Cette technologie moderne protège l’environnement ((car)) elle ne dégage aucune fumée toxique.'
				],
				glossary: [
					{ term: 'photovoltaïques', meaning: 'qui transforment la lumière du soleil en électricité' },
					{ term: 'ensoleillement', meaning: 'durée pendant laquelle le soleil brille sur une région' }
				],
				qcmHeader: '1) Que produit le panneau photovoltaïque à partir de la lumière du soleil ?',
				qcmOptions: ['Du charbon', 'De l’électricité propre', 'De la fumée noire'],
				qcmCorrect: 'De l’électricité propre',
				tf: [
					{ q: 'L’énergie solaire est une énergie inépuisable.', a: 'Vrai', mark: '1' },
					{ q: 'Les centrales solaires dégagent beaucoup de fumée toxique.', a: 'Faux', c: 'Cette technologie ne dégage aucune fumée toxique.', mark: '1' },
					{ q: 'Le Sud algérien profite d’un fort ensoleillement toute l’année.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Pourquoi les ingénieurs ont-ils installé de grandes centrales solaires dans le Sahara ?\n\nb) Relève dans le premier paragraphe une reformulation introduite par « c’est-à-dire ».',
				compA: 'a) Parce que les régions du Sud bénéficient d’un ensoleillement exceptionnel toute l’année.\n\nb) « c’est-à-dire une ressource inépuisable fournie par le rayonnement du soleil ».',
				lexQ: '4) Observe le texte puis réponds (01 pt) :\n\na) Quel rapport logique exprime le mot « car » dans la dernière phrase ?\n\nb) Donne un synonyme de « inépuisable » présent dans le premier paragraphe.',
				lexA: 'a) Le mot « car » exprime la cause.\n\nb) Synonyme : « renouvelable ».',
				quizQ: 'Dans le texte « L’énergie solaire en Algérie », quel rapport logique est introduit par « c’est pourquoi » ?',
				correctOpt: 'La conséquence',
				distractors: [
					{ text: 'La cause', diagnosticFeedback: 'La cause est introduite par « car » ou « grâce à ».' },
					{ text: 'La reformulation', diagnosticFeedback: 'La reformulation est introduite par « c’est-à-dire ».' },
					{ text: 'L’énumération', diagnosticFeedback: '« c’est pourquoi » exprime le résultat (la conséquence).' }
				]
			},
			{
				title: 'L’énergie éolienne : la force du vent',
				source: 'Texte explicatif adapté — Énergies propres (1AM)',
				paragraphs: [
					'L’énergie éolienne, autrement dit l’énergie produite par la force du vent, aide l’homme depuis des siècles. Autrefois, les moulins à vent servaient à moudre le blé et à pomper l’eau des puits.',
					'Aujourd’hui, de grandes machines modernes appelées éoliennes possèdent des pales qui tournent sous l’effet du vent. Grâce à ce mouvement, un générateur fabrique de l’électricité sans polluer l’air. Le vent est gratuit et [[naturel]], donc cette énergie représente une ((solution)) d’avenir.'
				],
				glossary: [
					{ term: 'pales', meaning: 'grandes ailes qui tournent avec le vent' },
					{ term: 'générateur', meaning: 'appareil qui produit du courant électrique' }
				],
				qcmHeader: '1) Quelle force naturelle fait tourner les pales d’une éolienne ?',
				qcmOptions: ['La force du vent', 'Le pétrole', 'La neige'],
				qcmCorrect: 'La force du vent',
				tf: [
					{ q: 'Autrefois, les moulins à vent servaient à moudre le blé.', a: 'Vrai', mark: '1' },
					{ q: 'L’énergie éolienne pollue gravement l’air.', a: 'Faux', c: 'Le générateur fabrique de l’électricité sans polluer l’air.', mark: '1' },
					{ q: 'Le vent est une ressource gratuite et naturelle.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) À quoi servaient autrefois les moulins à vent ?\n\nb) Relève dans le premier paragraphe l’outil de reformulation utilisé par l’auteur.',
				compA: 'a) Ils servaient à moudre le blé et à pomper l’eau des puits.\n\nb) L’outil de reformulation est « autrement dit ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une proposition subordonnée relative introduite par « qui ».\n\nb) Un connecteur de conséquence dans la dernière phrase.',
				lexA: 'a) « qui tournent sous l’effet du vent ».\n\nb) Le connecteur « donc ».',
				quizQ: 'Dans le texte « L’énergie éolienne : la force du vent », par quelle expression l’auteur reformule-t-il « L’énergie éolienne » ?',
				correctOpt: 'autrement dit l’énergie produite par la force du vent',
				distractors: [
					{ text: 'grâce à ce mouvement', diagnosticFeedback: '« grâce à » exprime une cause positive, pas une reformulation.' },
					{ text: 'donc cette énergie', diagnosticFeedback: '« donc » introduit une conséquence.' },
					{ text: 'autrefois les moulins', diagnosticFeedback: '« autrefois » est un indicateur de temps.' }
				]
			},
			{
				title: 'Les lampes économiques LED',
				source: 'Texte explicatif adapté — Technologie utile (1AM)',
				paragraphs: [
					'La lampe LED est une ampoule de nouvelle génération qui consomme très peu d’électricité. Autrement dit, [[elle]] éclaire aussi bien qu’une lampe ancienne tout en réduisant fortement la facture d’énergie.',
					'Les scientifiques ont perfectionné cette invention pour protéger les ressources de la planète. Parce que les lampes LED durent très longtemps et ne chauffent presque pas, de nombreuses familles algériennes les ont choisies pour leurs maisons. Grâce à ce progrès, le ((gaspillage)) électrique diminue chaque jour.'
				],
				glossary: [
					{ term: 'perfectionné', meaning: 'amélioré pour rendre plus efficace' },
					{ term: 'facture', meaning: 'somme d’argent à payer pour l’électricité consommée' }
				],
				qcmHeader: '1) Quel est le principal avantage de la lampe LED ?',
				qcmOptions: ['Elle consomme très peu d’électricité', 'Elle chauffe toute la chambre', 'Elle s’use en deux jours'],
				qcmCorrect: 'Elle consomme très peu d’électricité',
				tf: [
					{ q: 'La lampe LED consomme moins d’électricité qu’une ampoule ancienne.', a: 'Vrai', mark: '1' },
					{ q: 'Les lampes LED chauffent énormément et durent très peu de temps.', a: 'Faux', c: 'Elles durent très longtemps et ne chauffent presque pas.', mark: '1' },
					{ q: 'De nombreuses familles ont choisi les lampes LED.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Pourquoi les familles algériennes ont-elles choisi les lampes LED ?\n\nb) Relève dans le deuxième paragraphe un verbe conjugué au passé composé.',
				compA: 'a) Parce qu’elles durent très longtemps et ne chauffent presque pas.\n\nb) « ont perfectionné » ou « ont choisies ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un complément du nom dans le premier paragraphe.\n\nb) Un synonyme de « amélioré » (voir le lexique ou le paragraphe 2).',
				lexA: 'a) « de nouvelle génération » ou « d’énergie ».\n\nb) Synonyme : « perfectionné ».',
				quizQ: 'Dans le texte « Les lampes économiques LED », quelle expression exprime une cause positive ?',
				correctOpt: 'Grâce à ce progrès',
				distractors: [
					{ text: 'Autrement dit', diagnosticFeedback: '« Autrement dit » introduit une reformulation.' },
					{ text: 'qui consomme très peu', diagnosticFeedback: 'C’est une proposition subordonnée relative.' },
					{ text: 'de nouvelle génération', diagnosticFeedback: 'C’est un complément du nom.' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildFrenchPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I — Compréhension de l’écrit',
			points: 7,
			instruction: 'Lis attentivement le texte ci-dessous puis réponds aux questions :',
			content: [
				passage,
				{
					type: 'multiple_choice',
					groups: [
						{
							header: v.qcmHeader,
							options: v.qcmOptions,
							correct: v.qcmCorrect,
							mark: '1'
						}
					]
				},
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et justifie quand c’est faux (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: 'comprehension_ecrit',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'ابحث في النص عن أدوات إعادة الصياغة (c’est-à-dire / autrement dit).',
				'ميّز بين روابط السبب (car, parce que, grâce à) وروابط النتيجة (donc, c’est pourquoi).',
				'تحقّق من صحة كل عبارة في Vrai / Faux بالرجوع إلى الفقرة الموافقة.'
			],
			solutionStepsAr: [
				`1) ${v.qcmCorrect}`,
				`2) ${v.tf.map((it, i) => `${i + 1}. ${it.a}${it.c ? ` (${it.c})` : ''}`).join(' | ')}`,
				`3) ${v.compA}`,
				`4) ${v.lexA}`
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2 : Compréhension de l'écrit (07 pts) — Inventions utiles (Boussole, Livre, PC)
// ═══════════════════════════════════════════════════════════════════════════════
const comp1amT2Inventions: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t2_comp_inventions_utiles',
	grade: '1am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): اختراعات نافعة للبشرية (La boussole, le livre et l’ordinateur)',
	curriculumLessonId: 'fre_lesson_1am_t2_expansion_nom',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'La boussole, guide des voyageurs',
				source: 'Texte explicatif adapté — Histoire des sciences (1AM)',
				paragraphs: [
					'La boussole est un instrument de navigation qui sert à s’orienter sur terre et en mer. Elle contient une fine aiguille aimantée qui indique toujours la direction du nord, même quand le ciel est nuageux.',
					'Au Moyen Âge, les savants et les géographes musulmans, comme Al-Idrisi et Ibn Battouta, ont utilisé et amélioré cet [[outil précieux]]. Grâce à la boussole, les marins ont traversé de grands océans en sécurité ; ((c’est pourquoi)) cette invention a favorisé les échanges de savoir entre les peuples.'
				],
				glossary: [
					{ term: 's’orienter', meaning: 'trouver sa direction (nord, sud, est, ouest)' },
					{ term: 'aimantée', meaning: 'attirée par le champ magnétique de la Terre' }
				],
				qcmHeader: '1) Quelle direction l’aiguille de la boussole indique-t-elle toujours ?',
				qcmOptions: ['Le nord', 'Le ciel', 'La mer'],
				qcmCorrect: 'Le nord',
				tf: [
					{ q: 'La boussole fonctionne seulement quand il fait soleil.', a: 'Faux', c: 'Elle indique le nord même quand le ciel est nuageux.', mark: '1' },
					{ q: 'Al-Idrisi et Ibn Battouta sont cités dans le texte.', a: 'Vrai', mark: '1' },
					{ q: 'La boussole a aidé les marins à voyager en sécurité.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Que contient la boussole pour indiquer la direction ?\n\nb) Quel effet positif cette invention a-t-elle eu entre les peuples ?',
				compA: 'a) Elle contient une fine aiguille aimantée.\n\nb) Elle a favorisé les échanges de savoir entre les peuples.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un complément du nom dans la première phrase.\n\nb) Un verbe au passé composé dans le deuxième paragraphe.',
				lexA: 'a) « de navigation ».\n\nb) « ont utilisé », « ont amélioré », « ont traversé » ou « a favorisé ».',
				quizQ: 'Dans le texte « La boussole, guide des voyageurs », quelle est la fonction de « de navigation » dans « un instrument de navigation » ?',
				correctOpt: 'Complément du nom',
				distractors: [
					{ text: 'Adjectif qualificatif', diagnosticFeedback: '« de navigation » commence par la préposition « de » suivie d’un nom.' },
					{ text: 'Proposition relative', diagnosticFeedback: 'Une proposition relative commence par « qui » et contient un verbe.' },
					{ text: 'Connecteur de conséquence', diagnosticFeedback: 'Ce groupe précise la nature du nom « instrument ».' }
				]
			},
			{
				title: 'Le livre, trésor du savoir',
				source: 'Texte explicatif adapté — Progrès culturels et scientifiques (1AM)',
				paragraphs: [
					'Le livre est un ensemble de pages reliées qui conserve les connaissances, l’histoire et les découvertes scientifiques. Autrement dit, [[il]] est une mémoire fidèle que les générations se transmettent à travers les siècles.',
					'Autrefois, les copistes recopiaient les manuscrits à la main, donc les livres étaient rares. Puis l’invention de l’imprimerie a permis de fabriquer des milliers d’exemplaires rapidement. Aujourd’hui, grâce aux bibliothèques scolaires et aux livres illustrés, chaque élève enrichit son vocabulaire et développe son ((intelligence)).'
				],
				glossary: [
					{ term: 'copistes', meaning: 'personnes qui recopiaient les livres à la main autrefois' },
					{ term: 'imprimerie', meaning: 'technique qui permet de reproduire des livres en grand nombre' }
				],
				qcmHeader: '1) Pourquoi les livres étaient-ils rares autrefois ?',
				qcmOptions: ['Parce que les copistes les recopiaient à la main', 'Parce que personne ne voulait lire', 'Parce que le papier n’existait nulle part'],
				qcmCorrect: 'Parce que les copistes les recopiaient à la main',
				tf: [
					{ q: 'Le livre conserve les connaissances et les découvertes scientifiques.', a: 'Vrai', mark: '1' },
					{ q: 'L’imprimerie a rendu la fabrication des livres plus lente.', a: 'Faux', c: 'Elle a permis de fabriquer des milliers d’exemplaires rapidement.', mark: '1' },
					{ q: 'La lecture aide l’élève à enrichir son vocabulaire.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Qu’est-ce que l’invention de l’imprimerie a permis de faire ?\n\nb) Quels bienfaits les bibliothèques scolaires apportent-elles à l’élève ?',
				compA: 'a) Elle a permis de fabriquer des milliers d’exemplaires rapidement.\n\nb) L’élève enrichit son vocabulaire et développe son intelligence.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une expression de reformulation dans le premier paragraphe.\n\nb) Deux adjectifs qualificatifs dans le deuxième paragraphe.',
				lexA: 'a) « Autrement dit, il est une mémoire fidèle... ».\n\nb) « rares », « scolaires », « illustrés » (deux au choix).',
				quizQ: 'Dans le texte « Le livre, trésor du savoir », quel rapport logique est exprimé dans « les copistes recopiaient les manuscrits à la main, donc les livres étaient rares » ?',
				correctOpt: 'La conséquence',
				distractors: [
					{ text: 'La cause', diagnosticFeedback: 'Le mot « donc » introduit le résultat (la conséquence).' },
					{ text: 'La reformulation', diagnosticFeedback: 'La reformulation emploie « c’est-à-dire » ou « autrement dit ».' },
					{ text: 'L’énumération', diagnosticFeedback: 'Il n’y a pas de liste d’éléments ici.' }
				]
			},
			{
				title: 'L’ordinateur au service des études',
				source: 'Texte explicatif adapté — Informatique et apprentissage (1AM)',
				paragraphs: [
					'L’ordinateur est une machine électronique programmable, c’est-à-dire un outil rapide qui traite des textes, des calculs et des images. Il se compose d’un écran, d’un clavier, d’une souris et d’une unité centrale.',
					'À l’école, les élèves ont appris à utiliser [[cet appareil utile]] pour rédiger des exposés et consulter des dictionnaires scientifiques. Cependant, il faut limiter le temps devant l’écran parce qu’un usage excessif fatigue les yeux. Utilisé avec sagesse, l’ordinateur facilite ((l’apprentissage)) quotidien.'
				],
				glossary: [
					{ term: 'unité centrale', meaning: 'cerveau de l’ordinateur qui exécute les programmes' },
					{ term: 'excessif', meaning: 'qui dépasse la mesure raisonnable' }
				],
				qcmHeader: '1) À quoi sert l’ordinateur à l’école selon le texte ?',
				qcmOptions: ['À rédiger des exposés et consulter des dictionnaires', 'À remplacer le sommeil', 'À éviter de lire les livres'],
				qcmCorrect: 'À rédiger des exposés et consulter des dictionnaires',
				tf: [
					{ q: 'L’ordinateur traite des textes, des calculs et des images.', a: 'Vrai', mark: '1' },
					{ q: 'Un usage excessif de l’écran repose les yeux.', a: 'Faux', c: 'Un usage excessif fatigue les yeux.', mark: '1' },
					{ q: 'Utilisé avec sagesse, l’ordinateur facilite l’apprentissage.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Cite les quatre composants de l’ordinateur mentionnés dans le paragraphe 1.\n\nb) Pourquoi faut-il limiter le temps passé devant l’écran ?',
				compA: 'a) Un écran, un clavier, une souris et une unité centrale.\n\nb) Parce qu’un usage excessif fatigue les yeux.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe conjugué au passé composé.\n\nb) Un synonyme de « simplifie » dans la dernière phrase.',
				lexA: 'a) « ont appris ».\n\nb) Synonyme : « facilite ».',
				quizQ: 'Dans le texte « L’ordinateur au service des études », quelle est la nature grammaticale de « qui traite des textes, des calculs et des images » ?',
				correctOpt: 'Proposition subordonnée relative',
				distractors: [
					{ text: 'Complément du nom', diagnosticFeedback: 'Elle commence par « qui » et contient le verbe conjugué « traite ».' },
					{ text: 'Adjectif qualificatif', diagnosticFeedback: 'Un adjectif est un mot seul, pas une proposition avec un verbe.' },
					{ text: 'Proposition de conséquence', diagnosticFeedback: 'Elle complète le nom antécédent « outil rapide ».' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildFrenchPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'I — Compréhension de l’écrit',
			points: 7,
			instruction: 'Lis attentivement le texte puis réponds aux questions :',
			content: [
				passage,
				{
					type: 'multiple_choice',
					groups: [
						{
							header: v.qcmHeader,
							options: v.qcmOptions,
							correct: v.qcmCorrect,
							mark: '1'
						}
					]
				},
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et corrige les phrases fausses (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: 'comprehension_ecrit',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص جيدا لتفهم وظيفة الاختراع وتاريخه وفائدته.',
				'تعرّف على توسيع الاسم (صفة، متمم اسم، جملة صلة بـ qui).',
				'فرّق بين الأفعال في المضارع والأفعال في الماضي المركب.'
			],
			solutionStepsAr: [
				`1) ${v.qcmCorrect}`,
				`2) ${v.tf.map((it, i) => `${i + 1}. ${it.a}${it.c ? ` (${it.c})` : ''}`).join(' | ')}`,
				`3) ${v.compA}`,
				`4) ${v.lexA}`
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3 : Fonctionnement de la langue (06 pts) — Reformulation, Synonymie, Cause/Conséquence
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT2ReformulationCause: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t2_expl_reformulation_cause_conseq',
	grade: '1am',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (1): إعادة الصياغة والترادف، والسبب والنتيجة (Reformulation, cause et conséquence)',
	curriculumLessonId: 'fre_lesson_1am_t2_cause_consequence',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Relie chaque mot à son synonyme puis complète la reformulation :\n\n1) Synonymes : a) moderne = ......   b) faciliter = ...... (Choix : simplifier / récent)\n\n2) Reformule avec « c’est-à-dire » : « L’énergie solaire est renouvelable : elle ne s’épuise jamais. »',
				ex1A: '1) a) moderne = récent   b) faciliter = simplifier\n\n2) L’énergie solaire est renouvelable, c’est-à-dire qu’elle ne s’épuise jamais.',
				ex2Q: 'Exercice 2 (02 pts) : Complète chaque phrase avec le connecteur qui convient (grâce à / parce que / donc / à cause de) :\n\n1) L’Algérie utilise l’énergie solaire ...... le soleil brille toute l’année.\n\n2) ...... la boussole, le marin retrouve sa route.\n\n3) La lampe LED consomme peu, ...... la facture baisse.\n\n4) ...... la fumée des usines, l’air est moins pur.',
				ex2A: '1) parce que   2) Grâce à   3) donc   4) À cause de',
				tableIntro: 'Exercice 3 (02 pts) : Classe les deux phrases suivantes dans le tableau selon le rapport logique exprimé :\n\nA) « Le livre est précieux car il conserve le savoir. »\n\nB) « L’énergie éolienne est propre, c’est pourquoi les scientifiques la développent. »',
				causeItems: ['Phrase A (car il conserve le savoir)'],
				conseqItems: ['Phrase B (c’est pourquoi les scientifiques...)'],
				quizQ: 'Transforme cette phrase de cause en phrase de conséquence : « Les élèves réussissent parce qu’ils lisent régulièrement. »',
				correctOpt: 'Les élèves lisent régulièrement, donc ils réussissent.',
				distractors: [
					{ text: 'Les élèves réussissent, donc ils lisent régulièrement.', diagnosticFeedback: 'La lecture est la cause et la réussite est la conséquence.' },
					{ text: 'Les élèves lisent régulièrement car ils réussissent.', diagnosticFeedback: '« car » exprime la cause et inverse le sens logique.' },
					{ text: 'À cause de la lecture, les élèves réussissent.', diagnosticFeedback: '« À cause de » s’emploie pour un résultat négatif.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Donne le synonyme du mot souligné puis reformule :\n\n1) Donne un synonyme de : a) une invention = ......   b) rapide = ...... (Choix : véloce / une création technique)\n\n2) Reformule avec « autrement dit » : « La lampe LED est économique. Elle utilise très peu de courant. »',
				ex1A: '1) a) une invention = une création technique   b) rapide = véloce\n\n2) La lampe LED est économique, autrement dit elle utilise très peu de courant.',
				ex2Q: 'Exercice 2 (02 pts) : Relie les couples de phrases en exprimant le rapport indiqué :\n\n1) (Cause : car) Le train électrique est apprécié. Il ne pollue pas l’air.\n\n2) (Conséquence : c’est pourquoi) Le soleil est abondant au Sahara. On y installe des panneaux solaires.',
				ex2A: '1) Le train électrique est apprécié car il ne pollue pas l’air.\n\n2) Le soleil est abondant au Sahara, c’est pourquoi on y installe des panneaux solaires.',
				tableIntro: 'Exercice 3 (02 pts) : Classe les deux phrases suivantes dans le tableau :\n\nA) « Grâce à l’imprimerie, les livres se sont répandus partout. »\n\nB) « Le vent souffle fortement sur les collines, alors les éoliennes produisent beaucoup d’électricité. »',
				causeItems: ['Phrase A (Grâce à l’imprimerie)'],
				conseqItems: ['Phrase B (alors les éoliennes...)'],
				quizQ: 'Quel connecteur complète correctement la phrase : « ...... le travail des savants, la médecine a fait de grands progrès. » ?',
				correctOpt: 'Grâce au (Grâce à)',
				distractors: [
					{ text: 'À cause du', diagnosticFeedback: 'Le progrès médical est positif : on utilise « Grâce à ».' },
					{ text: 'Parce que', diagnosticFeedback: '« Parce que » doit être suivi d’un sujet et d’un verbe conjugué.' },
					{ text: 'Donc', diagnosticFeedback: '« Donc » relie deux propositions pour exprimer la conséquence.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Trouve les synonymes et identifie la reformulation :\n\n1) Synonymes : a) diminuer = ......   b) utile = ...... (Choix : bénéfique / réduire)\n\n2) Souligne mentalement et recopie l’outil de reformulation : « L’énergie hydraulique, c’est-à-dire l’énergie de l’eau, produit de l’électricité. »',
				ex1A: '1) a) diminuer = réduire   b) utile = bénéfique\n\n2) L’outil de reformulation est « c’est-à-dire ».',
				ex2Q: 'Exercice 2 (02 pts) : Complète avec (car / c’est pourquoi / grâce aux / à cause du) :\n\n1) ...... panneaux solaires, le village isolé dispose d’électricité.\n\n2) ...... bruit excessif, on entend mal la leçon.\n\n3) L’ordinateur calcule vite, ...... il fait gagner du temps.\n\n4) J’emprunte ce livre ...... il explique les inventions.',
				ex2A: '1) Grâce aux   2) À cause du   3) c’est pourquoi   4) car',
				tableIntro: 'Exercice 3 (02 pts) : Classe les phrases suivantes dans le tableau :\n\nA) « Il consulte la boussole parce que le brouillard cache le chemin. »\n\nB) « L’écran fatigue les yeux, donc il faut faire des pauses régulières. »',
				causeItems: ['Phrase A (parce que le brouillard...)'],
				conseqItems: ['Phrase B (donc il faut faire des pauses...)'],
				quizQ: 'Parmi ces mots, lequel est le synonyme de même nature grammaticale que le verbe « réduire » ?',
				correctOpt: 'diminuer',
				distractors: [
					{ text: 'diminution', diagnosticFeedback: '« diminution » est un nom, pas un verbe.' },
					{ text: 'augmenter', diagnosticFeedback: '« augmenter » est le contraire (antonyme) de « réduire ».' },
					{ text: 'petit', diagnosticFeedback: '« petit » est un adjectif qualificatif.' }
				]
			}
		];

		const s = rng.pick(sets);
		const tableBlock = buildFrenchClassificationTableBlock({
			columns: [
				{ header: 'Expression de la cause', items: s.causeItems, mark: '1' },
				{ header: 'Expression de la conséquence', items: s.conseqItems, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réponds aux exercices de vocabulaire et de grammaire suivants :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.tableIntro },
				tableBlock
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: 'grammaire_syntaxe',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'مرادف الاسم اسم ومرادف الفعل فعل ومرادف الصفة صفة.',
				'استعمل grâce à للسبب الإيجابي و à cause de للسبب السلبي قبل المجموعة الاسمية.',
				'في الجدول: car / parce que / grâce à للسبب، و donc / alors / c’est pourquoi للنتيجة.'
			],
			solutionStepsAr: [
				s.ex1A,
				s.ex2A,
				`Cause : ${s.causeItems.join(' ')} | Conséquence : ${s.conseqItems.join(' ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Expansion du nom & Passé composé
// ═══════════════════════════════════════════════════════════════════════════════
const expl1amT2ExpansionPasseCompose: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t2_expl_expansion_passe_compose',
	grade: '1am',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'البناء اللغوي (2): توسيع الاسم والماضي المركب ومطابقة اسم المفعول',
	curriculumLessonId: 'fre_lesson_1am_t2_passe_compose',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Relie chaque couple de phrases par le pronom relatif « qui » pour éviter la répétition :\n\n1) Le soleil est une étoile. Cette étoile éclaire la Terre.\n\n2) Les panneaux solaires sont des appareils. Ces appareils captent la lumière.',
				ex1A: '1) Le soleil est une étoile qui éclaire la Terre.\n\n2) Les panneaux solaires sont des appareils qui captent la lumière.',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue les verbes entre parenthèses au passé composé en veillant à l’accord du participe passé :\n\n1) Les savants (inventer) ...... des instruments utiles.\n\n2) La nouvelle technologie (arriver) ...... dans nos écoles.\n\n3) Les élèves (choisir) ...... un exposé sur l’énergie solaire.\n\n4) Meriem et Salma (aller) ...... au musée des sciences.',
				ex2A: '1) ont inventé   2) est arrivée   3) ont choisi   4) sont allées',
				ex3Q: 'Exercice 3 (02 pts) : Indique la nature de l’expansion du nom entre parenthèses (Adjectif qualificatif / Complément du nom / Proposition relative) :\n\n1) Un livre (de physique).\n\n2) Une invention (moderne).\n\n3) Un outil (qui guide le voyageur).\n\n4) Une lampe (à économie d’énergie).',
				ex3A: '1) Complément du nom   2) Adjectif qualificatif   3) Proposition relative   4) Complément du nom',
				quizQ: 'Complète correctement au passé composé : « Les deux ingénieures (venir) ...... installer les panneaux solaires. »',
				correctOpt: 'sont venues',
				distractors: [
					{ text: 'ont venu', diagnosticFeedback: 'Le verbe « venir » se conjugue avec l’auxiliaire « être ».' },
					{ text: 'sont venu', diagnosticFeedback: 'Avec « être », le participe passé s’accorde avec le sujet féminin pluriel.' },
					{ text: 'sont venus', diagnosticFeedback: '« Les deux ingénieures » est féminin pluriel (-es).' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Remplace l’adjectif par un complément du nom ou relie par « qui » selon la consigne :\n\n1) Complète avec une préposition (de / en / à) : une machine ...... calculer ; un panneau ...... verre.\n\n2) Relie avec « qui » : Ibn Al-Haytham est un savant. Ce savant a expliqué la vision.',
				ex1A: '1) une machine à calculer ; un panneau en verre.\n\n2) Ibn Al-Haytham est un savant qui a expliqué la vision.',
				ex2Q: 'Exercice 2 (02 pts) : Mets les verbes entre parenthèses au passé composé :\n\n1) Nous (visiter) ...... une centrale solaire.\n\n2) Les chercheurs (faire) ...... une grande découverte.\n\n3) Les informations (devenir) ...... accessibles à tous.\n\n4) Amine (lire) ...... un livre sur Al-Idrisi.',
				ex2A: '1) avons visité   2) ont fait   3) sont devenues   4) a lu',
				ex3Q: 'Exercice 3 (02 pts) : Accorde le participe passé si nécessaire :\n\n1) Elles ont (fabriquer) ...... une maquette d’éolienne.\n\n2) Ces découvertes sont (rester) ...... célèbres.',
				ex3A: '1) fabriqué (avec avoir, pas d’accord avec le sujet : « Elles ont fabriqué »).\n\n2) restées (avec être, accord avec « Ces découvertes », fém. pl. : « sont restées »).',
				quizQ: 'Quelle phrase contient une erreur d’accord du participe passé ?',
				correctOpt: 'Les élèves ont fabriqués une boussole en classe.',
				distractors: [
					{ text: 'Les élèves ont fabriqué une boussole en classe.', diagnosticFeedback: 'Cette phrase est correcte : pas d’accord avec le sujet avec « avoir ».' },
					{ text: 'La lampe solaire est tombée en panne.', diagnosticFeedback: 'Cette phrase est correcte : « être » accorde « tombée » avec « La lampe ».' },
					{ text: 'Les chercheurs sont partis au Sahara.', diagnosticFeedback: 'Cette phrase est correcte : « être » accorde « partis » avec « Les chercheurs ».' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Transforme en reliant avec le pronom relatif « qui » :\n\n1) La boussole possède une aiguille. Cette aiguille montre le nord.\n\n2) Le livre est un compagnon fidèle. Ce compagnon instruit le lecteur.',
				ex1A: '1) La boussole possède une aiguille qui montre le nord.\n\n2) Le livre est un compagnon fidèle qui instruit le lecteur.',
				ex2Q: 'Exercice 2 (02 pts) : Conjugue au passé composé :\n\n1) Les techniciens (réparer) ...... les câbles électriques.\n\n2) La fusée (partir) ...... vers l’espace.\n\n3) Vous (prendre) ...... des notes au laboratoire.\n\n4) Les deux sœurs (entrer) ...... dans la bibliothèque.',
				ex2A: '1) ont réparé   2) est partie   3) avez pris   4) sont entrées',
				ex3Q: 'Exercice 3 (02 pts) : Dans la phrase « Les savants arabes ont laissé des livres de géométrie qui aident les étudiants », relève :\n\n1) Un adjectif qualificatif épithète.\n\n2) Un complément du nom.\n\n3) Une proposition subordonnée relative.',
				ex3A: '1) « arabes »   2) « de géométrie »   3) « qui aident les étudiants ».',
				quizQ: 'Dans la phrase « Des appareils qui économisent l’électricité », quel est l’antécédent du pronom relatif « qui » ?',
				correctOpt: 'Des appareils',
				distractors: [
					{ text: 'l’électricité', diagnosticFeedback: '« l’électricité » est le COD après le verbe.' },
					{ text: 'économisent', diagnosticFeedback: '« économisent » est le verbe conjugué.' },
					{ text: 'qui', diagnosticFeedback: '« qui » est le pronom relatif lui-même.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Effectue les activités suivantes de syntaxe et de conjugaison :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: 'conjugaison_temps',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'عند الربط بـ « qui » احذف الفاعل المكرر في الجملة الثانية وطابق الفعل مع الاسم السابق.',
				'مع المساعد « être » يطابق اسم المفعول الفاعل (+e / +s / +es)، ومع « avoir » لا يطابق الفاعل.',
				'متمم الاسم يُسبق بحرف جر (de, à, en)، وجملة الصلة تبدأ بـ qui + فعل مصرف.'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Expliquer une invention utile
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1am_t2_written_invention_utile',
	grade: '1am',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: شرح عمل وفوائد اختراع نافع (الطاقة الشمسية، الكتاب، البوصلة) (07 نقاط)',
	curriculumLessonId: 'fre_lesson_1am_t2_expliquer_invention',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Ton collège organise une exposition sur les énergies propres. Rédige un court texte explicatif (6 à 8 lignes) pour présenter l’énergie solaire, son fonctionnement et ses avantages pour l’Algérie.',
				notes: [
					'Donne un titre approprié.',
					'Emploie une reformulation (c’est-à-dire ou autrement dit).',
					'Utilise au moins une proposition relative en « qui » et un rapport de cause ou de conséquence (car, grâce à, donc).',
					'Veille à la conjugaison correcte au présent et au passé composé si nécessaire.',
					'Boîte à outils : énergie solaire, renouvelable, panneaux photovoltaïques, lumière, électricité propre, Sahara, protéger l’environnement.'
				],
				modelAnswer:
					'L’énergie solaire, une richesse propre\n\nL’énergie solaire est une énergie renouvelable, c’est-à-dire une ressource inépuisable qui provient du soleil. Des panneaux photovoltaïques captent la lumière du jour pour produire de l’électricité utile aux maisons et aux écoles.\n\nEn Algérie, les ingénieurs ont construit de grandes centrales dans le Sud car le soleil y brille presque toute l’année. Grâce à cette invention moderne, on réduit la pollution de l’air. Donc, l’énergie solaire représente un véritable trésor pour l’avenir.',
				quizQ: 'Quelle phrase combine correctement une reformulation et une proposition relative en « qui » ?',
				correctOpt: 'L’énergie solaire est renouvelable, c’est-à-dire une ressource qui ne s’épuise jamais.',
				distractors: [
					{ text: 'Le soleil brille très fort aujourd’hui.', diagnosticFeedback: 'Cette phrase ne contient ni reformulation ni proposition relative.' },
					{ text: 'Il faut économiser l’eau du robinet.', diagnosticFeedback: 'C’est une consigne hors sujet sur l’eau.' },
					{ text: 'Hier, nous avons vu des panneaux.', diagnosticFeedback: 'Il n’y a ni « c’est-à-dire » ni « qui ».' }
				]
			},
			{
				prompt: 'Dans le cadre d’un exposé scientifique en classe, rédige un court texte explicatif (6 à 8 lignes) présentant le livre imprimé et son rôle essentiel dans la diffusion du savoir.',
				notes: [
					'Propose un titre clair.',
					'Utilise une reformulation (autrement dit / c’est-à-dire) et une expansion du nom (adjectif, CDN ou relative en qui).',
					'Emploie un connecteur de cause (grâce à / parce que) et un connecteur de conséquence (donc / c’est pourquoi).',
					'Boîte à outils : imprimerie, pages, savoir, bibliothèque, lecture, vocabulaire, instruire, générations.'
				],
				modelAnswer:
					'Le livre, un outil précieux de savoir\n\nLe livre est un ensemble de pages imprimées qui rassemble les connaissances scientifiques et culturelles. Autrement dit, il est une source fiable de culture pour tous les lecteurs.\n\nAutrefois, les manuscrits étaient rares, mais l’invention de l’imprimerie a permis de diffuser le savoir rapidement. Grâce à la lecture régulière, l’élève enrichit son vocabulaire et comprend mieux ses leçons ; c’est pourquoi le livre reste un compagnon indispensable.',
				quizQ: 'Quel connecteur logique relie au mieux : « La lecture enrichit le vocabulaire, ...... l’élève s’exprime plus facilement. » ?',
				correctOpt: 'c’est pourquoi',
				distractors: [
					{ text: 'parce que', diagnosticFeedback: 'La deuxième partie exprime la conséquence, pas la cause.' },
					{ text: 'à cause de', diagnosticFeedback: '« à cause de » s’emploie devant un nom pour un effet négatif.' },
					{ text: 'car', diagnosticFeedback: '« car » introduit une cause.' }
				]
			},
			{
				prompt: 'Rédige un court texte explicatif (6 à 8 lignes) pour faire connaître à tes camarades le fonctionnement et l’utilité de la boussole.',
				notes: [
					'Trouve un titre adapté.',
					'Explique comment fonctionne la boussole avec une proposition relative en « qui » et une reformulation.',
					'Mentionne son utilité pour les voyageurs en employant « grâce à » ou « donc ».',
					'Boîte à outils : instrument de navigation, aiguille aimantée, nord, s’orienter, savants, mer, désert, sécurité.'
				],
				modelAnswer:
					'La boussole, un guide fidèle\n\nLa boussole est un instrument de navigation, c’est-à-dire un appareil qui aide les voyageurs à retrouver leur direction. Elle possède une fine aiguille aimantée qui indique toujours le nord, même lorsque le ciel est couvert.\n\nAutrefois, les savants et les marins ont perfectionné cet outil indispensable. Grâce à la boussole, les navigateurs traversent les mers et le désert en sécurité ; donc, cette invention simple a rendu de grands services à l’humanité.',
				quizQ: 'Dans un texte explicatif sur la boussole, quelle phrase utilise correctement le passé composé ?',
				correctOpt: 'Les savants et les marins ont perfectionné cet instrument utile.',
				distractors: [
					{ text: 'Les savants et les marins ont perfectionnés cet instrument.', diagnosticFeedback: 'Avec « avoir », le participe passé ne s’accorde pas avec le sujet.' },
					{ text: 'La boussole a tombé dans le sable.', diagnosticFeedback: 'Le verbe « tomber » se conjugue avec « être » : est tombée.' },
					{ text: 'L’aiguille est indiqué le nord.', diagnosticFeedback: '« indiquer » se conjugue avec « avoir » : a indiqué.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildFrenchWrittenProductionBlock({
			sujetUnTitle: 'Situation d’intégration :',
			sujetUnPrompt: v.prompt,
			sujetUnNotes: v.notes,
			modelAnswer: v.modelAnswer,
			rubricSummary:
				'Pertinence (2 pts) + Cohérence, reformulation et cause/conséquence (2 pts) + Langue : expansions du nom, temps et accords (2 pts) + Présentation et ponctuation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige un texte explicatif clair et structuré en respectant toutes les consignes :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
			difficulty,
			domain: 'production_ecrite',
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Réponse correcte : ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'ابدأ بعنوان واضح وتعريف مرفق بإعادة صياغة (c’est-à-dire / autrement dit).',
				'اشرح كيف يعمل الاختراع باستعمال جملة صلة (qui) ومتمم اسم.',
				'بيّن فائدته باستعمال رابط سبب أو نتيجة (car / grâce à / donc / c’est pourquoi).'
			],
			solutionStepsAr: [
				'المقدمة: تعريف الاختراع وإعادة صياغته ببساطة.',
				'العرض: طريقة العمل والفوائد باستعمال توسيع الاسم والسبب والنتيجة.',
				'الخاتمة: إبراز القيمة العلمية والبيئية للاختراع ومراجعة المطابقة.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T2: FrenchParameterizedTemplate[] = [
	comp1amT2Energies,
	comp1amT2Inventions,
	expl1amT2ReformulationCause,
	expl1amT2ExpansionPasseCompose,
	written1amT2
];
