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
// 4 Parameterized Templates — 1AS TCL Trimester 3 (7 + 8 + 8[alt] + 5 = 20)
// Units 3 & 4: Our Findings Show + Back to Nature
// ============================================================================

// 1. Part One: A) Reading Comprehension (7 pts)
const tpl1asTclT3SurveyNatureComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t3_survey_nature_comprehension',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — استطلاعات الشباب وحماية الموارد المائية والغابات',
	curriculumLessonId: 'eng_lesson_1as_tcl_t3_reported_speech',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Water Conservation Survey Among Algerian High Schoolers',
				source: 'Adapted from Mediterranean Environment Bulletin',
				paragraphs: [
					'Fresh water is one of the greatest blessings on Earth, yet seasonal droughts remind citizens across Algeria that [[it]] must never be wasted. Last spring, a group of first-year literary students in Bejaia interviewed sixty classmates about how their households manage daily water consumption.',
					'The survey revealed encouraging awareness alongside habits that still require improvement. Most respondents said that their families repaired leaking pipes promptly because water bills were rising. However, half of the students admitted leaving the tap running while brushing their teeth. When the interviewers asked them why they wasted clean water, several pupils explained that they simply forgot. Consequently, the eco-club president advised all students to turn off taps carefully and to remind [[their]] younger siblings every morning.',
					'Environmental specialists emphasize that small changes produce remarkable savings. If every Algerian household saved just twenty litres of water each day, national reservoirs would remain fuller during hot summer months. Protecting water is not only an ecological necessity; it is also a moral duty rooted in Islamic moderation and gratitude.'
				],
				glossary: [
					{ term: 'reservoirs', meaning: 'large natural or artificial lakes used to store water' },
					{ term: 'moderation', meaning: 'avoiding excess and waste' }
				],
				tfItems: [
					{
						q: 'The students in Bejaia interviewed sixty classmates about water consumption.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'None of the surveyed students left the tap running while brushing their teeth.',
						a: 'False',
						c: 'Half of the students admitted leaving the tap running while brushing their teeth.',
						mark: '0.5'
					},
					{
						q: 'Saving twenty litres per household daily would help keep reservoirs fuller in summer.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Why did most respondents- families repair leaking pipes promptly?',
				a1: 'Because water bills were rising.',
				q2: 'What advice did the eco-club president give to all students?',
				a2: 'The eco-club president advised them to turn off taps carefully and remind their younger siblings every morning.',
				q3: 'According to paragraph 3, why is protecting water more than just an ecological necessity?',
				a3: 'Because it is also a moral duty rooted in Islamic moderation and gratitude.',
				ref1Word: 'it (paragraph 1)',
				ref1Ans: 'fresh water',
				ref2Word: 'their (paragraph 2)',
				ref2Ans: 'all students',
				textTypeCorrect: 'A student survey report about water conservation and responsible daily habits',
				textTypeDistractors: [
					{
						text: 'A traditional fable about a spice merchant',
						diagnosticFeedback: 'The passage reports a real-life school survey, not a historical fable.'
					},
					{
						text: 'A pen-pal letter introducing Arabic calligraphy',
						diagnosticFeedback: 'The topic is water conservation, not calligraphy.'
					},
					{
						text: 'A biography of a ninth-century mathematician',
						diagnosticFeedback: 'No historical mathematician is mentioned.'
					}
				],
				theme: 'water conservation survey findings and daily moderation'
			},
			{
				title: 'Why Algeria-s Forests Deserve Collective Protection',
				source: 'Adapted from Maghreb Nature Conservation Magazine',
				paragraphs: [
					'Forests are the green lungs of our country, sheltering wildlife, stabilizing mountain soil, and cooling summer breezes. Unfortunately, careless human behaviour and rising summer heat threaten [[them]] every year. Because dry leaves and glass bottles ignite easily under scorching sun, a single neglected spark can destroy hundreds of hectares of cedar and cork oak trees.',
					'Recently, local forestry officers visited secondary schools in Batna and Jijel to speak with teenagers. They told the students not to light fires near dry grass and urged families to carry all picnic rubbish back home. When a student asked what young people could do immediately, one officer replied that reporting smoke early and joining autumn tree-planting drives made a huge difference.',
					'If citizens treated every woodland as a shared trust, devastating wildfires would become far rarer. Protecting our mountains requires both strict laws and conscious hearts. Therefore, schools, families, and community associations must cooperate so that future generations can enjoy clean air and shaded valleys across Algeria.'
				],
				glossary: [
					{ term: 'ignite', meaning: 'catch fire or start burning' },
					{ term: 'devastating', meaning: 'causing severe destruction and loss' }
				],
				tfItems: [
					{
						q: 'Forests help stabilize mountain soil and cool summer breezes.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Forestry officers told students to leave picnic rubbish inside the woods.',
						a: 'False',
						c: 'They urged families to carry all picnic rubbish back home.',
						mark: '0.5'
					},
					{
						q: 'Joining autumn tree-planting drives helps protect Algerian woodlands.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Why can a single neglected spark destroy hundreds of hectares of trees in summer?',
				a1: 'Because dry leaves and glass bottles ignite easily under scorching sun.',
				q2: 'What two warnings or instructions did forestry officers give during their school visits?',
				a2: 'They told students not to light fires near dry grass and urged families to carry all picnic rubbish back home.',
				q3: 'What would happen if citizens treated every woodland as a shared trust?',
				a3: 'Devastating wildfires would become far rarer.',
				ref1Word: 'them (paragraph 1)',
				ref1Ans: 'forests (the green lungs of our country)',
				ref2Word: 'They (paragraph 2)',
				ref2Ans: 'local forestry officers',
				textTypeCorrect: 'An environmental awareness article calling for the collective protection of Algerian forests',
				textTypeDistractors: [
					{
						text: 'An informal letter to a pen-pal about exams',
						diagnosticFeedback: 'The style is informative and environmental, not a personal letter.'
					},
					{
						text: 'A short moral story about a baker',
						diagnosticFeedback: 'There are no fictional narrative characters here.'
					},
					{
						text: 'A technical guide on computer passwords',
						diagnosticFeedback: 'The passage focuses entirely on forest protection.'
					}
				],
				theme: 'preventing forest fires and protecting Algerian woodlands'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Justify False answers by correcting them from the passage.'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Based on "${variant.title}", which statement best describes the text?`,
				questionTextAr: 'اختر الوصف الأدق لنوع النص وموضوعه:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `The passage addresses ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then answer the following questions:',
				content
			},
			hints: [
				'انتبه للجمل المنقولة (advised / told ... not to) وللشرط النوع الثاني (If ... would) داخل النص.',
				'أجب عن أسئلة Why بربط السبب المذكور بعد because في النص.',
				'تحقق من الاسم الأقرب قبل الضمير المسطر (it / their / them / They).'
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

// 2. Part One: B) Text Exploration — Reported Speech (Statements/Orders/Questions), Conditionals 0/1/2 & Stress (8 pts)
const tpl1asTclT3ReportedConditionalsTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t3_reported_conditionals_te',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'grammar_tenses',
	titleAr: 'استكشاف النص — الكلام المنقول (الخبر والأمر والسؤال) والشرط (0، 1، 2) والنبر الصوتي',
	curriculumLessonId: 'eng_lesson_1as_tcl_t3_reported_speech',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'conserve' },
						noun: { value: 'conservation', mark: '0.5' },
						adjective: { value: 'conservative', mark: '0.5' }
					},
					{
						verb: { value: 'pollute', mark: '0.5' },
						noun: { given: true, value: 'pollution' },
						adjective: { value: 'polluted', mark: '0.5' }
					}
				],
				rsPrompt:
					'Rewrite sentence (b) so that it means the same as sentence (a) (2.5 pts):\n1a) The forestry officer told the campers, "Do not leave glass bottles in the woods."\n1b) The forestry officer told the campers .......... .\n2a) The journalist asked Meriem, "How do you save water at home?"\n2b) The journalist asked Meriem .......... .',
				rsAns:
					'1b) The forestry officer told the campers not to leave glass bottles in the woods.\n2b) The journalist asked Meriem how she saved water at home.',
				condPrompt:
					'Put the verbs in brackets into the right tense (Conditional Types 0, 1, or 2) (2.0 pts):\na) If I (be) .......... you, I (join) .......... the autumn tree-planting drive.\nb) If households (reduce) .......... plastic waste, our beaches (become) .......... cleaner next summer.',
				condAns: 'a) were / would join (Type 2 — advice)\nb) reduce / will become (Type 1 — realistic future)',
				stressWords: ['pollution', 'climatic', 'ecology', 'protection', 'scientific', 'activity'],
				stressCols: [
					{ header: '2nd from End (-tion / -ic)', words: ['pollution', 'climatic', 'protection', 'scientific'], mark: '1.0' },
					{ header: '3rd from End (-gy / -ty)', words: ['ecology', 'activity'], mark: '0.5' }
				],
				mcqQuestion: 'Report the negative order accurately: The teacher told the pupils, "Do not waste printing paper."',
				mcqCorrect: 'The teacher told the pupils not to waste printing paper.',
				mcqDistractors: [
					{
						text: 'The teacher told the pupils do not waste printing paper.',
						diagnosticFeedback: 'Remove "do" and use "not to + base verb".'
					},
					{
						text: 'The teacher told the pupils to not wasting printing paper.',
						diagnosticFeedback: 'Use "not to + base verb (waste)", never V-ing.'
					},
					{
						text: 'The teacher asked the pupils if they not waste paper.',
						diagnosticFeedback: 'This is a negative command, not a Yes/No question.'
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
						verb: { value: 'destroy', mark: '0.5' },
						noun: { given: true, value: 'destruction' },
						adjective: { value: 'destructive', mark: '0.5' }
					}
				],
				rsPrompt:
					'Rewrite sentence (b) so that it means the same as sentence (a) (2.5 pts):\n1a) The principal told us, "Sort your paper waste in the blue bin."\n1b) The principal told us .......... .\n2a) The reporter asked Sami, "Did your class plant trees last week?"\n2b) The reporter asked Sami .......... .',
				rsAns:
					'1b) The principal told us to sort our paper waste in the blue bin.\n2b) The reporter asked Sami if his class had planted trees the week before.',
				condPrompt:
					'Put the verbs in brackets into the right tense (Conditional Types 0, 1, or 2) (2.0 pts):\na) If you (heat) .......... water to 100 degrees Celsius, it (boil) .......... .\nb) If every citizen (use) .......... solar panels, cities (have) .......... much cleaner air.',
				condAns: 'a) heat / boils (Type 0 — scientific fact)\nb) used / would have (Type 2 — hypothetical)',
				stressWords: ['destruction', 'economic', 'diversity', 'conservation', 'historic', 'community'],
				stressCols: [
					{ header: '2nd from End (-tion / -ic)', words: ['destruction', 'economic', 'conservation', 'historic'], mark: '1.0' },
					{ header: '3rd from End (-ty)', words: ['diversity', 'community'], mark: '0.5' }
				],
				mcqQuestion: 'Complete the Conditional Type 2 advice: "If I .......... you, I would switch off unused lights every night."',
				mcqCorrect: 'were',
				mcqDistractors: [
					{
						text: 'am',
						diagnosticFeedback: 'Type 2 requires the past subjunctive "were", not Present Simple "am".'
					},
					{
						text: 'will be',
						diagnosticFeedback: 'Never put "will" inside an if-clause.'
					},
					{
						text: 'would be',
						diagnosticFeedback: 'Never put "would" inside the if-clause.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledStress = rng.shuffle(variant.stressWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) ${variant.rsPrompt}`,
				answer: variant.rsAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.condPrompt}`,
				answer: variant.condAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `4) Classify the following words according to their word-stress rule (1.5 pts):\n${shuffledStress.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.stressCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الصحيحة نحويا:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Report imperatives with (not) to + stem, questions with statement order, and Type 2 conditionals with Past Simple + would + stem.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Complete the morphology, grammar, and word-stress activities:',
				content
			},
			hints: [
				'في نقل الأوامر: الأمر المثبت يأخذ to + Stem، والمنفي يأخذ not to + Stem مع حذف Do.',
				'في الشرط النوع الثاني للنصيحة نكتب دائما: If I were you, I would + Stem.',
				'قاعدة النبر الذهبية: -tion و -ic على المقطع ما قبل الأخير (2nd from end)، و -ty / -gy على الثالث من الآخر (3rd from end).'
			],
			solutionStepsAr: [
				`Reported Speech: ${variant.rsAns}`,
				`Conditionals: ${variant.condAns}`,
				`Word Stress: ${variant.stressCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Cause & Result Connectors, Word Building & Syllables (8 pts)
const tpl1asTclT3CauseResultMorphologyTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t3_cause_result_morphology_te',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص — روابط السبب والنتيجة (because / because of / so / consequently) وعدد المقاطع',
	curriculumLessonId: 'eng_lesson_1as_tcl_t3_cause_result',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'inform' },
						noun: { value: 'information', mark: '0.5' },
						adjective: { value: 'informative', mark: '0.5' }
					},
					{
						verb: { value: 'harm', mark: '0.5' },
						noun: { given: true, value: 'harm' },
						adjective: { value: 'harmful', mark: '0.5' }
					}
				],
				cr1Prompt: 'a) Summer rainfall was very low. Several mountain springs dried up. (consequently)',
				cr1Ans: 'Summer rainfall was very low; consequently, several mountain springs dried up.',
				cr2Prompt: 'b) Sea turtles are threatened because plastic bags pollute the coast. (Rewrite with because of)',
				cr2Ans: 'Sea turtles are threatened because of coastal plastic pollution (OR because of plastic bags polluting the coast).',
				cr3Prompt: 'c) Factories installed clean filters. Air quality improved significantly. (so)',
				cr3Ans: 'Factories installed clean filters, so air quality improved significantly.',
				gapPrompt: 'Fill in with (since, because of, therefore): ".......... forests absorb carbon dioxide, we must protect them; .........., schools plant new saplings every autumn."',
				gapAns: 'Since / therefore',
				sylWords: ['drought', 'forest', 'environment', 'clean', 'nature', 'pollution'],
				sylCols: [
					{ header: '1 Syllable', words: ['drought', 'clean'], mark: '0.5' },
					{ header: '2 Syllables', words: ['forest', 'nature'], mark: '0.5' },
					{ header: '3+ Syllables', words: ['environment', 'pollution'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the grammatically correct sentence expressing cause:',
				mcqCorrect: 'Many desert farms faced shortages because of prolonged drought.',
				mcqDistractors: [
					{
						text: 'Many desert farms faced shortages because prolonged drought.',
						diagnosticFeedback: '"prolonged drought" is a noun phrase, so it needs "because of", not "because".'
					},
					{
						text: 'Because it was dry, so many desert farms faced shortages.',
						diagnosticFeedback: 'Never combine both "Because" and "so" in the same sentence.'
					},
					{
						text: 'Many desert farms faced shortages; because of, drought lasted long.',
						diagnosticFeedback: '"because of" cannot link a full clause with a semicolon.'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'recycle' },
						noun: { value: 'recycling', mark: '0.5' },
						adjective: { value: 'recyclable', mark: '0.5' }
					},
					{
						verb: { value: 'consume', mark: '0.5' },
						noun: { given: true, value: 'consumption' },
						adjective: { value: 'consumable', mark: '0.5' }
					}
				],
				cr1Prompt: 'a) Volunteers cleaned the beach every Saturday. The coastline became spotless. (as a result)',
				cr1Ans: 'Volunteers cleaned the beach every Saturday. As a result, the coastline became spotless.',
				cr2Prompt: 'b) Many homes saved energy because they switched to LED bulbs. (Rewrite with so)',
				cr2Ans: 'Many homes switched to LED bulbs, so they saved energy.',
				cr3Prompt: 'c) The air in the valley stayed fresh. There were thousands of pine trees. (because of)',
				cr3Ans: 'The air in the valley stayed fresh because of the thousands of pine trees.',
				gapPrompt: 'Fill in with (because, due to, consequently): "The park stayed shaded .......... the tall olive trees; .........., families visited it every afternoon."',
				gapAns: 'due to / consequently',
				sylWords: ['tree', 'water', 'renewable', 'soil', 'solar', 'recycling'],
				sylCols: [
					{ header: '1 Syllable', words: ['tree', 'soil'], mark: '0.5' },
					{ header: '2 Syllables', words: ['water', 'solar'], mark: '0.5' },
					{ header: '3+ Syllables', words: ['renewable', 'recycling'], mark: '0.5' }
				],
				mcqQuestion: 'Which sentence correctly expresses result?',
				mcqCorrect: 'Temperatures rose sharply; consequently, mountain snow melted early.',
				mcqDistractors: [
					{
						text: 'Because temperatures rose sharply, so mountain snow melted early.',
						diagnosticFeedback: 'Never combine "Because" and "so" together.'
					},
					{
						text: 'Mountain snow melted early; consequently, temperatures rose sharply.',
						diagnosticFeedback: 'Cause and result are inverted.'
					},
					{
						text: 'Temperatures rose sharply because of mountain snow melted early.',
						diagnosticFeedback: '"because of" cannot precede a full clause, and cause/result are swapped.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledSyl = rng.shuffle(variant.sylWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) Combine or rewrite the sentences using the linkers in brackets (3.0 pts):\n${variant.cr1Prompt}\n${variant.cr2Prompt}\n${variant.cr3Prompt}`,
				answer: `a) ${variant.cr1Ans}\nb) ${variant.cr2Ans}\nc) ${variant.cr3Ans}`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.gapPrompt} (1.5 pts)`,
				answer: variant.gapAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) Classify the following environmental terms according to their number of syllables (1.5 pts):\n${shuffledSyl.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.sylCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة السليمة في التعبير عن السبب أو النتيجة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Use because/since + clause, because of/due to + noun phrase, and so/therefore/consequently for results without doubling linkers.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Complete the morphology, cause-result, and syllable activities:',
				content
			},
			hints: [
				'لا تجمع أبدا بين Because و so في الجملة نفسها.',
				'بعد because of و due to نضع مركبا اسميا بدون فعل مصرف.',
				'تأمل أصوات العلة المنطوقة فقط عند عدّ المقاطع (clean و drought مقطع واحد فقط).'
			],
			solutionStepsAr: [
				`Sentence (a): ${variant.cr1Ans}`,
				`Sentence (b): ${variant.cr2Ans}`,
				`Sentence (c): ${variant.cr3Ans}`,
				`Gaps: ${variant.gapAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Eco Survey Report / Environmental Essay
const tpl1asTclT3EcoReportEssayWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t3_eco_report_essay_we',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة تقرير استطلاع أو فقرة حول حماية الطبيعة والغابات',
	curriculumLessonId: 'eng_lesson_1as_tcl_t3_cause_result',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'Write a short article (90 to 110 words) for your school magazine explaining the main causes of urban litter and proposing practical solutions. Use cause/result connectors and Conditional Type 1 or 2.',
				topicOneNotes: [
					'Causes: careless disposal of plastic bags / lack of sorting bins / weak public awareness',
					'Consequences: dirty streets, blocked rainwater drains, harm to animals and beauty of cities',
					'Solutions: place recycling bins in schools and streets / organize youth clean-up campaigns / educate children on cleanliness as part of faith',
					'Conclusion: If every citizen acted responsibly, our towns would shine with cleanliness'
				],
				topicTwoPrompt:
					'You conducted a survey among 30 classmates about their favourite ways to spend weekends productively (reading, sports, helping family, volunteering). Write a short survey report (90 to 110 words) using reported speech and quantifiers.',
				modelAnswer:
					'Urban litter has become a visible challenge in many neighbourhoods today. Streets often look untidy because of careless plastic disposal and the lack of clear sorting bins. Consequently, rainwater drains get blocked in winter and public spaces lose their beauty. Fortunately, practical solutions are within everyone-s reach. First, municipalities and schools should place labelled bins for paper and plastic. Second, students can organize monthly clean-up campaigns because cleanliness is a noble Islamic and civic value. If every family taught its children not to drop litter, our towns would stay clean, healthy, and welcoming for all residents.',
				rubricSummary:
					'Clear cause-effect-solution progression (1.5 pts), Accurate cause/result linkers and conditionals (1.5 pts), Cohesive paragraph unity (1 pt), Mechanics and spelling (1 pt).',
				mcqQuestion: 'Which sentence combines cause and solution effectively in an environmental article?',
				mcqCorrect: 'Drains get blocked because of plastic litter; therefore, we must sort waste carefully.',
				mcqDistractors: [
					{
						text: 'Because plastic litter blocks drains, so we must sorting waste.',
						diagnosticFeedback: 'Avoid combining "Because" with "so", and use base verb "sort" after "must".'
					},
					{
						text: 'Plastic litter is blocked because of we throw bags.',
						diagnosticFeedback: '"because of" cannot precede a full clause ("we throw").'
					},
					{
						text: 'If we would sort waste, drains will not block.',
						diagnosticFeedback: 'Do not put "would" inside the if-clause or mix Type 2 with Type 1.'
					}
				]
			},
			{
				topicOnePrompt:
					'Using the survey notes below, write a short report (90 to 110 words) about how 40 Algerian high school students help protect water and energy at home.',
				topicOneNotes: [
					'Informants: 40 first-year Literary Stream students',
					'32/40 (Most of them): turn off bedroom lights before leaving',
					'20/40 (Half of them): remind family members to close taps tightly',
					'8/40 (A few of them): collect rainwater for balcony plants',
					'0/40 (None of them): think water is unlimited',
					'Conclusion: small eco-friendly habits build a sustainable future'
				],
				topicTwoPrompt:
					'Write a short persuasive paragraph (90 to 110 words) explaining what you would do to make your secondary school greener if you were elected eco-club president (use Conditional Type 2).',
				modelAnswer:
					'Last week, our class conducted a survey among 40 first-year Literary Stream students to find out how they conserve water and energy at home. We asked them what daily habits they practised to reduce waste. Our findings show encouraging responsibility. Most of the informants said that they turned off bedroom lights whenever they left a room. Half of them told us that they reminded their families to close taps tightly. Although only a few of them collected rainwater for balcony plants, none of the respondents believed that water was unlimited. Consequently, regular eco-awareness clubs can easily turn these habits into lasting national savings.',
				rubricSummary:
					'Complete reporting of survey statistics (1.5 pts), Accurate reported speech and quantifiers (1.5 pts), Clear introduction-findings-conclusion flow (1 pt), Mechanics (1 pt).',
				mcqQuestion: 'Which sentence accurately reports that 0 out of 40 students think water is unlimited?',
				mcqCorrect: 'None of the respondents believed that water was unlimited.',
				mcqDistractors: [
					{
						text: 'None of the respondents did not believe that water was unlimited.',
						diagnosticFeedback: 'Avoid double negatives with "None of".'
					},
					{
						text: 'All of the respondents believed that water was unlimited.',
						diagnosticFeedback: '0 out of 40 means "none of", not "all of".'
					},
					{
						text: 'Half of the respondents asked if water is unlimited.',
						diagnosticFeedback: 'Wrong quantifier and wrong reporting verb.'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة السليمة لتقرير الاستطلاع أو المقال البيئي:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Combine accurate quantifiers, reported speech, cause/result connectors, and conditionals for high Written Expression scores.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a well-organized response:',
				content
			},
			hints: [
				'في المقال البيئي رتّب أفكارك: الأسباب (because / because of)، ثم النتائج (consequently / therefore)، ثم الحلول وجملة شرطية.',
				'في تقرير الاستطلاع استعمل الكلام المنقول (said that / told us that) مع محددات الكمية بدقة.',
				'راجع الترقيم والروابط وتجنب النفي المزدوج.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T3: EnglishParameterizedTemplate[] = [
	tpl1asTclT3SurveyNatureComprehension,
	tpl1asTclT3ReportedConditionalsTe,
	tpl1asTclT3CauseResultMorphologyTe,
	tpl1asTclT3EcoReportEssayWe
];
