import type { ExamDocument, ExamMetadata, ExerciseBlock } from '../../modules/SujetBuilder/types';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../modules/EnglishTemplates/english-helpers';
import type { OfficialEnglishBacPaperSpec } from './types';

interface SciStreamConfig {
	grade: '3as_se' | '3as_tm' | '3as_math' | '3as_ge';
	yearSubjectId: 686 | 728 | 706 | 751;
	streamId: 'SE' | 'TM' | 'MATH' | 'GE';
	streamNameAr: 'علوم تجريبية' | 'تقني رياضي' | 'رياضيات' | 'تسيير واقتصاد';
	streamNameEn:
		| 'Experimental Sciences'
		| 'Technical Mathematics'
		| 'Mathematics'
		| 'Management & Economics';
	slugTrack: '3as-se' | '3as-tm' | '3as-math' | '3as-ge';
}

const SCI_STREAMS: readonly SciStreamConfig[] = [
	{
		grade: '3as_se',
		yearSubjectId: 686,
		streamId: 'SE',
		streamNameAr: 'علوم تجريبية',
		streamNameEn: 'Experimental Sciences',
		slugTrack: '3as-se'
	},
	{
		grade: '3as_tm',
		yearSubjectId: 728,
		streamId: 'TM',
		streamNameAr: 'تقني رياضي',
		streamNameEn: 'Technical Mathematics',
		slugTrack: '3as-tm'
	},
	{
		grade: '3as_math',
		yearSubjectId: 706,
		streamId: 'MATH',
		streamNameAr: 'رياضيات',
		streamNameEn: 'Mathematics',
		slugTrack: '3as-math'
	},
	{
		grade: '3as_ge',
		yearSubjectId: 751,
		streamId: 'GE',
		streamNameAr: 'تسيير واقتصاد',
		streamNameEn: 'Management & Economics',
		slugTrack: '3as-ge'
	}
];

interface CanonicalSciYearContent {
	academicYear: '2023' | '2024' | '2025';
	unitThemeEn: string;
	titleTopicEn: string;
	titleTopicAr: string;
	themesEn: string[];
	themesAr: string[];
	exercises: ExerciseBlock[];
}

function buildSciMetadata(stream: SciStreamConfig, year: '2023' | '2024' | '2025'): ExamMetadata {
	return {
		levelId: 'secondaire',
		yearId: '3as',
		yearName: '3rd Year Secondary School (3AS / BAC)',
		streamId: stream.streamId,
		streamName: stream.streamNameEn,
		subjectId: 'ENG-SEC',
		subjectName: 'English Language',
		trimesterId: 't3',
		trimesterName: 'Baccalaureate Practice Session',
		docType: 'exam',
		academicYear: year,
		duration: '02 Hours 30 Min',
		coefficient: 2,
		examSessionAr: 'June ' + year,
		topicNumber: 1,
		font: 'Arial',
		customDocTitle: 'Baccalaureate Practice Examination — English Language',
		siteUrl: 'https://sujetstore.com'
	};
}

function projectCanonicalToStreams(canonical: CanonicalSciYearContent): OfficialEnglishBacPaperSpec[] {
	return SCI_STREAMS.map((stream) => {
		const examDoc: ExamDocument = {
			metadata: buildSciMetadata(stream, canonical.academicYear),
			exercises: canonical.exercises
		};
		return {
			slug: `bac-${canonical.academicYear}-${stream.slugTrack}-english`,
			grade: stream.grade,
			yearSubjectId: stream.yearSubjectId,
			subjectId: 'ENG-SEC',
			streamId: stream.streamId,
			streamNameAr: stream.streamNameAr,
			streamNameEn: stream.streamNameEn,
			academicYear: canonical.academicYear,
			sessionEn: `June ${canonical.academicYear}`,
			sessionAr: `دورة جوان ${canonical.academicYear}`,
			coefficient: 2,
			duration: '02 Hours 30 Min',
			pointsSplit: [8, 7, 5] as const,
			unitThemeEn: canonical.unitThemeEn,
			titleEn: `BAC Practice Examination in English — ${stream.streamNameEn} (${canonical.academicYear}: ${canonical.titleTopicEn})`,
			titleAr: `موضوع بكالوريا تدريبي في اللغة الإنجليزية — شعبة ${stream.streamNameAr} (دورة جوان ${canonical.academicYear} — ${canonical.titleTopicAr})`,
			themesEn: canonical.themesEn,
			themesAr: canonical.themesAr,
			templateId: 'english/bac_official',
			examDoc
		};
	});
}

