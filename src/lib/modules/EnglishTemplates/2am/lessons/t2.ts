import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AM_T2: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 1: Countable vs Uncountable Nouns & some / any
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t2_countable_uncountable',
		slug: 'eng-2am-t2-countable-uncountable',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا والتسوق — Me and My Shopping',
		order: 1,
		titleAr: 'الأسماء المعدودة وغير المعدودة واستعمال (some / any)',
		objectives: [
			'التمييز الدقيق بين الأسماء المعدودة (Countable) والأسماء غير المعدودة (Uncountable) في التسوق الغذائي',
			'استعمال "some" في الجمل المثبتة والطلب المؤدب، و "any" في النفي والاستفهام',
			'توظيف أدوات التجزئة مع الأغذية الحلال الجزائرية (couscous, olive oil, honey, dates)'
		],
		keywordsAr: ['Countable Nouns', 'Uncountable Nouns', 'some / any', 'Shopping List'],
		discover: {
			scenarioAr:
				'أعدّت أمينة قائمة التسوق مع والدتها فقالت: "We need some apples, some dates, and some olive oil. Do we need any sugar? No, we don\'t need any sugar, and there isn\'t any milk in the fridge." لاحظ نوع الأسماء ومتى استعملنا some و any.',
			svg: svgEnglishGrammarMap({
				title: 'Countable vs Uncountable Nouns + some / any',
				rootLabel: 'Food Shopping Grammar',
				rootSub: 'Check if you can count it, then check (+ / - / ?)',
				branches: [
					{
						label: 'Countable',
						rule: 'Can count: 1, 2, 3... (+ -s)',
						example: 'an apple / three dates',
						color: '#1d4ed8'
					},
					{
						label: 'Uncountable',
						rule: 'Always singular (NO a/an, NO -s)',
						example: 'milk, honey, bread, couscous',
						color: '#047857'
					},
					{
						label: 'some (+) vs any (-/?)',
						rule: 'some: positive | any: neg & Q',
						example: 'some dates / any sugar?',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'هل يمكننا عدّ (apples, dates) بوضع رقم قبلها؟ وماذا عن (milk, sugar, olive oil)؟',
					hintAr: 'هل نقول three apples أم three milks؟',
					expectedInput: 'apples and dates are countable; milk and sugar are uncountable',
					revealAr: 'التفاح والتمور أسماء معدودة (تُجمع بـ s)، أما الحليب والسكر وزيت الزيتون فغير معدودة (تبقى مفردة دائما).'
				},
				{
					promptAr: 'لماذا استعملت أمينة "some" في الجملة الأولى ("We need some apples...")؟',
					hintAr: 'هل الجملة مثبتة أم منفية أم استفهامية؟',
					expectedInput: 'Affirmative sentence',
					revealAr: 'لأن الجملة مثبتة (Affirmative)، فنستعمل "some" مع المعدود الجمع وغير المعدود.'
				},
				{
					promptAr: 'متى استعملت أمينة كلمة "any" في كلامها؟',
					hintAr: 'انظر السؤال والجملة المنفية: Do we need ...? / we don\'t need ...',
					expectedInput: 'In questions and negative sentences',
					revealAr: 'نستعمل "any" دائما في الجمل المنفية (don\'t / isn\'t / aren\'t) وفي الأسئلة (Do...? / Is there...?).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأسماء المعدودة (Countable): لها مفرد وجمع (an orange / oranges، a tomato / tomatoes، a date / dates، an egg / eggs).',
				'الأسماء غير المعدودة (Uncountable): تعامل معاملة المفرد دائما (تأخذ is) ولا تقبل (a / an) ولا جمع (-s): bread (خبز)، water (ماء)، milk (حليب)، honey (عسل)، oil (زيت)، flour (دقيق)، meat (لحم)، couscous (كسكس)، sugar (سكر).',
				'كلمة "some" (بعض): تُستعمل في الجملة المثبتة (There is some honey. / We have some figs.) وفي الطلب والعرض المؤدب (Would you like some mint tea?).',
				'كلمة "any" (أي): تُستعمل في النفي (There isn\'t any bread.) وفي السؤال (Are there any olives?).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Shopping Basket: Countable vs Uncountable',
				subtitle: 'Memorize common Algerian kitchen items for exams',
				columns: [
					{
						sound: 'Countable (is / are)',
						rule: 'Singular (a/an) or Plural (-s)',
						examples: 'dates, figs, oranges, eggs',
						color: '#1d4ed8'
					},
					{
						sound: 'Uncountable (is)',
						rule: 'Always singular, no a/an',
						examples: 'bread, honey, milk, couscous',
						color: '#047857'
					},
					{
						sound: 'some vs any',
						rule: '(+) some  |  (-) & (?) any',
						examples: 'some bread / no, not any',
						color: '#b45309'
					}
				]
			}),
			visualCaptionAr: 'تصنيف سريع لأشهر الأطعمة الجزائرية بين المعدود وغير المعدود واستعمال some و any',
			examples: [
				{
					problemAr: 'أكمل بـ (some / any): 1) Is there ...... honey in the jar? 2) Yes, there is ...... honey, but there aren\'t ...... bananas.',
					solutionAr: '1) any honey (سؤال). 2) some honey (إثبات)، any bananas (نفي).'
				},
				{
					problemAr: 'صحّح الخطأ في الجملة: "There are some breads on the table."',
					solutionAr: 'There is some bread on the table. (لأن bread غير معدود فيأخذ is بدون s).'
				}
			],
			watchOutAr:
				'احذر من كلمة "bread" (خبز) و "money" (مال)! في الإنجليزية هما اسمان غير معدودين، فلا نجمعهما بـ (-s) ولا نضع قبلهما "a"، ونستعمل معهما "is": There is some bread.'
		},
		practice: [
			{
				questionAr: 'اختر الكلمة المناسبة: "There isn\'t ...... olive oil left in the bottle."',
				options: ['some', 'any', 'a', 'many'],
				correctIndex: 1,
				diagnosticFeedback: [
					'some تُستعمل في الإثبات، وهذه جملة منفية (isn\'t).',
					'أحسنت! الجملة منفية (isn\'t) فتأخذ any.',
					'olive oil غير معدود ولا يأخذ a.',
					'many للمعدود الجمع فقط.'
				],
				explanationAr: 'في الجمل المنفية نستعمل any مع غير المعدود والمعدود الجمع.'
			},
			{
				questionAr: 'أيّ اسم من الأسماء الآتية غير معدود (Uncountable)؟',
				options: ['date', 'orange', 'honey', 'carrot'],
				correctIndex: 2,
				diagnosticFeedback: [
					'date معدود (dates).',
					'orange معدود (oranges).',
					'ممتاز! honey (العسل) سائل غير معدود ويعامل معاملة المفرد.',
					'carrot معدود (carrots).'
				],
				explanationAr: 'السوائل والمساحيق مثل honey, milk, water, flour كلها أسماء غير معدودة.'
			},
			{
				questionAr: 'أكمل السؤال: "Are there ...... fresh vegetables in the market today?"',
				options: ['some', 'any', 'an', 'much'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في السؤال العادي نستعمل any وليس some.',
					'أحسنت! السؤال يأخذ any مع المعدود الجمع (vegetables).',
					'an للمفرد فقط.',
					'much لغير المعدود فقط.'
				],
				explanationAr: 'في الأسئلة الاستفسارية نستعمل any: Are there any fresh vegetables?'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحويا:',
				options: [
					'We bought some fresh breads.',
					'We bought a fresh bread.',
					'We bought some fresh bread.',
					'We bought any fresh bread.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'bread اسم غير معدود فلا يُجمع بـ s.',
					'bread غير معدود فلا يأخذ أداة التنكير a.',
					'ممتاز! جملة مثبتة مع غير معدود تأخذ some بدون s.',
					'الجملة مثبتة فتأخذ some وليس any.'
				],
				explanationAr: 'كلمة bread غير معدودة وتأخذ some في الإثبات: some fresh bread.'
			},
			{
				questionAr: 'في الطلب أو العرض المؤدب: "Would you like ...... mint tea?" نضع:',
				options: ['any', 'some', 'a', 'many'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في العرض المؤدب (Would you like...?) نستعمل some بدلا من any.',
					'أحسنت! العرض والطلب المؤدب يستثنيان قاعدة السؤال ونستعمل فيهما some.',
					'tea غير معدود فلا يأخذ a.',
					'many للمعدود الجمع.'
				],
				explanationAr: 'في صيغ العرض المؤدب (Would you like...?) نستعمل some: Would you like some mint tea?'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 2: Quantifiers (much, many, a lot of) & Healthy Algerian Diet
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t2_quantifiers_halal_diet',
		slug: 'eng-2am-t2-quantifiers-halal-diet',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'المقطع الثاني: أنا والتسوق — Me and My Shopping',
		order: 2,
		titleAr: 'محددات الكمية (How much / How many / a lot of) والغذاء الصحي الجزائري',
		objectives: [
			'التمييز الدقيق بين "How many" للمعدود الجمع و "How much" لغير المعدود وللسؤال عن السعر',
			'استعمال محددات الكمية (many, much, a lot of) في التسوق الغذائي اليومي',
			'إجراء حوار تسوق مهذب لشراء الخضر والفواكه والأغذية الصحية بالدينار الجزائري'
		],
		keywordsAr: ['How much', 'How many', 'Quantifiers', 'Healthy Diet', 'Shopping Dialogue'],
		discover: {
			scenarioAr:
				'في السوق مع والده، سأل كريم البائع: "Good morning! How much is one kilo of dates? And how many oranges are in this basket? We want a lot of fresh vegetables and a little honey." لاحظ الفرق بين How much و How many.',
			svg: svgEnglishGrammarMap({
				title: 'Quantifiers: How many vs How much',
				rootLabel: 'Asking About Quantity & Price',
				rootSub: 'Choose by the noun type (Countable vs Uncountable)',
				branches: [
					{
						label: 'How many / many',
						rule: 'Plural Countable Nouns',
						example: 'How many eggs do you need?',
						color: '#1d4ed8'
					},
					{
						label: 'How much / much',
						rule: 'Uncountable Nouns & Prices',
						example: 'How much milk? How much is it?',
						color: '#047857'
					},
					{
						label: 'a lot of',
						rule: 'Works with BOTH types (+)',
						example: 'a lot of olives / a lot of water',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'لماذا سأل كريم "How many oranges" ولم يقل "How much oranges"؟',
					hintAr: 'هل كلمة oranges معدود جمع أم غير معدود؟',
					expectedInput: 'oranges is plural countable',
					revealAr: 'لأن "oranges" اسم معدود جمع، والسؤال عن العدد يستعمل دائما "How many".'
				},
				{
					promptAr: 'لماذا استعمل كريم "How much" عند سؤاله عن سعر كيلو التمر (one kilo of dates)؟',
					hintAr: 'تذكّر استعمال How much للسعر والمال.',
					expectedInput: 'for price',
					revealAr: 'نستعمل "How much" دائما للسؤال عن السعر (How much is it? / How much does it cost?) وكذلك للكميات غير المعدودة.'
				},
				{
					promptAr: 'ما الميزة العملية لعبارة "a lot of" في الجمل المثبتة؟',
					hintAr: 'انظر الفرع الثالث في المخطط.',
					expectedInput: 'works with both countable and uncountable',
					revealAr: 'عبارة "a lot of" (الكثير من) تصلح في الإثبات مع المعدود الجمع وغير المعدود معا!'
				}
			]
		},
		summary: {
			rulesAr: [
				'How many + اسم معدود جمع: للسؤال عن العدد. مثال: How many apples do you want? — I want six apples.',
				'How much + اسم غير معدود: للسؤال عن الكمية. مثال: How much olive oil do we need? — One litre.',
				'How much للسعر: How much is a kilo of dates? — It is 600 Algerian Dinars.',
				'محددات الكمية في الجمل: many (للمعدود)، much (لغير المعدود غالبا في النفي)، a lot of (لكليهما في الإثبات).',
				'وحدات القياس في التسوق الجزائري: a kilo of (كيلوغرام)، a litre of (لتر)، a jar of honey (مرطبان عسل)، a loaf of bread (رغيف خبز)، a packet of couscous (علبة كسكس).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Polite Shopping Dialogue Structure',
				steps: [
					{ stage: 'Greeting', detail: 'Shopkeeper: Good morning! Can I help you?' },
					{ stage: 'Request', detail: 'Customer: Yes, please. I would like two kilos of tomatoes.' },
					{ stage: 'Price', detail: 'Customer: How much is it? — Shopkeeper: It is 300 Dinars.' },
					{ stage: 'Thanking', detail: 'Customer: Here you are. Thank you! — Goodbye!' }
				]
			}),
			visualCaptionAr: 'خطوات حوار التسوق المهذب في السوق الجزائري باللغة الإنجليزية',
			examples: [
				{
					problemAr: 'أكمل بـ (How much / How many): 1) ...... sugar do you take in tea? 2) ...... tomatoes are in the bag?',
					solutionAr: '1) How much sugar (غير معدود). 2) How many tomatoes (معدود جمع).'
				},
				{
					problemAr: 'أكمل بوحدة قياس مناسبة: "My mother bought a ...... of honey and two ...... of milk."',
					solutionAr: 'a jar of honey and two litres (or cartons) of milk.'
				}
			],
			watchOutAr:
				'انتبه! لا تستعمل "How much" قبل اسم جمع معدود مثل (apples / eggs)، ولا تستعمل "How many" للسؤال عن السعر أبدا؛ السعر دائما "How much is...?"'
		},
		practice: [
			{
				questionAr: 'اختر أداة السؤال الصحيحة: "...... flour do we need for homemade bread?"',
				options: ['How many', 'How much', 'How old', 'How tall'],
				correctIndex: 1,
				diagnosticFeedback: [
					'flour (الدقيق) غير معدود فلا يأخذ How many.',
					'أحسنت! الدقيق اسم غير معدود فيأخذ How much.',
					'How old للعمر.',
					'How tall للطول.'
				],
				explanationAr: 'flour اسم غير معدود، فنسأل عن كميته بـ How much.'
			},
			{
				questionAr: 'أكمل السؤال عن العدد: "...... eggs are there in the basket?"',
				options: ['How much', 'How many', 'How long', 'How often'],
				correctIndex: 1,
				diagnosticFeedback: [
					'eggs معدود جمع ولا يأخذ How much.',
					'ممتاز! eggs اسم معدود جمع فيأخذ How many.',
					'How long للمدة أو الطول.',
					'How often لعدد مرات التكرار.'
				],
				explanationAr: 'كلمة eggs معدود جمع، فنسأل عنها بـ How many.'
			},
			{
				questionAr: 'كيف تسأل البائع عن ثمن كيلو من الزيتون (a kilo of olives)؟',
				options: [
					'How many is a kilo of olives?',
					'How much is a kilo of olives?',
					'Who is a kilo of olives?',
					'Where much is a kilo of olives?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نستعمل How many للسؤال عن السعر.',
					'أحسنت! للسؤال عن الثمن نستعمل دائما How much is...?',
					'Who للعاقل.',
					'التركيب غير صحيح.'
				],
				explanationAr: 'السؤال الثابت عن الثمن هو: How much is ...? (أو How much are ...? للجمع).'
			},
			{
				questionAr: 'اختر العبارة الصحية الصحيحة: "To stay healthy, we should drink ...... clean water every day."',
				options: ['many', 'a lot of', 'a few', 'an'],
				correctIndex: 1,
				diagnosticFeedback: [
					'many للمعدود الجمع فقط و water غير معدود.',
					'ممتاز! a lot of تصلح مع غير المعدود (water) في الجملة المثبتة.',
					'a few للمعدود الجمع فقط.',
					'water غير معدود ولا يأخذ an.'
				],
				explanationAr: 'كلمة water غير معدودة، فنستعمل معها في الإثبات a lot of.'
			},
			{
				questionAr: 'ما وحدة القياس الأنسب لكلمة "couscous" في المتجر؟',
				options: ['a bottle of', 'a packet of', 'a loaf of', 'a glass of'],
				correctIndex: 1,
				diagnosticFeedback: [
					'bottle للزجاجات والسوائل.',
					'أحسنت! a packet of couscous (علبة/كيس كسكس) أو a kilo of couscous.',
					'loaf تُستعمل للخبز (a loaf of bread).',
					'glass لكأس ماء أو حليب.'
				],
				explanationAr: 'يُباع الكسكس في علب أو أكياس (a packet of couscous) أو بالكيلو (a kilo of couscous).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 3: Giving Advice (should / should not) & Imperative for Health
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t2_advice_should_imperative',
		slug: 'eng-2am-t2-advice-should-imperative',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا وصحتي — Me and My Health',
		order: 3,
		titleAr: 'تقديم النصيحة الصحية (should / should not) وصيغة الأمر (Imperative)',
		objectives: [
			'تقديم نصائح صحية وإسلامية نافعة باستعمال (should / should not)',
			'استعمال صيغة الأمر المثبتة والمنفية (Verb / Do not + Verb) للتوجيه والوقاية الصحية',
			'التعرف على أسماء الأمراض الشائعة (toothache, stomachache, headache, cold) ونصائح علاجها'
		],
		keywordsAr: ['Giving Advice', 'should / should not', 'Imperative', 'Health & Cleanliness'],
		discover: {
			scenarioAr:
				'أصيب سامي بألم في الأسنان فنصحه الطبيب قائلا: "You should brush your teeth after meals, and you should not eat too many sweets. Drink clean water, eat fresh fruits, and don\'t forget to visit the dentist!" لاحظ طريقتين لتقديم النصيحة: should وصيغة الأمر.',
			svg: svgEnglishGrammarMap({
				title: 'Giving Health Advice: SHOULD & IMPERATIVE',
				rootLabel: 'Two Clear Ways to Advise a Friend',
				rootSub: 'Always use the base verb (no to, no -s, no -ing)',
				branches: [
					{
						label: 'should (+)',
						rule: 'Subject + should + Verb',
						example: 'You should eat vegetables.',
						color: '#047857'
					},
					{
						label: 'should not (-)',
						rule: 'Subject + shouldn\'t + Verb',
						example: 'You shouldn\'t eat junk food.',
						color: '#b45309'
					},
					{
						label: 'Imperative (+ / -)',
						rule: 'Verb...! / Don\'t + Verb...!',
						example: 'Wash hands! Don\'t stay up late!',
						color: '#1d4ed8'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الناقص الذي استعمله الطبيب لنصح سامي بتنظيف أسنانه؟',
					hintAr: 'اقرأ الجملة الأولى في نصيحة الطبيب.',
					expectedInput: 'should',
					revealAr: 'استعمل "should" (ينبغي أن) متبوعة بالفعل المجرد: You should brush your teeth.'
				},
				{
					promptAr: 'كيف نهى الطبيب سامي عن الإكثار من الحلويات باستعمال should؟',
					hintAr: 'لاحظ كلمة النفي بعد should.',
					expectedInput: 'should not',
					revealAr: 'استعمل "should not" (أو shouldn\'t): You should not eat too many sweets.'
				},
				{
					promptAr: 'بمَ بدأت الجمل الثلاث الأخيرة (Drink... / eat... / don\'t forget...)؟ وهل يوجد فيها فاعل (You)؟',
					hintAr: 'هذه هي صيغة الأمر (Imperative) في الإنجليزية.',
					expectedInput: 'Base verb without subject',
					revealAr: 'بدأت مباشرة بالفعل المجرد بدون فاعل (Drink, Eat)، وفي النهي بدأت بـ (Don\'t + Verb).'
				}
			]
		},
		summary: {
			rulesAr: [
				'النصيحة الإيجابية بـ should: Subject + should + Verb (مصدر مجرد بدون to). مثال: You should wash your hands before eating.',
				'النصيحة بالتحذير بـ should not (shouldn\'t): Subject + should not + Verb. مثال: You should not drink sugary sodas.',
				'صيغة الأمر المثبتة (Positive Imperative): نبدأ بالفعل المجرد مباشرة دون فاعل: Practise sport! / Sleep early! / Eat dates and fruits!',
				'صيغة الأمر المنفية (Negative Imperative): نبدأ بـ Do not / Don\'t + الفعل المجرد: Don\'t eat fast food! / Don\'t skip breakfast!',
				'أشهر الأعراض الصحية: headache (صداع)، toothache (ألم أسنان)، stomachache (ألم بطن)، fever (حمى)، cold (زكام)، backache (ألم ظهر).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Healthy Muslim Student Daily Habits',
				steps: [
					{ stage: 'Cleanliness', detail: 'Wash your hands before and after meals.' },
					{ stage: 'Halal Diet', detail: 'Eat fresh fruits, vegetables, olives, dates, and honey.' },
					{ stage: 'Exercise', detail: 'You should practise walking or running regularly.' },
					{ stage: 'Avoid Harm', detail: 'You should not eat junk food or stay up late.' }
				]
			}),
			visualCaptionAr: 'قواعد الصحة والنظافة الأساسية بصيغتي should والأمر لتوظيفها في الوضعيات الإدماجية',
			examples: [
				{
					problemAr: 'قدّم نصيحة لصديقك الذي يشكو من ألم في البطن (stomachache) مستعملا (should) و (should not).',
					solutionAr: 'You should see a doctor and drink warm herbal tea. You should not eat fast food.'
				},
				{
					problemAr: 'حوّل النصيحة إلى صيغة الأمر: "You should not watch screens late at night."',
					solutionAr: 'Do not (Don\'t) watch screens late at night.'
				}
			],
			watchOutAr:
				'تذكّر! بعد should و should not وبعد Don\'t يأتي الفعل دائما في أصله المجرد (بدون to وبدون -s وبدون -ing). لا تقل "He shoulds eats" بل قل "He should eat".'
		},
		practice: [
			{
				questionAr: 'اختر النصيحة الصحيحة لصديق مصاب بالحمى (fever):',
				options: [
					'You should to rest at home.',
					'You should rest at home.',
					'You should resting at home.',
					'You shoulds rest at home.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع to بعد should.',
					'أحسنت! should + المصدر المجرد (rest).',
					'لا نضيف ing بعد should.',
					'لا نضيف s إلى should أبدا.'
				],
				explanationAr: 'القاعدة الثابتة: Subject + should + Base Verb.'
			},
			{
				questionAr: 'أكمل النصيحة الصحية: "You ...... eat too much fast food because it is unhealthy."',
				options: ['should', 'should not', 'must', 'are'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الطعام السريع غير صحي فلا ننصح بتناوله بكثرة.',
					'ممتاز! ننصح بتجنب الأكل غير الصحي بـ should not.',
					'must للواجب والإلزام الإيجابي.',
					'are لا تصلح قبل eat.'
				],
				explanationAr: 'للنهي اللطيف والنصيحة بالابتعاد عن الضار نستعمل should not.'
			},
			{
				questionAr: 'اختر جملة الأمر المنفية الصحيحة (Negative Imperative):',
				options: [
					'Not eat dirty fruit!',
					'Doesn\'t eat dirty fruit!',
					'Don\'t eat dirty fruit!',
					'Don\'t eating dirty fruit!'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'صيغة الأمر المنفية تحتاج Don\'t وليس Not وحدها.',
					'في الأمر نستعمل Don\'t فقط وليس Doesn\'t.',
					'أحسنت! Don\'t + الفعل المجرد (eat).',
					'بعد Don\'t يأتي المصدر المجرد بدون ing.'
				],
				explanationAr: 'الأمر المنفي يتكون دائما من: Do not (Don\'t) + Base Verb.'
			},
			{
				questionAr: 'أيّ نصيحة تناسب شخصا يعاني من ألم الأسنان (toothache)؟',
				options: [
					'Eat a lot of candies.',
					'Brush your teeth and visit the dentist.',
					'Drink very cold soda.',
					'Never wash your mouth.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحلويات تزيد ألم الأسنان.',
					'ممتاز! تنظيف الأسنان وزيارة طبيب الأسنان هما النصيحة الصحيحة.',
					'المشروبات الغازية الباردة تضر الأسنان.',
					'النظافة ضرورية لصحة الفم.'
				],
				explanationAr: 'لعلاج والوقاية من toothache ننظف الأسنان ونزور طبيب الأسنان (dentist).'
			},
			{
				questionAr: 'حوّل الجملة إلى صيغة الأمر المثبتة: "You should wash your hands before eating."',
				options: [
					'Washing your hands before eating.',
					'Wash your hands before eating.',
					'To wash your hands before eating.',
					'Washes your hands before eating.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأمر لا يبدأ بصيغة ing.',
					'أحسنت! نحذف You should ونبدأ مباشرة بالمصدر: Wash your hands before eating.',
					'الأمر لا يبدأ بـ to.',
					'الأمر لا يأخذ نهاية -es.'
				],
				explanationAr: 'لصياغة الأمر المثبت نحذف الفاعل و should ونبدأ بالفعل المجرد مباشرة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// Lesson 4: Pronunciation of /r/ (Silent vs Pronounced) & Final -s
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_2am_t2_pronunciation_r_final_s',
		slug: 'eng-2am-t2-pronunciation-r-final-s',
		grade: '2am',
		yearSubjectId: 626,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا وصحتي — Me and My Health',
		order: 4,
		titleAr: 'نطق حرف (/r/) (منطوق أم صامت) ونطق النهاية (-s)',
		objectives: [
			'معرفة قاعدة نطق حرف (r) في الإنجليزية البريطانية المقررة في الجزائر (Pronounced /r/ vs Silent /r/)',
			'تصنيف كلمات التسوق والصحة بين عمود /r/ المنطوق وعمود /r/ الصامت بدقة',
			'تثبيت مهارة تصنيف النهاية (-s / -es) في أسماء الأطعمة وأفعال الصحة (/s/, /z/, /iz/)'
		],
		keywordsAr: ['Silent r', 'Pronounced r', 'British English', 'Final -s', 'Phonology'],
		discover: {
			scenarioAr:
				'في حصة النطق، كتبت الأستاذة كلمتين عن الصحة والتسوق: "fresh fruit" و "doctor / water / carrot". لاحظ التلاميذ أن حرف (r) يُنطق بوضوح في (fresh, fruit, carrot) لكنه لا يُنطق في آخر (doctor, water) ولا قبل الحرف الساكن في (market, sport)!',
			svg: svgEnglishPhoneticsChart({
				title: 'Pronounced /r/ vs Silent /r/ (British English)',
				subtitle: 'Look at what comes RIGHT AFTER the letter r!',
				columns: [
					{
						sound: 'Pronounced /r/',
						rule: 'Before a VOWEL (a, e, i, o, u)',
						examples: 'red, fruit, bread, carrot, orange',
						color: '#047857'
					},
					{
						sound: 'Silent /r/',
						rule: 'At the END or before CONSONANT',
						examples: 'water, doctor, market, sport',
						color: '#b45309'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الذي جاء بعد (r) في كلمات: "red, bread, orange, carrot"؟ هل (r) منطوق فيها؟',
					hintAr: 'الحروف بعد r هي: e, e, a, o (حروف علة).',
					expectedInput: 'Vowel — pronounced /r/',
					revealAr: 'جاء بعد (r) حرف علة (vowel)، لذلك يُنطق حرف /r/ بوضوح!'
				},
				{
					promptAr: 'أين وقع حرف (r) في "doctor, water, sugar" وفي "market, sport, morning"؟',
					hintAr: 'هل جاء بعده حرف علة أم جاء في آخر الكلمة أو قبل حرف ساكن؟',
					expectedInput: 'At the end or before a consonant — silent /r/',
					revealAr: 'جاء في آخر الكلمة (doctor, water) أو قبل حرف ساكن (market: k، sport: t)، فيكون صامتا (Silent r)!'
				},
				{
					promptAr: 'كيف نصنّف كلمة "carrots" و "oranges" و "apples" حسب نطق النهاية (-s)؟',
					hintAr: 'انظر الحرف الأخير قبل s: (t / ge / l).',
					expectedInput: 'carrots /s/, oranges /iz/, apples /z/',
					revealAr: 'carrots تنتهي بـ t (/s/)، oranges تنتهي بصوت ge (/iz/)، و apples تنتهي بـ l (/z/).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية لحرف /r/ (المنهج البريطاني الرسمي في الجزائر): انظر دائما إلى ما يأتي بعد حرف (r)!',
				'يُنطق حرف /r/ (Pronounced r) إذا جاء بعده صوت علة (a, e, i, o, u, y): rice, red, bread, fruit, carrot, orange, fresh, healthy breakfast.',
				'يكون حرف /r/ صامتا (Silent r) في حالتين: (1) في آخر الكلمة (water, doctor, sugar, dinner, flour)، و(2) قبل حرف ساكن (market, sport, morning, fork, hurt, park).',
				'تذكير سريع بنطق النهاية (-s): /s/ بعد (p, t, k, f) مثل (carrots, shops)، و /iz/ بعد (s, sh, ch, x, z, ge, ce) مثل (oranges, dishes, peaches)، و /z/ بعد البقية (apples, olives, bananas).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Quick Check for Letter R in Exams',
				rootLabel: 'Find the letter R and look RIGHT',
				rootSub: 'One simple check gives full marks!',
				branches: [
					{
						label: 'R + Vowel',
						rule: 'r + a, e, i, o, u',
						example: 'rice, carrot (Pronounced)',
						color: '#047857'
					},
					{
						label: 'R + Consonant',
						rule: 'r + k, t, d, n, m...',
						example: 'market, sport (Silent)',
						color: '#b45309'
					},
					{
						label: 'R at the End',
						rule: '...r (final letter)',
						example: 'water, doctor (Silent)',
						color: '#1d4ed8'
					}
				]
			}),
			visualCaptionAr: 'قاعدة الفحص السريع: انظر إلى يمين حرف r لتعرف هل هو منطوق أم صامت',
			examples: [
				{
					problemAr: 'صنّف الكلمات حسب نطق /r/ (Pronounced / Silent): rice, sugar, sport, fresh.',
					solutionAr: 'Pronounced /r/: rice (قبل i), fresh (قبل e). Silent /r/: sugar (في النهاية), sport (قبل t الساكن).'
				},
				{
					problemAr: 'صنّف أسماء الأطعمة حسب نهاية (-s): dates, olives, peaches, nuts.',
					solutionAr: '/s/: dates, nuts. /z/: olives. /iz/: peaches.'
				}
			],
			watchOutAr:
				'انتبه لكلمات مثل "more" و "store" و "before": حرف (e) في آخرها صامت لا يُنطق، لذلك ينتهي النطق بصوت علة ويكون حرف (r) صامتا فيها أيضا!'
		},
		practice: [
			{
				questionAr: 'في أيّ كلمة يكون حرف (r) منطوقا (Pronounced r)؟',
				options: ['water', 'market', 'carrot', 'sport'],
				correctIndex: 2,
				diagnosticFeedback: [
					'في water جاء حرف r في النهاية فهو صامت.',
					'في market جاء حرف r قبل الساكن k فهو صامت.',
					'أحسنت! في carrot جاء بعد rr حرف العلة o فيُنطق /r/.',
					'في sport جاء حرف r قبل الساكن t فهو صامت.'
				],
				explanationAr: 'في كلمة carrot يتبع حرف r صوت علة (o) لذلك يكون منطوقا.'
			},
			{
				questionAr: 'في أيّ كلمة يكون حرف (r) صامتا (Silent r)؟',
				options: ['rice', 'bread', 'doctor', 'fresh'],
				correctIndex: 2,
				diagnosticFeedback: [
					'في rice يتبع r حرف العلة i فهو منطوق.',
					'في bread يتبع r صوت علة ea فهو منطوق.',
					'ممتاز! في doctor جاء حرف r في آخر الكلمة فهو صامت.',
					'في fresh يتبع r حرف العلة e فهو منطوق.'
				],
				explanationAr: 'حرف r في نهاية الكلمة (doctor, water, dinner) صامت في الإنجليزية البريطانية.'
			},
			{
				questionAr: 'اختر الكلمة التي يكون فيها حرف (r) صامتا لأنه سبق حرفا ساكنا:',
				options: ['orange', 'morning', 'fruit', 'green'],
				correctIndex: 1,
				diagnosticFeedback: [
					'في orange بعد r حرف علة (a) فهو منطوق.',
					'أحسنت! في morning بعد r حرف ساكن (n) فيكون r صامتا.',
					'في fruit بعد r حرف علة (u) فهو منطوق.',
					'في green بعد r حرف علة (ee) فهو منطوق.'
				],
				explanationAr: 'في morning و sport و market يأتي بعد r حرف ساكن، لذا يكون صامتا.'
			},
			{
				questionAr: 'كيف تُنطق النهاية (-s) في كلمة "oranges"؟',
				options: ['/s/', '/z/', '/iz/', 'صامتة'],
				correctIndex: 2,
				diagnosticFeedback: [
					'المقطع ge لا ينتمي لعمود /s/.',
					'المقطع ge من أصوات الصفير فيأخذ /iz/.',
					'ممتاز! orange تنتهي بصوت /dj/ (ge) فتأخذ /iz/.',
					'النهاية منطوقة.'
				],
				explanationAr: 'الكلمات المنتهية بـ ge مثل oranges و fridges تُنطق نهايتها /iz/.'
			},
			{
				questionAr: 'كيف تُنطق النهاية (-s) في كلمة "carrots"؟',
				options: ['/s/', '/z/', '/iz/', '/r/'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! carrot تنتهي بحرف t (من حروف p, t, k, f) فتُنطق /s/.',
					'الحرف t مهموس فيأخذ /s/ وليس /z/.',
					'عمود /iz/ لحروف الصفير فقط.',
					'/r/ ليس من أصوات النهاية -s.'
				],
				explanationAr: 'تنتهي كلمة carrot بالحرف t فتنطق النهاية -s بالصوت /s/.'
			}
		]
	}
];
