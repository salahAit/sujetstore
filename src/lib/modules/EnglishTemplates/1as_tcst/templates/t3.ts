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
// 4 Parameterized Templates — 1AS TCST Trimester 3 (8 + 7 + 7[alt] + 5 = 20)
// Unit 4: Eureka! (Science, Technology & Muslim Pioneers of Invention)
// ============================================================================

// 1. Part One: A) Reading Comprehension (8 pts)
const tpl1asTcstT3EurekaMuslimComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t3_eureka_muslim_comprehension',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — رواد العلم والابتكار في الحضارة الإسلامية (ابن الهيثم والخوارزمي والجزري)',
	curriculumLessonId: 'eng_lesson_1as_tcst_t3_concession',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Ibn al-Haytham: Pioneer of Optics and the Scientific Method',
				source: 'Adapted from Heritage of Islamic Science',
				paragraphs: [
					'Long before modern laboratories existed, Muslim scholars laid solid foundations for physics, mathematics, and engineering. Among the brightest of these pioneers was Al-Hasan Ibn al-Haytham, who was born in Basra in 965. Although ancient thinkers believed that human eyes sent out light rays to see objects, Ibn al-Haytham proved through careful experiments that vision occurs when light enters the eye from illuminated objects. [[His]] findings completely changed the science of optics.',
					'In his famous seven-volume masterpiece, the Book of Optics (Kitab al-Manazir), he described lenses, mirrors, refraction, and the dark chamber known as the camera obscura. This device was used to study how light travels in straight lines and later inspired the invention of photography. Despite the simplicity of eleventh-century instruments, every theory in [[it]] was tested by repeatable observation and mathematical proof.',
					'Today, historians of science recognize Ibn al-Haytham as an early architect of the experimental scientific method. His work was translated into Latin and studied in European universities for centuries. Although more than a thousand years have passed since his birth, his disciplined curiosity continues to inspire young scientists across Algeria and the world.'
				],
				glossary: [
					{ term: 'refraction', meaning: 'bending of light when it passes from one medium to another' },
					{ term: 'repeatable', meaning: 'able to be tested again with the same result' }
				],
				tfItems: [
					{
						q: 'Ibn al-Haytham agreed with ancient thinkers that the eye sends out rays of light.',
						a: 'False',
						c: 'He proved that vision occurs when light enters the eye from illuminated objects.',
						mark: '0.5'
					},
					{
						q: 'The camera obscura helped study how light travels in straight lines.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Ibn al-Haytham tested his scientific theories through observation and mathematical proof.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'When and where was Ibn al-Haytham born?',
				a1: 'He was born in 965 in Basra.',
				q2: 'What subjects did Ibn al-Haytham describe in his Book of Optics?',
				a2: 'He described lenses, mirrors, refraction, and the dark chamber (camera obscura).',
				q3: 'How did his work influence later scholars outside the Muslim world?',
				a3: 'His work was translated into Latin and studied in European universities for centuries.',
				ref1Word: 'His (paragraph 1)',
				ref1Ans: 'Ibn al-Haytham',
				ref2Word: 'it (paragraph 2)',
				ref2Ans: 'the Book of Optics (Kitab al-Manazir)',
				textTypeCorrect: 'A scientific biography highlighting Ibn al-Haytham-s contributions to optics',
				textTypeDistractors: [
					{
						text: 'A survey report on teenage smartphone usage',
						diagnosticFeedback: 'The text is a historical biography, not a teenage survey.'
					},
					{
						text: 'A formal email requesting a workshop seat',
						diagnosticFeedback: 'There is no email header or application request.'
					},
					{
						text: 'A weather forecast for North Africa',
						diagnosticFeedback: 'The passage discusses the history of optics and science.'
					}
				],
				theme: 'Ibn al-Haytham and the birth of experimental optics'
			},
			{
				title: 'Al-Khwarizmi and Al-Jazari: From Algorithms to Mechanical Engineering',
				source: 'Adapted from Muslim Inventions and Technology',
				paragraphs: [
					'Every time a student solves an algebraic equation or runs a computer program, he or she relies on ideas developed during the Islamic Golden Age. Muhammad ibn Musa al-Khwarizmi, a brilliant ninth-century mathematician, wrote the foundational treatise on algebra. The modern English word "algorithm" is derived from [[his]] Latinized name, because he designed clear step-by-step procedures for solving numerical problems.',
					'Centuries later, in 1206, the Muslim engineer Badi al-Zaman al-Jazari completed his illustrated Book of Knowledge of Ingenious Mechanical Devices. In [[this]] remarkable manual, he detailed more than fifty useful machines, including water-raising pumps, precision water clocks, and the crank-connecting rod mechanism. Although they were built without electricity, these devices operated smoothly using water power, gears, and valves.',
					'Modern engineering owes a clear debt to these Muslim innovators. Their inventions were not designed for idle show; rather, they were created in order to serve agriculture, irrigation, timekeeping, and everyday human needs. Studying their legacy encourages Algerian scientific students to combine ethical values with technical creativity.'
				],
				glossary: [
					{ term: 'treatise', meaning: 'a formal written scientific book' },
					{ term: 'ingenious', meaning: 'clever, original, and inventive' }
				],
				tfItems: [
					{
						q: 'The English word "algorithm" comes from the name of Al-Khwarizmi.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Al-Jazari-s machines needed modern electricity to operate.',
						a: 'False',
						c: 'They operated using water power, gears, and valves without electricity.',
						mark: '0.5'
					},
					{
						q: 'Muslim inventors created machines mainly to meet practical human needs like irrigation and timekeeping.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Why is the modern word "algorithm" linked to Al-Khwarizmi?',
				a1: 'Because it is derived from his Latinized name and he designed clear step-by-step procedures for solving numerical problems.',
				q2: 'Mention two mechanical devices described in Al-Jazari-s book.',
				a2: 'Water-raising pumps, precision water clocks, and the crank-connecting rod mechanism.',
				q3: 'What practical purposes were these Muslim inventions created to serve?',
				a3: 'They were created to serve agriculture, irrigation, timekeeping, and everyday human needs.',
				ref1Word: 'his (paragraph 1)',
				ref1Ans: 'Muhammad ibn Musa al-Khwarizmi',
				ref2Word: 'this (paragraph 2)',
				ref2Ans: 'Al-Jazari-s Book of Knowledge of Ingenious Mechanical Devices',
				textTypeCorrect: 'An informative science history text about Al-Khwarizmi and Al-Jazari',
				textTypeDistractors: [
					{
						text: 'A fictional tale about a desert merchant',
						diagnosticFeedback: 'The passage presents documented historical scientists and inventions.'
					},
					{
						text: 'An informal letter to a pen-pal',
						diagnosticFeedback: 'The style is formal and academic, not a personal letter.'
					},
					{
						text: 'An environmental report on forest fires',
						diagnosticFeedback: 'The topic is mathematics and mechanical engineering history.'
					}
				],
				theme: 'the contributions of Al-Khwarizmi and Al-Jazari to mathematics and engineering'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Justify False statements by correcting them from the text.'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which statement best describes the passage?`,
				questionTextAr: 'اختر الوصف الأدق لمضمون النص العلمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `The passage celebrates ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 8,
				instruction: 'Read the text carefully then answer the questions below:',
				content
			},
			hints: [
				'استعن بأسماء الأعلام والتواريخ داخل الفقرات لتحديد إجابات الأسئلة المباشرة بسرعة.',
				'انتبه لروابط الاستدراك (Although / Despite) في النص لأنها غالبا محور أسئلة True/False.',
				'في سؤال الضمائر أعد قراءة الجملة السابقة للضمير المسطر لتحديد الاسم العائد عليه.'
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

// 2. Part One: B) Text Exploration — Passive Voice, Concession & Word Building (7 pts)
const tpl1asTcstT3PassiveConcessionTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t3_passive_concession_te',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص — المبني للمجهول والاستدراك (Although / Despite) وبناء الكلمات ونطق -ed',
	curriculumLessonId: 'eng_lesson_1as_tcst_t3_passive_voice',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'invent' },
						noun: { value: 'invention', mark: '0.5' },
						adjective: { value: 'inventive', mark: '0.5' }
					},
					{
						verb: { value: 'develop', mark: '0.5' },
						noun: { given: true, value: 'development' },
						adjective: { value: 'developed', mark: '0.5' }
					}
				],
				passPrompt: 'a) Al-Jazari designed precision water clocks in 1206.\nStart with: Precision water clocks ..........',
				passAns: 'Precision water clocks were designed by Al-Jazari in 1206.',
				concPrompt: 'b) Although early lenses were simple, Ibn al-Haytham achieved accurate results. (Rewrite with Despite)',
				concAns: 'Despite the simplicity of early lenses (OR Despite early lenses being simple), Ibn al-Haytham achieved accurate results.',
				edWords: ['developed', 'designed', 'invented', 'tested', 'produced', 'measured'],
				edCols: [
					{ header: '/t/', words: ['developed', 'produced'], mark: '0.5' },
					{ header: '/d/', words: ['designed', 'measured'], mark: '0.5' },
					{ header: '/id/', words: ['invented', 'tested'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the correct Passive Voice sentence for: "Scientists use satellites to monitor climate."',
				mcqCorrect: 'Satellites are used by scientists to monitor climate.',
				mcqDistractors: [
					{
						text: 'Satellites is used by scientists to monitor climate.',
						diagnosticFeedback: '"Satellites" is plural and takes "are", not "is".'
					},
					{
						text: 'Satellites were used by scientists to monitor climate.',
						diagnosticFeedback: 'The original verb "use" is Present Simple, not Past Simple.'
					},
					{
						text: 'Satellites are use by scientists to monitor climate.',
						diagnosticFeedback: 'Passive voice requires the Past Participle (used), not the stem.'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'observe' },
						noun: { value: 'observation', mark: '0.5' },
						adjective: { value: 'observant', mark: '0.5' }
					},
					{
						verb: { value: 'measure', mark: '0.5' },
						noun: { given: true, value: 'measurement' },
						adjective: { value: 'measurable', mark: '0.5' }
					}
				],
				passPrompt: 'a) Al-Khwarizmi wrote a famous treatise on algebra.\nStart with: A famous treatise on algebra ..........',
				passAns: 'A famous treatise on algebra was written by Al-Khwarizmi.',
				concPrompt: 'b) Although modern labs are expensive, universities invest in research. (Rewrite with However)',
				concAns: 'Modern labs are expensive. However, universities invest in research.',
				edWords: ['researched', 'proved', 'created', 'translated', 'worked', 'studied'],
				edCols: [
					{ header: '/t/', words: ['researched', 'worked'], mark: '0.5' },
					{ header: '/d/', words: ['proved', 'studied'], mark: '0.5' },
					{ header: '/id/', words: ['created', 'translated'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the grammatically correct concession sentence:',
				mcqCorrect: 'Despite facing limited resources, the team built a working solar pump.',
				mcqDistractors: [
					{
						text: 'Despite of facing limited resources, the team built a working solar pump.',
						diagnosticFeedback: 'Never write "of" after "despite".'
					},
					{
						text: 'Although facing limited resources, but the team built a working solar pump.',
						diagnosticFeedback: 'Never combine "Although" and "but", and "Although" needs Subject + Verb.'
					},
					{
						text: 'Despite they faced limited resources, the team built a working solar pump.',
						diagnosticFeedback: '"Despite" cannot be followed directly by a full Subject + Verb clause.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledEd = rng.shuffle(variant.edWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) Rewrite the following sentences as indicated (3.5 pts):\n${variant.passPrompt}\n${variant.concPrompt}`,
				answer: `a) ${variant.passAns}\nb) ${variant.concAns}`,
				mark: '3.5'
			},
			{
				type: 'text',
				content: `3) Classify the following past participles according to the pronunciation of final -ed (1.5 pts):\n${shuffledEd.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.edCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
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
				explanation: 'Check singular/plural agreement and past participles in Passive Voice, and follow Despite with a noun phrase or V-ing.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Complete the following word formation, grammar, and phonology tasks:',
				content
			},
			hints: [
				'في المبني للمجهول حدد أولا هل الفاعل الجديد مفرد أم جمع وهل الزمن مضارع أم ماض.',
				'بعد Despite نضع اسما أو Verb-ing ولا نكتب of أبدا، ومع However نضع نقطة قبلها وفاصلة بعدها.',
				'تذكر نطق /id/ فقط للأفعال المنتهية بصوت /t/ أو /d/ مثل invented, tested, created.'
			],
			solutionStepsAr: [
				`Passive: ${variant.passAns}`,
				`Concession: ${variant.concAns}`,
				`Final -ed: ${variant.edCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Prepositions, Suffixes (-er / -ist / -or) & Syllable Count (7 pts)
const tpl1asTcstT3PrepositionsMorphologyTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t3_prepositions_morphology_te',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'vocabulary_morphology',
	titleAr: 'استكشاف النص — حروف الجر التقنية ولواحق المهن العلمية وعدد المقاطع الصوتية',
	curriculumLessonId: 'eng_lesson_1as_tcst_t3_prepositions_word_formation',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				personPrompt: 'Form the name of the person/specialist using (-er, -or, -ist): a) science  b) invent  c) research  d) chemistry',
				personAns: 'a) scientist   b) inventor   c) researcher   d) chemist',
				prepPrompt:
					'Fill in each gap with the right preposition (for, of, on, in):\na) A thermometer is used .......... measuring body temperature.\nb) Modern robotics depends .......... accurate algorithms.\nc) The optical kit consists .......... three glass lenses.\nd) Many Algerian students are interested .......... renewable energy.',
				prepAns: 'a) for   b) on   c) of   d) in',
				sylWords: ['lens', 'optics', 'scientist', 'technology', 'pump', 'machine'],
				sylCols: [
					{ header: '1 Syllable', words: ['lens', 'pump'], mark: '0.5' },
					{ header: '2 Syllables', words: ['optics', 'machine'], mark: '0.5' },
					{ header: '3+ Syllables', words: ['scientist', 'technology'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the right preposition: "A compass is used .......... determining the Qibla and geographic directions."',
				mcqCorrect: 'for',
				mcqDistractors: [
					{
						text: 'to',
						diagnosticFeedback: '"used to" takes a base verb (determine), whereas "used for" takes V-ing (determining).'
					},
					{
						text: 'on',
						diagnosticFeedback: '"depend on" takes "on", not "used ... determining".'
					},
					{
						text: 'of',
						diagnosticFeedback: '"made of / consist of" take "of", not "used ... determining".'
					}
				]
			},
			{
				personPrompt: 'Form the name of the person/specialist using (-er, -or, -ist): a) physics  b) design  c) create  d) biology',
				personAns: 'a) physicist   b) designer   c) creator   d) biologist',
				prepPrompt:
					'Fill in each gap with the right preposition (of, to, on, for):\na) This solar water heater is made .......... copper and glass.\nb) A microscope is used .......... observe tiny microorganisms.\nc) Scientific progress depends .......... honest observation.\nd) Ibn al-Haytham is famous .......... his Book of Optics.',
				prepAns: 'a) of   b) to   c) on   d) for',
				sylWords: ['light', 'device', 'engineer', 'experiment', 'clock', 'method'],
				sylCols: [
					{ header: '1 Syllable', words: ['light', 'clock'], mark: '0.5' },
					{ header: '2 Syllables', words: ['device', 'method'], mark: '0.5' },
					{ header: '3+ Syllables', words: ['engineer', 'experiment'], mark: '0.5' }
				],
				mcqQuestion: 'Which derived noun correctly names a specialist in biology?',
				mcqCorrect: 'biologist',
				mcqDistractors: [
					{
						text: 'biologer',
						diagnosticFeedback: 'Scientific fields like biology take -ist, not -er.'
					},
					{
						text: 'biologment',
						diagnosticFeedback: '-ment forms abstract nouns, not people.'
					},
					{
						text: 'biologor',
						diagnosticFeedback: 'Incorrect suffix for biology.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledSyl = rng.shuffle(variant.sylWords);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${variant.personPrompt} (2.0 pts)`,
				answer: variant.personAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ${variant.prepPrompt} (3.5 pts)`,
				answer: variant.prepAns,
				mark: '3.5'
			},
			{
				type: 'text',
				content: `3) Classify the following scientific terms according to their number of syllables (1.5 pts):\n${shuffledSyl.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.sylCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة في حروف الجر أو بناء الكلمات:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Remember fixed scientific collocations (used for + V-ing, used to + stem, consist of, depend on) and specialist suffixes (-ist, -er, -or).'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Complete the morphology, prepositions, and syllable tasks:',
				content
			},
			hints: [
				'العلوم المنتهية بـ y أو ics تأخذ اللاحقة -ist (biology: biologist, physics: physicist).',
				'فرق بين used for + V-ing و used to + Stem.',
				'احسب عدد المقاطع الصوتية بعدد أصوات العلة المنطوقة لا الحروف الصامتة.'
			],
			solutionStepsAr: [
				`Specialists: ${variant.personAns}`,
				`Prepositions: ${variant.prepAns}`,
				`Syllables: ${variant.sylCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Scientific Biography / Invention Profile
const tpl1asTcstT3InventionBioWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t3_invention_bio_we',
	grade: '1as_tcst',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة سيرة علمية لعالم مسلم أو بطاقة اختراع مفيد',
	curriculumLessonId: 'eng_lesson_1as_tcst_t3_scientific_biography',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'Using the fact file below, write a short scientific biography (90 to 110 words) about the Muslim mathematician Muhammad ibn Musa al-Khwarizmi.',
				topicOneNotes: [
					'Full Name: Muhammad ibn Musa al-Khwarizmi',
					'Date and Place of Birth: around 780, Khwarizm',
					'Fields: Mathematics, astronomy, and geography',
					'Main Achievements: worked in Baghdad House of Wisdom / wrote the foundational book on Algebra / introduced Hindu-Arabic numerals and algorithms',
					'Date of Death and Legacy: died around 850 / still celebrated as the founder of algebra'
				],
				topicTwoPrompt:
					'Write a short paragraph (90 to 110 words) presenting one modern scientific invention (such as solar panels or the microscope) and explaining how it serves humanity.',
				modelAnswer:
					'Muhammad ibn Musa al-Khwarizmi was one of the most influential Muslim scholars in the history of science. He was born around 780 in Khwarizm and later worked in Baghdad, where he devoted his life to mathematics, astronomy, and geography. He is best known for writing the foundational treatise on algebra, which introduced systematic methods for solving linear and quadratic equations. In addition, the modern term "algorithm" was derived from his name because of his clear calculating rules. Although Al-Khwarizmi died around 850, his pioneering work is still taught worldwide and forms the backbone of modern mathematics and computing.',
				rubricSummary:
					'Complete use of biographical fact file (1.5 pts), Accurate Past Simple, Passive Voice, and Concession (1.5 pts), Chronological cohesion (1 pt), Mechanics and capitalization (1 pt).',
				mcqQuestion: 'Which opening sentence is grammatically accurate for a scientific biography?',
				mcqCorrect: 'Al-Khwarizmi was born around 780 and became a renowned Muslim mathematician.',
				mcqDistractors: [
					{
						text: 'Al-Khwarizmi born around 780 and become a renowned Muslim mathematician.',
						diagnosticFeedback: 'Always write "was born" and use Past Simple "became".'
					},
					{
						text: 'Al-Khwarizmi is born around 780 and was a mathematician today.',
						diagnosticFeedback: 'Historical birth dates require Past Simple "was born".'
					},
					{
						text: 'Al-Khwarizmi were born around 780 in Khwarizm.',
						diagnosticFeedback: 'Singular subject takes "was born", not "were born".'
					}
				]
			},
			{
				topicOnePrompt:
					'Using the notes below, write a short scientific report (90 to 110 words) presenting the Muslim mechanical engineer Al-Jazari and his water-raising inventions.',
				topicOneNotes: [
					'Scholar: Badi al-Zaman al-Jazari (1136 to 1206)',
					'Field: Mechanical engineering and precision timekeeping',
					'Famous Book: Book of Knowledge of Ingenious Mechanical Devices (1206)',
					'Key Inventions: water-raising pumps, water clocks, crank-connecting rod mechanism',
					'Purpose and Impact: used for irrigation and clean water supply / inspired modern mechanical engineering'
				],
				topicTwoPrompt:
					'Write a short paragraph (90 to 110 words) discussing both the benefits of smartphones for students and the disadvantages of overusing them. Use concession connectors (Although, However, Despite).',
				modelAnswer:
					'Badi al-Zaman al-Jazari, who was born in 1136 and died in 1206, was a brilliant Muslim mechanical engineer. In 1206, he completed his famous Book of Knowledge of Ingenious Mechanical Devices, in which more than fifty machines were clearly illustrated. Among his greatest achievements were mechanical water-raising pumps, precision water clocks, and the crank-connecting rod mechanism. These devices were designed in order to supply cities and farms with water efficiently. Although they were built centuries before electricity, they worked with remarkable accuracy. Today, Al-Jazari is still admired by engineers around the world for his practical and creative spirit.',
				rubricSummary:
					'Accurate inclusion of fact file notes (1.5 pts), Correct Passive Voice and Past Simple (1.5 pts), Logical paragraph flow (1 pt), Spelling and punctuation (1 pt).',
				mcqQuestion: 'Which sentence correctly combines Passive Voice and Purpose in an invention report?',
				mcqCorrect: 'Water pumps were designed by Al-Jazari in order to irrigate farms efficiently.',
				mcqDistractors: [
					{
						text: 'Water pumps designed by Al-Jazari in order to irrigating farms.',
						diagnosticFeedback: 'Missing auxiliary "were" and wrong verb form after "in order to".'
					},
					{
						text: 'Water pumps was designed by Al-Jazari for irrigate farms.',
						diagnosticFeedback: 'Plural "pumps" takes "were", and "for" requires V-ing.'
					},
					{
						text: 'Al-Jazari were designed water pumps to irrigating farms.',
						diagnosticFeedback: 'Subject and object are inverted and infinitive form is incorrect.'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة السليمة لبناء السيرة العلمية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'A scientific biography combines accurate Past Simple dates, Passive Voice for works/inventions, and Present Simple for lasting legacy.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a well-structured paragraph:',
				content
			},
			hints: [
				'رتّب السيرة زمنيا: الميلاد والنشأة، ثم المجال العلمي، ثم أهم الكتب والاختراعات، ثم الوفاة والأثر الباقي.',
				'استعمل was born و was written by / were designed by لإثراء أسلوبك العلمي.',
				'استخدم Although في الخاتمة لبيان استمرار أثر العالم حتى اليوم.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T3: EnglishParameterizedTemplate[] = [
	tpl1asTcstT3EurekaMuslimComprehension,
	tpl1asTcstT3PassiveConcessionTe,
	tpl1asTcstT3PrepositionsMorphologyTe,
	tpl1asTcstT3InventionBioWe
];
