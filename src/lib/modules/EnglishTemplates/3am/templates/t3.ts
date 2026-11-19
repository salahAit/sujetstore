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
// 1. Reading Comprehension (7 pts) — Protecting Algeria's Nature & Biodiversity
// ═══════════════════════════════════════════════════════════════════════════════
const compAlgerianEnvironment3amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t3_comp_algerian_environment',
	grade: '3am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم النص (3AM): حماية البيئة والحياة البرية الجزائرية (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t3_imperative_nature_algeria',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'Protecting Chrea National Park and Algeria Wildlife',
				paragraphs: [
					'Algeria is blessed with rich natural beauty, from the Mediterranean coast to the Atlas Mountains and the vast Sahara. One of its most famous reserves is Chrea National Park near Blida, where ancient Atlas cedar forests shelter rare birds and wild animals.',
					'Unfortunately, nature faces serious dangers today. Forest fires, illegal hunting, and plastic rubbish threaten many species such as the Barbary stag and the fennec fox. Because people sometimes leave litter in parks, [[they]] pollute the soil and harm wildlife.',
					'Therefore, every citizen must act responsibly. We should plant more trees, recycle waste, and keep national parks spotless. Remember: protect our forests today so future generations can enjoy a green Algeria!'
				],
				source: 'Adapted from Algerian Environmental Awareness Text',
				refWord: 'they',
				refAnswer: 'people (who leave litter in parks)',
				q1: 'Where is Chrea National Park located and what grows there?',
				a1: 'It is located near Blida, and ancient Atlas cedar forests grow there.',
				q2: 'Mention two dangers that threaten Algerian wildlife according to paragraph 2.',
				a2: 'Forest fires, illegal hunting, and plastic rubbish (any two).',
				tf1Q: 'Algeria has only desert landscapes and no mountains.',
				tf1A: 'False',
				tf1C: 'Algeria has Mediterranean coasts, Atlas Mountains, and the Sahara.',
				tf2Q: 'The Barbary stag and the fennec fox are threatened by pollution and hunting.',
				tf2A: 'True',
				tf3Q: 'Planting trees and recycling waste help protect national parks.',
				tf3A: 'True',
				synTarget: 'very clean (paragraph 3)',
				synAns: 'spotless',
				oppTarget: 'legal (paragraph 2)',
				oppAns: 'illegal',
				mcqCorrect: 'Algerian nature and wildlife face pollution and fires, so citizens must protect parks and plant trees.',
				mcqWrong1: 'Chrea National Park is located in the middle of the Sahara desert.',
				mcqWrong2: 'Leaving plastic waste in forests helps wild animals grow faster.',
				mcqWrong3: 'Citizens do not have any responsibility to protect wildlife.'
			},
			{
				title: 'Tassili n-Ajjer and El Kala: Treasures to Save',
				paragraphs: [
					'Algeria owns remarkable natural sites recognized worldwide. In the north-east, El Kala National Park protects lakes, wetlands, and migratory birds. In the deep south, Tassili n-Ajjer is a majestic Saharan plateau home to ancient cypress trees and rare desert animals.',
					'However, climate change, drought, and careless visitors put these fragile ecosystems at risk. Water is scarce in desert zones; therefore, visitors must not waste [[it]] or disturb wild habitats.',
					'Our Islamic values teach us to care for the Earth and avoid wastefulness. Young Algerians should join school eco-clubs, save water every day, and spread eco-friendly habits in their neighbourhoods.'
				],
				source: 'Adapted from Algerian Environmental Awareness Text',
				refWord: 'it',
				refAnswer: 'Water',
				q1: 'What does El Kala National Park protect in the north-east of Algeria?',
				a1: 'It protects lakes, wetlands, and migratory birds.',
				q2: 'What should young Algerians do to help the environment?',
				a2: 'They should join school eco-clubs, save water every day, and spread eco-friendly habits.',
				tf1Q: 'Tassili n-Ajjer is located in the deep south of Algeria.',
				tf1A: 'True',
				tf2Q: 'Water is abundant and unlimited in desert zones.',
				tf2A: 'False',
				tf2C: 'Water is scarce in desert zones.',
				tf3Q: 'Islamic values encourage caring for the Earth and avoiding wastefulness.',
				tf3A: 'True',
				synTarget: 'rare / limited (paragraph 2)',
				synAns: 'scarce',
				oppTarget: 'careful (paragraph 2)',
				oppAns: 'careless',
				mcqCorrect: 'El Kala and Tassili n-Ajjer are precious Algerian ecosystems that citizens must protect by saving water and acting responsibly.',
				mcqWrong1: 'El Kala is a Saharan plateau with no lakes or birds.',
				mcqWrong2: 'Visitors should waste water and disturb desert habitats.',
				mcqWrong3: 'Young pupils cannot participate in protecting the environment.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'راجع الموقع الجغرافي للحظائر المذكورة في الفقرة الأولى.' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'النص يدعو بوضوح إلى تجنّب التبذير والتلوث.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'النص يؤكد واجب كل مواطن وتلميذ في حماية البيئة.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". What is the main message of the text?`,
				questionTextAr: `اقرأ نص "${variant.title}" واختر الرسالة الأساسية للنص:`,
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
				instruction: 'Read the eco-article carefully and answer the questions:',
				content: [
					buildEnglishPassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						source: variant.source,
						numberedParagraphs: true
					}),
					{
						type: 'text',
						content: `Task 1: Answer the questions according to the text (02 pts):\n  a) ${variant.q1}\n  b) ${variant.q2}`,
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
						content: `Task 3: What does the underlined word "${variant.refWord}" in paragraph 2 refer to? (01 pt)`,
						answer: `"${variant.refWord}" refers to: ${variant.refAnswer}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `Task 4 (Lexis): Find in the text (01 pt):\n  a) Closest in meaning to: ${variant.synTarget} = ......\n  b) Opposite in meaning to: ${variant.oppTarget} = ......`,
						answer: `a) ${variant.synAns}\nb) ${variant.oppAns}`,
						mark: '1'
					}
				]
			},
			hints: [
				'استخرج أسماء المحميات والحيوانات المهددة من الفقرتين الأولى والثانية.',
				'تذكّر تصحيح الجملة الخاطئة (False) من النص.',
				'ابحث عن المرادف والضد داخل الفقرة المحددة فقط.'
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
// 2. Mastery of Language (7 pts) — Modals, Cause/Effect & Silent Letters
// ═══════════════════════════════════════════════════════════════════════════════
const langModalsConnectors3amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t3_lang_modals_connectors',
	grade: '3am',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة (3AM): must / must not / should، السبب والنتيجة، والحروف الصامتة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t3_obligation_prohibition',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const set = rng.pick([
			{
				m1Q: 'a) Citizens ...... (must / must not) throw plastic bottles into rivers.',
				m1A: 'a) Citizens must not throw plastic bottles into rivers.',
				m2Q: 'b) We ...... (must / cannot) protect endangered species in Algeria.',
				m2A: 'b) We must protect endangered species in Algeria.',
				m3Q: 'c) Pupils ...... (should / should not) join school tree-planting campaigns.',
				m3A: 'c) Pupils should join school tree-planting campaigns.',
				ce1Q: 'a) Factories release black smoke. The city air is polluted. (Combine with "therefore")',
				ce1A: 'a) Factories release black smoke; therefore, the city air is polluted.',
				ce2Q: 'b) We must save water. Water is essential for all living things. (Combine with "because")',
				ce2A: 'b) We must save water because water is essential for all living things.',
				silentWords: ['know', 'write', 'honest', 'listen', 'knife', 'wrong'],
				col1: { header: 'Silent k', words: ['know', 'knife'] },
				col2: { header: 'Silent w', words: ['write', 'wrong'] },
				col3: { header: 'Silent h / t', words: ['honest', 'listen'] },
				mcqCorrect: 'Forests produce oxygen; therefore, we must protect them.',
				mcqD1: 'Forests produce oxygen; because, we must protect them.',
				mcqD2: 'Because forests produce oxygen, so we must protect them.',
				mcqD3: 'We must to protect forests because they produce oxygen.'
			},
			{
				m1Q: 'a) Visitors ...... (must / must not) light fires in dry cedar forests.',
				m1A: 'a) Visitors must not light fires in dry cedar forests.',
				m2Q: 'b) Families ...... (should / must not) reuse cloth shopping bags.',
				m2A: 'b) Families should reuse cloth shopping bags.',
				m3Q: 'c) Everyone ...... (must / should not) keep the neighbourhood clean.',
				m3A: 'c) Everyone must keep the neighbourhood clean.',
				ce1Q: 'a) Plastic harms sea turtles. Volunteers clean the beaches every summer. (Combine with "so")',
				ce1A: 'a) Plastic harms sea turtles, so volunteers clean the beaches every summer.',
				ce2Q: 'b) The fennec fox is rare. Algeria protects its desert habitat. (Combine with "As")',
				ce2A: 'b) As the fennec fox is rare, Algeria protects its desert habitat.',
				silentWords: ['knowledge', 'answer', 'hour', 'castle', 'walk', 'should'],
				col1: { header: 'Silent k / w', words: ['knowledge', 'answer'] },
				col2: { header: 'Silent h / t', words: ['hour', 'castle'] },
				col3: { header: 'Silent l', words: ['walk', 'should'] },
				mcqCorrect: 'Visitors must not hunt rare animals in national parks.',
				mcqD1: 'Visitors must not to hunt rare animals in national parks.',
				mcqD2: 'Visitors must not hunts rare animals in national parks.',
				mcqD3: 'Visitors must hunting rare animals in national parks.'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			set.mcqCorrect,
			[
				{ text: set.mcqD1, diagnosticFeedback: 'لا نضع to بعد must/must not ولا نضع because مكان therefore.' },
				{ text: set.mcqD2, diagnosticFeedback: 'لا نجمع بين because و so، ولا نضيف -s بعد must not.' },
				{ text: set.mcqD3, diagnosticFeedback: 'بعد must يأتي أصل الفعل مجرداً تماماً.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'Choose the correct eco-sentence:',
				questionTextAr: 'اختر الجملة البيئية السليمة نحوياً:',
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
				instruction: 'Complete the following grammar and silent-letters exercises:',
				content: [
					{
						type: 'text',
						content: `Task 1: Choose the right modal verb (03 pts):\n  ${set.m1Q}\n  ${set.m2Q}\n  ${set.m3Q}`,
						answer: `${set.m1A}\n${set.m2A}\n${set.m3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Task 2: Combine the pairs of sentences using the connector in brackets (02 pts):\n  ${set.ce1Q}\n  ${set.ce2Q}`,
						answer: `${set.ce1A}\n${set.ce2A}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `Task 3: Classify the words according to their silent letter (02 pts):\nWords: ${set.silentWords.join(' - ')}`
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: set.col1.header, words: set.col1.words, mark: '0.5' },
							{ header: set.col2.header, words: set.col2.words, mark: '0.75' },
							{ header: set.col3.header, words: set.col3.words, mark: '0.75' }
						]
					})
				]
			},
			hints: [
				'must للوجوب، must not للمنع، و should للنصيحة.',
				'because و as تسبقان السبب؛ أما so و therefore فتسبقان النتيجة.',
				'تذكّر الحروف الصامتة: kn-, wr-, hour/honest, listen/castle, walk/should.'
			],
			solutionStepsAr: [
				`${set.m1A} | ${set.m2A} | ${set.m3A}`,
				`${set.ce1A} | ${set.ce2A}`,
				`${set.col1.header}: ${set.col1.words.join(', ')} | ${set.col2.header}: ${set.col2.words.join(', ')} | ${set.col3.header}: ${set.col3.words.join(', ')}`
			],
			finalAnswer: set.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Mastery of Language (7 pts) — Eco-Imperatives, Cause/Effect & Silent Letters
