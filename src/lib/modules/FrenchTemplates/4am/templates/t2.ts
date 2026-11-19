import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension BEM 1 (7 pts) — Solidarité « Touiza », respect & anti-gaspillage
// ═══════════════════════════════════════════════════════════════════════════════
const compSolidariteTouiza4amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t2_comp_solidarite_touiza',
	grade: '4am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): التضامن « التويزة »، برّ الوالدين، ومكافحة التبذير (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t2_cause_consequence',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'La Touiza, un trésor de solidarité algérienne à préserver',
				paragraphs: [
					'Enracinée depuis des siècles dans nos campagnes et nos villes, la « Touiza » désigne l’entraide bénévole et collective entre voisins. Je suis convaincu que nous devons faire revivre cette noble tradition afin que notre société reste unie et fraternelle.',
					'D’abord, grâce à la Touiza, des travaux difficiles comme la récolte des olives, le nettoyage d’un quartier ou la réparation d’une école deviennent rapides et légers. Ensuite, [[elle]] renforce les liens de confiance entre les générations, si bien que les jeunes apprennent concrètement le sens du partage et du dévouement. Enfin, cette pratique soulage discrètement les familles modestes ou les personnes âgées qui ne peuvent pas accomplir certaines tâches seules.',
					'Par conséquent, il faut que chaque collège et chaque quartier encourage la Touiza pour que la solidarité demeure une valeur vivante.'
				],
				source: 'D’après un essai citoyen algérien (Préparation BEM)',
				glossary: [
					{ term: 'enracinée', meaning: 'profondément installée dans les traditions' },
					{ term: 'dévouement', meaning: 'générosité qui pousse à aider autrui sans intérêt' }
				],
				these: 'Nous devons faire revivre la Touiza afin que notre société reste unie et fraternelle.',
				q1: 'Citez deux exemples d’activités collectives réalisées grâce à la Touiza selon le texte.',
				a1: 'La récolte des olives, le nettoyage d’un quartier ou la réparation d’une école (deux au choix).',
				q2: 'Comment la Touiza agit-elle sur les relations entre les générations ?',
				a2: 'Elle renforce les liens de confiance et permet aux jeunes d’apprendre concrètement le partage et le dévouement.',
				tf1Q: 'La Touiza est une forme d’entraide collective payante.',
				tf1A: 'Faux',
				tf1C: 'La Touiza désigne l’entraide bénévole et collective entre voisins.',
				tf2Q: 'Cette tradition permet aussi d’aider les familles modestes et les personnes âgées.',
				tf2A: 'Vrai',
				refWord: 'elle',
				refAns: 'la Touiza',
				lexQ: 'Relevez du texte deux mots du champ lexical de la solidarité et un connecteur de conséquence.',
				lexA: 'Solidarité : entraide, bénévole, fraternelle, partage, dévouement (deux au choix) | Conséquence : si bien que (ou Par conséquent).',
				mcqCorrect: 'L’auteur plaide pour la préservation de la Touiza car elle facilite le travail collectif et renforce la fraternité.',
				mcqD1: 'La Touiza est une mode étrangère récente.',
				mcqD2: 'L’auteur affirme que la Touiza empêche les jeunes d’aider les aînés.',
				mcqD3: 'Le texte conseille de remplacer l’entraide par l’individualisme.'
			},
			{
				title: 'Le respect des parents et des aînés, pilier de notre société',
				paragraphs: [
					'Dans une société équilibrée, le respect des parents et des personnes âgées occupe une place sacrée. À mon avis, honorer ses parents n’est pas seulement une règle de politesse, mais un devoir moral essentiel qui garantit la cohésion familiale.',
					'Tout d’abord, nos parents se sacrifient chaque jour pour assurer notre éducation et notre bien-être ; [[ils]] méritent donc notre gratitude, notre obéissance dans le bien et notre douceur. De plus, les aînés possèdent une expérience précieuse dont les jeunes tirent de sages conseils pour éviter bien des erreurs. Enfin, un enfant qui respecte ses parents devient naturellement un citoyen bienveillant et respectueux envers toute la communauté.',
					'En conclusion, prenons soin de nos parents et écoutons nos aînés afin que la paix et la miséricorde règnent dans chaque foyer.'
				],
				source: 'D’après une chronique éducative (Préparation BEM)',
				glossary: [
					{ term: 'cohésion', meaning: 'union solide entre les membres d’une famille ou d’un groupe' },
					{ term: 'bienveillant', meaning: 'doux, attentif et soucieux du bien des autres' }
				],
				these: 'Honorer ses parents est un devoir moral essentiel qui garantit la cohésion familiale.',
				q1: 'Pourquoi nos parents méritent-ils notre gratitude et notre douceur ?',
				a1: 'Parce qu’ils se sacrifient chaque jour pour assurer notre éducation et notre bien-être.',
				q2: 'Que peuvent apporter les personnes âgées aux jeunes générations ?',
				a2: 'Elles possèdent une expérience précieuse et prodiguent de sages conseils pour éviter des erreurs.',
				tf1Q: 'Respecter ses parents contribue à former un citoyen bienveillant.',
				tf1A: 'Vrai',
				tf2Q: 'Selon l’auteur, le respect des parents est une simple politesse sans grande importance.',
				tf2A: 'Faux',
				tf2C: 'L’auteur affirme que c’est un devoir moral essentiel qui garantit la cohésion familiale.',
				refWord: 'ils',
				refAns: 'nos parents',
				lexQ: 'Relevez du texte deux qualités morales liées au respect des parents.',
				lexA: 'gratitude, obéissance, douceur, bienveillant, respectueux, miséricorde (deux au choix).',
				mcqCorrect: 'L’auteur démontre que respecter ses parents et ses aînés est un devoir moral qui assure l’harmonie sociale.',
				mcqD1: 'Les jeunes n’ont rien à apprendre de l’expérience des aînés.',
				mcqD2: 'Le respect familial n’a aucun effet sur la vie en société.',
				mcqD3: 'Le texte porte sur l’architecture des ponts modernes.'
			},
			{
				title: 'Stop au gaspillage alimentaire : un devoir moral et civique',
				paragraphs: [
					'Chaque jour, des milliers de baguettes de pain et de plats préparés finissent dans les poubelles de nos villes. J’affirme que le gaspillage alimentaire est un fléau social inacceptable que nous devons tous combattre avec détermination.',
					'D’abord, gaspiller la nourriture est une grave injustice morale, car des familles dans le monde peinent encore à se nourrir convenablement. Ensuite, à cause de ces achats excessifs, les ménages perdent une part importante de leur budget et les déchets s’accumulent, si bien que l’environnement est pollué. Enfin, adopter des gestes simples, comme acheter la juste quantité de pain et réutiliser les restes, suffit pour réduire considérablement [[ce phénomène]].',
					'C’est pourquoi il faut que chaque citoyen fasse preuve de modération afin que les bienfaits soient respectés et partagés.'
				],
				source: 'D’après un article de sensibilisation citoyenne (Préparation BEM)',
				glossary: [
					{ term: 'fléau social', meaning: 'problème grave qui touche toute la société' },
					{ term: 'modération', meaning: 'sagesse qui consiste à éviter tout excès' }
				],
				these: 'Le gaspillage alimentaire est un fléau social inacceptable que nous devons tous combattre.',
				q1: 'Quelles sont les deux conséquences négatives des achats excessifs citées dans le deuxième paragraphe ?',
				a1: 'Les ménages perdent une part de leur budget et l’accumulation des déchets pollue l’environnement.',
				q2: 'Citez deux gestes simples proposés par l’auteur pour réduire le gaspillage.',
				a2: 'Acheter la juste quantité de pain et réutiliser les restes.',
				tf1Q: 'Le gaspillage alimentaire n’a aucun impact sur l’environnement.',
				tf1A: 'Faux',
				tf1C: 'L’accumulation des déchets provoque la pollution de l’environnement.',
				tf2Q: 'Des gestes simples au quotidien permettent de réduire nettement ce fléau.',
				tf2A: 'Vrai',
				refWord: 'ce phénomène',
				refAns: 'le gaspillage alimentaire',
				lexQ: 'Relevez du texte un connecteur de cause (+ nom) et un connecteur de but (+ subjonctif).',
				lexA: 'Cause : à cause de (ces achats excessifs) | But : afin que (les bienfaits soient respectés).',
				mcqCorrect: 'L’auteur dénonce le gaspillage alimentaire comme une injustice morale, économique et écologique à combattre par la modération.',
				mcqD1: 'L’auteur encourage les familles à acheter beaucoup plus de pain que nécessaire.',
				mcqD2: 'Le texte affirme que personne ne jette de pain dans les villes.',
				mcqD3: 'Le gaspillage aide les familles à économiser leur budget.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'هذه العبارة تناقض أطروحة الكاتب في الفقرة الأولى.' },
				{ text: v.mcqD2, diagnosticFeedback: 'تحقّق من الحجج والأمثلة المذكورة في الفقرة الثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'أعد قراءة الخاتمة لمعرفة الموقف الذي يدعو إليه الكاتب.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quelle idée résume fidèlement le plaidoyer « ${v.title} » ?`,
				questionTextAr: `ما الفكرة الدقيقة التي تلخّص النص الحجاجي « ${v.title} »؟`,
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
				instruction: 'Lisez attentivement le texte argumentatif ci-dessous puis répondez aux questions :',
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
						content: '1) Relevez la thèse défendue par l’auteur dans l’introduction. (01.5 pt)',
						answer: v.these,
						mark: '1.5'
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
							{ q: v.tf1Q, a: v.tf1A, c: v.tf1C ?? '', mark: '0.75' },
							{ q: v.tf2Q, a: v.tf2A, c: v.tf2C ?? '', mark: '0.75' }
						]
					},
					{
						type: 'text',
						content: `4) Que remplace le mot souligné « ${v.refWord} » dans le texte ? (01 pt)`,
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
				'الأطروحة ترد بوضوح في الفقرة الأولى بعد فعل الرأي أو عبارة الرأي.',
				'استخرج الروابط المنطقية (السبب / النتيجة / الهدف) بدقة كما وردت في النص.',
				'تأكّد من تصحيح الجملة الخاطئة في سؤال Vrai / Faux بجملة من النص.'
			],
			solutionStepsAr: [
				`الأطروحة: ${v.these}`,
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم والروابط: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension BEM 2 (7 pts) — Dialogue argumentatif & Témoignage historique
// ═══════════════════════════════════════════════════════════════════════════════
const compDialogueTemoignage4amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t2_comp_dialogue_temoignage',
	grade: '4am',
	trimesterId: 't2',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب (BEM 4AM): حوار حجاجي وشهادة تاريخية ووقاية من آفة الشاشات (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t2_discours_rapporte_concordance',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const v = rng.pick([
			{
				title: 'Un grand-père raconte la solidarité du 1er Novembre 1954',
				paragraphs: [
					'À la veille du 1er Novembre, Walid interrogea son grand-père, ancien moudjahid dans les montagnes des Aurès : « Grand-père, comment le peuple algérien a-t-il réussi à tenir face à une armée aussi puissante ? »',
					'Le vieil homme sourit avec émotion et répondit : « Mon fils, nous avons triomphé grâce à notre foi et à l’union indéfectible du peuple. Dans chaque village, les femmes préparaient le pain et soignaient les blessés, tandis que les hommes partageaient leurs maigres réserves avec les combattants. [[Cette solidarité]] était si forte que personne ne reculait devant le sacrifice. »',
					'Walid écouta attentivement puis promit : « Je transmettrai ton témoignage à mes camarades afin qu’ils mesurent le prix de notre liberté. »'
				],
				source: 'D’après un dialogue argumentatif scolaire (Préparation BEM)',
				glossary: [
					{ term: 'indéfectible', meaning: 'très solide, qui ne peut être brisée' },
					{ term: 'maigres réserves', meaning: 'petites quantités de nourriture disponibles' }
				],
				interlocutors: 'Walid et son grand-père (ancien moudjahid)',
				q1: 'Selon le grand-père, quelles sont les deux forces qui ont permis au peuple algérien de triompher ?',
				a1: 'La foi et l’union indéfectible (solidarité) du peuple algérien.',
				q2: 'Pourquoi Walid promet-il de transmettre ce témoignage à ses camarades ?',
				a2: 'Afin qu’ils mesurent le prix de la liberté algérienne.',
				tf1Q: 'Le grand-père de Walid avait combattu dans les montagnes des Aurès.',
				tf1A: 'Vrai',
				tf2Q: 'Les villageois refusaient de partager leurs réserves avec les combattants.',
				tf2A: 'Faux',
				tf2C: 'Les femmes préparaient le pain et soignaient les blessés, et les hommes partageaient leurs réserves.',
				refWord: 'Cette solidarité',
				refAns: 'l’union et l’entraide des villageois algériens avec les moudjahidine',
				lexQ: 'Relevez du texte deux verbes introducteurs de parole et un rapport logique de but.',
				lexA: 'Verbes de parole : interrogea, répondit, promit (deux au choix) | But : afin qu’ils mesurent le prix de notre liberté.',
				mcqCorrect: 'Le grand-père témoigne que la foi et la solidarité des villages algériens ont assuré la victoire de la Révolution.',
				mcqD1: 'Walid refuse d’écouter le témoignage de son grand-père.',
				mcqD2: 'Les femmes n’ont joué aucun rôle dans les villages pendant la Révolution.',
				mcqD3: 'Le dialogue porte sur un match de football scolaire.'
			},
			{
				title: 'Écrans et smartphones : comment protéger nos études ?',
				paragraphs: [
					'En voyant son petit frère passer des heures devant son téléphone, Meriem, élève de 4AM, lui conseilla calmement : « Amine, tu devrais limiter ton temps sur les écrans parce que l’usage excessif nuit à ta concentration et à ton sommeil. »',
					'Amine répondit : « Mais j’utilise aussi internet pour réviser mes leçons ! » Sa sœur précisa alors : « L’outil numérique est utile à condition de bien l’organiser. Fixe un horaire précis : d’abord les devoirs et la lecture sur papier, puis une courte pause éducative. Ainsi, [[tu]] progresseras à l’école sans fatiguer tes yeux. »',
					'Convaincu par ces arguments clairs, Amine décida de ranger son téléphone chaque soir à vingt-et-une heures pour que son sommeil redevienne réparateur.'
				],
				source: 'D’après un dialogue éducatif pour collégiens (Préparation BEM)',
				glossary: [
					{ term: 'excessif', meaning: 'qui dépasse la mesure raisonnable' },
					{ term: 'réparateur', meaning: 'qui repose pleinement le corps et l’esprit' }
				],
				interlocutors: 'Meriem (élève de 4AM) et son petit frère Amine',
				q1: 'Quels deux risques de l’usage excessif des écrans Meriem cite-t-elle ?',
				a1: 'Il nuit à la concentration et au sommeil (et fatigue les yeux).',
				q2: 'Quelle décision Amine prend-il à la fin du dialogue et dans quel but ?',
				a2: 'Il décide de ranger son téléphone chaque soir à 21 h pour que son sommeil redevienne réparateur.',
				tf1Q: 'Meriem interdit totalement à son frère d’utiliser internet pour réviser.',
				tf1A: 'Faux',
				tf1C: 'Elle reconnaît que l’outil numérique est utile à condition de bien l’organiser.',
				tf2Q: 'Amine est finalement convaincu par les arguments de sa sœur.',
				tf2A: 'Vrai',
				refWord: 'tu',
				refAns: 'Amine (le petit frère de Meriem)',
				lexQ: 'Relevez du texte deux verbes de parole et une proposition subordonnée de but.',
				lexA: 'Verbes de parole : conseilla, répondit, précisa (deux au choix) | But : pour que son sommeil redevienne réparateur.',
				mcqCorrect: 'Meriem convainc son frère d’organiser son temps d’écran pour préserver sa concentration, sa vue et son sommeil.',
				mcqD1: 'Amine décide d’utiliser son téléphone toute la nuit.',
				mcqD2: 'Meriem conseille à son frère d’abandonner la lecture sur papier.',
				mcqD3: 'Le dialogue se termine par une dispute sans solution.'
			},
			{
				title: 'Témoignage sur la fraternité dans un village durant la Révolution',
				paragraphs: [
					'Lors d’une rencontre organisée au collège, une ancienne moudjahida témoigna devant les élèves : « Pendant la Guerre de Libération, notre village de Kabylie vivait sous une surveillance constante, mais la peur n’a jamais brisé notre solidarité. »',
					'Un élève lui demanda : « Comment faisiez-vous pour aider les familles des martyrs ? » Elle expliqua avec fierté : « Lorsque le père d’une famille tombait au champ d’honneur, tous les voisins se réunissaient pour cultiver son champ et veiller sur ses enfants. [[Chacun]] partageait son blé et son huile d’olive afin que nul ne souffre de la faim. »',
					'Ce témoignage émouvant montra aux collégiens que la fraternité algérienne a forgé l’indépendance du pays.'
				],
				source: 'D’après un recueil de témoignages historiques (Préparation BEM)',
				glossary: [
					{ term: 'forger', meaning: 'construire solidement par l’effort et le courage' },
					{ term: 'veiller sur', meaning: 'protéger et prendre soin de quelqu’un' }
				],
				interlocutors: 'Une ancienne moudjahida et des collégiens (un élève)',
				q1: 'Comment les voisins aidaient-ils la famille d’un martyr selon le témoignage ?',
				a1: 'Ils se réunissaient pour cultiver son champ, veiller sur ses enfants et partager blé et huile d’olive.',
				q2: 'Quelle leçon principale les collégiens ont-ils retenue de ce témoignage ?',
				a2: 'Que la fraternité algérienne a forgé l’indépendance du pays.',
				tf1Q: 'La peur de la surveillance a empêché les villageois de s’entraider.',
				tf1A: 'Faux',
				tf1C: 'La peur n’a jamais brisé leur solidarité.',
				tf2Q: 'Le témoignage a eu lieu lors d’une rencontre organisée au collège.',
				tf2A: 'Vrai',
				refWord: 'Chacun',
				refAns: 'chaque habitant / voisin du village',
				lexQ: 'Relevez du texte deux verbes introducteurs de parole et une expression de but.',
				lexA: 'Verbes de parole : témoigna, demanda, expliqua (deux au choix) | But : afin que nul ne souffre de la faim (ou pour aider les familles).',
				mcqCorrect: 'Une ancienne moudjahida témoigne de la fraternité exemplaire des villages algériens envers les familles des martyrs.',
				mcqD1: 'Les habitants du village refusaient de cultiver les champs des familles de martyrs.',
				mcqD2: 'La rencontre s’est déroulée dans un aéroport étranger.',
				mcqD3: 'Les collégiens n’ont posé aucune question à l’invitée.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			v.mcqCorrect,
			[
				{ text: v.mcqD1, diagnosticFeedback: 'أعد قراءة الحوار للتأكد من موقف المتحاورين الحقيقي.' },
				{ text: v.mcqD2, diagnosticFeedback: 'هذه العبارة تخالف التفاصيل الواردة في الفقرة الثانية.' },
				{ text: v.mcqD3, diagnosticFeedback: 'انظر إلى نهاية النص للتحقق من النتيجة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Quel résumé correspond exactement au texte « ${v.title} » ?`,
				questionTextAr: `ما الملخص الصحيح للحوار/الشهادة « ${v.title} »؟`,
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
				instruction: 'Lisez attentivement ce dialogue argumentatif / témoignage puis répondez aux questions :',
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
						content: '1) Qui sont les personnages qui dialoguent dans ce texte ? (01 pt)',
						answer: `Les interlocuteurs sont : ${v.interlocutors}.`,
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
				'حدّد المتحاورين بدقة من الفقرة الأولى (أفعال القول والمزدوجات).',
				'أفعال القول (verbes introducteurs de parole) هي الأفعال التي تسبق المزدوجتين مثل: interrogea, répondit, conseilla, témoigna.',
				'استخرج جملة الهدف كاملة ابتداءً من (afin que / pour que).'
			],
			solutionStepsAr: [
				`المتحاوران: ${v.interlocutors}`,
				`a) ${v.a1} | b) ${v.a2}`,
				`مرجع (${v.refWord}): ${v.refAns}`,
				`المعجم وأفعال القول: ${v.lexA}`
			],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue BEM 1 (6 pts) — Cause, Conséquence & But
