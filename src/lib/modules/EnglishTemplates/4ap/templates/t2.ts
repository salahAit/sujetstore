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
// 1. Comprehension (4 pts) — School Facilities, Prepositions & Clean Hobbies
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension4apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t2_comprehension',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: مرافق المدرسة والهوايات المفيدة والاستطاعة',
	curriculumLessonId: 'eng_lesson_4ap_t2_school_prepositions',
	defaultPoints: 4,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scenarios = [
			{
				pupil: 'Amine',
				place1: 'next to the library',
				place2: 'in the courtyard',
				hobby1: 'playing football',
				hobby2: 'reading Islamic and science stories',
				canDo: 'run fast and play chess',
				cannotDo: 'swim yet',
				paragraphs: [
					'Hello! I am [[Amine]] and I love my primary school. My classroom is clean and bright. It is [[next to]] the library. At break time, my friends and I run in the courtyard.',
					'On Friday and Saturday, I enjoy useful hobbies. My brother plays football in the park, and I like reading books in the library. I can play chess and run fast, but I cannot swim yet.'
				],
				q1: 'Where is Amine classroom located?',
				a1: 'It is next to the library.',
				q2: 'What can Amine do in his free time?',
				a2: 'He can play chess and run fast.',
				tf1Q: 'Amine and his friends run in the courtyard at break time.',
				tf1A: 'True',
				tf2Q: 'Amine can swim very well.',
				tf2A: 'False',
				tf2C: 'He cannot swim yet.',
				mcqQ: 'Where is Amine classroom in the text?',
				mcqCorrect: 'Next to the library',
				mcqDistractors: [
					{ text: 'Under the canteen', diagnosticFeedback: 'The text says: It is next to the library.' },
					{ text: 'In the kitchen', diagnosticFeedback: 'Kitchen is at home, not in school.' },
					{ text: 'Next to the sea', diagnosticFeedback: 'Read paragraph one carefully.' }
				]
			},
			{
				pupil: 'Khadidja',
				place1: 'next to the office',
				place2: 'in the canteen',
				hobby1: 'drawing trees and flowers',
				hobby2: 'reading short stories',
				canDo: 'draw well and ride a bike',
				cannotDo: 'play chess',
				paragraphs: [
					'Good morning! My name is [[Khadidja]]. My school is big and tidy. The canteen is [[next to]] the office, and there are green trees in the courtyard. My pencil case is on my desk and my bag is under my chair.',
					'In my free time, I love drawing nature and reading stories. My sister swims every Saturday. I can draw well and ride a bike, but I cannot play chess.'
				],
				q1: 'Where is Khadidja school bag?',
				a1: 'It is under her chair.',
				q2: 'What are Khadidja favourite hobbies?',
				a2: 'Drawing nature and reading stories.',
				tf1Q: 'The canteen is next to the office.',
				tf1A: 'True',
				tf2Q: 'Khadidja can play chess.',
				tf2A: 'False',
				tf2C: 'She cannot play chess.',
				mcqQ: 'Where is Khadidja pencil case in the text?',
				mcqCorrect: 'On her desk',
				mcqDistractors: [
					{ text: 'Under her chair', diagnosticFeedback: 'Her bag is under her chair, while her pencil case is on her desk.' },
					{ text: 'In the canteen', diagnosticFeedback: 'Read the last sentence of paragraph one.' },
					{ text: 'Next to the office', diagnosticFeedback: 'The canteen is next to the office.' }
				]
			},
			{
				pupil: 'Omar',
				place1: 'next to the courtyard',
				place2: 'in the library',
				hobby1: 'swimming and running',
				hobby2: 'gardening with his grandfather',
				canDo: 'swim and play football',
				cannotDo: 'draw animals',
				paragraphs: [
					'Hi! I am [[Omar]]. Our school library is quiet and full of useful books. It is [[next to]] the courtyard. Every Tuesday, our teacher reads a short story with us in the library.',
					'On the weekend, I practise clean sports. I love swimming and running, and my brother likes gardening with our grandfather. I can swim and play football, but I cannot draw animals.'
				],
				q1: 'When does Omar class read a story in the library?',
				a1: 'Every Tuesday.',
				q2: 'What sports does Omar love?',
				a2: 'He loves swimming and running.',
				tf1Q: 'The library is next to the courtyard.',
				tf1A: 'True',
				tf2Q: 'Omar can draw animals well.',
				tf2A: 'False',
				tf2C: 'He cannot draw animals.',
				mcqQ: 'What does Omar brother like doing on the weekend?',
				mcqCorrect: 'Gardening with their grandfather',
				mcqDistractors: [
					{ text: 'Playing chess in the canteen', diagnosticFeedback: 'Read sentence two of paragraph two.' },
					{ text: 'Drawing in the office', diagnosticFeedback: 'Omar cannot draw animals; his brother likes gardening.' },
					{ text: 'Swimming in the classroom', diagnosticFeedback: 'That is not mentioned in the text.' }
				]
			}
		];

		const sc = rng.pick(scenarios);
		const mcq = buildUniqueMcqOptions(sc.mcqCorrect, sc.mcqDistractors, rng);
		const plainText = sc.paragraphs.join(' ').replace(/\[\[|\]\]/g, '');

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `Read the text and choose the right answer:\n"${plainText}"\nQuestion: ${sc.mcqQ}`,
			questionTextAr: 'اقرأ النص وأجب عن سؤال الفهم:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة المذكورة في النص هي: «${sc.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One: Reading Comprehension',
			points: 4,
			instruction: 'Read the text carefully, then answer the questions:',
			content: [
				buildEnglishPassageBlock({
					title: 'My School and My Free Time',
					paragraphs: sc.paragraphs,
					numberedParagraphs: true
				}),
				buildIllustratedFigureBlock('pri_lang_04_house_rooms_cutaway', {
					lang: 'en',
					title: 'Prepositions of Place at Home and School (in, on, under, next to)',
					maxHeight: 108,
					width: '58%'
				}),
				{
					type: 'text',
					content: `1) ${sc.q1}`,
					answer: sc.a1,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) ${sc.q2}`,
					answer: sc.a2,
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
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابحث في الفقرة الأولى عن حروف المكان (in, on, under, next to).',
				'ابحث في الفقرة الثانية عن الهوايات وأفعال الاستطاعة (can / cannot).',
				'تحقق من النفي (cannot) قبل الإجابة عن True/False.'
			],
			solutionStepsAr: [
				`إجابة السؤال 1: ${sc.a1}`,
				`إجابة السؤال 2: ${sc.a2}`,
				`صحيح أو خطأ: (3) ${sc.tf1A} — (4) ${sc.tf2A} (${sc.tf2C}).`
			],
			finalAnswer: sc.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language A (3 pts) — Present Simple + Prepositions of Place
// ═══════════════════════════════════════════════════════════════════════════════
const presentPrepositions4apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t2_present_prepositions',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'قواعد: المضارع البسيط (Present Simple) وحروف المكان',
	curriculumLessonId: 'eng_lesson_4ap_t2_present_simple',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				v1: 'Every Friday, Bilal (play) ............ football with his friends.',
				v1A: 'plays',
				v2: 'We (read) ............ short stories in the library.',
				v2A: 'read',
				v3: 'Sara (go) ............ to school at 8 o clock.',
				v3A: 'goes',
				p1: 'The red book is ............ the desk. (على)',
				p1A: 'on',
				p2: 'The library is ............ the classroom. (بجانب)',
				p2A: 'next to',
				mcqPrompt: 'Put the verb in the Present Simple: "My brother (read) ...... a book every evening."',
				mcqCorrect: 'reads',
				mcqDistractors: [
					{ text: 'read', diagnosticFeedback: 'My brother is He (singular), so add -s.' },
					{ text: 'reading', diagnosticFeedback: 'Present Simple for a habit uses reads.' },
					{ text: 'reades', diagnosticFeedback: 'Only add -s to read: reads.' }
				]
			},
			{
				v1: 'Aya (draw) ............ green trees and flowers.',
				v1A: 'draws',
				v2: 'I (run) ............ in the clean park on Saturday.',
				v2A: 'run',
				v3: 'He (wash) ............ his hands before lunch.',
				v3A: 'washes',
				p1: 'My school bag is ............ the chair. (تحت)',
				p1A: 'under',
				p2: 'The pupils play ............ the courtyard. (في)',
				p2A: 'in',
				mcqPrompt: 'Choose the right preposition: "My bag is ...... the chair." (تحت)',
				mcqCorrect: 'under',
				mcqDistractors: [
					{ text: 'on', diagnosticFeedback: 'on means فوق / على.' },
					{ text: 'in', diagnosticFeedback: 'in means داخل / في.' },
					{ text: 'next to', diagnosticFeedback: 'next to means بجانب.' }
				]
			},
			{
				v1: 'Youssef (swim) ............ in the pool every Saturday.',
				v1A: 'swims',
				v2: 'They (play) ............ chess after homework.',
				v2A: 'play',
				v3: 'Mother (go) ............ to the market in the morning.',
				v3A: 'goes',
				p1: 'The pen is ............ the pencil case. (داخل)',
				p1A: 'in',
				p2: 'The canteen is ............ the courtyard. (بجانب)',
				p2A: 'next to',
				mcqPrompt: 'Choose the correct Present Simple form: "She (go) ...... to the library on Monday."',
				mcqCorrect: 'goes',
				mcqDistractors: [
					{ text: 'go', diagnosticFeedback: 'She needs -es with verbs ending in o.' },
					{ text: 'gos', diagnosticFeedback: 'Verbs ending in o take -es: goes.' },
					{ text: 'going', diagnosticFeedback: 'Use Present Simple goes for a weekly routine.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر التصريف أو حرف المكان الصحيح:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Present Simple and Prepositions)',
			points: 3,
			instruction: 'Do the following grammar activities carefully:',
			content: [
				buildIllustratedFigureBlock('pri_lang_01_red_bus_train', {
					lang: 'en',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Write the verbs in brackets in the Present Simple:\n1) ${s.v1}\n2) ${s.v2}\n3) ${s.v3}`,
					answer: `1) ${s.v1A}  |  2) ${s.v2A}  |  3) ${s.v3A}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `Task 2: Complete with the right preposition (in / on / under / next to):\n1) ${s.p1}\n2) ${s.p2}`,
					answer: `1) ${s.p1A}  |  2) ${s.p2A}`,
					mark: '1.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'في المضارع البسيط نضيف s أو es فقط مع He / She / It والاسم المفرد.',
				'الأفعال المنتهية بـ o أو sh نضيف لها es مع He / She / It (goes, washes).',
				'تذكّر معاني حروف المكان: in (في), on (على), under (تحت), next to (بجانب).'
			],
			solutionStepsAr: [
				`تصريف المضارع البسيط: (1) ${s.v1A} — (2) ${s.v2A} — (3) ${s.v3A}.`,
				`حروف المكان: (1) ${s.p1A} — (2) ${s.p2A}.`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language B (3 pts) — Can / Cannot Questions & Clean Hobbies
// ═══════════════════════════════════════════════════════════════════════════════
const canHobbies4apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t2_can_hobbies',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'قواعد ومفردات: أسلوب الاستطاعة (Can / Cannot) والهوايات المفيدة',
	curriculumLessonId: 'eng_lesson_4ap_t2_modal_can',
	defaultPoints: 3,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sets = [
			{
				qScrambled: 'swim / Can / you / ?',
				qOrdered: 'Can you swim?',
				ansPrompt: 'Answer with Yes or No: Can a bird fly? : ............  |  Can a camel fly? : ............',
				ansKey: 'Yes, it can.  |  No, it cannot.',
				words: ['library', 'swimming', 'canteen', 'reading'],
				schoolCol: 'library , canteen',
				hobbyCol: 'swimming , reading',
				mcqPrompt: 'Choose the right sentence using "can":',
				mcqCorrect: 'He can play football very well.',
				mcqDistractors: [
					{ text: 'He can plays football very well.', diagnosticFeedback: 'Never add -s after can.' },
					{ text: 'He cans play football very well.', diagnosticFeedback: 'can never takes -s.' },
					{ text: 'He can to play football.', diagnosticFeedback: 'Do not put to after can.' }
				]
			},
			{
				qScrambled: 'chess / play / you / Can / ?',
				qOrdered: 'Can you play chess?',
				ansPrompt: 'Answer with Yes or No: Can a fish swim? : ............  |  Can a sheep read? : ............',
				ansKey: 'Yes, it can.  |  No, it cannot.',
				words: ['courtyard', 'running', 'classroom', 'drawing'],
				schoolCol: 'courtyard , classroom',
				hobbyCol: 'running , drawing',
				mcqPrompt: 'Complete the short answer: "Can you draw a tree? No, I ...... ."',
				mcqCorrect: 'cannot',
				mcqDistractors: [
					{ text: 'do not', diagnosticFeedback: 'The question starts with Can, so answer No, I cannot.' },
					{ text: 'am not', diagnosticFeedback: 'Use cannot to answer a Can question.' },
					{ text: 'can', diagnosticFeedback: 'No requires the negative cannot.' }
				]
			},
			{
				qScrambled: 'fast / run / Can / you / ?',
				qOrdered: 'Can you run fast?',
				ansPrompt: 'Answer with Yes or No: Can a horse run? : ............  |  Can a cat write? : ............',
				ansKey: 'Yes, it can.  |  No, it cannot.',
				words: ['office', 'playing football', 'library', 'gardening'],
				schoolCol: 'office , library',
				hobbyCol: 'playing football , gardening',
				mcqPrompt: 'Choose the right question order: (bike / a / ride / Can / you / ?)',
				mcqCorrect: 'Can you ride a bike?',
				mcqDistractors: [
					{ text: 'You can ride a bike?', diagnosticFeedback: 'Put Can first to form a proper question.' },
					{ text: 'Can ride you a bike?', diagnosticFeedback: 'Put the subject you directly after Can.' },
					{ text: 'Ride can you a bike?', diagnosticFeedback: 'Always start the question with Can.' }
				]
			}
		];

		const s = rng.pick(sets);
		const mcq = buildUniqueMcqOptions(s.mcqCorrect, s.mcqDistractors, rng);

		const quizQuestion: EnglishGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: s.mcqPrompt,
			questionTextAr: 'اختر الصياغة الصحيحة باستعمال Can / Cannot:',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الصياغة الصحيحة هي: «${s.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two: Mastery of Language (Can / Cannot and Hobbies)',
			points: 3,
			instruction: 'Answer the three tasks below:',
			content: [
				buildIllustratedFigureBlock('pri_lang_07_clean_park_planting', {
					lang: 'en',
					maxHeight: 104,
					width: '56%'
				}),
				{
					type: 'text',
					content: `Task 1: Reorder the words to make a question: ( ${s.qScrambled} )`,
					answer: s.qOrdered,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 2: ${s.ansPrompt}`,
					answer: s.ansKey,
					mark: '1'
				},
				{
					type: 'text',
					content: `Task 3: Classify in the table: ( ${s.words.join(' - ')} )`
				},
				{
					type: 'table',
					headers: ['School Facilities', 'Clean Hobbies'],
					cells: [],
					rows: [
						[
							{ content: '....................', answer: s.schoolCol, mark: '0.5' },
							{ content: '....................', answer: s.hobbyCol, mark: '0.5' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'في السؤال نبدأ بـ Can ثم الفاعل (you) ثم الفعل المجرد ثم علامة الاستفهام (?).',
				'للإجابة القصيرة نستعمل Yes, it can. أو No, it cannot.',
				'فرّق بين مرافق المدرسة (library, courtyard, canteen) والهوايات المفيدة.'
			],
			solutionStepsAr: [
				`ترتيب السؤال: ${s.qOrdered}`,
				`الإجابات القصيرة: ${s.ansKey}`,
				`التصنيف: School Facilities (${s.schoolCol}) — Clean Hobbies (${s.hobbyCol}).`
			],
			finalAnswer: s.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (3 pts) — My School Facilities & Clean Free-Time Hobbies
// ═══════════════════════════════════════════════════════════════════════════════
const writtenExpression4apT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4ap_t2_written_expression',
	grade: '4ap',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: وصف مدرستي وهواياتي المفيدة في وقت الفراغ',
	curriculumLessonId: 'eng_lesson_4ap_t2_clean_hobbies',
	defaultPoints: 3,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				prompt: 'Write a short paragraph of 4 sentences about your school and your favourite clean hobbies.',
				notes: [
					'School: big and clean (library next to the classroom)',
					'Break time: run in the courtyard',
					'Weekend hobbies: reading books and playing football',
					'Ability: can swim / cannot play chess yet'
				],
				model: 'My school is big and clean, and the library is next to my classroom. At break time, I run in the courtyard with my friends. On the weekend, I like reading books and playing football. I can swim well, but I cannot play chess yet.',
				mcqQ: 'Which sentence correctly connects an ability and an inability?',
				mcqCorrect: 'I can swim well, but I cannot play chess yet.',
				mcqDistractors: [
					{ text: 'I can swims well, but I cannot plays chess.', diagnosticFeedback: 'Use base verbs swim and play after can/cannot.' },
					{ text: 'I can swim well, in I cannot play chess.', diagnosticFeedback: 'Use but, not in, to show contrast.' },
					{ text: 'Can I swim well, but cannot play chess.', diagnosticFeedback: 'Statements start with the subject I.' }
				]
			},
			{
				prompt: 'Write 4 short sentences about your friend weekend routine and hobbies using the notes below:',
				notes: [
					'Friend: Youssef (9 years old)',
					'Friday morning: goes to the park / plays football',
					'Saturday afternoon: reads stories in the library',
					'Abilities: can run fast and ride a bike'
				],
				model: 'My friend Youssef is 9 years old. On Friday morning, he goes to the park and plays football. On Saturday afternoon, he reads useful stories in the library. He can run fast and ride a bike.',
				mcqQ: 'Which sentence is in the correct Present Simple for "He"?',
				mcqCorrect: 'He reads useful stories in the library.',
				mcqDistractors: [
					{ text: 'He read useful stories in the library.', diagnosticFeedback: 'Add -s to read with He: reads.' },
					{ text: 'He reading useful stories in the library.', diagnosticFeedback: 'Missing verb form; Present Simple is He reads.' },
					{ text: 'He is reads useful stories.', diagnosticFeedback: 'Do not put is before reads.' }
				]
			},
			{
				prompt: 'Write 4 simple sentences describing your classroom and your school facilities:',
				notes: [
					'Classroom: tidy, next to the library',
					'Objects: books on the desk, bags under the chairs',
					'Courtyard: green trees, pupils play',
					'Canteen: clean, healthy lunch'
				],
				model: 'My classroom is tidy and it is next to the library. Our books are on the desks and our bags are under the chairs. The courtyard has green trees where pupils play. Our canteen is clean and serves healthy lunch.',
				mcqQ: 'Which sentence correctly uses prepositions of place?',
				mcqCorrect: 'My book is on the desk and my bag is under the chair.',
				mcqDistractors: [
					{ text: 'My book is under the pen and my chair is in the board.', diagnosticFeedback: 'The locations do not make sense.' },
					{ text: 'My book next the desk.', diagnosticFeedback: 'Missing is and to (next to).' },
					{ text: 'On the desk my book.', diagnosticFeedback: 'Missing the verb is.' }
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
				buildIllustratedFigureBlock('pri_lang_02_airplane_ship', {
					lang: 'en',
					maxHeight: 102,
					width: '54%'
				}),
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt: pr.prompt,
					topicOneNotes: pr.notes,
					modelAnswer: pr.model,
					rubricSummary: 'Relevance to notes (1 pt), correct Present Simple / prepositions / can (1 pt), spelling, capitals and full stops (1 pt).',
					mark: '3'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '4ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: this.examRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استعمل حروف المكان (in, on, under, next to) لوصف المدرسة.',
				'تذكّر إضافة s للأفعال مع He/She وترك الفعل مجرداً بعد can.',
				'اربط بين جملك القصيرة بـ and أو but واختم كل جملة بنقطة.'
			],
			solutionStepsAr: [
				'تحويل كل ملاحظة في البطاقة إلى جملة تامة.',
				'مراجعة القواعد (Present Simple و can وحروف المكان).',
				`النموذج المقترح: ${pr.model}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_4AP_T2: EnglishParameterizedTemplate[] = [
	comprehension4apT2,
	presentPrepositions4apT2,
	canHobbies4apT2,
	writtenExpression4apT2
];