// ═══════════════════════════════════════════════════════════════════════════════
const langImperativeSilent3amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t3_lang_imperative_silent',
	grade: '3am',
	trimesterId: 't3',
	domain: 'phonology_pronunciation',
	titleAr: 'قواعد اللغة (3AM): صيغة الأمر البيئية، السبب والنتيجة، والحروف الصامتة (7 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t3_silent_letters_eco_article',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				imp1Q: 'a) You must turn off the water tap after washing. (Rewrite in the Imperative)',
				imp1A: 'a) Turn off the water tap after washing.',
				imp2Q: 'b) You must not cut down healthy cedar trees. (Rewrite in the Negative Imperative)',
				imp2A: 'b) Do not cut down healthy cedar trees.',
				imp3Q: 'c) You should put paper and plastic in separate bins. (Rewrite in the Imperative)',
				imp3A: 'c) Put paper and plastic in separate bins.',
				spotQ: 'Spot and correct TWO mistakes: "Not drop rubbish in the park because it pollute the soil."',
				spotA: 'Do not drop rubbish in the park because it pollutes the soil.',
				words: ['knee', 'wrap', 'calm', 'fasten', 'talk', 'whistle'],
				c1: { header: 'Silent k / w', words: ['knee', 'wrap'] },
				c2: { header: 'Silent l', words: ['calm', 'talk'] },
				c3: { header: 'Silent t', words: ['fasten', 'whistle'] },
				mcqQ: 'Which word contains a silent "l"?',
				mcqCorrect: 'calm',
				mcqD1: 'clean',
				mcqD2: 'plant',
				mcqD3: 'lake'
			},
			{
				imp1Q: 'a) You must keep the schoolyard clean every day. (Rewrite in the Imperative)',
				imp1A: 'a) Keep the schoolyard clean every day.',
				imp2Q: 'b) You must not disturb nesting birds in El Kala. (Rewrite in the Negative Imperative)',
				imp2A: 'b) Do not disturb nesting birds in El Kala.',
				imp3Q: 'c) You should switch off unused lights at home. (Rewrite in the Imperative)',
				imp3A: 'c) Switch off unused lights at home.',
				spotQ: 'Spot and correct TWO mistakes: "Planting more trees, so our town become greener."',
				spotA: 'Plant more trees, so our town becomes greener.',
				words: ['knock', 'wrist', 'half', 'soften', 'palm', 'castle'],
				c1: { header: 'Silent k / w', words: ['knock', 'wrist'] },
				c2: { header: 'Silent l', words: ['half', 'palm'] },
				c3: { header: 'Silent t', words: ['soften', 'castle'] },
				mcqQ: 'Which word contains a silent "t"?',
				mcqCorrect: 'castle',
				mcqD1: 'forest',
				mcqD2: 'water',
				mcqD3: 'tree'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqD1, diagnosticFeedback: 'الحرف المطلوب منطوق بوضوح في هذه الكلمة.' },
				{ text: variant.mcqD2, diagnosticFeedback: 'انطق الكلمة بهدوء لتلاحظ أن جميع حروفها منطوقة.' },
				{ text: variant.mcqD3, diagnosticFeedback: 'هذه الكلمة لا تحتوي على الحرف الصامت المطلوب.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الكلمة التي تحتوي على الحرف الصامت المطلوب:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الكلمة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'Part One: Mastery of Language (07 pts)',
				points: 7,
				instruction: 'Do the following tasks carefully:',
				content: [
					{
						type: 'text',
						content: `Task 1: Rewrite the following sentences in the Imperative form (03 pts):\n  ${variant.imp1Q}\n  ${variant.imp2Q}\n  ${variant.imp3Q}`,
						answer: `${variant.imp1A}\n${variant.imp2A}\n${variant.imp3A}`,
						mark: '3'
					},
					{
						type: 'text',
						content: `Task 2: ${variant.spotQ} (02 pts)`,
						answer: variant.spotA,
						mark: '2'
					},
					{
						type: 'text',
						content: `Task 3: Classify these words according to their silent letter (02 pts):\nWords: ${variant.words.join(' - ')}`
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
				'لتحويل (You must + stem) إلى أمر نحذف (You must) ونبدأ بالفعل المجرد بحرف كبير.',
				'لتحويل (You must not + stem) إلى نهي نبدأ بـ (Do not + stem).',
				'الحرف l صامت في calm, talk, half, palm؛ والحرف t صامت في listen, castle, fasten, whistle.'
			],
			solutionStepsAr: [
				`${variant.imp1A} | ${variant.imp2A} | ${variant.imp3A}`,
				variant.spotA,
				`${variant.c1.header}: ${variant.c1.words.join(', ')} | ${variant.c2.header}: ${variant.c2.words.join(', ')} | ${variant.c3.header}: ${variant.c3.words.join(', ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Written Expression (6 pts) — Guided Eco-Article for Algeria's Environment
// ═══════════════════════════════════════════════════════════════════════════════
const writeEcoArticle3amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_3am_t3_write_eco_article',
	grade: '3am',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية (3AM): كتابة مقال بيئي لحماية الطبيعة والحيوانات الجزائرية (6 نقاط)',
	curriculumLessonId: 'eng_lesson_3am_t3_silent_letters_eco_article',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				title: 'Keep Our School and Forests Green',
				problem: 'plastic litter, wasted water, and forest fires in Algeria',
				cause: 'some people throw rubbish everywhere and forget to save water',
				solutions: 'plant cedar and olive trees, recycle paper and plastic, turn off taps, never light fires in forests'
			},
			{
				title: 'Save Algeria Endangered Wildlife',
				problem: 'the Barbary stag and the fennec fox are in danger',
				cause: 'illegal hunting and habitat destruction threaten their homes',
				solutions: 'respect national parks like Chrea and El Kala, stop illegal hunting, keep nature spotless, educate young people'
			}
		]);

		const modelAnswer = `${topic.title}. Today, our Algerian environment faces serious challenges because ${topic.cause}. As a result, ${topic.problem}. Protecting the Earth is an Islamic and civic duty; therefore, every pupil must act responsibly. First, we should ${topic.solutions}. Second, we must not pollute beaches, rivers, or parks. Plant a tree, save water, and do not throw litter in the street! Together, we can keep Algeria clean and green for future generations.`;

		const mcq = buildUniqueMcqOptions(
			'State the eco-problem, explain causes and effects with because/therefore, and give clear solutions using must/must not/should and Imperatives.',
			[
				{ text: 'Write only about past school holidays without mentioning the environment.', diagnosticFeedback: 'الخروج عن الموضوع يضيّع علامة الملاءمة (Relevance).' },
				{ text: 'Use only questions without giving any practical solutions.', diagnosticFeedback: 'المقال البيئي يجب أن يقدم حلولاً واضحة باستعمال must و should والأمر.' },
				{ text: 'Avoid connectors and write disconnected words.', diagnosticFeedback: 'التماسك (Coherence) يتطلب أدوات ربط مثل because و therefore و First.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: 'How do you earn top marks on a 3MS Guided Eco-Article (6 pts)?',
				questionTextAr: 'كيف تضمن العلامة الممتازة في المقال البيئي للسنة الثالثة متوسط (6 نقاط)؟',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'بذكر المشكلة البيئية، وربط الأسباب والنتائج بـ because/therefore، وتقديم حلول عملية بـ must/must not/should وصيغة الأمر.'
			},
			sujetExercise: {
				customTitle: 'Part Two: Situation of Integration (06 pts)',
				points: 6,
				instruction: 'Write a short, inspiring eco-article for your school wall magazine (8 to 10 lines):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: `Write a short eco-article titled "${topic.title}" to advise your classmates on protecting Algeria environment.`,
						topicOneNotes: [
							`Problem: ${topic.problem}`,
							`Cause (because / as): ${topic.cause}`,
							`Solutions (must / must not / should): ${topic.solutions}`,
							'Closing call (Imperative): Plant trees, save water, do not throw litter!'
						],
						topicTwoPrompt:
							'Write an Eco-Charter of 6 rules for your school eco-club using "must", "must not", "should", and Imperative sentences.',
						modelAnswer,
						rubricSummary:
							'Relevance (2 pts) + Coherence & Connectors (1.5 pts) + Modals & Imperatives Accuracy (1.5 pts) + Mechanics & Clean Presentation (1 pt).',
						mark: '6'
					})
				]
			},
			hints: [
				'ضع عنواناً واضحاً للمقال البيئي في السطر الأول.',
				'استعمل أداة سبب (because) وأداة نتيجة (therefore / as a result).',
				'نوّع بين (must / must not / should) وجمل الأمر في الخاتمة.'
			],
			solutionStepsAr: [
				`العنوان والمشكلة: ${topic.title} — ${topic.problem}.`,
				`السبب والنتيجة: because ${topic.cause}.`,
				`الحلول والخاتمة: توظيف must/should/must not وصيغة الأمر.`
			],
			finalAnswer: modelAnswer
		};
	}
};

export const TEMPLATES_3AM_T3: EnglishParameterizedTemplate[] = [
	compAlgerianEnvironment3amT3,
	langModalsConnectors3amT3,
	langImperativeSilent3amT3,
	writeEcoArticle3amT3
];
