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
// 1. BEM Reading Comprehension 1 (7 pts) — School Memories & Mentorship
// ═══════════════════════════════════════════════════════════════════════════════
const compSchoolMemories4amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t2_comp_school_memories',
	grade: '4am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (BEM): ذكريات المدرسة والشخصية وتجارب الحياة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t2_present_perfect',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'The Most Unforgettable Teacher of My Childhood',
				paragraphs: [
					'As I prepare for my BEM exam this year, I often remember my fifth-year primary teacher, Mr. Brahim. He was the kindest and most patient mentor I have ever met. When I was ten, I used to be very shy and afraid of speaking in front of my classmates.',
					'One winter morning, while I was reading a short story nervously in class, I stopped because I forgot a line. Instead of scolding me, Mr. Brahim smiled warmly and encouraged me to finish slowly. [[That moment]] changed my personality completely; since 2022, I have become much more confident and sociable.',
					'Today, I have already won two school reading contests, and I dream of becoming an English teacher so I can inspire young Algerian pupils just like Mr. Brahim inspired me.'
				],
				source: 'Adapted from Algerian 4MS School Memoirs',
				refWord: 'That moment',
				refAns: 'When Mr. Brahim smiled warmly and encouraged the narrator to finish reading slowly',
				q1: 'What was the narrator personality like at the age of ten?',
				a1: 'He or she was very shy and afraid of speaking in front of classmates.',
				q2: 'What is the narrator dream career and why?',
				a2: 'To become an English teacher in order to inspire young Algerian pupils just like Mr. Brahim did.',
				tf1Q: 'Mr. Brahim scolded the pupil for forgetting a line.',
				tf1A: 'False',
				tf1C: 'He smiled warmly and encouraged the pupil to finish slowly.',
				tf2Q: 'The narrator has become more confident since 2022.',
				tf2A: 'True',
				tf3Q: 'Mr. Brahim now lives in Oran.',
				tf3A: 'Not Mentioned',
				synTarget: 'calm and tolerant (paragraph 1)',
				synAns: 'patient',
				oppTarget: 'impatient / unkind (paragraph 1 — positive form)',
				oppAns: 'kindest (or patient)',
				mcqCorrect: 'A kind and patient primary teacher helped a shy pupil gain confidence and dream of teaching.',
				mcqD1: 'The narrator hates reading and refuses to sit for the BEM exam.',
				mcqD2: 'Mr. Brahim was an impatient teacher who punished pupils.',
				mcqD3: 'The narrator has never won any school contest.'
			},
			{
				title: 'A Proud Memory from My Quran Circle',
				paragraphs: [
					'Every pupil keeps one golden memory that shapes his or her character forever. For me, the happiest day of my life happened two years ago during the regional Quran recitation competition in Setif.',
					'I had revised every morning after Fajr for six months. While I was waiting for my turn on stage, my hands were shaking slightly, yet my father whispered words of calm and trust in Allah. When I recited clearly without a single mistake, the whole hall applauded warmly. I have never felt such joy before!',
					'This experience taught me discipline, honesty, and perseverance. [[It]] also showed me that careful preparation turns difficult challenges into rewarding achievements.'
				],
				source: 'Adapted from Algerian 4MS School Memoirs',
				refWord: 'It',
				refAns: 'This experience (participating in and succeeding at the Quran recitation competition)',
				q1: 'Where and when did the narrator happiest day happen?',
				a1: 'It happened two years ago during the regional Quran recitation competition in Setif.',
				q2: 'What three values did this experience teach the narrator?',
				a2: 'It taught the narrator discipline, honesty, and perseverance.',
				tf1Q: 'The narrator prepared for the competition for six months.',
				tf1A: 'True',
				tf2Q: 'The narrator made many mistakes while reciting on stage.',
				tf2A: 'False',
				tf2C: 'He or she recited clearly without a single mistake.',
				tf3Q: 'The narrator received a bicycle as a prize.',
				tf3A: 'Not Mentioned',
				synTarget: 'hard / tough (paragraph 3)',
				synAns: 'difficult',
				oppTarget: 'careless (paragraph 3)',
				oppAns: 'careful',
				mcqCorrect: 'Hard work and calm perseverance led the narrator to an unforgettable success in a Quran recitation contest.',
				mcqD1: 'The narrator did not prepare for the competition at all.',
				mcqD2: 'The event took place in London last week.',
				mcqD3: 'The narrator decided never to participate in competitions again.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'النص يؤكد عكس هذه الفكرة بوضوح.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'أعد قراءة الفقرة الأولى والثانية للتحقق من التفاصيل.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'انظر إلى الفقرة الأخيرة لترى النتيجة الإيجابية للتجربة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". What is the main idea of this personal experience?`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر الفكرة الرئيسية:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: A / Reading Comprehension (07 pts)',
				points: 7,
				instruction: 'Read the text carefully and do the following BEM tasks:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Activity 1: Answer the following questions according to the text (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, c: variant.tf1C, mark: '1' },
							{ q: variant.tf2Q, a: variant.tf2A, c: variant.tf2C, mark: '1' },
							{ q: variant.tf3Q, a: variant.tf3A, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `Activity 3: What does the underlined expression "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Activity 4 (Lexis): Find in the text (01 pt):\n  a) Closest in meaning to: ${variant.synTarget} = ......\n  b) Opposite in meaning to: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'في سؤال True / False / Not Mentioned: إن غابت المعلومة تماماً فالإجابة Not Mentioned.',
				'ابحث عن عبارات الزمن (since / while / when) لتتبع تسلسل الذكرى.',
				'راجع الجملة السابقة مباشرة لتحديد معنى العبارة المسطّرة.'
			],
			solutionStepsAr: [
				`a) ${variant.a1} | b) ${variant.a2}`,
				`True/False/NM: ${variant.tf1A}, ${variant.tf2A}, ${variant.tf3A}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. BEM Reading Comprehension 2 (7 pts) — Life Journeys of Approved Scholars
