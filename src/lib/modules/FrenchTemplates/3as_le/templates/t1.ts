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
 * Parameterized Exam & Quiz Templates — Trimestre 1 : Projet 1 « Textes et documents d’histoire » (5 templates)
 * Roles: 2 comprehension (6 pts) + 2 text_exploration (6 pts) + 1 written_expression (8 pts)
 */
export const TEMPLATES_3AS_LE_T1: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (6 pts): Presse réformiste, Congrès de la Soummam & mémoire algérienne
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t1_comp_histoire_presse_oulemas',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): الصحافة الإصلاحية، مؤتمر الصومام، وذاكرة المقاومة',
		curriculumLessonId: 'fre_lesson_3as_le_t1_statut_auteur_modalisation',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Al-Chihab et El-Bassaïr : la plume contre la censure coloniale',
					source: 'D’après une étude d’historiographie algérienne contemporaine',
					paragraphs: [
						'Bien avant le déclenchement de la lutte armée, la presse réformiste algérienne livra une bataille décisive pour la dignité culturelle. À Constantine dès 1925, Cheikh Abdelhamid Ben Badis lançait Al-Chihab, puis l’Association des Oulémas créait El-Bassaïr sous la direction inspirée de Cheikh Mohamed Bachir El-Ibrahimi. Alors que l’administration coloniale prétendait « civiliser » le pays tout en fermant les écoles arabes, [[ces publications]] se lisaient avec ferveur jusque dans les villages les plus reculés.',
						'Saisies à plusieurs reprises par une censure sourcilleuse, les rédactions ne cédaient jamais au découragement : dès qu’un titre était suspendu, les savants avaient déjà préparé une nouvelle formule légale afin de maintenir vivant le lien avec le peuple. Les lecteurs attendaient chaque numéro comme un rendez-vous d’espérance ; non, jamais la plume libre ne se tairait !',
						'En retraçant aujourd’hui [[ce combat intellectuel]], les historiens rappellent que l’indépendance nationale se prépara d’abord dans les esprits grâce à la constance des éducateurs et des journalistes algériens.'
					],
					glossary: [
						{ term: 'sourcilleux', meaning: 'très sévère, méfiant et prompt à interdire' },
						{ term: 'ferveur', meaning: 'enthousiasme profond et sincère' }
					],
					tfItems: [
						{ q: 'Cheikh Abdelhamid Ben Badis lança la revue Al-Chihab à Constantine dès 1925.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’administration coloniale protégeait et finançait librement les écoles arabes et les journaux réformistes.', a: 'Faux', c: 'Elle fermait les écoles arabes et saisissait régulièrement les publications par la censure.', mark: '0.5' },
						{ q: 'Lorsque la censure suspendait un journal, les Oulémas renonçaient définitivement à écrire.', a: 'Faux', c: 'Ils préparaient aussitôt une nouvelle formule légale pour maintenir le lien avec le peuple.', mark: '0.5' },
						{ q: 'Selon les historiens, ce combat intellectuel prépara les esprits à l’indépendance nationale.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez deux indices de subjectivité implicite dans le paragraphe 1 et expliquez ce qu’ils révèlent.', a: 'Le verbe « prétendait » et les guillemets autour de « civiliser » dénoncent l’hypocrisie coloniale ; « direction inspirée » et « bataille décisive » valorisent les Oulémas.', mark: '0.75' },
						{ q: 'b) Quelle est la valeur stylistique de la phrase « non, jamais la plume libre ne se tairait ! » (§2) ?', a: 'C’est du discours indirect libre qui fait entendre vivement la détermination intérieure des rédacteurs et des lecteurs.', mark: '0.75' }
					],
					refPrompt: 'a) « ces publications » (§1)   b) « ce combat intellectuel » (§3)',
					refAnswer: 'a) « ces publications » renvoie aux revues Al-Chihab et El-Bassaïr.   b) « ce combat intellectuel » renvoie à la lutte de la presse réformiste et éducative des Oulémas.',
					synthPrompt: 'Selon vous, pourquoi la maîtrise de la presse et de l’écrit joue-t-elle un rôle stratégique dans la défense d’une culture ? Développez en quatre lignes.',
					synthAnswer: 'À mon sens, la presse et l’écrit constituent un rempart irremplaçable pour toute culture menacée. En effet, ils préservent la langue, diffusent la conscience historique et unissent les citoyens autour de valeurs partagées. Ainsi, la plume prépare et consolide toujours la liberté d’un peuple.',
					easyQ: 'Dans quelle ville Cheikh Ben Badis lança-t-il la revue Al-Chihab en 1925 ?',
					easyAns: 'À Constantine',
					easyWrong: ['À Oran', 'À Timgad', 'À Ghardaïa'],
					medQ: 'Quel procédé est illustré par les guillemets encadrant « civiliser » au paragraphe 1 ?',
					medAns: 'Une modalisation implicite (mise à distance critique dénonçant un prétexte colonial)',
					medWrong: ['Une approbation neutre', 'Une date historique exacte', 'Un discours direct de Ben Badis'],
					hardQ: 'Comment qualifie-t-on le procédé « non, jamais la plume libre ne se tairait ! » au paragraphe 2 ?',
					hardAns: 'Un discours indirect libre restituant la détermination des rédacteurs avec vivacité',
					hardWrong: [
						'Un discours direct entre guillemets',
						'Une simple voix passive impersonnelle',
						'Un présent de vérité générale'
					]
				},
				{
					title: 'Août 1956 : le Congrès de la Soummam, architecture de la Révolution',
					source: 'D’après une analyse d’histoire contemporaine de l’Algérie',
					paragraphs: [
						'Vingt-deux mois après le déclenchement du 1er Novembre 1954, la Révolution algérienne franchissait une étape décisive. Le 20 août 1956, dans la vallée encaissée de la Soummam, des responsables venus de plusieurs régions se réunissaient dans la clandestinité sous l’impulsion de dirigeants lucides tels que Larbi Ben M’hidi. Ce que [[les pionniers]] avaient préparé dans l’urgence de 1954 recevait désormais une organisation politique et militaire cohérente.',
						'La plateforme adoptée à l’issue des débats affirmait deux principes directeurs : la primauté du politique sur le militaire et celle de l’intérieur sur l’extérieur. En quelques jours, le territoire fut découpé en six wilayas structurées, tandis que des institutions représentatives se mettaient en place afin de donner à la lutte une crédibilité internationale incontestable.',
						'En revisitant [[cette rencontre fondatrice]], les historiens soulignent que la discipline institutionnelle née à la Soummam transforma un soulèvement courageux en un véritable projet d’État souverain.'
					],
					glossary: [
						{ term: 'primauté', meaning: 'caractère de ce qui vient au premier rang' },
						{ term: 'clandestinité', meaning: 'action menée dans le secret pour échapper à la surveillance' }
					],
					tfItems: [
						{ q: 'Le Congrès de la Soummam s’est tenu le 20 août 1956 dans la clandestinité.', a: 'Vrai', mark: '0.5' },
						{ q: 'Larbi Ben M’hidi fait partie des dirigeants lucides évoqués par le texte.', a: 'Vrai', mark: '0.5' },
						{ q: 'La plateforme de la Soummam a décidé de supprimer toute organisation régionale en wilayas.', a: 'Faux', c: 'Le territoire fut au contraire découpé en six wilayas structurées.', mark: '0.5' },
						{ q: 'Selon les historiens, le Congrès a conféré à la Révolution une véritable structure d’État.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez les deux principes directeurs adoptés par la plateforme de la Soummam (§2).', a: 'La primauté du politique sur le militaire et la primauté de l’intérieur sur l’extérieur.', mark: '0.75' },
						{ q: 'b) Justifiez l’emploi du plus-que-parfait « avaient préparé » (§1) et du passif pronominal « se mettaient en place » (§2).', a: '« avaient préparé » marque la rétrospection/antériorité (1954 avant 1956) ; « se mettaient en place » focalise sur l’instauration progressive des institutions sans nommer un agent unique.', mark: '0.75' }
					],
					refPrompt: 'a) « les pionniers » (§1)   b) « cette rencontre fondatrice » (§3)',
					refAnswer: 'a) « les pionniers » renvoie aux dirigeants qui ont déclenché la Révolution le 1er Novembre 1954.   b) « cette rencontre fondatrice » renvoie au Congrès de la Soummam (20 août 1956).',
					synthPrompt: 'Pourquoi l’organisation institutionnelle est-elle aussi indispensable que le courage dans la réussite d’une cause collective ? Justifiez en quatre lignes.',
					synthAnswer: 'Je partage pleinement l’idée que le courage seul ne suffit pas sans organisation rigoureuse. En effet, des institutions claires coordonnent les efforts, évitent la dispersion et confèrent une légitimité durable à l’action collective. C’est précisément cette alliance entre discipline et dévouement qui a conduit l’Algérie à sa souveraineté.',
					easyQ: 'À quelle date exacte s’est ouvert le Congrès de la Soummam selon le texte ?',
					easyAns: 'Le 20 août 1956',
					easyWrong: ['Le 5 mai 1931', 'Le 1er Novembre 1954', 'Le 5 juillet 1962'],
					medQ: 'Quelle est la valeur du plus-que-parfait « avaient préparé » dans le paragraphe 1 ?',
					medAns: 'L’antériorité et la rétrospection (les préparatifs de 1954 avant le congrès de 1956)',
					medWrong: ['Une action future', 'Un ordre solennel', 'Une habitude contemporaine'],
					hardQ: 'Comment l’auteur résume-t-il l’apport historique majeur du Congrès de la Soummam (§3) ?',
					hardAns: 'Il a transformé un soulèvement courageux en un projet d’État souverain doté d’institutions',
					hardWrong: [
						'Il a mis fin à la lutte dès 1956',
						'Il a supprimé les six wilayas',
						'Il s’est limité à un simple débat linguistique'
					]
				},
				{
					title: 'Abou El-Kacem Saadallah et Cheikh Ahmed Sahnoun : gardiens de la mémoire',
					source: 'D’après un hommage aux figures intellectuelles d’Algérie',
					paragraphs: [
						'L’histoire d’une nation ne s’écrit pas seulement sur les champs de bataille ; [[elle]] se forge également dans la patience des bibliothèques et la fidélité des poètes. Tout au long de sa vie, l’historien Abou El-Kacem Saadallah a patiemment exploré les archives dispersées entre Alger, Tunis, Le Caire et d’autres capitales afin de restituer dans sa richesse l’histoire culturelle de l’Algérie.',
						'Parallèlement, Cheikh Ahmed Sahnoun incarna la continuité morale de l’école réformiste : éducateur attentif, orateur intègre et poète engagé, il rappelait aux jeunes générations que la liberté politique doit toujours s’accompagner d’une élévation intellectuelle et éthique. Ce que les pionniers avaient semé au prix de lourds sacrifices devait être entretenu par l’étude rigoureuse.',
						'Aujourd’hui encore, [[leurs œuvres]] constituent une référence précieuse qui invite chaque étudiant algérien à unir l’attachement à sa mémoire et l’exigence du savoir.'
					],
					glossary: [
						{ term: 'intègre', meaning: 'd’une honnêteté morale irréprochable' },
						{ term: 'restituer', meaning: 'reconstituer fidèlement ce qui avait été oublié ou dispersé' }
					],
					tfItems: [
						{ q: 'Abou El-Kacem Saadallah a exploré des archives dans plusieurs capitales pour écrire l’histoire culturelle algérienne.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur estime que l’histoire d’une nation se limite uniquement aux batailles militaires.', a: 'Faux', c: 'Elle se forge aussi dans la patience des bibliothèques, le travail des historiens et la fidélité des éducateurs.', mark: '0.5' },
						{ q: 'Cheikh Ahmed Sahnoun associait la liberté politique à l’élévation intellectuelle et morale.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le texte affirme que leurs œuvres n’ont plus aucun intérêt pour les étudiants actuels.', a: 'Faux', c: 'Elles constituent aujourd’hui encore une référence précieuse pour chaque étudiant.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez deux verbes au passif pronominal dans le paragraphe 1 et expliquez leur valeur.', a: '« ne s’écrit pas » (= n’est pas écrite) et « se forge » (= est forgée) : ils énoncent une vérité générale historique en mettant l’accent sur le processus lui-même.', mark: '0.75' },
						{ q: 'b) Quelle valeur exprime le présent « constituent » dans le paragraphe 3 ?', a: 'Un présent d’énonciation (actuel), introduit par « Aujourd’hui encore », qui relie l’héritage passé au présent des étudiants.', mark: '0.75' }
					],
					refPrompt: 'a) « elle » (§1)   b) « leurs œuvres » (§3)',
					refAnswer: 'a) « elle » renvoie à l’histoire d’une nation.   b) « leurs œuvres » renvoie aux ouvrages historiques d’Abou El-Kacem Saadallah et aux écrits et poèmes de Cheikh Ahmed Sahnoun.',
					synthPrompt: 'Pourquoi un pays a-t-il autant besoin de ses historiens et éducateurs que de ses bâtisseurs matériels ? Justifiez en quatre lignes.',
					synthAnswer: 'À mon avis, les infrastructures matérielles ne suffisent pas à faire vivre une nation si sa mémoire et ses valeurs s’effacent. Les historiens et éducateurs transmettent les repères éthiques, la langue et la fierté d’un patrimoine partagé. Ainsi, ils forment les citoyens responsables qui bâtissent durablement le pays.',
					easyQ: 'Quel grand historien de la culture algérienne est mis à l’honneur au paragraphe 1 ?',
					easyAns: 'Abou El-Kacem Saadallah',
					easyWrong: ['Ibn Battouta', 'Al-Khwarizmi', 'Al-Jazari'],
					medQ: 'Quelle est la nature grammaticale de « se forge » dans « elle se forge également dans la patience des bibliothèques » (§1) ?',
					medAns: 'Un passif pronominal équivalent à « est forgée »',
					medWrong: ['Un passé simple actif', 'Un subjonctif d’ordre', 'Un futur antérieur'],
					hardQ: 'Quelle valeur du présent distingue « s’écrit » (§1) et « constituent » (§3) ?',
					hardAns: '« s’écrit » exprime une vérité générale, tandis que « constituent » (avec Aujourd’hui encore) marque le présent d’énonciation actuel',
					hardWrong: [
						'Les deux sont des impératifs',
						'Les deux sont des présents historiques de 1954',
						'Ils expriment une hypothèse irréelle'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى الفقرة الأولى للتحقق من المعلومة التاريخية الدقيقة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Compréhension BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح وفق النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع مؤشرات الذاتية الضمنية والمبني للمجهول الضمائري والأسبقية الزمنية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل الأسلوبي أو النحوي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل القيم السردية والخطاب غير المباشر الحر والبعد التحليلي للفقرات.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Approfondissement BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج التحليل العميق للنص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement ce document d’histoire puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. Ce texte a pour visée dominante de :',
								options: [
									'Informer sur une page majeure de l’histoire algérienne et en valoriser les acteurs',
									'Critiquer l’usage des bibliothèques historiques',
									'Exhorter à acheter un appareil moderne'
								],
								correct: 'Informer sur une page majeure de l’histoire algérienne et en valoriser les acteurs',
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
						content: `4. Précisez le référent exact des expressions soulignées :\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه في نصوص اللغات الأجنبية إلى الذاتية الضمنية (المزدوجتان، أفعال التشكيك، المعجم التقييمي).',
					'راقب استعمال Passif pronominal (se lisaient, se mettaient en place, se forge) و Plus-que-parfait للاسترجاع.',
					'في سؤال التفكير الأخير، حرر 4 أسطر بلغة راقية وموقف معلل.'
				],
				solutionStepsAr: [
					'تحديد الغاية التواصلية المزدوجة (0.5 نقطة).',
					'تصحيح جمل الصواب والخطأ (2 نقطتان).',
					'التحليل الأسلوبي والزمني المعمق (1.5 نقطة).',
					'فك الإحالة وتحرير فقرة التفكير النقدي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (6 pts): Foyers de savoir algériens & martyrs de la liberté
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t1_comp_temoignages_civilisation',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): حواضر العلم الجزائرية وشهادات الكفاح الوطني',
		curriculumLessonId: 'fre_lesson_3as_le_t1_chronologie_retrospection_narration',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Tlemcen et Béjaïa : carrefours rayonnants du savoir médiéval',
					source: 'D’après une chronique d’histoire des civilisations du Maghreb',
					paragraphs: [
						'Au XIVe siècle, bien avant l’époque moderne, les cités algériennes de Tlemcen et de Béjaïa brillaient comme des foyers intellectuels de premier plan en Méditerranée. Lorsque le grand voyageur Ibn Battouta traversa le Maghreb, [[il]] nota avec admiration l’activité des médersas, la beauté de la Grande Mosquée de Tlemcen et l’hospitalité des savants qui enseignaient le droit, les mathématiques et la grammaire.',
						'C’est également sur cette terre féconde que le penseur Ibn Khaldoun enseigna à Béjaïa avant de se retirer dans la région de Tiaret, à la Qalâa des Béni Salama, où il rédigea sa célèbre Muqaddimah entre 1375 et 1379. Les ouvrages qu’il avait mûris au contact des sociétés maghrébines fondèrent une méthode critique novatrice pour comprendre l’essor et le déclin des civilisations.',
						'Redécouvrir [[cet âge d’or scientifique]] permet aujourd’hui de rappeler aux étudiants que la rigueur intellectuelle et l’ouverture au savoir appartiennent pleinement au patrimoine de l’Algérie.'
					],
					glossary: [
						{ term: 'médersa', meaning: 'établissement d’enseignement supérieur classique' },
						{ term: 'novatrice', meaning: 'qui introduit des méthodes ou des idées neuves' }
					],
					tfItems: [
						{ q: 'Tlemcen et Béjaïa étaient au XIVe siècle des centres intellectuels rayonnants en Méditerranée.', a: 'Vrai', mark: '0.5' },
						{ q: 'Ibn Battouta a visité le Maghreb et admiré les écoles et la Grande Mosquée de Tlemcen.', a: 'Vrai', mark: '0.5' },
						{ q: 'Ibn Khaldoun a rédigé la Muqaddimah en Europe au XXe siècle.', a: 'Faux', c: 'Il l’a rédigée en Algérie, à la Qalâa des Béni Salama près de Tiaret, entre 1375 et 1379.', mark: '0.5' },
						{ q: 'Le texte affirme que l’œuvre d’Ibn Khaldoun ne concernait pas l’étude des civilisations.', a: 'Faux', c: 'Elle fonda une méthode critique novatrice pour comprendre l’essor et le déclin des civilisations.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel lien historique le texte établit-il entre Ibn Khaldoun et le territoire algérien (§2) ?', a: 'Ibn Khaldoun a enseigné à Béjaïa puis rédigé sa célèbre Muqaddimah à la Qalâa des Béni Salama (région de Tiaret) entre 1375 et 1379.', mark: '0.75' },
						{ q: 'b) Expliquez l’accord du participe passé « mûris » et la valeur du plus-que-parfait dans « Les ouvrages qu’il avait mûris » (§2).', a: '« mûris » s’accorde au masculin pluriel avec le COD antéposé « que » (= les ouvrages) ; le plus-que-parfait marque l’antériorité de sa réflexion par rapport à la rédaction.', mark: '0.75' }
					],
					refPrompt: 'a) « il » (§1)   b) « cet âge d’or scientifique » (§3)',
					refAnswer: 'a) « il » renvoie au voyageur Ibn Battouta.   b) « cet âge d’or scientifique » renvoie au rayonnement intellectuel de Tlemcen, Béjaïa et des savants du XIVe siècle.',
					synthPrompt: 'Pourquoi est-il bénéfique pour les lycéens algériens de connaître l’histoire scientifique de villes comme Tlemcen et Béjaïa ? Développez en quatre lignes.',
					synthAnswer: 'Connaître l’histoire scientifique de Tlemcen et Béjaïa inspire aux lycéens une légitime confiance en leur héritage culturel. En effet, voir que des savants comme Ibn Khaldoun ont produit des œuvres universelles sur cette terre encourage l’exigence intellectuelle et l’ambition dans les études.',
					easyQ: 'Où Ibn Khaldoun a-t-il rédigé sa célèbre Muqaddimah entre 1375 et 1379 ?',
					easyAns: 'À la Qalâa des Béni Salama (dans la région de Tiaret)',
					easyWrong: ['Dans la Casbah d’Alger', 'À Timgad', 'Au Tassili n’Ajjer'],
					medQ: 'Pourquoi « mûris » prend-il « -s » dans « Les ouvrages qu’il avait mûris » (§2) ?',
					medAns: 'Parce que le COD « que » (= les ouvrages, masc. plur.) précède l’auxiliaire avoir',
					medWrong: ['Parce que le sujet « il » est pluriel', 'Parce qu’il est employé avec être', 'Parce que c’est un passé simple'],
					hardQ: 'Quelle est la visée communicative de ce texte historique sur Tlemcen et Béjaïa ?',
					hardAns: 'Informer sur le rayonnement intellectuel médiéval de l’Algérie et valoriser cet héritage auprès des étudiants',
					hardWrong: [
						'Critiquer les voyages d’Ibn Battouta',
						'Présenter un débat sur les réseaux sociaux',
						'Lancer un appel urgent contre les incendies'
					]
				},
				{
					title: 'Ahmed Zabana et la poésie patriotique de Moufdi Zakaria',
					source: 'D’après les archives testimoniales de la Révolution algérienne',
					paragraphs: [
						'Le 19 juin 1956, à la prison de Barberousse à Alger, le militant Ahmed Zabana devenait le premier condamné à mort guillotiné de la Révolution algérienne. Avant de quitter ses compagnons de cellule, [[il]] écrivit à sa famille une lettre d’une sérénité bouleversante, affirmant que la mort pour la patrie était une source d’honneur et de dignité.',
						'Dans une cellule voisine, le poète Moufdi Zakaria, témoin direct de cette épreuve, transforma l’émotion collective en vers immortels. Ses poèmes, appris par cœur par les détenus puis transmis clandestinement vers l’extérieur, se répandaient dans tout le pays et soutenaient le moral du peuple. Qu’importaient les chaînes et les barreaux : la voix de la liberté franchissait déjà les murailles !',
						'Par la convergence de [[ce sacrifice exemplaire]] et de la parole poétique, la mémoire de juin 1956 demeure vivante dans la conscience nationale algérienne.'
					],
					glossary: [
						{ term: 'sérénité', meaning: 'calme intérieur profond face à l’épreuve' },
						{ term: 'convergence', meaning: 'rencontre et union de deux forces vers un même but' }
					],
					tfItems: [
						{ q: 'Ahmed Zabana fut exécuté le 19 juin 1956 à la prison de Barberousse à Alger.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans sa dernière lettre, Ahmed Zabana a exprimé le regret de s’être engagé.', a: 'Faux', c: 'Il écrivit avec une sérénité bouleversante que la mort pour la patrie était une source d’honneur.', mark: '0.5' },
						{ q: 'Moufdi Zakaria était témoin direct et composa des vers appris par cœur par les détenus.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les poèmes de Moufdi Zakaria restèrent totalement inconnus hors de la prison.', a: 'Faux', c: 'Transmis clandestinement vers l’extérieur, ils se répandaient dans tout le pays.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Par quel moyen les poèmes de Moufdi Zakaria ont-ils franchi les murs de la prison (§2) ?', a: 'Ils étaient appris par cœur par les détenus puis transmis clandestinement vers l’extérieur.', mark: '0.75' },
						{ q: 'b) Relevez dans le paragraphe 2 une phrase au discours indirect libre et précisez son effet stylistique.', a: '« Qu’importaient les chaînes et les barreaux : la voix de la liberté franchissait déjà les murailles ! » : traduit avec force la fierté et l’espoir invincible des détenus.', mark: '0.75' }
					],
					refPrompt: 'a) « il » (§1)   b) « ce sacrifice exemplaire » (§3)',
					refAnswer: 'a) « il » renvoie à Ahmed Zabana.   b) « ce sacrifice exemplaire » renvoie au courage et au martyre d’Ahmed Zabana le 19 juin 1956.',
					synthPrompt: 'Selon vous, comment la poésie patriotique soutient-elle un peuple dans les moments d’épreuve ? Répondez en quatre lignes.',
					synthAnswer: 'La poésie patriotique donne une voix mémorable aux souffrances et aux espoirs d’un peuple tout entier. En effet, des vers simples et forts se retiennent facilement et se transmettent de bouche à oreille malgré la censure. Ils fortifient ainsi l’unité morale et la dignité collective.',
					easyQ: 'Quel poète algérien emprisonné à Barberousse est évoqué dans le paragraphe 2 ?',
					easyAns: 'Moufdi Zakaria',
					easyWrong: ['Ibn Battouta', 'Al-Zahrawi', 'Al-Idrisi'],
					medQ: 'Quelle est la valeur du verbe « se répandaient » dans le paragraphe 2 ?',
					medAns: 'Un passif pronominal (= étaient répandus) soulignant la diffusion populaire des poèmes',
					medWrong: ['Un ordre à l’impératif', 'Un conditionnel de doute', 'Un futur simple'],
					hardQ: 'Dans le paragraphe 1, comment la lettre d’Ahmed Zabana est-elle rapportée ?',
					hardAns: 'Au discours indirect (« affirmant que la mort pour la patrie était une source d’honneur »)',
					hardWrong: [
						'Uniquement au discours direct avec guillemets',
						'À l’impératif présent',
						'Au futur antérieur'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع المعلومة التاريخية الواردة صراحة في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Compréhension BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد مطابقة اسم المفعول مع avoir والمبني للمجهول الضمائري.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue et sens BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النحوي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التعليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل الغاية التواصلية أو طريقة نقل الكلام في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج التحليل الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement le texte suivant puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. Ce document relève du :',
								options: ['Texte d’histoire à visée informative et valorisante', 'Débat d’idées sur Internet', 'Appel écologique urgent'],
								correct: 'Texte d’histoire à visée informative et valorisante',
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
						content: `3. Répondez aux questions analytiques suivantes :\n${chosen.openQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.openQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4. Indiquez à qui ou à quoi renvoient les termes soulignés :\n${chosen.refPrompt}`,
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
				trimesterId: 't1',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الترابط الزمني بين الماضي الأسبق والماضي البسيط والحاضر في النص.',
					'انتبه إلى أسلوب نقل الكلام (مباشر، غير مباشر، غير مباشر حر).',
					'صغ سؤال التفكير النقدي في 4 أسطر مترابطة بلغة راقية.'
				],
				solutionStepsAr: [
					'تحديد طبيعة النص وغايته (0.5 نقطة).',
					'تصحيح عبارات الصواب والخطأ (2 نقطتان).',
					'التحليل النحوي والأسلوبي الدقيق (1.5 نقطة).',
					'فك الإحالة وتحرير فقرة التفكير (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Nominalisation complexe, passif pronominal & temps
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t1_exp_nominalisation_passif_temps',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'grammaire_syntaxe',
		titleAr: 'البناء اللغوي (6 نقاط — لغات أجنبية): التسمية المركبة، المبني للمجهول الضمائري، والأسبقية الزمنية',
		curriculumLessonId: 'fre_lesson_3as_le_t1_nominalisation_passif_pronominal',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez ces formes verbales en deux colonnes : fut adoptée - se lisaient - avait été fondée - s’écrit - furent découpées - se transmettait.',
					classCols: [
						{ header: 'Passif canonique (être + PP)', items: ['fut adoptée', 'avait été fondée', 'furent découpées'], mark: '0.5' },
						{ header: 'Passif pronominal (se + V)', items: ['se lisaient', 's’écrit', 'se transmettait'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'restituer' }, nom: { value: 'restitution', mark: '0.25' }, adjectif: { value: 'restitué', mark: '0.25' } },
						{ verbe: { value: 'structurer', mark: '0.25' }, nom: { given: true, value: 'structuration / structure' }, adjectif: { value: 'structuré', mark: '0.25' } },
						{ verbe: { value: 'clandestiner (—)', mark: '0.25' }, nom: { value: 'clandestinité', mark: '0.25' }, adjectif: { given: true, value: 'clandestin' } }
					],
					transforms: [
						{
							q: 'a) Nominalisation complexe : « Les historiens ont exploré patiemment les archives nationales. »',
							a: 'a) L’exploration patiente des archives nationales par les historiens.'
						},
						{
							q: 'b) Transformez en passif pronominal : « Ces poèmes patriotiques étaient transmis de bouche à oreille. »',
							a: 'b) Ces poèmes patriotiques se transmettaient de bouche à oreille.'
						}
					],
					tensePrompt: '4. Conjuguez les verbes entre parenthèses aux temps convenables (Passé antérieur / Plus-que-parfait / Accord du PP) :\na) Dès que les rédacteurs (imprimer) le numéro, les militants le distribuèrent.\nb) Les chroniques qu’Ibn Khaldoun (mûrir) à Béjaïa marquèrent l’histoire.',
					tenseAnswer: 'a) eurent imprimé   b) avait mûries (accord avec le COD antéposé « que » = les chroniques, fém. plur.)',
					easyQ: 'Laquelle de ces formes verbales est un passif pronominal ?',
					easyAns: 'se transmettait (= était transmise)',
					easyWrong: ['fut adoptée', 'avait été fondée', 'furent découpées'],
					medQ: 'Nominalisez avec précision : « Les historiens ont exploré patiemment les archives. »',
					medAns: 'L’exploration patiente des archives par les historiens.',
					medWrong: [
						'L’explorage patiemment des archives par les historiens.',
						'L’explorément patiente des archives.',
						'Explorer patient les archives.'
					],
					hardQ: 'Complétez avec le passé antérieur exact : « Dès que les rédacteurs .......... le numéro, les militants le distribuèrent. »',
					hardAns: 'eurent imprimé',
					hardWrong: ['avaient imprimé', 'aient imprimé', 'auront imprimé']
				},
				{
					classPrompt: '1. Classez les emplois du présent dans le tableau : En 1925, Al-Chihab paraît à Constantine - Aujourd’hui, ces livres inspirent les jeunes - La mémoire unit les peuples - Le 20 août 1956, le congrès s’ouvre.',
					classCols: [
						{ header: 'Présent historique', items: ['En 1925, Al-Chihab paraît à Constantine', 'Le 20 août 1956, le congrès s’ouvre'], mark: '0.5' },
						{ header: 'Énonciation / Vérité générale', items: ['Aujourd’hui, ces livres inspirent les jeunes', 'La mémoire unit les peuples'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'disperser' }, nom: { value: 'dispersion', mark: '0.25' }, adjectif: { value: 'dispersé', mark: '0.25' } },
						{ verbe: { value: 'fondre / fonder', mark: '0.25' }, nom: { given: true, value: 'fondation' }, adjectif: { value: 'fondateur', mark: '0.25' } },
						{ verbe: { value: 'immortaliser', mark: '0.25' }, nom: { value: 'immortalité', mark: '0.25' }, adjectif: { given: true, value: 'immortel' } }
					],
					transforms: [
						{
							q: 'a) Nominalisation complexe : « Les savants ont défendu courageusement l’identité nationale. »',
							a: 'a) La défense courageuse de l’identité nationale par les savants.'
						},
						{
							q: 'b) Transformez en passif pronominal : « L’histoire authentique est écrite grâce aux documents vérifiés. »',
							a: 'b) L’histoire authentique s’écrit grâce aux documents vérifiés.'
						}
					],
					tensePrompt: '4. Justifiez l’accord ou le mode dans chaque phrase :\na) Après que Cheikh El-Mili (achever) son manuscrit, l’ouvrage fut publié.\nb) Les écoles libres qu’ils avaient (ouvrir) accueillaient de nombreux enfants.',
					tenseAnswer: 'a) eut achevé (passé antérieur — indicatif après « après que »).   b) ouvertes (accord féminin pluriel avec le COD antéposé « que » = les écoles libres).',
					easyQ: 'Quel nom dérive du verbe « disperser » ?',
					easyAns: 'la dispersion',
					easyWrong: ['le dispersement', 'la dispersage', 'la dispersance'],
					medQ: 'Transformez en passif pronominal : « L’histoire authentique est écrite grâce aux documents vérifiés. »',
					medAns: 'L’histoire authentique s’écrit grâce aux documents vérifiés.',
					medWrong: [
						'L’histoire authentique s’écrit par les historiens.',
						'L’histoire authentique est s’écrite grâce aux documents.',
						'L’histoire authentique se écrivit grâce aux documents.'
					],
					hardQ: 'Choisissez l’orthographe exacte du participe passé : « Les écoles libres qu’ils avaient .......... rayonnaient dans tout le pays. »',
					hardAns: 'ouvertes',
					hardWrong: ['ouvert', 'ouverts', 'ouverte']
				},
				{
					classPrompt: '1. Classez ces mots en deux champs lexicaux : manuscrits - censure - archives - suspension - bibliothèques - saisie.',
					classCols: [
						{ header: 'Patrimoine écrit', items: ['manuscrits', 'archives', 'bibliothèques'], mark: '0.5' },
						{ header: 'Répression de la presse', items: ['censure', 'suspension', 'saisie'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'diffuser' }, nom: { value: 'diffusion', mark: '0.25' }, adjectif: { value: 'diffusé', mark: '0.25' } },
						{ verbe: { value: 'constater', mark: '0.25' }, nom: { given: true, value: 'constance / constat' }, adjectif: { value: 'constant', mark: '0.25' } },
						{ verbe: { value: 'honorer', mark: '0.25' }, nom: { value: 'honneur', mark: '0.25' }, adjectif: { given: true, value: 'honorable' } }
					],
					transforms: [
						{
							q: 'a) Nominalisation complexe : « Les dirigeants ont organisé discrètement le congrès. »',
							a: 'a) L’organisation discrète du congrès par les dirigeants.'
						},
						{
							q: 'b) Transformez à la voix passive canonique : « On avait préparé cette plateforme dans la vallée de la Soummam. »',
							a: 'b) Cette plateforme avait été préparée dans la vallée de la Soummam.'
						}
					],
					tensePrompt: '4. Identifiez le temps et la valeur de chaque verbe souligné :\na) Les Oulémas avaient formé une élite bien avant 1954. (Plus-que-parfait)\nb) En 1377, Ibn Khaldoun achève la rédaction de sa Muqaddimah. (Présent)',
					tenseAnswer: 'a) Plus-que-parfait d’antériorité (rétrospection).   b) Présent historique (de narration) qui actualise l’événement médiéval.',
					easyQ: 'Quel adjectif correspond au nom « honneur » ?',
					easyAns: 'honorable',
					easyWrong: ['honorité', 'honorisme', 'honorage'],
					medQ: 'Transformez à la voix passive : « On avait préparé cette plateforme dans la vallée. »',
					medAns: 'Cette plateforme avait été préparée dans la vallée.',
					medWrong: [
						'Cette plateforme avait été préparée par on dans la vallée.',
						'Cette plateforme avait été préparé dans la vallée.',
						'Cette plateforme fut préparée par on dans la vallée.'
					],
					hardQ: 'Nominalisez avec élégance : « Les dirigeants ont organisé discrètement le congrès. »',
					hardAns: 'L’organisation discrète du congrès par les dirigeants.',
					hardWrong: [
						'L’organisement discrètement du congrès.',
						'Organiser discret le congrès par les dirigeants.',
						'L’organisation discrètement du congrès.'
					]
				}
			];

			const chosen = rng.pick(pool);
			// Ensure clean verb column when wordFamily has an abstract noun/adj
			const cleanRows = chosen.wordRows.map((r) =>
				r.verbe.value.includes('clandestiner')
					? { verbe: { given: true, value: 'concevoir' }, nom: { value: 'conception', mark: '0.25' }, adjectif: { value: 'conçu', mark: '0.25' } }
					: r
			);

			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع الفرق بين المبني للمجهول العادي والضمائري وعائلات الكلمات.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الإجابة الصرفية أو النحوية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من تحويل الظرف إلى صفة في التسمية ومن غياب par مع المبني للمجهول الضمائري.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل الأسلوبي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل السليم هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه للأسبقية المباشرة (Passé antérieur) ولمطابقة اسم المفعول مع COD المتقدم.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الإجابة النحوية المتقدمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités linguistiques suivantes (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Complétez le tableau morphologique suivant :'
					},
					buildFrenchWordFamilyTableBlock(cleanRows),
					{
						type: 'text',
						content: `3. Effectuez les transformations stylistiques demandées :\n${chosen.transforms.map((t) => t.q).join('\n')}`,
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
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'grammaire_syntaxe',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في التسمية المركبة يتحول الظرف إلى صفة مطابقة (patiemment -> patiente).',
					'المبني للمجهول الضمائري (se lisaient, s’écrit) لا يُتبع بـ « par + agent ».',
					'مع avoir، يطابق اسم المفعول الـ COD إذا تقدم عليه (les écoles qu’ils avaient ouvertes).'
				],
				solutionStepsAr: [
					'تصنيف الصيغ أو القيم الزمنية (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'التسمية المركبة والمبني للمجهول الضمائري (2 نقطتان).',
					'الماضي الأسبق ومطابقة اسم المفعول (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Discours direct/indirect/libre & modalisation fine
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t1_exp_discours_modalisation',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (6 نقاط — لغات أجنبية): الخطاب المباشر وغير المباشر والحر والتمظهر الصريح/الضمني',
		curriculumLessonId: 'fre_lesson_3as_le_t1_discours_direct_indirect_libre',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					modPrompt: '1. Classez ces procédés selon qu’ils marquent la modalisation explicite ou implicite : « je me souviens » - la « pacification » - « notre patrie » - direction inspirée - « j’estime » - censure impitoyable.',
					modCols: [
						{ header: 'Modalisation explicite', items: ['« je me souviens »', '« notre patrie »', '« j’estime »'], mark: '0.75' },
						{ header: 'Modalisation implicite', items: ['la « pacification »', 'direction inspirée', 'censure impitoyable'], mark: '0.75' }
					],
					speechPrompts: [
						{
							q: 'a) Mettez au discours indirect : Le témoin précisa : « Dès que nous aurons diffusé le texte, tout le quartier le lira. »',
							a: 'a) Le témoin précisa que dès qu’ils auraient diffusé le texte, tout le quartier le lirait.'
						},
						{
							q: 'b) Mettez au discours indirect : L’historien demanda : « Qu’est-ce qui a permis à ce journal de reparaître ? »',
							a: 'b) L’historien demanda ce qui avait permis à ce journal de reparaître.'
						}
					],
					dilPrompt: '3. Identifiez la forme du discours rapporté (DD, DI ou DIL) et justifiez :\n« Les militants observèrent l’horizon : non, jamais ils ne céderaient devant la peur ! »',
					dilAnswer: 'Discours indirect libre (DIL) : absence de guillemets et de verbe introducteur, emploi de la 3e personne et du conditionnel (céderaient) avec ponctuation expressive (!).',
					clozePrompt: '4. Complétez avec : crédibilité - archives - témoignages - impartialité.\nL’historien rigoureux croise les (1) .......... officielles et les (2) .......... vécus afin de garantir la (3) .......... de son récit tout en tendant vers l’(4) .......... .',
					clozeAnswer: '1) archives   2) témoignages   3) crédibilité   4) impartialité',
					easyQ: 'Comment se transforme le pronom interrogatif « Qu’est-ce qui » au discours indirect ?',
					easyAns: 'ce qui',
					easyWrong: ['ce que', 'si', 'dont'],
					medQ: 'Transformez au discours indirect : Il précisa : « Dès que nous aurons diffusé le texte, tous le liront. »',
					medAns: 'Il précisa que dès qu’ils auraient diffusé le texte, tous le liraient.',
					medWrong: [
						'Il précisa que dès qu’ils auront diffusé le texte, tous le liront.',
						'Il précisa que dès qu’ils avaient diffusé le texte, tous le lisaient.',
						'Il précisa que dès que nous aurions diffusé le texte, tous le liraient.'
					],
					hardQ: 'Pourquoi « la "pacification" » entre guillemets est-elle classée dans la modalisation implicite ?',
					hardAns: 'Parce que l’auteur conteste indirectement ce terme sans recourir au pronom « je »',
					hardWrong: [
						'Parce qu’elle contient un pronom de la 1re personne',
						'Parce qu’elle marque une objectivité absolue',
						'Parce que c’est un verbe à l’impératif'
					]
				},
				{
					modPrompt: '1. Classez ces expressions en deux catégories : selon les archives de 1956 - lutte mémorable - le 19 juin 1956 - répression barbare - à la Qalâa des Béni Salama - sérénité bouleversante.',
					modCols: [
						{ header: 'Effacement énonciatif (Objectif)', items: ['selon les archives de 1956', 'le 19 juin 1956', 'à la Qalâa des Béni Salama'], mark: '0.75' },
						{ header: 'Subjectivité implicite (Évaluatif)', items: ['lutte mémorable', 'répression barbare', 'sérénité bouleversante'], mark: '0.75' }
					],
					speechPrompts: [
						{
							q: 'a) Mettez au discours indirect : Le chercheur demanda au témoin : « Qu’avez-vous conservé de cette époque ? »',
							a: 'a) Le chercheur demanda au témoin ce qu’il avait conservé de cette époque.'
						},
						{
							q: 'b) Mettez au discours indirect : Le rédacteur annonça : « Le nouveau numéro paraîtra dans trois jours. »',
							a: 'b) Le rédacteur annonça que le nouveau numéro paraîtrait trois jours plus tard.'
						}
					],
					dilPrompt: '3. Précisez le statut de l’auteur (historien ou témoin) dans cette phrase et justifiez :\n« Nous entendions au loin les pas des patrouilles tandis que mon père cachait les cahiers d’El-Bassaïr. »',
					dilAnswer: 'Statut de témoin : présence explicite de la 1re personne (« Nous », « mon père ») et récit sensoriel direct d’une scène vécue.',
					clozePrompt: '4. Complétez avec les termes convenables : rétrospection - narration - actualiser - antériorité.\nLe plus-que-parfait crée un effet de (1) .......... en marquant l’(2) .......... , tandis que le présent de (3) .......... sert à (4) .......... un événement passé.',
					clozeAnswer: '1) rétrospection   2) antériorité   3) narration   4) actualiser',
					easyQ: 'Comment transpose-t-on « dans trois jours » au discours indirect après un verbe introducteur au passé ?',
					easyAns: 'trois jours plus tard',
					easyWrong: ['trois jours plus tôt', 'la veille', 'ce jour-là'],
					medQ: 'Transformez au discours indirect : Le chercheur demanda : « Qu’avez-vous conservé de cette époque ? »',
					medAns: 'Le chercheur demanda ce qu’il avait conservé de cette époque.',
					medWrong: [
						'Le chercheur demanda que avait-il conservé de cette époque.',
						'Le chercheur demanda si il avait conservé de cette époque.',
						'Le chercheur demanda ce qui avait conservé de cette époque.'
					],
					hardQ: 'Quels deux indices prouvent que l’énonciateur de « Nous entendions... mon père cachait... » est un témoin ?',
					hardAns: 'L’usage des marques de la 1re personne (Nous, mon) et le récit sensoriel d’une expérience vécue',
					hardWrong: [
						'L’emploi exclusif du passif pronominal',
						'L’absence de tout sentiment personnel',
						'La citation d’archives du XIVe siècle'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع جدول تحويل أدوات الاستفهام والظروف الزمنية في الخطاب غير المباشر.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر التحويل الصحيح في الخطاب غير المباشر:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تحقق من توافق الأزمنة (Futur antérieur -> Conditionnel passé) والاستفهام الجزئي (ce que).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل النحوي المتقن:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصياغة السليمة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لمؤشرات الذاتية الضمنية وصفة الشاهد مقابل المؤرخ.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد التحليل التلفظي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez soigneusement ces activités de langue et d’énonciation (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: chosen.modPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.modCols }),
					{
						type: 'text',
						content: `2. Transposez les phrases suivantes au discours indirect :\n${chosen.speechPrompts.map((s) => s.q).join('\n')}`,
						answer: chosen.speechPrompts.map((s) => s.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.dilPrompt,
						answer: chosen.dilAnswer,
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
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر تحويل Futur antérieur إلى Conditionnel passé عند فعل قول ماضٍ.',
					'ميّز بين الاستفهام عن الفاعل (ce qui) والاستفهام عن المفعول (ce que).',
					'في الخطاب غير المباشر الحر تغيب « que » والمزدوجتان وتبقى علامات الانفعال (! / ?) مع ضمير الغائب.'
				],
				solutionStepsAr: [
					'تصنيف مؤشرات التمظهر الصريح والضمني (1.5 نقطة).',
					'التحويل الدقيق إلى الخطاب غير المباشر (2 نقطتان).',
					'تحليل الخطاب غير المباشر الحر أو صفة الكاتب (1 نقطة).',
					'إكمال الفقرة التحليلية الناقصة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (8 pts — Integration): CRC approfondi LE & Essai historique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t1_we_crc_histoire_le',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (8 نقاط — لغات أجنبية): التقرير النقدي المعمق لنص تاريخي أو مقال عن دور القلم والذاكرة',
		curriculumLessonId: 'fre_lesson_3as_le_t1_crc_bac_le',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) du texte historique « Al-Chihab et El-Bassaïr : la plume contre la censure coloniale » pour la revue culturelle de votre lycée.',
					sujetUnNotes: [
						'Accroche experte : nature du texte, titre, source, statut de l’auteur, axe thématique et double visée (informative et valorisante).',
						'Résumé analytique au présent (3e personne) : condenser par la nominalisation et des verbes nuancés (retrace, met en exergue, souligne) sans recopier.',
						'Critique approfondie (6 à 8 lignes) : évaluer le fond (portée mémorielle, rigueur des dates) ET la forme (guillemets ironiques, passif pronominal, discours indirect libre), puis proposer une nuance constructive.'
					],
					sujetDeuxPrompt:
						'« La plume de l’historien, du journaliste et du poète prépare et prolonge la liberté d’un peuple. » Rédigez un essai historique argumenté (180 à 220 mots) illustré par des figures algériennes (Cheikh Ben Badis, Cheikh El-Ibrahimi, Abou El-Kacem Saadallah ou Moufdi Zakaria).',
					modelAnswer:
						'Ce texte historique intitulé « Al-Chihab et El-Bassaïr : la plume contre la censure coloniale », extrait d’une étude d’historiographie algérienne, met en lumière le rôle décisif de la presse réformiste des Oulémas dans le but d’informer les lecteurs sur cette résistance culturelle et de rendre hommage à ses pionniers.\nTout d’abord, l’auteur rappelle qu’avant même le déclenchement de la lutte armée, Cheikh Abdelhamid Ben Badis fonda Al-Chihab à Constantine en 1925, suivi par la création d’El-Bassaïr sous l’impulsion de Cheikh Mohamed Bachir El-Ibrahimi. Il souligne que ces journaux connurent un large écho populaire en dépit de la fermeture des écoles arabes par l’administration coloniale. Par la suite, il met en exergue la ténacité des rédacteurs qui contournaient légalement chaque saisie pour maintenir vivant l’espoir national. Enfin, il conclut en affirmant que ce combat par le savoir prépara directement les consciences à l’indépendance.\nÀ mon sens, ce document se distingue par la rigueur de sa progression chronologique et la finesse de son écriture. L’auteur parvient en effet à allier précision historique et engagement mesuré grâce aux guillemets critiques, au passif pronominal et à une touche expressive de discours indirect libre. Toutefois, la citation d’un court extrait authentique d’El-Bassaïr aurait encore accru la force testimoniale de cet hommage.',
					rubricSummary: 'Accroche complète (1.5) + Résumé condensé et fidèle sans recopiage (2.5) + Critique approfondie fond et forme avec nuance (2) + Maîtrise de la langue soutenue (2).',
					easyQ: 'Combien de points vaut la Production écrite au BAC 3AS Langues Étrangères ?',
					easyAns: '8 points sur 20 (avec le coefficient 5)',
					easyWrong: ['7 points sur 20', '6 points sur 20', '5 points sur 20'],
					medQ: 'Quels deux plans d’analyse doivent figurer dans la partie critique d’un CRC de niveau BAC LE ?',
					medAns: 'Le fond (valeur documentaire et portée) ET la forme (style, énonciation, procédés d’écriture)',
					medWrong: [
						'Uniquement la recopie du titre et de la date',
						'Seulement une opinion affective sans justification',
						'Une liste de définitions de dictionnaire'
					],
					hardQ: 'Pourquoi la critique modèle évoque-t-elle les guillemets critiques et le discours indirect libre ?',
					hardAns: 'Parce que citer des procédés stylistiques précis du texte prouve une lecture experte digne d’un 8/8 en Langues Étrangères',
					hardWrong: [
						'Pour allonger artificiellement le résumé',
						'Parce que le texte ne contient aucune date',
						'Pour contredire le rôle de la presse réformiste'
					]
				},
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) du texte intitulé « Tlemcen et Béjaïa : carrefours rayonnants du savoir médiéval ».',
					sujetUnNotes: [
						'Accroche complète : genre historique, titre, source, thème (rayonnement scientifique du XIVe siècle) et visée valorisante.',
						'Résumé analytique : synthétiser le témoignage d’Ibn Battouta, l’œuvre d’Ibn Khaldoun à Béjaïa et Tiaret, et la portée actuelle pour les étudiants.',
						'Critique approfondie : apprécier la clarté pédagogique, la cohérence des repères spatio-temporels et formuler une ouverture constructive.'
					],
					sujetDeuxPrompt:
						'Comment la redécouverte de notre patrimoine scientifique et historique (Tlemcen, Béjaïa, Qalâa des Béni Hammad, Association des Oulémas) peut-elle inspirer la jeunesse algérienne d’aujourd’hui ? Rédigez une réflexion argumentée de 180 à 220 mots.',
					modelAnswer:
						'Un peuple qui méconnaît son histoire scientifique se prive d’une source précieuse de confiance et d’élan vers l’avenir. Dès lors, en quoi la redécouverte du patrimoine intellectuel algérien peut-elle inspirer concrètement la jeunesse contemporaine ?\nTout d’abord, revisiter le rayonnement médiéval de Tlemcen et de Béjaïa, où brillèrent des savants tels qu’Ibn Khaldoun et où s’arrêta le voyageur Ibn Battouta, rappelle que l’exigence scientifique et le goût de la recherche appartiennent pleinement à notre héritage. De même, l’action éducative de Cheikh Ben Badis et Cheikh El-Ibrahimi au XXe siècle prouve que le savoir a toujours été un levier d’émancipation morale et culturelle.\nCependant, cet héritage ne doit jamais devenir un simple motif de fierté passive. Certes, la mémoire des ancêtres honore une nation, mais elle n’a de véritable sens que si les étudiants d’aujourd’hui la prolongent par la rigueur, l’innovation et la maîtrise des langues et des sciences modernes.\nEn définitive, loin de nous enfermer dans la nostalgie, la connaissance lucide de notre passé scientifique trace une exigence d’excellence pour le présent : honorer nos savants d’hier, c’est bâtir avec discipline les réussites intellectuelles de demain.',
					rubricSummary: 'Introduction problématisée (1.5) + Développement argumenté illustré d’exemples historiques précis (3) + Synthèse ouverte (1.5) + Correction et richesse linguistique (2).',
					easyQ: 'Quel registre de langue est attendu dans une production de 8 points en BAC Langues Étrangères ?',
					easyAns: 'Un registre courant à soutenu, précis, fluide et exempt de familiarités',
					easyWrong: ['Un registre familier abrégé', 'Des phrases sans verbes', 'Un style télégraphique de 50 mots'],
					medQ: 'Pourquoi l’essai modèle avertit-il contre une « fierté passive » dans son troisième paragraphe ?',
					medAns: 'Pour introduire une nuance dialectique montrant que la mémoire doit stimuler l’effort présent',
					medWrong: [
						'Pour rejeter l’histoire de Tlemcen et Béjaïa',
						'Pour contredire toute utilité des études',
						'Pour résumer un texte hors sujet'
					],
					hardQ: 'Quelle est la fonction de la formule finale « honorer nos savants d’hier, c’est bâtir... les réussites de demain » ?',
					hardAns: 'Clore l’essai par un parallélisme antithétique mémorable qui relie fidélité patrimoniale et projet d’avenir',
					hardWrong: [
						'Introduire un nouvel argument sans lien',
						'Répéter la date de 1375',
						'Poser une question fermée de vocabulaire'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع المعايير الرسمية للإنتاج الكتابي في شعبة اللغات الأجنبية (8 نقاط).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة الصحيحة لـ BAC LE:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر ثنائية المضمون والشكل في التقرير النقدي والتدرج الجدلي في المقال.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحليل المنهجي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل كيف يرفع التحليل الأسلوبي الدقيق أو الصياغة البلاغية الختامية العلامة نحو 8/8.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد سر التميز الأسلوبي في BAC LE:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الأمثل هو: ${finalAnswer}.`
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
				trimesterId: 't1',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'خصص 85 دقيقة كاملة لهذا الجزء (8 نقاط × معامل 5 = 40 نقطة موزونة!).',
					'في التقرير النقدي، علّق على المضمون (التوثيق والأهمية) وعلى الشكل (الأساليب التلفظية والزمنية).',
					'في الإنتاج الحر، استهدف 180 إلى 220 كلمة في أربع فقرات متماسكة ولغة راقية.'
				],
				solutionStepsAr: [
					'تقديم متكامل أو مقدمة إشكالية راقية (1.5 نقطة).',
					'تلخيص تحليلي مكثف أو عرض حجاجي بأمثلة تاريخية دقيقة (2.5–3 نقاط).',
					'وقفة نقدية معمقة (مضمون + شكل) أو خاتمة تركيبية (1.5–2 نقطتان).',
					'سلامة اللغة، تنويع التراكيب والترقيم (2 نقطتان).'
				],
				finalAnswer
			};
		}
	}
];
