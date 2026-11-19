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
// 1. Comprehension (4 pts) — My School Bag, Classroom & My Home
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension3apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t2_comprehension',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: مدرستي وأدواتي وبيتي',
	curriculumLessonId: 'eng_lesson_3ap_t2_school_objects',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				pupil: 'Bilal',
				bagColor: 'blue',
				objects: 'a green book, a red pen and a yellow ruler',
				day: 'Sunday',
				roomMum: 'kitchen',
				roomDad: 'living room',
				paragraphs: [
					'Hello! I am [[Bilal]]. On Sunday morning, I go to my clean school. I have a blue bag. In my bag, there is a green book, a red pen and a yellow ruler.',
					'My house is big. Mother is in the [[kitchen]] and father is in the living room. I love my school and my home.'
				],
				q1: 'What colour is Bilal school bag?',
				a1: 'It is blue.',
				tf1Q: 'Bilal goes to school on Sunday.',
				tf1A: 'True',
				tf2Q: 'Mother is in the garden.',
				tf2A: 'False',
				tf2C: 'Mother is in the kitchen.',
				mcqQ: 'Where is Bilal mother in the text?',
				mcqCorrect: 'In the kitchen',
				mcqDistractors: [
					{ text: 'In the bedroom', diagnosticFeedback: 'The text says Mother is in the kitchen.' },
					{ text: 'In the garden', diagnosticFeedback: 'The garden is not mentioned.' },
					{ text: 'In the classroom', diagnosticFeedback: 'Mother is at home in the kitchen.' }
				]
			},
			{
				pupil: 'Aya',
				bagColor: 'green',
				objects: 'a white notebook, a blue pencil and an eraser',
				day: 'Monday',
				roomMum: 'living room',
				roomDad: 'garden',
				paragraphs: [
					'Good morning! I am [[Aya]]. On Monday, I sit at my clean desk in the classroom. My school bag is green. Inside it, I have a white notebook, a blue pencil and an eraser.',
					'At home, my father is in the [[garden]] and my mother is in the living room. My bedroom is tidy.'
				],
				q1: 'What colour is Aya school bag?',
				a1: 'It is green.',
				tf1Q: 'Aya sits at her desk in the classroom.',
				tf1A: 'True',
				tf2Q: 'Father is in the kitchen.',
				tf2A: 'False',
				tf2C: 'Father is in the garden.',
				mcqQ: 'Where is Aya father in the text?',
				mcqCorrect: 'In the garden',
				mcqDistractors: [
					{ text: 'In the kitchen', diagnosticFeedback: 'Read paragraph two: father is in the garden.' },
					{ text: 'In the bedroom', diagnosticFeedback: 'The text mentions the garden for father.' },
					{ text: 'In the bathroom', diagnosticFeedback: 'The bathroom is not mentioned.' }
				]
			},
			{
				pupil: 'Adam',
				bagColor: 'red',
				objects: 'two books, a black pen and a ruler',
				day: 'Tuesday',
				roomMum: 'kitchen',
				roomDad: 'bedroom',
				paragraphs: [
					'Hi! I am [[Adam]]. On Tuesday, I have English in my classroom. The teacher writes on the board. My bag is red and it has two books, a black pen and a ruler.',
					'In my house, there is a big kitchen, a living room and two bedrooms. Mother is in the [[kitchen]] preparing healthy bread.'
				],
				q1: 'What colour is Adam school bag?',
				a1: 'It is red.',
				tf1Q: 'The teacher writes on the board.',
				tf1A: 'True',
				tf2Q: 'Adam school bag is yellow.',
				tf2A: 'False',
				tf2C: 'Adam school bag is red.',
				mcqQ: 'What does Adam have in his red bag?',
				mcqCorrect: 'Two books, a black pen and a ruler',
				mcqDistractors: [
					{ text: 'A desk and a board', diagnosticFeedback: 'Desks and boards are in the classroom, not in a bag.' },
					{ text: 'A green chair', diagnosticFeedback: 'A chair is not in his school bag.' },
					{ text: 'A garden and a door', diagnosticFeedback: 'Read sentence four of paragraph one.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqDistractors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the text and answer:\n"${plainText}"\nQuestion: ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص وأجب عن سؤال الفهم:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة موجودة مباشرة في النص: ${sc.mcqCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully and answer the questions:',
			content: [
				buildEnglishPassageBlock({
					title: 'My School and My Home',
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				{
					type: 'text',
					content: `1) ${sc.q1}`,
					answer: sc.a1,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) Where is mother in the text?`,
					answer: `She is in the ${sc.roomMum}.`,
					mark: '1'
				},
				{
					type: 'true_false',
					items: [
						{ q: `3) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `4) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابحث في النص عن لون المحفظة قبل كلمة bag.',
				'استخرج اسم الغرفة التي توجد فيها الأم بعد عبارة in the.',
				'تأكّد من كل جملة في سؤال True/False بمقارنتها بالنص.'
			],
			solutionStepsAr: [
				`لون المحفظة: ${sc.a1}`,
				`مكان الأم: She is in the ${sc.roomMum}.`,
				`صحيح أو خطأ: (1) ${sc.tf1A} — (2) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Pronouns (I/He/She/It) + am/is + a/an
// ═══════════════════════════════════════════════════════════════════════════════
const pronounsBe3apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t2_pronouns_be',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'قواعد: الضمائر وفعل الكينونة وأدوات النكرة (a / an)',
	curriculumLessonId: 'eng_lesson_3ap_t2_pronouns_to_be',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				s1: 'I ...... a pupil.',
				a1: 'am',
				s2: 'She ...... my teacher.',
				a2: 'is',
				repQSafe: 'Karim is my brother. : ...... is my brother.',
				repA: 'He',
				art1: '...... eraser',
				art1A: 'an eraser',
				art2: '...... ruler',
				art2A: 'a ruler',
				mcqPrompt: 'Choose the correct form: "He ...... in the classroom."',
				mcqCorrect: 'is',
				mcqDistractors: [
					{ text: 'am', diagnosticFeedback: 'am is only used with I.' },
					{ text: 'an', diagnosticFeedback: 'an is an article, not a verb.' },
					{ text: 'a', diagnosticFeedback: 'a is an article, not a verb.' }
				]
			},
			{
				s1: 'It ...... a green desk.',
				a1: 'is',
				s2: 'I ...... 8 years old.',
				a2: 'am',
				repQSafe: 'Meriem is my sister. : ...... is my sister.',
				repA: 'She',
				art1: '...... book',
				art1A: 'a book',
				art2: '...... apple',
				art2A: 'an apple',
				mcqPrompt: 'Choose the right pronoun for "The pen": "...... is blue."',
				mcqCorrect: 'It',
				mcqDistractors: [
					{ text: 'He', diagnosticFeedback: 'He is for a boy or a man.' },
					{ text: 'She', diagnosticFeedback: 'She is for a girl or a woman.' },
					{ text: 'I', diagnosticFeedback: 'I means أنا (myself).' }
				]
			},
			{
				s1: 'He ...... my father.',
				a1: 'is',
				s2: 'I ...... in my bedroom.',
				a2: 'am',
				repQSafe: 'The board is white. : ...... is white.',
				repA: 'It',
				art1: '...... orange bag',
				art1A: 'an orange bag',
				art2: '...... pen',
				art2A: 'a pen',
				mcqPrompt: 'Choose the right article: "It is ...... eraser."',
				mcqCorrect: 'an',
				mcqDistractors: [
					{ text: 'a', diagnosticFeedback: 'eraser starts with the vowel e, so use an.' },
					{ text: 'am', diagnosticFeedback: 'am is a verb used with I.' },
					{ text: 'is', diagnosticFeedback: 'is is already in the sentence.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر القاعدة الصحيحة (الضمائر و am/is و a/an):',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}». تذكّر: I am / He is / She is / It is، ونضع an قبل الحروف المتحركة.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Pronouns, To Be and a/an)',
			points: 3,
			instruction: 'Complete the three grammar activities:',
			content: [
				{
					type: 'text',
					content: `Task 1: Fill in the blanks with (am / is):\n1) ${s.s1}\n2) ${s.s2}`,
					answer: `1) ${s.a1}  |  2) ${s.a2}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Replace the underlined subject with (He / She / It):\n${s.repQSafe}`,
					answer: s.repA,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Complete with (a / an):  ${s.art1}   |   ${s.art2}`,
					answer: `${s.art1A}   |   ${s.art2A}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الضمير I يأخذ am دائماً، أما He و She و It فتأخذ is.',
				'استعمل He للمذكر، She للمؤنث، و It للأشياء المفردة.',
				'استعمل an قبل الكلمة التي تبدأ بحرف متحرك (a, e, i, o, u).'
			],
			solutionStepsAr: [
				`إكمال فعل الكينونة: (1) ${s.a1} — (2) ${s.a2}.`,
				`الضمير المناسب: ${s.repA}.`,
				`أدوات النكرة: ${s.art1A} — ${s.art2A}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Days of the Week & Rooms of the House
// ═══════════════════════════════════════════════════════════════════════════════
const daysHome3apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t2_days_home',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'vocabulary_morphology',
	titleAr: 'رصيد لغوي: أيام الأسبوع وغرف المنزل والسؤال بـ Where',
	curriculumLessonId: 'eng_lesson_3ap_t2_days_of_week',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				daySeq: 'Sunday - ............ - Tuesday - ............',
				dayAns: 'Monday - Wednesday',
				classWords: ['pen', 'kitchen', 'desk', 'bedroom'],
				schoolList: 'pen , desk',
				homeList: 'kitchen , bedroom',
				whereQ: '...... is mother? She is in the kitchen.',
				whereA: 'Where',
				mcqPrompt: 'Which day comes after Sunday?',
				mcqCorrect: 'Monday',
				mcqDistractors: [
					{ text: 'Friday', diagnosticFeedback: 'Friday comes after Thursday.' },
					{ text: 'Saturday', diagnosticFeedback: 'Saturday comes before Sunday.' },
					{ text: 'Wednesday', diagnosticFeedback: 'Wednesday comes after Tuesday.' }
				]
			},
			{
				daySeq: 'Wednesday - ............ - Friday - ............',
				dayAns: 'Thursday - Saturday',
				classWords: ['board', 'garden', 'ruler', 'living room'],
				schoolList: 'board , ruler',
				homeList: 'garden , living room',
				whereQ: '...... is father? He is in the garden.',
				whereA: 'Where',
				mcqPrompt: 'Where do we sleep at night?',
				mcqCorrect: 'In the bedroom',
				mcqDistractors: [
					{ text: 'In the kitchen', diagnosticFeedback: 'We prepare food in the kitchen.' },
					{ text: 'On the board', diagnosticFeedback: 'A board is in the classroom.' },
					{ text: 'In the bag', diagnosticFeedback: 'School tools go in the bag.' }
				]
			},
			{
				daySeq: 'Monday - ............ - Wednesday - ............',
				dayAns: 'Tuesday - Thursday',
				classWords: ['book', 'bathroom', 'chair', 'kitchen'],
				schoolList: 'book , chair',
				homeList: 'bathroom , kitchen',
				whereQ: '...... is Sara? She is in the living room.',
				whereA: 'Where',
				mcqPrompt: 'Which days are the weekend in Algeria?',
				mcqCorrect: 'Friday and Saturday',
				mcqDistractors: [
					{ text: 'Sunday and Monday', diagnosticFeedback: 'We go to school on Sunday and Monday.' },
					{ text: 'Tuesday and Wednesday', diagnosticFeedback: 'These are school days.' },
					{ text: 'Monday and Thursday', diagnosticFeedback: 'Both are school days in Algeria.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول أيام الأسبوع والمنزل:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Days and Home)',
			points: 3,
			instruction: 'Do the following tasks:',
			content: [
				{
					type: 'text',
					content: `Task 1: Complete the missing days of the week:\n${s.daySeq}`,
					answer: s.dayAns,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Classify the words in the table: ( ${s.classWords.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['My School', 'My Home'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.schoolList, mark: '0.5' },
							{ content: '....................', answer: s.homeList, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 3: Complete the question with (Who / Where): "${s.whereQ}"`,
					answer: s.whereA,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'رتّب أيام الأسبوع من الأحد (Sunday) إلى السبت (Saturday) ولا تنسَ الحرف الكبير.',
				'ميّز بين أدوات القسم (pen, book, desk, board) وغرف المنزل (kitchen, bedroom, garden).',
				'للسؤال عن المكان نستعمل Where.'
			],
			solutionStepsAr: [
				`الأيام الناقصة: ${s.dayAns}.`,
				`التصنيف: My School (${s.schoolList}) — My Home (${s.homeList}).`,
				`أداة السؤال عن المكان: ${s.whereA}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — Describing My School Bag or My Home
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression3apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t2_written_expression',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: وصف محفظتي أو بيتي بجمل بسيطة',
	curriculumLessonId: 'eng_lesson_3ap_t2_my_home_rooms',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				prompt: 'Write 3 or 4 simple sentences about your school bag and classroom.',
				notes: [
					'Name: Amine / pupil',
					'Bag colour: blue bag',
					'Inside the bag: a book, a pen, a ruler',
					'Classroom: clean desk and white board'
				],
				model: 'Hello! I am Amine. I am a pupil. My school bag is blue. In my bag, I have a book, a pen and a ruler.',
				mcqQ: 'Which sentence correctly describes a school bag?',
				mcqCorrect: 'My school bag is blue and clean.',
				mcqDistractors: [
					{ text: 'My school bag is kitchen.', diagnosticFeedback: 'kitchen is a room, not a description of a bag.' },
					{ text: 'Blue am bag school my.', diagnosticFeedback: 'The word order is incorrect.' },
					{ text: 'My bag is Sunday.', diagnosticFeedback: 'Sunday is a day of the week.' }
				]
			},
			{
				prompt: 'Write 3 or 4 simple sentences describing your home and where your parents are.',
				notes: [
					'House: big and clean',
					'Rooms: kitchen, living room, two bedrooms, garden',
					'Mother: in the kitchen',
					'Father: in the garden'
				],
				model: 'My house is big and clean. It has a kitchen, a living room and two bedrooms. Mother is in the kitchen and father is in the garden.',
				mcqQ: 'Which sentence correctly tells where mother is?',
				mcqCorrect: 'Mother is in the kitchen.',
				mcqDistractors: [
					{ text: 'Mother am in kitchen.', diagnosticFeedback: 'Use is with Mother, not am.' },
					{ text: 'Kitchen is in mother.', diagnosticFeedback: 'Subject and place are reversed.' },
					{ text: 'Mother is a ruler.', diagnosticFeedback: 'A ruler is a school object.' }
				]
			},
			{
				prompt: 'Write 3 or 4 short sentences about your school week and your classroom.',
				notes: [
					'School days: Sunday to Thursday',
					'Weekend: Friday and Saturday',
					'Classroom: clean and tidy',
					'Teacher: writes on the board'
				],
				model: 'I go to school from Sunday to Thursday. Friday and Saturday are the weekend. My classroom is clean. My teacher writes on the board.',
				mcqQ: 'Which sentence is written with correct capital letters?',
				mcqCorrect: 'I go to school on Sunday.',
				mcqDistractors: [
					{ text: 'i go to school on sunday.', diagnosticFeedback: 'Both I and Sunday need capital letters.' },
					{ text: 'I go to school on sunday.', diagnosticFeedback: 'Days of the week always start with a capital letter.' },
					{ text: 'i Go to school on Sunday.', diagnosticFeedback: 'The pronoun I must be capital and go is small.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة للتعبير الكتابي:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجملة الصحيحة هي: «${pr.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Three: Written Expression',
			points: 3,
			content: [
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt: pr.prompt,
					topicOneNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary: 'Using the notes (1 pt), correct am/is and vocabulary (1 pt), neat writing with capitals and full stops (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'وظّف المعطيات المذكورة في البطاقة جملة بجملة.',
				'احترم قاعدة: I am / He is / She is / It is.',
				'ابدأ كل جملة بحرف كبير وانهِها بنقطة.'
			],
			solutionStepsAr: [
				'قراءة الملاحظات المعطاة بعناية.',
				'صياغة 3 إلى 4 جمل إنجليزية بسيطة وسليمة.',
				`نموذج مقترح: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T2: EnglishParameterizedTemplate[] = [
	comprehension3apT2,
	pronounsBe3apT2,
	daysHome3apT2,
	writtenExpression3apT2
];
