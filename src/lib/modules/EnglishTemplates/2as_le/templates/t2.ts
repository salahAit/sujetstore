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

export const TEMPLATES_2AS_LE_T2: EnglishParameterizedTemplate[] = [
	{
		id: 'eng_tpl_2as_le_t2_comp_ecology_science',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'Part One — A) Reading Comprehension: Waste Not, Want Not & Science and Society (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t2_passive_all_tenses',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			if (variant === 0) {
				const passage = buildEnglishPassageBlock({
					title: 'Algeria\'s Green Dam and Solar Innovation Against Desertification',
					paragraphs: [
						'Across the high plateaux of Algeria, soil erosion and advancing desert sands have long challenged rural farming. Owing to recurring droughts, fertile pastures shrank in several areas; consequently, environmental scientists and forestry engineers intensified [[their]] efforts to restore the famous Green Dam. Today, drought-resistant olive, pistachio, and Aleppo pine trees are being planted alongside modern drip-irrigation systems so that young saplings can survive scarce rainfall.',
						'At the same time, renewable energy stations have been constructed in sunny southern provinces such as Adrar and Tamanrasset. If Algeria expands solar electricity further, remote farms will pump groundwater cleanly and reduce fuel pollution. Experts emphasize that if earlier industrial planners had invested sooner in clean technology, much unnecessary air pollution would have been avoided.',
						'Ultimately, ecological stewardship is not a task for scientists alone. Unless citizens cut plastic waste and conserve household water daily, even the smartest engineering projects cannot reach [[their]] full promise.'
					],
					source: 'Adapted from North African Environmental Science Digest',
					glossary: [
						{ term: 'saplings', meaning: 'young trees newly planted' },
						{ term: 'stewardship', meaning: 'responsible care and protection of resources' },
						{ term: 'scarce', meaning: 'available only in very small amounts' }
					]
				});

				const content: ContentBlock[] = [
					passage,
					{
						type: 'text',
						content: '1. Circle the letter that corresponds to the right answer. The text is: a) a scientific and ecological article  b) a historical biography  c) an informal dialogue.',
						answer: 'a) a scientific and ecological article.',
						mark: '1.0'
					},
					{
						type: 'text',
						content:
							'2. Are the following statements True or False according to the text?\n  a) Only decorative flowers are being planted along Algeria\'s Green Dam.\n  b) Solar power helps remote southern farms pump water cleanly.\n  c) Citizens\' daily habits are essential for ecological projects to succeed fully.',
						answer: 'a) False (drought-resistant olive, pistachio, and Aleppo pine trees are being planted)  |  b) True  |  c) True.',
						mark: '1.5'
					},
					{
						type: 'text',
						content:
							'3. Answer the following questions according to the text:\n  a) Why did fertile pastures shrink in several areas of the high plateaux?\n  b) Why are modern drip-irrigation systems used alongside new trees?\n  c) What would have happened if earlier industrial planners had invested sooner in clean technology?',
						answer:
							'a) Owing to recurring droughts (and soil erosion / advancing desert sands).\n  b) So that young saplings can survive scarce rainfall.\n  c) Much unnecessary air pollution would have been avoided.',
						mark: '3.0'
					},
					{
						type: 'text',
						content: '4. What or who do the underlined words refer to in the text?\n  a) their (paragraph 1)   b) their (paragraph 3)',
						answer: 'a) their (p1) = environmental scientists and forestry engineers  |  b) their (p3) = the smartest engineering projects.',
						mark: '1.5'
					}
				];

				const mcq = buildUniqueMcqOptions(
					'Combining reforestation, solar innovation, and responsible citizen habits protects Algeria\'s land and water',
					[
						{
							text: 'Engineering projects alone can solve environmental challenges without citizen participation',
							diagnosticFeedback: 'خطأ: الفقرة الثالثة تؤكد أن المشاريع الهندسية تحتاج سلوك المواطنين اليومي.'
						},
						{
							text: 'Solar stations in southern Algeria increase fuel pollution on remote farms',
							diagnosticFeedback: 'خطأ: الطاقة الشمسية تقلل تلوث الوقود وتضخ المياه بنظافة.'
						},
						{
							text: 'The Green Dam has been abandoned because of scarce rainfall',
							diagnosticFeedback: 'خطأ: بل يجري ترميمه وتوسيعه بأشجار مقاومة للجفاف والري بالتقطير.'
						}
					],
					rng
				);

				return {
					templateId: this.id,
					seed,
					grade: '2as_le',
					trimesterId: 't2',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					examRole: 'comprehension',
					quizQuestion: {
						type: 'mcq',
						questionText: 'What is the main message of "Algeria\'s Green Dam and Solar Innovation Against Desertification"?',
						questionTextAr: 'ما الفكرة الجامعة التي يؤكدها النص العلمي والبيئي؟',
						questionData: {
							options: mcq.options,
							correctIndex: mcq.correctIndices[0],
							correctIndices: mcq.correctIndices,
							correctIndexes: mcq.correctIndices
						},
						explanation: 'تتكامل جهود التشجير والطاقة الشمسية مع وعي المواطن وترشيد الاستهلاك لحماية البيئة الجزائرية.'
					},
					sujetExercise: {
						customTitle: 'Part One: Reading — A) Comprehension',
						points: 7,
						instruction: 'Read the text carefully then do the following tasks:',
						content
					},
					hints: [
						'لاحظ روابط السبب والنتيجة والغاية (Owing to, consequently, so that) في الفقرة الأولى.',
						'انتبه لجملة الشرط من النوع الثالث في نهاية الفقرة الثانية للإجابة عن 3c.',
						'فرق بين their الأولى (العلماء والمهندسين) و their الثانية (المشاريع الهندسية).'
					],
					solutionStepsAr: [
						'تحديد نوع النص: مقال علمي بيئي (1.0 نقطة).',
						'التحقق من العبارات الثلاث (1.5 نقطة).',
						'الإجابة التامة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
						'تحديد عائد الضميرين المسطرين بدقة (1.5 نقطة).'
					],
					finalAnswer: 'Comprehension (7 pts): Scientific article (a); F/T/T; 3 open answers; references: scientists & forestry engineers, smartest engineering projects.'
				};
			}

			const passage = buildEnglishPassageBlock({
				title: 'Ethical Science: Lessons from Ibn al-Haytham and Al-Biruni',
				paragraphs: [
					'Long before modern laboratories existed, Muslim scientists such as Ibn al-Haytham and Al-Biruni proved that genuine scientific inquiry requires honesty, careful measurement, and humility. Ibn al-Haytham designed controlled optics experiments in order to test hypotheses rather than accepting unproven claims blindly. [[His]] rigorous method laid vital foundations for modern experimental science.',
					'Similarly, Al-Biruni built precise astronomical instruments so that he could calculate the Earth\'s radius with remarkable accuracy. Because [[they]] viewed knowledge as a blessing meant to serve humanity, both scholars recorded their methods transparently so that later students could verify and improve them.',
					'In today\'s fast-moving era of artificial intelligence and biotechnology, society needs that same ethical compass more than ever. If scientific discoveries are guided by truthfulness and compassion, humanity will prosper; conversely, if innovation ignores moral responsibility, powerful tools may cause serious harm.'
				],
				source: 'Adapted from History of Islamic Science & Ethics',
				glossary: [
					{ term: 'rigorous', meaning: 'strictly accurate and thorough' },
					{ term: 'transparently', meaning: 'openly and honestly without hiding steps' },
					{ term: 'compass', meaning: 'guiding moral standard' }
				]
			});

			const content: ContentBlock[] = [
				passage,
				{
					type: 'text',
					content: '1. Choose the best general idea: a) Modern computer games  b) The enduring ethical lessons of early Muslim scientists for modern society  c) Ancient sea voyages.',
					answer: 'b) The enduring ethical lessons of early Muslim scientists for modern society.',
					mark: '1.0'
				},
				{
					type: 'text',
					content:
						'2. Say whether these statements are True or False:\n  a) Ibn al-Haytham accepted unproven scientific claims without testing them.\n  b) Al-Biruni documented his methods clearly so later learners could verify them.\n  c) Modern biotechnology and artificial intelligence need strong moral guidance.',
					answer: 'a) False (he designed controlled experiments to test hypotheses)  |  b) True  |  c) True.',
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Answer the following questions according to the text:\n  a) What three qualities does genuine scientific inquiry require according to paragraph 1?\n  b) Why did Al-Biruni build precise astronomical instruments?\n  c) What happens if scientific innovation ignores moral responsibility according to paragraph 3?',
					answer:
						'a) Honesty, careful measurement, and humility.\n  b) So that he could calculate the Earth\'s radius with remarkable accuracy.\n  c) Powerful tools may cause serious harm.',
					mark: '3.0'
				},
				{
					type: 'text',
					content: '4. Who do the underlined words refer to in the text?\n  a) His (paragraph 1)   b) they (paragraph 2)',
					answer: 'a) His = Ibn al-Haytham  |  b) they = both scholars (Ibn al-Haytham and Al-Biruni).',
					mark: '1.5'
				}
			];

			const mcq = buildUniqueMcqOptions(
				'Scientific progress serves humanity best when rigorous experimentation is paired with honesty and moral responsibility',
				[
					{
						text: 'Early Muslim scholars hid their research methods from future students',
						diagnosticFeedback: 'خطأ: الفقرة الثانية تؤكد أنهما وثقا مناهجهما بشفافية ليتحقق منها التلاميذ لاحقا.'
					},
					{
						text: 'Modern science no longer needs ethical principles because technology is advanced',
						diagnosticFeedback: 'خطأ: الفقرة الثالثة تؤكد أن العصر الحديث أحوج ما يكون إلى البوصلة الأخلاقية.'
					},
					{
						text: 'Ibn al-Haytham rejected laboratory observation in favour of guesswork',
						diagnosticFeedback: 'خطأ: بل أسس المنهج التجريبي المنضبط لاختبار الفرضيات.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion: {
					type: 'mcq',
					questionText: 'What core principle unites Ibn al-Haytham, Al-Biruni, and modern ethical science in the text?',
					questionTextAr: 'ما المبدأ الجامع بين منهج ابن الهيثم والبيروني والعلم الأخلاقي المعاصر في النص؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'يؤكد النص أن المنهج التجريبي الدقيق لا يؤتي ثماره إلا إذا اقترن بالأمانة العلمية والمسؤولية الأخلاقية.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — A) Comprehension',
					points: 7,
					instruction: 'Read the text carefully then answer the questions below:',
					content
				},
				hints: [
					'تأمل غرض التجارب باستعمال in order to و so that في الفقرتين 1 و 2.',
					'اقرأ الجملة الشرطية الأخيرة في الفقرة 3 لاستخراج إجابة 3c.',
					'تأكد أن they في الفقرة 2 تعود على العالمين معا.'
				],
				solutionStepsAr: [
					'تحديد الفكرة العامة للنص (1.0 نقطة).',
					'فحص العبارات الثلاث بين True و False (1.5 نقطة).',
					'الإجابة التامة عن الأسئلة المفتوحة الثلاثة (3.0 نقاط).',
					'تحديد مرجع الضميرين His و they (1.5 نقطة).'
				],
				finalAnswer: 'Comprehension (7 pts): Idea (b); F/T/T; 3 open answers; references: Ibn al-Haytham, both scholars (Ibn al-Haytham and Al-Biruni).'
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t2_exp_passive_conditionals',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'grammar_syntax',
		titleAr: 'Part One — B) Text Exploration: Full Passive Voice & Conditionals 0-3 (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t2_conditionals',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to desertify' },
					noun: { value: 'desertification', mark: '0.5' },
					adjective: { value: 'desertified', mark: '0.5' }
				},
				{
					verb: { value: 'to sustain', mark: '0.5' },
					noun: { given: true, value: 'sustainability' },
					adjective: { value: 'sustainable', mark: '0.5' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '2nd Syllable', words: ['e-CO-lo-gy', 'a-TO-mic'], mark: '0.5' },
					{ header: '3rd Syllable', words: ['e-co-LO-gi-cal', 'sci-en-TI-fic'], mark: '0.5' }
				]
			});

			const condSentence =
				variant === 0
					? 'If citizens do not reduce plastic waste, marine ecosystems will suffer. (Rewrite with Unless)'
					: 'If farmers do not adopt drip irrigation, groundwater will decline faster. (Rewrite with Unless)';
			const condAns =
				variant === 0
					? 'Unless citizens reduce plastic waste, marine ecosystems will suffer.'
					: 'Unless farmers adopt drip irrigation, groundwater will decline faster.';

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
						`2. Rewrite sentence (b) so that it means the same as sentence (a):\n  1-a) Engineers are building new solar stations in southern Algeria.\n  1-b) New solar stations ..............................................................\n  2-a) The association has planted four thousand pine trees since November.\n  2-b) Four thousand pine trees ........................................................\n  3-a) ${condSentence}\n  3-b) Unless ..........................................................................`,
					answer:
						`1-b) New solar stations are being built in southern Algeria by engineers.\n  2-b) Four thousand pine trees have been planted by the association since November.\n  3-b) ${condAns}`,
					mark: '3.0'
				},
				{
					type: 'text',
					content:
						'3. Put the verbs in brackets into the correct conditional tense:\n  a) If you heat pure water to 100 degrees Celsius, it (boil). (Type 0)\n  b) If the factory (filter) its smoke last year, the valley air would not have deteriorated. (Type 3)',
					answer: 'a) boils  |  b) had filtered',
					mark: '1.0'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to their stressed syllable (notice the stress shift): (ecology, ecological, atomic, scientific)',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'Four thousand pine trees have been planted by the association since November.',
				[
					{
						text: 'Four thousand pine trees has been planted by the association since November.',
						diagnosticFeedback: 'خطأ: الفاعل الجديد جمع (pine trees) فيأخذ have لا has.'
					},
					{
						text: 'Four thousand pine trees are being planted by the association since November.',
						diagnosticFeedback: 'خطأ: الزمن الأصلي مضارع تام (has planted) لا مضارع مستمر.'
					},
					{
						text: 'Four thousand pine trees were planted by the association since November.',
						diagnosticFeedback: 'خطأ: غيرت الزمن من المضارع التام إلى الماضي البسيط.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Transform accurately into the passive voice: "The association has planted four thousand pine trees since November."',
					questionTextAr: 'اختر جملة المبني للمجهول الصحيحة في المضارع التام:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'لأن نائب الفاعل جمع (trees) والزمن مضارع تام، نكتب have been planted.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the following morphology, grammar, and stress-shift exercises:',
					content
				},
				hints: [
					'تذكر الفرق الحاسم: are being + V3 للمضارع المستمر، و have been + V3 للمضارع التام الجمع.',
					'بعد Unless يبقى الفعل مثبتا لأن Unless تعني If ... not.',
					'في الشرط من النوع الثالث نستخدم had + V3 في جملة If مع would not have + V3.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'تحويل المضارع المستمر والتام للمجهول وتطبيق Unless (3.0 نقاط).',
					'تصريف فعلي الشرط من النوع 0 والنوع 3 (1.0 نقطة).',
					'تصنيف كلمات انزياح النبر في الجدول الصوتي (1.0 نقطة).'
				],
				finalAnswer: `Text Exploration (7 pts): Morphology table; are being built / have been planted / ${condAns}; boils, had filtered; stress shift table complete.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t2_exp_cause_morphology',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'vocabulary_morphology',
		titleAr: 'Part One — B) Text Exploration: Cause/Effect/Purpose & Morphology (7 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t2_morphology_stress_shift',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variant = rng.int(0, 1);

			const wbTable = buildEnglishWordBuildingTableBlock([
				{
					verb: { given: true, value: 'to experiment' },
					noun: { value: 'experiment', mark: '0.5' },
					adjective: { value: 'experimental', mark: '0.5' }
				},
				{
					verb: { value: 'to innovate', mark: '0.5' },
					noun: { given: true, value: 'innovation' },
					adjective: { value: 'innovative', mark: '0.5' }
				}
			]);

			const phonoTable = buildEnglishPhonologyTableBlock({
				columns: [
					{ header: '1st Syllable (Noun)', words: ['PRO-gress', 'EX-port'], mark: '0.5' },
					{ header: '2nd Syllable (Verb)', words: ['pro-GRESS', 'ex-PORT'], mark: '0.5' }
				]
			});

			const divideWords =
				variant === 0
					? 'reforestation / unsustainable / overconsumption'
					: 'deforestation / irreplaceable / unscientific';
			const divideAns =
				variant === 0
					? 're + forest + ation | un + sustain + able | over + consum(e) + ption'
					: 'de + forest + ation | ir + replace + able | un + scient + ific';

			const content: ContentBlock[] = [
				{
					type: 'text',
					content: '1. Complete the word-building chart below:',
					mark: ''
				},
				wbTable,
				{
					type: 'text',
					content: `2. Divide the following words into Prefix, Root, and Suffix: (${divideWords})`,
					answer: divideAns,
					mark: '1.5'
				},
				{
					type: 'text',
					content:
						'3. Combine each pair using the linker in brackets:\n  a) Rainfall was scarce last season. Reservoir levels fell sharply. (Owing to)\n  b) Scientists calibrated the water sensors. They wanted villages to receive accurate alerts. (so that)\n  c) Citizens adopted strict recycling. Landfill waste decreased noticeably. (Consequently)',
					answer:
						'a) Owing to scarce rainfall last season, reservoir levels fell sharply.\n  b) Scientists calibrated the water sensors so that villages could receive accurate alerts.\n  c) Citizens adopted strict recycling; consequently, landfill waste decreased noticeably.',
					mark: '2.5'
				},
				{
					type: 'text',
					content: '4. Classify the homographs according to their stressed syllable (Noun vs Verb): (progress (n), progress (v), export (n), export (v))',
					mark: ''
				},
				phonoTable
			];

			const mcq = buildUniqueMcqOptions(
				'Scientists calibrated the water sensors so that villages could receive accurate alerts.',
				[
					{
						text: 'Scientists calibrated the water sensors so that villages can receive accurate alerts yesterday.',
						diagnosticFeedback: 'خطأ: الفعل الأول ماض (calibrated) فالأدق زمنيا هو could لا can.'
					},
					{
						text: 'Scientists calibrated the water sensors in order to villages receive accurate alerts.',
						diagnosticFeedback: 'خطأ: in order to يتبعها مصدر مباشر لا فاعل جديد.'
					},
					{
						text: 'Scientists calibrated the water sensors owing to villages could receive accurate alerts.',
						diagnosticFeedback: 'خطأ: owing to للسبب وتتبعها عبارة اسمية لا جملة غاية.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Combine accurately using "so that": "Scientists calibrated the water sensors. They wanted villages to receive accurate alerts."',
					questionTextAr: 'اختر جملة الغاية الصحيحة المتوافقة زمنيا:',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'لأن الفاعل تغير والزمن الرئيسي ماض (calibrated) نستعمل so that + villages + could receive.'
				},
				sujetExercise: {
					customTitle: 'Part One: Reading — B) Text Exploration',
					points: 7,
					instruction: 'Complete the morphology, logical linkers, and stress-shift activities:',
					content
				},
				hints: [
					'تتبع Owing to عبارة اسمية فقط (scarce rainfall)، وتسبق Consequently فاصلة منقوطة وتليها فاصلة.',
					'مع الفعل الماضي calibrated استخدم could بعد so that.',
					'في الكلمات الثنائية المشتركة بين الاسم والفعل، ينبر الاسم على الأول والفعل على الثاني.'
				],
				solutionStepsAr: [
					'إكمال جدول الاشتقاق (2.0 نقطة).',
					'تفكيك الكلمات الثلاث إلى Prefix / Root / Suffix (1.5 نقطة).',
					'الربط بـ Owing to و so that و Consequently بدقة (2.5 نقطة).',
					'تصنيف انزياح النبر بين الاسم والفعل (1.0 نقطة).'
				],
				finalAnswer: `Text Exploration (7 pts): experiment/innovate table; word division (${divideAns}); Owing to / so that could / Consequently; Noun (1st) vs Verb (2nd) stress.`
			};
		}
	},
	{
		id: 'eng_tpl_2as_le_t2_writing_ecology_science',
		grade: '2as_le',
		trimesterId: 't2',
		domain: 'written_expression',
		titleAr: 'Part Two — Written Expression: Ecology & Ethical Science Essay (6 pts)',
		curriculumLessonId: 'eng_lesson_2as_le_t2_cause_effect_purpose',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const topicVariant = rng.int(0, 1);

			const guidedPrompt =
				topicVariant === 0
					? 'Write an expository essay of 120 to 150 words explaining the main causes of water scarcity and environmental waste in modern cities and proposing realistic ecological solutions.'
					: 'Write an argumentative essay of 120 to 150 words discussing why modern scientific progress must always be guided by moral responsibility and truthfulness.';

			const notes =
				topicVariant === 0
					? [
							'Introduction: state the urgency of protecting water and soil + clear thesis',
							'Body 1 (Causes & Effects): recurring drought, leaking networks, plastic waste (use owing to / consequently)',
							'Body 2 (Solutions): solar desalination, Green Dam planting, strict recycling (use Passive Voice & so that / in order to)',
							'Conclusion: conditional call to action (If citizens and institutions cooperate, ...)'
						]
					: [
							'Introduction: scientific innovation shapes daily life, yet ethics must guide it (clear thesis)',
							'Body 1 (Positive Model): Ibn al-Haytham and Al-Biruni paired experimentation with honesty and public service',
							'Body 2 (Modern Risks & Balance): biotechnology and AI bring cures and speed, yet misuse can harm society (use conditionals & purpose linkers)',
							'Conclusion: science without ethics weakens trust, whereas ethical science uplifts humanity'
						];

			const freePrompt =
				topicVariant === 0
					? 'Algeria possesses immense solar potential in the Sahara. Write an essay explaining how investing in renewable energy can strengthen both the economy and environmental protection.'
					: 'Imagine you are addressing a youth science forum. Write a formal essay explaining how students can use digital science tools responsibly without losing honesty or critical thinking.';

			const modelAnswer =
				topicVariant === 0
					? 'Water scarcity and urban waste have become pressing environmental challenges across modern cities. Protecting natural resources requires understanding the root causes of waste and adopting sustainable solutions immediately.\n\nOwing to recurring droughts, leaking municipal pipes, and single-use plastic packaging, freshwater supplies and fertile soils face severe pressure. Consequently, rivers become polluted and reservoirs decline rapidly whenever irresponsible consumption continues unchecked.\n\nFortunately, effective measures are already being tested in Algeria and beyond. Solar desalination units and drip-irrigation networks can be expanded in order to save precious water, while household waste should be sorted so that paper and glass can be recycled cleanly. Expanding the Green Dam also protects farmland from encroaching sand.\n\nIn conclusion, if institutions and citizens act together today, future generations will inherit a clean, green, and thriving homeland.'
					: 'Modern scientific innovation has transformed medicine, communication, and clean energy at an extraordinary pace. Nevertheless, genuine progress occurs only when research is firmly guided by truthfulness and moral responsibility.\n\nHistory offers inspiring models for ethical science. Great Muslim scholars such as Ibn al-Haytham and Al-Biruni built careful instruments in order to test facts transparently and serve the wider community. Because they treated knowledge as a noble trust, their work earned lasting respect across civilizations.\n\nBy contrast, if contemporary technologies such as artificial intelligence or biotechnology are developed without ethical limits, powerful tools may threaten privacy, health, or fairness. Consequently, universities and research labs must enforce strict honesty so that every discovery protects human dignity and the environment.\n\nAll in all, science without moral direction creates risk, whereas ethical science remains one of humanity\'s highest blessings.';

			const block = buildEnglishWrittenExpressionBlock({
				topicOnePrompt: guidedPrompt,
				topicOneNotes: notes,
				topicTwoPrompt: freePrompt,
				modelAnswer,
				rubricSummary: 'Relevance & depth of ideas (2.0 pts) | 4-paragraph cohesion & logical linkers (1.5 pt) | Passive, conditionals & academic lexis (1.5 pt) | Mechanics (1.0 pt)',
				mark: '6.0'
			});

			const mcq = buildUniqueMcqOptions(
				'Integrate cause/effect linkers (owing to, consequently), purpose clauses (so that / in order to), passive structures, and a clear conditional closing',
				[
					{
						text: 'List scientific terms without forming complete logical paragraphs',
						diagnosticFeedback: 'خطأ: المقال يتطلب فقرات مترابطة بروابط السبب والنتيجة والغاية.'
					},
					{
						text: 'Write solely about entertainment hobbies unrelated to science or ecology',
						diagnosticFeedback: 'خطأ: الخروج عن الموضوع يلغي علامة الملاءمة.'
					},
					{
						text: 'Avoid all connectors and write twenty disconnected short lines',
						diagnosticFeedback: 'خطأ: التماسك والروابط المنطقية ركن أساسي في تنقيط شعبة اللغات.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '2as_le',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion: {
					type: 'mcq',
					questionText: 'Which combination of structures elevates a 2AS LE essay on ecology or ethical science to 6/6?',
					questionTextAr: 'ما التراكيب اللغوية التي ترفع مقال البيئة أو أخلاقيات العلم في شعبة اللغات إلى العلامة الكاملة؟',
					questionData: {
						options: mcq.options,
						correctIndex: mcq.correctIndices[0],
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: 'المقال العلمي المتقن يمزج بين روابط السبب والنتيجة والغاية والمبني للمجهول والجمل الشرطية الدقيقة.'
				},
				sujetExercise: {
					customTitle: 'Part Two: Written Expression',
					points: 6,
					instruction: 'Choose ONE topic and write a structured 4-paragraph essay (120 to 150 words):',
					content: [block]
				},
				hints: [
					'خصص فقرة للأسباب أو النماذج التاريخية (ابن الهيثم والبيروني) وفقرة للحلول أو الضوابط المعاصرة.',
					'وظف رابط سبب (owing to) ورابط نتيجة (consequently) ورابط غاية (so that / in order to).',
					'اختم بجملة شرطية قوية (If ..., ...) تلخص الأثر المستقبلي.'
				],
				solutionStepsAr: [
					'تصميم هيكل 4 فقرات مع أطروحة دقيقة في المقدمة.',
					'دمج القواعد المدروسة في الفصل الثاني بسلاسة داخل النص.',
					'مراجعة الترقيم والهجاء وعدد الكلمات (120 إلى 150 كلمة).'
				],
				finalAnswer: 'Written Expression (6 pts): Complete 4-paragraph scientific/ecological essay with model answer and rubric.'
			};
		}
	}
];
