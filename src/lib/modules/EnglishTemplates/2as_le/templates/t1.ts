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

export const TEMPLATES_2AS_LE_T1: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_le_t1_comp_change_peace',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: Signs of the Time & Make Peace (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t1_used_to_would',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'From Ink and Paper Circles to Digital Dialogue in Algeria',
					paragraphs: [
						'Two generations ago, intellectual life in Algerian cities like Constantine and Tlemcen used to revolve around neighbourhood bookshops, mosque study circles, and quiet family courtyards. Every weekend, young scholars would gather with elders to discuss history, Arabic grammar, and civic manners. Handwritten letters travelled slowly across provinces, yet [[they]] carried thoughtful reflections that readers treasured for years.',
						'By contrast, contemporary communication moves at remarkable speed. Today, foreign-language students exchange research files across continents in seconds, whereas lengthy handwritten correspondence has become rare. However, despite the undeniable convenience of instant platforms, hasty online remarks can easily spark misunderstandings [[which]] face-to-face courtesy would have prevented.',
						'Educators therefore remind youth that technological progress must walk hand in hand with ethical dialogue. Although earlier communities lacked digital networks, they managed to preserve deep social harmony through patience and attentive listening. Combining modern tools with [[that]] timeless etiquette remains the wisest path forward.'
					],
					source: 'Adapted from Mediterranean Cultural & Linguistic Studies',
					glossary: [
						{ term: 'correspondence', meaning: 'communication by exchanging written letters' },
						{ term: 'hasty', meaning: 'done too quickly without careful thought' },
						{ term: 'etiquette', meaning: 'polite rules of respectful social conduct' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Choose the type of discourse used in the text: a) argumentative and compare-contrast  b) purely fictional  c) instructional recipe.',
						answer: 'a) argumentative and compare-contrast (comparing past and modern communication with an ethical stance).',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False according to the text?\n  a) Two generations ago, young scholars used to discuss history and civic manners with elders.\n  b) Instant online messages never cause misunderstandings among users.\n  c) Educators urge youth to pair modern digital tools with traditional listening etiquette.',
						answer: 'a) True  |  b) False (hasty online remarks can easily spark misunderstandings)  |  c) True.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) Why did readers treasure handwritten letters in the past?\n  b) What contrast does paragraph 2 draw between modern communication and earlier correspondence?\n  c) How did earlier communities manage to preserve social harmony despite lacking digital networks?',
						answer:
							'a) Because they carried thoughtful reflections that lasted for years.\n  b) Modern communication is rapid and global, whereas lengthy handwritten correspondence has become rare and hasty online remarks can trigger misunderstandings.\n  c) Through patience, face-to-face courtesy, and attentive listening.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. What do the underlined words refer to in the text?\n  a) they (paragraph 1)   b) which (paragraph 2)   c) that (paragraph 3)',
						answer: 'a) they = handwritten letters  |  b) which = misunderstandings  |  c) that = timeless etiquette (patience and attentive listening).',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'True progress blends rapid modern communication with the patience and respectful listening of earlier generations',
					[
						{
							text: 'Digital platforms should be abandoned entirely in favour of slow postal mail',
							diagnosticFeedback: 'خطأ: النص يدعو إلى الجمع المتوازن بين الأدوات الحديثة وآداب الحوار الأصيلة.'
						},
						{
							text: 'Earlier Algerian cities had no spaces for intellectual discussion or learning',
							diagnosticFeedback: 'خطأ: الفقرة الأولى تذكر حلقات العلم والمكتبات والمجالس العائلية في قسنطينة وتلمسان.'
						},
						{
							text: 'Speed alone guarantees respectful and misunderstanding-free dialogue',
							diagnosticFeedback: 'خطأ: الفقرة الثانية تحذر من أن التعليقات المتسرعة تثير سوء الفهم.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't1',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What balanced thesis does the author defend in "From Ink and Paper Circles to Digital Dialogue in Algeria"?',
						questionTextAr: 'ما الأطروحة المتوازنة التي يدافع عنها الكاتب في النص؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يدعو النص إلى الجمع بين سرعة الوسائل الرقمية المعاصرة وأخلاق الحوار والإنصات الأصيلة.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then answer the questions below:',
						content
					},
					hints: [
						'لاحظ توظيف الكاتب لأسلوب المقابلة والاستدراك (By contrast, whereas, However, despite).',
						'في السؤال 3b قارن السرعة الحديثة بالمراسلة الورقية ومخاطر التسرع.',
						'تحقق من عائد they و which و that بالعودة للجملة السابقة لكل منها مباشرة.'
					],
					solutionStepsAr: [
						'تحديد نمط الخطاب في النص (1.0 نقطة).',
						'فحص العبارات الثلاث بين الصحيح والخطأ (1.5 نقطة).',
						'الإجابة التحليلية الكاملة عن الأسئلة الثلاثة (3.0 نقاط).',
						'تحديد عائد كلمات الإحالة الثلاث بدقة (1.5 نقطة).'
					],
					finalAnswer: 'Comprehension (7 pts): Discourse (a); T/F/T; 3 analytical answers; references: handwritten letters, misunderstandings, timeless etiquette.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Traditional Councils of Reconciliation in Algerian Society',
				paragraphs: [
					'Long before modern legal offices expanded across every town, Algerian rural and urban communities used to rely on respected local assemblies known as "Tajmaat" or councils of wise elders to settle disputes amicably. Whenever two neighbours disagreed over land boundaries or water rights, respected mediators would invite both parties to speak openly without interruption.',
					'Despite the emotional tension [[that]] often accompanied such disagreements, the mediators usually managed to guide both sides toward fair compensation and sincere forgiveness. Elders reminded disputants that bitter quarrels could harm entire families, whereas swift reconciliation protected brotherhood and honour. Many observers later noted that stubborn rivals should have accepted early mediation before small quarrels grew wider.',
					'Today, formal courts remain indispensable for upholding law; however, the ancestral culture of peaceful dialogue still inspires community associations across Algeria. Preserving [[these]] constructive habits helps young citizens resolve conflicts with maturity rather than anger.'
				],
				source: 'Adapted from North African Civic History Notes',
				glossary: [
					{ term: 'amicably', meaning: 'in a friendly and peaceful spirit' },
					{ term: 'disputants', meaning: 'people involved in a disagreement' },
					{ term: 'indispensable', meaning: 'absolutely necessary' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Choose the best title for the passage: a) Ancient Farming Tools  b) Peaceful Mediation and Reconciliation in Algerian Heritage  c) Urban Architecture.',
					answer: 'b) Peaceful Mediation and Reconciliation in Algerian Heritage.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether these statements are True or False:\n  a) Traditional councils allowed only one side to speak during a dispute.\n  b) Wise mediators often succeeded in guiding neighbours toward fair reconciliation.\n  c) Formal courts are unnecessary today according to paragraph 3.',
						answer: 'a) False (mediators invited both parties to speak openly)  |  b) True  |  c) False (formal courts remain indispensable).',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) What kinds of local disagreements did traditional councils help settle?\n  b) Why did elders warn disputants against letting quarrels continue?\n  c) How does the ancestral culture of dialogue benefit young citizens today?',
					answer:
						'a) Disagreements over land boundaries or water rights.\n  b) Because bitter quarrels could harm entire families, whereas swift reconciliation protected brotherhood and honour.\n  c) It helps young citizens resolve conflicts with maturity rather than anger.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. What do the underlined words refer to in the text?\n  a) that (paragraph 2)   b) these (paragraph 3)',
					answer: 'a) that = the emotional tension  |  b) these = constructive habits (peaceful dialogue and reconciliation).',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Traditional mediation councils complemented social justice by encouraging fair listening and peaceful reconciliation',
				[
					{
						text: 'Traditional councils encouraged prolonged quarrels between neighbouring families',
						diagnosticFeedback: 'خطأ: بل عملت المجالس على الصلح السريع وحماية الأخوة.'
					},
					{
						text: 'The author argues that modern formal courts should be replaced entirely',
						diagnosticFeedback: 'خطأ: الفقرة الثالثة تؤكد أن المحاكم الرسمية تظل ضرورية إلى جانب ثقافة الحوار.'
					},
					{
						text: 'Only disagreements about trade ships were discussed in local councils',
						diagnosticFeedback: 'خطأ: النص يذكر الخلافات حول حدود الأراضي وحقوق المياه.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What is the core idea of "Traditional Councils of Reconciliation in Algerian Society"?',
					questionTextAr: 'ما الفكرة المحورية لنص مجالس الصلح التقليدية في الجزائر؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يبرز النص دور مجالس الصلح التقليدية في ترسيخ الحوار والعدل وبقاء قيمها ملهمة للشباب اليوم.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then answer the questions below:',
					content
				},
				hints: [
					'تأمل توظيف used to و would و managed to و should have داخل النص.',
					'انتبه للكلمات المشددة مثل only أو unnecessary عند فحص True/False.',
					'في الإحالة ابحث عن العبارة الاسمية السابقة مباشرة لـ that و these.'
				],
				solutionStepsAr: [
					'اختيار العنوان المناسب للنص (1.0 نقطة).',
					'الحكم على صحة العبارات الثلاث (1.5 نقطة).',
					'صياغة إجابات تامة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
					'تعيين عائد كلمتي الإحالة (1.5 نقطة).'
				],
				finalAnswer: 'Comprehension (7 pts): Title (b); F/T/F; 3 detailed answers; references: the emotional tension, constructive habits.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t1_exp_habits_modals',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'grammar_tenses',
		titleAr: 'Part One — B) Text Exploration: Used to / Would, Modals & Morphology (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t1_used_to_would',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock(
				variant === 0
					? [
							{
								verb: { given: true, value: 'to reconcile' },
								noun: { value: 'reconciliation', mark: '0.5' },
								adjective: { value: 'reconciliatory', mark: '0.5' }
							},
							{
								verb: { value: 'to mediate', mark: '0.5' },
								noun: { given: true, value: 'mediation' },
								adjective: { value: 'mediated', mark: '0.5' }
							}
						]
					: [
							{
								verb: { given: true, value: 'to correspond' },
								noun: { value: 'correspondence', mark: '0.5' },
								adjective: { value: 'corresponding', mark: '0.5' }
							},
							{
								verb: { value: 'to tolerate', mark: '0.5' },
								noun: { given: true, value: 'tolerance' },
								adjective: { value: 'tolerant', mark: '0.5' }
							}
						]
			);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '1st Syllable', words: ['DI-a-logue', 'PA-tience'], mark: '0.5' },
					{ header: '2nd Syllable', words: ['tra-DI-tion', 're-SOLVE'], mark: '0.5' }
				]
			});

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the morphology table below:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						'2. Rewrite sentence (b) so that it means the same as sentence (a):\n  1-a) After intense talks, the elders succeeded in restoring peace between the neighbours.\n  1-b) After intense talks, the elders managed ........................................\n  2-a) It was a mistake that the rivals ignored the mediator\'s wise advice.\n  2-b) The rivals should ..............................................................\n  3-a) Although the dispute was complex, both sides signed a fair accord.\n  3-b) Despite ........................................................................',
					answer:
						'1-b) After intense talks, the elders managed to restore peace between the neighbours.\n  2-b) The rivals should not have ignored (or: should have accepted) the mediator\'s wise advice.\n  3-b) Despite the complexity of the dispute, both sides signed a fair accord.',
					mark: '3.0'
				},
				{
					type: 'text',
					content:
						'3. Decide whether "would" can replace "used to" in each sentence (write YES or NO and justify briefly):\n  a) Fifty years ago, our family used to live in a quiet courtyard in Blida.\n  b) Every autumn, neighbours used to help each other harvest olives.',
					answer:
						'a) NO ("live" is a stative verb; use "used to" only).  |  b) YES ("help" is a repeated past action in a clear past time frame).',
					mark: '1.0'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to their stressed syllable: (dialogue, tradition, patience, resolve)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'After intense talks, the elders managed to restore peace between the neighbours.',
				[
					{
						text: 'After intense talks, the elders managed restoring peace between the neighbours.',
						diagnosticFeedback: 'خطأ: بعد managed نستخدم to + Stem لا V-ing.'
					},
					{
						text: 'After intense talks, the elders should have restored peace between the neighbours.',
						diagnosticFeedback: 'خطأ: should have تفيد أنهم لم يحققوا السلم، وهذا يعكس المعنى الأصلي.'
					},
					{
						text: 'After intense talks, the elders could to restore peace between the neighbours.',
						diagnosticFeedback: 'خطأ: لا نضع to بعد could، ويفضل managed to للإنجاز المحدد.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Rewrite accurately with "managed": "After intense talks, the elders succeeded in restoring peace between the neighbours."',
					questionTextAr: 'اختر إعادة الصياغة السليمة باستعمال managed to:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'العبارة succeeded in + V-ing تكافئ managed to + Stem في الدلالة على إنجاز محدد بعد جهد.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the following morphology, grammar, and phonology tasks:',
					content
				},
				hints: [
					'تذكر أن managed to يتبعها المصدر المجرد (restore) دون ing.',
					'ميز أفعال الحالة (live) التي تأخذ used to فقط عن الأفعال المتكررة (help) التي تقبل would.',
					'حول was complex إلى عبارة اسمية (the complexity of the dispute) بعد Despite.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'إعادة الصياغة باستعمال managed to و should have و Despite (3.0 نقاط).',
					'التمييز بين used to و would مع التعليل (1.0 نقطة).',
					'تصنيف الكلمات الأربع حسب المقطع المنبور (1.0 نقطة).'
				],
				finalAnswer: 'Text Exploration (7 pts): Morphology table; managed to restore / should not have ignored / Despite the complexity; NO (stative) / YES (action); stress table complete.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t1_exp_contrast_discourse',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'discourse_cohesion',
		titleAr: 'Part One — B) Text Exploration: Contrast Linkers, Lexis & Reordering (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t1_contrast_concession',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { value: 'to harmonize', mark: '0.5' },
					noun: { given: true, value: 'harmony' },
					adjective: { value: 'harmonious', mark: '0.5' }
				},
				{
					verb: { given: true, value: 'to progress' },
					noun: { value: 'progress', mark: '0.5' },
					adjective: { value: 'progressive', mark: '0.5' }
				}
			]);

			const exactPhono = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '/s/', words: ['books', 'habits'], mark: '0.5' },
					{ header: '/z/', words: ['elders', 'values'], mark: '0.5' },
					{ header: '/iz/', words: ['chances', 'messages'], mark: '0.5' }
				]
			});

			const pairA =
				variant === 0
					? 'Printed books encourage deep focus. Short digital posts invite rapid skimming. (whereas)'
					: 'Past villages enjoyed quiet evenings. Modern megacities face constant traffic noise. (whereas)';
			const ansA =
				variant === 0
					? 'Printed books encourage deep focus, whereas short digital posts invite rapid skimming.'
					: 'Past villages enjoyed quiet evenings, whereas modern megacities face constant traffic noise.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the word-building chart below:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						`2. Combine each pair of sentences using the discourse marker in brackets (respect punctuation):\n  a) ${pairA}\n  b) Instant tools save time. Careful verification remains essential. (However)`,
					answer:
						`a) ${ansA}\n  b) Instant tools save time; however, careful verification remains essential. (or with a full stop before However,)`,
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Reorder the following sentences to form a coherent paragraph:\n  a) However, both past and modern societies share the same deep need for mutual respect.\n  b) Over the past five decades, Algerian daily habits have evolved noticeably.\n  c) Whereas grandparents used to gather in courtyards, youth today often communicate online.\n  d) Preserving courteous dialogue therefore bridges generations peacefully.',
					answer: 'Correct order: b - c - a - d.',
					mark: '1.5'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to the pronunciation of their final "-s": (books, elders, chances, habits, values, messages)',
					mark: ''
				},
				exactPhono
			];

			const mcq = buildUniqueMcqOptions(
				'b - c - a - d',
				[
					{
						text: 'a - b - c - d',
						diagnosticFeedback: 'خطأ: لا تبدأ الفقرة بأداة الاستدراك However (a).'
					},
					{
						text: 'b - a - c - d',
						diagnosticFeedback: 'خطأ: الجملة (c) تفصل التغير قبل أن تستدرك (a) بالثابت المشترك.'
					},
					{
						text: 'c - b - d - a',
						diagnosticFeedback: 'خطأ: الجملة (b) هي الافتتاحية العامة و (d) تحمل therefore فهي الخاتمة.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Select the coherent order for the four sentences on social change and dialogue:',
					questionTextAr: 'اختر الترتيب المنطقي السليم لجمل الفقرة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تقدم (b) الموضوع العام، وتفصل (c) المقابلة بـ Whereas، وتستدرك (a) بـ However، وتختم (d) بالنتيجة بـ therefore.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the morphology, discourse linkers, reordering, and phonology activities:',
					content
				},
				hints: [
					'تذكر الترقيم الدقيق مع However: فاصلة منقوطة أو نقطة قبلها، وفاصلة بعدها.',
					'في الترتيب ابحث عن الجملة الافتتاحية (b) والجملة الختامية التي تحوي therefore (d).',
					'في Final -s انتبه لصوت الصفير في chances و messages (/iz/).'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'الربط بـ whereas و However مع الترقيم السليم (2.0 نقطة).',
					'ترتيب الفقرة بترتيب b - c - a - d (1.5 نقطة).',
					'تصنيف الكلمات الست في جدول Final -s (1.5 نقطة).'
				],
				finalAnswer: `Text Exploration (7 pts): harmony/progress table; whereas + However; order b-c-a-d; /s/: books, habits | /z/: elders, values | /iz/: chances, messages.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t1_writing_compare_contrast',
		grade: '2as_le',
		trimesterId: 't1',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Compare-and-Contrast Essay (6 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t1_compare_contrast_essay',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Write a well-structured 4-paragraph compare-and-contrast essay (120 to 150 words) comparing past and modern study and communication habits in Algeria.'
					: 'Write a 4-paragraph compare-and-contrast essay (120 to 150 words) comparing traditional community mediation with modern legal methods of resolving social conflicts.';

			const notes =
				topicVariant === 0
					? [
							'Introduction: state how rapid change reshaped daily habits + clear thesis balancing progress and values',
							'Body 1 (Past): municipal libraries, handwritten letters, weekend study circles (use used to / would)',
							'Body 2 (Present & Contrast): digital platforms, instant files, risk of hasty replies (use whereas / however / unlike)',
							'Conclusion: synthesize both eras — combine modern efficiency with traditional patience and courtesy'
						]
					: [
							'Introduction: define social harmony + clear thesis comparing traditional councils and modern courts',
							'Body 1 (Traditional Mediation): elders listened calmly, encouraged sincere apology and lasting brotherhood',
							'Body 2 (Modern Courts & Contrast): formal written law, binding fairness, yet sometimes slower or impersonal (use whereas / despite)',
							'Conclusion: both approaches complement each other to build a just and peaceful society'
						];

			const freePrompt =
				topicVariant === 0
					? 'Some observers claim that modern life leaves no room for deep reading and neighbourly hospitality. Write an academic essay evaluating this claim with balanced examples.'
					: 'True peace begins inside families and classrooms before reaching nations. Write a persuasive essay illustrating how youth can cultivate respectful dialogue daily.';

			const modelAnswer =
				topicVariant === 0
					? 'Over recent decades, Algerian study and communication habits have undergone profound transformation. Although digital innovation has accelerated access to knowledge, both past and modern eras reveal distinct strengths worth examining.\n\nTwo generations ago, students used to rely on municipal libraries, printed references, and careful handwritten notes. Every weekend, young learners would gather in quiet study circles to exchange ideas face to face, while personal letters fostered patience and thoughtful expression.\n\nBy contrast, contemporary learners consult online archives and share academic documents across continents within seconds. Whereas earlier correspondence required days, instant messaging connects families effortlessly. However, despite this remarkable speed, frequent digital distractions and hasty remarks can weaken concentration and polite dialogue.\n\nAll in all, modern efficiency and ancestral discipline need not oppose each other. Blending smart technology with traditional patience and courtesy offers Algerian youth the wisest foundation for lasting success.'
					: 'Every thriving society needs reliable ways to settle disagreements fairly and protect social harmony. Comparing traditional Algerian councils of reconciliation with modern legal courts shows how both methods serve justice in complementary ways.\n\nIn the past, local communities used to turn to respected elders whenever disputes arose over land or water rights. Mediators would listen patiently to both sides, encouraging honest compromise and warm forgiveness so that neighbouring families stayed united.\n\nBy contrast, modern legal courts operate through written codes, official records, and binding verdicts. Whereas traditional mediation relied mainly on moral authority, formal courts guarantee equal legal protection in large, complex cities. However, despite their institutional precision, court procedures can occasionally feel formal and slow.\n\nTo conclude, formal law remains indispensable for justice, yet the ancestral spirit of calm dialogue still plays a vital role. Together, they build a peaceful and respectful society.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Relevance & clear thesis (2.0 pts) | 4-paragraph organization & academic linkers (1.5 pt) | Grammar & lexical range (1.5 pt) | Spelling & punctuation (1.0 pt)',
				mark: '6.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Organize four distinct paragraphs with a clear thesis, past/present balance using academic linkers, and a synthesized conclusion',
				[
					{
						text: 'Write one single block of text without paragraph breaks or contrast connectors',
						diagnosticFeedback: 'خطأ: مقال شعبة اللغات (6 نقاط) يشترط تقسيم الفقرات والروابط الأكاديمية.'
					},
					{
						text: 'Introduce a completely unrelated topic in the final conclusion paragraph',
						diagnosticFeedback: 'خطأ: الخاتمة تلخص وتغلق محاور المقال ولا تفتح موضوعا جديدا.'
					},
					{
						text: 'Use "would" with stative verbs like "live" and "be" throughout the essay',
						diagnosticFeedback: 'خطأ: أفعال الحالة تأخذ used to فقط ولا تقبل would.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't1',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What distinguishes a top-scoring (6/6) Compare-and-Contrast Essay in 2AS Foreign Languages?',
					questionTextAr: 'ما الذي يميز مقال المقارنة والمقابلة الحائز على العلامة الكاملة (6/6) في شعبة اللغات؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتحقق التميز بتصميم 4 فقرات واضحة وأطروحة دقيقة وتنويع الروابط (Whereas, By contrast, However, All in all).'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 6,
					instruction: 'Choose ONE of the following topics and write a 4-paragraph essay (120 to 150 words):',
					content: [block]
				},
				hints: [
					'ابدأ بمقدمة تنتهي بأطروحة واضحة (Thesis Statement) تحدد محوري المقارنة.',
					'وظف used to و would بدقة في فقرة الماضي، و whereas / By contrast / However في فقرة المقابلة.',
					'تأكد من سلامة الترقيم حول However ومن وجود خاتمة متوازنة (120 إلى 150 كلمة).'
				],
				solutionStepsAr: [
					'اختيار الموضوع وصياغة أطروحة دقيقة للمقال.',
					'كتابة فقرتي العرض بتوازن وتنويع الروابط الأكاديمية.',
					'صياغة خاتمة جامعة ومراجعة الترقيم والهجاء واللغة.'
				],
				finalAnswer: 'Written Expression (6 pts): Complete 4-paragraph compare-and-contrast essay with model answer and rubric.'
			};
		}
	}
];
