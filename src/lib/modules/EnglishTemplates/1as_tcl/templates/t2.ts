import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWordBuildingTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';

// ============================================================================
// 4 Parameterized Templates — 1AS TCL Trimester 2 (7 + 8 + 8[alt] + 5 = 20)
// Unit 2: Once Upon a Time (100% Original Wholesome Algerian/Islamic Moral Tales)
// ============================================================================

// 1. Part One: A) Reading Comprehension (7 pts)
const tpl1asTclT2MoralTaleComprehension: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t2_moral_tale_comprehension',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب — حكايات جزائرية وإسلامية هادفة (الأمانة والحكمة والكرم)',
	curriculumLessonId: 'eng_lesson_1as_tcl_t2_moral_tales_characters',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'The Honest Spice Merchant of Tlemcen',
				source: 'Original Algerian Moral Tale (Wholesome Heritage Series)',
				paragraphs: [
					'Long ago, in the bustling old market of Tlemcen, there lived a humble spice merchant named Ibrahim, whose small shop stood near the Great Mosque. Although Ibrahim was not wealthy, every neighbour trusted [[him]] because he weighed goods fairly and never hid a flaw in his merchandise.',
					'One crisp autumn morning, while Ibrahim was sweeping the doorstep of his shop, a weary caravan traveller stopped to buy saffron and ginger. After paying, the traveller hurried away toward the western gate. A few minutes later, Ibrahim noticed a heavy leather pouch lying beside the sacks of spices. When he opened [[it]], he saw fifty gleaming gold coins inside. Some hasty onlookers suggested keeping the money, yet Ibrahim refused firmly and asked a young boy to guard the stall while he ran toward the western gate.',
					'Ibrahim finally caught up with the traveller, whom he found searching his saddlebags in great distress. With a calm smile, Ibrahim handed back the untouched pouch. Deeply moved, the traveller offered ten gold coins as a reward, but Ibrahim declined politely, saying that honesty needs no payment. From that day onward, merchants from distant towns came specifically to trade with Ibrahim, proving that trustworthiness is the richest treasure a person can possess.'
				],
				glossary: [
					{ term: 'flaw', meaning: 'a defect or imperfection' },
					{ term: 'distress', meaning: 'great anxiety, sorrow, or worry' }
				],
				tfItems: [
					{
						q: 'Ibrahim was the wealthiest merchant in Tlemcen.',
						a: 'False',
						c: 'He was a humble merchant and was not wealthy.',
						mark: '0.5'
					},
					{
						q: 'Ibrahim found a leather pouch containing fifty gold coins near his spice sacks.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'Ibrahim accepted ten gold coins from the traveller as a reward.',
						a: 'False',
						c: 'He declined politely, saying that honesty needs no payment.',
						mark: '0.5'
					}
				],
				q1: 'Why did every neighbour trust Ibrahim according to paragraph 1?',
				a1: 'Because he weighed goods fairly and never hid a flaw in his merchandise.',
				q2: 'What was Ibrahim doing when the weary caravan traveller stopped at his shop?',
				a2: 'He was sweeping the doorstep of his shop.',
				q3: 'What moral lesson does this story teach us?',
				a3: 'It teaches us that honesty and trustworthiness are richer than gold and bring lasting respect and blessing.',
				ref1Word: 'him (paragraph 1)',
				ref1Ans: 'Ibrahim (the humble spice merchant)',
				ref2Word: 'it (paragraph 2)',
				ref2Ans: 'the heavy leather pouch',
				textTypeCorrect: 'A wholesome moral narrative tale celebrating honesty and trustworthiness',
				textTypeDistractors: [
					{
						text: 'A scientific report on spice agriculture',
						diagnosticFeedback: 'The text tells a moral story with characters and a plot, not a scientific report.'
					},
					{
						text: 'A formal email applying for a market license',
						diagnosticFeedback: 'There is no email format or application.'
					},
					{
						text: 'A survey comparing teenage reading habits',
						diagnosticFeedback: 'No survey statistics appear in the passage.'
					}
				],
				theme: 'honesty and trustworthiness in the tale of Ibrahim of Tlemcen'
			},
			{
				title: 'The Wise Date-Palm Grower of Biskra',
				source: 'Original Algerian Wisdom Tale (Wholesome Heritage Series)',
				paragraphs: [
					'Many generations ago, in a sunlit oasis near Biskra, an elderly farmer named Mansour spent his mornings tending young date-palm shoots. Mansour was a patient, soft-spoken man whose white beard and steady hands reflected decades of honest labour. Even at the age of eighty, he continued clearing irrigation channels and planting new palms.',
					'One warm afternoon, while Mansour was planting a tiny palm shoot in the moist earth, a hasty young traveller rode past on a fine horse. Surprised by the sight, the youth asked, "Uncle, why are you tiring yourself with a tree that takes many years to bear fruit? You may never live to taste [[its]] dates!" Mansour paused, wiped his forehead, and looked kindly at the young rider.',
					'"My son," replied the wise elder, "the people who lived before us planted palms, and we ate their sweet fruit. Today, we plant so that the children who come after us may eat in peace." Ashamed of [[his]] narrow selfishness, the young traveller dismounted, took a wooden spade, and helped Mansour finish planting the entire row before sunset. The oasis still blooms today as a quiet reminder that true generosity looks beyond oneself.'
				],
				glossary: [
					{ term: 'shoot', meaning: 'a young growing stem or sprout of a plant' },
					{ term: 'dismounted', meaning: 'got off a horse' }
				],
				tfItems: [
					{
						q: 'Mansour stopped planting palm trees when he reached the age of eighty.',
						a: 'False',
						c: 'Even at eighty, he continued clearing irrigation channels and planting new palms.',
						mark: '0.5'
					},
					{
						q: 'The young traveller initially thought planting new palms at eighty was pointless.',
						a: 'True',
						mark: '0.5'
					},
					{
						q: 'After hearing Mansour-s wisdom, the young traveller stayed and helped plant the trees.',
						a: 'True',
						mark: '0.5'
					}
				],
				q1: 'Where and when does the story take place (the setting)?',
				a1: 'Many generations ago, in a sunlit oasis near Biskra.',
				q2: 'What was Mansour doing when the young traveller rode past?',
				a2: 'He was planting a tiny palm shoot in the moist earth.',
				q3: 'How did the young traveller react after hearing Mansour-s wise reply?',
				a3: 'Ashamed of his selfishness, he dismounted, took a spade, and helped Mansour finish planting the entire row.',
				ref1Word: 'its (paragraph 2)',
				ref1Ans: 'the young date-palm tree (tiny palm shoot)',
				ref2Word: 'his (paragraph 3)',
				ref2Ans: 'the young traveller',
				textTypeCorrect: 'A traditional Algerian moral tale teaching selfless generosity for future generations',
				textTypeDistractors: [
					{
						text: 'An environmental survey with pie charts',
						diagnosticFeedback: 'This is a narrative wisdom tale, not a statistical survey.'
					},
					{
						text: 'A formal letter requesting agricultural equipment',
						diagnosticFeedback: 'No letter conventions appear here.'
					},
					{
						text: 'A technical guide on building water clocks',
						diagnosticFeedback: 'The story focuses on character wisdom and generosity, not clock mechanics.'
					}
				],
				theme: 'selfless generosity and wisdom for future generations'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.textTypeCorrect, variant.textTypeDistractors, rng);
		const difficultyNote =
			difficulty === 'hard'
				? 'Correct any False statement from the story.'
				: 'Write True or False next to each statement.';

		const content: ContentBlock[] = [
			buildEnglishPassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				source: variant.source,
				glossary: variant.glossary
			}),
			{
				type: 'text',
				content: `1) Are the following statements True or False? (${difficultyNote})`
			},
			{
				type: 'true_false',
				items: variant.tfItems
			},
			{
				type: 'text',
				content: `2) Answer the following questions according to the story:\na) ${variant.q1}\nb) ${variant.q2}\nc) ${variant.q3}`,
				answer: `a) ${variant.a1}\nb) ${variant.a2}\nc) ${variant.a3}`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) What or who do the underlined words refer to in the text?\na) ${variant.ref1Word}   b) ${variant.ref2Word}`,
				answer: `a) ${variant.ref1Word}: ${variant.ref1Ans}\nb) ${variant.ref2Word}: ${variant.ref2Ans}`,
				mark: '1.5'
			},
			{
				type: 'multiple_choice',
				groups: [
					{
						header: '4) Choose the best description of the text:',
						options: mcq.options.map((o) => o.text),
						correct: variant.textTypeCorrect,
						mark: '1.0'
					}
				]
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `Read "${variant.title}". Which description best fits this passage?`,
				questionTextAr: 'اختر الوصف الأدق لنوع الحكاية ومغزاها:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `This original moral narrative highlights ${variant.theme}.`
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — A) Comprehension',
				points: 7,
				instruction: 'Read the moral tale carefully then answer the questions below:',
				content
			},
			hints: [
				'حدد الزمان والمكان (Setting) من الجملة الأولى في الحكاية.',
				'للسؤال عن الحدث المستمر (What was ... doing when ...?) ابحث عن جملة While + was/were + V-ing في الفقرة الثانية.',
				'استخلص العبرة الأخلاقية من الجملة الختامية للحكاية.'
			],
			solutionStepsAr: [
				`True/False: ${variant.tfItems.map((t) => t.a).join(' / ')}`,
				`Q1: ${variant.a1}`,
				`Q2: ${variant.a2}`,
				`Q3: ${variant.a3}`,
				`References: ${variant.ref1Ans} ; ${variant.ref2Ans}`
			],
			finalAnswer: variant.textTypeCorrect
		};
	}
};

// 2. Part One: B) Text Exploration — Past Simple/Continuous, Relative Pronouns & Final -ed (8 pts)
const tpl1asTclT2PastTensesRelativesTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t2_past_tenses_relatives_te',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'grammar_tenses',
	titleAr: 'استكشاف النص — الماضي البسيط والمستمر وضمائر الوصل (who/whom/which/whose) ونطق -ed',
	curriculumLessonId: 'eng_lesson_1as_tcl_t2_past_simple_continuous',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				wbRows: [
					{
						verb: { given: true, value: 'trust' },
						noun: { value: 'trust', mark: '0.5' },
						adjective: { value: 'trustworthy', mark: '0.5' }
					},
					{
						verb: { value: 'honour', mark: '0.5' },
						noun: { given: true, value: 'honour' },
						adjective: { value: 'honourable', mark: '0.5' }
					}
				],
				tensePrompt:
					'Put the verbs in brackets into the Past Simple or Past Continuous (2.5 pts):\na) While the craftsman (carve) .......... a cedar box, a neighbour (knock) .......... on the door.\nb) The villagers (gather) .......... olives when heavy rain suddenly (begin) .......... .\nc) While the grandfather (tell) .......... the tale, the children (listen) .......... quietly.',
				tenseAns:
					'a) was carving / knocked\nb) were gathering / began\nc) was telling / were listening',
				relPrompt:
					'Combine each pair with the right relative pronoun (who, whom, which, whose) (2.0 pts):\na) Ibrahim was a humble merchant. His honesty amazed the whole town.\nb) The traveller lost a leather pouch. It contained fifty gold coins.',
				relAns:
					'a) Ibrahim was a humble merchant whose honesty amazed the whole town.\nb) The traveller lost a leather pouch which contained fifty gold coins.',
				edWords: ['stopped', 'weighed', 'waited', 'helped', 'returned', 'trusted'],
				edCols: [
					{ header: '/t/', words: ['stopped', 'helped'], mark: '0.5' },
					{ header: '/d/', words: ['weighed', 'returned'], mark: '0.5' },
					{ header: '/id/', words: ['waited', 'trusted'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the correct relative pronoun: "The wise elder .......... advice saved the village was respected by all."',
				mcqCorrect: 'whose',
				mcqDistractors: [
					{
						text: 'who',
						diagnosticFeedback: '"advice" is a noun possessed by the elder (his advice), so use "whose".'
					},
					{
						text: 'which',
						diagnosticFeedback: '"which" refers to things, not possession of a person.'
					},
					{
						text: 'whom',
						diagnosticFeedback: '"whom" replaces an object person, not a possessive adjective.'
					}
				]
			},
			{
				wbRows: [
					{
						verb: { given: true, value: 'care' },
						noun: { value: 'care', mark: '0.5' },
						adjective: { value: 'careful', mark: '0.5' }
					},
					{
						verb: { value: 'imagine', mark: '0.5' },
						noun: { given: true, value: 'imagination' },
						adjective: { value: 'imaginative', mark: '0.5' }
					}
				],
				tensePrompt:
					'Put the verbs in brackets into the Past Simple or Past Continuous (2.5 pts):\na) While Mansour (water) .......... the young palms, a rider (stop) .......... near the garden.\nb) The shepherd (lead) .......... his flock home when he (find) .......... a lost lamb.\nc) While the mother (bake) .......... bread, her daughter (read) .......... a moral story.',
				tenseAns:
					'a) was watering / stopped\nb) was leading / found\nc) was baking / was reading',
				relPrompt:
					'Combine each pair with the right relative pronoun (who, whom, which, whose) (2.0 pts):\na) This is the generous farmer. Everybody praised him for his wisdom.\nb) Biskra has a fertile oasis. The oasis produces sweet dates.',
				relAns:
					'a) This is the generous farmer whom everybody praised for his wisdom.\nb) Biskra has a fertile oasis which produces sweet dates.',
				edWords: ['asked', 'smiled', 'planted', 'finished', 'replied', 'dismounted'],
				edCols: [
					{ header: '/t/', words: ['asked', 'finished'], mark: '0.5' },
					{ header: '/d/', words: ['smiled', 'replied'], mark: '0.5' },
					{ header: '/id/', words: ['planted', 'dismounted'], mark: '0.5' }
				],
				mcqQuestion: 'Choose the correct Past Simple / Past Continuous sentence:',
				mcqCorrect: 'While the merchant was sweeping the floor, a traveller dropped a pouch.',
				mcqDistractors: [
					{
						text: 'While the merchant swept the floor, a traveller was dropping a pouch.',
						diagnosticFeedback: 'Sweeping is the long background action (was sweeping); dropping is the sudden short action (dropped).'
					},
					{
						text: 'While the merchant were sweeping the floor, a traveller dropped a pouch.',
						diagnosticFeedback: 'Singular subject "the merchant" takes "was", not "were".'
					},
					{
						text: 'When the merchant was sweeping, a traveller drops a pouch.',
						diagnosticFeedback: 'Keep both verbs in past tenses, not Present Simple "drops".'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledEd = rng.shuffle(variant.edWords);

		const content: ContentBlock[] = [
			{ type: 'text', content: '1) Complete the following word-building table (2.0 pts):' },
			buildEnglishWordBuildingTableBlock(variant.wbRows),
			{
				type: 'text',
				content: `2) ${variant.tensePrompt}`,
				answer: variant.tenseAns,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.relPrompt}`,
				answer: variant.relAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `4) Classify the following past verbs according to the pronunciation of their final -ed (1.5 pts):\n${shuffledEd.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.edCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Pair Past Continuous (long action) with Past Simple (short interruption), and pick relative pronouns by role (who/whom/which/whose).'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Complete the morphology, grammar, and phonology tasks below:',
				content
			},
			hints: [
				'الحدث الطويل المستمر بعد While يكون في الماضي المستمر (was/were + V-ing)، والحدث المفاجئ القصير في الماضي البسيط.',
				'عند الربط بضمائر الوصل (who, whom, which, whose) لا تنس حذف الضمير المكرر (his / it / him).',
				'الأفعال المنتهية بصوت /t/ أو /d/ مثل waited, trusted, planted, dismounted تأخذ /id/.'
			],
			solutionStepsAr: [
				`Tenses: ${variant.tenseAns}`,
				`Relatives: ${variant.relAns}`,
				`Final -ed: ${variant.edCols.map((c) => `${c.header}: ${c.words.join(', ')}`).join(' | ')}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. Part One: B) Text Exploration (Alt) — Character Vocabulary, Story Ordering & Syllables (8 pts)
