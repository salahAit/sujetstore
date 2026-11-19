import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../modules/FrenchTemplates/french-helpers';
import type { OfficialFrenchBacPaperSpec } from './types';

function buildLpMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3e Année Secondaire (3AS / BAC)',
		streamId: 'LP',
		streamName: 'Lettres et Philosophie',
		subjectId: 'FRE-SEC',
		subjectName: 'Langue Française',
		trimesterId: 't3',
		trimesterName: 'Session d’entraînement au Baccalauréat',
		docType: 'exam',
		academicYear: year,
		duration: '02 h 30',
		coefficient: 3,
		examSessionAr: 'Juin ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Examen blanc du Baccalauréat — Langue Française',
		siteUrl: 'https://sujetstore.com'
	};
}

function makeLpPaper(opts: {
	academicYear: '2023' | '2024' | '2025';
	unitThemeFr: string;
	titleTopicFr: string;
	titleTopicAr: string;
	themesFr: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}): OfficialFrenchBacPaperSpec {
	const examDoc: ExamDocument = {
		metadata: buildLpMetadata(opts.academicYear),
		exercises: opts.exercises
	};
	return {
		slug: `bac-${opts.academicYear}-3as-lp-french`,
		grade: '3as_lp',
		yearSubjectId: 769,
		subjectId: 'FRE-SEC',
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameFr: 'Lettres et Philosophie',
		academicYear: opts.academicYear,
		sessionFr: `Juin ${opts.academicYear}`,
		sessionAr: `دورة جوان ${opts.academicYear}`,
		coefficient: 3,
		duration: '02 h 30',
		pointsSplit: [7, 6, 7] as const,
		unitThemeFr: opts.unitThemeFr,
		titleFr: `Examen blanc du Baccalauréat en Français — Lettres et Philosophie (Juin ${opts.academicYear} : ${opts.titleTopicFr})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الفرنسية — شعبة آداب وفلسفة (دورة جوان ${opts.academicYear} — ${opts.titleTopicAr})`,
		themesFr: opts.themesFr,
		themesAr: opts.themesAr,
		templateId: 'french/bac_official',
		examDoc
	};
}

