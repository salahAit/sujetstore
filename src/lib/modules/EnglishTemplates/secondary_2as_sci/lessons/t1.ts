import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_SCI_T1: EnglishInteractiveLessonData[] = [
	// [1] Expressing Ability & Possibility (can / could / was able to / will be able to)
	{
		id: 'eng_lesson_2as_sci_t1_ability_possibility',
		slug: 'eng-2as-sci-t1-ability-possibility',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Make Peace — صنع السلام وحل النزاعات',
		order: 1,
		titleAr: 'التعبير عن القدرة والإمكانية (can / could / was able to / will be able to)',
		objectives: [
			'التمييز الدقيق بين التعبير عن القدرة في الحاضر والماضي والمستقبل',
			'التفريق بين القدرة العامة في الماضي (could) والإنجاز الخاص في موقف محدد (was/were able to)',
			'توظيف صيغ القدرة والإمكانية في سياق حل النزاعات وبناء السلام'
		],
		keywordsAr: ['Ability', 'Possibility', 'can', 'could', 'was able to', 'will be able to', 'managed to'],
		discover: {
			scenarioAr:
				'في نادٍ مدرسي للوساطة، قال المشرف: «اليوم يمكننا (can) حل الخلافات بالحوار؛ في العام الماضي استطعنا (were able to) إنهاء نزاع صعب في حصة واحدة، وفي المستقبل سنتمكن (will be able to) من نشر ثقافة السلم في كل الثانوية». تأمل كيف تغيّرت أداة القدرة حسب الزمن.',
			svg: svgEnglishTenseTimeline({
				title: 'Expressing Ability Across Time',
				tenseName: 'Past / Present / Future',
				formula: 'could / was able to  |  can  |  will be able to',
				activeZone: 'past_to_present',
				example: 'We were able to solve the conflict, and we will be able to keep peace.',
				markers: 'yesterday, last year / today, now / tomorrow, in the future'
			}),
			steps: [
				{
					promptAr: 'لماذا استعملنا (can) للحديث عن اليوم، ولم نستعملها مع عبارة (in the future)؟',
					hintAr: 'لاحظ أن (can) فعل ناقص لا يُسبق بـ (will) في اللغة الإنجليزية.',
					expectedInput: 'لأن can للحاضر، وللمستقبل نستعمل will be able to',
					revealAr:
						'الفعل الناقص (can) يعبر عن القدرة في الحاضر فقط، ولا يصح قول (will can) أبدا؛ بل نستعمل للمستقبل (will be able to + stem).'
				},
				{
					promptAr: 'ما الفرق بين: «He could speak two languages» و«He was able to stop the fight yesterday»؟',
					hintAr: 'أي الجملتين تصف قدرة عامة دائمة في الماضي، وأيهما تصف نجاحا في موقف واحد محدد؟',
					expectedInput: 'could للقدرة العامة و was able to لموقف محدد في الماضي',
					revealAr:
						'نستعمل (could) للقدرة العامة في الماضي، أما النجاح في فعل محدد وقع مرة واحدة فنستعمل فيه (was/were able to) أو (managed to).'
				},
				{
					promptAr: 'ما الصيغة التي تلي جميع هذه الأدوات (can / could / be able to)؟',
					hintAr: 'انظر إلى الفعل (solve) و(keep) بعد الأداة.',
					expectedInput: 'الفعل في المصدر المجرد (stem / infinitive without to)',
					revealAr:
						'يأتي بعدها دائما الفعل في المصدر المجرد (Base form / Stem) دون (to) زائدة ودون تصريف: can solve, will be able to build.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القدرة أو الإمكانية في الحاضر: نستعمل (can / cannot + stem) أو (am/is/are able to + stem). مثال: Dialogue can resolve conflicts.',
				'القدرة العامة في الماضي: نستعمل (could + stem). أما القدرة في موقف خاص محدد (الإنجاز الفعلي): فنستعمل (was/were able to + stem) أو (managed to + stem).',
				'في النفي الماضي يمكن استعمال (couldn\'t) أو (wasn\'t/weren\'t able to) لكلتا الحالتين دون فرق.',
				'القدرة في المستقبل: نستعمل (will be able to + stem) أو في النفي (won\'t be able to + stem)، ويُمنع تماما استعمال (will can).',
				'بعد الأفعال الناقصة الأخرى أو في المضارع التام نستعمل (be able to): مثال: They have been able to reach an agreement.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Ability & Possibility Modals',
				rootLabel: 'Expressing Ability',
				rootSub: 'Choose form by tense & context',
				branches: [
					{ label: 'Present', rule: 'can + stem', example: 'Peace can grow.' },
					{ label: 'Past General', rule: 'could + stem', example: 'He could mediate.' },
					{ label: 'Past Specific', rule: 'was/were able to', example: 'We were able to agree.' },
					{ label: 'Future', rule: 'will be able to', example: 'We will be able to win.' }
				]
			}),
			visualCaptionAr: 'خريطة اختيار أداة القدرة المناسبة حسب الزمن وسياق الجملة',
			examples: [
				{
					problemAr: 'Rewrite using the correct form of ability: Next year, our school (can) organize a peace forum.',
					solutionAr: 'Next year, our school will be able to organize a peace forum. (لوجود دلالة مستقبلية Next year).'
				},
				{
					problemAr: 'Choose the best form: Despite the tension yesterday, the two mediators (could / were able to) calm both sides.',
					solutionAr: 'were able to (أو managed to) لأن الحديث عن نجاح فعلي في موقف واحد محدد بالأمس.'
				},
				{
					problemAr: 'Complete in Present Perfect: Since 2020, volunteers (be able to) help thousands of pupils.',
					solutionAr: 'have been able to help (لوجود Since الدالة على المضارع التام).'
				}
			],
			watchOutAr:
				'احذر الخطأين الشائعين في الامتحان: لا تكتب أبدا (will can) للمستقبل بل (will be able to)، ولا تستعمل (could) في الإثبات للتعبير عن نجاح في حدث واحد محدد في الماضي بل استعمل (was/were able to) أو (managed to).'
		},
		practice: [
			{
				questionAr: 'Choose the correct option: In the near future, nations ........ settle disputes peacefully.',
				options: ['will can', 'will be able to', 'could to', 'are able'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجوز جمع will مع can أبدا في الإنجليزية.',
					'إجابة صحيحة! للمستقبل نستعمل will be able to متبوعة بالمصدر.',
					'could للماضي ولا تتبعها to.',
					'ينقصها to ولا تعبر صراحة عن المستقبل هنا.'
				],
				explanationAr: 'للتعبير عن القدرة في المستقبل نستعمل الصيغة الثابتة: will be able to + stem.'
			},
			{
				questionAr: 'Yesterday, the fire was fierce, yet the rescue team ........ save every resident.',
				options: ['can', 'will be able to', 'was able to', 'is able to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'can للحاضر، والجملة فيها yesterday.',
					'will be able to للمستقبل لا للماضي.',
					'أحسنت! was able to تعبر عن إنجاز فعلي في موقف محدد في الماضي.',
					'is able to للحاضر.'
				],
				explanationAr: 'للتعبير عن تحقيق إنجاز خاص في موقف واحد في الماضي نستعمل was/were able to أو managed to.'
			},
			{
				questionAr: 'When Karim was ten, he ........ recite long chapters of the Quran fluently.',
				options: ['could', 'will be able to', 'can', 'has been able'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! could تعبر عن قدرة عامة معتادة في الماضي.',
					'تخص المستقبل لا الطفولة.',
					'تخص الحاضر لا الماضي.',
					'تفتقد to ولا تناسب زمن When Karim was ten.'
				],
				explanationAr: 'القدرة العامة في الماضي يُعبَّر عنها بالفعل الناقص could + stem.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'Students must can respect each other.',
					'Students must be able to respect each other.',
					'Students must able to respect each other.',
					'Students will could respect each other.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يصح تتالي فعلين ناقصين (must can).',
					'إجابة دقيقة! بعد must نستخدم الصيغة البديلة be able to.',
					'ينقصها الفعل be قبل able to.',
					'لا يصح جمع will مع could.'
				],
				explanationAr: 'عند الحاجة للقدرة بعد فعل ناقص مثل must أو should نستعمل الصيغة be able to.'
			},
			{
				questionAr: 'Since last semester, the mediation club ........ reduce school conflicts significantly.',
				options: ['can', 'could', 'has been able to', 'was able'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا تناسب دلالة المضارع التام Since last semester.',
					'للماضي البسيط لا المضارع التام.',
					'ممتاز! has been able to هي صيغة القدرة في المضارع التام (Present Perfect).',
					'تنقصها to ولا توافق Since.'
				],
				explanationAr: 'مع مؤشر المضارع التام (Since) نصرّف be able to إلى has/have been able to.'
			}
		]
	},

	// [2] Obligation, Prohibition, Absence of Obligation & Advice
	{
		id: 'eng_lesson_2as_sci_t1_obligation_prohibition',
		slug: 'eng-2as-sci-t1-obligation-prohibition',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Make Peace — صنع السلام وحل النزاعات',
		order: 2,
		titleAr: 'التعبير عن الإلزام والمنع والنصيحة (must / have to / should / ought to)',
		objectives: [
			'التمييز بين الإلزام القوي (must / have to) والمنع التام (must not)',
			'التفريق الحاسم بين المنع (must not) وانعدام الإلزام (do not have to / need not)',
			'توظيف أدوات النصيحة والواجب الأخلاقي (should / ought to / had better)'
		],
		keywordsAr: ['Obligation', 'Prohibition', 'Advice', 'must', 'have to', 'must not', 'do not have to', 'should', 'ought to'],
		discover: {
			scenarioAr:
				'في قانون المؤسسة التربوية نجد ثلاث قواعد: «يجب عليك احترام زملائك (must)»، و«يُمنع عليك التنمر أو الإساءة (must not)»، و«لستَ مُجبراً على الحضور يوم الجمعة (do not have to)». لاحظ كيف ينقلب المعنى كليا بين must not وdo not have to!',
			svg: svgEnglishGrammarMap({
				title: 'Obligation, Prohibition & Advice',
				rootLabel: 'Modal Meaning',
				rootSub: 'Follow every modal with Base Verb (Stem)',
				branches: [
					{ label: 'Obligation', rule: 'must / have to', example: 'We must be fair.' },
					{ label: 'Prohibition', rule: 'must not', example: 'You must not bully.' },
					{ label: 'No Obligation', rule: 'do not have to', example: 'You need not pay.' },
					{ label: 'Advice', rule: 'should / ought to', example: 'We ought to listen.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الجوهري بين (You must not shout) و(You do not have to shout)؟',
					hintAr: 'إحداهما تعني ممنوع تماما، والأخرى تعني غير ضروري ولكن ليس ممنوعا.',
					expectedInput: 'must not للمنع و do not have to لعدم الإلزام',
					revealAr:
						'الجملة الأولى (must not) تفيد المنع والتحريم التام (Prohibition)، أما (do not have to) فتفيد غياب الإلزام فقط (Absence of obligation).'
				},
				{
					promptAr: 'كيف نعبّر عن الإلزام في الماضي إذا أردنا تحويل الجملة: «We must respect the treaty» إلى الماضي؟',
					hintAr: 'الفعل must ليس له صيغة ماضٍ للإلزام، فنستعمل ماضي have to.',
					expectedInput: 'had to (We had to respect the treaty)',
					revealAr:
						'نستعمل (had to + stem) للتعبير عن الإلزام في الماضي، ونستعمل (will have to + stem) للإلزام في المستقبل.'
				},
				{
					promptAr: 'أي أداة نستخدمها لتقديم نصيحة أخلاقية لطيفة دون إلزام قانوني صارم؟',
					hintAr: 'اختر بين must و should / ought to.',
					expectedInput: 'should أو ought to',
					revealAr:
						'نستعمل (should + stem) أو (ought to + stem) لتقديم النصيحة أو التوصية الأخلاقية، مثل: Nations should solve disputes through dialogue.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإلزام (Obligation): نستعمل (must + stem) للإلزام الداخلي أو القاعدة القوية، و(have to / has to + stem) للإلزام الخارجي المفروض بقانون أو ظرف. وفي الماضي نستعمل (had to).',
				'المنع والتحريم (Prohibition): نستعمل (must not / mustn\'t + stem)؛ وتعني أنه ممنوع القيام بالفعل.',
				'انعدام الإلزام (Absence of obligation): نستعمل (don\'t / doesn\'t have to + stem) أو (needn\'t + stem)؛ وتعني أنه غير واجب عليك الفعل ولكنك حر.',
				'النصيحة والواجب الأخلاقي (Advice): نستعمل (should / shouldn\'t + stem) أو (ought to / ought not to + stem) أو (had better + stem للتحذير اللطيف).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Obligation Across Tenses',
				tenseName: 'had to / must - have to / will have to',
				formula: 'Past: had to | Present: must, have to | Future: will have to',
				activeZone: 'present',
				example: 'Citizens had to rebuild, must unite today, and will have to guard justice.',
				markers: 'yesterday: had to | now: must / have to | tomorrow: will have to'
			}),
			visualCaptionAr: 'تصريف الإلزام عبر الأزمنة الثلاثة (الماضي والحاضر والمستقبل)',
			examples: [
				{
					problemAr: 'Rewrite using the right modal: It is strictly forbidden to discriminate against children.',
					solutionAr: 'People must not discriminate against children.'
				},
				{
					problemAr: 'Rewrite: It is not necessary for volunteers to bring their own tools.',
					solutionAr: 'Volunteers do not have to (or: need not) bring their own tools.'
				},
				{
					problemAr: 'Rewrite giving advice: It is a good idea for schools to teach conflict resolution.',
					solutionAr: 'Schools should (or: ought to) teach conflict resolution.'
				}
			],
			watchOutAr:
				'أشهر فخ في اختبارات 2AS: نفي (must) ليس (must not) إذا كان المعنى «غير ضروري»! إذا وجدت (not necessary) فالنفي هو (do not have to / need not)، وإذا وجدت (forbidden / prohibited / not allowed) فالنفي هو (must not).'
		},
		practice: [
			{
				questionAr: 'It is strictly prohibited to use violence at school. Students ........ use violence.',
				options: ['do not have to', 'must not', 'need not', 'ought to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تعني ليس ضروريا، لكن الجملة تفيد المنع الصارم (prohibited).',
					'إجابة صحيحة! must not تعبر عن المنع التام (Prohibition).',
					'تعني لا حاجة، ولا تفيد التحريم.',
					'تفيد النصيحة بالإيجاب وهو عكس المعنى.'
				],
				explanationAr: 'كلمة prohibited / forbidden تقابلها دائما أداة المنع must not.'
			},
			{
				questionAr: 'Entry to the charity lecture is free. You ........ buy a ticket.',
				options: ['must not', 'must', 'do not have to', 'had to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'must not تعني ممنوع، والمعنى هنا غير ضروري لأنه مجاني.',
					'تعني يجب، وهو عكس مجانية الدخول.',
					'ممتاز! do not have to تعبر عن انعدام الإلزام (Absence of obligation).',
					'للماضي الإلزامي.'
				],
				explanationAr: 'عندما يكون الفعل غير ضروري نستعمل do not have to أو need not.'
			},
			{
				questionAr: 'Yesterday, the committee ........ postpone the meeting due to heavy rain.',
				options: ['must', 'has to', 'had to', 'will have to'],
				correctIndex: 2,
				diagnosticFeedback: [
					'must لا تستعمل للإلزام في الماضي.',
					'has to للمضارع مع المفرد.',
					'صحيح! had to هي صيغة الإلزام في الماضي البسيط.',
					'للمستقبل لا للماضي.'
				],
				explanationAr: 'لوجود yesterday نستعمل صيغة الماضي للإلزام وهي had to.'
			},
			{
				questionAr: 'Which sentence expresses moral advice correctly?',
				options: [
					'We ought listen carefully to each other.',
					'We should to listen carefully to each other.',
					'We ought to listen carefully to each other.',
					'We musted listen carefully to each other.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ought تحتاج دائما إلى to قبل الفعل.',
					'should لا تُتبع بـ to أبدا.',
					'أحسنت! الصيغة السليمة هي ought to + stem.',
					'must فعل ناقص لا يقبل -ed.'
				],
				explanationAr: 'نكتب should + stem بدون to، أما ought فنكتبها مع to: ought to + stem.'
			},
			{
				questionAr: 'Citizens ........ respect justice if they want lasting peace in society.',
				options: ['must', 'need not', 'must not', 'did not have to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! must تعبر عن الإلزام والواجب القوي.',
					'تعني غير ضروري وهو خطأ في المعنى.',
					'تعني ممنوع وهو عكس المقصود.',
					'للماضي المنفي.'
				],
				explanationAr: 'تحقيق السلام الدائم يفرض واجب احترام العدالة، فنستعمل must.'
			}
		]
	},

	// [3] Criticizing & Regretting in the Past (should have + PP / shouldn't have + PP)
	{
		id: 'eng_lesson_2as_sci_t1_criticism_regret',
		slug: 'eng-2as-sci-t1-criticism-regret',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Make Peace — صنع السلام وحل النزاعات',
		order: 3,
		titleAr: 'العتاب والندم في الماضي (should have + PP / shouldn\'t have + PP)',
		objectives: [
			'صياغة جمل الندم والعتاب على أفعال ماضية باستعمال should have + Past Participle',
			'التمييز بين النصيحة الحاضرة (should + stem) والعتاب على الماضي (should have + PP)',
			'تحويل مواقف ندم حقيقية في الاختبار بدقة نحوية كاملة'
		],
		keywordsAr: ['Criticism', 'Regret', 'should have', 'should not have', 'ought to have', 'Past Participle'],
		discover: {
			scenarioAr:
				'تخاصم تلميذان بسبب سوء فهم، ثم قال أحدهما نادماً: «لم يكن ينبغي أن أغضب (I shouldn\'t have lost my temper)، وكان ينبغي أن أستمع إليه أولاً (I should have listened to him first)». تأمل كيف نعبّر عن الندم على شيء فات وانتهى.',
			svg: svgEnglishTenseTimeline({
				title: 'Past Regret & Criticism',
				tenseName: 'should have + Past Participle',
				formula: 'Subject + should (not) + have + Past Participle',
				activeZone: 'past',
				example: 'They should have talked calmly instead of arguing.',
				markers: 'Past mistake leads to regret or criticism in the present'
			}),
			steps: [
				{
					promptAr: 'في عبارة «They should have listened»، هل استمعوا فعلاً في الماضي أم لا؟',
					hintAr: 'تذكر أن العتاب يأتي لأن الفعل الصحيح لم يقع.',
					expectedInput: 'لا، لم يستمعوا في الماضي ونحن نعاتبهم على ذلك',
					revealAr:
						'لا؛ عبارة (should have + PP) تعني أن الفعل الصحيح لم يحدث في الماضي، ونحن نبدي الندم أو العتاب على عدم فعله.'
				},
				{
					promptAr: 'وفي عبارة «He shouldn\'t have shouted»، هل صرخ فعلاً في الماضي أم لا؟',
					hintAr: 'الندم بالنفي يكون على خطأ ارتُكب فعلاً.',
					expectedInput: 'نعم، صرخ فعلاً وكان ذلك خطأ',
					revealAr:
						'نعم؛ عبارة (shouldn\'t have + PP) تعني أن الفعل الخطأ حدث فعلاً في الماضي، وكان الأجدر تجنبه.'
				},
				{
					promptAr: 'هل يتغير الفعل (have) إلى (has) مع الفاعل المفرد مثل (He / She) بعد (should)؟',
					hintAr: 'تذكر قاعدة الأفعال الناقصة: بعدها يأتي المصدر المجرد دائماً.',
					expectedInput: 'لا، يبقى have دائماً مع جميع الضمائر',
					revealAr:
						'يبقى (have) ثابتا مع جميع الضمائر دون استثناء: He should have apologized (وليس should has!).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الصيغة المثبتة (عتاب على ترك واجب ماضٍ): Subject + should have + Past Participle (أو ought to have + PP). المعنى: كان ينبغي أن يفعل، لكنه لم يفعل.',
				'الصيغة المنفية (عتاب على ارتكاب خطأ ماضٍ): Subject + should not (shouldn\'t) have + Past Participle. المعنى: لم يكن ينبغي أن يفعل، لكنه فعل.',
				'المقارنة الحاسمة: (You should apologize) نصيحة للحاضر والمستقبل؛ أما (You should have apologized) فعتاب أو ندم على موقف مضى وانتهى.',
				'انتبه لتصريف اسم المفعول (Past Participle): الأفعال المنتظمة تأخذ (-ed) مثل listened، والشاذة تُحفظ مثل spoke (spoken) و gave (given) و wrote (written) و kept (kept).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Present Advice vs Past Regret / Criticism',
				rootLabel: 'Using SHOULD',
				rootSub: 'Match time to structure',
				branches: [
					{ label: 'Present Advice', rule: 'should + stem', example: 'You should forgive.' },
					{ label: 'Past Omission', rule: 'should have + PP', example: 'He should have helped.' },
					{ label: 'Past Mistake', rule: 'should not have + PP', example: 'They should not have lied.' }
				]
			}),
			visualCaptionAr: 'الفرق الدقيق بين النصيحة في الحاضر والعتاب أو الندم على الماضي',
			examples: [
				{
					problemAr: 'Rewrite using should have / should not have: Karim broke his promise, and now he feels sorry.',
					solutionAr: 'Karim should not have broken his promise.'
				},
				{
					problemAr: 'Rewrite: The two neighbours did not talk peacefully, so the problem grew bigger.',
					solutionAr: 'The two neighbours should have talked peacefully.'
				},
				{
					problemAr: 'Rewrite: It was a mistake to ignore the mediator\'s advice.',
					solutionAr: 'They should not have ignored the mediator\'s advice. (Or: They should have followed the mediator\'s advice.)'
				}
			],
			watchOutAr:
				'احذر من نسيان (have) أو كتابة (has) أو وضع الماضي البسيط بدل اسم المفعول (Past Participle)! نكتب (He should have spoken) وليس (He should has spoke).'
		},
		practice: [
			{
				questionAr: 'Omar was rude to his classmate yesterday. He ........ spoken politely.',
				options: ['should', 'should have', 'should has', 'should not have'],
				correctIndex: 1,
				diagnosticFeedback: [
					'should وحدها لا تأتي قبل اسم المفعول spoken.',
					'صحيح! should have + Past Participle للندم على عدم التحدث بأدب.',
					'لا نكتب has بعد should أبدا.',
					'تعكس المعنى وتجعل الحديث بأدب خطأ!'
				],
				explanationAr: 'للتعبير عن فعل إيجابي لم يقع في الماضي نستعمل should have + Past Participle.'
			},
			{
				questionAr: 'The negotiators left the table angrily. They ........ lost their patience.',
				options: ['should have', 'should not have', 'should not', 'ought to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تؤيد فقدان الصبر وهذا عكس المعنى المطلوب.',
					'إجابة دقيقة! should not have + PP لانتقاد خطأ وقع في الماضي.',
					'تنقصها have قبل lost.',
					'تُستخدم للنصيحة الحاضرة المثبتة.'
				],
				explanationAr: 'فقدان الصبر خطأ وقع في الماضي، فننتقده باستعمال should not have + PP.'
			},
			{
				questionAr: 'She ........ written an apology note as soon as she realized her mistake.',
				options: ['ought to have', 'ought have', 'should has', 'must has'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! ought to have + PP تساوي should have + PP.',
					'ينقصها to بعد ought.',
					'لا نضع has بعد should.',
					'صيغة غير صحيحة نحويا.'
				],
				explanationAr: 'الصيغة البديلة لـ should have + PP هي ought to have + PP.'
			},
			{
				questionAr: 'Which sentence expresses regret about a PAST action?',
				options: [
					'We should respect human rights.',
					'We must promote justice.',
					'We should have resolved the dispute earlier.',
					'We can build a better community.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نصيحة عامة في الحاضر.',
					'إلزام في الحاضر.',
					'ممتاز! الصيغة should have + resolved تدل على الندم بشأن الماضي.',
					'قدرة في الحاضر.'
				],
				explanationAr: 'وجود should have + Past Participle هو العلامة المميزة للندم والعتاب على الماضي.'
			},
			{
				questionAr: 'Choose the correct Past Participle: They should have ........ the peace agreement.',
				options: ['keep', 'kept', 'keeping', 'keeps'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا هو المصدر المجرد لا اسم المفعول.',
					'صحيح! اسم المفعول من الفعل keep هو kept.',
					'هذه صيغة -ing وليست اسم المفعول.',
					'هذه صيغة المضارع البسيط.'
				],
				explanationAr: 'بعد should have نضع دائما اسم المفعول (Past Participle)، ومن الفعل الشاذ keep هو kept.'
			}
		]
	},

	// [4] Word Building (Negative Prefixes) & Phonology (Final -s & Intonation)
	{
		id: 'eng_lesson_2as_sci_t1_prefixes_phonology',
		slug: 'eng-2as-sci-t1-prefixes-phonology',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Make Peace — صنع السلام وحل النزاعات',
		order: 4,
		titleAr: 'بناء الكلمات بالسوابق النافية (dis-, in-, im-, un-) ونطق النهاية (-s) والتنغيم',
		objectives: [
			'تكوين الأضداد بدقة باستعمال السوابق النافية (un-, in-, im-, il-, ir-, dis-)',
			'تصنيف الكلمات المنتهية بـ (-s / -es) حسب نطقها الصوتي إلى (/s/, /z/, /iz/)',
			'التمييز بين التنغيم الصاعد والهابط في الطلبات المهذبة والأسئلة'
		],
		keywordsAr: ['Prefixes', 'un-', 'in-', 'im-', 'dis-', 'Final -s', 'Intonation', 'Polite requests'],
		discover: {
			scenarioAr:
				'في نص حول حقوق الإنسان وردت الكلمات: (injustice, inequality, unfair, disrespect, impossible, rights, laws, bridges). لاحظ كيف تحول السوابق الكلمة إلى ضدها، وكيف يتغير نطق حرف (s) في آخر الكلمات حسب الصوت الذي يسبقه.',
			svg: svgEnglishWordFormation({
				title: 'Negative Prefixes & Word Building',
				prefix: 'in- / un- / im- / dis-',
				root: 'justice / fair / possible / agree',
				suffix: '—',
				derivedWord: 'injustice | unfair | impossible | disagree',
				meaningNote: 'Negative prefixes reverse the meaning without changing word class'
			}),
			steps: [
				{
					promptAr: 'لماذا أضفنا السابقة (im-) إلى (possible) و(polite) بدل (in-)؟',
					hintAr: 'انظر إلى الحرف الأول في (possible) و(polite) و(moral).',
					expectedInput: 'لأن im- تأتي قبل الكلمات التي تبدأ بحرف p أو m',
					revealAr:
						'قاعدة صوتية سهلة: نستعمل (im-) قبل الكلمات التي تبدأ بـ (p, m) مثل impossible, impolite, immoral؛ و(il-) قبل (l) مثل illegal؛ و(ir-) قبل (r) مثل irresponsible.'
				},
				{
					promptAr: 'كيف يُنطق حرف (-s) في نهاية الكلمات: (rights, laws, peace/bridges)؟',
					hintAr: 'تحسّس اهتزاز الحبال الصوتية عند الصوت الذي يسبق (s) مباشرة.',
					expectedInput: 'rights /s/ و laws /z/ و bridges /iz/',
					revealAr:
						'تُنطق (rights) بصوت /s/ بعد الصوت المهموس (t)، وتنطق (laws) بصوت /z/ بعد صوت مجهور، وتنطق (bridges) بصوت /iz/ بعد صوت صفيري (ge).'
				},
				{
					promptAr: 'عندما نطرح طلباً مهذباً مثل: «Could you open the door, please?» هل يرتفع الصوت أم ينخفض في النهاية؟',
					hintAr: 'الطلبات المهذبة وأسئلة نعم/لا تتميز بنغمة لطيفة في آخر الجملة.',
					expectedInput: 'يرتفع الصوت (Rising intonation)',
					revealAr:
						'في الطلبات المهذبة وأسئلة (Yes/No) نستخدم التنغيم الصاعد (Rising intonation) لإظهار اللطف والاحترام، بينما نستخدم التنغيم الهابط (Falling) في الجمل الخبرية وأسئلة (Wh-).'
				}
			]
		},
		summary: {
			rulesAr: [
				'السوابق النافية (Negative Prefixes): (im-) قبل p/m مثل impossible, impatient؛ (il-) قبل l مثل illegal, illiterate؛ (ir-) قبل r مثل irregular, irresponsible؛ (in-) مثل injustice, inequality؛ (un-) مثل unfair, unequal؛ (dis-) مثل disagree, dishonest, disrespect.',
				'نطق النهاية (-s / -es) — الصوت /s/: بعد الأصوات المهموسة (p, t, k, f, th) مثل rights, books, beliefs, maps.',
				'نطق النهاية (-s / -es) — الصوت /iz/: بعد الأصوات الصفيرية (s, ss, sh, ch, x, z, ge/ce) مثل bridges, judges, marches, boxes, causes, places.',
				'نطق النهاية (-s / -es) — الصوت /z/: بعد جميع الأصوات المجهورة الأخرى والحروف المتحركة مثل laws, rules, schools, leaders, treaties.',
				'التنغيم (Intonation): صاعد (Rising) في أسئلة Yes/No والطلبات المهذبة (Could you help me, please?)، وهابط (Falling) في أسئلة Wh- والجمل الخبرية والأوامر.'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Final -s / -es Pronunciation Rules',
				subtitle: 'Look at the LAST SOUND before -s (not always the letter)',
				columns: [
					{ sound: '/s/', rule: 'After p, t, k, f, th', examples: 'rights, books, maps' },
					{ sound: '/z/', rule: 'After voiced & vowels', examples: 'laws, peace-builders, rules' },
					{ sound: '/iz/', rule: 'After s, z, sh, ch, ge, x', examples: 'judges, causes, marches' }
				]
			}),
			visualCaptionAr: 'القاعدة الذهبية لتصنيف النهاية (-s / -es) في البناء اللغوي',
			examples: [
				{
					problemAr: 'Form the opposites using prefixes: justice, moral, legal, responsible, honest, fair.',
					solutionAr: 'injustice, immoral, illegal, irresponsible, dishonest, unfair.'
				},
				{
					problemAr: 'Classify according to final -s: conflicts, judges, citizens, debates.',
					solutionAr: '/s/: conflicts, debates | /z/: citizens | /iz/: judges.'
				},
				{
					problemAr: 'Mark the intonation: (a) Could you speak calmly, please? (b) Why do conflicts happen?',
					solutionAr: '(a) Rising intonation (polite request) | (b) Falling intonation (Wh-question).'
				}
			],
			watchOutAr:
				'انتبه للكلمات المنتهية بـ (ce / ge / se) مثل (places, bridges, causes): حرف (e) هنا صامت قبل (s) ولكن الصوت الأخير هو (/s/, /dʒ/, /z/) لذلك تنطق النهاية (/iz/) وليست (/s/)!'
		},
		practice: [
			{
				questionAr: 'Choose the correct negative prefix for the word "responsible":',
				options: ['unresponsible', 'inresponsible', 'irresponsible', 'disresponsible'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الكلمات المبدوءة بـ r تأخذ عادة السابقة ir-.',
					'in- تتحول إلى ir- قبل حرف r.',
					'صحيح! irresponsible هي الصيغة السليمة.',
					'dis- لا تُستخدم مع responsible.'
				],
				explanationAr: 'قبل الحرف r نستخدم السابقة النافية ir- (مثل irregular, irresponsible).'
			},
			{
				questionAr: 'How is the final "-s" pronounced in the word "rights"?',
				options: ['/s/', '/z/', '/iz/', '/id/'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الكلمة تنتهي بالصوت المهموس /t/ فتُنطق النهاية /s/.',
					'الصوت /t/ مهموس وليس مجهورا.',
					'لا يوجد صوت صفيري قبل النهاية.',
					'/id/ يخص النهاية -ed وليس -s.'
				],
				explanationAr: 'بعد الأصوات المهموسة (p, t, k, f) تُنطق النهاية (-s) بصوت /s/.'
			},
			{
				questionAr: 'Which word has its final "-s" pronounced /iz/?',
				options: ['treaties', 'leaders', 'judges', 'beliefs'],
				correctIndex: 2,
				diagnosticFeedback: [
					'تنتهي بصوت متحرك فهي /z/.',
					'تنتهي بصوت r المجهور فهي /z/.',
					'ممتاز! judges تنتهي بصوت /dʒ/ فتُنطق النهاية /iz/.',
					'تنتهي بصوت f المهموس فهي /s/.'
				],
				explanationAr: 'الكلمات المنتهية بأصوات الصفير (s, sh, ch, x, z, ge) تأخذ الصوت /iz/.'
			},
			{
				questionAr: 'Choose the correct pair of opposites for "polite" and "agree":',
				options: ['inpolite / unagree', 'impolite / disagree', 'unpolite / inagree', 'dispolite / imagree'],
				correctIndex: 1,
				diagnosticFeedback: [
					'قبل p نستعمل im-، ومع الفعل agree نستعمل dis-.',
					'إجابة صحيحة 100%! impolite و disagree.',
					'الصيغتان غير موجودتين في الإنجليزية.',
					'ترتيب السوابق معكوس وغير صحيح.'
				],
				explanationAr: 'قبل p نستعمل im- (impolite)، ومع كثير من الأفعال نستعمل dis- (disagree, disrespect).'
			},
			{
				questionAr: 'Which intonation is used in the polite request: "Would you help me mediate this dispute, please?"',
				options: ['Rising intonation', 'Falling intonation', 'Flat intonation', 'No intonation'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الطلبات المهذبة وأسئلة نعم/لا تستخدم التنغيم الصاعد (Rising).',
					'التنغيم الهابط يُستعمل مع أسئلة Wh- والجمل الخبرية.',
					'الطلبات المهذبة لها تنغيم صاعد واضح.',
					'كل جملة منطوقة لها تنغيم.'
				],
				explanationAr: 'الطلبات المهذبة التي تبدأ بـ Could you / Would you تنتهي بتنغيم صاعد يعكس اللطف.'
			}
		]
	},

	// [5] Reading Peace Texts & Writing a Peace Charter / Conflict Resolution Paragraph
	{
		id: 'eng_lesson_2as_sci_t1_peace_charter_writing',
		slug: 'eng-2as-sci-t1-peace-charter-writing',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Make Peace — صنع السلام وحل النزاعات',
		order: 5,
		titleAr: 'فهم نصوص السلام وحقوق الإنسان وكتابة ميثاق أو فقرة حول حل النزاعات',
		objectives: [
			'إتقان منهجية الإجابة عن أسئلة الفهم (Reading Comprehension — 8 pts) بدقة',
			'استخراج مرجع الضمائر (Pronoun Reference) وتحديد نوع النص والفكرة العامة',
			'كتابة فقرة أو ميثاق مدرسي للسلام (5 pts) بلغة سليمة ومنهجية واضحة'
		],
		keywordsAr: ['Reading Comprehension', 'Pronoun Reference', 'Peace Charter', 'Written Expression', 'Dialogue'],
		discover: {
			scenarioAr:
				'في موضوع الاختبار الثانوي (8 + 7 + 5 = 20)، يطلب منك أولا فهم النص واستخراج مرجع الضمائر المسطّرة مثل (they, it, which)، ثم كتابة ميثاق سلام أو فقرة حول حل النزاعات في المدرسة أو المجتمع. تعلم كيف تجمع العلامة الكاملة بمنهجية بسيطة.',
			svg: svgEnglishWritingStructure({
				title: 'Writing a Peace Charter / Paragraph (5 pts)',
				steps: [
					{ stage: 'Topic Sentence', detail: 'Define peace & state the main purpose clearly' },
					{ stage: 'Articles / Points', detail: 'Use must, should, must not, can (3-4 clear rules)' },
					{ stage: 'Connectors', detail: 'Link ideas: First, Moreover, However, Finally' },
					{ stage: 'Conclusion', detail: 'Summarize the shared benefit for school & society' }
				]
			}),
			steps: [
				{
					promptAr: 'عندما يُطلب منك تحديد مرجع ضمير مسطّر مثل (they) في الفقرة الثانية، أين تبحث عنه؟',
					hintAr: 'الضمير يعود غالبا على اسم جمع ذُكر قبله مباشرة في نفس الجملة أو الجملة السابقة.',
					expectedInput: 'في الاسم الجمع المذكور قبله مباشرة في النص',
					revealAr:
						'نعود دائما إلى ما قبل الضمير مباشرة ونتحقق من المطابقة في العدد (مفرد/جمع) والمعنى (عاقل/غير عاقل): they للجمع، it لغير العاقل المفرد، who للعاقل، which لغير العاقل.'
				},
				{
					promptAr: 'ما الأفعال الناقصة الأنسب عند صياغة بنود ميثاق مدرسي ضد التنمر؟',
					hintAr: 'الميثاق يحدد ما يجب فعله وما يُمنع فعله وما يُنصح به.',
					expectedInput: 'must و must not و should و can',
					revealAr:
						'نستعمل (must) للواجبات الأساسية، و(must not) للممنوعات مثل التنمر والإهانة، و(should) للتوجيه الأخلاقي، و(will be able to) لبيان ثمرة الالتزام بالميثاق.'
				},
				{
					promptAr: 'كيف تضمن العلامة الكاملة (5/5) في الوضعية الإدماجية (Written Expression)؟',
					hintAr: 'تذكر معايير التصحيح: الالتزام بالموضوع، ترابط الأفكار، سلامة القواعد، ونظافة العرض.',
					expectedInput: 'جملة مفتاحية + استثمار كل الملاحظات + روابط + خاتمة موجزة',
					revealAr:
						'ابدأ بجملة مفتاحية واضحة، وظف جميع الملاحظات المعطاة في Topic One إن اخترته، اربط الجمل بروابط منطقية، وراجع الأزمنة والإملاء وعلامات الترقيم.'
				}
			]
		},
		summary: {
			rulesAr: [
				'منهجية الفهم (8 pts): اقرأ النص مرتين؛ في أسئلة True/False قارن المعنى لا الكلمات الحرفية فقط؛ في الأسئلة المفتوحة أجب بجملة كاملة ومباشرة من النص دون نسخ فقرة كاملة.',
				'مرجع الضمائر (Reference Words): راجع السياق قبل الضمير مباشرة (they/them/their تعود لاسم جمع؛ it/its لاسم مفرد غير عاقل؛ who للعاقل؛ which لغير العاقل؛ where للمكان).',
				'تحديد نوع النص (Type of Text): Expository (تفسيري يشرح ظاهرة)، Argumentative (حجاجي يدافع عن رأي)، Narrative (سردي يروي قصة/سيرة)، Prescriptive (توجيهي يقدم قواعد أو ميثاقا).',
				'منهجية التعبير الكتابي (5 pts): التزم بالحجم المطلوب (80 إلى 120 كلمة)، استعمل فقرة منظمة (مقدمة، عرض من 3 أفكار مدعمة بالروابط، خاتمة)، ووظف قواعد الوحدة (Modals & Negative Prefixes).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Reading & Writing Toolkit (Unit 1)',
				rootLabel: 'Exam Success (8 + 7 + 5)',
				rootSub: 'Clear structure earns top marks',
				branches: [
					{ label: 'Reference', rule: 'Look back & match', example: 'they = students' },
					{ label: 'Text Types', rule: 'Purpose of writer', example: 'Expository / Prescriptive' },
					{ label: 'Charter Style', rule: 'Modals + clarity', example: 'Pupils must respect...' },
					{ label: 'Cohesion', rule: 'Linkers & order', example: 'First, Moreover, Thus' }
				]
			}),
			visualCaptionAr: 'أدوات النجاح في فهم النص والتعبير الكتابي للوحدة الأولى',
			examples: [
				{
					problemAr: 'Find what "their" refers to: "Mediators listen to both students so that they can understand their point of view."',
					solutionAr: '"they" refers to "mediators", and "their" refers to "both students" (أو students حسب المعنى الدقيق للسياق).'
				},
				{
					problemAr: 'Turn these notes into two coherent sentences for a School Peace Charter: respect teachers and classmates / no bullying / solve problems by dialogue.',
					solutionAr: 'First, all pupils must respect their teachers and classmates, and they must not practice any form of bullying. Moreover, they should solve misunderstandings through calm dialogue.'
				}
			],
			watchOutAr:
				'في الوضعية الإدماجية، اختر موضوعاً واحداً فقط (Topic One OR Topic Two) ولا تكتب فيهما معا! وإذا اخترت Topic One فاحرص على تحويل الملاحظات إلى جمل كاملة مترابطة لا نقاط مبعثرة.'
		},
		practice: [
			{
				questionAr: 'In the sentence "Imam Ben Badis founded schools because he believed education could unite people", what does "he" refer to?',
				options: ['schools', 'people', 'Imam Ben Badis', 'education'],
				correctIndex: 2,
				diagnosticFeedback: [
					'schools جمع غير عاقل لا يناسب he.',
					'people جمع لا يناسب he.',
					'صحيح! he ضمير مفرد مذكر عاقل يعود على Imam Ben Badis.',
					'education غير عاقل يناسبه it.'
				],
				explanationAr: 'الضمير he يعود على الاسم المفرد المذكر العاقل الأقرب قبله وهو Imam Ben Badis.'
			},
			{
				questionAr: 'A text that gives rules, duties, and articles for peaceful coexistence at school is mainly:',
				options: ['Narrative', 'Prescriptive', 'Descriptive', 'Biographical'],
				correctIndex: 1,
				diagnosticFeedback: [
					'السردي يروي أحداثا وقصة.',
					'أحسنت! النص الذي يضع قواعد وتوجيهات ومواثيق هو نص توجيهي (Prescriptive).',
					'الوصفي يركز على وصف مكان أو شخص.',
					'السيرة تروي حياة شخصية.'
				],
				explanationAr: 'المواثيق والقوانين والنصائح المنظمة تندرج ضمن النمط التوجيهي (Prescriptive).'
			},
			{
				questionAr: 'Which sentence is the strongest Topic Sentence for a paragraph on conflict resolution?',
				options: [
					'Yesterday I went to school early.',
					'Peaceful dialogue is the most effective way to resolve conflicts and build trust in our schools.',
					'Finally, we must be polite.',
					'Conflict is a word in English.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'جملة سردية لا تقدم موضوع حل النزاعات.',
					'ممتاز! جملة مفتاحية واضحة تحدد الموضوع والفكرة المحورية.',
					'هذه جملة ختامية لا مفتاحية.',
					'جملة سطحية لا تصلح لمقدمة فقرة أكاديمية.'
				],
				explanationAr: 'الجملة المفتاحية (Topic Sentence) تقدم الموضوع الرئيسي وتوجه القارئ إلى فكرة الفقرة.'
			},
			{
				questionAr: 'Which set of connectors best organizes three articles in a peace paragraph?',
				options: [
					'First / Moreover / Finally',
					'Yesterday / Ago / Last week',
					'Because / Since / Owing to',
					'Who / Which / Where'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! روابط الترتيب والإضافة تمنح الفقرة تماسكا منطقيا.',
					'هذه ظروف زمنية للماضي البسيط.',
					'هذه روابط سبب فقط.',
					'هذه ضمائر وصل.'
				],
				explanationAr: 'روابط التسلسل (First, Second/Moreover, Finally) ترتب الأفكار والبنود بوضوح.'
			},
			{
				questionAr: 'In the Algerian 2AS Scientific English exam, how are the 20 points distributed?',
				options: [
					'10 Comprehension + 5 Exploration + 5 Writing',
					'8 Comprehension + 7 Text Exploration + 5 Written Expression',
					'7 Comprehension + 8 Text Exploration + 5 Written Expression',
					'7 Comprehension + 7 Text Exploration + 6 Written Expression'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'التوزيع الرسمي للعلميين ليس 10+5+5.',
					'صحيح! سلم الشعب العلمية والتسيير في 2AS هو 8 + 7 + 5 = 20 نقطة.',
					'هذا توزيع شعبة آداب وفلسفة.',
					'هذا توزيع شعبة لغات أجنبية.'
				],
				explanationAr: 'في الشعب العلمية وتسيير واقتصاد (2AS): الفهم 8 نقاط + استكشاف النص 7 نقاط + التعبير الكتابي 5 نقاط.'
			}
		]
	}
];
