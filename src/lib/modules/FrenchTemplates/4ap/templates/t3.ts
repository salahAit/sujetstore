import type {
	Difficulty,
	FrenchGeneratedExerciseInstance,
	FrenchParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildFrenchClassificationTableBlock,
	buildFrenchPassageBlock,
	buildFrenchWrittenProductionBlock
} from '../../french-helpers';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Compréhension 1 (4 pts) — L'eau, c'est la vie ! (Vocabulaire de l'eau)
// ═══════════════════════════════════════════════════════════════════════════════
const compEau4apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t3_comp_eau',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: الماء نعمة عظيمة (الاقتصاد في الماء)',
	curriculumLessonId: 'fre_lesson_4ap_t3_eau_nature',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: "L'eau est précieuse",
				origin: 'La pluie et les sources',
				goodAction: 'Fermer le robinet',
				badAction: "Gaspiller l'eau",
				paragraphs: [
					"L'[[eau]] est indispensable à la vie des hommes, des animaux et des plantes. En Algérie, elle vient surtout de la pluie, des sources et des rivières.",
					"Nous ne devons jamais [[gaspiller]] l'eau potable ! Chaque jour, je ferme bien le robinet après me laver les mains et j'arrose les plantes avec modération."
				],
				tf1Q: "L'eau est indispensable aux hommes, aux animaux et aux plantes.",
				tf1A: 'Vrai',
				tf2Q: 'Il faut laisser le robinet ouvert longtemps.',
				tf2A: 'Faux',
				tf2C: 'Il faut fermer bien le robinet pour ne pas gaspiller l’eau.',
				mcqQ: "Selon le texte, quel bon geste faut-il faire pour économiser l'eau ?",
				mcqCorrect: 'Fermer bien le robinet après se laver les mains',
				mcqWrong: [
					{ text: 'Laisser couler le robinet', diagnosticFeedback: 'Laisser couler le robinet gaspille l’eau.' },
					{ text: 'Jeter des déchets dans la rivière', diagnosticFeedback: 'Cela pollue la rivière.' },
					{ text: 'Arroser les plantes à midi en été', diagnosticFeedback: 'Le texte parle de fermer le robinet et arroser avec modération.' }
				]
			},
			{
				title: 'La source fraîche de la montagne',
				origin: 'Une source de montagne',
				goodAction: 'Garder la source propre',
				badAction: 'Jeter des bouteilles',
				paragraphs: [
					"Pendant la sortie familiale à Tizi Ouzou, Sami découvre une [[source]] d'eau fraîche et claire au pied de la montagne.",
					"Son père lui explique que la nature est un bienfait d'Allah. Ils boivent de cette eau pure et ramassent tous leurs déchets pour garder la [[source]] toujours propre."
				],
				tf1Q: 'Sami découvre une source d’eau fraîche à Tizi Ouzou.',
				tf1A: 'Vrai',
				tf2Q: 'La famille laisse ses déchets près de la source.',
				tf2A: 'Faux',
				tf2C: 'Ils ramassent tous leurs déchets pour garder la source propre.',
				mcqQ: 'Que fait la famille de Sami pour protéger la source ?',
				mcqCorrect: 'Elle ramasse tous ses déchets',
				mcqWrong: [
					{ text: 'Elle jette du plastique dans l’eau', diagnosticFeedback: 'Au contraire, ils gardent la source propre.' },
					{ text: 'Elle coupe les arbres', diagnosticFeedback: 'Ils respectent la nature.' },
					{ text: 'Elle gaspille toute l’eau', diagnosticFeedback: 'Relis la dernière phrase du texte.' }
				]
			},
			{
				title: "Économisons l'eau à l'école",
				origin: "L'eau potable du robinet",
				goodAction: 'Réparer une fuite',
				badAction: 'Jouer avec le robinet',
				paragraphs: [
					"Dans la cour de l'école, [[Meriem]] remarque un robinet qui coule goutte à goutte. Elle prévient vite le directeur pour réparer la fuite.",
					"En classe, les élèves préparent une affiche : « Économisons l'[[eau]] ! Ne jouons pas avec les robinets ! »."
				],
				tf1Q: 'Meriem prévient le directeur pour réparer le robinet qui fuit.',
				tf1A: 'Vrai',
				tf2Q: "Les élèves disent qu'on peut jouer avec les robinets.",
				tf2A: 'Faux',
				tf2C: 'Les élèves écrivent : Ne jouons pas avec les robinets !',
				mcqQ: 'Que fait Meriem quand elle voit un robinet qui coule ?',
				mcqCorrect: 'Elle prévient vite le directeur pour réparer la fuite',
				mcqWrong: [
					{ text: 'Elle ouvre encore plus le robinet', diagnosticFeedback: 'Meriem veut économiser l’eau.' },
					{ text: 'Elle part sans rien dire', diagnosticFeedback: 'Elle prévient vite le directeur.' },
					{ text: 'Elle joue avec l’eau', diagnosticFeedback: 'Relis la deuxième phrase du premier paragraphe.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة حول المحافظة على الماء:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `من النص نجد أن الإجابة الصحيحة هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis attentivement le texte, puis réponds aux questions :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_lang_03_weather_icons_quad', {
					lang: 'fr',
					title: "La pluie, la neige et le cycle du temps : l'eau est précieuse",
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'text',
					content: '#strong[1)] Complète le tableau à partir du texte :'
				},
				{
					type: 'table',
					headers: ["Origine / Eau citée", 'Bon geste à faire', 'Mauvais geste à éviter'],
					cells: [],
					rows: [
						[
							{ content: '................', answer: sc.origin, mark: '0.5' },
							{ content: '................', answer: sc.goodAction, mark: '0.75' },
							{ content: '................', answer: sc.badAction, mark: '0.75' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: '#strong[2)] Écris « Vrai » ou « Faux » :'
				},
				{
					type: 'true_false',
					items: [
						{ q: `a) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `b) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج مصدر الماء المذكور في الفقرة الأولى.',
				'ميّز بين السلوك الجيد والسلوك السيئ تجاه الماء في الفقرة الثانية.',
				'تأكد من مطابقة جمل Vrai / Faux لمعنى النص.'
			],
			solutionStepsAr: [
				`الجدول: المصدر = ${sc.origin} | السلوك الحسن = ${sc.goodAction} | السلوك السيئ = ${sc.badAction}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Compréhension 2 (4 pts) — La mer Méditerranée et les vacances utiles
// ═══════════════════════════════════════════════════════════════════════════════
const compMerVacances4apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t3_comp_mer_vacances',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'comprehension_ecrit',
	titleAr: 'فهم المكتوب: البحر الأبيض المتوسط والعطلة الصيفية المفيدة',
	curriculumLessonId: 'fre_lesson_4ap_t3_eau_nature',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'Des vacances utiles à Jijel',
				paragraphs: [
					"Cet été, [[Karim]] et sa famille visiteront les magnifiques plages de Jijel, au bord de la mer Méditerranée.",
					"Le matin, Karim révisera le Coran et lira une histoire utile. L'après-midi, il ira à la [[plage]] avec son père et ramassera ses déchets dans un sac pour laisser le sable propre."
				],
				qcm1Header: 'a) Quelle ville côtière la famille de Karim visitera-t-elle ?',
				qcm1Options: ['Jijel', 'Ghardaïa', 'Biskra'],
				qcm1Correct: 'Jijel',
				qcm2Header: 'b) Que fera Karim le matin pendant ses vacances ?',
				qcm2Options: [
					'Il révisera le Coran et lira une histoire',
					'Il dormira jusqu’au soir',
					'Il laissera des déchets sur le sable'
				],
				qcm2Correct: 'Il révisera le Coran et lira une histoire',
				tf1Q: 'Karim ramassera ses déchets pour laisser la plage propre.',
				tf1A: 'Vrai',
				tf2Q: 'Jijel se trouve loin de la mer Méditerranée.',
				tf2A: 'Faux',
				tf2C: 'Jijel se trouve au bord de la mer Méditerranée.',
				mcqQ: 'Comment Karim garde-t-il la plage de Jijel propre ?',
				mcqCorrect: 'Il ramasse ses déchets dans un sac',
				mcqWrong: [
					{ text: 'Il laisse les sacs sur le sable', diagnosticFeedback: 'Karim laisse le sable propre.' },
					{ text: 'Il jette les bouteilles dans la mer', diagnosticFeedback: 'Il protège la mer et le sable.' },
					{ text: 'Il ne va pas à la plage', diagnosticFeedback: 'Il va à la plage l’après-midi avec son père.' }
				]
			},
			{
				title: 'Un été agréable à Tipaza',
				paragraphs: [
					"Bientôt, les grandes vacances commenceront ! [[Aya]] voyagera avec ses parents à Tipaza pour voir la mer bleue et les sites historiques.",
					"Elle emportera deux livres de lecture et un carnet pour écrire ses [[souvenirs]]. Elle aidera aussi sa mère et visitera sa grand-mère."
				],
				qcm1Header: 'a) Où Aya voyagera-t-elle avec ses parents ?',
				qcm1Options: ['À Tipaza', 'À Batna', 'À Tlemcen'],
				qcm1Correct: 'À Tipaza',
				qcm2Header: "b) Qu'emportera Aya dans son sac ?",
				qcm2Options: ['Deux livres de lecture et un carnet', 'Un cartable plein de craies', 'Une ardoise cassée'],
				qcm2Correct: 'Deux livres de lecture et un carnet',
				tf1Q: 'Aya visitera sa grand-mère pendant les vacances.',
				tf1A: 'Vrai',
				tf2Q: "Aya n'emportera aucun livre pendant l'été.",
				tf2A: 'Faux',
				tf2C: 'Elle emportera deux livres de lecture.',
				mcqQ: 'Que verra Aya à Tipaza ?',
				mcqCorrect: 'La mer bleue et les sites historiques',
				mcqWrong: [
					{ text: 'La neige sur les montagnes', diagnosticFeedback: 'C’est l’été à Tipaza au bord de la mer.' },
					{ text: 'Le désert de sable', diagnosticFeedback: 'Tipaza est une ville côtière avec la mer et des sites historiques.' },
					{ text: 'Une ferme de moutons', diagnosticFeedback: 'Relis la deuxième phrase du texte.' }
				]
			},
			{
				title: 'Protégeons la mer à Béjaïa',
				paragraphs: [
					"La mer Méditerranée à [[Béjaïa]] est belle et bleue. Elle abrite des poissons variés et offre un air frais aux familles algériennes.",
					"Demain, les enfants du quartier participeront à une campagne de nettoyage de la [[plage]]. Nous serons tous fiers de protéger notre belle nature !"
				],
				qcm1Header: 'a) À quelle campagne participeront les enfants demain ?',
				qcm1Options: [
					'Une campagne de nettoyage de la plage',
					'Une course de chevaux',
					'Une vente de gâteaux'
				],
				qcm1Correct: 'Une campagne de nettoyage de la plage',
				qcm2Header: 'b) Que trouve-t-on dans la mer Méditerranée selon le texte ?',
				qcm2Options: ['Des poissons variés', 'Des moutons blancs', 'Des pommiers'],
				qcm2Correct: 'Des poissons variés',
				tf1Q: 'La mer Méditerranée offre un air frais aux familles.',
				tf1A: 'Vrai',
				tf2Q: 'Les enfants refusent de nettoyer la plage.',
				tf2A: 'Faux',
				tf2C: 'Les enfants participeront avec fierté au nettoyage de la plage.',
				mcqQ: 'Dans quelle ville algérienne se déroule cette action de nettoyage ?',
				mcqCorrect: 'Béjaïa',
				mcqWrong: [
					{ text: 'Sétif', diagnosticFeedback: 'Le texte cite Béjaïa dès la première phrase.' },
					{ text: 'Constantine', diagnosticFeedback: 'Constantine ne figure pas dans le texte.' },
					{ text: 'Blida', diagnosticFeedback: 'Relis la première phrase : à Béjaïa.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqWrong, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Lis le texte :\n« ${plainText} »\nQuestion : ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة عن البحر والعطلة المفيدة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `بحسب النص، الإجابة الصحيحة هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: "I. Compréhension de l'écrit",
			points: 4,
			instruction: 'Lis le texte, puis fais les exercices suivants :',
			content: [
				buildFrenchPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_lang_02_airplane_ship', {
					lang: 'fr',
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'text',
					content: '#strong[1)] Coche la bonne réponse :'
				},
				{
					type: 'multiple_choice',
					groups: [
						{ header: sc.qcm1Header, options: sc.qcm1Options, correct: sc.qcm1Correct, mark: '1' },
						{ header: sc.qcm2Header, options: sc.qcm2Options, correct: sc.qcm2Correct, mark: '1' }
					]
				},
				{
					type: 'text',
					content: '#strong[2)] Écris « Vrai » ou « Faux » :'
				},
				{
					type: 'true_false',
					items: [
						{ q: `a) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `b) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص وحدّد اسم المدينة الساحلية والأنشطة الصيفية المفيدة.',
				'تنبّه للأفعال المصرفة في المستقبل البسيط.',
				'راجع جمل سؤال Vrai / Faux وقارنها مع النص.'
			],
			solutionStepsAr: [
				`الاختيارات: (a) ${sc.qcm1Correct} — (b) ${sc.qcm2Correct}.`,
				`صحيح أو خطأ: (a) ${sc.tf1A} — (b) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Fonctionnement de la langue 1 (3 pts) — Le futur simple (1er groupe + être / avoir)
// ═══════════════════════════════════════════════════════════════════════════════
const langFutur4apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t3_lang_futur',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'conjugaison_temps',
	titleAr: 'تصريف: المستقبل البسيط (أفعال الفوج الأول + être و avoir)',
	curriculumLessonId: 'fre_lesson_4ap_t3_futur_simple',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				v1: 'Demain, je (visiter) ............ la plage de Tipaza.',
				v1Ans: 'Demain, je visiterai la plage de Tipaza.',
				v2: "Cet été, nous (économiser) ............ l'eau.",
				v2Ans: "Cet été, nous économiserons l'eau.",
				v3: 'Les enfants (protéger) ............ la mer.',
				v3Ans: 'Les enfants protégeront la mer.',
				ea1: 'Bientôt, tu (être) ............ en 5AP.',
				ea1Ans: 'Bientôt, tu seras en 5AP.',
				ea2: 'Nous (avoir) ............ des vacances utiles.',
				ea2Ans: 'Nous aurons des vacances utiles.',
				mcqPrompt: 'Conjugue au futur simple : « Cet été, nous (visiter) ...... Jijel. »',
				mcqCorrect: 'visiterons',
				mcqDistractors: [
					{ text: 'visitons', diagnosticFeedback: 'visitons est au présent, pas au futur.' },
					{ text: 'visiterai', diagnosticFeedback: '-ai est la terminaison de je.' },
					{ text: 'visiteront', diagnosticFeedback: '-ont est la terminaison de ils / elles.' }
				]
			},
			{
				v1: 'Tu (nager) ............ dans la mer calme.',
				v1Ans: 'Tu nageras dans la mer calme.',
				v2: 'Vous (garder) ............ la plage propre.',
				v2Ans: 'Vous garderez la plage propre.',
				v3: 'Il (réviser) ............ ses leçons le matin.',
				v3Ans: 'Il révisera ses leçons le matin.',
				ea1: 'Je (être) ............ très content cet été.',
				ea1Ans: 'Je serai très content cet été.',
				ea2: 'Ils (avoir) ............ de beaux livres.',
				ea2Ans: 'Ils auront de beaux livres.',
				mcqPrompt: 'Conjugue « être » au futur simple : « Demain, je (être) ...... à Béjaïa. »',
				mcqCorrect: 'serai',
				mcqDistractors: [
					{ text: 'suis', diagnosticFeedback: 'suis est au présent.' },
					{ text: 'seras', diagnosticFeedback: 'seras va avec le pronom tu.' },
					{ text: 'sera', diagnosticFeedback: 'sera va avec il ou elle.' }
				]
			},
			{
				v1: 'La semaine prochaine, elle (voyager) ............ à Skikda.',
				v1Ans: 'La semaine prochaine, elle voyagera à Skikda.',
				v2: 'Nous (ramasser) ............ les papiers sur le sable.',
				v2Ans: 'Nous ramasserons les papiers sur le sable.',
				v3: 'Je (fermer) ............ bien le robinet.',
				v3Ans: 'Je fermerai bien le robinet.',
				ea1: 'Vous (être) ............ fiers de votre plage propre.',
				ea1Ans: 'Vous serez fiers de votre plage propre.',
				ea2: 'Elle (avoir) ............ un carnet de vacances.',
				ea2Ans: 'Elle aura un carnet de vacances.',
				mcqPrompt: 'Conjugue « avoir » au futur simple : « Bientôt, ils (avoir) ...... des vacances. »',
				mcqCorrect: 'auront',
				mcqDistractors: [
					{ text: 'ont', diagnosticFeedback: 'ont est au présent.' },
					{ text: 'aurons', diagnosticFeedback: 'aurons va avec nous.' },
					{ text: 'seront', diagnosticFeedback: 'seront est le futur du verbe être, pas avoir.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر التصريف الصحيح في المستقبل البسيط:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Conjugue les verbes entre parenthèses au futur simple :',
			content: [
				buildIllustratedFigureBlock('pri_ara_06_four_seasons_trees', {
					lang: 'fr',
					title: 'Les quatre saisons en Algérie (printemps, été, automne, hiver)',
					customLegend: [
						{ num: '1', label: "Le printemps fleuri et l'été ensoleillé" },
						{ num: '2', label: "L'automne doré et l'hiver enneigé" }
					],
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `#strong[Activité 1 :] Verbes du 1er groupe au futur simple :\n1) ${s.v1}\n2) ${s.v2}\n3) ${s.v3}`,
					answer: `#strong[Activité 1 :] 1) ${s.v1Ans}  |  2) ${s.v2Ans}  |  3) ${s.v3Ans}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `#strong[Activité 2 :] Verbes « être » et « avoir » au futur simple :\n1) ${s.ea1}\n2) ${s.ea2}`,
					answer: `#strong[Activité 2 :] 1) ${s.ea1Ans}  |  2) ${s.ea2Ans}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'مع أفعال الفوج الأول نحتفظ بالمصدر كاملاً (-er) ونضيف: -ai, -as, -a, -ons, -ez, -ont.',
				'جذر être في المستقبل هو ser- (serai, seras, sera, serons, serez, seront).',
				'جذر avoir في المستقبل هو aur- (aurai, auras, aura, aurons, aurez, auront).'
			],
			solutionStepsAr: [
				`الفوج الأول: (1) ${s.v1Ans} — (2) ${s.v2Ans} — (3) ${s.v3Ans}.`,
				`être و avoir: (1) ${s.ea1Ans} — (2) ${s.ea2Ans}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Fonctionnement de la langue 2 (3 pts) — COD / CCL / CCT, Homophones (a/à, et/est) & Accord S-V
// ═══════════════════════════════════════════════════════════════════════════════
const langCodHomophones4apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t3_lang_cod_homophones',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'orthographe_accords',
	titleAr: 'قواعد وإملاء: COD و CCL و CCT والمتشابهات (a/à، et/est) ومطابقة الفعل',
	curriculumLessonId: 'fre_lesson_4ap_t3_homophones_accord',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				sentence: 'Demain, Karim nettoiera la plage à Jijel.',
				cod: ['la plage'],
				ccl: ['à Jijel'],
				cct: ['Demain'],
				homPrompt: '1) Sara ...... (a / à) une gourde ...... (a / à) la main.\n2) La mer ...... (est / et) calme ...... (est / et) bleue.',
				homAnswer: '1) Sara a une gourde à la main.  |  2) La mer est calme et bleue.',
				accordPrompt: "L'élève protège l'eau. / Les élèves ............ l'eau.",
				accordAnswer: "Les élèves protègent l'eau.",
				mcqPrompt: 'Dans la phrase « Demain, Karim nettoiera la plage à Jijel. », quel est le COD ?',
				mcqCorrect: 'la plage',
				mcqDistractors: [
					{ text: 'Demain', diagnosticFeedback: 'Demain répond à Quand ? : c’est un CCT (temps).' },
					{ text: 'à Jijel', diagnosticFeedback: 'à Jijel répond à Où ? : c’est un CCL (lieu).' },
					{ text: 'Karim', diagnosticFeedback: 'Karim est le sujet du verbe.' }
				]
			},
			{
				sentence: 'Cet été, Aya lira un beau livre à Tipaza.',
				cod: ['un beau livre'],
				ccl: ['à Tipaza'],
				cct: ['Cet été'],
				homPrompt: '1) Amine ...... (a / à) un chapeau et il va ...... (a / à) la mer.\n2) Le ciel ...... (est / et) clair ...... (est / et) pur.',
				homAnswer: '1) Amine a un chapeau et il va à la mer.  |  2) Le ciel est clair et pur.',
				accordPrompt: 'La vague roule sur le sable. / Les vagues ............ sur le sable.',
				accordAnswer: 'Les vagues roulent sur le sable.',
				mcqPrompt: 'Complète avec « a » ou « à » : « Bilal ...... une gourde et il va ...... Béjaïa. »',
				mcqCorrect: 'a / à',
				mcqDistractors: [
					{ text: 'à / a', diagnosticFeedback: 'On peut dire Bilal avait une gourde (a), mais pas il va avait Béjaïa (à).' },
					{ text: 'a / a', diagnosticFeedback: 'Devant une ville (Béjaïa), on écrit la préposition à.' },
					{ text: 'à / à', diagnosticFeedback: 'Le premier mot est le verbe avoir (a).' }
				]
			},
			{
				sentence: 'Chaque matin, les enfants arrosent les plantes dans le jardin.',
				cod: ['les plantes'],
				ccl: ['dans le jardin'],
				cct: ['Chaque matin'],
				homPrompt: '1) La source ...... (est / et) fraîche ...... (est / et) propre.\n2) Meriem ...... (a / à) un carnet ...... (a / à) la maison.',
				homAnswer: '1) La source est fraîche et propre.  |  2) Meriem a un carnet à la maison.',
				accordPrompt: 'Le bateau avance vite. / Les bateaux ............ vite.',
				accordAnswer: 'Les bateaux avancent vite.',
				mcqPrompt: 'Complète avec « est » ou « et » : « L’eau ...... précieuse ...... utile. »',
				mcqCorrect: 'est / et',
				mcqDistractors: [
					{ text: 'et / est', diagnosticFeedback: 'L’eau était précieuse (est) et (و) utile.' },
					{ text: 'est / est', diagnosticFeedback: 'Entre deux adjectifs, on utilise la conjonction et.' },
					{ text: 'et / et', diagnosticFeedback: 'La phrase a besoin du verbe être (est).' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في المكملات والمتشابهات:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'II. Fonctionnement de la langue',
			points: 3,
			instruction: 'Fais les trois activités suivantes :',
			content: [
				buildIllustratedFigureBlock('pri_lang_07_clean_park_planting', {
					lang: 'fr',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `#strong[Activité 1 :] Lis la phrase puis place chaque complément dans le tableau :\n« ${s.sentence} »`
				},
				buildFrenchClassificationTableBlock({
					columns: [
						{ header: 'COD (Quoi ?)', items: s.cod, mark: '0.5' },
						{ header: 'CCL (Où ?)', items: s.ccl, mark: '0.5' },
						{ header: 'CCT (Quand ?)', items: s.cct, mark: '0.5' }
					]
				}),
				{
					type: 'text',
					content: `#strong[Activité 2 :] Complète avec les bons homophones :\n${s.homPrompt}`,
					answer: `#strong[Activité 2 :] ${s.homAnswer}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `#strong[Activité 3 :] Accorde le verbe avec son sujet au pluriel :\n${s.accordPrompt}`,
					answer: `#strong[Activité 3 :] ${s.accordAnswer}`,
					mark: '0.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'COD يجيب عن Quoi؟ — CCL يجيب عن Où؟ — CCT يجيب عن Quand؟.',
				'جرّب تعويض a بـ «avait» وتعويض est بـ «était».',
				'عند تحويل الفاعل للجمع يأخذ فعل الفوج الأول النهاية -ent.'
			],
			solutionStepsAr: [
				`المكملات: COD = ${s.cod[0]} | CCL = ${s.ccl[0]} | CCT = ${s.cct[0]}.`,
				`المتشابهات: ${s.homAnswer}`,
				`مطابقة الفعل للفاعل: ${s.accordAnswer}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Production écrite (3 pts) — Mon programme de vacances utiles / Protéger l'eau
// ═══════════════════════════════════════════════════════════════════════════════
const prodEauVacances4apT3: FrenchParameterizedTemplate = {
	id: 'fre_tpl_4ap_t3_prod_eau_vacances',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'production_ecrite',
	titleAr: 'الوضعية الإدماجية: برنامج عطلتي المفيدة أو حماية الماء والبحر',
	curriculumLessonId: 'fre_lesson_4ap_t3_futur_simple',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): FrenchGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				prompt: 'Écris un petit paragraphe de 4 phrases au futur simple pour raconter ton programme de vacances utiles cet été en Algérie.',
				notes: [
					'Lieux : la mer Méditerranée, Jijel / Tipaza, la maison de grand-mère',
					'Activités utiles : réviser le Coran, lire des livres, visiter la famille, garder la plage propre',
					'Verbes au futur simple : visiter, réviser, protéger, être, avoir'
				],
				model: "Cet été, ma famille visitera la belle ville de Jijel au bord de la mer Méditerranée. Le matin, je réviserai le Coran et mes leçons avec sérieux. L'après-midi, nous garderons la plage toujours propre. Nous serons heureux et nous aurons des vacances très utiles !",
				mcqQ: 'Quelle phrase est correctement conjuguée au futur simple pour les vacances ?',
				mcqCorrect: 'Cet été, nous visiterons Tipaza et nous serons très contents.',
				mcqDistractors: [
					{ text: 'Cet été, nous visitons Tipaza et nous sommes contents.', diagnosticFeedback: 'Cette phrase est au présent, pas au futur simple.' },
					{ text: 'Cet été, nous visiteront Tipaza.', diagnosticFeedback: 'Avec nous, la terminaison du futur est -ons : visiterons.' },
					{ text: 'Cet été, nous étions contents.', diagnosticFeedback: 'étions est à l’imparfait, pas au futur.' }
				]
			},
			{
				prompt: "Écris 4 phrases simples pour donner des conseils à tes camarades afin d'économiser l'eau et de protéger la nature.",
				notes: [
					"Noms : l'eau potable, le robinet, la rivière, la plage, les poubelles",
					'Verbes au futur simple ou au présent : économiser, fermer, protéger, ne pas gaspiller',
					'Fais attention à a / à et est / et.'
				],
				model: "L'eau est une grande richesse et elle est indispensable à la vie. Nous économiserons l'eau chaque jour en fermant bien le robinet. À la plage, nous jetterons nos déchets dans les poubelles. Ainsi, notre pays restera toujours propre !",
				mcqQ: 'Quelle phrase ne contient aucune erreur sur « est / et » ni sur « a / à » ?',
				mcqCorrect: "L'eau est précieuse et nous allons à la source propre.",
				mcqDistractors: [
					{ text: "L'eau et précieuse est nous allons a la source.", diagnosticFeedback: 'est / et et à sont inversés ou mal écrits.' },
					{ text: "L'eau est précieuse et nous allons a la source.", diagnosticFeedback: 'Devant la source (lieu), on écrit à avec accent.' },
					{ text: "L'eau et précieuse et nous allons à la source.", diagnosticFeedback: 'Il manque le verbe être (est) après L’eau.' }
				]
			},
			{
				prompt: 'Écris 4 phrases au futur simple pour raconter une journée de nettoyage de la plage avec les enfants de ton quartier.',
				notes: [
					'Noms : la plage, le sable, les sacs, la mer, les amis',
					'Verbes au futur simple : participer, ramasser, protéger, être, avoir',
					'Ajoute un CCT (Demain / Samedi prochain) et un CCL (à Béjaïa / sur la plage).'
				],
				model: "Samedi prochain, les enfants du quartier participeront au nettoyage de la plage à Béjaïa. Nous ramasserons les bouteilles sur le sable dans de grands sacs. Ensemble, nous protégerons la mer Méditerranée et ses poissons. Nous serons fiers de notre belle action !",
				mcqQ: 'Quelle phrase accorde correctement le verbe au futur simple avec le sujet ?',
				mcqCorrect: 'Les enfants ramasseront les déchets et protégeront la mer.',
				mcqDistractors: [
					{ text: 'Les enfants ramassera les déchets.', diagnosticFeedback: 'Les enfants est au pluriel : ramasseront.' },
					{ text: 'Les enfants ramasserons les déchets.', diagnosticFeedback: '-ons est la terminaison de nous.' },
					{ text: 'Les enfants ramassent demain la mer.', diagnosticFeedback: 'Le sens et le temps futur ne sont pas respectés.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: FrenchGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة للاستعمال في الإنتاج الكتابي:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجملة الصحيحة هي: «${pr.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'III. Production écrite',
			points: 3,
			content: [
				buildIllustratedFigureBlock('pri_lang_06_hygiene_washbasin', {
					lang: 'fr',
					title: "Économiser l'eau potable au quotidien et protéger la nature",
					maxHeight: 102,
					width: '54%'
				}),
				buildFrenchWrittenProductionBlock({
					sujetUnTitle: "Situation d'intégration :",
					sujetUnPrompt: pr.prompt,
					sujetUnNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary:
						'Pertinence (1 pt), futur simple et homophones a/à, et/est (1 pt), accords et ponctuation (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعن بمؤشرات الزمن (Cet été / Demain) وبالمستقبل البسيط.',
				'راجع التمييز بين a/à و est/et قبل تسليم الورقة.',
				'تأكد من مطابقة كل فعل لفاعله ومن الحروف الكبيرة وعلامات الترقيم.'
			],
			solutionStepsAr: [
				'استثمار رصيد الماء والبحر والعطلة المفيدة.',
				'كتابة 4 جمل متسلسلة ومضبوطة التصريف والإملاء.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T3: FrenchParameterizedTemplate[] = [
	compEau4apT3,
	compMerVacances4apT3,
	langFutur4apT3,
	langCodHomophones4apT3,
	prodEauVacances4apT3
];
