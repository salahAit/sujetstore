import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../modules/EnglishTemplates/english-helpers';
import type { OfficialEnglishBacPaperSpec } from './types';

function buildLpMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3rd Year Secondary School (3AS / BAC)',
		streamId: 'LP',
		streamName: 'Literature & Philosophy',
		subjectId: 'ENG-SEC',
		subjectName: 'English Language',
		trimesterId: 't3',
		trimesterName: 'Baccalaureate Practice Session',
		docType: 'exam',
		academicYear: year,
		duration: '02 Hours 30 Min',
		coefficient: 3,
		examSessionAr: 'June ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Baccalaureate Practice Examination — English Language',
		siteUrl: 'https://sujetstore.com'
	};
}

function makeLpPaper(opts: {
	academicYear: '2023' | '2024' | '2025';
	unitThemeEn: string;
	titleTopicEn: string;
	titleTopicAr: string;
	themesEn: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}): OfficialEnglishBacPaperSpec {
	const examDoc: ExamDocument = {
		metadata: buildLpMetadata(opts.academicYear),
		exercises: opts.exercises
	};
	return {
		slug: `bac-${opts.academicYear}-3as-lp-english`,
		grade: '3as_lp',
		yearSubjectId: 770,
		subjectId: 'ENG-SEC',
		streamId: 'LP',
		streamNameAr: 'آداب وفلسفة',
		streamNameEn: 'Literature & Philosophy',
		academicYear: opts.academicYear,
		sessionEn: `June ${opts.academicYear}`,
		sessionAr: `دورة جوان ${opts.academicYear}`,
		coefficient: 3,
		duration: '02 Hours 30 Min',
		pointsSplit: [7, 8, 5] as const,
		unitThemeEn: opts.unitThemeEn,
		titleEn: `BAC Practice Examination in English — Literature & Philosophy (${opts.academicYear}: ${opts.titleTopicEn})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الإنجليزية — شعبة آداب وفلسفة (دورة جوان ${opts.academicYear} — ${opts.titleTopicAr})`,
		themesEn: opts.themesEn,
		themesAr: opts.themesAr,
		templateId: 'english/bac_official',
		examDoc
	};
}

