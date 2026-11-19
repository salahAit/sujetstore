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
// 4 Parameterized Templates — 1AS TCST Trimester 2 (8 + 7 + 7[alt] + 5 = 20)
// Units 2 & 3: Our Findings Show (Surveys) + Back to Nature (Environment)
// ============================================================================

// 1. Part One: A) Reading Comprehension (8 pts)
const tpl1asTcstT2SurveyEnvComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t2_survey_env_comprehension',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — نتائج استطلاع مدرسي وحماية البيئة والطاقات النظيفة',
	curriculumLessonId: 'eng_lesson_1as_tcst_t2_reported_speech',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Our Findings Show: Algerian Students and Eco-Friendly Habits',
				source: 'Adapted from Green Lycee Student Survey',
				paragraphs: [
					'Last month, sixty first-year secondary students in Setif conducted a survey to discover how young learners care for [[their]] local environment. We asked fifty classmates whether they sorted household waste, saved water at home, and participated in tree-planting campaigns.',
					'Our findings show encouraging awareness among teenagers. Most of the informants told us that they turned off lights and taps when not in use. Half of them said that they had joined at least one neighbourhood clean-up day during the school year. However, only a few of them reported using reusable fabric bags instead of single-use plastic bags, and none of the respondents knew how much energy a single recycled bottle saves.',
					'In conclusion, Algerian youth clearly value nature, yet practical environmental education must continue. If schools organize regular recycling workshops and solar-energy demonstrations, students will turn good intentions into lasting daily habits. [[It]] is a shared responsibility that benefits both our cities and future generations.'
				],
				glossary: [
					{ term: 'informants', meaning: 'people who answer questions in a survey' },
					{ term: 'reusable', meaning: 'able to be used again many times' }
				],
				tfItems: [
					{
						q: 'The survey in Setif asked fifty classmates about their environmental habits.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'All of the informants regularly used reusable fabric bags.',
						a: 'False',
						c: 'Only a few of them reported using reusable fabric bags.',
						mark: '0.5'
					},
					{
						q: 'Every respondent knew exactly how much energy one recycled bottle saves.',
						a: 'False',
						c: 'None of the respondents knew how much energy a single recycled bottle saves.',
						mark: '0.5'
					}
				],
				q1: 'Why did the secondary students in Setif conduct the survey?',
				a1: 'They conducted it to discover how young learners care for their local environment.',
				q2: 'What positive eco-friendly actions did most informants mention?',
				a2: 'Most of them said they turned off lights and taps when not in use (and half of them joined a neighbourhood clean-up day).',
				q3: 'What will happen if schools organize regular recycling workshops according to paragraph 3?',
				a3: 'Students will turn good intentions into lasting daily habits.',
				ref1Word: 'their (paragraph 1)',
				ref1Ans: 'young learners',
				ref2Word: 'It (paragraph 3)',
				ref2Ans: 'protecting the environment (turning good intentions into lasting daily habits)',
				textTypeCorrect: 'A school survey report about teenagers and environmental habits',
				textTypeDistractors: [
					{
						text: 'A formal job application letter',
						diagnosticFeedback: 'The text reports survey statistics and conclusions, not a job application.'
					},
					{
						text: 'A historical biography of an inventor',
						diagnosticFeedback: 'No historical scientist is discussed.'
					},
					{
						text: 'An adventure story set in the mountains',
						diagnosticFeedback: 'The text is factual and statistical, not a fictional adventure.'
					}
				],
				theme: 'reporting student survey findings on environmental care'
			},
			{
				title: 'Solar Energy and Protecting Algeria from Desertification',
				source: 'Adapted from North African Ecology Review',
				paragraphs: [
					'Climate change and water scarcity represent serious environmental challenges across North Africa. Whenever temperatures rise sharply and rainfall decreases, fertile soil loses [[its]] moisture and agricultural yields decline. Scientists warn that unless nations protect forests and manage water wisely, desertification will spread further north.',
					'Fortunately, Algeria possesses two powerful natural advantages: abundant sunshine throughout the year and a long tradition of reforestation. The Green Dam project, which stretches across the high plateaus, demonstrates how planting drought-resistant trees slows down sand encroachment and restores local biodiversity. [[This]] national effort protects farmland and creates healthier air for nearby towns.',
					'Meanwhile, engineers are expanding solar power stations in the southern regions. If more homes, schools, and farms rely on clean solar electricity, carbon emissions will fall significantly. Combining renewable energy with responsible water conservation is the wisest path back to nature.'
				],
				glossary: [
					{ term: 'scarcity', meaning: 'shortage or lack of something essential' },
					{ term: 'encroachment', meaning: 'gradual advance into another area' }
				],
				tfItems: [
					{
						q: 'Rising temperatures and lower rainfall help fertile soil keep its moisture.',
						a: 'False',
						c: 'Fertile soil loses its moisture when temperatures rise and rainfall decreases.',
						mark: '0.5'
					},
					{
						q: 'The Green Dam project helps slow down sand encroachment in Algeria.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Expanding solar energy can reduce carbon emissions significantly.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'What happens when temperatures rise sharply and rainfall decreases?',
				a1: 'Fertile soil loses its moisture and agricultural yields decline.',
				q2: 'What two natural advantages does Algeria possess according to paragraph 2?',
				a2: 'Abundant sunshine throughout the year and a long tradition of reforestation.',
				q3: 'What result will follow if more homes, schools, and farms rely on solar electricity?',
				a3: 'Carbon emissions will fall significantly.',
				ref1Word: 'its (paragraph 1)',
				ref1Ans: 'fertile soil',
				ref2Word: 'This (paragraph 2)',
				ref2Ans: 'the Green Dam reforestation effort (planting drought-resistant trees)',
				textTypeCorrect: 'An environmental article about desertification, reforestation, and solar energy in Algeria',
				textTypeDistractors: [
					{
						text: 'A dialogue between two students about email passwords',
						diagnosticFeedback: 'The passage focuses on climate, trees, and solar power, not email.'
					},
					{
						text: 'A collection of moral proverbs',
						diagnosticFeedback: 'It is an informative scientific-environmental article, not proverbs.'
					},
					{
						text: 'A set of instructions for repairing a printer',
						diagnosticFeedback: 'There are no printer instructions in the text.'
					}
				],
				theme: 'fighting desertification through reforestation and solar energy'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Correct the False statements using information from the text.'
				: 'Write True or False next to each sentence.';

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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Based on "${variant.title}", which option best summarizes the text?`,
				questionTextAr: 'اختر الوصف الأدق لمضمون النص:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `The reading text deals with ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 8,
				instruction: 'Read the text carefully then answer the questions below:',
				content
			},
			hints: [
				'انتبه لمحددات الكمية في النص (most, half, a few, none) لأنها مفتاح أسئلة True/False.',
				'ابحث عن الجملة الشرطية في الفقرة الأخيرة للإجابة عن السؤال الثالث بدقة.',
				'تحقق من الاسم الأقرب قبل كل ضمير مسطر (their / its / It / This).'
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

// 2. Part One: B) Text Exploration — Reported Speech, Quantifiers & Final -ed (7 pts)
const tpl1asTcstT2ReportedQuantifiersTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t2_reported_quantifiers_te',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'استكشاف النص — الكلام المنقول ومحددات الكمية ونطق النهاية -ed',
	curriculumLessonId: 'eng_lesson_1as_tcst_t2_reported_speech',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'pollute' },
						noun: { value: 'pollution', mark: '0.5' },
						adjective: { value: 'polluted', mark: '0.5' }
					},
					{
						verb: { value: 'conserve', mark: '0.5' },
						noun: { given: true, value: 'conservation' },
						adjective: { value: 'conservative', mark: '0.5' }
					}
				],
				rs1Direct: 'a) The reporter asked Sami, "Do you read science magazines?"',
				rs1Start: 'The reporter asked Sami ..........',
				rs1Ans: 'The reporter asked Sami if he read science magazines.',
				rs2Direct: 'b) Meriem said, "We will plant thirty olive trees tomorrow."',
				rs2Start: 'Meriem said that ..........',
				rs2Ans: 'Meriem said that they would plant thirty olive trees the next day.',
				quantPrompt: 'Complete with the right quantifier (all of, half of, none of): In a class of 40 pupils, 20 pupils bring reusable bottles, so .......... them bring reusable bottles. 0 pupils throw litter on the floor, so .......... them throw litter.',
				quantAns: 'half of / none of',
				edWords: ['worked', 'cleaned', 'planted', 'helped', 'saved', 'polluted'],
				edCols: [
					{ header: '/t/', words: ['worked', 'helped'], mark: '0.5' },
					{ header: '/d/', words: ['cleaned', 'saved'], mark: '0.5' },
					{ header: '/id/', words: ['planted', 'polluted'], mark: '0.5' }
				],
				mcqQuestion: 'Report the question accurately: The teacher asked Nadia, "Where do you keep your survey notes?"',
				mcqCorrect: 'The teacher asked Nadia where she kept her survey notes.',
				mcqDistractors: [
					{
						text: 'The teacher asked Nadia where did she keep her survey notes?',
						diagnosticFeedback: 'Remove "did" and the question mark; use statement word order.'
					},
					{
						text: 'The teacher asked Nadia if she kept her survey notes.',
						diagnosticFeedback: 'Keep the Wh-word "where" instead of replacing it with "if".'
					},
					{
						text: 'The teacher asked Nadia where she keeps her survey notes.',
						diagnosticFeedback: 'Backshift the verb from Present Simple (keep) to Past Simple (kept).'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'protect' },
						noun: { value: 'protection', mark: '0.5' },
						adjective: { value: 'protective', mark: '0.5' }
					},
					{
						verb: { value: 'recycle', mark: '0.5' },
						noun: { given: true, value: 'recycling' },
						adjective: { value: 'recyclable', mark: '0.5' }
					}
				],
				rs1Direct: 'a) The journalist asked Amina, "When did you start the eco-club?"',
				rs1Start: 'The journalist asked Amina ..........',
				rs1Ans: 'The journalist asked Amina when she had started the eco-club.',
				rs2Direct: 'b) Karim told us, "I can reduce electricity waste at home."',
				rs2Start: 'Karim told us that ..........',
				rs2Ans: 'Karim told us that he could reduce electricity waste at home.',
				quantPrompt: 'Complete with (most of, all of, a few of): Out of 50 interviewees, 42 prefer printed books, so .......... them prefer printed books; and 50 out of 50 value education, so .......... them value education.',
				quantAns: 'most of / all of',
				edWords: ['washed', 'recycled', 'protected', 'stopped', 'damaged', 'needed'],
				edCols: [
					{ header: '/t/', words: ['washed', 'stopped'], mark: '0.5' },
					{ header: '/d/', words: ['recycled', 'damaged'], mark: '0.5' },
					{ header: '/id/', words: ['protected', 'needed'], mark: '0.5' }
				],
				mcqQuestion: 'Report the statement accurately: Bilal said, "I finished the graph yesterday."',
				mcqCorrect: 'Bilal said that he had finished the graph the day before.',
				mcqDistractors: [
					{
						text: 'Bilal said that he finished the graph tomorrow.',
						diagnosticFeedback: '"yesterday" changes to "the day before", and Past Simple shifts to Past Perfect.'
					},
					{
						text: 'Bilal said that I had finished the graph yesterday.',
						diagnosticFeedback: 'Change "I" to "he" and "yesterday" to "the day before".'
					},
					{
						text: 'Bilal told that he had finished the graph the day before.',
						diagnosticFeedback: '"told" requires a personal object (told me/us).'
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
				content: `2) Rewrite sentence (b) so that it means the same as sentence (a) (2.0 pts):\n${variant.rs1Direct}\n${variant.rs1Start}\n${variant.rs2Direct}\n${variant.rs2Start}`,
				answer: `a) ${variant.rs1Ans}\nb) ${variant.rs2Ans}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) ${variant.quantPrompt} (1.5 pts)`,
				answer: variant.quantAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) Classify the following verbs according to the pronunciation of their final -ed (1.5 pts):\n${shuffledEd.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.edCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر التحويل الصحيح إلى الكلام المنقول:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'In reported speech with a past reporting verb, shift tenses one step back, adjust pronouns/time markers, and use statement word order.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Answer the following morphology, grammar, and phonology questions:',
				content
			},
			hints: [
				'في السؤال المنقول احذف do/does/did وضع الفاعل قبل الفعل واحذف علامة الاستفهام.',
				'حوّل الضمائر وظروف الزمان (tomorrow تصبح the next day، و yesterday تصبح the day before).',
				'في نطق -ed: بعد /t/ و /d/ ننطق /id/، وبعد (p, k, f, s, sh, ch) ننطق /t/، والباقي /d/.'
			],
			solutionStepsAr: [
				`Reported 1: ${variant.rs1Ans}`,
				`Reported 2: ${variant.rs2Ans}`,
				`Quantifiers: ${variant.quantAns}`,
				`Final -ed: ${variant.edCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Conditionals Types 0 & 1 + Two-Syllable Word Stress (7 pts)
const tpl1asTcstT2ConditionalsStressTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t2_conditionals_stress_te',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'استكشاف النص — الجمل الشرطية (النوع 0 و 1 و Unless) والنبر في الكلمات ذات المقطعين',
	curriculumLessonId: 'eng_lesson_1as_tcst_t2_conditionals_0_1',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				condPrompt:
					'a) If you (heat) .......... ice above zero degrees, it (melt) .......... .\nb) If municipalities (install) .......... solar lamps, energy bills (drop) .......... next year.\nc) If citizens (not / reduce) .......... plastic waste, beaches (suffer) .......... .',
				condAns:
					'a) heat / melts (Type 0 — scientific fact)\nb) install / will drop (Type 1 — future result)\nc) do not reduce / will suffer (Type 1)',
				unlessPrompt: 'Rewrite using "Unless": "If we do not save rainwater, summer droughts will worsen."',
				unlessAns: 'Unless we save rainwater, summer droughts will worsen.',
				stressWords: ['climate', 'protect', 'forest', 'reduce', 'nature', 'pollute'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['climate', 'forest', 'nature'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['protect', 'reduce', 'pollute'], mark: '1.0' }
				],
				mcqQuestion: 'Complete the Conditional Type 1 sentence: "Unless factories .......... their filters, air quality will deteriorate."',
				mcqCorrect: 'clean',
				mcqDistractors: [
					{
						text: 'do not clean',
						diagnosticFeedback: '"Unless" already means "if not"; never add a second negative.'
					},
					{
						text: 'will clean',
						diagnosticFeedback: 'Never put "will" inside the if/unless clause.'
					},
					{
						text: 'cleaned',
						diagnosticFeedback: 'Type 1 uses Present Simple in the condition clause, not Past Simple.'
					}
				]
			},
			{
				condPrompt:
					'a) If plants (not / receive) .......... sunlight, they (die) .......... .\nb) If our school (plant) .......... fifty trees this spring, the yard (become) .......... cooler.\nc) If drivers (use) .......... public transport, traffic fumes (decrease) .......... .',
				condAns:
					'a) do not receive / die (Type 0 — natural law)\nb) plants / will become (Type 1)\nc) use / will decrease (Type 1)',
				unlessPrompt: 'Rewrite using "Unless": "If people do not respect forests, wildfires will destroy wildlife."',
				unlessAns: 'Unless people respect forests, wildfires will destroy wildlife.',
				stressWords: ['solar', 'conserve', 'water', 'destroy', 'planet', 'prevent'],
				stressCols: [
					{ header: '1st Syllable Stress', words: ['solar', 'water', 'planet'], mark: '1.0' },
					{ header: '2nd Syllable Stress', words: ['conserve', 'destroy', 'prevent'], mark: '1.0' }
				],
				mcqQuestion: 'Which sentence expresses a scientific fact using Conditional Type 0?',
				mcqCorrect: 'If water reaches 100 degrees Celsius, it boils.',
				mcqDistractors: [
					{
						text: 'If water reached 100 degrees Celsius, it would boil.',
						diagnosticFeedback: 'Type 2 is for imaginary situations, not permanent physical laws.'
					},
					{
						text: 'If water will reach 100 degrees Celsius, it boils.',
						diagnosticFeedback: 'Never use "will" in the if-clause.'
					},
					{
						text: 'If water reaches 100 degrees Celsius, it boiled.',
						diagnosticFeedback: 'Type 0 pairs Present Simple with Present Simple.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledStress = rng.shuffle(variant.stressWords);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) Put the verbs between brackets into the correct tense (Conditional Type 0 or Type 1) (3.0 pts):\n${variant.condPrompt}`,
				answer: variant.condAns,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `2) ${variant.unlessPrompt} (2.0 pts)`,
				answer: variant.unlessAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `3) Classify the following two-syllable words according to their stressed syllable (2.0 pts):\n${shuffledStress.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.stressCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة في الجمل الشرطية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Type 0 pairs Present Simple + Present Simple for facts; Type 1 pairs Present Simple + will + stem; Unless takes an affirmative verb.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Complete the grammar and phonology activities below:',
				content
			},
			hints: [
				'ميّز بين الحقيقة العلمية الثابتة (Type 0: مضارع + مضارع) والنتيجة المستقبلية المحتملة (Type 1: مضارع + will).',
				'تذكّر: Unless تعني If not، لذلك نحذف do not / does not ويبقى الفعل مثبتا.',
				'الأسماء ذات المقطعين (climate, forest, water) تُنبر على المقطع الأول، والأفعال (protect, reduce) على الثاني.'
			],
			solutionStepsAr: [
				`Conditionals: ${variant.condAns}`,
				`Unless: ${variant.unlessAns}`,
				`Word Stress: ${variant.stressCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Survey Report or Eco Action Paragraph
const tpl1asTcstT2SurveyEcoReportWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcst_t2_survey_eco_report_we',
	grade: '1as_tcst',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة تقرير استطلاع مدرسي أو فقرة حول حماية البيئة',
	curriculumLessonId: 'eng_lesson_1as_tcst_t2_quantifiers_surveys',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'You conducted a survey among 40 classmates about their reading and revision habits. Write a short survey report (90 to 110 words) presenting your findings using quantifiers and reported speech.',
				topicOneNotes: [
					'Population: 40 first-year scientific students',
					'34/40 (Most of them): prefer printed textbooks for deep revision',
					'20/40 (Half of them): read science articles online twice a week',
					'6/40 (A few of them): borrow books from the municipal library',
					'0/40 (None of them): study without making summary notes',
					'Conclusion: combine printed books and safe digital tools'
				],
				topicTwoPrompt:
					'Write a short paragraph (90 to 110 words) suggesting practical steps to fight water waste and plastic pollution in your town. Use Conditional Type 1 sentences.',
				modelAnswer:
					'Last week, we conducted a survey among 40 first-year scientific students to learn about their study and reading habits. We asked them what materials they preferred for exam revision. Our findings show very positive discipline. Most of the informants told us that they preferred printed textbooks for deep revision. Half of them said that they read science articles online twice a week. However, only a few of them reported borrowing books from the municipal library. Encouragingly, none of the respondents studied without making summary notes. In conclusion, students achieve their best results when they combine printed books with well-organized summaries.',
				rubricSummary:
					'Accurate reporting of all survey figures (1.5 pts), Correct quantifiers and reported speech (1.5 pts), Clear introduction-findings-conclusion structure (1 pt), Mechanics (1 pt).',
				mcqQuestion: 'Which sentence best reports that 34 out of 40 informants prefer printed textbooks?',
				mcqCorrect: 'Most of the informants said that they preferred printed textbooks.',
				mcqDistractors: [
					{
						text: 'None of the informants said that they preferred printed textbooks.',
						diagnosticFeedback: '34 out of 40 is 85%, which is "most of", not "none of".'
					},
					{
						text: 'Half of the informants told they prefer printed textbooks.',
						diagnosticFeedback: 'Half of 40 is 20, and "told" requires an object (told us).'
					},
					{
						text: 'A few of the informants asked if they preferred printed textbooks.',
						diagnosticFeedback: '34 out of 40 is a majority, and "asked" is for questions.'
					}
				]
			},
			{
				topicOnePrompt:
					'Your school eco-club is launching a "Clean and Green Lycee" campaign. Write a short awareness paragraph (90 to 110 words) explaining the dangers of pollution and the benefits of protecting nature using Conditional Type 1.',
				topicOneNotes: [
					'Problem: plastic litter, wasted water, and air pollution in cities',
					'Actions: plant trees, sort paper and plastic, turn off unused lights and taps',
					'Results (Conditional Type 1): cleaner air, greener schoolyard, lower energy bills',
					'Call to action: protecting Allah-s blessing of nature is every citizen-s duty'
				],
				topicTwoPrompt:
					'Write a short survey report (90 to 110 words) describing how teenagers in your neighbourhood use their free time for sports, reading, and community service.',
				modelAnswer:
					'Protecting our environment is a noble duty for every responsible citizen. Today, plastic litter, water waste, and exhaust fumes threaten the beauty and health of our towns. Fortunately, simple daily actions can make a big difference. If every student throws waste into recycling bins, our schoolyard will remain clean and pleasant. Furthermore, if families fix leaking taps and switch off unused lights, our country will conserve precious water and electricity. Unless we plant more trees and respect green spaces, future generations will face harsher summers. Let us work together now to keep Algeria clean and green.',
				rubricSummary:
					'Clear eco-awareness message and use of notes (1.5 pts), Accurate Conditional Type 1 / Unless sentences (1.5 pts), Cohesion and linking words (1 pt), Spelling and punctuation (1 pt).',
				mcqQuestion: 'Which concluding sentence uses Conditional Type 1 accurately?',
				mcqCorrect: 'If we plant more trees today, our cities will enjoy cleaner air tomorrow.',
				mcqDistractors: [
					{
						text: 'If we will plant more trees today, our cities enjoy cleaner air.',
						diagnosticFeedback: 'Do not place "will" inside the if-clause.'
					},
					{
						text: 'If we planted more trees today, our cities will enjoy cleaner air.',
						diagnosticFeedback: 'Do not mix Past Simple (planted) with "will".'
					},
					{
						text: 'Unless we do not plant trees, our cities will stay clean.',
						diagnosticFeedback: 'Double negative with "Unless" and illogical meaning.'
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة النموذجية المناسبة للوضعية الإدماجية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'A strong Term 2 essay accurately combines quantifiers, reported speech, or Type 1 conditionals.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a coherent paragraph or report:',
				content
			},
			hints: [
				'في تقرير الاستطلاع ابدأ بـ "Last week, we conducted a survey among..." واستعمل Quantifiers بدقة.',
				'في فقرة البيئة وظف جملتين شرطيتين من النوع الأول (If + Present Simple, will + stem).',
				'اختم الفقرة بخلاصة واضحة (In conclusion, ...).'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T2: EnglishParameterizedTemplate[] = [
	tpl1asTcstT2SurveyEnvComprehension,
	tpl1asTcstT2ReportedQuantifiersTe,
	tpl1asTcstT2ConditionalsStressTe,
	tpl1asTcstT2SurveyEcoReportWe
];
