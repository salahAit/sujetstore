import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';

export const LESSONS_4AM_T2: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. The Superlative of Superiority (the + adj-est / the most + long adj)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t2_superlative_superiority',
		slug: 'eng-4am-t2-superlative-superiority',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا، شخصيتي وتجاربي في الحياة (Me, My Personality and Life Experiences)',
		order: 1,
		titleAr: 'صيغة التفضيل العليا في BEM (The Superlative of Superiority)',
		objectives: [
			'صياغة التفضيل الأعلى مع الصفات القصيرة (the + adj-est) والصفات الطويلة (the most + adj)',
			'حفظ واستعمال الصفات الشاذة في التفضيل (good: the best، bad: the worst، far: the farthest) بدقة في BEM'
		],
		keywordsAr: ['superlative', 'the -est', 'the most', 'the best', 'the worst', '4AM BEM'],
		discover: {
			scenarioAr:
				'اقرأ هذه الجمل من ذكريات تلميذ في السنة الرابعة متوسط: "Djamaa El Djazair has the tallest minaret in the world. My Arabic teacher was the most inspiring mentor I have ever met. That school day was the best memory of my childhood." قارن بين (the tallest) و (the most inspiring) و (the best)!',
			svg: svgEnglishGrammarMap({
				title: 'The Superlative of Superiority (4AM BEM)',
				rootLabel: 'Comparing ONE against a WHOLE GROUP (3 or more)',
				rootSub: 'ALWAYS include "the" before the superlative!',
				branches: [
					{ label: 'Short Adj (1 syl)', rule: 'the + adj + -est', example: 'the tallest / the oldest', color: '#1d4ed8' },
					{ label: 'Long Adj (2+ syl)', rule: 'the most + adj', example: 'the most famous / inspiring', color: '#047857' },
					{ label: 'Irregular Adjs', rule: 'Memorize for BEM!', example: 'good: the best | bad: the worst', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'لماذا أضفنا (-est) إلى (tall) فصارت (the tallest)، بينما استعملنا (the most) قبل (inspiring)؟',
					hintAr: 'قارن بين طول الصفتين (عدد المقاطع الصوتية).',
					expectedInput: 'tall صفة قصيرة فتأخذ -est، و inspiring صفة طويلة فتأخذ the most',
					revealAr: 'الصفة القصيرة (مقطع واحد مثل tall, old, kind) تأخذ (the + adj-est)، والصفة الطويلة (مقطعان فأكثر مثل inspiring, unforgettable, generous) تأخذ (the most + adj).'
				},
				{
					promptAr: 'ما الكلمة الصغيرة التي تسبق صيغة التفضيل العليا دائماً في الإنجليزية؟',
					hintAr: 'أداة التعريف من ثلاثة حروف.',
					expectedInput: 'the',
					revealAr: 'أداة التعريف (the) إلزامية قبل كل صيغة تفضيل عليا: the oldest, the most famous, the best.'
				},
				{
					promptAr: 'كيف نصوغ التفضيل من الصفات المنتهية بـ (y) مثل (happy) و (friendly)؟',
					hintAr: 'نقلب الحرف y إلى i قبل إضافة -est.',
					expectedInput: 'the happiest و the friendliest',
					revealAr: 'إذا انتهت الصفة بحرف ساكن + y، نقلب y إلى i ثم نضيف -est: happy (the happiest), easy (the easiest).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصفات القصيرة (Short Adjectives): the + adj + -est (مثال: the tallest, the oldest, the kindest). مع مضاعفة الساكن الأخير في صيغة CVC مثل: big (the biggest), hot (the hottest).',
				'الصفات المنتهية بـ (consonant + y): نقلب y إلى i ونضيف -est: happy (the happiest), funny (the funniest), tidy (the tidiest).',
				'الصفات الطويلة (Long Adjectives): the most + adjective (مثال: the most unforgettable, the most respected, the most beautiful).',
				'الصفات الشاذة الأساسية في BEM: good (the best)، bad (the worst)، far (the farthest / the furthest)، much/many (the most)، little (the least).'
			],
			visualSvg: svgEnglishWordFormation({
				title: 'Spelling Rules for Short Superlatives',
				prefix: 'the',
				root: 'happy / big',
				suffix: '-iest / -gest',
				derivedWord: 'the happiest  |  the biggest',
				meaningNote: 'Drop y for -iest | Double final consonant in short CVC adjectives'
			}),
			visualCaptionAr: 'التغيرات الإملائية الدقيقة عند صياغة التفضيل الأعلى من الصفات القصيرة',
			examples: [
				{
					problemAr: 'ضع الصفة في صيغة التفضيل العليا: "Imam Ben Badis is one of (great) and (influential) scholars in Algeria."',
					solutionAr: 'Imam Ben Badis is one of the greatest and most influential scholars in Algeria.'
				},
				{
					problemAr: 'ضع الصفة الشاذة في التفضيل: "Winning the Quran competition was (good) experience in my life."',
					solutionAr: 'Winning the Quran competition was the best experience in my life.'
				}
			],
			watchOutAr:
				'أخطاء شائعة في BEM يجب تجنبها: لا تكتب (the most tallest) أبداً (لا نجمع بين most و -est!)، ولا تكتب (the goodest) بل (the best)، ولا تنسَ أداة التعريف (the)!'
		},
		practice: [
			{
				questionAr: 'اختر الصيغة الصحيحة: "Reading is ...... useful habit a pupil can develop."',
				options: ['the usefulest', 'the most useful', 'most useful', 'the more useful'],
				correctIndex: 1,
				diagnosticFeedback: [
					'useful صفة من مقطعين لا تأخذ -est.',
					'أحسنت! the most + صفة طويلة (useful).',
					'تنقصها أداة التعريف the.',
					'more للمقارنة بين اثنين وليس للتفضيل الأعلى.'
				],
				explanationAr: 'الصفة useful طويلة (مقطعان) فتأخذ: the most useful.'
			},
			{
				questionAr: 'أكمل الجملة بالصفة الشاذة الصحيحة: "My primary school teacher was ...... mentor I have ever had."',
				options: ['the goodest', 'the better', 'the best', 'the most good'],
				correctIndex: 2,
				diagnosticFeedback: [
					'good صفة شاذة لا تأخذ -est.',
					'better للمقارنة بين اثنين فقط.',
					'ممتاز! التفضيل الأعلى من good هو the best.',
					'لا نضع most قبل الصفة الشاذة good.'
				],
				explanationAr: 'التصريف الشاذ للصفة good: good / better / the best.'
			},
			{
				questionAr: 'ما التفضيل الأعلى الصحيح للصفة (big) والصفة (happy)؟',
				options: [
					'the bigest / the happyest',
					'the biggest / the happiest',
					'the most big / the most happy',
					'biggest / happiest'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نضاعف حرف g في big ونقلب y إلى i في happy.',
					'صحيح! the biggest و the happiest.',
					'كلتا الصفتين قصيرتان فلا نستخدم most.',
					'ينقصها أداة التعريف the.'
				],
				explanationAr: 'نضاعف الساكن في big (the biggest) ونقلب y إلى i في happy (the happiest).'
			},
			{
				questionAr: 'اختر الجملة الخالية من الأخطاء النحوية:',
				options: [
					'Algeria is the most largest country in Africa.',
					'Algeria is the largest country in Africa.',
					'Algeria is largest country in Africa.',
					'Algeria is the larger country in Africa.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نجمع بين most و -est أبداً.',
					'ممتاز! large تنتهي بـ e فنضيف -st مع the: the largest.',
					'تنقصها أداة التعريف the.',
					'larger للمقارنة بين بلدين فقط.'
				],
				explanationAr: 'الصفة large قصيرة وتنتهي بـ e فنكتب: the largest.'
			},
			{
				questionAr: 'ما التفضيل الأعلى الصحيح للصفة (bad)؟',
				options: ['the baddest', 'the worse', 'the worst', 'the most bad'],
				correctIndex: 2,
				diagnosticFeedback: [
					'bad صفة شاذة لا تأخذ -est.',
					'worse للمقارنة بين اثنين.',
					'صحيح! التفضيل الأعلى من bad هو the worst.',
					'لا نستخدم most مع bad.'
				],
				explanationAr: 'التصريف الشاذ للصفة bad: bad / worse / the worst.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. The Present Perfect Tense (have/has + P.P with ever, never, just, since, for)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t2_present_perfect',
		slug: 'eng-4am-t2-present-perfect',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا، شخصيتي وتجاربي في الحياة (Me, My Personality and Life Experiences)',
		order: 2,
		titleAr: 'المضارع التام للتعبير عن التجارب الحياتية (The Present Perfect)',
		objectives: [
			'تصريف الأفعال في المضارع التام (have / has + Past Participle) للتعبير عن تجارب حياتية ممتدة إلى الحاضر',
			'الاستعمال الدقيق للمؤشرات الزمنية (ever, never, just, already, since, for) والتمييز الحاسم بين since و for'
		],
		keywordsAr: ['Present Perfect', 'have/has + P.P', 'ever', 'never', 'just', 'since', 'for'],
		discover: {
			scenarioAr:
				'اقرأ هذا الحوار بين تلميذين عن تجاربهما: "Have you ever visited Timgad?" — "No, I have never visited Timgad, but I have just returned from Tlemcen! I have studied English for four years, since 2022." لاحظ الفرق بين (for four years) و (since 2022)!',
			svg: svgEnglishTenseTimeline({
				title: 'Life Experiences & Continuing Duration',
				tenseName: 'Present Perfect (have / has + P.P)',
				formula: 'S + have / has + Past Participle (V3)',
				activeZone: 'past_to_present',
				example: 'Meriem has memorized ten hizbs of the Quran since 2021.',
				markers: 'ever, never, just, already, yet, since (start point), for (duration)'
			}),
			steps: [
				{
					promptAr: 'ما الفعلان المساعدان في المضارع التام؟ ومتى نستعمل (has) ومتى نستعمل (have)؟',
					hintAr: 'راجع الضمائر: He/She/It مقابل I/You/We/They.',
					expectedInput: 'has مع he/she/it، و have مع I/you/we/they',
					revealAr: 'نستعمل (has + P.P) مع المفرد الغائب (He, She, It)، و (have + P.P) مع (I, You, We, They).'
				},
				{
					promptAr: 'أين وضعنا الكلمات (ever, never, just) في جمل المضارع التام؟',
					hintAr: 'هل جاءت قبل التصريف الثالث أم بعده؟',
					expectedInput: 'بين have/has والتصريف الثالث (P.P)',
					revealAr: 'تقع (ever / never / just / already) مباشرة قبل التصريف الثالث: Have you ever visited...? / I have never seen... / She has just finished...'
				},
				{
					promptAr: 'لماذا استعملنا (for) مع (four years) واستعملنا (since) مع (2022)؟',
					hintAr: 'إحداهما تدل على طول المدة، والأخرى على نقطة البداية.',
					expectedInput: 'for لطول المدة و since لنقطة البداية',
					revealAr: 'قاعدة BEM الذهبية: (for + duration مدة محسوبة: for 4 years, for two weeks)، و (since + starting point نقطة بداية: since 2022, since Monday, since childhood).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصيغة: Affirmative: S + have/has + P.P | Negative: S + have/has + not + P.P (أو never + P.P) | Question: Have/Has + S + (ever) + P.P?',
				'ever (في السؤال عن التجربة: Have you ever travelled?) | never (للنفي عن التجربة دون not: I have never failed) | just (لفعل انتهى للتو: He has just arrived).',
				'التمييز الحاسم في BEM بين since و for: تأتي (since) قبل نقطة بداية محددة (since 2019, since last year, since I was ten)، وتأتي (for) قبل مدة زمنية محسوبة (for three years, for a long time, for two hours).',
				'الفرق بين Present Perfect و Past Simple: إذا ذُكر تاريخ ماضٍ منتهٍ (yesterday, in 2018, last summer, ago) نستعمل Past Simple؛ أما إذا كانت التجربة عامة أو ممتدة للحاضر فنستعمل Present Perfect.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Present Perfect Markers in BEM Exams',
				rootLabel: 'have / has + Past Participle (V3)',
				rootSub: 'Watch out: ever/never/just go BEFORE the Past Participle',
				branches: [
					{ label: 'ever / never / just', rule: 'Experience & recent action', example: 'Have you ever read it?', color: '#1d4ed8' },
					{ label: 'SINCE (Start Point)', rule: 'Exact starting date/event', example: 'since 2020 / since childhood', color: '#047857' },
					{ label: 'FOR (Duration)', rule: 'Length / period of time', example: 'for 4 years / for two days', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'خريطة مؤشرات المضارع التام والفرق الذهبي بين since و for في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'أكمل بـ (since) أو (for): "Sheikh Moubarek El Mili books have inspired readers ...... decades, ...... the 1930s."',
					solutionAr: 'for decades (مدة) | since the 1930s (نقطة بداية).'
				},
				{
					problemAr: 'صرّف الفعلين: "My brother (just / win) first prize, and I (never / feel) so proud!"',
					solutionAr: 'My brother has just won first prize, and I have never felt so proud!'
				}
			],
			watchOutAr:
				'لا تستعمل (not) مع (never) أبداً! خطأ: "I have not never visited Ghardaia." الصواب: "I have never visited Ghardaia." ولا تنسَ حفظ التصاريف الثالثة الشاذة (see: seen, write: written, go: gone/been, win: won, be: been).'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "Have you ever ...... The Great Mosque of Tlemcen?"',
				options: ['visit', 'visited', 'visiting', 'visits'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد Have نحتاج إلى التصريف الثالث (P.P).',
					'أحسنت! Have + Subject + ever + Past Participle (visited).',
					'لا نستعمل -ing بعد Have في المضارع التام البسيط.',
					'لا نستعمل المضارع البسيط بعد Have.'
				],
				explanationAr: 'في المضارع التام الاستفهامي: Have you ever + Past Participle?'
			},
			{
				questionAr: 'أكمل الجملة بـ (since) أو (for): "We have lived in Constantine ...... ten years."',
				options: ['since', 'for', 'ago', 'just'],
				correctIndex: 1,
				diagnosticFeedback: [
					'since تُستعمل مع نقطة البداية (مثل 2016) لا مع عدد السنوات.',
					'ممتاز! ten years مدة زمنية محسوبة فتأخذ for.',
					'ago تُستعمل مع الماضي البسيط في آخر الجملة.',
					'just تعني للتو ولا تسبق مدة زمنية.'
				],
				explanationAr: 'تأتي (for) قبل المدة الزمنية (for ten years).'
			},
			{
				questionAr: 'أكمل الجملة: "Khadidja has kept her childhood diary ...... 2020."',
				options: ['for', 'since', 'ever', 'never'],
				correctIndex: 1,
				diagnosticFeedback: [
					'2020 نقطة بداية وليست مدة.',
					'صحيح! 2020 سنة بداية محددة فتأخذ since.',
					'ever تُستعمل في السؤال عن التجربة.',
					'never تأتي قبل التصريف الثالث للنفي.'
				],
				explanationAr: 'تأتي (since) قبل نقطة البداية المحددة (since 2020).'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحوياً:',
				options: [
					'Amine has just finish his project.',
					'Amine have just finished his project.',
					'Amine has just finished his project.',
					'Amine just has finished his project.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نحتاج إلى التصريف الثالث finished.',
					'Amine مفرد غائب فيأخذ has وليس have.',
					'ممتاز! Amine (مفرد) + has + just + finished (P.P).',
					'just تقع بين has و finished.'
				],
				explanationAr: 'الترتيب الصحيح: Subject + has + just + Past Participle.'
			},
			{
				questionAr: 'اختر الجملة المنفية السليمة بـ (never):',
				options: [
					'They have not never travelled to the Sahara.',
					'They have never travelled to the Sahara.',
					'They never has travelled to the Sahara.',
					'They have never travel to the Sahara.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نجمع بين not و never.',
					'أحسنت! They + have + never + travelled.',
					'They تأخذ have وليس has.',
					'نحتاج إلى التصريف الثالث travelled.'
				],
				explanationAr: 'نستعمل (have / has + never + Past Participle) دون كلمة not.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Past Continuous vs Past Simple (while / when) in Life Stories
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t2_past_cont_vs_simple',
		slug: 'eng-4am-t2-past-cont-vs-simple',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا، شخصيتي وتجاربي في الحياة (Me, My Personality and Life Experiences)',
		order: 3,
		titleAr: 'الماضي المستمر والماضي البسيط (while / when) في سرد الذكريات',
		objectives: [
			'الجمع المتقن بين الماضي المستمر (was/were + V-ing) والماضي البسيط في سرد التجارب والذكريات المدرسية',
			'التمييز بين حالتي (حدث طويل يقطعه حدث قصير) و (حدثين طويلين متزامنين) في نصوص BEM'
		],
		keywordsAr: ['Past Continuous', 'Past Simple', 'while', 'when', 'childhood memories'],
		discover: {
			scenarioAr:
				'اقرأ هذا المقطع من ذكريات طالبة: "While I was revising for my primary exam, my teacher entered the library and handed me a book about Fatima al-Fihri. Meanwhile, my classmates were preparing their posters." لاحظ تداخل الأزمنة في الجملتين!',
			svg: svgEnglishTenseTimeline({
				title: 'Narrative Tenses in Life Memories (4AM)',
				tenseName: 'Past Continuous vs Past Simple',
				formula: 'While + S + was/were + V-ing, S + Past Simple',
				activeZone: 'two_past',
				example: 'I was feeling nervous when our headmaster announced my name.',
				markers: 'while, as (long background) | when (short sudden event)'
			}),
			steps: [
				{
					promptAr: 'أي الفعلين يمثل الحدث المستمر في الخلفية: (was revising) أم (entered)؟',
					hintAr: 'المراجعة تستغرق وقتاً طويلاً أما الدخول فلحظي.',
					expectedInput: 'was revising (الماضي المستمر)',
					revealAr: 'الفعل (was revising) هو الحدث الطويل المستمر، بينما (entered) و (handed) حدثان قصيران قاطعان في الماضي البسيط.'
				},
				{
					promptAr: 'في الجملة الثانية، لماذا صرّفنا (were preparing) في الماضي المستمر مع أن الفاعل جمع؟',
					hintAr: 'my classmates جمع وكان تحضيرهم مستمراً بالتزامن مع المراجعة.',
					expectedInput: 'لأنه حدث طويل مستمر والفاعل جمع فيأخذ were + V-ing',
					revealAr: 'مع الجمع (you, we, they, classmates) نستعمل دائماً (were + V-ing).'
				},
				{
					promptAr: 'ما الأخطاء الإملائية التي يجب تجنبها عند إضافة (-ing) للأفعال: (write / sit / study)؟',
					hintAr: 'في write نحذف e، وفي sit نضاعف t، وفي study نُبقي y.',
					expectedInput: 'writing / sitting / studying',
					revealAr: 'write (writing بحذف e)، sit (sitting بمضاعفة t)، study (studying دون حذف y).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الحدث القاطع (Interruption): While / As + Past Continuous (was/were + V-ing), Past Simple — أو: Past Continuous + when + Past Simple.',
				'الحدثان المتزامنان الطويلان (Simultaneous Actions): While + Past Continuous, Past Continuous (مثال: While my mother was sewing, my father was reading history).',
				'تصريف النفي والسؤال في الماضي المستمر: was not / were not + V-ing | Was / Were + Subject + V-ing?',
				'إملاء (-ing) المهم في BEM: نحذف (e) الصامتة (make: making)، نضاعف الساكن في مقطع CVC قصير (run: running, plan: planning)، ولا نحذف (y) أبداً (study: studying, try: trying).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing Between Past Simple & Past Continuous',
				rootLabel: 'Ask: Was the action LONG (in progress) or SHORT (sudden)?',
				rootSub: 'Use While for Long | Use When for Short',
				branches: [
					{ label: 'Long + Short', rule: 'While + was/were+ing, V2', example: 'While I was reading, he knocked.', color: '#1d4ed8' },
					{ label: 'Short after When', rule: 'was/were+ing + when + V2', example: 'We were playing when it rained.', color: '#047857' },
					{ label: 'Long + Long', rule: 'While + was/were+ing, was/were+ing', example: 'While I was writing, Ali was drawing.', color: '#7c3aed' }
				]
			}),
			visualCaptionAr: 'القواعد الثلاث السريعة لاختيار الزمن الماضي الصحيح في تمارين شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين: "When the rain (start), the volunteers (plant) olive trees."',
					solutionAr: 'When the rain started, the volunteers were planting olive trees.'
				},
				{
					problemAr: 'صرّف الفعلين: "While I (write) my BEM essay, my little brother (sleep) quietly."',
					solutionAr: 'While I was writing my BEM essay, my little brother was sleeping quietly.'
				}
			],
			watchOutAr:
				'في BEM: انتبه للأفعال غير الحركية (Stative Verbs مثل know, believe, love, want) فهي لا تُستعمل عادةً في الماضي المستمر بل في الماضي البسيط (I knew the answer — وليس I was knowing).'
		},
		practice: [
			{
				questionAr: 'صرّف الفعلين بدقة: "I ...... my homework when my grandfather ...... with a gift."',
				options: [
					'did / was arriving',
					'was doing / arrived',
					'were doing / arrived',
					'was doing / was arriving'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدث الطويل (حل الواجب) في الماضي المستمر والوصول في الماضي البسيط.',
					'ممتاز! was doing للحدث المستمر، و arrived للحدث القاطع بعد when.',
					'الضمير I يأخذ was وليس were.',
					'الوصول حدث قصير لحظي يأتي في الماضي البسيط.'
				],
				explanationAr: 'Past Continuous (was doing) + when + Past Simple (arrived).'
			},
			{
				questionAr: 'أكمل الجملة: "While the pupils ...... attentively, the headmaster praised their discipline."',
				options: ['listened', 'was listening', 'were listening', 'are listening'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد While يأتي الماضي المستمر.',
					'the pupils جمع فتأخذ were وليس was.',
					'صحيح! جمع + were + listening.',
					'السياق في الماضي (praised).'
				],
				explanationAr: 'الفاعل جمع (the pupils) وبعد While نستعمل: were listening.'
			},
			{
				questionAr: 'ما الإملاء الصحيح لصيغة (-ing) للأفعال (write / plan / study)؟',
				options: [
					'writeing / planing / studing',
					'writing / planning / studying',
					'writting / planning / studying',
					'writing / planing / studyying'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحذف e في write ونضاعف n في plan ونبقي y في study.',
					'أحسنت! writing و planning و studying سليمة إملائياً 100%.',
					'لا نضاعف t في write لأن العلة طويلة.',
					'نضاعف n في plan ولا نضاعف y في study.'
				],
				explanationAr: 'الإملاء القياسي: writing, planning, studying.'
			},
			{
				questionAr: 'اختر الرابط الصحيح: "Our teacher was explaining Ibn Battuta journey ...... the bell rang."',
				options: ['while', 'when', 'because', 'so'],
				correctIndex: 1,
				diagnosticFeedback: [
					'قرع الجرس حدث قصير في الماضي البسيط فيناسبه when.',
					'ممتاز! when تسبق الحدث القصير القاطع (the bell rang).',
					'because للسبب.',
					'so للنتيجة.'
				],
				explanationAr: 'نربط الماضي المستمر بالحدث القصير القاطع بـ when.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة لحدثين طويلين متزامنين في الماضي:',
				options: [
					'While Salma was memorizing Surah Yasin, her mother was cooking couscous.',
					'While Salma memorized Surah Yasin, her mother cooked couscous.',
					'While Salma was memorizing Surah Yasin, her mother cooks couscous.',
					'While Salma were memorizing Surah Yasin, her mother were cooking couscous.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! حدثان طويلان في نفس الوقت: كلاهما في الماضي المستمر (was memorizing / was cooking).',
					'الأفضل للحدثين المستمرين المتزامنين هو الماضي المستمر مع While.',
					'cooks في الحاضر وهو يخالف سياق الماضي.',
					'Salma و mother مفردان فيأخذان was وليس were.'
				],
				explanationAr: 'الحدثان المتزامنان الطويلان بعد While يأتيان معاً في الماضي المستمر.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Prefixes of Opposites (un-, in-, im-, il-, ir-, dis-) & Suffixes (-ful, -less)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t2_prefixes_suffixes',
		slug: 'eng-4am-t2-prefixes-suffixes',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا، شخصيتي وتجاربي في الحياة (Me, My Personality and Life Experiences)',
		order: 4,
		titleAr: 'بادئات الأضداد (un-, in-, im-, il-, ir-, dis-) ولواحق (-ful / -less) في BEM',
		objectives: [
			'صياغة أضداد الصفات بدقة باستعمال البادئات الستة المقررة في BEM حسب الحرف الأول من الجذر',
			'اشتقاق صفات إيجابية وسلبية من الأسماء باستعمال اللاحقتين (-ful = مليء بـ) و (-less = خالٍ من)'
		],
		keywordsAr: ['prefixes', 'un-', 'in-', 'im-', 'il-', 'ir-', 'dis-', '-ful', '-less'],
		discover: {
			scenarioAr:
				'تأمّل هذه الأزواج من صفات الشخصية في BEM: (polite / impolite) — (legal / illegal) — (responsible / irresponsible) — (honest / dishonest) — (helpful / helpless). لاحظ العلاقة بين الحرف الأول من الصفة والبادئة التي أضفناها!',
			svg: svgEnglishWordFormation({
				title: 'Word Formation in 4AM BEM (Prefix + Root + Suffix)',
				prefix: 'un- / dis- / im-',
				root: 'help / polite / honest',
				suffix: '-ful / -less',
				derivedWord: 'helpful / helpless  |  impolite  |  dishonest',
				meaningNote: 'Prefixes change MEANING (opposite) | Suffixes form ADJECTIVES'
			}),
			steps: [
				{
					promptAr: 'ما الحروف الأولى التي تجعلنا نختار البادئة (im-)، أو (il-)، أو (ir-)؟',
					hintAr: 'انظر إلى أول حرف في polite/possible و legal/logical و responsible/regular.',
					expectedInput: 'im- قبل m/p/b، و il- قبل l، و ir- قبل r',
					revealAr: 'قاعدة صوتية سهلة الحفظ في BEM: (im-) قبل (p, m, b) مثل impolite, immoral؛ (il-) قبل (l) مثل illegal, illiterate؛ و (ir-) قبل (r) مثل irresponsible, irregular!'
				},
				{
					promptAr: 'ما البادئة المستعملة مع (honest / loyal / obedient / agree)؟',
					hintAr: 'تبدأ بـ d وتتكون من ثلاثة حروف.',
					expectedInput: 'dis-',
					revealAr: 'نستعمل (dis-) فنحصل على: dishonest, disloyal, disobedient, disagree.'
				},
				{
					promptAr: 'ما الفرق في المعنى بين (careful) و (careless)، وبين (useful) و (useless)؟',
					hintAr: '-ful تعني (full of)، و -less تعني (without).',
					expectedInput: '-ful تفيد الإيجاب والامتلاء و -less تفيد النفي والعدم',
					revealAr: 'اللاحقة (-ful) تعني مليء بالصفة (careful = حريص، hopeful = متفائل)، أما (-less) فتعني بدونها (careless = مهمل، hopeless = يائس).'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة البادئات السهلة في BEM: 1) im- قبل (p, m): impolite, impatient, impossible, immature. 2) il- قبل (l): illegal, illogical, illiterate. 3) ir- قبل (r): irregular, irresponsible, irrelevant.',
				'البادئة (dis-): dishonest, disloyal, disobedient, disrespectful, dislike, disagree.',
				'البادئة (un-): الأكثر شيوعاً مع الصفات: unhappy, unkind, unfriendly, unfair, unforgettable, tidy (untidy), helpful (unhelpful).',
				'البادئة (in-): incorrect, inactive, independent, incapable, formal (informal), direct (indirect).',
				'اللاحقتان (-ful / -less): تُضافان للاسم لتكوين صفتين متضادتين غالباً: help (helpful / helpless)، care (careful / careless)، hope (hopeful / hopeless)، use (useful / useless)، harm (harmful / harmless). مع قلب y إلى i في beauty (beautiful).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Negative Prefixes Rule Map (BEM Guaranteed Points)',
				rootLabel: '6 Negative Prefixes in 4AM',
				rootSub: 'Check first letter first (m/p: im, l: il, r: ir)',
				branches: [
					{ label: 'im- / il- / ir-', rule: 'p,m: im | l: il | r: ir', example: 'impolite, illegal, irregular', color: '#1d4ed8' },
					{ label: 'dis-', rule: 'Moral & verb opposites', example: 'dishonest, disloyal, disagree', color: '#047857' },
					{ label: 'un- / in-', rule: 'Common adj opposites', example: 'unkind, unfair | incorrect', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'خريطة بادئات الأضداد الستة لضمان العلامة الكاملة في سؤال الصرف بشهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'أعطِ أضداد الصفات الآتية بإضافة بادئة مناسبة: (patient - regular - loyal - literate - fair - active).',
					solutionAr: 'impatient - irregular - disloyal - illiterate - unfair - inactive.'
				},
				{
					problemAr: 'اشتق صفة بـ (-ful) أو (-less) حسب السياق: "Smoking is (harm) ...... to health, while charity is (use) ...... to society."',
					solutionAr: 'harmful (مضر) | useful (نافع).'
				}
			],
			watchOutAr:
				'احذر بعض الاستثناءات الشهيرة في BEM: كلمة (pleasant) تأخذ (unpleasant) وليس im-، وكلمة (popular) تأخذ (unpopular)، وكلمة (reliable) تأخذ (unreliable) رغم بدئها بـ r! واحذر أن (helpful) ضدها (unhelpful) أو (helpless) حسب السياق.'
		},
		practice: [
			{
				questionAr: 'ما الضد الصحيح للصفات الثلاث (polite / legal / responsible) على الترتيب؟',
				options: [
					'unpolite / inlegal / unresponsible',
					'impolite / illegal / irresponsible',
					'dispolite / illegal / disresponsible',
					'impolite / inlegal / irresponsible'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'p تأخذ im-، و l تأخذ il-، و r تأخذ ir-.',
					'أحسنت! impolite و illegal و irresponsible.',
					'لا نستعمل dis- مع polite أو responsible.',
					'legal تبدأ بـ l فتأخذ il- (illegal).'
				],
				explanationAr: 'القاعدة: p تأخذ im-، l تأخذ il-، r تأخذ ir-.'
			},
			{
				questionAr: 'ما البادئة الصحيحة لتكوين ضد كلمتي (honest) و (obedient)؟',
				options: ['un-', 'in-', 'dis-', 'im-'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نقول unhonest.',
					'لا نقول inhonest.',
					'ممتاز! dishonest و disobedient.',
					'لا تبدآن بـ p أو m.'
				],
				explanationAr: 'تأخذ honest و obedient و loyal و respectful البادئة dis-.'
			},
			{
				questionAr: 'أكمل الجملة بالصفة المناسبة: "A ...... driver causes accidents because he does not respect traffic signs."',
				options: ['careful', 'careless', 'hopeful', 'useful'],
				correctIndex: 1,
				diagnosticFeedback: [
					'careful تعني حذر وهو عكس السياق.',
					'صحيح! careless تعني مهمل (بدون حذر).',
					'hopeful تعني متفائل.',
					'useful تعني مفيد.'
				],
				explanationAr: 'اللاحقة -less تفيد غياب الصفة: careless = مهمل.'
			},
			{
				questionAr: 'ما الصفة المشتقة الصحيحة من كلمة (beauty) باستعمال اللاحقة (-ful)؟',
				options: ['beautyful', 'beautiful', 'beautiless', 'beautful'],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب قلب y إلى i قبل إضافة -ful.',
					'أحسنت! beauty تصبح beautiful (بقلب y إلى i ولام واحدة).',
					'هذه ليست الكلمة الصحيحة.',
					'نقلب y إلى i لا نحذفها تماماً.'
				],
				explanationAr: 'تنتهي beauty بحرف ساكن + y، لذا نقلب y إلى i فنكتب beautiful (بـ l واحدة).'
			},
			{
				questionAr: 'أي كلمة مما يلي ضدها يأخذ البادئة (in-)؟',
				options: ['correct', 'happy', 'polite', 'regular'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! incorrect (وكذلك inactive و independent).',
					'happy تأخذ un- (unhappy).',
					'polite تأخذ im- (impolite).',
					'regular تأخذ ir- (irregular).'
				],
				explanationAr: 'ضد correct هو incorrect.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Pronunciation of Final -s (/s/, /z/, /iz/) & Silent Letters (BEM)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t2_final_s_silent_letters',
		slug: 'eng-4am-t2-final-s-silent-letters',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا، شخصيتي وتجاربي في الحياة (Me, My Personality and Life Experiences)',
		order: 5,
		titleAr: 'نطق النهاية -s (/s/, /z/, /iz/) والحروف الصامتة (k, w, h, l, t, b) في BEM',
		objectives: [
			'تصنيف الكلمات المنتهية بـ -s / -es بدقة في الجدول الصوتي لشهادة التعليم المتوسط (نقطتان مضمونتان)',
			'استخراج الحروف الصامتة الستة الأكثر وروداً في BEM (k, w, h, l, t, b) داخل الكلمات الشائعة'
		],
		keywordsAr: ['final -s', '/s/', '/z/', '/iz/', 'silent letters', 'BEM phonology'],
		discover: {
			scenarioAr:
				'في أغلب مواضيع شهادة التعليم المتوسط، يختتم جزء قواعد اللغة بسؤال صوتي مضمون (02 pts): إما تصنيف (-s) كما في (books, memories, experiences, hopes)، أو استخراج الحرف الصامت كما في (climb, know, honest, listen, should, write)!',
			svg: svgEnglishPhoneticsChart({
				title: 'BEM Final -s / -es Classification (2 Guaranteed Pts)',
				subtitle: 'Focus on the LAST SPOKEN SOUND before -s',
				columns: [
					{ sound: '/s/', rule: 'p, t, k, f, ph, gh=/f/, th', examples: 'hopes, monuments, books, laughs', color: '#1d4ed8' },
					{ sound: '/z/', rule: 'vowels & b,d,g,l,m,n,r,v', examples: 'memories, heroes, dreams, skills', color: '#047857' },
					{ sound: '/iz/', rule: 's, ss, sh, ch, x, z, ce, ge', examples: 'experiences, bridges, teaches', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'لماذا نضع كلمتي (experiences) و (bridges) في العمود /iz/؟',
					hintAr: 'ما الصوت الأخير المنطوق قبل -s في experience (/s/) وفي bridge (/dʒ/)؟',
					expectedInput: 'لأنهما تنتهيان بصوت صفيري (ce / ge)',
					revealAr: 'الكلمات المنتهية بـ (-ce) أو (-ge) مثل (experiences, places, bridges, languages, villages) تنتهي بصوت صفيري فتُصنّف دائماً في /iz/!'
				},
				{
					promptAr: 'لماذا نضع كلمة (memories) وكلمة (stories) في العمود /z/؟',
					hintAr: 'آخر صوت قبل s هو صوت علة (i: / i).',
					expectedInput: 'لأن جميع حروف العلة مجهورة وتأخذ /z/',
					revealAr: 'كل جمع ينتهي بـ (-ies) مثل (memories, stories, countries, cities) تُنطق نهايته /z/ دائماً.'
				},
				{
					promptAr: 'ما الحرف الصامت في كلمتي (climb) و (doubt)؟',
					hintAr: 'حرف يقع بعد m في climb وقبل t في doubt.',
					expectedInput: 'الحرف b',
					revealAr: 'الحرف (b) صامت في (climb, comb, thumb, lamb, doubt, debt) — وهو من الحروف الصامتة المتكررة في BEM!'
				}
			]
		},
		summary: {
			rulesAr: [
				'النهاية (-s): /s/ بعد (p, t, k, f, ph, gh=/f/, th المهموسة) مثل: monuments, books, hopes, paragraphs.',
				'النهاية (-s): /iz/ بعد (s, ss, sh, ch, x, z, ce, ge) مثل: experiences, places, bridges, mosques? احذر: mosque تنتهي بصوت /k/ فتُصنّف (mosques) في /s/!',
				'النهاية (-s): /z/ بعد الأصوات المجهورة وحروف العلة (-ies, -ays, -oes, b, d, g, l, m, n, r, v) مثل: memories, dreams, scholars, heroes.',
				'خريطة الحروف الصامتة الستة في BEM: (k) قبل n (know, knowledge) | (w) قبل r وفي answer/two (write, wrong) | (h) في hour/honest/honour/what/where | (l) في walk/talk/calm/half/should/would/could | (t) في listen/castle/often/fasten | (b) في climb/comb/thumb/doubt/debt.'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: '6 Silent Letters Frequently Tested in BEM',
				subtitle: 'Read silently and spot the unspoken letter',
				columns: [
					{ sound: 'Silent k / w', rule: 'kn- | wr-, answer', examples: 'know, knife | write, answer', color: '#1d4ed8' },
					{ sound: 'Silent h / b', rule: 'honest | -mb, -bt', examples: 'hour, honour | climb, doubt', color: '#047857' },
					{ sound: 'Silent l / t', rule: '-lk, -lm, -ld | -sten', examples: 'walk, should | listen, castle', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'ملخص الحروف الصامتة الستة الأكثر حضوراً في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'صنّف كلمات BEM الآتية في جدول (-s): (mosques - bridges - memories - monuments - teaches - scholars).',
					solutionAr: '/s/: mosques (آخر صوت /k/), monuments | /z/: memories, scholars | /iz/: bridges, teaches.'
				},
				{
					problemAr: 'حدّد الحرف الصامت في كل كلمة: (doubt - honour - knowledge - castle).',
					solutionAr: 'doubt: (b) | honour: (h) | knowledge: (k) | castle: (t).'
				}
			],
			watchOutAr:
				'فخّان شهيران في BEM: 1) كلمة (mosques) تنتهي بصوت /k/ فتُوضع في /s/ وليس /iz/! 2) كلمة (memories / countries / stories) تنتهي بصوت علة فتُوضع في /z/ وليس /iz/!'
		},
		practice: [
			{
				questionAr: 'في أي عمود نصنّف كلمة (experiences) وكلمة (villages)؟',
				options: ['/s/', '/z/', '/iz/', '/id/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'تنتهيان بـ -ce و -ge وهي أصوات صفيرية.',
					'الأصوات الصفيرية تأخذ /iz/ لا /z/.',
					'ممتاز! كلاهما ينتهي بصوت صفيري فيُصنّف في /iz/.',
					'/id/ خاص بنهاية -ed.'
				],
				explanationAr: 'الكلمات المنتهية بـ -ce و -ge تأخذ /iz/.'
			},
			{
				questionAr: 'في أي عمود نصنّف كلمة (mosques)؟',
				options: ['/s/', '/z/', '/iz/', 'صامتة'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الصوت الأخير قبل s في mosque هو /k/ المهموس فتُنطق /s/.',
					'/k/ صوت مهموس وليس مجهوراً.',
					'انتبه: -que تُنطق /k/ وليس صوتاً صفيرياً.',
					'النهاية -s منطوقة بوضوح.'
				],
				explanationAr: 'مقطع -que في mosque يُنطق /k/، وبعد /k/ تُنطق النهاية /s/.'
			},
			{
				questionAr: 'في أي عمود نصنّف كلمة (memories)؟',
				options: ['/s/', '/z/', '/iz/', '/t/'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يوجد صوت مهموس قبل -s.',
					'صحيح! الجمع المنتهي بـ -ies يسبقه صوت علة مجهور فيأخذ /z/.',
					'لا تخلط بين -ies (تأخذ /z/) وبين /iz/!',
					'/t/ خاص بنهاية -ed.'
				],
				explanationAr: 'memories تنتهي بصوت علة قبل -s فتأخذ /z/.'
			},
			{
				questionAr: 'ما الحرف الصامت في كلمتي (climb) و (doubt)؟',
				options: ['m', 'b', 'c', 't'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف m منطوق في climb.',
					'ممتاز! الحرف b صامت بعد m في climb وقبل t في doubt.',
					'الحرف c منطوق /k/.',
					'الحرف t منطوق في نهاية doubt.'
				],
				explanationAr: 'الحرف b صامت في (-mb) مثل climb و comb، وفي (-bt) مثل doubt و debt.'
			},
			{
				questionAr: 'أي مجموعة تحتوي جميع كلماتها على حرف صامت صحيح؟',
				options: [
					'know (k) - honest (h) - should (l) - listen (t)',
					'keep (k) - help (h) - clean (l) - tree (t)',
					'write (r) - walk (k) - climb (m) - hour (r)',
					'book (k) - water (w) - home (h) - light (l)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! كل الحروف الأربعة بين قوسين صامتة فعلاً.',
					'جميع هذه الحروف منطوقة بوضوح.',
					'الحروف الصامتة هنا هي w و l و b و h وليست المذكورة.',
					'هذه الحروف منطوقة في الكلمات المذكورة.'
				],
				explanationAr: 'know (silent k), honest (silent h), should (silent l), listen (silent t).'
			}
		]
	}
];
