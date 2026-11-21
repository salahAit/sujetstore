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
import {
	buildIllustratedFigureBlock,
	getIllustrationJpgUrl
} from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Comprehension (4 pts) — Greetings, Introducing Oneself & My Family
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension3apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t1_comprehension',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: التحية والتعريف بالنفس والعائلة',
	curriculumLessonId: 'eng_lesson_3ap_t1_greetings_intro',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				name: 'Amine',
				ageWord: 'eight',
				ageNum: '8',
				city: 'Algiers',
				father: 'Karim',
				mother: 'Amina',
				siblingRole: 'sister',
				siblingName: 'Sara',
				favColor: 'green',
				paragraphs: [
					'Hello! My name is [[Amine]]. I am eight years old. I am a pupil in primary school in Algiers.',
					'This is my family. My [[father]] is Karim and my mother is Amina. Sara is my little sister. I love my family and my green school bag.'
				],
				tf1Q: 'Amine is eight years old.',
				tf1A: 'True',
				tf2Q: 'Sara is his mother.',
				tf2A: 'False',
				tf2C: 'Sara is his sister.',
				wrongNames: [
					{ text: 'Youssef', diagnosticFeedback: 'The text clearly says: My name is Amine.' },
					{ text: 'Bilal', diagnosticFeedback: 'Bilal is not mentioned in the text.' },
					{ text: 'Omar', diagnosticFeedback: 'Read sentence one carefully to find the name.' }
				]
			},
			{
				name: 'Meriem',
				ageWord: 'eight',
				ageNum: '8',
				city: 'Oran',
				father: 'Rachid',
				mother: 'Fatima',
				siblingRole: 'brother',
				siblingName: 'Adam',
				favColor: 'blue',
				paragraphs: [
					'Good morning! My name is [[Meriem]]. I am eight years old. I live in Oran with my loving family.',
					'My father is Rachid and my [[mother]] is Fatima. Adam is my brother. My favourite colour is blue.'
				],
				tf1Q: 'Meriem lives in Oran.',
				tf1A: 'True',
				tf2Q: 'Adam is her father.',
				tf2A: 'False',
				tf2C: 'Adam is her brother.',
				wrongNames: [
					{ text: 'Sara', diagnosticFeedback: 'The pupil in the passage is Meriem.' },
					{ text: 'Ines', diagnosticFeedback: 'Ines is not the name in the text.' },
					{ text: 'Khadidja', diagnosticFeedback: 'Read the greeting sentence again.' }
				]
			},
			{
				name: 'Youssef',
				ageWord: 'nine',
				ageNum: '9',
				city: 'Constantine',
				father: 'Ahmed',
				mother: 'Nadia',
				siblingRole: 'sister',
				siblingName: 'Aya',
				favColor: 'red',
				paragraphs: [
					'Hi! My name is [[Youssef]]. I am nine years old. I am a polite pupil in Constantine.',
					'This is my family: my father Ahmed, my mother Nadia and my [[sister]] Aya. I have a red book and a white ruler.'
				],
				tf1Q: 'Youssef is nine years old.',
				tf1A: 'True',
				tf2Q: 'Nadia is his sister.',
				tf2A: 'False',
				tf2C: 'Nadia is his mother.',
				wrongNames: [
					{ text: 'Karim', diagnosticFeedback: 'Look at the first sentence: My name is Youssef.' },
					{ text: 'Anes', diagnosticFeedback: 'Anes is not in this passage.' },
					{ text: 'Samir', diagnosticFeedback: 'Check the name right after My name is.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.name, sc.wrongNames, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the short text and choose the pupil name:\n"${plainText}"\nQuestion: What is the pupil's name?`,
			questionTextAr: 'اقرأ النص القصير واختر اسم التلميذ الصحيح:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `في الجملة الأولى من النص نقرأ: My name is ${sc.name}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully, then do the activities:',
			content: [
				buildEnglishPassageBlock({
					title: 'Me and My Family',
					paragraphs: sc.paragraphs,
					numberedParagraphs: false
				}),
				buildIllustratedFigureBlock('pri_ara_01_school_bag_supplies', {
					lang: 'en',
					title: 'My School Things (Bag, Book, Pen and Ruler)',
					customLegend: [
						{ num: '1', label: 'A clean school bag, books and copybooks' },
						{ num: '2', label: 'A pencil case, pens, pencils and a white ruler' }
					],
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'table',
					headers: ['Name', 'Age', 'City', 'Father'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.name, mark: '0.5' },
							{ content: '............', answer: `${sc.ageNum} (${sc.ageWord})`, mark: '0.5' },
							{ content: '............', answer: sc.city, mark: '0.5' },
							{ content: '............', answer: sc.father, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'true_false',
					items: [
						{ q: `1) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `2) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص مرتين واستخرج الاسم بعد عبارة My name is.',
				'ابحث عن العمر قبل عبارة years old والمدينة بعد كلمة in.',
				'قارن كل جملة في سؤال True/False مع النص حرفياً.'
			],
			solutionStepsAr: [
				`ملء الجدول من النص: Name = ${sc.name}، Age = ${sc.ageNum}، City = ${sc.city}، Father = ${sc.father}.`,
				`الجملة الأولى (${sc.tf1Q}): ${sc.tf1A}.`,
				`الجملة الثانية (${sc.tf2Q}): ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.name
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Vowels, Numbers (0-10) & Colors
// ═══════════════════════════════════════════════════════════════════════════════
const vocabPhonics3apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t1_vocab_phonics',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'phonics_alphabet',
	titleAr: 'قواعد وصوتيات: الحروف المتحركة والأرقام والألوان',
	curriculumLessonId: 'eng_lesson_3ap_t1_alphabet_phonics',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				letters: ['a', 'b', 'e', 'm', 'o', 't'],
				vowels: 'a , e , o',
				consonants: 'b , m , t',
				numPairs: [
					{ digit: '3', word: 'three' },
					{ digit: '8', word: 'eight' }
				],
				capSentence: 'hello, i am amine.',
				capAnswer: 'Hello, I am Amine.',
				mcqPrompt: 'Which letter is a VOWEL (حرف متحرك)?',
				mcqCorrect: 'e',
				mcqDistractors: [
					{ text: 'b', diagnosticFeedback: 'b is a consonant, not a vowel.' },
					{ text: 'm', diagnosticFeedback: 'm is a consonant. The 5 vowels are a, e, i, o, u.' },
					{ text: 't', diagnosticFeedback: 't is a consonant.' }
				]
			},
			{
				letters: ['i', 'p', 'u', 'd', 'a', 's'],
				vowels: 'i , u , a',
				consonants: 'p , d , s',
				numPairs: [
					{ digit: '5', word: 'five' },
					{ digit: '10', word: 'ten' }
				],
				capSentence: 'good morning, sara.',
				capAnswer: 'Good morning, Sara.',
				mcqPrompt: 'How do we write the number 10 in English letters?',
				mcqCorrect: 'ten',
				mcqDistractors: [
					{ text: 'two', diagnosticFeedback: 'two is the number 2.' },
					{ text: 'six', diagnosticFeedback: 'six is the number 6.' },
					{ text: 'nine', diagnosticFeedback: 'nine is the number 9.' }
				]
			},
			{
				letters: ['o', 'n', 'e', 'r', 'u', 'k'],
				vowels: 'o , e , u',
				consonants: 'n , r , k',
				numPairs: [
					{ digit: '4', word: 'four' },
					{ digit: '7', word: 'seven' }
				],
				capSentence: 'hi! i am youssef.',
				capAnswer: 'Hi! I am Youssef.',
				mcqPrompt: 'Which word is a COLOR (لون)?',
				mcqCorrect: 'green',
				mcqDistractors: [
					{ text: 'seven', diagnosticFeedback: 'seven is a number (7).' },
					{ text: 'father', diagnosticFeedback: 'father is a family member.' },
					{ text: 'hello', diagnosticFeedback: 'hello is a greeting.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة في الصوتيات والأرقام والألوان:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}». تذكّر أن الحروف المتحركة هي (a, e, i, o, u).`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Alphabet, Numbers and Capitals)',
			points: 3,
			instruction: 'Do the following tasks carefully:',
			content: [
				{
					type: 'text',
					content: `Task 1: Classify the letters in the table: ( ${s.letters.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['Vowels (a, e, i, o, u)', 'Consonants'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.vowels, mark: '0.5' },
							{ content: '....................', answer: s.consonants, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `Task 2: Write the numbers in English letters: ${s.numPairs[0].digit} = ............  |  ${s.numPairs[1].digit} = ............`,
					answer: `${s.numPairs[0].digit} = ${s.numPairs[0].word}  |  ${s.numPairs[1].digit} = ${s.numPairs[1].word}`,
					mark: '0.5'
				},
				{
					type: 'text',
					content:
						'Task 3: Look at the pictures and write the word under each picture: ( a bag - a bus - a cake )'
				},
				{
					type: 'image_grid',
					columns: 3,
					items: [
						{
							src: getIllustrationJpgUrl('pri_ara_01_school_bag_supplies'),
							label: '........................',
							answer: 'a bag',
							mark: '0.5'
						},
						{
							src: getIllustrationJpgUrl('pri_lang_01_red_bus_train'),
							label: '........................',
							answer: 'a bus',
							mark: '0.5'
						},
						{
							src: getIllustrationJpgUrl('pri_lang_08_birthday_cake_party'),
							label: '........................',
							answer: 'a cake',
							mark: '0.5'
						}
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الحروف المتحركة في الإنجليزية خمسة فقط: a, e, i, o, u.',
				'راجع كتابة الأرقام من 0 إلى 10 بالحروف: three, four, five, seven, eight, ten.',
				'نستعمل الحرف الكبير في بداية الجملة، ومع الضمير I، وفي أول أسماء الأشخاص.'
			],
			solutionStepsAr: [
				`تصنيف الحروف: Vowels (${s.vowels}) — Consonants (${s.consonants}).`,
				`كتابة الأرقام: ${s.numPairs[0].digit} = ${s.numPairs[0].word}، و${s.numPairs[1].digit} = ${s.numPairs[1].word}.`,
				`تصحيح الحروف الكبيرة: ${s.capAnswer}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Family Members, Greetings & Word Order
// ═══════════════════════════════════════════════════════════════════════════════
const familyGreetings3apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t1_family_greetings',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'vocabulary_morphology',
	titleAr: 'رصيد لغوي: العائلة والتحية وترتيب الجمل البسيطة',
	curriculumLessonId: 'eng_lesson_3ap_t1_my_family',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				oddGroup: 'father - mother - blue - sister',
				oddAnswer: 'blue',
				dialogueA: 'Good morning! What is your name?',
				dialoguePrompt: '............ ! My ............ is Bilal.',
				dialogueAnswer: 'Good morning! My name is Bilal.',
				scrambled: 'my / This / mother / is / .',
				ordered: 'This is my mother.',
				mcqPrompt: 'Complete politely: "This is my ......" (أبي)',
				mcqCorrect: 'father',
				mcqDistractors: [
					{ text: 'mother', diagnosticFeedback: 'mother means الأم.' },
					{ text: 'sister', diagnosticFeedback: 'sister means الأخت.' },
					{ text: 'grandmother', diagnosticFeedback: 'grandmother means الجدّة.' }
				]
			},
			{
				oddGroup: 'red - green - brother - yellow',
				oddAnswer: 'brother',
				dialogueA: 'Hello! How old are you?',
				dialoguePrompt: '............ ! I ............ 8 years old.',
				dialogueAnswer: 'Hello! I am 8 years old.',
				scrambled: 'is / sister / This / my / .',
				ordered: 'This is my sister.',
				mcqPrompt: 'Find the odd word out (الكلمة الدخيلة): (father, mother, yellow, brother)',
				mcqCorrect: 'yellow',
				mcqDistractors: [
					{ text: 'father', diagnosticFeedback: 'father is a family member.' },
					{ text: 'mother', diagnosticFeedback: 'mother is a family member.' },
					{ text: 'brother', diagnosticFeedback: 'brother is a family member.' }
				]
			},
			{
				oddGroup: 'grandfather - grandmother - pen - brother',
				oddAnswer: 'pen',
				dialogueA: 'Hi! What is your name?',
				dialoguePrompt: '............ ! My ............ is Ines.',
				dialogueAnswer: 'Hi! My name is Ines.',
				scrambled: 'name / My / is / Omar / .',
				ordered: 'My name is Omar.',
				mcqPrompt: 'Choose the right word order (الترتيب الصحيح): (name / is / My / Omar / .)',
				mcqCorrect: 'My name is Omar.',
				mcqDistractors: [
					{ text: 'Name my is Omar.', diagnosticFeedback: 'Always start with My before name.' },
					{ text: 'Omar my is name.', diagnosticFeedback: 'Put My name is before the person name.' },
					{ text: 'Is my name Omar.', diagnosticFeedback: 'Is at the start makes a question.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول العائلة والتحية:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Family and Greetings)',
			points: 3,
			instruction: 'Answer the following three tasks:',
			content: [
				buildIllustratedFigureBlock('pri_lang_08_birthday_cake_party', {
					lang: 'en',
					title: 'Family Celebration: Cake, Balloons and Gifts',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Cross out the odd word (الكلمة الدخيلة): ( ${s.oddGroup} )`,
					answer: `The odd word is: ${s.oddAnswer}.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Complete the short dialogue:\nPupil A: ${s.dialogueA}\nPupil B: ${s.dialoguePrompt}`,
					answer: s.dialogueAnswer,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Reorder the words to get a correct sentence: ( ${s.scrambled} )`,
					answer: s.ordered,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابحث في التمرين الأول عن الكلمة التي لا تنتمي إلى نفس المجموعة.',
				'في الحوار استعمل التحية المناسبة و My name is أو I am.',
				'ابدأ الجملة بالكلمة التي تحمل الحرف الكبير (Capital letter).'
			],
			solutionStepsAr: [
				`الكلمة الدخيلة: ${s.oddAnswer}.`,
				`إكمال الحوار: ${s.dialogueAnswer}`,
				`ترتيب الجملة: ${s.ordered}`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — Guided Self-Introduction from an ID Card
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression3apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3ap_t1_written_expression',
	grade: '3ap',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: التعريف بالنفس والعائلة من بطاقة',
	curriculumLessonId: 'eng_lesson_3ap_t1_greetings_intro',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				pupilName: 'Anes',
				age: '8',
				city: 'Setif',
				familyNote: 'father (Ali), mother (Salma)',
				model: 'Hello! My name is Anes. I am 8 years old. I live in Setif with my father Ali and my mother Salma.',
				mcqQ: 'Which sentence is the best start for introducing yourself?',
				mcqCorrect: 'Hello! My name is Anes.',
				mcqDistractors: [
					{ text: 'Goodbye! My bag is blue.', diagnosticFeedback: 'Goodbye is used at the end, not at the start.' },
					{ text: 'Blue is my name eight.', diagnosticFeedback: 'Word order and meaning are incorrect.' },
					{ text: 'Who is this pen?', diagnosticFeedback: 'This asks about a pen, not introducing yourself.' }
				]
			},
			{
				pupilName: 'Khadidja',
				age: '8',
				city: 'Tlemcen',
				familyNote: 'brother (Youssef), sister (Aya)',
				model: 'Good morning! My name is Khadidja. I am 8 years old. I live in Tlemcen. I have a brother Youssef and a sister Aya.',
				mcqQ: 'Which sentence correctly tells your age in English?',
				mcqCorrect: 'I am 8 years old.',
				mcqDistractors: [
					{ text: 'My name is 8 years.', diagnosticFeedback: 'My name is for your name, not age.' },
					{ text: 'I 8 years am old.', diagnosticFeedback: 'Put am directly after I.' },
					{ text: 'Hello 8 years old.', diagnosticFeedback: 'You must use I am before the age.' }
				]
			},
			{
				pupilName: 'Omar',
				age: '9',
				city: 'Annaba',
				familyNote: 'father (Nabil), sister (Meriem)',
				model: 'Hi! My name is Omar. I am 9 years old. I live in Annaba. My father is Nabil and my sister is Meriem.',
				mcqQ: 'Which sentence correctly introduces your sister?',
				mcqCorrect: 'This is my sister Meriem.',
				mcqDistractors: [
					{ text: 'Sister this my is.', diagnosticFeedback: 'Put This is my before sister.' },
					{ text: 'My name is my sister.', diagnosticFeedback: 'Use This is my sister to present her.' },
					{ text: 'Goodbye sister name.', diagnosticFeedback: 'This is not a complete sentence.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لكتابة فقرة التعريف بالنفس:',
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
					topicOnePrompt: `Use the ID Card below to write 3 or 4 short sentences introducing ${pr.pupilName} to a new English friend.`,
					topicOneNotes: [
						`Greeting: Hello / Good morning`,
						`Name: ${pr.pupilName}`,
						`Age: ${pr.age} years old`,
						`City: ${pr.city}`,
						`Family: ${pr.familyNote}`
					],
					modelAnswer: pr.model,
					rubricSummary: 'Relevance to the ID card (1 pt), correct spelling and grammar (1 pt), capital letters and full stops (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ بالتحية ثم اكتب الاسم بعبارة My name is ...',
				'اكتب العمر بعبارة I am ... years old.',
				'لا تنسَ الحرف الكبير في بداية كل جملة والنقطة في نهايتها.'
			],
			solutionStepsAr: [
				'قراءة معطيات البطاقة (Name, Age, City, Family).',
				'تحويل كل معلومة إلى جملة قصيرة وواضحة.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T1: EnglishParameterizedTemplate[] = [
	comprehension3apT1,
	vocabPhonics3apT1,
	familyGreetings3apT1,
	writtenExpression3apT1
];
