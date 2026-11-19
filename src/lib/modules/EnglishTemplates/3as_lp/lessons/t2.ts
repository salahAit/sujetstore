import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — yearSubjectId: 770, coeff 3, 7+8+5=20)
 * Interactive Lessons — Trimester 2: Unit 2 "Ill-Gotten Gains Never Prosper" (5 lessons)
 */
export const LESSONS_3AS_LP_T2: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Condition with Providing that / Provided that / As long as
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t2_providing_that',
		slug: 'eng-3as-lp-t2-providing-that',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2: Ill-Gotten Gains Never Prosper (أخلاقيات العمل والتجارة)',
		order: 1,
		titleAr: 'التعبير عن الشرط: Providing that / Provided that / As long as',
		objectives: [
			'استعمال أدوات الشرط providing that و provided that و as long as بمعنى «بشرط أن»',
			'ضبط توافق الأزمنة بين جملة الشرط (Present Simple) وجواب الشرط (Future Simple)',
			'ربط جملتين في موضوع أخلاقيات التجارة دون أخطاء زمنية'
		],
		keywordsAr: ['Providing that', 'Provided that', 'As long as', 'Condition', 'Business Ethics'],
		discover: {
			scenarioAr:
				'المكاسب الحرام لا تزدهر أبداً؛ ولا تنتعش التجارة إلا بشرط الصدق والأمانة. في الإنجليزية نعبر عن هذا الشرط بـ Providing that أو As long as.',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Condition in Ethics',
				rootLabel: 'Providing that / As long as = Only if',
				rootSub: 'Same tense rule as Conditional Type 1',
				branches: [
					{
						label: 'Condition Clause',
						rule: 'Connector + Present Simple',
						example: 'Providing that traders are honest,'
					},
					{
						label: 'Result Clause',
						rule: 'Subject + will + Verb Stem',
						example: 'commerce will flourish.'
					},
					{
						label: 'Mid-Sentence Order',
						rule: 'No comma before connector',
						example: 'Trade will grow as long as laws apply.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الزمن الصحيح للفعل الذي يأتي مباشرة بعد Providing that أو As long as؟',
					hintAr: 'تذكر قاعدة الشرط من النوع الأول (If Type 1).',
					expectedInput: 'Present Simple (المضارع البسيط)',
					revealAr: 'الفعل بعد Providing that / Provided that / As long as يُصرف دائماً في Present Simple، ولا نضع will بعد أداة الشرط إطلاقاً!'
				},
				{
					promptAr: 'ما الزمن الصحيح في جملة جواب الشرط (النتيجة)؟',
					hintAr: 'النتيجة متوقعة في المستقبل.',
					expectedInput: 'Future Simple (will + Stem)',
					revealAr: 'يأتي جواب الشرط في Future Simple (will + Verb Stem) أو أحياناً can / may + Stem.'
				},
				{
					promptAr: 'اربط بين الجملتين: Corruption will decrease. Authorities enforce strict laws.',
					hintAr: 'حدد أيهما الشرط (تطبيق القانون) وأيهما النتيجة (تراجع الفساد).',
					expectedInput: 'Corruption will decrease providing that authorities enforce strict laws.',
					revealAr: 'الشرط هو تطبيق القانون فيوضع بعد providing that في المضارع البسيط، وتبقى النتيجة في المستقبل.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Providing that / Provided that / As long as / So long as كلها مترادفة وتفيد الشرط المقيد بمعنى «بشرط أن / طالما أن» (only if).',
				'التركيب: Providing that + Subject + Present Simple , Subject + will + Verb Stem.',
				'يمكن وضع أداة الشرط في وسط الجملة دون فاصلة: Subject + will + Stem + as long as + Subject + Present Simple.',
				'عند الربط في البكالوريا، احذف will من جملة الشرط إذا وُجدت فيها وصرف الفعل في المضارع البسيط (مع إضافة -s للمفرد الغائب he/she/it).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Condition and Future Result',
				tenseName: 'Present Simple + Future Simple',
				formula: 'As long as + S + Present Simple, S + will + Stem',
				activeZone: 'future',
				example: 'Consumers will stay safe as long as inspectors check markets.',
				markers: 'providing that, provided that, as long as, so long as'
			}),
			visualCaptionAr: 'جملة الشرط في المضارع البسيط تمهّد للنتيجة المستقبلية بـ will.',
			examples: [
				{
					problemAr: 'Combine with (providing that): Citizens will boycott fake goods. Companies will stop counterfeiting.',
					solutionAr: 'Companies will stop counterfeiting providing that citizens boycott fake goods.'
				},
				{
					problemAr: 'Combine with (as long as): A merchant respects honesty. Customers will trust his shop.',
					solutionAr: 'As long as a merchant respects honesty, customers will trust his shop.'
				},
				{
					problemAr: 'Correct the verb: Provided that the audit (be) transparent, investors will support the project.',
					solutionAr: 'Provided that the audit is transparent, investors will support the project.'
				}
			],
			watchOutAr: 'أشهر خطأ في البكالوريا: كتابة will مباشرة بعد providing that أو as long as (مثل: providing that they will obey) — احذف will واجعل الفعل مضارعاً بسيطاً!'
		},
		practice: [
			{
				questionAr: 'Choose the correct verb: Providing that merchants .......... fair prices, buyers will return.',
				options: ['offer', 'will offer', 'offered', 'offering'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد Providing that نستعمل المضارع البسيط (offer).',
					'خطأ: لا نضع will بعد أداة الشرط.',
					'خطأ: الماضي لا يتوافق هنا مع will return.',
					'خطأ: لا نضع صيغة ing بدون فعل مساعد.'
				],
				explanationAr: 'بعد Providing that يأتي Present Simple، وفي جواب الشرط يأتي will + Stem.'
			},
			{
				questionAr: 'Complete: Ethical firms .......... prosper as long as governments punish bribery.',
				options: ['will', 'would', 'did', 'were'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: جواب الشرط مع المضارع البسيط punish يكون بـ will.',
					'خطأ: would تحتاج ماضياً في جملة الشرط.',
					'خطأ: did للماضي.',
					'خطأ: were لا تتبع بالمصدر prosper.'
				],
				explanationAr: 'الشرط في المضارع (punish) فيكون جواب الشرط بالمستقبل (will prosper).'
			},
			{
				questionAr: 'Combine correctly: The manager (sign) honest contracts. The company (gain) respect.',
				options: [
					'As long as the manager signs honest contracts, the company will gain respect.',
					'As long as the manager will sign honest contracts, the company gains respect.',
					'As long as the manager signed honest contracts, the company will gain respect.',
					'As long as the manager sign honest contracts, the company will gain respect.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المضارع البسيط مع المفرد الغائب (signs) والمستقبل في الجواب (will gain).',
					'خطأ: وضع will في جملة الشرط خطأ.',
					'خطأ: عدم توافق بين الماضي signed والمستقبل will.',
					'خطأ: نسيت إضافة s للمفرد الغائب manager.'
				],
				explanationAr: 'مع الفاعل المفرد الغائب (the manager) نضيف -s للفعل في المضارع البسيط.'
			},
			{
				questionAr: 'Which connector has the exact same meaning as "provided that"?',
				options: ['as long as', 'although', 'because of', 'despite'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: provided that و providing that و as long as كلها أدوات شرط مترادفة.',
					'خطأ: although للاستدراك.',
					'خطأ: because of للسبب.',
					'خطأ: despite للاستدراك.'
				],
				explanationAr: 'as long as ترادف provided that / providing that في التعبير عن الشرط.'
			},
			{
				questionAr: 'Fix the verb in brackets: Provided that every citizen (be) vigilant, fraud will decline.',
				options: ['is', 'will be', 'was', 'are'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: every citizen مفرد، وتصريف be في المضارع البسيط معه هو is.',
					'خطأ: لا نضع will بعد Provided that.',
					'خطأ: الجملة ليست في الماضي.',
					'خطأ: every citizen يعامل معاملة المفرد لا الجمع.'
				],
				explanationAr: 'every + singular noun يأخذ فعلاً مفرداً في المضارع البسيط (is).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: I wish + Past Simple / Past Perfect & It is high time + Past Simple
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t2_wish_high_time',
		slug: 'eng-3as-lp-t2-wish-high-time',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2: Ill-Gotten Gains Never Prosper (أخلاقيات العمل والتجارة)',
		order: 2,
		titleAr: 'التمني والندم والاستعجال: I wish و It is high time',
		objectives: [
			'التمييز بين تمني الحاضر (I wish + Past Simple) والندم على الماضي (I wish + Past Perfect)',
			'توظيف صيغة الاستعجال It is high time / It is about time + Subject + Past Simple',
			'حل تمارين إعادة الكتابة (Sentence Rewriting) في البكالوريا بدقة تامة'
		],
		keywordsAr: ['I wish', 'It is high time', 'Past Simple', 'Past Perfect', 'Regret'],
		discover: {
			scenarioAr:
				'عند الحديث عن الفساد والغش التجاري، نعبّر عن الندم على أخطاء ماضية، أو نتمنى تغيّر الواقع الحاضر، أو ننبه إلى أنه «قد آن الأوان» للتحرك العاجل.',
			svg: svgEnglishGrammarMap({
				title: 'Wish & Urgency Structures',
				rootLabel: 'Backshift One Tense Back!',
				rootSub: 'Present becomes Past Simple | Past becomes Past Perfect',
				branches: [
					{
						label: 'Present Wish',
						rule: 'I wish + S + Past Simple (were)',
						example: 'I wish markets were free of fraud.'
					},
					{
						label: 'Past Regret',
						rule: 'I wish + S + had + V3',
						example: 'I wish he had not taken the bribe.'
					},
					{
						label: 'It is high time',
						rule: 'It is high time + S + Past Simple',
						example: 'It is high time we fought corruption.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'إذا كانت الجملة الأصلية في الماضي: I regret that I bought a counterfeit phone. ماذا نكتب بعد I wish؟',
					hintAr: 'الندم على الماضي يرجع زمناً إلى الماضي التام مع عكس الإثبات والنفي.',
					expectedInput: 'I wish I had not bought a counterfeit phone.',
					revealAr: 'للندم على الماضي نستعمل Past Perfect (had + V3)، ونعكس الحالة: المثبت يصبح منفياً والمنفي يصبح مثبتاً.'
				},
				{
					promptAr: 'ما الزمن المستعمل بعد It is high time + Subject؟',
					hintAr: 'رغم أن المعنى يعبر عن الحاضر، نستخدم زمناً ماضياً لإظهار الاستعجال.',
					expectedInput: 'Past Simple (الماضي البسيط)',
					revealAr: 'بعد It is high time / It is about time + Subject نضع دائماً Past Simple (مثل: fought, banned, checked) ونحذف should أو must.'
				},
				{
					promptAr: 'في تمني الحاضر، كيف نصرّف الفعل to be مع كل الضمائر (بما فيها I و he و it)؟',
					hintAr: 'الصيغة الرسمية المفضلة في البكالوريا واحدة لكل الضمائر.',
					expectedInput: 'were',
					revealAr: 'مع I wish (تمني الحاضر) نستخدم were مع جميع الضمائر في الإنجليزية الأكاديمية: I wish bribery were eradicated.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تمني الحاضر (Present Wish): I wish + Subject + Past Simple (مع عكس الإثبات والنفي). مثال: Fraud exists تصبح I wish fraud did not exist.',
				'الندم على الماضي (Past Regret): I wish + Subject + Past Perfect (had + V3) مع عكس الإثبات والنفي. مثال: He cheated تصبح I wish he had not cheated.',
				'تمني المستقبل (Future Desire): I wish + Subject + would / could + Stem (ملاحظة: نستخدم could مع I و we).',
				'الاستعجال (Urgency): It is high time / It is about time + Subject + Past Simple (تحل محل should / ought to / must). مثال: States should stop smuggling تصبح It is high time states stopped smuggling.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Urgency in Present Context',
				tenseName: 'It is high time + Past Simple',
				formula: 'It is high time + Subject + Verb (Past Simple)',
				activeZone: 'present',
				example: 'It is high time authorities punished dishonest traders.',
				markers: 'should, ought to, must, need to (replaced by Past Simple)'
			}),
			visualCaptionAr: 'صيغة It is high time تعبر عن وجوب الفعل الآن لكنها تتطلب Past Simple نحوياً.',
			examples: [
				{
					problemAr: 'Rewrite: a) Governments should protect honest producers. | b) It is high time ..........',
					solutionAr: 'b) It is high time governments protected honest producers.'
				},
				{
					problemAr: 'Rewrite: a) He regrets having signed a false invoice. | b) He wishes ..........',
					solutionAr: 'b) He wishes he had not signed a false invoice.'
				},
				{
					problemAr: 'Rewrite: a) Counterfeit medicine is still sold in some markets. | b) I wish ..........',
					solutionAr: 'b) I wish counterfeit medicine were not sold in any markets.'
				}
			],
			watchOutAr: 'انتبه في سؤال It is high time: احذف الفعل الناقص should / must تماماً وحوّل الفعل الرئيسي إلى الماضي البسيط (ولا تكتب It is high time they should act)!'
		},
		practice: [
			{
				questionAr: 'Rewrite: Authorities ought to ban unsafe counterfeit toys. Complete: It is high time authorities .......... unsafe counterfeit toys.',
				options: ['banned', 'should ban', 'ban', 'will ban'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد It is high time + Subject نحذف ought to ونصرف الفعل في Past Simple (banned).',
					'خطأ: لا نترك should مع It is high time.',
					'خطأ: المضارع البسيط غير صحيح بعد It is high time + Subject.',
					'خطأ: لا نستخدم المستقبل بعد هذه الصيغة.'
				],
				explanationAr: 'التركيب القياسي هو It is high time + Subject + Past Simple.'
			},
			{
				questionAr: 'Choose the right past regret: I regret I did not check the expiry date. Complete: I wish I .......... the expiry date.',
				options: ['had checked', 'checked', 'had not checked', 'have checked'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الأصل منفي في الماضي (did not check) فينقلب إلى مثبت في الماضي التام (had checked).',
					'خطأ: الندم على الماضي يتطلب Past Perfect وليس Past Simple.',
					'خطأ: لم تعكس النفي إلى إثبات.',
					'خطأ: لا نستخدم المضارع التام بعد I wish.'
				],
				explanationAr: 'الندم على الماضي يستوجب had + V3 مع عكس الإثبات والنفي.'
			},
			{
				questionAr: 'Complete the present wish: Some consumers buy fake goods. Complete: I wish consumers .......... fake goods.',
				options: ['did not buy', 'do not buy', 'had not bought', 'will not buy'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: واقع حاضر مثبت (buy) يتحول مع I wish إلى نفي في الماضي البسيط (did not buy).',
					'خطأ: يجب إرجاع الزمن خطوة للماضي.',
					'خطأ: had not bought للندم على الماضي لا الحاضر.',
					'خطأ: لا نستعمل will بعد I wish.'
				],
				explanationAr: 'لتمني تغير واقع حاضر نستعمل I wish + Subject + Past Simple.'
			},
			{
				questionAr: 'Complete with the formal subjunctive form: I wish honesty .......... the rule in every market.',
				options: ['were', 'is', 'will be', 'has been'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: في تمني الحاضر نستخدم were مع جميع الضمائر.',
					'خطأ: لا نستخدم المضارع is بعد I wish.',
					'خطأ: لا نستخدم will بعد I wish.',
					'خطأ: لا نستخدم المضارع التام.'
				],
				explanationAr: 'الصيغة الأكاديمية الصحيحة لـ to be بعد I wish للحاضر هي were.'
			},
			{
				questionAr: 'Rewrite: We must fight tax evasion immediately. Complete: It is about time we .......... tax evasion.',
				options: ['fought', 'fight', 'must fight', 'have fought'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: It is about time لها نفس قاعدة It is high time وتتبع بالماضي البسيط (fought).',
					'خطأ: الفعل في المضارع.',
					'خطأ: يجب حذف must.',
					'خطأ: لا نستعمل المضارع التام هنا.'
				],
				explanationAr: 'الماضي البسيط من fight هو fought بعد It is about time + we.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Expressing Result (so ... that / such ... that)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t2_so_such_that',
		slug: 'eng-3as-lp-t2-so-such-that',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2: Ill-Gotten Gains Never Prosper (أخلاقيات العمل والتجارة)',
		order: 3,
		titleAr: 'التعبير عن النتيجة: So ... that و Such ... that',
		objectives: [
			'التمييز الدقيق بين موضع so (قبل الصفة أو الظرف وحده) وموضع such (قبل عبارة اسمية)',
			'إتقان استعمال أداة التنكير a / an مع الاسم المفرد المعدود بعد such',
			'الربط بين جملة السبب وجملة النتيجة وحذف كلمات التشديد (very, really, extremely)'
		],
		keywordsAr: ['so...that', 'such...that', 'Result Clauses', 'Cause and Effect'],
		discover: {
			scenarioAr:
				'أصبح التزوير خطيراً جداً لدرجة أن المستهلكين فقدوا الثقة. كيف نربط بين شدة الصفة ونتيجتها باستعمال so...that أو such...that؟',
			svg: svgEnglishGrammarMap({
				title: 'So...that vs Such...that',
				rootLabel: 'Expressing Result (Intensity + Consequence)',
				rootSub: 'Remove "very / really / extremely" when combining!',
				branches: [
					{
						label: 'so ... that',
						rule: 'so + Adj / Adv + that',
						example: 'Fraud is so harmful that firms collapse.'
					},
					{
						label: 'such a/an ... that',
						rule: 'such + a/an + Adj + Singular Noun + that',
						example: 'It is such a serious crime that laws punish it.'
					},
					{
						label: 'such ... that (Plural/Uncount)',
						rule: 'such + Adj + Plural/Uncountable Noun + that',
						example: 'They sold such fake goods that buyers left.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي بين الكلمة التي تتبع so والكلمة التي تتبع such؟',
					hintAr: 'هل يوجد اسم (Noun) بعد الصفة أم لا؟',
					expectedInput: 'so + صفة فقط | such + صفة + اسم',
					revealAr: 'نستعمل so إذا جاءت الصفة (أو الظرف) وحدها بلا اسم بعدها، ونستعمل such إذا تبعت الصفة باسم (عبارة اسمية).'
				},
				{
					promptAr: 'لماذا نقول such a dangerous habit بينما نقول such dangerous habits بدون a؟',
					hintAr: 'قارن بين المفرد المعدود والجمع.',
					expectedInput: 'لأن habit مفرد معدود يأخذ a بينما habits جمع لا يأخذ a',
					revealAr: 'أداة التنكير a/an تُوضع فقط مع الاسم المفرد المعدود، وتُحذف مع الجمع والأسماء غير المعدودة (مثل corruption, money).'
				},
				{
					promptAr: 'ماذا نفعل بكلمة very عند الربط بـ so...that في الجملة: The penalty was very strict. Fraud stopped.',
					hintAr: 'هل تبقى very مع so؟',
					expectedInput: 'نحذف very ونضع so مكانها',
					revealAr: 'تحل so أو such محل ظرف الشدة (very / really / so / extremely)، فلا نجمع بينهما إطلاقاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'so + Adjective / Adverb + that + Result Clause. مثال: Counterfeit parts are so cheap that some buyers ignore quality.',
				'such + a/an + Adjective + Singular Countable Noun + that + Result Clause. مثال: Bribery is such an unethical act that Islam strictly forbids it.',
				'such + Adjective + Plural / Uncountable Noun + that + Result Clause (بلا a/an). مثال: They had such strict integrity that everyone trusted them.',
				'ملاحظة متقدمة: مع كلمات الكمية (many, much, few, little) نستعمل so وليس such: so many fake items that...'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Decision Checklist: SO or SUCH?',
				rootLabel: 'Look After the Blank',
				rootSub: '3-Second BAC Exam Check',
				branches: [
					{
						label: 'Adjective alone?',
						rule: 'Use SO',
						example: 'so corrupt that...'
					},
					{
						label: 'Adj + Noun?',
						rule: 'Use SUCH (+ a/an if singular)',
						example: 'such a huge loss that...'
					},
					{
						label: 'many / much / few / little?',
						rule: 'Use SO',
						example: 'so much damage that...'
					}
				]
			}),
			visualCaptionAr: 'اختبار سريع في 3 ثوانٍ لاختيار so أو such دون تردد.',
			examples: [
				{
					problemAr: 'Combine with (so...that): The fake medicine was very toxic. Many patients fell ill.',
					solutionAr: 'The fake medicine was so toxic that many patients fell ill.'
				},
				{
					problemAr: 'Combine with (such...that): Corruption is a grave threat. Society must unite against it.',
					solutionAr: 'Corruption is such a grave threat that society must unite against it.'
				},
				{
					problemAr: 'Combine with (such...that): Honest traders earned great trust. Their business expanded.',
					solutionAr: 'Honest traders earned such great trust that their business expanded.'
				}
			],
			watchOutAr: 'لا تكتب so a big problem ولا such very big problem! الصحيح: such a big problem that... أو so big that...'
		},
		practice: [
			{
				questionAr: 'Choose the correct option: Piracy is .......... widespread .......... authors lose their rights.',
				options: ['so ... that', 'such ... that', 'such a ... that', 'so very ... that'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: كلمة widespread صفة وحدها بلا اسم بعدها، فنستعمل so...that.',
					'خطأ: such تحتاج اسماً بعد الصفة.',
					'خطأ: لا يوجد اسم مفرد معدود بعد widespread.',
					'خطأ: لا نجمع بين so و very.'
				],
				explanationAr: 'الصفة المنفردة (widespread) تأخذ so...that.'
			},
			{
				questionAr: 'Complete: Smuggling is .......... serious offence .......... the court imposed heavy fines.',
				options: ['such a ... that', 'so ... that', 'such ... that', 'such an ... that'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: serious offence عبارة اسمية مفردة معدودة تبدأ بصوت ساكن /s/ فتأخذ such a...that.',
					'خطأ: وجود الاسم offence يمنع استعمال so.',
					'خطأ: الاسم المفرد المعدود offence يحتاج أداة التنكير a.',
					'خطأ: serious تبدأ بحرف ساكن فتأخذ a لا an.'
				],
				explanationAr: 'such + a + adjective + singular countable noun + that.'
			},
			{
				questionAr: 'Choose the grammatically correct sentence:',
				options: [
					'The inspector gave such clear evidence that the fraudster confessed.',
					'The inspector gave such a clear evidence that the fraudster confessed.',
					'The inspector gave so clear evidence that the fraudster confessed.',
					'The inspector gave very such clear evidence that the fraudster confessed.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: كلمة evidence غير معدودة (uncountable) فتأخذ such بدون a.',
					'خطأ: evidence اسم غير معدود في الإنجليزية فلا يأخذ a.',
					'خطأ: وجود الاسم evidence يتطلب such لا so.',
					'خطأ: لا نضع very قبل such.'
				],
				explanationAr: 'الأسماء غير المعدودة (evidence, advice, information, corruption) تأخذ such بلا a/an.'
			},
			{
				questionAr: 'Complete: There were .......... many forged banknotes .......... the bank upgraded its scanners.',
				options: ['so ... that', 'such ... that', 'such a ... that', 'too ... that'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: قبل many / much / few / little نستعمل دائماً so...that.',
					'خطأ: such لا تُستعمل قبل many.',
					'خطأ: لا نضع such a قبل many.',
					'خطأ: too تأخذ to وليس that.'
				],
				explanationAr: 'مع محددات الكمية (many, much, few, little) نستخدم so...that.'
			},
			{
				questionAr: 'Rewrite using "such...that": The charity was very transparent. Donors supported it generously.',
				options: [
					'It was such a transparent charity that donors supported it generously.',
					'The charity was such transparent that donors supported it generously.',
					'It was so a transparent charity that donors supported it generously.',
					'It was such transparent charity that donors supported it generously.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: حوّلنا الصفة إلى عبارة اسمية مفردة مع a: such a transparent charity that.',
					'خطأ: such تحتاج اسماً بعد الصفة.',
					'خطأ: لا نضع so قبل a + noun.',
					'خطأ: الاسم المفرد المعدود charity يحتاج أداة التنكير a.'
				],
				explanationAr: 'عند تحويل جملة صفة إلى such...that نكوّن عبارة اسمية: such + a/an + adj + noun + that.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Passive Voice & Strong Advice (had better / had better not)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t2_passive_had_better',
		slug: 'eng-3as-lp-t2-passive-had-better',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2: Ill-Gotten Gains Never Prosper (أخلاقيات العمل والتجارة)',
		order: 4,
		titleAr: 'المبني للمجهول (Passive Voice) والنصح القوي (had better)',
		objectives: [
			'تحويل الجمل من المبني للمعلوم إلى المبني للمجهول في الأزمنة الأساسية والأفعال الناقصة',
			'استعمال had better / had better not لتقديم نصيحة قوية أو تحذير في سياق أخلاقيات العمل',
			'تجنب الأخطاء الشائعة مثل إضافة to بعد had better أو إغفال تصريف to be في المبني للمجهول'
		],
		keywordsAr: ['Passive Voice', 'Active to Passive', 'had better', 'Advice', 'Warning'],
		discover: {
			scenarioAr:
				'في تقارير مكافحة الفساد نركز غالباً على الفعل والنتيجة (المبني للمجهول: يتم فحص البضائع)، كما نوجه تحذيراً حازماً للمخالفين باستعمال had better.',
			svg: svgEnglishGrammarMap({
				title: 'Passive Voice & Had Better',
				rootLabel: 'Two Core BAC LP Transformations',
				rootSub: 'Master the exact verb forms',
				branches: [
					{
						label: 'Present / Past Passive',
						rule: 'am/is/are OR was/were + V3',
						example: 'Fake goods are seized by customs.'
					},
					{
						label: 'Modal Passive',
						rule: 'must/should/can + be + V3',
						example: 'Bribery must be eradicated.'
					},
					{
						label: 'had better (not)',
						rule: 'S + had better (not) + Stem',
						example: 'Traders had better not cheat.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الخطوات الثلاث لتحويل: Customs officers seized fake toys إلى المبني للمجهول؟',
					hintAr: 'ابدأ بالمفعول به، ثم ضع to be في زمن الجملة (الماضي)، ثم التصريف الثالث.',
					expectedInput: 'Fake toys were seized by customs officers.',
					revealAr: '1) نقدم المفعول به (Fake toys)، 2) نضع were لأن الزمن ماضٍ والفاعل الجديد جمع، 3) نضع التصريف الثالث seized + by الفاعل.'
				},
				{
					promptAr: 'هل نضع كلمة to بعد had better؟',
					hintAr: 'قارن بين ought to وبين had better.',
					expectedInput: 'لا، نضع المصدر المجرد مباشرة بدون to',
					revealAr: 'بعد had better و had better not يأتي الفعل في المصدر المجرد مباشرة (Bare Infinitive): You had better check the label.'
				},
				{
					promptAr: 'كيف ننفي الجملة: Companies had better ignore safety standards؟',
					hintAr: 'أين نضع كلمة not؟',
					expectedInput: 'Companies had better not ignore safety standards.',
					revealAr: 'النفي هو had better not + Stem (وليس had not better).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة العامة للمبني للمجهول: Object + to be (في زمن الفعل الأصلي) + Past Participle (V3) + (by Agent).',
				'تحويل الأزمنة: Present Simple (is/are + V3) | Past Simple (was/were + V3) | Present Continuous (is/are being + V3) | Present Perfect (has/have been + V3) | Modals (must/should/will + be + V3).',
				'had better + Stem: تفيد النصيحة القوية أو التحذير (وتعوض should / ought to / must في تمارين إعادة الكتابة).',
				'النفي الصحيح هو had better not + Stem، ولا نستخدم to بعد had better مطلقاً.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Passive Voice Formula Check',
				tenseName: 'be + Past Participle (V3)',
				formula: 'New Subject + conjugated "to be" + V3 (+ by Agent)',
				activeZone: 'present',
				example: 'Strict ethical codes are being applied in national enterprises.',
				markers: 'Present: is/are V3 | Past: was/were V3 | Modal: must be V3'
			}),
			visualCaptionAr: 'المفتاح في المبني للمجهول هو مطابقة زمن to be مع زمن الجملة الأصلية.',
			examples: [
				{
					problemAr: 'Rewrite: a) Inspectors are checking the warehouse now. | b) The warehouse ..........',
					solutionAr: 'b) The warehouse is being checked by inspectors now.'
				},
				{
					problemAr: 'Rewrite: a) Citizens should boycott counterfeit products. | b) Counterfeit products ..........',
					solutionAr: 'b) Counterfeit products should be boycotted by citizens.'
				},
				{
					problemAr: 'Rewrite with (had better): Consumers should not buy unlabeled medicine.',
					solutionAr: 'Consumers had better not buy unlabeled medicine.'
				}
			],
			watchOutAr: 'انتبه لخطأين شائعين: كتابة had better to + Verb (الصواب بدون to)، ونسيان being في المستمر أو been في التام عند التحويل للمجهول!'
		},
		practice: [
			{
				questionAr: 'Turn into passive: Ethical laws protect consumers. Complete: Consumers .......... by ethical laws.',
				options: ['are protected', 'were protected', 'are protecting', 'is protected'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الجملة الأصلية في المضارع البسيط والفاعل الجديد جمع (Consumers) فنكتب are protected.',
					'خطأ: الزمن مضارع وليس ماضياً.',
					'خطأ: هذه صيغة معلوم مستمر وليست مجهولاً.',
					'خطأ: Consumers جمع فتأخذ are لا is.'
				],
				explanationAr: 'المضارع البسيط في المبني للمجهول: am / is / are + V3.'
			},
			{
				questionAr: 'Turn into passive: The government must eradicate bribery. Complete: Bribery .......... by the government.',
				options: ['must be eradicated', 'must eradicated', 'must been eradicated', 'is must eradicated'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: مع الأفعال الناقصة (must) نضع must + be + V3.',
					'خطأ: نسيت فعل be.',
					'خطأ: بعد must يأتي المصدر be لا been.',
					'خطأ: ترتيب غير صحيح.'
				],
				explanationAr: 'قاعدة المجهول مع الأفعال الناقصة: Modal + be + Past Participle.'
			},
			{
				questionAr: 'Choose the right form of "had better": You .......... check the authenticity seal before paying.',
				options: ['had better', 'had better to', 'better had', 'have better'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: had better تُتبع مباشرة بالمصدر المجرد check بدون to.',
					'خطأ: لا نضيف to بعد had better.',
					'خطأ: ترتيب الكلمات معكوس.',
					'خطأ: الصيغة الثابتة هي had better وليس have better.'
				],
				explanationAr: 'had better + Bare Infinitive (بدون to).'
			},
			{
				questionAr: 'Select the correct negative form of "had better":',
				options: [
					'Merchants had better not deceive their customers.',
					'Merchants had not better deceive their customers.',
					'Merchants did not had better deceive their customers.',
					'Merchants had better not to deceive their customers.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: النفي القياسي هو had better not + Stem.',
					'خطأ: موضع not يأتي بعد better لا قبلها.',
					'خطأ: لا نستخدم did مع had better.',
					'خطأ: لا نضع to قبل الفعل.'
				],
				explanationAr: 'صيغة النفي الصحيحة هي Subject + had better not + Verb Stem.'
			},
			{
				questionAr: 'Turn into passive: The inspection office has launched an anti-fraud campaign. Complete: An anti-fraud campaign ..........',
				options: ['has been launched', 'has launched', 'was launched', 'is being launched'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المضارع التام (has launched) يتحول في المجهول إلى has been launched.',
					'خطأ: هذه صيغة المعلوم.',
					'خطأ: غيّرت الزمن من المضارع التام إلى الماضي البسيط.',
					'خطأ: غيّرت الزمن إلى المضارع المستمر.'
				],
				explanationAr: 'Present Perfect Passive = has / have + been + V3.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: Word Stress (-tion, -ic, -ty) & Syllable Count
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t2_word_stress_syllables',
		slug: 'eng-3as-lp-t2-word-stress-syllables',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2: Ill-Gotten Gains Never Prosper (أخلاقيات العمل والتجارة)',
		order: 5,
		titleAr: 'النبر الصوتي (Word Stress) وعدد المقاطع (Syllables)',
		objectives: [
			'تحديد المقطع المنبور بدقة في الكلمات المنتهية بـ -tion / -sion / -ic / -ty / -gy',
			'حساب عدد المقاطع الصوتية في الكلمة الإنجليزية بالاعتماد على أصوات العلة المنطوقة لا الحروف',
			'إجادة جدول تصنيف الكلمات حسب عدد المقاطع أو موقع النبر في امتحان البكالوريا'
		],
		keywordsAr: ['Word Stress', 'Syllables', '-tion', '-ic', '-ty', 'Phonology'],
		discover: {
			scenarioAr:
				'في قسم البناء اللغوي بالبكالوريا، قد يُطلب منك تصنيف أربع كلمات حسب عدد المقاطع (1, 2, 3, 4 syllables) أو تحديد المقطع المنبور (Stressed Syllable). قواعد اللواحق تجعل هذا السؤال مضموناً 100%.',
			svg: svgEnglishPhoneticsChart({
				title: 'Golden Word Stress Rules (BAC)',
				subtitle: 'Count backwards from the end of the word!',
				columns: [
					{
						sound: 'Penultimate (2nd from end)',
						rule: '-tion / -sion / -ic / -ics',
						examples: 'cor-RUP-tion, ETH-ic, e-co-NOM-ic'
					},
					{
						sound: 'Antepenultimate (3rd from end)',
						rule: '-ty / -cy / -gy / -phy / -al',
						examples: 'HON-es-ty, in-TEG-ri-ty, ETH-i-cal'
					},
					{
						sound: '2-Syllable Words',
						rule: 'Nouns: 1st | Verbs: 2nd',
						examples: 'EX-port (N) vs ex-PORT (V)'
					}
				]
			}),
			steps: [
				{
					promptAr: 'أين يقع النبر في الكلمات المنتهية بـ -tion أو -ic مثل corruption و economic؟',
					hintAr: 'عدّ من نهاية الكلمة: المقطع قبل الأخير مباشرة.',
					expectedInput: 'على المقطع قبل الأخير (Penultimate syllable)',
					revealAr: 'الكلمات المنتهية بـ -tion / -sion / -ic يقع نبرها دائماً على المقطع الذي يسبق اللاحقة مباشرة: cor-RUP-tion، e-co-NOM-ic.'
				},
				{
					promptAr: 'أين يقع النبر في الكلمات المنتهية بـ -ty مثل honesty و integrity و prosperity؟',
					hintAr: 'عدّ ثلاثة مقاطع من نهاية الكلمة.',
					expectedInput: 'على المقطع الثالث من النهاية (Antepenultimate)',
					revealAr: 'الكلمات المنتهية بـ -ty و -cy و -gy و -phy و -al يُنبر فيها المقطع الثالث من النهاية: HON-es-ty، in-TEG-ri-ty، pros-PER-i-ty.'
				},
				{
					promptAr: 'كم مقطعاً صوتياً في كلمة trade وفي كلمة bribe؟',
					hintAr: 'هل يُحسب حرف e الصامت في نهاية الكلمة مقطعاً؟',
					expectedInput: 'مقطع واحد لكل منهما (1 syllable)',
					revealAr: 'حرف e الصامت في آخر الكلمة لا يضيف مقطعاً! لذا trade = 1 syllable و bribe = 1 syllable و honest = 2 syllables.'
				}
			]
		},
		summary: {
			rulesAr: [
				'حساب المقاطع (Syllables): كل صوت علة منطوق (Vowel sound) يساوي مقطعاً واحداً. حرفا العلة المتجاوران المنطوقان كصوت واحد يُحسبان مقطعاً واحداً (مثل fraud = 1، fake = 1، ethics = 2، bribery = 3).',
				'حرف e الصامت في نهاية الكلمة لا يُحسب مقطعاً (bribe = 1، trade = 1)، إلا في نهاية -le بعد حرف ساكن (مثل sim-ple = 2، ta-ble = 2).',
				'قاعدة النبر 1 (المقطع الثاني من النهاية): الكلمات المنتهية بـ -tion, -sion, -ic, -ics (cor-RUP-tion, tax-A-tion, eco-NOM-ic).',
				'قاعدة النبر 2 (المقطع الثالث من النهاية): الكلمات المنتهية بـ -ty, -cy, -gy, -phy, -al (in-TEG-ri-ty, pros-PER-i-ty, ETH-i-cal).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Counting Syllables Correctly',
				rootLabel: '1 Spoken Vowel Sound = 1 Syllable',
				rootSub: 'Ignore Silent Final "e"!',
				branches: [
					{
						label: '1 Syllable',
						rule: 'One vowel sound',
						example: 'fraud, bribe, law, fake'
					},
					{
						label: '2 Syllables',
						rule: 'Two vowel sounds',
						example: 'eth-ics, hon-est, mor-al'
					},
					{
						label: '3 Syllables',
						rule: 'Three vowel sounds',
						example: 'cor-rup-tion, hon-es-ty'
					},
					{
						label: '4 Syllables',
						rule: 'Four vowel sounds',
						example: 'in-teg-ri-ty, e-co-nom-ic'
					}
				]
			}),
			visualCaptionAr: 'تقسيم كلمات وحدة أخلاقيات العمل حسب عدد المقاطع الصوتية.',
			examples: [
				{
					problemAr: 'Classify by number of syllables: fraud, ethical, corruption, integrity',
					solutionAr: '1 syllable: fraud | 3 syllables: ethical (eth-i-cal), corruption (cor-rup-tion) | 4 syllables: integrity (in-teg-ri-ty)'
				},
				{
					problemAr: 'Mark the stressed syllable: economic / prosperity / taxation',
					solutionAr: 'e-co-NOM-ic (3rd) | pros-PER-i-ty (2nd) | tax-A-tion (2nd)'
				},
				{
					problemAr: 'Distinguish stress in 2-syllable noun vs verb: import',
					solutionAr: 'Noun: IM-port (1st syllable) | Verb: im-PORT (2nd syllable)'
				}
			],
			watchOutAr: 'انتبه: كلمة fraud فيها حرفا علة au لكنهما ينطقان صوتاً واحداً، إذن fraud لها مقطع واحد فقط (1 syllable) وليس مقطعين!'
		},
		practice: [
			{
				questionAr: 'Which syllable is stressed in the word "corruption"?',
				options: ['2nd syllable (cor-RUP-tion)', '1st syllable (COR-rup-tion)', '3rd syllable (cor-rup-TION)', 'It has no stress'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الكلمات المنتهية بـ -tion يُنبر فيها المقطع قبل الأخير مباشرة (RUP).',
					'خطأ: المقطع الأول غير منبور.',
					'خطأ: اللاحقة -tion لا تحمل النبر.',
					'خطأ: كل كلمة متعددة المقاطع لها مقطع منبور.'
				],
				explanationAr: 'قاعدة -tion: النبر يقع على المقطع الذي يسبق -tion مباشرة.'
			},
			{
				questionAr: 'How many syllables are in the word "integrity"?',
				options: ['4 syllables (in-teg-ri-ty)', '3 syllables', '2 syllables', '5 syllables'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الكلمة تتكون من أربعة مقاطع صوتية (in-teg-ri-ty).',
					'خطأ: أعد النطق ببطء: in - teg - ri - ty.',
					'خطأ: عدد المقاطع أكبر من اثنين.',
					'خطأ: لا يوجد مقطع خامس.'
				],
				explanationAr: 'in-teg-ri-ty تحتوي على 4 أصوات علة منطوقة، ونبرها على المقطع الثاني (الثالث من النهاية: TEG).'
			},
			{
				questionAr: 'Where does the stress fall in the word "economic"?',
				options: ['3rd syllable (e-co-NOM-ic)', '1st syllable (E-co-nom-ic)', '2nd syllable (e-CO-nom-ic)', '4th syllable (e-co-nom-IC)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: قبل اللاحقة -ic مباشرة نُنبر المقطع NOM.',
					'خطأ: ليس على المقطع الأول.',
					'خطأ: e-CO-no-my تنبر الثاني، أما e-co-NOM-ic فتنبر الثالث قبل -ic.',
					'خطأ: اللاحقة -ic غير منبورة.'
				],
				explanationAr: 'الكلمات المنتهية بـ -ic يقع نبرها دائماً على المقطع قبل الأخير.'
			},
			{
				questionAr: 'How many syllables are in the word "bribe"?',
				options: ['1 syllable', '2 syllables', '3 syllables', '4 syllables'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: حرف e في النهاية صامت، فيبقى صوت علة واحد فقط (1 syllable).',
					'خطأ: حرف e الأخير لا يُنطق هنا.',
					'خطأ: كلمة قصيرة ذات مقطع واحد.',
					'خطأ: كلمة قصيرة ذات مقطع واحد.'
				],
				explanationAr: 'Silent final "e" لا يشكّل مقطعاً صوتياً.'
			},
			{
				questionAr: 'Which syllable is stressed in "prosperity"?',
				options: ['2nd syllable (pros-PER-i-ty)', '1st syllable (PROS-per-i-ty)', '3rd syllable (pros-per-I-ty)', '4th syllable (pros-per-i-TY)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: مع اللاحقة -ty نعد ثلاثة مقاطع من النهاية: ty (1) - i (2) - PER (3)، وهو المقطع الثاني من البداية.',
					'خطأ: PROS هو المقطع الرابع من النهاية.',
					'خطأ: المقطع قبل الأخير غير منبور مع -ty.',
					'خطأ: اللاحقة -ty لا تُنبر.'
				],
				explanationAr: 'قاعدة -ty: النبر على المقطع الثالث من النهاية (pros-PER-i-ty).'
			}
		]
	}
];
