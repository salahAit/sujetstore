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

// ===============================================================================
// Parameterized Templates - 5AP English - Trimester 1 (Jobs, Occupations & Hobbies)
// ===============================================================================

// -------------------------------------------------------------------------------
// 1. Reading Comprehension (4 pts): My Family Jobs and Clean Hobbies
// -------------------------------------------------------------------------------
interface T1PassagePack {
	title: string;
	pupil: string;
	age: string;
	city: string;
	fatherJob: string;
	fatherPlace: string;
	motherJob: string;
	motherPlace: string;
	hobby: string;
	dreamJob: string;
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

const T1_PASSAGES: readonly T1PassagePack[] = [
	{
		title: 'My Family and My Dream Job',
		pupil: 'Youssef',
		age: 'ten',
		city: 'Setif',
		fatherJob: 'a doctor',
		fatherPlace: 'in a hospital',
		motherJob: 'a teacher',
		motherPlace: 'in a primary school',
		hobby: 'reading stories and playing chess',
		dreamJob: 'an engineer',
		paragraphs: [
			'Hello! My name is Youssef. I am ten years old and I live in Setif, Algeria. I am a pupil in the fifth year of primary school.',
			'My father is a [[doctor]]. He works in a big hospital and helps sick people every day. My mother is a [[teacher]]. She teaches Arabic in a primary school.',
			'In my free time, I like reading stories and playing chess with my brother. When I grow up, I want to be an engineer to build clean schools and mosques.'
		],
		glossary: [
			{ term: 'sick people', meaning: 'ill persons who need care' },
			{ term: 'grow up', meaning: 'become an adult' }
		],
		tfItems: [
			{ q: 'Youssef lives in Setif, Algeria.', a: 'True', mark: '0.5' },
			{ q: 'His father works in a bakery.', a: 'False', mark: '0.5' },
			{ q: 'His mother teaches in a primary school.', a: 'True', mark: '0.5' },
			{ q: 'Youssef wants to be a farmer.', a: 'False', mark: '0.5' }
		],
		q1: 'Where does Youssef father work?',
		a1: 'He works in a big hospital.',
		q2: 'What does Youssef like doing in his free time?',
		a2: 'He likes reading stories and playing chess.',
		quizPrompt: 'Read the passage about Youssef: What is his father job and workplace?',
		quizCorrect: 'He is a doctor and he works in a hospital.',
		quizDistractors: [
			{ text: 'He is a baker and he works in a bakery.', diagnosticFeedback: 'The text states Youssef father helps sick people in a hospital.' },
			{ text: 'He is a teacher and he works in a school.', diagnosticFeedback: 'His mother is the teacher, not his father.' },
			{ text: 'He is a farmer and he works on a farm.', diagnosticFeedback: 'A farmer is not mentioned for his father.' }
		]
	},
	{
		title: 'Useful Professions in My Family',
		pupil: 'Meriem',
		age: 'eleven',
		city: 'Tlemcen',
		fatherJob: 'a baker',
		fatherPlace: 'in a bakery',
		motherJob: 'a nurse',
		motherPlace: 'in a hospital',
		hobby: 'reading books and cycling',
		dreamJob: 'a doctor',
		paragraphs: [
			'Hi! My name is Meriem. I am eleven years old and I live in Tlemcen. Every morning, I wake up early, pray Fajr, and go to school at eight o clock.',
			'My father is a [[baker]]. He works in a clean bakery near our house and makes fresh bread. My mother is a [[nurse]]. She works in a hospital and cares for patients.',
			'On Friday afternoon, I like reading books and cycling in the park. I want to be a doctor to serve my hometown.'
		],
		glossary: [
			{ term: 'fresh bread', meaning: 'warm, newly baked bread' },
			{ term: 'patients', meaning: 'sick people at the hospital' }
		],
		tfItems: [
			{ q: 'Meriem is eleven years old.', a: 'True', mark: '0.5' },
			{ q: 'Her father makes fresh bread in a bakery.', a: 'True', mark: '0.5' },
			{ q: 'Her mother works on a farm.', a: 'False', mark: '0.5' },
			{ q: 'Meriem wants to be a doctor.', a: 'True', mark: '0.5' }
		],
		q1: 'What time does Meriem go to school?',
		a1: 'She goes to school at eight o clock.',
		q2: 'Where does Meriem mother work?',
		a2: 'She works in a hospital.',
		quizPrompt: 'In Meriem story, what does her father do every morning?',
		quizCorrect: 'He is a baker and makes fresh bread in a bakery.',
		quizDistractors: [
			{ text: 'He is a nurse and works in a hospital.', diagnosticFeedback: 'Her mother is the nurse in the text.' },
			{ text: 'He is a carpenter and works in a workshop.', diagnosticFeedback: 'A carpenter is not mentioned in Meriem story.' },
			{ text: 'He is a firefighter and works in a fire station.', diagnosticFeedback: 'Her father works in a bakery, not a fire station.' }
		]
	},
	{
		title: 'Hard Work and Useful Hobbies',
		pupil: 'Amin',
		age: 'ten',
		city: 'Blida',
		fatherJob: 'a farmer',
		fatherPlace: 'on a farm',
		motherJob: 'an architect',
		motherPlace: 'in an office',
		hobby: 'swimming and playing football',
		dreamJob: 'a firefighter',
		paragraphs: [
			'Hello friends! I am Amin. I am ten years old and I live in Blida. I have one sister and one brother.',
			'My father is a [[farmer]]. He works on a green farm and grows sweet oranges and vegetables. My mother is an [[architect]]. She works in an office and designs houses.',
			'In my free time, I like swimming and playing football with my cousins. My dream job is to be a firefighter to protect people.'
		],
		glossary: [
			{ term: 'grows', meaning: 'plants and produces food' },
			{ term: 'protect', meaning: 'keep safe from danger' }
		],
		tfItems: [
			{ q: 'Amin lives in Blida.', a: 'True', mark: '0.5' },
			{ q: 'His father works on a farm.', a: 'True', mark: '0.5' },
			{ q: 'His mother is a nurse.', a: 'False', mark: '0.5' },
			{ q: 'Amin likes swimming and playing football.', a: 'True', mark: '0.5' }
		],
		q1: 'What does Amin father grow on his farm?',
		a1: 'He grows sweet oranges and vegetables.',
		q2: 'What is Amin dream job?',
		a2: 'He wants to be a firefighter.',
		quizPrompt: 'According to Amin passage, where does his father work?',
		quizCorrect: 'He works on a green farm.',
		quizDistractors: [
			{ text: 'He works in an office.', diagnosticFeedback: 'His mother works in an office as an architect.' },
			{ text: 'He works in a school.', diagnosticFeedback: 'Amin is a pupil, while his father is a farmer.' },
			{ text: 'He works in a hospital.', diagnosticFeedback: 'A hospital is not mentioned in Amin passage.' }
		]
	}
];

const tplCompJobsHobbiesT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t1_comp_jobs_hobbies',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: المهن النافعة والهوايات (Reading Comprehension - Jobs and Hobbies)',
	curriculumLessonId: 'eng_lesson_5ap_t1_jobs_workplaces',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 37 + 11);
		const p = T1_PASSAGES[Math.abs(seed - 1) % T1_PASSAGES.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				source: 'Adapted 5AP Educational Reading Text',
				glossary: p.glossary
			}),
			buildIllustratedFigureBlock('pri_lang_05_professions_tools', {
				lang: 'en',
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
			instruction: 'Read the text carefully, then do the activities below:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `${p.paragraphs.join(' ')}\n\nQuestion: ${p.quizPrompt}`,
				questionTextAr: `اقرأ الفقرة عن ${p.pupil} ثم اختر الإجابة الصحيحة:\n${p.quizPrompt}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${p.quizCorrect}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص مرتين وابحث عن أسماء المهن (doctor, teacher, baker, farmer) وأماكن العمل.',
				'في أسئلة True / False قارن كل جملة بما ورد حرفياً في النص.',
				'في أسئلة الفهم أجب بجملة قصيرة وكاملة تبدأ بحرف كبير وتنتهي بنقطة.'
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
// 2. Mastery of Language (3 pts): Present Simple Affirmative & Negative
// -------------------------------------------------------------------------------
const PRESENT_SIMPLE_MCQS = [
	{
		prompt: 'My father (work / works) in a hospital.',
		options: ['work', 'works', 'working'],
		correct: 'works',
		explanation: 'My father = He, so we add -s: works.'
	},
	{
		prompt: 'Meriem (go / goes) to school at eight o clock.',
		options: ['go', 'goes', 'going'],
		correct: 'goes',
		explanation: 'Meriem = She, and go ends in -o, so we add -es: goes.'
	},
	{
		prompt: 'We (read / reads) useful books in the library.',
		options: ['read', 'reads', 'reading'],
		correct: 'read',
		explanation: 'With We, Present Simple uses the base verb: read.'
	},
	{
		prompt: 'My uncle (teach / teaches) English at school.',
		options: ['teach', 'teaches', 'teaching'],
		correct: 'teaches',
		explanation: 'My uncle = He, and teach ends in -ch, so we add -es: teaches.'
	},
	{
		prompt: 'They (play / plays) football on Friday.',
		options: ['play', 'plays', 'playing'],
		correct: 'play',
		explanation: 'With They, we keep the base verb: play.'
	},
	{
		prompt: 'Khadidja (like / likes) swimming and cycling.',
		options: ['like', 'likes', 'liking'],
		correct: 'likes',
		explanation: 'Khadidja = She, so we add -s: likes.'
	}
] as const;

const PRESENT_SIMPLE_NEGATIVES = [
	{
		aff: 'He works in a bakery.',
		neg: 'He does not work in a bakery.'
	},
	{
		aff: 'She plays football on Monday.',
		neg: 'She does not play football on Monday.'
	},
	{
		aff: 'They live in Oran.',
		neg: 'They do not live in Oran.'
	},
	{
		aff: 'We wake up late on school days.',
		neg: 'We do not wake up late on school days.'
	},
	{
		aff: 'Bilal likes watching television all day.',
		neg: 'Bilal does not like watching television all day.'
	},
	{
		aff: 'The carpenter works on a farm.',
		neg: 'The carpenter does not work on a farm.'
	}
] as const;

const tplGrammarPresentSimpleT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t1_grammar_present_simple',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'grammar_tenses',
	titleAr: 'التحكم في اللغة: المضارع البسيط إثباتاً ونفياً (Present Simple)',
	curriculumLessonId: 'eng_lesson_5ap_t1_present_simple',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 53 + 17);
		const pickedMcqs = rng.pickDistinct(PRESENT_SIMPLE_MCQS, 3);
		const pickedNegs = rng.pickDistinct(PRESENT_SIMPLE_NEGATIVES, 3);
		const qNeg = pickedNegs[0];

		const mcq = buildUniqueMcqOptions(
			qNeg.neg,
			[
				{
					text: qNeg.neg.replace(/(does|do) not (\w+)/, '$1 not $2s'),
					diagnosticFeedback: 'Remember: after does not / do not, use the base verb without -s.'
				},
				{
					text: qNeg.aff.replace(/^(\w+)\s+/, '$1 not '),
					diagnosticFeedback: 'Present Simple negative needs the auxiliary do not or does not.'
				},
				{
					text: qNeg.neg.includes('does not')
						? qNeg.neg.replace('does not', 'do not')
						: qNeg.neg.replace('do not', 'does not'),
					diagnosticFeedback: 'Use does not with He/She/It, and do not with I/You/We/They.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_lang_06_hygiene_washbasin', {
				lang: 'en',
				title: 'Healthy Daily Habits and Present Simple',
				maxHeight: 104,
				width: '56%'
			}),
			{
				type: 'text',
				content: 'Activity 1: Tick the correct verb form in Present Simple (1.5 pts):'
			},
			{
				type: 'multiple_choice',
				groups: pickedMcqs.map((m, idx) => ({
					header: `${idx + 1}) ${m.prompt}`,
					options: [...m.options],
					correct: m.correct,
					mark: '0.5'
				}))
			},
			{
				type: 'text',
				content: 'Activity 2: Turn the following sentences into the negative form using do not / does not (1.5 pts):'
			},
			...pickedNegs.map((n, idx) => ({
				type: 'text' as const,
				content: `${idx + 1}) ${n.aff}\n    Negative: ........................................................................`,
				answer: `${idx + 1}) ${n.neg}`,
				mark: '0.5'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Present Simple)',
			points: 3,
			instruction: 'Apply the Present Simple rules (affirmative and negative):',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Turn this sentence into the negative form: "${qNeg.aff}"`,
				questionTextAr: `حوّل الجملة التالية إلى النفي في المضارع البسيط:\n"${qNeg.aff}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct negative form: ${qNeg.neg}`
			},
			sujetExercise,
			hints: [
				'مع ضمائر المفرد الغائب (He, She, It) نضيف s أو es للفعل في الإثبات.',
				'للنفي نستعمل does not مع المفرد الغائب و do not مع الجمع و I / You.',
				'بعد do not / does not نحذف s أو es ويعود الفعل مجرداً دائماً.'
			],
			solutionStepsAr: [
				...pickedMcqs.map((m, i) => `التمرين 1 (${i + 1}): ${m.correct} — ${m.explanation}`),
				...pickedNegs.map((n, i) => `التمرين 2 (${i + 1}): ${n.neg}`)
			],
			finalAnswer: qNeg.neg
		};
	}
};

