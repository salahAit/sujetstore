import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWordFamilyTableBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Lettres et Philosophie (آداب وفلسفة — yearSubjectId: 769, coeff 3, 02h30, 7+6+7=20)
 * Parameterized Exam & Quiz Templates — Trimestre 1 : Projet 1 « Textes et documents d’histoire » (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
 */
export const TEMPLATES_3AS_LP_T1: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): L’Association des Oulémas & la Révolution algérienne
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t1_comp_revolution_memoire',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): جمعية العلماء المسلمين وثورة التحرير الجزائرية',
		curriculumLessonId: 'fre_lesson_3as_lp_t1_enonciation_historien',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Cheikh Ben Badis et le réveil par le savoir (1931)',
					source: 'D’après une chronique d’histoire culturelle algérienne',
					paragraphs: [
						'Le 5 mai 1931, à Alger, Cheikh Abdelhamid Ben Badis et ses compagnons, parmi lesquels Cheikh Mohamed Bachir El-Ibrahimi et Cheikh Moubarek El-Mili, fondèrent l’Association des Oulémas Musulmans Algériens. Face à une politique coloniale qui fermait les écoles et menaçait l’identité nationale, [[ils]] choisirent le terrain de l’instruction, de la presse et de la réforme morale.',
						'En quelques années seulement, des dizaines d’écoles libres furent ouvertes à Constantine, à Tlemcen et dans les villages des Aurès. Les revues Al-Chihab et El-Bassaïr circulaient de main en main pour diffuser la langue arabe, la culture islamique authentique et l’amour de la patrie. Cette œuvre éducative patiente prépara les consciences d’une génération entière.',
						'Aujourd’hui encore, les historiens soulignent que [[ce mouvement réformiste]] constitua un pilier décisif avant le déclenchement de la lutte armée, car il rappela au peuple algérien sa dignité et son unité.'
					],
					glossary: [
						{ term: 'écoles libres', meaning: 'écoles fondées et financées par les citoyens algériens' },
						{ term: 'pilier', meaning: 'élément fondamental sur lequel repose un édifice ou une action' }
					],
					textTypeCorrect: 'Texte historique à visée informative et commémorative',
					textTypeOptions: [
						'Texte historique à visée informative et commémorative',
						'Texte exhortatif (Appel écologique)',
						'Débat d’idées sur la technologie moderne'
					],
					tfItems: [
						{ q: 'L’Association des Oulémas Musulmans Algériens a été fondée le 5 mai 1931 à Alger.', a: 'Vrai', mark: '0.5' },
						{ q: 'Cheikh Ben Badis limitait son action éducative uniquement à la ville d’Alger.', a: 'Faux', c: 'Des écoles libres furent ouvertes à Constantine, à Tlemcen et dans les villages des Aurès.', mark: '0.5' },
						{ q: 'Les revues Al-Chihab et El-Bassaïr contribuaient à diffuser la culture et la langue nationale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon les historiens, ce mouvement n’eut aucun lien avec la préparation des consciences.', a: 'Faux', c: 'Il constitua un pilier décisif en préparant les consciences avant la lutte armée.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez deux moyens utilisés par les Oulémas pour défendre l’identité algérienne (§1-§2).', a: 'L’ouverture d’écoles libres et la diffusion de revues réformistes (Al-Chihab et El-Bassaïr).', mark: '1' },
						{ q: 'b) Pourquoi les historiens considèrent-ils ce mouvement comme un « pilier décisif » (§3) ?', a: 'Parce qu’il a éveillé les consciences et rappelé au peuple sa dignité et son unité avant la lutte armée.', mark: '1.5' }
					],
					refPrompt: 'a) « ils » (§1)   b) « ce mouvement réformiste » (§3)',
					refAnswer: 'a) « ils » renvoie à Cheikh Abdelhamid Ben Badis et ses compagnons (les Oulémas).   b) « ce mouvement réformiste » renvoie à l’Association des Oulémas Musulmans Algériens.',
					synthPrompt: 'Selon vous, pourquoi le savoir et l’école sont-ils indispensables pour préserver l’identité d’une nation ? Répondez en trois lignes.',
					synthAnswer: 'Oui, le savoir et l’école transmettent la langue, l’histoire et les valeurs morales d’une génération à l’autre. En effet, une jeunesse instruite connaît son patrimoine et sait le défendre avec lucidité et responsabilité.',
					easyQ: 'En quelle année fut fondée l’Association des Oulémas Musulmans Algériens selon le texte ?',
					easyAns: 'En 1931 (le 5 mai 1931)',
					easyWrong: ['En 1954', 'En 1962', 'En 1945'],
					medQ: 'À qui renvoie le pronom souligné « ils » dans le premier paragraphe ?',
					medAns: 'Cheikh Ben Badis et ses compagnons',
					medWrong: ['Les villages des Aurès', 'Les revues Al-Chihab', 'Les historiens contemporains'],
					hardQ: 'Quelle est la visée communicative principale de ce passage historique ?',
					hardAns: 'Informer sur l’œuvre éducative des Oulémas et valoriser son rôle dans l’éveil national',
					hardWrong: [
						'Critiquer l’ouverture des écoles libres',
						'Présenter un débat sur les écrans numériques',
						'Donner une recette pratique de presse'
					]
				},
				{
					title: 'Le 1er Novembre 1954 : l’aube de la libération',
					source: 'D’après les archives de la mémoire nationale algérienne',
					paragraphs: [
						'Dans la nuit du 1er Novembre 1954, une trentaine d’actions coordonnées éclatèrent simultanément dans les Aurès, en Kabylie, dans le Constantinois, l’Algérois et l’Oranie. Quelques jours auparavant, des dirigeants résolus tels que Larbi Ben M’hidi et Didouche Mourad avaient préparé dans la plus stricte discrétion la proclamation qui annonçait au monde la naissance de la Révolution algérienne.',
						'Diffusée dès les premières heures, [[cette déclaration historique]] fixait un objectif clair : la restauration de l’État algérien souverain dans le cadre des principes islamiques et le respect de la dignité humaine. Elle invitait tous les patriotes à dépasser les divisions et à s’unir autour d’une cause juste.',
						'Malgré des moyens matériels modestes face à une armée coloniale suréquipée, la détermination du peuple transforma [[ce sursaut]] en une lutte collective qui aboutit à l’indépendance le 5 juillet 1962.'
					],
					glossary: [
						{ term: 'simultanément', meaning: 'au même moment' },
						{ term: 'sursaut', meaning: 'réveil brusque et énergique face à une injustice' }
					],
					textTypeCorrect: 'Texte historique à visée informative et commémorative',
					textTypeOptions: [
						'Texte historique à visée informative et commémorative',
						'Notice technique scientifique',
						'Dialogue argumentatif sur le sport'
					],
					tfItems: [
						{ q: 'Les actions du 1er Novembre 1954 se sont déroulées dans une seule région d’Algérie.', a: 'Faux', c: 'Elles éclatèrent simultanément dans les Aurès, en Kabylie, dans le Constantinois, l’Algérois et l’Oranie.', mark: '0.5' },
						{ q: 'Larbi Ben M’hidi et Didouche Mourad figurent parmi les dirigeants qui ont préparé la proclamation.', a: 'Vrai', mark: '0.5' },
						{ q: 'La Déclaration du 1er Novembre appelait les Algériens à l’unité nationale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les patriotes disposaient d’un armement supérieur à celui de l’armée coloniale.', a: 'Faux', c: 'Ils disposaient de moyens matériels modestes face à une armée coloniale suréquipée.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel objectif principal fixait la Déclaration du 1er Novembre 1954 (§2) ?', a: 'La restauration de l’État algérien souverain dans le cadre des principes islamiques et de la dignité humaine.', mark: '1' },
						{ q: 'b) Qu’est-ce qui a permis aux Algériens de surmonter la modestie de leurs moyens matériels (§3) ?', a: 'La détermination et l’union collective du peuple autour d’une cause juste.', mark: '1.5' }
					],
					refPrompt: 'a) « cette déclaration historique » (§2)   b) « ce sursaut » (§3)',
					refAnswer: 'a) « cette déclaration historique » renvoie à la proclamation du 1er Novembre 1954.   b) « ce sursaut » renvoie au déclenchement de la Révolution algérienne.',
					synthPrompt: 'Pourquoi est-il important que les jeunes générations étudient la Déclaration du 1er Novembre 1954 ? Justifiez en trois lignes.',
					synthAnswer: 'Étudier la Déclaration du 1er Novembre permet aux jeunes de comprendre les valeurs fondatrices de l’Algérie : liberté, unité et justice. En effet, connaître les sacrifices des aînés renforce le sens civique et la fierté nationale.',
					easyQ: 'Quels deux dirigeants de la Révolution sont cités dans le premier paragraphe ?',
					easyAns: 'Larbi Ben M’hidi et Didouche Mourad',
					easyWrong: ['Ibn Battouta et Al-Idrisi', 'Al-Khwarizmi et Al-Jazari', 'Cheikh Tebessi et Al-Birouni'],
					medQ: 'À quoi renvoie le substitut lexical « cette déclaration historique » (§2) ?',
					medAns: 'La proclamation du 1er Novembre 1954',
					medWrong: ['L’armée coloniale', 'La région de l’Oranie', 'Les moyens matériels'],
					hardQ: 'Quel rapport logique relie les deux propositions dans « Malgré des moyens matériels modestes, la détermination du peuple... » ?',
					hardAns: 'Un rapport de concession (opposition entre faiblesse matérielle et victoire morale)',
					hardWrong: ['Un rapport de but', 'Un rapport de conséquence directe', 'Un rapport de comparaison']
				},
				{
					title: 'Hassiba Ben Bouali et la résilience de la Casbah d’Alger',
					source: 'D’après un récit documentaire sur la Bataille d’Alger (1957)',
					paragraphs: [
						'En 1957, les ruelles étroites de la Casbah d’Alger devinrent le cœur battant de la résistance urbaine. Parmi les jeunes volontaires qui s’engagèrent sans hésitation figurait Hassiba Ben Bouali, une étudiante brillante âgée de dix-neuf ans seulement. Après avoir travaillé comme assistante sociale, [[elle]] mit son courage et son sens de l’organisation au service de la cause nationale.',
						'À l’intérieur des maisons traditionnelles, les habitants rivalisaient de solidarité pour protéger les militants traqués par les patrouilles coloniales. Les témoignages de l’époque rapportent que la dignité calme de Hassiba inspirait respect et confiance autour d’elle.',
						'Encerclée avec ses compagnons le 8 octobre 1957, elle refusa de se rendre et préféra le sacrifice suprême. [[Son exemple]] demeure gravé dans la mémoire collective comme le symbole de l’engagement désintéressé de la jeunesse algérienne.'
					],
					glossary: [
						{ term: 'résilience', meaning: 'capacité à résister et à tenir bon dans l’épreuve' },
						{ term: 'désintéressé', meaning: 'qui agit sans rechercher de profit personnel' }
					],
					textTypeCorrect: 'Texte historique rendant hommage à une figure de la Révolution',
					textTypeOptions: [
						'Texte historique rendant hommage à une figure de la Révolution',
						'Article scientifique sur l’urbanisme moderne',
						'Appel pour le recyclage du papier'
					],
					tfItems: [
						{ q: 'Hassiba Ben Bouali s’est engagée dans la résistance urbaine à l’âge de dix-neuf ans.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les habitants de la Casbah refusaient d’aider les militants en 1957.', a: 'Faux', c: 'Les habitants rivalisaient de solidarité pour protéger les militants.', mark: '0.5' },
						{ q: 'Le 8 octobre 1957, Hassiba Ben Bouali a accepté de se rendre aux patrouilles.', a: 'Faux', c: 'Encerclée avec ses compagnons, elle refusa de se rendre et choisit le sacrifice suprême.', mark: '0.5' },
						{ q: 'Le texte souligne que son exemple incarne l’engagement de la jeunesse algérienne.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel rôle jouèrent les habitants de la Casbah durant la Bataille d’Alger (§2) ?', a: 'Ils firent preuve d’une grande solidarité en protégeant les militants traqués dans leurs maisons.', mark: '1' },
						{ q: 'b) Relevez deux indices lexicaux montrant que l’auteur rend hommage à Hassiba Ben Bouali.', a: '« étudiante brillante », « courage », « dignité calme », « engagement désintéressé » (deux indices au choix).', mark: '1.5' }
					],
					refPrompt: 'a) « elle » (§1)   b) « Son exemple » (§3)',
					refAnswer: 'a) « elle » renvoie à Hassiba Ben Bouali.   b) « Son exemple » renvoie au courage et au sacrifice de Hassiba Ben Bouali.',
					synthPrompt: 'Quel message l’engagement de la jeunesse algérienne durant la Révolution transmet-il aux lycéens d’aujourd’hui ? Répondez en trois lignes.',
					synthAnswer: 'Le courage de jeunes comme Hassiba Ben Bouali rappelle aux lycéens que la jeunesse est capable de grandes responsabilités. Aujourd’hui, cet engagement se traduit par le sérieux dans les études, le civisme et le service du pays.',
					easyQ: 'Quel quartier historique d’Alger est au centre du texte ?',
					easyAns: 'La Casbah d’Alger',
					easyWrong: ['Timgad', 'Le Tassili', 'La Kalâa des Béni Hammad'],
					medQ: 'Que révèle la présence des mots « brillante », « courage » et « dignité calme » sur l’énonciation ?',
					medAns: 'Une subjectivité implicite (lexique mélioratif pour rendre hommage)',
					medWrong: ['Une objectivité totalement neutre', 'Une ironie critique', 'Un style injonctif'],
					hardQ: 'Quelle est la visée communicative dominante de ce texte sur Hassiba Ben Bouali ?',
					hardAns: 'Informer sur son parcours durant la Bataille d’Alger et lui rendre hommage',
					hardWrong: [
						'Débattre des avantages du numérique',
						'Décrire l’architecture des ponts de Constantine',
						'Critiquer la solidarité des quartiers anciens'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع المعلومة التاريخية الصريحة في الفقرة الأولى من النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Compréhension BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الإجابة الصحيحة وفق النص التاريخي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصحيحة الواردة في النص هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تحقق من السياق الدقيق للضمير أو المؤشرات التلفظية في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النصي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل الغاية التواصلية أو العلاقة المنطقية الشاملة في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Synthèse BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استخلص الغاية التواصلية أو البعد التحليلي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture et analyse',
				points: 7,
				instruction: 'Lisez attentivement le texte ci-dessous puis répondez aux questions (7 points — BAC LP) :',
				content: [
					buildFrenchPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Cochez la bonne réponse. Ce document est un :',
								options: chosen.textTypeOptions,
								correct: chosen.textTypeCorrect,
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Répondez aux questions suivantes d’après le texte :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. À qui ou à quoi renvoient les termes soulignés dans le texte ?\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Question de synthèse : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تأكد من تعليل كل عبارة خاطئة (Faux) انطلاقاً من النص دون تخمين.',
					'لإيجاد مرجع الكلمة المسطر تحتها، ارجع إلى الاسم السابق لها وتأكد من النوع والعدد.',
					'في سؤال التركيب الأخير، صغ موقفاً واضحاً مع تعليل شخصي موجز في 3 أسطر.'
				],
				solutionStepsAr: [
					'تحديد طبيعة النص التاريخي وغايته (0.5 نقطة).',
					'الإجابة عن جمل الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة المركزة عن سؤالي الفهم العميق (2.5 نقطة).',
					'فك الإحالة النصية وتحرير فقرة التركيب المعلّلة (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Les savants historiens & la presse réformiste algérienne
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t1_comp_historiens_heritage',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): المؤرخون الجزائريون والصحافة الإصلاحية',
		curriculumLessonId: 'fre_lesson_3as_lp_t1_temps_passe_present_historique',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Cheikh Moubarek El-Mili et l’écriture de l’histoire nationale',
					source: 'D’après des études sur l’historiographie algérienne',
					paragraphs: [
						'Durant les années 1920 et 1930, alors que les manuels coloniaux présentaient l’Algérie comme une terre sans passé propre, Cheikh Moubarek El-Mili entreprit un travail titanesque : rédiger une histoire complète de l’Algérie ancienne et moderne. En 1928, [[il]] publia le premier tome de son ouvrage monumental, redonnant aux lecteurs algériens la fierté de leurs origines.',
						'Aux côtés de Cheikh Larbi Tebessi et de Cheikh Mohamed Bachir El-Ibrahimi, El-Mili démontra que l’écriture rigoureuse de l’histoire constituait une véritable forme de résistance culturelle. Il consultait les manuscrits de Tlemcen, de Béjaïa et de Constantine afin de vérifier chaque chronique avant de la transmettre.',
						'Des décennies plus tard, l’historien Abou El-Kacem Saadallah poursuivit [[cette noble mission]] en documentant l’histoire culturelle de l’Algérie dans une encyclopédie de référence, prouvant que la plume de l’historien protège la mémoire d’un peuple.'
					],
					glossary: [
						{ term: 'historiographie', meaning: 'étude et écriture scientifique de l’histoire' },
						{ term: 'titanesque', meaning: 'qui exige un effort immense et exceptionnel' }
					],
					tfItems: [
						{ q: 'Cheikh Moubarek El-Mili a publié le premier tome de son histoire de l’Algérie en 1928.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les manuels coloniaux valorisaient le passé culturel de l’Algérie.', a: 'Faux', c: 'Ils présentaient au contraire l’Algérie comme une terre sans passé propre.', mark: '0.5' },
						{ q: 'El-Mili vérifiait les manuscrits de Tlemcen, Béjaïa et Constantine pour rédiger son œuvre.', a: 'Vrai', mark: '0.5' },
						{ q: 'Abou El-Kacem Saadallah s’est désintéressé de l’histoire culturelle algérienne.', a: 'Faux', c: 'Il a poursuivi cette mission en rédigeant une encyclopédie de référence sur l’histoire culturelle de l’Algérie.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel défi intellectuel Cheikh Moubarek El-Mili a-t-il relevé en 1928 (§1) ?', a: 'Rédiger une histoire complète et documentée de l’Algérie pour réfuter les manuels coloniaux qui niaient son passé.', mark: '1' },
						{ q: 'b) Comment l’auteur qualifie-t-il le travail historique dans les paragraphes 2 et 3 ?', a: 'Il le qualifie de « véritable forme de résistance culturelle » et de « noble mission » qui protège la mémoire du peuple.', mark: '1.5' }
					],
					refPrompt: 'a) « il » (§1)   b) « cette noble mission » (§3)',
					refAnswer: 'a) « il » renvoie à Cheikh Moubarek El-Mili.   b) « cette noble mission » renvoie à l’écriture rigoureuse de l’histoire nationale pour protéger la mémoire du peuple.',
					synthPrompt: 'Selon vous, comment la plume d’un historien peut-elle défendre la mémoire d’un peuple ? Justifiez en trois lignes.',
					synthAnswer: 'La plume de l’historien établit les faits grâce aux archives et empêche l’oubli ou la falsification du passé. En documentant les luttes et le patrimoine scientifique, l’historien transmet aux générations futures des repères authentiques.',
					easyQ: 'En quelle année Cheikh Moubarek El-Mili publia-t-il le premier tome de son ouvrage ?',
					easyAns: 'En 1928',
					easyWrong: ['En 1962', 'En 1954', 'En 1975'],
					medQ: 'Quelle est la valeur de l’imparfait « consultait » dans le paragraphe 2 ?',
					medAns: 'Une habitude et une méthode de travail répétée dans le passé',
					medWrong: ['Une action future certaine', 'Un ordre direct au lecteur', 'Une hypothèse irréelle'],
					hardQ: 'Que remplace l’expression soulignée « cette noble mission » au paragraphe 3 ?',
					hardAns: 'L’écriture rigoureuse de l’histoire nationale comme résistance culturelle',
					hardWrong: ['La fermeture des manuels', 'Un simple voyage touristique', 'La censure coloniale']
				},
				{
					title: 'Le poète Mohamed El-Aïd Al-Khalifa et le journal El-Bassaïr',
					source: 'D’après une anthologie de la presse réformiste algérienne',
					paragraphs: [
						'Dans les années 1930 et 1940, la presse réformiste algérienne joua un rôle irremplaçable d’école populaire. Fondé par l’Association des Oulémas et dirigé avec éloquence par Cheikh Mohamed Bachir El-Ibrahimi, le journal El-Bassaïr offrait chaque semaine des articles de réflexion, des chroniques sociales et des poèmes patriotiques signés par Mohamed El-Aïd Al-Khalifa et Cheikh Ahmed Sahnoun.',
						'Lorsque les autorités coloniales interdisaient un numéro, les rédacteurs trouvaient avec ténacité des moyens légaux et pacifiques pour relancer [[leur tribune]]. Dans les villages reculés, les lettrés lisaient le journal à haute voix devant les artisans et les fellahs rassemblés.',
						'Par la force des mots et la clarté des idées, [[ces pages]] forgèrent une conscience nationale unie qui prépara le terrain à la libération du pays.'
					],
					glossary: [
						{ term: 'éloquence', meaning: 'art de bien s’exprimer avec force et clarté' },
						{ term: 'tribune', meaning: 'journal ou espace d’expression publique' }
					],
					tfItems: [
						{ q: 'Le journal El-Bassaïr a été dirigé par Cheikh Mohamed Bachir El-Ibrahimi.', a: 'Vrai', mark: '0.5' },
						{ q: 'Mohamed El-Aïd Al-Khalifa et Cheikh Ahmed Sahnoun publiaient des textes dans la presse réformiste.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les autorités coloniales encourageaient librement la parution de tous les numéros d’El-Bassaïr.', a: 'Faux', c: 'Les autorités coloniales interdisaient parfois certains numéros du journal.', mark: '0.5' },
						{ q: 'Dans les villages, personne ne s’intéressait aux articles du journal.', a: 'Faux', c: 'Les lettrés lisaient le journal à haute voix devant les artisans et les fellahs rassemblés.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Comment les habitants des villages reculés accédaient-ils au contenu d’El-Bassaïr (§2) ?', a: 'Les lettrés leur lisaient le journal à haute voix lors de rassemblements d’artisans et de fellahs.', mark: '1' },
						{ q: 'b) Quel effet durable la presse réformiste a-t-elle produit sur la société algérienne (§3) ?', a: 'Elle a forgé une conscience nationale unie qui a préparé le terrain à la libération du pays.', mark: '1.5' }
					],
					refPrompt: 'a) « leur tribune » (§2)   b) « ces pages » (§3)',
					refAnswer: 'a) « leur tribune » renvoie au journal El-Bassaïr.   b) « ces pages » renvoie aux articles et poèmes publiés dans le journal El-Bassaïr.',
					synthPrompt: 'Pensez-vous qu’une presse sérieuse et engagée conserve aujourd’hui un rôle éducatif ? Justifiez en trois lignes.',
					synthAnswer: 'Oui, une presse sérieuse et vérifiée éduque les citoyens en combattant les rumeurs et en analysant les enjeux réels de la société. En diffusant une information fiable et un langage soigné, elle éclaire l’opinion publique.',
					easyQ: 'Qui dirigeait le journal El-Bassaïr mentionné dans le premier paragraphe ?',
					easyAns: 'Cheikh Mohamed Bachir El-Ibrahimi',
					easyWrong: ['Ibn Al-Haytham', 'Al-Zahrawi', 'Ibn Khaldoun'],
					medQ: 'À quoi renvoie l’expression « leur tribune » dans le paragraphe 2 ?',
					medAns: 'Le journal El-Bassaïr',
					medWrong: ['Les autorités coloniales', 'Les villages reculés', 'Les artisans'],
					hardQ: 'Pourquoi l’auteur compare-t-il la presse réformiste à une « école populaire » (§1) ?',
					hardAns: 'Parce qu’elle instruisait et éveillait toute la population, y compris dans les villages par la lecture publique',
					hardWrong: [
						'Parce qu’elle ne publiait que des exercices d’arithmétique',
						'Parce qu’elle était réservée aux enfants de primaire',
						'Parce qu’elle interdisait la poésie patriotique'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى الفقرة الأولى للتثبت من الاسم أو التاريخ المذكور صراحة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Compréhension BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعلومة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تثبت من المرجع أو القيمة الزمنية في سياق الفقرة الثانية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'اختر التحليل الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'اربط بين الأفكار الأساسية للفقرات الثلاث لفهم الدلالة العميقة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Interprétation BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الدلالة التحليلية الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture et analyse',
				points: 7,
				instruction: 'Lisez le texte historique suivant puis traitez les questions (7 points — BAC LP) :',
				content: [
					buildFrenchPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Ce texte a pour visée communicative principale de :',
								options: [
									'Informer sur la résistance culturelle algérienne et valoriser ses acteurs',
									'Critiquer l’usage de la langue écrite',
									'Présenter un appel pour le recyclage industriel'
								],
								correct: 'Informer sur la résistance culturelle algérienne et valoriser ses acteurs',
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Répondez avec précision aux questions suivantes :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Précisez le référent de chaque expression soulignée :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Question de synthèse : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'اربط بين دور المؤرخ ودور الصحافة الإصلاحية في الحفاظ على الهوية.',
					'صحّح كل جملة خاطئة بجملة كاملة مأخوذة من معنى النص.',
					'في سؤال التركيب، تفادَ النسخ الحرفي وصغ فكرتين واضحتين.'
				],
				solutionStepsAr: [
					'تحديد الغاية التواصلية للنص (0.5 نقطة).',
					'تمييز الصواب والخطأ مع التعليل (2 نقطتان).',
					'الإجابة الدقيقة عن أسئلة الفهم (2.5 نقطة).',
					'فك الإحالة وتحرير فقرة التركيب (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Nominalisation, voix passive & temps historiques
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t1_exp_nominalisation_passif',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'grammaire_syntaxe',
		titleAr: 'البناء اللغوي (6 نقاط — آداب وفلسفة): التسمية، المبني للمجهول وأزمنة النص التاريخي',
		curriculumLessonId: 'fre_lesson_3as_lp_t1_nominalisation_passif',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: '1. Classez les mots suivants en deux champs lexicaux : écoles - lutte - martyrs - revues - savoir - indépendance.',
					tableCols: [
						{ header: 'Champ lexical de l’éducation', items: ['écoles', 'revues', 'savoir'], mark: '0.5' },
						{ header: 'Champ lexical de la résistance', items: ['lutte', 'martyrs', 'indépendance'], mark: '0.5' }
					],
					wordFamilyRows: [
						{ verbe: { given: true, value: 'déclencher' }, nom: { value: 'déclenchement', mark: '0.25' }, adjectif: { value: 'déclenché', mark: '0.25' } },
						{ verbe: { value: 'libérer', mark: '0.25' }, nom: { given: true, value: 'libération' }, adjectif: { value: 'libéré / libre', mark: '0.25' } },
						{ verbe: { value: 'résister', mark: '0.25' }, nom: { value: 'résistance', mark: '0.25' }, adjectif: { given: true, value: 'résistant' } }
					],
					transforms: [
						{
							q: 'a) Nominalisez : « Les patriotes ont proclamé l’indépendance en 1962. »',
							a: 'a) La proclamation de l’indépendance par les patriotes en 1962.'
						},
						{
							q: 'b) Mettez à la voix passive : « Cheikh Ben Badis fonda l’Association des Oulémas en 1931. »',
							a: 'b) L’Association des Oulémas fut fondée par Cheikh Ben Badis en 1931.'
						}
					],
					tensePrompt: '4. Indiquez la valeur du temps souligné dans chaque phrase :\na) En 1954, le peuple algérien engage la lutte pour sa liberté. (Présent)\nb) Les écoles libres accueillaient chaque année des centaines d’élèves. (Imparfait)',
					tenseAnswer: 'a) Présent historique (de narration) : actualise l’événement passé.\nb) Imparfait d’habitude et de description d’arrière-plan.',
					easyQ: 'Quel nom correspond au verbe « déclencher » dans un titre historique ?',
					easyAns: 'le déclenchement',
					easyWrong: ['la déclenchation', 'la déclenchure', 'le déclenchage'],
					medQ: 'Quelle est la forme passive exacte de : « Cheikh Ben Badis fonda l’Association en 1931 » ?',
					medAns: 'L’Association fut fondée par Cheikh Ben Badis en 1931.',
					medWrong: [
						'L’Association est fondée par Cheikh Ben Badis en 1931.',
						'L’Association fut fondé par Cheikh Ben Badis en 1931.',
						'L’Association était fondée par Cheikh Ben Badis en 1931.'
					],
					hardQ: 'Pourquoi emploie-t-on le présent dans « En 1954, le peuple algérien engage la lutte » ?',
					hardAns: 'C’est un présent historique qui rend le récit passé plus vivant et plus proche du lecteur',
					hardWrong: [
						'Parce que l’auteur a oublié la date de 1954',
						'Pour exprimer une action qui se passera dans le futur',
						'Pour formuler un ordre à l’impératif'
					]
				},
				{
					lexisPrompt: '1. Classez les termes suivants dans le tableau : archives - courage - chronique - sacrifice - manuscrits - héroïsme.',
					tableCols: [
						{ header: 'Champ lexical de la mémoire écrite', items: ['archives', 'chronique', 'manuscrits'], mark: '0.5' },
						{ header: 'Champ lexical du dévouement', items: ['courage', 'sacrifice', 'héroïsme'], mark: '0.5' }
					],
					wordFamilyRows: [
						{ verbe: { given: true, value: 'publier' }, nom: { value: 'publication', mark: '0.25' }, adjectif: { value: 'publié / public', mark: '0.25' } },
						{ verbe: { value: 'unifier', mark: '0.25' }, nom: { given: true, value: 'unification' }, adjectif: { value: 'unifié', mark: '0.25' } },
						{ verbe: { value: 'commémorer', mark: '0.25' }, nom: { value: 'commémoration', mark: '0.25' }, adjectif: { given: true, value: 'commémoratif' } }
					],
					transforms: [
						{
							q: 'a) Nominalisez : « On a restauré la Casbah d’Alger avec soin. »',
							a: 'a) La restauration soigneuse de la Casbah d’Alger.'
						},
						{
							q: 'b) Mettez à la voix passive : « On a diffusé la Déclaration du 1er Novembre dans tout le pays. »',
							a: 'b) La Déclaration du 1er Novembre a été diffusée dans tout le pays.'
						}
					],
					tensePrompt: '4. Conjuguez les verbes entre parenthèses au plus-que-parfait ou au passé simple selon l’antériorité :\nCheikh El-Mili (publier) son livre après qu’il (consulter) de nombreux manuscrits anciens.',
					tenseAnswer: 'Cheikh El-Mili publia son livre après qu’il avait consulté (ou eut consulté) de nombreux manuscrits anciens.',
					easyQ: 'Quel nom dérive du verbe « commémorer » ?',
					easyAns: 'la commémoration',
					easyWrong: ['le commémorément', 'la commémorance', 'le commémorage'],
					medQ: 'Transformez à la voix passive : « On a diffusé la Déclaration dans tout le pays. »',
					medAns: 'La Déclaration a été diffusée dans tout le pays.',
					medWrong: [
						'La Déclaration a été diffusée par on dans tout le pays.',
						'La Déclaration fut diffusé dans tout le pays.',
						'La Déclaration est diffusée par on dans tout le pays.'
					],
					hardQ: 'Dans « Il publia l’ouvrage qu’il avait patiemment documenté », quel rapport exprime « avait documenté » ?',
					hardAns: 'L’antériorité d’une action passée par rapport au passé simple « publia »',
					hardWrong: [
						'La simultanéité avec le moment présent',
						'Une condition irréelle dans le futur',
						'Un ordre adressé au lecteur'
					]
				},
				{
					lexisPrompt: '1. Répartissez ces mots en deux colonnes : patrie - oppression - souveraineté - censure - liberté - interdiction.',
					tableCols: [
						{ header: 'Idéal national', items: ['patrie', 'souveraineté', 'liberté'], mark: '0.5' },
						{ header: 'Politique coloniale', items: ['oppression', 'censure', 'interdiction'], mark: '0.5' }
					],
					wordFamilyRows: [
						{ verbe: { given: true, value: 'organiser' }, nom: { value: 'organisation', mark: '0.25' }, adjectif: { value: 'organisé', mark: '0.25' } },
						{ verbe: { value: 'rassembler', mark: '0.25' }, nom: { given: true, value: 'rassemblement' }, adjectif: { value: 'rassemblé', mark: '0.25' } },
						{ verbe: { value: 'témoigner', mark: '0.25' }, nom: { value: 'témoignage', mark: '0.25' }, adjectif: { given: true, value: 'témoin' } }
					],
					transforms: [
						{
							q: 'a) Nominalisez : « Les militants organisent le Congrès de la Soummam. »',
							a: 'a) L’organisation du Congrès de la Soummam par les militants.'
						},
						{
							q: 'b) Mettez à la voix passive : « Les autorités coloniales interdisaient les revues réformistes. »',
							a: 'b) Les revues réformistes étaient interdites par les autorités coloniales.'
						}
					],
					tensePrompt: '4. Précisez la valeur des temps dans : « La censure frappait la presse lorsque El-Bassaïr reparut. »',
					tenseAnswer: '« frappait » (imparfait) : situation durable d’arrière-plan ; « reparut » (passé simple) : événement ponctuel de premier plan.',
					easyQ: 'Quel nom correspond au verbe « témoigner » ?',
					easyAns: 'un témoignage',
					easyWrong: ['une témoignation', 'un témoignement', 'une témoinance'],
					medQ: 'Transformez à la voix passive : « Les autorités interdisaient les revues. »',
					medAns: 'Les revues étaient interdites par les autorités.',
					medWrong: [
						'Les revues furent interdites par les autorités.',
						'Les revues étaient interdit par les autorités.',
						'Les revues sont interdites par les autorités.'
					],
					hardQ: 'Dans la voix passive « Les revues étaient interdites », pourquoi « interdites » prend-il « -es » ?',
					hardAns: 'Parce que le participe passé employé avec « être » s’accorde en genre et en nombre avec le sujet « Les revues »',
					hardWrong: [
						'Parce que le verbe est conjugué au futur simple',
						'Parce que « autorités » est placé avant le verbe',
						'Parce que tous les participes passés prennent -es'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع لواحق التسمية (Nominalisation) المقررة في الوحدة الأولى.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الاسم المشتق الصحيح (Nominalisation):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاسم الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لزمن المساعد être ومطابقة اسم المفعول وحذف par on.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل السليم إلى المبني للمجهول:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصياغة الصحيحة للمبني للمجهول هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل قيمة الزمن التاريخي أو قاعدة المطابقة النحوية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد التفسير النحوي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التعليل الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez soigneusement les activités de langue suivantes (6 points — BAC LP) :',
				content: [
					{
						type: 'text',
						content: chosen.lexisPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.tableCols }),
					{
						type: 'text',
						content: '2. Complétez le tableau de la famille de mots suivant :'
					},
					buildFrenchWordFamilyTableBlock(chosen.wordFamilyRows),
					{
						type: 'text',
						content: `3. Effectuez les transformations demandées :\n${chosen.transforms.map((t) => t.q).join('\n')}`,
						answer: chosen.transforms.map((t) => t.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.tensePrompt,
						answer: chosen.tenseAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'grammaire_syntaxe',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في التسمية (Nominalisation)، اختر اللاحقة الصحيحة (-tion, -ment, -age, -ance).',
					'في المبني للمجهول، طابق زمن المساعد être مع الفعل الأصلي ولا تكتب « par on ».',
					'ميّز بين Imparfait (وصف/عادة) و Passé simple (حدث حاسم) و Présent historique (إحياء الحدث).'
				],
				solutionStepsAr: [
					'تصنيف الحقول الدلالية (1 نقطة).',
					'إكمال جدول عائلة الكلمات (1.5 نقطة).',
					'التسمية والتحويل إلى المبني للمجهول (2 نقطتان).',
					'تحليل وتوظيف أزمنة النص التاريخي (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Discours rapporté, énonciation & synthèse lacunaire
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t1_exp_discours_enonciation',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (6 نقاط — آداب وفلسفة): الخطاب المنقول، مؤشرات الذاتية والموضوعية، وملء الفراغات',
		curriculumLessonId: 'fre_lesson_3as_lp_t1_discours_rapporte_temoignage',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez ces expressions selon qu’elles relèvent de l’objectivité ou de la subjectivité : le 5 mai 1931 - lutte héroïque - selon les archives - régime injuste - à Constantine - œuvre admirable.',
					classCols: [
						{ header: 'Indices d’objectivité', items: ['le 5 mai 1931', 'selon les archives', 'à Constantine'], mark: '0.75' },
						{ header: 'Indices de subjectivité', items: ['lutte héroïque', 'régime injuste', 'œuvre admirable'], mark: '0.75' }
					],
					speechPrompts: [
						{
							q: 'a) Mettez au discours indirect : Le témoin affirma : « Nous avons défendu notre école avec courage. »',
							a: 'a) Le témoin affirma qu’ils avaient défendu leur école avec courage.'
						},
						{
							q: 'b) Mettez au discours indirect : Cheikh Ben Badis dit aux jeunes : « Instruisez-vous sans relâche ! »',
							a: 'b) Cheikh Ben Badis dit aux jeunes de s’instruire sans relâche.'
						}
					],
					synPrompt: '3. Reliez chaque terme historique à son synonyme : a) chronique   b) patrie   c) ténacité\n(1. persévérance   2. pays natal   3. récit historique)',
					synAnswer: 'a - 3   |   b - 2   |   c - 1',
					clozePrompt: '4. Complétez le paragraphe avec les mots suivants : mémoire - témoignages - historiens - archives.\nPour reconstituer fidèlement le passé, les (1) .......... recoupent les (2) .......... officielles et les (3) .......... vivants, préservant ainsi la (4) .......... collective.',
					clozeAnswer: '1) historiens   2) archives   3) témoignages   4) mémoire',
					easyQ: 'Comment transpose-t-on « Instruisez-vous ! » au discours indirect après « Il leur dit » ?',
					easyAns: 'Il leur dit de s’instruire.',
					easyWrong: ['Il leur dit qu’instruisez-vous.', 'Il leur dit si s’instruire.', 'Il leur dit qu’ils instruisent.'],
					medQ: 'Transformez au discours indirect : Le témoin affirma : « Nous avons défendu notre école. »',
					medAns: 'Le témoin affirma qu’ils avaient défendu leur école.',
					medWrong: [
						'Le témoin affirma qu’ils ont défendu notre école.',
						'Le témoin affirma que nous avions défendu leur école.',
						'Le témoin affirma qu’ils défendront leur école.'
					],
					hardQ: 'Lequel de ces couples rassemble uniquement des indices d’objectivité historique ?',
					hardAns: '« le 5 mai 1931 » et « selon les archives »',
					hardWrong: [
						'« lutte héroïque » et « œuvre admirable »',
						'« régime injuste » et « à Constantine »',
						'« œuvre admirable » et « le 5 mai 1931 »'
					]
				},
				{
					classPrompt: '1. Classez les expressions suivantes en deux catégories : en juillet 1962 - courage exemplaire - document officiel - répression féroce - dans les Aurès - sacrifice glorieux.',
					classCols: [
						{ header: 'Faits objectifs', items: ['en juillet 1962', 'document officiel', 'dans les Aurès'], mark: '0.75' },
						{ header: 'Jugements évaluatifs', items: ['courage exemplaire', 'répression féroce', 'sacrifice glorieux'], mark: '0.75' }
					],
					speechPrompts: [
						{
							q: 'a) Mettez au discours indirect : Le journaliste déclara : « La liberté triomphera demain. »',
							a: 'a) Le journaliste déclara que la liberté triompherait le lendemain.'
						},
						{
							q: 'b) Mettez au discours indirect : L’historien demanda : « Avez-vous conservé les anciens journaux ? »',
							a: 'b) L’historien demanda s’ils avaient conservé les anciens journaux.'
						}
					],
					synPrompt: '3. Reliez chaque mot à sa définition : a) censure   b) souveraineté   c) commémorer\n(1. indépendance totale d’un État   2. rappeler solennellement un événement passé   3. contrôle et interdiction d’une publication)',
					synAnswer: 'a - 3   |   b - 1   |   c - 2',
					clozePrompt: '4. Complétez avec les mots proposés : dignité - écoles - unité - presse.\nGrâce à la (1) .......... réformiste et aux (2) .......... libres, le peuple algérien a renforcé son (3) .......... et défendu sa (4) .......... .',
					clozeAnswer: '1) presse   2) écoles   3) unité   4) dignité',
					easyQ: 'Par quel mot de liaison introduit-on une question totale (oui/non) au discours indirect ?',
					easyAns: 'si (ou s’ devant il / ils)',
					easyWrong: ['que', 'dont', 'afin de'],
					medQ: 'Transformez au discours indirect : Le journaliste déclara : « La liberté triomphera demain. »',
					medAns: 'Le journaliste déclara que la liberté triompherait le lendemain.',
					medWrong: [
						'Le journaliste déclara que la liberté triomphera demain.',
						'Le journaliste déclara que la liberté triomphait la veille.',
						'Le journaliste déclara que la liberté triompherait hier.'
					],
					hardQ: 'Pourquoi « répression féroce » ne peut-il pas être classé dans les indices d’objectivité ?',
					hardAns: 'Parce que l’adjectif « féroce » porte un jugement péjoratif qui marque la subjectivité implicite',
					hardWrong: [
						'Parce que c’est une date précise',
						'Parce que c’est un nom propre de lieu',
						'Parce que c’est un verbe à l’impératif'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد التحويل من الخطاب المباشر إلى غير المباشر.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة الصحيحة في الخطاب المنقول:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `القاعدة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تحقق من توافق الأزمنة والضمائر والظروف الزمنية مع فعل القول الماضي.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل الدقيق إلى الخطاب غير المباشر:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الدقيق هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'ميّز بين الوقائع المحايدة (تواريخ، أماكن، مصادر) والصفات التقييمية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد التحليل التلفظي السليم:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Réalisez les exercices de langue suivants avec précision (6 points — BAC LP) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: `2. Transposez les phrases suivantes au discours indirect :\n${chosen.speechPrompts.map((s) => s.q).join('\n')}`,
						answer: chosen.speechPrompts.map((s) => s.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.synPrompt,
						answer: chosen.synAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: chosen.clozePrompt,
						answer: chosen.clozeAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر أن فعل القول في الماضي يحوّل Présent إلى Imparfait و Passé composé إلى Plus-que-parfait و Futur إلى Conditionnel.',
					'الجملة الأمرية تتحول إلى « de + infinitif »، والسؤال الكلي يُنقل بـ « si ».',
					'في ملء الفراغات، تأكد من التوافق النحوي والدلالي لكل كلمة.'
				],
				solutionStepsAr: [
					'تصنيف مؤشرات الموضوعية والذاتية (1.5 نقطة).',
					'التحويل إلى الخطاب غير المباشر (2 نقطتان).',
					'الربط المعجمي للمفردات التاريخية (1 نقطة).',
					'إكمال الفقرة التاريخية الناقصة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (7 pts — Integration): Compte Rendu Critique & Article historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t1_we_compte_rendu_critique',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (7 نقاط — آداب وفلسفة): التقرير النقدي لنص تاريخي أو مقال حول الذاكرة الوطنية',
		curriculumLessonId: 'fre_lesson_3as_lp_t1_compte_rendu_critique',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique (environ 150 mots) d’un texte historique intitulé « Cheikh Ben Badis et le réveil par le savoir », qui paraîtra dans le journal de votre lycée pour commémorer la Journée du Savoir (16 avril).',
					sujetUnNotes: [
						'Paragraphe 1 (Accroche) : titre, auteur/source, type historique, thème et visée communicative.',
						'Paragraphe 2 (Résumé objectif) : reformuler les idées clés à la 3e personne et au présent (fondation de l’Association en 1931, écoles libres, presse Al-Chihab et El-Bassaïr, préparation des consciences).',
						'Paragraphe 3 (Critique constructive) : apprécier la richesse documentaire et la clarté du style, tout en proposant une nuance pertinente.'
					],
					sujetDeuxPrompt:
						'À l’occasion de la commémoration du 1er Novembre, rédigez un texte historique d’environ 150 mots pour le site culturel de votre lycée afin de montrer comment l’union entre les savants réformistes et les moudjahidine a conduit l’Algérie vers l’indépendance.',
					modelAnswer:
						'Ce texte historique intitulé « Cheikh Ben Badis et le réveil par le savoir », extrait d’une chronique d’histoire culturelle algérienne, présente l’action éducative de l’Association des Oulémas dans le but d’informer les lecteurs et de rendre hommage à ces réformateurs.\nDans un premier temps, l’auteur rappelle que Cheikh Abdelhamid Ben Badis, accompagné notamment de Cheikh El-Ibrahimi et Cheikh El-Mili, créa l’Association le 5 mai 1931 à Alger pour protéger l’identité nationale par l’école et la réforme morale. Ensuite, il explique que la multiplication des écoles libres et la diffusion des revues Al-Chihab et El-Bassaïr permirent d’instruire une génération entière. Enfin, il souligne que cet éveil intellectuel prépara directement les consciences avant la lutte armée.\nÀ mon avis, ce document revêt une grande valeur pédagogique car il repose sur des dates exactes et un lexique clair et accessible. Toutefois, l’insertion d’une courte citation originale tirée du journal El-Bassaïr aurait rendu ce témoignage encore plus vivant.',
					rubricSummary: 'Organisation en 3 parties distinctes (Accroche 1.5 + Résumé reformulé 2.5 + Critique argumentée 1.5) + Correction de la langue (1.5).',
					easyQ: 'Combien de parties structurelles composent obligatoirement un compte rendu critique au BAC LP ?',
					easyAns: 'Trois parties : l’accroche, le résumé objectif et la critique constructive',
					easyWrong: [
						'Une seule phrase de résumé sans critique',
						'Deux parties uniquement sans avis personnel',
						'Cinq tableaux de conjugaison'
					],
					medQ: 'Quelle formule convient pour ouvrir la 3e partie (la critique) d’un compte rendu critique ?',
					medAns: 'À mon avis, ce texte revêt une grande valeur historique grâce à la précision de ses repères...',
					medWrong: [
						'Le texte a été fondé en 1931.',
						'D’abord, l’auteur rappelle une date.',
						'En 1954, les militants se réunirent.'
					],
					hardQ: 'Qu’est-ce qui rend une critique constructive vraiment pertinente au BAC LP ?',
					hardAns: 'Évaluer à la fois le fond (richesse historique, crédibilité) et la forme (clarté, objectivité) avec une nuance argumentée',
					hardWrong: [
						'Écrire simplement « Ce texte est très joli »',
						'Recopier intégralement la conclusion du texte source',
						'Contredire les dates historiques sans preuve'
					]
				},
				{
					sujetUnPrompt:
						'Faites le compte rendu critique (environ 150 mots) d’un texte historique consacré à la Déclaration du 1er Novembre 1954 et au rôle unificateur de ses rédacteurs (Larbi Ben M’hidi, Didouche Mourad).',
					sujetUnNotes: [
						'Paragraphe 1 (Accroche) : présenter le texte, son thème et sa visée commémorative.',
						'Paragraphe 2 (Résumé objectif) : exposer les faits clés à la 3e personne au présent sans recopier le texte.',
						'Paragraphe 3 (Critique) : donner un jugement motivé sur la clarté chronologique, la portée mémorielle et l’absence ou présence de témoignages directs.'
					],
					sujetDeuxPrompt:
						'Rédigez un article commémoratif d’environ 150 mots présentant une figure algérienne (Cheikh El-Ibrahimi, Cheikh El-Mili ou Hassiba Ben Bouali) afin de montrer aux jeunes l’importance de préserver la mémoire nationale.',
					modelAnswer:
						'Ce texte historique intitulé « Le 1er Novembre 1954 : l’aube de la libération », tiré des archives de la mémoire nationale, retrace le déclenchement de la Révolution algérienne afin d’informer les jeunes lecteurs et de commémorer cet événement fondateur.\nD’abord, l’auteur précise que la nuit du 1er Novembre 1954 fut marquée par des opérations coordonnées à travers tout le territoire, préparées discrètement par des dirigeants tels que Larbi Ben M’hidi et Didouche Mourad. Ensuite, il montre que la proclamation diffusée ce jour-là fixait un projet clair fondé sur la souveraineté, les principes islamiques et l’unité nationale. Enfin, il souligne que la détermination collective du peuple triompha malgré des moyens modestes jusqu’à l’indépendance en 1962.\nPour ma part, j’estime que ce texte réussit à synthétiser une étape cruciale de notre histoire avec un style sobre, rigoureux et accessible. Néanmoins, l’auteur aurait pu enrichir son propos en citant un bref extrait authentique de la Déclaration elle-même.',
					rubricSummary: 'Respect de la consigne et plan en 3 parties (1.5) + Fidélité et reformulation (2.5) + Pertinence de la critique (1.5) + Langue et orthographe (1.5).',
					easyQ: 'Quel pronom personnel doit-on éviter dans le deuxième paragraphe (résumé) du compte rendu critique ?',
					easyAns: 'Le pronom « je » (on résume à la 3e personne : L’auteur montre que...)',
					easyWrong: ['Le pronom « il »', 'L’expression « L’historien »', 'L’expression « L’auteur »'],
					medQ: 'Quel est le barème officiel de la Production écrite au BAC 3AS Lettres et Philosophie ?',
					medAns: '7 points sur 20',
					medWrong: ['8 points sur 20', '6 points sur 20', '5 points sur 20'],
					hardQ: 'Comment introduire une remarque nuancée à la fin de la partie critique sans dévaloriser le texte ?',
					hardAns: '« Toutefois, l’insertion d’un court témoignage d’époque aurait rendu l’exposé encore plus vivant. »',
					hardWrong: [
						'« Ce texte est mauvais et inutile. »',
						'« Je n’ai pas lu le dernier paragraphe. »',
						'« En 1962, le texte se termine bien. »'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع المنهجية الرسمية للتقرير النقدي في شعبة آداب وفلسفة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة المنهجية الصحيحة للتقرير النقدي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `القاعدة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من سلم التنقيط الرسمي أو صيغة افتتاح الفقرة النقدية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الجواب المنهجي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'النقد البناء يعلل تقييمه للمضمون والشكل بأسلوب موضوعي رصين.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد الصياغة النقدية الأرقى والأكثر إقناعاً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الأمثل هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez au choix l’un des deux sujets proposés (7 points — BAC LP) :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique) :',
						sujetUnPrompt: chosen.sujetUnPrompt,
						sujetUnNotes: chosen.sujetUnNotes,
						sujetDeuxPrompt: chosen.sujetDeuxPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '7'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'قسّم التقرير النقدي إلى ثلاث فقرات مرئية بوضوح: تقديم، تلخيص موضوعي، ثم نقد بنّاء.',
					'استعمل زمن المضارع وضمير الغائب في فقرة التلخيص، واحتفظ بـ « À mon avis » للفقرة النقدية فقط.',
					'راجع التطابق الإملائي والترقيم قبل تسليم ورقتك.'
				],
				solutionStepsAr: [
					'تحرير فقرة التقديم الشاملة لعناصر الهوية والغاية (1.5 نقطة).',
					'إعادة صياغة الأفكار الرئيسية دون نسخ حرفي (2.5 نقطة).',
					'صياغة فقرة نقدية معللة للشكل والمضمون (1.5 نقطة).',
					'سلامة اللغة، الروابط المنطقية والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