const tpl1asTclT2CharacterVocabNarrativeTe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t2_character_vocab_narrative_te',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'discourse_cohesion',
	titleAr: 'استكشاف النص — صفات الشخصيات وترتيب أحداث القصة وعدد المقاطع الصوتية',
	curriculumLessonId: 'eng_lesson_1as_tcl_t2_moral_tales_characters',
	defaultPoints: 8,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				oppPrompt: 'Match each virtue adjective with its opposite from the box (greedy - arrogant - hasty - dishonest): a) honest / ..........  b) humble / ..........  c) generous / ..........  d) patient / ..........',
				oppAns: 'a) dishonest   b) arrogant   c) greedy   d) hasty',
				orderPrompt:
					'Reorder the following sentences to form a coherent moral paragraph (3.0 pts):\n1) Finally, the grateful owner thanked the boy and praised his noble upbringing.\n2) One afternoon, while Sami was walking home from school, he found a silver watch on the pavement.\n3) Long ago, in a quiet neighbourhood of Annaba, there lived an honest schoolboy named Sami.\n4) Instead of keeping it, he immediately took the watch to the local mosque imam to announce the lost item.',
				orderAns: 'Correct chronological order: 3 (Orientation) — 2 (Complication) — 4 (Resolution) — 1 (Ending/Moral).',
				gapPrompt: 'Fill in the gaps with (who, whose, while, when): "The elder .......... lived near the fountain was watering flowers .......... a lost child approached him."',
				gapAns: 'who / when',
				sylWords: ['wise', 'honest', 'generous', 'tale', 'merchant', 'character'],
				sylCols: [
					{ header: '1 Syllable', words: ['wise', 'tale'], mark: '0.5' },
					{ header: '2 Syllables', words: ['honest', 'merchant'], mark: '0.5' },
					{ header: '3 Syllables', words: ['generous', 'character'], mark: '0.5' }
				],
				mcqQuestion: 'Which adjective is the exact opposite of "humble" when describing a story character?',
				mcqCorrect: 'arrogant',
				mcqDistractors: [
					{
						text: 'patient',
						diagnosticFeedback: '"patient" is a positive virtue, not the opposite of humble.'
					},
					{
						text: 'generous',
						diagnosticFeedback: '"generous" is the opposite of selfish or greedy.'
					},
					{
						text: 'trustworthy',
						diagnosticFeedback: '"trustworthy" means reliable and honest.'
					}
				]
			},
			{
				oppPrompt: 'Match each story element with its definition (Setting - Moral - Characters - Resolution): a) People in the tale = ..........  b) Time and place = ..........  c) How the problem ends = ..........  d) Ethical lesson = ..........',
				oppAns: 'a) Characters   b) Setting   c) Resolution   d) Moral',
				orderPrompt:
					'Reorder the following sentences to form a coherent moral paragraph (3.0 pts):\n1) Therefore, the neighbours learned that kindness and cooperation turn strangers into family.\n2) Suddenly, a heavy winter snowstorm blocked the road and left an elderly widow without firewood.\n3) Years ago, in a mountain village in Setif, the families lived simple and peaceful lives.\n4) Hearing of her hardship, the village youths carried dry wood and warm bread to her cottage.',
				orderAns: 'Correct chronological order: 3 (Orientation) — 2 (Complication) — 4 (Resolution) — 1 (Moral).',
				gapPrompt: 'Fill in the gaps with (whose, which, while, when): ".......... the woodcutter was crossing the bridge, he saw a basket .......... belonged to the village baker."',
				gapAns: 'While / which',
				sylWords: ['kind', 'humble', 'village', 'honesty', 'calm', 'traveller'],
				sylCols: [
					{ header: '1 Syllable', words: ['kind', 'calm'], mark: '0.5' },
					{ header: '2 Syllables', words: ['humble', 'village'], mark: '0.5' },
					{ header: '3 Syllables', words: ['honesty', 'traveller'], mark: '0.5' }
				],
				mcqQuestion: 'How many syllables are in the word "tale"?',
				mcqCorrect: '1 syllable',
				mcqDistractors: [
					{
						text: '2 syllables',
						diagnosticFeedback: 'The final letter "e" in "tale" is silent and does not add a syllable.'
					},
					{
						text: '3 syllables',
						diagnosticFeedback: 'Count spoken vowel sounds only; "tale" has just one.'
					},
					{
						text: '4 syllables',
						diagnosticFeedback: 'A single-syllable word has one vowel sound.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const shuffledSyl = rng.shuffle(variant.sylWords);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) ${variant.oppPrompt} (2.0 pts)`,
				answer: variant.oppAns,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ${variant.orderPrompt}`,
				answer: variant.orderAns,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `3) ${variant.gapPrompt} (1.5 pts)`,
				answer: variant.gapAns,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `4) Classify the following narrative words according to their number of syllables (1.5 pts):\n${shuffledSyl.join('  -  ')}`
			},
			buildEnglishPhonologyTableBlock({ columns: variant.sylCols })
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الإجابة الدقيقة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'Understanding character traits, story stages, and spoken syllable counts builds strong literary skills.'
			},
			sujetExercise: {
				customTitle: 'PART ONE: Reading — B) Text Exploration',
				points: 8,
				instruction: 'Do the following vocabulary, discourse cohesion, and phonology tasks:',
				content
			},
			hints: [
				'في ترتيب جمل القصة ابحث أولا عن جملة التمهيد (Long ago / Years ago)، ثم الحدث المفاجئ (One afternoon / Suddenly)، ثم الحل، وأخيرا العبرة (Finally / Therefore).',
				'تذكر أن e الصامتة في آخر الكلمة مثل wise و tale لا تُحسب مقطعا صوتيا.',
				'راجع أزواج الصفات المتضادة (honest/dishonest, humble/arrogant, patient/hasty).'
			],
			solutionStepsAr: [
				`Vocabulary: ${variant.oppAns}`,
				`Story Order: ${variant.orderAns}`,
				`Gap Fill: ${variant.gapAns}`
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. Part Two: Written Expression (5 pts) — Wholesome Narrative Paragraph
const tpl1asTclT2MoralNarrativeWe: EnglishParameterizedTemplate = {
	id: 'eng_tpl_1as_tcl_t2_moral_narrative_we',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'التعبير الكتابي — كتابة حكاية قصيرة هادفة (الأمانة أو بر الوالدين أو إتقان العمل)',
	curriculumLessonId: 'eng_lesson_1as_tcl_t2_narrative_paragraph',
	defaultPoints: 5,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				topicOnePrompt:
					'Write a wholesome short moral story (90 to 110 words) set in an Algerian town using the notes below. Use Past Simple, Past Continuous, and at least one relative pronoun.',
				topicOneNotes: [
					'Setting and Character: Long ago, in Blida / a hardworking young baker named Farid / known for kindness',
					'Complication: One rainy morning, while Farid was baking fresh bread, an elderly stranger fainted outside the bakery from hunger and cold',
					'Resolution: Farid immediately helped him inside, offered him warm soup and bread, and refused any payment',
					'Moral Lesson: True wealth lies in mercy and helping those in need'
				],
				topicTwoPrompt:
					'Write a short moral story (90 to 110 words) about a student who found a lost wallet in the schoolyard and chose honesty over greed.',
				modelAnswer:
					'Long ago, in the peaceful town of Blida, there lived a hardworking young baker named Farid, who was loved by his neighbours for his gentle manners. One rainy winter morning, while Farid was baking warm loaves of bread, an elderly stranger collapsed outside the bakery from cold and hunger. Hearing the noise, Farid rushed out immediately and helped the weary man into his warm shop. He offered him hot soup, fresh bread, and a dry cloak, and kindly refused any payment when the traveller recovered. From that day on, Farid-s bakery was blessed with loyal customers, teaching everyone that true wealth lies in mercy and generosity.',
				rubricSummary:
					'All 4 narrative stages present (1.5 pts), Accurate Past Simple/Continuous and relative pronouns (1.5 pts), Cohesive narrative linkers and clear moral (1 pt), Mechanics (1 pt).',
				mcqQuestion: 'Which sentence smoothly introduces the complication stage of a moral story?',
				mcqCorrect: 'One rainy morning, while Farid was baking bread, an elderly stranger collapsed outside.',
				mcqDistractors: [
					{
						text: 'One rainy morning, while Farid bakes bread, a stranger is collapsing.',
						diagnosticFeedback: 'Keep narrative events consistently in Past Continuous and Past Simple.'
					},
					{
						text: 'In conclusion, Farid was a baker in Blida.',
						diagnosticFeedback: '"In conclusion" belongs at the end, not the complication stage.'
					},
					{
						text: 'Dear Sir or Madam, I am writing about Farid the baker.',
						diagnosticFeedback: 'Never use formal letter openings in a narrative story.'
					}
				]
			},
			{
				topicOnePrompt:
					'Using the outline below, write a wholesome short story (90 to 110 words) about honesty and patience in a traditional Algerian pottery workshop.',
				topicOneNotes: [
					'Setting and Character: Years ago, in a hill village in Kabylia / a patient potter named Salim whose clay jars were admired across the region',
					'Complication: While Salim was preparing jars for market day, his young apprentice accidentally broke the finest pitcher and feared punishment',
					'Resolution: The boy told the truth courageously; instead of getting angry, Salim praised his honesty and taught him how to shape a stronger jar together',
					'Moral Lesson: Telling the truth builds trust and wisdom'
				],
				topicTwoPrompt:
					'Write a narrative paragraph (90 to 110 words) describing a memorable act of neighbourly solidarity you witnessed or heard about in Algeria.',
				modelAnswer:
					'Years ago, in a quiet mountain village in Kabylia, there lived a patient potter named Salim, whose clay jars were admired across the region. One busy morning, while Salim was arranging finished pots for market day, his young apprentice accidentally dropped and broke the finest pitcher. Trembling with worry, the boy thought about hiding the broken pieces, yet he chose to confess the truth immediately. Instead of shouting, the wise potter smiled calmly, praised the boy-s courage, and patiently showed him how to shape an even stronger jar together. That afternoon, the apprentice learned an unforgettable lesson: honesty builds lasting trust and opens the door to wisdom.',
				rubricSummary:
					'Complete narrative progression (1.5 pts), Correct past tenses and relative clauses (1.5 pts), Wholesome character portrayal and moral (1 pt), Spelling and punctuation (1 pt).',
				mcqQuestion: 'Which concluding sentence expresses the moral lesson of the potter story?',
				mcqCorrect: 'Honesty builds lasting trust and opens the door to wisdom.',
				mcqDistractors: [
					{
						text: 'Hide your mistakes whenever you break a clay jar.',
						diagnosticFeedback: 'This contradicts the ethical message of honesty.'
					},
					{
						text: 'While he broke the jar, he was never speaking again.',
						diagnosticFeedback: 'Grammatically awkward and does not state a clear moral.'
					},
					{
						text: 'Yours faithfully, Salim the Potter.',
						diagnosticFeedback: 'Stories do not end with formal letter sign-offs.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);

		const content: ContentBlock[] = [
			buildEnglishWrittenExpressionBlock({
				topicOnePrompt: variant.topicOnePrompt,
				topicOneNotes: variant.topicOneNotes,
				topicTwoPrompt: variant.topicTwoPrompt,
				modelAnswer: variant.modelAnswer,
				rubricSummary: variant.rubricSummary,
				mark: '5'
			})
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQuestion,
				questionTextAr: 'اختر الجملة الأنسب للفقرة السردية:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: 'A wholesome moral story flows from Orientation to Complication, Resolution, and Moral using consistent past tenses.'
			},
			sujetExercise: {
				customTitle: 'PART TWO: Written Expression',
				points: 5,
				instruction: 'Choose ONE of the following topics and write a well-structured narrative paragraph:',
				content
			},
			hints: [
				'ابدأ بتحديد الزمان والمكان والشخصية وصفتها الأخلاقية (Long ago, in..., there lived...).',
				'وظّف جملة While + Past Continuous + Past Simple عند تقديم الحدث المفاجئ.',
				'أضف ضمير وصل واحد على الأقل (who / whose / which) واختم بعبرة أخلاقية واضحة.'
			],
			solutionStepsAr: [variant.rubricSummary, variant.modelAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T2: EnglishParameterizedTemplate[] = [
	tpl1asTclT2MoralTaleComprehension,
	tpl1asTclT2PastTensesRelativesTe,
	tpl1asTclT2CharacterVocabNarrativeTe,
	tpl1asTclT2MoralNarrativeWe
];
