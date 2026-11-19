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
 * Parameterized Exam & Quiz Templates — Trimester 1: Unit 1 "Exploring the Past" (5 templates)
 * Roles: 2 comprehension (7 pts) + 2 text_exploration (8 pts) + 1 written_expression (5 pts)
 */
export const TEMPLATES_3AS_LP_T1: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (7 pts): Islamic Golden Age Civilization (Al-Qarawiyyin / Cordoba / Ibn Khaldun)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t1_comp_islamic_golden_age',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): إشعاع الحضارة الإسلامية (القرويين، قرطبة، وابن خلدون)',
		curriculumLessonId: 'eng_lesson_3as_lp_t1_past_perfect_simple',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Fatima al-Fihri and the Birth of Al-Qarawiyyin',
					source: 'Adapted from Historical Studies of North African Scholarship',
					paragraphs: [
						'In the ninth century, the city of Fez became a vibrant crossroads of learning and trade across North Africa. After Fatima al-Fihri had inherited a considerable fortune from her father, a respected merchant originally from Kairouan, [[she]] decided to dedicate her entire wealth to building a lasting house of worship and scholarship.',
						'In 859 CE, construction began on Al-Qarawiyyin Mosque and its attached educational centre. Scholars from across the Muslim world used to travel long distances to teach Quranic studies, Arabic grammar, jurisprudence, astronomy, and medicine. Despite the limited writing materials of that age, librarians were able to assemble an extraordinary collection of rare manuscripts.',
						'For centuries, Al-Qarawiyyin served as a bridge of knowledge connecting North Africa, Al-Andalus, and Europe. Students who had graduated from [[its]] lecture halls carried scientific methods and ethical scholarship back to their homelands, proving that generous endowments can uplift entire civilizations.'
					],
					glossary: [
						{ term: 'fortune', meaning: 'great wealth' },
						{ term: 'endowments', meaning: 'charitable funds dedicated to public benefit (waqf)' }
					],
					textType: 'Expository historical text',
					tfItems: [
						{ q: 'Fatima al-Fihri used her inherited wealth to build Al-Qarawiyyin in 859 CE.', a: 'True', mark: '0.5' },
						{ q: 'Only local students from Fez were allowed to attend classes at Al-Qarawiyyin.', a: 'False', c: 'Scholars and students travelled from across the Muslim world.', mark: '0.5' },
						{ q: 'The institution taught both religious sciences and natural sciences such as medicine and astronomy.', a: 'True', mark: '0.5' },
						{ q: 'Al-Qarawiyyin never had any intellectual influence beyond North Africa.', a: 'False', c: 'It served as a bridge of knowledge connecting North Africa, Al-Andalus, and Europe.', mark: '0.5' }
					],
					whQuestions: [
						{
							q: 'a) How did Fatima al-Fihri finance the construction of Al-Qarawiyyin?',
							a: 'She financed it using the considerable fortune she had inherited from her father.',
							mark: '1'
						},
						{
							q: 'b) Mention three subjects taught in the lecture halls of Al-Qarawiyyin.',
							a: 'Any three of: Quranic studies, Arabic grammar, jurisprudence, astronomy, and medicine.',
							mark: '1'
						},
						{
							q: 'c) What challenge did the librarians overcome in paragraph 2?',
							a: 'Despite limited writing materials, they were able to assemble an extraordinary collection of rare manuscripts.',
							mark: '1'
						}
					],
					refQuestion: 'a) "she" (§1)   b) "its" (§3)',
					refAnswer: 'a) "she" refers to Fatima al-Fihri.   b) "its" refers to Al-Qarawiyyin.',
					titleOptions: [
						'A Pioneering Centre of Islamic Scholarship',
						'Modern Trade Routes in Europe',
						'The Decline of Maritime Commerce'
					],
					bestTitle: 'A Pioneering Centre of Islamic Scholarship',
					easyQ: 'In what year did construction begin on Al-Qarawiyyin?',
					easyAns: '859 CE',
					easyWrong: ['1859 CE', '659 CE', '1492 CE'],
					medQ: 'What does the pronoun "its" in paragraph 3 refer to?',
					medAns: 'Al-Qarawiyyin',
					medWrong: ['Kairouan', 'Europe', 'rare manuscripts'],
					hardQ: 'What main lesson does the author draw in the concluding paragraph?',
					hardAns: 'Generous charitable endowments in education can uplift entire civilizations',
					hardWrong: [
						'Ancient libraries could not survive without modern printing presses',
						'Trade was always more influential than scholarship in Fez',
						'Only wealthy merchants were permitted to study astronomy'
					]
				},
				{
					title: 'Cordoba: Beacon of Libraries and Learning in Al-Andalus',
					source: 'Adapted from Chronicles of Andalusian Civilization',
					paragraphs: [
						'During the tenth century, Cordoba stood as one of the most prosperous and refined cities in the world. After Muslim engineers had designed sophisticated irrigation networks and paved streets, [[the city]] witnessed remarkable urban growth alongside extraordinary intellectual vitality.',
						'Paper-making techniques had reached Al-Andalus from Baghdad and North Africa, enabling copyists to produce thousands of books every year. Cordoba boasted dozens of public libraries, hospitals, and schools where scholars such as Al-Zahrawi advanced surgery and documented over two hundred medical instruments.',
						'Although political divisions eventually weakened Andalusian rule, [[their]] scientific treatises and architectural heritage continued to inspire researchers for generations. Today, historians recognize Andalusian scholarship as a vital link in human scientific progress.'
					],
					glossary: [
						{ term: 'vitality', meaning: 'energy and active growth' },
						{ term: 'treatises', meaning: 'formal written works dealing systematically with a subject' }
					],
					textType: 'Expository historical text',
					tfItems: [
						{ q: 'Cordoba flourished as a major centre of learning during the tenth century.', a: 'True', mark: '0.5' },
						{ q: 'Paper-making was unknown in Al-Andalus until the twentieth century.', a: 'False', c: 'Paper-making had already reached Al-Andalus from Baghdad and North Africa.', mark: '0.5' },
						{ q: 'Al-Zahrawi documented more than two hundred surgical instruments.', a: 'True', mark: '0.5' },
						{ q: 'Political unity lasted forever in Al-Andalus without any divisions.', a: 'False', c: 'Political divisions eventually weakened Andalusian rule.', mark: '0.5' }
					],
					whQuestions: [
						{
							q: 'a) What infrastructure achievements preceded Cordoba urban growth in paragraph 1?',
							a: 'Muslim engineers had designed sophisticated irrigation networks and paved streets.',
							mark: '1'
						},
						{
							q: 'b) How did paper-making benefit Cordoba intellectual life?',
							a: 'It enabled copyists to produce thousands of books every year and fill dozens of public libraries.',
							mark: '1'
						},
						{
							q: 'c) What caused Andalusian political rule to weaken?',
							a: 'Political divisions eventually weakened Andalusian rule.',
							mark: '1'
						}
					],
					refQuestion: 'a) "the city" (§1)   b) "their" (§3)',
					refAnswer: 'a) "the city" refers to Cordoba.   b) "their" refers to Andalusian scholars (or the people of Al-Andalus).',
					titleOptions: [
						'The Scientific and Cultural Radiance of Cordoba',
						'Desert Agriculture in Modern Algeria',
						'The Invention of Steam Navigation'
					],
					bestTitle: 'The Scientific and Cultural Radiance of Cordoba',
					easyQ: 'Which renowned Muslim surgeon is mentioned in paragraph 2?',
					easyAns: 'Al-Zahrawi',
					easyWrong: ['Ibn Battuta', 'Al-Idrisi', 'Fatima al-Fihri'],
					medQ: 'Which factor enabled copyists in Cordoba to produce thousands of books yearly?',
					medAns: 'The arrival of paper-making techniques from Baghdad and North Africa',
					medWrong: [
						'The invention of modern electricity',
						'Political divisions among local rulers',
						'A ban on public libraries'
					],
					hardQ: 'Which relationship is expressed in the opening sentence of paragraph 3 ("Although...")?',
					hardAns: 'Concession between political decline and lasting intellectual heritage',
					hardWrong: [
						'Cause and effect between hospitals and irrigation',
						'Condition for building paved streets',
						'Sequence of two future actions'
					]
				},
				{
					title: 'Ibn Khaldun and the Science of Human Civilization',
					source: 'Adapted from North African Intellectual Heritage',
					paragraphs: [
						'Abdurrahman Ibn Khaldun was born in Tunis in 1332 CE and spent formative years studying and serving in major North African centres including Tlemcen, Bejaia, and Qalat Bani Salama in Algeria. Before [[he]] composed his celebrated masterpiece Al-Muqaddimah, Ibn Khaldun had observed the rise and decline of numerous dynasties at first hand.',
						'In Qalat Bani Salama near Tiaret, Ibn Khaldun withdrew from political turmoil for four years so that he could reflect calmly on history. Unlike earlier chroniclers who merely listed rulers and battles, he searched for the deep social, economic, and moral laws governing human societies.',
						'He argued that civilizations prosper when justice, fair taxation, and social solidarity prevail, whereas oppression and luxury lead inevitably to [[their]] collapse. Centuries later, historians worldwide still admire his analytical method as a foundational contribution to sociology and historiography.'
					],
					glossary: [
						{ term: 'turmoil', meaning: 'disorder and political instability' },
						{ term: 'historiography', meaning: 'the scientific writing and study of history' }
					],
					textType: 'Expository historical text',
					tfItems: [
						{ q: 'Ibn Khaldun spent important years in Algerian cities such as Tlemcen and Bejaia.', a: 'True', mark: '0.5' },
						{ q: 'He wrote Al-Muqaddimah at Qalat Bani Salama near Tiaret.', a: 'True', mark: '0.5' },
						{ q: 'Ibn Khaldun merely copied lists of kings without analyzing causes.', a: 'False', c: 'He searched for deep social, economic, and moral laws governing societies.', mark: '0.5' },
						{ q: 'According to Ibn Khaldun, justice and fair taxation help civilizations prosper.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{
							q: 'a) Where did Ibn Khaldun spend four years writing Al-Muqaddimah?',
							a: 'He spent four years at Qalat Bani Salama near Tiaret in Algeria.',
							mark: '1'
						},
						{
							q: 'b) How did Ibn Khaldun method differ from earlier chroniclers?',
							a: 'Unlike earlier chroniclers who only listed rulers and battles, he searched for deep social, economic, and moral laws.',
							mark: '1'
						},
						{
							q: 'c) According to paragraph 3, what leads civilizations to collapse?',
							a: 'Oppression and excessive luxury lead civilizations to collapse.',
							mark: '1'
						}
					],
					refQuestion: 'a) "he" (§1)   b) "their" (§3)',
					refAnswer: 'a) "he" refers to Abdurrahman Ibn Khaldun.   b) "their" refers to civilizations.',
					titleOptions: [
						'Ibn Khaldun: Pioneer of Historical Analysis',
						'Ancient Trade Ports of the Mediterranean',
						'Modern Architecture in North Africa'
					],
					bestTitle: 'Ibn Khaldun: Pioneer of Historical Analysis',
					easyQ: 'In which Algerian site did Ibn Khaldun spend four years composing Al-Muqaddimah?',
					easyAns: 'Qalat Bani Salama near Tiaret',
					easyWrong: ['Tassili n-Ajjer', 'Timgad in Batna', 'The Casbah of Algiers'],
					medQ: 'What does the possessive adjective "their" in paragraph 3 refer to?',
					medAns: 'civilizations',
					medWrong: ['earlier chroniclers', 'historians worldwide', 'taxation laws'],
					hardQ: 'According to Ibn Khaldun analysis, which pair of factors sustains a thriving civilization?',
					hardAns: 'Justice, fair taxation, and social solidarity',
					hardWrong: [
						'Excessive luxury and heavy oppression',
						'Isolation from all economic trade',
						'Listing rulers without investigating causes'
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
						diagnosticFeedback: 'ارجع إلى معطيات النص التاريخية بدقة للتحقق من الجواب الصحيح.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Based on the passage "${chosen.title}": ${chosen.easyQ}`,
					questionTextAr: 'اختر الإجابة الصحيحة من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `بحسب النص، الإجابة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تأكد من تطابق الضمير مع المرجع السابق له في العدد والنوع والمعنى.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reading Comprehension ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد الإجابة الدقيقة اعتماداً على النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة المستخلصة من سياق النص هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'أعد قراءة الفقرة الأخيرة واستخلص الفكرة التحليلية الأساسية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Analytical Comprehension ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الفكرة العميقة من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاستنتاج الصحيح من النص هو: ${finalAnswer}.`
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
								options: [chosen.textType, 'A narrative short story', 'A formal complaint letter'],
								correct: chosen.textType,
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
								header: '5. Choose the most suitable title for the text:',
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
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'اقرأ الأسئلة أولاً ثم عد إلى الفقرة المرقمة (§1, §2, §3) للعثور على المعلومة بدقة.',
					'في أسئلة True/False تحقق من الكلمات الدقيقة مثل only أو never.',
					'في سؤال الإحالة (Reference) ابحث عن الاسم السابق للضمير وطابقه في العدد والنوع.'
				],
				solutionStepsAr: [
					`تحديد نوع النص: ${chosen.textType}.`,
					'التحقق من صحة وخطأ العبارات الأربع انطلاقاً من فقرات النص.',
					'الإجابة المركزة عن أسئلة الاستيعاب الثلاثة دون نسخ عشوائي.',
					`تحديد مرجع الضمائر بدقة: ${chosen.refAnswer}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. COMPREHENSION (7 pts): Algerian Historical Heritage (Timgad / Tlemcen / Casbah)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t1_comp_algerian_heritage',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'فهم النص (7 نقاط): التراث الحضاري الجزائري (تيمقاد، تلمسان، وقصبة الجزائر)',
		curriculumLessonId: 'eng_lesson_3as_lp_t1_past_habits_abilities',
		defaultPoints: 7,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'Tassili n-Ajjer and Timgad: Living Witness to Algerian History',
					source: 'Adapted from Algerian Heritage Gazette',
					paragraphs: [
						'Algeria holds some of the richest archaeological treasures in the Mediterranean and Saharan regions. Long before modern cities appeared, prehistoric communities in Tassili n-Ajjer used to engrave remarkable rock paintings depicting gazelles, cattle, and daily pastoral life when [[the plateau]] was green and watered by rivers.',
						'Further north in Batna, the ancient city of Timgad stands as a celebrated example of orderly urban planning. Built in 100 CE along a clean geometric grid, Timgad had public libraries, paved avenues, and water channels that served thousands of inhabitants for centuries.',
						'Today, both sites are recognized as UNESCO World Heritage landmarks. Although erosion and time pose ongoing challenges, Algerian conservation specialists have been able to document and protect [[these monuments]] so that future generations can study their roots with pride.'
					],
					glossary: [
						{ term: 'pastoral', meaning: 'related to herding livestock and rural life' },
						{ term: 'erosion', meaning: 'gradual wearing away by wind or water' }
					],
					tfItems: [
						{ q: 'Tassili n-Ajjer rock paintings show that the Sahara plateau was once green.', a: 'True', mark: '0.5' },
						{ q: 'Timgad is located in southern Tassili n-Ajjer.', a: 'False', c: 'Timgad is located further north in Batna.', mark: '0.5' },
						{ q: 'Timgad featured paved avenues, public libraries, and water channels.', a: 'True', mark: '0.5' },
						{ q: 'Both Tassili n-Ajjer and Timgad are UNESCO World Heritage landmarks.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) What scenes did prehistoric communities depict in Tassili n-Ajjer?', a: 'They depicted gazelles, cattle, and daily pastoral life.', mark: '1' },
						{ q: 'b) What architectural feature makes Timgad famous?', a: 'Its orderly urban planning built along a clean geometric grid.', mark: '1' },
						{ q: 'c) Why do Algerian specialists work to protect these monuments?', a: 'So that future generations can study their historical roots with pride.', mark: '1' }
					],
					refQuestion: 'a) "the plateau" (§1)   b) "these monuments" (§3)',
					refAnswer: 'a) "the plateau" refers to Tassili n-Ajjer.   b) "these monuments" refers to Tassili n-Ajjer and Timgad.',
					bestTitle: 'Preserving Algeria Ancient Archaeological Heritage',
					titleOptions: [
						'Preserving Algeria Ancient Archaeological Heritage',
						'Modern Industrial Factories in Batna',
						'How to Build High-Speed Railways'
					],
					easyAns: 'Batna',
					easyQ: 'In which Algerian province is the ancient city of Timgad located?',
					easyWrong: ['Tlemcen', 'Oran', 'Annaba'],
					medAns: 'Tassili n-Ajjer and Timgad',
					medQ: 'What does "these monuments" in paragraph 3 refer to?',
					medWrong: ['Modern cities', 'Public libraries only', 'Saharan rivers'],
					hardAns: 'Protecting heritage despite erosion so future generations can learn their history',
					hardQ: 'What is the central idea of paragraph 3?',
					hardWrong: [
						'The abandonment of UNESCO sites',
						'How prehistoric people hunted gazelles',
						'Why geometric grids failed in ancient towns'
					]
				},
				{
					title: 'The Great Mosque of Tlemcen and Beni Hammad Fort',
					source: 'Adapted from Chronicles of Islamic Architecture in Algeria',
					paragraphs: [
						'Islamic architecture in Algeria reached extraordinary heights during the medieval centuries. In 1007 CE, Hammadid builders constructed Beni Hammad Fort in the mountains of M-Sila, where [[they]] created a fortified capital complete with palaces, cisterns, and a grand mosque with a tall square minaret.',
						'A few decades later, in 1082 CE, the Great Mosque of Tlemcen was erected in western Algeria. Its finely carved stucco, ribbed dome, and serene courtyard became hallmarks of Maghrebi Islamic craftsmanship. Students used to gather under [[its]] arches to memorize the Quran and study Arabic literature.',
						'In spite of centuries of political change, both monuments testify to the artistic precision and deep spiritual culture of Algerian ancestors. Preserving these architectural masterpieces remains a shared cultural duty.'
					],
					glossary: [
						{ term: 'cisterns', meaning: 'underground tanks for storing rainwater' },
						{ term: 'stucco', meaning: 'fine plaster used for decorative wall carving' }
					],
					tfItems: [
						{ q: 'Beni Hammad Fort was constructed in 1007 CE in the province of M-Sila.', a: 'True', mark: '0.5' },
						{ q: 'The Great Mosque of Tlemcen was built before Beni Hammad Fort.', a: 'False', c: 'Beni Hammad Fort was built in 1007 CE, while the Great Mosque of Tlemcen was erected in 1082 CE.', mark: '0.5' },
						{ q: 'Students used to study the Quran and Arabic literature at the Great Mosque of Tlemcen.', a: 'True', mark: '0.5' },
						{ q: 'Both sites demonstrate the precision of Islamic architecture in Algeria.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Name two architectural elements found inside Beni Hammad Fort.', a: 'Any two of: palaces, cisterns, and a grand mosque with a tall square minaret.', mark: '1' },
						{ q: 'b) What decorative features distinguish the Great Mosque of Tlemcen?', a: 'Finely carved stucco, a ribbed dome, and a serene courtyard.', mark: '1' },
						{ q: 'c) What duty is highlighted at the end of paragraph 3?', a: 'Preserving these architectural masterpieces as a shared cultural duty.', mark: '1' }
					],
					refQuestion: 'a) "they" (§1)   b) "its" (§2)',
					refAnswer: 'a) "they" refers to Hammadid builders.   b) "its" refers to the Great Mosque of Tlemcen.',
					bestTitle: 'Masterpieces of Islamic Architecture in Algeria',
					titleOptions: [
						'Masterpieces of Islamic Architecture in Algeria',
						'Modern Skyscrapers of the Mediterranean',
						'Desert Trade in the Twentieth Century'
					],
					easyAns: '1082 CE',
					easyQ: 'When was the Great Mosque of Tlemcen erected?',
					easyWrong: ['1007 CE', '1830 CE', '859 CE'],
					medAns: 'Hammadid builders',
					medQ: 'Who does the pronoun "they" in paragraph 1 refer to?',
					medWrong: ['Students of Tlemcen', 'Modern architects', 'Mountain travellers'],
					hardAns: 'Combining fine artistic precision with educational and spiritual purpose',
					hardQ: 'What broader legacy do both monuments represent according to the passage?',
					hardWrong: [
						'Purely military defence without any cultural role',
						'Imported twentieth-century industrial design',
						'Short-lived structures that disappeared completely'
					]
				},
				{
					title: 'The Casbah of Algiers: Wisdom in Urban Design',
					source: 'Adapted from Mediterranean Urban Heritage Studies',
					paragraphs: [
						'Overlooking the bay of Algiers, the historic Casbah is much more than a maze of whitewashed houses. Built gradually on a steep hillside, [[it]] reflects centuries of practical wisdom adapted to the Mediterranean climate and community life.',
						'Traditional architects designed narrow shaded alleys so that pedestrians could walk comfortably during hot summers. Inside each residence, families gathered around a central courtyard with a water fountain that naturally cooled the rooms, while mosques, fountains, and artisan workshops served every neighbourhood.',
						'Although modern urban growth has reshaped much of the capital, restoration specialists continue to safeguard the Casbah historic palaces and mosques. Protecting [[this living heritage]] honours the ingenuity of Algerian artisans.'
					],
					glossary: [
						{ term: 'whitewashed', meaning: 'painted white with lime to reflect sunlight' },
						{ term: 'ingenuity', meaning: 'cleverness and creative skill' }
					],
					tfItems: [
						{ q: 'The Casbah of Algiers was constructed on a flat desert plain.', a: 'False', c: 'It was built gradually on a steep hillside overlooking the bay of Algiers.', mark: '0.5' },
						{ q: 'Narrow shaded alleys helped protect pedestrians from summer heat.', a: 'True', mark: '0.5' },
						{ q: 'Traditional Casbah homes included central courtyards that cooled the interior.', a: 'True', mark: '0.5' },
						{ q: 'Restoration specialists are working to safeguard the Casbah historic landmarks.', a: 'True', mark: '0.5' }
					],
					whQuestions: [
						{ q: 'a) Why did traditional architects design narrow shaded alleys in the Casbah?', a: 'So that pedestrians could walk comfortably during hot summers.', mark: '1' },
						{ q: 'b) How were the rooms inside traditional Casbah houses naturally cooled?', a: 'By a central courtyard with a water fountain.', mark: '1' },
						{ q: 'c) What public facilities served each neighbourhood?', a: 'Mosques, public fountains, and artisan workshops.', mark: '1' }
					],
					refQuestion: 'a) "it" (§1)   b) "this living heritage" (§3)',
					refAnswer: 'a) "it" refers to the historic Casbah of Algiers.   b) "this living heritage" refers to the Casbah (and its historic palaces and mosques).',
					bestTitle: 'Architectural Wisdom of the Historic Casbah',
					titleOptions: [
						'Architectural Wisdom of the Historic Casbah',
						'Farming Techniques in High Mountains',
						'Digital Smart Cities of Tomorrow'
					],
					easyAns: 'To keep pedestrians cool and shaded during hot summers',
					easyQ: 'Why were the alleys of the Casbah built narrow and shaded?',
					easyWrong: [
						'To allow wide modern trucks to pass',
						'Because builders ran out of white lime',
						'To block access to neighbourhood mosques'
					],
					medAns: 'The historic Casbah of Algiers',
					medQ: 'What does "it" in paragraph 1 refer to?',
					medWrong: ['The bay of Algiers', 'A water fountain', 'Modern urban growth'],
					hardAns: 'Harmonious adaptation to climate, privacy, and neighbourhood community life',
					hardQ: 'What core architectural principle does the Casbah exemplify?',
					hardWrong: [
						'Random construction without environmental planning',
						'Complete reliance on modern air conditioning',
						'Separation of mosques from residential quarters'
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
						diagnosticFeedback: 'راجع النص جيداً؛ المعلومة مذكورة صراحة في الفقرات الأولى.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Comprehension ("${chosen.title}"): ${chosen.easyQ}`,
					questionTextAr: 'اختر المعلومة الصحيحة الواردة في النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصريحة من النص: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تحقق من الاسم الذي يسبق الضمير أو العبارة الإحالية في النص.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Reference Check ("${chosen.title}"): ${chosen.medQ}`,
					questionTextAr: 'حدد المرجع الصحيح من النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المرجع الصحيح في النص هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اقرأ الفقرة الختامية لاستيعاب المغزى الحضاري العام.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `Global Meaning ("${chosen.title}"): ${chosen.hardQ}`,
					questionTextAr: 'استنتج الفكرة المحورية للنص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الفكرة المحورية الدقيقة هي: ${finalAnswer}.`
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
								options: ['Descriptive and historical', 'Argumentative debate', 'A business contract'],
								correct: 'Descriptive and historical',
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
								header: '5. Choose the general title that best fits the passage:',
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
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				examRole: 'comprehension',
				quizQuestion,
				sujetExercise,
				hints: [
					'تتبع التواريخ والأسماء الجغرافية الجزائرية بدقة في فقرات النص.',
					'تأكد من تصحيح العبارات الخاطئة في سؤال True/False بمعلومة دقيقة من النص.',
					'اربط كل ضمير بالاسم الأقرب الذي يوافقه في المعنى والعدد.'
				],
				solutionStepsAr: [
					'تحديد طبيعة النص التاريخي الوصفي (0.5 نقطة).',
					'حل عبارات الصواب والخطأ مع التعليل (2 نقطتان).',
					'صياغة إجابات موجزة ودقيقة لأسئلة الفهم الثلاثة (3 نقاط).',
					'تحديد مرجع الضميرين والعنوان الأنسب للنص (1.5 نقطة).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. TEXT EXPLORATION (8 pts): Past Perfect, Concession, Morphology & Final -ed
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t1_exp_tenses_concession_morph',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'grammar_tenses',
		titleAr: 'البناء اللغوي (8 نقاط): الماضي التام، الاستدراك، الاشتقاق ونطق Final -ed',
		curriculumLessonId: 'eng_lesson_3as_lp_t1_concession',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					lexisPrompt: 'a) thrived = ..........   b) ancient opposite of = ..........   c) heritage = ..........',
					lexisAnswer: 'a) flourished / prospered   b) modern   c) legacy / inheritance',
					morphRows: [
						{ verb: { given: true, value: 'to civilize' }, noun: { value: 'civilization', mark: '0.25' }, adjective: { value: 'civilized', mark: '0.25' } },
						{ verb: { value: 'to prosper', mark: '0.25' }, noun: { given: true, value: 'prosperity' }, adjective: { value: 'prosperous', mark: '0.25' } },
						{ verb: { value: 'to achieve', mark: '0.25' }, noun: { value: 'achievement', mark: '0.25' }, adjective: { given: true, value: 'achievable' } }
					],
					rewrites: [
						{
							prompt: '1) a) Muslim astronomers managed to measure the earth circumference.\n   b) Muslim astronomers ...........................................................',
							answer: '1) b) Muslim astronomers were able to measure the earth circumference.'
						},
						{
							prompt: '2) a) First, Al-Khwarizmi wrote his book on algebra. Then, scholars translated it into Latin.\n   b) After Al-Khwarizmi ...........................................................',
							answer: '2) b) After Al-Khwarizmi had written his book on algebra, scholars translated it into Latin.'
						},
						{
							prompt: '3) a) Although the desert climate was harsh, builders erected durable oases.\n   b) Despite ........................................................................',
							answer: '3) b) Despite the harsh desert climate (OR Despite the fact that the desert climate was harsh), builders erected durable oases.'
						}
					],
					edWords: 'flourished - founded - ruled - developed',
					edCols: [
						{ header: '/t/', words: ['flourished', 'developed'], mark: '0.5' },
						{ header: '/d/', words: ['ruled'], mark: '0.25' },
						{ header: '/id/', words: ['founded'], mark: '0.25' }
					],
					clozeWords: 'libraries - justice - flourished - scholars',
					clozePrompt: 'Islamic civilization (1) .......... when leaders valued knowledge and (2) .......... . Great (3) .......... attracted (4) .......... from distant lands.',
					clozeAnswer: '1) flourished   2) justice   3) libraries   4) scholars',
					easyQ: 'What is the Noun derived from the verb "to prosper"?',
					easyAns: 'prosperity',
					easyWrong: ['prosperous', 'prosperation', 'prospering'],
					medQ: 'Complete correctly: After Al-Khwarizmi .......... his book, scholars translated it.',
					medAns: 'had written',
					medWrong: ['wrote', 'writes', 'has written'],
					hardQ: 'Choose the accurate rewrite with "Despite": Although the desert climate was harsh, builders erected oases.',
					hardAns: 'Despite the harsh desert climate, builders erected oases.',
					hardWrong: [
						'Despite of the harsh desert climate, builders erected oases.',
						'Despite the desert climate was harsh, builders erected oases.',
						'Despite harsh, builders erected oases.'
					]
				},
				{
					lexisPrompt: 'a) construct = ..........   b) decline opposite of = ..........   c) manuscripts = ..........',
					lexisAnswer: 'a) build / erect   b) rise / prosperity   c) hand-written books',
					morphRows: [
						{ verb: { given: true, value: 'to unify' }, noun: { value: 'unification', mark: '0.25' }, adjective: { value: 'unified', mark: '0.25' } },
						{ verb: { value: 'to contribute', mark: '0.25' }, noun: { given: true, value: 'contribution' }, adjective: { value: 'contributory', mark: '0.25' } },
						{ verb: { value: 'to preserve', mark: '0.25' }, noun: { value: 'preservation', mark: '0.25' }, adjective: { given: true, value: 'preserved' } }
					],
					rewrites: [
						{
							prompt: '1) a) Caravan traders were obliged to guard their supplies carefully.\n   b) Caravan traders ..............................................................',
							answer: '1) b) Caravan traders had to guard their supplies carefully.'
						},
						{
							prompt: '2) a) The fortress did not expand. Safe roads were built first.\n   b) The fortress did not expand until ............................................',
							answer: '2) b) The fortress did not expand until safe roads had been built.'
						},
						{
							prompt: '3) a) Even though paper was scarce at first, scribes copied vital texts.\n   b) In spite of ..................................................................',
							answer: '3) b) In spite of the scarcity of paper at first (OR In spite of the fact that paper was scarce at first), scribes copied vital texts.'
						}
					],
					edWords: 'preserved - invented - established - carved',
					edCols: [
						{ header: '/t/', words: ['established'], mark: '0.25' },
						{ header: '/d/', words: ['preserved', 'carved'], mark: '0.5' },
						{ header: '/id/', words: ['invented'], mark: '0.25' }
					],
					clozeWords: 'trade - heritage - unified - architecture',
					clozePrompt: 'Historic cities grew rich through honest (1) .......... and remarkable (2) .......... . Today, preserving our (3) .......... keeps communities (4) .......... .',
					clozeAnswer: '1) trade   2) architecture   3) heritage   4) unified',
					easyQ: 'How is final "-ed" pronounced in the verb "established"?',
					easyAns: '/t/',
					easyWrong: ['/d/', '/id/', 'silent'],
					medQ: 'Which modal replaces "were obliged to" in: Traders were obliged to guard supplies?',
					medAns: 'had to',
					medWrong: ['used to', 'were able to', 'ought to'],
					hardQ: 'Combine accurately with "until": The fortress did not expand. Safe roads were built first.',
					hardAns: 'The fortress did not expand until safe roads had been built.',
					hardWrong: [
						'The fortress had not expanded until safe roads were built.',
						'The fortress did not expanded until safe roads had been built.',
						'The fortress did not expand until safe roads built.'
					]
				},
				{
					lexisPrompt: 'a) notable = ..........   b) collapse opposite of = ..........   c) scholars = ..........',
					lexisAnswer: 'a) remarkable / famous   b) rise / survival   c) learned researchers',
					morphRows: [
						{ verb: { given: true, value: 'to create' }, noun: { value: 'creation', mark: '0.25' }, adjective: { value: 'creative', mark: '0.25' } },
						{ verb: { value: 'to inherit', mark: '0.25' }, noun: { given: true, value: 'inheritance' }, adjective: { value: 'inherited', mark: '0.25' } },
						{ verb: { value: 'to organize', mark: '0.25' }, noun: { value: 'organization', mark: '0.25' }, adjective: { given: true, value: 'organized' } }
					],
					rewrites: [
						{
							prompt: '1) a) In the past, pupils wrote lessons on wooden slates.\n   b) In the past, pupils used .....................................................',
							answer: '1) b) In the past, pupils used to write lessons on wooden slates.'
						},
						{
							prompt: '2) a) Ibn Battuta visited Damascus before he travelled to India.\n   b) After Ibn Battuta ............................................................',
							answer: '2) b) After Ibn Battuta had visited Damascus, he travelled to India.'
						},
						{
							prompt: '3) a) Timgad suffered earthquakes, yet its grand arches survived.\n   b) Although .....................................................................',
							answer: '3) b) Although Timgad suffered earthquakes, its grand arches survived.'
						}
					],
					edWords: 'inherited - watched - studied - created',
					edCols: [
						{ header: '/t/', words: ['watched'], mark: '0.25' },
						{ header: '/d/', words: ['studied'], mark: '0.25' },
						{ header: '/id/', words: ['inherited', 'created'], mark: '0.5' }
					],
					clozeWords: 'ancient - astronomy - manuscripts - preserved',
					clozePrompt: 'Muslim scientists advanced medicine and (1) .......... . Their valuable (2) .......... were carefully (3) .......... in (4) .......... libraries.',
					clozeAnswer: '1) astronomy   2) manuscripts   3) preserved   4) ancient',
					easyQ: 'How is final "-ed" pronounced in the verb "inherited"?',
					easyAns: '/id/',
					easyWrong: ['/t/', '/d/', 'silent'],
					medQ: 'Choose the correct Verb corresponding to the noun "inheritance":',
					medAns: 'to inherit',
					medWrong: ['to inheritate', 'to inherize', 'to inheritive'],
					hardQ: 'Combine correctly with "Although": Timgad suffered earthquakes, yet its arches survived.',
					hardAns: 'Although Timgad suffered earthquakes, its arches survived.',
					hardWrong: [
						'Although Timgad suffered earthquakes, yet its arches survived.',
						'Although Timgad suffered earthquakes, but its arches survived.',
						'Although suffering earthquakes, Timgad arches survived.'
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
						diagnosticFeedback: 'راجع قواعد الاشتقاق ونطق النهاية -ed في الدرس.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الإجابة الصحيحة في البناء اللغوي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصحيحة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انتبه لتوافق الأزمنة وصيغ الأفعال في الماضي.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'أكمل الجملة بالصيغة النحوية السليمة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصيغة الصحيحة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'تذكر حذف but/yet مع Although، واستعمال عبارة اسمية بلا of بعد Despite.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر إعادة الكتابة الصحيحة بمستوى البكالوريا:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `إعادة الكتابة الدقيقة هي: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following language exploration activities carefully (8 pts — BAC LP):',
				content: [
					{
						type: 'text',
						content: `1. Give synonyms or opposites for the following civilization vocabulary:\n${chosen.lexisPrompt}`,
						answer: chosen.lexisAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building chart as shown in the example:'
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
						content: `4. Classify the following verbs according to the pronunciation of their final "-ed": (${chosen.edWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.edCols }),
					{
						type: 'text',
						content: `5. Fill in the gaps with words from the list so that the passage makes sense: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'grammar_tenses',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'بعد After نضع Past Perfect (had + V3)، وبعد Before نضع Past Simple.',
					'مع Despite نستعمل عبارة اسمية أو Despite the fact that، ولا نكتب of بعد Despite أبداً.',
					'في جدول Final -ed انظر دائماً للصوت الأخير لأصل الفعل قبل -ed.'
				],
				solutionStepsAr: [
					'إيجاد المرادفات والأضداد بدقة (1.5 نقطة).',
					'إكمال جدول الاشتقاق Verb / Noun / Adjective (1.5 نقطة).',
					'إعادة كتابة الجمل الثلاث مع ضبط الأزمنة والروابط (3 نقاط).',
					'تصنيف أفعال Final -ed وإكمال فقرة الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (8 pts): Word Building, Connectors & Final -s
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t1_exp_word_building_phonology',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'vocabulary_morphology',
		titleAr: 'البناء اللغوي (8 نقاط): الاشتقاق والأضداد، الربط النحوي، ونطق Final -s',
		curriculumLessonId: 'eng_lesson_3as_lp_t1_phonology_ed_s',
		defaultPoints: 8,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					oppPrompt: 'Give the opposites of the following words keeping the same root: literate / stable / appear / regular',
					oppAnswer: 'illiterate / unstable / disappear / irregular',
					morphRows: [
						{ verb: { given: true, value: 'to flourish' }, noun: { value: 'flourishing', mark: '0.25' }, adjective: { value: 'flourishing', mark: '0.25' } },
						{ verb: { value: 'to educate', mark: '0.25' }, noun: { given: true, value: 'education' }, adjective: { value: 'educational', mark: '0.25' } },
						{ verb: { value: 'to fortify', mark: '0.25' }, noun: { value: 'fortification', mark: '0.25' }, adjective: { given: true, value: 'fortified' } }
					],
					combines: [
						{
							prompt: '1) Combine with (as soon as): The engineers built aqueducts. Water reached every quarter of Timgad.',
							answer: '1) As soon as the engineers had built aqueducts, water reached every quarter of Timgad.'
						},
						{
							prompt: '2) Combine with (in spite of): The journey was exhausting. Ibn Battuta recorded detailed notes.',
							answer: '2) In spite of the exhausting journey (OR In spite of the fact that the journey was exhausting), Ibn Battuta recorded detailed notes.'
						},
						{
							prompt: '3) Rewrite with (did not use to): Ancient merchants never relied on electronic banking.',
							answer: '3) Ancient merchants did not use to rely on electronic banking.'
						}
					],
					sWords: 'manuscripts - palaces - scholars - mosques',
					sCols: [
						{ header: '/s/', words: ['manuscripts', 'mosques'], mark: '0.5' },
						{ header: '/z/', words: ['scholars'], mark: '0.25' },
						{ header: '/iz/', words: ['palaces'], mark: '0.25' }
					],
					clozeWords: 'dynasties - justice - books - flourished',
					clozePrompt: 'According to Ibn Khaldun, (1) .......... grow strong through unity and (2) .......... . Under wise rulers, cities (3) .......... and scholars authored countless (4) .......... .',
					clozeAnswer: '1) dynasties   2) justice   3) flourished   4) books',
					easyQ: 'What is the opposite of "literate" keeping the same root?',
					easyAns: 'illiterate',
					easyWrong: ['unliterate', 'disliterate', 'imliterate'],
					medQ: 'In which column is "palaces" classified for the pronunciation of final "-s"?',
					medAns: '/iz/',
					medWrong: ['/s/', '/z/', 'silent'],
					hardQ: 'Combine accurately with "as soon as": The engineers built aqueducts. Water reached every quarter.',
					hardAns: 'As soon as the engineers had built aqueducts, water reached every quarter.',
					hardWrong: [
						'As soon as the engineers built aqueducts, water had reached every quarter.',
						'As soon as the engineers had built aqueducts, water had reached every quarter.',
						'As soon as the engineers build aqueducts, water reached every quarter.'
					]
				},
				{
					oppPrompt: 'Give the opposites of the following words keeping the same root: legal / known / honest / moral',
					oppAnswer: 'illegal / unknown / dishonest / immoral',
					morphRows: [
						{ verb: { given: true, value: 'to discover' }, noun: { value: 'discovery', mark: '0.25' }, adjective: { value: 'discovered', mark: '0.25' } },
						{ verb: { value: 'to develop', mark: '0.25' }, noun: { given: true, value: 'development' }, adjective: { value: 'developed', mark: '0.25' } },
						{ verb: { value: 'to construct', mark: '0.25' }, noun: { value: 'construction', mark: '0.25' }, adjective: { given: true, value: 'constructive' } }
					],
					combines: [
						{
							prompt: '1) Combine with (before): Muslim chemists perfected distillation. Modern laboratories adopted their methods.',
							answer: '1) Muslim chemists had perfected distillation before modern laboratories adopted their methods.'
						},
						{
							prompt: '2) Combine with (though): Ancient maps lacked satellites. Al-Idrisi drew remarkably accurate coastlines.',
							answer: '2) Though ancient maps lacked satellites, Al-Idrisi drew remarkably accurate coastlines.'
						},
						{
							prompt: '3) Rewrite with (were able to): Conservationists succeeded in restoring the old dome.',
							answer: '3) Conservationists were able to restore the old dome.'
						}
					],
					sWords: 'artifacts - arches - civilizations - bridges',
					sCols: [
						{ header: '/s/', words: ['artifacts'], mark: '0.25' },
						{ header: '/z/', words: ['civilizations'], mark: '0.25' },
						{ header: '/iz/', words: ['arches', 'bridges'], mark: '0.5' }
					],
					clozeWords: 'routes - oases - trade - merchants',
					clozePrompt: 'For centuries, brave (1) .......... crossed Saharan (2) .......... linking North and West Africa. Green (3) .......... offered shelter and encouraged peaceful (4) .......... .',
					clozeAnswer: '1) merchants   2) routes   3) oases   4) trade',
					easyQ: 'What is the opposite of "moral" keeping the same root?',
					easyAns: 'immoral',
					easyWrong: ['unmoral', 'inmoral', 'dismoral'],
					medQ: 'Which word has its final "-s" pronounced /s/?',
					medAns: 'artifacts',
					medWrong: ['arches', 'bridges', 'civilizations'],
					hardQ: 'Combine accurately with "before": Muslim chemists perfected distillation. Modern labs adopted it.',
					hardAns: 'Muslim chemists had perfected distillation before modern labs adopted it.',
					hardWrong: [
						'Muslim chemists perfected distillation before modern labs had adopted it.',
						'Before Muslim chemists had perfected distillation, modern labs adopted it.',
						'Muslim chemists have perfected distillation before modern labs adopted it.'
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
						diagnosticFeedback: 'تذكر قواعد البادئات السالبة: il- قبل l، و im- قبل m/p، و ir- قبل r.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر الضد الصحيح مع الحفاظ على الجذر:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الضد الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'انطق أصل الكلمة قبل النهاية -s وحدد هل الصوت مهموس أم مجهور أم صفيري.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر التصنيف الصوتي الدقيق لـ Final -s:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الصوتية الدقيقة هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'الحدث الأول في Past Perfect والحدث الثاني في Past Simple.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الجملة المركبة الصحيحة زمنياً:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التركيب الزمني الصحيح هو: ${finalAnswer}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following language exploration activities carefully (8 pts — BAC LP):',
				content: [
					{
						type: 'text',
						content: `1. ${chosen.oppPrompt}`,
						answer: chosen.oppAnswer,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2. Complete the following word-building table:'
					},
					buildEnglishWordBuildingTableBlock(chosen.morphRows),
					{
						type: 'text',
						content: `3. Combine or rewrite each pair of sentences using the connectors given:\n${chosen.combines.map((c) => c.prompt).join('\n')}`,
						answer: chosen.combines.map((c) => c.answer).join('\n'),
						mark: '3'
					},
					{
						type: 'text',
						content: `4. Classify the following words according to the pronunciation of their final "-s": (${chosen.sWords})`
					},
					buildEnglishPhonologyTableBlock({ columns: chosen.sCols }),
					{
						type: 'text',
						content: `5. Fill in each gap with the appropriate word from the list: (${chosen.clozeWords})\n${chosen.clozePrompt}`,
						answer: chosen.clozeAnswer,
						mark: '1'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'vocabulary_morphology',
				titleAr: this.titleAr,
				examRole: 'text_exploration',
				quizQuestion,
				sujetExercise,
				hints: [
					'استعمل البادئة المناسبة لأول حرف في الكلمة (il- قبل l، im- قبل m/p، ir- قبل r).',
					'في Final -s: خانة /iz/ تختص بأصوات الصفير (palaces, arches, bridges).',
					'في فقرة الفراغات حدد نوع الكلمة المطلوبة (اسم، فعل، صفة) قبل الاختيار.'
				],
				solutionStepsAr: [
					`بناء الأضداد بالبادئات الصحيحة: ${chosen.oppAnswer} (1.5 نقطة).`,
					'إكمال جدول الاشتقاق الثلاثي (1.5 نقطة).',
					'الربط وإعادة الكتابة بضبط الأزمنة (3 نقاط).',
					'تصنيف Final -s وملء الفراغات (2 نقطتان).'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts — Integration): Ancient & Islamic Civilizations
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_lp_t1_we_ancient_civilizations',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 نقاط): الحضارة الإسلامية وصون التراث التاريخي الجزائري',
		curriculumLessonId: 'eng_lesson_3as_lp_t1_word_building_civ',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicOnePrompt:
						'Using the following notes, write a composition of about 80 to 120 words explaining why Islamic civilization flourished during its Golden Age and what humanity inherited from it.',
					topicOneNotes: [
						'Encouraging literacy, libraries, and translation of useful sciences',
						'Great scholars: Al-Khwarizmi (algebra), Ibn al-Haytham (optics), Al-Zahrawi (surgery), Ibn Khaldun (history)',
						'Values of justice, honest trade, and charitable endowments (waqf)',
						'Lasting contributions to modern medicine, mathematics, and architecture'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words explaining why preserving historical sites in Algeria (such as Timgad, Tassili n-Ajjer, the Great Mosque of Tlemcen, and the Casbah) is important for future generations.',
					modelAnswer:
						'Islamic civilization flourished remarkably during its Golden Age because it united ethical values with a deep love of useful knowledge. First, rulers and generous citizens built public libraries and schools such as Al-Qarawiyyin, encouraging literacy and careful scientific research. Moreover, brilliant Muslim scholars made enduring breakthroughs: Al-Khwarizmi founded algebra, Ibn al-Haytham pioneered experimental optics, Al-Zahrawi advanced surgery, and Ibn Khaldun laid the foundations of historical science. Furthermore, justice, honest commerce, and charitable endowments created stable and prosperous cities across North Africa and Al-Andalus. In conclusion, humanity inherited from Islamic civilization not only major discoveries in medicine, mathematics, and architecture, but also a timeless lesson that true progress depends on knowledge and moral integrity.',
					easyQ: 'Which paragraph part should state the main topic of a BAC LP essay?',
					easyAns: 'The Introduction (Thesis statement)',
					easyWrong: ['Only the final sentence', 'A list of random words without verbs', 'The glossary'],
					medQ: 'Which linker best adds a second supporting achievement in the body paragraph?',
					medAns: 'Moreover,',
					medWrong: ['In conclusion,', 'Whereas,', 'Unless,'],
					hardQ: 'Which closing sentence best concludes an essay on the legacy of Islamic civilization?',
					hardAns: 'In conclusion, true civilizational progress depends on uniting useful knowledge with justice and moral integrity.',
					hardWrong: [
						'First of all, Al-Khwarizmi wrote a book.',
						'Despite the fact that libraries existed.',
						'For example, algebra and surgery.'
					]
				},
				{
					topicOnePrompt:
						'Using the following notes, write an article of about 80 to 120 words for your school magazine on how young Algerians can protect and promote our national historical heritage.',
					topicOneNotes: [
						'Rich sites: Tassili n-Ajjer, Timgad, Beni Hammad Fort, Great Mosque of Tlemcen, Casbah of Algiers',
						'Threats: neglect, pollution, illegal excavations, weather erosion',
						'Youth actions: school heritage clubs, clean-up campaigns, informative digital articles',
						'Benefits: national pride, cultural tourism, learning from ancestors'
					],
					topicTwoPrompt:
						'Write a composition of about 80 to 120 words discussing the main factors that cause ancient civilizations to rise and eventually decline.',
					modelAnswer:
						'Safeguarding Algeria Historical Heritage\nAlgeria possesses an extraordinary historical heritage, including Tassili n-Ajjer, Timgad, Beni Hammad Fort, the Great Mosque of Tlemcen, and the Casbah of Algiers. Unfortunately, these precious landmarks face serious threats such as pollution, neglect, weather erosion, and illegal excavations. Therefore, young Algerians have an important role to play in protecting them. First, students can create school heritage clubs and organize clean-up visits to historic sites. Moreover, they can publish accurate articles and short videos online to raise public awareness about the architectural genius of our ancestors. In conclusion, preserving our monuments not only strengthens national pride and cultural tourism, but also ensures that future generations remain connected to their authentic history.',
					easyQ: 'What is the ideal word range for a 3AS BAC LP Written Expression (5 pts)?',
					easyAns: 'About 80 to 120 words',
					easyWrong: ['Only 15 words', 'Over 800 words', 'A single sentence'],
					medQ: 'Which linker best introduces solutions after presenting threats to monuments?',
					medAns: 'Therefore,',
					medWrong: ['Although,', 'Because of,', 'Before,'],
					hardQ: 'How should Guided Notes in Topic One be used in the exam?',
					hardAns: 'Expanded into full, grammatically connected sentences organized into Introduction, Body, and Conclusion',
					hardWrong: [
						'Copied as disconnected bullet phrases with no verbs',
						'Ignored completely while writing on an unrelated subject',
						'Translated literally word-for-word into Arabic'
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
						diagnosticFeedback: 'راجع منهجية التعبير الكتابي الموجه لشعبة آداب وفلسفة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.easyQ,
					questionTextAr: 'اختر القاعدة المنهجية الصحيحة للتعبير الكتابي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الصواب المنهجي هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.medAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.medWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'اختر أداة الربط المناسبة للوظيفة المنطقية داخل الفقرة.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.medQ,
					questionTextAr: 'اختر أداة الربط الأنسب لتماسك الفقرة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الرابط الأنسب هنا هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.hardAns;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					chosen.hardWrong.map((w) => ({
						text: w,
						diagnosticFeedback: 'الخاتمة الجيدة تلخص الفكرة العامة بجملة تامة وقوية.'
					})),
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: chosen.hardQ,
					questionTextAr: 'اختر الخيار الأقوى في منهجية التعبير الكتابي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الاختيار الأصح هو: ${finalAnswer}`
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
				trimesterId: 't1',
				difficulty,
				domain: 'written_expression',
				titleAr: this.titleAr,
				examRole: 'written_expression',
				quizQuestion,
				sujetExercise,
				hints: [
					'اختر موضوعاً واحداً فقط (الموضوع الأول الموجه أسهل وأضمن لوجود الأفكار الجاهزة).',
					'قسّم موضوعك بوضوح إلى مقدمة، عرض من فقرتين أو فقرة متماسكة، وخاتمة موجزة.',
					'وظف روابط مثل First, Moreover, Furthermore, Therefore, In conclusion وراجع الأزمنة والإملاء.'
				],
				solutionStepsAr: [
					'تحليل المطلوب وتحديد الأفكار الرئيسية من الرؤوس الموجهة (Notes).',
					'صياغة مقدمة ممهدة وجملة أطروحة واضحة.',
					'توسيع النقاط في العرض بجمل سليمة وروابط منطقية متنوعة.',
					'ختم المقال بخلاصة موجزة ومراجعة القواعد والترقيم.'
				],
				finalAnswer
			};
		}
	}
];
