import type {
	Difficulty,
	EnglishGeneratedExerciseInstance,
	EnglishParameterizedTemplate
} from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildEnglishPassageBlock,
	buildEnglishPhonologyTableBlock,
	buildEnglishWrittenExpressionBlock
} from '../../english-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Part One A — Reading Comprehension (07 pts) — Shopping & Health
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension2amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t2_comp_shopping_health',
	grade: '2am',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: التسوق الغذائي الصحي والعادات السليمة (Me, My Shopping & My Health)',
	curriculumLessonId: 'eng_lesson_2am_t2_countable_uncountable',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'Shopping for Friday Couscous',
				source: 'Adapted 2MS Reading Text — Healthy Algerian Shopping',
				paragraphs: [
					'Every Thursday afternoon, Amine goes to the local market with his mother to buy [[fresh]] halal food for Friday lunch. Before leaving home, they check the kitchen carefully. There is some olive oil and a packet of couscous, but there are not any carrots, tomatoes, or dates.',
					'At the greengrocer\'s, Amine\'s mother buys two kilos of potatoes, one kilo of carrots, six tomatoes, and some green olives. They also buy a jar of pure mountain honey and sweet Algerian dates. Amine asks politely: "How much is it, please?" Everything is [[healthy]] and affordable.'
				],
				glossary: [
					{ term: 'greengrocer', meaning: 'fruit and vegetable seller (بائع الخضر والفواكه)' },
					{ term: 'affordable', meaning: 'having a fair price (بسعر مناسب)' }
				],
				tf: [
					{ q: 'Amine goes to the market on Thursday afternoon.', a: 'True', mark: '1' },
					{ q: 'There are plenty of carrots and tomatoes at home.', a: 'False', c: 'There are not any carrots, tomatoes, or dates.', mark: '1' },
					{ q: 'They buy mountain honey and Algerian dates.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What food items do they already have at home?\n2) How many kilos of potatoes does Amine\'s mother buy?',
				whA: '1) They have some olive oil and a packet of couscous.\n2) She buys two kilos of potatoes.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: good for the body = ......\nb) An opposite of: stale (old) = ......',
				lexA: 'a) good for the body = healthy\nb) stale != fresh',
				quizQ: 'Where do Amine and his mother buy the carrots and tomatoes?',
				correctOpt: 'At the greengrocer\'s in the local market.',
				distractors: [
					{ text: 'At the pharmacy.', diagnosticFeedback: 'Vegetables are bought at the greengrocer\'s.' },
					{ text: 'At the bookshop.', diagnosticFeedback: 'Bookshops sell books, not vegetables.' },
					{ text: 'At school.', diagnosticFeedback: 'They go to the local market on Thursday afternoon.' }
				]
			},
			{
				title: 'A Healthy Diet for Strong Pupils',
				source: 'Adapted 2MS Reading Text — Nutrition & Health',
				paragraphs: [
					'Good health is a great blessing from Allah. To stay [[strong]] and active at school, pupils should follow a balanced diet. Breakfast is the most important meal of the day: a cup of warm milk, wholegrain bread, olive oil, and three dates give you energy all morning.',
					'We should eat a lot of fresh fruits and vegetables and drink clean water every day. On the other hand, we should not eat [[unhealthy]] junk food, chips, or too many sugary drinks because they cause toothache and stomachache. Always wash your hands before and after meals!'
				],
				glossary: [
					{ term: 'balanced diet', meaning: 'healthy mix of good foods (نظام غذائي متوازن)' },
					{ term: 'junk food', meaning: 'unhealthy fast snacks (الوجبات السريعة الضارة)' }
				],
				tf: [
					{ q: 'Breakfast gives pupils energy for the morning.', a: 'True', mark: '1' },
					{ q: 'Junk food and sugary drinks are good for teeth.', a: 'False', c: 'They cause toothache and stomachache.', mark: '1' },
					{ q: 'We should wash our hands before and after meals.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Mention three healthy breakfast foods from paragraph 1.\n2) Why should pupils avoid sugary drinks and junk food?',
				whA: '1) Warm milk, wholegrain bread, olive oil, and dates.\n2) Because they cause toothache and stomachache.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: energetic = ......\nb) An opposite of: weak = ......',
				lexA: 'a) energetic = active\nb) weak != strong',
				quizQ: 'Which meal does the text call the most important meal of the day?',
				correctOpt: 'Breakfast.',
				distractors: [
					{ text: 'Midnight snacks.', diagnosticFeedback: 'Read paragraph 1 carefully: Breakfast is the most important meal.' },
					{ text: 'Fast food lunch.', diagnosticFeedback: 'The text warns against junk food.' },
					{ text: 'Sugary desserts.', diagnosticFeedback: 'The text recommends warm milk, bread, olive oil, and dates for breakfast.' }
				]
			},
			{
				title: 'Bilal Visits the Family Doctor',
				source: 'Adapted 2MS Reading Text — Me and My Health',
				paragraphs: [
					'Yesterday, Bilal did not feel well. He had a bad cold, a sore throat, and a slight fever because he played outside in the [[cold]] rain without a coat. His father took him to the neighbourhood clinic to see the doctor.',
					'The kind doctor examined Bilal and gave him clear advice: "You should take your medicine on time, drink [[warm]] herbal tea with honey, and rest at home for two days. You should not drink cold water or go outside in the rain. Stay clean and sleep early!"'
				],
				glossary: [
					{ term: 'sore throat', meaning: 'pain in the throat (ألم الحلق)' },
					{ term: 'examined', meaning: 'checked carefully (فحص)' }
				],
				tf: [
					{ q: 'Bilal had a toothache.', a: 'False', c: 'He had a bad cold, a sore throat, and a slight fever.', mark: '1' },
					{ q: 'Bilal\'s father took him to the clinic.', a: 'True', mark: '1' },
					{ q: 'The doctor advised Bilal to drink warm herbal tea with honey.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Why did Bilal catch a cold?\n2) How many days should Bilal rest at home?',
				whA: '1) Because he played outside in the cold rain without a coat.\n2) He should rest at home for two days.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: helpful / gentle = ......\nb) An opposite of: cold = ......',
				lexA: 'a) helpful / gentle = kind\nb) cold != warm',
				quizQ: 'What did the doctor tell Bilal NOT to do?',
				correctOpt: 'He should not drink cold water or go outside in the rain.',
				distractors: [
					{ text: 'He should not take his medicine.', diagnosticFeedback: 'The doctor told him to take his medicine on time.' },
					{ text: 'He should not drink warm tea with honey.', diagnosticFeedback: 'Warm herbal tea with honey was recommended.' },
					{ text: 'He should not rest at home.', diagnosticFeedback: 'He was advised to rest for two days.' }
				]
			}
		];

		const v = rng.pick(variants);
		const passage = buildEnglishPassageBlock({
			title: v.title,
			paragraphs: v.paragraphs,
			source: v.source,
			glossary: v.glossary
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — A/ Reading Comprehension',
			points: 7,
			instruction: 'Read the text carefully and do the following activities:',
			content: [
				passage,
				{ type: 'text', content: 'Task 1 (03 pts): Read the text and write "True" or "False":' },
				{ type: 'true_false', items: v.tf },
				{ type: 'text', content: v.whQ, answer: v.whA, mark: '2' },
				{ type: 'text', content: v.lexQ, answer: v.lexA, mark: '2' }
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'reading_comprehension',
			titleAr: `${this.titleAr} — ${v.title}`,
			examRole: 'comprehension',
			quizQuestion: {
				type: 'mcq',
				questionText: `In "${v.title}": ${v.quizQ}`,
				questionTextAr: `في نص "${v.title}": ${v.quizQ}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'انتبه لكميات التسوق والأعراض الصحية ونصائح الطبيب في النص.',
				'في True / False راجع النفي والإثبات بدقة.',
				'استخرج المرادف والضد من الفقرتين بنفس الصيغة.'
			],
			solutionStepsAr: [
				v.tf.map((item, i) => `${i + 1}) ${item.a}${item.c ? ` (${item.c})` : ''}`).join(' | '),
				v.whA,
				v.lexA
			],
			finalAnswer: v.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Part One B — Mastery of Language (07 pts) — some/any, much/many & /r/
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT2Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t2_expl_quantifiers_some_any',
	grade: '2am',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات: (some / any) و (How much / How many) ونطق حرف (/r/)',
	curriculumLessonId: 'eng_lesson_2am_t2_quantifiers_halal_diet',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with (some) or (any):\n1) We need ...... fresh dates for breakfast.\n2) Is there ...... olive oil in the bottle?\n3) There isn\'t ...... sugar in my herbal tea.\n4) My mother bought ...... oranges and apples.',
				task1Ans: '1) some   2) any   3) any   4) some',
				task2Prompt:
					'Task 2 (03 pts): Complete the questions with (How much) or (How many):\n1) ...... eggs do we need for the cake?\n2) ...... milk is there in the fridge?\n3) ...... is one kilo of figs?',
				task2Ans: '1) How many   2) How much   3) How much',
				phonWords: 'rice — water — carrot — market',
				pronR: ['rice', 'carrot'],
				silentR: ['water', 'market'],
				quizQ: 'Choose the right quantifier: "...... honey is there in the jar?"',
				correctOpt: 'How much',
				distractors: [
					{ text: 'How many', diagnosticFeedback: 'honey is uncountable and takes How much.' },
					{ text: 'How old', diagnosticFeedback: 'How old asks about age.' },
					{ text: 'Who much', diagnosticFeedback: 'Use How much for uncountable quantity.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Classify these food items into (Countable) and (Uncountable): honey, apple, bread, date.\n1) Countable: ......\n2) Uncountable: ......',
				task1Ans: '1) Countable: apple, date\n2) Uncountable: honey, bread',
				task2Prompt:
					'Task 2 (03 pts): Choose the right word between brackets:\n1) Are there (some / any) tomatoes in the basket?\n2) We drink (a lot of / many) clean water every day.\n3) (How much / How many) loaves of bread did father buy?',
				task2Ans: '1) any   2) a lot of   3) How many',
				phonWords: 'bread — doctor — orange — sport',
				pronR: ['bread', 'orange'],
				silentR: ['doctor', 'sport'],
				quizQ: 'In which word is the letter "r" SILENT in British English?',
				correctOpt: 'market',
				distractors: [
					{ text: 'carrot', diagnosticFeedback: 'In carrot, r is followed by a vowel (o) so it is pronounced.' },
					{ text: 'bread', diagnosticFeedback: 'In bread, r is followed by a vowel sound (ea) so it is pronounced.' },
					{ text: 'rice', diagnosticFeedback: 'In rice, r is followed by a vowel (i) so it is pronounced.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Match each food item with its container/unit: (jar, packet, loaf, litre)\n1) a ...... of honey   2) a ...... of couscous   3) a ...... of bread   4) a ...... of olive oil',
				task1Ans: '1) jar   2) packet   3) loaf   4) litre',
				task2Prompt:
					'Task 2 (03 pts): Spot and correct the mistake in each sentence:\n1) There are some fresh breads on the table.\n2) How many is a kilo of dates?\n3) We don\'t need some salt.',
				task2Ans: '1) There is some fresh bread on the table.\n2) How much is a kilo of dates?\n3) We don\'t need any salt.',
				phonWords: 'fresh — sugar — fruit — morning',
				pronR: ['fresh', 'fruit'],
				silentR: ['sugar', 'morning'],
				quizQ: 'Choose the grammatically correct sentence:',
				correctOpt: 'There is some honey, but there aren\'t any bananas.',
				distractors: [
					{ text: 'There are some honeys, but there isn\'t some bananas.', diagnosticFeedback: 'honey is uncountable (is), bananas is plural (aren\'t), and negative takes any.' },
					{ text: 'There is any honey, but there aren\'t some bananas.', diagnosticFeedback: 'Use some in affirmative and any in negative sentences.' },
					{ text: 'There is a honey and any banana.', diagnosticFeedback: 'Do not use a before uncountable honey.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: 'Pronounced /r/', words: s.pronR, mark: '1' },
				{ header: 'Silent /r/', words: s.silentR, mark: '1' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Do the following grammar and pronunciation activities:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify these words according to the pronunciation of the letter "r": (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'grammar_syntax',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'استعمل some في الإثبات، و any في النفي والسؤال.',
				'How many للمعدود الجمع، و How much لغير المعدود وللسؤال عن السعر.',
				'انظر بعد حرف r: إذا جاء بعده حرف علة فهو منطوق، وإذا جاء في النهاية أو قبل ساكن فهو صامت.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`Pronounced /r/: ${s.pronR.join(', ')} | Silent /r/: ${s.silentR.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — should, Imperative & Final -s
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT2Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t2_expl_should_imperative',
	grade: '2am',
	trimesterId: 't2',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): النصيحة (should / should not) وصيغة الأمر ونطق (-s)',
	curriculumLessonId: 'eng_lesson_2am_t2_advice_should_imperative',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Give health advice using (should) or (should not):\n1) You ...... brush your teeth after meals.\n2) You ...... eat too much fast food.\n3) You ...... drink clean water every day.\n4) You ...... stay up late at night.',
				task1Ans: '1) should   2) should not   3) should   4) should not',
				task2Prompt:
					'Task 2 (03 pts): Rewrite these health rules in the Imperative form:\n1) You should wash your hands before eating.\n2) You should not eat dirty fruit.\n3) You should sleep eight hours every night.',
				task2Ans: '1) Wash your hands before eating!\n2) Do not (Don\'t) eat dirty fruit!\n3) Sleep eight hours every night!',
				phonWords: 'carrots — olives — oranges — dates',
				sWords: ['carrots', 'dates'],
				zWords: ['olives'],
				izWords: ['oranges'],
				quizQ: 'Turn into the Negative Imperative: "You should not skip breakfast."',
				correctOpt: 'Don\'t skip breakfast!',
				distractors: [
					{ text: 'Not skip breakfast!', diagnosticFeedback: 'Negative imperative starts with Do not / Don\'t.' },
					{ text: 'Doesn\'t skip breakfast!', diagnosticFeedback: 'Always use Don\'t for imperative, never Doesn\'t.' },
					{ text: 'Don\'t skipping breakfast!', diagnosticFeedback: 'Use the base verb (skip) after Don\'t.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Match each health problem with the best advice:\n1) toothache : ......   2) fever : ......   3) stomachache : ......   4) obesity : ...... (Choices: rest and see a doctor, visit the dentist, avoid junk food and walk daily, drink warm herbal tea)',
				task1Ans: '1) visit the dentist   2) rest and see a doctor   3) drink warm herbal tea   4) avoid junk food and walk daily',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the correct form after (should / should not / Don\'t):\n1) Sami should (practise) ...... sport regularly.\n2) You should not (drink) ...... sugary sodas.\n3) Don\'t (forget) ...... to wash vegetables well!',
				task2Ans: '1) practise   2) drink   3) forget',
				phonWords: 'shops — bananas — peaches — nuts',
				sWords: ['shops', 'nuts'],
				zWords: ['bananas'],
				izWords: ['peaches'],
				quizQ: 'Choose the right advice for a friend with a toothache:',
				correctOpt: 'You should brush your teeth and visit the dentist.',
				distractors: [
					{ text: 'You should to eat more sweets.', diagnosticFeedback: 'No "to" after should, and sweets worsen toothache.' },
					{ text: 'You shouldn\'t brushing your teeth.', diagnosticFeedback: 'Always use the base verb after should/shouldn\'t.' },
					{ text: 'You should drinks cold soda.', diagnosticFeedback: 'Cold soda harms teeth and should takes base verb.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Reorder the words to get two health advices:\n1) eat / fresh / should / You / vegetables / .\n2) fast / Don\'t / food / eat / !',
				task1Ans: '1) You should eat fresh vegetables.\n2) Don\'t eat fast food!',
				task2Prompt:
					'Task 2 (03 pts): Correct the mistakes in these sentences:\n1) He shoulds eat dates and honey.\n2) You should not to stay awake late.\n3) Washes your hands before lunch!',
				task2Ans: '1) He should eat dates and honey.\n2) You should not stay awake late.\n3) Wash your hands before lunch!',
				phonWords: 'fruits — apples — dishes — markets',
				sWords: ['fruits', 'markets'],
				zWords: ['apples'],
				izWords: ['dishes'],
				quizQ: 'How is final "-s" pronounced in the word "dishes"?',
				correctOpt: '/iz/',
				distractors: [
					{ text: '/s/', diagnosticFeedback: 'Words ending in sh take /iz/.' },
					{ text: '/z/', diagnosticFeedback: 'sh is a sibilant sound that takes /iz/.' },
					{ text: 'Silent', diagnosticFeedback: 'The plural ending -es is pronounced /iz/.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/s/', words: s.sWords, mark: '1' },
				{ header: '/z/', words: s.zWords, mark: '0.5' },
				{ header: '/iz/', words: s.izWords, mark: '0.5' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Answer all grammar and pronunciation exercises carefully:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the words according to final "-s" pronunciation: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'grammar_syntax',
			titleAr: this.titleAr,
			examRole: 'text_exploration',
			quizQuestion: {
				type: 'mcq',
				questionText: s.quizQ,
				questionTextAr: s.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${s.correctOpt}`
			},
			sujetExercise,
			hints: [
				'استعمل should للنصيحة الإيجابية و should not للتحذير، متبوعتين بفعل مجرد.',
				'صيغة الأمر تبدأ بالفعل المجرد (Wash!) أو بـ Don\'t + فعل مجرد (Don\'t eat!).',
				'تذكّر حروف /s/ (p, t, k, f) وحروف /iz/ (s, sh, ch, x, z, ge).'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/s/: ${s.sWords.join(', ')} | /z/: ${s.zWords.join(', ')} | /iz/: ${s.izWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Part Two — Situation of Integration (06 pts) — Shopping / Health Advice
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT2: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t2_written_shopping_health',
	grade: '2am',
	trimesterId: 't2',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: حوار التسوق الصحي أو نصائح للمحافظة على الصحة (06 نقاط)',
	curriculumLessonId: 'eng_lesson_2am_t2_advice_should_imperative',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Your classmate eats a lot of junk food and suffers from stomachache and tiredness. Write a short advice letter helping them follow a healthy lifestyle.',
				notes: [
					'Greeting & sympathy: Dear friend, I hope you get well soon.',
					'Good food (should): eat fresh fruits, vegetables, dates, olives, honey, and drink water',
					'Bad habits (should not): avoid fast food, chips, and sugary sodas',
					'Imperative tips: Wash your hands! Practise sport! Sleep early!'
				],
				topicTwo: 'Write a polite shopping dialogue between you and a greengrocer buying vegetables and fruits for couscous.',
				modelAnswer:
					'Dear friend,\nI am sorry to hear that you have a stomachache. Good health is a great blessing, so you should take care of your body. First, you should eat a balanced diet with fresh fruits, vegetables, olives, dates, and pure honey. You should also drink plenty of clean water every day. Second, you should not eat junk food, chips, or sugary sodas. Wash your hands before meals, practise walking daily, and sleep early! I hope you feel better soon.\nBest wishes,\nHamza',
				quizQ: 'Which sentence combines good health advice and accurate grammar?',
				correctOpt: 'You should eat fresh fruits and you should not drink sugary sodas.',
				distractors: [
					{ text: 'You should to eating fresh fruits and not drink soda.', diagnosticFeedback: 'Use should + base verb without to or -ing.' },
					{ text: 'You shouldn\'t eat fresh fruits and should eat junk food.', diagnosticFeedback: 'Fresh fruits are healthy; junk food is unhealthy.' },
					{ text: 'Eat junk food and never wash your hands!', diagnosticFeedback: 'This is unhealthy advice.' }
				]
			},
			{
				prompt: 'Write a polite shopping dialogue at the local Algerian market between a customer and a shopkeeper to buy ingredients for a healthy family meal.',
				notes: [
					'Greeting: Good morning! Can I help you?',
					'Items: 2 kilos of tomatoes, 1 kilo of dates, 1 jar of honey, 1 packet of couscous',
					'Price question: How much is it? — 950 Algerian Dinars',
					'Polite closing: Here you are. Thank you! Goodbye!'
				],
				topicTwo: 'Write a short paragraph explaining how to prepare a healthy Algerian breakfast for middle school pupils.',
				modelAnswer:
					'Shopkeeper: Good morning! Can I help you?\nCustomer: Good morning! Yes, please. I would like two kilos of tomatoes and one kilo of fresh dates.\nShopkeeper: Anything else?\nCustomer: Yes, do you have any mountain honey and couscous?\nShopkeeper: Of course! Here is one jar of honey and one packet of couscous.\nCustomer: How much is it, please?\nShopkeeper: That is 950 Algerian Dinars.\nCustomer: Here you are. Thank you very much!\nShopkeeper: You are welcome. Goodbye!',
				quizQ: 'What is the polite way to ask the price at a market?',
				correctOpt: 'How much is it, please?',
				distractors: [
					{ text: 'How many is it?', diagnosticFeedback: 'Always use How much for price.' },
					{ text: 'Give me the price now!', diagnosticFeedback: 'Use polite language when shopping.' },
					{ text: 'How old is the price?', diagnosticFeedback: 'How old asks about age, not cost.' }
				]
			},
			{
				prompt: 'Your school health club is making a leaflet titled "Stay Clean, Stay Healthy". Write a short guide of 6 to 7 sentences for 2MS pupils.',
				notes: [
					'Cleanliness: wash hands before eating, brush teeth after meals',
					'Halal diet: wholegrain bread, olive oil, milk, dates, fresh vegetables',
					'Exercise & Rest: walk daily, sleep early',
					'Use should, should not, and Imperative verbs'
				],
				topicTwo: 'Write a short conversation between a doctor and a pupil who has a bad cold.',
				modelAnswer:
					'Good health helps us study well and stay happy. Every pupil should follow simple daily habits. First, wash your hands before and after meals, and brush your teeth regularly. Second, you should eat healthy foods such as wholegrain bread, olive oil, warm milk, dates, and fresh vegetables. You should not eat fast food or too many sweets. Finally, practise sport every week and sleep early. Don\'t forget: cleanliness and good food keep you strong!',
				quizQ: 'Which set of words belongs to a healthy Algerian diet?',
				correctOpt: 'dates, olive oil, pure honey, fresh vegetables, and couscous',
				distractors: [
					{ text: 'chips, sugary sodas, and too many candies', diagnosticFeedback: 'Those are unhealthy junk foods.' },
					{ text: 'pencils, notebooks, and rulers', diagnosticFeedback: 'Those are school supplies, not food.' },
					{ text: 'toothache, fever, and headache', diagnosticFeedback: 'Those are illnesses, not food.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance (2 pts) + Logical Flow / Dialogue Format (1.5 pts) + Grammar (should / Imperative / Quantifiers) (1.5 pts) + Spelling & Punctuation (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a clear, well-structured text or dialogue:',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'written_expression',
			titleAr: this.titleAr,
			examRole: 'written_expression',
			quizQuestion: {
				type: 'mcq',
				questionText: v.quizQ,
				questionTextAr: v.quizQ,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `Correct answer: ${v.correctOpt}`
			},
			sujetExercise,
			hints: [
				'في النصائح الصحية استعمل should / should not وصيغة الأمر (Wash! Don\'t eat!).',
				'في حوار التسوق استعمل عبارات الأدب (please, thank you) وأداة السؤال عن الثمن (How much is it?).',
				'اذكر أغذية صحية جزائرية (dates, olives, honey, couscous, fresh vegetables).'
			],
			solutionStepsAr: [
				'التمهيد للموضوع (التحية أو أهمية الصحة).',
				'عرض النصائح الصحية أو طلبات التسوق بوضوح وتنظيم.',
				'ختام لطيف ومراجعة القواعد وعلامات الترقيم.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T2: EnglishParameterizedTemplate[] = [
	comprehension2amT2,
	exploration2amT2Main,
	exploration2amT2Alt,
	written2amT2
];
