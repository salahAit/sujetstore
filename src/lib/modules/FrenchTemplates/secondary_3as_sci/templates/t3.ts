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

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T3
// Projet 3 : L'Appel (Forêts algériennes, eau, sécurité routière, solidarité civique) + Révision BAC
// 5 Modèles BAC : 2 Compréhension (7 pts) + 2 Fonctionnement langue (7 pts) + 1 Production écrite (6 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T3: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPRÉHENSION (7 pts) — Protection des forêts, Préservation de l'eau, Patrimoine naturel
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t3_comp_forets_eau',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): النداء لحماية الغابات الجزائرية والحفاظ على الماء والتراث الطبيعي',
		curriculumLessonId: 'fre_lesson_3as_sci_t3_structure_appel',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Appel pour la sauvegarde des forêts algériennes',
					source: 'Collectif citoyen « Algérie Verte et Solidaire », campagne estivale (2025)',
					paragraphs: [
						'Chaque été, des incendies dévastateurs ravagent des milliers d’hectares de forêts algériennes, de la Kabylie aux Aurès en passant par les monts de Chréa et d’El-Kala. Souvent provoqués par des gestes imprudents ou des déchets abandonnés sous la chaleur, [[ces feux]] détruisent la faune, appauvrissent les sols et menacent directement des villages entiers.',
						'Il est urgent de réagir, car la forêt constitue le poumon vital de notre pays. Nous devons comprendre qu’un arbre centenaire met des décennies à pousser et disparaît en quelques minutes. Pourtant, nous pouvons limiter ce fléau : la vigilance collective, le nettoyage préventif des sous-bois et le reboisement régulier permettent déjà de sauver des massifs entiers.',
						'Chers citoyens, chers jeunes lycéens, nous vous appelons aujourd’hui à devenir les gardiens actifs de notre patrimoine forestier ! N’allumez jamais de feu en forêt, ramassez systématiquement vos déchets et signalez immédiatement toute fumée suspecte aux secours. Mobilisons-nous dès cet automne pour planter des arbres afin que nos montagnes retrouvent leur verdure et que les générations futures héritent d’une Algérie verdoyante !'
					],
					glossary: [
						{ term: 'massifs', meaning: 'grands ensembles boisés ou montagneux' },
						{ term: 'reboisement', meaning: 'action de replanter des arbres sur un terrain déboisé' }
					],
					tfItems: [
						{ q: 'Les incendies de forêts en Algérie touchent uniquement les zones désertiques sans arbres.', a: 'Faux', c: 'Ils ravagent des milliers d’hectares de forêts, de la Kabylie aux Aurès, à Chréa et à El-Kala.', mark: '0.5' },
						{ q: 'Des gestes imprudents et des déchets abandonnés figurent parmi les causes des incendies.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’énonciateur pense que la situation est désespérée et qu’aucune action préventive n’est possible.', a: 'Faux', c: 'Il affirme que nous pouvons limiter ce fléau par la vigilance, le nettoyage et le reboisement.', mark: '0.5' },
						{ q: 'Le dernier paragraphe invite directement les citoyens et les lycéens à planter des arbres et à rester vigilants.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Associez chaque paragraphe du texte à la partie de l’Appel qui lui correspond :',
					tableCols: [
						{ header: 'Partie expositive', items: ['Paragraphe 1 (constat des incendies)'], mark: '0.5' },
						{ header: 'Partie argumentative', items: ['Paragraphe 2 (nécessité et possibilité d’agir)'], mark: '0.5' },
						{ header: 'Partie exhortative', items: ['Paragraphe 3 (appel direct et impératifs)'], mark: '0.5' }
					],
					whQ: '3. Répondez aux questions suivantes à partir du texte :\na) Qui parle dans ce texte (l’énonciateur) et à qui s’adresse-t-il (les destinataires) ?\nb) Relevez dans le paragraphe 3 un verbe performatif et deux verbes à l’impératif présent.',
					whA: '3. a) Énonciateur : le collectif citoyen « Algérie Verte et Solidaire » (Nous) | Destinataires : les citoyens et les jeunes lycéens (vous).\nb) Verbe performatif : « nous vous appelons » | Impératifs : « N’allumez », « ramassez », « signalez », « Mobilisons-nous » (deux au choix).',
					refQ: '4. a) À quoi renvoie l’expression soulignée « ces feux » (§1) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) « ces feux » renvoie aux incendies dévastateurs qui ravagent les forêts algériennes.\nb) Visée exhortative : alerter les citoyens sur le danger des incendies et les inciter à agir concrètement pour protéger et reboiser les forêts.',
					easyQ: 'Selon l’« Appel pour la sauvegarde des forêts algériennes », quels sont les destinataires nommés au paragraphe 3 ?',
					easyCorrect: 'Les citoyens et les jeunes lycéens',
					easyDistractors: [
						{ text: 'Uniquement les industriels étrangers', diagnosticFeedback: 'الفقرة الثالثة تخاطب صراحة: « Chers citoyens, chers jeunes lycéens ».' },
						{ text: 'Les historiens du XIXe siècle', diagnosticFeedback: 'النداء موجه للمواطنين وتلاميذ الثانويات اليوم.' },
						{ text: 'Les conducteurs de trains uniquement', diagnosticFeedback: 'لا علاقة للنص بقيادة القطارات.' }
					],
					medQ: 'À quelle partie officielle de l’Appel appartient le paragraphe 2 (« Il est urgent de réagir... Pourtant, nous pouvons limiter ce fléau... ») ?',
					medCorrect: 'La partie argumentative (nécessité et possibilité du changement)',
					medDistractors: [
						{ text: 'La partie expositive uniquement', diagnosticFeedback: 'القسم الإخباري كان في الفقرة الأولى لتشخيص المشكلة.' },
						{ text: 'La partie exhortative uniquement', diagnosticFeedback: 'القسم الندائي المباشر يرد في الفقرة الثالثة.' },
						{ text: 'Le titre introductif', diagnosticFeedback: 'إنها فقرة حجاجية كاملة وليست عنوانا.' }
					],
					hardQ: 'Dans le paragraphe 3, quel est le mode des verbes « retrouvent » et « héritent » après « afin que » ?',
					hardCorrect: 'Le subjonctif présent exprimant le but visé par la mobilisation',
					hardDistractors: [
						{ text: 'Le passé simple historique', diagnosticFeedback: 'النداء يتطلع للمستقبل ويستعمل « afin que + subjonctif ».' },
						{ text: 'L’imparfait descriptif', diagnosticFeedback: 'ليست نهايات الماضي الناقص.' },
						{ text: 'Le futur antérieur', diagnosticFeedback: 'بعد « afin que » نضع وجوبا الـ subjonctif présent.' }
					]
				},
				{
					title: 'Économisons l’eau potable : chaque goutte compte !',
					source: 'Association citoyenne « Ressources et Avenir », communiqué national (2025)',
					paragraphs: [
						'Face aux années de sécheresse successives et à la baisse du niveau de nombreux barrages, la ressource en eau potable devient de plus en plus précieuse en Algérie. Or, dans nos foyers et nos rues, [[ce bien vital]] subit encore un gaspillage quotidien considérable : robinets mal fermés, fuites négligées et lavages excessifs à grande eau.',
						'Il faut impérativement changer nos habitudes domestiques dès maintenant. L’eau n’est pas une richesse inépuisable : la préserver permet d’assurer l’alimentation des villes, le soutien à l’agriculture nationale et la santé publique. Par des gestes simples et peu coûteux, chaque famille peut réduire sa consommation quotidienne d’un tiers sans perdre en confort.',
						'Habitants de nos villes et de nos villages, nous vous exhortons à adopter une conduite responsable envers l’eau ! Réparez sans attendre les conduites défectueuses, fermez le robinet durant le brossage des dents et sensibilisez les enfants dès le plus jeune âge. Agissons ensemble aujourd’hui afin que nos barrages demeurent remplis et que notre pays ne connaisse jamais la soif demain !'
					],
					glossary: [
						{ term: 'inépuisable', meaning: 'qui ne peut jamais s’épuiser ni manquer' },
						{ term: 'défectueuses', meaning: 'abîmées, qui présentent une fuite ou un défaut' }
					],
					tfItems: [
						{ q: 'La sécheresse et le gaspillage domestique menacent les réserves d’eau potable.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’eau potable est présentée dans le texte comme une ressource infinie et inépuisable.', a: 'Faux', c: 'Le paragraphe 2 affirme au contraire que l’eau n’est pas une richesse inépuisable.', mark: '0.5' },
						{ q: 'Des gestes simples permettent à chaque famille de réduire nettement sa consommation d’eau.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’énonciateur s’adresse uniquement aux agriculteurs et exclut les habitants des villes.', a: 'Faux', c: 'Il s’adresse aux habitants de nos villes et de nos villages.', mark: '0.5' }
					],
					tableIntro: '2. Classez ces éléments dans le tableau : « robinets mal fermés », « réparer les conduites défectueuses », « fuites négligées », « fermer le robinet durant le brossage » :',
					tableCols: [
						{ header: 'Causes du gaspillage (§1)', items: ['robinets mal fermés', 'fuites négligées'], mark: '0.75' },
						{ header: 'Actions recommandées (§3)', items: ['réparer les conduites défectueuses', 'fermer le robinet durant le brossage'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Relevez dans le paragraphe 2 deux verbes ou expressions de modalité traduisant l’obligation et la possibilité.\nb) Quel verbe performatif lance officiellement l’appel dans le paragraphe 3 ?',
					whA: '3. a) Obligation : « Il faut impérativement changer » | Possibilité : « chaque famille peut réduire ».\nb) Le verbe performatif : « nous vous exhortons » (1re personne du pluriel au présent de l’indicatif).',
					refQ: '4. a) À quoi renvoie le substitut lexical « ce bien vital » (§1) ?\nb) Quelle est la valeur de l’impératif « Agissons ensemble » à la fin du texte ?',
					refA: '4. a) Il renvoie à la ressource en eau potable.\nb) C’est un impératif inclusif (1re personne du pluriel) qui associe l’auteur et les lecteurs dans une responsabilité solidaire commune.',
					easyQ: 'Dans l’appel « Économisons l’eau potable », de combien une famille peut-elle réduire sa consommation par des gestes simples ?',
					easyCorrect: 'D’un tiers sans perdre en confort',
					easyDistractors: [
						{ text: 'Elle ne peut rien réduire du tout', diagnosticFeedback: 'الفقرة الثانية تؤكد إمكانية تقليص الاستهلاك بالثلث بسلوكيات بسيطة.' },
						{ text: 'En fermant totalement tous les barrages', diagnosticFeedback: 'الهدف هو الحفاظ على مياه السدود لا إغلاقها.' },
						{ text: 'Uniquement en interdisant l’agriculture', diagnosticFeedback: 'الحفاظ على الماء يدعم الزراعة الوطنية.' }
					],
					medQ: 'Quel verbe performatif est utilisé dans le paragraphe 3 de l’appel sur l’eau potable ?',
					medCorrect: 'nous vous exhortons (à adopter)',
					medDistractors: [
						{ text: 'subit encore', diagnosticFeedback: 'هذا فعل خبري في الغائب في القسم الإخباري.' },
						{ text: 'demeurent remplis', diagnosticFeedback: 'فعل في الـ subjonctif بعد رابط الغاية.' },
						{ text: 'devient précieuse', diagnosticFeedback: 'فعل وصفي في الفقرة الأولى.' }
					],
					hardQ: 'Pourquoi l’énonciateur emploie-t-il successivement « vous » (« Réparez, fermez ») puis « nous » (« Agissons ensemble ») dans le paragraphe 3 ?',
					hardCorrect: 'Il responsabilise directement les destinataires puis s’inclut avec eux pour renforcer la solidarité collective',
					hardDistractors: [
						{ text: 'Par erreur de conjugaison involontaire', diagnosticFeedback: 'هذا تدرج تداولي مقصود ومشهور في نصوص النداء.' },
						{ text: 'Pour raconter un souvenir personnel passé', diagnosticFeedback: 'النص نداء تحسيسي لا سرد ماضٍ.' },
						{ text: 'Pour s’opposer aux habitants des villages', diagnosticFeedback: 'بالعكس، « Agissons ensemble » تشرك الجميع في هدف واحد.' }
					]
				},
				{
					title: 'Préservons la propreté de nos quartiers et notre patrimoine naturel',
					source: 'Club écologique des lycéens algériens, affiche de sensibilisation (2025)',
					paragraphs: [
						'Dans plusieurs villes côtières et sites magnifiques de notre pays, l’accumulation des sacs en plastique et des ordures ménagères défigure les plages, les parcs publics et les abords des cités. Si rien n’est fait, [[cette pollution visuelle et sanitaire]] menacera la beauté de lieux emblématiques, du Jardin d’Essai du Hamma jusqu’aux oasis et au Tassili.',
						'Nous devons prendre conscience que la propreté de notre cadre de vie reflète notre civisme et nos valeurs morales. Des quartiers propres protègent la santé des enfants, améliorent le bien-être de tous et attirent un tourisme respectueux. De nombreuses initiatives locales montrent qu’il suffit d’une organisation simple pour transformer durablement un espace dégradé.',
						'Chers camarades, chers habitants, nous vous invitons à rejoindre dès ce samedi les campagnes citoyennes de nettoyage et de tri des déchets ! Respectez les horaires de collecte, utilisez les poubelles publiques et encouragez vos voisins à faire de même. Ensemble, nous rendrons à nos quartiers et à nos sites naturels toute leur splendeur !'
					],
					glossary: [
						{ term: 'défigure', meaning: 'enlaidit gravement, abîme l’apparence d’un lieu' },
						{ term: 'civisme', meaning: 'dévouement et respect des règles de la vie collective' }
					],
					tfItems: [
						{ q: 'Les déchets plastiques menacent la beauté des plages, des parcs et des quartiers.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, la propreté du cadre de vie n’a aucun lien avec le civisme ni la santé.', a: 'Faux', c: 'Elle reflète notre civisme, nos valeurs morales et protège la santé des enfants.', mark: '0.5' },
						{ q: 'Des initiatives locales prouvent qu’il est possible de transformer un espace dégradé.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le texte se termine par une promesse optimiste exprimée au futur simple.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Relevez dans le texte deux mots du champ lexical de la « dégradation » (§1) et deux mots du champ lexical de l’« engagement citoyen » (§2-§3) :',
					tableCols: [
						{ header: 'Champ lexical de la dégradation', items: ['ordures ménagères', 'pollution / défigure'], mark: '0.75' },
						{ header: 'Champ lexical de l’engagement', items: ['civisme / initiatives locales', 'campagnes citoyennes / tri'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quels bienfaits apportent des quartiers propres selon le paragraphe 2 ?\nb) Quel temps est employé dans la dernière phrase (« nous rendrons ») et quel est son effet ?',
					whA: '3. a) Ils protègent la santé des enfants, améliorent le bien-être de tous et favorisent un tourisme respectueux.\nb) Le futur simple de l’indicatif : il projette un résultat positif et encourage les lecteurs à répondre à l’appel.',
					refQ: '4. a) À quoi renvoie « cette pollution visuelle et sanitaire » (§1) ?\nb) Identifiez l’énonciateur, les destinataires et le verbe performatif de cet appel.',
					refA: '4. a) À l’accumulation des sacs en plastique et des ordures ménagères dans les espaces publics.\nb) Énonciateur : le Club écologique des lycéens algériens | Destinataires : les camarades et les habitants | Verbe performatif : « nous vous invitons ».',
					easyQ: 'Dans cet appel pour la propreté des quartiers, qui est l’énonciateur ?',
					easyCorrect: 'Le Club écologique des lycéens algériens',
					easyDistractors: [
						{ text: 'Une agence internationale de voyages', diagnosticFeedback: 'المصدر يحدد المرسل بوضوح: Club écologique des lycéens algériens.' },
						{ text: 'Un historien du XVIe siècle', diagnosticFeedback: 'النص نداء بيئي معاصر.' },
						{ text: 'Une usine de sacs en plastique', diagnosticFeedback: 'النداء يحارب تراكم الأكياس البلاستيكية.' }
					],
					medQ: 'Quelle est la valeur du futur simple dans « Ensemble, nous rendrons à nos quartiers toute leur splendeur ! » ?',
					medCorrect: 'Projeter une promesse optimiste pour motiver les citoyens à agir',
					medDistractors: [
						{ text: 'Rappeler un événement ancien achevé', diagnosticFeedback: 'المستقبل البسيط يتجه نحو النتيجة المأمولة مستقبلا.' },
						{ text: 'Exprimer un doute sur la propreté', diagnosticFeedback: 'الجملة جازمة ومتفائلة.' },
						{ text: 'Décrire une loi coloniale', diagnosticFeedback: 'لا علاقة للنص بالفترة الاستعمارية.' }
					],
					hardQ: 'Dans le paragraphe 3 (« nous vous invitons à rejoindre... »), pourquoi le pronom « nous » est-il ici EXCLUSIF avant de devenir INCLUSIF dans « Ensemble, nous rendrons » ?',
					hardCorrect: 'Dans « nous vous invitons », « nous » désigne le club seul face à « vous » ; dans « Ensemble, nous rendrons », il réunit le club et les habitants',
					hardDistractors: [
						{ text: 'Parce que « nous » ne désigne jamais des personnes en français', diagnosticFeedback: '« nous » ضمير أشخاص متكلمين دائما.' },
						{ text: 'Parce que les habitants ne sont pas invités à participer', diagnosticFeedback: 'السكان مخاطَبون صراحة ومدعوون للمشاركة.' },
						{ text: 'Parce que le club s’exclut des campagnes de nettoyage', diagnosticFeedback: 'كلمة « Ensemble » تشرك النادي مع السكان.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Bonne réponse : ${qMap.ans}.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement cet Appel puis répondez aux questions de compréhension.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Répondez par « Vrai » ou « Faux » (en justifiant chaque réponse fausse) :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Un Appel s’organise en 3 parties : Expositive (problème), Argumentative (nécessité et possibilité), Exhortative (appel direct).',
					'Repérez l’énonciateur (souvent dans la source ou « Nous ») et le destinataire (apostrophe + « vous »).',
					'La visée d’un Appel est toujours « exhortative » : sensibiliser et inciter à agir.'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPRÉHENSION (7 pts) — Sécurité routière, Solidarité civique, Bénévolat jeunesse
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t3_comp_route_solidarite',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 ن): السلامة المرورية والتضامن المدني وتطوع الشباب',
		curriculumLessonId: 'fre_lesson_3as_sci_t3_coherence_engagement_visee',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Sécurité routière : sauvons des vies par la prudence !',
					source: 'Association nationale de prévention routière, appel citoyen (2025)',
					paragraphs: [
						'Chaque semaine, les accidents de la circulation endeuillent de nombreuses familles sur nos routes nationales et nos autoroutes. Dans la majorité des cas, [[ces drames évitables]] résultent d’erreurs humaines : excès de vitesse, dépassements dangereux, usage du téléphone au volant et manque de repos lors des longs trajets.',
						'Il faut impérativement mettre un terme à cette hécatombe silencieuse. La vie humaine est sacrée et aucune urgence ne justifie de mettre en péril sa sécurité ni celle des autres usagers. Nous pouvons réduire fortement le nombre de victimes si chaque conducteur accepte de respecter scrupuleusement le code de la route et d’entretenir régulièrement son véhicule.',
						'Automobilistes et piétons, nous vous conjurons de faire preuve de retenue et de responsabilité ! Ralentissez devant les écoles, attachez toujours votre ceinture de sécurité et renoncez définitivement au téléphone en conduisant. Soyons tous vigilants afin que la route redevienne un espace de paix et de sécurité pour nos familles !'
					],
					glossary: [
						{ term: 'hécatombe', meaning: 'très grand nombre de victimes dans un drame' },
						{ term: 'retenue', meaning: 'calme, maîtrise de soi et prudence' }
					],
					tfItems: [
						{ q: 'La majorité des accidents de la route sont causés par des erreurs humaines évitables.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’usage du téléphone au volant et l’excès de vitesse figurent parmi les causes dénoncées.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur considère que les conducteurs pressés ont le droit de dépasser dangereusement.', a: 'Faux', c: 'Aucune urgence ne justifie de mettre en péril sa sécurité ni celle des autres usagers.', mark: '0.5' },
						{ q: 'L’appel s’adresse à la fois aux automobilistes et aux piétons.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez dans le tableau deux comportements dangereux (§1) et deux gestes responsables (§3) :',
					tableCols: [
						{ header: 'Comportements dangereux (§1)', items: ['excès de vitesse', 'usage du téléphone au volant'], mark: '0.75' },
						{ header: 'Gestes de prudence (§3)', items: ['ralentir devant les écoles', 'attacher sa ceinture de sécurité'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quel argument moral essentiel avance l’auteur dans le paragraphe 2 ?\nb) Relevez le verbe performatif du paragraphe 3 et la préposition qui le suit.',
					whA: '3. a) La vie humaine est sacrée et aucune urgence ne justifie de mettre en danger sa sécurité ou celle d’autrui.\nb) Le verbe performatif : « nous vous conjurons de » (suivi de la préposition « de » + infinitif).',
					refQ: '4. a) À quoi renvoie « ces drames évitables » (§1) ?\nb) Quelle est la visée communicative de cet appel ?',
					refA: '4. a) Aux accidents de la circulation qui endeuillent les familles.\nb) Visée exhortative : sensibiliser les usagers de la route aux causes des accidents et les inciter à adopter une conduite prudente et responsable.',
					easyQ: 'Selon l’appel « Sécurité routière : sauvons des vies par la prudence ! », quelle est la principale cause des accidents évoquée au §1 ?',
					easyCorrect: 'Les erreurs humaines (vitesse, dépassements dangereux, téléphone, fatigue)',
					easyDistractors: [
						{ text: 'L’entretien régulier des véhicules', diagnosticFeedback: 'صيانة المركبة وسيلة وقاية في الفقرة الثانية وليست سببا للحوادث.' },
						{ text: 'Le ralentissement devant les écoles', diagnosticFeedback: 'التخفيف من السرعة أمام المدارس سلوك وقائي مطلوب.' },
						{ text: 'Le port de la ceinture de sécurité', diagnosticFeedback: 'ربط حزام الأمان إجراء سلامة أساسي.' }
					],
					medQ: 'Quel verbe performatif construit avec la préposition « de » apparaît dans le paragraphe 3 ?',
					medCorrect: 'nous vous conjurons de',
					medDistractors: [
						{ text: 'nous pouvons réduire', diagnosticFeedback: '« pouvoir » فعل إمكانية (modalité) وليس فعلا إنجازيا للنداء.' },
						{ text: 'il faut mettre', diagnosticFeedback: '« falloir » فعل إلزام (modalité) في القسم الحجاجي.' },
						{ text: 'résultent d’erreurs', diagnosticFeedback: 'فعل خبري في القسم الإخباري.' }
					],
					hardQ: 'Dans « Soyons tous vigilants afin que la route redevienne un espace de paix », quels sont les deux modes verbaux employés ?',
					hardCorrect: 'L’impératif présent (« Soyons ») suivi du subjonctif présent (« redevienne »)',
					hardDistractors: [
						{ text: 'Le futur simple suivi du passé simple', diagnosticFeedback: '« Soyons » أمر و « redevienne » subjonctif بعد « afin que ».' },
						{ text: 'L’imparfait suivi du conditionnel passé', diagnosticFeedback: 'لا يوجد ماضٍ ناقص ولا شرطي ماضٍ.' },
						{ text: 'Le présent de l’indicatif dans les deux verbes', diagnosticFeedback: 'الأول أمر من الفعل être والثاني subjonctif.' }
					]
				},
				{
					title: 'Appel à la solidarité hivernale envers les familles démunies',
					source: 'Association caritative locale « Mains Unies », campagne d’hiver (2025)',
					paragraphs: [
						'Avec l’arrivée des vagues de froid et des pluies intenses, plusieurs familles modestes, personnes âgées isolées et élèves des zones montagneuses affrontent des conditions de vie éprouvantes. Privés parfois de vêtements chauds, de couvertures ou de fournitures scolaires suffisantes, [[nos concitoyens vulnérables]] ont besoin de notre attention immédiate.',
						'Nous ne devons jamais rester indifférents face à la précarité de notre voisinage. La solidarité sincère représente le socle de notre fraternité et renforce la cohésion de toute la nation. En unissant nos dons, même modestes, nous pouvons apporter rapidement chaleur, réconfort et dignité à des centaines de foyers.',
						'Chers bienfaiteurs, chers jeunes volontaires, nous vous appelons à participer à la collecte solidaire organisée cette semaine dans nos maisons de jeunes ! Offrez des manteaux propres, des denrées alimentaires ou quelques heures de votre temps pour la distribution. Tendons la main avec générosité afin que chaque famille passe cet hiver dans la sérénité et l’espoir !'
					],
					glossary: [
						{ term: 'précarité', meaning: 'situation matérielle difficile et fragile' },
						{ term: 'denrées', meaning: 'produits alimentaires de première nécessité' }
					],
					tfItems: [
						{ q: 'Les vagues de froid rendent la vie difficile à des familles modestes et des personnes âgées isolées.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur estime que les petits dons modestes ne servent à rien.', a: 'Faux', c: 'En unissant nos dons, même modestes, nous pouvons apporter chaleur et dignité à des centaines de foyers.', mark: '0.5' },
						{ q: 'La collecte solidaire propose de donner des manteaux propres, des denrées ou du temps bénévole.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’appel est lancé par l’association « Mains Unies » durant la campagne d’hiver.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez dans le tableau les bénéficiaires de l’aide (§1) et les formes de contribution demandées (§3) :',
					tableCols: [
						{ header: 'Personnes à soutenir (§1)', items: ['familles modestes', 'personnes âgées isolées et élèves'], mark: '0.75' },
						{ header: 'Contributions demandées (§3)', items: ['manteaux propres et denrées', 'temps bénévole pour distribuer'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) Quel argument social l’association avance-t-elle au paragraphe 2 pour justifier la solidarité ?\nb) Relevez dans le texte deux verbes de modalité (obligation et possibilité).',
					whA: '3. a) La solidarité est le socle de notre fraternité, renforce la cohésion nationale et apporte chaleur et dignité aux foyers dans le besoin.\nb) Obligation : « Nous ne devons jamais rester » | Possibilité : « nous pouvons apporter ».',
					refQ: '4. a) À qui renvoie « nos concitoyens vulnérables » (§1) ?\nb) Relevez deux mots du champ lexical de la solidarité dans le texte.',
					refA: '4. a) Aux familles modestes, aux personnes âgées isolées et aux élèves des zones montagneuses.\nb) Exemples : « solidarité », « fraternité », « dons », « bienfaiteurs », « générosité », « tendre la main » (deux au choix).',
					easyQ: 'Dans l’appel à la solidarité hivernale, où est organisée la collecte solidaire mentionnée au §3 ?',
					easyCorrect: 'Dans les maisons de jeunes',
					easyDistractors: [
						{ text: 'Sur les plages estivales', diagnosticFeedback: 'النداء خاص بحملة الشتاء في دور الشباب.' },
						{ text: 'Dans les gares ferroviaires uniquement', diagnosticFeedback: 'ذكرت الفقرة الثالثة دور الشباب صراحة.' },
						{ text: 'Dans des hôtels touristiques', diagnosticFeedback: 'غير وارد في النص.' }
					],
					medQ: 'À quelle partie de l’Appel correspond le paragraphe 1 (« Avec l’arrivée des vagues de froid... ») ?',
					medCorrect: 'La partie expositive (constat d’une situation difficile nécessitant une aide)',
					medDistractors: [
						{ text: 'La partie exhortative (lancement direct de l’appel)', diagnosticFeedback: 'النداء المباشر يأتي في الفقرة الثالثة.' },
						{ text: 'La réfutation d’une thèse adverse', diagnosticFeedback: 'نحن في نص نداء لا في مناظرة أفكار.' },
						{ text: 'La signature finale', diagnosticFeedback: 'إنها الفقرة الأولى الافتتاحية.' }
					],
					hardQ: 'Dans « Tendons la main avec générosité afin que chaque famille passe cet hiver dans la sérénité », quel rapport logique introduit « afin que » ?',
					hardCorrect: 'Le but (suivi du subjonctif présent « passe » car les sujets sont différents)',
					hardDistractors: [
						{ text: 'La cause passée', diagnosticFeedback: '« afin que » رابط غاية وليس رابط سبب.' },
						{ text: 'La concession', diagnosticFeedback: 'الاستدراك التنازلي يكون بـ « bien que / quoique ».' },
						{ text: 'L’opposition', diagnosticFeedback: 'المعارضة تكون بـ « mais / tandis que ».' }
					]
				},
				{
					title: 'Jeunes bacheliers, engageons-nous pour le savoir utile et le bénévolat !',
					source: 'Réseau étudiant algérien « Savoir et Civisme », tribune annuelle (2025)',
					paragraphs: [
						'À l’approche des examens et de l’entrée à l’université, de nombreux jeunes passent des heures précieuses devant des distractions numériques stériles, au détriment de leurs études et de la vie associative. Peu à peu, [[cet isolement derrière les écrans]] affaiblit la curiosité intellectuelle et le sens du service collectif.',
						'Pourtant, la jeunesse représente la plus grande richesse de l’Algérie. Il faut que chaque futur bachelier mesure la portée de son potentiel : un étudiant sérieux, cultivé et engagé dans le bénévolat peut aider les plus jeunes par le soutien scolaire, animer les bibliothèques locales et bâtir des projets scientifiques utiles à la société.',
						'Chers lycéens de terminale, nous vous encourageons vivement à allier excellence scolaire et engagement civique ! Consacrez chaque semaine un moment à la lecture sérieuse et participez aux initiatives éducatives de votre quartier. Bâtissons dès aujourd’hui une jeunesse instruite, honnête et solidaire qui portera haut l’avenir de notre pays !'
					],
					glossary: [
						{ term: 'stériles', meaning: 'qui n’apportent aucun fruit ni bénéfice réel' },
						{ term: 'potentiel', meaning: 'ensemble des capacités et talents à développer' }
					],
					tfItems: [
						{ q: 'Le texte met en garde contre le temps excessif perdu devant des distractions numériques stériles.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, un lycéen engagé peut contribuer au soutien scolaire et aux bibliothèques locales.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur conseille aux élèves de terminale d’abandonner la lecture sérieuse.', a: 'Faux', c: 'Il les invite à consacrer chaque semaine un moment à la lecture sérieuse.', mark: '0.5' },
						{ q: 'Le verbe « portera » à la fin du texte projette une vision optimiste de l’avenir.', a: 'Vrai', mark: '0.5' }
					],
					tableIntro: '2. Classez ces éléments selon qu’ils appartiennent au constat négatif (§1) ou aux actions positives proposées (§2-§3) :',
					tableCols: [
						{ header: 'Constat négatif (§1)', items: ['distractions numériques stériles', 'isolement derrière les écrans'], mark: '0.75' },
						{ header: 'Actions positives (§2-§3)', items: ['soutien scolaire et bibliothèques', 'lecture sérieuse et civisme'], mark: '0.75' }
					],
					whQ: '3. Répondez aux questions suivantes :\na) À quel mode est conjugué le verbe « mesure » dans « Il faut que chaque futur bachelier mesure... » (§2) ? Justifiez.\nb) Relevez dans le paragraphe 3 le verbe performatif et les destinataires de l’appel.',
					whA: '3. a) Au subjonctif présent, car il est introduit par la tournure impersonnelle d’obligation « Il faut que ».\nb) Verbe performatif : « nous vous encourageons » | Destinataires : « Chers lycéens de terminale ».',
					refQ: '4. a) À quoi renvoie « cet isolement derrière les écrans » (§1) ?\nb) Quelle est la visée communicative de ce texte ?',
					refA: '4. a) Au fait que de nombreux jeunes passent des heures devant des distractions numériques au détriment des études et de la vie associative.\nb) Visée exhortative : inciter les lycéens de terminale à délaisser la passivité numérique pour s’engager dans la réussite scolaire et le bénévolat citoyen.',
					easyQ: 'Selon cet appel aux jeunes bacheliers, quelles deux qualités les lycéens sont-ils encouragés à allier ?',
					easyCorrect: 'L’excellence scolaire et l’engagement civique',
					easyDistractors: [
						{ text: 'La distraction numérique et l’isolement', diagnosticFeedback: 'النص يحذر من هذين السلوكين في الفقرة الأولى.' },
						{ text: 'L’indifférence et le retard scolaire', diagnosticFeedback: 'النص يدعو للجد والتفوق والعمل التطوعي.' },
						{ text: 'L’abandon des bibliothèques locales', diagnosticFeedback: 'الفقرة الثانية تشجع على تنشيط المكتبات المحلية.' }
					],
					medQ: 'Pourquoi le verbe « mesure » est-il au subjonctif présent dans « Il faut que chaque futur bachelier mesure » ?',
					medCorrect: 'Parce que la locution d’obligation « Il faut que » exige toujours le subjonctif',
					medDistractors: [
						{ text: 'Parce que c’est un ordre à l’impératif présent', diagnosticFeedback: 'الأمر لا يسبقه « Il faut que » ولا فاعل.' },
						{ text: 'Parce qu’il s’agit d’un fait historique de 1954', diagnosticFeedback: 'النص نداء حالي موجه لتلاميذ البكالوريا.' },
						{ text: 'Parce que la phrase exprime la cause passée', diagnosticFeedback: '« Il faut que » تعبر عن الضرورة والإلزام.' }
					],
					hardQ: 'Dans le paragraphe 3, quel est le rôle du pronom implicite « nous » dans « Bâtissons dès aujourd’hui une jeunesse instruite » ?',
					hardCorrect: 'Un « nous » inclusif qui réunit l’énonciateur et les lycéens dans un projet commun',
					hardDistractors: [
						{ text: 'Un « nous » exclusif qui écarte les lycéens du projet', diagnosticFeedback: 'الأمر بصيغة الجمع يشرك المتكلم والمخاطب معا.' },
						{ text: 'Un pronom de la 3e personne du pluriel', diagnosticFeedback: '« Bâtissons » أمر بصيغة المتكلم الجمع (1re personne du pluriel).' },
						{ text: 'Un pronom indéfini équivalent à « personne »', diagnosticFeedback: 'الضمير هنا يجمع الشباب في مبادرة جماعية.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}.`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Analyse du texte',
				points: 7,
				instruction: 'Lisez attentivement ce texte exhortatif puis répondez aux questions suivantes.',
				content: [
					buildFrenchPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Dites si les affirmations suivantes sont « Vrai » ou « Faux » (justifiez les réponses fausses) :' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Vérifiez toujours la construction des verbes performatifs : appeler/exhorter/inviter/encourager À vs conjurer/prier/demander DE.',
					'Distinguez bien « nous exclusif » (association seule face à vous) et « nous inclusif » (tous ensemble).',
					'Relevez les verbes de modalité (devoir, falloir, pouvoir) dans la partie argumentative (§2).'
				],
				solutionStepsAr: [
					`Vrai/Faux : ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. FONCTIONNEMENT DE LA LANGUE (7 pts) — Performatifs, Modalité, Impératif, Subjonctif, Futur
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t3_expl_performatifs_modes',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'conjugaison_temps',
		titleAr: 'البناء اللغوي (7 ن): الأفعال الإنجازية والإلزام وصيغ الأمر والنصب والمستقبل',
		curriculumLessonId: 'fre_lesson_3as_sci_t3_verbes_performatifs_modalite',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Classez les verbes suivants en deux groupes selon la préposition qui les suit devant un infinitif (à / de) :\n(exhorter - prier - appeler - conjurer - inviter - demander)',
					lexA: '1. Verbes suivis de « à » : exhorter, appeler, inviter | Verbes suivis de « de » : prier, conjurer, demander.',
					tableIntro: '2. Classez les expressions suivantes dans la partie de l’Appel correspondante : « Chaque été, les feux ravagent nos forêts », « Nous devons agir vite », « Citoyens, mobilisons-nous ! » :',
					tableCols: [
						{ header: 'Partie expositive', items: ['Chaque été, les feux ravagent nos forêts'], mark: '0.5' },
						{ header: 'Partie argumentative', items: ['Nous devons agir vite'], mark: '0.5' },
						{ header: 'Partie exhortative', items: ['Citoyens, mobilisons-nous !'], mark: '0.5' }
					],
					rewriteQ:
						'3. Effectuez les transformations demandées :\na) Reformulez avec le verbe performatif « Nous vous exhortons » : « Respectez le code de la route ! »\nb) Réécrivez avec « Il faut que » : « Les citoyens doivent économiser l’eau potable. »\nc) Reliez les deux phrases par un rapport de but (« afin que » ou « afin de » selon les sujets) : « Nous plantons des arbres. Nos montagnes retrouveront leur verdure. »',
					rewriteA:
						'3. a) Nous vous exhortons à respecter le code de la route.\nb) Il faut que les citoyens économisent l’eau potable.\nc) Nous plantons des arbres afin que nos montagnes retrouvent leur verdure. (Sujets différents : subjonctif présent.)',
					conjQ: '4. Conjuguez les verbes entre parenthèses aux modes et temps indiqués :\n« (Être, impératif 1re pl.) responsables afin que nos forêts (pouvoir, subjonctif présent) revivre ; ainsi nos enfants (profiter, futur simple) d’un pays vert. »',
					conjA: '4. Soyons (impératif) / puissent (subjonctif présent) / profiteront (futur simple).',
					gapQ: '5. Complétez cet extrait d’Appel : (appelons - faut - sauvons - devons)\nIl (1) ........ réagir devant la sécheresse : nous (2) ........ protéger chaque source. Chers citoyens, nous vous (3) ........ à éviter le gaspillage : (4) ........ ensemble notre eau potable !',
					gapA: '5. (1) faut | (2) devons | (3) appelons | (4) sauvons',
					easyQ: 'Quelle phrase est grammaticalement exacte avec le verbe performatif « exhorter » ?',
					easyCorrect: 'Nous vous exhortons à protéger nos forêts.',
					easyDistractors: [
						{ text: 'Nous vous exhortons de protéger nos forêts.', diagnosticFeedback: 'الفعل « exhorter » يتعدى بحرف الجر « à » لا « de ».' },
						{ text: 'Ils ont exhorté hier à protéger nos forêts.', diagnosticFeedback: 'للفعل الإنجازي نحتاج ضمير المتكلم والحاضر (Nous exhortons).' },
						{ text: 'Nous vous exhortons protégez nos forêts.', diagnosticFeedback: 'نحتاج حرف الجر « à » متبوعا بالمصدر « protéger ».' }
					],
					medQ: 'Réécrivez correctement avec « Il faut que » : « Chaque conducteur doit être vigilant. »',
					medCorrect: 'Il faut que chaque conducteur soit vigilant.',
					medDistractors: [
						{ text: 'Il faut que chaque conducteur est vigilant.', diagnosticFeedback: 'بعد « Il faut que » يجب تصريف « être » في الـ subjonctif: soit.' },
						{ text: 'Il faut que chaque conducteur sera vigilant.', diagnosticFeedback: 'لا نستعمل المستقبل بعد « Il faut que ».' },
						{ text: 'Il faut que chaque conducteur être vigilant.', diagnosticFeedback: 'مع وجود فاعل بعد « Il faut que » نصرف الفعل في الـ subjonctif.' }
					],
					hardQ: 'Conjuguez correctement les verbes entre parenthèses : « (Être, imp. 1re pl.) prudents afin que nos routes (devenir, subj.) plus sûres ! »',
					hardCorrect: 'Soyons prudents afin que nos routes deviennent plus sûres !',
					hardDistractors: [
						{ text: 'Nous soyons prudents afin que nos routes deviendront plus sûres !', diagnosticFeedback: 'لا نكتب الضمير أمام الأمر، وبعد « afin que » نضع الـ subjonctif لا المستقبل.' },
						{ text: 'Sommes prudents afin que nos routes deviennent plus sûres !', diagnosticFeedback: 'أمر الفعل « être » مع المتكلم الجمع هو « Soyons » لا « Sommes ».' },
						{ text: 'Soyons prudents afin que nos routes devenaient plus sûres !', diagnosticFeedback: 'الماضي الناقص لا يأتي بعد « afin que ».' }
					]
				},
				{
					lexQ: '1. Distinguez pour chaque phrase la valeur du verbe de modalité (obligation / possibilité) :\na) Nous devons nettoyer nos plages.   b) Ensemble, nous pouvons réduire les accidents.   c) Il faut réparer les fuites d’eau.   d) Chaque élève peut participer au reboisement.',
					lexA: '1. Obligation : phrases (a) et (c) | Possibilité : phrases (b) et (d).',
					tableIntro: '2. Classez ces formes verbales dans le tableau : « Protège ! », « Soyons ! », « qu’il fasse », « qu’ils sachent », « nous bâtirons », « ils verront » :',
					tableCols: [
						{ header: 'Impératif présent', items: ['Protège !', 'Soyons !'], mark: '0.5' },
						{ header: 'Subjonctif présent', items: ['qu’il fasse', 'qu’ils sachent'], mark: '0.5' },
						{ header: 'Futur simple', items: ['nous bâtirons', 'ils verront'], mark: '0.5' }
					],
					rewriteQ:
						'3. Effectuez les transformations suivantes :\na) Remplacez « devoir » par « falloir + infinitif » : « Nous devons trier les déchets ménagers. »\nb) Mettez à l’impératif présent (2e pers. singulier puis 1re pers. pluriel) : « Tu respectes le code de la route et tu sauves des vies. »\nc) Reliez par un rapport de but (même sujet) : « Les bénévoles organisent une collecte. Ils veulent aider les familles démunies. »',
					rewriteA:
						'3. a) Il faut trier les déchets ménagers.\nb) Respecte le code de la route et sauve des vies ! (2e sg, sans « s ») | Respectons le code de la route et sauvons des vies ! (1re pl.)\nc) Les bénévoles organisent une collecte afin d’aider (ou : pour aider) les familles démunies.',
					conjQ: '4. Complétez au subjonctif présent : « Il est indispensable que chacun (faire) preuve de civisme et (savoir) protéger la nature. »',
					conjA: '4. fasse / sache.',
					gapQ: '5. Complétez avec les bons mots : (subjonctif - infinitif - performatif - futur)\nDans l’Appel, un verbe (1) ........ se conjugue au présent avec « je » ou « nous ». Après « afin de », on emploie l’(2) ........ ; après « afin que », on utilise le (3) ........ . Le (4) ........ simple exprime l’espoir d’un avenir meilleur.',
					gapA: '5. (1) performatif | (2) infinitif | (3) subjonctif | (4) futur',
					easyQ: 'Mettez à l’impératif présent (2e personne du singulier) : « Tu plantes un arbre dans ton quartier. »',
					easyCorrect: 'Plante un arbre dans ton quartier !',
					easyDistractors: [
						{ text: 'Plantes un arbre dans ton quartier !', diagnosticFeedback: 'أفعال الفوج الأول (-er) تحذف حرف « s » في الأمر مع المفرد.' },
						{ text: 'Tu plante un arbre dans ton quartier !', diagnosticFeedback: 'في صيغة الأمر لا يُكتب الضمير الشخصي أبدا.' },
						{ text: 'Planter un arbre dans ton quartier !', diagnosticFeedback: 'المطلوب التصريف مع المفرد المخاطب وليس المصدر.' }
					],
					medQ: 'Reliez par un rapport de but : « Les bénévoles organisent une collecte. Ils veulent soutenir les familles modestes. »',
					medCorrect: 'Les bénévoles organisent une collecte afin de soutenir les familles modestes.',
					medDistractors: [
						{ text: 'Les bénévoles organisent une collecte afin qu’ils soutiennent les familles modestes.', diagnosticFeedback: 'عند اتحاد الفاعل في الجملتين نستعمل « afin de + infinitif » لا « afin que ».' },
						{ text: 'Les bénévoles organisent une collecte afin de ils soutiennent les familles modestes.', diagnosticFeedback: 'بعد « afin de » نضع المصدر مباشرة دون فاعل.' },
						{ text: 'Les bénévoles organisent une collecte à cause de soutenir les familles modestes.', diagnosticFeedback: '« à cause de » للسبب السلبي لا للغاية.' }
					],
					hardQ: 'Complétez au subjonctif présent : « Il est essentiel que chacun ........ preuve de civisme et ........ agir à temps. » (faire / savoir)',
					hardCorrect: 'fasse / sache',
					hardDistractors: [
						{ text: 'fait / sait', diagnosticFeedback: '« fait » و « sait » في الحاضر الإخباري وليسا في الـ subjonctif.' },
						{ text: 'fera / saura', diagnosticFeedback: 'لا يأتي المستقبل بعد « Il est essentiel que ».' },
						{ text: 'faisait / savait', diagnosticFeedback: 'الماضي الناقص غير صحيح هنا.' }
					]
				},
				{
					lexQ: '1. Pour chaque phrase, dites si le verbe « appeler » est employé comme verbe performatif (Oui / Non) et justifiez :\na) « Nous vous appelons à planter des arbres ce samedi. »\nb) « L’association a appelé les citoyens l’année dernière. »',
					lexA: '1. a) Oui : 1re personne du pluriel (Nous) au présent de l’indicatif (l’énoncé réalise l’appel).\nb) Non : 3e personne au passé composé (simple constat d’un fait passé).',
					tableIntro: '2. Classez les verbes suivants au subjonctif présent avec « Il faut que nous... » : être, avoir, faire, pouvoir, agir, protéger :',
					tableCols: [
						{ header: 'Irréguliers clés', items: ['soyons', 'ayons', 'fassions', 'puissions'], mark: '1' },
						{ header: 'Réguliers (1er / 2e gr.)', items: ['agissions', 'protégions'], mark: '0.5' }
					],
					rewriteQ:
						'3. Effectuez les réécritures demandées :\na) Passez de la tournure impersonnelle au verbe performatif (« Nous vous prions ») : « Il faut respecter les passages piétons. »\nb) Remplacez « Il faut + infinitif » par « Il faut que nous + subjonctif » : « Il faut avoir du courage et faire des efforts pour réussir. »\nc) Mettez les verbes au futur simple : « Si vous agissez aujourd’hui, nos villes (devenir) propres et nous (pouvoir) vivre sereinement. »',
					rewriteA:
						'3. a) Nous vous prions de respecter les passages piétons.\nb) Il faut que nous ayons du courage et que nous fassions des efforts pour réussir.\nc) deviendront / pourrons.',
					conjQ: '4. Conjuguez à l’impératif présent (2e personne du pluriel) : « (Avoir) confiance en vos capacités, (savoir) gérer votre temps et (être) honnêtes aux examens ! »',
					conjA: '4. Ayez / sachez / soyez.',
					gapQ: '5. Complétez cet appel aux lycéens : (Ayez - réussiront - puissions - invitons)\nChers élèves, nous vous (1) ........ à réviser régulièrement. (2) ........ confiance en votre travail honnête afin que nous (3) ........ tous célébrer votre succès : les candidats persévérants (4) ........ brillamment !',
					gapA: '5. (1) invitons | (2) Ayez | (3) puissions | (4) réussiront',
					easyQ: 'Quelle est la forme exacte de l’impératif présent du verbe « avoir » à la 2e personne du pluriel ?',
					easyCorrect: 'Ayez',
					easyDistractors: [
						{ text: 'Avez', diagnosticFeedback: '« Avez » في الحاضر الإخباري، أما الأمر الشاذ فهو « Ayez ».' },
						{ text: 'Vous ayez', diagnosticFeedback: 'لا نكتب الضمير الشخصي أمام فعل الأمر.' },
						{ text: 'Ayons', diagnosticFeedback: '« Ayons » هي صيغة المتكلم الجمع (1re pl.) لا المخاطب الجمع.' }
					],
					medQ: 'Réécrivez avec « Il faut que nous » : « Il faut avoir du courage et faire des efforts. »',
					medCorrect: 'Il faut que nous ayons du courage et que nous fassions des efforts.',
					medDistractors: [
						{ text: 'Il faut que nous avons du courage et faisons des efforts.', diagnosticFeedback: 'بعد « Il faut que » نصرف في الـ subjonctif: ayons / fassions.' },
						{ text: 'Il faut que nous aurons du courage et ferons des efforts.', diagnosticFeedback: 'المستقبل لا يأتي بعد « Il faut que ».' },
						{ text: 'Il faut que nous avions du courage et faisions des efforts.', diagnosticFeedback: '« avions » ماضٍ ناقص، أما الـ subjonctif فهو « ayons ».' }
					],
					hardQ: 'Complétez au futur simple : « Grâce à cet engagement, nos quartiers ........ propres et nous ........ en être fiers. » (devenir / pouvoir)',
					hardCorrect: 'deviendront / pourrons',
					hardDistractors: [
						{ text: 'deveniront / pouvoirons', diagnosticFeedback: 'الفعلان شاذان في المستقبل البسيط: deviendr- / pourr-.' },
						{ text: 'deviennent / pouvons', diagnosticFeedback: 'المطلوب المستقبل البسيط لا الحاضر.' },
						{ text: 'deviendraient / pourrions', diagnosticFeedback: 'هذه صيغة الشرطي الحاضر (conditionnel) لا المستقبل البسيط.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez les exercices suivants sur les verbes performatifs, la modalité et les modes de l’Appel.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: v.tableIntro },
					buildFrenchClassificationTableBlock({ columns: v.tableCols }),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.conjQ, answer: v.conjA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Un verbe performatif d’appel exige 1re personne (je/nous) + présent de l’indicatif.',
					'Mémorisez les impératifs irréguliers : sois/soyons/soyez, aie/ayons/ayez, sache/sachons/sachez.',
					'Afin de + infinitif (même sujet) ; afin que + subjonctif (sujets différents).'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.conjA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. FONCTIONNEMENT DE LA LANGUE (7 pts) — Cohérence, Engagement & Révision Générale BAC
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t3_expl_coherence_revision_bac',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (7 ن): الاتساق ومعجم الالتزام والمراجعة الشاملة لقواعد البكالوريا',
		curriculumLessonId: 'fre_lesson_3as_sci_t3_coherence_engagement_visee',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					lexQ: '1. Classez ces quatre mots dans deux champs lexicaux distincts (Alerte / Engagement) :\n(péril - bénévolat - pénurie - mobilisation)',
					lexA: '1. Alerte : péril, pénurie | Engagement : bénévolat, mobilisation.',
					wordRows: [
						{ verbe: { given: true, value: 'exhorter' }, nom: { value: 'exhortation', mark: '0.25' }, adjectif: { value: 'exhortatif', mark: '0.25' } },
						{ verbe: { value: 'sensibiliser', mark: '0.25' }, nom: { given: true, value: 'sensibilisation' }, adjectif: { value: 'sensible / sensibilisé', mark: '0.25' } },
						{ verbe: { value: 'protéger', mark: '0.25' }, nom: { value: 'protection', mark: '0.25' }, adjectif: { given: true, value: 'protecteur / protégé' } }
					],
					rewriteQ:
						'3. Révision générale BAC — Réécrivez chaque phrase selon la consigne (Projets 1, 2 et 3) :\na) (Voix passive) : « Les volontaires reboisent chaque année les collines incendiées. »\nb) (Concession avec « Bien que ») : « La campagne est exigeante, mais les jeunes répondent présents. »\nc) (Discours indirect) : Le responsable déclara aux lycéens : « Vous avez accompli un travail admirable hier. »',
					rewriteA:
						'3. a) Les collines incendiées sont reboisées chaque année par les volontaires.\nb) Bien que la campagne soit exigeante, les jeunes répondent présents.\nc) Le responsable déclara aux lycéens qu’ils avaient accompli un travail admirable la veille.',
					viseeQ: '4. Identifiez le projet (Histoire / Débat / Appel) et la visée communicative de chacune de ces deux phrases :\na) « Le 20 août 1956, le Congrès de la Soummam jette les bases institutionnelles de la Révolution. »\nb) « Citoyens, nous vous appelons à économiser l’eau dès aujourd’hui ! »',
					viseeA: '4. a) Projet 1 (Texte historique) : visée informative et commémorative.\nb) Projet 3 (L’Appel) : visée exhortative (inciter à agir concrètement).',
					gapQ: '5. Remettez en ordre logique (A, B, C) ces trois phrases pour former un Appel cohérent :\n(A) Citoyens, adoptons le tri sélectif dès demain !  (B) Chaque jour, des tonnes de plastique polluent nos villes.  (C) Il est donc nécessaire de réduire nos déchets pour protéger la santé publique.',
					gapA: '5. Ordre cohérent : (B) Expositive, puis (C) Argumentative, puis (A) Exhortative.',
					easyQ: 'Quel est l’ordre logique cohérent des phrases : (A) « Agissons maintenant ! » (B) « Les déchets menacent nos plages. » (C) « Nous devons réagir car la mer est vitale. » ?',
					easyCorrect: 'B (expositive), puis C (argumentative), puis A (exhortative)',
					easyDistractors: [
						{ text: 'A, puis B, puis C', diagnosticFeedback: 'النداء المباشر (A) يأتي ختاما بعد عرض المشكلة والحجاج.' },
						{ text: 'C, puis A, puis B', diagnosticFeedback: 'نبدأ دائما بتشخيص المشكلة في القسم الإخباري (B).' },
						{ text: 'B, puis A, puis C', diagnosticFeedback: 'القسم الحجاجي (C) يمهد للنداء المباشر (A).' }
					],
					medQ: 'Révision BAC (Voix passive) : « Les volontaires reboisent chaque année les collines incendiées. »',
					medCorrect: 'Les collines incendiées sont reboisées chaque année par les volontaires.',
					medDistractors: [
						{ text: 'Les collines incendiées sont reboisé chaque année par les volontaires.', diagnosticFeedback: 'نسيت مطابقة اسم المفعول مع الجمع المؤنث « collines » -> reboisées.' },
						{ text: 'Les collines incendiées furent reboisées chaque année par les volontaires.', diagnosticFeedback: 'الفعل الأصلي في الحاضر (reboisent) وليس في الماضي البسيط.' },
						{ text: 'Les collines incendiées ont été reboisées chaque année par les volontaires.', diagnosticFeedback: 'حافظ على زمن الحاضر: « sont reboisées ».' }
					],
					hardQ: 'Révision BAC (Discours indirect) : Le responsable déclara aux lycéens : « Vous avez accompli un travail admirable hier. »',
					hardCorrect: 'Le responsable déclara aux lycéens qu’ils avaient accompli un travail admirable la veille.',
					hardDistractors: [
						{ text: 'Le responsable déclara aux lycéens qu’ils ont accompli un travail admirable hier.', diagnosticFeedback: 'فعل القول في الماضي (déclara) لذا « avez accompli » تصبح « avaient accompli » و « hier » تصبح « la veille ».' },
						{ text: 'Le responsable déclara aux lycéens que vous aviez accompli un travail admirable la veille.', diagnosticFeedback: 'يتحول الضمير « vous » إلى « ils ».' },
						{ text: 'Le responsable déclara aux lycéens d’accomplir un travail admirable la veille.', diagnosticFeedback: 'الجملة خبرية وليست أمرية.' }
					]
				},
				{
					lexQ: '1. Expliquez la différence entre « nous » dans (a) et « nous » dans (b) :\na) « Nous, membres du club vert, vous invitons à la journée de reboisement. »\nb) « Ensemble, nous préserverons nos ressources hydriques ! »',
					lexA: '1. a) « Nous » exclusif : désigne uniquement les membres du club vert face aux destinataires (vous).\nb) « Nous » inclusif : associe l’énonciateur et les destinataires dans une même action.',
					wordRows: [
						{ verbe: { given: true, value: 'préserver' }, nom: { value: 'préservation', mark: '0.25' }, adjectif: { value: 'préservé', mark: '0.25' } },
						{ verbe: { value: 'mobiliser', mark: '0.25' }, nom: { given: true, value: 'mobilisation' }, adjectif: { value: 'mobilisé / mobilisateur', mark: '0.25' } },
						{ verbe: { value: 'responsabiliser', mark: '0.25' }, nom: { value: 'responsabilité', mark: '0.25' }, adjectif: { given: true, value: 'responsable' } }
					],
					rewriteQ:
						'3. Révision générale BAC — Réécrivez chaque phrase selon la consigne :\na) (Nominalisation) : « Les associations locales reboisent les zones touchées par les incendies. »\nb) (Cause en conséquence) : « Les routes deviennent dangereuses parce que certains conducteurs roulent trop vite. »\nc) (But avec « afin que ») : « Nous lançons cet appel. Chaque citoyen prendra conscience de son devoir. »',
					rewriteA:
						'3. a) Le reboisement des zones touchées par les incendies par les associations locales.\nb) Certains conducteurs roulent trop vite ; par conséquent (donc / si bien que), les routes deviennent dangereuses.\nc) Nous lançons cet appel afin que chaque citoyen prenne conscience de son devoir.',
					viseeQ: '4. Identifiez la visée communicative d’un texte qui expose deux thèses opposées sur l’usage des écrans puis conclut sur la nécessité d’un équilibre :',
					viseeA: '4. Projet 2 (Débat d’idées) : visée argumentative visant à confronter deux points de vue et à convaincre le lecteur d’adopter un usage équilibré.',
					gapQ: '5. Complétez avec les mots convenables : (cohérence - exhortative - argumentative - informative)\nAu BAC de 3AS, le texte historique a une visée (1) ........, le débat d’idées a une visée (2) ........, et l’Appel a une visée (3) ........ . Dans les trois projets, les substituts assurent la (4) ........ du texte.',
					gapA: '5. (1) informative | (2) argumentative | (3) exhortative | (4) cohérence',
					easyQ: 'Quel nom dérive correctement du verbe « préserver » ?',
					easyCorrect: 'La préservation',
					easyDistractors: [
						{ text: 'Le préservement', diagnosticFeedback: 'الاسم الصحيح هو « la préservation ».' },
						{ text: 'La préservance', diagnosticFeedback: 'لاحقة غير صحيحة للفعل « préserver ».' },
						{ text: 'Le préservage', diagnosticFeedback: 'كلمة غير موجودة في الفرنسية.' }
					],
					medQ: 'Reliez par un rapport de but (« afin que ») : « Nous lançons cet appel. Chaque citoyen prendra conscience de son devoir. »',
					medCorrect: 'Nous lançons cet appel afin que chaque citoyen prenne conscience de son devoir.',
					medDistractors: [
						{ text: 'Nous lançons cet appel afin que chaque citoyen prendra conscience de son devoir.', diagnosticFeedback: 'بعد « afin que » نصرف الفعل « prendre » في الـ subjonctif: prenne.' },
						{ text: 'Nous lançons cet appel afin que chaque citoyen prend conscience de son devoir.', diagnosticFeedback: '« prend » في الحاضر الإخباري، أما الـ subjonctif فهو « prenne ».' },
						{ text: 'Nous lançons cet appel afin de chaque citoyen prenne conscience de son devoir.', diagnosticFeedback: 'مع فاعلين مختلفين نستعمل « afin que » لا « afin de ».' }
					],
					hardQ: 'Transformez la cause en conséquence : « Les routes deviennent dangereuses parce que certains conducteurs roulent trop vite. »',
					hardCorrect: 'Certains conducteurs roulent trop vite ; par conséquent, les routes deviennent dangereuses.',
					hardDistractors: [
						{ text: 'Les routes deviennent dangereuses ; par conséquent, certains conducteurs roulent trop vite.', diagnosticFeedback: 'عكست السبب والنتيجة منطقيا!' },
						{ text: 'Bien que certains conducteurs roulent trop vite, les routes deviennent dangereuses.', diagnosticFeedback: 'هذا استدراك غير منطقي مع المعنى المطلوب.' },
						{ text: 'Certains conducteurs roulent trop vite car les routes deviennent dangereuses.', diagnosticFeedback: 'أبقيت رابط السبب وعكست المعنى.' }
					]
				},
				{
					lexQ: '1. Trouvez le nom de la même famille correspondant à chaque adjectif :\na) solidaire   b) prudent   c) urgent   d) citoyen',
					lexA: '1. a) solidarité | b) prudence | c) urgence | d) citoyenneté',
					wordRows: [
						{ verbe: { given: true, value: 'économiser' }, nom: { value: 'économie', mark: '0.25' }, adjectif: { value: 'économique / économe', mark: '0.25' } },
						{ verbe: { value: 'prévenir', mark: '0.25' }, nom: { given: true, value: 'prévention' }, adjectif: { value: 'préventif', mark: '0.25' } },
						{ verbe: { value: 'engager', mark: '0.25' }, nom: { value: 'engagement', mark: '0.25' }, adjectif: { given: true, value: 'engagé' } }
					],
					rewriteQ:
						'3. Révision générale BAC — Appliquez les consignes suivantes :\na) (Remplacez « Bien que » par « Malgré ») : « Bien que l’hiver soit rude, les bénévoles distribuent des aides. »\nb) (Voix active) : « Des campagnes de sensibilisation ont été lancées par les lycéens. »\nc) (Verbe performatif + infinitif) : « Participez nombreux au nettoyage du parc communal ! »',
					rewriteA:
						'3. a) Malgré la rudesse de l’hiver (ou : Malgré un hiver rude), les bénévoles distribuent des aides.\nb) Les lycéens ont lancé des campagnes de sensibilisation.\nc) Nous vous invitons (appelons / exhortons) à participer nombreux au nettoyage du parc communal.',
					viseeQ: '4. Pourquoi un texte d’Appel associe-t-il un champ lexical de la menace au §1 et un champ lexical de l’espoir au §3 ?',
					viseeA: '4. Pour provoquer d’abord une prise de conscience face à l’urgence du danger (§1), puis encourager et mobiliser le lecteur en lui montrant qu’une issue positive est possible (§3).',
					gapQ: '5. Complétez ce conseil de révision BAC : (objectivité - concession - impératif - reformulation)\nPour réussir le BAC de français, maîtrisez l’(1) ........ dans le texte historique, la (2) ........ dans le débat d’idées, l’(3) ........ dans l’Appel et la (4) ........ personnelle dans le compte rendu objectif.',
					gapA: '5. (1) objectivité | (2) concession | (3) impératif | (4) reformulation',
					easyQ: 'Quel nom dérive de l’adjectif « prudent » ?',
					easyCorrect: 'La prudence',
					easyDistractors: [
						{ text: 'La prudentialité', diagnosticFeedback: 'الاسم الصحيح هو « la prudence ».' },
						{ text: 'Le prudement', diagnosticFeedback: 'كلمة غير صحيحة.' },
						{ text: 'La prudentation', diagnosticFeedback: 'اللاحقة القياسية لصفات -ent هي -ence (prudent : prudence).' }
					],
					medQ: 'Révision BAC (Voix active) : « Des campagnes de sensibilisation ont été lancées par les lycéens. »',
					medCorrect: 'Les lycéens ont lancé des campagnes de sensibilisation.',
					medDistractors: [
						{ text: 'Les lycéens lancent des campagnes de sensibilisation.', diagnosticFeedback: 'المساعد « ont été » في الماضي المركب، فيبقى الفعل المعلوم في الماضي المركب (ont lancé).' },
						{ text: 'Les lycéens ont lancés des campagnes de sensibilisation.', diagnosticFeedback: 'مع المساعد « avoir » والمفعول به بعد الفعل لا يُطابق اسم المفعول: « ont lancé ».' },
						{ text: 'Les lycéens lancèrent des campagnes de sensibilisation.', diagnosticFeedback: 'هذا ماضٍ بسيط وليس ماضيا مركبا.' }
					],
					hardQ: 'Remplacez « Bien que » par « Malgré » : « Bien que l’hiver soit rude, les bénévoles distribuent des aides. »',
					hardCorrect: 'Malgré la rudesse de l’hiver, les bénévoles distribuent des aides.',
					hardDistractors: [
						{ text: 'Malgré que l’hiver soit rude, les bénévoles distribuent des aides.', diagnosticFeedback: 'نستعمل « Malgré + nom » ونتجنب « malgré que ».' },
						{ text: 'Malgré l’hiver soit rude, les bénévoles distribuent des aides.', diagnosticFeedback: '« Malgré » لا يتبعها فعل مصرف.' },
						{ text: 'Malgré de la rudesse l’hiver, les bénévoles distribuent des aides.', diagnosticFeedback: 'لا نضع « de » بعد « Malgré » مباشرة.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réponse exacte : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — Fonctionnement de la langue',
				points: 7,
				instruction: 'Traitez cette synthèse de révision BAC portant sur le lexique, les transformations et la cohérence.',
				content: [
					{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '1' },
					{ type: 'text', content: '2. Complétez le tableau de la famille de mots ci-dessous :' },
					buildFrenchWordFamilyTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.viseeQ, answer: v.viseeA, mark: '1' },
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Vérifiez toujours les 3 grandes familles de transformations BAC : passif, concession/but et discours indirect.',
					'Distinguez bien la visée de chaque projet : Histoire (informative), Débat (argumentative), Appel (exhortative).',
					'Avec « avoir », le participe passé ne s’accorde pas quand le COD est placé après le verbe.'
				],
				solutionStepsAr: [v.lexA, v.rewriteA, v.viseeA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. PRODUCTION ÉCRITE (6 pts) — Sujet 1 Compte Rendu d'un Appel / Sujet 2 Rédiger un Appel
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_sci_t3_written_appel_bac',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'production_ecrite',
		titleAr: 'التعبير الكتابي (6 ن): التقرير الموضوعي لنص نداء أو تحرير نداء كامل للبكالوريا',
		curriculumLessonId: 'fre_lesson_3as_sci_t3_production_ecrite_bac',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif d’un Appel) :',
					sujetUnPrompt:
						'Faites le compte rendu objectif (environ 100 à 120 mots) d’un texte exhortatif intitulé « Appel pour la sauvegarde des forêts algériennes » publié par le collectif « Algérie Verte et Solidaire » (2025), qui paraîtra dans le bulletin environnemental de votre lycée.',
					sujetUnNotes: [
						'Introduction : nature (texte exhortatif / appel), titre, énonciateur, date, destinataires et problème posé.',
						'Développement (3e personne, au présent) : résumer le constat des incendies, la nécessité et la possibilité de protéger les forêts, puis rapporter les actions auxquelles l’auteur exhorte les citoyens.',
						'Ne jamais recopier les impératifs directs ; utiliser « l’auteur appelle / exhorte à... ».',
						'Conclure sur la visée exhortative sans ajouter d’opinion personnelle.'
					],
					sujetDeuxPrompt:
						'Face au gaspillage croissant de l’eau potable dans votre quartier, votre club scientifique de lycée décide de lancer une campagne de sensibilisation. Rédigez un Appel structuré en trois parties (110 à 140 mots : expositive, argumentative, exhortative) adressé aux habitants pour les inciter à préserver cette ressource vitale.',
					modelAnswer:
						'Cet appel (texte exhortatif), intitulé « Appel pour la sauvegarde des forêts algériennes » et publié en 2025 par le collectif citoyen « Algérie Verte et Solidaire », sensibilise les citoyens et les lycéens au drame des incendies forestiers.\nDans un premier temps, l’énonciateur dresse le constat alarmant des feux qui ravagent chaque été des milliers d’hectares à cause de l’imprudence et des déchets, menaçant la faune et les villages. Ensuite, il souligne l’urgence d’agir en rappelant le rôle vital des arbres et en montrant que la vigilance, le nettoyage préventif et le reboisement peuvent limiter ce fléau. Enfin, le collectif exhorte les citoyens à adopter des gestes responsables, à alerter les secours et à planter des arbres afin de préserver durablement ce patrimoine naturel.',
					rubricSummary: 'Conformité à la consigne et respect des 3 étapes de l’Appel (2 pts) | Cohérence et connecteurs logiques (1.5 pt) | Correction linguistique : conjugaison, accords, syntaxe (2 pts) | Propreté et lisibilité (0.5 pt)',
					easyQ: 'Comment doit-on rapporter l’impératif « Mobilisons-nous pour planter des arbres ! » dans un Compte rendu objectif ?',
					easyCorrect: 'Le collectif exhorte les citoyens à se mobiliser pour planter des arbres.',
					easyDistractors: [
						{ text: 'Mobilisons-nous pour planter des arbres !', diagnosticFeedback: 'في التقرير الموضوعي نستخدم ضمير الغائب ولا نعيد نسخ الأمر المباشر.' },
						{ text: 'Je vous ordonne de planter un arbre demain.', diagnosticFeedback: 'ضمير المتكلم « je » ممنوع في التقرير الموضوعي.' },
						{ text: 'Le collectif interdit toute plantation d’arbres.', diagnosticFeedback: 'عكس معنى النص تماما.' }
					],
					medQ: 'Si vous choisissez le Sujet 2 (Rédiger un Appel sur l’eau), quelle progression de paragraphes devez-vous obligatoirement suivre ?',
					medCorrect: 'Un titre incitatif + §1 Partie expositive (constat du gaspillage) + §2 Partie argumentative (il faut/nous pouvons) + §3 Partie exhortative (nous vous appelons + impératifs)',
					medDistractors: [
						{ text: 'Une biographie historique au passé simple sans s’adresser aux habitants', diagnosticFeedback: 'المطلوب نص نداء تحسيسي موجه للسكان وليس سيرة تاريخية.' },
						{ text: 'Deux paragraphes de critique personnelle sur un livre', diagnosticFeedback: 'خارج موضوع النداء تماما.' },
						{ text: 'Une liste de mots isolés séparés par des virgules', diagnosticFeedback: 'يجب تحرير فقرات متكاملة ومترابطة.' }
					],
					hardQ: 'Pourquoi le barème du BAC (6 points) vérifie-t-il l’emploi des verbes de modalité et des verbes performatifs dans le Sujet 2 (Rédiger un Appel) ?',
					hardCorrect: 'Parce qu’ils constituent la signature linguistique du texte exhortatif (obligation/possibilité au §2 et appel direct au §3)',
					hardDistractors: [
						{ text: 'Parce qu’ils servent à raconter des faits du XIXe siècle', diagnosticFeedback: 'هذه الأدوات خاصة بالمشروع الثالث (النداء).' },
						{ text: 'Parce qu’ils remplacent la ponctuation et les alinéas', diagnosticFeedback: 'التنظيم وعلامات الوقف ضرورية إلى جانبها.' },
						{ text: 'Parce qu’ils empêchent d’utiliser l’impératif présent', diagnosticFeedback: 'الأفعال الإنجازية تتكامل مع صيغة الأمر في القسم الثالث.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif d’un Appel) :',
					sujetUnPrompt:
						'Rédigez le compte rendu objectif (environ 100 à 120 mots) d’un appel intitulé « Sécurité routière : sauvons des vies par la prudence ! » diffusé en 2025 par l’Association nationale de prévention routière, destiné au panneau d’affichage de votre lycée.',
					sujetUnNotes: [
						'Accroche complète : texte exhortatif, titre, énonciateur, date, destinataires et problème.',
						'Synthétiser au présent (3e personne) : causes humaines des accidents, valeur sacrée de la vie, possibilité de réduire les victimes.',
						'Rapporter l’exhortation finale adressée aux automobilistes et aux piétons sans copier.',
						'Respecter l’objectivité totale et la clarté des phrases.'
					],
					sujetDeuxPrompt:
						'Les incendies de forêts détruisent chaque été une part précieuse du patrimoine naturel algérien. En tant que membre du club écologique de votre lycée, rédigez un Appel structuré (110 à 140 mots) adressé aux citoyens et aux jeunes pour les sensibiliser et les mobiliser en faveur de la protection et du reboisement des forêts.',
					modelAnswer:
						'Sauvons nos forêts algériennes avant qu’il ne soit trop tard !\nChaque été, des incendies dévastateurs détruisent des milliers d’hectares de nos forêts et menacent la faune, les sols et la sécurité de nombreux villages. Bien souvent, ces catastrophes sont causées par l’imprudence et l’abandon de déchets.\nPourtant, nous devons réagir sans délai car la forêt est le poumon vital de notre pays. Il faut comprendre que la nature ne se reconstruit pas en un jour, mais ensemble nous pouvons prévenir ces drames grâce à la vigilance et au reboisement.\nChers citoyens, chers jeunes, nous vous appelons aujourd’hui à protéger ce trésor commun ! N’allumez aucun feu en forêt, gardez les lieux propres et participez aux campagnes de plantation. Agissons ensemble afin que nos montagnes retrouvent leur verdure durablement !',
					rubricSummary: 'Respect du plan en 3 parties de l’Appel (2 pts) | Emploi des outils exhortatifs : modalité, performatifs, impératif, subjonctif (1.5 pt) | Correction de la langue (2 pts) | Présentation et ponctuation (0.5 pt)',
					easyQ: 'Dans le modèle d’Appel sur les forêts (Sujet 2), quelle phrase ouvre la partie exhortative (§3) ?',
					easyCorrect: '« Chers citoyens, chers jeunes, nous vous appelons aujourd’hui à protéger ce trésor commun ! »',
					easyDistractors: [
						{ text: '« Chaque été, des incendies dévastateurs détruisent des milliers d’hectares... »', diagnosticFeedback: 'هذه الجملة تفتتح القسم الإخباري (§1) لتشخيص المشكلة.' },
						{ text: '« Pourtant, nous devons réagir sans délai car la forêt est le poumon vital... »', diagnosticFeedback: 'هذه الجملة تفتتح القسم الحجاجي (§2).' },
						{ text: '« Bien souvent, ces catastrophes sont causées par l’imprudence. »', diagnosticFeedback: 'هذه جملة تفسيرية للأسباب في القسم الإخباري (§1).' }
					],
					medQ: 'Quels outils linguistiques du Projet 3 apparaissent dans la dernière phrase du modèle : « Agissons ensemble afin que nos montagnes retrouvent leur verdure durablement ! » ?',
					medCorrect: 'Un impératif inclusif (« Agissons ») et une subordonnée de but au subjonctif (« afin que... retrouvent »)',
					medDistractors: [
						{ text: 'Un passé simple et un discours direct', diagnosticFeedback: 'لا يوجد ماضٍ بسيط ولا كلام مباشر.' },
						{ text: 'Une concession avec « Malgré » et un imparfait', diagnosticFeedback: 'الجملة تتضمن أمرا وغاية.' },
						{ text: 'Uniquement un nom propre et une date', diagnosticFeedback: 'الجملة فعلية exhortative متكاملة.' }
					],
					hardQ: 'Dans le Sujet 1 (Compte rendu objectif sur la sécurité routière), quelle formulation décrit le mieux la visée communicative ?',
					hardCorrect: 'L’association vise à alerter les usagers sur les dangers de la route et à les exhorter à respecter le code de la route pour sauver des vies.',
					hardDistractors: [
						{ text: 'L’association veut vendre de nouvelles voitures rapides aux lycéens.', diagnosticFeedback: 'خارج المضمون ومخالف لروح النداء.' },
						{ text: 'À mon avis, cet appel est très intéressant et bien rédigé.', diagnosticFeedback: 'رأي شخصي ممنوع في التقرير الموضوعي.' },
						{ text: 'L’association raconte l’invention historique de l’automobile en 1900.', diagnosticFeedback: 'النص نداء تحسيسي معاصر وليس نصا تاريخيا.' }
					]
				},
				{
					sujetUnTitle: 'Sujet 1 (Compte rendu objectif d’un Appel) :',
					sujetUnPrompt:
						'Faites le compte rendu objectif (environ 100 à 120 mots) de l’appel intitulé « Appel à la solidarité hivernale envers les familles démunies » (Association « Mains Unies », 2025) pour informer vos camarades de classe.',
					sujetUnNotes: [
						'Introduction : nature (appel / texte exhortatif), titre, auteur (Association Mains Unies), année, thème.',
						'Développement : présenter le constat hivernal, la valeur de la solidarité et les gestes concrets auxquels l’association invite les bienfaiteurs et volontaires.',
						'Employer le présent de l’indicatif, la 3e personne et des connecteurs de progression.',
						'Zéro copie intégrale et zéro jugement personnel.'
					],
					sujetDeuxPrompt:
						'Les accidents de la route continuent de coûter la vie à de nombreux innocents chaque année. Rédigez un Appel structuré (110 à 140 mots) adressé aux conducteurs et aux jeunes usagers de la route pour les convaincre de la nécessité de la prudence et les exhorter à respecter scrupuleusement le code de la route.',
					modelAnswer:
						'Prudence au volant : protégeons la vie sur nos routes !\nChaque année, les accidents de la circulation provoquent des drames douloureux qui brisent des familles entières. La vitesse excessive, l’inattention et l’usage du téléphone au volant demeurent les principales causes de ce fléau.\nIl est urgent de réagir, car aucune précipitation ne vaut une vie humaine. Nous devons tous comprendre que la sécurité routière est une responsabilité collective. Grâce à la discipline et au respect du code de la route, nous pouvons réduire considérablement le nombre de victimes.\nChers conducteurs, chers jeunes usagers, nous vous exhortons à choisir la prudence à chaque trajet ! Ralentissez devant les écoles, attachez votre ceinture et restez attentifs. Mobilisons-nous dès aujourd’hui afin que nos routes deviennent des espaces sûrs pour tous !',
					rubricSummary: 'Respect du plan de l’Appel et pertinence des idées (2 pts) | Outils de l’exhortation et connecteurs (1.5 pt) | Correction grammaticale et orthographique (2 pts) | Présentation soignée (0.5 pt)',
					easyQ: 'Combien de sujets le candidat doit-il traiter dans la partie « II. Production écrite » du BAC ?',
					easyCorrect: 'Un seul sujet au choix (soit le Sujet 1, soit le Sujet 2)',
					easyDistractors: [
						{ text: 'Les deux sujets obligatoirement en même temps', diagnosticFeedback: 'التعليمة واضحة: يعالج المترشح موضوعا واحدا فقط بالاختيار.' },
						{ text: 'Aucun sujet si la compréhension est terminée', diagnosticFeedback: 'الوضعية الإدماجية تمثل 6 نقاط أساسية من أصل 20.' },
						{ text: 'Uniquement le titre sans rédiger de paragraphes', diagnosticFeedback: 'لا بد من تحرير نص كامل مترابط.' }
					],
					medQ: 'Dans le modèle d’Appel sur la sécurité routière (Sujet 2), quelle phrase appartient à la partie ARGUMENTATIVE (§2) ?',
					medCorrect: '« Il est urgent de réagir, car aucune précipitation ne vaut une vie humaine. »',
					medDistractors: [
						{ text: '« Prudence au volant : protégeons la vie sur nos routes ! »', diagnosticFeedback: 'هذا هو العنوان الجذاب للنداء.' },
						{ text: '« Chers conducteurs, nous vous exhortons à choisir la prudence ! »', diagnosticFeedback: 'هذه جملة القسم الندائي (§3).' },
						{ text: '« Chaque année, les accidents provoquent des drames douloureux. »', diagnosticFeedback: 'هذه جملة القسم الإخباري (§1).' }
					],
					hardQ: 'Avant de rendre sa copie de français au BAC, quelle vérification de 10 minutes évite le plus de pertes de points en Production écrite ?',
					hardCorrect: 'Relire les accords sujet-verbe et participe passé, les modes après « bien que / il faut que / afin que », les majuscules et la ponctuation',
					hardDistractors: [
						{ text: 'Ajouter un avis personnel « je pense que » au milieu du compte rendu objectif', diagnosticFeedback: 'إضافة الرأي الشخصي تُنقص العلامة في التقرير الموضوعي.' },
						{ text: 'Recopier le texte de compréhension à la fin de la copie', diagnosticFeedback: 'النسخ مرفوض تماما.' },
						{ text: 'Effacer les alinéas pour fusionner tous les paragraphes en un seul bloc', diagnosticFeedback: 'الحفاظ على الفقرات والمسافات البادئة شرط أساسي للتنظيم.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Réflexe gagnant BAC : ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 6,
				instruction: 'Traitez au choix l’un des deux sujets proposés ci-dessous en soignant la structure et la langue.',
				content: [
					buildFrenchWrittenProductionBlock({
						sujetUnTitle: v.sujetUnTitle,
						sujetUnPrompt: v.sujetUnPrompt,
						sujetUnNotes: v.sujetUnNotes,
						sujetDeuxPrompt: v.sujetDeuxPrompt,
						modelAnswer: v.modelAnswer,
						rubricSummary: v.rubricSummary,
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'Pour le Sujet 1 (Compte rendu objectif d’un Appel), rapportez les exhortations à la 3e personne (L’auteur appelle / exhorte à...).',
					'Pour le Sujet 2 (Rédiger un Appel), respectez un titre incitatif + 3 paragraphes distincts : Expositive, Argumentative, Exhortative.',
					'Intégrez au moins un verbe de modalité (devoir/falloir/pouvoir), un verbe performatif, deux impératifs et un but avec « afin que + subjonctif ».'
				],
				solutionStepsAr: [
					'Sujet 1 : Accroche (appel, titre, énonciateur, destinataires) + Résumé structuré (constat, arguments, exhortation) sans avis personnel.',
					'Sujet 2 : Titre incitatif + §1 Constat négatif + §2 Nécessité et possibilité d’agir + §3 Appel direct (performatif, impératif, futur/subjonctif).',
					'Relecture finale : accords, conjugaison, ponctuation et propreté de la copie.'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
