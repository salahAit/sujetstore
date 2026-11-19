import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';

// ===============================================================================
// Parameterized Templates - 5AP English - Trimester 2 (Hometown, Amenities & Directions)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Reading Comprehension (4 pts): My Algerian Hometown and Amenities
// -------------------------------------------------------------------------------
interface T2PassagePack {
	title: string;
	pupil: string;
	city: string;
	paragraphs: string[];
	glossary: Array<{ term: string; meaning: string }>;
	tfItems: Array<{ q: string; a: 'True' | 'False'; mark: string }>;
	q1: string;
	a1: string;
	q2: string;
	a2: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_PASSAGES: readonly T2PassagePack[] = [
	{
		title: 'My Historic Hometown: Tlemcen',
		pupil: 'Salma',
		city: 'Tlemcen',
		paragraphs: [
			'Hello! My name is Salma and I live in [[Tlemcen]], a clean and historic city in the west of Algeria. In my neighbourhood, there is a big mosque, a primary school, and a quiet library.',
			'My house is next to the bakery and opposite a green park. To get to my school from my house, I go straight ahead, then I turn left. The school is between the mosque and the post office.',
			'There are also clean streets and friendly neighbours. I love my hometown very much.'
		],
		glossary: [
			{ term: 'neighbourhood', meaning: 'the area around your house' },
			{ term: 'quiet', meaning: 'calm and peaceful' }
		],
		tfItems: [
			{ q: 'Salma lives in Tlemcen, Algeria.', a: 'True', mark: '0.5' },
			{ q: 'Her house is next to the bakery.', a: 'True', mark: '0.5' },
			{ q: 'The school is opposite the bakery.', a: 'False', mark: '0.5' },
			{ q: 'There is a quiet library in her neighbourhood.', a: 'True', mark: '0.5' }
		],
		q1: 'Where is Salma school located?',
		a1: 'It is between the mosque and the post office.',
		q2: 'How does Salma go to school from her house?',
		a2: 'She goes straight ahead, then she turns left.',
		quizPrompt: 'According to the text about Tlemcen, where is Salma school?',
		quizCorrect: 'Between the mosque and the post office.',
		quizDistractors: [
			{ text: 'Opposite a green park and next to the bakery.', diagnosticFeedback: 'That is the location of Salma house, not her school.' },
			{ text: 'Behind the hospital.', diagnosticFeedback: 'A hospital is not mentioned in this passage.' },
			{ text: 'Next to the train station.', diagnosticFeedback: 'A train station is not mentioned in Salma neighbourhood.' }
		]
	},
	{
		title: 'Life in Constantine',
		pupil: 'Yacine',
		city: 'Constantine',
		paragraphs: [
			'Hi! I am Yacine. I live in [[Constantine]], the famous city of high bridges in the east of Algeria. My town is historic, busy, and beautiful.',
			'Near my home, there is a grand mosque, a hospital, and two bookshops. My school is opposite the public library and near the bus stop.',
			'Every morning, my friend Karim walks with me to school. We go straight along the main street and turn right at the bakery.'
		],
		glossary: [
			{ term: 'high bridges', meaning: 'tall roads built across valleys' },
			{ term: 'main street', meaning: 'the biggest road in the town' }
		],
		tfItems: [
			{ q: 'Constantine is famous for its high bridges.', a: 'True', mark: '0.5' },
			{ q: 'There are two bookshops near Yacine home.', a: 'True', mark: '0.5' },
			{ q: 'Yacine school is opposite the hospital.', a: 'False', mark: '0.5' },
			{ q: 'Yacine and Karim turn right at the bakery.', a: 'True', mark: '0.5' }
		],
		q1: 'What is Constantine famous for?',
		a1: 'It is famous for its high bridges.',
		q2: 'Where is Yacine school located?',
		a2: 'It is opposite the public library and near the bus stop.',
		quizPrompt: 'According to Yacine passage, what is opposite his school?',
		quizCorrect: 'The public library.',
		quizDistractors: [
			{ text: 'The bakery.', diagnosticFeedback: 'They turn right at the bakery, while the school is opposite the library.' },
			{ text: 'The hospital.', diagnosticFeedback: 'The hospital is near his home, not opposite the school.' },
			{ text: 'The post office.', diagnosticFeedback: 'A post office is not mentioned in this text.' }
		]
	},
	{
		title: 'My Calm Town: Ghardaia',
		pupil: 'Anes',
		city: 'Ghardaia',
		paragraphs: [
			'Hello friends! My name is Anes and I live in [[Ghardaia]], a calm and sunny town in the south of Algeria. It has traditional markets and beautiful palm trees.',
			'In my quarter, there is a big mosque, a primary school, and a clean park. The park is between the hospital and the library. My father works in a bookshop opposite the post office.',
			'On Friday morning, I walk to the mosque with my father. I am proud of my Algerian town.'
		],
		glossary: [
			{ term: 'palm trees', meaning: 'tall trees that grow sweet dates' },
			{ term: 'proud of', meaning: 'happy and respectful about' }
		],
		tfItems: [
			{ q: 'Ghardaia is in the south of Algeria.', a: 'True', mark: '0.5' },
			{ q: 'The park is between the hospital and the library.', a: 'True', mark: '0.5' },
			{ q: 'Anes father works in a bakery.', a: 'False', mark: '0.5' },
			{ q: 'Anes walks to the mosque with his father on Friday.', a: 'True', mark: '0.5' }
		],
		q1: 'Where is the park in Anes quarter?',
		a1: 'It is between the hospital and the library.',
		q2: 'Where does Anes father work?',
		a2: 'He works in a bookshop opposite the post office.',
		quizPrompt: 'In Anes passage about Ghardaia, where is the park located?',
		quizCorrect: 'Between the hospital and the library.',
		quizDistractors: [
			{ text: 'Opposite the post office.', diagnosticFeedback: 'His father bookshop is opposite the post office.' },
			{ text: 'Behind the traditional market.', diagnosticFeedback: 'The text states the park is between the hospital and the library.' },
			{ text: 'Next to the bakery.', diagnosticFeedback: 'A bakery is not mentioned in Anes quarter.' }
		]
	}
];

const tplCompHometownT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t2_comp_hometown',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: مدينتي الجزائرية والمرافق والاتجاهات (Reading Comprehension)',
	curriculumLessonId: 'eng_lesson_5ap_t2_places_in_town',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 41 + 13);
		const p = T2_PASSAGES[Math.abs(seed - 1) % T2_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Adapted 5AP Algerian Hometown Reading Text',
				glossary: p.glossary
			}),
			{
				type: 'text',
				content: 'Task 1: Read the text and write True or False (2 pts):'
			},
			{
				type: 'true_false',
				items: p.tfItems
			},
			{
				type: 'text',
				content: `Task 2: Answer the following questions from the text (2 pts):\n1) ${p.q1}`,
				answer: `1) ${p.a1}`,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${p.q2}`,
				answer: `2) ${p.a2}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully, then answer the questions:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.join(' ')}\n\nQuestion: ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص عن مدينة ${p.city} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'سطّر أسماء المرافق (mosque, school, library, park, bakery) وحروف المكان (next to, opposite, between).',
				'انتبه للفرق بين موقع المنزل وموقع المدرسة في أسئلة True / False.',
				'أجب عن أسئلة Where و How من الفقرة الثانية مباشرة.'
			],
			solutionStepsAr: [
				`صح أو خطأ: ${p.tfItems.map((t, i) => `${i + 1}) ${t.a}`).join(' | ')}`,
				`السؤال 1: ${p.a1}`,
				`السؤال 2: ${p.a2}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

// -------------------------------------------------------------------------------
// 2. Mastery of Language (3 pts): Prepositions of Place, Directions & There is/are
// -------------------------------------------------------------------------------
const PREP_DIR_MCQS = [
	{
		prompt: 'The post office is ............ the mosque and the bakery.',
		options: ['between', 'opposite', 'next to'],
		correct: 'between'
	},
	{
		prompt: 'The primary school is across the road from the park. It is ............ the park.',
		options: ['between', 'opposite', 'under'],
		correct: 'opposite'
	},
	{
		prompt: 'My house is right beside the library. It is ............ the library.',
		options: ['next to', 'between', 'straight'],
		correct: 'next to'
	},
	{
		prompt: 'To reach the hospital, ............ straight ahead and turn right.',
		options: ['Go', 'Next', 'Opposite'],
		correct: 'Go'
	},
	{
		prompt: 'Excuse me! Where is the bakery? Turn ............ at the corner.',
		options: ['left', 'between', 'mosque'],
		correct: 'left'
	}
] as const;

const THERE_IS_ARE_ITEMS = [
	{ q: '............ a big mosque in my neighbourhood.', a: 'There is' },
	{ q: '............ three green parks in our city.', a: 'There are' },
	{ q: '............ a quiet library opposite my school.', a: 'There is' },
	{ q: '............ two bakeries next to the market.', a: 'There are' },
	{ q: '............ a clean hospital near my house.', a: 'There is' }
] as const;

const tplGrammarPrepositionsDirT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t2_grammar_prepositions_dir',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'التحكم في اللغة: حروف المكان والاتجاهات و(There is / There are)',
	curriculumLessonId: 'eng_lesson_5ap_t2_prepositions_directions',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 59 + 19);
		const pickedPreps = rng.pickDistinct(PREP_DIR_MCQS, 3);
		const pickedThere = rng.pickDistinct(THERE_IS_ARE_ITEMS, 3);
		const quizItem = pickedPreps[0];

		const distractors: Array<{ text: string; diagnosticFeedback: string }> = [
			...quizItem.options
				.filter((o) => o !== quizItem.correct)
				.map((o) => ({
					text: String(o),
					diagnosticFeedback: 'Review prepositions of place: between (two places with and), opposite (across), next to (beside), Go straight / Turn left.'
				})),
			{
				text: 'behind of',
				diagnosticFeedback: 'We never write "behind of" in English.'
			}
		];
		const mcq = buildUniqueMcqOptions(quizItem.correct, distractors, rng);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activity 1: Tick the right preposition of place or direction word (1.5 pts):'
			},
			{
				type: 'multiple_choice',
				groups: pickedPreps.map((p, i) => ({
					header: `${i + 1}) ${p.prompt}`,
					options: [...p.options],
					correct: p.correct,
					mark: '0.5'
				}))
			},
			{
				type: 'text',
				content: 'Activity 2: Complete each sentence with "There is" or "There are" (1.5 pts):'
			},
			...pickedThere.map((it, i) => ({
				type: 'text' as const,
				content: `${i + 1}) ${it.q}`,
				answer: `${i + 1}) ${it.q.replace('............', it.a)}`,
				mark: '0.5'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Prepositions of Place and Directions',
			points: 3,
			instruction: 'Choose the right preposition or direction, then complete with There is / There are:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the right word to complete: "${quizItem.prompt}"`,
				questionTextAr: `اختر الكلمة المناسبة لإكمال الجملة:\n"${quizItem.prompt}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${quizItem.correct}`
			},
			sujetExercise,
			hints: [
				'استعمل between دائماً عندما تجد مكانين بينهما and.',
				'next to تعني بجانب، و opposite تعني مقابل (في الجهة الأخرى من الطريق).',
				'There is للمفرد (a big mosque) و There are للجمع (two bakeries / three parks).'
			],
			solutionStepsAr: [
				...pickedPreps.map((p, i) => `التمرين 1 (${i + 1}): ${p.correct}`),
				...pickedThere.map((t, i) => `التمرين 2 (${i + 1}): ${t.a}`)
			],
			finalAnswer: quizItem.correct
		};
	}
};

