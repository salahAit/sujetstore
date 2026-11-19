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
// Template 1 : Compréhension de l'écrit (07 pts) — Casbah, Tlemcen & Constantine
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT3CasbahTlemcen: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t3_comp_casbah_tlemcen',
	grade: '2am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (1): قصص التراث من القصبة وتلمسان وقسنطينة (Casbah, Tlemcen, Constantine)',
	curriculumLessonId: 'fre_lesson_2am_t3_subordonnee_relative',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'La Casbah d’Alger, joyau de notre mémoire',
				source: 'Récit patrimonial algérien adapté — Projet 3 (2AM)',
				paragraphs: [
					'Pendant les vacances de printemps, mon grand-père nous a emmenés visiter la Casbah d’Alger, cette cité historique [[magnifique]] qui surplombe la mer Méditerranée. Dès notre entrée dans les ruelles étroites, les maisons blanches aux portes en bois sculpté brillaient sous la lumière du matin.',
					'Mon grand-père nous a montré les anciennes fontaines et les ateliers où travaillent encore des artisans habiles. Nous avons admiré le palais historique que les bâtisseurs avaient orné de faïences raffinées. Les histoires courageuses que notre aïeul a racontées nous ont profondément émus : la Casbah reste un ((chef-d’œuvre)) précieux que chaque Algérien doit préserver.'
				],
				glossary: [
					{ term: 'surplombe', meaning: 'se trouve en hauteur au-dessus de' },
					{ term: 'faïences', meaning: 'carreaux de céramique décorés qui ornent les murs' }
				],
				qcmHeader: '1) Quel site patrimonial la famille a-t-elle visité pendant les vacances ?',
				qcmOptions: ['La Casbah d’Alger', 'Les dunes du Hoggar', 'Le port d’Annaba'],
				qcmCorrect: 'La Casbah d’Alger',
				tf: [
					{ q: 'La Casbah d’Alger surplombe la mer Méditerranée.', a: 'Vrai', mark: '1' },
					{ q: 'Il n’existe plus aucun artisan dans les ruelles de la Casbah.', a: 'Faux', c: 'Des artisans habiles travaillent encore dans leurs ateliers.', mark: '1' },
					{ q: 'Les histoires racontées par le grand-père ont ému la famille.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes d’après le texte (02 pts) :\n\na) Quels éléments architecturaux de la Casbah sont décrits dans le texte ? Cite-en deux.\n\nb) Relève une proposition subordonnée relative introduite par « où ».',
				compA: 'a) Les ruelles étroites, les maisons blanches aux portes en bois sculpté, les anciennes fontaines et le palais orné de faïences (deux au choix).\n\nb) « où travaillent encore des artisans habiles ».',
				lexQ: '4) Observe le texte puis réponds (01 pt) :\n\na) Relève deux mots appartenant au lexique mélioratif (valorisant).\n\nb) Explique l’accord du participe passé « racontées » dans le deuxième paragraphe.',
				lexA: 'a) « magnifique », « habiles », « raffinées », « chef-d’œuvre » ou « précieux » (deux au choix).\n\nb) Il s’accorde au féminin pluriel avec le COD « que » (= Les histoires courageuses) placé avant le verbe.',
				quizQ: 'Dans le texte « La Casbah d’Alger, joyau de notre mémoire », quel pronom relatif introduit la proposition qui remplace un lieu ?',
				correctOpt: 'où (dans « les ateliers où travaillent encore des artisans habiles »)',
				distractors: [
					{ text: 'qui', diagnosticFeedback: '« qui » remplace un sujet, pas un complément de lieu.' },
					{ text: 'que', diagnosticFeedback: '« que » remplace un complément d’objet direct (COD).' },
					{ text: 'cette', diagnosticFeedback: '« cette » est un déterminant démonstratif.' }
				]
			},
			{
				title: 'La Grande Mosquée de Tlemcen et ses artisans',
				source: 'Récit patrimonial algérien adapté — Histoire et architecture (2AM)',
				paragraphs: [
					'Autrefois, au XIe siècle, les bâtisseurs fondèrent la Grande Mosquée de Tlemcen, un monument [[majestueux]] qui témoigne encore aujourd’hui du génie de la civilisation islamique en Algérie. Ses arches élégantes, sa cour lumineuse et son minaret élevé impressionnaient tous les voyageurs venus des quatre coins du pays.',
					'L’an dernier, notre classe est partie en sortie éducative dans cette cité prestigieuse où se transmettent des savoir-faire séculaires comme la broderie et la poterie. Les sculptures fines que nous avons observées sous la coupole nous ont émerveillés. Tlemcen mérite vraiment son surnom de ((perle du Maghreb)).'
				],
				glossary: [
					{ term: 'séculaires', meaning: 'qui existent depuis plusieurs siècles' },
					{ term: 'coupole', meaning: 'toit arrondi en forme de voûte' }
				],
				qcmHeader: '1) À quel siècle fut fondée la Grande Mosquée de Tlemcen selon le texte ?',
				qcmOptions: ['Au XIe siècle', 'Au XXIe siècle', 'Au IIIe siècle'],
				qcmCorrect: 'Au XIe siècle',
				tf: [
					{ q: 'La Grande Mosquée de Tlemcen possède des arches élégantes et une cour lumineuse.', a: 'Vrai', mark: '1' },
					{ q: 'La broderie et la poterie font partie des savoir-faire de Tlemcen.', a: 'Vrai', mark: '1' },
					{ q: 'Les élèves ont été déçus par les sculptures sous la coupole.', a: 'Faux', c: 'Les sculptures fines les ont émerveillés.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quel surnom valorisant donne-t-on à la ville de Tlemcen à la fin du texte ?\n\nb) Relève dans le premier paragraphe un verbe au passé simple et un verbe à l’imparfait.',
				compA: 'a) « Perle du Maghreb ».\n\nb) Passé simple : « fondèrent » ; Imparfait : « impressionnaient ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Une proposition subordonnée relative introduite par « que ».\n\nb) Deux adjectifs mélioratifs.',
				lexA: 'a) « que nous avons observées sous la coupole ».\n\nb) « majestueux », « élégantes », « lumineuse », « prestigieuse » ou « fines » (deux au choix).',
				quizQ: 'Pourquoi « observées » prend-il « -es » dans « Les sculptures fines que nous avons observées » ?',
				correctOpt: 'Parce que le COD « que » (Les sculptures fines, fém. pl.) est placé avant le verbe avec « avoir »',
				distractors: [
					{ text: 'Parce que le sujet « nous » est féminin pluriel', diagnosticFeedback: 'Avec l’auxiliaire « avoir », le participe passé ne s’accorde jamais avec le sujet.' },
					{ text: 'Parce qu’il est conjugué avec « être »', diagnosticFeedback: 'L’auxiliaire utilisé ici est « avons » (avoir).' },
					{ text: 'Parce que c’est un adverbe', diagnosticFeedback: '« observées » est un participe passé.' }
				]
			},
			{
				title: 'Les ponts célèbres de Constantine',
				source: 'Récit patrimonial algérien adapté — Villes historiques (2AM)',
				paragraphs: [
					'Pendant les vacances d’automne, ma famille et moi sommes arrivés à Constantine, la cité [[prestigieuse]] qui se dresse fièrement sur un immense rocher. En bas, les gorges profondes du Rhumel formaient un paysage spectaculaire que les visiteurs contemplaient en silence.',
					'Nous avons traversé à pied le pont suspendu de Sidi M’Cid où le vent frais caressait nos visages. Ensuite, nous avons visité les anciens quartiers où les dinandiers façonnaient le cuivre avec un art remarquable. Les photographies que j’ai prises ce jour-là rappellent la beauté ((exceptionnelle)) de la ville des ponts.'
				],
				glossary: [
					{ term: 'gorges', meaning: 'passage très étroit et profond entre deux rochers' },
					{ term: 'contemplaient', meaning: 'regardaient longuement avec admiration' }
				],
				qcmHeader: '1) Quel surnom désigne Constantine à la fin du texte ?',
				qcmOptions: ['La ville des ponts', 'La cité du désert', 'Le village des oliviers'],
				qcmCorrect: 'La ville des ponts',
				tf: [
					{ q: 'Constantine se dresse sur un immense rocher au-dessus du Rhumel.', a: 'Vrai', mark: '1' },
					{ q: 'La famille a traversé le pont suspendu de Sidi M’Cid à pied.', a: 'Vrai', mark: '1' },
					{ q: 'Les dinandiers de Constantine travaillent le plastique.', a: 'Faux', c: 'Ils façonnaient le cuivre avec un art remarquable.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Quel artisanat traditionnel la famille a-t-elle observé dans les anciens quartiers ?\n\nb) Relève deux verbes conjugués au passé composé dans le texte.',
				compA: 'a) Le travail du cuivre (la dinanderie).\n\nb) « sommes arrivés », « avons traversé », « avons visité » ou « ai prises » (deux au choix).',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) L’antécédent du pronom relatif « que » dans « Les photographies que j’ai prises ».\n\nb) Deux adjectifs du lexique mélioratif.',
				lexA: 'a) « Les photographies ».\n\nb) « prestigieuse », « spectaculaire », « remarquable » ou « exceptionnelle » (deux au choix).',
				quizQ: 'Pourquoi « arrivés » porte-t-il un « s » dans « ma famille et moi sommes arrivés à Constantine » ?',
				correctOpt: 'Parce que le verbe « arriver » se conjugue avec l’auxiliaire « être » et s’accorde avec le sujet pluriel',
				distractors: [
					{ text: 'Parce qu’il y a un COD avant le verbe', diagnosticFeedback: 'Avec « être », le participe passé s’accorde directement avec le sujet.' },
					{ text: 'Parce que « Constantine » est pluriel', diagnosticFeedback: '« Constantine » est un nom propre singulier et un CCL.' },
					{ text: 'Parce que c’est un verbe à l’imparfait', diagnosticFeedback: '« sommes arrivés » est au passé composé.' }
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
			instruction: 'Lis attentivement ce récit patrimonial puis réponds aux questions :',
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
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » et corrige lorsque c’est faux (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
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
				'اقرأ النص وحدّد المعلم التاريخي الجزائري وألفاظ المعجم الإيجابي التي تبرز جماله.',
				'تعرّف على جمل الصلة الموصولة بـ (qui / que / où) وتذكّر مطابقة اسم المفعول مع être ومع que.',
				'فرّق بين الماضي الناقص للوصف والماضي المركّب أو البسيط للأحداث.'
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
// Template 2 : Compréhension de l'écrit (07 pts) — M'Zab, Tassili & Aurès / Kalâa
// ═══════════════════════════════════════════════════════════════════════════════
const comp2amT3MzabTassiliAures: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t3_comp_aures_tassili_mzab',
	grade: '2am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (2): قصص التراث من وادي مزاب والطاسيلي والأوراس (M’Zab, Tassili, Aurès)',
	curriculumLessonId: 'fre_lesson_2am_t3_lexique_melioratif',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'La Vallée du M’Zab, chef-d’œuvre du désert',
				source: 'Récit patrimonial algérien adapté — Ghardaïa (2AM)',
				paragraphs: [
					'Il y a près de mille ans, des bâtisseurs ingénieux fondèrent dans le sud algérien la Vallée du M’Zab, un ensemble [[harmonieux]] de cinq ksour regroupés autour de Ghardaïa. Leurs maisons aux couleurs douces d’ocre, de blanc et de bleu s’étageaient sur la colline pour laisser passer le soleil et l’air frais dans chaque demeure.',
					'Grâce à un système ingénieux de partage des eaux qu’ils avaient inventé, les habitants transformèrent le désert en palmeraies verdoyantes. Aujourd’hui encore, ce ((joyau)) classé au patrimoine mondial émerveille les architectes du monde entier par sa sobriété et son esprit de solidarité.'
				],
				glossary: [
					{ term: 'ksour', meaning: 'villages fortifiés traditionnels du Sahara (singulier : ksar)' },
					{ term: 'sobriété', meaning: 'simplicité élégante sans gaspillage' }
				],
				qcmHeader: '1) De combien de ksour se compose la Vallée du M’Zab ?',
				qcmOptions: ['Cinq ksour', 'Douze ksour', 'Deux ksour'],
				qcmCorrect: 'Cinq ksour',
				tf: [
					{ q: 'Les maisons du M’Zab sont construites pour laisser passer le soleil et l’air frais.', a: 'Vrai', mark: '1' },
					{ q: 'Les habitants du M’Zab n’avaient aucun système pour gérer l’eau.', a: 'Faux', c: 'Ils avaient inventé un système ingénieux de partage des eaux.', mark: '1' },
					{ q: 'La Vallée du M’Zab est classée au patrimoine mondial.', a: 'Vrai', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Comment les habitants ont-ils transformé le désert en palmeraies verdoyantes ?\n\nb) Quelles qualités du M’Zab émerveillent les architectes aujourd’hui ?',
				compA: 'a) Grâce à un système ingénieux de partage des eaux.\n\nb) Sa sobriété et son esprit de solidarité.',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux mots du lexique mélioratif dans le deuxième paragraphe.\n\nb) Deux verbes conjugués au passé simple.',
				lexA: 'a) « ingénieux », « verdoyantes », « joyau » ou « émerveille » (deux au choix).\n\nb) « fondèrent » et « transformèrent ».',
				quizQ: 'Dans le texte « La Vallée du M’Zab, chef-d’œuvre du désert », quel mot positif désigne la vallée dans le deuxième paragraphe ?',
				correctOpt: 'ce joyau',
				distractors: [
					{ text: 'le désert', diagnosticFeedback: '« le désert » est un nom géographique neutre.' },
					{ text: 'la colline', diagnosticFeedback: '« la colline » est un relief naturel.' },
					{ text: 'cinq ksour', diagnosticFeedback: 'C’est une précision chiffrée neutre.' }
				]
			},
			{
				title: 'Le Tassili n’Ajjer, musée à ciel ouvert',
				source: 'Récit patrimonial algérien adapté — Sahara algérien (2AM)',
				paragraphs: [
					'Au printemps dernier, un groupe d’élèves passionnés d’histoire est parti vers Djanet pour découvrir le Tassili n’Ajjer, un plateau rocheux [[grandiose]] qui s’étend au sud-est de l’Algérie. Des arches de pierre sculptées par le vent formaient une véritable forêt minérale aux teintes dorées.',
					'Sur les parois des grottes où vivaient autrefois des populations anciennes, les jeunes visiteurs ont contemplé des gravures et des peintures rupestres qui racontent une époque où le Sahara était vert. Les œuvres millénaires qu’ils ont admirées font du Tassili un ((trésor)) unique de l’humanité.'
				],
				glossary: [
					{ term: 'rupestres', meaning: 'gravées ou peintes sur des rochers anciens' },
					{ term: 'millénaires', meaning: 'qui existent depuis plusieurs milliers d’années' }
				],
				qcmHeader: '1) Que racontent les gravures rupestres du Tassili n’Ajjer ?',
				qcmOptions: ['Une époque ancienne où le Sahara était vert', 'La construction des avions modernes', 'Une tempête sur la Méditerranée'],
				qcmCorrect: 'Une époque ancienne où le Sahara était vert',
				tf: [
					{ q: 'Le Tassili n’Ajjer se situe au sud-est de l’Algérie près de Djanet.', a: 'Vrai', mark: '1' },
					{ q: 'Les arches de pierre du Tassili ont été sculptées par le vent.', a: 'Vrai', mark: '1' },
					{ q: 'Les gravures du Tassili datent seulement de l’année dernière.', a: 'Faux', c: 'Ce sont des œuvres millénaires.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Par quelle belle expression l’auteur décrit-il les arches de pierre du Tassili ?\n\nb) Relève une proposition subordonnée relative introduite par « où ».',
				compA: 'a) « une véritable forêt minérale aux teintes dorées ».\n\nb) « où vivaient autrefois des populations anciennes » ou « où le Sahara était vert ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Deux mots du champ lexical du patrimoine historique.\n\nb) Un participe passé accordé avec un COD placé avant le verbe.',
				lexA: 'a) « histoire », « gravures », « peintures rupestres », « œuvres millénaires » ou « trésor » (deux au choix).\n\nb) « admirées » (accordé avec « que » = Les œuvres millénaires).',
				quizQ: 'Dans la phrase « une époque où le Sahara était vert », que remplace le pronom relatif « où » ?',
				correctOpt: 'Un complément circonstanciel de temps (à cette époque)',
				distractors: [
					{ text: 'Un sujet', diagnosticFeedback: 'Le sujet du verbe « était » est « le Sahara ».' },
					{ text: 'Un complément d’objet direct', diagnosticFeedback: 'Le COD serait remplacé par « que ».' },
					{ text: 'Un complément de manière', diagnosticFeedback: '« où » remplace uniquement un lieu ou un temps.' }
				]
			},
			{
				title: 'Les Aurès et la Kalâa des Béni Hammad',
				source: 'Récit patrimonial algérien adapté — Montagnes et citadelles (2AM)',
				paragraphs: [
					'Entre les fières montagnes de l’Aurès et les hauteurs du Hodna à M’Sila, l’histoire de l’Algérie a laissé des vestiges [[remarquables]]. Au XIe siècle, les Hammadites bâtirent la Kalâa des Béni Hammad, une capitale fortifiée qui rayonnait par sa mosquée, ses jardins et ses écoles de savoir.',
					'Lorsque nous sommes montés jusqu’à son grand minaret de pierre, une brise fraîche soufflait sur les sommets silencieux. Les murailles anciennes que nous avons parcourues témoignent encore de la grandeur et du courage de nos ancêtres. Visiter ces lieux est une leçon vivante d’((histoire)) et de fierté.'
				],
				glossary: [
					{ term: 'vestiges', meaning: 'restes d’anciens monuments historiques' },
					{ term: 'rayonnait', meaning: 'brillait par sa réputation et son rayonnement culturel' }
				],
				qcmHeader: '1) Où se situe la Kalâa des Béni Hammad ?',
				qcmOptions: ['Sur les hauteurs du Hodna à M’Sila', 'Sur une île en mer', 'À l’ouest d’Oran'],
				qcmCorrect: 'Sur les hauteurs du Hodna à M’Sila',
				tf: [
					{ q: 'La Kalâa des Béni Hammad fut bâtie au XIe siècle.', a: 'Vrai', mark: '1' },
					{ q: 'Elle possédait une mosquée, des jardins et des écoles de savoir.', a: 'Vrai', mark: '1' },
					{ q: 'Le grand minaret de pierre a totalement disparu aujourd’hui.', a: 'Faux', c: 'Les visiteurs sont montés jusqu’à son grand minaret de pierre.', mark: '1' }
				],
				compQ: '3) Réponds aux questions suivantes (02 pts) :\n\na) Par quoi rayonnait la Kalâa des Béni Hammad au XIe siècle ?\n\nb) Pourquoi le participe passé « parcourues » prend-il « -es » ?',
				compA: 'a) Par sa mosquée, ses jardins et ses écoles de savoir.\n\nb) Parce que le COD « que » (= Les murailles anciennes, fém. pl.) est placé avant le verbe « avons parcourues ».',
				lexQ: '4) Relève dans le texte (01 pt) :\n\na) Un verbe au passé simple dans le premier paragraphe.\n\nb) Deux mots valorisants (mélioratifs).',
				lexA: 'a) « bâtirent ».\n\nb) « fières », « remarquables », « rayonnait », « grandeur » ou « fierté » (deux au choix).',
				quizQ: 'Quelle est la conjugaison correcte au passé composé : « Les visiteuses (monter) ...... jusqu’au minaret de la Kalâa. » ?',
				correctOpt: 'sont montées',
				distractors: [
					{ text: 'ont monté', diagnosticFeedback: 'Sans COD, le verbe « monter » se conjugue avec « être ».' },
					{ text: 'sont monté', diagnosticFeedback: 'Avec « être », le participe passé s’accorde avec le sujet féminin pluriel.' },
					{ text: 'sont montés', diagnosticFeedback: '« Les visiteuses » est au féminin pluriel (-es).' }
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
			instruction: 'Lis attentivement ce récit sur le patrimoine algérien puis réponds aux questions :',
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
				{ type: 'text', content: '2) Réponds par « Vrai » ou « Faux » en justifiant les réponses fausses (03 pts) :' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.compQ, answer: v.compA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
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
				'استخرج الألفاظ الإيجابية (mélioratif) التي تبرز عراقة الموقع التراثي.',
				'انتبه إلى « où » التي تعوّض المكان أو الزمان، وإلى « que » التي تعوّض المفعول المباشر.',
				'راجع سبب مطابقة اسم المفعول (مع être يطابق الفاعل، ومع avoir يطابق COD إذا سبق الفعل).'
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
// Template 3 : Fonctionnement de la langue (06 pts) — Relative (qui, que, où) & Lexique mélioratif
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT3RelativeMelioratif: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t3_expl_relative_melioratif',
	grade: '2am',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'البناء اللغوي (1): جملة الصلة الموصولة (qui, que, où) والمعجم الإيجابي للتراث',
	curriculumLessonId: 'fre_lesson_2am_t3_subordonnee_relative',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Complète chaque phrase avec le pronom relatif qui convient (qui / que / qu’ / où) :\n\n1) La Casbah est une cité historique ...... surplombe la mer.\n\n2) Ghardaïa est la ville ...... s’élèvent les cinq ksour du M’Zab.\n\n3) Le palais ...... nous visitons date du XVIe siècle.\n\n4) Les gravures ...... ils ont admirées au Tassili sont millénaires.',
				ex1A: '1) qui   2) où   3) que   4) qu’',
				ex2Q: 'Exercice 2 (02 pts) : Relie chaque paire de phrases par un pronom relatif (qui / que / où) pour éviter la répétition :\n\n1) Nous visitons la Grande Mosquée de Tlemcen. Cette mosquée possède un minaret majestueux.\n\n2) Voici l’atelier traditionnel. Les artisans y gravent le cuivre.',
				ex2A: '1) Nous visitons la Grande Mosquée de Tlemcen qui possède un minaret majestueux.\n\n2) Voici l’atelier traditionnel où les artisans gravent le cuivre.',
				tableIntro: 'Exercice 3 (02 pts) : Classe les mots suivants dans le tableau (Lexique mélioratif / Champ lexical de l’architecture) :\n\nsplendide — minaret — chef-d’œuvre — arches — magnifique — citadelle',
				melItems: ['splendide', 'chef-d’œuvre', 'magnifique'],
				archItems: ['minaret', 'arches', 'citadelle'],
				quizQ: 'Complète avec le bon pronom relatif : « Le tapis traditionnel ...... ma grand-mère tisse est un véritable chef-d’œuvre. »',
				correctOpt: 'que',
				distractors: [
					{ text: 'qui', diagnosticFeedback: 'Le sujet « ma grand-mère » est déjà présent après le pronom relatif.' },
					{ text: 'où', diagnosticFeedback: 'On tisse quelque chose (COD), pas un lieu.' },
					{ text: 'qu’', diagnosticFeedback: '« ma » commence par une consonne (m), donc on garde « que ».' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Relie les phrases avec (qui / que / où) :\n\n1) Constantine est une ville ancienne. Les ponts suspendus relient ses quartiers dans cette ville.\n\n2) J’ai lu un livre passionnant. Mon professeur m’a conseillé ce livre.',
				ex1A: '1) Constantine est une ville ancienne où les ponts suspendus relient ses quartiers.\n\n2) J’ai lu un livre passionnant que mon professeur m’a conseillé.',
				ex2Q: 'Exercice 2 (02 pts) : Remplace les adjectifs neutres entre parenthèses par des adjectifs mélioratifs accordés (magnifique / majestueux / exceptionnel) :\n\n1) La Kalâa offre une vue (jolie) ...... sur la montagne.\n\n2) Nous avons admiré des arches (grandes) ...... .\n\n3) Le Tassili conserve un patrimoine (bon) ...... .',
				ex2A: '1) magnifique (ou exceptionnelle)   2) majestueuses   3) exceptionnel (ou magnifique)',
				tableIntro: 'Exercice 3 (02 pts) : Classe ces mots selon leur valeur (Mélioratif / Péjoratif) :\n\njoyau — abîmé — authentique — laid — prestigieux — triste',
				melItems: ['joyau', 'authentique', 'prestigieux'],
				archItems: ['abîmé', 'laid', 'triste'],
				col2Header: 'Lexique péjoratif (négatif)',
				quizQ: 'Quelle phrase est correctement écrite sans erreur d’élision ?',
				correctOpt: 'Le Tassili est un plateau qui abrite des gravures qu’Amine a photographiées.',
				distractors: [
					{ text: 'Le Tassili est un plateau qu’abrite des gravures qui Amine a photographiées.', diagnosticFeedback: '« qui » ne s’élide jamais devant une voyelle ; « que » devient « qu’ » devant « Amine ».' },
					{ text: 'Le Tassili est un plateau où abrite des gravures que Amine a photographiées.', diagnosticFeedback: 'Devant le verbe « abrite », il faut le sujet « qui » ; devant « Amine », « qu’ ».' },
					{ text: 'Le Tassili est un plateau qui abrite des gravures où Amine a photographiées.', diagnosticFeedback: '« photographier » demande le COD « qu’ », pas « où ».' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Dans chaque phrase, relève l’antécédent puis la proposition subordonnée relative :\n\n1) Le M’Zab est une vallée qui charme tous les architectes.\n\n2) Les poteries que les artisanes façonnent sont célèbres.',
				ex1A: '1) Antécédent : « une vallée » | PSR : « qui charme tous les architectes ».\n\n2) Antécédent : « Les poteries » | PSR : « que les artisanes façonnent ».',
				ex2Q: 'Exercice 2 (02 pts) : Complète par (qui / que / qu’ / où) :\n\n1) L’Aurès est une région fière ...... se dressent de hauts sommets.\n\n2) Les portes en bois ...... ornent la Casbah sont sculptées.\n\n3) La mosquée ...... elle a dessinée se trouve à Tlemcen.\n\n4) Le guide ...... nous a accompagnés connaît toute l’histoire du site.',
				ex2A: '1) où   2) qui   3) qu’   4) qui',
				tableIntro: 'Exercice 3 (02 pts) : Classe les expressions dans le tableau (Lexique mélioratif / Patrimoine matériel) :\n\nmerveilleux — coupole — émerveiller — fontaine — raffiné — mosaïque',
				melItems: ['merveilleux', 'émerveiller', 'raffiné'],
				archItems: ['coupole', 'fontaine', 'mosaïque'],
				col2Header: 'Patrimoine matériel',
				quizQ: 'Dans « Les ruelles où jouent les enfants de la Casbah », quel est l’antécédent de « où » ?',
				correctOpt: 'Les ruelles',
				distractors: [
					{ text: 'les enfants', diagnosticFeedback: '« les enfants » est le sujet du verbe « jouent » dans la relative.' },
					{ text: 'la Casbah', diagnosticFeedback: 'L’antécédent précède directement le pronom relatif « où ».' },
					{ text: 'jouent', diagnosticFeedback: '« jouent » est un verbe conjugué.' }
				]
			}
		];

		const s = rng.pick(sets);
		const tableBlock = buildFrenchClassificationTableBlock({
			columns: [
				{ header: 'Lexique mélioratif', items: s.melItems, mark: '1' },
				{ header: s.col2Header ?? 'Champ lexical de l’architecture', items: s.archItems, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Fais soigneusement les trois exercices de grammaire et de vocabulaire suivants :',
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
			grade: '2am',
			trimesterId: 't3',
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
				'استعمل « qui » أمام الفعل المباشر (فاعل)، و « que / qu’ » أمام فاعل + فعل (مفعول مباشر)، و « où » للمكان أو الزمان.',
				'تذكّر أن « qui » لا يُختصر أبدا إلى « qu’ ».',
				'المعجم الإيجابي يجمع كل ما يعبّر عن الجمال والقيمة (magnifique, joyau, majestueux, émerveiller).'
			],
			solutionStepsAr: [
				s.ex1A,
				s.ex2A,
				`Mélioratif : ${s.melItems.join(', ')} | Autre colonne : ${s.archItems.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4 : Fonctionnement de la langue (06 pts) — Temps du passé & Accord du participe passé
// ═══════════════════════════════════════════════════════════════════════════════
const expl2amT3TempsAccords: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t3_expl_temps_passe_accords',
	grade: '2am',
	trimesterId: 't3',
	domain: 'orthographe_accords',
	titleAr: 'البناء اللغوي (2): أزمنة الماضي في السرد التراثي ومطابقة اسم المفعول (être / avoir)',
	curriculumLessonId: 'fre_lesson_2am_t3_accord_participe_passe',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue les verbes entre parenthèses à l’imparfait ou au passé composé selon le contexte de la visite :\n\n« L’été dernier, nous (visiter) ...... la Vallée du M’Zab. Les maisons blanches (briller) ...... sur la colline et les habitants (accueillir) ...... les voyageurs avec générosité. Nous (être) ...... émerveillés par ce site. »',
				ex1A: 'avons visité / brillaient / accueillaient (ou ont accueilli) / avons été (ou étions)',
				ex2Q: 'Exercice 2 (02 pts) : Accorde le participe passé entre parenthèses si nécessaire :\n\n1) Les élèves sont (arriver) ...... tôt à la Casbah.\n\n2) Elles ont (admirer) ...... les fontaines anciennes.\n\n3) Les fontaines anciennes qu’elles ont (admirer) ...... sont magnifiques.\n\n4) La citadelle est (rester) ...... solide malgré les siècles.',
				ex2A: '1) arrivés   2) admiré   3) admirées   4) restée',
				ex3Q: 'Exercice 3 (02 pts) : Réécris cette phrase au passé simple (3e personne du pluriel) :\n\n« Autrefois, les bâtisseurs (fonder) ...... la cité, (construire) ...... une mosquée et (creuser) ...... des puits profonds. »',
				ex3A: '« Autrefois, les bâtisseurs fondèrent la cité, construisirent une mosquée et creusèrent des puits profonds. »',
				quizQ: 'Choisis l’accord exact du participe passé : « Les broderies traditionnelles que ma tante a (réaliser) ...... viennent de Tlemcen. »',
				correctOpt: 'réalisées',
				distractors: [
					{ text: 'réalisé', diagnosticFeedback: 'Le COD « que » (= Les broderies traditionnelles, fém. pl.) précède le verbe.' },
					{ text: 'réalisée', diagnosticFeedback: '« Les broderies » est au pluriel, il faut « -es ».' },
					{ text: 'réalisés', diagnosticFeedback: '« broderie » est un nom féminin.' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Mets les verbes au temps qui convient (imparfait ou passé simple) dans ce récit historique :\n\n« Au XIe siècle, la Kalâa des Béni Hammad (être) ...... prospère. Les savants (enseigner) ...... dans ses écoles et les artisans (bâtir) ...... un minaret célèbre qui (traverser) ...... les siècles. »',
				ex1A: 'était / enseignaient / bâtirent / traversa',
				ex2Q: 'Exercice 2 (02 pts) : Complète en accordant correctement le participe passé :\n\n1) Meriem et Hafsa sont (partir) ...... à Tlemcen.\n\n2) Nous avons (prendre) ...... de belles photos.\n\n3) Les belles photos que nous avons (prendre) ...... ornent notre classe.\n\n4) Ces régions sont (devenir) ...... très célèbres.',
				ex2A: '1) parties   2) pris   3) prises   4) devenues',
				ex3Q: 'Exercice 3 (02 pts) : Transforme cette phrase en plaçant le COD devant le verbe avec « que » et fais l’accord :\n\n« Les touristes ont visité la Grande Mosquée. » devient : « La Grande Mosquée que ...... »',
				ex3A: '« La Grande Mosquée que les touristes ont visitée... »',
				quizQ: 'Quelle phrase est sans faute d’accord du participe passé ?',
				correctOpt: 'Les gravures que nous avons vues au Tassili sont restées intactes.',
				distractors: [
					{ text: 'Les gravures que nous avons vu au Tassili sont resté intactes.', diagnosticFeedback: '« vues » s’accorde avec « que » (gravures) et « restées » s’accorde avec le sujet avec « être ».' },
					{ text: 'Nous avons vues les gravures au Tassili.', diagnosticFeedback: 'Ici le COD « les gravures » est après le verbe : « avons vu ».' },
					{ text: 'Les gravures sont restés intactes.', diagnosticFeedback: '« gravures » est féminin pluriel : « restées ».' }
				]
			},
			{
				ex1Q: 'Exercice 1 (02 pts) : Conjugue au passé composé avec l’auxiliaire convenable (être ou avoir) :\n\n1) Ma sœur (descendre) ...... dans la vallée du M’Zab.\n\n2) Les guides (expliquer) ...... l’histoire des ponts de Constantine.\n\n3) Mes cousines (venir) ...... admirer la Casbah.\n\n4) Tu (découvrir) ...... la richesse de notre patrimoine.',
				ex1A: '1) est descendue   2) ont expliqué   3) sont venues   4) as découvert',
				ex2Q: 'Exercice 2 (02 pts) : Justifie brièvement l’orthographe du participe passé souligné entre parenthèses :\n\n1) Elles ont (visité) la Grande Mosquée.\n\n2) La Grande Mosquée qu’elles ont (visitée) est ancienne.',
				ex2A: '1) « visité » reste invariable car l’auxiliaire est « avoir » et le COD est placé après le verbe.\n\n2) « visitée » prend « -e » car le COD « qu’ » (= La Grande Mosquée, fém. sing.) est placé avant le verbe.',
				ex3Q: 'Exercice 3 (02 pts) : Réécris la phrase en remplaçant « Le visiteur » par « Les visiteuses » :\n\n« Le visiteur est entré dans le palais et a admiré les murs sculptés. »',
				ex3A: '« Les visiteuses sont entrées dans le palais et ont admiré les murs sculptés. »',
				quizQ: 'Complète correctement : « Les anciennes portes en bois que les artisans ont (restaurer) ...... brillent au soleil. »',
				correctOpt: 'restaurées',
				distractors: [
					{ text: 'restauré', diagnosticFeedback: 'Le COD « que » (= Les anciennes portes, fém. pl.) est placé avant le verbe.' },
					{ text: 'restaurés', diagnosticFeedback: '« porte » est un nom féminin.' },
					{ text: 'restaurée', diagnosticFeedback: '« Les anciennes portes » est au pluriel.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II — Fonctionnement de la langue',
			points: 6,
			instruction: 'Réalise les exercices suivants de conjugaison et d’accord du participe passé :',
			content: [
				{ type: 'text', content: s.ex1Q, answer: s.ex1A, mark: '2' },
				{ type: 'text', content: s.ex2Q, answer: s.ex2A, mark: '2' },
				{ type: 'text', content: s.ex3Q, answer: s.ex3A, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: 'orthographe_accords',
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
				'مع المساعد « être » يطابق اسم المفعول الفاعل دائما.',
				'مع المساعد « avoir » لا يطابق الفاعل أبدا، بل يطابق المفعول المباشر (COD) فقط إذا سبق الفعل (عبر que / la / les).',
				'في الزيارة الشخصية نجمع بين الماضي المركب والماضي الناقص، وفي القصة التاريخية بين الماضي البسيط والماضي الناقص.'
			],
			solutionStepsAr: [s.ex1A, s.ex2A, s.ex3A],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 : Situation d'intégration (07 pts) — Récit patrimonial algérien
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_2am_t3_written_recit_patrimoine',
	grade: '2am',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: كتابة قصة تراثية تُبرز جمالية منطقة تاريخية جزائرية (07 نقاط)',
	curriculumLessonId: 'fre_lesson_2am_t3_rediger_recit_patrimoine',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Ton collège réalise une brochure sur les trésors historiques de l’Algérie. Rédige un court récit patrimonial (8 à 10 lignes) racontant une visite à la Casbah d’Alger afin de mettre en valeur sa beauté et son histoire.',
				notes: [
					'Propose un titre valorisant (ex : La Casbah d’Alger, mémoire vivante).',
					'Situe la visite dans le temps et emploie harmonieusement le passé composé et l’imparfait.',
					'Utilise au moins trois mots du lexique mélioratif (magnifique, chef-d’œuvre, authentique, admirer...).',
					'Intègre deux propositions subordonnées relatives (qui, que ou où) et veille à l’accord du participe passé.',
					'Termine par une phrase exprimant ta fierté et le devoir de préserver ce patrimoine.'
				],
				modelAnswer:
					'La Casbah d’Alger, joyau de notre histoire\n\nPendant les vacances de printemps, ma famille et moi sommes allés visiter la Casbah d’Alger, cette cité historique magnifique qui surplombe la Méditerranée. Dès notre arrivée, les ruelles blanches et les portes en bois sculpté brillaient sous le soleil du matin.\n\nNous avons découvert des ateliers authentiques où des artisans habiles perpétuent le travail du cuivre et du bois. Les anciennes fontaines et les palais que nous avons admirés témoignent du génie de nos ancêtres.\n\nCette visite inoubliable nous a remplis de fierté : la Casbah est un trésor précieux que nous devons tous protéger.',
				quizQ: 'Quelle phrase valorise la Casbah en combinant lexique mélioratif et accord correct du participe passé ?',
				correctOpt: 'Les portes sculptées que nous avons admirées à la Casbah sont splendides.',
				distractors: [
					{ text: 'Les portes sculptées que nous avons admiré à la Casbah sont splendides.', diagnosticFeedback: 'Le COD « que » (= Les portes sculptées, fém. pl.) précède « avons admirées ».' },
					{ text: 'Nous avons admirées les portes laides de la Casbah.', diagnosticFeedback: '« laides » est péjoratif et le COD est après le verbe.' },
					{ text: 'Les portes sculptées est resté splendides.', diagnosticFeedback: 'Le sujet est féminin pluriel : « sont restées ».' }
				]
			},
			{
				prompt: 'Rédige un court récit patrimonial (8 à 10 lignes) mettant en valeur la Vallée du M’Zab (Ghardaïa) : son architecture harmonieuse, son ingéniosité et ses valeurs de solidarité.',
				notes: [
					'Donne un titre valorisant à ton texte.',
					'Emploie les temps du passé (imparfait + passé composé ou passé simple).',
					'Enrichis ta description avec un lexique mélioratif (chef-d’œuvre, harmonieux, ingénieux, émerveiller).',
					'Utilise au moins deux pronoms relatifs (qui / que / où) et respecte l’accord des participes passés.',
					'Conclus sur l’importance de préserver cet héritage unique.'
				],
				modelAnswer:
					'La Vallée du M’Zab, chef-d’œuvre du Sahara\n\nAu printemps dernier, notre classe a visité la Vallée du M’Zab, un joyau authentique qui s’élève près de Ghardaïa. Les maisons colorées d’ocre et de blanc s’étageaient harmonieusement sur la colline, laissant entrer la lumière dans chaque ruelle.\n\nNotre guide nous a montré les anciens canaux où l’eau des crues est partagée équitablement entre toutes les palmeraies. Les ksour millénaires que nous avons parcourus nous ont émerveillés par leur beauté simple et l’esprit d’entraide de leurs habitants.\n\nDe retour à la maison, nous avons gardé une profonde admiration pour ce patrimoine exceptionnel qui fait la fierté de l’Algérie.',
				quizQ: 'Dans un récit patrimonial sur Ghardaïa, quel pronom relatif complète : « Les palmeraies ...... les anciens ont irriguées restent verdoyantes. » ?',
				correctOpt: 'que',
				distractors: [
					{ text: 'qui', diagnosticFeedback: 'Le sujet « les anciens » est déjà présent après le relatif.' },
					{ text: 'où', diagnosticFeedback: 'On irrigue quelque chose (COD) : on emploie « que ».' },
					{ text: 'qu’', diagnosticFeedback: '« les » commence par une consonne (l), donc on garde « que ».' }
				]
			},
			{
				prompt: 'Écris un court récit patrimonial (8 à 10 lignes) pour présenter à un jeune lecteur une région historique d’Algérie au choix : Tlemcen et sa Grande Mosquée, ou le Tassili n’Ajjer et ses gravures millénaires.',
				notes: [
					'Choisis un titre expressif et mélioratif.',
					'Décris le lieu à l’imparfait et raconte la découverte au passé composé (ou son histoire au passé simple).',
					'Emploie un lexique mélioratif varié et au moins deux propositions relatives (qui, que, où).',
					'Vérifie l’accord des adjectifs et des participes passés.',
					'Conclus par une phrase de fierté et de sensibilisation à la sauvegarde du patrimoine.'
				],
				modelAnswer:
					'Tlemcen, perle historique de l’Ouest algérien\n\nPendant les vacances d’hiver, j’ai visité la prestigieuse ville de Tlemcen avec mes parents. Sous un ciel clair, la Grande Mosquée dressait fièrement son minaret majestueux au cœur de la vieille cité.\n\nNous avons marché dans des quartiers accueillants où des artisans passionnés perpétuent la broderie fine et la poterie traditionnelle. Les arches élégantes et les sculptures raffinées que nous avons observées témoignaient d’un savoir-faire remarquable transmis depuis des siècles.\n\nCe voyage inoubliable m’a appris combien le patrimoine algérien est riche et combien il est essentiel de le préserver pour les générations futures.',
				quizQ: 'Quelle conclusion convient le mieux à un récit patrimonial en 2AM ?',
				correctOpt: 'Ce voyage inoubliable rappelle combien notre patrimoine algérien est précieux et mérite d’être protégé.',
				distractors: [
					{ text: 'Il faut se brosser les dents trois fois par jour.', diagnosticFeedback: 'Hors sujet : cela concerne l’hygiène en 1AM.' },
					{ text: 'L’abeille prépare son miel avant l’hiver.', diagnosticFeedback: 'Hors sujet : cela appartient à une fable.' },
					{ text: 'Hier, j’ai oublié mon cahier en classe.', diagnosticFeedback: 'Sans rapport avec le patrimoine algérien.' }
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
				'Pertinence et mise en valeur du patrimoine algérien (2 pts) + Cohérence et lexique mélioratif (2 pts) + Langue : temps du passé, relatives (qui/que/où) et accords du participe passé (2 pts) + Présentation (1 pt).',
			mark: '7'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III — Situation d’intégration (Production écrite)',
			points: 7,
			instruction: 'Rédige ton récit patrimonial avec soin en respectant les consignes ci-dessous :',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
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
				'اختر عنوانا إيجابيا وحدّد زمان الزيارة ومكانها الجزائري العريق.',
				'اجمع بين الماضي الناقص للوصف والماضي المركّب (أو البسيط) للأحداث، وأدرج معجما إيجابيا غنيا.',
				'وظّف جملتي صلة بـ (qui / que / où) وراجع مطابقة اسم المفعول والصفات.'
			],
			solutionStepsAr: [
				'المقدمة: تحديد الزمان والمكان التراثي الجزائري.',
				'العرض: وصف المعالم بالمعجم الإيجابي وجمل الصلة مع احترام أزمنة الماضي ومطابقة اسم المفعول.',
				'الخاتمة: إبراز الفخر بالتراث الوطني والدعوة إلى صونه.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T3: FrenchParameterizedTemplate[] = [
	comp2amT3CasbahTlemcen,
	comp2amT3MzabTassiliAures,
	expl2amT3RelativeMelioratif,
	expl2amT3TempsAccords,
	written2amT3
];
