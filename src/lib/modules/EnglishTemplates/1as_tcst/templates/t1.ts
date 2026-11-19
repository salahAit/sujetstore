import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';

// ============================================================================
// 4 Parameterized Templates — 1AS TCST Trimester 1 (8 + 7 + 7[alt] + 5 = 20)
// Unit 1: Getting Through (ICT, Digital Communication, Formal Emails & Letters)
// ============================================================================

// 1. Part One: A) Reading Comprehension (8 pts)
const tpl1asTcstT1IctComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t1_ict_comprehension',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — تكنولوجيا الإعلام والاتصال والبريد الإلكتروني التعليمي',
	curriculumLessonId: 'eng_lesson_1as_tcst_t1_purpose_connectors',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Digital Learning Platforms in Algerian Secondary Schools',
				source: 'Adapted from Algerian Youth Science Digest',
				paragraphs: [
					'Over the past decade, information and communication technology has transformed the way Algerian secondary school students prepare for exams. Today, learners use computers, tablets, and educational portals in order to download structured lessons, revise scientific formulas, and verify [[their]] solutions at home.',
					'Email remains one of the most reliable tools for formal academic communication. Students frequently send polite messages to their teachers so as to ask for extra clarification or submit laboratory reports on time. First, a careful learner writes a clear subject line. Next, he or she checks spelling and grammar before clicking Send. [[It]] is an essential habit for future university studies.',
					'However, teachers remind young people to use digital screens responsibly. Spending excessive hours on unproductive websites wastes precious study time and weakens concentration. Therefore, wise students set strict daily schedules so as not to neglect reading printed textbooks, family duties, and healthy physical rest.'
				],
				glossary: [
					{ term: 'reliable', meaning: 'trustworthy and dependable' },
					{ term: 'excessive', meaning: 'more than necessary' }
				],
				tfItems: [
					{
						q: 'Algerian secondary students use educational portals only for entertainment.',
						a: 'False',
						c: 'They use them to download lessons, revise formulas, and check solutions.',
						mark: '0.5'
					},
					{
						q: 'Writing a clear subject line and checking spelling are good email habits.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Teachers encourage students to spend unlimited hours online without a schedule.',
						a: 'False',
						c: 'Teachers remind them to set strict daily schedules and use screens responsibly.',
						mark: '0.5'
					}
				],
				q1: 'Why do secondary school students use educational portals according to paragraph 1?',
				a1: 'They use them in order to download structured lessons, revise scientific formulas, and verify their solutions at home.',
				q2: 'What two steps should a careful learner take before clicking Send on a formal email?',
				a2: 'First, the learner writes a clear subject line; next, he or she checks spelling and grammar.',
				q3: 'What negative effect does spending excessive hours on unproductive websites have?',
				a3: 'It wastes precious study time and weakens concentration.',
				ref1Word: 'their (paragraph 1)',
				ref1Ans: 'learners (Algerian secondary school students)',
				ref2Word: 'It (paragraph 2)',
				ref2Ans: 'checking spelling and grammar (writing careful formal emails)',
				textTypeCorrect: 'An expository article explaining responsible educational use of ICT',
				textTypeDistractors: [
					{
						text: 'A fictional short story about an ancient traveller',
						diagnosticFeedback: 'The passage gives factual information about modern digital learning, not a fictional story.'
					},
					{
						text: 'A formal letter of complaint to an internet company',
						diagnosticFeedback: 'There is no salutation or complaint addressed to a company.'
					},
					{
						text: 'A biography of a classical physicist',
						diagnosticFeedback: 'No single historical person is profiled here.'
					}
				],
				theme: 'responsible use of educational platforms and formal email habits'
			},
			{
				title: 'How Email Changed Professional Communication',
				source: 'Adapted from Modern Communication Handbook',
				paragraphs: [
					'Before electronic mail became widespread, sending an official letter across cities or countries took several days or even weeks. People had to write on paper, buy stamps, and wait patiently for postal delivery. Today, an email reaches [[its]] destination in seconds, allowing students, researchers, and companies to cooperate quickly.',
					'Despite its speed, formal email writing still follows strict rules of politeness. When writing to a school principal or a science institute director, senders avoid slang and contractions. They open with a respectful greeting such as Dear Sir or Madam, state the purpose clearly in the first paragraph, and close with Yours faithfully. [[These]] conventions show seriousness and respect.',
					'Cybersecurity is another vital part of getting through online safely. Users must choose strong passwords and never share personal data with unknown senders. By following simple digital ethics, young Algerian learners can benefit from modern technology while protecting their privacy and academic work.'
				],
				glossary: [
					{ term: 'widespread', meaning: 'found or used in many places' },
					{ term: 'conventions', meaning: 'accepted formal rules and customs' }
				],
				tfItems: [
					{
						q: 'In the past, official paper letters arrived within a few seconds.',
						a: 'False',
						c: 'They took several days or even weeks to arrive by postal delivery.',
						mark: '0.5'
					},
					{
						q: 'Formal emails avoid slang and contractions when addressing a director.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Protecting personal passwords is an important rule of online safety.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'How long did sending an official paper letter take before email became widespread?',
				a1: 'It took several days or even weeks.',
				q2: 'Mention two rules of politeness required in a formal email according to paragraph 2.',
				a2: 'Senders avoid slang and contractions, open with a respectful greeting (Dear Sir or Madam), state their purpose clearly, and close with Yours faithfully.',
				q3: 'How can users protect their privacy online according to paragraph 3?',
				a3: 'They must choose strong passwords and never share personal data with unknown senders.',
				ref1Word: 'its (paragraph 1)',
				ref1Ans: 'an email',
				ref2Word: 'These (paragraph 2)',
				ref2Ans: 'strict rules of politeness (formal email conventions)',
				textTypeCorrect: 'An informative text about formal email conventions and online safety',
				textTypeDistractors: [
					{
						text: 'A step-by-step cooking recipe',
						diagnosticFeedback: 'The passage discusses formal emails and cybersecurity, not cooking.'
					},
					{
						text: 'A survey report full of numerical percentages',
						diagnosticFeedback: 'There are no survey statistics or percentages in the text.'
					},
					{
						text: 'A personal diary entry about a summer holiday',
						diagnosticFeedback: 'The tone is objective and informative, not a personal diary.'
					}
				],
				theme: 'formal email etiquette and safe digital communication'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Justify your False answers from the text.'
				: 'Write True or False next to each statement.';

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{
				type: 'text',
				content: `1) Are the following statements True or False? (${difficultyNote})`
			},
			{
				type: 'true_false',
				items: variant.tfItems
			},
			{
				type: 'text',
				content: `2) Answer the following questions according to the text:\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) What or who do the underlined words refer to in the text?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word}: ${variant.ref1Ans}\nb) ${variant.ref2Word}: ${variant.ref2Ans}`,
				mark: '2.0'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Choose the best description of the text:',
						options: mcq.options.map((o) => o.text),
						correct: variant.textTypeCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read the passage "${variant.title}". Which statement best describes the text?`,
				questionTextAr: 'اختر الوصف الأدق لنوع النص ومضمونه العام:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `The passage focuses on ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 8,
				instruction: 'Read the text carefully then do the following activities:',
				content
			},
			hints: [
				'اقرأ الأسئلة قبل قراءة النص الثاني لتحديد موقع الإجابة في كل فقرة (§1, §2, §3).',
				'في أسئلة الضمائر (Reference words) عد دائما إلى الجملة التي تسبق الضمير مباشرة.',
				'تحقق من المعنى العام للفقرات الثلاث قبل اختيار نوع النص.'
			],
			solutionStepsAr: [
				`True/False: ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q1: ${variant.a1}`,
				`Q2: ${variant.a2}`,
				`Q3: ${variant.a3}`,
				`References: ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.textTypeCorrect
		};
	}
};

// 2. Part One: B) Text Exploration — Purpose, Sequencers & Final -s (7 pts)
const tpl1asTcstT1PurposeSequencersTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t1_purpose_sequencers_te',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص — الغاية (in order to / so as not to) والروابط التسلسلية ونطق -s',
	curriculumLessonId: 'eng_lesson_1as_tcst_t1_purpose_connectors',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'communicate' },
						noun: { value: 'communication', mark: '0.5' },
						adjective: { value: 'communicative', mark: '0.5' }
					},
					{
						verb: { value: 'connect', mark: '0.5' },
						noun: { given: true, value: 'connection' },
						adjective: { value: 'connected', mark: '0.5' }
					}
				],
				combine1Prompt: 'a) Amine created an email folder. He wanted to organize his physics lessons. (in order to)',
				combine1Ans: 'Amine created an email folder in order to organize his physics lessons.',
				combine2Prompt: 'b) Nadia wrote a clear subject line. She did not want to confuse the recipient. (so as not to)',
				combine2Ans: 'Nadia wrote a clear subject line so as not to confuse the recipient.',
				seqGapPrompt: '.......... , switch on the laptop. .......... , open the browser and type the educational address. .......... , log out safely when you finish.',
				seqGapAns: 'First , switch on the laptop. Next (or Then) , open the browser and type the educational address. Finally , log out safely when you finish.',
				phonWords: ['clicks', 'emails', 'messages', 'networks', 'folders', 'searches'],
				phonCols: [
					{ header: '/s/', words: ['clicks', 'networks'], mark: '0.5' },
					{ header: '/z/', words: ['emails', 'folders'], mark: '0.5' },
					{ header: '/iz/', words: ['messages', 'searches'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the grammatically correct sentence expressing negative purpose:',
				mcqCorrect: 'Save your report early so as not to lose your data.',
				mcqDistractors: [
					{
						text: 'Save your report early so as to not lose your data.',
						diagnosticFeedback: 'Put "not" directly before "to": so as not to.'
					},
					{
						text: 'Save your report early in order to losing your data.',
						diagnosticFeedback: 'Use the base verb (stem) after "to", never V-ing.'
					},
					{
						text: 'Save your report early so as not losing your data.',
						diagnosticFeedback: 'The infinitive marker "to" is missing.'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'inform' },
						noun: { value: 'information', mark: '0.5' },
						adjective: { value: 'informative', mark: '0.5' }
					},
					{
						verb: { value: 'protect', mark: '0.5' },
						noun: { given: true, value: 'protection' },
						adjective: { value: 'protective', mark: '0.5' }
					}
				],
				combine1Prompt: 'a) Karim installed an antivirus tool. He wanted to secure his school projects. (so as to)',
				combine1Ans: 'Karim installed an antivirus tool so as to secure his school projects.',
				combine2Prompt: 'b) Meriem set a daily timer. She did not want to waste time online. (in order not to)',
				combine2Ans: 'Meriem set a daily timer in order not to waste time online.',
				seqGapPrompt: '.......... , click on Compose. .......... , attach your PDF homework file. .......... , press Send after checking spelling.',
				seqGapAns: 'First , click on Compose. Next (or Then) , attach your PDF homework file. Finally , press Send after checking spelling.',
				phonWords: ['laptops', 'files', 'boxes', 'prints', 'screens', 'pages'],
				phonCols: [
					{ header: '/s/', words: ['laptops', 'prints'], mark: '0.5' },
					{ header: '/z/', words: ['files', 'screens'], mark: '0.5' },
					{ header: '/iz/', words: ['boxes', 'pages'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the correct transformation using "in order not to": "He checks the address. He does not want to make a mistake."',
				mcqCorrect: 'He checks the address in order not to make a mistake.',
				mcqDistractors: [
					{
						text: 'He checks the address in order to not make a mistake.',
						diagnosticFeedback: 'Place "not" before "to": in order not to.'
					},
					{
						text: 'He checks the address in order not to makes a mistake.',
						diagnosticFeedback: 'Never add -s to the verb after "to".'
					},
					{
						text: 'He checks the address in order not to making a mistake.',
						diagnosticFeedback: 'Use the base verb "make", not "making".'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledPhonWords = rng.shuffle(variant.phonWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) Combine each pair of sentences using the connector between brackets (2.0 pts):\n${variant.combine1Prompt}\n${variant.combine2Prompt}`,
				answer: `a) ${variant.combine1Ans}\nb) ${variant.combine2Ans}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) Fill in the blanks with the appropriate sequencers (First, Next, Finally) (1.5 pts):\n${variant.seqGapPrompt}`,
				answer: variant.seqGapAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) Classify the following words according to the pronunciation of their final -s (1.5 pts):\n${shuffledPhonWords.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.phonCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة السليمة نحويا للتعبير عن الغاية المنفية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Negative purpose always follows the pattern: in order not to / so as not to + base verb (stem).'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Complete the following language and phonology activities:',
				content
			},
			hints: [
				'تذكّر أن in order to و so as to يتبعهما الفعل المجرد مباشرة مع حذف الفاعل المكرر وفعل want.',
				'في النفي نضع not قبل to دائما: in order not to / so as not to.',
				'في نطق -s الأخير ننتبه للصوت الأخير قبل s (الأصوات الصفيرية مثل ge و ch تأخذ /iz/).'
			],
			solutionStepsAr: [
				`Combine (a): ${variant.combine1Ans}`,
				`Combine (b): ${variant.combine2Ans}`,
				`Sequencers: ${variant.seqGapAns}`,
				`Final -s: ${variant.phonCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Frequency & Degree Adverbs + Syllable Stress (7 pts)
const tpl1asTcstT1FreqDegreeEmailTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t1_freq_degree_email_te',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'vocabulary_morphology',
	titleAr: 'استكشاف النص — ظروف التكرار والدرجة وصياغة الأسئلة والنبر الصوتي',
	curriculumLessonId: 'eng_lesson_1as_tcst_t1_frequency_degree',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				vocabPairs: 'a) dependable = ..........   b) fast = ..........   c) polite = ..........   d) harmful = ..........',
				vocabBank: '(courteous - reliable - damaging - rapid)',
				vocabAns: 'a) reliable   b) rapid   c) courteous   d) damaging',
				freq1Prompt: 'a) Youssef checks his school portal before dinner. (usually)',
				freq1Ans: 'Youssef usually checks his school portal before dinner.',
				freq2Prompt: 'b) The laboratory computers are ready for students. (always)',
				freq2Ans: 'The laboratory computers are always ready for students.',
				askPrompt: 'Ask a question about the underlined phrase: "Salma visits the digital library ((twice a week))."',
				askAns: 'How often does Salma visit the digital library?',
				stressWords: ['browser', 'connect', 'message', 'reply'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['browser', 'message'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['connect', 'reply'], mark: '1.0' }
				],
				mcqQuestion: 'Which sentence places the frequency adverb in the correct position?',
				mcqCorrect: 'The science teacher is always punctual and never wastes class time.',
				mcqDistractors: [
					{
						text: 'The science teacher always is punctual and wastes never class time.',
						diagnosticFeedback: 'Frequency adverbs come AFTER "to be" (is always) and BEFORE main verbs (never wastes).'
					},
					{
						text: 'The science teacher is punctual always and does not never waste time.',
						diagnosticFeedback: 'Avoid double negatives (do not never) and put "always" directly after "is".'
					},
					{
						text: 'Always is the science teacher punctual and never he wastes time.',
						diagnosticFeedback: 'Keep normal Subject + Verb word order.'
					}
				]
			},
			{
				vocabPairs: 'a) goal = ..........   b) essential = ..........   c) brief = ..........   d) secure = ..........',
				vocabBank: '(vital - safe - concise - purpose)',
				vocabAns: 'a) purpose   b) vital   c) concise   d) safe',
				freq1Prompt: 'a) My classmates share math summaries online. (often)',
				freq1Ans: 'My classmates often share math summaries online.',
				freq2Prompt: 'b) Our IT instructor is late for class. (never)',
				freq2Ans: 'Our IT instructor is never late for class.',
				askPrompt: 'Ask a question about the underlined phrase: "Bilal backs up his files ((every Friday))."',
				askAns: 'How often does Bilal back up his files?',
				stressWords: ['tablet', 'attach', 'folder', 'receive'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['tablet', 'folder'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['attach', 'receive'], mark: '1.0' }
				],
				mcqQuestion: 'Choose the right question for the answer: "We use the computer room three times a week."',
				mcqCorrect: 'How often do you use the computer room?',
				mcqDistractors: [
					{
						text: 'How much do you use the computer room?',
						diagnosticFeedback: '"How much" asks about quantity or price, not frequency.'
					},
					{
						text: 'How long do you use the computer room?',
						diagnosticFeedback: '"How long" asks about duration, not how frequently.'
					},
					{
						text: 'How many do you use the computer room?',
						diagnosticFeedback: '"How many" requires a plural countable noun immediately after it.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledStress = rng.shuffle(variant.stressWords);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Match each word with its synonym from the list ${variant.vocabBank} (2.0 pts):\n${variant.vocabPairs}`,
				answer: variant.vocabAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) Rewrite the sentences putting the frequency adverb in its right position (2.0 pts):\n${variant.freq1Prompt}\n${variant.freq2Prompt}`,
				answer: `a) ${variant.freq1Ans}\nb) ${variant.freq2Ans}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) ${variant.askPrompt} (1.0 pt)`,
				answer: variant.askAns,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `4) Classify the following two-syllable words according to their stressed syllable (2.0 pts):\n${shuffledStress.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.stressCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة الصحيحة نحويا:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Frequency adverbs stand before ordinary verbs and after verb to be; "How often" asks about frequency.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following vocabulary, grammar, and phonology tasks:',
				content
			},
			hints: [
				'ظرف التكرار يأتي قبل الفعل العادي (often share) وبعد فعل الكينونة (is never).',
				'للسؤال عن عدد مرات التكرار نستعمل دائما How often.',
				'الأسماء ذات المقطعين تُنبر عادة على المقطع الأول، والأفعال ذات المقطعين على المقطع الثاني.'
			],
			solutionStepsAr: [
				`Synonyms: ${variant.vocabAns}`,
				`Frequency (a): ${variant.freq1Ans}`,
				`Frequency (b): ${variant.freq2Ans}`,
				`Question: ${variant.askAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Formal Email / Letter of Application
const tpl1asTcstT1FormalLetterWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t1_formal_letter_we',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة رسالة رسمية لطلب الالتحاق بدورة علمية أو بريد رسمي',
	curriculumLessonId: 'eng_lesson_1as_tcst_t1_formal_email_letter',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'You are a 1st year scientific stream student. Write a formal letter of application (80 to 100 words) to the Director of the Algerian Youth Robotics Center in Algiers to join a winter programming workshop.',
				topicOneNotes: [
					'Salutation: Dear Sir or Madam,',
					'Purpose: apply for the winter robotics and coding workshop',
					'Background: 1AS TCST student / good marks in Mathematics and IT / eager to learn',
					'Benefits: improve teamwork and technical skills in order to design useful projects',
					'Polite closing: look forward to hearing from you / Yours faithfully,'
				],
				topicTwoPrompt:
					'Write a short guide (80 to 100 words) explaining to a new student how to use the Internet safely and productively for secondary school studies. Use sequencers (First, Next, Then, Finally) and purpose connectors.',
				modelAnswer:
					'Dear Sir or Madam,\nI am writing to apply for the winter robotics and programming workshop advertised on your educational portal. I am a first-year Scientific and Technological stream student in Algiers with strong results in Mathematics and Computer Science. I would like to join this workshop in order to strengthen my coding skills and learn how to build practical school projects with a disciplined team. I am extremely motivated and always respect laboratory rules. Please let me know what documents are required for registration. I look forward to hearing from you soon.\nYours faithfully,\nAmine Benali',
				rubricSummary:
					'Relevance and formal layout (1.5 pts), Grammar accuracy and purpose connectors (1.5 pts), Coherence and polite register without contractions (1 pt), Mechanics and spelling (1 pt).',
				mcqQuestion: 'Which pairing of salutation and closing is formally correct in a Letter of Application?',
				mcqCorrect: 'Dear Sir or Madam, ... Yours faithfully,',
				mcqDistractors: [
					{
						text: 'Dear Sir or Madam, ... Yours sincerely,',
						diagnosticFeedback: 'Use "Yours faithfully," when the recipient name is unknown.'
					},
					{
						text: 'Dear Mr. Mansouri, ... Yours faithfully,',
						diagnosticFeedback: 'When the recipient surname is mentioned, close with "Yours sincerely,".'
					},
					{
						text: 'Hi Director, ... See you later,',
						diagnosticFeedback: 'This register is informal and unacceptable in an application letter.'
					}
				]
			},
			{
				topicOnePrompt:
					'Write a formal email (80 to 100 words) to the coordinator of a Scientific Summer Language Camp in Oran to inquire about registration dates, study schedule, and required documents.',
				topicOneNotes: [
					'Subject line: Inquiry about the Scientific English Summer Camp',
					'Salutation: Dear Sir or Madam,',
					'Reason for writing: ask for details about dates, fees, and registration',
					'Personal motivation: 1AS TCST student wanting to improve scientific English in order to read research articles',
					'Closing: polite thank-you / I look forward to hearing from you / Yours faithfully,'
				],
				topicTwoPrompt:
					'Write a short paragraph (80 to 100 words) comparing the advantages of email over traditional paper mail for Algerian high school students.',
				modelAnswer:
					'Subject: Inquiry about the Scientific English Summer Camp\nDear Sir or Madam,\nI am writing to inquire about the Scientific English Summer Camp scheduled to take place in Oran next July. I am a first-year scientific stream student and I wish to attend your courses in order to improve my English reading and technical writing skills. I would be very grateful if you could send me detailed information regarding the exact starting date, the daily study schedule, and the documents needed for registration. Thank you in advance for your assistance. I look forward to hearing from you.\nYours faithfully,\nYasmine Khelifi',
				rubricSummary:
					'Formal email structure with subject line (1.5 pts), Accurate grammar and polite expressions (1.5 pts), Clarity and cohesion (1 pt), Spelling and punctuation (1 pt).',
				mcqQuestion: 'Which closing sentence is grammatically accurate in a formal email?',
				mcqCorrect: 'I look forward to hearing from you soon.',
				mcqDistractors: [
					{
						text: 'I look forward to hear from you soon.',
						diagnosticFeedback: 'After "look forward to", always use Verb-ing (hearing).'
					},
					{
						text: 'Write back to me fast, thanks a bunch!',
						diagnosticFeedback: 'Too informal for an official email.'
					},
					{
						text: 'I am looking forward to heard from you.',
						diagnosticFeedback: 'Never use past tense after "look forward to".'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: variant.topicOnePrompt,
				topicOneNotes: variant.topicOneNotes,
				topicTwoPrompt: variant.topicTwoPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '5'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الصيغة الرسمية السليمة في الرسالة أو البريد الرسمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Formal correspondence requires polite, contraction-free phrasing and matching salutations and closings.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a well-organized response:',
				content
			},
			hints: [
				'احترم بنية الرسالة الرسمية: التحية، سبب الكتابة، المؤهلات أو الاستفسار، ثم الخاتمة والتوقيع.',
				'تجنب الاختصارات (I-m / don-t) واكتب الصيغ الكاملة (I am / do not).',
				'وظف رابط غاية واحد على الأقل مثل in order to أو so as to.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T1: EnglishParameterizedTemplate[] = [
	tpl1asTcstT1IctComprehension,
	tpl1asTcstT1PurposeSequencersTe,
	tpl1asTcstT1FreqDegreeEmailTe,
	tpl1asTcstT1FormalLetterWe
];
