import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishWordFormation
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCL Trimester 3 (Our Findings Show + Back to Nature)
// ============================================================================

export const LESSONS_1AS_TCL_T3: EnglishInteractiveLessonData[] = [
	// 1. Reported Speech (Statements, Orders & Questions)
	{
		id: 'eng_lesson_1as_tcl_t3_reported_speech',
		slug: 'eng-1as-tcl-t3-reported-speech',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Our Findings Show — الاستطلاعات ونقل الكلام',
		order: 1,
		titleAr: 'الكلام المنقول: الخبر والأمر والطلب والسؤال (Reported Statements, Orders and Questions)',
		objectives: [
			'نقل الجمل الخبرية مع مراعاة تراجع الأزمنة وتغيّر الضمائر وظروف الزمان',
			'نقل الأوامر والنصائح والطلبات باستعمال told / asked / advised + object + (not) to + Stem',
			'نقل الأسئلة بنوعيها (Yes/No بـ if/whether و Wh بترتيب جملة خبرية)'
		],
		keywordsAr: ['Reported Speech', 'Reported Orders', 'told him to', 'told him not to', 'asked if'],
		discover: {
			scenarioAr:
				'في اجتماع النادي البيئي للثانوية قال الأستاذ ثلاث جمل: 1) خبر: "Our survey shows real progress." 2) أمر منفي: "Do not waste printing paper." 3) سؤال: "Did you interview thirty students?" وعند نقلها نكتب: 1) The teacher said that their survey showed real progress. 2) He told us not to waste printing paper. 3) He asked us if we had interviewed thirty students.',
			svg: svgEnglishGrammarMap({
				title: 'All Three Forms of Reported Speech (1AS TCL)',
				rootLabel: 'Reporting Verb in the Past',
				branches: [
					{
						label: 'Statements',
						rule: 'said (that) / told + obj + S + V(back)',
						example: 'She said she read daily.'
					},
					{
						label: 'Orders / Requests',
						rule: 'told / asked / advised + obj + (not) to + Stem',
						example: 'He told us not to litter.'
					},
					{
						label: 'Questions',
						rule: 'asked + if/Wh + S + V(back)',
						example: 'She asked where we lived.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف ننقل الأمر المثبت "Save water" والأمر المنفي "Do not waste paper"؟',
					hintAr: 'نستعمل الصيغة: told + المخاطب + to / not to + الفعل المجرد.',
					expectedInput: 'He told us to save water / He told us not to waste paper.',
					revealAr:
						'الأمر المثبت يُنقل بـ told/ordered/advised + object + to + Stem، والأمر المنفي يُنقل بحذف Do ووضع not to + Stem.'
				},
				{
					promptAr: 'لماذا تحوّل الفعل "Did you interview" إلى "had interviewed" في السؤال المنقول؟',
					hintAr: 'راجع قاعدة تراجع الزمن للماضي البسيط (Past Simple).',
					expectedInput: 'لأن الماضي البسيط يتراجع إلى الماضي التام (Past Perfect: had + P.P.)',
					revealAr: 'عندما يكون السؤال في الماضي البسيط (Did + Stem) نحذف did ونحوّل الفعل إلى الماضي التام (had + Past Participle).'
				},
				{
					promptAr: 'هل نضع علامة استفهام أو علامتي تنصيص في الكلام المنقول؟',
					hintAr: 'انظر إلى نهاية الجملة الثالثة في المثال.',
					expectedInput: 'لا، نحذف علامتي التنصيص وعلامة الاستفهام ونضع نقطة فقط',
					revealAr: 'في الكلام المنقول نحذف علامات التنصيص ("...") وعلامة الاستفهام (؟) وننهي الجملة بنقطة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الجملة الخبرية (Statements): Subject + said (that) / told + object + (that) + جملة بزمن متراجع خطوة للماضي.',
				'الأمر والطلب المثبت (Affirmative Orders/Requests): Subject + told / asked / advised + object + to + Base Verb. مثال: "Read carefully." تصبح He advised me to read carefully.',
				'الأمر والطلب المنفي (Negative Orders): Subject + told / warned + object + not to + Base Verb. مثال: "Do not drop trash." تصبح She warned them not to drop trash.',
				'السؤال المنقول (Questions): Yes/No نربط بـ if / whether، و Wh نحتفظ بأداة الاستفهام، وفي كليهما نرتب الجملة (فاعل + فعل مصرف) بدون do/does/did.',
				'تغيرات أساسية: Present Simple يصبح Past Simple — Past Simple يصبح Past Perfect — will تصبح would — can تصبح could — today تصبح that day — tomorrow تصبح the next day.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Reporting Imperatives (Orders and Advice)',
				rootLabel: 'Direct Command to Reported Infinitive',
				branches: [
					{
						label: 'Positive Order',
						rule: '"Plant a tree!"',
						example: 'He told us to plant a tree.'
					},
					{
						label: 'Negative Order',
						rule: '"Do not burn waste!"',
						example: 'He warned us not to burn waste.'
					},
					{
						label: 'Polite Request',
						rule: '"Please fill in the form."',
						example: 'She asked me to fill in the form.'
					}
				]
			}),
			visualCaptionAr: 'قواعد نقل الأوامر والنواهي والطلبات المهذبة',
			examples: [
				{
					problemAr: 'حوّل إلى المنقول: The librarian told the pupils, "Do not speak loudly in the reading room."',
					solutionAr: 'The librarian told the pupils not to speak loudly in the reading room.'
				},
				{
					problemAr: 'حوّل إلى المنقول: The interviewer asked Karim, "Why do you prefer printed newspapers?"',
					solutionAr: 'The interviewer asked Karim why he preferred printed newspapers.'
				}
			],
			watchOutAr:
				'في نقل الأمر المنفي نحذف "Do" تماما! خطأ أن تكتب "He told us do not to waste" والصحيح "He told us not to waste".'
		},
		practice: [
			{
				questionAr: 'اختر التحويل الصحيح للأمر المثبت: The eco-leader said to us, "Bring reusable bottles."',
				options: [
					'The eco-leader told us bring reusable bottles.',
					'The eco-leader told us to bring reusable bottles.',
					'The eco-leader said us to bring reusable bottles.',
					'The eco-leader told us bringing reusable bottles.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها to قبل الفعل المجرد.',
					'أحسنت! told + us + to + bring.',
					'said لا تتبعها us مباشرة دون to.',
					'نستعمل to + stem وليس ing.'
				],
				explanationAr: 'الأمر المثبت يُنقل بالصيغة: told + المخاطب + to + Stem.'
			},
			{
				questionAr: 'اختر التحويل الصحيح للنهي: The teacher told the class, "Do not leave the taps running."',
				options: [
					'The teacher told the class to not leaving the taps running.',
					'The teacher told the class do not leave the taps running.',
					'The teacher told the class not to leave the taps running.',
					'The teacher asked the class if not leave the taps running.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نضع not قبل to والفعل يكون مجردا (leave).',
					'يجب حذف do واستعمال not to.',
					'ممتاز! told + المخاطب + not to + leave.',
					'هذا أمر منفي وليس سؤال Yes/No.'
				],
				explanationAr: 'في نقل الأمر المنفي نحذف Do ونستعمل not to + Base Verb.'
			},
			{
				questionAr: 'حوّل السؤال إلى المنقول: Amina asked me, "Have you finished the questionnaire?"',
				options: [
					'Amina asked me if I had finished the questionnaire.',
					'Amina asked me if had I finished the questionnaire?',
					'Amina asked me that I had finished the questionnaire.',
					'Amina asked me if I have finished the questionnaire.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح تماما! if + I + had finished (تراجع Present Perfect إلى Past Perfect).',
					'ترتيب الاستفهام (had I) وعلامة الاستفهام خاطئان.',
					'لا نستعمل that لنقل الأسئلة.',
					'لم يتراجع الزمن من have إلى had.'
				],
				explanationAr: 'في سؤال Yes/No نستعمل if + الفاعل + الفعل متراجعا للماضي التام (had finished).'
			},
			{
				questionAr: 'حوّل الجملة الخبرية: The mayor declared, "We will plant five thousand trees next month."',
				options: [
					'The mayor declared that they will plant five thousand trees next month.',
					'The mayor declared that they would plant five thousand trees the following month.',
					'The mayor declared that we would plant five thousand trees next month.',
					'The mayor asked that they would plant five thousand trees.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب تحويل will إلى would و next month إلى the following month.',
					'أحسنت! تحوّلت we إلى they و will إلى would و next month إلى the following month.',
					'يجب تعديل الضمير we وظرف الزمان next month.',
					'asked للأسئلة لا للجمل الخبرية.'
				],
				explanationAr: 'مع فعل النقل declared في الماضي نحول will إلى would و next month إلى the following month.'
			},
			{
				questionAr: 'اختر فعل النقل الأنسب لطلب مهذب يبدأ بـ "Please help me carry these books."',
				options: ['ordered', 'warned', 'asked', 'declared'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ordered للأوامر الصارمة لا للطلب المهذب بـ Please.',
					'warned للتحذير من خطر.',
					'إجابة موفقة! كلمة Please تدل على طلب مهذب يُنقل بـ asked + obj + to.',
					'declared للتصريحات الرسمية.'
				],
				explanationAr: 'الطلب المهذب المسبوق بـ Please يُنقل باستعمال asked + المخاطب + to + Stem.'
			}
		]
	},

	// 2. Conditional Sentences Types 0, 1 & 2 (Back to Nature)
	{
		id: 'eng_lesson_1as_tcl_t3_conditionals_0_1_2',
		slug: 'eng-1as-tcl-t3-conditionals-0-1-2',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Back to Nature — البيئة والطبيعة',
		order: 2,
		titleAr: 'الجمل الشرطية من الأنواع 0 و 1 و 2 (Conditional Types 0, 1 and 2)',
		objectives: [
			'التمييز الدقيق بين الشرط النوع 0 (حقيقة علمية)، والنوع 1 (احتمال مستقبلي حقيقي)، والنوع 2 (افتراض غير حقيقي أو نصيحة)',
			'صياغة الشرط النوع 2 باستعمال If + Past Simple, would / could + Stem',
			'استعمال الصيغة القياسية If I were you, I would... لتقديم النصيحة البيئية والأخلاقية'
		],
		keywordsAr: ['Conditional Type 0', 'Conditional Type 1', 'Conditional Type 2', 'If I were you', 'would'],
		discover: {
			scenarioAr:
				'قارن ثلاث جمل حول البيئة في قسم 1AS آداب: النوع 0: "If trees lose all water, they die." (حقيقة دائمة). النوع 1: "If our town builds a recycling center, waste will drop." (احتمال واقعي قريب). النوع 2: "If every citizen owned an electric bicycle, cities would be much quieter." (افتراض تخيلي حاضر). لاحظ الفرق في الأزمنة!',
			svg: svgEnglishGrammarMap({
				title: 'Conditional Sentences: Types 0, 1 and 2',
				rootLabel: 'If-Clause (Condition) + Main Clause (Result)',
				branches: [
					{
						label: 'Type 0 (Facts)',
						rule: 'If + Present Simple, Present Simple',
						example: 'If you heat ice, it melts.'
					},
					{
						label: 'Type 1 (Real Future)',
						rule: 'If + Present Simple, will + Stem',
						example: 'If we save water, wells will last.'
					},
					{
						label: 'Type 2 (Imaginary)',
						rule: 'If + Past Simple, would + Stem',
						example: 'If I were mayor, I would plant parks.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الزمنان المستعملان في الجملة الشرطية من النوع الثاني (Type 2)؟',
					hintAr: 'تأمّل: "If every citizen owned..., cities would be..."',
					expectedInput: 'الماضي البسيط في جملة If، و would + الفعل المجرد في جواب الشرط',
					revealAr: 'في النوع 2: If + Past Simple, Subject + would / could + Base Verb. ورغم استعمال الماضي فإن المعنى يشير لافتراض غير متحقق في الحاضر أو المستقبل.'
				},
				{
					promptAr: 'لماذا نقول "If I were you, I would recycle paper" بـ were بدل was؟',
					hintAr: 'تذكر قاعدة verb to be في النوع الثاني الشرطي.',
					expectedInput: 'في النوع الثاني يُفضل استعمال were مع جميع الضمائر بما فيها I و he و she',
					revealAr: 'في الإنجليزية الأكاديمية نستعمل were مع جميع الضمائر في Conditional Type 2، وخاصة في عبارة النصيحة الثابتة: If I were you, I would...'
				},
				{
					promptAr: 'ما الفرق في المعنى بين "If we recycle, air will improve" و "If everyone recycled, air would improve"؟',
					hintAr: 'أيهما يبدو خطة واقعية محتملة وأيهما افتراض تخيلي؟',
					expectedInput: 'الأول واقعي محتمل (Type 1) والثاني افتراضي تخيلي (Type 2)',
					revealAr: 'النوع 1 يعبر عن شرط واقعي ممكن الحدوث، أما النوع 2 فيعبر عن موقف افتراضي أو بعيد عن الواقع الحالي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النوع 0 (الحقائق العلمية والقوانين العامة): If + Present Simple, Present Simple.',
				'النوع 1 (شرط محتمل وواقعي مستقبلا): If + Present Simple, will / can / may + Base Verb.',
				'النوع 2 (شرط افتراضي/تخيلي في الحاضر أو نصيحة): If + Past Simple, would / could + Base Verb.',
				'عبارة النصيحة الذهبية: If I were you, I would + Base Verb (مثال: If I were you, I would join the green club).',
				'قاعدة ذهبية: لا نضع will أو would أبدا داخل جملة If!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing the Right Conditional Type',
				rootLabel: 'Check the Clue Verb in the Other Clause!',
				branches: [
					{
						label: 'See Present Simple (Fact)',
						rule: 'Complete with Present Simple',
						example: 'Type 0: boils / melts / dies'
					},
					{
						label: 'See "will + stem"',
						rule: 'If-clause takes Present Simple',
						example: 'Type 1: If we protect...'
					},
					{
						label: 'See "would + stem"',
						rule: 'If-clause takes Past Simple / were',
						example: 'Type 2: If we protected / were...'
					}
				]
			}),
			visualCaptionAr: 'مفتاح سريع للتعرف على نوع الجملة الشرطية من الفعل المعطى في الامتحان',
			examples: [
				{
					problemAr: 'صرّف الفعلين في النوع 2: "If factories (use) clean filters, the sky (be) clearer."',
					solutionAr: 'If factories used clean filters, the sky would be clearer.'
				},
				{
					problemAr: 'قدّم نصيحة لصديقك باستعمال If I were you: (turn off the tap while brushing your teeth).',
					solutionAr: 'If I were you, I would turn off the tap while brushing my teeth.'
				}
			],
			watchOutAr:
				'انتبه لعدم الخلط بين النوع 1 والنوع 2! إذا وجدت would في الشطر الثاني فضع الماضي البسيط في الشطر الأول، وإذا وجدت will فضع المضارع البسيط.'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة الشرطية (Type 2): "If I .......... the mayor of my city, I would create more public gardens."',
				options: ['am', 'were', 'will be', 'would be'],
				correctIndex: 1,
				diagnosticFeedback: [
					'am للمضارع ولا تناسب would create.',
					'أحسنت! في النوع الثاني نستعمل were مع I (If I were...).',
					'لا نضع will في جملة If.',
					'لا نضع would داخل جملة If.'
				],
				explanationAr: 'لوجود would create في جواب الشرط نستخدم صيغة الماضي الشرطي were.'
			},
			{
				questionAr: 'أكمل جواب الشرط (Type 2): "If people stopped using plastic bags, marine animals .......... much safer."',
				options: ['will be', 'would be', 'are', 'were'],
				correctIndex: 1,
				diagnosticFeedback: [
					'will تخص النوع الأول وليس الماضي stopped.',
					'ممتاز! stopped (ماض بسيط) تقابلها would be في جواب الشرط.',
					'are للمضارع ولا تطابق stopped.',
					'نحتاج would + stem في جواب الشرط.'
				],
				explanationAr: 'النوع الثاني: If + Past Simple (stopped), would + Stem (would be).'
			},
			{
				questionAr: 'أكمل الجملة (Type 1): "If Algeria invests more in solar farms, renewable energy output .......... rapidly."',
				options: ['would grow', 'will grow', 'grew', 'growing'],
				correctIndex: 1,
				diagnosticFeedback: [
					'invests في المضارع البسيط فتقابلها will لا would.',
					'صحيح! مضارع بسيط في الشرط (invests) مع مستقبل (will grow) في النتيجة.',
					'الماضي لا يطابق المضارع invests هنا.',
					'صيغة ناقصة.'
				],
				explanationAr: 'وجود invests (Present Simple) وسياق مستقبلي واقعي يتطلب Type 1: will grow.'
			},
			{
				questionAr: 'أكمل الحقيقة العلمية (Type 0): "If you mix blue and yellow paint, you .......... green."',
				options: ['got', 'would get', 'get', 'will got'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الماضي لا يعبر عن حقيقة علمية دائمة.',
					'would للنوع الثاني الخيالي.',
					'أحسنت! الحقيقة الثابتة (Type 0) تأخذ المضارع البسيط في الشطرين.',
					'تركيب خاطئ تماما.'
				],
				explanationAr: 'النوع 0 يعبر عن الحقائق الثابتة بـ Present Simple + Present Simple.'
			},
			{
				questionAr: 'أي جملة صحيحة نحويا في النوع الثاني؟',
				options: [
					'If we would save water, drought would end.',
					'If we saved water, drought would decrease.',
					'If we saved water, drought will decrease.',
					'If we save water, drought would decrease.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع would داخل جملة If.',
					'إجابة صحيحة! If + saved (Past Simple), would decrease.',
					'خلط خاطئ بين الماضي saved و will.',
					'خلط خاطئ بين المضارع save و would.'
				],
				explanationAr: 'في النوع الثاني يجب تطابق Past Simple في جملة If مع would + Stem في الجملة الرئيسية.'
			}
		]
	},

	// 3. Expressing Cause & Result (because, since, because of, so, therefore, consequently)
	{
		id: 'eng_lesson_1as_tcl_t3_cause_result',
		slug: 'eng-1as-tcl-t3-cause-result',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Back to Nature — البيئة والطبيعة',
		order: 3,
		titleAr: 'التعبير عن السبب والنتيجة (Cause and Result: because, because of, so, consequently)',
		objectives: [
			'التمييز بين أدوات السبب المتبوعة بجملة (because, since, as) والأدوات المتبوعة باسم (because of, due to, owing to)',
			'استعمال أدوات النتيجة بدقة وترقيم سليم (so, therefore, consequently, as a result)',
			'إعادة صياغة جمل السبب إلى جمل نتيجة والعكس دون تغيير المعنى'
		],
		keywordsAr: ['Cause', 'Result', 'because', 'because of', 'so', 'consequently', 'as a result'],
		discover: {
			scenarioAr:
				'تأمّل جملتين بيئيتين متكافئتين في المعنى: 1) "Wildfires spread quickly because the summer was extremely dry." (السبب بعد because). 2) "The summer was extremely dry; consequently, wildfires spread quickly." (النتيجة بعد consequently). وقارن مع: "Wildfires spread quickly because of the extreme dryness." (اسم بعد because of).',
			svg: svgEnglishGrammarMap({
				title: 'Cause Connectors vs Result Connectors',
				rootLabel: 'Cause (Why?) and Result (What happened?)',
				branches: [
					{
						label: 'Cause + Clause',
						rule: 'because / since / as + S + V',
						example: 'Air is clean because we planted trees.'
					},
					{
						label: 'Cause + Noun',
						rule: 'because of / due to + Noun / V-ing',
						example: 'Smog grew because of heavy traffic.'
					},
					{
						label: 'Result Linkers',
						rule: 'so / Therefore, / Consequently,',
						example: 'Water is scarce; therefore, save it.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق النحوي بين "because" و "because of"؟',
					hintAr: 'انظر إلى ما بعد كل منهما: "the summer was dry" مقابل "the extreme dryness".',
					expectedInput: 'because تتبعها جملة كاملة (فاعل + فعل)، و because of يتبعها اسم أو مركب اسمي',
					revealAr: 'because / since / as يتبعها فاعل + فعل، أما because of / due to / owing to فيتبعها اسم أو مركب اسمي أو V-ing.'
				},
				{
					promptAr: 'كيف نعيد كتابة "Rivers are polluted because factories dump waste" باستعمال "consequently"؟',
					hintAr: 'نبدأ بالسبب أولا ثم نضع نقطه أو فاصلة منقوطة ثم consequently, ثم النتيجة.',
					expectedInput: 'Factories dump waste; consequently, rivers are polluted.',
					revealAr: 'عند الانتقال من أداة سبب إلى أداة نتيجة نضع جملة السبب أولا ثم (; consequently, أو . Therefore,) ثم جملة النتيجة.'
				},
				{
					promptAr: 'ما علامة الترقيم التي تتبع دائما "Therefore" و "Consequently" و "As a result"؟',
					hintAr: 'انظر إلى المثال: consequently, wildfires spread...',
					expectedInput: 'فاصلة (Comma) مباشرة بعد الرابط',
					revealAr: 'بعد Therefore و Consequently و As a result نضع فاصلة دائما، أما so فتسبقها فاصلة ولا تتبعها فاصلة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'روابط السبب + جملة كاملة (S + V): because / since / as (مثال: Since water is vital, we must protect rivers).',
				'روابط السبب + اسم / مركب اسمي / V-ing: because of / due to / owing to (مثال: Many species are endangered because of deforestation).',
				'روابط النتيجة: Cause + , so + Result. أو: Cause. Therefore, / Consequently, / As a result, + Result.',
				'تذكّر العكس المنطقي: Result + because + Cause تساوي Cause; consequently, + Result.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting Cause as Result without Changing Meaning',
				rootLabel: 'A (Cause): Forests were cut.  B (Result): Soil eroded.',
				branches: [
					{
						label: 'With because',
						rule: 'B + because + A',
						example: 'Soil eroded because forests were cut.'
					},
					{
						label: 'With because of',
						rule: 'B + because of + Noun(A)',
						example: 'Soil eroded because of deforestation.'
					},
					{
						label: 'With consequently',
						rule: 'A; consequently, B',
						example: 'Forests were cut; consequently, soil eroded.'
					}
				]
			}),
			visualCaptionAr: 'طرق التعبير عن نفس العلاقة السببية بثلاث صيغ مختلفة',
			examples: [
				{
					problemAr: 'اربط باستعمال because of: "The beach remained clean. The volunteers worked hard."',
					solutionAr: 'The beach remained clean because of the volunteers- hard work.'
				},
				{
					problemAr: 'أعد الكتابة باستعمال As a result: "Because temperatures rose sharply, mountain snow melted early."',
					solutionAr: 'Temperatures rose sharply. As a result, mountain snow melted early.'
				}
			],
			watchOutAr:
				'لا تجمع أبدا بين أداة سبب وأداة نتيجة في جملة واحدة! خطأ شائع جدا: "Because it rained heavily, so the valley flooded" — احذف إما Because أو so.'
		},
		practice: [
			{
				questionAr: 'أكمل الفراغ: "Several desert oases suffered .......... prolonged drought."',
				options: ['because', 'because of', 'therefore', 'so'],
				correctIndex: 1,
				diagnosticFeedback: [
					'because تحتاج فاعلا وفعلا بعدها، وهنا مركب اسمي فقط.',
					'أحسنت! "prolonged drought" مركب اسمي يناسبه because of.',
					'therefore للنتيجة وتحتاج جملة كاملة.',
					'so للنتيجة وتحتاج جملة كاملة.'
				],
				explanationAr: 'قبل المركب الاسمي (prolonged drought) نستعمل because of أو due to.'
			},
			{
				questionAr: 'أكمل الفراغ برابط نتيجة مناسب: "Many families installed solar water heaters; .........., their gas bills dropped."',
				options: ['because', 'because of', 'consequently', 'since'],
				correctIndex: 2,
				diagnosticFeedback: [
					'because للسبب لا للنتيجة.',
					'because of للسبب مع اسم.',
					'ممتاز! انخفاض الفواتير نتيجة لتركيب السخانات الشمسية، و consequently تأتي بعد فاصلة منقوطة وقبل فاصلة.',
					'since للسبب.'
				],
				explanationAr: 'العلاقة هنا علاقة نتيجة لذا نستعمل consequently.'
			},
			{
				questionAr: 'اختر الجملة السليمة نحويا:',
				options: [
					'Because the air was polluted, so many residents wore masks.',
					'The air was polluted, so many residents wore masks.',
					'The air was polluted; because, many residents wore masks.',
					'Due to the air was polluted, residents wore masks.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجوز الجمع بين Because و so في جملة واحدة.',
					'صحيح تماما! السبب ثم فاصلة + so ثم النتيجة.',
					'because لا تأتي كظرف نتيجة بين فاصلة منقوطة وفاصلة.',
					'Due to لا يتبعها فاعل وفعل مباشرة.'
				],
				explanationAr: 'نكتفي برابط واحد (so للنتيجة أو because للسبب) ولا نجمع بينهما.'
			},
			{
				questionAr: 'ما الجملة المكافئة لـ: "Plastic bags harm sea turtles because they mistake them for food."؟',
				options: [
					'Sea turtles mistake plastic bags for food; therefore, plastic bags harm them.',
					'Plastic bags harm sea turtles; therefore, they mistake them for food.',
					'Because of sea turtles mistake plastic bags, they are harmed.',
					'Sea turtles are harmed, because they mistake plastic bags, so they die.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! قدّمنا السبب ثم رابط النتيجة therefore ثم النتيجة بدقة.',
					'عكست السبب والنتيجة.',
					'because of لا تتبعها جملة كاملة.',
					'جمع خاطئ بين because و so.'
				],
				explanationAr: 'نضع السبب أولا ثم therefore ثم النتيجة.'
			},
			{
				questionAr: 'أكمل الجملة: ".......... forests absorb carbon dioxide, planting trees slows down global warming."',
				options: ['Therefore', 'Since', 'Because of', 'Consequently'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Therefore تعبر عن النتيجة لا السبب.',
					'إجابة صحيحة! Since تعني "بما أن / لأن" ويتبعها فاعل وفعل.',
					'Because of يتبعها اسم لا جملة كاملة.',
					'Consequently للنتيجة.'
				],
				explanationAr: 'Since / As / Because تتبعها جملة كاملة وتعبر عن السبب.'
			}
		]
	},

	// 4. Word Building (Verb / Noun / Adjective) & Phonology (Syllables & Word Stress)
	{
		id: 'eng_lesson_1as_tcl_t3_word_building_phonology',
		slug: 'eng-1as-tcl-t3-word-building-phonology',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Back to Nature — بناء الكلمات والصوتيات (Morphology and Phonology)',
		order: 4,
		titleAr: 'بناء الكلمات (Verb / Noun / Adjective) والصوتيات (المقاطع والنبر الصوتي)',
		objectives: [
			'إكمال جدول بناء الكلمات (Verb / Noun / Adjective) باستعمال اللواحق القياسية (-tion, -ment, -ity, -al, -ful, -able, -ive)',
			'عدّ المقاطع الصوتية (Syllables) بدقة اعتمادا على أصوات العلة المنطوقة',
			'تحديد المقطع المنبور في الكلمات المنتهية بـ -tion / -sion / -ic (قاعدة المقطع ما قبل الأخير)'
		],
		keywordsAr: ['Word Building', 'Suffixes', 'Syllables', 'Word Stress', '-tion', '-ic'],
		discover: {
			scenarioAr:
				'في قسم استكشاف النص (Text Exploration — 8 pts) لشعبة الآداب، يتكرر تمرينان أساسيان: جدول بناء الكلمات (مثل: pollute / pollution / polluted أو educate / education / educational)، وتمرين النبر الصوتي في كلمات تنتهي بـ -tion و -ic مثل: pol-LU-tion و e-co-NO-mic. لاحظ أين يقع النبر دائما قبل -tion و -ic!',
			svg: svgEnglishWordFormation({
				title: 'Word Building Table Strategy (Verb - Noun - Adjective)',
				prefix: 're- / en-',
				root: 'cycle / environ / protect',
				suffix: '-tion / -ment / -al / -ive',
				derivedWord: 'environment: environmental  |  protect: protection / protective',
				meaningNote: 'Learn key suffixes to fill every exam morphology table'
			}),
			steps: [
				{
					promptAr: 'ما اللواحق الأشهر لتكوين الاسم (Noun) واللواحق الأشهر لتكوين الصفة (Adjective)؟',
					hintAr: 'تأمل كلمات مثل: pollution, environment, protection مقابل polluted, environmental, protective, useful.',
					expectedInput: 'الاسم: -tion, -ment, -ity, -ness | الصفة: -al, -ive, -ful, -able, -ed, -ic',
					revealAr:
						'لواحق الاسم: -tion/-sion, -ment, -ity, -ness, -ance. لواحق الصفة: -al, -ive, -ful, -less, -able, -ic, -ous.'
				},
				{
					promptAr: 'أين يقع النبر (Stress) دائما في الكلمات المنتهية بـ -tion أو -sion أو -ic؟',
					hintAr: 'انطق بصوت مرتفع: pol-LU-tion — con-ser-VA-tion — e-co-NO-mic — sci-en-TI-fic.',
					expectedInput: 'على المقطع الذي يسبق النهاية مباشرة (المقطع ما قبل الأخير / Penultimate)',
					revealAr:
						'قاعدة ذهبية مضمونة 100 بالمئة: الكلمات المنتهية بـ -tion / -sion / -ic يُنبر فيها دائما المقطع قبل الأخير (Penultimate syllable): pro-TEC-tion, pol-LU-tion, cli-MA-tic.'
				},
				{
					promptAr: 'كم مقطعا صوتيا في كلمة "save" وفي كلمة "pollution"؟ ولماذا لا نحسب حرف e الأخير في save؟',
					hintAr: 'المقطع الصوتي يُحسب بعدد أصوات العلة المنطوقة فقط.',
					expectedInput: 'save مقطع واحد (لأن e الأخيرة صامتة)، و pollution ثلاث مقاطع (pol-lu-tion)',
					revealAr:
						'حرف e الصامت في آخر الكلمة لا يُنطق فلا يُحسب مقطعا؛ لذا save = 1 syllable، و pol-lu-tion = 3 syllables.'
				}
			]
		},
		summary: {
			rulesAr: [
				'لواحق تكوين الاسم (Noun): -tion / -ation (conserve: conservation), -ment (develop: development), -ity (pure: purity), -ness (clean: cleanliness), -ance (ignore: ignorance).',
				'لواحق تكوين الصفة (Adjective): -al (nature: natural, environment: environmental), -ive (protect: protective), -ful (harm: harmful), -able (recycle: recyclable), -ic (climate: climatic).',
				'قاعدة عدّ المقاطع (Syllables): احسب أصوات العلة المنطوقة (a, e, i, o, u, y)؛ العلتان المتجاورتان بصوت واحد تُحسبان مقطعا واحدا (clean = 1)، وحرف e الصامت في النهاية لا يُحسب (waste = 1).',
				'قواعد النبر (Word Stress): 1) المنتهية بـ -tion / -sion / -ic تُنبر على المقطع ما قبل الأخير (pol-LU-tion, cli-MA-tic). 2) المنتهية بـ -ty / -phy / -gy تُنبر على المقطع الثالث من الآخر (e-CO-lo-gy, di-VER-si-ty).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Golden Word Stress Rules (1AS TCL)',
				subtitle: 'Count from the END of the word',
				columns: [
					{
						sound: '-tion / -ic',
						rule: '2nd syllable from end',
						examples: 'pol-LU-tion, cli-MA-tic'
					},
					{
						sound: '-ty / -gy',
						rule: '3rd syllable from end',
						examples: 'e-CO-lo-gy, ac-TI-vi-ty'
					},
					{
						sound: '2-Syllable',
						rule: '1st (Noun) / 2nd (Verb)',
						examples: 'NA-ture / pro-TECT'
					}
				]
			}),
			visualCaptionAr: 'القواعد الذهبية لتحديد النبر الصوتي في امتحانات السنة الأولى ثانوي آداب',
			examples: [
				{
					problemAr: 'أكمل صفّين في جدول بناء الكلمات: (protect / ... / ...) و (... / environment / ...).',
					solutionAr: 'protect (Verb) | protection (Noun) | protective (Adjective)  —  (no verb) | environment (Noun) | environmental (Adjective).'
				},
				{
					problemAr: 'حدد عدد المقاطع والمقطع المنبور في كلمة "con-ser-va-tion".',
					solutionAr: '4 syllables (con-ser-VA-tion); stress falls on the 3rd syllable (2nd from the end: VA).'
				}
			],
			watchOutAr:
				'عند عدّ المقاطع في كلمات مثل "climate" أو "nature" تذكر أن e الأخيرة صامتة فتكون كل منهما مقطعين فقط (cli-mate, na-ture) لا ثلاثة مقاطع!'
		},
		practice: [
			{
				questionAr: 'اختر الصفة الصحيحة المشتقة من الاسم "environment":',
				options: ['environmention', 'environmental', 'environmentist', 'environmentment'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لاحقة غير صحيحة.',
					'أحسنت! نضيف اللاحقة -al لتكوين الصفة environmental.',
					'environmentalist اسم للشخص المهتم بالبيئة وليس الصفة المقصودة هنا.',
					'لاحقة مكررة خاطئة.'
				],
				explanationAr: 'الصفة من environment هي environmental.'
			},
			{
				questionAr: 'أين يقع النبر (Stress) في كلمة "pro-tec-tion"؟',
				options: [
					'على المقطع الأول (PRO-tec-tion)',
					'على المقطع الثاني (pro-TEC-tion)',
					'على المقطع الأخير (pro-tec-TION)',
					'على كل المقاطع'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الكلمات المنتهية بـ -tion لا تُنبر على المقطع الأول هنا.',
					'ممتاز! قبل -tion مباشرة (المقطع ما قبل الأخير): pro-TEC-tion.',
					'النهاية -tion نفسها لا تُنبر أبدا.',
					'هناك مقطع واحد منبور أساسا.'
				],
				explanationAr: 'القاعدة الثابتة: كل كلمة تنتهي بـ -tion يُنبر مقطعها الذي يسبق -tion مباشرة.'
			},
			{
				questionAr: 'كم مقطعا صوتيا في كلمة "waste" (نفايات)؟',
				options: ['1 syllable', '2 syllables', '3 syllables', '4 syllables'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حرف e الأخير صامت فلا يُنطق، وتحتوي الكلمة على صوت علة واحد فقط.',
					'حرف e الأخير صامت لا يشكل مقطعا.',
					'غير صحيح.',
					'غير صحيح.'
				],
				explanationAr: 'كلمة waste ذات مقطع صوتي واحد (1 syllable) لأن e في آخرها صامتة.'
			},
			{
				questionAr: 'أين يقع النبر في كلمة "sci-en-ti-fic" المنتهية بـ -ic؟',
				options: [
					'على المقطع الأول (SCI-en-ti-fic)',
					'على المقطع الثاني (sci-EN-ti-fic)',
					'على المقطع الثالث (sci-en-TI-fic)',
					'على المقطع الرابع (sci-en-ti-FIC)'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ليس المقطع الأول.',
					'ليس المقطع الثاني.',
					'أحسنت! الكلمات المنتهية بـ -ic تُنبر دائما على المقطع ما قبل الأخير (TI).',
					'النهاية -ic لا تُنبر.'
				],
				explanationAr: 'النهاية -ic تجذب النبر دائما إلى المقطع الذي يسبقها مباشرة: sci-en-TI-fic.'
			},
			{
				questionAr: 'اختر الفعل والاسم والصفة الصحيحة من عائلة "conserve":',
				options: [
					'conserve — conservation — conservative',
					'conservation — conserve — conservatively',
					'conservate — conservation — conservful',
					'conserve — conservement — conservic'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة دقيقة! الفعل conserve والاسم conservation والصفة conservative.',
					'الترتيب مقلوب و conservatively ظرف لا صفة.',
					'كلمات غير موجودة في الإنجليزية.',
					'لواحق غير صحيحة.'
				],
				explanationAr: 'عائلة الكلمة الصحيحة: Verb: conserve | Noun: conservation | Adjective: conservative.'
			}
		]
	}
];
