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
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T1
// Unit 1: Ill-Gotten Gains Never Prosper (Ethics in Business)
// 5 BAC Templates: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T1: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (8 pts) — Counterfeiting & Combating Bribery
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t1_comp_counterfeiting',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): التزوير والتقليد ومكافحة الرشوة في الأعمال',
		curriculumLessonId: 'eng_lesson_3as_sci_t1_condition_providing',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'The Hidden Cost of Counterfeit Goods',
					source: 'Adapted from International Consumer Ethics Report',
					paragraphs: [
						'Counterfeiting has become one of the most harmful unethical practices in modern trade. Dishonest manufacturers imitate famous brands of medicines, car spare parts, and electrical appliances to make quick profits. Because these fake items are sold at low prices, many unaware buyers purchase [[them]] without realizing the grave danger behind the bargain.',
						'The consequences of counterfeit products extend far beyond financial loss. Fake medicines often contain inactive or toxic ingredients that fail to cure patients and may even threaten lives. Similarly, imitated brakes and faulty cables cause severe accidents every year. Moreover, legitimate companies lose revenue and are forced to cut jobs, [[which]] weakens the national economy.',
						'Eradicating this illegal market requires joint efforts from authorities and citizens alike. Governments must enforce strict customs controls and impose heavy fines on counterfeiters. At the same time, consumers had better inspect official quality seals and buy only from trusted suppliers. Honest trade will prosper provided that every member of society rejects [[it]] completely.'
					],
					glossary: [
						{ term: 'faulty', meaning: 'defective, not working properly' },
						{ term: 'legitimate', meaning: 'lawful and genuine' }
					],
					tfItems: [
						{ q: 'Counterfeiters imitate only luxury clothes and watches.', a: 'False', c: 'They imitate medicines, car spare parts, and electrical appliances.', mark: '0.5' },
						{ q: 'Low prices attract unaware consumers to fake items.', a: 'True', mark: '0.5' },
						{ q: 'Counterfeiting has no impact on legitimate companies or jobs.', a: 'False', c: 'Legitimate companies lose revenue and are forced to cut jobs.', mark: '0.5' },
						{ q: 'Fighting counterfeiting is the responsibility of both authorities and consumers.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) fake goods endanger human health and road safety?\nb) strict customs inspections and consumer awareness can stop counterfeiting?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) Why do dishonest manufacturers imitate famous brands?\nb) Mention two harmful consequences of counterfeit goods.\nc) What should consumers do to protect themselves from fake items?',
					whA: 'a) They imitate famous brands to make quick profits.\nb) Fake medicines threaten patients lives, faulty parts cause accidents, and honest companies lose revenue and jobs (any two).\nc) Consumers should inspect official quality seals and buy only from trusted suppliers.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) them (§1)   b) which (§2)   c) it (§3)',
					refA: 'a) them: these fake items (counterfeit products) | b) which: losing revenue and being forced to cut jobs | c) it: counterfeiting (this illegal market)',
					easyQ: 'According to the passage "The Hidden Cost of Counterfeit Goods", why do unaware buyers often purchase fake goods?',
					easyCorrect: 'Because fake items are sold at low prices',
					easyDistractors: [
						{ text: 'Because fake items have official quality seals', diagnosticFeedback: 'النص يوضح أن المنتجات المقلدة تفتقر لأختام الجودة الرسمية.' },
						{ text: 'Because legitimate companies stopped selling products', diagnosticFeedback: 'الشركات الشرعية موجودة لكنها تتضرر من التقليد.' },
						{ text: 'Because doctors recommended counterfeit medicines', diagnosticFeedback: 'الأدوية المقلدة تشكل خطرا على حياة المرضى.' }
					],
					medQ: 'In paragraph 1 of "The Hidden Cost of Counterfeit Goods", what does the pronoun "them" refer to?',
					medCorrect: 'these fake items',
					medDistractors: [
						{ text: 'dishonest manufacturers', diagnosticFeedback: 'المشترون يشترون السلع المقلدة لا المصنعين.' },
						{ text: 'unaware buyers', diagnosticFeedback: 'المشترون هم الفاعل في الجملة وليس المفعول به.' },
						{ text: 'customs controls', diagnosticFeedback: 'الرقابة الجمركية وردت في الفقرة الثالثة فقط.' }
					],
					hardQ: 'What condition does the author set in paragraph 3 for honest trade to prosper?',
					hardCorrect: 'Every member of society must completely reject counterfeiting',
					hardDistractors: [
						{ text: 'Fake items must be sold at higher prices', diagnosticFeedback: 'الكاتب يدعو للقضاء على السوق غير الشرعية تماما لا رفع أسعارها.' },
						{ text: 'Citizens should rely only on customs officers without checking labels', diagnosticFeedback: 'الكاتب يؤكد ضرورة الجهد المشترك بين السلطات والمستهلكين.' },
						{ text: 'Companies must stop producing electrical appliances', diagnosticFeedback: 'المشكلة في التقليد والغش لا في الإنتاج الشرعي.' }
					]
				},
				{
					title: 'Integrity as the Pillar of Public Trust',
					source: 'Adapted from Governance and Ethics Review',
					paragraphs: [
						'Bribery and embezzlement silently erode the foundations of any economy. When public funds are diverted for private gain, vital services such as hospitals, schools, and clean water networks suffer severe shortages. Honest citizens bear the heaviest burden of [[these]] unethical acts through poor infrastructure and reduced opportunities.',
						'Transparency is widely recognized as the strongest shield against financial misconduct. Independent audits, open bidding for public contracts, and digital accounting systems make [[it]] extremely difficult for corrupt officials to hide illegal transactions. Countries that publish clear budget reports build strong trust between institutions and the public.',
						'However, laws alone are not sufficient unless moral values are cultivated from an early age. Families and schools play a decisive role in teaching children that honesty, fairness, and accountability bring lasting dignity. As long as society honours integrity above ill-gotten wealth, young generations will grow into responsible leaders who protect [[their]] nation.'
					],
					glossary: [
						{ term: 'erode', meaning: 'gradually destroy or weaken' },
						{ term: 'accountability', meaning: 'responsibility for one actions and decisions' }
					],
					tfItems: [
						{ q: 'Embezzlement has no effect on public hospitals and schools.', a: 'False', c: 'Vital services such as hospitals and schools suffer severe shortages.', mark: '0.5' },
						{ q: 'Digital accounting and independent audits help prevent financial misconduct.', a: 'True', mark: '0.5' },
						{ q: 'Laws alone are completely enough to eliminate corruption without education.', a: 'False', c: 'Moral values must also be cultivated by families and schools.', mark: '0.5' },
						{ q: 'Honouring integrity encourages youth to become responsible leaders.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) open bidding and digital records block hidden illegal transactions?\nb) families and schools help build honest future generations?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) How do bribery and embezzlement harm ordinary citizens?\nb) List two practical tools mentioned to ensure transparency.\nc) Why are families and schools important in fighting corruption?',
					whA: 'a) They cause shortages in hospitals, schools, and water networks, leading to poor infrastructure and fewer opportunities.\nb) Independent audits, open bidding for public contracts, and digital accounting systems (any two).\nc) Because they teach children honesty, fairness, and accountability from an early age.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) these (§1)   b) it (§2)   c) their (§3)',
					refA: 'a) these: bribery and embezzlement (unethical acts) | b) it: hiding illegal transactions | c) their: responsible leaders (young generations)',
					easyQ: 'According to "Integrity as the Pillar of Public Trust", what suffers directly when public funds are diverted?',
					easyCorrect: 'Vital services like hospitals, schools, and clean water networks',
					easyDistractors: [
						{ text: 'Digital accounting software only', diagnosticFeedback: 'الأنظمة الرقمية أداة لمحاربة الفساد في الفقرة الثانية.' },
						{ text: 'Private luxury projects', diagnosticFeedback: 'المتضرر هو الخدمات العمومية الأساسية للمواطنين.' },
						{ text: 'International weather forecasts', diagnosticFeedback: 'لا علاقة للنص بالأرصاد الجوية.' }
					],
					medQ: 'Which tool is NOT mentioned in paragraph 2 as a shield against financial misconduct?',
					medCorrect: 'Secret closed contracts',
					medDistractors: [
						{ text: 'Independent audits', diagnosticFeedback: 'ذُكرت التدقيقات المستقلة صراحة في الفقرة الثانية.' },
						{ text: 'Open bidding for public contracts', diagnosticFeedback: 'ذُكرت المناقصات المفتوحة صراحة في الفقرة الثانية.' },
						{ text: 'Digital accounting systems', diagnosticFeedback: 'ذُكرت المحاسبة الرقمية صراحة في الفقرة الثانية.' }
					],
					hardQ: 'What is the main idea of paragraph 3 in "Integrity as the Pillar of Public Trust"?',
					hardCorrect: 'Legal measures must be supported by moral education at home and school',
					hardDistractors: [
						{ text: 'Laws should be abolished because schools are enough', diagnosticFeedback: 'النص يقول إن القوانين وحدها لا تكفي بل تتكامل مع التربية الأخلاقية.' },
						{ text: 'Ill-gotten wealth brings lasting social dignity', diagnosticFeedback: 'الكاتب يؤكد أن النزاهة والعدل هما مصدر الكرامة الحقيقية.' },
						{ text: 'Audits are impossible to conduct in schools', diagnosticFeedback: 'لم يذكر النص هذا الرأي إطلاقا.' }
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
				explanation: `Correct answer: ${qMap.ans}. Always verify details directly inside the relevant paragraph.`
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
					'Skim the three paragraphs first to identify the main topic of each paragraph.',
					'For True/False, watch out for extreme words like only, never, or no impact.',
					'For underlined pronouns, look directly before the pronoun in the same or previous sentence.'
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
	// 2. COMPREHENSION (8 pts) — Honesty in Trade & Ethical Responsibility
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t1_comp_ethical_trade',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): الأمانة في التجارة والمسؤولية الأخلاقية للشركات',
		curriculumLessonId: 'eng_lesson_3as_sci_t1_passive_cause_ethics',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Fair Weights and Honest Trade',
					source: 'Adapted from Business Ethics Quarterly',
					paragraphs: [
						'Throughout history, thriving markets have always depended on a simple moral foundation: fair measurement and truthful dealing. When merchants give exact weights, disclose defects honestly, and avoid price manipulation, buyers return with confidence. This mutual trust reduces conflict and encourages long-term commercial partnerships that benefit [[everyone]].',
						'By contrast, short-sighted traders who tamper with scales or conceal expired stock may earn rapid money, yet [[their]] success rarely lasts. Once customers discover deception, word spreads quickly across the community and ruins the seller reputation permanently. Economic studies confirm that ethical enterprises survive downturns far better than dishonest ones.',
						'Modern markets need clear consumer protection standards as well as strong personal conscience. Digital price displays, certified scales, and routine municipal inspections ensure fairness in daily transactions. Ultimately, genuine prosperity belongs to those who earn [[it]] through lawful effort and respect for customer rights.'
					],
					glossary: [
						{ term: 'tamper with', meaning: 'interfere with something to cause dishonesty' },
						{ term: 'downturns', meaning: 'periods of economic decline' }
					],
					tfItems: [
						{ q: 'Fair weights and truthful dealing build lasting customer confidence.', a: 'True', mark: '0.5' },
						{ q: 'Dishonest traders who hide expired stock usually keep a strong reputation.', a: 'False', c: 'Deception ruins the seller reputation permanently.', mark: '0.5' },
						{ q: 'Ethical businesses endure economic downturns better than dishonest ones.', a: 'True', mark: '0.5' },
						{ q: 'Certified scales are unnecessary in modern markets.', a: 'False', c: 'Certified scales and routine inspections help ensure fairness.', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) deception destroys a merchant reputation once exposed?\nb) municipal inspections and certified scales promote fair daily trade?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) What moral practices make buyers return to a merchant with confidence?\nb) Why does the success of short-sighted dishonest traders rarely last?\nc) Mention two modern measures that help guarantee fairness in markets.',
					whA: 'a) Giving exact weights, disclosing defects honestly, and avoiding price manipulation.\nb) Because once customers discover deception, word spreads quickly and ruins their reputation permanently.\nc) Digital price displays, certified scales, and routine municipal inspections (any two).',
					refQ: '4. What or who do the underlined words refer to in the text?\na) everyone (§1)   b) their (§2)   c) it (§3)',
					refA: 'a) everyone: merchants and buyers (all market participants) | b) their: short-sighted traders | c) it: genuine prosperity',
					easyQ: 'According to "Fair Weights and Honest Trade", what happens when customers discover a merchant deception?',
					easyCorrect: 'Word spreads quickly and ruins the seller reputation permanently',
					easyDistractors: [
						{ text: 'The merchant receives a municipal award', diagnosticFeedback: 'النص يذكر أن السمعة تتدمر نهائيا عند اكتشاف الغش.' },
						{ text: 'Customers buy even more expired stock', diagnosticFeedback: 'الزبائن يفقدون الثقة ويبتعدون عن التاجر الغشاش.' },
						{ text: 'Certified scales stop working', diagnosticFeedback: 'الموازين الموثقة وسيلة لحماية المستهلك في الفقرة الثالثة.' }
					],
					medQ: 'In paragraph 2, what does the possessive adjective "their" refer to?',
					medCorrect: 'short-sighted traders',
					medDistractors: [
						{ text: 'ethical enterprises', diagnosticFeedback: 'الجملة تتحدث عن التجار قصيري النظر الذين يتلاعبون بالموازين.' },
						{ text: 'economic studies', diagnosticFeedback: 'الدراسات وردت في آخر الفقرة لا قبل الضمير.' },
						{ text: 'certified scales', diagnosticFeedback: 'الموازين الموثقة وردت في الفقرة الثالثة.' }
					],
					hardQ: 'What is the overall message of "Fair Weights and Honest Trade"?',
					hardCorrect: 'Lasting economic prosperity requires both moral honesty and fair market oversight',
					hardDistractors: [
						{ text: 'Quick profits matter more than customer trust', diagnosticFeedback: 'النص يفند فكرة الربح السريع عبر الغش.' },
						{ text: 'Personal conscience is useless when inspections exist', diagnosticFeedback: 'النص يؤكد الحاجة للمعايير والضمير الحي معا.' },
						{ text: 'Deception helps businesses survive economic downturns', diagnosticFeedback: 'الشركات الأخلاقية هي الأقدر على الصمود في الأزمات.' }
					]
				},
				{
					title: 'Protecting Children from Unethical Labour',
					source: 'Adapted from Social Responsibility Journal',
					paragraphs: [
						'In several parts of the world, unethical workshops still employ young children for long hours in unsafe factories. Greedy employers hire [[them]] because children accept very low wages and cannot defend their legal rights. As a result, millions of boys and girls miss school and remain trapped in a cycle of poverty.',
						'Responsible enterprises refuse to cooperate with any supplier that violates labour ethics. Today, ethical companies inspect factories regularly and publish transparent supply-chain reports. [[This]] commitment proves that financial success does not require exploiting vulnerable human beings.',
						'Consumers also hold significant power to stop child labour. When shoppers choose certified ethical goods and boycott exploitative brands, manufacturers are forced to reform their practices. Every child deserves a safe classroom, proper healthcare, and a hopeful future free from [[it]].'
					],
					glossary: [
						{ term: 'vulnerable', meaning: 'weak and easily harmed' },
						{ term: 'boycott', meaning: 'refuse to buy from as a protest' }
					],
					tfItems: [
						{ q: 'Greedy workshops hire children mainly because they accept very low wages.', a: 'True', mark: '0.5' },
						{ q: 'Child labour helps children succeed in school and escape poverty.', a: 'False', c: 'Children miss school and remain trapped in poverty.', mark: '0.5' },
						{ q: 'Ethical enterprises inspect suppliers to make sure labour rules are respected.', a: 'True', mark: '0.5' },
						{ q: 'Consumers have no power to influence how companies treat workers.', a: 'False', c: 'Consumers can choose certified ethical goods and boycott exploitative brands.', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) ethical firms audit their suppliers and share supply-chain reports?\nb) shoppers can pressure companies by boycotting exploitative brands?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) Why do unethical employers prefer hiring young children?\nb) What do responsible enterprises do to avoid labour exploitation?\nc) How can ordinary consumers help end child labour?',
					whA: 'a) Because children accept very low wages and cannot defend their legal rights.\nb) They refuse to cooperate with unethical suppliers, inspect factories regularly, and publish transparent supply-chain reports.\nc) By choosing certified ethical goods and boycotting exploitative brands.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) them (§1)   b) This (§2)   c) it (§3)',
					refA: 'a) them: young children | b) This: inspecting factories and publishing transparent supply-chain reports | c) it: child labour (exploitation)',
					easyQ: 'According to "Protecting Children from Unethical Labour", why do children hired in workshops remain trapped in poverty?',
					easyCorrect: 'Because they miss school and lose the chance to build skills',
					easyDistractors: [
						{ text: 'Because they receive very high salaries', diagnosticFeedback: 'النص يؤكد أنهم يتقاضون أجوراً متدنية جدا.' },
						{ text: 'Because ethical companies refuse to educate them', diagnosticFeedback: 'الشركات الأخلاقية تحارب عمالة الأطفال لا العكس.' },
						{ text: 'Because classrooms are closed permanently', diagnosticFeedback: 'المشكلة في استغلالهم في الورش لا إغلاق المدارس.' }
					],
					medQ: 'In paragraph 1, what does the pronoun "them" refer to?',
					medCorrect: 'young children',
					medDistractors: [
						{ text: 'greedy employers', diagnosticFeedback: 'أصحاب العمل هم الفاعل في الجملة.' },
						{ text: 'unsafe factories', diagnosticFeedback: 'الضمير يعود على العاقل الذي يقبل الأجر الزهيد.' },
						{ text: 'responsible enterprises', diagnosticFeedback: 'الشركات المسؤولة وردت في الفقرة الثانية.' }
					],
					hardQ: 'What conclusion does the text reach about profit and human dignity?',
					hardCorrect: 'Financial success can and should be achieved without exploiting vulnerable people',
					hardDistractors: [
						{ text: 'Economic growth is impossible without child labour', diagnosticFeedback: 'الفقرة الثانية تنفي هذا الزعم صراحة.' },
						{ text: 'Supply-chain reports should remain confidential', diagnosticFeedback: 'النص يشيد بالتقارير الشفافة.' },
						{ text: 'Boycotting unethical brands has zero effect', diagnosticFeedback: 'المقاطعة تجبر المصنعين على إصلاح ممارساتهم.' }
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
				explanation: `Correct answer: ${qMap.ans}. Check the exact paragraph evidence.`
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
					'Match keywords in the questions with synonyms inside the passage.',
					'Give complete, concise answers to Wh-questions without copying whole paragraphs.',
					'Verify singular vs plural agreement when identifying pronoun references.'
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
	// 3. TEXT EXPLORATION (7 pts) — Providing that, I wish, High time, So/Such, Stress
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t1_expl_ethics_grammar',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (7 ن): الشرط والتمني والعتاب والنتيجة والنبر الصوتي',
		curriculumLessonId: 'eng_lesson_3as_sci_t1_wish_regret_high_time',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Match each word with its closest definition:\na) bribery   b) counterfeiting   c) integrity   d) transparency\nDefinitions: (1) imitating genuine goods illegally | (2) honesty and strong moral principles | (3) openness and clear accountability | (4) offering illegal money for favours',
					vocabA: 'a-4 (bribery) | b-1 (counterfeiting) | c-2 (integrity) | d-3 (transparency)',
					wordRows: [
						{ verb: { given: true, value: 'to corrupt' }, noun: { value: 'corruption', mark: '0.25' }, adjective: { value: 'corrupt / corruptive', mark: '0.25' } },
						{ verb: { value: 'to produce', mark: '0.25' }, noun: { given: true, value: 'production' }, adjective: { value: 'productive', mark: '0.25' } },
						{ verb: { value: 'to economize', mark: '0.25' }, noun: { value: 'economy', mark: '0.25' }, adjective: { given: true, value: 'economic' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) Honest business will flourish if and only if courts punish fraudsters.\n   b) Providing that ........................................................................\n2. a) He regrets signing the contract without reading its clauses.\n   b) He wishes ........................................................................\n3. a) Authorities should inspect markets more strictly now.\n   b) It is high time ........................................................................\n4. a) Counterfeit medicine is a very grave threat. Consequently, it kills thousands.\n   b) Counterfeit medicine is such ........................................................................',
					rewriteA:
						'1. b) Providing that courts punish fraudsters, honest business will flourish.\n2. b) He wishes he had not signed the contract without reading its clauses.\n3. b) It is high time authorities inspected markets more strictly.\n4. b) Counterfeit medicine is such a grave threat that it kills thousands.',
					stressIntro: '4. Classify the following words according to their stressed syllable: corruption, integrity, economics, morality',
					stressCols: [
						{ header: '2nd syllable from end', words: ['corruption', 'economics'], mark: '0.5' },
						{ header: '3rd syllable from end', words: ['integrity', 'morality'], mark: '0.5' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (laws - trust - ethical - fraud)\nBuilding a healthy economy depends on (1) ........ behaviour in every sector. When companies avoid (2) ........ and respect strict (3) ........, citizens gain lasting (4) ........ in national institutions.',
					gapA: '(1) ethical | (2) fraud | (3) laws | (4) trust',
					easyQ: 'Rewrite: "Governments should stop tax evasion now." Start with "It is high time":',
					easyCorrect: 'It is high time governments stopped tax evasion.',
					easyDistractors: [
						{ text: 'It is high time governments should stop tax evasion.', diagnosticFeedback: 'احذف should وحوّل الفعل إلى الماضي البسيط.' },
						{ text: 'It is high time governments stop tax evasion.', diagnosticFeedback: 'بعد It is high time + فاعل نستعمل Past Simple.' },
						{ text: 'It is high time governments have stopped tax evasion.', diagnosticFeedback: 'لا نستعمل Present Perfect بعد It is high time.' }
					],
					medQ: 'Rewrite: "She regrets buying a fake battery." Start with "She wishes":',
					medCorrect: 'She wishes she had not bought a fake battery.',
					medDistractors: [
						{ text: 'She wishes she did not buy a fake battery.', diagnosticFeedback: 'الندم على الماضي يأخذ Past Perfect لا Past Simple.' },
						{ text: 'She wishes she had bought a fake battery.', diagnosticFeedback: 'نسيت عكس الإثبات إلى نفي.' },
						{ text: 'She wishes she would not buy a fake battery.', diagnosticFeedback: 'would ليست للندم على حدث وقع في الماضي.' }
					],
					hardQ: 'Combine with "such...that": "Bribery is a dangerous disease. Therefore, it destroys public trust."',
					hardCorrect: 'Bribery is such a dangerous disease that it destroys public trust.',
					hardDistractors: [
						{ text: 'Bribery is so a dangerous disease that it destroys public trust.', diagnosticFeedback: 'مع الاسم المفرد المعدود نستعمل such a لا so a.' },
						{ text: 'Bribery is such dangerous disease that it destroys public trust.', diagnosticFeedback: 'الاسم المفرد المعدود disease يحتاج أداة التنكير a.' },
						{ text: 'Bribery is such a dangerous disease that therefore it destroys public trust.', diagnosticFeedback: 'يجب حذف therefore عند الدمج بـ such...that.' }
					]
				},
				{
					vocabQ: '1. Match each word with its closest synonym:\na) unethical   b) eradicate   c) genuine   d) profit\nSynonyms: (1) authentic | (2) immoral | (3) gain | (4) eliminate',
					vocabA: 'a-2 (immoral) | b-4 (eliminate) | c-1 (authentic) | d-3 (gain)',
					wordRows: [
						{ verb: { given: true, value: 'to deceive' }, noun: { value: 'deception', mark: '0.25' }, adjective: { value: 'deceptive', mark: '0.25' } },
						{ verb: { value: 'to protect', mark: '0.25' }, noun: { given: true, value: 'protection' }, adjective: { value: 'protective', mark: '0.25' } },
						{ verb: { value: 'to prosper', mark: '0.25' }, noun: { value: 'prosperity', mark: '0.25' }, adjective: { given: true, value: 'prosperous' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) Public institutions will thrive. Officials will work honestly.\n   b) Public institutions will thrive as long as ........................................................................\n2. a) Some merchants do not respect fair prices today.\n   b) I wish ........................................................................\n3. a) Consumers ought to verify product barcodes before paying.\n   b) It is about time ........................................................................\n4. a) The audit was very thorough. As a result, every hidden error appeared.\n   b) The audit was so ........................................................................',
					rewriteA:
						'1. b) Public institutions will thrive as long as officials work honestly.\n2. b) I wish some merchants respected fair prices.\n3. b) It is about time consumers verified product barcodes before paying.\n4. b) The audit was so thorough that every hidden error appeared.',
					stressIntro: '4. Classify the following words according to their stressed syllable: deception, prosperity, scientific, honesty',
					stressCols: [
						{ header: '2nd syllable from end', words: ['deception', 'scientific'], mark: '0.5' },
						{ header: '3rd syllable from end', words: ['prosperity', 'honesty'], mark: '0.5' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (consumers - fake - honest - punish)\nCourts must (1) ........ anyone who manufactures (2) ........ medicines. Protecting (3) ........ ensures that (4) ........ merchants can compete fairly.',
					gapA: '(1) punish | (2) fake | (3) consumers | (4) honest',
					easyQ: 'Where does the stress fall in "deception" and "scientific"?',
					easyCorrect: 'On the 2nd syllable from the end (penultimate)',
					easyDistractors: [
						{ text: 'On the last syllable', diagnosticFeedback: 'اللواحق -tion و -ic لا تُنبر أبدا.' },
						{ text: 'On the 3rd syllable from the end', diagnosticFeedback: 'الثالث من النهاية خاص بـ -ty و -cy و -al.' },
						{ text: 'On the first letter only', diagnosticFeedback: 'النبر يقع على المقطع قبل الأخير.' }
					],
					medQ: 'Rewrite: "Some firms do not pay taxes honestly." Start with "I wish":',
					medCorrect: 'I wish some firms paid taxes honestly.',
					medDistractors: [
						{ text: 'I wish some firms do not pay taxes honestly.', diagnosticFeedback: 'نرجع الزمن للماضي البسيط ونعكس النفي إلى إثبات.' },
						{ text: 'I wish some firms did not pay taxes honestly.', diagnosticFeedback: 'نسيت عكس النفي إلى إثبات.' },
						{ text: 'I wish some firms will pay taxes honestly.', diagnosticFeedback: 'لا نستخدم will بعد I wish.' }
					],
					hardQ: 'Combine with "as long as": "Trade will stay fair. Inspectors will monitor scales."',
					hardCorrect: 'Trade will stay fair as long as inspectors monitor scales.',
					hardDistractors: [
						{ text: 'Trade will stay fair as long as inspectors will monitor scales.', diagnosticFeedback: 'لا نضع will بعد as long as أبدا.' },
						{ text: 'Trade stays fair as long as inspectors will monitor scales.', diagnosticFeedback: 'will تكون في النتيجة لا في جملة الشرط.' },
						{ text: 'Trade will stay fair as long as inspectors monitored scales.', diagnosticFeedback: 'الشرط المستقبلي يأخذ المضارع البسيط لا الماضي.' }
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
				explanation: `Correct BAC transformation: ${qMap.ans}`
			};

			const sujetExercise: ExerciseBlock = {
				customTitle: 'Part One: B/ Text Exploration',
				points: 7,
				instruction: 'Answer all language, morphology, phonology, and discourse tasks carefully.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building chart:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.stressIntro },
					buildEnglishPhonologyTableBlock({ columns: v.stressCols }),
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
					'For Providing that / As long as, use Present Simple in the condition clause and will + stem in the result.',
					'For I wish (past regret), use had/had not + Past Participle; for It is high time, drop should and use Past Simple.',
					'Words ending in -tion/-ic/-ics take stress on the 2nd syllable from the end; -ty takes stress on the 3rd from the end.'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (7 pts) — Prefixes, Had better, Passive, Cause, Syllables
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t1_expl_ethics_passive',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'vocabulary_morphology',
		titleAr: 'البناء اللغوي (7 ن): الأضداد والمبني للمجهول و Had better وعدد المقاطع',
		curriculumLessonId: 'eng_lesson_3as_sci_t1_morphology_stress_ethics',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Form the opposites of the following words keeping the same root (add a negative prefix):\na) legal   b) honest   c) moral   d) responsible',
					vocabA: 'a) illegal | b) dishonest | c) immoral | d) irresponsible',
					wordRows: [
						{ verb: { given: true, value: 'to legalize' }, noun: { value: 'legality', mark: '0.25' }, adjective: { value: 'legal', mark: '0.25' } },
						{ verb: { value: 'to regulate', mark: '0.25' }, noun: { given: true, value: 'regulation' }, adjective: { value: 'regulatory', mark: '0.25' } },
						{ verb: { value: 'to respect', mark: '0.25' }, noun: { value: 'respect', mark: '0.25' }, adjective: { given: true, value: 'respectful' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) Shoppers should not buy medicines from street stalls.\n   b) Shoppers had better ........................................................................\n2. a) Customs officers seized thousands of fake parts yesterday.\n   b) Thousands of fake parts ........................................................................\n3. a) The firm lost clients because its managers were dishonest.\n   b) The firm lost clients because of ........................................................................\n4. a) Companies must adopt clear ethical codes.\n   b) Clear ethical codes ........................................................................',
					rewriteA:
						'1. b) Shoppers had better not buy medicines from street stalls.\n2. b) Thousands of fake parts were seized by customs officers yesterday.\n3. b) The firm lost clients because of its managers dishonesty (or: dishonest managers).\n4. b) Clear ethical codes must be adopted by companies.',
					sylIntro: '4. Classify the following words according to the number of their syllables: fraud, ethical, bribery, transparency',
					sylCols: [
						{ header: '1 syllable', words: ['fraud'], mark: '0.25' },
						{ header: '3 syllables', words: ['ethical', 'bribery'], mark: '0.5' },
						{ header: '4 syllables', words: ['transparency'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (strict - quality - honest - consumers)\nWhen businesses deliver high (1) ........ goods and treat (2) ........ fairly, everyone wins. However, (3) ........ rules are vital to protect (4) ........ competition.',
					gapA: '(1) quality | (2) consumers | (3) strict | (4) honest',
					easyQ: 'What is the correct negative prefix for the adjectives "legal" and "responsible"?',
					easyCorrect: 'il- (illegal) and ir- (irresponsible)',
					easyDistractors: [
						{ text: 'un- (unlegal) and dis- (disresponsible)', diagnosticFeedback: 'قبل l نستعمل il- وقبل r نستعمل ir-.' },
						{ text: 'in- (inlegal) and im- (imresponsible)', diagnosticFeedback: 'البادئة im- تأتي قبل m و p و b.' },
						{ text: 'dis- (dislegal) and un- (unresponsible)', diagnosticFeedback: 'راجع قاعدة الحرف الأول للبادئات السالبة.' }
					],
					medQ: 'Rewrite in the passive: "Customs officers seized thousands of fake parts yesterday."',
					medCorrect: 'Thousands of fake parts were seized by customs officers yesterday.',
					medDistractors: [
						{ text: 'Thousands of fake parts was seized by customs officers yesterday.', diagnosticFeedback: 'الفاعل الجديد جمع (Thousands) فيأخذ were لا was.' },
						{ text: 'Thousands of fake parts are seized by customs officers yesterday.', diagnosticFeedback: 'الفعل الأصلي ماضٍ بسيط (yesterday) فنستعمل were.' },
						{ text: 'Thousands of fake parts were seizing by customs officers yesterday.', diagnosticFeedback: 'المبني للمجهول يأخذ Past Participle (seized).' }
					],
					hardQ: 'How many syllables are in the word "transparency" (trans-par-en-cy)?',
					hardCorrect: '4 syllables',
					hardDistractors: [
						{ text: '2 syllables', diagnosticFeedback: 'عدّ أصوات العلة المنطوقة: trans / par / en / cy.' },
						{ text: '3 syllables', diagnosticFeedback: 'الكلمة تحوي أربعة مقاطع منطوقة.' },
						{ text: '5 syllables', diagnosticFeedback: 'أربعة مقاطع فقط: trans-par-en-cy.' }
					]
				},
				{
					vocabQ: '1. Form the opposites of the following words using negative prefixes:\na) ethical   b) fair   c) loyal   d) possible',
					vocabA: 'a) unethical | b) unfair | c) disloyal | d) impossible',
					wordRows: [
						{ verb: { given: true, value: 'to invest' }, noun: { value: 'investment', mark: '0.25' }, adjective: { value: 'invested / investable', mark: '0.25' } },
						{ verb: { value: 'to certify', mark: '0.25' }, noun: { given: true, value: 'certification' }, adjective: { value: 'certified', mark: '0.25' } },
						{ verb: { value: 'to trust', mark: '0.25' }, noun: { value: 'trust', mark: '0.25' }, adjective: { given: true, value: 'trustworthy' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) Merchants should declare their real revenue to tax offices.\n   b) Merchants had better ........................................................................\n2. a) Inspectors have discovered a network of counterfeit factories.\n   b) A network of counterfeit factories ........................................................................\n3. a) Honest firms grew quickly because consumers trusted their quality.\n   b) Honest firms grew quickly due to ........................................................................\n4. a) Public institutions are auditing all financial records.\n   b) All financial records ........................................................................',
					rewriteA:
						'1. b) Merchants had better declare their real revenue to tax offices.\n2. b) A network of counterfeit factories has been discovered by inspectors.\n3. b) Honest firms grew quickly due to consumer trust in their quality.\n4. b) All financial records are being audited by public institutions.',
					sylIntro: '4. Classify the following words according to the number of their syllables: trade, audit, illegal, accountability',
					sylCols: [
						{ header: '1 syllable', words: ['trade'], mark: '0.25' },
						{ header: '2 syllables', words: ['audit'], mark: '0.25' },
						{ header: '3+ syllables', words: ['illegal', 'accountability'], mark: '0.5' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (audit - transparency - society - bribery)\nTo eliminate (1) ........, institutions must practice full (2) ........ . Every annual (3) ........ strengthens trust across the entire (4) ........ .',
					gapA: '(1) bribery | (2) transparency | (3) audit | (4) society',
					easyQ: 'Rewrite with "had better": "Merchants should declare their real revenue."',
					easyCorrect: 'Merchants had better declare their real revenue.',
					easyDistractors: [
						{ text: 'Merchants had better to declare their real revenue.', diagnosticFeedback: 'لا نضع to بعد had better.' },
						{ text: 'Merchants had better declared their real revenue.', diagnosticFeedback: 'بعد had better نضع المصدر المجرد declare.' },
						{ text: 'Merchants had better declaring their real revenue.', diagnosticFeedback: 'لا نضع V-ing بعد had better.' }
					],
					medQ: 'Rewrite in the passive: "Public institutions are auditing all financial records."',
					medCorrect: 'All financial records are being audited by public institutions.',
					medDistractors: [
						{ text: 'All financial records are audited by public institutions.', diagnosticFeedback: 'حافظ على زمن المضارع المستمر بإضافة being.' },
						{ text: 'All financial records were being audited by public institutions.', diagnosticFeedback: 'الجملة الأصلية في المضارع المستمر لا الماضي.' },
						{ text: 'All financial records is being audited by public institutions.', diagnosticFeedback: 'الفاعل الجديد جمع (records) فيأخذ are.' }
					],
					hardQ: 'Rewrite in the passive: "Inspectors have discovered a network of counterfeit factories."',
					hardCorrect: 'A network of counterfeit factories has been discovered by inspectors.',
					hardDistractors: [
						{ text: 'A network of counterfeit factories have been discovered by inspectors.', diagnosticFeedback: 'نواة الفاعل الجديد مفردة (A network) فتأخذ has been.' },
						{ text: 'A network of counterfeit factories was discovered by inspectors.', diagnosticFeedback: 'الجملة الأصلية Present Perfect فيجب الحفاظ على الزمن.' },
						{ text: 'A network of counterfeit factories has discovered by inspectors.', diagnosticFeedback: 'نسيت been الضرورية للمبني للمجهول في التام.' }
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
				instruction: 'Answer all morphology, grammar, phonology, and gap-fill activities.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building table:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.sylIntro },
					buildEnglishPhonologyTableBlock({ columns: v.sylCols }),
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
					'Remember negative prefix rules: il+l, im+m/p/b, ir+r, dis+honest/loyal.',
					'In passive voice, keep the exact tense and match singular/plural with the new subject.',
					'Count syllables by pronounced vowel sounds, not silent final letters like -e.'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts) — Ethics in Business & Integrity Essay
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t1_written_ethics',
		grade: '3as_se',
		trimesterId: 't1',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 ن): محاربة التزوير ونشر الأمانة والنزاهة في الأعمال',
		curriculumLessonId: 'eng_lesson_3as_sci_t1_had_better_so_such',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					topicOnePrompt:
						'Counterfeit products have invaded many markets and endangered consumers. Write a short article of about 80 to 120 words for your school magazine explaining the dangers of counterfeiting and suggesting effective solutions.',
					topicOneNotes: [
						'Health and safety risks: fake medicines and defective car parts',
						'Economic harm: honest companies lose revenue and jobs',
						'Strict enforcement: customs inspections and heavy fines on fraudsters',
						'Consumer role: check quality labels and boycott fake goods'
					],
					topicTwoPrompt:
						'Some people claim that dishonesty brings fast financial success, while others insist that ethics and integrity are essential for lasting prosperity. Write a composition of about 80 to 120 words expressing your point of view with clear arguments.',
					modelAnswer:
						'Counterfeiting has become a serious threat that harms both public health and national economies. First, fake medicines and defective spare parts endanger innocent lives every day because they fail basic safety tests. Moreover, imitation products reduce the revenue of honest enterprises, leading to job losses and lower tax income. To solve this problem, governments had better enforce strict customs controls and impose severe fines on counterfeiters. In addition, consumers must check official quality labels and refuse to buy suspiciously cheap items. To sum up, honest trade will prosper provided that authorities and citizens unite to reject counterfeiting completely.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'In a BAC essay on fighting counterfeiting, which sentence makes the BEST clear thesis statement?',
					easyCorrect: 'Counterfeiting is a grave threat to public safety and honest trade that requires firm action.',
					easyDistractors: [
						{ text: 'I went shopping yesterday with my friend.', diagnosticFeedback: 'جملة شخصية لا تصلح أطروحة لمقال رسمي حول التقليد.' },
						{ text: 'Fake medicines, car parts, fines, labels.', diagnosticFeedback: 'هذه مجرد كلمات متناثرة وليست جملة تامة.' },
						{ text: 'Everyone loves cheap products without labels.', diagnosticFeedback: 'تخالف فكرة المقال التحذيرية من المنتجات المقلدة.' }
					],
					medQ: 'Which linker best introduces a practical solution after explaining the harms of counterfeiting?',
					medCorrect: 'To solve this problem, authorities had better enforce strict customs controls.',
					medDistractors: [
						{ text: 'Once upon a time, authorities enforced customs controls.', diagnosticFeedback: 'عبارة سرد قصصي غير مناسبة لمقال علمي/اجتماعي.' },
						{ text: 'Despite authorities enforce customs controls.', diagnosticFeedback: 'خطأ نحوي لأن Despite لا تتبعها جملة فعلية مباشرة.' },
						{ text: 'Because of authorities enforced customs controls.', diagnosticFeedback: 'خطأ نحوي لأن Because of لا تتبعها جملة فعلية.' }
					],
					hardQ: 'Which concluding sentence integrates a Unit 1 grammar structure accurately?',
					hardCorrect: 'To sum up, honest trade will prosper provided that every citizen rejects counterfeit goods.',
					hardDistractors: [
						{ text: 'To sum up, honest trade will prosper provided that every citizen will reject counterfeit goods.', diagnosticFeedback: 'لا نضع will بعد provided that.' },
						{ text: 'To sum up, it is high time citizens reject counterfeit goods.', diagnosticFeedback: 'بعد It is high time + فاعل نحتاج الماضي البسيط rejected.' },
						{ text: 'To sum up, citizens had better not to buy counterfeit goods.', diagnosticFeedback: 'لا نضع to بعد had better not.' }
					]
				},
				{
					topicOnePrompt:
						'Academic and business integrity are essential for building a trustworthy society. Write a composition of about 80 to 120 words on why honesty matters at school and in the workplace, and how to promote ethical behaviour.',
					topicOneNotes: [
						'Honesty in exams builds genuine knowledge and fair evaluation',
						'Integrity in business creates lasting customer trust and loyalty',
						'Role of families and schools in teaching moral values early',
						'Clear rules and fair rewards for ethical citizens'
					],
					topicTwoPrompt:
						'Bribery and nepotism weaken public institutions and discourage talented youth. Write a short essay of about 80 to 120 words showing the negative effects of corruption and how transparency can restore justice.',
					modelAnswer:
						'Honesty is the cornerstone of both educational excellence and sustainable business success. First, students who reject cheating in exams acquire real skills and earn respected qualifications through sincere effort. Similarly, merchants and managers who deal fairly build lasting loyalty with their customers and partners. To promote ethical conduct across society, families and schools ought to cultivate integrity and accountability from childhood. Furthermore, institutions should apply transparent rules and reward hard work rather than favouritism. In conclusion, it is high time every individual practised honesty daily so that our entire community can flourish with dignity.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'What is the recommended length for a 3AS BAC Scientific Written Expression essay?',
					easyCorrect: 'About 80 to 120 words organized into clear paragraphs',
					easyDistractors: [
						{ text: 'Two short bullet points only', diagnosticFeedback: 'العوارض غير مقبولة في التعبير الكتابي.' },
						{ text: 'A single 20-word sentence', diagnosticFeedback: 'قصير جدا ولا يغطي الأفكار المطلوبة.' },
						{ text: 'Copying the entire reading comprehension passage', diagnosticFeedback: 'نسخ نص الفهم يؤدي إلى الصفر في التعبير الكتابي.' }
					],
					medQ: 'How should the note "Integrity in business / lasting customer trust" be expanded in a BAC essay?',
					medCorrect: 'Moreover, practicing integrity in business builds lasting customer trust and commercial stability.',
					medDistractors: [
						{ text: '- Integrity in business - lasting customer trust.', diagnosticFeedback: 'يجب تحويل النقاط إلى جمل كاملة مترابطة لا عوارض.' },
						{ text: 'Integrity business lasting trust customer.', diagnosticFeedback: 'تفتقر الجملة للفعل وللسلامة النحوية.' },
						{ text: 'Because integrity in business, lasting customer trust.', diagnosticFeedback: 'جملة غير مكتملة نحويا.' }
					],
					hardQ: 'Which concluding sentence uses "It is high time" with 100% grammatical accuracy?',
					hardCorrect: 'In conclusion, it is high time every individual practised honesty in study and work.',
					hardDistractors: [
						{ text: 'In conclusion, it is high time every individual must practise honesty.', diagnosticFeedback: 'يجب حذف must وتحويل الفعل للماضي البسيط.' },
						{ text: 'In conclusion, it is high time every individual practises honesty.', diagnosticFeedback: 'بعد It is high time + فاعل نستخدم الماضي البسيط (practised).' },
						{ text: 'In conclusion, it is high time every individual will practise honesty.', diagnosticFeedback: 'لا نضع will بعد It is high time.' }
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
					'Choose Topic One (Guided) if you want structured ideas ready to expand into paragraphs.',
					'Include at least two Unit 1 grammar structures (provided that, had better, it is high time, so...that).',
					'Use academic linkers (First, Moreover, Furthermore, In conclusion) and check spelling and punctuation.'
				],
				solutionStepsAr: [
					'Introduction: Define the ethical issue clearly in 2 sentences.',
					'Body: Expand all given notes into full sentences using logical linkers.',
					'Conclusion: End with a clear recommendation or condition for ethical progress.'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
