import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_SCI_T3: EnglishInteractiveLessonData[] = [
	// [1] Reported Speech: Statements & Tense Backshift
	{
		id: 'eng_lesson_2as_sci_t3_reported_statements',
		slug: 'eng-2as-sci-t3-reported-statements',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: No Man is an Island — الكوارث الطبيعية والتضامن والعمل الخيري',
		order: 1,
		titleAr: 'الكلام المنقول: الجمل الخبرية وتغيير الأزمنة والظروف (Reported Statements)',
		objectives: [
			'تحويل الجمل الخبرية من الكلام المباشر (Direct Speech) إلى الكلام المنقول (Reported Speech)',
			'تطبيق تراجع الأزمنة (Tense Backshift) بدقة عندما يكون فعل النقل في الماضي (said / told)',
			'تعديل الضمائر وظروف الزمان والمكان (today, yesterday, now, here) بانسجام تام'
		],
		keywordsAr: ['Reported Speech', 'Statements', 'Tense Backshift', 'said', 'told', 'Time markers'],
		discover: {
			scenarioAr:
				'بعد حملة إغاثة إثر فيضانات، صرّح رئيس الجمعية: «نحن نوزّع الخيام اليوم (We are distributing tents today)». فكتب الصحفي في تقريره: «قال رئيس الجمعية إنهم كانوا يوزعون الخيام في ذلك اليوم (He said that they were distributing tents that day)». لاحظ التغييرات الثلاثة: الضمير والزمن والظرف!',
			svg: svgEnglishGrammarMap({
				title: 'Reported Statements: Tense Backshift',
				rootLabel: 'Reporting Verb in PAST (said / told)',
				rootSub: 'Shift tense one step back into the past',
				branches: [
					{ label: 'Present to Past', rule: 'help to helped | is to was', example: 'He said he helped.' },
					{ label: 'Past to Past Perf.', rule: 'arrived to had arrived', example: 'She said aid had arrived.' },
					{ label: 'Modals Shift', rule: 'will to would | can to could', example: 'They said they would help.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما العناصر الثلاثة التي تغيرت عند تحويل الجملة: «We are distributing tents today» بعد (He said that...)?',
					hintAr: 'راقب الضمير (We)، والفعل (are distributing)، والظرف (today).',
					expectedInput: 'الضمير (they)، والزمن (were distributing)، والظرف (that day)',
					revealAr:
						'تغير الضمير من (We) إلى (they)، وتراجع الزمن خطوة إلى الماضي من (are) إلى (were)، وتغير الظرف (today) إلى (that day).'
				},
				{
					promptAr: 'ماذا يحدث لأزمنة الجملة إذا كان فعل النقل في الحاضر مثل (The journalist says that...)?',
					hintAr: 'هل نرجع بالزمن إلى الوراء عندما يكون فعل القول في الحاضر؟',
					expectedInput: 'لا يتغير الزمن إطلاقاً، وتتغير الضمائر فقط',
					revealAr:
						'إذا كان فعل النقل في الحاضر (says / tells) أو كانت الجملة حقيقة علمية ثابتة، فلا نغيّر الزمن أبداً، ونعدّل الضمائر فقط حسب المعنى.'
				},
				{
					promptAr: 'ما الفرق في الاستعمال بين فعل النقل (said) وفعل النقل (told)؟',
					hintAr: 'هل نقول (He told that...) أم (He told us that...)?',
					expectedInput: 'told يحتاج دائماً إلى مفعول به مخاطَب (told us / told me)، أما said فلا يحتاج',
					revealAr:
						'الفعل (told) يتبعه دائما شخص مخاطَب (told us / told the volunteers that)، بينما (said) يتبعه (that) مباشرة (أو said to us).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة العامة: عندما يكون فعل النقل في الماضي (said / told / declared / reported)، نحذف علامتي التنصيص ونرجع بالزمن خطوة إلى الماضي (Tense Backshift).',
				'جدول تراجع الأزمنة: Present Simple إلى Past Simple | Present Continuous إلى Past Continuous | Past Simple و Present Perfect إلى Past Perfect (had + PP) | will إلى would | can إلى could | must إلى had to.',
				'تغيير ظروف الزمان والمكان: now إلى then | today إلى that day | yesterday إلى the day before | tomorrow إلى the next day / the following day | here إلى there | this إلى that | these إلى those.',
				'متى لا يتراجع الزمن؟ (1) إذا كان فعل النقل في الحاضر (says / reports). (2) إذا كانت الجملة حقيقة علمية أو عامة ثابتة.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Time & Place Markers in Reported Speech',
				tenseName: 'Direct Speech to Indirect Speech',
				formula: 'today: that day | yesterday: the day before | tomorrow: the next day',
				activeZone: 'two_past',
				example: 'Direct: "We arrived yesterday." / Reported: They said they had arrived the day before.',
				markers: 'now: then | here: there | ago: before | last week: the previous week'
			}),
			visualCaptionAr: 'تحويلات الزمن وظروف الزمان والمكان الأساسية في الكلام المنقول',
			examples: [
				{
					problemAr: 'Report: The doctor said, "We have treated forty injured villagers today."',
					solutionAr: 'The doctor said that they had treated forty injured villagers that day.'
				},
				{
					problemAr: 'Report: Amina told her friends, "I will donate my books tomorrow."',
					solutionAr: 'Amina told her friends that she would donate her books the next day (or: the following day).'
				},
				{
					problemAr: 'Report: The teacher says, "Solidarity strengthens every community."',
					solutionAr: 'The teacher says that solidarity strengthens every community. (لا يتغير الزمن لأن فعل القول says في الحاضر).'
				}
			],
			watchOutAr:
				'احذر الخطأين المتكررين في الاختبارات: (1) لا تكتب (He told that...) بدون مخاطَب؛ الصحيح (He said that...) أو (He told us that...). (2) إذا كان الفعل الأصلي في الماضي البسيط (sent) فحوله إلى الماضي التام (had sent) وليس الماضي البسيط نفسه!'
		},
		practice: [
			{
				questionAr: 'Report: The rescue leader said, "We need clean water now."',
				options: [
					'The rescue leader said that they need clean water now.',
					'The rescue leader said that they needed clean water then.',
					'The rescue leader said that we needed clean water then.',
					'The rescue leader told that they needed clean water then.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لم يتم تراجع الزمن need ولا تغيير الظرف now.',
					'إجابة صحيحة! we أصبحت they، و need أصبحت needed، و now أصبحت then.',
					'بقي الضمير we دون تحويل إلى they.',
					'الفعل told يحتاج إلى مفعول به مخاطَب بعده.'
				],
				explanationAr: 'فعل النقل said في الماضي، فتتغير الضمائر والزمن (Present إلى Past) والظرف (now إلى then).'
			},
			{
				questionAr: 'Report: Karim said, "The charity delivered food blankets yesterday."',
				options: [
					'Karim said that the charity had delivered food blankets the day before.',
					'Karim said that the charity delivers food blankets yesterday.',
					'Karim said that the charity will deliver food blankets the day before.',
					'Karim said that the charity has delivered food blankets yesterday.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الماضي البسيط delivered يتحول إلى الماضي التام had delivered، و yesterday إلى the day before.',
					'الزمن والظرف لم يتحولا بشكل صحيح.',
					'will لا تناسب التحويل من الماضي.',
					'المضارع التام خطأ بعد فعل نقل في الماضي.'
				],
				explanationAr: 'الماضي البسيط يتحول في الكلام المنقول إلى Past Perfect (had + PP) وظرف yesterday يصبح the day before.'
			},
			{
				questionAr: 'Report: Nadia told us, "I will join the Red Crescent volunteers tomorrow."',
				options: [
					'Nadia told us that she will join the Red Crescent volunteers tomorrow.',
					'Nadia told us that she would join the Red Crescent volunteers the next day.',
					'Nadia told us that I would join the Red Crescent volunteers the next day.',
					'Nadia said us that she would join the Red Crescent volunteers the next day.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لم يتحول will ولا tomorrow.',
					'صحيح! I أصبحت she، و will أصبحت would، و tomorrow أصبحت the next day.',
					'الضمير I يجب أن يتحول إلى she.',
					'لا نكتب said us بدون حرف الجر to.'
				],
				explanationAr: 'تتحول will إلى would، و tomorrow إلى the next day / the following day.'
			},
			{
				questionAr: 'Report: The spokesperson says, "Donations are arriving every hour."',
				options: [
					'The spokesperson says that donations were arriving every hour.',
					'The spokesperson says that donations had arrived every hour.',
					'The spokesperson says that donations are arriving every hour.',
					'The spokesperson says that donations would arrive every hour.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'فعل النقل says في الحاضر، فلا نغيّر الزمن.',
					'لا يوجد تراجع للزمن مع فعل نقل حاضر.',
					'أحسنت! عندما يكون فعل النقل في الحاضر (says) يبقى الزمن كما هو.',
					'لا نحول are إلى would.'
				],
				explanationAr: 'قاعدة ثابتة: لا يحدث تراجع في الأزمنة إذا كان فعل القول في الحاضر (says / tells).'
			},
			{
				questionAr: 'Which sentence uses "told" and "must" correctly in Reported Speech?',
				options: [
					'He told that we must stay calm.',
					'He told us that we had to stay calm.',
					'He said us that we had to stay calm.',
					'He told to us that we musted stay calm.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نقص المخاطَب بعد told.',
					'صحيح! told + us، وتتحول must الدالة على الإلزام إلى had to.',
					'لا نكتب said us مباشرة.',
					'لا نضع to بعد told ولا يوجد فعل اسمه musted.'
				],
				explanationAr: 'الفعل told يتبعه المخاطَب مباشرة بدون to، وتتحول must الإلزامية في الماضي المنقول إلى had to.'
			}
		]
	},

	// [2] Reported Orders, Requests & Questions
	{
		id: 'eng_lesson_2as_sci_t3_reported_orders_questions',
		slug: 'eng-2as-sci-t3-reported-orders-questions',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: No Man is an Island — الكوارث الطبيعية والتضامن والعمل الخيري',
		order: 2,
		titleAr: 'الكلام المنقول: الأوامر والطلبات والأسئلة (Reported Orders, Requests & Questions)',
		objectives: [
			'نقل الأوامر والطلبات المثبتة والمنفية باستعمال (to + stem) و(not to + stem)',
			'نقل أسئلة نعم/لا باستعمال (asked + if / whether) مع ترتيب الجملة الخبرية',
			'نقل أسئلة الاستفهام (Wh-questions) بحذف (do/does/did) وعلامة الاستفهام وتعديل الزمن'
		],
		keywordsAr: ['Reported Orders', 'Reported Requests', 'Reported Questions', 'if / whether', 'not to + stem'],
		discover: {
			scenarioAr:
				'أثناء هزة أرضية، قال رجل الحماية المدنية للتلاميذ: «ابقَوا هادئين! لا تستعملوا المصعد! هل الجميع بخير؟ أين صندوق الإسعافات؟». كيف ننقل هذه الأوامر والأسئلة في تقرير إخباري بلغة إنجليزية سليمة؟',
			svg: svgEnglishGrammarMap({
				title: 'Reporting Orders, Requests & Questions',
				rootLabel: 'Direct Command / Question',
				rootSub: 'No quotation marks and NO question mark in reported form',
				branches: [
					{ label: 'Order / Request', rule: 'ordered / asked + obj + (not) to + stem', example: 'He told us not to panic.' },
					{ label: 'Yes/No Question', rule: 'asked + if/whether + S + V', example: 'He asked if we were safe.' },
					{ label: 'Wh-Question', rule: 'asked + Wh-word + S + V', example: 'He asked where the kit was.' }
				]
			}),
			steps: [
				{
					promptAr: 'كيف ننقل الأمر المثبت «Stay calm!» والأمر المنفي «Do not use the lift!» بعد (The officer ordered the pupils...)?',
					hintAr: 'نستبدل الأمر المثبت بـ (to + stem) والمنفي بـ (not to + stem) ونحذف Do.',
					expectedInput: 'to stay calm / not to use the lift',
					revealAr:
						'الأمر المثبت يصبح: The officer ordered the pupils to stay calm. والأمر المنفي يصبح: He warned them not to use the lift (بحذف Do).'
				},
				{
					promptAr: 'عند نقل السؤال «Are you safe?» بعد (He asked us...)، ماذا نضيف وما ترتيب الكلمات؟',
					hintAr: 'سؤال نعم/لا يحتاج رابطاً شرطياً (if / whether) ثم الفاعل قبل الفعل!',
					expectedInput: 'He asked us if we were safe.',
					revealAr:
						'نضيف (if) أو (whether)، ثم نضع الفاعل قبل الفعل (we were وليس were we)، ونضع نقطة في النهاية بدل علامة الاستفهام.'
				},
				{
					promptAr: 'ماذا نفعل بالفعل المساعد (did) في السؤال «Where did the flood hit?» عند نقله؟',
					hintAr: 'تذكر أن الجملة المنقولة تصبح جملة خبرية لا تحتاج إلى (do/does/did) للاستفهام.',
					expectedInput: 'نحذف did ونحول الفعل hit إلى الماضي التام had hit',
					revealAr:
						'نحذف (did) تماما، ونرجع بالزمن من الماضي البسيط إلى الماضي التام: He asked where the flood had hit.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأوامر والطلبات المثبتة (Positive Orders/Requests): Subject + ordered / told / asked / advised + Object + to + stem. مثال: "Please help the elderly." تصبح: He asked us to help the elderly.',
				'الأوامر والتحذيرات المنفية (Negative Orders): Subject + warned / told / ordered + Object + not to + stem (نحذف Don\'t / Do not). مثال: "Don\'t drive through flooded roads!" تصبح: Police warned drivers not to drive through flooded roads.',
				'أسئلة نعم/لا (Yes/No Questions): Subject + asked / wanted to know + if / whether + Subject + Verb (تراجع الزمن + نقطة في النهاية).',
				'أسئلة الاستفهام (Wh-Questions): Subject + asked + Wh-word (where, when, why, how...) + Subject + Verb (نحذف do/does/did، ونرتب الفاعل قبل الفعل دون علامة استفهام).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '4 Rules for Reported Questions (Zero Mistakes)',
				steps: [
					{ stage: 'Use Linker', detail: 'Keep Wh-word OR add "if / whether" for Yes/No' },
					{ stage: 'Drop Do/Did', detail: 'Remove auxiliary do, does, did in positive reported questions' },
					{ stage: 'Statement Order', detail: 'Always put Subject BEFORE Verb (where he lived, NOT where did he live)' },
					{ stage: 'Shift & Dot', detail: 'Apply Tense Backshift and end with a full stop (.)' }
				]
			}),
			visualCaptionAr: 'الخطوات الأربع الحاسمة لتحويل الأسئلة المباشرة إلى كلام منقول بلا أخطاء',
			examples: [
				{
					problemAr: 'Report: The nurse told the volunteer, "Please bring the first-aid kit."',
					solutionAr: 'The nurse asked the volunteer to bring the first-aid kit.'
				},
				{
					problemAr: 'Report: The journalist asked, "Did the rescue team reach the mountain village?"',
					solutionAr: 'The journalist asked if (or: whether) the rescue team had reached the mountain village.'
				},
				{
					problemAr: 'Report: She asked me, "How many families need shelter?"',
					solutionAr: 'She asked me how many families needed shelter.'
				}
			],
			watchOutAr:
				'احذر أكبر خطأين في أسئلة الامتحان: (1) إبقاء ترتيب السؤال بعد asked مثل (He asked where WAS the shelter?) — الصحيح (where the shelter WAS.)! (2) كتابة (to not) بدل (not to) في الأمر المنفي — الصحيح دائما (not to + stem)!'
		},
		practice: [
			{
				questionAr: 'Report the warning: The firefighter shouted, "Do not enter the damaged building!"',
				options: [
					'The firefighter warned us to not enter the damaged building.',
					'The firefighter warned us not to enter the damaged building.',
					'The firefighter warned us do not enter the damaged building.',
					'The firefighter warned us not entering the damaged building.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترتيب الصحيح هو not to وليس to not.',
					'صحيح! الأمر المنفي يُنقل بصيغة: warned + obj + not to + stem.',
					'يجب حذف do واستعمال not to.',
					'نستعمل المصدر بعد not to وليس -ing.'
				],
				explanationAr: 'في نقل الأمر المنفي نحذف Do not ونضع not to + stem.'
			},
			{
				questionAr: 'Report the Yes/No question: The coordinator asked, "Have you collected enough blankets?"',
				options: [
					'The coordinator asked if had we collected enough blankets.',
					'The coordinator asked if we had collected enough blankets.',
					'The coordinator asked that we had collected enough blankets.',
					'The coordinator asked if we have collected enough blankets?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ترتيب الفعل قبل الفاعل خطأ في الكلام المنقول.',
					'ممتاز! if + الفاعل (we) + الماضي التام (had collected) مع نقطة.',
					'لا نستعمل that مع الأسئلة بل if / whether.',
					'لم يتراجع الزمن وبقيت علامة الاستفهام.'
				],
				explanationAr: 'سؤال نعم/لا يُنقل بـ if/whether + الفاعل + الفعل متراجعا في الزمن دون علامة استفهام.'
			},
			{
				questionAr: 'Report the Wh-question: A reporter asked the mayor, "When will the relief convoy arrive?"',
				options: [
					'A reporter asked the mayor when would the relief convoy arrive.',
					'A reporter asked the mayor when the relief convoy would arrive.',
					'A reporter asked the mayor when the relief convoy will arrive?',
					'A reporter asked the mayor if when the relief convoy would arrive.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب وضع الفاعل قبل would في الجملة المنقولة.',
					'صحيح! Wh-word + الفاعل + would arrive دون علامة استفهام.',
					'لم تتحول will إلى would وبقيت علامة الاستفهام.',
					'لا نجمع if مع أداة الاستفهام when أبدا.'
				],
				explanationAr: 'في Wh-questions نحتفظ بأداة الاستفهام ثم نضع الفاعل قبل الفعل المساعد المتحول (would).'
			},
			{
				questionAr: 'Report the Wh-question with "did": She asked, "Where did the volunteers set up the camp?"',
				options: [
					'She asked where did the volunteers set up the camp.',
					'She asked where the volunteers had set up the camp.',
					'She asked where the volunteers did set up the camp.',
					'She asked if the volunteers had set up the camp.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نُبقي did في السؤال المنقول المثبت.',
					'أحسنت! حذفنا did وحولنا الماضي البسيط إلى الماضي التام (had set up).',
					'يجب حذف did عند التحويل.',
					'حذفت أداة الاستفهام where وغيرت معنى السؤال.'
				],
				explanationAr: 'عند وجود did في السؤال المباشر نحذفها ونحول الفعل الرئيسي إلى الماضي التام (had + PP).'
			},
			{
				questionAr: 'Report the polite request: The teacher said to the students, "Please donate clean winter clothes."',
				options: [
					'The teacher asked the students to donate clean winter clothes.',
					'The teacher asked the students that donate clean winter clothes.',
					'The teacher asked the students donating clean winter clothes.',
					'The teacher asked the students please donate clean winter clothes.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الطلب المهذب (Please + stem) يتحول إلى asked + obj + to + stem.',
					'لا نستعمل that مع الطلب بصيغة الأمر.',
					'لا نستعمل -ing بعد asked + obj.',
					'نحذف please ونستخدم to + stem.'
				],
				explanationAr: 'الطلب المهذب الذي يحتوي على please يُنقل بفعل asked + المخاطَب + to + stem.'
			}
		]
	},

	// [3] Expressing Concession (though, although, even though, in spite of, despite)
	{
		id: 'eng_lesson_2as_sci_t3_concession_connectors',
		slug: 'eng-2as-sci-t3-concession-connectors',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: No Man is an Island — الكوارث الطبيعية والتضامن والعمل الخيري',
		order: 3,
		titleAr: 'التعبير عن الاستدراك والتقابل (though / although / in spite of / despite)',
		objectives: [
			'التعبير الدقيق عن الاستدراك (Concession) بين فكرتين متقابلتين غير متوقعتين',
			'التمييز البنيوي بين روابط الجملة الكاملة (although / though / even though) وروابط العبارة الاسمية (despite / in spite of)',
			'إعادة صياغة الجمل بالتحويل السليم بين although و despite / in spite of في الاختبار'
		],
		keywordsAr: ['Concession', 'although', 'though', 'even though', 'despite', 'in spite of', 'the fact that'],
		discover: {
			scenarioAr:
				'خلال حملة إغاثة شتوية نقرأ الجملتين: «رغم أن الثلج كان كثيفاً، وصل المتطوعون إلى القرية (Although the snow was heavy, volunteers reached the village)» و«رغم الثلج الكثيف، وصل المتطوعون (Despite the heavy snow, volunteers reached the village)». لاحظ كيف حافظنا على المعنى مع تغيير البنية النحوية!',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Concession (Contrast)',
				rootLabel: 'Unexpected Contrast',
				rootSub: 'Choose connector by grammar structure',
				branches: [
					{ label: '+ Clause (S + V)', rule: 'although / though / even though', example: 'Although it rained, they helped.' },
					{ label: '+ Noun / V-ing', rule: 'despite / in spite of', example: 'Despite the rain, they helped.' },
					{ label: '+ the fact that', rule: 'despite / in spite of the fact that', example: 'Despite the fact that it rained...' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق بين ما جاء بعد (Although) وما جاء بعد (Despite) في جملتي الثلج الكثيف؟',
					hintAr: 'ابحث عن الفعل المصرف (was) في الجملتين.',
					expectedInput: 'بعد Although جملة كاملة (the snow was heavy)، وبعد Despite عبارة اسمية (the heavy snow)',
					revealAr:
						'تُتبع (although / though / even though) بجملة كاملة فيها فاعل وفعل، بينما تُتبع (despite / in spite of) باسم أو عبارة اسمية أو فعل ينتهي بـ (-ing).'
				},
				{
					promptAr: 'هل يصح أن نكتب في الإنجليزية: «Although the storm was strong, but they worked hard»؟',
					hintAr: 'هل يجوز الجمع بين رابطين للاستدراك (Although و but) في نفس الجملة؟',
					expectedInput: 'لا يصح أبداً! نستعمل إما Although أو but ولا نجمعهما',
					revealAr:
						'لا يجوز أبدا الجمع بين (although / though) و(but) في جملة واحدة؛ أحدهما يغني عن الآخر: Although the storm was strong, they worked hard.'
				},
				{
					promptAr: 'هل نكتب (despite of) أم (despite) وحدها؟',
					hintAr: 'قارن بين (in spite of) المكونة من ثلاث كلمات و(despite) المكونة من كلمة واحدة.',
					expectedInput: 'نكتب despite وحدها بدون of، أو in spite of مع of',
					revealAr:
						'تساوي (despite) تماما (in spite of)، ولذلك لا نضيف (of) بعد (despite) أبدا!'
				}
			]
		},
		summary: {
			rulesAr: [
				'روابط الاستدراك المتبوعة بجملة كاملة (Subject + Verb): although / though / even though. مثال: Although the quake caused damage, citizens stayed united.',
				'روابط الاستدراك المتبوعة باسم أو عبارة اسمية أو (V-ing): despite / in spite of. مثال: Despite the damage, citizens stayed united. / In spite of being tired, they kept helping.',
				'الحل الذكي للتحويل السريع في الامتحان: إذا صعب عليك تحويل الجملة إلى اسم بعد (despite / in spite of)، استعمل (the fact that + Clause)! مثال: In spite of the fact that they were tired, they kept working.',
				'ممنوعات ذهبية: (1) لا تكتب (despite of) أبدا. (2) لا تجمع بين (although) و(but) في جملة واحدة.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Rewriting Although to Despite / In Spite Of',
				steps: [
					{ stage: 'Method 1: Noun', detail: 'Although the weather was cold = Despite the cold weather' },
					{ stage: 'Method 2: Noun Form', detail: 'Although they were poor = In spite of their poverty' },
					{ stage: 'Method 3: V-ing', detail: 'Although he felt tired = Despite feeling tired (same subject)' },
					{ stage: 'Method 4: Safe Key', detail: 'Despite the fact that + original Subject + Verb' }
				]
			}),
			visualCaptionAr: 'الطرق الأربع المضمونة للتحويل بين Although و Despite / In spite of',
			examples: [
				{
					problemAr: 'Combine with "in spite of": The roads were blocked. The Red Crescent delivered medicine.',
					solutionAr: 'In spite of the blocked roads (or: In spite of the fact that the roads were blocked), the Red Crescent delivered medicine.'
				},
				{
					problemAr: 'Combine with "although": The charity had limited funds. It built a shelter for needy families.',
					solutionAr: 'Although the charity had limited funds, it built a shelter for needy families.'
				},
				{
					problemAr: 'Rewrite using "despite": Though he had little money, he donated generously.',
					solutionAr: 'Despite having little money, he donated generously.'
				}
			],
			watchOutAr:
				'انتبه لشرط استعمال (V-ing) بعد (despite / in spite of): يجب أن يكون الفاعل نفسه في الشطرين! مثلا: (Despite feeling tired, Karim helped everyone). أما إذا اختلف الفاعلان فاستعمل اسما أو (the fact that).'
		},
		practice: [
			{
				questionAr: 'Choose the correct connector: "........ the severe floods, neighbours helped each other immediately."',
				options: ['Although', 'Though', 'Despite', 'Even though'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Although تتطلب جملة كاملة (فاعل وفعل).',
					'Though تتطلب جملة كاملة (فاعل وفعل).',
					'صحيح! the severe floods عبارة اسمية (بلا فعل) فتناسبها Despite.',
					'Even though تتطلب جملة كاملة.'
				],
				explanationAr: 'العبارة the severe floods عبارة اسمية، فتُسبق بـ Despite أو In spite of.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'Despite of the heavy rain, volunteers arrived on time.',
					'Although the rain was heavy, but volunteers arrived on time.',
					'In spite of the heavy rain, volunteers arrived on time.',
					'In spite of it rained heavily, volunteers arrived on time.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نكتب of بعد despite أبدا.',
					'لا يجوز الجمع بين although و but في جملة واحدة.',
					'ممتاز! In spite of متبوعة بعبارة اسمية سليمة تماما.',
					'in spite of لا تُتبع بجملة كاملة مباشرة دون the fact that.'
				],
				explanationAr: 'الصيغة الصحيحة هي In spite of + Noun Phrase دون تكرار روابط الاستدراك.'
			},
			{
				questionAr: 'Complete correctly: "........ they had few resources, the students organized a successful charity drive."',
				options: ['Despite', 'In spite of', 'Although', 'Owing to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Despite لا تُتبع بجملة كاملة مباشرة.',
					'In spite of لا تُتبع بجملة كاملة مباشرة.',
					'أحسنت! they had few resources جملة كاملة متقابلة المعنى مع النجاح، فنستعمل Although.',
					'Owing to للسبب وبعبارة اسمية، والمعنى هنا استدراك.'
				],
				explanationAr: 'لوجود فاعل وفعل (they had) وعلاقة تقابل غير متوقع نستعمل Although / Though / Even though.'
			},
			{
				questionAr: 'Rewrite using "despite": "Although she was exhausted, the nurse continued treating patients."',
				options: [
					'Despite being exhausted, the nurse continued treating patients.',
					'Despite she was exhausted, the nurse continued treating patients.',
					'Despite of being exhausted, the nurse continued treating patients.',
					'Despite was exhausted, the nurse continued treating patients.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفاعل واحد في الشطرين فنحول was إلى being بعد Despite.',
					'Despite لا تتبع بجملة كاملة مباشرة.',
					'لا نضع of بعد Despite.',
					'لا نضع فعلا مصرفا (was) بعد Despite.'
				],
				explanationAr: 'يمكن اتباع Despite بصيغة V-ing (being exhausted) عندما يتطابق الفاعل في الشطرين.'
			},
			{
				questionAr: 'Complete with the safe phrase: "In spite of ........ the night was freezing, rescue teams kept searching."',
				options: ['of', 'the fact that', 'but', 'because'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكرر of مرتين.',
					'إجابة دقيقة! in spite of the fact that تسمح بوضع جملة كاملة (the night was freezing) بعدها.',
					'but لا تُستعمل هنا.',
					'because للسبب ولا تأتي بعد in spite of.'
				],
				explanationAr: 'عبارة the fact that تسمح بإدخال جملة كاملة (Subject + Verb) بعد despite أو in spite of.'
			}
		]
	},

	// [4] Final -ed Pronunciation (/t/, /d/, /id/) & Silent Letters
	{
		id: 'eng_lesson_2as_sci_t3_final_ed_silent_letters',
		slug: 'eng-2as-sci-t3-final-ed-silent-letters',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: No Man is an Island — الكوارث الطبيعية والتضامن والعمل الخيري',
		order: 4,
		titleAr: 'نطق النهاية (-ed) والحروف الصامتة (Final -ed & Silent Letters)',
		objectives: [
			'تصنيف الأفعال المنتظمة المنتهية بـ (-ed) بدقة في جدول الأصوات (/t/, /d/, /id/)',
			'اكتشاف الحروف الصامتة (Silent Letters) في الكلمات الإنجليزية المتداولة في نصوص 2AS',
			'تجنب الأخطاء الإملائية والصوتية الشائعة في سؤال Phonology (1 pt)'
		],
		keywordsAr: ['Final -ed', '/t/', '/d/', '/id/', 'Silent Letters', 'Phonology'],
		discover: {
			scenarioAr:
				'في نص حول التضامن وردت الكلمات: (helped, saved, donated, island, honest, listen, know). تأمل نطق النهاية (-ed) في الأفعال الثلاثة الأولى، ثم لاحظ الحروف المكتوبة التي لا تُنطق في الكلمات الأربع الأخيرة (s في island، و h في honest، و t في listen، و k في know)!',
			svg: svgEnglishPhoneticsChart({
				title: 'Final -ed Pronunciation Rules',
				subtitle: 'Check the LAST SOUND of the base verb before adding -ed',
				columns: [
					{ sound: '/t/', rule: 'After p, k, f, s, sh, ch', examples: 'helped, worked, washed' },
					{ sound: '/d/', rule: 'After voiced & vowels', examples: 'saved, shared, rescued' },
					{ sound: '/id/', rule: 'ONLY after /t/ or /d/', examples: 'donated, needed, flooded' }
				]
			}),
			steps: [
				{
					promptAr: 'متى تُنطق النهاية (-ed) كمقطع صوتي واضح (/id/)؟',
					hintAr: 'انظر إلى الحرف الأخير في الفعل الأصلي (donate / need / flood / protect).',
					expectedInput: 'فقط عندما ينتهي الفعل الأصلي بالصوت /t/ أو /d/',
					revealAr:
						'أسهل قاعدة في الصوتيات: يُنطق (-ed) بصوت (/id/) حصراً إذا انتهى الفعل الأصلي بالصوت (/t/) أو (/d/) مثل: needed, donated, protected, flooded.'
				},
				{
					promptAr: 'ما الصوت الذي تنتهي به أفعال مثل (helped, checked, laughed, watched)؟',
					hintAr: 'ضع يدك على حنجرتك عند نطق p, k, f, ch: هل تهتز الحبال الصوتية؟',
					expectedInput: 'أصوات مهموسة (voiceless) لذلك تُنطق النهاية /t/',
					revealAr:
						'الأصوات المهموسة (p, k, f, s, sh, ch) لا تُحدث اهتزازا في الحنجرة، فتُنطق (-ed) بعدها بصوت (/t/). لاحظ أن (gh) في laughed تُنطق /f/ فتنتمي إلى /t/!'
				},
				{
					promptAr: 'ما الحرف الصامت في عنوان الوحدة نفسها: «No Man is an Island»؟',
					hintAr: 'كيف ننطق كلمة (island)؟ هل ننطق حرف s؟',
					expectedInput: 'حرف (s) في كلمة island صامت لا يُنطق',
					revealAr:
						'في كلمة (island) حرف (s) صامت تماما وتُنطق /ai-land/. وكذلك (h) في honest / hour، و(k) في know / knee، و(w) في write / wrap، و(b) في climb / thumb، و(t) في listen / castle، و(l) في calm / walk.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النهاية (-ed) بصوت /id/: فقط بعد الصوتين (/t/) و(/d/) مثل: donated, protected, needed, flooded, united, assisted.',
				'النهاية (-ed) بصوت /t/: بعد الأصوات المهموسة (p, k, f, gh=/f/, s, sh, ch, x) مثل: helped, worked, thanked, laughed, rushed, reached, fixed.',
				'النهاية (-ed) بصوت /d/: بعد جميع الأصوات المجهورة الأخرى (b, g, l, m, n, r, v, z) والأصوات المتحركة مثل: saved, shared, called, cleaned, rescued, survived.',
				'أشهر الحروف الصامتة (Silent Letters) في الامتحانات: k قبل n (know, knife)، w قبل r (write, wrong)، b بعد m أو قبل t (climb, doubt)، h في (honest, hour, honour)، t في (listen, often, castle)، l في (calm, half, should, could)، s في (island)، gh في (night, light, drought).'
			],
			visualSvg: svgEnglishWordFormation({
				title: 'Common Silent Letters in 2AS Exams',
				prefix: 'Silent k / w / h',
				root: 'know | write | honest | island',
				suffix: 'Silent t / b / l',
				derivedWord: 'listen | climb | calm | should',
				meaningNote: 'Silent letters are written in spelling but NEVER pronounced aloud'
			}),
			visualCaptionAr: 'أبرز الحروف الصامتة المتكررة في اختبارات اللغة الإنجليزية للسنة الثانية ثانوي',
			examples: [
				{
					problemAr: 'Classify according to final -ed: rescued, donated, helped, survived, flooded, reached.',
					solutionAr: '/t/: helped, reached | /d/: rescued, survived | /id/: donated, flooded.'
				},
				{
					problemAr: 'Identify the silent letter in each word: (1) island, (2) honest, (3) listen, (4) calm, (5) knowledge.',
					solutionAr: '(1) s | (2) h | (3) t | (4) l | (5) k (and d before g).'
				}
			],
			watchOutAr:
				'احذر من النظر إلى الحرف المكتوب بدل الصوت المنطوق! في كلمة (laughed) آخر صوت في laugh هو (/f/) فتُصنّف في (/t/)، وفي كلمة (used) آخر صوت في use هو (/z/) فتُصنّف في (/d/)، وفي كلمة (decided) آخر صوت في decide هو (/d/) لأن e صامتة فتُصنّف في (/id/)!'
		},
		practice: [
			{
				questionAr: 'How is the final "-ed" pronounced in the verb "donated"?',
				options: ['/t/', '/d/', '/id/', '/s/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الفعل الأصلي donate ينتهي بالصوت /t/ فيأخذ /id/.',
					'لا يأخذ /d/ لأن آخر صوت هو /t/.',
					'صحيح! الأفعال المنتهية بالصوت /t/ أو /d/ تأخذ /id/ مثل donated.',
					'/s/ خاص بنهاية الجمع لا الماضي.'
				],
				explanationAr: 'الفعل donate ينتهي بالصوت /t/ (حرف e صامت)، فتُنطق النهاية -ed بصوت /id/.'
			},
			{
				questionAr: 'Which verb has its final "-ed" pronounced /t/?',
				options: ['saved', 'helped', 'needed', 'shared'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينتهي بصوت v المجهور فهو /d/.',
					'أحسنت! help ينتهي بالصوت المهموس /p/ فتُنطق النهاية /t/.',
					'ينتهي بصوت d فهو /id/.',
					'ينتهي بصوت r/vowel المجهور فهو /d/.'
				],
				explanationAr: 'بعد الصوت المهموس /p/ في help تُنطق النهاية (-ed) بصوت /t/.'
			},
			{
				questionAr: 'Which verb has its final "-ed" pronounced /d/?',
				options: ['worked', 'flooded', 'rescued', 'watched'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ينتهي بصوت k المهموس فهو /t/.',
					'ينتهي بصوت d فهو /id/.',
					'ممتاز! rescue ينتهي بصوت متحرك مجهور فتُنطق النهاية /d/.',
					'ينتهي بصوت ch المهموس فهو /t/.'
				],
				explanationAr: 'الأفعال المنتهية بأصوات متحركة أو مجهورة مثل rescue تأخذ الصوت /d/.'
			},
			{
				questionAr: 'Identify the silent letter in the word "island":',
				options: ['i', 's', 'l', 'd'],
				correctIndex: 1,
				diagnosticFeedback: [
					'حرف i منطوق بوضوح.',
					'صحيح! حرف s في island صامت تماما.',
					'حرف l منطوق بوضوح.',
					'حرف d منطوق في النهاية.'
				],
				explanationAr: 'تُكتب island بحرف s صامت وتُنطق /ai-land/.'
			},
			{
				questionAr: 'In which word is the letter "h" SILENT?',
				options: ['help', 'house', 'honest', 'heart'],
				correctIndex: 2,
				diagnosticFeedback: [
					'حرف h منطوق في help.',
					'حرف h منطوق في house.',
					'صحيح! حرف h صامت في honest (وكذلك hour و honour).',
					'حرف h منطوق في heart.'
				],
				explanationAr: 'حرف h صامت في بداية كلمات محددة أشهرها: honest, hour, honour, heir.'
			}
		]
	},

	// [5] Writing a Disaster Relief Report / Solidarity Article (5 pts)
	{
		id: 'eng_lesson_2as_sci_t3_solidarity_report_writing',
		slug: 'eng-2as-sci-t3-solidarity-report-writing',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: No Man is an Island — الكوارث الطبيعية والتضامن والعمل الخيري',
		order: 5,
		titleAr: 'كتابة تقرير حول كارثة طبيعية أو مقال تضامني (Writing a Report / Solidarity Article)',
		objectives: [
			'بناء تقرير إخباري أو مقال تضامني منظم من 4 أجزاء (العنوان، التمهيد، أحداث الإغاثة، الخاتمة)',
			'توظيف مكتسبات الوحدة الرابعة: الكلام المنقول (Reported Speech) والاستدراك (Although / Despite) والمبني للمجهول',
			'استثمار القيم الإسلامية والجزائرية الأصيلة في التضامن (مثل تقليد التويزة والهلال الأحمر الجزائري)'
		],
		keywordsAr: ['Report', 'Solidarity Article', 'Charity', 'Disaster Relief', 'Touiza', 'Written Expression'],
		discover: {
			scenarioAr:
				'بعد فيضانات أو حرائق غابات، طُلب منك كتابة مقال قصير لمجلة الثانوية (Solidarity Article) أو تقرير عن حملة تضامنية نظّمها التلاميذ مع الهلال الأحمر الجزائري. كيف تحوّل الملاحظات البسيطة إلى نص مؤثر ومتماسك ينال 5/5؟',
			svg: svgEnglishWritingStructure({
				title: 'Disaster Report / Solidarity Article Blueprint (5 pts)',
				steps: [
					{ stage: 'Headline', detail: 'Short, clear title (e.g. Algerian Youth Unite After Floods)' },
					{ stage: 'Lead (What/When)', detail: 'State the event, place, and date clearly in Past Simple' },
					{ stage: 'Relief Actions', detail: 'Describe charity steps using Passive, Reported Speech & Concession' },
					{ stage: 'Moral / Call', detail: 'End with a message of unity, charity, and readiness' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الأسئلة الأربعة التي تجيب عنها الفقرة التمهيدية (Lead) في تقرير حول كارثة أو حملة خيرية؟',
					hintAr: 'تذكر قاعدة الصحافة البسيطة: ماذا حدث؟ متى؟ أين؟ ومن تضرر أو بادر؟',
					expectedInput: 'ماذا حدث (What) ومتى (When) وأين (Where) ومن شارك (Who)',
					revealAr:
						'تبدأ الفقرة الأولى بإجابة واضحة وموجزة على (What, When, Where, Who): مثال: Last week, heavy floods hit a rural district, and local youth immediately launched a solidarity campaign.'
				},
				{
					promptAr: 'كيف نوظف الكلام المنقول (Reported Speech) والاستدراك (Although / Despite) لرفع جودة المقال؟',
					hintAr: 'انقل تصريحا لأحد المتطوعين، واذكر الصعوبة التي تغلبوا عليها.',
					expectedInput: 'بنقل شهادة متطوع (The leader said that...) وبيان التغلب على الصعاب (Despite the cold...)',
					revealAr:
						'توظيف جملة واحدة بالكلام المنقول (The coordinator declared that every family had received aid) وجملة استدراك (Despite the difficult roads, volunteers arrived on time) يثري المقال لغويا ويرفع علامته.'
				},
				{
					promptAr: 'ما الزمن الغالب في كتابة تقرير عن حملة تضامنية وقعت الأسبوع الماضي؟',
					hintAr: 'الحدث وقع وانتهى في الماضي.',
					expectedInput: 'الماضي البسيط (Past Simple) مع المبني للمجهول في الماضي عند الحاجة',
					revealAr:
						'الزمن الأساسي هو الماضي البسيط (helped, donated, organized, were distributed)، وفي الخاتمة ننتقل إلى الحاضر أو النصيحة (Solidarity remains our greatest strength / We must always help the needy).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الهيكل النموذجي لتقرير أو مقال تضامني (80 إلى 120 كلمة): (1) عنوان جذاب وموجز (Headline)، (2) مقدمة تجيب عن What / When / Where، (3) عرض يصف جهود الإغاثة والعمل الخيري مع تصريح منقول ورابط استدراك، (4) خاتمة تؤكد قيمة التضامن والتكافل.',
				'مفردات مفتاحية مساعدة: natural disaster, earthquake, floods, wildfires, rescue teams, volunteers, shelter, blankets, first-aid kits, donate, charity, mutual aid (Touiza), Algerian Red Crescent.',
				'جمل جاهزة قابلة للتكييف: (1) Despite the harsh conditions, Algerian citizens showed remarkable solidarity. (2) Food parcels and warm blankets were distributed to affected families. (3) The team leader stated that unity and mercy helped people overcome the crisis.',
				'معايير تقييم التعبير الكتابي (5 pts): الملاءمة للموضوع (Relevance)، الترابط والانسجام (Coherence)، سلامة القواعد والمفردات (Accuracy)، والترقيم والعرض النظيف (Mechanics).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Key Language for a 5/5 Solidarity Report',
				rootLabel: 'Solidarity Writing Toolkit',
				rootSub: 'Combine 3 grammar tools from Unit 4',
				branches: [
					{ label: 'Past & Passive', rule: 'was/were + PP', example: 'Aid was distributed.' },
					{ label: 'Reported Quote', rule: 'said / stated that...', example: 'He said aid had arrived.' },
					{ label: 'Concession', rule: 'Despite / Although', example: 'Despite the rain, they came.' },
					{ label: 'Moral Ending', rule: 'Present / Modals', example: 'We must stay united.' }
				]
			}),
			visualCaptionAr: 'التراكيب النحوية والأسلوبية التي تمنح مقالك التضامني تميزا في الامتحان',
			examples: [
				{
					problemAr: 'Write a short opening (Headline + 2 sentences) for a report about a school charity drive for needy families.',
					solutionAr: 'Headline: Secondary Pupils Unite to Support Needy Families. Last Thursday, students at our high school organized a charity campaign before winter. More than one hundred food boxes and warm coats were collected within three days.'
				},
				{
					problemAr: 'Add a closing sentence emphasizing the Algerian value of mutual aid (Touiza).',
					solutionAr: 'This noble initiative proved once again that the Algerian spirit of Touiza and brotherhood can turn any hardship into hope.'
				}
			],
			watchOutAr:
				'لا تخلط بين الأزمنة عشوائيا داخل التقرير نفسه (لا تنتقل من الماضي إلى الحاضر في سرد نفس الحدث الماضي)، ولا تنسَ كتابة عنوان (Headline) في أعلى التقرير أو المقال الصحفي!'
		},
		practice: [
			{
				questionAr: 'What should a good newspaper report or solidarity article ALWAYS start with?',
				options: [
					'A list of grammar rules',
					'A clear, concise headline followed by a lead paragraph (What, When, Where)',
					'A signature like "Yours faithfully"',
					'Random bullet points without verbs'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المقال الإخباري لا يبدأ بقواعد نحوية.',
					'صحيح! العنوان الموجز والفقرة التمهيدية الواضحة هما أساس التقرير والمقال.',
					'هذه خاتمة رسالة رسمية وليست بداية مقال.',
					'يجب تحويل الملاحظات إلى جمل كاملة مترابطة.'
				],
				explanationAr: 'التقرير الصحفي أو المقال التضامني يبدأ دائما بعنوان (Headline) ثم فقرة تمهيدية تحدد الحدث والزمان والمكان.'
			},
			{
				questionAr: 'Which sentence best combines solidarity vocabulary with Reported Speech?',
				options: [
					'The volunteer said that all affected families had received food and blankets.',
					'The volunteer say that food is eat yesterday.',
					'Volunteers did not know what is charity.',
					'He told that we will went to the village.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! جملة متقنة تجمع بين الكلام المنقول ومفردات الإغاثة بسلامة تامة.',
					'تحتوي على أخطاء نحوية فادحة.',
					'فكرة سلبية وتركيب سؤالي خاطئ.',
					'تحتوي على أخطاء في told و will went.'
				],
				explanationAr: 'استعمال said that + Past Perfect مع مفردات الإغاثة يرفع جودة التقرير.'
			},
			{
				questionAr: 'Which sentence correctly uses Concession in a disaster relief report?',
				options: [
					'Despite the blocked roads, rescue teams reached the isolated village on foot.',
					'Despite of the blocked roads, rescue teams reached the village.',
					'Although the blocked roads, rescue teams reached the village.',
					'Although the roads were blocked, but rescue teams reached the village.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! Despite متبوعة بعبارة اسمية سليمة (the blocked roads).',
					'لا نكتب of بعد despite.',
					'Although تتطلب جملة كاملة بفعل.',
					'لا نجمع بين although و but.'
				],
				explanationAr: 'تُتبع Despite بعبارة اسمية (the blocked roads) لإبراز التغلب على الصعوبات.'
			},
			{
				questionAr: 'Which traditional Algerian value directly embodies "No Man is an Island"?',
				options: [
					'Touiza (community mutual aid and voluntary cooperation)',
					'Isolation and ignoring neighbours',
					'Wasting natural resources',
					'Avoiding charity work'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! التويزة تقليد جزائري أصيل يجسد التكافل والتعاون التطوعي وقت الشدة والرخاء.',
					'العزلة عكس معنى العنوان تماما.',
					'تبذير الموارد لا علاقة له بالتضامن.',
					'تجنب العمل الخيري يتناقض مع موضوع الوحدة.'
				],
				explanationAr: 'التويزة (Touiza) قيمة جزائرية وإسلامية عريقة في التعاون والتآزر المجتمعي.'
			},
			{
				questionAr: 'Before submitting your 5-point Written Expression, what is the best final check?',
				options: [
					'Write Topic Two as well just in case',
					'Review tense consistency, spelling, punctuation, and word count (80-120 words)',
					'Erase all connectors to make it shorter',
					'Replace all paragraphs with one single line'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يُطلب اختيار موضوع واحد فقط (Topic One OR Topic Two).',
					'صحيح! المراجعة النهائية للأزمنة والإملاء والترقيم والحجم تضمن أعلى علامة.',
					'حذف الروابط يضعف التماسك النصي (Coherence).',
					'التنظيم الفقري الجيد ضروري للوضوح.'
				],
				explanationAr: 'المراجعة السريعة للغة والترقيم وتناسق الأزمنة تجنبك خسارة نقاط سهلة في التعبير الكتابي.'
			}
		]
	}
];