// -------------------------------------------------------------------------------
// 3. Mastery of Language (3 pts): Articles (a / an) & Jobs / Workplaces Matching
// -------------------------------------------------------------------------------
const JOB_ARTICLE_ITEMS = [
	{ job: 'engineer', article: 'an', place: 'in an office' },
	{ job: 'doctor', article: 'a', place: 'in a hospital' },
	{ job: 'architect', article: 'an', place: 'in an office' },
	{ job: 'teacher', article: 'a', place: 'in a school' },
	{ job: 'baker', article: 'a', place: 'in a bakery' },
	{ job: 'farmer', article: 'a', place: 'on a farm' },
	{ job: 'carpenter', article: 'a', place: 'in a workshop' },
	{ job: 'firefighter', article: 'a', place: 'in a fire station' }
] as const;

const tplVocabJobsArticlesT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t1_vocab_jobs_articles',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'vocabulary_morphology',
	titleAr: 'التحكم في اللغة: أدوات النكرة (a / an) والمهن وأماكن العمل',
	curriculumLessonId: 'eng_lesson_5ap_t1_articles_punctuation',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 71 + 23);
		const anItems = JOB_ARTICLE_ITEMS.filter((x) => x.article === 'an');
		const aItems = JOB_ARTICLE_ITEMS.filter((x) => x.article === 'a');
		const chosen = rng.shuffle([
			rng.pick(anItems),
			...rng.pickDistinct(aItems, 3)
		]);

		const quizTarget = chosen[0];
		const mcq = buildUniqueMcqOptions(
			`${quizTarget.article} ${quizTarget.job} works ${quizTarget.place}.`,
			[
				{
					text: `${quizTarget.article === 'a' ? 'an' : 'a'} ${quizTarget.job} works ${quizTarget.place}.`,
					diagnosticFeedback: 'Check the first sound of the job: use an before vowel sounds (a, e, i, o, u) and a before consonants.'
				},
				{
					text: `${quizTarget.article} ${quizTarget.job} work ${quizTarget.place}.`,
					diagnosticFeedback: 'A singular job subject takes -s on the verb: works.'
				},
				{
					text: `${quizTarget.article} ${quizTarget.job} works in a farm.`,
					diagnosticFeedback: 'Check the right workplace and preposition for this profession.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock('pri_ara_05_fresh_fruits_honey_basket', {
				lang: 'en',
				title: 'Indefinite Articles (a / an) with Healthy Food and Professions',
				customLegend: [
					{ num: '1', label: 'Use "an" before vowel sounds: an apple, an orange, an engineer' },
					{ num: '2', label: 'Use "a" before consonant sounds: a basket, a doctor, a baker' }
				],
				maxHeight: 104,
				width: '56%'
			}),
			{
				type: 'text',
				content: 'Activity 1: Complete the table with the right article (a or an) and the matching workplace (3 pts):'
			},
			{
				type: 'table',
				headers: ['Job (المهنة)', 'Article (a / an)', 'Workplace (مكان العمل)'],
				cells: [],
				rows: chosen.map((item) => [
					{ content: item.job, bold: true },
					{ content: '........', answer: item.article, mark: '0.25' },
					{ content: '........................', answer: item.place, mark: '0.5' }
				]),
				align: 'center',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Vocabulary and Articles (a / an)',
			points: 3,
			instruction: 'Choose the right indefinite article (a / an) and match each profession with its workplace:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the grammatically correct sentence for the profession "${quizTarget.job}":`,
				questionTextAr: `اختر الجملة الصحيحة التي تستعمل أداة النكرة ومكان العمل المناسبين لمهنة "${quizTarget.job}":`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct sentence: ${quizTarget.article} ${quizTarget.job} works ${quizTarget.place}.`
			},
			sujetExercise,
			hints: [
				'نضع an قبل الكلمات التي تبدأ بصوت متحرك (a, e, i, o, u) مثل engineer و architect.',
				'نضع a قبل الكلمات التي تبدأ بصوت ساكن مثل doctor, baker, teacher, farmer.',
				'تذكر أن الفلاح يعمل on a farm وليس in a farm.'
			],
			solutionStepsAr: chosen.map(
				(item) => `${item.article} ${item.job}: works ${item.place}`
			),
			finalAnswer: `${quizTarget.article} ${quizTarget.job} works ${quizTarget.place}.`
		};
	}
};

// -------------------------------------------------------------------------------
// 4. Mastery of Language (3 pts): To Be / To Have & Capitalization / Punctuation
// -------------------------------------------------------------------------------
const BE_HAVE_ITEMS = [
	{ q: 'I ............ ten years old.', a: 'am' },
	{ q: 'My sister ............ a new English book.', a: 'has' },
	{ q: 'Ahmed and Bilal ............ good friends.', a: 'are' },
	{ q: 'My uncle ............ an engineer.', a: 'is' },
	{ q: 'We ............ a clean primary school.', a: 'have' },
	{ q: 'She ............ two brothers.', a: 'has' }
] as const;

const PUNCT_ITEMS = [
	{
		raw: 'hello my name is youssef i live in setif',
		fixed: 'Hello, my name is Youssef. I live in Setif.'
	},
	{
		raw: 'where does amin live in algeria',
		fixed: 'Where does Amin live in Algeria?'
	},
	{
		raw: 'meriem and i like reading books on friday',
		fixed: 'Meriem and I like reading books on Friday.'
	},
	{
		raw: 'what is your father job karim',
		fixed: 'What is your father job, Karim?'
	}
] as const;

const tplSyntaxBeHavePunctT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t1_syntax_be_have_punct',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'التحكم في اللغة: فعلا (To Be / To Have) وعلامات الترقيم والحروف الكبيرة',
	curriculumLessonId: 'eng_lesson_5ap_t1_pronouns_be_have',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 89 + 31);
		const pickedBeHave = rng.pickDistinct(BE_HAVE_ITEMS, 3);
		const pickedPunct = rng.pickDistinct(PUNCT_ITEMS, 2);
		const qPunct = pickedPunct[0];

		const mcq = buildUniqueMcqOptions(
			qPunct.fixed,
			[
				{
					text: qPunct.raw + '.',
					diagnosticFeedback: 'Remember to capitalize the first word, names, cities, days, and the pronoun I.'
				},
				{
					text: qPunct.fixed.endsWith('?')
						? qPunct.fixed.slice(0, -1) + '.'
						: qPunct.fixed.slice(0, -1) + '?',
					diagnosticFeedback: 'Check whether the sentence is a statement (.) or a question (?).'
				},
				{
					text: qPunct.fixed.toLowerCase(),
					diagnosticFeedback: 'Capital letters are mandatory at sentence starts and for proper nouns.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: 'Activity 1: Complete with the right form (am, is, are, have, has) (1.5 pts):'
			},
			...pickedBeHave.map((it, i) => ({
				type: 'text' as const,
				content: `${i + 1}) ${it.q}`,
				answer: `${i + 1}) ${it.q.replace('............', it.a)}`,
				mark: '0.5'
			})),
			{
				type: 'text',
				content: 'Activity 2: Rewrite the sentences with the right capital letters and punctuation (1.5 pts):'
			},
			...pickedPunct.map((it, i) => ({
				type: 'text' as const,
				content: `${i + 1}) ${it.raw}\n    Correction: ........................................................................`,
				answer: `${i + 1}) ${it.fixed}`,
				mark: '0.75'
			}))
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Grammar and Punctuation (To Be / To Have)',
			points: 3,
			instruction: 'Complete the sentences with To Be / To Have, then supply capitalization and punctuation:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Choose the correctly capitalized and punctuated version of: "${qPunct.raw}"`,
				questionTextAr: `اختر الكتابة الصحيحة من حيث الحروف الكبيرة وعلامات الترقيم للجملة:\n"${qPunct.raw}"`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct sentence: ${qPunct.fixed}`
			},
			sujetExercise,
			hints: [
				'فعل الكينونة: I am / He-She-It is / You-We-They are، وفعل الملكية: I-You-We-They have / He-She-It has.',
				'اكتب بحرف كبير: بداية الجملة، أسماء الأشخاص والمدن والأيام، والضمير I دائماً.',
				'أنهِ الجملة الخبرية بنقطة (.) والسؤال بعلامة استفهام (?).'
			],
			solutionStepsAr: [
				...pickedBeHave.map((it, i) => `التمرين 1 (${i + 1}): ${it.a}`),
				...pickedPunct.map((it, i) => `التمرين 2 (${i + 1}): ${it.fixed}`)
			],
			finalAnswer: qPunct.fixed
		};
	}
};

// -------------------------------------------------------------------------------
// 5. Written Expression (3 pts): Introducing Myself, Family Jobs & Clean Hobbies
// -------------------------------------------------------------------------------
const T1_WRITING_PROFILES = [
	{
		name: 'Bilal',
		age: 'ten',
		city: 'Oran',
		fatherJob: 'a doctor (hospital)',
		motherJob: 'a teacher (primary school)',
		dreamJob: 'an engineer',
		hobbies: 'reading stories and swimming',
		model:
			'Hello! My name is Bilal. I am ten years old and I live in Oran, Algeria. My father is a doctor; he works in a hospital. My mother is a teacher; she works in a primary school. In my free time, I like reading stories and swimming. When I grow up, I want to be an engineer.'
	},
	{
		name: 'Khadidja',
		age: 'eleven',
		city: 'Constantine',
		fatherJob: 'a carpenter (workshop)',
		motherJob: 'a nurse (hospital)',
		dreamJob: 'a doctor',
		hobbies: 'reading books and cycling',
		model:
			'Hello! My name is Khadidja. I am eleven years old and I live in Constantine, Algeria. My father is a carpenter; he works in a workshop. My mother is a nurse; she works in a hospital. In my free time, I like reading books and cycling. When I grow up, I want to be a doctor.'
	},
	{
		name: 'Hamza',
		age: 'ten',
		city: 'Bejaia',
		fatherJob: 'a baker (bakery)',
		motherJob: 'a teacher (school)',
		dreamJob: 'a firefighter',
		hobbies: 'playing football and chess',
		model:
			'Hello! My name is Hamza. I am ten years old and I live in Bejaia, Algeria. My father is a baker; he works in a bakery. My mother is a teacher; she works in a school. In my free time, I like playing football and chess. When I grow up, I want to be a firefighter.'
	}
] as const;

const tplWrittenFamilyHobbiesT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_5ap_t1_written_family_hobbies',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الإنتاج الكتابي: التعريف بنفسي ومهن والدي وهواياتي النافعة',
	curriculumLessonId: 'eng_lesson_5ap_t1_hobbies_routine',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 97 + 41);
		const p = T1_WRITING_PROFILES[Math.abs(seed - 1) % T1_WRITING_PROFILES.length];

		const correctSentence = `My name is ${p.name}. I am ${p.age} years old and I live in ${p.city}.`;
		const mcq = buildUniqueMcqOptions(
			correctSentence,
			[
				{
					text: `My name are ${p.name}. I have ${p.age} years and I lives in ${p.city}.`,
					diagnosticFeedback: 'Use My name is, I am ... years old, and I live (without -s).'
				},
				{
					text: `my name is ${p.name.toLowerCase()} i am ${p.age} years old`,
					diagnosticFeedback: 'Capital letters and full stops are required for a good paragraph.'
				},
				{
					text: `I name is ${p.name}. I am ${p.age} old in ${p.city}.`,
					diagnosticFeedback: 'Use My name is ... and I am ... years old.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt:
					'Write a short paragraph (4 to 6 sentences) to introduce yourself, your parents jobs, your clean hobbies, and your dream job.',
				topicOneNotes: [
					`Name and Age: ${p.name}, ${p.age} years old`,
					`Hometown: ${p.city}, Algeria`,
					`Father job: ${p.fatherJob}`,
					`Mother job: ${p.motherJob}`,
					`Clean Hobbies: ${p.hobbies}`,
					`Dream Job: ${p.dreamJob}`
				],
				modelAnswer: p.model,
				rubricSummary:
					'Relevance and Fact Use (1 pt) | Present Simple and Articles a/an (1 pt) | Capitalization, Punctuation and Neatness (1 pt)',
				mark: '3'
			})
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Three: Guided Written Production',
			points: 3,
			instruction: 'Use the notes below to write a neat, short paragraph:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion: {
				type: 'mcq',
				questionText: `Which opening is grammatically accurate for ${p.name} (${p.age}, ${p.city})?`,
				questionTextAr: `اختر الجملة الافتتاحية الصحيحة لتقديم ${p.name} في التعبير الكتابي:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Best opening: ${correctSentence}`
			},
			sujetExercise,
			hints: [
				'ابدأ بتحية لطيفة ثم قدّم اسمك وعمرك ومدينتك: My name is ... . I am ... years old.',
				'وظّف كل المعطيات: مهنة الأب والأم مع a/an ومكان العمل، ثم الهواية بـ I like + ing.',
				'راجع الحروف الكبيرة في بداية الجمل ومع الأسماء والمدن، وأنهِ كل جملة بنقطة.'
			],
			solutionStepsAr: [
				`الجملة 1-2: التعريف بالاسم والعمر والمدينة (${p.name}, ${p.age}, ${p.city}).`,
				`الجملة 3-4: ذكر مهنتي الوالدين ومكان عملهما (${p.fatherJob} / ${p.motherJob}).`,
				`الجملة 5-6: الهوايات النافعة (${p.hobbies}) ومهنة المستقبل (${p.dreamJob}).`
			],
			finalAnswer: correctSentence
		};
	}
};

export const TEMPLATES_5AP_T1: EnglishParameterizedTemplate[] = [
	tplCompJobsHobbiesT1,
	tplGrammarPresentSimpleT1,
	tplVocabJobsArticlesT1,
	tplSyntaxBeHavePunctT1,
	tplWrittenFamilyHobbiesT1
];
