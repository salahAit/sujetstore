import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Reading Comprehension (7 pts) — Personal Profile, Abilities & Clean Interests
// ═══════════════════════════════════════════════════════════════════════════════
const compProfile3amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t1_comp_profile',
	grade: '3am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (3AM): القدرات والاهتمامات الهادفة والشخصية (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t1_personality_interests',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'A Talented Algerian Pupil',
				name: 'Youssef Benali',
				city: 'Constantine',
				age: 14,
				paragraphs: [
					'Hello! My name is Youssef Benali. I am 14 years old and I am a third-year middle school pupil in Constantine, Algeria. My teachers say that I am calm, honest, and hard-working. I always arrive at school on time and never forget my homework.',
					'I have many useful hobbies. I am very keen on reading books about Muslim scientists and fond of playing chess with my older brother. [[He]] is a university student who helps me revise mathematics every weekend. I can solve difficult puzzles and write neat Arabic calligraphy, but I cannot speak German yet.',
					'In my free time, I often attend the Quran memorization circle at our local mosque. I am also interested in joining our school robotics club because I dream of becoming a helpful engineer for my country.'
				],
				source: 'Adapted from Algerian 3MS Educational Text',
				refWord: 'He',
				refAnswer: 'Youssef older brother (my older brother)',
				q1: 'Where does Youssef live and what is his personality like?',
				a1: 'He lives in Constantine, Algeria. He is calm, honest, and hard-working.',
				q2: 'What can Youssef do, and what can he not do yet?',
				a2: 'He can solve difficult puzzles and write neat Arabic calligraphy, but he cannot speak German yet.',
				tf1Q: 'Youssef is a lazy pupil who arrives late to school.',
				tf1A: 'False',
				tf1C: 'He is hard-working and always arrives at school on time.',
				tf2Q: 'Youssef is keen on reading books about Muslim scientists.',
				tf2A: 'True',
				tf3Q: 'Youssef wants to become an engineer in the future.',
				tf3A: 'True',
				synTarget: 'diligent (paragraph 1)',
				synAns: 'hard-working',
				oppTarget: 'easy (paragraph 2)',
				oppAns: 'difficult',
				mcqCorrect: 'Youssef is a hard-working pupil from Constantine who enjoys reading, chess, and calligraphy.',
				mcqWrong1: 'Youssef lives in Oran and dislikes studying mathematics.',
				mcqWrong2: 'Youssef speaks German fluently and never goes to the mosque.',
				mcqWrong3: 'Youssef is messy and prefers wasting time instead of revising.'
			},
			{
				title: 'Meriem, a Keen Young Reader',
				name: 'Meriem Mansouri',
				city: 'Tlemcen',
				age: 13,
				paragraphs: [
					'My name is Meriem Mansouri. I am 13 years old and I live with my family in Tlemcen. I am a polite, tidy, and sociable girl. Every morning, I always help my mother prepare breakfast before I walk to my middle school.',
					'I am fond of reading Islamic history and keen on writing short educational stories. My school library is my favourite place; [[it]] contains hundreds of inspiring books. I can recite several surahs of the Quran clearly and I can draw traditional Algerian patterns, but I cannot swim yet.',
					'At weekends, I usually visit my grandparents and help my younger sister with English vocabulary. My classmates appreciate me because I am always patient and generous.'
				],
				source: 'Adapted from Algerian 3MS Educational Text',
				refWord: 'it',
				refAnswer: 'My school library (Meriem school library)',
				q1: 'How old is Meriem and what is she like?',
				a1: 'She is 13 years old. She is polite, tidy, sociable, patient, and generous.',
				q2: 'What is Meriem fond of and keen on?',
				a2: 'She is fond of reading Islamic history and keen on writing short educational stories.',
				tf1Q: 'Meriem never helps her mother in the morning.',
				tf1A: 'False',
				tf1C: 'She always helps her mother prepare breakfast every morning.',
				tf2Q: 'Meriem can draw traditional Algerian patterns.',
				tf2A: 'True',
				tf3Q: 'Meriem can swim very well.',
				tf3A: 'False',
				tf3C: 'She cannot swim yet.',
				synTarget: 'clean and organized (paragraph 1)',
				synAns: 'tidy',
				oppTarget: 'selfish (paragraph 3)',
				oppAns: 'generous',
				mcqCorrect: 'Meriem is a polite and tidy pupil from Tlemcen who loves reading history and writing stories.',
				mcqWrong1: 'Meriem is a university student who lives in Algiers.',
				mcqWrong2: 'Meriem is selfish and refuses to help her younger sister.',
				mcqWrong3: 'Meriem is an expert swimmer who hates libraries.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'أعد قراءة الفقرة الأولى للتحقق من المدينة والميول.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'النص يذكر عكس هذه المعلومة بوضوح.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'صفات الشخصية في النص إيجابية تماماً.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read the text "${variant.title}" carefully. Which sentence best summarizes the passage?`,
				questionTextAr: `اقرأ نص "${variant.title}" ثم اختر الفكرة العامة الصحيحة:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: Reading Comprehension (07 pts)',
				points: 7,
				instruction: 'Read the text carefully and do the following activities:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Task 1: Read the text and answer the following questions (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, c: variant.tf1C, mark: '1' },
							{ q: variant.tf2Q, a: variant.tf2A, mark: '1' },
							{ q: variant.tf3Q, a: variant.tf3A, c: variant.tf3C, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `Task 3: What does the underlined word "${variant.refWord}" in paragraph 2 refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAnswer}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Task 4 (Lexis): Find in the text (01 pt):\n  a) A word closest in meaning to: ${variant.synTarget} = ......\n  b) A word opposite in meaning to: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synTarget} = ${variant.synAns}\nb) ${variant.oppTarget} = ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'اقرأ النص مرتين واستخرج الكلمات المفتاحية (الاسم، المدينة، الصفات، الهوايات).',
				'في سؤال الضمير المسطّر (reference word)، اقرأ الجملة التي قبله مباشرة.',
				'في المرادف والضد التزم بالفقرة المحددة بين قوسين.'
			],
			solutionStepsAr: [
				`الجواب الأول: ${variant.a1}`,
				`الجواب الثاني: ${variant.a2}`,
				`الضمير "${variant.refWord}" يعود على: ${variant.refAnswer}.`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}.`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language (7 pts) — can / cannot, Frequency Adverbs & Final -s
// ═══════════════════════════════════════════════════════════════════════════════
const langAbilityFreq3amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t1_lang_ability_freq',
	grade: '3am',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة (3AM): القدرة (can)، ظروف التكرار، و -ing والنهاية -s (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t1_ability_can_cant',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				s1Prompt: '1) Salma (can / speak) Arabic and English, but she (cannot / speak) Chinese.',
				s1Ans: '1) Salma can speak Arabic and English, but she cannot speak Chinese.',
				s2Prompt: '2) Karim is keen on (read) history books and fond of (play) chess.',
				s2Ans: '2) Karim is keen on reading history books and fond of playing chess.',
				freq1Q: 'a) Bilal helps his parents at home. (always)',
				freq1A: 'a) Bilal always helps his parents at home.',
				freq2Q: 'b) Our classmates are polite and respectful. (usually)',
				freq2A: 'b) Our classmates are usually polite and respectful.',
				freq3Q: 'c) Amine arrives late to class. (never)',
				freq3A: 'c) Amine never arrives late to class.',
				phonoWords: ['books', 'reads', 'watches', 'helps', 'plays', 'boxes'],
				colS: ['books', 'helps'],
				colZ: ['reads', 'plays'],
				colIz: ['watches', 'boxes'],
				mcqPrompt: 'Choose the correct sentence combining a frequency adverb and verb to be:',
				mcqCorrect: 'Our teacher is always patient with pupils.',
				mcqD1: 'Our teacher always is patient with pupils.',
				mcqD2: 'Our teacher is patient always with pupils.',
				mcqD3: 'Our teacher are always patient with pupils.'
			},
			{
				s1Prompt: '1) Tariq (can / solve) geometry problems, but he (cannot / drive) a car.',
				s1Ans: '1) Tariq can solve geometry problems, but he cannot drive a car.',
				s2Prompt: '2) Asma is interested in (learn) calligraphy and fond of (draw) landscapes.',
				s2Ans: '2) Asma is interested in learning calligraphy and fond of drawing landscapes.',
				freq1Q: 'a) Meriem revises her lessons after Maghrib. (often)',
				freq1A: 'a) Meriem often revises her lessons after Maghrib.',
				freq2Q: 'b) Omar is tidy and serious in class. (always)',
				freq2A: 'b) Omar is always tidy and serious in class.',
				freq3Q: 'c) We waste clean water at school. (never)',
				freq3A: 'c) We never waste clean water at school.',
				phonoWords: ['speaks', 'friends', 'washes', 'writes', 'days', 'classes'],
				colS: ['speaks', 'writes'],
				colZ: ['friends', 'days'],
				colIz: ['washes', 'classes'],
				mcqPrompt: 'Choose the grammatically correct sentence with "can" and "keen on":',
				mcqCorrect: 'Nadia can draw maps and is keen on reading science books.',
				mcqD1: 'Nadia cans draw maps and is keen on read science books.',
				mcqD2: 'Nadia can to draw maps and is keen on reading science books.',
				mcqD3: 'Nadia can draws maps and is keen on reads science books.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'راجع قاعدة موضع ظرف التكرار أو الفعل الناقص can.' },
				{ text: set.mcqD2, diagnosticFeedback: 'انتبه لموضع الكلمة ولحذف to بعد can.' },
				{ text: set.mcqD3, diagnosticFeedback: 'راجع تطابق الفاعل والفعل وعدم إضافة -s بعد can.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: set.mcqPrompt,
				questionTextAr: 'اختر الجملة الإنجليزية السليمة نحوياً:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: set.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Complete the following grammar and pronunciation tasks:',
				content: [
					{
						type: 'text',
						content: `Task 1: Write the correct form of the verbs in brackets (02 pts):\n  ${set.s1Prompt}\n  ${set.s2Prompt}`,
						answer: `${set.s1Ans}\n${set.s2Ans}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `Task 2: Rewrite the sentences putting the frequency adverb in the right place (03 pts):\n  ${set.freq1Q}\n  ${set.freq2Q}\n  ${set.freq3Q}`,
						answer: `${set.freq1A}\n${set.freq2A}\n${set.freq3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Task 3: Classify the following words according to the pronunciation of their final "-s" (02 pts):\nWords: ${set.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/s/', words: set.colS, mark: '0.5' },
							{ header: '/z/', words: set.colZ, mark: '0.5' },
							{ header: '/iz/', words: set.colIz, mark: '1' }
						]
					})
				]
			},
			hints: [
				'بعد (can / cannot) يبقى الفعل مجرداً تماماً، وبعد (keen on / fond of / interested in) نضيف (-ing).',
				'ظرف التكرار يأتي قبل الفعل الرئيسي وبعد الفعل المساعد (am / is / are).',
				'للنهاية -s: بعد (p, t, k, f) = /s/، وبعد (s, sh, ch, x, z, ge) = /iz/، والباقي = /z/.'
			],
			solutionStepsAr: [
				set.s1Ans,
				set.s2Ans,
				`${set.freq1A} | ${set.freq2A} | ${set.freq3A}`,
				`/s/: ${set.colS.join(', ')} | /z/: ${set.colZ.join(', ')} | /iz/: ${set.colIz.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language (7 pts) — Personality Opposites, Questions & Phonology
// ═══════════════════════════════════════════════════════════════════════════════
const langPersonalityPhonology3amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t1_lang_personality_phonology',
	grade: '3am',
	trimesterId: 't1',
	domain: 'phonology_pronunciation',
	titleAr: 'قواعد اللغة (3AM): أضداد صفات الشخصية، صياغة الأسئلة، ونطق can و -s (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t1_pronunciation_can_final_s',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				spotWrong: 'Spot and correct TWO mistakes in the sentence: "Sami cans speaks English and he is fond in reading."',
				spotFix: 'Sami can speak English and he is fond of reading. (Mistakes: cans speaks becomes can speak; fond in becomes fond of).',
				opposites: [
					{ adj: 'polite', opp: 'impolite' },
					{ adj: 'hard-working', opp: 'lazy' },
					{ adj: 'honest', opp: 'dishonest' },
					{ adj: 'tidy', opp: 'messy' }
				],
				qPrompt: 'Ask questions for the underlined answers:\n  a) I visit the public library twice a week.\n  b) Yes, Amine can fix bicycles.',
				qAns: 'a) How often do you visit the public library?\nb) Can Amine fix bicycles?',
				phonoWords: ['stops', 'calls', 'teaches', 'likes', 'bags', 'fixes'],
				colS: ['stops', 'likes'],
				colZ: ['calls', 'bags'],
				colIz: ['teaches', 'fixes'],
				mcqQuestion: 'In which word is the final "-s" pronounced /iz/?',
				mcqCorrect: 'teaches',
				mcqD1: 'stops',
				mcqD2: 'calls',
				mcqD3: 'bags'
			},
			{
				spotWrong: 'Spot and correct TWO mistakes in the sentence: "Does she can to swim, and how often she plays chess?"',
				spotFix: 'Can she swim, and how often does she play chess? (Mistakes: Does she can to becomes Can she; she plays becomes does she play).',
				opposites: [
					{ adj: 'generous', opp: 'selfish' },
					{ adj: 'shy', opp: 'sociable' },
					{ adj: 'calm', opp: 'nervous' },
					{ adj: 'helpful', opp: 'unhelpful' }
				],
				qPrompt: 'Ask questions for the following answers:\n  a) He is kind, honest, and patient.\n  b) She practises calligraphy every Friday.',
				qAns: 'a) What is he like?\nb) How often does she practise calligraphy?',
				phonoWords: ['maps', 'pens', 'bridges', 'cats', 'rooms', 'dishes'],
				colS: ['maps', 'cats'],
				colZ: ['pens', 'rooms'],
				colIz: ['bridges', 'dishes'],
				mcqQuestion: 'In which word is the final "-s" pronounced /s/?',
				mcqCorrect: 'maps',
				mcqD1: 'pens',
				mcqD2: 'bridges',
				mcqD3: 'dishes'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تحقق من الصوت الأخير قبل -s في هذه الكلمة.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'هذه الكلمة تنتمي إلى عمود صوتي مختلف.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'راجع قاعدة الأصوات المهموسة والصفيرية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الكلمة الموافقة للصوت المطلوب في النهاية -s:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'Part One: Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Do the following language tasks carefully:',
				content: [
					{
						type: 'text',
						content: `Task 1: ${variant.spotWrong} (02 pts)`,
						answer: variant.spotFix,
						mark: '2'
					},
					{
						type: 'table',
						headers: ['Personality Adjective', 'Opposite (Antonym)'],
						cells: [],
						rows: variant.opposites.map((o) => [
							{ content: o.adj, bold: true },
							{ content: '....................', answer: o.opp, mark: '0.25' }
						]),
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `Task 3: ${variant.qPrompt} (02 pts)`,
						answer: variant.qAns,
						mark: '2'
					},
					{
						type: 'text',
						content: `Task 4: Classify the words according to their final "-s" sound (02 pts):\nWords: ${variant.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/s/', words: variant.colS, mark: '0.5' },
							{ header: '/z/', words: variant.colZ, mark: '0.5' },
							{ header: '/iz/', words: variant.colIz, mark: '1' }
						]
					})
				]
			},
			hints: [
				'استعمل (What is he/she like?) للسؤال عن صفات الشخصية، و (How often do/does...?) للتكرار.',
				'تذكّر التلازم الصحيح: fond of، keen on، interested in.',
				'انطق آخر صوت قبل -s لتحديد العمود الصحيح.'
			],
			solutionStepsAr: [
				variant.spotFix,
				variant.opposites.map((o) => `${o.adj} / ${o.opp}`).join(' | '),
				variant.qAns,
				`/s/: ${variant.colS.join(', ')} | /z/: ${variant.colZ.join(', ')} | /iz/: ${variant.colIz.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (6 pts) — Personal Profile / Letter to a Pen-Friend
// ═══════════════════════════════════════════════════════════════════════════════
const writePersonalProfile3amT1: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t1_write_personal_profile',
	grade: '3am',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة بطاقة شخصية عن القدرات والاهتمامات والشخصية (6 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t1_personality_interests',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const profile = rng.pick([
			{
				name: 'Bilal',
				city: 'Setif',
				age: 14,
				traits: 'calm, honest, and hard-working',
				canDo: 'solve maths puzzles and write Arabic calligraphy',
				cannotDo: 'speak Spanish yet',
				interests: 'reading history books, playing chess, and joining the science club',
				routine: 'always pray on time and usually revise lessons in the evening'
			},
			{
				name: 'Khadidja',
				city: 'Oran',
				age: 13,
				traits: 'polite, tidy, and helpful',
				canDo: 'recite the Quran clearly and design neat posters',
				cannotDo: 'ride a horse yet',
				interests: 'writing short stories, learning English, and helping at home',
				routine: 'always help my parents and often visit the school library'
			}
		]);

		const modelAnswer = `Hello! My name is ${profile.name} and I am ${profile.age} years old. I live in ${profile.city}, Algeria, and I am a third-year middle school pupil. My family and teachers say that I am ${profile.traits}. Every day, I ${profile.routine}. I can ${profile.canDo}, but I cannot ${profile.cannotDo}. In my free time, I am very keen on ${profile.interests}. I hope to hear from you soon!`;

		const mcq = buildUniqueMcqOptions(
			'Introduce yourself, describe personality traits, state abilities with can/cannot, and mention clean interests with frequency adverbs.',
			[
				{ text: 'Write only a list of five unrelated English words without verbs.', diagnosticFeedback: 'الوضعية الإدماجية تتطلب فقرة مترابطة بجمل كاملة.' },
				{ text: 'Use only Past Simple verbs to describe future plans.', diagnosticFeedback: 'البطاقة الشخصية تستعمل الحاضر البسيط و can و keen on.' },
				{ text: 'Ignore the given notes and write about an unrelated topic.', diagnosticFeedback: 'الالتزام بالموضوع والملاحظات أساسي لنيل علامة الملاءمة (Relevance).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'What are the essential elements for a full-mark 3MS Personal Profile paragraph?',
				questionTextAr: 'ما العناصر الأساسية لنجاح الوضعية الإدماجية (البطاقة الشخصية) في 3AM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'يجب تقديم النفس، ذكر صفات الشخصية، توظيف can/cannot، والاهتمامات بـ keen on/fond of مع ظروف التكرار.'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration (06 pts)',
				points: 6,
				instruction: 'Write a short, well-organized paragraph (8 to 10 lines):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `You have a new pen-friend from another country who wants to know about you. Write a short letter introducing yourself (${profile.name}, ${profile.age}, from ${profile.city}).`,
						topicOneNotes: [
							`Identity: ${profile.name}, ${profile.age} years old, 3MS pupil from ${profile.city}, Algeria`,
							`Personality traits: ${profile.traits}`,
							`Daily routine (frequency adverbs): ${profile.routine}`,
							`Abilities (can / cannot): can ${profile.canDo}; cannot ${profile.cannotDo}`,
							`Clean interests (keen on / fond of + V-ing): ${profile.interests}`
						],
						topicTwoPrompt:
							'Write a short paragraph describing your best friend at school: his or her personality traits, abilities, daily habits, and useful hobbies.',
						modelAnswer,
						rubricSummary:
							'Relevance (2 pts) + Coherence & Organization (1.5 pts) + Grammar & Vocabulary Accuracy (1.5 pts) + Mechanics & Neatness (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'ابدأ بتحية لطيفة وتعريف واضح بالاسم والسن والمدينة.',
				'وظّف على الأقل جملتين بـ (can / cannot) وظرفي تكرار (always / usually).',
				'اختم بذكر اهتماماتك النافعة باستعمال (keen on / fond of + V-ing).'
			],
			solutionStepsAr: [
				'الخطوة 1: التحية والتعريف بالاسم والسن والمدينة.',
				'الخطوة 2: ذكر ثلاث صفات شخصية إيجابية والروتين اليومي بظروف التكرار.',
				'الخطوة 3: توظيف can / cannot والاهتمامات بـ keen on / fond of + V-ing.'
			],
			finalAnswer: modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T1: EnglishParameterizedTemplate[] = [
	compProfile3amT1,
	langAbilityFreq3amT1,
	langPersonalityPhonology3amT1,
	writePersonalProfile3amT1
];
