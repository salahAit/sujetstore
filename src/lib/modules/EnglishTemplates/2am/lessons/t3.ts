import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AM_T3: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Past Simple & Future Simple (will / going to) for Holidays
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t3_past_future_holidays',
		slug: 'eng-2am-t3-past-future-holidays',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وأسفاري — Me and My Travels',
		order: 1,
		titleAr: 'الماضي البسيط والمستقبل البسيط (Past Simple & Future will / going to)',
		objectives: [
			'تصريف الأفعال المنتظمة (-ed) والشاذة الشائعة في الماضي البسيط (Past Simple) لسرد رحلة سابقة',
			'استعمال المستقبل البسيط (will + Verb) والخطة المستقبلية (be going to + Verb) للتخطيط لعطلة قادمة',
			'التمييز الدقيق بين مؤشرات الماضي (yesterday, last) ومؤشرات المستقبل (tomorrow, next)'
		],
		keywordsAr: ['Past Simple', 'Regular & Irregular Verbs', 'Future Simple', 'will / going to', 'Holidays'],
		discover: {
			scenarioAr:
				'قارن بين حديث أيمن عن عطلته السابقة وعطلته القادمة: "Last summer, my family visited Tlemcen and went to the Great Mosque. Next winter, we will travel to Ghardaia, and we are going to see M-Zab Valley." لاحظ شكل الأفعال في الماضي والمستقبل.',
			svg: svgEnglishTenseTimeline({
				title: 'Past Holidays vs Future Plans',
				tenseName: 'Past Simple & Future',
				formula: 'Past: V-ed / Irregular  |  Future: will + V / going to + V',
				activeZone: 'future',
				example: 'Last year we visited Bejaia. Next year we will visit Ghardaia.',
				markers: 'Past: yesterday, last week/year, ago | Future: tomorrow, next summer, soon'
			}),
			steps: [
				{
					promptAr: 'ما الفعل المنتظم (Regular) وما الفعل الشاذ (Irregular) في جملة الماضي ("visited Tlemcen and went")؟',
					hintAr: 'أحدهما انتهى بـ (-ed) والآخر تغيّر شكله كليا من (go).',
					expectedInput: 'visited is regular, went is irregular',
					revealAr: 'الفعل "visited" منتظم (visit + ed)، أما "went" ففعل شاذ هو الماضي من "go".'
				},
				{
					promptAr: 'ما الصيغتان اللتان استعملهما أيمن للحديث عن رحلته القادمة في الشتاء المقبل (Next winter)؟',
					hintAr: 'ابحث عن الكلمتين قبل الفعلين travel و see.',
					expectedInput: 'will travel and are going to see',
					revealAr: 'استعمل المستقبل بـ "will + Verb" (will travel)، والخطة بـ "are going to + Verb" (are going to see).'
				},
				{
					promptAr: 'كيف ننفي جملة في الماضي البسيط وجملة في المستقبل البسيط؟',
					hintAr: 'في الماضي نستعمل did not، وفي المستقبل نستعمل will not.',
					expectedInput: 'didn\'t + verb / won\'t + verb',
					revealAr: 'نفي الماضي: didn\'t + الفعل المجرد (We didn\'t go). نفي المستقبل: will not (won\'t) + الفعل المجرد (We won\'t forget).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي البسيط (Past Simple): للحديث عن رحلات انتهت. مؤشراته: yesterday، last week / summer / year، ago، in 2024.',
				'تصريف الماضي: الأفعال المنتظمة نضيف لها (-ed): visit (visited)، travel (travelled)، stay (stayed). الأفعال الشاذة تُحفظ: go (went)، see (saw)، eat (ate)، take (took)، buy (bought)، be (was / were).',
				'نفي وسؤال الماضي: نستعمل (did not / didn\'t + مصدر مجرد) و (Did + فاعل + مصدر مجرد؟). مثال: Did you visit Oran? — Yes, I did.',
				'المستقبل البسيط (Future Simple): للتوقعات والوعود والرحلات القادمة: Subject + will (\'ll) + Verb — النفي: will not (won\'t) + Verb. مؤشراته: tomorrow، next week / holiday، soon، in 2027.',
				'الخطط المستقبلية المؤكدة: Subject + am / is / are + going to + Verb. مثال: We are going to visit Constantine next spring.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Past Simple vs Future Simple Cheat Sheet',
				rootLabel: 'Travel Tenses in 2MS',
				rootSub: 'Look at the time word: Last vs Next',
				branches: [
					{
						label: 'Past Simple (Last...)',
						rule: 'V-ed / Irregular | didn\'t + V',
						example: 'We went to Tlemcen.',
						color: '#1d4ed8'
					},
					{
						label: 'Future will (Next...)',
						rule: 'will + V | won\'t + V',
						example: 'We will visit Batna.',
						color: '#047857'
					},
					{
						label: 'Plan: going to',
						rule: 'am/is/are + going to + V',
						example: 'I am going to pack.',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'جدول المقارنة المختصر بين الماضي البسيط والمستقبل بـ will و going to',
			examples: [
				{
					problemAr: 'صرّف الأفعال بين قوسين: "Last holiday, we (go) to Tipaza and (take) nice photos. Next summer, we (visit) Constantine."',
					solutionAr: 'Last holiday, we went to Tipaza and took nice photos. Next summer, we will visit (or are going to visit) Constantine.'
				},
				{
					problemAr: 'حوّل إلى النفي: "Amine visited Annaba last month."',
					solutionAr: 'Amine did not (didn\'t) visit Annaba last month.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا في الامتحان: كتابة "didn\'t went" أو "will visits"! تذكّر دائما: بعد did / didn\'t وبعد will / won\'t وبعد going to يأتي الفعل في المصدر المجرد تماما!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "Last summer, my parents ...... me to Ghardaia."',
				options: ['take', 'taked', 'took', 'will take'],
				correctIndex: 2,
				diagnosticFeedback: [
					'take مضارع، و Last summer تدل على الماضي.',
					'الفعل take شاذ لا يقبل -ed.',
					'أحسنت! الماضي الشاذ من take هو took.',
					'will take للمستقبل وليس للماضي.'
				],
				explanationAr: 'بوجود Last summer نستعمل الماضي البسيط؛ والماضي من take هو took.'
			},
			{
				questionAr: 'أكمل الجملة: "Next spring, our class ...... the Casbah of Algiers."',
				options: ['visited', 'will visit', 'visiting', 'visits'],
				correctIndex: 1,
				diagnosticFeedback: [
					'visited للماضي، و Next spring للمستقبل.',
					'ممتاز! Next spring تدل على المستقبل فنستعمل will visit.',
					'ينقصها فعل مساعد وليست صيغة مستقبل كاملة.',
					'المضارع البسيط لا يناسب Next spring هنا.'
				],
				explanationAr: 'المؤشر Next spring يدل على المستقبل البسيط: will + Base Verb.'
			},
			{
				questionAr: 'اختر النفي الصحيح في الماضي: "We ...... to Oran last year."',
				options: [
					'didn\'t went',
					'didn\'t go',
					'don\'t go',
					'won\'t go'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد didn\'t نرجع الفعل إلى أصله (go) وليس went.',
					'أحسنت! didn\'t + الفعل المجرد (go).',
					'don\'t للمضارع، و last year للماضي.',
					'won\'t للمستقبل.'
				],
				explanationAr: 'في النفي بالماضي البسيط نكتب دائما: didn\'t + Base Verb (didn\'t go).'
			},
			{
				questionAr: 'أكمل خطة السفر: "Tomorrow, Hamza ...... buy a bus ticket to Setif."',
				options: ['is going to', 'are going to', 'going to', 'was going to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! Hamza مفرد غائب ومع Tomorrow نستعمل is going to.',
					'Hamza مفرد فلا يأخذ are.',
					'ينقصها فعل الكينونة is.',
					'was للماضي و Tomorrow للمستقبل.'
				],
				explanationAr: 'صيغة الخطة المستقبلية مع المفرد الغائب هي: is going to + Verb.'
			},
			{
				questionAr: 'ما الماضي البسيط للفعلين الشاذين (see) و (eat) على الترتيب؟',
				options: ['seed / eated', 'saw / ate', 'seen / eaten', 'sees / eats'],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلاهما شاذ لا يقبل -ed.',
					'أحسنت! الماضي من see هو saw، والماضي من eat هو ate.',
					'هاتان صيغتا اسم المفعول (Past Participle).',
					'هاتان صيغتا المضارع البسيط.'
				],
				explanationAr: 'في الماضي البسيط: see تصبح saw، و eat تصبح ate.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Comparative & Superlative Adjectives
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t3_comparative_superlative',
		slug: 'eng-2am-t3-comparative-superlative',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وأسفاري — Me and My Travels',
		order: 2,
		titleAr: 'صيغتا المقارنة والتفضيل (Comparative & Superlative Adjectives)',
		objectives: [
			'التمييز بين الصفة القصيرة (Short Adjective) والصفة الطويلة (Long Adjective)',
			'صياغة المقارنة بين شيئين (adj-er than / more + adj + than) لوصف مدن ومعالم الجزائر',
			'صياغة التفضيل المطلق (the adj-est / the most + adj) وحفظ الصفات الشاذة (good, bad)'
		],
		keywordsAr: ['Comparative', 'Superlative', 'bigger than', 'the most beautiful', 'Irregular Adjectives'],
		discover: {
			scenarioAr:
				'قارنت مريم بين بعض المدن الجزائرية قائلة: "Algiers is bigger than Tlemcen, and Constantine is more historic than many modern cities. Algeria is the largest country in Africa, and Tassili is one of the most beautiful places in the world." لاحظ صيغة المقارنة وصيغة التفضيل.',
			svg: svgEnglishGrammarMap({
				title: 'Comparative (2 Things) vs Superlative (3+ Things)',
				rootLabel: 'Count the Syllables of the Adjective',
				rootSub: 'Short (1 syllable) vs Long (2+ syllables)',
				branches: [
					{
						label: 'Short Comparative',
						rule: 'adj + -er + than',
						example: 'bigger than / warmer than',
						color: '#1d4ed8'
					},
					{
						label: 'Long Comparative',
						rule: 'more + adj + than',
						example: 'more beautiful than',
						color: '#047857'
					},
					{
						label: 'Short Superlative',
						rule: 'the + adj + -est',
						example: 'the largest / the highest',
						color: '#b45309'
					},
					{
						label: 'Long Superlative',
						rule: 'the most + adj',
						example: 'the most famous place',
						color: '#7c3aed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا قلنا "bigger than" مع (big) و "more historic than" مع (historic)؟',
					hintAr: 'قارن طول الكلمتين: big قصيرة (مقطع واحد) و historic طويلة (ثلاثة مقاطع).',
					expectedInput: 'short takes -er, long takes more',
					revealAr: 'الصفة القصيرة تأخذ (-er + than)، أما الصفة الطويلة فتسبق بـ (more ... than).'
				},
				{
					promptAr: 'ما الكلمة التي تأتي دائما قبل صيغة التفضيل (Superlative)؟',
					hintAr: 'تأمّل: ...... largest country / ...... most beautiful places.',
					expectedInput: 'the',
					revealAr: 'تُسبق صيغة التفضيل دائما بأداة التعريف "the": the largest / the most beautiful.'
				},
				{
					promptAr: 'لماذا ضاعفنا الحرف (g) في "bigger" (من big)؟',
					hintAr: 'تذكّر قاعدة (ساكن + علة + ساكن) في آخر الصفة القصيرة.',
					expectedInput: 'CVC doubling rule',
					revealAr: 'لأن big قصيرة وتنتهي بساكن + علة + ساكن (b-i-g)، فنضاعف الساكن الأخير: bigger / the biggest، ومثلها hot (hotter / the hottest).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المقارنة بين شيئين (Comparative + than): الصفة القصيرة نضيف لها (-er than) مثل: tall (taller than)، hot (hotter than)، clean (cleaner than). والصفة الطويلة نضع قبلها (more ... than) مثل: more beautiful than، more interesting than.',
				'التفضيل بين ثلاثة أو أكثر (the + Superlative): الصفة القصيرة تأخذ (the ...-est) مثل: the largest، the hottest، the oldest. والصفة الطويلة تأخذ (the most ...) مثل: the most famous، the most wonderful.',
				'الصفات القصيرة المنتهية بـ (y) مثل (sunny, friendly, busy): نقلب y إلى i ثم نضيف er / est: sunnier than / the sunniest.',
				'الصفات الشاذة المهمة (تُحفظ كما هي): good (better than / the best) — bad (worse than / the worst) — far (farther than / the farthest).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Irregular Adjectives & Spelling Changes',
				subtitle: 'Memorize these 3 exam favourites to avoid traps',
				columns: [
					{
						sound: 'good',
						rule: 'better than / the best',
						examples: 'Couscous is the best dish.',
						color: '#047857'
					},
					{
						sound: 'bad',
						rule: 'worse than / the worst',
						examples: 'Winter rain is worse today.',
						color: '#b45309'
					},
					{
						sound: 'CVC & -y',
						rule: 'big: bigger | sunny: sunnier',
						examples: 'the hottest / the sunniest',
						color: '#1d4ed8'
					}
				]
			}),
			visualCaptionAr: 'الصفات الشاذة وقواعد الإملاء الخاصة في المقارنة والتفضيل',
			examples: [
				{
					problemAr: 'أكمل بصيغة المقارنة أو التفضيل: 1) Ghardaia is (hot) ...... than Bejaia. 2) Djamaa El Djazair has (tall) ...... minaret in the world.',
					solutionAr: '1) hotter than. 2) the tallest minaret.'
				},
				{
					problemAr: 'صحّح الجملة: "Tlemcen is more old than my new town, and its mosque is the goodest."',
					solutionAr: 'Tlemcen is older than my new town, and its mosque is the best.'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين: لا تقل "more bigger" (إما bigger أو more + صفة طويلة فقط)، ولا تقل "gooder / the goodest" لأن الصفة good شاذة (better / the best)!'
		},
		practice: [
			{
				questionAr: 'اختر الصيغة الصحيحة: "The Sahara is ...... than the northern coast in summer."',
				options: ['more hot', 'hoter', 'hotter', 'the hottest'],
				correctIndex: 2,
				diagnosticFeedback: [
					'hot صفة قصيرة لا تأخذ more.',
					'يجب مضاعفة الحرف t في hot قبل إضافة er.',
					'أحسنت! نضاعف الحرف الأخير فتصبح hotter than.',
					'بوجود than نستعمل المقارنة وليس التفضيل.'
				],
				explanationAr: 'الصفة القصيرة hot (ساكن+علة+ساكن) تصبح في المقارنة hotter than.'
			},
			{
				questionAr: 'أكمل الجملة: "Algeria is ...... country in Africa."',
				options: ['larger than', 'the largest', 'the most large', 'large'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحن نفضّل الجزائر على كل دول إفريقيا وليس مقارنة بين دولتين.',
					'ممتاز! large صفة قصيرة فتصبح في التفضيل the largest.',
					'لا نستعمل most مع الصفة القصيرة large.',
					'يجب استعمال صيغة التفضيل.'
				],
				explanationAr: 'مع التفضيل المطلق والصفة القصيرة large نكتب: the largest.'
			},
			{
				questionAr: 'اختر المقارنة الصحيحة للصفة الطويلة (beautiful):',
				options: [
					'Bejaia is beautifuler than that town.',
					'Bejaia is more beautiful than that town.',
					'Bejaia is the most beautiful than that town.',
					'Bejaia is most beautiful than that town.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'beautiful صفة طويلة لا تأخذ -er.',
					'أحسنت! الصفة الطويلة في المقارنة تأخذ more + adj + than.',
					'لا نجمع بين the most وكلمة than.',
					'في المقارنة نستعمل more وليس most.'
				],
				explanationAr: 'الصفة الطويلة beautiful تصبح في المقارنة: more beautiful than.'
			},
			{
				questionAr: 'أكمل باستخدام الصفة الشاذة (good): "Travelling with my family is ...... holiday of all."',
				options: ['the goodest', 'better than', 'the best', 'the most good'],
				correctIndex: 2,
				diagnosticFeedback: [
					'good صفة شاذة لا تقبل -est.',
					'better للمقارنة بين شيئين فقط.',
					'ممتاز! التفضيل من good هو the best.',
					'لا نستعمل most مع good.'
				],
				explanationAr: 'الصفة الشاذة good تصبح في المقارنة better وفي التفضيل the best.'
			},
			{
				questionAr: 'ما صيغة التفضيل الصحيحة للصفة "famous" (مشهور)؟',
				options: ['the famousest', 'more famous', 'the most famous', 'famousest'],
				correctIndex: 2,
				diagnosticFeedback: [
					'famous صفة من مقطعين لا تأخذ -est.',
					'more famous للمقارنة وليست للتفضيل.',
					'أحسنت! الصفة الطويلة famous تأخذ في التفضيل the most famous.',
					'صيغة غير صحيحة.'
				],
				explanationAr: 'الصفة famous تأخذ the most famous في التفضيل (مثل: the most famous landmark).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: Final -ed Pronunciation (/t/, /d/, /id/)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t3_final_ed_pronunciation',
		slug: 'eng-2am-t3-final-ed-pronunciation',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وأسفاري — Me and My Travels',
		order: 3,
		titleAr: 'نطق (-ed) في نهاية الأفعال المنتظمة: /t/ و /d/ و /id/ (Final -ed Pronunciation)',
		objectives: [
			'إتقان القاعدة الصوتية لتصنيف الأفعال المنتظمة في الماضي إلى /t/ و /d/ و /id/',
			'تحديد الصوت الأخير للفعل المجرد قبل إضافة (-ed) بدقة تامة',
			'تحقيق العلامة الكاملة في جدول الصوتيات في امتحانات الفصل الثالث وما بعده'
		],
		keywordsAr: ['Final -ed', '/t/ /d/ /id/', 'Regular Past Verbs', 'Phonology Table'],
		discover: {
			scenarioAr:
				'سرد يوسف رحلته إلى بجاية قائلا: "We visited the mountains, walked near the sea, and stayed in a clean house." لاحظ أن الأفعال الثلاثة تنتهي بـ (-ed)، لكن نطقها مختلف: visited (/id/)، walked (/t/)، stayed (/d/)!',
			svg: svgEnglishPhoneticsChart({
				title: 'Final -ed Pronunciation Rules (/t/, /d/, /id/)',
				subtitle: 'Remove -ed first, then check the LAST SOUND of the verb',
				columns: [
					{
						sound: '/t/',
						rule: 'After: p, k, f, s, sh, ch, x',
						examples: 'walked, stopped, washed, watched',
						color: '#1d4ed8'
					},
					{
						sound: '/d/',
						rule: 'After: b, g, l, m, n, r, v, z, vowels',
						examples: 'stayed, travelled, prayed, lived',
						color: '#047857'
					},
					{
						sound: '/id/',
						rule: 'ONLY after: t or d',
						examples: 'visited, wanted, decided, needed',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الأخير في الفعل "visit" قبل إضافة (-ed)؟ ولماذا نطقنا النهاية /id/؟',
					hintAr: 'انظر العمود الثالث في البطاقة الصفراء.',
					expectedInput: 't — /id/',
					revealAr: 'الفعل "visit" ينتهي بالحرف "t"، وكل فعل ينتهي بصوت /t/ أو /d/ تُنطق نهايته /id/.'
				},
				{
					promptAr: 'ما الحرف الأخير في الفعل "walk" و "wash" قبل (-ed)؟ وفي أيّ عمود نضعهما؟',
					hintAr: 'انظر العمود الأول: p, k, f, s, sh, ch, x.',
					expectedInput: '/t/',
					revealAr: 'الحرفان k و sh من الأصوات المهموسة، لذلك تُنطق النهاية /t/: walked, washed.'
				},
				{
					promptAr: 'أين نصنّف "travelled" و "stayed" و "cleaned"؟',
					hintAr: 'هل تنتهي بـ t/d؟ لا. هل تنتهي بـ p, k, f, s, sh, ch؟ لا.',
					expectedInput: '/d/',
					revealAr: 'تُصنّف كلها في عمود /d/ لأن نهاياتها (l, ay, n) أصوات مجهورة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطوة الأولى دائما: احذف (-ed) (أو -d فقط إذا انتهى الفعل أصلا بـ e مثل live / decide) ثم انظر إلى الصوت الأخير في الفعل المجرد.',
				'عمود /id/ (الأسهل): فقط بعد صوتي (t) أو (d). أمثلة: visited, wanted, started, decided, needed, ended.',
				'عمود /t/: بعد الأصوات المهموسة السبعة (p, k, f / gh=f, s / ce, sh, ch, x). أمثلة: stopped, worked, walked, laughed, passed, washed, watched, fixed.',
				'عمود /d/: بعد جميع الأصوات المتبقية (b, g, l, m, n, r, v, z, w, y وكل حروف العلة). أمثلة: travelled, stayed, played, prayed, arrived, lived, enjoyed, cleaned.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Fast 3-Step Filter for Final -ed',
				rootLabel: 'Drop -ed and Check Last Sound',
				rootSub: 'Follow the 3 steps in exact order!',
				branches: [
					{
						label: '1. Ends in t or d?',
						rule: 'YES: /id/',
						example: 'visited, decided',
						color: '#b45309'
					},
					{
						label: '2. p, k, f, s, sh, ch?',
						rule: 'YES: /t/',
						example: 'walked, helped, washed',
						color: '#1d4ed8'
					},
					{
						label: '3. Everything Else',
						rule: 'Automatically: /d/',
						example: 'stayed, arrived, travelled',
						color: '#047857'
					}
				]
			}),
			visualCaptionAr: 'الطريقة المضمونة من ثلاث خطوات لحل جدول -ed في الاختبار دون أي تردد',
			examples: [
				{
					problemAr: 'صنّف الأفعال الأربعة في الجدول (/t/ , /d/ , /id/): arrived, packed, decided, watched.',
					solutionAr: '/t/: packed (k), watched (ch). /d/: arrived (v). /id/: decided (d).'
				},
				{
					problemAr: 'لماذا نصنّف "liked" في عمود /t/ بينما نصنّف "lived" في عمود /d/؟',
					solutionAr: 'لأن حرف e صامت؛ آخر صوت في like هو /k/ (/t/)، وآخر صوت في live هو /v/ (/d/).'
				}
			],
			watchOutAr:
				'انتبه للفعل "decided" و "invited": حرف (e) في آخر (decide / invite) صامت، فالصوت الأخير هو /d/ و /t/ ولذلك يُصنّفان في عمود /id/!'
		},
		practice: [
			{
				questionAr: 'في أيّ عمود نصنّف الفعل "visited"؟',
				options: ['/t/', '/d/', '/id/', '/s/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل visit ينتهي بـ t فيأخذ /id/ وليس /t/.',
					'الأفعال المنتهية بـ t أو d تأخذ /id/.',
					'أحسنت! بعد t و d تُنطق النهاية -ed بالصوت /id/.',
					'/s/ تخص نهاية المضارع والجمع وليس الماضي.'
				],
				explanationAr: 'الفعل visit ينتهي بحرف t، فتُنطق النهاية -ed مقطعا كاملا /id/.'
			},
			{
				questionAr: 'كيف تُنطق النهاية (-ed) في الفعل "stopped"؟',
				options: ['/t/', '/d/', '/id/', '/z/'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الحرف p مهموس فتُنطق النهاية /t/.',
					'الحرف p ليس مجهورا، بل مهموس يأخذ /t/.',
					'عمود /id/ خاص بحرفي t و d فقط.',
					'/z/ تخص النهاية -s.'
				],
				explanationAr: 'الأصل stop ينتهي بحرف p، وهو من حروف عمود /t/.'
			},
			{
				questionAr: 'اختر الفعل الذي تُنطق نهايته (-ed) بالصوت /d/:',
				options: ['walked', 'started', 'travelled', 'washed'],
				correctIndex: 2,
				diagnosticFeedback: [
					'walked تنتهي بـ k (عمود /t/).',
					'started تنتهي بـ t (عمود /id/).',
					'ممتاز! travel تنتهي بحرف l فتُنطق النهاية /d/.',
					'washed تنتهي بـ sh (عمود /t/).'
				],
				explanationAr: 'الفعل travel ينتهي بالصوت المجهور /l/ فيأخذ النهاية /d/.'
			},
			{
				questionAr: 'في أيّ عمود نصنّف الفعل "decided" (قرّر)؟',
				options: ['/t/', '/d/', '/id/', '/iz/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف المنطوق قبل d هو /d/ وليس من حروف /t/.',
					'انتبه! decide تنتهي بصوت /d/ فتأخذ /id/.',
					'أحسنت! الصوت الأخير في decide هو /d/ فتُنطق decided بـ /id/.',
					'/iz/ تخص النهاية -s.'
				],
				explanationAr: 'لأن decide تنتهي بصوت /d/ (وحرف e صامت)، تُنطق النهاية /id/.'
			},
			{
				questionAr: 'استخرج الكلمة الدخيلة (Odd one out) في نطق (-ed):',
				options: ['helped', 'booked', 'enjoyed', 'watched'],
				correctIndex: 2,
				diagnosticFeedback: [
					'helped (p) تُنطق /t/.',
					'booked (k) تُنطق /t/.',
					'صحيح! enjoyed تنتهي بصوت علة فتُنطق /d/، بينما البقية تُنطق /t/.',
					'watched (ch) تُنطق /t/.'
				],
				explanationAr: 'الأفعال helped, booked, watched كلها في عمود /t/، أما enjoyed ففي عمود /d/.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Guided Travel Email / Paragraph (6 pts)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t3_guided_travel_email',
		slug: 'eng-2am-t3-guided-travel-email',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وأسفاري — Me and My Travels',
		order: 4,
		titleAr: 'منهجية كتابة بريد أو فقرة عن رحلة في الجزائر (Guided Travel Email / Paragraph)',
		objectives: [
			'بناء بريد إلكتروني أو فقرة متماسكة حول رحلة عائلية في الجزائر (الماضي أو المستقبل)',
			'توظيف الروابط الزمنية (First, Then, Next, Finally) لتنظيم برنامج الرحلة (Itinerary)',
			'تطبيق معايير التنقيط الستة (6 pts) في الوضعية الإدماجية باللغة الإنجليزية'
		],
		keywordsAr: ['Travel Email', 'Itinerary', 'Sequencers', 'Past or Future Trip', 'Written Expression'],
		discover: {
			scenarioAr:
				'أرسلت حفصة بريدا لصديقتها تصف فيه رحلتها العائلية إلى تلمسان: "Dear Amina, Last spring, I travelled to Tlemcen with my family by car. First, we visited the Great Mosque of Tlemcen. Then, we ate delicious couscous and bought dates. Finally, we took wonderful photos. It was the best trip! Best wishes, Hafsa."',
			svg: svgEnglishWritingStructure({
				title: 'Guided Travel Email Blueprint (6 Points)',
				steps: [
					{ stage: '1. Opening', detail: 'Dear friend, / I am happy to tell you about my trip.' },
					{ stage: '2. When & Where', detail: 'Last summer / Next holiday, I went / will go to ...' },
					{ stage: '3. Itinerary', detail: 'First, ... Then, ... Next, ... Finally, ...' },
					{ stage: '4. Impression', detail: 'It was the most wonderful trip! Best wishes, Name.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمات الثلاث التي استعملتها حفصة لترتيب أحداث الرحلة من البداية إلى النهاية؟',
					hintAr: 'ابحث عن كلمات الترتيب الزمني (Sequencers) في بداية الجمل.',
					expectedInput: 'First, Then, Finally',
					revealAr: 'استعملت الروابط الزمنية: First (أولا)، Then (ثم)، Finally (أخيرا) مع فاصلة بعد كل منها!'
				},
				{
					promptAr: 'ما الزمن الذي استعملته حفصة في جميع أفعال البريد؟ ولماذا؟',
					hintAr: 'لاحظ كلمة "Last spring" في بداية البريد.',
					expectedInput: 'Past Simple',
					revealAr: 'استعملت الماضي البسيط (travelled, visited, ate, bought, took, was) لأن الرحلة وقعت في الربيع الماضي.'
				},
				{
					promptAr: 'لو طلبت الوضعية الإدماجية الحديث عن "Next summer" (الصيف القادم)، ما الزمن الذي نستعمله بدل الماضي؟',
					hintAr: 'تذكّر الدرس الأول من هذا الفصل.',
					expectedInput: 'Future Simple (will / going to)',
					revealAr: 'نستعمل المستقبل البسيط (will travel, will visit, are going to see) مع نفس الروابط: First, Then, Finally.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قبل الكتابة، حدّد زمن الوضعية من التعليمة: إذا كانت عن رحلة ماضية (Last holiday) استعمل Past Simple؛ وإذا كانت عن رحلة قادمة (Next holiday) استعمل Future Simple (will / going to).',
				'استعمل روابط الترتيب الزمني لبرنامج الرحلة: First, ... (أولا) — Then, ... (ثم) — After that, ... (بعد ذلك) — Finally, ... (أخيرا).',
				'وظّف صفة مقارنة أو تفضيل واحدة على الأقل لإثراء الفقرة: "Ghardaia is warmer than Algiers." أو "It was the most beautiful city."',
				'حافظ على عناصر البريد: التحية (Dear ...,) + المقدمة + العرض المرتّب بالروابط + الشعور والانطباع + الخاتمة والتوقيع (Best wishes, ...).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing the Right Tense for Your Travel Paragraph',
				rootLabel: 'Read the Prompt Carefully!',
				rootSub: 'One tense mistake costs points — check the cue!',
				branches: [
					{
						label: 'Past Trip (Last...)',
						rule: 'went, visited, saw, ate, was',
						example: 'Last spring, we visited Oran.',
						color: '#1d4ed8'
					},
					{
						label: 'Future Trip (Next...)',
						rule: 'will go, will visit, going to',
						example: 'Next winter, we will go south.',
						color: '#047857'
					},
					{
						label: 'Sequencers & Adjectives',
						rule: 'First, Then, Finally + best',
						example: 'It will be the best trip!',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'دليل اختيار الزمن الصحيح والروابط الزمنية لبريد أو فقرة الرحلات',
			examples: [
				{
					problemAr: 'رتّب برنامج الرحلة إلى قسنطينة باستعمال (First / Then / Finally): (visit the bridges / eat traditional dishes / buy souvenirs for grandmother).',
					solutionAr: 'First, we will visit the famous bridges of Constantine. Then, we will eat delicious traditional dishes. Finally, we will buy nice souvenirs for our grandmother.'
				},
				{
					problemAr: 'اكتب جملة انطباع ختامية باستعمال صيغة التفضيل (the most wonderful).',
					solutionAr: 'It was the most wonderful holiday with my family!'
				}
			],
			watchOutAr:
				'احذر من خلط الماضي والمستقبل داخل الفقرة الواحدة! إذا بدأت بـ "Last summer" اجعل كل أفعال البرنامج في الماضي، وإذا بدأت بـ "Next summer" اجعلها كلها في المستقبل.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب الصحيح لروابط السرد الزمني (Sequencers) في برنامج الرحلة؟',
				options: [
					'Finally, Then, First',
					'First, Then, Finally',
					'Then, Finally, First',
					'First, Finally, Then'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Finally تأتي في الأخير وليس في البداية.',
					'أحسنت! الترتيب المنطقي هو: First, ثم Then, ثم Finally.',
					'نبدأ دائما بـ First.',
					'Finally تأتي بعد Then في الختام.'
				],
				explanationAr: 'الروابط الزمنية تُرتّب تسلسليا: First (أولا) ثم Then / Next (ثم) ثم Finally (أخيرا).'
			},
			{
				questionAr: 'إذا طُلب منك كتابة بريد عن رحلتك في الصيف القادم (Next summer)، فأيّ جملة صحيحة؟',
				options: [
					'Next summer, we travelled to Bejaia.',
					'Next summer, we will travel to Bejaia.',
					'Next summer, we went to Bejaia.',
					'Next summer, we saw Bejaia.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'travelled ماضٍ ولا يناسب Next summer.',
					'ممتاز! مع Next summer نستعمل المستقبل البسيط will travel.',
					'went للماضي.',
					'saw للماضي.'
				],
				explanationAr: 'مع Next summer نستعمل صيغة المستقبل البسيط will + Verb.'
			},
			{
				questionAr: 'ما الجملة الصحيحة لتحديد وسيلة النقل في رحلة عائلية؟',
				options: [
					'We travelled in car.',
					'We travelled by car.',
					'We travelled at car.',
					'We travelled on car.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نستعمل حرف الجر by قبل وسائل النقل دون أداة.',
					'أحسنت! نقول دائما: by car, by bus, by train, by plane.',
					'at لا تستعمل مع وسائل النقل.',
					'نقول on foot (مشيا) ولكن by car.'
				],
				explanationAr: 'قبل وسائل النقل نستعمل حرف الجر by (by car, by bus, by train).'
			},
			{
				questionAr: 'ما العلامة التي نضعها مباشرة بعد كلمات الترتيب (First / Then / Finally) في بداية الجملة؟',
				options: ['علامة الاستفهام (?)', 'الفاصلة (,)', 'النقطة (.)', 'لا شيء أبدا'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه ليست جملا استفهامية.',
					'ممتاز! نضع فاصلة بعد كل رابط: First, we visited...',
					'النقطة توضع في نهاية الجملة.',
					'وضع الفاصلة بعد الرابط يجعل الترقيم سليما وأنيقا.'
				],
				explanationAr: 'تُتبع الروابط الزمنية في بداية الجملة بفاصلة: First, ... Then, ... Finally, ...'
			},
			{
				questionAr: 'أيّ عبارة تصلح لانطباع ختامي جميل عن رحلة سابقة إلى غرداية؟',
				options: [
					'It will be a cold day yesterday.',
					'It was an unforgettable and peaceful trip!',
					'Where are you going next week?',
					'Buy two kilos of dates please.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خلط غير صحيح بين will و yesterday.',
					'أحسنت! جملة ماضية معبّرة ومناسبة جدا لختام وصف رحلة.',
					'سؤال لا يناسب انطباع الرحلة السابقة.',
					'هذه جملة تسوق وليست وصف رحلة.'
				],
				explanationAr: 'في خاتمة رحلة ماضية نعبّر عن الانطباع بالماضي: It was an unforgettable trip!'
			}
		]
	}
];