const CANONICAL_SCI_2023: CanonicalSciYearContent = {
	academicYear: '2023',
	unitThemeEn: 'Ethics in Business',
	titleTopicEn: 'Fighting Counterfeiting and Promoting Integrity in Trade',
	titleTopicAr: 'أخلاقيات التجارة ومحاربة التقليد',
	themesEn: ['Ethics in Business', 'Anti-Counterfeiting', 'Commercial Integrity'],
	themesAr: ['أخلاقيات العمل التجاري', 'محاربة الغش والتقليد', 'الأمانة في التجارة'],
	exercises: [
		{
			id: 'sci_2023_comp',
			customTitle: 'Part One: Reading — A/ Comprehension',
			points: 8,
			instruction: 'Read the text carefully then do the activities below.',
			content: [
				buildEnglishPassageBlock({
					title: 'Combating Counterfeiting Through Ethical Trade',
					paragraphs: [
						'Counterfeiting has become one of the most serious threats to global trade and public safety. Every year, illegal workshops produce millions of imitation medicines, fake car spare parts, and defective electrical appliances. [[They]] are sold at tempting low prices, yet they rarely pass safety inspections and often endanger human lives.',
						'Beyond harming consumers, fake products cause severe damage to honest merchants and national economies. Legitimate companies invest years in scientific research, fair wages, and strict quality control, only to see [[their]] reputation damaged by dishonest imitators who avoid paying taxes and disregard legal standards.',
						'Eradicating this practice requires both firm regulation and moral awareness. Customs officers and inspectors must enforce strict laws at ports and local markets, while traders should remember that Islamic and universal business ethics demand full honesty in weights, measures, and product quality. Informed shoppers who verify authenticity codes play an equally decisive role in protecting society.'
					],
					source: 'Adapted from International Trade Integrity Reports, SujetStore Educational Edition',
					numberedParagraphs: true,
					glossary: [
						{ term: 'defective', meaning: 'faulty or not working safely' },
						{ term: 'legitimate', meaning: 'lawful and officially recognized' }
					]
				}),
				{
					type: 'multiple_choice',
					groups: [
						{
							header: '1. Choose the right answer to complete each statement.\na) The text is:',
							options: ['narrative', 'expository', 'descriptive'],
							correct: 'expository',
							mark: '0.5'
						},
						{
							header: 'b) The main message of the text is that fighting counterfeiting depends on:',
							options: [
								'lowering prices of original products',
								'strict laws, moral honesty, and consumer vigilance',
								'closing local markets completely'
							],
							correct: 'strict laws, moral honesty, and consumer vigilance',
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
							q: 'a) Counterfeit medicines and spare parts are harmless because they are cheaper.',
							a: 'False',
							c: 'They rarely pass safety inspections and often endanger human lives.',
							mark: '0.5'
						},
						{
							q: 'b) Dishonest imitators pay full taxes and follow strict quality standards.',
							a: 'False',
							c: 'They avoid paying taxes and disregard legal standards.',
							mark: '0.5'
						},
						{
							q: 'c) Legitimate businesses suffer financial and reputational harm from counterfeiting.',
							a: 'True',
							mark: '0.5'
						},
						{
							q: 'd) Checking authenticity codes helps consumers fight counterfeit trade.',
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
					content: 'a) Mention two examples of dangerous counterfeit goods cited in the first paragraph.',
					answer: 'a) Imitation medicines, fake car spare parts, and defective electrical appliances (any two).',
					mark: '1'
				},
				{
					type: 'text',
					content: 'b) How do legitimate companies maintain the quality of their goods?',
					answer: 'b) They invest years in scientific research, fair wages, and strict quality control.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'c) What two major elements are needed to eliminate counterfeiting according to the third paragraph?',
					answer: 'c) Firm legal regulation (enforced by customs officers and inspectors) and moral awareness (honesty in trade and consumer vigilance).',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. In which paragraph is it mentioned that:'
				},
				{
					type: 'text',
					content: 'a) Counterfeiting threatens the finances and reputation of lawful businesses?',
					answer: 'a) Paragraph 2.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) Ethical commerce requires fairness in weights, measures, and product quality?',
					answer: 'b) Paragraph 3.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '5. What or who do the underlined words refer to in the text?'
				},
				{
					type: 'text',
					content: 'a) They (paragraph 1) ............................',
					answer: 'a) They refers to imitation medicines, fake car spare parts, and defective electrical appliances (counterfeit goods).',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) their (paragraph 2) ............................',
					answer: 'b) their refers to legitimate companies.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_2023_exp',
			customTitle: 'Part One: Reading — B/ Text Exploration',
			points: 7,
			instruction: 'Do the following language and discourse tasks carefully.',
			content: [
				{
					type: 'text',
					content: '1. Find in the text words or phrases that are closest in meaning to the following:'
				},
				{
					type: 'text',
					content: 'a) put at risk (paragraph 1) = ............................',
					answer: 'a) endanger',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) ignore (paragraph 2) = ............................',
					answer: 'b) disregard',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) completely removing (paragraph 3) = ............................',
					answer: 'c) eradicating',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '2. Complete the following chart with the missing verb, noun, or adjective.'
				},
				buildEnglishWordBuildingTableBlock([
					{
						verb: { given: true, value: 'deceive' },
						noun: { value: 'deception', mark: '0.25' },
						adjective: { value: 'deceptive', mark: '0.25' }
					},
					{
						verb: { value: 'produce', mark: '0.25' },
						noun: { given: true, value: 'production' },
						adjective: { value: 'productive', mark: '0.25' }
					},
					{
						verb: { value: 'protect', mark: '0.25' },
						noun: { value: 'protection', mark: '0.25' },
						adjective: { given: true, value: 'protective' }
					}
				]),
				{
					type: 'text',
					content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
				},
				{
					type: 'text',
					content: '1a) Authorities should enforce stricter market inspections right now.\n\n1b) It is high time ........................................................................................',
					answer: '1b) It is high time authorities enforced stricter market inspections.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2a) Consumers will remain safe if they check official authenticity labels.\n\n2b) Provided that ........................................................................................',
					answer: '2b) Provided that consumers check official authenticity labels, they will remain safe.',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to the pronunciation of their final "s": products, markets, standards, businesses.'
				},
				buildEnglishPhonologyTableBlock({
					columns: [
						{ header: '/s/', words: ['products', 'markets'], mark: '0.5' },
						{ header: '/z/', words: ['standards'], mark: '0.25' },
						{ header: '/iz/', words: ['businesses'], mark: '0.25' }
					]
				}),
				{
					type: 'text',
					content: '5. Fill in the gaps with ONLY FOUR words from the list: honesty - fake - citizens - taxes - laws - factories.\nEthical trade builds trust among ....(1).... and strengthens the national economy. When traders avoid selling ....(2).... products and pay their ....(3).... regularly, public services improve for everyone. Above all, personal ....(4).... remains the strongest shield against commercial fraud.',
					answer: '(1) citizens (0.25)   |   (2) fake (0.25)   |   (3) taxes (0.25)   |   (4) honesty (0.25)',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_2023_wr',
			customTitle: 'Part Two: Written Expression',
			points: 5,
			instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
			content: [
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt:
						'You are a member of a youth consumer-protection association. Write an article for your school magazine explaining how society can combat counterfeiting and encourage ethical commerce.',
					topicOneNotes: [
						'Enforce strict customs controls and heavy fines on illegal workshops.',
						'Encourage merchants to respect honesty, fair pricing, and certified quality.',
						'Raise public awareness about health risks of counterfeit goods.',
						'Reward transparent local manufacturers who respect safety standards.'
					],
					topicTwoPrompt:
						'Honesty and trustworthiness are the true foundation of a prosperous economy. Write an opinion essay explaining why ethical values matter more than quick illegal profit.',
					rubricSummary:
						'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
					modelAnswer:
						'Counterfeiting poses a serious danger to public health and economic stability, yet society can defeat it through coordinated action. First, authorities must strengthen customs checks and impose firm penalties on illegal workshops that manufacture fake medicines and faulty spare parts. Second, merchants should uphold ethical principles by offering fair prices, accurate weights, and certified products. Moreover, schools and community associations need to educate consumers to inspect authenticity codes rather than chasing suspicious bargains. Finally, supporting honest local producers encourages innovation and creates reliable jobs. When strict laws are joined with moral responsibility, genuine trade flourishes and every family stays safe.',
					mark: '5'
				})
			]
		}
	]
};

