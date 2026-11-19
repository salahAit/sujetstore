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
// 1. Compréhension de l’écrit 1 (7 pts) — Biographie de savants musulmans/algériens
// ═══════════════════════════════════════════════════════════════════════════════
const compSavantsMusulmans3amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t3_comp_savants_musulmans',
	grade: '3am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): سيرة علماء المسلمين والجزائر (ابن خلدون، ابن الهيثم، الإبراهيمي) (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t3_biographie_portrait',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Ibn Khaldoun, penseur visionnaire et fondateur de la sociologie',
				paragraphs: [
					'Né à Tunis en 1332, Abdourrahmane Ibn Khaldoun était un savant musulman curieux, méthodique et d’une grande rigueur intellectuelle. Après une solide formation en sciences religieuses, en droit et en histoire, il parcourut le Maghreb et séjourna plusieurs années en Algérie, notamment à Béjaïa, à Tlemcen et à Qalâat Béni Salama près de Tiaret.',
					'C’est dans cette forteresse calme d’Algérie que [[ce grand érudit]] rédigea en 1377 son œuvre immortelle, « La Muqaddima » (Les Prolégomènes). Il y analysa avec une précision scientifique les lois qui gouvernent l’essor et le déclin des civilisations. Décédé au Caire en 1406, Ibn Khaldoun demeure admiré dans les universités du monde entier.'
				],
				source: 'D’après une biographie historique pour collégiens (3AM)',
				glossary: [
					{ term: 'rigueur', meaning: 'exactitude et sérieux dans le raisonnement' },
					{ term: 'essor', meaning: 'développement rapide et brillant' }
				],
				bioRows: [
					{ k: 'Nom complet', v: 'Abdourrahmane Ibn Khaldoun' },
					{ k: 'Date et lieu de naissance', v: 'En 1332 à Tunis' },
					{ k: 'Œuvre célèbre (1377)', v: 'La Muqaddima (rédigée à Qalâat Béni Salama, près de Tiaret)' },
					{ k: 'Date et lieu de décès', v: 'En 1406 au Caire' }
				],
				q1: 'Quelles qualités morales et intellectuelles caractérisaient Ibn Khaldoun ?',
				a1: 'Il était curieux, méthodique et doté d’une grande rigueur intellectuelle.',
				tf1Q: 'Ibn Khaldoun a rédigé « La Muqaddima » en Algérie, près de Tiaret.',
				tf1A: 'Vrai',
				tf2Q: 'L’œuvre d’Ibn Khaldoun est aujourd’hui totalement oubliée.',
				tf2A: 'Faux',
				tf2C: 'Ibn Khaldoun demeure admiré dans les universités du monde entier.',
				refWord: 'ce grand érudit',
				refAns: 'Abdourrahmane Ibn Khaldoun',
				lexQ: 'Relevez du texte un adjectif mélioratif qualifiant son œuvre et deux villes algériennes citées.',
				lexA: 'Adjectif mélioratif : immortelle (ou scientifique) | Villes algériennes : Béjaïa, Tlemcen, Tiaret (deux au choix).',
				mcqCorrect: 'Ibn Khaldoun rédigea La Muqaddima en Algérie en 1377 et posa les fondements de la sociologie.',
				mcqD1: 'Ibn Khaldoun n’a jamais séjourné en Algérie.',
				mcqD2: 'Ibn Khaldoun est né au Caire en 1406.',
				mcqD3: 'La Muqaddima est un traité de cuisine médiévale.'
			},
			{
				title: 'Ibn Al-Haytham, pionnier de l’optique et de la méthode expérimentale',
				paragraphs: [
					'Né à Bassora en 965, Hassan Ibn Al-Haytham fut l’un des plus brillants physiciens et mathématiciens de la civilisation islamique. Homme modeste, patient et passionné par la vérité scientifique, il refusait d’accepter une idée sans la vérifier par l’observation et l’expérience rigoureuse.',
					'Dans son célèbre « Traité d’optique » (Kitab Al-Manazir), [[ce savant génial]] expliqua pour la première fois comment l’œil perçoit la lumière et inventa la chambre noire, ancêtre de l’appareil photographique. Il s’éteignit au Caire vers 1040, laissant à l’humanité les bases de la démarche scientifique moderne.'
				],
				source: 'D’après un précis d’histoire des sciences islamiques (3AM)',
				glossary: [
					{ term: 'optique', meaning: 'branche de la physique qui étudie la lumière et la vision' },
					{ term: 'ancêtre', meaning: 'premier modèle qui a donné naissance à un objet moderne' }
				],
				bioRows: [
					{ k: 'Nom complet', v: 'Hassan Ibn Al-Haytham' },
					{ k: 'Date et lieu de naissance', v: 'En 965 à Bassora' },
					{ k: 'Œuvre célèbre', v: 'Le Traité d’optique (Kitab Al-Manazir)' },
					{ k: 'Date et lieu de décès', v: 'Vers 1040 au Caire' }
				],
				q1: 'Sur quels principes reposait la méthode scientifique d’Ibn Al-Haytham ?',
				a1: 'Elle reposait sur la vérification par l’observation et l’expérience rigoureuse.',
				tf1Q: 'Ibn Al-Haytham a inventé la chambre noire, ancêtre de l’appareil photographique.',
				tf1A: 'Vrai',
				tf2Q: 'Ibn Al-Haytham acceptait les théories anciennes sans jamais les vérifier.',
				tf2A: 'Faux',
				tf2C: 'Il refusait d’accepter une idée sans la vérifier par l’observation et l’expérience.',
				refWord: 'ce savant génial',
				refAns: 'Hassan Ibn Al-Haytham',
				lexQ: 'Relevez du texte deux adjectifs du portrait moral d’Ibn Al-Haytham.',
				lexA: 'modeste, patient, passionné, brillants, génial (deux au choix).',
				mcqCorrect: 'Ibn Al-Haytham fonda l’optique moderne grâce à son Traité d’optique et à la méthode expérimentale.',
				mcqD1: 'Ibn Al-Haytham était poète et n’a jamais étudié la lumière.',
				mcqD2: 'Ibn Al-Haytham a vécu au XXe siècle.',
				mcqD3: 'Il rejetait toute forme d’observation scientifique.'
			},
			{
				title: 'Cheikh El-Ibrahimi et Moufdi Zakaria, plumes illustres d’Algérie',
				paragraphs: [
					'L’Algérie s’enorgueillit d’hommes de lettres qui mirent leur plume au service de la foi, du savoir et de la liberté. Né en 1889 à Ras El-Oued (Bordj Bou Arréridj), Cheikh Mohamed Bachir El-Ibrahimi était un écrivain éloquent et un érudit infatigable. Après 1940, il présida l’Association des Oulémas Musulmans Algériens et publia de remarquables articles réunis dans « Ouyoun Al-Bassaïr ».',
					'À la même époque, le poète Moufdi Zakaria, né en 1908 à Beni Isguen (Ghardaïa), écrivit en 1955 l’hymne national algérien « Kassaman ». [[Ces deux figures prestigieuses]] demeurent des modèles d’éloquence, de courage et de fidélité à la patrie.'
				],
				source: 'D’après un livret du patrimoine littéraire algérien (3AM)',
				glossary: [
					{ term: 's’enorgueillir de', meaning: 'être très fier de' },
					{ term: 'éloquent', meaning: 'qui s’exprime avec élégance et force de persuasion' }
				],
				bioRows: [
					{ k: 'Cheikh El-Ibrahimi (Naissance)', v: 'En 1889 à Ras El-Oued (Bordj Bou Arréridj)' },
					{ k: 'Œuvre de Cheikh El-Ibrahimi', v: 'Recueil d’articles Ouyoun Al-Bassaïr' },
					{ k: 'Moufdi Zakaria (Naissance)', v: 'En 1908 à Beni Isguen (Ghardaïa)' },
					{ k: 'Œuvre de Moufdi Zakaria', v: 'L’hymne national algérien Kassaman (1955)' }
				],
				q1: 'Quelle responsabilité Cheikh Mohamed Bachir El-Ibrahimi a-t-il assumée après 1940 ?',
				a1: 'Il a présidé l’Association des Oulémas Musulmans Algériens.',
				tf1Q: 'Moufdi Zakaria est né à Beni Isguen dans la wilaya de Ghardaïa.',
				tf1A: 'Vrai',
				tf2Q: 'L’hymne national Kassaman a été écrit en 1989.',
				tf2A: 'Faux',
				tf2C: 'Moufdi Zakaria a écrit l’hymne national Kassaman en 1955.',
				refWord: 'Ces deux figures prestigieuses',
				refAns: 'Cheikh Mohamed Bachir El-Ibrahimi et le poète Moufdi Zakaria',
				lexQ: 'Relevez du texte deux adjectifs mélioratifs qualifiant ces auteurs ou leurs écrits.',
				lexA: 'illustres, éloquent, infatigable, remarquables, prestigieuses (deux au choix).',
				mcqCorrect: 'Cheikh El-Ibrahimi et Moufdi Zakaria mirent leur plume au service du savoir et de la liberté algérienne.',
				mcqD1: 'Cheikh El-Ibrahimi est né à Ghardaïa en 1955.',
				mcqD2: 'Moufdi Zakaria n’a jamais écrit de poèmes patriotiques.',
				mcqD3: 'Ouyoun Al-Bassaïr est un livre de géographie européenne.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'تحقّق من مكان الميلاد وتفاصيل السيرة في الفقرة الأولى.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه المعلومة تتعارض مع التواريخ والمؤلفات الواردة في النص.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة الفقرة الثانية لمعرفة مجال المؤلف العلمي أو الأدبي.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Après lecture de la biographie « ${v.title} », quel énoncé est exact ?`,
				questionTextAr: `اقرأ السيرة « ${v.title} » واختر العبارة الصحيحة:`,
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
				instruction: 'Lisez attentivement cette biographie puis répondez aux questions :',
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
						content: '1) Ce texte est-il une biographie ou une autobiographie ? Justifiez par un indice grammatical. (01 pt)',
						answer: 'C’est une biographie car l’auteur raconte la vie d’une autre personne en employant la 3e personne (il / son).',
						mark: '1'
					},
					{
						type: 'text',
						content: '2) Complétez la fiche biographique suivante à partir du texte (02 pts) :'
					},
					{
						type: 'table',
						headers: ['Élément biographique', 'Information relevée du texte'],
						cells: [],
						rows: v.bioRows.map((r) => [
							{ content: r.k, bold: true },
							{ content: '....................................', answer: r.v, mark: '0.5' }
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
							{ q: v.tf1Q, a: v.tf1A, mark: '0.5' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C, mark: '0.5' }
						]
					},
					{
						type: 'text',
						content: `5) Qui désigne l’expression soulignée « ${v.refWord} » ? (01 pt)`,
						answer: `« ${v.refWord} » désigne : ${v.refAns}.`,
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
				'استعمال ضمير الغائب (il / son) يثبت فوراً أن النص سيرة غيرية (Biographie).',
				'املأ بطاقة السيرة بدقة من الفقرة الأولى والثانية (الاسم، الميلاد، المؤلّف، الوفاة).',
				'استخرج الصفات المعنوية أو التثمينية حرفياً كما وردت في النص.'
			],
			solutionStepsAr: [
				'النوع: Biographie (ضمير الغائب il).',
				v.bioRows.map((r) => `${r.k} : ${r.v}`).join(' | '),
				`الإجابة: ${v.a1}`,
				`مرجع (${v.refWord}): ${v.refAns} | المعجم: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension de l’écrit 2 (7 pts) — Valorisation du patrimoine algérien