// ═══════════════════════════════════════════════════════════════════════════════
const langCauseConsequenceBut4amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t2_lang_cause_consequence_but',
	grade: '4am',
	trimesterId: 't2',
	domain: 'grammaire_syntaxe',
	titleAr: 'قواعد اللغة (BEM 4AM): التعبير عن السبب والنتيجة والهدف وتحويل الجمل (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t2_subordonnee_but',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				tr1Q: 'a) Exprimez la cause par une phrase simple (grâce à / à cause de) :\n     « Le quartier est devenu propre parce que les jeunes se sont mobilisés. »',
				tr1A: 'a) Le quartier est devenu propre grâce à la mobilisation des jeunes.',
				tr2Q: 'b) Exprimez la conséquence à l’aide de « si bien que » :\n     « Le gaspillage du pain augmente. Des tonnes de nourriture sont jetées chaque mois. »',
				tr2A: 'b) Le gaspillage du pain augmente, si bien que des tonnes de nourriture sont jetées chaque mois.',
				but1Q: 'a) Reliez avec « afin de » ou « afin que » selon les sujets :\n     « Les élèves organisent une collecte. Ils veulent aider les familles démunies. »',
				but1A: 'a) Les élèves organisent une collecte afin d’aider les familles démunies. (Même sujet : infinitif)',
				but2Q: 'b) Reliez avec « pour que » (faites attention au mode du verbe) :\n     « Les parents conseillent leurs enfants. Leurs enfants font de bons choix. »',
				but2A: 'b) Les parents conseillent leurs enfants pour qu’ils fassent de bons choix. (Deux sujets : subjonctif)',
				clsItems: ['parce que', 'si bien que', 'afin de', 'grâce à', 'par conséquent', 'pour que'],
				cCause: ['parce que', 'grâce à'],
				cCons: ['si bien que', 'par conséquent'],
				cBut: ['afin de', 'pour que'],
				mcqQ: 'Choisissez la transformation correcte de la cause en phrase simple : « Il a réussi parce qu’il a persévéré. »',
				mcqCorrect: 'Il a réussi grâce à sa persévérance.',
				mcqD1: 'Il a réussi à cause de sa persévérance.',
				mcqD2: 'Il a réussi grâce qu’il a persévéré.',
				mcqD3: 'Il a réussi donc il a persévéré.'
			},
			{
				tr1Q: 'a) Exprimez la cause par une phrase simple (à cause de) :\n     « Amine manque de concentration parce qu’il utilise trop son téléphone. »',
				tr1A: 'a) Amine manque de concentration à cause de l’utilisation excessive de son téléphone.',
				tr2Q: 'b) Exprimez la conséquence à l’aide de « si ... que » :\n     « La solidarité des voisins est grande. Personne ne se sent isolé. »',
				tr2A: 'b) La solidarité des voisins est si grande que personne ne se sent isolé.',
				but1Q: 'a) Reliez avec « pour » ou « pour que » selon les sujets :\n     « Nous achetons juste ce qu’il faut. Nous voulons éviter le gaspillage. »',
				but1A: 'a) Nous achetons juste ce qu’il faut pour éviter le gaspillage. (Même sujet : infinitif)',
				but2Q: 'b) Reliez avec « afin que » :\n     « Le grand-père raconte son passé. Ses petits-enfants connaissent l’histoire du 1er Novembre. »',
				but2A: 'b) Le grand-père raconte son passé afin que ses petits-enfants connaissent l’histoire du 1er Novembre.',
				clsItems: ['à cause de', 'donc', 'dans le but de', 'puisque', 'tellement... que', 'de peur que'],
				cCause: ['à cause de', 'puisque'],
				cCons: ['donc', 'tellement... que'],
				cBut: ['dans le but de', 'de peur que'],
				mcqQ: 'Choisissez la phrase correcte exprimant le but avec deux sujets différents :',
				mcqCorrect: 'Nous participons à la Touiza afin que notre quartier soit accueillant.',
				mcqD1: 'Nous participons à la Touiza afin que notre quartier est accueillant.',
				mcqD2: 'Nous participons à la Touiza afin de notre quartier soit accueillant.',
				mcqD3: 'Nous participons à la Touiza pour que nous nettoyions notre quartier.'
			},
			{
				tr1Q: 'a) Transformez le rapport de conséquence en rapport de cause avec « parce que » :\n     « Les villageois s’entraident, donc les travaux avancent vite. »',
				tr1A: 'a) Les travaux avancent vite parce que les villageois s’entraident.',
				tr2Q: 'b) Exprimez la conséquence avec « par conséquent » :\n     « Respecter ses parents apporte la sérénité. C’est une priorité pour chacun. »',
				tr2A: 'b) Respecter ses parents apporte la sérénité ; par conséquent, c’est une priorité pour chacun.',
				but1Q: 'a) Reliez avec « de peur de » :\n     « Les familles conservent bien le pain. Elles craignent de le gaspiller. »',
				but1A: 'a) Les familles conservent bien le pain de peur de le gaspiller.',
				but2Q: 'b) Reliez avec « pour que » :\n     « L’école sensibilise les collégiens. Ils respectent les personnes âgées. »',
				but2A: 'b) L’école sensibilise les collégiens pour qu’ils respectent les personnes âgées.',
				clsItems: ['comme', 'de sorte que', 'afin que', 'car', 'c’est pourquoi', 'de crainte de'],
				cCause: ['comme', 'car'],
				cCons: ['de sorte que', 'c’est pourquoi'],
				cBut: ['afin que', 'de crainte de'],
				mcqQ: 'Quel rapport logique est exprimé dans : « Les déchets s’accumulent à cause du gaspillage » ?',
				mcqCorrect: 'La cause (négative, dans une phrase simple)',
				mcqD1: 'La conséquence',
				mcqD2: 'Le but',
				mcqD3: 'La condition'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'تذكّر الفرق بين grâce à (سبب إيجابي) و à cause de (سبب سلبي)، وبين Subjonctif و Indicatif.' },
				{ text: s.mcqD2, diagnosticFeedback: 'grâce à و afin de لا يتبعهما فعل مصرف ولا que.' },
				{ text: s.mcqD3, diagnosticFeedback: 'تحقّق من تطابق الفاعلين ومن نوع الرابط المنطقي.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الدقيقة في قواعد السبب والنتيجة والهدف (BEM):',
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
				instruction: 'Traitez les exercices sur les rapports logiques de cause, conséquence et but (type BEM) :',
				content: [
					{
						type: 'text',
						content: `1) Effectuez les transformations logiques demandées (02 pts) :\n  ${s.tr1Q}\n  ${s.tr2Q}`,
						answer: `${s.tr1A}\n${s.tr2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) Exprimez le rapport de but dans les deux phrases suivantes (02.5 pts) :\n  ${s.but1Q}\n  ${s.but2Q}`,
						answer: `${s.but1A}\n${s.but2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `3) Classez les outils logiques suivants dans le tableau (01.5 pt) :\nListe : ${s.clsItems.join(' - ')}`
					},
					buildFrenchClassificationTableBlock({
						columns: [
							{ header: 'Cause', items: s.cCause, mark: '0.5' },
							{ header: 'Conséquence', items: s.cCons, mark: '0.5' },
							{ header: 'But', items: s.cBut, mark: '0.5' }
						]
					})
				]
			},
			hints: [
				'في السبب مع اسم: grâce à للسبب الإيجابي، و à cause de للسبب السلبي.',
				'في الهدف: فاعل واحد = pour / afin de + infinitif | فاعلان مختلفان = pour que / afin que + subjonctif.',
				'تحقّق دائماً من ترتيب السبب والنتيجة قبل وضع parce que أو si bien que.'
			],
			solutionStepsAr: [
				`${s.tr1A} | ${s.tr2A}`,
				`${s.but1A} | ${s.but2A}`,
				`Cause: ${s.cCause.join(', ')} | Conséquence: ${s.cCons.join(', ')} | But: ${s.cBut.join(', ')}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue BEM 2 (6 pts) — Discours rapporté & Subjonctif
// ═══════════════════════════════════════════════════════════════════════════════
const langDiscoursSubjonctif4amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t2_lang_discours_subjonctif',
	grade: '4am',
	trimesterId: 't2',
	domain: 'conjugaison_temps',
	titleAr: 'قواعد اللغة (BEM 4AM): الخطاب المنقول بتطابق الأزمنة والمضارع المنصوب Subjonctif (6 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t2_subjonctif_present',
	defaultPoints: 6,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const s = rng.pick([
			{
				dr1Q: 'a) Le moudjahid a déclaré : « Aujourd’hui, je partage un souvenir que j’ai gardé dans mon cœur. »',
				dr1A: 'a) Le moudjahid a déclaré que ce jour-là, il partageait un souvenir qu’il avait gardé dans son cœur.',
				dr2Q: 'b) La directrice a affirmé : « Nous organiserons une Touiza demain. »',
				dr2A: 'b) La directrice a affirmé qu’ils (ou elles) organiseraient une Touiza le lendemain.',
				dr3Q: 'c) Le père a conseillé à son fils : « Respecte toujours tes aînés ! »',
				dr3A: 'c) Le père a conseillé à son fils de toujours respecter ses aînés.',
				sub1Q: 'a) Il faut que chaque citoyen (être) ............ solidaire et (faire) ............ preuve de bienveillance.',
				sub1A: 'a) soit / fasse',
				sub2Q: 'b) Nous luttons contre le gaspillage afin que les familles modestes (pouvoir) ............ vivre dignement.',
				sub2A: 'b) puissent',
				sub3Q: 'c) Je souhaite que vous (avoir) ............ le sens du partage et que tu (savoir) ............ écouter tes parents.',
				sub3A: 'c) ayez / saches',
				mcqQ: 'Transposez au discours indirect : « Le témoin raconta : “Nous avons aidé le village hier.” »',
				mcqCorrect: 'Le témoin raconta qu’ils avaient aidé le village la veille.',
				mcqD1: 'Le témoin raconta qu’ils ont aidé le village hier.',
				mcqD2: 'Le témoin raconta qu’ils aidaient le village la veille.',
				mcqD3: 'Le témoin raconta qu’ils aideraient le village le lendemain.'
			},
			{
				dr1Q: 'a) Le bénévole a expliqué : « Je distribue des paniers alimentaires aujourd’hui. »',
				dr1A: 'a) Le bénévole a expliqué qu’il distribuait des paniers alimentaires ce jour-là.',
				dr2Q: 'b) Le professeur a demandé aux élèves : « Avez-vous lu ce témoignage hier ? »',
				dr2A: 'b) Le professeur a demandé aux élèves s’ils avaient lu ce témoignage la veille.',
				dr3Q: 'c) L’association a promis : « Nous soutiendrons ce village demain. »',
				dr3A: 'c) L’association a promis qu’elle soutiendrait ce village le lendemain.',
				sub1Q: 'a) Il est essentiel que nous (aller) ............ rendre visite à nos grands-parents et que nous (être) ............ attentifs.',
				sub1A: 'a) allions / soyons',
				sub2Q: 'b) Les parents travaillent dur pour que leurs enfants (réussir) ............ et (avoir) ............ un bel avenir.',
				sub2A: 'b) réussissent / aient',
				sub3Q: 'c) Il faut qu’Amine (prendre) ............ conscience des dangers des écrans.',
				sub3A: 'c) prenne',
				mcqQ: 'Choisissez les deux formes exactes au subjonctif présent : « Il faut qu’il (être) ...... honnête et qu’il (avoir) ...... du respect. »',
				mcqCorrect: 'soit / ait',
				mcqD1: 'soie / aie',
				mcqD2: 'est / a',
				mcqD3: 'soient / aient'
			},
			{
				dr1Q: 'a) Meriem a dit à son frère : « Tu passes trop de temps sur ton téléphone. »',
				dr1A: 'a) Meriem a dit à son frère qu’il passait trop de temps sur son téléphone.',
				dr2Q: 'b) Le journaliste a demandé au maire : « Quelles actions avez-vous lancées contre le gaspillage ? »',
				dr2A: 'b) Le journaliste a demandé au maire quelles actions il avait lancées contre le gaspillage.',
				dr3Q: 'c) Le grand-père a assuré : « La jeunesse algérienne protégera toujours sa liberté. »',
				dr3A: 'c) Le grand-père a assuré que la jeunesse algérienne protégerait toujours sa liberté.',
				sub1Q: 'a) Afin que la Touiza (pouvoir) ............ réussir, il faut que chacun (faire) ............ un effort.',
				sub1A: 'a) puisse / fasse',
				sub2Q: 'b) Je veux que tu (savoir) ............ la valeur du pain et que tu ne le (jeter) ............ jamais.',
				sub2A: 'b) saches / jettes',
				sub3Q: 'c) Il est nécessaire que les jeunes (choisir) ............ de bonnes habitudes.',
				sub3A: 'c) choisissent',
				mcqQ: 'Transposez au discours indirect : « L’enseignant a annoncé : “Nous visiterons le musée demain.” »',
				mcqCorrect: 'L’enseignant a annoncé qu’ils visiteraient le musée le lendemain.',
				mcqD1: 'L’enseignant a annoncé qu’ils visiteront le musée demain.',
				mcqD2: 'L’enseignant a annoncé qu’ils avaient visité le musée la veille.',
				mcqD3: 'L’enseignant a annoncé de visiter le musée demain.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			s.mcqCorrect,
			[
				{ text: s.mcqD1, diagnosticFeedback: 'فعل القول في الماضي يستدعي تطبيق جدول تطابق الأزمنة وتحويل مؤشرات الزمان.' },
				{ text: s.mcqD2, diagnosticFeedback: 'تأكّد من الزمن الأصلي: الماضي المركب يصبح PQP والمستقبل يصبح الشرطي الحاضر.' },
				{ text: s.mcqD3, diagnosticFeedback: 'راجع إملاء (qu’il soit / qu’il ait) وتطابق الفاعل المفرد.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة في الخطاب المنقول والمضارع المنصوب (BEM):',
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
				instruction: 'Traitez les exercices de discours rapporté et de subjonctif présent (type BEM) :',
				content: [
					{
						type: 'text',
						content: `1) Transposez les phrases suivantes au discours indirect en respectant la concordance des temps (03 pts) :\n  ${s.dr1Q}\n  ${s.dr2Q}\n  ${s.dr3Q}`,
						answer: `${s.dr1A}\n${s.dr2A}\n${s.dr3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `2) Conjuguez les verbes entre parenthèses au présent du subjonctif (03 pts) :\n  ${s.sub1Q}\n  ${s.sub2Q}\n  ${s.sub3Q}`,
						answer: `${s.sub1A}\n${s.sub2A}\n${s.sub3A}`,
						mark: '3'
					}
				]
			},
			hints: [
				'مع فعل قول في الماضي: الحاضر يصبح Imparfait، الماضي المركب يصبح Plus-que-parfait، والمستقبل يصبح Conditionnel présent.',
				'حوّل المؤشرات الزمنية: aujourd’hui تصبح ce jour-là، hier تصبح la veille، و demain تصبح le lendemain.',
				'احفظ الشواذ السبعة للـ Subjonctif présent: soit, ait, fasse, aille, puisse, sache, veuille.'
			],
			solutionStepsAr: [
				`${s.dr1A} | ${s.dr2A} | ${s.dr3A}`,
				`${s.sub1A} | ${s.sub2A} | ${s.sub3A}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite BEM (7 pts) — Plaidoyer solidarité / respect / gaspillage
// ═══════════════════════════════════════════════════════════════════════════════
const writePlaidoyerSolidarite4amT2: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4am_t2_write_plaidoyer_solidarite',
	grade: '4am',
	trimesterId: 't2',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية (BEM 4AM): مرافعة حجاجية حول التويزة أو برّ الوالدين أو مكافحة التبذير (7 نقاط)',
	curriculumLessonId: 'fre_lesson_4am_t2_rediger_plaidoyer_solidarite',
	defaultPoints: 7,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const item = rng.pick([
			{
				title: 'Plaidoyer pour la Touiza et l’entraide au collège',
				prompt:
					'Votre établissement lance une journée de volontariat pour embellir la cour et collecter des livres au profit d’élèves démunis. Rédigez un texte argumentatif (12 à 14 lignes) pour convaincre vos camarades de participer massivement à cette Touiza.',
				notes: [
					'Introduction : Présentez la Touiza comme valeur algérienne d’entraide et énoncez votre thèse.',
					'Arguments (3) : 1) Embellir ensemble notre cadre scolaire (grâce à), 2) Aider discrètement nos camarades dans le besoin, 3) Renforcer la fraternité et la responsabilité citoyenne (si bien que).',
					'Outils obligatoires : Un rapport de cause, un rapport de conséquence, un rapport de but avec subjonctif (afin que / pour que) et une conclusion appelant à agir.'
				],
				modelAnswer:
					'Participons tous à la Touiza du collège !\nLa « Touiza » est une noble tradition algérienne fondée sur l’entraide bénévole et la fraternité. Je suis convaincu que chaque collégien devrait participer à la journée de volontariat organisée cette semaine dans notre établissement.\nD’abord, grâce au travail collectif, nous pourrons nettoyer la cour, planter des arbres et embellir nos salles en quelques heures seulement. Ensuite, cette initiative permet de collecter des livres et des fournitures pour soutenir nos camarades issus de familles modestes dans la dignité. Enfin, agir ensemble renforce l’amitié et le respect mutuel, si bien que notre collège devient un lieu encore plus agréable pour tous.\nEn conclusion, il faut que chacun apporte sa pierre à l’édifice afin que l’esprit de solidarité rayonne dans notre école et dans notre société !'
			},
			{
				title: 'Plaidoyer pour le respect des parents et des aînés',
				prompt:
					'À l’occasion d’une campagne éducative sur les valeurs familiales, rédigez un texte argumentatif (12 à 14 lignes) pour rappeler à vos camarades l’importance du respect et de la bienveillance envers les parents et les grands-parents.',
				notes: [
					'Introduction : Soulignez la place centrale des parents dans notre vie et affirmez votre thèse.',
					'Arguments (3) : 1) Reconnaissance pour leurs sacrifices quotidiens (parce que), 2) Sagesse et conseils précieux des aînés, 3) Cohésion familiale et réussite morale dans la société (donc / par conséquent).',
					'Outils obligatoires : Connecteurs d’énumération, cause, conséquence et une phrase au subjonctif présent après « il faut que » ou « afin que ».'
				],
				modelAnswer:
					'Honorer ses parents, le plus beau des devoirs\nDans notre culture et nos valeurs islamiques, le respect des parents et des aînés occupe une place fondamentale. À mon avis, la bienveillance envers nos parents est le premier signe de maturité et la clé d’une société harmonieuse.\nTout d’abord, nous devons leur témoigner une profonde gratitude parce qu’ils veillent sur notre santé, notre éducation et notre avenir avec un dévouement sans limite. Ensuite, écouter les conseils de nos parents et de nos grands-parents nous aide à éviter de nombreuses erreurs grâce à leur longue expérience de la vie. Enfin, le respect au sein du foyer apprend la patience et l’humilité ; par conséquent, il forme des citoyens honnêtes et équilibrés.\nC’est pourquoi il faut que nous soyons toujours doux, attentifs et serviables envers nos parents afin que la paix et la bénédiction demeurent dans nos familles.'
			},
			{
				title: 'Lutter contre le gaspillage du pain et de l’eau',
				prompt:
					'Vous constatez avec regret que beaucoup de pain et d’eau sont gaspillés chaque jour. Rédigez un texte argumentatif (12 à 14 lignes) destiné au journal de votre collège pour sensibiliser les lecteurs et les inciter à lutter contre ce fléau.',
				notes: [
					'Introduction : Dressez le constat du gaspillage quotidien du pain et de l’eau, puis formulez votre thèse.',
					'Arguments (3) : 1) Respect moral des bienfaits et solidarité envers ceux qui manquent de ressources, 2) Pertes financières importantes à cause du gaspillage, 3) Danger écologique lié à la rareté de l’eau et aux déchets.',
					'Outils obligatoires : « à cause de », « si bien que » ou « donc », « pour que / afin que + subjonctif » et une conclusion mobilisatrice.'
				],
				modelAnswer:
					'Halte au gaspillage du pain et de l’eau !\nChaque jour, d’énormes quantités de pain et d’eau potable sont gaspillées par négligence dans nos foyers et nos quartiers. J’affirme que ce fléau social et écologique doit être combattu sans délai par chacun d’entre nous.\nD’abord, jeter du pain est une attitude moralement inacceptable parce que cette nourriture précieuse représente le fruit d’un dur travail et manque encore à de nombreuses personnes dans le monde. Ensuite, à cause du gaspillage quotidien, les familles perdent inutilement leur argent et les déchets augmentent, si bien que l’environnement se dégrade. Enfin, l’eau potable est une richesse limitée : fermer le robinet et acheter uniquement le pain nécessaire sont des gestes simples mais décisifs.\nEn conclusion, adoptons tous une consommation responsable afin que les bienfaits de la nature soient respectés et préservés pour les générations futures.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Une thèse engagée, 3 arguments moraux/sociaux structurés, l’emploi maîtrisé de la cause, de la conséquence et du but avec subjonctif, et un appel final.',
			[
				{ text: 'Une simple liste de cinq mots sans aucune phrase complète.', diagnosticFeedback: 'المطلوب نص حجاجي منظم من 12 إلى 14 سطراً.' },
				{ text: 'Un texte qui défend le gaspillage et l’égoïsme.', diagnosticFeedback: 'التناقض مع التعليمة والقيم الأخلاقية يُفقد علامة الملاءمة.' },
				{ text: 'Une biographie sans lien avec la solidarité ni les valeurs sociales.', diagnosticFeedback: 'يجب الالتزام التام بموضوع التعليمة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Comment réussir le plaidoyer argumentatif du Projet 2 (4AM / BEM) ?',
				questionTextAr: 'كيف تنجح بامتياز في كتابة مرافعة حجاجية (Plaidoyer) للمشروع الثاني BEM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'أطروحة واضحة + 3 حجج أخلاقية واجتماعية + سبب ونتيجة وهدف بـ Subjonctif + خاتمة داعية للعمل.'
			},
			sujetExercise: {
				customTitle: 'III. Production écrite — Situation d’intégration (07 pts)',
				points: 7,
				instruction: 'Rédigez un plaidoyer argumentatif (12 à 14 lignes) conforme aux critères du BEM :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: `Sujet BEM : ${item.title}`,
						sujetUnPrompt: item.prompt,
						sujetUnNotes: item.notes,
						modelAnswer: item.modelAnswer,
						rubricSummary:
							'Pertinence et prise de position claire (2 pts) + Cohérence et progression des 3 arguments (2 pts) + Correction linguistique : cause, conséquence, but + subjonctif, accords (2 pts) + Présentation et lexique moral (1 pt).',
						mark: '7'
					})
				]
			},
			hints: [
				'ابدأ بتشخيص سريع للواقع ثم أعلن أطروحتك بوضوح باستعمال فعل رأي.',
				'أدرج في العرض رابط سبب (parce que / grâce à / à cause de) ورابط نتيجة (si bien que / par conséquent).',
				'اختم بنداء مؤثر يوظف (il faut que + subjonctif) أو (afin que + subjonctif).'
			],
			solutionStepsAr: [
				`الموضوع: ${item.title}`,
				'بناء ثلاث حجج مرتّبة بـ D’abord / Ensuite / Enfin مع توظيف السبب والنتيجة.',
				'إغلاق النص بدعوة أخلاقية ومدنية واضحة بـ Subjonctif présent.'
			],
			finalAnswer: item.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T2: FrenchParameterizedTemplate[] = [
	compSolidariteTouiza4amT2,
	compDialogueTemoignage4amT2,
	langCauseConsequenceBut4amT2,
	langDiscoursSubjonctif4amT2,
	writePlaidoyerSolidarite4amT2
];
