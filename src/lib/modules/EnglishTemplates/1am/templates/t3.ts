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
// Template 1: Part One A — Reading Comprehension (07 pts) — Algeria & Landmarks
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension1amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t3_comp_algeria_world',
	grade: '1am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: وطني الجزائر ومعالمه العريقة (Me, My Country and the World)',
	curriculumLessonId: 'eng_lesson_1am_t3_countries_nationalities',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'My Wonderful Country: Algeria',
				source: 'Adapted 1MS Reading Text — Discovering Algeria',
				paragraphs: [
					'Hello! My name is Karim and I am Algerian. My country is Algeria. It is a [[large]] and peaceful Muslim country in North Africa. Its capital city is Algiers, and our national currency is the Algerian Dinar.',
					'Our flag is green, white, and red with a crescent and a star. In Algiers, there is the [[famous]] Great Mosque of Algiers (Djamaa El Djazair) and the historic Casbah. Our traditional dishes are couscous and chorba. I am proud of my country.'
				],
				glossary: [
					{ term: 'currency', meaning: 'national money (العملة الوطنية)' },
					{ term: 'crescent', meaning: 'moon shape on the flag (الهلال)' }
				],
				tf: [
					{ q: 'Algeria is in North Africa.', a: 'True', mark: '1' },
					{ q: 'The capital city of Algeria is Oran.', a: 'False', c: 'The capital city is Algiers.', mark: '1' },
					{ q: 'The Algerian flag has three colours: green, white, and red.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What is Algeria\'s national currency?\n2) Name two landmarks in Algiers mentioned in the text.',
				whA: '1) It is the Algerian Dinar.\n2) The Great Mosque of Algiers (Djamaa El Djazair) and the historic Casbah.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: big = ......\nb) A synonym of: well-known = ......',
				lexA: 'a) big = large\nb) well-known = famous',
				quizQ: 'What are the traditional Algerian dishes mentioned in the text?',
				correctOpt: 'Couscous and chorba.',
				distractors: [
					{ text: 'Pizza and burgers.', diagnosticFeedback: 'The text mentions traditional Algerian dishes.' },
					{ text: 'Rice and noodles.', diagnosticFeedback: 'Look at the end of paragraph 2.' },
					{ text: 'Fish and chips.', diagnosticFeedback: 'Fish and chips is British, not mentioned here.' }
				]
			},
			{
				title: 'Tlemcen: The Pearl of the West',
				source: 'Adapted 1MS Reading Text — Algerian Cities',
				paragraphs: [
					'Hi! I am Asma. I live in Tlemcen, a [[beautiful]] historic city in the west of Algeria. People in Algeria speak Arabic and Tamazight, and we study English at middle school.',
					'In Tlemcen, there is the Great Mosque of Tlemcen, which is very [[old]] and famous. There are also green mountains, fresh springs, and olive orchards. Visitors love eating Tlemcen couscous, fresh dates, and pure honey.'
				],
				glossary: [
					{ term: 'springs', meaning: 'natural water sources (ينابيع المياه)' },
					{ term: 'orchards', meaning: 'fruit tree gardens (بساتين)' }
				],
				tf: [
					{ q: 'Tlemcen is located in the east of Algeria.', a: 'False', c: 'It is in the west of Algeria.', mark: '1' },
					{ q: 'There is a famous Great Mosque in Tlemcen.', a: 'True', mark: '1' },
					{ q: 'Visitors enjoy couscous, dates, and honey in Tlemcen.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Which languages do people speak in Algeria?\n2) What natural things are there in Tlemcen?',
				whA: '1) People speak Arabic and Tamazight.\n2) There are green mountains, fresh springs, and olive orchards.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: nice = ......\nb) An opposite of: modern = ......',
				lexA: 'a) nice = beautiful\nb) modern != old',
				quizQ: 'Where is Tlemcen situated in Algeria?',
				correctOpt: 'In the west of Algeria.',
				distractors: [
					{ text: 'In the east of Algeria.', diagnosticFeedback: 'Constantine is in the east; Tlemcen is in the west.' },
					{ text: 'In the deep south.', diagnosticFeedback: 'Tlemcen is in the north-west of Algeria.' },
					{ text: 'Outside Algeria.', diagnosticFeedback: 'Tlemcen is a famous Algerian city.' }
				]
			},
			{
				title: 'Constantine: The City of Bridges',
				source: 'Adapted 1MS Reading Text — Algerian Heritage',
				paragraphs: [
					'Good morning! My name is Adam and I am from Constantine in the east of Algeria. Constantine is a [[historic]] city built on a high rock. It is famous for its [[high]] bridges and kind people.',
					'In Constantine, there is the grand Emir Mosque and many clean schools. Imam Abdelhamid Ben Badis was born in Constantine and taught knowledge and Islamic values there. We welcome visitors from all over the world.'
				],
				glossary: [
					{ term: 'rock', meaning: 'large stone cliff (صخرة)' },
					{ term: 'bridges', meaning: 'structures crossing valleys (جسور)' }
				],
				tf: [
					{ q: 'Constantine is in the east of Algeria.', a: 'True', mark: '1' },
					{ q: 'Constantine is famous for its bridges.', a: 'True', mark: '1' },
					{ q: 'Imam Abdelhamid Ben Badis was born in Oran.', a: 'False', c: 'He was born in Constantine.', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Where is Constantine built?\n2) What did Imam Abdelhamid Ben Badis teach in Constantine?',
				whA: '1) It is built on a high rock.\n2) He taught knowledge and Islamic values.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: friendly = ......\nb) An opposite of: low = ......',
				lexA: 'a) friendly = kind\nb) low != high',
				quizQ: 'What is Constantine most famous for?',
				correctOpt: 'Its high bridges and rich history.',
				distractors: [
					{ text: 'Its beaches and ports.', diagnosticFeedback: 'Constantine is an inland city famous for bridges.' },
					{ text: 'Its snow deserts.', diagnosticFeedback: 'Constantine is known as the City of Bridges.' },
					{ text: 'Its subway tunnels.', diagnosticFeedback: 'Read paragraph 1: it is famous for its high bridges.' }
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
			instruction: 'Read the text carefully and do the tasks:',
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
			trimesterId: 't3',
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
				'اقرأ النص جيدا وحدّد المدينة أو المعلم والجهة الجغرافية.',
				'استعن بالمعجم المساعد (Glossary) أسفل النص لفهم الكلمات الجديدة.',
				'في سؤال المفردات استخرج المرادف أو الضد مباشرة من النص.'
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
// Template 2: Part One B — Mastery of Language (07 pts) — Nationalities, There is/are, Phonology
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT3Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t3_expl_nationalities_thereis',
	grade: '1am',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات: البلدان والجنسيات و (There is / There are)',
	curriculumLessonId: 'eng_lesson_1am_t3_there_is_are_algeria',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with the right Country or Nationality:\n1) Algeria : ......\n2) ...... : Palestinian\n3) Turkey : ......\n4) ...... : Chinese',
				task1Ans: '1) Algerian   2) Palestine   3) Turkish   4) China',
				task2Prompt:
					'Task 2 (03 pts): Complete with (There is / There are / Is there):\n1) ...... a grand mosque in Algiers.\n2) ...... 58 wilayas in Algeria.\n3) ...... a museum in your city?',
				task2Ans: '1) There is   2) There are   3) Is there',
				phonWords: 'mosques — cities — bridges — maps',
				sWords: ['mosques', 'maps'],
				zWords: ['cities'],
				izWords: ['bridges'],
				quizQ: 'Choose the right sentence describing Algeria:',
				correctOpt: 'There are high mountains in the north and there is a vast desert in the south.',
				distractors: [
					{ text: 'There is high mountains in the north and there are a vast desert in the south.', diagnosticFeedback: 'Use There are with plural (mountains) and There is with singular (a vast desert).' },
					{ text: 'There are a vast desert in the south.', diagnosticFeedback: 'a vast desert is singular and takes There is.' },
					{ text: 'There am many cities in Algeria.', diagnosticFeedback: 'We never say There am; use There are for plural.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with the right Nationality:\n1) Tunisia : ......\n2) Egypt : ......\n3) Britain : ......\n4) Japan : ......',
				task1Ans: '1) Tunisian   2) Egyptian   3) British   4) Japanese',
				task2Prompt:
					'Task 2 (03 pts): Choose the right option between brackets:\n1) I am from (Algeria / Algerian).\n2) (There is / There are) many palm trees in Ghardaia.\n3) (There is / There are) a historic Casbah in Algiers.',
				task2Ans: '1) Algeria   2) There are   3) There is',
				phonWords: 'parks — mountains — beaches — deserts',
				sWords: ['parks', 'deserts'],
				zWords: ['mountains'],
				izWords: ['beaches'],
				quizQ: 'Complete correctly: "My penfriend is from Turkey. He is ......"',
				correctOpt: 'Turkish',
				distractors: [
					{ text: 'Turkian', diagnosticFeedback: 'The nationality of Turkey ends in -ish: Turkish.' },
					{ text: 'Turkese', diagnosticFeedback: 'Turkey takes -ish, not -ese.' },
					{ text: 'Turkey', diagnosticFeedback: 'Turkey is the country name; we need the nationality.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Complete Algeria\'s fact file:\n1) Capital city: ......\n2) National currency: ......\n3) Famous dish: ......\n4) Continent: ......',
				task1Ans: '1) Algiers   2) Algerian Dinar   3) Couscous (or Chorba)   4) Africa',
				task2Prompt:
					'Task 2 (03 pts): Turn into the negative or interrogative as indicated:\n1) There is an airport in Oran. (Question)\n2) There are beaches in the Sahara. (Negative)\n3) There is a big mosque in Tlemcen. (Question)',
				task2Ans: '1) Is there an airport in Oran?\n2) There are not (aren\'t) beaches in the Sahara.\n3) Is there a big mosque in Tlemcen?',
				phonWords: 'streets — flags — dishes — ports',
				sWords: ['streets', 'ports'],
				zWords: ['flags'],
				izWords: ['dishes'],
				quizQ: 'How is final "-s" pronounced in the word "beaches" and "dishes"?',
				correctOpt: '/iz/',
				distractors: [
					{ text: '/s/', diagnosticFeedback: 'Words ending in ch and sh take /iz/.' },
					{ text: '/z/', diagnosticFeedback: 'ch and sh are sibilant sounds that take /iz/.' },
					{ text: '/t/', diagnosticFeedback: '/t/ is for final -ed, not final -s.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/s/', words: s.sWords, mark: '1' },
				{ header: '/z/', words: s.zWords, mark: '0.5' },
				{ header: '/iz/', words: s.izWords, mark: '0.5' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Do the following language tasks carefully:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the following plural nouns according to final "-s" pronunciation: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
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
				'احرص على كتابة أسماء البلدان والجنسيات بحرف كبير في بدايتها.',
				'انظر للاسم بعد الفراغ: مفرد يأخذ There is، وجمع يأخذ There are.',
				'صنّف النهاية -s حسب الصوت الذي يسبقها مباشرة.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/s/: ${s.sWords.join(', ')} | /z/: ${s.zWords.join(', ')} | /iz/: ${s.izWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — Punctuation & Capitalization
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT3Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t3_expl_punctuation_capitalization',
	grade: '1am',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): علامات الترقيم والحروف الكبيرة ووصف المعالم',
	curriculumLessonId: 'eng_lesson_1am_t3_punctuation_capitalization',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Rewrite the sentence with the right capitalization and punctuation:\n"hello i am yasmine from oran do you know algeria"',
				task1Ans: 'Hello! I am Yasmine from Oran. Do you know Algeria?',
				task2Prompt:
					'Task 2 (03 pts): Spot the mistake in each sentence and correct it:\n1) My country is algerian.\n2) There are a great mosque in Algiers.\n3) We speaks Arabic and English.',
				task2Ans: '1) My country is Algeria.\n2) There is a great mosque in Algiers.\n3) We speak Arabic and English.',
				phonWords: 'wide — place — nice — name',
				aiWords: ['wide', 'nice'],
				eiWords: ['place', 'name'],
				quizQ: 'Choose the sentence with 100% correct capitalization and punctuation:',
				correctOpt: 'My friend Bilal lives in Setif and speaks Arabic.',
				distractors: [
					{ text: 'my friend bilal lives in setif and speaks arabic.', diagnosticFeedback: 'Start of sentence, names, cities, and languages need capital letters.' },
					{ text: 'My friend Bilal lives in Setif and speaks Arabic?', diagnosticFeedback: 'This is a statement, so end it with a full stop (.), not a question mark.' },
					{ text: 'My friend Bilal lives in setif and speaks arabic.', diagnosticFeedback: 'Setif (city) and Arabic (language) must be capitalized.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Supply punctuation and capital letters where necessary:\n"the algerian flag is green white and red what is your flag like"',
				task1Ans: 'The Algerian flag is green, white, and red. What is your flag like?',
				task2Prompt:
					'Task 2 (03 pts): Reorder the words to build three meaningful sentences:\n1) capital / Algiers / of / is / the / Algeria / .\n2) our / Dinar / currency / is / the / Algerian / .\n3) love / I / country / my / .',
				task2Ans: '1) Algiers is the capital of Algeria.\n2) Our currency is the Algerian Dinar.\n3) I love my country.',
				phonWords: 'high — famous — white — stay',
				aiWords: ['high', 'white'],
				eiWords: ['famous', 'stay'],
				quizQ: 'Which punctuation mark ends the sentence: "Where is M-Zab Valley......"',
				correctOpt: 'Question mark (?)',
				distractors: [
					{ text: 'Full stop (.)', diagnosticFeedback: 'A sentence starting with Where is a question.' },
					{ text: 'Comma (,)', diagnosticFeedback: 'A comma cannot end a question.' },
					{ text: 'Colon (:)', diagnosticFeedback: 'A question always ends with a question mark.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Rewrite with correct capital letters and punctuation:\n"on friday i visit the great mosque of tlemcen with my father"',
				task1Ans: 'On Friday, I visit the Great Mosque of Tlemcen with my father.',
				task2Prompt:
					'Task 2 (03 pts): Complete the dialogue with (Where / What / Is):\nA: ...... are you from?\nB: I am from Ghardaia, Algeria.\nA: ...... there a famous valley there?\nB: Yes! ...... is its name? It is M-Zab Valley.',
				task2Ans: 'Where / Is / What',
				phonWords: 'time — day — nine — lake',
				aiWords: ['time', 'nine'],
				eiWords: ['day', 'lake'],
				quizQ: 'Which word must ALWAYS start with a capital letter even in the middle of a sentence?',
				correctOpt: 'Arabic',
				distractors: [
					{ text: 'mountain', diagnosticFeedback: 'mountain is a common noun, not capitalized in the middle of a sentence.' },
					{ text: 'mosque', diagnosticFeedback: 'mosque alone is a common noun unless part of a proper name.' },
					{ text: 'city', diagnosticFeedback: 'city is a common noun.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/ai/ (nine)', words: s.aiWords, mark: '1' },
				{ header: '/ei/ (day)', words: s.eiWords, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Answer all language and pronunciation exercises:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the following words in the table (/ai/ vs /ei/): (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
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
				'كبّر الحرف الأول في: بداية الجملة، والضمير I، وأسماء الأشخاص والمدن والبلدان واللغات والأيام.',
				'ضع نقطة في نهاية الجملة الخبرية وعلامة استفهام في نهاية السؤال.',
				'راجع التوافق بين الفاعل والفعل (There is للمفرد و There are للجمع).'
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
// Template 4: Part Two — Situation of Integration (06 pts) — Email About Algeria
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t3_written_email_algeria',
	grade: '1am',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: كتابة بريد موجه للتعريف ببلدي الجزائر (06 نقاط)',
	curriculumLessonId: 'eng_lesson_1am_t3_guided_email_country',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Your penfriend from Malaysia wants to discover your country. Write a short email to introduce Algeria using the fact file below.',
				notes: [
					'Country: Algeria (North Africa) / Capital: Algiers',
					'National flag: green, white, and red / Currency: Algerian Dinar',
					'Languages: Arabic and Tamazight',
					'Famous landmarks: The Great Mosque of Algiers (Djamaa El Djazair) and the Casbah',
					'Traditional dish: Couscous and chorba'
				],
				topicTwo: 'Write a short paragraph describing your own hometown in Algeria (location, landmarks, and people).',
				modelAnswer:
					'Dear friend,\nI am happy to tell you about my wonderful country, Algeria. It is a large Muslim country in North Africa. Our capital city is Algiers, and our national currency is the Algerian Dinar. Our flag is green, white, and red. People speak Arabic and Tamazight. In Algiers, there is the Great Mosque of Algiers and the historic Casbah. Our famous traditional dishes are couscous and chorba. I love my country very much!\nBest wishes,\nAmine',
				quizQ: 'Which sentence best uses "There is" to describe an Algerian landmark?',
				correctOpt: 'In Algiers, there is the historic Casbah and the Great Mosque.',
				distractors: [
					{ text: 'In Algiers, there are a historic Casbah.', diagnosticFeedback: 'a historic Casbah is singular and takes There is.' },
					{ text: 'In Algiers, historic Casbah.', diagnosticFeedback: 'Every sentence needs a subject and verb.' },
					{ text: 'In algiers there is the casbah', diagnosticFeedback: 'Missing capital letters (Algiers, Casbah) and full stop.' }
				]
			},
			{
				prompt: 'Write a short paragraph for your school English club magazine presenting Tlemcen and Algeria.',
				notes: [
					'Your identity: 1MS pupil, Algerian',
					'City: Tlemcen (west of Algeria)',
					'Landmarks: The Great Mosque of Tlemcen, green mountains',
					'Food: Couscous, olives, dates, and honey',
					'Feeling: proud of Algeria'
				],
				topicTwo: 'Write a short email inviting a Muslim penfriend to visit Algeria and discover its hospitality.',
				modelAnswer:
					'Hello! I am a 1MS pupil from Algeria. I live in Tlemcen, a historic city in the west of my country. Algeria is in North Africa, and its capital is Algiers. In Tlemcen, there is the Great Mosque of Tlemcen and there are green mountains and olive trees. Our traditional food includes couscous, olives, dates, and honey. I am very proud of my country Algeria.',
				quizQ: 'Which fact about Algeria is accurate?',
				correctOpt: 'Its capital is Algiers and its currency is the Algerian Dinar.',
				distractors: [
					{ text: 'Its capital is Constantine and its currency is the Euro.', diagnosticFeedback: 'Algiers is the capital and the Algerian Dinar is the currency.' },
					{ text: 'It is located in South America.', diagnosticFeedback: 'Algeria is located in North Africa.' },
					{ text: 'Its flag is blue and yellow.', diagnosticFeedback: 'The Algerian flag is green, white, and red.' }
				]
			},
			{
				prompt: 'Write a guided email to your new penfriend from Turkey describing your country Algeria and your city Constantine.',
				notes: [
					'Greeting: Dear Yusuf,',
					'Country: Algeria / Currency: Algerian Dinar / Flag: green, white, red',
					'City: Constantine (east of Algeria)',
					'Landmarks: The famous bridges of Constantine',
					'Closing: Best wishes + your name'
				],
				topicTwo: 'Write a short fact file and 5 full sentences about Algeria for visitors.',
				modelAnswer:
					'Dear Yusuf,\nHello! My name is Bilal and I am Algerian. I live in Constantine, a historic city in the east of Algeria. Our capital city is Algiers and our currency is the Algerian Dinar. Our national flag is green, white, and red. In Constantine, there are famous high bridges and beautiful mosques. Our favourite dish is couscous. Please visit Algeria soon!\nBest wishes,\nBilal',
				quizQ: 'What are the four main stages of a guided email about your country?',
				correctOpt: 'Greeting, Self-Introduction, Country Facts, and Closing with Name.',
				distractors: [
					{ text: 'Closing, Only Numbers, No Verbs, Greeting.', diagnosticFeedback: 'Start with a greeting and write complete sentences.' },
					{ text: 'A shopping list with prices.', diagnosticFeedback: 'That belongs to shopping, not describing your country.' },
					{ text: 'Copying notes without verbs or punctuation.', diagnosticFeedback: 'Always turn notes into full, punctuated sentences.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance & Fact Coverage (2 pts) + Email/Paragraph Format (1.5 pts) + Grammar & There is/are (1.5 pts) + Capitalization & Punctuation (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a clean email or paragraph of 6 to 8 sentences:',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
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
				'ابدأ البريد بتحية (Dear friend,) وقدّم نفسك بإيجاز.',
				'حوّل كل ملاحظة من البطاقة إلى جملة كاملة بفاعل وفعل (is / are / there is / there are).',
				'اختم بعبارة اعتزاز بالوطن وتوقيع الاسم (Best wishes, ...).'
			],
			solutionStepsAr: [
				'التحية والتعريف بالنفس والبلد (Algeria, North Africa).',
				'ذكر العاصمة والعملة والعلم واللغات والمعالم والأطباق التقليدية.',
				'خاتمة ودودة وتوقيع الاسم مع مراجعة الحروف الكبيرة والنقاط.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T3: EnglishParameterizedTemplate[] = [
	comprehension1amT3,
	exploration1amT3Main,
	exploration1amT3Alt,
	written1amT3
];
