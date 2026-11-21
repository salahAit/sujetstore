import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Comprehension (4 pts) — Clean Animals, Nature & Healthy Food
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension3apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t3_comprehension',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: الحيوانات الطاهرة والغذاء الصحي',
	curriculumLessonId: 'eng_lesson_3ap_t3_healthy_food',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				pupil: 'Khadidja',
				likes: 'dates, apples and milk',
				dislikes: 'soda',
				animal: 'white cat',
				nature: 'green trees and yellow flowers',
				paragraphs: [
					'Hello! My name is [[Khadidja]]. I am 8 years old. Every morning, I eat healthy food. I like [[dates]], apples and warm milk. I do not like soda.',
					'In our clean garden, there are green trees and yellow flowers. I have a small white cat and two little birds.'
				],
				q1: 'What healthy food does Khadidja like?',
				a1: 'She likes dates, apples and warm milk.',
				q2: 'What animals are in her garden?',
				a2: 'A small white cat and two little birds.',
				tf1Q: 'Khadidja likes soda.',
				tf1A: 'False',
				tf1C: 'She does not like soda.',
				tf2Q: 'There are green trees in the garden.',
				tf2A: 'True',
				mcqQ: 'What does Khadidja NOT like?',
				mcqCorrect: 'soda',
				mcqDistractors: [
					{ text: 'dates', diagnosticFeedback: 'The text says: I like dates, apples and warm milk.' },
					{ text: 'apples', diagnosticFeedback: 'Khadidja likes apples.' },
					{ text: 'milk', diagnosticFeedback: 'Khadidja likes warm milk.' }
				]
			},
			{
				pupil: 'Youssef',
				likes: 'bread, honey and oranges',
				dislikes: 'candy',
				animal: 'brown camel',
				nature: 'olive trees and bright sun',
				paragraphs: [
					'Good morning! My name is [[Youssef]]. On Friday, I visit my grandfather farm. I see three sheep, a brown [[camel]] and two horses under the green olive trees.',
					'At breakfast, I like bread, honey and fresh oranges. I drink clean water. I do not like candy.'
				],
				q1: 'What does Youssef like for breakfast?',
				a1: 'He likes bread, honey and fresh oranges.',
				q2: 'What animals does he see on the farm?',
				a2: 'Three sheep, a brown camel and two horses.',
				tf1Q: 'Youssef drinks clean water.',
				tf1A: 'True',
				tf2Q: 'Youssef likes candy.',
				tf2A: 'False',
				tf2C: 'He does not like candy.',
				mcqQ: 'Where does Youssef go on Friday?',
				mcqCorrect: 'To his grandfather farm',
				mcqDistractors: [
					{ text: 'To school', diagnosticFeedback: 'Friday is the weekend; he visits the farm.' },
					{ text: 'To a candy shop', diagnosticFeedback: 'He does not like candy.' },
					{ text: 'To the classroom', diagnosticFeedback: 'Read sentence two of paragraph one.' }
				]
			},
			{
				pupil: 'Ines',
				likes: 'bananas, cheese and water',
				dislikes: 'sweets',
				animal: 'small rabbit',
				nature: 'red flowers and a big tree',
				paragraphs: [
					'Hi! I am [[Ines]]. I love nature and clean animals. Near our house, there is a big tree with red flowers. I see a small [[rabbit]] and five birds.',
					'I eat good food to stay strong. I like bananas, bread, cheese and cold water. I do not like sweets.'
				],
				q1: 'What does Ines like to eat and drink?',
				a1: 'She likes bananas, bread, cheese and cold water.',
				q2: 'How many birds does Ines see?',
				a2: 'She sees five birds.',
				tf1Q: 'Ines sees a big camel near her house.',
				tf1A: 'False',
				tf1C: 'She sees a small rabbit and five birds.',
				tf2Q: 'Ines likes bananas and cheese.',
				tf2A: 'True',
				mcqQ: 'How many birds does Ines see?',
				mcqCorrect: 'five birds',
				mcqDistractors: [
					{ text: 'two birds', diagnosticFeedback: 'Read paragraph one carefully for the exact number.' },
					{ text: 'ten birds', diagnosticFeedback: 'The text mentions five birds, not ten.' },
					{ text: 'one bird', diagnosticFeedback: 'Check the number before the word birds.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqDistractors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the text and choose the right answer:\n"${plainText}"\nQuestion: ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة موجودة في النص: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully, then answer the questions:',
			content: [
				buildEnglishPassageBlock({
					title: 'Nature and Healthy Food',
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_ara_05_fresh_fruits_honey_basket', {
					lang: 'en',
					title: 'Healthy Food: Fresh Fruits and Pure Honey',
					customLegend: [
						{ num: '1', label: 'Fresh fruits (apples, oranges, grapes)' },
						{ num: '2', label: 'Pure honey and olive oil' }
					],
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'text',
					content: `1) ${sc.q1}`,
					answer: sc.a1,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ${sc.q2}`,
					answer: sc.a2,
					mark: '1'
				},
				{
					type: 'true_false',
					items: [
						{ q: `3) ${sc.tf1Q}`, a: sc.tf1A, c: sc.tf1C, mark: '1' },
						{ q: `4) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج الأطعمة التي يحبها التلميذ بعد عبارة I like.',
				'ابحث في النص عن أسماء الحيوانات وأعدادها.',
				'انتبه لكلمة do not like عند الإجابة عن True/False.'
			],
			solutionStepsAr: [
				`إجابة السؤال 1: ${sc.a1}`,
				`إجابة السؤال 2: ${sc.a2}`,
				`صحيح أو خطأ: (3) ${sc.tf1A} — (4) ${sc.tf2A}.`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Likes / Dislikes + Food & Drinks + Plural -s
// ═══════════════════════════════════════════════════════════════════════════════
const likesFood3apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t3_likes_food',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد: التفضيل (I like / I do not like) والجمع والطعام والشراب',
	curriculumLessonId: 'eng_lesson_3ap_t3_likes_dislikes',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				negFrom: 'I like sweets.',
				negTo: 'I do not like sweets.',
				words: ['dates', 'milk', 'bread', 'water'],
				foodCol: 'dates , bread',
				drinkCol: 'milk , water',
				pluralQ: 'one apple : three ............  |  one cat : two ............',
				pluralA: 'three apples  |  two cats',
				mcqPrompt: 'Choose the correct negative sentence (النفي الصحيح):',
				mcqCorrect: 'I do not like soda.',
				mcqDistractors: [
					{ text: 'I no like soda.', diagnosticFeedback: 'Use do not before like, not no.' },
					{ text: 'I am not like soda.', diagnosticFeedback: 'Use do not with the verb like.' },
					{ text: 'I not like soda.', diagnosticFeedback: 'The helper word do is missing.' }
				]
			},
			{
				negFrom: 'I like candy.',
				negTo: 'I do not like candy.',
				words: ['apple', 'juice', 'honey', 'milk'],
				foodCol: 'apple , honey',
				drinkCol: 'juice , milk',
				pluralQ: 'one bird : four ............  |  one tree : five ............',
				pluralA: 'four birds  |  five trees',
				mcqPrompt: 'Complete the short answer: "Do you like dates? Yes, I ...... ."',
				mcqCorrect: 'do',
				mcqDistractors: [
					{ text: 'am', diagnosticFeedback: 'The question starts with Do, so answer Yes, I do.' },
					{ text: 'is', diagnosticFeedback: 'is cannot go with I.' },
					{ text: 'like', diagnosticFeedback: 'In short answers we say Yes, I do.' }
				]
			},
			{
				negFrom: 'I like soda.',
				negTo: 'I do not like soda.',
				words: ['cheese', 'water', 'banana', 'milk'],
				foodCol: 'cheese , banana',
				drinkCol: 'water , milk',
				pluralQ: 'one flower : six ............  |  one camel : two ............',
				pluralA: 'six flowers  |  two camels',
				mcqPrompt: 'Choose the right plural for "three + bird":',
				mcqCorrect: 'three birds',
				mcqDistractors: [
					{ text: 'three bird', diagnosticFeedback: 'Add -s to the noun in the plural.' },
					{ text: 'a three birds', diagnosticFeedback: 'Never use a with plural numbers.' },
					{ text: 'birds three', diagnosticFeedback: 'Put the number before the noun.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول التفضيل والجمع:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Likes, Food and Plural)',
			points: 3,
			instruction: 'Do the three tasks below:',
			content: [
				{
					type: 'text',
					content: `Task 1: Turn into the negative form: "${s.negFrom}"`,
					answer: s.negTo,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Classify in the table: ( ${s.words.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['Healthy Food', 'Healthy Drinks'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.foodCol, mark: '0.5' },
							{ content: '....................', answer: s.drinkCol, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 3: Write in the plural: ${s.pluralQ}`,
					answer: s.pluralA,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'لنفي جملة I like نضيف do not قبل like فتصبح I do not like.',
				'ميّز بين الأطعمة التي نأكلها والمشروبات التي نشربها (water, milk, juice).',
				'في الجمع البسيط نضيف الحرف s إلى آخر الاسم.'
			],
			solutionStepsAr: [
				`النفي: ${s.negTo}`,
				`التصنيف: Food (${s.foodCol}) — Drinks (${s.drinkCol}).`,
				`الجمع: ${s.pluralA}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Animals, Nature & Sentence Building
// ═══════════════════════════════════════════════════════════════════════════════
const animalsSentences3apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t3_animals_sentences',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'vocabulary_morphology',
	titleAr: 'رصيد لغوي: الحيوانات والطبيعة وترتيب الجمل والترقيم',
	curriculumLessonId: 'eng_lesson_3ap_t3_animals_nature',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				words: ['camel', 'tree', 'bird', 'flower'],
				animalsCol: 'camel , bird',
				natureCol: 'tree , flower',
				scrambled: 'like / apples / I / and / dates / .',
				ordered: 'I like apples and dates.',
				punctRaw: 'do you like milk',
				punctAns: 'Do you like milk?',
				mcqPrompt: 'Choose the correct word order: (like / milk / I / bread / and / .)',
				mcqCorrect: 'I like bread and milk.',
				mcqDistractors: [
					{ text: 'Like I bread and milk.', diagnosticFeedback: 'Start the sentence with the subject I.' },
					{ text: 'I bread like and milk.', diagnosticFeedback: 'Put the verb like right after I.' },
					{ text: 'And milk I like bread.', diagnosticFeedback: 'Do not start with and.' }
				]
			},
			{
				words: ['sheep', 'sun', 'cat', 'tree'],
				animalsCol: 'sheep , cat',
				natureCol: 'sun , tree',
				scrambled: 'drink / I / water / clean / .',
				ordered: 'I drink clean water.',
				punctRaw: 'i like honey and bread',
				punctAns: 'I like honey and bread.',
				mcqPrompt: 'Which punctuation mark ends the question "Do you like apples......"?',
				mcqCorrect: '?',
				mcqDistractors: [
					{ text: '.', diagnosticFeedback: 'A full stop ends a statement, not a question.' },
					{ text: ',', diagnosticFeedback: 'A comma pauses inside a sentence.' },
					{ text: '!', diagnosticFeedback: 'Use a question mark (?) for questions.' }
				]
			},
			{
				words: ['horse', 'flower', 'rabbit', 'garden'],
				animalsCol: 'horse , rabbit',
				natureCol: 'flower , garden',
				scrambled: 'eat / an / I / apple / .',
				ordered: 'I eat an apple.',
				punctRaw: 'hello, my name is bilal',
				punctAns: 'Hello, my name is Bilal.',
				mcqPrompt: 'Which word is a clean animal?',
				mcqCorrect: 'camel',
				mcqDistractors: [
					{ text: 'flower', diagnosticFeedback: 'flower is a plant in nature.' },
					{ text: 'bread', diagnosticFeedback: 'bread is food.' },
					{ text: 'ruler', diagnosticFeedback: 'ruler is a school object.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في المفردات وبناء الجملة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Animals, Nature and Sentences)',
			points: 3,
			instruction: 'Answer the following tasks carefully:',
			content: [
				buildIllustratedFigureBlock('pri_lang_03_weather_icons_quad', {
					lang: 'en',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Classify the words in the table: ( ${s.words.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['Animals', 'Nature'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.animalsCol, mark: '0.5' },
							{ content: '....................', answer: s.natureCol, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 2: Reorder the words to make a correct sentence: ( ${s.scrambled} )`,
					answer: s.ordered,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Add capital letters and punctuation (. or ?): "${s.punctRaw}"`,
					answer: s.punctAns,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'فرّق بين أسماء الحيوانات (camel, sheep, cat, bird) وعناصر الطبيعة (tree, flower, sun, garden).',
				'ابدأ الجملة الخبرية بالفاعل (I) ثم الفعل (like / eat / drink).',
				'ضع علامة الاستفهام (?) في آخر السؤال، والنقطة (.) في آخر الجملة الخبرية.'
			],
			solutionStepsAr: [
				`التصنيف: Animals (${s.animalsCol}) — Nature (${s.natureCol}).`,
				`الترتيب: ${s.ordered}`,
				`الترقيم والحروف الكبيرة: ${s.punctAns}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — Completing an ID Card & 3-Sentence Introduction
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression3apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t3_written_expression',
	grade: '3ap',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: بطاقة تعريف و3 جمل عن نفسي وغذائي الصحي',
	curriculumLessonId: 'eng_lesson_3ap_t3_guided_sentences',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				name: 'Sami',
				age: '8',
				likeFood: 'dates and milk',
				dislikeFood: 'candy',
				pet: 'white cat',
				model: 'Hello! My name is Sami. I am 8 years old. I like dates and milk, and I do not like candy. I have a small white cat.',
				mcqQ: 'Which paragraph correctly turns the ID card (Name: Sami / Age: 8 / Like: dates) into sentences?',
				mcqCorrect: 'My name is Sami. I am 8 years old. I like dates.',
				mcqDistractors: [
					{ text: 'My name is 8. I am dates. I like Sami.', diagnosticFeedback: 'The fields are mixed up.' },
					{ text: 'Sami my name. Eight old. Dates like.', diagnosticFeedback: 'Missing verbs (is, am) and subject (I).' },
					{ text: 'Hello dates! Goodbye Sami!', diagnosticFeedback: 'This does not introduce Sami.' }
				]
			},
			{
				name: 'Fatima',
				age: '8',
				likeFood: 'apples and honey',
				dislikeFood: 'soda',
				pet: 'two birds',
				model: 'Good morning! My name is Fatima. I am 8 years old. I like apples and honey, and I do not like soda. I love two little birds in our garden.',
				mcqQ: 'Choose the best sentence about healthy food:',
				mcqCorrect: 'I like apples and honey, and I do not like soda.',
				mcqDistractors: [
					{ text: 'I am apples and honey.', diagnosticFeedback: 'Use I like, not I am, for food.' },
					{ text: 'I no like soda and apple.', diagnosticFeedback: 'Negative form is I do not like.' },
					{ text: 'Apples like I honey.', diagnosticFeedback: 'Subject I must come first.' }
				]
			},
			{
				name: 'Nabil',
				age: '9',
				likeFood: 'bread, cheese and water',
				dislikeFood: 'sweets',
				pet: 'brown camel',
				model: 'Hi! My name is Nabil. I am 9 years old. I like bread, cheese and water. I do not like sweets. I love camels and green trees.',
				mcqQ: 'Which sentence has both correct grammar and punctuation?',
				mcqCorrect: 'I like bread and cheese.',
				mcqDistractors: [
					{ text: 'i like bread and cheese', diagnosticFeedback: 'Capitalize I and add a full stop.' },
					{ text: 'I likes bread and cheese?', diagnosticFeedback: 'Use like with I and a full stop at the end.' },
					{ text: 'My like bread and cheese.', diagnosticFeedback: 'Use the subject pronoun I, not My.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الفقرة أو الجملة الصحيحة للوضعية الإدماجية:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الخيار الصحيح هو: «${pr.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Three: Written Expression',
			points: 3,
			content: [
				buildIllustratedFigureBlock('pri_ara_06_four_seasons_trees', {
					lang: 'en',
					title: 'Green Trees and Nature in All Four Seasons',
					customLegend: [
						{ num: '1', label: 'Spring flowers and summer fruits' },
						{ num: '2', label: 'Autumn leaves and winter snow' }
					],
					maxHeight: 102,
					width: '54%'
				}),
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt: `Read ${pr.name} ID Card and write 3 or 4 clean sentences introducing ${pr.name} and healthy food likes:`,
					topicOneNotes: [
						`Name: ${pr.name}`,
						`Age: ${pr.age} years old`,
						`Likes: ${pr.likeFood}`,
						`Dislikes: ${pr.dislikeFood}`,
						`Clean animal: ${pr.pet}`
					],
					modelAnswer: pr.model,
					rubricSummary: 'All ID card items included (1 pt), correct use of My name is / I am / I like / I do not like (1 pt), capital letters and full stops (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ بالاسم والعمر: Hello! My name is ... I am ... years old.',
				'عبّر عن الغذاء الصحي بـ I like ... و I do not like ...',
				'راجع الحروف الكبيرة في بداية كل جملة والنقطة في نهايتها.'
			],
			solutionStepsAr: [
				'تحويل كل سطر من البطاقة إلى جملة مستقلة.',
				'توظيف and للربط بين الأطعمة الصحية.',
				`النموذج المقترح: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T3: EnglishParameterizedTemplate[] = [
	comprehension3apT3,
	likesFood3apT3,
	animalsSentences3apT3,
	writtenExpression3apT3
];
