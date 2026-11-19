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
 * Parameterized Exam & Quiz Templates — Trimestre 3 : Projet 3 « L’Appel » & Synthèse BAC LP (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
 */
export const TEMPLATES_3AS_LP_T3: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): L’Appel écologique et patrimonial en Algérie
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t3_comp_appel_ecologie_eau',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): نداء لحماية الماء والغابات والتراث الجزائري',
		curriculumLessonId: 'fre_lesson_3as_lp_t3_structure_appel',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Appel citoyen pour préserver chaque goutte d’eau',
					source: 'D’après une campagne nationale de sensibilisation écologique',
					paragraphs: [
						'Chers concitoyens, depuis plusieurs années, la baisse des précipitations et les vagues de chaleur mettent nos barrages et nos nappes phréatiques à rude épreuve. Pourtant, dans nos foyers comme dans les espaces publics, des milliers de litres d’eau potable sont encore gaspillés chaque jour par négligence ou par des fuites non réparées.',
						'Il est urgent que [[nous]] prenions conscience de la valeur vitale de cette ressource rare. Protéger l’eau n’est pas seulement une exigence économique : c’est un devoir moral et civique envers nos enfants et envers notre terre. Des gestes simples — réparer un robinet, éviter le lavage abusif des trottoirs, adopter l’irrigation raisonnée — permettent déjà d’économiser des volumes considérables.',
						'C’est pourquoi nous vous appelons toutes et tous à passer à l’action dès aujourd’hui. Économisons chaque goutte, sensibilisons notre entourage et défendons [[ce bien précieux]] : ensemble, nous garantirons la sécurité hydrique de l’Algérie de demain !'
					],
					glossary: [
						{ term: 'nappe phréatique', meaning: 'réserve d’eau souterraine alimentant puits et sources' },
						{ term: 'sécurité hydrique', meaning: 'capacité d’un pays à garantir durablement l’accès à l’eau' }
					],
					tfItems: [
						{ q: 'Le texte signale que la sécheresse et le gaspillage menacent nos réserves d’eau potable.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon l’auteur, les gestes individuels quotidiens n’ont aucun impact sur l’économie d’eau.', a: 'Faux', c: 'Des gestes simples comme réparer un robinet permettent déjà d’économiser des volumes considérables.', mark: '0.5' },
						{ q: 'La préservation de l’eau est présentée comme un devoir moral et civique.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans le troisième paragraphe, l’auteur emploie l’impératif pour inciter les citoyens à agir.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Délimitez la structure tripartite du texte en précisant le rôle de chaque paragraphe (§1, §2, §3).', a: '§1 : partie expositive (constat alarmant) ; §2 : partie argumentative (nécessité et gestes possibles) ; §3 : partie exhortative (appel à l’action).', mark: '1.5' },
						{ q: 'b) Relevez dans le texte un verbe performatif et une expression de modalité déontique (obligation).', a: 'Verbe performatif : « appelons » (§3). Modalité déontique : « Il est urgent que... » ou « c’est un devoir moral » (§2).', mark: '1' }
					],
					refPrompt: 'a) « nous » (§2)   b) « ce bien précieux » (§3)',
					refAnswer: 'a) « nous » (inclusif) renvoie aux auteurs de l’appel et à l’ensemble des citoyens algériens.   b) « ce bien précieux » renvoie à l’eau potable.',
					synthPrompt: 'Proposez deux gestes concrets que vous pouvez appliquer dans votre lycée ou votre foyer pour économiser l’eau. Répondez en trois lignes.',
					synthAnswer: 'D’une part, je veille à fermer soigneusement les robinets dès que je n’utilise plus l’eau et à signaler toute fuite. D’autre part, je sensibilise mes proches à récupérer l’eau de lavage des légumes pour arroser les plantes de la maison.',
					easyQ: 'À qui s’adresse cet appel citoyen ?',
					easyAns: 'À l’ensemble des citoyens algériens (« Chers concitoyens »)',
					easyWrong: ['Uniquement aux historiens', 'Uniquement aux touristes étrangers', 'Uniquement aux constructeurs de ponts'],
					medQ: 'Quelle est la valeur du pronom « nous » dans « Économisons chaque goutte... nous garantirons » ?',
					medAns: 'Un « nous inclusif » qui associe l’auteur et les destinataires dans un même effort',
					medWrong: ['Un « nous » qui exclut totalement le lecteur', 'Un pronom de la 3e personne neutre', 'Un pronom relatif de lieu'],
					hardQ: 'Quelle est la fonction du paragraphe 2 dans l’architecture de cet appel ?',
					hardAns: 'C’est la partie argumentative qui démontre l’urgence d’agir et l’efficacité de gestes simples',
					hardWrong: [
						'C’est le constat purement négatif sans solution',
						'C’est une biographie historique de 1931',
						'C’est la signature finale de l’association'
					]
				},
				{
					title: 'Reboisons nos montagnes, protégeons nos forêts !',
					source: 'D’après un appel d’associations volontaires algériennes',
					paragraphs: [
						'Chaque été, des incendies dévastateurs ravagent nos massifs forestiers de Kabylie, des Aurès et de l’Ouest algérien, détruisant en quelques heures des chênes centenaires et des vergers nourriciers. L’imprudence humaine et les détritus abandonnés dans la nature aggravent encore [[ce fléau]].',
						'Nous ne pouvons plus rester spectateurs face à la disparition de notre poumon vert. Il faut que chaque génération comprenne que l’arbre retient les sols fertiles, adoucit le climat et abrite une biodiversité précieuse. De plus, les expériences locales de reboisement prouvent que la mobilisation volontaire redonne vie aux collines sinistrées.',
						'Jeunes d’Algérie, familles et associations, nous vous exhortons à participer aux campagnes d’automne ! Plantez un arbre, veillez sur [[lui]] et refusez tout geste imprudent en forêt : ensemble, nous rendrons à nos montagnes leur verdure éternelle.'
					],
					glossary: [
						{ term: 'massif forestier', meaning: 'vaste ensemble de forêts sur un relief' },
						{ term: 'sinistré', meaning: 'gravement touché par un incendie ou une catastrophe' }
					],
					tfItems: [
						{ q: 'Les incendies d’été détruisent des forêts anciennes et des vergers nourriciers.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’imprudence humaine n’a aucun rôle dans le déclenchement des incendies.', a: 'Faux', c: 'L’imprudence humaine et les détritus abandonnés aggravent encore ce fléau.', mark: '0.5' },
						{ q: 'L’arbre joue un rôle écologique essentiel en protégeant les sols et en adoucissant le climat.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’appel invite les jeunes et les familles à rejoindre les campagnes de reboisement d’automne.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez deux bienfaits écologiques de l’arbre mentionnés dans le paragraphe 2.', a: 'Il retient les sols fertiles, adoucit le climat et abrite une biodiversité précieuse (deux au choix).', mark: '1.5' },
						{ q: 'b) Relevez deux outils grammaticaux utilisés au paragraphe 3 pour impliquer directement les destinataires.', a: 'L’interpellation/vocatif (« Jeunes d’Algérie, familles et associations »), le verbe performatif « exhortons » et les impératifs (« Plantez », « veillez », « refusez »).', mark: '1' }
					],
					refPrompt: 'a) « ce fléau » (§1)   b) « lui » (§3)',
					refAnswer: 'a) « ce fléau » renvoie aux incendies dévastateurs de forêts.   b) « lui » renvoie à « un arbre » (l’arbre planté).',
					synthPrompt: 'Pensez-vous que les campagnes scolaires de plantation d’arbres soient utiles ? Justifiez en trois lignes.',
					synthAnswer: 'Oui, elles sont très utiles car elles éduquent les élèves au respect concret de la nature dès le plus jeune âge. En plantant et en arrosant un arbre dans leur établissement, les jeunes développent le sens de la responsabilité écologique.',
					easyQ: 'À quelle saison l’appel invite-t-il les citoyens à participer aux campagnes de plantation ?',
					easyAns: 'En automne (les campagnes d’automne)',
					easyWrong: ['En plein été', 'Uniquement la nuit', 'Uniquement dans les bureaux'],
					medQ: 'À quoi renvoie le pronom « lui » dans « Plantez un arbre, veillez sur lui » (§3) ?',
					medAns: 'Un arbre',
					medWrong: ['Un incendie', 'Un massif', 'Un détritus'],
					hardQ: 'Quelle valeur exprime le futur simple « nous rendrons » à la fin du paragraphe 3 ?',
					hardAns: 'Une promesse confiante et la certitude du succès si l’appel est suivi',
					hardWrong: ['Un regret sur le passé', 'Une hypothèse impossible', 'Un constat alarmant']
				},
				{
					title: 'Sauvons nos trésors historiques : de la Casbah à Timgad',
					source: 'D’après une tribune pour la sauvegarde du patrimoine algérien',
					paragraphs: [
						'L’Algérie abrite un patrimoine architectural d’une richesse exceptionnelle : la Casbah d’Alger, la Grande Mosquée de Tlemcen, Timgad à Batna, la Kalâa des Béni Hammad et le Tassili n’Ajjer. Hélas, l’érosion naturelle, les dégradations volontaires et le manque d’entretien menacent aujourd’hui plusieurs de [[ces joyaux]].',
						'Il est impératif que nous protégions ces témoins irremplaçables de notre histoire. Préserver un monument ancien, ce n’est pas regarder uniquement vers le passé : c’est transmettre aux jeunes générations une identité vivante et stimuler un tourisme culturel respectueux et durable.',
						'Étudiants, artisans et visiteurs, nous vous invitons à devenir les gardiens vigilants de notre mémoire ! Respectez les sites, refusez tout graffiti et soutenez [[les initiatives locales de restauration]] : ainsi, nos monuments traverseront encore les siècles.'
					],
					glossary: [
						{ term: 'érosion', meaning: 'usure lente de la pierre sous l’effet du vent et de la pluie' },
						{ term: 'restauration', meaning: 'réparation fidèle d’un monument ancien' }
					],
					tfItems: [
						{ q: 'Le texte cite la Grande Mosquée de Tlemcen et Timgad parmi les trésors du patrimoine algérien.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les monuments historiques ne subissent aucune menace aujourd’hui.', a: 'Faux', c: 'Ils sont menacés par l’érosion naturelle, les dégradations volontaires et le manque d’entretien.', mark: '0.5' },
						{ q: 'Protéger le patrimoine favorise aussi un tourisme culturel respectueux et durable.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur demande aux visiteurs d’inscrire leurs noms sur les pierres anciennes.', a: 'Faux', c: 'Il exhorte les visiteurs à respecter les sites et à refuser tout graffiti.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez deux causes qui menacent aujourd’hui les monuments algériens (§1).', a: 'L’érosion naturelle, les dégradations volontaires et le manque d’entretien (deux au choix).', mark: '1.5' },
						{ q: 'b) Quelle est la visée communicative de ce texte ?', a: 'Sensibiliser les citoyens aux menaces pesant sur le patrimoine algérien et les exhorter à le protéger activement.', mark: '1' }
					],
					refPrompt: 'a) « ces joyaux » (§1)   b) « les initiatives locales de restauration » (§3)',
					refAnswer: 'a) « ces joyaux » renvoie aux monuments historiques algériens (Casbah, Tlemcen, Timgad, Kalâa, Tassili).   b) Les projets citoyens et locaux visant à réparer et préserver les monuments.',
					synthPrompt: 'Quel rôle les lycéens peuvent-ils jouer pour faire connaître et protéger le patrimoine de leur wilaya ? Répondez en trois lignes.',
					synthAnswer: 'Les lycéens peuvent réaliser des exposés documentaires et des vidéos éducatives pour présenter l’histoire des monuments de leur wilaya. Lors des sorties scolaires, ils donnent aussi l’exemple en laissant chaque site parfaitement propre.',
					easyQ: 'Quel site du Sud algérien figure parmi les monuments cités au paragraphe 1 ?',
					easyAns: 'Le Tassili n’Ajjer',
					easyWrong: ['Les Ponts de Constantine', 'Le Jardin d’Essai', 'La Soummam'],
					medQ: 'Pourquoi le verbe « protégions » est-il au subjonctif présent au paragraphe 2 ?',
					medAns: 'Parce qu’il est introduit par la tournure impersonnelle d’obligation « Il est impératif que »',
					medWrong: ['Parce qu’il exprime un fait passé achevé', 'Parce qu’il suit l’indicateur « hier »', 'Parce qu’il est à l’impératif'],
					hardQ: 'Comment l’auteur réfute-t-il l’idée que le patrimoine ne concernerait que le passé (§2) ?',
					hardAns: 'Il montre qu’il transmet une identité vivante aux jeunes et stimule un tourisme culturel durable',
					hardWrong: [
						'Il propose de démolir les vieux quartiers',
						'Il affirme que Timgad date du XXIe siècle',
						'Il dit que le tourisme culturel est inutile'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى النص للتأكد من المعلومة الصريحة في نص النداء.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Appel BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع قاعدة ضمير nous inclusif، والإحالة، والمنصوب بعد صيغ الوجوب.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue de l’Appel BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل النحوي أو التلفظي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل البنية الثلاثية للنداء ودور كل فقرة فيه.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Structure BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الوظيفة البنائية أو البلاغية الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture et analyse',
				points: 7,
				instruction: 'Lisez attentivement cet appel puis répondez aux questions (7 points — BAC LP) :',
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
								header: '1. Ce texte est un :',
								options: ['Appel (texte exhortatif)', 'Récit de guerre historique', 'Portrait biographique'],
								correct: 'Appel (texte exhortatif)',
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
						content: `4. Précisez ce que désignent les mots soulignés :\n${chosen.refPrompt}`,
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
				trimesterId: 't3',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الأقسام الثلاثة للنداء: التشخيص (§1)، الحجاج (§2)، ثم التحريض (§3).',
					'انتبه للأفعال الإنجازية (appelons, exhortons, invitons) وصيغة الأمر.',
					'في سؤال التركيب، اقترح حلولاً ملموسة في 3 أسطر متماسكة.'
				],
				solutionStepsAr: [
					'تحديد طبيعة نص النداء (0.5 نقطة).',
					'إجابات الصواب والخطأ مع التبرير (2 نقطتان).',
					'تحليل البنية الثلاثية وأدوات النداء (2.5 نقطة).',
					'فك الإحالة وتحرير فقرة التركيب (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Appel à la solidarité algérienne (Touiza) & civisme routier
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t3_comp_appel_solidarite_civisme',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): نداء للتطوع والتكافل (التويزة) والوعي المروري',
		curriculumLessonId: 'fre_lesson_3as_lp_t3_visee_synthese_bac_lp',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Faisons revivre l’esprit de la Touiza dans nos quartiers !',
					source: 'D’après un appel d’un collectif associatif algérien',
					paragraphs: [
						'Dans plusieurs quartiers de nos villes, les espaces verts manquent d’entretien, des familles modestes peinent à assurer les fournitures scolaires de la rentrée et les liens de solidarité s’effritent peu à peu face au repli individuel.',
						'Pourtant, notre culture algérienne recèle un modèle admirable d’entraide collective : la Touiza. Autrefois, [[cette tradition solidaire]] unissait tout un village pour récolter le blé, bâtir une maison ou entretenir une source commune. Il faut que nous adaptions cet héritage généreux aux besoins d’aujourd’hui : soutien scolaire gratuit, nettoyage des cités et aide aux personnes âgées.',
						'Lycéens, étudiants et habitants de chaque quartier, nous vous appelons à rejoindre les journées volontaires du samedi ! Donnons un peu de notre temps, unissons nos énergies et ravivons [[cette fraternité agissante]] : c’est par nos mains unies que nos cités redeviendront accueillantes.'
					],
					glossary: [
						{ term: 'Touiza', meaning: 'tradition algérienne d’entraide collective bénévole' },
						{ term: 's’effriter', meaning: 's’affaiblir et disparaître progressivement' }
					],
					tfItems: [
						{ q: 'Le texte constate un affaiblissement des liens de solidarité dans certains quartiers.', a: 'Vrai', mark: '0.5' },
						{ q: 'La Touiza est présentée comme une tradition algérienne d’entraide collective bénévole.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur pense que la Touiza ne peut plus être adaptée aux besoins actuels.', a: 'Faux', c: 'Il affirme qu’il faut adapter cet héritage au soutien scolaire, au nettoyage des cités et à l’aide aux personnes âgées.', mark: '0.5' },
						{ q: 'L’appel invite uniquement les personnes âgées à nettoyer les quartiers.', a: 'Faux', c: 'Il appelle les lycéens, les étudiants et les habitants de chaque quartier.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez trois actions modernes proposées par l’auteur pour faire revivre la Touiza (§2).', a: 'Le soutien scolaire gratuit, le nettoyage des cités et l’aide aux personnes âgées.', mark: '1.5' },
						{ q: 'b) Relevez deux verbes à l’impératif dans le paragraphe 3 et précisez leur valeur.', a: '« Donnons », « unissons », « ravivons » (deux au choix) : valeur d’exhortation collective grâce au « nous inclusif ».', mark: '1' }
					],
					refPrompt: 'a) « cette tradition solidaire » (§2)   b) « cette fraternité agissante » (§3)',
					refAnswer: 'a) « cette tradition solidaire » renvoie à la Touiza.   b) « cette fraternité agissante » renvoie à l’entraide volontaire et solidaire entre voisins.',
					synthPrompt: 'Aimeriez-vous participer à une journée de volontariat dans votre commune ? Justifiez votre réponse en trois lignes.',
					synthAnswer: 'Oui, je participerais volontiers à une journée de bénévolat dans ma commune car aider les autres procure une grande satisfaction morale. De plus, travailler ensemble pour la propreté du quartier ou le soutien scolaire renforce le respect mutuel entre voisins.',
					easyQ: 'Quelle tradition algérienne d’entraide est au cœur de cet appel ?',
					easyAns: 'La Touiza',
					easyWrong: ['La censure de presse', 'La chronique coloniale', 'Le débat numérique'],
					medQ: 'Pourquoi le verbe « adaptions » porte-t-il un « i » dans « Il faut que nous adaptions » (§2) ?',
					medAns: 'Parce qu’il est conjugué au subjonctif présent après « Il faut que »',
					medWrong: ['Parce qu’il est au passé simple', 'Parce qu’il est au futur simple', 'Parce qu’il est à l’infinitif'],
					hardQ: 'Quelle est la visée communicative de cet appel ?',
					hardAns: 'Sensibiliser les habitants au recul de la solidarité et les inciter à s’engager dans le bénévolat de proximité',
					hardWrong: [
						'Critiquer les associations de quartier',
						'Décrire uniquement l’agriculture ancienne sans lien avec le présent',
						'Interdire aux étudiants le volontariat'
					]
				},
				{
					title: 'Sur la route, choisissons la prudence et sauvons des vies !',
					source: 'D’après une campagne citoyenne de prévention routière',
					paragraphs: [
						'Chaque année, les accidents de la circulation endeuillent des centaines de familles sur nos routes nationales et urbaines. L’excès de vitesse, l’usage du téléphone au volant et le non-respect du code de la route demeurent les causes principales de [[cette tragédie évitable]].',
						'Il est indispensable que chaque conducteur et chaque piéton mesure la gravité d’une seconde d’inattention. Respecter la limitation de vitesse, attacher la ceinture de sécurité et céder le passage ne ralentissent pas notre voyage : ces gestes civiques protègent la vie humaine, bien le plus sacré qui soit.',
						'Jeunes conducteurs, parents et usagers de la route, nous vous prions de faire de la prudence un réflexe permanent ! Ralentissez à l’approche des écoles, bannissez le téléphone au volant et soyez vigilants : ensemble, nous transformerons [[nos routes]] en espaces sûrs et sereins.'
					],
					glossary: [
						{ term: 'endeuiller', meaning: 'plonger dans le deuil et la tristesse' },
						{ term: 'bannir', meaning: 'exclure définitivement, rejeter complètement' }
					],
					tfItems: [
						{ q: 'L’excès de vitesse et le téléphone au volant sont les causes majeures des accidents routiers.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur juge que ces accidents sont une fatalité totalement inévitable.', a: 'Faux', c: 'Il les qualifie explicitement de « tragédie évitable ».', mark: '0.5' },
						{ q: 'La prudence sur la route concerne à la fois les conducteurs et les piétons.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le texte conseille de ralentir à l’approche des écoles.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez trois comportements civiques recommandés dans les paragraphes 2 et 3.', a: 'Respecter la limitation de vitesse, attacher la ceinture, céder le passage, ralentir près des écoles, bannir le téléphone (trois au choix).', mark: '1.5' },
						{ q: 'b) Relevez le verbe performatif du paragraphe 3 et deux verbes à l’impératif.', a: 'Verbe performatif : « prions » (nous vous prions de). Impératifs : « Ralentissez », « bannissez », « soyez » (deux au choix).', mark: '1' }
					],
					refPrompt: 'a) « cette tragédie évitable » (§1)   b) « nos routes » (§3)',
					refAnswer: 'a) « cette tragédie évitable » renvoie aux accidents de la circulation.   b) « nos routes » renvoie aux routes nationales et urbaines d’Algérie.',
					synthPrompt: 'Selon vous, quelles mesures éducatives au lycée pourraient sensibiliser les jeunes à la sécurité routière ? Répondez en trois lignes.',
					synthAnswer: 'Le lycée peut organiser des ateliers de prévention animés par des agents de la protection civile et des concours d’affiches créées par les élèves. Ainsi, les futurs jeunes conducteurs acquièrent très tôt le respect du code de la route et de la vie d’autrui.',
					easyQ: 'Quel comportement dangereux au volant est explicitement cité aux paragraphes 1 et 3 ?',
					easyAns: 'L’usage du téléphone au volant (ainsi que l’excès de vitesse)',
					easyWrong: ['Attacher la ceinture de sécurité', 'Ralentir devant les écoles', 'Céder le passage'],
					medQ: 'Quelle est la forme correcte de l’impératif de « être » employée au paragraphe 3 ?',
					medAns: 'soyez (soyez vigilants)',
					medWrong: ['êtes vigilants', 'serez vigilants', 'étiez vigilants'],
					hardQ: 'Pourquoi l’auteur qualifie-t-il les accidents de « tragédie évitable » (§1) ?',
					hardAns: 'Pour montrer que le changement de comportement humain peut réellement empêcher ces drames',
					hardWrong: [
						'Pour prouver qu’aucune action humaine ne sert à rien',
						'Pour inciter les conducteurs à rouler plus vite',
						'Pour nier l’existence du code de la route'
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
					questionText: `Appel BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تثبت من تصريف Subjonctif présent أو Impératif.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Langue BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'اختر التفسير أو التصريف الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'حدد الغاية التحريضية أو الدلالة الحجاجية للعبارة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Visée BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الغاية التواصلية أو المعنى العميق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture et analyse',
				points: 7,
				instruction: 'Lisez attentivement cet appel citoyen puis répondez aux questions (7 points — BAC LP) :',
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
									'Sensibiliser et exhorter les citoyens à agir concrètement',
									'Informer sur une bataille du passé',
									'Comparer deux manuels scolaires'
								],
								correct: 'Sensibiliser et exhorter les citoyens à agir concrètement',
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
						content: `4. Précisez ce que remplacent les expressions soulignées :\n${chosen.refPrompt}`,
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
				trimesterId: 't3',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تثبت من هوية المرسل والمرسل إليهم وسبب إطلاق النداء.',
					'ميّز بين الفعل الإنجازي (appelons, prions) وصيغة الأمر (Donnons, Ralentissez).',
					'أجب عن سؤال التركيب بموقف واضح وتبرير شخصي منظم.'
				],
				solutionStepsAr: [
					'تحديد الغاية التواصلية التحريضية (0.5 نقطة).',
					'التثبت من الصواب والخطأ مع التعليل (2 نقطتان).',
					'استخراج الإجراءات وأدوات النداء (2.5 نقطة).',
					'فك الإحالة وتحرير فقرة التركيب (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Structure de l’Appel, performatifs, subjonctif & impératif
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t3_exp_appel_subjonctif_imperatif',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'conjugaison_temps',
		titleAr: 'البناء اللغوي (6 نقاط — آداب وفلسفة): أفعال النداء، صيغ الوجوب، المنصوب وصيغة الأمر',
		curriculumLessonId: 'fre_lesson_3as_lp_t3_performatifs_deontique_subjonctif',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez les verbes suivants en deux colonnes : exhorter - devoir - inviter - falloir - appeler - être obligé de.',
					classCols: [
						{ header: 'Verbes performatifs d’appel', items: ['exhorter', 'inviter', 'appeler'], mark: '0.5' },
						{ header: 'Verbes / locutions d’obligation', items: ['devoir', 'falloir', 'être obligé de'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'sensibiliser' }, nom: { value: 'sensibilisation', mark: '0.25' }, adjectif: { value: 'sensible / sensibilisé', mark: '0.25' } },
						{ verbe: { value: 'mobiliser', mark: '0.25' }, nom: { given: true, value: 'mobilisation' }, adjectif: { value: 'mobilisé', mark: '0.25' } },
						{ verbe: { value: 'solidariser', mark: '0.25' }, nom: { value: 'solidarité', mark: '0.25' }, adjectif: { given: true, value: 'solidaire' } }
					],
					subjTransform: [
						{
							q: 'a) Réécrivez avec « Il faut que nous... » : Nous devons protéger nos forêts et agir avec civisme.',
							a: 'a) Il faut que nous protégions nos forêts et agissions avec civisme.'
						},
						{
							q: 'b) Transformez à l’impératif (1re pers. pluriel) : Il est indispensable que nous nous mobilisions pour nos quartiers.',
							a: 'b) Mobilisons-nous pour nos quartiers !'
						}
					],
					modePrompt: '4. Conjuguez les verbes entre parenthèses au subjonctif présent ou à l’impératif selon le contexte :\na) Il est urgent que chaque citoyen (faire) preuve de responsabilité.\nb) Chers amis, (être — 2e pers. plur.) vigilants face au gaspillage !',
					modeAnswer: 'a) fasse   b) soyez',
					easyQ: 'Lequel de ces verbes est un verbe performatif utilisé pour lancer un appel ?',
					easyAns: 'exhorter',
					easyWrong: ['falloir', 'dormir', 'mesurer'],
					medQ: 'Complétez au subjonctif présent : « Il est urgent que chaque citoyen .......... preuve de responsabilité. »',
					medAns: 'fasse',
					medWrong: ['fait', 'fera', 'faisait'],
					hardQ: 'Transformez à l’impératif (1re pers. plur.) : « Il faut que nous nous mobilisions pour nos quartiers. »',
					hardAns: 'Mobilisons-nous pour nos quartiers !',
					hardWrong: [
						'Nous mobilisons pour nos quartiers !',
						'Mobilisez-nous pour nos quartiers !',
						'Mobilisions-nous pour nos quartiers !'
					]
				},
				{
					classPrompt: '1. Classez ces phrases selon les étapes de l’Appel : Les forêts brûlent chaque été - L’arbre protège nos sols - Rejoignez la campagne de plantation - Le gaspillage menace nos barrages.',
					classCols: [
						{ header: 'Constat (Expositive)', items: ['Les forêts brûlent chaque été', 'Le gaspillage menace nos barrages'], mark: '0.5' },
						{ header: 'Argument / Exhortation', items: ['L’arbre protège nos sols', 'Rejoignez la campagne de plantation'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'exhorter' }, nom: { value: 'exhortation', mark: '0.25' }, adjectif: { value: 'exhortatif', mark: '0.25' } },
						{ verbe: { value: 'préserver', mark: '0.25' }, nom: { given: true, value: 'préservation' }, adjectif: { value: 'préservé', mark: '0.25' } },
						{ verbe: { value: 'engager', mark: '0.25' }, nom: { value: 'engagement', mark: '0.25' }, adjectif: { given: true, value: 'engagé' } }
					],
					subjTransform: [
						{
							q: 'a) Réécrivez avec « Il est impératif que vous... » : Vous devez prendre conscience du danger.',
							a: 'a) Il est impératif que vous preniez conscience du danger.'
						},
						{
							q: 'b) Transformez à l’impératif (2e pers. singulier) : Il faut que tu préserves l’eau et que tu sois attentif.',
							a: 'b) Préserve l’eau et sois attentif !'
						}
					],
					modePrompt: '4. Mettez les verbes entre parenthèses au mode convenable :\na) Il faut que les jeunes (savoir) valoriser leur patrimoine.\nb) (Avoir — 1re pers. plur.) le courage d’agir dès aujourd’hui !',
					modeAnswer: 'a) sachent   b) Ayons',
					easyQ: 'Quel adjectif caractérise la visée d’un texte qui exhorte à agir ?',
					easyAns: 'exhortatif (ou incitatif)',
					easyWrong: ['exhortation', 'exhorter', 'biographique'],
					medQ: 'Conjuguez « savoir » au subjonctif présent : « Il faut que les jeunes .......... valoriser leur patrimoine. »',
					medAns: 'sachent',
					medWrong: ['savent', 'sauront', 'savaient'],
					hardQ: 'Choisissez l’orthographe exacte à l’impératif (2e pers. sing.) : « .......... l’eau et .......... attentif ! »',
					hardAns: 'Préserve / sois',
					hardWrong: ['Préserves / sois', 'Préserve / est', 'Préserves / es']
				},
				{
					classPrompt: '1. Classez ces expressions en deux catégories : Chers citoyens - Il faut agir - Jeunes d’Algérie - Nous devons réagir - Amis de la nature - Il est urgent d’intervenir.',
					classCols: [
						{ header: 'Interpellation (Vocatif)', items: ['Chers citoyens', 'Jeunes d’Algérie', 'Amis de la nature'], mark: '0.5' },
						{ header: 'Modalité déontique', items: ['Il faut agir', 'Nous devons réagir', 'Il est urgent d’intervenir'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'reboiser' }, nom: { value: 'reboisement', mark: '0.25' }, adjectif: { value: 'reboisé', mark: '0.25' } },
						{ verbe: { value: 'économiser', mark: '0.25' }, nom: { given: true, value: 'économie' }, adjectif: { value: 'économique / économe', mark: '0.25' } },
						{ verbe: { value: 'protéger', mark: '0.25' }, nom: { value: 'protection', mark: '0.25' }, adjectif: { given: true, value: 'protecteur' } }
					],
					subjTransform: [
						{
							q: 'a) Réécrivez avec « Il faut que nous... » : Nous devons aller vers les autres et unir nos forces.',
							a: 'a) Il faut que nous allions vers les autres et unissions nos forces.'
						},
						{
							q: 'b) Transformez à l’impératif (2e pers. pluriel) : Vous devez respecter le code de la route et vous engager.',
							a: 'b) Respectez le code de la route et engagez-vous !'
						}
					],
					modePrompt: '4. Indiquez la valeur du futur simple dans cette phrase finale d’appel :\n« Si nous agissons unis, nous bâtirons des villes plus propres et plus sûres. »',
					modeAnswer: 'Futur de certitude et de promesse : il encourage l’action en garantissant un résultat positif.',
					easyQ: 'Quel nom correspond au verbe « reboiser » ?',
					easyAns: 'le reboisement',
					easyWrong: ['la reboisation', 'la reboisure', 'la reboisance'],
					medQ: 'Complétez au subjonctif présent : « Il faut que nous .......... vers les autres. » (aller)',
					medAns: 'allions',
					medWrong: ['allons', 'irons', 'aillons'],
					hardQ: 'Transformez correctement à l’impératif (2e pers. plur.) : « Vous devez vous engager ! »',
					hardAns: 'Engagez-vous !',
					hardWrong: ['Vous engagez !', 'Engagez vous sans trait d’union !', 'Engageons-vous !']
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع معجم النداء والأفعال الإنجازية في المشروع الثالث.' })),
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
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع تصريف الأفعال الشاذة في Subjonctif présent بعد Il faut que.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر تصريف Subjonctif présent السليم:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التصريف الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر قواعد صيغة الأمر (حذف الضمير، حذف s في الفوج 1 للمفرد، الشرطة مع الفعل الضمائري).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحويل الدقيق إلى صيغة الأمر:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الدقيق هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Réalisez les activités linguistiques suivantes sur le texte d’Appel (6 points — BAC LP) :',
				content: [
					{
						type: 'text',
						content: chosen.classPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.classCols }),
					{
						type: 'text',
						content: '2. Complétez le tableau de famille de mots :'
					},
					buildFrenchWordFamilyTableBlock(chosen.wordRows),
					{
						type: 'text',
						content: `3. Effectuez les transformations grammaticales demandées :\n${chosen.subjTransform.map((x) => x.q).join('\n')}`,
						answer: chosen.subjTransform.map((x) => x.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.modePrompt,
						answer: chosen.modeAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'conjugaison_temps',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في Subjonctif présent مع nous/vous نضيف i لأفعال الفوج الأول: protégions, allions.',
					'تذكر الشواذ: faire (fasse), savoir (sachent), être (soyez), avoir (ayons).',
					'في الأمر الضمائري نضع الشرطة (-) قبل nous أو vous: Mobilisons-nous ! Engagez-vous !'
				],
				solutionStepsAr: [
					'تصنيف أدوات النداء (1 نقطة).',
					'إكمال جدول الاشتقاق (1.5 نقطة).',
					'التحويل إلى Subjonctif présent و Impératif (2 نقطتان).',
					'تطبيق صيغ الأمر والمنصوب والمستقبل (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Révision transversale BAC LP (Projets 1, 2 & 3)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t3_exp_synthese_bac_lp',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي الشامل (6 نقاط — مراجعة بكالوريا آداب وفلسفة): المشاريع الثلاثة',
		curriculumLessonId: 'fre_lesson_3as_lp_t3_strategie_bac_lp',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					tablePrompt: '1. Classez ces visées communicatives selon le projet correspondant : informer et commémorer - convaincre et réfuter - sensibiliser et exhorter - rendre hommage aux martyrs - défendre une thèse - inciter à reboiser.',
					tableCols: [
						{ header: 'Histoire (P1)', items: ['informer et commémorer', 'rendre hommage aux martyrs'], mark: '0.5' },
						{ header: 'Débat (P2)', items: ['convaincre et réfuter', 'défendre une thèse'], mark: '0.5' },
						{ header: 'Appel (P3)', items: ['sensibiliser et exhorter', 'inciter à reboiser'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Voix passive : « Les volontaires ont planté mille arbres dans la wilaya. »',
							a: 'a) Mille arbres ont été plantés dans la wilaya par les volontaires.'
						},
						{
							q: 'b) Discours indirect : Le responsable déclara : « Nous poursuivrons cette campagne demain. »',
							a: 'b) Le responsable déclara qu’ils poursuivraient cette campagne le lendemain.'
						},
						{
							q: 'c) Concession (Bien que) : Même si la tâche est exigeante, les citoyens restent motivés.',
							a: 'c) Bien que la tâche soit exigeante, les citoyens restent motivés.'
						}
					],
					clozePrompt: '3. Complétez ce résumé méthodologique avec : critique - présent - reformuler - accroche.\nUn compte rendu (1) .......... réussi débute par une (2) .......... complète ; ensuite, il convient de (3) .......... les idées clés au (4) .......... avant d’exprimer un jugement argumenté.',
					clozeAnswer: '1) critique   2) accroche   3) reformuler   4) présent',
					easyQ: 'Quelle visée correspond au Projet 2 (Le débat d’idées) ?',
					easyAns: 'Convaincre et défendre une thèse raisonnée',
					easyWrong: ['Exhorter à une action urgente uniquement', 'Raconter une bataille au passé simple', 'Dresser un inventaire géographique'],
					medQ: 'Transformez à la voix passive : « Les volontaires ont planté mille arbres. »',
					medAns: 'Mille arbres ont été plantés par les volontaires.',
					medWrong: [
						'Mille arbres furent plantés par les volontaires.',
						'Mille arbres ont été planté par les volontaires.',
						'Mille arbres sont plantés par les volontaires.'
					],
					hardQ: 'Repérez la phrase entièrement correcte combinant discours indirect et concordance des temps :',
					hardAns: 'Le responsable déclara qu’ils poursuivraient cette campagne le lendemain.',
					hardWrong: [
						'Le responsable déclara qu’ils poursuivront cette campagne demain.',
						'Le responsable déclara que nous poursuivrions cette campagne le lendemain.',
						'Le responsable déclara qu’ils poursuivaient cette campagne la veille.'
					]
				},
				{
					tablePrompt: '1. Classez ces outils grammaticaux dans la bonne colonne : bien que - afin que - par conséquent - en dépit de - pour - si bien que.',
					tableCols: [
						{ header: 'Concession', items: ['bien que', 'en dépit de'], mark: '0.5' },
						{ header: 'Conséquence', items: ['par conséquent', 'si bien que'], mark: '0.5' },
						{ header: 'But', items: ['afin que', 'pour'], mark: '0.5' }
					],
					rewrites: [
						{
							q: 'a) Impératif (1re pers. plur.) : Il faut que nous soyons solidaires et que nous protégions l’eau.',
							a: 'a) Soyons solidaires et protégeons l’eau !'
						},
						{
							q: 'b) Nominalisation : « On a restauré la Grande Mosquée de Tlemcen. »',
							a: 'b) La restauration de la Grande Mosquée de Tlemcen.'
						},
						{
							q: 'c) Discours indirect : L’enseignante conseilla aux candidats : « Relisez attentivement votre copie ! »',
							a: 'c) L’enseignante conseilla aux candidats de relire attentivement leur copie.'
						}
					],
					clozePrompt: '3. Complétez avec les bons mots : subjonctif - indicatif - nom - infinitif.\nOn emploie le (1) .......... après « bien que », l’(2) .......... après « même si », un (3) .......... après « malgré » et l’(4) .......... après « afin de ».',
					clozeAnswer: '1) subjonctif   2) indicatif   3) nom   4) infinitif',
					easyQ: 'Quel mode emploie-t-on après « même si » ?',
					easyAns: 'L’indicatif',
					easyWrong: ['Le subjonctif', 'L’impératif', 'L’infinitif'],
					medQ: 'Transformez au discours indirect : L’enseignante conseilla aux candidats : « Relisez votre copie ! »',
					medAns: 'L’enseignante conseilla aux candidats de relire leur copie.',
					medWrong: [
						'L’enseignante conseilla aux candidats qu’ils relisent votre copie.',
						'L’enseignante conseilla aux candidats si relire leur copie.',
						'L’enseignante conseilla aux candidats que relire leur copie.'
					],
					hardQ: 'Choisissez la bonne forme à l’impératif (1re pers. plur.) de « être » et « protéger » :',
					hardAns: 'Soyons solidaires et protégeons l’eau !',
					hardWrong: [
						'Sommes solidaires et protégeons l’eau !',
						'Soyons solidaires et protégions l’eau !',
						'Soyez solidaires et protégeons l’eau !'
					]
				}
			];

			const chosen = rng.pick(pool);
			// Fix clean display string in pool[1].rewrites[0].a
			const cleanRewrites = chosen.rewrites.map((r) => ({
				q: r.q,
				a: r.a.replace('Soyons solidaires et protégions -> ', '')
			}));

			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع القاعدة التأسيسية في المراجعة الشاملة للبكالوريا.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح (مراجعة شاملة BAC LP):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من زمن المساعد ومطابقة اسم المفعول أو تحويل الأمر في الخطاب غير المباشر.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التحويل النحوي السليم:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الدقيق هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لتفاصيل التوافق الزمني أو التمييز بين صيغتي الأمر والمنصوب.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الصياغة الكاملة الخالية من الأخطاء:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصياغة الصحيحة هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Synthèse linguistique BAC LP',
				points: 6,
				instruction: 'Révision transversale des trois projets (6 points — BAC LP) :',
				content: [
					{
						type: 'text',
						content: chosen.tablePrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.tableCols }),
					{
						type: 'text',
						content: `2. Effectuez les trois transformations demandées :\n${cleanRewrites.map((r) => r.q).join('\n')}`,
						answer: cleanRewrites.map((r) => r.a).join('\n'),
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
				grade: '3as_lp',
				trimesterId: 't3',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'اربط كل مشروع بغايته التواصلية الخاصة (تاريخي / نقاش / نداء).',
					'تذكر الفروق الحاسمة: bien que + subjonctif | même si + indicatif | malgré + nom | afin de + infinitif.',
					'راجع صيغة الأمر (protégeons، وليس protégions!) في المراجعة النهائية.'
				],
				solutionStepsAr: [
					'تصنيف الغايات أو الروابط في جدول من ثلاث خانات (1.5 نقطة).',
					'إنجاز التحويلات النحوية الثلاثة بدقة (3 نقاط).',
					'إكمال الفقرة المنهجية الناقصة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (7 pts — Integration): Rédiger un Appel ou CRC d’Appel BAC LP
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t3_we_appel_bac_lp',
		grade: '3as_lp',
		trimesterId: 't3',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (7 نقاط — آداب وفلسفة): تحرير نداء ثلاثي البنية أو تقرير نقدي لنداء',
		curriculumLessonId: 'fre_lesson_3as_lp_t3_strategie_bac_lp',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique (environ 150 mots) de l’appel intitulé « Appel citoyen pour préserver chaque goutte d’eau » afin de le publier dans la revue écologique de votre lycée.',
					sujetUnNotes: [
						'Paragraphe 1 (Accroche) : titre, source, type exhortatif, destinataires et visée de l’appel.',
						'Paragraphe 2 (Résumé objectif) : reformuler les trois étapes (constat de pénurie et gaspillage, devoir civique et gestes simples, appel final à l’action).',
						'Paragraphe 3 (Critique constructive) : apprécier la force de mobilisation du « nous inclusif » et la clarté des solutions proposées.'
					],
					sujetDeuxPrompt:
						'Face à la dégradation des forêts et à la pollution des quartiers, rédigez un appel structuré en trois parties (150 à 180 mots) adressé aux jeunes de votre wilaya pour les inciter à participer à une grande campagne de propreté et de reboisement.',
					modelAnswer:
						'Appel aux jeunes de notre wilaya : mobilisons-nous pour une cité propre et verte !\nChers camarades et jeunes de notre wilaya, il suffit de parcourir nos quartiers et nos collines pour dresser un constat alarmant : les déchets plastiques s’accumulent aux abords des routes et nos espaces verts reculent chaque été sous l’effet des incendies et de la négligence.\nIl est pourtant urgent que nous réagissions sans attendre. Un cadre de vie propre et arboré protège notre santé, embellit nos communes et témoigne de notre éducation civique. Il faut que chacun prenne conscience que le changement commence par des gestes concrets : trier les déchets, planter des arbres adaptés à notre climat et veiller sur les espaces publics comme sur notre propre maison.\nC’est pourquoi nous vous appelons toutes et tous à rejoindre la grande campagne volontaire de samedi prochain ! Prenez part à cette initiative, invitez vos voisins et soyons fiers de nos efforts : ensemble, nous bâtirons une wilaya plus saine et plus accueillante pour les générations futures !',
					rubricSummary: 'Structure tripartite de l’Appel (Expositive 1.5 + Argumentative 2 + Exhortative 1.5) + Outils linguistiques (subjonctif, performatif, impératif, nous inclusif : 2).',
					easyQ: 'Quelles sont les trois étapes obligatoires pour rédiger un texte d’Appel réussi au BAC LP ?',
					easyAns: 'Constat négatif (expositive), nécessité d’agir (argumentative) et appel direct (exhortative)',
					easyWrong: [
						'Biographie, chronologie et citation historique',
						'Thèse adverse uniquement sans appel',
						'Liste de mots isolés sans verbes conjugués'
					],
					medQ: 'Quel outil grammatical renforce directement l’engagement collectif dans la 3e partie d’un appel ?',
					medAns: 'L’impératif avec « nous inclusif » et un verbe performatif (« nous vous appelons »)',
					medWrong: ['Le passé simple à la 3e personne', 'La voix passive impersonnelle', 'Le plus-que-parfait'],
					hardQ: 'Pourquoi le titre « Mobilisons-nous pour une cité propre et verte ! » est-il adapté à un texte d’Appel ?',
					hardAns: 'Parce qu’il interpelle immédiatement le lecteur par l’impératif inclusif et annonce clairement la cause défendue',
					hardWrong: [
						'Parce qu’il est totalement neutre et impersonnel',
						'Parce qu’il pose une énigme historique',
						'Parce qu’il interdit toute participation citoyenne'
					]
				},
				{
					sujetUnPrompt:
						'Faites le compte rendu critique (environ 150 mots) de l’appel intitulé « Faisons revivre l’esprit de la Touiza dans nos quartiers ! » destiné aux élèves de votre établissement.',
					sujetUnNotes: [
						'Accroche : type exhortatif, titre, destinataires (lycéens, étudiants, habitants) et visée.',
						'Résumé objectif : reformuler le constat, le rappel de la tradition de la Touiza et l’appel au volontariat.',
						'Critique constructive : évaluer la pertinence de l’ancrage culturel algérien et la tonalité mobilisatrice du texte.'
					],
					sujetDeuxPrompt:
						'Rédigez un appel citoyen structuré en trois parties (150 à 180 mots) pour inviter les lycéens et les habitants de votre quartier à s’unir dans une action solidaire (collecte de livres scolaires et entraide envers les familles nécessiteuses).',
					modelAnswer:
						'Ce texte exhortatif intitulé « Faisons revivre l’esprit de la Touiza dans nos quartiers ! », issu d’un appel associatif algérien, s’adresse aux lycéens, aux étudiants et aux habitants afin de les sensibiliser au recul de l’entraide et de les inciter à s’engager dans le bénévolat.\nDans un premier temps, les auteurs dressent un constat préoccupant : le manque d’entretien des espaces communs, les difficultés de certaines familles modestes et l’affaiblissement des liens de voisinage. Ensuite, ils rappellent la valeur de la Touiza, tradition algérienne d’entraide collective, et démontrent qu’il est nécessaire de l’adapter aujourd’hui à travers le soutien scolaire gratuit, la propreté des cités et l’aide aux aînés. Enfin, ils lancent un appel direct au volontariat hebdomadaire pour redonner chaleur et dignité aux quartiers.\nÀ mon avis, cet appel est particulièrement convaincant car il s’appuie sur un repère culturel cher aux Algériens et mobilise efficacement le lecteur grâce au « nous inclusif ». Toutefois, l’ajout d’un calendrier pratique précis faciliterait encore davantage le passage à l’action.',
					rubricSummary: 'Accroche complète (1.5) + Résumé des trois mouvements de l’appel (2.5) + Critique argumentée fond et forme (1.5) + Qualité linguistique (1.5).',
					easyQ: 'Dans le compte rendu critique d’un Appel, quel type de texte indique-t-on dans l’accroche ?',
					easyAns: 'Un appel (ou un texte exhortatif / argumentatif à visée exhortative)',
					easyWrong: ['Un conte imaginaire', 'Une chronique médiévale', 'Un rapport de laboratoire'],
					medQ: 'Quel temps verbal emploie-t-on pour résumer les étapes de l’appel dans le compte rendu ?',
					medAns: 'Le présent de l’indicatif à la 3e personne',
					medWrong: ['L’impératif à chaque phrase', 'Le passé simple', 'Le plus-que-parfait'],
					hardQ: 'Quelle remarque constructive clôture intelligemment la partie critique sur l’appel à la Touiza ?',
					hardAns: 'Souligner la force culturelle du repère de la Touiza tout en suggérant un calendrier pratique pour faciliter la mobilisation',
					hardWrong: [
						'Dire que la solidarité n’a aucun intérêt',
						'Recopier intégralement le dernier paragraphe de l’appel',
						'Omettre complètement de mentionner la forme du texte'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع خصائص نص النداء ومنهجية التقرير النقدي في المشروع الثالث.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة المنهجية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من الأدوات اللغوية المميزة للنداء أو التقرير النقدي.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الأداة اللغوية المناسبة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الأداة المناسبة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل معايير التميز في بناء النداء أو النقد البنّاء في بكالوريا آداب وفلسفة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد الخيار الأعلى جودة ومنهجية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأمثل هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets au choix (7 points — BAC LP) :',
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
				trimesterId: 't3',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'في تحرير النداء، احرص على وضوح الفقرات الثلاث: التشخيص، الحجاج بالوجوب، ثم التحريض المباشر.',
					'وظّف فعلاً إنجازياً (nous vous appelons)، صيغة وجوب (Il faut que + subjonctif)، وصيغة الأمر بـ nous inclusif.',
					'في التقرير النقدي، قيّم قوة التعبئة ووضوح الحلول المقترحة في الفقرة الثالثة.'
				],
				solutionStepsAr: [
					'احترام البنية الثلاثية للنداء أو للتقرير النقدي (2 نقطتان).',
					'غنى الأفكار ووضوح الحلول والالتزام بالموضوع (2 نقطتان).',
					'توظيف أدوات النداء (الأمر، المنصوب، الفعل الإنجازي، nous inclusif) أو لغة التقرير (1.5 نقطة).',
					'سلامة اللغة، المطابقة، والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
