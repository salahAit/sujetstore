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
// Template 1: Part One A — Reading Comprehension (07 pts) — Travels in Algeria
// ═══════════════════════════════════════════════════════════════════════════════
const comprehension2amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t3_comp_algeria_travels',
	grade: '2am',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'فهم المكتوب: رحلاتي العائلية عبر مدن الجزائر (Me and My Travels)',
	curriculumLessonId: 'eng_lesson_2am_t3_past_future_holidays',
	defaultPoints: 7,
	examRole: 'comprehension',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				title: 'A Memorable Winter Trip to Ghardaia',
				source: 'Adapted 2MS Reading Text — Discovering Southern Algeria',
				paragraphs: [
					'Last winter holiday, my family and I travelled to Ghardaia in the south of Algeria by car. Ghardaia is warmer and sunnier than northern cities in winter. First, we visited the [[historic]] M-Zab Valley and admired its traditional white and yellow houses built on the hills.',
					'Then, we walked through the clean traditional market where local craftsmen sell hand-woven carpets and sweet dates. We ate delicious couscous and drank warm mint tea. Next spring, we will visit Tlemcen in the west. Our trip to Ghardaia was the most [[peaceful]] holiday of my life!'
				],
				glossary: [
					{ term: 'craftsmen', meaning: 'skilled traditional makers (الحرفيون)' },
					{ term: 'admired', meaning: 'looked at with pleasure (أُعجب بـ)' }
				],
				tf: [
					{ q: 'The family travelled to Ghardaia by train.', a: 'False', c: 'They travelled by car.', mark: '1' },
					{ q: 'Ghardaia is warmer than northern cities in winter.', a: 'True', mark: '1' },
					{ q: 'Next spring, the family will visit Tlemcen.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What did the family visit first in Ghardaia?\n2) What do local craftsmen sell in the traditional market?',
				whA: '1) First, they visited the historic M-Zab Valley.\n2) They sell hand-woven carpets and sweet dates.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: calm / quiet = ......\nb) An opposite of: colder = ......',
				lexA: 'a) calm / quiet = peaceful\nb) colder != warmer',
				quizQ: 'When did the writer\'s family travel to Ghardaia?',
				correctOpt: 'Last winter holiday.',
				distractors: [
					{ text: 'Next spring.', diagnosticFeedback: 'Next spring is their future plan for Tlemcen.' },
					{ text: 'Last summer.', diagnosticFeedback: 'Read line 1: it was last winter holiday.' },
					{ text: 'Yesterday morning.', diagnosticFeedback: 'The text specifies last winter holiday.' }
				]
			},
			{
				title: 'Our Upcoming Spring Holiday in Tlemcen',
				source: 'Adapted 2MS Reading Text — Travel Plans in Algeria',
				paragraphs: [
					'Next spring holiday, my parents and I are going to travel from Algiers to Tlemcen. We will stay there for five days at my uncle\'s [[spacious]] house. Tlemcen is one of the oldest and most beautiful cities in Algeria.',
					'First, we will pray at the Great Mosque of Tlemcen and walk around the historic walls of Mansourah. Then, we are going to visit the Lalla Setti plateau to see the [[green]] mountains and breathe fresh air. Finally, we will buy pure olive oil, honey, and traditional pottery as gifts for our grandparents.'
				],
				glossary: [
					{ term: 'plateau', meaning: 'high flat land (هضبة)' },
					{ term: 'pottery', meaning: 'clay dishes and crafts (الفخار)' }
				],
				tf: [
					{ q: 'The family is going to travel to Tlemcen next spring.', a: 'True', mark: '1' },
					{ q: 'They will stay in Tlemcen for ten days.', a: 'False', c: 'They will stay for five days.', mark: '1' },
					{ q: 'They will buy olive oil, honey, and pottery for their grandparents.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) Where will the family stay in Tlemcen?\n2) What historic places will they visit first?',
				whA: '1) They will stay at the writer\'s uncle\'s house.\n2) They will visit the Great Mosque of Tlemcen and the historic walls of Mansourah.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: big / large = ......\nb) An opposite of: newest = ......',
				lexA: 'a) big / large = spacious\nb) newest != oldest',
				quizQ: 'Why are they going to visit Lalla Setti plateau?',
				correctOpt: 'To see the green mountains and breathe fresh air.',
				distractors: [
					{ text: 'To swim in the sea.', diagnosticFeedback: 'Lalla Setti is a mountain plateau overlooking Tlemcen.' },
					{ text: 'To ride camels in the desert.', diagnosticFeedback: 'Tlemcen is in the green north-west of Algeria.' },
					{ text: 'To take a train to Europe.', diagnosticFeedback: 'Read paragraph 2: they want to see the green mountains and breathe fresh air.' }
				]
			},
			{
				title: 'From Constantine to Bejaia by Car',
				source: 'Adapted 2MS Reading Text — Discovering Algeria',
				paragraphs: [
					'Last summer, Youssef and his family went on a wonderful tour across eastern Algeria. First, they visited Constantine, the City of Bridges. Youssef took many photos of the [[high]] suspension bridges and learned about Imam Abdelhamid Ben Badis.',
					'After two days, they drove north to Bejaia on the Mediterranean coast. Bejaia was cooler and greener than inland towns. They visited Cap Carbon, walked near the [[clean]] sea, and ate fresh grilled fish. Youssef decided that Algeria is the best place for family holidays!'
				],
				glossary: [
					{ term: 'inland', meaning: 'away from the sea (داخلي بعيد عن البحر)' },
					{ term: 'coast', meaning: 'land beside the sea (الساحل)' }
				],
				tf: [
					{ q: 'Youssef\'s family toured eastern Algeria last summer.', a: 'True', mark: '1' },
					{ q: 'Bejaia was hotter than inland towns.', a: 'False', c: 'Bejaia was cooler and greener than inland towns.', mark: '1' },
					{ q: 'They ate fresh grilled fish in Bejaia.', a: 'True', mark: '1' }
				],
				whQ: 'Task 2 (02 pts): Answer the following questions from the text:\n1) What did Youssef photograph in Constantine?\n2) Which coastal landmark did they visit in Bejaia?',
				whA: '1) He photographed the high suspension bridges.\n2) They visited Cap Carbon.',
				lexQ: 'Task 3 (02 pts): Find in the text:\na) A synonym of: great / amazing = ......\nb) An opposite of: dirty = ......',
				lexA: 'a) great / amazing = wonderful\nb) dirty != clean',
				quizQ: 'How did Bejaia compare to inland towns during summer?',
				correctOpt: 'It was cooler and greener than inland towns.',
				distractors: [
					{ text: 'It was drier and hotter.', diagnosticFeedback: 'Paragraph 2 states it was cooler and greener.' },
					{ text: 'It was smaller and noisier.', diagnosticFeedback: 'The text highlights its cool, green coast.' },
					{ text: 'It had snow in summer.', diagnosticFeedback: 'Snow in summer is not mentioned.' }
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
			instruction: 'Read the text carefully and answer the questions:',
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
			trimesterId: 't3',
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
				'لاحظ زمن النص (رحلة سابقة بالماضي أم خطة قادمة بالمستقبل).',
				'انتبه لصفات المقارنة والتفضيل الواردة في وصف المدن الجزائرية.',
				'استخرج المرادف والضد من النص كما هما.'
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
// Template 2: Part One B — Mastery of Language (07 pts) — Past, Future & Final -ed
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT3Main: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t3_expl_past_future_ed',
	grade: '2am',
	trimesterId: 't3',
	domain: 'grammar_tenses',
	titleAr: 'قواعد اللغة والصوتيات: الماضي البسيط والمستقبل البسيط ونطق (-ed)',
	curriculumLessonId: 'eng_lesson_2am_t3_past_future_holidays',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Write the Past Simple of these verbs:\n1) visit : ......   2) go : ......   3) take : ......   4) stay : ......',
				task1Ans: '1) visited   2) went   3) took   4) stayed',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the Past Simple or Future Simple (will):\n1) Last summer, we (travel) ...... to Oran.\n2) Next winter, my family (visit) ...... Ghardaia.\n3) Yesterday, Bilal (not / go) ...... to the beach.',
				task2Ans: '1) travelled   2) will visit   3) did not (didn\'t) go',
				phonWords: 'walked — stayed — visited — packed',
				tWords: ['walked', 'packed'],
				dWords: ['stayed'],
				idWords: ['visited'],
				quizQ: 'Choose the correct tense: "Last spring, my parents ...... me to Tlemcen."',
				correctOpt: 'took',
				distractors: [
					{ text: 'will take', diagnosticFeedback: 'Last spring is in the past, not the future.' },
					{ text: 'taked', diagnosticFeedback: 'take is an irregular verb; its past is took.' },
					{ text: 'take', diagnosticFeedback: 'Use Past Simple (took) with Last spring.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Turn into the Negative form:\n1) We visited Tipaza last week.\n2) They will travel by plane tomorrow.',
				task1Ans: '1) We did not (didn\'t) visit Tipaza last week.\n2) They will not (won\'t) travel by plane tomorrow.',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs in the right tense (Past Simple or be going to):\n1) Last Friday, we (eat) ...... couscous at my grandmother\'s house.\n2) Tomorrow, Amine (buy) ...... a bus ticket to Constantine.\n3) Two days ago, I (see) ...... a documentary about Tassili.',
				task2Ans: '1) ate   2) is going to buy (or will buy)   3) saw',
				phonWords: 'stopped — travelled — decided — watched',
				tWords: ['stopped', 'watched'],
				dWords: ['travelled'],
				idWords: ['decided'],
				quizQ: 'How is final "-ed" pronounced in the verb "decided"?',
				correctOpt: '/id/',
				distractors: [
					{ text: '/t/', diagnosticFeedback: 'decide ends in the sound /d/, which takes /id/.' },
					{ text: '/d/', diagnosticFeedback: 'Verbs ending in /t/ or /d/ take /id/, not /d/.' },
					{ text: '/s/', diagnosticFeedback: '/s/ is for final -s, not final -ed.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Complete with the right time marker (yesterday / tomorrow / last year / next summer):\n1) We visited the Casbah of Algiers ...... (past).\n2) My family will go to Bejaia ...... (future).',
				task1Ans: '1) yesterday (or last year)   2) next summer (or tomorrow)',
				task2Prompt:
					'Task 2 (03 pts): Put the verbs between brackets in the right tense:\n1) Next month, we (visit) ...... the Bridges of Constantine.\n2) Last holiday, Meriem (buy) ...... dates from Biskra.\n3) Did you (enjoy) ...... your trip to Setif?',
				task2Ans: '1) will visit (or are going to visit)   2) bought   3) enjoy',
				phonWords: 'helped — arrived — started — booked',
				tWords: ['helped', 'booked'],
				dWords: ['arrived'],
				idWords: ['started'],
				quizQ: 'Choose the right question in the Past Simple:',
				correctOpt: 'Did you visit the Great Mosque of Tlemcen?',
				distractors: [
					{ text: 'Did you visited the Great Mosque of Tlemcen?', diagnosticFeedback: 'After Did, always use the base verb (visit).' },
					{ text: 'Do you visited the Great Mosque of Tlemcen?', diagnosticFeedback: 'Past questions use Did + base verb.' },
					{ text: 'Will you visited the Great Mosque of Tlemcen?', diagnosticFeedback: 'Never mix will with a past verb.' }
				]
			}
		];

		const s = rng.pick(sets);
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/t/', words: s.tWords, mark: '1' },
				{ header: '/d/', words: s.dWords, mark: '0.5' },
				{ header: '/id/', words: s.idWords, mark: '0.5' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, s.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Do the following grammar and pronunciation tasks:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify the verbs in the table according to final "-ed" pronunciation: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
			difficulty,
			domain: 'grammar_tenses',
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
				'استعمل الماضي البسيط مع (last, yesterday, ago) والمستقبل (will / going to) مع (next, tomorrow).',
				'بعد did / didn\'t و will / won\'t يرجع الفعل إلى أصله المجرد دائما.',
				'في نطق -ed: /id/ بعد (t, d)، و /t/ بعد (p, k, f, s, sh, ch)، و /d/ بعد البقية.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/t/: ${s.tWords.join(', ')} | /d/: ${s.dWords.join(', ')} | /id/: ${s.idWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Part One B (Alt) — Mastery of Language (07 pts) — Comparative, Superlative & -ed
// ═══════════════════════════════════════════════════════════════════════════════
const exploration2amT3Alt: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t3_expl_comp_super_ed',
	grade: '2am',
	trimesterId: 't3',
	domain: 'grammar_syntax',
	titleAr: 'قواعد اللغة والصوتيات (بديل): المقارنة والتفضيل (Comparative / Superlative) ونطق (-ed)',
	curriculumLessonId: 'eng_lesson_2am_t3_comparative_superlative',
	defaultPoints: 7,
	examRole: 'text_exploration',
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const sets = [
			{
				task1Prompt:
					'Task 1 (02 pts): Write the Comparative and Superlative of these adjectives:\n1) big : ...... than / the ......\n2) good : ...... than / the ......',
				task1Ans: '1) bigger than / the biggest   2) better than / the best',
				task2Prompt:
					'Task 2 (03 pts): Put the adjectives between brackets in the Comparative or Superlative:\n1) Ghardaia is (hot) ...... than Bejaia in summer.\n2) Algeria is (large) ...... country in Africa.\n3) Constantine is (historic) ...... than many modern towns.',
				task2Ans: '1) hotter   2) the largest   3) more historic',
				phonWords: 'washed — enjoyed — wanted — fixed',
				tWords: ['washed', 'fixed'],
				dWords: ['enjoyed'],
				idWords: ['wanted'],
				quizQ: 'Choose the right Superlative form: "Tassili is one of ...... places in the world."',
				correctOpt: 'the most beautiful',
				distractors: [
					{ text: 'the beautifulest', diagnosticFeedback: 'beautiful is a long adjective and takes the most.' },
					{ text: 'more beautiful', diagnosticFeedback: 'more beautiful is Comparative, not Superlative.' },
					{ text: 'most beautifuler', diagnosticFeedback: 'Never combine most with -er.' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Choose the right transport preposition (by / on) and sequencer (First / Finally):\n1) We travelled to Oran ...... train.\n2) We walked around the Casbah ...... foot.\n3) ......, we visited the mosque; ......, we returned home.',
				task1Ans: '1) by   2) on   3) First / Finally',
				task2Prompt:
					'Task 2 (03 pts): Spot and correct the mistake in each sentence:\n1) Algiers is more big than Tipaza.\n2) Couscous is the goodest traditional dish.\n3) Tlemcen is sunnier as London.',
				task2Ans: '1) Algiers is bigger than Tipaza.\n2) Couscous is the best traditional dish.\n3) Tlemcen is sunnier than London.',
				phonWords: 'liked — lived — needed — passed',
				tWords: ['liked', 'passed'],
				dWords: ['lived'],
				idWords: ['needed'],
				quizQ: 'Choose the right Comparative form: "The Sahara is ...... than the north in July."',
				correctOpt: 'hotter',
				distractors: [
					{ text: 'more hot', diagnosticFeedback: 'hot is a short adjective and takes -er.' },
					{ text: 'hoter', diagnosticFeedback: 'Double the final t in hot: hotter.' },
					{ text: 'the hottest', diagnosticFeedback: 'With than, use the Comparative (hotter).' }
				]
			},
			{
				task1Prompt:
					'Task 1 (02 pts): Write the Superlative form of each adjective:\n1) tall : ......\n2) famous : ......\n3) sunny : ......\n4) bad : ......',
				task1Ans: '1) the tallest   2) the most famous   3) the sunniest   4) the worst',
				task2Prompt:
					'Task 2 (03 pts): Complete the sentences with the right form of the adjective:\n1) Djamaa El Djazair has (tall) ...... minaret in the world.\n2) Travelling by plane is (fast) ...... than travelling by bus.\n3) Our trip to Ghardaia was (good) ...... holiday ever!',
				task2Ans: '1) the tallest   2) faster   3) the best',
				phonWords: 'worked — prayed — ended — laughed',
				tWords: ['worked', 'laughed'],
				dWords: ['prayed'],
				idWords: ['ended'],
				quizQ: 'Which verb has final "-ed" pronounced as /d/?',
				correctOpt: 'prayed',
				distractors: [
					{ text: 'worked', diagnosticFeedback: 'worked ends in k and takes /t/.' },
					{ text: 'ended', diagnosticFeedback: 'ended ends in d and takes /id/.' },
					{ text: 'laughed', diagnosticFeedback: 'laughed ends in /f/ and takes /t/.' }
				]
			}
		];

		const s = rng.pick(sets);
		const cleanDistractors = s.distractors;
		const phonTable = buildEnglishPhonologyTableBlock({
			columns: [
				{ header: '/t/', words: s.tWords, mark: '1' },
				{ header: '/d/', words: s.dWords, mark: '0.5' },
				{ header: '/id/', words: s.idWords, mark: '0.5' }
			]
		});
		const mcq = buildUniqueMcqOptions(s.correctOpt, cleanDistractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part One — B/ Mastery of Language',
			points: 7,
			instruction: 'Answer all grammar and pronunciation activities carefully:',
			content: [
				{ type: 'text', content: s.task1Prompt, answer: s.task1Ans, mark: '2' },
				{ type: 'text', content: s.task2Prompt, answer: s.task2Ans, mark: '3' },
				{
					type: 'text',
					content: `Task 3 (02 pts): Classify these regular past verbs according to final "-ed" pronunciation: (${s.phonWords})`
				},
				phonTable
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
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
				'الصفة القصيرة تأخذ (-er than / the -est) والصفة الطويلة تأخذ (more ... than / the most ...).',
				'احفظ الصفات الشاذة: good (better / the best) و bad (worse / the worst).',
				'في نطق -ed انظر دائما إلى آخر صوت منطوق قبل النهاية -ed.'
			],
			solutionStepsAr: [
				s.task1Ans,
				s.task2Ans,
				`/t/: ${s.tWords.join(', ')} | /d/: ${s.dWords.join(', ')} | /id/: ${s.idWords.join(', ')}`
			],
			finalAnswer: s.correctOpt
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Part Two — Situation of Integration (06 pts) — Guided Travel Email
// ═══════════════════════════════════════════════════════════════════════════════
const written2amT3: EnglishParameterizedTemplate = {
	id: 'eng_tpl_2am_t3_written_travel_email',
	grade: '2am',
	trimesterId: 't3',
	domain: 'written_expression',
	titleAr: 'الوضعية الإدماجية: بريد أو فقرة موجهة عن رحلة عائلية في الجزائر (06 نقاط)',
	curriculumLessonId: 'eng_lesson_2am_t3_guided_travel_email',
	defaultPoints: 6,
	examRole: 'written_expression',
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): EnglishGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const variants = [
			{
				prompt: 'Write a short email to your penfriend describing a wonderful past family holiday you spent in an Algerian city.',
				notes: [
					'When & Destination: Last spring, Tlemcen (west of Algeria), by car with family',
					'Itinerary: First, visited the Great Mosque of Tlemcen; Then, walked in the green mountains; Finally, bought dates, olives, and honey',
					'Comparison / Superlative: cleaner and quieter than big cities / the best trip',
					'Closing: Best wishes + your name'
				],
				topicTwo: 'Write a short paragraph describing your travel plans for next summer holiday in Algeria using "will" and "going to".',
				modelAnswer:
					'Dear friend,\nI am happy to tell you about my last spring holiday. My family and I travelled to Tlemcen in the west of Algeria by car. Tlemcen is quieter and greener than many big cities. First, we visited the Great Mosque of Tlemcen and prayed Dhuhr there. Then, we walked in the green mountains and enjoyed the fresh air. Finally, we ate delicious couscous and bought fresh dates, olives, and pure honey for our grandparents. It was the best trip ever!\nBest wishes,\nYoussef',
				quizQ: 'Which sentence correctly uses Past Simple and a sequencer for a past holiday?',
				correctOpt: 'First, we visited M-Zab Valley and took wonderful photos.',
				distractors: [
					{ text: 'First, we will visited M-Zab Valley and take photos.', diagnosticFeedback: 'Do not mix will with a past verb.' },
					{ text: 'First, we visit M-Zab Valley yesterday.', diagnosticFeedback: 'Use Past Simple (visited) for a past trip.' },
					{ text: 'Finally, we starting the trip first.', diagnosticFeedback: 'Finally comes at the end of the itinerary.' }
				]
			},
			{
				prompt: 'Next winter holiday, your family plans to visit Ghardaia in southern Algeria. Write a guided travel email telling your cousin about your itinerary.',
				notes: [
					'When & Transport: Next winter holiday, Ghardaia, by car',
					'Weather comparison: warmer and sunnier than the north',
					'Itinerary (will / going to): First, visit M-Zab Valley; Then, walk in the traditional market and buy dates; Finally, take family photos',
					'Closing: inviting your cousin to join or write back'
				],
				topicTwo: 'Write a short paragraph comparing two Algerian cities you know using comparative and superlative adjectives.',
				modelAnswer:
					'Dear cousin,\nI am excited to tell you about our travel plan for next winter holiday. My family and I are going to travel to Ghardaia by car. Ghardaia is warmer and sunnier than our city in winter. First, we will visit the historic M-Zab Valley and admire its traditional houses. Then, we are going to walk through the traditional market and buy sweet Algerian dates and hand-woven rugs. Finally, we will take nice family photos. It will be the most memorable holiday! Write back soon.\nBest wishes,\nAmina',
				quizQ: 'Which tense should you use when writing about "Next winter holiday"?',
				correctOpt: 'Future Simple (will + Verb) and "be going to + Verb".',
				distractors: [
					{ text: 'Past Simple (visited, went, saw).', diagnosticFeedback: 'Past Simple is for finished holidays, not next winter.' },
					{ text: 'Only Imperative verbs.', diagnosticFeedback: 'Travel plans use Future forms (will / going to).' },
					{ text: 'No verbs at all.', diagnosticFeedback: 'Every sentence needs a properly conjugated verb.' }
				]
			},
			{
				prompt: 'Write a short paragraph for your school magazine describing a weekend trip to Constantine and Algiers.',
				notes: [
					'When & Who: Last holiday, with my parents and brother',
					'Constantine: high suspension bridges, historic city',
					'Algiers: Djamaa El Djazair (the tallest minaret in the world) and the Casbah',
					'Food & Impression: ate traditional chorba and couscous / proud of Algeria'
				],
				topicTwo: 'Write a short email recommending Algeria as a peaceful destination for Muslim travellers.',
				modelAnswer:
					'Last holiday, I travelled with my parents and brother to Constantine and Algiers. First, we visited Constantine in the east. We walked across its high bridges and learned about its rich Islamic history. Then, we drove to Algiers, which is bigger than Constantine. We visited Djamaa El Djazair, which has the tallest minaret in the world, and walked through the historic Casbah. Finally, we ate delicious chorba and couscous. Algeria is truly the most wonderful country!',
				quizQ: 'Which sentence correctly uses a Superlative adjective about Djamaa El Djazair?',
				correctOpt: 'Djamaa El Djazair has the tallest minaret in the world.',
				distractors: [
					{ text: 'Djamaa El Djazair has the most tall minaret.', diagnosticFeedback: 'tall is a short adjective: the tallest.' },
					{ text: 'Djamaa El Djazair has taller minaret in the world.', diagnosticFeedback: 'Superlative needs the + -est (the tallest).' },
					{ text: 'Djamaa El Djazair has the tallest than minaret.', diagnosticFeedback: 'Never put than after a superlative.' }
				]
			}
		];

		const v = rng.pick(variants);
		const block = buildEnglishWrittenExpressionBlock({
			topicOnePrompt: v.prompt,
			topicOneNotes: v.notes,
			topicTwoPrompt: v.topicTwo,
			modelAnswer: v.modelAnswer,
			rubricSummary: 'Relevance & Itinerary Details (2 pts) + Cohesion & Sequencers (1.5 pts) + Tense Consistency & Comparatives/Superlatives (1.5 pts) + Spelling & Punctuation (1 pt).',
			mark: '6'
		});
		const mcq = buildUniqueMcqOptions(v.correctOpt, v.distractors, rng);

		const sujetExercise: ExerciseBlock = {
			customTitle: 'Part Two — Situation of Integration',
			points: 6,
			instruction: 'Write a well-organised travel email or paragraph (6 to 8 sentences):',
			content: [block]
		};

		return {
			templateId: this.id,
			seed,
			grade: '2am',
			trimesterId: 't3',
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
				'حدّد زمن الرحلة أولا (الماضي لـ Last... أو المستقبل لـ Next...) والتزم به في كامل النص.',
				'نظّم برنامج الرحلة بروابط الترتيب: First, / Then, / Finally,.',
				'أضف جملة مقارنة أو تفضيل واحدة على الأقل واختم بتحية وتوقيع.'
			],
			solutionStepsAr: [
				'تحديد الزمان والوجهة ووسيلة السفر (by car / by train).',
				'سرد محطات الرحلة باستعمال First, Then, Finally والزمن الموحد.',
				'توظيف مقارنة أو تفضيل وإبداء الانطباع الختامي مع التوقيع.'
			],
			finalAnswer: v.modelAnswer
		};
	}
};

export const TEMPLATES_2AM_T3: EnglishParameterizedTemplate[] = [
	comprehension2amT3,
	exploration2amT3Main,
	exploration2amT3Alt,
	written2amT3
];
