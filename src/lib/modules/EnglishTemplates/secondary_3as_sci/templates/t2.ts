import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T2
// Unit 2: Safety First (Advertising, Consumers & Food Safety)
// 5 BAC Templates: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T2: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (8 pts) — Junk Food & Reading Food Labels
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t2_comp_fast_food',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): الوجبات السريعة والتغذية المتوازنة وقراءة ملصقات الغذاء',
		curriculumLessonId: 'eng_lesson_3as_sci_t2_cause_effect_safety',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Fast Food Habits and Student Health',
					source: 'Adapted from Public Nutrition Digest',
					paragraphs: [
						'Modern urban lifestyles have changed eating habits rapidly, especially among young people. Because busy schedules leave little time for cooking, many students rely daily on burgers, fried snacks, and sugary sodas. Although [[they]] taste appealing and save time, these processed meals rarely provide the vitamins and fibres that growing bodies need.',
						'Health specialists warn that consuming excessive saturated fat, refined sugar, and salt leads directly to weight gain, fatigue, and poor concentration in class. In the long run, an unbalanced diet increases the risk of high blood pressure and diabetes. Even thin teenagers can suffer from weak immunity if [[their]] meals lack wholesome nutrients.',
						'Fortunately, improving daily nutrition does not require expensive diets. Preparing simple home-cooked meals with seasonal vegetables, olive oil, whole grains, and fresh fruit protects health effectively. Schools and families can encourage [[it]] by offering nutritious snacks and teaching youth to drink water instead of fizzy drinks.'
					],
					glossary: [
						{ term: 'wholesome', meaning: 'good for physical health and natural' },
						{ term: 'fatigue', meaning: 'extreme tiredness and lack of energy' }
					],
					tfItems: [
						{ q: 'Busy daily schedules push many students toward processed fast food.', a: 'True', mark: '0.5' },
						{ q: 'Fast food meals are rich in essential vitamins and natural fibres.', a: 'False', c: 'They rarely provide the vitamins and fibres that growing bodies need.', mark: '0.5' },
						{ q: 'Thin teenagers are completely immune to the harms of poor nutrition.', a: 'False', c: 'Even thin teenagers can suffer from weak immunity if their meals lack nutrients.', mark: '0.5' },
						{ q: 'Simple home-cooked meals with seasonal produce are an effective healthy choice.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) unbalanced diets reduce classroom focus and raise chronic disease risks?\nb) water and seasonal home-cooked food can replace fizzy drinks and snacks?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) Why do many students rely on fast food and sugary sodas?\nb) Name three health risks linked to excessive fat, sugar, and salt.\nc) How can schools and families promote healthier eating among youth?',
					whA: 'a) Because busy schedules leave little time for cooking, and fast food saves time and tastes appealing.\nb) Weight gain, fatigue, poor concentration, high blood pressure, diabetes, and weak immunity (any three).\nc) By offering nutritious snacks and teaching youth to drink water instead of fizzy drinks.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) they (§1)   b) their (§2)   c) it (§3)',
					refA: 'a) they: burgers, fried snacks, and sugary sodas (fast food meals) | b) their: thin teenagers | c) it: improving daily nutrition (healthy eating)',
					easyQ: 'According to "Fast Food Habits and Student Health", what does excessive fat, sugar, and salt cause in the classroom?',
					easyCorrect: 'Fatigue and poor concentration',
					easyDistractors: [
						{ text: 'Higher immunity and sharper focus', diagnosticFeedback: 'النص يبين العكس تماما: التعب وضعف التركيز.' },
						{ text: 'More free time for cooking at home', diagnosticFeedback: 'قلة الوقت هي السبب في اللجوء للأكل السريع وليست النتيجة.' },
						{ text: 'Lower prices for seasonal vegetables', diagnosticFeedback: 'لم يذكر النص هذا الأثر.' }
					],
					medQ: 'In paragraph 2, what does the possessive adjective "their" refer to?',
					medCorrect: 'thin teenagers',
					medDistractors: [
						{ text: 'health specialists', diagnosticFeedback: 'الجملة تتحدث عن المراهقين النحيفين.' },
						{ text: 'home-cooked meals', diagnosticFeedback: 'الوجبات المنزلية وردت في الفقرة الثالثة.' },
						{ text: 'fizzy drinks', diagnosticFeedback: 'المشروبات الغازية وردت في الفقرة الثالثة.' }
					],
					hardQ: 'What misconception does paragraph 2 correct?',
					hardCorrect: 'The idea that being thin protects teenagers from the harm of an unbalanced diet',
					hardDistractors: [
						{ text: 'The idea that vegetables contain vitamins', diagnosticFeedback: 'الخضر فعلا غنية بالفيتامينات في الفقرة الثالثة.' },
						{ text: 'The idea that drinking water is healthy', diagnosticFeedback: 'شرب الماء مستحسن في الفقرة الثالثة.' },
						{ text: 'The idea that fast food saves cooking time', diagnosticFeedback: 'الفقرة الأولى أقرت بأن الأكل السريع يوفر الوقت لكنه يضر الصحة.' }
					]
				},
				{
					title: 'Why Reading Food Labels Matters',
					source: 'Adapted from Consumer Protection Guide',
					paragraphs: [
						'Walking through a supermarket aisle, shoppers are surrounded by colourful packages promising natural flavours and instant energy. However, front-of-pack slogans often hide high amounts of added sugar, palm oil, and artificial preservatives. Careful buyers turn the package around to read the nutrition table because [[it]] reveals the real ingredients inside.',
						'Checking the expiry date and storage instructions is equally vital for preventing food poisoning. Dairy items, canned meats, and chilled juices spoil quickly if shops fail to keep [[them]] at safe temperatures. Furthermore, allergy notices help sensitive consumers avoid nuts, gluten, or chemical dyes that could trigger dangerous reactions.',
						'Food safety begins with informed daily choices. When families compare ingredient lists and choose products with fewer chemical additives, manufacturers feel pressure to improve food quality. A few seconds spent reading a label can protect [[your]] health for years to come.'
					],
					glossary: [
						{ term: 'preservatives', meaning: 'substances added to food to stop decay' },
						{ term: 'trigger', meaning: 'cause a reaction to start suddenly' }
					],
					tfItems: [
						{ q: 'Front-of-pack slogans always reveal every hidden additive clearly.', a: 'False', c: 'They often hide high amounts of added sugar, palm oil, and artificial preservatives.', mark: '0.5' },
						{ q: 'Proper storage temperatures help prevent dairy and juice from spoiling.', a: 'True', mark: '0.5' },
						{ q: 'Allergy warnings on labels are useful for sensitive shoppers.', a: 'True', mark: '0.5' },
						{ q: 'Consumer buying choices have no influence on food manufacturers.', a: 'False', c: 'Choosing cleaner products pressures manufacturers to improve food quality.', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) expiry dates and allergy notices prevent poisoning and severe reactions?\nb) informed shoppers push companies to produce cleaner food?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) Why should shoppers turn packages around instead of trusting front slogans?\nb) Mention two pieces of safety information highlighted in paragraph 2.\nc) What happens when families prefer products with fewer chemical additives?',
					whA: 'a) Because front slogans often hide added sugar, palm oil, and artificial preservatives, whereas the nutrition table reveals the real ingredients.\nb) Expiry dates, storage instructions, and allergy notices (any two).\nc) Manufacturers feel pressure to improve food quality.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) it (§1)   b) them (§2)   c) your (§3)',
					refA: 'a) it: the nutrition table | b) them: dairy items, canned meats, and chilled juices | c) your: the reader / consumer',
					easyQ: 'According to "Why Reading Food Labels Matters", what does the back nutrition table reveal?',
					easyCorrect: 'The real ingredients inside the package',
					easyDistractors: [
						{ text: 'Only the supermarket discount price', diagnosticFeedback: 'جدول التغذية يوضح المكونات الحقيقية للمنتج.' },
						{ text: 'Television advertising schedules', diagnosticFeedback: 'لا علاقة للجدول ببرامج الإشهار.' },
						{ text: 'The biography of the shop owner', diagnosticFeedback: 'معلومة غير موجودة في النص.' }
					],
					medQ: 'In paragraph 2, what does the pronoun "them" refer to?',
					medCorrect: 'dairy items, canned meats, and chilled juices',
					medDistractors: [
						{ text: 'supermarket aisles', diagnosticFeedback: 'الضمير يعود على المنتجات سريعة التلف في نفس الجملة.' },
						{ text: 'sensitive consumers', diagnosticFeedback: 'المستهلكون وردوا في الجملة اللاحقة.' },
						{ text: 'colourful packages', diagnosticFeedback: 'العبوات الملونة وردت في الفقرة الأولى.' }
					],
					hardQ: 'How can ordinary consumers encourage food companies to raise product quality according to paragraph 3?',
					hardCorrect: 'By comparing ingredient lists and choosing products with fewer chemical additives',
					hardDistractors: [
						{ text: 'By ignoring nutrition tables to save shopping time', diagnosticFeedback: 'النص يدعو لقراءة الملصقات بعناية.' },
						{ text: 'By buying only products with colourful front slogans', diagnosticFeedback: 'الشعارات الأمامية قد تخفي إضافات ضارة.' },
						{ text: 'By storing dairy products at warm room temperature', diagnosticFeedback: 'التخزين في حرارة غير آمنة يفسد الأغذية.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Correct answer: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part One: A/ Reading Comprehension',
				points: 8,
				instruction: 'Read the text carefully then do the following activities.',
				content: [
					buildEnglishPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Say whether the following statements are True or False (correct the false ones):' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.paraMatchQ, answer: v.paraMatchA, mark: '1.5' },
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '3' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Locate cause-and-effect sentences in paragraph 2 to answer health impact questions.',
					'Watch for absolute words like completely, always, or no influence in True/False items.',
					'Check the noun phrase right before each underlined pronoun for exact reference.'
				],
				solutionStepsAr: [
					`True/False: ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.paraMatchA,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (8 pts) — Advertising & Consumer Awareness
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t2_comp_advertising',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): الإشهار المضلل وحماية المستهلك والوعي الاستهلاكي',
		curriculumLessonId: 'eng_lesson_3as_sci_t2_concession_contrast',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'How Advertising Shapes Consumer Choices',
					source: 'Adapted from Media Literacy Bulletin',
					paragraphs: [
						'Every day, billboards, television spots, and smartphone banners compete for consumer attention. Advertising can be useful when [[it]] informs families about genuine innovations, fair discounts, or local services. Without accurate product information, shoppers would find it harder to compare prices and quality.',
						'Nevertheless, aggressive marketing frequently crosses ethical lines. Some commercials exaggerate benefits, create artificial urgency, or target young viewers with colourful cartoons to sell high-sugar snacks. Despite knowing that ads aim to boost sales, many people still buy items [[they]] do not truly need.',
						'Developing critical thinking is the smartest defence against misleading campaigns. Before purchasing an advertised item, wise consumers pause to distinguish real needs from passing desires, compare independent reviews, and verify guarantees. Consumer associations also help by exposing false claims and protecting [[citizens]] from unfair marketing.'
					],
					glossary: [
						{ term: 'exaggerate', meaning: 'describe something as much better than it really is' },
						{ term: 'urgency', meaning: 'pressure to act immediately without thinking' }
					],
					tfItems: [
						{ q: 'All forms of advertising are completely useless to shoppers.', a: 'False', c: 'Advertising can be useful when it informs families about genuine innovations and fair prices.', mark: '0.5' },
						{ q: 'Some commercials target children to promote high-sugar snacks.', a: 'True', mark: '0.5' },
						{ q: 'Knowing how ads work automatically stops everyone from unnecessary buying.', a: 'False', c: 'Despite knowing that ads aim to boost sales, many people still buy unneeded items.', mark: '0.5' },
						{ q: 'Consumer associations play a role in exposing misleading advertisements.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) aggressive commercials exaggerate benefits and target young viewers?\nb) comparing independent reviews and pausing before buying protect shoppers?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) When can advertising be helpful to families?\nb) Mention two unethical tactics used by aggressive marketing.\nc) What three steps should wise consumers take before purchasing an advertised product?',
					whA: 'a) When it informs families about genuine innovations, fair discounts, or local services.\nb) Exaggerating benefits, creating artificial urgency, and targeting young viewers with cartoons to sell sugary snacks (any two).\nc) Pause to distinguish real needs from desires, compare independent reviews, and verify guarantees.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) it (§1)   b) they (§2)   c) citizens (§3)',
					refA: 'a) it: advertising | b) they: many people (consumers) | c) citizens: ordinary shoppers / consumers',
					easyQ: 'According to "How Advertising Shapes Consumer Choices", when is advertising useful?',
					easyCorrect: 'When it provides accurate information about real innovations, prices, or services',
					easyDistractors: [
						{ text: 'When it creates artificial urgency', diagnosticFeedback: 'خلق الاستعجال المصطنع من الأساليب المضللة في الفقرة الثانية.' },
						{ text: 'When it exaggerates product benefits', diagnosticFeedback: 'المبالغة في الفوائد ممارسة غير أخلاقية.' },
						{ text: 'When it pushes shoppers to buy unneeded items', diagnosticFeedback: 'النص يحذر من الشراء غير الضروري.' }
					],
					medQ: 'In paragraph 1, what does the pronoun "it" refer to?',
					medCorrect: 'advertising',
					medDistractors: [
						{ text: 'smartphone banners', diagnosticFeedback: 'banners جمع ولا يعوضها الضمير المفرد it.' },
						{ text: 'fair discounts', diagnosticFeedback: 'discounts جمع وليست الفاعل المقصود.' },
						{ text: 'critical thinking', diagnosticFeedback: 'التفكير النقدي ورد في الفقرة الثالثة.' }
					],
					hardQ: 'What is the tone of the author toward advertising in this passage?',
					hardCorrect: 'Balanced and critical: acknowledging useful information while warning against manipulation',
					hardDistractors: [
						{ text: 'Blindly praising every commercial without exception', diagnosticFeedback: 'الفقرة الثانية تنتقد الإشهار المضلل بوضوح.' },
						{ text: 'Demanding the total ban of all price information', diagnosticFeedback: 'الفقرة الأولى تبرز فائدة المعلومات الدقيقة.' },
						{ text: 'Indifferent to consumer rights', diagnosticFeedback: 'الفقرة الثالثة تدعو لحماية المستهلك والتفكير النقدي.' }
					]
				},
				{
					title: 'Consumer Protection Associations in Action',
					source: 'Adapted from Civic Awareness Magazine',
					paragraphs: [
						'Modern markets offer thousands of goods ranging from processed foods to electronic devices, making safety verification difficult for an individual buyer. Consumer protection associations bridge this gap by testing sample products in independent laboratories and alerting the public whenever [[they]] detect health hazards.',
						'In addition to laboratory testing, these organizations educate citizens about their legal rights. Buyers have the right to truthful pricing, clear warranty documents, and safe refunds when an item turns out to be defective. Whenever a company ignores customer complaints, an active association can report [[the violation]] to regulatory authorities.',
						'Strong consumer awareness creates a healthier marketplace for honest businesses too. Firms that respect safety standards and honest advertising gain loyal customers without relying on tricks. Ultimately, consumer safety is a shared responsibility between regulators, ethical producers, and informed [[buyers]].'
					],
					glossary: [
						{ term: 'hazards', meaning: 'dangers or risks to health and safety' },
						{ term: 'refunds', meaning: 'money returned to a buyer for a faulty item' }
					],
					tfItems: [
						{ q: 'Individual shoppers can easily test every modern product in a home lab.', a: 'False', c: 'Safety verification is difficult for an individual buyer, so associations test samples in independent labs.', mark: '0.5' },
						{ q: 'Buyers have the right to clear warranties and fair refunds for defective goods.', a: 'True', mark: '0.5' },
						{ q: 'Consumer associations cannot report violations to regulatory authorities.', a: 'False', c: 'An active association can report the violation to regulatory authorities.', mark: '0.5' },
						{ q: 'Honest businesses also benefit when consumer awareness is strong.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) buyers are entitled to honest prices, warranties, and refunds?\nb) ethical producers win customer loyalty in an informed market?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) How do consumer protection associations detect hidden product dangers?\nb) List three consumer rights mentioned in paragraph 2.\nc) Who shares responsibility for consumer safety according to paragraph 3?',
					whA: 'a) By testing sample products in independent laboratories.\nb) Truthful pricing, clear warranty documents, and safe refunds for defective items.\nc) Regulators, ethical producers, and informed buyers.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) they (§1)   b) the violation (§2)   c) buyers (§3)',
					refA: 'a) they: consumer protection associations | b) the violation: a company ignoring customer complaints (violating buyer rights) | c) buyers: consumers / shoppers',
					easyQ: 'According to "Consumer Protection Associations in Action", where do associations test sample products?',
					easyCorrect: 'In independent laboratories',
					easyDistractors: [
						{ text: 'Inside advertising agencies', diagnosticFeedback: 'الفحص يتم في مخابر مستقلة لا وكالات إشهار.' },
						{ text: 'On street billboards', diagnosticFeedback: 'الإعلانات لا تفحص سلامة المنتجات.' },
						{ text: 'Without any scientific testing', diagnosticFeedback: 'الفقرة الأولى تذكر الاختبار المخبري المستقل صراحة.' }
					],
					medQ: 'In paragraph 1, what does the pronoun "they" refer to?',
					medCorrect: 'consumer protection associations',
					medDistractors: [
						{ text: 'electronic devices', diagnosticFeedback: 'الجمعيات هي التي تكتشف المخاطر وتنبه الجمهور.' },
						{ text: 'health hazards', diagnosticFeedback: 'المخاطر هي المفعول به للفعل detect.' },
						{ text: 'warranty documents', diagnosticFeedback: 'وثائق الضمان وردت في الفقرة الثانية.' }
					],
					hardQ: 'Why does strong consumer awareness benefit honest producers according to paragraph 3?',
					hardCorrect: 'Because firms that respect safety and honest ads win loyal customers without tricks',
					hardDistractors: [
						{ text: 'Because informed buyers stop checking prices', diagnosticFeedback: 'المستهلك الواعي يقارن الجودة والسعر معا.' },
						{ text: 'Because regulators close all independent laboratories', diagnosticFeedback: 'المخابر المستقلة ضرورية لحماية السوق.' },
						{ text: 'Because companies no longer need to offer warranties', diagnosticFeedback: 'الضمان حق أساسي للمستهلك.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Correct answer: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part One: A/ Reading Comprehension',
				points: 8,
				instruction: 'Read the text carefully then do the following activities.',
				content: [
					buildEnglishPassageBlock({
						title: v.title,
						paragraphs: v.paragraphs,
						source: v.source,
						glossary: v.glossary,
						numberedParagraphs: true
					}),
					{ type: 'text', content: '1. Say whether the following statements are True or False (correct the false ones):' },
					{ type: 'true_false', items: v.tfItems },
					{ type: 'text', content: v.paraMatchQ, answer: v.paraMatchA, mark: '1.5' },
					{ type: 'text', content: v.whQ, answer: v.whA, mark: '3' },
					{ type: 'text', content: v.refQ, answer: v.refA, mark: '1.5' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'Pay attention to concession connectors (Nevertheless, Despite) that signal contrast in paragraph 2.',
					'Answer Wh-questions directly in full, concise sentences.',
					'Verify whether underlined pronouns refer to a person, an organization, or a whole idea.'
				],
				solutionStepsAr: [
					`True/False: ${v.tfItems.map((t) => t.a).join(' / ')}`,
					v.paraMatchA,
					v.whA,
					v.refA
				],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (7 pts) — Concession, Cause/Effect, Modals, Final -s
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t2_expl_safety_grammar',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (7 ن): الاستدراك والسبب والاحتمال ونطق النهاية Final -s',
		curriculumLessonId: 'eng_lesson_3as_sci_t2_concession_contrast',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Match each word with its closest synonym:\na) nutritious   b) hazardous   c) consumer   d) persuade\nSynonyms: (1) buyer | (2) convince | (3) healthy | (4) dangerous',
					vocabA: 'a-3 (healthy) | b-4 (dangerous) | c-1 (buyer) | d-2 (convince)',
					wordRows: [
						{ verb: { given: true, value: 'to consume' }, noun: { value: 'consumption / consumer', mark: '0.25' }, adjective: { value: 'consumable', mark: '0.25' } },
						{ verb: { value: 'to advertise', mark: '0.25' }, noun: { given: true, value: 'advertisement' }, adjective: { value: 'advertised', mark: '0.25' } },
						{ verb: { value: 'to nourish', mark: '0.25' }, noun: { value: 'nutrition', mark: '0.25' }, adjective: { given: true, value: 'nutritious' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) Although fast food is convenient, it harms cardiovascular health.\n   b) Despite ........................................................................\n2. a) Many teens suffer from obesity because they drink sugary sodas daily.\n   b) Many teens suffer from obesity because of ........................................................................\n3. a) It is possible that chemical dyes trigger allergies in young children.\n   b) Chemical dyes ........................................................................\n4. a) Organic vegetables are nutritious; therefore, doctors recommend them.\n   b) Since ........................................................................',
					rewriteA:
						'1. b) Despite being convenient (or: Despite the fact that fast food is convenient), fast food harms cardiovascular health.\n2. b) Many teens suffer from obesity because of drinking sugary sodas daily.\n3. b) Chemical dyes may / could trigger allergies in young children.\n4. b) Since organic vegetables are nutritious, doctors recommend them.',
					phonIntro: '4. Classify the following words according to the pronunciation of their final -s: snacks, labels, prices, protects',
					phonCols: [
						{ header: '/s/', words: ['snacks', 'protects'], mark: '0.5' },
						{ header: '/z/', words: ['labels'], mark: '0.25' },
						{ header: '/iz/', words: ['prices'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (vitamins - fresh - balance - habits)\nMaintaining healthy eating (1) ........ starts with a good (2) ........ between proteins, grains, and (3) ........ fruit. Natural meals supply essential (4) ........ for study and growth.',
					gapA: '(1) habits | (2) balance | (3) fresh | (4) vitamins',
					easyQ: 'How is the final "-s" pronounced in the word "prices"?',
					easyCorrect: '/iz/',
					easyDistractors: [
						{ text: '/s/', diagnosticFeedback: 'الكلمة تنتهي بصوت صفيري (ce) فتأخذ /iz/.' },
						{ text: '/z/', diagnosticFeedback: 'الأصوات الصفيرية تضيف مقطعا /iz/.' },
						{ text: '/t/', diagnosticFeedback: '/t/ يخص نهاية الماضي -ed لا -s.' }
					],
					medQ: 'Rewrite with "Despite": "Although fast food is cheap, it weakens health."',
					medCorrect: 'Despite being cheap, fast food weakens health.',
					medDistractors: [
						{ text: 'Despite of being cheap, fast food weakens health.', diagnosticFeedback: 'لا نضع of بعد Despite أبدا.' },
						{ text: 'Despite fast food is cheap, it weakens health.', diagnosticFeedback: 'Despite لا تتبعها جملة فعلية مباشرة دون the fact that.' },
						{ text: 'Despite cheap, fast food weakens health.', diagnosticFeedback: 'لا نضع الصفة وحدها بعد Despite بل Gerund أو عبارة اسمية.' }
					],
					hardQ: 'Rewrite with "Since": "Fresh fruit is rich in fibre; consequently, it aids digestion."',
					hardCorrect: 'Since fresh fruit is rich in fibre, it aids digestion.',
					hardDistractors: [
						{ text: 'Since it aids digestion, fresh fruit is rich in fibre.', diagnosticFeedback: 'عكست بين السبب والنتيجة.' },
						{ text: 'Since fresh fruit is rich in fibre; consequently, it aids digestion.', diagnosticFeedback: 'احذف consequently عند الربط بأداة السبب Since.' },
						{ text: 'Since of fresh fruit being rich in fibre, it aids digestion.', diagnosticFeedback: 'Since لا تأخذ of بل تتبعها جملة فعلية كاملة.' }
					]
				},
				{
					vocabQ: '1. Match each word with its closest opposite:\na) artificial   b) safe   c) balanced   d) genuine\nOpposites: (1) unbalanced | (2) fake | (3) natural | (4) dangerous',
					vocabA: 'a-3 (natural) | b-4 (dangerous) | c-1 (unbalanced) | d-2 (fake)',
					wordRows: [
						{ verb: { given: true, value: 'to protect' }, noun: { value: 'protection', mark: '0.25' }, adjective: { value: 'protective', mark: '0.25' } },
						{ verb: { value: 'to inform', mark: '0.25' }, noun: { given: true, value: 'information' }, adjective: { value: 'informative', mark: '0.25' } },
						{ verb: { value: 'to save', mark: '0.25' }, noun: { value: 'safety', mark: '0.25' }, adjective: { given: true, value: 'safe' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) In spite of the clear warnings, some shops still sell expired snacks.\n   b) Even though ........................................................................\n2. a) It is impossible that expired yoghurt is safe for children.\n   b) Expired yoghurt ........................................................................\n3. a) Smart shoppers read labels carefully because manufacturers use hidden additives.\n   b) Smart shoppers read labels carefully due to ........................................................................\n4. a) The commercial was very persuasive; as a result, sales doubled quickly.\n   b) The commercial was so ........................................................................',
					rewriteA:
						'1. b) Even though the warnings are clear, some shops still sell expired snacks.\n2. b) Expired yoghurt cannot be safe for children.\n3. b) Smart shoppers read labels carefully due to hidden additives (or: manufacturers use of hidden additives).\n4. b) The commercial was so persuasive that sales doubled quickly.',
					phonIntro: '4. Classify the following words according to the pronunciation of their final -s: shops, vitamins, boxes, choices',
					phonCols: [
						{ header: '/s/', words: ['shops'], mark: '0.25' },
						{ header: '/z/', words: ['vitamins'], mark: '0.25' },
						{ header: '/iz/', words: ['boxes', 'choices'], mark: '0.5' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (dates - labels - safe - additives)\nWise consumers always inspect food (1) ........ before paying. Checking expiry (2) ........ and avoiding harmful (3) ........ keep every family (4) ........ from poisoning.',
					gapA: '(1) labels | (2) dates | (3) additives | (4) safe',
					easyQ: 'Rewrite with "cannot": "It is impossible that expired yoghurt is safe for children."',
					easyCorrect: 'Expired yoghurt cannot be safe for children.',
					easyDistractors: [
						{ text: 'Expired yoghurt cannot is safe for children.', diagnosticFeedback: 'بعد cannot يعود الفعل إلى المصدر المجرد (be).' },
						{ text: 'Expired yoghurt might be safe for children.', diagnosticFeedback: 'might تفيد الاحتمال لا الاستحالة.' },
						{ text: 'Expired yoghurt must be safe for children.', diagnosticFeedback: 'must تفيد اليقين الإيجابي عكس المعنى المطلوب.' }
					],
					medQ: 'Which word has its final "-s" pronounced /z/?',
					medCorrect: 'vitamins',
					medDistractors: [
						{ text: 'shops', diagnosticFeedback: 'تنتهي بصوت /p/ المهموس فتنطق /s/.' },
						{ text: 'boxes', diagnosticFeedback: 'تنتهي بصوت /ks/ الصفيري فتنطق /iz/.' },
						{ text: 'choices', diagnosticFeedback: 'تنتهي بصوت /s/ الصفيري (ce) فتنطق /iz/.' }
					],
					hardQ: 'Rewrite with "Even though": "In spite of the clear warnings, some shops still sell expired snacks."',
					hardCorrect: 'Even though the warnings are clear, some shops still sell expired snacks.',
					hardDistractors: [
						{ text: 'Even though the clear warnings, some shops still sell expired snacks.', diagnosticFeedback: 'Even though تتطلب فاعلا وفعلا مصرفا.' },
						{ text: 'Even though the warnings are clear, but some shops still sell expired snacks.', diagnosticFeedback: 'لا نجمع بين Even though و but.' },
						{ text: 'Even though of the clear warnings, some shops still sell expired snacks.', diagnosticFeedback: 'لا نضع of بعد Even though.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Correct answer: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part One: B/ Text Exploration',
				points: 7,
				instruction: 'Complete all vocabulary, morphology, grammar, phonology, and gap-fill tasks.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building chart:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.phonIntro },
					buildEnglishPhonologyTableBlock({ columns: v.phonCols }),
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Use "Despite + V-ing" or "Despite the fact that + Subject + Verb" (never "Despite of").',
					'After modals (may, might, could, must, cannot), always use the bare infinitive (stem).',
					'Final -s sounds /s/ after voiceless p/t/k/f/th, /iz/ after s/sh/ch/x/z/ce/ge, and /z/ otherwise.'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (7 pts) — Gerund, Compounds, Modals, Final -ed
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t2_expl_safety_phonology',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'phonology_pronunciation',
		titleAr: 'البناء اللغوي (7 ن): الكلمات المركبة و Gerund ونطق النهاية Final -ed',
		curriculumLessonId: 'eng_lesson_3as_sci_t2_phonology_s_ed_stress',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Combine words from A and B to form four compound words from Unit 2:\nColumn A: fast / sugar / well / food\nColumn B: poisoning / free / balanced / food',
					vocabA: 'fast-food | sugar-free | well-balanced | food-poisoning',
					wordRows: [
						{ verb: { given: true, value: 'to balance' }, noun: { value: 'balance', mark: '0.25' }, adjective: { value: 'balanced', mark: '0.25' } },
						{ verb: { value: 'to harm', mark: '0.25' }, noun: { given: true, value: 'harm' }, adjective: { value: 'harmful / harmless', mark: '0.25' } },
						{ verb: { value: 'to poison', mark: '0.25' }, noun: { value: 'poison / poisoning', mark: '0.25' }, adjective: { given: true, value: 'poisonous' } }
					],
					rewriteQ:
						'3. Give the correct form of the verbs in brackets or rewrite sentence (b):\n1. Before (buy) ........ any packaged food, shoppers should (check) ........ the expiry date.\n2. Doctors advise teenagers (avoid) ........ (eat) ........ fried snacks every day.\n3. a) Perhaps artificial sweeteners affect sleep quality.\n   b) Artificial sweeteners ........................................................................\n4. a) Junk food is tasty; however, it lacks essential vitamins.\n   b) Although ........................................................................',
					rewriteA:
						'1. buying / check\n2. to avoid / eating\n3. b) Artificial sweeteners might / may affect sleep quality.\n4. b) Although junk food is tasty, it lacks essential vitamins.',
					phonIntro: '4. Classify the following verbs according to the pronunciation of their final -ed: balanced, consumed, protected, checked',
					phonCols: [
						{ header: '/t/', words: ['balanced', 'checked'], mark: '0.5' },
						{ header: '/d/', words: ['consumed'], mark: '0.25' },
						{ header: '/id/', words: ['protected'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (avoid - water - meals - active)\nStudents who cook fresh (1) ........ and drink clean (2) ........ stay alert during lessons. They also (3) ........ sugary drinks to keep their minds (4) ........ .',
					gapA: '(1) meals | (2) water | (3) avoid | (4) active',
					easyQ: 'How is the final "-ed" pronounced in the verb "protected"?',
					easyCorrect: '/id/',
					easyDistractors: [
						{ text: '/t/', diagnosticFeedback: 'أصل الفعل protect ينتهي بصوت /t/ فتأخذ النهاية -ed مقطعا إضافيا /id/.' },
						{ text: '/d/', diagnosticFeedback: 'بعد /t/ و /d/ ننطق /id/ دائما.' },
						{ text: '/iz/', diagnosticFeedback: '/iz/ يخص النهاية -s لا -ed.' }
					],
					medQ: 'Choose the right forms: "Before ........ snacks, consumers should ........ the ingredients."',
					medCorrect: 'buying / check',
					medDistractors: [
						{ text: 'buy / checking', diagnosticFeedback: 'بعد حرف الجر before نضع V-ing وبعد should نضع المصدر المجرد.' },
						{ text: 'to buy / to check', diagnosticFeedback: 'لا نضع to بعد before ولا بعد should.' },
						{ text: 'bought / checked', diagnosticFeedback: 'لا نضع الماضي البسيط في الموضعين.' }
					],
					hardQ: 'How is the final "-ed" pronounced in "balanced" (root ends in -ce /s/)?',
					hardCorrect: '/t/',
					hardDistractors: [
						{ text: '/d/', diagnosticFeedback: 'صوت /s/ في ce مهموس وليس مجهورا.' },
						{ text: '/id/', diagnosticFeedback: '/id/ يأتي فقط بعد صوتي /t/ و /d/.' },
						{ text: '/z/', diagnosticFeedback: '/z/ يخص النهاية -s لا -ed.' }
					]
				},
				{
					vocabQ: '1. Combine words from A and B to form four compound words from Unit 2:\nColumn A: ready / health / home / expiry\nColumn B: conscious / date / made / cooked',
					vocabA: 'ready-made | health-conscious | home-cooked | expiry-date (expiry date)',
					wordRows: [
						{ verb: { given: true, value: 'to warn' }, noun: { value: 'warning', mark: '0.25' }, adjective: { value: 'warned / warning', mark: '0.25' } },
						{ verb: { value: 'to inspect', mark: '0.25' }, noun: { given: true, value: 'inspection' }, adjective: { value: 'inspected', mark: '0.25' } },
						{ verb: { value: 'to sweeten', mark: '0.25' }, noun: { value: 'sweetness', mark: '0.25' }, adjective: { given: true, value: 'sweet' } }
					],
					rewriteQ:
						'3. Give the correct form of the verbs in brackets or rewrite sentence (b):\n1. (Eat) ........ seasonal fruit helps students (stay) ........ energetic at school.\n2. Consumers can save money by (compare) ........ prices instead of (trust) ........ ads blindly.\n3. a) It is certain that clean drinking water prevents many infections.\n   b) Clean drinking water ........................................................................\n4. a) Because the restaurant kept its kitchen spotless, customers trusted it.\n   b) The restaurant kept its kitchen spotless; therefore, ........................................................................',
					rewriteA:
						'1. Eating / stay (or: to stay)\n2. comparing / trusting\n3. b) Clean drinking water must prevent many infections.\n4. b) The restaurant kept its kitchen spotless; therefore, customers trusted it.',
					phonIntro: '4. Classify the following verbs according to the pronunciation of their final -ed: washed, warned, tested, packed',
					phonCols: [
						{ header: '/t/', words: ['washed', 'packed'], mark: '0.5' },
						{ header: '/d/', words: ['warned'], mark: '0.25' },
						{ header: '/id/', words: ['tested'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (hygiene - fresh - safety - check)\nEnsuring food (1) ........ requires strict kitchen (2) ........ every day. Families should (3) ........ storage temperatures and cook (4) ........ ingredients.',
					gapA: '(1) safety | (2) hygiene | (3) check | (4) fresh',
					easyQ: 'How is the final "-ed" pronounced in the verb "warned"?',
					easyCorrect: '/d/',
					easyDistractors: [
						{ text: '/t/', diagnosticFeedback: 'صوت /n/ مجهور (يهتز الحلق) فينطق /d/.' },
						{ text: '/id/', diagnosticFeedback: '/id/ فقط بعد /t/ و /d/.' },
						{ text: '/s/', diagnosticFeedback: '/s/ يخص النهاية -s.' }
					],
					medQ: 'Complete: "Shoppers avoid mistakes by ........ prices instead of ........ commercials blindly."',
					medCorrect: 'comparing / trusting',
					medDistractors: [
						{ text: 'compare / trust', diagnosticFeedback: 'بعد حروف الجر by و of نضع Gerund (V-ing).' },
						{ text: 'to compare / to trust', diagnosticFeedback: 'لا نضع to-infinitive بعد حروف الجر by و of.' },
						{ text: 'compared / trusted', diagnosticFeedback: 'لا نضع الماضي البسيط بعد حروف الجر.' }
					],
					hardQ: 'Rewrite with "must": "It is certain that clean drinking water prevents many infections."',
					hardCorrect: 'Clean drinking water must prevent many infections.',
					hardDistractors: [
						{ text: 'Clean drinking water must prevents many infections.', diagnosticFeedback: 'احذف s من الفعل بعد الفعل الناقص must.' },
						{ text: 'Clean drinking water might prevent many infections.', diagnosticFeedback: 'might تفيد الاحتمال الضعيف وليس اليقين.' },
						{ text: 'Clean drinking water must to prevent many infections.', diagnosticFeedback: 'لا نضع to بعد must.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Correct answer: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part One: B/ Text Exploration',
				points: 7,
				instruction: 'Complete all compound word, morphology, grammar, phonology, and discourse activities.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building table:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.phonIntro },
					buildEnglishPhonologyTableBlock({ columns: v.phonCols }),
					{ type: 'text', content: v.gapQ, answer: v.gapA, mark: '1' }
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'Use Gerund (V-ing) after all prepositions (by, before, after, without, of) and verbs like avoid/suggest.',
					'Final -ed sounds /id/ ONLY after /t/ and /d/, /t/ after voiceless sounds (p, k, f, s, ce, sh, ch, x), and /d/ otherwise.',
					'Check compound hyphenated forms carefully (well-balanced, ready-made, sugar-free).'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts) — Healthy Diet & Consumer Awareness
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t2_written_safety',
		grade: '3as_se',
		trimesterId: 't2',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 ن): التغذية الصحية السليمة وحماية المستهلك من الإشهار المضلل',
		curriculumLessonId: 'eng_lesson_3as_sci_t2_gerund_compounds',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					topicOnePrompt:
						'Many secondary school students skip breakfast and eat too much fast food during exam preparation. Write a short article of about 80 to 120 words advising students on how to adopt wholesome eating habits.',
					topicOneNotes: [
						'Dangers of fast food: fatigue, obesity, weak concentration',
						'Value of a balanced breakfast: energy and sharper memory',
						'Healthy habits: fresh fruit, vegetables, clean water, home-cooked meals',
						'Practical tip: check food labels and avoid sugary sodas'
					],
					topicTwoPrompt:
						'Some companies use deceptive advertisements to persuade young buyers to purchase unhealthy snacks. Write an essay of about 80 to 120 words explaining how families and schools can raise consumer awareness.',
					modelAnswer:
						'Wholesome nutrition plays a decisive role in both physical health and academic achievement. First, eating fast food and sugary snacks daily may cause fatigue, obesity, and weak concentration in class. By contrast, starting the morning with a well-balanced breakfast supplies steady energy and sharpens memory during revision. Therefore, students ought to choose home-cooked meals rich in seasonal vegetables, whole grains, and fresh fruit while drinking plenty of clean water. Moreover, reading food labels before buying packaged snacks helps everyone avoid harmful additives. To sum up, despite busy study schedules, choosing natural food is the wisest investment in our future.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'Which sentence best introduces a BAC essay on wholesome student nutrition?',
					easyCorrect: 'Wholesome nutrition plays a vital role in maintaining student health and sharp classroom focus.',
					easyDistractors: [
						{ text: 'I bought a burger near the bus station.', diagnosticFeedback: 'جملة حكائية ضيقة لا تصلح مقدمة لمقال عام.' },
						{ text: 'Fast food, breakfast, labels, water.', diagnosticFeedback: 'عبارة مبتورة دون فعل.' },
						{ text: 'Nobody cares about what teenagers eat.', diagnosticFeedback: 'افتتاحية سلبية غير دقيقة.' }
					],
					medQ: 'Which sentence accurately combines concession and Unit 2 vocabulary?',
					medCorrect: 'Despite busy schedules, students should choose fresh home-cooked meals.',
					medDistractors: [
						{ text: 'Despite of busy schedules, students should choose fresh meals.', diagnosticFeedback: 'لا نضع of بعد Despite.' },
						{ text: 'Although busy schedules, students should choose fresh meals.', diagnosticFeedback: 'Although تتبعها جملة فعلية كاملة.' },
						{ text: 'Although schedules are busy, but students should choose fresh meals.', diagnosticFeedback: 'لا نجمع بين Although و but.' }
					],
					hardQ: 'Which sentence correctly uses a Gerund as subject in a Unit 2 essay?',
					hardCorrect: 'Reading food labels carefully helps families avoid harmful chemical additives.',
					hardDistractors: [
						{ text: 'Read food labels carefully helps families avoid additives.', diagnosticFeedback: 'الفعل كفاعل في بداية الجملة يأخذ صيغة Gerund (Reading).' },
						{ text: 'To reading food labels helps families avoid additives.', diagnosticFeedback: 'لا نجمع بين to و V-ing كفاعل.' },
						{ text: 'Reading food labels carefully help families avoid additives.', diagnosticFeedback: 'الفاعل Gerund يعامل معاملة المفرد لذا نكتب helps.' }
					]
				},
				{
					topicOnePrompt:
						'Misleading advertisements often push consumers to waste money on poor-quality goods. Write a short composition of about 80 to 120 words explaining how shoppers can protect themselves from deceptive marketing.',
					topicOneNotes: [
						'Tactics of misleading ads: exaggerated claims and fake discounts',
						'Smart shopping habits: compare prices, verify expiry dates and warranties',
						'Distinguish real needs from impulse desires before buying',
						'Role of consumer associations and strict advertising laws'
					],
					topicTwoPrompt:
						'Food safety is a shared responsibility between producers, shopkeepers, and consumers. Write an essay of about 80 to 120 words discussing the main measures needed to prevent food poisoning in our communities.',
					modelAnswer:
						'Although advertising can inform shoppers about useful products, misleading commercials often deceive careless buyers. First, some campaigns use exaggerated claims and artificial discounts to push consumers into buying low-quality items. Consequently, smart shoppers should pause before paying in order to distinguish genuine needs from passing desires. Moreover, checking expiry dates, reading ingredient lists, and requesting official warranties protect families from financial loss and health hazards. Finally, strict regulations and active consumer associations must punish dishonest advertisers. In conclusion, critical thinking and clear laws together ensure a safe and fair marketplace for everyone.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'Which linker best shows a result inside a consumer-protection essay?',
					easyCorrect: 'Consequently, smart shoppers should verify expiry dates before paying.',
					easyDistractors: [
						{ text: 'Because of, smart shoppers verify expiry dates.', diagnosticFeedback: 'Because of ليست رابط جملة مستقلة بل يتبعها اسم.' },
						{ text: 'Unless, smart shoppers verify expiry dates.', diagnosticFeedback: 'Unless أداة شرط تتبعها جملة الشرط.' },
						{ text: 'Despite, smart shoppers verify expiry dates.', diagnosticFeedback: 'Despite يتبعها اسم أو V-ing.' }
					],
					medQ: 'Which sentence correctly expands the note "verify expiry dates and warranties"?',
					medCorrect: 'Furthermore, consumers should verify expiry dates and request official warranties before purchasing.',
					medDistractors: [
						{ text: '- Verify expiry dates and warranties.', diagnosticFeedback: 'لا تترك النقاط في شكل عوارض.' },
						{ text: 'Consumers verifying expiry dates warranties.', diagnosticFeedback: 'جملة ناقصة الفعل الرئيسي.' },
						{ text: 'Consumers should to verify expiry dates.', diagnosticFeedback: 'لا نضع to بعد should.' }
					],
					hardQ: 'Which opening sentence uses "Although" with 100% accuracy?',
					hardCorrect: 'Although advertising can inform buyers about new products, deceptive ads harm consumers.',
					hardDistractors: [
						{ text: 'Although advertising can inform buyers, but deceptive ads harm consumers.', diagnosticFeedback: 'احذف but مع Although.' },
						{ text: 'Although informative advertising, deceptive ads harm consumers.', diagnosticFeedback: 'Although تتبعها جملة كاملة (فاعل وفعل).' },
						{ text: 'Although of informative advertising, deceptive ads harm consumers.', diagnosticFeedback: 'لا نضع of بعد Although.' }
					]
				}
			];

			const v = rng.pick(variants);
			const qMap =
				difficulty === 'easy'
					? { q: v.easyQ, ans: v.easyCorrect, dist: v.easyDistractors }
					: difficulty === 'medium'
						? { q: v.medQ, ans: v.medCorrect, dist: v.medDistractors }
						: { q: v.hardQ, ans: v.hardCorrect, dist: v.hardDistractors };

			const mcq = buildUniqueMcqOptions(qMap.ans, qMap.dist, rng);
			const quizQuestion: QuizQuestionPayload = {
				type: 'mcq',
				questionText: qMap.q,
				questionTextAr: qMap.q,
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `Best BAC writing choice: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part Two: Written Expression',
				points: 5,
				instruction: 'Write a coherent composition of about 80 to 120 words on ONE of the two topics below.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: v.topicOnePrompt,
						topicOneNotes: v.topicOneNotes,
						topicTwoPrompt: v.topicTwoPrompt,
						modelAnswer: v.modelAnswer,
						rubricSummary: v.rubricSummary,
						mark: '5'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: this.grade,
				trimesterId: this.trimesterId,
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'Use Unit 2 grammar naturally: although/despite, because/therefore, may/might, and Gerunds.',
					'Expand every note in Topic One into a full, grammatically sound sentence.',
					'End with a clear concluding recommendation using "To sum up" or "In conclusion".'
				],
				solutionStepsAr: [
					'Introduction: State the health or consumer issue clearly.',
					'Body: Present causes, risks, and practical preventive habits with smooth linkers.',
					'Conclusion: Summarize the key advice in one strong final sentence.'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
