import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T1
// Unit 1: Ill-Gotten Gains Never Prosper (Ethics in Business)
// 5 Concise, Self-Sufficient BAC Lessons
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T1: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Expressing Condition (Providing that / Provided that / As long as)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t1_condition_providing',
		slug: 'eng-3as-sci-condition-providing',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Ill-Gotten Gains Never Prosper (الأخلاق في الأعمال)',
		order: 1,
		titleAr: 'التعبير عن الشرط في البكالوريا: Providing that / Provided that / As long as',
		objectives: [
			'إتقان التعبير عن الشرط الصارم باستعمال Providing that و Provided that و As long as',
			'ضبط تصريف الأفعال بدقة: Present Simple في جملة الشرط و Future Simple في جواب الشرط',
			'إعادة كتابة جمل البكالوريا (Sentence Rewriting) دون الوقوع في خطأ تكرار will'
		],
		keywordsAr: ['Providing that', 'Provided that', 'As long as', 'Condition', 'Ethics in Business'],
		discover: {
			scenarioAr:
				'في عالم التجارة والأعمال، لا يتحقق الازدهار الحقيقي إلا بالصدق والأمانة وترك الغش والرشوة. تأمل الجملة الآتية من نصوص الوحدة الأولى: "Businesses will prosper provided that they respect ethical standards." لاحظ كيف ربطت أداة الشرط بين شرط الالتزام بالأخلاق ونتيجة الازدهار.',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Strict Condition in BAC',
				rootLabel: 'Condition Connectors (If and only if)',
				rootSub: 'Providing that / Provided that / As long as / So long as',
				branches: [
					{
						label: 'Clause 1 (Condition)',
						rule: 'Connector + Present Simple',
						example: 'Provided that firms stay honest,'
					},
					{
						label: 'Clause 2 (Result)',
						rule: 'Subject + will + Stem',
						example: 'consumers will trust them.'
					},
					{
						label: 'Middle Position',
						rule: 'No comma before connector',
						example: 'Trade grows as long as laws work.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما المعنى الذي تؤديه أداة الربط "provided that" في الجملة السابقة؟',
					hintAr: 'إنها تساوي "if and only if" أي "بشرط أن".',
					expectedInput: 'condition',
					revealAr:
						'تؤدي "provided that" معنى الشرط الصارم (Condition)، وهي مرادفة تماما لـ "providing that" و "as long as" و "so long as".'
				},
				{
					promptAr: 'ما الزمن الصحيح للفعل الذي يأتي مباشرة بعد "as long as" أو "providing that"؟',
					hintAr: 'تذكر قاعدة الشرط من النوع الأول: لا نضع will بعد أداة الشرط أبدا.',
					expectedInput: 'Present Simple',
					revealAr:
						'يُصرّف الفعل الذي يلي أداة الشرط مباشرة في المضارع البسيط (Present Simple)، بينما يُصرّف الفعل في الجملة الرئيسية في المستقبل البسيط (Future Simple: will + stem).'
				},
				{
					promptAr: 'متى نضع الفاصلة (comma) في جملة الشرط؟',
					hintAr: 'قارن بين بداية الجملة بـ Providing that وبين وضعها في الوسط.',
					expectedInput: 'at the beginning',
					revealAr:
						'نضع الفاصلة بين الجملتين عندما تبدأ الجملة بأداة الشرط في الأول، ونحذف الفاصلة عندما تأتي أداة الشرط في وسط الجملة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأدوات المتكافئة للشرط في البكالوريا: Providing that = Provided that = As long as = So long as = But only if (كلها تعني: بشرط أن / طالما أن).',
				'القاعدة الذهبية في الصدارة: Providing that + Subject + Present Simple, Subject + will + stem.',
				'القاعدة الذهبية في الوسط: Subject + will + stem + provided that + Subject + Present Simple (دون فاصلة).',
				'خدعة إعادة الصياغة في البكالوريا (Rewrite b so that it means the same as a): إذا احتوت الجملة (a) على مستقبلين (will ... will) عند الربط، نحذف will من جملة الشرط التي تلي Providing that مباشرة، ونصرف فعلها في المضارع البسيط (مع إضافة s مع he/she/it).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'BAC Condition Tense Rule',
				tenseName: 'Present Simple + Future Simple',
				formula: 'Provided that + V(present), S + will + stem',
				activeZone: 'future',
				example: 'As long as merchants remain honest, society will flourish.',
				markers: 'providing that, provided that, as long as, so long as'
			}),
			visualCaptionAr: 'المخطط الزمني للشرط: فعل الشرط في المضارع البسيط والنتيجة في المستقبل',
			examples: [
				{
					problemAr: 'a) Governments will eradicate corruption. They enforce strict laws. (Combine with: provided that)',
					solutionAr: 'b) Governments will eradicate corruption provided that they enforce strict laws.'
				},
				{
					problemAr: 'a) Honest trade will grow if and only if inspectors check product quality. (Rewrite starting with: As long as)',
					solutionAr: 'b) As long as inspectors check product quality, honest trade will grow.'
				},
				{
					problemAr: 'a) Consumers will be safe. Factories will respect safety norms. (Combine with: Providing that)',
					solutionAr: 'b) Providing that factories respect safety norms, consumers will be safe.'
				}
			],
			watchOutAr:
				'احذر الخطأ الأشهر في البكالوريا: لا تكتب أبدا "Provided that they will respect"؛ إذ يُمنع استعمال will داخل جملة الشرط، بل نكتب "Provided that they respect" ونترك will في جملة النتيجة فقط.'
		},
		practice: [
			{
				questionAr: 'Choose the correct sentence using "providing that":',
				options: [
					'Providing that companies follow fair rules, customers will remain loyal.',
					'Providing that companies will follow fair rules, customers remain loyal.',
					'Providing that companies followed fair rules, customers will remain loyal.',
					'Providing that companies following fair rules, customers will remain loyal.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! Present Simple في جملة الشرط و Future Simple في جملة النتيجة مع الفاصلة.',
					'خطأ: لا نضع will بعد Providing that مباشرة.',
					'خطأ: الفعل followed في الماضي بينما النتيجة في المستقبل.',
					'خطأ: نحتاج فعلا مصرفا في المضارع البسيط لا صيغة ing.'
				],
				explanationAr: 'بعد Providing that نستعمل Present Simple (follow) وفي جملة النتيجة نستعمل Future Simple (will remain).'
			},
			{
				questionAr: 'Complete: "Our economy will recover as long as every citizen ........ taxes honestly."',
				options: ['pay', 'pays', 'will pay', 'paid'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل every citizen مفرد غائب ويحتاج إضافة s في المضارع البسيط.',
					'صحيح! الفاعل every citizen مفرد لذا نضيف s إلى الفعل في المضارع البسيط.',
					'خطأ: لا نضع will في جملة الشرط بعد as long as.',
					'خطأ: النتيجة في المستقبل (will recover) لذا الشرط يكون في المضارع لا الماضي.'
				],
				explanationAr: 'كلمة every citizen تُعامل معاملة المفرد (he/she)، فنصرف الفعل في المضارع البسيط: pays.'
			},
			{
				questionAr: 'Which connector has the EXACT same meaning as "provided that"?',
				options: ['although', 'because of', 'as long as', 'whereas'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: although تعبر عن الاستدراك لا الشرط.',
					'خطأ: because of تعبر عن السبب ويليها اسم.',
					'ممتاز! as long as تعبر عن الشرط الصارم تماما مثل provided that.',
					'خطأ: whereas تعبر عن المقارنة والتقابل.'
				],
				explanationAr: 'الأدوات providing that و provided that و as long as و so long as كلها مترادفة للتعبير عن الشرط.'
			},
			{
				questionAr: 'Rewrite: "Counterfeiting will decrease if and only if authorities punish offenders." Start with "So long as":',
				options: [
					'So long as counterfeiting will decrease, authorities punish offenders.',
					'So long as authorities will punish offenders, counterfeiting will decrease.',
					'So long as authorities punish offenders counterfeiting will decrease.',
					'So long as authorities punish offenders, counterfeiting will decrease.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: عكست بين جملة الشرط وجملة النتيجة.',
					'خطأ: لا يجوز إبقاء will بعد أداة الشرط So long as.',
					'خطأ: نسيت وضع الفاصلة بين الجملتين عند بدء الجملة بأداة الشرط.',
					'رائع! الشرط في المضارع البسيط مع الفاصلة ثم النتيجة في المستقبل البسيط.'
				],
				explanationAr: 'نضع جملة الشرط بعد So long as بالمضارع البسيط ثم فاصلة ثم جملة النتيجة بالمستقبل.'
			},
			{
				questionAr: 'Where should the comma be placed in: "Public trust will increase provided that officials work transparently"?',
				options: [
					'No comma is needed because provided that is in the middle.',
					'Right after the word trust.',
					'Right after the word provided.',
					'Right before the word transparently.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! عندما تأتي أداة الشرط في وسط الجملة لا نضع فاصلة.',
					'خطأ: لا نفصل الفاعل عن فعله بفاصلة.',
					'خطأ: لا نفصل provided عن that.',
					'خطأ: الظرف transparently جزء متصل بالفعل work.'
				],
				explanationAr: 'الفاصلة توضع فقط عندما تتصدر أداة الشرط بداية الجملة، وتسقط إذا توسطت الجملتين.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: Expressing Wish, Regret & Urgency (I wish / It's high time)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t1_wish_regret_high_time',
		slug: 'eng-3as-sci-wish-regret-high-time',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Ill-Gotten Gains Never Prosper (الأخلاق في الأعمال)',
		order: 2,
		titleAr: 'التمني والندم والاستعجال: I wish / It is high time',
		objectives: [
			'التمييز الدقيق بين تمني الحاضر (Past Simple) وندم الماضي (Past Perfect) ورغبة المستقبل (would / could)',
			'استعمال It is high time و It is about time + Past Simple للتعبير عن العتاب والاستعجال',
			'إتقان قاعدة قلب الإثبات والنفي في تمارين إعادة الصياغة بالبكالوريا'
		],
		keywordsAr: ['I wish', 'Regret', 'Past Perfect', 'It is high time', 'Unreal Past'],
		discover: {
			scenarioAr:
				'في مواضيع الأخلاق والفساد، نُعبّر كثيرا عن ندمنا على أخطاء الماضي أو تمنينا لإصلاح الحاضر أو استعجالنا لتطبيق القانون. قارن بين الجملتين: (1) "I wish merchants did not cheat customers." (تمني الحاضر) و (2) "It is high time authorities stopped fake goods." (استعجال وتأخر الفعل).',
			svg: svgEnglishTenseTimeline({
				title: 'Backshift Rule with I wish',
				tenseName: 'One Tense Back in Time',
				formula: 'Present fact becomes Past Simple | Past fact becomes Past Perfect',
				activeZone: 'two_past',
				example: 'He lied yesterday. I wish he had not lied.',
				markers: 'I wish, If only, It is high time, It is about time'
			}),
			steps: [
				{
					promptAr: 'إذا كانت الجملة الأصلية في الماضي (مثال: He accepted a bribe)، فما الزمن الذي نستعمله بعد "I wish"؟',
					hintAr: 'نرجع خطوة إضافية إلى الوراء: من Past Simple إلى زمن أقدم منه.',
					expectedInput: 'Past Perfect',
					revealAr:
						'للتعبير عن الندم على فعل وقع في الماضي، نستعمل الماضي التام (Past Perfect: had / had not + Past Participle): I wish he had not accepted a bribe.'
				},
				{
					promptAr: 'إذا كانت الجملة الأصلية مثبتة (He cheats)، كيف تصبح عند التحويل إلى "I wish"؟',
					hintAr: 'المتحدث يتمنى عكس الواقع الموجود.',
					expectedInput: 'negative',
					revealAr:
						'دائما نعكس القطبية في I wish: الجملة المثبتة تصبح منفية، والمنفية تصبح مثبتة (He cheats تصبح I wish he did not cheat).'
				},
				{
					promptAr: 'ما الزمن الصحيح للفعل الذي يأتي بعد "It is high time + Subject"؟',
					hintAr: 'المعنى يشير للحاضر لكن الصيغة النحوية ماضٍ غير حقيقي (Unreal Past).',
					expectedInput: 'Past Simple',
					revealAr:
						'بعد It is high time / It is about time + Subject نستعمل دائما Past Simple، ونحذف عبارات مثل should / must / ought to إن وجدت في الجملة الأصلية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تمني الحاضر (Present Wish): I wish + Subject + Past Simple (ملاحظة: مع الفعل to be نستعمل were لجميع الضمائر في الإنجليزية الأكاديمية: I wish honesty were universal).',
				'الندم على الماضي (Past Regret): I wish + Subject + Past Perfect (had / had not + Past Participle).',
				'رغبة المستقبل أو التذمر (Future Desire): I wish + Subject + would + stem (مع الضمائر he/she/they/you) أو could + stem (خاصة مع I / we).',
				'الاستعجال والعتاب (Urgency / Criticism): It is high time / It is about time + Subject + Past Simple (مع حذف should / must / ought to).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BAC Rewriting Formula: Wish & High Time',
				rootLabel: 'Unreal Past Structures',
				rootSub: 'Opposite polarity with I wish | Drop modals with High time',
				branches: [
					{
						label: 'Present Wish',
						rule: 'I wish + S + Past Simple',
						example: 'I wish he worked honestly.'
					},
					{
						label: 'Past Regret',
						rule: 'I wish + S + had + PP',
						example: 'I wish I had checked the bill.'
					},
					{
						label: 'Future Desire',
						rule: 'I wish + S + would/could',
						example: 'I wish I could join you.'
					},
					{
						label: 'It is high time',
						rule: 'High time + S + Past Simple',
						example: 'It is high time we acted.'
					}
				]
			}),
			visualCaptionAr: 'القاعدة البصرية الشاملة لتحويلات I wish و It is high time في البكالوريا',
			examples: [
				{
					problemAr: 'a) I regret having bought a counterfeit phone. (Rewrite with: I wish)',
					solutionAr: 'b) I wish I had not bought a counterfeit phone.'
				},
				{
					problemAr: 'a) Some traders do not declare their real income. (Rewrite with: I wish)',
					solutionAr: 'b) I wish some traders declared their real income.'
				},
				{
					problemAr: 'a) Citizens should report corrupt practices immediately. (Rewrite with: It is high time)',
					solutionAr: 'b) It is high time citizens reported corrupt practices immediately.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا: لا تكتب "It is high time citizens should report"؛ احذف should أو must تماما وحوّل الفعل الرئيسي مباشرة إلى الماضي البسيط (reported). وكذلك لا تستعمل would مع الضمير I بعد I wish، بل استعمل could.'
		},
		practice: [
			{
				questionAr: 'Rewrite: "He regrets cheating in the final exam." Start with "He wishes":',
				options: [
					'He wishes he did not cheat in the final exam.',
					'He wishes he had not cheated in the final exam.',
					'He wishes he has not cheated in the final exam.',
					'He wishes he would not cheat in the final exam.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل وقع في الماضي (ندم)، لذا نحتاج Past Perfect لا Past Simple.',
					'ممتاز! الندم على فعل ماضٍ يأخذ had not + Past Participle.',
					'خطأ: لا نستخدم Present Perfect بعد wish.',
					'خطأ: would تستعمل لرغبة مستقبلية لا للندم على الماضي.'
				],
				explanationAr: 'كلمة regrets + V-ing تدل على ندم على حدث ماضٍ، فنحولها إلى Past Perfect منفي: had not cheated.'
			},
			{
				questionAr: 'Rewrite: "Governments must fight tax evasion now." Start with "It is high time":',
				options: [
					'It is high time governments fought tax evasion.',
					'It is high time governments fight tax evasion.',
					'It is high time governments must fight tax evasion.',
					'It is high time governments have fought tax evasion.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حذفنا must وحوّلنا الفعل fight إلى الماضي البسيط fought.',
					'خطأ: نحتاج صيغة Past Simple بعد It is high time + Subject.',
					'خطأ: يجب حذف must عند التحويل إلى It is high time.',
					'خطأ: لا نستعمل Present Perfect بعد It is high time.'
				],
				explanationAr: 'بعد It is high time + فاعل نحذف الفعل الناقص must ونصرف الفعل الرئيسي في الماضي البسيط (fought).'
			},
			{
				questionAr: 'Choose the grammatically correct sentence for a future desire:',
				options: [
					'I wish I would speak English fluently next year.',
					'I wish I will speak English fluently next year.',
					'I wish I could speak English fluently next year.',
					'I wish I can speak English fluently next year.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نجمع بين الفاعل I في الجملتين مع would، بل نستعمل could.',
					'خطأ: لا نستخدم will بعد I wish أبدا.',
					'أحسنت! عندما يتطابق الفاعل (I ... I) نستعمل could + stem.',
					'خطأ: يجب إرجاع can خطوة للماضي لتصبح could.'
				],
				explanationAr: 'مع نفس الفاعل (I wish I / We wish we) للتعبير عن رغبة مستقبلية نستخدم could وليس would.'
			},
			{
				questionAr: 'Complete: "Fraud is widespread today. I wish honesty ........ respected everywhere."',
				options: ['is', 'was being', 'will be', 'were'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الفعل is في الحاضر، وبعد wish نحتاج الماضي غير الحقيقي.',
					'خطأ: الصيغة غير ملائمة لحقيقة حالية عامة.',
					'خطأ: لا نستعمل will بعد I wish.',
					'ممتاز! مع to be في تمني الحاضر نستخدم were لجميع الضمائر.'
				],
				explanationAr: 'في تمني عكس واقع حاضر مع الفعل to be، الصيغة القياسية في البكالوريا هي were.'
			},
			{
				questionAr: 'Rewrite: "She did not check the contract before signing." Start with "She wishes":',
				options: [
					'She wishes she had checked the contract before signing.',
					'She wishes she had not checked the contract before signing.',
					'She wishes she checked the contract before signing.',
					'She wishes she checks the contract before signing.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! الجملة الأصلية ماضٍ منفي، فتتحول إلى Past Perfect مثبت (had checked).',
					'خطأ: نسيت عكس النفي إلى إثبات.',
					'خطأ: الجملة الأصلية في الماضي، لذا نحتاج Past Perfect لا Past Simple.',
					'خطأ: لا نستخدم المضارع البسيط بعد wish.'
				],
				explanationAr: 'بما أن الجملة الأصلية منفيّة في الماضي (did not check)، نعكسها إلى Past Perfect مثبت (had checked).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: Strong Advice (Had better) & Result (So...that / Such...that)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t1_had_better_so_such',
		slug: 'eng-3as-sci-had-better-so-such',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Ill-Gotten Gains Never Prosper (الأخلاق في الأعمال)',
		order: 3,
		titleAr: 'النصح القوي (Had better) والتعبير عن النتيجة (So...that / Such...that)',
		objectives: [
			'استعمال had better و had better not مع مصدر مجرد (bare infinitive) لإعطاء نصيحة قوية أو تحذير',
			'التفريق بدقة بين so + adjective/adverb + that وبين such + noun phrase + that',
			'دمج جملتين بالبكالوريا باستعمال so...that و such...that دون حذف أو زيادة خاطئة'
		],
		keywordsAr: ['Had better', 'Strong advice', 'So...that', 'Such...that', 'Result'],
		discover: {
			scenarioAr:
				'عند تحذير المستهلكين من المنتجات المقلدة أو وصف خطورة الفساد ونتائجه، نستعمل تركيبين متكررين جدا في البكالوريا: "Consumers had better check quality labels" و "Counterfeiting is such a serious crime that it threatens public safety."',
			svg: svgEnglishGrammarMap({
				title: 'Had better vs So...that / Such...that',
				rootLabel: 'Key Unit 1 Structures',
				rootSub: 'Strong Advice & Cause-Result Emphasis',
				branches: [
					{
						label: 'Had better (+)',
						rule: 'S + had better + stem',
						example: 'You had better tell the truth.'
					},
					{
						label: 'Had better not (-)',
						rule: 'S + had better not + stem',
						example: 'Firms had better not cheat.'
					},
					{
						label: 'So ... that',
						rule: 'so + adj / adv + that',
						example: 'Fraud is so harmful that it ruins trust.'
					},
					{
						label: 'Such ... that',
						rule: 'such + (a/an) + adj + N + that',
						example: 'It is such a bad habit that all reject it.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'هل نضع "to" بعد عبارة "had better"؟ (مثال: You had better ... check)',
					hintAr: 'عبارة had better تُعامل مثل الأفعال الناقصة (should / must).',
					expectedInput: 'no',
					revealAr:
						'لا نضع to أبدا بعد had better! يليها الفعل مباشرة في المصدر المجرد (stem): You had better check (وليس to check).'
				},
				{
					promptAr: 'ما الكلمة التي تأتي بين "so" و "that" في الجملة: "The law is so strict that few dare break it"؟',
					hintAr: 'تأمل نوع كلمة strict في النحو الإنجليزي.',
					expectedInput: 'adjective',
					revealAr:
						'يأتي بين so و that صفة (adjective) أو ظرف (adverb) فقط، دون اسم يتبعها مباشرة.'
				},
				{
					promptAr: 'متى نختار "such...that" بدلا من "so...that"؟',
					hintAr: 'انظر إلى وجود الاسم (noun) بعد الصفة في مثل: a serious crime.',
					expectedInput: 'noun phrase',
					revealAr:
						'نختار such...that عندما يوجد اسم موصوف (noun phrase) بعد الفراغ: such + a/an + adj + singular noun + that، أو such + adj + plural/uncountable noun + that.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النصح القوي والتحذير: Subject + had better + stem (بديل قوي لـ should / ought to / must)، وفي النفي: Subject + had better not + stem (لا نكتب had not better ولا did not have better!).',
				'النتيجة مع الصفة أو الظرف: Subject + verb + so + adjective / adverb + that + result clause.',
				'النتيجة مع الاسم الموصوف: Subject + verb + such + (a/an) + adjective + noun + that + result clause (نحذف a/an إذا كان الاسم جمعا أو غير معدود مثل: such serious problems / such bad behaviour).',
				'خطوة الدمج في البكالوريا: نحذف الكلمات الدالة على الشدة والنتيجة (very, really, extremely, therefore, so, consequently) ونضع so أو such في موقعها، ثم نربط الجملة الثانية بـ that.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing between SO and SUCH',
				rootLabel: 'Look Right After the Gap',
				rootSub: 'Delete very / extremely / therefore when rewriting',
				branches: [
					{
						label: 'Adj / Adv Only',
						rule: 'Use SO ... that',
						example: 'so corrupt that...'
					},
					{
						label: 'Singular Countable Noun',
						rule: 'Use SUCH a/an + adj + N',
						example: 'such a grave crime that...'
					},
					{
						label: 'Plural / Uncountable Noun',
						rule: 'Use SUCH + adj + N (no a/an)',
						example: 'such fake goods that...'
					}
				]
			}),
			visualCaptionAr: 'اختبار سريع للتمييز بين so و such دون خطأ في الامتحان',
			examples: [
				{
					problemAr: 'a) Authorities should not tolerate bribery. (Rewrite with: had better)',
					solutionAr: 'b) Authorities had better not tolerate bribery.'
				},
				{
					problemAr: 'a) Fake medicines are very dangerous. As a result, they can cause death. (Combine with: so...that)',
					solutionAr: 'b) Fake medicines are so dangerous that they can cause death.'
				},
				{
					problemAr: 'a) Corruption is a huge obstacle. Consequently, it slows development. (Combine with: such...that)',
					solutionAr: 'b) Corruption is such a huge obstacle that it slows development.'
				}
			],
			watchOutAr:
				'تذكّر خطأين قاتلين في التصحيح: (1) نفي had better هو had better not (وليس hadn\'t better)، و(2) عند الدمج بـ so...that أو such...that يجب حذف very و therefore/consequently لأن المعنى مدمج في التركيب.'
		},
		practice: [
			{
				questionAr: 'Rewrite: "You should not buy products without a warranty." Using "had better":',
				options: [
					'You had better not buy products without a warranty.',
					'You had better not to buy products without a warranty.',
					'You had not better buy products without a warranty.',
					'You better did not buy products without a warranty.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الصيغة الدقيقة هي had better not + stem دون to.',
					'خطأ: لا نضع to بعد had better not.',
					'خطأ: مكان not يكون بعد better مباشرة.',
					'خطأ: هذا التركيب غير صحيح نحويا.'
				],
				explanationAr: 'النفي الصحيح لـ had better هو had better not متبوعا بالفعل في المصدر المجرد (buy).'
			},
			{
				questionAr: 'Fill in the blanks: "Counterfeit cables are ........ cheap ........ many buyers ignore the risk."',
				options: ['such / that', 'so / that', 'such a / that', 'so / therefore'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: كلمة cheap صفة وحدها دون اسم بعدها.',
					'صحيح! الصفة cheap وحدها تتطلب so ... that.',
					'خطأ: لا يوجد اسم مفرد معدود بعد cheap.',
					'خطأ: لا نجمع بين so و therefore في هذا التركيب.'
				],
				explanationAr: 'لوجود الصفة (cheap) فقط دون اسم بعدها، نستعمل so + adjective + that.'
			},
			{
				questionAr: 'Fill in the blanks: "Honesty is ........ noble value ........ every community admires it."',
				options: ['so / that', 'such / that', 'such a / that', 'so a / that'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: يوجد اسم مفرد (value) بعد الصفة.',
					'خطأ: الاسم المفرد المعدود value يحتاج أداة التنكير a.',
					'رائع! noble value اسم مفرد معدود لذا نكتب such a noble value that.',
					'خطأ: لا تتبع so أداة التنكير a بهذا الشكل.'
				],
				explanationAr: 'عبارة noble value اسم مفرد معدود، فالصيغة الصحيحة هي such a + adj + singular noun + that.'
			},
			{
				questionAr: 'Choose the correct combination for a plural noun: "Bribery causes serious damages. People lose confidence."',
				options: [
					'Bribery causes such a serious damages that people lose confidence.',
					'Bribery causes so serious damages that people lose confidence.',
					'Bribery causes such serious damages so people lose confidence.',
					'Bribery causes such serious damages that people lose confidence.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الاسم damages جمع ولا نضع a قبل الجمع.',
					'خطأ: مع وجود الاسم damages نستعمل such لا so.',
					'خطأ: نربط الجملة الثانية بـ that وليس so.',
					'أحسنت! such + adj + plural noun + that دون a/an.'
				],
				explanationAr: 'مع الاسم الجمع (damages) نحذف أداة التنكير a ونستعمل such serious damages that.'
			},
			{
				questionAr: 'Which sentence correctly uses "had better" for advice?',
				options: [
					'Companies had better adopt a clear code of ethics.',
					'Companies had better adopting a clear code of ethics.',
					'Companies had better to adopt a clear code of ethics.',
					'Companies had better adopted a clear code of ethics.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! adopt مصدر مجرد بعد had better.',
					'خطأ: لا نضع V-ing بعد had better.',
					'خطأ: لا نضع to بعد had better.',
					'خطأ: رغم وجود had، الفعل بعدها يبقى في المصدر المجرد لا الماضي.'
				],
				explanationAr: 'يتبع had better دائما الفعل في صيغة المصدر المجرد (bare infinitive): adopt.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: Passive Voice & Cause/Result in Ethics Texts
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t1_passive_cause_ethics',
		slug: 'eng-3as-sci-passive-cause-ethics',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Ill-Gotten Gains Never Prosper (الأخلاق في الأعمال)',
		order: 4,
		titleAr: 'المبني للمجهول (Passive Voice) والسبب والنتيجة في نصوص الأخلاق',
		objectives: [
			'تحويل الجمل من المبني للمعلوم إلى المبني للمجهول في الأزمنة الأكثر ورودا في البكالوريا',
			'التمييز الدقيق بين أدوات السبب المتبوعة بجملة (because / since / as) والمتبوعة بعبارة اسمية (because of / due to)',
			'توظيف أدوات النتيجة (consequently, therefore, as a result) بدقة في إعادة الصياغة'
		],
		keywordsAr: ['Passive Voice', 'Because of', 'Due to', 'Consequently', 'Cause and Result'],
		discover: {
			scenarioAr:
				'في النصوص الرسمية والعلمية في البكالوريا، يكثر المبني للمجهول للتركيز على الفعل والمفعول به بدلا من الفاعل: "Strict laws are enforced by customs officers." كما تتكرر جمل السبب والنتيجة لتفسير ظاهرة الغش: "Many firms closed because of unfair competition."',
			svg: svgEnglishGrammarMap({
				title: 'Active to Passive Transformation',
				rootLabel: 'Object + To Be (same tense) + Past Participle',
				rootSub: 'Keep the exact tense of the original verb!',
				branches: [
					{
						label: 'Present Simple',
						rule: 'is / are + PP',
						example: 'Fake goods are seized.'
					},
					{
						label: 'Past Simple',
						rule: 'was / were + PP',
						example: 'The fraud was exposed.'
					},
					{
						label: 'Present Perfect',
						rule: 'has / have been + PP',
						example: 'Laws have been passed.'
					},
					{
						label: 'Modals (must/will)',
						rule: 'modal + be + PP',
						example: 'Bribery must be fought.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الخطوة الأولى عند تحويل الجملة "Inspectors seized fake medicines" إلى المبني للمجهول؟',
					hintAr: 'ابحث عن المفعول به (Object) وضعه في بداية الجملة.',
					expectedInput: 'Fake medicines',
					revealAr:
						'نبدأ بالمفعول به (Fake medicines)، ثم نصرف to be في زمن الفعل الأصلي (Past Simple جمع: were)، ثم نضيف التصريف الثالث (seized): Fake medicines were seized by inspectors.'
				},
				{
					promptAr: 'ما الفرق النحوي بين "because" و "because of"؟',
					hintAr: 'انظر هل يأتي بعد الأداة فاعل وفعل أم اسم فقط.',
					expectedInput: 'noun phrase',
					revealAr:
						'تُتبع because (ومثلها since و as) بجملة كاملة (Subject + Verb)، أما because of (ومثلها due to و owing to) فتُتبع باسم أو عبارة اسمية أو فعل مضاف إليه ing.'
				},
				{
					promptAr: 'هل نكتب "is" أم "are" إذا كان المفعول به الجديد جمعا في المضارع؟',
					hintAr: 'الفعل to be يتبع الفاعل الجديد (المفعول به الأصلي) في الإفراد والجمع.',
					expectedInput: 'are',
					revealAr:
						'يتوافق الفعل المساعد مع الفاعل الجديد في بداية جملة المبني للمجهول: المفرد يأخذ is/was/has been، والجمع يأخذ are/were/have been.'
				}
			]
		},
		summary: {
			rulesAr: [
				'صيغة المبني للمجهول العامة: New Subject (Old Object) + to be (في نفس زمن الجملة الأصلية) + Past Participle + (by + Old Subject).',
				'في الأزمنة المستمرة نضيف being (is/are/was/were + being + PP)، وفي الأزمنة التامة نضيف been (has/have/had + been + PP)، ومع الأفعال الناقصة نضيف be (can/must/should/will + be + PP).',
				'أدوات السبب مع جملة كاملة: because / since / as + Subject + Verb.',
				'أدوات السبب مع عبارة اسمية: because of / due to / owing to + Noun Phrase / V-ing (أو the fact that + Subject + Verb عند الحاجة).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Cause and Result Flow',
				tenseName: 'Cause leads to Result',
				formula: 'Cause (because of + N) leads to Result (therefore / consequently)',
				activeZone: 'present',
				example: 'Due to strict audits, financial fraud decreased rapidly.',
				markers: 'because, since, as | because of, due to | consequently, therefore'
			}),
			visualCaptionAr: 'تمييز موقع السبب وموقع النتيجة لتفادي قلب المعنى أثناء إعادة الصياغة',
			examples: [
				{
					problemAr: 'a) Customs officers are inspecting imported containers. (Rewrite starting with: Imported containers)',
					solutionAr: 'b) Imported containers are being inspected by customs officers.'
				},
				{
					problemAr: 'a) Honest companies must protect consumer rights. (Rewrite starting with: Consumer rights)',
					solutionAr: 'b) Consumer rights must be protected by honest companies.'
				},
				{
					problemAr: 'a) The company lost its clients because it sold low-quality goods. (Rewrite with: because of)',
					solutionAr: 'b) The company lost its clients because of selling low-quality goods.'
				}
			],
			watchOutAr:
				'عند التحويل للمبني للمجهول، لا تغيّر زمن الجملة أبدا! إذا كان الفعل في الماضي المستمر (were checking) يبقى في الماضي المستمر (was/were being checked). ولا تنس مطابقة الإفراد والجمع مع المفعول به الجديد.'
		},
		practice: [
			{
				questionAr: 'Rewrite in the passive: "Authorities have launched an anti-corruption campaign."',
				options: [
					'An anti-corruption campaign has been launched by authorities.',
					'An anti-corruption campaign have been launched by authorities.',
					'An anti-corruption campaign was launched by authorities.',
					'An anti-corruption campaign is being launched by authorities.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفاعل الجديد مفرد وزمن الجملة Present Perfect لذا نكتب has been launched.',
					'خطأ: campaign مفردة فتأخذ has لا have.',
					'خطأ: حولت الزمن إلى الماضي البسيط بدل الحفاظ على Present Perfect.',
					'خطأ: هذا زمن مضارع مستمر لا مضارع تام.'
				],
				explanationAr: 'الفاعل الجديد مفرد (An anti-corruption campaign) والزمن Present Perfect، فنستعمل has been + PP.'
			},
			{
				questionAr: 'Choose the right connector: "The factory was fined ........ violating safety rules."',
				options: ['because', 'because of', 'since', 'consequently'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: because تحتاج فاعلا وفعلا مصرفا بعدها.',
					'ممتاز! violating صيغة اسم فعل (gerund) وتناسب because of.',
					'خطأ: since تتطلب جملة كاملة (Subject + Verb).',
					'خطأ: consequently تعبر عن النتيجة لا السبب.'
				],
				explanationAr: 'بعد الفراغ جاء الفعل بصيغة Gerund (violating)، لذا نستخدم because of أو due to.'
			},
			{
				questionAr: 'Rewrite in the passive: "Strict regulations protect honest merchants."',
				options: [
					'Honest merchants are protecting by strict regulations.',
					'Honest merchants were protected by strict regulations.',
					'Honest merchants are protected by strict regulations.',
					'Honest merchants have been protected by strict regulations.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: في المبني للمجهول نستخدم Past Participle لا ing.',
					'خطأ: الفعل الأصلي protect في المضارع البسيط لا الماضي.',
					'رائع! المضارع البسيط مع الجمع يصبح are + Past Participle.',
					'خطأ: غيّرت الزمن الأصلي إلى المضارع التام.'
				],
				explanationAr: 'الفعل protect في المضارع البسيط والفاعل الجديد جمع (Honest merchants)، فيصبح are protected.'
			},
			{
				questionAr: 'Combine with "consequently": "Fake spare parts fail quickly. Road accidents increase."',
				options: [
					'Road accidents increase; consequently, fake spare parts fail quickly.',
					'Consequently fake spare parts fail quickly, road accidents increase.',
					'Fake spare parts fail quickly because consequently road accidents increase.',
					'Fake spare parts fail quickly; consequently, road accidents increase.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: عكست بين السبب والنتيجة.',
					'خطأ: وضعت consequently قبل السبب بدل النتيجة.',
					'خطأ: لا نجمع بين because و consequently.',
					'ممتاز! السبب أولا ثم فاصلة منقوطة ثم consequently ثم فاصلة ثم النتيجة.'
				],
				explanationAr: 'تأتي أداة النتيجة consequently دائما قبل جملة النتيجة (زيادة الحوادث) بعد جملة السبب.'
			},
			{
				questionAr: 'Rewrite with "due to": "Many buyers distrust online shops because prices are deceptive."',
				options: [
					'Many buyers distrust online shops due to deceptive prices.',
					'Many buyers distrust online shops due to prices are deceptive.',
					'Due to many buyers distrust online shops, prices are deceptive.',
					'Many buyers distrust online shops due to they have deceptive prices.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حوّلنا الجملة إلى عبارة اسمية (deceptive prices) بعد due to.',
					'خطأ: لا تأتي جملة فعلية كاملة مباشرة بعد due to.',
					'خطأ: عكست السبب والنتيجة وأتبعت due to بجملة فعلية.',
					'خطأ: due to لا يتبعها ضمير فاعل وفعل مصرف مباشرة.'
				],
				explanationAr: 'نحوّل جملة السبب (prices are deceptive) إلى عبارة اسمية (deceptive prices) لتصح بعد due to.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 5: Word Building (Opposites & Suffixes) & Stress on -ics, -ty, -tion
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t1_morphology_stress_ethics',
		slug: 'eng-3as-sci-morphology-stress-ethics',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Ill-Gotten Gains Never Prosper (الأخلاق في الأعمال)',
		order: 5,
		titleAr: 'بناء الكلمات (الأضداد والاشتقاق) وقواعد النبر الصوتي (-ics, -ty, -tion)',
		objectives: [
			'تشكيل الأضداد بدقة باستعمال البادئات السالبة (un-, dis-, im-, il-, ir-, in-)',
			'ملء جدول الاشتقاق (Verb / Noun / Adjective) الخاص بمفردات الوحدة الأولى في البكالوريا',
			'تحديد المقطع المنبور (Word Stress) بقاعدة مضمونة في الكلمات المنتهية بـ -tion و -ic/-ics و -ty'
		],
		keywordsAr: ['Prefixes', 'Suffixes', 'Word Building', 'Word Stress', 'Penultimate'],
		discover: {
			scenarioAr:
				'في الجزء الثاني من موضوع البكالوريا (Text Exploration)، لا يكاد يخلو امتحان من جدول الاشتقاق (Verb / Noun / Adjective) ومن سؤال النبر الصوتي (Word Stress). تأمل الكلمة: "unethical" المكونة من بادئة (un-) وجذر (ethic) ولاحقة (-al)، والكلمة "corruption" حيث يقع النبر قبل المقطع الأخير مباشرة.',
			svg: svgEnglishWordFormation({
				title: 'BAC Word Formation Anatomy',
				prefix: 'un-',
				root: 'ethic',
				suffix: '-al',
				derivedWord: 'unethical (غير أخلاقي)',
				meaningNote: 'Prefix changes meaning (opposite) | Suffix changes grammar category (Noun to Adjective)'
			}),
			steps: [
				{
					promptAr: 'ما البادئة السالبة الصحيحة لكل من: legal و moral و responsible و honest؟',
					hintAr: 'تذكر قاعدة الحرف الأول: l مع il، و m/p مع im، و r مع ir.',
					expectedInput: 'il / im / ir / dis',
					revealAr:
						'نقول: illegal (قبل l)، و immoral (قبل m/p)، و irresponsible (قبل r)، و dishonest (مع honest/trust/agree).'
				},
				{
					promptAr: 'ما الاسم (Noun) والصفة (Adjective) المشتقان من الفعل "corrupt" ومن الفعل "produce"؟',
					hintAr: 'لاحقة الأسماء الشائعة هي -tion ولاحقة الصفات -ive أو نفسها.',
					expectedInput: 'corruption / production',
					revealAr:
						'من corrupt: الاسم corruption والصفة corrupt أو corruptive. ومن produce: الاسم production أو product والصفة productive.'
				},
				{
					promptAr: 'أين يقع النبر الصوتي (Stress) في كلمة "corruption" المنتهية بـ -tion؟',
					hintAr: 'احسب المقاطع من النهاية: cor-RUP-tion.',
					expectedInput: 'second syllable from the end',
					revealAr:
						'كل كلمة تنتهي بـ -tion أو -sion أو -ic أو -ics يقع نبرها دائما على المقطع قبل الأخير (Penultimate: الثاني من النهاية): cor-RUP-tion، e-co-NO-mics.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة البادئات السالبة (Opposites): il- قبل l (illegal) | im- قبل m, p, b (immoral, impossible) | ir- قبل r (irresponsible) | dis- مع (dishonest, disloyal, disagree) | un- / in- لبقية الصفات (unethical, unfair, insecure).',
				'أشهر لواحق الأسماء: -tion/-sion (corruption, evasion), -ment (embezzlement), -ity/-ty (integrity, honesty), -ery (bribery), -ness (fairness). وأشهر لواحق الصفات: -al (ethical), -ful (lawful), -ive (productive), -ous (fraudulent / prosperous).',
				'قاعدة النبر 1 (المقطع الثاني من النهاية / Penultimate): الكلمات المنتهية بـ -tion, -sion, -ic, -ics (مثل: cor-RUP-tion, e-co-NO-mics, eth-I-cal خطأ بل ETH-i-cal، أما e-co-NO-mic فثاني من النهاية!).',
				'قاعدة النبر 2 (المقطع الثالث من النهاية / Antepenultimate): الكلمات المنتهية بـ -ty, -cy, -phy, -gy, -al (مثل: in-TEG-ri-ty, re-spon-si-BIL-i-ty, e-CON-o-my, ETH-i-cal).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'BAC Word Stress Golden Shortcuts',
				subtitle: 'Count syllables from the END of the word',
				columns: [
					{
						sound: '2nd from End',
						rule: '-tion, -sion, -ic, -ics',
						examples: 'cor-RUP-tion | e-co-NO-mics'
					},
					{
						sound: '3rd from End',
						rule: '-ty, -cy, -phy, -gy, -al',
						examples: 'in-TEG-ri-ty | ETH-i-cal'
					},
					{
						sound: '2-Syllable Rule',
						rule: 'Noun/Adj = 1st | Verb = 2nd',
						examples: 'PRO-duct (N) | pro-DUCE (V)'
					}
				]
			}),
			visualCaptionAr: 'قاعدة ذهبية تضمن لك العلامة الكاملة في سؤال النبر الصوتي في البكالوريا',
			examples: [
				{
					problemAr: 'Divide into prefix, root, suffix: "illegally" and "dishonesty"',
					solutionAr: 'il (prefix) + legal (root) + ly (suffix) | dis (prefix) + honest (root) + y (suffix).'
				},
				{
					problemAr: 'Complete the table (Verb / Noun / Adjective) for: "to economize" and "to counterfeit"',
					solutionAr: 'economize / economy / economic(al) | counterfeit / counterfeiting (counterfeit) / counterfeit.'
				},
				{
					problemAr: 'Mark the stressed syllable in: "regulation", "morality", "ethics"',
					solutionAr: 'reg-u-LA-tion (3rd / 2nd from end) | mo-RAL-i-ty (2nd / 3rd from end) | ETH-ics (1st / 2nd from end).'
				}
			],
			watchOutAr:
				'انتبه عند عدّ المقاطع الصوتية: نحسب المقاطع حسب أصوات العلة المنطوقة لا الحروف المكتوبة! فكلمة "ethics" فيها مقطعان (ETH-ics)، لذا الثاني من النهاية هو المقطع الأول (ETH).'
		},
		practice: [
			{
				questionAr: 'Which group of opposites uses the CORRECT negative prefixes?',
				options: [
					'illegal, immoral, irresponsible, dishonest',
					'inlegal, unmoral, disresponsible, unhonest',
					'unlegal, inmoral, ilresponsible, inhonest',
					'dislegal, immoral, inresponsible, dishonest'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! جميع البادئات مطابقة لقواعد الحرف الأول والاستعمال الصحيح.',
					'خطأ: قبل l نضع il، وقبل m نضع im، وقبل r نضع ir، ومع honest نضع dis.',
					'خطأ: بادئات غير صحيحة مع هذه الصفات.',
					'خطأ: نكتب illegal و irresponsible.'
				],
				explanationAr: 'القواعد الصوتية للبادئات: il + legal، و im + moral، و ir + responsible، و dis + honest.'
			},
			{
				questionAr: 'Where does the primary stress fall in the word "corruption" (cor-rup-tion)?',
				options: ['1st syllable (COR)', '2nd syllable (RUP)', '3rd syllable (TION)', 'No stress'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الكلمة تنتهي بـ -tion فيقع النبر على المقطع السابق لها مباشرة.',
					'صحيح! المقطع قبل الأخير (RUP) هو المنبور في الكلمات المنتهية بـ -tion.',
					'خطأ: اللاحقة -tion لا تُنبر أبدا.',
					'خطأ: كل كلمة متعددة المقاطع في الإنجليزية لها مقطع منبور.'
				],
				explanationAr: 'الكلمات المنتهية بـ -tion يُنبر فيها المقطع الثاني من النهاية (cor-RUP-tion).'
			},
			{
				questionAr: 'Where does the primary stress fall in "integrity" (in-teg-ri-ty)?',
				options: ['1st syllable (IN)', '3rd syllable (RI)', '2nd syllable (TEG)', '4th syllable (TY)'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: عدّ 3 مقاطع من النهاية: ty (1)، ri (2)، teg (3).',
					'خطأ: الكلمات المنتهية بـ -ty تُنبر على المقطع الثالث من النهاية لا الثاني.',
					'رائع! المقطع الثالث من النهاية هو TEG (وهو الثاني من البداية).',
					'خطأ: اللاحقة -ty لا تحمل النبر الرئيسي.'
				],
				explanationAr: 'في الكلمات المنتهية بـ -ty نعد ثلاثة مقاطع من النهاية: in-TEG-ri-ty.'
			},
			{
				questionAr: 'What is the correct morphological breakdown of "unethical"?',
				options: [
					'Prefix: un | Root: ethic | Suffix: al',
					'Prefix: une | Root: thic | Suffix: al',
					'Prefix: none | Root: unethic | Suffix: al',
					'Prefix: un | Root: ethical | Suffix: none'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! البادئة un- تفيد النفي، والجذر ethic، واللاحقة -al تحوله إلى صفة.',
					'خطأ: البادئة السالبة هي un فقط.',
					'خطأ: الكلمة تبدأ بالبادئة un-.',
					'خطأ: الكلمة تنتهي باللاحقة -al.'
				],
				explanationAr: 'التحليل الصرفي الدقيق هو: un (prefix) + ethic (root) + al (suffix).'
			},
			{
				questionAr: 'Complete the word-building row for the verb "to embezzle": Noun = ........',
				options: ['embezzlize', 'embezzleful', 'embezzlish', 'embezzlement'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: اللاحقة -ize لتكوين الأفعال لا الأسماء.',
					'خطأ: اللاحقة -ful للصفات.',
					'خطأ: هذه الكلمة غير موجودة.',
					'صحيح! نضيف اللاحقة -ment لتكوين الاسم embezzlement (اختلاس).'
				],
				explanationAr: 'الاسم من الفعل embezzle هو embezzlement بإضافة اللاحقة -ment.'
			}
		]
	}
];
