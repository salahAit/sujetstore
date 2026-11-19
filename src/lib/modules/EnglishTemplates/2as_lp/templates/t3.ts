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

export const TEMPLATES_2AS_LP_T3: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_lp_t3_comp_solidarity',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: No Man is an Island — Solidarity & Relief (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t3_reported_speech',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'Youth Volunteers Stand Together After Winter Floods',
					paragraphs: [
						'Last January, sudden heavy rains flooded several low-lying neighbourhoods in an eastern Algerian province, damaging roads and forcing dozens of families to leave [[their]] homes temporarily. Although the wind was freezing, local volunteers from the Algerian Red Crescent and secondary school clubs gathered at dawn to organize emergency aid.',
						'In spite of blocked streets, rescue teams carried warm blankets, dry food parcels, and clean drinking water to community shelters. A young coordinator told journalists that neighbours had opened [[their]] guest rooms immediately and that local bakers were supplying fresh bread free of charge. He also advised citizens not to walk near swollen riverbanks.',
						'Within forty-eight hours, municipal workers and youth groups cleared the mud from the main school courtyard so that pupils could return safely. The event proved once again that no man is an island: genuine solidarity turns hardship into brotherhood and hope.'
					],
					source: 'Adapted from Algerian Humanitarian Action Chronicles',
					glossary: [
						{ term: 'shelters', meaning: 'safe temporary places providing protection' },
						{ term: 'swollen', meaning: 'risen dangerously high with floodwater' },
						{ term: 'brotherhood', meaning: 'warm spirit of mutual care and unity' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Circle the letter corresponding to the right answer. The text is: a) a scientific report  b) a humanitarian news report  c) a product advertisement.',
						answer: 'b) a humanitarian news report.',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False according to the text?\n  a) Volunteers waited until the cold weather ended before helping families.\n  b) Local bakers provided fresh bread free of charge during the crisis.\n  c) The main school courtyard was cleared within forty-eight hours.',
						answer: 'a) False (they gathered at dawn although the wind was freezing)  |  b) True  |  c) True.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) What natural disaster hit the eastern Algerian province last January?\n  b) What essential supplies did rescue teams carry to the shelters?\n  c) What safety advice did the young coordinator give to citizens?',
						answer:
							'a) Sudden heavy rains caused floods that damaged roads and displaced families.\n  b) They carried warm blankets, dry food parcels, and clean drinking water.\n  c) He advised citizens not to walk near swollen riverbanks.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. Who or what do the underlined words refer to in the text?\n  a) their (paragraph 1)   b) their (paragraph 2)',
						answer: 'a) their (p1) = dozens of families  |  b) their (p2) = neighbours.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Immediate community solidarity and youth volunteering helped affected families recover quickly after the floods',
					[
						{
							text: 'Blocked streets stopped rescue teams from reaching any shelter',
							diagnosticFeedback: 'خطأ: الفقرة الثانية تؤكد وصول فرق الإغاثة بالبطانيات والغذاء رغم انسداد الطرق.'
						},
						{
							text: 'Only professional workers cleaned the school courtyard while youth stayed home',
							diagnosticFeedback: 'خطأ: الفقرة الثالثة تذكر مشاركة عمال البلدية ومجموعات الشباب معا.'
						},
						{
							text: 'Local bakers closed their shops during the emergency',
							diagnosticFeedback: 'خطأ: الخبازون المحليون قدموا الخبز الطازج مجانا.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_lp',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What is the main idea of the passage "Youth Volunteers Stand Together After Winter Floods"?',
						questionTextAr: 'ما الفكرة المحورية للنص؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'يبرز النص سرعة هبة التضامن الجزائري والشبابي لتخفيف آثار الفيضانات وإعادة الحياة للمدرسة.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then answer the questions below:',
						content
					},
					hints: [
						'انتبه لجملتي الاستدراك (Although / In spite of) لتصحيح العبارة الأولى.',
						'ابحث في الفقرة الثانية عن جملة الكلام المنقول (advised citizens not to...).',
						'ميز بين الضمير their الأول (العائلات المتضررة) والثاني (الجيران).'
					],
					solutionStepsAr: [
						'تحديد نوع النص: تقرير إخباري إنساني (1.0 نقطة).',
						'التحقق من العبارات الثلاث (1.5 نقطة).',
						'الإجابة عن الأسئلة المفتوحة الثلاثة بإجابات كاملة (3.0 نقاط).',
						'تحديد عائد كل ضمير مسطر (1.5 نقطة).'
					],
					finalAnswer: 'Comprehension (7 pts): News report (b); F/T/T; 3 open answers; references: dozens of families, neighbours.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Touiza: Algeria\'s Living Heritage of Solidarity',
				paragraphs: [
					'For centuries across Algerian villages and towns, the noble tradition of "Touiza" has symbolized voluntary collective assistance. Whenever a neighbour needed to harvest olives, rebuild a damaged roof, or dig a water well, villagers gathered freely to share the labour without expecting any payment. [[This]] generous custom reflects deep Islamic values of charity and mutual care.',
					'Despite modern urban busyness, the spirit of Touiza has not disappeared. Today, university students and local associations revive [[it]] during winter charity drives, blood donation campaigns, and neighbourhood tree-planting days. An elderly villager in Bejaia remarked that true wealth was measured not by what people kept, but by what they shared in times of need.',
					'Even though natural hardships and economic challenges can test any community, voluntary teamwork keeps society resilient. Teaching young people to volunteer prepares compassionate citizens who never leave a neighbour alone.'
				],
				source: 'Adapted from North African Social Traditions Review',
				glossary: [
					{ term: 'collective', meaning: 'done together by a whole group' },
					{ term: 'revive', meaning: 'bring back into active practice' },
					{ term: 'resilient', meaning: 'strong and able to recover quickly' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Choose the best general idea: a) Farming machines in Algeria  b) Touiza as an enduring tradition of voluntary solidarity  c) Ancient trade routes.',
					answer: 'b) Touiza as an enduring tradition of voluntary solidarity.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether these statements are True or False:\n  a) Villagers participating in Touiza asked for high wages.\n  b) University students and associations still practise the spirit of Touiza today.\n  c) Voluntary teamwork helps communities stay strong during hardships.',
					answer: 'a) False (they shared the labour without expecting any payment)  |  b) True  |  c) True.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) Give two examples of tasks villagers used to do together through Touiza.\n  b) How do young Algerians revive Touiza today?\n  c) How did the elderly villager in Bejaia define true wealth?',
					answer:
						'a) Harvesting olives, rebuilding a damaged roof, or digging a water well (any two).\n  b) Through winter charity drives, blood donation campaigns, and neighbourhood tree-planting days.\n  c) He said true wealth was measured not by what people kept, but by what they shared in times of need.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. What do the underlined words refer to in the text?\n  a) This (paragraph 1)   b) it (paragraph 2)',
					answer: 'a) This = the noble tradition of Touiza  |  b) it = the spirit of Touiza.',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Touiza continues today through youth charity drives, blood donations, and community volunteering',
				[
					{
						text: 'Touiza disappeared completely when modern cities grew',
						diagnosticFeedback: 'خطأ: الفقرة الثانية تؤكد أن روح التويزة لم تختف بل يحييها الشباب.'
					},
					{
						text: 'Participants in Touiza were paid generous salaries for every hour worked',
						diagnosticFeedback: 'خطأ: التويزة عمل تطوعي مجاني خالص.'
					},
					{
						text: 'Only elderly villagers are allowed to participate in community work',
						diagnosticFeedback: 'خطأ: النص يذكر مشاركة طلبة الجامعات والجمعيات المحلية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'How does the passage describe the present status of "Touiza" in Algeria?',
					questionTextAr: 'كيف يصف النص حضور تقليد «التويزة» في الجزائر اليوم؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تستمر روح التويزة اليوم في حملات التبرع بالدم والتشجير والإغاثة الشتوية بجهود الشباب.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then do the following activities:',
					content
				},
				hints: [
					'تأمل تعريف التويزة في الفقرة الأولى: عمل تطوعي بلا مقابل.',
					'اقرأ الفقرة الثانية لاستخراج أمثلة إحياء التويزة المعاصرة وتعريف الثروة الحقيقية.',
					'انتبه لعائد This و it في الفقرتين 1 و 2.'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة للنص (1.0 نقطة).',
					'فحص العبارات الثلاث بين True و False (1.5 نقطة).',
					'الإجابة الكاملة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
					'تحديد مرجع كلمتي الإحالة (1.5 نقطة).'
				],
				finalAnswer: 'Comprehension (7 pts): Idea (b); F/T/T; 3 open answers; references: the tradition of Touiza, the spirit of Touiza.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t3_exp_reported_concession',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'grammar_syntax',
		titleAr: 'Part One — B) Text Exploration: Reported Speech, Concession & Final -ed (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t3_reported_speech',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to donate' },
					noun: { value: 'donation', mark: '0.5' },
					adjective: { value: 'donated', mark: '0.5' }
				},
				{
					verb: { value: 'to assist', mark: '0.5' },
					noun: { given: true, value: 'assistance' },
					adjective: { value: 'assisted', mark: '0.5' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '/t/', words: ['helped', 'packed'], mark: '0.5' },
					{ header: '/d/', words: ['saved', 'cleaned'], mark: '0.5' },
					{ header: '/id/', words: ['donated', 'needed'], mark: '0.5' }
				]
			});

			const directStmt =
				variant === 0
					? 'The coordinator said, "We will deliver warm coats tomorrow."'
					: 'The doctor said, "The clinic needs clean water today."';
			const reportedAns =
				variant === 0
					? 'The coordinator said that they would deliver warm coats the following day.'
					: 'The doctor said that the clinic needed clean water that day.';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the following word-building table:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						`2. Rewrite sentence (b) so that it means the same as sentence (a):\n  1-a) ${directStmt}\n  1-b) The speaker said that ....................................................\n  2-a) The rescue leader told the team, "Do not panic during the flood."\n  2-b) The rescue leader told the team ..........................................\n  3-a) The journalist asked me, "Did the volunteers reach the mountain village?"\n  3-b) The journalist asked me ..................................................\n  4-a) Although the snow was deep, charity trucks arrived on time.\n  4-b) Despite ..................................................................`,
					answer:
						`1-b) ${reportedAns}\n  2-b) The rescue leader told the team not to panic during the flood.\n  3-b) The journalist asked me if the volunteers had reached the mountain village.\n  4-b) Despite the deep snow, charity trucks arrived on time.`,
					mark: '4.5'
				},
				{
					type: 'text',
					content: '3. Classify the following verbs according to the pronunciation of their final "-ed": (helped, saved, donated, packed, cleaned, needed)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'The journalist asked me if the volunteers had reached the mountain village.',
				[
					{
						text: 'The journalist asked me if did the volunteers reach the mountain village?',
						diagnosticFeedback: 'خطأ: نحذف did وعلامة الاستفهام في السؤال المنقول.'
					},
					{
						text: 'The journalist asked me that the volunteers had reached the mountain village.',
						diagnosticFeedback: 'خطأ: سؤال Yes/No ينقل باستعمال if أو whether لا that.'
					},
					{
						text: 'The journalist asked me if had the volunteers reached the mountain village.',
						diagnosticFeedback: 'خطأ: السؤال المنقول يأخذ ترتيب الجملة الخبرية (فاعل ثم فعل).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Report the question accurately: The journalist asked me, "Did the volunteers reach the mountain village?"',
					questionTextAr: 'اختر الصيغة الصحيحة لنقل هذا السؤال:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نستعمل if ونحذف did ونحول الماضي البسيط إلى Past Perfect (had reached) بترتيب خبري.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Complete the following morphology, grammar, and phonology tasks:',
					content
				},
				hints: [
					'تذكر تحويل الأزمنة والظروف: will تصبح would و tomorrow تصبح the following day.',
					'نفي الأمر المنقول يكون بـ not to + Stem، والاسم بعد Despite يأتي بلا of.',
					'في Final -ed فقط الأفعال المنتهية بصوت /t/ أو /d/ تأخذ /id/.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق لكلمتي donate و assist (2.0 نقطة).',
					'نقل الخبر والأمر والسؤال ثم تحويل although إلى despite (4.5 نقاط).',
					'تصنيف الأفعال الستة في جدول Final -ed (1.5 نقطة).'
				],
				finalAnswer: `Text Exploration (8 pts): Morphology table; Reported statements/order/question + Despite the deep snow; /t/: helped, packed | /d/: saved, cleaned | /id/: donated, needed.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t3_exp_phonology_discourse',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'phonology_pronunciation',
		titleAr: 'Part One — B) Text Exploration: Concession, Final -s/-ed & Cohesion (8 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t3_final_ed_s',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { value: 'to volunteer', mark: '0.5' },
					noun: { given: true, value: 'volunteer' },
					adjective: { value: 'voluntary', mark: '0.5' }
				},
				{
					verb: { given: true, value: 'to cooperate' },
					noun: { value: 'cooperation', mark: '0.5' },
					adjective: { value: 'cooperative', mark: '0.5' }
				}
			]);

			const phonoTable =
				variant === 0
					? buildEnglishPhonologyTableBlock({
							columns: [
								{ header: '/s/', words: ['blankets', 'tents'], mark: '0.5' },
								{ header: '/z/', words: ['volunteers', 'meals'], mark: '0.5' },
								{ header: '/iz/', words: ['villages', 'boxes'], mark: '0.5' }
							]
						})
					: buildEnglishPhonologyTableBlock({
							columns: [
								{ header: '/t/', words: ['washed', 'reached'], mark: '0.5' },
								{ header: '/d/', words: ['offered', 'shared'], mark: '0.5' },
								{ header: '/id/', words: ['assisted', 'flooded'], mark: '0.5' }
							]
						});

			const phonoPrompt =
				variant === 0
					? '4. Classify the following words according to the pronunciation of their final "-s": (blankets, volunteers, villages, tents, meals, boxes)'
					: '4. Classify the following verbs according to the pronunciation of their final "-ed": (washed, offered, assisted, reached, shared, flooded)';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the following table (Verb / Noun / Adjective):',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content:
						'2. Combine each pair using the connector in brackets:\n  a) The volunteers were exhausted. They continued distributing parcels. (In spite of)\n  b) The earthquake shook the region. Neighbours stayed calm and united. (Even though)',
					answer:
						'a) In spite of being exhausted (or: In spite of their exhaustion), the volunteers continued distributing parcels.\n  b) Even though the earthquake shook the region, neighbours stayed calm and united.',
					mark: '2.5'
				},
				{
					type: 'text',
					content:
						'3. Reorder the following sentences to form a coherent paragraph:\n  a) Finally, the school reopened safely two days later.\n  b) Heavy rain damaged the main bridge near the village.\n  c) First, local youth cleared the fallen branches from the road.\n  d) Next, relief teams delivered food and warm blankets to families.',
					answer: 'Correct order: b - c - d - a.',
					mark: '2.0'
				},
				{
					type: 'text',
					content: phonoPrompt,
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'b - c - d - a',
				[
					{
						text: 'a - b - c - d',
						diagnosticFeedback: 'خطأ: الجملة (a) تبدأ بـ Finally فهي الخاتمة لا المقدمة.'
					},
					{
						text: 'c - b - d - a',
						diagnosticFeedback: 'خطأ: يجب تقديم سبب الأزمة (b) قبل خطوات الإغاثة (First).'
					},
					{
						text: 'b - d - c - a',
						diagnosticFeedback: 'خطأ: First (c) يجب أن تسبق Next (d).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What is the logical order of the four sentences about the village flood relief?',
					questionTextAr: 'ما الترتيب المنطقي الصحيح للفقرة المبعثرة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'نبدأ بالحدث العام (b)، ثم الروابط الزمنية المتسلسلة: First (c) ثم Next (d) ثم Finally (a).'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 8,
					instruction: 'Complete the morphology, grammar, reordering, and phonology activities:',
					content
				},
				hints: [
					'بعد In spite of نستعمل V-ing (being exhausted) أو اسما (their exhaustion).',
					'في الترتيب المنطقي ابدأ بالجملة الخالية من الروابط الزمنية ثم تتبع First / Next / Finally.',
					'في الصوتيات انطق الصوت الأخير قبل النهاية -s أو -ed لتصنيفه بدقة.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'الربط بـ In spite of و Even though (2.5 نقطة).',
					'ترتيب الفقرة وفق التسلسل المنطقي b-c-d-a (2.0 نقطة).',
					'تصنيف الكلمات الست في جدول الصوتيات (1.5 نقطة).'
				],
				finalAnswer: 'Text Exploration (8 pts): Morphology chart; In spite of + Even though; order b-c-d-a; phonology classification table.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_lp_t3_writing_solidarity',
		grade: '2as_lp',
		trimesterId: 't3',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Opinion Essay / Humanitarian Speech (5 pts)',
		curriculumLessonId: 'eng_lesson_2as_lp_t3_opinion_speech',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Your school charity club is launching a winter solidarity campaign for isolated mountain villages. Write a short speech (100 to 120 words) urging your classmates to participate.'
					: 'Write an opinion essay (100 to 120 words) showing why voluntary work and solidarity are essential during natural disasters.';

			const notes =
				topicVariant === 0
					? [
							'Greet teachers and fellow students warmly / state the campaign goal',
							'Explain the need: cold mountain weather / families need blankets, warm coats, and food parcels',
							'Encourage youth action: even a small donation or one hour of packing makes a difference',
							'Close with a unifying message: no man is an island; together we bring hope'
						]
					: [
							'State clear opinion: solidarity is the strongest shelter during floods or earthquakes',
							'First argument: quick local volunteers reach neighbours before distant help arrives',
							'Second argument: volunteering builds empathy, discipline, and social unity among youth',
							'Conclude: although disasters cause material loss, compassion helps communities recover'
						];

			const freePrompt =
				topicVariant === 0
					? 'Write an article for your school magazine about a real or imagined voluntary clean-up or charity campaign that united your neighbourhood.'
					: 'Some people think charity means only giving money, while others believe giving time and skills matters equally. Write an essay defending your point of view.';

			const modelAnswer =
				topicVariant === 0
					? 'Dear teachers and fellow students, today I invite each of you to join our school winter solidarity campaign. Although our classrooms are warm and comfortable, several families in remote mountain villages are facing freezing nights and snow-blocked roads. First, we can collect clean blankets, winter coats, and dry food parcels before Friday. Moreover, even students who cannot donate goods can volunteer one hour after class to sort and pack boxes neatly. Remember that the spirit of Touiza has always united Algerians in difficult moments. In conclusion, no man is an island; let us join hands this week so that every family feels our warmth and brotherhood.'
					: 'In my view, active solidarity is the greatest strength any community can possess when natural disasters strike. First, whenever floods or earthquakes occur, local volunteers are often the earliest helpers to deliver water, food, and comfort to affected neighbours. Moreover, although students have busy academic schedules, participating in humanitarian relief teaches young people genuine empathy, patience, and civic responsibility. In spite of material damage, united citizens rebuild their schools and homes far more quickly than divided individuals ever could. In conclusion, I firmly believe that encouraging youth volunteering turns moments of crisis into lasting lessons of mercy and brotherhood.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Relevance & audience tone (1.5 pt) | Coherence & linkers (1.5 pt) | Grammar & vocabulary accuracy (1.5 pt) | Spelling & punctuation (0.5 pt)',
				mark: '5.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Address the audience directly (for a speech) or state a clear thesis (for an essay), support with two linked arguments, and end with a unifying call to action',
				[
					{
						text: 'Skip the introduction and write only a list of donated items',
						diagnosticFeedback: 'خطأ: التعبير يتطلب بنية متكاملة من مقدمة وعرض وخاتمة.'
					},
					{
						text: 'Use informal slang and avoid all discourse linkers',
						diagnosticFeedback: 'خطأ: الكتابة المدرسية تحتاج أسلوبا محترما وروابط مثل First و Moreover و In conclusion.'
					},
					{
						text: 'Copy two paragraphs from the reading passage word for word',
						diagnosticFeedback: 'خطأ: النسخ الحرفي من النص يحرم التلميذ من علامة التعبير.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_lp',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'How can you score full marks (5/5) on a 2AS LP Opinion Essay or Humanitarian Speech?',
					questionTextAr: 'ما الشرط الأساسي لنيل العلامة الكاملة في مقال الرأي أو الخطاب التضامني؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يتحقق التميز باحترام جنس النص (خطاب أو مقال رأي) وتوظيف الملاحظات والروابط المنطقية ولغة سليمة.'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 5,
					instruction: 'Choose ONE of the two topics and write a clear composition (100 to 120 words):',
					content: [block]
				},
				hints: [
					'ميز نبرة الخطاب (Dear teachers and fellow students) عن نبرة مقال الرأي (In my view / I firmly believe).',
					'استثمر رابط استدراك واحد على الأقل (Although / In spite of) لتقوية الحجاج.',
					'اختم برسالة إنسانية موجزة تلخص قيمة التضامن والتطوع.'
				],
				solutionStepsAr: [
					'اختيار الموضوع وتحديد البنية (مقدمة + حجتان مع مثال + خاتمة).',
					'توسيع الملاحظات بجمل سليمة وروابط تماسك واضحة.',
					'مراجعة الهجاء وعلامات الترقيم وتوافق الأزمنة.'
				],
				finalAnswer: 'Written Expression (5 pts): Complete guided speech/opinion essay with model answer and rubric.'
			};
		}
	}
];
