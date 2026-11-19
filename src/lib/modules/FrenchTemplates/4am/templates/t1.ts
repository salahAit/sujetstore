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
// 1. Compréhension BEM 1 (7 pts) — Valoriser le patrimoine algérien (Argumentatif)
// ═══════════════════════════════════════════════════════════════════════════════
const compPatrimoineAlgerie4amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t1_comp_patrimoine_algerie',
	grade: '4am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): نص حجاجي لتثمين التراث الجزائري (القصبة، تلمسان، غرداية) (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t1_structure_argumentatif',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Pourquoi faut-il absolument visiter la Casbah d’Alger ?',
				paragraphs: [
					'Surplombant majestueusement la baie d’Alger, la Casbah est le cœur historique de notre capitale. Je suis convaincu que cette citadelle millénaire, classée au patrimoine mondial de l’UNESCO en 1992, est une destination culturelle incontournable pour tout voyageur.',
					'D’abord, la Casbah offre un voyage fascinant dans l’architecture islamique traditionnelle, comme ses maisons blanches à patio intérieur, ses fontaines anciennes et ses mosquées séculaires. Ensuite, [[elle]] témoigne d’une mémoire héroïque, notamment à travers ses ruelles escarpées qui abritèrent les héros de la Guerre de Libération Nationale. Enfin, à quelques kilomètres de là, Djamaâ El-Djazaïr complète magnifiquement cette découverte en unissant tradition et modernité.',
					'C’est pourquoi je pense que découvrir la Casbah d’Alger est une expérience inoubliable que nous devons tous valoriser et protéger.'
				],
				source: 'D’après un dossier culturel algérien (Préparation BEM)',
				glossary: [
					{ term: 'incontournable', meaning: 'très important, qu’il ne faut pas manquer' },
					{ term: 'séculaire', meaning: 'qui existe depuis plusieurs siècles' }
				],
				theme: 'La Casbah d’Alger (et le patrimoine de la capitale)',
				these: 'La Casbah d’Alger est une destination culturelle incontournable pour tout voyageur.',
				arg1: 'Elle offre un voyage fascinant dans l’architecture islamique traditionnelle (maisons à patio, mosquées).',
				arg2: 'Elle témoigne d’une mémoire héroïque liée à la Guerre de Libération Nationale.',
				tf1Q: 'La Casbah d’Alger a été classée par l’UNESCO en 1992.',
				tf1A: 'Vrai',
				tf2Q: 'L’auteur pense que la Casbah ne présente aucun intérêt historique.',
				tf2A: 'Faux',
				tf2C: 'L’auteur affirme qu’elle témoigne d’une mémoire héroïque et est une destination culturelle incontournable.',
				refWord: 'elle',
				refAns: 'la Casbah d’Alger',
				lexQ: 'Relevez du texte un verbe d’opinion et deux adjectifs mélioratifs.',
				lexA: 'Verbe d’opinion : suis convaincu / pense | Adjectifs mélioratifs : millénaire, incontournable, fascinant, héroïque, inoubliable (deux au choix).',
				mcqCorrect: 'L’auteur défend la thèse que la Casbah d’Alger est un joyau architectural et historique incontournable.',
				mcqD1: 'L’auteur déconseille aux touristes de visiter Alger.',
				mcqD2: 'La Casbah d’Alger a été construite en 2020.',
				mcqD3: 'Le texte raconte une tempête de neige à Constantine.'
			},
			{
				title: 'Tlemcen, perle du Maghreb et capitale de l’art islamique',
				paragraphs: [
					'Située à l’extrême ouest de l’Algérie, Tlemcen porte fièrement le surnom de perle du Maghreb. J’estime que cette ville historique mérite pleinement d’être découverte par les amoureux de culture et de nature.',
					'Tout d’abord, Tlemcen brille par la richesse exceptionnelle de ses monuments, notamment la Grande Mosquée construite en 1082 sous les Almoravides et les ruines majestueuses de Mansourah. De plus, [[cette cité raffinée]] bénéficie d’un cadre naturel enchanteur, comme le plateau verdoyant de Lalla Setti et les cascades d’El-Ourit. Enfin, son artisanat authentique et l’hospitalité chaleureuse de ses habitants charment chaque visiteur.',
					'En conclusion, visiter Tlemcen permet de plonger au cœur de la civilisation algérienne dans toute sa splendeur.'
				],
				source: 'D’après une revue du patrimoine algérien (Préparation BEM)',
				glossary: [
					{ term: 'enchanteur', meaning: 'très agréable, qui émerveille' },
					{ term: 'splendeur', meaning: 'très grande beauté, éclat remarquable' }
				],
				theme: 'La ville de Tlemcen et ses atouts touristiques',
				these: 'Tlemcen mérite pleinement d’être découverte par les amoureux de culture et de nature.',
				arg1: 'Elle brille par la richesse exceptionnelle de ses monuments historiques (la Grande Mosquée de 1082, Mansourah).',
				arg2: 'Elle bénéficie d’un cadre naturel enchanteur (plateau de Lalla Setti, cascades d’El-Ourit).',
				tf1Q: 'La Grande Mosquée de Tlemcen a été construite en 1082.',
				tf1A: 'Vrai',
				tf2Q: 'Tlemcen se situe à l’extrême est de l’Algérie.',
				tf2A: 'Faux',
				tf2C: 'Elle est située à l’extrême ouest de l’Algérie.',
				refWord: 'cette cité raffinée',
				refAns: 'la ville de Tlemcen',
				lexQ: 'Relevez du texte un verbe d’opinion et deux connecteurs d’énumération.',
				lexA: 'Verbe d’opinion : estime | Connecteurs d’énumération : Tout d’abord, De plus, Enfin (deux au choix).',
				mcqCorrect: 'L’auteur soutient que Tlemcen mérite d’être visitée pour ses monuments islamiques, sa nature et son artisanat.',
				mcqD1: 'Tlemcen ne possède aucun monument ancien.',
				mcqD2: 'La Grande Mosquée de Tlemcen se trouve à Annaba.',
				mcqD3: 'L’auteur affirme que Tlemcen manque d’hospitalité.'
			},
			{
				title: 'La Vallée du M’Zab : une leçon d’architecture durable à découvrir',
				paragraphs: [
					'Au nord du Sahara algérien, la Vallée du M’Zab, dans la wilaya de Ghardaïa, offre un spectacle architectural unique au monde. Personnellement, j’affirme que ce site classé par l’UNESCO en 1982 constitue l’une des plus belles merveilles de l’Algérie.',
					'D’abord, ses cinq ksour millénaires, tels que Ghardaïa et Beni Isguen, prouvent le génie des bâtisseurs anciens qui ont conçu des ruelles ombragées parfaitement adaptées à la chaleur saharienne. Ensuite, [[la vallée]] séduit par son système ingénieux de partage des eaux de pluie et par ses palmeraies verdoyantes. Enfin, l’esprit d’entraide et la propreté exemplaire des quartiers forcent le respect de tous les visiteurs.',
					'Donc, découvrir la Vallée du M’Zab, c’est admirer un équilibre harmonieux entre l’homme, sa foi et son environnement.'
				],
				source: 'D’après un cahier de découverte saharienne (Préparation BEM)',
				glossary: [
					{ term: 'durable', meaning: 'respectueux de l’environnement et conçu pour durer longtemps' },
					{ term: 'forcer le respect', meaning: 'inspirer une profonde admiration' }
				],
				theme: 'La Vallée du M’Zab (Ghardaïa)',
				these: 'La Vallée du M’Zab constitue l’une des plus belles merveilles architecturales et écologiques de l’Algérie.',
				arg1: 'Ses cinq ksour millénaires prouvent le génie d’une architecture adaptée au climat saharien.',
				arg2: 'Elle séduit par son système ingénieux de partage de l’eau et ses palmeraies verdoyantes.',
				tf1Q: 'Les ruelles ombragées des ksour du M’Zab sont bien adaptées à la chaleur saharienne.',
				tf1A: 'Vrai',
				tf2Q: 'La Vallée du M’Zab est située au bord de la mer Méditerranée.',
				tf2A: 'Faux',
				tf2C: 'Elle se situe au nord du Sahara algérien, dans la wilaya de Ghardaïa.',
				refWord: 'la vallée',
				refAns: 'la Vallée du M’Zab',
				lexQ: 'Relevez du texte un verbe d’opinion et un exemple introduit par « tels que ».',
				lexA: 'Verbe d’opinion : affirme | Exemple : Ghardaïa et Beni Isguen.',
				mcqCorrect: 'L’auteur prouve que la Vallée du M’Zab est une merveille d’architecture durable, de gestion de l’eau et de solidarité.',
				mcqD1: 'Les ksour du M’Zab ont été bâtis au XXIe siècle.',
				mcqD2: 'Il n’y a aucune palmeraie dans la région de Ghardaïa.',
				mcqD3: 'L’UNESCO a refusé de classer la Vallée du M’Zab.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'أعد قراءة المقدمة لاستخراج أطروحة الكاتب الحقيقية.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه المعلومة تخالف المعطيات الجغرافية والتاريخية للنص.' },
				{ text: v.mcqD3, diagnosticFeedback: 'تحقّق من الحجج الواردة في الفقرة الثانية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle thèse l’auteur défend-il dans le texte « ${v.title} » ?`,
				questionTextAr: `ما الأطروحة التي يدافع عنها الكاتب في نص « ${v.title} »؟`,
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
				instruction: 'Lisez attentivement ce texte argumentatif (type BEM) puis répondez aux questions :',
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
						content: '1) Quel est le thème abordé dans ce texte ? Quelle est la thèse défendue par l’auteur ? (01.5 pt)',
						answer: `Thème : ${v.theme}.\nThèse : ${v.these}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) Relevez du deuxième paragraphe deux arguments avancés par l’auteur pour convaincre le lecteur. (02 pts)',
						answer: `1er argument : ${v.arg1}\n2e argument : ${v.arg2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, mark: '0.75' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C, mark: '0.75' }
						]
					},
					{
						type: 'text',
						content: `4) Que remplace le mot souligné « ${v.refWord} » dans le deuxième paragraphe ? (01 pt)`,
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
				'استخرج الموضوع (Thème) في كلمة/عبارة والأطروحة (Thèse) من الفقرة الأولى قبل D’abord.',
				'استخرج الحجتين من الفقرة الثانية بعد الروابط (D’abord / Tout d’abord و Ensuite / De plus).',
				'في سؤال Vrai / Faux برّر دائماً الجملة الخاطئة بالعودة الدقيقة إلى النص.'
			],
			solutionStepsAr: [
				`الموضوع: ${v.theme} | الأطروحة: ${v.these}`,
				`الحجتان: ${v.arg1} | ${v.arg2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension BEM 2 (7 pts) — Merveilles des régions algériennes
// ═══════════════════════════════════════════════════════════════════════════════
const compMerveillesRegions4amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t1_comp_merveilles_regions',
	grade: '4am',
	trimesterId: 't1',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): روائع الجزائر (قسنطينة، الطاسيلي ناجر، تيمقاد وقلعة بني حماد) (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t1_verbes_opinion_connecteurs',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Constantine, la ville des ponts suspendus et du savoir',
				paragraphs: [
					'Édifiée sur un impressionnant rocher surplombant les gorges du Rhumel, Constantine est sans doute l’une des cités les plus fascinantes du bassin méditerranéen. Je crois fermement que chaque Algérien devrait la découvrir au moins une fois.',
					'Premièrement, ses célèbres ponts suspendus, tels que le pont Sidi M’Cid et le pont Mellah Slimane, offrent des panoramas vertigineux qui émerveillent les visiteurs. Deuxièmement, [[cette ville millénaire]] est un haut lieu du savoir islamique et de la réforme : c’est ici que Cheikh Abdelhamid Ben Badis a enseigné et éveillé la conscience nationale. Enfin, ses ruelles anciennes et la dinanderie traditionnelle témoignent d’un savoir-faire séculaire.',
					'Ainsi, Constantine unit harmonieusement beauté naturelle, génie architectural et rayonnement culturel.'
				],
				source: 'D’après un texte argumentatif de préparation au BEM (4AM)',
				glossary: [
					{ term: 'vertigineux', meaning: 'très haut et très impressionnant' },
					{ term: 'dinanderie', meaning: 'artisanat traditionnel du travail du cuivre' }
				],
				tableRows: [
					{ col: 'Thèse de l’auteur', val: 'Constantine est une cité fascinante que chacun devrait découvrir.' },
					{ col: 'Un argument culturel', val: 'C’est un haut lieu du savoir où Cheikh Ben Badis a enseigné.' },
					{ col: 'Un exemple de monument', val: 'Le pont Sidi M’Cid (ou le pont Mellah Slimane).' }
				],
				q1: 'Quelle grande figure algérienne du savoir a marqué l’histoire de Constantine selon le texte ?',
				a1: 'Cheikh Abdelhamid Ben Badis y a enseigné et éveillé la conscience nationale.',
				tf1Q: 'Constantine est construite sur un rocher dominant les gorges du Rhumel.',
				tf1A: 'Vrai',
				tf2Q: 'L’auteur n’exprime aucune opinion personnelle dans ce texte.',
				tf2A: 'Faux',
				tf2C: 'L’auteur emploie « sans doute », « Je crois fermement » et un vocabulaire mélioratif.',
				refWord: 'cette ville millénaire',
				refAns: 'Constantine',
				visee: 'Valoriser la ville de Constantine et convaincre le lecteur de la visiter.',
				mcqCorrect: 'Constantine mérite d’être visitée pour ses ponts spectaculaires, l’héritage de Cheikh Ben Badis et son artisanat.',
				mcqD1: 'Constantine est une ville récente sans histoire ni ponts.',
				mcqD2: 'Cheikh Ben Badis n’a jamais enseigné à Constantine.',
				mcqD3: 'Les gorges du Rhumel se trouvent à Tlemcen.'
			},
			{
				title: 'Le Tassili n’Ajjer, musée naturel à ciel ouvert',
				paragraphs: [
					'Au sud-est de l’Algérie s’étend le Tassili n’Ajjer, un immense plateau rocheux inscrit au patrimoine mondial de l’UNESCO depuis 1982. Je pense que ce sanctuaire saharien représente l’un des plus grands trésors naturels et culturels de l’humanité.',
					'D’abord, [[il]] abrite plus de quinze mille gravures et peintures rupestres qui racontent la vie ancienne du Sahara lorsque cette région était verdoyante. Ensuite, ses forêts de pierre sculptées par le vent, ses arches naturelles et ses dunes dorées, notamment autour de Djanet, créent des paysages incomparables. Enfin, des espèces végétales rarissimes, comme le cyprès millénaire du Tassili, y survivent encore.',
					'C’est pourquoi la préservation et la découverte responsable du Tassili n’Ajjer concernent toute la jeunesse algérienne.'
				],
				source: 'D’après un dossier sur le patrimoine saharien algérien (BEM)',
				glossary: [
					{ term: 'rupestre', meaning: 'gravé ou peint sur la roche dans la préhistoire' },
					{ term: 'sanctuaire', meaning: 'lieu précieux protégé pour sa valeur exceptionnelle' }
				],
				tableRows: [
					{ col: 'Thèse de l’auteur', val: 'Le Tassili n’Ajjer est l’un des plus grands trésors naturels et culturels de l’humanité.' },
					{ col: 'Un argument naturel', val: 'Ses forêts de pierre, arches naturelles, dunes dorées et cyprès millénaires.' },
					{ col: 'Un exemple géographique', val: 'La région autour de Djanet (ou le cyprès du Tassili).' }
				],
				q1: 'Que révèlent les gravures et peintures rupestres du Tassili n’Ajjer ?',
				a1: 'Elles racontent la vie ancienne du Sahara lorsque cette région était verdoyante.',
				tf1Q: 'Le Tassili n’Ajjer est inscrit au patrimoine mondial de l’UNESCO depuis 1982.',
				tf1A: 'Vrai',
				tf2Q: 'On ne trouve aucune espèce végétale rare dans le Tassili n’Ajjer.',
				tf2A: 'Faux',
				tf2C: 'Des espèces rarissimes comme le cyprès millénaire du Tassili y survivent encore.',
				refWord: 'il',
				refAns: 'le Tassili n’Ajjer',
				visee: 'Convaincre de la valeur universelle du Tassili n’Ajjer et inciter à sa découverte responsable et sa protection.',
				mcqCorrect: 'Le Tassili n’Ajjer est un trésor mondial mêlant art rupestre, paysages sculptés près de Djanet et flore millénaire.',
				mcqD1: 'Le Tassili n’Ajjer se situe sur la côte nord d’Alger.',
				mcqD2: 'Il ne reste aucune gravure rupestre sur le plateau.',
				mcqD3: 'Le texte affirme que le Sahara n’a aucun intérêt culturel.'
			},
			{
				title: 'Timgad et la Kalâa des Béni Hammad, témoins vivants de notre histoire',
				paragraphs: [
					'Peu de pays disposent d’une diversité historique aussi riche que l’Algérie. À mon avis, la visite de sites prestigieux comme Timgad et la Kalâa des Béni Hammad est indispensable pour comprendre la profondeur de notre patrimoine.',
					'Tout d’abord, située dans la wilaya de Batna, Timgad impressionne par son plan géométrique parfaitement conservé, ses rues pavées et sa bibliothèque antique. De plus, dans la wilaya de M’Sila, la Kalâa des Béni Hammad, fondée en 1007, révèle la maîtrise architecturale de la civilisation islamique maghrébine grâce à [[son haut minaret]] et aux vestiges de ses palais. Enfin, ces deux sites classés attirent chaque année chercheurs et familles algériennes.',
					'En somme, connaître et protéger ces monuments historiques renforce notre fierté nationale et enrichit notre culture.'
				],
				source: 'D’après un livret éducatif sur les monuments algériens (BEM)',
				glossary: [
					{ term: 'plan géométrique', meaning: 'organisation régulière des rues se coupant à angle droit' },
					{ term: 'en somme', meaning: 'en résumé, pour conclure' }
				],
				tableRows: [
					{ col: 'Thèse de l’auteur', val: 'La visite de Timgad et de la Kalâa des Béni Hammad est indispensable pour comprendre notre patrimoine.' },
					{ col: 'Un argument sur Timgad', val: 'Son plan géométrique conservé, ses rues pavées et sa bibliothèque antique.' },
					{ col: 'Un argument sur la Kalâa', val: 'Elle révèle la maîtrise architecturale islamique (minaret, vestiges de palais).' }
				],
				q1: 'Dans quelles wilayas se trouvent respectivement Timgad et la Kalâa des Béni Hammad ?',
				a1: 'Timgad se trouve dans la wilaya de Batna et la Kalâa des Béni Hammad dans la wilaya de M’Sila.',
				tf1Q: 'La Kalâa des Béni Hammad a été fondée en 1007.',
				tf1A: 'Vrai',
				tf2Q: 'Selon l’auteur, visiter ces sites n’apporte rien à la culture des jeunes.',
				tf2A: 'Faux',
				tf2C: 'Connaître ces monuments renforce notre fierté nationale et enrichit notre culture.',
				refWord: 'son haut minaret',
				refAns: 'le haut minaret de la Kalâa des Béni Hammad',
				visee: 'Valoriser Timgad et la Kalâa des Béni Hammad et inciter à les connaître et les protéger.',
				mcqCorrect: 'Timgad (Batna) et la Kalâa des Béni Hammad (M’Sila) témoignent de la richesse historique et architecturale de l’Algérie.',
				mcqD1: 'Timgad se trouve dans la wilaya de M’Sila.',
				mcqD2: 'La Kalâa des Béni Hammad a été bâtie en 1992.',
				mcqD3: 'L’auteur estime que les monuments anciens ne doivent pas être protégés.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'راجع المواقع والولايات المذكورة بدقة في النص.' },
				{ text: v.mcqD2, diagnosticFeedback: 'التاريخ أو المعلومة تناقض ما جاء في الفقرة الثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'انظر إلى الخاتمة لتحديد موقف الكاتب الإيجابي.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture de « ${v.title} », quelle synthèse est fidèle au texte ?`,
				questionTextAr: `اقرأ نص « ${v.title} » واختر الخلاصة الصحيحة:`,
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
				instruction: 'Lisez attentivement le texte puis répondez aux questions de compréhension (type BEM) :',
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
						content: '1) Complétez le tableau d’analyse argumentative suivant à partir du texte (01.5 pt) :'
					},
					{
						type: 'table',
						headers: ['Élément argumentatif', 'Réponse tirée du texte'],
						cells: [],
						rows: v.tableRows.map((r) => [
							{ content: r.col, bold: true },
							{ content: '....................................', answer: r.val, mark: '0.5' }
						]),
						align: 'left',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `2) Répondez à la question suivante : ${v.q1} (01.5 pt)`,
						answer: v.a1,
						mark: '1.5'
					},
					{
						type: 'true_false',
						items: [
							{ q: v.tf1Q, a: v.tf1A, mark: '1' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `4) À quoi renvoie l’expression soulignée « ${v.refWord} » ? (01 pt)`,
						answer: `« ${v.refWord} » renvoie à : ${v.refAns}.`,
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
				'استخرج الأطروحة من الفقرة الأولى والحجة والمثال من الفقرة الثانية لملء الجدول.',
				'في سؤال الغرض التواصلي (Visée communicative)، ابدأ بفعل في المصدر مثل: Valoriser... / Convaincre... et inciter à...',
				'تحقّق من مؤشرات حضور الكاتب (Je crois, À mon avis, adjectifs mélioratifs).'
			],
			solutionStepsAr: [
				v.tableRows.map((r) => `${r.col} : ${r.val}`).join(' | '),
				`الإجابة: ${v.a1}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`الغرض التواصلي: ${v.visee}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue BEM 1 (6 pts) — Complétive vs Relative & Connecteurs
// ═══════════════════════════════════════════════════════════════════════════════
const langCompletiveRelative4amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t1_lang_completive_relative',
	grade: '4am',
	trimesterId: 't1',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (BEM 4AM): الجملة التكميلية والموصولة وروابط الترتيب الحجاجي (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t1_subordonnee_completive_relative',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				dist1Q: 'a) Je pense que la Casbah d’Alger mérite la visite de tous les voyageurs.',
				dist1A: 'a) « que la Casbah d’Alger mérite la visite de tous les voyageurs » : Proposition subordonnée complétive (précédée du verbe « pense », fonction COD).',
				dist2Q: 'b) La citadelle que les visiteurs admirent surplombe la mer Méditerranée.',
				dist2A: 'b) « que les visiteurs admirent » : Proposition subordonnée relative (précédée du nom antécédent « La citadelle »).',
				dist3Q: 'c) Les historiens affirment que la Grande Mosquée de Tlemcen date de 1082.',
				dist3A: 'c) « que la Grande Mosquée de Tlemcen date de 1082 » : Proposition subordonnée complétive (COD du verbe « affirment »).',
				connQ: 'Complétez ce paragraphe argumentatif avec les connecteurs : (Enfin - D’abord - C’est pourquoi - Ensuite)\n  « ............ , Constantine possède des ponts suspendus uniques. ............ , elle a abrité de grands savants. ............ , son artisanat est très riche. ............ , cette ville est inoubliable. »',
				connA: 'D’abord, Constantine possède des ponts suspendus uniques. Ensuite, elle a abrité de grands savants. Enfin, son artisanat est très riche. C’est pourquoi cette ville est inoubliable.',
				clsItems: ['Je pense que', 'notamment Timgad', 'D’abord', 'comme les ksour', 'J’estime que', 'Ensuite'],
				c1: { header: 'Verbes d’opinion', items: ['Je pense que', 'J’estime que'] },
				c2: { header: 'Connecteurs d’énumération', items: ['D’abord', 'Ensuite'] },
				c3: { header: 'Introducteurs d’exemples', items: ['notamment Timgad', 'comme les ksour'] },
				mcqQ: 'Quelle est la nature de la proposition « que nous visitons » dans : « La vallée que nous visitons est classée par l’UNESCO » ?',
				mcqCorrect: 'Proposition subordonnée relative (précédée du nom « La vallée »)',
				mcqD1: 'Proposition subordonnée complétive',
				mcqD2: 'Proposition subordonnée de cause',
				mcqD3: 'Proposition subordonnée de but'
			},
			{
				dist1Q: 'a) Les guides expliquent que le Tassili n’Ajjer compte quinze mille gravures.',
				dist1A: 'a) « que le Tassili n’Ajjer compte quinze mille gravures » : Proposition subordonnée complétive (COD du verbe « expliquent »).',
				dist2Q: 'b) Les gravures que les archéologues étudient remontent à plusieurs millénaires.',
				dist2A: 'b) « que les archéologues étudient » : Proposition subordonnée relative (complément de l’antécédent « Les gravures »).',
				dist3Q: 'c) Nous savons que la Vallée du M’Zab respecte parfaitement le climat désertique.',
				dist3A: 'c) « que la Vallée du M’Zab respecte parfaitement le climat désertique » : Proposition subordonnée complétive (COD de « savons »).',
				connQ: 'Complétez avec : (De plus - Tout d’abord - Donc - Enfin)\n  « ............ , Tlemcen conserve de superbes monuments islamiques. ............ , le plateau de Lalla Setti offre une vue panoramique. ............ , l’accueil des habitants est chaleureux. ............ , je vous conseille vivement de la visiter. »',
				connA: 'Tout d’abord, Tlemcen conserve de superbes monuments islamiques. De plus, le plateau de Lalla Setti offre une vue panoramique. Enfin, l’accueil des habitants est chaleureux. Donc, je vous conseille vivement de la visiter.',
				clsItems: ['Je crois que', 'tel que Sidi M’Cid', 'En premier lieu', 'par exemple Djanet', 'J’affirme que', 'De plus'],
				c1: { header: 'Verbes d’opinion', items: ['Je crois que', 'J’affirme que'] },
				c2: { header: 'Connecteurs d’énumération', items: ['En premier lieu', 'De plus'] },
				c3: { header: 'Introducteurs d’exemples', items: ['tel que Sidi M’Cid', 'par exemple Djanet'] },
				mcqQ: 'Quelle est la nature grammaticale du mot « que » dans : « Je crois que l’Algérie est un pays hospitalier » ?',
				mcqCorrect: 'Une conjonction de subordination (introduisant une complétive)',
				mcqD1: 'Un pronom relatif remplaçant un nom',
				mcqD2: 'Une préposition de lieu',
				mcqD3: 'Un adverbe de quantité'
			},
			{
				dist1Q: 'a) L’architecte estime que Djamaâ El-Djazaïr unit art traditionnel et modernité.',
				dist1A: 'a) « que Djamaâ El-Djazaïr unit art traditionnel et modernité » : Proposition subordonnée complétive (COD de « estime »).',
				dist2Q: 'b) Le minaret que l’on aperçoit depuis la baie mesure 265 mètres.',
				dist2A: 'b) « que l’on aperçoit depuis la baie » : Proposition subordonnée relative (complément de l’antécédent « Le minaret »).',
				dist3Q: 'c) Je suis persuadé que la Kalâa des Béni Hammad mérite d’être mieux connue.',
				dist3A: 'c) « que la Kalâa des Béni Hammad mérite d’être mieux connue » : Proposition subordonnée complétive.',
				connQ: 'Complétez avec : (En conclusion - D’abord - En outre - Enfin)\n  « ............ , le Jardin d’Essai abrite des plantes rares. ............ , ses allées offrent une fraîcheur agréable. ............ , il est facile d’accès au cœur d’Alger. ............ , c’est un lieu idéal pour les familles. »',
				connA: 'D’abord, le Jardin d’Essai abrite des plantes rares. En outre, ses allées offrent une fraîcheur agréable. Enfin, il est facile d’accès au cœur d’Alger. En conclusion, c’est un lieu idéal pour les familles.',
				clsItems: ['Je trouve que', 'comme Timgad', 'Tout d’abord', 'telle la Casbah', 'Je juge que', 'En outre'],
				c1: { header: 'Verbes d’opinion', items: ['Je trouve que', 'Je juge que'] },
				c2: { header: 'Connecteurs d’énumération', items: ['Tout d’abord', 'En outre'] },
				c3: { header: 'Introducteurs d’exemples', items: ['comme Timgad', 'telle la Casbah'] },
				mcqQ: 'Dans quelle phrase trouve-t-on une proposition subordonnée complétive ?',
				mcqCorrect: 'Les voyageurs affirment que les paysages du Hoggar sont grandioses.',
				mcqD1: 'Les paysages que les voyageurs photographient sont grandioses.',
				mcqD2: 'La mosquée qui domine le ksar date du XIe siècle.',
				mcqD3: 'La région où se trouve Timgad est chargée d’histoire.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'انظر إلى الكلمة التي تسبق (que) مباشرة: اسم = موصولة، فعل = تكميلية.' },
				{ text: s.mcqD2, diagnosticFeedback: 'تأكّد من وظيفة (que) و (qui) بعد الاسم السابق (antécédent).' },
				{ text: s.mcqD3, diagnosticFeedback: 'راجع الفرق بين الجملة التكميلية (بعد فعل) والجملة الموصولة (بعد اسم).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر التحليل النحوي الصحيح وفق منهجية BEM:',
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
				instruction: 'Traitez les exercices de syntaxe et d’organisation argumentative (type BEM) :',
				content: [
					{
						type: 'text',
						content: `1) Relevez la proposition subordonnée dans chaque phrase et précisez s’il s’agit d’une subordonnée complétive ou d’une subordonnée relative (03 pts) :\n  ${s.dist1Q}\n  ${s.dist2Q}\n  ${s.dist3Q}`,
						answer: `${s.dist1A}\n${s.dist2A}\n${s.dist3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) ${s.connQ} (01.5 pt)`,
						answer: s.connA,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) Classez les expressions suivantes dans le tableau (01.5 pt) :\nListe : ${s.clsItems.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: s.c1.header, items: s.c1.items, mark: '0.5' },
							{ header: s.c2.header, items: s.c2.items, mark: '0.5' },
							{ header: s.c3.header, items: s.c3.items, mark: '0.5' }
						]
					})
				]
			},
			hints: [
				'الاختبار الفوري في BEM: فعل + que = Subordonnée complétive | اسم + que = Subordonnée relative.',
				'رتّب الروابط الحجاجية من البداية (D’abord / Tout d’abord) إلى التوسّع (Ensuite / De plus) إلى الخاتمة (Enfin / C’est pourquoi / Donc).',
				'في الجدول فرّق بين أفعال الرأي، روابط الترتيب، وأدوات التمثيل (comme, tel que, notamment).'
			],
			solutionStepsAr: [
				`${s.dist1A} | ${s.dist2A} | ${s.dist3A}`,
				s.connA,
				`${s.c1.header}: ${s.c1.items.join(', ')} | ${s.c2.header}: ${s.c2.items.join(', ')} | ${s.c3.header}: ${s.c3.items.join(', ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue BEM 2 (6 pts) — Présent, modalisation & famille
// ═══════════════════════════════════════════════════════════════════════════════
const langPresentModalisation4amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t1_lang_present_modalisation',
	grade: '4am',
	trimesterId: 't1',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة (BEM 4AM): المضارع الإخباري والذاتية التثمينية وعائلة الكلمات (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t1_present_modalisation',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				pr1Q: 'a) Les touristes (découvrir) ............ la Casbah et (prendre) ............ conscience de sa valeur.',
				pr1A: 'a) Les touristes découvrent la Casbah et prennent conscience de sa valeur.',
				pr2Q: 'b) La Grande Mosquée de Tlemcen (offrir) ............ un chef-d’œuvre que chacun (pouvoir) ............ admirer.',
				pr2A: 'b) La Grande Mosquée de Tlemcen offre un chef-d’œuvre que chacun peut admirer.',
				pr3Q: 'c) Nous (choisir) ............ de valoriser notre patrimoine et nous (devoir) ............ le préserver.',
				pr3A: 'c) Nous choisissons de valoriser notre patrimoine et nous devons le préserver.',
				modQ: 'Réécrivez la phrase suivante en remplaçant les mots neutres par un vocabulaire mélioratif (joyau, splendides, incontestablement) :\n  « La Vallée du M’Zab est un lieu qui possède de beaux monuments. »',
				modA: 'La Vallée du M’Zab est incontestablement un joyau qui possède de splendides monuments.',
				wfRows: [
					{
						verbe: { given: true, value: 'fasciner' },
						nom: { value: 'la fascination', mark: '0.5' },
						adjectif: { value: 'fascinant', mark: '0.5' }
					},
					{
						verbe: { value: 'émerveiller', mark: '0.5' },
						nom: { given: true, value: 'la merveille (l’émerveillement)' },
						adjectif: { value: 'merveilleux', mark: '0.5' }
					}
				],
				mcqQ: 'Choisissez la conjugaison exacte au présent de l’indicatif : « Ce site (accueillir) ...... des visiteurs qui (devoir) ...... respecter sa propreté. »',
				mcqCorrect: 'accueille / doivent',
				mcqD1: 'accueillit / doivent',
				mcqD2: 'accueille / doive',
				mcqD3: 'accueillent / doit'
			},
			{
				pr1Q: 'a) Constantine (accueillir) ............ les voyageurs et leur (offrir) ............ des vues vertigineuses.',
				pr1A: 'a) Constantine accueille les voyageurs et leur offre des vues vertigineuses.',
				pr2Q: 'b) Les chercheurs (venir) ............ étudier Timgad car ils (savoir) ............ son importance historique.',
				pr2A: 'b) Les chercheurs viennent étudier Timgad car ils savent son importance historique.',
				pr3Q: 'c) Tu (pouvoir) ............ visiter le Tassili où la nature (construire) ............ des arches de pierre.',
				pr3A: 'c) Tu peux visiter le Tassili où la nature construit des arches de pierre.',
				modQ: 'Relevez deux indices de subjectivité (modalisation méliorative) dans cette phrase :\n  « Sans aucun doute, les ponts de Constantine offrent un spectacle vraiment exceptionnel. »',
				modA: '1) L’expression de certitude « Sans aucun doute » (ou l’adverbe « vraiment ») | 2) L’adjectif mélioratif « exceptionnel ».',
				wfRows: [
					{
						verbe: { given: true, value: 'charmer' },
						nom: { value: 'le charme', mark: '0.5' },
						adjectif: { value: 'charmant', mark: '0.5' }
					},
					{
						verbe: { value: 'rayonne / rayonner', mark: '0.5' },
						nom: { given: true, value: 'le rayonnement' },
						adjectif: { value: 'rayonnant', mark: '0.5' }
					}
				],
				mcqQ: 'Quelle est la valeur du présent dans : « L’Algérie possède sept sites classés au patrimoine mondial de l’UNESCO » ?',
				mcqCorrect: 'Présent de vérité générale (fait permanent)',
				mcqD1: 'Présent de narration au passé',
				mcqD2: 'Futur proche',
				mcqD3: 'Passé récent'
			},
			{
				pr1Q: 'a) Djamaâ El-Djazaïr (réunir) ............ des fidèles qui (apprécier) ............ la sérénité des lieux.',
				pr1A: 'a) Djamaâ El-Djazaïr réunit des fidèles qui apprécient la sérénité des lieux.',
				pr2Q: 'b) Les artisans de Ghardaïa (produire) ............ des tapis que les familles (choisir) ............ avec soin.',
				pr2A: 'b) Les artisans de Ghardaïa produisent des tapis que les familles choisissent avec soin.',
				pr3Q: 'c) Vous (prendre) ............ le temps d’explorer le Jardin d’Essai et vous (voir) ............ des palmiers centenaires.',
				pr3A: 'c) Vous prenez le temps d’explorer le Jardin d’Essai et vous voyez des palmiers centenaires.',
				modQ: 'Accordez les adjectifs mélioratifs entre parenthèses :\n  « Tlemcen conserve une architecture (harmonieux) ............ et des mosquées (prestigieux) ............ . »',
				modA: 'Tlemcen conserve une architecture harmonieuse et des mosquées prestigieuses.',
				wfRows: [
					{
						verbe: { given: true, value: 'découvrir' },
						nom: { value: 'la découverte', mark: '0.5' },
						adjectif: { value: 'découvert', mark: '0.5' }
					},
					{
						verbe: { value: 'enchanter', mark: '0.5' },
						nom: { given: true, value: 'l’enchantement' },
						adjectif: { value: 'enchanteur (enchanté)', mark: '0.5' }
					}
				],
				mcqQ: 'Choisissez la conjugaison correcte au présent : « Les visiteurs (découvrir) ...... la Kalâa et (prendre) ...... des notes. »',
				mcqCorrect: 'découvrent / prennent',
				mcqD1: 'découvrirent / prirent',
				mcqD2: 'découvrons / prenons',
				mcqD3: 'découvre / prend'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'انتبه للزمن المطلوب (الحاضر الإخباري وليس الماضي البسيط).' },
				{ text: s.mcqD2, diagnosticFeedback: 'تحقّق من مطابقة الفعل مع الفاعل المفرد والجمع.' },
				{ text: s.mcqD3, diagnosticFeedback: 'تذكّر تصريف أفعال الفوج الثالث الشاذة في الحاضر (accueillir, devoir, prendre).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة حول المضارع الإخباري والذاتية التثمينية:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${s.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'II. Fonctionnement de la langue (06 pts)',
				points: 6,
				instruction: 'Traitez les exercices de conjugaison, de modalisation et de lexique suivants :',
				content: [
					{
						type: 'text',
						content: `1) Conjuguez les verbes entre parenthèses au présent de l’indicatif (03 pts) :\n  ${s.pr1Q}\n  ${s.pr2Q}\n  ${s.pr3Q}`,
						answer: `${s.pr1A}\n${s.pr2A}\n${s.pr3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) ${s.modQ} (01 pt)`,
						answer: s.modA,
						mark: '1'
					},
					{
						type: 'text',
						content: '3) Complétez le tableau de la famille de mots (02 pts) :'
					},
					buildFrenchWordFamilyTableBlock(s.wfRows)
				]
			},
			hints: [
				'الأفعال offrir و accueillir و découvrir تأخذ في الحاضر نهايات الفوج الأول (-e, -es, -e, -ons, -ez, -ent).',
				'في الحاضر مع ils: prendre تعطي prennent، و devoir تعطي doivent، و pouvoir تعطي peuvent.',
				'علامات الذاتية التثمينية تشمل ظروف التأكيد (sans aucun doute, vraiment) والصفات الإيجابية.'
			],
			solutionStepsAr: [
				`${s.pr1A} | ${s.pr2A} | ${s.pr3A}`,
				s.modA,
				s.wfRows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' ; ')
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite BEM (7 pts) — Texte argumentatif valorisant une région
// ═══════════════════════════════════════════════════════════════════════════════
const writeArgumentatifRegion4amT1: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t1_write_argumentatif_region',
	grade: '4am',
	trimesterId: 't1',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية (BEM 4AM): نص حجاجي للترويج لمنطقة جزائرية وتثمين تراثها (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t1_rediger_argumentatif_region',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				region: 'Tlemcen, la perle du Maghreb',
				prompt:
					'Votre collège publie une brochure numérique pour faire connaître les plus belles régions d’Algérie. Rédigez un texte argumentatif (12 à 14 lignes) pour convaincre les lecteurs de visiter Tlemcen.',
				notes: [
					'Introduction : Situez Tlemcen (ouest algérien) et formulez clairement votre thèse avec un verbe d’opinion.',
					'Argument 1 (Patrimoine) : La Grande Mosquée (1082), Mansourah et le palais El-Mechouar.',
					'Argument 2 (Nature) : Le plateau de Lalla Setti, les cascades d’El-Ourit et les grottes de Beni Add.',
					'Argument 3 (Culture) : Artisanat traditionnel raffiné et accueil chaleureux des habitants.',
					'Outils obligatoires : Connecteurs d’énumération (D’abord, Ensuite, Enfin), présent de l’indicatif, vocabulaire mélioratif et une conclusion incitative.'
				],
				modelAnswer:
					'Tlemcen, un joyau algérien à découvrir absolument\nSituée à l’extrême ouest de l’Algérie, Tlemcen est surnommée la perle du Maghreb. Je suis convaincu que cette ville millénaire est l’une des destinations culturelles et naturelles les plus fascinantes de notre pays.\nD’abord, Tlemcen possède un patrimoine architectural islamique exceptionnel, comme la Grande Mosquée construite en 1082, les vestiges majestueux de Mansourah et le palais d’El-Mechouar. Ensuite, elle offre des paysages naturels vraiment splendides, notamment le plateau verdoyant de Lalla Setti, les cascades d’El-Ourit et les célèbres grottes de Beni Add. Enfin, les visiteurs apprécient son artisanat authentique ainsi que l’hospitalité généreuse de ses habitants.\nEn conclusion, Tlemcen allie histoire glorieuse, nature apaisante et traditions vivantes. C’est pourquoi je vous invite vivement à la visiter et à préserver ses merveilles !'
			},
			{
				region: 'Constantine, la cité des ponts suspendus',
				prompt:
					'À l’occasion de la Journée mondiale du tourisme, rédigez un texte argumentatif (12 à 14 lignes) pour inciter vos correspondants à découvrir la ville historique de Constantine.',
				notes: [
					'Introduction : Situez Constantine (est algérien, rocher du Rhumel) et exprimez votre thèse.',
					'Argument 1 (Architecture) : Les spectaculaires ponts suspendus (Sidi M’Cid, Mellah Slimane) et les ruelles historiques de la vieille ville.',
					'Argument 2 (Culture et savoir) : La cité du savoir où Cheikh Abdelhamid Ben Badis a enseigné et fondé le mouvement réformiste.',
					'Argument 3 (Traditions) : Artisanat du cuivre (dinanderie), gastronomie authentique et convivialité.',
					'Outils obligatoires : Un verbe d’opinion + subordonnée complétive, connecteurs d’énumération, présent de l’indicatif et vocabulaire mélioratif.'
				],
				modelAnswer:
					'Constantine, la majestueuse cité des ponts et du savoir\nConstruite sur un immense rocher au-dessus des gorges du Rhumel, dans l’est algérien, Constantine impressionne au premier regard. J’estime que cette ville antique est une destination incontournable pour quiconque souhaite découvrir l’âme de l’Algérie.\nTout d’abord, Constantine fascine les voyageurs par ses célèbres ponts suspendus, tels que le pont Sidi M’Cid et le pont Mellah Slimane, qui offrent un panorama vertigineux. Ensuite, cette cité prestigieuse est un phare du savoir et de l’identité nationale, car Cheikh Abdelhamid Ben Badis y a enseigné et formé toute une génération. Enfin, son artisanat traditionnel du cuivre et l’accueil chaleureux de ses habitants rendent chaque séjour inoubliable.\nC’est pourquoi je pense que Constantine mérite d’être visitée, admirée et protégée comme un véritable trésor national.'
			},
			{
				region: 'Le Tassili n’Ajjer et le Sahara algérien',
				prompt:
					'Dans le cadre d’un concours scolaire sur le tourisme durable en Algérie, rédigez un texte argumentatif (12 à 14 lignes) pour convaincre les lecteurs de la beauté unique du Tassili n’Ajjer.',
				notes: [
					'Introduction : Situez le Tassili n’Ajjer (sud-est algérien, près de Djanet, classé UNESCO en 1982) et énoncez votre thèse.',
					'Argument 1 (Patrimoine rupestre) : Plus de quinze mille gravures et peintures préhistoriques racontant l’histoire ancienne du Sahara.',
					'Argument 2 (Paysages) : Forêts de pierre sculptées par le vent, arches naturelles, dunes dorées et couchers de soleil grandioses.',
					'Argument 3 (Sérénité et biodiversité) : Calme apaisant du désert, cyprès millénaire et hospitalité légendaire des habitants de Djanet.',
					'Outils obligatoires : Connecteurs (D’abord, De plus, Enfin), au moins une subordonnée relative, présent de l’indicatif et conclusion.'
				],
				modelAnswer:
					'Le Tassili n’Ajjer, un musée naturel unique au monde\nSitué au sud-est de l’Algérie près de Djanet et classé par l’UNESCO depuis 1982, le Tassili n’Ajjer est un sanctuaire saharien hors du commun. Je suis persuadé que ce plateau majestueux est l’une des plus belles merveilles de notre planète.\nD’abord, ce site abrite plus de quinze mille gravures rupestres qui témoignent de la vie préhistorique lorsque le Sahara était verdoyant. De plus, il offre aux voyageurs des paysages incomparables, comme ses forêts de pierre sculptées par le vent, ses arches naturelles et ses dunes dorées. Enfin, la sérénité du désert, le cyprès millénaire du Tassili et l’hospitalité sincère des habitants de Djanet procurent une émotion inoubliable.\nEn conclusion, découvrir le Tassili n’Ajjer de manière respectueuse est une chance précieuse : protégeons tous ce joyau saharien !'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Une introduction avec thèse claire, 3 arguments illustrés d’exemples reliés par D’abord/Ensuite/Enfin, un vocabulaire mélioratif et une conclusion incitative.',
			[
				{ text: 'Un récit au passé simple racontant uniquement le trajet en bus.', diagnosticFeedback: 'المطلوب نص حجاجي بالمضارع الإخباري وليس سرداً لرحلة.' },
				{ text: 'Trois phrases isolées sans connecteurs ni titre.', diagnosticFeedback: 'الترابط الفقري والروابط الحجاجية أساسية لعلامة 7/7 في BEM.' },
				{ text: 'La recopie directe du texte de compréhension.', diagnosticFeedback: 'نسخ نص الفهم يُفقد التلميذ علامة الوضعية الإدماجية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Quelle structure garantit la note complète (7/7) à la production écrite du Projet 1 (4AM / BEM) ?',
				questionTextAr: 'ما البنية المضمونة لحصد 7/7 في الوضعية الإدماجية للمشروع الأول 4AM (BEM)؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'مقدمة بأطروحة واضحة + 3 حجج وأمثلة مرتّبة بـ D’abord / Ensuite / Enfin + معجم تثميني + خاتمة تحفيزية.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration (07 pts)',
				points: 7,
				instruction: 'Rédigez un texte argumentatif structuré (12 à 14 lignes) conforme aux exigences du BEM :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: `Sujet BEM : Valoriser ${item.region}`,
						sujetUnPrompt: item.prompt,
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et respect du type argumentatif (2 pts) + Cohérence, paragraphes et connecteurs d’énumération (2 pts) + Correction linguistique : présent, complétive/relative, vocabulaire mélioratif, accords (2 pts) + Présentation et originalité (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'قسّم نصّك إلى عنوان وثلاث فقرات واضحة: مقدمة (أطروحة)، عرض (3 حجج + أمثلة)، وخاتمة تحفيزية.',
				'وظّف فعل رأي واحد متبوعاً بجملة تكميلية (Je suis convaincu que...) ومعجماً تثمينياً غنياً.',
				'التزم بزمن الحاضر الإخباري وتجنّب تحويل النص الحجاجي إلى قصة شخصية.'
			],
			solutionStepsAr: [
				`المنطقة: ${item.region}`,
				'صياغة مقدمة بأطروحة + 3 حجج مرتّبة بـ D’abord / Ensuite / Enfin مع أمثلة جزائرية ملموسة.',
				'ختم النص بتأكيد الأطروحة ودعوة واضحة للزيارة والمحافظة على التراث.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T1: FrenchParameterizedTemplate[] = [
	compPatrimoineAlgerie4amT1,
	compMerveillesRegions4amT1,
	langCompletiveRelative4amT1,
	langPresentModalisation4amT1,
	writeArgumentatifRegion4amT1
];
