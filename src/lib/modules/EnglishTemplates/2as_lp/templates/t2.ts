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

export const TEMPLATES_2AS_LP_T2: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_lp_t2_comp_peace_ecology',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: Make Peace & Waste Not, Want Not (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t2_modals_obligation',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'Traditional Water Wisdom in the M-Zab Valley',
					paragraphs: [
						'In the arid heart of the Algerian Sahara, the inhabitants of the M-Zab Valley in Ghardaia proved centuries ago that natural resources must be treated as a sacred trust. Because rainfall was rare, local builders designed a clever underground network of dams and channels so that every drop of floodwater could be captured and shared fairly among palm groves.',
						'This historic irrigation system, known locally as the foggara and oasis dividing gates, was managed by elected water stewards [[who]] ensured transparent distribution. Nobody was allowed to waste water or block a neighbour\'s channel, because harmony in the oasis depended on strict fairness and mutual respect. Through [[this]] disciplined cooperation, desert gardens stayed green for generations.',
						'Today, modern cities face growing water scarcity and pollution. Environmental experts remind us that clean water will soon be protected only if citizens adopt the same responsible habits. Wasteful practices should have been stopped long ago, yet schools and communities can still lead a peaceful green renewal.'
					],
					source: 'Adapted from Algerian Ecological Heritage Series',
					glossary: [
						{ term: 'arid', meaning: 'very dry with little rainfall' },
						{ term: 'stewards', meaning: 'trusted people responsible for managing resources' },
						{ term: 'scarcity', meaning: 'shortage or lack of supply' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Choose the best title for the text: a) Modern Oil Refineries  b) Ancient Water Conservation and Fairness in M-Zab  c) Tourism in Coastal Cities.',
						answer: 'b) Ancient Water Conservation and Fairness in M-Zab.',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False?\n  a) The M-Zab Valley receives heavy rainfall throughout the year.\n  b) Elected water stewards guaranteed fair distribution of water among palm groves.\n  c) Experts believe schools and communities can help build responsible environmental habits.',
						answer: 'a) False (it is arid and rainfall was rare)  |  b) True  |  c) True.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) Why did M-Zab builders design underground channels and dams?\n  b) What rule prevented conflicts over water in the oasis?\n  c) What modern environmental problems do cities face today?',
						answer:
							'a) So that every drop of rare floodwater could be captured and shared fairly among palm groves.\n  b) Nobody was allowed to waste water or block a neighbour\'s channel, and elected stewards ensured transparent sharing.\n  c) They face growing water scarcity and pollution.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. What or who do the underlined words refer to in the text?\n  a) who (paragraph 2)   b) this (paragraph 2)',
						answer: 'a) who = elected water stewards  |  b) this = disciplined cooperation (fair, waste-free water sharing).',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Fair water sharing and disciplined cooperation kept the M-Zab oasis green and peaceful for centuries',
					[
						{
							text: 'The M-Zab irrigation system relied on wasteful modern pumps',
							diagnosticFeedback: 'خطأ: النظام تقليدي حكيم يحفظ كل قطرة ماء دون تبذير.'
						},
						{
							text: 'Water stewards allowed wealthy owners to block their neighbours\' channels',
							diagnosticFeedback: 'خطأ: النص يذكر صراحة منع حجب الماء أو تبذيره.'
						},
						{
							text: 'Modern cities have no lessons to learn from desert heritage',
							diagnosticFeedback: 'خطأ: الخبراء يدعون إلى استلهام تلك العادات المسؤولة اليوم.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What key lesson does the M-Zab Valley example offer to modern Algerian cities?',
						questionTextAr: 'ما الدرس الأساسي الذي يقدمه نموذج وادي ميزاب للمدن المعاصرة؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تجمع تجربة وادي ميزاب بين ترشيد الموارد الطبيعية والعدل الاجتماعي والحفاظ على السلم الأهلي.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then answer the questions below:',
						content
					},
					hints: [
						'لاحظ كيف يربط النص بين وحدتي الفصل الثاني: الحفاظ على البيئة والسلم الاجتماعي.',
						'انتبه للصفات الدالة على المناخ مثل arid و rare rainfall.',
						'في سؤال الإحالة تحقق من الاسم الموجود مباشرة قبل who و this.'
					],
					solutionStepsAr: [
						'اختيار العنوان الأنسب للنص (1.0 نقطة).',
						'التحقق من الجمل الثلاث بين الصحيح والخطأ (1.5 نقطة).',
						'الإجابة التامة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
						'تحديد مرجع الكلمتين المسطرتين بدقة (1.5 نقطة).'
					],
					finalAnswer: 'Comprehension (7 pts): Title (b); F/T/T; 3 detailed answers; references: elected water stewards, disciplined cooperation.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Peacemaking and Mediation in School Communities',
				paragraphs: [
					'Peace is not merely the absence of loud arguments; [[it]] is an active daily effort built on justice, patience, and honest dialogue. In secondary schools, disagreements between classmates naturally happen, yet harsh words must not be allowed to turn small misunderstandings into lasting hostility.',
					'Last term, a group of students in a secondary school in Constantine launched a peer-mediation club guided by their teachers. Whenever a disagreement arose, trained student mediators were able to listen calmly to both sides and help [[them]] find a fair apology and practical solution. Respectful rules were displayed in every classroom so that courtesy became a shared habit.',
					'Looking back, school counsellors observed that many past disputes could have been avoided through early listening. They insist that young citizens must learn peaceful communication today if they wish to build harmonious communities tomorrow.'
				],
				source: 'Adapted from Civic Ethics & School Harmony Bulletin',
				glossary: [
					{ term: 'hostility', meaning: 'unfriendly or angry opposition' },
					{ term: 'mediation', meaning: 'helping two sides reach a fair agreement' },
					{ term: 'courtesy', meaning: 'polite and respectful behaviour' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Circle the right option. The text is mainly about: a) School sports competitions  b) Building peace through school peer mediation  c) Exam grading rules.',
					answer: 'b) Building peace through school peer mediation.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether these statements are True or False:\n  a) According to the text, peace means only keeping silent without effort.\n  b) The peer-mediation club in Constantine was guided by teachers.\n  c) Counsellors believe early listening could have prevented many past disputes.',
					answer: 'a) False (it is an active daily effort built on justice and dialogue)  |  b) True  |  c) True.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) On what three foundations is genuine peace built according to paragraph 1?\n  b) How did student mediators help classmates solve disagreements?\n  c) Why must young citizens learn peaceful communication today?',
					answer:
						'a) It is built on justice, patience, and honest dialogue.\n  b) They listened calmly to both sides and helped them reach a fair apology and practical solution.\n  c) Because they need it to build harmonious communities tomorrow.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. What or who do the underlined words refer to in the text?\n  a) it (paragraph 1)   b) them (paragraph 2)',
					answer: 'a) it = peace  |  b) them = both sides (the disagreeing classmates).',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Calm listening, justice, and guided peer mediation turn school disagreements into respectful dialogue',
				[
					{
						text: 'Disagreements never happen among secondary school classmates',
						diagnosticFeedback: 'خطأ: النص يوضح أن الخلافات تقع طبيعيا لكن يجب حلها بالحوار.'
					},
					{
						text: 'Student mediators worked without any guidance from teachers',
						diagnosticFeedback: 'خطأ: الفقرة الثانية تذكر أن النادي كان بإشراف وتوجيه الأساتذة.'
					},
					{
						text: 'Harsh words are the quickest way to solve misunderstandings',
						diagnosticFeedback: 'خطأ: النص يحذر من أن الكلام القاسي يحول سوء الفهم إلى عداء.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What is the main message of "Peacemaking and Mediation in School Communities"?',
					questionTextAr: 'ما الرسالة الأساسية لنص الوساطة المدرسية وصناعة السلم؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يرسخ النص قيمة الاستماع الهادئ والعدل والوساطة الأخلاقية لحل الخلافات داخل المدرسة.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then do the following tasks:',
					content
				},
				hints: [
					'ارجع للسطر الأول في الفقرة الأولى لتحديد أسس السلم الحقيقي.',
					'لاحظ استعمال المبني للمجهول (were displayed) و were able to في الفقرة الثانية.',
					'تأكد أن الضمير them يعود على الطرفين المتخاصمين (both sides).'
				],
				solutionStepsAr: [
					'اختيار الموضوع العام للنص (1.0 نقطة).',
					'تصحيح العبارات الثلاث بين True و False (1.5 نقطة).',
					'الإجابة الكاملة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
					'تحديد مرجع الضميرين it و them (1.5 نقطة).'
				],
				finalAnswer: 'Comprehension (7 pts): Topic (b); F/T/T; 3 open answers; references: peace, both sides.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t2_exp_passive_modals',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'grammar_syntax',
		titleAr: 'Part One — B) Text Exploration: Passive Voice, Modals & Stress (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t2_passive_voice',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock(
				variant === 0
					? [
							{
								verb: { given: true, value: 'to protect' },
								noun: { value: 'protection', mark: '0.5' },
								adjective: { value: 'protective', mark: '0.5' }
							},
							{
								verb: { value: 'to recycle', mark: '0.5' },
								noun: { given: true, value: 'recycling' },
								adjective: { value: 'recyclable', mark: '0.5' }
							}
						]
					: [
							{
								verb: { given: true, value: 'to conserve' },
								noun: { value: 'conservation', mark: '0.5' },
								adjective: { value: 'conservative', mark: '0.5' }
							},
							{
								verb: { value: 'to harmonize', mark: '0.5' },
								noun: { given: true, value: 'harmony' },
								adjective: { value: 'harmonious', mark: '0.5' }
							}
						]
			);

			const cleanPhonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '1st Syllable', words: ['U-ni-ty', 'NA-ture'], mark: '0.5' },
					{ header: '2nd Syllable', words: ['po-LLU-tion', 'pro-TECT'], mark: '0.5' },
					{ header: '3rd Syllable', words: ['e-co-NO-mic', 'sci-en-TI-fic'], mark: '0.5' }
				]
			});

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the following word-building chart:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						'2. Rewrite sentence (b) so that it means the same as sentence (a):\n  1-a) Local volunteers planted thousands of olive trees last spring.\n  1-b) Thousands of olive trees ....................................................\n  2-a) Citizens must save clean drinking water.\n  2-b) Clean drinking water ........................................................\n  3-a) It was wrong of the factory to dump waste into the river.\n  3-b) The factory should not ......................................................',
					answer:
						'1-b) Thousands of olive trees were planted by local volunteers last spring.\n  2-b) Clean drinking water must be saved by citizens.\n  3-b) The factory should not have dumped waste into the river.',
					mark: '3.0'
				},
				{
					type: 'text',
					content:
						'3. Choose the correct modal in brackets:\n  a) Yesterday, the elders (could / were able to) settle the water dispute peacefully.\n  b) You (must not / do not have to) light fires in dry forests; it is strictly forbidden.\n  c) Last winter, farmers (must / had to) repair the irrigation wall.',
					answer: 'a) were able to  |  b) must not  |  c) had to',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to their stressed syllable: (unity, pollution, economic, nature, protect, scientific)',
					mark: ''
				},
				cleanPhonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'Clean drinking water must be saved by citizens.',
				[
					{
						text: 'Clean drinking water must saved by citizens.',
						diagnosticFeedback: 'خطأ: ينقص الفعل المساعد be بعد must.'
					},
					{
						text: 'Clean drinking water must been saved by citizens.',
						diagnosticFeedback: 'خطأ: بعد must يأتي المصدر be لا been.'
					},
					{
						text: 'Clean drinking water is must saved by citizens.',
						diagnosticFeedback: 'خطأ: ترتيب الفعل الناقص غير صحيح.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Transform accurately into the passive voice: "Citizens must save clean drinking water."',
					questionTextAr: 'اختر جملة المبني للمجهول الصحيحة مع الفعل الناقص must:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'مع الأفعال الناقصة نطبق الصيغة: Object + modal + be + Past Participle.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Complete the following vocabulary, grammar, and phonology exercises:',
					content
				},
				hints: [
					'تحقق من المفرد والجمع في نائب الفاعل الجديد: trees جمع فتأخذ were planted.',
					'للعتاب على خطأ وقع في الماضي نستخدم should not have + V3.',
					'تذكر قواعد النبر: -tion و -ic قبلها مباشرة، و -ity الثالث من النهاية.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'التحويل إلى المبني للمجهول والعتاب في الماضي (3.0 نقاط).',
					'اختيار الأفعال الناقصة المناسبة للسياق (1.5 نقطة).',
					'تصنيف الكلمات الست في جدول النبر الصوتي (1.5 نقطة).'
				],
				finalAnswer: 'Text Exploration (8 pts): Word table; were planted / must be saved / should not have dumped; were able to, must not, had to; stress table complete.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t2_exp_morphology_stress',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'vocabulary_morphology',
		titleAr: 'Part One — B) Text Exploration: Word Building, Opposites & Cohesion (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t2_word_building',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { value: 'to tolerate', mark: '0.5' },
					noun: { given: true, value: 'tolerance' },
					adjective: { value: 'tolerant', mark: '0.5' }
				},
				{
					verb: { given: true, value: 'to pollute' },
					noun: { value: 'pollution', mark: '0.5' },
					adjective: { value: 'polluted', mark: '0.5' }
				},
				{
					verb: { value: 'to renew', mark: '0.5' },
					noun: { value: 'renewal', mark: '0.5' },
					adjective: { given: true, value: 'renewable' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: 'Penultimate (-tion / -ic)', words: ['pro-TEC-tion', 'pa-CI-fic'], mark: '0.75' },
					{ header: 'Ante-penultimate (-ity / -gy)', words: ['e-QUA-li-ty', 'e-CO-lo-gy'], mark: '0.75' }
				]
			});

			const prefixPair =
				variant === 0
					? 'responsible / legal / fair / honest'
					: 'possible / regular / tolerant / agree';
			const prefixAns =
				variant === 0
					? 'irresponsible / illegal / unfair / dishonest'
					: 'impossible / irregular / intolerant / disagree';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the morphology chart below (Verb / Noun / Adjective):',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content: `2. Give the opposites of the following words keeping the same root: (${prefixPair})`,
					answer: prefixAns,
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Fill in the gaps with four words from the list: (peaceful - wasted - solar - must - recycled)\n  Natural resources are a trust that (1) .......... be protected for future generations. Clean water should never be (2) .........., while plastic and paper can be (3) .......... into useful items. Together, we can build a clean and (4) .......... society.',
					answer: '(1) must  |  (2) wasted  |  (3) recycled  |  (4) peaceful',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to their stress rule: (protection, equality, pacific, ecology)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'irresponsible / illegal / unfair / dishonest',
				[
					{
						text: 'unresponsible / inlegal / disfair / unhonest',
						diagnosticFeedback: 'خطأ: راجع قواعد السوابق ir- قبل r و il- قبل l و dis- مع honest.'
					},
					{
						text: 'inresponsible / irlegal / imfair / inhonest',
						diagnosticFeedback: 'خطأ: استخدمت سوابق غير مطابقة للحروف الأولى.'
					},
					{
						text: 'imresponsible / unlegal / irfair / ilhonest',
						diagnosticFeedback: 'خطأ: السابقة im- تأتي قبل p و m فقط.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choose the exact opposites keeping the same roots for: responsible, legal, fair, honest.',
					questionTextAr: 'اختر الأضداد الصحيحة باستعمال السوابق النافية المناسبة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نضيف ir- قبل r (irresponsible)، و il- قبل l (illegal)، و un- مع fair، و dis- مع honest.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Complete the following morphology, vocabulary, and phonology activities:',
					content
				},
				hints: [
					'تذكر السوابق القياسية: ir- قبل r، il- قبل l، im- قبل p/m.',
					'في ملء الفراغات لاحظ بنية المبني للمجهول (be + V3) بعد should never be و can be.',
					'اللاحقة -tion و -ic تضعان النبر قبل النهاية مباشرة، أما -ity و -gy ففي الثالث من النهاية.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق للكلمات الثلاث (3.0 نقاط).',
					'إضافة السوابق النافية الصحيحة للأضداد الأربعة (2.0 نقطة).',
					'إكمال فقرة البيئة والسلم بالكلمات الأربع المناسبة (1.5 نقطة).',
					'تصنيف الكلمات الأربع في جدول قواعد النبر (1.5 نقطة).'
				],
				finalAnswer: `Text Exploration (8 pts): Morphology chart; opposites: ${prefixAns}; gaps: must, wasted, recycled, peaceful; stress table complete.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t2_writing_peace_ecology',
		grade: '2as_lp',
		trimesterId: 't2',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Make Peace & Save Natural Resources (5 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t2_modals_obligation',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Write a short speech (100 to 120 words) to your classmates on how to preserve water and energy at school and at home.'
					: 'Write a short article (100 to 120 words) for your school newsletter explaining how students can promote peace and mutual respect in their school.';

			const notes =
				topicVariant === 0
					? [
							'Water is a precious blessing / must not be wasted',
							'Practical steps at home: fix leaking taps / turn off water while brushing teeth',
							'Energy habits: switch off unused lights / encourage solar power and tree planting',
							'Call to action: small daily habits protect our environment for future generations'
						]
					: [
							'True peace begins with kindness, honesty, and respect among classmates',
							'Avoid harsh words and rumours / listen patiently when disagreements occur',
							'Create a school peer-mediation club guided by teachers',
							'Conclude with the benefit: a calm school helps every pupil succeed'
						];

			const freePrompt =
				topicVariant === 0
					? 'Forest fires and plastic litter threaten Algeria\'s natural beauty. Write an essay suggesting practical solutions that citizens and local councils should adopt.'
					: 'Islam and Algerian heritage deeply value reconciliation and good neighbourliness. Write a paragraph showing how peaceful dialogue strengthens community unity.';

			const modelAnswer =
				topicVariant === 0
					? 'Dear teachers and classmates, clean water and energy are precious blessings that must never be wasted. Every day, large amounts of water are lost through careless habits and leaking pipes. To change this situation, simple actions can be taken immediately at home and at school. First, taps should be turned off while washing hands, and broken pipes must be repaired without delay. Second, unused lights should be switched off, while paper and bottles can be recycled into useful materials. Moreover, planting trees around our school yard helps cool the air naturally. In conclusion, if every student acts responsibly today, our land will remain green and thriving for future generations.'
					: 'Building a peaceful school environment is a shared responsibility for every student and teacher. First, lasting harmony begins with everyday courtesy, honest speech, and patience when small misunderstandings arise. Classmates must not spread rumours or use hurtful words; instead, disagreements should be solved calmly through respectful dialogue. Moreover, secondary schools can establish peer-mediation clubs guided by teachers so that students learn how to apologize fairly and forgive generously. Finally, voluntary group projects such as courtyard clean-ups unite pupils around positive goals. In conclusion, when peace and mutual respect are practised daily, school becomes a welcoming place where every learner can thrive.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Relevance & notes integration (1.5 pt) | Coherence & linkers (1.5 pt) | Passive & modals accuracy (1.5 pt) | Mechanics (0.5 pt)',
				mark: '5.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Use modals of obligation (must, should) and passive voice (must be protected) to make practical recommendations clear',
				[
					{
						text: 'Avoid all modal verbs and write only random single words',
						diagnosticFeedback: 'خطأ: الأفعال الناقصة مثل must و should أساسية لتقديم النصائح والتوصيات.'
					},
					{
						text: 'Write a fictional story unrelated to water conservation or school peace',
						diagnosticFeedback: 'خطأ: الخروج عن الموضوع يضيع علامة الملاءمة (Relevance).'
					},
					{
						text: 'Repeat the same sentence five times to reach 100 words',
						diagnosticFeedback: 'خطأ: التكرار يضعف التماسك ويفقد علامة التميز.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Which grammatical strategy best strengthens a 2AS LP Written Expression on peace or environmental stewardship?',
					questionTextAr: 'ما الأسلوب النحوي الأنسب لتقوية التعبير الكتابي حول السلم وحماية البيئة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'توظيف أفعال الوجوب والنصيحة (must, should) والمبني للمجهول (must be protected) يمنح الخطاب قوة ودقة لغوية.'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 5,
					instruction: 'Choose ONE topic and write a coherent composition of 100 to 120 words:',
					content: [block]
				},
				hints: [
					'استثمر كل ملاحظة في جملة كاملة ومرتبطة بأدوات التسلسل (First, Second, Moreover, In conclusion).',
					'وظف جملتين على الأقل بالمبني للمجهول (can be recycled / must be repaired).',
					'تأكد من التحية في البداية إذا كان النص خطابا (Speech) ومن عنوان/جملة تمهيدية إذا كان مقالا.'
				],
				solutionStepsAr: [
					'اختيار أحد الموضوعين وتنظيم الأفكار في ثلاث فقرات واضحة.',
					'توظيف الأفعال الناقصة والمبني للمجهول وروابط التماسك.',
					'المراجعة النهائية للغة والهجاء وعدد الكلمات.'
				],
				finalAnswer: 'Written Expression (5 pts): Model speech/article integrating modals, passive voice, and rubric.'
			};
		}
	}
];
