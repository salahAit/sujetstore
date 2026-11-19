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
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Parameterized Exam & Quiz Templates — Trimester 1: Unit 1 "Exploring the Past" (4 templates)
 * Roles: 1 comprehension (7 pts) + 2 text_exploration (7 pts each) + 1 written_expression (6 pts)
 */
export const TEMPLATES_3AS_LE_T1: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Islamic Golden Age, Ibn Battuta & Algerian Heritage
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t1_comp_ancient_islamic_civ',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط — لغات أجنبية): الحضارة الإسلامية والأندلسية والتراث الجزائري',
		curriculumLessonId: 'eng_lesson_3as_le_t1_past_perfect_time',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Ibn al-Haytham and Al-Zahrawi: Pillars of Empirical Science',
					source: 'Adapted from History of Islamic Scientific Heritage',
					paragraphs: [
						'Long before the European Renaissance, scholars across the Islamic world transformed theoretical curiosity into disciplined empirical science. In eleventh-century Cairo, Ibn al-Haytham conducted controlled optical experiments inside a darkened chamber, proving that vision occurs when light rays enter the eye rather than radiating from [[it]].',
						'Meanwhile, in Andalusian Cordoba, the pioneering physician Al-Zahrawi compiled Kitab al-Tasrif, a monumental thirty-volume medical encyclopaedia. Before he completed [[this work]], Al-Zahrawi had spent decades observing patients, refining surgical sutures, and illustrating more than two hundred precision instruments that remained standard references in European medical faculties for five centuries.',
						'Even though both scientists lived a thousand years ago with modest workshop tools, their insistence on careful observation, verification, and ethical service to humanity laid enduring foundations for modern scientific methodology.'
					],
					glossary: [
						{ term: 'empirical', meaning: 'based on direct observation and experiment' },
						{ term: 'sutures', meaning: 'medical stitches used to close surgical wounds' }
					],
					tfItems: [
						{ q: 'Ibn al-Haytham proved through experiments that light enters the eye to produce vision.', a: 'True', mark: '0.5' },
						{ q: 'Kitab al-Tasrif was a short two-page pamphlet written in Baghdad.', a: 'False', c: 'It was a monumental thirty-volume medical encyclopaedia compiled by Al-Zahrawi in Cordoba.', mark: '0.5' },
						{ q: 'European medical faculties relied on Al-Zahrawi surgical manual for five centuries.', a: 'True', mark: '0.5' },
						{ q: 'Modern scientific methodology owes nothing to early empirical observation.', a: 'False', c: 'Their insistence on observation and verification laid enduring foundations for modern scientific methodology.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) What scientific breakthrough did Ibn al-Haytham achieve in optics?', a: 'He proved through controlled experiments that vision occurs when light rays enter the eye.', mark: '1' },
						{ q: 'b) How did Al-Zahrawi prepare before completing Kitab al-Tasrif?', a: 'He spent decades observing patients, refining surgical sutures, and illustrating over two hundred surgical instruments.', mark: '1' },
						{ q: 'c) Which core principles united both scientists in paragraph 3?', a: 'Careful observation, empirical verification, and ethical service to humanity.', mark: '1' }
					],
					refQuestion: 'a) "it" (§1)   b) "this work" (§2)',
					refAnswer: 'a) "it" refers to the eye.   b) "this work" refers to Kitab al-Tasrif.',
					bestTitle: 'How Muslim Scientists Pioneered Experimental Methodology',
					titleOptions: [
						'How Muslim Scientists Pioneered Experimental Methodology',
						'Modern Space Telescopes in Orbit',
						'Ancient Maritime Fishing Villages'
					],
					easyQ: 'In which city did Al-Zahrawi compile Kitab al-Tasrif?',
					easyAns: 'Cordoba (Al-Andalus)',
					easyWrong: ['Timgad', 'Fez', 'Damascus'],
					medQ: 'What does "it" at the end of paragraph 1 refer to?',
					medAns: 'The eye',
					medWrong: ['A darkened chamber', 'The European Renaissance', 'Empirical science'],
					hardQ: 'What enduring legacy do Ibn al-Haytham and Al-Zahrawi share according to paragraph 3?',
					hardAns: 'Establishing empirical observation, verification, and ethical dedication as cornerstones of science',
					hardWrong: [
						'Replacing observation with pure speculation',
						'Keeping medical instruments secret from students',
						'Working solely with modern computerized equipment'
					]
				},
				{
					title: 'Ibn Battuta: Three Decades Across the Old World',
					source: 'Adapted from Chronicles of Classical Muslim Travellers',
					paragraphs: [
						'In 1325 CE, a twenty-one-year-old scholar named Ibn Battuta set out from Tangier to perform the pilgrimage to Makkah. Few could have imagined that before [[he]] returned home nearly thirty years later, he would have journeyed across North Africa, including Algerian cities such as Tlemcen and Bejaia, as well as East Africa, Central Asia, India, and China.',
						'Despite perilous desert routes, monsoons, and unfamiliar dialects, Ibn Battuta was able to record vivid descriptions of bustling markets, mosques, universities, agricultural terraces, and diplomatic customs. After he had settled back in North Africa, he dictated his famous travelogue Al-Rihlah, preserving invaluable eyewitness testimony of fourteenth-century civilizations.',
						'Unlike fictional adventure tales, [[his account]] provides historians with concrete evidence of how shared scholarship, Islamic hospitality, and thriving trade linked distant peoples across three continents.'
					],
					glossary: [
						{ term: 'travelogue', meaning: 'a written account of journeys and places visited' },
						{ term: 'eyewitness', meaning: 'a person who directly saw an event or place' }
					],
					tfItems: [
						{ q: 'Ibn Battuta initially left Tangier in 1325 CE to perform the pilgrimage to Makkah.', a: 'True', mark: '0.5' },
						{ q: 'His journeys bypassed North African and Algerian cities completely.', a: 'False', c: 'He travelled through Algerian cities such as Tlemcen and Bejaia.', mark: '0.5' },
						{ q: 'Ibn Battuta dictated Al-Rihlah after settling back in North Africa.', a: 'True', mark: '0.5' },
						{ q: 'Historians consider Al-Rihlah a purely fictional tale with no historical value.', a: 'False', c: 'Unlike fictional tales, it provides concrete eyewitness historical evidence.', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Name two Algerian cities visited by Ibn Battuta in paragraph 1.', a: 'Tlemcen and Bejaia.', mark: '1' },
						{ q: 'b) What challenges did Ibn Battuta face during his travels?', a: 'Perilous desert routes, monsoons, and unfamiliar dialects.', mark: '1' },
						{ q: 'c) Why is Al-Rihlah so valuable to modern historians?', a: 'Because it offers concrete eyewitness evidence of scholarship, hospitality, customs, and trade across fourteenth-century civilizations.', mark: '1' }
					],
					refQuestion: 'a) "he" (§1)   b) "his account" (§3)',
					refAnswer: 'a) "he" refers to Ibn Battuta.   b) "his account" refers to Al-Rihlah (Ibn Battuta travelogue).',
					bestTitle: 'Ibn Battuta and His Priceless Eyewitness Record of Medieval Worlds',
					titleOptions: [
						'Ibn Battuta and His Priceless Eyewitness Record of Medieval Worlds',
						'Modern Airline Routes Across Europe',
						'How Industrial Factories Changed Agriculture'
					],
					easyQ: 'What is the title of Ibn Battuta famous travelogue mentioned in paragraph 2?',
					easyAns: 'Al-Rihlah',
					easyWrong: ['Al-Muqaddimah', 'Kitab al-Tasrif', 'Kitab al-Manazir'],
					medQ: 'What does "his account" in paragraph 3 refer to?',
					medAns: 'Al-Rihlah (Ibn Battuta travelogue)',
					medWrong: ['Fictional adventure tales', 'Monsoons', 'Agricultural terraces'],
					hardQ: 'What unifying cultural feature across three continents does paragraph 3 highlight?',
					hardAns: 'Shared scholarship, Islamic hospitality, and thriving international trade',
					hardWrong: [
						'Total isolation between Africa and Asia',
						'Absence of universities outside Europe',
						'Complete lack of maritime or caravan trade'
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
						diagnosticFeedback: 'راجع المعلومة الصريحة في الفقرتين الأولى والثانية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر الجواب الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعلومة الصحيحة الواردة في النص هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من المرجع السابق للضمير في السياق الدقيق للجملة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Reference ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد مرجع الكلمة المسطر تحتها:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المرجع الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة الثالثة بتركيز لاستخلاص الفكرة التحليلية العميقة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `BAC LE Inference ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الفكرة التحليلية الأعمق في النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the following activities (7 pts — BAC LE):',
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
								options: ['Expository historical', 'Prescriptive manual', 'Dialogue script'],
								correct: 'Expository historical',
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
						content: `4. What or who do the underlined words in the text refer to?\n${chosen.refQuestion}`,
						answer: chosen.refAnswer,
						mark: '1'
					},
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '5. Choose the general title that best summarizes the passage:',
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
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'انتبه للروابط الزمنية (Before / After) وروابط التباين (Unlike / Even though) لفهم البنية الدقيقة للنص.',
					'صحّح العبارات الخاطئة بدقة دون الاكتفاء بكتابة False.',
					'تأكد من تطابق الإحالة مع الاسم المقصود في نفس الفقرة.'
				],
				solutionStepsAr: [
					'تحديد نوع النص التاريخي التفسيري (0.5 نقطة).',
					'تصنيف الصواب والخطأ مع التصحيح (2 نقطتان).',
					'الإجابة الدقيقة عن أسئلة الفهم الثلاثة (3 نقاط).',
					'تحديد الإحالة والعنوان الأنسب (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. TEXT EXPLORATION (7 pts): Prefix/Root/Suffix Table, Past Perfect/Concession & Multi-Syllable Stress
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t1_exp_syntax_morphology',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'vocabulary_morphology',
		titleAr: 'البناء اللغوي (7 نقاط — لغات أجنبية): تفكيك Prefix/Root/Suffix، الماضي التام، ونبر الكلمات الطويلة',
		curriculumLessonId: 'eng_lesson_3as_le_t1_advanced_morphology',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Find synonyms for: a) empirical = ..........   b) monumental = ..........   c) enduring = ..........',
					lexisAnswer: 'a) experimental / observational   b) vast / remarkable   c) lasting / permanent',
					affixRows: [
						[
							{ content: 'prehistoric', bold: true },
							{ content: '..........', answer: 'pre-', mark: '0.15' },
							{ content: '..........', answer: 'histor(y)', mark: '0.15' },
							{ content: '..........', answer: '-ic', mark: '0.2' }
						],
						[
							{ content: 'disappearance', bold: true },
							{ content: '..........', answer: 'dis-', mark: '0.15' },
							{ content: '..........', answer: 'appear', mark: '0.15' },
							{ content: '..........', answer: '-ance', mark: '0.2' }
						],
						[
							{ content: 'reconstruction', bold: true },
							{ content: '..........', answer: 're-', mark: '0.15' },
							{ content: '..........', answer: 'construct', mark: '0.15' },
							{ content: '..........', answer: '-ion', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) Maritime navigation did not become safe. Muslim astronomers perfected the astrolabe first.\n   b) Maritime navigation did not become safe until .................................',
							answer: '1) b) Maritime navigation did not become safe until Muslim astronomers had perfected the astrolabe.'
						},
						{
							prompt: '2) a) Even though the Sahara was vast, trade caravans linked North and West Africa.\n   b) Despite ......................................................................',
							answer: '2) b) Despite the vastness of the Sahara (OR Despite the fact that the Sahara was vast), trade caravans linked North and West Africa.'
						}
					],
					stressWords: 'heritage - astronomy - scientific - civilization',
					stressCols: [
						{ header: '1st Syllable', words: ['heritage'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['astronomy'], mark: '0.25' },
						{ header: '3rd Syllable', words: ['scientific'], mark: '0.25' },
						{ header: '4th Syllable', words: ['civilization'], mark: '0.25' }
					],
					clozeWords: 'experiments - manuscripts - empirical - flourishing',
					clozePrompt: 'During the (1) .......... era of Al-Andalus, scientists relied on controlled (2) .......... and (3) .......... proof, recording their findings in detailed (4) .......... .',
					clozeAnswer: '1) flourishing   2) experiments   3) empirical   4) manuscripts',
					easyQ: 'How is "disappearance" divided into Prefix + Root + Suffix?',
					easyAns: 'dis- + appear + -ance',
					easyWrong: ['disa- + ppear + -ance', '— + disappear + -ance', 'dis- + appearan + -ce'],
					medQ: 'On which syllable does the main stress fall in "civilization" (civ-i-li-za-tion)?',
					medAns: '4th syllable (ZA)',
					medWrong: ['1st syllable (CIV)', '2nd syllable (i)', '3rd syllable (li)'],
					hardQ: 'Combine accurately with "until": Navigation did not become safe. Astronomers perfected the astrolabe first.',
					hardAns: 'Navigation did not become safe until astronomers had perfected the astrolabe.',
					hardWrong: [
						'Navigation had not become safe until astronomers perfected the astrolabe.',
						'Navigation did not became safe until astronomers had perfected the astrolabe.',
						'Navigation did not become safe until astronomers perfected the astrolabe first.'
					]
				},
				{
					lexisPrompt: 'Find opposites keeping the same root: stable / replaceable / accurate / literate',
					lexisAnswer: 'unstable / irreplaceable / inaccurate / illiterate',
					affixRows: [
						[
							{ content: 'international', bold: true },
							{ content: '..........', answer: 'inter-', mark: '0.15' },
							{ content: '..........', answer: 'nation', mark: '0.15' },
							{ content: '..........', answer: '-al', mark: '0.2' }
						],
						[
							{ content: 'instability', bold: true },
							{ content: '..........', answer: 'in-', mark: '0.15' },
							{ content: '..........', answer: 'stabl(e)', mark: '0.15' },
							{ content: '..........', answer: '-ity', mark: '0.2' }
						],
						[
							{ content: 'irreplaceable', bold: true },
							{ content: '..........', answer: 'ir-', mark: '0.15' },
							{ content: '..........', answer: 'replace', mark: '0.15' },
							{ content: '..........', answer: '-able', mark: '0.2' }
						]
					],
					rewrites: [
						{
							prompt: '1) a) Hammadid architects managed to fortify the mountain capital effectively.\n   b) Hammadid architects were .....................................................',
							answer: '1) b) Hammadid architects were able to fortify the mountain capital effectively.'
						},
						{
							prompt: '2) a) Ancient Egypt wrote on papyrus. Mesopotamia pressed signs onto clay tablets. (Use: whereas)\n   b) Ancient Egypt wrote on papyrus, ..............................................',
							answer: '2) b) Ancient Egypt wrote on papyrus, whereas Mesopotamia pressed signs onto clay tablets.'
						}
					],
					stressWords: 'cultural - historical - archaeology - modernization',
					stressCols: [
						{ header: '1st Syllable', words: ['cultural'], mark: '0.25' },
						{ header: '2nd Syllable', words: ['historical'], mark: '0.25' },
						{ header: '3rd Syllable', words: ['archaeology'], mark: '0.25' },
						{ header: '4th Syllable', words: ['modernization'], mark: '0.25' }
					],
					clozeWords: 'caravans - hospitality - accounts - heritage',
					clozePrompt: 'Through safe trade (1) .......... and generous (2) .......... , classical travellers left eyewitness (3) .......... that still enrich human (4) .......... .',
					clozeAnswer: '1) caravans   2) hospitality   3) accounts   4) heritage',
					easyQ: 'How is "international" divided into Prefix + Root + Suffix?',
					easyAns: 'inter- + nation + -al',
					easyWrong: ['in- + ternation + -al', 'inter- + nat + -ional', '— + internation + -al'],
					medQ: 'Which syllable carries the primary stress in "archaeology" (ar-chae-ol-o-gy)?',
					medAns: '3rd syllable (OL)',
					medWrong: ['1st syllable (AR)', '2nd syllable (chae)', '4th syllable (o)'],
					hardQ: 'Choose the right contrast rewrite: Ancient Egypt wrote on papyrus. Mesopotamia used clay tablets.',
					hardAns: 'Ancient Egypt wrote on papyrus, whereas Mesopotamia used clay tablets.',
					hardWrong: [
						'Ancient Egypt wrote on papyrus, unlike Mesopotamia used clay tablets.',
						'Ancient Egypt wrote on papyrus, despite Mesopotamia used clay tablets.',
						'Ancient Egypt wrote on papyrus, whereas of Mesopotamia used clay tablets.'
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
						diagnosticFeedback: 'افصل البادئة من اليسار واللاحقة من اليمين لإبراز الجذر الحقيقي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر التفكيك البنيوي الصحيح للكلمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفكيك الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'استعمل قاعدة العدّ من النهاية (-tion: الثاني من الخلف؛ -gy: الثالث من الخلف) ثم عدّ من البداية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'حدد المقطع المنبور بدقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المقطع المنبور الرئيسي هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه لترتيب الأزمنة حول until وحذف الكلمات الزائدة مثل first، وللفرق بين whereas و unlike.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر التحويل النحوي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحويل السليم هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully (7 pts — BAC LE):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Divide the following words into Prefix, Root, and Suffix:'
					},
					{
						type: 'table',
						headers: ['Word', 'Prefix', 'Root', 'Suffix'],
						cells: [],
						rows: chosen.affixRows,
						align: 'center',
						borders: 'grid',
						headerBackground: true,
						width: 'full'
					},
					{
						type: 'text',
						content: `3. Rewrite sentence (b) so that it means the same as sentence (a):\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '2'
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
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'vocabulary_morphology',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'في جدول Prefix / Root / Suffix ضع البادئة واللاحقة بدقة دون كسر الجذر الأصلي.',
					'في جمل until تذكر حذف first وتصريف الحدث الأسبق في Past Perfect.',
					'في جدول النبر قسّم الكلمة إلى مقاطع أولاً ثم طبق قاعدة اللاحقة.'
				],
				solutionStepsAr: [
					'إيجاد المرادفات أو الأضداد بدقة (1.5 نقطة).',
					'تفكيك الكلمات الثلاث في جدول Prefix / Root / Suffix (1.5 نقطة).',
					'إعادة كتابة الجملتين بدقة نحوية (2 نقطتان).',
					'تصنيف النبر الصوتي وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (7 pts): Concession/Contrast, Word Building & Final -ed
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t1_exp_contrast_discourse',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'grammar_syntax',
		titleAr: 'البناء اللغوي (7 نقاط — لغات أجنبية): الاستدراك والتباين والاشتقاق وترتيب الفقرة التاريخية',
		curriculumLessonId: 'eng_lesson_3as_le_t1_concession_contrast',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'Match each historical term with its meaning: a) dynasty   b) astrolabe   c) manuscript\n(1. hand-written ancient book   2. line of hereditary rulers   3. astronomical navigation instrument)',
					lexisAnswer: 'a - 2   |   b - 3   |   c - 1',
					morphRows: [
						{ verb: { given: true, value: 'to preserve' }, noun: { value: 'preservation', mark: '0.25' }, adjective: { value: 'preserved', mark: '0.25' } },
						{ verb: { value: 'to unify', mark: '0.25' }, noun: { given: true, value: 'unification' }, adjective: { value: 'unified', mark: '0.25' } },
						{ verb: { value: 'to expand', mark: '0.25' }, noun: { value: 'expansion', mark: '0.25' }, adjective: { given: true, value: 'expansive' } }
					],
					rewrites: [
						{
							prompt: '1) a) Although the Casbah alleys are narrow, they keep traditional houses cool.\n   b) Despite ......................................................................',
							answer: '1) b) Despite the narrowness of the Casbah alleys (OR Despite the fact that the Casbah alleys are narrow), they keep traditional houses cool.'
						},
						{
							prompt: '2) a) Combine with (however): Some ancient dynasties declined politically. Their scientific books survived.',
							answer: '2) b) Some ancient dynasties declined politically; however, their scientific books survived.'
						}
					],
					edWords: 'documented - preserved - reached - constructed',
					edCols: [
						{ header: '/t/', words: ['reached'], mark: '0.25' },
						{ header: '/d/', words: ['preserved'], mark: '0.25' },
						{ header: '/id/', words: ['documented', 'constructed'], mark: '0.5' }
					],
					reorderPrompt:
						'Reorder the following sentences to make a coherent paragraph:\n(a) As a result, thousands of rare manuscripts were saved for later scholars.\n(b) In medieval North Africa, public libraries played a vital cultural role.\n(c) Moreover, generous endowments funded free paper and ink for students.\n(d) They welcomed readers from diverse cities without charging fees.',
					reorderAnswer: 'Correct order: 1-b   2-d   3-c   4-a',
					easyQ: 'What is the Noun corresponding to the verb "to expand"?',
					easyAns: 'expansion',
					easyWrong: ['expandation', 'expandment', 'expansity'],
					medQ: 'Which sentence starts the coherent paragraph about medieval North African libraries?',
					medAns: 'In medieval North Africa, public libraries played a vital cultural role.',
					medWrong: [
						'As a result, thousands of rare manuscripts were saved.',
						'Moreover, generous endowments funded free paper and ink.',
						'They welcomed readers from diverse cities without charging fees.'
					],
					hardQ: 'What is the exact coherent order of the four sentences (a, b, c, d)?',
					hardAns: 'b - d - c - a',
					hardWrong: ['d - b - c - a', 'b - c - a - d', 'a - b - d - c']
				},
				{
					lexisPrompt: 'Give synonyms for: a) perilous = ..........   b) refined = ..........   c) prosperity = ..........',
					lexisAnswer: 'a) dangerous / hazardous   b) sophisticated / elegant   c) wealth / flourishing',
					morphRows: [
						{ verb: { given: true, value: 'to flourish' }, noun: { value: 'flourishing', mark: '0.25' }, adjective: { value: 'flourishing', mark: '0.25' } },
						{ verb: { value: 'to discover', mark: '0.25' }, noun: { given: true, value: 'discovery' }, adjective: { value: 'discovered', mark: '0.25' } },
						{ verb: { value: 'to inherit', mark: '0.25' }, noun: { value: 'inheritance', mark: '0.25' }, adjective: { given: true, value: 'inherited' } }
					],
					rewrites: [
						{
							prompt: '1) a) In spite of the fact that tools were simple, Tassili artists created vivid rock paintings.\n   b) Even though ..................................................................',
							answer: '1) b) Even though tools were simple, Tassili artists created vivid rock paintings.'
						},
						{
							prompt: '2) a) First, Al-Idrisi collected reports from travellers. Then, he drew his world map.\n   b) Before Al-Idrisi .............................................................',
							answer: '2) b) Before Al-Idrisi drew his world map, he had collected reports from travellers.'
						}
					],
					edWords: 'flourished - engraved - founded - translated',
					edCols: [
						{ header: '/t/', words: ['flourished'], mark: '0.25' },
						{ header: '/d/', words: ['engraved'], mark: '0.25' },
						{ header: '/id/', words: ['founded', 'translated'], mark: '0.5' }
					],
					reorderPrompt:
						'Reorder the following sentences to make a coherent paragraph:\n(a) Therefore, protecting Timgad remains a vital national responsibility.\n(b) Built in 100 CE in Batna, Timgad showcases orderly urban architecture.\n(c) However, wind erosion and unregulated visits can gradually wear down its stone.\n(d) Its paved avenues and public library still amaze visitors from around the world.',
					reorderAnswer: 'Correct order: 1-b   2-d   3-c   4-a',
					easyQ: 'How is final "-ed" pronounced in the verb "flourished"?',
					easyAns: '/t/',
					easyWrong: ['/d/', '/id/', 'silent'],
					medQ: 'Which sentence MUST come last as the concluding call to action in the Timgad paragraph?',
					medAns: 'Therefore, protecting Timgad remains a vital national responsibility.',
					medWrong: [
						'Built in 100 CE in Batna, Timgad showcases orderly urban architecture.',
						'Its paved avenues and public library still amaze visitors.',
						'However, wind erosion can gradually wear down its stone.'
					],
					hardQ: 'What is the exact coherent order of the four sentences about Timgad?',
					hardAns: 'b - d - c - a',
					hardWrong: ['b - c - d - a', 'd - b - c - a', 'a - b - d - c']
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
						diagnosticFeedback: 'راجع قواعد الاشتقاق ونطق Final -ed في الوحدة الأولى.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الجواب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من إشارات الاتساق النصي (الجملة المفتاحية بدون ضمائر مبهمة، والخاتمة بـ Therefore / As a result).'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر الجملة المناسبة في تمرين الاتساق النصي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الصحيح هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تتبع الضمائر (They / Its) والروابط (Moreover / However / As a result / Therefore) لترتيب الجمل الأربع.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'حدد الترتيب المنطقي الصحيح للفقرة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الترتيب المتسق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 7,
				instruction: 'Do the following language exploration activities carefully (7 pts — BAC LE):',
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
						content: `3. Rewrite or combine the sentences below:\n${chosen.rewrites.map((r) => r.prompt).join('\n')}`,
						answer: chosen.rewrites.map((r) => r.answer).join('\n'),
						mark: '2'
					},
					{
						type: 'text',
						content: `4. Classify the following verbs according to the pronunciation of their final "-ed": (${chosen.edWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.edCols }),
					{
						type: 'text',
						content: `5. ${chosen.reorderPrompt}`,
						answer: chosen.reorderAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'grammar_syntax',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'عند التحويل من Although إلى Despite استعمل التحويل الاسمي أو Despite the fact that.',
					'في تمرين ترتيب الجمل (Reorder) حدد أولاً الجملة المفتاحية التي تخلو من الضمائر المبهمة.',
					'اربط كل ضمير أو رابط منطقي (Moreover, However, Therefore) بالجملة السابقة له مباشرة.'
				],
				solutionStepsAr: [
					'إيجاد المرادفات أو التعريفات (1.5 نقطة).',
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'إعادة الكتابة في الاستدراك والماضي التام (2 نقطتان).',
					'تصنيف Final -ed وترتيب الجمل الأربع المتسقة (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. WRITTEN EXPRESSION (6 pts — Integration): BAC LE Article / Expository Essay on Heritage
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_le_t1_we_civilizations_article',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (6 نقاط — لغات أجنبية): مقال صحفي / تفسيري حول التراث الحضاري الإسلامي والجزائري',
		curriculumLessonId: 'eng_lesson_3as_le_t1_concession_contrast',
		defaultPoints: 6,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Write a newspaper article of about 120 to 150 words explaining what modern societies can learn from the rise and decline of past civilizations, using the following notes.',
					topicOneNotes: [
						'Factors of rise: justice, honest trade, investment in libraries and empirical science (Al-Qarawiyyin, Cordoba, Ibn al-Haytham)',
						'Factors of decline: internal division, corruption, neglect of education, excessive luxury (Ibn Khaldun analysis)',
						'Lessons for today: strengthen ethical governance, preserve heritage (Timgad, Tlemcen, Casbah), empower youth through knowledge'
					],
					topicTwoPrompt:
						'Write an expository essay of about 120 to 150 words discussing the importance of documenting and restoring Algeria archaeological and Islamic landmarks for cultural identity and sustainable tourism.',
					modelAnswer:
						'Timeless Lessons From the Rise and Fall of Civilizations\nHistory is not merely a museum of ruins; rather, it is a mirror that guides nations toward a wiser future. As Abdurrahman Ibn Khaldun observed centuries ago, civilizations rise when justice, social solidarity, and a deep respect for learning prevail. During the Islamic Golden Age, for instance, vibrant centres such as Al-Qarawiyyin, Cordoba, and Tlemcen flourished because societies invested generously in libraries, ethical commerce, and empirical scientists like Ibn al-Haytham and Al-Zahrawi.\nConversely, past empires declined whenever internal divisions, corruption, and neglect of education replaced discipline and fairness. Today, preserving Algerian landmarks such as Timgad, Tassili n-Ajjer, the Great Mosque of Tlemcen, and the Casbah reminds us of our creative heritage. Ultimately, nations endure not through temporary wealth, but by uniting moral integrity with continuous scientific progress.',
					easyQ: 'What is the official points allocation for Written Expression in 3AS BAC Foreign Languages (LE)?',
					easyAns: '6 points (out of 20)',
					easyWrong: ['5 points', '4 points', '8 points'],
					medQ: 'Which transition best opens Body Paragraph 2 when contrasting factors of decline with factors of rise?',
					medAns: 'Conversely, / By contrast,',
					medWrong: ['For example,', 'First of all,', 'To summarize,'],
					hardQ: 'Which thesis statement is strongest for a 6-point BAC LE article on past civilizations?',
					hardAns: 'History is not merely a museum of ruins; rather, it is a mirror that reveals how justice and knowledge sustain nations.',
					hardWrong: [
						'I will write about old buildings now.',
						'Civilizations are good and old.',
						'Notes: libraries, justice, Timgad.'
					]
				},
				{
					topicOnePrompt:
						'Write an expository essay of about 120 to 150 words highlighting Algeria diverse historical heritage and proposing practical ways to safeguard it, using the notes below.',
					topicOneNotes: [
						'Diverse heritage: prehistoric Tassili n-Ajjer, ancient Timgad, Hammadid Beni Hammad Fort, Great Mosque of Tlemcen, Casbah of Algiers',
						'Pressing threats: climate erosion, urban crowding, lack of awareness',
						'Practical measures: digital 3D archiving, specialist restoration, heritage education in schools, eco-friendly cultural visits'
					],
					topicTwoPrompt:
						'Write an argumentative essay of about 120 to 150 words discussing whether studying ancient civilizations still matters in an era dominated by digital technology.',
					modelAnswer:
						'Algeria stands at a remarkable historical crossroads, home to treasures spanning millennia: from the prehistoric rock art of Tassili n-Ajjer and the geometric avenues of Timgad to Beni Hammad Fort, the Great Mosque of Tlemcen, and the Casbah of Algiers. Despite their immense cultural value, these irreplaceable landmarks face ongoing threats from weather erosion, urban pressure, and insufficient public awareness.\nSafeguarding this legacy demands coordinated action. First, authorities and universities should expand specialist restoration alongside digital 3D archiving so every inscription is permanently recorded. Moreover, integrating heritage visits into school curricula inspires young Algerians to cherish and protect local monuments. Finally, promoting respectful, eco-friendly cultural tourism generates funds for maintenance while showcasing Algeria authentic history to the world. In conclusion, preserving our past is an investment in our dignity and future.',
					easyQ: 'What word count range is recommended for a strong 6-point BAC LE essay?',
					easyAns: 'About 120 to 150 words',
					easyWrong: ['Only 30 words', 'One single sentence', 'Over 1000 words'],
					medQ: 'Which concessive structure smoothly introduces the threats facing monuments?',
					medAns: 'Despite their immense cultural value, these landmarks face weather erosion.',
					medWrong: [
						'Despite of their immense cultural value, these landmarks face erosion.',
						'Although their immense cultural value, these landmarks face erosion.',
						'Despite they are valuable, these landmarks face erosion.'
					],
					hardQ: 'What distinguishes a 6/6 BAC LE essay from an average paragraph?',
					hardAns: 'Clear multi-paragraph architecture, precise academic vocabulary, varied complex syntax, and faithful format',
					hardWrong: [
						'Using informal slang and abbreviations',
						'Repeating the same simple sentence structure ten times',
						'Copying paragraphs directly from the reading text'
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
						diagnosticFeedback: 'راجع المنهجية الرسمية لتوزيع النقاط وحجم المقال في شعبة اللغات الأجنبية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الجواب المنهجي الصحيح لشعبة اللغات الأجنبية:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصواب المنهجي هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اختر الرابط الأكاديمي أو التركيب السليم نحوياً لبناء فقرة راقية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التركيب الأكاديمي الأصح لمقالك:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأصح هو: ${finalAnswer}`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'الامتياز في 6 نقاط يقوم على التخطيط المتوازن واللغة الأكاديمية الدقيقة وتنويع البنى.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر معيار التميز في التعبير الكتابي (6 نقاط):',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المعيار الصحيح هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART TWO: Written Expression',
				points: 6,
				instruction: 'Choose ONE of the following topics (120 to 150 words — 6 pts BAC LE):',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt: chosen.topicOnePrompt,
						topicOneNotes: chosen.topicOneNotes,
						topicTwoPrompt: chosen.topicTwoPrompt,
						modelAnswer: chosen.modelAnswer,
						rubricSummary: 'Relevance (1.5 pts) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence & Vocabulary (1.5 pts)',
						mark: '6'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'احترم قالب المطلوب بدقة (ضع عنواناً جذاباً إذا طُلب Newspaper Article، وابنِ فقرات متوازنة في Expository Essay).',
					'وظف تراكيب متقدمة من الوحدة: Even though, Despite + Nominalization, Whereas, Conversely.',
					'خصص وقتاً كافياً للمسودة والمراجعة اللغوية لأن التعبير يزن 6 نقاط كاملة (معامل 5).'
				],
				solutionStepsAr: [
					'تحديد القالب المطلوب (مقال صحفي أو تفسيري) وتنظيم المخطط في 3 إلى 4 فقرات.',
					'كتابة مقدمة لافتة وأطروحة واضحة.',
					'تطوير الأفكار بأمثلة حضارية دقيقة وروابط أكاديمية متقدمة.',
					'ختم المقال برسالة قوية ومراجعة النحو والإملاء والترقيم.'
				],
				finalAnswer
			};
		}
	}
];
