import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../modules/FrenchTemplates/french-helpers';
import type { OfficialFrenchBacPaperSpec } from './types';

interface SciStreamConfig {
	grade: '3as_se' | '3as_tm' | '3as_math' | '3as_ge';
	yearSubjectId: 685 | 727 | 705 | 750;
	streamId: 'SE' | 'TM' | 'MATH' | 'GE';
	streamNameAr: 'علوم تجريبية' | 'تقني رياضي' | 'رياضيات' | 'تسيير واقتصاد';
	streamNameFr:
		| 'Sciences Expérimentales'
		| 'Techniques Mathématiques'
		| 'Mathématiques'
		| 'Gestion et Économie';
	slugTrack: '3as-se' | '3as-tm' | '3as-math' | '3as-ge';
}

const SCI_STREAMS: readonly SciStreamConfig[] = [
	{
		grade: '3as_se',
		yearSubjectId: 685,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameFr: 'Sciences Expérimentales',
		slugTrack: '3as-se'
	},
	{
		grade: '3as_tm',
		yearSubjectId: 727,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameFr: 'Techniques Mathématiques',
		slugTrack: '3as-tm'
	},
	{
		grade: '3as_math',
		yearSubjectId: 705,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameFr: 'Mathématiques',
		slugTrack: '3as-math'
	},
	{
		grade: '3as_ge',
		yearSubjectId: 750,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameFr: 'Gestion et Économie',
		slugTrack: '3as-ge'
	}
];

interface CanonicalSciYearContent {
	academicYear: '2023' | '2024' | '2025';
	unitThemeFr: string;
	titleTopicFr: string;
	titleTopicAr: string;
	themesFr: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}

function buildSciMetadata(stream: SciStreamConfig, year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3e Année Secondaire (3AS / BAC)',
		streamId: stream.streamId,
		streamName: stream.streamNameFr,
		subjectId: 'FRE-SEC',
		subjectName: 'Langue Française',
		trimesterId: 't3',
		trimesterName: 'Session d’entraînement au Baccalauréat',
		docType: 'exam',
		academicYear: year,
		duration: '02 h 30',
		coefficient: 2,
		examSessionAr: 'Juin ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Examen blanc du Baccalauréat — Langue Française',
		siteUrl: 'https://sujetstore.com'
	};
}

function projectCanonicalToStreams(
	canonical: CanonicalSciYearContent
): OfficialFrenchBacPaperSpec[] {
	return SCI_STREAMS.map((stream) => {
		const examDoc: ExamDocument = {
			metadata: buildSciMetadata(stream, canonical.academicYear),
			exercises: canonical.exercises
		};
		return {
			slug: `bac-${canonical.academicYear}-${stream.slugTrack}-french`,
			grade: stream.grade,
			yearSubjectId: stream.yearSubjectId,
			subjectId: 'FRE-SEC',
			streamId: stream.streamId,
			streamNameAr: stream.streamNameAr,
			streamNameFr: stream.streamNameFr,
			academicYear: canonical.academicYear,
			sessionFr: `Juin ${canonical.academicYear}`,
			sessionAr: `دورة جوان ${canonical.academicYear}`,
			coefficient: 2,
			duration: '02 h 30',
			pointsSplit: [7, 7, 6] as const,
			unitThemeFr: canonical.unitThemeFr,
			titleFr: `Examen blanc du Baccalauréat en Français — ${stream.streamNameFr} (Juin ${canonical.academicYear} : ${canonical.titleTopicFr})`,
			titleAr: `موضوع بكالوريا تدريبي في اللغة الفرنسية — شعبة ${stream.streamNameAr} (دورة جوان ${canonical.academicYear} — ${canonical.titleTopicAr})`,
			themesFr: canonical.themesFr,
			themesAr: canonical.themesAr,
			templateId: 'french/bac_official',
			examDoc
		};
	});
}

