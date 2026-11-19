import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../modules/FrenchTemplates/french-helpers';
import type { OfficialFrenchBacPaperSpec } from './types';

function buildLeMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3e Année Secondaire (3AS / BAC)',
		streamId: 'LE',
		streamName: 'Langues Étrangères',
		subjectId: 'FRE-SEC',
		subjectName: 'Langue Française',
		trimesterId: 't3',
		trimesterName: 'Session d’entraînement au Baccalauréat',
		docType: 'exam',
		academicYear: year,
		duration: '03 h 30',
		coefficient: 5,
		examSessionAr: 'Juin ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Examen blanc du Baccalauréat — Langue Française',
		siteUrl: 'https://sujetstore.com'
	};
}

function makeLePaper(opts: {
	academicYear: '2023' | '2024' | '2025';
	unitThemeFr: string;
	titleTopicFr: string;
	titleTopicAr: string;
	themesFr: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}): OfficialFrenchBacPaperSpec {
	const examDoc: ExamDocument = {
		metadata: buildLeMetadata(opts.academicYear),
		exercises: opts.exercises
	};
	return {
		slug: `bac-${opts.academicYear}-3as-le-french`,
		grade: '3as_le',
		yearSubjectId: 788,
		subjectId: 'FRE-SEC',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameFr: 'Langues Étrangères',
		academicYear: opts.academicYear,
		sessionFr: `Juin ${opts.academicYear}`,
		sessionAr: `دورة جوان ${opts.academicYear}`,
		coefficient: 5,
		duration: '03 h 30',
		pointsSplit: [6, 6, 8] as const,
		unitThemeFr: opts.unitThemeFr,
		titleFr: `Examen blanc du Baccalauréat en Français — Langues Étrangères (Juin ${opts.academicYear} : ${opts.titleTopicFr})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الفرنسية — شعبة لغات أجنبية (دورة جوان ${opts.academicYear} — ${opts.titleTopicAr})`,
		themesFr: opts.themesFr,
		themesAr: opts.themesAr,
		templateId: 'french/bac_official',
		examDoc
	};
}

