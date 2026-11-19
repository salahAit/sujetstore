import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T2
// Unit 2: Safety First (Advertising, Consumers & Food Safety)
// 5 Concise, Self-Sufficient BAC Lessons
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T2: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Expressing Possibility, Probability & Certainty (Modals)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t2_modals_possibility',
		slug: 'eng-3as-sci-modals-possibility',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Safety First (الإشهار والمستهلك وسلامة الغذاء)',
		order: 1,
		titleAr: 'التعبير عن الاحتمال واليقين: May / Might / Could / Must / Cannot',
		objectives: [
			'التمييز بين درجات اليقين والاحتمال (Certainty, Probability, Possibility) باستعمال الأفعال الناقصة',
			'إعادة كتابة جمل البكالوريا من It is possible / probable / certain that إلى الصيغة باستعمال Modals',
			'توظيف الأفعال الناقصة في سياق سلامة الغذاء والإشهار وحماية المستهلك'
		],
		keywordsAr: ['May', 'Might', 'Could', 'Must', 'Certainty and Possibility'],
		discover: {
			scenarioAr:
				'في مواضيع التغذية وسلامة الغذاء، يحذر الأطباء من أضرار الأغذية المصنعة بدرجات مختلفة من الاحتمال واليقين: "Excessive sugar may cause obesity" (احتمال) و "Expired dairy products must be unsafe" (يقين قوي مبني على دليل).',
			svg: svgEnglishGrammarMap({
				title: 'Scale of Certainty and Possibility (Unit 2)',
				rootLabel: 'Modal Verbs + Bare Infinitive (Stem)',
				rootSub: 'Never add -s, -ed, or to after a modal verb!',
				branches: [
					{
						label: 'High Certainty',
						rule: 'must / cannot + stem',
						example: 'It must contain additives.'
					},
					{
						label: 'Possibility (50%)',
						rule: 'may / could + stem',
						example: 'Fast food may harm health.'
					},
					{
						label: 'Remote Possibility',
						rule: 'might + stem',
						example: 'Labels might mislead buyers.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الناقص المناسب لتعويض عبارة "It is possible that junk food causes diabetes"؟',
					hintAr: 'نبحث عن فعل ناقص يدل على الاحتمال المتوسط (Possibility).',
					expectedInput: 'may',
					revealAr:
						'نعوض "It is possible that" بالفعل الناقص may أو could ونحذف s من الفعل ليعود إلى المصدر: Junk food may cause diabetes.'
				},
				{
					promptAr: 'ما الفعل الناقص الذي يعبر عن الاستحالة المنطقية (نفي اليقين) بدلا من "must not"؟',
					hintAr: 'عندما نكون متأكدين أن شيئا ما غير صحيح (100% impossible).',
					expectedInput: 'cannot',
					revealAr:
						'نستعمل cannot (can not) للتعبير عن الاستحالة (مثال: That expired meal cannot be healthy)، لأن must not تفيد المنع والتحريم لا الاستنتاج.'
				},
				{
					promptAr: 'كيف يصبح الفعل "contains" بعد وضع "might" قبله؟',
					hintAr: 'الأفعال الناقصة يتبعها المصدر المجرد دائما.',
					expectedInput: 'contain',
					revealAr:
						'نحذف علامة المضارع (-s) فيصبح الفعل في المصدر المجرد: might contain (وليس might contains).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاحتمال المتوسط (Possibility): It is possible that / Perhaps / Maybe تتحول إلى Subject + may / could + stem (وفي النفي: may not + stem).',
				'الاحتمال الضعيف (Remote Possibility): It is slightly possible / There is a slight chance تتحول إلى Subject + might + stem.',
				'اليقين الإيجابي (Positive Certainty): I am sure / It is certain that تتحول إلى Subject + must + stem.',
				'اليقين السلبي / الاستحالة (Impossibility): It is impossible that تتحول إلى Subject + cannot + stem.',
				'قاعدة عامة في البكالوريا: الفعل بعد (may, might, could, must, cannot) يكون دائما في المصدر المجرد (stem) دون to ودون s.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BAC Rewriting: Expressions to Modals',
				rootLabel: 'Drop the Introductory Phrase',
				rootSub: 'Keep the real subject + Modal + Stem',
				branches: [
					{
						label: 'It is possible that',
						rule: 'S + may / could + stem',
						example: 'Ads may influence youth.'
					},
					{
						label: 'It is remotely possible',
						rule: 'S + might + stem',
						example: 'Prices might rise soon.'
					},
					{
						label: 'It is certain that',
						rule: 'S + must + stem',
						example: 'Fresh food must be safer.'
					},
					{
						label: 'It is impossible that',
						rule: 'S + cannot + stem',
						example: 'This milk cannot be fresh.'
					}
				]
			}),
			visualCaptionAr: 'دليل التحويل السريع من عبارات الاحتمال واليقين إلى الأفعال الناقصة',
			examples: [
				{
					problemAr: 'a) It is possible that artificial colours trigger allergies in children. (Rewrite with: may)',
					solutionAr: 'b) Artificial colours may trigger allergies in children.'
				},
				{
					problemAr: 'a) Perhaps consumers do not read small ingredient lists. (Rewrite with: might)',
					solutionAr: 'b) Consumers might not read small ingredient lists.'
				},
				{
					problemAr: 'a) It is impossible that fried snacks provide balanced nutrition. (Rewrite with: cannot)',
					solutionAr: 'b) Fried snacks cannot provide balanced nutrition.'
				}
			],
			watchOutAr:
				'احذر خطأين شائعين: (1) لا تترك كلمة "perhaps" أو "maybe" في الجملة بعد إضافة may/might لأن ذلك تكرار خاطئ! و(2) عند حذف "It is possible that" انتبه لحذف -s من الفعل الأصلي إذا كان الفاعل مفردا.'
		},
		practice: [
			{
				questionAr: 'Rewrite: "It is possible that excessive salt raises blood pressure." Using "may":',
				options: [
					'Excessive salt may raise blood pressure.',
					'Excessive salt may raises blood pressure.',
					'Excessive salt may to raise blood pressure.',
					'Perhaps excessive salt may raise blood pressure.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! حذفنا عبارة الاحتمال ووضعنا may متبوعا بالمصدر المجرد raise.',
					'خطأ: يجب حذف s من الفعل بعد الفعل الناقص may.',
					'خطأ: لا نضع to بعد may.',
					'خطأ: لا نجمع بين perhaps و may في جملة واحدة.'
				],
				explanationAr: 'بعد may نستعمل المصدر المجرد (raise) ونحذف كل عبارات الاحتمال الزائدة.'
			},
			{
				questionAr: 'Which modal expresses strong logical impossibility (opposite of deduction "must")?',
				options: ['might', 'cannot', 'could', 'may not'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: might تفيد الاحتمال الضعيف.',
					'صحيح! cannot تفيد اليقين باستحالة الأمر (100% impossible).',
					'خطأ: could تفيد الاحتمال.',
					'خطأ: may not تفيد احتمال عدم الوقوع فقط لا اليقين.'
				],
				explanationAr: 'النفي المنطقي لليقين (must) في الاستنتاج هو cannot.'
			},
			{
				questionAr: 'Complete: "That canned juice expired six months ago. It ........ be safe to drink."',
				options: ['must', 'may', 'cannot', 'might'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: العصير منتهي الصلاحية منذ ستة أشهر، فلا يمكن أن يكون آمنا.',
					'خطأ: ليس مجرد احتمال بل استحالة واضحة.',
					'أحسنت! الدليل واضح (منتهي الصلاحية) فنستعمل cannot للاستحالة.',
					'خطأ: السياق يفيد الاستحالة القاطعة لا الاحتمال الضعيف.'
				],
				explanationAr: 'المنتج منتهي الصلاحية قطعا غير صالح للاستهلاك، لذا نستخدم cannot.'
			},
			{
				questionAr: 'Choose the sentence that expresses remote possibility:',
				options: [
					'Healthy habits must improve energy.',
					'This label cannot be authentic.',
					'Consumers must check expiry dates.',
					'A new sugar tax might reduce soda sales.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: must هنا تفيد اليقين القوي.',
					'خطأ: cannot تفيد الاستحالة.',
					'خطأ: must هنا تفيد الإلزام والضرورة.',
					'رائع! الفعل الناقص might يعبر عن الاحتمال الضعيف أو البعيد.'
				],
				explanationAr: 'تستعمل might للتعبير عن احتمال ضعيف (remote possibility).'
			},
			{
				questionAr: 'Rewrite: "Maybe young shoppers ignore nutritional facts." Using "could":',
				options: [
					'Young shoppers could ignore nutritional facts.',
					'Maybe young shoppers could ignore nutritional facts.',
					'Young shoppers could ignoring nutritional facts.',
					'Young shoppers could ignored nutritional facts.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حذفنا Maybe واستعملنا could + المصدر المجرد ignore.',
					'خطأ: لا نجمع بين Maybe و could.',
					'خطأ: لا نضع V-ing مباشرة بعد could هنا.',
					'خطأ: لا نضع صيغة الماضي ignored بعد could.'
				],
				explanationAr: 'نحذف Maybe ونضع could قبل المصدر المجرد ignore.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: Expressing Cause & Effect in Consumer & Health Texts
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t2_cause_effect_safety',
		slug: 'eng-3as-sci-cause-effect-safety',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Safety First (الإشهار والمستهلك وسلامة الغذاء)',
		order: 2,
		titleAr: 'التعبير عن السبب والنتيجة (Cause and Effect) في نصوص الصحة والمستهلك',
		objectives: [
			'الربط الدقيق بين السبب والنتيجة باستعمال since / as / because مقابل therefore / as a result / thus',
			'تحويل جملة السبب إلى عبارة اسمية بعد because of / due to / owing to',
			'استعمال أفعال السببية الأكاديمية (lead to / result in / cause) في الفقرات والتمارين'
		],
		keywordsAr: ['Since', 'As', 'Therefore', 'As a result', 'Owing to', 'Cause and Effect'],
		discover: {
			scenarioAr:
				'يعتمد فهم نصوص الوحدة الثانية على تتبع علاقة السبب والنتيجة بين نمط الغذاء وصحة الإنسان: "Since many people lack time to cook, they rely on ready-made meals. As a result, obesity rates are rising."',
			svg: svgEnglishGrammarMap({
				title: 'Cause and Effect Connectors Map',
				rootLabel: 'Identify Which Clause is Cause and Which is Effect',
				rootSub: 'Never swap Cause and Effect during rewriting!',
				branches: [
					{
						label: 'Cause (+ Clause)',
						rule: 'because / since / as + S + V',
						example: 'As fast food is fatty, it harms.'
					},
					{
						label: 'Cause (+ Noun/V-ing)',
						rule: 'because of / due to / owing to',
						example: 'Due to high sugar, teeth decay.'
					},
					{
						label: 'Effect (Result)',
						rule: 'therefore / thus / as a result',
						example: 'He ate fresh food; thus, he stayed fit.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة "Consumers buy unhealthy snacks because advertisements are persuasive"، أيهما السبب وأيهما النتيجة؟',
					hintAr: 'الجملة التي تتبع because مباشرة هي دائما السبب.',
					expectedInput: 'advertisements are persuasive',
					revealAr:
						'السبب (Cause) هو "advertisements are persuasive" والنتيجة (Effect) هي "consumers buy unhealthy snacks".'
				},
				{
					promptAr: 'إذا أردنا إعادة كتابة نفس الجملة باستعمال "As a result"، بأي جملة نبدأ أولا؟',
					hintAr: 'أداة النتيجة تسبق جملة النتيجة، لذا نكتب السبب أولا.',
					expectedInput: 'Advertisements are persuasive',
					revealAr:
						'نبدأ بالسبب أولا ثم نضع أداة النتيجة ثم النتيجة: Advertisements are persuasive; as a result, consumers buy unhealthy snacks.'
				},
				{
					promptAr: 'ما الكلمة المرادفة تماما لـ "because" ويمكن وضعها في أول الجملة بسهولة؟',
					hintAr: 'تبدأ بحرف s أو بحرف a.',
					expectedInput: 'since / as',
					revealAr:
						'الأداتان since و as مرادفتان لـ because تماما، وغالبا ما تأتيان في بداية الجملة متبوعتين بجملة السبب ثم فاصلة ثم النتيجة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات السبب المتبوعة بجملة (Subject + Verb): because / since / as. (عند وضعها في البداية نضع فاصلة بين الجملتين).',
				'أدوات السبب المتبوعة باسم أو V-ing: because of / due to / owing to / thanks to (تُستعمل thanks to للنتائج الإيجابية غالبا).',
				'أدوات النتيجة (Result): so (تسبقها فاصلة) | therefore / consequently / as a result / thus (تسبقها نقطة أو فاصلة منقوطة وتليها فاصلة).',
				'أفعال السببية المباشرة في الكتابة (Written Expression): Cause + leads to / results in / causes + Effect (مثال: Unbalanced nutrition leads to chronic diseases).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Cause-to-Effect Logical Order',
				tenseName: 'Cause happens first, Effect follows',
				formula: 'Since (Cause), (Effect)  =  (Cause); therefore, (Effect)',
				activeZone: 'present',
				example: 'Since fruit is rich in vitamins, it boosts immunity.',
				markers: 'because, since, as, due to, owing to, therefore, as a result, thus'
			}),
			visualCaptionAr: 'القاعدة المنطقية الثابتة: أداة السبب تلتصق بالسبب، وأداة النتيجة تلتصق بالنتيجة',
			examples: [
				{
					problemAr: 'a) Fast food contains excessive fat. Consequently, it increases cholesterol. (Rewrite with: Since)',
					solutionAr: 'b) Since fast food contains excessive fat, it increases cholesterol.'
				},
				{
					problemAr: 'a) Many families prefer home-cooked meals because they are wholesome. (Rewrite with: Therefore)',
					solutionAr: 'b) Home-cooked meals are wholesome; therefore, many families prefer them.'
				},
				{
					problemAr: 'a) People suffer from food poisoning because storage conditions are poor. (Rewrite with: Owing to)',
					solutionAr: 'b) Owing to poor storage conditions, people suffer from food poisoning.'
				}
			],
			watchOutAr:
				'أكبر خطأ في البكالوريا هو وضع أداة النتيجة (therefore / as a result) مكان أداة السبب دون تبديل ترتيب الجملتين! حدد أولا (C = السبب) و (E = النتيجة) على المسودة قبل أن تكتب حرفا واحدا.'
		},
		practice: [
			{
				questionAr: 'Rewrite with "As a result": "People gain weight because they eat too much fast food."',
				options: [
					'People eat too much fast food; as a result, they gain weight.',
					'People gain weight; as a result, they eat too much fast food.',
					'As a result people eat too much fast food, they gain weight.',
					'People gain weight as a result because they eat fast food.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! السبب أولا (الأكل السريع) ثم as a result ثم النتيجة (زيادة الوزن).',
					'خطأ: عكست السبب والنتيجة فاختل المعنى.',
					'خطأ: وضعت أداة النتيجة قبل جملة السبب.',
					'خطأ: لا نجمع بين as a result و because معا.'
				],
				explanationAr: 'السبب هو الإفراط في الأكل السريع، والنتيجة هي زيادة الوزن التي تأتي بعد as a result.'
			},
			{
				questionAr: 'Choose the right connector: "........ strict hygiene checks, food safety has improved."',
				options: ['Because', 'Thanks to', 'Therefore', 'Since'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا يوجد فعل مصرف بعد الفراغ بل عبارة اسمية فقط.',
					'صحيح! عبارة اسمية + نتيجة إيجابية تناسبها Thanks to.',
					'خطأ: Therefore تربط بالنتيجة وتتبعها جملة كاملة.',
					'خطأ: Since تتطلب فاعلا وفعلا مصرفا.'
				],
				explanationAr: 'strict hygiene checks عبارة اسمية أدت لنتيجة إيجابية، فالأداة الدقيقة هي Thanks to.'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT?',
				options: [
					'Owing to he drank clean water, he felt healthy.',
					'Because of sugar is harmful, we limit it.',
					'As fresh vegetables are nutritious, doctors recommend them.',
					'Since the high price, nobody bought the product.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: Owing to لا يتبعها فاعل وفعل مباشر.',
					'خطأ: Because of يتبعها اسم لا جملة فعلية.',
					'رائع! As تتبعها جملة كاملة (Subject + Verb) ثم فاصلة ثم النتيجة.',
					'خطأ: Since تحتاج فاعلا وفعلا مصرفا وليس اسما فقط.'
				],
				explanationAr: 'الأداة As يتبعها فاعل وفعل (fresh vegetables are nutritious) متبوعا بفاصلة والنتيجة.'
			},
			{
				questionAr: 'Complete with the best verb of causation: "Lack of physical exercise often ........ health problems."',
				options: ['because of', 'since', 'due to', 'leads to'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الفراغ يحتاج فعلا مصرفا لا حرف جر.',
					'خطأ: since أداة ربط وليست فعلا.',
					'خطأ: due to عبارة جر وليست فعلا.',
					'ممتاز! leads to فعل سببية مصرف في المضارع مع الفاعل المفرد Lack.'
				],
				explanationAr: 'الجملة تحتاج فعلا رئيسيا يربط السبب بالنتيجة، وهو leads to (يؤدي إلى).'
			},
			{
				questionAr: 'Rewrite with "due to": "The restaurant was closed because it neglected cleanliness."',
				options: [
					'The restaurant was closed due to neglecting cleanliness.',
					'The restaurant was closed due to it neglected cleanliness.',
					'Due to the restaurant was closed, it neglected cleanliness.',
					'The restaurant neglected cleanliness due to it was closed.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حولنا الفعل إلى Gerund (neglecting) بعد due to.',
					'خطأ: لا نضع فاعلا وفعلا مصرفا بعد due to مباشرة.',
					'خطأ: عكست السبب والنتيجة وأتبعت due to بجملة كاملة.',
					'خطأ: عكست المعنى تماما.'
				],
				explanationAr: 'بعد due to نحوّل الجملة الفعلية إلى اسم أو V-ing: neglecting cleanliness.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: Expressing Concession (Although / Even though vs Despite / In spite of)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t2_concession_contrast',
		slug: 'eng-3as-sci-concession-contrast',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Safety First (الإشهار والمستهلك وسلامة الغذاء)',
		order: 3,
		titleAr: 'التعبير عن الاستدراك والتعارض: Although / Even though مقابل Despite / In spite of',
		objectives: [
			'التمييز الدقيق بين أدوات الاستدراك المتبوعة بجملة (Although, Though, Even though) والمتبوعة باسم أو V-ing (Despite, In spite of)',
			'إتقان حيلة "the fact that" المضمونة للتحويل من Although إلى Despite في البكالوريا دون خطأ',
			'استعمال أدوات الاستدراك الوسطية (However, Yet, Nevertheless) بترقيم سليم'
		],
		keywordsAr: ['Although', 'Even though', 'Despite', 'In spite of', 'Concession'],
		discover: {
			scenarioAr:
				'تتكرر فكرة التناقض بين وعي المستهلك وسلوكه في نصوص البكالوريا: "Although many teenagers know the dangers of fast food, they still consume it." ويمكن التعبير عن المعنى نفسه بـ: "Despite knowing the dangers of fast food, many teenagers still consume it."',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Concession in BAC',
				rootLabel: 'Two Unexpected / Contrasting Ideas',
				rootSub: 'Never use "but" together with "although"!',
				branches: [
					{
						label: 'Group A (+ Clause)',
						rule: 'Although / Even though + S + V',
						example: 'Although ads look nice, check facts.'
					},
					{
						label: 'Group B (+ Noun/V-ing)',
						rule: 'Despite / In spite of + N / V-ing',
						example: 'Despite high prices, buyers trust quality.'
					},
					{
						label: 'Safe BAC Bridge',
						rule: 'Despite the fact that + S + V',
						example: 'Despite the fact that it costs more...'
					}
				]
			}),
			steps: [
				{
					promptAr: 'هل يجوز كتابة "Although the meal was expensive, but it was not fresh"؟',
					hintAr: 'تذكر قاعدة عدم الجمع بين أداتي ربط في جملة واحدة.',
					expectedInput: 'no',
					revealAr:
						'لا أبدا! نحذف كلمة but تماما عند استعمال Although أو Even though؛ يكفي وضع الفاصلة بين الجملتين.'
				},
				{
					promptAr: 'ما الخطأ في عبارة "Despite of the risks"؟',
					hintAr: 'قارن بين "In spite of" وبين "Despite".',
					expectedInput: 'of',
					revealAr:
						'كلمة Despite لا تأخذ حرف الجر of أبدا! نقول: Despite the risks أو In spite of the risks (بثلاث كلمات).'
				},
				{
					promptAr: 'كيف نستخدم "Despite" عندما يصعب تحويل الجملة إلى اسم بسيط؟',
					hintAr: 'هناك عبارة سحرية من ثلاث كلمات تسمح بإبقاء الفاعل والفعل كما هما.',
					expectedInput: 'the fact that',
					revealAr:
						'نضيف عبارة "the fact that" بعد Despite أو In spite of، فتقبل بعدها جملة كاملة (Subject + Verb) بنسبة صواب 100% في البكالوريا!'
				}
			]
		},
		summary: {
			rulesAr: [
				'المجموعة الأولى (تتبعها جملة Subject + Verb): Although / Though / Even though + Subject + Verb, Main Clause.',
				'المجموعة الثانية (يتبعها اسم أو V-ing): Despite / In spite of + Noun Phrase / V-ing, Main Clause.',
				'الحيلة المضمونة في البكالوريا: Despite the fact that + Subject + Verb = In spite of the fact that + Subject + Verb (تُنقذك من أخطاء اشتقاق الاسم!).',
				'أدوات الاستدراك بين جملتين مستقلتين: Clause 1; however, / nevertheless, Clause 2 (ولا نجمع أبدا بين Although و but في جملة واحدة).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: '3 Ways to Rewrite Although into Despite',
				rootLabel: 'a) Although fast food is tasty, it is unhealthy.',
				rootSub: 'Choose the cleanest transformation',
				branches: [
					{
						label: 'Way 1: Noun Phrase',
						rule: 'Despite + possessive + Noun',
						example: 'Despite its good taste, fast food...'
					},
					{
						label: 'Way 2: Gerund (V-ing)',
						rule: 'Despite + being + adj',
						example: 'Despite being tasty, fast food...'
					},
					{
						label: 'Way 3: The fact that',
						rule: 'Despite the fact that + S + V',
						example: 'Despite the fact that fast food is tasty...'
					}
				]
			}),
			visualCaptionAr: 'ثلاث طرق صحيحة لتحويل Although إلى Despite في تمارين إعادة الصياغة بالبكالوريا',
			examples: [
				{
					problemAr: 'a) Even though food labels are clear, many shoppers ignore them. (Rewrite with: In spite of)',
					solutionAr: 'b) In spite of the clarity of food labels (or: In spite of the fact that food labels are clear), many shoppers ignore them.'
				},
				{
					problemAr: 'a) Advertisements spend huge budgets, but consumers are becoming wiser. (Rewrite with: Although)',
					solutionAr: 'b) Although advertisements spend huge budgets, consumers are becoming wiser.'
				},
				{
					problemAr: 'a) Despite his busy schedule, Karim cooks healthy meals at home. (Rewrite with: However)',
					solutionAr: 'b) Karim has a busy schedule; however, he cooks healthy meals at home.'
				}
			],
			watchOutAr:
				'انتبه لثلاثة فخاخ في البكالوريا: (1) لا تكتب "Despite of" أبدا، (2) لا تجمع بين "Although" و "but"، (3) عند تحويل Despite + V-ing تأكد أن الفاعل في الجملتين واحد (مثال: Despite being tired, he cooked dinner).'
		},
		practice: [
			{
				questionAr: 'Choose the grammatically CORRECT sentence:',
				options: [
					'Despite the high cost of organic fruit, many families buy it.',
					'Despite of the high cost of organic fruit, many families buy it.',
					'Although the high cost of organic fruit, many families buy it.',
					'Although organic fruit is costly, but many families buy it.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! Despite دون of ومتبوعة بعبارة اسمية سليمة.',
					'خطأ: لا نضع of بعد Despite أبدا.',
					'خطأ: Although تحتاج فاعلا وفعلا مصرفا.',
					'خطأ: لا نجمع بين Although و but في جملة واحدة.'
				],
				explanationAr: 'تأتي Despite دون حرف الجر of وتتبعها عبارة اسمية (the high cost of organic fruit).'
			},
			{
				questionAr: 'Rewrite: "Although some snacks are cheap, they harm children." Start with "In spite of":',
				options: [
					'In spite of some snacks are cheap, they harm children.',
					'In spite of being cheap, some snacks harm children.',
					'In spite of cheap, some snacks harm children.',
					'In spite some snacks being cheap, they harm children.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: In spite of لا يتبعها فاعل وفعل مباشر دون the fact that.',
					'صحيح! استعملنا Gerund (being cheap) لأن الفاعل واحد في الجملتين.',
					'خطأ: لا تأتي الصفة وحدها مباشرة بعد In spite of.',
					'خطأ: نسيت حرف الجر of بعد In spite.'
				],
				explanationAr: 'لأن الفاعل واحد (some snacks)، يصح تحويل الجملة إلى In spite of + V-ing (being cheap).'
			},
			{
				questionAr: 'Fill in the blank: "........ the fact that sugar tastes sweet, excess intake weakens health."',
				options: ['Although', 'Even though', 'Despite', 'However'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نكتب Although the fact that.',
					'خطأ: Even though تتبعها جملة مباشرة دون the fact that.',
					'رائع! التركيب القياسي هو Despite the fact that + Subject + Verb.',
					'خطأ: However لا تتبعها the fact that.'
				],
				explanationAr: 'تأتي عبارة the fact that بعد Despite أو In spite of فقط.'
			},
			{
				questionAr: 'Fill in the blank: "The product looked attractive; ........, its expiry date had passed."',
				options: ['although', 'despite', 'in spite of', 'however'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: although لا تأتي بين فاصلة منقوطة وفاصلة بهذه الطريقة.',
					'خطأ: despite تتبعها عبارة اسمية.',
					'خطأ: in spite of تتبعها عبارة اسمية.',
					'ممتاز! however أداة استدراك وسطية تسبقها فاصلة منقوطة وتليها فاصلة.'
				],
				explanationAr: 'الترقيم (; ........,) يدل مباشرة على أداة الربط الانتقالية however أو nevertheless.'
			},
			{
				questionAr: 'Rewrite: "In spite of the strict law, fake ads still appear online." Start with "Even though":',
				options: [
					'Even though the law is strict, fake ads still appear online.',
					'Even though the strict law, fake ads still appear online.',
					'Even though the law is strict, but fake ads still appear online.',
					'Even though of the strict law, fake ads still appear online.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! حولنا العبارة الاسمية إلى جملة كاملة (the law is strict) بعد Even though.',
					'خطأ: Even though تحتاج فاعلا وفعلا مصرفا.',
					'خطأ: لا نجمع بين Even though و but.',
					'خطأ: لا نضع of بعد Even though.'
				],
				explanationAr: 'عند التحويل من In spite of إلى Even though نُعيد العبارة الاسمية إلى جملة فعلية (the law is strict).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: Gerund vs Infinitive & Compound Words in Advertising
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t2_gerund_compounds',
		slug: 'eng-3as-sci-gerund-compounds',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Safety First (الإشهار والمستهلك وسلامة الغذاء)',
		order: 4,
		titleAr: 'المصدر واسم الفعل (Gerund vs Infinitive) والكلمات المركبة في الإشهار والتغذية',
		objectives: [
			'معرفة مواضع استعمال اسم الفعل (Gerund: V-ing) مقابل المصدر المسبوق بـ to (To-Infinitive) والمصدر المجرد',
			'فهم وتكوين الكلمات والصفات المركبة (Compound Words) الشائعة في نصوص الغذاء والإشهار',
			'توظيف هذه التراكيب دون أخطاء في تمارين تصريف الأفعال والوضعية الإدماجية'
		],
		keywordsAr: ['Gerund', 'Infinitive', 'Compound Words', 'Prepositions', 'Advertising'],
		discover: {
			scenarioAr:
				'تأمل هذه الجملة الغنية بتراكيب الوحدة الثانية: "Eating well-balanced meals and avoiding ready-made snacks help students stay active before taking exams." لاحظ وجود اسم الفعل (Eating, avoiding, taking) والصفات المركبة (well-balanced, ready-made).',
			svg: svgEnglishWordFormation({
				title: 'Compound Adjectives & Nouns in Unit 2',
				prefix: 'well-',
				root: 'balance',
				suffix: '-ed',
				derivedWord: 'well-balanced (متوازن)',
				meaningNote: 'Combine two words with a hyphen to form clear descriptive adjectives: well-balanced, sugar-free, ready-made'
			}),
			steps: [
				{
					promptAr: 'لماذا جاء الفعل "taking" بصيغة V-ing في عبارة "before taking exams"؟',
					hintAr: 'انظر إلى الكلمة التي تسبق taking مباشرة (before).',
					expectedInput: 'preposition',
					revealAr:
						'كل فعل يأتي مباشرة بعد حرف جر (preposition مثل: before, after, by, without, in, of, for) يوضع دائما في صيغة Gerund (V-ing)!'
				},
				{
					promptAr: 'ما الصيغة الصحيحة بعد الفعل "avoid" و "suggest"؟ (مثال: Doctors suggest ... fresh fruit)',
					hintAr: 'هل نقول suggest to eat أم suggest eating؟',
					expectedInput: 'eating',
					revealAr:
						'الأفعال (avoid, enjoy, suggest, keep, stop, mind, recommend) تتبعها دائما صيغة Gerund (V-ing): suggest eating.'
				},
				{
					promptAr: 'ما معنى الصفة المركبة "sugar-free" و "health-conscious"؟',
					hintAr: 'قسّم الكلمة إلى جزأين لفهم معناها فورا.',
					expectedInput: 'without sugar / caring about health',
					revealAr:
						'sugar-free تعني خالٍ من السكر (without sugar)، و health-conscious تعني واعٍ ومهتم بصحته.'
				}
			]
		},
		summary: {
			rulesAr: [
				'مواضع Gerund (V-ing): (1) كفاعل في بداية الجملة (Reading food labels saves lives)، (2) بعد كل حروف الجر (by, without, before, after, in, of, for)، (3) بعد أفعال محددة (avoid, enjoy, suggest, recommend, keep, stop, risk).',
				'مواضع To-Infinitive (to + stem): (1) للتعبير عن الغاية (We read labels to know ingredients)، (2) بعد الصفات (It is vital to drink water)، (3) بعد أفعال (decide, refuse, promise, want, hope, agree, encourage + object).',
				'مواضع Bare Infinitive (stem فقط): بعد الأفعال الناقصة (can, must, should, may, might, will) وبعد had better و let/make + object.',
				'أشهر الكلمات المركبة في الوحدة 2: fast-food / junk-food (أكل سريع)، ready-made (جاهز)، well-balanced (متوازن)، sugar-free / fat-free (خالٍ من السكر/الدهون)، health-conscious (واعٍ صحيا)، food-poisoning (تسمم غذائي)، life-threatening (مهدد للحياة).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Gerund vs To-Infinitive vs Bare Stem',
				rootLabel: 'Choose the Exact Verb Form',
				rootSub: 'Look at the word right before the verb!',
				branches: [
					{
						label: 'Gerund (V-ing)',
						rule: 'Subject / Preposition / avoid',
						example: 'By checking dates, avoid eating bad food.'
					},
					{
						label: 'To-Infinitive',
						rule: 'Purpose / Adj / decide, want',
						example: 'They decided to buy fresh bread.'
					},
					{
						label: 'Bare Infinitive',
						rule: 'Modals / had better / make',
						example: 'Ads can make kids buy sweets.'
					}
				]
			}),
			visualCaptionAr: 'خريطة اختيار صيغة الفعل الصحيحة في تمارين القواعد والكتابة',
			examples: [
				{
					problemAr: 'Put the verbs in brackets in the right form: "Before (buy) any snack, consumers should (check) its ingredients."',
					solutionAr: 'Before buying any snack, consumers should check its ingredients.'
				},
				{
					problemAr: 'Put the verb in the right form: "Nutritionists advise families (avoid) (consume) sugary drinks."',
					solutionAr: 'Nutritionists advise families to avoid consuming sugary drinks.'
				},
				{
					problemAr: 'Form compound adjectives: (1) a diet that is balanced well, (2) a drink free of sugar.',
					solutionAr: '(1) a well-balanced diet | (2) a sugar-free drink.'
				}
			],
			watchOutAr:
				'لا تنخدع بكلمة "to" عندما تكون حرف جر في عبارات مثل "look forward to" أو "be used to"؛ إذ يأتي بعدها V-ing! أما في بقية المواضع (want to, decide to, in order to) فيأتي بعدها المصدر المجرد.'
		},
		practice: [
			{
				questionAr: 'Complete: "You can protect your family by ........ expiry dates carefully."',
				options: ['checking', 'check', 'to check', 'checked'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! بعد حرف الجر by نضع الفعل في صيغة Gerund (V-ing).',
					'خطأ: لا نضع المصدر المجرد بعد حرف الجر by.',
					'خطأ: لا نضع to + stem بعد by.',
					'خطأ: لا نضع الماضي البسيط بعد حرف الجر.'
				],
				explanationAr: 'قاعدة ثابتة: كل فعل يلي حرف جر (by, without, after, before, of) يأخذ صيغة V-ing.'
			},
			{
				questionAr: 'Complete: "Smart shoppers avoid ........ products advertised with exaggerated claims."',
				options: ['to buy', 'buying', 'buy', 'bought'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل avoid لا يتبعه to-infinitive.',
					'صحيح! الفعل avoid يتبعه دائما Gerund (V-ing).',
					'خطأ: الفعل avoid يحتاج V-ing لا مصدرا مجردا.',
					'خطأ: لا نضع التصريف الماضي بعد avoid.'
				],
				explanationAr: 'الفعل avoid من الأفعال التي تفرض Gerund بعدها مباشرة: avoid buying.'
			},
			{
				questionAr: 'Complete: "It is essential ........ a well-balanced breakfast every morning."',
				options: ['eat', 'eating to', 'to eat', 'ate'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: بعد التركيب It is + adjective نحتاج to + stem.',
					'خطأ: صيغة غير صحيحة نحويا.',
					'رائع! بعد الصفات (It is essential / important / safe) نضع to + stem.',
					'خطأ: لا نستعمل الماضي البسيط هنا.'
				],
				explanationAr: 'بعد الصيغة It is + adjective نستعمل To-Infinitive: to eat.'
			},
			{
				questionAr: 'Which compound adjective means "prepared in advance and sold ready to heat"?',
				options: ['sugar-free', 'well-known', 'health-conscious', 'ready-made'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: sugar-free تعني خالٍ من السكر.',
					'خطأ: well-known تعني مشهور.',
					'خطأ: health-conscious تعني مهتم بالصحة.',
					'أحسنت! ready-made تعني جاهز مسبقا.'
				],
				explanationAr: 'الصفة المركبة ready-made تصف الوجبات المحضرة مسبقا الجاهزة للتسخين.'
			},
			{
				questionAr: 'Complete: "........ fresh water every day keeps your body hydrated."',
				options: ['Drinking', 'Drink', 'Drank', 'To drinking'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! نستعمل Gerund (Drinking) كفاعل في بداية الجملة.',
					'خطأ: الفعل المجرد في البداية يدل على الأمر لا الفاعل.',
					'خطأ: صيغة ماضٍ لا تصلح فاعلا.',
					'خطأ: لا نجمع بين to و V-ing هنا.'
				],
				explanationAr: 'عندما يقع الفعل فاعلا في بداية الجملة نستعمل صيغة Gerund: Drinking.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 5: Pronunciation of Final -s (/s/, /z/, /iz/), Final -ed (/t/, /d/, /id/) & Stress
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t2_phonology_s_ed_stress',
		slug: 'eng-3as-sci-phonology-s-ed-stress',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Safety First (الإشهار والمستهلك وسلامة الغذاء)',
		order: 5,
		titleAr: 'قواعد الصوتيات المضمونة في البكالوريا: نطق Final -s و Final -ed والنبر الصوتي',
		objectives: [
			'تصنيف الكلمات المنتهية بـ -s / -es بدقة تامة في جدول /s/ و /z/ و /iz/',
			'تصنيف الأفعال والصفات المنتهية بـ -ed بدقة تامة في جدول /t/ و /d/ و /id/',
			'تطبيق قاعدة نبر الكلمات ثنائية المقطع (اسم وصفة في الأول مقابل فعل في الثاني)'
		],
		keywordsAr: ['Final -s', 'Final -ed', 'Phonology', 'Voiceless', 'Word Stress'],
		discover: {
			scenarioAr:
				'يُعد سؤال تصنيف الأصوات (Classify the following words according to the pronunciation of their final -s or -ed) نقطة مجانية مضمونة (1 pt) في كل بكالوريا! السر ليس في شكل الحرف وحده بل في الصوت الأخير الذي يسبق -s أو -ed مباشرة.',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -s / -es',
				subtitle: 'Look at the SOUND right before -s / -es',
				columns: [
					{
						sound: '/s/',
						rule: 'p, t, k, f, gh(f), ph, th',
						examples: 'snacks, fats, shops, myths'
					},
					{
						sound: '/iz/',
						rule: 's, ss, sh, ch, x, z, ge, ce',
						examples: 'prices, boxes, washes, ages'
					},
					{
						sound: '/z/',
						rule: 'All other voiced + vowels',
						examples: 'meals, foods, labels, buys'
					}
				]
			}),
			steps: [
				{
					promptAr: 'كيف يُنطق الحرف الأخير في كلمة "products" وفي كلمة "prices"؟',
					hintAr: 'في products الصوت قبل s هو /t/، وفي prices الصوت قبل s هو /s/ (ce).',
					expectedInput: '/s/ and /iz/',
					revealAr:
						'كلمة products تنتهي بصوت /t/ (مهموس) فتنطق /s/، أما كلمة prices فتنتهي بـ ce (صوت صفيري) فتنطق /iz/.'
				},
				{
					promptAr: 'متى تُنطق النهاية "-ed" بصوت /id/ (مقطع إضافي واضح)؟',
					hintAr: 'تقتصر على حرفين فقط يسبقان النهاية -ed.',
					expectedInput: 't and d',
					revealAr:
						'تُنطق النهاية -ed بصوت /id/ فقط عندما ينتهي أصل الفعل بصوت /t/ أو /d/ (مثل: tested, needed, advertised خطأ بل ad-ver-tised تنتهي بـ /z/ فتنطق /d/، أما protected و added فتنطق /id/).'
				},
				{
					promptAr: 'كيف تُنطق النهاية "-ed" في الفعل "washed" وفي الفعل "consumed"؟',
					hintAr: 'صوت sh مهموس (لا يهتز الحلق)، وصوت m مجهور (يهتز الحلق).',
					expectedInput: '/t/ and /d/',
					revealAr:
						'ينطق washed بصوت /t/ لأن sh صوت مهموس، وينطق consumed بصوت /d/ لأن m صوت مجهور.'
				}
			]
		},
		summary: {
			rulesAr: [
				'نطق Final -s: /s/ بعد الأصوات المهموسة (p, t, k, f, ph, gh المنطوقة f, th) | /iz/ بعد أصوات الصفير (s, ss, sh, ch, x, z, ce, ge, se) | /z/ بعد بقية الأصوات المجهورة (b, d, g, l, m, n, r, v, y) وجميع حروف العلة.',
				'نطق Final -ed: /id/ فقط بعد (t, d) | /t/ بعد الأصوات المهموسة (p, k, f, gh(f), s, ss, ce, sh, ch, x) | /d/ بعد جميع الأصوات المجهورة الأخرى وحروف العلة.',
				'انتبه للصوت المنطوق لا الحرف المكتوب: كلمة "laughs" و "laughed" تنتهي بصوت /f/ فتأخذ /s/ و /t/؛ وكلمة "balanced" تنتهي بـ ce (/s/) فتأخذ /t/؛ وكلمة "used" تنتهي بصوت /z/ فتأخذ /d/.',
				'قاعدة نبر الكلمات ثنائية المقطع (Two-syllable words): إذا كانت الكلمة اسما أو صفة فالنبر على المقطع الأول (EX-port, PRO-duct, HEAL-thy)، وإذا كانت فعلا فالنبر غالبا على المقطع الثاني (ex-PORT, pro-DUCE, con-SUME).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Pronunciation of Final -ed',
				subtitle: 'Check the FINAL SOUND of the base verb',
				columns: [
					{
						sound: '/t/',
						rule: 'p, k, f, s, ce, sh, ch, x',
						examples: 'checked, washed, balanced'
					},
					{
						sound: '/id/',
						rule: 'ONLY after t, d',
						examples: 'protected, added, tasted'
					},
					{
						sound: '/d/',
						rule: 'All other voiced + vowels',
						examples: 'consumed, warned, played'
					}
				]
			}),
			visualCaptionAr: 'بطاقة الحفظ النهائية لنطق -ed المكررة باستمرار في البكالوريا العلمية',
			examples: [
				{
					problemAr: 'Classify final -s: labels, snacks, oranges, protects',
					solutionAr: '/s/: snacks, protects | /z/: labels | /iz/: oranges.'
				},
				{
					problemAr: 'Classify final -ed: packed, avoided, boiled, watched',
					solutionAr: '/t/: packed, watched | /d/: boiled | /id/: avoided.'
				},
				{
					problemAr: 'Compare stress in: "an IM-port" (noun) vs "to im-PORT" (verb).',
					solutionAr: 'As a noun, stress is on the 1st syllable (IM-port); as a verb, stress shifts to the 2nd syllable (im-PORT).'
				}
			],
			watchOutAr:
				'احذر كلمة "placed / balanced / produced": الحرف الأخير في الأصل هو e صامت وقبله c منطوقة /s/ (صوت مهموس)، لذا تنطق النهاية -ed بصوت /t/ وليس /d/ ولا /id/!'
		},
		practice: [
			{
				questionAr: 'How is the final "-s" pronounced in the word "choices"?',
				options: ['/s/', '/iz/', '/z/', 'silent'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الكلمة تنتهي بـ ce (صوت /s/ صفيري).',
					'ممتاز! بعد النهاية ce ننطق -es بصوت /iz/ (مقطع إضافي).',
					'خطأ: الصفير ce لا يأخذ /z/ وحده.',
					'خطأ: النهاية منطوقة بوضوح.'
				],
				explanationAr: 'أصل الكلمة choice ينتهي بصوت صفيري /s/ (ce)، فتُضاف es وتنطق /iz/.'
			},
			{
				questionAr: 'Which word has its final "-s" pronounced /s/?',
				options: ['meals', 'boxes', 'habits', 'calories'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الصوت /l/ مجهور فينطق /z/.',
					'خطأ: الحرف x صوت صفيري فينطق /iz/.',
					'صحيح! كلمة habits تنتهي بصوت /t/ المهموس فينطق /s/.',
					'خطأ: calories تنتهي بحرف علة فينطق /z/.'
				],
				explanationAr: 'كلمة habit تنتهي بصوت /t/ المهموس، لذا تُنطق -s فيها بصوت /s/.'
			},
			{
				questionAr: 'How is the final "-ed" pronounced in "protected" and "needed"?',
				options: ['/id/', '/t/', '/d/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! لأن الأصلين protect و need ينتهيان بصوتي /t/ و /d/.',
					'خطأ: بعد /t/ و /d/ نضيف مقطعا كاملا /id/.',
					'خطأ: لا ينطق /d/ وحده بعد /t/ و /d/.',
					'خطأ: النهاية منطوقة بوضوح.'
				],
				explanationAr: 'الأفعال المنتهية بصوت /t/ أو /d/ تأخذ دائما /id/ عند إضافة -ed.'
			},
			{
				questionAr: 'Which verb has its final "-ed" pronounced /t/?',
				options: ['consumed', 'tested', 'warned', 'balanced'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: الصوت /m/ مجهور فينطق /d/.',
					'خطأ: الصوت /t/ في test يأخذ /id/.',
					'خطأ: الصوت /n/ مجهور فينطق /d/.',
					'أحسنت! الفعل balance ينتهي بصوت /s/ المهموس (ce)، فتنطق -ed بصوت /t/.'
				],
				explanationAr: 'الصوت الأخير في balance هو /s/ (مهموس)، فتُنطق النهاية -ed بصوت /t/.'
			},
			{
				questionAr: 'In the sentence "We must EX-port / ex-PORT safe goods", where is the stress on the VERB "export"?',
				options: [
					'On the 2nd syllable (ex-PORT)',
					'On the 1st syllable (EX-port)',
					'Equally on both syllables',
					'There is no stressed syllable'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الكلمات ثنائية المقطع عندما تكون فعلا يُنبر مقطعها الثاني غالبا.',
					'خطأ: المقطع الأول (EX-port) عندما تكون الكلمة اسما.',
					'خطأ: هناك مقطع واحد يحمل النبر الرئيسي.',
					'خطأ: كل كلمة ثنائية المقطع لها مقطع منبور.'
				],
				explanationAr: 'في الثنائيات (اسم مقابل فعل): الاسم ينبر على الأول (EX-port) والفعل على الثاني (ex-PORT).'
			}
		]
	}
];
