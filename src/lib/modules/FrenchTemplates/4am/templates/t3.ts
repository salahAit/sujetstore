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
// 1. Compréhension BEM 1 (7 pts) — Protection de l’environnement, eau & forêts
// ═══════════════════════════════════════════════════════════════════════════════
const compEnvironnementEau4amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t3_comp_environnement_eau',
	grade: '4am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): حماية البيئة، اقتصاد الماء، السد الأخضر، ومكافحة البلاستيك (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t3_condition_opposition',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Préservons l’eau potable, une richesse vitale et limitée !',
				paragraphs: [
					'Bien que l’eau soit indispensable à toute forme de vie sur Terre, les réserves d’eau douce diminuent dangereusement face au réchauffement climatique et aux sécheresses répétées. Je suis convaincu que l’économie de l’eau est aujourd’hui une urgence absolue en Algérie et dans le monde.',
					'D’abord, si nous réparions rapidement les robinets qui fuient et réduisions la durée des douches, chaque famille économiserait des milliers de litres chaque année. Ensuite, [[cette ressource précieuse]] est essentielle à notre agriculture et à notre sécurité alimentaire ; par conséquent, les méthodes d’irrigation moderne comme le goutte-à-goutte doivent être généralisées. Enfin, sensibiliser les enfants dès l’école forme des citoyens responsables qui refusent le gaspillage.',
					'Ne gaspillons donc plus une seule goutte ! Protégeons l’eau aujourd’hui afin que nos enfants vivent demain dans un pays prospère.'
				],
				source: 'D’après une chronique écologique algérienne (Préparation BEM)',
				glossary: [
					{ term: 'goutte-à-goutte', meaning: 'système d’irrigation économe qui arrose directement les racines' },
					{ term: 'prospère', meaning: 'riche, en plein développement et bien-être' }
				],
				these: 'L’économie de l’eau potable est aujourd’hui une urgence absolue en Algérie et dans le monde.',
				q1: 'Quels deux gestes domestiques permettraient à chaque famille d’économiser des milliers de litres d’eau ?',
				a1: 'Réparer rapidement les robinets qui fuient et réduire la durée des douches.',
				q2: 'Quelle méthode agricole l’auteur recommande-t-il pour économiser l’eau ?',
				a2: 'L’auteur recommande de généraliser l’irrigation moderne comme le goutte-à-goutte.',
				tf1Q: 'Les réserves d’eau douce sont illimitées sur notre planète.',
				tf1A: 'Faux',
				tf1C: 'Elles sont limitées et diminuent dangereusement face au réchauffement climatique et aux sécheresses.',
				tf2Q: 'Sensibiliser les enfants dès l’école aide à former des citoyens responsables.',
				tf2A: 'Vrai',
				refWord: 'cette ressource précieuse',
				refAns: 'l’eau potable (l’eau douce)',
				visee: 'Sensibiliser les citoyens à la rareté de l’eau potable et les inciter à l’économiser par des gestes responsables.',
				mcqCorrect: 'L’auteur sensibilise à la rareté de l’eau et incite les familles et les agriculteurs à l’économiser.',
				mcqD1: 'L’auteur affirme que les sécheresses ne menacent jamais les réserves d’eau.',
				mcqD2: 'Le texte conseille d’abandonner le système d’irrigation au goutte-à-goutte.',
				mcqD3: 'Le texte raconte une sortie scolaire au musée.'
			},
			{
				title: 'Reboisons nos forêts et renforçons le Barrage Vert !',
				paragraphs: [
					'Des montagnes du Nord jusqu’aux portes du Sahara, la forêt algérienne joue un rôle vital pour l’équilibre écologique de notre pays. À mon avis, reboiser nos terres et revitaliser le célèbre Barrage Vert constituent un devoir patriotique urgent.',
					'Tout d’abord, les arbres retiennent le sol fertile grâce à leurs racines et freinent efficacement l’avancée de la désertification. De plus, [[ces poumons verts]] purifient l’air en absorbant le gaz carbonique et abritent une faune et une flore remarquables. Enfin, si chaque citoyen plantait et entretenait ne serait-ce qu’un arbre chaque automne, nos forêts retrouveraient rapidement leur éclat malgré les incendies passés.',
					'Mobilisons-nous tous ! Plantons des cèdres, des oliviers et des chênes pour offrir un environnement sain aux générations futures.'
				],
				source: 'D’après un article sur l’écologie en Algérie (Préparation BEM)',
				glossary: [
					{ term: 'Barrage Vert', meaning: 'vaste ceinture forestière plantée en Algérie pour stopper la désertification' },
					{ term: 'revitaliser', meaning: 'redonner de la force et de la vie à un écosystème' }
				],
				these: 'Reboiser nos terres et revitaliser le Barrage Vert constituent un devoir patriotique urgent.',
				q1: 'Comment les arbres luttent-ils contre la désertification selon le texte ?',
				a1: 'Ils retiennent le sol fertile grâce à leurs racines et freinent l’avancée du désert.',
				q2: 'Quel double bienfait écologique les forêts apportent-elles à l’air et à la biodiversité ?',
				a2: 'Elles purifient l’air en absorbant le gaz carbonique et abritent une faune et une flore remarquables.',
				tf1Q: 'Le Barrage Vert vise à freiner l’avancée de la désertification en Algérie.',
				tf1A: 'Vrai',
				tf2Q: 'Selon l’auteur, planter un arbre par citoyen ne servirait à rien.',
				tf2A: 'Faux',
				tf2C: 'Si chaque citoyen plantait et entretenait un arbre, nos forêts retrouveraient rapidement leur éclat.',
				refWord: 'ces poumons verts',
				refAns: 'les arbres / les forêts algériennes',
				visee: 'Convaincre de l’importance vitale des forêts et inciter les citoyens à participer au reboisement.',
				mcqCorrect: 'L’auteur appelle à reboiser l’Algérie et à renforcer le Barrage Vert pour protéger les sols, l’air et la biodiversité.',
				mcqD1: 'Les forêts augmentent la pollution de l’air.',
				mcqD2: 'Le Barrage Vert est un pont autoroutier construit sur la mer.',
				mcqD3: 'L’auteur propose de couper les cèdres et les chênes.'
			},
			{
				title: 'Réduisons les déchets plastiques pour sauver nos villes et nos côtes',
				paragraphs: [
					'Malgré les nombreuses campagnes de nettoyage, les sacs et bouteilles en plastique continuent d’envahir les rues, les oueds et le littoral méditerranéen. J’affirme que réduire notre consommation de plastique à usage unique est indispensable pour protéger notre santé et nos mers.',
					'D’abord, un simple sac en plastique met plusieurs siècles à se décomposer dans la nature, si bien qu’il menace gravement les poissons, les tortues marines et les oiseaux. Ensuite, [[ce matériau polluant]] bouche les canalisations et aggrave les inondations lors des fortes pluies. Enfin, des solutions simples existent : utiliser des couffins réutilisables, trier les déchets recyclables et installer des bacs sélectifs dans chaque établissement scolaire.',
					'Changeons nos habitudes dès aujourd’hui ! Refusons le plastique inutile afin que nos villes et nos plages restent propres.'
				],
				source: 'D’après une revue de protection du littoral (Préparation BEM)',
				glossary: [
					{ term: 'se décomposer', meaning: 'disparaître naturellement dans le sol au fil du temps' },
					{ term: 'bacs sélectifs', meaning: 'poubelles de couleurs différentes permettant de trier les déchets' }
				],
				these: 'Réduire notre consommation de plastique à usage unique est indispensable pour protéger notre santé et nos mers.',
				q1: 'Pourquoi le sac en plastique est-il si dangereux pour la faune marine et les oiseaux ?',
				a1: 'Parce qu’il met plusieurs siècles à se décomposer dans la nature et menace gravement poissons, tortues marines et oiseaux.',
				q2: 'Citez deux solutions concrètes proposées par l’auteur pour réduire les déchets plastiques.',
				a2: 'Utiliser des couffins réutilisables, trier les déchets recyclables ou installer des bacs sélectifs (deux au choix).',
				tf1Q: 'Les déchets plastiques peuvent aggraver les inondations en bouchant les canalisations.',
				tf1A: 'Vrai',
				tf2Q: 'Un sac en plastique disparaît naturellement de la nature en deux jours.',
				tf2A: 'Faux',
				tf2C: 'Il met plusieurs siècles à se décomposer dans la nature.',
				refWord: 'ce matériau polluant',
				refAns: 'le plastique (les sacs et bouteilles en plastique)',
				visee: 'Sensibiliser aux dangers de la pollution plastique et inciter les citoyens à adopter des alternatives réutilisables.',
				mcqCorrect: 'L’auteur alerte sur les ravages du plastique sur la mer et les villes et encourage le couffin réutilisable et le tri.',
				mcqD1: 'Les sacs en plastique protègent les tortues marines.',
				mcqD2: 'L’auteur recommande d’utiliser davantage de plastique jetable.',
				mcqD3: 'Le tri sélectif est jugé impossible dans les collèges.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'هذه الجملة تعكس تماماً الحقائق العلمية الواردة في النص.' },
				{ text: v.mcqD2, diagnosticFeedback: 'راجع الحلول التي يدعو إليها الكاتب في الفقرة الثانية والثالثة.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة العنوان والمقدمة لمعرفة موضوع النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle synthèse résume fidèlement le texte « ${v.title} » ?`,
				questionTextAr: `ما الملخص الدقيق للنص البيئي « ${v.title} »؟`,
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
				instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions (sujet type BEM) :',
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
						content: '1) Quelle est la thèse défendue par l’auteur dans le premier paragraphe ? (01 pt)',
						answer: v.these,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) Répondez aux questions suivantes à partir du texte (02 pts) :\n  a) ${v.q1}\n  b) ${v.q2}`,
						answer: `a) ${v.a1}\nb) ${v.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C ?? '', mark: '1' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C ?? '', mark: '1' }
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
						content: '5) Quelle est la visée communicative de l’auteur ? (01 pt)',
						answer: v.visee,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الأطروحة من الفقرة الأولى بعد عبارة الرأي (Je suis convaincu / À mon avis / J’affirme).',
				'في سؤال الغرض التواصلي (Visée communicative) ابدأ بفعل مصدري مثل Sensibiliser / Convaincre et inciter à...',
				'لاحظ وجود صيغة الأمر في الخاتمة لدعوة القارئ إلى التحرك العملي.'
			],
			solutionStepsAr: [
				`الأطروحة: ${v.these}`,
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`الغرض التواصلي: ${v.visee}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension BEM 2 (7 pts) — Sécurité routière, énergie solaire & lecture
// ═══════════════════════════════════════════════════════════════════════════════
const compSecuriteRoutiereBem4amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t3_comp_securite_routiere_bem',
	grade: '4am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): السلامة المرورية، الطاقة الشمسية في الصحراء، والقراءة والبحث العلمي (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t3_famille_mots_visee',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'La sécurité routière, une responsabilité partagée pour sauver des vies',
				paragraphs: [
					'Chaque année, les accidents de la route endeuillent de nombreuses familles sur nos routes nationales. Je suis persuadé que ce drame n’est pas une fatalité et que nous pouvons sauver des milliers de vies grâce à la prudence et au respect strict du code de la route.',
					'D’abord, la majorité des accidents graves sont provoqués par l’excès de vitesse, la fatigue au volant ou l’utilisation imprudente du téléphone portable en conduisant. Ensuite, [[des gestes simples]], tels qu’attacher sa ceinture de sécurité, respecter les passages piétons et contrôler l’état des freins, réduisent considérablement le risque mortel. Enfin, si l’éducation routière commençait dès l’école, les futurs conducteurs et piétons adopteraient naturellement des réflexes sûrs.',
					'Soyons tous vigilants ! Ralentissons sur la route afin que chaque voyage se termine dans la joie des retrouvailles.'
				],
				source: 'D’après une campagne nationale de prévention routière (BEM)',
				glossary: [
					{ term: 'fatalité', meaning: 'événement présenté à tort comme inévitable' },
					{ term: 'vigilant', meaning: 'très attentif afin d’éviter tout danger' }
				],
				q1: 'Quelles sont les trois principales causes d’accidents graves citées dans le texte ?',
				a1: 'L’excès de vitesse, la fatigue au volant et l’utilisation imprudente du téléphone portable en conduisant.',
				q2: 'Quel rôle l’école peut-elle jouer pour améliorer la sécurité routière ?',
				a2: 'L’éducation routière dès l’école permet aux futurs conducteurs et piétons d’adopter naturellement des réflexes sûrs.',
				tf1Q: 'Selon l’auteur, les accidents de la route sont une fatalité qu’on ne peut pas éviter.',
				tf1A: 'Faux',
				tf1C: 'L’auteur affirme que ce drame n’est pas une fatalité et qu’on peut sauver des vies par la prudence.',
				tf2Q: 'Attacher sa ceinture de sécurité et contrôler les freins réduisent le risque mortel.',
				tf2A: 'Vrai',
				refWord: 'des gestes simples',
				refAns: 'attacher sa ceinture de sécurité, respecter les passages piétons et contrôler l’état des freins',
				antQ: 'Relevez du texte un adjectif formé avec un préfixe d’antonymie et donnez son antonyme sans préfixe.',
				antA: 'imprudente (antonyme sans préfixe : prudente).',
				visee: 'Sensibiliser les usagers de la route aux causes des accidents et les inciter à respecter le code de la route.',
				mcqCorrect: 'L’auteur montre que la prudence, le respect du code de la route et l’éducation routière permettent d’éviter les accidents.',
				mcqD1: 'L’auteur conseille d’utiliser le téléphone portable en conduisant.',
				mcqD2: 'La ceinture de sécurité n’a aucune utilité selon le texte.',
				mcqD3: 'Le texte affirme que l’excès de vitesse ne cause jamais d’accidents.'
			},
			{
				title: 'L’énergie solaire dans le Sahara algérien : un avenir propre et prometteur',
				paragraphs: [
					'Disposant de l’un des taux d’ensoleillement les plus élevés de la planète, l’Algérie possède un atout énergétique extraordinaire dans son vaste Sahara. J’estime que le développement de l’énergie solaire représente une chance historique pour construire un avenir propre et durable.',
					'Tout d’abord, contrairement aux énergies fossiles polluantes, l’énergie solaire est renouvelable, silencieuse et n’émet aucun gaz nocif lors de sa production. De plus, [[cette ressource inépuisable]] permet d’alimenter en électricité les villages isolés, les écoles sahariennes et les pompes d’irrigation agricole. Enfin, investir dans les centrales photovoltaïques et la formation de jeunes ingénieurs algériens créera de nombreux emplois qualifiés.',
					'Ainsi, miser sur le soleil du Sahara, c’est protéger notre climat tout en préparant la prospérité économique de demain.'
				],
				source: 'D’après une revue scientifique algérienne (Préparation BEM)',
				glossary: [
					{ term: 'ensoleillement', meaning: 'durée et intensité de la lumière du soleil reçue par une région' },
					{ term: 'photovoltaïque', meaning: 'qui transforme directement la lumière du soleil en électricité' }
				],
				q1: 'Quels avantages écologiques distinguent l’énergie solaire des énergies fossiles ?',
				a1: 'Elle est renouvelable, silencieuse et n’émet aucun gaz nocif lors de sa production.',
				q2: 'Citez deux retombées positives de l’énergie solaire pour les populations et l’économie.',
				a2: 'Alimenter en électricité les villages isolés, les écoles et l’irrigation agricole, et créer de nombreux emplois qualifiés.',
				tf1Q: 'L’Algérie bénéficie d’un taux d’ensoleillement très élevé dans son Sahara.',
				tf1A: 'Vrai',
				tf2Q: 'L’énergie solaire est une ressource polluante qui s’épuise rapidement.',
				tf2A: 'Faux',
				tf2C: 'C’est une ressource renouvelable, inépuisable et propre qui n’émet aucun gaz nocif.',
				refWord: 'cette ressource inépuisable',
				refAns: 'l’énergie solaire',
				antQ: 'Relevez du texte un adjectif contenant un préfixe d’antonymie et indiquez son préfixe.',
				antA: 'inépuisable (préfixe : in-).',
				visee: 'Convaincre des atouts écologiques et économiques de l’énergie solaire en Algérie et encourager son développement.',
				mcqCorrect: 'L’énergie solaire du Sahara offre à l’Algérie une énergie propre, renouvelable et créatrice d’emplois.',
				mcqD1: 'Le Sahara algérien manque totalement d’ensoleillement.',
				mcqD2: 'Les centrales photovoltaïques produisent des fumées toxiques.',
				mcqD3: 'L’énergie solaire ne peut pas alimenter les villages isolés.'
			},
			{
				title: 'La lecture et la recherche scientifique, clés de l’essor de notre jeunesse',
				paragraphs: [
					'À l’heure où les vidéos rapides captent souvent l’attention des adolescents, certains pensent que le livre papier appartient au passé. Je suis convaincu, au contraire, que la lecture régulière et l’esprit de recherche scientifique demeurent les meilleures clés de la réussite intellectuelle.',
					'D’abord, lire des livres enrichit le vocabulaire, renforce la concentration et apprend à réfléchir avec calme et nuance. Ensuite, [[cette noble habitude]] s’inscrit dans le glorieux héritage de savants comme Ibn Al-Haytham, pionnier de l’observation rigoureuse, et Cheikh Abdelhamid Ben Badis, qui appelait la jeunesse algérienne à conquérir le savoir utile. Enfin, un élève qui lit régulièrement rédige mieux, comprend plus vite ses leçons et prépare sereinement son avenir.',
					'Alors, ouvrons un livre chaque jour ! Cultivons notre esprit afin que la jeunesse algérienne rayonne par sa science et sa sagesse.'
				],
				source: 'D’après un article éducatif pour candidats au BEM',
				glossary: [
					{ term: 'nuance', meaning: 'finesse et précision dans le jugement' },
					{ term: 'sereinement', meaning: 'avec calme et confiance' }
				],
				q1: 'Quels trois bienfaits intellectuels la lecture apporte-t-elle selon le deuxième paragraphe ?',
				a1: 'Elle enrichit le vocabulaire, renforce la concentration et apprend à réfléchir avec calme et nuance (et aide à mieux rédiger).',
				q2: 'Quelles deux grandes figures scientifiques et éducatives l’auteur cite-t-il en exemple ?',
				a2: 'Ibn Al-Haytham (pionnier de l’observation rigoureuse) et Cheikh Abdelhamid Ben Badis.',
				tf1Q: 'Selon l’auteur, le livre papier est désormais inutile à cause des vidéos rapides.',
				tf1A: 'Faux',
				tf1C: 'L’auteur affirme au contraire que la lecture régulière demeure une clé majeure de la réussite intellectuelle.',
				tf2Q: 'La lecture régulière aide les élèves à mieux rédiger et à mieux comprendre leurs leçons.',
				tf2A: 'Vrai',
				refWord: 'cette noble habitude',
				refAns: 'la lecture régulière (lire des livres)',
				antQ: 'Relevez du texte un verbe de la famille de « lecteur » et un nom de la famille de « sage ».',
				antA: 'Verbe : lire (lit) | Nom : sagesse.',
				visee: 'Convaincre les jeunes de la valeur irremplaçable de la lecture et du savoir et les inciter à lire chaque jour.',
				mcqCorrect: 'L’auteur défend la lecture et l’esprit scientifique en s’appuyant sur leurs bienfaits et sur l’héritage d’Ibn Al-Haytham et Ben Badis.',
				mcqD1: 'L’auteur affirme que les vidéos rapides remplacent avantageusement les livres.',
				mcqD2: 'La lecture diminue la concentration des collégiens.',
				mcqD3: 'Le texte conseille aux élèves d’arrêter de lire avant le BEM.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'أعد قراءة المقدمة لتحديد الموقف الحقيقي للكاتب.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه العبارة تناقض حجج الفقرة الثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'انظر إلى الخاتمة لتعرف التوصية التي يوجّهها الكاتب.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture de « ${v.title} », quel résumé est exact ?`,
				questionTextAr: `اقرأ نص « ${v.title} » واختر الخلاصة المطابقة له:`,
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
				instruction: 'Lisez attentivement ce texte argumentatif (sujet type BEM) puis répondez aux questions :',
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
						content: `1) Répondez aux questions suivantes à partir du texte (02 pts) :\n  a) ${v.q1}\n  b) ${v.q2}`,
						answer: `a) ${v.a1}\nb) ${v.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C ?? '', mark: '1' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C ?? '', mark: '1' }
						]
					},
					{
						type: 'text',
						content: `3) Que remplace l’expression soulignée « ${v.refWord} » dans le texte ? (01 pt)`,
						answer: `« ${v.refWord} » remplace : ${v.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) ${v.antQ} (01 pt)`,
						answer: v.antA,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) Quelle est la visée communicative de l’auteur dans ce texte ? (01 pt)',
						answer: v.visee,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الإجابات الدقيقة من الفقرة الثانية دون نسخ جمل غير مطلوبة.',
				'تذكّر أن سابقة الضد (im-, in-, ir-, il-) تلتصق ببداية الجذر.',
				'اكتب الغرض التواصلي (Visée communicative) في جملة تامة تبدأ بفعل مصدري (Sensibiliser / Convaincre et inciter à...).'
			],
			solutionStepsAr: [
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم: ${v.antA}`,
				`الغرض التواصلي: ${v.visee}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue BEM 1 (6 pts) — Condition, Opposition & Modes
// ═══════════════════════════════════════════════════════════════════════════════
const langConditionOppositionModes4amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t3_lang_condition_opposition_modes',
	grade: '4am',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (BEM 4AM): الشرط والفرضية والمعارضة والشرطي الحاضر والأمر (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t3_conditionnel_imperatif',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				cond1Q: 'a) Si nous (économiser) ............ l’eau aujourd’hui, nous (préserver) ............ nos nappes phréatiques. (Si + Présent)',
				cond1A: 'a) Si nous économisons l’eau aujourd’hui, nous préserverons nos nappes phréatiques.',
				cond2Q: 'b) Si chaque conducteur (respecter) ............ la limitation de vitesse, les accidents (diminuer) ............ nettement. (Si + Imparfait)',
				cond2A: 'b) Si chaque conducteur respectait la limitation de vitesse, les accidents diminueraient nettement.',
				opp1Q: 'a) Remplacez « mais » par « bien que » (attention au mode du verbe) :\n     « L’eau potable est limitée, mais certaines personnes la gaspillent encore. »',
				opp1A: 'a) Bien que l’eau potable soit limitée, certaines personnes la gaspillent encore.',
				opp2Q: 'b) Transformez en phrase simple à l’aide de « malgré » :\n     « Bien que la chaleur soit forte, les volontaires arrosent les jeunes arbres. »',
				opp2A: 'b) Malgré la forte chaleur (ou Malgré la chaleur forte), les volontaires arrosent les jeunes arbres.',
				impQ: 'Mettez les verbes suivants à l’impératif présent à la 2e personne du singulier (tu) puis à la 1re personne du pluriel (nous) :\n  « (Protéger) ............ la forêt et (être) ............ vigilant sur la route ! »',
				impA: 'Avec tu : Protège la forêt et sois vigilant sur la route !\nAvec nous : Protégeons la forêt et soyons vigilants sur la route !',
				mcqQ: 'Choisissez la phrase respectant la concordance des temps avec « Si » :',
				mcqCorrect: 'Si nous plantions davantage d’arbres, l’air serait plus pur.',
				mcqD1: 'Si nous planterions davantage d’arbres, l’air serait plus pur.',
				mcqD2: 'Si nous plantons davantage d’arbres, l’air serait plus pur.',
				mcqD3: 'Si nous planterons davantage d’arbres, l’air sera plus pur.'
			},
			{
				cond1Q: 'a) Si les élèves (trier) ............ le plastique au collège, ils (aider) ............ le recyclage. (Si + Présent)',
				cond1A: 'a) Si les élèves trient le plastique au collège, ils aideront le recyclage.',
				cond2Q: 'b) Si l’Algérie (développer) ............ encore plus le solaire, la pollution (être) ............ très réduite. (Si + Imparfait)',
				cond2A: 'b) Si l’Algérie développait encore plus le solaire, la pollution serait très réduite.',
				opp1Q: 'a) Reliez avec « bien que » (attention au subjonctif) :\n     « Ce plastique est nocif. On l’utilise encore beaucoup. »',
				opp1A: 'a) Bien que ce plastique soit nocif, on l’utilise encore beaucoup.',
				opp2Q: 'b) Transformez en phrase simple avec « malgré » :\n     « Bien que les campagnes soient nombreuses, quelques chauffards roulent trop vite. »',
				opp2A: 'b) Malgré les nombreuses campagnes, quelques chauffards roulent trop vite.',
				impQ: 'Mettez à l’impératif présent avec (tu) puis avec (vous) :\n  « (Économiser) ............ chaque goutte et (avoir) ............ le réflexe du tri ! »',
				impA: 'Avec tu : Économise chaque goutte et aie le réflexe du tri !\nAvec vous : Économisez chaque goutte et ayez le réflexe du tri !',
				mcqQ: 'Choisissez la transformation correcte avec « bien que » : « Le vent souffle fort, mais les scouts poursuivent le reboisement. »',
				mcqCorrect: 'Bien que le vent souffle fort, les scouts poursuivent le reboisement.',
				mcqD1: 'Bien que le vent souffle fort, mais les scouts poursuivent le reboisement.',
				mcqD2: 'Malgré que le vent souffle fort, les scouts poursuivent le reboisement.',
				mcqD3: 'Bien que le vent fort, les scouts poursuivent le reboisement.'
			},
			{
				cond1Q: 'a) Si tu (lire) ............ quinze minutes par jour, tu (enrichir) ............ vite ton vocabulaire. (Si + Présent)',
				cond1A: 'a) Si tu lis quinze minutes par jour, tu enrichiras vite ton vocabulaire.',
				cond2Q: 'b) Si tout le monde (utiliser) ............ un couffin en tissu, nos plages (devenir) ............ impeccables. (Si + Imparfait)',
				cond2A: 'b) Si tout le monde utilisait un couffin en tissu, nos plages deviendraient impeccables.',
				opp1Q: 'a) Remplacez « cependant » par « bien que » :\n     « Le trajet est court ; cependant, il faut toujours attacher la ceinture de sécurité. »',
				opp1A: 'a) Bien que le trajet soit court, il faut toujours attacher la ceinture de sécurité.',
				opp2Q: 'b) Transformez en phrase simple avec « malgré » :\n     « Bien qu’ils soient fatigués, les bénévoles terminent le nettoyage de la plage. »',
				opp2A: 'b) Malgré leur fatigue, les bénévoles terminent le nettoyage de la plage.',
				impQ: 'Mettez à l’impératif présent avec (tu) puis avec (nous) :\n  « (Respecter) ............ le code de la route et (savoir) ............ prévenir le danger ! »',
				impA: 'Avec tu : Respecte le code de la route et sache prévenir le danger !\nAvec nous : Respectons le code de la route et sachons prévenir le danger !',
				mcqQ: 'Quelle est la forme correcte à l’impératif présent (2e personne du singulier) ?',
				mcqCorrect: 'Protège la nature et va planter un olivier !',
				mcqD1: 'Protèges la nature et vas planter un olivier !',
				mcqD2: 'Protège la nature et vas planter un olivier !',
				mcqD3: 'Protéger la nature et aller planter un olivier !'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'تذكّر: لا نضع futur أو conditionnel بعد Si، ونحذف (mais) مع (Bien que)، ونحذف (s) في الأمر للفوج الأول و aller.' },
				{ text: s.mcqD2, diagnosticFeedback: 'راجع تطابق الزمنين في الشرط وقاعدة حذف (s) في أمر (aller -> Va !).' },
				{ text: s.mcqD3, diagnosticFeedback: 'تأكّد من الصيغة الصحيحة بعد Si وبعد Bien que وفي صيغة الأمر.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الجملة المضبوطة قواعدياً وفق منهجية BEM:',
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
				instruction: 'Traitez les exercices sur la condition, l’opposition et les modes verbaux (type BEM) :',
				content: [
					{
						type: 'text',
						content: `1) Conjuguez les verbes entre parenthèses aux temps qui conviennent selon la règle du « Si » (02 pts) :\n  ${s.cond1Q}\n  ${s.cond2Q}`,
						answer: `${s.cond1A}\n${s.cond2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) Exprimez l’opposition / la concession selon les consignes (02 pts) :\n  ${s.opp1Q}\n  ${s.opp2Q}`,
						answer: `${s.opp1A}\n${s.opp2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) ${s.impQ} (02 pts)`,
						answer: s.impA,
						mark: '2'
					}
				]
			},
			hints: [
				'قاعدتا الشرط: (Si + Présent يعطي Futur simple) و (Si + Imparfait يعطي Conditionnel présent).',
				'في المعارضة: (Bien que + Subjonctif دون mais) | و (Malgré + اسم فقط لجملة بسيطة).',
				'في الأمر مع (tu): احذف (-s) من أفعال الفوج الأول (-er) و (aller -> Va !)، وتذكّر (Sois / Aie / Sache).'
			],
			solutionStepsAr: [
				`${s.cond1A} | ${s.cond2A}`,
				`${s.opp1A} | ${s.opp2A}`,
				s.impA
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue BEM 2 (6 pts) — Famille, affixes & synthèse BEM
// ═══════════════════════════════════════════════════════════════════════════════
const langFamilleViseeSyntheseBem4amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t3_lang_famille_visee_synthese_bem',
	grade: '4am',
	trimesterId: 't3',
	domain: 'discours_rhetorique',
	titleAr: 'قواعد اللغة ومراجعة BEM شاملة (4AM): عائلة الكلمات، السوابق، والروابط المنطقية (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t3_synthese_grammaire_bem',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				wfRows: [
					{
						verbe: { given: true, value: 'polluer' },
						nom: { value: 'la pollution', mark: '0.5' },
						adjectif: { value: 'polluant (pollué)', mark: '0.5' }
					},
					{
						verbe: { value: 'respecter', mark: '0.5' },
						nom: { given: true, value: 'le respect' },
						adjectif: { value: 'respectueux', mark: '0.5' }
					}
				],
				antQ: 'Formez les antonymes des mots suivants à l’aide d’un préfixe approprié (in-, im-, il-, ir-, mal-) (02 pts) :\n  a) prudent : ............   |   b) responsable : ............\n  c) légal : ............     |   d) honnête : ............',
				antA: 'a) imprudent | b) irresponsable | c) illégal | d) malhonnête',
				synItems: ['si bien que', 'bien que', 'à condition que', 'malgré', 'si + imparfait', 'par conséquent'],
				cCons: ['si bien que', 'par conséquent'],
				cCond: ['à condition que', 'si + imparfait'],
				cOpp: ['bien que', 'malgré'],
				mcqQ: 'Quelle série d’antonymes formés par préfixation est entièrement juste ?',
				mcqCorrect: 'imprudent - illégal - irresponsable - inutile',
				mcqD1: 'inprudent - inlégal - inresponsable - inutile',
				mcqD2: 'imprudent - illégal - imresponsable - inutile',
				mcqD3: 'déprudent - malégal - irresponsable - inutile'
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'recycler' },
						nom: { value: 'le recyclage', mark: '0.5' },
						adjectif: { value: 'recyclable (recyclé)', mark: '0.5' }
					},
					{
						verbe: { value: 'prévenir', mark: '0.5' },
						nom: { given: true, value: 'la prévention' },
						adjectif: { value: 'préventif', mark: '0.5' }
					}
				],
				antQ: 'Formez les antonymes par préfixation (in-, im-, ir-, dé-) (02 pts) :\n  a) possible : ............  |   b) régulier : ............\n  c) obéir : ............     |   d) juste : ............',
				antA: 'a) impossible | b) irrégulier | c) désobéir | d) injuste',
				synItems: ['parce que', 'pour que', 'quoique', 'grâce à', 'afin de', 'cependant'],
				cCons: ['parce que', 'grâce à'],
				cCond: ['pour que', 'afin de'],
				cOpp: ['quoique', 'cependant'],
				colHeaders: ['Cause', 'But', 'Opposition / Concession'] as [string, string, string],
				mcqQ: 'Quelle est la meilleure réponse au BEM à la question : « Quelle est la visée communicative de l’auteur ? » pour un texte sur le reboisement ?',
				mcqCorrect: 'Sensibiliser les lecteurs à l’importance des forêts et les inciter à participer au reboisement.',
				mcqD1: 'Raconter un souvenir de vacances à la plage.',
				mcqD2: 'Décrire une recette de gâteau traditionnel.',
				mcqD3: 'Donner uniquement une liste de dates sans opinion.'
			},
			{
				wfRows: [
					{
						verbe: { given: true, value: 'économiser' },
						nom: { value: 'l’économie', mark: '0.5' },
						adjectif: { value: 'économique (économe)', mark: '0.5' }
					},
					{
						verbe: { value: 'sensibiliser', mark: '0.5' },
						nom: { given: true, value: 'la sensibilisation' },
						adjectif: { value: 'sensible', mark: '0.5' }
					}
				],
				antQ: 'Formez les antonymes par préfixation (im-, ir-, il-, mal-) (02 pts) :\n  a) patient : ............   |   b) réel : ............\n  c) lisible : ............   |   d) adroit : ............',
				antA: 'a) impatient | b) irréel | c) illisible | d) maladroit',
				synItems: ['à cause de', 'de peur que', 'en dépit de', 'puisque', 'dans le but de', 'toutefois'],
				cCons: ['à cause de', 'puisque'],
				cCond: ['de peur que', 'dans le but de'],
				cOpp: ['en dépit de', 'toutefois'],
				colHeaders: ['Cause', 'But', 'Opposition / Concession'] as [string, string, string],
				mcqQ: 'Parmi ces outils, lequel exige impérativement le subjonctif présent dans la proposition subordonnée ?',
				mcqCorrect: 'bien que / pour que / à condition que',
				mcqD1: 'parce que / puisque / comme',
				mcqD2: 'donc / par conséquent / si bien que',
				mcqD3: 'malgré / grâce à / à cause de'
			}
		]);

		const headers =
			'colHeaders' in s && s.colHeaders
				? s.colHeaders
				: (['Conséquence', 'Condition', 'Opposition / Concession'] as [string, string, string]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'راجع قاعدة السوابق (im- قبل m/b/p، و ir- قبل r، و il- قبل l) ووضع الفعل بعد الأدوات.' },
				{ text: s.mcqD2, diagnosticFeedback: 'هذه الاختيارات لا تطابق المطلوب نحوياً أو منهجياً في BEM.' },
				{ text: s.mcqD3, diagnosticFeedback: 'انتبه: malgré و grâce à يتبعهما اسم فقط وليس فعل Subjonctif.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الدقيقة في مراجعة قواعد ومعجم الـ BEM:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: s.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue — Synthèse BEM (06 pts)',
				points: 6,
				instruction: 'Traitez les exercices de lexique, de formation des mots et de synthèse logique (type BEM) :',
				content: [
					{
						type: 'text',
						content: '1) Complétez le tableau de la famille de mots ci-dessous (02 pts) :'
					},
					buildFrenchWordFamilyTableBlock(s.wfRows),
					{
						type: 'text',
						content: `2) ${s.antQ}`,
						answer: s.antA,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) Classez les outils logiques suivants dans le tableau de synthèse BEM (02 pts) :\nListe : ${s.synItems.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: headers[0], items: s.cCons, mark: '0.75' },
							{ header: headers[1], items: s.cCond, mark: '0.75' },
							{ header: headers[2], items: s.cOpp, mark: '0.5' }
						]
					})
				]
			},
			hints: [
				'قاعدة السابقة in-: تتحول إلى im- قبل (b, m, p)، وإلى il- قبل (l)، وإلى ir- قبل (r).',
				'في جدول عائلة الكلمات، احرص على مطابقة الصنف النحوي (Verbe / Nom / Adjectif).',
				'راجع جدول التصنيف المنطقي جيداً: Cause / Conséquence / But / Condition / Opposition.'
			],
			solutionStepsAr: [
				s.wfRows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' ; '),
				`الأضداد: ${s.antA}`,
				`${headers[0]}: ${s.cCons.join(', ')} | ${headers[1]}: ${s.cCond.join(', ')} | ${headers[2]}: ${s.cOpp.join(', ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite type BEM (7 pts) — Environnement, forêts & sécurité routière
// ═══════════════════════════════════════════════════════════════════════════════
const writeBemEnvironnementCivisme4amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t3_write_bem_environnement_civisme',
	grade: '4am',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية الشاملة (نموذج BEM 4AM): حماية البيئة أو السلامة المرورية (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t3_methodologie_bem',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				title: 'Économiser l’eau potable en Algérie',
				prompt:
					'À l’occasion de la Journée mondiale de l’eau, le club écologique de votre collège vous charge de rédiger un texte argumentatif (12 à 15 lignes) pour sensibiliser les habitants de votre quartier à l’importance de préserver l’eau potable.',
				notes: [
					'Introduction : Soulignez que l’eau est vitale mais limitée, puis formulez clairement votre thèse.',
					'Développement : Présentez 3 arguments illustrés d’exemples (santé et vie quotidienne, agriculture algérienne, gestes domestiques simples comme réparer les fuites).',
					'Outils BEM obligatoires : Connecteurs (D’abord, Ensuite, Enfin), une hypothèse avec « Si », une opposition (bien que ou malgré) et un appel à l’impératif présent en conclusion.'
				],
				modelAnswer:
					'Chaque goutte d’eau compte : préservons notre avenir !\nBien que l’eau soit la source de toute vie sur Terre, cette richesse précieuse devient de plus en plus rare à cause des sécheresses et du gaspillage. Je suis convaincu que chaque citoyen a le devoir urgent de protéger et d’économiser l’eau potable.\nD’abord, l’eau est indispensable à notre santé quotidienne et à l’hygiène de nos foyers ; sans elle, aucune vie digne n’est possible. Ensuite, elle garantit la réussite de notre agriculture et la sécurité alimentaire du pays, notamment grâce aux techniques modernes comme le goutte-à-goutte. Enfin, si chaque famille fermait le robinet pendant le brossage des dents et réparait immédiatement les fuites, nous économiserions des millions de litres chaque année.\nEn conclusion, ne gaspillons plus jamais l’eau ! Agissons avec responsabilité afin que les générations futures profitent elles aussi de ce bienfait vital.'
			},
			{
				title: 'Protéger nos forêts algériennes contre les incendies et la désertification',
				prompt:
					'Après avoir participé à une journée de sensibilisation sur le Barrage Vert et la protection des forêts, rédigez un texte argumentatif (12 à 15 lignes) pour inciter les jeunes Algériens à protéger et reboiser les espaces forestiers.',
				notes: [
					'Introduction : Présentez le rôle vital des forêts en Algérie et annoncez votre thèse.',
					'Développement : Développez 3 arguments convaincants (purification de l’air, lutte contre la désertification grâce au Barrage Vert, prévention des incendies et reboisement citoyen).',
					'Outils BEM obligatoires : Connecteurs d’énumération, une phrase conditionnelle avec « Si », un rapport de but au subjonctif (afin que / pour que) et une conclusion à l’impératif présent.'
				],
				modelAnswer:
					'Protégeons nos forêts, poumons verts de l’Algérie !\nDes montagnes du Nord aux steppes du Barrage Vert, nos forêts constituent un patrimoine naturel d’une valeur inestimable. J’estime que les protéger contre les incendies et participer au reboisement sont des devoirs citoyens prioritaires.\nTout d’abord, les arbres purifient l’air que nous respirons en absorbant le gaz carbonique et en produisant de l’oxygène. Ensuite, grâce à leurs racines profondes, les forêts retiennent la terre fertile et freinent l’avancée du désert, comme le prouve le projet national du Barrage Vert. Enfin, si chacun évitait d’allumer des feux en forêt, ramassait ses déchets en verre et plantait un arbre chaque année, nos massifs forestiers resteraient verts et vivants malgré les étés chauds.\nMobilisons-nous dès aujourd’hui ! Respectons et reboisons nos forêts afin que l’Algérie demeure belle et verdoyante.'
			},
			{
				title: 'Respecter le code de la route pour sauver des vies',
				prompt:
					'Votre collège organise une semaine de prévention routière. Rédigez un texte argumentatif (12 à 15 lignes) afin de sensibiliser les conducteurs et les piétons aux dangers de l’imprudence et de les inciter à respecter le code de la route.',
				notes: [
					'Introduction : Évoquez la gravité des accidents de la route et exprimez votre thèse (la sécurité routière est l’affaire de tous).',
					'Développement : Présentez 3 arguments précis (dangers de l’excès de vitesse et du téléphone, efficacité des gestes de sécurité comme la ceinture et les passages piétons, rôle de la courtoisie et de la vigilance).',
					'Outils BEM obligatoires : Connecteurs (D’abord, De plus, Enfin), une hypothèse avec « Si + imparfait / conditionnel », une opposition (malgré ou bien que) et un appel final à l’impératif.'
				],
				modelAnswer:
					'Sur la route, la prudence sauve des vies !\nMalgré les campagnes de sensibilisation, les accidents de la route continuent de briser trop de familles dans notre pays. Je suis persuadé que ce drame peut être évité si chaque conducteur et chaque piéton respecte rigoureusement le code de la route.\nD’abord, l’excès de vitesse, les dépassements dangereux et l’usage du téléphone au volant diminuent les réflexes et transforment un simple trajet en tragédie. De plus, si tous les automobilistes attachaient leur ceinture de sécurité, contrôlaient leurs freins et ralentissaient près des écoles, le nombre de victimes diminuerait nettement. Enfin, les piétons ont eux aussi une responsabilité en traversant uniquement sur les passages protégés et en restant vigilants.\nEn conclusion, soyons courtois et prudents sur la route ! Respectons le code de la route afin que chaque départ se termine par un retour heureux.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Un titre pertinent, une thèse claire, 3 arguments avec exemples, les rapports logiques (condition/opposition/but) et un appel final à l’impératif ou au subjonctif.',
			[
				{ text: 'Un texte de trois lignes sans paragraphe ni arguments.', diagnosticFeedback: 'الوضعية الإدماجية للـ BEM تتطلب 12 إلى 15 سطراً وثلاث فقرات منظمة.' },
				{ text: 'Un récit imaginaire sans aucun lien avec la consigne.', diagnosticFeedback: 'الخروج عن الموضوع يُفقد التلميذ علامة الملاءمة (Pertinence).' },
				{ text: 'La copie mot à mot du texte de compréhension.', diagnosticFeedback: 'نسخ نص الفهم يُعدّ غياباً للإنتاج الشخصي.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Quels atouts garantissent 7/7 à la Situation d’intégration du BEM de Français ?',
				questionTextAr: 'ما المقوّمات التي تضمن 7/7 في الوضعية الإدماجية ليوم امتحان شهادة التعليم المتوسط (BEM)؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'عنوان، مقدمة بأطروحة، 3 حجج وأمثلة مرتبة، توظيف الشرط والمعارضة والهدف، وخاتمة تحفيزية بالأمر أو المنصوب.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration type BEM (07 pts)',
				points: 7,
				instruction: 'Rédigez un texte argumentatif complet (12 à 15 lignes) en respectant la méthodologie du BEM :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: `Sujet type BEM : ${item.title}`,
						sujetUnPrompt: item.prompt,
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et respect de la consigne (2 pts) + Cohérence, plan en 3 paragraphes et connecteurs (2 pts) + Correction linguistique : condition, opposition, but/subjonctif, impératif, accords (2 pts) + Présentation et richesse lexicale (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'خصّص 10 دقائق للمسوّدة (المخطط: أطروحة + 3 حجج + أمثلة + خاتمة) قبل التحرير النظيف.',
				'أدرج بوعي جملة شرطية بـ Si وجملة معارضة (Bien que / Malgré) وجملة هدف بـ afin que + subjonctif.',
				'اختم بنداء مؤثر بصيغة الأمر الحاضر (Protégeons / Respectons / Agissons !) وراجع التوافق والإملاء.'
			],
			solutionStepsAr: [
				`الموضوع: ${item.title}`,
				'هيكلة النص في 3 فقرات واضحة مع 3 حجج متدرّجة وأمثلة جزائرية واقعية.',
				'إدماج الشرط والمعارضة والهدف والأمر ومراجعة الإملاء والترقيم خلال آخر 15 دقيقة.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T3: FrenchParameterizedTemplate[] = [
	compEnvironnementEau4amT3,
	compSecuriteRoutiereBem4amT3,
	langConditionOppositionModes4amT3,
	langFamilleViseeSyntheseBem4amT3,
	writeBemEnvironnementCivisme4amT3
];