export const OFFICIAL_BAC_FRENCH_LE_PAPERS: OfficialFrenchBacPaperSpec[] = [
	// ============================================================================
	// 2023 — Projet 1 : Texte d'Histoire (Savants algériens face à l'acculturation)
	// ============================================================================
	makeLePaper({
		academicYear: '2023',
		unitThemeFr:
			'Projet 1 : Texte d’Histoire — Les savants algériens face à la politique coloniale d’acculturation',
		titleTopicFr:
			'Les savants et réformateurs algériens face à l’acculturation coloniale : Ben Badis, El-Mili et El-Ibrahimi',
		titleTopicAr:
			'العلماء والمصلحون الجزائريون في مواجهة سياسة التغريب الاستعمارية: بن باديس والميلي والإبراهيمي',
		themesFr: [
			'Texte d’Histoire',
			'Résistance culturelle à l’acculturation',
			'Cheikh Ben Badis, Cheikh El-Mili et Cheikh El-Ibrahimi',
			'Historiographie algérienne'
		],
		themesAr: [
			'النص التاريخي',
			'المقاومة الثقافية لسياسة التغريب',
			'بن باديس والميلي والإبراهيمي',
			'كتابة التاريخ الوطني الجزائري'
		],
		exercises: [
			{
				id: 'le_fr_2023_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 6,
				instruction: 'Lisez attentivement le texte historique suivant puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'La résistance intellectuelle des savants algériens face à l’acculturation coloniale',
						paragraphs: [
							'Durant plus d’un siècle, la domination coloniale en Algérie ne visa pas uniquement la confiscation des terres fertiles ; [[elle]] déploya également une politique méthodique d’acculturation destinée à effacer la langue arabe, à fermer les zaouïas indépendantes et à nier l’existence historique de la nation algérienne. En présentant l’Algérie comme une terre sans passé propre, l’idéologie coloniale espérait briser de l’intérieur les ressorts spirituels et culturels du peuple.',
							'Face à cette entreprise d’effacement, des savants et réformateurs algériens opposèrent une résistance intellectuelle d’une rare lucidité. Dès les années 1920, Cheikh Abdelhamid Ben Badis entreprit à Constantine un patient travail d’enseignement quotidien à la mosquée Sidi Lakhdar, avant de fédérer en 1931 les forces réformistes au sein de l’Association des Oulémas Musulmans Algériens. À ses côtés, Cheikh Moubarek El-Mili rédigea son ouvrage monumental « Histoire de l’Algérie dans l’Antiquité et les Temps modernes », démontrant par des preuves documentées la continuité millénaire de la personnalité algérienne.',
							'Après le décès de Cheikh Ben Badis en 1940, Cheikh Mohamed Bachir El-Ibrahimi poursuivit ce combat culturel avec une éloquence remarquable, soutenu par des figures courageuses telles que Cheikh Larbi Tebessi et Cheikh Ahmed Sahnoun. Malgré les fermetures administratives d’écoles, les interdictions de presse et les assignations à résidence, [[ces érudits]] parvinrent à former une jeunesse instruite, consciente de ses droits et attachée à ses racines islamiques et arabes.',
							'Ainsi que l’a mis en évidence l’historien Abou El-Kacem Saadallah, la bataille des livres, des cours et des journaux fut le rempart qui fit échouer l’assimilation coloniale. En restituant aux Algériens leur histoire véridique et la maîtrise de leur langue, ces savants ont prouvé que la survie d’une nation commence par la fidélité à son patrimoine spirituel et intellectuel.'
						],
						source:
							'Étude historique adaptée sur la résistance culturelle algérienne au XXe siècle, Édition SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'acculturation',
								meaning: 'processus imposé visant à déposséder un peuple de sa culture et de sa langue d’origine'
							},
							{
								term: 'assignations à résidence',
								meaning: 'mesures répressives obligeant une personne à rester dans un lieu précis sous surveillance'
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
								header: 'a) L’idée directrice de ce texte historique est que :',
								options: [
									'la politique coloniale s’est limitée à des réformes agricoles',
									'les savants algériens ont mis en échec l’acculturation coloniale par l’enseignement, l’histoire et la presse',
									'l’écriture de l’histoire algérienne n’a débuté qu’après 1962'
								],
								correct:
									'les savants algériens ont mis en échec l’acculturation coloniale par l’enseignement, l’histoire et la presse',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez le tableau synthétique suivant à partir des informations précises du texte.'
					},
					{
						type: 'table',
						headers: ['Savant ou historien cité', 'Contribution intellectuelle ou historique mentionnée'],
						cells: [],
						rows: [
							[
								{ content: 'Cheikh Abdelhamid Ben Badis', bold: true },
								{
									content: '....................',
									answer: 'Enseignement quotidien à Constantine et fédération des réformistes dans l’Association des Oulémas en 1931',
									mark: '0.25'
								}
							],
							[
								{ content: 'Cheikh Moubarek El-Mili', bold: true },
								{
									content: '....................',
									answer: 'Rédaction de « Histoire de l’Algérie dans l’Antiquité et les Temps modernes » prouvant la continuité nationale',
									mark: '0.25'
								}
							],
							[
								{ content: 'Cheikh Mohamed Bachir El-Ibrahimi', bold: true },
								{
									content: '....................',
									answer: 'Poursuite du combat culturel après 1940 avec éloquence malgré la répression administrative',
									mark: '0.25'
								}
							],
							[
								{ content: 'Abou El-Kacem Saadallah', bold: true },
								{
									content: '....................',
									answer: 'Mise en évidence du rôle de la bataille des livres, cours et journaux dans l’échec de l’assimilation',
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
								q: 'a) Le projet colonial cherchait aussi à nier le passé historique propre de la nation algérienne.',
								a: 'Vrai',
								c: 'Il déploya une politique d’acculturation destinée à nier l’existence historique de la nation algérienne en la présentant comme une terre sans passé propre (§1).',
								mark: '0.5'
							},
							{
								q: 'b) L’action de Cheikh Ben Badis a commencé uniquement après 1940.',
								a: 'Faux',
								c: 'Il a entrepris son enseignement quotidien dès les années 1920 à Constantine, a fédéré l’Association en 1931 et est décédé en 1940 (§2-§3).',
								mark: '0.5'
							},
							{
								q: 'c) Les autorités coloniales n’ont jamais entravé le fonctionnement des écoles et journaux des Oulémas.',
								a: 'Faux',
								c: 'Les érudits ont subi des fermetures administratives d’écoles, des interdictions de presse et des assignations à résidence (§3).',
								mark: '0.5'
							},
							{
								q: 'd) L’ouvrage de Cheikh Moubarek El-Mili s’appuyait sur des preuves documentées.',
								a: 'Vrai',
								c: 'Il démontrait par des preuves documentées la continuité millénaire de la personnalité algérienne (§2).',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '#strong[4.] Répondez de manière rédigée aux questions analytiques suivantes.'
					},
					{
						type: 'text',
						content:
							'a) Par quels moyens concrets l’idéologie coloniale tentait-elle de mener sa politique d’acculturation ?',
						answer:
							'a) Elle cherchait à effacer la langue arabe, à fermer les zaouïas indépendantes et à nier l’existence historique de la nation algérienne pour briser les ressorts spirituels et culturels du peuple.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'b) Pourquoi l’historien Abou El-Kacem Saadallah qualifie-t-il l’action intellectuelle des savants de « rempart » ?',
						answer:
							'b) Parce que la bataille des livres, des cours et des journaux a empêché l’assimilation coloniale en restituant aux Algériens leur histoire véridique et la maîtrise de leur langue.',
						mark: '0.75'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les substituts soulignés dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « elle » (§1) renvoie à : ............................',
						answer: 'a) « elle » renvoie à « la domination coloniale en Algérie ».',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « ces érudits » (§3) renvoie à : ............................',
						answer:
							'b) « ces érudits » renvoie aux savants réformateurs (Cheikh El-Ibrahimi, Cheikh Larbi Tebessi, Cheikh Ahmed Sahnoun et les Oulémas).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_fr_2023_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Répondez avec précision aux questions de lexique, de syntaxe et d’analyse discursive.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) unir / rassembler (§2) = ............................',
						answer: 'a) fédérer',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) savants très instruits (§3) = ............................',
						answer: 'b) érudits',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[fermetures administratives ; preuves documentées ; confiscation des terres ; enseignement quotidien ; interdictions de presse ; bataille des livres].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de la répression coloniale',
								items: ['fermetures administratives', 'confiscation des terres', 'interdictions de presse'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical de la résistance intellectuelle',
								items: ['preuves documentées', 'enseignement quotidien', 'bataille des livres'],
								mark: '0.5'
							}
						]
					}),
					{
						type: 'text',
						content: '#strong[3.] Complétez le tableau de dérivation (famille de mots).'
					},
					buildFrenchWordFamilyTableBlock([
						{
							verbe: { given: true, value: 'résister' },
							nom: { value: 'résistance / résistant', mark: '0.25' },
							adjectif: { value: 'résistant', mark: '0.25' }
						},
						{
							verbe: { value: 'assimiler', mark: '0.25' },
							nom: { given: true, value: 'assimilation' },
							adjectif: { value: 'assimilable / assimilé', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Effectuez les transformations grammaticales demandées.'
					},
					{
						type: 'text',
						content:
							'a) Réécrivez la phrase en remplaçant « Malgré + groupe nominal » par « Bien que + subjonctif passé » :\n« Malgré les fermetures d’écoles, ces érudits parvinrent à former une jeunesse instruite. »',
						answer:
							'a) Bien que les écoles aient été fermées (ou : Bien que les autorités aient fermé les écoles), ces érudits parvinrent à former une jeunesse instruite.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Transformez la phrase suivante au discours indirect :\nUn chercheur rappela : « Cheikh Moubarek El-Mili a démontré hier la continuité millénaire de la nation algérienne. »',
						answer:
							'b) Un chercheur rappela que Cheikh Moubarek El-Mili avait démontré la veille (autrefois) la continuité millénaire de la nation algérienne.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] Comment la présence implicite de l’auteur transparaît-elle dans ce texte historique ? Relevez deux modalisateurs appréciatifs et formulez sa visée communicative.',
						answer:
							'L’auteur s’implique implicitement par des modalisateurs mélioratifs valorisant les savants (« rare lucidité », « ouvrage monumental », « éloquence remarquable », « figures courageuses ») et péjoratifs envers le système colonial (« politique méthodique d’acculturation »). Sa visée est à la fois informative et commémorative : montrer comment la résistance intellectuelle des Oulémas a sauvegardé l’identité nationale face à l’assimilation.',
						mark: '1'
					}
				]
			},
			{
				id: 'le_fr_2023_prod',
				customTitle: 'II. Production écrite',
				points: 8,
				instruction:
					'Traitez l’un des deux sujets au choix en démontrant votre maîtrise de l’analyse et de l’expression écrite.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Votre revue lycéenne de langues et d’histoire prépare un numéro spécial sur la mémoire culturelle algérienne. Rédigez le compte rendu critique de ce texte en 160 à 190 mots.',
						sujetUnNotes: [
							'Accroche complète : identifiez le titre, la source, le thème, le genre et la visée communicative.',
							'Condensation objective : reformulez avec rigueur les causes (politique d’acculturation), les figures majeures et le bilan historiographique.',
							'Partie critique approfondie : évaluez la pertinence de l’argumentation historique, la rigueur stylistique, la place des références et suggérez un prolongement pertinent.'
						],
						sujetDeuxPrompt:
							'« Un peuple qui maîtrise sa langue et connaît son histoire véritable ne peut jamais être effacé. » À la lumière de cette affirmation, rédigez un essai argumentatif d’une vingtaine de lignes dans lequel vous montrerez l’importance de l’enseignement de l’histoire nationale et de la préservation linguistique dans la formation des jeunes citoyens.',
						rubricSummary:
							'Conformité rigoureuse à la structure du compte rendu critique (2 pts) ; précision et fidélité de la condensation objective (2.5 pts) ; profondeur et pertinence du jugement critique sur le fond et la forme (2 pts) ; qualité de la langue, lexique soutenu, orthographe et présentation (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « La résistance intellectuelle des savants algériens face à l’acculturation coloniale », étude historique adaptée sur la résistance culturelle algérienne au XXe siècle (Édition SujetStore), analyse la riposte intellectuelle opposée par les Oulémas au projet colonial d’assimilation. L’auteur vise à informer le lecteur et à rendre hommage à cette lutte pacifique et décisive.\n\nDans un premier temps, il montre que la domination coloniale associa la spoliation économique à une politique méthodique d’acculturation visant la langue arabe, les zaouïas et la mémoire historique. Il expose ensuite l’action structurée de Cheikh Abdelhamid Ben Badis dès les années 1920 puis la création de l’Association des Oulémas en 1931, ainsi que l’œuvre historiographique majeure de Cheikh Moubarek El-Mili. Après 1940, Cheikh Mohamed Bachir El-Ibrahimi, entouré de Cheikh Larbi Tebessi et de Cheikh Ahmed Sahnoun, poursuivit cet effort malgré la répression. Enfin, l’auteur s’appuie sur l’historien Abou El-Kacem Saadallah pour conclure que la bataille du savoir fit échec à l’assimilation.\n\nD’un point de vue critique, ce texte convainc par la solidité de sa chronologie, l’usage d’un vocabulaire historique précis et une objectivité maîtrisée qui n’exclut pas une sobriété admirative. Il articule habilement politique coloniale et réplique culturelle. Néanmoins, l’intégration d’une citation directe de Cheikh Ben Badis ou de Cheikh El-Ibrahimi aurait davantage incarné la vigueur oratoire de ces réformateurs.',
						mark: '8'
					})
				]
			}
		]
	}),

	// ============================================================================
	// 2024 — Projet 2 : Débat d'idées (Langues étrangères, identité et science)
	// ============================================================================
	makeLePaper({
		academicYear: '2024',
		unitThemeFr:
			'Projet 2 : Débat d’idées — Apprentissage des langues étrangères, identité culturelle et ouverture scientifique',
		titleTopicFr: 'Apprentissage des langues étrangères, identité culturelle et ouverture scientifique',
		titleTopicAr: 'تعلم اللغات الأجنبية بين الهوية الثقافية والانفتاح العلمي',
		themesFr: [
			'Débat d’idées',
			'Langues étrangères et plurilinguisme',
			'Identité culturelle',
			'Ouverture scientifique et patrimoine islamique'
		],
		themesAr: [
			'مناظرة الأفكار',
			'تعلم اللغات الأجنبية والتعدد اللغوي',
			'الهوية الثقافية',
			'الانفتاح العلمي وإرث العلماء المسلمين'
		],
		exercises: [
			{
				id: 'le_fr_2024_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 6,
				instruction: 'Lisez attentivement ce texte d’idées puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'Maîtriser les langues étrangères : menace pour l’identité ou levier d’ouverture scientifique ?',
						paragraphs: [
							'À l’heure où les échanges universitaires et les publications scientifiques circulent à l’échelle planétaire, l’apprentissage précoce et approfondi des langues étrangères fait l’objet d’intenses discussions. Si nul ne conteste leur utilité professionnelle, certains observateurs s’interrogent avec inquiétude : l’essor du plurilinguisme risque-t-il d’affaiblir la langue maternelle et les repères culturels des jeunes, ou constitue-t-il au contraire un atout irremplaçable pour le rayonnement scientifique ?',
							'Les voix les plus prudentes soulignent que l’usage déséquilibré d’idiomes étrangers dans la vie quotidienne peut engendrer une forme de déracinement linguistique. Lorsque des étudiants négligent la précision syntaxique et la richesse lexicale de [[leur]] langue nationale au profit d’emprunts mal maîtrisés, la pensée perd en clarté et le lien vivant avec le patrimoine littéraire et historique s’amenuise progressivement.',
							'Toutefois, les défenseurs de l’ouverture linguistique rappellent que l’histoire de la civilisation islamique dément catégoriquement l’idée d’une incompatibilité entre fidélité identitaire et plurilinguisme. Des savants tels qu’Al-Birouni, qui apprit le sanskrit pour étudier directement l’astronomie et les mathématiques de l’Inde, ou encore le géographe Al-Idrisi et le voyageur Ibn Battouta, ont dialogué avec d’autres cultures sans jamais renier leurs convictions ni leur langue arabe. De même, des foyers de savoir comme celui fondé par Fatima Al-Fihriya ont prospéré grâce à la circulation rigoureuse des connaissances traduites et vérifiées.',
							'Dès lors, le véritable enjeu ne réside pas dans le choix exclusif entre repli et ouverture, mais dans la solidité de l’enracinement initial. Un élève qui possède d’abord une maîtrise ferme de sa langue nationale et de ses valeurs peut apprendre plusieurs langues étrangères avec sérénité ; [[celles-ci]] deviennent alors des clés précieuses pour accéder directement à la recherche scientifique mondiale et faire entendre sa propre voix avec rigueur.'
						],
						source:
							'Essai adapté de réflexions sur la didactique des langues et l’histoire des sciences, Édition SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'idiomes',
								meaning: 'langues propres à une communauté ou à une nation'
							},
							{
								term: 'déracinement linguistique',
								meaning: 'perte progressive de l’attachement et de la maîtrise de sa langue d’origine'
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
								header: 'a) La thèse finalement défendue par l’auteur affirme que :',
								options: [
									'l’apprentissage des langues étrangères détruit inévitablement l’identité nationale',
									'un enracinement solide dans la langue nationale permet un plurilinguisme fécond et ouvert sur la science',
									'il faudrait renoncer à traduire les travaux scientifiques'
								],
								correct:
									'un enracinement solide dans la langue nationale permet un plurilinguisme fécond et ouvert sur la science',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez le tableau d’analyse du débat à partir des paragraphes 2 et 3.'
					},
					{
						type: 'table',
						headers: ['Thèse en présence', 'Argument principal ou risque évoqué', 'Exemple ou précision du texte'],
						cells: [],
						rows: [
							[
								{ content: 'Réserves face au déséquilibre', bold: true },
								{
									content: '....................',
									answer: 'Risque de déracinement linguistique et d’affaiblissement du lien avec le patrimoine',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Négligence de la syntaxe et du lexique de la langue nationale au profit d’emprunts mal maîtrisés',
									mark: '0.25'
								}
							],
							[
								{ content: 'Défense de l’ouverture linguistique', bold: true },
								{
									content: '....................',
									answer: 'Compatibilité historique entre fidélité identitaire, plurilinguisme et progrès scientifique',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Al-Birouni (sanskrit), Al-Idrisi, Ibn Battouta et le foyer de savoir fondé par Fatima Al-Fihriya',
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
								q: 'a) L’utilité professionnelle des langues étrangères est largement remise en cause dans le texte.',
								a: 'Faux',
								c: 'Le texte précise au contraire que « nul ne conteste leur utilité professionnelle » (§1).',
								mark: '0.5'
							},
							{
								q: 'b) Selon les voix prudentes, recourir à des emprunts mal maîtrisés nuit à la clarté de la pensée.',
								a: 'Vrai',
								c: 'Lorsque la langue nationale est négligée au profit d’emprunts mal maîtrisés, la pensée perd en clarté (§2).',
								mark: '0.5'
							},
							{
								q: 'c) Le savant Al-Birouni a appris le sanskrit afin d’étudier directement les sciences de l’Inde.',
								a: 'Vrai',
								c: 'Al-Birouni apprit le sanskrit pour étudier directement l’astronomie et les mathématiques de l’Inde (§3).',
								mark: '0.5'
							},
							{
								q: 'd) L’auteur conseille de retarder la maîtrise de la langue nationale au profit des langues étrangères.',
								a: 'Faux',
								c: 'Il souligne qu’un élève doit d’abord posséder une maîtrise ferme de sa langue nationale et de ses valeurs (§4).',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '#strong[4.] Répondez aux questions analytiques suivantes selon le texte.'
					},
					{
						type: 'text',
						content:
							'a) Que démontrent les exemples d’Al-Birouni, d’Al-Idrisi et d’Ibn Battouta dans l’argumentation du paragraphe 3 ?',
						answer:
							'a) Ils démontrent que la fidélité identitaire et l’attachement à la langue arabe sont parfaitement compatibles avec l’apprentissage des langues étrangères et le dialogue scientifique entre cultures.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'b) Quelle condition essentielle l’auteur pose-t-il au paragraphe 4 pour que le plurilinguisme soit pleinement bénéfique ?',
						answer:
							'b) Il faut un enracinement initial solide, c’est-à-dire une maîtrise ferme de sa langue nationale et de ses valeurs culturelles.',
						mark: '0.75'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les termes soulignés dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « leur » (§2) renvoie à : ............................',
						answer: 'a) « leur » renvoie aux étudiants.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « celles-ci » (§4) renvoie à : ............................',
						answer: 'b) « celles-ci » renvoie à « plusieurs langues étrangères ».',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_fr_2024_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités de lexique, de syntaxe et d’analyse discursive.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte l’antonyme (le contraire) de chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) tardif (§1) = ............................',
						answer: 'a) précoce',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) s’agrandit / s’accroît (§2) = ............................',
						answer: 'b) s’amenuise',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[publications scientifiques ; patrimoine littéraire ; échanges universitaires ; enracinement initial ; recherche mondiale ; repères culturels].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de l’ouverture scientifique',
								items: ['publications scientifiques', 'échanges universitaires', 'recherche mondiale'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical de l’identité culturelle',
								items: ['patrimoine littéraire', 'enracinement initial', 'repères culturels'],
								mark: '0.5'
							}
						]
					}),
					{
						type: 'text',
						content: '#strong[3.] Complétez le tableau de dérivation (famille de mots).'
					},
					buildFrenchWordFamilyTableBlock([
						{
							verbe: { given: true, value: 'traduire' },
							nom: { value: 'traduction / traducteur', mark: '0.25' },
							adjectif: { value: 'traduisible / traduit', mark: '0.25' }
						},
						{
							verbe: { value: 'enraciner', mark: '0.25' },
							nom: { given: true, value: 'enracinement' },
							adjectif: { value: 'enraciné', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Réécrivez les phrases suivantes selon la consigne indiquée.'
					},
					{
						type: 'text',
						content:
							'a) Exprimez la condition en remplaçant le gérondif par « À condition que + subjonctif » :\n« Un étudiant profite des langues étrangères en consolidant d’abord sa langue nationale. »',
						answer:
							'a) Un étudiant profite des langues étrangères à condition qu’il consolide d’abord sa langue nationale.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Transformez la phrase suivante à la voix passive :\n« Al-Birouni a étudié les traités astronomiques de l’Inde avec une grande rigueur. »',
						answer:
							'b) Les traités astronomiques de l’Inde ont été étudiés par Al-Birouni avec une grande rigueur.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] Comment l’auteur organise-t-il sa démarche argumentative ? Identifiez deux articulateurs logiques clés et énoncez sa visée communicative.',
						answer:
							'L’auteur suit un plan dialectique structuré par la concession et la synthèse : il expose les craintes du déracinement, puis les nuance avec « Toutefois » (§3) en mobilisant des preuves historiques, avant de conclure par « Dès lors » (§4). Sa visée communicative est de dépasser l’opposition stérile entre identité et plurilinguisme pour convaincre qu’un ancrage linguistique solide rend l’ouverture scientifique féconde.',
						mark: '1'
					}
				]
			},
			{
				id: 'le_fr_2024_prod',
				customTitle: 'II. Production écrite',
				points: 8,
				instruction: 'Traitez l’un des deux sujets au choix en veillant à la rigueur de l’argumentation.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Dans le cadre de la Journée internationale des Langues organisée au lycée, rédigez le compte rendu critique de ce débat d’idées en 160 à 190 mots.',
						sujetUnNotes: [
							'Présentez avec précision le titre, la source, la problématique et la visée de l’auteur.',
							'Condensez objectivement les deux thèses en présence, les exemples historiques et la synthèse finale.',
							'Formulez un jugement critique nuancé portant sur la pertinence des références savantes, l’équilibre du raisonnement et la clarté du style.'
						],
						sujetDeuxPrompt:
							'En tant qu’élève de la filière Langues Étrangères, vous participez à un colloque sur le thème : « Apprendre la langue de l’autre, est-ce s’éloigner de soi ou mieux servir son pays ? » Rédigez un texte argumentatif structuré d’une vingtaine de lignes exposant votre point de vue appuyé par trois arguments et des exemples concrets.',
						rubricSummary:
							'Maîtrise complète de la structure du compte rendu critique (2 pts) ; fidélité et densité de la condensation objective (2.5 pts) ; pertinence de l’analyse critique du fond et de la forme (2 pts) ; correction grammaticale, richesse lexicale et présentation (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « Maîtriser les langues étrangères : menace pour l’identité ou levier d’ouverture scientifique ? », extrait d’un essai sur la didactique des langues et l’histoire des sciences (Édition SujetStore), examine le rapport entre apprentissage des langues étrangères, identité culturelle et progrès scientifique. L’auteur vise à dépasser les craintes excessives pour défendre un plurilinguisme enraciné.\n\nD’une part, il rappelle les inquiétudes de certains observateurs face au déséquilibre linguistique : l’abus d’emprunts mal maîtrisés au détriment de la langue nationale affaiblit la précision de la pensée et le lien avec le patrimoine. D’autre part, il réfute l’idée d’une contradiction en s’appuyant sur l’héritage scientifique islamique, citant Al-Birouni, Al-Idrisi, Ibn Battouta ainsi que le rayonnement intellectuel initié par Fatima Al-Fihriya. En conclusion, il soutient qu’une solide maîtrise initiale de la langue maternelle transforme les langues étrangères en véritables clés d’accès à la recherche mondiale.\n\nCet essai séduit par la finesse de son plan dialectique et l’originalité de ses exemples historiques qui ancrent le débat dans un patrimoine familier au lecteur. Le style, à la fois soutenu et limpide, rend la démonstration très persuasive. Une brève allusion aux défis actuels de la traduction scientifique en langue arabe aurait toutefois utilement complété cette réflexion équilibrée.',
						mark: '8'
					})
				]
			}
		]
	}),

	// ============================================================================
	// 2025 — Projet 3 : L'Appel (Jeunesse, engagement volontaire, éthique du travail et environnement)
	// ============================================================================
	makeLePaper({
		academicYear: '2025',
		unitThemeFr:
			'Projet 3 : L’Appel — Engagement volontaire des jeunes, éthique du travail et protection de l’environnement',
		titleTopicFr:
			'Appel aux jeunes générations pour le bénévolat, l’éthique du travail et la protection de l’environnement',
		titleTopicAr: 'نداء إلى الأجيال الشابة للتطوع وأخلاقيات العمل وحماية البيئة',
		themesFr: [
			'Texte exhortatif (L’Appel)',
			'Engagement volontaire des jeunes',
			'Éthique du travail (Itqan)',
			'Protection de l’environnement'
		],
		themesAr: [
			'نص النداء',
			'التطوع والعمل الخيري لدى الشباب',
			'إتقان العمل والأخلاقيات المهنية',
			'حماية البيئة والتنمية المستدامة'
		],
		exercises: [
			{
				id: 'le_fr_2025_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 6,
				instruction: 'Lisez attentivement cet appel adressé à la jeunesse puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'Jeunes d’aujourd’hui : bâtissons l’avenir par le bénévolat, le travail soigné et le respect de la terre !',
						paragraphs: [
							'Dans bien des quartiers urbains comme dans nos campagnes, deux maux silencieux freinent l’élan collectif : le découragement face aux tâches d’intérêt général et la dégradation progressive de notre cadre de vie. Trop souvent, des déchets s’accumulent aux abords des espaces publics, tandis que certains jeunes cèdent à la passivité ou à la recherche de gains faciles, oubliant que le progrès d’une société se construit d’abord par l’effort persévérant et le sens du devoir.',
							'Pourtant, l’énergie créatrice, la générosité et la capacité d’initiative de la jeunesse représentent la première richesse d’une nation. S’engager bénévolement dans le soutien scolaire, l’aide aux personnes âgées ou la préservation des espaces verts forge le caractère et renforce la cohésion sociale. De même, cultiver l’éthique du travail bien fait — cette exigence de perfectionnement constant et de probité que la tradition morale résume par la notion d’« Itqan » — élève la dignité de [[celui]] qui œuvre comme la prospérité de toute la communauté.',
							'Lier l’engagement citoyen à la protection de l’environnement répond également à une responsabilité urgente. Réduire le plastique à usage unique, entretenir les jardins collectifs, protéger le littoral et encourager le tri sélectif sont des actes concrets à la portée de tous. [[Ces initiatives]] quotidiennes prouvent qu’une conscience écologique sincère ne se limite pas aux discours, mais s’exprime dans la discipline de chaque geste.',
							'C’est pourquoi nous lançons aujourd’hui un appel pressant aux lycéens, aux étudiants, aux jeunes diplômés et aux clubs associatifs : refusez la résignation ! Consacrez chaque semaine un temps choisi au service bénévole, honorez vos études et vos métiers par la rigueur et l’honnêteté, et devenez les ambassadeurs actifs d’une terre propre et respectée. Engagez-vous dès à présent afin que votre génération laisse l’empreinte durable du courage, de la droiture et de la solidarité !'
						],
						source:
							'Appel collectif pour l’engagement citoyen et écologique de la jeunesse, Édition SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'probité',
								meaning: 'honnêteté scrupuleuse et respect rigoureux des devoirs moraux et professionnels'
							},
							{
								term: 'résignation',
								meaning: 'attitude passive consistant à accepter une situation négative sans tenter de l’améliorer'
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
								header: 'a) Les trois piliers d’engagement mis en avant dans cet appel sont :',
								options: [
									'le bénévolat citoyen, l’éthique du travail soigné et la protection de l’environnement',
									'les voyages lointains, le commerce de luxe et la publicité numérique',
									'la construction d’autoroutes, l’industrie lourde et l’aviation'
								],
								correct:
									'le bénévolat citoyen, l’éthique du travail soigné et la protection de l’environnement',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez la grille d’analyse de cet appel à partir des éléments du texte.'
					},
					{
						type: 'table',
						headers: ['Constat de départ', 'Valeurs promues', 'Destinataires', 'Finalité de l’appel'],
						cells: [],
						rows: [
							[
								{
									content: '....................',
									answer: 'Découragement civique, passivité, recherche de gains faciles et dégradation du cadre de vie',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Bénévolat, probité, travail bien fait (Itqan) et conscience écologique',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Les lycéens, les étudiants, les jeunes diplômés et les clubs associatifs',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Laisser l’empreinte durable du courage, de la droiture et de la solidarité',
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
								q: 'a) Selon le premier paragraphe, la dégradation du cadre de vie concerne uniquement les villages ruraux.',
								a: 'Faux',
								c: 'Ces maux s’observent « dans bien des quartiers urbains comme dans nos campagnes » (§1).',
								mark: '0.5'
							},
							{
								q: 'b) Le soutien scolaire et l’aide aux personnes âgées sont cités comme formes de bénévolat utiles.',
								a: 'Vrai',
								c: 'S’engager bénévolement dans le soutien scolaire, l’aide aux personnes âgées ou la préservation des espaces verts renforce la cohésion sociale (§2).',
								mark: '0.5'
							},
							{
								q: 'c) La notion d’« Itqan » renvoie à l’exigence de travail bien fait, de perfectionnement et de probité.',
								a: 'Vrai',
								c: 'Le texte définit l’« Itqan » comme une exigence de perfectionnement constant et de probité dans le travail bien fait (§2).',
								mark: '0.5'
							},
							{
								q: 'd) Les auteurs affirment que la protection de l’environnement relève exclusivement des discours théoriques.',
								a: 'Faux',
								c: 'Une conscience écologique sincère ne se limite pas aux discours, mais s’exprime dans la discipline de chaque geste quotidien (§3).',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '#strong[4.] Répondez de manière rédigée aux questions analytiques suivantes.'
					},
					{
						type: 'text',
						content:
							'a) Quels sont les deux effets positifs de l’éthique du travail bien fait (« Itqan ») selon le paragraphe 2 ?',
						answer:
							'a) Elle élève la dignité personnelle de celui qui œuvre et contribue à la prospérité de toute la communauté.',
						mark: '0.75'
					},
					{
						type: 'text',
						content:
							'b) Citez trois gestes écologiques concrets proposés dans le troisième paragraphe.',
						answer:
							'b) Réduire le plastique à usage unique, entretenir les jardins collectifs, protéger le littoral et encourager le tri sélectif (trois gestes au choix).',
						mark: '0.75'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les expressions soulignées dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « celui » (§2) renvoie à : ............................',
						answer: 'a) « celui » renvoie au travailleur (toute personne qui œuvre avec probité et perfectionnement).',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « Ces initiatives » (§3) renvoie à : ............................',
						answer:
							'b) « Ces initiatives » renvoie aux actes écologiques concrets (réduire le plastique à usage unique, entretenir les jardins collectifs, protéger le littoral et encourager le tri sélectif).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_fr_2025_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez avec soin les exercices de lexique, de syntaxe et d’analyse discursive.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) unité / solidarité du groupe (§2) = ............................',
						answer: 'a) cohésion sociale (ou : cohésion)',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) urgent / insistant (§4) = ............................',
						answer: 'b) pressant',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[tri sélectif ; soutien scolaire ; jardins collectifs ; aide aux personnes âgées ; littoral protégé ; probité au travail].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de l’éthique et de la solidarité',
								items: ['soutien scolaire', 'aide aux personnes âgées', 'probité au travail'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical de la protection écologique',
								items: ['tri sélectif', 'jardins collectifs', 'littoral protégé'],
								mark: '0.5'
							}
						]
					}),
					{
						type: 'text',
						content: '#strong[3.] Complétez le tableau de dérivation (famille de mots).'
					},
					buildFrenchWordFamilyTableBlock([
						{
							verbe: { given: true, value: 'persévérer' },
							nom: { value: 'persévérance', mark: '0.25' },
							adjectif: { value: 'persévérant', mark: '0.25' }
						},
						{
							verbe: { value: 'honorer', mark: '0.25' },
							nom: { given: true, value: 'honneur / honnêteté' },
							adjectif: { value: 'honorable / honnête', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Réécrivez les phrases suivantes selon la consigne indiquée.'
					},
					{
						type: 'text',
						content:
							'a) Remplacez l’impératif par « Nous souhaitons vivement que + subjonctif présent » :\n« Refusez la résignation et devenez les ambassadeurs actifs d’une terre propre. »',
						answer:
							'a) Nous souhaitons vivement que vous refusiez la résignation et que vous deveniez les ambassadeurs actifs d’une terre propre.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Exprimez le but en reliant les deux propositions à l’aide de « pour que + subjonctif » :\n« Les clubs associatifs organisent des campagnes de nettoyage. Les quartiers retrouvent leur beauté. »',
						answer:
							'b) Les clubs associatifs organisent des campagnes de nettoyage pour que les quartiers retrouvent leur beauté.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] Relevez dans le texte deux procédés linguistiques propres à l’exhortation, puis précisez la visée communicative des auteurs.',
						answer:
							'Procédés d’exhortation : la formule performative (« nous lançons aujourd’hui un appel pressant »), les verbes à l’impératif présent (« refusez », « Consacrez », « honorez », « devenez », « Engagez-vous ») et le lexique mélioratif mobilisateur. Visée communicative : inciter les jeunes générations à abandonner la passivité pour s’engager concrètement dans le bénévolat, le travail rigoureux et la préservation de l’environnement.',
						mark: '1'
					}
				]
			},
			{
				id: 'le_fr_2025_prod',
				customTitle: 'II. Production écrite',
				points: 8,
				instruction:
					'Traitez l’un des deux sujets au choix en mobilisant un français précis, nuancé et cohérent.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Membre actif du club des langues et de citoyenneté de votre lycée, vous présentez ce texte dans le bulletin de l’établissement. Rédigez-en le compte rendu critique en 160 à 190 mots.',
						sujetUnNotes: [
							'Présentez le document (titre, source, destinataires et visée exhortative).',
							'Condensez objectivement sa progression : constat initial, arguments civiques, éthiques et écologiques, puis exhortation finale.',
							'Développez une appréciation critique raisonnée sur la pertinence de cette triple approche, la force du style et les prolongements pratiques possibles.'
						],
						sujetDeuxPrompt:
							'À l’occasion de la Journée internationale du Bénévolat (5 décembre), vous êtes invité(e) à rédiger un appel d’une vingtaine de lignes adressé aux jeunes de votre wilaya pour les mobiliser autour d’une double action : le soutien scolaire gratuit aux élèves en difficulté et l’embellissement écologique des établissements scolaires.',
						rubricSummary:
							'Structure complète du compte rendu critique (2 pts) ; fidélité de la condensation des étapes de l’appel (2.5 pts) ; justesse et profondeur du regard critique (2 pts) ; correction grammaticale, richesse lexicale et présentation (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « Jeunes d’aujourd’hui : bâtissons l’avenir par le bénévolat, le travail soigné et le respect de la terre ! », extrait d’un appel collectif pour l’engagement citoyen et écologique (Édition SujetStore), exhorte la jeunesse à devenir actrice du progrès social et environnemental. Les auteurs visent à susciter une prise de conscience suivie d’engagements concrets.\n\nD’abord, ils dressent un constat lucide des obstacles actuels : découragement civique, passivité, recherche de gains faciles et dégradation du cadre de vie. Ensuite, ils rappellent que l’énergie de la jeunesse s’épanouit à travers le bénévolat — soutien scolaire, aide aux aînés, espaces verts — ainsi que par l’éthique du travail bien fait (« Itqan »), source de dignité et de prospérité. Ils associent par ailleurs cette responsabilité morale à des gestes écologiques quotidiens comme le tri sélectif et la réduction du plastique. Enfin, ils exhortent lycéens, étudiants, jeunes diplômés et clubs associatifs à agir sans attendre.\n\nCet appel convainc par la cohérence originale qui relie éthique personnelle, solidarité sociale et écologie pratique. L’usage précis des impératifs et d’un lexique valorisant confère au discours une réelle force mobilisatrice. L’ajout d’un exemple réussi d’initiative associative locale aurait toutefois rendu la perspective d’action encore plus tangible pour le jeune lecteur.',
						mark: '8'
					})
				]
			}
		]
	})
];