// ═══════════════════════════════════════════════════════════════════════════════
const compScholarJourney4amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t2_comp_scholar_journey',
	grade: '4am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (BEM): رحلات وتجارب العلماء والرحالة المسلمين (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t2_superlative_superiority',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Ibn Battuta: The Greatest Muslim Traveller',
				paragraphs: [
					'Muhammad Ibn Battuta was born in Tangier in 1304 CE. At the age of twenty-one, he set out to perform Hajj to Makkah, little knowing that his journey would last nearly thirty years. During that time, he covered over 117,000 kilometres across North Africa, including Tlemcen and Bejaia in Algeria, as well as Egypt, Arabia, India, and China.',
					'Ibn Battuta was courageous, curious, and deeply respectful of Islamic scholarship. While he was crossing deserts and seas, he met judges, scientists, and ordinary people, recording every detail in his famous travel book "Al-Rihla" (The Journey). [[It]] remains one of the most valuable historical sources about the fourteenth-century world.',
					'Historians have studied Ibn Battuta writings for centuries because they show how determination and curiosity can open doors to knowledge.'
				],
				source: 'Adapted from Islamic Heritage Readings (BEM 4MS)',
				refWord: 'It',
				refAns: 'His famous travel book Al-Rihla (The Journey)',
				q1: 'Why did Ibn Battuta originally leave Tangier at the age of twenty-one?',
				a1: 'He originally left Tangier to perform Hajj to Makkah.',
				q2: 'Which two Algerian cities are mentioned in the text?',
				a2: 'Tlemcen and Bejaia are mentioned in the text.',
				tf1Q: 'Ibn Battuta journey lasted only three years.',
				tf1A: 'False',
				tf1C: 'His journey lasted nearly thirty years.',
				tf2Q: 'He recorded his observations in a book called Al-Rihla.',
				tf2A: 'True',
				tf3Q: 'Ibn Battuta travelled by modern airplane.',
				tf3A: 'False',
				tf3C: 'He lived in the fourteenth century and crossed deserts and seas.',
				synTarget: 'brave (paragraph 2)',
				synAns: 'courageous',
				oppTarget: 'unusual / rare (paragraph 2)',
				oppAns: 'ordinary',
				mcqCorrect: 'Ibn Battuta travelled for nearly thirty years across Africa and Asia and preserved his experiences in Al-Rihla.',
				mcqD1: 'Ibn Battuta never left his hometown of Tangier.',
				mcqD2: 'Ibn Battuta refused to meet scholars or write about his journeys.',
				mcqD3: 'Al-Rihla was written in the twenty-first century.'
			},
			{
				title: 'Sheikh Moubarek El Mili: Historian of Algeria',
				paragraphs: [
					'Sheikh Moubarek El Mili was one of the most respected Algerian historians and reformist scholars. Born in El Milia (Jijel) in 1898, he showed an extraordinary love for books and Arabic knowledge from childhood. He later studied in Constantine under Imam Abdelhamid Ben Badis and at Al-Zaytuna University.',
					'Sheikh El Mili was humble, honest, and tirelessly dedicated to teaching youth. While he was teaching and lecturing in Laghouat and Mila, he spent years researching archives to write his monumental book "History of Algeria in Ancient and Modern Times". [[He]] proved that Algeria had a deep, continuous civilization long before colonial rule.',
					'Although he passed away in 1945, his books have remained among the most trusted references for Algerian students ever since.'
				],
				source: 'Adapted from Algerian Scholars Heritage (BEM 4MS)',
				refWord: 'He',
				refAns: 'Sheikh Moubarek El Mili',
				q1: 'Where was Sheikh Moubarek El Mili born and under whom did he study in Constantine?',
				a1: 'He was born in El Milia (Jijel) in 1898, and he studied under Imam Abdelhamid Ben Badis in Constantine.',
				q2: 'What is the title of his monumental history book?',
				a2: 'History of Algeria in Ancient and Modern Times.',
				tf1Q: 'Sheikh Moubarek El Mili was arrogant and disliked teaching.',
				tf1A: 'False',
				tf1C: 'He was humble, honest, and tirelessly dedicated to teaching youth.',
				tf2Q: 'He taught and lectured in Laghouat and Mila.',
				tf2A: 'True',
				tf3Q: 'His books are still trusted references for Algerian students.',
				tf3A: 'True',
				synTarget: 'modest (paragraph 2)',
				synAns: 'humble',
				oppTarget: 'ancient (paragraph 2)',
				oppAns: 'modern',
				mcqCorrect: 'Sheikh Moubarek El Mili was a humble Algerian scholar who wrote a landmark history of Algeria.',
				mcqD1: 'Sheikh Moubarek El Mili lived in the fourteenth century.',
				mcqD2: 'Sheikh Moubarek El Mili never wrote any books about Algeria.',
				mcqD3: 'Sheikh Moubarek El Mili was born in Tunis in 1945.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تأكد من القرن والمدة الزمنية المذكورة في الفقرة الأولى.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'النص يبرز بوضوح مؤلفه الشهير وإنجازاته.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'تحقق من مكان وسنة الميلاد في الفقرة الأولى.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Choose the statement that accurately matches the text:`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر العبارة المطابقة للنص:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: A / Reading Comprehension (07 pts)',
				points: 7,
				instruction: 'Read the text carefully and do the following BEM activities:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Activity 1: Answer the following questions (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
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
						content: `Activity 3: What does the underlined word "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAns}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Activity 4 (Lexis): Find in the text (01 pt):\n  a) Synonym of: ${variant.synTarget} = ......\n  b) Opposite of: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج الصفات الشخصية والإنجازات الزمنية من الفقرتين الأولى والثانية.',
				'صحّح العبارات الخاطئة (False) بدقة من النص.',
				'ابحث عن المرادف والضد داخل الفقرة المشار إليها.'
			],
			solutionStepsAr: [
				`a) ${variant.a1} | b) ${variant.a2}`,
				`مرجع "${variant.refWord}": ${variant.refAns}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. BEM Mastery of Language 1 (7 pts) — Superlative, Present Perfect, Past Cont & -s
