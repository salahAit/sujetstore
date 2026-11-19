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

export const TEMPLATES_2AS_LE_T3: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_le_t3_comp_media_solidarity',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: Ethical Media & Humanitarian Solidarity (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t3_reported_verbs',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'Truthful Reporting Saves Lives During Natural Disasters',
					paragraphs: [
						'When a sudden winter storm or earth tremor strikes a populated district, accurate journalism becomes almost as urgent as emergency ambulances. Last February, after heavy snowfall isolated several highland villages in northern Algeria, local radio reporters and regional newspapers coordinated closely with Civil Protection teams. Officials explained that verified weather bulletins helped residents stay indoors safely while road crews cleared mountain passes.',
						'At the same time, however, an unverified social media post falsely claimed that a major dam near the valley had collapsed. The rumour spread rapidly within minutes, triggering unnecessary panic on narrow roads. Rescue chiefs immediately warned citizens not to share unchecked alerts and urged local media editors to publish only confirmed field reports. [[They]] reminded the public that truthful information protects rescue routes for real emergencies.',
						'Fortunately, responsible youth clubs used [[their]] community pages to circulate official hotline numbers and organize blanket collections. By sunset, aid convoys reached every isolated village, proving that honest journalism and civic solidarity work best together.'
					],
					source: 'Adapted from Mediterranean Media Ethics & Relief Review',
					glossary: [
						{ term: 'tremor', meaning: 'a shaking movement of the ground' },
						{ term: 'unchecked', meaning: 'not verified or confirmed for accuracy' },
						{ term: 'hotline', meaning: 'direct emergency telephone service' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Circle the letter corresponding to the right answer. The text is: a) a media and humanitarian report  b) a travel brochure  c) a biography.',
						answer: 'a) a media and humanitarian report.',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False according to the text?\n  a) Verified weather bulletins helped residents stay safe during the heavy snowfall.\n  b) The rumour about the dam collapse was confirmed true by Civil Protection.\n  c) Youth clubs helped share official emergency numbers and collect blankets.',
						answer: 'a) True  |  b) False (it was an unverified false rumour)  |  c) True.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) Why did the false social media rumour cause harm during the snowstorm?\n  b) What two actions did rescue chiefs ask of citizens and media editors?\n  c) How did responsible youth clubs contribute to the relief effort?',
						answer:
							'a) It spread rapidly and triggered unnecessary panic on narrow roads.\n  b) They warned citizens not to share unchecked alerts and urged media editors to publish only confirmed field reports.\n  c) They circulated official hotline numbers and organized blanket collections.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. Who do the underlined words refer to in the text?\n  a) They (paragraph 2)   b) their (paragraph 3)',
						answer: 'a) They = rescue chiefs  |  b) their = responsible youth clubs.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Verified journalism prevents panic and helps coordinate real humanitarian aid during natural disasters',
					[
						{
							text: 'Sharing unverified breaking posts quickly is safer than waiting for official bulletins',
							diagnosticFeedback: 'خطأ: النص يحذر صراحة من أن الإشاعات غير الموثقة تثير الذعر وتعطل الإغاثة.'
						},
						{
							text: 'Local radio and newspapers refused to cooperate with Civil Protection teams',
							diagnosticFeedback: 'خطأ: الفقرة الأولى تؤكد تنسيقهم الوثيق مع فرق الحماية المدنية.'
						},
						{
							text: 'Aid convoys failed to reach the mountain villages before sunset',
							diagnosticFeedback: 'خطأ: الفقرة الثالثة تذكر وصول قوافل الإغاثة قبل الغروب.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What key conclusion does "Truthful Reporting Saves Lives During Natural Disasters" highlight?',
						questionTextAr: 'ما الخلاصة الجوهرية التي يبرزها النص حول الإعلام والتضامن؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تثبت الخبر الإعلامي يمنع الذعر ويحمي طرق الإغاثة ويدعم جهود المتطوعين وقت الكوارث.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then answer the questions below:',
						content
					},
					hints: [
						'لاحظ أفعال النقل المتقدمة داخل النص: explained, claimed, warned, urged, reminded.',
						'انتبه لكلمة falsely في الفقرة الثانية لتصحيح العبارة 2b.',
						'تأكد أن They تعود على rescue chiefs و their تعود على responsible youth clubs.'
					],
					solutionStepsAr: [
						'تحديد نوع النص: تقرير إعلامي وإنساني (1.0 نقطة).',
						'فحص العبارات الثلاث (1.5 نقطة).',
						'الإجابة التحليلية الكاملة عن الأسئلة الثلاثة (3.0 نقاط).',
						'تعيين عائد الضميرين المسطرين بدقة (1.5 نقطة).'
					],
					finalAnswer: 'Comprehension (7 pts): Media report (a); T/F/T; 3 detailed answers; references: rescue chiefs, responsible youth clubs.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Digital Solidarity Networks and Youth Volunteers in Algeria',
				paragraphs: [
					'Across Algeria, young citizens have shown that social networks can serve noble humanitarian goals when used with discipline and honesty. During a summer forest fire near mountain settlements, student volunteers created a verified coordination group to connect medical pharmacists, volunteer drivers, and local charities within a single hour.',
					'A volunteer nurse explained that clear logistics prevented duplicate deliveries and directed clean water exactly [[where]] firefighters needed it most. Meanwhile, community leaders warned contributors against donating expired medicine and urged families to hand supplies directly to accredited relief centres. [[This]] organized teamwork ensured dignity and safety for every displaced household.',
					'Media commentators later praised the young organizers, noting that ethical digital communication turns ordinary smartphones into instruments of mercy. No man is an island: when honest news meets selfless volunteering, entire regions recover with remarkable strength.'
				],
				source: 'Adapted from Algerian Youth Civic Action Bulletin',
				glossary: [
					{ term: 'logistics', meaning: 'detailed planning and movement of supplies' },
					{ term: 'accredited', meaning: 'officially recognized and trusted' },
					{ term: 'selfless', meaning: 'caring for others without seeking personal gain' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Choose the best title for the passage: a) Smartphone Prices  b) Ethical Digital Solidarity During Emergencies  c) Summer Camping Tips.',
					answer: 'b) Ethical Digital Solidarity During Emergencies.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether these statements are True or False:\n  a) Student volunteers coordinated pharmacists, drivers, and charities within an hour.\n  b) Community leaders encouraged people to donate expired medicine.\n  c) Organized teamwork helped protect the dignity and safety of displaced families.',
					answer: 'a) True  |  b) False (they warned contributors against donating expired medicine)  |  c) True.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) What emergency prompted student volunteers to launch their coordination group?\n  b) How did clear logistics help firefighters according to the volunteer nurse?\n  c) Where did community leaders urge families to hand their supplies?',
					answer:
						'a) A summer forest fire near mountain settlements.\n  b) It prevented duplicate deliveries and directed clean water exactly where firefighters needed it most.\n  c) Directly to accredited relief centres.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. What do the underlined words refer to in the text?\n  a) where (paragraph 2)   b) This (paragraph 2)',
					answer: 'a) where = the exact places / locations where firefighters worked  |  b) This = organized teamwork (following clear logistics and accredited centres).',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Disciplined digital coordination and accredited relief centres make youth solidarity faster, safer, and more effective',
				[
					{
						text: 'Random uncoordinated deliveries work better than organized logistics',
						diagnosticFeedback: 'خطأ: الممرضة المتطوعة بينت أن التنظيم منع التكرار ووجه الماء بدقة.'
					},
					{
						text: 'Smartphones can never be used for humanitarian solidarity',
						diagnosticFeedback: 'خطأ: الفقرة الثالثة تشيد بتحويل الهواتف إلى أدوات للرحمة والتكافل.'
					},
					{
						text: 'The coordination group took several weeks to connect local charities',
						diagnosticFeedback: 'خطأ: تم التنسيق خلال ساعة واحدة فقط.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What made the youth solidarity campaign in "Digital Solidarity Networks and Youth Volunteers in Algeria" especially effective?',
					questionTextAr: 'ما الذي جعل حملة التضامن الرقمي الشبابية فعالة وآمنة بحسب النص؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'التنسيق الموثق، وتجنب الأدوية منتهية الصلاحية، وتسليم المساعدات للمراكز المعتمدة حققت فعالية وأمانا عاليين.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then answer the questions below:',
					content
				},
				hints: [
					'تتبع أفعال النقل (explained, warned, urged) في الفقرة الثانية.',
					'انتبه إلى كلمة against في تحذير قادة المجتمع بشأن الأدوية.',
					'حدد مرجع where و This استنادا إلى السياق المباشر للفقرة الثانية.'
				],
				solutionStepsAr: [
					'اختيار العنوان الأنسب للنص (1.0 نقطة).',
					'تصحيح العبارات الثلاث بين True و False (1.5 نقطة).',
					'الإجابة الكاملة عن الأسئلة الثلاثة (3.0 نقاط).',
					'تحديد مرجع كلمتي الإحالة (1.5 نقطة).'
				],
				finalAnswer: 'Comprehension (7 pts): Title (b); T/F/T; 3 open answers; references: locations where firefighters needed water, organized teamwork.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t3_exp_reporting_cohesion',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'grammar_syntax',
		titleAr: 'Part One — B) Text Exploration: Complex Reporting Verbs & Silent Letters (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t3_reported_verbs',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to verify' },
					noun: { value: 'verification', mark: '0.5' },
					adjective: { value: 'verified', mark: '0.5' }
				},
				{
					verb: { value: 'to inform', mark: '0.5' },
					noun: { given: true, value: 'information' },
					adjective: { value: 'informative', mark: '0.5' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: 'Silent "k" / "w"', words: ['knowledge', 'answer'], mark: '0.5' },
					{ header: 'Silent "s" / "h"', words: ['island', 'honest'], mark: '0.5' },
					{ header: 'Silent "g" / "t"', words: ['campaign', 'listen'], mark: '0.5' }
				]
			});

			const directClaim =
				variant === 0
					? 'The blogger said, "The valley dam collapsed last night."'
					: 'The witness said, "The storm cut power in three villages yesterday."' ;
			const reportedClaim =
				variant === 0
					? 'The blogger claimed that the valley dam had collapsed the night before.'
					: 'The witness explained that the storm had cut power in three villages the day before.';
			const reportVerb = variant === 0 ? 'claimed' : 'explained';

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
						`2. Rewrite sentence (b) using the exact reporting verb given:\n  1-a) ${directClaim}\n  1-b) The speaker ${reportVerb} ...................................................\n  2-a) The rescue chief said to citizens, "Do not cross swollen rivers."\n  2-b) The rescue chief warned ....................................................\n  3-a) The editor said to reporters, "Verify every eyewitness account carefully."\n  3-b) The editor urged ...........................................................\n  4-a) Amina said, "Let us organize a winter blanket drive."\n  4-b) Amina suggested ............................................................`,
					answer:
						`1-b) ${reportedClaim}\n  2-b) The rescue chief warned citizens not to cross swollen rivers.\n  3-b) The editor urged reporters to verify every eyewitness account carefully.\n  4-b) Amina suggested organizing a winter blanket drive.`,
					mark: '3.5'
				},
				{
					type: 'text',
					content: '3. Classify the following words according to their SILENT LETTER: (knowledge, island, campaign, answer, honest, listen)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'The rescue chief warned citizens not to cross swollen rivers.',
				[
					{
						text: 'The rescue chief warned citizens to not cross swollen rivers.',
						diagnosticFeedback: 'خطأ: الترتيب القياسي للنفي هو not to وليس to not.'
					},
					{
						text: 'The rescue chief warned that citizens did not cross swollen rivers.',
						diagnosticFeedback: 'خطأ: هذا ينقل خبرا ماضيا لا تحذيرا موجها للمواطنين.'
					},
					{
						text: 'The rescue chief warned citizens crossing swollen rivers.',
						diagnosticFeedback: 'خطأ: هذا يعكس المعنى؛ نحتاج warned + Obj + not to + Stem (أو against crossing).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Report accurately using "warned": The rescue chief said to citizens, "Do not cross swollen rivers."',
					questionTextAr: 'اختر الجملة المنقولة الصحيحة باستعمال فعل التحذير warned:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'ننقل التحذير المنفي بالبنية القياسية: warned + Object + not to + Stem.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the morphology, complex reporting verbs, and silent-letter tasks:',
					content
				},
				hints: [
					'تذكر الأنماط الأربع: claimed/explained + that-clause، warned/urged + Obj + (not) to + Stem، و suggested + V-ing.',
					'حول الماضي البسيط في الجملة الأولى إلى Past Perfect (had + V3) مع تحويل الظرف الزمني.',
					'انطق كل كلمة بهدوء لاكتشاف الحرف المكتوب غير المنطوق (k, w, s, h, g, t).'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق لكلمتي verify و inform (2.0 نقطة).',
					'تحويل الجمل الأربع بأفعال النقل المتقدمة (3.5 نقاط).',
					'تصنيف الكلمات الست حسب الحرف الصامت (1.5 نقطة).'
				],
				finalAnswer: `Text Exploration (7 pts): verify/inform table; ${reportVerb} that + Past Perfect / warned not to / urged to / suggested organizing; silent letters classified.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t3_exp_phonology_reordering',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'discourse_cohesion',
		titleAr: 'Part One — B) Text Exploration: Discourse Reordering & Syllable Counting (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t3_discourse_cohesion',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to coordinate' },
					noun: { value: 'coordination', mark: '0.5' },
					adjective: { value: 'coordinated', mark: '0.5' }
				},
				{
					verb: { value: 'to publish', mark: '0.5' },
					noun: { given: true, value: 'publication' },
					adjective: { value: 'published', mark: '0.5' }
				}
			]);

			const phonoTable =
				variant === 0
					? buildEnglishPhonologyTableBlock({
							columns: [
								{ header: '1 Syllable', words: ['helped', 'drought'], mark: '0.5' },
								{ header: '2 Syllables', words: ['island', 'needed'], mark: '0.5' },
								{ header: '3 Syllables', words: ['volunteer', 'journalist'], mark: '0.5' }
							]
						})
					: buildEnglishPhonologyTableBlock({
							columns: [
								{ header: '1 Syllable', words: ['saved', 'calm'], mark: '0.5' },
								{ header: '2 Syllables', words: ['rescue', 'honest'], mark: '0.5' },
								{ header: '3 Syllables', words: ['donation', 'disaster'], mark: '0.5' }
							]
						});

			const phonoList =
				variant === 0
					? '(helped, island, volunteer, drought, needed, journalist)'
					: '(saved, rescue, donation, calm, honest, disaster)';

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
						'2. Reorder the following sentences to make a coherent journalistic paragraph:\n  a) Consequently, relief convoys reached isolated homes without confusion.\n  b) Ethical journalism plays a decisive role during natural emergencies.\n  c) It verifies field facts first and quotes official Civil Protection bulletins.\n  d) Furthermore, responsible reporters warn citizens against spreading unverified rumours.',
					answer: 'Correct order: b - c - d - a.',
					mark: '2.0'
				},
				{
					type: 'text',
					content:
						'3. Fill in the gaps with four words from the list: (urged - verified - solidarity - it - panic)\n  Responsible news matters deeply during crises, so editors must check (1) .......... carefully. Unchecked rumours create needless (2) .........., whereas (3) .......... bulletins guide volunteers safely. Civic leaders have therefore (4) .......... youth to pair honest media with active solidarity.',
					answer: '(1) it  |  (2) panic  |  (3) verified  |  (4) urged',
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4. Classify the following words according to their NUMBER OF SYLLABLES: ${phonoList}`,
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'b - c - d - a',
				[
					{
						text: 'a - b - c - d',
						diagnosticFeedback: 'خطأ: لا نبدأ الفقرة بجملة النتيجة Consequently (a).'
					},
					{
						text: 'c - b - d - a',
						diagnosticFeedback: 'خطأ: الضمير It في (c) يحتاج عائده Ethical journalism في (b) قبله.'
					},
					{
						text: 'b - d - c - a',
						diagnosticFeedback: 'خطأ: Furthermore في (d) تضيف على الدور الأول المذكور في (c).'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Choose the coherent sentence order for the journalistic paragraph:',
					questionTextAr: 'اختر الترتيب السليم لتكوين فقرة صحفية متماسكة:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'تبدأ الفقرة بالجملة العامة (b)، ثم يعود الضمير It عليها في (c)، وتضيف (d) بـ Furthermore، وتختم (a) بـ Consequently.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the morphology, reordering, cloze, and syllable-counting tasks:',
					content
				},
				hints: [
					'تتبع الضمير It في الجملة (c) لربطه مباشرة بـ Ethical journalism في (b).',
					'تذكر أن كلمة news مفرد غير معدود فيعود عليها الضمير it.',
					'احسب أصوات العلة المنطوقة فقط: helped و saved و drought مقطع واحد، بينما needed مقطعين.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'ترتيب الفقرة الصحفية بترتيب b - c - d - a (2.0 نقطة).',
					'ملء الفراغات الأربعة بالكلمات المناسبة (1.5 نقطة).',
					'تصنيف الكلمات الست حسب عدد المقاطع الصوتية (1.5 نقطة).'
				],
				finalAnswer: 'Text Exploration (7 pts): coordinate/publish table; order b-c-d-a; gaps: it, panic, verified, urged; syllable table complete.'
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t3_writing_news_persuasive',
		grade: '2as_le',
		trimesterId: 't3',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Newspaper Report or Persuasive Essay (6 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t3_news_persuasive',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Write an objective newspaper report (120 to 150 words) covering a winter relief convoy organized by Algerian secondary school clubs and local charities after heavy snowfall in a mountain province.'
					: 'Write a persuasive essay (120 to 150 words) arguing why verifying news before sharing it on social media is an essential civic duty during natural disasters.';

			const notes =
				topicVariant === 0
					? [
							'Headline: short Present Simple title (e.g., Youth Volunteers Deliver Winter Relief to Mountain Villages)',
							'Lead (5Ws): Who (120 students & Red Crescent), What (blankets, food, medicine), When (Saturday dawn), Where (highland villages), Why (snow blocked roads)',
							'Body details & quotes: Past Simple + Passive Voice + reporting verbs (explained, confirmed, urged)',
							'Closing: road reopened safely; local mayor praised the enduring spirit of Touiza'
						]
					: [
							'Introduction: fast social media vs urgent need for truth during crises + strong thesis',
							'Body 1 (Main Argument): verified alerts save lives and guide rescue teams efficiently',
							'Body 2 (Counter-argument & Rebuttal): although rapid sharing seems well-intentioned, false rumours spark panic and block emergency routes',
							'Conclusion: call on youth and media to make verification a firm moral habit'
						];

			const freePrompt =
				topicVariant === 0
					? 'Write a persuasive essay explaining why Algerian secondary schools should integrate annual community volunteering days into student life.'
					: 'Write a newspaper report about an inspiring neighbourhood clean-up and tree-planting campaign launched after autumn floods in your town.';

			const modelAnswer =
				topicVariant === 0
					? 'Youth Volunteers Deliver Winter Relief to Mountain Villages\n\nMore than one hundred twenty secondary school volunteers and Red Crescent members delivered warm blankets, dry food parcels, and essential medicine to four isolated mountain villages early Saturday morning after heavy snowfall blocked rural roads.\n\nRelief parcels were sorted overnight at the local youth centre before four supply vans departed at dawn. A field coordinator explained that municipal snowploughs had cleared the main pass just hours earlier so that convoys could travel safely. Meanwhile, medical volunteers confirmed that elderly residents had been examined and urged neighbouring towns to channel future donations through accredited centres.\n\nBy late afternoon, full road access was restored across the district. Speaking to local reporters, the mayor praised the students\' disciplined teamwork as a living renewal of Algeria\'s noble Touiza tradition.'
					: 'During natural disasters such as floods or earthquakes, accurate information is a lifeline for vulnerable communities. For this reason, verifying news before sharing it on social media must be treated as an essential civic and moral duty.\n\nFirst and foremost, confirmed bulletins issued by official rescue services help families reach safe shelters and guide volunteers to urgent locations. When citizens rely on credible journalism, relief convoys avoid confusion and deliver food, water, and medical care efficiently.\n\nAdmittedly, many users forward breaking posts quickly because they wish to warn relatives rapidly. However, although speed feels helpful, unverified rumours frequently trigger needless panic, jam emergency roads, and distract rescuers from real danger.\n\nUltimately, pausing to check a source takes only seconds, yet it can protect countless lives. Every responsible citizen should therefore choose truthfulness over haste whenever crises occur.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Genre fidelity (Headline/5Ws OR Thesis/Rebuttal: 2.0 pts) | Organization & cohesion (1.5 pt) | Grammar, reporting verbs & passive accuracy (1.5 pt) | Mechanics (1.0 pt)',
				mark: '6.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Match the exact genre conventions: objective 3rd-person Headline + 5Ws + reported quotes for a Newspaper Report, OR clear thesis + arguments + counter-argument rebuttal for a Persuasive Essay',
				[
					{
						text: 'Fill a newspaper report with personal diary feelings like "I loved the snow"',
						diagnosticFeedback: 'خطأ: التقرير الصحفي موضوعي ويكتب بضمير الغائب دون انطباعات شخصية ذاتية.'
					},
					{
						text: 'Skip the headline and the 5Ws completely when writing a news report',
						diagnosticFeedback: 'خطأ: العنوان والفقرة الافتتاحية (5Ws) ركنان أساسيان في التقرير الصحفي.'
					},
					{
						text: 'Avoid reporting verbs and write unpunctuated notes instead of paragraphs',
						diagnosticFeedback: 'خطأ: مقال وتقرير شعبة اللغات يشترطان فقرات متماسكة وأفعال نقل دقيقة.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'How should a 2AS LE candidate distinguish a Newspaper Report from a Persuasive Essay in Part Two (6 pts)?',
					questionTextAr: 'كيف يميز تلميذ شعبة اللغات بدقة بين التقرير الصحفي والمقال الإقناعي لنيل 6/6؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يلتزم التقرير الصحفي بالموضوعية والعنوان والهرم المقلوب (5Ws) وتصريحات الشهود، بينما يعتمد المقال الإقناعي على الأطروحة والحجج والرد على الاعتراض.'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 6,
					instruction: 'Choose ONE topic and write a well-crafted composition of 120 to 150 words:',
					content: [block]
				},
				hints: [
					'للتقرير الصحفي: ابدأ بعنوان موجز بالمضارع البسيط ثم فقرة 5Ws ثم تفاصيل بالمبني للمجهول وتصريحات منقولة.',
					'للمقال الإقناعي: وظف استدراكا وردا مهذبا على الاعتراض (Admittedly ... However, although ...).',
					'راجع الترقيم والهجاء وعدد الكلمات (120 إلى 150 كلمة) لضمان علامة التميز.'
				],
				solutionStepsAr: [
					'اختيار أحد الموضوعين واحترام خصائص جنسه الكتابي بدقة.',
					'توظيف القواعد المقررة (أفعال النقل المتقدمة، المبني للمجهول، التماسك النصي).',
					'مراجعة النهايات الصوتية والإملاء والترقيم قبل التسليم.'
				],
				finalAnswer: 'Written Expression (6 pts): Complete model Newspaper Report / Persuasive Essay with rubric.'
			};
		}
	}
];
