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
// 4 Parameterized Templates — 1AS TCL Trimester 1 (7 + 8 + 8[alt] + 5 = 20)
// Unit 1: Getting Through (Intercultural Communication, Letters & Heritage)
// ============================================================================

// 1. Part One: A) Reading Comprehension (7 pts)
const tpl1asTclT1LettersCultureComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t1_letters_culture_comprehension',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — المراسلات الثقافية والتعريف بالتراث الجزائري الأصيل',
	curriculumLessonId: 'eng_lesson_1as_tcl_t1_formal_informal_letters',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'A Cultural Letter from Constantine to Kuala Lumpur',
				source: 'Adapted from Algerian Youth Correspondence Collection',
				paragraphs: [
					'Constantine, Algeria — 12 November 2026. Dear Aisha, Thank you for your warm letter about Malaysia. I am writing to introduce myself and share a glimpse of my homeland, Algeria. I am sixteen years old and I study in the first-year Literary Stream in Constantine, a historic city famous for its suspension bridges and deep scholarly tradition.',
					'In our school cultural club, we study both Algerian history and English communication in order to represent our heritage with pride and clarity. Every student in Constantine remembers the noble educational mission of Imam Abdelhamid Ben Badis, who devoted [[his]] life to defending the Arabic language, Islamic ethics, and free schools for Algerian children. Alongside him, Sheikh Mohamed Bachir El Ibrahimi wrote eloquent essays so as to awaken love of knowledge across the entire nation.',
					'In my free time, I enjoy reading historical books, practising Arabic calligraphy, and visiting the municipal library with my sister. Neither lazy habits nor aimless browsing belong in our weekly schedule because we want to excel in our studies. Please write back soon and tell me about your favourite books and local landmarks. Best wishes, Khadidja.'
				],
				glossary: [
					{ term: 'glimpse', meaning: 'a brief look or short view' },
					{ term: 'eloquent', meaning: 'clear, fluent, and persuasive in writing or speech' }
				],
				tfItems: [
					{
						q: 'Khadidja is a first-year Literary Stream student living in Constantine.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Imam Abdelhamid Ben Badis neglected education and the Arabic language.',
						a: 'False',
						c: 'He devoted his life to defending the Arabic language, Islamic ethics, and free schools.',
						mark: '0.5'
					},
					{
						q: 'Khadidja spends her free time reading, practising calligraphy, and visiting the library.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Why do students in Khadidja-s cultural club study both Algerian history and English?',
				a1: 'They study them in order to represent their heritage with pride and clarity.',
				q2: 'What did Sheikh Mohamed Bachir El Ibrahimi do according to paragraph 2?',
				a2: 'He wrote eloquent essays so as to awaken love of knowledge across the entire nation.',
				q3: 'What type of letter is this (formal or informal)? Give one clue from the text.',
				a3: 'It is an informal (pen-pal) letter. Clues: greeting "Dear Aisha," and closing "Best wishes, Khadidja."',
				ref1Word: 'his (paragraph 2)',
				ref1Ans: 'Imam Abdelhamid Ben Badis',
				ref2Word: 'our (paragraph 3)',
				ref2Ans: 'Khadidja and her sister',
				textTypeCorrect: 'An informal intercultural pen-pal letter introducing Constantine and Algerian scholars',
				textTypeDistractors: [
					{
						text: 'A formal complaint letter addressed to a company director',
						diagnosticFeedback: 'The tone is friendly and addressed to a pen-pal named Aisha.'
					},
					{
						text: 'A scientific laboratory manual on optical lenses',
						diagnosticFeedback: 'The letter discusses culture, education, and hobbies, not optics.'
					},
					{
						text: 'A statistical survey report with percentages',
						diagnosticFeedback: 'No survey statistics appear in the passage.'
					}
				],
				theme: 'intercultural correspondence and Algerian scholarly heritage'
			},
			{
				title: 'The Art of Polite Correspondence Across Cultures',
				source: 'Adapted from Youth Language and Culture Journal',
				paragraphs: [
					'For centuries, written correspondence has connected scholars, students, and families across distant regions. Long before instant messaging existed, travellers such as Ibn Battuta carried handwritten letters of introduction from city to city in order to meet respected teachers and librarians. Although digital mail is much faster today, polite expression remains the soul of every meaningful letter.',
					'Good writers always adapt [[their]] language to the reader. When addressing a school director or museum curator, one must use complete sentences, respectful greetings such as Dear Sir or Madam, and formal closings like Yours faithfully. By contrast, when writing to a pen-pal, a student does not have to use rigid formulas; warm phrases like Dear Hamza and Best wishes create genuine friendship.',
					'Intercultural correspondence offers remarkable educational benefits for Algerian literary students. Through exchanging letters with peers in other countries, learners expand their vocabulary, practise clear grammar, and present authentic Algerian landmarks such as the Casbah of Algiers, the Great Mosque of Tlemcen, and the M-Zab Valley. [[It]] builds mutual respect without losing one-s identity.'
				],
				glossary: [
					{ term: 'curator', meaning: 'a person in charge of a museum or library collection' },
					{ term: 'rigid', meaning: 'very strict and formal' }
				],
				tfItems: [
					{
						q: 'Polite expression is no longer needed in modern digital mail.',
						a: 'False',
						c: 'Polite expression remains the soul of every meaningful letter.',
						mark: '0.5'
					},
					{
						q: 'Formal letters to a director require complete sentences and respectful closings.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Writing to pen-pals helps Algerian students improve English while sharing their own heritage.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Why did travellers like Ibn Battuta carry handwritten letters of introduction?',
				a1: 'They carried them in order to meet respected teachers and librarians.',
				q2: 'How does an informal pen-pal letter differ from a formal letter according to paragraph 2?',
				a2: 'A formal letter uses complete sentences, Dear Sir or Madam, and Yours faithfully, whereas a pen-pal letter uses warm phrases like Dear Hamza and Best wishes.',
				q3: 'Mention two Algerian landmarks cited in paragraph 3.',
				a3: 'The Casbah of Algiers, the Great Mosque of Tlemcen, and the M-Zab Valley (any two).',
				ref1Word: 'their (paragraph 2)',
				ref1Ans: 'good writers',
				ref2Word: 'It (paragraph 3)',
				ref2Ans: 'intercultural correspondence (exchanging letters with peers)',
				textTypeCorrect: 'An expository text explaining polite formal and informal correspondence across cultures',
				textTypeDistractors: [
					{
						text: 'A fictional tale about an old merchant in a desert market',
						diagnosticFeedback: 'The passage explains correspondence skills factually, not a fictional tale.'
					},
					{
						text: 'An environmental report on water pollution',
						diagnosticFeedback: 'The topic is letter writing and cultural exchange.'
					},
					{
						text: 'A short list of computer repair commands',
						diagnosticFeedback: 'No repair instructions are included.'
					}
				],
				theme: 'adapting register in formal and informal intercultural letters'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Justify False answers by correcting them from the text.'
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
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Choose the best description of the text:',
						options: mcq.options.map((o) => o.text),
						correct: variant.textTypeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which description best matches the passage?`,
				questionTextAr: 'اختر الوصف الأدق لنوع النص ومضمونه:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `The passage centers on ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then answer the questions below:',
				content
			},
			hints: [
				'ميّز نوع النص (رسالة شخصية أم مقال تفسيري) من خلال التحية والخاتمة وأسلوب الخطاب.',
				'استخرج الإجابات المباشرة من الفقرة المحددة في السؤال مع صياغة جملة تامة.',
				'في الضمائر المسطرة تحقق من الإفراد والجمع ومن المالك الأقرب قبل الضمير.'
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

// 2. Part One: B) Text Exploration — Correlative Conjunctions, Purpose & Final -s (8 pts)
const tpl1asTclT1CorrelativesPurposeTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t1_correlatives_purpose_te',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص — الروابط المزدوجة (both/either/neither) والغاية وبناء الكلمات ونطق -s',
	curriculumLessonId: 'eng_lesson_1as_tcl_t1_correlative_conjunctions',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'educate' },
						noun: { value: 'education', mark: '0.5' },
						adjective: { value: 'educational', mark: '0.5' }
					},
					{
						verb: { value: 'communicate', mark: '0.5' },
						noun: { given: true, value: 'communication' },
						adjective: { value: 'communicative', mark: '0.5' }
					}
				],
				comb1Prompt: 'a) Tlemcen attracts historians. Constantine attracts historians. (both ... and)',
				comb1Ans: 'Both Tlemcen and Constantine attract historians.',
				comb2Prompt: 'b) Karim does not use slang in formal letters. Amine does not use slang in formal letters. (neither ... nor)',
				comb2Ans: 'Neither Karim nor Amine uses slang in formal letters.',
				comb3Prompt: 'c) Meriem checked her draft twice. She did not want to send a spelling error. (so as not to)',
				comb3Ans: 'Meriem checked her draft twice so as not to send a spelling error.',
				agreementPrompt: 'Choose the right verb form: "Neither the director nor the librarians (was / were) absent yesterday."',
				agreementAns: 'were (agrees with the nearest subject: the librarians)',
				phonWords: ['books', 'letters', 'bridges', 'stamps', 'schools', 'languages'],
				phonCols: [
					{ header: '/s/', words: ['books', 'stamps'], mark: '0.5' },
					{ header: '/z/', words: ['letters', 'schools'], mark: '0.5' },
					{ header: '/iz/', words: ['bridges', 'languages'], mark: '0.5' }
				],
				mcqQuestion: 'Combine correctly using "neither ... nor": "Salma did not miss the lecture. Nadia did not miss the lecture."',
				mcqCorrect: 'Neither Salma nor Nadia missed the lecture.',
				mcqDistractors: [
					{
						text: 'Neither Salma nor Nadia did not miss the lecture.',
						diagnosticFeedback: 'Avoid double negatives; drop "did not" and use affirmative Past Simple "missed".'
					},
					{
						text: 'Neither Salma or Nadia missed the lecture.',
						diagnosticFeedback: '"Neither" always pairs with "nor", never "or".'
					},
					{
						text: 'Either Salma nor Nadia missed the lecture.',
						diagnosticFeedback: 'Incorrect correlative pair; use "neither ... nor".'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'respect' },
						noun: { value: 'respect', mark: '0.5' },
						adjective: { value: 'respectful', mark: '0.5' }
					},
					{
						verb: { value: 'correspond', mark: '0.5' },
						noun: { given: true, value: 'correspondence' },
						adjective: { value: 'corresponding', mark: '0.5' }
					}
				],
				comb1Prompt: 'a) You can write your reply in English. You can write your reply in Arabic. (either ... or)',
				comb1Ans: 'You can write your reply either in English or in Arabic.',
				comb2Prompt: 'b) Formal letters avoid contractions. Formal emails avoid contractions. (both ... and)',
				comb2Ans: 'Both formal letters and formal emails avoid contractions.',
				comb3Prompt: 'c) Sheikh El Mili wrote Algerian history. He wanted to preserve national memory. (in order to)',
				comb3Ans: 'Sheikh El Mili wrote Algerian history in order to preserve national memory.',
				agreementPrompt: 'Choose the right verb form: "Both Arabic literature and English grammar (is / are) vital for TCL pupils."',
				agreementAns: 'are (subjects joined by both ... and always take a plural verb)',
				phonWords: ['scripts', 'novels', 'pages', 'poets', 'readers', 'addresses'],
				phonCols: [
					{ header: '/s/', words: ['scripts', 'poets'], mark: '0.5' },
					{ header: '/z/', words: ['novels', 'readers'], mark: '0.5' },
					{ header: '/iz/', words: ['pages', 'addresses'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the grammatically correct sentence with subject-verb agreement:',
				mcqCorrect: 'Both Sheikh El Ibrahimi and Imam Ben Badis are honoured across Algeria.',
				mcqDistractors: [
					{
						text: 'Both Sheikh El Ibrahimi and Imam Ben Badis is honoured across Algeria.',
						diagnosticFeedback: '"Both ... and" always takes a plural verb (are).'
					},
					{
						text: 'Neither the teacher nor the students is ready for slang.',
						diagnosticFeedback: 'With "neither ... nor", the verb agrees with the nearest subject ("students" takes "are").'
					},
					{
						text: 'Either calligraphy nor poetry are taught here.',
						diagnosticFeedback: '"Either" pairs with "or", not "nor".'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledPhon = rng.shuffle(variant.phonWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) Combine each pair of sentences using the connectors in brackets (3.0 pts):\n${variant.comb1Prompt}\n${variant.comb2Prompt}\n${variant.comb3Prompt}`,
				answer: `a) ${variant.comb1Ans}\nb) ${variant.comb2Ans}\nc) ${variant.comb3Ans}`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.agreementPrompt} (1.5 pts)`,
				answer: variant.agreementAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) Classify the following words according to the pronunciation of their final -s (1.5 pts):\n${shuffledPhon.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.phonCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة السليمة نحويا:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Use matching pairs (both...and, either...or, neither...nor), avoid double negatives, and match verb agreement properly.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Complete the following morphology, grammar, and phonology activities:',
				content
			},
			hints: [
				'مع both ... and يكون الفعل دائما جمعا، ومع neither ... nor يطابق الفعل الفاعل الأقرب إليه ويكون مثبتا.',
				'احذف do not / does not / did not عند التحويل إلى neither ... nor.',
				'تذكّر أن الكلمات المنتهية بأصوات صفيرية (ge, ss, sh, ch, x) تأخذ /iz/ عند إضافة -s.'
			],
			solutionStepsAr: [
				`Combine (a): ${variant.comb1Ans}`,
				`Combine (b): ${variant.comb2Ans}`,
				`Combine (c): ${variant.comb3Ans}`,
				`Agreement: ${variant.agreementAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Modals of Obligation/Necessity & Stress (8 pts)
const tpl1asTclT1ModalsRegisterTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t1_modals_register_te',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص — أفعال الإلزام والمنع وعدم الضرورة والمفردات والنبر الصوتي',
	curriculumLessonId: 'eng_lesson_1as_tcl_t1_modals_obligation',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				vocabPrompt: 'Find synonyms from the box (heritage - polite - forbidden - brief): a) short = ..........  b) courteous = ..........  c) legacy = ..........  d) prohibited = ..........',
				vocabAns: 'a) brief   b) polite   c) heritage   d) forbidden',
				modalsPrompt:
					'Fill in each gap with (must, must not, do not have to, had to):\na) Visitors .......... remain quiet inside the mosque and library.\nb) You .......... write slang in a formal application letter; it is unacceptable.\nc) Entrance to the book fair is free, so students .......... buy tickets.\nd) Yesterday, Bilal .......... rewrite his address clearly before posting the letter.',
				modalsAns: 'a) must   b) must not   c) do not have to   d) had to',
				registerPrompt: 'Rewrite in formal register: "Hi! I wanna ask about the calligraphy class."',
				registerAns: 'Dear Sir or Madam, I am writing to inquire about the calligraphy class.',
				stressWords: ['letter', 'reply', 'culture', 'address', 'library', 'invite'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['letter', 'culture', 'library'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['reply', 'address', 'invite'], mark: '1.0' }
				],
				mcqQuestion: 'Choose the right modal expression: "Library membership is completely free for pupils, so you .......... pay anything."',
				mcqCorrect: 'do not have to',
				mcqDistractors: [
					{
						text: 'must not',
						diagnosticFeedback: '"must not" means forbidden, whereas free membership means no obligation.'
					},
					{
						text: 'must',
						diagnosticFeedback: '"must" expresses obligation, contradicting "free".'
					},
					{
						text: 'has to',
						diagnosticFeedback: 'Wrong agreement with "you" and opposite meaning.'
					}
				]
			},
			{
				vocabPrompt: 'Match opposites from the box (formal - genuine - polite - rigid): a) informal / ..........  b) rude / ..........  c) flexible / ..........  d) fake / ..........',
				vocabAns: 'a) formal   b) polite   c) rigid   d) genuine',
				modalsPrompt:
					'Fill in each gap with (has to, must not, need not, had to):\na) Amina .......... attach her school certificate when applying for the competition.\nb) Readers .......... tear pages out of public library books.\nc) You .......... bring your own dictionary; the reading room provides copies.\nd) Last week, our class .......... finish the cultural booklet before Thursday.',
				modalsAns: 'a) has to   b) must not   c) need not   d) had to',
				registerPrompt: 'Rewrite in formal register: "Thanks a lot, see u soon!"',
				registerAns: 'Thank you very much for your assistance. I look forward to hearing from you.',
				stressWords: ['sender', 'compose', 'greeting', 'respect', 'student', 'receive'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['sender', 'greeting', 'student'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['compose', 'respect', 'receive'], mark: '1.0' }
				],
				mcqQuestion: 'Choose the right past obligation form: "Last Friday, the students .......... submit their pen-pal letters early."',
				mcqCorrect: 'had to',
				mcqDistractors: [
					{
						text: 'musted',
						diagnosticFeedback: '"must" has no past form "musted"; use "had to".'
					},
					{
						text: 'must to',
						diagnosticFeedback: 'Never place "to" after "must", and the context is past.'
					},
					{
						text: 'has to',
						diagnosticFeedback: '"Last Friday" requires Past Simple "had to", and "students" is plural.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledStress = rng.shuffle(variant.stressWords);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${variant.vocabPrompt} (2.0 pts)`,
				answer: variant.vocabAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ${variant.modalsPrompt} (3.0 pts)`,
				answer: variant.modalsAns,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.registerPrompt} (1.0 pt)`,
				answer: variant.registerAns,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `4) Classify the following words according to their stressed syllable (2.0 pts):\n${shuffledStress.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.stressCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الفعل الناقص الصحيح حسب السياق والزمن:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Distinguish prohibition (must not), absence of necessity (do not have to / need not), and past obligation (had to).'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Complete the vocabulary, grammar, register, and stress activities:',
				content
			},
			hints: [
				'ميّز جيدا بين المنع (must not) وغياب الضرورة (do not have to / need not).',
				'ماضي must و have to هو دائما had to + الفعل المجرد.',
				'في الأسلوب الرسمي احذف الكلمات العامية والاختصارات واستعمل لغة كاملة مهذبة.'
			],
			solutionStepsAr: [
				`Vocabulary: ${variant.vocabAns}`,
				`Modals: ${variant.modalsAns}`,
				`Formal rewrite: ${variant.registerAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Formal / Informal Letter
const tpl1asTclT1FormalInformalLetterWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t1_formal_informal_letter_we',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة رسالة شخصية لصديق مراسلة أو رسالة رسمية مهذبة',
	curriculumLessonId: 'eng_lesson_1as_tcl_t1_formal_informal_letters',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'Write an informal pen-pal letter (90 to 110 words) to a new friend in Tunisia or Jordan introducing yourself, your 1AS Literary Stream studies, your useful hobbies, and one historic Algerian city.',
				topicOneNotes: [
					'Top right: Your city, Algeria + Date',
					'Greeting: Dear Tariq, / Dear Aisha,',
					'Paragraph 1: Name, age (15-16), 1AS Literary Stream student',
					'Paragraph 2: Favourite subjects (Arabic, History, English), wholesome hobbies (reading, calligraphy, sports)',
					'Paragraph 3: Describe your city or a famous landmark (Tlemcen / Constantine / Casbah of Algiers)',
					'Closing: Write back soon! Best wishes, + First name'
				],
				topicTwoPrompt:
					'Write a formal letter (90 to 110 words) to the Director of your Municipal Public Library requesting permission to organize a student reading circle every Saturday afternoon.',
				modelAnswer:
					'Tlemcen, Algeria\n18 November 2026\nDear Tariq,\nI hope this letter finds you and your family in good health. My name is Youssef, and I am a sixteen-year-old student in the first-year Literary Stream in Tlemcen. I am writing to you in order to start a lasting cultural friendship and practise English together. At school, I enjoy both Arabic literature and English because they broaden my knowledge. In my free time, I like reading Islamic history books and playing football with my brothers. Tlemcen is a peaceful city famous for its Great Mosque, ancient walls, and warm hospitality. Please write back soon and tell me about your town.\nBest wishes,\nYoussef',
				rubricSummary:
					'Correct informal letter layout (1.5 pts), Accurate use of purpose and correlative linkers (1.5 pts), Rich cultural content and warm register (1 pt), Mechanics and spelling (1 pt).',
				mcqQuestion: 'Which layout and closing belong to an informal pen-pal letter?',
				mcqCorrect: 'Sender address and date at top right, "Dear Aisha," and "Best wishes, Khadidja"',
				mcqDistractors: [
					{
						text: 'Two addresses, "Dear Sir or Madam," and "Yours faithfully, Khadidja Benali"',
						diagnosticFeedback: 'That is the exact layout of a formal letter, not a pen-pal letter.'
					},
					{
						text: '"Dear Sir or Madam," at the top and "See you later, buddy!" at the end',
						diagnosticFeedback: 'Never mix formal salutations with informal closings.'
					},
					{
						text: 'No greeting and no closing signature',
						diagnosticFeedback: 'Every letter must include an appropriate greeting and closing.'
					}
				]
			},
			{
				topicOnePrompt:
					'Write a formal letter of application (90 to 110 words) to the Coordinator of the Regional Youth Literature and Calligraphy Club applying to join their winter workshop.',
				topicOneNotes: [
					'Salutation: Dear Sir or Madam,',
					'Purpose: apply for the winter literature and Arabic calligraphy workshop',
					'Qualifications: 1AS Literary Stream student / strong interest in reading, writing, and Algerian heritage',
					'Commitment: must respect club rules and attend regularly in order to improve writing skills',
					'Closing: I look forward to hearing from you / Yours faithfully, + Full name'
				],
				topicTwoPrompt:
					'Write a short paragraph (90 to 110 words) explaining why every secondary school student must learn both formal and informal communication etiquette.',
				modelAnswer:
					'Dear Sir or Madam,\nI am writing to apply for membership in the Regional Youth Literature and Calligraphy Club for the upcoming winter session. I am a first-year Literary Stream student with a deep passion for reading, creative essays, and classical calligraphy. I wish to join your workshops in order to refine my writing skills and learn from experienced mentors. I am a disciplined student who respects both teachers and peers, and I am ready to attend every Saturday session punctually. I would be grateful if you could inform me of the registration documents needed. I look forward to hearing from you soon.\nYours faithfully,\nMeriem Boudiaf',
				rubricSummary:
					'Formal letter layout and contraction-free register (1.5 pts), Grammar accuracy with purpose and correlative structures (1.5 pts), Coherence and polite tone (1 pt), Mechanics (1 pt).',
				mcqQuestion: 'Which sentence is best suited for the opening of a formal application letter?',
				mcqCorrect: 'I am writing to apply for membership in the youth literature club.',
				mcqDistractors: [
					{
						text: 'Hey, I really wanna join your cool club!',
						diagnosticFeedback: 'Informal slang is forbidden in a formal letter.'
					},
					{
						text: 'I-m writing for apply to your club.',
						diagnosticFeedback: 'Avoid contractions (I-m) and use "to apply", not "for apply".'
					},
					{
						text: 'Put me in the club list right away.',
						diagnosticFeedback: 'Impolite imperative tone.'
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
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الخصائص أو الجملة السليمة لكتابة الرسالة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Always align layout, greeting, vocabulary, and closing with either formal or informal register.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a clear, well-organized letter:',
				content
			},
			hints: [
				'حافظ على وحدة الأسلوب: رسالة شخصية (Dear + الاسم الأول / Best wishes) أو رسمية (Dear Sir or Madam / Yours faithfully).',
				'وظف بنية الغاية (in order to) أو الروابط المزدوجة (both ... and) لإظهار تمكنك من دروس الفصل.',
				'راجع الترقيم والحروف الكبيرة لأسماء المدن واللغات والأعلام.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T1: EnglishParameterizedTemplate[] = [
	tpl1asTclT1LettersCultureComprehension,
	tpl1asTclT1CorrelativesPurposeTe,
	tpl1asTclT1ModalsRegisterTe,
	tpl1asTclT1FormalInformalLetterWe
];
