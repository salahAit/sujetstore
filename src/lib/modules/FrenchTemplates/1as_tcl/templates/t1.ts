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
// 5 Parameterized Templates — 1AS TCL Trimester 1 (Points split: 7 + 6 + 7 = 20)
// 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
// Projet 1 : Texte de vulgarisation culturelle et scientifique (Patrimoine, livres, science islamique)
// ============================================================================

// 1. Compréhension 1 — Texte documentaire sur le patrimoine algérien (7 pts)
const tpl1asTclT1PatrimoineComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t1_patrimoine_comp',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — نص وثائقي ثقافي حول التراث الجزائري (القصبة، وادي ميزاب، والجامع الكبير بتلمسان)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t1_procedes_texte_documentaire',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'La Casbah d’Alger : une architecture adaptée au climat et à la vie sociale',
				source: 'Cahiers du Patrimoine Algérien (texte adapté)',
				paragraphs: [
					'Inscrite au patrimoine mondial en 1992, la Casbah d’Alger désigne la vieille cité historique bâtie en amphithéâtre face à la mer Méditerranée. Son nom vient de l’arabe et signifie la citadelle qui protège la ville.',
					'Sur le plan urbain, [[ce quartier ancien]] obéit à une organisation ingénieuse. Ses ruelles étroites et sinueuses protègent les passants du soleil ardent en été et brisent la force des vents marins en hiver. Les maisons traditionnelles, appelées « dar », s’organisent autour d’une cour intérieure nommée « wast ed-dar » ; autrement dit, l’espace central assure à la fois la lumière naturelle, la ventilation et l’intimité familiale.',
					'En outre, la Casbah rassemble des édifices remarquables : mosquées séculaires, fontaines publiques, palais et ateliers d’artisans. Aujourd’hui, des architectes et des historiens œuvrent à [[sa]] restauration afin de transmettre cet héritage vivant aux générations futures.'
				],
				glossary: [
					{ term: 'en amphithéâtre', meaning: 'disposée en gradins qui s’élèvent progressivement sur une colline' },
					{ term: 'séculaires', meaning: 'qui existent depuis plusieurs siècles' }
				],
				tfItems: [
					{
						q: 'La Casbah d’Alger a été inscrite au patrimoine mondial en 1992.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les ruelles étroites de la Casbah laissent entrer toute la chaleur du soleil d’été.',
						a: 'Faux',
						c: 'Elles protègent les passants du soleil ardent en été et freinent les vents marins en hiver.',
						mark: '0.5'
					},
					{
						q: 'La cour intérieure des maisons traditionnelles assure lumière, ventilation et intimité.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Que signifie le mot « Casbah » et comment la vieille cité est-elle située géographiquement (§1) ?',
				a1: 'Il signifie la citadelle qui protège la ville ; elle est bâtie en amphithéâtre face à la mer Méditerranée.',
				q2: 'Relevez dans le texte un procédé de reformulation (§2) et une énumération (§3).',
				a2: 'Reformulation : « autrement dit, l’espace central assure à la fois la lumière naturelle, la ventilation et l’intimité familiale ». Énumération : « mosquées séculaires, fontaines publiques, palais et ateliers d’artisans ».',
				q3: 'L’auteur de ce texte est-il plutôt objectif ? Justifiez par deux indices textuels.',
				a3: 'Oui, l’auteur est objectif : il s’efface (absence de « je »), donne une date précise (1992) et emploie le présent de vérité générale avec un lexique architectural exact.',
				ref1Word: 'ce quartier ancien (§2)',
				ref1Ans: 'la Casbah d’Alger',
				ref2Word: 'sa (§3)',
				ref2Ans: 'de la Casbah d’Alger',
				viseeCorrect: 'Informer le lecteur sur l’organisation architecturale et la valeur patrimoniale de la Casbah d’Alger',
				viseeDistractors: [
					{
						text: 'Raconter un fait divers survenu dans un port méditerranéen',
						diagnosticFeedback: 'Ce texte documentaire ne relate aucun fait divers.'
					},
					{
						text: 'Critiquer la construction des maisons traditionnelles à cour intérieure',
						diagnosticFeedback: 'L’auteur explique au contraire l’ingéniosité climatique et sociale de cette architecture.'
					},
					{
						text: 'Écrire une lettre ouverte au maire d’Alger',
						diagnosticFeedback: 'Il n’y a ni formule d’appel ni structure épistolaire.'
					}
				],
				themeSummary: 'l’architecture traditionnelle et la valeur historique de la Casbah d’Alger'
			},
			{
				title: 'La Vallée du M’Zab : un modèle d’urbanisme harmonieux au Sahara',
				source: 'Revue d’Architecture et de Culture Maghrébine (texte adapté)',
				paragraphs: [
					'Située dans la wilaya de Ghardaïa, la Vallée du M’Zab abrite cinq cités fortifiées construites dès le XIe siècle et appelées « ksour » : El-Atteuf, Bounoura, Melika, Beni Isguen et Ghardaïa. Chaque ksar est bâti sur un piton rocheux afin de préserver les terres fertiles de la palmeraie.',
					'L’urbanisme du M’Zab repose sur des principes d’égalité et d’adaptation climatique. Les maisons sont construites en matériaux locaux, tels que la pierre, la chaux et le bois de palmier. [[Elles]] possèdent des murs épais qui conservent la fraîcheur intérieure durant les fortes chaleurs estivales. De plus, aucune habitation ne doit dépasser une hauteur précise afin de ne pas priver le voisin de soleil et d’air.',
					'Par ailleurs, un système hydraulique traditionnel ingénieux répartit équitablement les eaux rares des crues entre tous les jardins de l’oasis. Classée au patrimoine mondial, [[cette vallée]] inspire encore aujourd’hui les architectes spécialistes de l’urbanisme durable.'
				],
				glossary: [
					{ term: 'piton rocheux', meaning: 'colline rocheuse élevée et escarpée' },
					{ term: 'crues', meaning: 'montées soudaines et temporaires des eaux après les pluies' }
				],
				tfItems: [
					{
						q: 'Les cinq cités anciennes du M’Zab sont bâties sur des hauteurs rocheuses pour protéger la palmeraie.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les maisons du M’Zab sont construites uniquement en verre et en acier importés.',
						a: 'Faux',
						c: 'Elles sont construites en matériaux locaux : pierre, chaux et bois de palmier.',
						mark: '0.5'
					},
					{
						q: 'Les règles d’urbanisme du M’Zab limitent la hauteur des maisons par respect pour les voisins.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels matériaux locaux servent à construire les maisons de la Vallée du M’Zab (§2) ?',
				a1: 'La pierre, la chaux et le bois de palmier.',
				q2: 'Pourquoi les habitants ont-ils limité la hauteur de chaque maison (§2) ?',
				a2: 'Afin de ne pas priver les habitations voisines de soleil et d’air.',
				q3: 'Relevez dans le texte une dénomination (§1) et une énumération (§1).',
				a3: 'Dénomination : « appelées ksour ». Énumération : « El-Atteuf, Bounoura, Melika, Beni Isguen et Ghardaïa ».',
				ref1Word: 'Elles (§2)',
				ref1Ans: 'les maisons (du M’Zab)',
				ref2Word: 'cette vallée (§3)',
				ref2Ans: 'la Vallée du M’Zab',
				viseeCorrect: 'Expliquer les principes d’urbanisme durable et d’harmonie sociale de la Vallée du M’Zab',
				viseeDistractors: [
					{
						text: 'Raconter une aventure fictive dans les dunes sahariennes',
						diagnosticFeedback: 'Il s’agit d’un texte documentaire objectif fondé sur l’histoire et l’architecture.'
					},
					{
						text: 'Vendre des billets d’avion vers le Sud algérien',
						diagnosticFeedback: 'Le texte n’a aucune visée commerciale.'
					},
					{
						text: 'Expliquer les règles de culture des céréales au Nord',
						diagnosticFeedback: 'Le texte porte sur l’architecture et l’hydraulique du M’Zab.'
					}
				],
				themeSummary: 'l’urbanisme durable et l’organisation sociale de la Vallée du M’Zab'
			},
			{
				title: 'La Grande Mosquée de Tlemcen : un joyau de l’art architectural islamique',
				source: 'Dossier Patrimoine et Histoire d’Algérie (texte adapté)',
				paragraphs: [
					'Édifiée en 1082 sous le règne almoravide puis agrandie au XIIIe siècle par les Zianides, la Grande Mosquée de Tlemcen constitue l’un des monuments islamiques les plus anciens et les mieux conservés du Maghreb.',
					'Son architecture se distingue par l’équilibre de ses proportions et la finesse de ses décors. La salle de prière se compose de treize nefs soutenues par des arcs outrepassés. Au-dessus du mihrab s’élève une coupole ajourée, c’est-à-dire une voûte finement sculptée qui laisse filtrer une douce lumière naturelle. Quant au minaret carré bâti en brique cuite, [[il]] domine l’ensemble de la cour pavée.',
					'Pendant des siècles, [[ce haut lieu du savoir]] a joué un double rôle : lieu de culte paisible et centre d’enseignement où de nombreux savants donnaient des cours de jurisprudence, de langue arabe et de sciences. Elle demeure aujourd’hui un témoignage essentiel de la civilisation islamique en Algérie.'
				],
				glossary: [
					{ term: 'nefs', meaning: 'allées intérieures parallèles délimitées par des rangées d’arcs ou de colonnes' },
					{ term: 'mihrab', meaning: 'niche ornée indiquant la direction de la Qibla dans une mosquée' }
				],
				tfItems: [
					{
						q: 'La Grande Mosquée de Tlemcen a été fondée au XIe siècle (en 1082).',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'La coupole située au-dessus du mihrab est entièrement fermée et obscure.',
						a: 'Faux',
						c: 'C’est une coupole ajourée qui laisse filtrer une douce lumière naturelle.',
						mark: '0.5'
					},
					{
						q: 'La mosquée a servi à la fois de lieu de prière et de centre d’enseignement.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quelles sont les deux dynasties historiques ayant contribué à la construction et à l’agrandissement de la mosquée (§1) ?',
				a1: 'Les Almoravides (en 1082) puis les Zianides (au XIIIe siècle).',
				q2: 'Quel double rôle la Grande Mosquée de Tlemcen a-t-elle rempli au fil des siècles (§3) ?',
				a2: 'Elle a servi à la fois de lieu de culte et de centre d’enseignement (jurisprudence, langue arabe et sciences).',
				q3: 'Relevez dans le paragraphe 2 un procédé de reformulation et citez l’indice qui l’introduit.',
				a3: '« c’est-à-dire une voûte finement sculptée qui laisse filtrer une douce lumière naturelle » (indice : « c’est-à-dire »).',
				ref1Word: 'il (§2)',
				ref1Ans: 'le minaret carré bâti en brique cuite',
				ref2Word: 'ce haut lieu du savoir (§3)',
				ref2Ans: 'la Grande Mosquée de Tlemcen',
				viseeCorrect: 'Présenter l’histoire, l’architecture et le rayonnement culturel de la Grande Mosquée de Tlemcen',
				viseeDistractors: [
					{
						text: 'Raconter une visite personnelle remplie d’exclamations subjectives',
						diagnosticFeedback: 'Le texte adopte un ton documentaire neutre sans « je ».'
					},
					{
						text: 'Comparer le climat de Tlemcen à celui d’Oran',
						diagnosticFeedback: 'Le texte porte sur un monument historique, non sur la climatologie.'
					},
					{
						text: 'Donner un mode d’emploi pour fabriquer des briques en argile',
						diagnosticFeedback: 'La brique cuite n’est mentionnée que pour décrire le minaret.'
					}
				],
				themeSummary: 'l’architecture et le rôle scientifique historique de la Grande Mosquée de Tlemcen'
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
						? '1) Répondez par Vrai ou Faux en justifiant les énoncés faux à partir du texte :'
						: '1) Dites si les affirmations suivantes sont Vraies ou Fausses :'
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
				content: `3) À quoi renvoient les substituts soulignés dans le texte ?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Quelle est la visée communicative principale de ce texte documentaire ?',
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Dans le texte documentaire « ${variant.title} », que cherche principalement à faire l’auteur ?`,
				questionTextAr: 'حدّد الغاية التواصلية الرئيسية لهذا النص الوثائقي التراثي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Ce texte documentaire informe le lecteur de façon structurée sur ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le texte documentaire puis répondez aux questions suivantes :',
				content
			},
			hints: [
				'لاحظ المراحل الثلاث للنص الوثائقي: التعريف بالمَعلم وتاريخه (§1)، شرح خصائصه المعمارية (§2)، ثم قيمته التراثية (§3).',
				'ابحث عن مؤشرات الأساليب التفسيرية: désigne, appelées, c’est-à-dire, autrement dit, tels que، والنقطتين للتعداد.',
				'تذكّر أن التعويض قد يكون نحويا (il / elles / sa) أو معجميا (ce quartier ancien / ce haut lieu du savoir).'
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

// 2. Compréhension 2 — Science islamique, livres et transmission du savoir (7 pts)
const tpl1asTclT1ScienceIslamiqueComp: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t1_science_islamique_comp',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب — نص ثقافي علمي حول الحضارة الإسلامية والكتاب (فاطمة الفهرية، الخوارزمي، وبجاية العلمية)',
	curriculumLessonId: 'fre_lesson_1as_tcl_t1_substitution_reprises',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Fatima Al-Fihriya et la fondation de la bibliothèque d’Al-Qarawiyyin',
				source: 'Revue d’Histoire des Bibliothèques du Monde Musulman (texte adapté)',
				paragraphs: [
					'En l’an 859, une femme instruite et généreuse nommée Fatima Al-Fihriya consacra son héritage à l’édification d’une grande mosquée-université à Fès : Al-Qarawiyyin. [[Cette institution prestigieuse]] est reconnue comme la plus ancienne université au monde toujours en activité.',
					'Dès ses débuts, on y enseignait des disciplines variées : sciences religieuses, langue arabe, astronomie, mathématiques et médecine. De grands savants maghrébins tels qu’Ibn Khaldoun y ont étudié ou enseigné. La bibliothèque attenante abritait des milliers de manuscrits copiés avec soin sur parchemin et sur papier.',
					'Grâce aux travaux de restauration menés récemment, [[ces ouvrages rares]] continuent d’être consultés par des chercheurs venus de nombreux pays. L’exemple de Fatima Al-Fihriya illustre la place centrale du livre et de l’éducation dans la civilisation islamique.'
				],
				glossary: [
					{ term: 'attenante', meaning: 'située juste à côté et reliée au bâtiment principal' },
					{ term: 'parchemin', meaning: 'support d’écriture ancien préparé à partir de peau fine' }
				],
				tfItems: [
					{
						q: 'Fatima Al-Fihriya a financé la fondation d’Al-Qarawiyyin grâce à son propre héritage.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Al-Qarawiyyin enseignait exclusivement l’astronomie sans aucune autre discipline.',
						a: 'Faux',
						c: 'On y enseignait des disciplines variées : sciences religieuses, langue arabe, astronomie, mathématiques et médecine.',
						mark: '0.5'
					},
					{
						q: 'Ibn Khaldoun fait partie des grands savants liés à cette institution.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quand et où l’institution d’Al-Qarawiyyin a-t-elle été fondée (§1) ?',
				a1: 'En 859, dans la ville de Fès.',
				q2: 'Citez quatre disciplines enseignées à Al-Qarawiyyin selon le paragraphe 2.',
				a2: 'Sciences religieuses, langue arabe, astronomie, mathématiques et médecine (quatre au choix).',
				q3: 'Relevez dans le texte un substitut lexical (§1) et un procédé d’illustration (§2).',
				a3: 'Substitut lexical : « Cette institution prestigieuse » (pour Al-Qarawiyyin). Illustration : « tels qu’Ibn Khaldoun ».',
				ref1Word: 'Cette institution prestigieuse (§1)',
				ref1Ans: 'la mosquée-université d’Al-Qarawiyyin',
				ref2Word: 'ces ouvrages rares (§3)',
				ref2Ans: 'des milliers de manuscrits conservés dans la bibliothèque',
				viseeCorrect: 'Informer sur la fondation d’Al-Qarawiyyin et le rôle du livre dans la civilisation islamique',
				viseeDistractors: [
					{
						text: 'Raconter une histoire fictive sur un manuscrit perdu',
						diagnosticFeedback: 'Le texte expose des faits historiques authentiques.'
					},
					{
						text: 'Convaincre les élèves de ne plus utiliser de dictionnaires modernes',
						diagnosticFeedback: 'Aucune critique des outils modernes n’apparaît ici.'
					},
					{
						text: 'Expliquer la technique industrielle de fabrication du papier moderne',
						diagnosticFeedback: 'Le papier et le parchemin ne sont évoqués que brièvement comme supports.'
					}
				],
				themeSummary: 'la fondation d’Al-Qarawiyyin et la transmission du savoir par les manuscrits'
			},
			{
				title: 'Al-Khwarizmi : de la Maison de la Sagesse à la naissance de l’algèbre',
				source: 'Cahiers de l’Histoire des Sciences et des Lettres (texte adapté)',
				paragraphs: [
					'Au IXe siècle, la ville de Bagdad abritait un grand centre de recherche et de traduction appelé « Bayt al-Hikma » (la Maison de la Sagesse). C’est dans [[ce foyer intellectuel]] que le mathématicien et géographe musulman Al-Khwarizmi a composé ses œuvres majeures.',
					'Son ouvrage le plus célèbre a donné naissance à une discipline nouvelle : l’algèbre, dont le nom provient directement du mot arabe « al-jabr ». Autrement dit, il a formulé des méthodes systématiques pour résoudre des équations utiles dans la vie quotidienne, par exemple pour le partage équitable des héritages, l’arpentage des terres et le commerce.',
					'De plus, son nom latinisé est à l’origine du mot moderne « algorithme », qui désigne une suite finie d’étapes précises permettant de résoudre un problème. [[Son héritage scientifique]] montre comment les livres et les traductions font progresser toute l’humanité.'
				],
				glossary: [
					{ term: 'arpentage', meaning: 'mesure précise de la surface des terrains agricoles' },
					{ term: 'latinisé', meaning: 'transcrit et adapté dans la langue latine au Moyen Âge' }
				],
				tfItems: [
					{
						q: 'Al-Khwarizmi a travaillé au IXe siècle dans la Maison de la Sagesse à Bagdad.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les méthodes d’Al-Khwarizmi n’avaient aucune application dans la vie quotidienne.',
						a: 'Faux',
						c: 'Elles servaient au partage des héritages, à l’arpentage des terres et au commerce.',
						mark: '0.5'
					},
					{
						q: 'Le terme moderne « algorithme » tire son origine du nom d’Al-Khwarizmi.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Que signifie « Bayt al-Hikma » et quel était son rôle au IXe siècle (§1) ?',
				a1: 'Cela signifie « la Maison de la Sagesse » ; c’était un grand centre de recherche et de traduction à Bagdad.',
				q2: 'Citez deux domaines pratiques dans lesquels les méthodes algébriques d’Al-Khwarizmi étaient utilisées (§2).',
				a2: 'Le partage équitable des héritages, l’arpentage des terres et le commerce (deux au choix).',
				q3: 'Relevez dans le texte une définition (§3) et une reformulation (§2).',
				a3: 'Définition : « qui désigne une suite finie d’étapes précises permettant de résoudre un problème ». Reformulation : « Autrement dit, il a formulé des méthodes systématiques... ».',
				ref1Word: 'ce foyer intellectuel (§1)',
				ref1Ans: 'Bayt al-Hikma (la Maison de la Sagesse)',
				ref2Word: 'Son héritage scientifique (§3)',
				ref2Ans: 'l’ensemble des découvertes et méthodes d’Al-Khwarizmi',
				viseeCorrect: 'Expliquer l’apport fondamental d’Al-Khwarizmi à l’algèbre, aux algorithmes et à la culture scientifique',
				viseeDistractors: [
					{
						text: 'Donner un cours de programmation informatique en langage binaire',
						diagnosticFeedback: 'Le texte retrace l’origine culturelle et historique des mots algèbre et algorithme.'
					},
					{
						text: 'Raconter un voyage maritime d’Ibn Battouta en Asie',
						diagnosticFeedback: 'Le savant présenté ici est Al-Khwarizmi.'
					},
					{
						text: 'Rédiger une pétition pour ouvrir une école de géographie',
						diagnosticFeedback: 'Ce texte est documentaire et objectif, non revendicatif.'
					}
				],
				themeSummary: 'l’œuvre scientifique d’Al-Khwarizmi et l’origine des mots algèbre et algorithme'
			},
			{
				title: 'Béjaïa médiévale : un carrefour des livres et des chiffres arabes',
				source: 'Histoire Culturelle du Maghreb Central (texte adapté)',
				paragraphs: [
					'Entre le XIe et le XIVe siècle, la ville côtière de Béjaïa fut l’un des grands centres intellectuels de la Méditerranée. Ses écoles, ses mosquées et ses bibliothèques accueillaient des étudiants et des savants venus de tout le monde musulman et de la rive nord de la mer.',
					'C’est dans [[cette cité savante]] que le système de numération décimale avec le zéro — transmis par les mathématiciens musulmans — fut étudié et diffusé vers l’Europe. Autrement dit, les échanges pacifiques autour des livres et du commerce à Béjaïa ont facilité l’adoption mondiale des chiffres modernes, plus simples que les chiffres romains.',
					'De nombreux ouvrages de jurisprudence, de poésie arabe et d’astronomie y étaient copiés et commentés. Aujourd’hui encore, les historiens rappellent que [[ce rayonnement culturel]] témoigne de la vitalité ancienne des villes algériennes.'
				],
				glossary: [
					{ term: 'numération décimale', meaning: 'système de calcul fondé sur la base dix et l’usage du zéro' },
					{ term: 'rayonnement', meaning: 'influence intellectuelle et culturelle qui s’étend au loin' }
				],
				tfItems: [
					{
						q: 'Béjaïa a été un important centre intellectuel méditerranéen entre le XIe et le XIVe siècle.',
						a: 'Vrai',
						mark: '0.5'
					},
					{
						q: 'Les chiffres modernes utilisant le zéro étaient plus compliqués que les chiffres romains.',
						a: 'Faux',
						c: 'Le texte indique qu’ils étaient plus simples que les chiffres romains.',
						mark: '0.5'
					},
					{
						q: 'Des livres de jurisprudence, de poésie et d’astronomie étaient copiés à Béjaïa.',
						a: 'Vrai',
						mark: '0.5'
					}
				],
				q1: 'Quels lieux de savoir accueillaient les étudiants à Béjaïa entre le XIe et le XIVe siècle (§1) ?',
				a1: 'Ses écoles, ses mosquées et ses bibliothèques.',
				q2: 'Quel apport mathématique majeur a été diffusé vers l’Europe à partir de Béjaïa (§2) ?',
				a2: 'Le système de numération décimale avec le zéro (les chiffres modernes).',
				q3: 'Relevez dans le texte deux substituts lexicaux qui évitent la répétition et indiquez ce qu’ils remplacent.',
				a3: '« cette cité savante » remplace Béjaïa ; « ce rayonnement culturel » remplace l’activité intellectuelle et la diffusion des savoirs à Béjaïa.',
				ref1Word: 'cette cité savante (§2)',
				ref1Ans: 'la ville côtière de Béjaïa',
				ref2Word: 'ce rayonnement culturel (§3)',
				ref2Ans: 'l’activité savante, les bibliothèques et la diffusion des connaissances à Béjaïa',
				viseeCorrect: 'Informer sur le rôle historique de Béjaïa dans la diffusion des livres et des mathématiques',
				viseeDistractors: [
					{
						text: 'Présenter les plages estivales de la wilaya de Béjaïa',
						diagnosticFeedback: 'Le texte porte sur l’histoire intellectuelle médiévale, non sur le tourisme balnéaire.'
					},
					{
						text: 'Expliquer comment construire un navire de commerce',
						diagnosticFeedback: 'Le commerce est seulement mentionné comme vecteur d’échanges culturels.'
					},
					{
						text: 'Critiquer l’usage des chiffres décimaux dans les écoles',
						diagnosticFeedback: 'Le texte souligne au contraire la simplicité de la numération décimale.'
					}
				],
				themeSummary: 'le rayonnement intellectuel de Béjaïa et la diffusion des chiffres modernes'
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
						: '1) Dites si les énoncés suivants sont Vrais ou Faux :'
			},
			{ type: 'true_false', items: variant.tfItems },
			{
				type: 'text',
				content: `2) Répondez aux questions suivantes à partir du texte :\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) Précisez à quoi renvoient les expressions soulignées dans le texte :\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word} : ${variant.ref1Ans}\nb) ${variant.ref2Word} : ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Cochez la visée communicative exacte de l’auteur :',
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après la lecture de « ${variant.title} », quelle est la visée principale du texte ?`,
				questionTextAr: 'اختر الغاية التواصلية الصحيحة لهذا النص الوثائقي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `L’auteur informe de manière documentée sur ${variant.themeSummary}.`
			},
			sujetExercise: {
				customTitle: 'I. Compréhension de l’écrit',
				points: 7,
				instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions :',
				content
			},
			hints: [
				'استخرج التواريخ والأسماء العلمية بدقة كما وردت في النص دون خلط.',
				'لاحظ التعويضات المعجمية (cette institution, ce foyer intellectuel, cette cité savante) للربط بين الفقرات.',
				'تذكّر أن النصوص الثقافية العلمية في المشروع الأول تهدف إلى الإعلام والشرح.'
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

// 3. Fonctionnement de la langue 1 — Objectivité vs Subjectivité, Substitution & Famille de mots (6 pts — TCL!)
const tpl1asTclT1ObjectiviteSubLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t1_objectivite_sub_lang',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — الموضوعية مقابل الذاتية، التعويض المعجمي والنحوي، وعائلة الكلمة',
	curriculumLessonId: 'fre_lesson_1as_tcl_t1_objectivite_subjectivite',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wfRows: [
					{
						verbe: { given: true, value: 'restaurer' },
						nom: { value: 'restauration', mark: '0.5' },
						adjectif: { value: 'restauré(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'édifier', mark: '0.5' },
						nom: { given: true, value: 'édification / édifice' },
						adjectif: { value: 'édifiant(e) / édifié(e)', mark: '0.5' }
					}
				],
				objPrompt:
					'Classez ou identifiez le caractère (objectif ou subjectif) de chaque phrase en relevant un indice :\na) « La Grande Mosquée de Tlemcen a été édifiée en 1082. »\nb) « À mon avis, cette coupole splendide est le plus merveilleux décor du monde ! »',
				objAns:
					'a) Objective (voix passive, date exacte, absence de « je »).\nb) Subjective (expression d’opinion « À mon avis », lexique mélioratif « splendide / merveilleux », point d’exclamation).',
				subPrompt:
					'Évitez les répétitions grâce à un substitut lexical (1re phrase) puis grammatical (2e phrase) :\na) Constantine conserve des bibliothèques anciennes ; (Constantine) attire les historiens.\nb) Les chercheurs consultent ces manuscrits rares ; ils prennent grand soin (de ces manuscrits rares).',
				subAns:
					'a) Constantine conserve des bibliothèques anciennes ; la ville des ponts (ou cette cité historique) attire les historiens.\nb) Les chercheurs consultent ces manuscrits rares ; ils en prennent grand soin.',
				mcqQuestion: 'Quelle phrase est totalement objective et convient à un texte documentaire sur le patrimoine ?',
				mcqCorrect: 'La Casbah d’Alger a été inscrite au patrimoine mondial en 1992.',
				mcqDistractors: [
					{
						text: 'Je trouve que la Casbah d’Alger est absolument fascinante !',
						diagnosticFeedback: 'Présence explicite de « Je », d’un adjectif subjectif et d’un point d’exclamation.'
					},
					{
						text: 'Quel chef-d’œuvre éblouissant et incomparable !',
						diagnosticFeedback: 'Subjectivité implicite forte (lexique mélioratif et phrase exclamative).'
					},
					{
						text: 'Nous devons tous adorer cette merveilleuse citadelle.',
						diagnosticFeedback: 'Présence de « Nous », d’obligation personnelle et d’adjectif subjectif.'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'traduire' },
						nom: { value: 'traduction', mark: '0.5' },
						adjectif: { value: 'traduisible / traduit(e)', mark: '0.5' }
					},
					{
						verbe: { value: 'transmettre', mark: '0.5' },
						nom: { given: true, value: 'transmission' },
						adjectif: { value: 'transmissible / transmis(e)', mark: '0.5' }
					}
				],
				objPrompt:
					'Transformez ces deux phrases subjectives en phrases objectives de style documentaire :\na) « Je trouve qu’Al-Khwarizmi a écrit un livre formidable sur l’algèbre ! »\nb) « Nous admirons beaucoup les cinq cités sublimes du M’Zab. »',
				objAns:
					'a) Al-Khwarizmi a rédigé au IXe siècle un traité fondamental qui a fondé l’algèbre.\nb) La Vallée du M’Zab réunit cinq cités fortifiées classées au patrimoine mondial.',
				subPrompt:
					'Complétez avec le substitut grammatical qui convient (y, en, celui-ci) :\na) Al-Idrisi a dessiné une carte du monde ; .......... a servi aux géographes pendant des siècles. (utilisez « celle-ci »)\nb) Les étudiants se rendaient à la bibliothèque de Béjaïa et ils .......... recopiaient des traités.',
				subAns: 'a) celle-ci   b) y',
				mcqQuestion: 'Dans la phrase : « La ville des ponts suspendus abrite des archives précieuses », quel type de substitut représente « La ville des ponts suspendus » ?',
				mcqCorrect: 'Une périphrase (substitut lexical)',
				mcqDistractors: [
					{
						text: 'Un pronom personnel (substitut grammatical)',
						diagnosticFeedback: 'Il s’agit d’un groupe nominal descriptif, non d’un pronom.'
					},
					{
						text: 'Un connecteur logique de conséquence',
						diagnosticFeedback: 'Ce groupe nominal sert de sujet, non de connecteur.'
					},
					{
						text: 'Un procédé de reformulation',
						diagnosticFeedback: 'Il n’y a ni « c’est-à-dire » ni « autrement dit ».'
					}
				]
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'conserver' },
						nom: { value: 'conservation', mark: '0.5' },
						adjectif: { value: 'conservé(e) / conservateur', mark: '0.5' }
					},
					{
						verbe: { value: 'enseigner', mark: '0.5' },
						nom: { given: true, value: 'enseignement' },
						adjectif: { value: 'enseignant(e)', mark: '0.5' }
					}
				],
				objPrompt:
					'Indiquez si la subjectivité est explicite, implicite ou absente (objectivité) dans chaque phrase :\na) « Ce traité d’optique est un véritable trésor éblouissant ! »\nb) « Il existe dans les oasis du Sud plusieurs bibliothèques familiales anciennes. »',
				objAns:
					'a) Subjectivité implicite (lexique mélioratif « trésor éblouissant » + exclamation, sans « je »).\nb) Objectivité (tournure impersonnelle « Il existe », lexique neutre, phrase déclarative).',
				subPrompt:
					'Remplacez les groupes entre parenthèses par un pronom ou un hyperonyme adapté :\na) Les bibliothèques conservaient le papyrus, le parchemin et le papier ; (remplacez ces trois éléments par un hyperonyme) ont permis de transmettre les livres.\nb) Les historiens s’intéressent à l’architecture du M’Zab et ils (remplacez « à l’architecture » par un pronom) consacrent de nombreuses études.',
				subAns: 'a) ces supports d’écriture   b) y',
				mcqQuestion: 'Quel pronom complète correctement : « Les chercheurs étudient les manuscrits de Tlemcen et .......... publient un catalogue complet. » ?',
				mcqCorrect: 'en',
				mcqDistractors: [
					{
						text: 'y',
						diagnosticFeedback: 'On publie un catalogue « de » ces manuscrits : « de + nom » se remplace par « en ».'
					},
					{
						text: 'lui',
						diagnosticFeedback: '« lui » s’emploie pour une personne au singulier.'
					},
					{
						text: 'celui-ci',
						diagnosticFeedback: '« les manuscrits » est pluriel et le complément exige « de ».'
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
				content: `2) ${variant.objPrompt} (2.0 pts)`,
				answer: variant.objAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) ${variant.subPrompt} (2.0 pts)`,
				answer: variant.subAns,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة حول الموضوعية والتعويض اللغوي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Le texte documentaire privilégie l’objectivité (absence de jugement subjectif) et assure sa cohésion par des substituts grammaticaux et lexicaux variés.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les exercices suivants de lexique, d’énonciation et de substitution :',
				content
			},
			hints: [
				'الذاتية قد تكون صريحة (je/nous) أو ضمنية عبر الصفات التقييمية (splendide/merveilleux) وعلامة التعجب (!).',
				'الضمير « en » يعوّض المسبوق بـ de، والضمير « y » يعوّض المكان أو غير العاقل المسبوق بـ à.',
				'الكناية الوصفية (périphrase) والاسم الشامل (hyperonyme) من أهم وسائل التعويض المعجمي في شعبة الآداب.'
			],
			solutionStepsAr: [
				`Objectivité / Subjectivité : ${variant.objAns}`,
				`Substitution : ${variant.subAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Fonctionnement de la langue 2 — Phrase complexe (juxtaposition, coordination, subordination) & Champ lexical culturel (6 pts — TCL!)
const tpl1asTclT1PhraseComplexeLang: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t1_phrase_complexe_lang',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة — الجملة المركبة (التجاور، العطف، التبعية) والحقل المعجمي الثقافي',
	curriculumLessonId: 'fre_lesson_1as_tcl_t1_phrase_complexe',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				classifyBank: ['minaret', 'coupole', 'parchemin', 'manuscrit', 'arcade', 'calligraphe'],
				classifyCols: [
					{ header: 'Champ lexical de l’architecture', items: ['minaret', 'coupole', 'arcade'], mark: '0.75' },
					{ header: 'Champ lexical du livre ancien', items: ['parchemin', 'manuscrit', 'calligraphe'], mark: '0.75' }
				],
				linkPrompt:
					'Précisez le moyen de liaison utilisé dans chaque phrase complexe (juxtaposition, coordination ou subordination) :\na) « Les artisans construisaient en pierre locale ; ils blanchissaient les façades à la chaux. »\nb) « Le papier coûtait moins cher que le parchemin, donc les bibliothèques se sont développées. »\nc) « Ibn Al-Haytham a écrit un livre qui a renouvelé l’étude de la lumière. »',
				linkAns: 'a) Juxtaposition (point-virgule)   b) Coordination (donc)   c) Subordination (pronom relatif « qui »)',
				subTypePrompt:
					'Distinguerez-vous une subordonnée relative d’une subordonnée complétive ? Identifiez la nature de la proposition introduite par « que » :\na) « Les historiens prouvent que Béjaïa fut un foyer scientifique majeur. »\nb) « Le traité que les étudiants recopiaient datait du Xe siècle. »',
				subTypeAns:
					'a) Subordonnée complétive (complète le verbe « prouvent »).\nb) Subordonnée relative (complète le nom antécédent « Le traité »).',
				mcqQuestion: 'Dans la phrase : « Les manuscrits sont protégés dans des salles climatisées car l’humidité abîme le papier », comment les deux propositions sont-elles reliées ?',
				mcqCorrect: 'Par coordination (conjonction « car »)',
				mcqDistractors: [
					{
						text: 'Par juxtaposition',
						diagnosticFeedback: 'La juxtaposition emploie uniquement une ponctuation (, ; :) sans mot de liaison.'
					},
					{
						text: 'Par subordination relative',
						diagnosticFeedback: 'Il n’y a aucun pronom relatif (qui, que, dont, où) ici.'
					},
					{
						text: 'C’est une phrase simple à un seul verbe',
						diagnosticFeedback: 'La phrase contient deux verbes conjugués : sont protégés et abîme.'
					}
				]
			},
			{
				classifyBank: ['algèbre', 'astrolabe', 'citadelle', 'ruelle', 'algorithme', 'fontaine'],
				classifyCols: [
					{ header: 'Champ lexical des sciences', items: ['algèbre', 'astrolabe', 'algorithme'], mark: '0.75' },
					{ header: 'Champ lexical de la cité ancienne', items: ['citadelle', 'ruelle', 'fontaine'], mark: '0.75' }
				],
				linkPrompt:
					'Indiquez si les propositions de chaque phrase sont reliées par juxtaposition, coordination ou subordination :\na) « Fatima Al-Fihriya fonda Al-Qarawiyyin et elle encouragea l’étude des sciences. »\nb) « Ce monument reste solide parce que les bâtisseurs ont choisi des matériaux durables. »\nc) « Le ksar domine la vallée, la palmeraie s’étend en contrebas. »',
				linkAns: 'a) Coordination (et)   b) Subordination (parce que)   c) Juxtaposition (virgule)',
				subTypePrompt:
					'Transformez ces deux phrases simples en une seule phrase complexe selon la consigne :\na) La bibliothèque conserve des ouvrages rares. Ces ouvrages datent du XIVe siècle. (Subordination relative avec « qui »)\nb) Le M’Zab attire les architectes. Son urbanisme respecte le climat. (Coordination avec « car »)',
				subTypeAns:
					'a) La bibliothèque conserve des ouvrages rares qui datent du XIVe siècle.\nb) Le M’Zab attire les architectes car son urbanisme respecte le climat.',
				mcqQuestion: 'Quelle phrase contient une proposition subordonnée complétive (et non relative) ?',
				mcqCorrect: 'Les spécialistes confirment que cette mosquée date du XIe siècle.',
				mcqDistractors: [
					{
						text: 'La mosquée que visitent les historiens date du XIe siècle.',
						diagnosticFeedback: 'Ici « que » suit le nom « La mosquée » : c’est une subordonnée relative.'
					},
					{
						text: 'Les historiens observent le minaret qui domine la cour.',
						diagnosticFeedback: '« qui domine la cour » complète le nom « le minaret » : subordonnée relative.'
					},
					{
						text: 'Le minaret est ancien, il est bâti en brique cuite.',
						diagnosticFeedback: 'Les deux propositions sont simplement juxtaposées.'
					}
				]
			},
			{
				classifyBank: ['copiste', 'enluminure', 'savant', 'géographie', 'reliure', 'astronomie'],
				classifyCols: [
					{ header: 'Arts du livre et manuscrit', items: ['copiste', 'enluminure', 'reliure'], mark: '0.75' },
					{ header: 'Savoirs et sciences', items: ['savant', 'géographie', 'astronomie'], mark: '0.75' }
				],
				linkPrompt:
					'Analysez la liaison dans chaque phrase complexe (juxtaposition, coordination, subordination) :\na) « Al-Birouni observait les étoiles : il mesurait aussi la circonférence de la Terre. »\nb) « On restaure les murs anciens afin que le patrimoine survive aux siècles. »\nc) « Le parchemin était solide, mais il coûtait très cher. »',
				linkAns: 'a) Juxtaposition (deux points)   b) Subordination (afin que)   c) Coordination (mais)',
				subTypePrompt:
					'Indiquez si la phrase est simple (1 verbe conjugué) ou complexe (2 verbes conjugués ou plus) :\na) « Grâce aux bibliothèques anciennes de Tlemcen et de Béjaïa, de précieux traités de médecine ont traversé les siècles. »\nb) « Le calligraphe taille son roseau puis trace chaque lettre avec patience. »',
				subTypeAns:
					'a) Phrase simple (un seul verbe conjugué : « ont traversé »).\nb) Phrase complexe par coordination (deux verbes conjugués : « taille » et « trace »).',
				mcqQuestion: 'Parmi les mots suivants, lequel est une conjonction de coordination (et non de subordination) ?',
				mcqCorrect: 'car',
				mcqDistractors: [
					{
						text: 'parce que',
						diagnosticFeedback: '« parce que » est une locution conjonctive de subordination.'
					},
					{
						text: 'bien que',
						diagnosticFeedback: '« bien que » introduit une proposition subordonnée.'
					},
					{
						text: 'lorsque',
						diagnosticFeedback: '« lorsque » est une conjonction de subordination temporelle.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledBank = rng.shuffle(variant.classifyBank);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Classez les mots suivants dans le tableau de champs lexicaux ci-dessous (1.5 pts) :\n${shuffledBank.join('  -  ')}`
			},
			buildFrenchClassificationTableBlock({ columns: variant.classifyCols }),
			{
				type: 'text',
				content: `2) ${variant.linkPrompt} (2.5 pts)`,
				answer: variant.linkAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.subTypePrompt} (2.0 pts)`,
				answer: variant.subTypeAns,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة السليمة حول الجملة المركبة وطرق الربط:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'La juxtaposition utilise la ponctuation (, ; :), la coordination emploie « mais, ou, et, donc, or, ni, car », et la subordination lie une subordonnée à une principale.'
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue',
				points: 6,
				instruction: 'Répondez aux exercices suivants sur les champs lexicaux et la phrase complexe :',
				content
			},
			hints: [
				'احفظ حروف العطف السبعة (mais, ou, et, donc, or, ni, car): فهي تدل دائما على العطف (coordination) وليس التبعية.',
				'الفاصلة (,) والفاصلة المنقوطة (;) والنقطتان (:) بين جملتين فعليتين تدل على التجاور (juxtaposition).',
				'تذكّر: « que » بعد اسم = موصولية (relative)، و« que » بعد فعل = تكميلية (complétive).'
			],
			solutionStepsAr: [
				`Champs lexicaux : ${variant.classifyCols.map((c) => `${c.header} : ${c.items.join(', ')}`).join(' | ')}`,
				`Liaisons : ${variant.linkAns}`,
				`Analyse : ${variant.subTypeAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. Production écrite — Compte rendu objectif / Résumé ou Texte documentaire culturel (7 pts — TCL!)
const tpl1asTclT1CompteRenduResumeWe: FrenchParameterizedTemplate = {
	id: 'fre_tpl_1as_tcl_t1_compte_rendu_resume_we',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية — التقرير الموضوعي / التلخيص أو تحرير نص وثائقي عن التراث والعلوم الإسلامية',
	curriculumLessonId: 'fre_lesson_1as_tcl_t1_resume_compte_rendu',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sujetUnPrompt:
					'À l’occasion de la journée culturelle de votre lycée, rédigez le compte rendu objectif (10 à 12 lignes) d’un texte documentaire intitulé « La Casbah d’Alger : une architecture adaptée au climat et à la vie sociale » (extrait des Cahiers du Patrimoine Algérien).',
				sujetUnNotes: [
					'Construisez une accroche complète précisant le type de texte, le titre, la source, le thème et la visée informative.',
					'Reformulez fidèlement les idées principales (définition historique, ingéniosité climatique des ruelles et de la cour intérieure, richesse monumentale et restauration).',
					'Écrivez au présent de l’indicatif et à la 3e personne (L’auteur définit, explique, souligne...) sans donner d’avis personnel.',
					'Utilisez des substituts variés et des phrases complexes bien articulées.'
				],
				sujetDeuxPrompt:
					'Rédigez un texte documentaire objectif (12 à 15 lignes) présentant un monument algérien ou un savant musulman de votre choix (par exemple la Vallée du M’Zab, la Grande Mosquée de Tlemcen, Ibn Khaldoun ou Al-Khwarizmi). Intégrez au moins deux procédés explicatifs et respectez la neutralité.',
				modelAnswer:
					'Ce texte documentaire explicatif, intitulé « La Casbah d’Alger : une architecture adaptée au climat et à la vie sociale » et extrait des Cahiers du Patrimoine Algérien, présente les caractéristiques urbaines et patrimoniales de la vieille cité d’Alger. L’auteur vise à informer le lecteur sur la valeur historique et l’ingéniosité architecturale de ce site.\nD’abord, il situe la Casbah, classée au patrimoine mondial en 1992, et explique l’origine de son nom. Ensuite, il montre comment l’architecture traditionnelle répond intelligemment aux contraintes climatiques et sociales grâce aux ruelles ombragées et à la cour intérieure qui favorise la lumière, l’aération et l’intimité. Enfin, il rappelle la diversité des édifices anciens qu’elle abrite et souligne les efforts actuels de restauration destinés à préserver ce patrimoine pour les générations futures.',
				rubricSummary:
					'Accroche complète et respect de la méthode du compte rendu (2.0 pts), Fidélité au sens et reformulation personnelle sans subjectivité (2.0 pts), Cohérence, connecteurs et progression (1.5 pts), Correction syntaxique et orthographique (1.5 pts).',
				mcqQuestion: 'Quelle différence essentielle distingue le résumé du compte rendu objectif ?',
				mcqCorrect: 'Le compte rendu comporte une accroche et dit « L’auteur explique... », tandis que le résumé condense le texte directement sans mentionner l’auteur',
				mcqDistractors: [
					{
						text: 'Le résumé contient obligatoirement l’avis personnel de l’élève en conclusion',
						diagnosticFeedback: 'Ni le résumé ni le compte rendu objectif ne contiennent d’avis personnel.'
					},
					{
						text: 'Le compte rendu doit être plus long que le texte original',
						diagnosticFeedback: 'Le compte rendu condense le texte à environ un tiers de sa longueur.'
					},
					{
						text: 'Le résumé s’écrit toujours sous forme de lettre ouverte',
						diagnosticFeedback: 'Le résumé suit simplement le fil du texte original.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Rédigez le compte rendu objectif (10 à 12 lignes) d’un article culturel intitulé « Fatima Al-Fihriya et la fondation de la bibliothèque d’Al-Qarawiyyin » (extrait de la Revue d’Histoire des Bibliothèques du Monde Musulman) pour la revue murale de votre lycée.',
				sujetUnNotes: [
					'Rédigez une introduction (accroche) présentant l’identité complète du texte et sa visée.',
					'Synthétisez les idées clés en évitant les détails secondaires : fondation en 859, diversité des disciplines enseignées, richesse des manuscrits et restauration actuelle.',
					'Employez un style neutre au présent (Dans un premier temps, l’auteur rappelle... Ensuite, il précise... Enfin, il conclut...).',
					'Veillez à la correction des accords et à l’absence totale de recopiage littéral.'
				],
				sujetDeuxPrompt:
					'Rédigez un texte explicatif objectif (12 à 15 lignes) sur le rôle du livre et des bibliothèques dans la préservation du savoir à travers l’histoire. Employez une définition, une énumération, une tournure impersonnelle et une phrase complexe.',
				modelAnswer:
					'Ce texte documentaire, intitulé « Fatima Al-Fihriya et la fondation de la bibliothèque d’Al-Qarawiyyin » et paru dans la Revue d’Histoire des Bibliothèques du Monde Musulman, retrace l’histoire d’un centre universitaire emblématique fondé au IXe siècle. L’auteur vise à informer le lecteur sur l’importance du livre et des institutions éducatives dans la civilisation islamique.\nDans un premier temps, il rappelle que Fatima Al-Fihriya a consacré sa fortune personnelle en 859 à bâtir Al-Qarawiyyin à Fès, considérée comme la plus ancienne université encore active. Ensuite, il met en évidence la richesse de son enseignement multidisciplinaire, sa fréquentation par d’illustres savants et la valeur des milliers de manuscrits de sa bibliothèque. Enfin, il souligne que les restaurations récentes permettent aux chercheurs modernes de continuer à exploiter ce patrimoine documentaire.',
				rubricSummary:
					'Présentation complète dans l’accroche (2.0 pts), Pertinence de la condensation et reformulation (2.0 pts), Articulation logique et substituts (1.5 pts), Maîtrise de la langue et de l’orthographe (1.5 pts).',
				mcqQuestion: 'Comment résumer efficacement l’énumération « mosquées, palais, fontaines et remparts » dans un compte rendu ?',
				mcqCorrect: 'Par un hyperonyme concis tel que « divers édifices historiques »',
				mcqDistractors: [
					{
						text: 'En recopiant toute la liste et en ajoutant trois autres bâtiments',
						diagnosticFeedback: 'On condense au lieu d’allonger ou d’inventer.'
					},
					{
						text: 'En supprimant complètement toute mention du patrimoine',
						diagnosticFeedback: 'Il faut conserver l’idée essentielle sous une forme condensée.'
					},
					{
						text: 'En ajoutant « Je trouve ces monuments magnifiques ! »',
						diagnosticFeedback: 'Tout jugement subjectif est interdit dans un compte rendu objectif.'
					}
				]
			},
			{
				sujetUnPrompt:
					'Faites le compte rendu objectif (10 à 12 lignes) d’un texte de vulgarisation intitulé « Al-Khwarizmi : de la Maison de la Sagesse à la naissance de l’algèbre » (Cahiers de l’Histoire des Sciences et des Lettres) afin de le présenter dans le dossier de votre classe de 1AS TCL.',
				sujetUnNotes: [
					'Introduisez clairement le texte (type, titre, source, thème et visée explicative).',
					'Condensez les trois axes : cadre intellectuel de Bayt al-Hikma, naissance et utilité pratique de l’algèbre, origine du mot algorithme et rayonnement universel du savoir.',
					'Reformulez avec précision au présent de l’indicatif et à la troisième personne.',
					'N’ajoutez aucune appréciation personnelle et soignez la ponctuation.'
				],
				sujetDeuxPrompt:
					'Écrivez un texte documentaire objectif (12 à 15 lignes) expliquant l’apport d’un savant musulman (Ibn Al-Haytham, Ibn Battouta, Al-Idrisi ou Al-Zahrawi) à la connaissance humaine. Utilisez au moins trois procédés explicatifs.',
				modelAnswer:
					'Ce texte de vulgarisation culturelle et scientifique, intitulé « Al-Khwarizmi : de la Maison de la Sagesse à la naissance de l’algèbre » et extrait des Cahiers de l’Histoire des Sciences et des Lettres, présente l’œuvre majeure d’un grand savant du IXe siècle. Son auteur vise à informer le lecteur sur l’héritage scientifique d’Al-Khwarizmi.\nTout d’abord, il situe les travaux du mathématicien au sein de Bayt al-Hikma à Bagdad, célèbre centre de recherche et de traduction. Ensuite, il explique comment son traité fondateur a donné son nom à l’algèbre en proposant des méthodes méthodiques destinées à résoudre des problèmes pratiques variés. Enfin, il rappelle que le terme actuel d’algorithme dérive du nom même du savant, illustrant ainsi le rôle des livres dans le progrès scientifique universel.',
				rubricSummary:
					'Respect de la structure du compte rendu objectif (2.0 pts), Fidélité aux idées et reformulation personnelle (2.0 pts), Emploi de connecteurs et cohésion (1.5 pts), Correction linguistique et orthographe (1.5 pts).',
				mcqQuestion: 'Quelle proportion de longueur est généralement recommandée pour un résumé par rapport au texte source ?',
				mcqCorrect: 'Environ le quart (25 %) de la longueur du texte original',
				mcqDistractors: [
					{
						text: 'La même longueur exacte que le texte original',
						diagnosticFeedback: 'Un résumé doit impérativement condenser le texte.'
					},
					{
						text: 'Le double du texte original pour ajouter des commentaires',
						diagnosticFeedback: 'Le résumé réduit le texte sans jamais ajouter de commentaires personnels.'
					},
					{
						text: 'Une seule phrase de cinq mots',
						diagnosticFeedback: 'Un résumé doit reprendre fidèlement l’ensemble des idées essentielles.'
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
				mark: '7'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر القاعدة المنهجية السليمة للتلخيص والتقرير الموضوعي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'Le compte rendu objectif comporte une accroche complète et reformule à la 3e personne au présent ; le résumé condense directement au quart sans mentionner l’auteur.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets proposés avec méthode, clarté et objectivité :',
				content
			},
			hints: [
				'في شعبة الآداب، التعبير الكتابي على 7 نقاط كاملة: احرص على تقسيم النص إلى فقرتين واضحتين (Accroche + Condensation).',
				'استخدم تقنية الاسم الجامع (hyperonyme) لاختصار التعدادات الطويلة وتجنب نسخ جمل النص الأصلية.',
				'تحقق من خلو التقرير الموضوعي من أي رأي شخصي أو ضمير متكلم (je).'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T1: FrenchParameterizedTemplate[] = [
	tpl1asTclT1PatrimoineComp,
	tpl1asTclT1ScienceIslamiqueComp,
	tpl1asTclT1ObjectiviteSubLang,
	tpl1asTclT1PhraseComplexeLang,
	tpl1asTclT1CompteRenduResumeWe
];
