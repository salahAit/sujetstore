import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../modules/EnglishTemplates/english-helpers';
import type { OfficialEnglishBacPaperSpec } from './types';

function buildLeMetadata(year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3rd Year Secondary School (3AS / BAC)',
		streamId: 'LE',
		streamName: 'Foreign Languages',
		subjectId: 'ENG-SEC',
		subjectName: 'English Language',
		trimesterId: 't3',
		trimesterName: 'Baccalaureate Practice Session',
		docType: 'exam',
		academicYear: year,
		duration: '03 Hours 30 Min',
		coefficient: 5,
		examSessionAr: 'June ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Baccalaureate Practice Examination — English Language',
		siteUrl: 'https://sujetstore.com'
	};
}

function makeLePaper(opts: {
	academicYear: '2023' | '2024' | '2025';
	unitThemeEn: string;
	titleTopicEn: string;
	titleTopicAr: string;
	themesEn: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}): OfficialEnglishBacPaperSpec {
	const examDoc: ExamDocument = {
		metadata: buildLeMetadata(opts.academicYear),
		exercises: opts.exercises
	};
	return {
		slug: `bac-${opts.academicYear}-3as-le-english`,
		grade: '3as_le',
		yearSubjectId: 789,
		subjectId: 'ENG-SEC',
		streamId: 'LE',
		streamNameAr: 'لغات أجنبية',
		streamNameEn: 'Foreign Languages',
		academicYear: opts.academicYear,
		sessionEn: `June ${opts.academicYear}`,
		sessionAr: `دورة جوان ${opts.academicYear}`,
		coefficient: 5,
		duration: '03 Hours 30 Min',
		pointsSplit: [7, 7, 6] as const,
		unitThemeEn: opts.unitThemeEn,
		titleEn: `BAC Practice Examination in English — Foreign Languages (${opts.academicYear}: ${opts.titleTopicEn})`,
		titleAr: `موضوع بكالوريا تدريبي في اللغة الإنجليزية — شعبة لغات أجنبية (دورة جوان ${opts.academicYear} — ${opts.titleTopicAr})`,
		themesEn: opts.themesEn,
		themesAr: opts.themesAr,
		templateId: 'english/bac_official',
		examDoc
	};
}