// ═══════════════════════════════════════════════════════════════════════════════
const compPatrimoineAlgerien3amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t3_comp_patrimoine_algerien',
	grade: '3am',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (3AM): وصف وتثمين التراث المعماري والطبيعي الجزائري (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t3_temps_description_melioratif',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'La Kalâa des Béni Hammad et la Grande Mosquée de Tlemcen',
				paragraphs: [
					'L’Algérie possède un patrimoine architectural islamique d’une richesse exceptionnelle. Nichée dans les monts du Hodna, dans la wilaya de M’Sila, la Kalâa des Béni Hammad fut fondée en 1007 par Hammad ibn Bologhine. Son minaret majestueux en pierre et les vestiges de ses palais témoignent encore du raffinement d’une ancienne capitale médiévale.',
					'À l’ouest du pays, la Grande Mosquée de Tlemcen, construite en 1082, émerveille les visiteurs par sa coupole ajourée et sa cour lumineuse. [[Ces deux chefs-d’œuvre]] classés et admirés rappellent aux jeunes générations la grandeur de l’art islamique maghrébin.'
				],
				source: 'D’après un guide du patrimoine algérien (3AM)',
				glossary: [
					{ term: 'vestiges', meaning: 'restes anciens d’un monument historique' },
					{ term: 'raffinement', meaning: 'grande finesse artistique et élégance' }
				],
				q1: 'Où se situe la Kalâa des Béni Hammad et par qui a-t-elle été fondée ?',
				a1: 'Elle se situe dans les monts du Hodna (wilaya de M’Sila) et a été fondée en 1007 par Hammad ibn Bologhine.',
				q2: 'Quels éléments de la Grande Mosquée de Tlemcen émerveillent les visiteurs ?',
				a2: 'Sa coupole ajourée et sa cour lumineuse émerveillent les visiteurs.',
				tf1Q: 'La Kalâa des Béni Hammad a été fondée au XIe siècle (en 1007).',
				tf1A: 'Vrai',
				tf2Q: 'La Grande Mosquée de Tlemcen se trouve à l’est de l’Algérie.',
				tf2A: 'Faux',
				tf2C: 'Elle se trouve à l’ouest du pays.',
				refWord: 'Ces deux chefs-d’œuvre',
				refAns: 'la Kalâa des Béni Hammad et la Grande Mosquée de Tlemcen',
				lexQ: 'Relevez du texte trois mots appartenant au vocabulaire mélioratif (valorisant).',
				lexA: 'exceptionnelle, majestueux, raffinement, émerveille, lumineuse, chefs-d’œuvre, grandeur (trois au choix).',
				mcqCorrect: 'La Kalâa des Béni Hammad (1007) et la Grande Mosquée de Tlemcen (1082) illustrent la splendeur de l’art islamique en Algérie.',
				mcqD1: 'La Kalâa des Béni Hammad a été construite en 1982 à Alger.',
				mcqD2: 'La Grande Mosquée de Tlemcen est un parc botanique moderne.',
				mcqD3: 'Aucun vestige ne subsiste aujourd’hui à M’Sila.'
			},
			{
				title: 'La Vallée du M’Zab, joyau d’architecture saharienne',
				paragraphs: [
					'Située dans la wilaya de Ghardaïa, au cœur du Sahara algérien, la Vallée du M’Zab regroupe cinq ksour millénaires bâtis à flanc de colline dès le XIe siècle. Chaque cité, couronnée par sa mosquée au minaret pyramidal, s’adapte intelligemment au climat désertique grâce à des ruelles ombragées et des matériaux locaux.',
					'Classée au patrimoine mondial de l’UNESCO en 1982, [[cette vallée harmonieuse]] fascine les architectes du monde entier par son système ingénieux de partage de l’eau et l’esprit de solidarité de ses habitants.'
				],
				source: 'D’après un dossier sur les sites algériens classés (3AM)',
				glossary: [
					{ term: 'ksour', meaning: 'villages anciens fortifiés du Sahara (singulier : ksar)' },
					{ term: 'ingénieux', meaning: 'très habile et bien pensé' }
				],
				q1: 'Comment l’architecture des ksour du M’Zab s’adapte-t-elle au climat désertique ?',
				a1: 'Grâce à des ruelles ombragées et à l’utilisation de matériaux locaux.',
				q2: 'En quelle année la Vallée du M’Zab a-t-elle été classée par l’UNESCO et pourquoi fascine-t-elle les architectes ?',
				a2: 'Elle a été classée en 1982 ; elle fascine les architectes par son urbanisme adapté, son système ingénieux de partage de l’eau et l’esprit de solidarité.',
				tf1Q: 'La Vallée du M’Zab se situe dans la wilaya de Ghardaïa.',
				tf1A: 'Vrai',
				tf2Q: 'La Vallée du M’Zab ne compte qu’un seul village moderne.',
				tf2A: 'Faux',
				tf2C: 'Elle regroupe cinq ksour millénaires bâtis dès le XIe siècle.',
				refWord: 'cette vallée harmonieuse',
				refAns: 'la Vallée du M’Zab',
				lexQ: 'Relevez du texte trois mots du vocabulaire mélioratif valorisant la Vallée du M’Zab.',
				lexA: 'joyau, millénaires, intelligemment, harmonieuse, fascine, ingénieux (trois au choix).',
				mcqCorrect: 'La Vallée du M’Zab à Ghardaïa est un joyau classé par l’UNESCO pour son architecture saharienne ingénieuse.',
				mcqD1: 'La Vallée du M’Zab se trouve sur le littoral d’Oran.',
				mcqD2: 'Les ksour du M’Zab ont été construits en 1982.',
				mcqD3: 'Les architectes ne s’intéressent pas à l’urbanisme du M’Zab.'
			},
			{
				title: 'Le Jardin d’Essai du Hamma et les Ponts de Constantine',
				paragraphs: [
					'Du nord à l’est, l’Algérie offre aux voyageurs des sites d’une beauté remarquable. À Alger, le Jardin d’Essai du Hamma, créé en 1832, est un splendide parc botanique qui abrite plus de mille deux cents espèces végétales venues de plusieurs continents. Ses allées de palmiers et de ficus centenaires procurent une fraîcheur paisible en plein cœur de la capitale.',
					'À l’est, Constantine s’élève fièrement sur un rocher spectaculaire traversé par les gorges profondes du Rhumel. [[Ses célèbres ponts suspendus]], comme Sidi M’Cid et Mellah Slimane, offrent un panorama inoubliable aux visiteurs.'
				],
				source: 'D’après une brochure culturelle algérienne (3AM)',
				glossary: [
					{ term: 'centenaires', meaning: 'qui ont plus de cent ans' },
					{ term: 'panorama', meaning: 'vue vaste et impressionnante sur un paysage' }
				],
				q1: 'Que trouve-t-on dans le Jardin d’Essai du Hamma à Alger ?',
				a1: 'On y trouve plus de mille deux cents espèces végétales, ainsi que des allées de palmiers et de ficus centenaires.',
				q2: 'Citez deux ponts suspendus de Constantine mentionnés dans le texte.',
				a2: 'Le pont de Sidi M’Cid et le pont Mellah Slimane.',
				tf1Q: 'Le Jardin d’Essai du Hamma se situe en plein cœur d’Alger.',
				tf1A: 'Vrai',
				tf2Q: 'Constantine est construite sur une plaine plate sans aucun pont.',
				tf2A: 'Faux',
				tf2C: 'Constantine s’élève sur un rocher spectaculaire traversé par les gorges du Rhumel et relié par des ponts suspendus.',
				refWord: 'Ses célèbres ponts suspendus',
				refAns: 'les ponts suspendus de la ville de Constantine',
				lexQ: 'Relevez du texte trois adjectifs mélioratifs (valorisants).',
				lexA: 'remarquable, splendide, paisible, spectaculaire, célèbres, inoubliable (trois au choix).',
				mcqCorrect: 'Le Jardin d’Essai du Hamma à Alger et les Ponts de Constantine comptent parmi les sites les plus remarquables d’Algérie.',
				mcqD1: 'Le Jardin d’Essai du Hamma se trouve dans la wilaya de Constantine.',
				mcqD2: 'Le parc du Hamma abrite seulement dix espèces végétales.',
				mcqD3: 'Le Rhumel traverse le centre-ville d’Alger.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'تحقّق من المواقع والتواريخ الدقيقة في الفقرة الأولى.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه العبارة تناقض وصف المعلم في النص.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة الفقرة الثانية بتركيز.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle idée résume exactement le texte « ${v.title} » ?`,
				questionTextAr: `ما الفكرة العامة الدقيقة لنص « ${v.title} »؟`,
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
				instruction: 'Lisez attentivement le texte descriptif suivant puis répondez aux questions :',
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
						content: '1) Quel est le but principal de l’auteur dans ce texte ? (01 pt)',
						answer: 'L’auteur veut décrire et valoriser des sites exceptionnels du patrimoine algérien.',
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
							{ q: v.tf1Q, a: v.tf1A, mark: '1' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `4) Que remplace l’expression soulignée « ${v.refWord} » ? (01 pt)`,
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
				'في نصوص التراث، هدف الكاتب دائماً وصف وتثمين المعلم الجزائري (décrire et valoriser).',
				'انتبه للمواقع الجغرافية (الشرق، الغرب، الوسط، الصحراء) في أسئلة Vrai / Faux.',
				'المعجم التثميني (mélioratif) يشمل الصفات والأسماء والأفعال المعبرة عن الإعجاب والجمال.'
			],
			solutionStepsAr: [
				'الهدف: وصف وتثمين التراث الجزائري.',
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم التثميني: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (6 pts) — Expansions du nom & Mélioratif
// ═══════════════════════════════════════════════════════════════════════════════
const langExpansionsMelioratif3amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t3_lang_expansions_melioratif',
	grade: '3am',
	trimesterId: 't3',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (3AM): توسيعات الاسم (النعت، المضاف إليه، الصلة، البدل) والمعجم التثميني (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t3_expansions_du_nom',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				rel1Q: 'a) Timgad est une cité antique. Cette cité attire des historiens du monde entier. (Utilisez : qui)',
				rel1A: 'a) Timgad est une cité antique qui attire des historiens du monde entier.',
				rel2Q: 'b) La Muqaddima est un ouvrage célèbre. Ibn Khaldoun a rédigé cet ouvrage près de Tiaret. (Utilisez : que / qu’)',
				rel2A: 'b) La Muqaddima est un ouvrage célèbre qu’Ibn Khaldoun a rédigé près de Tiaret.',
				rel3Q: 'c) Ghardaïa est une ville saharienne. La Vallée du M’Zab se trouve dans cette ville. (Utilisez : où)',
				rel3A: 'c) Ghardaïa est une ville saharienne où se trouve la Vallée du M’Zab.',
				expItems: [
					'magnifique',
					'de Tlemcen',
					'qui date du XIe siècle',
					'en pierre sculptée',
					'prestigieux',
					'où vécut Ibn Khaldoun'
				],
				cAdj: ['magnifique', 'prestigieux'],
				cCdn: ['de Tlemcen', 'en pierre sculptée'],
				cPsr: ['qui date du XIe siècle', 'où vécut Ibn Khaldoun'],
				melQ: 'Remplacez l’adjectif simple « beau / bon » par un mot mélioratif précis (splendide, remarquable, brillant) :\n  a) Djamaâ El-Djazaïr offre un beau panorama sur la baie d’Alger.\n  b) Ibn Al-Haytham était un bon physicien.',
				melA: 'a) Djamaâ El-Djazaïr offre un splendide (ou remarquable) panorama sur la baie d’Alger.\nb) Ibn Al-Haytham était un brillant (ou remarquable) physicien.',
				mcqQ: 'Quelle est la nature grammaticale de l’expansion « de Constantine » dans « Les ponts de Constantine » ?',
				mcqCorrect: 'Un complément du nom (CDN)',
				mcqD1: 'Une proposition subordonnée relative',
				mcqD2: 'Un adjectif qualificatif épithète',
				mcqD3: 'Un verbe conjugué'
			},
			{
				rel1Q: 'a) La Casbah est une citadelle historique. Cette citadelle surplombe la Méditerranée. (Utilisez : qui)',
				rel1A: 'a) La Casbah est une citadelle historique qui surplombe la Méditerranée.',
				rel2Q: 'b) Le Traité d’optique est un livre majeur. Ibn Al-Haytham a composé ce livre au XIe siècle. (Utilisez : que / qu’)',
				rel2A: 'b) Le Traité d’optique est un livre majeur qu’Ibn Al-Haytham a composé au XIe siècle.',
				rel3Q: 'c) Constantine est la ville natale. Cheikh Abdelhamid Ben Badis y est né en 1889. (Utilisez : où)',
				rel3A: 'c) Constantine est la ville natale où Cheikh Abdelhamid Ben Badis est né en 1889.',
				expItems: [
					'authentique',
					'du Sahara',
					'que les touristes admirent',
					'd’architecture islamique',
					'lumineuse',
					'qui fascine les savants'
				],
				cAdj: ['authentique', 'lumineuse'],
				cCdn: ['du Sahara', 'd’architecture islamique'],
				cPsr: ['que les touristes admirent', 'qui fascine les savants'],
				melQ: 'Enrichissez les phrases suivantes avec une apposition ou un adjectif mélioratif :\n  a) Le Tassili n’Ajjer est un site naturel.\n  b) Fatima Al-Fihriya fonda une université à Fès.',
				melA: 'a) Le Tassili n’Ajjer, musée naturel à ciel ouvert, est un site exceptionnel.\nb) Fatima Al-Fihriya, femme cultivée et généreuse, fonda une prestigieuse université à Fès.',
				mcqQ: 'Choisissez le bon pronom relatif : « Le Jardin d’Essai du Hamma est un parc ...... abrite des plantes rares. »',
				mcqCorrect: 'qui',
				mcqD1: 'que',
				mcqD2: 'où',
				mcqD3: 'dont'
			},
			{
				rel1Q: 'a) Al-Khwarizmi est un mathématicien célèbre. Il a fondé l’algèbre. (Utilisez : qui)',
				rel1A: 'a) Al-Khwarizmi est un mathématicien célèbre qui a fondé l’algèbre.',
				rel2Q: 'b) Kassaman est un hymne patriotique. Moufdi Zakaria a écrit cet hymne en 1955. (Utilisez : que)',
				rel2A: 'b) Kassaman est un hymne patriotique que Moufdi Zakaria a écrit en 1955.',
				rel3Q: 'c) La Kalâa des Béni Hammad est le lieu. La dynastie hammadide y établit sa première capitale. (Utilisez : où)',
				rel3A: 'c) La Kalâa des Béni Hammad est le lieu où la dynastie hammadide établit sa première capitale.',
				expItems: [
					'majestueuse',
					'de l’Atlas',
					'qui témoigne du passé',
					'en marbre blanc',
					'immortel',
					'qu’Al-Idrisi dessina'
				],
				cAdj: ['majestueuse', 'immortel'],
				cCdn: ['de l’Atlas', 'en marbre blanc'],
				cPsr: ['qui témoigne du passé', 'qu’Al-Idrisi dessina'],
				melQ: 'Accordez les adjectifs mélioratifs entre parenthèses :\n  a) La Grande Mosquée possède une salle (majestueux) ............ et (spacieux) ............ .\n  b) Ces découvertes sont vraiment (précieux) ............ .',
				melA: 'a) La Grande Mosquée possède une salle majestueuse et spacieuse.\nb) Ces découvertes sont vraiment précieuses.',
				mcqQ: 'Quelle phrase contient une apposition correctement ponctuée ?',
				mcqCorrect: 'Ibn Khaldoun, fondateur de la sociologie, séjourna près de Tiaret.',
				mcqD1: 'Ibn Khaldoun qui fonda la sociologie séjourna près de Tiaret.',
				mcqD2: 'Ibn Khaldoun est de Tunis.',
				mcqD3: 'Ibn Khaldoun écrit un livre.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'تأكد من الفرق بين المضاف إليه (CDN) وجملة الصلة (PSR) والبدل (Apposition).' },
				{ text: s.mcqD2, diagnosticFeedback: 'تحقّق من وظيفة الضمير الموصول (qui للفاعل قبل الفعل مباشرة).' },
				{ text: s.mcqD3, diagnosticFeedback: 'راجع قاعدة أنواع توسيع الاسم الأربعة في الدرس الثاني.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة حول توسيعات الاسم:',
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
				instruction: 'Répondez aux exercices sur les expansions du nom et le vocabulaire mélioratif :',
				content: [
					{
						type: 'text',
						content: `1) Reliez chaque couple de phrases à l’aide du pronom relatif indiqué pour éviter la répétition (03 pts) :\n  ${s.rel1Q}\n  ${s.rel2Q}\n  ${s.rel3Q}`,
						answer: `${s.rel1A}\n${s.rel2A}\n${s.rel3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) Classez les expansions du nom suivantes dans le tableau (01.5 pt) :\nListe : ${s.expItems.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: 'Adjectif épithète', items: s.cAdj, mark: '0.5' },
							{ header: 'Complément du nom', items: s.cCdn, mark: '0.5' },
							{ header: 'Proposition relative', items: s.cPsr, mark: '0.5' }
						]
					}),
					{
						type: 'text',
						content: `3) ${s.melQ} (01.5 pt)`,
						answer: s.melA,
						mark: '1.5'
					}
				]
			},
			hints: [
				'عند الربط بـ qui / que / où نحذف الكلمة المكررة في الجملة الثانية ونلصق جملة الصلة بالاسم السابق.',
				'المضاف إليه (CDN) يبدأ بحرف جر (de, du, en) دون فعل، أما الـ PSR فتبدأ بـ (qui, que, où) مع فعل مصرف.',
				'تذكّر تأنيث الصفات التثمينية المنتهية بـ -eux إلى -euse.'
			],
			solutionStepsAr: [
				`${s.rel1A} | ${s.rel2A} | ${s.rel3A}`,
				`Adjectifs: ${s.cAdj.join(', ')} | CDN: ${s.cCdn.join(', ')} | PSR: ${s.cPsr.join(', ')}`,
				s.melA
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (6 pts) — Homophones, temps descriptifs & lexique
// ═══════════════════════════════════════════════════════════════════════════════
const langHomophonesDescription3amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t3_lang_homophones_description',
	grade: '3am',
	trimesterId: 't3',
	domain: 'orthographe_accords',
	titleAr: 'قواعد اللغة (3AM): المتجانسات الصوتية (ce/se, c’est/s’est, peu/peut) وأزمنة الوصف (6 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t3_homophones_grammaticaux',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				hom1Q: 'a) (Ce / Se) ............ monument historique (ce / se) ............ situe dans la wilaya de Tlemcen.',
				hom1A: 'a) Ce monument historique se situe dans la wilaya de Tlemcen.',
				hom2Q: 'b) Ibn Khaldoun (c’est / s’est) ............ illustré en histoire ; (c’est / s’est) ............ un penseur universel.',
				hom2A: 'b) Ibn Khaldoun s’est illustré en histoire ; c’est un penseur universel.',
				hom3Q: 'c) En (peu / peut) ............ de temps, le visiteur (peu / peut) ............ admirer (ces / ses) ............ ruelles blanches.',
				hom3A: 'c) En peu de temps, le visiteur peut admirer ces (ou ses) ruelles blanches.',
				conjQ: 'Mettez les verbes entre parenthèses au présent de description ou à l’imparfait descriptif selon le contexte (01.5 pt) :\n  a) Aujourd’hui encore, la Casbah d’Alger (surplomber) ............ la mer Méditerranée.\n  b) Autrefois, Ibn Al-Haytham (observer) ............ patiemment les rayons lumineux.',
				conjA: 'a) surplombe (présent de description)\nb) observait (imparfait descriptif)',
				wfRows: [
					{
						verbe: { given: true, value: 'admirer' },
						nom: { value: 'l’admiration', mark: '0.5' },
						adjectif: { value: 'admirable', mark: '0.5' }
					},
					{
						verbe: { value: 'valoriser', mark: '0.5' },
						nom: { given: true, value: 'la valeur (valorisation)' },
						adjectif: { value: 'valeureux (valorisant)', mark: '0.5' }
					}
				],
				mcqQ: 'Choisissez la phrase sans faute d’homophones :',
				mcqCorrect: 'Ce savant s’est distingué par ses découvertes ; c’est une fierté.',
				mcqD1: 'Se savant c’est distingué par ces découvertes ; s’est une fierté.',
				mcqD2: 'Ce savant c’est distingué par ses découvertes ; c’est une fierté.',
				mcqD3: 'Ce savant s’est distingué par ses découvertes ; s’est une fierté.'
			},
			{
				hom1Q: 'a) (Ce / Se) ............ jardin botanique (ce / se) ............ trouve au cœur d’Alger.',
				hom1A: 'a) Ce jardin botanique se trouve au cœur d’Alger.',
				hom2Q: 'b) Cheikh El-Ibrahimi (c’est / s’est) ............ dévoué à la langue arabe ; (c’est / s’est) ............ un modèle d’éloquence.',
				hom2A: 'b) Cheikh El-Ibrahimi s’est dévoué à la langue arabe ; c’est un modèle d’éloquence.',
				hom3Q: 'c) Le touriste (peu / peut) ............ découvrir Timgad et (ces / ses) ............ colonnes antiques en (peu / peut) ............ d’heures.',
				hom3A: 'c) Le touriste peut découvrir Timgad et ses colonnes antiques en peu d’heures.',
				conjQ: 'Conjuguez au temps descriptif approprié (présent ou imparfait) (01.5 pt) :\n  a) Actuellement, Djamaâ El-Djazaïr (accueillir) ............ des milliers de fidèles.\n  b) Au XIVe siècle, Ibn Battouta (voyager) ............ à travers trois continents.',
				conjA: 'a) accueille (présent de description)\nb) voyageait (imparfait descriptif)',
				wfRows: [
					{
						verbe: { given: true, value: 'illuminer' },
						nom: { value: 'la lumière (l’illumination)', mark: '0.5' },
						adjectif: { value: 'lumineux', mark: '0.5' }
					},
					{
						verbe: { value: 'créer', mark: '0.5' },
						nom: { given: true, value: 'la création' },
						adjectif: { value: 'créatif', mark: '0.5' }
					}
				],
				mcqQ: 'Complétez : « On ...... visiter la Vallée du M’Zab en ...... de jours. »',
				mcqCorrect: 'peut / peu',
				mcqD1: 'peu / peut',
				mcqD2: 'peux / peu',
				mcqD3: 'peut / peux'
			},
			{
				hom1Q: 'a) (Ce / Se) ............ pont suspendu (ce / se) ............ dresse au-dessus du Rhumel.',
				hom1A: 'a) Ce pont suspendu se dresse au-dessus du Rhumel.',
				hom2Q: 'b) Fatima Al-Fihriya (c’est / s’est) ............ consacrée à la fondation d’Al-Qarawiyyin ; (c’est / s’est) ............ une femme illustre.',
				hom2A: 'b) Fatima Al-Fihriya s’est consacrée à la fondation d’Al-Qarawiyyin ; c’est une femme illustre.',
				hom3Q: 'c) Al-Zahrawi a rédigé (ces / ses) ............ traités de chirurgie dont on (peu / peut) ............ encore mesurer la précision.',
				hom3A: 'c) Al-Zahrawi a rédigé ses traités de chirurgie dont on peut encore mesurer la précision.',
				conjQ: 'Conjuguez au présent ou à l’imparfait selon l’indicateur temporel (01.5 pt) :\n  a) De nos jours, la Vallée du M’Zab (fasciner) ............ les architectes.\n  b) Jadis, la Kalâa des Béni Hammad (rayonner) ............ par sa culture.',
				conjA: 'a) fascine (présent de description)\nb) rayonnait (imparfait descriptif)',
				wfRows: [
					{
						verbe: { given: true, value: 'préserver' },
						nom: { value: 'la préservation', mark: '0.5' },
						adjectif: { value: 'préservé', mark: '0.5' }
					},
					{
						verbe: { value: 'embellir', mark: '0.5' },
						nom: { given: true, value: 'la beauté (l’embellissement)' },
						adjectif: { value: 'beau (belle)', mark: '0.5' }
					}
				],
				mcqQ: 'Complétez correctement : « ...... qui m’émerveille dans ...... monument, ...... sa coupole. »',
				mcqCorrect: 'Ce / ce / c’est',
				mcqD1: 'Se / ce / s’est',
				mcqD2: 'Ce / se / c’est',
				mcqD3: 'Ce / ce / s’est'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'تذكّر: ce قبل الاسم أو qui، و se قبل الفعل الضميري.' },
				{ text: s.mcqD2, diagnosticFeedback: 'c’est تعوّض بـ cela est، أما s’est فتأتي مع فعل ضميري في الماضي المركّب.' },
				{ text: s.mcqD3, diagnosticFeedback: 'peut فعل pouvoir مع il/on (= pouvait)، أما peu فظرف كمية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الكتابة الإملائية الصحيحة للمتجانسات:',
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
				instruction: 'Traitez les exercices d’orthographe, de conjugaison et de lexique suivants :',
				content: [
					{
						type: 'text',
						content: `1) Choisissez l’homophone grammatical qui convient (02.5 pts) :\n  ${s.hom1Q}\n  ${s.hom2Q}\n  ${s.hom3Q}`,
						answer: `${s.hom1A}\n${s.hom2A}\n${s.hom3A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `2) ${s.conjQ}`,
						answer: s.conjA,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) Complétez le tableau lexical suivant (02 pts) :'
					},
					buildFrenchWordFamilyTableBlock(s.wfRows)
				]
			},
			hints: [
				'استبدل (c’est) بـ (cela est) و (peut) بـ (pouvait) للتأكد فوراً من الإملاء الصحيح.',
				'مؤشرات الحاضر (Aujourd’hui, De nos jours) تستدعي Présent، ومؤشرات الماضي (Autrefois, Jadis) تستدعي Imparfait.',
				'في جدول عائلة الكلمات تأكد من الصنف النحوي لكل عمود (Verbe / Nom / Adjectif).'
			],
			solutionStepsAr: [
				`${s.hom1A} | ${s.hom2A} | ${s.hom3A}`,
				s.conjA,
				s.wfRows.map((r) => `${r.verbe.value} / ${r.nom.value} / ${r.adjectif.value}`).join(' ; ')
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (7 pts) — Notice biographique ou valorisation d’un site
// ═══════════════════════════════════════════════════════════════════════════════
const writeBiographiePatrimoine3amT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_3am_t3_write_biographie_patrimoine',
	grade: '3am',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة نبذة بيوغرافية عن عالم أو نص يثمن معلماً جزائرياً (7 نقاط)',
	curriculumLessonId: 'fre_lesson_3am_t3_rediger_biographie_patrimoine',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				title: 'Notice biographique : Al-Khwarizmi, père de l’algèbre',
				prompt:
					'Votre club scientifique prépare une exposition sur les grands savants musulmans. Rédigez une notice biographique (10 à 12 lignes) sur Al-Khwarizmi à partir de la fiche suivante.',
				notes: [
					'Nom : Mohammed ibn Moussa Al-Khwarizmi (vers 780 - vers 850)',
					'Qualités morales : Savant rigoureux, méthodique, modeste et passionné par les mathématiques',
					'Lieu de travail : La Maison de la Sagesse (Bayt Al-Hikma) à Bagdad',
					'Apports majeurs : Fondateur de l’algèbre (Al-Jabr), diffusion des chiffres et de la notion d’algorithme',
					'Consignes : Employez la 3e personne, l’imparfait, le passé simple, un vocabulaire mélioratif et au moins une proposition relative.'
				],
				modelAnswer:
					'Al-Khwarizmi, un génie au service des mathématiques\nNé vers 780, Mohammed ibn Moussa Al-Khwarizmi fut l’un des plus illustres mathématiciens et astronomes de la civilisation islamique. C’était un savant rigoureux, modeste et passionné par la recherche.\nIl travailla à la célèbre Maison de la Sagesse de Bagdad, où il rassembla et enrichit les connaissances scientifiques de son temps. Cet érudit génial rédigea un ouvrage fondamental sur « Al-Jabr », discipline qui donna naissance à l’algèbre moderne. Ses travaux précis contribuèrent aussi à diffuser les chiffres et inspirèrent le terme d’algorithme, indispensable à l’informatique actuelle.\nDécédé vers 850, Al-Khwarizmi laisse un héritage scientifique immortel qui continue d’éclairer le monde entier.'
			},
			{
				title: 'Valoriser un monument algérien : Djamaâ El-Djazaïr (La Grande Mosquée d’Alger)',
				prompt:
					'Un correspondant étranger souhaite découvrir les grands monuments d’Algérie. Rédigez un texte descriptif valorisant (10 à 12 lignes) sur Djamaâ El-Djazaïr à partir des notes ci-dessous.',
				notes: [
					'Nom et lieu : Djamaâ El-Djazaïr, située à Mohammadia face à la baie d’Alger',
					'Inauguration : 2020 (symbole du patrimoine islamique algérien contemporain)',
					'Architecture : Le plus haut minaret du monde (265 mètres), vaste salle de prière, bibliothèque riche et centre culturel',
					'Atmosphère : Harmonie entre art islamique maghrébin traditionnel et ingénierie moderne',
					'Consignes : Utilisez le présent de description, des expansions du nom (adjectif, CDN, relative) et un vocabulaire mélioratif.'
				],
				modelAnswer:
					'Djamaâ El-Djazaïr, joyau majestueux de la capitale\nSituée à Mohammadia face à la splendide baie d’Alger, Djamaâ El-Djazaïr est un monument prestigieux qui fait la fierté de toute l’Algérie. Inaugurée en 2020, cette grande mosquée marie harmonieusement l’art islamique traditionnel et l’ingénierie contemporaine.\nSon minaret élancé, qui culmine à deux cent soixante-cinq mètres de hauteur, est le plus haut du monde et domine fièrement la mer Méditerranée. À l’intérieur, la vaste salle de prière séduit les visiteurs par ses colonnes lumineuses et sa calligraphie raffinée. L’édifice abrite également une riche bibliothèque et un centre de recherche culturelle.\nVéritable chef-d’œuvre architectural, Djamaâ El-Djazaïr mérite d’être découverte et préservée par tous.'
			},
			{
				title: 'Notice biographique : Al-Zahrawi, pionnier de la chirurgie',
				prompt:
					'Dans le cadre de la Journée du Savoir (16 avril), rédigez une notice biographique (10 à 12 lignes) sur le grand médecin musulman Al-Zahrawi en exploitant les informations ci-dessous.',
				notes: [
					'Nom : Abou Al-Qassim Al-Zahrawi (936 - 1013), né près de Cordoue en Andalousie',
					'Portrait moral : Médecin compatissant, habile, patient et entièrement dévoué aux malades',
					'Œuvre majeure : L’encyclopédie médicale « Kitab Al-Tasrif » en trente volumes',
					'Inventions : Plus de deux cents instruments chirurgicaux dessinés avec précision et utilisation du fil chirurgical résorbable',
					'Consignes : Rédigez à la 3e personne avec des expansions du nom, un vocabulaire valorisant et une conclusion.'
				],
				modelAnswer:
					'Al-Zahrawi, le pionnier de la chirurgie moderne\nNé en 936 près de Cordoue en Andalousie, Abou Al-Qassim Al-Zahrawi fut l’un des plus grands médecins de l’histoire. Homme compatissant, patient et d’une habileté remarquable, il consacra toute son existence à soulager les malades.\nDurant cinquante années de pratique, ce savant exceptionnel rédigea « Kitab Al-Tasrif », une monumentale encyclopédie médicale en trente volumes qui servit de référence en Europe pendant des siècles. Il conçut et illustra plus de deux cents instruments chirurgicaux précis et introduisit l’usage du fil chirurgical résorbable.\nDécédé en 1013, Al-Zahrawi demeure un modèle lumineux de science, d’humanité et de dévouement.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Un titre valorisant, des paragraphes organisés, des expansions du nom, un vocabulaire mélioratif et des temps adaptés.',
			[
				{ text: 'Des phrases très courtes sans adjectifs ni ponctuation.', diagnosticFeedback: 'النص الوصفي والتثمينـي يحتاج إلى توسيعات الاسم ومعجم إيجابي غني.' },
				{ text: 'Un texte écrit uniquement au futur simple avec des fautes d’homophones.', diagnosticFeedback: 'تُكتب السيرة بالماضي ووصف المعلم بالحاضر مع ضبط الإملاء.' },
				{ text: 'La copie exacte des notes sous forme de liste à puces.', diagnosticFeedback: 'المطلوب فقرة مترابطة من 10 إلى 12 سطراً.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Quels critères garantissent la meilleure note pour une notice biographique ou un texte valorisant un patrimoine en 3AM ?',
				questionTextAr: 'ما معايير النجاح الكامل في الوضعية الإدماجية للفصل الثالث 3AM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'عنوان تثميني، فقرات متماسكة، توسيعات الاسم، معجم إيجابي، وأزمنة وإملاء سليم.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration (07 pts)',
				points: 7,
				instruction: 'Rédigez un texte cohérent et soigné (10 à 12 lignes) en respectant toutes les consignes :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: item.title,
						sujetUnPrompt: item.prompt,
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et respect des notes (2 pts) + Cohérence et paragraphes (1.5 pt) + Richesse linguistique : expansions du nom, vocabulaire mélioratif, temps et homophones (2.5 pts) + Présentation (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'وظّف جميع معطيات البطاقة في ثلاث فقرات منظمة: مقدمة، عرض، وخاتمة.',
				'أدرج على الأقل جملة صلة واحدة (qui / que / où) وثلاث كلمات من المعجم التثميني.',
				'راجع المتجانسات (ce/se, c’est/s’est, ces/ses) وتوافق الصفات قبل تسليم الورقة.'
			],
			solutionStepsAr: [
				`الموضوع: ${item.title}`,
				'إدماج توسيعات الاسم (صفة، مضاف إليه، جملة صلة، بدل) ومعجم تثميني.',
				'مراجعة الترقيم والأزمنة وتوافق الصفات والمتجانسات الصوتية.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T3: FrenchParameterizedTemplate[] = [
	compSavantsMusulmans3amT3,
	compPatrimoineAlgerien3amT3,
	langExpansionsMelioratif3amT3,
	langHomophonesDescription3amT3,
	writeBiographiePatrimoine3amT3
];
