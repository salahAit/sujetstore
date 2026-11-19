import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_3AM_T3: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Expressing Obligation, Prohibition & Advice (must / must not / should)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t3_obligation_prohibition',
		slug: 'eng-3am-t3-obligation-prohibition',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وبيئتي (Me and My Environment)',
		order: 1,
		titleAr: 'التعبير عن الوجوب والمنع والنصيحة (must / must not / should)',
		objectives: [
			'التمييز بين الوجوب القوي (must)، والمنع الصارم (must not)، والنصيحة الودّية (should / should not)',
			'توظيف هذه الأفعال الناقصة لكتابة قواعد حماية البيئة الجزائرية والنظافة'
		],
		keywordsAr: ['must', 'must not', 'should', 'should not', 'obligation', 'prohibition'],
		discover: {
			scenarioAr:
				'علّق تلاميذ النادي البيئي لوحةً في حظيرة الشريعة الوطنية: "Visitors must keep the forest clean. They must not throw plastic bottles or start fires. We should plant more cedar trees." لاحظ الفرق بين must و must not و should!',
			svg: svgEnglishGrammarMap({
				title: 'Modals for Protecting the Environment',
				rootLabel: 'must / must not / should / should not',
				rootSub: 'Always followed by bare verb stem (no to, no -s)',
				branches: [
					{ label: 'Obligation (must)', rule: 'Strong duty / rule', example: 'We must protect forests.', color: '#047857' },
					{ label: 'Prohibition (must not)', rule: 'Strictly forbidden', example: 'You must not hunt rare animals.', color: '#b45309' },
					{ label: 'Advice (should)', rule: 'Good idea / suggestion', example: 'We should recycle paper.', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الفعل الناقص الذي يعبّر عن المنع الصارم لرمي البلاستيك أو إشعال النار في الغابة؟',
					hintAr: 'هو صيغة النفي لـ must.',
					expectedInput: 'must not',
					revealAr: 'نستعمل (must not) للتعبير عن المنع الصارم (Prohibition): Visitors must not start fires.'
				},
				{
					promptAr: 'ما الفرق في درجة القوة بين (must) و (should)؟',
					hintAr: 'أحدهما واجب ملزم والآخر نصيحة حسنة.',
					expectedInput: 'must للوجوب الملزم و should للنصيحة',
					revealAr: '(must) تفيد الوجوب والالتزام القوي (Obligation)، بينما (should) تفيد النصيحة المستحسنة (Advice).'
				},
				{
					promptAr: 'ما شكل الفعل الذي يأتي بعد (must / must not / should / should not)؟',
					hintAr: 'تماماً مثل can في الفصل الأول.',
					expectedInput: 'أصل الفعل مجرداً (bare stem)',
					revealAr: 'يأتي بعدها دائماً أصل الفعل مجرداً بدون (to) وبدون (-s) وبدون (-ing)، مثل: must protect، should plant.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الوجوب (Obligation): Subject + must + bare stem — مثال: Citizens must save water and protect nature.',
				'المنع والتحريم (Prohibition): Subject + must not + bare stem — مثال: Hunters must not kill the fennec fox.',
				'النصيحة الإيجابية (Advice): Subject + should + bare stem — مثال: Pupils should join school eco-clubs.',
				'النصيحة السلبية (Negative Advice): Subject + should not + bare stem — مثال: People should not waste electricity.',
				'قاعدة ثابتة: هذه الأفعال الناقصة لا تتغيّر مع الضمائر ولا تتبعها (to) أبداً.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Eco-Rules & Civic Duty',
				tenseName: 'must / must not / should',
				formula: 'Subject + must / must not / should + Verb (stem)',
				activeZone: 'present',
				example: 'We must keep Algeria green and must not pollute our rivers.',
				markers: 'obligatory, strictly forbidden, advisable, eco-friendly'
			}),
			visualCaptionAr: 'بنية جملة الوجوب والمنع والنصيحة باستعمال الأفعال الناقصة في 3AM',
			examples: [
				{
					problemAr: 'أعد كتابة اللافتة باستعمال (must not): "Do not cut down cedar trees."',
					solutionAr: 'People must not cut down cedar trees.'
				},
				{
					problemAr: 'صحّح الخطأ: "Every pupil must to keeps the schoolyard tidy."',
					solutionAr: 'Every pupil must keep the schoolyard tidy. (حذفنا to وحذفنا s).'
				}
			],
			watchOutAr:
				'في الاختبارات: إذا طلب منك تحويل جملة نهي تبدأ بـ (Do not ...) إلى جملة منع، فاستعمل (You must not + stem). وإذا كانت الجملة أمراً إيجابياً إلزامياً فاستعمل (You must + stem).'
		},
		practice: [
			{
				questionAr: 'اختر الفعل الناقص المناسب: "Water is a great blessing; we ...... waste it."',
				options: ['must', 'must not', 'should', 'can'],
				correctIndex: 1,
				diagnosticFeedback: [
					'must تعني يجب أن نُبذّره وهذا عكس المعنى.',
					'أحسنت! must not تعبّر عن المنع التام لتبذير الماء.',
					'should تعني يُنصح بتبذيره وهو خاطئ.',
					'can تعني نستطيع ولا تفيد المنع.'
				],
				explanationAr: 'تبذير الماء سلوك مرفوض وممنوع فنستعمل must not.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة نحوياً:',
				options: [
					'Tourists must to respect national parks.',
					'Tourists must respects national parks.',
					'Tourists must respect national parks.',
					'Tourists must respecting national parks.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نضع to بعد must.',
					'لا نضيف -s للفعل بعد must.',
					'ممتاز! بعد must يأتي الفعل مجرداً (respect).',
					'لا نضيف -ing بعد must.'
				],
				explanationAr: 'القاعدة: Subject + must + bare stem.'
			},
			{
				questionAr: 'حوّل اللافتة إلى جملة منع: "Do not drop litter in the street."',
				options: [
					'You must drop litter in the street.',
					'You must not drop litter in the street.',
					'You should drop litter in the street.',
					'You must not to drop litter in the street.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا عكس النهي.',
					'صحيح! نحول (Do not + stem) إلى (You must not + stem).',
					'should للنصيحة الإيجابية هنا فتعكس المعنى.',
					'لا نضع to بعد must not.'
				],
				explanationAr: 'صيغة المنع المقابلة للنهي (Do not) هي (must not + stem).'
			},
			{
				questionAr: 'أي جملة تعبّر عن نصيحة ودّية (Advice)؟',
				options: [
					'You should reuse cloth bags when shopping.',
					'You must not light fires in dry forests.',
					'He can name five Algerian parks.',
					'They used to walk to the village.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! should هي أداة تقديم النصيحة.',
					'must not للمنع الصارم.',
					'can للقدرة.',
					'used to للعادة الماضية.'
				],
				explanationAr: 'نستعمل should لإعطاء نصيحة إيجابية.'
			},
			{
				questionAr: 'أكمل الجملة: "Rare animals in Tassili n-Ajjer are in danger, so we ...... protect them."',
				options: ['must not', 'should not', 'must', 'cannot'],
				correctIndex: 2,
				diagnosticFeedback: [
					'must not تعكس معنى الحماية.',
					'should not تعكس معنى الحماية.',
					'رائع! حماية الحيوانات المهددة واجب فنستعمل must.',
					'cannot تفيد عدم القدرة.'
				],
				explanationAr: 'الواجب البيئي يُعبَّر عنه بـ must + bare stem.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Expressing Cause & Effect (because, as, so, therefore)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t3_cause_effect_connectors',
		slug: 'eng-3am-t3-cause-effect-connectors',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وبيئتي (Me and My Environment)',
		order: 2,
		titleAr: 'التعبير عن السبب والنتيجة (because, as / so, therefore)',
		objectives: [
			'التمييز الدقيق بين أدوات السبب (because, as, since) وأدوات النتيجة (so, therefore, as a result)',
			'إعادة صياغة الجمل البيئية بالتحويل بين السبب والنتيجة مع احترام علامات الترقيم'
		],
		keywordsAr: ['because', 'as', 'since', 'so', 'therefore', 'cause and effect'],
		discover: {
			scenarioAr:
				'قارن بين الجملتين الآتيتين: 1) "Many wild animals are endangered because hunters destroy their habitats." 2) "Hunters destroy their habitats; therefore, many wild animals are endangered." هل تغيّر المعنى أم تغيّر موضع السبب والنتيجة فقط؟',
			svg: svgEnglishGrammarMap({
				title: 'Cause & Effect Connectors (3AM)',
				rootLabel: 'Logical Link: Cause and Effect',
				rootSub: 'Identify which clause is the REASON and which is the RESULT',
				branches: [
					{ label: 'CAUSE (Reason)', rule: 'because / as / since + Cause', example: 'Air is dirty because factories emit smoke.', color: '#1d4ed8' },
					{ label: 'EFFECT (so)', rule: 'Cause, so + Effect', example: 'Trees clean air, so we plant them.', color: '#047857' },
					{ label: 'EFFECT (therefore)', rule: 'Cause; therefore, + Effect', example: 'Trash harms fish; therefore, we recycle.', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، أيهما السبب (Cause) وأيهما النتيجة (Effect)؟',
					hintAr: 'السبب يأتي دائماً مباشرة بعد because.',
					expectedInput: 'السبب: تدمير الموطن، والنتيجة: تهديد الحيوانات بالانقراض',
					revealAr: 'السبب هو (hunters destroy their habitats) والنتيجة هي (many wild animals are endangered).'
				},
				{
					promptAr: 'ماذا جاء مباشرة بعد أداة النتيجة (therefore) في الجملة الثانية؟',
					hintAr: 'انظر إلى العبارة التي تلت therefore.',
					expectedInput: 'النتيجة (many wild animals are endangered)',
					revealAr: 'بعد (so / therefore / as a result) تأتي النتيجة دائماً.'
				},
				{
					promptAr: 'ما الفرق في علامات الترقيم بين (so) و (therefore)؟',
					hintAr: 'انظر إلى الفاصلة المنقوطة والفاصلة حول therefore.',
					expectedInput: 'so تسبقها فاصلة، و therefore تسبقها نقطة أو فاصلة منقوطة وتليها فاصلة',
					revealAr: 'نكتب: (Cause, so Effect.) أما مع therefore فنكتب: (Cause. Therefore, Effect.) أو (Cause; therefore, Effect.).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات السبب (Cause): (because / as / since) — يأتي بعدها السبب مباشرة. مثال: The beach is clean because volunteers collected the plastic.',
				'يمكن البدء بـ (As / Since / Because) في أول الجملة بشرط وضع فاصلة في الوسط: As water is scarce, we must save it.',
				'أدوات النتيجة (Effect): (so / therefore / as a result) — يأتي بعدها النتيجة مباشرة. مثال: Volunteers collected the plastic, so the beach is clean.',
				'طريقة التحويل السريعة في الفروض: حدّد (السبب) و(النتيجة) أولاً، ثم ضع (because / as) قبل السبب، أو ضع (so / therefore) قبل النتيجة.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '3-Step Method to Rewrite Cause & Effect',
				steps: [
					{ stage: 'Step 1: Label', detail: 'Find which sentence is the CAUSE and which is the EFFECT.' },
					{ stage: 'Step 2: Choose', detail: 'because/as/since before CAUSE | so/therefore before EFFECT.' },
					{ stage: 'Step 3: Punctuate', detail: 'Use comma before so; use period/semicolon + comma with therefore.' }
				]
			}),
			visualCaptionAr: 'الخطوات الثلاث المضمونة لدمج جمل السبب والنتيجة دون أي خطأ منطقي',
			examples: [
				{
					problemAr: 'اربط الجملتين بـ (because) ثم بـ (so): "Factories release toxic smoke. The air is polluted."',
					solutionAr: '1) The air is polluted because factories release toxic smoke. 2) Factories release toxic smoke, so the air is polluted.'
				},
				{
					problemAr: 'أعد الكتابة بـ (Therefore): "Plastic does not decay quickly because it is synthetic." (اربط السبب بالنتيجة).',
					solutionAr: 'Plastic is synthetic; therefore, it does not decay quickly.'
				}
			],
			watchOutAr:
				'إياك أن تجمع بين أداة سبب وأداة نتيجة في نفس الجملة! خطأ شائع جداً: "Because it rained heavily, so we stayed inside." الصواب أن تستعمل واحدة فقط: "Because it rained heavily, we stayed inside." أو "It rained heavily, so we stayed inside."'
		},
		practice: [
			{
				questionAr: 'اختر الرابط الصحيح: "Forest fires destroy habitats; ......, many birds lose their nests."',
				options: ['because', 'as', 'therefore', 'since'],
				correctIndex: 2,
				diagnosticFeedback: [
					'because تأتي قبل السبب، وهنا الجملة الثانية نتيجة.',
					'as أداة سبب وليست أداة نتيجة.',
					'ممتاز! الجملة الثانية نتيجة، وعلامات الترقيم تناسب therefore.',
					'since أداة سبب وليست أداة نتيجة.'
				],
				explanationAr: 'فقدان الطيور لأعشاشها هو نتيجة حرائق الغابات، فنستعمل therefore.'
			},
			{
				questionAr: 'اختر الرابط الصحيح: "We must plant trees ...... they produce oxygen and shade."',
				options: ['so', 'therefore', 'because', 'as a result'],
				correctIndex: 2,
				diagnosticFeedback: [
					'so للنتيجة وليس للسبب.',
					'therefore للنتيجة.',
					'صحيح! إنتاج الأكسجين هو السبب الذي يدفعنا لغرس الأشجار.',
					'as a result للنتيجة.'
				],
				explanationAr: 'الجملة الثانية تبيّن السبب، فنربط بـ because.'
			},
			{
				questionAr: 'أي جملة مكتوبة بطريقة صحيحة نحوياً؟',
				options: [
					'Because the river was dirty, so the fish died.',
					'The river was dirty, so the fish died.',
					'The fish died, so the river was dirty.',
					'The river was dirty because the fish died.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجوز الجمع بين because و so في جملة واحدة.',
					'أحسنت! السبب أولاً ثم فاصلة و so ثم النتيجة.',
					'هذا يعكس السبب والنتيجة منطقياً.',
					'موت السمك هو النتيجة وليس سبب تلوث النهر.'
				],
				explanationAr: 'السبب (تلوث النهر) أدّى إلى النتيجة (موت السمك) فنربط بـ so.'
			},
			{
				questionAr: 'اختر التحويل الصحيح باستعمال (As): "The fennec fox is rare, so Algeria protects it."',
				options: [
					'As Algeria protects it, the fennec fox is rare.',
					'As the fennec fox is rare, Algeria protects it.',
					'Algeria protects it, as the fennec fox is rare, so.',
					'The fennec fox is rare as Algeria protects it.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عكست الجملة السبب والنتيجة.',
					'ممتاز! وضعنا As قبل السبب (is rare) ثم فاصلة ثم النتيجة.',
					'لا نضيف so في نهاية الجملة.',
					'وضع As قبل النتيجة يعكس المعنى.'
				],
				explanationAr: 'As تعادل because وتوضع قبل السبب مباشرة.'
			},
			{
				questionAr: 'أكمل الجملة: "Recycling paper saves thousands of trees; ......, every school should have recycling bins."',
				options: ['because', 'since', 'as a result', 'while'],
				correctIndex: 2,
				diagnosticFeedback: [
					'because للسبب.',
					'since للسبب.',
					'صحيح! as a result تعبّر عن النتيجة تماماً مثل therefore.',
					'while للزمن.'
				],
				explanationAr: 'الجملة الثانية نتيجة منطقية لتوفير الأشجار، فنستعمل as a result.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. The Imperative for Protecting Algeria's Nature & Wildlife
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t3_imperative_nature_algeria',
		slug: 'eng-3am-t3-imperative-nature-algeria',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وبيئتي (Me and My Environment)',
		order: 3,
		titleAr: 'صيغة الأمر لحماية الطبيعة والحياة البرية الجزائرية (The Imperative)',
		objectives: [
			'صياغة جمل الأمر المثبت (Verb stem) والأمر المنفي (Do not + stem) لإعطاء تعليمات بيئية واضحة',
			'التعرّف على معالم الطبيعة والحياة البرية الجزائرية (الشريعة، القالة، طاسيلي ناجر، الفنك، الأيل البربري)'
		],
		keywordsAr: ['Imperative', 'Do not', 'biodiversity', 'endangered', 'Algeria nature'],
		discover: {
			scenarioAr:
				'أعدّ التلاميذ ميثاقاً بيئياً لحماية حظيرتي الشريعة والقالة: "Plant a tree every spring. Save water at home. Do not throw rubbish in rivers. Never harm wild animals." لاحظ بأي نوع من الكلمات بدأت كل جملة!',
			svg: svgEnglishGrammarMap({
				title: 'The Imperative for Eco-Instructions',
				rootLabel: 'Imperative Sentence (No visible subject "You")',
				rootSub: 'Direct, short, clear instructions for posters & charters',
				branches: [
					{ label: 'Positive Command', rule: 'Verb (bare stem) + Object', example: 'Plant trees in your school.', color: '#047857' },
					{ label: 'Negative Command', rule: 'Do not + bare stem', example: 'Do not pollute the beach.', color: '#b45309' },
					{ label: 'Strong Negative', rule: 'Never + bare stem', example: 'Never hunt endangered species.', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'هل يوجد فاعل ظاهر (مثل You أو We) في بداية الجملة "Plant a tree every spring"؟',
					hintAr: 'انظر إلى أول كلمة في الجملة.',
					expectedInput: 'لا، تبدأ مباشرة بأصل الفعل (Plant)',
					revealAr: 'في صيغة الأمر (Imperative) لا نكتب الفاعل (You) لأنه مفهوم ضمناً، ونبدأ مباشرة بأصل الفعل المجرد.'
				},
				{
					promptAr: 'كيف صغنا النهي (الأمر المنفي) في الجملة الثالثة؟',
					hintAr: 'أضفنا كلمتين قبل الفعل throw.',
					expectedInput: 'Do not + bare stem (Do not throw)',
					revealAr: 'نصوغ النهي بوضع (Do not) أو (Never) مباشرة قبل أصل الفعل المجرد.'
				},
				{
					promptAr: 'اذكر حيوانين بريين أو حظيرتين طبيعيتين في الجزائر يجب حمايتهما.',
					hintAr: 'مثل الفنك والأيل البربري وحظيرة الشريعة والقالة وطاسيلي ناجر.',
					expectedInput: 'Fennec fox, Barbary stag, Chrea, El Kala, Tassili n-Ajjer',
					revealAr: 'تتميّز الجزائر بتنوّع بيئي فريد يشمل حظيرة الشريعة (Chrea)، والقالة (El Kala)، وطاسيلي ناجر (Tassili n-Ajjer)، والفنك (fennec fox)، والأيل البربري (Barbary stag).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأمر المثبت (Positive Imperative): نبدأ مباشرة بأصل الفعل المجرد (Bare stem) دون فاعل ودون إضافات: Keep our streets clean! Recycle plastic bottles!',
				'الأمر المنفي / النهي (Negative Imperative): نبدأ بـ (Do not + bare stem) أو (Never + bare stem): Do not waste water. Never light fires in forests.',
				'لجعل النصيحة أكثر لطفاً وأدباً نضيف كلمة (Please) في البداية أو النهاية: Please put your litter in the bin.',
				'مفردات بيئية جزائرية أساسية في 3AM: biodiversity (التنوع البيولوجي)، endangered species (الأنواع المهددة بالانقراض)، national park (حظيرة وطنية)، eco-friendly (صديق للبيئة)، deforestation (إزالة الغابات).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Algeria Natural Heritage & Wildlife',
				steps: [
					{ stage: 'Chrea Park (Blida)', detail: 'Atlas cedar forests and mountain wildlife.' },
					{ stage: 'El Kala (El Tarf)', detail: 'Wetlands, lakes, migratory birds, and Barbary stag.' },
					{ stage: 'Tassili n-Ajjer', detail: 'Saharan plateau, rare cypress trees, and desert wildlife.' },
					{ stage: 'Our Eco-Duty', detail: 'Protect biodiversity, stop pollution, and save water.' }
				]
			}),
			visualCaptionAr: 'أبرز المحميات الطبيعية الجزائرية وواجبنا البيئي في صيغة الأمر',
			examples: [
				{
					problemAr: 'حوّل الجملة إلى صيغة الأمر: "You must turn off the tap when you brush your teeth."',
					solutionAr: 'Turn off the tap when you brush your teeth.'
				},
				{
					problemAr: 'حوّل الجملة إلى النهي (Negative Imperative): "You must not pick wild flowers in the park."',
					solutionAr: 'Do not pick wild flowers in the park.'
				}
			],
			watchOutAr:
				'لا تكتب الفاعل (You) ولا تكتب (-s / -ing / -ed) في صيغة الأمر! خطأ: "Not throw litter" أو "Planting trees". الصواب: "Do not throw litter" و "Plant trees".'
		},
		practice: [
			{
				questionAr: 'اختر جملة الأمر الصحيحة لملصق بيئي:',
				options: [
					'You planting more trees in your town.',
					'Plant more trees in your town.',
					'Plants more trees in your town.',
					'To plant more trees in your town.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'جملة الأمر لا تبدأ بفاعل ولا بـ V-ing.',
					'ممتاز! تبدأ مباشرة بأصل الفعل المجرد (Plant).',
					'لا نضيف -s لفعل الأمر.',
					'لا نضع to قبل فعل الأمر.'
				],
				explanationAr: 'الأمر المثبت يتكون من أصل الفعل المجرد مباشرة في بداية الجملة.'
			},
			{
				questionAr: 'اختر جملة النهي (الأمر المنفي) الصحيحة:',
				options: [
					'Not waste clean water.',
					'Does not waste clean water.',
					'Do not waste clean water.',
					'Do not wasting clean water.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نحتاج إلى الفعل المساعد Do قبل not.',
					'الأمر المنفي يستعمل Do not دائماً وليس Does not.',
					'أحسنت! Do not + bare stem (waste).',
					'بعد Do not يأتي الفعل مجرداً دون -ing.'
				],
				explanationAr: 'النهي في الإنجليزية هو: Do not + bare stem.'
			},
			{
				questionAr: 'حوّل إلى صيغة الأمر: "You should switch off the lights when you leave."',
				options: [
					'Switch off the lights when you leave.',
					'Switched off the lights when you leave.',
					'Do not switch off the lights when you leave.',
					'You switch off the lights when you leave.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! حذفنا You should وبدأنا بأصل الفعل Switch.',
					'لا نستخدم الماضي في الأمر.',
					'هذا نهي يعكس معنى الجملة الأصلية.',
					'إبقاء You يجعلها جملة خبرية لا أمرية.'
				],
				explanationAr: 'لتحويل (You should + stem) إلى أمر نحذف (You should) ونبدأ بـ (stem).'
			},
			{
				questionAr: 'ماذا تعني عبارة (endangered species) في نصوص البيئة؟',
				options: [
					'الأنواع المهددة بالانقراض',
					'المباني التاريخية القديمة',
					'الأدوات المدرسية النظيفة',
					'الأشجار المزروعة في الحدائق'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! endangered species تعني الكائنات المهددة بالانقراض.',
					'هذه تعني historic monuments.',
					'لا علاقة لها بالبيئة.',
					'ليست الأشجار المزروعة فقط.'
				],
				explanationAr: 'كلمة endangered مشتقة من danger وتعني معرّضة لخطر الانقراض.'
			},
			{
				questionAr: 'أكمل النصيحة البيئية: "...... throw plastic bags into the sea; they kill marine animals."',
				options: ['Never', 'Always', 'Please', 'Must'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! Never + bare stem تفيد النهي القوي (أبداً لا ترمِ).',
					'Always تعكس المعنى تماماً.',
					'Please وحدها تجعل الجملة أمراً إيجابياً برمي البلاستيك!',
					'Must لا تبدأ بها الجملة الخبرية دون فاعل.'
				],
				explanationAr: 'نستعمل Never قبل أصل الفعل لتأكيد النهي الشديد.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Silent Letters (k, w, h, t, l) & Guided Eco-Article (6 pts)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_3am_t3_silent_letters_eco_article',
		slug: 'eng-3am-t3-silent-letters-eco-article',
		grade: '3am',
		yearSubjectId: 636,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: أنا وبيئتي (Me and My Environment)',
		order: 4,
		titleAr: 'الحروف الصامتة (k, w, h, t, l) ومنهجية كتابة مقال بيئي (6 نقاط)',
		objectives: [
			'تحديد الحروف الصامتة (k, w, h, t, l) داخل الكلمات الإنجليزية الشائعة في 3AM',
			'كتابة مقال بيئي قصير ومتماسك (Eco-Article) يوظّف الوجوب والمنع والسبب والنتيجة والأمر'
		],
		keywordsAr: ['silent letters', 'k, w, h, t, l', 'eco-article', 'pollution', 'written expression'],
		discover: {
			scenarioAr:
				'انطق الكلمات الخمس الآتية بصوت مرتفع: (know, write, honest, listen, walk). في كل كلمة حرفٌ مكتوبٌ لكننا لا ننطقه أبداً! هل يمكنك اكتشاف الحرف الصامت في كل واحدة؟',
			svg: svgEnglishPhoneticsChart({
				title: 'Common Silent Letters in 3AM English',
				subtitle: 'Written in spelling, NOT pronounced when speaking',
				columns: [
					{ sound: 'Silent k / w', rule: 'kn- and wr- at word start', examples: 'know, knife | write, wrong', color: '#1d4ed8' },
					{ sound: 'Silent h / t', rule: 'honest, hour | -sten, -stle', examples: 'hour, honour | listen, castle', color: '#047857' },
					{ sound: 'Silent l', rule: 'Before k, f, m, d in modals', examples: 'walk, talk, half, should', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الحرف الصامت في بداية كلمتي (know) و (knife)، وفي بداية كلمتي (write) و (wrong)؟',
					hintAr: 'انظر إلى أول حرف في كل زوج.',
					expectedInput: 'الحرف k قبل n، والحرف w قبل r',
					revealAr: 'الحرف (k) صامت دائماً قبل (n) في أول الكلمة (know, knee)، والحرف (w) صامت دائماً قبل (r) (write, wrap).'
				},
				{
					promptAr: 'ما الحرف الصامت في كلمتي (listen) و (often)، وفي كلمتي (walk) و (should)؟',
					hintAr: 'قارن النطق بالكتابة في listen و walk.',
					expectedInput: 'الحرف t في listen و often، والحرف l في walk و should',
					revealAr: 'الحرف (t) صامت في (listen, castle, fasten)، والحرف (l) صامت في (walk, talk, calm, half, should, would).'
				},
				{
					promptAr: 'ما العناصر الثلاثة الأساسية لكتابة مقال بيئي (Eco-Article) ناجح في اختبار 3AM؟',
					hintAr: 'مقدمة للتعريف بالمشكلة، وعرض للأسباب والحلول، وخاتمة بدعوة للعمل.',
					expectedInput: 'مقدمة + عرض (الأسباب والحلول) + خاتمة',
					revealAr: 'نبدأ بعنوان ومقدمة عن أهمية البيئة، ثم فقرة عرض تذكر المشكلة وأسبابها والحلول بـ (must / should / because / so)، ثم خاتمة قصيرة بدعوة للعمل.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الحرف الصامت (k): لا يُنطق قبل (n) في بداية الكلمة: know, knowledge, knife, knee, knock.',
				'الحرف الصامت (w): لا يُنطق قبل (r) في بداية الكلمة: write, wrong, wrap, wrist، وكذلك في (two, answer, sword).',
				'الحرف الصامت (h): لا يُنطق في: hour, honest, honour, school, what, where, why, when.',
				'الحرف الصامت (t): لا يُنطق في: listen, castle, whistle, fasten, soften — والحرف الصامت (l): لا يُنطق في: walk, talk, calm, palm, half, should, could.',
				'منهجية المقال البيئي (6 نقاط): احترم الموضوع المطلوب، وظّف الملاحظات المعطاة، اربط بـ (because / therefore / so)، وقدّم حلولاً واضحة بـ (must / must not / should / Imperative).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Guided Eco-Article Blueprint (3AM — 6 pts)',
				steps: [
					{ stage: '1. Title & Intro', detail: 'State the eco-problem (pollution, waste, fires in Algeria).' },
					{ stage: '2. Causes & Effects', detail: 'Explain why it happens using because / so / therefore.' },
					{ stage: '3. Solutions', detail: 'Give clear duties using must, must not, should, Imperative.' },
					{ stage: '4. Closing Call', detail: 'Together, let us keep our Algeria green and clean!' }
				]
			}),
			visualCaptionAr: 'مخطط كتابة المقال البيئي (Eco-Article) لنيل العلامة الكاملة في الوضعية الإدماجية',
			examples: [
				{
					problemAr: 'استخرج الحرف الصامت في كل كلمة: (knowledge - answer - listen - calm - honest).',
					solutionAr: 'knowledge: (k) | answer: (w) | listen: (t) | calm: (l) | honest: (h).'
				},
				{
					problemAr: 'اكتب جملتين نموذجيتين لخاتمة مقال بيئي باستعمال (must) و (so).',
					solutionAr: 'Protecting nature is an Islamic and civic duty, so every pupil must keep the school and neighbourhood clean.'
				}
			],
			watchOutAr:
				'في سؤال الحروف الصامتة (Underline / Circle the silent letter): اقرأ الكلمة بهدوء في ذهنك وحدد الحرف الذي تكتبه ولا تسمعه؛ وانتبه أن كلمة (should) فيها حرف (l) صامت!'
		},
		practice: [
			{
				questionAr: 'ما الحرف الصامت في كلمة (listen)؟',
				options: ['l', 's', 't', 'n'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف l منطوق في بداية listen.',
					'الحرف s منطوق بوضوح.',
					'أحسنت! الحرف t صامت في كلمة listen.',
					'الحرف n منطوق في نهاية الكلمة.'
				],
				explanationAr: 'في الكلمات المنتهية بـ -sten مثل listen و fasten يكون الحرف t صامتاً.'
			},
			{
				questionAr: 'في أي كلمة مما يلي يوجد حرف (k) صامت؟',
				options: ['keep', 'kind', 'knowledge', 'park'],
				correctIndex: 2,
				diagnosticFeedback: [
					'حرف k في keep منطوق.',
					'حرف k في kind منطوق.',
					'ممتاز! في knowledge جاءت k قبل n فهي صامتة.',
					'حرف k في park منطوق.'
				],
				explanationAr: 'الحرف k صامت دائماً عندما يسبق n في بداية الكلمة (know, knowledge, knife).'
			},
			{
				questionAr: 'ما الحرف الصامت في كلمة (should) وكلمة (walk)؟',
				options: ['s', 'l', 'd', 'k'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف s منطوق في should.',
					'صحيح! الحرف l صامت في should و walk و talk و calm.',
					'الحرف d منطوق في نهاية should.',
					'الحرف k منطوق في نهاية walk.'
				],
				explanationAr: 'الحرف l صامت في should, could, would, walk, talk, calm, half.'
			},
			{
				questionAr: 'اختر الكلمة التي تحتوي على حرف (h) صامت:',
				options: ['help', 'habitat', 'honest', 'home'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الحرف h في help منطوق.',
					'الحرف h في habitat منطوق.',
					'أحسنت! نلفظ honest بدون صوت h في البداية (مثل hour و honour).',
					'الحرف h في home منطوق.'
				],
				explanationAr: 'كلمات hour و honest و honour تبدأ بحرف h صامت.'
			},
			{
				questionAr: 'ما الحرف الصامت في كلمتي (write) و (answer)؟',
				options: ['r', 'w', 't', 's'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحرف r منطوق في الكلمتين.',
					'ممتاز! الحرف w صامت في write (قبل r) وفي answer.',
					'الحرف t منطوق في write.',
					'الحرف s منطوق في answer.'
				],
				explanationAr: 'الحرف w صامت في wr- (write, wrong) وفي كلمات مثل answer و two.'
			}
		]
	}
];