export const OFFICIAL_BAC_ENGLISH_LP_PAPERS: OfficialEnglishBacPaperSpec[] = [
	makeLpPaper({
		academicYear: '2023',
		unitThemeEn: 'Exploring the Past',
		titleTopicEn: 'The Legacy of Islamic Civilization and Algerian Heritage',
		titleTopicAr: 'إرث الحضارة الإسلامية والتراث الجزائري',
		themesEn: ['Exploring the Past', 'Islamic Civilization', 'Algerian Heritage', 'Ibn Khaldun'],
		themesAr: ['استكشاف الماضي', 'الحضارة الإسلامية', 'تلمسان والتراث الجزائري', 'ابن خلدون وفاطمة الفهرية'],
		exercises: [
			{
				id: 'lp_2023_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Centres of Learning in Islamic Civilization and North Africa',
						paragraphs: [
							'Throughout the classical era of Islamic civilization, North African cities flourished as vibrant centres of scholarship, architecture, and moral refinement. In western Algeria, Tlemcen earned renown for its Great Mosque, madrasas, and rich libraries where jurists, grammarians, and mathematicians taught students from across the Maghreb and Andalusia. [[It]] became a lasting bridge of knowledge between the Mediterranean coast and the Sahara.',
							'This intellectual tradition owed much to visionary endowments and disciplined scholars. In the ninth century, Fatima al-Fihri dedicated her inheritance to establish Al-Qarawiyyin in Fez, an enduring institution of higher learning that attracted eager seekers of knowledge for centuries. Later, Abdurrahman Ibn Khaldun spent peaceful years at Qalaat Ibn Salama near Tiaret in Algeria, where he composed his celebrated Muqaddimah. In that pioneering work, [[he]] analyzed the social, economic, and ethical factors behind the rise and decline of civilizations.',
							'Studying this shared heritage offers far more than admiration for historic stone arches or ancient manuscripts. It reminds contemporary generations that civilizations prosper when societies invest in useful knowledge, uphold justice, and preserve ethical responsibility. Protecting historic landmarks and digitizing old manuscripts ensure that these timeless lessons continue inspiring young learners today.'
						],
						source: 'Adapted from North African Historical Studies, SujetStore Educational Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'endowments', meaning: 'charitable funds dedicated to public learning and welfare' },
							{ term: 'manuscripts', meaning: 'historic books or documents written by hand' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the general idea of the text.',
								options: [
									'Ancient sea trade routes across the Atlantic Ocean',
									'The scholarly and historical legacy of Islamic civilization in North Africa',
									'Modern urban construction projects in capital cities'
								],
								correct: 'The scholarly and historical legacy of Islamic civilization in North Africa',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '2. Are the following statements True or False? Write True or False next to each sentence and correct the false ones.'
					},
					{
						type: 'true_false',
						items: [
							{
								q: 'a) Tlemcen was known for its madrasas, libraries, and Great Mosque.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'b) Fatima al-Fihri built Al-Qarawiyyin using money borrowed from foreign banks.',
								a: 'False',
								c: 'She dedicated her own inheritance to establish Al-Qarawiyyin.',
								mark: '0.5'
							},
							{
								q: 'c) Ibn Khaldun wrote his Muqaddimah at Qalaat Ibn Salama in Algeria.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'd) According to paragraph 3, civilizations flourish solely through military force.',
								a: 'False',
								c: 'Civilizations prosper when societies invest in useful knowledge, uphold justice, and preserve ethical responsibility.',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '3. Answer the following questions according to the text.'
					},
					{
						type: 'text',
						content: 'a) Who studied and taught in the institutions of classical Tlemcen?',
						answer: 'a) Jurists, grammarians, mathematicians, and students from across the Maghreb and Andalusia.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) What subject did Ibn Khaldun examine in his Muqaddimah?',
						answer: 'b) He analyzed the social, economic, and ethical factors behind the rise and decline of civilizations.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) How can contemporary societies preserve historical lessons for future generations?',
						answer: 'c) By protecting historic landmarks and digitizing old manuscripts.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. In which paragraph is it mentioned that a charitable personal legacy founded a famous centre of higher education?',
						answer: 'Paragraph 2.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) It (paragraph 1) ............................',
						answer: 'a) It refers to Tlemcen.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) he (paragraph 2) ............................',
						answer: 'b) he refers to Abdurrahman Ibn Khaldun.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_2023_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 8,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are closest in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) fame (paragraph 1) = ............................',
						answer: 'a) renown',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) famous / well-known (paragraph 2) = ............................',
						answer: 'b) celebrated',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) succeed / thrive (paragraph 3) = ............................',
						answer: 'c) prosper',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'civilize' },
							noun: { value: 'civilization', mark: '0.25' },
							adjective: { value: 'civilized', mark: '0.25' }
						},
						{
							verb: { value: 'contribute', mark: '0.25' },
							noun: { given: true, value: 'contribution' },
							adjective: { value: 'contributory', mark: '0.25' }
						},
						{
							verb: { value: 'preserve', mark: '0.25' },
							noun: { value: 'preservation', mark: '0.25' },
							adjective: { given: true, value: 'preservative' }
						}
					]),
					{
						type: 'text',
						content: '3. Combine each pair of sentences using the connector between brackets. Make any necessary changes.'
					},
					{
						type: 'text',
						content: 'a) Ibn Khaldun observed many North African dynasties. He wrote the Muqaddimah at Qalaat Ibn Salama. (After)',
						answer: 'a) After Ibn Khaldun had observed many North African dynasties, he wrote the Muqaddimah at Qalaat Ibn Salama.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) Ancient scholars lacked modern printing presses. They preserved thousands of scientific manuscripts by hand. (Although)',
						answer: 'b) Although ancient scholars lacked modern printing presses, they preserved thousands of scientific manuscripts by hand.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Give the correct form of the verbs in brackets.'
					},
					{
						type: 'text',
						content: 'a) Scholars in classical Tlemcen used to (travel) ............................ long distances to study rare manuscripts.',
						answer: 'a) travel',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) Before Fatima al-Fihri founded Al-Qarawiyyin, her family (migrate) ............................ from Kairouan to Fez.',
						answer: 'b) had migrated',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. Classify the following words according to the pronunciation of their final "ed": established, developed, preserved, founded.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/t/', words: ['established', 'developed'], mark: '0.5' },
							{ header: '/d/', words: ['preserved'], mark: '0.25' },
							{ header: '/id/', words: ['founded'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '6. Fill in the gaps with ONLY FOUR words from the list: heritage - libraries - justice - ruins - generations - desert.\nHistoric cities such as Tlemcen built impressive ....(1).... where knowledge was shared freely. Whenever leaders upheld ....(2).... and supported education, science and craftsmanship flourished. Today, safeguarding our architectural ....(3).... helps younger ....(4).... understand their identity with pride.',
						answer: '(1) libraries (0.25)   |   (2) justice (0.25)   |   (3) heritage (0.25)   |   (4) generations (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_2023_wr',
				customTitle: 'Part Two: Written Expression',
				points: 5,
				instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'Historic sites and ancient manuscripts in Algeria face erosion and neglect. Write an essay explaining why preserving our historical heritage matters and suggesting practical measures to protect it.',
						topicOneNotes: [
							'Historic monuments and manuscripts reflect national identity and scholarly achievements.',
							'Restore historic mosques, forts, and libraries using qualified specialists.',
							'Digitize fragile manuscripts so students and researchers can access them safely.',
							'Organize educational visits for pupils to build awareness and respect for heritage.'
						],
						topicTwoPrompt:
							'What makes a civilization rise and endure over time? Write an essay explaining the role of education, justice, and moral values in sustaining human societies.',
						rubricSummary:
							'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
						modelAnswer:
							"Preserving Algeria's historical and Islamic heritage is a vital duty toward both past and future generations. Historic monuments such as the Great Mosque of Tlemcen, Beni Hammad Fort, and ancient manuscript collections bear witness to centuries of scholarship, craftsmanship, and identity. To safeguard these treasures from erosion and neglect, authorities should fund regular restoration led by skilled historians and architects. Equally important, universities and national libraries must digitize fragile manuscripts so researchers worldwide can study them without damaging the originals. Finally, schools ought to organize guided heritage visits to teach young citizens respect for their history. Protecting our past enriches our cultural pride and inspires future progress.",
						mark: '5'
					})
				]
			}
		]
	}),
	makeLpPaper({
		academicYear: '2024',
		unitThemeEn: 'Ill-Gotten Gains Never Prosper',
		titleTopicEn: 'Combating Bribery and Upholding Ethical Governance',
		titleTopicAr: 'محاربة الرشوة وترسيخ النزاهة والحوكمة الأخلاقية',
		themesEn: ['Ill-Gotten Gains Never Prosper', 'Anti-Bribery', 'Ethical Governance', 'Transparency'],
		themesAr: ['الكسب غير المشروع لا يثمر', 'محاربة الرشوة', 'النزاهة والشفافية', 'الأمانة الوظيفية'],
		exercises: [
			{
				id: 'lp_2024_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Transparency and Accountability: Pillars of a Just Society',
						paragraphs: [
							'Corruption in public and private administration—whether through bribery, embezzlement, or nepotism—quietly drains the vitality of any nation. When public contracts are awarded to unqualified firms in exchange for secret payments, roads crumble prematurely, hospitals lack essential equipment, and honest professionals lose faith in fairness. Such ill-gotten gains may offer temporary wealth to a few individuals, yet [[they]] inflict lasting hardship on ordinary citizens.',
							'Experience across the world shows that laws alone are insufficient unless supported by transparent institutions and active civic oversight. Digital procurement portals, independent auditing offices, and merit-based recruitment reduce opportunities for hidden favouritism. When budgets and public tenders are published openly, responsible officials can be held accountable and wasteful spending is swiftly exposed.',
							'Ultimately, however, the strongest barrier against bribery lies inside the human conscience. In Islamic ethics and sound civic culture alike, public office is viewed as a sacred trust rather than a personal privilege. Teaching young people honesty, contentment with lawful earnings, and courage to refuse dishonest shortcuts prepares honest leaders who serve [[their]] communities with dignity.'
						],
						source: 'Adapted from Public Integrity and Governance Review, SujetStore Educational Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'embezzlement', meaning: "theft or misuse of funds placed in one's trust" },
							{ term: 'nepotism', meaning: 'unfairly giving jobs or favours to relatives or friends' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the best title for the text.',
								options: [
									'How to design highways and bridges',
									'Fighting corruption through transparency and moral conscience',
									'The history of paper money in global trade'
								],
								correct: 'Fighting corruption through transparency and moral conscience',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '2. Are the following statements True or False? Write True or False next to each sentence and correct the false ones.'
					},
					{
						type: 'true_false',
						items: [
							{
								q: 'a) Bribery in public contracts harms infrastructure and public services.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'b) Written laws by themselves are always enough to stop corruption.',
								a: 'False',
								c: 'Laws alone are insufficient unless supported by transparent institutions and active civic oversight.',
								mark: '0.5'
							},
							{
								q: 'c) Merit-based recruitment and independent auditing help reduce favouritism.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'd) According to paragraph 3, public office should be treated as a personal privilege.',
								a: 'False',
								c: 'Public office is viewed as a sacred trust rather than a personal privilege.',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '3. Answer the following questions according to the text.'
					},
					{
						type: 'text',
						content: 'a) Mention two negative consequences of awarding public contracts through secret payments.',
						answer: 'a) Roads crumble prematurely, hospitals lack essential equipment, and honest professionals lose faith in fairness (any two).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) How do digital procurement portals and open budgets improve governance?',
						answer: 'b) They reduce hidden favouritism, hold officials accountable, and expose wasteful spending swiftly.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) What values should be instilled in young people to prevent bribery in the future?',
						answer: 'c) Honesty, contentment with lawful earnings, and the courage to refuse dishonest shortcuts.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. In which paragraph does the author explain the role of inner moral conscience in fighting bribery?',
						answer: 'Paragraph 3.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) they (paragraph 1) ............................',
						answer: 'a) they refers to ill-gotten gains.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) their (paragraph 3) ............................',
						answer: 'b) their refers to honest leaders.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_2024_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 8,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are opposite in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) permanent / lasting (paragraph 1) = ............................',
						answer: 'a) temporary',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) secretly (paragraph 2) = ............................',
						answer: 'b) openly',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) unlawful / illegal (paragraph 3) = ............................',
						answer: 'c) lawful',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'govern' },
							noun: { value: 'governance', mark: '0.25' },
							adjective: { value: 'governmental', mark: '0.25' }
						},
						{
							verb: { value: 'employ', mark: '0.25' },
							noun: { given: true, value: 'employment' },
							adjective: { value: 'employable', mark: '0.25' }
						},
						{
							verb: { value: 'account', mark: '0.25' },
							noun: { value: 'accountability', mark: '0.25' },
							adjective: { given: true, value: 'accountable' }
						}
					]),
					{
						type: 'text',
						content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
					},
					{
						type: 'text',
						content: '1a) Corruption is very destructive; therefore, every citizen must reject it.\n\n1b) Corruption is so ................................................................................................',
						answer: '1b) Corruption is so destructive that every citizen must reject it.',
						mark: '1'
					},
					{
						type: 'text',
						content: '2a) I regret that some employees accept bribes to speed up paperwork.\n\n2b) I wish ................................................................................................................',
						answer: '2b) I wish some employees did not accept bribes to speed up paperwork.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Give the correct form of the verbs in brackets.'
					},
					{
						type: 'text',
						content: 'a) Provided that institutions (apply) ............................ transparent auditing, public funds will be protected.',
						answer: 'a) apply',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) It is high time dishonest officials (face) ............................ strict legal accountability.',
						answer: 'b) faced',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. Classify the following words according to the pronunciation of their final "s": ethics, rights, laws, practices.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/s/', words: ['ethics', 'rights'], mark: '0.5' },
							{ header: '/z/', words: ['laws'], mark: '0.25' },
							{ header: '/iz/', words: ['practices'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '6. Reorder the following sentences to get a coherent paragraph.\n\na) In addition, independent inspectors should audit public budgets every year.\n\nb) Eradicating bribery is essential for building public trust in national institutions.\n\nc) As a result, qualified citizens feel encouraged to work hard and serve their country honestly.\n\nd) To achieve this goal, administrations must publish job vacancies and contracts transparently.',
						answer: 'Correct order: 1-b (0.25) , 2-d (0.25) , 3-a (0.25) , 4-c (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_2024_wr',
				customTitle: 'Part Two: Written Expression',
				points: 5,
				instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'You have been invited to address a youth forum on civic integrity. Write a short speech explaining how young citizens and public institutions can work together to eradicate bribery and favouritism.',
						topicOneNotes: [
							'Refuse to offer or accept bribes in daily administrative procedures.',
							'Support digital public services that eliminate hidden intermediaries.',
							'Promote meritocracy in schools, universities, and recruitment.',
							'Uphold Islamic and moral accountability by treating public duty as a trust.'
						],
						topicTwoPrompt:
							'Ill-gotten gains never bring true prosperity to an individual or a nation. Write an essay defending this statement with concrete examples from daily life.',
						rubricSummary:
							'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
						modelAnswer:
							'Dear fellow citizens, building a just and prosperous society begins with our shared refusal to tolerate bribery and favouritism. First, public administrations must modernize services through transparent digital portals so every procedure is tracked openly and fairly. Second, recruitment in schools, companies, and offices must follow strict merit so competence replaces personal connections. Equally important, each of us bears a personal moral responsibility: we must refuse dishonest shortcuts and treat every public office as a sacred trust. When transparent laws work hand in hand with sincere conscience, unlawful earnings vanish, honest workers thrive, and our entire community moves forward in dignity.',
						mark: '5'
					})
				]
			}
		]
	}),
	makeLpPaper({
		academicYear: '2025',
		unitThemeEn: 'Schools: Different and Alike',
		titleTopicEn: 'Education, Reform and the Legacy of Imam Abdelhamid Ben Badis and Sheikh Mohamed Bachir El Ibrahimi',
		titleTopicAr: 'التربية والإصلاح وإرث الإمام عبد الحميد بن باديس والشيخ البشير الإبراهيمي',
		themesEn: ['Schools: Different and Alike', 'Education Reform', 'Ben Badis', 'El Ibrahimi'],
		themesAr: ['المدارس والأنظمة التعليمية', 'الإصلاح التربوي', 'الإمام عبد الحميد بن باديس', 'الشيخ البشير الإبراهيمي'],
		exercises: [
			{
				id: 'lp_2025_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Education as a Catalyst for Revival in Algeria',
						paragraphs: [
							'Although school systems across the world differ in curricula, schedules, and examination methods, they share one enduring mission: forming knowledgeable and responsible citizens. In Algeria, this educational vision has deep historical roots. During the difficult decades of colonial rule, when access to schooling for Algerian children was severely restricted, visionary reformers recognized that literacy and sound learning were the surest path to dignity and awakening.',
							'In 1931, Imam Abdelhamid Ben Badis, alongside Sheikh Mohamed Bachir El Ibrahimi and devoted scholars, founded the Association of Algerian Muslim Scholars. Despite scarce financial resources, [[they]] established hundreds of free schools in towns and villages across the country. Those classrooms taught classical Arabic, Islamic sciences, history, and modern subjects to both boys and girls, cultivating self-confidence, discipline, and national awareness.',
							'Today, Algerian secondary schools continue expanding scientific laboratories, foreign-language courses, and digital libraries to prepare youth for global challenges. Yet educators agree that technology cannot replace dedicated teachers or noble character. Just as the reformers of the past paired academic instruction with moral uprightness, modern schools succeed best when [[they]] nurture both sharp minds and principled hearts.'
						],
						source: 'Adapted from Essays on Algerian Educational History, SujetStore Educational Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'catalyst', meaning: 'a force that sparks positive change and progress' },
							{ term: 'uprightness', meaning: 'strong moral honesty and good character' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the right answer to complete the statement. The text is mainly about:',
								options: [
									'the role of reformist education in Algeria past and present',
									'comparing university tuition fees across Europe',
									'why digital devices should replace classroom teachers'
								],
								correct: 'the role of reformist education in Algeria past and present',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '2. Are the following statements True or False? Write True or False next to each sentence and correct the false ones.'
					},
					{
						type: 'true_false',
						items: [
							{
								q: 'a) All educational systems in the world follow identical schedules and examinations.',
								a: 'False',
								c: 'School systems across the world differ in curricula, schedules, and examination methods.',
								mark: '0.5'
							},
							{
								q: 'b) The Association of Algerian Muslim Scholars was founded in 1931.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'c) The free schools established by the Association welcomed both boys and girls.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'd) Modern educators believe digital technology makes classroom teachers unnecessary.',
								a: 'False',
								c: 'Educators agree that technology cannot replace dedicated teachers or noble character.',
								mark: '0.5'
							}
						]
					},
					{
						type: 'text',
						content: '3. Answer the following questions according to the text.'
					},
					{
						type: 'text',
						content: 'a) What common mission do different school systems around the world share?',
						answer: 'a) Forming knowledgeable and responsible citizens.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) Which subjects were taught in the free schools founded by Imam Ben Badis and Sheikh El Ibrahimi?',
						answer: 'b) Classical Arabic, Islamic sciences, history, and modern subjects.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) According to paragraph 3, when do modern schools achieve their greatest success?',
						answer: 'c) When they nurture both sharp minds and principled hearts (combining academic instruction with moral uprightness).',
						mark: '1'
					},
					{
						type: 'text',
						content: "4. In which paragraph is it mentioned that colonial restrictions limited Algerian children's access to schooling?",
						answer: 'Paragraph 1.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) they (paragraph 2) ............................',
						answer: 'a) they refers to Imam Abdelhamid Ben Badis, Sheikh Mohamed Bachir El Ibrahimi, and the scholars of the Association.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) they (paragraph 3) ............................',
						answer: 'b) they refers to modern schools.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'lp_2025_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 8,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are closest in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) limited / constrained (paragraph 1) = ............................',
						answer: 'a) restricted',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) limited / insufficient (paragraph 2) = ............................',
						answer: 'b) scarce',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) committed / devoted (paragraph 3) = ............................',
						answer: 'c) dedicated',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'educate' },
							noun: { value: 'education', mark: '0.25' },
							adjective: { value: 'educational', mark: '0.25' }
						},
						{
							verb: { value: 'reform', mark: '0.25' },
							noun: { given: true, value: 'reformation' },
							adjective: { value: 'reformist', mark: '0.25' }
						},
						{
							verb: { value: 'succeed', mark: '0.25' },
							noun: { value: 'success', mark: '0.25' },
							adjective: { given: true, value: 'successful' }
						}
					]),
					{
						type: 'text',
						content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
					},
					{
						type: 'text',
						content: '1a) If schools do not pair knowledge with good manners, education remains incomplete.\n\n1b) Unless ..............................................................................................................',
						answer: '1b) Unless schools pair knowledge with good manners, education remains incomplete.',
						mark: '1'
					},
					{
						type: 'text',
						content: '2a) Sheikh El Ibrahimi said, "True learning elevates both the mind and the character."\n\n2b) Sheikh El Ibrahimi said that ............................................................................',
						answer: '2b) Sheikh El Ibrahimi said that true learning elevates (or elevated) both the mind and the character.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Give the correct form of the verbs in brackets.'
					},
					{
						type: 'text',
						content: 'a) Many parents wish their children (read) ............................ more books in their free time.',
						answer: 'a) read',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) By 1954, the free schools (educate) ............................ tens of thousands of young Algerians.',
						answer: 'b) had educated',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. Classify the following words according to their stressed syllable: scholar, improve, society, education.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '1st syllable', words: ['scholar'], mark: '0.25' },
							{ header: '2nd syllable', words: ['improve', 'society'], mark: '0.5' },
							{ header: '3rd syllable', words: ['education'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '6. Fill in the gaps with ONLY FOUR words from the list: literacy - teachers - character - exams - classrooms - factories.\nDedicated ....(1).... have always stood at the heart of every successful educational reform. Inside welcoming ....(2)...., pupils not only achieve high ....(3).... and scientific competence, but also develop respectful ....(4).... that serves their families and nation.',
						answer: '(1) teachers (0.25)   |   (2) classrooms (0.25)   |   (3) literacy (0.25)   |   (4) character (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'lp_2025_wr',
				customTitle: 'Part Two: Written Expression',
				points: 5,
				instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'Write an article for your school yearbook explaining how modern secondary schools can improve student motivation and academic excellence while preserving noble moral values.',
						topicOneNotes: [
							'Combine active classroom learning with well-equipped laboratories and libraries.',
							'Encourage reading clubs, study groups, and respectful dialogue with teachers.',
							'Use digital platforms as helpful study tools rather than distractions.',
							'Draw inspiration from Algerian scholars who united knowledge with ethical character.'
						],
						topicTwoPrompt:
							'Some people think schools should focus exclusively on preparing students for exams, while others believe character building is equally important. Write an essay expressing your point of view.',
						rubricSummary:
							'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
						modelAnswer:
							'Building a thriving secondary school requires balancing modern academic tools with timeless ethical principles. First, classrooms become far more engaging when teachers combine clear lessons with hands-on laboratory experiments, library projects, and supportive peer study groups. Second, digital platforms should be guided wisely to help students revise complex concepts rather than distracting them from focused reading. Most importantly, true education cannot be measured by examination scores alone. Inspired by great Algerian educators such as Imam Ben Badis and Sheikh El Ibrahimi, schools must also nurture honesty, respect, discipline, and service to the community. When intellectual rigor meets noble character, students graduate ready to succeed and contribute meaningfully to society.',
						mark: '5'
					})
				]
			}
		]
	})
];
