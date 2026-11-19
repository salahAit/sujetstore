import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishWritingStructure
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — yearSubjectId: 770, coeff 3, 7+8+5=20)
 * Interactive Lessons — Trimester 3: Unit 3 "Schools: Different and Alike" & BAC Revision (5 lessons)
 */
export const LESSONS_3AS_LP_T3: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Conditional Types 1, 2 & 3 and Rewriting with Unless
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t3_conditionals_unless',
		slug: 'eng-3as-lp-t3-conditionals-unless',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't3',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 3: Schools: Different and Alike (التعليم في العالم والمراجعة للبكالوريا)',
		order: 1,
		titleAr: 'الجملة الشرطية بأنواعها الثلاثة (Conditionals 1, 2, 3) وأداة النفي Unless',
		objectives: [
			'ضبط أزمنة أنواع الشرط الثلاثة: النوع الأول (محتمل)، النوع الثاني (تخيلي حاضر)، النوع الثالث (ندم ماضٍ)',
			'التحويل الدقيق بين If ... not و Unless في تمارين البكالوريا دون الوقوع في النفي المزدوج',
			'توظيف الجمل الشرطية في مناقشة قضايا التعليم وتطوير المدارس'
		],
		keywordsAr: ['Conditionals', 'Type 1', 'Type 2', 'Type 3', 'Unless', 'If not'],
		discover: {
			scenarioAr:
				'أدرك الإمام عبد الحميد بن باديس والشيخ محمد البشير الإبراهيمي أن الأمة لن تنهض ما لم تتعلم. للتعبير عن «ما لم / إذا لم» نستعمل Unless التي تساوي If ... not.',
			svg: svgEnglishGrammarMap({
				title: 'Conditional Types 1, 2 & 3',
				rootLabel: 'If Clause + Main Clause',
				rootSub: 'Match the tenses accurately in BAC exams',
				branches: [
					{
						label: 'Type 1 (Real)',
						rule: 'If + Present Simple, will + Stem',
						example: 'If you revise, you will succeed.'
					},
					{
						label: 'Type 2 (Unreal Present)',
						rule: 'If + Past Simple, would + Stem',
						example: 'If schools had labs, pupils would excel.'
					},
					{
						label: 'Type 3 (Past Regret)',
						rule: 'If + had + V3, would have + V3',
						example: 'If he had studied, he would have passed.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما المعنى الحرفي لأداة الشرط Unless؟',
					hintAr: 'تتضمن النفي داخلها تلقائياً.',
					expectedInput: 'If ... not (إذا لم / ما لم)',
					revealAr: 'Unless تساوي تماماً If ... not، ولذلك يأتي الفعل بعدها دائماً مثبتاً (Affirmative) لأن النفي مدمج داخل Unless.'
				},
				{
					promptAr: 'حوّل الجملة التالية باستعمال Unless: If students do not read regularly, their vocabulary will remain weak.',
					hintAr: 'احذف If و do not واترك الجملة الثانية كما هي.',
					expectedInput: 'Unless students read regularly, their vocabulary will remain weak.',
					revealAr: 'عند تحويل جملة شرط منفية (If + negative) إلى Unless: نحذف If وأداة النفي (do not / does not / did not) ونثبت الفعل مع الحفاظ على جواب الشرط كما هو.'
				},
				{
					promptAr: 'ماذا نفعل بجواب الشرط إذا كانت جملة If الأصلية مثبتة (If you work hard, you will pass) وأردنا إدخال Unless؟',
					hintAr: 'للمحافظة على المعنى، نعكس جواب الشرط!',
					expectedInput: 'Unless you work hard, you will not pass.',
					revealAr: 'إذا كانت جملة If مثبتة وأدخلنا Unless، يجب عكس جواب الشرط (will pass تصبح will not pass) حتى لا ينقلب المعنى.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Conditional Type 1 (واقعي محتمل): If + Present Simple , S + will (not) + Stem.',
				'Conditional Type 2 (تخيلي في الحاضر): If + Past Simple (were مع to be) , S + would (not) + Stem.',
				'Conditional Type 3 (ماضٍ غير متحقق): If + Past Perfect (had + V3) , S + would (not) have + V3.',
				'قاعدة Unless الذهبية: (1) إذا كانت جملة If منفية: نحذف If والنفي ولا نغير جواب الشرط (If he does not study, he will fail تصبح Unless he studies, he will fail). (2) إذا كانت جملة If مثبتة: نضع Unless ونعكس إثبات/نفي جواب الشرط.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting with UNLESS (BAC Formula)',
				rootLabel: 'Unless = If ... not (Never double negative!)',
				rootSub: 'Check whether the original If-clause is negative or affirmative',
				branches: [
					{
						label: 'Case A: Negative If',
						rule: 'Drop "not", keep Main Clause',
						example: 'If he does not work, he fails = Unless he works, he fails.'
					},
					{
						label: 'Case B: Affirmative If',
						rule: 'Keep verb, flip Main Clause',
						example: 'If you revise, you pass = Unless you revise, you will not pass.'
					},
					{
						label: '3rd Person Check',
						rule: 'Drop "does not" and add -s!',
						example: 'does not study becomes studies'
					}
				]
			}),
			visualCaptionAr: 'القاعدة المختصرة لحل كل أسئلة Unless في البكالوريا دون خطأ.',
			examples: [
				{
					problemAr: 'Rewrite with (Unless): a) If the school does not equip the library, pupils will lack books. | b) Unless ..........',
					solutionAr: 'b) Unless the school equips the library, pupils will lack books.'
				},
				{
					problemAr: 'Rewrite with (Unless): a) If you attend all workshops, you will master writing. | b) Unless ..........',
					solutionAr: 'b) Unless you attend all workshops, you will not master writing.'
				},
				{
					problemAr: 'Put in Type 3: If he (attend) the revision class, he (understand) the grammar rule.',
					solutionAr: 'If he had attended the revision class, he would have understood the grammar rule.'
				}
			],
			watchOutAr: 'انتبه عند حذف does not مع الفاعل المفرد الغائب (he/she/it): لا تنس إعادة حرف -s إلى الفعل (does not revise تصبح revises)!'
		},
		practice: [
			{
				questionAr: 'Rewrite with Unless: If a pupil does not revise daily, he will forget the rules.',
				options: [
					'Unless a pupil revises daily, he will forget the rules.',
					'Unless a pupil does not revise daily, he will forget the rules.',
					'Unless a pupil revise daily, he will forget the rules.',
					'Unless a pupil revises daily, he will not forget the rules.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: حذفنا does not وأعدنا -s للفعل (revises) مع إبقاء جواب الشرط.',
					'خطأ: نفي مزدوج (Unless + does not).',
					'خطأ: نسيت إضافة -s للفعل مع المفرد الغائب a pupil.',
					'خطأ: عكست جواب الشرط فأفسدت المعنى.'
				],
				explanationAr: 'حذف does not يتطلب إضافة -s للفعل مع الفاعل المفرد الغائب.'
			},
			{
				questionAr: 'Complete (Type 2): If every rural village .......... a public library, students would read more.',
				options: ['had', 'has', 'will have', 'had had'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: وجود would read يدل على النوع الثاني، فنحتاج Past Simple (had).',
					'خطأ: has للمضارع (النوع الأول).',
					'خطأ: لا نضع will بعد If.',
					'خطأ: had had للنوع الثالث (would have read).'
				],
				explanationAr: 'في الشرط من النوع الثاني: If + Past Simple , would + Stem.'
			},
			{
				questionAr: 'Complete (Type 3): If she had managed her time well, she .......... the essay.',
				options: ['would have finished', 'would finish', 'will finish', 'finished'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: جملة الشرط في الماضي التام (had managed) فتتطلب would have + V3.',
					'خطأ: would finish للنوع الثاني.',
					'خطأ: will finish للنوع الأول.',
					'خطأ: ينقص would have.'
				],
				explanationAr: 'في النوع الثالث: If + had + V3 , would have + V3.'
			},
			{
				questionAr: 'Rewrite with Unless: If governments invest in teachers, education will improve.',
				options: [
					'Unless governments invest in teachers, education will not improve.',
					'Unless governments invest in teachers, education will improve.',
					'Unless governments do not invest in teachers, education will improve.',
					'Unless governments invested in teachers, education will not improve.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: الجملة الأصلية مثبتة فوضعنا Unless وعكسنا جواب الشرط إلى النفي (will not improve).',
					'خطأ: المعنى انقلب تماماً بعدم نفي جواب الشرط.',
					'خطأ: لا نجمع بين Unless و do not.',
					'خطأ: غيّرت الزمن إلى الماضي دون مبرر.'
				],
				explanationAr: 'عندما تكون جملة If مثبتة، إدخال Unless يستلزم عكس جواب الشرط.'
			},
			{
				questionAr: 'Choose the correct form: Unless parents .......... their children at home, school dropout may increase.',
				options: ['support', 'will support', 'do not support', 'supporting'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد Unless يأتي المضارع البسيط المثبت (support).',
					'خطأ: لا نضع will بعد أداة الشرط.',
					'خطأ: لا نضع النفي بعد Unless.',
					'خطأ: صيغة غير صحيحة نحوياً.'
				],
				explanationAr: 'Unless تُتبع بفعل مثبت في المضارع البسيط مع النوع الأول.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Reported Speech (Statements, Questions, Advice)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t3_reported_speech',
		slug: 'eng-3as-lp-t3-reported-speech',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't3',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 3: Schools: Different and Alike (التعليم في العالم والمراجعة للبكالوريا)',
		order: 2,
		titleAr: 'الكلام المنقول في البكالوريا: Reported Speech (الخبر، السؤال، النصيحة)',
		objectives: [
			'تحويل الجمل الخبرية المباشرة إلى كلام منقول مع ضبط تغيير الأزمنة والضمائر والظروف الزمنية',
			'تحويل أسئلة Yes/No (بـ if/whether) وأسئلة Wh- (بإلغاء قلب الفاعل والفعل)',
			'نقل الأوامر والنصائح باستعمال advised / told / ordered + Object + (not) to + Stem'
		],
		keywordsAr: ['Reported Speech', 'Indirect Speech', 'Tense Backshift', 'Reported Questions'],
		discover: {
			scenarioAr:
				'في بكالوريا آداب وفلسفة يتكرر سؤال نقل كلام مدير مدرسة أو أستاذ أو باحث تربوي (He said that... / She asked me if...). ضبط جدول تحويل الأزمنة يضمن لك العلامة الكاملة.',
			svg: svgEnglishGrammarMap({
				title: 'Reported Speech Transformation Map',
				rootLabel: 'When Reporting Verb is in the Past (said / asked / told)',
				rootSub: 'Shift Tense Back + Adapt Pronouns & Time Markers',
				branches: [
					{
						label: 'Statements',
						rule: 'said (that) + S + Backshifted Verb',
						example: '"I study hard" = He said he studied hard.'
					},
					{
						label: 'Questions',
						rule: 'asked + if/Wh- + S + V (No do/does/did!)',
						example: '"Do you read?" = She asked if I read.'
					},
					{
						label: 'Orders & Advice',
						rule: 'told / advised + Obj + (not) to + Stem',
						example: '"Revise well!" = He advised us to revise well.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'إذا كان فعل النقل في المضارع (He says / She tells us)، هل نغير أزمنة الأفعال داخل الجملة المنقولة؟',
					hintAr: 'تذكر شرط الـ Backshift.',
					expectedInput: 'لا، تبقى الأزمنة كما هي وتُعدل الضمائر فقط',
					revealAr: 'لا يحدث تحويل الأزمنة (Backshift) إلا إذا كان فعل النقل في الماضي (said, told, asked, declared). أما مع says فنغير الضمائر فقط.'
				},
				{
					promptAr: 'ماذا نضع لربط سؤال يبدأ بـ Do / Did / Have / Can عند تحويله إلى كلام منقول؟',
					hintAr: 'إنه رابط يعني «ما إذا».',
					expectedInput: 'if أو whether',
					revealAr: 'أسئلة Yes/No تُربط بـ if أو whether، ونحذف do/does/did ونعيد ترتيب الجملة إلى Subject + Verb بلا علامة استفهام.'
				},
				{
					promptAr: 'كيف ننقل الجملة: The headmaster said, "Do not neglect your homework."؟',
					hintAr: 'هذا نهي (Negative imperative).',
					expectedInput: 'The headmaster told us not to neglect our homework.',
					revealAr: 'النهي المباشر (Do not + Stem) يُنقل بصيغة: told / advised / warned + Object + not to + Stem.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تحويل الأزمنة مع فعل نقل ماضٍ (said/asked): Present Simple يصبح Past Simple | Present Continuous يصبح Past Continuous | Past Simple و Present Perfect يصبحان Past Perfect (had + V3) | will تصبح would | can تصبح could | must تصبح had to.',
				'تحويل الظروف: now تصبح then | today تصبح that day | yesterday تصبح the day before | tomorrow تصبح the following day | here تصبح there | this تصبح that.',
				'نقل الأسئلة (Reported Questions): (1) سؤال Yes/No: asked + if/whether + S + V. (2) سؤال Wh-: asked + Wh-word + S + V (نحذف علامة الاستفهام ونضع الفاعل قبل الفعل!).',
				'نقل الأمر والنصيحة: told / advised / urged + Object + to + Stem (وفي النهي: not to + Stem).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Tense Backshift Quick Table',
				rootLabel: 'Direct Speech to Reported Speech',
				rootSub: 'Only when reporting verb is PAST (said / asked)',
				branches: [
					{
						label: 'Present to Past',
						rule: 'write = wrote | is = was',
						example: 'am reading = was reading'
					},
					{
						label: 'Past / Perf to Past Perf',
						rule: 'wrote / has written = had written',
						example: 'went = had gone'
					},
					{
						label: 'Modals',
						rule: 'will = would | can = could',
						example: 'must = had to | may = might'
					}
				]
			}),
			visualCaptionAr: 'ملخص تحويل الأزمنة والأفعال الناقصة في الكلام المنقول.',
			examples: [
				{
					problemAr: 'Report: a) The teacher said, "Education builds a strong nation." | b) The teacher said that ..........',
					solutionAr: 'b) The teacher said that education built (OR builds as a general truth) a strong nation.'
				},
				{
					problemAr: 'Report: a) He asked me, "Where did you study last year?" | b) He asked me ..........',
					solutionAr: 'b) He asked me where I had studied the previous year.'
				},
				{
					problemAr: 'Report: a) The educator said, "Read useful books every day." | b) The educator advised students ..........',
					solutionAr: 'b) The educator advised students to read useful books every day.'
				}
			],
			watchOutAr: 'في السؤال المنقول (Wh-question)، احذر بقاء صيغة الاستفهام! لا تكتب He asked me where did I study — الصواب: He asked me where I had studied.'
		},
		practice: [
			{
				questionAr: 'Report: She said, "I have prepared my revision schedule." Complete: She said that she .......... her revision schedule.',
				options: ['had prepared', 'has prepared', 'prepared', 'was preparing'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: Present Perfect (have prepared) يتحول إلى Past Perfect (had prepared).',
					'خطأ: يجب إرجاع الزمن خطوة للخلف مع said.',
					'خطأ: المضارع التام يرجع للماضي التام لا الماضي البسيط.',
					'خطأ: غيّرت الصيغة إلى الاستمرار.'
				],
				explanationAr: 'في الكلام المنقول مع said يتحول Present Perfect إلى Past Perfect.'
			},
			{
				questionAr: 'Report the question: The inspector asked, "Do pupils use the laboratory?"',
				options: [
					'The inspector asked if pupils used the laboratory.',
					'The inspector asked did pupils use the laboratory.',
					'The inspector asked if did pupils use the laboratory.',
					'The inspector asked that pupils used the laboratory.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: ربطنا بـ if وحذفنا Do وحوّلنا الفعل إلى الماضي البسيط (used).',
					'خطأ: غاب الرابط if وبقيت صيغة الاستفهام.',
					'خطأ: لا نترك did بعد if في السؤال المنقول.',
					'خطأ: لا نربط الأسئلة بـ that.'
				],
				explanationAr: 'سؤال Yes/No يُنقل بـ asked + if/whether + Subject + Backshifted Verb.'
			},
			{
				questionAr: 'Report the Wh-question: He asked her, "What will you choose at university?"',
				options: [
					'He asked her what she would choose at university.',
					'He asked her what would she choose at university.',
					'He asked her what she will choose at university.',
					'He asked her if what she would choose at university.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: what + الفاعل (she) + الفعل (would choose) بدون قلب.',
					'خطأ: تركت قلب الفعل المساعد على الفاعل (would she).',
					'خطأ: نسيت تحويل will إلى would.',
					'خطأ: لا نضع if قبل أداة الاستفهام what.'
				],
				explanationAr: 'بعد أداة الاستفهام في السؤال المنقول نضع الفاعل قبل الفعل (Subject + Verb).'
			},
			{
				questionAr: 'Report the advice: The advisor said to us, "Do not waste time before exams."',
				options: [
					'The advisor advised us not to waste time before exams.',
					'The advisor advised us to not waste time before exams.',
					'The advisor advised us do not waste time before exams.',
					'The advisor advised us did not waste time before exams.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: النهي المنقول يكون بـ advised + Object + not to + Stem.',
					'خطأ: الترتيب القياسي هو not to وليس to not.',
					'خطأ: يجب حذف do وتحويل الصيغة إلى not to + Stem.',
					'خطأ: صيغة غير صحيحة للأمر المنقول.'
				],
				explanationAr: 'لنقل الأمر المنفي نستعمل: told / advised + Object + not to + Stem.'
			},
			{
				questionAr: 'Report with a PRESENT reporting verb: The teacher says, "You must respect your classmates."',
				options: [
					'The teacher says that we must respect our classmates.',
					'The teacher says that we had to respect our classmates.',
					'The teacher said that we must respected our classmates.',
					'The teacher says that you had respected your classmates.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: لأن فعل النقل في المضارع (says)، نغيّر الضمائر فقط ويبقى must كما هو.',
					'خطأ: لا نغيّر الأزمنة عندما يكون فعل النقل في المضارع (says).',
					'خطأ: غيّرت فعل النقل وأخطأت بعد must.',
					'خطأ: تحويل زمني خاطئ.'
				],
				explanationAr: 'إذا كان فعل النقل في المضارع (says / tells) تبقى الأزمنة كما هي.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Quantifiers (many, much, few, little) & Comparing School Systems
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t3_quantifiers_comparison',
		slug: 'eng-3as-lp-t3-quantifiers-comparison',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't3',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 3: Schools: Different and Alike (التعليم في العالم والمراجعة للبكالوريا)',
		order: 3,
		titleAr: 'محددات الكمية (Quantifiers) والمقارنة بين الأنظمة التعليمية (Whereas / Unlike / Similar to)',
		objectives: [
			'التمييز الدقيق بين محددات الأسماء المعدودة (many / few) والأسماء غير المعدودة (much / little)',
			'استعمال أدوات المقارنة والتقابل (whereas, while, unlike, similar to, both...and) لوصف الأنظمة المدرسية',
			'المقارنة الواعية بين المدارس الجزائرية وتراث مدارس جمعية العلماء المسلمين والأنظمة العالمية'
		],
		keywordsAr: ['Quantifiers', 'many', 'much', 'few', 'little', 'whereas', 'unlike', 'similar to'],
		discover: {
			scenarioAr:
				'تختلف الأنظمة التربوية في العالم من حيث عدد سنوات الدراسة والمواد، لكنها تتشابه في أهمية المعلم والمكتبة. كما أسهمت مدارس جمعية العلماء المسلمين الجزائريين بقيادة الإمام ابن باديس والشيخ الإبراهيمي والشيخ مبارك الميلي في نشر العلم رغم قلة الإمكانات.',
			svg: svgEnglishGrammarMap({
				title: 'Quantifiers & School Comparisons',
				rootLabel: 'Countable vs Uncountable + Compare & Contrast',
				rootSub: 'Essential for Unit 3 (Schools: Different and Alike)',
				branches: [
					{
						label: 'Countable Plural',
						rule: 'many / a few / few + Plural Noun',
						example: 'many schools, few classrooms'
					},
					{
						label: 'Uncountable',
						rule: 'much / a little / little + Uncountable',
						example: 'much knowledge, little funding'
					},
					{
						label: 'Contrast & Similarity',
						rule: 'whereas (clause) | unlike / similar to (noun)',
						example: 'Unlike private schools, state schools are free.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'هل نستعمل many أم much مع كلمة knowledge (المعرفة) ومع كلمة students (التلاميذ)؟',
					hintAr: 'حدد أيهما معدود يُجمع وأيهما غير معدود.',
					expectedInput: 'much knowledge / many students',
					revealAr: 'students اسم معدود جمع فيأخذ many / few، بينما knowledge اسم غير معدود فيأخذ much / little.'
				},
				{
					promptAr: 'ما الفرق في الاستعمال بين whereas و unlike؟',
					hintAr: 'انظر هل يأتي بعد الأداة فاعل وفعل أم اسم فقط.',
					expectedInput: 'whereas تتبع بجملة كاملة، و unlike تتبع باسم',
					revealAr: 'whereas و while أداتا ربط تتبعان بجملة كاملة (S + V)، أما unlike و similar to فحرفا جر يتبعان باسم أو عبارة اسمية.'
				},
				{
					promptAr: 'ما الفرق في المعنى بين a few books و few books؟',
					hintAr: 'أيهما يحمل معنى إيجابياً (قليل لكنه كافٍ) وأيهما سلبي (قليل جداً غير كافٍ)؟',
					expectedInput: 'a few إيجابي (بعض الكتب) | few سلبي (قليل نادر)',
					revealAr: 'a few / a little تفيد وجود قدر كافٍ (إيجابي)، أما few / little بدون a فتفيد الندرة وعدم الكفاية (سلبي).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأسماء المعدودة الجمع (pupils, teachers, schools, books): نستخدم معها many (كثير)، a few (بعض)، few (قليل جداً).',
				'الأسماء غير المعدودة (education, time, homework, advice, money, information): نستخدم معها much (كثير)، a little (قليل كافٍ)، little (قليل جداً).',
				'المقارنة بالتشابه (Similarity): both ... and ... / like + Noun / similar to + Noun / as + Adj + as. مثال: Algerian primary schooling is similar to many global systems in duration.',
				'المقارنة بالتباين (Contrast): whereas / while + Subject + Verb | unlike + Noun Phrase. مثال: State schools are free in Algeria, whereas private colleges charge tuition fees.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Similarity vs Contrast Connectors',
				rootLabel: 'Comparing Education Systems',
				rootSub: 'Choose the right grammatical frame',
				branches: [
					{
						label: 'Similarity',
						rule: 'Both A and B | A is similar to B',
						example: 'Both Ben Badis and El Ibrahimi built schools.'
					},
					{
						label: 'Contrast (Clause)',
						rule: 'Clause 1, whereas / while Clause 2',
						example: 'Primary takes 5 years, whereas middle takes 4.'
					},
					{
						label: 'Contrast (Noun)',
						rule: 'Unlike + Noun A, Noun B + Verb',
						example: 'Unlike rote learning, active study lasts.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة الروابط المستعملة لوصف أوجه الشبه والاختلاف بين المدارس.',
			examples: [
				{
					problemAr: 'Combine with (unlike): Private schools charge fees. Public schools in Algeria are free.',
					solutionAr: 'Unlike private schools, public schools in Algeria are free.'
				},
				{
					problemAr: 'Combine with (whereas): Primary education lasts five years. Middle education lasts four years.',
					solutionAr: 'Primary education lasts five years, whereas middle education lasts four years.'
				},
				{
					problemAr: 'Choose the right quantifier: Historic reformist schools had (little / few) financial resources, yet they trained (many / much) scholars.',
					solutionAr: 'few financial resources (countable plural) | many scholars (countable plural).'
				}
			],
			watchOutAr: 'انتبه: الكلمات homework و advice و information و knowledge أسماء غير معدودة في الإنجليزية! لا تجمعها بـ s ولا تضع معها many أو few!'
		},
		practice: [
			{
				questionAr: 'Choose the correct quantifier: Students need .......... patience and .......... useful textbooks to excel.',
				options: ['much / many', 'many / much', 'few / little', 'many / many'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: patience غير معدود (much)، و textbooks معدود جمع (many).',
					'خطأ: عكست المعدود وغير المعدود.',
					'خطأ: المعنى يقتضي الكثرة والترتيب معكوس أيضاً.',
					'خطأ: patience غير معدود فلا يأخذ many.'
				],
				explanationAr: 'much للأسماء غير المعدودة، و many للأسماء المعدودة الجمع.'
			},
			{
				questionAr: 'Choose the correct connector: .......... university education, vocational training focuses directly on practical crafts.',
				options: ['Unlike', 'Whereas', 'While', 'Although'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: بعد الفراغ عبارة اسمية فقط (university education) فتناسبها Unlike.',
					'خطأ: Whereas تحتاج جملة كاملة بفاعل وفعل.',
					'خطأ: While تحتاج جملة كاملة.',
					'خطأ: Although تحتاج جملة كاملة.'
				],
				explanationAr: 'Unlike حرف جر يُتبع باسم أو عبارة اسمية للمقارنة.'
			},
			{
				questionAr: 'Complete: Secondary schooling prepares pupils for the BAC exam, .......... primary schooling teaches basic literacy.',
				options: ['whereas', 'unlike', 'similar to', 'despite'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد الفراغ جملة كاملة (primary schooling teaches...) فنستعمل whereas للتباين.',
					'خطأ: unlike لا تُتبع بجملة فعلية كاملة.',
					'خطأ: similar to للتشابه وتتبع باسم.',
					'خطأ: despite للاستدراك وتتبع باسم.'
				],
				explanationAr: 'نستعمل whereas / while للربط بين جملتين تامتين متباينتين.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'The teacher gave us much helpful advice before the BAC.',
					'The teacher gave us many helpful advices before the BAC.',
					'The teacher gave us a few helpful advice before the BAC.',
					'The teacher gave us few homework today.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: advice غير معدود ويأخذ much بدون جمع.',
					'خطأ: advice لا يُجمع ولا يأخذ many.',
					'خطأ: a few للمعدود الجمع فقط.',
					'خطأ: homework غير معدود فلا يأخذ few.'
				],
				explanationAr: 'الكلمتان advice و homework غير معدودتين وتأخذان much / little.'
			},
			{
				questionAr: 'Choose the right expression of similarity: Sheikh Moubarek El Mili schools were .......... modern schools in valuing Arabic and science.',
				options: ['similar to', 'unlike', 'whereas', 'different'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: similar to تعبر عن التشابه وتُتبع باسم.',
					'خطأ: unlike تعبر عن الاختلاف لا التشابه.',
					'خطأ: whereas للتباين وتتبع بجملة.',
					'خطأ: different تحتاج from وتعبر عن الاختلاف.'
				],
				explanationAr: 'للتعبير عن التشابه نستخدم: be + similar to + Noun.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Silent Letters in English BAC Exam Words
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t3_silent_letters',
		slug: 'eng-3as-lp-t3-silent-letters',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't3',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 3: Schools: Different and Alike (التعليم في العالم والمراجعة للبكالوريا)',
		order: 4,
		titleAr: 'الحروف الصامتة (Silent Letters) في كلمات البكالوريا',
		objectives: [
			'تحديد الحرف الصامت بدقة في أشهر الكلمات الواردة في مواضيع البكالوريا (k, w, b, l, h, t, gh, p)',
			'تطبيق قواعد التتابع الإملائي التي تكشف الحرف الصامت فوراً (kn-, wr-, -mb, -bt, -stle)',
			'حل سؤال الحروف الصامتة (Underline the silent letter / Classify) بنقطة كاملة'
		],
		keywordsAr: ['Silent Letters', 'Phonology', 'knowledge', 'honest', 'doubt', 'write'],
		discover: {
			scenarioAr:
				'في قسم البناء اللغوي (Text Exploration)، يُطلب أحياناً تحديد الحرف الصامت (Silent Letter) في أربع كلمات من النص، مثل knowledge و honest و doubt و listen. قواعد الإملاء الصوتي تكشفها بسهولة!',
			svg: svgEnglishPhoneticsChart({
				title: 'Most Frequent Silent Letters in BAC',
				subtitle: 'Memorize these spelling patterns!',
				columns: [
					{
						sound: 'Silent k / w',
						rule: 'k before n | w before r',
						examples: 'know, knowledge | write, wrong'
					},
					{
						sound: 'Silent b / l',
						rule: 'mb / bt | alk / ould / alm',
						examples: 'doubt, debt, climb | talk, could, calm'
					},
					{
						sound: 'Silent h / t / gh',
						rule: 'hon-, wh- | -sten, -stle | -igh-',
						examples: 'honest, hour | listen, castle | high, right'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الصامت في الكلمات: knowledge, knight, know؟',
					hintAr: 'انظر للحرف الذي يسبق n في بداية الكلمة.',
					expectedInput: 'الحرف k (صامت دائماً قبل n في بداية الكلمة)',
					revealAr: 'الحرف k صامت دائماً في التركيب kn- في بداية الكلمة (know, knowledge, knee, knife).'
				},
				{
					promptAr: 'ما الحرف الصامت في الكلمتين: honest و hour و school؟',
					hintAr: 'حرف واحد مشترك لا يُنطق في هذه الكلمات الثلاث!',
					expectedInput: 'الحرف h',
					revealAr: 'الحرف h صامت في honest, honour, hour, heir، وكذلك في التركيب sch- مثل school و scholar.'
				},
				{
					promptAr: 'ما الحرف الصامت في: doubt و debt و climb؟',
					hintAr: 'انظر إلى التركيب -bt و -mb.',
					expectedInput: 'الحرف b',
					revealAr: 'الحرف b صامت في التركيب -bt (doubt, debt, subtle) وفي نهاية -mb (climb, tomb, lamb).'
				}
			]
		},
		summary: {
			rulesAr: [
				'Silent k: قبل n في أول الكلمة (know, knowledge, knock). Silent w: قبل r (write, wrong, answer) وفي who / whole.',
				'Silent h: في الكلمات اللاتينية الأصل (honest, honesty, honour, hour) وبعد c/r في (school, scholar, rhythm, architecture).',
				'Silent b: بعد m في النهاية (climb, tomb) وقبل t (doubt, debt). Silent p: قبل s/n في (psychology, receipt).',
				'Silent l: في (walk, talk, half, calm, should, would, could). Silent t: في (listen, often, castle, whistle). Silent gh: في (high, light, right, thought, although).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BAC Silent Letter Patterns',
				rootLabel: 'Spot the Pattern Instantly',
				rootSub: 'Zero Guesswork in Phonology Tasks',
				branches: [
					{
						label: 'Unit 1 Words',
						rule: 'tomb (b) | architecture (h)',
						example: 'reign (g) | heritage (h is spoken!)'
					},
					{
						label: 'Unit 2 Words',
						rule: 'honest (h) | doubt (b)',
						example: 'receipt (p) | foreign (g)'
					},
					{
						label: 'Unit 3 Words',
						rule: 'knowledge (k) | school (h)',
						example: 'write (w) | listen (t)'
					}
				]
			}),
			visualCaptionAr: 'توزيع أشهر الكلمات ذات الحروف الصامتة عبر وحدات برنامج السنة الثالثة آداب وفلسفة.',
			examples: [
				{
					problemAr: 'Identify the silent letter in each word: knowledge / honest / doubt / listen',
					solutionAr: 'knowledge: k (and w/d in dge, main BAC target: k) | honest: h | doubt: b | listen: t'
				},
				{
					problemAr: 'Identify the silent letter: write / psychology / scholar / foreign',
					solutionAr: 'write: w | psychology: p | scholar: h | foreign: g'
				},
				{
					problemAr: 'Careful contrast: honest vs history',
					solutionAr: 'In honest, "h" is silent; in history and heritage, "h" is pronounced!'
				}
			],
			watchOutAr: 'انتبه: حرف h صامت في honest و hour و school، لكنه منطوق بوضوح في history و heritage و human! لا تخلط بينها.'
		},
		practice: [
			{
				questionAr: 'Which letter is silent in the word "scholar"?',
				options: ['h', 's', 'c', 'r'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: التركيب sch- في school و scholar يُنطق /sk/ ويبقى حرف h صامتاً.',
					'خطأ: s منطوق.',
					'خطأ: c منطوق /k/.',
					'خطأ: r جزء من النطق في نهاية الكلمة.'
				],
				explanationAr: 'في الكلمات school و scholar و scheme يكون الحرف h صامتاً.'
			},
			{
				questionAr: 'Identify the silent letter in "doubt":',
				options: ['b', 'd', 't', 'u'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: في التركيب -bt مثل doubt و debt يكون الحرف b صامتاً.',
					'خطأ: d منطوق في البداية.',
					'خطأ: t منطوق في النهاية.',
					'خطأ: ou يُنطق كصوت علة مزدوج.'
				],
				explanationAr: 'الحرف b صامت قبل t في كلمتي doubt و debt.'
			},
			{
				questionAr: 'Which word contains a SILENT "k"?',
				options: ['knowledge', 'kingdom', 'keep', 'skill'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: k قبل n في بداية الكلمة صامتة دائماً (knowledge).',
					'خطأ: k منطوقة في kingdom.',
					'خطأ: k منطوقة في keep.',
					'خطأ: k منطوقة في skill.'
				],
				explanationAr: 'التركيب kn- في بداية الكلمة يجعل الحرف k صامتاً.'
			},
			{
				questionAr: 'Identify the silent letter in "receipt":',
				options: ['p', 'r', 'c', 't'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: حرف p صامت في كلمة receipt (وصل دفع) وتنطق /rɪsiːt/.',
					'خطأ: r منطوق.',
					'خطأ: c منطوق /s/.',
					'خطأ: t منطوق في النهاية.'
				],
				explanationAr: 'كلمة receipt من أشهر كلمات وحدة أخلاقيات التجارة ذات الحرف الصامت p.'
			},
			{
				questionAr: 'Which word has a SILENT "t"?',
				options: ['listen', 'teacher', 'student', 'study'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الحرف t صامت في التركيب -sten مثل listen و fasten.',
					'خطأ: t منطوق في teacher.',
					'خطأ: t منطوق في student.',
					'خطأ: t منطوق في study.'
				],
				explanationAr: 'في الكلمات المنتهية بـ -sten و -stle مثل listen و castle يكون حرف t صامتاً.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 5: BAC LP Exam Methodology (7 + 8 + 5 = 20 pts) & Essay Structure
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_lp_t3_bac_lp_methodology',
		slug: 'eng-3as-lp-t3-bac-lp-methodology',
		grade: '3as_lp',
		yearSubjectId: 770,
		trimesterId: 't3',
		sequenceId: 'unit3',
		sequenceTitleAr: 'الوحدة 3: Schools: Different and Alike (التعليم في العالم والمراجعة للبكالوريا)',
		order: 5,
		titleAr: 'منهجية امتحان البكالوريا آداب وفلسفة (7 + 8 + 5 = 20 نقطة) وبناء الفقرة المنهجية',
		objectives: [
			'استيعاب التوزيع الرسمي لنقاط امتحان الإنجليزية لشعبة آداب وفلسفة (7 فهم + 8 بناء لغوي + 5 تعبير كتابي)',
			'إدارة الوقت خلال ساعتين ونصف (2h30) بذكاء بين اختيار الموضوع والتحرير والمراجعة',
			'إتقان بناء التعبير الكتابي الموجه (Topic One) بفقرات مترابطة وروابط منطقية سليمة'
		],
		keywordsAr: ['BAC LP Methodology', 'Comprehension 7 pts', 'Text Exploration 8 pts', 'Written Expression 5 pts'],
		discover: {
			scenarioAr:
				'في شعبة آداب وفلسفة معامل الإنجليزية 3 والمدة ساعتان ونصف، وتُوزع العلامة إلى: 7 نقاط للفهم (Comprehension)، و 8 نقاط كاملة للبناء اللغوي (Text Exploration) وهو الأثقل وزناً، و 5 نقاط للتعبير الكتابي (Written Expression).',
			svg: svgEnglishWritingStructure({
				title: 'BAC LP Exam Blueprint (20 pts — 2h30)',
				steps: [
					{
						stage: 'Comprehension (7 pts)',
						detail: 'Text type, True/False, Wh-Q, Pronoun reference, Paragraph idea (35 min)'
					},
					{
						stage: 'Exploration (8 pts)',
						detail: 'Lexis, Morphology table, Syntax rewriting, Phonology, Cloze (55 min)'
					},
					{
						stage: 'Writing (5 pts)',
						detail: 'Choose Topic 1 (Guided notes) OR Topic 2 (Free) — 80 to 120 words (45 min)'
					},
					{
						stage: 'Proofreading',
						detail: 'Check tenses, S-V agreement, spelling & clean handwriting (15 min)'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما القسم صاحب الحصة الأكبر من النقاط في بكالوريا الإنجليزية لشعبة آداب وفلسفة؟',
					hintAr: 'قارن بين الأرقام: 7 و 8 و 5.',
					expectedInput: 'Text Exploration (البناء اللغوي: 8 نقاط)',
					revealAr: 'خلافاً للشعب العلمية (8+7+5)، يحظى قسم Text Exploration في شعبة آداب وفلسفة بـ 8 نقاط كاملة، مما يجعل إتقان القواعد والاشتقاق والصوتيات مفتاح العلامة الممتازة!'
				},
				{
					promptAr: 'لماذا ينصح الأساتذة أغلب التلاميذ باختيار Topic One (الموضوع الموجه) في التعبير الكتابي؟',
					hintAr: 'انظر إلى ما يقدمه الموضوع الأول من مساعدة مجانية.',
					expectedInput: 'لأنه مرتبط بموضوع النص ويزودك بالأفكار الموجهة (Notes)',
					revealAr: 'الموضوع الأول يمدك برؤوس أقلام جاهزة (Notes) ومفردات موجودة في سياق الوحدة، مما يحميك من الخروج عن الموضوع ويسمح لك بالتركيز على سلامة اللغة والروابط.'
				},
				{
					promptAr: 'كيف نضمن نقطة سؤال الإحالة (What or who do the underlined words refer to)؟',
					hintAr: 'اقرأ الجملة التي تسبق الضمير وحدد هل هو مفرد أم جمع، عاقل أم غير عاقل.',
					expectedInput: 'بالعودة إلى الاسم السابق المطابق للضمير في العدد والنوع',
					revealAr: 'دائماً نبحث قبل الضمير (they/their لجمع، it/its لمفرد غير عاقل، who لعاقل، which لغير عاقل، where لمكان) ونكتب الاسم المقصود كاملاً وواضحاً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'استراتيجية Comprehension (7 نقاط): اقرأ الأسئلة أولاً ثم النص مرتين؛ في True/False لا تكتب T/F فقط إذا طُلب التبرير أو تصحيح الخطأ؛ في أسئلة Wh- أجب بإيجاز ودقة دون نسخ فقرة كاملة عشوائياً.',
				'استراتيجية Text Exploration (8 نقاط): راجع جدول الاشتقاق، وتأكد من علامة النهاية في -ed/-s وعدد المقاطع، وتحقق في Rewrite (b) من الحفاظ على المعنى الأصلي وتصريف الفعل.',
				'استراتيجية Written Expression (5 نقاط): احترم الهيكل الثلاثي: Introduction (مقدمة وجملة أطروحة) + Body (عرض الأفكار باستعمال روابط First, Moreover, However, Therefore) + Conclusion (خاتمة موجزة).',
				'معايير تصحيح التعبير (5 نقاط): Relevance (ملاءمة الموضوع 1 pt) + Semantic Coherence (ترابط الأفكار 1 pt) + Correct Use of English (سلامة القواعد والمفردات 2 pts) + Excellence (الأسلوب والنظافة 1 pt).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '5-Point Guided Essay Formula (80 - 120 words)',
				steps: [
					{
						stage: 'Introduction',
						detail: 'General hook + clear thesis stating the topic (2 sentences)'
					},
					{
						stage: 'Body Part 1',
						detail: 'First / To begin with + expand Notes 1 and 2 with examples'
					},
					{
						stage: 'Body Part 2',
						detail: 'Furthermore / Moreover + expand Notes 3 and 4 logically'
					},
					{
						stage: 'Conclusion',
						detail: 'To sum up / In conclusion + final advice or summary (2 sentences)'
					}
				]
			}),
			visualCaptionAr: 'خطة عملية لكتابة تعبير كتابي متماسك ومضمون النقاط في بكالوريا آداب وفلسفة.',
			examples: [
				{
					problemAr: 'Turn Guided Notes into fluent sentences: Notes = build schools / fight illiteracy / preserve identity',
					solutionAr: 'First, Algerian scholars built free schools across the country in order to fight illiteracy and preserve our Islamic and national identity.'
				},
				{
					problemAr: 'Write a strong BAC conclusion for an ethics essay:',
					solutionAr: 'To sum up, eradicating corruption requires both strict laws and honest citizens who value integrity above quick material gain.'
				}
			],
			watchOutAr: 'احذر اختيار موضوعين معاً في ورقة الإجابة! اختر موضوعاً واحداً فقط (Topic 1 أو Topic 2) والتزم به، ولا تترك التعبير الكتابي فارغاً أبداً.'
		},
		practice: [
			{
				questionAr: 'What is the official points split for the 3AS BAC Literature & Philosophy (LP) English exam?',
				options: [
					'7 pts Comprehension + 8 pts Text Exploration + 5 pts Written Expression',
					'8 pts Comprehension + 7 pts Text Exploration + 5 pts Written Expression',
					'7 pts Comprehension + 7 pts Text Exploration + 6 pts Written Expression',
					'6 pts Comprehension + 8 pts Text Exploration + 6 pts Written Expression'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: توزيع شعبة آداب وفلسفة هو 7 + 8 + 5 = 20 نقطة.',
					'خطأ: هذا توزيع الشعب العلمية وتسيير واقتصاد.',
					'خطأ: هذا توزيع شعبة اللغات الأجنبية (LE).',
					'خطأ: توزيع غير مطابق للنظام الرسمي.'
				],
				explanationAr: 'شعبة آداب وفلسفة (3AS LP) تتبع التوزيع الرسمي: 7 فهم + 8 بناء لغوي + 5 تعبير كتابي.'
			},
			{
				questionAr: 'In a Reading Comprehension reference question, what can the pronoun "they" refer to?',
				options: [
					'A plural noun mentioned earlier in the text',
					'A singular uncountable noun',
					'A place or city name',
					'A verb in the infinitive'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الضمير they يحيل دائماً إلى اسم جمع (عاقل أو غير عاقل) ورد قبله.',
					'خطأ: الاسم غير المعدود يأخذ it.',
					'خطأ: المكان المفرد يأخذ it أو where.',
					'خطأ: الضمير يحيل إلى اسم وليس فعلاً.'
				],
				explanationAr: 'الضمير they يحيل دائماً على اسم جمع سبق ذكره في النص.'
			},
			{
				questionAr: 'Which linking word is best to introduce the final paragraph of a BAC essay?',
				options: ['In conclusion,', 'First of all,', 'For instance,', 'Whereas,'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: In conclusion / To sum up / All in all تستعمل لافتتاح الخاتمة.',
					'خطأ: First of all لبداية العرض.',
					'خطأ: For instance للتمثيل.',
					'خطأ: Whereas لربط جملتين متباينتين وليست لافتتاح خاتمة.'
				],
				explanationAr: 'نستهل الخاتمة بروابط التلخيص مثل In conclusion أو To sum up.'
			},
			{
				questionAr: 'When expanding guided notes in Topic One, what should you do?',
				options: [
					'Turn the notes into full grammatically connected sentences with linkers',
					'Copy the bullet notes word for word without verbs',
					'Ignore the notes and write about an unrelated unit',
					'Write both Topic One and Topic Two on the exam sheet'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: المطلوب تحويل الرؤوس الموجهة إلى جمل تامة مترابطة بروابط منطقية.',
					'خطأ: نسخ النقاط بدون أفعال وروابط يفقدك نقاط التماسك واللغة.',
					'خطأ: الخروج عن الموضوع يُفقدك نقطة الملاءمة.',
					'خطأ: يُصحح موضوع واحد فقط ويُعد تضييعاً للوقت.'
				],
				explanationAr: 'الموضوع الموجه يتطلب توسيع النقاط في فقرة أو مقال متماسك بجمل تامة وروابط سليمة.'
			},
			{
				questionAr: 'What is the recommended final step during the last 10 to 15 minutes of the BAC exam?',
				options: [
					'Proofread verbs, spelling, pronouns, and make sure no question was skipped',
					'Rewrite the entire reading passage on your answer sheet',
					'Erase your guided essay and switch to the other topic suddenly',
					'Leave the exam hall without checking your answers'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المراجعة النهائية تكشف أخطاء التصريف والإملاء والأسئلة المنسية.',
					'خطأ: لا ننسخ نص القراءة أبداً.',
					'خطأ: تغيير الموضوع في آخر عشر دقائق مجازفة خطيرة.',
					'خطأ: التسرع في الخروج يضيع نقاطاً سهلة يمكن تداركها.'
				],
				explanationAr: 'تخصيص 10 إلى 15 دقيقة للمراجعة اللغوية والتحقق من كل الأسئلة يرفع العلامة بوضوح.'
			}
		]
	}
];
