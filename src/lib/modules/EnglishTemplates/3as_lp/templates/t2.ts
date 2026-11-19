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

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — yearSubjectId: 770, coeff 3, 2h30, 7+8+5=20)
 * Parameterized Exam & Quiz Templates — Trimester 2: Unit 2 "Ill-Gotten Gains Never Prosper" (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (8 pts) + 1 written_expression (5 pts)
 */
export const TEMPLATES_3AS_LP_T2: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Counterfeiting, Bribery & Ethical Trade
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t2_comp_ethics_trade',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): مكافحة التزوير والرشوة وترسيخ أخلاقيات التجارة',
		curriculumLessonId: 'eng_lesson_3as_lp_t2_providing_that',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Why Counterfeit Goods Harm Everyone',
					source: 'Adapted from Consumer Ethics Review',
					paragraphs: [
						'Counterfeiting is the illegal production and sale of imitation goods under trusted brand names. At first glance, fake spare parts, cosmetics, or medicines may appear attractive because [[they]] are sold at much lower prices than authentic products.',
						'However, cheap imitations carry hidden dangers. Counterfeit medicines frequently contain useless or toxic substances that endanger patients lives, while fake brake pads and electrical cables cause severe accidents. In addition, counterfeiting destroys honest jobs and deprives states of tax revenue needed for hospitals and schools.',
						'Economists agree that counterfeiting will shrink providing that governments enforce strict border controls and consumers refuse to buy suspiciously cheap items. Choosing genuine goods is both a safety measure and a moral responsibility toward [[our]] community.'
					],
					glossary: [
						{ term: 'imitation', meaning: 'copied falsely to look original' },
						{ term: 'revenue', meaning: 'public income collected through taxes' }
					],
					tfItems: [
						{ q: 'Counterfeit goods often attract buyers initially because of their low prices.', a: 'True', mark: '0.5' },
						{ q: 'Fake medicines are just as safe as genuine certified medicines.', a: 'False', c: 'They frequently contain useless or toxic substances that endanger lives.', mark: '0.5' },
						{ q: 'Counterfeiting reduces tax revenue needed for public services.', a: 'True', mark: '0.5' },
						{ q: 'Consumers play no role in reducing counterfeit trade.', a: 'False', c: 'Consumers help shrink counterfeiting when they refuse to buy suspiciously cheap fake items.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Give two health or safety hazards caused by counterfeit items in paragraph 2.', a: 'Toxic fake medicines endanger patients lives, and fake brake pads or electrical cables cause severe accidents.', mark: '1' },
						{ q: 'b) How does counterfeiting harm public services like hospitals and schools?', a: 'It deprives states of tax revenue needed to fund them.', mark: '1' },
						{ q: 'c) Under what two conditions will counterfeiting shrink?', a: 'Providing that governments enforce strict border controls and consumers refuse to buy suspiciously cheap fake items.', mark: '1' }
					],
					refQuestion: 'a) "they" (§1)   b) "our" (§3)',
					refAnswer: 'a) "they" refers to fake spare parts, cosmetics, or medicines (counterfeit goods).   b) "our" refers to citizens / consumers (the author and readers).',
					bestTitle: 'The Hidden Dangers of Counterfeiting and How to Fight It',
					titleOptions: [
						'The Hidden Dangers of Counterfeiting and How to Fight It',
						'How to Lower Prices in Modern Supermarkets',
						'The History of Ancient Sea Navigation'
					],
					easyQ: 'Why do counterfeit items seem attractive to some buyers at first glance?',
					easyAns: 'Because they are sold at much lower prices than authentic products',
					easyWrong: [
						'Because they last longer than genuine items',
						'Because doctors recommend fake medicines',
						'Because they increase public tax revenue'
					],
					medQ: 'What does the pronoun "they" in paragraph 1 refer to?',
					medAns: 'Fake spare parts, cosmetics, or medicines (counterfeit goods)',
					medWrong: ['Trusted brand names', 'Border controls', 'Hospitals and schools'],
					hardQ: 'What joint strategy is proposed in paragraph 3 to curb counterfeiting?',
					hardAns: 'Strict government border enforcement combined with conscious consumer boycott',
					hardWrong: [
						'Lowering safety standards for all factories',
						'Allowing unlabeled products in local markets',
						'Eliminating taxes on imported goods'
					]
				},
				{
					title: 'Honesty and Trust: Foundations of Lasting Commerce',
					source: 'Adapted from Principles of Ethical Enterprise',
					paragraphs: [
						'Throughout history, thriving markets have depended on one indispensable pillar: trust. When traders measure accurately, disclose product defects honestly, and honour written contracts, [[their]] businesses earn lasting loyalty and true blessing.',
						'By contrast, bribery, embezzlement, and false invoicing create rapid but fragile wealth. Companies built on fraud soon lose public confidence, face legal prosecution, and collapse under scandals. Indeed, ill-gotten gains never prosper in the long run.',
						'It is high time business schools and chambers of commerce trained young entrepreneurs in ethical codes alongside accounting skills. Transparent practices benefit investors, protect workers, and strengthen [[the entire economy]].'
					],
					glossary: [
						{ term: 'disclose', meaning: 'reveal openly and honestly' },
						{ term: 'embezzlement', meaning: 'theft of funds placed in one trust' }
					],
					tfItems: [
						{ q: 'Trust and honesty are essential pillars of lasting commercial success.', a: 'True', mark: '0.5' },
						{ q: 'Dishonest merchants should hide product defects from buyers.', a: 'False', c: 'Honest traders disclose product defects and honour contracts.', mark: '0.5' },
						{ q: 'Wealth gained through bribery and fraud is fragile and leads to scandals.', a: 'True', mark: '0.5' },
						{ q: 'Business schools should teach accounting without mentioning ethics.', a: 'False', c: 'They should train young entrepreneurs in ethical codes alongside accounting skills.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Mention two ethical habits of trustworthy merchants in paragraph 1.', a: 'Any two of: measuring accurately, disclosing product defects honestly, and honouring written contracts.', mark: '1' },
						{ q: 'b) What consequences do corrupt companies eventually face?', a: 'They lose public confidence, face legal prosecution, and collapse under scandals.', mark: '1' },
						{ q: 'c) Who benefits from transparent business practices according to paragraph 3?', a: 'Investors, workers, and the entire economy.', mark: '1' }
					],
					refQuestion: 'a) "their" (§1)   b) "the entire economy" (§3)',
					refAnswer: 'a) "their" refers to honest traders.   b) "the entire economy" refers to the national economic system as a whole.',
					bestTitle: 'Why Ethical Conduct Sustains True Prosperity',
					titleOptions: [
						'Why Ethical Conduct Sustains True Prosperity',
						'Fast Ways to Hide Tax Invoices',
						'A Guide to Ancient Pottery Trade'
					],
					easyQ: 'According to paragraph 1, what is the indispensable pillar of thriving markets?',
					easyAns: 'Trust',
					easyWrong: ['False invoicing', 'Bribery', 'Secret contracts'],
					medQ: 'What does "their" in paragraph 1 refer to?',
					medAns: 'Honest traders',
					medWrong: ['Written contracts', 'Business schools', 'Corrupt companies'],
					hardQ: 'What does the proverb "ill-gotten gains never prosper" mean in the context of paragraph 2?',
					hardAns: 'Wealth obtained through fraud or bribery is unstable and ends in ruin and scandal',
					hardWrong: [
						'Honest trade never generates sufficient profit',
						'Accounting skills are unnecessary for entrepreneurs',
						'Small shops cannot compete with honest firms'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع الفقرة الأولى من النص للتحقق من الجواب الصريح.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الإجابة الصحيحة من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصريحة من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تأكد من الاسم الذي يحيل إليه الضمير في نفس الفقرة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reference Check ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد المرجع الصحيح للضمير:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المرجع الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة بتمعن واستنتج الرسالة الأخلاقية والاقتصادية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analytical Comprehension ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج المعنى العميق من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعنى التحليلي الدقيق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities:',
				content: [
					buildEnglishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the right answer. The text is:',
								options: ['Expository and argumentative', 'A biographical narrative', 'A travel diary'],
								correct: 'Expository and argumentative',
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Answer the following questions according to the text:\n${chosen.whQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.whQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. What or who do the underlined words refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the most appropriate title for the text:',
								options: chosen.titleOptions,
								correct: chosen.bestTitle,
								mark: '0.5'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع أضرار الغش والتزوير في الفقرة الثانية والحلول المقترحة في الفقرة الثالثة.',
					'برّر تصحيح العبارات الخاطئة بجملة موجزة من النص.',
					'تأكد من مطابقة الضمائر الإحالية للمرجع السابق في العدد.'
				],
				solutionStepsAr: [
					'تحديد نوع النص التفسيري الحجاجي (0.5 نقطة).',
					'الإجابة عن الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة عن أسئلة الفهم الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان المناسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Fighting Child Labour & Workplace Accountability
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t2_comp_child_labour_integrity',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): حماية الطفولة من عمالة الأطفال والمساءلة الأخلاقية',
		curriculumLessonId: 'eng_lesson_3as_lp_t2_wish_high_time',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Ending Child Labour Through Education and Ethics',
					source: 'Adapted from Social Justice & Ethics Reports',
					paragraphs: [
						'Across several developing regions, millions of young children are still forced into workshops, mines, and fields instead of sitting in classrooms. Because [[their]] families face severe poverty, unscrupulous employers exploit youngsters for tiny wages and long exhausting hours.',
						'Child labour is such a grave injustice that it robs children of both their health and their future. Without basic literacy and vocational training, exploited youngsters remain trapped in lifelong poverty, passing hardship from one generation to the next.',
						'Eradicating this practice requires decisive action. Authorities had better inspect factories regularly and penalize violators heavily, while communities support needy families so that every child can attend school safely. Protecting [[youngsters]] is the truest measure of a moral society.'
					],
					glossary: [
						{ term: 'unscrupulous', meaning: 'having no moral principles; dishonest' },
						{ term: 'penalize', meaning: 'punish legally by fines or sanctions' }
					],
					tfItems: [
						{ q: 'Poverty pushes some families to allow their children to work instead of studying.', a: 'True', mark: '0.5' },
						{ q: 'Exploited child workers receive fair wages and short hours.', a: 'False', c: 'Unscrupulous employers exploit them for tiny wages and long exhausting hours.', mark: '0.5' },
						{ q: 'Child labour keeps generations trapped in poverty by denying education.', a: 'True', mark: '0.5' },
						{ q: 'Factory inspections and family support help eradicate child labour.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Why do unscrupulous employers hire young children?', a: 'To exploit them for tiny wages and long exhausting hours.', mark: '1' },
						{ q: 'b) What long-term harm does child labour cause to youngsters?', a: 'It robs them of their health, education, and future, trapping them in lifelong poverty.', mark: '1' },
						{ q: 'c) Mention two solutions recommended in paragraph 3.', a: 'Regular factory inspections with heavy penalties for violators, and supporting needy families so children can attend school.', mark: '1' }
					],
					refQuestion: 'a) "their" (§1)   b) "youngsters" (§3)',
					refAnswer: 'a) "their" refers to young children.   b) "youngsters" refers to children (working children / young people).',
					bestTitle: 'Protecting Children From Exploitation Through Schooling',
					titleOptions: [
						'Protecting Children From Exploitation Through Schooling',
						'How Factories Increase Night Shifts',
						'A History of Mining Equipment'
					],
					easyQ: 'Where should young children be instead of workshops and mines according to paragraph 1?',
					easyAns: 'Sitting in classrooms (at school)',
					easyWrong: ['Working in factories', 'Managing trade ports', 'Inspecting warehouses'],
					medQ: 'What does "their" in paragraph 1 refer to?',
					medAns: 'Young children',
					medWrong: ['Unscrupulous employers', 'Mines and fields', 'Local authorities'],
					hardQ: 'Why does the author call child labour a cycle across generations?',
					hardAns: 'Because denying children literacy and training traps them in lifelong poverty as adults',
					hardWrong: [
						'Because all employers donate to village schools',
						'Because child workers earn high salaries early',
						'Because inspections happen every single morning'
					]
				},
				{
					title: 'Accountability and Whistleblowing in Public Institutions',
					source: 'Adapted from Civic Integrity Digest',
					paragraphs: [
						'Public trust in any institution grows when officials are held accountable for every dinar they manage. Transparent budgets, independent audits, and open bidding ensure that public contracts are awarded based on merit rather than nepotism or secret bribes.',
						'Equally vital is protecting honest employees who report misconduct. When ethical workers dare to expose forged invoices or unsafe practices, [[they]] safeguard public funds and sometimes even save human lives.',
						'Consequently, laws must shield responsible whistleblowers from retaliation. As long as accountability is enforced fairly at every level, public institutions will deliver efficient services and earn lasting respect from [[citizens]].'
					],
					glossary: [
						{ term: 'nepotism', meaning: 'unfair favouritism shown to relatives or friends' },
						{ term: 'retaliation', meaning: 'unfair punishment or revenge against someone who spoke the truth' }
					],
					tfItems: [
						{ q: 'Open bidding and independent audits help award contracts on merit.', a: 'True', mark: '0.5' },
						{ q: 'Nepotism improves fairness in public institutions.', a: 'False', c: 'Contracts should be awarded on merit rather than nepotism or bribes.', mark: '0.5' },
						{ q: 'Reporting forged invoices and unsafe practices helps protect public funds.', a: 'True', mark: '0.5' },
						{ q: 'Laws should protect responsible whistleblowers from unfair retaliation.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Name two mechanisms that ensure public contracts are awarded fairly.', a: 'Any two of: transparent budgets, independent audits, and open bidding.', mark: '1' },
						{ q: 'b) How do honest employees who expose misconduct help society?', a: 'They safeguard public funds and sometimes even save human lives.', mark: '1' },
						{ q: 'c) What condition is needed for public institutions to earn lasting respect?', a: 'Accountability must be enforced fairly at every level.', mark: '1' }
					],
					refQuestion: 'a) "they" (§2)   b) "citizens" (§3)',
					refAnswer: 'a) "they" refers to ethical workers (honest employees).   b) "citizens" refers to the members of the public served by institutions.',
					bestTitle: 'Building Public Trust Through Transparency and Accountability',
					titleOptions: [
						'Building Public Trust Through Transparency and Accountability',
						'Why Secret Contracts Save Time',
						'Traditional Crafts in Mountain Villages'
					],
					easyQ: 'On what basis should public contracts be awarded according to paragraph 1?',
					easyAns: 'On merit',
					easyWrong: ['On nepotism', 'On secret bribes', 'On family connections'],
					medQ: 'Who does "they" in paragraph 2 refer to?',
					medAns: 'Ethical workers who expose misconduct',
					medWrong: ['Forged invoices', 'Secret bribes', 'Public contracts'],
					hardQ: 'What legal safeguard is emphasized in paragraph 3?',
					hardAns: 'Shielding responsible whistleblowers from retaliation while enforcing fair accountability',
					hardWrong: [
						'Eliminating independent audits to speed up spending',
						'Punishing workers who report forged invoices',
						'Keeping public budgets completely confidential'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع الفقرة الأولى من النص؛ الإجابة مذكورة بوضوح.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'عد إلى الجملة السابقة للضمير وحدد المرجع الجمع العاقل.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reference Check ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد مرجع الضمير بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الضمير يعود على: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من العلاقة السببية والحلول الأخلاقية المطروحة في النص.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Inference ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الفكرة التحليلية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities:',
				content: [
					buildEnglishPassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						source: chosen.source,
						numberedParagraphs: true,
						glossary: chosen.glossary
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the correct answer. The text is:',
								options: ['An article on social ethics', 'A fictional adventure', 'A personal invitation'],
								correct: 'An article on social ethics',
								mark: '0.5'
							}
						]
					},
					{
						type: 'true_false',
						items: chosen.tfItems
					},
					{
						type: 'text',
						content: `3. Answer the following questions according to the text:\n${chosen.whQuestions.map((x) => x.q).join('\n')}`,
						answer: chosen.whQuestions.map((x) => `${x.q.slice(0, 2)} ${x.a}`).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. What or who do the underlined words refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the best title for the passage:',
								options: chosen.titleOptions,
								correct: chosen.bestTitle,
								mark: '0.5'
							}
						]
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'توقف عند كلمات الربط مثل Because و Consequently لتحديد الأسباب والنتائج.',
					'لا تنسَ كتابة التصحيح عند الإجابة بـ False.',
					'في سؤال الإحالة تحقق من سياق الجملة السابقة للضمير.'
				],
				solutionStepsAr: [
					'تحديد نوع المقال الأخلاقي الاجتماعي (0.5 نقطة).',
					'تصنيف عبارات الصواب والخطأ مع التعليل (2 نقطتان).',
					'الإجابة المركزة عن أسئلة الفهم الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان الأنسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (8 pts): Providing that, I wish, It is high time, Had better & Syllables
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t2_exp_wish_hightime_cond',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (8 نقاط): Providing that / I wish / It is high time وعدد المقاطع الصوتية',
		curriculumLessonId: 'eng_lesson_3as_lp_t2_wish_high_time',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Match each term with its definition: a) bribery   b) counterfeiting   c) integrity\n(1. moral honesty and uprightness   2. offering illegal money for favour   3. making fake copies of genuine goods)',
					lexisAnswer: 'a - 2   |   b - 3   |   c - 1',
					morphRows: [
						{ verb: { given: true, value: 'to corrupt' }, noun: { value: 'corruption', mark: '0.25' }, adjective: { value: 'corrupt', mark: '0.25' } },
						{ verb: { value: 'to deceive', mark: '0.25' }, noun: { given: true, value: 'deception' }, adjective: { value: 'deceptive', mark: '0.25' } },
						{ verb: { value: 'to legislate', mark: '0.25' }, noun: { value: 'legislation', mark: '0.25' }, adjective: { given: true, value: 'legal' } }
					],
					rewrites: [
						{
							prompt: '1) a) Authorities should penalize dishonest merchants immediately.\n   b) It is high time ..............................................................',
							answer: '1) b) It is high time authorities penalized dishonest merchants immediately.'
						},
						{
							prompt: '2) a) He regrets having accepted a bribe last year.\n   b) He wishes ....................................................................',
							answer: '2) b) He wishes he had not accepted a bribe last year.'
						},
						{
							prompt: '3) a) Combine with (providing that): Citizens boycott fake goods. Counterfeiting will decline.',
							answer: '3) b) Counterfeiting will decline providing that citizens boycott fake goods.'
						}
					],
					sylWords: 'fraud - honest - corruption - integrity',
					sylCols: [
						{ header: '1 Syllable', words: ['fraud'], mark: '0.25' },
						{ header: '2 Syllables', words: ['honest'], mark: '0.25' },
						{ header: '3 Syllables', words: ['corruption'], mark: '0.25' },
						{ header: '4 Syllables', words: ['integrity'], mark: '0.25' }
					],
					clozeWords: 'laws - honesty - markets - bribery',
					clozePrompt: 'Ethical trade requires both strict (1) .......... and personal (2) .......... . When citizens reject (3) .......... , national (4) .......... flourish fairly.',
					clozeAnswer: '1) laws   2) honesty   3) bribery   4) markets',
					easyQ: 'How many syllables are in the word "fraud"?',
					easyAns: '1 syllable',
					easyWrong: ['2 syllables', '3 syllables', '4 syllables'],
					medQ: 'Rewrite correctly: Authorities should penalize dishonest merchants. Complete: It is high time authorities .......... dishonest merchants.',
					medAns: 'penalized',
					medWrong: ['should penalize', 'penalize', 'will penalize'],
					hardQ: 'Rewrite accurately: He regrets having accepted a bribe last year.',
					hardAns: 'He wishes he had not accepted a bribe last year.',
					hardWrong: [
						'He wishes he did not accept a bribe last year.',
						'He wishes he had accepted a bribe last year.',
						'He wishes he has not accepted a bribe last year.'
					]
				},
				{
					lexisPrompt: 'Give opposites keeping the same root: honest / legal / ethical / responsible',
					lexisAnswer: 'dishonest / illegal / unethical / irresponsible',
					morphRows: [
						{ verb: { given: true, value: 'to forge' }, noun: { value: 'forgery', mark: '0.25' }, adjective: { value: 'forged', mark: '0.25' } },
						{ verb: { value: 'to protect', mark: '0.25' }, noun: { given: true, value: 'protection' }, adjective: { value: 'protective', mark: '0.25' } },
						{ verb: { value: 'to exploit', mark: '0.25' }, noun: { value: 'exploitation', mark: '0.25' }, adjective: { given: true, value: 'exploitative' } }
					],
					rewrites: [
						{
							prompt: '1) a) Consumers should not buy unlabeled medicine.\n   b) Consumers had better .........................................................',
							answer: '1) b) Consumers had better not buy unlabeled medicine.'
						},
						{
							prompt: '2) a) Child labour still exists in some factories today.\n   b) I wish child labour ..........................................................',
							answer: '2) b) I wish child labour did not exist in any factories today.'
						},
						{
							prompt: '3) a) Combine with (as long as): Inspectors audit firms transparently. Tax evasion will stop.',
							answer: '3) b) Tax evasion will stop as long as inspectors audit firms transparently.'
						}
					],
					sylWords: 'bribe - ethics - forgery - transparency',
					sylCols: [
						{ header: '1 Syllable', words: ['bribe'], mark: '0.25' },
						{ header: '2 Syllables', words: ['ethics'], mark: '0.25' },
						{ header: '3 Syllables', words: ['forgery'], mark: '0.25' },
						{ header: '4 Syllables', words: ['transparency'], mark: '0.25' }
					],
					clozeWords: 'trust - contracts - fraud - ethical',
					clozePrompt: 'Every (1) .......... company honours its (2) .......... and avoids (3) .......... . In this way, it earns lasting customer (4) .......... .',
					clozeAnswer: '1) ethical   2) contracts   3) fraud   4) trust',
					easyQ: 'How many syllables are in the word "bribe"?',
					easyAns: '1 syllable',
					easyWrong: ['2 syllables', '3 syllables', '4 syllables'],
					medQ: 'Choose the correct negative advice: Consumers .......... buy unlabeled medicine.',
					medAns: 'had better not',
					medWrong: ['had not better', 'had better not to', 'did not had better'],
					hardQ: 'Rewrite accurately for a present wish: Child labour still exists in some factories today.',
					hardAns: 'I wish child labour did not exist in any factories today.',
					hardWrong: [
						'I wish child labour does not exist in any factories today.',
						'I wish child labour had not existed today.',
						'I wish child labour will not exist today.'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تجاهل حرف e الصامت في النهاية واحسب أصوات العلة المنطوقة فقط.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر عدد المقاطع الصوتية الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `عدد المقاطع الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع قاعدة It is high time + Past Simple وقاعدة had better not + Stem.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الصيغة النحوية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصواب النحوي هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه: تمني الحاضر يأخذ Past Simple والندم على الماضي يأخذ Past Perfect مع عكس الإثبات والنفي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحويل الصحيح بصيغة التمني:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل الدقيق هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following language exploration activities carefully (8 pts — BAC LP):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building chart:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Rewrite sentence (b) so that it means the same as sentence (a):\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their number of syllables: (${chosen.sylWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.sylCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'grammar_syntax',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'احذف should عند التحويل إلى It is high time وصرف الفعل في Past Simple.',
					'مع I wish اعكس الإثبات إلى نفي والنفي إلى إثبات وارجع خطوة في الزمن.',
					'عدّ أصوات العلة المنطوقة فقط لحساب عدد المقاطع الصوتية.'
				],
				solutionStepsAr: [
					'حل سؤال المفردات أو الأضداد (1.5 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إعادة كتابة الجمل الثلاث بضبط الصيغ (3 نقاط).',
					'تصنيف المقاطع الصوتية وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (8 pts): Passive Voice, So/Such...that & Word Stress
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t2_exp_passive_result_stress',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'phonology_pronunciation',
		titleAr: 'البناء اللغوي (8 نقاط): المبني للمجهول، So/Such...that والنبر الصوتي (-tion, -ic, -ty)',
		curriculumLessonId: 'eng_lesson_3as_lp_t2_word_stress_syllables',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Find in the unit vocabulary words closest in meaning to: a) genuine = ..........   b) unlawful = ..........   c) punish = ..........',
					lexisAnswer: 'a) authentic / original   b) illegal / illicit   c) penalize / sanction',
					morphRows: [
						{ verb: { given: true, value: 'to imitate' }, noun: { value: 'imitation', mark: '0.25' }, adjective: { value: 'imitative', mark: '0.25' } },
						{ verb: { value: 'to produce', mark: '0.25' }, noun: { given: true, value: 'production' }, adjective: { value: 'productive', mark: '0.25' } },
						{ verb: { value: 'to verify', mark: '0.25' }, noun: { value: 'verification', mark: '0.25' }, adjective: { given: true, value: 'verified' } }
					],
					rewrites: [
						{
							prompt: '1) a) Customs officers seized two containers of fake spare parts yesterday.\n   b) Two containers of fake spare parts ...........................................',
							answer: '1) b) Two containers of fake spare parts were seized by customs officers yesterday.'
						},
						{
							prompt: '2) a) Governments must eradicate bribery in public contracts.\n   b) Bribery ......................................................................',
							answer: '2) b) Bribery must be eradicated in public contracts by governments.'
						},
						{
							prompt: '3) a) Combine with (such...that): Counterfeiting is a grave threat. Every country fights it.',
							answer: '3) b) Counterfeiting is such a grave threat that every country fights it.'
						}
					],
					stressWords: 'honesty - corruption - economic - integrity',
					stressCols: [
						{ header: '1st Syllable', words: ['honesty'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['corruption', 'integrity'], mark: '0.5' },
						{ header: '3rd Syllable', words: ['economic'], mark: '0.25' }
					],
					clozeWords: 'seized - safety - counterfeit - verified',
					clozePrompt: 'Last week, thousands of (1) .......... chargers were (2) .......... at the port. Every imported item must be (3) .......... to guarantee citizen (4) .......... .',
					clozeAnswer: '1) counterfeit   2) seized   3) verified   4) safety',
					easyQ: 'Where does the stress fall in the word "economic" (e-co-nom-ic)?',
					easyAns: '3rd syllable (NOM)',
					easyWrong: ['1st syllable (E)', '2nd syllable (co)', '4th syllable (ic)'],
					medQ: 'Turn into passive: Governments must eradicate bribery. Complete: Bribery .......... by governments.',
					medAns: 'must be eradicated',
					medWrong: ['must eradicated', 'must been eradicated', 'is must eradicated'],
					hardQ: 'Choose the correct result sentence with "such...that":',
					hardAns: 'Counterfeiting is such a grave threat that every country fights it.',
					hardWrong: [
						'Counterfeiting is such grave threat that every country fights it.',
						'Counterfeiting is so a grave threat that every country fights it.',
						'Counterfeiting is such a very grave threat that every country fights it.'
					]
				},
				{
					lexisPrompt: 'Give opposites keeping the same root: fair / transparent / safe / trust',
					lexisAnswer: 'unfair / non-transparent (or opaque) / unsafe / distrust',
					morphRows: [
						{ verb: { given: true, value: 'to inspect' }, noun: { value: 'inspection', mark: '0.25' }, adjective: { value: 'inspected', mark: '0.25' } },
						{ verb: { value: 'to regulate', mark: '0.25' }, noun: { given: true, value: 'regulation' }, adjective: { value: 'regulatory', mark: '0.25' } },
						{ verb: { value: 'to consume', mark: '0.25' }, noun: { value: 'consumption', mark: '0.25' }, adjective: { given: true, value: 'consumable' } }
					],
					rewrites: [
						{
							prompt: '1) a) Inspectors are auditing the company records right now.\n   b) The company records ..........................................................',
							answer: '1) b) The company records are being audited by inspectors right now.'
						},
						{
							prompt: '2) a) Combine with (so...that): The fake medicine was very toxic. Several patients fell ill.',
							answer: '2) b) The fake medicine was so toxic that several patients fell ill.'
						},
						{
							prompt: '3) a) Combine with (such...that): Honest traders earned great respect. Their shop prospered.',
							answer: '3) b) Honest traders earned such great respect that their shop prospered.'
						}
					],
					stressWords: 'ethical - taxation - prosperity - scientific',
					stressCols: [
						{ header: '1st Syllable', words: ['ethical'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['taxation', 'prosperity'], mark: '0.5' },
						{ header: '3rd Syllable', words: ['scientific'], mark: '0.25' }
					],
					clozeWords: 'audits - fair - consumers - regulations',
					clozePrompt: 'Clear (1) .......... and regular (2) .......... ensure (3) .......... competition and protect (4) .......... from deception.',
					clozeAnswer: '1) regulations   2) audits   3) fair   4) consumers',
					easyQ: 'Where does the stress fall in the word "ethical" (eth-i-cal)?',
					easyAns: '1st syllable (ETH)',
					easyWrong: ['2nd syllable (i)', '3rd syllable (cal)', 'No stress'],
					medQ: 'Turn into passive: Inspectors are auditing the records. Complete: The records .......... by inspectors.',
					medAns: 'are being audited',
					medWrong: ['are audited', 'were being audited', 'have been audited'],
					hardQ: 'Choose the right sentence using "such...that" with an uncountable noun:',
					hardAns: 'Honest traders earned such great respect that their shop prospered.',
					hardWrong: [
						'Honest traders earned such a great respect that their shop prospered.',
						'Honest traders earned so great respect that their shop prospered.',
						'Honest traders earned such very great respect that their shop prospered.'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع قواعد النبر مع اللواحق -ic و -tion و -ty و -ical.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'حدد المقطع المنبور بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المقطع المنبور الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تأكد من تطابق زمن فعل to be مع زمن الجملة الأصلية في المبني للمجهول.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر صيغة المبني للمجهول الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `صيغة المبني للمجهول الصحيحة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه لأداة التنكير a/an مع المفرد المعدود وحذفها مع الاسم غير المعدود، وحذف very دائماً.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الجملة السليمة بـ such...that:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة الصحيحة نحوياً هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following language exploration activities carefully (8 pts — BAC LP):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building table:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Rewrite or combine the sentences below:\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to their stressed syllable: (${chosen.stressWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.stressCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'phonology_pronunciation',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في المبني للمجهول حافظ على زمن الجملة الأصلية (were V3 للماضي، are being V3 للمضارع المستمر، must be V3 للناقص).',
					'في so/such...that احذف كلمة very دائماً وانتبه للمفرد المعدود مقابل غير المعدود.',
					'مع -tion/-ic النبر على المقطع قبل الأخير، ومع -ty/-ical على الثالث من النهاية.'
				],
				solutionStepsAr: [
					'تحديد المفردات أو الأضداد بدقة (1.5 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'تحويل المبني للمجهول والربط بـ so/such...that (3 نقاط).',
					'تصنيف النبر الصوتي وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts — Integration): Ethics in Business & Fighting Corruption
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t2_we_ethics_business',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 نقاط): محاربة الفساد والتزوير وترسيخ أخلاقيات التجارة',
		curriculumLessonId: 'eng_lesson_3as_lp_t2_so_such_that',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Using the following notes, write a composition of about 80 to 120 words on how society can fight corruption and promote ethical business.',
					topicOneNotes: [
						'Enforce strict anti-corruption laws and transparent public audits',
						'Educate youth on Islamic and civic values of honesty and trustworthiness',
						'Protect honest citizens who report fraud or bribery',
						'Encourage consumers to boycott counterfeit and smuggled goods'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words explaining why child labour is unethical and how communities can help working children return to school.',
					modelAnswer:
						'Corruption and fraud threaten both economic stability and social justice; therefore, fighting them requires a united effort from institutions and citizens alike. First, authorities must enforce strict anti-corruption laws, conduct transparent public audits, and punish bribery without favouritism. Moreover, honest employees who report misconduct should receive full legal protection. Equally important is moral education: families and schools ought to instill the noble values of honesty, accountability, and fair dealing in young people. Finally, conscious consumers can weaken illegal markets by boycotting counterfeit and smuggled goods. To sum up, ill-gotten gains never prosper, and a nation achieves true prosperity only when integrity guides every transaction.',
					easyQ: 'Which value is at the heart of Unit 2 ("Ill-Gotten Gains Never Prosper")?',
					easyAns: 'Honesty, transparency, and ethical business conduct',
					easyWrong: ['Buying the cheapest fake parts', 'Avoiding product labels', 'Hiding financial audits'],
					medQ: 'Which structure fits well in an Ethics essay to call for urgent reform?',
					medAns: 'It is high time authorities enforced transparent audits.',
					medWrong: [
						'It is high time authorities enforce transparent audits.',
						'It is high time authorities will enforce transparent audits.',
						'It is high time authorities should enforce transparent audits.'
					],
					hardQ: 'Which concluding statement best summarizes an essay on fighting corruption?',
					hardAns: 'To sum up, lasting prosperity is achieved only when strict laws and personal integrity work together.',
					hardWrong: [
						'In addition, fake goods are cheap.',
						'First, bribery is bad.',
						'Because laws exist in the country.'
					]
				},
				{
					topicOnePrompt:
						'Using the following notes, write an article of about 80 to 120 words warning consumers against the dangers of buying counterfeit medicines and spare parts.',
					topicOneNotes: [
						'Counterfeit products look genuine and cost less, deceiving careless buyers',
						'Severe health risks: toxic fake drugs and fatal road accidents from fake car parts',
						'Economic harm: bankrupting honest producers and losing state tax revenue',
						'Advice: buy from licensed pharmacies/shops, check seals and expiry dates'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words explaining why honesty and trustworthiness are essential qualities for a successful entrepreneur.',
					modelAnswer:
						'Say No to Counterfeit Products\nAlthough counterfeit medicines and spare parts often attract shoppers with their low prices, they pose severe dangers to human lives and the national economy. First, fake drugs frequently contain harmful or ineffective ingredients that worsen illnesses instead of curing them, while forged car parts can fail suddenly and cause fatal accidents. Furthermore, counterfeiting destroys honest local businesses and deprives the state of vital tax revenue. Therefore, consumers had better stay vigilant: they should always purchase from licensed pharmacies and trusted dealers, verify authenticity seals, and inspect expiry dates carefully. In conclusion, saving a few dinars on a fake product is never worth risking our health and safety.',
					easyQ: 'What practical advice should consumers follow against counterfeit medicines?',
					easyAns: 'Buy from licensed pharmacies and check authenticity seals and expiry dates',
					easyWrong: [
						'Always choose the lowest street price without checking labels',
						'Ignore expiry dates if the box looks colourful',
						'Share unlabeled pills with neighbours'
					],
					medQ: 'Which modal phrase gives strong advice cleanly in this essay?',
					medAns: 'Consumers had better verify authenticity seals carefully.',
					medWrong: [
						'Consumers had better to verify authenticity seals.',
						'Consumers had better verifying authenticity seals.',
						'Consumers better had verify seals.'
					],
					hardQ: 'Which sentence effectively uses a result clause to highlight the danger of counterfeiting?',
					hardAns: 'Counterfeit medicines are so dangerous that they can put patients lives at grave risk.',
					hardWrong: [
						'Counterfeit medicines are such dangerous that they put lives at risk.',
						'Counterfeit medicines are so very dangerous that they put lives at risk.',
						'Counterfeit medicines are so a dangerous that they put lives at risk.'
					]
				}
			];

			const chosen = rng.pick(pool);
			let finalAnswer: string;
			let quizQuestion: QuizQuestionPayload;
			if (difficulty === 'easy') {
				finalAnswer = chosen.easyAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.easyWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'راجع الأفكار المحورية لوحدة أخلاقيات العمل.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الفكرة المحورية الصحيحة للموضوع:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الفكرة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من سلامة القاعدة النحوية الموظفة في الجملة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الجملة السليمة نحوياً لتوظيفها في مقالك:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة السليمة هي: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من البنية النحوية والترابط الأسلوبي للجملة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الجملة الأقوى أسلوبياً لمقال البكالوريا:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجملة الأفضل هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics (80 to 120 words):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: chosen.topicOnePrompt,
						topicOneNotes: chosen.topicOneNotes,
						topicTwoPrompt: chosen.topicTwoPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: 'Relevance (1 pt) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence (1 pt)',
						mark: '5'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'وظّف على الأقل بنيتين من قواعد الوحدة 2 داخل تعبيرك (مثل It is high time أو had better أو so...that).',
					'اربط أفكار العرض بروابط متدرجة: First, Moreover, Equally important, Finally.',
					'اختم برسالة أخلاقية واضحة تلخص فكرة أن المكاسب الحرام لا تزدهر.'
				],
				solutionStepsAr: [
					'تحديد الموضوع المختار وتوزيع الرؤوس الموجهة على العرض.',
					'كتابة مقدمة تعرف الظاهرة وتطرح إشكاليتها.',
					'تطوير الأفكار بأسلوب سليم وتوظيف قواعد الوحدة.',
					'كتابة خاتمة موجزة ومراجعة الإملاء والترقيم.'
				],
				finalAnswer
			};
		}
	}
];
