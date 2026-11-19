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
// 5 Parameterized Templates — 2AS Scientific & Management Shared — Trimester 3
// Unit 4: No Man is an Island (Disasters, Charity & Solidarity)
// Split: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ============================================================================

// [1] Comprehension (8 pts) — Natural Disasters, Preparedness & Community Relief
export const tpl2asSciT3CompNaturalDisastersRelief: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t3_comp_natural_disasters_relief',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): الكوارث الطبيعية والتضامن المجتمعي والإسعاف الأولي',
	curriculumLessonId: 'eng_lesson_2as_sci_t3_reported_statements',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Algerian Solidarity in the Face of Summer Wildfires',
				source: 'Adapted from Algerian Civic Solidarity Journal',
				paragraphs: [
					'Every summer, extreme heatwaves and dry winds can trigger dangerous wildfires across northern Algerian forests. Although civil protection officers work bravely day and night to control the flames, severe fires sometimes threaten mountain villages, olive groves, and family homes.',
					'Whenever such an emergency occurs, ordinary Algerian citizens respond with inspiring generosity. Within hours, youth associations, pharmacists, and volunteers from neighbouring provinces load trucks with bottled water, medicine, blankets, and hot meals. [[They]] drive long distances to deliver aid directly to displaced families and firefighters.',
					'A relief coordinator stated that rapid community solidarity had saved many lives and lifted the spirits of affected villagers. In spite of the material losses, [[these]] noble actions remind everyone that no man is an island and that mercy unites people in hard times.'
				],
				glossary: [
					{ term: 'displaced', meaning: 'forced to leave one\'s home temporarily for safety' },
					{ term: 'trigger', meaning: 'cause something sudden or dangerous to start' }
				],
				tfItems: [
					{
						q: 'a) Extreme heatwaves and dry winds can cause summer forest fires.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'b) Civil protection officers receive zero help from ordinary Algerian citizens.',
						a: 'False',
						c: 'Youth associations, pharmacists, and volunteers send water, medicine, blankets, and hot meals.',
						mark: '0.5'
					},
					{
						q: 'c) Volunteers wait several weeks before collecting emergency supplies.',
						a: 'False',
						c: 'Within hours, they load trucks and drive to deliver aid directly.',
						mark: '0.5'
					},
					{
						q: 'd) According to the coordinator, community solidarity helped save lives and comfort villagers.',
						a: 'True',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) What weather factors can trigger summer wildfires in northern Algeria?',
						a: 'Extreme heatwaves and dry winds.',
						mark: '1.0'
					},
					{
						q: 'b) Mention three types of relief supplies sent by volunteers to affected villages.',
						a: 'Bottled water, medicine, blankets, and hot meals (any three).',
						mark: '1.0'
					},
					{
						q: 'c) What moral lesson do these solidarity actions remind everyone of?',
						a: 'They remind everyone that no man is an island and that mercy unites people in hard times.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) They (§2)   b) these (§3)',
				refAnswer: 'a) They (§2): youth associations, pharmacists, and volunteers.   b) these (§3): rapid community solidarity (delivering aid and supporting villagers).',
				mcHeader: '4) Choose the most appropriate general idea for the text:',
				mcOptions: [
					'Rapid citizen solidarity helps communities survive and recover from wildfires.',
					'Wildfires happen only during cold winter months.',
					'Mountain villages never need emergency supplies.'
				],
				mcCorrect: 'Rapid citizen solidarity helps communities survive and recover from wildfires.',
				quizStem: 'According to the passage on Algerian solidarity during wildfires, how do citizens support affected mountain villages?',
				quizCorrect: 'By rapidly collecting and delivering water, medicine, blankets, and hot meals to families and firefighters',
				quizDistractors: [
					{
						text: 'By closing all regional highways to relief trucks',
						diagnosticFeedback: 'Volunteers drive long distances to bring relief trucks into affected areas.'
					},
					{
						text: 'By leaving villagers without assistance until winter arrives',
						diagnosticFeedback: 'Citizens mobilize within hours of an emergency.'
					},
					{
						text: 'By stopping civil protection officers from fighting the fire',
						diagnosticFeedback: 'Citizens support both firefighters and displaced families.'
					}
				],
				quizExplanation: 'الفقرة الثانية تبين هبة المتطوعين والجمعيات خلال ساعات لإيصال الماء والدواء والأغطية والوجبات الساخنة.'
			},
			{
				title: 'Earthquake Safety and School Preparedness',
				source: 'Adapted from Emergency Safety Handbook',
				paragraphs: [
					'Because earthquakes strike suddenly without warning, preparing students and families ahead of time is one of the smartest ways to save lives. Across many Algerian high schools, civil protection instructors organize annual safety drills so that pupils know exactly how to react during a tremor.',
					'During the workshop, the head instructor ordered students to stay calm, shelter under sturdy desks away from glass windows, and avoid using lifts. [[He]] also warned them not to rush blindly toward narrow staircases while the building is still shaking.',
					'Once the shaking stops, teachers guide classes calmly to an open courtyard and check whether anyone needs first aid. Despite the fear that tremors naturally cause, well-trained students are far more likely to protect [[themselves]] and assist younger children safely.'
				],
				glossary: [
					{ term: 'tremor', meaning: 'a shaking movement of the earth during an earthquake' },
					{ term: 'sturdy', meaning: 'strong and solid enough to resist pressure' }
				],
				tfItems: [
					{
						q: 'a) Scientists can always predict the exact minute an earthquake will strike.',
						a: 'False',
						c: 'Earthquakes strike suddenly without warning.',
						mark: '0.5'
					},
					{
						q: 'b) Civil protection instructors hold annual safety drills in many high schools.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Students are advised to use lifts and stand near glass windows during a tremor.',
						a: 'False',
						c: 'They are ordered to stay away from glass windows and avoid using lifts.',
						mark: '0.5'
					},
					{
						q: 'd) Well-trained pupils can protect themselves and help younger children safely.',
						a: 'True',
						mark: '0.5'
					}
				],
				compQuestions: [
					{
						q: 'a) Why are annual school earthquake drills so important?',
						a: 'Because earthquakes strike suddenly without warning, and drills teach pupils how to react and save lives.',
						mark: '1.0'
					},
					{
						q: 'b) What did the instructor warn students NOT to do while a building is shaking?',
						a: 'He warned them not to use lifts and not to rush blindly toward narrow staircases.',
						mark: '1.0'
					},
					{
						q: 'c) What do teachers do as soon as the shaking stops?',
						a: 'They guide classes calmly to an open courtyard and check whether anyone needs first aid.',
						mark: '1.0'
					}
				],
				refPrompt: '3) What or who do the underlined words refer to in the text? a) He (§2)   b) themselves (§3)',
				refAnswer: 'a) He (§2): the head instructor.   b) themselves (§3): well-trained students.',
				mcHeader: '4) The text is mainly:',
				mcOptions: ['Expository / Informative', 'Historical', 'Argumentative'],
				mcCorrect: 'Expository / Informative',
				quizStem: 'According to the Earthquake Safety passage, what is the safest immediate action inside a classroom during a tremor?',
				quizCorrect: 'Stay calm and shelter under a sturdy desk away from glass windows',
				quizDistractors: [
					{
						text: 'Rush blindly down narrow staircases immediately',
						diagnosticFeedback: 'The instructor specifically warned students NOT to rush toward narrow staircases while shaking continues.'
					},
					{
						text: 'Take the building lift as fast as possible',
						diagnosticFeedback: 'Lifts must always be avoided during earthquakes.'
					},
					{
						text: 'Stand right next to large glass windows to watch outside',
						diagnosticFeedback: 'Students must move away from glass windows to avoid shattering glass.'
					}
				],
				quizExplanation: 'الفقرة الثانية تذكر تعليمات الحماية المدنية: الهدوء والاحتماء تحت طاولة متينة بعيدا عن الزجاج وتجنب المصاعد والسلالم أثناء الهزة.'
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
			trimesterId: 't3',
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
				instruction: 'Read the text carefully then answer the comprehension questions.',
				content
			},
			hints: [
				'لاحظ توظيف الكلام المنقول وروابط الاستدراك داخل النص لفهم المواقف بدقة.',
				'صحح العبارات الخاطئة في سؤال True/False استنادا إلى النص.',
				'تأكد من مطابقة الضمير المسطّر مع مرجعه في العدد والمعنى.'
			],
			solutionStepsAr: [
				'التحقق من عبارات الصواب والخطأ وتصحيح الخاطئة.',
				'استخراج إجابات واضحة وموجزة لأسئلة الفهم.',
				'تحديد مرجع الضمائر واختيار الفكرة العامة أو نوع النص.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [2] Comprehension (8 pts) — Touiza, Youth Charity & The Algerian Red Crescent
export const tpl2asSciT3CompCharitySolidarity: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t3_comp_charity_solidarity',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (8 نقاط): التويزة والعمل الخيري والهلال الأحمر الجزائري',
	curriculumLessonId: 'eng_lesson_2as_sci_t3_solidarity_report_writing',
	defaultPoints: 8,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Touiza: Algeria\'s Timeless Spirit of Mutual Aid',
				source: 'Algerian Social Heritage Review',
				paragraphs: [
					'For generations across Algerian villages and towns, the word "Touiza" has symbolized voluntary teamwork and sincere brotherhood. Inspired by Islamic teachings of mercy and charity, neighbours gather freely to harvest olives, build a house for a needy family, or clean local water springs without asking for wages.',
					'Even though modern urban lifestyles have made daily schedules busier, young Algerians are reviving [[this]] noble heritage in creative ways. Secondary school clubs and university volunteers organize winter coat drives, collect textbooks for orphans, and renovate rural classrooms during holidays.',
					'Sociologists explain that Touiza does far more than finish practical tasks quickly; [[it]] strengthens social bonds, heals loneliness, and teaches youth that true wealth lies in serving others with humility.'
				],
				glossary: [
					{ term: 'wages', meaning: 'money paid in return for work' },
					{ term: 'humility', meaning: 'modesty and absence of pride' }
				],
				tfItems: [
					{
						q: 'a) Volunteers in Touiza demand high financial wages for helping their neighbours.',
						a: 'False',
						c: 'Neighbours gather freely and help without asking for wages.',
						mark: '0.5'
					},
					{
						q: 'b) Touiza is inspired by Islamic values of mercy and charity.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'c) Modern youth have completely abandoned the tradition of Touiza.',
						a: 'False',
						c: 'Young Algerians are reviving it through coat drives, textbook donations, and renovating classrooms.',
						mark: '0.5'
					},
					{
						q: 'd) Touiza strengthens social bonds and fights loneliness.',
						a: 'True',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) How students and youth revive Touiza today.   b) The moral and social benefits of Touiza.',
				paraMatchAnswer: 'a) Paragraph 2 (§2).   b) Paragraph 3 (§3).',
				compQuestions: [
					{
						q: 'a) Give two traditional activities carried out through Touiza in Algerian villages.',
						a: 'Harvesting olives, building a house for a needy family, and cleaning local water springs (any two).',
						mark: '1.0'
					},
					{
						q: 'b) How are secondary school clubs and university students keeping Touiza alive?',
						a: 'They organize winter coat drives, collect textbooks for orphans, and renovate rural classrooms during holidays.',
						mark: '1.0'
					},
					{
						q: 'c) According to sociologists, what does Touiza teach young people about true wealth?',
						a: 'It teaches them that true wealth lies in serving others with humility.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) this (§2)   b) it (§3)',
				refAnswer: 'a) this (§2): the tradition of Touiza (noble heritage).   b) it (§3): Touiza.',
				quizStem: 'According to the passage on Touiza, how are Algerian students reviving this traditional value today?',
				quizCorrect: 'By organizing winter coat drives, collecting textbooks for orphans, and renovating rural classrooms',
				quizDistractors: [
					{
						text: 'By charging neighbours money for community repairs',
						diagnosticFeedback: 'Touiza is strictly voluntary and carried out without asking for wages.'
					},
					{
						text: 'By replacing charity clubs with commercial companies',
						diagnosticFeedback: 'The text highlights student charity clubs and voluntary service.'
					},
					{
						text: 'By limiting voluntary work to olive harvesting only',
						diagnosticFeedback: 'Modern youth expand Touiza to education, winter aid, and school renovation.'
					}
				],
				quizExplanation: 'الفقرة الثانية تذكر أن الشباب والتلاميذ يحيون التويزة بجمع المعاطف الشتوية والكتب للأيتام وترميم الأقسام الريفية.'
			},
			{
				title: 'The Algerian Red Crescent: Fifty-Plus Years of Humanitarian Aid',
				source: 'Adapted from Humanitarian Action Chronicle',
				paragraphs: [
					'Founded in 1957 during the War of Independence to care for wounded citizens and refugees, the Algerian Red Crescent has remained a leading humanitarian organization ever since. [[Its]] mission is built on impartiality, compassion, and rapid relief for anyone suffering from natural disasters or poverty.',
					'Whenever floods, snowstorms, or earthquakes strike, trained Red Crescent volunteers set up emergency shelters, distribute food parcels, and provide first aid. During the blessed month of Ramadan, [[they]] also run solidarity kitchens and deliver food baskets quietly to widows and needy families so that everyone\'s dignity is preserved.',
					'Joining a local first-aid course or volunteering for a charity drive allows high-school students to gain life-saving skills while contributing positively to society.'
				],
				glossary: [
					{ term: 'impartiality', meaning: 'helping people fairly without bias or discrimination' },
					{ term: 'dignity', meaning: 'honour and self-respect' }
				],
				tfItems: [
					{
						q: 'a) The Algerian Red Crescent was established in 1957.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'b) Its volunteers work only during the month of Ramadan.',
						a: 'False',
						c: 'They respond whenever floods, snowstorms, or earthquakes strike, as well as during Ramadan.',
						mark: '0.5'
					},
					{
						q: 'c) Food baskets are delivered quietly to preserve the dignity of needy families.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'd) High-school students cannot learn first-aid skills through volunteering.',
						a: 'False',
						c: 'Joining a first-aid course or charity drive allows students to gain life-saving skills.',
						mark: '0.5'
					}
				],
				paraMatchPrompt: '2) In which paragraph is each idea mentioned? a) The historical birth and core mission of the organization.   b) Why high-school students benefit from first-aid volunteering.',
				paraMatchAnswer: 'a) Paragraph 1 (§1).   b) Paragraph 3 (§3).',
				compQuestions: [
					{
						q: 'a) Why was the Algerian Red Crescent originally founded in 1957?',
						a: 'To care for wounded citizens and refugees during the War of Independence.',
						mark: '1.0'
					},
					{
						q: 'b) Mention two emergency actions taken by volunteers during floods or earthquakes.',
						a: 'They set up emergency shelters, distribute food parcels, and provide first aid (any two).',
						mark: '1.0'
					},
					{
						q: 'c) Why do volunteers deliver Ramadan food baskets quietly to widows and needy families?',
						a: 'So that everyone\'s dignity is preserved.',
						mark: '1.0'
					}
				],
				refPrompt: '4) What or who do the underlined words refer to in the text? a) Its (§1)   b) they (§2)',
				refAnswer: 'a) Its (§1): the Algerian Red Crescent.   b) they (§2): trained Red Crescent volunteers.',
				quizStem: 'Why do Algerian Red Crescent volunteers deliver Ramadan food baskets quietly to needy families?',
				quizCorrect: 'To respect and preserve the dignity of every family',
				quizDistractors: [
					{
						text: 'Because charity work is forbidden in public',
						diagnosticFeedback: 'The reason stated in the text is preserving the dignity of recipients.'
					},
					{
						text: 'Because they do not have enough baskets for anyone',
						diagnosticFeedback: 'Quiet delivery is an ethical choice to protect self-respect, not a shortage.'
					},
					{
						text: 'To avoid teaching first aid to students',
						diagnosticFeedback: 'First-aid courses are encouraged for students in paragraph 3.'
					}
				],
				quizExplanation: 'الفقرة الثانية تبرز أن إيصال القفف الغذائية بسرية ولطف يحفظ كرامة الأرامل والأسر المحتاجة.'
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر الجواب الصحيح استنادا إلى النص:',
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
				instruction: 'Read the passage carefully then do the activities below.',
				content
			},
			hints: [
				'اقرأ كل فقرة لتحديد فكرتها الرئيسية قبل الإجابة عن سؤال أرقام الفقرات.',
				'صحح الجمل الخاطئة بمعلومة دقيقة من النص.',
				'ارجع إلى السياق السابق للضمير المسطّر للتأكد من مرجعه الصحيح.'
			],
			solutionStepsAr: [
				'تمييز العبارات الصحيحة والخاطئة وتصويبها.',
				'تحديد الفقرة المناسبة لكل فكرة والإجابة عن أسئلة الفهم.',
				'استخراج مرجع الضمائر بدقة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [3] Text Exploration (7 pts) — Reported Speech (Statements, Orders, Requests & Questions) + Final -ed
export const tpl2asSciT3ExpReportedSpeech: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t3_exp_reported_speech',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'استكشاف النص (7 نقاط): الكلام المنقول (الخبر والأمر والطلب والسؤال)، الاشتقاق، ونطق (-ed)',
	curriculumLessonId: 'eng_lesson_2as_sci_t3_reported_orders_questions',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				vocabPrompt: '1) Match each word with its synonym: (1) donate   (2) shelter   (3) catastrophe   |   (A) disaster   (B) safe refuge   (C) give freely',
				vocabAnswer: '(1) donate = (C) give freely | (2) shelter = (B) safe refuge | (3) catastrophe = (A) disaster.',
				wbRows: [
					{
						verb: { given: true, value: 'donate' },
						noun: { value: 'donation', mark: '0.25' },
						adjective: { value: 'donated', mark: '0.25' }
					},
					{
						verb: { value: 'help', mark: '0.25' },
						noun: { given: true, value: 'help' },
						adjective: { value: 'helpful / helpless', mark: '0.25' }
					},
					{
						verb: { value: 'cooperate', mark: '0.25' },
						noun: { value: 'cooperation', mark: '0.25' },
						adjective: { given: true, value: 'cooperative' }
					}
				],
				grammarItems: [
					{
						q: 'a) Report the statement: The doctor said, "We have treated fifty patients today."\n   The doctor said that ............',
						a: 'The doctor said that they had treated fifty patients that day.',
						mark: '0.5'
					},
					{
						q: 'b) Report the warning: The rescue officer told the crowd, "Do not cross the flooded bridge!"\n   The rescue officer warned the crowd ............',
						a: 'The rescue officer warned the crowd not to cross the flooded bridge.',
						mark: '0.5'
					},
					{
						q: 'c) Report the Yes/No question: The journalist asked, "Did the relief trucks arrive yesterday?"\n   The journalist asked ............',
						a: 'The journalist asked if (or: whether) the relief trucks had arrived the day before.',
						mark: '0.5'
					},
					{
						q: 'd) Report the Wh-question: A volunteer asked me, "Where will you store the blankets?"\n   A volunteer asked me ............',
						a: 'A volunteer asked me where I would store the blankets.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following verbs according to the pronunciation of their final "-ed": helped, donated, saved, flooded, reached, rescued',
				phonologyCols: [
					{ header: '/t/', words: ['helped', 'reached'], mark: '0.35' },
					{ header: '/d/', words: ['saved', 'rescued'], mark: '0.35' },
					{ header: '/id/', words: ['donated', 'flooded'], mark: '0.30' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (solidarity, victims, donated, shelters)\nRight after the earthquake, citizens showed extraordinary ........(1)......... Families ........(2)........ blankets and food, while local authorities opened safe ........(3)........ for all affected ........(4).........',
				clozeAnswer: '(1) solidarity   (2) donated   (3) shelters   (4) victims.',
				quizStem: 'Report accurately: The civil protection officer asked, "Where did the volunteers set up the medical tent?"',
				quizCorrect: 'The civil protection officer asked where the volunteers had set up the medical tent.',
				quizDistractors: [
					{
						text: 'The civil protection officer asked where did the volunteers set up the medical tent.',
						diagnosticFeedback: 'Remove "did" and use statement word order (Subject + Verb) in reported questions.'
					},
					{
						text: 'The civil protection officer asked if where the volunteers had set up the medical tent.',
						diagnosticFeedback: 'Never combine "if" with a Wh-word like "where".'
					},
					{
						text: 'The civil protection officer asked where had the volunteers set up the medical tent?',
						diagnosticFeedback: 'Put the subject before the verb and end with a full stop, not a question mark.'
					}
				],
				quizExplanation: 'في نقل أسئلة Wh- نحذف did، ونضع الفاعل قبل الفعل (the volunteers had set up)، ونختم بنقطة.'
			},
			{
				vocabPrompt: '1) Find the opposite of each word from the list (generous, safe, rebuild): (1) dangerous   (2) destroy   (3) selfish',
				vocabAnswer: '(1) dangerous / safe | (2) destroy / rebuild | (3) selfish / generous.',
				wbRows: [
					{
						verb: { given: true, value: 'organize' },
						noun: { value: 'organization', mark: '0.25' },
						adjective: { value: 'organized', mark: '0.25' }
					},
					{
						verb: { value: 'protect', mark: '0.25' },
						noun: { given: true, value: 'protection' },
						adjective: { value: 'protective', mark: '0.25' }
					},
					{
						verb: { value: 'care', mark: '0.25' },
						noun: { value: 'care', mark: '0.25' },
						adjective: { given: true, value: 'caring / careful' }
					}
				],
				grammarItems: [
					{
						q: 'a) Report the statement: Amina told her classmates, "I will bring warm coats tomorrow."\n   Amina told her classmates that ............',
						a: 'Amina told her classmates that she would bring warm coats the next day (or: the following day).',
						mark: '0.5'
					},
					{
						q: 'b) Report the request: The nurse said to Karim, "Please pass the clean bandages."\n   The nurse asked Karim ............',
						a: 'The nurse asked Karim to pass the clean bandages.',
						mark: '0.5'
					},
					{
						q: 'c) Report the Yes/No question: The mayor asked, "Are all the mountain roads open now?"\n   The mayor asked ............',
						a: 'The mayor asked if (or: whether) all the mountain roads were open then.',
						mark: '0.5'
					},
					{
						q: 'd) Report the Wh-question: She asked the leader, "How many volunteers joined the campaign?"\n   She asked the leader ............',
						a: 'She asked the leader how many volunteers had joined the campaign.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following verbs according to the pronunciation of their final "-ed": worked, shared, needed, washed, protected, survived',
				phonologyCols: [
					{ header: '/t/', words: ['worked', 'washed'], mark: '0.35' },
					{ header: '/d/', words: ['shared', 'survived'], mark: '0.35' },
					{ header: '/id/', words: ['needed', 'protected'], mark: '0.30' }
				],
				clozePrompt: '5) Fill in the gaps with words from the list: (first-aid, calm, warned, safe)\nDuring the safety drill, the instructor told everyone to remain ........(1)......... He ........(2)........ students not to run toward stairs and showed how to use a ........(3)........ kit until reaching a ........(4)........ open area.',
				clozeAnswer: '(1) calm   (2) warned   (3) first-aid   (4) safe.',
				quizStem: 'Report the negative order correctly: The firefighter shouted, "Do not touch the fallen power cables!"',
				quizCorrect: 'The firefighter warned us not to touch the fallen power cables.',
				quizDistractors: [
					{
						text: 'The firefighter warned us to not touch the fallen power cables.',
						diagnosticFeedback: 'Always write "not to + stem", never "to not".'
					},
					{
						text: 'The firefighter warned us do not touch the fallen power cables.',
						diagnosticFeedback: 'Remove "do" and replace the imperative with "not to + stem".'
					},
					{
						text: 'The firefighter warned us that not touch the fallen power cables.',
						diagnosticFeedback: 'Do not use "that" before an infinitive order.'
					}
				],
				quizExplanation: 'نقل الأمر والتحذير المنفي يكون دائما بصيغة: warned + object + not to + stem.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.vocabPrompt, answer: v.vocabAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following word-building table:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Rewrite the following sentences in Reported Speech:' },
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizStem,
				questionTextAr: 'اختر التحويل الصحيح إلى الكلام المنقول:',
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
				instruction: 'Do the following vocabulary, word-building, reported speech, phonology, and cloze tasks.',
				content
			},
			hints: [
				'تحقق من تراجع الزمن (Backshift) وتعديل الظروف (today تصبح that day و yesterday تصبح the day before).',
				'في الأسئلة المنقولة ضع الفاعل قبل الفعل واحذف do/did وعلامة الاستفهام.',
				'في النهاية (-ed): صوت /id/ بعد /t/ و /d/ فقط.'
			],
			solutionStepsAr: [
				'مطابقة المفردات وإتمام جدول الاشتقاق.',
				'تحويل الجمل الخبرية والأوامر والأسئلة إلى الكلام المنقول.',
				'تصنيف الأفعال حسب نطق (-ed) ثم إكمال الفقرة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [4] Text Exploration (7 pts) — Concession (although / though / despite / in spite of) + Silent Letters + Reordering
export const tpl2asSciT3ExpConcessionPhonology: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t3_exp_concession_phonology',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'phonology_pronunciation',
	titleAr: 'استكشاف النص (7 نقاط): الاستدراك (although/despite)، الحروف الصامتة، والترتيب المنطقي',
	curriculumLessonId: 'eng_lesson_2as_sci_t3_final_ed_silent_letters',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				vocabPrompt: '1) Match each humanitarian term with its definition:\n(1) charity   (2) volunteer   (3) solidarity   |   (A) unity and mutual support in hardship   (B) voluntary giving to help the needy   (C) person who offers help freely without pay',
				vocabAnswer: '(1) charity = (B) | (2) volunteer = (C) | (3) solidarity = (A).',
				wbRows: [
					{
						verb: { given: true, value: 'assist' },
						noun: { value: 'assistance', mark: '0.25' },
						adjective: { value: 'assisted / assistant', mark: '0.25' }
					},
					{
						verb: { value: 'survive', mark: '0.25' },
						noun: { given: true, value: 'survival' },
						adjective: { value: 'surviving', mark: '0.25' }
					},
					{
						verb: { value: 'strengthen', mark: '0.25' },
						noun: { value: 'strength', mark: '0.25' },
						adjective: { given: true, value: 'strong' }
					}
				],
				grammarItems: [
					{
						q: 'a) Combine using (although): The snowstorm blocked the mountain pass. Volunteers delivered food on foot.',
						a: 'Although the snowstorm blocked the mountain pass, volunteers delivered food on foot.',
						mark: '0.5'
					},
					{
						q: 'b) Rewrite using (despite): Although the flood caused heavy damage, neighbours remained hopeful.\n   Despite ............',
						a: 'Despite the heavy damage (or: Despite the fact that the flood caused heavy damage), neighbours remained hopeful.',
						mark: '0.5'
					},
					{
						q: 'c) Rewrite using (in spite of): Though they were exhausted, the rescuers continued searching.\n   In spite of ............',
						a: 'In spite of being exhausted (or: In spite of their exhaustion), the rescuers continued searching.',
						mark: '0.5'
					},
					{
						q: 'd) Report the statement: The Red Crescent team said, "We are opening two emergency shelters today."\n   The Red Crescent team said that ............',
						a: 'The Red Crescent team said that they were opening two emergency shelters that day.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to their SILENT letter: island, honest, listen, know, hour, castle',
				phonologyCols: [
					{ header: 'Silent h', words: ['honest', 'hour'], mark: '0.35' },
					{ header: 'Silent t', words: ['listen', 'castle'], mark: '0.35' },
					{ header: 'Silent s / k', words: ['island (s)', 'know (k)'], mark: '0.30' }
				],
				reorderPrompt: '5) Reorder the following sentences to form a coherent solidarity paragraph:\na) By sunset, every needy family in the district had received warm blankets and food boxes.\nb) Last Friday, heavy winter snow isolated several small villages in the mountains.\nc) First, youth associations collected donations at the local mosque and secondary school.\nd) Then, volunteers cleared the icy path together to reach the trapped homes.',
				reorderAnswer: 'Order: b - c - d - a.',
				quizStem: 'Choose the sentence that correctly transforms: "Although the weather was freezing, the volunteers stayed outdoors."',
				quizCorrect: 'Despite the freezing weather, the volunteers stayed outdoors.',
				quizDistractors: [
					{
						text: 'Despite of the freezing weather, the volunteers stayed outdoors.',
						diagnosticFeedback: 'Never write "of" after "despite".'
					},
					{
						text: 'In spite of the weather was freezing, the volunteers stayed outdoors.',
						diagnosticFeedback: 'in spite of cannot precede a full clause directly without "the fact that".'
					},
					{
						text: 'Although the weather was freezing, but the volunteers stayed outdoors.',
						diagnosticFeedback: 'Never use both "although" and "but" in the same sentence.'
					}
				],
				quizExplanation: 'الرابط Despite يُتبع مباشرة بعبارة اسمية (the freezing weather) دون of ودون فعل مصرف.'
			},
			{
				vocabPrompt: '1) Match each word with its synonym: (1) bravery   (2) needy   (3) overcome   |   (A) defeat / get through   (B) courage   (C) poor / in need',
				vocabAnswer: '(1) bravery = (B) courage | (2) needy = (C) poor / in need | (3) overcome = (A) defeat / get through.',
				wbRows: [
					{
						verb: { given: true, value: 'volunteer' },
						noun: { value: 'volunteer / volunteering', mark: '0.25' },
						adjective: { value: 'voluntary', mark: '0.25' }
					},
					{
						verb: { value: 'prepare', mark: '0.25' },
						noun: { given: true, value: 'preparation' },
						adjective: { value: 'prepared', mark: '0.25' }
					},
					{
						verb: { value: 'benefit', mark: '0.25' },
						noun: { value: 'benefit', mark: '0.25' },
						adjective: { given: true, value: 'beneficial' }
					}
				],
				grammarItems: [
					{
						q: 'a) Combine using (in spite of): The charity had modest resources. It renovated three village schools.',
						a: 'In spite of its modest resources (or: In spite of having modest resources), the charity renovated three village schools.',
						mark: '0.5'
					},
					{
						q: 'b) Combine using (even though): The night was dark and rainy. Rescue teams located the missing hiker.',
						a: 'Even though the night was dark and rainy, rescue teams located the missing hiker.',
						mark: '0.5'
					},
					{
						q: 'c) Rewrite using (despite): Although he had little spare time, Samir joined the Touiza campaign.\n   Despite ............',
						a: 'Despite having little spare time (or: Despite his little spare time), Samir joined the Touiza campaign.',
						mark: '0.5'
					},
					{
						q: 'd) Report the question: The teacher asked us, "Have you read the earthquake safety leaflet?"\n   The teacher asked us ............',
						a: 'The teacher asked us if (or: whether) we had read the earthquake safety leaflet.',
						mark: '0.5'
					}
				],
				phonologyPrompt: '4) Classify the following words according to their SILENT letter: calm, write, climb, walk, wrong, doubt',
				phonologyCols: [
					{ header: 'Silent l', words: ['calm', 'walk'], mark: '0.35' },
					{ header: 'Silent w', words: ['write', 'wrong'], mark: '0.35' },
					{ header: 'Silent b', words: ['climb', 'doubt'], mark: '0.30' }
				],
				reorderPrompt: '5) Reorder the following sentences to form a coherent paragraph:\na) As a result, dozens of pupils received new schoolbags before the term began.\nb) In September, our high-school charity club launched a "Back to School" solidarity drive.\nc) Next, volunteers sorted the notebooks, pens, and bags neatly by grade level.\nd) First, students and parents donated unused supplies at the school library.',
				reorderAnswer: 'Order: b - d - c - a.',
				quizStem: 'Identify the silent letters respectively in: (1) calm, (2) climb, (3) honest.',
				quizCorrect: 'l / b / h',
				quizDistractors: [
					{
						text: 'c / m / t',
						diagnosticFeedback: 'Those letters are all pronounced clearly.'
					},
					{
						text: 'a / i / o',
						diagnosticFeedback: 'The vowels are pronounced; the silent letters are l, b, and h.'
					},
					{
						text: 'm / l / s',
						diagnosticFeedback: 'In calm "l" is silent, in climb "b" is silent, and in honest "h" is silent.'
					}
				],
				quizExplanation: 'الحروف الصامتة هي: l في calm، و b بعد m في climb، و h في أول كلمة honest.'
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const content: ContentBlock[] = [
			{ type: 'text', content: v.vocabPrompt, answer: v.vocabAnswer, mark: '1.5' },
			{ type: 'text', content: '2) Complete the following word-building table:' },
			buildEnglishWordBuildingTableBlock(v.wbRows),
			{ type: 'text', content: '3) Combine or rewrite the following sentences accurately:' },
			...v.grammarItems.map((g) => ({
				type: 'text' as const,
				content: g.q,
				answer: g.a,
				mark: g.mark
			})),
			{ type: 'text', content: v.phonologyPrompt },
			buildEnglishPhonologyTableBlock({ columns: v.phonologyCols }),
			{ type: 'text', content: v.reorderPrompt, answer: v.reorderAnswer, mark: '1.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't3',
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
				instruction: 'Complete the following language exploration activities.',
				content
			},
			hints: [
				'تذكّر: although / though + جملة كاملة، بينما despite / in spite of + اسم أو V-ing أو the fact that.',
				'انطق الكلمات في ذهنك لاكتشاف الحرف الصامت (calm, island, honest, listen, climb).',
				'في الترتيب المنطقي ابدأ بجملة السياق الزمني ثم First ثم Next/Then ثم الخاتمة.'
			],
			solutionStepsAr: [
				'مطابقة المفردات وإتمام جدول الاشتقاق.',
				'تطبيق قواعد الاستدراك والكلام المنقول بدقة.',
				'تصنيف الكلمات حسب الحروف الصامتة وترتيب الجمل لتكوين فقرة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// [5] Written Expression (5 pts) — Disaster Relief Report / Solidarity Newspaper Article
export const tpl2asSciT3WrittenSolidarityReport: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2as_sci_t3_written_solidarity_report',
	grade: '2as_se',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي (5 نقاط): كتابة تقرير إغاثة أو مقال تضامني (No Man is an Island)',
	curriculumLessonId: 'eng_lesson_2as_sci_t3_solidarity_report_writing',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				topicOnePrompt:
					'Following heavy autumn floods in a nearby rural area, your secondary school organized a solidarity and charity campaign with the Algerian Red Crescent. Write a short report (80 to 120 words) for your school magazine describing the event.',
				topicOneNotes: [
					'Headline + When/Where: last week, heavy floods damaged homes in nearby rural villages',
					'Action: pupils, teachers, and parents collected food parcels, blankets, and school supplies',
					'Concession: despite heavy rain and muddy roads, volunteers delivered aid on time',
					'Reported quote: Red Crescent coordinator said that student solidarity had brought real hope',
					'Conclusion: mutual aid (Touiza) proves that no man is an island'
				],
				topicTwoPrompt:
					'Write a short article (80 to 120 words) explaining the main safety rules students and families must follow before, during, and after an earthquake.',
				modelAnswer:
					'Secondary Pupils Unite to Support Flood-Affected Villages\nLast week, heavy autumn floods damaged dozens of homes in several rural villages near our town. Immediately, our secondary school launched a solidarity campaign in partnership with the Algerian Red Crescent. Within two days, pupils, teachers, and parents donated hundreds of warm blankets, food parcels, and new schoolbags for affected children. Despite the cold rain and muddy roads, youth volunteers worked tirelessly and delivered all supplies on time. At the end of the drive, the Red Crescent coordinator stated that student generosity had brought real comfort and hope to every family. This noble Touiza effort reminded us all that no man is an island and that sincere solidarity turns hardship into brotherhood.',
				rubricSummary: 'Report structure & headline (1.5) | Past tense, concession & reported speech accuracy (1.5) | Cohesion & vocabulary (1.0) | Spelling & punctuation (1.0).',
				quizStem: 'Which element best strengthens the body of a 2AS Solidarity Report (Unit 4)?',
				quizCorrect: 'Combining clear past-tense relief actions with a concession sentence (Despite...) and a reported witness quote',
				quizDistractors: [
					{
						text: 'Writing only a list of unconnected nouns without a headline',
						diagnosticFeedback: 'A report requires a clear headline and coherent full sentences.'
					},
					{
						text: 'Switching randomly between future tense and present continuous for a past campaign',
						diagnosticFeedback: 'A report about a past relief campaign should stay consistent in the Past Simple.'
					},
					{
						text: 'Copying the reading comprehension text word for word',
						diagnosticFeedback: 'Plagiarizing the reading passage receives zero marks in Written Expression.'
					}
				],
				quizExplanation: 'الجمع بين سرد أحداث الإغاثة بالماضي البسيط وتوظيف جملة استدراك (Despite) وتصريح منقول (stated that...) يضمن علامة ممتازة.'
			},
			{
				topicOnePrompt:
					'Write a short newspaper article (80 to 120 words) highlighting how Algerian citizens and youth volunteers showed exemplary solidarity during summer forest fires.',
				topicOneNotes: [
					'Headline + Context: extreme summer heatwaves triggered forest fires in mountain areas',
					'Solidarity response: civil protection officers fought flames while citizens sent water, medicine, and meals',
					'Concession: although conditions were harsh, volunteers never hesitated to help displaced families',
					'Reported statement: local mayor declared that unity had saved lives and protected dignity',
					'Moral message: encourage charity, forest protection, and brotherhood'
				],
				topicTwoPrompt:
					'Write a paragraph (80 to 120 words) explaining why volunteering in charity clubs and learning first aid are valuable experiences for secondary school students.',
				modelAnswer:
					'Algerian Solidarity Shines During Summer Wildfires\nLast August, severe heatwaves and strong winds triggered dangerous wildfires in several northern mountain regions. While brave civil protection officers battled the flames around the clock, Algerian citizens across the country launched an extraordinary wave of solidarity. Youth associations and neighbours quickly gathered bottled water, first-aid medicine, blankets, and hot meals for firefighters and displaced families. Although the heat and smoke made conditions extremely harsh, volunteers reached the affected villages without hesitation. A local mayor declared that this rapid unity had saved many lives and preserved everyone\'s dignity. Such inspiring charity reminds young Algerians to protect our forests and always stand beside neighbours in times of need.',
				rubricSummary: 'Article format & relevance (1.5) | Grammar (Reported speech, concession, past tenses) (1.5) | Coherence & linkers (1.0) | Mechanics & presentation (1.0).',
				quizStem: 'When writing a newspaper article about a past wildfire relief effort, which tense should dominate the narrative body?',
				quizCorrect: 'Past Simple (supported by Past Perfect in reported speech where needed)',
				quizDistractors: [
					{
						text: 'Future Simple throughout the entire article',
						diagnosticFeedback: 'A report on a completed past event uses past tenses.'
					},
					{
						text: 'Imperative verbs only in every sentence',
						diagnosticFeedback: 'Imperatives fit safety instructions, not a factual report on past relief actions.'
					},
					{
						text: 'Conditional Type 2 in every sentence',
						diagnosticFeedback: 'Conditional Type 2 describes imaginary situations, not real events.'
					}
				],
				quizExplanation: 'سرد حدث تضامني وقع في الماضي يعتمد أساسا على الماضي البسيط (Past Simple) مع الماضي التام داخل الكلام المنقول.'
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
			trimesterId: 't3',
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
				instruction: 'Choose ONE of the following topics and write a well-structured report or article (80 to 120 words).',
				content
			},
			hints: [
				'ابدأ بعنوان موجز وجذاب (Headline) ثم فقرة تمهيدية تجيب عن What / When / Where.',
				'وظف تراكيب الوحدة الرابعة: الكلام المنقول (stated that...) والاستدراك (Despite / Although).',
				'اختم برسالة تضامنية واضحة وراجع الأزمنة والإملاء.'
			],
			solutionStepsAr: [
				'اختيار أحد الموضوعين وضبط هيكل التقرير أو المقال.',
				'تحويل الملاحظات إلى فقرات متماسكة بالماضي البسيط والروابط.',
				'مراجعة القواعد وعلامات الترقيم ومطابقة سلم التنقيط (5 نقاط).'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_2AS_SCI_T3: EnglishParameterizedTemplate[] = [
	tpl2asSciT3CompNaturalDisastersRelief,
	tpl2asSciT3CompCharitySolidarity,
	tpl2asSciT3ExpReportedSpeech,
	tpl2asSciT3ExpConcessionPhonology,
	tpl2asSciT3WrittenSolidarityReport
];
