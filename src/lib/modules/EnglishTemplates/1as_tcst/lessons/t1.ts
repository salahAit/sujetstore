import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishWritingStructure
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCST Trimester 1 (Unit 1: Getting Through)
// ============================================================================

export const LESSONS_1AS_TCST_T1: EnglishInteractiveLessonData[] = [
	// 1. Expressing Purpose (in order to / so as to / to)
	{
		id: 'eng_lesson_1as_tcst_t1_purpose_connectors',
		slug: 'eng-1as-tcst-t1-purpose-connectors',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل وتقنيات الإعلام والاتصال',
		order: 1,
		titleAr: 'التعبير عن الغاية والهدف (Expressing Purpose: to, in order to, so as to)',
		objectives: [
			'استعمال روابط الغاية (to, in order to, so as to) لربط جملتين لهما نفس الفاعل',
			'صياغة الغاية المنفية بدقة باستخدام (in order not to / so as not to)',
			'توظيف جمل الغاية في سياق استخدام الحاسوب والإنترنت والدراسة'
		],
		keywordsAr: ['Expressing Purpose', 'in order to', 'so as to', 'in order not to', 'Infinitive'],
		discover: {
			scenarioAr:
				'أراد التلميذ أمين في ثانوية بالجزائر العاصمة أن ينشئ بريدا إلكترونيا دراسيا. سألته أستاذته: "Why did you create an educational email account?" فأجاب: "I created it in order to exchange exercises with my classmates and so as not to miss important announcements." لاحظ الصيغة التي جاءت بعد in order to و so as not to.',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Purpose (Same Subject)',
				rootLabel: 'Action + Purpose Connector + Stem',
				rootSub: 'Why do we do an action?',
				branches: [
					{
						label: 'Affirmative',
						rule: 'to / in order to / so as to + Verb (stem)',
						example: 'She studies hard in order to succeed.'
					},
					{
						label: 'Negative',
						rule: 'in order not to / so as not to + Verb (stem)',
						example: 'Save files so as not to lose data.'
					},
					{
						label: 'Front Position',
						rule: 'In order to + Stem, Subject + Verb',
						example: 'To send a file, click Attach.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع الفعل الذي يأتي مباشرة بعد الروابط (to / in order to / so as to)؟',
					hintAr: 'انظر إلى الفعل exchange في المثال: in order to exchange.',
					expectedInput: 'فعل مجرد غير مصرف (Stem / Base verb)',
					revealAr:
						'يأتي بعد هذه الروابط دائما الفعل في صيغته المجردة (Stem / Bare infinitive) دون إضافة s أو ed أو ing.'
				},
				{
					promptAr: 'كيف ننفي الغاية في الجملة: "Back up your work .......... lose your files"؟',
					hintAr: 'أين نضع كلمة not بالنسبة لكلمة to؟',
					expectedInput: 'in order not to / so as not to',
					revealAr:
						'نضع not قبل to مباشرة فنقول: in order not to lose أو so as not to lose (ولا نقول not to وحدها في الغالب الأكاديمي).'
				},
				{
					promptAr: 'هل يمكن حذف الفاعل المتكرر وفعل want عند ربط جملتين بـ in order to؟',
					hintAr: 'قارن: He uses a dictionary. He wants to check spelling.',
					expectedInput: 'نعم، نحذف الفاعل الثاني وفعل الرغبة want',
					revealAr:
						'نعم! نكتب: He uses a dictionary in order to check spelling. نحذف He wants ونبقي الفعل المجرد فقط.'
				}
			]
		},
		summary: {
			rulesAr: [
				'للتعبير عن الغاية (الإثبات) مع نفس الفاعل نستعمل: Subject + Verb + to / in order to / so as to + Stem.',
				'للتعبير عن الغاية المنفية نستعمل: in order not to + Stem أو so as not to + Stem (انتبه: not تأتي دائما قبل to).',
				'في الروابط الرسمية والكتابة الأكاديمية يفضل استعمال in order to و so as to بدل to وحدها.',
				'يمكن البدء بعبارة الغاية في أول الجملة متبوعة بفاصلة: In order to log in, enter your password.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Transforming Two Sentences into One',
				rootLabel: 'Sentence A (Action) + Sentence B (Goal)',
				rootSub: 'Remove repeated subject + want / aim',
				branches: [
					{
						label: 'Step 1: Keep Action',
						rule: 'Amine opened a folder.',
						example: 'Main clause stays intact'
					},
					{
						label: 'Step 2: Add Linker',
						rule: 'in order to / so as to',
						example: 'Drop "He wanted"'
					},
					{
						label: 'Step 3: Base Verb',
						rule: 'organize his lessons',
						example: '...in order to organize his lessons.'
					}
				]
			}),
			visualCaptionAr: 'خطوات دمج جملتين للتعبير عن الغاية بطريقة صحيحة',
			examples: [
				{
					problemAr: 'اربط الجملتين بـ in order to: "Yasmine uses an antivirus program. She wants to protect her computer."',
					solutionAr: 'Yasmine uses an antivirus program in order to protect her computer.'
				},
				{
					problemAr: 'اربط الجملتين بـ so as not to: "Karim double-checked the email address. He did not want to make a mistake."',
					solutionAr: 'Karim double-checked the email address so as not to make a mistake.'
				}
			],
			watchOutAr:
				'احذر من خطأين شائعين: كتابة "in order to not" بدل "in order not to"، أو تصريف الفعل بعد to مثل "in order to sends" والصحيح دائما الفعل المجرد "in order to send".'
		},
		practice: [
			{
				questionAr: 'اختر الإكمال الصحيح: "Nadia joined the science club .......... improve her programming skills."',
				options: ['in order to', 'in order not', 'so as', 'for to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! in order to + الفعل المجرد improve تعبر بدقة عن الغاية.',
					'غير صحيح؛ صيغة النفي ناقصة وتخالف معنى الجملة.',
					'ينقصها to لتصبح so as to.',
					'تركيب خاطئ تماما في اللغة الإنجليزية.'
				],
				explanationAr: 'نستعمل in order to متبوعة بالفعل المجرد improve للتعبير عن الغاية المثبتة.'
			},
			{
				questionAr: 'أي جملة تعبّر عن الغاية المنفية بشكل سليم نحويا؟',
				options: [
					'He wrote down the password so as to not forget it.',
					'He wrote down the password so as not to forget it.',
					'He wrote down the password in order to forgetting it.',
					'He wrote down the password not in order to forget it.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ في موضع not؛ يجب أن تسبق to.',
					'ممتاز! التركيب السليم هو so as not to + stem.',
					'بعد to لا نضع ing أبدا.',
					'ترتيب الكلمات غير صحيح؛ not تأتي بين as/order و to.'
				],
				explanationAr: 'في النفي نضع not قبل to مباشرة: so as not to forget.'
			},
			{
				questionAr: 'اختر الشكل الصحيح للفعل: "Click on the Save icon so as to .......... your document."',
				options: ['kept', 'keeping', 'keep', 'keeps'],
				correctIndex: 2,
				diagnosticFeedback: [
					'kept في الماضي ولا يصلح بعد so as to.',
					'keeping صيغة ing ولا تصلح بعد to في الغاية.',
					'صحيح! بعد so as to نضع الفعل المجرد keep.',
					'لا نضيف s للفعل بعد to.'
				],
				explanationAr: 'القاعدة ثابتة: to / in order to / so as to يتبعها دائما الفعل المجرد (Stem).'
			},
			{
				questionAr: 'ما الجملة المكافئة لـ: "We check our inbox daily. We want to read our teacher notices."؟',
				options: [
					'We check our inbox daily in order to we read our teacher notices.',
					'We check our inbox daily in order to read our teacher notices.',
					'We check our inbox daily so as not to read our teacher notices.',
					'We check our inbox daily in order to reading our teacher notices.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نكرر الفاعل we بعد in order to.',
					'أحسنت! حذفنا الفاعل المكرر و want وأبقينا الفعل المجرد read.',
					'استخدام النفي عكس المعنى المطلوب.',
					'بعد in order to يأتي الفعل مجردا لا بصيغة ing.'
				],
				explanationAr: 'عند الدمج نحذف الفاعل الثاني وفعل want ونربط بـ in order to + read.'
			},
			{
				questionAr: 'أكمل الجملة: ".......... avoid eye strain, take a short break every thirty minutes."',
				options: ['In order to', 'So as not', 'Because to', 'Although to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'إجابة صحيحة! عبارة الغاية يمكن أن تأتي في بداية الجملة متبوعة بفاصلة.',
					'ينقصها to ولا تناسب المعنى المثبت لتجنب الإجهاد.',
					'because لا تتبعها to.',
					'although أداة استدراك وليست أداة غاية.'
				],
				explanationAr: 'تأتي In order to + stem في بداية الجملة لتوضيح الهدف من النصيحة.'
			}
		]
	},

	// 2. Sequencers & Giving Instructions
	{
		id: 'eng_lesson_1as_tcst_t1_sequencers_instructions',
		slug: 'eng-1as-tcst-t1-sequencers-instructions',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل وتقنيات الإعلام والاتصال',
		order: 2,
		titleAr: 'الروابط الزمنية التسلسلية وإعطاء التعليمات (Sequencers and Imperatives)',
		objectives: [
			'ترتيب خطوات عملية تقنية باستعمال الروابط التسلسلية (First, Next, Then, After that, Finally)',
			'استعمال صيغة الأمر المثبت والمنفي (Imperative) لتقديم إرشادات واضحة',
			'كتابة دليل خطوات قصير لاستعمال الحاسوب أو البريد الإلكتروني'
		],
		keywordsAr: ['Sequencers', 'First', 'Next', 'Then', 'Finally', 'Imperative'],
		discover: {
			scenarioAr:
				'في حصة الإعلام الآلي طلب الأستاذ من التلاميذ كتابة خطوات إرسال ملف عبر البريد الإلكتروني. كتبت مريم: "First, sign in to your account. Next, click on Compose. Then, type the subject and attach your file. Finally, click Send. Do not share your password with strangers."',
			svg: svgEnglishWritingStructure({
				title: 'Sequencing Technical Instructions',
				steps: [
					{ stage: 'First,', detail: 'Start the process: First, switch on the computer.' },
					{ stage: 'Next, / Then,', detail: 'Middle steps: Next, open your web browser.' },
					{ stage: 'After that,', detail: 'Continue: After that, type the website address.' },
					{ stage: 'Finally,', detail: 'End the process: Finally, log out safely.' }
				]
			}),
			steps: [
				{
					promptAr: 'بأي رابط نبدأ الخطوة الأولى وبأي رابط نختم الخطوة الأخيرة؟',
					hintAr: 'راجع نص مريم في بداية الدرس.',
					expectedInput: 'First للبداية و Finally للنهاية',
					revealAr: 'نبدأ دائما بـ First (أولا) ونختم بـ Finally (أخيرا).'
				},
				{
					promptAr: 'ما صيغة الأفعال المستخدمة في التعليمات مثل: sign in, click, type؟',
					hintAr: 'هل يوجد فاعل (you) قبل هذه الأفعال؟',
					expectedInput: 'صيغة الأمر (Imperative — الفعل المجرد بدون فاعل)',
					revealAr: 'تستعمل التعليمات صيغة الأمر (Imperative): نبدأ بالفعل المجرد مباشرة بدون فاعل، وفي النفي نضع Do not قبل الفعل.'
				},
				{
					promptAr: 'ما علامة الترقيم التي تأتي عادة بعد First و Next و Finally في بداية الجملة؟',
					hintAr: 'لاحظ ما بعد الكلمات في المثال: First, sign in...',
					expectedInput: 'الفاصلة (Comma)',
					revealAr: 'نضع فاصلة (,) بعد First, Next, After that, Finally (ويمكن وضعها بعد Then أيضا عند بدء جملة جديدة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الروابط التسلسلية (Sequencers) تنظم الخطوات بترتيب منطقي: First (أولا) — Second / Next (ثانيا/بعدها) — Then (ثم) — After that (بعد ذلك) — Finally (أخيرا).',
				'الأمر المثبت (Affirmative Imperative) يبدأ مباشرة بالفعل المجرد: Open the file. / Save your document.',
				'الأمر المنفي (Negative Imperative) يبدأ بـ Do not (Don-t) + الفعل المجرد: Do not open unknown links.',
				'لربط خطوتين في جملة واحدة يمكن استخدام before / after + Verb-ing مثل: Check your spelling before sending the email.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Imperative Sentences in Instructions',
				rootLabel: 'Imperative Form (No Subject)',
				rootSub: 'Clear, direct commands and advice',
				branches: [
					{
						label: 'Affirmative',
						rule: 'Base Verb + Object',
						example: 'Click on the Print icon.'
					},
					{
						label: 'Negative',
						rule: 'Do not + Base Verb + Object',
						example: 'Do not delete system files.'
					},
					{
						label: 'Polite Order',
						rule: 'Please + Base Verb',
						example: 'Please restart the router.'
					}
				]
			}),
			visualCaptionAr: 'قواعد صياغة جمل الأمر في الإرشادات التقنية',
			examples: [
				{
					problemAr: 'رتب الخطوات باستعمال First, Then, Finally: (press Enter / open the browser / type the educational site address).',
					solutionAr: 'First, open the browser. Then, type the educational site address. Finally, press Enter.'
				},
				{
					problemAr: 'حوّل النصيحة التالية إلى أمر منفي: "You must not use weak passwords."',
					solutionAr: 'Do not use weak passwords.'
				}
			],
			watchOutAr:
				'لا تستعمل Finally في منتصف الخطوات، ولا تضف s أو ed لفعل الأمر (لا تقل Clicks the button أو Opened the file).'
		},
		practice: [
			{
				questionAr: 'أي رابط تسلسلي يناسب الخطوة الأخيرة في شرح خطوات طباعة ملف؟',
				options: ['First,', 'Finally,', 'Before,', 'Next,'],
				correctIndex: 1,
				diagnosticFeedback: [
					'First للخطوة الأولى فقط.',
					'أحسنت! Finally تشير دائما إلى الخطوة الأخيرة.',
					'Before رابط زمني وليس رابط ختام تسلسلي.',
					'Next تستعمل للخطوات الوسطى.'
				],
				explanationAr: 'تستعمل Finally لإعلان آخر خطوة في سلسلة التعليمات.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة بصيغة الأمر المنفي:',
				options: [
					'Not click on suspicious links.',
					'No click on suspicious links.',
					'Do not click on suspicious links.',
					'Does not click on suspicious links.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نحتاج الفعل المساعد Do قبل not.',
					'لا نستعمل No لنفي فعل الأمر.',
					'ممتاز! الأمر المنفي يصاغ دائما بـ Do not + الفعل المجرد.',
					'الأمر يخاطب you فنستعمل Do not وليس Does not.'
				],
				explanationAr: 'الأمر المنفي يتكون دائما من Do not + Stem.'
			},
			{
				questionAr: 'اختر الترتيب المنطقي للروابط في فقرة من أربع خطوات:',
				options: [
					'Finally — First — Next — Then',
					'First — Next — Then — Finally',
					'Next — Finally — First — Then',
					'Then — First — Finally — Next'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يمكن البدء بـ Finally.',
					'صحيح تماما! نبدأ بـ First ثم الوسطى Next و Then ونختم بـ Finally.',
					'الترتيب غير منطقي.',
					'First يجب أن تكون في البداية و Finally في النهاية.'
				],
				explanationAr: 'التسلسل القياسي هو: First ثم Next ثم Then وأخيرا Finally.'
			},
			{
				questionAr: 'أكمل الجملة: "Check the recipient address before .......... the Send button."',
				options: ['press', 'pressed', 'pressing', 'presses'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد حرف الجر before بدون فاعل نحتاج صيغة ing.',
					'الماضي لا يصح بعد before مباشرة دون فاعل.',
					'أحسنت! before / after + Verb-ing قاعدة مهمة في الإرشادات.',
					'لا نضع s بعد before.'
				],
				explanationAr: 'إذا لم يوجد فاعل بعد before أو after نضع الفعل بصيغة Verb-ing.'
			},
			{
				questionAr: 'أي جملة تستخدم صيغة الأمر المثبت بطريقة سليمة؟',
				options: [
					'Saves your homework on a flash drive.',
					'Saving your homework on a flash drive.',
					'Save your homework on a flash drive.',
					'To save your homework on a flash drive.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'فعل الأمر لا يأخذ s.',
					'صيغة ing ليست جملة أمر كاملة.',
					'إجابة صحيحة! نبدأ بالفعل المجرد Save مباشرة.',
					'هذا مصدر غائي وليس أمرا.'
				],
				explanationAr: 'الأمر المثبت يبدأ مباشرة بالفعل المجرد: Save.'
			}
		]
	},

	// 3. Adverbs of Frequency & Degree
	{
		id: 'eng_lesson_1as_tcst_t1_frequency_degree',
		slug: 'eng-1as-tcst-t1-frequency-degree',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل وتقنيات الإعلام والاتصال',
		order: 3,
		titleAr: 'ظروف التكرار وظروف الدرجة (Adverbs of Frequency and Degree)',
		objectives: [
			'التمييز بين درجات التكرار (always, usually, often, sometimes, rarely, never) وموقعها في الجملة',
			'استعمال ظروف الدرجة (very, quite, rather, extremely, fairly) لتقوية أو تخفيف الصفات',
			'طرح السؤال عن التكرار باستعمال How often والإجابة بدقة'
		],
		keywordsAr: ['Frequency Adverbs', 'How often', 'Degree Adverbs', 'extremely', 'quite'],
		discover: {
			scenarioAr:
				'أجاب سفيان في مقابلة مدرسية حول عادات الدراسة الرقمية: "I always review my science notes after Maghrib prayer. I am never late for computer lab. Online dictionaries are extremely helpful, and tablet screens are quite clear." تأمّل موقع always و never وموقع extremely و quite.',
			svg: svgEnglishGrammarMap({
				title: 'Adverbs of Frequency vs Adverbs of Degree',
				rootLabel: 'Two Key Adverb Groups in Unit 1',
				rootSub: 'Watch their exact position in the sentence',
				branches: [
					{
						label: 'Frequency (Main Verb)',
						rule: 'Subject + Adverb + Main Verb',
						example: 'She usually checks her email.'
					},
					{
						label: 'Frequency (Verb to be)',
						rule: 'Subject + am/is/are + Adverb',
						example: 'The network is always fast.'
					},
					{
						label: 'Degree Adverbs',
						rule: 'Degree Adverb + Adjective/Adverb',
						example: 'This app is extremely useful.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'قارن موقع always في "I always review" وموقع never في "I am never late". ما القاعدة؟',
					hintAr: 'لاحظ نوع الفعل في كل جملة (فعل عادي مقابل فعل to be).',
					expectedInput: 'قبل الفعل العادي وبعد فعل to be',
					revealAr:
						'ظرف التكرار يأتي قبل الفعل الرئيسي العادي (always review) لكنه يأتي بعد الفعل المساعد to be (am never).'
				},
				{
					promptAr: 'ما الفرق في الشدة بين "quite clear" و "extremely helpful"؟',
					hintAr: 'أيهما أقوى درجة: quite أم extremely؟',
					expectedInput: 'extremely أقوى جدا من quite',
					revealAr:
						'ظرف الدرجة quite يعني "إلى حد ما / نوعا ما"، بينما extremely يعني "للغاية / بدرجة شديدة جدا".'
				},
				{
					promptAr: 'بأي أداة استفهام نسأل عن عدد مرات تكرار الفعل؟',
					hintAr: 'الإجابة تكون: always / twice a week / rarely.',
					expectedInput: 'How often',
					revealAr: 'نسأل بـ How often: مثل How often do you use the school library?'
				}
			]
		},
		summary: {
			rulesAr: [
				'سلم ظروف التكرار من الأعلى إلى الأدنى: always (100%) — usually (80%) — often (65%) — sometimes (50%) — rarely / seldom (15%) — never (0%).',
				'موقع ظرف التكرار: قبل الفعل العادي (He often reads) وبعد الفعل to be (He is often ready) وبين الفعل المساعد والرئيسي (I have never seen it).',
				'ظروف الدرجة (Adverbs of Degree) تأتي قبل الصفة أو الظرف لتحديد قوته: a bit / slightly (قليلا) — fairly / quite (إلى حد ما) — very (جدا) — extremely (للغاية).',
				'للسؤال عن التكرار نستعمل: How often + do/does + Subject + Stem?'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Scale of Frequency and Degree',
				rootLabel: 'From Lowest to Highest Intensity',
				branches: [
					{
						label: 'Low Level',
						rule: 'never / rarely | a bit / slightly',
						example: 'The task is a bit long.'
					},
					{
						label: 'Medium Level',
						rule: 'sometimes / often | quite / fairly',
						example: 'The screen is quite bright.'
					},
					{
						label: 'High Level',
						rule: 'usually / always | very / extremely',
						example: 'Coding is extremely useful.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة سلم التكرار وسلم الدرجة مع أمثلة تطبيقية',
			examples: [
				{
					problemAr: 'أعد كتابة الجملة بوضع ظرف التكرار في موضعه الصحيح: "Bilal is punctual for his IT class. (always)"',
					solutionAr: 'Bilal is always punctual for his IT class.'
				},
				{
					problemAr: 'اطرح سؤالا مناسبا للإجابة: "I visit the educational portal three times a week."',
					solutionAr: 'How often do you visit the educational portal?'
				}
			],
			watchOutAr:
				'لا تستعمل نفيا مزدوجا مع never! خطأ أن تقول "I do not never play games" والصحيح "I never play games" لأن never تحمل معنى النفي بذاتها.'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة من حيث موضع ظرف التكرار:',
				options: [
					'She checks always her messages.',
					'She always checks her messages.',
					'Always she is checking never her messages.',
					'She is checks always her messages.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ظرف التكرار يسبق الفعل العادي checks لا يتبعه.',
					'أحسنت! Subject + always + checks.',
					'التركيب غير سليم وفيه تناقض بين always و never.',
					'لا نجمع بين is و checks في المضارع البسيط.'
				],
				explanationAr: 'مع الفعل العادي يأتي ظرف التكرار مباشرة قبل الفعل.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة مع فعل to be:',
				options: [
					'The internet connection rarely is slow.',
					'The internet connection is rarely slow.',
					'The internet connection is slow rarely is.',
					'Rarely the connection is not slow.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'مع الفعل is يجب أن يأتي ظرف التكرار بعده.',
					'ممتاز! is + rarely + slow.',
					'تكرار is غير صحيح.',
					'استخدام النفي مع rarely يغير المعنى ويعقد التركيب.'
				],
				explanationAr: 'يأتي ظرف التكرار دائما بعد فعل to be (am / is / are).'
			},
			{
				questionAr: 'أي ظرف درجة هو الأقوى في المعنى؟',
				options: ['a bit', 'fairly', 'quite', 'extremely'],
				correctIndex: 3,
				diagnosticFeedback: [
					'a bit تدل على درجة ضعيفة جدا.',
					'fairly تدل على درجة متوسطة.',
					'quite متوسطة القوة وليست الأقوى.',
					'صحيح! extremely تعني "للغاية" وهي الأقوى بين الخيارات.'
				],
				explanationAr: 'تتدرج ظروف الدرجة من a bit إلى fairly و quite وتصل ذروتها عند extremely.'
			},
			{
				questionAr: 'ما السؤال المناسب للإجابة: "Our teacher usually gives us online quizzes once a month."؟',
				options: [
					'How much does your teacher give you online quizzes?',
					'How often does your teacher give you online quizzes?',
					'How long does your teacher give you online quizzes?',
					'How many does your teacher give you online quizzes?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'How much تسأل عن الكمية أو السعر.',
					'أحسنت! How often تسأل عن التكرار.',
					'How long تسأل عن المدة الزمنية.',
					'How many تسأل عن العدد وتحتاج اسما معدودا بعدها.'
				],
				explanationAr: 'نستعمل How often للسؤال عن معدل تكرار الفعل.'
			},
			{
				questionAr: 'صحح الجملة: "Amine .......... forgets to save his lab report; he is very careful."',
				options: ['always', 'never', 'often', 'usually'],
				correctIndex: 1,
				diagnosticFeedback: [
					'always تناقض كونه حريصا جدا.',
					'إجابة موفقة! لأنه حريص جدا فهو لا ينسى أبدا (never).',
					'often تناقض السياق.',
					'usually تناقض السياق.'
				],
				explanationAr: 'السياق (he is very careful) يقتضي ظرف النفي والتكرار الصفري never.'
			}
		]
	},

	// 4. Writing a Formal Email & Letter of Application
	{
		id: 'eng_lesson_1as_tcst_t1_formal_email_letter',
		slug: 'eng-1as-tcst-t1-formal-email-letter',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Getting Through — التواصل وتقنيات الإعلام والاتصال',
		order: 4,
		titleAr: 'كتابة رسالة رسمية وبريد إلكتروني رسمي (Formal Email and Letter of Application)',
		objectives: [
			'معرفة عناصر الرسالة الرسمية والبريد الإلكتروني الرسمي (الموضوع، التحية، الغرض، الخاتمة)',
			'التمييز بين الأسلوب الرسمي (Formal) وغير الرسمي (Informal) في عبارات الافتتاح والختام',
			'كتابة رسالة طلب تسجيل أو استفسار قصيرة بلغة رسمية مهذبة'
		],
		keywordsAr: ['Formal Email', 'Letter of Application', 'Dear Sir or Madam', 'Yours faithfully', 'Yours sincerely'],
		discover: {
			scenarioAr:
				'يرغب عبد الرحمن (تلميذ سنة أولى ثانوي علوم وتكنولوجيا) في التقدم بطلب للالتحاق بمخيم صيفي علمي للبرمجة في وهران. عليه أن يكتب رسالة رسمية (Letter of Application) لإدارة المركز بلغة مهذبة ومنظمة تتضمن سبب المراسلة ومؤهلاته وخاتمة رسمية.',
			svg: svgEnglishWritingStructure({
				title: 'Structure of a Formal Letter of Application',
				steps: [
					{ stage: 'Header and Date', detail: 'Sender address (right), Recipient (left), Date, Subject line' },
					{ stage: 'Salutation', detail: 'Dear Sir or Madam, (unknown name) / Dear Mr. Benali, (known)' },
					{ stage: 'Body Paragraphs', detail: '1. Reason for writing  2. Skills/Qualifications  3. Polite closing' },
					{ stage: 'Sign-off', detail: 'Yours faithfully, (with Sir/Madam) / Yours sincerely, (with name)' }
				]
			}),
			steps: [
				{
					promptAr: 'إذا افتتحت رسالتك الرسمية بـ "Dear Sir or Madam," فما الخاتمة الرسمية المطابقة لها؟',
					hintAr: 'هناك فرق دقيق بين faithfully و sincerely في الإنجليزية.',
					expectedInput: 'Yours faithfully,',
					revealAr:
						'إذا لم تعرف اسم المرسل إليه وكتبت Dear Sir or Madam نختم بـ Yours faithfully. أما إذا ذكرت اسمه (Dear Mr. Mansouri) فنختم بـ Yours sincerely.'
				},
				{
					promptAr: 'هل نستخدم الاختصارات مثل "I-m" و "can-t" في الرسالة الرسمية؟',
					hintAr: 'فكّر في الفرق بين لغة الأصدقاء ولغة الإدارات.',
					expectedInput: 'لا، نكتب الصيغ الكاملة (I am / cannot)',
					revealAr:
						'في الرسائل الرسمية نتجنب الاختصارات (Contractions) ونكتب I am و I would like و cannot بشكل كامل.'
				},
				{
					promptAr: 'ما أول جملة مثالية لافتتاح فقرة الغرض في رسالة طلب التحاق؟',
					hintAr: 'ابدأ بـ I am writing to...',
					expectedInput: 'I am writing to apply for...',
					revealAr:
						'الجملة القياسية هي: I am writing to apply for the summer coding camp advertised on your website.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الرسالة الرسمية والبريد الرسمي يتبعان بنية ثابتة: سطر الموضوع (Subject) — التحية (Salutation) — سبب الكتابة — التفاصيل والمؤهلات — عبارة ختام مهذبة — التوقيع.',
				'قاعدة التحية والخاتمة: Dear Sir or Madam تقابلها Yours faithfully، و Dear Mr. / Mrs. + اللقب تقابلها Yours sincerely.',
				'استعمل عبارات مهذبة رسمية: "I am writing to apply for...", "I would be grateful if you could...", "I look forward to hearing from you."',
				'تجنب الاختصارات (don-t, I-m) والكلمات العامية (Hi, Bye, Thanks a lot) في المراسلات الرسمية.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Formal vs Informal Register',
				rootLabel: 'Choose the Right Tone for Your Reader',
				branches: [
					{
						label: 'Greeting',
						rule: 'Formal: Dear Sir or Madam,',
						example: 'Informal: Hi / Dear Karim,'
					},
					{
						label: 'Closing Line',
						rule: 'Formal: I look forward to hearing...',
						example: 'Informal: Write back soon!'
					},
					{
						label: 'Sign-off',
						rule: 'Formal: Yours faithfully,',
						example: 'Informal: Best wishes, / Yours,'
					}
				]
			}),
			visualCaptionAr: 'مقارنة سريعة بين الأسلوب الرسمي وغير الرسمي في المراسلات',
			examples: [
				{
					problemAr: 'حوّل الجملة غير الرسمية إلى أسلوب رسمي: "Hi, I wanna join your robotics workshop. Send me the info."',
					solutionAr: 'Dear Sir or Madam, I am writing to apply for your robotics workshop. I would be grateful if you could send me further information.'
				},
				{
					problemAr: 'اختر الخاتمة المناسبة لرسالة بدأت بـ "Dear Mr. Khelifi,".',
					solutionAr: 'I look forward to hearing from you. Yours sincerely, (Full Name)'
				}
			],
			watchOutAr:
				'لا تكتب "I look forward to hear from you"! بعد "look forward to" نضع دائما صيغة ing فنقول: "I look forward to hearing from you."'
		},
		practice: [
			{
				questionAr: 'إذا بدأت رسالتك الرسمية بـ "Dear Sir or Madam," فما الخاتمة الصحيحة؟',
				options: ['Yours sincerely,', 'Yours faithfully,', 'See you soon,', 'Best buddy,'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Yours sincerely تستعمل عند ذكر اسم الشخص.',
					'أحسنت! Dear Sir or Madam تقابلها دائما Yours faithfully.',
					'عبارة غير رسمية للأصدقاء فقط.',
					'عبارة عامية غير رسمية.'
				],
				explanationAr: 'القاعدة القياسية في الإنجليزية البريطانية والمنهاج الجزائري: Dear Sir or Madam مع Yours faithfully.'
			},
			{
				questionAr: 'أكمل العبارة الرسمية الختامية: "I look forward to .......... from you soon."',
				options: ['hear', 'heard', 'hearing', 'hears'],
				correctIndex: 2,
				diagnosticFeedback: [
					'to هنا حرف جر يتبعه اسم أو Verb-ing.',
					'الماضي غير صحيح هنا.',
					'ممتاز! التركيب الثابت هو look forward to + Verb-ing.',
					'لا نضع s بعد to.'
				],
				explanationAr: 'في عبارة look forward to تكون to حرف جر لذا يأتي بعدها الفعل مضافا إليه ing.'
			},
			{
				questionAr: 'أي جملة تناسب البريد الإلكتروني الرسمي بشكل أفضل؟',
				options: [
					'Hey! Can u tell me when the course starts?',
					'I am writing to inquire about the starting date of the course.',
					'Tell me the date right now, thanks!',
					'I wanna know the starting date.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لغة رسائل نصية غير رسمية.',
					'أحسنت! صياغة رسمية كاملة ومهذبة خالية من الاختصارات.',
					'أسلوب فظ وغير مهذب.',
					'wanna كلمة عامية تمنع في الكتابة الرسمية.'
				],
				explanationAr: 'الرسالة الرسمية تتطلب جملا كاملة ومهذبة مثل I am writing to inquire about...'
			},
			{
				questionAr: 'ما الغرض من سطر الموضوع (Subject line) في البريد الإلكتروني الرسمي؟',
				options: [
					'كتابة العنوان البريدي للمرسل',
					'تلخيص هدف الرسالة في بضع كلمات واضحة قبل قراءتها',
					'وضع التوقيع والاسم الكامل فقط',
					'كتابة تحية طويلة للمرسل إليه'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'العنوان لا يكتب في سطر الموضوع.',
					'صحيح! سطر الموضوع يخبر القارئ فورا بمضمون البريد مثل: Application for Science Camp.',
					'التوقيع يكون في نهاية البريد.',
					'التحية تكون في بداية نص الرسالة.'
				],
				explanationAr: 'سطر الموضوع يعرض موضوع الرسالة بإيجاز ووضوح.'
			},
			{
				questionAr: 'إذا عرفت اسم مديرة المعهد وكتبت "Dear Mrs. Boudiaf," فما الخاتمة الأنسب؟',
				options: ['Yours faithfully,', 'Yours sincerely,', 'Bye for now,', 'Cheers,'],
				correctIndex: 1,
				diagnosticFeedback: [
					'faithfully تستعمل عندما يكون الاسم غير معروف (Sir or Madam).',
					'إجابة دقيقة! عند ذكر لقب المرسل إليه نختم بـ Yours sincerely.',
					'غير رسمية.',
					'غير رسمية.'
				],
				explanationAr: 'مع ذكر اللقب (Dear Mr./Mrs. Name) نستعمل دائما Yours sincerely.'
			}
		]
	}
];