export const OFFICIAL_BAC_FRENCH_LP_PAPERS: OfficialFrenchBacPaperSpec[] = [
	// ============================================================================
	// 2023 — Projet 1 : Texte d'Histoire (1er Novembre 1954, Moufdi Zakaria et presse)
	// ============================================================================
	makeLpPaper({
		academicYear: '2023',
		unitThemeFr:
			'Projet 1 : Texte d’Histoire — La Révolution du 1er Novembre 1954 et la parole engagée',
		titleTopicFr: 'Le 1er Novembre 1954, la plume de Moufdi Zakaria et la presse algérienne',
		titleTopicAr: 'أول نوفمبر 1954 والقلم الملتزم لمفدي زكريا والصحافة الجزائرية',
		themesFr: [
			'Texte d’Histoire',
			'1er Novembre 1954',
			'Moufdi Zakaria',
			'Presse de la Révolution algérienne'
		],
		themesAr: [
			'النص التاريخي',
			'ثورة أول نوفمبر 1954',
			'الشاعر مفدي زكريا',
			'صحافة الثورة التحريرية الجزائرية'
		],
		exercises: [
			{
				id: 'lp_fr_2023_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement le texte suivant puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'Le 1er Novembre 1954 : quand la plume rejoignit le combat libérateur',
						paragraphs: [
							'Dans la nuit du 1er Novembre 1954, le déclenchement de la Révolution algérienne ouvrit une page décisive de l’histoire contemporaine. Aux côtés de dirigeants résolus comme Larbi Ben M’hidi, Didouche Mourad et Ahmed Zabana, toute une génération comprit que le combat pour la souveraineté ne se menait pas seulement dans les maquis, mais aussi sur le terrain des idées, de l’écrit et de la mémoire collective.',
							'Parmi les voix les plus marquantes de cet engagement figura le poète Moufdi Zakaria. Emprisonné à la prison de Barberousse à Alger en 1955, [[il]] y composa Kassaman, un poème vibrant qui devint l’hymne national algérien. Dans ses vers empreints de dignité et de foi, comme dans ceux du poète Mohamed El-Aïd Al-Khalifa avant lui, la poésie dépassait la simple recherche esthétique pour devenir un serment de fidélité envers les martyrs et la patrie.',
							'À cette poésie mobilisatrice s’ajouta l’effort décisif de la presse écrite algérienne. Tandis que le journal El-Bassaïr avait longtemps défendu l’identité culturelle du peuple, le journal clandestin El-Moudjahid, lancé en 1956, prit le relais de l’information révolutionnaire. Imprimé dans des conditions périlleuses et diffusé de main en main, [[ce titre]] démentait les récits officiels de la censure coloniale et faisait entendre la cause algérienne auprès de l’opinion internationale.',
							'Comme le souligne l’historien Abou El-Kacem Saadallah dans ses recherches sur le mouvement culturel algérien, la plume engagée a joué un rôle irremplaçable durant la Guerre de Libération. En unissant le courage du verbe à celui du sacrifice, poètes, journalistes et penseurs ont transmis aux générations d’aujourd’hui le témoignage vivant d’un peuple déterminé à recouvrer sa liberté.'
						],
						source:
							'Synthèse adaptée d’études sur la littérature et la presse de la Révolution algérienne, Édition SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'maquis',
								meaning: 'zones montagneuses ou boisées servant de refuge aux combattants de la libération'
							},
							{
								term: 'censure',
								meaning: 'contrôle autoritaire exercé sur les journaux et les écrits pour interdire certaines informations'
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
								header: 'a) Le thème central de ce texte historique est :',
								options: [
									'le rôle de la poésie engagée et de la presse dans la Révolution algérienne',
									'l’architecture des villes côtières au XIXe siècle',
									'les voyages maritimes en Afrique du Nord'
								],
								correct:
									'le rôle de la poésie engagée et de la presse dans la Révolution algérienne',
								mark: '0.5'
							},
							{
								header: 'b) Dans ce texte, l’auteur recourt au témoignage de l’historien Abou El-Kacem Saadallah pour :',
								options: [
									'contredire l’importance du journal El-Moudjahid',
									'appuyer objectivement la valeur historique de l’écrit engagé',
									'critiquer la poésie nationale'
								],
								correct: 'appuyer objectivement la valeur historique de l’écrit engagé',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez le tableau synthétique ci-dessous à l’aide des données du texte.'
					},
					{
						type: 'table',
						headers: ['Année', 'Fait historique ou culturel', 'Acteur ou organe cité'],
						cells: [],
						rows: [
							[
								{ content: '1955', bold: true },
								{
									content: '....................',
									answer: 'Composition du poème Kassaman à la prison de Barberousse (Alger)',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Le poète Moufdi Zakaria',
									mark: '0.25'
								}
							],
							[
								{ content: '1956', bold: true },
								{
									content: '....................',
									answer: 'Lancement de la presse révolutionnaire clandestine contre la censure coloniale',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Le journal El-Moudjahid',
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
								q: 'a) Durant la Révolution, la lutte s’est limitée uniquement au domaine militaire.',
								a: 'Faux',
								c: 'Le combat pour la souveraineté se menait aussi sur le terrain des idées, de l’écrit et de la mémoire collective (§1).',
								mark: '0.5'
							},
							{
								q: 'b) Moufdi Zakaria a composé Kassaman alors qu’il était détenu à la prison de Barberousse.',
								a: 'Vrai',
								c: 'Emprisonné à la prison de Barberousse à Alger en 1955, il y composa Kassaman (§2).',
								mark: '0.5'
							},
							{
								q: 'c) Le journal El-Moudjahid était imprimé librement avec l’autorisation de l’administration coloniale.',
								a: 'Faux',
								c: 'C’était un journal clandestin, imprimé dans des conditions périlleuses, qui démentait les récits officiels de la censure coloniale (§3).',
								mark: '0.5'
							},
							{
								q: 'd) Avant Moufdi Zakaria, Mohamed El-Aïd Al-Khalifa avait déjà illustré la poésie patriotique.',
								a: 'Vrai',
								c: 'Le texte cite les vers du poète Mohamed El-Aïd Al-Khalifa avant lui comme une poésie dépassant la simple recherche esthétique (§2).',
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
							'a) Quelle fonction particulière la poésie remplissait-elle durant la Guerre de Libération selon le paragraphe 2 ?',
						answer:
							'a) Elle dépassait la simple recherche esthétique pour devenir un serment de fidélité envers les martyrs et la patrie, porté par la dignité et la foi.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Quelles étaient les deux missions essentielles remplies par le journal clandestin El-Moudjahid ?',
						answer:
							'b) Il démentait les récits officiels de la censure coloniale et faisait entendre la cause algérienne auprès de l’opinion internationale.',
						mark: '1'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les termes soulignés dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « il » (§2) renvoie à : ............................',
						answer: 'a) « il » renvoie au poète Moufdi Zakaria.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « ce titre » (§3) renvoie à : ............................',
						answer: 'b) « ce titre » renvoie au journal clandestin El-Moudjahid.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_fr_2023_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez avec soin les activités linguistiques et discursives suivantes.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) dangereuses (§3) = ............................',
						answer: 'a) périlleuses',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) retrouver / reconquérir (§4) = ............................',
						answer: 'b) recouvrer',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[poème vibrant ; maquis ; presse écrite ; martyrs ; vers empreints de dignité ; souveraineté].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de la parole engagée',
								items: ['poème vibrant', 'presse écrite', 'vers empreints de dignité'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical de la lutte libératrice',
								items: ['maquis', 'martyrs', 'souveraineté'],
								mark: '0.5'
							}
						]
					}),
					{
						type: 'text',
						content: '#strong[3.] Complétez le tableau de nominalisation (famille de mots).'
					},
					buildFrenchWordFamilyTableBlock([
						{
							verbe: { given: true, value: 'témoigner' },
							nom: { value: 'témoignage', mark: '0.25' },
							adjectif: { value: 'témoin / testimonial', mark: '0.25' }
						},
						{
							verbe: { value: 'engager', mark: '0.25' },
							nom: { given: true, value: 'engagement' },
							adjectif: { value: 'engagé', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Effectuez les transformations grammaticales demandées.'
					},
					{
						type: 'text',
						content:
							'a) Mettez la phrase suivante à la voix passive :\n« Le journal clandestin El-Moudjahid démentait les récits officiels de la censure coloniale. »',
						answer:
							'a) Les récits officiels de la censure coloniale étaient démentis par le journal clandestin El-Moudjahid.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Exprimez la cause en utilisant « grâce à » (transformation nominale) :\n« La cause algérienne a été entendue dans le monde parce que les journalistes étaient courageux. »',
						answer:
							'b) La cause algérienne a été entendue dans le monde grâce au courage des journalistes.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] L’auteur se manifeste-t-il implicitement dans ce texte ? Justifiez votre réponse par deux indices lexicaux puis précisez sa visée communicative.',
						answer:
							'Oui, l’auteur s’implique de manière implicite à travers un lexique mélioratif (« dirigeants résolus », « poème vibrant », « rôle irremplaçable », « courage du verbe »). Sa visée communicative est d’informer sur le rôle de la poésie et de la presse durant la Révolution et de rendre un hommage mémoriel aux écrivains et journalistes engagés.',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_fr_2023_prod',
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets au choix en veillant à la rigueur de l’expression.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Votre professeur de français vous demande de publier sur la revue culturelle du lycée un compte rendu critique de ce texte historique (150 à 180 mots).',
						sujetUnNotes: [
							'Accroche : présentez le titre, la source, le thème et la visée communicative.',
							'Partie objective : condensez fidèlement les idées principales du texte à la troisième personne.',
							'Partie critique : portez un jugement argumenté sur la clarté du plan, la richesse des exemples historiques et l’intérêt mémoriel du texte.'
						],
						sujetDeuxPrompt:
							'« La plume et le savoir ne sont pas moins décisifs que le courage physique dans la défense d’une cause juste. » À l’occasion de la commémoration du 1er Novembre, rédigez un texte argumentatif d’une vingtaine de lignes développant cette réflexion à l’aide d’exemples historiques précis tirés de l’histoire algérienne.',
						rubricSummary:
							'Respect des trois parties du compte rendu critique (2 pts) ; exactitude de la condensation objective (2 pts) ; pertinence du jugement critique argumenté sur le fond et la forme (1.5 pt) ; qualité de la langue, cohérence et orthographe (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « Le 1er Novembre 1954 : quand la plume rejoignit le combat libérateur », synthèse adaptée d’études sur la littérature et la presse de la Révolution algérienne (Édition SujetStore), analyse l’apport décisif de la poésie et du journalisme à la Guerre de Libération. L’auteur vise à informer le lecteur et à rendre hommage à cet engagement intellectuel.\n\nDans un premier temps, il montre que, dès le 1er Novembre 1954, la lutte nationale associa l’action sur le terrain et le combat des idées. Il met ensuite en relief la figure du poète Moufdi Zakaria, auteur de Kassaman en 1955 à la prison de Barberousse, dans la lignée de Mohamed El-Aïd Al-Khalifa. Par ailleurs, il retrace le rôle majeur de la presse, d’El-Bassaïr à El-Moudjahid lancé en 1956, pour briser la censure coloniale et sensibiliser l’opinion mondiale. Enfin, il s’appuie sur l’historien Abou El-Kacem Saadallah pour confirmer la portée durable de cette parole libre.\n\nSur le plan critique, ce texte se distingue par la clarté de sa progression chronologique et la précision de ses références historiques authentiques. L’équilibre entre narration factuelle et lexique valorisant rend l’hommage sobre et convaincant. Toutefois, l’évocation d’un bref témoignage d’époque issu d’El-Moudjahid aurait encore enrichi la dimension documentaire de cet ensemble particulièrement instructif.',
						mark: '7'
					})
				]
			}
		]
	}),

	// ============================================================================
	// 2024 — Projet 2 : Débat d'idées (Le livre papier face aux écrans numériques)
	// ============================================================================
	makeLpPaper({
		academicYear: '2024',
		unitThemeFr:
			'Projet 2 : Débat d’idées — Le livre papier face aux écrans numériques et la formation de l’esprit critique',
		titleTopicFr: 'Le livre papier face aux écrans numériques : former l’esprit critique des jeunes',
		titleTopicAr: 'الكتاب الورقي في مواجهة الشاشات الرقمية وتكوين الروح النقدية لدى الشباب',
		themesFr: [
			'Débat d’idées',
			'Livre papier et écrans numériques',
			'Esprit critique',
			'Lecture approfondie'
		],
		themesAr: [
			'مناظرة الأفكار',
			'الكتاب الورقي والشاشات الرقمية',
			'الروح النقدية',
			'المطالعة العميقة'
		],
		exercises: [
			{
				id: 'lp_fr_2024_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement ce texte argumentatif puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'Livre papier ou écrans numériques : quel support forme le mieux l’esprit critique ?',
						paragraphs: [
							'Dans les bibliothèques universitaires comme dans les foyers, les tablettes et les téléphones intelligents occupent désormais une place prépondérante dans l’accès à l’information. Cette transition suscite un vif débat parmi les enseignants, les parents et les chercheurs en sciences cognitives : l’écran peut-il remplacer le livre imprimé sans altérer la profondeur de la réflexion chez les jeunes lecteurs ?',
							'Les défenseurs du support numérique invoquent des arguments pragmatiques incontestables. Grâce aux bibliothèques virtuelles, un étudiant vivant dans une région éloignée accède instantanément à des ouvrages rares, à des dictionnaires spécialisés et à des articles scientifiques actualisés. [[Ils]] soulignent également la facilité de recherche par mots-clés, le gain d’espace et la réduction des coûts d’impression, autant d’atouts précieux pour démocratiser le savoir.',
							'Cependant, les partisans du livre papier rappellent que lire ne consiste pas seulement à glaner rapidement des données. Sur un écran connecté, les notifications incessantes et les liens hypertextes fragmentent l’attention et favorisent un survol superficiel. À l’opposé, le livre imprimé offre un espace silencieux qui invite à la concentration durable, à l’annotation réfléchie et à la mémorisation structurée, conditions indispensables à la naissance d’un véritable esprit critique.',
							'Plutôt que d’opposer stérilement deux outils complémentaires, il convient d’éduquer les jeunes à une lecture raisonnée. L’écran demeure un instrument remarquable pour la documentation rapide et la vérification des sources, tandis que [[le volume relié]] garde une valeur irremplaçable pour l’étude approfondie des textes complexes et la maturation intellectuelle.'
						],
						source:
							'Dossier éducatif sur les pratiques de lecture contemporaines, Édition pédagogique SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'glaner',
								meaning: 'recueillir çà et là de petits éléments d’information sans lecture continue'
							},
							{
								term: 'fragmentent',
								meaning: 'divisent en morceaux dispersés, interrompent la continuité'
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
								header: 'a) Le débat exposé dans ce texte porte sur :',
								options: [
									'le coût de fabrication du papier recyclé',
									'l’impact comparé du livre papier et des écrans numériques sur la lecture et l’esprit critique',
									'l’interdiction totale des bibliothèques universitaires'
								],
								correct:
									'l’impact comparé du livre papier et des écrans numériques sur la lecture et l’esprit critique',
								mark: '0.5'
							},
							{
								header: 'b) La conclusion de l’auteur défend :',
								options: [
									'la complémentarité raisonnée entre les deux supports',
									'l’abandon définitif du livre imprimé',
									'le rejet complet de toute bibliothèque virtuelle'
								],
								correct: 'la complémentarité raisonnée entre les deux supports',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez le tableau récapitulatif des deux thèses en présence à partir du texte.'
					},
					{
						type: 'table',
						headers: ['Support défendu', 'Atout majeur mis en avant', 'Limite ou spécificité évoquée'],
						cells: [],
						rows: [
							[
								{ content: 'Support numérique', bold: true },
								{
									content: '....................',
									answer: 'Accès instantané aux bibliothèques virtuelles, recherche rapide et baisse des coûts',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Notifications et hyperliens qui fragmentent l’attention (lecture superficielle)',
									mark: '0.25'
								}
							],
							[
								{ content: 'Livre papier', bold: true },
								{
									content: '....................',
									answer: 'Concentration durable, annotation réfléchie et mémorisation structurée',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Indispensable à l’étude approfondie des textes complexes et à l’esprit critique',
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
								q: 'a) Les bibliothèques virtuelles aident les étudiants des régions éloignées à accéder à des ouvrages rares.',
								a: 'Vrai',
								c: 'Un étudiant vivant dans une région éloignée accède instantanément à des ouvrages rares et à des articles scientifiques (§2).',
								mark: '0.5'
							},
							{
								q: 'b) Les notifications sur écran connecté améliorent la concentration prolongée du lecteur.',
								a: 'Faux',
								c: 'Les notifications incessantes et les liens hypertextes fragmentent l’attention et favorisent un survol superficiel (§3).',
								mark: '0.5'
							},
							{
								q: 'c) Le livre imprimé encourage l’annotation personnelle et la mémorisation structurée.',
								a: 'Vrai',
								c: 'Le livre imprimé offre un espace silencieux qui invite à la concentration durable, à l’annotation réfléchie et à la mémorisation structurée (§3).',
								mark: '0.5'
							},
							{
								q: 'd) L’auteur recommande de supprimer totalement les écrans dans les études universitaires.',
								a: 'Faux',
								c: 'Il refuse d’opposer stérilement les deux outils et reconnaît que l’écran demeure utile pour la documentation rapide et la vérification des sources (§4).',
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
							'a) Quels sont les trois éléments du livre papier qui favorisent la formation d’un véritable esprit critique ?',
						answer:
							'a) La concentration durable (dans un espace silencieux), l’annotation réfléchie et la mémorisation structurée.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Quelle répartition des usages l’auteur propose-t-il dans le paragraphe final ?',
						answer:
							'b) Il propose de réserver l’écran à la documentation rapide et à la vérification des sources, et le livre papier à l’étude approfondie des textes complexes et à la maturation intellectuelle.',
						mark: '1'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les termes soulignés dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « Ils » (§2) renvoie à : ............................',
						answer: 'a) « Ils » renvoie aux défenseurs du support numérique.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « le volume relié » (§4) renvoie à : ............................',
						answer: 'b) « le volume relié » renvoie au livre papier (le livre imprimé).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_fr_2024_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Réalisez les exercices de lexique, de grammaire et de discours suivants.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte l’antonyme (le contraire) de chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) approfondi (§3) = ............................',
						answer: 'a) superficiel',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) temporaire / passagère (§3) = ............................',
						answer: 'b) durable',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les termes suivants dans le tableau ci-dessous : #emph[liens hypertextes ; annotation réfléchie ; bibliothèques virtuelles ; espace silencieux ; notifications incessantes ; mémorisation structurée].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de la lecture numérique',
								items: ['liens hypertextes', 'bibliothèques virtuelles', 'notifications incessantes'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical de la lecture approfondie',
								items: ['annotation réfléchie', 'espace silencieux', 'mémorisation structurée'],
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
							verbe: { given: true, value: 'concentrer' },
							nom: { value: 'concentration', mark: '0.25' },
							adjectif: { value: 'concentré', mark: '0.25' }
						},
						{
							verbe: { value: 'mémoriser', mark: '0.25' },
							nom: { given: true, value: 'mémorisation / mémoire' },
							adjectif: { value: 'mémorable / mémoriel', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Réécrivez les phrases suivantes selon la consigne donnée.'
					},
					{
						type: 'text',
						content:
							'a) Exprimez l’opposition à l’aide de « tandis que » :\n« Les écrans facilitent la recherche rapide. Le livre imprimé favorise la méditation intellectuelle. »',
						answer:
							'a) Les écrans facilitent la recherche rapide, tandis que le livre imprimé favorise la méditation intellectuelle.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Exprimez la concession avec « Quoique + subjonctif » :\n« Le support numérique est pratique, mais il expose le jeune lecteur à de nombreuses distractions. »',
						answer:
							'b) Quoique le support numérique soit pratique, il expose le jeune lecteur à de nombreuses distractions.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] Précisez la visée communicative de l’auteur et relevez un articulateur d’opposition qui structure le débat.',
						answer:
							'Visée communicative : confronter deux points de vue sur les supports de lecture pour convaincre le lecteur de la nécessité d’un usage complémentaire et raisonné préservant l’esprit critique. Articulateur d’opposition : « Cependant » (§3) ou « À l’opposé » (§3) ou « tandis que » (§4).',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_fr_2024_prod',
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets proposés en respectant les règles du genre.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Pour alimenter le débat littéraire de votre lycée sur la lecture chez les jeunes, rédigez le compte rendu critique de ce texte en 150 à 180 mots.',
						sujetUnNotes: [
							'Présentez le texte (titre, source, problématique et visée argumentative).',
							'Résumez objectivement les deux thèses confrontées puis la synthèse finale de l’auteur.',
							'Formulez un avis critique argumenté sur l’équilibre du raisonnement, la clarté de la langue et l’actualité du sujet.'
						],
						sujetDeuxPrompt:
							'De nombreux jeunes déclarent qu’ils n’ont plus besoin d’ouvrir un livre papier puisqu’ils disposent d’un téléphone connecté en permanence. Rédigez un essai argumentatif d’une vingtaine de lignes dans lequel vous montrerez pourquoi la lecture de livres imprimés demeure irremplaçable pour cultiver la langue et l’esprit critique.',
						rubricSummary:
							'Structure complète du compte rendu critique (2 pts) ; fidélité du résumé des thèses et de la synthèse (2 pts) ; pertinence et nuance de l’appréciation critique (1.5 pt) ; correction linguistique et soin (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « Livre papier ou écrans numériques : quel support forme le mieux l’esprit critique ? », issu d’un dossier éducatif (Édition pédagogique SujetStore), traite de la rivalité apparente entre la lecture sur écran et le livre imprimé. L’auteur vise à confronter deux visions pour défendre une complémentarité raisonnée.\n\nDans un premier temps, il expose les arguments des partisans du numérique, qui valorisent l’accès immédiat aux bibliothèques virtuelles, la recherche par mots-clés et la diminution des coûts. Ensuite, il rapporte le point de vue des défenseurs du livre papier : alors que les notifications fragmentent l’attention, le livre imprimé favorise la concentration silencieuse, l’annotation réfléchie et la mémorisation structurée, gages d’esprit critique. Enfin, il conclut que chaque support a sa fonction propre : documentation rapide pour l’écran et étude approfondie pour le livre.\n\nCe texte se révèle particulièrement convaincant par son plan dialectique équilibré et son vocabulaire précis, accessible aux lycéens. Loin de tout excès polémique, la nuance finale emporte l’adhésion. On pourrait toutefois souhaiter l’ajout de quelques données chiffrées issues d’enquêtes récentes sur la lecture des adolescents afin de renforcer davantage la démonstration.',
						mark: '7'
					})
				]
			}
		]
	}),

	// ============================================================================
	// 2025 — Projet 3 : L'Appel (Solidarité « Touiza » et patrimoine historique national)
	// ============================================================================
	makeLpPaper({
		academicYear: '2025',
		unitThemeFr:
			'Projet 3 : L’Appel — Solidarité algérienne « Touiza » et préservation du patrimoine historique',
		titleTopicFr: 'Appel à la solidarité « Touiza » et à la sauvegarde du patrimoine historique national',
		titleTopicAr: 'نداء لإحياء روح التويزة والتضامن وحماية التراث التاريخي الوطني',
		themesFr: [
			'Texte exhortatif (L’Appel)',
			'Touiza et solidarité algérienne',
			'Patrimoine historique national',
			'Casbah d’Alger, Tlemcen et M’Zab'
		],
		themesAr: [
			'نص النداء',
			'التويزة والتضامن الجزائري',
			'التراث التاريخي الوطني',
			'القصبة وتلمسان وميزاب'
		],
		exercises: [
			{
				id: 'lp_fr_2025_comp',
				customTitle: 'I. Compréhension de l’écrit — A / Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement cet appel puis répondez aux questions.',
				content: [
					buildFrenchPassageBlock({
						title: 'Réveillons l’esprit de la Touiza pour sauver notre patrimoine historique !',
						paragraphs: [
							'De la Casbah d’Alger à la Grande Mosquée de Tlemcen, de la Kalâa des Béni Hammad aux ksour millénaires de la Vallée du M’Zab, l’Algérie abrite un patrimoine architectural et historique d’une richesse exceptionnelle. Pourtant, aujourd’hui, l’usure du temps, l’humidité, les dépôts sauvages et parfois l’oubli menacent plusieurs de ces joyaux de notre mémoire collective. Attendre passivement que ces pierres chargées d’histoire s’effritent serait une faute grave envers nos ancêtres et envers nos enfants.',
							'Pour relever ce défi, notre société possède une valeur ancestrale d’une force remarquable : la « Touiza ». Cette tradition algérienne d’entraide volontaire et désintéressée a permis, durant des siècles, de bâtir des maisons, d’entretenir les systèmes d’irrigation traditionnels et de soutenir les familles démunies dans un esprit de fraternité sincère. [[Elle]] incarne l’union concrète entre la solidarité sociale et le sens du bien commun.',
							'Aujourd’hui, transposer la Touiza au service du patrimoine historique constitue une réponse citoyenne exemplaire. Sous la supervision d’architectes et d’artisans qualifiés, des bénévoles peuvent participer au nettoyage des sites, à la documentation photographique des anciens quartiers, à la sensibilisation des visiteurs et à la transmission des métiers traditionnels du bois, de la pierre et de la chaux. Protéger ces lieux, c’est préserver l’âme vivante d’une civilisation.',
							'Chers jeunes, étudiants, associations culturelles et artisans, [[nous]] vous exhortons à vous lever ensemble pour cette noble cause ! Rejoignez les chantiers citoyens de sauvegarde, respectez la propreté des monuments que vous visitez et faites connaître leur histoire autour de vous. Mobilisons-nous dès maintenant afin que la fraternité de la Touiza redonne éclat et pérennité à notre héritage commun !'
						],
						source:
							'Manifeste citoyen pour la sauvegarde du patrimoine historique algérien, Édition SujetStore',
						numberedParagraphs: true,
						glossary: [
							{
								term: 'ksour',
								meaning: 'villages anciens fortifiés caractéristiques du Sud algérien et du M’Zab'
							},
							{
								term: 'pérennité',
								meaning: 'caractère de ce qui dure longtemps et traverse les générations'
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
								header: 'a) Cet appel associe deux thèmes majeurs :',
								options: [
									'la tradition solidaire de la Touiza et la sauvegarde du patrimoine historique algérien',
									'le commerce maritime et la pêche côtière',
									'le tourisme spatial et l’astronomie moderne'
								],
								correct:
									'la tradition solidaire de la Touiza et la sauvegarde du patrimoine historique algérien',
								mark: '0.5'
							},
							{
								header: 'b) Dans le paragraphe 3, les bénévoles doivent intervenir :',
								options: [
									'sans aucune règle technique',
									'sous la supervision d’architectes et d’artisans qualifiés',
									'en remplaçant les pierres anciennes par du plastique'
								],
								correct: 'sous la supervision d’architectes et d’artisans qualifiés',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content:
							'#strong[2.] Complétez le tableau d’analyse de cet appel à partir des éléments du texte.'
					},
					{
						type: 'table',
						headers: ['Patrimoine cité', 'Menaces évoquées', 'Valeur mobilisée', 'Destinataires de l’appel'],
						cells: [],
						rows: [
							[
								{
									content: '....................',
									answer: 'Casbah d’Alger, Grande Mosquée de Tlemcen, Kalâa des Béni Hammad, ksour du M’Zab',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Usure du temps, humidité, dépôts sauvages et oubli',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'La Touiza (entraide volontaire, fraternité et sens du bien commun)',
									mark: '0.25'
								},
								{
									content: '....................',
									answer: 'Les jeunes, les étudiants, les associations culturelles et les artisans',
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
								q: 'a) Les sites historiques algériens cités sont totalement à l’abri de toute dégradation.',
								a: 'Faux',
								c: 'L’usure du temps, l’humidité, les dépôts sauvages et l’oubli menacent plusieurs de ces joyaux (§1).',
								mark: '0.5'
							},
							{
								q: 'b) La Touiza est une coutume récente importée d’Europe au siècle dernier.',
								a: 'Faux',
								c: 'C’est une valeur ancestrale et une tradition algérienne d’entraide volontaire pratiquée durant des siècles (§2).',
								mark: '0.5'
							},
							{
								q: 'c) La transmission des métiers anciens du bois, de la pierre et de la chaux fait partie des actions proposées.',
								a: 'Vrai',
								c: 'Les bénévoles peuvent participer à la transmission des métiers traditionnels du bois, de la pierre et de la chaux (§3).',
								mark: '0.5'
							},
							{
								q: 'd) Les auteurs invitent les citoyens à faire connaître l’histoire des monuments autour d’eux.',
								a: 'Vrai',
								c: 'Ils exhortent les destinataires à respecter la propreté des monuments et à faire connaître leur histoire autour d’eux (§4).',
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
							'a) Quelles réalisations traditionnelles la Touiza a-t-elle rendues possibles autrefois ?',
						answer:
							'a) Elle a permis de bâtir des maisons, d’entretenir les systèmes d’irrigation traditionnels et de soutenir les familles démunies.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Citez deux actions bénévoles concrètes proposées au paragraphe 3 pour protéger le patrimoine historique.',
						answer:
							'b) Participer au nettoyage des sites, à la documentation photographique des anciens quartiers, à la sensibilisation des visiteurs ou à la transmission des métiers traditionnels (deux actions au choix).',
						mark: '1'
					},
					{
						type: 'text',
						content: '#strong[5.] À qui ou à quoi renvoient les pronoms soulignés dans le texte ?'
					},
					{
						type: 'text',
						content: 'a) « Elle » (§2) renvoie à : ............................',
						answer: 'a) « Elle » renvoie à la Touiza (cette tradition algérienne d’entraide volontaire).',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) « nous » (§4) renvoie à : ............................',
						answer:
							'b) « nous » renvoie aux auteurs du manifeste citoyen pour la sauvegarde du patrimoine historique.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_fr_2025_lang',
				customTitle: 'I. Compréhension de l’écrit — B / Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités de lexique, de grammaire et de discours ci-dessous.',
				content: [
					{
						type: 'text',
						content: '#strong[1.] Relevez dans le texte un synonyme pour chacun des mots suivants :'
					},
					{
						type: 'text',
						content: 'a) bénévole / sans recherche de profit (§2) = ............................',
						answer: 'a) désintéressée',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) encourageons vivement (§4) = ............................',
						answer: 'b) exhortons',
						mark: '0.5'
					},
					{
						type: 'text',
						content:
							'#strong[2.] Classez les expressions suivantes dans le tableau ci-dessous : #emph[entraide volontaire ; monuments historiques ; fraternité sincère ; ksour millénaires ; bien commun ; anciens quartiers].'
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{
								header: 'Champ lexical de la solidarité (Touiza)',
								items: ['entraide volontaire', 'fraternité sincère', 'bien commun'],
								mark: '0.5'
							},
							{
								header: 'Champ lexical du patrimoine',
								items: ['monuments historiques', 'ksour millénaires', 'anciens quartiers'],
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
							verbe: { given: true, value: 'restaurer' },
							nom: { value: 'restauration / restaurateur', mark: '0.25' },
							adjectif: { value: 'restauré', mark: '0.25' }
						},
						{
							verbe: { value: 'transmettre', mark: '0.25' },
							nom: { given: true, value: 'transmission' },
							adjectif: { value: 'transmissible', mark: '0.25' }
						}
					]),
					{
						type: 'text',
						content: '#strong[4.] Réécrivez les phrases suivantes en appliquant la consigne indiquée.'
					},
					{
						type: 'text',
						content:
							'a) Transformez les verbes à l’impératif en employant « Il est urgent que + subjonctif présent » :\n« Rejoignez les chantiers citoyens et respectez la propreté des monuments. »',
						answer:
							'a) Il est urgent que vous rejoigniez les chantiers citoyens et que vous respectiez la propreté des monuments.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'b) Transformez la phrase suivante au discours indirect :\nUn artisan a déclaré aux étudiants : « Nous devons transmettre ces savoir-faire anciens aux jeunes générations. »',
						answer:
							'b) Un artisan a déclaré aux étudiants qu’ils devaient transmettre ces savoir-faire anciens aux jeunes générations.',
						mark: '1'
					},
					{
						type: 'text',
						content:
							'#strong[5.] Relevez deux indices d’exhortation dans le paragraphe 4 puis énoncez la visée communicative de cet appel.',
						answer:
							'Indices d’exhortation : l’interpellation directe (« Chers jeunes, étudiants, associations culturelles et artisans »), le verbe performatif (« nous vous exhortons ») et les impératifs (« Rejoignez », « respectez », « faites connaître », « Mobilisons-nous »). Visée communicative : inciter et mobiliser les citoyens algériens à raviver la solidarité de la Touiza pour sauvegarder le patrimoine historique national.',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_fr_2025_prod',
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets au choix en soignant le fond et la forme.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt:
							'Vous animez la page culturelle de votre lycée consacrée au Mois du Patrimoine. Rédigez le compte rendu critique de cet appel en 150 à 180 mots.',
						sujetUnNotes: [
							'Présentez le document (titre, source, thème et visée exhortative).',
							'Condensez objectivement ses trois étapes : constat des menaces, valeur de la Touiza et actions proposées, puis exhortation finale.',
							'Ajoutez une appréciation critique argumentée portant sur la force persuasive du texte, son ancrage culturel et ses pistes d’amélioration.'
						],
						sujetDeuxPrompt:
							'Dans votre ville ou votre village, un édifice ancien ou un lieu de mémoire locale subit les effets de la négligence. Rédigez un appel d’une vingtaine de lignes adressé aux autorités locales, aux associations et aux jeunes pour lancer une « Touiza citoyenne » destinée à nettoyer, valoriser et protéger ce lieu.',
						rubricSummary:
							'Respect des trois volets du compte rendu critique (2 pts) ; fidélité de la condensation des étapes de l’appel (2 pts) ; richesse et justesse de la critique argumentée (1.5 pt) ; correction linguistique, cohérence et présentation (1.5 pt).',
						modelAnswer:
							'Le texte intitulé « Réveillons l’esprit de la Touiza pour sauver notre patrimoine historique ! », extrait d’un manifeste citoyen (Édition SujetStore), est un appel consacré à la sauvegarde des monuments algériens grâce à la solidarité collective. Les auteurs visent à mobiliser la société pour agir concrètement.\n\nDans un premier temps, ils rappellent la richesse exceptionnelle de sites comme la Casbah d’Alger, la Grande Mosquée de Tlemcen, la Kalâa des Béni Hammad et les ksour du M’Zab, tout en déplorant les menaces qui pèsent sur eux. Ensuite, ils valorisent la tradition ancestrale de la Touiza, symbole d’entraide désintéressée, et proposent de l’adapter à des actions bénévoles encadrées par des architectes et des artisans : nettoyage, documentation, sensibilisation et transmission des métiers anciens. Enfin, ils exhortent les jeunes, les étudiants, les associations et les artisans à rejoindre les chantiers citoyens.\n\nCet appel se distingue par la force de son ancrage culturel et l’efficacité de sa structure exhortative qui allie lucidité et enthousiasme. Le souci d’encadrer le bénévolat par des spécialistes rend la démarche crédible. Il aurait néanmoins gagné en portée pratique en précisant les modalités d’organisation concrète de ces chantiers au niveau des communes.',
						mark: '7'
					})
				]
			}
		]
	})
];
