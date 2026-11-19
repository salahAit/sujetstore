import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ============================================================================
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 2
// Unit 2: Waste Not, Want Not + Unit 3: Budding Scientist
// Split: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ============================================================================

// [1] Comprehension (8 pts) — Renewable Energy, Water Conservation & Fighting Poverty
export const tpl2asSciT2CompRenewableEnergy: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t2_comp_renewable_energy',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): الطاقات المتجددة، ترشيد الماء، ومحاربة الفقر',
	curriculumLessonId: 'eng_lesson_2as_sci_t2_passive_modals',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Solar Power in the Algerian Sahara',
				source: 'Adapted from North African Energy Review',
				paragraphs: [
					'For decades, fossil fuels such as oil and natural gas have powered modern industry, yet [[they]] are non-renewable and release greenhouse gases that warm the atmosphere. Consequently, many countries are investing heavily in clean energy sources that will never run out.',
					'Algeria possesses one of the highest solar energy potentials in the world, especially in southern provinces like Adrar, Tamanrasset, and Biskra, where sunshine exceeds three thousand hours every year. Photovoltaic stations are being built across these sunny regions so that clean electricity can be generated and stored for local towns and farms.',
					'Expanding solar power does not merely protect nature; [[it]] also creates technical jobs, lowers farming irrigation costs, and helps rural families fight poverty. If solar resources are managed wisely, Algeria will be able to conserve fossil reserves for future generations.'
				],
				glossary: [
					{ term: 'photovoltaic', meaning: 'converting sunlight directly into electricity' },
					{ term: 'reserves', meaning: 'stored supplies kept for future use' }
				],
				tfItems: [
					{
						q: 'a) Fossil fuels are renewable and cause zero air pollution.',
						a: 'False',
						c: 'They are non-renewable and release greenhouse gases that warm the atmosphere.',
						mark: '0.5'
					},
					{
						q: 'b) Southern Algerian provinces receive over three thousand hours of sunshine annually.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Solar energy projects benefit only environmental protection and never create jobs.',
						a: 'False',
						c: 'They also create technical jobs, lower irrigation costs, and help fight poverty.',
						mark: '0.5'
					},
					{
						q: 'd) Wise solar management can help conserve fossil fuels for coming generations.',
						a: 'True',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Why are many countries investing in clean renewable energy sources?',
						a: 'Because fossil fuels are non-renewable and release greenhouse gases that warm the atmosphere.',
						mark: '1.0'
					},
					{
						q: 'b) Name two Algerian southern provinces mentioned for their high solar potential.',
						a: 'Adrar, Tamanrasset, and Biskra (any two).',
						mark: '1.0'
					},
					{
						q: 'c) Give two economic or social benefits of expanding solar power in Algeria.',
						a: 'It creates technical jobs, lowers farming irrigation costs, and helps rural families fight poverty (any two).',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) they (§1)   b) it (§3)',
				refAnswer: 'a) they (§1): fossil fuels (oil and natural gas).   b) it (§3): expanding solar power.',
				mcHeader: '4) Choose the most appropriate general idea for the text:',
				mcOptions: [
					'Solar energy in Algeria protects the environment and supports sustainable development.',
					'Oil and gas will never decrease in quantity.',
					'Farming is impossible in southern Algeria.'
				],
				mcCorrect: 'Solar energy in Algeria protects the environment and supports sustainable development.',
				quizStem: 'According to the passage on Solar Power in the Algerian Sahara, how does solar expansion help rural families?',
				quizCorrect: 'It lowers irrigation costs, creates technical jobs, and helps combat poverty',
				quizDistractors: [
					{
						text: 'It increases greenhouse gas emissions in desert provinces',
						diagnosticFeedback: 'Solar energy is clean and does not emit greenhouse gases.'
					},
					{
						text: 'It replaces agriculture completely with factories',
						diagnosticFeedback: 'On the contrary, it lowers farming irrigation costs to support agriculture.'
					},
					{
						text: 'It works only during winter storms',
						diagnosticFeedback: 'Southern provinces benefit from over 3,000 hours of sunshine each year.'
					}
				],
				quizExplanation: 'الفقرة الثالثة تؤكد أن الطاقة الشمسية تخلق مناصب شغل تقنية وتخفض كلفة الري وتساعد في محاربة الفقر.'
			},
			{
				title: 'Waste Not, Want Not: Saving Water to Fight Poverty',
				source: 'Adapted from Sustainable Resources Bulletin',
				paragraphs: [
					'Fresh water is essential for life, agriculture, and industry, yet less than one percent of the Earth\'s water is easily accessible for human use. Owing to climate change, rapid urban growth, and careless waste, many regions now suffer from severe water shortages.',
					'Modern science offers practical ways to conserve this vital resource. In agriculture, drip irrigation delivers small drops directly to plant roots, reducing water loss by half. At home, leaking taps must be repaired immediately, and rainwater can be collected in clean tanks for gardening and cleaning.',
					'When communities stop wasting water and food, [[they]] reduce living expenses and protect fertile land for poor farmers. Indeed, conserving natural resources is both an ethical duty and a smart investment in human prosperity, because [[it]] guarantees dignity for all.'
				],
				glossary: [
					{ term: 'accessible', meaning: 'easy to reach or obtain' },
					{ term: 'drip irrigation', meaning: 'watering crops slowly drop by drop at the roots' }
				],
				tfItems: [
					{
						q: 'a) Most of the Earth\'s water is easily accessible fresh water.',
						a: 'False',
						c: 'Less than one percent of the Earth\'s water is easily accessible for human use.',
						mark: '0.5'
					},
					{
						q: 'b) Drip irrigation helps cut agricultural water loss by half.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Collecting rainwater in tanks is useless at home.',
						a: 'False',
						c: 'Rainwater can be collected in clean tanks for gardening and cleaning.',
						mark: '0.5'
					},
					{
						q: 'd) Conserving water and food helps lower living costs and protect fertile land.',
						a: 'True',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Mention two causes of severe water shortages stated in the first paragraph.',
						a: 'Climate change, rapid urban growth, and careless waste (any two).',
						mark: '1.0'
					},
					{
						q: 'b) How does drip irrigation save water in agriculture?',
						a: 'It delivers small drops directly to plant roots, cutting water loss by half.',
						mark: '1.0'
					},
					{
						q: 'c) What two actions can families take at home to conserve water?',
						a: 'They must repair leaking taps immediately and collect rainwater in clean tanks.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) they (§3)   b) it (§3)',
				refAnswer: 'a) they (§3): communities.   b) it (§3): conserving natural resources.',
				mcHeader: '4) The text is mainly:',
				mcOptions: ['Expository', 'Biographical', 'Historical'],
				mcCorrect: 'Expository',
				quizStem: 'Why is drip irrigation recommended in the passage on water conservation?',
				quizCorrect: 'It sends water directly to plant roots and reduces agricultural water loss by half',
				quizDistractors: [
					{
						text: 'It uses twice as much water as traditional flooding',
						diagnosticFeedback: 'Drip irrigation actually cuts water loss by fifty percent.'
					},
					{
						text: 'It only works with salty ocean water',
						diagnosticFeedback: 'The passage discusses conserving fresh water for crops.'
					},
					{
						text: 'It eliminates the need to repair leaking taps at home',
						diagnosticFeedback: 'Repairing leaking taps is a separate household conservation measure.'
					}
				],
				quizExplanation: 'الري بالتقطير يوجّه الماء مباشرة إلى جذور النباتات فيقلص الضياع إلى النصف.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Say whether the following statements are True or False according to the text (correct the false ones):'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: '2) Answer the following questions according to the text:' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.5' },
			{
				type: 'multiple_choice',
				groups: [
					{
						header: v.mcHeader,
						options: v.mcOptions,
						correct: v.mcCorrect,
						mark: '1.5'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة وفق النص:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A. Comprehension',
				points: 8,
				instruction: 'Read the passage carefully then do the comprehension activities.',
				content
			},
			hints: [
				'انتبه للمؤشرات السببية (Owing to / Consequently / Because) عند استخراج الأسباب والنتائج.',
				'صحح العبارات الخاطئة بجملة موجزة من النص.',
				'تأكد من عودة الضمائر (they / it) إلى أقرب اسم مناسب في العدد والمعنى.'
			],
			solutionStepsAr: [
				'فحص عبارات True/False وتصحيح الخاطئ منها.',
				'الإجابة عن أسئلة الفهم بدقة من الفقرات المحددة.',
				'استخراج مرجع الضمائر وتحديد الفكرة العامة أو نوع النص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Comprehension (8 pts) — Budding Scientist & Muslim Scientific Pioneers
export const tpl2asSciT2CompBuddingScientist: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t2_comp_budding_scientist',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): العالم الناشئ والمنهج التجريبي عند العلماء المسلمين',
	curriculumLessonId: 'eng_lesson_2as_sci_t2_conditionals_0_1_2',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Ibn al-Haytham and the Birth of the Experimental Method',
				source: 'History of Islamic Science Series',
				paragraphs: [
					'Long before modern laboratories existed, Muslim scientist Hasan Ibn al-Haytham revolutionized the study of light and vision in the eleventh century. Instead of blindly accepting old assumptions about how human eyes see, [[he]] insisted that every scientific claim must be tested through careful observation and repeatable experiments.',
					'Using darkened rooms, small pinholes, mirrors, and glass lenses, Ibn al-Haytham proved that light travels in straight lines and enters the eye from illuminated objects. If a narrow beam of light passes through a tiny opening into a dark box, an inverted image appears on the opposite wall. [[This]] discovery laid the scientific foundation for the modern camera.',
					'His masterpiece, the Book of Optics, was translated into Latin and guided generations of researchers across the globe. Today, young budding scientists still follow his core rule: observe accurately, test your hypothesis honestly, and accept only verified evidence.'
				],
				glossary: [
					{ term: 'pinhole', meaning: 'a very small round opening' },
					{ term: 'inverted', meaning: 'turned upside down' }
				],
				tfItems: [
					{
						q: 'a) Ibn al-Haytham accepted old theories about vision without testing them.',
						a: 'False',
						c: 'He insisted that every scientific claim must be tested through observation and repeatable experiments.',
						mark: '0.5'
					},
					{
						q: 'b) He proved that light travels in straight lines into the eye.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) His pinhole dark-room experiment laid the basis for the modern camera.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'd) The Book of Optics was never translated into any other language.',
						a: 'False',
						c: 'It was translated into Latin and guided generations of researchers worldwide.',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) The pinhole light experiment and the camera.   b) The lasting scientific rule for budding scientists today.',
				paraMatchAnswer: 'a) Paragraph 2 (§2).   b) Paragraph 3 (§3).',
				compQuestions: [
					{
						q: 'a) What tools did Ibn al-Haytham use in his optical experiments?',
						a: 'He used darkened rooms, small pinholes, mirrors, and glass lenses.',
						mark: '1.0'
					},
					{
						q: 'b) What happens if a narrow beam of light passes through a tiny opening into a dark box?',
						a: 'An inverted image appears on the opposite wall.',
						mark: '1.0'
					},
					{
						q: 'c) What three steps form Ibn al-Haytham\'s core scientific rule for young researchers?',
						a: 'Observe accurately, test the hypothesis honestly, and accept only verified evidence.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) he (§1)   b) This (§2)',
				refAnswer: 'a) he (§1): Hasan Ibn al-Haytham.   b) This (§2): the dark-box pinhole light discovery (an inverted image appearing on the opposite wall).',
				quizStem: 'What major methodological principle did Ibn al-Haytham establish in the eleventh century?',
				quizCorrect: 'Every scientific claim must be verified through careful observation and repeatable experiments',
				quizDistractors: [
					{
						text: 'Old assumptions should always be memorized without testing',
						diagnosticFeedback: 'He rejected blind acceptance of untested assumptions.'
					},
					{
						text: 'Light bends into circles inside a dark room',
						diagnosticFeedback: 'He proved that light travels in straight lines.'
					},
					{
						text: 'Experiments are unnecessary in physics and optics',
						diagnosticFeedback: 'He pioneered the experimental method in optics.'
					}
				],
				quizExplanation: 'ابن الهيثم رسّخ المنهج التجريبي القائم على الملاحظة الدقيقة والتجربة القابلة للتكرار والبرهان.'
			},
			{
				title: 'Al-Khwarizmi and Al-Jazari: Pillars of Science and Engineering',
				source: 'Adapted from Pioneers of Knowledge',
				paragraphs: [
					'During the golden era of Islamic civilization, scholars combined pure mathematical logic with practical inventions that served everyday society. Muhammad ibn Musa al-Khwarizmi wrote the foundational treatise on algebra, showing how systematic step-by-step rules can solve equations accurately.',
					'Centuries later, the brilliant engineer Al-Jazari designed automatic water-raising machines, precision water clocks, and mechanical valves. [[He]] documented every gear and measurement with detailed drawings so that other craftsmen could build and test [[them]] reliably.',
					'Modern computing still honours Al-Khwarizmi through the word "algorithm", while mechanical engineering owes essential concepts like the crankshaft to Al-Jazari. Their legacy reminds every budding scientist that curiosity, discipline, and clear documentation turn ideas into lasting discoveries.'
				],
				glossary: [
					{ term: 'treatise', meaning: 'a formal written scientific book on a subject' },
					{ term: 'crankshaft', meaning: 'a mechanical shaft that converts circular motion into linear motion' }
				],
				tfItems: [
					{
						q: 'a) Al-Khwarizmi\'s work focused only on poetry and avoided mathematics.',
						a: 'False',
						c: 'He wrote the foundational treatise on algebra and systematic rules for solving equations.',
						mark: '0.5'
					},
					{
						q: 'b) Al-Jazari designed water-raising machines and precision water clocks.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Al-Jazari kept his mechanical designs secret without drawings.',
						a: 'False',
						c: 'He documented every gear and measurement with detailed drawings for other craftsmen.',
						mark: '0.5'
					},
					{
						q: 'd) The modern term "algorithm" honours Al-Khwarizmi.',
						a: 'True',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) Al-Jazari\'s documented mechanical inventions.   b) The modern impact of both scientists on computing and engineering.',
				paraMatchAnswer: 'a) Paragraph 2 (§2).   b) Paragraph 3 (§3).',
				compQuestions: [
					{
						q: 'a) What mathematical field did Al-Khwarizmi establish with systematic step-by-step rules?',
						a: 'He established algebra (and systematic algorithms for solving equations).',
						mark: '1.0'
					},
					{
						q: 'b) Why did Al-Jazari include detailed drawings and measurements in his engineering book?',
						a: 'So that other craftsmen could build and test the machines reliably.',
						mark: '1.0'
					},
					{
						q: 'c) What three qualities turn ideas into lasting discoveries according to the conclusion?',
						a: 'Curiosity, discipline, and clear documentation.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) He (§2)   b) them (§2)',
				refAnswer: 'a) He (§2): Al-Jazari.   b) them (§2): automatic water-raising machines, water clocks, and valves (his inventions / gears).',
				quizStem: 'Why did Al-Jazari document his machines with detailed drawings and exact measurements?',
				quizCorrect: 'So that other craftsmen and engineers could reproduce and test them reliably',
				quizDistractors: [
					{
						text: 'To prevent anyone else from ever building his inventions',
						diagnosticFeedback: 'He documented them precisely so others could build and test them.'
					},
					{
						text: 'Because he worked only on pure algebra without machines',
						diagnosticFeedback: 'Algebra was Al-Khwarizmi\'s field; Al-Jazari was a mechanical engineer.'
					},
					{
						text: 'To replace water clocks with steam trains',
						diagnosticFeedback: 'Steam trains did not exist in Al-Jazari\'s era.'
					}
				],
				quizExplanation: 'وثّق الجزري آلاته بالرسوم والقياسات الدقيقة لتمكين الصناع والمهندسين من إعادة بنائها وتجربتها.'
			}
		];

		const v = difficulty === 'hard' ? variants[0] : rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: v.title,
				paragraphs: v.paragraphs,
				source: v.source,
				glossary: v.glossary
			}),
			{
				type: 'text',
				content: '1) Say whether the following statements are True or False according to the text (correct the false ones):'
			},
			{ type: 'true_false', items: v.tfItems },
			{ type: 'text', content: v.paraMatchPrompt, answer: v.paraMatchAnswer, mark: '1.5' },
			{ type: 'text', content: '3) Answer the following questions according to the text:' },
			...v.compQuestions.map((item) => ({
				type: 'text' as const,
				content: item.q,
				answer: item.a,
				mark: item.mark
			})),
			{ type: 'text', content: v.refPrompt, answer: v.refAnswer, mark: '1.5' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجواب الصحيح استنادا إلى النص العلمي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A. Comprehension',
				points: 8,
				instruction: 'Read the scientific text carefully then answer the questions.',
				content
			},
			hints: [
				'ميّز بين الحقائق العلمية والمنهجية المذكورة في كل فقرة.',
				'استعمل أرقام الفقرات (§1, §2, §3) للتحقق من موقع كل فكرة.',
				'تحقق من مرجع الضمائر بدقة عبر قراءة الجملة السابقة كاملة.'
			],
			solutionStepsAr: [
				'تحديد صحة العبارات وتصحيح الخاطئ منها.',
				'ربط الأفكار بالفقرات المناسبة والإجابة عن الأسئلة المفتوحة.',
				'استخراج مرجع الضمائر المسطّرة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Text Exploration (7 pts) — Passive Voice (Tenses + Modals) & Conditionals 0, 1, 2 + Word Stress
export const tpl2asSciT2ExpPassiveConditionals: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t2_exp_passive_conditionals',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص (7 نقاط): المبني للمجهول (أزمنة وأفعال ناقصة)، الشرط (0/1/2)، والنبر',
	curriculumLessonId: 'eng_lesson_2as_sci_t2_passive_voice_tenses',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				vocabPrompt: '1) Match each word with its synonym: (1) conserve   (2) renewable   (3) experiment   |   (A) sustainable   (B) scientific test   (C) save',
				vocabAnswer: '(1) conserve = (C) save | (2) renewable = (A) sustainable | (3) experiment = (B) scientific test.',
				wbRows: [
					{
						verb: { given: true, value: 'conserve' },
						noun: { value: 'conservation', mark: '0.25' },
						adjective: { value: 'conservative / conserved', mark: '0.25' }
					},
					{
						verb: { value: 'pollute', mark: '0.25' },
						noun: { given: true, value: 'pollution' },
						adjective: { value: 'polluted / polluting', mark: '0.25' }
					},
					{
						verb: { value: 'invent', mark: '0.25' },
						noun: { value: 'invention', mark: '0.25' },
						adjective: { given: true, value: 'inventive' }
					}
				],
				grammarItems: [
					{
						q: 'a) Rewrite in the passive: Engineers built two solar power stations in Adrar.\n   Two solar power stations ............',
						a: 'Two solar power stations were built in Adrar by engineers.',
						mark: '0.5'
					},
					{
						q: 'b) Rewrite in the passive: Citizens must protect forests from summer fires.\n   Forests ............',
						a: 'Forests must be protected from summer fires by citizens.',
						mark: '0.5'
					},
					{
						q: 'c) Put the verbs in brackets in the right tense (Type 0): If you (heat) ice to 0 C, it (melt).',
						a: 'If you heat ice to 0 C, it melts.',
						mark: '0.5'
					},
					{
						q: 'd) Put the verbs in brackets in the right tense (Type 1): If we (save) water today, future generations (have) enough.',
						a: 'If we save water today, future generations will have enough.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the position of their stressed syllable: nation, pollution, scientific, decision, economic, atomic',
				phonologyCols: [
					{ header: '1st Syllable', words: ['nation'], mark: '0.20' },
					{ header: '2nd Syllable', words: ['pollution', 'decision', 'atomic'], mark: '0.45' },
					{ header: '3rd Syllable', words: ['scientific', 'economic'], mark: '0.35' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (clean, sun, stored, panels)\nIn southern Algeria, the ........(1)........ shines almost all year round. Solar ........(2)........ capture sunlight and convert it into ........(3)........ electricity that can be ........(4)........ in modern batteries.',
				clozeAnswer: '(1) sun   (2) panels   (3) clean   (4) stored.',
				quizStem: 'Choose the correct passive transformation: "People can recycle plastic waste into useful bricks."',
				quizCorrect: 'Plastic waste can be recycled into useful bricks.',
				quizDistractors: [
					{
						text: 'Plastic waste can recycled into useful bricks.',
						diagnosticFeedback: 'You must include "be" after the modal verb: can + be + PP.'
					},
					{
						text: 'Plastic waste can been recycled into useful bricks.',
						diagnosticFeedback: 'Use "be" (not "been") directly after "can".'
					},
					{
						text: 'Plastic waste is can recycled into useful bricks.',
						diagnosticFeedback: 'Do not put "is" before the modal verb "can".'
					}
				],
				quizExplanation: 'القاعدة الثابتة للمبني للمجهول مع الأفعال الناقصة: Modal + be + Past Participle (can be recycled).'
			},
			{
				vocabPrompt: '1) Find the opposite of each word from the list (renewable, clean, decrease): (1) polluted   (2) non-renewable   (3) increase',
				vocabAnswer: '(1) polluted / clean | (2) non-renewable / renewable | (3) increase / decrease.',
				wbRows: [
					{
						verb: { given: true, value: 'produce' },
						noun: { value: 'production', mark: '0.25' },
						adjective: { value: 'productive', mark: '0.25' }
					},
					{
						verb: { value: 'discover', mark: '0.25' },
						noun: { given: true, value: 'discovery' },
						adjective: { value: 'discovered', mark: '0.25' }
					},
					{
						verb: { value: 'energize', mark: '0.25' },
						noun: { value: 'energy', mark: '0.25' },
						adjective: { given: true, value: 'energetic' }
					}
				],
				grammarItems: [
					{
						q: 'a) Rewrite in the passive: Scientists have tested a new water filter.\n   A new water filter ............',
						a: 'A new water filter has been tested by scientists.',
						mark: '0.5'
					},
					{
						q: 'b) Rewrite in the passive: Farmers can conserve water by using drip irrigation.\n   Water ............',
						a: 'Water can be conserved by farmers by using drip irrigation.',
						mark: '0.5'
					},
					{
						q: 'c) Put the verbs in the right tense (Type 0): If light (hit) a flat mirror, it (reflect).',
						a: 'If light hits a flat mirror, it reflects.',
						mark: '0.5'
					},
					{
						q: 'd) Put the verbs in the right tense (Type 2): If I (be) an engineer, I (design) solar desalination stations.',
						a: 'If I were an engineer, I would design solar desalination stations.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the stressed syllable: action, invention, conservation, explosion, energetic, electric',
				phonologyCols: [
					{ header: '1st Syllable', words: ['action'], mark: '0.20' },
					{ header: '2nd Syllable', words: ['invention', 'explosion', 'electric'], mark: '0.45' },
					{ header: '3rd Syllable', words: ['conservation', 'energetic'], mark: '0.35' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (boils, experiment, observe, hypothesis)\nIn every school science ........(1)........, students first formulate a clear ........(2)......... Then they ........(3)........ the result carefully; for instance, water ........(4)........ when heated to 100 degrees Celsius.',
				clozeAnswer: '(1) experiment   (2) hypothesis   (3) observe   (4) boils.',
				quizStem: 'Put the verbs in the right tense (Conditional Type 2): "If every factory (use) filters, urban air (be) much cleaner."',
				quizCorrect: 'used / would be',
				quizDistractors: [
					{
						text: 'will use / is',
						diagnosticFeedback: 'Never place "will" inside the If-clause.'
					},
					{
						text: 'uses / would be',
						diagnosticFeedback: 'Present Simple in the If-clause matches "will" (Type 1), not "would" (Type 2).'
					},
					{
						text: 'used / will be',
						diagnosticFeedback: 'Past Simple in the If-clause requires "would + stem" in Type 2.'
					}
				],
				quizExplanation: 'في الشرط النوع الثاني (Type 2) نضع الماضي البسيط في شطر If (used) و would + stem في الشطر الثاني (would be).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.vocabPrompt, answer: v.vocabAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following word-building table:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Do the following grammar transformations and verb-tense tasks:' },
			...v.grammarItems.map((g) => ({
				type: 'text' as const,
				content: g.q,
				answer: g.a,
				mark: g.mark
			})),
			{ type: 'text', content: v.phonologyPrompt },
			buildEnglishPhonologyTableBlock({ columns: v.phonologyCols }),
			{ type: 'text', content: v.clozePrompt, answer: v.clozeAnswer, mark: '1.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B. Text Exploration',
				points: 7,
				instruction: 'Complete the following language exploration exercises.',
				content
			},
			hints: [
				'في المبني للمجهول مع الأفعال الناقصة تذكر الصيغة: Modal + be + Past Participle.',
				'في الشرط النوع 0 (الحقائق العلمية) يكون الفعلان معا في الحاضر البسيط.',
				'في الكلمات المنتهية بـ (-ic, -tion, -sion) يقع النبر دائما على المقطع ما قبل الأخير.'
			],
			solutionStepsAr: [
				'ربط المفردات وإتمام جدول الاشتقاق.',
				'تطبيق قواعد المبني للمجهول وأزمنة الشرط (0/1/2).',
				'تصنيف الكلمات حسب المقطع المنبور ثم ملء الفقرة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Text Exploration (7 pts) — Cause & Result Connectors + Conditionals + Word Stress & Syllables
export const tpl2asSciT2ExpCauseResultStress: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t2_exp_cause_result_stress',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'discourse_cohesion',
	titleAr: 'استكشاف النص (7 نقاط): روابط السبب والنتيجة، الشرط، وعدد المقاطع والنبر',
	curriculumLessonId: 'eng_lesson_2as_sci_t2_cause_result_connectors',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				vocabPrompt: '1) Match each scientific/environmental term with its definition:\n(1) drought   (2) recycling   (3) hypothesis   |   (A) a testable scientific assumption   (B) long period without rain   (C) turning waste into reusable materials',
				vocabAnswer: '(1) drought = (B) | (2) recycling = (C) | (3) hypothesis = (A).',
				wbRows: [
					{
						verb: { given: true, value: 'develop' },
						noun: { value: 'development', mark: '0.25' },
						adjective: { value: 'developed / developing', mark: '0.25' }
					},
					{
						verb: { value: 'succeed', mark: '0.25' },
						noun: { given: true, value: 'success' },
						adjective: { value: 'successful', mark: '0.25' }
					},
					{
						verb: { value: 'purify', mark: '0.25' },
						noun: { value: 'purification', mark: '0.25' },
						adjective: { given: true, value: 'pure' }
					}
				],
				grammarItems: [
					{
						q: 'a) Combine using (owing to): Many lakes are shrinking. There is a severe drought.',
						a: 'Many lakes are shrinking owing to the severe drought.',
						mark: '0.5'
					},
					{
						q: 'b) Combine using (consequently): Factories released untreated smoke. Air quality worsened.',
						a: 'Factories released untreated smoke; consequently, air quality worsened.',
						mark: '0.5'
					},
					{
						q: 'c) Combine using (as a result): Algeria invested in solar stations. Clean electricity output rose.',
						a: 'Algeria invested in solar stations; as a result, clean electricity output rose.',
						mark: '0.5'
					},
					{
						q: 'd) Combine using (because): Drip irrigation is efficient. It sends water straight to the roots.',
						a: 'Drip irrigation is efficient because it sends water straight to the roots.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to their number of syllables: heat, solar, pollution, conservation, wind, energy',
				phonologyCols: [
					{ header: '1 Syllable', words: ['heat', 'wind'], mark: '0.30' },
					{ header: '2 Syllables', words: ['solar'], mark: '0.20' },
					{ header: '3+ Syllables', words: ['pollution', 'energy', 'conservation'], mark: '0.50' }
				],
				clozePrompt: '5) Fill in the gaps with the right connectors from the list: (because, consequently, owing to, if)\n........(1)........ careless waste, fresh water is becoming scarce in many areas. Farmers must adopt modern irrigation ........(2)........ traditional flooding wastes too much water. ........(3)........, harvests will remain stable ........(4)........ every community acts responsibly.',
				clozeAnswer: '(1) Owing to   (2) because   (3) Consequently   (4) if.',
				quizStem: 'Combine accurately using "owing to": (A) The crops dried up. (B) There was a lack of rainfall.',
				quizCorrect: 'The crops dried up owing to the lack of rainfall.',
				quizDistractors: [
					{
						text: 'The crops dried up owing to there was a lack of rainfall.',
						diagnosticFeedback: 'owing to must be followed by a noun phrase, not a full clause with a verb.'
					},
					{
						text: 'Owing to the crops dried up, there was a lack of rainfall.',
						diagnosticFeedback: 'You reversed cause and result and used a clause after owing to.'
					},
					{
						text: 'There was a lack of rainfall owing to the crops.',
						diagnosticFeedback: 'Lack of rainfall is the cause, not the result.'
					}
				],
				quizExplanation: 'الرابط السببي owing to يُتبع بعبارة اسمية (the lack of rainfall) دون فعل مصرف.'
			},
			{
				vocabPrompt: '1) Match each word with its synonym: (1) scarce   (2) observe   (3) expand   |   (A) grow larger   (B) watch carefully   (C) rare / limited',
				vocabAnswer: '(1) scarce = (C) rare / limited | (2) observe = (B) watch carefully | (3) expand = (A) grow larger.',
				wbRows: [
					{
						verb: { given: true, value: 'observe' },
						noun: { value: 'observation', mark: '0.25' },
						adjective: { value: 'observant', mark: '0.25' }
					},
					{
						verb: { value: 'calculate', mark: '0.25' },
						noun: { given: true, value: 'calculation' },
						adjective: { value: 'calculated', mark: '0.25' }
					},
					{
						verb: { value: 'sustain', mark: '0.25' },
						noun: { value: 'sustainability', mark: '0.25' },
						adjective: { given: true, value: 'sustainable' }
					}
				],
				grammarItems: [
					{
						q: 'a) Combine using (due to): The experiment succeeded. The measurements were very accurate.',
						a: 'The experiment succeeded due to the very accurate measurements.',
						mark: '0.5'
					},
					{
						q: 'b) Combine using (as a result): The metal rod was heated strongly. It expanded noticeably.',
						a: 'The metal rod was heated strongly; as a result, it expanded noticeably.',
						mark: '0.5'
					},
					{
						q: 'c) Combine using (since): We should plant more trees. Trees absorb carbon dioxide.',
						a: 'We should plant more trees since trees (they) absorb carbon dioxide.',
						mark: '0.5'
					},
					{
						q: 'd) Combine using (therefore): Solar panels require little fuel. Operating costs stay low.',
						a: 'Solar panels require little fuel; therefore, operating costs stay low.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to the stressed syllable: motion, solution, conclusion, realistic, optic, exploration',
				phonologyCols: [
					{ header: '1st Syllable', words: ['motion', 'optic'], mark: '0.30' },
					{ header: '2nd Syllable', words: ['solution', 'conclusion'], mark: '0.35' },
					{ header: '3rd Syllable', words: ['realistic', 'exploration'], mark: '0.35' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (therefore, due to, melts, renewable)\nIce ........(1)........ quickly when temperatures rise. ........(2)........ excessive carbon emissions, glaciers are shrinking worldwide. ........(3)........, nations must switch to clean ........(4)........ energy without delay.',
				clozeAnswer: '(1) melts   (2) Due to   (3) Therefore   (4) renewable.',
				quizStem: 'Where does primary stress fall in "exploration" (ex-plo-ra-tion) and "realistic" (re-a-lis-tic)?',
				quizCorrect: 'On the 3rd syllable (penultimate) in both words: ex-plo-RA-tion / re-a-LIS-tic',
				quizDistractors: [
					{
						text: 'On the 1st syllable in both words',
						diagnosticFeedback: 'Words ending in -tion and -ic take stress on the second syllable from the end.'
					},
					{
						text: 'On the final syllable (-tion / -ic) in both words',
						diagnosticFeedback: 'The suffixes -tion and -ic are never stressed themselves.'
					},
					{
						text: 'On the 2nd syllable in both words',
						diagnosticFeedback: 'Both words have 4 syllables, so the penultimate syllable is the 3rd.'
					}
				],
				quizExplanation: 'كلتا الكلمتين مكونتان من 4 مقاطع وتنتهيان بـ -tion و -ic، إذن النبر يقع على المقطع ما قبل الأخير (الثالث).'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.vocabPrompt, answer: v.vocabAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following word-building table:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Combine each pair of sentences using the connector in brackets (make any necessary changes):' },
			...v.grammarItems.map((g) => ({
				type: 'text' as const,
				content: g.q,
				answer: g.a,
				mark: g.mark
			})),
			{ type: 'text', content: v.phonologyPrompt },
			buildEnglishPhonologyTableBlock({ columns: v.phonologyCols }),
			{ type: 'text', content: v.clozePrompt, answer: v.clozeAnswer, mark: '1.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الإجابة الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B. Text Exploration',
				points: 7,
				instruction: 'Complete the following vocabulary, morphology, connectors, and phonology tasks.',
				content
			},
			hints: [
				'تحقق مما بعد الرابط: جملة كاملة مع because/since، وعبارة اسمية مع owing to/due to.',
				'ضع السبب أولا ثم فاصلة منقوطة ثم رابط النتيجة (consequently / as a result / therefore).',
				'في النبر عدّ المقاطع من النهاية: المقطع الثاني من النهاية قبل -ic / -tion / -sion.'
			],
			solutionStepsAr: [
				'مطابقة المفردات وإتمام جدول الاشتقاق.',
				'ربط الجمل بروابط السبب والنتيجة مع تحويل الجملة إلى عبارة اسمية عند اللزوم.',
				'تصنيف الكلمات صوتيا وملء فقرة الروابط.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Written Expression (5 pts) — Renewable Energy Press Release / Science Experiment Report
export const tpl2asSciT2WrittenEnergyScience: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t2_written_energy_science',
	grade: '2as_se',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي (5 نقاط): مقال حول الطاقات المتجددة أو تقرير تجربة علمية مخبرية',
	curriculumLessonId: 'eng_lesson_2as_sci_t2_word_stress_science_writing',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				topicOnePrompt:
					'Write a short environmental article (80 to 120 words) for your school science magazine explaining why Algeria should expand solar energy and conserve water resources.',
				topicOneNotes: [
					'fossil fuels are limited and cause air pollution',
					'Algerian Sahara enjoys abundant sunshine all year',
					'solar electricity can be generated cleanly and water must be conserved via drip irrigation',
					'consequently: lower energy costs, new jobs, and less poverty',
					'call on students to save water and electricity every day'
				],
				topicTwoPrompt:
					'Write a short paragraph (80 to 120 words) describing how recycling paper, glass, and plastic in your town can protect the environment and create green jobs.',
				modelAnswer:
					'Clean Energy and Water Conservation for Algeria\'s Future\nProtecting our natural resources has become an urgent priority today. Because fossil fuels are non-renewable and cause air pollution, clean alternatives must be adopted quickly. Fortunately, Algeria enjoys abundant sunshine across the Sahara all year round. If modern solar stations are expanded, clean electricity can be generated reliably for homes, schools, and farms. At the same time, fresh water must be conserved through drip irrigation and repairing leaking pipes. Consequently, energy costs will drop, new technical jobs will be created, and rural families will overcome poverty. Every student should take part by saving water and electricity daily.',
				rubricSummary: 'Relevance & clarity (1.5) | Cohesion & cause/result linkers (1.0) | Passive modals & conditionals accuracy (1.5) | Mechanics & layout (1.0).',
				quizStem: 'Which pair of grammar tools best strengthens an environmental article for Unit 2 (Waste Not, Want Not)?',
				quizCorrect: 'Passive Voice with modals (must be conserved / can be stored) and Cause/Result connectors (because / consequently)',
				quizDistractors: [
					{
						text: 'Past regret modals (should not have) only',
						diagnosticFeedback: 'An environmental proposal focuses on conservation solutions, passive modals, and cause/result.'
					},
					{
						text: 'Direct informal questions with slang',
						diagnosticFeedback: 'An academic school magazine article requires clear, formal language.'
					},
					{
						text: 'Lists of single nouns without verbs',
						diagnosticFeedback: 'You must write complete, well-linked sentences.'
					}
				],
				quizExplanation: 'توظيف المبني للمجهول مع الأفعال الناقصة وروابط السبب والنتيجة يمنح المقال البيئي دقة علمية وقوة أسلوبية.'
			},
			{
				topicOnePrompt:
					'You carried out a simple science experiment in your school laboratory to test how muddy water is purified by filtration. Write a short Science Lab Report (80 to 120 words) using the notes below.',
				topicOneNotes: [
					'Aim: separate solid mud particles from dirty water',
					'Materials: plastic funnel, filter paper, clean sand, gravel, glass beaker, muddy water',
					'Method: place layers of gravel, sand, and filter paper inside the funnel; pour muddy water slowly',
					'Observation: solid particles are trapped; clear water drips into the beaker',
					'Conclusion: filtration removes insoluble solids, yet water must still be boiled before drinking'
				],
				topicTwoPrompt:
					'Write a paragraph (80 to 120 words) about a famous Muslim scientist (such as Ibn al-Haytham or Al-Khwarizmi) and explain why young students should admire the experimental method.',
				modelAnswer:
					'Lab Report: Purifying Muddy Water by Simple Filtration\nAim: This experiment aims to demonstrate how solid impurities can be separated from muddy water using simple filtration.\nMaterials and Method: A clean funnel, filter paper, fine sand, small gravel, and a glass beaker were prepared. First, filter paper was placed at the bottom of the funnel, followed by layers of clean sand and gravel. Next, muddy water was poured slowly through the top layer.\nResult and Conclusion: Owing to the tiny gaps between the sand grains and filter paper, solid mud particles were trapped, and much clearer water was collected in the beaker. In conclusion, if muddy water passes through a filter, insoluble dirt is removed; however, the filtered water must still be boiled or disinfected before drinking.',
				rubricSummary: 'Report format (Aim/Method/Result/Conclusion) (1.5) | Objective scientific tone & passive voice (1.5) | Linkers & Type 0 conditional (1.0) | Spelling & punctuation (1.0).',
				quizStem: 'Which structure makes a school Science Lab Report clearest and most accurate?',
				quizCorrect: 'Aim, Materials and Method (using Passive Voice), Result/Observation, and Conclusion',
				quizDistractors: [
					{
						text: 'Dear Sir, personal greetings, and Yours sincerely',
						diagnosticFeedback: 'That is a formal letter layout, not a science lab report.'
					},
					{
						text: 'A fictional story with dialogue and suspense',
						diagnosticFeedback: 'A lab report must be objective, factual, and clearly structured.'
					},
					{
						text: 'A single sentence without steps or results',
						diagnosticFeedback: 'A complete report explains the aim, procedure, observation, and conclusion.'
					}
				],
				quizExplanation: 'التقرير المخبري المنظم يتكون من: الهدف (Aim)، المواد والطريقة بالمبني للمجهول، الملاحظة والنتيجة، ثم الاستنتاج.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: v.topicOnePrompt,
				topicOneNotes: v.topicOneNotes,
				topicTwoPrompt: v.topicTwoPrompt,
				modelAnswer: v.modelAnswer,
				rubricSummary: v.rubricSummary,
				mark: '5.0'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجواب المنهجي الصحيح للتعبير الكتابي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: v.quizExplanation
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a clear, coherent piece (80 to 120 words).',
				content
			},
			hints: [
				'استعمل المبني للمجهول (is heated / must be conserved / can be stored) لإضفاء طابع علمي رصين.',
				'اربط الأفكار بروابط السبب والنتيجة (because, owing to, consequently, as a result).',
				'تأكد من وضوح المقدمة والعرض والخاتمة وسلامة الإملاء.'
			],
			solutionStepsAr: [
				'اختيار موضوع واحد وتحديد هيكله (مقال بيئي أو تقرير مخبري).',
				'تحويل جميع الملاحظات إلى فقرات مترابطة بتراكيب الوحدة الثانية والثالثة.',
				'مراجعة الأخطاء اللغوية والترقيم ومطابقة سلم التنقيط (5 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T2: EnglishParameterizedTemplate[] = [
	tpl2asSciT2CompRenewableEnergy,
	tpl2asSciT2CompBuddingScientist,
	tpl2asSciT2ExpPassiveConditionals,
	tpl2asSciT2ExpCauseResultStress,
	tpl2asSciT2WrittenEnergyScience
];
