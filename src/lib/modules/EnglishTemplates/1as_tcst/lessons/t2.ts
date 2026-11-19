import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCST Trimester 2 (Our Findings Show + Back to Nature)
// ============================================================================

export const LESSONS_1AS_TCST_T2: EnglishInteractiveLessonData[] = [
	// 1. Reported Speech (Statements & Questions)
	{
		id: 'eng_lesson_1as_tcst_t2_reported_speech',
		slug: 'eng-1as-tcst-t2-reported-speech',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Our Findings Show — الاستطلاعات ونقل الكلام',
		order: 1,
		titleAr: 'الكلام المنقول: الجمل الخبرية والأسئلة (Reported Speech: Statements and Questions)',
		objectives: [
			'تحويل الجملة الخبرية من المباشر إلى المنقول مع مراعاة تغيّر الأزمنة والضمائر وظروف الزمان',
			'نقل أسئلة Yes/No باستعمال if أو whether دون فعل مساعد do/does/did',
			'نقل أسئلة Wh بترتيب الجملة الخبرية (Subject + Verb)'
		],
		keywordsAr: ['Reported Speech', 'Backshift', 'asked if', 'whether', 'Reporting Verbs'],
		discover: {
			scenarioAr:
				'أجرى تلاميذ قسم 1AS استطلاعا حول عادة القراءة. سأل يونس زميله: "Do you read science magazines?" فأجابه سليم: "I read two magazines every month." وعندما نقل يونس الحوار للأستاذ كتب: "I asked Salim if he read science magazines. He told me that he read two magazines every month."',
			svg: svgEnglishGrammarMap({
				title: 'Reported Speech Transformations',
				rootLabel: 'Reporting Verb in the Past (said / told / asked)',
				rootSub: 'Tense moves one step back (Backshift)',
				branches: [
					{
						label: 'Statements',
						rule: 'said (that) / told + obj + (that)',
						example: '"I work" becomes He said he worked.'
					},
					{
						label: 'Yes/No Questions',
						rule: 'asked + if/whether + S + V',
						example: '"Do you read?" becomes He asked if I read.'
					},
					{
						label: 'Wh- Questions',
						rule: 'asked + Wh-word + S + V',
						example: '"Where do you live?" becomes He asked where I lived.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما التغير الزمني (Backshift) الذي يحدث عندما يكون فعل النقل في الماضي مثل said أو asked؟',
					hintAr: 'لاحظ تحول Present Simple إلى Past Simple و will إلى would.',
					expectedInput: 'يرجع الزمن خطوة واحدة للماضي',
					revealAr:
						'يرجع الزمن درجة للوراء: Present Simple يصبح Past Simple، و Present Continuous يصبح Past Continuous، و Past Simple يصبح Past Perfect، و will تصبح would، و can تصبح could.'
				},
				{
					promptAr: 'لماذا اختفى الفعل المساعد "do" في السؤال المنقول: "I asked Salim if he read science magazines"؟',
					hintAr: 'هل بقي السؤال بصيغة استفهام أم تحول إلى ترتيب جملة خبرية؟',
					expectedInput: 'لأن السؤال المنقول يتحول إلى ترتيب جملة خبرية بدون علامة استفهام',
					revealAr:
						'في السؤال المنقول نلغي صيغة الاستفهام وعلامة (؟) ونحذف do/does/did ونرتب الجملة: فاعل ثم فعل مصرف.'
				},
				{
					promptAr: 'ما الفرق في الاستعمال بين said و told؟',
					hintAr: 'أيهما يحتاج إلى مفعول به شخصي مباشرة بعده (me / him / us)؟',
					expectedInput: 'told تتبعها دائما شخصية مخاطبة (told me)، أما said فلا',
					revealAr:
						'نكتب He said that... أو He said to me that...، بينما مع told نضع المخاطب مباشرة دون to فنقول He told me that...'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة تغيّر الأزمنة عند وجود فعل نقل في الماضي (said / told / asked): Present Simple يصبح Past Simple — Present Continuous يصبح Past Continuous — Past Simple / Present Perfect يصبح Past Perfect — will تصبح would — can تصبح could.',
				'تغيّر ظروف الزمان والمكان: now تصبح then — today تصبح that day — yesterday تصبح the day before — tomorrow تصبح the next day — here تصبح there — this تصبح that.',
				'السؤال المنقول (Yes/No): Subject + asked + (object) + if / whether + Subject + Verb (بدون علامة استفهام).',
				'السؤال المنقول (Wh): Subject + asked + (object) + Wh-word + Subject + Verb (الفاعل يسبق الفعل دائما).',
				'إذا كان فعل النقل في المضارع (says / asks) فلا نغير زمن الفعل داخل الجملة، ونغير الضمائر فقط.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Reported Speech Backshift',
				tenseName: 'One Step Back in Time',
				formula: 'Present Simple becomes Past Simple | Past Simple becomes Past Perfect',
				activeZone: 'two_past',
				example: 'Direct: "I finished today." | Reported: He said he had finished that day.',
				markers: 'now: then, yesterday: the day before, tomorrow: the next day'
			}),
			visualCaptionAr: 'خط الزمن يوضح قاعدة تراجع الزمن خطوة واحدة في الكلام المنقول',
			examples: [
				{
					problemAr: 'حوّل إلى المنقول: The reporter asked Meriem, "How many hours do you spend online?"',
					solutionAr: 'The reporter asked Meriem how many hours she spent online.'
				},
				{
					problemAr: 'حوّل إلى المنقول: Karim said, "I will present our survey results tomorrow."',
					solutionAr: 'Karim said that he would present their survey results the next day.'
				}
			],
			watchOutAr:
				'احذر من الإبقاء على ترتيب الاستفهام في السؤال المنقول! خطأ أن تكتب "He asked me where did I go?" والصحيح "He asked me where I had gone." بدون did وبدون علامة استفهام.'
		},
		practice: [
			{
				questionAr: 'حوّل إلى المنقول: Salma said, "I enjoy reading scientific articles."',
				options: [
					'Salma said that she enjoys reading scientific articles.',
					'Salma said that she enjoyed reading scientific articles.',
					'Salma said that I enjoyed reading scientific articles.',
					'Salma told that she enjoyed reading scientific articles.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لم يتحول الزمن من المضارع إلى الماضي مع فعل النقل said.',
					'أحسنت! تحول الضمير I إلى she والفعل enjoy إلى enjoyed.',
					'يجب تحويل الضمير I إلى she ليعود على Salma.',
					'told تحتاج مفعولا به بعدها مثل told me.'
				],
				explanationAr: 'فعل النقل said في الماضي، لذا يتحول الضمير I إلى she والمضارع البسيط إلى ماض بسيط.'
			},
			{
				questionAr: 'اختر التحويل الصحيح للسؤال: He asked me, "Do you use a tablet for studying?"',
				options: [
					'He asked me if did I use a tablet for studying.',
					'He asked me if I used a tablet for studying.',
					'He asked me that I used a tablet for studying.',
					'He asked me if I use a tablet for studying?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحذف do/did في السؤال المنقول ونحول الفعل الرئيسي.',
					'ممتاز! استعملنا if وحذفنا do وحولنا use إلى used.',
					'لا نستعمل that في نقل الأسئلة.',
					'يجب تحويل الفعل للماضي وحذف علامة الاستفهام.'
				],
				explanationAr: 'أسئلة Yes/No تنقل بـ if/whether + الفاعل + الفعل في الماضي.'
			},
			{
				questionAr: 'اختر التحويل الصحيح: The teacher asked, "When will the group finish the report?"',
				options: [
					'The teacher asked when will the group finish the report.',
					'The teacher asked when would the group finish the report.',
					'The teacher asked when the group would finish the report.',
					'The teacher asked if the group would finish the report.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لم تتحول will إلى would ولم يسبق الفاعل الفعل.',
					'الترتيب الاستفهامي (would the group) خاطئ في الكلام المنقول.',
					'صحيح تماما! Wh-word + Subject (the group) + would finish.',
					'سؤال يبدأ بـ When لا ينقل بـ if.'
				],
				explanationAr: 'في سؤال Wh نضع أداة الاستفهام ثم الفاعل ثم الفعل المساعد المحوّل (would).'
			},
			{
				questionAr: 'ماذا تصبح عبارة "yesterday" عند نقل الجملة بفعل نقل في الماضي؟',
				options: ['the next day', 'that day', 'the day before', 'then'],
				correctIndex: 2,
				diagnosticFeedback: [
					'the next day تقابل tomorrow.',
					'that day تقابل today.',
					'أحسنت! yesterday تتحول إلى the day before أو the previous day.',
					'then تقابل now.'
				],
				explanationAr: 'في الكلام المنقول تتحول yesterday إلى the day before.'
			},
			{
				questionAr: 'أكمل الجملة: "The student .......... the journalist that he preferred print books."',
				options: ['said', 'told', 'asked', 'spoke'],
				correctIndex: 1,
				diagnosticFeedback: [
					'said لا يتبعها مفعول به شخصي مباشرة بدون to.',
					'صحيح! told يتبعها المخاطب مباشرة (told the journalist that...).',
					'asked تستعمل للأسئلة لا للجملة الخبرية بـ that.',
					'spoke لا تأخذ بنية that-clause بهذا الشكل.'
				],
				explanationAr: 'نستعمل told + المخاطب + that لنقل جملة خبرية موجهة لشخص.'
			}
		]
	},

	// 2. Quantifiers for Reporting Surveys
	{
		id: 'eng_lesson_1as_tcst_t2_quantifiers_surveys',
		slug: 'eng-1as-tcst-t2-quantifiers-surveys',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Our Findings Show — الاستطلاعات ونقل الكلام',
		order: 2,
		titleAr: 'محددات الكمية لعرض نتائج الاستطلاع (Quantifiers: all, most, half, some, none of)',
		objectives: [
			'توظيف محددات الكمية بدقة لوصف النسب المئوية ونتائج الاستبيانات',
			'التمييز بين مطابقة الفعل للمفرد والجمع مع Quantifiers',
			'قراءة مخطط بياني أو جدول إحصائي وتحويله إلى جمل تقريرية سليمة'
		],
		keywordsAr: ['Quantifiers', 'all of', 'most of', 'half of', 'some of', 'none of'],
		discover: {
			scenarioAr:
				'أجرى تلاميذ الأولى ثانوي استطلاعا شمل 40 تلميذا حول المطالعة واستعمال المكتبة المدرسية. أظهرت النتائج: 40/40 يمتلكون كتبا مدرسية، 32/40 يقرؤون قصصا هادفة، 20/40 يزورون المكتبة أسبوعيا، 8/40 يقرؤون صحفا، و 0/40 يهملون الواجبات. كيف نعبّر عن هذه النسب بالإنجليزية؟',
			svg: svgEnglishGrammarMap({
				title: 'Survey Quantifiers by Percentage',
				rootLabel: 'Reporting Survey Findings (40 informants)',
				rootSub: 'Match each number to the exact quantifier',
				branches: [
					{
						label: '100% and 70-90%',
						rule: 'All of (100%) | Most of (70-90%)',
						example: 'Most of the pupils read books.'
					},
					{
						label: '50% and 20-40%',
						rule: 'Half of (50%) | Some of (20-40%)',
						example: 'Half of them visit the library.'
					},
					{
						label: '5-15% and 0%',
						rule: 'A few of (5-15%) | None of (0%)',
						example: 'None of them neglect study.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما المحدد المناسب لتمثيل 32 تلميذا من أصل 40 (أي 80 بالمئة)؟',
					hintAr: 'هل هي الكل أم الأغلبية أم النصف؟',
					expectedInput: 'Most of',
					revealAr: '80 بالمئة تعبر عن الأغلبية، فنستعمل Most of the informants / Most of them.'
				},
				{
					promptAr: 'ما المحدد الذي يعبر عن الصفر بالمئة (0 من 40)؟',
					hintAr: 'يأتي مع فعل مثبت ولا يحتاج not.',
					expectedInput: 'None of',
					revealAr: 'نستعمل None of them لنعبر عن الصفر، مثل: None of the students ignore their homework.'
				},
				{
					promptAr: 'متى نضع حرف الجر "of" بعد most أو all أو some؟',
					hintAr: 'قارن بين: "Most students like science" و "Most of the students in our class".',
					expectedInput: 'نضع of قبل the أو ضمائر الملكية أو ضمائر المفعول مثل them',
					revealAr:
						'نكتب Quantifier + Noun مباشرة للحديث العام (Most students)، ونكتب Quantifier + of + the / my / them عند التحديد.'
				}
			]
		},
		summary: {
			rulesAr: [
				'ترتيب محددات الكمية تنازليا: All of (100%) — Nearly all of (95%) — Most of (70-90%) — Half of (50%) — Some of (25-40%) — A few of (5-15%) — None of (0%).',
				'قبل اسم محدد بـ the أو ضمير (them / us) نضع of: Most of the informants / Half of them.',
				'للحديث العام دون تحديد نحذف of و the: Most teenagers enjoy sports. (وليس Most of teenagers).',
				'مع none of + اسم جمع أو them يكون الفعل في صيغة الإثبات دائما لأن none تفيد النفي: None of them reads / read late at night.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Using "of" with Quantifiers',
				rootLabel: 'General vs Specific Reference',
				branches: [
					{
						label: 'General (No "of")',
						rule: 'Most / Some / All + Plural Noun',
						example: 'Most pupils like quizzes.'
					},
					{
						label: 'Specific (+ "of")',
						rule: 'Most / Some / Half + of + the / them',
						example: 'Most of the pupils agreed.'
					},
					{
						label: 'Zero (Always "of")',
						rule: 'None of + the / them + Affirmative V',
						example: 'None of them failed.'
					}
				]
			}),
			visualCaptionAr: 'متى نضيف حرف الجر of بعد محددات الكمية ومتى نحذفه',
			examples: [
				{
					problemAr: 'عبّر عن النتيجة التالية بجملة إنجليزية: (50% of the 30 interviewees prefer reading printed books).',
					solutionAr: 'Half of the interviewees prefer reading printed books.'
				},
				{
					problemAr: 'صحح الخطأ في الجملة: "None of the respondents did not answer the questionnaire."',
					solutionAr: 'None of the respondents answered the questionnaire. (لأن none تفيد النفي فلا نضيف did not).'
				}
			],
			watchOutAr:
				'تجنب خطأين: كتابة "Most of students" (الصحيح Most students أو Most of the students)، والجمع بين None و not في نفس الجملة.'
		},
		practice: [
			{
				questionAr: 'في استطلاع شمل 50 تلميذا، أجاب 25 منهم بـ "نعم". أي جملة تصف النتيجة بدقة؟',
				options: [
					'All of the pupils answered yes.',
					'Half of the pupils answered yes.',
					'None of the pupils answered yes.',
					'A few of the pupils answered yes.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'All تعني 50 من 50.',
					'أحسنت! 25 من 50 تمثل النصف تماما (Half of).',
					'None تعني صفرا.',
					'A few تعني عددا قليلا جدا.'
				],
				explanationAr: 'النسبة 50 بالمئة (25 من 50) يقابلها المحدد Half of.'
			},
			{
				questionAr: 'اختر الصياغة النحوية السليمة للحديث العام:',
				options: [
					'Most of pupils use dictionaries.',
					'Most pupils use dictionaries.',
					'The most of pupils use dictionaries.',
					'Most the pupils use dictionaries.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع of قبل اسم جمع نكرة بدون the.',
					'ممتاز! للحديث العام نقول Most + اسم جمع مباشرة.',
					'لا نضع the قبل most هنا.',
					'ينقصها of قبل the.'
				],
				explanationAr: 'نقول Most pupils (عام) أو Most of the pupils (محدد).'
			},
			{
				questionAr: 'أكمل الجملة لتمثيل النسبة 0%: ".......... the participants forgot to sign the survey form."',
				options: ['All of', 'None of', 'Most of', 'Some of'],
				correctIndex: 1,
				diagnosticFeedback: [
					'All of تعني 100 بالمئة.',
					'صحيح! None of تعبر عن 0 بالمئة مع فعل مثبت.',
					'Most of تعني الأغلبية.',
					'Some of تعني البعض.'
				],
				explanationAr: 'المحدد None of يعبر عن الصفر بالمئة ويأتي معه الفعل مثبتا.'
			},
			{
				questionAr: 'أكمل الجملة: "We questioned 20 students; 17 of them prefer science. Therefore, .......... them prefer science."',
				options: ['none of', 'a few of', 'most of', 'half of'],
				correctIndex: 2,
				diagnosticFeedback: [
					'none of تعني 0 من 20.',
					'a few تعني 2 أو 3 فقط.',
					'إجابة صحيحة! 17 من 20 (85%) هي الأغلبية (most of).',
					'half of تعني 10 من 20.'
				],
				explanationAr: 'النسبة 85 بالمئة تمثلها عبارة most of.'
			},
			{
				questionAr: 'أي جملة صحيحة نحويا مع None of؟',
				options: [
					'None of them do not read newspapers.',
					'None of them read newspapers.',
					'None them read newspapers.',
					'None of newspapers read them.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجوز النفي المزدوج (None + do not).',
					'أحسنت! None of them + فعل مثبت.',
					'يجب وجود of بين none و them.',
					'الفاعل والمفعول مقلوبان.'
				],
				explanationAr: 'نستعمل None of + ضمير/اسم محدد + فعل مثبت.'
			}
		]
	},

	// 3. Conditional Sentences Types 0 & 1 (Back to Nature)
	{
		id: 'eng_lesson_1as_tcst_t2_conditionals_0_1',
		slug: 'eng-1as-tcst-t2-conditionals-0-1',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Back to Nature — البيئة والعودة إلى الطبيعة',
		order: 3,
		titleAr: 'الجمل الشرطية من النوع 0 والنوع 1 (Conditional Sentences Types 0 and 1)',
		objectives: [
			'استعمال الشرط من النوع 0 للتعبير عن الحقائق العلمية والظواهر الطبيعية الثابتة',
			'استعمال الشرط من النوع 1 للتعبير عن النتائج المحتملة مستقبلا لحماية البيئة أو التلوث',
			'استعمال الرابط الشرطي المنفي Unless بمعنى If not بدقة'
		],
		keywordsAr: ['Conditional Type 0', 'Conditional Type 1', 'If-clause', 'Unless', 'Scientific Facts'],
		discover: {
			scenarioAr:
				'في نادي البيئة بالثانوية علّق التلاميذ لوحتين: الأولى حقيقة علمية: "If you heat water to 100 degrees Celsius, it boils." والثانية تحذير مستقبلي: "If we plant more trees around our towns, the air will become cleaner." لاحظ الفرق بين زمن جملة جواب الشرط في المثالين.',
			svg: svgEnglishGrammarMap({
				title: 'Conditional Sentences: Type 0 vs Type 1',
				rootLabel: 'If-Clause (Condition) + Main Clause (Result)',
				rootSub: 'Use a comma only when the sentence starts with If',
				branches: [
					{
						label: 'Type 0 (Facts)',
						rule: 'If + Present Simple, Present Simple',
						example: 'If ice melts, it turns into water.'
					},
					{
						label: 'Type 1 (Likely Future)',
						rule: 'If + Present Simple, will + Stem',
						example: 'If we recycle, we will cut waste.'
					},
					{
						label: 'Unless (= If not)',
						rule: 'Unless + Affirmative Verb, Main Clause',
						example: 'Unless we save water, drought will grow.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الزمنان المستعملان في الجملة العلمية (Conditional Type 0)؟',
					hintAr: 'انظر إلى الفعلين heat و boils.',
					expectedInput: 'المضارع البسيط في الشطرين (Present Simple + Present Simple)',
					revealAr:
						'في النوع 0 نستعمل Present Simple في جملة الشرط و Present Simple في جواب الشرط لأنها حقيقة علمية ثابتة دائما.'
				},
				{
					promptAr: 'كيف يتغير جواب الشرط في النوع 1 (Conditional Type 1) عند الحديث عن نتيجة مستقبلية محتملة؟',
					hintAr: 'تأمل الفعل will become.',
					expectedInput: 'نستعمل will / will not + الفعل المجرد (Future Simple)',
					revealAr:
						'في النوع 1 تبقى جملة If في المضارع البسيط، بينما يكون جواب الشرط في المستقبل البسيط (will / can / may + stem).'
				},
				{
					promptAr: 'هل نضع الفاصلة إذا جاءت كلمة "if" في وسط الجملة؟',
					hintAr: 'قارن: "The air will become cleaner if we plant trees."',
					expectedInput: 'لا نضع فاصلة عندما تأتي if في الوسط',
					revealAr: 'نضع الفاصلة فقط إذا بدأت الجملة بـ If أو Unless، ونحذفها إذا جاءت if في الوسط.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الشرط النوع 0 (حقائق علمية وقوانين طبيعية): If + Present Simple, Present Simple. مثال: If plants do not get water, they die.',
				'الشرط النوع 1 (نتيجة محتملة في المستقبل): If + Present Simple, will / will not + Stem. مثال: If factories reduce smoke, pollution will decrease.',
				'تذكّر: لا نضع will أبدا داخل جملة If (نكتب If it rains وليس If it will rain).',
				'الرابط Unless يعني "إذا لم" (If ... not)، ويأتي بعده فعل مثبت: Unless we protect forests, wildlife will suffer.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Conditional Type 1 Cause and Future Result',
				tenseName: 'Present Condition to Future Result',
				formula: 'If + Present Simple, S + will + Base Verb',
				activeZone: 'future',
				example: 'If citizens use solar energy, electricity bills will drop.',
				markers: 'if, unless, as soon as, when'
			}),
			visualCaptionAr: 'العلاقة الزمنية في الجملة الشرطية من النوع الأول',
			examples: [
				{
					problemAr: 'صرّف الفعلين في النوع 0: "If carbon dioxide (increase) in the atmosphere, the Earth temperature (rise)."',
					solutionAr: 'If carbon dioxide increases in the atmosphere, the Earth temperature rises.'
				},
				{
					problemAr: 'أعد كتابة الجملة باستعمال Unless: "If we do not save water, Algeria will face shortages."',
					solutionAr: 'Unless we save water, Algeria will face shortages.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا في الامتحانات: وضع will بعد If مثل "If we will recycle..." — تذكر دائما أن جملة If في النوعين 0 و 1 تكون في المضارع البسيط فقط!'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح لهذه الحقيقة العلمية (Type 0): "If you freeze water, it .......... into ice."',
				options: ['turned', 'turns', 'will turning', 'would turn'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماضي لا يعبر عن حقيقة علمية عامة.',
					'أحسنت! الحقيقة العلمية (Type 0) تستخدم المضارع البسيط turns مع it.',
					'صيغة خاطئة نحويا.',
					'would تخص النوع الثاني الخيالي.'
				],
				explanationAr: 'تجمد الماء حقيقة فيزيائية ثابتة لذا نستخدم Type 0: Present Simple + Present Simple.'
			},
			{
				questionAr: 'أكمل الجملة (Type 1): "If students .......... plastic bottles, the school yard will stay clean."',
				options: ['recycled', 'will recycle', 'recycle', 'recycling'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الماضي لا يتوافق مع will stay في جواب الشرط.',
					'لا نضع will داخل جملة If أبدا.',
					'ممتاز! جملة If في النوع الأول تكون في المضارع البسيط (recycle).',
					'تحتاج فعلا مصرفا في المضارع البسيط.'
				],
				explanationAr: 'القاعدة في النوع الأول: If + Present Simple, will + Stem.'
			},
			{
				questionAr: 'أكمل جواب الشرط (Type 1): "If factories dump waste into rivers, marine life .........."',
				options: ['suffered', 'will suffer', 'suffering', 'would suffered'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الماضي لا يعبر عن نتيجة مستقبلية.',
					'صحيح! النتيجة المستقبلية المحتملة تصاغ بـ will + suffer.',
					'صيغة ناقصة بدون فعل مساعد.',
					'تركيب خاطئ.'
				],
				explanationAr: 'لوجود dump في المضارع البسيط وسياق تحذير مستقبلي نختار will suffer.'
			},
			{
				questionAr: 'اختر الجملة المكافئة لـ: "If farmers do not irrigate the soil, the crops will dry up."',
				options: [
					'Unless farmers do not irrigate the soil, the crops will dry up.',
					'Unless farmers irrigate the soil, the crops will dry up.',
					'Unless farmers will irrigate the soil, the crops dry up.',
					'Unless the crops will dry up, farmers irrigate the soil.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Unless تحمل النفي فلا نضع معها do not.',
					'أحسنت! حذفنا If ... do not وعوضناها بـ Unless + فعل مثبت.',
					'لا نضع will بعد Unless.',
					'عكست الشرط والنتيجة.'
				],
				explanationAr: 'Unless تساوي If ... not، لذلك نحذف do not ويبقى الفعل irrigate مثبتا.'
			},
			{
				questionAr: 'أي جملة من الجمل الآتية صحيحة تماما نحويا وترقيميا؟',
				options: [
					'If we will use wind power we save fuel.',
					'We will save energy if we turn off unused lights.',
					'We will save energy, if we turned off unused lights.',
					'If we turning off lights, we will save energy.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع will بعد If.',
					'ممتاز! جواب الشرط في المستقبل وجملة If في المضارع البسيط دون فاصلة في الوسط.',
					'لا نخلط بين will و الماضي turned.',
					'turning ليس فعلا مصرفا في المضارع البسيط.'
				],
				explanationAr: 'عند تقدم جواب الشرط نكتب: We will save energy if we turn off unused lights.'
			}
		]
	},

	// 4. Word Stress in Two-Syllable Words & Final -s / -ed
	{
		id: 'eng_lesson_1as_tcst_t2_stress_final_s_ed',
		slug: 'eng-1as-tcst-t2-stress-final-s-ed',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Back to Nature — الصوتيات والنبر (Phonology)',
		order: 4,
		titleAr: 'الصوتيات: النبر في الكلمات ذات المقطعين ونطق النهايتين -s و -ed (Stress and Final -s / -ed)',
		objectives: [
			'تحديد المقطع المنبور (Stressed Syllable) في الأسماء والصفات والأفعال ذات المقطعين',
			'تصنيف الكلمات المنتهية بـ -s حسب نطقها (/s/ أو /z/ أو /iz/)',
			'تصنيف الأفعال المنتهية بـ -ed حسب نطقها (/t/ أو /d/ أو /id/)'
		],
		keywordsAr: ['Word Stress', 'Two-Syllable Words', 'Final -s', 'Final -ed', 'Phonology'],
		discover: {
			scenarioAr:
				'في قسم الصوتيات بفرض الإنجليزية، يُطلب منك تصنيف كلمات مثل (protects, recycles, pollutes, beaches) حسب نطق -s الأخير، وتصنيف أفعال مثل (worked, cleaned, planted) حسب نطق -ed، وتحديد النبر في كلمات مثل PRE-sent (اسم) و pre-SENT (فعل). لنكتشف القاعدة الذهبية لكل منها!',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -ed',
				subtitle: 'Look at the LAST SOUND before -ed',
				columns: [
					{
						sound: '/t/',
						rule: 'After p, k, f, s, sh, ch',
						examples: 'helped, worked, washed'
					},
					{
						sound: '/d/',
						rule: 'After vowels and voiced sounds',
						examples: 'cleaned, saved, recycled'
					},
					{
						sound: '/id/',
						rule: 'ONLY after /t/ or /d/ sounds',
						examples: 'planted, polluted, needed'
					}
				]
			}),
			steps: [
				{
					promptAr: 'متى ننطق النهاية -ed بالصوت /id/ مثل planted و needed؟',
					hintAr: 'انظر إلى الحرف الأخير قبل إضافة ed.',
					expectedInput: 'إذا انتهى أصل الفعل بالصوت /t/ أو /d/',
					revealAr: 'ننطق -ed بالصوت /id/ فقط عندما ينتهي أصل الفعل بصوت /t/ مثل plant أو /d/ مثل need و decide.'
				},
				{
					promptAr: 'متى ننطق النهاية -s بالصوت /iz/ مثل beaches و washes؟',
					hintAr: 'تذكر الأصوات الصفيرية (s, z, sh, ch, x, ge).',
					expectedInput: 'بعد الأصوات الصفيرية s, z, sh, ch, x, ce/ge',
					revealAr: 'ننطق -s بالصوت /iz/ بعد الأصوات: /s/, /z/, /sh/, /ch/, /j/, /x/ مثل boxes, changes, washes, reduces.'
				},
				{
					promptAr: 'أين يقع النبر (Stress) غالبا في الاسم ذي المقطعين مقابل الفعل ذي المقطعين؟',
					hintAr: 'جرّب نطق: EX-port (اسم) مقابل ex-PORT (فعل).',
					expectedInput: 'على المقطع الأول في الاسم، وعلى المقطع الثاني في الفعل',
					revealAr:
						'في أغلب الكلمات ذات المقطعين: الاسم والصفة يُنبر مقطعهما الأول (CLI-mate, NA-ture, PRE-sent)، بينما الفعل يُنبر مقطعه الثاني (pro-TECT, pol-LUTE, pre-SENT).'
				}
			]
		},
		summary: {
			rulesAr: [
				'نطق Final -s: يُنطق /s/ بعد الأصوات المهموسة (p, t, k, f, th) مثل books, helps؛ ويُنطق /iz/ بعد (s, z, sh, ch, x, ge/ce) مثل watches, boxes, causes؛ ويُنطق /z/ بعد باقي الأصوات والعلل مثل trees, cleans, rivers.',
				'نطق Final -ed: يُنطق /id/ بعد /t/ و /d/ فقط (planted, protected, decided)؛ ويُنطق /t/ بعد (p, k, f, s, sh, ch) مثل worked, stopped, watched؛ ويُنطق /d/ بعد باقي الأصوات (cleaned, played, saved).',
				'النبر في الكلمات ذات المقطعين: معظم الأسماء والصفات تُنبر على المقطع الأول (WA-ter, FOR-est, SOL-ar)، ومعظم الأفعال تُنبر على المقطع الثاني (re-DUCE, pro-TECT, in-CREASE).',
				'تذكّر أن نعتمد على الصوت الأخير المنطوق لا على الحرف المكتوب فقط (فمثلا laughed تنتهي بصوت /f/ لذا تنطق /t/، و reduces تنتهي بصوت /s/ لذا تنطق /iz/).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -s / -es',
				subtitle: 'Look at the LAST SOUND before -s',
				columns: [
					{
						sound: '/s/',
						rule: 'After p, t, k, f, th',
						examples: 'plants, books, protects'
					},
					{
						sound: '/z/',
						rule: 'After vowels and b, d, g, l, m, n, r, v',
						examples: 'trees, rivers, saves'
					},
					{
						sound: '/iz/',
						rule: 'After s, z, sh, ch, x, ge/ce',
						examples: 'boxes, washes, reduces'
					}
				]
			}),
			visualCaptionAr: 'جدول قواعد نطق النهاية -s في الجمع والمضارع البسيط',
			examples: [
				{
					problemAr: 'صنّف الأفعال التالية حسب نطق -ed: (polluted — helped — recycled).',
					solutionAr: '/t/: helped | /d/: recycled | /id/: polluted.'
				},
				{
					problemAr: 'حدد المقطع المنبور (الأول أم الثاني) في: "EN-er-gy" أم "re-PORT (verb)" و "RE-port (noun)"؟',
					solutionAr: 'الاسم RE-port منبور على المقطع الأول، والفعل re-PORT منبور على المقطع الثاني.'
				}
			],
			watchOutAr:
				'انتبه للكلمات المنتهية بحرف e صامت مثل "reduces" أو "decided"! نحكم على الصوت الأخير المنطوق قبل الإضافة: reduce تنتهي بصوت /s/ فتأخذ /iz/، و decide تنتهي بصوت /d/ فتأخذ /id/.'
		},
		practice: [
			{
				questionAr: 'كيف تُنطق النهاية -ed في الفعل "protected"؟',
				options: ['/t/', '/d/', '/id/', '/s/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل ينتهي بصوت /t/ وليس /p/ أو /k/.',
					'الأفعال المنتهية بـ /t/ تأخذ /id/ لا /d/.',
					'أحسنت! protect ينتهي بصوت /t/ لذا يُنطق -ed بالصوت /id/.',
					'/s/ يخص النهاية -s لا -ed.'
				],
				explanationAr: 'كل فعل ينتهي بصوت /t/ أو /d/ يأخذ النطق /id/ عند إضافة -ed.'
			},
			{
				questionAr: 'أي كلمة من الكلمات الآتية تُنطق نهايتها -s بالصوت /iz/؟',
				options: ['forests', 'rivers', 'changes', 'plants'],
				correctIndex: 2,
				diagnosticFeedback: [
					'forest ينتهي بـ /t/ فتُنطق /s/.',
					'river ينتهي بصوت علة/r فتُنطق /z/.',
					'ممتاز! change ينتهي بصوت /j/ (ge) لذا تُنطق changes بالصوت /iz/.',
					'plant ينتهي بـ /t/ فتُنطق /s/.'
				],
				explanationAr: 'بعد الأصوات الصفيرية مثل ge و ce و ch و sh و s و x ننطق النهاية /iz/.'
			},
			{
				questionAr: 'كيف تُنطق النهاية -ed في الفعل "washed"؟',
				options: ['/t/', '/d/', '/id/', '/iz/'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الصوت الأخير في wash هو /sh/ (مهموس) لذا تنطق -ed بالصوت /t/.',
					'/sh/ صوت مهموس لا مجهور.',
					'/id/ تخص /t/ و /d/ فقط.',
					'/iz/ تخص النهاية -s.'
				],
				explanationAr: 'بعد الأصوات المهموسة (p, k, f, s, sh, ch) تنطق النهاية -ed بالصوت /t/.'
			},
			{
				questionAr: 'أين يقع النبر (Stress) في الفعل ذي المقطعين "pro-tect"؟',
				options: [
					'على المقطع الأول (PRO-tect)',
					'على المقطع الثاني (pro-TECT)',
					'لا يوجد نبر في الكلمة',
					'على كلا المقطعين بالتساوي'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المقطع الأول يغلب في الأسماء لا الأفعال ذات المقطعين.',
					'أحسنت! الأفعال ذات المقطعين غالبا ما تُنبر على المقطع الثاني (pro-TECT).',
					'كل كلمة إنجليزية متعددة المقاطع لها مقطع منبور.',
					'يوجد مقطع واحد أساسي منبور.'
				],
				explanationAr: 'الفعل ذو المقطعين مثل protect و reduce و pollute يُنبر على مقطعه الثاني.'
			},
			{
				questionAr: 'أي فعل من الأفعال الآتية تُنطق نهايته -ed بالصوت /d/؟',
				options: ['worked', 'planted', 'cleaned', 'stopped'],
				correctIndex: 2,
				diagnosticFeedback: [
					'worked ينتهي بصوت /k/ فينطق /t/.',
					'planted ينتهي بصوت /t/ فينطق /id/.',
					'إجابة صحيحة! clean ينتهي بصوت /n/ المجهور فتنطق -ed بالصوت /d/.',
					'stopped ينتهي بصوت /p/ فينطق /t/.'
				],
				explanationAr: 'بعد الأصوات المجهورة مثل /n, l, r, v, g, b/ والعلل تنطق النهاية -ed بالصوت /d/.'
			}
		]
	}
];
