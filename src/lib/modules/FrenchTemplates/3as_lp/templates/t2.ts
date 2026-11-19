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
 * Parameterized Exam & Quiz Templates — Trimestre 2 : Projet 2 « Le débat d’idées » (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (6 pts) + 1 written_expression (7 pts)
 */
export const TEMPLATES_3AS_LP_T2: FrenchParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Éducation, lecture papier, IA & école numérique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t2_comp_education_numerique',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): نقاش الأفكار حول القراءة الورقية والمدرسة الرقمية',
		curriculumLessonId: 'fre_lesson_3as_lp_t2_confrontation_theses_polyphonie',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Le livre imprimé face à l’écran : concurrence ou complémentarité ?',
					source: 'D’après une revue pédagogique contemporaine',
					paragraphs: [
						'À l’heure des tablettes et des bibliothèques numériques, un débat vif oppose éducateurs et spécialistes de la lecture. Certains partisans du tout-numérique prétendent que le livre imprimé appartiendrait désormais au passé : léger, instantané et peu coûteux, l’écran permettrait de transporter des milliers d’ouvrages dans un seul sac.',
						'Pourtant, de nombreux pédagogues réfutent [[cette prédiction hâtive]]. Certes, les supports numériques facilitent la recherche rapide, mais ils fragmentent souvent l’attention par des notifications constantes. En revanche, la lecture sur papier favorise la mémorisation profonde, la concentration durable et le calme intellectuel indispensables aux études secondaires.',
						'En définitive, loin d’opposer stérilement deux outils, l’école gagne à [[les]] associer intelligemment : le numérique pour documenter et explorer, le livre imprimé pour réfléchir et construire une culture solide.'
					],
					glossary: [
						{ term: 'fragmenter', meaning: 'diviser en morceaux, disperser' },
						{ term: 'stérilement', meaning: 'de manière inutile, sans résultat fécond' }
					],
					tfItems: [
						{ q: 'Les partisans du tout-numérique mettent en avant la légèreté et l’accès instantané de l’écran.', a: 'Vrai', mark: '0.5' },
						{ q: 'Les pédagogues estiment que les écrans suppriment toute forme de distraction.', a: 'Faux', c: 'Ils soulignent que les notifications constantes fragmentent souvent l’attention.', mark: '0.5' },
						{ q: 'La lecture sur papier favorise la concentration durable et la mémorisation profonde.', a: 'Vrai', mark: '0.5' },
						{ q: 'Dans sa conclusion, l’auteur demande d’interdire définitivement tout outil numérique.', a: 'Faux', c: 'Il propose au contraire de les associer intelligemment de manière complémentaire.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez la thèse des partisans du numérique (§1) et la réserve formulée par les pédagogues (§2).', a: 'Partisans : le livre imprimé serait dépassé grâce à la praticité de l’écran. Pédagogues : le papier reste supérieur pour la concentration et la mémorisation.', mark: '1.5' },
						{ q: 'b) Quelle solution équilibrée l’auteur propose-t-il dans le paragraphe 3 ?', a: 'Associer les deux supports : utiliser le numérique pour la recherche rapide et le livre papier pour la réflexion profonde.', mark: '1' }
					],
					refPrompt: 'a) « cette prédiction hâtive » (§2)   b) « les » (§3)',
					refAnswer: 'a) « cette prédiction hâtive » renvoie à l’idée que le livre imprimé appartiendrait au passé.   b) « les » renvoie aux deux outils (le support numérique et le livre imprimé).',
					synthPrompt: 'Pour préparer le baccalauréat, préférez-vous réviser sur des livres imprimés ou sur un écran ? Justifiez votre choix en trois lignes.',
					synthAnswer: 'Personnellement, je préfère réviser mes cours sur des livres et des fiches imprimées car le papier évite la fatigue visuelle et les distractions des notifications. Toutefois, j’utilise ponctuellement le numérique pour vérifier une règle ou consulter des annales corrigées.',
					easyQ: 'Quel avantage du livre imprimé est mis en valeur dans le paragraphe 2 ?',
					easyAns: 'Il favorise la mémorisation profonde et la concentration durable',
					easyWrong: ['Il envoie des notifications constantes', 'Il remplace totalement la recherche', 'Il est impossible à lire au lycée'],
					medQ: 'Pourquoi l’auteur emploie-t-il le conditionnel « appartiendrait » et « permettrait » au paragraphe 1 ?',
					medAns: 'Pour prendre ses distances avec la thèse des partisans du tout-numérique',
					medWrong: ['Pour raconter un fait historique de 1931', 'Pour donner un ordre aux élèves', 'Pour exprimer une certitude absolue'],
					hardQ: 'Quel type de plan argumentatif l’auteur adopte-t-il dans ce texte ?',
					hardAns: 'Un plan dialectique (thèse adverse, réfutation/antithèse, puis synthèse conciliatrice)',
					hardWrong: ['Un récit chronologique historique', 'Une simple description géographique', 'Un appel uniquement injonctif']
				},
				{
					title: 'L’intelligence artificielle : aide scolaire ou menace pour l’effort intellectuel ?',
					source: 'D’après une tribune d’éducation et d’éthique',
					paragraphs: [
						'L’essor fulgurant des assistants d’intelligence artificielle suscite un débat passionné dans les lycées. Pour leurs défenseurs, [[ces programmes]] constituent un tuteur disponible à toute heure : ils expliquent une notion difficile, proposent des exercices d’entraînement et aident l’élève autonome à progresser à son rythme.',
						'Cependant, de nombreux enseignants mettent en garde contre une dérive inquiétante : lorsque l’élève délègue la rédaction entière de ses devoirs à une machine, il renonce à réfléchir, à douter et à construire sa propre pensée. Bien que l’outil produise des réponses fluides, [[il]] ne peut jamais remplacer la maturation personnelle de l’esprit.',
						'Ainsi, le véritable défi n’est pas technologique mais éducatif : former des jeunes honnêtes capables d’utiliser la machine comme un instrument de vérification, jamais comme un substitut à leur propre intelligence.'
					],
					glossary: [
						{ term: 'dérive', meaning: 'écart dangereux par rapport au bon usage' },
						{ term: 'maturation', meaning: 'développement progressif et solide de la pensée' }
					],
					tfItems: [
						{ q: 'Les défenseurs de l’IA apprécient sa disponibilité pour expliquer des notions difficiles.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon les enseignants, confier toute la rédaction à la machine renforce la pensée autonome.', a: 'Faux', c: 'Cela conduit l’élève à renoncer à réfléchir et à construire sa propre pensée.', mark: '0.5' },
						{ q: 'La fluidité d’une réponse produite par une machine suffit à remplacer la maturation personnelle.', a: 'Faux', c: 'L’outil ne peut jamais remplacer la maturation personnelle de l’esprit.', mark: '0.5' },
						{ q: 'L’auteur conclut que le défi principal est d’ordre éducatif et éthique.', a: 'Vrai', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez un avantage reconnu à l’intelligence artificielle (§1) et un danger signalé par les enseignants (§2).', a: 'Avantage : expliquer des notions difficiles et proposer des exercices. Danger : déléguer ses devoirs et renoncer à penser par soi-même.', mark: '1.5' },
						{ q: 'b) Comment l’auteur définit-il le bon usage de l’IA au paragraphe 3 ?', a: 'Un instrument de vérification au service d’élèves honnêtes, et non un substitut à leur propre intelligence.', mark: '1' }
					],
					refPrompt: 'a) « ces programmes » (§1)   b) « il » (§2)',
					refAnswer: 'a) « ces programmes » renvoie aux assistants d’intelligence artificielle.   b) « il » renvoie à l’outil (l’intelligence artificielle).',
					synthPrompt: 'Selon vous, comment un lycéen responsable doit-il utiliser les outils numériques dans ses études ? Répondez en trois lignes.',
					synthAnswer: 'Un lycéen responsable commence toujours par réfléchir et rédiger son travail par lui-même avant de consulter un outil numérique. En effet, seule la pratique personnelle forge la maîtrise réelle nécessaire le jour de l’examen.',
					easyQ: 'Quel risque pédagogique majeur les enseignants dénoncent-ils dans le paragraphe 2 ?',
					easyAns: 'Déléguer entièrement ses devoirs et renoncer à réfléchir par soi-même',
					easyWrong: ['Le manque de livres en papier', 'L’absence totale d’électricité', 'La lenteur de la correction'],
					medQ: 'Quel rapport logique est introduit par « Bien que » dans le deuxième paragraphe ?',
					medAns: 'La concession (suivie du subjonctif « produise »)',
					medWrong: ['La cause directe', 'La conséquence', 'Le but'],
					hardQ: 'Quelle est la thèse finale défendue par l’auteur au paragraphe 3 ?',
					hardAns: 'L’IA doit rester un outil éthique de vérification et non un remplaçant de l’intelligence humaine',
					hardWrong: [
						'L’IA doit rédiger tous les devoirs des lycéens',
						'Il faut supprimer tous les professeurs du lycée',
						'La réflexion personnelle n’a plus d’utilité'
					]
				},
				{
					title: 'L’enseignement à distance peut-il remplacer la classe ?',
					source: 'D’après un dossier sur la pédagogie moderne',
					paragraphs: [
						'Depuis quelques années, les plateformes d’enseignement à distance se multiplient et alimentent une vive réflexion. D’un côté, leurs adeptes vantent leur souplesse : [[elles]] permettent aux étudiants éloignés des grands centres de suivre des cours enregistrés sans frais de transport et de revoir une leçon autant de fois que nécessaire.',
						'D’un autre côté, les sociologues et les enseignants rappellent que l’école n’est pas un simple distributeur de fichiers. La présence physique dans une classe crée un dialogue vivant, stimule l’émulation saine entre camarades et permet au professeur de percevoir immédiatement le découragement ou l’incompréhension d’un élève.',
						'Certes, les cours en ligne représentent un appui précieux en cas d’empêchement, mais [[le lien humain]] au sein de la salle de classe demeure le véritable moteur de l’éducation.'
					],
					glossary: [
						{ term: 'émulation', meaning: 'encouragement positif à progresser au contact des autres' },
						{ term: 'empêchement', meaning: 'obstacle empêchant de se déplacer ou d’assister' }
					],
					tfItems: [
						{ q: 'Les plateformes à distance aident les étudiants éloignés à suivre des cours sans déplacement.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon les enseignants, la salle de classe se réduit à un simple distributeur de fichiers.', a: 'Faux', c: 'Ils rappellent que l’école n’est pas un simple distributeur de fichiers mais un lieu de dialogue vivant.', mark: '0.5' },
						{ q: 'En présence physique, le professeur repère plus facilement l’incompréhension d’un élève.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur rejette complètement l’utilité des cours en ligne même en cas d’empêchement.', a: 'Faux', c: 'Il reconnaît qu’ils représentent un appui précieux en cas d’empêchement.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Relevez deux arguments en faveur de la classe présentielle dans le paragraphe 2.', a: 'Elle crée un dialogue vivant, stimule l’émulation entre camarades et permet au professeur de détecter immédiatement les difficultés.', mark: '1.5' },
						{ q: 'b) Quel procédé argumentatif l’auteur utilise-t-il dans la phrase finale (« Certes..., mais... ») ?', a: 'La concession suivie de la réfutation (ou nuance) pour reconnaître un avantage avant d’affirmer la primauté du lien humain.', mark: '1' }
					],
					refPrompt: 'a) « elles » (§1)   b) « le lien humain » (§3)',
					refAnswer: 'a) « elles » renvoie aux plateformes d’enseignement à distance.   b) « le lien humain » renvoie au dialogue vivant entre professeur et élèves en classe.',
					synthPrompt: 'Partagez-vous l’avis de l’auteur sur l’importance irremplaçable de la salle de classe ? Justifiez en trois lignes.',
					synthAnswer: 'Oui, je partage entièrement ce point de vue car la classe apprend non seulement les savoirs scolaires mais aussi le respect, l’écoute et la discipline collective. L’écran reste un complément utile, mais rien ne remplace le regard bienveillant d’un enseignant.',
					easyQ: 'Quel avantage pratique des cours à distance est mentionné au paragraphe 1 ?',
					easyAns: 'Suivre des cours sans déplacement et revoir une leçon plusieurs fois',
					easyWrong: ['Remplacer totalement le professeur par un écran vide', 'Supprimer tous les examens écrits', 'Interdire le dialogue entre élèves'],
					medQ: 'À quoi renvoie le pronom « elles » dans le paragraphe 1 ?',
					medAns: 'Les plateformes d’enseignement à distance',
					medWrong: ['Les grandes villes', 'Les sociologues', 'Les salles de classe'],
					hardQ: 'Quelle est la position nuancée finale de l’auteur au paragraphe 3 ?',
					hardAns: 'Les cours en ligne sont un appui utile, mais le lien humain en classe reste le moteur irremplaçable de l’éducation',
					hardWrong: [
						'Les classes physiques doivent disparaître immédiatement',
						'Internet n’a aucune utilité éducative',
						'Seuls les sociologues doivent enseigner'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'اقرأ الفقرتين الأولى والثانية لاستخراج الحجة الصريحة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Débat BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعلومة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لقيمة الأداة النحوية أو المرجع الدقيق في النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analyse BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل اللغوي أو المرجعي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'افحص الفقرة الثالثة للتعرف على موقف الكاتب النهائي وهيكلة النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Synthèse BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الأطروحة النهائية أو منهجية الحجاج:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — A) Lecture et analyse',
				points: 7,
				instruction: 'Lisez attentivement ce texte de débat d’idées puis répondez aux questions (7 points — BAC LP) :',
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
								header: '1. Ce texte appartient au genre du :',
								options: ['Débat d’idées (texte argumentatif)', 'Récit historique', 'Mode d’emploi technique'],
								correct: 'Débat d’idées (texte argumentatif)',
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
						content: `4. À quoi renvoient les expressions soulignées ?\n${chosen.refPrompt}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'ميّز بين أطروحة الخصوم في الفقرة الأولى وأطروحة الكاتب بعد رابط التعارض (Pourtant / Cependant).',
					'علّل إجابات Faux بالعودة المباشرة إلى الحجج المذكورة في النص.',
					'في سؤال التركيب، عبّر عن رأي متوازن مع حجة ومثال وجيز.'
				],
				solutionStepsAr: [
					'تحديد نوع النص الحجاجي (0.5 نقطة).',
					'التثبت من الصواب والخطأ مع التعليل (2 نقطتان).',
					'استخراج الأطروحات والحجج والحل المقترح (2.5 نقطة).',
					'فك الإحالة النصية وتحرير التركيب الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Progrès technique, valeurs morales & solidarité civique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t2_comp_progres_valeurs_civiques',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'comprehension_ecrit',
		titleAr: 'فهم المكتوب (7 نقاط — آداب وفلسفة): التقدم التقني والقيم الأخلاقية والتكافل الاجتماعي',
		curriculumLessonId: 'fre_lesson_3as_lp_t2_modalisateurs_figures_opposition',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Le progrès technique a-t-il besoin d’une boussole morale ?',
					source: 'D’après un essai d’éthique et de civisme',
					paragraphs: [
						'Nul ne peut nier les bienfaits considérables du progrès technique : les transports rapides rapprochent les villes, la médecine moderne soigne des maladies autrefois incurables et les énergies propres ouvrent de nouveaux horizons. Certains observateurs en concluent que la technique suffirait à assurer le bonheur humain.',
						'Or, une observation lucide du monde contemporain montre les limites de [[cette vision optimiste]]. Sans responsabilité morale, les mêmes inventions peuvent aggraver la pollution, encourager le gaspillage ou porter atteinte à la vie privée. Comme le rappelaient déjà les grands savants musulmans tels qu’Al-Zahrawi et Ibn Al-Haytham, le savoir authentique doit toujours servir la dignité humaine et la droiture.',
						'Ainsi, loin de freiner la créativité, les valeurs éthiques [[lui]] donnent un sens noble : la technique indique comment agir, mais la morale éclaire pourquoi et pour qui agir.'
					],
					glossary: [
						{ term: 'boussole morale', meaning: 'ensemble de valeurs guidant les choix vers le bien' },
						{ term: 'droiture', meaning: 'honnêteté et rectitude dans la conduite' }
					],
					tfItems: [
						{ q: 'L’auteur reconnaît que le progrès technique a apporté des bienfaits en médecine et en transport.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur partage entièrement l’idée que la technique suffit seule à garantir le bonheur.', a: 'Faux', c: 'Il montre les limites de cette vision et insiste sur la nécessité de la responsabilité morale.', mark: '0.5' },
						{ q: 'Les savants Al-Zahrawi et Ibn Al-Haytham sont cités pour illustrer le lien entre science et éthique.', a: 'Vrai', mark: '0.5' },
						{ q: 'Selon le paragraphe 3, les valeurs éthiques bloquent et détruisent la créativité scientifique.', a: 'Faux', c: 'Loin de freiner la créativité, les valeurs éthiques lui donnent un sens noble.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Citez deux dangers d’un progrès technique coupé de la morale (§2).', a: 'L’aggravation de la pollution, l’encouragement du gaspillage ou l’atteinte à la vie privée (deux au choix).', mark: '1.5' },
						{ q: 'b) Expliquez l’opposition finale : « la technique indique comment agir, mais la morale éclaire pourquoi et pour qui agir » (§3).', a: 'La technique fournit les moyens pratiques, tandis que la morale fixe la finalité juste et le respect de l’être humain.', mark: '1' }
					],
					refPrompt: 'a) « cette vision optimiste » (§2)   b) « lui » (§3)',
					refAnswer: 'a) « cette vision optimiste » renvoie à l’idée que la technique suffirait à assurer le bonheur humain.   b) « lui » renvoie à la créativité.',
					synthPrompt: 'Pensez-vous que les valeurs morales doivent accompagner toute innovation scientifique ? Justifiez en trois lignes.',
					synthAnswer: 'Oui, car une innovation privée d’éthique peut devenir nuisible à l’environnement ou à l’homme. En guidant la recherche par l’honnêteté et la responsabilité, la morale garantit que la science reste un bienfait pour la société.',
					easyQ: 'Quels deux savants musulmans l’auteur cite-t-il en exemple dans le paragraphe 2 ?',
					easyAns: 'Al-Zahrawi et Ibn Al-Haytham',
					easyWrong: ['Ibn Battouta et Al-Idrisi', 'Cheikh Tebessi et Moufdi Zakaria', 'Larbi Ben M’hidi et Didouche Mourad'],
					medQ: 'Quelle figure de style apparaît dans « la technique indique comment agir, mais la morale éclaire pourquoi agir » ?',
					medAns: 'Un parallélisme de construction doublé d’une opposition (antithèse)',
					medWrong: ['Une onomatopée', 'Une antiphrase moqueuse', 'Une chronologie au passé simple'],
					hardQ: 'Pourquoi l’auteur commence-t-il par « Nul ne peut nier les bienfaits du progrès technique » avant de le nuancer ?',
					hardAns: 'C’est une stratégie de concession qui renforce sa crédibilité avant d’exposer la nécessité de la morale',
					hardWrong: [
						'Parce qu’il veut rejeter toute médecine moderne',
						'Parce qu’il hésite et n’a aucune thèse',
						'Parce qu’il raconte une biographie'
					]
				},
				{
					title: 'Vie urbaine moderne et solidarité de voisinage : un équilibre à préserver',
					source: 'D’après une chronique sociale algérienne',
					paragraphs: [
						'Dans les grandes villes modernes, le rythme de vie s’accélère et modifie profondément les relations humaines. Certains affirment que l’individualisme serait le prix inévitable du confort urbain : chacun travaillerait pour sa réussite personnelle sans avoir le temps de connaître ses voisins.',
						'Pourtant, de nombreux sociologues contestent [[cette fatalité]]. L’histoire des cités algériennes, de la Casbah d’Alger à la Vallée du M’Zab, prouve qu’une vie urbaine dense peut parfaitement s’allier à une entraide chaleureuse. Lorsque la solidarité recule, l’isolement grandit et les plus vulnérables en souffrent les premiers.',
						'En somme, la modernité véritable ne consiste pas à ériger des murs invisibles entre les familles, mais à renouveler [[cet esprit d’entraide]] par des associations de quartier, la courtoisie quotidienne et le respect du bien commun.'
					],
					glossary: [
						{ term: 'fatalité', meaning: 'caractère supposé inévitable d’un phénomène' },
						{ term: 'bien commun', meaning: 'espaces et ressources partagés par tous les citoyens' }
					],
					tfItems: [
						{ q: 'Selon certains, le confort urbain entraînerait inévitablement l’individualisme.', a: 'Vrai', mark: '0.5' },
						{ q: 'L’auteur cite la Casbah d’Alger et la Vallée du M’Zab comme exemples d’entraide urbaine.', a: 'Vrai', mark: '0.5' },
						{ q: 'Le recul de la solidarité n’a aucun effet sur les personnes vulnérables.', a: 'Faux', c: 'L’isolement grandit et les plus vulnérables en souffrent les premiers.', mark: '0.5' },
						{ q: 'Pour l’auteur, la modernité impose de rompre tout lien avec ses voisins.', a: 'Faux', c: 'La modernité véritable consiste au contraire à renouveler l’esprit d’entraide et la courtoisie.', mark: '0.5' }
					],
					openQuestions: [
						{ q: 'a) Par quel exemple concret tiré du patrimoine algérien l’auteur réfute-t-il l’idée que la ville tue la solidarité (§2) ?', a: 'Il cite l’exemple historique de la Casbah d’Alger et de la Vallée du M’Zab où la densité urbaine s’alliait à l’entraide.', mark: '1.5' },
						{ q: 'b) Quels moyens concrets propose-t-il au paragraphe 3 pour entretenir la solidarité aujourd’hui ?', a: 'Les associations de quartier, la courtoisie quotidienne et le respect du bien commun.', mark: '1' }
					],
					refPrompt: 'a) « cette fatalité » (§2)   b) « cet esprit d’entraide » (§3)',
					refAnswer: 'a) « cette fatalité » renvoie à l’idée que l’individualisme serait le prix inévitable de la vie urbaine moderne.   b) « cet esprit d’entraide » renvoie à la solidarité de voisinage.',
					synthPrompt: 'Comment les jeunes d’un quartier peuvent-ils renforcer concrètement la solidarité de voisinage ? Proposez deux idées en trois lignes.',
					synthAnswer: 'D’une part, les jeunes peuvent organiser des campagnes volontaires de propreté et de plantation d’arbres dans leur cité. D’autre part, ils peuvent rendre service aux personnes âgées et animer des séances de soutien scolaire gratuit pour les plus jeunes.',
					easyQ: 'Quels deux lieux algériens illustrent l’alliance entre vie urbaine et entraide (§2) ?',
					easyAns: 'La Casbah d’Alger et la Vallée du M’Zab',
					easyWrong: ['Timgad et le Jardin d’Essai', 'Les Aurès et la Soummam', 'Cordoue et Bagdad'],
					medQ: 'Que désigne l’expression métaphorique « ériger des murs invisibles » au paragraphe 3 ?',
					medAns: 'L’isolement social et l’indifférence entre les voisins',
					medWrong: ['Construire réellement une clôture en pierre', 'Protéger un monument ancien', 'Tracer une route nationale'],
					hardQ: 'Quelle est la visée communicative de ce texte ?',
					hardAns: 'Convaincre le lecteur que la modernité urbaine doit rester solidaire et respectueuse du voisinage',
					hardWrong: [
						'Encourager l’individualisme dans les villes',
						'Raconter un combat historique de 1957',
						'Présenter le plan architectural d’un pont'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'عد إلى الفقرة الثانية للتثبت من الأمثلة الواردة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Compréhension BAC LP (« ${chosen.title} ») : ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المثال المذكور في النص هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل الصورة البلاغية أو التعبير المجازي في الفقرة الثالثة.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Style et sens BAC LP (« ${chosen.title} ») : ${chosen.medQ}`,
					questionTextAr: 'حدد التحليل الأسلوبي أو الدلالي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'استخلص استراتيجية الكاتب الحجاجية وغايته العامة من النص.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Argumentation BAC LP (« ${chosen.title} ») : ${chosen.hardQ}`,
					questionTextAr: 'استنتج الاستراتيجية الحجاجية أو الغاية التواصلية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
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
								header: '1. Dans ce texte, l’auteur cherche principalement à :',
								options: [
									'Convaincre par des arguments raisonnés et des exemples',
									'Raconter un voyage géographique au Moyen Âge',
									'Donner une liste d’ordres médicaux'
								],
								correct: 'Convaincre par des arguments raisonnés et des exemples',
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
						content: `4. Précisez à qui ou à quoi renvoient les termes soulignés :\n${chosen.refPrompt}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'comprehension_ecrit',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع الروابط المنطقية (Or, Pourtant, Ainsi, En somme) لضبط انتقال الكاتب بين الأطروحتين.',
					'انتبه للمثال التراثي الذي يستند إليه الكاتب كحجة واقعية.',
					'في سؤال التركيب، قدم فكرتين عمليتين بلغة سليمة.'
				],
				solutionStepsAr: [
					'تحديد الغاية الإقناعية للنص (0.5 نقطة).',
					'تصحيح عبارات الصواب والخطأ (2 نقطتان).',
					'تحليل الحجج والأمثلة (2.5 نقطة).',
					'الإحالة النصية والتركيب الشخصي (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (6 pts): Concession (subjonctif), connecteurs logiques & lexique
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t2_exp_concession_connecteurs',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'grammaire_syntaxe',
		titleAr: 'البناء اللغوي (6 نقاط — آداب وفلسفة): الاستدراك والمنصوب، الروابط المنطقية وعائلة الكلمات',
		curriculumLessonId: 'fre_lesson_3as_lp_t2_concession_refutation',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					classPrompt: '1. Classez ces arguments dans le tableau (Pour le numérique / Limites du numérique) : accès rapide - dispersion de l’attention - légèreté des supports - fatigue visuelle.',
					classCols: [
						{ header: 'Arguments favorables', items: ['accès rapide', 'légèreté des supports'], mark: '0.5' },
						{ header: 'Limites et risques', items: ['dispersion de l’attention', 'fatigue visuelle'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'argumenter' }, nom: { value: 'argumentation / argument', mark: '0.25' }, adjectif: { value: 'argumentatif', mark: '0.25' } },
						{ verbe: { value: 'réfuter', mark: '0.25' }, nom: { given: true, value: 'réfutation' }, adjectif: { value: 'réfuté / réfutable', mark: '0.25' } },
						{ verbe: { value: 'persuader', mark: '0.25' }, nom: { value: 'persuasion', mark: '0.25' }, adjectif: { given: true, value: 'persuasif' } }
					],
					rewrites: [
						{
							q: 'a) Réécrivez avec « Bien que » : Même si les écrans sont rapides, ils fatiguent la concentration.',
							a: 'a) Bien que les écrans soient rapides, ils fatiguent la concentration.'
						},
						{
							q: 'b) Réécrivez avec « En dépit de » : Quoique cette innovation soit utile, elle exige une vigilance morale.',
							a: 'b) En dépit de l’utilité de cette innovation, elle exige une vigilance morale.'
						}
					],
					logicPrompt: '4. Reliez les phrases en exprimant le rapport demandé :\na) Les élèves lisent régulièrement. Ils maîtrisent mieux la rédaction. (Conséquence : par conséquent)\nb) Les professeurs expliquent la méthode. Les candidats réussissent leur essai. (But : afin que)',
					logicAnswer: 'a) Les élèves lisent régulièrement ; par conséquent, ils maîtrisent mieux la rédaction.\nb) Les professeurs expliquent la méthode afin que les candidats réussissent leur essai.',
					easyQ: 'Quel adjectif appartient à la même famille que le verbe « argumenter » ?',
					easyAns: 'argumentatif',
					easyWrong: ['argumentation', 'argumenterie', 'argumentage'],
					medQ: 'Complétez correctement : « Bien que les écrans .......... rapides, ils fatiguent la concentration. »',
					medAns: 'soient',
					medWrong: ['sont', 'seront', 'étaient'],
					hardQ: 'Transformez avec « afin que » : « Les professeurs expliquent la méthode. Les élèves comprennent le plan. »',
					hardAns: 'Les professeurs expliquent la méthode afin que les élèves comprennent le plan.',
					hardWrong: [
						'Les professeurs expliquent la méthode afin de les élèves comprennent le plan.',
						'Les professeurs expliquent la méthode afin que comprendre le plan.',
						'Les professeurs expliquent la méthode grâce aux élèves comprennent le plan.'
					]
				},
				{
					classPrompt: '1. Classez ces expressions en deux colonnes : partisans - sceptiques - approuver - contester - défenseurs - détracteurs.',
					classCols: [
						{ header: 'Champ lexical de l’adhésion', items: ['partisans', 'approuver', 'défenseurs'], mark: '0.5' },
						{ header: 'Champ lexical de l’opposition', items: ['sceptiques', 'contester', 'détracteurs'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'convaincre' }, nom: { value: 'conviction', mark: '0.25' }, adjectif: { value: 'convaincant / convaincu', mark: '0.25' } },
						{ verbe: { value: 'concéder', mark: '0.25' }, nom: { given: true, value: 'concession' }, adjectif: { value: 'concessif', mark: '0.25' } },
						{ verbe: { value: 'éduquer', mark: '0.25' }, nom: { value: 'éducation', mark: '0.25' }, adjectif: { given: true, value: 'éducatif' } }
					],
					rewrites: [
						{
							q: 'a) Réécrivez avec « Quoique » : Même si la machine a une grande mémoire, elle ignore la morale.',
							a: 'a) Quoique la machine ait une grande mémoire, elle ignore la morale.'
						},
						{
							q: 'b) Remplacez « Certes... mais » par « Malgré » : Certes, le temps manque, mais les voisins s’entraident.',
							a: 'b) Malgré le manque de temps, les voisins s’entraident.'
						}
					],
					logicPrompt: '4. Exprimez le rapport logique indiqué :\na) Cet élève a progressé. Son travail est sérieux. (Cause nominale : grâce à)\nb) La technologie reste un outil fiable. Elle doit être encadrée par l’éthique. (Concession : même si)',
					logicAnswer: 'a) Cet élève a progressé grâce à son travail sérieux.\nb) Même si la technologie reste un outil fiable, elle doit être encadrée par l’éthique.',
					easyQ: 'Quel est le nom dérivé du verbe « convaincre » ?',
					easyAns: 'la conviction',
					easyWrong: ['le convainquement', 'la convaincance', 'le convaincage'],
					medQ: 'Complétez avec le bon mode verbal : « Quoique la machine .......... une grande mémoire, elle ignore la morale. »',
					medAns: 'ait',
					medWrong: ['a', 'aura', 'avait'],
					hardQ: 'Choisissez la transformation correcte avec « Malgré » : « Certes, le temps manque, mais les voisins s’entraident. »',
					hardAns: 'Malgré le manque de temps, les voisins s’entraident.',
					hardWrong: [
						'Malgré de le manque de temps, les voisins s’entraident.',
						'Malgré que le temps manque, les voisins s’entraident.',
						'Malgré le temps manquant que, les voisins s’entraident.'
					]
				},
				{
					classPrompt: '1. Classez ces termes dans la colonne appropriée : probité - gaspillage - solidarité - individualisme - droiture - indifférence.',
					classCols: [
						{ header: 'Valeurs civiques positives', items: ['probité', 'solidarité', 'droiture'], mark: '0.5' },
						{ header: 'Comportements à combattre', items: ['gaspillage', 'individualisme', 'indifférence'], mark: '0.5' }
					],
					wordRows: [
						{ verbe: { given: true, value: 'réfléchir' }, nom: { value: 'réflexion', mark: '0.25' }, adjectif: { value: 'réfléchi', mark: '0.25' } },
						{ verbe: { value: 'progresser', mark: '0.25' }, nom: { given: true, value: 'progrès / progression' }, adjectif: { value: 'progressif', mark: '0.25' } },
						{ verbe: { value: 'nuancer', mark: '0.25' }, nom: { value: 'nuance', mark: '0.25' }, adjectif: { given: true, value: 'nuancé' } }
					],
					rewrites: [
						{
							q: 'a) Réécrivez avec « Bien que » : Ils peuvent consulter Internet, pourtant ils vérifient dans les livres.',
							a: 'a) Bien qu’ils puissent consulter Internet, ils vérifient dans les livres.'
						},
						{
							q: 'b) Remplacez « parce que » par « à cause de » : L’élève perd sa concentration parce que les notifications se multiplient.',
							a: 'b) L’élève perd sa concentration à cause de la multiplication des notifications.'
						}
					],
					logicPrompt: '4. Identifiez le rapport logique exprimé dans chaque phrase :\na) Il s’entraîne chaque soir afin de maîtriser la dissertation.\nb) Le débat fut constructif si bien que chacun enrichit son point de vue.',
					logicAnswer: 'a) Rapport de but (afin de + infinitif).   b) Rapport de conséquence (si bien que).',
					easyQ: 'Dans « Il s’entraîne chaque soir afin de maîtriser la dissertation », quel rapport exprime « afin de » ?',
					easyAns: 'Le but',
					easyWrong: ['La cause', 'La concession', 'La comparaison'],
					medQ: 'Mettez le verbe au subjonctif présent : « Bien qu’ils (pouvoir) consulter Internet, ils vérifient dans les livres. »',
					medAns: 'puissent',
					medWrong: ['peuvent', 'pourront', 'pouvaient'],
					hardQ: 'Comment transformer « parce que les notifications se multiplient » en cause nominale négative ?',
					hardAns: 'à cause de la multiplication des notifications',
					hardWrong: [
						'grâce à la multiplication des notifications',
						'à cause que les notifications se multiplient',
						'malgré la multiplication des notifications'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع عائلة الكلمات أو دلالة الرابط المنطقي في المشروع الثاني.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر أن bien que و quoique تتطلبان دائماً صيغة Subjonctif!' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التصريف الصحيح في صيغة المنصوب (Subjonctif):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التصريف الصحيح في Subjonctif présent هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لقواعد التسمية بعد malgré / à cause de والفرق بين afin de و afin que.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الصياغة النحوية السليمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصياغة السليمة هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Faites les exercices de langue suivants avec rigueur (6 points — BAC LP) :',
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
						content: `3. Réécrivez les phrases suivantes selon la consigne :\n${chosen.rewrites.map((r) => r.q).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.a).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.logicPrompt,
						answer: chosen.logicAnswer,
						mark: '1.5'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'grammaire_syntaxe',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'بعد bien que و quoique نضع الفعل في Subjonctif (soit, ait, puisse)، وبعد même si نبقيه في Indicatif.',
					'بعد malgré و en dépit de و à cause de نضع مجموعة اسمية فقط بلا فعل مصرف.',
					'ميّز بين afin de (نفس الفاعل + مصدر) و afin que (فاعلان مختلفان + subjonctif).'
				],
				solutionStepsAr: [
					'تصنيف الحجج أو المعجم الحجاجي (1 نقطة).',
					'إكمال جدول عائلة الكلمات (1.5 نقطة).',
					'إعادة الكتابة في الاستدراك والتسمية (2 نقطتان).',
					'تحديد وتوظيف روابط السبب والنتيجة والغاية (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (6 pts): Modalisateurs, figures d’opposition & substitution
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t2_exp_modalisation_anaphore',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'discours_rhetorique',
		titleAr: 'البناء اللغوي (6 نقاط — آداب وفلسفة): الموجهات التعبيرية، صور التقابل، والإحالة النصية',
		curriculumLessonId: 'fre_lesson_3as_lp_t2_connecteurs_logiques_anaphore',
		defaultPoints: 6,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					modPrompt: '1. Classez ces modalisateurs en deux colonnes : assurément - peut-être - indéniablement - il semble que - sans aucun doute - probablement.',
					modCols: [
						{ header: 'Modalisateurs de certitude', items: ['assurément', 'indéniablement', 'sans aucun doute'], mark: '0.75' },
						{ header: 'Modalisateurs de doute / nuance', items: ['peut-être', 'il semble que', 'probablement'], mark: '0.75' }
					],
					figPrompt: '2. Identifiez la figure de style dans chaque énoncé et précisez son effet :\na) « Le savoir éclaire les esprits tandis que l’ignorance les aveugle. »\nb) « Sans effort, pas de progrès ; sans discipline, pas de réussite. »',
					figAnswer: 'a) Antithèse (savoir/ignorance, éclaire/aveugle) : met en relief la supériorité de la connaissance.\nb) Parallélisme de construction : renforce le rythme et la force de conviction de la maxime.',
					subPrompt: '3. Remplacez les répétitions par le pronom qui convient (en / y / lui) :\na) Le débat porte sur l’éthique ; les lycéens parlent souvent de l’éthique.\nb) La bibliothèque est calme ; les candidats révisent à la bibliothèque.',
					subAnswer: 'a) Le débat porte sur l’éthique ; les lycéens en parlent souvent.\nb) La bibliothèque est calme ; les candidats y révisent.',
					clozePrompt: '4. Complétez ce bilan de débat avec : nuance - arguments - thèse - exemples.\nPour défendre efficacement sa (1) .......... , l’auteur avance des (2) .......... solides illustrés par des (3) .......... concrets, tout en faisant preuve de (4) .......... envers l’avis adverse.',
					clozeAnswer: '1) thèse   2) arguments   3) exemples   4) nuance',
					easyQ: 'Quel pronom remplace « de l’éthique » dans « les lycéens parlent de l’éthique » ?',
					easyAns: 'en (les lycéens en parlent)',
					easyWrong: ['y (les lycéens y parlent)', 'la (les lycéens la parlent)', 'lui (les lycéens lui parlent)'],
					medQ: 'Quelle figure de style oppose « éclaire » et « aveugle » dans une même phrase ?',
					medAns: 'Une antithèse',
					medWrong: ['Une comparaison', 'Une énumération', 'Une périphrase géographique'],
					hardQ: 'Quel est l’effet du parallélisme « Sans effort, pas de progrès ; sans discipline, pas de réussite » ?',
					hardAns: 'Créer un rythme équilibré qui rend l’argument plus mémorable et plus persuasif',
					hardWrong: [
						'Introduire un doute sur la valeur de l’effort',
						'Raconter un fait passé au passé simple',
						'Supprimer la relation logique entre les mots'
					]
				},
				{
					modPrompt: '1. Répartissez ces termes évaluatifs en deux colonnes : fécond - néfaste - précieux - stérile - constructif - nuisible.',
					modCols: [
						{ header: 'Lexique mélioratif (+)', items: ['fécond', 'précieux', 'constructif'], mark: '0.75' },
						{ header: 'Lexique péjoratif (-)', items: ['néfaste', 'stérile', 'nuisible'], mark: '0.75' }
					],
					figPrompt: '2. Nommez le procédé stylistique employé dans chaque phrase :\na) « L’outil numérique est un bon serviteur mais un mauvais maître. »\nb) « Quelle admirable preuve de maturité que de copier un devoir sans le lire ! »',
					figAnswer: 'a) Antithèse (bon serviteur / mauvais maître).\nb) Ironie / antiphrase (éloge apparent pour critiquer la tricherie).',
					subPrompt: '3. Évitez la répétition en employant un pronom (le / leur / dont) :\na) Les professeurs guident les jeunes ; nous devons remercier les professeurs.\nb) Voici une valeur essentielle ; tous les citoyens ont besoin de cette valeur.',
					subAnswer: 'a) Les professeurs guident les jeunes ; nous devons les remercier.\nb) Voici une valeur essentielle dont tous les citoyens ont besoin.',
					clozePrompt: '4. Complétez avec les connecteurs convenables : Certes - mais - En effet - Donc.\n(1) .......... , Internet offre une information abondante, (2) .......... il exige un esprit critique. (3) .......... , de nombreuses fausses nouvelles circulent chaque jour ; il faut (4) .......... vérifier ses sources.',
					clozeAnswer: '1) Certes   2) mais   3) En effet   4) donc',
					easyQ: 'Quel pronom relatif remplace un complément introduit par « de » (avoir besoin de cette valeur) ?',
					easyAns: 'dont',
					easyWrong: ['où', 'qui', 'lequel'],
					medQ: 'Dans « Quelle admirable preuve de maturité que de copier sans lire ! », quel procédé identifiez-vous ?',
					medAns: 'L’ironie (antiphrase) visant à critiquer la facilité',
					medWrong: ['Un éloge sincère de la copie', 'Un constat neutre sans jugement', 'Une simple définition du dictionnaire'],
					hardQ: 'Lequel de ces ensembles ne contient que des adjectifs péjoratifs ?',
					hardAns: 'néfaste, stérile, nuisible',
					hardWrong: ['fécond, précieux, néfaste', 'constructif, stérile, précieux', 'précieux, fécond, constructif']
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'تذكر قاعدة الضمائر البديلة: en مع de، و y مع المكان/à، و dont للوصل مع de.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الضمير البديل الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الضمير الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع الفرق بين الطباق (antithèse) والتوازي (parallélisme) والسخرية (ironie).' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'حدد الصورة البلاغية أو الأسلوبية بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحديد الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'انتبه لقيمة الصورة البلاغية أو دلالة المعجم القدحي والممدوح.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحليل الأسلوبي أو المعجمي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'I. Compréhension de l’écrit — B) Fonctionnement de la langue',
				points: 6,
				instruction: 'Traitez les activités de langue et de style ci-dessous (6 points — BAC LP) :',
				content: [
					{
						type: 'text',
						content: chosen.modPrompt
					},
					buildFrenchClassificationTableBlock({ columns: chosen.modCols }),
					{
						type: 'text',
						content: chosen.figPrompt,
						answer: chosen.figAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: chosen.subPrompt,
						answer: chosen.subAnswer,
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
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'discours_rhetorique',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'افصل بين موجهات اليقين والشك، وبين الألفاظ الممدوحة (+) والمذمومة (-).',
					'في الطباق (Antithèse) نبحث عن كلمتين متضادتين؛ وفي التوازي (Parallélisme) عن بنية نحوية متكررة.',
					'راجع حرف الجر الذي يرافق الفعل قبل اختيار الضمير البديل (en / y / dont / les).'
				],
				solutionStepsAr: [
					'تصنيف الموجهات أو المعجم التقييمي (1.5 نقطة).',
					'تحديد الصور البلاغية وبيان أثرها (1.5 نقطة).',
					'توظيف الضمائر البديلة لمنع التكرار (1.5 نقطة).',
					'إكمال الفقرة الحجاجية المتسقة (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (7 pts — Integration): Essai argumentatif / CRC de débat
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'fre_tpl_3as_lp_t2_we_essai_debat',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'production_ecrite',
		titleAr: 'الإنتاج الكتابي (7 نقاط — آداب وفلسفة): مقال حجاجي جدلي أو تقرير نقدي لنص نقاش أفكار',
		curriculumLessonId: 'fre_lesson_3as_lp_t2_essai_crc_debat',
		defaultPoints: 7,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique (environ 150 mots) d’un texte de débat d’idées intitulé « Le livre imprimé face à l’écran : concurrence ou complémentarité ? ».',
					sujetUnNotes: [
						'Accroche : présenter le texte, la problématique débattue et la visée argumentative.',
						'Résumé objectif (3e personne, présent) : exposer d’abord les arguments des partisans du numérique, puis la réponse des pédagogues, puis la synthèse de l’auteur.',
						'Critique constructive : évaluer l’équilibre du débat, la qualité des arguments et la clarté de l’expression.'
					],
					sujetDeuxPrompt:
						'Les réseaux sociaux aident-ils réellement les lycéens à réussir leurs études ou constituent-ils un frein à leur concentration ? Rédigez un essai argumentatif dialectique (150 à 180 mots) en appuyant vos arguments par des exemples précis.',
					modelAnswer:
						'De nos jours, les réseaux sociaux occupent une place majeure dans le quotidien des lycéens. Dès lors, constituent-ils un levier de réussite scolaire ou plutôt une source préoccupante de distraction ?\nD’une part, leurs partisans soulignent que ces plateformes facilitent l’entraide pédagogique. En effet, les candidats au baccalauréat y échangent des résumés de cours, suivent des séances de révision en direct et posent leurs questions à des enseignants qualifiés. Par exemple, de nombreux élèves des régions isolées améliorent ainsi leur niveau en langues étrangères.\nD’autre part, un usage non maîtrisé présente des risques indéniables. Certes, l’information abonde en ligne, mais les vidéos courtes et les notifications permanentes fragmentent la concentration et réduisent le temps consacré à la lecture approfondie et aux exercices écrits.\nEn somme, les réseaux sociaux ne sont bénéfiques que s’ils restent encadrés par une discipline personnelle stricte. Pour ma part, j’estime qu’il convient de limiter leur usage à des créneaux précis dédiés à l’étude afin de préserver la qualité de notre réflexion.',
					rubricSummary: 'Introduction avec problématique (1.5) + Deux paragraphes argumentés avec exemples et transitions (3) + Synthèse personnelle (1) + Langue et syntaxe (1.5).',
					easyQ: 'Quel élément doit clore l’introduction d’un essai argumentatif dialectique ?',
					easyAns: 'Une problématique claire (question directrice du débat)',
					easyWrong: ['Un tableau de conjugaison', 'La signature finale', 'Une liste de mots sans verbe'],
					medQ: 'Quel couple d’articulateurs structure harmonieusement les deux paragraphes d’un plan dialectique ?',
					medAns: 'D’une part... D’autre part... (ou Certes... Cependant...)',
					medWrong: ['Hier... Avant-hier...', 'Sois... Soyons...', 'Parce que... Car...'],
					hardQ: 'Pourquoi la conclusion de l’essai modèle sur les réseaux sociaux est-elle réussie ?',
					hardAns: 'Parce qu’elle propose une synthèse équilibrée qui répond à la problématique avec une position personnelle mesurée',
					hardWrong: [
						'Parce qu’elle refuse de répondre à la question posée',
						'Parce qu’elle répète mot pour mot la première phrase',
						'Parce qu’elle ajoute un sujet hors thème'
					]
				},
				{
					sujetUnPrompt:
						'Rédigez le compte rendu critique (environ 150 mots) d’un texte argumentatif intitulé « Le progrès technique a-t-il besoin d’une boussole morale ? ».',
					sujetUnNotes: [
						'Accroche : identifier le texte, son thème (science et éthique) et sa visée persuasive.',
						'Résumé objectif : reformuler les bienfaits reconnus, les limites morales et la référence à Al-Zahrawi et Ibn Al-Haytham.',
						'Critique constructive : commenter la portée humaniste du texte et la force de ses antithèses.'
					],
					sujetDeuxPrompt:
						'Certains estiment que le progrès scientifique suffit à assurer le bonheur de l’humanité ; d’autres affirment qu’il devient dangereux sans valeurs morales. Rédigez un essai argumentatif (150 à 180 mots) exposant les deux points de vue avant d’exprimer votre propre position.',
					modelAnswer:
						'Le texte intitulé « Le progrès technique a-t-il besoin d’une boussole morale ? », extrait d’un essai d’éthique et de civisme, s’interroge sur le lien entre innovation scientifique et responsabilité morale afin de convaincre le lecteur que la science doit rester guidée par des valeurs humaines.\nDans un premier temps, l’auteur reconnaît les apports indéniables de la technique dans la médecine, les transports et l’énergie. Cependant, il nuance aussitôt l’optimisme excessif de certains observateurs en montrant que des inventions privées de repères éthiques peuvent engendrer pollution, gaspillage et atteintes à la vie privée. Pour étayer sa thèse, il s’appuie sur l’héritage de savants comme Al-Zahrawi et Ibn Al-Haytham, avant de conclure que la morale éclaire le sens noble de toute créativité.\nÀ mon sens, ce texte se distingue par la clarté de sa progression dialectique et la pertinence de ses exemples historiques. Son antithèse finale frappe particulièrement l’esprit, même si un exemple tiré du domaine numérique actuel aurait encore renforcé son actualité.',
					rubricSummary: 'Accroche complète (1.5) + Résumé dialectique reformulé sans recopiage (2.5) + Critique nuancée fond/forme (1.5) + Maîtrise linguistique (1.5).',
					easyQ: 'Quel verbe de rapport convient pour traduire le passage à la réfutation dans un compte rendu critique ?',
					easyAns: 'L’auteur nuance / réfute / conteste cette vision...',
					easyWrong: ['L’auteur ordonne impérativement...', 'L’auteur dessine une carte...', 'L’auteur chante un poème...'],
					medQ: 'Dans le compte rendu critique d’un débat d’idées, que doit montrer la partie résumé ?',
					medAns: 'L’articulation entre la thèse adverse, les arguments de l’auteur et sa conclusion',
					medWrong: ['Uniquement une liste de dates anciennes', 'Seulement les exemples sans aucune thèse', 'L’opinion personnelle de l’élève dès la ligne 1'],
					hardQ: 'Comment valoriser le style d’un texte de débat dans la partie critique ?',
					hardAns: 'En soulignant la clarté de sa progression logique, la justesse des connecteurs et la force de ses figures d’opposition',
					hardWrong: [
						'En affirmant simplement que les phrases sont courtes',
						'En recopiant toute la première partie du texte',
						'En ignorant complètement le contenu des arguments'
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
					chosen.easyWrong.map((w) => ({ text: w, diagnosticFeedback: 'راجع بنية المقال الجدلي والتقرير النقدي لنص النقاش.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر العنصر المنهجي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأكد من الروابط المناسبة ومنهجية عرض الأطروحتين.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التنظيم الحجاجي الأنسب:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({ text: w, diagnosticFeedback: 'تأمل معايير التميز في الخاتمة التركيبية أو التقييم النقدي للشكل والمضمون.' })),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد معيار الجودة العالية في الإنتاج الكتابي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأمثل هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'II. Production écrite',
				points: 7,
				instruction: 'Traitez l’un des deux sujets suivants au choix (7 points — BAC LP) :',
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
				trimesterId: 't2',
				difficulty,
				domain: 'production_ecrite',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'في المقال الجدلي: مقدمة بإشكالية، فقرة للمؤيدين، فقرة للحدود/المعارضين، ثم خاتمة تركيبية متزنة.',
					'نوّع الروابط المنطقية (D’une part, En effet, Certes... mais, En somme) وتجنّب التكرار.',
					'في التقرير النقدي، حافظ على الحياد في التلخيص ثم علّل نقدك في الفقرة الثالثة.'
				],
				solutionStepsAr: [
					'صياغة مقدمة ممهدة وإشكالية دقيقة (1.5 نقطة).',
					'عرض الحجج والأمثلة بتدرج منطقي (3 نقاط).',
					'تركيب خاتمة متوازنة أو وقفة نقدية معمقة (1 نقطة).',
					'سلامة اللغة، الروابط والترقيم (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	}
];
