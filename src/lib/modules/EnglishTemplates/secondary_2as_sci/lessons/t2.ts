import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_SCI_T2: EnglishInteractiveLessonData[] = [
	// [1] Passive Voice in Main Tenses (Present, Past, Present Perfect & Future)
	{
		id: 'eng_lesson_2as_sci_t2_passive_voice_tenses',
		slug: 'eng-2as-sci-t2-passive-voice-tenses',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not — الطاقات المتجددة وحماية الموارد',
		order: 1,
		titleAr: 'المبني للمجهول في الأزمنة الأساسية (Passive Voice: All Main Tenses)',
		objectives: [
			'فهم آلية التحويل من المبني للمعلوم (Active) إلى المبني للمجهول (Passive) في الأزمنة الأساسية',
			'تصريف الفعل المساعد (to be) بدقة حسب زمن الجملة الأصلية مع اسم المفعول (Past Participle)',
			'توظيف المبني للمجهول في وصف المشاريع البيئية والطاقات المتجددة والتجارب العلمية'
		],
		keywordsAr: ['Passive Voice', 'Active Voice', 'Past Participle', 'by + agent', 'Present Simple', 'Past Simple'],
		discover: {
			scenarioAr:
				'في تقرير عن محطة شمسية بأدرار كُتب: «تنتج المحطة كهرباء نظيفة (The station produces clean electricity)»، ثم أُعيدت صياغتها علميا للتركيز على الكهرباء: «تُنتَج كهرباء نظيفة من قبل المحطة (Clean electricity is produced by the station)». لاحظ ما الذي انتقل إلى البداية وماذا أُضيف للفعل.',
			svg: svgEnglishGrammarMap({
				title: 'Active to Passive Across Main Tenses',
				rootLabel: 'Passive = Object + BE + Past Participle',
				rootSub: 'BE always takes the tense of the active verb',
				branches: [
					{ label: 'Present Simple', rule: 'am / is / are + PP', example: 'Energy is saved.' },
					{ label: 'Past Simple', rule: 'was / were + PP', example: 'Trees were planted.' },
					{ label: 'Present Perfect', rule: 'has / have been + PP', example: 'Water has been stored.' },
					{ label: 'Future Simple', rule: 'will be + PP', example: 'Panels will be built.' }
				]
			}),
			steps: [
				{
					promptAr: 'في التحويل إلى المبني للمجهول، ماذا يصبح المفعول به (Object) في الجملة الجديدة؟',
					hintAr: 'قارن موقع عبارة (clean electricity) في الجملتين.',
					expectedInput: 'يصبح هو الفاعل الجديد في بداية الجملة',
					revealAr:
						'ينتقل المفعول به (Object) إلى بداية الجملة ليصبح الفاعل الجديد، ثم نضع الفعل المساعد (to be) مصرفا في نفس زمن الجملة الأصلية متبوعا باسم المفعول (PP).'
				},
				{
					promptAr: 'إذا كان الفعل الأصلي في الماضي البسيط (built) وكان المفعول به جمعاً (solar stations)، فما شكل الفعل (be)؟',
					hintAr: 'تذكر مطابقة العدد بين الفاعل الجديد والفعل المساعد.',
					expectedInput: 'were (Solar stations were built)',
					revealAr:
						'لأن الزمن ماضٍ بسيط والفاعل الجديد جمع (stations)، نختار (were) ونضيف اسم المفعول: Solar stations were built.'
				},
				{
					promptAr: 'متى نحتاج إلى ذكر (by + agent) ومتى يُفضّل حذفه؟',
					hintAr: 'هل يهم ذكر الفاعل إذا كان مجهولا أو عاما مثل (people / someone / they)؟',
					expectedInput: 'نذكره إذا كان محدداً ومهماً، ونحذفه إذا كان عاماً مثل people أو someone',
					revealAr:
						'نذكر (by + agent) عندما يكون الفاعل محددا ومفيدا للمعنى (مثل by Algerian engineers)، ونحذفه عندما يكون عاما أو مجهولا (people, someone, they).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة العامة للمبني للمجهول: New Subject (Object) + to be (في زمن الجملة الأصلية) + Past Participle (+ by + Agent عند الحاجة).',
				'الحاضر البسيط (Present Simple): am / is / are + PP. مثال: Engineers install panels — Panels are installed by engineers.',
				'الماضي البسيط (Past Simple): was / were + PP. مثال: Farmers built dams — Dams were built by farmers.',
				'المضارع التام (Present Perfect): has / have + been + PP. مثال: Algeria has launched solar projects — Solar projects have been launched by Algeria.',
				'المستقبل البسيط (Future Simple): will be + PP. الحاضر المستمر: am / is / are being + PP.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Tense Preservation in Passive Voice',
				tenseName: 'BE carries the tense, Main verb stays PP',
				formula: 'was/were + PP  |  is/are + PP  |  will be + PP',
				activeZone: 'past_to_present',
				example: 'Waste was reduced, clean energy is used, and forests will be restored.',
				markers: 'Always check singular vs plural of the NEW subject'
			}),
			visualCaptionAr: 'حفظ الزمن في المبني للمجهول عبر تصريف الفعل المساعد (to be) بدقة',
			examples: [
				{
					problemAr: 'Rewrite in the passive voice: Volunteers plant thousands of olive trees every spring.',
					solutionAr: 'Thousands of olive trees are planted by volunteers every spring.'
				},
				{
					problemAr: 'Rewrite in the passive voice: Ibn al-Haytham wrote the Book of Optics in the eleventh century.',
					solutionAr: 'The Book of Optics was written by Ibn al-Haytham in the eleventh century.'
				},
				{
					problemAr: 'Rewrite in the passive voice: Scientists have discovered new methods to purify water.',
					solutionAr: 'New methods to purify water have been discovered by scientists.'
				}
			],
			watchOutAr:
				'احذر خطأ مطابقة الفاعل الجديد: إذا كان الفاعل الأصلي مفرداً والمفعول به جمعاً (مثل The engineer builds stations)، فإن الفعل الجديد يتبع الفاعل الجديد الجمع: Stations ARE built وليس is built!'
		},
		practice: [
			{
				questionAr: 'Rewrite in the passive: "Solar panels generate clean electricity."',
				options: [
					'Clean electricity is generated by solar panels.',
					'Clean electricity are generated by solar panels.',
					'Clean electricity was generated by solar panels.',
					'Clean electricity generates by solar panels.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الزمن حاضر بسيط والاسم electricity مفرد غير معدود فيأخذ is generated.',
					'electricity اسم غير معدود يعامل معاملة المفرد لا الجمع.',
					'الجملة الأصلية في الحاضر البسيط وليست في الماضي.',
					'نقص الفعل المساعد be وتحويل الفعل إلى اسم مفعول.'
				],
				explanationAr: 'الاسم electricity غير معدود (مفرد) والفعل الأصلي حاضر بسيط، فتكون الصيغة is generated.'
			},
			{
				questionAr: 'Choose the right passive verb: "Two huge solar plants ........ in Adrar last year."',
				options: ['are built', 'were built', 'was built', 'have been built'],
				correctIndex: 1,
				diagnosticFeedback: [
					'وجود last year يفرض الماضي البسيط لا الحاضر.',
					'ممتاز! الفاعل جمع (plants) والزمن ماضٍ بسيط (last year) فنستعمل were built.',
					'was للمفرد بينما plants جمع.',
					'last year مؤشر ماضٍ بسيط وليس مضارعا تاما.'
				],
				explanationAr: 'مع last year نستخدم الماضي البسيط للمبني للمجهول، ومع الجمع نختار were + PP.'
			},
			{
				questionAr: 'Passive form of: "The researchers have tested the water sample."',
				options: [
					'The water sample has tested by the researchers.',
					'The water sample was tested by the researchers.',
					'The water sample has been tested by the researchers.',
					'The water sample have been tested by the researchers.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نقصت كلمة been الأساسية في المضارع التام المبني للمجهول.',
					'هذا ماضٍ بسيط بينما الجملة الأصلية مضارع تام.',
					'صحيح! has been tested تناسب الفاعل المفرد sample في المضارع التام.',
					'sample مفرد يأخذ has وليس have.'
				],
				explanationAr: 'صيغة المضارع التام المبني للمجهول هي: has/have + been + Past Participle.'
			},
			{
				questionAr: 'Passive form of: "Algeria will develop more renewable projects by 2030."',
				options: [
					'More renewable projects will developed by Algeria by 2030.',
					'More renewable projects will be developed by Algeria by 2030.',
					'More renewable projects are developed by Algeria by 2030.',
					'More renewable projects would be developed by Algeria by 2030.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نقصت كلمة be بين will و developed.',
					'أحسنت! المستقبل المبني للمجهول هو will be + PP.',
					'هذا حاضر بسيط وليس مستقبلا.',
					'تغيّر الزمن من will إلى would دون مبرر.'
				],
				explanationAr: 'لتحويل المستقبل البسيط (will + stem) إلى المبني للمجهول نكتب: will be + Past Participle.'
			},
			{
				questionAr: 'Choose the right passive form for Present Continuous: "Workers are repairing the irrigation canal now."',
				options: [
					'The irrigation canal is repaired now.',
					'The irrigation canal is being repaired now.',
					'The irrigation canal was being repaired now.',
					'The irrigation canal has been repaired now.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا حاضر بسيط وليس مستمرا.',
					'صحيح! الحاضر المستمر المبني للمجهول هو is/are + being + PP.',
					'was being للماضي المستمر لا للحاضر.',
					'هذا مضارع تام.'
				],
				explanationAr: 'في الأزمنة المستمرة نضيف كلمة being قبل اسم المفعول: is/are + being + PP.'
			}
		]
	},

	// [2] Passive Voice with Modals (can be conserved, must be protected)
	{
		id: 'eng_lesson_2as_sci_t2_passive_modals',
		slug: 'eng-2as-sci-t2-passive-modals',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not — الطاقات المتجددة وحماية الموارد',
		order: 2,
		titleAr: 'المبني للمجهول مع الأفعال الناقصة (Passive with Modals: can be / must be)',
		objectives: [
			'تحويل الجمل التي تحتوي على أفعال ناقصة (can, must, should, may, ought to) إلى المبني للمجهول',
			'توظيف تراكيب مثل (can be conserved / must be protected / should be recycled) في النصوص البيئية',
			'تجنب الأخطاء الشائعة عند تصريف الفعل بعد الفعل الناقص في المبني للمجهول'
		],
		keywordsAr: ['Modal Passive', 'can be conserved', 'must be protected', 'should be recycled', 'ought to be saved'],
		discover: {
			scenarioAr:
				'في حملة للحفاظ على الغابات والمياه نقرأ: «يجب علينا حماية الغابات (We must protect forests)» و«يمكننا توفير الماء (We can conserve water)». وعند كتابة شعار بيئي رسمي نقول: «Forests must be protected» و«Water can be conserved». تأمل بساطة القاعدة!',
			svg: svgEnglishGrammarMap({
				title: 'Passive Voice with Modal Verbs',
				rootLabel: 'Object + Modal + BE + Past Participle',
				rootSub: 'BE never changes after a modal verb',
				branches: [
					{ label: 'Possibility', rule: 'can / may + be + PP', example: 'Solar heat can be stored.' },
					{ label: 'Obligation', rule: 'must / have to + be + PP', example: 'Forests must be protected.' },
					{ label: 'Advice', rule: 'should / ought to + be + PP', example: 'Waste should be recycled.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الكلمة الثابتة التي تضاف دائماً بعد الفعل الناقص (can / must / should) عند التحويل إلى المبني للمجهول؟',
					hintAr: 'قارن بين (must protect) و(must be protected).',
					expectedInput: 'الكلمة الثابتة هي be في المصدر',
					revealAr:
						'تُضاف كلمة (be) دائما كما هي دون أي تصريف بعد الفعل الناقص، ثم يأتي بعدها اسم المفعول (Past Participle).'
				},
				{
					promptAr: 'هل يتغير شكل (must be) إذا كان الفاعل الجديد مفرداً (Water) أو جمعاً (Forests)؟',
					hintAr: 'تذكر أن الأفعال الناقصة لا تتغير مع المفرد والجمع.',
					expectedInput: 'لا يتغير أبداً، يبقى must be للمفرد والجمع',
					revealAr:
						'لا يتغير أبدا! نقول: Water must be saved (مفرد) و Forests must be saved (جمع).'
				},
				{
					promptAr: 'كيف ننفي الجملة: «Plastic waste should be burned»؟',
					hintAr: 'أين نضع أداة النفي (not) مع الفعل الناقص؟',
					expectedInput: 'نضع not بعد الفعل الناقص مباشرة: should not be burned',
					revealAr:
						'نضع (not) بعد الفعل الناقص مباشرة قبل (be): Plastic waste should not be burned.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية: Object + Modal (can / could / may / might / must / should / ought to) + be + Past Participle.',
				'أمثلة بيئية أساسية: Water must be conserved. / Solar energy can be used at home. / Paper and glass should be recycled.',
				'صيغة النفي: Object + Modal + not + be + Past Participle. مثال: Natural resources must not be wasted.',
				'مع (have to / has to): نراعي مطابقة الفاعل الجديد: Energy has to be saved / Resources have to be protected.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '4 Easy Steps: Active Modal to Passive Modal',
				steps: [
					{ stage: 'Find Object', detail: 'Move the object to the start (e.g. Clean water)' },
					{ stage: 'Keep Modal', detail: 'Copy can, must, should, may, or ought to' },
					{ stage: 'Insert BE', detail: 'Always add "be" in base form after the modal' },
					{ stage: 'Add PP', detail: 'Use Past Participle (conserved, protected, recycled)' }
				]
			}),
			visualCaptionAr: 'خطوات التحويل الأربع السريعة للمبني للمجهول مع الأفعال الناقصة',
			examples: [
				{
					problemAr: 'Rewrite in the passive: People must conserve fresh water during dry seasons.',
					solutionAr: 'Fresh water must be conserved during dry seasons.'
				},
				{
					problemAr: 'Rewrite in the passive: Communities can fight poverty through sustainable farming.',
					solutionAr: 'Poverty can be fought by communities through sustainable farming.'
				},
				{
					problemAr: 'Rewrite in the passive: Factories should not dump toxic waste into rivers.',
					solutionAr: 'Toxic waste should not be dumped into rivers by factories.'
				}
			],
			watchOutAr:
				'لا تكتب أبدا (must been) أو (can is) أو (should being) بعد الفعل الناقص! الصيغة الصحيحة الوحيدة مع الأفعال الناقصة في الحاضر والمستقبل هي: Modal + be + Past Participle.'
		},
		practice: [
			{
				questionAr: 'Rewrite in the passive: "We must protect endangered species."',
				options: [
					'Endangered species must protected.',
					'Endangered species must be protected.',
					'Endangered species must been protected.',
					'Endangered species are must protected.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'نقصت كلمة be بعد must.',
					'إجابة صحيحة! must + be + protected.',
					'لا نستعمل been بعد must مباشرة بل be.',
					'ترتيب الكلمات غير صحيح نحويا.'
				],
				explanationAr: 'القاعدة الثابتة: Object + Modal + be + Past Participle.'
			},
			{
				questionAr: 'Choose the correct modal passive: "Solar electricity ........ in batteries for night use."',
				options: ['can store', 'can be stored', 'can been stored', 'is can stored'],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه صيغة مبني للمعلوم بينما الكهرباء تُخزَّن.',
					'ممتاز! can be stored تعني يمكن تخزينها.',
					'لا يصح وضع been بعد can.',
					'لا نضع is قبل can.'
				],
				explanationAr: 'الكهرباء مفعول به يُخزَّن، فنستعمل المبني للمجهول مع الفعل الناقص: can be stored.'
			},
			{
				questionAr: 'Rewrite in the passive: "Citizens should not waste drinking water."',
				options: [
					'Drinking water should not be wasted.',
					'Drinking water should be not wasted.',
					'Drinking water should not wasted.',
					'Drinking water not should be wasted.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! نضع not بعد should مباشرة ثم be wasted.',
					'موقع not خطأ؛ يجب أن تسبق be.',
					'نقصت كلمة be قبل wasted.',
					'موقع not خطأ؛ لا تسبق الفعل الناقص.'
				],
				explanationAr: 'في النفي تكون الصيغة: Modal + not + be + Past Participle.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'Plastic bottles ought be recycled.',
					'Plastic bottles ought to recycled.',
					'Plastic bottles ought to be recycled.',
					'Plastic bottles ought to been recycled.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نقصت to بعد ought.',
					'نقصت be قبل recycled.',
					'صحيح! ought to + be + Past Participle.',
					'لا نستعمل been بعد ought to هنا.'
				],
				explanationAr: 'الفعل الناقص ought to يتبعه be + اسم المفعول: ought to be recycled.'
			},
			{
				questionAr: 'Rewrite in the passive: "Developing countries have to modernize their irrigation systems."',
				options: [
					'Their irrigation systems has to be modernized.',
					'Their irrigation systems have to be modernized.',
					'Their irrigation systems have to modernized.',
					'Their irrigation systems have been modernize.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'systems جمع يأخذ have to وليس has to.',
					'صحيح! الفاعل جمع فتكون الصيغة have to be modernized.',
					'نقصت كلمة be قبل modernized.',
					'الصيغة والمصدر غير صحيحين.'
				],
				explanationAr: 'مع have to / has to نطابق الفاعل الجديد في العدد، ثم نضيف be + PP.'
			}
		]
	},

	// [3] Conditional Types 0, 1 & 2 (Budding Scientist & Energy)
	{
		id: 'eng_lesson_2as_sci_t2_conditionals_0_1_2',
		slug: 'eng-2as-sci-t2-conditionals-0-1-2',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Budding Scientist — العالم الناشئ والتجارب العلمية',
		order: 3,
		titleAr: 'الجمل الشرطية (Conditional Types 0, 1 & 2)',
		objectives: [
			'التمييز الدقيق بين أنواع الشرط الثلاثة: النوع 0 (الحقائق العلمية)، النوع 1 (الاحتمال المستقبلي)، والنوع 2 (الافتراض غير الواقعي)',
			'تصريف فعلي جملة الشرط (If-clause) وجواب الشرط (Main clause) دون خطأ',
			'استعمال الشرط النوع 0 في وصف التجارب العلمية والظواهر الفيزيائية'
		],
		keywordsAr: ['Conditional Type 0', 'Conditional Type 1', 'Conditional Type 2', 'Scientific facts', 'Hypothesis'],
		discover: {
			scenarioAr:
				'في مخبر العلوم قال الأستاذ: «إذا سخّنتَ الماء إلى 100 درجة فإنه يغلي (If you heat water to 100 C, it boils) — حقيقة علمية ثابتة!»، ثم قال: «إذا وفرنا الطاقة اليوم فسنحمي كوكبنا (If we save energy, we will protect our planet) — نتيجة مستقبلية ممكنة»، ثم قال: «لو كنتُ مخترعاً لصممتُ جهاز تحلية شمسيا (If I were an inventor, I would design a solar purifier) — افتراض خيالي».',
			svg: svgEnglishGrammarMap({
				title: 'Conditional Sentences: Types 0, 1 & 2',
				rootLabel: 'IF-Clause + Main Clause',
				rootSub: 'Match tense to reality level',
				branches: [
					{ label: 'Type 0 (Fact)', rule: 'If + Present, Present', example: 'If ice heats, it melts.' },
					{ label: 'Type 1 (Real)', rule: 'If + Present, will + stem', example: 'If we recycle, we will save.' },
					{ label: 'Type 2 (Unreal)', rule: 'If + Past, would + stem', example: 'If I were you, I would study.' }
				]
			}),
			steps: [
				{
					promptAr: 'لماذا استعملنا المضارع البسيط في كلا شطري جملة «If you heat water to 100 C, it boils»؟',
					hintAr: 'هل غليان الماء عند 100 درجة حقيقة دائمة أم احتمال مؤقت؟',
					expectedInput: 'لأنها حقيقة علمية ثابتة تقع دائماً (Type 0)',
					revealAr:
						'في الحقائق العلمية والقوانين الفيزيائية والتجارب المخبرية الثابتة نستخدم الشرط من النوع الصفر (Type 0): If + Present Simple, Present Simple.'
				},
				{
					promptAr: 'ما الفرق في المعنى بين Type 1 (will) و Type 2 (would)؟',
					hintAr: 'أي النوعين يعبر عن مستقبل واقعي ممكن، وأيهما يعبر عن خيال أو افتراض غير متحقق الآن؟',
					expectedInput: 'Type 1 للممكن الواقعي في المستقبل و Type 2 للافتراض غير الواقعي في الحاضر',
					revealAr:
						'Type 1 يعبر عن نتيجة واقعية وممكنة في المستقبل (If + Present, will + stem)، بينما Type 2 يعبر عن موقف افتراضي أو غير واقعي الآن (If + Past Simple, would + stem).'
				},
				{
					promptAr: 'لماذا نكتب (If I were) في الشرط النوع الثاني بدلاً من (was) في اللغة الأكاديمية؟',
					hintAr: 'هذه صيغة ثابتة في الشرط التخيلي مع جميع الضمائر.',
					expectedInput: 'في الشرط النوع الثاني يُستعمل were مع كل الضمائر خاصة في النصيحة If I were you',
					revealAr:
						'في الشرط النوع الثاني نستخدم (were) مع جميع الضمائر (I, he, she, it) في الإنجليزية الفصيحة والامتحانات الرسمية: If I were you, I would repeat the experiment.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النوع 0 (Type 0 — الحقائق العلمية والتجارب): If / When + Present Simple, Present Simple. مثال: If you mix an acid and a base, they react.',
				'النوع 1 (Type 1 — الشرط الواقعي الممكن): If + Present Simple, will / can / may + stem. مثال: If Algeria expands solar energy, pollution will decrease.',
				'النوع 2 (Type 2 — الشرط التخيلي أو غير الواقعي في الحاضر): If + Past Simple, would / could + stem. مثال: If we had zero waste, cities would be cleaner.',
				'ملاحظة الترقيم: إذا بدأت الجملة بـ (If) نضع فاصلة (,) بين الشطرين؛ وإذا جاءت (if) في الوسط نحذف الفاصلة. ولا نضع (will) أو (would) أبداً داخل شطر (If)!'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Choosing the Right Conditional Type',
				tenseName: 'Type 0 vs Type 1 vs Type 2',
				formula: '0: Pres/Pres | 1: Pres/will | 2: Past/would',
				activeZone: 'present',
				example: 'If you drop salt in water, it dissolves. / If you test it, you will see.',
				markers: 'Never put will or would inside the If-clause'
			}),
			visualCaptionAr: 'مقارنة سريعة بين أزمنة الشرط الثلاثة المقررة في 2AS',
			examples: [
				{
					problemAr: 'Put the verbs in the right tense (scientific law): If a metal (be) heated, it (expand).',
					solutionAr: 'If a metal is heated, it expands. (Type 0: حقيقة فيزيائية ثابتة).'
				},
				{
					problemAr: 'Complete (real future): If farmers (use) drip irrigation, they (save) a lot of water.',
					solutionAr: 'If farmers use drip irrigation, they will save a lot of water. (Type 1).'
				},
				{
					problemAr: 'Complete (imaginary): If every home (have) solar panels, electricity bills (drop) sharply.',
					solutionAr: 'If every home had solar panels, electricity bills would drop sharply. (Type 2).'
				}
			],
			watchOutAr:
				'أكبر خطأ في امتحانات الإنجليزية هو وضع (will) أو (would) بعد (if) مباشرة مثل (If it will rain)! تذكّر دائماً: شطر (If) يأخذ المضارع البسيط أو الماضي البسيط فقط، بينما (will / would) مكانها في الشطر الثاني فقط.'
		},
		practice: [
			{
				questionAr: 'Scientific law (Type 0): If you cool water below zero degrees Celsius, it ........',
				options: ['freezes', 'will froze', 'would freeze', 'froze'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حقيقة علمية ثابتة فتأخذ المضارع البسيط (Type 0): freezes.',
					'will لا يتبعها ماضٍ بسيط، وهذه حقيقة علمية ثابتة.',
					'would للشرط التخيلي النوع 2.',
					'froze ماضٍ بسيط لا يناسب حقيقة علمية عامة.'
				],
				explanationAr: 'في الحقائق العلمية (Type 0) يكون كلا الفعلين في الحاضر البسيط: cool / freezes.'
			},
			{
				questionAr: 'Real future prediction (Type 1): If we ........ renewable energy, our cities will become cleaner.',
				options: ['will adopt', 'adopt', 'adopted', 'would adopt'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع will داخل شطر If أبدا!',
					'أحسنت! شطر If في النوع الأول يأخذ المضارع البسيط (adopt).',
					'adopted للنوع الثاني الذي يقابله would وليس will.',
					'لا نضع would داخل شطر If.'
				],
				explanationAr: 'لوجود will become في جواب الشرط نستخدم المضارع البسيط (adopt) في شطر If.'
			},
			{
				questionAr: 'Hypothetical situation (Type 2): If I ........ a scientist, I would invent a cheap solar desalination unit.',
				options: ['am', 'was be', 'were', 'will be'],
				correctIndex: 2,
				diagnosticFeedback: [
					'am للحاضر النوع 1، بينما الجواب فيه would invent.',
					'صيغة غير صحيحة نحويا.',
					'ممتاز! في الشرط النوع الثاني نستعمل were مع ضمير المتكلم I.',
					'لا نضع will بعد if.'
				],
				explanationAr: 'جواب الشرط يحتوي على would invent (Type 2)، فيلزم الماضي التخيلي were في شطر If.'
			},
			{
				questionAr: 'What happens if you place a magnet near iron filings? (Type 0)',
				options: [
					'The magnet attracted the iron.',
					'The magnet attracts the iron.',
					'The magnet would attract the iron.',
					'The magnet has attracted the iron.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ماضٍ بسيط لا يناسب قانونا فيزيائيا عاما.',
					'صحيح! قانون فيزيائي دائم يُصاغ بالمضارع البسيط (attracts).',
					'would للافتراض الخيالي لا للتجربة الحقيقية.',
					'مضارع تام لا يوافق النوع 0.'
				],
				explanationAr: 'التجارب والظواهر العلمية المتكررة تُصاغ دائما بالنوع 0 (Present Simple + Present Simple).'
			},
			{
				questionAr: 'Identify the conditional type: "If people wasted less food, poverty would decline."',
				options: ['Conditional Type 0', 'Conditional Type 1', 'Conditional Type 2', 'Passive Voice'],
				correctIndex: 2,
				diagnosticFeedback: [
					'النوع 0 يستعمل الحاضر البسيط في الشطرين.',
					'النوع 1 يستعمل الحاضر البسيط مع will.',
					'صحيح! wasted (Past Simple) مع would decline يدلان على النوع 2.',
					'الجملة مبنية للمعلوم وليست مبنية للمجهول.'
				],
				explanationAr: 'تركيب (If + Past Simple, would + stem) هو صيغة الشرط من النوع الثاني (Type 2).'
			}
		]
	},

	// [4] Cause & Result Connectors (because / owing to / as a result / consequently)
	{
		id: 'eng_lesson_2as_sci_t2_cause_result_connectors',
		slug: 'eng-2as-sci-t2-cause-result-connectors',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not — الطاقات المتجددة وحماية الموارد',
		order: 4,
		titleAr: 'روابط السبب والنتيجة (because / owing to / as a result / consequently)',
		objectives: [
			'التمييز الواضح بين روابط السبب (Cause) وروابط النتيجة (Result)',
			'التفريق النحوي الدقيق بين الروابط المتبوعة بجملة كاملة (Clause) والروابط المتبوعة باسم أو مصدر (Noun Phrase)',
			'ربط الجمل وإعادة صياغتها في تمرين (Combine pairs of sentences) بمهارة عالية'
		],
		keywordsAr: ['Cause', 'Result', 'because', 'since', 'owing to', 'due to', 'as a result', 'consequently', 'therefore'],
		discover: {
			scenarioAr:
				'تأمل هاتين الجملتين حول التلوث: «ارتفعت الحرارة لأن المصانع تطلق غازات كثيرة (because factories emit gases)»، و«ارتفعت الحرارة بسبب انبعاث الغازات (owing to gas emissions)»، و«تطلق المصانع غازات كثيرة؛ ونتيجة لذلك ارتفعت الحرارة (consequently, temperatures rose)». نفس المعنى بثلاث صيغ مختلفة!',
			svg: svgEnglishGrammarMap({
				title: 'Cause & Result Connectors',
				rootLabel: 'Linking Cause & Effect',
				rootSub: 'Check what follows: Clause vs Noun Phrase',
				branches: [
					{ label: 'Cause + Clause', rule: 'because / since / as + S + V', example: 'because rain fell' },
					{ label: 'Cause + Noun', rule: 'owing to / due to / because of', example: 'owing to heavy rain' },
					{ label: 'Result', rule: 'as a result / consequently / therefore', example: 'Consequently, crops grew.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق البنيوي بين ما جاء بعد (because) وما جاء بعد (owing to) في المثال السابق؟',
					hintAr: 'هل تحتوي عبارة (gas emissions) على فعل مصرف؟',
					expectedInput: 'بعد because جملة كاملة (فاعل وفعل)، وبعد owing to اسم فقط',
					revealAr:
						'تُتبع (because / since / as) بجملة كاملة (Subject + Verb)، أما (owing to / due to / because of) فتُتبع باسم أو عبارة اسمية أو (V-ing) دون فعل مصرف.'
				},
				{
					promptAr: 'إذا أردنا الربط بـ (consequently) أو (as a result)، أي الجملتين نضعها أولاً: السبب أم النتيجة؟',
					hintAr: 'فكّر في المعنى المنطقي: «حدث السبب؛ ونتيجةً لذلك حدثت النتيجة».',
					expectedInput: 'نضع جملة السبب أولاً ثم أداة النتيجة ثم جملة النتيجة',
					revealAr:
						'مع روابط النتيجة (as a result, consequently, therefore, so, thus) نكتب السبب أولاً، ثم الرابط، ثم النتيجة: السبب + ; consequently, + النتيجة.'
				},
				{
					promptAr: 'كيف نحوّل الجملة «The climate is hot» إلى عبارة اسمية (Noun Phrase) لوضعها بعد (owing to)؟',
					hintAr: 'حوّل الصفة (hot) إلى اسم أو ضعها قبل الاسم (climate).',
					expectedInput: 'owing to the hot climate (أو owing to the heat)',
					revealAr:
						'نحوّل الجملة إلى عبارة اسمية إما بنقل الصفة قبل الاسم (the hot climate) أو بتحويل الصفة/الفعل إلى اسم (the heat) أو باستعمال (the fact that + Clause).'
				}
			]
		},
		summary: {
			rulesAr: [
				'روابط السبب المتبوعة بجملة كاملة (Subject + Verb): because, since, as. مثال: Solar power is growing because sunlight is abundant.',
				'روابط السبب المتبوعة بعبارة اسمية أو (V-ing): because of, owing to, due to, thanks to (للسبب الإيجابي). مثال: Solar power is growing owing to abundant sunlight.',
				'روابط النتيجة (متبوعة بجملة النتيجة): as a result, consequently, therefore, thus, so. مثال: Sunlight is abundant; as a result, solar power is growing.',
				'ملاحظة الترقيم: قبل (as a result / consequently / therefore) نضع نقطة أو فاصلة منقوطة (;) وبعدها فاصلة (,). أما (so) فتُسبق بفاصلة فقط.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'How to Combine Sentences in the Exam',
				steps: [
					{ stage: 'Identify Roles', detail: 'Mark which sentence is CAUSE and which is RESULT' },
					{ stage: 'Check Connector', detail: 'Does it introduce CAUSE or RESULT?' },
					{ stage: 'Check Grammar', detail: 'Clause (because) vs Noun Phrase (owing to / due to)' },
					{ stage: 'Punctuate Well', detail: 'Use semicolon + comma with consequently / as a result' }
				]
			}),
			visualCaptionAr: 'منهجية ربط الجمل بروابط السبب والنتيجة في تمرين Text Exploration',
			examples: [
				{
					problemAr: 'Combine with "owing to": Many wells dried up. There was a long drought.',
					solutionAr: 'Many wells dried up owing to the long drought.'
				},
				{
					problemAr: 'Combine with "consequently": Factories dumped waste carelessly. The river became polluted.',
					solutionAr: 'Factories dumped waste carelessly; consequently, the river became polluted.'
				},
				{
					problemAr: 'Combine with "because": Wind energy is clean. It produces no harmful gases.',
					solutionAr: 'Wind energy is clean because it produces no harmful gases.'
				}
			],
			watchOutAr:
				'إياك أن تضع جملة كاملة (Subject + Verb) مباشرة بعد (owing to / due to / because of) مثل: (owing to it rained)! الصحيح هو: (owing to the rain) أو (owing to the fact that it rained).'
		},
		practice: [
			{
				questionAr: 'Choose the right connector: "Many crops failed ........ the severe drought."',
				options: ['because', 'owing to', 'consequently', 'therefore'],
				correctIndex: 1,
				diagnosticFeedback: [
					'because تتطلب جملة كاملة (فاعل وفعل) بينما the severe drought عبارة اسمية.',
					'صحيح! owing to تُتبع بعبارة اسمية (Noun Phrase) وتدل على السبب.',
					'consequently رابط نتيجة لا سبب.',
					'therefore رابط نتيجة لا سبب.'
				],
				explanationAr: 'العبارة the severe drought اسمية (بلا فعل)، والرابط السببي المناسب لها هو owing to أو due to.'
			},
			{
				questionAr: 'Choose the right connector: "The team insulated the building well; ........, heating costs dropped by 40%."',
				options: ['because of', 'due to', 'as a result', 'since'],
				correctIndex: 2,
				diagnosticFeedback: [
					'because of للسبب وتُتبع باسم.',
					'due to للسبب وتُتبع باسم.',
					'أحسنت! انخفاض التكاليف نتيجة للعزل الجيد، فنستعمل as a result.',
					'since رابط سبب لا نتيجة.'
				],
				explanationAr: 'الجملة الثانية نتيجة للأولى، فيلزم رابط نتيجة مثل as a result أو consequently.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'Solar energy is popular due to it is renewable.',
					'Solar energy is popular because its low cost.',
					'Solar energy is popular owing to its low maintenance cost.',
					'Consequently the sun shines brightly, panels produce power.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'due to لا تُتبع بجملة كاملة (it is renewable).',
					'because تحتاج إلى فعل مصرف بعد its low cost.',
					'ممتاز! owing to متبوعة بعبارة اسمية صحيحة تماما.',
					'consequently تأتي قبل النتيجة لا قبل السبب.'
				],
				explanationAr: 'الرابط owing to يُتبع بعبارة اسمية سليمة (its low maintenance cost).'
			},
			{
				questionAr: 'Combine correctly with "because": (A) Forests are shrinking. (B) People cut down trees illegally.',
				options: [
					'People cut down trees illegally because forests are shrinking.',
					'Forests are shrinking because people cut down trees illegally.',
					'Forests are shrinking because of people cut down trees illegally.',
					'Because forests are shrinking, people cut down trees.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست السبب والنتيجة!',
					'صحيح! قطع الأشجار هو السبب وتناقص الغابات هو النتيجة.',
					'because of لا تُتبع بجملة كاملة.',
					'السبب هو قطع الأشجار وليس العكس.'
				],
				explanationAr: 'تأتي جملة السبب (people cut down trees) مباشرة بعد because.'
			},
			{
				questionAr: 'Which pair contains ONLY Result connectors?',
				options: [
					'since / owing to',
					'consequently / therefore',
					'because / due to',
					'as / because of'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'كلاهما رابطا سبب.',
					'إجابة دقيقة! consequently و therefore رابطا نتيجة.',
					'كلاهما رابطا سبب.',
					'كلاهما رابطا سبب.'
				],
				explanationAr: 'روابط النتيجة هي: as a result, consequently, therefore, thus, so.'
			}
		]
	},

	// [5] Word Stress (-ic, -tion, -sion) & Writing a Science / Conservation Report
	{
		id: 'eng_lesson_2as_sci_t2_word_stress_science_writing',
		slug: 'eng-2as-sci-t2-word-stress-science-writing',
		grade: '2as_se',
		yearSubjectId: 676,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Budding Scientist — العالم الناشئ والتجارب العلمية',
		order: 5,
		titleAr: 'النبر في الكلمات المنتهية بـ (-ic, -tion, -sion) وكتابة تقرير علمي أو بيئي',
		objectives: [
			'تحديد المقطع المنبور (Stressed Syllable) بدقة في الكلمات المنتهية بـ (-ic, -tion, -sion)',
			'تقطيع الكلمات العلمية إلى مقاطع صوتية (Syllables) دون أخطاء',
			'كتابة تقرير علمي أو بيان بيئي حول الطاقة المتجددة أو تجربة مخبرية (5 pts)'
		],
		keywordsAr: ['Word Stress', 'Penultimate syllable', '-ic', '-tion', '-sion', 'Science Report', 'Press Release'],
		discover: {
			scenarioAr:
				'انطق بصوت مسموع هذه الكلمات العلمية: (sci-en-TIF-ic / e-lec-TRIC / pol-LU-tion / con-ser-VA-tion / ex-PLO-sion). هل لاحظت أين يقع الضغط الصوتي القوي (Stress) في جميع هذه الكلمات؟ دائما على المقطع الذي يسبق اللاحقة مباشرة!',
			svg: svgEnglishPhoneticsChart({
				title: 'Word Stress Rule: -ic, -tion, -sion',
				subtitle: 'Stress ALWAYS falls on the syllable BEFORE the suffix (Penultimate)',
				columns: [
					{ sound: '-ic', rule: '2nd syllable from end', examples: 'sci-en-TIF-ic, a-TOM-ic' },
					{ sound: '-tion', rule: '2nd syllable from end', examples: 'pol-LU-tion, so-LU-tion' },
					{ sound: '-sion', rule: '2nd syllable from end', examples: 'de-CI-sion, ex-PLO-sion' }
				]
			}),
			steps: [
				{
					promptAr: 'في كلمة (con-ser-va-tion) المكونة من 4 مقاطع، على أي مقطع يقع النبر (Stress)؟',
					hintAr: 'عدّ من النهاية: المقطع الأخير هو (tion)، والمقطع الذي قبله مباشرة هو ما قبل الأخير.',
					expectedInput: 'على المقطع الثالث (VA): con-ser-VA-tion',
					revealAr:
						'الكلمة تنتهي بـ (-tion)، إذن يقع النبر على المقطع ما قبل الأخير (Penultimate syllable)، وهو المقطع الثالث: con-ser-VA-tion.'
				},
				{
					promptAr: 'جرّب القاعدة نفسها على الكلمة العلمية (e-co-nom-ic) المكونة من 4 مقاطع: أين يقع النبر؟',
					hintAr: 'انظر إلى المقطع الذي يسبق (-ic) مباشرة.',
					expectedInput: 'على المقطع الثالث (NOM): e-co-NOM-ic',
					revealAr:
						'لأنها تنتهي بـ (-ic)، يقع النبر على المقطع الذي قبلها مباشرة: e-co-NOM-ic (المقطع الثالث من البداية / الثاني من النهاية).'
				},
				{
					promptAr: 'ما أهم العناصر التي ينبغي أن يحتويها تقرير قصير عن تجربة علمية أو مشروع طاقة نظيفة؟',
					hintAr: 'فكّر في خطوات العالم الناشئ: الهدف، المواد والطريقة، النتيجة، والاستنتاج.',
					expectedInput: 'الهدف + الخطوات بالمبني للمجهول + النتيجة العلمية + الخاتمة',
					revealAr:
						'التقرير العلمي الواضح يبدأ بالهدف (Aim)، ثم الخطوات بلغة موضوعية (Passive Voice أو Type 0)، ثم الملاحظة والنتيجة (Result)، وأخيراً الاستنتاج (Conclusion).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية للنبر (Word Stress): جميع الكلمات المنتهية باللواحق (-ic / -tion / -sion) يُنبر فيها المقطع ما قبل الأخير (Penultimate syllable — الثاني من النهاية).',
				'أمثلة (-ic): e-LEC-tric (2)، a-TOM-ic (2)، sci-en-TIF-ic (3)، e-co-NOM-ic (3)، e-ner-GET-ic (3).',
				'أمثلة (-tion / -sion): NA-tion (1)، pol-LU-tion (2)، in-VEN-tion (2)، con-ser-VA-tion (3)، ex-PLO-sion (2)، con-CLU-sion (2).',
				'منهجية كتابة تقرير علمي أو بيئي (5 pts): اختر عنوانا دقيقا، قدّم المشكلة أو هدف التجربة، صف الخطوات أو الحلول باستعمال المبني للمجهول (can be saved / is heated) وروابط السبب والنتيجة (consequently / owing to)، واختم بتوصية واضحة.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Writing a Science / Conservation Report (5 pts)',
				steps: [
					{ stage: 'Title & Aim', detail: 'State the environmental issue or experiment goal' },
					{ stage: 'Facts & Steps', detail: 'Use Passive Voice & Type 0 Conditionals clearly' },
					{ stage: 'Causes & Results', detail: 'Link ideas with owing to, because, consequently' },
					{ stage: 'Conclusion', detail: 'Give practical advice using must / should / can' }
				]
			}),
			visualCaptionAr: 'الهيكل النموذجي لتقرير علمي أو بيئي يحقق العلامة الكاملة في 2AS',
			examples: [
				{
					problemAr: 'Underline/capitalize the stressed syllable: (1) invention, (2) scientific, (3) conclusion, (4) electricity?',
					solutionAr: '(1) in-VEN-tion (2nd) | (2) sci-en-TIF-ic (3rd) | (3) con-CLU-sion (2nd). تنبيه: كلمة electricity تنتهي بـ -ity فنبرها على المقطع الثالث من النهاية: e-lec-TRI-ci-ty!'
				},
				{
					problemAr: 'Write two objective sentences describing a simple filtration experiment.',
					solutionAr: 'First, muddy water is poured through clean sand and gravel inside a funnel. As a result, solid particles are trapped, and clearer water is collected in the beaker.'
				}
			],
			watchOutAr:
				'لا تخلط بين (-ic / -tion / -sion) التي تُنبر على المقطع الثاني من النهاية (Penultimate)، وبين (-ity / -gy / -phy) مثل (e-lec-TRI-ci-ty / bi-OL-o-gy) التي تُنبر على المقطع الثالث من النهاية!'
		},
		practice: [
			{
				questionAr: 'Where does the primary stress fall in the word "pollution" (pol-lu-tion)?',
				options: ['1st syllable (POL)', '2nd syllable (LU)', '3rd syllable (TION)', 'No stressed syllable'],
				correctIndex: 1,
				diagnosticFeedback: [
					'النبر في كلمات -tion لا يقع على المقطع الأول هنا.',
					'صحيح! يقع النبر على المقطع الذي يسبق -tion مباشرة: pol-LU-tion.',
					'اللاحقة -tion لا تكون منبورة أبدا.',
					'كل كلمة متعددة المقاطع لها مقطع منبور.'
				],
				explanationAr: 'الكلمات المنتهية بـ -tion يُنبر فيها المقطع ما قبل الأخير (المقطع الثاني في pol-LU-tion).'
			},
			{
				questionAr: 'Which syllable is stressed in the word "scientific" (sci-en-tif-ic)?',
				options: ['1st (SCI)', '2nd (EN)', '3rd (TIF)', '4th (IC)'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المقطع الأول ثانوي.',
					'المقطع الثاني غير منبور.',
					'ممتاز! قبل اللاحقة -ic مباشرة يقع النبر: sci-en-TIF-ic (المقطع الثالث).',
					'اللاحقة -ic نفسها غير منبورة.'
				],
				explanationAr: 'في الكلمات المنتهية بـ -ic يقع النبر على المقطع ما قبل الأخير: sci-en-TIF-ic.'
			},
			{
				questionAr: 'Choose the word stressed on the SECOND syllable:',
				options: ['conservation', 'decision', 'scientific', 'nation'],
				correctIndex: 1,
				diagnosticFeedback: [
					'con-ser-VA-tion منبورة على المقطع الثالث.',
					'صحيح! de-CI-sion منبورة على المقطع الثاني.',
					'sci-en-TIF-ic منبورة على المقطع الثالث.',
					'NA-tion منبورة على المقطع الأول.'
				],
				explanationAr: 'الكلمة de-CI-sion تتكون من 3 مقاطع وتنتهي بـ -sion، فنبرها على المقطع الثاني (CI).'
			},
			{
				questionAr: 'How many syllables are in the word "conservation" (con-ser-va-tion)?',
				options: ['2 syllables', '3 syllables', '4 syllables', '5 syllables'],
				correctIndex: 2,
				diagnosticFeedback: [
					'عدد المقاطع أكبر من 2.',
					'أعد عد الأصوات المتحركة المنطوقة.',
					'أحسنت! تتكون من 4 مقاطع: con / ser / va / tion.',
					'تنتهي بـ tion وهو مقطع واحد لا مقطعان.'
				],
				explanationAr: 'المقطع -tion يُحسب مقطعا صوتيا واحدا، فيكون المجموع 4 مقاطع.'
			},
			{
				questionAr: 'Which sentence uses the best objective scientific style for a lab report?',
				options: [
					'Hey guys, I just mixed two things and boom!',
					'The mixture is heated gently until a clear solution is obtained.',
					'Maybe the water will like the salt.',
					'We had fun playing in the lab yesterday.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أسلوب عامي لا يليق بتقرير علمي.',
					'ممتاز! لغة علمية موضوعية توظف المبني للمجهول بدقة.',
					'تعبير غير علمي وغير دقيق.',
					'جملة شخصية غير موضوعية.'
				],
				explanationAr: 'التقرير العلمي المنهجي يستعمل أسلوبا موضوعيا دقيقا غالبا بالمبني للمجهول (is heated / is obtained).'
			}
		]
	}
];
