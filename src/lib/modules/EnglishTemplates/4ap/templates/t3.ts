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

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Comprehension (4 pts) — Animals & Habitats, Seasons & Healthy Habits
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension4apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t3_comprehension',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: الحيوانات ومواطنها والفصول والعادات الصحية',
	curriculumLessonId: 'eng_lesson_4ap_t3_animals_habitats',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				title: 'The Fennec Fox of Algeria',
				animal: 'Fennec fox',
				habitat: 'Algerian desert',
				food: 'fruit, insects and small roots',
				ability: 'run very fast and hear well',
				paragraphs: [
					'The [[fennec]] is a small, cute animal with big ears and light brown fur. It lives in the Algerian [[desert]]. In summer, the desert is very hot and sunny, so the fennec rests during the day.',
					'It eats fruit, roots and insects. It can run very fast on the sand and it can hear very well, but it cannot swim in the sea. We must protect Algerian desert animals.'
				],
				q1: 'Where does the fennec live?',
				a1: 'It lives in the Algerian desert.',
				tf1Q: 'In summer, the desert is cold and snowy.',
				tf1A: 'False',
				tf1C: 'In summer, the desert is very hot and sunny.',
				tf2Q: 'The fennec can run very fast.',
				tf2A: 'True',
				mcqQ: 'Where does the fennec fox live?',
				mcqCorrect: 'In the Algerian desert',
				mcqDistractors: [
					{ text: 'In the cold sea', diagnosticFeedback: 'The text says: It lives in the Algerian desert.' },
					{ text: 'On a farm', diagnosticFeedback: 'The fennec is a wild desert animal.' },
					{ text: 'In a snowy forest', diagnosticFeedback: 'Read paragraph one carefully.' }
				]
			},
			{
				title: 'Spring on Grandfather Farm',
				animal: 'Sheep and horses',
				habitat: 'Green farm',
				food: 'fresh grass and hay',
				ability: 'run in the fields',
				paragraphs: [
					'My favourite season is [[spring]]. In spring, the weather is sunny and warm, and colourful flowers grow everywhere. Every Friday in spring, I visit my grandfather [[farm]].',
					'On the farm, there are white sheep, brown horses and cows. They eat fresh green grass. At breakfast, I wash my hands, eat bread with natural honey, fresh fruit and drink warm milk.'
				],
				q1: 'What is the weather like in spring?',
				a1: 'It is sunny and warm.',
				tf1Q: 'The sheep and cows eat fresh green grass.',
				tf1A: 'True',
				tf2Q: 'At breakfast, the pupil drinks soda.',
				tf2A: 'False',
				tf2C: 'The pupil drinks warm milk and eats healthy food.',
				mcqQ: 'What healthy breakfast does the pupil eat on the farm?',
				mcqCorrect: 'Bread with honey, fresh fruit and warm milk',
				mcqDistractors: [
					{ text: 'Candy and soda', diagnosticFeedback: 'The text mentions natural honey, fruit and milk.' },
					{ text: 'Chips and sweets', diagnosticFeedback: 'Read the last sentence of paragraph two.' },
					{ text: 'Dry grass', diagnosticFeedback: 'Animals eat grass, not the pupil.' }
				]
			},
			{
				title: 'Winter Health and Forest Animals',
				animal: 'Deer and birds',
				habitat: 'Green forest',
				food: 'leaves, seeds and berries',
				ability: 'jump and fly',
				paragraphs: [
					'In [[winter]], the weather in northern Algeria is cold, rainy and sometimes snowy in the mountains. In the green [[forest]], the deer eats leaves and little birds eat seeds.',
					'To stay healthy in winter, children wash their hands before meals, brush their teeth every morning and night, eat fresh vegetables and oranges, and sleep early.'
				],
				q1: 'What is the weather like in winter in northern Algeria?',
				a1: 'It is cold, rainy and sometimes snowy in the mountains.',
				tf1Q: 'In the forest, the deer eats leaves.',
				tf1A: 'True',
				tf2Q: 'Children should sleep very late to stay healthy.',
				tf2A: 'False',
				tf2C: 'Children should sleep early to stay healthy.',
				mcqQ: 'Which healthy habit is mentioned in paragraph two?',
				mcqCorrect: 'Washing hands, brushing teeth and eating vegetables',
				mcqDistractors: [
					{ text: 'Eating too many sweets', diagnosticFeedback: 'The text recommends fresh vegetables and oranges.' },
					{ text: 'Sleeping very late', diagnosticFeedback: 'The text says: sleep early.' },
					{ text: 'Drinking cold soda', diagnosticFeedback: 'Soda is not mentioned.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqDistractors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the passage and choose the correct answer:\n"${plainText}"\nQuestion: ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص واختر الإجابة الصحيحة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة المأخوذة من النص هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully and do the following tasks:',
			content: [
				buildEnglishPassageBlock({
					title: sc.title,
					paragraphs: sc.paragraphs,
					numberedParagraphs: true
				}),
				{
					type: 'table',
					headers: ['Animals', 'Habitat', 'Food'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.animal, mark: '0.5' },
							{ content: '............', answer: sc.habitat, mark: '0.25' },
							{ content: '............', answer: sc.food, mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `1) ${sc.q1}`,
					answer: sc.a1,
					mark: '1'
				},
				{
					type: 'true_false',
					items: [
						{ q: `2) ${sc.tf1Q}`, a: sc.tf1A, c: sc.tf1C, mark: '1' },
						{ q: `3) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
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
				'استخرج اسم الحيوان وموطنه وغذاءه مباشرة من جمل النص.',
				'انتبه لصفات الطقس المذكورة مع الفصل (sunny, warm, hot, cold, rainy).',
				'صحّح الجمل الخاطئة بالرجوع إلى العبارة الدقيقة في النص.'
			],
			solutionStepsAr: [
				`الجدول: Animals = ${sc.animal}، Habitat = ${sc.habitat}، Food = ${sc.food}.`,
				`السؤال 1: ${sc.a1}`,
				`صحيح أو خطأ: (2) ${sc.tf1A} — (3) ${sc.tf2A}.`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Habitats, Weather & Seasons + Present Simple
// ═══════════════════════════════════════════════════════════════════════════════
const habitatsWeather4apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t3_habitats_weather',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'vocabulary_morphology',
	titleAr: 'مفردات وقواعد: المواطن الطبيعية والفصول وحالة الطقس والمضارع البسيط',
	curriculumLessonId: 'eng_lesson_4ap_t3_weather_seasons',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				words: ['camel', 'sheep', 'deer', 'fennec'],
				col1: 'camel , fennec',
				col2: 'sheep , deer',
				col1Header: 'Desert Animals',
				col2Header: 'Farm and Forest Animals',
				weatherQ: '1) In summer, it is ............ and sunny. (hot / snowy)\n2) In winter, it is cold and ............ . (rainy / hot)',
				weatherA: '1) hot  |  2) rainy',
				verbQ: 'The camel (live) ............ in the desert and (eat) ............ dry plants.',
				verbA: 'lives  |  eats',
				mcqPrompt: 'Where does the sheep live?',
				mcqCorrect: 'On the farm',
				mcqDistractors: [
					{ text: 'In the sea', diagnosticFeedback: 'Fish and dolphins live in the sea.' },
					{ text: 'In the deep desert', diagnosticFeedback: 'Camels and fennecs live in the desert.' },
					{ text: 'In the classroom', diagnosticFeedback: 'A sheep is a farm animal.' }
				]
			},
			{
				words: ['sunny', 'winter', 'rainy', 'spring'],
				col1: 'spring , winter',
				col2: 'sunny , rainy',
				col1Header: 'Seasons',
				col2Header: 'Weather',
				weatherQ: '1) In autumn, it is ............ . (windy / snowy)\n2) In spring, flowers grow and it is ............ . (warm / freezing)',
				weatherA: '1) windy  |  2) warm',
				verbQ: 'The deer (live) ............ in the forest and (run) ............ fast.',
				verbA: 'lives  |  runs',
				mcqPrompt: 'Which weather word matches the season "winter"?',
				mcqCorrect: 'cold and rainy',
				mcqDistractors: [
					{ text: 'very hot and dry', diagnosticFeedback: 'That describes summer, not winter.' },
					{ text: 'hot and sunny', diagnosticFeedback: 'Summer is hot and sunny.' },
					{ text: 'green and hot', diagnosticFeedback: 'Winter is cold, rainy and snowy.' }
				]
			},
			{
				words: ['fish', 'cow', 'dolphin', 'horse'],
				col1: 'fish , dolphin',
				col2: 'cow , horse',
				col1Header: 'Sea Animals',
				col2Header: 'Farm Animals',
				weatherQ: '1) sun : ............  |  2) rain : ............  (Add -y to form weather adjectives)',
				weatherA: '1) sunny  |  2) rainy',
				verbQ: 'The fennec (live) ............ in the desert and (sleep) ............ in the day.',
				verbA: 'lives  |  sleeps',
				mcqPrompt: 'Choose the right preposition before seasons: "...... spring, the garden is full of flowers."',
				mcqCorrect: 'In',
				mcqDistractors: [
					{ text: 'On', diagnosticFeedback: 'We always use In before the four seasons.' },
					{ text: 'Under', diagnosticFeedback: 'Under is a preposition of place.' },
					{ text: 'Next to', diagnosticFeedback: 'Next to is for place, not seasons.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول المواطن والفصول والطقس:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Habitats, Weather and Verbs)',
			points: 3,
			instruction: 'Do the following three activities:',
			content: [
				{
					type: 'text',
					content: `Task 1: Classify the words in the table: ( ${s.words.join(' - ')} )`
				},
				{
					type: 'table',
					headers: [s.col1Header, s.col2Header],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.col1, mark: '0.5' },
							{ content: '....................', answer: s.col2, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 2: Complete the weather sentences:\n${s.weatherQ}`,
					answer: s.weatherA,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Put the verbs in brackets in the Present Simple:\n${s.verbQ}`,
					answer: s.verbA,
					mark: '1'
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
				'صنّف كل كلمة بدقة حسب موطن الحيوان أو الفرق بين الفصول والطقس.',
				'اربط الصيف بـ hot/sunny والشتاء بـ cold/rainy والخريف بـ windy والربيع بـ warm.',
				'مع الحيوان المفرد (It) أضف الحرف s إلى الفعل في المضارع البسيط.'
			],
			solutionStepsAr: [
				`التصنيف: ${s.col1Header} (${s.col1}) — ${s.col2Header} (${s.col2}).`,
				`الطقس: ${s.weatherA}.`,
				`تصريف الأفعال: ${s.verbA}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Healthy Habits Imperatives & Sentence Building
// ═══════════════════════════════════════════════════════════════════════════════
const healthyHabitsGrammar4apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t3_healthy_habits_grammar',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد: نصائح العادات الصحية (Imperative) وبناء الجملة السليمة',
	curriculumLessonId: 'eng_lesson_4ap_t3_healthy_habits',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				imp1: '............ your hands before eating. (Wash / Sleep)',
				imp1A: 'Wash',
				imp2: '............ your teeth every morning and evening. (Brush / Eat)',
				imp2A: 'Brush',
				words: ['vegetables', 'soda', 'honey', 'candy'],
				hCol: 'vegetables , honey',
				uCol: 'soda , candy',
				reorder: 'fruit / Eat / fresh / vegetables / and / .',
				ordered: 'Eat fresh fruit and vegetables.',
				mcqPrompt: 'Choose the right healthy advice (النصيحة الصحية الصحيحة):',
				mcqCorrect: 'Wash your hands before meals.',
				mcqDistractors: [
					{ text: 'Eat candy before sleep.', diagnosticFeedback: 'Candy before sleep harms teeth.' },
					{ text: 'Do not drink clean water.', diagnosticFeedback: 'Clean water is essential for health.' },
					{ text: 'Washing your hands before.', diagnosticFeedback: 'Imperative advice starts with the base verb Wash.' }
				]
			},
			{
				imp1: '............ fresh fruit and vegetables. (Eat / Wash)',
				imp1A: 'Eat',
				imp2: '............ drink too much soda. (Do not / Is not)',
				imp2A: 'Do not',
				words: ['dates', 'chips', 'milk', 'sweets'],
				hCol: 'dates , milk',
				uCol: 'chips , sweets',
				reorder: 'early / Sleep / stay / to / strong / .',
				ordered: 'Sleep early to stay strong.',
				mcqPrompt: 'Complete the negative advice: "...... eat too many sweets."',
				mcqCorrect: 'Do not',
				mcqDistractors: [
					{ text: 'Am not', diagnosticFeedback: 'Negative imperative starts with Do not.' },
					{ text: 'Is not', diagnosticFeedback: 'Do not use Is not for imperatives.' },
					{ text: 'No', diagnosticFeedback: 'In English advice we say Do not eat, not No eat.' }
				]
			},
			{
				imp1: '............ clean water every day. (Drink / Brush)',
				imp1A: 'Drink',
				imp2: '............ early to wake up fresh. (Sleep / Eat)',
				imp2A: 'Sleep',
				words: ['oranges', 'soda', 'honey', 'chips'],
				hCol: 'oranges , honey',
				uCol: 'soda , chips',
				reorder: 'your / Brush / teeth / day / every / .',
				ordered: 'Brush your teeth every day.',
				mcqPrompt: 'Which sentence is punctuated and capitalized correctly?',
				mcqCorrect: 'Eat vegetables, fruit and honey.',
				mcqDistractors: [
					{ text: 'eat vegetables, fruit and honey', diagnosticFeedback: 'Start with capital E and end with a full stop.' },
					{ text: 'Eat vegetables, fruit and honey?', diagnosticFeedback: 'This is advice, not a question.' },
					{ text: 'eats vegetables and honey.', diagnosticFeedback: 'Imperatives start with the capital base verb Eat.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول العادات الصحية وبناء الجملة:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Healthy Habits and Imperatives)',
			points: 3,
			instruction: 'Do the three tasks carefully:',
			content: [
				{
					type: 'text',
					content: `Task 1: Complete the healthy advice with the right word:\n1) ${s.imp1}\n2) ${s.imp2}`,
					answer: `1) ${s.imp1A}  |  2) ${s.imp2A}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Classify in the table: ( ${s.words.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['Healthy Food', 'Unhealthy Food'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.hCol, mark: '0.5' },
							{ content: '....................', answer: s.uCol, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 3: Reorder the words to get a healthy tip: ( ${s.reorder} )`,
					answer: s.ordered,
					mark: '1'
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
				'النصيحة الإيجابية تبدأ مباشرة بالفعل المجرد (Wash, Brush, Eat, Drink, Sleep).',
				'النصيحة بالنهي تبدأ بـ Do not ثم الفعل المجرد.',
				'في الترتيب ابدأ بالكلمة التي تحمل الحرف الكبير واختم بالنقطة.'
			],
			solutionStepsAr: [
				`النصائح الصحية: (1) ${s.imp1A} — (2) ${s.imp2A}.`,
				`التصنيف: Healthy (${s.hCol}) — Unhealthy (${s.uCol}).`,
				`الترتيب: ${s.ordered}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — Guided Paragraph Writing from a Fact File (4-5 sentences)
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression4apT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t3_written_expression',
	grade: '4ap',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: كتابة فقرة قصيرة (4-5 جمل) من بطاقة معلومات (Fact File)',
	curriculumLessonId: 'eng_lesson_4ap_t3_fact_file_writing',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				subject: 'the Camel',
				notes: [
					'Animal: Camel (strong and useful)',
					'Colour: brown',
					'Habitat: Algerian desert',
					'Food: dry plants and grass',
					'Ability: can walk for many days / cannot fly'
				],
				model: 'The camel is a strong and useful animal. It is brown and tall. It lives in the Algerian desert and it eats dry plants and grass. It can walk for many days in the hot sun, but it cannot fly.',
				mcqQ: 'Which sentence correctly turns "Habitat: Algerian desert / Food: dry plants" into English?',
				mcqCorrect: 'It lives in the Algerian desert and it eats dry plants.',
				mcqDistractors: [
					{ text: 'It live in desert and eat plants.', diagnosticFeedback: 'Add -s to live and eat with It.' },
					{ text: 'Habitat desert and food dry plants.', diagnosticFeedback: 'Missing subject It and verbs lives/eats.' },
					{ text: 'It can lives in the desert.', diagnosticFeedback: 'Use It lives without can, or base verb after can.' }
				]
			},
			{
				subject: 'the Deer',
				notes: [
					'Animal: Deer (fast and gentle)',
					'Colour: light brown with white spots',
					'Habitat: green forest',
					'Food: leaves, grass and fruit',
					'Ability: can run and jump fast / cannot swim far'
				],
				model: 'The deer is a fast and gentle animal. It has light brown fur with white spots. It lives in the green forest and it eats leaves, grass and fruit. It can run and jump very fast, but it cannot swim far.',
				mcqQ: 'Choose the right sentence using "can" and "but" about the deer:',
				mcqCorrect: 'It can run fast, but it cannot fly.',
				mcqDistractors: [
					{ text: 'It can runs fast, but it cannot flies.', diagnosticFeedback: 'Never add -s after can or cannot.' },
					{ text: 'It can run fast, in it cannot fly.', diagnosticFeedback: 'Use but to connect two contrasting ideas.' },
					{ text: 'Can it run fast, but cannot fly.', diagnosticFeedback: 'Start a statement with It, not Can.' }
				]
			},
			{
				subject: 'your Favourite Season and Healthy Habits',
				notes: [
					'Season: Spring (sunny and warm)',
					'Nature: green trees, flowers, colourful birds',
					'Healthy food: fresh fruit, vegetables, honey',
					'Healthy habits: wash hands, brush teeth, play football outside'
				],
				model: 'My favourite season is spring because the weather is sunny and warm. In spring, the trees are green and flowers grow in our garden. Every day, I wash my hands, brush my teeth and eat fresh fruit, vegetables and honey. I also play football with my friends outside.',
				mcqQ: 'Which paragraph opening about spring is completely correct?',
				mcqCorrect: 'My favourite season is spring because it is sunny and warm.',
				mcqDistractors: [
					{ text: 'My favourite season are spring because sunny.', diagnosticFeedback: 'Season is singular (is), and because needs it is.' },
					{ text: 'Spring is my favourite kitchen.', diagnosticFeedback: 'Spring is a season, not a kitchen.' },
					{ text: 'in spring it sunny and warm', diagnosticFeedback: 'Missing capital letter, verb is, and full stop.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لبناء الفقرة من بطاقة المعلومات:',
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
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt: `Use the Fact File below to write a neat paragraph of 4 or 5 short sentences about ${pr.subject}:`,
					topicOneNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary: 'All Fact File items used (1 pt), correct Present Simple (-s) and can/cannot (1 pt), clean spelling, connectors (and/but), capitals and full stops (1 pt).',
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
				'حوّل كل سطر في البطاقة إلى جملة كاملة تبدأ بالفاعل (It أو I).',
				'أضف حرف s إلى الأفعال مع It (lives, eats) واترك الفعل مجرداً بعد can.',
				'راجع الحروف الكبيرة في البداية والنقطة في نهاية كل جملة.'
			],
			solutionStepsAr: [
				'قراءة بطاقة المعلومات وتنظيم الأفكار بالتسلسل.',
				'كتابة 4 إلى 5 جمل قصيرة ومترابطة بـ and و but.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T3: EnglishParameterizedTemplate[] = [
	comprehension4apT3,
	habitatsWeather4apT3,
	healthyHabitsGrammar4apT3,
	writtenExpression4apT3
];
