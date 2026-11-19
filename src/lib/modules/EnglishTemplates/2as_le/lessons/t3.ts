import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_LE_T3: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_le_t3_reported_verbs',
		slug: 'eng-2as-le-t3-reported-verbs',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: News, Media & Solidarity — No Man is an Island',
		order: 1,
		titleAr: 'الكلام المنقول بأفعال النقل المتقدمة (Claimed, Warned, Urged, Explained)',
		objectives: [
			'توظيف أفعال النقل الدلالية الدقيقة (claimed, explained, announced, warned, urged, promised, denied) بدلا من تكرار said',
			'ضبط الأنماط النحوية الخاصة بكل فعل نقل (+ that clause، + Object + to-infinitive، + V-ing)',
			'صياغة تقارير صحفية موضوعية ودقيقة تنقل تصريحات المسؤولين وفرق الإغاثة'
		],
		keywordsAr: ['Reporting Verbs', 'claimed', 'warned', 'urged', 'explained', 'Reported Speech', '2AS LE'],
		discover: {
			scenarioAr:
				'في تقارير الصحافة الجادة عن حملات الإغاثة لا يكرر الصحفي كلمة said في كل سطر، بل يختار فعل النقل الذي يعكس نية المتحدث: "The meteorologist warned residents not to cross flooded valleys, and the mayor urged volunteers to gather at the relief centre."',
			svg: svgEnglishGrammarMap({
				title: 'Complex Reporting Verb Patterns (2AS LE)',
				rootLabel: 'Reporting Verbs by Pattern',
				rootSub: 'Choose the exact structure for each verb',
				branches: [
					{
						label: 'Verb + that-clause',
						rule: 'claimed, explained, declared',
						example: 'He explained that roads were safe.'
					},
					{
						label: 'Verb + Obj + (not) to',
						rule: 'warned, urged, advised, reminded',
						example: 'She urged youth to donate blood.'
					},
					{
						label: 'Verb + to-infinitive',
						rule: 'promised, offered, agreed',
						example: 'They promised to rebuild the clinic.'
					},
					{
						label: 'Verb + V-ing',
						rule: 'denied, admitted, suggested',
						example: 'He suggested organizing a convoy.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين الجملتين: "The doctor explained that clean water prevents disease" و "The doctor urged citizens to boil drinking water". لماذا استعملنا that-clause مع explained واستعملنا Object + to-infinitive مع urged؟',
					hintAr: 'فعل explained ينقل تفسيرا أو حقيقة، أما urged فينقل حثا موجها لشخص للقيام بفعل.',
					expectedInput: 'لأن explained يتبعه that-clause و urged يتبعه Object + to + Stem',
					revealAr:
						'كل مجموعة من أفعال النقل لها بنية نحوية ثابتة: أفعال التصريح والشرح (explained, claimed, stated) تأخذ that-clause، وأفعال الحث والتحذير (urged, warned, advised) تأخذ Object + (not) to + Stem.'
				},
				{
					promptAr:
						'كيف تنقل التصريح التالي باستعمال warned: The Civil Protection officer said to motorists, "Do not drive through rising floodwater."',
					hintAr: 'تذكر بنية التحذير المنفي: warned + Object + not to + Stem.',
					expectedInput: 'The Civil Protection officer warned motorists not to drive through rising floodwater.',
					revealAr:
						'نستعمل warned + motorists + not to drive (كما يمكن قول warned motorists against driving).'
				},
				{
					promptAr:
						'انقل الجملة التالية باستعمال suggested: Amina said, "Let us collect winter coats for mountain villages."',
					hintAr: 'تذكر أن suggested يتبعها V-ing (أو that + Subject + should + Stem) ولا يتبعها to + Stem.',
					expectedInput: 'Amina suggested collecting winter coats for mountain villages.',
					revealAr:
						'الفعل suggested لا يأخذ أبدا to-infinitive! نكتب: suggested collecting... أو suggested that they (should) collect...'
				}
			]
		},
		summary: {
			rulesAr: [
				'النمط 1 (Verb + that + Clause مع تراجع الزمن): claimed, explained, declared, announced, confirmed, pointed out. مثال: The spokesperson confirmed that all shelters had opened.',
				'النمط 2 (Verb + Object + to / not to + Stem): urged, warned, reminded, encouraged, advised, begged. مثال: The director urged students to verify news sources.',
				'النمط 3 (Verb + to + Stem بدون مفعول): promised, offered, agreed, refused, threatened. مثال: Local bakers offered to provide bread daily.',
				'النمط 4 (Verb + V-ing): suggested, recommended, admitted, denied, apologized for. مثال: The editor denied publishing unverified rumours.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Matching Direct Utterance to Reporting Verb',
				steps: [
					{ stage: 'Warning', detail: '"Be careful! Do not..." = warned + Obj + not to + Stem' },
					{ stage: 'Urgent Appeal', detail: '"Please act now..." = urged + Obj + to + Stem' },
					{ stage: 'Clarification', detail: '"This happened because..." = explained that + Clause' },
					{ stage: 'Unproven Claim', detail: '"I saw something strange..." = claimed that + Clause' }
				]
			}),
			visualCaptionAr: 'دليل اختيار فعل النقل الأنسب دلاليا في التقارير الصحفية وتمارين التحويل',
			examples: [
				{
					problemAr: 'Report using "urged": The charity leader said to citizens, "Support the blood donation campaign this Friday."',
					solutionAr: 'The charity leader urged citizens to support the blood donation campaign that Friday.'
				},
				{
					problemAr: 'Report using "denied": The blogger said, "I did not spread false earthquake alerts."',
					solutionAr: 'The blogger denied spreading false earthquake alerts.'
				}
			],
			watchOutAr:
				'احذر ثلاثة أخطاء شائعة في شعبة اللغات: (1) لا تقل explained me بل explained to me that... (2) لا تقل suggested to go بل suggested going... (3) الفعل claimed يدل على ادعاء لم يثبت بعد، بخلاف confirmed الذي يدل على تأكيد موثق.'
		},
		practice: [
			{
				questionAr: 'Report accurately using "urged": The teacher said to us, "Check official sources before sharing disaster news."',
				options: [
					'The teacher urged us checking official sources before sharing disaster news.',
					'The teacher urged us to check official sources before sharing disaster news.',
					'The teacher urged that to check official sources before sharing disaster news.',
					'The teacher urged to us check official sources before sharing disaster news.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل urged يتبعه Object + to + Stem لا V-ing.',
					'صحيح! urged + Object (us) + to + Stem (to check).',
					'خطأ: لا يجتمع that مع to check.',
					'خطأ: لا نضع to قبل المفعول به مع urged.'
				],
				explanationAr: 'بنية الفعل urge في الكلام المنقول هي: urged + Object + to + Stem.'
			},
			{
				questionAr: 'Choose the grammatically correct sentence with "explained":',
				options: [
					'The engineer explained us that the bridge was safe.',
					'The engineer explained that the bridge was safe.',
					'The engineer explained to safe the bridge.',
					'The engineer explained us the bridge safe.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضع مفعولا به عاقلا مباشرة بعد explained دون حرف الجر to.',
					'أحسنت! explained + that-clause (أو explained to us that...) هي الصيغة السليمة.',
					'خطأ: تركيب غير سليم نحويا.',
					'خطأ: صيغة ناقصة وغير صحيحة.'
				],
				explanationAr: 'الفعل explained يتبعه that-clause مباشرة، أو to + Object + that-clause.'
			},
			{
				questionAr: 'Report accurately using "warned": The rescue chief said, "Do not enter the cracked building."',
				options: [
					'The rescue chief warned residents to not enter the cracked building.',
					'The rescue chief warned residents not to enter the cracked building.',
					'The rescue chief warned that not enter the cracked building.',
					'The rescue chief warned residents did not enter the cracked building.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الترتيب السليم هو not to وليس to not.',
					'ممتاز! warned + Object + not to + Stem.',
					'خطأ: that تحتاج فاعلا وفعلا مصرفا.',
					'خطأ: صيغة غير صحيحة بعد warned.'
				],
				explanationAr: 'ننقل التحذير المنفي ببنية: warned + Object + not to + Stem.'
			},
			{
				questionAr: 'Select the right verb form after "suggested": "Nadia suggested ...... a student first-aid workshop."',
				options: ['to hold', 'holding', 'held', 'hold to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: suggested لا يأخذ to-infinitive.',
					'صحيح! suggested + V-ing (holding) هي الصيغة القياسية.',
					'خطأ: لا نضع التصريف الماضي مباشرة بعد suggested.',
					'خطأ: تركيب غير موجود في الإنجليزية.'
				],
				explanationAr: 'يتبع الفعل suggested صيغة V-ing مباشرة (أو that + Subject + should + Stem).'
			},
			{
				questionAr: 'Which reporting verb best shows that a statement has NOT yet been proven true?',
				options: ['confirmed', 'proved', 'claimed', 'verified'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: confirmed تعني أكد بدليل موثق.',
					'خطأ: proved تعني أثبت بالبرهان.',
					'صحيح! claimed تعني ادعى أو زعم دون تأكيد قاطع بعد.',
					'خطأ: verified تعني تحقق وتثبت.'
				],
				explanationAr: 'يستخدم الصحفيون الفعل claimed للإشارة بحياد إلى أن المعلومة مجرد ادعاء لم يثبت رسميا.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t3_discourse_cohesion',
		slug: 'eng-2as-le-t3-discourse-cohesion',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: News, Media & Solidarity — No Man is an Island',
		order: 2,
		titleAr: 'تماسك الخطاب: الإحالة النصية وترتيب الجمل (Reference Words & Reordering)',
		objectives: [
			'تحديد العائد الدقيق لكلمات الإحالة (it, they, their, which, this, these, there, the former, the latter) داخل النص',
			'ترتيب جمل فقرة مبعثرة (Sentence Reordering) بالاعتماد على القرائن اللغوية والزمنية والمنطقية',
			'استثمار الإحالة والروابط لبناء فقرات خالية من التكرار الممل في التعبير الكتابي'
		],
		keywordsAr: ['Discourse Cohesion', 'Reference Words', 'Sentence Reordering', 'anaphoric reference', 'تماسك الخطاب'],
		discover: {
			scenarioAr:
				'في كل امتحان لشعبة اللغات الأجنبية يرد سؤالان حاسمان على تماسك النص: (1) What or who do the underlined words refer to in the text؟ و (2) Reorder the following sentences to make a coherent passage. المفتاح هو تتبع خيوط الإحالة!',
			svg: svgEnglishWritingStructure({
				title: '4-Step Method for Sentence Reordering (2AS LE)',
				steps: [
					{ stage: 'Find Opener', detail: 'Spot the general Topic Sentence (NO "this/they/however").' },
					{ stage: 'Track Pronouns', detail: 'Match he/they/it/these/such back to their noun.' },
					{ stage: 'Follow Linkers', detail: 'Order: First, Then, Moreover, As a result.' },
					{ stage: 'Verify Flow', detail: 'Re-read the whole paragraph to confirm smooth logic.' }
				]
			}),
			steps: [
				{
					promptAr:
						'اقرأ الجملة: "Responsible journalists verify news before publishing it, because false rumours harm citizens who trust them." إلى ماذا يعود الضميران it و them؟',
					hintAr: 'لاحظ أن news تعامل كمفرد غير معدود (it)، و journalists جمع عاقل (them).',
					expectedInput: 'it تعود على news و them تعود على responsible journalists',
					revealAr:
						'قاعدة مهمة: كلمة news في الإنجليزية اسم غير معدود يعامل كمفرد فيعود عليه الضمير it، أما them فتعود على responsible journalists.'
				},
				{
					promptAr:
						'لديك أربع جمل مبعثرة تبدأ بـ: (a) Consequently, victims received aid within hours. (b) Last winter, heavy snow isolated several mountain villages. (c) First, local youth cleared the main road. (d) Then, charity trucks delivered food and blankets. أي جملة تبدأ الفقرة ولماذا؟',
					hintAr: 'ابحث عن الجملة التي تقدم الحدث العام بلا ضمائر إحالة ولا روابط لاحقة.',
					expectedInput: 'الجملة (b) لأنها تقدم الإطار الزمني والحدث العام',
					revealAr:
						'الترتيب المنطقي الصحيح هو: b ثم c ثم d ثم a. الجملة المفتاحية (b) خالية من أدوات الاستئناف وتقدم الحدث الأساسي.'
				},
				{
					promptAr:
						'ما الفرق بين "the former" و "the latter" عند الإشارة إلى اسمين مذكورين سابقا؟',
					hintAr: 'former من first (الأول) و latter من late (الأخير/الثاني).',
					expectedInput: 'the former تعود على الأول و the latter تعود على الثاني',
					revealAr:
						'في النصوص الأدبية والصحفية المتقدمة: the former تشير إلى العنصر الأول المذكور، و the latter تشير إلى العنصر الثاني.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإحالة القبلية (Anaphoric Reference): الضمائر (he, she, it, they, him, them, its, their) وأسماء الإشارة (this, that, these, those) وضمائر الوصل (who, which, where) تحيل إلى كلمة أو فكرة وردت قبلها مباشرة في الغالب.',
				'انتبه لنوع العائد: this / which قد تعود على اسم واحد أو على فكرة الجملة السابقة بأكملها، بينما there تعود على مكان، و news / information / equipment تعامل كمفرد (it).',
				'قواعد ترتيب الجمل (Sentence Reordering): (1) الجملة الأولى عامة لا تبدأ بـ However أو Therefore أو They. (2) تتابع الأسماء النكرة ثم المعرفة (a convoy ثم the convoy). (3) تتابع الروابط الزمنية والمنطقية (First, Next, Moreover, Finally, Consequently).',
				'اختبار التحقق الأخير: بعد الترتيب، اقرأ الفقرة كاملة بصمت للتأكد أن كل ضمير له عائد واضح قبله.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Cohesion Clues Cheat Sheet',
				rootLabel: 'Text Cohesion Signals',
				rootSub: 'Use these to solve Reference & Reordering',
				branches: [
					{
						label: 'Pronouns',
						rule: 'Number & person match',
						example: 'volunteers = they / them'
					},
					{
						label: 'Articles',
						rule: 'a/an (1st) to the (2nd)',
						example: 'a storm to the storm'
					},
					{
						label: 'Demonstratives',
						rule: 'this/these + summary noun',
						example: 'This solidarity inspired all.'
					},
					{
						label: 'Sequencers',
						rule: 'Logical & time flow',
						example: 'First, Moreover, Thus'
					}
				]
			}),
			visualCaptionAr: 'مفاتيح الكشف السريع في أسئلة الإحالة وترتيب الفقرة لشعبة اللغات',
			examples: [
				{
					problemAr: 'Find the referent of each quoted word: "When floods struck the valley, volunteers rushed "there". "Their" quick action saved dozens of families."',
					solutionAr: 'there = the valley | Their = the volunteers.'
				},
				{
					problemAr: 'Reorder: (a) As a result, readers can distinguish truth from rumour. (b) Ethical media always checks facts before publication. (c) It also quotes reliable eyewitnesses.',
					solutionAr: 'Correct order: b - c - a. (b introduces Ethical media; c uses It + also; a gives the result).'
				}
			],
			watchOutAr:
				'في سؤال الإحالة (What do the underlined words refer to?) اكتب العبارة الاسمية الكاملة الواضحة لا كلمة ناقصة؛ مثلا اكتب "the affected families" لا مجرد "families" إذا كان النص يحددها، وانتبه إلى أن who تعود على العاقل قبلها مباشرة.'
		},
		practice: [
			{
				questionAr: 'In the sentence "Reliable news helps citizens stay safe, so journalists must verify it carefully", what does "it" refer to?',
				options: ['citizens', 'journalists', 'reliable news', 'stay safe'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: citizens جمع عاقل يأخذ them لا it.',
					'خطأ: journalists جمع عاقل.',
					'صحيح! كلمة news غير معدودة وتعامل كمفرد فتأخذ الضمير it.',
					'خطأ: الضمير يعود على الشيء الذي يتحقق منه الصحفيون وهو reliable news.'
				],
				explanationAr: 'الاسم news يعامل كمفرد في الإنجليزية ويعود عليه الضمير it.'
			},
			{
				questionAr: 'Which sentence MUST come FIRST in a reordered paragraph?',
				options: [
					'However, they still needed warm blankets.',
					'Therefore, the mayor thanked every volunteer.',
					'Community solidarity plays a vital role during natural disasters.',
					'These efforts also included medical check-ups.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: تبدأ بـ However و الضمير they فتحتاج جملة قبلها.',
					'خطأ: تبدأ بـ Therefore فهي جملة نتيجة لا افتتاح.',
					'ممتاز! جملة موضوعية عامة خالية من ضمائر الإحالة والروابط الاستئنافية.',
					'خطأ: تبدأ بـ These efforts و also فتفترض ذكرا سابقا.'
				],
				explanationAr: 'الجملة الافتتاحية تقدم الموضوع العام دون الاعتماد على ضمائر إحالة أو روابط استئناف.'
			},
			{
				questionAr: 'In "Both printed newspapers and online portals inform the public, yet the latter updates reports instantly", what does "the latter" refer to?',
				options: ['printed newspapers', 'online portals', 'the public', 'reports'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: printed newspapers هي العنصر الأول (the former).',
					'صحيح! the latter تشير إلى العنصر الثاني المذكور وهو online portals.',
					'خطأ: المقارنة بين الوسيلتين الإعلاميتين.',
					'خطأ: reports جاءت بعد the latter.'
				],
				explanationAr: 'تعود العبارة the latter على العنصر الثاني المذكور في الثنائية السابقة.'
			},
			{
				questionAr: 'Choose the right coherent order: (1) Finally, they distributed food boxes to every home. (2) A local charity launched a winter relief campaign. (3) First, its members collected donations from neighbours.',
				options: ['1 - 2 - 3', '2 - 3 - 1', '3 - 2 - 1', '2 - 1 - 3'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نبدأ الفقرة بكلمة Finally.',
					'صحيح! (2) تقدم الحملة، ثم (3) تعود بـ its members وتبدأ بـ First، ثم (1) تختم بـ Finally.',
					'خطأ: الضمير its في (3) يحتاج عائده (a local charity) قبله.',
					'خطأ: First يجب أن تسبق Finally.'
				],
				explanationAr: 'تترابط الجمل بترتيب 2 ثم 3 ثم 1 عبر الإحالة (a local charity ثم its members) والترتيب الزمني (First ثم Finally).'
			},
			{
				questionAr: 'In "Rescuers reached the remote village where several roofs had collapsed", what does "where" refer to?',
				options: ['rescuers', 'the remote village', 'several roofs', 'had collapsed'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: rescuers أشخاص لا مكان.',
					'أحسنت! where ضمير وصل للمكان يعود على the remote village.',
					'خطأ: roofs جاءت بعد where.',
					'خطأ: had collapsed فعل لا اسم مكان.'
				],
				explanationAr: 'ضمير الوصل المكاني where يحيل إلى الاسم المكاني السابق له مباشرة (the remote village).'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t3_silent_syllables',
		slug: 'eng-2as-le-t3-silent-syllables',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: News, Media & Solidarity — No Man is an Island',
		order: 3,
		titleAr: 'الحروف الصامتة وعدّ المقاطع الصوتية (Silent Letters & Syllable Counting)',
		objectives: [
			'تحديد الحروف الصامتة الشائعة بدقة (k, w, b, h, l, t, g, n) في مفردات الصحافة والتضامن',
			'عد المقاطع الصوتية (Syllables) بناء على أصوات العلة المنطوقة لا عدد حروف العلة المكتوبة',
			'التمييز بين النهاية الصامتة -e وبين الحالات التي تزيد مقطعا صوتيا (مثل -ed /id/ و -es /iz/)'
		],
		keywordsAr: ['Silent Letters', 'Syllable Counting', 'Phonology', 'vowel sounds', 'الحروف الصامتة والمقاطع'],
		discover: {
			scenarioAr:
				'انظر إلى كلمات شائعة في نصوص التضامن والأخبار: "island, honest, knowledge, rescue, solidarity". في كلمة island حرف s صامت تماما، وفي كلمة knowledge حرفا k و d صامتان، وعدد المقاطع يعتمد على الأصوات المنطوقة لا الحروف!',
			svg: svgEnglishPhoneticsChart({
				title: 'Most Common Silent Letters in 2AS LE Exams',
				subtitle: 'Written in spelling, NOT pronounced in speech',
				columns: [
					{
						sound: 'Silent k / w / g',
						rule: 'kn-, wr-, -gn',
						examples: 'know, write, campaign'
					},
					{
						sound: 'Silent h / b / l',
						rule: 'hon-, -mb, -lk/-lm',
						examples: 'honest, climb, calm'
					},
					{
						sound: 'Silent t / s / p',
						rule: '-stle, isl-, psy-',
						examples: 'listen, island, psychology'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حدد الحرف الصامت في كل كلمة مما يلي: "campaign, honest, listen, doubt".',
					hintAr: 'انطق كل كلمة بوضوح ولاحظ الحرف الذي لا يسمع له صوت.',
					expectedInput: 'g في campaign، h في honest، t في listen، b في doubt',
					revealAr:
						'حرف g صامت قبل n في النهاية (campaign, sign)، و h صامت في honest و hour، و t صامت في listen و often، و b صامت في doubt و debt.'
				},
				{
					promptAr:
						'كم مقطعا صوتيا في كلمة "bridge" وفي كلمة "bridges"؟ ولماذا زادت الثانية مقطعا؟',
					hintAr: 'حرف e الأخير في bridge صامت، ولكن في bridges تنطق النهاية /iz/.',
					expectedInput: 'bridge مقطع واحد و bridges مقطعان',
					revealAr:
						'كلمة bridge فيها صوت علة واحد منطوق (مقطع واحد)، أما bridges فتضاف لها النهاية /iz/ فتصبح مقطعين: brid-ges.'
				},
				{
					promptAr:
						'قارن عدد المقاطع في: "helped" مقابل "donated". لماذا helped مقطع واحد بينما donated ثلاثة مقاطع؟',
					hintAr: 'تذكر قاعدة Final -ed: فقط الصوت /id/ يضيف مقطعا جديدا!',
					expectedInput: 'helped (/t/) لا تزيد مقطعا (1)، أما donated (/id/) فتزيد مقطعا (3)',
					revealAr:
						'النهاية -ed لا تضيف مقطعا صوتيا إلا إذا نطقت /id/ (بعد /t/ و /d/)! لذلك helped = مقطع واحد، saved = مقطع واحد، أما do-na-ted = ثلاثة مقاطع.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قاعدة عد المقاطع (Syllable Rule): عدد المقاطع يساوي عدد أصوات العلة المنطوقة (Spoken Vowel Sounds) وليس عدد حروف العلة المكتوبة. الثنائيات الصوتية (ea, oo, ai, ou) تحسب صوتا واحدا (team = 1، food = 1).',
				'الحرف -e في نهاية الكلمة صامت عادة ولا يحسب مقطعا (safe = 1، hope = 1)، إلا في نهاية -le بعد ساكن (peo-ple = 2، no-ble = 2).',
				'النهاية -ed تزيد مقطعا فقط إذا نطقت /id/ (need-ed = 2، أما helped = 1)؛ والنهاية -es تزيد مقطعا فقط إذا نطقت /iz/ (box-es = 2، أما teams = 1).',
				'أشهر الحروف الصامتة في الامتحانات: k (know, knight)، w (write, answer)، h (honest, hour)، b (doubt, climb, thumb)، l (calm, half, would)، t (listen, castle)، g (sign, campaign)، s (island).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Syllable Counting Golden Checks',
				rootLabel: 'Count Spoken Vowel Sounds',
				rootSub: 'Never count silent letters or vowel pairs twice',
				branches: [
					{
						label: '1 Syllable',
						rule: 'One spoken vowel sound',
						example: 'aid, food, calm, helped'
					},
					{
						label: '2 Syllables',
						rule: 'Two spoken vowel sounds',
						example: 'is-land, res-cue, need-ed'
					},
					{
						label: '3 Syllables',
						rule: 'Three spoken vowel sounds',
						example: 'vo-lun-teer, jour-na-list'
					},
					{
						label: '4+ Syllables',
						rule: 'Four or more vowel sounds',
						example: 'so-li-da-ri-ty (5)'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الكلمات حسب عدد المقاطع الصوتية مع مراعاة الحروف الصامتة',
			examples: [
				{
					problemAr: 'Underline the silent letter in each word: island, knowledge, autumn, answer.',
					solutionAr: 'island (silent s), knowledge (silent k), autumn (silent n), answer (silent w).'
				},
				{
					problemAr: 'Classify according to the number of syllables (1, 2, 3): helped, shelter, donation, drought.',
					solutionAr: '1 syllable: helped, drought | 2 syllables: shel-ter | 3 syllables: do-na-tion.'
				}
			],
			watchOutAr:
				'فخ امتحاني شهير: كلمة "drought" تحتوي 7 حروف لكنها مقطع صوتي واحد فقط! وكلمة "helped" تبدو ذات مقطعين كتابة لكنها مقطع واحد صوتا، وكلمة "honest" مكونة من مقطعين (ho-nest) وحرف h فيها صامت.'
		},
		practice: [
			{
				questionAr: 'Which letter is SILENT in the word "island"?',
				options: ['i', 's', 'l', 'd'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حرف i ينطق في بداية الكلمة.',
					'صحيح! حرف s صامت تماما في island.',
					'خطأ: حرف l ينطق بوضوح.',
					'خطأ: حرف d ينطق في آخر الكلمة.'
				],
				explanationAr: 'في كلمة island (كما في عنوان الوحدة No Man is an Island) حرف s صامت لا ينطق.'
			},
			{
				questionAr: 'How many syllables are there in the verb "helped"?',
				options: ['1 syllable', '2 syllables', '3 syllables', '4 syllables'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! النهاية -ed تنطق /t/ فلا تضيف مقطعا صوتيا.',
					'خطأ: لا ننطق حرف e في helped.',
					'خطأ: عدد المقاطع واحد فقط.',
					'خطأ: عدد المقاطع واحد فقط.'
				],
				explanationAr: 'النهاية -ed في helped تنطق /t/ دون صوت علة إضافي فتبقى الكلمة مقطعا واحدا.'
			},
			{
				questionAr: 'Identify the word that has a SILENT "g":',
				options: ['global', 'campaign', 'grateful', 'gather'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حرف g منطوق في global.',
					'أحسنت! حرف g صامت قبل n في campaign (مثل sign و foreign).',
					'خطأ: حرف g منطوق في grateful.',
					'خطأ: حرف g منطوق في gather.'
				],
				explanationAr: 'يكون حرف g صامتا عادة قبل حرف n في التركيب -gn مثل campaign و sign.'
			},
			{
				questionAr: 'How many syllables does the word "volunteer" have?',
				options: ['1 syllable', '2 syllables', '3 syllables', '4 syllables'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: فيها أكثر من صوت علة منطوق.',
					'خطأ: قسمها صوتيا: vo - lun - teer.',
					'صحيح! ثلاثة مقاطع: vo-lun-teer (والثنائي ee يحسب صوتا واحدا).',
					'خطأ: الحرفان ee ينطقان صوتا طويلا واحدا لا مقطعين.'
				],
				explanationAr: 'تتكون كلمة volunteer من ثلاثة مقاطع صوتية: vo-lun-teer.'
			},
			{
				questionAr: 'Which pair of words BOTH have TWO syllables?',
				options: [
					'res-cue and need-ed',
					'drought and cam-paign',
					'team and bridges',
					'so-li-da-ri-ty and hon-est'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! res-cue (مقطعان) و need-ed (مقطعان لأن -ed تنطق /id/).',
					'خطأ: drought مقطع واحد فقط.',
					'خطأ: team مقطع واحد فقط.',
					'خطأ: solidarity خمسة مقاطع.'
				],
				explanationAr: 'كل من res-cue و need-ed تتكون من مقطعين صوتيين بالضبط.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t3_news_persuasive',
		slug: 'eng-2as-le-t3-news-persuasive',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: News, Media & Solidarity — No Man is an Island',
		order: 4,
		titleAr: 'كتابة تقرير صحفي أو مقال إقناعي (Newspaper Report / Persuasive Essay — 6 pts)',
		objectives: [
			'بناء تقرير صحفي احترافي وفق الهرم المقلوب (Headline + Lead 5Ws + Body Quotes + Closing) بالزمن الماضي والمبني للمجهول',
			'بناء مقال إقناعي رصين (Persuasive Essay) يجمع بين الحجج المنطقية ودحض الاعتراض والنداء الأخلاقي',
			'استيفاء معايير العلامة الكاملة (6 نقاط) في شعبة اللغات الأجنبية'
		],
		keywordsAr: ['Newspaper Report', 'Persuasive Essay', 'Inverted Pyramid', '5Ws', 'Written Expression', '6 pts'],
		discover: {
			scenarioAr:
				'في ختام الفصل الثالث لشعبة اللغات الأجنبية، يتكرر خياران في الوضعية الإدماجية (6 نقاط): إما كتابة تقرير صحفي (Newspaper Report) عن حملة إغاثة وتضامن، وإما كتابة مقال إقناعي (Persuasive Essay) حول أخلاقيات الإعلام وواجب التكافل.',
			svg: svgEnglishWritingStructure({
				title: 'Newspaper Report — Inverted Pyramid (6 pts)',
				steps: [
					{ stage: 'Headline', detail: 'Short, punchy title in Present Simple (no articles).' },
					{ stage: 'Lead (5Ws)', detail: 'Who, What, When, Where, Why in 2 crisp sentences.' },
					{ stage: 'Details & Quotes', detail: 'Chronological facts + reported eyewitness quotes.' },
					{ stage: 'Closing', detail: 'Current status, lessons learned, or upcoming action.' }
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين عنوانين لتقرير صحفي: (A) "Yesterday there were many volunteers who helped a village." و (B) "Youth Volunteers Deliver Winter Relief to Mountain Villages". لماذا العنوان (B) صحفي واحترافي؟',
					hintAr: 'لاحظ الإيجاز واستعمال المضارع البسيط وحذف الحشو.',
					expectedInput: 'لأنه موجز ومباشر ويستعمل المضارع البسيط الصحفي دون حشو',
					revealAr:
						'العنوان الصحفي (Headline) يكون موجزا ولافتا ويستعمل غالبا المضارع البسيط أو التصريف الثالث للمبني للمجهول (مثلا: Flooded Road Reopened by Volunteers).'
				},
				{
					promptAr:
						'ما العناصر الخمسة (5Ws) التي يجب أن تجيب عنها الفقرة الافتتاحية (Lead Paragraph) في التقرير الصحفي؟',
					hintAr: 'من، ماذا، متى، أين، ولماذا/كيف.',
					expectedInput: 'Who, What, When, Where, Why (and How)',
					revealAr:
						'تجيب الفقرة الأولى من التقرير الصحفي مباشرة عن: من شارك (Who)، وماذا حدث (What)، ومتى (When)، وأين (Where)، ولماذا/كيف (Why/How).'
				},
				{
					promptAr:
						'إذا اخترت كتابة مقال إقناعي (Persuasive Essay) حول أهمية تثبت الإعلام من الأخبار وقت الأزمات، ما الأسلوب الذي يرفع قوة الإقناع؟',
					hintAr: 'تقديم حجتين قويتين + الإشارة المختصرة للرأي المخالف والرد عليه بـ Although/However.',
					expectedInput: 'تقديم حجج موثقة مع استباق الاعتراض والرد عليه بأسلوب هادئ متماسك',
					revealAr:
						'المقال الإقناعي المتقدم في 2AS LE يجمع بين: أطروحة واضحة، حجج منطقية مدعومة بمثال، استدراك ورد على الرأي المقابل (Although some argue..., in fact...)، ودعوة واضحة في الخاتمة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التقرير الصحفي (Newspaper Report): عنوان موجز (Headline) + فقرة افتتاحية شاملة (Lead: 5Ws) + تفاصيل بالماضي البسيط والمبني للمجهول + تصريحات منقولة بأفعال نقل دقيقة (confirmed, urged, explained) + خاتمة بالوضع الراهن.',
				'المقال الإقناعي (Persuasive Essay): مقدمة بأطروحة جازمة + فقرة عرض أولى (الحجة الأقوى + مثال) + فقرة عرض ثانية (حجة ثانية + استدراك ورد على الاعتراض) + خاتمة بدعوة واضحة للعمل.',
				'خصائص الأسلوب في التقرير الصحفي: الموضوعية والحياد (لا تستعمل I think في التقرير الإخباري)، توظيف المبني للمجهول، وذكر الزمان والمكان بدقة.',
				'خصائص الأسلوب في المقال الإقناعي: نبرة مقنعة ومحترمة، روابط الحجاج (First and foremost, Furthermore, Admittedly ... however, Ultimately), وتجنب الأخطاء النحوية والتكرار.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Newspaper Report vs Persuasive Essay (2AS LE)',
				rootLabel: 'Choose Register & Structure',
				rootSub: 'Both carry 6 pts in 2AS LE exams',
				branches: [
					{
						label: 'News Tone',
						rule: 'Objective & factual (3rd person)',
						example: 'Authorities confirmed that aid arrived.'
					},
					{
						label: 'News Grammar',
						rule: 'Past Simple, Passive, Reported Speech',
						example: 'Blankets were distributed early.'
					},
					{
						label: 'Persuasive Tone',
						rule: 'Convincing & ethical stance',
						example: 'It is imperative that media verify facts.'
					},
					{
						label: 'Persuasive Grammar',
						rule: 'Modals, Concession, Rhetorical flow',
						example: 'Although speed matters, truth comes first.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة سريعة بين أسلوب التقرير الصحفي وأسلوب المقال الإقناعي في شعبة اللغات',
			examples: [
				{
					problemAr: 'Write a 2-sentence Lead Paragraph for a newspaper report about a youth clean-up and relief convoy in Jijel after heavy rain.',
					solutionAr: 'Over one hundred Algerian youth volunteers delivered food parcels and medical supplies to remote mountain villages in Jijel early Saturday morning after heavy rains blocked local roads. The humanitarian convoy was organized jointly by local charities and secondary school clubs to assist affected families.'
				},
				{
					problemAr: 'Write a persuasive counter-argument sentence about verifying social media news during disasters.',
					solutionAr: 'Although sharing breaking posts quickly may seem helpful, spreading unverified alerts often causes unnecessary panic and slows down genuine rescue teams.'
				}
			],
			watchOutAr:
				'لا تخلط بين الجنسين الأدبيين: إذا طلب منك Newspaper Report فلا تكتب "In my opinion, I love volunteers" بل التزم بضمير الغائب والموضوعية وتصريحات الشهود؛ وإذا طلب Persuasive Essay فوضح موقفك وحججك واختم بنداء مقنع.'
		},
		practice: [
			{
				questionAr: 'Which headline best follows standard English newspaper style?',
				options: [
					'I think volunteers did a great job yesterday in Bouira.',
					'Local Volunteers Reopen Snow-Blocked Mountain Roads in Bouira',
					'In this report I will talk about snow and roads.',
					'Yesterday, the roads had been blocked by snow in the morning.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العنوان الصحفي لا يستخدم I think ولا الأسلوب الشخصي.',
					'صحيح! موجز وواضح ويستخدم المضارع البسيط الصحفي.',
					'خطأ: هذه جملة تمهيدية غير صحفية وليست عنوانا.',
					'خطأ: طويلة جدا وتستخدم الماضي التام بدل أسلوب العناوين.'
				],
				explanationAr: 'العناوين الصحفية تكون مختصرة ومباشرة وتستعمل غالبا المضارع البسيط.'
			},
			{
				questionAr: 'What is the primary purpose of the Lead Paragraph in a newspaper report?',
				options: [
					'To hide the main event until the very last line',
					'To summarize the essential 5Ws (Who, What, When, Where, Why) immediately',
					'To express the journalist\'s personal feelings',
					'To list vocabulary definitions'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا عكس مبدأ الهرم المقلوب في الصحافة.',
					'أحسنت! الفقرة الافتتاحية تلخص العناصر الخمسة الأساسية فورا.',
					'خطأ: التقرير الإخباري موضوعي ومحايد.',
					'خطأ: ليس هذا دور الفقرة الافتتاحية.'
				],
				explanationAr: 'يقوم التقرير الصحفي على الهرم المقلوب بحيث ترد أهم المعلومات (5Ws) في الفقرة الأولى.'
			},
			{
				questionAr: 'Which grammatical structures are MOST characteristic of an objective newspaper report?',
				options: [
					'Imperatives and slang expressions',
					'Past Simple, Passive Voice, and complex Reporting Verbs',
					'Only future predictions with might',
					'First-person diary reflections'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العامية والأوامر لا تناسب التقارير الإخبارية الرسمية.',
					'صحيح! الماضي البسيط والمبني للمجهول وأفعال النقل الدقيقة هي عمود التقرير الصحفي.',
					'خطأ: التقرير الإخباري يروي أحداثا وقعت بالفعل.',
					'خطأ: اليوميات الشخصية تختلف عن التقرير الإخباري الموضوعي.'
				],
				explanationAr: 'يعتمد التقرير الصحفي على الماضي البسيط والمبني للمجهول ونقل التصريحات بموضوعية.'
			},
			{
				questionAr: 'In a persuasive essay, why is it effective to include a brief concession (e.g., "Although speed is valued, accuracy must come first")?',
				options: [
					'It confuses the reader about your opinion',
					'It shows balanced critical thinking and strengthens your main argument',
					'It replaces the need for an introduction',
					'It proves you agree with the opposite view completely'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الاستدراك المنظم يوضح موقفك ولا يربكه.',
					'ممتاز! الاعتراف بجانب من الاعتراض ثم تفنيده يظهر نضجا فكريا وإقناعا أعلى.',
					'خطأ: المقدمة تظل ضرورية.',
					'خطأ: أنت ترد على الاعتراض لصالح أطروحتك لا تتبناه.'
				],
				explanationAr: 'استباق الاعتراض والرد عليه بأدب ومنطق من أقوى أدوات الإقناع في المقال الأكاديمي.'
			},
			{
				questionAr: 'Which sentence does NOT belong inside an objective newspaper report?',
				options: [
					'Emergency shelters were opened across three districts before noon.',
					'The coordinator explained that medical teams had reached every village.',
					'In my humble personal opinion, I really loved how kind everybody looked.',
					'Officials urged residents to follow safety bulletins issued on local radio.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: جملة خبرية موضوعية بالمبني للمجهول مناسبة جدا.',
					'خطأ: نقل موضوعي لتصريح مسؤول مناسب للتقرير.',
					'صحيح! هذه جملة ذاتية بضمير المتكلم تخل بموضوعية التقرير الصحفي.',
					'خطأ: جملة نقل رسمية سليمة تماما للتقرير.'
				],
				explanationAr: 'التقرير الإخباري يلتزم بالموضوعية ويتجنب العبارات الذاتية مثل In my personal opinion.'
			}
		]
	}
];