const CANONICAL_SCI_2024: CanonicalSciYearContent = {
	academicYear: '2024',
	unitThemeEn: 'Safety First',
	titleTopicEn: 'Food Safety, Honest Advertising and Consumer Awareness',
	titleTopicAr: 'سلامة الغذاء والإشهار الصادق ووعي المستهلك',
	themesEn: ['Safety First', 'Food Safety', 'Honest Advertising', 'Consumer Awareness'],
	themesAr: ['السلامة الغذائية', 'الإشهار النزيه', 'وعي المستهلك', 'التغذية الصحية'],
	exercises: [
		{
			id: 'sci_2024_comp',
			customTitle: 'Part One: Reading — A/ Comprehension',
			points: 8,
			instruction: 'Read the text carefully then do the activities below.',
			content: [
				buildEnglishPassageBlock({
					title: 'Smart Consumers and Honest Food Labels',
					paragraphs: [
						'Modern supermarkets offer thousands of packaged snacks, sugary drinks, and ready-to-eat meals that save time for busy families. However, aggressive commercial advertising often exaggerates the nutritional benefits of processed food while hiding high levels of salt, refined sugar, and artificial preservatives. Because [[it]] targets children and teenagers through colourful packaging, many young people develop unhealthy eating habits at an early age.',
						'Health specialists emphasize that reading nutritional labels is one of the simplest ways to protect family well-being. Every certified food package displays an ingredient list, an expiry date, and storage instructions. Consumers who examine [[them]] carefully can easily compare products, check for halal and wholesome ingredients, and reject items overloaded with chemical additives.',
						'Food safety is a shared responsibility between producers, regulators, and households. Companies are ethically obliged to present truthful advertisements and maintain clean manufacturing lines. At home, parents and schools can guide students toward balanced meals rich in fresh vegetables, fruits, whole grains, and clean water so that good health becomes a daily habit.'
					],
					source: 'Adapted from Public Health and Consumer Guidance Bulletin, SujetStore Edition',
					numberedParagraphs: true,
					glossary: [
						{ term: 'preservatives', meaning: 'substances added to food to prevent spoilage' },
						{ term: 'wholesome', meaning: 'clean, pure, and good for physical health' }
					]
				}),
				{
					type: 'multiple_choice',
					groups: [
						{
							header: '1. Choose the right answer to complete each statement.\na) The text is mainly about:',
							options: [
								'how to open a modern supermarket',
								'food safety, honest advertising, and wise consumer habits',
								'traditional farming tools in ancient times'
							],
							correct: 'food safety, honest advertising, and wise consumer habits',
							mark: '0.5'
						},
						{
							header: 'b) The author writes to:',
							options: [
								'inform and advise consumers',
								'promote sugary soft drinks',
								'criticize home-cooked meals'
							],
							correct: 'inform and advise consumers',
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
							q: 'a) Commercial food advertisements always highlight the exact amount of hidden sugar and salt.',
							a: 'False',
							c: 'Aggressive advertising often hides high levels of salt, refined sugar, and artificial preservatives.',
							mark: '0.5'
						},
						{
							q: 'b) Colourful packaging is frequently used to attract children and teenagers.',
							a: 'True',
							mark: '0.5'
						},
						{
							q: 'c) Reading ingredient lists and expiry dates helps consumers make safer choices.',
							a: 'True',
							mark: '0.5'
						},
						{
							q: 'd) Only government inspectors are responsible for food safety.',
							a: 'False',
							c: 'Food safety is a shared responsibility between producers, regulators, and households.',
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
					content: 'a) Why do many busy families buy packaged meals and snacks?',
					answer: 'a) Because they save time for busy families.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'b) What three details can a consumer find on a certified food package?',
					answer: 'b) An ingredient list, an expiry date, and storage instructions.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'c) How can parents and schools encourage healthy nutrition among students?',
					answer: 'c) By guiding students toward balanced meals rich in fresh vegetables, fruits, whole grains, and clean water.',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. In which paragraph is it mentioned that:'
				},
				{
					type: 'text',
					content: 'a) Examining product details enables shoppers to avoid excessive chemical additives?',
					answer: 'a) Paragraph 2.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) Food manufacturers must be truthful in their marketing and hygienic in production?',
					answer: 'b) Paragraph 3.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '5. What do the underlined words refer to in the text?'
				},
				{
					type: 'text',
					content: 'a) it (paragraph 1) ............................',
					answer: 'a) it refers to aggressive commercial advertising.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) them (paragraph 2) ............................',
					answer: 'b) them refers to nutritional labels (an ingredient list, an expiry date, and storage instructions).',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_2024_exp',
			customTitle: 'Part One: Reading — B/ Text Exploration',
			points: 7,
			instruction: 'Do the following language and discourse tasks carefully.',
			content: [
				{
					type: 'text',
					content: '1. Find in the text words or phrases that are opposite in meaning to the following:'
				},
				{
					type: 'text',
					content: 'a) natural (paragraph 1) = ............................',
					answer: 'a) artificial',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) accept (paragraph 2) = ............................',
					answer: 'b) reject',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) dishonest (paragraph 3) = ............................',
					answer: 'c) truthful',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '2. Complete the following chart with the missing verb, noun, or adjective.'
				},
				buildEnglishWordBuildingTableBlock([
					{
						verb: { given: true, value: 'consume' },
						noun: { value: 'consumption', mark: '0.25' },
						adjective: { value: 'consumable', mark: '0.25' }
					},
					{
						verb: { value: 'inform', mark: '0.25' },
						noun: { given: true, value: 'information' },
						adjective: { value: 'informative', mark: '0.25' }
					},
					{
						verb: { value: 'prevent', mark: '0.25' },
						noun: { value: 'prevention', mark: '0.25' },
						adjective: { given: true, value: 'preventive' }
					}
				]),
				{
					type: 'text',
					content: '3. Combine each pair of sentences using the connector between brackets. Make any necessary changes.'
				},
				{
					type: 'text',
					content: 'a) Many snacks look attractive on television. They contain excessive sugar and salt. (Although)',
					answer: 'a) Although many snacks look attractive on television, they contain excessive sugar and salt.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'b) Consumers will not avoid spoiled products. They check the expiry date carefully. (Unless)',
					answer: 'b) Unless consumers check the expiry date carefully, they will not avoid spoiled products.',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to the pronunciation of their final "ed": checked, preserved, consumed, protected.'
				},
				buildEnglishPhonologyTableBlock({
					columns: [
						{ header: '/t/', words: ['checked'], mark: '0.25' },
						{ header: '/d/', words: ['preserved', 'consumed'], mark: '0.5' },
						{ header: '/id/', words: ['protected'], mark: '0.25' }
					]
				}),
				{
					type: 'text',
					content: '5. Reorder the following sentences to get a coherent paragraph.\n\na) Consequently, eating balanced home-cooked meals protects teenagers from obesity and fatigue.\n\nb) In contrast, fast food is often rich in unhealthy fats and poor in essential vitamins.\n\nc) Good nutrition is vital for students who want to stay focused during exam preparation.\n\nd) Fresh fruits, vegetables, and whole grains provide steady energy throughout the school day.',
					answer: 'Correct order: 1-c (0.25) , 2-d (0.25) , 3-b (0.25) , 4-a (0.25)',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_2024_wr',
			customTitle: 'Part Two: Written Expression',
			points: 5,
			instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
			content: [
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt:
						'Many secondary school students consume sugary drinks and packaged fast food every day. Write a short guide for your school health club advising students on how to become smart, health-conscious consumers.',
					topicOneNotes: [
						'Read expiry dates and nutritional labels before buying any packaged item.',
						'Limit sugary beverages and overly salty snacks.',
						'Choose fresh, halal, and home-prepared meals with fruits and vegetables.',
						'Do not trust exaggerated commercial slogans without verifying the ingredients.'
					],
					topicTwoPrompt:
						'Honest advertising builds lasting trust between companies and customers. Write an essay discussing why truthfulness in marketing benefits both public health and business success.',
					rubricSummary:
						'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
					modelAnswer:
						'Staying healthy during secondary school starts with becoming a smart and cautious consumer. First, students should always inspect expiry dates, storage instructions, and ingredient lists before purchasing packaged snacks. Products containing excessive sugar, salt, or artificial preservatives ought to be avoided because they reduce concentration and harm long-term health. Second, teenagers should never let colourful advertisements or exaggerated slogans dictate their diet. Instead, choosing fresh, halal, and home-prepared meals rich in fruits, vegetables, whole grains, and pure water gives the body steady energy for study and exercise. By adopting mindful eating habits today, young people protect their well-being and set a positive example for their families.',
					mark: '5'
				})
			]
		}
	]
};

