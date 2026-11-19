import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Part One A — Reading Comprehension (07 pts) — Self, Friends & Family
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension1amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t1_comp_self_family',
	grade: '1am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: التعريف بالنفس وبالصديق والعائلة (Me, My Friends & My Family)',
	curriculumLessonId: 'eng_lesson_1am_t1_to_be_pronouns',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Hello from Algiers!',
				source: 'Adapted 1MS Reading Text — Algerian Student Profile',
				paragraphs: [
					'Hello! My name is Amine. I am eleven years old and I am a pupil in 1MS at El-Ibrahimi Middle School in Algiers. I live with my [[kind]] parents, my brother Bilal, and my little sister Amina.',
					'My father is an architect and he is forty-two years old. My mother is a teacher and she is thirty-eight. My grandfather lives with us too. I love my [[big]] family very much and I always respect my parents.'
				],
				glossary: [
					{ term: 'pupil', meaning: 'school student (تلميذ)' },
					{ term: 'respect', meaning: 'show politeness and honour (يحترم)' }
				],
				tf: [
					{ q: 'Amine is eleven years old.', a: 'True', mark: '1' },
					{ q: 'Amine\'s father is a doctor.', a: 'False', c: 'He is an architect.', mark: '1' },
					{ q: 'Amine lives in Algiers with his family.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What is Amine\'s mother\'s job?\n2) How old is Amine\'s father?',
				whA: '1) Amine\'s mother is a teacher.\n2) Amine\'s father is forty-two (42) years old.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: nice = ......\nb) An opposite of: small = ......',
				lexA: 'a) nice = kind\nb) small != big',
				quizQ: 'What is Amine\'s father\'s job according to the text?',
				correctOpt: 'He is an architect.',
				distractors: [
					{ text: 'He is a teacher.', diagnosticFeedback: 'His mother is the teacher, not his father.' },
					{ text: 'He is a doctor.', diagnosticFeedback: 'The text states that his father is an architect.' },
					{ text: 'He is a farmer.', diagnosticFeedback: 'Farming is not mentioned in Amine\'s profile.' }
				]
			},
			{
				title: 'Meet Meriem from Tlemcen',
				source: 'Adapted 1MS Reading Text — Family Introduction',
				paragraphs: [
					'Hi! I am Meriem. I am twelve years old and I am from Tlemcen, a [[clean]] city in the west of Algeria. My best friend at school is Khadija. We are classmates in 1MS.',
					'I have got a [[happy]] family. My father is an engineer and my mother is a nurse at the local hospital. I have got two brothers, Omar and Anas. Every evening, we help our parents and revise our lessons together.'
				],
				glossary: [
					{ term: 'classmates', meaning: 'pupils in the same class (زملاء القسم)' },
					{ term: 'revise', meaning: 'study lessons again (يراجع)' }
				],
				tf: [
					{ q: 'Meriem is from Constantine.', a: 'False', c: 'She is from Tlemcen.', mark: '1' },
					{ q: 'Khadija is Meriem\'s classmate.', a: 'True', mark: '1' },
					{ q: 'Meriem has got two sisters.', a: 'False', c: 'She has got two brothers (Omar and Anas).', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) How old is Meriem?\n2) What is Meriem\'s mother\'s job?',
				whA: '1) Meriem is twelve (12) years old.\n2) Meriem\'s mother is a nurse.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: glad = ......\nb) An opposite of: dirty = ......',
				lexA: 'a) glad = happy\nb) dirty != clean',
				quizQ: 'Where does Meriem\'s mother work?',
				correctOpt: 'At the local hospital (she is a nurse).',
				distractors: [
					{ text: 'At a middle school.', diagnosticFeedback: 'Meriem studies at school, while her mother is a nurse.' },
					{ text: 'In an engineering office.', diagnosticFeedback: 'Her father is the engineer, not her mother.' },
					{ text: 'At a bakery.', diagnosticFeedback: 'A bakery is not mentioned in the text.' }
				]
			},
			{
				title: 'Bilal and His Family in Constantine',
				source: 'Adapted 1MS Reading Text — Student Profile',
				paragraphs: [
					'Good morning! My name is Bilal and I am from Constantine. I am eleven years old. I am a [[polite]] pupil and my favourite subject is English.',
					'My father is a baker and he wakes up [[early]] every morning. My mother is a housewife and she makes delicious traditional bread. I have got one sister; her name is Salma and she is nine years old.'
				],
				glossary: [
					{ term: 'baker', meaning: 'person who makes bread (خباز)' },
					{ term: 'housewife', meaning: 'mother who manages the home (ربة بيت)' }
				],
				tf: [
					{ q: 'Bilal is from Constantine.', a: 'True', mark: '1' },
					{ q: 'Bilal\'s father is an electrician.', a: 'False', c: 'His father is a baker.', mark: '1' },
					{ q: 'Salma is nine years old.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What is Bilal\'s favourite school subject?\n2) How many sisters has Bilal got?',
				whA: '1) His favourite subject is English.\n2) He has got one sister (Salma).',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: respectful = ......\nb) An opposite of: late = ......',
				lexA: 'a) respectful = polite\nb) late != early',
				quizQ: 'What is Bilal\'s father\'s occupation?',
				correctOpt: 'He is a baker.',
				distractors: [
					{ text: 'He is a teacher.', diagnosticFeedback: 'Read paragraph 2 carefully: Bilal\'s father makes bread.' },
					{ text: 'He is an architect.', diagnosticFeedback: 'The text mentions a baker, not an architect.' },
					{ text: 'He is a dentist.', diagnosticFeedback: 'A dentist is not mentioned in the passage.' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildEnglishPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — A/ Reading Comprehension',
			points: 7,
			instruction: 'Read the text carefully and do the following activities:',
			content: [
				passage,
				{ type: 'text', content: 'Task 1 (03 pts): Read the text and write "True" or "False":' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `In "${v.title}": ${v.quizQ}`,
				questionTextAr: `في نص "${v.title}": ${v.quizQ}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'اقرأ النص مرتين بتركيز وابحث عن الاسم والعمر والمدينة والمهن.',
				'في أسئلة True / False قارن كل جملة بما ورد في النص حرفيا.',
				'في المفردات (Lexis) استخرج الكلمة من النص نفسه كما هي.'
			],
			solutionStepsAr: [
				v.tf.map((item, i) => `${i + 1}) ${item.a}${item.c ? ` (${item.c})` : ''}`).join(' | '),
				v.whA,
				v.lexA
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Part One B — Mastery of Language (07 pts) — to be, a/an, /ai/ vs /ei/
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT1Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t1_expl_tobe_articles',
	grade: '1am',
	trimesterId: 't1',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة والصوتيات: فعل الكينونة (to be) و (a / an) ونطق /ai/ و /ei/',
	curriculumLessonId: 'eng_lesson_1am_t1_articles_jobs',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Supply the right article (a / an):\n1) My uncle is ...... electrician.\n2) My mother is ...... nurse.\n3) My father is ...... architect.\n4) My brother is ...... doctor.',
				task1Ans: '1) an electrician   2) a nurse   3) an architect   4) a doctor',
				task2Prompt:
					'Task 2 (03 pts): Put the verb "to be" in the correct form (am / is / are):\n1) Hello! I (to be) ...... Hamza.\n2) My sister Amina (to be) ...... ten years old.\n3) We (to be) ...... Algerian pupils.',
				task2Ans: '1) am   2) is   3) are',
				phonWords: 'name — nine — day — fine',
				aiWords: ['nine', 'fine'],
				eiWords: ['name', 'day'],
				quizQ: 'Choose the right sentence with "to be" and the article (a / an):',
				correctOpt: 'My father is an architect and I am a pupil.',
				distractors: [
					{ text: 'My father are a architect and I is a pupil.', diagnosticFeedback: 'Use is with father, an before architect, and am with I.' },
					{ text: 'My father is a architect and I am an pupil.', diagnosticFeedback: 'architect starts with a vowel (an), while pupil starts with a consonant (a).' },
					{ text: 'My father am an architect and I are a pupil.', diagnosticFeedback: 'am goes with I only, and is goes with My father.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Supply the right article (a / an):\n1) Omar is ...... engineer.\n2) Fatima is ...... teacher.\n3) Karim is ...... optician.\n4) Sami is ...... farmer.',
				task1Ans: '1) an engineer   2) a teacher   3) an optician   4) a farmer',
				task2Prompt:
					'Task 2 (03 pts): Put the verb "to be" in the correct form (am / is / are):\n1) My name (to be) ...... Youssef.\n2) You (to be) ...... my best friend.\n3) I (to be) ...... from Oran.',
				task2Ans: '1) is   2) are   3) am',
				phonWords: 'five — classmate — white — age',
				aiWords: ['five', 'white'],
				eiWords: ['classmate', 'age'],
				quizQ: 'Which pair of words contains the /ai/ sound (like "nine")?',
				correctOpt: 'five and white',
				distractors: [
					{ text: 'classmate and age', diagnosticFeedback: 'Both classmate and age have the /ei/ sound.' },
					{ text: 'name and day', diagnosticFeedback: 'Both name and day have the /ei/ sound.' },
					{ text: 'eight and table', diagnosticFeedback: 'Both eight and table have the /ei/ sound.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Supply the right article (a / an):\n1) My cousin is ...... dentist.\n2) My grandfather is ...... imam.\n3) My aunt is ...... baker.\n4) My neighbour is ...... accountant.',
				task1Ans: '1) a dentist   2) an imam   3) a baker   4) an accountant',
				task2Prompt:
					'Task 2 (03 pts): Put the verb "to be" in the correct form (am / is / are):\n1) They (to be) ...... good classmates.\n2) She (to be) ...... eleven years old.\n3) I (to be) ...... happy at school.',
				task2Ans: '1) are   2) is   3) am',
				phonWords: 'my — eight — nice — today',
				aiWords: ['my', 'nice'],
				eiWords: ['eight', 'today'],
				quizQ: 'Choose the right article for: "My grandfather is ...... imam."',
				correctOpt: 'an',
				distractors: [
					{ text: 'a', diagnosticFeedback: 'imam starts with a vowel sound (i), so we use an.' },
					{ text: 'are', diagnosticFeedback: 'are is a verb, not an article.' },
					{ text: 'am', diagnosticFeedback: 'am is a verb for the pronoun I.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/ai/ (nine)', words: s.aiWords, mark: '1' },
				{ header: '/ei/ (name)', words: s.eiWords, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Do the following grammar and pronunciation tasks:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the following words in the table according to their vowel sound: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'grammar_tenses',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'استعمل an قبل حروف العلة (a, e, i, o, u)، و a قبل الحروف الساكنة.',
				'تذكّر تصريف to be: I am / He, She, It is / You, We, They are.',
				'قارن نطق كل كلمة بـ nine لعمود /ai/، وبـ name لعمود /ei/.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/ai/: ${s.aiWords.join(', ')} | /ei/: ${s.eiWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — Pronouns, Family & Numbers
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT1Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t1_expl_pronouns_jobs_family',
	grade: '1am',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): الضمائر والملكية والأعداد وشجرة العائلة',
	curriculumLessonId: 'eng_lesson_1am_t1_numbers_age_family',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Write the numbers in full letters:\n1) 12 = ......   2) 40 = ......   3) 15 = ......   4) 65 = ......',
				task1Ans: '1) twelve   2) forty   3) fifteen   4) sixty-five',
				task2Prompt:
					'Task 2 (03 pts): Choose the right word between brackets:\n1) This is my brother. (His / Her) name is Anas.\n2) I (have got / has got) two sisters.\n3) (He / She) is my grandmother. She is sixty.',
				task2Ans: '1) His   2) have got   3) She',
				phonWords: 'hi — play — five — table',
				aiWords: ['hi', 'five'],
				eiWords: ['play', 'table'],
				quizQ: 'Choose the right possessive adjective: "This is my sister. ...... name is Ines."',
				correctOpt: 'Her',
				distractors: [
					{ text: 'His', diagnosticFeedback: 'His is for masculine singular (brother/father).' },
					{ text: 'They', diagnosticFeedback: 'They is a subject pronoun, not a possessive adjective.' },
					{ text: 'He', diagnosticFeedback: 'He is a masculine subject pronoun.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Reorder the words to get two correct sentences:\n1) years / I / eleven / am / old / .\n2) is / a / doctor / father / My / .',
				task1Ans: '1) I am eleven years old.\n2) My father is a doctor.',
				task2Prompt:
					'Task 2 (03 pts): Complete with (my / his / her):\n1) ...... name is Salma. I am 11.\n2) This is my uncle. ...... job is carpenter.\n3) This is my aunt. ...... name is Hafsa.',
				task2Ans: '1) My   2) His   3) Her',
				phonWords: 'like — say — write — classmate',
				aiWords: ['like', 'write'],
				eiWords: ['say', 'classmate'],
				quizQ: 'Which sentence is grammatically correct for stating age?',
				correctOpt: 'I am twelve years old.',
				distractors: [
					{ text: 'I have twelve years old.', diagnosticFeedback: 'In English, we use verb to be (am/is/are) for age, not have.' },
					{ text: 'I is twelve years old.', diagnosticFeedback: 'With I, always use am.' },
					{ text: 'I are twelve years old.', diagnosticFeedback: 'are is for you, we, and they.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Match each family member to the right definition:\n1) father\'s father : ......   2) mother\'s sister : ......   3) father\'s brother : ......   4) mother\'s mother : ...... (Choices: aunt, uncle, grandfather, grandmother)',
				task1Ans: '1) grandfather   2) aunt   3) uncle   4) grandmother',
				task2Prompt:
					'Task 2 (03 pts): Complete with (have got / has got):\n1) Meriem ...... one brother.\n2) We ...... a tidy house in Setif.\n3) My friend Bilal ...... a kind grandfather.',
				task2Ans: '1) has got   2) have got   3) has got',
				phonWords: 'nine — cake — my — day',
				aiWords: ['nine', 'my'],
				eiWords: ['cake', 'day'],
				quizQ: 'Choose the correct form: "My friend Bilal ...... two brothers."',
				correctOpt: 'has got',
				distractors: [
					{ text: 'have got', diagnosticFeedback: 'Bilal equals He, so use has got.' },
					{ text: 'are got', diagnosticFeedback: 'We do not use are with got.' },
					{ text: 'am got', diagnosticFeedback: 'am is only for I and not with got.' }
				]
			}
		];

		const s = rng.pick(sets);
		const cleanTask1 = s.task1Prompt;
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/ai/ (hi)', words: s.aiWords, mark: '1' },
				{ header: '/ei/ (day)', words: s.eiWords, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Answer all three language activities carefully:',
			content: [
				{ type: 'text', content: cleanTask1, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Put each word in the right sound column: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'grammar_syntax',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'استعمل His للمذكر المفرد و Her للمؤنث المفرد و My للمتكلم.',
				'استعمل has got مع He / She / It و have got مع I / You / We / They.',
				'انطق كلمات الصوتيات ببطء وميّز بين /ai/ و /ei/.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/ai/: ${s.aiWords.join(', ')} | /ei/: ${s.eiWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Part Two — Situation of Integration (06 pts) — Intro & Family
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t1_written_intro_family',
	grade: '1am',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: تقديم النفس والعائلة في رسالة قصيرة (06 نقاط)',
	curriculumLessonId: 'eng_lesson_1am_t1_numbers_age_family',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Your new penfriend wants to know about you and your family. Write a short message introducing yourself and your family members.',
				notes: [
					'Name: Amine / Age: 11 / Country & City: Algeria, Algiers / School: 1MS pupil',
					'Father: 43, an engineer / Mother: 39, a teacher',
					'Siblings: 1 brother (Bilal, 9) and 1 sister (Amina, 6)',
					'Closing: loving and respecting your family'
				],
				topicTwo: 'Write a short paragraph introducing your best friend at school (name, age, city, class, and parents\' jobs).',
				modelAnswer:
					'Hello! My name is Amine. I am eleven years old and I am a pupil in 1MS. I am from Algiers, Algeria. I have got a happy family. My father is forty-three years old and he is an engineer. My mother is thirty-nine and she is a teacher. I have got one brother, Bilal, who is nine, and one sister, Amina, who is six. I love and respect my family very much.',
				quizQ: 'Which sentence is best for starting a self-introduction paragraph in 1MS?',
				correctOpt: 'Hello! My name is Amine and I am eleven years old.',
				distractors: [
					{ text: 'Goodbye! My father is an engineer.', diagnosticFeedback: 'Goodbye is for closing, not starting.' },
					{ text: 'Name Amine eleven Algeria.', diagnosticFeedback: 'Full English sentences need subjects and verbs.' },
					{ text: 'I have eleven years old and I is a pupil.', diagnosticFeedback: 'Use I am eleven years old and I am a pupil.' }
				]
			},
			{
				prompt: 'Write a short profile for your school wall magazine introducing yourself, your city, and your family.',
				notes: [
					'Name: Meriem / Age: 12 / City: Tlemcen, Algeria / Class: 1MS',
					'Father: 45, a doctor / Mother: 40, a housewife',
					'Siblings: 2 brothers (Omar and Hamza)',
					'Grandfather: lives with us, very kind'
				],
				topicTwo: 'Write a short paragraph about your favourite family member (name, age, job, and why you respect them).',
				modelAnswer:
					'Hi! My name is Meriem. I am twelve years old and I am from Tlemcen, Algeria. I am a pupil in 1MS. I have got a wonderful family. My father is forty-five years old and he is a doctor. My mother is forty and she is a housewife. I have got two brothers: Omar and Hamza. My grandfather lives with us and he is very kind. I love my family.',
				quizQ: 'Which sentence correctly uses an indefinite article for a parent\'s job?',
				correctOpt: 'My father is a doctor and my uncle is an architect.',
				distractors: [
					{ text: 'My father is an doctor and my uncle is a architect.', diagnosticFeedback: 'doctor takes a, while architect takes an.' },
					{ text: 'My father is doctor and my uncle is architect.', diagnosticFeedback: 'Singular jobs always need a or an.' },
					{ text: 'My father are a doctor and my uncle are an architect.', diagnosticFeedback: 'Both subjects are singular and take is.' }
				]
			},
			{
				prompt: 'Reply to your classmate\'s message by introducing yourself and describing your family tree.',
				notes: [
					'Name: Youssef / Age: 11 / City: Constantine, Algeria / Class: 1MS',
					'Father: 41, an architect / Mother: 37, a nurse',
					'Siblings: 1 sister (Salma, 8)',
					'Hobby: reading books and helping parents'
				],
				topicTwo: 'Write a short dialogue between two 1MS pupils meeting on the first day of school.',
				modelAnswer:
					'Hello! I am Youssef. I am eleven years old and I live in Constantine, Algeria. I am a pupil in 1MS. My father is forty-one years old and he is an architect. My mother is thirty-seven and she is a nurse. I have got one little sister; her name is Salma and she is eight years old. I like reading books and helping my parents.',
				quizQ: 'Which closing sentence fits a 1MS family introduction paragraph?',
				correctOpt: 'I love and respect my family very much.',
				distractors: [
					{ text: 'Where is the train station?', diagnosticFeedback: 'This question is unrelated to a family introduction.' },
					{ text: 'My name is eleven years.', diagnosticFeedback: 'Grammatically incorrect and belongs in the opening.' },
					{ text: 'How much is a kilo of dates?', diagnosticFeedback: 'Shopping questions do not belong in a family intro.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance (2 pts) + Coherence & Organisation (1.5 pts) + Grammar, Articles & Spelling (1.5 pts) + Capitalization & Punctuation (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a clean, well-punctuated paragraph of 5 to 7 sentences:',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: 'written_expression',
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'ابدأ بالتحية وتقديم الاسم والعمر والمدينة والقسم.',
				'استعمل am / is / are للعمر والمهن، و have got لعدد الإخوة.',
				'تأكد من الحروف الكبيرة (I, Algeria, الأسماء) والنقاط في آخر كل جملة.'
			],
			solutionStepsAr: [
				'التحية وتقديم النفس (الاسم، العمر، المدينة، المستوى).',
				'ذكر مهن وأعمار الوالدين باستعمال a / an.',
				'ذكر الإخوة والخاتمة المعبرة عن حب العائلة واحترامها.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T1: EnglishParameterizedTemplate[] = [
	comprehension1amT1,
	exploration1amT1Main,
	exploration1amT1Alt,
	written1amT1
];
