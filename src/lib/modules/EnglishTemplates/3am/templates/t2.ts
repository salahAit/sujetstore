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
// 1. Reading Comprehension (7 pts) — Muslim Scientists' Biographies
// ═══════════════════════════════════════════════════════════════════════════════
const compMuslimScientists3amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t2_comp_muslim_scientists',
	grade: '3am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (3AM): سيرة عالم مسلم وإنجازاته العلمية (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t2_relative_pronouns_scientists',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Muhammad ibn Musa al-Khwarizmi: Father of Algebra',
				paragraphs: [
					'Muhammad ibn Musa al-Khwarizmi was a brilliant Muslim mathematician, astronomer, and geographer who lived during the Golden Age of Islamic civilization. He was born around 780 CE in Khwarizm and later moved to Baghdad, where [[he]] worked at the famous House of Wisdom (Bayt al-Hikma).',
					'Al-Khwarizmi wrote a landmark book titled "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala", which founded the science of algebra. He also introduced Hindu-Arabic numerals and the concept of zero to the wider world. Even the modern computer term "algorithm" comes from his Latinized name.',
					'He died around 850 CE, leaving a timeless scientific heritage that shaped mathematics, astronomy, and modern computing across the globe.'
				],
				source: 'Adapted from Islamic Scientific Heritage Series',
				refWord: 'he',
				refAnswer: 'Muhammad ibn Musa al-Khwarizmi',
				q1: 'Where did Al-Khwarizmi work in Baghdad?',
				a1: 'He worked at the famous House of Wisdom (Bayt al-Hikma).',
				q2: 'Which modern computer term comes from Al-Khwarizmi name?',
				a2: 'The modern computer term "algorithm" comes from his name.',
				tf1Q: 'Al-Khwarizmi was a mathematician, astronomer, and geographer.',
				tf1A: 'True',
				tf2Q: 'He founded the science of algebra through his famous book.',
				tf2A: 'True',
				tf3Q: 'Al-Khwarizmi lived in the twentieth century.',
				tf3A: 'False',
				tf3C: 'He was born around 780 CE and died around 850 CE.',
				synTarget: 'well-known (paragraph 1)',
				synAns: 'famous',
				oppTarget: 'ancient (paragraph 2)',
				oppAns: 'modern',
				mcqCorrect: 'Al-Khwarizmi was a Muslim scholar at the House of Wisdom who founded algebra and inspired the term algorithm.',
				mcqWrong1: 'Al-Khwarizmi was a European painter who lived in London.',
				mcqWrong2: 'Al-Khwarizmi never wrote any books on mathematics.',
				mcqWrong3: 'Al-Khwarizmi worked as a sea captain in the twentieth century.'
			},
			{
				title: 'Ibn al-Haytham: Pioneer of Modern Optics',
				paragraphs: [
					'Al-Hasan Ibn al-Haytham was an outstanding Muslim physicist, mathematician, and astronomer who was born in Basra in 965 CE. He later travelled to Cairo, where he conducted careful experiments on light and human vision.',
					'Ibn al-Haytham wrote the famous seven-volume "Book of Optics" (Kitab al-Manazir). In [[it]], he proved that vision happens when light reflects off objects and enters the eye. He also built a dark room with a tiny hole, known as the camera obscura, which laid the foundation for modern photography.',
					'Because he always tested his ideas through observation and experiments, historians consider him a true pioneer of the scientific method. He passed away in Cairo around 1040 CE.'
				],
				source: 'Adapted from Islamic Scientific Heritage Series',
				refWord: 'it',
				refAnswer: 'The Book of Optics (Kitab al-Manazir)',
				q1: 'When and where was Ibn al-Haytham born?',
				a1: 'He was born in Basra in 965 CE.',
				q2: 'What did Ibn al-Haytham prove about human vision?',
				a2: 'He proved that vision happens when light reflects off objects and enters the eye.',
				tf1Q: 'Ibn al-Haytham wrote the famous Book of Optics.',
				tf1A: 'True',
				tf2Q: 'He never tested his ideas with experiments.',
				tf2A: 'False',
				tf2C: 'He always tested his ideas through observation and experiments.',
				tf3Q: 'His dark chamber laid the foundation for modern photography.',
				tf3A: 'True',
				synTarget: 'very small (paragraph 2)',
				synAns: 'tiny',
				oppTarget: 'bright (paragraph 2)',
				oppAns: 'dark',
				mcqCorrect: 'Ibn al-Haytham pioneered optics and the experimental scientific method through his Book of Optics.',
				mcqWrong1: 'Ibn al-Haytham believed that experiments were useless in physics.',
				mcqWrong2: 'Ibn al-Haytham was born in Cairo and wrote only poetry.',
				mcqWrong3: 'Ibn al-Haytham invented the airplane in 1965.'
			},
			{
				title: 'Al-Zahrawi: Pioneer of Surgery',
				paragraphs: [
					'Abu al-Qasim al-Zahrawi was a renowned Muslim physician and surgeon who was born in Al-Andalus near Cordoba in 936 CE. He spent more than fifty years treating patients and teaching medicine with deep compassion.',
					'Al-Zahrawi authored a thirty-volume medical encyclopedia called "Al-Tasrif", which was translated into Latin and taught in European universities for centuries. [[He]] invented over two hundred surgical instruments, including forceps, scalpels, and surgical threads made from natural catgut.',
					'Al-Zahrawi passed away in 1013 CE, and doctors around the world still honour him as the father of modern surgery.'
				],
				source: 'Adapted from Islamic Scientific Heritage Series',
				refWord: 'He',
				refAnswer: 'Abu al-Qasim al-Zahrawi',
				q1: 'What was the name of Al-Zahrawi medical encyclopedia?',
				a1: 'It was called "Al-Tasrif" (a thirty-volume medical encyclopedia).',
				q2: 'How many surgical instruments did Al-Zahrawi invent?',
				a2: 'He invented over two hundred surgical instruments.',
				tf1Q: 'Al-Zahrawi was born near Cordoba in 936 CE.',
				tf1A: 'True',
				tf2Q: 'Al-Tasrif was never translated into any other language.',
				tf2A: 'False',
				tf2C: 'It was translated into Latin and taught in European universities for centuries.',
				tf3Q: 'Al-Zahrawi is honoured as the father of modern surgery.',
				tf3A: 'True',
				synTarget: 'famous (paragraph 1)',
				synAns: 'renowned',
				oppTarget: 'artificial (paragraph 2)',
				oppAns: 'natural',
				mcqCorrect: 'Al-Zahrawi was a pioneering Muslim surgeon who wrote Al-Tasrif and invented over 200 surgical tools.',
				mcqWrong1: 'Al-Zahrawi was an architect who designed bridges in Asia.',
				mcqWrong2: 'Al-Zahrawi worked as a doctor for only two years.',
				mcqWrong3: 'Al-Zahrawi wrote only one short page about plants.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تأكد من تخصص العالم ومكان نشأته في الفقرة الأولى.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'النص يبرز بوضوح مؤلفاته وتجاربه العلمية.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'هذه المعلومة غير مطابقة للوقائع التاريخية في النص.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which statement accurately reflects the text?`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر الملخص الصحيح:`,
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
				instruction: 'Read the biography carefully and answer the questions below:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Task 1: Answer the following questions from the text (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
						answer: `a) ${variant.a1}\nb) ${variant.a2}`,
						mark: '2'
					},
					{
						type: 'true_false',
						items: [
							{ q: variant.tf1Q, a: variant.tf1A, mark: '1' },
							{ q: variant.tf2Q, a: variant.tf2A, c: variant.tf2C, mark: '1' },
							{ q: variant.tf3Q, a: variant.tf3A, c: variant.tf3C, mark: '1' }
						]
					},
					{
						type: 'text',
						content: `Task 3: What does the underlined word "${variant.refWord}" refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAnswer}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Task 4 (Lexis): Find in the text (01 pt):\n  a) Synonym of: ${variant.synTarget} = ......\n  b) Opposite of: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'حدّد التواريخ والأماكن وأسماء الكتب المذكورة في السيرة.',
				'تأكّد من تصحيح العبارة الخاطئة (False) باستعمال جملة مباشرة من النص.',
				'راجع الفقرة المحددة لاستخراج المرادف والضد بدقة.'
			],
			solutionStepsAr: [
				`الجواب الأول: ${variant.a1}`,
				`الجواب الثاني: ${variant.a2}`,
				`مرجع الضمير "${variant.refWord}": ${variant.refAnswer}`,
				`المرادف: ${variant.synAns} | الضد: ${variant.oppAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Mastery of Language (7 pts) — Used to, Past Simple / Continuous & Final -ed
// ═══════════════════════════════════════════════════════════════════════════════
const langUsedToPast3amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t2_lang_used_to_past',
	grade: '3am',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة (3AM): used to، الماضي المستمر مع while/when، ونطق -ed (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t2_used_to_lifestyles',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				used1Q: 'a) In the past, people (use to / travel) on camels, and they (not / use to / have) airplanes.',
				used1A: 'a) In the past, people used to travel on camels, and they did not use to have airplanes.',
				used2Q: 'b) (your grandfather / use to / live) in a stone farmhouse?',
				used2A: 'b) Did your grandfather use to live in a stone farmhouse?',
				past1Q: 'a) While Ibn al-Haytham (study) light, a sunbeam (enter) his dark room.',
				past1A: 'a) While Ibn al-Haytham was studying light, a sunbeam entered his dark room.',
				past2Q: 'b) We (revise) our history lesson when our father (bring) fresh dates.',
				past2A: 'b) We were revising our history lesson when our father brought fresh dates.',
				phonoWords: ['worked', 'lived', 'invented', 'helped', 'studied', 'founded'],
				colT: ['worked', 'helped'],
				colD: ['lived', 'studied'],
				colId: ['invented', 'founded'],
				mcqCorrect: 'Fifty years ago, families did not use to own smartphones.',
				mcqD1: 'Fifty years ago, families did not used to own smartphones.',
				mcqD2: 'Fifty years ago, families do not use to own smartphones.',
				mcqD3: 'Fifty years ago, families used not owning smartphones.'
			},
			{
				used1Q: 'a) Long ago, Algerian women (use to / bake) bread in clay ovens, and pupils (not / use to / study) online.',
				used1A: 'a) Long ago, Algerian women used to bake bread in clay ovens, and pupils did not use to study online.',
				used2Q: 'b) (children / use to / play) traditional outdoor games?',
				used2A: 'b) Did children use to play traditional outdoor games?',
				past1Q: 'a) While Al-Jazari (design) a water clock, his students (take) notes.',
				past1A: 'a) While Al-Jazari was designing a water clock, his students were taking notes.',
				past2Q: 'b) Salma (read) about Al-Zahrawi when her friend (call) her.',
				past2A: 'b) Salma was reading about Al-Zahrawi when her friend called her.',
				phonoWords: ['developed', 'discovered', 'translated', 'watched', 'travelled', 'created'],
				colT: ['developed', 'watched'],
				colD: ['discovered', 'travelled'],
				colId: ['translated', 'created'],
				mcqCorrect: 'While we were walking to school, it started to rain.',
				mcqD1: 'While we walked to school, it was starting to rain.',
				mcqD2: 'While we was walking to school, it started to rain.',
				mcqD3: 'While we were walk to school, it starts to rain.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'تأكد من حذف d بعد did not، أو وضع الماضي المستمر بعد While.' },
				{ text: set.mcqD2, diagnosticFeedback: 'تحقق من توافق الفاعل مع was/were ومن صيغة الماضي.' },
				{ text: set.mcqD3, diagnosticFeedback: 'تذكّر قاعدة (was/were + V-ing) و (did not use to + stem).' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Choose the grammatically accurate sentence:',
				questionTextAr: 'اختر الجملة الصحيحة نحوياً في الماضي:',
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
				instruction: 'Complete the grammar and pronunciation tasks below:',
				content: [
					{
						type: 'text',
						content: `Task 1: Rewrite the sentences using the correct form of "used to" (02.5 pts):\n  ${set.used1Q}\n  ${set.used2Q}`,
						answer: `${set.used1A}\n${set.used2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Task 2: Put the verbs in brackets into the Past Simple or Past Continuous (02.5 pts):\n  ${set.past1Q}\n  ${set.past2Q}`,
						answer: `${set.past1A}\n${set.past2A}`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `Task 3: Classify these verbs according to the pronunciation of their final "-ed" (02 pts):\nVerbs: ${set.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/t/', words: set.colT, mark: '0.5' },
							{ header: '/d/', words: set.colD, mark: '0.5' },
							{ header: '/id/', words: set.colId, mark: '1' }
						]
					})
				]
			},
			hints: [
				'في النفي والسؤال مع did نحذف حرف d فتصبح: did not use to / Did ... use to?',
				'بعد While يأتي الماضي المستمر (was/were + V-ing)، وبعد When يأتي الحدث القصير في الماضي البسيط.',
				'النهاية -ed تُنطق /id/ فقط بعد صوتي /t/ و /d/.'
			],
			solutionStepsAr: [
				`${set.used1A} | ${set.used2A}`,
				`${set.past1A} | ${set.past2A}`,
				`/t/: ${set.colT.join(', ')} | /d/: ${set.colD.join(', ')} | /id/: ${set.colId.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language (7 pts) — Relative Pronouns (who, which, where) & -ed
// ═══════════════════════════════════════════════════════════════════════════════
const langRelativesEd3amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t2_lang_relatives_ed',
	grade: '3am',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة (3AM): ضمائر الوصل (who, which, where)، الماضي البسيط ونطق -ed (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t2_relative_pronouns_scientists',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				rel1Q: 'a) Al-Khwarizmi was a great Muslim scholar. He founded algebra.',
				rel1A: 'a) Al-Khwarizmi was a great Muslim scholar who founded algebra.',
				rel2Q: 'b) "Al-Tasrif" is a medical encyclopedia. It helped doctors for centuries.',
				rel2A: 'b) "Al-Tasrif" is a medical encyclopedia which helped doctors for centuries.',
				rel3Q: 'c) Baghdad was the vibrant city. The House of Wisdom stood there.',
				rel3A: 'c) Baghdad was the vibrant city where the House of Wisdom stood.',
				verbsQ: 'Fatima al-Fihri (be) born in Kairouan. She (move) to Fez and (build) Al-Qarawiyyin Mosque and University in 859 CE.',
				verbsA: 'Fatima al-Fihri was born in Kairouan. She moved to Fez and built Al-Qarawiyyin Mosque and University in 859 CE.',
				phonoWords: ['practised', 'designed', 'decided', 'finished', 'saved', 'visited'],
				colT: ['practised', 'finished'],
				colD: ['designed', 'saved'],
				colId: ['decided', 'visited'],
				mcqQ: 'Choose the right relative pronoun: "Al-Jazari was an inventor ...... built mechanical water clocks."',
				mcqCorrect: 'who',
				mcqD1: 'which',
				mcqD2: 'where',
				mcqD3: 'what'
			},
			{
				rel1Q: 'a) Ibn Battuta was a famous Muslim traveller. He visited more than forty lands.',
				rel1A: 'a) Ibn Battuta was a famous Muslim traveller who visited more than forty lands.',
				rel2Q: 'b) The astrolabe is an old instrument. It helped astronomers measure stars.',
				rel2A: 'b) The astrolabe is an old instrument which helped astronomers measure stars.',
				rel3Q: 'c) Fez is the historic Moroccan city. Fatima al-Fihri founded Al-Qarawiyyin there.',
				rel3A: 'c) Fez is the historic Moroccan city where Fatima al-Fihri founded Al-Qarawiyyin.',
				verbsQ: 'Al-Biruni (study) astronomy and geography. He (write) over one hundred books and (calculate) the Earth radius accurately.',
				verbsA: 'Al-Biruni studied astronomy and geography. He wrote over one hundred books and calculated the Earth radius accurately.',
				phonoWords: ['asked', 'explained', 'calculated', 'pushed', 'called', 'started'],
				colT: ['asked', 'pushed'],
				colD: ['explained', 'called'],
				colId: ['calculated', 'started'],
				mcqQ: 'Choose the right relative pronoun: "Cordoba was the city ...... Al-Zahrawi treated patients."',
				mcqCorrect: 'where',
				mcqD1: 'who',
				mcqD2: 'which',
				mcqD3: 'when'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'تحقق هل الاسم السابق عاقل أم غير عاقل أم مكان.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'تذكّر: who للعاقل، which لغير العاقل، where للمكان.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'هذا الضمير لا يناسب سياق الجملة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر ضمير الوصل الصحيح لإكمال الجملة:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الضمير الصحيح هو (${variant.mcqCorrect}).`
			},
			sujetExercise: {
				customTitle: 'Part One: Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Do the following grammar and phonology exercises:',
				content: [
					{
						type: 'text',
						content: `Task 1: Combine each pair of sentences using "who", "which", or "where" (03 pts):\n  ${variant.rel1Q}\n  ${variant.rel2Q}\n  ${variant.rel3Q}`,
						answer: `${variant.rel1A}\n${variant.rel2A}\n${variant.rel3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Task 2: Put the verbs in brackets into the Past Simple tense (02 pts):\n  ${variant.verbsQ}`,
						answer: variant.verbsA,
						mark: '2'
					},
					{
						type: 'text',
						content: `Task 3: Classify the verbs according to their final "-ed" pronunciation (02 pts):\nVerbs: ${variant.phonoWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/t/', words: variant.colT, mark: '0.5' },
							{ header: '/d/', words: variant.colD, mark: '0.5' },
							{ header: '/id/', words: variant.colId, mark: '1' }
						]
					})
				]
			},
			hints: [
				'عند الربط بـ who / which / where لا تنسَ حذف الضمير المكرر (he / it / there).',
				'انتبه للأفعال الشاذة في الماضي البسيط (be: was, build: built, write: wrote).',
				'في النطق انظر إلى الصوت الأخير المنطوق قبل -ed (حرف e صامت في decided و calculated).'
			],
			solutionStepsAr: [
				`${variant.rel1A} | ${variant.rel2A} | ${variant.rel3A}`,
				variant.verbsA,
				`/t/: ${variant.colT.join(', ')} | /d/: ${variant.colD.join(', ')} | /id/: ${variant.colId.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (6 pts) — Muslim Scientist Biography / Past vs Present
// ═══════════════════════════════════════════════════════════════════════════════
const writeScientistBio3amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t2_write_scientist_bio',
	grade: '3am',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة سيرة عالم مسلم أو مقارنة أنماط الحياة (6 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t2_final_ed_pronunciation',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const scientist = rng.pick([
			{
				name: 'Al-Jazari',
				fullName: 'Badi al-Zaman Ismail al-Jazari',
				born: '1136 CE in Jazirat ibn Umar',
				field: 'Muslim mechanical engineer and inventor',
				book: 'The Book of Knowledge of Ingenious Mechanical Devices',
				inventions: 'water-raising pumps, elephant water clock, and automatic hand-washing devices',
				died: '1206 CE'
			},
			{
				name: 'Fatima al-Fihri',
				fullName: 'Fatima al-Fihri',
				born: 'around 800 CE in Kairouan (Tunisia)',
				field: 'generous Muslim scholar and educational founder',
				book: 'founded Al-Qarawiyyin Mosque and University in Fez in 859 CE',
				inventions: 'supported students, scholars, and a historic library that still stands today',
				died: '880 CE in Fez'
			}
		]);

		const modelAnswer = `${scientist.fullName} was an inspiring ${scientist.field} who was born in ${scientist.born}. During his or her remarkable life, ${scientist.name} worked with great dedication to serve knowledge and society. ${scientist.name} is especially famous for ${scientist.book}, and also ${scientist.inventions}. ${scientist.name} passed away in ${scientist.died}, leaving behind a lasting heritage which continues to inspire young Algerian pupils today.`;

		const mcq = buildUniqueMcqOptions(
			'Use Past Simple tense, "was born in", relative pronouns (who / which / where), and chronological order.',
			[
				{ text: 'Use Future Simple (will) to describe a medieval scientist.', diagnosticFeedback: 'السيرة التاريخية تُكتب في الماضي البسيط (Past Simple).' },
				{ text: 'Write only a shopping list without full sentences.', diagnosticFeedback: 'المطلوب فقرة سردية متماسكة من 8 إلى 10 أسطر.' },
				{ text: 'Omit the scientist name, field, and main achievements.', diagnosticFeedback: 'هذه هي العناصر الأساسية في بطاقة السيرة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Which grammar tools are most essential when writing a Muslim scientist biography in 3MS?',
				questionTextAr: 'ما الأدوات اللغوية الأساسية لكتابة سيرة عالم مسلم في 3AM؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'نستعمل الماضي البسيط، وعبارة (was born in)، وضمائر الوصل (who / which / where) بالترتيب الزمني.'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration (06 pts)',
				points: 6,
				instruction: 'Write a well-structured biography or comparison paragraph (8 to 10 lines):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `Your school science magazine is celebrating Islamic scientific heritage. Use the fact file below to write a short biography of ${scientist.name}.`,
						topicOneNotes: [
							`Full Name: ${scientist.fullName}`,
							`Birth: ${scientist.born}`,
							`Field: ${scientist.field}`,
							`Main Landmark Work: ${scientist.book}`,
							`Key Contributions: ${scientist.inventions}`,
							`Death: ${scientist.died}`
						],
						topicTwoPrompt:
							'Write a short paragraph comparing Algerian lifestyles in the past and today (housing, clothing, food, and transport) using "used to" and "did not use to".',
						modelAnswer,
						rubricSummary:
							'Relevance (2 pts) + Organization & Chronology (1.5 pts) + Past Simple & Relative Pronouns Accuracy (1.5 pts) + Spelling & Punctuation (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'ابدأ بالاسم الكامل والتخصص وتاريخ ومكان الميلاد باستعمال (was born in).',
				'وظّف ضميري وصل على الأقل (who / which) وأفعال الماضي البسيط بوضوح.',
				'اختم بسنة الوفاة وبأثر العالم الباقي في الحضارة الإنسانية.'
			],
			solutionStepsAr: [
				`التعريف: ${scientist.fullName} (${scientist.field}) — وُلد في ${scientist.born}.`,
				`الإنجاز الأبرز: ${scientist.book} و ${scientist.inventions}.`,
				`الخاتمة: الوفاة في ${scientist.died} واستمرار الأثر العلمي.`
			],
			finalAnswer: modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T2: EnglishParameterizedTemplate[] = [
	compMuslimScientists3amT2,
	langUsedToPast3amT2,
	langRelativesEd3amT2,
	writeScientistBio3amT2
];
