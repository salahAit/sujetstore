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
// Template 1: Part One A — Reading Comprehension (07 pts) — Friend & Family Home
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension2amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t1_comp_friend_home',
	grade: '2am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: وصف صديقي المقرب ومنزل أسرتي (Me, My Friends and My Family)',
	curriculumLessonId: 'eng_lesson_2am_t1_appearance_personality',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'My Best Friend Omar and Our Home',
				source: 'Adapted 2MS Reading Text — Friends & Family',
				paragraphs: [
					'My best friend at middle school is Omar. He is twelve years old and lives near our neighbourhood in Algiers. Omar is tall and slim. He has got short black hair and big brown eyes. Everyone likes him because he is [[polite]], honest, and always helpful to his classmates.',
					'Omar lives in a [[comfortable]] two-storey house with his parents and his grandfather. Downstairs, there is a bright living room opposite the kitchen, and a small garden with olive trees. Upstairs, Omar\'s bedroom is between his parents\' room and the bathroom. Right now, Omar is reading a science book at his tidy desk.'
				],
				glossary: [
					{ term: 'two-storey', meaning: 'having two floors (من طابقين)' },
					{ term: 'tidy', meaning: 'clean and well-organised (مرتّب)' }
				],
				tf: [
					{ q: 'Omar is short and has blue eyes.', a: 'False', c: 'He is tall and slim with brown eyes.', mark: '1' },
					{ q: 'Omar is polite, honest, and helpful.', a: 'True', mark: '1' },
					{ q: 'The living room is opposite the kitchen.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Where is Omar\'s bedroom located?\n2) What is Omar doing right now?',
				whA: '1) It is upstairs, between his parents\' room and the bathroom.\n2) He is reading a science book at his desk.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: neat = ......\nb) An opposite of: rude = ......',
				lexA: 'a) neat = tidy\nb) rude != polite',
				quizQ: 'Where is the garden in Omar\'s house?',
				correctOpt: 'Downstairs, with olive trees.',
				distractors: [
					{ text: 'Upstairs next to the bathroom.', diagnosticFeedback: 'The garden is downstairs.' },
					{ text: 'Inside the kitchen.', diagnosticFeedback: 'The living room is opposite the kitchen, and the garden is outside downstairs.' },
					{ text: 'There is no garden.', diagnosticFeedback: 'Paragraph 2 mentions a small garden with olive trees.' }
				]
			},
			{
				title: 'Asma\'s Family House in Setif',
				source: 'Adapted 2MS Reading Text — My Home & Family',
				paragraphs: [
					'Hello! My name is Asma. I am a 2MS pupil in Setif. I am of medium height and I have got big dark eyes. My teachers say I am [[calm]] and hardworking. I can write neatly and help my younger sister with her homework.',
					'We live in a [[clean]] house with a peaceful courtyard. Downstairs, the dining room is next to the kitchen, and my grandfather\'s room is on the left of the hall. Every afternoon, I revise my lessons in my bedroom, but today I am helping my mother prepare warm chorba for dinner.'
				],
				glossary: [
					{ term: 'hardworking', meaning: 'working with great effort (مجتهدة)' },
					{ term: 'peaceful', meaning: 'quiet and calm (هادئ)' }
				],
				tf: [
					{ q: 'Asma lives in Setif.', a: 'True', mark: '1' },
					{ q: 'The dining room is upstairs.', a: 'False', c: 'The dining room is downstairs next to the kitchen.', mark: '1' },
					{ q: 'Today, Asma is helping her mother prepare chorba.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What does Asma look like?\n2) Where is her grandfather\'s room?',
				whA: '1) She is of medium height and has got big dark eyes.\n2) It is downstairs, on the left of the hall.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: quiet = ......\nb) An opposite of: dirty = ......',
				lexA: 'a) quiet = calm (or peaceful)\nb) dirty != clean',
				quizQ: 'What is Asma doing today instead of revising in her room?',
				correctOpt: 'She is helping her mother prepare warm chorba.',
				distractors: [
					{ text: 'She is visiting Algiers.', diagnosticFeedback: 'She is at home in Setif.' },
					{ text: 'She is sleeping in the courtyard.', diagnosticFeedback: 'Read the last sentence of paragraph 2.' },
					{ text: 'She is playing football.', diagnosticFeedback: 'Football is not mentioned in the passage.' }
				]
			},
			{
				title: 'Karim: A Helpful Classmate in Oran',
				source: 'Adapted 2MS Reading Text — Describing Friends',
				paragraphs: [
					'Karim is my classmate in 2MS in Oran. He is thirteen years old. He is strong and tall, and he wears glasses. Karim is very [[honest]] and generous. He can speak Arabic and English well, and he can swim fast, too.',
					'Every morning, Karim walks to school with his brother Anas. Their flat is on the second floor of a [[modern]] building near the mosque. Inside the flat, Karim\'s desk is near the window, and his school books are always neatly arranged on the shelf.'
				],
				glossary: [
					{ term: 'generous', meaning: 'happy to share with others (كريم)' },
					{ term: 'shelf', meaning: 'wooden board for books (رفّ الكتب)' }
				],
				tf: [
					{ q: 'Karim wears glasses.', a: 'True', mark: '1' },
					{ q: 'Karim cannot swim.', a: 'False', c: 'He can swim fast.', mark: '1' },
					{ q: 'Karim\'s flat is near the mosque.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What languages can Karim speak?\n2) Where are Karim\'s school books?',
				whA: '1) He can speak Arabic and English.\n2) They are neatly arranged on the shelf.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: truthful = ......\nb) An opposite of: old = ......',
				lexA: 'a) truthful = honest\nb) old != modern',
				quizQ: 'Which personality traits describe Karim in paragraph 1?',
				correctOpt: 'Honest and generous.',
				distractors: [
					{ text: 'Rude and messy.', diagnosticFeedback: 'Karim is described with positive manners and neat books.' },
					{ text: 'Lazy and shy.', diagnosticFeedback: 'He walks to school every day and swims fast.' },
					{ text: 'Noisy and angry.', diagnosticFeedback: 'Read paragraph 1: he is honest and generous.' }
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
			instruction: 'Read the text carefully and answer the following questions:',
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
			grade: '2am',
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
				'ميّز بين الوصف الجسدي (tall, eyes) وصفات الشخصية (polite, honest) وموقع الغرف.',
				'صحّح الجمل الخاطئة في سؤال True / False بالرجوع إلى النص.',
				'استخرج المرادفات والأضداد بدقة من الفقرتين.'
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
// Template 2: Part One B — Mastery of Language (07 pts) — Tenses, Adjectives, Silent Letters
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT1Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t1_expl_tenses_adjectives',
	grade: '2am',
	trimesterId: 't1',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة والصوتيات: المضارع البسيط والمستمر والصفات والحروف الصامتة',
	curriculumLessonId: 'eng_lesson_2am_t1_present_simple_vs_continuous',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete the description with (is) or (has got):\n1) My cousin Hamza ...... tall and polite.\n2) He ...... short black hair.\n3) His sister Salma ...... big brown eyes.\n4) She ...... very tidy.',
				task1Ans: '1) is   2) has got   3) has got   4) is',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the Present Simple or Present Continuous:\n1) Every morning, Bilal (pray) ...... Fajr early.\n2) Look! Meriem (help) ...... her mother in the kitchen right now.\n3) Usually, we (eat) ...... dinner at 8:00.',
				task2Ans: '1) prays   2) is helping   3) eat',
				phonWords: 'honest — know — write — listen',
				col1: { header: 'Silent h / k', words: ['honest', 'know'] },
				col2: { header: 'Silent w / t', words: ['write', 'listen'] },
				quizQ: 'Choose the right tense: "Look! The pupils ...... their classroom now."',
				correctOpt: 'are cleaning',
				distractors: [
					{ text: 'clean', diagnosticFeedback: 'Look! and now require Present Continuous.' },
					{ text: 'is cleaning', diagnosticFeedback: 'The pupils is plural and takes are.' },
					{ text: 'cleans', diagnosticFeedback: 'cleans is singular Present Simple.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Match each personality adjective with its opposite:\n1) polite : ......   2) tidy : ......   3) honest : ......   4) calm : ...... (Choices: noisy, rude, messy, dishonest)',
				task1Ans: '1) rude   2) messy   3) dishonest   4) noisy',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the Present Simple or Present Continuous:\n1) At the moment, Omar (write) ...... a letter to his grandfather.\n2) My father always (read) ...... the Quran after Fajr.\n3) Listen! The teacher (explain) ...... the new lesson.',
				task2Ans: '1) is writing   2) reads   3) is explaining',
				phonWords: 'hour — knife — wrong — castle',
				col1: { header: 'Silent h / k', words: ['hour', 'knife'] },
				col2: { header: 'Silent w / t', words: ['wrong', 'castle'] },
				quizQ: 'Which word has a silent letter "k"?',
				correctOpt: 'knife',
				distractors: [
					{ text: 'kitchen', diagnosticFeedback: 'In kitchen, the letter k is pronounced.' },
					{ text: 'kind', diagnosticFeedback: 'In kind, the letter k is pronounced.' },
					{ text: 'desk', diagnosticFeedback: 'In desk, the letter k is pronounced.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Reorder the words to get two correct descriptive sentences:\n1) got / brown / big / has / Amina / eyes / .\n2) helpful / and / is / Karim / honest / .',
				task1Ans: '1) Amina has got big brown eyes.\n2) Karim is helpful and honest.',
				task2Prompt:
					'Task 2 (03 pts): Choose the right verb form:\n1) Every Friday, my family (visits / is visiting) my uncle.\n2) Right now, I (revise / am revising) for my English test.\n3) My brother usually (does / is doing) his homework at 5:00.',
				task2Ans: '1) visits   2) am revising   3) does',
				phonWords: 'what — knee — answer — often',
				col1: { header: 'Silent h / k', words: ['what', 'knee'] },
				col2: { header: 'Silent w / t', words: ['answer', 'often'] },
				quizQ: 'Which word contains a silent "h"?',
				correctOpt: 'honest',
				distractors: [
					{ text: 'house', diagnosticFeedback: 'In house, the h is pronounced.' },
					{ text: 'helpful', diagnosticFeedback: 'In helpful, the h is pronounced.' },
					{ text: 'hall', diagnosticFeedback: 'In hall, the h is pronounced.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: s.col1.header, words: s.col1.words, mark: '1' },
				{ header: s.col2.header, words: s.col2.words, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Do the following grammar and silent-letter tasks:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the words in the table according to their silent letter: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'استعمل is للقامة والأخلاق و has got للشعر والعينين.',
				'ابحث عن المؤشر الزمني: every / usually (مضارع بسيط) مقابل now / Look! (مضارع مستمر).',
				'الحروف الصامتة: k قبل n، و w قبل r، و h في honest/hour/what، و t في listen/castle/often.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`${s.col1.header}: ${s.col1.words.join(', ')} | ${s.col2.header}: ${s.col2.words.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — Prepositions of Place, can & Silent Letters
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT1Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t1_expl_prepositions_can',
	grade: '2am',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): حروف جر المكان و (can / cannot) والحروف الصامتة',
	curriculumLessonId: 'eng_lesson_2am_t1_house_prepositions_place',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with the right preposition of place (next to / between / on / opposite):\n1) My bedroom is ...... my parents\' room and the bathroom.\n2) The living room is ...... the kitchen.\n3) My books are ...... the desk.\n4) The garden is ...... the house.',
				task1Ans: '1) between   2) opposite (or next to)   3) on   4) next to (or opposite)',
				task2Prompt:
					'Task 2 (03 pts): Correct the mistakes in these sentences using (can / cannot):\n1) Youssef cans speak three languages.\n2) My little brother cannot to swim.\n3) Can you helping me with English?',
				task2Ans: '1) Youssef can speak three languages.\n2) My little brother cannot swim.\n3) Can you help me with English?',
				phonWords: 'where — knowledge — wrap — whistle',
				col1: { header: 'Silent h / k', words: ['where', 'knowledge'] },
				col2: { header: 'Silent w / t', words: ['wrap', 'whistle'] },
				quizQ: 'Choose the right preposition: "The bathroom is ...... the two bedrooms."',
				correctOpt: 'between',
				distractors: [
					{ text: 'under', diagnosticFeedback: 'under means below, not in the middle of two rooms.' },
					{ text: 'on', diagnosticFeedback: 'on means on top of a surface.' },
					{ text: 'next', diagnosticFeedback: 'next is incomplete without to, and between fits two rooms.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Classify these words into (Rooms) and (Personality Adjectives): kitchen, polite, bedroom, helpful.\n1) Rooms: ......\n2) Personality Adjectives: ......',
				task1Ans: '1) Rooms: kitchen, bedroom\n2) Personality Adjectives: polite, helpful',
				task2Prompt:
					'Task 2 (03 pts): Ask questions or give short answers with (can):\n1) (you / ride a bike?) : ......\n2) Can Meriem cook traditional bread? (Yes) : ......\n3) Can a 5-year-old drive a car? (No) : ......',
				task2Ans: '1) Can you ride a bike?\n2) Yes, she can.\n3) No, he/she cannot (can\'t).',
				phonWords: 'white — knock — two — mustn\'t',
				col1: { header: 'Silent h / k', words: ['white', 'knock'] },
				col2: { header: 'Silent w / t', words: ['two', 'mustn\'t'] },
				quizQ: 'Which sentence correctly expresses ability with "can"?',
				correctOpt: 'Hafsa can read the Quran beautifully.',
				distractors: [
					{ text: 'Hafsa cans read the Quran beautifully.', diagnosticFeedback: 'Never add -s to can.' },
					{ text: 'Hafsa can to read the Quran beautifully.', diagnosticFeedback: 'Never add to after can.' },
					{ text: 'Hafsa can reading the Quran beautifully.', diagnosticFeedback: 'Use the base verb (read) after can.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Complete the house description with (upstairs / downstairs / under / in):\n1) The kitchen and dining room are ......\n2) Our bedrooms are ...... on the first floor.\n3) My slippers are ...... the bed.\n4) The prayer mat is ...... the living room.',
				task1Ans: '1) downstairs   2) upstairs   3) under   4) in',
				task2Prompt:
					'Task 2 (03 pts): Write 3 sentences using (can) or (cannot):\n1) Amine (swim / yes) : ......\n2) Salma (drive a bus / no) : ......\n3) We (speak Arabic / yes) : ......',
				task2Ans: '1) Amine can swim.\n2) Salma cannot (can\'t) drive a bus.\n3) We can speak Arabic.',
				phonWords: 'honour — know — write — listen',
				col1: { header: 'Silent h / k', words: ['honour', 'know'] },
				col2: { header: 'Silent w / t', words: ['write', 'listen'] },
				quizQ: 'What is the silent letter in the word "listen"?',
				correctOpt: 't',
				distractors: [
					{ text: 'l', diagnosticFeedback: 'The opening l is pronounced.' },
					{ text: 's', diagnosticFeedback: 'The letter s is clearly pronounced.' },
					{ text: 'n', diagnosticFeedback: 'The final n is pronounced.' }
				]
			}
		];

		const s = rng.pick(sets);
		const cleanTask2 = s.task2Prompt;
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: s.col1.header, words: s.col1.words, mark: '1' },
				{ header: s.col2.header, words: s.col2.words, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Answer the following language and phonology activities:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: cleanTask2, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Put each word in the right silent-letter column: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'استعمل between بين مكانين، و next to بجانب، و opposite مقابل بدون to.',
				'بعد can و cannot نضع دائما الفعل المجرد بدون to وبدون -s.',
				'تعرّف على الحرف الصامت في كل كلمة من حروف (h, k, w, t).'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`${s.col1.header}: ${s.col1.words.join(', ')} | ${s.col2.header}: ${s.col2.words.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Part Two — Situation of Integration (06 pts) — Friend / Family House
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t1_written_describe_friend_house',
	grade: '2am',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: وصف صديقي المقرب أو منزل أسرتي (06 نقاط)',
	curriculumLessonId: 'eng_lesson_2am_t1_appearance_personality',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Write a short paragraph describing your best friend at middle school (appearance, personality, and abilities).',
				notes: [
					'Name: Bilal / Age: 12 / Classmate in 2MS',
					'Appearance: tall, slim, short black hair, big brown eyes',
					'Personality: polite, honest, tidy, and helpful',
					'Abilities (can): speak Arabic and English well, swim fast'
				],
				topicTwo: 'Write a short paragraph describing your family house and locating its main rooms using prepositions of place.',
				modelAnswer:
					'My best friend at middle school is Bilal. He is twelve years old and he is my classmate in 2MS. Bilal is tall and slim. He has got short black hair and big brown eyes. He is very polite, honest, tidy, and helpful to everyone in class. Bilal is also clever: he can speak Arabic and English well, and he can swim fast. I am happy to have such a good friend.',
				quizQ: 'Which pair of verbs is used properly when describing a friend?',
				correctOpt: 'He is tall and polite; he has got short black hair.',
				distractors: [
					{ text: 'He has got tall and polite; he is short black hair.', diagnosticFeedback: 'Use is for height/personality and has got for hair/eyes.' },
					{ text: 'He are tall and have got black hair.', diagnosticFeedback: 'He is singular and takes is and has got.' },
					{ text: 'He is hair black and eyes brown.', diagnosticFeedback: 'Use has got + adjective + noun.' }
				]
			},
			{
				prompt: 'Your penfriend wants to know about your home in Algeria. Write a short description of your family house and your bedroom.',
				notes: [
					'House: comfortable, two floors, small garden with trees',
					'Downstairs: living room opposite the kitchen, dining room next to the hall',
					'Upstairs: my bedroom between my parents\' room and the bathroom',
					'Inside bedroom: tidy desk near the window, books on the shelf'
				],
				topicTwo: 'Write a short paragraph describing a respected member of your family (appearance, character, and daily habits).',
				modelAnswer:
					'My family lives in a comfortable two-storey house with a small garden full of olive trees. Downstairs, there is a bright living room opposite the kitchen, and a dining room next to the hall. Upstairs, my bedroom is between my parents\' room and the bathroom. In my bedroom, my tidy desk is near the window and my books are on the shelf. I love my peaceful home very much.',
				quizQ: 'Which sentence correctly locates a room using prepositions of place?',
				correctOpt: 'My bedroom is between the bathroom and my brother\'s room.',
				distractors: [
					{ text: 'My bedroom is between the bathroom.', diagnosticFeedback: 'between requires two places connected by and.' },
					{ text: 'My bedroom is opposite to the hall.', diagnosticFeedback: 'Do not put to after opposite.' },
					{ text: 'My bedroom is next the kitchen.', diagnosticFeedback: 'Always write next to, not next alone.' }
				]
			},
			{
				prompt: 'Write a short email to your friend introducing your elder sister or brother (appearance, character, abilities, and what they are doing now).',
				notes: [
					'Name: Khadija / Age: 14 / 4MS pupil',
					'Appearance: of medium height, dark eyes, warm smile',
					'Personality: calm, hardworking, respectful to parents',
					'Ability & Now: can cook delicious soup; right now she is revising her lessons'
				],
				topicTwo: 'Write a short paragraph comparing your daily study routine with what you are doing right now.',
				modelAnswer:
					'Dear friend,\nI want to tell you about my elder sister Khadija. She is fourteen years old and she is a pupil in 4MS. She is of medium height and has got dark eyes and a warm smile. Khadija is calm, hardworking, and very respectful to our parents. She can cook delicious chorba and help me with English. Right now, she is revising her lessons in her tidy room.\nBest wishes,\nMeriem',
				quizQ: 'Which sentence correctly uses Present Continuous for an action happening right now?',
				correctOpt: 'Right now, she is revising her lessons in her room.',
				distractors: [
					{ text: 'Right now, she revises her lessons in her room.', diagnosticFeedback: 'Right now takes Present Continuous (is revising).' },
					{ text: 'Right now, she revising her lessons.', diagnosticFeedback: 'Do not forget the verb is before revising.' },
					{ text: 'Right now, she are revising her lessons.', diagnosticFeedback: 'she takes is, not are.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance (2 pts) + Logical Organisation (1.5 pts) + Accurate Description, Prepositions & Grammar (1.5 pts) + Spelling & Punctuation (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a coherent paragraph of 6 to 8 sentences:',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
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
				'استعمل is للصفات الجسدية والشخصية و has got للشعر والعينين.',
				'وظّف حروف جر المكان بدقة (downstairs, upstairs, next to, opposite, between).',
				'تأكد من الحروف الكبيرة والنقاط والربط السليم بـ and.'
			],
			solutionStepsAr: [
				'تقديم الشخص أو البيت في جملة تمهيدية واضحة.',
				'وصف الشكل والأخلاق والقدرات أو توزيع الغرف بترتيب منطقي.',
				'ختام الفقرة بجملة شعورية جميلة ومراجعة الأخطاء الإملائية.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T1: EnglishParameterizedTemplate[] = [
	comprehension2amT1,
	exploration2amT1Main,
	exploration2amT1Alt,
	written2amT1
];
