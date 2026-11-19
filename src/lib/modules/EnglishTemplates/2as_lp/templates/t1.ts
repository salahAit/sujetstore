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

export const TEMPLATES_2AS_LP_T1: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_lp_t1_comp_lifestyles',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: Signs of the Time (Past vs Present Algerian Lifestyles — 7 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t1_used_to_present',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'From Stone Courtyards to Smart Homes in Algeria',
					paragraphs: [
						'Half a century ago, daily life in historic Algerian quarters such as the Casbah of Algiers and the old town of Tlemcen followed a calm, communal rhythm. Extended families used to live together in spacious courtyard houses where neighbours shared home-baked bread and visited one another every evening. Children played outdoor street games safely while elders exchanged oral history and wise advice.',
						'Today, urban growth and digital tools have transformed [[that]] traditional pattern. Unlike their grandparents, modern city residents mostly live in compact apartments, whereas distant relatives stay connected through instant messaging and video calls. Although busy work schedules reduce daily visits, Algerian families still gather warmly on Fridays and Islamic holidays to preserve [[their]] hospitality.',
						'Looking ahead, architects believe that future Algerian neighbourhoods may blend modern comfort with ancestral wisdom. Designers will probably build energy-saving homes [[which]] respect privacy, shade, and community courtyards.'
					],
					source: 'Adapted from Algerian Social Heritage Chronicles',
					glossary: [
						{ term: 'communal', meaning: 'shared by members of a community' },
						{ term: 'compact', meaning: 'closely packed and smaller in space' },
						{ term: 'ancestral', meaning: 'belonging to earlier generations' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Circle the letter that corresponds to the right answer. The text is: a) a narrative tale  b) an expository article  c) a formal letter.',
						answer: 'b) an expository article (comparing past, present, and future Algerian lifestyles).',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False according to the text?\n  a) Fifty years ago, Algerian neighbours rarely interacted with each other.\n  b) Modern families use digital tools to keep in touch with distant relatives.\n  c) Future architects plan to ignore traditional Algerian house design completely.',
						answer: 'a) False (they shared bread and visited every evening)  |  b) True  |  c) False (they may blend modern comfort with ancestral wisdom).',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) How did extended families use to live in the Casbah and Tlemcen?\n  b) When do modern Algerian families still gather warmly despite busy schedules?\n  c) What kind of homes will designers probably build in the future?',
						answer:
							'a) They used to live together in spacious courtyard houses with close neighbourhood ties.\n  b) They still gather warmly on Fridays and Islamic holidays.\n  c) They will probably build energy-saving homes which respect privacy, shade, and community courtyards.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. Who or what do the underlined words refer to in the text?\n  a) that (paragraph 2)   b) their (paragraph 2)   c) which (paragraph 3)',
						answer: 'a) that = the calm, communal traditional pattern of daily life  |  b) their = Algerian families  |  c) which = energy-saving homes.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Algerian lifestyles have evolved from courtyard living to modern apartments, yet hospitality and family ties remain valued',
					[
						{
							text: 'Modern technology has completely ended family gatherings on Fridays and holidays in Algeria',
							diagnosticFeedback: 'خطأ: الفقرة الثانية تؤكد استمرار اللقاءات الأسرية الدافئة في أيام الجمعة والأعياد الإسلامية.'
						},
						{
							text: 'Future architects refuse to include any traditional courtyard concepts in new cities',
							diagnosticFeedback: 'خطأ: الفقرة الثالثة تشير إلى مزج الراحة الحديثة بحكمة العمارة الأصيلة.'
						},
						{
							text: 'Fifty years ago, families lived mainly in small apartments and relied on video calls',
							diagnosticFeedback: 'خطأ: العكس هو الصحيح، ففي الماضي عاشوا في بيوت الفناء الواسعة دون هواتف ذكية.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What is the central idea of the passage "From Stone Courtyards to Smart Homes in Algeria"?',
						questionTextAr: 'اختر الفكرة العامة الدقيقة للنص:',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يتناول النص تطور نمط السكن والحياة بين الماضي والحاضر والمستقبل مع الحفاظ على قيم الترابط والضيافة.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then do the following activities:',
						content
					},
					hints: [
						'ميز بين مؤشرات الماضي (used to) ومؤشرات الحاضر (Today, whereas) والمستقبل (may, will probably).',
						'في أسئلة True/False ارجع إلى النص للتأكد من الكلمات المفتاحية مثل rarely أو completely.',
						'في سؤال الإحالة انظر إلى الاسم الذي يسبق الضمير مباشرة ويوافقه في العدد.'
					],
					solutionStepsAr: [
						'تحديد نوع النص: مقال تفسيري يقارن تطور الحياة عبر الأزمنة الثلاثة.',
						'التحقق من العبارات الثلاث بالعودة المباشرة للفقرات 1 و 2 و 3.',
						'صياغة إجابات كاملة وواضحة عن الأسئلة المفتوحة الثلاثة.',
						'تعيين عائد كل كلمة إحالة (that, their, which) بدقة.'
					],
					finalAnswer: 'Comprehension (7 pts): Expository article; F/T/F; 3 open answers; references: traditional pattern, Algerian families, energy-saving homes.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Changing Reading Habits Among Algerian Students',
				paragraphs: [
					'Several decades ago, secondary school pupils in Algeria used to spend long afternoons in municipal libraries searching through printed encyclopaedias. Writing a school project required copying paragraphs carefully by hand, whereas borrowing a rare reference book often meant waiting in a quiet queue. Those patient habits taught learners strong focus and neat handwriting.',
					'Nowadays, students access thousands of articles and educational videos from [[their]] tablets within seconds. Unlike earlier generations, today learners can compare multiple sources rapidly and organize digital notes effortlessly. However, educators notice that constant notifications may distract readers [[who]] skip deep reading for quick summaries.',
					'In the coming years, balanced classrooms will probably combine printed textbooks with curated digital platforms. Many teachers believe that students might achieve the best results when [[they]] pair modern speed with traditional discipline.'
				],
				source: 'Adapted from Youth Education & Study Skills Review',
				glossary: [
					{ term: 'municipal', meaning: 'belonging to a town or city' },
					{ term: 'curated', meaning: 'carefully selected and organized' },
					{ term: 'discipline', meaning: 'self-control and regular study habits' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Choose the general idea of the text: a) Digital libraries should close  b) How Algerian students\' reading habits changed over time  c) The history of printing presses.',
					answer: 'b) How Algerian students\' reading habits changed over time.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether the following statements are True or False:\n  a) In the past, pupils relied on printed encyclopaedias in municipal libraries.\n  b) Constant digital notifications always improve deep concentration.\n  c) Future classrooms will probably mix printed textbooks with digital tools.',
					answer: 'a) True  |  b) False (notifications may distract readers)  |  c) True.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) What two skills did traditional library habits teach learners in the past?\n  b) How do modern students benefit from tablets today?\n  c) According to teachers, when might students achieve the best results?',
					answer:
						'a) They taught learners strong focus and neat handwriting.\n  b) They access thousands of articles rapidly, compare multiple sources, and organize digital notes effortlessly.\n  c) When they pair modern speed with traditional discipline.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. What or who do the underlined words refer to in the text?\n  a) their (paragraph 2)   b) who (paragraph 2)   c) they (paragraph 3)',
					answer: 'a) their = students  |  b) who = readers  |  c) they = students.',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Combining modern digital speed with traditional study discipline helps students achieve balanced learning',
				[
					{
						text: 'Printed encyclopaedias were faster to search than modern tablets',
						diagnosticFeedback: 'خطأ: النص يذكر أن البحث الورقي كان يستغرق ساعات ويتطلب صبرا.'
					},
					{
						text: 'Educators recommend banning tablets from all future classrooms',
						diagnosticFeedback: 'خطأ: الفقرة الثالثة تقترح المزج المتوازن بين الكتاب المطبوع والمنصات الرقمية.'
					},
					{
						text: 'Students in the past never visited municipal libraries',
						diagnosticFeedback: 'خطأ: الفقرة الأولى تذكر أنهم كانوا يقضون أمسيات طويلة في المكتبات البلدية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'According to the passage "Changing Reading Habits Among Algerian Students", what is the educators\' balanced conclusion?',
					questionTextAr: 'ما الخلاصة التربوية المتوازنة التي يختم بها النص؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يدعو النص إلى الجمع بين سرعة الوسائل الرقمية وانضباط القراءة العميقة التقليدية.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then do the following activities:',
					content
				},
				hints: [
					'تتبع تطور الفكرة عبر الفقرات الثلاث: الماضي (1)، الحاضر (2)، المستقبل (3).',
					'ابحث عن كلمتي focus و handwriting للإجابة عن السؤال 3a.',
					'تأكد أن ضمائر الوصل مثل who تعود على الاسم العاقل قبلها مباشرة.'
				],
				solutionStepsAr: [
					'تحديد الفكرة المحورية للنص (تطور عادات القراءة لدى التلاميذ).',
					'فحص صحة العبارات الثلاث من النص.',
					'استخراج الإجابات الدقيقة للأسئلة الثلاثة.',
					'ربط الضمائر their و who و they بعوائدها الصحيحة.'
				],
				finalAnswer: 'Comprehension (7 pts): Idea (b); T/F/T; 3 open answers; references: students, readers, students.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t1_exp_grammar_lifestyles',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'grammar_tenses',
		titleAr: 'Part One — B) Text Exploration: Used to, Possibility & Word Building (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t1_used_to_present',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const wordSet = rng.int(0, 1);

			const wbTable =
				wordSet === 0
					? buildEnglishWordBuildingTableBlock([
							{
								verb: { given: true, value: 'to modernize' },
								noun: { value: 'modernization', mark: '0.5' },
								adjective: { value: 'modern', mark: '0.5' }
							},
							{
								verb: { value: 'to educate', mark: '0.5' },
								noun: { given: true, value: 'education' },
								adjective: { value: 'educational', mark: '0.5' }
							},
							{
								verb: { value: 'to differ', mark: '0.5' },
								noun: { value: 'difference', mark: '0.5' },
								adjective: { given: true, value: 'different' }
							}
						])
					: buildEnglishWordBuildingTableBlock([
							{
								verb: { given: true, value: 'to communicate' },
								noun: { value: 'communication', mark: '0.5' },
								adjective: { value: 'communicative', mark: '0.5' }
							},
							{
								verb: { value: 'to predict', mark: '0.5' },
								noun: { given: true, value: 'prediction' },
								adjective: { value: 'predictable', mark: '0.5' }
							},
							{
								verb: { value: 'to innovate', mark: '0.5' },
								noun: { value: 'innovation', mark: '0.5' },
								adjective: { given: true, value: 'innovative' }
							}
						]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '/s/', words: ['books', 'habits'], mark: '0.5' },
					{ header: '/z/', words: ['families', 'towns'], mark: '0.5' },
					{ header: '/iz/', words: ['houses', 'bridges'], mark: '0.5' }
				]
			});

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the following chart with the missing verb, noun, or adjective:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						'2. Rewrite sentence (b) so that it means the same as sentence (a):\n  1-a) Fifty years ago, artisans made copper lamps by hand, but now factories produce them.\n  1-b) Fifty years ago, artisans ................................................................\n  2-a) Perhaps Algerian cities will use solar buses everywhere by 2040.\n  2-b) Algerian cities ........................................................................\n  3-a) Traditional alleys were narrow. Modern avenues are wide. (Use: whereas)\n  3-b) ........................................................................................',
					answer:
						'1-b) Fifty years ago, artisans used to make copper lamps by hand, but now factories produce them.\n  2-b) Algerian cities may (or might) use solar buses everywhere by 2040.\n  3-b) Traditional alleys were narrow, whereas modern avenues are wide.',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'3. Give the correct form of the verbs in brackets:\n  a) My grandfather (not / use to) own a mobile phone when he lived in Setif.\n  b) Nowadays, Yasmine always (check) the weather forecast before school.',
					answer: 'a) did not use to  |  b) checks',
					mark: '1.0'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to the pronunciation of their final "-s": (books, families, houses, habits, towns, bridges)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'Algerian cities may use solar buses everywhere by 2040.',
				[
					{
						text: 'Algerian cities perhaps may use solar buses everywhere by 2040.',
						diagnosticFeedback: 'خطأ: لا نجمع بين perhaps و may في الجملة نفسها.'
					},
					{
						text: 'Algerian cities may to use solar buses everywhere by 2040.',
						diagnosticFeedback: 'خطأ: بعد may نضع المصدر المجرد دون to.'
					},
					{
						text: 'Algerian cities will may use solar buses everywhere by 2040.',
						diagnosticFeedback: 'خطأ: لا يتتابع فعلان ناقصان (will may) في الإنجليزية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choose the right transformation of: "Perhaps Algerian cities will use solar buses everywhere by 2040."',
					questionTextAr: 'اختر إعادة الصياغة الصحيحة باستعمال الفعل الناقص may:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تحل may محل perhaps و will معا، ويتبعها المصدر المجرد use.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Complete the following language and phonology activities:',
					content
				},
				hints: [
					'في جدول الاشتقاق استعمل لواحق الأسماء (-tion, -ence) ولواحق الصفات (-al, -ive, -ent).',
					'احذف حرف d من used في النفي بعد did not (did not use to).',
					'في نطق Final -s انتبه لأصوات الصفير في houses و bridges (/iz/).'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (3.0 نقاط).',
					'إعادة صياغة الجمل الثلاث باستعمال used to و may و whereas (2.5 نقطة).',
					'تصريف الفعلين في الماضي المنفي والمضارع البسيط (1.0 نقطة).',
					'تصنيف الكلمات الست حسب نطق النهاية -s في الجدول الصوتي (1.5 نقطة).'
				],
				finalAnswer: 'Text Exploration (8 pts): Word table complete; used to / may / whereas; did not use to, checks; /s/: books, habits | /z/: families, towns | /iz/: houses, bridges.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t1_exp_clauses_lexis',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'grammar_syntax',
		titleAr: 'Part One — B) Text Exploration: Relative Clauses, Contrast & Discourse (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t1_relative_clauses',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to preserve' },
					noun: { value: 'preservation', mark: '0.5' },
					adjective: { value: 'preserved', mark: '0.5' }
				},
				{
					verb: { value: 'to compare', mark: '0.5' },
					noun: { given: true, value: 'comparison' },
					adjective: { value: 'comparable', mark: '0.5' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '1st Syllable', words: ['MO-dern', 'CU-stom'], mark: '0.5' },
					{ header: '2nd Syllable', words: ['tra-DI-tion', 'pre-SERVE'], mark: '0.5' }
				]
			});

			const cityName = variant === 0 ? 'Constantine' : 'Tlemcen';
			const landmark = variant === 0 ? 'the suspension bridges' : 'the Great Mosque';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the word-building table below:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						`2. Combine each pair of sentences using the connector in brackets (make necessary changes):\n  a) ${cityName} is a historic city. Many Algerian scholars taught there. (where)\n  b) Artisans crafted wooden doors. The doors have lasted for centuries. (which)\n  c) Past letters took weeks. Modern emails arrive instantly. (unlike)`,
					answer:
						`a) ${cityName} is a historic city where many Algerian scholars taught.\n  b) Artisans crafted wooden doors which have lasted for centuries.\n  c) Unlike past letters, modern emails arrive instantly.`,
					mark: '3.0'
				},
				{
					type: 'text',
					content:
						'3. Fill in the gaps with four words from the list: (whereas - used - hospitality - probably - did)\n  Decades ago, villagers (1) .......... to meet at the market square every Thursday, (2) .......... today people shop in large centres. Future cities will (3) .......... grow even faster, yet Algerian (4) .......... will remain a cherished tradition.',
					answer: '(1) used  |  (2) whereas  |  (3) probably  |  (4) hospitality',
					mark: '2.0'
				},
				{
					type: 'text',
					content: `4. Classify the following words according to their stressed syllable (${landmark} heritage list): (modern, tradition, custom, preserve)`,
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				`${cityName} is a historic city where many Algerian scholars taught.`,
				[
					{
						text: `${cityName} is a historic city where many Algerian scholars taught there.`,
						diagnosticFeedback: 'خطأ: يجب حذف كلمة there عند الربط بـ where.'
					},
					{
						text: `${cityName} is a historic city who many Algerian scholars taught.`,
						diagnosticFeedback: 'خطأ: who للعاقل فقط ولا تستعمل للمكان.'
					},
					{
						text: `${cityName} is a historic city when many Algerian scholars taught.`,
						diagnosticFeedback: 'خطأ: when للزمان وليس للمكان.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: `Combine accurately with "where": "${cityName} is a historic city. Many Algerian scholars taught there."`,
					questionTextAr: 'اختر جملة الوصل الصحيحة دون تكرار:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نربط بالمكان باستعمال where ونحذف الظرف المكرر there من نهاية الجملة.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Do the following grammar, vocabulary, and phonology tasks:',
					content
				},
				hints: [
					'عند الربط بـ where احذف there، وعند الربط بـ which احذف الاسم المكرر.',
					'تذكر أن unlike تتبعها عبارة اسمية فقط بدون فعل مصرف.',
					'في ملء الفراغات انتبه للسياق: used to، و whereas للمقابلة، و will probably للتوقع.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق لكلمتي preserve و compare (2.0 نقطة).',
					'دمج أزواج الجمل بـ where و which و unlike بدقة (3.0 نقاط).',
					'ملء الفراغات الأربعة بالكلمات المناسبة من القائمة (2.0 نقطة).',
					'تصنيف الكلمات الأربع حسب المقطع المنبور (1.0 نقطة).'
				],
				finalAnswer: `Text Exploration (8 pts): preserve/compare table; where/which/unlike combinations; gaps: used, whereas, probably, hospitality; stress: 1st (modern, custom), 2nd (tradition, preserve).`
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t1_writing_lifestyles',
		grade: '2as_lp',
		trimesterId: 't1',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Past vs Present Algerian Lifestyles (5 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t1_comparing_lifestyles',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Write a composition of about 100 to 120 words for your school magazine comparing Algerian family life in the past and today.'
					: 'Write a short article of about 100 to 120 words predicting how Algerian schools and study habits may change over the next twenty years.';

			const notes =
				topicVariant === 0
					? [
							'Past housing & diet: spacious courtyard houses / home-cooked traditional meals (couscous, homemade bread)',
							'Past social bonds: frequent evening visits / outdoor children games / strong neighbourhood solidarity',
							'Present lifestyle: compact modern flats / faster daily meals / digital phones and instant messages',
							'Conclusion: keep Islamic values of family respect and hospitality while enjoying modern comfort'
						]
					: [
							'Past study habits: printed textbooks / municipal libraries / handwritten notebooks',
							'Present tools: tablets, online dictionaries, and interactive classroom screens',
							'Future predictions (may / might / will probably): digital science labs / eco-friendly solar schools',
							'Conclusion: technology helps speed, yet discipline and respect for teachers remain essential'
						];

			const freePrompt =
				topicVariant === 0
					? 'Modern technology has made daily life easier, yet some people believe it has weakened real face-to-face communication. Write an essay expressing your opinion with clear examples.'
					: 'Traditional Algerian crafts such as pottery, weaving, and calligraphy are part of our identity. Write a paragraph explaining why young people should preserve them today.';

			const modelAnswer =
				topicVariant === 0
					? 'Daily life in Algeria has changed remarkably over the last fifty years. In the past, extended families used to live in wide courtyard houses where neighbours shared homemade bread and visited each other warmly. Meals were prepared slowly at home, and children played safely in quiet streets. Today, by contrast, most city families live in compact apartments, whereas busy schedules often lead to quicker meals and digital phone calls. Unlike previous generations, youth rely heavily on smartphones to communicate. In conclusion, although modern tools bring comfort and speed, Algerian families should always preserve their noble Islamic values of hospitality, kindness, and close kinship.'
					: 'Over the past few decades, education in Algeria has experienced noticeable progress. Previously, students used to depend exclusively on printed textbooks, municipal libraries, and neat handwritten notes. Nowadays, learners benefit from digital archives and online lessons, whereas teachers integrate interactive visuals in class. In the next twenty years, Algerian schools will probably adopt eco-friendly solar classrooms and virtual science labs. Printed books may remain important, while smart platforms might personalize revision for every pupil. To sum up, even if future tools make learning faster, genuine academic success will always require patience, honesty, and respect for teachers.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Relevance & use of notes (1.5 pt) | Coherence & linkers (1.5 pt) | Grammar & vocabulary accuracy (1.5 pt) | Spelling & layout (0.5 pt)',
				mark: '5.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Introduce the theme, contrast past and present using used to and whereas/unlike, and close with a balanced conclusion',
				[
					{
						text: 'Copy the bullet notes one below another without verbs or connectors',
						diagnosticFeedback: 'خطأ: يجب تحويل الملاحظات إلى فقرة مترابطة بجمل تامة وروابط مقارنة.'
					},
					{
						text: 'Write only about the past and ignore modern life completely',
						diagnosticFeedback: 'خطأ: السؤال يطلب مقارنة متوازنة بين الماضي والحاضر أو توقعا للمستقبل.'
					},
					{
						text: 'Use past simple for future predictions instead of may or will probably',
						diagnosticFeedback: 'خطأ: التوقعات المستقبلية تحتاج may / might / will probably.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What is the best structure for a 2AS LP Written Expression comparing past and present Algerian lifestyles?',
					questionTextAr: 'ما الخطة الأمثل لكتابة وضعية إدماجية متماسكة حول تغير أنماط الحياة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'المقال المتميز يضم مقدمة واضحة، ثم عرضا يقارن باستعمال used to و whereas/unlike، ثم خاتمة متوازنة.'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 5,
					instruction: 'Write a well-structured composition on ONE of the following topics:',
					content: [block]
				},
				hints: [
					'وظف used to + Stem لوصف الماضي و Present Simple لوصف الحاضر.',
					'استعمل رابطين للمقارنة على الأقل مثل whereas و unlike و by contrast.',
					'اختم بجملة تؤكد الجمع بين التقدم الحديث والحفاظ على القيم الإسلامية والجزائرية الأصيلة.'
				],
				solutionStepsAr: [
					'تحديد الموضوع المختار وتخطيط 3 فقرات موجزة (مقدمة، عرض، خاتمة).',
					'توسيع الملاحظات الأربع بجمل تامة مع روابط زمنية ومقارنة.',
					'مراجعة تصريف الأفعال والهجاء وعلامات الترقيم (100 إلى 120 كلمة).'
				],
				finalAnswer: 'Written Expression (5 pts): Cohesive 3-paragraph guided composition with model answer and rubric.'
			};
		}
	}
];
