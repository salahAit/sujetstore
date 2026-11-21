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
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';

// ===============================================================================
// Parameterized Templates - 5AP English - Trimester 3
// Holidays, Travel, Seasons & 2024-2025 5AP Competency Evaluation (تقييم المكتسبات)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Reading Comprehension (4 pts): Holidays, Seasons and Travel in Algeria
// -------------------------------------------------------------------------------
interface T3PassagePack {
	title: string;
	pupil: string;
	destination: string;
	season: string;
	weather: string;
	transport: string;
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

const T3_PASSAGES: readonly T3PassagePack[] = [
	{
		title: 'A Summer Holiday in Bejaia',
		pupil: 'Bilal',
		destination: 'Bejaia',
		season: 'summer',
		weather: 'hot and sunny',
		transport: 'by train',
		paragraphs: [
			'Next [[summer]], Bilal and his family are going to spend their holidays in Bejaia, a lovely coastal city in Algeria. In summer, the weather there is hot and sunny.',
			'They are going to travel [[by train]] because it is safe and comfortable. Bilal is going to swim in the blue sea with his father and walk along the green mountains.',
			'In the evening, Bilal is going to read adventure stories and write postcards to his grandparents in Setif.'
		],
		glossary: [
			{ term: 'coastal city', meaning: 'a city next to the sea' },
			{ term: 'comfortable', meaning: 'pleasant and relaxing' }
		],
		tfItems: [
			{ q: 'Bilal is going to visit Bejaia next summer.', a: 'True', mark: '0.5' },
			{ q: 'The weather in summer is cold and snowy.', a: 'False', mark: '0.5' },
			{ q: 'Bilal family is going to travel by train.', a: 'True', mark: '0.5' },
			{ q: 'Bilal is going to read stories in the evening.', a: 'True', mark: '0.5' }
		],
		q1: 'How are Bilal and his family going to travel to Bejaia?',
		a1: 'They are going to travel by train.',
		q2: 'What is the weather like in Bejaia in summer?',
		a2: 'It is hot and sunny.',
		quizPrompt: 'According to the passage, how is Bilal family going to travel to Bejaia?',
		quizCorrect: 'By train.',
		quizDistractors: [
			{ text: 'By plane.', diagnosticFeedback: 'The text states they chose the train because it is safe and comfortable.' },
			{ text: 'On foot.', diagnosticFeedback: 'Bejaia is far from Setif, so they travel by train.' },
			{ text: 'By boat.', diagnosticFeedback: 'A boat is not mentioned as their travel transport.' }
		]
	},
	{
		title: 'A Spring Trip to Ghardaia',
		pupil: 'Khadidja',
		destination: 'Ghardaia',
		season: 'spring',
		weather: 'warm and sunny',
		transport: 'by bus',
		paragraphs: [
			'Next [[spring]], Khadidja is going to travel with her parents to Ghardaia in the south of Algeria. In spring, the weather is warm and sunny, not too hot.',
			'They are going to travel [[by bus]] from Algiers. During their stay, they are going to visit the historic M-Zab Valley, pray in the old mosque, and walk under the tall palm trees.',
			'Khadidja is going to take nice photos of the traditional markets and buy sweet dates for her neighbours.'
		],
		glossary: [
			{ term: 'stay', meaning: 'the days spent visiting a place' },
			{ term: 'sweet dates', meaning: 'delicious fruit from palm trees' }
		],
		tfItems: [
			{ q: 'Khadidja is going to visit Ghardaia next spring.', a: 'True', mark: '0.5' },
			{ q: 'They are going to travel by plane.', a: 'False', mark: '0.5' },
			{ q: 'The weather in Ghardaia in spring is warm and sunny.', a: 'True', mark: '0.5' },
			{ q: 'Khadidja is going to buy sweet dates for her neighbours.', a: 'True', mark: '0.5' }
		],
		q1: 'When is Khadidja going to visit Ghardaia?',
		a1: 'She is going to visit Ghardaia next spring.',
		q2: 'What places are they going to visit in Ghardaia?',
		a2: 'They are going to visit the historic M-Zab Valley, the old mosque, and traditional markets.',
		quizPrompt: 'In Khadidja spring trip, what is the weather like in Ghardaia?',
		quizCorrect: 'Warm and sunny.',
		quizDistractors: [
			{ text: 'Cold and rainy.', diagnosticFeedback: 'Cold and rainy describes winter, not spring in Ghardaia.' },
			{ text: 'Snowy and freezing.', diagnosticFeedback: 'There is no snow in spring in Ghardaia.' },
			{ text: 'Windy and stormy.', diagnosticFeedback: 'The passage says the weather is warm and sunny.' }
		]
	},
	{
		title: 'A Winter Visit to Tlemcen',
		pupil: 'Hamza',
		destination: 'Tlemcen',
		season: 'winter',
		weather: 'cold and rainy',
		transport: 'by car',
		paragraphs: [
			'Next [[winter]], Hamza is going to visit his uncle in Tlemcen during the school holidays. In winter, the weather in Tlemcen is cold and rainy, so Hamza packs a warm coat.',
			'His father is going to drive the family [[by car]] from Oran. They are going to visit the Great Mosque of Tlemcen and the quiet waterfalls of El Ourit.',
			'At his uncle house, Hamza is going to play chess with his cousins and read books near the warm heater.'
		],
		glossary: [
			{ term: 'packs', meaning: 'puts clothes inside a travel bag' },
			{ term: 'waterfalls', meaning: 'water falling down from high rocks' }
		],
		tfItems: [
			{ q: 'Hamza is going to visit Tlemcen next winter.', a: 'True', mark: '0.5' },
			{ q: 'The weather in winter is hot and dry.', a: 'False', mark: '0.5' },
			{ q: 'Hamza family is going to travel by car.', a: 'True', mark: '0.5' },
			{ q: 'Hamza is going to play chess with his cousins.', a: 'True', mark: '0.5' }
		],
		q1: 'Why does Hamza pack a warm coat?',
		a1: 'Because the weather in Tlemcen in winter is cold and rainy.',
		q2: 'How is Hamza family going to travel from Oran to Tlemcen?',
		a2: 'They are going to travel by car.',
		quizPrompt: 'In Hamza winter holiday passage, what clean hobby is he going to enjoy with his cousins?',
		quizCorrect: 'Playing chess and reading books.',
		quizDistractors: [
			{ text: 'Swimming in the sea.', diagnosticFeedback: 'It is winter and cold; they do not swim in the sea.' },
			{ text: 'Cycling in the desert.', diagnosticFeedback: 'Tlemcen is in the north-west, not the desert.' },
			{ text: 'Travelling by plane to Europe.', diagnosticFeedback: 'They travel by car from Oran to Tlemcen inside Algeria.' }
		]
	}
];

const tplCompHolidaysSeasonsT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t3_comp_holidays_seasons',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: العطل والسفر والفصول في الجزائر (Reading Comprehension)',
	curriculumLessonId: 'eng_lesson_5ap_t3_seasons_weather',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 43 + 17);
		const p = T3_PASSAGES[Math.abs(seed - 1) % T3_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Adapted 5AP Algerian Holidays Reading Text',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_ara_06_four_seasons_trees', {
				lang: 'en',
				title: 'Algerian Holidays Across the Four Seasons',
				customLegend: [
					{ num: '1', label: 'Warm spring flowers and sunny summer' },
					{ num: '2', label: 'Cool autumn leaves and rainy winter' }
				],
				maxHeight: 108,
				width: '58%'
			}),
			{
				type: 'text',
				content: 'Task 1: Read the text carefully and write True or False (2 pts):'
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
			instruction: 'Read the passage about Algerian holidays carefully, then answer the tasks:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.join(' ')}\n\nQuestion: ${p.quizPrompt}`,
				questionTextAr: `اقرأ النص عن عطلة ${p.pupil} في ${p.destination} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'حدد من النص أربعة عناصر مفتاحية: الوجهة (Destination)، الفصل (Season)، الطقس (Weather)، ووسيلة النقل (Transport).',
				'في أسئلة True / False تحقق من الفصل وحالة الطقس ووسيلة النقل بدقة.',
				'استعمل نفس زمن النص (going to) عند الإجابة عن خطط العطلة.'
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
// 2. Mastery of Language (3 pts): Future "Going To" & Transport Prepositions (by / on)
// -------------------------------------------------------------------------------
const GOING_TO_ITEMS = [
	{ q: 'Next summer, I (visit) Bejaia with my parents.', a: 'am going to visit' },
	{ q: 'Tomorrow, Youssef (read) a new book in the library.', a: 'is going to read' },
	{ q: 'Next spring, we (travel) to Ghardaia by bus.', a: 'are going to travel' },
	{ q: 'Next Friday, Meriem (swim) at the sports club.', a: 'is going to swim' },
	{ q: 'Next week, they (visit) the Great Mosque of Tlemcen.', a: 'are going to visit' },
	{ q: 'Next holiday, my father (drive) us to Constantine.', a: 'is going to drive' }
] as const;

const TRANSPORT_MCQS = [
	{
		prompt: 'My school is very near. I go to school ............ foot.',
		options: ['by', 'on', 'in'],
		correct: 'on'
	},
	{
		prompt: 'We are going to travel to Oran ............ train.',
		options: ['on', 'by', 'at'],
		correct: 'by'
	},
	{
		prompt: 'To visit Tassili in the far south, tourists travel ............ plane.',
		options: ['by', 'on', 'under'],
		correct: 'by'
	},
	{
		prompt: 'My uncle travels to Bejaia ............ bus every spring.',
		options: ['on', 'at', 'by'],
		correct: 'by'
	},
	{
		prompt: 'Every Friday, my brother and I go to the mosque ............ foot.',
		options: ['by', 'on', 'between'],
		correct: 'on'
	}
] as const;

const tplGrammarGoingToTransportT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t3_grammar_going_to_transport',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'grammar_tenses',
	titleAr: 'التحكم في اللغة: المستقبل القريب (going to) وحروف وسائل النقل (by / on)',
	curriculumLessonId: 'eng_lesson_5ap_t3_going_to_holidays',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 61 + 23);
		const pickedFuture = rng.pickDistinct(GOING_TO_ITEMS, 3);
		const pickedTrans = rng.pickDistinct(TRANSPORT_MCQS, 3);
		const qFuture = pickedFuture[0];
		const verbMatch = qFuture.q.match(/\(([^)]+)\)/);
		const baseVerb = verbMatch ? verbMatch[1] : 'visit';

		const mcq = buildUniqueMcqOptions(
			qFuture.a,
			[
				{
					text: `going to ${baseVerb}`,
					diagnosticFeedback: 'You must include the auxiliary verb to be (am / is / are) before going to.'
				},
				{
					text: qFuture.a.replace(baseVerb, `${baseVerb}ing`),
					diagnosticFeedback: 'Always use the base verb after going to (never -ing or -s).'
				},
				{
					text: qFuture.a.startsWith('am')
						? qFuture.a.replace('am', 'are')
						: qFuture.a.startsWith('is')
							? qFuture.a.replace('is', 'are')
							: qFuture.a.replace('are', 'is'),
					diagnosticFeedback: 'Check subject-verb agreement: I am / He-She-It is / We-They are.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_01_red_bus_train', {
				lang: 'en',
				maxHeight: 104,
				width: '56%'
			}),
			{
				type: 'text',
				content: 'Activity 1: Put the verbs in brackets into the future using (am / is / are + going to) (1.5 pts):'
			},
			...pickedFuture.map((it, i) => ({
				type: 'text' as const,
				content: `${i + 1}) ${it.q}\n    Answer: ........................................................................`,
				answer: `${i + 1}) ${it.q.replace(/\([^)]+\)/, it.a)}`,
				mark: '0.5'
			})),
			{
				type: 'text',
				content: 'Activity 2: Tick the right preposition of transport (by / on) (1.5 pts):'
			},
			{
				type: 'multiple_choice',
				groups: pickedTrans.map((t, i) => ({
					header: `${i + 1}) ${t.prompt}`,
					options: [...t.options],
					correct: t.correct,
					mark: '0.5'
				}))
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Future Plans (Going To) and Transport',
			points: 3,
			instruction: 'Conjugate the verbs with going to, then choose the right transport preposition:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Complete with the correct future form (going to): "${qFuture.q}"`,
				questionTextAr: `اختر الصيغة الصحيحة للمستقبل القريب (going to) في الجملة:\n"${qFuture.q}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct form: ${qFuture.a}.`
			},
			sujetExercise,
			hints: [
				'صيغة المستقبل القريب: الفاعل + am / is / are + going to + الفعل المجرد.',
				'بعد going to يبقى الفعل كما هو بلا s ولا ing.',
				'وسائل النقل تأخذ by (by bus, by train, by plane)، أما المشي فيأخذ on (on foot).'
			],
			solutionStepsAr: [
				...pickedFuture.map((f, i) => `التمرين 1 (${i + 1}): ${f.a}`),
				...pickedTrans.map((t, i) => `التمرين 2 (${i + 1}): ${t.correct}`)
			],
			finalAnswer: qFuture.a
		};
	}
};