// ═══════════════════════════════════════════════════════════════════════════════
const langSuperlativePerf4amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t2_lang_superlative_perf',
	grade: '4am',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة (BEM): التفضيل الأعلى، المضارع التام (since/for)، الماضي المستمر ونطق -s (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t2_present_perfect',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				sup1Q: 'a) Djamaa El Djazair has (tall) ...... minaret in the world, and it is (good) ...... architectural project in modern Algeria.',
				sup1A: 'a) Djamaa El Djazair has the tallest minaret in the world, and it is the best architectural project in modern Algeria.',
				sup2Q: 'b) My history teacher is (inspiring) ...... person I have ever met.',
				sup2A: 'b) My history teacher is the most inspiring person I have ever met.',
				tense1Q: 'a) Meriem (study) ...... English (since / for) four years, and she (never / fail) ...... an exam.',
				tense1A: 'a) Meriem has studied English for four years, and she has never failed an exam.',
				tense2Q: 'b) While I (read) ...... Ibn Battuta book, my father (enter) ...... the room.',
				tense2A: 'b) While I was reading Ibn Battuta book, my father entered the room.',
				sWords: ['monuments', 'memories', 'experiences', 'mosques', 'scholars', 'bridges'],
				colS: ['monuments', 'mosques'],
				colZ: ['memories', 'scholars'],
				colIz: ['experiences', 'bridges'],
				mcqQ: 'Choose the correct Present Perfect sentence with "since" or "for":',
				mcqCorrect: 'Youssef has lived in Constantine since 2018.',
				mcqD1: 'Youssef has lived in Constantine for 2018.',
				mcqD2: 'Youssef have lived in Constantine since 2018.',
				mcqD3: 'Youssef has live in Constantine since 2018.'
			},
			{
				sup1Q: 'a) Winning the school prize was (happy) ...... day and (unforgettable) ...... memory of my childhood.',
				sup1A: 'a) Winning the school prize was the happiest day and the most unforgettable memory of my childhood.',
				sup2Q: 'b) Telling lies is (bad) ...... habit a pupil can have.',
				sup2A: 'b) Telling lies is the worst habit a pupil can have.',
				tense1Q: 'a) Have you ever (visit) ...... Timgad? — Yes, I (just / return) ...... from Batna!',
				tense1A: 'a) Have you ever visited Timgad? — Yes, I have just returned from Batna!',
				tense2Q: 'b) The pupils (prepare) ...... their posters when the headmaster (arrive) ...... .',
				tense2A: 'b) The pupils were preparing their posters when the headmaster arrived.',
				sWords: ['books', 'stories', 'villages', 'hopes', 'dreams', 'places'],
				colS: ['books', 'hopes'],
				colZ: ['stories', 'dreams'],
				colIz: ['villages', 'places'],
				mcqQ: 'Choose the correct Superlative of Superiority sentence:',
				mcqCorrect: 'Honesty is the best quality of a responsible citizen.',
				mcqD1: 'Honesty is the goodest quality of a responsible citizen.',
				mcqD2: 'Honesty is the most best quality of a responsible citizen.',
				mcqD3: 'Honesty is best quality of a responsible citizen.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'تأكد من استعمال since قبل السنة ومن التفضيل الشاذ the best.' },
				{ text: set.mcqD2, diagnosticFeedback: 'تأكد من has مع المفرد وعدم الجمع بين most و best.' },
				{ text: set.mcqD3, diagnosticFeedback: 'لا تنسَ التصريف الثالث (P.P) وأداة التعريف the في التفضيل.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: set.mcqQ,
				questionTextAr: 'اختر الجملة الصحيحة وفق قواعد الفصل الثاني (BEM):',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: set.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'Part One: B / Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Complete the following BEM grammar and phonology exercises:',
				content: [
					{
						type: 'text',
						content: `Activity 1: Put the adjectives in brackets into the Superlative of Superiority (02.5 pts):\n  ${set.sup1Q}\n  ${set.sup2Q}`,
						answer: `${set.sup1A}\n${set.sup2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Activity 2: Put the verbs into the right tense (Present Perfect / Past Continuous / Past Simple) (02.5 pts):\n  ${set.tense1Q}\n  ${set.tense2Q}`,
						answer: `${set.tense1A}\n${set.tense2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Activity 3: Classify these words according to their final "-s" pronunciation (02 pts):\nWords: ${set.sWords.join(' - ')}`
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
				'في التفضيل: (the + adj-est) للقصيرة، (the most + adj) للطويلة، والشاذة (the best / the worst).',
				'في المضارع التام: since لنقطة البداية (2018)، و for لمدة زمنية (four years).',
				'في النهاية -s: انتبه أن mosques في /s/ و memories/stories في /z/ و experiences/bridges في /iz/.'
			],
			solutionStepsAr: [
				`${set.sup1A} | ${set.sup2A}`,
				`${set.tense1A} | ${set.tense2A}`,
				`/s/: ${set.colS.join(', ')} | /z/: ${set.colZ.join(', ')} | /iz/: ${set.colIz.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. BEM Mastery of Language 2 (7 pts) — Negative Prefixes, -ful/-less & Silent Letters
// ═══════════════════════════════════════════════════════════════════════════════
const langAffixesPhonology4amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t2_lang_affixes_phonology',
	grade: '4am',
	trimesterId: 't2',
	domain: 'vocabulary_morphology',
	titleAr: 'قواعد اللغة (BEM): بادئات الأضداد (un-, in-, im-, il-, ir-, dis-) ولواحق (-ful/-less) والحروف الصامتة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t2_prefixes_suffixes',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prefixRows: [
					{ word: 'polite', opp: 'impolite' },
					{ word: 'honest', opp: 'dishonest' },
					{ word: 'legal', opp: 'illegal' },
					{ word: 'responsible', opp: 'irresponsible' },
					{ word: 'correct', opp: 'incorrect' },
					{ word: 'happy', opp: 'unhappy' }
				],
				sufQ: 'Add "-ful" or "-less" to the nouns in brackets to make meaningful adjectives (02 pts):\n  a) Helping orphans is a (use) ...... and (wonder) ...... deed.\n  b) A (care) ...... pupil forgets homework, while a (hope) ...... one works hard.',
				sufA: 'a) useful, wonderful\nb) careless, hopeful',
				silentWords: ['know', 'honest', 'climb', 'listen', 'should', 'write'],
				c1: { header: 'Silent k / w', words: ['know', 'write'] },
				c2: { header: 'Silent h / b', words: ['honest', 'climb'] },
				c3: { header: 'Silent t / l', words: ['listen', 'should'] },
				mcqQ: 'Choose the right opposite prefix for (patient / regular / loyal):',
				mcqCorrect: 'impatient / irregular / disloyal',
				mcqD1: 'unpatient / inregular / unloyal',
				mcqD2: 'dispatient / irregular / inloyal',
				mcqD3: 'impatient / unregular / illoyal'
			},
			{
				prefixRows: [
					{ word: 'patient', opp: 'impatient' },
					{ word: 'loyal', opp: 'disloyal' },
					{ word: 'literate', opp: 'illiterate' },
					{ word: 'regular', opp: 'irregular' },
					{ word: 'active', opp: 'inactive' },
					{ word: 'fair', opp: 'unfair' }
				],
				sufQ: 'Add "-ful" or "-less" to the nouns in brackets (02 pts):\n  a) Smoking is (harm) ...... to health, whereas reading is very (help) ...... .\n  b) The Casbah is (beauty) ......, and plastic waste makes streets look (taste) ...... .',
				sufA: 'a) harmful, helpful\nb) beautiful, tasteless',
				silentWords: ['knowledge', 'honour', 'doubt', 'castle', 'calm', 'answer'],
				c1: { header: 'Silent k / w', words: ['knowledge', 'answer'] },
				c2: { header: 'Silent h / b', words: ['honour', 'doubt'] },
				c3: { header: 'Silent t / l', words: ['castle', 'calm'] },
				mcqQ: 'Which word contains a silent "b"?',
				mcqCorrect: 'doubt',
				mcqD1: 'bridge',
				mcqD2: 'book',
				mcqD3: 'habit'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'راجع قاعدة الحرف الأول للبادئات (p/m = im، r = ir، l = il) أو الحرف الصامت b.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'تحقق من البادئة الصحيحة لكل صفة أو نطق الكلمة.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'راجع قائمة البادئات الستة والحروف الصامتة في BEM.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة الصحيحة في الصرف أو الحروف الصامتة (BEM):',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'Part One: B / Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Do the following morphology and phonology tasks:',
				content: [
					{
						type: 'table',
						headers: ['Adjective', 'Opposite (using un-, in-, im-, il-, ir-, dis-)'],
						cells: [],
						rows: variant.prefixRows.map((r) => [
							{ content: r.word, bold: true },
							{ content: '....................', answer: r.opp, mark: '0.5' }
						]),
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `Activity 2: ${variant.sufQ}`,
						answer: variant.sufA,
						mark: '2'
					},
					{
						type: 'text',
						content: `Activity 3: Classify these words according to their silent letter (02 pts):\nWords: ${variant.silentWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: variant.c1.header, words: variant.c1.words, mark: '0.5' },
							{ header: variant.c2.header, words: variant.c2.words, mark: '0.75' },
							{ header: variant.c3.header, words: variant.c3.words, mark: '0.75' }
						]
					})
				]
			},
			hints: [
				'انظر لأول حرف في الصفة: p/m تأخذ im-، l تأخذ il-، r تأخذ ir-.',
				'اللاحقة -ful للمعنى الإيجابي/الممتلئ و -less للغياب؛ وتذكّر beauty تصبح beautiful.',
				'الحرف b صامت في climb و doubt؛ و l صامت في should و calm.'
			],
			solutionStepsAr: [
				variant.prefixRows.map((r) => `${r.word} / ${r.opp}`).join(' | '),
				variant.sufA,
				`${variant.c1.header}: ${variant.c1.words.join(', ')} | ${variant.c2.header}: ${variant.c2.words.join(', ')} | ${variant.c3.header}: ${variant.c3.words.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. BEM Written Expression (6 pts) — Unforgettable School Memory & Dream Career
// ═══════════════════════════════════════════════════════════════════════════════
const writeLifeExperience4amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_4am_t2_write_life_experience',
	grade: '4am',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (BEM): ذكرى مدرسية لا تُنسى ومشروع المهنة المستقبلية (6 نقاط)',
	curriculumLessonId: 'eng_lesson_4am_t2_superlative_superiority',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const profile = rng.pick([
			{
				name: 'Amine',
				traits: 'calm, honest, and hard-working',
				teacher: 'Mrs. Nadia, my primary Arabic and Quran teacher',
				memory: 'winning first prize in the school reading contest in Grade 5',
				career: 'paediatrician (children doctor) to treat sick children in my town',
				modelAnswer:
					'My name is Amine, and I am a 4MS pupil preparing for the BEM exam. My family and friends describe me as calm, honest, and hard-working. The most inspiring person I have ever met is Mrs. Nadia, my primary school teacher, because she always encouraged me to believe in my abilities. My best school memory happened in Grade 5: while I was waiting nervously in the school hall, the headmaster announced that I had won first prize in the reading contest! Since that unforgettable day, I have worked even harder. In the future, I dream of becoming a paediatrician so I can help sick children and serve my community with compassion.'
			},
			{
				name: 'Asma',
				traits: 'polite, tidy, and determined',
				teacher: 'Mr. Karim, my middle school English teacher',
				memory: 'presenting a project about Fatima al-Fihri in front of the whole school',
				career: 'architect to restore Algerian Islamic landmarks like The Casbah',
				modelAnswer:
					'My name is Asma, and I am a 4MS pupil in Algeria. I consider myself polite, tidy, and determined. Mr. Karim, my English teacher, is the most patient mentor I have ever had. One of the happiest experiences of my school life happened last year: while I was presenting my project about Fatima al-Fihri, I felt shy at first, yet my teacher encouraged me with a kind smile. I have never forgotten the warm applause of my classmates! Since then, I have become much more confident. My dream career is to become an architect so that I can preserve Algerian Islamic landmarks for future generations.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			'Combine personality traits, Superlatives (the most inspiring / the best), Past Continuous + Past Simple (while/when), and Present Perfect (since / have never forgotten).',
			[
				{ text: 'Write only a list of landmarks without mentioning any personal experience.', diagnosticFeedback: 'الموضوع حول الشخصية والتجربة المدرسية والمهنة المستقبلية.' },
				{ text: 'Use only negative imperatives for the whole essay.', diagnosticFeedback: 'سرد الذكريات يتطلب أزمنة الماضي والمضارع التام وصيغ التفضيل.' },
				{ text: 'Skip the dream career and the inspiring mentor from the notes.', diagnosticFeedback: 'إهمال عناصر المطلوب يُنقص علامة الملاءمة (Relevance).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Which grammar structures best fit a 4MS BEM essay about school memories and dream career?',
				questionTextAr: 'ما التراكيب اللغوية الأنسب لوضعية BEM حول الذكريات المدرسية والمهنة المستقبلية؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'توظيف صيغة التفضيل (the best / the most inspiring)، الماضي المستمر مع البسيط، والمضارع التام (since / have never forgotten).'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration (06 pts)',
				points: 6,
				instruction: 'Write a personal profile and school memory essay for your school yearbook (8 to 12 lines):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `Your middle school is publishing a BEM graduation yearbook. Write a short article as ${profile.name} describing your personality, an inspiring teacher, your best school memory, and your dream career.`,
						topicOneNotes: [
							`Personality traits: ${profile.traits}`,
							`Inspiring mentor (Superlative): ${profile.teacher}`,
							`Unforgettable memory (while / when + Past tenses): ${profile.memory}`,
							`Impact until today (Present Perfect with since / never): more confident and hard-working`,
							`Dream career: ${profile.career}`
						],
						topicTwoPrompt:
							'Write an article about a real or inspiring experience that taught you honesty, perseverance, or helping others, explaining how it shaped your personality today.',
						modelAnswer: profile.modelAnswer,
						rubricSummary:
							'Relevance (2 pts) + Coherence & Flow (1.5 pts) + Superlative / Present Perfect / Past Tenses Accuracy (1.5 pts) + Mechanics & Neatness (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'ابدأ بتعريف مختصر بنفسك وصفات شخصيتك الإيجابية.',
				'استعمل صيغة تفضيل (the most inspiring / the best) وجملة بـ (While + was/were + V-ing).',
				'اربط الماضي بالحاضر بـ (Since then, I have...) واختم بمهنتك المستقبلية.'
			],
			solutionStepsAr: [
				`الشخصية والمعلم الملهم: ${profile.traits} | ${profile.teacher}.`,
				`الذكرى المدرسية: ${profile.memory}.`,
				`الأثر والمهنة المستقبلية: ${profile.career}.`
			],
			finalAnswer: profile.modelAnswer
		};
	}
};

export const TEMPLATES_4AM_T2: EnglishParameterizedTemplate[] = [
	compSchoolMemories4amT2,
	compScholarJourney4amT2,
	langSuperlativePerf4amT2,
	langAffixesPhonology4amT2,
	writeLifeExperience4amT2
];
