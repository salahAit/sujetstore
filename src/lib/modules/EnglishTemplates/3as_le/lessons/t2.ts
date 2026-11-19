import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Interactive Lessons — Trimester 2: Units 2 & 3 "Ill-Gotten Gains Never Prosper" & "Schools: Different and Alike" (4 lessons)
 */
export const LESSONS_3AS_LE_T2: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Providing that / Unless, Wish / If only (Present, Past, Future) & It is high time
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t2_cond_wish_hightime',
		slug: 'eng-3as-le-t2-cond-wish-hightime',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2 و 3: أخلاقيات العمل والتعليم في العالم (Ethics & Education)',
		order: 1,
		titleAr: 'الشرط والتمني والاستعجال المتقدم: Providing that / Unless / Wish / If only / It is high time',
		objectives: [
			'التمييز الدقيق بين حالات التمني الثلاث مع I wish و If only (حاضر، ماضٍ، ومستقبل بـ would/could)',
			'إتقان التحويل بين If ... not و Unless و Providing that في الجمل الأكاديمية المعقدة',
			'توظيف صيغة الاستعجال It is high time / It is about time + Subject + Past Simple بدقة'
		],
		keywordsAr: ['Providing that', 'Unless', 'Wish', 'If only', 'It is high time'],
		discover: {
			scenarioAr:
				'في مواضيع بكالوريا اللغات الأجنبية، تجمع أسئلة إعادة الكتابة بين الشرط (providing that / unless)، والتمني بأزمنته الثلاثة (wish / if only)، والاستعجال (It is high time) في سياق محاربة الغش والفساد وتطوير التعليم.',
			svg: svgEnglishGrammarMap({
				title: 'Wish / If Only (Three Time Zones)',
				rootLabel: 'I wish / If only + Backshifted Verb',
				rootSub: 'Same structure for I wish and If only!',
				branches: [
					{
						label: 'Present Wish',
						rule: 'S + Past Simple (were)',
						example: 'If only bribery were eradicated.'
					},
					{
						label: 'Past Regret',
						rule: 'S + had (not) + V3',
						example: 'I wish he had refused the bribe.'
					},
					{
						label: 'Future Desire',
						rule: 'I/we + could | others + would',
						example: 'I wish companies would obey laws.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق في تمني المستقبل مع I wish بين الضميرين I / we وبين باقي الضمائر (he / they / governments)؟',
					hintAr: 'تذكر الفعل الناقص المستعمل مع المتكلم مقابل الغائب.',
					expectedInput: 'مع I / we نستخدم could + Stem، ومع باقي الضمائر نستخدم would + Stem',
					revealAr: 'لا نقول I wish I would! مع I و we نستخدم could + Stem (I wish I could help)، ومع باقي الضمائر نستخدم would + Stem (I wish authorities would act).'
				},
				{
					promptAr: 'ما العلاقة بين If only و I wish؟',
					hintAr: 'هل تختلف القاعدة النحوية بينهما؟',
					expectedInput: 'لهما نفس القاعدة النحوية تماماً، و If only أقوى عاطفياً',
					revealAr: 'تعمل If only بنفس أزمنة I wish تماماً (Past Simple للحاضر، Past Perfect للماضي، would/could للمستقبل)، لكنها أشد تأكيداً.'
				},
				{
					promptAr: 'حوّل باستعمال Unless: Providing that schools teach critical thinking, plagiarism will decline.',
					hintAr: 'الجملة الأصلية مثبتة فتتطلب عكس جواب الشرط عند إدخال Unless.',
					expectedInput: 'Unless schools teach critical thinking, plagiarism will not decline.',
					revealAr: 'بما أن Providing that تفيد شرطاً مثبتاً، فاستبدالها بـ Unless (النفي) يوجب نفي جواب الشرط للحفاظ على المعنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Condition (الشرط): Providing that / As long as + Present Simple , S + will + Stem. و Unless (= If not) + فعل مثبت مع ضبط جواب الشرط.',
				'Present Wish (تمني الحاضر): I wish / If only + S + Past Simple (نستخدم were لـ to be مع جميع الضمائر).',
				'Past Regret (الندم على الماضي): I wish / If only + S + Past Perfect (had + V3) مع عكس الإثبات والنفي.',
				'Future Desire (تمني تغير سلوك مستقبلي): I wish / If only + S + would + Stem (ومع I/we نستخدم could + Stem).',
				'Urgency (الاستعجال): It is high time / It is about time + S + Past Simple (نحذف should / must / ought to).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Condition & Urgency Overview',
				tenseName: 'Unless vs It is high time',
				formula: 'Unless + Present Simple, will + Stem | It is high time + S + V2',
				activeZone: 'present',
				example: 'It is high time universities fought academic plagiarism firmly.',
				markers: 'regret, want, should, ought to, if...not, only if'
			}),
			visualCaptionAr: 'مقارنة سريعة بين أدوات الشرط وصيغة الاستعجال في البكالوريا.',
			examples: [
				{
					problemAr: 'Rewrite: a) It is a pity that some pupils cheated in the test. | b) I wish ..........',
					solutionAr: 'b) I wish some pupils had not cheated in the test.'
				},
				{
					problemAr: 'Rewrite: a) I strongly desire to eradicate illiteracy in our region. | b) I wish I ..........',
					solutionAr: 'b) I wish I could eradicate illiteracy in our region.'
				},
				{
					problemAr: 'Rewrite: a) Citizens ought to report corrupt practices immediately. | b) It is high time ..........',
					solutionAr: 'b) It is high time citizens reported corrupt practices immediately.'
				}
			],
			watchOutAr: 'انتبه لعدم استعمال would بعد I wish عندما يكون الفاعل I أو we! اكتب I wish I could pass وليس I wish I would pass.'
		},
		practice: [
			{
				questionAr: 'Choose the correct future wish: I hope factories stop polluting rivers soon. Complete: I wish factories .......... polluting rivers soon.',
				options: ['would stop', 'stopped', 'had stopped', 'will stop'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: تمني تغير سلوك في المستقبل لفاعل غير المتكلم يأخذ would + Stem.',
					'خطأ: الماضي البسيط لتمني حالة حاضرة ثابتة لا رغبة مستقبلية بـ soon.',
					'خطأ: الماضي التام للندم على الماضي.',
					'خطأ: لا نستخدم will بعد I wish.'
				],
				explanationAr: 'لتمني تغير سلوك مستقبلي مع فاعل غير I/we نستخدم would + Stem.'
			},
			{
				questionAr: 'Choose the right form for speaker future wish: I wish I .......... speak four foreign languages fluently.',
				options: ['could', 'would', 'will', 'can'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: مع الضمير I نستخدم could ولا نستخدم would بعد I wish.',
					'خطأ: لا نقول I wish I would.',
					'خطأ: لا نضع will بعد I wish.',
					'خطأ: يجب إرجاع can إلى could.'
				],
				explanationAr: 'مع I و we بعد I wish / If only نستعمل could + Stem.'
			},
			{
				questionAr: 'Rewrite: She regrets not applying for the scholarship last year. Complete: If only she .......... for the scholarship last year.',
				options: ['had applied', 'applied', 'had not applied', 'would apply'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: ندم على فعل لم يقع في الماضي (not applying) فيصبح مثبتاً في الماضي التام (had applied).',
					'خطأ: الندم على الماضي يستوجب Past Perfect.',
					'خطأ: نسيت عكس النفي إلى إثبات.',
					'خطأ: would للمستقبل وليس للماضي (last year).'
				],
				explanationAr: 'If only + Past Perfect تعبر عن الندم على الماضي مع عكس الإثبات والنفي.'
			},
			{
				questionAr: 'Rewrite with Unless: If the board does not audit accounts annually, embezzlement will spread.',
				options: [
					'Unless the board audits accounts annually, embezzlement will spread.',
					'Unless the board does not audit accounts annually, embezzlement will spread.',
					'Unless the board audit accounts annually, embezzlement will spread.',
					'Unless the board audits accounts annually, embezzlement will not spread.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: حذفنا does not وأضفنا -s للفعل مع المفرد (audits) وحافظنا على جواب الشرط.',
					'خطأ: نفي مزدوج غير مقبول.',
					'خطأ: the board مفرد فتتطلب audits.',
					'خطأ: قلب جواب الشرط أفسد المعنى.'
				],
				explanationAr: 'If + does not + Stem تتحول إلى Unless + Verb-s مع إبقاء جواب الشرط.'
			},
			{
				questionAr: 'Complete: It is high time educational institutions .......... honesty as a core value.',
				options: ['promoted', 'promote', 'should promote', 'will promote'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد It is high time + Subject نستعمل Past Simple (promoted).',
					'خطأ: المضارع خطأ هنا.',
					'خطأ: نحذف should مع It is high time.',
					'خطأ: لا نستخدم المستقبل.'
				],
				explanationAr: 'It is high time + Subject + Past Simple.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Result & Emphasis (so...that, such...that, so many / so much...that)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t2_result_clauses',
		slug: 'eng-3as-le-t2-result-clauses',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't2',
		sequenceId: 'unit2',
		sequenceTitleAr: 'الوحدة 2 و 3: أخلاقيات العمل والتعليم في العالم (Ethics & Education)',
		order: 2,
		titleAr: 'التعبير عن النتيجة والتوكيد المتقدم: So ... that / Such ... that / So many & So much ... that',
		objectives: [
			'التمييز الدقيق بين so + adj/adv + that و such + (a/an) + adj + noun + that',
			'استعمال التراكيب الكمية المتقدمة: so many / so few + plural noun + that و so much / so little + uncountable + that',
			'إعادة صياغة جمل السبب والنتيجة (because / therefore / consequently) باستعمال so...that و such...that'
		],
		keywordsAr: ['so...that', 'such...that', 'so many...that', 'so much...that', 'Result Clauses'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية، يُختبر الطالب في التمييز بين such + noun وبين so many/much + noun، وكذلك في تحويل جمل therefore و as a result إلى so...that أو such...that.',
			svg: svgEnglishGrammarMap({
				title: 'Advanced Result Clauses (3AS LE)',
				rootLabel: 'Linking Intensity to Result',
				rootSub: 'Watch Quantifiers (many/much/few/little) carefully!',
				branches: [
					{
						label: 'so + Adj / Adv',
						rule: 'No noun immediately after adj',
						example: 'She wrote so clearly that all agreed.'
					},
					{
						label: 'such + (a/an) Adj + N',
						rule: 'Standard noun phrase',
						example: 'It was such an inspiring lecture that we applauded.'
					},
					{
						label: 'so + Quantifier + N',
						rule: 'so many/few | so much/little',
						example: 'There was so much fraud that banks intervened.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا نكتب so many students that وليس such many students that رغم وجود اسم جمع (students)؟',
					hintAr: 'تذكر الاستثناء الخاص بكلمات الكمية الأربع.',
					expectedInput: 'لأن many و much و few و little تأخذ دائماً so ولا تأخذ such',
					revealAr: 'استثناء مهم جداً في 3AS LE: الكلمات الأربع many / few / much / little تُسبق دائماً بـ so حتى لو تبعها اسم! أما a lot of فتُسبق بـ such.'
				},
				{
					promptAr: 'حوّل باستعمال such...that: Ben Badis had great dedication; consequently, his reformist schools spread nationwide.',
					hintAr: 'هل كلمة dedication اسم معدود أم غير معدود؟ احذف consequently.',
					expectedInput: 'Ben Badis had such great dedication that his reformist schools spread nationwide.',
					revealAr: 'dedication اسم غير معدود فلا نضع a؛ ونحذف consequently ونربط بـ that.'
				},
				{
					promptAr: 'كيف نحول جملة Therefore: The syllabus is very rich; therefore, students gain broad culture (استعمل so...that)؟',
					hintAr: 'احذف very و therefore وضع so قبل الصفة و that بين الجملتين.',
					expectedInput: 'The syllabus is so rich that students gain broad culture.',
					revealAr: 'عند التحويل من therefore / as a result إلى so...that: نحذف ظرف التشديد (very) ونحذف أداة النتيجة (therefore) ونضع so...that.'
				}
			]
		},
		summary: {
			rulesAr: [
				'so + Adjective / Adverb + that + Clause (بدون اسم بعد الصفة).',
				'such + a/an + Adjective + Singular Countable Noun + that + Clause.',
				'such + Adjective + Plural / Uncountable Noun + that + Clause (بلا a/an).',
				'so + many / few + Plural Noun + that | so + much / little + Uncountable Noun + that.',
				'عند إعادة الكتابة: احذف الكلمات الزائدة مثل very, really, extremely وكذلك أدوات النتيجة therefore, consequently, as a result.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting Cause/Result into So/Such...that',
				rootLabel: 'Drop "very" + Drop "therefore / consequently"',
				rootSub: 'Clean BAC LE Sentence Transformation',
				branches: [
					{
						label: 'Adverb Example',
						rule: 'so + Adverb + that',
						example: 'He spoke so persuasively that they listened.'
					},
					{
						label: 'Uncountable Noun',
						rule: 'such + Adj + Uncountable (NO a)',
						example: 'such strict discipline that...'
					},
					{
						label: 'Quantifier Noun',
						rule: 'so much / so many + Noun + that',
						example: 'so many fake diplomas that...'
					}
				]
			}),
			visualCaptionAr: 'قواعد الربط والتحويل المتقدم لجمل النتيجة في بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Rewrite: a) Fake diplomas caused massive damage; as a result, employers tightened verification. | b) Fake diplomas caused such ..........',
					solutionAr: 'b) Fake diplomas caused such massive damage that employers tightened verification.'
				},
				{
					problemAr: 'Combine with (so...that): The scholar lectured very eloquently. The hall fell completely silent.',
					solutionAr: 'The scholar lectured so eloquently that the hall fell completely silent.'
				},
				{
					problemAr: 'Choose: There were (so / such) few certified inspectors that fraud went unnoticed.',
					solutionAr: 'There were so few certified inspectors that fraud went unnoticed.'
				}
			],
			watchOutAr: 'احذر ترك أداة النتيجة الأصلية! كتابة so strict that therefore... خطأ متكرر يفقدك نقطة السؤال.'
		},
		practice: [
			{
				questionAr: 'Complete: The audit uncovered .......... much corruption .......... the director resigned.',
				options: ['so ... that', 'such ... that', 'such a ... that', 'so ... therefore'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: قبل much نستعمل دائماً so...that.',
					'خطأ: such لا تسبق much.',
					'خطأ: لا نضع such a قبل much.',
					'خطأ: لا نجمع بين so و therefore.'
				],
				explanationAr: 'مع quantifiers (much, many, little, few) نستخدم so...that.'
			},
			{
				questionAr: 'Choose the right sentence:',
				options: [
					'It was such an impressive achievement that the entire community celebrated.',
					'It was such impressive achievement that the entire community celebrated.',
					'It was so an impressive achievement that the entire community celebrated.',
					'It was such a impressive achievement that the entire community celebrated.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: impressive achievement مفرد معدود يبدأ بصوت علة /i/ فيأخذ such an...that.',
					'خطأ: نسيت أداة التنكير an قبل الاسم المفرد المعدود.',
					'خطأ: لا نستخدم so مع عبارة اسمية تبدأ بـ an.',
					'خطأ: قبل الصوت المتحرك نضع an وليس a.'
				],
				explanationAr: 'such + an + vowel-sound adjective + singular countable noun + that.'
			},
			{
				questionAr: 'Rewrite cleanly: The exam was extremely challenging; consequently, only well-prepared candidates excelled.',
				options: [
					'The exam was so challenging that only well-prepared candidates excelled.',
					'The exam was so extremely challenging that only well-prepared candidates excelled.',
					'The exam was such challenging that only well-prepared candidates excelled.',
					'The exam was so challenging that consequently only well-prepared candidates excelled.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: حذفنا extremely و consequently وربطنا بـ so...that.',
					'خطأ: بقاء extremely مع so حشو خاطئ.',
					'خطأ: الصفة challenging وحدها تأخذ so لا such.',
					'خطأ: بقاء consequently بعد that خطأ.'
				],
				explanationAr: 'نحذف ظرف التشديد (extremely) وأداة النتيجة (consequently) عند التحويل إلى so...that.'
			},
			{
				questionAr: 'Complete: Sheikh El Ibrahimi wrote .......... eloquently .......... his essays became models of Arabic prose.',
				options: ['so ... that', 'such ... that', 'such an ... that', 'so much ... that'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: eloquently ظرف (Adverb)، والظروف تأخذ so...that.',
					'خطأ: such لا تُستخدم قبل الظروف.',
					'خطأ: لا يوجد اسم مفرد معدود.',
					'خطأ: لا نضع much قبل ظرف منتهٍ بـ -ly.'
				],
				explanationAr: 'القاعدة: so + Adverb + that.'
			},
			{
				questionAr: 'Complete: Online diploma mills produce .......... forged certificates .......... recruiters verify every degree.',
				options: ['such', 'so', 'such a', 'so an'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: forged certificates جمع معدود بلا many فيأخذ such بدون a.',
					'خطأ: وجود الاسم certificates يمنع so (لعدم وجود many).',
					'خطأ: certificates جمع فلا يأخذ a.',
					'خطأ: تركيب غير صحيح.'
				],
				explanationAr: 'مع الاسم الجمع الموصوف دون many نستعمل such + Adj + Plural Noun + that.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Complex Passive Voice & Advanced Reported Speech
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t2_complex_passive_reported',
		slug: 'eng-3as-le-t2-complex-passive-reported',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't2',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 2 و 3: أخلاقيات العمل والتعليم في العالم (Ethics & Education)',
		order: 3,
		titleAr: 'المبني للمجهول المركّب (Complex Passive) والكلام المنقول المتقدم (Advanced Reported Speech)',
		objectives: [
			'إتقان المبني للمجهول مع الأفعال التامة والمستمرة والناقصة وصيغة التقرير غير الشخصي (It is said that / He is believed to)',
			'تحويل الكلام المنقول المتقدم باستعمال أفعال نقل دلالية (warned, advised, denied, accused, urged, apologized)',
			'تجنب أخطاء الترتيب والضمائر والأزمنة في تمارين إعادة الكتابة لشعبة اللغات الأجنبية'
		],
		keywordsAr: ['Complex Passive', 'Impersonal Passive', 'Reported Speech', 'Reporting Verbs'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية (3AS LE)، قد يطلب الامتحان تحويل جمل مبني للمجهول غير شخصي مثل People believe that honesty brings barakah، أو نقل كلام بأفعال نقل متخصصة مثل advised / warned / asked.',
			svg: svgEnglishGrammarMap({
				title: 'Complex Passive & Reporting Verbs (3AS LE)',
				rootLabel: 'Master High-Level BAC LE Rewriting',
				rootSub: 'Exact patterns that earn full marks',
				branches: [
					{
						label: 'Continuous & Perfect Passive',
						rule: 'is/was being V3 | has/had been V3',
						example: 'New labs are being built this year.'
					},
					{
						label: 'Impersonal Passive',
						rule: 'It is believed that... / S is believed to...',
						example: 'Education is known to uplift nations.'
					},
					{
						label: 'Reporting Verbs',
						rule: 'warned/advised + Obj + (not) to + Stem',
						example: 'He warned traders not to hoard food.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'حوّل إلى المبني للمجهول غير الشخصي بطريقتين: People say that education reduces poverty.',
					hintAr: 'الطريقة الأولى تبدأ بـ It is said that... والثانية تبدأ بـ Education is said to...',
					expectedInput: 'It is said that education reduces poverty. / Education is said to reduce poverty.',
					revealAr: 'مع أفعال القول والاعتقاد (say, believe, think, know): (1) It is + V3 + that-clause، أو (2) Subject + is/are + V3 + to + Stem.'
				},
				{
					promptAr: 'ما صيغة المبني للمجهول من Past Continuous: Inspectors were examining the documents؟',
					hintAr: 'أضف being قبل التصريف الثالث.',
					expectedInput: 'The documents were being examined by inspectors.',
					revealAr: 'Past Continuous Passive = was / were + being + V3.'
				},
				{
					promptAr: 'كيف ننقل السؤال المباشر: She asked him, "Have you submitted your research paper?"',
					hintAr: 'سؤال Yes/No في Present Perfect يتحول إلى if + Subject + Past Perfect.',
					expectedInput: 'She asked him if he had submitted his research paper.',
					revealAr: 'نستعمل if (أو whether)، ونعيد الترتيب إلى الفاعل قبل الفعل، ونرجع have submitted إلى had submitted.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المبني للمجهول المركّب: Continuous Passive = is/are/was/were + being + V3 | Perfect Passive = has/have/had + been + V3 | Modal Perfect Passive = should/must + have been + V3.',
				'المبني للمجهول غير الشخصي (Impersonal Passive): People believe that X is important تصبح: It is believed that X is important أو X is believed to be important.',
				'الكلام المنقول بأفعال نقل متخصصة: advised / urged / warned / reminded + Object + (not) to + Stem | suggested / admitted / denied + Verb-ing | apologized for + Verb-ing.',
				'تذكير مهم في نقل الأسئلة: احذف علامة الاستفهام وعلامتي التنصيص وألغِ تقديم الفعل المساعد على الفاعل (asked + if/Wh- + S + V).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Reporting Verbs Grammar Patterns',
				rootLabel: 'Choose the Exact Verb Complement',
				rootSub: 'Frequent in 3AS LE Text Exploration',
				branches: [
					{
						label: 'that + Clause',
						rule: 'declared / stated / claimed / explained',
						example: 'She stated that ethics mattered.'
					},
					{
						label: 'Obj + (not) to + Stem',
						rule: 'advised / warned / urged / ordered',
						example: 'He urged pupils to read daily.'
					},
					{
						label: 'Verb-ing (Gerund)',
						rule: 'denied / admitted / suggested',
						example: 'He denied forging the signature.'
					}
				]
			}),
			visualCaptionAr: 'أنماط أفعال النقل المتقدمة التي ترفع دقة الإجابة في شعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Rewrite: a) Experts believe that Ben Badis schools preserved Algeria identity. | b) Ben Badis schools are ..........',
					solutionAr: 'b) Ben Badis schools are believed to have preserved Algeria identity (OR It is believed that Ben Badis schools preserved...).'
				},
				{
					problemAr: 'Rewrite: a) The inspector said to the merchant, "Never sell expired products." | b) The inspector warned ..........',
					solutionAr: 'b) The inspector warned the merchant not to sell expired products.'
				},
				{
					problemAr: 'Rewrite: a) Someone had altered the official exam sheet. | b) The official exam sheet ..........',
					solutionAr: 'b) The official exam sheet had been altered.'
				}
			],
			watchOutAr: 'في التحويل للمجهول غير الشخصي إذا كان الفعل داخل جملة that في الماضي (preserved)، نستخدم صيغة المصدر التام to have + V3: are believed to have preserved!'
		},
		practice: [
			{
				questionAr: 'Turn into Passive: The committee was reviewing all scholarship applications. Complete: All scholarship applications .......... by the committee.',
				options: ['were being reviewed', 'was being reviewed', 'were reviewed', 'have been reviewed'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: Past Continuous مع فاعل جمع (applications) يتحول إلى were being reviewed.',
					'خطأ: applications جمع فتأخذ were لا was.',
					'خطأ: أسقطت الاستمرار (being).',
					'خطأ: غيّرت الزمن إلى المضارع التام.'
				],
				explanationAr: 'Past Continuous Passive للجمع: were + being + V3.'
			},
			{
				questionAr: 'Rewrite using Impersonal Passive: People know that illiteracy hinders development. Complete: Illiteracy is known .......... development.',
				options: ['to hinder', 'hindering', 'hindered', 'that hinders'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الصيغة الشخصية للمجهول غير الشخصي هي Subject + is known + to + Stem.',
					'خطأ: لا نستخدم Gerund هنا.',
					'خطأ: لا نضع V3 مباشرة بعد known.',
					'خطأ: that تستعمل مع It is known that وليس مع الفاعل الشخصي.'
				],
				explanationAr: 'Subject + is/are + said/known/believed + to + Stem.'
			},
			{
				questionAr: 'Choose the right complement after "denied": The suspect denied .......... any bribe from the contractor.',
				options: ['accepting', 'to accept', 'accepted', 'accept'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الفعل deny (ينكر) يُتبع دائماً بصيغة Gerund (Verb-ing).',
					'خطأ: deny لا يُتبع بـ to + Stem.',
					'خطأ: لا يُتبع بالتصريف الماضي مباشرة.',
					'خطأ: لا يُتبع بالمصدر المجرد.'
				],
				explanationAr: 'أفعال النقل deny / admit / suggest تُتبع بـ Verb-ing (أو جملة that).'
			},
			{
				questionAr: 'Report the question accurately: The journalist asked the dean, "How can schools prevent dropout?"',
				options: [
					'The journalist asked the dean how schools could prevent dropout.',
					'The journalist asked the dean how could schools prevent dropout.',
					'The journalist asked the dean how schools can prevent dropout.',
					'The journalist asked the dean if how schools could prevent dropout.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: أداة الاستفهام how + الفاعل (schools) + الفعل المحوّل (could prevent).',
					'خطأ: بقيت صيغة الاستفهام (could schools).',
					'خطأ: لم تحول can إلى could مع فعل النقل الماضي asked.',
					'خطأ: لا نجمع بين if و how.'
				],
				explanationAr: 'في نقل سؤال Wh- نضع الفاعل قبل الفعل ونرجع can إلى could.'
			},
			{
				questionAr: 'Turn into Modal Perfect Passive: Authorities should have inspected that factory earlier. Complete: That factory .......... earlier.',
				options: ['should have been inspected', 'should be inspected', 'should has been inspected', 'was inspected'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: Modal Perfect Passive = should have + been + V3.',
					'خطأ: هذه صيغة المضارع وليست الماضي (should have).',
					'خطأ: بعد should نكتب have دائماً لا has.',
					'خطأ: حذفت معنى اللوم والوجوب (should have).'
				],
				explanationAr: 'should have + V3 تتحول في المبني للمجهول إلى should have been + V3.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Discourse Cohesion & Reordering Scrambled Sentences (BAC LE Task)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t2_discourse_reordering',
		slug: 'eng-3as-le-t2-discourse-reordering',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't2',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 2 و 3: أخلاقيات العمل والتعليم في العالم (Ethics & Education)',
		order: 4,
		titleAr: 'الاتساق النصي وترتيب الجمل المبعثرة (Discourse Reordering) في بكالوريا اللغات الأجنبية',
		objectives: [
			'اكتشاف الجملة المفتاحية (Topic Sentence) من بين أربع جمل مبعثرة في تمرين Reorder the following sentences',
			'تتبع خيوط الاتساق النصي: الضمائر الإحالية (they, it, this, such) وأدوات الربط (First, However, Consequently, Therefore)',
			'إتقان حل تمرين ترتيب الفقرة في بكالوريا اللغات الأجنبية بثقة ودقة عالية'
		],
		keywordsAr: ['Discourse Reordering', 'Cohesion', 'Topic Sentence', 'Reference Pronouns', 'Linkers'],
		discover: {
			scenarioAr:
				'من أبرز تمارين قسم Text Exploration في بكالوريا اللغات الأجنبية تمرين: Reorder the following sentences to make a coherent paragraph (أربع جمل a, b, c, d). الحل لا يعتمد على التخمين، بل على مفاتيح علمية دقيقة!',
			svg: svgEnglishWritingStructure({
				title: '4-Step Discourse Reordering Strategy (BAC LE)',
				steps: [
					{
						stage: '1. Topic Sentence',
						detail: 'Find the general statement with NO starting pronoun (it/they/this) or "However/Thus"'
					},
					{
						stage: '2. Follow Pronouns',
						detail: 'Link "they / these / such practices" directly back to the noun they replace'
					},
					{
						stage: '3. Track Linkers',
						detail: 'Order sequence: First / For example / However / Therefore / Finally'
					},
					{
						stage: '4. Read Aloud Check',
						detail: 'Verify smooth Cause to Effect or Problem to Solution flow from 1 to 4'
					}
				]
			}),
			steps: [
				{
					promptAr: 'أي جملة من الجملتين تصلح لتكون الجملة الأولى (Topic Sentence): (a) Therefore, schools must teach digital ethics. أم (b) Plagiarism has become a serious challenge in modern classrooms.؟',
					hintAr: 'الجملة الأولى تقدم الموضوع العام ولا تبدأ بأداة نتيجة مثل Therefore.',
					expectedInput: 'الجملة (b) لأنها جملة عامة مستقلة تقدم المشكلة',
					revealAr: 'الجملة التي تبدأ بـ Therefore أو However أو This problem لا يمكن أن تكون الجملة الأولى؛ الجملة (b) عامة ومستقلة فتتصدر الفقرة.'
				},
				{
					promptAr: 'إذا وردت عبارة "These schools" في الجملة (c)، أين يجب أن تكون الجملة التي ذُكر فيها الاسم "reformist schools"؟',
					hintAr: 'اسم الإشارة These يحيل إلى جمع ورد قبله مباشرة.',
					expectedInput: 'قبل الجملة (c) مباشرة',
					revealAr: 'أسماء الإشارة والضمائر (this, these, such, they, its) تعمل كالمغناطيس: تلتصق مباشرة بالجملة التي قدمت الاسم المقصود.'
				},
				{
					promptAr: 'أين تقع عادة الجملة التي تبدأ بـ Consequently أو As a result أو To solve this problem؟',
					hintAr: 'هل تأتي في البداية أم في النهاية كنتيجة أو حل؟',
					expectedInput: 'في المرتبة الثالثة أو الرابعة (كنتيجة أو خاتمة/حل)',
					revealAr: 'جمل النتيجة (Consequently / Therefore) وجمل الحل والتوصية تأتي دائماً بعد عرض الأسباب والمشكلة، غالباً في المرتبة الأخيرة (4).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المفتاح 1 (تحديد الجملة الأولى — Topic Sentence): هي الجملة العامة المستقلة التي تعرّف الموضوع أو تطرح المشكلة، وتخلو من الضمائر المبهمة (he, they, it, this) ومن روابط الوسط والخاتمة (However, Moreover, Therefore).',
				'المفتاح 2 (خيوط الإحالة — Pronouns & Demonstratives): اربط كل ضمير (they, their, it) أو اسم إشارة (this phenomenon, these measures, such dishonesty) بالاسم الذي ورد في الجملة السابقة له مباشرة.',
				'المفتاح 3 (الروابط المنطقية والزمنية): الإضافة (Moreover, Furthermore, In addition) تأتي بعد فكرة أولى مشابهة؛ الاستدراك (However, Yet) يعكس فكرة سابقة؛ النتيجة والحل (Consequently, Therefore, Thus, Finally) تختم الفقرة.',
				'المفتاح 4 (التسلسل الزمني والمنطقي): عام إلى خاص (General to Specific)، سبب إلى نتيجة (Cause to Effect)، مشكلة إلى حل (Problem to Solution)، وماضٍ إلى حاضر (Chronological order).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Clues That Reveal Sentence Position',
				rootLabel: 'Cohesion Signals in Scrambled Paragraphs',
				rootSub: 'Match Every Signal to Its Slot',
				branches: [
					{
						label: 'Slot 1 (Opening)',
						rule: 'Full noun, general idea',
						example: 'Counterfeiting harms every economy.'
					},
					{
						label: 'Slots 2 & 3 (Body)',
						rule: 'Pronouns, examples, contrast',
						example: 'It causes... / Moreover, fake goods...'
					},
					{
						label: 'Slot 4 (Closing)',
						rule: 'Result, solution, conclusion',
						example: 'Therefore, strict laws are vital.'
					}
				]
			}),
			visualCaptionAr: 'مؤشرات تحديد موقع كل جملة في تمرين ترتيب الفقرة.',
			examples: [
				{
					problemAr: 'Reorder: a) Consequently, honest manufacturers suffer severe losses. | b) Counterfeiting is a growing threat to fair trade. | c) Therefore, consumers must verify product authenticity. | d) It floods markets with cheap, unsafe imitations.',
					solutionAr: 'Correct order: 1-b (Topic) | 2-d ("It" refers to Counterfeiting) | 3-a (Result of flooding markets) | 4-c (Final solution: Therefore, consumers...).'
				},
				{
					problemAr: 'Reorder: a) These institutions taught Arabic, Islamic values, and modern sciences. | b) In 1931, Imam Ben Badis and fellow scholars founded the Association of Algerian Muslim Scholars. | c) As a result, a conscious and educated generation emerged. | d) They soon opened dozens of free schools across Algeria.',
					solutionAr: 'Correct order: 1-b (Chronological opening: 1931) | 2-d ("They" = Ben Badis and fellow scholars) | 3-a ("These institutions" = dozens of free schools) | 4-c (Final result: As a result...).'
				}
			],
			watchOutAr: 'لا تكتفِ بتحديد الجملة الأولى فقط ثم تخمين الباقي! تحقق دائماً من أن كل ضمير في الجملة (n) يجد مرجعه الصريح في الجملة (n-1).'
		},
		practice: [
			{
				questionAr: 'Which sentence MUST come FIRST (Topic Sentence) in a paragraph about academic integrity?',
				options: [
					'Academic integrity is the cornerstone of every trustworthy educational system.',
					'However, some students still copy essays from the internet without citation.',
					'Therefore, universities now use verification tools to detect plagiarism.',
					'This dishonest habit weakens their real intellectual growth.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: جملة تعريفية عامة ومستقلة تخلو من الروابط المتأخرة أو الضمائر المبهمة.',
					'خطأ: تبدأ بـ However فلا تكون الأولى.',
					'خطأ: تبدأ بـ Therefore (نتيجة وخاتمة).',
					'خطأ: تبدأ بـ This dishonest habit فتحيل إلى شيء سبق ذكره.'
				],
				explanationAr: 'الجملة الأولى تعرف الموضوع العام دون الاعتماد على جملة سابقة.'
			},
			{
				questionAr: 'Reorder these 4 sentences: (a) Therefore, parents and teachers should cooperate closely. (b) School dropout remains a concern in many regions. (c) Moreover, lack of guidance makes learning harder. (d) It is often caused by economic hardship.',
				options: ['b - d - c - a', 'd - b - c - a', 'b - c - a - d', 'a - b - d - c'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: b تقدم المشكلة، d تبدأ بـ It العائدة على dropout وتذكر السبب الأول، c تضيف سبباً آخر بـ Moreover، و a تختم بالحل بـ Therefore.',
					'خطأ: لا نبدأ بالضمير المبهم It.',
					'خطأ: a خاتمة فلا تأتي قبل d.',
					'خطأ: لا نبدأ بـ Therefore.'
				],
				explanationAr: 'التسلسل المنطقي: مشكلة (b) + سبب أول بضمير عائد (d) + سبب ثانٍ بـ Moreover (c) + حل بـ Therefore (a).'
			},
			{
				questionAr: 'Look at the phrase "Such unethical practices" at the start of sentence (c). What does this clue tell you?',
				options: [
					'The preceding sentence must mention plural unethical actions like bribery or fraud',
					'Sentence (c) must be the opening sentence of the paragraph',
					'The preceding sentence must be a conclusion',
					'Sentence (c) has no link to any other sentence'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: عبارة Such + plural noun تحيل مباشرة إلى ممارسات جمع وردت في الجملة السابقة.',
					'خطأ: لا تبدأ الجملة الأولى بـ Such + noun.',
					'خطأ: بل تسبق الخاتمة أو تتبع عرض الأمثلة.',
					'خطأ: Such من أقوى روابط الاتساق.'
				],
				explanationAr: 'عبارة Such + noun تربط الجملة مباشرة بالاسم الموصوف في الجملة التي تسبقها.'
			},
			{
				questionAr: 'Which sentence logically follows: "Algeria established hundreds of public libraries after independence."?',
				options: [
					'These libraries gave rural and urban pupils free access to knowledge.',
					'Before independence, colonial policies restricted schooling.',
					'In conclusion, reading requires quiet spaces.',
					'However, smartphones were invented recently.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: عبارة These libraries تحيل مباشرة إلى public libraries وتشرح أثرها.',
					'خطأ: يعود للوراء زمنياً دون رابط مناسب.',
					'خطأ: قفزة مفاجئة إلى الخاتمة.',
					'خطأ: فكرة بعيدة غير مترابطة.'
				],
				explanationAr: 'تكرار الاسم مع أداة الإشارة (These libraries) يحقق اتصالاً مباشراً وسلساً.'
			},
			{
				questionAr: 'In a coherent Problem-Solution paragraph, which order of linkers is the most logical?',
				options: [
					'Topic sentence, First, Furthermore, Consequently',
					'Consequently, First, Topic sentence, Furthermore',
					'Furthermore, Topic sentence, Consequently, First',
					'First, Consequently, Topic sentence, Furthermore'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: جملة موضوع، ثم الفكرة الأولى (First)، ثم الإضافة (Furthermore)، ثم النتيجة الختامية (Consequently).',
					'خطأ: لا نبدأ بالنتيجة Consequently.',
					'خطأ: لا نبدأ بالإضافة Furthermore.',
					'خطأ: جملة الموضوع تتقدم على التفصيل.'
				],
				explanationAr: 'البنية المعيارية للفقرة الإنجليزية: Topic Sentence ثم Supporting Details ثم Concluding Result.'
			}
		]
	}
];