// -------------------------------------------------------------------------------
// 3. Mastery of Language (3 pts): Seasons & Weather + Final -s Pronunciation
// -------------------------------------------------------------------------------
const SEASON_WEATHER_ROWS = [
	{ season: 'Summer', weather: 'hot and sunny' },
	{ season: 'Winter', weather: 'cold, rainy and snowy' },
	{ season: 'Spring', weather: 'warm and nice' },
	{ season: 'Autumn', weather: 'windy and cloudy' }
] as const;

const T3_PHONOLOGY_POOL = {
	s: ['boats', 'trips', 'bikes', 'maps', 'coats', 'hats'],
	z: ['trains', 'planes', 'cars', 'seasons', 'days', 'trees'],
	iz: ['buses', 'beaches', 'bridges', 'boxes', 'oranges', 'watches']
} as const;

const tplVocabWeatherPhonicsT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t3_vocab_weather_phonics',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'phonology_pronunciation',
	titleAr: 'التحكم في اللغة والصوتيات: الفصول وحالة الطقس ونطق (-s)',
	curriculumLessonId: 'eng_lesson_5ap_t3_transport_travel',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 79 + 29);
		const pickedSeasons = rng.pickDistinct(SEASON_WEATHER_ROWS, 3);
		const wS = rng.pickDistinct(T3_PHONOLOGY_POOL.s, 2);
		const wZ = rng.pickDistinct(T3_PHONOLOGY_POOL.z, 2);
		const wIz = rng.pickDistinct(T3_PHONOLOGY_POOL.iz, 2);
		const mixedWords = rng.shuffle([...wS, ...wZ, ...wIz]);

		const quizTarget = wS[0];
		const mcq = buildUniqueMcqOptions(
			'/s/',
			[
				{ text: '/z/', diagnosticFeedback: '/z/ follows voiced sounds (trains, cars, seasons), whereas this word ends with a voiceless sound (p, t, k).' },
				{ text: '/iz/', diagnosticFeedback: '/iz/ only follows s, sh, ch, x, ge (buses, beaches, bridges).' },
				{ text: '/d/', diagnosticFeedback: '/d/ is for past -ed endings, not final -s.' }
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_03_weather_icons_quad', {
				lang: 'en',
				maxHeight: 104,
				width: '56%'
			}),
			{
				type: 'text',
				content: 'Activity 1: Complete the table with the typical weather for each season (1.5 pts):'
			},
			{
				type: 'table',
				headers: ['Season (الفصل)', 'Typical Weather (حالة الطقس)'],
				cells: [],
				rows: pickedSeasons.map((r) => [
					{ content: r.season, bold: true },
					{ content: '................................', answer: r.weather, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			{
				type: 'text',
				content: `Activity 2: Classify these holiday words according to the pronunciation of final -s (1.5 pts):\nWords: ${mixedWords.join('  -  ')}`
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
			customTitle: 'Part Two: Seasons, Weather and Final -s Pronunciation',
			points: 3,
			instruction: 'Describe the weather in each season, then classify the words by their final -s sound:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `How is the final -s pronounced in the word "${quizTarget}"?`,
				questionTextAr: `كيف يُنطق الحرف الأخير (-s) في كلمة "${quizTarget}"؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `"${quizTarget}" ends after a voiceless sound (p, t, k), so final -s is pronounced /s/.`
			},
			sujetExercise,
			hints: [
				'Summer: hot and sunny | Winter: cold, rainy, snowy | Spring: warm | Autumn: windy and cloudy.',
				'النهاية /s/ بعد الأصوات المهموسة (p, t, k, f) مثل boats, trips, maps, bikes.',
				'النهاية /iz/ بعد (s, sh, ch, x, ge) مثل buses, beaches, bridges، و /z/ مع الباقي مثل trains, cars, seasons.'
			],
			solutionStepsAr: [
				...pickedSeasons.map((r) => `${r.season}: ${r.weather}`),
				`/s/: ${wS.join(', ')}`,
				`/z/: ${wZ.join(', ')}`,
				`/iz/: ${wIz.join(', ')}`
			],
			finalAnswer: '/s/'
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Written Expression (3 pts - Standard): My Next Holiday Plan in Algeria
// -------------------------------------------------------------------------------
const T3_HOLIDAY_PLANS = [
	{
		city: 'Oran',
		season: 'next summer',
		weather: 'hot and sunny',
		transport: 'by train',
		activities: 'swim in the sea, visit the historic mosque, and read books',
		model:
			'Next summer, I am going to visit Oran with my family. We are going to travel by train. In summer, the weather in Oran is hot and sunny. There, I am going to swim in the sea, visit the historic mosque, and read books. I am very happy about this holiday in Algeria.'
	},
	{
		city: 'Bejaia',
		season: 'next spring',
		weather: 'warm and sunny',
		transport: 'by car',
		activities: 'walk in green parks, visit the sea, and take nice photos',
		model:
			'Next spring, I am going to visit Bejaia with my family. My father is going to drive us by car. In spring, the weather in Bejaia is warm and sunny. There, we are going to walk in green parks, visit the sea, and take nice photos. I love travelling in Algeria.'
	},
	{
		city: 'Tassili',
		season: 'next winter',
		weather: 'cool and sunny',
		transport: 'by plane',
		activities: 'see the amazing mountains, visit the desert oasis, and learn history',
		model:
			'Next winter, I am going to visit Tassili with my parents. We are going to travel by plane because it is far in the south of Algeria. In winter, the weather is cool and sunny during the day. We are going to see the amazing mountains, visit the desert oasis, and learn history.'
	}
] as const;

const tplWrittenHolidayPlanT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t3_written_holiday_plan',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الإنتاج الكتابي: التخطيط لعطلتي القادمة في الجزائر (Holiday Plan)',
	curriculumLessonId: 'eng_lesson_5ap_t3_fact_file_writing',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 107 + 47);
		const plan = T3_HOLIDAY_PLANS[Math.abs(seed - 1) % T3_HOLIDAY_PLANS.length];

		const correctPlanSentence = `Next holiday, we are going to travel to ${plan.city} ${plan.transport}.`;
		const mcq = buildUniqueMcqOptions(
			correctPlanSentence,
			[
				{
					text: `Next holiday, we going to travel to ${plan.city} on ${plan.transport.replace('by ', '')}.`,
					diagnosticFeedback: 'Include "are" before going to, and use "by" with transport vehicles.'
				},
				{
					text: `Next holiday, we is going to travelling to ${plan.city} ${plan.transport}.`,
					diagnosticFeedback: 'Use "are" with we, and use the base verb "travel" after going to.'
				},
				{
					text: `Next holiday, we are go to travel to ${plan.city} ${plan.transport}.`,
					diagnosticFeedback: 'Future plan form is "are going to + base verb", not "are go to".'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_02_airplane_ship', {
				lang: 'en',
				maxHeight: 102,
				width: '54%'
			}),
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: `Write a short paragraph (4 to 5 sentences) about your next holiday plan in ${plan.city}, Algeria.`,
				topicOneNotes: [
					`When and Where: ${plan.season}, ${plan.city}`,
					`Transport: ${plan.transport}`,
					`Weather: ${plan.weather}`,
					`Wholesome activities: ${plan.activities}`,
					'Grammar focus: use (am / is / are + going to + base verb)'
				],
				modelAnswer: plan.model,
				rubricSummary:
					'Relevance and Holiday Notes (1 pt) | Correct going to and by/on prepositions (1 pt) | Capitalization, Punctuation and Neatness (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Three: Guided Written Production (Holiday Plan)',
			points: 3,
			instruction: 'Use the notes below and "going to" to write a short paragraph about your next holiday:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the grammatically accurate holiday sentence for ${plan.city}:`,
				questionTextAr: `اختر الجملة الصحيحة للتخطيط لرحلة العطلة إلى ${plan.city}:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct sentence: ${correctPlanSentence}`
			},
			sujetExercise,
			hints: [
				'ابدأ بالمؤشر الزمني والوجهة: Next summer / spring, I am going to visit ... .',
				'اذكر وسيلة النقل بـ by (by train / by bus / by car / by plane) ثم صف الطقس بـ It is ... .',
				'اختم بأنشطتك النافعة في العطلة مع مراجعة الحروف الكبيرة والنقاط.'
			],
			solutionStepsAr: [
				`الوجهة والفصل: ${plan.season} — ${plan.city}`,
				`وسيلة النقل والطقس: ${plan.transport} | ${plan.weather}`,
				`الأنشطة: ${plan.activities}`
			],
			finalAnswer: correctPlanSentence
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Written Expression (3 pts - 5AP Competency Evaluation 2024-2025 Fact-File + 4 Mastery Levels!)
// -------------------------------------------------------------------------------
interface CompetencyFactFileProfile {
	name: string;
	age: string;
	hometown: string;
	school: string;
	fatherJob: string;
	dreamJob: string;
	hobbies: string;
	holidayPlan: string;
	modelParagraph: string;
}

const COMPETENCY_FACT_FILES: readonly CompetencyFactFileProfile[] = [
	{
		name: 'Bilal',
		age: '10 years old',
		hometown: 'Oran, Algeria',
		school: 'El Amel Primary School',
		fatherJob: 'Doctor (hospital)',
		dreamJob: 'Engineer',
		hobbies: 'Reading books and swimming',
		holidayPlan: 'Visit Tlemcen by train next spring',
		modelParagraph:
			'Hello! My name is Bilal. I am ten years old and I live in Oran, Algeria. I study at El Amel Primary School. My father is a doctor; he works in a hospital. In my free time, I like reading books and swimming, and I want to be an engineer. Next spring, I am going to visit Tlemcen by train with my family.'
	},
	{
		name: 'Khadidja',
		age: '11 years old',
		hometown: 'Constantine, Algeria',
		school: 'Ibn Badis Primary School',
		fatherJob: 'Teacher (school)',
		dreamJob: 'Doctor',
		hobbies: 'Reading stories and cycling',
		holidayPlan: 'Visit Bejaia by bus next summer',
		modelParagraph:
			'Hello! My name is Khadidja. I am eleven years old and I live in Constantine, Algeria. I study at Ibn Badis Primary School. My father is a teacher; he works in a school. In my free time, I like reading stories and cycling, and I want to be a doctor. Next summer, I am going to visit Bejaia by bus with my parents.'
	},
	{
		name: 'Hamza',
		age: '10 years old',
		hometown: 'Ghardaia, Algeria',
		school: 'El Nour Primary School',
		fatherJob: 'Baker (bakery)',
		dreamJob: 'Firefighter',
		hobbies: 'Playing chess and football',
		holidayPlan: 'Visit Algiers by plane next summer',
		modelParagraph:
			'Hello! My name is Hamza. I am ten years old and I live in Ghardaia, Algeria. I study at El Nour Primary School. My father is a baker; he works in a bakery. In my free time, I like playing chess and football, and I want to be a firefighter. Next summer, I am going to visit Algiers by plane with my family.'
	}
] as const;

const tplWrittenCompetencyEvalFactFileT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t3_written_competency_eval_factfile',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'امتحان تقييم المكتسبات 2025: الإنتاج الكتابي الموجه من بطاقة معلومات (مع شبكة التملك الأربعة)',
	curriculumLessonId: 'eng_lesson_5ap_t3_competency_eval_2025',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 127 + 53);
		const f = COMPETENCY_FACT_FILES[Math.abs(seed - 1) % COMPETENCY_FACT_FILES.length];

		const quizCorrect =
			'Converting every Fact File item into 5 to 6 accurate, punctuated sentences using correct tenses, articles, and neat handwriting.';
		const mcq = buildUniqueMcqOptions(
			quizCorrect,
			[
				{
					text: 'Copying the Fact File words as a list without verbs or full stops.',
					diagnosticFeedback: 'Copying table fragments gives Partial (C) or Minimum (D) Mastery, not Maximum Mastery (A).'
				},
				{
					text: 'Writing two sentences about an unrelated topic and ignoring the Fact File.',
					diagnosticFeedback: 'Going off-topic gives Minimum Mastery (D) on the Relevance criterion.'
				},
				{
					text: 'Writing without capital letters for names, cities, or the pronoun I.',
					diagnosticFeedback: 'Missing capitalization and punctuation lowers the Linguistic Mastery level.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content:
					'5AP English Competency Evaluation (Written Production from a Fact File): Study the Fact File below carefully:'
			},
			{
				type: 'table',
				headers: ['Fact File Field', 'Information'],
				cells: [],
				rows: [
					[{ content: 'Name and Age', bold: true }, { content: `${f.name} — ${f.age}` }],
					[{ content: 'Hometown', bold: true }, { content: f.hometown }],
					[{ content: 'School', bold: true }, { content: f.school }],
					[{ content: 'Father Job and Workplace', bold: true }, { content: f.fatherJob }],
					[{ content: 'Dream Job', bold: true }, { content: f.dreamJob }],
					[{ content: 'Clean Hobbies', bold: true }, { content: f.hobbies }],
					[{ content: 'Next Holiday Plan', bold: true }, { content: f.holidayPlan }]
				],
				align: 'left',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			},
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: `Imagine you are ${f.name}. Use ALL the information in the Fact File above to write a neat, guided paragraph (5 to 6 sentences) introducing yourself, your father job, your clean hobbies, your dream job, and your next holiday plan in Algeria.`,
				topicOneNotes: [
					'Use Present Simple (am / is / live / works / like / want to be)',
					'Use correct articles (a / an) and transport preposition (by)',
					'Use Future (am going to + base verb) for the holiday plan',
					'Check capital letters, full stops (.), and neat handwriting for Level A'
				],
				modelAnswer: f.modelParagraph,
				rubricSummary:
					'Evaluated on 4 Official Mastery Levels (A: Maximum | B: Acceptable | C: Partial | D: Minimum) across Relevance, Grammar and Coherence, Spelling and Punctuation, and Neat Presentation.',
				mark: '3'
			}),
			{
				type: 'table',
				headers: [
					'Evaluation Criterion',
					'Maximum Mastery (A)',
					'Acceptable Mastery (B)',
					'Partial Mastery (C)',
					'Minimum Mastery (D)'
				],
				cells: [],
				rows: [
					[
						{ content: '1. Relevance and Fact File Use', bold: true },
						{ content: 'All 7 Fact File items used accurately in a complete paragraph' },
						{ content: '5 to 6 Fact File items used clearly on topic' },
						{ content: 'Only 3 to 4 items used or incomplete list' },
						{ content: 'Off-topic or copied table without sentences' }
					],
					[
						{ content: '2. Grammar and Coherence', bold: true },
						{ content: 'Accurate Present Simple, a/an, going to, and linkers (and)' },
						{ content: 'Mostly accurate grammar with 1 to 2 minor slips' },
						{ content: 'Several tense, pronoun, or preposition errors' },
						{ content: 'Severe grammar errors preventing understanding' }
					],
					[
						{ content: '3. Spelling and Punctuation', bold: true },
						{ content: 'Correct spelling, capital letters, and full stops throughout' },
						{ content: 'Good spelling with minor punctuation omissions' },
						{ content: 'Frequent spelling mistakes and missing capitals' },
						{ content: 'No punctuation and unreadable spelling' }
					],
					[
						{ content: '4. Presentation and Neatness', bold: true },
						{ content: 'Clean layout, clear spacing, and legible handwriting' },
						{ content: 'Readable handwriting with acceptable layout' },
						{ content: 'Untidy layout or crowded words' },
						{ content: 'Illegible handwriting and poor paper care' }
					]
				],
				align: 'left',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: '5AP Competency Evaluation: Guided Written Production (Fact File)',
			points: 3,
			instruction:
				'Read the Fact File and write a guided paragraph evaluated on the 4 official mastery levels (A, B, C, D):',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText:
					'In the 5AP English Competency Evaluation (Written Production from a Fact File), what guarantees Maximum Mastery (Level A)?',
				questionTextAr:
					'في امتحان تقييم المكتسبات للإنجليزية (السنة الخامسة ابتدائي)، ما الذي يضمن نيل التملك الأقصى (A) في الإنتاج الكتابي من بطاقة المعلومات؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Maximum Mastery (Level A) requires: ${quizCorrect}`
			},
			sujetExercise,
			hints: [
				'استثمر جميع خانات بطاقة المعلومات السبع (الاسم، العمر، المدينة، المدرسة، مهنة الأب، المهنة الحلم، الهوايات، وخطة العطلة).',
				'وظّف المضارع البسيط للتعريف والهوايات، و going to + الفعل المجرد لخطة العطلة القادمة.',
				'راجع شبكة التملك الأربعة (A / B / C / D): الملاءمة، سلامة اللغة، الإملاء والترقيم، ووضوح الخط.'
			],
			solutionStepsAr: [
				`التقديم والمدينة والمدرسة: ${f.name}, ${f.age}, ${f.hometown}, ${f.school}`,
				`مهنة الأب والهوايات ومهنة المستقبل: ${f.fatherJob} | ${f.hobbies} | ${f.dreamJob}`,
				`خطة العطلة بـ going to: ${f.holidayPlan}`,
				`الفقرة النموذجية (تملك أقصى A): ${f.modelParagraph}`
			],
			finalAnswer: quizCorrect
		};
	}
};

export const TEMPLATES_5AP_T3: EnglishParameterizedTemplate[] = [
	tplCompHolidaysSeasonsT3,
	tplGrammarGoingToTransportT3,
	tplVocabWeatherPhonicsT3,
	tplWrittenHolidayPlanT3,
	tplWrittenCompetencyEvalFactFileT3
];
