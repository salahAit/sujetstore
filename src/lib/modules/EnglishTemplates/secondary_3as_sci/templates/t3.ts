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
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T3
// Unit 3: Are We Alone? (Astronomy & Solar System)
// Unit 4: We Are a Family! (Solidarity & Moral Values) + BAC Methodology
// 5 BAC Templates: 2 comprehension (8 pts) + 2 text_exploration (7 pts) + 1 written_expression (5 pts)
// ═══════════════════════════════════════════════════════════════════════════════

export const TEMPLATES_3AS_SCI_T3: EnglishParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. COMPREHENSION (8 pts) — Astronomy, Solar System & Muslim Astronomers
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t3_comp_astronomy',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): علم الفلك والمجموعة الشمسية وإسهامات علماء المسلمين (البيروني والخوارزمي وابن الهيثم)',
		curriculumLessonId: 'eng_lesson_3as_sci_t3_similarity_astronomy',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'The Precision of the Solar System',
					source: 'Adapted from Modern Space Science Review',
					paragraphs: [
						'Our Solar System is a breathtaking model of cosmic precision and order. At [[its]] centre lies the Sun, a luminous star whose immense gravitational pull keeps eight planets moving steadily along fixed elliptical orbits. The four inner planets — Mercury, Venus, Earth, and Mars — are small and rocky, whereas the four outer planets — Jupiter, Saturn, Uranus, and Neptune — are massive gas and ice giants.',
						'Among all known planets, Earth occupies a uniquely balanced position called the habitable zone. If our planet were much closer to the Sun, oceans would boil away; if [[it]] were far more distant, all surface water would freeze solid. Furthermore, Earth protective atmosphere shields living creatures from harmful cosmic radiation and moderates daily temperatures.',
						'Studying astronomy deepens human gratitude and inspires practical technology on Earth. Artificial satellites orbiting hundreds of kilometres above our heads monitor hurricanes, guide ships across oceans, and help farmers track rainfall. Observing the flawless harmony of planetary motion reminds scientists and students alike of the remarkable precision of [[creation]].'
					],
					glossary: [
						{ term: 'elliptical', meaning: 'oval-shaped rather than perfectly circular' },
						{ term: 'habitable', meaning: 'suitable for living beings to survive' }
					],
					tfItems: [
						{ q: 'The four inner planets of the Solar System are massive gas giants.', a: 'False', c: 'The four inner planets are small and rocky, whereas the outer ones are gas and ice giants.', mark: '0.5' },
						{ q: 'Earth distance from the Sun allows liquid water to exist on its surface.', a: 'True', mark: '0.5' },
						{ q: 'Earth atmosphere protects living beings from harmful cosmic radiation.', a: 'True', mark: '0.5' },
						{ q: 'Astronomy offers no practical benefits for weather monitoring or farming.', a: 'False', c: 'Satellites monitor hurricanes, guide ships, and help farmers track rainfall.', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) Earth sits in a balanced zone where liquid water neither boils nor freezes?\nb) artificial satellites assist farmers, sailors, and weather forecasters?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) How do the four inner planets differ from the four outer planets?\nb) What would happen to Earth oceans if our planet were much closer to the Sun?\nc) Mention two practical uses of artificial satellites described in paragraph 3.',
					whA: 'a) The inner planets are small and rocky, whereas the outer planets are massive gas and ice giants.\nb) Earth oceans would boil away.\nc) Monitoring hurricanes, guiding ships across oceans, and helping farmers track rainfall (any two).',
					refQ: '4. What or who do the underlined words refer to in the text?\na) its (§1)   b) it (§2)   c) creation (§3)',
					refA: 'a) its: our Solar System | b) it: our planet (Earth) | c) creation: the universe and planetary system',
					easyQ: 'According to "The Precision of the Solar System", which group of planets is small and rocky?',
					easyCorrect: 'Mercury, Venus, Earth, and Mars',
					easyDistractors: [
						{ text: 'Jupiter, Saturn, Uranus, and Neptune', diagnosticFeedback: 'هذه الكواكب الخارجية الغازية والجليدية الضخمة.' },
						{ text: 'Artificial weather satellites', diagnosticFeedback: 'الأقمار الصناعية ليست كواكب.' },
						{ text: 'The Sun and distant comets', diagnosticFeedback: 'الشمس نجم وليست كوكبا صخريا.' }
					],
					medQ: 'In paragraph 1, what does the possessive adjective "its" refer to?',
					medCorrect: 'our Solar System',
					medDistractors: [
						{ text: 'the habitable zone', diagnosticFeedback: 'المنطقة الصالحة للحياة وردت في الفقرة الثانية.' },
						{ text: 'cosmic radiation', diagnosticFeedback: 'الإشعاع الكوني ورد في الفقرة الثانية.' },
						{ text: 'Jupiter', diagnosticFeedback: 'المشتري ورد في آخر الفقرة لا قبل الضمير.' }
					],
					hardQ: 'Why does the author mention what would happen if Earth were closer or farther from the Sun?',
					hardCorrect: 'To illustrate the exact balance that makes Earth uniquely suitable for life',
					hardDistractors: [
						{ text: 'To prove that Mercury has wide oceans', diagnosticFeedback: 'عطارد حار جدا ولا توجد فيه محيطات.' },
						{ text: 'To argue against launching weather satellites', diagnosticFeedback: 'الفقرة الثالثة تشيد بفوائد الأقمار الصناعية.' },
						{ text: 'To suggest that Earth atmosphere is useless', diagnosticFeedback: 'الغلاف الجوي يحمي الكائنات الحية.' }
					]
				},
				{
					title: 'Muslim Pioneers of Astronomy and Optics',
					source: 'Adapted from History of Islamic Science',
					paragraphs: [
						'Long before modern space telescopes were built, Muslim scholars transformed astronomy into an exact, observation-based science. Guided by curiosity and respect for the order of the heavens, scientists across Baghdad, Cairo, and Central Asia constructed advanced observatories and refined instruments such as the astrolabe. [[They]] recorded planetary motions with extraordinary patience and mathematical rigour.',
						'Among the greatest pioneers was Muhammad ibn Musa al-Khwarizmi, whose astronomical tables helped navigators determine prayer times, lunar months, and geographic coordinates. Two centuries later, Al-Biruni applied trigonometry from a mountaintop to calculate the radius of Earth with remarkable accuracy. Meanwhile, Ibn al-Haytham revolutionized optics by proving that vision occurs when light enters the eye, laying principles that later made telescopes possible.',
						'The manuscripts of these scholars were translated into Latin and studied in European universities for centuries. Today, historians and astronomers honour [[their]] legacy by naming lunar craters after Al-Biruni, Al-Khwarizmi, and Ibn al-Haytham. Remembering [[it]] encourages young students to unite scientific curiosity with humility and discipline.'
					],
					glossary: [
						{ term: 'astrolabe', meaning: 'an ancient instrument used to measure star altitudes' },
						{ term: 'rigour', meaning: 'strict precision and thoroughness' }
					],
					tfItems: [
						{ q: 'Muslim astronomers relied only on guesswork without observatories or mathematics.', a: 'False', c: 'They built observatories, refined instruments like the astrolabe, and used mathematical rigour.', mark: '0.5' },
						{ q: 'Al-Biruni used trigonometry to calculate the radius of the Earth accurately.', a: 'True', mark: '0.5' },
						{ q: 'Ibn al-Haytham established principles of optics that later supported telescope design.', a: 'True', mark: '0.5' },
						{ q: 'Modern astronomy has completely forgotten the names of these Muslim pioneers.', a: 'False', c: 'Lunar craters are named after Al-Biruni, Al-Khwarizmi, and Ibn al-Haytham.', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) Al-Biruni calculated Earth radius and Ibn al-Haytham transformed optics?\nb) lunar craters bear the names of famous Muslim scientists today?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) How did Al-Khwarizmi astronomical tables help people in daily life and navigation?\nb) What major scientific contribution did Ibn al-Haytham make to optics?\nc) How do modern astronomers honour the legacy of these three scholars?',
					whA: 'a) They helped navigators determine prayer times, lunar months, and geographic coordinates.\nb) He proved that vision occurs when light enters the eye, laying foundations for telescopes.\nc) By naming lunar craters after Al-Biruni, Al-Khwarizmi, and Ibn al-Haytham.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) They (§1)   b) their (§3)   c) it (§3)',
					refA: 'a) They: Muslim scholars / scientists | b) their: these scholars (Al-Biruni, Al-Khwarizmi, and Ibn al-Haytham) | c) it: their scientific legacy',
					easyQ: 'According to "Muslim Pioneers of Astronomy and Optics", which scholar calculated the radius of Earth using trigonometry?',
					easyCorrect: 'Al-Biruni',
					easyDistractors: [
						{ text: 'Ibn al-Haytham', diagnosticFeedback: 'ابن الهيثم اشتهر في الفقرة بعلم البصريات.' },
						{ text: 'Al-Khwarizmi', diagnosticFeedback: 'الخوارزمي اشتهر في الفقرة بالجداول الفلكية.' },
						{ text: 'Modern astronauts only', diagnosticFeedback: 'البيروني حسب نصف قطر الأرض قبل ألف عام بدقة مذهلة.' }
					],
					medQ: 'In paragraph 1, what does the pronoun "They" refer to?',
					medCorrect: 'Muslim scholars and scientists',
					medDistractors: [
						{ text: 'modern space telescopes', diagnosticFeedback: 'الضمير يعود على العلماء الذين رصدوا حركة الكواكب.' },
						{ text: 'lunar craters', diagnosticFeedback: 'الفوهات القمرية وردت في الفقرة الثالثة.' },
						{ text: 'European universities', diagnosticFeedback: 'الجامعات الأوروبية وردت في الفقرة الثالثة.' }
					],
					hardQ: 'Why did Ibn al-Haytham discoveries in optics matter to the later history of astronomy?',
					hardCorrect: 'Because understanding how light travels and enters the eye laid the principles needed for telescopes',
					hardDistractors: [
						{ text: 'Because he invented artificial weather satellites', diagnosticFeedback: 'الأقمار الصناعية اختراع حديث.' },
						{ text: 'Because he replaced mathematics with guesswork', diagnosticFeedback: 'النص يؤكد الدقة العلمية والرياضية.' },
						{ text: 'Because he refused to share his manuscripts', diagnosticFeedback: 'مخطوطاته تُرجمت ودُرّست لقرون.' }
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
					'Look for contrast connectors (whereas, unlike) when comparing celestial bodies.',
					'Scan paragraph 2 carefully for scientific explanations and historical achievements.',
					'Verify the exact noun each underlined pronoun replaces before writing your answer.'
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
	// 2. COMPREHENSION (8 pts) — Unit 4: Solidarity, Charity & Community Service
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t3_comp_solidarity',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'reading_comprehension',
		titleAr: 'الفهم (8 ن): التضامن والتطوع والصدقة وروح التكافل في المجتمع',
		curriculumLessonId: 'eng_lesson_3as_sci_t3_solidarity_values',
		defaultPoints: 8,
		examRole: 'comprehension',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					title: 'Touiza and the Spirit of Youth Volunteering',
					source: 'Adapted from Algerian Social Heritage Chronicles',
					paragraphs: [
						'Long before formal charities existed, Algerian villages practised a remarkable tradition of solidarity known as Touiza. Whenever a family needed help harvesting olives, rebuilding a roof, or preparing for winter, neighbours gathered willingly to share the work without expecting any payment. [[This]] spirit of mutual assistance strengthened family bonds and ensured that no household stood alone.',
						'Today, university and secondary school students are reviving that noble heritage in modern forms. Across many wilayas, youth associations organize blood donation drives, collect winter blankets for mountain villages, and offer free tutoring to younger pupils before national exams. Even small acts of kindness transform difficult days when [[they]] are performed with sincerity.',
						'Volunteering benefits the giver just as much as the receiver. Young volunteers gain teamwork skills, patience, and deep empathy for people facing hardship. A caring society thrives when its citizens support [[one another]] in times of both joy and crisis.'
					],
					glossary: [
						{ term: 'reviving', meaning: 'bringing back to active life and practice' },
						{ term: 'empathy', meaning: 'the ability to understand and share the feelings of others' }
					],
					tfItems: [
						{ q: 'In Touiza, neighbours charged high wages before helping a family.', a: 'False', c: 'Neighbours shared the work willingly without expecting any payment.', mark: '0.5' },
						{ q: 'Modern Algerian youth associations organize blood donations and free tutoring.', a: 'True', mark: '0.5' },
						{ q: 'Volunteering benefits only the people who receive help, not the volunteers.', a: 'False', c: 'Volunteering benefits the giver too by building teamwork skills, patience, and empathy.', mark: '0.5' },
						{ q: 'Mutual support helps a society thrive during both joyful and difficult times.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) students collect winter blankets and provide free exam tutoring?\nb) helping others develops patience, teamwork, and empathy in youth?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) What was the traditional practice of Touiza in Algerian villages?\nb) Mention two voluntary activities organized by modern youth associations.\nc) How do young volunteers benefit personally from serving their community?',
					whA: 'a) A tradition where neighbours voluntarily helped a family harvest crops, repair a home, or prepare for winter without payment.\nb) Organizing blood donation drives, collecting winter blankets, and offering free tutoring (any two).\nc) They gain teamwork skills, patience, and deep empathy for others.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) This (§1)   b) they (§2)   c) one another (§3)',
					refA: 'a) This: the tradition of Touiza / unpaid mutual work | b) they: small acts of kindness | c) one another: citizens of a caring society',
					easyQ: 'According to "Touiza and the Spirit of Youth Volunteering", what characterized the traditional Touiza?',
					easyCorrect: 'Neighbours helping a family willingly without expecting payment',
					easyDistractors: [
						{ text: 'Hiring foreign construction companies', diagnosticFeedback: 'التويزة عمل تطوعي محلي بين الجيران دون مقابل مالي.' },
						{ text: 'Selling winter blankets at high prices', diagnosticFeedback: 'التويزة والجمعيات الخيرية قائمة على التكافل المجاني.' },
						{ text: 'Competing for individual prizes', diagnosticFeedback: 'تقوم على التعاون المتبادل لا التنافس المادي.' }
					],
					medQ: 'In paragraph 2, what does the pronoun "they" refer to?',
					medCorrect: 'small acts of kindness',
					medDistractors: [
						{ text: 'mountain villages', diagnosticFeedback: 'الجملة تتحدث عن أعمال الإحسان الصغيرة عندما تُؤدى بإخلاص.' },
						{ text: 'national exams', diagnosticFeedback: 'الامتحانات وردت في الجملة السابقة.' },
						{ text: 'formal charities', diagnosticFeedback: 'الجمعيات الرسمية وردت في الفقرة الأولى.' }
					],
					hardQ: 'What main lesson does paragraph 3 convey about volunteering?',
					hardCorrect: 'Serving others builds character and empathy in volunteers while strengthening society',
					hardDistractors: [
						{ text: 'Volunteering wastes students revision time', diagnosticFeedback: 'النص يشيد بتطوع التلاميذ والطلبة.' },
						{ text: 'Solidarity is only needed during joyful occasions', diagnosticFeedback: 'النص يذكر أوقات الفرح والأزمات معا.' },
						{ text: 'Old traditions like Touiza cannot inspire modern youth', diagnosticFeedback: 'الفقرة الثانية تبين أن الشباب يحيون هذا الإرث بأساليب معاصرة.' }
					]
				},
				{
					title: 'Charity and Neighbourly Compassion in Hard Times',
					source: 'Adapted from Community Ethics Journal',
					paragraphs: [
						'Natural disasters such as floods, wildfires, and harsh winter storms often test the true character of a community. In those urgent moments, official rescue teams work tirelessly, yet spontaneous solidarity from ordinary neighbours makes an immediate difference. Opening homes, sharing warm meals, and clearing blocked roads prove that compassion is stronger than [[fear]].',
						'Charity is not limited to emergency relief; [[it]] is also a quiet daily habit. Checking on an elderly neighbour, sponsoring school supplies for orphans, or donating surplus food to needy families preserves human dignity without drawing attention. Sincere generosity focuses on lifting burdens discreetly rather than seeking public praise.',
						'Teaching children empathy starts with daily example inside the home. When parents involve [[their]] sons and daughters in charitable giving and respectful service, young people grow up viewing solidarity as a natural duty. Through kindness and cooperation, every neighbourhood becomes an extended family.'
					],
					glossary: [
						{ term: 'spontaneous', meaning: 'happening naturally without being forced' },
						{ term: 'discreetly', meaning: 'quietly and respectfully without showing off' }
					],
					tfItems: [
						{ q: 'Ordinary neighbours cannot help during floods or winter storms.', a: 'False', c: 'Spontaneous solidarity from neighbours makes an immediate difference.', mark: '0.5' },
						{ q: 'True charity happens only during large natural disasters.', a: 'False', c: 'Charity is also a quiet daily habit like helping elderly neighbours or orphans.', mark: '0.5' },
						{ q: 'Sincere generosity aims to help quietly rather than seek public praise.', a: 'True', mark: '0.5' },
						{ q: 'Parents can teach empathy by involving children in charitable acts.', a: 'True', mark: '0.5' }
					],
					paraMatchQ: '2. In which paragraph is it mentioned that:\na) sincere giving helps the needy quietly without seeking attention?\nb) parents set a practical example of compassion for their children?',
					paraMatchA: 'a) Paragraph 2 (§2) | b) Paragraph 3 (§3)',
					whQ: '3. Answer the following questions according to the text:\na) How do neighbours assist one another during natural disasters according to paragraph 1?\nb) Give two examples of quiet daily charity mentioned in paragraph 2.\nc) How should parents cultivate solidarity in their children?',
					whA: 'a) By opening homes, sharing warm meals, and clearing blocked roads.\nb) Checking on an elderly neighbour, sponsoring school supplies for orphans, and donating surplus food (any two).\nc) By setting a daily example and involving their sons and daughters in charitable giving and respectful service.',
					refQ: '4. What or who do the underlined words refer to in the text?\na) fear (§1)   b) it (§2)   c) their (§3)',
					refA: 'a) fear: anxiety/panic caused by natural disasters | b) it: charity | c) their: parents',
					easyQ: 'According to "Charity and Neighbourly Compassion in Hard Times", what does sincere generosity focus on?',
					easyCorrect: 'Lifting burdens discreetly while preserving human dignity',
					easyDistractors: [
						{ text: 'Seeking public praise and attention', diagnosticFeedback: 'النص يؤكد أن الإحسان الصادق يبتعد عن طلب الثناء الظاهري.' },
						{ text: 'Waiting only for major earthquakes', diagnosticFeedback: 'الفقرة الثانية تبرز الصدقة كعادة يومية هادئة.' },
						{ text: 'Ignoring elderly neighbours', diagnosticFeedback: 'تفقد الجار المسن من صور الإحسان اليومي في النص.' }
					],
					medQ: 'In paragraph 2, what does the pronoun "it" refer to?',
					medCorrect: 'charity',
					medDistractors: [
						{ text: 'emergency relief', diagnosticFeedback: 'الضمير يعود على الفاعل الأول في الجملة: Charity.' },
						{ text: 'public praise', diagnosticFeedback: 'الثناء العام ورد في نهاية الفقرة.' },
						{ text: 'harsh winter storms', diagnosticFeedback: 'العواصف وردت في الفقرة الأولى.' }
					],
					hardQ: 'What metaphor closes the passage in paragraph 3?',
					hardCorrect: 'Every caring neighbourhood becomes an extended family',
					hardDistractors: [
						{ text: 'Every neighbourhood becomes a commercial market', diagnosticFeedback: 'النص يختم بصورة الأسرة الممتدة لا السوق.' },
						{ text: 'Charity replaces official rescue teams completely', diagnosticFeedback: 'الفقرة الأولى تذكر تكامل فرق الإنقاذ مع الجيران.' },
						{ text: 'Children should avoid community service until adulthood', diagnosticFeedback: 'الفقرة الثالثة تدعو لإشراك الأبناء مبكرا.' }
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
					'Check negative words like "without payment" or "not limited to" when judging True/False.',
					'Give clear, complete sentences for Wh-questions.',
					'Trace each underlined pronoun to its nearest grammatically matching antecedent.'
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
	// 3. TEXT EXPLORATION (7 pts) — Conditionals 1/2/3, Unless, Similarity, Final -s
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t3_expl_astronomy_grammar',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'grammar_tenses',
		titleAr: 'البناء اللغوي (7 ن): الجمل الشرطية و Unless والمقارنة في الفلك والنهاية -s',
		curriculumLessonId: 'eng_lesson_3as_sci_t3_conditionals_unless',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Match each astronomy term with its definition:\na) orbit   b) satellite   c) gravity   d) telescope\nDefinitions: (1) optical instrument to view distant stars | (2) curved path around a star or planet | (3) force attracting objects toward a planet | (4) body or machine revolving around a planet',
					vocabA: 'a-2 (orbit) | b-4 (satellite) | c-3 (gravity) | d-1 (telescope)',
					wordRows: [
						{ verb: { given: true, value: 'to observe' }, noun: { value: 'observation / observer', mark: '0.25' }, adjective: { value: 'observant / observable', mark: '0.25' } },
						{ verb: { value: 'to explore', mark: '0.25' }, noun: { given: true, value: 'exploration' }, adjective: { value: 'exploratory', mark: '0.25' } },
						{ verb: { value: 'to measure', mark: '0.25' }, noun: { value: 'measurement', mark: '0.25' }, adjective: { given: true, value: 'measurable' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) If the weather satellite does not transmit data, forecasters will miss the storm.\n   b) Unless ........................................................................\n2. a) Mars is rocky and dry. Jupiter is huge and gaseous.\n   b) Unlike ........................................................................\n3. a) Al-Biruni calculated the radius of Earth with trigonometry.\n   b) The radius of Earth ........................................................................\n4. a) Put the verbs in the right tense (Conditional Type 2): If Earth (have) ........ no atmosphere, meteorites (strike) ........ the ground constantly.',
					rewriteA:
						'1. b) Unless the weather satellite transmits data, forecasters will miss the storm.\n2. b) Unlike Mars, Jupiter is huge and gaseous.\n3. b) The radius of Earth was calculated by Al-Biruni with trigonometry.\n4. had / would strike',
					phonIntro: '4. Classify the following words according to the pronunciation of their final -s: planets, stars, galaxies, eclipses',
					phonCols: [
						{ header: '/s/', words: ['planets'], mark: '0.25' },
						{ header: '/z/', words: ['stars', 'galaxies'], mark: '0.5' },
						{ header: '/iz/', words: ['eclipses'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (sun - orbits - gravity - eight)\nOur Solar System consists of the (1) ........ and (2) ........ major planets. Strong solar (3) ........ holds every planet cleanly along its fixed (4) ........ .',
					gapA: '(1) sun | (2) eight | (3) gravity | (4) orbits',
					easyQ: 'Rewrite with "Unless": "If the satellite does not send signals, engineers will reset it."',
					easyCorrect: 'Unless the satellite sends signals, engineers will reset it.',
					easyDistractors: [
						{ text: 'Unless the satellite does not send signals, engineers will reset it.', diagnosticFeedback: 'لا نضع النفي does not بعد Unless.' },
						{ text: 'Unless the satellite send signals, engineers will reset it.', diagnosticFeedback: 'أعد حرف -s للفعل بعد حذف does not (sends).' },
						{ text: 'Unless the satellite sends signals, engineers will not reset it.', diagnosticFeedback: 'لا تغيّر قطبية الجملة الثانية لأن الأولى كانت منفية أصلا.' }
					],
					medQ: 'Complete (Conditional Type 2): "If Earth ........ no atmosphere, temperatures ........ extreme."',
					medCorrect: 'had / would be',
					medDistractors: [
						{ text: 'has / would be', diagnosticFeedback: 'النوع الثاني يأخذ Past Simple (had) مع would + stem.' },
						{ text: 'had / will be', diagnosticFeedback: 'لا نجمع بين had و will.' },
						{ text: 'had had / would be', diagnosticFeedback: 'had had للنوع الثالث لا الثاني.' }
					],
					hardQ: 'How is the final "-s" pronounced in "eclipses" and "galaxies"?',
					hardCorrect: 'eclipses = /iz/ and galaxies = /z/',
					hardDistractors: [
						{ text: 'Both are pronounced /s/', diagnosticFeedback: 'eclipses تنتهي بـ se (/iz/) و galaxies تنتهي بصوت علة (/z/).' },
						{ text: 'eclipses = /z/ and galaxies = /iz/', diagnosticFeedback: 'عكست النطق بين الكلمتين.' },
						{ text: 'Both are pronounced /iz/', diagnosticFeedback: 'galaxies تنتهي بصوت علة /i:/ فتأخذ /z/ لا /iz/.' }
					]
				},
				{
					vocabQ: '1. Match each word with its closest synonym:\na) massive   b) luminous   c) calculate   d) harmony\nSynonyms: (1) shining | (2) compute | (3) huge | (4) balance',
					vocabA: 'a-3 (huge) | b-1 (shining) | c-2 (compute) | d-4 (balance)',
					wordRows: [
						{ verb: { given: true, value: 'to rotate' }, noun: { value: 'rotation', mark: '0.25' }, adjective: { value: 'rotational', mark: '0.25' } },
						{ verb: { value: 'to discover', mark: '0.25' }, noun: { given: true, value: 'discovery' }, adjective: { value: 'discoverable', mark: '0.25' } },
						{ verb: { value: 'to distance', mark: '0.25' }, noun: { value: 'distance', mark: '0.25' }, adjective: { given: true, value: 'distant' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) If astronomers protect dark skies, we will see faint stars clearly.\n   b) Unless ........................................................................\n2. a) Earth orbits the Sun. Venus orbits the Sun too.\n   b) Both ........................................................................\n3. a) Modern telescopes capture high-resolution images of distant nebulae.\n   b) High-resolution images of distant nebulae ........................................................................\n4. a) Put the verbs in the right tense (Conditional Type 3): If the probe (reach) ........ orbit safely, it (send) ........ detailed maps.',
					rewriteA:
						'1. b) Unless astronomers protect dark skies, we will not see faint stars clearly.\n2. b) Both Earth and Venus orbit the Sun.\n3. b) High-resolution images of distant nebulae are captured by modern telescopes.\n4. had reached / would have sent',
					phonIntro: '4. Classify the following words according to the pronunciation of their final -s: comets, moons, lenses, telescopes',
					phonCols: [
						{ header: '/s/', words: ['comets', 'telescopes'], mark: '0.5' },
						{ header: '/z/', words: ['moons'], mark: '0.25' },
						{ header: '/iz/', words: ['lenses'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (optics - scholars - telescopes - stars)\nMuslim (1) ........ laid strong foundations for modern astronomy. Ibn al-Haytham advanced (2) ........, helping future generations build accurate (3) ........ to study distant (4) ........ .',
					gapA: '(1) scholars | (2) optics | (3) telescopes | (4) stars',
					easyQ: 'Combine with "Both...and": "Earth orbits the Sun. Venus orbits the Sun too."',
					easyCorrect: 'Both Earth and Venus orbit the Sun.',
					easyDistractors: [
						{ text: 'Both Earth and Venus orbits the Sun.', diagnosticFeedback: 'الفاعل جمع (كوكبان) فنحذف -s من الفعل: orbit.' },
						{ text: 'Both Earth or Venus orbit the Sun.', diagnosticFeedback: 'تترافق Both دائما مع and وليس or.' },
						{ text: 'Both Earth and Venus is orbiting the Sun.', diagnosticFeedback: 'الفاعل الجمع يأخذ are وليس is.' }
					],
					medQ: 'Rewrite a positive If-clause with "Unless": "If we reduce light pollution, we will observe the Milky Way."',
					medCorrect: 'Unless we reduce light pollution, we will not observe the Milky Way.',
					medDistractors: [
						{ text: 'Unless we reduce light pollution, we will observe the Milky Way.', diagnosticFeedback: 'نسيت نفي الجملة الثانية للحفاظ على المعنى.' },
						{ text: 'Unless we do not reduce light pollution, we will observe the Milky Way.', diagnosticFeedback: 'لا نضع do not بعد Unless.' },
						{ text: 'Unless we reduced light pollution, we will not observe the Milky Way.', diagnosticFeedback: 'حافظ على زمن المضارع البسيط في الشرط من النوع الأول.' }
					],
					hardQ: 'Complete (Conditional Type 3): "If the engineer had checked the sensor, the rocket ........ on time."',
					hardCorrect: 'would have launched',
					hardDistractors: [
						{ text: 'would launch', diagnosticFeedback: 'النوع الثالث (had checked) يتطلب would have + PP.' },
						{ text: 'will have launched', diagnosticFeedback: 'نستعمل would have لا will have في النوع الثالث.' },
						{ text: 'had launched', diagnosticFeedback: 'had + PP تكون في جملة If لا في جواب الشرط.' }
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
				instruction: 'Complete all vocabulary, morphology, grammar, phonology, and gap-fill tasks.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building table:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.phonIntro },
					buildEnglishPhonologyTableBlock({ columns: v.phonCols }),
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
					'When replacing "If...does not" with "Unless", restore -s/-es on the verb for singular third-person subjects.',
					'Remember Both A and B always takes a plural verb without -s.',
					'Match Conditional Type 2 (Past Simple + would stem) and Type 3 (had PP + would have PP).'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. TEXT EXPLORATION (7 pts) — Reported Speech, Unit 4 Morphology, Final -ed
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t3_expl_reported_bac',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'discourse_cohesion',
		titleAr: 'البناء اللغوي (7 ن): الكلام المنقول ومفردات التضامن ونطق النهاية Final -ed',
		curriculumLessonId: 'eng_lesson_3as_sci_t3_reported_speech',
		defaultPoints: 7,
		examRole: 'text_exploration',
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					vocabQ: '1. Divide the following words into prefix, root, and suffix:\na) kindness   b) cooperation   c) unkind   d) voluntary',
					vocabA: 'a) kind + ness | b) co + operate + ion | c) un + kind | d) volunt(eer) + ary',
					wordRows: [
						{ verb: { given: true, value: 'to cooperate' }, noun: { value: 'cooperation', mark: '0.25' }, adjective: { value: 'cooperative', mark: '0.25' } },
						{ verb: { value: 'to donate', mark: '0.25' }, noun: { given: true, value: 'donation' }, adjective: { value: 'donated', mark: '0.25' } },
						{ verb: { value: 'to help', mark: '0.25' }, noun: { value: 'help / helpfulness', mark: '0.25' }, adjective: { given: true, value: 'helpful' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) The volunteer said: "We collected two hundred winter coats yesterday."\n   b) The volunteer said that ........................................................................\n2. a) The journalist asked the astronomer: "Can weather satellites predict sandstorms?"\n   b) The journalist asked the astronomer ........................................................................\n3. a) The student asked: "How far is Mars from Earth?"\n   b) The student asked ........................................................................\n4. a) The coordinator told the youth: "Do not forget elderly neighbours in winter."\n   b) The coordinator reminded the youth ........................................................................',
					rewriteA:
						'1. b) The volunteer said that they had collected two hundred winter coats the day before.\n2. b) The journalist asked the astronomer if / whether weather satellites could predict sandstorms.\n3. b) The student asked how far Mars was (or: is) from Earth.\n4. b) The coordinator reminded the youth not to forget elderly neighbours in winter.',
					phonIntro: '4. Classify the following verbs according to the pronunciation of their final -ed: helped, shared, donated, organized',
					phonCols: [
						{ header: '/t/', words: ['helped'], mark: '0.25' },
						{ header: '/d/', words: ['shared', 'organized'], mark: '0.5' },
						{ header: '/id/', words: ['donated'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (solidarity - needy - generous - community)\nTrue (1) ........ shines brightest during difficult seasons. When (2) ........ citizens donate food and clothes to (3) ........ families, the entire (4) ........ grows stronger.',
					gapA: '(1) solidarity | (2) generous | (3) needy | (4) community',
					easyQ: 'Report: The teacher told the pupils, "Respect elderly neighbours."',
					easyCorrect: 'The teacher told the pupils to respect elderly neighbours.',
					easyDistractors: [
						{ text: 'The teacher told the pupils respected elderly neighbours.', diagnosticFeedback: 'الأمر المنقول يأخذ الصيغة: told + object + to + stem.' },
						{ text: 'The teacher told the pupils that respect elderly neighbours.', diagnosticFeedback: 'ننقل الأمر بـ to + stem لا بـ that.' },
						{ text: 'The teacher told the pupils respecting elderly neighbours.', diagnosticFeedback: 'نحتاج to + stem لا V-ing.' }
					],
					medQ: 'Report: The journalist asked, "Can satellites detect wildfires early?"',
					medCorrect: 'The journalist asked if satellites could detect wildfires early.',
					medDistractors: [
						{ text: 'The journalist asked if could satellites detect wildfires early.', diagnosticFeedback: 'أعد ترتيب الجملة (فاعل ثم فعل) في السؤال المنقول.' },
						{ text: 'The journalist asked that satellites could detect wildfires early.', diagnosticFeedback: 'سؤال Yes/No يُربط بـ if أو whether لا بـ that.' },
						{ text: 'The journalist asked if satellites can detect wildfires early?', diagnosticFeedback: 'حوّل can إلى could واحذف علامة الاستفهام.' }
					],
					hardQ: 'Report: The volunteer said, "We distributed food parcels yesterday."',
					hardCorrect: 'The volunteer said that they had distributed food parcels the day before.',
					hardDistractors: [
						{ text: 'The volunteer said that we had distributed food parcels yesterday.', diagnosticFeedback: 'يجب تغيير الضمير (we إلى they) وظرف الزمان (yesterday إلى the day before).' },
						{ text: 'The volunteer said that they distributed food parcels the day before.', diagnosticFeedback: 'الماضي البسيط يرجع خطوة إلى الماضي التام (had distributed).' },
						{ text: 'The volunteer said that they have distributed food parcels the day before.', diagnosticFeedback: 'لا نستخدم Present Perfect مع فعل نقل ماضٍ وظرف ماضٍ.' }
					]
				},
				{
					vocabQ: '1. Form abstract nouns from the following adjectives:\na) generous   b) kind   c) solid   d) loyal',
					vocabA: 'a) generosity | b) kindness | c) solidarity | d) loyalty',
					wordRows: [
						{ verb: { given: true, value: 'to support' }, noun: { value: 'support / supporter', mark: '0.25' }, adjective: { value: 'supportive', mark: '0.25' } },
						{ verb: { value: 'to organize', mark: '0.25' }, noun: { given: true, value: 'organization' }, adjective: { value: 'organized', mark: '0.25' } },
						{ verb: { value: 'to care', mark: '0.25' }, noun: { value: 'care', mark: '0.25' }, adjective: { given: true, value: 'caring / careful' } }
					],
					rewriteQ:
						'3. Rewrite sentence (b) so that it means the same as sentence (a):\n1. a) The astronomer declared: "We will launch an improved telescope next year."\n   b) The astronomer declared that ........................................................................\n2. a) She asked me: "Why did villagers practise Touiza?"\n   b) She asked me ........................................................................\n3. a) The doctor says: "Charity reduces social isolation."\n   b) The doctor says that ........................................................................\n4. a) Neighbours help one another. Charities support poor families too.\n   b) Both ........................................................................',
					rewriteA:
						'1. b) The astronomer declared that they would launch an improved telescope the following year.\n2. b) She asked me why villagers had practised Touiza.\n3. b) The doctor says that charity reduces social isolation.\n4. b) Both neighbours and charities support poor families (or: help the community).',
					phonIntro: '4. Classify the following verbs according to the pronunciation of their final -ed: launched, supported, observed, thanked',
					phonCols: [
						{ header: '/t/', words: ['launched', 'thanked'], mark: '0.5' },
						{ header: '/d/', words: ['observed'], mark: '0.25' },
						{ header: '/id/', words: ['supported'], mark: '0.25' }
					],
					gapQ: '5. Fill in the gaps with words from the list: (volunteers - empathy - charity - families)\nPractising (1) ........ teaches young people deep (2) ........ toward others. Dedicated (3) ........ regularly visit elderly citizens and assist low-income (4) ........ .',
					gapA: '(1) charity | (2) empathy | (3) volunteers | (4) families',
					easyQ: 'How is the final "-ed" pronounced in the verb "supported"?',
					easyCorrect: '/id/',
					easyDistractors: [
						{ text: '/t/', diagnosticFeedback: 'أصل الفعل support ينتهي بصوت /t/ فتأخذ النهاية -ed صوت /id/.' },
						{ text: '/d/', diagnosticFeedback: 'بعد /t/ و /d/ ننطق /id/ دائما.' },
						{ text: '/iz/', diagnosticFeedback: '/iz/ يخص النهاية -s.' }
					],
					medQ: 'Report (Present reporting verb): The teacher says, "Empathy unites communities."',
					medCorrect: 'The teacher says that empathy unites communities.',
					medDistractors: [
						{ text: 'The teacher says that empathy had united communities.', diagnosticFeedback: 'فعل النقل says مضارع فلا نغيّر زمن الجملة.' },
						{ text: 'The teacher says that empathy would unite communities.', diagnosticFeedback: 'لا تراجع للأزمنة مع فعل نقل مضارع.' },
						{ text: 'The teacher said that empathy united communities yesterday.', diagnosticFeedback: 'لا تغيّر فعل النقل الأصلي says.' }
					],
					hardQ: 'Report: She asked me, "Why did villagers practise Touiza?"',
					hardCorrect: 'She asked me why villagers had practised Touiza.',
					hardDistractors: [
						{ text: 'She asked me why did villagers practise Touiza.', diagnosticFeedback: 'احذف did في السؤال المنقول وحوّل الفعل إلى الماضي التام.' },
						{ text: 'She asked me if why villagers had practised Touiza.', diagnosticFeedback: 'لا نجمع بين if وأداة السؤال why.' },
						{ text: 'She asked me why had villagers practised Touiza?', diagnosticFeedback: 'رتب الفاعل قبل الفعل المساعد واحذف علامة الاستفهام.' }
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
				instruction: 'Answer all morphology, reported speech, phonology, and discourse tasks carefully.',
				content: [
					{ type: 'text', content: v.vocabQ, answer: v.vocabA, mark: '1' },
					{ type: 'text', content: '2. Complete the following word-building chart:' },
					buildEnglishWordBuildingTableBlock(v.wordRows),
					{ type: 'text', content: v.rewriteQ, answer: v.rewriteA, mark: '2.5' },
					{ type: 'text', content: v.phonIntro },
					buildEnglishPhonologyTableBlock({ columns: v.phonCols }),
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
					'In Reported Questions, remove do/does/did, keep Subject + Verb order, and end with a full stop.',
					'Do NOT backshift tenses when the reporting verb is in the present (says / asks).',
					'In Final -ed, check whether the base verb ends in /t/ or /d/ (/id/), voiceless (/t/), or voiced (/d/).'
				],
				solutionStepsAr: [v.vocabA, v.rewriteA, v.gapA],
				finalAnswer: qMap.ans
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. WRITTEN EXPRESSION (5 pts) — Astronomy Benefits & Community Solidarity
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_tpl_3as_sci_t3_written_astronomy_solidarity',
		grade: '3as_se',
		trimesterId: 't3',
		domain: 'written_expression',
		titleAr: 'التعبير الكتابي (5 ن): فوائد علوم الفضاء والأقمار الصناعية أو قيمة التضامن والتطوع',
		curriculumLessonId: 'eng_lesson_3as_sci_t3_bac_methodology',
		defaultPoints: 5,
		examRole: 'written_expression',
		isIntegration: true,
		generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const variants = [
				{
					topicOnePrompt:
						'Some people wonder whether investing in space science and artificial satellites brings real benefits to everyday life. Write a short essay of about 80 to 120 words explaining the practical advantages of astronomy and satellite technology.',
					topicOneNotes: [
						'Weather forecasting: early warnings against storms, floods, and droughts',
						'Communication and navigation: connecting remote regions and guiding planes and ships',
						'Agriculture and environment: monitoring water resources, crops, and forest fires',
						'Scientific inspiration: reflecting on the precision of creation and continuing the legacy of Muslim scholars'
					],
					topicTwoPrompt:
						'Solidarity and voluntary work are vital pillars of a peaceful society. Write a composition of about 80 to 120 words explaining how young people can serve their neighbourhood and help families in need.',
					modelAnswer:
						'Although space science may seem distant from daily concerns, artificial satellites provide essential services for humanity. First, weather satellites predict storms, floods, and droughts early, saving countless lives and helping farmers manage crops wisely. Moreover, communication and navigation satellites connect isolated villages and guide ships and aeroplanes safely across the globe. In addition, Earth-observation systems detect forest fires quickly and monitor vital water reserves. Finally, studying the precise harmony of planetary orbits deepens reflection on creation and honours the scientific heritage of pioneers like Al-Biruni and Ibn al-Haytham. To sum up, space research directly improves safety, knowledge, and sustainable development on Earth.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'Which paragraph structure best scores 5/5 in BAC Written Expression?',
					easyCorrect: 'A clear Introduction, a cohesive Body expanding the notes with linkers, and a concise Conclusion',
					easyDistractors: [
						{ text: 'A raw numbered list of fragments copied from the prompt', diagnosticFeedback: 'نسخ النقاط كما هي دون صياغة يخفض العلامة بشدة.' },
						{ text: 'One long run-on sentence without full stops or capitals', diagnosticFeedback: 'علامات الترقيم والفقرات أساسية في سلم التنقيط.' },
						{ text: 'Writing on a totally unrelated topic', diagnosticFeedback: 'الخروج عن الموضوع يُفقد علامة الملاءمة (Relevance).' }
					],
					medQ: 'Which sentence correctly expands the note "early warnings against storms and droughts"?',
					medCorrect: 'First, weather satellites deliver early warnings against storms and droughts, protecting lives and crops.',
					medDistractors: [
						{ text: '- Early warnings against storms and droughts.', diagnosticFeedback: 'حوّل العارضة إلى جملة كاملة بفاعل وفعل.' },
						{ text: 'Weather satellites warning storms early.', diagnosticFeedback: 'تفتقر الجملة لفعل مصرف صحيح.' },
						{ text: 'Unless weather satellites predict storms, they save lives.', diagnosticFeedback: 'المعنى معكوس هنا مع Unless.' }
					],
					hardQ: 'Which sentence best combines Unit 3 grammar and accurate vocabulary?',
					hardCorrect: 'Unlike ancient guesswork, modern satellites monitor forest fires and water resources accurately.',
					hardDistractors: [
						{ text: 'Unlike ancient guesswork was wrong, modern satellites monitor fires.', diagnosticFeedback: 'Unlike يتبعها اسم أو عبارة اسمية فقط لا جملة فعلية.' },
						{ text: 'Both Al-Biruni and Al-Khwarizmi was great astronomers.', diagnosticFeedback: 'الفاعل جمع فيأخذ were لا was.' },
						{ text: 'If satellites do not orbit accurately, forecasts would fail tomorrow.', diagnosticFeedback: 'لا نخلط المضارع (Type 1) مع would (Type 2).' }
					]
				},
				{
					topicOnePrompt:
						'Your school club is launching a solidarity week to encourage charity and voluntary service. Write a speech or article of about 80 to 120 words highlighting the importance of solidarity and practical ways students can help their community.',
					topicOneNotes: [
						'Moral value: charity, empathy, and strengthening social bonds',
						'School initiatives: collecting books, school bags, and winter clothes for needy pupils',
						'Neighbourhood care: visiting elderly residents and keeping streets clean',
						'Personal benefit: building responsibility, humility, and teamwork'
					],
					topicTwoPrompt:
						'Imagine you are writing for a science magazine about the remarkable order of our Solar System and why Earth is uniquely suited for life. Write an essay of about 80 to 120 words presenting clear scientific facts.',
					modelAnswer:
						'Solidarity is the moral glue that turns a neighbourhood into a supportive family. First, acts of charity and sincere empathy ease the hardship of low-income families and strengthen mutual respect across society. At school, students can launch practical campaigns to collect textbooks, stationery, and warm winter coats for needy classmates. Furthermore, youth volunteers ought to check on elderly neighbours and join local tree-planting and clean-up days. Beyond helping others, voluntary service develops humility, responsibility, and teamwork among young citizens. In conclusion, a peaceful community flourishes whenever its members care for one another with generosity and sincerity.',
					rubricSummary: 'Relevance to topic (1.5 pts) | Semantic coherence and linkers (1 pt) | Correct grammar, spelling and punctuation (1.5 pts) | Vocabulary richness and structure (1 pt)',
					easyQ: 'Which closing linker is ideal for summarizing a BAC solidarity essay?',
					easyCorrect: 'In conclusion, a caring community flourishes when citizens support one another.',
					easyDistractors: [
						{ text: 'Once upon a time, citizens supported one another.', diagnosticFeedback: 'عبارة حكاية غير مناسبة للخاتمة.' },
						{ text: 'First of all, a caring community flourishes.', diagnosticFeedback: 'First of all لبداية العرض لا الخاتمة.' },
						{ text: 'Bye for now, see you next week.', diagnosticFeedback: 'عبارة غير رسمية لا تناسب المقال المدرسي.' }
					],
					medQ: 'Which sentence correctly uses a Unit 4 reciprocal pronoun?',
					medCorrect: 'Kind neighbours support one another during both happy occasions and hard times.',
					medDistractors: [
						{ text: 'Kind neighbours support itself during hard times.', diagnosticFeedback: 'itself لغير العاقل المفرد.' },
						{ text: 'Kind neighbours support himself during hard times.', diagnosticFeedback: 'الفاعل جمع وليس مفردا مذكرا.' },
						{ text: 'Kind neighbours ought support one another.', diagnosticFeedback: 'نسيت حرف الجر to بعد ought.' }
					],
					hardQ: 'Which sentence uses abstract value nouns with 100% correct spelling?',
					hardCorrect: 'Sincere generosity, kindness, and solidarity unite every neighbourhood.',
					hardDistractors: [
						{ text: 'Sincere generousity, kindity, and solidness unite every neighbourhood.', diagnosticFeedback: 'أخطاء إملائية في الاشتقاق: الصواب generosity / kindness / solidarity.' },
						{ text: 'Sincere generous, kind, and solid unite every neighbourhood.', diagnosticFeedback: 'نحتاج أسماء (nouns) كفاعل لا صفات.' },
						{ text: 'Sincere generosity, kindness, and solidarity unites every neighbourhood.', diagnosticFeedback: 'الفاعل مركب جمع (ثلاث قيم) فيأخذ unite دون s.' }
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
					'Plan 3 clear paragraphs: Introduction (2 lines), Body (expand all notes with First/Moreover/Furthermore), Conclusion (2 lines).',
					'Keep word count around 80 to 120 words and proofread subject-verb agreement and spelling.',
					'Include Unit 3/4 structures naturally (Although, Unlike, Both...and, ought to, one another).'
				],
				solutionStepsAr: [
					'Introduction: Present the main theme (space science benefits OR community solidarity).',
					'Body: Turn every note into a full, linked sentence with a concrete example.',
					'Conclusion: Close with a strong takeaway linking science or solidarity to human benefit.'
				],
				finalAnswer: qMap.ans
			};
		}
	}
];
