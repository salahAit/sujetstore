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
 * 3AS BAC Langues Étrangères (لغات أجنبية — yearSubjectId: 788, coeff 5, 03h30, 6+6+8=20)
 * Parameterized Exam & Quiz Templates — Trimestre 2 : Projet 2 « Le débat d’idées » (5 templates)
 * Roles: 2 comprehension (6 pts) + 2 text_exploration (6 pts) + 1 written_expression (8 pts)
 */
export const TEMPLATES_3AS_LE_T2: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (6 pts): Plurilinguisme, traduction automatique & lecture approfondie
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t2_comp_debat_langues_identite',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): التعدد اللغوي والهوية، الترجمة الآلية، والقراءة العميقة',
		curriculumLessonId: 'fre_lesson_3as_le_t2_convaincre_persuader_arguments',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Le plurilinguisme menace-t-il la langue maternelle ou l’enrichit-il ?',
					source: 'D’après une revue de linguistique et de pédagogie',
					paragraphs: [
						'Dans un monde de plus en plus interconnecté, l’apprentissage précoce des langues étrangères suscite des positions contrastées. Certains esprits inquiets redoutent que la multiplication des idiomes n’affaiblisse la maîtrise de la langue maternelle et ne dilue peu à peu les repères culturels des jeunes générations.',
						'Pourtant, les recherches en sciences du langage réfutent [[cette crainte]]. Comme le soulignait déjà Ibn Khaldoun en observant la diversité des savoirs, une langue maternelle solidement acquise sert de tremplin naturel vers d’autres langues. Apprendre une langue étrangère, c’est aiguiser son esprit comparatif ; apprendre une langue étrangère, c’est découvrir de nouvelles nuances ; apprendre une langue étrangère, c’est aussi mieux comprendre la richesse de sa propre culture !',
						'En somme, loin de s’exclure, la langue maternelle et les langues étrangères se complètent : [[celle-là]] ancre notre identité, tandis que celles-ci bâtissent des ponts vers le savoir universel.'
					],
					glossary: [
						{ term: 'idiome', meaning: 'langue propre à un peuple ou à une communauté' },
						{ term: 'tremplin', meaning: 'appui qui permet de progresser plus haut' }
					],
					tfItems: [
						{ q: 'Certains observateurs craignent que l’apprentissage de plusieurs langues n’affaiblisse la langue maternelle.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon les recherches linguistiques, la langue maternelle empêche d’apprendre d’autres langues.', a: 'Faux', c: 'Une langue maternelle solidement acquise sert au contraire de tremplin naturel vers d’autres langues.', mark: '0.5' },
						{ q: 'L’auteur cite Ibn Khaldoun pour appuyer sa thèse par un argument d’autorité.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans sa conclusion, l’auteur affirme que langue maternelle et langues étrangères sont complémentaires.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Identifiez la figure de style dominante à la fin du paragraphe 2 (« Apprendre une langue étrangère, c’est... ») et son effet.', a: 'Une anaphore : elle crée un rythme persuasif qui met en valeur les multiples bienfaits intellectuels et culturels du plurilinguisme.', mark: '0.75' },
						{ q: 'b) Expliquez la métaphore finale « bâtissent des ponts vers le savoir universel » (§3).', a: 'Elle compare les langues étrangères à des ponts permettant le dialogue, l’échange et l’accès aux connaissances mondiales.', mark: '0.75' }
					],
					refPrompt: 'a) « cette crainte » (§2)   b) « celle-là » (§3)',
					refAnswer: 'a) « cette crainte » renvoie à l’idée que le plurilinguisme affaiblirait la langue maternelle et les repères culturels.   b) « celle-là » renvoie au terme le plus éloigné : la langue maternelle.',
					synthPrompt: 'En tant qu’élève de la filière Langues Étrangères, comment l’étude du français et d’autres langues enrichit-elle votre regard sur votre propre culture ? Répondez en quatre lignes.',
					synthAnswer: 'Étudier plusieurs langues affine ma capacité à comparer les structures de pensée et les valeurs culturelles. En effet, chercher l’équivalent exact d’une expression arabe en français oblige à mieux connaître les nuances de sa langue maternelle. Ainsi, le plurilinguisme fortifie à la fois notre identité et notre ouverture scientifique.',
					easyQ: 'Quel grand penseur est cité comme argument d’autorité dans le paragraphe 2 ?',
					easyAns: 'Ibn Khaldoun',
					easyWrong: ['Ibn Battouta', 'Al-Jazari', 'Al-Zahrawi'],
					medQ: 'Dans le paragraphe 3 (« la langue maternelle et les langues étrangères... celle-là ancre notre identité »), à quoi renvoie « celle-là » ?',
					medAns: 'La langue maternelle (le terme le plus éloigné)',
					medWrong: ['Les langues étrangères', 'Le savoir universel', 'Les ponts'],
					hardQ: 'Quelles deux figures de style se combinent dans le texte pour convaincre et persuader ?',
					hardAns: 'L’anaphore (§2) et la métaphore des ponts et du tremplin (§2-§3)',
					hardWrong: [
						'L’onomatopée et le discours direct',
						'L’antiphrase moqueuse et le passé simple',
						'L’impératif négatif et la chronologie'
					]
				},
				{
					title: 'La traduction automatique remplacera-t-elle un jour le traducteur humain ?',
					source: 'D’après un colloque sur les métiers des langues',
					paragraphs: [
						'Grâce aux progrès de l’intelligence artificielle, les logiciels traduisent aujourd’hui des pages entières en une fraction de seconde. Certains enthousiastes en déduisent que le métier de traducteur humain serait bientôt voué à disparaître : pourquoi payer un spécialiste lorsqu’une application gratuite répond instantanément ?',
						'Quoique ces outils rendent d’incontestables services pour décrypter une notice technique, [[cette prédiction]] méconnaît la nature profonde du langage. Les programmes ont beau analyser des milliards de phrases, ils ignorent le sous-entendu, la sensibilité historique, l’ironie fine et le contexte culturel d’une civilisation. Si la traduction se réduisait au mot-à-mot mécanique, les chefs-d’œuvre de la pensée humaine perdraient toute leur âme !',
						'Dès lors, le traducteur humain ne disparaîtra pas : il évoluera en relecteur exigeant et en médiateur culturel capable de restituer [[ce que]] la machine ne saurait ressentir.'
					],
					glossary: [
						{ term: 'voué à', meaning: 'destiné inévitablement à' },
						{ term: 'médiateur culturel', meaning: 'personne qui facilite la compréhension fidèle entre deux cultures' }
					],
					tfItems: [
						{ q: 'Les logiciels actuels peuvent traduire rapidement une notice technique simple.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur pense que les applications gratuites comprennent parfaitement l’ironie et le contexte culturel.', a: 'Faux', c: 'Ils ignorent le sous-entendu, la sensibilité historique, l’ironie fine et le contexte culturel.', mark: '0.5' },
						{ q: 'Au paragraphe 2, l’auteur utilise un raisonnement par l’absurde pour défendre le traducteur humain.', a: 'Vrai', mark: '0.5' },
						{ q: 'En conclusion, le traducteur humain devient un médiateur culturel irremplaçable.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez deux tournures concessives dans le paragraphe 2 et précisez le mode verbal de chacune.', a: '« Quoique ces outils rendent... » (subjonctif présent) et « Les programmes ont beau analyser... » (avoir beau + infinitif).', mark: '0.75' },
						{ q: 'b) Quelle est la valeur de la question au paragraphe 1 (« pourquoi payer un spécialiste... ? ») ?', a: 'Elle rapporte une question rhétorique des partisans du tout-automatique au discours indirect libre avant que l’auteur ne la réfute au §2.', mark: '0.75' }
					],
					refPrompt: 'a) « cette prédiction » (§2)   b) « ce que » (§3)',
					refAnswer: 'a) « cette prédiction » renvoie à l’idée que le métier de traducteur humain serait voué à disparaître.   b) « ce que » renvoie aux nuances culturelles, historiques et humaines du langage.',
					synthPrompt: 'Pensez-vous que la traduction d’un texte historique ou culturel exige une vraie sensibilité humaine ? Justifiez en quatre lignes.',
					synthAnswer: 'Oui, je souscris pleinement à cette idée car traduire un texte culturel dépasse largement le remplacement mécanique des mots. En effet, chaque proverbe, métaphore ou référence historique porte un héritage propre que seul un traducteur cultivé peut transposer fidèlement sans trahir le sens originel.',
					easyQ: 'Dans quel domaine l’auteur concède-t-il l’utilité des logiciels de traduction (§2) ?',
					easyAns: 'Pour décrypter rapidement une notice technique',
					easyWrong: ['Pour traduire l’ironie fine', 'Pour saisir les sous-entendus culturels', 'Pour remplacer les médiateurs humains'],
					medQ: 'Quel mode verbal est employé dans « Les programmes ont beau analyser des milliards de phrases » ?',
					medAns: 'L’infinitif (après la locution concessive « avoir beau »)',
					medWrong: ['Le subjonctif passé', 'Le passé simple', 'L’impératif présent'],
					hardQ: 'Quelle stratégie argumentative apparaît dans « Si la traduction se réduisait au mot-à-mot, les chefs-d’œuvre perdraient leur âme ! » ?',
					hardAns: 'Un raisonnement par l’absurde appuyé sur le système hypothétique (Si + imparfait -> conditionnel)',
					hardWrong: [
						'Un simple argument statistique',
						'Un ordre adressé aux éditeurs',
						'Une biographie chronologique'
					]
				},
				{
					title: 'Lecture lente ou flux rapide d’informations : comment se construit l’esprit critique ?',
					source: 'D’après une réflexion sur la culture numérique',
					paragraphs: [
						'Chaque jour, des milliers de messages brefs et de titres sensationnels défilent sur nos écrans. Les défenseurs de cette consommation rapide affirment qu’elle permettrait de rester informé en temps réel sur toute la planète sans consacrer des heures à un seul livre.',
						'Or, accumuler des fragments épars ne signifie pas comprendre. Tandis que le flux instantané encourage l’émotion immédiate et parfois la rumeur, la lecture approfondie d’un ouvrage structuré impose le recul, la vérification des faits et le dialogue patient avec la pensée d’autrui. Peut-on véritablement exercer un esprit critique libre si l’on ne prend jamais le temps de vérifier ce qu’on lit ?',
						'Ainsi, apprendre à ralentir devant un texte exigeant représente aujourd’hui un acte de maturité : la vitesse informe à la surface, mais seule la profondeur forme véritablement l’intelligence.'
					],
					glossary: [
						{ term: 'fragments épars', meaning: 'morceaux d’informations dispersés sans lien logique' },
						{ term: 'recul', meaning: 'distance intellectuelle nécessaire pour juger objectivement' }
					],
					tfItems: [
						{ q: 'Les partisans du flux rapide mettent en avant l’accès instantané à l’actualité mondiale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, accumuler des messages brefs garantit automatiquement une compréhension profonde.', a: 'Faux', c: 'Accumuler des fragments épars ne signifie pas comprendre.', mark: '0.5' },
						{ q: 'La lecture approfondie favorise le recul intellectuel et la vérification des faits.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans sa conclusion, l’auteur oppose la vitesse superficielle à la profondeur formatrice.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Identifiez la figure de style dans la phrase finale (« la vitesse informe à la surface, mais seule la profondeur forme l’intelligence ») et son effet.', a: 'Antithèse et parallélisme (vitesse/profondeur, surface/intelligence, informe/forme) : formule frappante qui résume toute la thèse.', mark: '0.75' },
						{ q: 'b) Quel est le rôle argumentatif de la question au paragraphe 2 (« Peut-on véritablement exercer... ? ») ?', a: 'Une question rhétorique qui conduit le lecteur à admettre que l’esprit critique exige du temps et de la vérification.', mark: '0.75' }
					],
					refPrompt: 'a) « cette consommation rapide » (§1)   b) « un texte exigeant » (§3)',
					refAnswer: 'a) « cette consommation rapide » renvoie au défilement quotidien de messages brefs et titres sur les écrans.   b) « un texte exigeant » renvoie à un ouvrage structuré demandant une lecture approfondie.',
					synthPrompt: 'Selon vous, comment un étudiant peut-il concilier l’actualité numérique rapide et la lecture approfondie de livres ? Répondez en quatre lignes.',
					synthAnswer: 'À mon sens, il convient de réserver chaque journée un temps calme, loin des notifications, pour lire des ouvrages complets et prendre des notes. Parallèlement, l’actualité numérique reste utile si l’on sélectionne quelques sources fiables et si l’on vérifie toute information avant de la partager.',
					easyQ: 'Quel risque du flux instantané est signalé au paragraphe 2 ?',
					easyAns: 'Il encourage l’émotion immédiate et parfois la rumeur',
					easyWrong: ['Il impose trop de recul intellectuel', 'Il oblige à lire des livres entiers', 'Il supprime toute rapidité'],
					medQ: 'Quel rapport logique relie les deux volets de « Tandis que le flux encourage..., la lecture impose le recul » ?',
					medAns: 'Un rapport d’opposition (suivi de l’indicatif)',
					medWrong: ['Un rapport de cause', 'Un rapport de but au subjonctif', 'Un rapport de conséquence'],
					hardQ: 'Quelle est la thèse centrale défendue par l’auteur tout au long de ce débat ?',
					hardAns: 'La lecture lente et approfondie est indispensable pour forger un véritable esprit critique au-delà de l’information rapide',
					hardWrong: [
						'Les titres courts suffisent à former l’intelligence',
						'Il faut supprimer tous les journaux scientifiques',
						'La vitesse est toujours supérieure à la réflexion'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى النص للتثبت من الحجة أو المرجع الصريح.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Débat BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد الإحالة (celle-là / celle-ci) والروابط والصيغ الفعلية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النحوي أو المرجعي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل البنية البلاغية ونوع الحجاج الذي اعتمده الكاتب.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Rhétorique BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الاستراتيجية البلاغية أو الأطروحة المركزية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement ce texte argumentatif puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. Ce texte vise principalement à :',
								options: [
									'Convaincre et persuader le lecteur au cœur d’un débat d’idées',
									'Raconter une bataille historique de 1954',
									'Rédiger un règlement administratif'
								],
								correct: 'Convaincre et persuader le lecteur au cœur d’un débat d’idées',
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
						content: `3. Répondez de manière précise aux questions suivantes :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4. Indiquez le référent exact de chaque expression soulignée :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Question de réflexion : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'سمِّ الصورة البلاغية (anaphore, métaphore, antithèse, question rhétorique) واشرح أثرها الإقناعي.',
					'تذكر أن « celle-là » تحيل على الاسم الأبعد و« celle-ci » على الأقرب.',
					'في سؤال التفكير، اربط بين تجربتك كطالب لغات أجنبية والبعد الثقافي والمنهجي.'
				],
				solutionStepsAr: [
					'تحديد الغاية الإقناعية للنص (0.5 نقطة).',
					'إجابات الصواب والخطأ مع التصحيح (2 نقطتان).',
					'تحليل الصور البلاغية والاستدراك (1.5 نقطة).',
					'فك الإحالات المركبة وتحرير فقرة التفكير (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (6 pts): Science, éthique & autonomie intellectuelle
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t2_comp_debat_science_ethique',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): أخلاقيات العلم واستقلالية الفكر في العصر الرقمي',
		curriculumLessonId: 'fre_lesson_3as_le_t2_cohesion_substituts_portee',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'La science sans conscience morale peut-elle vraiment servir l’humanité ?',
					source: 'D’après une revue d’éthique scientifique',
					paragraphs: [
						'Jamais l’humanité n’a disposé d’outils scientifiques aussi puissants qu’au XXIe siècle. Certains chercheurs estiment que la science devrait rester totalement libre de toute limite morale afin d’accélérer les découvertes, au motif que le savoir pur serait neutre par nature.',
						'Quand bien même la recherche technique progresserait à pas de géant, [[cette position]] comporte un péril évident. Dans l’histoire de la civilisation islamique, des savants majeurs comme Al-Zahrawi en chirurgie et Ibn Al-Haytham en optique associaient constamment la rigueur expérimentale à l’humilité et à la responsabilité envers le patient et la vérité. Privée de repères éthiques, l’innovation risque de nuire à la dignité humaine et à l’équilibre de la nature.',
						'En définitive, loin de brider le génie scientifique, l’éthique [[le]] protège contre ses propres excès et rappelle que toute découverte n’a de grandeur que si elle soulage la souffrance et sert le bien commun.'
					],
					glossary: [
						{ term: 'brider', meaning: 'freiner, limiter excessivement' },
						{ term: 'péril', meaning: 'danger grave et menaçant' }
					],
					tfItems: [
						{ q: 'Certains estiment que la recherche scientifique devrait s’affranchir de toute limite morale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Al-Zahrawi et Ibn Al-Haytham séparaient la rigueur scientifique de la responsabilité éthique.', a: 'Faux', c: 'Ils associaient constamment rigueur expérimentale, humilité et responsabilité morale.', mark: '0.5' },
						{ q: 'L’auteur considère que l’éthique paralyse et détruit le génie scientifique.', a: 'Faux', c: 'Loin de brider le génie scientifique, l’éthique le protège contre ses propres excès.', mark: '0.5' },
						{ q: 'Selon le paragraphe 3, la vraie grandeur d’une découverte se mesure au service du bien commun.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel type d’argument l’auteur mobilise-t-il en citant Al-Zahrawi et Ibn Al-Haytham (§2) ?', a: 'Un argument d’autorité et d’exemple historique qui prouve que la haute science et la morale sont compatibles et fécondes ensemble.', mark: '0.75' },
						{ q: 'b) Identifiez la locution concessive ouvrant le paragraphe 2 et justifiez le mode verbal qui la suit.', a: '« Quand bien même » suivie du conditionnel présent (« progresserait ») pour formuler une concession hypothétique forte.', mark: '0.75' }
					],
					refPrompt: 'a) « cette position » (§2)   b) « le » (§3)',
					refAnswer: 'a) « cette position » renvoie à l’opinion selon laquelle la science devrait rester libre de toute limite morale.   b) « le » renvoie au génie scientifique.',
					synthPrompt: 'Selon vous, quelles règles morales doivent impérativement guider les nouvelles technologies médicales et numériques ? Justifiez en quatre lignes.',
					synthAnswer: 'À mon avis, toute technologie médicale ou numérique doit d’abord respecter la dignité humaine, la véracité scientifique et la protection des données personnelles. En effet, sans contrôle éthique transparent, des outils utiles peuvent facilement être détournés. Ainsi, la responsabilité morale garantit la confiance de la société envers la science.',
					easyQ: 'Quels deux savants musulmans servent de modèle d’éthique scientifique au paragraphe 2 ?',
					easyAns: 'Al-Zahrawi et Ibn Al-Haytham',
					easyWrong: ['Ibn Battouta et Al-Idrisi', 'Cheikh Tebessi et Larbi Ben M’hidi', 'Moufdi Zakaria et Ahmed Zabana'],
					medQ: 'Pourquoi « progresserait » est-il au conditionnel présent au paragraphe 2 ?',
					medAns: 'Parce qu’il suit la locution concessive « Quand bien même »',
					medWrong: ['Parce qu’il suit « Bien que »', 'Parce qu’il suit « Même si »', 'Parce qu’il marque un ordre'],
					hardQ: 'Quelle est la portée argumentative du substitut lexical « cette position » associé à « un péril évident » (§2) ?',
					hardAns: 'Il résume la thèse adverse et la discrédite aussitôt en soulignant son danger moral',
					hardWrong: [
						'Il approuve totalement la neutralité sans limite',
						'Il désigne l’œuvre d’Al-Zahrawi',
						'Il introduit un fait du XIVe siècle'
					]
				},
				{
					title: 'Autonomie de la pensée ou dépendance aux algorithmes chez les étudiants ?',
					source: 'D’après une tribune universitaire sur la méthodologie de travail',
					paragraphs: [
						'Les moteurs de recommandation et les générateurs automatiques de textes transforment aujourd’hui les habitudes d’étude. Leurs adeptes assurent qu’[[ils]] feraient gagner un temps précieux en proposant instantanément des plans tout faits, des synthèses rapides et des réponses calibrées.',
						'Pourtant, un étudiant qui confie systématiquement ses choix intellectuels à un algorithme s’expose à un appauvrissement silencieux : il hésite moins, il cherche moins, il doute moins... et il finit par penser moins ! Quoi qu’en disent les promoteurs de la facilité immédiate, l’effort personnel, la recherche en bibliothèque et la confrontation honnête des idées demeurent irremplaçables.',
						'En somme, l’algorithme doit rester un auxiliaire discret au service d’un esprit autonome, [[ce qui]] suppose une éducation solide au discernement dès le lycée.'
					],
					glossary: [
						{ term: 'calibré', meaning: 'standardisé, formaté selon un modèle uniforme' },
						{ term: 'discernement', meaning: 'capacité de juger clairement et justement par soi-même' }
					],
					tfItems: [
						{ q: 'Les adeptes des générateurs automatiques mettent en avant le gain de temps.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur estime que la dépendance aux algorithmes stimule le doute fécond et la recherche personnelle.', a: 'Faux', c: 'Elle entraîne un appauvrissement silencieux : on cherche moins, on doute moins et on pense moins.', mark: '0.5' },
						{ q: 'Pour l’auteur, l’effort personnel et la confrontation des idées restent irremplaçables.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans sa conclusion, l’auteur demande une éducation au discernement dès le lycée.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Identifiez la figure de style dans « il hésite moins, il cherche moins, il doute moins... et il finit par penser moins ! » (§2) et son effet.', a: 'Anaphore (« il ... moins ») et gradation ascendante : dramatisent la perte progressive d’autonomie intellectuelle.', mark: '0.75' },
						{ q: 'b) Précisez le sens et la syntaxe de « Quoi qu’en disent... » au paragraphe 2.', a: '« Quoi que » (en deux mots = quelle que soit la chose que) exprime une concession généralisante suivie du subjonctif présent (« disent »).', mark: '0.75' }
					],
					refPrompt: 'a) « ils » (§1)   b) « ce qui » (§3)',
					refAnswer: 'a) « ils » renvoie aux moteurs de recommandation et aux générateurs automatiques de textes.   b) « ce qui » renvoie à toute la proposition précédente (le fait de maintenir l’algorithme comme auxiliaire discret au service d’un esprit autonome).',
					synthPrompt: 'Comment un candidat au baccalauréat peut-il préserver son autonomie intellectuelle tout en tirant parti des outils numériques ? Répondez en quatre lignes.',
					synthAnswer: 'Un candidat soucieux de son autonomie rédige d’abord son propre plan et ses propres paragraphes sans assistance automatique. Ensuite seulement, il peut consulter un dictionnaire en ligne ou un corrigé de référence pour repérer ses lacunes. Ainsi, la technique renforce sa progression au lieu d’affaiblir sa réflexion.',
					easyQ: 'Quel avantage les adeptes des algorithmes mettent-ils en avant au paragraphe 1 ?',
					easyAns: 'Un gain de temps précieux grâce aux plans et synthèses instantanés',
					easyWrong: ['Le développement de la lecture en bibliothèque', 'L’augmentation de la patience', 'La disparition des examens'],
					medQ: 'À quoi renvoie « ce qui » dans le dernier paragraphe ?',
					medAns: 'À toute la proposition précédente (garder l’algorithme au service d’un esprit autonome)',
					medWrong: ['Uniquement au mot « lycée »', 'Uniquement au mot « discret »', 'Aux moteurs de recommandation seuls'],
					hardQ: 'Quelle est la double figure rhétorique dans « il hésite moins, il cherche moins, il doute moins... et il finit par penser moins ! » ?',
					hardAns: 'Une anaphore combinée à une gradation mettant en relief l’appauvrissement intellectuel',
					hardWrong: [
						'Une simple comparaison avec comme',
						'Un oxymore poétique',
						'Un discours direct entre guillemets'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع المعلومة الواضحة في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Débat BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد الإحالة المركبة (ce qui) والشرطي بعد quand bien même.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التفسير النحوي أو المرجعي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفسير الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل الصور البلاغية أو المدى الحجاجي للبديل المعجمي.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج البعد البلاغي أو الحجاجي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement ce texte de débat puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. Ce texte défend une thèse :',
								options: [
									'En confrontant les points de vue par la concession, des exemples et des procédés rhétoriques',
									'En récitant une chronologie du XIXe siècle',
									'En donnant des instructions de laboratoire'
								],
								correct: 'En confrontant les points de vue par la concession, des exemples et des procédés rhétoriques',
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
						content: `3. Répondez de manière analytique aux questions suivantes :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4. Précisez le référent exact des termes soulignés :\n${chosen.refPrompt}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: `5. Question de réflexion : ${chosen.synthPrompt}`,
						answer: chosen.synthAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'ميّز بين « quoique » (استدراك) و« quoi que » (أياً كان ما...) وتثبت من الصيغ الفعلية.',
					'عند فك إحالة « ce qui » أو « cette position »، لخّص الفكرة السابقة كاملة.',
					'اكتب إجابة التفكير النقدي في 4 أسطر متماسكة ومنظمة.'
				],
				solutionStepsAr: [
					'تحديد الاستراتيجية الحجاجية للنص (0.5 نقطة).',
					'إجابات الصواب والخطأ مع التبرير (2 نقطتان).',
					'تحليل الحجج والصيغ البلاغية (1.5 نقطة).',
					'الإحالة النصية والتفكير الشخصي المعلل (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Concession (modes avancés), rhétorique & typologie d’arguments
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t2_exp_concession_rhetorique',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (6 نقاط — لغات أجنبية): الاستدراك بالصيغ الأربع، أنواع الحجج والصور البلاغية',
		curriculumLessonId: 'fre_lesson_3as_le_t2_concession_refutation_modes',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez ces locutions concessives selon le mode verbal exigé : bien que - même si - quand bien même - quoique - tandis que - au cas où.',
					classCols: [
						{ header: 'Subjonctif', items: ['bien que', 'quoique'], mark: '0.5' },
						{ header: 'Indicatif', items: ['même si', 'tandis que'], mark: '0.5' },
						{ header: 'Conditionnel', items: ['quand bien même', 'au cas où'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Réécrivez avec « avoir beau » : Bien que les logiciels analysent des milliards de phrases, ils ignorent le sous-entendu culturel.',
							a: 'a) Les logiciels ont beau analyser des milliards de phrases, ils ignorent le sous-entendu culturel.'
						},
						{
							q: 'b) Complétez au mode exact : Quand bien même cette application (traduire) vingt langues, elle ne remplacerait pas le médiateur humain.',
							a: 'b) Quand bien même cette application traduirait vingt langues, elle ne remplacerait pas le médiateur humain.'
						}
					],
					figPrompt: '3. Nommez la figure de style employée dans chaque phrase :\na) « Les langues étrangères sont des ponts vers le savoir universel. »\nb) « Peut-on exercer un esprit critique si l’on ne vérifie jamais ses sources ? »',
					figAnswer: 'a) Métaphore.   b) Question rhétorique (oratoire).',
					argPrompt: '4. Indiquez le type d’argument utilisé (autorité / par l’absurde) :\na) « Comme l’a démontré Ibn Khaldoun, la langue structure la clarté de la pensée. »\nb) « Si la machine pensait à notre place, l’école n’aurait plus qu’à fermer ses portes ! »',
					argAnswer: 'a) Argument d’autorité.   b) Raisonnement par l’absurde.',
					easyQ: 'Quel mode verbal exige la locution « quand bien même » ?',
					easyAns: 'Le conditionnel',
					easyWrong: ['Le subjonctif présent', 'Le passé simple', 'L’impératif'],
					medQ: 'Réécrivez correctement avec « avoir beau » : « Bien que ces outils progressent vite, ils commettent des contresens. »',
					medAns: 'Ces outils ont beau progresser vite, ils commettent des contresens.',
					medWrong: [
						'Ces outils ont beau progressé vite, ils commettent des contresens.',
						'Ces outils sont beau progresser vite, ils commettent des contresens.',
						'Ces outils ont beau que progresser vite, ils commettent des contresens.'
					],
					hardQ: 'Quel type d’argument identifiez-vous dans : « Si la machine pensait à notre place, l’école n’aurait plus qu’à fermer ses portes » ?',
					hardAns: 'Un raisonnement par l’absurde',
					hardWrong: ['Un argument d’autorité', 'Un constat historique neutre', 'Une simple définition']
				},
				{
					classPrompt: '1. Classez ces procédés rhétoriques selon leur stratégie dominante (Convaincre la raison / Persuader la sensibilité) : statistiques vérifiées - métaphore vibrante - raisonnement causal - anaphore émouvante - preuve expérimentale - question oratoire.',
					classCols: [
						{ header: 'Convaincre (Raison)', items: ['statistiques vérifiées', 'raisonnement causal', 'preuve expérimentale'], mark: '0.75' },
						{ header: 'Persuader (Sensibilité)', items: ['métaphore vibrante', 'anaphore émouvante', 'question oratoire'], mark: '0.75' }
					],
					rewrites: [
						{
							q: 'a) Réécrivez avec « Si + adjectif + que » (subjonctif) : Même si cet outil est ingénieux, il exige une vigilance morale.',
							a: 'a) Si ingénieux que soit cet outil, il exige une vigilance morale.'
						},
						{
							q: 'b) Choisissez « quoique » ou « quoi que » et conjuguez : « .......... (dire) les partisans de la facilité, l’effort reste fécond. »',
							a: 'b) Quoi que disent les partisans de la facilité, l’effort reste fécond.'
						}
					],
					figPrompt: '3. Identifiez la figure de style dans chaque énoncé :\na) « Lire pour comprendre. Lire pour douter. Lire pour bâtir sa liberté. »\nb) « La vitesse informe à la surface, mais la profondeur forme l’intelligence. »',
					figAnswer: 'a) Anaphore (« Lire pour... ») et gradation.   b) Antithèse et parallélisme.',
					argPrompt: '4. Distinguez en une phrase la nuance entre « convaincre » et « persuader » dans un débat d’idées.',
					argAnswer: 'Convaincre fait appel à la raison par des preuves logiques, tandis que persuader touche la sensibilité et les valeurs par le style.',
					easyQ: 'Quelle figure reconnaît-on dans « Lire pour comprendre. Lire pour douter. Lire pour agir. » ?',
					easyAns: 'Une anaphore',
					easyWrong: ['Une antiphrase', 'Un oxymore', 'Une onomatopée'],
					medQ: 'Complétez sans erreur : « Si ingénieux que .......... cet outil, il exige une vigilance morale. »',
					medAns: 'soit',
					medWrong: ['est', 'sera', 'était'],
					hardQ: 'Choisissez l’orthographe exacte : « .......... disent les partisans de la facilité, l’effort personnel reste irremplaçable. »',
					hardAns: 'Quoi que (en deux mots, suivi du subjonctif)',
					hardWrong: ['Quoique (en un seul mot)', 'Malgré que', 'Tandis que']
				},
				{
					classPrompt: '1. Associez ces extraits à la figure correspondante (Antithèse / Gradation / Métaphore) : un océan de savoir - construire ou détruire - hésiter, douter, renoncer - l’ombre et la clarté.',
					classCols: [
						{ header: 'Antithèse', items: ['construire ou détruire', 'l’ombre et la clarté'], mark: '0.5' },
						{ header: 'Gradation', items: ['hésiter, douter, renoncer'], mark: '0.5' },
						{ header: 'Métaphore', items: ['un océan de savoir'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Remplacez « Certes... mais » par « Bien que » : Certes, les écrans ont des atouts, mais ils dispersent l’attention.',
							a: 'a) Bien que les écrans aient des atouts, ils dispersent l’attention.'
						},
						{
							q: 'b) Transformez avec « loin de + infinitif » : L’éthique ne freine pas le progrès ; elle le protège.',
							a: 'b) Loin de freiner le progrès, l’éthique le protège.'
						}
					],
					figPrompt: '3. Précisez l’effet argumentatif de la métaphore « Les livres sont les phares de l’esprit ».',
					figAnswer: 'Elle assimile les livres à des phares pour montrer qu’ils guident l’intelligence et évitent l’égarement intellectuel.',
					argPrompt: '4. Expliquez en une phrase pourquoi un auteur recourt à la concession avant de réfuter la thèse adverse.',
					argAnswer: 'Reconnaître une part de vérité à l’adversaire montre l’objectivité de l’auteur et rend sa réfutation plus crédible.',
					easyQ: 'Quel procédé identifiez-vous dans « hésiter, douter, renoncer » ?',
					easyAns: 'Une gradation ascendante',
					easyWrong: ['Une antithèse', 'Une question rhétorique', 'Une comparaison'],
					medQ: 'Complétez correctement : « Bien que les écrans .......... des atouts, ils dispersent l’attention. » (avoir)',
					medAns: 'aient',
					medWrong: ['ont', 'auront', 'avaient'],
					hardQ: 'Choisissez la transformation élégante avec « Loin de » : « L’éthique ne freine pas le progrès ; elle le protège. »',
					hardAns: 'Loin de freiner le progrès, l’éthique le protège.',
					hardWrong: [
						'Loin de freine le progrès, l’éthique le protège.',
						'Loin que freiner le progrès, l’éthique le protège.',
						'Loin de ne pas freiner le progrès, l’éthique le protège.'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع الصيغ الفعلية للاستدراك والصور البلاغية في المشروع الثاني.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لتركيب avoir beau + infinitif وللمنصوب بعد bien que و si... que.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل أو التصريف السليم:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب السليم هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'دقّق في الفرق بين quoique / quoi que، و Loin de + infinitif، والبرهان بالخلف.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد التحليل المتقدم أو الصياغة الراقية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue et rhétorique',
				points: 6,
				instruction: 'Traitez les activités de syntaxe et de rhétorique suivantes (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: `2. Effectuez les transformations concessives demandées :\n${chosen.rewrites.map((r) => r.q).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.figPrompt,
						answer: chosen.figAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.argPrompt,
						answer: chosen.argAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'احفظ خريطة الصيغ الأربع: bien que (+ subj.) | même si (+ ind.) | quand bien même (+ cond.) | avoir beau (+ inf.).',
					'فرّق بين quoique (كلمة واحدة = bien que) و quoi que (كلمتان = مهما يكن ما...).',
					'في تحليل الصورة البلاغية، اجمع دائماً بين تسميتها وشرح أثرها الإقناعي.'
				],
				solutionStepsAr: [
					'تصنيف الأدوات أو الاستراتيجيات في الجدول (1.5 نقطة).',
					'التحويلات الاستدراكية المتقدمة (2 نقطتان).',
					'تحليل الصور البلاغية (1.5 نقطة).',
					'تصنيف الحجج أو تفسير الإستراتيجية الحجاجية (1 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Cohésion textuelle, pronoms composés & lexique abstrait
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t2_exp_cohesion_lexique',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'vocabulaire_lexique',
		titleAr: 'البناء اللغوي (6 نقاط — لغات أجنبية): الاتساق النصي، الضمائر المركبة، وعائلة المفردات المجردة',
		curriculumLessonId: 'fre_lesson_3as_le_t2_cohesion_substituts_portee',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					wordRows: [
						{ verbe: { given: true, value: 'discerner' }, nom: { value: 'discernement', mark: '0.25' }, adjectif: { value: 'discernable', mark: '0.25' } },
						{ verbe: { value: 'traduire', mark: '0.25' }, nom: { given: true, value: 'traduction' }, adjectif: { value: 'traduisible / traduit', mark: '0.25' } },
						{ verbe: { value: 'nuancer', mark: '0.25' }, nom: { value: 'nuance', mark: '0.25' }, adjectif: { given: true, value: 'nuancé' } }
					],
					relPrompts: [
						{
							q: 'a) Complétez par le pronom relatif convenable (dont / auquel) : L’éthique numérique est un défi .......... les lycéens doivent réfléchir.',
							a: 'a) auquel (réfléchir à un défi donne auquel).'
						},
						{
							q: 'b) Complétez par « celui-ci » ou « celui-là » : Le livre imprimé et l’écran coexistent ; .......... facilite le tri rapide, tandis que .......... favorise le calme.',
							a: 'b) celui-ci (= l’écran, le plus proche) ... celui-là (= le livre imprimé, le plus éloigné).'
						}
					],
					logicPrompt: '3. Remplacez le lien souligné sans changer le sens :\na) Les jeunes lisent beaucoup, si bien que leur expression gagne en précision. (Employez : c’est pourquoi)\nb) Il vérifie les sources afin que son article demeure irréprochable. (Employez : dans le but de — même sujet « il »)',
					logicAnswer: 'a) Les jeunes lisent beaucoup ; c’est pourquoi leur expression gagne en précision.\nb) Il vérifie les sources dans le but de rédiger un article irréprochable (ou : dans le but de rendre son article irréprochable).',
					clozePrompt: '4. Complétez ce paragraphe de cohésion avec : anaphore - cohésion - répétitions - connecteurs.\nPour assurer la (1) .......... d’une dissertation, l’élève évite les (2) .......... lourdes grâce aux pronoms et à l’(3) .......... lexicale, tout en articulant ses idées par des (4) .......... précis.',
					clozeAnswer: '1) cohésion   2) répétitions   3) anaphore   4) connecteurs',
					easyQ: 'Quel nom correspond au verbe « discerner » ?',
					easyAns: 'le discernement',
					easyWrong: ['la discernation', 'le discernage', 'la discernance'],
					medQ: 'Complétez avec le bon pronom relatif composé : « L’éthique est un défi .......... nous devons réfléchir. »',
					medAns: 'auquel',
					medWrong: ['dont', 'duquel', 'que'],
					hardQ: 'Dans « Le livre imprimé et l’écran coexistent ; celui-ci accélère la recherche, celui-là approfondit la pensée », à quoi renvoie « celui-là » ?',
					hardAns: 'Le livre imprimé (le terme le plus éloigné)',
					hardWrong: ['L’écran', 'La recherche', 'La pensée']
				},
				{
					wordRows: [
						{ verbe: { given: true, value: 'approfondir' }, nom: { value: 'approfondissement', mark: '0.25' }, adjectif: { value: 'approfondi', mark: '0.25' } },
						{ verbe: { value: 'dialoguer', mark: '0.25' }, nom: { given: true, value: 'dialogue' }, adjectif: { value: 'dialogique', mark: '0.25' } },
						{ verbe: { value: 'autonomiser', mark: '0.25' }, nom: { value: 'autonomie', mark: '0.25' }, adjectif: { given: true, value: 'autonome' } }
					],
					relPrompts: [
						{
							q: 'a) Complétez par « dont » ou « à laquelle » : La lecture lente est une discipline .......... la jeunesse contemporaine a grand besoin.',
							a: 'a) dont (avoir besoin de donne dont).'
						},
						{
							q: 'b) Reliez par « ce qui » : Les étudiants comparent deux langues. Cela affine leur esprit d’analyse.',
							a: 'b) Les étudiants comparent deux langues, ce qui affine leur esprit d’analyse.'
						}
					],
					logicPrompt: '3. Précisez le rapport logique exprimé et le mode verbal employé :\na) Il travaille avec constance de crainte que son niveau ne baisse.\nb) Comme la traduction culturelle est exigeante, elle requiert une vaste culture générale.',
					logicAnswer: 'a) But négatif (de crainte que + subjonctif « baisse »).   b) Cause placée en tête de phrase (Comme + indicatif « est »).',
					clozePrompt: '4. Complétez avec les termes convenables : nuance - dialectique - problématique - synthèse.\nUne dissertation (1) .......... s’ouvre sur une (2) .......... claire, examine les thèses avec (3) .......... et s’achève par une (4) .......... équilibrée.',
					clozeAnswer: '1) dialectique   2) problématique   3) nuance   4) synthèse',
					easyQ: 'Quel nom dérive du verbe « approfondir » ?',
					easyAns: 'l’approfondissement',
					easyWrong: ['l’approfondation', 'l’approfondure', 'l’approfondage'],
					medQ: 'Complétez : « La lecture lente est une discipline .......... les étudiants ont grand besoin. »',
					medAns: 'dont',
					medWrong: ['à laquelle', 'auquel', 'où'],
					hardQ: 'Quel rapport logique et quel mode verbal figurent dans « de crainte que son niveau ne baisse » ?',
					hardAns: 'Un rapport de but à éviter (crainte) suivi du subjonctif présent (avec « ne » explétif)',
					hardWrong: [
						'Un rapport de cause à l’indicatif',
						'Un rapport de conséquence au futur',
						'Une concession au conditionnel'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع اشتقاق الأسماء المجردة في المشروع الثاني.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الاسم المشتق الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاسم المشتق الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تثبت من حرف الجر الذي يطلبه الفعل: à -> auquel / à laquelle، و de -> dont.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر ضمير الوصل المناسب بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الضمير الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر قاعدة القرب لـ celui-ci / celui-là، وقاعدة de crainte que + subjonctif.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد التحليل النحوي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Cohésion et fonctionnement de la langue',
				points: 6,
				instruction: 'Réalisez soigneusement ces exercices de cohésion et de lexique (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: '1. Complétez le tableau de famille de mots suivant :'
					},
					buildFrenchWordFamilyTableBlock(chosen.wordRows),
					{
						type: 'text',
						content: `2. Maîtrisez les substituts grammaticaux complexes :\n${chosen.relPrompts.map((r) => r.q).join('\n')}`,
						answer: chosen.relPrompts.map((r) => r.a).join('\n'),
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.logicPrompt,
						answer: chosen.logicAnswer,
						mark: '1.5'
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
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'vocabulaire_lexique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه لحرف الجر الذي يرافق الفعل قبل اختيار الضمير (réfléchir à -> auquel | avoir besoin de -> dont).',
					'بعد de peur que و de crainte que نستعمل Subjonctif مع ne explétif.',
					'« Comme » للسبب تأتي دائماً في بداية الجملة مع Indicatif.'
				],
				solutionStepsAr: [
					'إكمال جدول عائلة الكلمات المجردة (1.5 نقطة).',
					'توظيف الضمائر الموصولة والإشارية المركبة (1.5 نقطة).',
					'تحليل وتحويل الروابط المنطقية (1.5 نقطة).',
					'إكمال الفقرة المنهجية للاتساق النصي (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (8 pts — Integration): Dissertation dialectique / CRC de débat LE
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t2_we_dissertation_le',
		grade: '3as_le',
		trimesterId: 't2',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (8 نقاط — لغات أجنبية): مقال جدلي رفيع أو تقرير نقدي لنص نقاش أفكار',
		curriculumLessonId: 'fre_lesson_3as_le_t2_dissertation_bac_le',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) du texte de débat « Le plurilinguisme menace-t-il la langue maternelle ou l’enrichit-il ? ».',
					sujetUnNotes: [
						'Accroche experte : genre argumentatif, titre, problématique linguistique et visée persuasive.',
						'Résumé analytique au présent : reformuler la crainte initiale, la réfutation appuyée par Ibn Khaldoun et la conclusion complémentaire.',
						'Critique approfondie : apprécier l’équilibre de la démonstration, la force de l’anaphore et de la métaphore des ponts, avec une ouverture constructive.'
					],
					sujetDeuxPrompt:
						'À l’ère des traducteurs automatiques instantanés, l’apprentissage exigeant des langues étrangères conserve-t-il tout son sens ? Rédigez une dissertation dialectique engagée (180 à 220 mots) en mobilisant des arguments variés et des exemples précis.',
					modelAnswer:
						'À l’heure où les applications de traduction instantanée décryptent une page en quelques secondes, certains s’interrogent sur l’utilité de consacrer des années à l’apprentissage des langues étrangères. Dès lors, la machine peut-elle réellement nous dispenser de maîtriser nous-mêmes d’autres idiomes ?\nCertes, les logiciels de traduction rendent d’incontestables services dans la vie quotidienne ou pour comprendre rapidement une notice technique. En voyage comme dans la documentation professionnelle, leur rapidité constitue un gain de temps précieux que nul ne saurait nier.\nToutefois, réduire une langue à un simple code mécanique relève d’une profonde illusion. Les programmes ont beau traiter des milliards de données, ils restent incapables de ressentir l’ironie subtile, les nuances historiques ou les valeurs morales portées par une culture. De plus, apprendre personnellement une langue étrangère aiguise la mémoire, développe la souplesse intellectuelle et permet un dialogue authentique entre peuples, sans l’écran froid d’un algorithme.\nEn définitive, loin de rendre caduc l’effort linguistique, la technologie en révèle toute la noblesse : la machine dépanne le lecteur pressé, mais seule la maîtrise humaine des langues ouvre véritablement les portes de la culture et du respect mutuel.',
					rubricSummary: 'Introduction avec problématique soutenue (1.5) + Plan dialectique riche avec concession avancée et transitions (3) + Synthèse équilibrée (1.5) + Langue soutenue et style (2).',
					easyQ: 'Quel procédé syntaxique élevé est utilisé dans « Les programmes ont beau traiter des milliards de données... » ?',
					easyAns: 'Une locution concessive suivie de l’infinitif (avoir beau + infinitif)',
					easyWrong: ['Un passé antérieur', 'Un impératif négatif', 'Une simple énumération'],
					medQ: 'Pourquoi la dissertation modèle reconnaît-elle d’abord l’utilité des logiciels de traduction au paragraphe 2 ?',
					medAns: 'Pour adopter une démarche dialectique équilibrée et crédible avant d’en montrer les limites au paragraphe 3',
					medWrong: [
						'Pour prouver qu’il est inutile d’apprendre les langues',
						'Parce que l’auteur n’a aucune opinion personnelle',
						'Pour résumer un texte historique de 1954'
					],
					hardQ: 'Quelle figure rhétorique donne de la force à la chute finale (« la machine dépanne..., mais seule la maîtrise humaine ouvre... ») ?',
					hardAns: 'Une antithèse structurée par un parallélisme qui valorise la dimension humaine des langues',
					hardWrong: [
						'Une antiphrase humoristique',
						'Un discours indirect libre',
						'Une simple phrase nominale sans verbe'
					]
				},
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) du texte argumentatif intitulé « La science sans conscience morale peut-elle vraiment servir l’humanité ? ».',
					sujetUnNotes: [
						'Accroche complète : présenter la revue, le titre, la problématique éthique et la visée argumentative.',
						'Résumé analytique : synthétiser la thèse adverse, la réfutation fondée sur Al-Zahrawi et Ibn Al-Haytham, et la conclusion.',
						'Critique approfondie : évaluer la force des exemples historiques, l’usage de la concession (« Quand bien même ») et formuler une remarque nuancée.'
					],
					sujetDeuxPrompt:
						'« La vitesse informe à la surface, mais seule la profondeur forme l’intelligence. » Dans un essai argumentatif de 180 à 220 mots, examinez les avantages et les dérives de la consommation rapide d’informations sur Internet avant de défendre une pratique lucide de la lecture.',
					modelAnswer:
						'Ce texte argumentatif intitulé « La science sans conscience morale peut-elle vraiment servir l’humanité ? », tiré d’une revue d’éthique scientifique, interroge les rapports entre liberté de la recherche et responsabilité morale afin de convaincre le lecteur que tout progrès technique doit demeurer au service du bien commun.\nDans un premier temps, l’auteur rappelle la puissance inédite des sciences contemporaines et expose la thèse de certains chercheurs qui réclament une liberté scientifique affranchie de toute limite éthique. Par la suite, il réfute fermement cette position en soulignant les dangers encourus par la dignité humaine et par la nature lorsque la technique ignore la morale. Pour étayer son propos, il convoque l’exemple exemplaire de savants tels qu’Al-Zahrawi et Ibn Al-Haytham, qui unissaient rigueur expérimentale et humilité. Enfin, il conclut que l’éthique ne freine nullement la créativité mais la préserve de ses propres excès.\nÀ mon sens, ce texte se distingue par l’équilibre de son argumentation et la noblesse de son lexique soutenu. Le recours à la concession hypothétique (« Quand bien même ») ainsi qu’aux arguments d’autorité historiques renforce considérablement sa force de persuasion. Toutefois, l’évocation d’un exemple concret lié aux défis numériques actuels aurait encore accentué sa portée contemporaine.',
					rubricSummary: 'Accroche experte (1.5) + Résumé dialectique condensé sans recopiage (2.5) + Critique fond et forme précise (2) + Richesse et correction linguistique (2).',
					easyQ: 'Dans le compte rendu critique d’un débat, quel verbe traduit fidèlement le recours à Al-Zahrawi et Ibn Al-Haytham ?',
					easyAns: 'L’auteur convoque / mobilise l’exemple de savants...',
					easyWrong: ['L’auteur interdit les savants...', 'L’auteur invente un dialogue...', 'L’auteur oublie les exemples...'],
					medQ: 'Pourquoi la critique modèle mentionne-t-elle « Quand bien même » et les arguments d’autorité ?',
					medAns: 'Parce que l’analyse précise des procédés grammaticaux et argumentatifs caractérise une critique de niveau BAC LE',
					medWrong: [
						'Pour recopier le texte mot à mot',
						'Pour éviter de parler du contenu du texte',
						'Pour transformer le compte rendu en appel écologique'
					],
					hardQ: 'Comment l’auteur du compte rendu réussit-il à nuancer son éloge final avec pertinence ?',
					hardAns: 'En suggérant l’ajout d’un exemple numérique contemporain pour prolonger l’actualité du débat éthique',
					hardWrong: [
						'En affirmant que le texte est trop court',
						'En contredisant le rôle d’Al-Zahrawi',
						'En s’arrêtant brusquement au milieu du résumé'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع أساليب الاستدراك الراقية وأفعال التقرير في شعبة اللغات الأجنبية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب المنهجي أو اللغوي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل هندسة المقال الجدلي ومعايير التقرير النقدي في BAC LE.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'حدد التعليل المنهجي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التعليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل كيف تُختم المقالة أو الوقفة النقدية بمهارة بلاغية وفكرية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد سر الجودة الرفيعة في الإنتاج الكتابي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأمثل هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 8,
				instruction: 'Traitez au choix l’un des deux sujets proposés (8 points — BAC LE) :',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: 'Sujet 1 (Compte rendu critique approfondi — 8 pts) :',
						sujetUnPrompt: chosen.sujetUnPrompt,
						sujetUnNotes: chosen.sujetUnNotes,
						sujetDeuxPrompt: chosen.sujetDeuxPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: chosen.rubricSummary,
						mark: '8'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't2',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'في المقال الجدلي (8 pts)، احرص على التوازن بين الفقرات الأربع: مقدمة بإشكالية، أطروحة، حدود/دحض بانتقال سلس، وخاتمة تركيبية.',
					'وظف تركيباً استدراكياً متقدماً (avoir beau + inf. أو bien que + subj.) وصورة بلاغية واحدة هادفة.',
					'في التقرير النقدي، علّق على الاستراتيجيات الحجاجية والبلاغية داخل النص المصدر.'
				],
				solutionStepsAr: [
					'إشكالية دقيقة أو تقديم وافٍ للنص (1.5 نقطة).',
					'عرض حجاجي جدلي بأمثلة ثقافية أو تلخيص تحليلي مكثف (2.5–3 نقاط).',
					'خاتمة تركيبية مفتوحة أو نقد معمق للمضمون والشكل (1.5–2 نقطتان).',
					'إتقان اللغة الراقية، الاتساق، والترقيم (2 نقطتان).'
				],
				finalAnswer
			};
		}
	}
];