// -------------------------------------------------------------------------------
// 3. Mastery of Language (3 pts): Wh-Questions (Who, Where, What, When)
// -------------------------------------------------------------------------------
const WH_TABLE_ITEMS = [
	{ q: '............ is the mosque? It is next to the school.', a: 'Where', clue: 'Place' },
	{ q: '............ works in a bakery? The baker.', a: 'Who', clue: 'Person' },
	{ q: '............ is your favourite hobby? Reading books.', a: 'What', clue: 'Thing / Hobby' },
	{ q: '............ do you go to school? At eight o clock.', a: 'When', clue: 'Time' },
	{ q: '............ lives in Constantine? My cousin Yacine.', a: 'Who', clue: 'Person' },
	{ q: '............ is the hospital? Opposite the park.', a: 'Where', clue: 'Place' }
] as const;

const REORDER_WH_ITEMS = [
	{
		jumbled: 'is / Where / post office / the / ?',
		ordered: 'Where is the post office?'
	},
	{
		jumbled: 'do / When / you / to / go / library / the / ?',
		ordered: 'When do you go to the library?'
	},
	{
		jumbled: 'your / What / favourite / is / sport / ?',
		ordered: 'What is your favourite sport?'
	},
	{
		jumbled: 'teaches / Who / English / school / at / ?',
		ordered: 'Who teaches English at school?'
	}
] as const;

