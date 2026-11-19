import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — yearSubjectId: 770, coeff 3, 7+8+5=20)
 * Interactive Lessons — Trimester 1: Unit 1 "Exploring the Past" (5 lessons)
 */
export const LESSONS_3AS_LP_T1: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Past Habits, Obligations & Abilities (used to, had to, was/were able to)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t1_past_habits_abilities',
		slug: 'eng-3as-lp-t1-past-habits-abilities',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية)',
		order: 1,
		titleAr: 'العادات والالتزام والقدرة في الماضي: used to / had to / was able to',
		objectives: [
			'التعبير عن عادة ماضية انتهت باستعمال used to وصيغتي النفي والاستفهام منها',
			'التمييز بين الالتزام الماضي had to والقدرة على إنجاز فعل محدد في الماضي was/were able to',
			'إعادة كتابة جمل البكالوريا بدقة عند التحويل بين هذه الصيغ'
		],
		keywordsAr: ['used to', 'had to', 'was able to', 'Past Habits', 'Ancient Civilizations'],
		discover: {
			scenarioAr:
				'في العصر الذهبي للحضارة الإسلامية بالأندلس وبغداد وتلمسان، اعتاد العلماء نسخ المخطوطات باليد، واضطروا للسفر شهوراً لطلب العلم، واستطاعوا تشييد مكتبات وجامعات كبرى كالقرويين.',
			svg: svgEnglishGrammarMap({
				title: 'Past Habits, Obligation & Ability',
				rootLabel: 'Talking About Ancient Times',
				rootSub: 'All followed by Verb Stem (Base Form)',
				branches: [
					{
						label: 'used to',
						rule: 'Past habit (no longer true)',
						example: 'Scholars used to copy books.'
					},
					{
						label: 'had to',
						rule: 'Past necessity / obligation',
						example: 'Travelers had to cross deserts.'
					},
					{
						label: 'was / were able to',
						rule: 'Specific past achievement',
						example: 'They were able to build libraries.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما شكل الفعل الذي يأتي مباشرة بعد used to و had to و was able to؟',
					hintAr: 'هل نضيف للفعل -ed أم نتركه في المصدر المجرد؟',
					expectedInput: 'Verb Stem (المصدر المجرد بدون إضافات)',
					revealAr: 'يأتي بعد هذه الصيغ الثلاث دائماً الفعل في المصدر المجرد (Verb Stem)، مثل: used to trade، had to travel، were able to build.'
				},
				{
					promptAr: 'كيف ننفي الجملة: Ancient merchants used to travel by sea؟',
					hintAr: 'نستعمل الفعل المساعد في الماضي البسيط مع إرجاع used إلى أصلها.',
					expectedInput: 'Ancient merchants did not use to travel by sea.',
					revealAr: 'في النفي نستعمل did not use to (بحذف حرف d من used)، وفي السؤال Did + Subject + use to + Stem.'
				},
				{
					promptAr: 'أي صيغة تناسب معنى «نجح البناؤون في تشييد قلعة بني حماد»؟',
					hintAr: 'إنه إنجاز وقدرة متحققة في الماضي.',
					expectedInput: 'were able to',
					revealAr: 'نستعمل was/were able to (أو managed to) للتعبير عن قدرة وإنجاز تحقق فعلاً في موقف ماضٍ.'
				}
			]
		},
		summary: {
			rulesAr: [
				'used to + Stem: تعبّر عن عادة أو حالة في الماضي لم تعد قائمة اليوم. نفيها: did not use to + Stem، وسؤالها: Did + S + use to + Stem?',
				'had to + Stem: تعبّر عن ضرورة أو التزام مفروض في الماضي (الماضي من must و have to). نفيها: did not have to + Stem (عدم الضرورة).',
				'was / were able to + Stem: تعبّر عن قدرة على إنجاز عمل محدد في الماضي وترادف managed to + Stem (ونفيها: was not / were not able to).',
				'في تمارين البكالوريا (Rewrite sentence b)، إذا وردت عبارة managed to نعوضها بـ was/were able to، وإذا وردت were obliged to نعوضها بـ had to.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Past Habit vs Present',
				tenseName: 'used to + Stem',
				formula: 'Subject + used to / did not use to + Verb Stem',
				activeZone: 'past',
				example: 'Students used to study by oil lamps in historic schools.',
				markers: 'centuries ago, in the past, long ago, formerly'
			}),
			visualCaptionAr: 'خط زمني يوضح أن used to تختص بعادات وحالات ماضية منتهية.',
			examples: [
				{
					problemAr: 'Rewrite: a) Muslim astronomers managed to map the stars accurately. | b) Muslim astronomers ..........',
					solutionAr: 'b) Muslim astronomers were able to map the stars accurately.'
				},
				{
					problemAr: 'Rewrite: a) Caravans were obliged to stop at safe oases. | b) Caravans ..........',
					solutionAr: 'b) Caravans had to stop at safe oases.'
				},
				{
					problemAr: 'Turn into negative: People used to write on parchment.',
					solutionAr: 'People did not use to write on parchment.'
				}
			],
			watchOutAr: 'خطأ شائع في البكالوريا: كتابة did not used to (بحرف d)؛ الصواب دائماً did not use to لأن did تحمل علامة الماضي!'
		},
		practice: [
			{
				questionAr: 'Choose the correct negative form: Ancient scribes .......... print books mechanically.',
				options: ['did not use to', 'did not used to', 'used not to did', 'do not used to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة: بعد did not نكتب use بدون d.',
					'خطأ: لا نجمع بين did وحرف d في used.',
					'خطأ: تركيب نحوي غير صحيح.',
					'خطأ: السياق في الماضي وليس في المضارع.'
				],
				explanationAr: 'صيغة النفي القياسية من used to هي did not use to + Stem.'
			},
			{
				questionAr: 'Which phrase correctly replaces "managed to" in: Engineers managed to irrigate dry valleys?',
				options: ['were able to', 'used to', 'had to', 'are able to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: were able to ترادف managed to للقدرة المتحققة في الماضي مع الفاعل الجمع.',
					'خطأ: used to تفيد العادة وليس الإنجاز.',
					'خطأ: had to تفيد الإلزام وليس القدرة.',
					'خطأ: الزمن ماضٍ وليس مضارعاً.'
				],
				explanationAr: 'لتحويل managed to مع فاعل جمع (Engineers) نستعمل were able to.'
			},
			{
				questionAr: 'Complete with the right modal: Because roads were long, traders .......... carry water supplies.',
				options: ['had to', 'used to be', 'was able to', 'have to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: السياق يعبر عن ضرورة والتزام في الماضي.',
					'خطأ: used to be لا تناسب الفعل carry.',
					'خطأ: الفاعل جمع (traders) والمعنى ضرورة لا مجرد قدرة.',
					'خطأ: الجملة في الماضي (were).'
				],
				explanationAr: 'نستعمل had to للتعبير عن الضرورة والالتزام في الماضي.'
			},
			{
				questionAr: 'Select the correct question: .......... Fatima al-Fihri .......... establish Al-Qarawiyyin Mosque and school?',
				options: ['Was ... able to', 'Did ... able to', 'Were ... able to', 'Did ... used to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: مع الفاعل المفرد نطرح السؤال بـ Was + Subject + able to + Stem.',
					'خطأ: لا نستخدم Did مع able to.',
					'خطأ: الفاعل مفرد (Fatima al-Fihri) فيأخذ Was لا Were.',
					'خطأ: لا نكتب used بعد Did كما أن تأسيس الجامعة إنجاز واحد لا عادة.'
				],
				explanationAr: 'السؤال عن القدرة في الماضي مع الفاعل المفرد يكون بـ Was + S + able to + Stem.'
			},
			{
				questionAr: 'Identify the meaning of: Scholars in Tlemcen used to gather in the Great Mosque.',
				options: [
					'A regular past habit in history',
					'A future plan for students',
					'A present obligation today',
					'A single emergency action'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: used to تدل على عادة متكررة في الماضي.',
					'خطأ: لا تدل على المستقبل.',
					'خطأ: لا تدل على الحاضر ولا الإلزام.',
					'خطأ: used to لا تُستعمل لحدث عارض واحد.'
				],
				explanationAr: 'used to تعبر عن العادات المتكررة أو الحالات الثابتة في الماضي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Past Perfect vs Past Simple (after, before, until, as soon as)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t1_past_perfect_simple',
		slug: 'eng-3as-lp-t1-past-perfect-simple',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية)',
		order: 2,
		titleAr: 'الماضي التام والماضي البسيط مع الروابط الزمنية: After / Before / Until',
		objectives: [
			'التمييز بين الحدث الأول (Past Perfect) والحدث الثاني (Past Simple) في سرد الوقائع التاريخية',
			'توظيف الروابط الزمنية after و as soon as و before و until بدقة نحوية',
			'الربط بين جملتين في البكالوريا دون الوقوع في أخطاء ترتيب الأزمنة'
		],
		keywordsAr: ['Past Perfect', 'Past Simple', 'after', 'before', 'until', 'as soon as'],
		discover: {
			scenarioAr:
				'عند سرد تاريخ الحضارات، نحتاج لترتيب حدثين وقعا في الماضي: أيهما سبق الآخر؟ مثلاً: طوّر الخوارزمي قواعد الجبر أولاً، ثم انتقل علمه إلى أوروبا لاحقاً.',
			svg: svgEnglishTenseTimeline({
				title: 'Sequencing Two Past Events',
				tenseName: 'Past Perfect + Past Simple',
				formula: 'After / As soon as + S + had + V3, S + V2',
				activeZone: 'two_past',
				example: 'After Al-Khwarizmi had written his book, algebra spread widely.',
				markers: 'after, as soon as, before, by the time, until'
			}),
			steps: [
				{
					promptAr: 'في الجملة: After Muslim scholars had translated Greek medicine, they corrected many errors. أي الفعلين وقع أولاً؟',
					hintAr: 'انظر إلى الفعل المصرف في had + Past Participle.',
					expectedInput: 'had translated (الترجمة وقعت أولاً)',
					revealAr: 'الحدث الأول (الأقدم) يُصرف دائماً في Past Perfect (had + V3)، والحدث الثاني (الأحدث) في Past Simple (V2).'
				},
				{
					promptAr: 'ما الزمن الذي يأتي مباشرة بعد الرابط before؟',
					hintAr: 'before تعني «قبل»، إذن الفعل بعدها هو الحدث الثاني.',
					expectedInput: 'Past Simple (الماضي البسيط)',
					revealAr: 'بعد before و by the time يأتي Past Simple، بينما تكون الجملة الأخرى في Past Perfect.'
				},
				{
					promptAr: 'كيف نربط الجملتين بـ until: Ibn Battuta did not settle in Fez. He travelled across three continents first.',
					hintAr: 'تأتي until في الوسط وغالباً يسبقها نفي في الماضي البسيط ويتبعها الماضي التام.',
					expectedInput: 'Ibn Battuta did not settle in Fez until he had travelled across three continents.',
					revealAr: 'القاعدة الذهبية مع until: Past Simple (غالباً منفي: did not + Stem) + until + Past Perfect (had + V3).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأساسية: عند وجود حدثين في الماضي، الحدث الأول (الأقدم) يكون في Past Perfect (had + Past Participle)، والحدث الثاني يكون في Past Simple.',
				'After / As soon as + Past Perfect (الحدث 1) , Past Simple (الحدث 2).',
				'Before / By the time + Past Simple (الحدث 2) , Past Perfect (الحدث 1).',
				'Past Simple (غالباً منفي) + until + Past Perfect (الحدث 1). مثال: Trade did not flourish until safe routes had been built.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Time Connectors Formula Map',
				rootLabel: 'Two Actions in the Past',
				rootSub: 'Action 1 = had + V3 | Action 2 = V2',
				branches: [
					{
						label: 'After / As soon as',
						rule: 'Followed by Action 1 (had + V3)',
						example: 'After they had built roads, trade grew.'
					},
					{
						label: 'Before / By the time',
						rule: 'Followed by Action 2 (V2)',
						example: 'Before it fell, Timgad had thrived.'
					},
					{
						label: 'Until',
						rule: 'Negative V2 + until + had + V3',
						example: 'He did not rest until he had finished.'
					}
				]
			}),
			visualCaptionAr: 'خريطة سريعة للزمن الذي يتبع كل رابط زمني في امتحان البكالوريا.',
			examples: [
				{
					problemAr: 'Combine with (after): The inhabitants invented writing. They recorded their laws.',
					solutionAr: 'After the inhabitants had invented writing, they recorded their laws.'
				},
				{
					problemAr: 'Combine with (before): Ibn Khaldun observed many societies. Then he wrote Al-Muqaddimah.',
					solutionAr: 'Ibn Khaldun had observed many societies before he wrote Al-Muqaddimah.'
				},
				{
					problemAr: 'Combine with (until): The city did not prosper. Honest leaders restored justice first.',
					solutionAr: 'The city did not prosper until honest leaders had restored justice.'
				}
			],
			watchOutAr: 'احذر وضع had + V3 في كلا شطري الجملة! الماضي التام يوضع فقط للحدث الأقدم، ويبقى الحدث الثاني في الماضي البسيط.'
		},
		practice: [
			{
				questionAr: 'Choose the correct verbs: After the artisans .......... the arches, they .......... the courtyard.',
				options: [
					'had carved / decorated',
					'carved / had decorated',
					'had carved / had decorated',
					'carve / decorated'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد After نضع الحدث الأول في Past Perfect ثم الحدث الثاني في Past Simple.',
					'خطأ: عكست ترتيب الأزمنة بعد After.',
					'خطأ: لا نضع Past Perfect في الشطرين معاً.',
					'خطأ: لا نخلط المضارع مع الماضي في سرد تاريخي.'
				],
				explanationAr: 'القاعدة: After + Past Perfect, Past Simple.'
			},
			{
				questionAr: 'Complete: Before paper reached Europe, Muslim cities .......... great libraries.',
				options: ['had built', 'built have', 'build', 'were build'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: قبل وصول الورق كانت المكتبات قد بُنيت، فنستعمل Past Perfect (had built).',
					'خطأ: ترتيب المساعد خطأ.',
					'خطأ: الفعل في المضارع لا يناسب reached.',
					'خطأ: تركيب غير نحوي.'
				],
				explanationAr: 'الحدث الأقدم قبل جملة Before يكون في Past Perfect.'
			},
			{
				questionAr: 'Choose the right sentence using "until":',
				options: [
					'Merchants did not depart until they had secured the caravan.',
					'Merchants did not departed until they secured the caravan.',
					'Merchants had not depart until they had secured the caravan.',
					'Merchants do not depart until they had secured the caravan.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة: نفي في الماضي البسيط (did not depart) ثم until ثم الماضي التام (had secured).',
					'خطأ: بعد did not يجب استعمال المصدر depart وليس departed.',
					'خطأ: had not تتطلب تصريفاً ثالثاً كما أن الشطر الأول يجب أن يكون ماضياً بسيطاً.',
					'خطأ: عدم توافق زمني بين do not و had secured.'
				],
				explanationAr: 'صيغة until القياسية هي: Past Simple (negative) + until + Past Perfect.'
			},
			{
				questionAr: 'Complete: As soon as Ibn al-Haytham .......... his optical experiments, he published Kitab al-Manazir.',
				options: ['had completed', 'completes', 'has completed', 'was complete'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: بعد As soon as يأتي الحدث الأول في Past Perfect.',
					'خطأ: السياق ماضٍ (published).',
					'خطأ: المضارع التام لا يتوافق مع الماضي البسيط هنا.',
					'خطأ: صيغة غير صحيحة نحوياً.'
				],
				explanationAr: 'As soon as تُعامل معاملة After ويأتي بعدها Past Perfect.'
			},
			{
				questionAr: 'Which verb is the Past Participle (V3) needed after "had" for the verb "write"?',
				options: ['written', 'wrote', 'writing', 'writed'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التصريف الثالث من write هو written (write - wrote - written).',
					'خطأ: wrote هو الماضي البسيط V2.',
					'خطأ: writing هو صيغة الاستمرار.',
					'خطأ: write فعل شاذ لا يقبل -ed.'
				],
				explanationAr: 'الماضي التام يتكون من had + التصريف الثالث (written).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Expressing Concession (although, though, even though, despite, in spite of)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t1_concession',
		slug: 'eng-3as-lp-t1-concession',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية)',
		order: 3,
		titleAr: 'التعبير عن الاستدراك والتقابل: Although / Though / Despite / In spite of',
		objectives: [
			'التمييز البنيوي بين أدوات الاستدراك المتبوعة بجملة كاملة (although / though / even though) والمتبوعة بعبارة اسمية (despite / in spite of)',
			'تحويل الجملة من although إلى despite أو in spite of بدقة في أسئلة البكالوريا',
			'استعمال despite the fact that كبديل آمن وذكي عند تعذر تحويل الجملة إلى اسم'
		],
		keywordsAr: ['Concession', 'although', 'though', 'even though', 'despite', 'in spite of'],
		discover: {
			scenarioAr:
				'كثيراً ما نقرأ في نصوص الحضارات جملتين متقابلتين: كانت وسائل النقل قديمة، ومع ذلك وصلت القوافل والعلوم إلى أقاصي الأرض. كيف نربط بينهما بالإنجليزية؟',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Concession in BAC Exams',
				rootLabel: 'Two Contrasting Ideas',
				rootSub: 'Watch what follows the connector!',
				branches: [
					{
						label: 'Although / Even though',
						rule: '+ Subject + Verb (Full Clause)',
						example: 'Although tools were simple, they built forts.'
					},
					{
						label: 'Despite / In spite of',
						rule: '+ Noun Phrase OR Verb-ing',
						example: 'Despite simple tools, they built forts.'
					},
					{
						label: 'Despite the fact that',
						rule: '+ Subject + Verb (Safe Bridge)',
						example: 'Despite the fact that tools were simple...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي يأتي مباشرة بعد Although و Though و Even though؟',
					hintAr: 'هل يأتي فاعل وفعل (جملة كاملة) أم اسم فقط؟',
					expectedInput: 'Subject + Verb (جملة تامة)',
					revealAr: 'تُتبع although / though / even though دائماً بجملة كاملة تحتوي على فاعل وفعل.'
				},
				{
					promptAr: 'ما الذي يأتي مباشرة بعد Despite و In spite of؟',
					hintAr: 'انظر إلى المثال: Despite the harsh climate, people settled in M-Zab.',
					expectedInput: 'Noun Phrase أو Verb-ing',
					revealAr: 'تُتبع despite و in spite of بعبارة اسمية (Noun Phrase) أو مصدر بـ ing (Gerund)، ولا يُتبعان مباشرة بفعل مصرف.'
				},
				{
					promptAr: 'هل نكتب of بعد despite؟',
					hintAr: 'قارن بين despite و in spite of.',
					expectedInput: 'لا، نكتب despite بدون of',
					revealAr: 'نقول despite (بلا of)، ونقول in spite of (مع of). عبارة despite of خطأ فادح يجب تجنبه.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Although / Though / Even though + Subject + Verb , Main Clause (تُتبع بجملة كاملة).',
				'Despite / In spite of + Noun Phrase (أو Verb-ing) , Main Clause (تُتبع باسم أو gerund).',
				'التحويل الذهبي للبكالوريا: Despite the fact that + Subject + Verb (أو In spite of the fact that + S + V) يغنيك عن خطأ الاشتقاق عند التحويل من although!',
				'عند الربط بين جملتين فيهما but أو however، نحذف but / however لأن أداة الاستدراك تغني عنها.'
			],
			visualSvg: svgEnglishWordFormation({
				title: 'Transforming Clause into Noun Phrase',
				prefix: 'Despite',
				root: 'being ancient / the age',
				suffix: 'of Timgad',
				derivedWord: 'Despite being ancient, Timgad remains impressive.',
				meaningNote: 'Although Timgad is ancient = Despite being ancient / Despite its age'
			}),
			visualCaptionAr: 'تحويل جملة الصفة بعد Although إلى عبارة اسمية أو صيغة being بعد Despite.',
			examples: [
				{
					problemAr: 'Rewrite: a) Although the desert was arid, farmers created flourishing oases. | b) Despite ..........',
					solutionAr: 'b) Despite the arid desert (OR Despite the fact that the desert was arid), farmers created flourishing oases.'
				},
				{
					problemAr: 'Rewrite: a) Tlemcen faced several sieges, but its Great Mosque survived. | b) In spite of ..........',
					solutionAr: 'b) In spite of facing several sieges, the Great Mosque of Tlemcen survived.'
				},
				{
					problemAr: 'Combine with (even though): Ancient maps were hand-drawn. Al-Idrisi made remarkably accurate charts.',
					solutionAr: 'Even though ancient maps were hand-drawn, Al-Idrisi made remarkably accurate charts.'
				}
			],
			watchOutAr: 'خطآن قاتلان في البكالوريا: كتابة despite of (الخطأ في إضافة of)، وترك كلمة but في الشطر الثاني بعد وضع although في الشطر الأول!'
		},
		practice: [
			{
				questionAr: 'Choose the correct connector: .......... the limited technology, Islamic architects constructed resilient domes.',
				options: ['Despite', 'Although', 'Even though', 'Despite of'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: بعدها عبارة اسمية (the limited technology) فنستعمل Despite.',
					'خطأ: Although تتطلب فاعلاً وفعلاً.',
					'خطأ: Even though تتطلب جملة كاملة.',
					'خطأ: لا نضيف of بعد Despite.'
				],
				explanationAr: 'العبارة the limited technology عبارة اسمية بلا فعل، فتناسبها Despite أو In spite of.'
			},
			{
				questionAr: 'Choose the correct sentence:',
				options: [
					'Although the fortress was built in 1007, its ruins still stand today.',
					'Although the fortress was built in 1007, but its ruins still stand today.',
					'Despite the fortress was built in 1007, its ruins still stand today.',
					'In spite the fortress was built in 1007, its ruins still stand today.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: جملة كاملة بعد Although وحذف but من الشطر الثاني.',
					'خطأ: لا يجوز الجمع بين Although و but في جملة واحدة.',
					'خطأ: Despite لا تُتبع مباشرة بفاعل وفعل إلا مع the fact that.',
					'خطأ: نقصان of ووجود جملة كاملة مباشرة.'
				],
				explanationAr: 'نستعمل Although + S + V بدون but في الشطر الثاني.'
			},
			{
				questionAr: 'Rewrite safely with "In spite of": Although the journey was perilous, Ibn Battuta continued.',
				options: [
					'In spite of the perilous journey, Ibn Battuta continued.',
					'In spite of the journey was perilous, Ibn Battuta continued.',
					'In spite the perilous journey, Ibn Battuta continued.',
					'In spite of perilous, Ibn Battuta continued.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: حولنا الجملة إلى عبارة اسمية صحيحة (the perilous journey).',
					'خطأ: جاءت جملة فعلية كاملة مباشرة بعد In spite of.',
					'خطأ: حُذف حرف الجر of.',
					'خطأ: لا نضع صفة مجردة بلا اسم بعد In spite of.'
				],
				explanationAr: 'بعد In spite of نضع عبارة اسمية: the + adjective + noun.'
			},
			{
				questionAr: 'Which expression can directly take a Subject + Verb just like "although"?',
				options: ['Despite the fact that', 'Despite of', 'In spite of', 'Despite'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: إضافة the fact that تسمح بوضع جملة كاملة (S + V) بعدها.',
					'خطأ: عبارة غير صحيحة أصلاً في الإنجليزية.',
					'خطأ: تتطلب اسماً أو Verb-ing.',
					'خطأ: تتطلب اسماً أو Verb-ing.'
				],
				explanationAr: 'Despite the fact that و In spite of the fact that تتبعان بجملة كاملة.'
			},
			{
				questionAr: 'Complete with the Gerund form: Despite .......... few instruments, early astronomers calculated the earth circumference.',
				options: ['having', 'had', 'they had', 'have'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد Despite نستعمل صيغة Gerund (Verb-ing: having).',
					'خطأ: لا نضع فعلاً مصرفاً في الماضي مباشرة بعد Despite.',
					'خطأ: لا نضع فاعلاً وفعلاً مباشرة بعد Despite.',
					'خطأ: لا نضع المصدر المجرد بعد Despite.'
				],
				explanationAr: 'عندما يكون الفاعل واحداً في الجملتين، يمكن استعمال Despite + Verb-ing.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Word Building in Ancient Civilizations (Verb / Noun / Adjective)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t1_word_building_civ',
		slug: 'eng-3as-lp-t1-word-building-civ',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية)',
		order: 4,
		titleAr: 'الاشتقاق وبناء الكلمات في وحدة الحضارات: Verb / Noun / Adjective',
		objectives: [
			'إتقان جدول الاشتقاق (Verb - Noun - Adjective) الأكثر تكراراً في بكالوريا آداب وفلسفة',
			'التعرف على اللواحق الاسمية (-tion, -ment, -ity, -ance) واللواحق الوصفية (-ous, -al, -ful, -ive, -ed)',
			'تكوين الأضداد باستعمال البادئات المناسبة (un-, in-, im-, ir-, il-, dis-)'
		],
		keywordsAr: ['Word Building', 'Suffixes', 'Prefixes', 'civilization', 'prosperity', 'achievement'],
		discover: {
			scenarioAr:
				'في قسم Text Exploration من امتحان البكالوريا، يرد سؤال جدول الاشتقاق (Complete the chart) أو تقسيم الكلمة إلى Prefix + Root + Suffix بنقطة ونصف إلى نقطتين مضمونتين.',
			svg: svgEnglishWordFormation({
				title: 'BAC Morphology Blueprint',
				prefix: 'un- / dis- / re-',
				root: 'civilize / prosper / achieve',
				suffix: '-tion / -ity / -ment',
				derivedWord: 'civilization / prosperity / achievement',
				meaningNote: 'Suffixes change the part of speech; prefixes usually change meaning or form opposites.'
			}),
			steps: [
				{
					promptAr: 'ما الاسم (Noun) والصفة (Adjective) من الفعل prosper (يزدهر)؟',
					hintAr: 'تذكر لاحقة الاسم -ity ولاحقة الصفة -ous.',
					expectedInput: 'prosperity (Noun) / prosperous (Adjective)',
					revealAr: 'من الفعل prosper نشتق الاسم prosperity (الازدهار) والصفة prosperous (مزدهر).'
				},
				{
					promptAr: 'ما الفعل والصفة من الاسم civilization (الحضارة)؟',
					hintAr: 'احذف اللاحقة -ation وأضف -ize للفعل و -ed للصفة.',
					expectedInput: 'to civilize (Verb) / civilized (Adjective)',
					revealAr: 'الفعل هو to civilize والصفة civilized (متحضر)، ومثلها organize / organization / organized.'
				},
				{
					promptAr: 'أي بادئة تعطي ضد الصفة regular وضد الصفة legal؟',
					hintAr: 'انتبه للحرف الأول من الكلمة (r و l).',
					expectedInput: 'irregular / illegal',
					revealAr: 'نضع ir- قبل الكلمات المبدوءة بـ r (irregular)، و il- قبل الكلمات المبدوءة بـ l (illegal)، و im- قبل m/p (immoral, impossible).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أشهر لواحق الأسماء (Noun Suffixes): -tion / -ation (civilization, contribution)، -ment (achievement, development)، -ity (prosperity, stability)، -ance / -ence (importance, emergence).',
				'أشهر لواحق الصفات (Adjective Suffixes): -ous (prosperous, famous)، -al (historical, cultural)، -ful (peaceful, successful)، -ed (civilized, developed)، -ive (creative, productive).',
				'أشهر لواحق الأفعال (Verb Suffixes): -ize / -ise (civilize, modernize)، -ify (unify, fortify)، -ate (create, educate)، -en (strengthen).',
				'بادئات الضد (Opposite Prefixes): il- قبل l (illegal)، ir- قبل r (irresponsible)، im- قبل m/p (imperfect)، إضافة إلى un- و in- و dis- (unknown, unstable, disappear).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Key Civilization Word Families',
				rootLabel: 'Verb | Noun | Adjective',
				rootSub: 'High-Frequency BAC LP Table Items',
				branches: [
					{
						label: 'civilize',
						rule: 'Noun: civilization',
						example: 'Adj: civilized'
					},
					{
						label: 'prosper',
						rule: 'Noun: prosperity',
						example: 'Adj: prosperous'
					},
					{
						label: 'achieve',
						rule: 'Noun: achievement',
						example: 'Adj: achievable / achieved'
					},
					{
						label: 'flourish',
						rule: 'Noun: flourishing',
						example: 'Adj: flourishing'
					}
				]
			}),
			visualCaptionAr: 'أهم العائلات الاشتقاقية المتكررة في جدول البناء اللغوي لوحدة الحضارات.',
			examples: [
				{
					problemAr: 'Complete: Verb = to unify | Noun = .......... | Adjective = ..........',
					solutionAr: 'Noun = unification / unity | Adjective = unified'
				},
				{
					problemAr: 'Complete: Verb = .......... | Noun = heritage / inheritance | Adjective = inherited',
					solutionAr: 'Verb = to inherit'
				},
				{
					problemAr: 'Form the opposite keeping the root: stable / appear / literate',
					solutionAr: 'unstable / disappear / illiterate'
				}
			],
			watchOutAr: 'انتبه في الجدول ألا تكتب الفعل مع to في خانة الاسم أو الصفة، واحذر الخلط بين الاسم history والصفة historical / historic!'
		},
		practice: [
			{
				questionAr: 'What is the correct Noun derived from the verb "achieve"?',
				options: ['achievement', 'achievation', 'achievity', 'achievable'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل achieve يأخذ اللاحقة -ment ليصبح achievement.',
					'خطأ: لا توجد كلمة achievation.',
					'خطأ: لاحقة غير صحيحة لهذا الفعل.',
					'خطأ: achievable صفة وليست اسماً.'
				],
				explanationAr: 'الفعل achieve يشتق منه الاسم بإضافة اللاحقة -ment: achievement.'
			},
			{
				questionAr: 'Choose the Adjective from the noun "prosperity":',
				options: ['prosperous', 'prosper', 'prosperize', 'prosperment'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الصفة هي prosperous (مزدهر).',
					'خطأ: prosper فعل وليس صفة.',
					'خطأ: صيغة غير صحيحة.',
					'خطأ: صيغة غير موجودة.'
				],
				explanationAr: 'عائلة الكلمة هي: prosper (V) - prosperity (N) - prosperous (Adj).'
			},
			{
				questionAr: 'Form the opposite of "literate" keeping the same root:',
				options: ['illiterate', 'unliterate', 'disliterate', 'imliterate'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الكلمات المبدوءة بحرف l تأخذ غالباً البادئة il- (illiterate).',
					'خطأ: لا نستخدم un- مع literate.',
					'خطأ: dis- لا تستعمل مع هذه الصفة.',
					'خطأ: im- تسبق m أو p وليس l.'
				],
				explanationAr: 'ضد literate هو illiterate (أمي) باستعمال البادئة il-.'
			},
			{
				questionAr: 'What is the Verb corresponding to the noun "contribution"?',
				options: ['to contribute', 'to contributize', 'to contributate', 'to contributive'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: الفعل هو to contribute (يساهم).',
					'خطأ: لا نضيف -ize هنا.',
					'خطأ: صيغة غير صحيحة.',
					'خطأ: contributive صفة وليست فعلاً.'
				],
				explanationAr: 'الأسماء المنتهية بـ -ution مثل contribution و distribution أفعالها تنتهي بـ -ute.'
			},
			{
				questionAr: 'Identify the part of speech of the word "cultural" in: Cultural exchange enriched Cordoba.',
				options: ['Adjective', 'Verb', 'Noun', 'Adverb'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: اللاحقة -al تدل هنا على الصفة وتصف الاسم exchange.',
					'خطأ: ليست فعلاً.',
					'خطأ: الاسم هو culture.',
					'خطأ: الظرف يكون culturally.'
				],
				explanationAr: 'اللاحقة -al تحوّل الاسم culture إلى صفة cultural.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Pronunciation of Final -ed (/t/, /d/, /id/) & Final -s (/s/, /z/, /iz/)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t1_phonology_ed_s',
		slug: 'eng-3as-lp-t1-phonology-ed-s',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية)',
		order: 5,
		titleAr: 'نطق النهايات الصوتية في البكالوريا: Final -ed و Final -s',
		objectives: [
			'تصنيف الأفعال المنتهية بـ -ed بدقة في الخانات الثلاث: /t/ و /d/ و /id/',
			'تصنيف الكلمات المنتهية بـ -s بدقة في الخانات الثلاث: /s/ و /z/ و /iz/',
			'تجنب الفخاخ الصوتية الشائعة (مثل laughed و watched و fixes و bridges)'
		],
		keywordsAr: ['Final -ed', 'Final -s', 'Phonology', 'Pronunciation'],
		discover: {
			scenarioAr:
				'يُعد جدول نطق Final -ed أو Final -s أسهل نقطة مضمونة في قسم Text Exploration بالبكالوريا؛ يكفي أن تنظر إلى الصوت الأخير الذي يسبق النهاية مباشرة (وليس الحرف الصامت!).',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -ed',
				subtitle: 'Look at the final SOUND before -ed',
				columns: [
					{
						sound: '/t/',
						rule: 'p, k, f, s, sh, ch, x',
						examples: 'worked, watched, laughed'
					},
					{
						sound: '/d/',
						rule: 'All other voiced sounds',
						examples: 'lived, ruled, studied'
					},
					{
						sound: '/id/',
						rule: 'Only after /t/ or /d/',
						examples: 'founded, invented, ended'
					}
				]
			}),
			steps: [
				{
					promptAr: 'متى تُنطق النهاية -ed بصوت /id/؟',
					hintAr: 'تذكر الحرفين التوأمين في المخرج الصوتي.',
					expectedInput: 'بعد الصوتين /t/ و /d/ فقط',
					revealAr: 'تُنطق -ed بصوت /id/ فقط عندما ينتهي أصل الفعل بصوت /t/ مثل invented أو /d/ مثل founded و traded.'
				},
				{
					promptAr: 'لماذا نُصنف الفعل laughed في خانة /t/ رغم أنه ينتهي بحرفي gh؟',
					hintAr: 'انطق كلمة laugh بصوت مسموع!',
					expectedInput: 'لأن gh تُنطق هنا بصوت /f/',
					revealAr: 'العبرة بالصوت لا بالإملاء؛ laugh تنتهي بصوت /f/ المهموس، لذا تُنطق laughed بـ /t/.'
				},
				{
					promptAr: 'ما الأصوات التي تجعل النهاية -s تُنطق /iz/؟',
					hintAr: 'تذكر الأصوات الصفيرية مثل s, z, sh, ch, x, ge.',
					expectedInput: 's, ss, z, x, sh, ch, ce, ge',
					revealAr: 'تُنطق Final -s بصوت /iz/ بعد أصوات الصفير: /s, z, sh, ch, dge/ مثل: boxes, bridges, teaches, places.'
				}
			]
		},
		summary: {
			rulesAr: [
				'نطق Final -ed: خانة /id/ بعد /t, d/ فقط (founded, created). خانة /t/ بعد الأصوات المهموسة /p, k, f, s, sh, ch, x/ (developed, worked, passed, flourished, laughed). خانة /d/ مع باقي الأصوات المجهورة وحروف العلة (ruled, discovered, unified).',
				'نطق Final -s: خانة /iz/ بعد /s, z, sh, ch, x, ce, ge/ (civilizations لا! بل palaces, arches, boxes, flourishes). خانة /s/ بعد /p, t, k, f, th/ (books, artifacts, maps, beliefs). خانة /z/ مع باقي الأصوات المجهورة (scholars, cities, civilizations, trades).',
				'قاعدة الفحص الذهبية: احذف النهاية (-ed أو -s) أولاً وانطق أصل الكلمة بصوت واضح لتعرف الصوت الأخير الحقيقي.'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -s',
				subtitle: 'Look at the final SOUND before -s / -es',
				columns: [
					{
						sound: '/s/',
						rule: 'p, t, k, f, th (voiceless)',
						examples: 'maps, artifacts, books'
					},
					{
						sound: '/z/',
						rule: 'Vowels + b, d, g, l, m, n, r, v',
						examples: 'ruins, cities, scholars'
					},
					{
						sound: '/iz/',
						rule: 's, z, x, sh, ch, ce, ge',
						examples: 'palaces, arches, ages'
					}
				]
			}),
			visualCaptionAr: 'قاعدة تصنيف Final -s في ثلاث خانات صوتية واضحة.',
			examples: [
				{
					problemAr: 'Classify (-ed): flourished, founded, ruled, developed',
					solutionAr: '/t/: flourished, developed | /d/: ruled | /id/: founded'
				},
				{
					problemAr: 'Classify (-s): manuscripts, palaces, kingdoms, mosques',
					solutionAr: '/s/: manuscripts, mosques (ends in /k/) | /z/: kingdoms | /iz/: palaces'
				},
				{
					problemAr: 'Watch the spelling trap: established vs decided vs preserved',
					solutionAr: 'established: /t/ (after sh) | decided: /id/ (after /d/) | preserved: /d/ (after /v/)'
				}
			],
			watchOutAr: 'انتبه لكلمتي mosques (تنتهي بصوت /k/ فتأخذ /s/) و palaces (تنتهي بصوت /s/ فتأخذ /iz/)، ولا تغتر بحرف e الصامت في نهاية ruined أو created!'
		},
		practice: [
			{
				questionAr: 'How is the final "-ed" pronounced in the verb "flourished"?',
				options: ['/t/', '/d/', '/id/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: أصل الفعل flourish ينتهي بصوت /sh/ المهموس، فتُنطق -ed بصوت /t/.',
					'خطأ: الصوت /sh/ مهموس وليس مجهوراً.',
					'خطأ: /id/ تأتي بعد /t/ و /d/ فقط.',
					'خطأ: النهاية -ed منطوقة هنا.'
				],
				explanationAr: 'الأفعال المنتهية بصوت /sh/ مثل flourished و established تُنطق فيها -ed بصوت /t/.'
			},
			{
				questionAr: 'Which verb belongs to the /id/ column?',
				options: ['inherited', 'preserved', 'carved', 'reached'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: أصل الفعل inherit ينتهي بصوت /t/ فتأخذ -ed النطق /id/.',
					'خطأ: preserve تنتهي بـ /v/ فتأخذ /d/.',
					'خطأ: carve تنتهي بـ /v/ فتأخذ /d/.',
					'خطأ: reach تنتهي بـ /ch/ فتأخذ /t/.'
				],
				explanationAr: 'الفعل inherit ينتهي بصوت /t/، إذن inherited تُنطق نهايتها /id/.'
			},
			{
				questionAr: 'How is the final "-s" pronounced in the word "bridges"?',
				options: ['/iz/', '/s/', '/z/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: أصل الكلمة bridge ينتهي بصوت /dge/ الصفيري، فتأخذ /iz/.',
					'خطأ: ليست من أصوات /p, t, k, f/.',
					'خطأ: لا تأخذ /z/ المفردة بل المقطع /iz/.',
					'خطأ: النهاية منطوقة.'
				],
				explanationAr: 'الكلمات المنتهية بـ -ge مثل bridges و ages و villages تُنطق فيها -s بصوت /iz/.'
			},
			{
				questionAr: 'Choose the word whose final "-s" is pronounced /s/:',
				options: ['manuscripts', 'civilizations', 'chronicles', 'arches'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: manuscript تنتهي بصوت /t/ المهموس، إذن النهاية /s/.',
					'خطأ: civilization تنتهي بـ /n/ فتأخذ /z/.',
					'خطأ: chronicle تنتهي بصوت /l/ فتأخذ /z/.',
					'خطأ: arch تنتهي بـ /ch/ فتأخذ /iz/.'
				],
				explanationAr: 'بعد /p, t, k, f, th/ تُنطق النهاية -s بصوت /s/.'
			},
			{
				questionAr: 'Why is "studied" placed under the /d/ column?',
				options: [
					'Because the root "study" ends in a vowel sound',
					'Because it ends in the letter d',
					'Because it ends in a voiceless consonant',
					'Because every irregular verb takes /d/'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: كل أصوات العلة (Vowels) مجهورة فتأخذ النهاية /d/.',
					'خطأ: الأصل هو study وينتهي بصوت علة /i/ وليس /d/.',
					'خطأ: صوت العلة مجهور وليس مهموساً.',
					'خطأ: study فعل منتظم أصلاً.'
				],
				explanationAr: 'أصل الفعل study ينتهي بصوت علة مجهور، لذلك تُنطق studied بصوت /d/.'
			}
		]
	}
];
