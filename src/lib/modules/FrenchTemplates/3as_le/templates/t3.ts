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
 * Parameterized Exam & Quiz Templates — Trimestre 3 : Projet 3 « L’Appel » & Synthèse avancée BAC LE (5 templates)
 * Roles: 2 comprehension (6 pts) + 2 text_exploration (6 pts) + 1 written_expression (8 pts)
 */
export const TEMPLATES_3AS_LE_T3: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (6 pts): Appel pour les oasis, les manuscrits anciens & l’anti-gaspillage
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t3_comp_appel_patrimoine_ecologie',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): نداء لحماية الواحات والمخطوطات الجزائرية ومحاربة التبذير',
		curriculumLessonId: 'fre_lesson_3as_le_t3_architecture_rhetorique_appel',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Appel pour la sauvegarde des manuscrits anciens d’Algérie',
					source: 'D’après un manifeste de chercheurs et d’archivistes algériens',
					paragraphs: [
						'Des bibliothèques familiales d’Adrar et de Ghardaïa aux fonds anciens de Tlemcen et de Constantine, l’Algérie recèle des milliers de manuscrits précieux portant sur la médecine, l’astronomie, le droit et la poésie. Hélas, l’humidité, les insectes et l’oubli menacent silencieusement de faire disparaître [[ces témoins irremplaçables]] avant qu’ils ne soient étudiés.',
						'Si nous restions indifférents devant cette lente érosion, des siècles entiers de pensée maghrébine et islamique s’effaceraient à jamais ! Il est impératif que les universités, les associations et les familles s’unissent : nous pouvons cataloguer, restaurer et numériser ces trésors afin que les chercheurs du monde entier y accèdent sans abîmer les originaux.',
						'Étudiants en langues et en histoire, mécènes et citoyens attachés à notre mémoire, [[nous]] vous conjurons d’agir sans tarder ! Soutenez les ateliers de restauration, sensibilisez les détenteurs de bibliothèques anciennes et unissons-nous pour que nos manuscrits traversent encore les siècles !'
					],
					glossary: [
						{ term: 'receler', meaning: 'contenir précieusement en son sein' },
						{ term: 'conjurer', meaning: 'supplier solennellement et avec insistance' }
					],
					tfItems: [
						{ q: 'Les manuscrits anciens d’Algérie couvrent des domaines variés comme la médecine, l’astronomie et le droit.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’humidité et l’oubli ne présentent aucune menace réelle pour ces manuscrits.', a: 'Faux', c: 'Ils menacent silencieusement de faire disparaître ces témoins irremplaçables.', mark: '0.5' },
						{ q: 'La numérisation permet aux chercheurs de consulter les textes sans abîmer les originaux.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’appel s’adresse notamment aux étudiants en langues et en histoire.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Analysez la nuance entre « nous vous conjurons » (exclusif) et « unissons-nous » (inclusif) au paragraphe 3.', a: '« nous » dans « nous vous conjurons » est exclusif (les auteurs de l’appel face aux lecteurs), tandis que « unissons-nous » est inclusif et rassemble auteurs et destinataires dans une même action.', mark: '0.75' },
						{ q: 'b) Quelle valeur exprime le système hypothétique « Si nous restions indifférents..., des siècles s’effaceraient ! » (§2) ?', a: 'Un avertissement solennel (Si + imparfait suivi du conditionnel présent) soulignant la conséquence dramatique d’une éventuelle passivité.', mark: '0.75' }
					],
					refPrompt: 'a) « ces témoins irremplaçables » (§1)   b) « nous » dans « nous vous conjurons » (§3)',
					refAnswer: 'a) « ces témoins irremplaçables » renvoie aux milliers de manuscrits anciens d’Algérie.   b) « nous » (exclusif) renvoie aux chercheurs et archivistes auteurs de l’appel.',
					synthPrompt: 'Selon vous, la numérisation seule suffit-elle à sauvegarder les manuscrits anciens ou faut-il aussi protéger les originaux ? Développez en quatre lignes.',
					synthAnswer: 'À mon sens, la numérisation est une avancée majeure mais ne remplace pas la conservation physique des originaux. En effet, si le fichier numérique démocratise l’accès au savoir, le manuscrit authentique demeure une preuve historique et artistique irremplaçable. Ainsi, l’alliance de la technologie et de la restauration artisanale est indispensable.',
					easyQ: 'Quelles quatre villes ou régions d’Algérie sont citées pour la richesse de leurs manuscrits (§1) ?',
					easyAns: 'Adrar, Ghardaïa, Tlemcen et Constantine',
					easyWrong: ['Timgad, Oran, Annaba et Batna', 'Sétif, Béjaïa, Jijel et Skikda', 'Alger, Blida, Tipaza et Médéa'],
					medQ: 'Pourquoi « nous » dans « nous vous conjurons » (§3) est-il qualifié de « nous exclusif » ?',
					medAns: 'Parce qu’il désigne uniquement les auteurs de l’appel qui s’adressent au « vous » des destinataires',
					medWrong: ['Parce qu’il inclut tous les lecteurs', 'Parce que c’est un pronom relatif', 'Parce qu’il marque le passé simple'],
					hardQ: 'Quelle est la fonction rhétorique du verbe « conjurons » au paragraphe 3 ?',
					hardAns: 'C’est un verbe performatif d’une grande solennité qui accomplit l’acte d’appel au moment même de l’énonciation',
					hardWrong: [
						'C’est un verbe descriptif du passé',
						'C’est une formule de concession neutre',
						'C’est un adverbe de doute'
					]
				},
				{
					title: 'Protégeons nos oasis et renforçons le Barrage Vert !',
					source: 'D’après une déclaration d’agronomes et de volontaires algériens',
					paragraphs: [
						'Aux portes du Sahara, la désertification progresse chaque décennie sous l’effet conjugué de la sécheresse, des vents de sable et du surpâturage. Des palmeraies séculaires qui nourrissaient jadis des générations entières voient [[leurs sources]] faiblir et leurs sols fertiles menacés d’ensablement.',
						'Laisserons-nous ce rempart écologique s’effondrer sous nos yeux ? Il faudrait que chacun mesure l’ampleur de l’enjeu : relancer le Barrage Vert et réhabiliter les systèmes traditionnels de partage de l’eau — comme les foggaras du Sud — ne relève pas de l’utopie, mais d’une science éprouvée et parfaitement réalisable.',
						'Ingénieurs, étudiants, agriculteurs et associations locales, nous vous exhortons à unir vos compétences ! Engagez-vous dans les campagnes de plantation d’espèces résistantes, ne nous résignons pas à la fatalité et défendons [[ce bouclier vivant]] : ensemble, nous assurerons la fertilité de nos terres.'
					],
					glossary: [
						{ term: 'foggara', meaning: 'système traditionnel saharien de captage et partage souterrain de l’eau' },
						{ term: 'utopie', meaning: 'projet idéal jugé irréalisable' }
					],
					tfItems: [
						{ q: 'La sécheresse, les vents de sable et le surpâturage accélèrent la désertification.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur juge que la relance du Barrage Vert et des foggaras est une utopie irréalisable.', a: 'Faux', c: 'Il affirme que cela ne relève pas de l’utopie mais d’une science éprouvée et réalisable.', mark: '0.5' },
						{ q: 'Les foggaras désignent un système traditionnel algérien de gestion de l’eau au Sahara.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’appel s’achève par un impératif négatif et une promesse au futur simple.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Quel procédé ouvre le paragraphe 2 (« Laisserons-nous ce rempart écologique s’effondrer... ? ») et quel est son but ?', a: 'Une question oratoire (rhétorique) avec métaphore (« rempart écologique ») destinée à éveiller la conscience et refuser la passivité.', mark: '0.75' },
						{ q: 'b) Relevez un impératif affirmatif et un impératif négatif dans le paragraphe 3.', a: 'Affirmatif : « Engagez-vous » ou « défendons ». Négatif : « ne nous résignons pas ».', mark: '0.75' }
					],
					refPrompt: 'a) « leurs sources » (§1)   b) « ce bouclier vivant » (§3)',
					refAnswer: 'a) « leurs sources » renvoie aux sources d’eau des palmeraies séculaires.   b) « ce bouclier vivant » renvoie au Barrage Vert et aux oasis qui protègent les sols contre le désert.',
					synthPrompt: 'Pourquoi associer savoir-faire traditionnel (comme les foggaras) et agronomie moderne est-il efficace face aux défis climatiques ? Répondez en quatre lignes.',
					synthAnswer: 'Associer les savoir-faire ancestraux et la science moderne offre des solutions durables et parfaitement adaptées au climat local. En effet, les foggaras témoignent d’une gestion sobre et équitable de l’eau que les capteurs modernes peuvent encore optimiser. Ainsi, tradition et innovation se complètent pour protéger nos oasis.',
					easyQ: 'Quel système traditionnel saharien de gestion de l’eau est valorisé au paragraphe 2 ?',
					easyAns: 'Les foggaras',
					easyWrong: ['Les aqueducs de Timgad', 'Les imprimeries d’Alger', 'Les ponts de Constantine'],
					medQ: 'Quelle nuance exprime « Il faudrait que chacun mesure... » (§2) ?',
					medAns: 'Un conditionnel d’atténuation suivi du subjonctif présent (« mesure »)',
					medWrong: ['Un passé simple historique', 'Un ordre brutal sans politesse', 'Une simple constatation passée'],
					hardQ: 'Pourquoi l’auteur qualifie-t-il le Barrage Vert de « bouclier vivant » (§3) ?',
					hardAns: 'C’est une métaphore persuasive qui montre que la végétation protège activement les terres agricoles contre l’avancée du désert',
					hardWrong: [
						'Parce qu’il s’agit d’un mur en béton armé',
						'Parce que le Barrage Vert n’existe pas',
						'Parce que c’est un événement du Moyen Âge'
					]
				},
				{
					title: 'Halte au gaspillage alimentaire : cultivons la gratitude et le partage !',
					source: 'D’après un appel citoyen d’associations de solidarité',
					paragraphs: [
						'Chaque année, des tonnes de pain et de denrées encore consommables finissent dans les bennes de nos villes, particulièrement durant les périodes de grande affluence dans les marchés. Ce gaspillage massif choque d’autant plus que des familles modestes peinent à couvrir [[leurs besoins essentiels]] et que la production alimentaire mobilise de précieuses ressources en eau.',
						'Il est urgent que nous rompions avec ces achats excessifs dictés par l’impulsion. Planifier les repas, acheter selon ses besoins réels et partager les surplus propres avec les voisins ou les associations caritatives constituent des gestes à la portée de chaque foyer : la sobriété n’est pas privation, elle est respect du travail des agriculteurs et reconnaissance envers les bienfaits reçus.',
						'Familles, commerçants et jeunes citoyens, nous vous invitons solennellement à faire de la mesure une fierté quotidienne ! Refusez le superflu, sensibilisez vos proches et que [[la solidarité responsable]] guide chacun de nos choix !'
					],
					glossary: [
						{ term: 'denrée', meaning: 'produit destiné à l’alimentation humaine' },
						{ term: 'sobriété', meaning: 'modération sage et refus de l’excès' }
					],
					tfItems: [
						{ q: 'Le texte dénonce le gaspillage important de pain et d’aliments encore consommables.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le gaspillage alimentaire n’a aucun lien avec la consommation des ressources en eau.', a: 'Faux', c: 'La production alimentaire mobilise de précieuses ressources en eau.', mark: '0.5' },
						{ q: 'Selon l’auteur, la sobriété signifie priver les familles de nourriture nécessaire.', a: 'Faux', c: 'La sobriété n’est pas privation ; elle est modération, respect des agriculteurs et gratitude.', mark: '0.5' },
						{ q: 'L’appel se termine par un souhait indépendant au subjonctif présent.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez trois gestes concrets proposés au paragraphe 2 pour réduire le gaspillage alimentaire.', a: 'Planifier les repas, acheter selon ses besoins réels et partager les surplus propres avec les voisins ou les associations.', mark: '0.75' },
						{ q: 'b) Identifiez la valeur du subjonctif dans « Il est urgent que nous rompions » (§2) et dans « que la solidarité responsable guide... » (§3).', a: 'Dans « rompions » : obligation/nécessité urgente ; dans « guide » : souhait vibrant et exhortation solennelle.', mark: '0.75' }
					],
					refPrompt: 'a) « leurs besoins essentiels » (§1)   b) « la solidarité responsable » (§3)',
					refAnswer: 'a) « leurs » renvoie aux familles modestes.   b) Le partage réfléchi et modéré envers autrui fondé sur le refus du gaspillage.',
					synthPrompt: 'Quelles actions de sensibilisation un club lycéen peut-il mener pour lutter contre le gaspillage du pain et de la nourriture ? Développez en quatre lignes.',
					synthAnswer: 'Un club lycéen peut mener une campagne d’affichage chiffrée dans la cantine et les couloirs afin de montrer l’ampleur réelle du pain jeté chaque semaine. En parallèle, les élèves peuvent diffuser de courtes vidéos éducatives valorisant la sobriété et le partage solidaire. Ces initiatives concrètes créent de bons réflexes durables.',
					easyQ: 'Quel aliment emblématique est cité en premier parmi les produits gaspillés (§1) ?',
					easyAns: 'Le pain',
					easyWrong: ['Le papier', 'Le bois des forêts', 'Les manuscrits'],
					medQ: 'Pourquoi « rompions » est-il conjugué au subjonctif présent au paragraphe 2 ?',
					medAns: 'Parce qu’il est régi par la tournure d’urgence « Il est urgent que »',
					medWrong: ['Parce qu’il suit « Même si »', 'Parce qu’il exprime un fait passé', 'Parce qu’il est à l’impératif'],
					hardQ: 'Quelle valeur exprime la proposition indépendante « que la solidarité responsable guide chacun de nos choix ! » (§3) ?',
					hardAns: 'Un souhait solennel et une exhortation au subjonctif présent',
					hardWrong: [
						'Un doute scientifique',
						'Une concession hypothétique',
						'Une narration au passé simple'
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
					questionText: `Appel BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع الفروق الدقيقة بين nous exclusif/inclusif، و conditionnel d’atténuation، و subjonctif.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النحوي أو التلفظي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل الوظيفة البلاغية للأفعال الإنجازية والاستعارة وصيغة التمني بالمنصوب.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Rhétorique BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الوظيفة البلاغية الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement cet appel puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. La visée communicative de ce texte est de :',
								options: [
									'Sensibiliser à une urgence collective et exhorter à une action concrète',
									'Raconter un épisode historique du XIVe siècle',
									'Comparer deux manuels scolaires sans engagement'
								],
								correct: 'Sensibiliser à une urgence collective et exhorter à une action concrète',
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
				trimesterId: 't3',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الانتقال البلاغي في النداء: التشخيص المقلق، ضرورة وإمكانية الحل، ثم الاستنهاض الصريح.',
					'ميّز بدقة بين nous exclusif (المرسلون) و nous inclusif (المرسلون + المخاطبون).',
					'في سؤال التفكير النقدي، اكتب 4 إلى 5 أسطر تجمع بين زاويتين تحليليتين.'
				],
				solutionStepsAr: [
					'تحديد الغاية التواصلية التحريضية (0.5 نقطة).',
					'التثبت من الصواب والخطأ مع التعليل (2 نقطتان).',
					'تحليل الصيغ والأدوات البلاغية للنداء (1.5 نقطة).',
					'فك الإحالة وتحرير فقرة التفكير النقدي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (6 pts): Appel au soutien scolaire bénévole & éthique numérique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t3_comp_appel_jeunesse_solidarite',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (6 نقاط — لغات أجنبية): نداء لتطوع الطلبة في الدعم المدرسي وأخلاقيات الفضاء الرقمي',
		curriculumLessonId: 'fre_lesson_3as_le_t3_implication_destinataire',
		defaultPoints: 6,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Étudiants et lycéens, offrons quelques heures au soutien scolaire bénévole !',
					source: 'D’après un appel d’un réseau universitaire d’entraide algérien',
					paragraphs: [
						'Dans de nombreux quartiers et communes rurales, des collégiens motivés rencontrent des difficultés durables en langues et en méthodologie, faute d’un accompagnement régulier après la classe. Trop souvent, [[ce retard accumulé]] décourage des élèves pourtant brillants et compromet leurs chances de réussite.',
						'Nous savons tous qu’une explication patiente donnée par un aîné peut transformer la confiance d’un jeune apprenant. Il faudrait que les bibliothèques communales, les associations et les étudiants s’organisent pour ouvrir des ateliers gratuits chaque fin de semaine : si chacun consacrait deux heures seulement à transmettre ce qu’il maîtrise, des milliers d’élèves retrouveraient le goût d’apprendre.',
						'Chers étudiants et futurs bacheliers, nous vous appelons à rejoindre cette chaîne de générosité ! Partagez votre savoir, ne gardez pas vos compétences pour vous seuls et construisons ensemble [[cette école de la solidarité]] : en aidant les plus jeunes à réussir, nous grandissons nous-mêmes !'
					],
					glossary: [
						{ term: 'compromettre', meaning: 'mettre en danger, risquer de faire échouer' },
						{ term: 'chaîne de générosité', meaning: 'élan collectif et continu d’entraide' }
					],
					tfItems: [
						{ q: 'Le texte souligne que certains collégiens souffrent d’un manque d’accompagnement après la classe.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, deux heures hebdomadaires de bénévolat seraient totalement insuffisantes pour aider.', a: 'Faux', c: 'Si chacun consacrait deux heures seulement, des milliers d’élèves retrouveraient le goût d’apprendre.', mark: '0.5' },
						{ q: 'L’appel propose d’organiser des ateliers gratuits dans les bibliothèques communales et associations.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur conclut que le bénévolat éducatif enrichit aussi celui qui transmet son savoir.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez la tournure d’atténuation et le système hypothétique utilisés dans le paragraphe 2.', a: 'Tournure d’atténuation : « Il faudrait que... » (+ subjonctif « s’organisent »). Hypothèse : « si chacun consacrait... des milliers retrouveraient... » (Si + imparfait suivi du conditionnel présent).', mark: '0.75' },
						{ q: 'b) Comment l’auteur implique-t-il les destinataires dans le paragraphe 3 ?', a: 'Par le vocatif (« Chers étudiants et futurs bacheliers »), le verbe performatif « appelons », les impératifs (« Partagez », « ne gardez pas », « construisons ») et le « nous inclusif ».', mark: '0.75' }
					],
					refPrompt: 'a) « ce retard accumulé » (§1)   b) « cette école de la solidarité » (§3)',
					refAnswer: 'a) « ce retard accumulé » renvoie aux difficultés durables rencontrées par des collégiens faute d’accompagnement.   b) « cette école de la solidarité » renvoie aux ateliers bénévoles de soutien scolaire.',
					synthPrompt: 'Partagez-vous l’idée qu’enseigner ou aider un plus jeune fait aussi progresser celui qui explique ? Justifiez en quatre lignes.',
					synthAnswer: 'Je partage entièrement cette conviction dans la mesure où expliquer clairement une règle à autrui oblige à la maîtriser soi-même en profondeur. En effet, répondre aux questions d’un collégien consolide notre propre méthode et développe patience et sens des responsabilités. Ainsi, le partage du savoir profite toujours aux deux partenaires.',
					easyQ: 'Combien d’heures par semaine l’appel suggère-t-il de consacrer au soutien scolaire bénévole (§2) ?',
					easyAns: 'Deux heures seulement',
					easyWrong: ['Vingt heures par semaine', 'Aucune heure avant trente ans', 'Dix heures par jour'],
					medQ: 'Quel temps suit « si » dans « si chacun consacrait deux heures..., des milliers retrouveraient... » ?',
					medAns: 'L’imparfait (consacrait), suivi du conditionnel présent (retrouveraient)',
					medWrong: ['Le conditionnel présent après si', 'Le futur simple après si', 'Le passé simple'],
					hardQ: 'Quelle est la valeur du pronom « nous » dans la dernière phrase (« construisons ensemble... nous grandissons nous-mêmes ») ?',
					hardAns: 'Un « nous inclusif » associant l’auteur et les jeunes bénévoles dans un bénéfice moral partagé',
					hardWrong: [
						'Un « nous exclusif » excluant les lycéens',
						'Un pronom impersonnel neutre',
						'Un pronom complément d’objet'
					]
				},
				{
					title: 'Pour un espace numérique respectueux : choisissons la véracité et la courtoisie !',
					source: 'D’après une charte citoyenne de la jeunesse algérienne',
					paragraphs: [
						'Les réseaux numériques constituent désormais la première place publique où se rencontrent les jeunes générations. Pourtant, la propagation rapide de rumeurs non vérifiées, les propos blessants cachés derrière l’anonymat et le manque de respect dans les commentaires dégradent chaque jour la qualité de [[cet espace partagé]].',
						'Nous ne saurions accepter que la facilité d’un clic fasse oublier les règles élémentaires de politesse et d’honnêteté. Avant de relayer une nouvelle ou de réagir à une opinion, il faut que chaque internaute prenne quelques secondes pour vérifier la source et peser la portée de ses mots : un clavier n’annule jamais notre responsabilité morale.',
						'Jeunes internautes, créateurs de contenu et éducateurs, nous vous invitons à devenir des modèles de civisme numérique ! Vérifiez avant de partager, refusez la médisance et cultivons [[une parole digne et constructive]] : ensemble, nous ferons d’Internet un véritable lieu d’intelligence et de respect.'
					],
					glossary: [
						{ term: 'anonymat', meaning: 'fait de cacher son identité réelle derrière un pseudonyme' },
						{ term: 'médisance', meaning: 'propos malveillants qui portent atteinte à autrui' }
					],
					tfItems: [
						{ q: 'L’auteur dénonce la diffusion de rumeurs non vérifiées et les propos blessants en ligne.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon le texte, l’usage d’un clavier supprime toute responsabilité morale.', a: 'Faux', c: 'Un clavier n’annule jamais notre responsabilité morale.', mark: '0.5' },
						{ q: 'L’appel recommande de vérifier la source d’une information avant de la partager.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les créateurs de contenu et les jeunes internautes figurent parmi les destinataires de l’appel.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Expliquez la formule « un clavier n’annule jamais notre responsabilité morale » (§2).', a: 'Même derrière un écran ou un pseudonyme, chaque personne reste moralement responsable de l’honnêteté et du respect contenus dans ses écrits.', mark: '0.75' },
						{ q: 'b) Relevez dans le paragraphe 3 le verbe performatif, deux impératifs et le verbe au futur de promesse.', a: 'Performatif : « invitons » ; Impératifs : « Vérifiez », « refusez », « cultivons » (deux au choix) ; Futur de promesse : « ferons ».', mark: '0.75' }
					],
					refPrompt: 'a) « cet espace partagé » (§1)   b) « une parole digne et constructive » (§3)',
					refAnswer: 'a) « cet espace partagé » renvoie aux réseaux numériques (première place publique des jeunes).   b) Des échanges en ligne fondés sur la vérité, la courtoisie et le respect mutuel.',
					synthPrompt: 'Selon vous, quelles deux règles simples devraient guider tout lycéen sur les réseaux sociaux ? Justifiez en quatre lignes.',
					synthAnswer: 'Tout d’abord, un lycéen responsable doit systématiquement vérifier la fiabilité d’une source avant de relayer une nouvelle afin de ne pas alimenter les rumeurs. Ensuite, il doit garder en ligne la même courtoisie qu’en face-à-face, car le respect d’autrui honore d’abord celui qui s’exprime. Ainsi, les échanges numériques deviennent enrichissants et sereins.',
					easyQ: 'Quel réflexe essentiel l’appel recommande-t-il avant de partager une information (§2-§3) ?',
					easyAns: 'Vérifier la fiabilité de la source et peser ses mots',
					easyWrong: ['Réagir sous le coup de la colère', 'Cacher son nom pour critiquer', 'Partager le plus vite possible sans lire'],
					medQ: 'Pourquoi « prenne » est-il au subjonctif présent dans « il faut que chaque internaute prenne quelques secondes » (§2) ?',
					medAns: 'Parce qu’il suit la locution d’obligation « il faut que »',
					medWrong: ['Parce que c’est un passé simple', 'Parce que c’est un futur simple', 'Parce qu’il suit « même si »'],
					hardQ: 'Quelle est la valeur stylistique de « Nous ne saurions accepter que... » au début du paragraphe 2 ?',
					hardAns: 'Un conditionnel soutenu remplaçant « nous ne pouvons pas », marquant un refus moral ferme et élégant',
					hardWrong: [
						'Un doute sur l’utilité de la politesse',
						'Une habitude du passé',
						'Une simple description neutre'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى النص للتثبت من المعلومة الصريحة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Appel BAC LE (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد التوافق الشرطي مع Si والمنصوب بعد Il faut que.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue BAC LE (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النحوي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفسير الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل القيمة الأسلوبية الراقية لضمير nous inclusif أو صيغة ne saurions.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Style BAC LE (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج القيمة الأسلوبية الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture analytique',
				points: 6,
				instruction: 'Lisez attentivement cet appel citoyen puis répondez aux questions (6 points — BAC LE) :',
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
								header: '1. Ce document appartient au genre de :',
								options: ['L’Appel (texte exhortatif engagé)', 'La chronique historique ancienne', 'La notice scientifique pure'],
								correct: 'L’Appel (texte exhortatif engagé)',
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
						content: `4. Indiquez le référent exact des termes soulignés :\n${chosen.refPrompt}`,
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
				trimesterId: 't3',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الصيغ الإقناعية الدقيقة: الشرط التحذيري، التخفيف الشرطي (Il faudrait)، وصيغة الأمر بـ nous inclusif.',
					'علّل إجابات Faux بالعودة المباشرة إلى معطيات النص.',
					'حرر فقرة التفكير النقدي في 4 أسطر متماسكة بلغة سليمة وراقية.'
				],
				solutionStepsAr: [
					'تحديد نوع النص التحريضي (0.5 نقطة).',
					'إجابات الصواب والخطأ مع التعليل (2 نقطتان).',
					'تحليل الأدوات اللغوية والإشراكية للنداء (1.5 نقطة).',
					'فك الإحالة وتحرير فقرة التفكير (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Architecture de l’Appel, subjonctif/conditionnel & impératif négatif
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t3_exp_appel_rhetorique_modes',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'conjugaison_temps',
		titleAr: 'البناء اللغوي (6 نقاط — لغات أجنبية): الهندسة البلاغية للنداء، المنصوب والشرطي والأمر المنفي',
		curriculumLessonId: 'fre_lesson_3as_le_t3_performatifs_subjonctif_conditionnel',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez ces phrases selon les trois parties de l’Appel : Les manuscrits s’abîment chaque année - Nous devons et pouvons les numériser - Étudiants, conjurons l’oubli et unissons-nous !',
					classCols: [
						{ header: 'Expositive (Constat)', items: ['Les manuscrits s’abîment chaque année'], mark: '0.5' },
						{ header: 'Argumentative (Nécessité)', items: ['Nous devons et pouvons les numériser'], mark: '0.5' },
						{ header: 'Exhortative (Appel)', items: ['Étudiants, conjurons l’oubli et unissons-nous !'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'sauvegarder' }, nom: { value: 'sauvegarde', mark: '0.25' }, adjectif: { value: 'sauvegardé', mark: '0.25' } },
						{ verbe: { value: 'numériser', mark: '0.25' }, nom: { given: true, value: 'numérisation' }, adjectif: { value: 'numérique / numérisé', mark: '0.25' } },
						{ verbe: { value: 'responsabiliser', mark: '0.25' }, nom: { value: 'responsabilité', mark: '0.25' }, adjectif: { given: true, value: 'responsable' } }
					],
					transforms: [
						{
							q: 'a) Mettez à l’impératif négatif (1re pers. plur.) : « Résignons-nous face à l’ensablement des oasis ! »',
							a: 'a) Ne nous résignons pas face à l’ensablement des oasis !'
						},
						{
							q: 'b) Conjuguez correctement (Hypothèse / Conditionnel) : « Si chaque foyer (réduire) son gaspillage, nos ressources (suffire) durablement. »',
							a: 'b) Si chaque foyer réduisait son gaspillage, nos ressources suffiraient durablement. (Ou : Si chaque foyer réduit..., nos ressources suffiront...)'
						}
					],
					nuancePrompt: '4. Distinguez la valeur du pronom « nous » dans : « Nous vous exhortons à participer : protégeons notre patrimoine commun ! »',
					nuanceAnswer: '« Nous » dans « Nous vous exhortons » = nous exclusif (les auteurs) ; « protégeons / notre » = nous inclusif (auteurs et destinataires réunis).',
					easyQ: 'Quel nom correspond au verbe « sauvegarder » ?',
					easyAns: 'la sauvegarde',
					easyWrong: ['la sauvegardation', 'le sauvegardement', 'la sauvegardance'],
					medQ: 'Transformez à l’impératif négatif : « Résignons-nous face à la fatalité ! »',
					medAns: 'Ne nous résignons pas face à la fatalité !',
					medWrong: [
						'Ne résignons-nous pas face à la fatalité !',
						'Nous ne résignons pas face à la fatalité !',
						'Ne vous résignons pas face à la fatalité !'
					],
					hardQ: 'Complétez le système hypothétique d’alerte : « Si nous .......... nos archives, ce patrimoine .......... à jamais. »',
					hardAns: 'négligions / disparaîtrait',
					hardWrong: ['négligerions / disparaîtrait', 'négligeons / disparaîtrait', 'négligions / disparaît']
				},
				{
					classPrompt: '1. Classez ces expressions selon leur valeur modale : Il faut que chacun agisse - Il faudrait réagir - Que la solidarité triomphe ! - Nous devrions aider - Avant qu’il ne soit trop tard - Au cas où l’eau manquerait.',
					classCols: [
						{ header: 'Subjonctif (Urgence / Souhait)', items: ['Il faut que chacun agisse', 'Que la solidarité triomphe !', 'Avant qu’il ne soit trop tard'], mark: '0.75' },
						{ header: 'Conditionnel (Conseil / Hypothèse)', items: ['Il faudrait réagir', 'Nous devrions aider', 'Au cas où l’eau manquerait'], mark: '0.75' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'conjurer' }, nom: { value: 'conjuration / appel', mark: '0.25' }, adjectif: { value: 'conjuré', mark: '0.25' } },
						{ verbe: { value: 'reboiser', mark: '0.25' }, nom: { given: true, value: 'reboisement' }, adjectif: { value: 'reboisé', mark: '0.25' } },
						{ verbe: { value: 'partager', mark: '0.25' }, nom: { value: 'partage', mark: '0.25' }, adjectif: { given: true, value: 'partagé' } }
					],
					transforms: [
						{
							q: 'a) Mettez à l’impératif négatif (2e pers. sing.) : « Décourage-toi devant la première difficulté ! »',
							a: 'a) Ne te décourage pas devant la première difficulté !'
						},
						{
							q: 'b) Transformez en souhait indépendant au subjonctif : « Nous souhaitons que les jeunes s’engagent avec fierté. »',
							a: 'b) Que les jeunes s’engagent avec fierté !'
						}
					],
					nuancePrompt: '4. Dans laquelle de ces deux phrases « inviter » est-il véritablement performatif ? Justifiez.\n1) « Hier, le club a invité les étudiants. »   2) « Nous vous invitons dès aujourd’hui à agir. »',
					nuanceAnswer: 'Phrase 2 : le verbe est conjugué au présent avec la 1re personne (nous) et accomplit l’acte d’appel en le prononçant.',
					easyQ: 'Quel mode emploie-t-on après la locution « avant que » ?',
					easyAns: 'Le subjonctif (avec « ne » explétif optionnel)',
					easyWrong: ['L’indicatif futur', 'Le passé simple', 'L’impératif'],
					medQ: 'Mettez à l’impératif négatif (2e pers. sing.) : « Décourage-toi ! »',
					medAns: 'Ne te décourage pas !',
					medWrong: ['Ne toi décourage pas !', 'Ne décourage-toi pas !', 'Ne te décourages pas !'],
					hardQ: 'Pourquoi « a invité » dans « Hier, le club a invité les élèves » n’est-il PAS performatif ?',
					hardAns: 'Parce qu’il est au passé et à la 3e personne : il rapporte un fait passé au lieu d’accomplir l’appel au présent',
					hardWrong: [
						'Parce que le verbe inviter n’existe pas dans les appels',
						'Parce qu’il manque une métaphore',
						'Parce que le sujet est au singulier'
					]
				},
				{
					classPrompt: '1. Classez ces tournures d’implication du destinataire : Étudiants d’Algérie ! - Veuillez soutenir ce projet - Laisserons-nous ce trésor disparaître ? - Chers compatriotes ! - Unissons nos efforts ! - Resterons-nous silencieux ?',
					classCols: [
						{ header: 'Vocatif', items: ['Étudiants d’Algérie !', 'Chers compatriotes !'], mark: '0.5' },
						{ header: 'Impératif', items: ['Veuillez soutenir ce projet', 'Unissons nos efforts !'], mark: '0.5' },
						{ header: 'Question oratoire', items: ['Laisserons-nous ce trésor disparaître ?', 'Resterons-nous silencieux ?'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'vérifier' }, nom: { value: 'vérification', mark: '0.25' }, adjectif: { value: 'vérifiable / vérifié', mark: '0.25' } },
						{ verbe: { value: 'sensibiliser', mark: '0.25' }, nom: { given: true, value: 'sensibilisation' }, adjectif: { value: 'sensible', mark: '0.25' } },
						{ verbe: { value: 'respecter', mark: '0.25' }, nom: { value: 'respect', mark: '0.25' }, adjectif: { given: true, value: 'respectueux' } }
					],
					transforms: [
						{
							q: 'a) Conjuguez au subjonctif présent : « Il est impératif que nous (prendre) soin de nos oasis et que nous (savoir) les défendre. »',
							a: 'a) Il est impératif que nous prenions soin de nos oasis et que nous sachions les défendre.'
						},
						{
							q: 'b) Complétez au conditionnel après « au cas où » : « Stockons l’eau de pluie au cas où la sécheresse (se prolonger). »',
							a: 'b) Stockons l’eau de pluie au cas où la sécheresse se prolongerait.'
						}
					],
					nuancePrompt: '4. Expliquez la différence de tonalité entre « Il faut que vous agissiez » et « Veuillez agir en faveur de cette noble cause ».',
					nuanceAnswer: '« Il faut que » marque une obligation directe et pressante ; « Veuillez » (impératif soutenu de vouloir) exprime une demande solennelle et très polie.',
					easyQ: 'Quelle est la forme polie et solennelle de l’impératif du verbe « vouloir » ?',
					easyAns: 'Veuillez (+ infinitif)',
					easyWrong: ['Voulez', 'Voulons', 'Voudriez'],
					medQ: 'Complétez au subjonctif présent : « Il est impératif que nous .......... soin de nos oasis et que nous .......... les défendre. »',
					medAns: 'prenions / sachions',
					medWrong: ['prenons / savons', 'prendrons / saurons', 'prenions / savions'],
					hardQ: 'Complétez avec le mode imposé par « au cas où » : « Stockons l’eau au cas où la sécheresse .......... . »',
					hardAns: 'se prolongerait (conditionnel présent)',
					hardWrong: ['se prolonge (indicatif)', 'se prolongera (futur)', 'se prolongeât sans contexte']
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قواعد المشروع الثالث في شعبة اللغات الأجنبية.' })),
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
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لموضع الضمير في الأمر المنفي (Ne te / Ne nous) ولتصريف Subjonctif présent.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل أو التصريف الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصياغة الصحيحة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر شرط الإنجازية (حاضر + متكلم) وتوافق الشرط (Si + imparfait -> conditionnel و au cas où + conditionnel).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد القاعدة المتقدمة الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités de langue et de rhétorique sur l’Appel (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Complétez le tableau de dérivation lexicale :'
					},
					buildFrenchWordFamilyTableBlock(chosen.wordRows),
					{
						type: 'text',
						content: `3. Effectuez les transformations grammaticales demandées :\n${chosen.transforms.map((t) => t.q).join('\n')}`,
						answer: chosen.transforms.map((t) => t.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.nuancePrompt,
						answer: chosen.nuanceAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'conjugaison_temps',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في الأمر الضمائري المنفي يعود الضمير قبل الفعل بلا شرطة: Ne nous résignons pas ! Ne te décourage pas !',
					'لا تضع Conditionnel أبداً بعد « Si » الشرطية، وضعه دائماً بعد « au cas où ».',
					'تذكر شرط الفعل الإنجازي: المتكلم (je/nous) + زمن المضارع.'
				],
				solutionStepsAr: [
					'تصنيف مكونات النداء أو الصيغ الفعلية (1.5 نقطة).',
					'إكمال جدول الاشتقاق (1.5 نقطة).',
					'إنجاز التحويلات الصرفية والنحوية (2 نقطتان).',
					'تحليل النبرة الأسلوبية أو قيمة الضمير (1 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Synthèse linguistique complète BAC LE (Projets 1, 2 & 3)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t3_exp_synthese_bac_le',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي الشامل (6 نقاط — مراجعة بكالوريا لغات أجنبية): المشاريع الثلاثة',
		curriculumLessonId: 'fre_lesson_3as_le_t3_entrainement_bac_le',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tablePrompt: '1. Classez ces traits caractéristiques selon le projet du BAC LE correspondant : passif pronominal et rétrospection - concession et anaphore - performatif et impératif inclusif - témoignage historique - raisonnement par l’absurde - constat alarmant.',
					tableCols: [
						{ header: 'Histoire (P1)', items: ['passif pronominal et rétrospection', 'témoignage historique'], mark: '0.5' },
						{ header: 'Débat (P2)', items: ['concession et anaphore', 'raisonnement par l’absurde'], mark: '0.5' },
						{ header: 'Appel (P3)', items: ['performatif et impératif inclusif', 'constat alarmant'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Accord du participe passé : « Les archives précieuses que les chercheurs avaient (découvrir) furent (numériser). »',
							a: 'a) Les archives précieuses que les chercheurs avaient découvertes furent numérisées.'
						},
						{
							q: 'b) Discours indirect : L’historien affirma : « Dès que nous aurons restauré ces manuscrits, tous les consulteront. »',
							a: 'b) L’historien affirma que dès qu’ils auraient restauré ces manuscrits, tous les consulteraient.'
						},
						{
							q: 'c) Concession (Quand bien même) : Même si la technologie évolue vite, le jugement moral reste indispensable.',
							a: 'c) Quand bien même la technologie évoluerait vite, le jugement moral resterait indispensable.'
						}
					],
					clozePrompt: '3. Complétez ce mémento de relecture BAC LE avec : conditionnel - subjonctif - antéposé - élision.\nLors des 20 minutes de relecture, vérifiez le (1) .......... après « bien que » et « avant que », le (2) .......... après « quand bien même », l’accord du participe passé avec un COD (3) .......... et l’(4) .......... dans « s’ils ».',
					clozeAnswer: '1) subjonctif   2) conditionnel   3) antéposé   4) élision',
					easyQ: 'Quel projet du BAC LE combine « performatif », « impératif inclusif » et « constat alarmant » ?',
					easyAns: 'Le Projet 3 (L’Appel)',
					easyWrong: ['Le Projet 1 (Textes d’histoire)', 'Le Projet 2 (Débat d’idées)', 'Aucun projet du programme'],
					medQ: 'Accordez correctement les deux participes passés : « Les archives précieuses que les chercheurs avaient .......... furent .......... . »',
					medAns: 'découvertes / numérisées',
					medWrong: ['découvert / numérisées', 'découverts / numérisés', 'découvertes / numérisé'],
					hardQ: 'Choisissez la transformation sans faute avec « Quand bien même » :',
					hardAns: 'Quand bien même la technologie évoluerait vite, le jugement moral resterait indispensable.',
					hardWrong: [
						'Quand bien même la technologie évolue vite, le jugement moral reste indispensable.',
						'Quand bien même la technologie évoluera vite, le jugement moral resterait indispensable.',
						'Quand bien même que la technologie évoluerait vite, le jugement moral reste indispensable.'
					]
				},
				{
					tablePrompt: '1. Associez chaque conjonction au mode verbal exact : avant que - après que - quoique - alors que - au cas où - pour que.',
					tableCols: [
						{ header: 'Subjonctif', items: ['avant que', 'quoique', 'pour que'], mark: '0.5' },
						{ header: 'Indicatif', items: ['après que', 'alors que'], mark: '0.5' },
						{ header: 'Conditionnel', items: ['au cas où'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Passif pronominal : « La véritable culture est construite par la patience et la lecture. » (Sans complément d’agent « par » : avec la patience)',
							a: 'a) La véritable culture se construit avec la patience et la lecture.'
						},
						{
							q: 'b) Impératif négatif (1re pers. plur.) : « Il ne faut pas que nous nous laissions distraire par les rumeurs. »',
							a: 'b) Ne nous laissons pas distraire par les rumeurs !'
						},
						{
							q: 'c) Pronom relatif composé : « La préservation des oasis est une cause (à cette cause) toute la jeunesse doit s’attacher. »',
							a: 'c) La préservation des oasis est une cause à laquelle toute la jeunesse doit s’attacher.'
						}
					],
					clozePrompt: '3. Complétez ce bilan de gestion du BAC LE avec : coefficient - production - relecture - synthèse.\nAvec un (1) .......... de 5 et une durée de 03 h 30, il faut équilibrer le temps entre la compréhension (12 pts dont la question de (2) .......... ), la (3) .......... écrite (8 pts) et vingt minutes de (4) .......... finale.',
					clozeAnswer: '1) coefficient   2) synthèse   3) production   4) relecture',
					easyQ: 'Quel mode verbal exige rigoureusement la conjonction « après que » en français soutenu ?',
					easyAns: 'L’indicatif (contrairement à « avant que » qui exige le subjonctif)',
					easyWrong: ['Le subjonctif obligatoire', 'L’impératif présent', 'L’infinitif seul'],
					medQ: 'Complétez avec le pronom relatif composé exact : « La préservation des oasis est une cause .......... toute la jeunesse doit s’attacher. »',
					medAns: 'à laquelle',
					medWrong: ['auquel', 'dont', 'duquel'],
					hardQ: 'Transformez sans erreur à l’impératif négatif : « Il ne faut pas que nous nous laissions distraire par les rumeurs. »',
					hardAns: 'Ne nous laissons pas distraire par les rumeurs !',
					hardWrong: [
						'Ne laissons-nous pas distraire par les rumeurs !',
						'Nous ne laissons pas distraire par les rumeurs !',
						'Ne vous laissons pas distraire par les rumeurs !'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع القواعد التأسيسية للمشاريع الثلاثة في شعبة اللغات الأجنبية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح (مراجعة شاملة BAC LE):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من جنس كلمة archives (مؤنث جمع) ومن مطابقة à laquelle مع cause (مؤنث مفرد).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر المطابقة أو الضمير الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تحقق من توافق الصيغة الشرطية بعد Quand bien même أو بنية الأمر الضمائري المنفي.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحويل المتقدم السليم 100%:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل السليم هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Synthèse linguistique BAC LE',
				points: 6,
				instruction: 'Révision transversale complète des trois projets (6 points — BAC LE) :',
				content: [
					{
						type: 'text',
						content: chosen.tablePrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.tableCols }),
					{
						type: 'text',
						content: `2. Réalisez les trois exercices de maîtrise syntaxique suivants :\n${chosen.rewrites.map((r) => r.q).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.a).join('\n'),
						mark: '3'
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
				trimesterId: 't3',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر الفارق الدقيق: avant que (+ subjonctif) مقابل après que (+ indicatif).',
					'انتبه إلى أن كلمة archives مؤنث جمع دائماً (découvertes / numérisées).',
					'بعد Quand bien même نضع Conditionnel في الشطرين.'
				],
				solutionStepsAr: [
					'تصنيف الخصائص أو الصيغ الفعلية (1.5 نقطة).',
					'إنجاز التحويلات والمطابقات الثلاث بدقة عالية (3 نقاط).',
					'إكمال فقرة المراجعة النهائية (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (8 pts — Integration): Appel solennel engagé ou CRC d’Appel BAC LE
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_le_t3_we_appel_bac_le',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (8 نقاط — لغات أجنبية): تحرير نداء بليغ ملتزم أو تقرير نقدي معمق لنداء',
		curriculumLessonId: 'fre_lesson_3as_le_t3_entrainement_bac_le',
		defaultPoints: 8,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) de l’appel intitulé « Appel pour la sauvegarde des manuscrits anciens d’Algérie » afin de sensibiliser les lecteurs du portail culturel de votre établissement.',
					sujetUnNotes: [
						'Accroche experte : genre exhortatif, titre, destinataires, source et visée de mobilisation.',
						'Résumé analytique au présent : condenser les trois mouvements (menaces sur les manuscrits d’Adrar, Ghardaïa, Tlemcen et Constantine ; urgence de cataloguer et numériser ; appel solennel final).',
						'Critique approfondie (6 à 8 lignes) : évaluer l’architecture rhétorique, l’emploi du système hypothétique d’alerte, la force du verbe « conjurons » et du passage au « nous inclusif », avec une proposition constructive.'
					],
					sujetDeuxPrompt:
						'Devant l’avancée de la désertification et la menace qui pèse sur les forêts et les oasis d’Algérie, rédigez un appel solennel engagé (180 à 220 mots) adressé à la jeunesse algérienne et aux associations locales pour les mobiliser autour d’un plan concret de reboisement et d’économie d’eau.',
					modelAnswer:
						'Appel solennel à la jeunesse algérienne : défendons nos forêts, nos oasis et nos sources !\nChers étudiants, lycéens et membres d’associations locales, un constat alarmant s’impose aujourd’hui du nord au sud de notre pays : la sécheresse prolongée, les incendies estivaux et le gaspillage quotidien fragilisent nos barrages, nos montagnes boisées et les palmeraies séculaires du Sahara.\nResterons-nous spectateurs alors que notre patrimoine naturel s’appauvrit sous nos yeux ? Si nous tardions davantage à réagir, des écosystèmes entiers mettraient des décennies à se reconstituer. Il est impératif que chaque commune et chaque établissement scolaire prenne sa part de responsabilité : nous devons et pouvons multiplier les campagnes automnales de reboisement, réhabiliter le Barrage Vert et adopter des réflexes sobres dans notre usage quotidien de l’eau.\nJeunes d’Algérie, nous vous conjurons de transformer votre conscience écologique en gestes visibles dès cette saison ! Engagez-vous dans les clubs volontaires, ne nous résignons pas à la fatalité et unissons nos forces pour que la verdure et la vie triomphent : ensemble, nous léguerons à nos enfants une Algérie fertile, propre et sereine !',
					rubricSummary: 'Architecture rhétorique tripartite (2) + Richesse des arguments et solutions réalistes (2) + Maîtrise des outils de l’Appel (question oratoire, Si+imparfait, performatif, subjonctif, impératif négatif et inclusif : 2) + Style soutenu et orthographe (2).',
					easyQ: 'Quel procédé rhétorique ouvre le deuxième paragraphe de l’appel modèle (« Resterons-nous spectateurs... ? ») ?',
					easyAns: 'Une question oratoire (rhétorique) qui refuse la passivité',
					easyWrong: ['Une narration au passé simple', 'Un tableau de conjugaison', 'Une définition de dictionnaire'],
					medQ: 'Quels deux modes verbaux renforcent la partie argumentative de cet appel modèle ?',
					medAns: 'Le conditionnel d’alerte (« mettraient » après Si + imparfait) et le subjonctif de nécessité (« prenne » après Il est impératif que)',
					medWrong: [
						'Le passé antérieur et le passé simple',
						'Uniquement l’infinitif sans verbes conjugués',
						'Le conditionnel passé de regret uniquement'
					],
					hardQ: 'Pourquoi la combinaison « nous vous conjurons... Engagez-vous... ne nous résignons pas... nous léguerons » est-elle digne d’un 8/8 en BAC LE ?',
					hardAns: 'Parce qu’elle enchaîne avec maîtrise performatif solennel, impératifs affirmatif et négatif, nous inclusif et futur de promesse',
					hardWrong: [
						'Parce qu’elle supprime tout verbe conjugué',
						'Parce qu’elle rend le texte purement neutre et objectif',
						'Parce qu’elle évite de s’adresser aux jeunes'
					]
				},
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique approfondi (180 à 220 mots) de l’appel intitulé « Pour un espace numérique respectueux : choisissons la véracité et la courtoisie ! ».',
					sujetUnNotes: [
						'Accroche complète : présenter la charte citoyenne, le thème (civisme numérique), les destinataires et la visée exhortative.',
						'Résumé analytique : reformuler le constat des dérives en ligne, le rappel de la responsabilité morale et l’invitation finale au respect et à la vérification.',
						'Critique approfondie : apprécier la pertinence actuelle du sujet, la force de la formule « un clavier n’annule jamais notre responsabilité morale » et suggérer une piste pratique.'
					],
					sujetDeuxPrompt:
						'De nombreux collégiens ont besoin d’aide méthodologique et linguistique après la classe. Rédigez un appel engagé et structuré en trois parties (180 à 220 mots) adressé aux lycéens et étudiants pour lancer des séances gratuites de soutien scolaire et de lecture dans votre commune.',
					modelAnswer:
						'Ce texte exhortatif intitulé « Pour un espace numérique respectueux : choisissons la véracité et la courtoisie ! », issu d’une charte citoyenne algérienne, s’adresse aux jeunes internautes, aux créateurs de contenu et aux éducateurs afin de les sensibiliser aux dérives des réseaux numériques et de les inciter à adopter une conduite responsable en ligne.\nDans un premier temps, les auteurs dressent un constat préoccupant en dénonçant la circulation rapide des rumeurs, l’agressivité abritée derrière l’anonymat et le recul de la politesse dans les commentaires. Ensuite, ils rappellent avec fermeté que la médiation d’un écran ne supprime en rien la responsabilité morale : il convient donc de vérifier chaque source et de mesurer ses propos avant toute publication. Enfin, ils exhortent les internautes à rejeter la médisance et à promouvoir des échanges dignes afin de faire d’Internet un lieu de respect et d’intelligence.\nÀ mon sens, cet appel touche un enjeu brûlant pour notre génération avec une grande clarté rhétorique. La formule frappante sur le clavier et la responsabilité morale, alliée au passage harmonieux du « vous » au « nous inclusif », accroît nettement sa force de conviction. Toutefois, l’ajout de quelques conseils pratiques pour identifier une source fiable aurait rendu ce texte encore plus opérationnel.',
					rubricSummary: 'Accroche experte (1.5) + Résumé fidèle et condensé des 3 étapes (2.5) + Critique approfondie fond et forme avec suggestion constructive (2) + Maîtrise linguistique soutenue (2).',
					easyQ: 'Dans le compte rendu critique d’un appel, quelle est la fonction principale du deuxième paragraphe ?',
					easyAns: 'Reformuler objectivement au présent les trois mouvements de l’appel sans recopier',
					easyWrong: [
						'Rédiger un nouvel appel personnel à l’impératif',
						'Donner une note chiffrée sans explication',
						'Recopier mot à mot la fin du texte'
					],
					medQ: 'Quel élément stylistique du texte source est pertinemment commenté dans la critique modèle ?',
					medAns: 'La formule sur le clavier et la responsabilité morale ainsi que le passage du « vous » au « nous inclusif »',
					medWrong: [
						'Le nombre exact de virgules',
						'Une date du XVIIIe siècle',
						'L’absence de tout verbe'
					],
					hardQ: 'Comment la dernière phrase du compte rendu modèle clôt-elle la critique de façon constructive ?',
					hardAns: 'En proposant un ajout concret (des critères pratiques de vérification d’une source) qui rendrait l’appel encore plus opérationnel',
					hardWrong: [
						'En rejetant l’importance de la courtoisie en ligne',
						'En répétant exactement le titre du texte',
						'En abandonnant la partie critique'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع البنية البلاغية للنداء ومنهجية التقرير النقدي في BAC LE.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب المنهجي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من الصيغ الفعلية للنداء أو العناصر الأسلوبية المقوَّمة في النقد.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'حدد التحليل الأسلوبي أو اللغوي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل مقومات التميز التي تمنح 8/8 في شعبة اللغات الأجنبية.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد سر الامتياز في الإنتاج الكتابي (8 نقاط):',
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
				trimesterId: 't3',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'في النداء (8 pts)، اجمع بين الصدمة التشخيصية، سؤال بلاغي، شرط تحذيري، فعل إنجازي، أمر مثبت/منفي، ووعد بالمستقبل.',
					'في التقرير النقدي (8 pts)، أبرز تحليل الهندسة البلاغية للنداء وختاماً بناءً.',
					'احتفظ بـ 20 دقيقة للمراجعة النهائية الدقيقة (المطابقة، الصيغ الفعلية، الترقيم).'
				],
				solutionStepsAr: [
					'إتقان الهندسة الثلاثية للنداء أو التقرير النقدي (2 نقطتان).',
					'عمق الأفكار وواقعية الحلول والالتزام بالموضوع (2 نقطتان).',
					'توظيف الأدوات البلاغية واللغوية الرفيعة (2 نقطتان).',
					'سلامة اللغة، الرقي الأسلوبي، والترقيم (2 نقطتان).'
				],
				finalAnswer
			};
		}
	}
];
