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
// 1. Comprehension (4 pts) — Family, Friends, Nationalities & School Subjects
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension4apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t1_comprehension',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: العائلة والأصدقاء والجنسيات والمواد الدراسية',
	curriculumLessonId: 'eng_lesson_4ap_t1_family_nationalities',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				name: 'Youssef',
				age: '9',
				country: 'Algeria',
				nationality: 'Algerian',
				city: 'Tlemcen',
				classCount: 'twenty-four',
				favSubject: 'Islamic Education and English',
				friendName: 'Tariq',
				friendCountry: 'Palestine',
				friendNat: 'Palestinian',
				paragraphs: [
					'Hello! My name is [[Youssef]]. I am 9 years old. I am from Algeria, so I am Algerian. I live in Tlemcen with my parents and my two sisters.',
					'I am a pupil in 4th year primary school. There are twenty-four pupils in my class. My favourite school subjects are Islamic Education and English. My pen-friend [[Tariq]] is from Palestine. He is Palestinian and he loves Maths.'
				],
				q1: 'Where is Youssef from? What is his nationality?',
				a1: 'He is from Algeria. He is Algerian.',
				tf1Q: 'There are twenty-four pupils in Youssef class.',
				tf1A: 'True',
				tf2Q: 'Tariq is from Tunisia.',
				tf2A: 'False',
				tf2C: 'Tariq is from Palestine.',
				mcqQ: 'What is Tariq nationality in the text?',
				mcqCorrect: 'Palestinian',
				mcqDistractors: [
					{ text: 'Algerian', diagnosticFeedback: 'Youssef is Algerian, whereas Tariq is from Palestine.' },
					{ text: 'Tunisian', diagnosticFeedback: 'Tunisia is not mentioned in the text.' },
					{ text: 'Egyptian', diagnosticFeedback: 'Read the last two sentences carefully.' }
				]
			},
			{
				name: 'Meriem',
				age: '9',
				country: 'Algeria',
				nationality: 'Algerian',
				city: 'Setif',
				classCount: 'twenty-six',
				favSubject: 'Arabic and Science',
				friendName: 'Salma',
				friendCountry: 'Tunisia',
				friendNat: 'Tunisian',
				paragraphs: [
					'Good morning! I am [[Meriem]]. I am 9 years old and I am Algerian. I live in Setif. I have one brother and one little sister. My father is a doctor and my mother is a teacher.',
					'In my 4AP classroom, we are twenty-six polite pupils. My favourite subjects are Arabic and Science. My friend [[Salma]] is from Tunisia. She is Tunisian and her favourite subject is English.'
				],
				q1: 'What are Meriem favourite school subjects?',
				a1: 'Her favourite subjects are Arabic and Science.',
				tf1Q: 'Meriem has one brother and one sister.',
				tf1A: 'True',
				tf2Q: 'There are thirty pupils in Meriem classroom.',
				tf2A: 'False',
				tf2C: 'There are twenty-six pupils in her classroom.',
				mcqQ: 'How many pupils are there in Meriem classroom?',
				mcqCorrect: 'twenty-six (26)',
				mcqDistractors: [
					{ text: 'twenty-four (24)', diagnosticFeedback: 'Check paragraph two for the exact number.' },
					{ text: 'sixteen (16)', diagnosticFeedback: 'The text says twenty-six, not sixteen.' },
					{ text: 'thirty (30)', diagnosticFeedback: 'Read sentence one of paragraph two again.' }
				]
			},
			{
				name: 'Bilal',
				age: '10',
				country: 'Algeria',
				nationality: 'Algerian',
				city: 'Constantine',
				classCount: 'twenty-two',
				favSubject: 'Maths and English',
				friendName: 'Omar',
				friendCountry: 'Egypt',
				friendNat: 'Egyptian',
				paragraphs: [
					'Hi! My name is [[Bilal]]. I am 10 years old. I am from Constantine in Algeria. I have a big family with two brothers and a sister.',
					'I am in class 4AP with twenty-two pupils. My favourite subjects are Maths and English. I have a good friend named [[Omar]]. He is from Egypt. He is Egyptian and he has three green books.'
				],
				q1: 'Where is Bilal friend Omar from?',
				a1: 'He is from Egypt. He is Egyptian.',
				tf1Q: 'Bilal lives in Constantine.',
				tf1A: 'True',
				tf2Q: 'Bilal is twelve years old.',
				tf2A: 'False',
				tf2C: 'Bilal is ten years old.',
				mcqQ: 'What are Bilal favourite school subjects?',
				mcqCorrect: 'Maths and English',
				mcqDistractors: [
					{ text: 'History and Geography', diagnosticFeedback: 'Read sentence two of paragraph two.' },
					{ text: 'Science only', diagnosticFeedback: 'The text mentions Maths and English.' },
					{ text: 'Arabic only', diagnosticFeedback: 'Check the words right after My favourite subjects are.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqDistractors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the text carefully and answer:\n"${plainText}"\nQuestion: ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص وأجب عن سؤال الفهم:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة من النص هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully, then do the activities:',
			content: [
				buildEnglishPassageBlock({
					title: 'My Friends and My School',
					paragraphs: sc.paragraphs,
					numberedParagraphs: true
				}),
				buildIllustratedFigureBlock('pri_ara_04_algeria_flag_martyrs_memorial', {
					lang: 'en',
					title: 'My Country Algeria: Algiers, Martyrs Memorial and National Flag',
					customLegend: [
						{ num: '1', label: 'Martyrs Memorial and the Casbah of Algiers' },
						{ num: '2', label: 'The Algerian flag: I am from Algeria, I am Algerian' }
					],
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'table',
					headers: ['Pupil', 'Age', 'Nationality', 'Friend Country'],
					cells: [],
					rows: [
						[
							{ content: '............', answer: sc.name, mark: '0.25' },
							{ content: '............', answer: sc.age, mark: '0.25' },
							{ content: '............', answer: sc.nationality, mark: '0.25' },
							{ content: '............', answer: sc.friendCountry, mark: '0.25' }
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
						{ q: `2) ${sc.tf1Q}`, a: sc.tf1A, mark: '1' },
						{ q: `3) ${sc.tf2Q}`, a: sc.tf2A, c: sc.tf2C, mark: '1' }
					]
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج الاسم والعمر والجنسية من الفقرة الأولى.',
				'استخرج اسم الصديق وبلده من الفقرة الثانية.',
				'انتبه لكتابة الأعداد بالحروف عند مراجعة جمل True/False.'
			],
			solutionStepsAr: [
				`الجدول: Pupil = ${sc.name}، Age = ${sc.age}، Nationality = ${sc.nationality}، Friend Country = ${sc.friendCountry}.`,
				`السؤال 1: ${sc.a1}`,
				`صحيح أو خطأ: (2) ${sc.tf1A} — (3) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Verb to be, Verb to have & Nationalities
// ═══════════════════════════════════════════════════════════════════════════════
const beHave4apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t1_be_have',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'grammar_tenses',
	titleAr: 'قواعد: فعلا الكينونة والملكية (to be / to have) والجنسيات',
	curriculumLessonId: 'eng_lesson_4ap_t1_to_be_to_have',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				be1: 'We ...... Algerian pupils.',
				be1A: 'are',
				be2: 'She ...... 9 years old.',
				be2A: 'is',
				have1: 'I ...... two notebooks.',
				have1A: 'have',
				have2: 'Amine ...... a green bag.',
				have2A: 'has',
				natQ: 'Algeria : Algerian  |  Palestine : ............  |  Tunisia : ............',
				natA: 'Palestinian  |  Tunisian',
				mcqPrompt: 'Choose the correct verbs: "Karim ...... from Algeria. He ...... two sisters."',
				mcqCorrect: 'is / has',
				mcqDistractors: [
					{ text: 'are / have', diagnosticFeedback: 'Karim is singular (He), so use is and has.' },
					{ text: 'is / have', diagnosticFeedback: 'With He, use has instead of have.' },
					{ text: 'am / has', diagnosticFeedback: 'am is only used with I.' }
				]
			},
			{
				be1: 'They ...... in class 4AP.',
				be1A: 'are',
				be2: 'I ...... from Oran.',
				be2A: 'am',
				have1: 'My sister ...... a new ruler.',
				have1A: 'has',
				have2: 'We ...... English on Tuesday.',
				have2A: 'have',
				natQ: 'Egypt : ............  |  Morocco : ............',
				natA: 'Egyptian  |  Moroccan',
				mcqPrompt: 'Complete correctly: "We ...... twenty-five pupils in our class."',
				mcqCorrect: 'have',
				mcqDistractors: [
					{ text: 'has', diagnosticFeedback: 'With We, use have (not has).' },
					{ text: 'is', diagnosticFeedback: 'We is plural and cannot take is.' },
					{ text: 'am', diagnosticFeedback: 'am goes only with I.' }
				]
			},
			{
				be1: 'He ...... my polite friend.',
				be1A: 'is',
				be2: 'You ...... a good pupil.',
				be2A: 'are',
				have1: 'Fatima ...... three books.',
				have1A: 'has',
				have2: 'They ...... clean desks.',
				have2A: 'have',
				natQ: 'Algeria : ............  |  Britain : ............',
				natA: 'Algerian  |  British',
				mcqPrompt: 'Choose the right sentence with a country and nationality:',
				mcqCorrect: 'She is from Tunisia. She is Tunisian.',
				mcqDistractors: [
					{ text: 'She is from Tunisian. She is Tunisia.', diagnosticFeedback: 'Country comes after from, nationality without from.' },
					{ text: 'She are from Tunisia.', diagnosticFeedback: 'She takes is, not are.' },
					{ text: 'She have from Tunisia.', diagnosticFeedback: 'Use is from, not have from.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر التصريف الصحيح لفعلي to be و to have:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (To Be, To Have and Nationalities)',
			points: 3,
			instruction: 'Do the following grammar tasks:',
			content: [
				buildIllustratedFigureBlock('pri_lang_05_professions_tools', {
					lang: 'en',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Fill in with (am / is / are):\n1) ${s.be1}\n2) ${s.be2}`,
					answer: `1) ${s.be1A}  |  2) ${s.be2A}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Fill in with (have / has):\n1) ${s.have1}\n2) ${s.have2}`,
					answer: `1) ${s.have1A}  |  2) ${s.have2A}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Write the missing nationalities (start with a capital letter):\n${s.natQ}`,
					answer: s.natA,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'مع (I) نضع am، ومع (He/She/It) نضع is، ومع (You/We/They) نضع are.',
				'مع (He/She/It) نضع has، ومع الباقي نضع have.',
				'أسماء البلدان والجنسيات تبدأ دائماً بحرف كبير.'
			],
			solutionStepsAr: [
				`تصريف to be: (1) ${s.be1A} — (2) ${s.be2A}.`,
				`تصريف to have: (1) ${s.have1A} — (2) ${s.have2A}.`,
				`الجنسيات: ${s.natA}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Possessives (my/your/his/her) + Numbers 11-30
// ═══════════════════════════════════════════════════════════════════════════════
const possessiveNumbers4apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t1_possessive_numbers',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'قواعد ومفردات: صفات الملكية والأرقام (11-30) والمواد الدراسية',
	curriculumLessonId: 'eng_lesson_4ap_t1_possessive_adjectives',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				pos1: 'This is Adam. ...... favourite subject is Maths.',
				pos1A: 'His',
				pos2: 'This is Sara. ...... bag is blue.',
				pos2A: 'Her',
				nums: '14 = ............   |   25 = ............',
				numsA: '14 = fourteen   |   25 = twenty-five',
				oddWords: 'Arabic - Science - Maths - kitchen',
				oddA: 'kitchen',
				mcqPrompt: 'Choose the right possessive adjective: "This is Khadidja. ...... mother is a teacher."',
				mcqCorrect: 'Her',
				mcqDistractors: [
					{ text: 'His', diagnosticFeedback: 'Khadidja is a girl (She), so use Her.' },
					{ text: 'My', diagnosticFeedback: 'My means mine (I), not Khadidja.' },
					{ text: 'Your', diagnosticFeedback: 'Your means belonging to you.' }
				]
			},
			{
				pos1: 'I am Bilal. ...... school is in Algiers.',
				pos1A: 'My',
				pos2: 'Hello friend! What is ...... favourite subject?',
				pos2A: 'your',
				nums: '12 = ............   |   30 = ............',
				numsA: '12 = twelve   |   30 = thirty',
				oddWords: 'English - History - ruler - Geography',
				oddA: 'ruler',
				mcqPrompt: 'How do we write the number 18 in English letters?',
				mcqCorrect: 'eighteen',
				mcqDistractors: [
					{ text: 'eighty', diagnosticFeedback: 'eighty is 80, whereas 18 is eighteen.' },
					{ text: 'eightteen', diagnosticFeedback: 'Only one t is written in eighteen.' },
					{ text: 'twenty-eight', diagnosticFeedback: 'twenty-eight is 28.' }
				]
			},
			{
				pos1: 'He is Youssef. ...... father is a doctor.',
				pos1A: 'His',
				pos2: 'She is Ines. ...... book is on the desk.',
				pos2A: 'Her',
				nums: '15 = ............   |   21 = ............',
				numsA: '15 = fifteen   |   21 = twenty-one',
				oddWords: 'Islamic Education - Arabic - camel - Maths',
				oddA: 'camel',
				mcqPrompt: 'Choose the right possessive adjective: "He is my brother Omar. ...... pen is green."',
				mcqCorrect: 'His',
				mcqDistractors: [
					{ text: 'Her', diagnosticFeedback: 'Omar is a boy (He), so use His.' },
					{ text: 'My', diagnosticFeedback: 'The pen belongs to Omar, not me.' },
					{ text: 'Your', diagnosticFeedback: 'The sentence talks about Omar (He).' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الإجابة الصحيحة حول صفات الملكية والأرقام:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Possessives, Numbers and Subjects)',
			points: 3,
			instruction: 'Complete the three tasks below:',
			content: [
				buildIllustratedFigureBlock('pri_lang_08_birthday_cake_party', {
					lang: 'en',
					title: 'School Success Celebration: Cake, Balloons and Gifts',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Fill in with (My / Your / His / Her):\n1) ${s.pos1}\n2) ${s.pos2}`,
					answer: `1) ${s.pos1A}  |  2) ${s.pos2A}`,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: Write the numbers in English letters:\n${s.nums}`,
					answer: s.numsA,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Cross out the odd word that is NOT a school subject: ( ${s.oddWords} )`,
					answer: `Odd word: ${s.oddA}`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اربط صفة الملكية بالمذكر (His) أو المؤنث (Her) أو المتكلم (My) أو المخاطب (Your).',
				'تذكّر نهاية الأعداد 13-19 بـ (-teen) و20-30 بـ (twenty-... / thirty).',
				'ابحث عن الكلمة التي ليست مادة دراسية.'
			],
			solutionStepsAr: [
				`صفات الملكية: (1) ${s.pos1A} — (2) ${s.pos2A}.`,
				`كتابة الأعداد: ${s.numsA}.`,
				`الكلمة الدخيلة: ${s.oddA}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — Introducing Oneself or a Friend from a Fact File
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression4apT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t1_written_expression',
	grade: '4ap',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: التعريف بنفسي أو بصديقي من بطاقة معلومات',
	curriculumLessonId: 'eng_lesson_4ap_t1_family_nationalities',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				person: 'Anes',
				notes: [
					'Name: Anes — Age: 9 years old',
					'Country / Nationality: Algeria / Algerian (Oran)',
					'Family: one brother, two sisters',
					'Favourite subjects: Arabic and English'
				],
				model: 'Hello! My name is Anes. I am 9 years old. I am from Oran in Algeria, so I am Algerian. I have one brother and two sisters. My favourite school subjects are Arabic and English.',
				mcqQ: 'Which sentence correctly uses both country and nationality?',
				mcqCorrect: 'I am from Algeria and I am Algerian.',
				mcqDistractors: [
					{ text: 'I am from Algerian and I am Algeria.', diagnosticFeedback: 'Country goes after from, nationality comes after am.' },
					{ text: 'I have Algeria and Algerian.', diagnosticFeedback: 'Use I am, not I have, for nationality.' },
					{ text: 'My from Algeria is Algerian.', diagnosticFeedback: 'Use I am from Algeria.' }
				]
			},
			{
				person: 'Aya',
				notes: [
					'Friend Name: Aya — Age: 9 years old',
					'Country / Nationality: Algeria / Algerian (Algiers)',
					'Family: two brothers',
					'Favourite subjects: Islamic Education and Maths'
				],
				model: 'This is my friend Aya. She is 9 years old. She is from Algiers in Algeria, and she is Algerian. She has two brothers. Her favourite school subjects are Islamic Education and Maths.',
				mcqQ: 'Which sentence correctly introduces Aya favourite subject?',
				mcqCorrect: 'Her favourite subject is Maths.',
				mcqDistractors: [
					{ text: 'His favourite subject is Maths.', diagnosticFeedback: 'Aya is a girl, so use Her.' },
					{ text: 'She have Maths favourite.', diagnosticFeedback: 'Use Her favourite subject is ... .' },
					{ text: 'Aya are Maths.', diagnosticFeedback: 'Subject and meaning are incorrect.' }
				]
			},
			{
				person: 'Samir',
				notes: [
					'Friend Name: Samir — Age: 10 years old',
					'Country / Nationality: Tunisia / Tunisian',
					'Class size: twenty-five pupils',
					'Favourite subjects: Science and English'
				],
				model: 'This is my pen-friend Samir. He is 10 years old. He is from Tunisia and he is Tunisian. He has twenty-five pupils in his class. His favourite subjects are Science and English.',
				mcqQ: 'Choose the grammatically correct sentence about Samir:',
				mcqCorrect: 'He is 10 years old and he is Tunisian.',
				mcqDistractors: [
					{ text: 'He has 10 years old and he are Tunisian.', diagnosticFeedback: 'Use is for age and nationality.' },
					{ text: 'He am 10 years old.', diagnosticFeedback: 'He takes is, never am.' },
					{ text: 'His is Tunisian.', diagnosticFeedback: 'Use the subject pronoun He before is.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: 'اختر الجملة الصحيحة لفقرة الوضعية الإدماجية:',
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
					topicOnePrompt: `Use the Fact File below to write a neat paragraph of 4 or 5 sentences introducing ${pr.person}:`,
					topicOneNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary: 'All fact-file points included (1 pt), correct to be / to have and possessives (1 pt), neat spelling, capitals and punctuation (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعمل am/is للعمر والجنسية، و have/has لأفراد العائلة.',
				'استعمل my / his / her لذكر المواد المفضلة.',
				'ابدأ أسماء الأشخاص والبلدان والجنسيات دائماً بحرف كبير.'
			],
			solutionStepsAr: [
				'تحويل كل سطر من البطاقة إلى جملة مستقلة صحيحة.',
				'مراجعة تصريف to be و to have وصفات الملكية.',
				`الفقرة النموذجية: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T1: EnglishParameterizedTemplate[] = [
	comprehension4apT1,
	beHave4apT1,
	possessiveNumbers4apT1,
	writtenExpression4apT1
];