const tplSyntaxWhQuestionsT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t2_syntax_wh_questions',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'التحكم في اللغة: أدوات الاستفهام (Who, Where, What, When)',
	curriculumLessonId: 'eng_lesson_5ap_t2_wh_questions',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 67 + 29);
		const pickedWh = rng.pickDistinct(WH_TABLE_ITEMS, 4);
		const pickedReorder = rng.pick(REORDER_WH_ITEMS);

		const qTarget = pickedWh[0];
		const allWh = ['Who', 'Where', 'What', 'When'];
		const mcq = buildUniqueMcqOptions(
			qTarget.a,
			allWh
				.filter((w) => w !== qTarget.a)
				.map((w) => ({
					text: w,
					diagnosticFeedback: `This answer gives a ${qTarget.clue}, so check which Wh-word asks about ${qTarget.clue}.`
				})),
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activity 1: Complete each question with the right Wh-word (Who, Where, What, When) (2 pts):'
			},
			{
				type: 'table',
				headers: ['Question and Answer', 'Wh-Word'],
				cells: [],
				rows: pickedWh.map((item) => [
					{ content: item.q },
					{ content: '............', answer: item.a, mark: '0.5' }
				]),
				align: 'left',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `Activity 2: Reorder the words to get a coherent question (1 pt):\n${pickedReorder.jumbled}\nQuestion: ........................................................................`,
				answer: pickedReorder.ordered,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Wh-Questions (Who, Where, What, When)',
			points: 3,
			instruction: 'Choose the right Wh-question word and reorder the jumbled question:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the right Wh-word: "${qTarget.q}"`,
				questionTextAr: `اختر أداة الاستفهام المناسبة لإكمال السؤال:\n"${qTarget.q}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct Wh-word: ${qTarget.a} (${qTarget.clue}).`
			},
			sujetExercise,
			hints: [
				'Who للشخص العاقل (مَن)، و Where للمكان (أين).',
				'What للشيء أو المهنة أو الهواية (ما/ماذا)، و When للزمان والوقت (متى).',
				'في ترتيب السؤال نبدأ دائماً بأداة الاستفهام ثم الفعل المساعد (is / do / does) ثم الفاعل.'
			],
			solutionStepsAr: [
				...pickedWh.map((it, i) => `السؤال ${i + 1}: ${it.a} (${it.clue})`),
				`ترتيب السؤال: ${pickedReorder.ordered}`
			],
			finalAnswer: qTarget.a
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Mastery of Language (3 pts): Plural Nouns (-s, -es, -ies) & Final -s Sound
// -------------------------------------------------------------------------------
const PLURAL_ITEMS = [
	{ singular: 'park', plural: 'parks' },
	{ singular: 'bus', plural: 'buses' },
	{ singular: 'library', plural: 'libraries' },
	{ singular: 'box', plural: 'boxes' },
	{ singular: 'bakery', plural: 'bakeries' },
	{ singular: 'city', plural: 'cities' },
	{ singular: 'school', plural: 'schools' },
	{ singular: 'watch', plural: 'watches' }
] as const;

