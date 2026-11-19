import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimester 3: "Safety First", "Solidarity & Human Values" & BAC LE Mastery (4 templates)
 * Roles: 1 comprehension (7 pts) + 2 text_exploration (7 pts each) + 1 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T3: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Food Safety & Consumer Awareness / Algerian Solidarity (Touiza)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t3_comp_safety_solidarity',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): سلامة المستهلك والغذاء الصحي، وقيم التضامن والتويزة في الجزائر',
		curriculumLessonId: 'eng_lesson_3as_le_t3_cause_result_purpose',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Food Safety and Smart Consumers in the Age of Advertising',
					source: 'Adapted from Public Health & Consumer Protection Bulletin',
					paragraphs: [
						'Modern supermarkets offer an unprecedented variety of packaged snacks, sugary beverages, and ready-to-eat meals. Owing to aggressive advertising campaigns that highlight bright colours and rapid convenience, busy families and young shoppers often purchase ultra-processed foods without checking [[their]] nutritional labels.',
						'Nutritionists warn that excessive intake of refined sugar, unhealthy trans fats, and artificial preservatives contributes directly to obesity, diabetes, and fatigue. Consequently, consumer protection associations urge citizens to inspect expiry dates, read ingredient lists carefully, and favour fresh home-cooked meals so as to safeguard [[their]] long-term health.',
						'At the same time, food manufacturers ought to uphold honest labelling and strict hygiene standards throughout storage and transport. When vigilant consumers, ethical producers, and regular health inspections work together, society puts safety first.'
					],
					glossary: [
						{ term: 'ultra-processed', meaning: 'heavily altered industrially with additives, excess sugar, or preservatives' },
						{ term: 'vigilant', meaning: 'carefully watchful and alert to possible danger' }
					],
					tfItems: [
						{ q: 'Aggressive advertising can push busy shoppers to buy processed foods without reading labels.', a: 'True', mark: '0.5' },
						{ q: 'Excessive refined sugar and trans fats have no link to obesity or diabetes.', a: 'False', c: 'Nutritionists warn they contribute directly to obesity, diabetes, and fatigue.', mark: '0.5' },
						{ q: 'Consumer associations encourage favouring fresh home-cooked meals and inspecting expiry dates.', a: 'True', mark: '0.5' },
						{ q: 'Ensuring food safety requires cooperation among consumers, ethical producers, and health inspectors.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Why do many shoppers overlook nutritional labels according to paragraph 1?', a: 'Owing to aggressive advertising campaigns highlighting bright colours and rapid convenience.', mark: '1' },
						{ q: 'b) Name two health problems linked to excessive ultra-processed food in paragraph 2.', a: 'Any two of: obesity, diabetes, and fatigue.', mark: '1' },
						{ q: 'c) What duties should food manufacturers respect according to paragraph 3?', a: 'Honest labelling and strict hygiene standards throughout storage and transport.', mark: '1' }
					],
					refQuestion: 'a) "their" (§1)   b) "their" (§2)',
					refAnswer: 'a) "their" (§1) refers to ultra-processed foods.   b) "their" (§2) refers to citizens (consumers).',
					bestTitle: 'Putting Consumer Health and Food Safety First',
					titleOptions: [
						'Putting Consumer Health and Food Safety First',
						'Why Sugar Improves Sports Stamina',
						'The Architecture of Ancient Aqueducts'
					],
					easyQ: 'What three habits do consumer protection associations urge citizens to adopt in paragraph 2?',
					easyAns: 'Inspect expiry dates, read ingredient lists, and favour fresh home-cooked meals',
					easyWrong: [
						'Ignore labels and buy only sugary beverages',
						'Trust bright colours without checking storage dates',
						'Replace every fresh vegetable with packaged snacks'
					],
					medQ: 'What does the first "their" in paragraph 1 refer to?',
					medAns: 'Ultra-processed foods',
					medWrong: ['Busy families', 'Aggressive advertising campaigns', 'Health inspections'],
					hardQ: 'What three-party partnership guarantees food safety according to paragraph 3?',
					hardAns: 'Vigilant consumers, ethical producers, and regular health inspections',
					hardWrong: [
						'Advertising agencies, fast-food chains, and packaging designers',
						'Consumers alone without any inspection laws',
						'Producers alone with no public awareness'
					]
				},
				{
					title: 'Touiza and Community Solidarity: Timeless Algerian Values',
					source: 'Adapted from Algerian Social Heritage Essays',
					paragraphs: [
						'Long before modern charitable foundations existed, Algerian villages and neighbourhoods practised a noble tradition of mutual aid known as Touiza. Whenever a family needed help harvesting olives, repairing a roof before winter, or supporting an orphaned household, neighbours gathered voluntarily so that [[the task]] could be completed swiftly without expecting payment.',
						'Rooted deeply in Islamic brotherhood and civic responsibility, this spirit of solidarity remains remarkably alive today. During floods, forest fires, or the blessed month of Ramadan, Algerian youth associations, doctors, and ordinary citizens mobilize within hours in order that affected families receive food, shelter, and warm encouragement.',
						'Sociologists emphasize that material wealth alone cannot build a resilient society. When generosity, empathy, and volunteer service guide [[young people]], communities overcome hardships with dignity and unity.'
					],
					glossary: [
						{ term: 'mutual aid', meaning: 'voluntary cooperation where neighbours help one another' },
						{ term: 'resilient', meaning: 'strong enough to recover quickly from crises and hardships' }
					],
					tfItems: [
						{ q: 'Touiza is a traditional Algerian practice of voluntary mutual aid among neighbours.', a: 'True', mark: '0.5' },
						{ q: 'Participants in Touiza demanded high salaries before helping their neighbours.', a: 'False', c: 'Neighbours gathered voluntarily without expecting payment.', mark: '0.5' },
						{ q: 'Modern Algerian youth and citizens still mobilize quickly during crises and Ramadan.', a: 'True', mark: '0.5' },
						{ q: 'According to sociologists, material wealth alone is sufficient to build a resilient society.', a: 'False', c: 'Material wealth alone cannot build a resilient society; generosity, empathy, and volunteer service are essential.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Give two traditional examples of Touiza mentioned in paragraph 1.', a: 'Any two of: harvesting olives, repairing a roof before winter, and supporting an orphaned household.', mark: '1' },
						{ q: 'b) In what modern situations do Algerian volunteers mobilize rapidly?', a: 'During floods, forest fires, and the blessed month of Ramadan.', mark: '1' },
						{ q: 'c) What qualities help communities overcome hardships with dignity according to paragraph 3?', a: 'Generosity, empathy, and volunteer service.', mark: '1' }
					],
					refQuestion: 'a) "the task" (§1)   b) "young people" (§3)',
					refAnswer: 'a) "the task" refers to harvesting olives, repairing a roof, or supporting an orphaned household.   b) "young people" refers to youth (young Algerian citizens).',
					bestTitle: 'Solidarity and Mutual Aid: The Living Spirit of Touiza',
					titleOptions: [
						'Solidarity and Mutual Aid: The Living Spirit of Touiza',
						'How to Automate Industrial Warehouses',
						'The Origins of Ancient Coin Minting'
					],
					easyQ: 'What is the traditional Algerian practice of voluntary community mutual aid called?',
					easyAns: 'Touiza',
					easyWrong: ['Plagiarism', 'Counterfeiting', 'Taxation'],
					medQ: 'Which purpose connector is used in paragraph 2 ("...in order that affected families receive...")?',
					medAns: 'in order that (expressing purpose with a full clause)',
					medWrong: ['owing to (cause)', 'whereas (contrast)', 'unless (condition)'],
					hardQ: 'What central social conclusion do sociologists highlight in paragraph 3?',
					hardAns: 'True social resilience relies on generosity, empathy, and volunteer service rather than wealth alone',
					hardWrong: [
						'Traditional mutual aid has completely vanished from modern Algeria',
						'Volunteer work is unnecessary once a city becomes wealthy',
						'Only paid contractors can assist neighbours after storms'
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
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع النص جيداً؛ الجواب وارد صراحة في الفقرات الأولى.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'دقق في السياق النحوي والإحالي داخل الفقرة المحددة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Text Study ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد الإجابة الدقيقة من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة الثالثة بتركيز لاستخلاص الفكرة الختامية الشاملة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Synthesis ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الخلاصة الفكرية للنص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الخلاصة الصحيحة هي: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities (7 pts — BAC LE):',
				content: [
					buildEnglishPassageBlock({
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
								header: '1. Choose the correct answer. The text is:',
								options: ['An expository social article', 'A fictional thriller', 'A commercial invoice'],
								correct: 'An expository social article',
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
						content: `3. Answer the following questions according to the text:\n${chosen.whQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.whQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. What or who do the underlined words refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the most appropriate title for the passage:',
								options: chosen.titleOptions,
								correct: chosen.bestTitle,
								mark: '0.5'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع روابط السبب (Owing to) والنتيجة (Consequently) والغاية (so as to / in order that) لفهم بنية المقال.',
					'صحح الجمل الخاطئة في سؤال True/False بمعلومة دقيقة من الفقرة.',
					'انتبه إلى تكرار نفس الضمير (their) في فقرتين مختلفتين فقد يحيل لكل منهما مرجع مختلف!'
				],
				solutionStepsAr: [
					'تحديد نوع المقال الاجتماعي التفسيري (0.5 نقطة).',
					'تصنيف الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة المركزة عن الأسئلة الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان الأنسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. TEXT EXPLORATION (7 pts): Cause/Result/Purpose, Modals of Deduction & Comprehensive Phonology
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t3_exp_cause_purpose_modals',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (7 نقاط — لغات أجنبية): السبب والنتيجة والغاية، أفعال الاستنتاج، والمراجعة الصوتية',
		curriculumLessonId: 'eng_lesson_3as_le_t3_modals_deduction_advice',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Give opposites keeping the same root: healthy / safe / responsible / honest',
					lexisAnswer: 'unhealthy / unsafe / irresponsible / dishonest',
					affixRows: [
						[
							{ content: 'unhealthy', bold: true },
							{ content: '..........', answer: 'un-', mark: '0.15' },
							{ content: '..........', answer: 'health', mark: '0.15' },
							{ content: '..........', answer: '-y', mark: '0.2' }
						],
						[
							{ content: 'solidarity', bold: true },
							{ content: '..........', answer: '—', mark: '0.15' },
							{ content: '..........', answer: 'solid', mark: '0.15' },
							{ content: '..........', answer: '-arity', mark: '0.2' }
						],
						[
							{ content: 'misleading', bold: true },
							{ content: '..........', answer: 'mis-', mark: '0.15' },
							{ content: '..........', answer: 'lead', mark: '0.15' },
							{ content: '..........', answer: '-ing', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) Many shoppers fell ill because the dairy products were poorly stored.\n   b) Owing to .....................................................................',
							answer: '1) b) Owing to the poor storage of the dairy products (OR Owing to the fact that the dairy products were poorly stored), many shoppers fell ill.'
						},
						{
							prompt: '2) a) I am certain that local volunteers reached the village before nightfall.\n   b) Local volunteers must ........................................................',
							answer: '2) b) Local volunteers must have reached the village before nightfall.'
						},
						{
							prompt: '3) a) Combine with (so as not to): Shoppers check expiry dates carefully. They want to avoid food poisoning.',
							answer: '3) b) Shoppers check expiry dates carefully so as not to suffer from (OR so as not to get) food poisoning.'
						}
					],
					phonWords: 'diets - charities - packages - volunteers',
					phonCols: [
						{ header: '/s/', words: ['diets'], mark: '0.25' },
						{ header: '/z/', words: ['charities', 'volunteers'], mark: '0.5' },
						{ header: '/iz/', words: ['packages'], mark: '0.25' }
					],
					clozeWords: 'labels - additives - hygiene - consumers',
					clozePrompt: 'Vigilant (1) .......... always read food (2) .......... to avoid harmful (3) .......... and verify proper (4) .......... .',
					clozeAnswer: '1) consumers   2) labels   3) additives   4) hygiene',
					easyQ: 'In which column is "charities" classified for the pronunciation of final "-s"?',
					easyAns: '/z/',
					easyWrong: ['/iz/', '/s/', 'silent'],
					medQ: 'Rewrite with a deduction modal: I am certain that volunteers reached the village early. Complete: Volunteers .......... the village early.',
					medAns: 'must have reached',
					medWrong: ['cannot have reached', 'might have reached', 'must reach'],
					hardQ: 'Choose the right negative purpose rewrite: Shoppers check expiry dates .......... consume spoiled food.',
					hardAns: 'so as not to',
					hardWrong: ['not so as to', 'so that not', 'owing to not']
				},
				{
					lexisPrompt: 'Find synonyms for: a) solidarity = ..........   b) vigilant = ..........   c) hazardous = ..........',
					lexisAnswer: 'a) unity / mutual aid   b) alert / watchful   c) dangerous / risky',
					affixRows: [
						[
							{ content: 'generosity', bold: true },
							{ content: '..........', answer: '—', mark: '0.15' },
							{ content: '..........', answer: 'generous', mark: '0.15' },
							{ content: '..........', answer: '-ity', mark: '0.2' }
						],
						[
							{ content: 'irresponsible', bold: true },
							{ content: '..........', answer: 'ir-', mark: '0.15' },
							{ content: '..........', answer: 'respons(e)', mark: '0.15' },
							{ content: '..........', answer: '-ible', mark: '0.2' }
						],
						[
							{ content: 'overconsumption', bold: true },
							{ content: '..........', answer: 'over-', mark: '0.15' },
							{ content: '..........', answer: 'consum(e)', mark: '0.15' },
							{ content: '..........', answer: '-ption', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) It is impossible that the certified laboratory approved expired milk.\n   b) The certified laboratory .....................................................',
							answer: '1) b) The certified laboratory cannot have approved expired milk.'
						},
						{
							prompt: '2) a) Combine with (in order that): Neighbours organized Touiza. The elderly family could repair its roof.',
							answer: '2) b) Neighbours organized Touiza in order that the elderly family could repair its roof.'
						},
						{
							prompt: '3) a) Citizens are strongly advised to reduce sugary snacks.\n   b) Citizens ought ...............................................................',
							answer: '3) b) Citizens ought to reduce sugary snacks.'
						}
					],
					phonWords: 'charity - organic - solidarity - nutrition',
					phonCols: [
						{ header: '1st Syllable', words: ['charity'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['organic', 'nutrition'], mark: '0.5' },
						{ header: '3rd Syllable', words: ['solidarity'], mark: '0.25' }
					],
					clozeWords: 'empathy - resilience - volunteers - hardships',
					clozePrompt: 'During difficult (1) .......... , dedicated (2) .......... show remarkable (3) .......... and prove the true (4) .......... of Algerian society.',
					clozeAnswer: '1) hardships   2) volunteers   3) empathy   4) resilience',
					easyQ: 'On which syllable does the main stress fall in "solidarity" (sol-i-dar-i-ty)?',
					easyAns: '3rd syllable (DAR)',
					easyWrong: ['1st syllable (SOL)', '2nd syllable (i)', '4th syllable (i)'],
					medQ: 'Rewrite for past impossibility: It is impossible that the lab approved expired milk. Complete: The lab .......... expired milk.',
					medAns: 'cannot have approved',
					medWrong: ['must not have approved', 'might not approved', 'ought not approve'],
					hardQ: 'Combine accurately with "in order that": Neighbours organized Touiza. The family could repair its roof.',
					hardAns: 'Neighbours organized Touiza in order that the family could repair its roof.',
					hardWrong: [
						'Neighbours organized Touiza in order that the family can repair its roof.',
						'Neighbours organized Touiza in order to the family could repair its roof.',
						'Neighbours organized Touiza so as to the family repair its roof.'
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
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع المراجعة الصوتية الشاملة: -ies تأخذ /z/، و -ty تنبر الثالث من النهاية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصوتي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصوتية الدقيقة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تذكر: يقين ماضٍ = must have V3، استحالة ماضية = cannot have V3 (وليس must not have).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر فعل الاستنتاج الصحيح للماضي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `فعل الاستنتاج الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه لـ so as not to + Stem، ولتوافق زمن could بعد in order that مع الفعل الماضي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر جملة الغاية الصحيحة نحوياً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصيغة الصحيحة للغاية هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully (7 pts — BAC LE):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: '2. Divide the following words into Prefix, Root, and Suffix:'
					},
					{
						type: 'table',
						headers: ['Word', 'Prefix', 'Root', 'Suffix'],
						cells: [],
						rows: chosen.affixRows,
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `3. Rewrite or combine the sentences below:\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '2.5'
					},
					{
						type: 'text',
						content: `4. Classify the following words accurately: (${chosen.phonWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.phonCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
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
				domain: 'grammar_syntax',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'بعد Owing to نضع عبارة اسمية أو Owing to the fact that + جملة كاملة.',
					'نفي الاستنتاج اليقيني must have + V3 هو cannot have + V3 وليس must not have.',
					'تذكر إضافة to بعد ought (ought to + Stem) وحذفها بعد should و had better.'
				],
				solutionStepsAr: [
					'حل سؤال الأضداد أو المرادفات (1 نقطة).',
					'تفكيك الكلمات الثلاث في جدول Prefix/Root/Suffix (1.5 نقطة).',
					'إنجاز تحويلات السبب والغاية والاستنتاج (2.5 نقطة).',
					'تصنيف الصوتيات وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (7 pts): Full BAC LE Review + 4-Sentence Discourse Reordering
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t3_exp_full_bac_le_reordering',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'phonology_pronunciation',
		titleAr: 'البناء اللغوي الشامل (7 نقاط — لغات أجنبية): مراجعة شاملة لقواعد البكالوريا وترتيب الفقرة والصوتيات',
		curriculumLessonId: 'eng_lesson_3as_le_t3_phonology_comprehensive',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Match each BAC key term with its definition: a) obesity   b) solidarity   c) accountability\n(1. mutual unity and support   2. excessive unhealthy body weight   3. accepting full responsibility for actions)',
					lexisAnswer: 'a - 2   |   b - 1   |   c - 3',
					morphRows: [
						{ verb: { given: true, value: 'to advertise' }, noun: { value: 'advertisement / advertising', mark: '0.25' }, adjective: { value: 'advertised', mark: '0.25' } },
						{ verb: { value: 'to donate', mark: '0.25' }, noun: { given: true, value: 'donation' }, adjective: { value: 'donated', mark: '0.25' } },
						{ verb: { value: 'to protect', mark: '0.25' }, noun: { value: 'protection', mark: '0.25' }, adjective: { given: true, value: 'protective' } }
					],
					rewrites: [
						{
							prompt: '1) a) Fast food contains high saturated fat; consequently, regular consumption threatens heart health.\n   b) Because fast food ...........................................................',
							answer: '1) b) Because fast food contains high saturated fat, regular consumption threatens heart health.'
						},
						{
							prompt: '2) a) The company did not test the canned oil before selling it. (Express past blame with: should have)\n   b) The company .................................................................',
							answer: '2) b) The company should have tested the canned oil before selling it.'
						}
					],
					phonWords: 'donated - produced - volunteered - protected',
					phonCols: [
						{ header: '/t/', words: ['produced'], mark: '0.25' },
						{ header: '/d/', words: ['volunteered'], mark: '0.25' },
						{ header: '/id/', words: ['donated', 'protected'], mark: '0.5' }
					],
					reorderPrompt:
						'Reorder the following four sentences to make a coherent paragraph:\n(a) Consequently, rates of childhood obesity and fatigue have risen noticeably.\n(b) Aggressive food advertising often targets young viewers with colourful snacks.\n(c) Therefore, parents and schools must guide children toward balanced home-cooked meals.\n(d) These adverts rarely mention the excessive sugar and additives hidden inside.',
					reorderAnswer: 'Correct order: 1-b   2-d   3-a   4-c',
					easyQ: 'How is final "-ed" pronounced in the verb "produced"?',
					easyAns: '/t/',
					easyWrong: ['/d/', '/id/', 'silent'],
					medQ: 'Express past blame: The company did not test the oil before selling it. Complete: The company .......... the oil before selling it.',
					medAns: 'should have tested',
					medWrong: ['should test', 'must test', 'cannot have tested'],
					hardQ: 'What is the exact coherent order of the four sentences (a, b, c, d) about food advertising?',
					hardAns: 'b - d - a - c',
					hardWrong: ['d - b - a - c', 'b - a - d - c', 'c - b - d - a']
				},
				{
					lexisPrompt: 'Give synonyms for: a) volunteer = ..........   b) consume = ..........   c) preserve = ..........',
					lexisAnswer: 'a) offer unpaid help   b) eat / use up   c) protect / safeguard',
					morphRows: [
						{ verb: { given: true, value: 'to volunteer' }, noun: { value: 'volunteerism / volunteer', mark: '0.25' }, adjective: { value: 'voluntary', mark: '0.25' } },
						{ verb: { value: 'to nourish', mark: '0.25' }, noun: { given: true, value: 'nourishment' }, adjective: { value: 'nourishing', mark: '0.25' } },
						{ verb: { value: 'to cooperate', mark: '0.25' }, noun: { value: 'cooperation', mark: '0.25' }, adjective: { given: true, value: 'cooperative' } }
					],
					rewrites: [
						{
							prompt: '1) a) Perhaps the advert misled young buyers about the real ingredients.\n   b) The advert might ............................................................',
							answer: '1) b) The advert might have misled young buyers about the real ingredients.'
						},
						{
							prompt: '2) a) Volunteers are packing emergency food parcels right now.\n   b) Emergency food parcels ......................................................',
							answer: '2) b) Emergency food parcels are being packed by volunteers right now.'
						}
					],
					phonWords: 'campaign - biscuit - honest - knowledge',
					phonCols: [
						{ header: 'Silent g', words: ['campaign'], mark: '0.25' },
						{ header: 'Silent u', words: ['biscuit'], mark: '0.25' },
						{ header: 'Silent h', words: ['honest'], mark: '0.25' },
						{ header: 'Silent k', words: ['knowledge'], mark: '0.25' }
					],
					reorderPrompt:
						'Reorder the following four sentences to make a coherent paragraph:\n(a) Within hours, youth associations collected blankets, medicine, and warm meals.\n(b) Last winter, heavy snow isolated several mountain villages across eastern Algeria.\n(c) This swift compassion proved once again that solidarity is deeply rooted in Algerian hearts.\n(d) Volunteers then cleared key roads so that relief trucks could reach every home.',
					reorderAnswer: 'Correct order: 1-b   2-a   3-d   4-c',
					easyQ: 'Which letter is silent in the word "campaign"?',
					easyAns: 'g',
					easyWrong: ['c', 'p', 'n'],
					medQ: 'Rewrite for past possibility: Perhaps the advert misled buyers. Complete: The advert .......... buyers.',
					medAns: 'might have misled',
					medWrong: ['must have misled', 'cannot have misled', 'might mislead'],
					hardQ: 'What is the exact coherent order of the four sentences (a, b, c, d) about winter solidarity?',
					hardAns: 'b - a - d - c',
					hardWrong: ['a - b - d - c', 'b - d - a - c', 'c - b - a - d']
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع المراجعة الصوتية الشاملة لـ Final -ed والحروف الصامتة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصوتي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصوتي الدقيق هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تذكر: اللوم على الماضي = should have + V3، والاحتمال الماضي = might have + V3.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الصيغة النحوية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصيغة الصحيحة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تتبع التسلسل الزمني والمنطقي (الحدث العام، التفصيل بـ These/Within hours/then، والنتيجة الختامية).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد الترتيب الصحيح للفقرة المبعثرة (BAC LE):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الترتيب المتسق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following comprehensive BAC LE language activities (7 pts):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building table:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Rewrite sentence (b) so that it means the same as sentence (a):\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: `4. Classify the following words accurately: (${chosen.phonWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.phonCols }),
					{
						type: 'text',
						content: `5. ${chosen.reorderPrompt}`,
						answer: chosen.reorderAnswer,
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
				domain: 'phonology_pronunciation',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'احذف consequently عند التحويل إلى Because وضع جملة السبب مباشرة بعد Because.',
					'للندم واللوم على الماضي نستعمل should have + V3 وللاحتمال الماضي might have + V3.',
					'في ترتيب الفقرة ابحث أولاً عن الجملة العامة ثم تتبع الضمائر وروابط الزمن والنتيجة.'
				],
				solutionStepsAr: [
					'ربط المفردات بتعريفاتها أو مرادفاتها (1 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إنجاز تحويلات القواعد المتنوعة (2 نقطتان).',
					'تصنيف الصوتيات وترتيب الفقرة المتسقة (2.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. WRITTEN EXPRESSION (6 pts — Integration): BAC LE 6-Point Essay Mastery (Argumentative / Speech / Article)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t3_we_bac_le_six_point_essay',
		grade: '3as_le',
		trimesterId: 't3',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): إتقان المقال الحجاجي والصحفي والخطاب الرسمي (سلامة المستهلك والتضامن)',
		curriculumLessonId: 'eng_lesson_3as_le_t3_bac_le_essay_mastery',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Write an argumentative essay of about 120 to 150 words discussing whether commercial food advertising helps consumers make informed choices or manipulates young people into unhealthy diets, using the notes below.',
					topicOneNotes: [
						'Proponents view: informs families about new products, promotions, and availability',
						'Counter-argument & rebuttal: misleading visuals hide high sugar, salt, and additives, fueling obesity and diabetes',
						'Practical balance: strict advertising laws, clear nutritional labels, nutrition education at home and school'
					],
					topicTwoPrompt:
						'Write a formal speech of about 120 to 150 words to your school community celebrating Algerian solidarity (Touiza and volunteer charity) and inviting classmates to join a seasonal aid drive for needy families.',
					modelAnswer:
						'Commercial advertising surrounds modern consumers on television, billboards, and smartphones. Supporters often claim that food adverts perform a helpful service by informing families about new products and competitive prices. While accurate product information can indeed benefit shoppers, the reality of contemporary food marketing tells a far more troubling story.\nIn practice, aggressive campaigns frequently target children and teenagers with bright visuals while concealing excessive refined sugar, saturated fat, and artificial preservatives. Owing to such persuasive tactics, many young people abandon nourishing home-cooked meals for ultra-processed snacks; consequently, rates of obesity and fatigue rise steadily. Therefore, authorities ought to enforce honest labelling rules and restrict misleading adverts aimed at minors, while parents educate youngsters to read ingredients critically.\nIn conclusion, advertising serves society only when strict ethics and consumer safety outweigh quick commercial profit.',
					easyQ: 'What is the recommended time to dedicate to the 6-point Written Expression during the 3h30 BAC LE exam?',
					easyAns: 'About 60 to 70 minutes (planning, drafting, revising, and clean writing)',
					easyWrong: ['Only 5 minutes at the very end', 'The entire 3 hours and 30 minutes', 'Zero minutes'],
					medQ: 'Which academic sentence smoothly combines cause and result in this food-safety essay?',
					medAns: 'Owing to excessive sugar in ultra-processed snacks, obesity rates rise; consequently, families must read labels.',
					medWrong: [
						'Because of snacks have sugar, obesity rises.',
						'Owing to snacks are sweet, so families read labels.',
						'Consequently snacks are sweet, because obesity rises.'
					],
					hardQ: 'What makes Body Paragraph 1 and Body Paragraph 2 genuinely "argumentative" in the model answer?',
					hardAns: 'Acknowledging the opposing view fairly ("While accurate information...") before rebutting it with concrete health evidence',
					hardWrong: [
						'Listing random food names without taking a clear stand',
						'Using informal abbreviations and exclamation marks everywhere',
						'Ignoring the counter-argument and repeating one sentence'
					]
				},
				{
					topicOnePrompt:
						'Write a formal speech of about 120 to 150 words delivered at a community youth day promoting volunteer solidarity (inspired by Algerian Touiza) to support orphans and elderly neighbours, using the notes below.',
					topicOneNotes: [
						'Warm formal greeting to teachers, parents, and fellow youth',
						'Recall the heritage of Touiza and Islamic values of compassion and brotherhood',
						'Concrete youth actions: school-supply drives, winter clothes collection, helping elderly neighbours, tutoring younger pupils',
						'Inspiring closing invitation and formal thanks'
					],
					topicTwoPrompt:
						'Write a newspaper article of about 120 to 150 words advising Algerian families on practical steps to ensure food safety and healthy nutrition during hot summer months.',
					modelAnswer:
						'Ladies and gentlemen, respected teachers, and dear fellow youth,\nToday we gather to celebrate one of the noblest pillars of Algerian identity: voluntary solidarity. For generations, our ancestors lived by the spirit of Touiza, uniting whenever a neighbour needed a roof repaired, a harvest gathered, or an orphaned family comforted.\nIn our fast-paced digital age, this timeless compassion is needed more than ever. We ought to prove that young Algerians care deeply about their communities through concrete action. Together, we can organize school-supply drives before every autumn term, collect warm blankets for mountain villages in winter, assist elderly neighbours with daily errands, and offer free tutoring to younger pupils.\nLet us remember that a single kind act multiplies when shared. Join our volunteer initiative today so that no needy household feels forgotten. Thank you warmly for your attention and generous support.',
					easyQ: 'Which opening is strictly appropriate for a Formal Speech at a community youth day?',
					easyAns: 'Ladies and gentlemen, respected teachers, and dear fellow youth,',
					easyWrong: [
						'Dear Sir or Madam, I enclose my CV,',
						'Headline: Youth Day Report',
						'Yo everybody, listen up!'
					],
					medQ: 'Which purpose structure fits naturally into the speech call to action?',
					medAns: 'Join our volunteer initiative so that no needy household feels forgotten.',
					medWrong: [
						'Join our initiative so as to no household feels forgotten.',
						'Join our initiative in order to no household feels forgotten.',
						'Join our initiative owing to no household feels forgotten.'
					],
					hardQ: 'Which four criteria make up the 6-point BAC LE Written Expression marking scale?',
					hardAns: 'Relevance & Format (1.5), Semantic Coherence (1), Correct Use of English (2), and Excellence & Vocabulary (1.5)',
					hardWrong: [
						'Only handwriting size (6 pts)',
						'Copying the reading passage word for word (6 pts)',
						'Word count alone regardless of grammar or topic (6 pts)'
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
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع منهجية التعبير الكتابي وتوزيع الوقت والقوالب في شعبة اللغات الأجنبية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة المنهجية السليمة لبكالوريا اللغات الأجنبية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصواب المنهجي هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من سلامة روابط السبب والنتيجة والغاية (Owing to, consequently, so that).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الجملة الأكاديمية السليمة نحوياً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة الصحيحة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع سلم التنقيط (6 نقاط) ومعايير التميز في المقال الحجاجي والخطاب الرسمي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحليل المنهجي الأدق للامتياز في 6 نقاط:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART TWO: Written Expression',
				points: 6,
				instruction: 'Choose ONE of the following topics (120 to 150 words — 6 pts BAC LE):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: chosen.topicOnePrompt,
						topicOneNotes: chosen.topicOneNotes,
						topicTwoPrompt: chosen.topicTwoPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: 'Relevance & Format (1.5 pts) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence & Vocabulary (1.5 pts)',
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't3',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'حدد قالب النص بدقة قبل البدء (Argumentative Essay، Formal Speech، أو Newspaper Article).',
					'وظف روابط متقدمة للسبب والنتيجة والغاية (Owing to, Consequently, So that, In order that) وأفعال النصح (ought to).',
					'خصص 15 دقيقة في نهاية الامتحان لتنقيح الأزمنة والترقيم والمفردات الأكاديمية.'
				],
				solutionStepsAr: [
					'تحليل المطلوب واختيار الموضوع وتحديد القالب المناسب.',
					'رسم مخطط من 3 إلى 4 فقرات متوازنة.',
					'تحرير المقال بلغة رسمية دقيقة ومتماسكة وروابط متنوعة.',
					'المراجعة النهائية لضمان العلامة الكاملة (6/6).'
				],
				finalAnswer
			};
		}
	}
];
