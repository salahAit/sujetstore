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
// Template 1: Part One A — Reading Comprehension (07 pts) — Routine & School
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension1amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t2_comp_routine_school',
	grade: '1am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: الروتين اليومي ومدرستي (My Daily Activities & My School)',
	curriculumLessonId: 'eng_lesson_1am_t2_time_present_simple',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Hamza\'s Daily Routine',
				source: 'Adapted 1MS Reading Text — Daily Activities',
				paragraphs: [
					'My name is Hamza and I am a 1MS pupil in Setif. Every morning, I wake up [[early]] at half past five. I wash my face, pray Fajr with my father, and have a healthy breakfast with milk and dates at seven o\'clock.',
					'I go to school on foot at half past seven. Lessons start at eight o\'clock. In the afternoon, I return home at four o\'clock, do my homework, and read the Quran. I [[never]] sleep late because rest is important for study.'
				],
				glossary: [
					{ term: 'on foot', meaning: 'walking (مشيا على الأقدام)' },
					{ term: 'rest', meaning: 'sleep and relaxation (الراحة)' }
				],
				tf: [
					{ q: 'Hamza wakes up at half past five.', a: 'True', mark: '1' },
					{ q: 'Hamza goes to school by bus.', a: 'False', c: 'He goes to school on foot.', mark: '1' },
					{ q: 'Hamza sleeps late every night.', a: 'False', c: 'He never sleeps late.', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What time do lessons start?\n2) What does Hamza do in the afternoon?',
				whA: '1) Lessons start at eight o\'clock (08:00).\n2) He returns home, does his homework, and reads the Quran.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: get up = ......\nb) An opposite of: late = ......',
				lexA: 'a) get up = wake up\nb) late != early',
				quizQ: 'What time does Hamza go to school?',
				correctOpt: 'At half past seven (07:30).',
				distractors: [
					{ text: 'At half past five (05:30).', diagnosticFeedback: 'At 05:30 Hamza wakes up, not goes to school.' },
					{ text: 'At seven o\'clock (07:00).', diagnosticFeedback: 'At 07:00 he has breakfast.' },
					{ text: 'At four o\'clock (04:00).', diagnosticFeedback: 'At 04:00 in the afternoon he returns home.' }
				]
			},
			{
				title: 'Salma\'s Tidy Middle School',
				source: 'Adapted 1MS Reading Text — My School',
				paragraphs: [
					'Hello! I am Salma. My middle school is in Blida. It is [[clean]] and comfortable. There are sixteen classrooms, a science laboratory, a library, and a large courtyard with green trees.',
					'Right now, we are in the English class. Our teacher is explaining a lesson on the board and we are writing neatly. In our school, we must arrive on time and [[respect]] our teachers. We must not throw rubbish on the floor.'
				],
				glossary: [
					{ term: 'courtyard', meaning: 'school yard (ساحة المدرسة)' },
					{ term: 'rubbish', meaning: 'waste paper or trash (النفايات)' }
				],
				tf: [
					{ q: 'Salma\'s middle school is in Blida.', a: 'True', mark: '1' },
					{ q: 'There are twenty classrooms in her school.', a: 'False', c: 'There are sixteen classrooms.', mark: '1' },
					{ q: 'Pupils must not throw rubbish on the floor.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What is the teacher doing right now?\n2) Mention two school rules from paragraph 2.',
				whA: '1) The teacher is explaining a lesson on the board.\n2) Pupils must arrive on time and respect teachers (and must not throw rubbish on the floor).',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: big = ......\nb) An opposite of: dirty = ......',
				lexA: 'a) big = large\nb) dirty != clean',
				quizQ: 'Where are Salma and her classmates right now?',
				correctOpt: 'In the English class.',
				distractors: [
					{ text: 'In the library.', diagnosticFeedback: 'The library exists in the school, but right now they are in the English class.' },
					{ text: 'In the courtyard.', diagnosticFeedback: 'Paragraph 2 states they are in the English class writing neatly.' },
					{ text: 'At home.', diagnosticFeedback: 'They are at school with their teacher.' }
				]
			},
			{
				title: 'Youssef\'s Blessed Friday',
				source: 'Adapted 1MS Reading Text — Weekend Routine',
				paragraphs: [
					'On Friday, Youssef does not go to school. He gets up at six o\'clock, prays Fajr, and helps his mother tidy the living room. At nine o\'clock, he [[always]] revises his lessons for one hour.',
					'At midday, Youssef wears [[clean]] clothes and goes to the mosque with his father for Friday prayer. After lunch, the whole family eats delicious couscous and visits Youssef\'s grandparents in the afternoon.'
				],
				glossary: [
					{ term: 'midday', meaning: '12:00 noon (منتصف النهار)' },
					{ term: 'tidy', meaning: 'make neat and clean (يرتّب)' }
				],
				tf: [
					{ q: 'Youssef goes to school on Friday.', a: 'False', c: 'He does not go to school on Friday.', mark: '1' },
					{ q: 'Youssef revises his lessons at nine o\'clock.', a: 'True', mark: '1' },
					{ q: 'Youssef goes to the mosque with his father.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What does the family eat for Friday lunch?\n2) Who does the family visit in the afternoon?',
				whA: '1) They eat delicious couscous.\n2) They visit Youssef\'s grandparents.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: tasty = ......\nb) An opposite of: dirty = ......',
				lexA: 'a) tasty = delicious\nb) dirty != clean',
				quizQ: 'What does Youssef do at nine o\'clock on Friday morning?',
				correctOpt: 'He revises his lessons for one hour.',
				distractors: [
					{ text: 'He goes to school.', diagnosticFeedback: 'He does not go to school on Friday.' },
					{ text: 'He eats couscous.', diagnosticFeedback: 'They eat couscous after Friday prayer.' },
					{ text: 'He visits his grandparents.', diagnosticFeedback: 'They visit his grandparents in the afternoon.' }
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
			instruction: 'Read the text carefully and answer the questions:',
			content: [
				passage,
				{ type: 'text', content: 'Task 1 (03 pts): Write "True" or "False":' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
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
				'ابحث عن الساعات والأنشطة اليومية في النص قبل الإجابة.',
				'تأكد من معنى الكلمة في السياق عند استخراج المرادف أو الضد.',
				'أجب بجمل كاملة ومختصرة عن أسئلة Wh-questions.'
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
// Template 2: Part One B — Mastery of Language (07 pts) — Present Simple, Time Preps, Final -s
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT2Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t2_expl_present_time_prep',
	grade: '1am',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة والصوتيات: المضارع البسيط وحروف الجر الزمنية ونطق (-s)',
	curriculumLessonId: 'eng_lesson_1am_t2_prepositions_time_adverbs',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with the right preposition of time (at / on / in):\n1) I wake up ...... 6:00.\n2) We visit our grandmother ...... Friday.\n3) He revises his lessons ...... the evening.\n4) She sleeps early ...... night.',
				task1Ans: '1) at 6:00   2) on Friday   3) in the evening   4) at night',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs between brackets in the Present Simple:\nEvery day, Amina (get up) ...... at 6:00. She (wash) ...... her face and (go) ...... to school at 7:30.',
				task2Ans: 'gets up / washes / goes',
				phonWords: 'gets — reads — washes — books',
				sWords: ['gets', 'books'],
				zWords: ['reads'],
				izWords: ['washes'],
				quizQ: 'Choose the correct Present Simple sentence:',
				correctOpt: 'Bilal wakes up early and goes to school at 7:30.',
				distractors: [
					{ text: 'Bilal wake up early and go to school at 7:30.', diagnosticFeedback: 'With Bilal (He), add -s/-es to Present Simple verbs.' },
					{ text: 'Bilal wakes up early and gos to school at 7:30.', diagnosticFeedback: 'go takes -es (goes), not -s.' },
					{ text: 'Bilal waking up early and going to school at 7:30.', diagnosticFeedback: 'Daily routine uses Present Simple, not bare -ing.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Write the following times in full words:\n1) 07:00 = It is ......\n2) 08:30 = It is ......',
				task1Ans: '1) seven o\'clock   2) half past eight',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the Present Simple:\nOmar always (pray) ...... Fajr. He (have) ...... breakfast with his family, and he (study) ...... English at school.',
				task2Ans: 'prays / has / studies',
				phonWords: 'helps — prays — watches — sleeps',
				sWords: ['helps', 'sleeps'],
				zWords: ['prays'],
				izWords: ['watches'],
				quizQ: 'How is final "-s" pronounced in the verb "watches"?',
				correctOpt: '/iz/',
				distractors: [
					{ text: '/s/', diagnosticFeedback: 'ch is a sibilant sound and takes /iz/.' },
					{ text: '/z/', diagnosticFeedback: 'Verbs ending in ch take /iz/, not /z/.' },
					{ text: 'Silent', diagnosticFeedback: 'Final -es in watches is always pronounced /iz/.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Reorder the words to get two correct sentences:\n1) always / My / reads / father / the Quran / .\n2) never / late / is / Karim / .',
				task1Ans: '1) My father always reads the Quran.\n2) Karim is never late.',
				task2Prompt:
					'Task 2 (03 pts): Complete with (at / on / in) and the right verb form:\n1) ...... Sunday, classes (start) ...... at 8:00.\n2) Ines (not / watch) ...... screens ...... night.',
				task2Ans: '1) On Sunday, classes start at 8:00.\n2) Ines does not (doesn\'t) watch screens at night.',
				phonWords: 'desks — schools — finishes — speaks',
				sWords: ['desks', 'speaks'],
				zWords: ['schools'],
				izWords: ['finishes'],
				quizQ: 'Choose the right preposition: "We have sports ...... Tuesday ...... the morning."',
				correctOpt: 'on / in',
				distractors: [
					{ text: 'in / on', diagnosticFeedback: 'Days of the week take on, and parts of the day take in.' },
					{ text: 'at / on', diagnosticFeedback: 'at is for exact clock times, not days of the week.' },
					{ text: 'on / at', diagnosticFeedback: 'morning takes in (in the morning), not at.' }
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
			instruction: 'Do the following activities carefully:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the following words according to the pronunciation of final "-s": (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
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
				'at للساعات وكلمة night، و on لأيام الأسبوع، و in لفترات اليوم.',
				'مع He / She / It نضيف -s أو -es أو -ies في المضارع البسيط.',
				'في نطق -s: /s/ بعد (p, t, k, f)، و /iz/ بعد (s, sh, ch, x, z, ge)، و /z/ بعد البقية.'
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
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — Continuous, must/must not & -s
// ═══════════════════════════════════════════════════════════════════════════════
const exploration1amT2Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t2_expl_continuous_must',
	grade: '1am',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): المضارع المستمر وقواعد المدرسة (must / must not)',
	curriculumLessonId: 'eng_lesson_1am_t2_school_rules_continuous',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete the school rules with (must) or (must not):\n1) Pupils ...... listen to their teachers.\n2) Pupils ...... write on the classroom walls.\n3) We ...... keep our school clean.\n4) We ...... arrive late to class.',
				task1Ans: '1) must   2) must not   3) must   4) must not',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs between brackets in the Present Continuous:\n1) Look! The teacher (write) ...... the date on the board.\n2) Right now, the pupils (read) ...... the text.\n3) I (do) ...... my English exercise now.',
				task2Ans: '1) is writing   2) are reading   3) am doing',
				phonWords: 'stops — rooms — classes — cats',
				sWords: ['stops', 'cats'],
				zWords: ['rooms'],
				izWords: ['classes'],
				quizQ: 'Complete the sentence: "Look! Meriem ...... a book in the library right now."',
				correctOpt: 'is reading',
				distractors: [
					{ text: 'reads', diagnosticFeedback: 'Look! and right now require Present Continuous.' },
					{ text: 'are reading', diagnosticFeedback: 'Meriem is singular and takes is, not are.' },
					{ text: 'reading', diagnosticFeedback: 'Do not forget the auxiliary verb is before reading.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with (must) or (must not):\n1) You ...... raise your hand before speaking.\n2) You ...... chew gum in the classroom.\n3) You ...... do your homework regularly.\n4) You ...... shout in the school corridors.',
				task1Ans: '1) must   2) must not   3) must   4) must not',
				task2Prompt:
					'Task 2 (03 pts): Turn these sentences into the Present Continuous:\n1) Sami (clean) ...... the board now.\n2) Amina and Salma (revise) ...... their lesson at the moment.\n3) We (listen) ...... carefully to our teacher.',
				task2Ans: '1) is cleaning   2) are revising   3) are listening',
				phonWords: 'books — teachers — boxes — notebooks',
				sWords: ['books', 'notebooks'],
				zWords: ['teachers'],
				izWords: ['boxes'],
				quizQ: 'Choose the grammatically correct school rule:',
				correctOpt: 'Pupils must not throw papers on the floor.',
				distractors: [
					{ text: 'Pupils must not to throw papers on the floor.', diagnosticFeedback: 'Never put "to" after must / must not.' },
					{ text: 'Pupils must not throws papers on the floor.', diagnosticFeedback: 'Always use the base verb after must not.' },
					{ text: 'Pupils must not throwing papers on the floor.', diagnosticFeedback: 'Do not add -ing after must not.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Match the school place with its activity:\n1) Library : ......   2) Science Lab : ......   3) Courtyard : ......   4) Classroom : ...... (Choices: reading books, doing experiments, playing during break, attending lessons)',
				task1Ans: '1) reading books   2) doing experiments   3) playing during break   4) attending lessons',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the Present Continuous:\n1) Listen! The school bell (ring) ...... now.\n2) The boys (stand) ...... in line in the yard.\n3) My friend (sit) ...... next to me.',
				task2Ans: '1) is ringing   2) are standing   3) is sitting',
				phonWords: 'writes — prayers — brushes — maps',
				sWords: ['writes', 'maps'],
				zWords: ['prayers'],
				izWords: ['brushes'],
				quizQ: 'What is the correct -ing spelling of the verb "sit"?',
				correctOpt: 'sitting',
				distractors: [
					{ text: 'siting', diagnosticFeedback: 'Short CVC verbs like sit double the final consonant: sitting.' },
					{ text: 'sitteing', diagnosticFeedback: 'There is no letter e before -ing in sitting.' },
					{ text: 'sits', diagnosticFeedback: 'sits is Present Simple, not Present Continuous.' }
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
			instruction: 'Answer the following grammar and pronunciation tasks:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify these words according to final "-s" pronunciation: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
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
				'استعمل must للواجبات المدرسية و must not للممنوعات متبوعتين بمصدر مجرد.',
				'المضارع المستمر يتكون من (am / is / are + Verb-ing).',
				'تحقق من الحرف المنطوق الأخير قبل (-s) لتصنيف الكلمات في الجدول.'
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
// Template 4: Part Two — Situation of Integration (06 pts) — Routine & School
// ═══════════════════════════════════════════════════════════════════════════════
const written1amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1am_t2_written_routine_school',
	grade: '1am',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: وصف روتيني اليومي أو قواعد مدرستي (06 نقاط)',
	curriculumLessonId: 'eng_lesson_1am_t2_time_present_simple',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Write a short paragraph describing your daily routine on a school day from morning until evening.',
				notes: [
					'06:00: wake up, wash face, pray Fajr',
					'07:00: have breakfast with family',
					'07:30: go to school on foot / 08:00: start lessons',
					'16:00: return home, do homework, read the Quran, sleep early at 21:30'
				],
				topicTwo: 'Write a short list of 5 important school rules using "must" and "must not".',
				modelAnswer:
					'Every school day, I wake up early at six o\'clock. I wash my face and pray Fajr. At seven o\'clock, I have breakfast with my family. Then, I go to school on foot at half past seven, and lessons start at eight o\'clock. In the afternoon, I return home at four o\'clock, do my homework, and read the Quran. I always sleep early at half past nine.',
				quizQ: 'Which sentence correctly describes a daily routine using time prepositions?',
				correctOpt: 'I get up at six o\'clock in the morning and go to school.',
				distractors: [
					{ text: 'I get up on six o\'clock at the morning.', diagnosticFeedback: 'Use at before clock times and in before the morning.' },
					{ text: 'I gets up in six o\'clock on the morning.', diagnosticFeedback: 'With I, use get up (no -s) and at 6:00.' },
					{ text: 'I getting up at six o\'clock.', diagnosticFeedback: 'Daily routine takes Present Simple, not bare -ing.' }
				]
			},
			{
				prompt: 'Your school is preparing a poster about "Good Manners at School". Write a short paragraph presenting your middle school and its rules.',
				notes: [
					'School: clean, 14 classrooms, library, courtyard',
					'Duties (must): arrive on time, respect teachers, keep classroom clean',
					'Prohibitions (must not): throw papers on the floor, shout in class'
				],
				topicTwo: 'Write a short paragraph describing your Friday routine with your family.',
				modelAnswer:
					'My middle school is big and clean. There are fourteen classrooms, a library, and a nice courtyard. In our school, we follow good rules every day. We must arrive on time, respect our teachers, and keep our classroom clean. We must not throw papers on the floor or shout in class. I love my school very much.',
				quizQ: 'Which sentence expresses a positive school duty?',
				correctOpt: 'We must respect our teachers and classmates.',
				distractors: [
					{ text: 'We must not listen to the teacher.', diagnosticFeedback: 'Listening to the teacher is a duty (must), not forbidden.' },
					{ text: 'We must throwing papers on the floor.', diagnosticFeedback: 'Throwing papers is forbidden and must takes base verb.' },
					{ text: 'We musts arrives on time.', diagnosticFeedback: 'Never add -s to must or to the verb after it.' }
				]
			},
			{
				prompt: 'Write a short email to your friend describing your brother\'s or sister\'s daily routine.',
				notes: [
					'Name: Bilal (my brother, 1MS pupil)',
					'Morning: gets up at 6:00, prays Fajr, has breakfast at 7:00',
					'School: goes at 7:30, studies hard',
					'Evening: does homework, helps our parents, never sleeps late'
				],
				topicTwo: 'Write 5 sentences describing what your classmates and teacher are doing in class right now.',
				modelAnswer:
					'Dear friend, Today I want to tell you about my brother Bilal\'s daily routine. He gets up early at six o\'clock and prays Fajr. At seven o\'clock, he has breakfast and goes to school at half past seven. He studies hard at school. In the evening, he does his homework and helps our parents. He never sleeps late. Best wishes, Amine.',
				quizQ: 'When writing about your brother\'s routine (He), which verb forms are right?',
				correctOpt: 'gets up / goes / does / studies',
				distractors: [
					{ text: 'get up / go / do / study', diagnosticFeedback: 'With He / She, Present Simple verbs need -s / -es / -ies.' },
					{ text: 'get ups / gos / dos / studys', diagnosticFeedback: 'Check spelling: gets up, goes, does, studies.' },
					{ text: 'getting up / going / doing / studying', diagnosticFeedback: 'Daily routine uses Present Simple, not bare -ing.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance (2 pts) + Sequencing & Time Expressions (1.5 pts) + Grammar & Verb Conjugation (1.5 pts) + Punctuation & Neatness (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a well-organised paragraph of 5 to 7 sentences:',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't2',
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
				'رتّب أحداث يومك من الصباح إلى المساء باستعمال الساعات وحروف الجر (at / in).',
				'استعمل المضارع البسيط للروتين، و must / must not لقواعد المدرسة.',
				'راجع الحروف الكبيرة وعلامات الترقيم وتصريف الأفعال قبل تسليم الورقة.'
			],
			solutionStepsAr: [
				'ذكر أنشطة الصباح والوقت بدقة (at 6:00, at 7:30).',
				'ذكر أنشطة المدرسة أو القواعد المدرسية بوضوح.',
				'ختم الفقرة بأنشطة المساء والراحة المبكرة.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_1AM_T2: EnglishParameterizedTemplate[] = [
	comprehension1amT2,
	exploration1amT2Main,
	exploration1amT2Alt,
	written1amT2
];
