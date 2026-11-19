import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';

export const LESSONS_2AS_LP_T2: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_lp_t2_modals_obligation',
		slug: 'eng-2as-lp-t2-modals-obligation',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Make Peace & Waste Not, Want Not',
		order: 1,
		titleAr: 'الأفعال الناقصة للوجوب والقدرة والعتاب (Must, Have to, Was able to, Should have)',
		objectives: [
			'التمييز بين الوجوب الداخلي والخارجي (must / have to) والمنع (must not) وغياب الوجوب (do not have to)',
			'التعبير عن القدرة العامة في الماضي (could) والإنجاز المحدد (was/were able to)',
			'توظيف صيغة العتاب أو الندم على الماضي (should have / should not have + Past Participle)'
		],
		keywordsAr: ['must', 'have to', 'was able to', 'should have', 'Make Peace', 'modals'],
		discover: {
			scenarioAr:
				'في نقاش حول السلم الاجتماعي وحل النزاعات بالحكمة، يقول الأستاذ: "Citizens must respect one another. Last year, community elders were able to settle a long dispute peacefully, because both sides realized they should have listened earlier."',
			svg: svgEnglishGrammarMap({
				title: 'Modals of Obligation, Ability and Criticism',
				rootLabel: 'Key Modals (2AS LP)',
				rootSub: 'Meaning depends on form and tense',
				branches: [
					{
						label: 'Obligation',
						rule: 'must / have to + Stem',
						example: 'We must protect public water.'
					},
					{
						label: 'Prohibition vs No Need',
						rule: 'mustn\'t vs don\'t have to',
						example: 'You mustn\'t waste bread.'
					},
					{
						label: 'Past Achievement',
						rule: 'was / were able to + Stem',
						example: 'They were able to agree.'
					},
					{
						label: 'Past Criticism',
						rule: 'should (not) have + P.P.',
						example: 'He should have spoken calmly.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين: "You must not pollute the river." و "You do not have to bring plastic bags." أيهما تعني المنع التام وأيهما تعني عدم الضرورة؟',
					hintAr: 'تأمل الفرق في المعنى بين المنع (prohibition) وعدم الإلزام (absence of obligation).',
					expectedInput: 'must not للمنع و do not have to لعدم الضرورة',
					revealAr:
						'تستعمل must not للمنع الصارم، بينما تستعمل do not / does not have to للدلالة على أن الفعل اختياري غير واجب.'
				},
				{
					promptAr:
						'في الجملة: "Despite the difficult debate, the mediators were able to reach a fair pact." لماذا فضلنا were able to على could؟',
					hintAr: 'هل الحديث عن قدرة عامة أم عن نجاح فعلي في موقف محدد بالماضي؟',
					expectedInput: 'لأنها تصف نجاحا فعليا في موقف محدد بالماضي',
					revealAr:
						'للتعبير عن النجاح الفعلي في إنجاز مهمة محددة في الماضي (الإثبات)، نستخدم was / were able to (أو managed to) بدل could.'
				},
				{
					promptAr:
						'تأمل: "They wasted clean water. They should have fixed the leaking pipe." ما الغرض من should have + Past Participle؟',
					hintAr: 'هل أصلحوا الأنبوب فعلا أم نلومهم على تقصيرهم؟',
					expectedInput: 'العتاب أو اللوم على فعل واجب لم ينجز في الماضي',
					revealAr:
						'نستعمل should have + Past Participle للتعبير عن العتاب أو الندم على أمر حسن لم يقع في الماضي، و should not have + P.P. للعتاب على خطأ وقع.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الوجوب (Obligation): نستخدم must للالتزام القوي والمبدئي، و have to / has to للقواعد الخارجية، وفي الماضي نستخدم had to لكليهما.',
				'المنع مقابل عدم الوجوب: must not + Stem تفيد التحريم والمنع؛ أما do/does not have to + Stem فتفيد غياب الوجوب فقط.',
				'القدرة في الماضي: could + Stem للقدرة العامة في الماضي، و was/were able to + Stem للتمكن الفعلي من إنجاز عمل في موقف محدد.',
				'العتاب والندم في الماضي (Past Criticism / Regret): Subject + should (not) have + Past Participle. مثال: We should have saved energy.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Past Criticism and Regret',
				tenseName: 'should (not) have + Past Participle',
				formula: 'Subj + should have + V3 (Past Participle)',
				activeZone: 'past',
				example: 'The factory should have recycled its waste water.',
				markers: 'yesterday, last year, in the past, earlier'
			}),
			visualCaptionAr: 'استعمال should have + V3 للعتاب على سلوك ماض غير صائب',
			examples: [
				{
					problemAr: 'Express criticism about this past mistake: "He spoke harshly during the neighbourhood meeting."',
					solutionAr: 'He should not have spoken harshly during the neighbourhood meeting. (أو: He should have spoken politely.)'
				},
				{
					problemAr: 'Choose the right modal: "Yesterday, volunteers (could / were able to) plant three hundred trees before sunset."',
					solutionAr: 'Yesterday, volunteers were able to plant three hundred trees before sunset.'
				}
			],
			watchOutAr:
				'لا تخلط بين must not و do not have to؛ فالأولى تعني ممنوع والثانية تعني ليس ضروريا. وانتبه أن الماضي من must هو had to وليس musted.'
		},
		practice: [
			{
				questionAr: 'Choose the correct modal for strict prohibition: "Drivers ...... throw litter from car windows into the forest."',
				options: ['do not have to', 'must not', 'were able to', 'should have'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: do not have to تعني ليس ضروريا لا ممنوعا.',
					'صحيح! must not تعبر عن المنع القاطع.',
					'خطأ: were able to تدل على القدرة في الماضي.',
					'خطأ: should have تدل على عتاب في الماضي.'
				],
				explanationAr: 'نستعمل must not + Stem للتعبير عن المنع الصارم.'
			},
			{
				questionAr: 'Select the best modal for a specific past achievement: "After hours of dialogue, the two teams ...... resolve the disagreement."',
				options: ['must', 'were able to', 'should have', 'have to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: must لا تعبر عن إنجاز ماض.',
					'أحسنت! were able to تعبر عن النجاح الفعلي في موقف محدد بالماضي.',
					'خطأ: should have تفيد أنهم لم يحلوا الخلاف.',
					'خطأ: have to للوجوب في الحاضر.'
				],
				explanationAr: 'للتعبير عن إنجاز محدد تحقق في الماضي نستخدم was/were able to.'
			},
			{
				questionAr: 'Complete the sentence to express past criticism: "The city ...... built better drainage canals before the heavy rains."',
				options: ['should build', 'should have', 'has to', 'must build'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل built تصريف ثالث (P.P.) ويحتاج should have قبله.',
					'صحيح! should have + built تعبر عن عتاب حول تقصير في الماضي.',
					'خطأ: has to يتبعها المصدر المجرد لا التصريف الثالث.',
					'خطأ: must build لا تلائم وجود built.'
				],
				explanationAr: 'صيغة العتاب في الماضي هي should have + Past Participle.'
			},
			{
				questionAr: 'What is the correct past tense of obligation in: "Last winter, villagers ...... repair the stone bridge."?',
				options: ['must', 'had to', 'has to', 'will have to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: must لا تستعمل للوجوب في الزمن الماضي.',
					'صحيح! الماضي من must و have to هو had to.',
					'خطأ: has to للمضارع المفرد.',
					'خطأ: will have to للمستقبل.'
				],
				explanationAr: 'صيغة الوجوب في الزمن الماضي هي had to + Stem.'
			},
			{
				questionAr: 'Choose the sentence that means "It was not necessary to print the whole report":',
				options: [
					'You must not print the whole report.',
					'You did not have to print the whole report.',
					'You should have printed the whole report.',
					'You were able to print the whole report.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه الجملة تعني المنع في الحاضر.',
					'ممتاز! did not have to تعبر عن غياب الضرورة في الماضي.',
					'خطأ: هذه الجملة تعني أنه كان ينبغي طباعته.',
					'خطأ: هذه الجملة تعني القدرة لا غياب الضرورة.'
				],
				explanationAr: 'نستخدم did not have to + Stem للتعبير عن عدم ضرورة الفعل في الماضي.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t2_passive_voice',
		slug: 'eng-2as-lp-t2-passive-voice',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Make Peace & Waste Not, Want Not',
		order: 2,
		titleAr: 'المبني للمجهول في الأزمنة الأساسية والأفعال الناقصة (Passive Voice)',
		objectives: [
			'تحويل الجمل من المبني للمعلوم (Active) إلى المبني للمجهول (Passive) في الحاضر والماضي والمستقبل',
			'بناء المبني للمجهول مع الأفعال الناقصة (must be, can be, should be + Past Participle)',
			'توظيف المبني للمجهول في نصوص البيئة والطاقة النظيفة والعمل الجماعي'
		],
		keywordsAr: ['Passive Voice', 'Waste Not Want Not', 'be + Past Participle', 'المبني للمجهول'],
		discover: {
			scenarioAr:
				'في وحدة Waste Not, Want Not نركز على الموارد الطبيعية نفسها أكثر من التركيز على الشخص الفاعل، لذلك نقرأ كثيرا: "Rainwater is collected in traditional basins" و "Forests must be protected against fire."',
			svg: svgEnglishGrammarMap({
				title: 'Passive Voice Formula by Tense',
				rootLabel: 'Object + BE (same tense) + V3',
				rootSub: 'Add (by + Agent) only if necessary',
				branches: [
					{
						label: 'Present Simple',
						rule: 'am / is / are + V3',
						example: 'Glass is recycled daily.'
					},
					{
						label: 'Past Simple',
						rule: 'was / were + V3',
						example: 'Trees were planted here.'
					},
					{
						label: 'Future Simple',
						rule: 'will be + V3',
						example: 'Water will be saved.'
					},
					{
						label: 'With Modals',
						rule: 'modal + be + V3',
						example: 'Energy must be conserved.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حول الجملة التالية خطوة بخطوة: "Volunteers clean the beach every Friday." ما المفعول به الذي سيصبح في بداية جملة المبني للمجهول؟',
					hintAr: 'اسأل: ماذا ينظف المتطوعون؟',
					expectedInput: 'The beach',
					revealAr:
						'نبدأ بالمفعول به The beach ثم نضع الفعل be في نفس زمن الجملة الأصلية (is) متبوعا بالتصريف الثالث: "The beach is cleaned by volunteers every Friday."'
				},
				{
					promptAr:
						'في الجملة: "Engineers built a solar station in Adrar in 2020." ما الزمن الأصلي وما الصيغة المناسبة للفعل be؟',
					hintAr: 'الفعل built في الماضي البسيط والاسم a solar station مفرد.',
					expectedInput: 'Past Simple فنستعمل was built',
					revealAr:
						'بما أن الزمن ماض بسيط ونائب الفاعل مفرد، نكتب: "A solar station was built in Adrar in 2020."'
				},
				{
					promptAr:
						'كيف نحول الجملة التي تحتوي فعلا ناقصا: "Citizens must preserve water resources." إلى المبني للمجهول؟',
					hintAr: 'تذكر القاعدة: modal + be + Past Participle.',
					expectedInput: 'Water resources must be preserved by citizens.',
					revealAr:
						'مع الأفعال الناقصة (must, should, can, will, may) نضع be في المصدر ثم التصريف الثالث: must be preserved.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية للمبني للمجهول: المفعول به (Object) + تصريف فعل (to be) في نفس زمن الجملة المعلومة + التصريف الثالث للفعل (Past Participle / V3).',
				'الحاضر البسيط: is / are + V3. والماضي البسيط: was / were + V3.',
				'المستقبل والأفعال الناقصة: will / can / must / should / may + be + V3.',
				'متى نذكر by + Agent؟ نذكرها فقط عندما يكون الفاعل محددا ومهما، ونحذفها إذا كان الفاعل عاما مثل people أو someone أو they.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Active to Passive Transformation',
				tenseName: 'Keeping the Original Tense',
				formula: 'Active V to Passive: be (same tense) + V3',
				activeZone: 'present',
				example: 'Active: They protect forests. | Passive: Forests are protected.',
				markers: 'Check singular/plural agreement with the new subject'
			}),
			visualCaptionAr: 'الحفاظ على الزمن الأصلي مع مطابقة العدد عند التحويل للمبني للمجهول',
			examples: [
				{
					problemAr: 'Rewrite in the passive voice: "The local council planted five thousand cedar trees last autumn."',
					solutionAr: 'Five thousand cedar trees were planted by the local council last autumn.'
				},
				{
					problemAr: 'Rewrite in the passive voice: "People should reduce plastic packaging to protect marine life."',
					solutionAr: 'Plastic packaging should be reduced to protect marine life.'
				}
			],
			watchOutAr:
				'احذر من خطأين شائعين: لا تغير الزمن الأصلي (مثلا لا تحول المضارع إلى was)، ولا تنس مطابقة is/are أو was/were مع نائب الفاعل الجديد (مفرد أم جمع) وليس مع الفاعل القديم.'
		},
		practice: [
			{
				questionAr: 'Choose the correct passive form: "Paper and cardboard ...... in specialized centres."',
				options: ['recycle', 'are recycled', 'is recycled', 'was recycled'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: recycle مبني للمعلوم والورق لا يعيد تدوير نفسه.',
					'صحيح! الفاعل جمع (Paper and cardboard) والحقيقة في المضارع فتأخذ are recycled.',
					'خطأ: الاسم المعطوف هنا جمع فيأخذ are لا is.',
					'خطأ: was للمفرد الماضي.'
				],
				explanationAr: 'لوجود فاعل جمع وحقيقة عامة في المضارع نستخدم are + Past Participle.'
			},
			{
				questionAr: 'Transform accurately: "Algerian engineers designed an efficient irrigation system."',
				options: [
					'An efficient irrigation system is designed by Algerian engineers.',
					'An efficient irrigation system was designed by Algerian engineers.',
					'An efficient irrigation system were designed by Algerian engineers.',
					'An efficient irrigation system designed by Algerian engineers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الزمن الأصلي ماض بسيط (designed) فلا نستخدم is.',
					'ممتاز! مفرد + ماض بسيط = was designed.',
					'خطأ: system مفرد فيأخذ was لا were.',
					'خطأ: ينقصها الفعل المساعد was.'
				],
				explanationAr: 'لأن designed ماض بسيط والمفعول به مفرد، نستعمل was designed.'
			},
			{
				questionAr: 'Select the right passive form with a modal: "Freshwater springs ...... from industrial waste."',
				options: ['must protect', 'must be protected', 'must been protected', 'are must protected'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه صيغة مبني للمعلوم.',
					'أحسنت! القاعدة مع الأفعال الناقصة هي modal + be + V3.',
					'خطأ: بعد must يأتي المصدر be لا been.',
					'خطأ: ترتيب الكلمات غير صحيح.'
				],
				explanationAr: 'صيغة المبني للمجهول مع must هي must be + Past Participle.'
			},
			{
				questionAr: 'Choose the right passive sentence in the future: "The school will organize a clean-up campaign tomorrow."',
				options: [
					'A clean-up campaign will organized tomorrow.',
					'A clean-up campaign will be organized tomorrow.',
					'A clean-up campaign is organized tomorrow.',
					'A clean-up campaign was organized tomorrow.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ينقص الفعل be بعد will.',
					'صحيح! المستقبل المبني للمجهول هو will be + V3.',
					'خطأ: غيرت الزمن من المستقبل إلى الحاضر.',
					'خطأ: غيرت الزمن إلى الماضي.'
				],
				explanationAr: 'في المستقبل البسيط نصوغ المبني للمجهول بـ will be + Past Participle.'
			},
			{
				questionAr: 'In which passive sentence is it best to OMIT "by + agent"?',
				options: [
					'The Great Mosque of Tlemcen was expanded by Yusuf ibn Tashfin.',
					'Thousands of trees are cut down illegally every year (by someone).',
					'The solar pump was invented by our school science club.',
					'The peace agreement was signed by both community leaders.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل هنا شخصية تاريخية مهمة فذكره مفيد.',
					'صحيح! عندما يكون الفاعل مجهولا أو عاما مثل someone نحذف by someone.',
					'خطأ: ذكر الفاعل هنا يضيف معلومة دقيقة.',
					'خطأ: ذكر الطرفين الموقعين ضروري للمعنى.'
				],
				explanationAr: 'نحذف الفاعل المجهول أو العام (someone, people, they) في جملة المبني للمجهول.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t2_word_building',
		slug: 'eng-2as-lp-t2-word-building',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Make Peace & Waste Not, Want Not',
		order: 3,
		titleAr: 'اشتقاق الكلمات وتكوين المفردات (Verb / Noun / Adjective)',
		objectives: [
			'بناء عائلة الكلمة (Verb / Noun / Adjective) باستعمال اللواحق القياسية في الإنجليزية',
			'استعمال السوابق النافية (un-, in-, im-, il-, ir-, dis-) لتكوين الأضداد بدقة',
			'إكمال جدول الاشتقاق المتكرر في الجزء الثاني من الامتحان (Text Exploration)'
		],
		keywordsAr: ['Word Building', 'Suffixes', 'Prefixes', 'Verb Noun Adjective', 'الاشتقاق'],
		discover: {
			scenarioAr:
				'في كل امتحان ثانوي تقريبا يرد جدول (Verb / Noun / Adjective). تأمل عائلة كلمة conserve في موضوع البيئة: الفعل conserve (يحافظ)، الاسم conservation (المحافظة)، والصفة conservative / conserved.',
			svg: svgEnglishWordFormation({
				title: 'Word Formation Anatomy (Prefix + Root + Suffix)',
				prefix: 're-',
				root: 'new',
				suffix: '-able',
				derivedWord: 'renewable',
				meaningNote: 'Prefix changes meaning (again) | Suffix changes category (Adjective)'
			}),
			steps: [
				{
					promptAr:
						'انظر إلى الأسماء: protection, pollution, conservation, cooperation. ما اللاحقة (Suffix) التي حولت الأفعال إلى أسماء؟',
					hintAr: 'تأمل النهاية المشتركة للكلمات الأربع.',
					expectedInput: '-tion / -ation',
					revealAr:
						'اللاحقة -tion / -ation من أشهر لواحق تكوين الاسم (Noun) من الفعل، إلى جانب -ment و -ance و -ity.'
				},
				{
					promptAr:
						'كيف نشتق الصفة (Adjective) من الاسم peace ومن الفعل protect ومن الاسم harmony؟',
					hintAr: 'جرب اللواحق -ful و -ive و -ous.',
					expectedInput: 'peaceful / protective / harmonious',
					revealAr:
						'نستعمل -ful (peaceful), -ive (protective), -ous (harmonious), -able (renewable), -al (environmental) لتكوين الصفات.'
				},
				{
					promptAr:
						'ما السابقة النافية (Negative Prefix) المناسبة لكل من: responsible, legal, possible, fair؟',
					hintAr: 'انتبه للحرف الأول في كل كلمة: r يأخذ ir، و l يأخذ il، و p يأخذ im.',
					expectedInput: 'irresponsible / illegal / impossible / unfair',
					revealAr:
						'قاعدة مساعدة: قبل r نستعمل ir-، وقبل l نستعمل il-، وقبل m/p نستعمل im-، ومع كثير من الصفات العامة نستعمل un- أو dis-.'
				}
			]
		},
		summary: {
			rulesAr: [
				'لواحق الأسماء (Noun Suffixes): -tion / -sion (protection, decision), -ment (agreement, development), -ity (equality, responsibility), -ance / -ence (tolerance, violence).',
				'لواحق الصفات (Adjective Suffixes): -ful (peaceful, helpful), -less (harmless), -able / -ible (renewable, responsible), -ive (active, protective), -al (natural, global), -ous (dangerous).',
				'لواحق الأفعال (Verb Suffixes): -ize / -ise (modernize, organize), -ify (purify, simplify), -ate (cooperate, educate), -en (strengthen).',
				'سوابق الأضداد (Opposites): im- قبل p/m (impossible, immoral)، il- قبل l (illegal)، ir- قبل r (irresponsible)، و un- / in- / dis- في بقية الكلمات (unfair, inactive, disagree).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Common Exam Suffixes for 2AS LP',
				rootLabel: 'Root Word',
				rootSub: 'Suffix decides part of speech',
				branches: [
					{
						label: 'Nouns',
						rule: '-tion, -ment, -ity, -ance',
						example: 'protect = protection'
					},
					{
						label: 'Adjectives',
						rule: '-ful, -able, -ive, -al',
						example: 'peace = peaceful'
					},
					{
						label: 'Verbs',
						rule: '-ize, -ify, -ate, -en',
						example: 'pure = purify'
					},
					{
						label: 'Opposites',
						rule: 'un-, im-, il-, ir-, dis-',
						example: 'legal = illegal'
					}
				]
			}),
			visualCaptionAr: 'خريطة اللواحق والسوابق الأساسية لحل جدول الاشتقاق في الامتحانات',
			examples: [
				{
					problemAr: 'Complete the chart: Verb: to pollute | Noun: ...... | Adjective: ......',
					solutionAr: 'Verb: to pollute | Noun: pollution | Adjective: polluted / polluting.'
				},
				{
					problemAr: 'Give the opposites keeping the same root: honest, responsible, renewable, tolerant.',
					solutionAr: 'dishonest, irresponsible, non-renewable (أو unrenewable), intolerant.'
				}
			],
			watchOutAr:
				'احذر التغييرات الإملائية عند إضافة اللواحق: في pollute نحذف e ونضيف -ion (pollution)، وفي harmony نحول y إلى i قبل -ous (harmonious)، وفي responsible تصبح الاسم responsibility.'
		},
		practice: [
			{
				questionAr: 'What is the correct noun derived from the verb "to conserve"?',
				options: ['conservement', 'conservation', 'conservity', 'conservance'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضيف -ment للفعل conserve.',
					'صحيح! الاسم القياسي هو conservation.',
					'خطأ: هذه الصيغة غير موجودة في الإنجليزية.',
					'خطأ: الصيغة غير صحيحة.'
				],
				explanationAr: 'الفعل conserve يشتق منه الاسم conservation باللاحقة -ation.'
			},
			{
				questionAr: 'Choose the correct adjective from the noun "environment":',
				options: ['environmentful', 'environmental', 'environmentive', 'environmentize'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا تقبل هذه الكلمة اللاحقة -ful.',
					'أحسنت! نضيف اللاحقة -al فتصبح environmental.',
					'خطأ: لاحقة غير مناسبة لهذه الكلمة.',
					'خطأ: -ize لاحقة أفعال لا صفات.'
				],
				explanationAr: 'الصفة من environment هي environmental بإضافة اللاحقة -al.'
			},
			{
				questionAr: 'Select the accurate opposite of "responsible":',
				options: ['unresponsible', 'inresponsible', 'irresponsible', 'disresponsible'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الكلمات المبدوءة بحرف r تأخذ غالبا ir-.',
					'خطأ: قبل r نستخدم ir- لا in-.',
					'ممتاز! irresponsible هي الصيغة الصحيحة.',
					'خطأ: dis- لا تستعمل مع responsible.'
				],
				explanationAr: 'الصفات المبدوءة بحرف r مثل responsible و regular تأخذ السابقة ir-.'
			},
			{
				questionAr: 'Which word is a VERB derived from the adjective "pure"?',
				options: ['purity', 'purely', 'purify', 'pureness'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: purity اسم (نقاء).',
					'خطأ: purely ظرف حال.',
					'صحيح! اللاحقة -ify تحول الصفة إلى فعل: purify (ينقي).',
					'خطأ: pureness اسم.'
				],
				explanationAr: 'اللاحقة -ify تكون الفعل من الصفة، مثل pure تصبح purify.'
			},
			{
				questionAr: 'Complete the row (Verb / Noun / Adjective) for "to tolerate":',
				options: [
					'tolerate / tolerance / tolerant',
					'tolerate / tolerant / tolerance',
					'tolerate / tolerationful / tolerate',
					'tolerate / tolerment / tolerous'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الفعل tolerate والاسم tolerance والصفة tolerant.',
					'خطأ: بدلت موضع الاسم والصفة.',
					'خطأ: هذه الاشتقاقات غير سليمة.',
					'خطأ: لواحق غير صحيحة مع هذا الجذر.'
				],
				explanationAr: 'الترتيب السليم هو: الفعل tolerate، الاسم tolerance، الصفة tolerant.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t2_word_stress',
		slug: 'eng-2as-lp-t2-word-stress',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Make Peace & Waste Not, Want Not',
		order: 4,
		titleAr: 'قواعد النبر الصوتي في الكلمات (Word Stress: -tion, -ic, -ity)',
		objectives: [
			'تحديد المقطع المنبور (Stressed Syllable) في الكلمات المنتهية بـ -tion و -sion و -ic',
			'تطبيق قاعدة المقطع الثالث من النهاية مع الكلمات المنتهية بـ -ity و -ty و -gy و -phy',
			'حل جدول تصنيف النبر في تمارين الصوتيات (Phonology) بثقة ودقة'
		],
		keywordsAr: ['Word Stress', 'penultimate syllable', '-tion', '-ic', '-ity', 'النبر الصوتي'],
		discover: {
			scenarioAr:
				'انطق بصوت مسموع الكلمات الثلاث: pro-TEC-tion و e-co-NO-mic و re-spon-si-BI-li-ty. ستلاحظ أن مقطعا واحدا في كل كلمة ينطق بقوة ووضوح أعلى؛ وهذا المقطع تحكمه قواعد ثابتة مرتبطة باللاحقة.',
			svg: svgEnglishPhoneticsChart({
				title: 'Word Stress Golden Rules (2AS LP)',
				subtitle: 'Count syllables from the END of the word',
				columns: [
					{
						sound: '-tion / -sion',
						rule: '2nd from end (Penultimate)',
						examples: 'po-LLU-tion, de-CI-sion'
					},
					{
						sound: '-ic / -ical',
						rule: 'Right before -ic',
						examples: 'e-co-NO-mic, PA-ci-fic'
					},
					{
						sound: '-ity / -gy / -phy',
						rule: '3rd from end (Ante-penult.)',
						examples: 'e-QUA-li-ty, e-CO-lo-gy'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قسم كلمة "con-ser-va-tion" إلى مقاطع وعد من النهاية. أي مقطع يسبق اللاحقة -tion مباشرة؟',
					hintAr: 'المقاطع هي: con (1) - ser (2) - va (3) - tion (4).',
					expectedInput: 'المقطع الثالث (va) وهو الثاني من النهاية',
					revealAr:
						'في كل الكلمات المنتهية بـ -tion أو -sion يقع النبر دائما على المقطع الذي قبل النهاية مباشرة (الثاني من النهاية): con-ser-VA-tion.'
				},
				{
					promptAr:
						'طبق القاعدة نفسها على "scien-ti-fic" و "pa-ci-fic". أين يقع النبر؟',
					hintAr: 'انظر إلى المقطع الذي يسبق -ic مباشرة.',
					expectedInput: 'على المقطع قبل -ic مباشرة (TI و CI)',
					revealAr:
						'الكلمات المنتهية بـ -ic تأخذ النبر على المقطع الذي يسبق -ic مباشرة (الثاني من النهاية): sci-en-TI-fic و pa-CI-fic.'
				},
				{
					promptAr:
						'انتقل إلى الكلمات المنتهية بـ -ity مثل "u-ni-ty" و "e-qua-li-ty". ما رقم المقطع المنبور إذا عددنا من النهاية؟',
					hintAr: 'عد من النهاية: ty (1) - li (2) - qua (3).',
					expectedInput: 'الثالث من النهاية',
					revealAr:
						'الكلمات المنتهية بـ -ity و -ty و -cy و -gy و -phy يقع النبر فيها على المقطع الثالث من النهاية: U-ni-ty و e-QUA-li-ty و e-CO-lo-gy.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة 1 (النبر على المقطع الثاني من النهاية — Penultimate): كل كلمة تنتهي بـ -tion / -sion / -ic (مثل: pro-TEC-tion, dis-CUS-sion, e-co-NO-mic).',
				'القاعدة 2 (النبر على المقطع الثالث من النهاية — Ante-penultimate): الكلمات المنتهية بـ -ity / -cy / -ty / -phy / -gy / -al (مثل: e-QUA-li-ty, de-MO-cra-cy, e-CO-lo-gy).',
				'القاعدة 3 (الأسماء والصفات من مقطعين): غالبا يكون النبر على المقطع الأول (مثل: WA-ter, NA-ture, PEACE-ful).',
				'القاعدة 4 (الأفعال من مقطعين): غالبا يكون النبر على المقطع الثاني (مثل: pro-TECT, con-SERVE, re-DUCE).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Two-Syllable Nouns vs Verbs Stress',
				rootLabel: '2-Syllable Words',
				rootSub: 'Part of speech shifts the stress',
				branches: [
					{
						label: '2-Syllable Nouns',
						rule: 'Stress on 1st syllable',
						example: 'WA-ter, NA-ture, PRO-ject'
					},
					{
						label: '2-Syllable Adjectives',
						rule: 'Stress on 1st syllable',
						example: 'SO-lar, LO-cal, PEACE-ful'
					},
					{
						label: '2-Syllable Verbs',
						rule: 'Stress on 2nd syllable',
						example: 'pro-TECT, re-DUCE, pre-SERVE'
					}
				]
			}),
			visualCaptionAr: 'الفرق في موضع النبر بين الأسماء والصفات والأفعال المكونة من مقطعين',
			examples: [
				{
					problemAr: 'Underline the stressed syllable: cooperation, ecological, community, preserve.',
					solutionAr: 'co-o-pe-RA-tion (4th), e-co-LO-gi-cal (3rd), com-MU-ni-ty (2nd), pre-SERVE (2nd).'
				},
				{
					problemAr: 'Classify according to stressed syllable (1st vs 2nd): nature, protect, unity, pollution.',
					solutionAr: '1st syllable: NA-ture, U-ni-ty | 2nd syllable: pro-TECT, pol-LU-tion.'
				}
			],
			watchOutAr:
				'في جداول الامتحان انتبه لصيغة السؤال: هل يطلب ترتيب المقطع المنبور من البداية (1st / 2nd / 3rd syllable) أم من النهاية؟ عد مقاطع الكلمة أولا ثم حدد رقم المقطع من البداية بدقة.'
		},
		practice: [
			{
				questionAr: 'Which syllable is stressed in the word "pollution" (pol-lu-tion)?',
				options: ['1st syllable (POL)', '2nd syllable (LU)', '3rd syllable (TION)', 'No stressed syllable'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: اللاحقة -tion تجذب النبر إلى المقطع الذي قبلها مباشرة.',
					'صحيح! pol-LU-tion منبورة على المقطع الثاني (LU).',
					'خطأ: اللاحقة -tion نفسها لا تكون منبورة.',
					'خطأ: كل كلمة متعددة المقاطع في الإنجليزية لها مقطع منبور.'
				],
				explanationAr: 'الكلمات المنتهية بـ -tion يكون النبر فيها على المقطع السابق لـ -tion مباشرة.'
			},
			{
				questionAr: 'Identify the stressed syllable in "economic" (e-co-no-mic):',
				options: ['1st syllable (E)', '2nd syllable (CO)', '3rd syllable (NO)', '4th syllable (MIC)'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: راجع قاعدة اللاحقة -ic.',
					'خطأ: ليس المقطع الثاني.',
					'ممتاز! المقطع السابق لـ -ic هو الثالث: e-co-NO-mic.',
					'خطأ: -ic نفسها ليست منبورة.'
				],
				explanationAr: 'تقع الشدة في الكلمات المنتهية بـ -ic على المقطع قبل -ic مباشرة (NO).'
			},
			{
				questionAr: 'Where does the stress fall in "community" (com-mu-ni-ty)?',
				options: ['1st syllable (COM)', '2nd syllable (MU)', '3rd syllable (NI)', '4th syllable (TY)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عد ثلاثة مقاطع من النهاية: ty (1), ni (2), mu (3).',
					'أحسنت! المقطع الثالث من النهاية هو الثاني من البداية: com-MU-ni-ty.',
					'خطأ: هذا المقطع الثاني من النهاية لا الثالث.',
					'خطأ: النهاية -ty غير منبورة.'
				],
				explanationAr: 'اللاحقة -ity تجعل النبر على المقطع الثالث من النهاية، وهو MU في com-MU-ni-ty.'
			},
			{
				questionAr: 'Which word is stressed on the FIRST syllable?',
				options: ['protect', 'conservation', 'unity', 'ecology'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: protect فعل من مقطعين ونبره على الثاني (pro-TECT).',
					'خطأ: نبر conservation على الرابع (con-ser-VA-tion).',
					'صحيح! U-ni-ty تتكون من 3 مقاطع والنبر على الثالث من النهاية أي الأول.',
					'خطأ: نبر e-CO-lo-gy على المقطع الثاني.'
				],
				explanationAr: 'كلمة U-ni-ty منتهية بـ -ity ومكونة من 3 مقاطع، فالثالث من النهاية هو المقطع الأول.'
			},
			{
				questionAr: 'Which pair follows the rule "2-syllable noun = 1st syllable, 2-syllable verb = 2nd syllable"?',
				options: [
					'NA-ture (noun) and re-DUCE (verb)',
					'na-TURE (noun) and RE-duce (verb)',
					'pro-TECT (noun) and WA-ter (verb)',
					'so-LAR (noun) and pre-SERVE (noun)'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الاسم NA-ture منبور على الأول، والفعل re-DUCE منبور على الثاني.',
					'خطأ: عكست القاعدة.',
					'خطأ: protect فعل و water اسم.',
					'خطأ: solar صفة منبورة على الأول و preserve فعل.'
				],
				explanationAr: 'الأسماء المكونة من مقطعين تنبر غالبا على الأول (NA-ture) والأفعال على الثاني (re-DUCE).'
			}
		]
	}
];