export const OFFICIAL_BAC_ENGLISH_LE_PAPERS: OfficialEnglishBacPaperSpec[] = [
	makeLePaper({
		academicYear: '2023',
		unitThemeEn: 'Exploring the Past',
		titleTopicEn: 'Cultural and Scientific Preservation in Tassili n-Ajjer, Timgad and Andalusian Libraries',
		titleTopicAr: 'صون التراث الثقافي والعلمي في الطاسيلي وتيمقاد ومكتبات الأندلس',
		themesEn: ['Exploring the Past', 'Tassili n-Ajjer', 'Timgad', 'Andalusian Libraries'],
		themesAr: ['استكشاف الماضي', 'طاسيلي ناجر', 'تيمقاد', 'مكتبات الأندلس'],
		exercises: [
			{
				id: 'le_2023_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Safeguarding Memory: From Stone Heritage to Historic Libraries',
						paragraphs: [
							'Across North Africa and the western Mediterranean, remarkable traces of human memory survive in stone plateaus, planned ancient towns, and centuries-old libraries. In south-eastern Algeria, the Tassili n-Ajjer plateau stands as an extraordinary open-air archive. Its sandstone shelters preserve thousands of ancient rock engravings and paintings illustrating pastoral herds, flowing Saharan rivers, and extinct wildlife, offering invaluable evidence of how the Sahara climate shifted over millennia.',
							'Further north in the Aures region near Batna, the archaeological city of Timgad reveals the precision of classical urban engineering. Built along an orderly grid of paved avenues, water channels, public granaries, and a renowned ancient public library, [[it]] demonstrates how earlier Mediterranean communities organized civic life, literacy, and water management in semi-arid landscapes.',
							'Later, during the golden centuries of Islamic Andalusia, the preservation of human knowledge reached unprecedented heights. Libraries in Cordoba housed hundreds of thousands of carefully bound volumes covering medicine, botany, mathematics, astronomy, and linguistics. Dedicated copyists, bookbinders, and multilingual translators worked tirelessly to record scientific treatises—such as the surgical encyclopedia of Al-Zahrawi and the geographical maps of Al-Idrisi—ensuring that [[their]] discoveries reached scholars across continents.',
							'Today, weathering, climate fluctuations, and neglect threaten both open-air archaeological sites and delicate paper archives. Modern conservationists now combine traditional restoration skills with high-resolution three-dimensional scanning and digital cataloguing. Protecting these cultural and scientific treasures allows every generation to study human history with clarity and respect.'
						],
						source: 'Adapted from Mediterranean Cultural Heritage Quarterly, SujetStore Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'treatises', meaning: 'formal, systematic written works on a scientific subject' },
							{ term: 'weathering', meaning: 'gradual wearing away of rock or stone by wind, heat, and rain' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the right answer to complete the statement. The text highlights:',
								options: [
									'the preservation of archaeological and written heritage across North Africa and Andalusia',
									'modern desert tourism hotels in southern Algeria',
									'how to manufacture paper using industrial machines'
								],
								correct: 'the preservation of archaeological and written heritage across North Africa and Andalusia',
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
								q: 'a) Rock engravings in Tassili n-Ajjer provide clues about past climate changes in the Sahara.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'b) Timgad was constructed randomly without paved avenues or water channels.',
								a: 'False',
								c: 'Timgad was built along an orderly grid of paved avenues, water channels, public granaries, and a public library.',
								mark: '0.5'
							},
							{
								q: 'c) Andalusian libraries in Cordoba preserved scientific books in fields such as medicine and astronomy.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'd) High-resolution scanning and digital cataloguing play no role in modern conservation.',
								a: 'False',
								c: 'Modern conservationists combine restoration skills with 3D scanning and digital cataloguing.',
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
						content: 'a) What scenes are depicted in the sandstone shelters of Tassili n-Ajjer?',
						answer: 'a) Pastoral herds, flowing Saharan rivers, and extinct wildlife.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) Which two Muslim scientists and works are cited in paragraph 3?',
						answer: 'b) Al-Zahrawi (his surgical encyclopedia) and Al-Idrisi (his geographical maps).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) What natural and human threats endanger historical monuments and archives today?',
						answer: 'c) Weathering, climate fluctuations, and neglect.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. In which paragraph does the author describe the work of copyists, bookbinders, and translators?',
						answer: 'Paragraph 3.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) it (paragraph 2) ............................',
						answer: 'a) it refers to the archaeological city of Timgad.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) their (paragraph 3) ............................',
						answer: 'b) their refers to Al-Zahrawi and Al-Idrisi (Andalusian Muslim scholars).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_2023_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 7,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are closest in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) extremely valuable (paragraph 1) = ............................',
						answer: 'a) invaluable',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) never matched before (paragraph 3) = ............................',
						answer: 'b) unprecedented',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) fragile (paragraph 4) = ............................',
						answer: 'c) delicate',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'translate' },
							noun: { value: 'translation', mark: '0.25' },
							adjective: { value: 'translatable', mark: '0.25' }
						},
						{
							verb: { value: 'restore', mark: '0.25' },
							noun: { given: true, value: 'restoration' },
							adjective: { value: 'restorative', mark: '0.25' }
						},
						{
							verb: { value: 'catalogue', mark: '0.25' },
							noun: { value: 'catalogue', mark: '0.25' },
							adjective: { given: true, value: 'catalogued' }
						}
					]),
					{
						type: 'text',
						content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
					},
					{
						type: 'text',
						content: '1a) Although harsh desert winds blew for thousands of years, the sandstone engravings of Tassili n-Ajjer survived.\n\n1b) Despite ..............................................................................................................',
						answer: '1b) Despite harsh desert winds blowing for thousands of years (or the blowing of harsh desert winds), the sandstone engravings of Tassili n-Ajjer survived.',
						mark: '1'
					},
					{
						type: 'text',
						content: '2a) Andalusian copyists preserved rare scientific manuscripts in organized libraries.\n\n2b) Rare scientific manuscripts ................................................................................',
						answer: '2b) Rare scientific manuscripts were preserved by Andalusian copyists in organized libraries.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Classify the following words according to the pronunciation of their final "ed": reached, published, preserved, recorded.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/t/', words: ['reached', 'published'], mark: '0.5' },
							{ header: '/d/', words: ['preserved'], mark: '0.25' },
							{ header: '/id/', words: ['recorded'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '5. Fill in the gaps with ONLY FOUR words from the list: manuscripts - translators - erosion - digital - modern - mountains.\nHistoric libraries played a decisive role in safeguarding scientific ....(1).... for humanity. Skilled ....(2).... rendered medical and astronomical books into multiple languages so knowledge could travel peacefully across borders. Today, specialists protect ancient stone cities from ....(3).... while creating open ....(4).... archives for students everywhere.',
						answer: '(1) manuscripts (0.25)   |   (2) translators (0.25)   |   (3) erosion (0.25)   |   (4) digital (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'le_2023_wr',
				customTitle: 'Part Two: Written Expression',
				points: 6,
				instruction: 'Write a well-structured essay of about 100 to 150 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'You are writing a feature article for an international cultural magazine introducing Algerian world-heritage treasures such as Tassili n-Ajjer and Timgad, and explaining how modern technology helps protect them.',
						topicOneNotes: [
							'Highlight the historical and scientific value of Tassili n-Ajjer rock art and Timgad urban heritage.',
							'Explain environmental and human risks such as sand erosion, climate shifts, and vandalism.',
							'Show how 3D scanning, satellite monitoring, and digital libraries preserve sites safely.',
							'Call for responsible educational tourism and stronger local community involvement.'
						],
						topicTwoPrompt:
							'Libraries and multilingual translation have always built bridges between civilizations. Write an essay discussing why preserving books and promoting accurate translation remain vital in the twenty-first century.',
						rubricSummary:
							'Relevance: 1.5 pts | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary range: 1.5 pts',
						modelAnswer:
							'Algeria is home to remarkable world-heritage treasures that bridge prehistoric memory and classical urban history. In the deep south, the Tassili n-Ajjer plateau preserves thousands of sandstone engravings documenting ancient Saharan rivers and wildlife, while Timgad in the Aures showcases disciplined stone architecture, paved streets, and a historic public library. However, both sites face relentless threats from desert winds, temperature extremes, and careless human activity. Fortunately, modern conservation technology offers powerful solutions. Archaeologists now rely on high-resolution 3D laser scanning, satellite monitoring, and digital archives to record every detail before erosion causes irreversible loss. Alongside technology, promoting responsible educational tourism and involving local communities as guardians of heritage are equally crucial. By uniting scientific conservation with public awareness, Algeria ensures that its rich cultural legacy endures for generations worldwide.',
						mark: '6'
					})
				]
			}
		]
	}),
	makeLePaper({
		academicYear: '2024',
		unitThemeEn: 'Ill-Gotten Gains Never Prosper',
		titleTopicEn: 'Intellectual Property, Anti-Fraud and Transparency',
		titleTopicAr: 'الملكية الفكرية ومحاربة الاحتيال والشفافية الأكاديمية',
		themesEn: ['Ill-Gotten Gains Never Prosper', 'Intellectual Property', 'Anti-Fraud', 'Academic Integrity'],
		themesAr: ['الكسب غير المشروع', 'الملكية الفكرية', 'محاربة التزوير والغش', 'الأمانة العلمية'],
		exercises: [
			{
				id: 'le_2024_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Defending Intellectual Property and Academic Integrity in the Digital Age',
						paragraphs: [
							'In an interconnected digital economy, knowledge, original writing, and software code are among the most valuable creations a society produces. Yet the rapid growth of online networks has made intellectual theft alarmingly easy. Software piracy, unauthorized copying of textbooks, and academic plagiarism rob authors, researchers, and engineers of fair recognition and rightful earnings.',
							"Academic fraud extends even further when dishonest individuals purchase fabricated essays or forge university diplomas. When unqualified candidates enter sensitive professions such as medicine, engineering, or teaching using fraudulent credentials, public safety is directly compromised. Moreover, copying another scholar's words without attribution violates the long-standing Islamic and academic principle of honesty in attributing knowledge to [[its]] rightful author.",
							'To counter these abuses, universities and publishers are adopting transparent verification systems. Secure digital certificates, open-access citation databases, and specialized plagiarism-detection software help institutions verify authenticity quickly. Governments also enact intellectual property laws that grant creators fair patents and copyrights while encouraging affordable legal access to educational books for students.',
							'Nevertheless, enforcement tools work best when reinforced by strong personal ethics. Students who cite sources faithfully, write [[their]] own research papers, and pay for licensed work develop genuine competence and self-respect. True achievement can never be stolen; it is earned patiently through effort, curiosity, and integrity.'
						],
						source: 'Adapted from Digital Ethics and Academic Standards Review, SujetStore Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'plagiarism', meaning: "copying another person's ideas or words and presenting them as one's own" },
							{ term: 'attribution', meaning: 'giving proper credit to the original author of a work' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: "1. Choose the right answer to complete the statement. The author's primary purpose is to:",
								options: [
									'defend intellectual honesty and explain ways to curb digital and academic fraud',
									'encourage students to download unlicensed textbooks online',
									'argue against using digital certificates in universities'
								],
								correct: 'defend intellectual honesty and explain ways to curb digital and academic fraud',
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
								q: 'a) Software piracy and unauthorized copying harm authors and engineers financially and morally.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'b) Forged diplomas in medicine or engineering have no effect on public safety.',
								a: 'False',
								c: 'When unqualified candidates enter sensitive professions using fraudulent credentials, public safety is directly compromised.',
								mark: '0.5'
							},
							{
								q: 'c) Secure digital certificates and plagiarism-detection software help verify academic authenticity.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'd) According to paragraph 4, legal enforcement alone is completely sufficient without personal ethics.',
								a: 'False',
								c: 'Enforcement tools work best when reinforced by strong personal ethics.',
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
						content: 'a) Give two examples of intellectual theft mentioned in the first paragraph.',
						answer: 'a) Software piracy, unauthorized copying of textbooks, and academic plagiarism (any two).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) What ethical principle does plagiarism violate according to paragraph 2?',
						answer: 'b) It violates the long-standing Islamic and academic principle of honesty in attributing knowledge to its rightful author.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) How do governments balance protecting creators with supporting students according to paragraph 3?',
						answer: 'c) By enacting intellectual property laws (patents and copyrights) while encouraging affordable legal access to educational books for students.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. In which paragraph is it mentioned that genuine competence grows when students write their own work and cite sources honestly?',
						answer: 'Paragraph 4.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) its (paragraph 2) ............................',
						answer: 'a) its refers to knowledge.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) their (paragraph 4) ............................',
						answer: 'b) their refers to students.',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_2024_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 7,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are opposite in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) authorized / permitted (paragraph 1) = ............................',
						answer: 'a) unauthorized',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) genuine / authentic (paragraph 2) = ............................',
						answer: 'b) fabricated (or fraudulent)',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) expensive / unaffordable (paragraph 3) = ............................',
						answer: 'c) affordable',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'verify' },
							noun: { value: 'verification', mark: '0.25' },
							adjective: { value: 'verifiable', mark: '0.25' }
						},
						{
							verb: { value: 'innovate', mark: '0.25' },
							noun: { given: true, value: 'innovation' },
							adjective: { value: 'innovative', mark: '0.25' }
						},
						{
							verb: { value: 'create', mark: '0.25' },
							noun: { value: 'creation', mark: '0.25' },
							adjective: { given: true, value: 'creative' }
						}
					]),
					{
						type: 'text',
						content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
					},
					{
						type: 'text',
						content: '1a) Authors will continue publishing quality books if society respects copyright laws.\n\n1b) As long as ........................................................................................................',
						answer: '1b) As long as society respects copyright laws, authors will continue publishing quality books.',
						mark: '1'
					},
					{
						type: 'text',
						content: '2a) Universities ought to verify every academic certificate through secure digital databases.\n\n2b) Every academic certificate .................................................................................',
						answer: '2b) Every academic certificate ought to be verified by universities through secure digital databases.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Classify the following words according to the pronunciation of their final "s": pirates, patents, authors, licenses.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '/s/', words: ['pirates', 'patents'], mark: '0.5' },
							{ header: '/z/', words: ['authors'], mark: '0.25' },
							{ header: '/iz/', words: ['licenses'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '5. Reorder the following sentences to get a coherent paragraph.\n\na) Consequently, honest attribution encourages researchers to share original discoveries with confidence.\n\nb) Plagiarism is not a minor technical mistake; it is a serious form of intellectual theft.\n\nc) Whenever writers copy paragraphs without naming the source, they deceive both readers and teachers.\n\nd) To prevent this misconduct, schools must teach proper citation rules from an early stage.',
						answer: 'Correct order: 1-b (0.25) , 2-c (0.25) , 3-d (0.25) , 4-a (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'le_2024_wr',
				customTitle: 'Part Two: Written Expression',
				points: 6,
				instruction: 'Write a well-structured essay of about 100 to 150 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'Some students copy essays from the internet or use pirated educational software without realizing the consequences. Write a persuasive essay for your school newsletter explaining why intellectual honesty matters and how schools can promote it.',
						topicOneNotes: [
							"Explain how plagiarism and piracy harm authors, programmers, and learners' own skills.",
							'Highlight the moral duty of giving proper credit to original thinkers and sources.',
							'Recommend teaching citation methods, original note-taking, and fair digital licensing.',
							'Encourage universities and schools to reward authentic effort and critical thinking.'
						],
						topicTwoPrompt:
							'Transparency and verifiable credentials are essential for trustworthy professions. Write an essay discussing the dangers of exam cheating and forged qualifications for society.',
						rubricSummary:
							'Relevance: 1.5 pts | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary range: 1.5 pts',
						modelAnswer:
							'In an age of instant digital copying, defending intellectual honesty has become an urgent priority for every school and university. First, plagiarism and software piracy are never victimless habits: they deprive authors, teachers, and developers of the rightful reward for years of painstaking work. Even worse, students who copy online essays cheat themselves out of developing writing fluency, independent analysis, and real confidence. In both scholarly tradition and Islamic ethics, attributing knowledge faithfully to its original source is a mark of true integrity. Schools can strengthen this culture by teaching clear citation skills, assigning thoughtful research projects, and offering affordable legal access to digital libraries. Ultimately, authentic effort takes patience, yet it is the only path to lasting competence and genuine pride.',
						mark: '6'
					})
				]
			}
		]
	}),
	makeLePaper({
		academicYear: '2025',
		unitThemeEn: 'Schools: Different and Alike',
		titleTopicEn: 'Global Education Challenges, Equal Opportunity and Moral Character Building',
		titleTopicAr: 'تحديات التعليم العالمية وتكافؤ الفرص وبناء الشخصية الأخلاقية',
		themesEn: ['Schools: Different and Alike', 'Equal Opportunity', 'Global Education', 'Character Building'],
		themesAr: ['المدارس والأنظمة التعليمية', 'تكافؤ الفرص التعليمية', 'تحديات التعليم العالمية', 'التربية الأخلاقية'],
		exercises: [
			{
				id: 'le_2025_comp',
				customTitle: 'Part One: Reading — A/ Comprehension',
				points: 7,
				instruction: 'Read the text carefully then do the activities below.',
				content: [
					buildEnglishPassageBlock({
						title: 'Bridging the Gap: Equitable Schooling and Character Formation',
						paragraphs: [
							'Across the globe, nations recognize quality education as the primary engine of social mobility and peaceful development. While educational structures vary considerably—from early vocational pathways in parts of Europe to unified national curricula in Algeria and East Asia—every system confronts similar challenges: overcrowded classrooms, unequal access between rural and urban areas, and rapid technological transformation.',
							'Closing the opportunity gap begins with investing where needs are greatest. In many remote villages worldwide, students still walk long distances to reach schools that lack science laboratories, heating, or reliable library collections. Targeted scholarships, safe school transport, continuous teacher training, and well-maintained rural campuses have proved that when disadvantaged learners receive fair resources, [[they]] match or exceed the achievements of urban peers.',
							'Digital learning platforms can also extend educational equity by bringing structured lessons, interactive exercises, and language practice to homes far from major cities. However, international education reports caution that screens alone cannot solve deep learning gaps. Without guidance from compassionate teachers and supportive families, digital tools risk widening disparities rather than narrowing [[them]].',
							'Equally vital is what schools cultivate beyond examination grades. Education achieves its noblest purpose when academic mastery is accompanied by discipline, humility, truthfulness, and service to the community. Schools that unite equal opportunity with strong moral character prepare graduates who do not merely compete for personal success, but actively uplift society.'
						],
						source: 'Adapted from Comparative Education and Youth Development Monograph, SujetStore Edition',
						numberedParagraphs: true,
						glossary: [
							{ term: 'social mobility', meaning: 'the ability of individuals to improve their life prospects through learning and work' },
							{ term: 'disparities', meaning: 'unfair differences or inequalities between groups' }
						]
					}),
					{
						type: 'multiple_choice',
						groups: [
							{
								header: '1. Choose the right answer to complete the statement. The main theme of the text is:',
								options: [
									'replacing traditional classrooms with fully automated robots',
									'achieving equal educational opportunity and combining academics with character building',
									'why rural students should stop studying foreign languages'
								],
								correct: 'achieving equal educational opportunity and combining academics with character building',
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
								q: 'a) Overcrowded classrooms and rural-urban inequalities are shared challenges across many countries.',
								a: 'True',
								mark: '0.5'
							},
							{
								q: 'b) Rural learners cannot match urban students even when given fair educational resources.',
								a: 'False',
								c: 'When disadvantaged learners receive fair resources, they match or exceed the achievements of urban peers.',
								mark: '0.5'
							},
							{
								q: 'c) Digital platforms alone are guaranteed to eliminate every learning gap without teacher support.',
								a: 'False',
								c: 'Without guidance from compassionate teachers and supportive families, digital tools risk widening disparities.',
								mark: '0.5'
							},
							{
								q: 'd) According to paragraph 4, true education combines academic mastery with moral character.',
								a: 'True',
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
						content: 'a) Mention two measures cited in paragraph 2 that help close the educational gap in remote areas.',
						answer: 'a) Targeted scholarships, safe school transport, continuous teacher training, and well-maintained rural campuses (any two).',
						mark: '1'
					},
					{
						type: 'text',
						content: 'b) How can digital learning platforms support educational equity?',
						answer: 'b) By bringing structured lessons, interactive exercises, and language practice to homes far from major cities.',
						mark: '1'
					},
					{
						type: 'text',
						content: 'c) What four moral qualities should accompany academic mastery according to paragraph 4?',
						answer: 'c) Discipline, humility, truthfulness, and service to the community.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. In which paragraph does the author warn about the limits of relying exclusively on screens for learning?',
						answer: 'Paragraph 3.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '5. What or who do the underlined words refer to in the text?'
					},
					{
						type: 'text',
						content: 'a) they (paragraph 2) ............................',
						answer: 'a) they refers to disadvantaged learners.',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) them (paragraph 3) ............................',
						answer: 'b) them refers to disparities (deep learning gaps).',
						mark: '0.5'
					}
				]
			},
			{
				id: 'le_2025_exp',
				customTitle: 'Part One: Reading — B/ Text Exploration',
				points: 7,
				instruction: 'Do the following language, phonology, and discourse tasks carefully.',
				content: [
					{
						type: 'text',
						content: '1. Find in the text words or phrases that are closest in meaning to the following:'
					},
					{
						type: 'text',
						content: 'a) faces / deals with (paragraph 1) = ............................',
						answer: 'a) confronts',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'b) distant / isolated (paragraph 2) = ............................',
						answer: 'b) remote',
						mark: '0.5'
					},
					{
						type: 'text',
						content: 'c) warn (paragraph 3) = ............................',
						answer: 'c) caution',
						mark: '0.5'
					},
					{
						type: 'text',
						content: '2. Complete the following chart with the missing verb, noun, or adjective.'
					},
					buildEnglishWordBuildingTableBlock([
						{
							verb: { given: true, value: 'equalize' },
							noun: { value: 'equality', mark: '0.25' },
							adjective: { value: 'equal', mark: '0.25' }
						},
						{
							verb: { value: 'qualify', mark: '0.25' },
							noun: { given: true, value: 'qualification' },
							adjective: { value: 'qualified', mark: '0.25' }
						},
						{
							verb: { value: 'cooperate', mark: '0.25' },
							noun: { value: 'cooperation', mark: '0.25' },
							adjective: { given: true, value: 'cooperative' }
						}
					]),
					{
						type: 'text',
						content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
					},
					{
						type: 'text',
						content: '1a) If rural schools do not receive skilled teachers and library books, educational disparities will persist.\n\n1b) Unless ..............................................................................................................',
						answer: '1b) Unless rural schools receive skilled teachers and library books, educational disparities will persist.',
						mark: '1'
					},
					{
						type: 'text',
						content: '2a) Many rural students wish they had faster access to modern science laboratories.\n\n2b) It is a pity that ................................................................................................',
						answer: '2b) It is a pity that many rural students do not have faster access to modern science laboratories.',
						mark: '1'
					},
					{
						type: 'text',
						content: '4. Classify the following words according to their stressed syllable: discipline, equality, curriculum, opportunity.'
					},
					buildEnglishPhonologyTableBlock({
						columns: [
							{ header: '1st syllable', words: ['discipline'], mark: '0.25' },
							{ header: '2nd syllable', words: ['equality', 'curriculum'], mark: '0.5' },
							{ header: '3rd syllable', words: ['opportunity'], mark: '0.25' }
						]
					}),
					{
						type: 'text',
						content: '5. Fill in the gaps with ONLY FOUR words from the list: scholarships - character - classrooms - languages - factories - transport.\nEqual opportunity in education means ensuring that every child enjoys safe ....(1).... and well-equipped ....(2).... regardless of geography. Financial ....(3).... also help determined students pursue university studies without hardship. Above all, schools should nurture strong moral ....(4).... alongside academic excellence.',
						answer: '(1) transport (0.25)   |   (2) classrooms (0.25)   |   (3) scholarships (0.25)   |   (4) character (0.25)',
						mark: '1'
					}
				]
			},
			{
				id: 'le_2025_wr',
				customTitle: 'Part Two: Written Expression',
				points: 6,
				instruction: 'Write a well-structured essay of about 100 to 150 words on ONE of the following topics.',
				content: [
					buildEnglishWrittenExpressionBlock({
						topicOnePrompt:
							'Write an essay proposing practical solutions to guarantee equal educational opportunities for students in remote and rural regions while fostering strong moral character in schools.',
						topicOneNotes: [
							'Provide safe school buses, heated classrooms, science labs, and libraries in rural districts.',
							'Support dedicated teachers working in remote regions with ongoing training and fair incentives.',
							'Use structured online learning platforms to supplement—not replace—in-person teaching.',
							'Integrate values of honesty, discipline, humility, and community service into school life.'
						],
						topicTwoPrompt:
							'Compare two different ways of learning: studying through digital platforms at home versus attending a structured school classroom. Explain which model prepares students better for life and society.',
						rubricSummary:
							'Relevance: 1.5 pts | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary range: 1.5 pts',
						modelAnswer:
							"Ensuring equal educational opportunity across every region of a country is both a moral responsibility and a wise national investment. First, governments and local communities must equip rural schools with safe transport, comfortable classrooms, modern science laboratories, and rich libraries so geography never limits a student's potential. Second, supporting teachers in remote districts through continuous training and professional recognition ensures high instructional quality everywhere. In addition, structured digital platforms can provide valuable revision lessons and language practice, provided they complement compassionate classroom teachers rather than replacing them. Equally essential, schools must cultivate honesty, discipline, humility, and community service alongside academic excellence. When fairness in resources meets nobility of character, education transforms individual lives and strengthens the entire nation.",
						mark: '6'
					})
				]
			}
		]
	})
];