const CANONICAL_SCI_2025: CanonicalSciYearContent = {
	academicYear: '2025',
	unitThemeEn: 'Astronomy and the Solar System',
	titleTopicEn: 'Exploring the Cosmos and Contributions of Muslim Astronomers',
	titleTopicAr: 'علم الفلك والنظام الشمسي وإسهامات العلماء المسلمين',
	themesEn: ['Astronomy', 'Solar System', 'Muslim Scientists', 'Space Satellites'],
	themesAr: ['علم الفلك', 'المجموعة الشمسية', 'إسهامات العلماء المسلمين', 'الأقمار الصناعية'],
	exercises: [
		{
			id: 'sci_2025_comp',
			customTitle: 'Part One: Reading — A/ Comprehension',
			points: 8,
			instruction: 'Read the text carefully then do the activities below.',
			content: [
				buildEnglishPassageBlock({
					title: 'Pioneers of Astronomy: From Classical Observatories to Modern Space Science',
					paragraphs: [
						'For centuries, human beings have looked up at the night sky in awe of the remarkable precision governing the universe. Our solar system consists of the Sun, eight planets revolving along well-ordered orbits, dozens of moons, and countless smaller celestial bodies. Studying this vast cosmic order has always inspired scientific curiosity and gratitude for the perfection of creation.',
						'Long before modern space telescopes existed, classical Muslim astronomers laid vital foundations for observational science. Muhammad ibn Musa al-Khwarizmi compiled accurate astronomical tables that guided scholars for generations. Al-Biruni calculated the radius and circumference of the Earth with astonishing accuracy using trigonometry and mountain measurements. Meanwhile, Ibn al-Haytham transformed optics and explained how light travels, paving the way for lens design and later telescopes. [[Their]] devotion to careful experimentation established enduring methods of scientific inquiry.',
						'Today, space agencies deploy orbiting satellites and deep-space probes to monitor planets, track solar storms, and observe Earth from above. [[These]] advanced instruments help nations forecast weather patterns, manage water resources, detect forest fires early, and improve global telecommunications. Modern astronomy thus unites centuries of scholarly heritage with practical benefits for daily life on Earth.'
					],
					source: 'Adapted from History of Astronomy and Space Technology Essays, SujetStore Edition',
					numberedParagraphs: true,
					glossary: [
						{ term: 'revolving', meaning: 'moving in a circular or elliptical path around a centre' },
						{ term: 'circumference', meaning: 'the distance around the outer edge of a sphere or circle' }
					]
				}),
				{
					type: 'multiple_choice',
					groups: [
						{
							header: '1. Choose the right answer to complete each statement.\na) The text is:',
							options: ['a fictional story', 'an informative article', 'a personal letter'],
							correct: 'an informative article',
							mark: '0.5'
						},
						{
							header: "b) Al-Biruni calculated the Earth's circumference using:",
							options: [
								'orbiting space satellites',
								'trigonometry and mountain measurements',
								'deep-space radio probes'
							],
							correct: 'trigonometry and mountain measurements',
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
							q: 'a) The solar system includes the Sun, eight planets, moons, and smaller celestial bodies.',
							a: 'True',
							mark: '0.5'
						},
						{
							q: 'b) Al-Khwarizmi is mentioned in the text for inventing deep-space probes.',
							a: 'False',
							c: 'Al-Khwarizmi compiled accurate astronomical tables that guided scholars for generations.',
							mark: '0.5'
						},
						{
							q: 'c) Ibn al-Haytham studied optics and explained how light travels.',
							a: 'True',
							mark: '0.5'
						},
						{
							q: 'd) Modern space satellites have no practical use for everyday life on Earth.',
							a: 'False',
							c: 'They help forecast weather, manage water resources, detect forest fires, and improve telecommunications.',
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
					content: 'a) How did Ibn al-Haytham contribute to the later development of telescopes?',
					answer: 'a) He transformed optics and explained how light travels, paving the way for lens design and later telescopes.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'b) What method did classical Muslim astronomers champion according to paragraph 2?',
					answer: 'b) Careful experimentation and observational scientific inquiry.',
					mark: '1'
				},
				{
					type: 'text',
					content: 'c) Name three practical benefits of orbiting satellites mentioned in paragraph 3.',
					answer: 'c) Weather forecasting, managing water resources, early detection of forest fires, and improving global telecommunications (any three).',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. In which paragraph is it mentioned that:'
				},
				{
					type: 'text',
					content: 'a) Classical Muslim scholars produced lasting mathematical and optical breakthroughs?',
					answer: 'a) Paragraph 2.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) Satellites assist in preventing environmental disasters such as wildfires?',
					answer: 'b) Paragraph 3.',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '5. Who or what do the underlined words refer to in the text?'
				},
				{
					type: 'text',
					content: 'a) Their (paragraph 2) ............................',
					answer: 'a) Their refers to classical Muslim astronomers (Al-Khwarizmi, Al-Biruni, and Ibn al-Haytham).',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) These (paragraph 3) ............................',
					answer: 'b) These refers to orbiting satellites and deep-space probes.',
					mark: '0.5'
				}
			]
		},
		{
			id: 'sci_2025_exp',
			customTitle: 'Part One: Reading — B/ Text Exploration',
			points: 7,
			instruction: 'Do the following language and discourse tasks carefully.',
			content: [
				{
					type: 'text',
					content: '1. Find in the text words or phrases that are closest in meaning to the following:'
				},
				{
					type: 'text',
					content: 'a) accuracy (paragraph 1) = ............................',
					answer: 'a) precision',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'b) surprising / amazing (paragraph 2) = ............................',
					answer: 'b) astonishing',
					mark: '0.5'
				},
				{
					type: 'text',
					content: 'c) predict (paragraph 3) = ............................',
					answer: 'c) forecast',
					mark: '0.5'
				},
				{
					type: 'text',
					content: '2. Complete the following chart with the missing verb, noun, or adjective.'
				},
				buildEnglishWordBuildingTableBlock([
					{
						verb: { given: true, value: 'observe' },
						noun: { value: 'observation', mark: '0.25' },
						adjective: { value: 'observational', mark: '0.25' }
					},
					{
						verb: { value: 'explore', mark: '0.25' },
						noun: { given: true, value: 'exploration' },
						adjective: { value: 'exploratory', mark: '0.25' }
					},
					{
						verb: { value: 'reflect', mark: '0.25' },
						noun: { value: 'reflection', mark: '0.25' },
						adjective: { given: true, value: 'reflective' }
					}
				]),
				{
					type: 'text',
					content: '3. Rewrite sentence (b) so that it means the same as sentence (a).'
				},
				{
					type: 'text',
					content: '1a) Al-Biruni measured the circumference of the Earth with remarkable accuracy.\n\n1b) The circumference of the Earth ........................................................................',
					answer: '1b) The circumference of the Earth was measured by Al-Biruni with remarkable accuracy.',
					mark: '1'
				},
				{
					type: 'text',
					content: '2a) Venus is extremely hot, whereas Mars has a freezing surface.\n\n2b) Unlike ............................................................................................................',
					answer: '2b) Unlike Venus, which is extremely hot, Mars has a freezing surface.',
					mark: '1'
				},
				{
					type: 'text',
					content: '4. Classify the following words according to the number of syllables: planet, solar, telescope, astronomy.'
				},
				buildEnglishPhonologyTableBlock({
					columns: [
						{ header: '2 syllables', words: ['planet', 'solar'], mark: '0.5' },
						{ header: '3 syllables', words: ['telescope'], mark: '0.25' },
						{ header: '4 syllables', words: ['astronomy'], mark: '0.25' }
					]
				}),
				{
					type: 'text',
					content: '5. Fill in the gaps with ONLY FOUR words from the list: satellites - orbits - weather - gravity - deserts - oceans.\nEarth travels smoothly around the Sun thanks to ....(1).... and balanced orbital speed. Around our planet, artificial ....(2).... collect vital data every minute. Meteorologists rely on these signals to predict ....(3).... conditions accurately, while engineers monitor agriculture and map vast ....(4).... across North Africa.',
					answer: '(1) gravity (0.25)   |   (2) satellites (0.25)   |   (3) weather (0.25)   |   (4) deserts (0.25)',
					mark: '1'
				}
			]
		},
		{
			id: 'sci_2025_wr',
			customTitle: 'Part Two: Written Expression',
			points: 5,
			instruction: 'Write a well-structured composition of about 80 to 120 words on ONE of the following topics.',
			content: [
				buildEnglishWrittenExpressionBlock({
					topicOnePrompt:
						'Some people claim that investing in space science and satellites is unnecessary. Write an article explaining why satellite technology is deeply beneficial for countries like Algeria.',
					topicOneNotes: [
						'Accurate weather forecasting helps farmers plan planting and harvests.',
						'Earth-observation satellites monitor droughts, floods, and forest fires early.',
						'Communication satellites connect remote Saharan towns to education and telemedicine.',
						'Space engineering inspires young scientists and builds national technical expertise.'
					],
					topicTwoPrompt:
						'Classical Muslim astronomers such as Al-Biruni, Al-Khwarizmi, and Ibn al-Haytham demonstrated the power of disciplined observation. Write an essay about the lessons modern students can learn from their scientific legacy.',
					rubricSummary:
						'Relevance: 1 pt | Semantic coherence: 1 pt | Correct use of English: 2 pts | Excellence and vocabulary: 1 pt',
					modelAnswer:
						'Far from being a luxury, satellite technology provides essential daily benefits for developing and modern nations alike. In Algeria, Earth-observation satellites support agriculture by supplying accurate weather forecasts and tracking seasonal rainfall. They also protect ecosystems by detecting forest fires, desertification, and water shortages early so authorities can respond rapidly. Furthermore, telecommunication satellites bridge geographical distances, connecting remote Saharan communities to reliable internet, distance education, and telemedicine services. Finally, investing in space engineering motivates university students to excel in mathematics, physics, and computer science. Therefore, space research is not an escape from earthly problems; it is a practical tool for sustainable national development.',
					mark: '5'
				})
			]
		}
	]
};

export const OFFICIAL_BAC_ENGLISH_SCI_PAPERS: OfficialEnglishBacPaperSpec[] = [
	...projectCanonicalToStreams(CANONICAL_SCI_2023),
	...projectCanonicalToStreams(CANONICAL_SCI_2024),
	...projectCanonicalToStreams(CANONICAL_SCI_2025)
];