// ============================================================================
// 2023 — Projet 1 : Texte d'Histoire (Association des Oulémas Musulmans Algériens)
// ============================================================================
const CANONICAL_SCI_2023: CanonicalSciYearContent = {
	academicYear: '2023',
	unitThemeFr: 'Projet 1 : Texte d’Histoire — L’éveil national et le mouvement réformiste algérien',
	titleTopicFr: 'Le rôle éducatif et patriotique de l’Association des Oulémas Musulmans Algériens',
	titleTopicAr: 'الدور التربوي والوطني لجمعية العلماء المسلمين الجزائريين في الوعي الوطني',
	themesFr: [
		'Texte d’Histoire',
		'Association des Oulémas Musulmans Algériens',
		'Cheikh Abdelhamid Ben Badis',
		'Cheikh Mohamed Bachir El-Ibrahimi'
	],
	themesAr: [
		'النص التاريخي',
		'جمعية العلماء المسلمين الجزائريين',
		'الشيخ عبد الحميد بن باديس',
		'الشيخ محمد البشير الإبراهيمي'
	],
	exercises: [
		{
			id: 'sci_fr_2023_comp',
			customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
			points: 7,
			instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions.',
			content: [
				buildFrenchPassageBlock({
					title: 'L’Association des Oulémas : une école de savoir et de dignité nationale',
					paragraphs: [
						'Le 5 mai 1931, à Alger, fut fondée l’Association des Oulémas Musulmans Algériens sous la présidence de Cheikh Abdelhamid Ben Badis, entouré de savants dévoués tels que Cheikh Mohamed Bachir El-Ibrahimi, Cheikh Moubarek El-Mili et Cheikh Larbi Tebessi. À une époque où l’administration coloniale multipliait les entraves contre l’enseignement de la langue arabe et les valeurs islamiques, cette institution se donna pour mission de réveiller la conscience du peuple algérien par le savoir authentique et la réforme morale.',
						'Pour atteindre cet objectif ambitieux, l’Association bâtit un vaste réseau d’écoles libres, de cercles culturels et de bibliothèques dans les villes comme dans les campagnes reculées. Des milliers d’enfants, filles et garçons, y apprenaient la lecture, la grammaire arabe, les fondements de la religion islamique, l’histoire nationale et les sciences utiles. [[Ils]] y acquéraient surtout la fierté de leur identité et la conviction que l’ignorance constituait le premier obstacle à la libération.',
						'Parallèlement à son œuvre scolaire, le mouvement réformiste s’appuya sur une presse engagée et rigoureuse. Les journaux comme El-Mountaqid, Ech-Chihab puis El-Bassaïr devinrent de véritables tribunes intellectuelles. À travers [[leurs]] articles, Cheikh Ben Badis et son successeur Cheikh El-Ibrahimi réfutaient la propagande coloniale, combattaient les superstitions et rappelaient sans relâche la devise fondatrice : « L’Islam est notre religion, l’Algérie est notre patrie, l’arabe est notre langue. »',
						'Lorsque la Révolution du 1er Novembre 1954 éclata, les fruits de ce patient travail éducatif apparurent au grand jour. De nombreux enseignants et anciens élèves des médersas libres rejoignirent les rangs de la lutte armée, confirmant ainsi les analyses de l’historien Abou El-Kacem Saadallah : la renaissance intellectuelle préparée par les Oulémas avait solidement forgé l’unité spirituelle et patriotique de la nation algérienne.'
					],
					source:
						'Synthèse historique adaptée de travaux sur le mouvement réformiste algérien, Édition pédagogique SujetStore',
					numberedParagraphs: true,
					glossary: [
						{ term: 'entraves', meaning: 'obstacles, mesures destinées à empêcher une action' },
						{ term: 'médersas libres', meaning: 'écoles indépendantes créées et financées par la population algérienne' }
					]
				}),
				{
					type: 'text',
					content: '#strong[1.] Choisissez la bonne réponse en cochant la case correspondante.'
				},
				{
					type: 'multiple_choice',
					groups: [
						{
							header: 'a) Ce texte appartient au genre :',
							options: [
								'du texte d’Histoire',
								'du débat d’idées contradictoire',
								'de l’appel écologique'
							],
							correct: 'du texte d’Histoire',
							mark: '0.5'
						},
						{
							header: 'b) L’action principale de l’Association des Oulémas reposait sur :',
							options: [
								'le commerce maritime en Méditerranée',
								'l’enseignement libre, la réforme morale et la presse engagée',
								'la construction d’usines industrielles'
							],
							correct: 'l’enseignement libre, la réforme morale et la presse engagée',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content:
						'#strong[2.] Complétez le tableau récapitulatif suivant à partir des informations du texte.'
				},
				{
					type: 'table',
					headers: ['Date ou repère', 'Événement ou action historique', 'Figures ou médias cités'],
					cells: [],
					rows: [
						[
							{ content: '5 mai 1931', bold: true },
							{
								content: '....................',
								answer: 'Fondation de l’Association des Oulémas Musulmans Algériens à Alger',
								mark: '0.25'
							},
							{
								content: '....................',
								answer: 'Cheikh Abdelhamid Ben Badis, Cheikh El-Ibrahimi, Cheikh El-Mili, Cheikh Tebessi',
								mark: '0.25'
							}
						],
						[
							{ content: 'Presse réformiste', bold: true },
							{
								content: '....................',
								answer: 'Réfuter la propagande coloniale, combattre les superstitions et diffuser la devise nationale',
								mark: '0.25'
							},
							{
								content: '....................',
								answer: 'El-Mountaqid, Ech-Chihab, El-Bassaïr',
								mark: '0.25'
							}
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content:
						'#strong[3.] Répondez par « Vrai » ou « Faux » puis justifiez chaque réponse à partir du texte.'
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'a) L’administration coloniale encourageait l’enseignement de la langue arabe en Algérie.',
							a: 'Faux',
							c: 'L’administration coloniale multipliait les entraves contre l’enseignement de la langue arabe et les valeurs islamiques (§1).',
							mark: '0.5'
						},
						{
							q: 'b) Les écoles libres de l’Association accueillaient à la fois les filles et les garçons.',
							a: 'Vrai',
							c: 'Des milliers d’enfants, filles et garçons, y apprenaient la lecture, la grammaire arabe, la religion, l’histoire et les sciences (§2).',
							mark: '0.5'
						},
						{
							q: 'c) Le mouvement réformiste a limité son action uniquement aux grandes villes côtières.',
							a: 'Faux',
							c: 'L’Association a bâti un vaste réseau d’écoles et de cercles culturels dans les villes comme dans les campagnes reculées (§2).',
							mark: '0.5'
						},
						{
							q: 'd) L’historien Abou El-Kacem Saadallah souligne le rôle de cette renaissance dans l’unité nationale.',
							a: 'Vrai',
							c: 'Il confirme que la renaissance intellectuelle préparée par les Oulémas avait solidement forgé l’unité spirituelle et patriotique de la nation (§4).',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content: '#strong[4.] Répondez aux questions suivantes en vous appuyant sur le texte.'
				},
				{
					type: 'text',
					content:
						'a) Quelles disciplines étaient enseignées dans les écoles libres de l’Association des Oulémas ?',
					answer:
						'a) On y enseignait la lecture, la grammaire arabe, les fondements de la religion islamique, l’histoire nationale et les sciences utiles.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) Comment le travail éducatif des Oulémas a-t-il contribué à la Révolution du 1er Novembre 1954 ?',
					answer:
						'b) Il a forgé l’unité spirituelle et patriotique de la nation ; de nombreux enseignants et anciens élèves des médersas libres ont rejoint la lutte armée.',
					mark: '1'
				},
				{
					type: 'text',
					content: '#strong[5.] À qui ou à quoi renvoient les pronoms soulignés dans le texte ?'
				},
				{
					type: 'text',
					content: 'a) « Ils » (§2) renvoie à : ............................',
					answer: 'a) « Ils » renvoie à « des milliers d’enfants, filles et garçons ».',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) « leurs » (§3) renvoie à : ............................',
					answer: 'b) « leurs » renvoie aux journaux réformistes (El-Mountaqid, Ech-Chihab et El-Bassaïr).',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_fr_2023_lang',
			customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
			points: 7,
			instruction: 'Réalisez avec précision les activités de lexique, de grammaire et de discours.',
			content: [
				{
					type: 'text',
					content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
				},
				{
					type: 'text',
					content: 'a) obstacles (§1) = ............................',
					answer: 'a) entraves',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) éloignées (§2) = ............................',
					answer: 'b) reculées',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) contredisaient (§3) = ............................',
					answer: 'c) réfutaient',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'#strong[2.] Classez les mots et expressions suivants dans le tableau selon le champ lexical auquel ils appartiennent : #emph[médersas libres ; lutte armée ; bibliothèques ; conscience du peuple ; grammaire arabe ; patrie].'
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{
							header: 'Champ lexical de l’instruction',
							items: ['médersas libres', 'bibliothèques', 'grammaire arabe'],
							mark: '0.5'
						},
						{
							header: 'Champ lexical de l’éveil national',
							items: ['lutte armée', 'conscience du peuple', 'patrie'],
							mark: '0.5'
						}
					]
				}),
				{
					type: 'text',
					content:
						'#strong[3.] Complétez le tableau de dérivation (famille de mots) ci-dessous.'
				},
				buildFrenchWordFamilyTableBlock([
					{
						verbe: { given: true, value: 'fonder' },
						nom: { value: 'fondation / fondement', mark: '0.25' },
						adjectif: { value: 'fondateur / fondamental', mark: '0.25' }
					},
					{
						verbe: { value: 'libérer', mark: '0.25' },
						nom: { given: true, value: 'libération' },
						adjectif: { value: 'libre / libérateur', mark: '0.25' }
					},
					{
						verbe: { value: 'réformer', mark: '0.25' },
						nom: { value: 'réforme / réformateur', mark: '0.25' },
						adjectif: { given: true, value: 'réformiste' }
					}
				]),
				{
					type: 'text',
					content: '#strong[4.] Effectuez les transformations grammaticales demandées.'
				},
				{
					type: 'text',
					content:
						'a) Transformez la phrase suivante à la voix passive :\n« L’Association des Oulémas a bâti un vaste réseau d’écoles libres. »',
					answer:
						'a) Un vaste réseau d’écoles libres a été bâti par l’Association des Oulémas.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) Transposez la phrase suivante au discours indirect :\nCheikh Ben Badis affirmait au peuple algérien : « L’ignorance constitue le premier obstacle à votre libération. »',
					answer:
						'b) Cheikh Ben Badis affirmait au peuple algérien que l’ignorance constituait le premier obstacle à leur (sa) libération.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'#strong[5.] Quelle est la visée communicative de l’auteur dans ce texte ? Justifiez brièvement votre réponse.',
					answer:
						'La visée communicative de l’auteur est d’informer sur le parcours historique de l’Association des Oulémas Musulmans Algériens et de rendre hommage à son rôle décisif dans la préservation de l’identité nationale et l’éveil patriotique avant 1954.',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_fr_2023_prod',
			customTitle: 'II. Production écrite',
			points: 6,
			instruction: 'Rédigez un texte clair, cohérent et soigné en respectant les consignes.',
			content: [
				buildFrenchWrittenProductionBlock({
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Vous voulez partager les informations essentielles de ce texte avec vos camarades sur le journal mural du lycée. Rédigez-en le compte rendu objectif en une douzaine de lignes (120 à 150 mots).',
					sujetUnNotes: [
						'Présentez le texte dans une accroche (titre, source, thème général et visée communicative).',
						'Reformulez les idées essentielles à la troisième personne sans donner votre opinion personnelle.',
						'Utilisez des verbes introducteurs appropriés (expose, souligne, rappelle, montre) et des articulateurs logiques.'
					],
					sujetDeuxPrompt:
						'À l’occasion de la Journée du Savoir (Yaoum El-Ilm, 16 avril), votre établissement organise une exposition sur le rôle de la science dans l’émancipation des nations. Rédigez un texte expositif et historique d’une quinzaine de lignes dans lequel vous montrerez comment l’instruction et l’attachement aux valeurs authentiques ont aidé le peuple algérien à préserver son identité.',
					rubricSummary:
						'Respect de la consigne et de la structure du compte rendu objectif (1.5 pt) ; fidélité et pertinence des idées reformulées (2 pts) ; cohérence textuelle et articulateurs (1 pt) ; correction de la langue, orthographe et présentation (1.5 pt).',
					modelAnswer:
						'Le texte intitulé « L’Association des Oulémas : une école de savoir et de dignité nationale », adapté de travaux historiques sur le mouvement réformiste algérien (Édition pédagogique SujetStore), traite du rôle éducatif et patriotique joué par cette institution dans l’éveil national algérien. L’auteur vise à informer le lecteur sur cet engagement et à lui rendre hommage.\n\nDans un premier temps, il rappelle que l’Association fut créée le 5 mai 1931 à Alger par Cheikh Abdelhamid Ben Badis et d’autres savants comme Cheikh El-Ibrahimi afin de défendre la langue arabe et les valeurs islamiques face aux entraves coloniales. Ensuite, il souligne l’édification d’un large réseau d’écoles libres et de bibliothèques dans les villes et les campagnes, où filles et garçons recevaient un enseignement complet forgeant leur dignité. En outre, l’auteur met en lumière l’action de la presse réformiste, notamment Ech-Chihab et El-Bassaïr, pour réfuter la propagande coloniale et diffuser la devise nationale. Enfin, il montre, en citant l’historien Abou El-Kacem Saadallah, que ce travail intellectuel prépara l’unité patriotique lors de la Révolution de 1954.',
					mark: '6'
				})
			]
		}
	]
};

// ============================================================================
// 2024 — Projet 2 : Débat d'idées (IA, lecture et éthique scientifique)
// ============================================================================
const CANONICAL_SCI_2024: CanonicalSciYearContent = {
	academicYear: '2024',
	unitThemeFr:
		'Projet 2 : Débat d’idées — Intelligence artificielle, lecture et éthique scientifique',
	titleTopicFr: 'Intelligence artificielle, lecture et responsabilité éthique',
	titleTopicAr: 'الذكاء الاصطناعي والمطالعة والأخلاقيات العلمية بين التقدم والمسؤولية',
	themesFr: [
		'Débat d’idées',
		'Intelligence artificielle',
		'Éthique scientifique',
		'Lecture et esprit critique'
	],
	themesAr: [
		'النص الحجاجي ومناظرة الأفكار',
		'الذكاء الاصطناعي',
		'الأخلاقيات العلمية',
		'المطالعة والروح النقدية'
	],
	exercises: [
		{
			id: 'sci_fr_2024_comp',
			customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
			points: 7,
			instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions.',
			content: [
				buildFrenchPassageBlock({
					title: 'Intelligence artificielle et savoir : progrès technique ou paresse intellectuelle ?',
					paragraphs: [
						'L’essor fulgurant des outils d’intelligence artificielle transforme aujourd’hui la recherche scientifique, l’éducation et l’organisation du travail. Face à cette mutation rapide, deux points de vue s’affrontent dans le débat public. Faut-il accueillir ces systèmes numériques comme des alliés précieux du progrès scientifique, ou craindre qu’[[ils]] n’affaiblissent la lecture attentive et l’autonomie intellectuelle des jeunes générations ?',
						'Les partisans de ces technologies mettent en avant des avancées indéniables. En médecine, des algorithmes spécialisés assistent les chercheurs dans l’analyse rapide d’images radiologiques et la détection précoce de maladies complexes. Dans les universités et les laboratoires, l’intelligence artificielle accélère le traitement de vastes bases de données climatiques, agricoles ou mathématiques, permettant aux scientifiques de consacrer davantage de temps à la réflexion originale et à l’expérimentation.',
						'À l’inverse, de nombreux pédagogues et chercheurs alertent sur les dérives d’un usage passif. Lorsque des élèves confient à une machine la rédaction de [[leurs]] devoirs ou le résumé de livres qu’ils n’ont jamais ouverts, ils se privent de l’effort formateur de la lecture et de la synthèse personnelle. Par ailleurs, la diffusion d’informations erronées et le plagiat automatisé menacent directement la rigueur académique et l’honnêteté intellectuelle.',
						'En définitive, la technique ne possède pas de morale propre : sa valeur dépend de la conscience humaine qui l’oriente. La grande tradition scientifique incarnée autrefois par des savants comme Ibn Al-Haytham en optique ou Al-Khwarizmi en mathématiques nous rappelle que la méthode rigoureuse et la responsabilité éthique doivent toujours guider l’innovation. Bien encadrée par l’école et la famille, l’intelligence artificielle peut rester un outil au service de la connaissance, sans jamais remplacer l’esprit humain.'
					],
					source:
						'Adaptation d’un dossier de vulgarisation scientifique et éducative, Édition SujetStore',
					numberedParagraphs: true,
					glossary: [
						{ term: 'fulgurant', meaning: 'extrêmement rapide et soudain' },
						{
							term: 'plagiat',
							meaning: 'fait de copier le travail d’autrui ou d’une source en se l’attribuant'
						}
					]
				}),
				{
					type: 'text',
					content: '#strong[1.] Choisissez la bonne réponse en cochant la case correspondante.'
				},
				{
					type: 'multiple_choice',
					groups: [
						{
							header: 'a) Le problème posé par le texte concerne :',
							options: [
								'le prix des ordinateurs sur le marché international',
								'les avantages et les risques de l’intelligence artificielle face à la lecture et à l’éthique',
								'l’histoire de l’imprimerie ancienne'
							],
							correct:
								'les avantages et les risques de l’intelligence artificielle face à la lecture et à l’éthique',
							mark: '0.5'
						},
						{
							header: 'b) Dans le dernier paragraphe, l’auteur adopte une position :',
							options: [
								'nuancée qui prône un usage encadré et éthique',
								'hostile à toute innovation scientifique',
								'favorable au remplacement total des enseignants'
							],
							correct: 'nuancée qui prône un usage encadré et éthique',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content:
						'#strong[2.] Complétez le tableau comparatif suivant à partir des paragraphes 2 et 3.'
				},
				{
					type: 'table',
					headers: ['Position dans le débat', 'Arguments ou domaines évoqués dans le texte'],
					cells: [],
					rows: [
						[
							{
								content: '....................',
								answer: 'Partisans des outils d’intelligence artificielle (Thèse favorable)',
								mark: '0.25'
							},
							{
								content: '....................',
								answer:
									'Aide au diagnostic médical précoce ; traitement rapide des données climatiques, agricoles et mathématiques',
								mark: '0.25'
							}
						],
						[
							{
								content: '....................',
								answer: 'Pédagogues et chercheurs critiques (Antithèse / Réserves)',
								mark: '0.25'
							},
							{
								content: '....................',
								answer:
									'Perte de l’effort de lecture et de synthèse ; erreurs d’information et plagiat automatisé',
								mark: '0.25'
							}
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content:
						'#strong[3.] Répondez par « Vrai » ou « Faux » puis justifiez chaque réponse à partir du texte.'
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'a) En médecine, les algorithmes peuvent aider à repérer précocement certaines maladies.',
							a: 'Vrai',
							c: 'Des algorithmes spécialisés assistent les chercheurs dans l’analyse d’images radiologiques et la détection précoce de maladies complexes (§2).',
							mark: '0.5'
						},
						{
							q: 'b) Confier ses devoirs à une machine renforce l’autonomie intellectuelle des élèves.',
							a: 'Faux',
							c: 'Les élèves se privent alors de l’effort formateur de la lecture et de la synthèse personnelle (§3).',
							mark: '0.5'
						},
						{
							q: 'c) Selon l’auteur, la technique dispose d’une morale autonome indépendante de l’homme.',
							a: 'Faux',
							c: 'La technique ne possède pas de morale propre : sa valeur dépend de la conscience humaine qui l’oriente (§4).',
							mark: '0.5'
						},
						{
							q: 'd) L’auteur cite Ibn Al-Haytham et Al-Khwarizmi comme modèles de méthode rigoureuse.',
							a: 'Vrai',
							c: 'Il évoque la tradition scientifique incarnée par Ibn Al-Haytham en optique et Al-Khwarizmi en mathématiques (§4).',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content: '#strong[4.] Répondez aux questions suivantes selon le texte.'
				},
				{
					type: 'text',
					content:
						'a) Quelles sont les deux menaces qui pèsent sur la rigueur académique selon le troisième paragraphe ?',
					answer:
						'a) La diffusion d’informations erronées et le plagiat automatisé menacent la rigueur académique et l’honnêteté intellectuelle.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) À quelle condition l’intelligence artificielle peut-elle rester bénéfique pour la connaissance ?',
					answer:
						'b) Elle reste bénéfique lorsqu’elle est bien encadrée par l’école et la famille, guidée par la conscience humaine et la responsabilité éthique, sans remplacer l’esprit humain.',
					mark: '1'
				},
				{
					type: 'text',
					content: '#strong[5.] À qui ou à quoi renvoient les pronoms soulignés dans le texte ?'
				},
				{
					type: 'text',
					content: 'a) « ils » (§1) renvoie à : ............................',
					answer: 'a) « ils » renvoie à « ces systèmes numériques » (les outils d’intelligence artificielle).',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) « leurs » (§3) renvoie à : ............................',
					answer: 'b) « leurs » renvoie aux élèves.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_fr_2024_lang',
			customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
			points: 7,
			instruction: 'Réalisez avec soin les exercices de vocabulaire, de grammaire et d’analyse.',
			content: [
				{
					type: 'text',
					content: '#strong[1.] Trouvez dans le texte l’antonyme (le contraire) de chacun des mots suivants :'
				},
				{
					type: 'text',
					content: 'a) tardive (§2) = ............................',
					answer: 'a) précoce',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) actif (§3) = ............................',
					answer: 'b) passif',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) exactes (§3) = ............................',
					answer: 'c) erronées',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[algorithmes spécialisés ; honnêteté intellectuelle ; bases de données ; conscience humaine ; systèmes numériques ; responsabilité éthique].'
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{
							header: 'Champ lexical de la technologie',
							items: ['algorithmes spécialisés', 'bases de données', 'systèmes numériques'],
							mark: '0.5'
						},
						{
							header: 'Champ lexical de l’éthique',
							items: ['honnêteté intellectuelle', 'conscience humaine', 'responsabilité éthique'],
							mark: '0.5'
						}
					]
				}),
				{
					type: 'text',
					content: '#strong[3.] Complétez le tableau de la famille de mots (nominalisation).'
				},
				buildFrenchWordFamilyTableBlock([
					{
						verbe: { given: true, value: 'expérimenter' },
						nom: { value: 'expérimentation / expérience', mark: '0.25' },
						adjectif: { value: 'expérimental', mark: '0.25' }
					},
					{
						verbe: { value: 'analyser', mark: '0.25' },
						nom: { given: true, value: 'analyse' },
						adjectif: { value: 'analytique', mark: '0.25' }
					},
					{
						verbe: { value: 'innover', mark: '0.25' },
						nom: { value: 'innovation', mark: '0.25' },
						adjectif: { given: true, value: 'innovant' }
					}
				]),
				{
					type: 'text',
					content: '#strong[4.] Réécrivez les phrases suivantes en respectant le rapport logique indiqué.'
				},
				{
					type: 'text',
					content:
						'a) Exprimez la concession en utilisant « Bien que » :\n« Les outils numériques traitent rapidement les données, mais ils ne remplacent pas le jugement humain. »',
					answer:
						'a) Bien que les outils numériques traitent rapidement les données, ils ne remplacent pas le jugement humain.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) Exprimez la conséquence en reliant les deux propositions par « si bien que » :\n« Certains élèves abusent des résumés automatisés. Ils perdent l’habitude de lire attentivement. »',
					answer:
						'b) Certains élèves abusent des résumés automatisés, si bien qu’ils perdent l’habitude de lire attentivement.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'#strong[5.] Quelle est la visée communicative de l’auteur dans ce débat d’idées ? Expliquez en deux lignes.',
					answer:
						'L’auteur cherche à confronter deux thèses sur l’intelligence artificielle pour convaincre le lecteur qu’un progrès technique véritable exige toujours une lecture personnelle, une méthode rigoureuse et une éthique responsable.',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_fr_2024_prod',
			customTitle: 'II. Production écrite',
			points: 6,
			instruction: 'Traitez l’un des deux sujets proposés avec méthode, clarté et rigueur.',
			content: [
				buildFrenchWrittenProductionBlock({
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'À l’occasion d’un atelier scolaire sur le numérique responsable, vous êtes chargé(e) de présenter ce texte à vos camarades. Rédigez-en le compte rendu objectif en 120 à 150 mots.',
					sujetUnNotes: [
						'Rédigez une introduction présentant le titre, la source, le thème et la visée argumentative.',
						'Restituez fidèlement les deux points de vue puis la synthèse finale de l’auteur sans employer « je ».',
						'Soignez les articulateurs d’opposition (en revanche, cependant) et de conclusion (enfin, en somme).'
					],
					sujetDeuxPrompt:
						'Certains lycéens estiment que les applications intelligentes rendent inutile l’apprentissage approfondi des méthodes scientifiques et de la lecture. Partagez-vous cette opinion ? Rédigez un texte argumentatif d’une quinzaine de lignes étayé par deux arguments solides et des exemples précis.',
					rubricSummary:
						'Conformité au genre du compte rendu objectif (1.5 pt) ; exactitude des thèses et synthèse reformulées (2 pts) ; articulation logique et cohérence (1 pt) ; correction syntaxique, orthographe et soin (1.5 pt).',
					modelAnswer:
						'Le texte intitulé « Intelligence artificielle et savoir : progrès technique ou paresse intellectuelle ? », adapté d’un dossier de vulgarisation scientifique (Édition SujetStore), aborde le débat suscité par l’usage de l’intelligence artificielle dans la recherche et l’éducation. L’auteur vise à confronter deux visions pour plaider en faveur d’une utilisation éthique et encadrée.\n\nD’une part, l’auteur expose les arguments des partisans qui soulignent l’apport majeur des algorithmes en médecine, notamment pour la détection précoce des maladies, ainsi que dans l’analyse rapide de données scientifiques. D’autre part, il rapporte les craintes de nombreux pédagogues : un recours passif à ces outils prive les élèves de l’effort de lecture et favorise le plagiat ainsi que les erreurs. En conclusion, s’appuyant sur l’héritage rigoureux d’Ibn Al-Haytham et d’Al-Khwarizmi, l’auteur soutient que l’intelligence artificielle doit demeurer un simple instrument guidé par la conscience humaine et l’encadrement éducatif.',
					mark: '6'
				})
			]
		}
	]
};

// ============================================================================
// 2025 — Projet 3 : L'Appel (Forêts algériennes, Barrage Vert et eau)
// ============================================================================
const CANONICAL_SCI_2025: CanonicalSciYearContent = {
	academicYear: '2025',
	unitThemeFr:
		'Projet 3 : L’Appel — Sauvegarde des forêts algériennes, du Barrage Vert et de l’eau',
	titleTopicFr: 'Appel urgent pour la protection des forêts algériennes et des ressources hydriques',
	titleTopicAr: 'نداء عاجل لحماية الغابات الجزائرية والسد الأخضر والثروة المائية',
	themesFr: ['Texte exhortatif (L’Appel)', 'Barrage Vert', 'Forêts algériennes', 'Gestion de l’eau'],
	themesAr: ['نص النداء', 'السد الأخضر', 'الغابات الجزائرية', 'الحفاظ على الثروة المائية'],
	exercises: [
		{
			id: 'sci_fr_2025_comp',
			customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
			points: 7,
			instruction: 'Lisez attentivement cet appel puis répondez aux questions posées.',
			content: [
				buildFrenchPassageBlock({
					title: 'Protégeons nos forêts, notre Barrage Vert et chaque goutte d’eau !',
					paragraphs: [
						'Depuis plusieurs étés, les épisodes de sécheresse prolongée et les incendies dévastateurs mettent à rude épreuve le patrimoine naturel de l’Algérie. Des milliers d’hectares de cèdres, de chênes-lièges et de pins d’Alep ont été réduits en cendres, tandis que le niveau de nombreux barrages connaît une baisse préoccupante. Face à cette double menace écologique, l’indifférence n’est plus permise.',
						'Pourtant, notre pays dispose d’atouts remarquables et d’une expérience historique reconnue : le projet du Barrage Vert, relancé pour freiner l’avancée de la désertification des Hauts Plateaux jusqu’aux portes du Sahara. Préserver [[ce bouclier végétal]] et restaurer les massifs forestiers du Nord ne servent pas seulement à embellir les paysages ; ils retiennent les sols fertiles, régulent les pluies locales et protègent les nappes phréatiques qui alimentent nos villes et nos campagnes.',
						'La sauvegarde de ces richesses vitales est un devoir civique et moral envers les générations futures. L’éthique islamique et le sens de la responsabilité collective nous rappellent que le gaspillage de l’eau est condamnable, même devant une rivière abondante, et que planter un arbre utile constitue une œuvre durable de bienfaisance. Chaque citoyen, chaque agriculteur et chaque élève peut devenir un gardien vigilant de la nature.',
						'C’est pourquoi nous appelons solennellement les jeunes, les associations locales, les collectivités et les familles à se mobiliser dès aujourd’hui ! Participez activement aux campagnes de reboisement raisonné, nettoyez les lisières forestières avant la saison chaude et adoptez au quotidien des gestes économes en eau. Unissons [[nos]] efforts avec constance afin que l’Algérie demeure une terre verte, féconde et généreuse pour demain.'
					],
					source:
						'Appel citoyen adapté des campagnes nationales de reboisement et d’économie d’eau, Édition SujetStore',
					numberedParagraphs: true,
					glossary: [
						{
							term: 'nappes phréatiques',
							meaning: 'réserves d’eau souterraines alimentant les puits et les sources'
						},
						{
							term: 'lisières forestières',
							meaning: 'bordures ou limites extérieures d’une forêt'
						}
					]
				}),
				{
					type: 'text',
					content: '#strong[1.] Choisissez la bonne réponse en cochant la case correspondante.'
				},
				{
					type: 'multiple_choice',
					groups: [
						{
							header: 'a) Ce texte est un appel destiné principalement à :',
							options: [
								'raconter un voyage touristique dans le Sahara',
								'sensibiliser et mobiliser les citoyens pour protéger les forêts et l’eau',
								'présenter le règlement d’une compétition sportive'
							],
							correct:
								'sensibiliser et mobiliser les citoyens pour protéger les forêts et l’eau',
							mark: '0.5'
						},
						{
							header: 'b) Dans le premier paragraphe, les auteurs dressent :',
							options: [
								'un constat négatif et alarmant',
								'un portrait humoristique',
								'une biographie historique'
							],
							correct: 'un constat négatif et alarmant',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content:
						'#strong[2.] Relevez dans le texte les éléments permettant de compléter la grille de communication de cet appel.'
				},
				{
					type: 'table',
					headers: ['Qui lance l’appel ?', 'À qui s’adresse-t-il ?', 'Constat initial', 'But recherché'],
					cells: [],
					rows: [
						[
							{
								content: '....................',
								answer: 'Un collectif citoyen engagé (« nous »)',
								mark: '0.25'
							},
							{
								content: '....................',
								answer: 'Les jeunes, les associations locales, les collectivités et les familles',
								mark: '0.25'
							},
							{
								content: '....................',
								answer: 'Sécheresse prolongée, incendies de forêts et baisse du niveau des barrages',
								mark: '0.25'
							},
							{
								content: '....................',
								answer: 'Protéger les forêts, renforcer le Barrage Vert et économiser l’eau',
								mark: '0.25'
							}
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content:
						'#strong[3.] Répondez par « Vrai » ou « Faux » puis justifiez chaque réponse à partir du texte.'
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'a) Les incendies n’ont touché qu’une seule espèce d’arbre en Algérie.',
							a: 'Faux',
							c: 'Des milliers d’hectares de cèdres, de chênes-lièges et de pins d’Alep ont été réduits en cendres (§1).',
							mark: '0.5'
						},
						{
							q: 'b) Le Barrage Vert contribue à freiner la désertification et à protéger les nappes phréatiques.',
							a: 'Vrai',
							c: 'Il freine la désertification, retient les sols fertiles, régule les pluies locales et protège les nappes phréatiques (§2).',
							mark: '0.5'
						},
						{
							q: 'c) Le texte estime que le gaspillage de l’eau est tolérable lorsque les rivières sont abondantes.',
							a: 'Faux',
							c: 'L’éthique islamique rappelle que le gaspillage de l’eau est condamnable, même devant une rivière abondante (§3).',
							mark: '0.5'
						},
						{
							q: 'd) Les auteurs demandent de nettoyer les bordures forestières avant l’arrivée de l’été.',
							a: 'Vrai',
							c: 'Ils exhortent à nettoyer les lisières forestières avant la saison chaude (§4).',
							mark: '0.5'
						}
					]
				},
				{
					type: 'text',
					content: '#strong[4.] Répondez aux questions suivantes à partir du texte.'
				},
				{
					type: 'text',
					content:
						'a) Quels sont les trois bienfaits écologiques des massifs forestiers et du Barrage Vert mentionnés au paragraphe 2 ?',
					answer:
						'a) Ils retiennent les sols fertiles, régulent les pluies locales et protègent les nappes phréatiques (tout en freinant la désertification).',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) Citez deux actions concrètes recommandées dans le dernier paragraphe pour agir dès aujourd’hui.',
					answer:
						'b) Participer aux campagnes de reboisement raisonné, nettoyer les lisières forestières avant la saison chaude et adopter des gestes économes en eau (deux actions au choix).',
					mark: '1'
				},
				{
					type: 'text',
					content: '#strong[5.] À qui ou à quoi renvoient les expressions soulignées dans le texte ?'
				},
				{
					type: 'text',
					content: 'a) « ce bouclier végétal » (§2) renvoie à : ............................',
					answer: 'a) « ce bouclier végétal » renvoie au projet du Barrage Vert.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) « nos » (§4) renvoie à : ............................',
					answer:
						'b) « nos » renvoie aux auteurs de l’appel et aux destinataires (les citoyens algériens : jeunes, associations, collectivités et familles).',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_fr_2025_lang',
			customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
			points: 7,
			instruction: 'Répondez avec exactitude aux questions de fonctionnement de la langue.',
			content: [
				{
					type: 'text',
					content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
				},
				{
					type: 'text',
					content: 'a) destructeurs (§1) = ............................',
					answer: 'a) dévastateurs',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) ralentir (§2) = ............................',
					answer: 'b) freiner',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) attentif (§3) = ............................',
					answer: 'c) vigilant',
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'#strong[2.] Classez les mots suivants dans le tableau selon leur champ lexical : #emph[sécheresse ; reboisement ; incendies ; nappes phréatiques ; désertification ; gestes économes].'
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{
							header: 'Champ lexical de la menace écologique',
							items: ['sécheresse', 'incendies', 'désertification'],
							mark: '0.5'
						},
						{
							header: 'Champ lexical de la préservation',
							items: ['reboisement', 'nappes phréatiques', 'gestes économes'],
							mark: '0.5'
						}
					]
				}),
				{
					type: 'text',
					content: '#strong[3.] Complétez le tableau de dérivation (famille de mots) suivant.'
				},
				buildFrenchWordFamilyTableBlock([
					{
						verbe: { given: true, value: 'préserver' },
						nom: { value: 'préservation', mark: '0.25' },
						adjectif: { value: 'préservé / préservateur', mark: '0.25' }
					},
					{
						verbe: { value: 'économiser', mark: '0.25' },
						nom: { given: true, value: 'économie' },
						adjectif: { value: 'économe / économique', mark: '0.25' }
					},
					{
						verbe: { value: 'mobiliser', mark: '0.25' },
						nom: { value: 'mobilisation', mark: '0.25' },
						adjectif: { given: true, value: 'mobilisateur' }
					}
				]),
				{
					type: 'text',
					content: '#strong[4.] Réécrivez les phrases suivantes selon la consigne donnée.'
				},
				{
					type: 'text',
					content:
						'a) Remplacez l’impératif par « Il faut que + subjonctif présent » :\n« Adoptez au quotidien des gestes économes en eau et participez au reboisement. »',
					answer:
						'a) Il faut que vous adoptiez au quotidien des gestes économes en eau et que vous participiez au reboisement.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'b) Reliez les deux phrases pour exprimer le but à l’aide de « afin que » :\n« Les volontaires nettoient les lisières forestières. Les incendies ne se propagent pas en été. »',
					answer:
						'b) Les volontaires nettoient les lisières forestières afin que les incendies ne se propagent pas en été.',
					mark: '1'
				},
				{
					type: 'text',
					content:
						'#strong[5.] Relevez deux procédés d’exhortation employés dans le dernier paragraphe et précisez la visée communicative de ce texte.',
					answer:
						'Procédés d’exhortation : le verbe performatif « nous appelons solennellement » et les verbes à l’impératif présent (« Participez », « nettoyez », « adoptez », « Unissons »). Visée communicative : exhorter (inciter) les citoyens à agir concrètement pour sauver les forêts, le Barrage Vert et les ressources hydriques.',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_fr_2025_prod',
			customTitle: 'II. Production écrite',
			points: 6,
			instruction: 'Traitez l’un des deux sujets au choix dans un français correct et structuré.',
			content: [
				buildFrenchWrittenProductionBlock({
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif) :',
					sujetUnPrompt:
						'Dans le cadre du club environnemental de votre lycée, vous souhaitez résumer cet appel pour le publier sur le tableau d’affichage. Rédigez-en le compte rendu objectif (120 à 150 mots).',
					sujetUnNotes: [
						'Présentez le texte (titre, source, thème et visée exhortative) dès l’accroche.',
						'Respectez les trois étapes de l’appel : constat alarmant, arguments écologiques et moraux, puis exhortation finale.',
						'Employez la troisième personne et des verbes de parole neutres (constatent, soulignent, rappellent, exhortent).'
					],
					sujetDeuxPrompt:
						'À l’approche de la Journée nationale de l’Arbre (25 octobre), vous constatez que certains espaces verts autour de votre quartier souffrent de négligence et de gaspillage d’eau. Rédigez un appel d’une quinzaine de lignes adressé aux habitants et aux élèves de votre commune pour les inciter à s’engager dans une campagne de plantation et de préservation de l’eau.',
					rubricSummary:
						'Structure complète du compte rendu objectif (1.5 pt) ; fidélité aux trois étapes de l’appel reformulées (2 pts) ; cohérence et enchaînement logique (1 pt) ; maîtrise de la langue, orthographe et présentation (1.5 pt).',
					modelAnswer:
						'Le texte intitulé « Protégeons nos forêts, notre Barrage Vert et chaque goutte d’eau ! », adapté des campagnes nationales de reboisement et d’économie d’eau (Édition SujetStore), est un appel citoyen consacré à la préservation du patrimoine naturel algérien. Les auteurs cherchent à sensibiliser et à mobiliser la société face à la crise écologique.\n\nTout d’abord, ils dressent un constat alarmant marqué par les sécheresses, les incendies détruisant de vastes étendues forestières et la baisse des réserves d’eau dans les barrages. Ensuite, ils rappellent l’importance écologique du Barrage Vert et des forêts, qui retiennent les sols, régulent les pluies et protègent les nappes phréatiques, tout en soulignant le devoir moral et islamique d’éviter le gaspillage et de planter des arbres. Enfin, ils exhortent les jeunes, les familles, les associations et les collectivités à participer au reboisement, à nettoyer les lisières forestières et à économiser l’eau au quotidien.',
					mark: '6'
				})
			]
		}
	]
};

export const OFFICIAL_BAC_FRENCH_SCI_PAPERS: OfficialFrenchBacPaperSpec[] = [
	...projectCanonicalToStreams(CANONICAL_SCI_2023),
	...projectCanonicalToStreams(CANONICAL_SCI_2024),
	...projectCanonicalToStreams(CANONICAL_SCI_2025)
];