const PHONOLOGY_S_POOL = {
	s: ['parks', 'books', 'shops', 'markets', 'bikes', 'maps'],
	z: ['schools', 'hospitals', 'trains', 'farms', 'trees', 'cars'],
	iz: ['buses', 'boxes', 'bridges', 'watches', 'classes', 'dishes']
} as const;

const tplPhonologyPluralsST2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t2_phonology_plurals_s',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'phonology_pronunciation',
	titleAr: 'التحكم في اللغة والصوتيات: جمع الأسماء ونطق النهاية (-s: /s/ /z/ /iz/)',
	curriculumLessonId: 'eng_lesson_5ap_t2_plurals_final_s',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 73 + 37);
		const pickedPlurals = rng.pickDistinct(PLURAL_ITEMS, 3);
		const wS = rng.pickDistinct(PHONOLOGY_S_POOL.s, 2);
		const wZ = rng.pickDistinct(PHONOLOGY_S_POOL.z, 2);
		const wIz = rng.pickDistinct(PHONOLOGY_S_POOL.iz, 2);
		const mixedWords = rng.shuffle([...wS, ...wZ, ...wIz]);

		const quizWord = wIz[0];
		const mcq = buildUniqueMcqOptions(
			'/iz/',
			[
				{ text: '/s/', diagnosticFeedback: '/s/ comes after voiceless sounds like p, t, k, f (books, parks).' },
				{ text: '/z/', diagnosticFeedback: '/z/ comes after voiced non-sibilant sounds like l, m, n, r (schools, trains).' },
				{ text: 'silent', diagnosticFeedback: 'The plural ending -es is clearly pronounced as /iz/.' }
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activity 1: Write the plural form of the following singular nouns (1.5 pts):'
			},
			{
				type: 'table',
				headers: ['Singular (المفرد)', 'Plural (الجمع)'],
				cells: [],
				rows: pickedPlurals.map((item) => [
					{ content: item.singular, bold: true },
					{ content: '....................', answer: item.plural, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `Activity 2: Classify these words according to the pronunciation of their final -s (1.5 pts):\nWords: ${mixedWords.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '/s/', words: wS, mark: '0.5' },
					{ header: '/z/', words: wZ, mark: '0.5' },
					{ header: '/iz/', words: wIz, mark: '0.5' }
				]
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Plurals and Final -s Pronunciation',
			points: 3,
			instruction: 'Give the plural form of each noun, then classify the words by their final -s sound:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `How is the final -s / -es pronounced in the word "${quizWord}"?`,
				questionTextAr: `كيف تُنطق النهاية (-s / -es) في كلمة "${quizWord}"؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `"${quizWord}" ends with a sibilant sound (s, x, ch, sh, ge), so its ending is pronounced /iz/.`
			},
			sujetExercise,
			hints: [
				'الأسماء المنتهية بـ s, sh, ch, x نضيف لها es (buses, boxes, watches).',
				'الأسماء المنتهية بحرف ساكن + y نحوّل y إلى ies (libraries, cities, bakeries).',
				'نطق النهاية: /s/ بعد p, t, k, f | و /iz/ بعد s, sh, ch, x, ge | و /z/ مع الباقي (l, m, n, r, d, vowels).'
			],
			solutionStepsAr: [
				`الجمع: ${pickedPlurals.map((p) => `${p.singular}: ${p.plural}`).join(' | ')}`,
				`/s/: ${wS.join(', ')}`,
				`/z/: ${wZ.join(', ')}`,
				`/iz/: ${wIz.join(', ')}`
			],
			finalAnswer: '/iz/'
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Written Expression (3 pts): Describing My Algerian Hometown
// -------------------------------------------------------------------------------
const T2_WRITING_CITIES = [
	{
		city: 'Tlemcen',
		region: 'west of Algeria',
		adjectives: 'historic and clean',
		amenities: 'a great mosque, a library, and green parks',
		location: 'My house is next to the school and opposite the bakery.',
		model:
			'I live in Tlemcen. It is a historic and clean city in the west of Algeria. In my town, there is a great mosque, a library, and green parks. My house is next to the school and opposite the bakery. I love my hometown because it is calm and beautiful.'
	},
	{
		city: 'Constantine',
		region: 'east of Algeria',
		adjectives: 'beautiful and famous',
		amenities: 'high bridges, big mosques, and many schools',
		location: 'My school is between the library and the post office.',
		model:
			'I live in Constantine. It is a beautiful and famous city in the east of Algeria. In my town, there are high bridges, big mosques, and many schools. My school is between the library and the post office. I love my hometown very much.'
	},
	{
		city: 'Ghardaia',
		region: 'south of Algeria',
		adjectives: 'calm and sunny',
		amenities: 'a big mosque, traditional markets, and palm trees',
		location: 'My house is near the mosque and opposite a clean park.',
		model:
			'I live in Ghardaia. It is a calm and sunny city in the south of Algeria. In my town, there is a big mosque, traditional markets, and palm trees. My house is near the mosque and opposite a clean park. I am proud of my Algerian hometown.'
	}
] as const;

const tplWrittenHometownT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t2_written_hometown',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الإنتاج الكتابي: وصف مدينتي الجزائرية وموقع مرافقها',
	curriculumLessonId: 'eng_lesson_5ap_t2_describing_hometown',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 101 + 43);
		const c = T2_WRITING_CITIES[Math.abs(seed - 1) % T2_WRITING_CITIES.length];

		const correctOpening = `I live in ${c.city}. It is a ${c.adjectives} city in the ${c.region}.`;
		const mcq = buildUniqueMcqOptions(
			correctOpening,
			[
				{
					text: `I lives in ${c.city}. It are a city ${c.adjectives}.`,
					diagnosticFeedback: 'Use I live (no -s), It is (not are), and put adjectives before the noun.'
				},
				{
					text: `i live in ${c.city.toLowerCase()} in algeria`,
					diagnosticFeedback: 'Capitalize I, city names, and Algeria, and end with a full stop.'
				},
				{
					text: `There are live in ${c.city} opposite Algeria.`,
					diagnosticFeedback: 'Use I live in + city name to introduce your hometown.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: `Write a short paragraph (4 to 5 sentences) describing ${c.city} and the amenities near your home.`,
				topicOneNotes: [
					`City and Region: ${c.city} (${c.region})`,
					`Adjectives: ${c.adjectives}`,
					`Amenities (There is / There are): ${c.amenities}`,
					`Prepositions of place: ${c.location}`,
					'Closing: express your love for your hometown'
				],
				modelAnswer: c.model,
				rubricSummary:
					'Relevance and Amenities (1 pt) | There is/are and Prepositions of Place (1 pt) | Capitalization, Punctuation and Neatness (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Three: Guided Written Production',
			points: 3,
			instruction: 'Use the notes below to describe your Algerian hometown in a short paragraph:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the best opening sentences for a paragraph about ${c.city}:`,
				questionTextAr: `اختر الجملتين الافتتاحيتين الصحيحين لوصف مدينة ${c.city}:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Best opening: ${correctOpening}`
			},
			sujetExercise,
			hints: [
				'ابدأ باسم المدينة وموقعها: I live in ... . It is a ... city in Algeria.',
				'اذكر المرافق بـ There is للمفرد و There are للجمع.',
				'استعمل حرف مكان (next to, opposite, between) لوصف موقع بيتك أو مدرستك.'
			],
			solutionStepsAr: [
				`التقديم: ${correctOpening}`,
				`المرافق: ذكر ${c.amenities}.`,
				`الموقع والخاتمة: ${c.location} ثم التعبير عن حب المدينة.`
			],
			finalAnswer: correctOpening
		};
	}
};

export const TEMPLATES_5AP_T2: EnglishParameterizedTemplate[] = [
	tplCompHometownT2,
	tplGrammarPrepositionsDirT2,
	tplSyntaxWhQuestionsT2,
	tplPhonologyPluralsST2,
	tplWrittenHometownT2
];
