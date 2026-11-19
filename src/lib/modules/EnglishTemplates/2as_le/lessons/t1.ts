import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_LE_T1: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_le_t1_used_to_would',
		slug: 'eng-2as-le-t1-used-to-would',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time & Make Peace (التحول الاجتماعي وثقافة السلم)',
		order: 1,
		titleAr: 'التعبير عن عادات وحالات الماضي بدقة (Used to vs Would)',
		objectives: [
			'التمييز الدقيق بين used to (للأفعال المتكررة والحالات الماضية) و would (للأفعال المتكررة فقط في سياق ماض محدد)',
			'تجنب استعمال would مع أفعال الحالة (Stative Verbs: be, live, have, know, own, believe)',
			'صياغة فقرات وصفية ثرية عن تغير أنماط الحياة والتواصل في المجتمع الجزائري'
		],
		keywordsAr: ['used to', 'would', 'stative verbs', 'action verbs', 'past habits', '2AS LE'],
		discover: {
			scenarioAr:
				'في مذكرات أدبية عن حي القصبة القديم، يكتب أستاذ متقاعد: "Our family used to live near a quiet courtyard. Every evening, elders would gather there and would share wise stories about patience and brotherhood." لماذا استعمل used to مع live واستعمل would مع gather و share؟',
			svg: svgEnglishTenseTimeline({
				title: 'Past Habits and States (2AS LE)',
				tenseName: 'used to vs would',
				formula: 'used to + Action/State | would + Repeated Action ONLY',
				activeZone: 'past',
				example: 'We used to live in Blida; every spring we would pick oranges.',
				markers: 'when I was young, every summer, in those days, decades ago'
			}),
			steps: [
				{
					promptAr:
						'قارن بين الفعلين live و gather في النص التمهيدي. أيهما يعبر عن حالة مستمرة (State) وأيهما يعبر عن فعل متكرر (Repeated Action)؟',
					hintAr: 'هل السكن في بيت فعل يتكرر كل مساء أم حالة دائمة؟',
					expectedInput: 'live فعل حالة (Stative) و gather فعل حركي متكرر (Action)',
					revealAr:
						'الفعل live يعبر عن حالة مستمرة في الماضي (Stative Verb)، بينما gather و share أفعال حركية متكررة (Dynamic/Action Verbs).'
				},
				{
					promptAr:
						'هل يجوز أن نقول "My grandfather would own a bookshop in Tlemcen"؟ ولماذا؟',
					hintAr: 'تحقق من نوع الفعل own (يمتلك).',
					expectedInput: 'لا يجوز لأن own فعل حالة فيستعمل معه used to فقط',
					revealAr:
						'لا تستعمل would مع أفعال الحالة مثل be, live, have, own, know, love؛ بل نكتب: "My grandfather used to own a bookshop."'
				},
				{
					promptAr:
						'لماذا نبدأ الفقرة عادة بـ used to أو بعبارة زمنية (Every winter / When we were children) قبل استعمال would؟',
					hintAr: 'تذكر أن would لها معان أخرى مثل الشرط والطلب المؤدب.',
					expectedInput: 'لتحديد السياق الزمني الماضي بوضوح قبل استعمال would',
					revealAr:
						'لأن would قد تعني الشرط أو التهذيب، فإنها تحتاج إطارا زمنيا ماضيا واضحا لتدل على عادة ماضية متكررة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'used to + Stem: تصلح للأفعال المتكررة في الماضي (used to read) وللحالات الماضية الدائمة (used to be, used to live, used to have).',
				'would + Stem: تصلح للأفعال الحركية المتكررة فقط في سياق ماض واضح (Every Friday, we would visit our grandparents)، ولا تستعمل مطلقا مع أفعال الحالة (Stative Verbs).',
				'أشهر أفعال الحالة الممنوعة مع would: be, have (possession), live, own, know, believe, belong, like, seem.',
				'للأحداث التي وقعت مرة واحدة في تاريخ محدد في الماضي، لا نستخدم لا used to ولا would، بل نستخدم Past Simple فقط.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Choosing Between Used to, Would, and Past Simple',
				rootLabel: 'Past Reference Choice',
				rootSub: 'Check verb type and frequency',
				branches: [
					{
						label: 'Past State',
						rule: 'used to ONLY (never would)',
						example: 'This valley used to be green.'
					},
					{
						label: 'Repeated Action',
						rule: 'used to OR would + Stem',
						example: 'They would meet after Maghrib.'
					},
					{
						label: 'Negative / Question',
						rule: 'did not use to / Did ... use to',
						example: 'Did you use to study by lamp?'
					},
					{
						label: 'Single Past Event',
						rule: 'Past Simple ONLY',
						example: 'The school opened in 1968.'
					}
				]
			}),
			visualCaptionAr: 'شجرة القرار السريع للتمييز بين used to و would و Past Simple في شعبة اللغات',
			examples: [
				{
					problemAr: 'Decide if "would" can replace "used to": (1) The old library used to have rare manuscripts. (2) Students used to copy notes by hand every afternoon.',
					solutionAr: '(1) Cannot use would (have = possession/state). (2) Can use would: Students would copy notes by hand every afternoon.'
				},
				{
					problemAr: 'Correct the error: "When I was a child, I would live near the Bridges of Constantine."',
					solutionAr: 'When I was a child, I used to live near the Bridges of Constantine.'
				}
			],
			watchOutAr:
				'في شعبة اللغات الأجنبية يختبر الفاحص بدقة الفرق بين أفعال الحالة وأفعال الحركة: تذكر دائما أن be و live و own و know تأخذ used to فقط ولا تقبل would أبدا!'
		},
		practice: [
			{
				questionAr: 'In which sentence is "would" grammatically INCORRECT for a past habit?',
				options: [
					'Every summer, cousins would gather under the fig tree.',
					'In those days, craftsmen would carve cedar wood for hours.',
					'Fifty years ago, our neighbourhood would be very quiet.',
					'On winter nights, our grandmother would tell educational tales.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: gather فعل حركي متكرر فيقبل would.',
					'خطأ: carve فعل حركي متكرر فيقبل would.',
					'صحيح! الفعل be فعل حالة (Stative) فيأخذ used to be ولا يقبل would be للعادة الماضية.',
					'خطأ: tell فعل حركي متكرر فيقبل would.'
				],
				explanationAr: 'الفعل be من أفعال الحالة ولا يستعمل مع would للتعبير عن حالة ماضية.'
			},
			{
				questionAr: 'Choose the best option: "Decades ago, the M-Zab oasis ...... rely on clever underground water channels."',
				options: ['used to', 'would to', 'did used to', 'is used to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! used to + Stem هي الصيغة الصحيحة.',
					'خطأ: لا نضع to بعد would.',
					'خطأ: الصيغة غير سليمة.',
					'خطأ: is used to تعني معتاد في الحاضر ويتبعها V-ing أو اسم.'
				],
				explanationAr: 'نستعمل used to + rely لوصف نظام سائد في الماضي.'
			},
			{
				questionAr: 'Which sentence allows BOTH "used to" and "would"?',
				options: [
					'Imam Ben Badis ...... know classical Arabic poetry deeply.',
					'Every morning, pupils ...... walk together to the free school.',
					'The family ...... own a stone house in Ghardaia.',
					'That old bridge ...... exist since the nineteenth century.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: know فعل حالة يأخذ used to فقط.',
					'صحيح! walk فعل حركي متكرر ومعه إطار زمني (Every morning) فيقبل used to و would.',
					'خطأ: own فعل حالة يأخذ used to فقط.',
					'خطأ: exist فعل حالة يأخذ used to فقط.'
				],
				explanationAr: 'يجتمع قبول used to و would مع الأفعال الحركية المتكررة داخل إطار زمني ماض.'
			},
			{
				questionAr: 'Select the accurate form for a single completed event: "In 1931, Algerian scholars ...... the Association of Muslim Scholars."',
				options: ['used to found', 'would found', 'founded', 'use to found'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: التأسيس حدث وقع مرة واحدة في سنة محددة.',
					'خطأ: would للعادة المتكررة لا لحدث تاريخي واحد.',
					'أحسنت! الحدث الفريد المحدد بتاريخ (In 1931) يأخذ Past Simple فقط.',
					'خطأ: صيغة غير صحيحة.'
				],
				explanationAr: 'الحدث الذي وقع مرة واحدة في تاريخ محدد يصرف في الماضي البسيط (founded).'
			},
			{
				questionAr: 'Identify the accurate negative past habit sentence:',
				options: [
					'Villagers did not used to buy bottled water.',
					'Villagers did not use to buy bottled water.',
					'Villagers would not own plastic bottles.',
					'Villagers not used to buy bottled water.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: احذف d بعد did not.',
					'صحيح! did not use to + Stem هي الصيغة القياسية.',
					'خطأ: own فعل حالة لا يصح مع would.',
					'خطأ: ينقص الفعل المساعد did.'
				],
				explanationAr: 'في النفي عن عادة ماضية نكتب did not use to + Stem.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t1_modals_past_present',
		slug: 'eng-2as-le-t1-modals-past-present',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time & Make Peace (التحول الاجتماعي وثقافة السلم)',
		order: 2,
		titleAr: 'الأفعال الناقصة في الحاضر والماضي (Could, Managed to, Was able to, Should have)',
		objectives: [
			'التفريق الدقيق بين القدرة العامة في الماضي (could) والإنجاز الفعلي في موقف صعب (managed to / was able to)',
			'توظيف should have / ought to have + V3 للتعبير عن النقد الأخلاقي أو الندم على قرار ماض',
			'استعمال must / have to / need not / had to في سياق المواثيق السلمية والواجبات المدنية'
		],
		keywordsAr: ['could', 'managed to', 'was able to', 'should have', 'modals', 'Make Peace'],
		discover: {
			scenarioAr:
				'في درس Make Peace نقرأ عن مبادرة صلح محلية: "The mediator could speak three languages fluently, and after intense talks he managed to reconcile the two families. Everyone agreed that they should have chosen dialogue from the very beginning."',
			svg: svgEnglishGrammarMap({
				title: 'Past Ability vs Past Criticism (2AS LE)',
				rootLabel: 'Advanced Modals',
				rootSub: 'Precision in meaning and register',
				branches: [
					{
						label: 'General Past Ability',
						rule: 'could + Stem',
						example: 'She could translate fast at 15.'
					},
					{
						label: 'Specific Past Success',
						rule: 'managed to / was able to',
						example: 'They managed to end the dispute.'
					},
					{
						label: 'Past Failure (Negative)',
						rule: 'could not / was not able to',
						example: 'He could not ignore the truce.'
					},
					{
						label: 'Regret / Criticism',
						rule: 'should (not) have + V3',
						example: 'They should have consulted elders.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين "He could speak three languages" و "He managed to reconcile the two families". لماذا نفضل managed to في الجملة الثانية؟',
					hintAr: 'الجملة الأولى تصف مهارة عامة مستمرة، أما الثانية فتصف نجاحا محددا بعد جهد.',
					expectedInput: 'لأن managed to تدل على النجاح في تجاوز صعوبة في موقف محدد',
					revealAr:
						'تستعمل could للمهارات والقدرات العامة في الماضي، بينما تستعمل managed to أو was/were able to للنجاح الفعلي في إنجاز مهمة محددة (خصوصا مع وجود صعوبة).'
				},
				{
					promptAr:
						'في النفي (عدم التمكن في موقف محدد)، هل يجوز استعمال couldn\'t كما يجوز استعمال didn\'t manage to؟',
					hintAr: 'تذكر أن قيد المنع يخص الإثبات فقط أما في النفي فكلاهما مقبول.',
					expectedInput: 'نعم، في النفي يصح استعمال couldn\'t و didn\'t manage to',
					revealAr:
						'في الجمل المنفية يجوز استعمال couldn\'t أو wasn\'t able to أو didn\'t manage to للتعبير عن عدم القدرة حتى في موقف محدد.'
				},
				{
					promptAr:
						'أعد صياغة الجملة باستعمال should have: "It was a mistake that the delegates ignored the compromise."',
					hintAr: 'انقد الفعل الماضي باستعمال should not have + V3 أو should have accepted.',
					expectedInput: 'The delegates should not have ignored the compromise.',
					revealAr:
						'صيغة النقد والندم على الماضي هي: should not have ignored (أو should have accepted).'
				}
			]
		},
		summary: {
			rulesAr: [
				'القدرة العامة في الماضي (General Ability): could + Stem (مثال: At ten, she could recite long poems).',
				'الإنجاز المحدد في الماضي (Specific Achievement): was/were able to + Stem أو managed to + Stem (مثال: Despite tension, the council managed to restore calm).',
				'العتاب والندم على الماضي (Past Criticism / Regret): should (not) have + V3 أو ought (not) to have + V3.',
				'الوجوب وغياب الوجوب: must / have to (الحاضر)، had to (الماضي)، must not (منع)، و need not / do not have to (عدم ضرورة).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Modal Nuances Across Past and Present',
				tenseName: 'managed to vs should have + V3',
				formula: 'managed to + Stem (Done!) | should have + V3 (Not done!)',
				activeZone: 'past',
				example: 'We managed to sign the charter, though we should have acted sooner.',
				markers: 'after long effort, eventually, finally / regrettably, mistakenly'
			}),
			visualCaptionAr: 'الفرق الدلالي بين إنجاز تحقق فعلا (managed to) وعمل مقصر فيه (should have)',
			examples: [
				{
					problemAr: 'Rewrite using "managed to": "Although the debate was heated, the chairperson succeeded in calming both groups."',
					solutionAr: 'Although the debate was heated, the chairperson managed to calm both groups.'
				},
				{
					problemAr: 'Rewrite using "should have": "It was wrong of him to judge his neighbour hastily."',
					solutionAr: 'He should not have judged his neighbour hastily.'
				}
			],
			watchOutAr:
				'انتبه للفعل بعد managed to: يأتي في المصدر المجرد (managed to solve) وليس V-ing (على عكس succeeded in solving). ولا تنس التصريف الثالث (V3) بعد should have.'
		},
		practice: [
			{
				questionAr: 'Choose the most accurate modal for a difficult specific past achievement: "After weeks of mediation, local elders ...... settle the land conflict."',
				options: ['could', 'managed to', 'should have', 'must'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: في الإثبات مع إنجاز محدد صعب نفضل managed to أو were able to على could.',
					'أحسنت! managed to + Stem تعبر بدقة عن النجاح بعد جهد في موقف محدد.',
					'خطأ: should have تفيد أنهم لم يحلوا النزاع.',
					'خطأ: must لا تستعمل لإنجاز ماض.'
				],
				explanationAr: 'للتعبير عن النجاح الفعلي بعد جهد في موقف ماض محدد نستخدم managed to + Stem.'
			},
			{
				questionAr: 'Transform accurately: "He succeeded in convincing the rivals to shake hands." = "He ...... the rivals to shake hands."',
				options: ['managed to convincing', 'managed to convince', 'was able convincing', 'should have convinced'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد managed to نستعمل المصدر المجرد لا V-ing.',
					'صحيح! managed to + Stem تساوي succeeded in + V-ing.',
					'خطأ: was able تحتاج to + Stem.',
					'خطأ: should have تعكس المعنى وتفيد أنه فشل.'
				],
				explanationAr: 'تتبع العبارة managed to بالمصدر المجرد (convince) وتكافئ succeeded in + V-ing.'
			},
			{
				questionAr: 'Which sentence expresses REGRET or CRITICISM about a past action?',
				options: [
					'Leaders should promote respectful dialogue today.',
					'Both sides should have verified the facts before arguing.',
					'The committee was able to publish the charter.',
					'Students do not have to attend the optional talk.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: should + Stem تعبر عن نصيحة في الحاضر أو المستقبل.',
					'ممتاز! should have + V3 تعبر عن عتاب أو ندم على تقصير ماض.',
					'خطأ: هذه الجملة تعبر عن إنجاز ماض.',
					'خطأ: هذه الجملة تعبر عن غياب الوجوب.'
				],
				explanationAr: 'الصيغة should have + verified تفيد أن التثبت لم يحدث وكان ينبغي أن يحدث.'
			},
			{
				questionAr: 'Which sentence correctly uses "could" for a GENERAL past ability?',
				options: [
					'When she was twelve, Salma could summarize English essays smoothly.',
					'Yesterday morning, Salma could rescue the stray cat from the well.',
					'Last Monday, the team could win the final match after extra time.',
					'Two hours ago, he could fix the broken projector at last.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! مهارة عامة مستمرة في الطفولة تناسبها could.',
					'خطأ: إنجاز محدد أمس يناسبه was able to / managed to.',
					'خطأ: فوز في مباراة محددة يناسبه managed to / were able to.',
					'خطأ: إنجاز محدد قبل ساعتين يناسبه managed to / was able to.'
				],
				explanationAr: 'تستعمل could في الإثبات للقدرات والمهارات العامة المستمرة في الماضي.'
			},
			{
				questionAr: 'Choose the right negative equivalent of "It was unnecessary to repeat the warning":',
				options: [
					'You must not repeat the warning.',
					'You did not have to repeat the warning.',
					'You should have repeated the warning.',
					'You could not repeat the warning.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: must not للمنع في الحاضر.',
					'صحيح! did not have to تفيد غياب الضرورة في الماضي.',
					'خطأ: should have تفيد العتاب على عدم التكرار.',
					'خطأ: could not تفيد العجز لا غياب الضرورة.'
				],
				explanationAr: 'للتعبير عن عدم ضرورة أمر في الماضي نستعمل did not have to + Stem.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t1_contrast_concession',
		slug: 'eng-2as-le-t1-contrast-concession',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time & Make Peace (التحول الاجتماعي وثقافة السلم)',
		order: 3,
		titleAr: 'روابط المقابلة والاستدراك في الخطاب (However, Although, Whereas, Despite)',
		objectives: [
			'التمييز الدلالي بين المقابلة الخالصة (Contrast: whereas, while, unlike) والاستدراك (Concession: although, despite, however)',
			'ضبط البنية النحوية وعلامات الترقيم لكل رابط (Clause vs Noun Phrase vs Sentence Adverb)',
			'تنويع روابط الخطاب في التمارين التحويلية والمقالات الراقية لشعبة اللغات'
		],
		keywordsAr: ['however', 'although', 'whereas', 'despite', 'discourse markers', 'contrast', 'concession'],
		discover: {
			scenarioAr:
				'في مقال بشعبة اللغات الأجنبية، اقرأ كيف تتنوع الروابط دون تكرار ممل: "Whereas printed books invite deep focus, short posts encourage rapid browsing. However, despite the rise of screens, serious readers still cherish libraries."',
			svg: svgEnglishGrammarMap({
				title: 'Contrast vs Concession Discourse Map (2AS LE)',
				rootLabel: 'Logical Opposition',
				rootSub: 'Choose by meaning AND grammar slot',
				branches: [
					{
						label: 'although / even though',
						rule: 'Concession + Clause',
						example: 'Although time is short, we read.'
					},
					{
						label: 'despite / in spite of',
						rule: 'Concession + Noun / V-ing',
						example: 'Despite tight schedules, we read.'
					},
					{
						label: 'whereas / while',
						rule: 'Direct Contrast + Clause',
						example: 'Past life was calm, whereas ours is rushed.'
					},
					{
						label: 'However / Nevertheless',
						rule: 'Sentence transition + comma',
						example: 'Tech helps. However, balance matters.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'ما الفرق المعنوي بين whereas و although؟ قارن: "Rural towns are quiet, whereas big cities are noisy" مقابل "Although big cities are noisy, many scholars work peacefully there".',
					hintAr: 'الأولى تقارن بين طرفين مختلفين، والثانية تقدم نتيجة غير متوقعة رغم عائق.',
					expectedInput: 'whereas تقابل بين طرفين مختلفين و although تعبر عن استدراك ضد المتوقع',
					revealAr:
						'تستعمل whereas و while للمقابلة المباشرة بين عنصرين (Contrast)، بينما تستعمل although و despite و however للاستدراك أمام عائق غير متوقع (Concession).'
				},
				{
					promptAr:
						'كيف نضبط علامات الترقيم مع However عندما نربط فكرتين؟',
					hintAr: 'هل تأتي before However نقطة أو فاصلة منقوطة، وماذا يأتي بعدها مباشرة؟',
					expectedInput: 'قبلها نقطة أو فاصلة منقوطة وبعدها فاصلة',
					revealAr:
						'تقع However في بداية جملة مستقلة بعد نقطة (.) أو فاصلة منقوطة (;) ويتبعها دائما فاصلة (,)، ولا نربط بها جملتين بفاصلة فقط.'
				},
				{
					promptAr:
						'حول الجملة التالية باستعمال Despite: "Even though digital media spreads rapidly, careful journalism remains essential."',
					hintAr: 'حول digital media spreads rapidly إلى عبارة اسمية (the rapid spread of digital media).',
					expectedInput: 'Despite the rapid spread of digital media, careful journalism remains essential.',
					revealAr:
						'تحويل الفعل والظرف إلى عبارة اسمية (Nominalization: spreads rapidly تصبح the rapid spread of) هو أرقى أسلوب في شعبة اللغات مع Despite.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستدراك مع جملة (Subordinators + Clause): although / though / even though + Subject + Verb (دون استعمال but معها).',
				'الاستدراك مع اسم أو مصدر (Prepositions + NP/V-ing): despite / in spite of + Noun Phrase / V-ing (وإذا احتجت جملة كاملة استعمل despite the fact that).',
				'المقابلة المباشرة بين طرفين (Contrast): whereas / while + Clause (مع فاصلة)، أو unlike / in contrast to + Noun Phrase.',
				'الروابط الانتقالية بين جملتين (Conjunctive Adverbs): However, / Nevertheless, / Yet, / On the other hand, — تسبقها نقطة أو فاصلة منقوطة وتليها فاصلة.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Nominalization Trick for Despite (LE Excellence)',
				steps: [
					{ stage: 'Adj to Noun', detail: 'was difficult: the difficulty / was busy: busy schedules' },
					{ stage: 'Verb to Noun', detail: 'spreads fast: the rapid spread / grew: the growth' },
					{ stage: 'Same Subject', detail: 'Use V-ing: Although he worked hard = Despite working hard' },
					{ stage: 'Punctuation', detail: 'Always add a comma after the initial Despite phrase.' }
				]
			}),
			visualCaptionAr: 'تقنية التحويل الاسمي (Nominalization) لإتقان إعادة الصياغة في شعبة اللغات',
			examples: [
				{
					problemAr: 'Combine using "However": "Modern smartphones save communication time. Excessive scrolling weakens concentration."',
					solutionAr: 'Modern smartphones save communication time; however, excessive scrolling weakens concentration. (أو بنقطة قبل However,)'
				},
				{
					problemAr: 'Rewrite using "Despite": "Although peace negotiations faced obstacles, both communities reached an accord."',
					solutionAr: 'Despite the obstacles faced by peace negotiations, both communities reached an accord.'
				}
			],
			watchOutAr:
				'احذر خطأ Comma Splice مع however: كتابة "Cities grow fast, however, villages stay calm" خطأ ترقيمي في شعبة اللغات! استعمل نقطة (.) أو فاصلة منقوطة (;) قبل however.'
		},
		practice: [
			{
				questionAr: 'Choose the sentence with accurate punctuation for "however":',
				options: [
					'Traditional crafts take longer, however, they last for generations.',
					'Traditional crafts take longer. However, they last for generations.',
					'However traditional crafts take longer, they last for generations.',
					'Traditional crafts take longer however they last for generations.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضع فاصلة فقط قبل however بين جملتين مستقلتين (Comma Splice).',
					'صحيح! نقطة قبل However وفاصلة بعدها.',
					'خطأ: هذا الموضع يناسب Although وليس However.',
					'خطأ: تنقص علامات الترقيم الأساسية حول however.'
				],
				explanationAr: 'تسبق However نقطة أو فاصلة منقوطة وتليها فاصلة.'
			},
			{
				questionAr: 'Select the best linker to contrast TWO DIFFERENT subjects: "Our grandparents wrote letters by hand, ...... teenagers today exchange instant voice notes."',
				options: ['despite', 'whereas', 'however', 'in spite of'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: despite تتبعها عبارة اسمية لا جملة كاملة.',
					'أحسنت! whereas مثالية للمقابلة المباشرة بين جملتين متباينتين.',
					'خطأ: بعد الفاصلة العادية هنا لا نضع however بلا فاصلة منقوطة.',
					'خطأ: in spite of يتبعها اسم أو V-ing.'
				],
				explanationAr: 'تستعمل whereas للمقابلة المباشرة بين طرفين داخل جملة مركبة واحدة.'
			},
			{
				questionAr: 'Transform accurately using nominalization: "Although the dispute was complex, the elders solved it peacefully."',
				options: [
					'Despite the dispute was complex, the elders solved it peacefully.',
					'Despite of the complexity of the dispute, the elders solved it peacefully.',
					'Despite the complexity of the dispute, the elders solved it peacefully.',
					'Whereas the complexity of the dispute, the elders solved it peacefully.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نضع جملة كاملة مباشرة بعد Despite.',
					'خطأ: لا تكتب of بعد Despite.',
					'ممتاز! حولنا was complex إلى the complexity of the dispute بدقة.',
					'خطأ: Whereas تحتاج جملة فعلية لا عبارة اسمية.'
				],
				explanationAr: 'نحول الجملة بعد Despite إلى عبارة اسمية (the complexity of the dispute) دون حرف الجر of.'
			},
			{
				questionAr: 'Which linker expresses CONCESSION (an unexpected result) rather than mere comparison?',
				options: [
					'Even though the library had few funds, it served hundreds of students.',
					'The northern coast is humid, whereas the southern Sahara is dry.',
					'Unlike stone houses, wooden cabins are rare in the desert.',
					'In contrast to winter mornings, summer mornings start early.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! قلة التمويل عائق، وخدمة مئات التلاميذ نتيجة غير متوقعة (Concession).',
					'خطأ: هذه مقابلة جغرافية مباشرة (Contrast).',
					'خطأ: هذه مقارنة بين نوعي سكن (Contrast).',
					'خطأ: هذه مقارنة بين فصلين (Contrast).'
				],
				explanationAr: 'يعبر الاستدراك (Even though) عن تحقق نتيجة رغم وجود عائق متوقع.'
			},
			{
				questionAr: 'Identify the sentence that is FREE of grammar errors:',
				options: [
					'Although he apologized sincerely, yet some people refused to listen.',
					'In spite of he arrived late, he contributed helpful ideas.',
					'Despite the fact that resources were limited, the peace forum succeeded.',
					'Unlike modern trains are electric, old trains used steam.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نجمع بين Although و yet في نفس الجملة في الإنجليزية القياسية المعاصرة.',
					'خطأ: بعد In spite of لا نضع فاعلا وفعلا مباشرا.',
					'صحيح! Despite the fact that + Clause صيغة سليمة مئة بالمئة.',
					'خطأ: بعد Unlike نضع اسما فقط دون الفعل are.'
				],
				explanationAr: 'الجملة الثالثة توظف الجسر النحوي السليم Despite the fact that + Subject + Verb.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t1_compare_contrast_essay',
		slug: 'eng-2as-le-t1-compare-contrast-essay',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time & Make Peace (التحول الاجتماعي وثقافة السلم)',
		order: 4,
		titleAr: 'كتابة مقال المقارنة والمقابلة الأكاديمي (Compare-and-Contrast Essay — 6 pts)',
		objectives: [
			'تصميم مقال مقارنة ومقابلة من أربع فقرات متوازنة (120 إلى 150 كلمة) وفق مستوى شعبة اللغات (6 نقاط)',
			'إتقان طريقتي التنظيم: التنظيم بالكتل (Block Method) أو نقطة بنقطة (Point-by-Point Method)',
			'توظيف الروابط المتقدمة (Similarly, By contrast, Whereas, Nevertheless) وصياغة أطروحة واضحة (Thesis Statement)'
		],
		keywordsAr: ['Compare and Contrast Essay', 'Thesis Statement', 'Point-by-Point', 'Written Expression', '6 pts'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية تمنح الوضعية الإدماجية 6 نقاط كاملة. المطلوب مقال منظم يقارن بين التعليم أو الروابط الاجتماعية في الجزائر قديما وحديثا، دون سرد عشوائي بل بتصميم أكاديمي واضح وروابط دقيقة.',
			svg: svgEnglishWritingStructure({
				title: '4-Paragraph Compare-and-Contrast Essay (6 pts)',
				steps: [
					{ stage: 'Introduction', detail: 'Hook + context + clear Thesis Statement stating scope.' },
					{ stage: 'Body Para 1', detail: 'Similarities OR Past features (used to / would + examples).' },
					{ stage: 'Body Para 2', detail: 'Differences OR Present shifts (whereas / however / unlike).' },
					{ stage: 'Conclusion', detail: 'Restate thesis + balanced insight on keeping core values.' }
				]
			}),
			steps: [
				{
					promptAr:
						'اقرأ الأطروحتين التاليتين لمقال عن الحياة قديما وحديثا: (A) "Life changed." و (B) "Although modern technology has reshaped Algerian education and communication, enduring values of hospitality and solidarity still unite both generations." أيهما أطروحة أكاديمية تستحق علامة شعبة اللغات؟',
					hintAr: 'الأطروحة القوية تحدد محاور المقارنة وتظهر التوازن بين التغير والثبات.',
					expectedInput: 'الأطروحة B لأنها محددة ومتوازنة وتعلن محاور المقال',
					revealAr:
						'الأطروحة القوية (Thesis Statement) في نهاية المقدمة تحدد بدقة ما سيقارنه المقال وتوجه القارئ نحو فقرتي العرض.'
				},
				{
					promptAr:
						'ما الفرق بين أسلوب الكتل (Block Method) وأسلوب نقطة بنقطة (Point-by-Point)؟',
					hintAr: 'هل نخصص فقرة للماضي وفقرة للحاضر، أم نقارن كل محور على حدة؟',
					expectedInput: 'الكتل تخصص فقرة لكل فترة، ونقطة بنقطة تقارن كل محور بين الفترتين',
					revealAr:
						'في Block Method تصف الفقرة الأولى الماضي والثانية الحاضر مع روابط مقابلة؛ وفي Point-by-Point تقارن محورا واحدا في كل فقرة (مثلا التعليم في الفقرة 1 والتواصل في الفقرة 2). وكلاهما ممتاز إذا التزمت به بانتظام.'
				},
				{
					promptAr:
						'اذكر رابطين للتشابه (Similarity) ورابطين للاختلاف (Difference) يرفعان مستوى الأسلوب في شعبة اللغات.',
					hintAr: 'للتشابه: Similarly / Likewise؛ للاختلاف: By contrast / Whereas.',
					expectedInput: 'للتشابه: Similarly و Likewise؛ للاختلاف: By contrast و Whereas',
					revealAr:
						'تنويع أدوات التشابه (Similarly, Likewise, Both...and) وأدوات الاختلاف (By contrast, On the other hand, Whereas, Unlike) يعزز علامة التماسك والأسلوب.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المقدمة (Introduction): جملة افتتاحية جاذبة (Hook) + تمهيد موجز + أطروحة واضحة (Thesis Statement) تحدد نقطتي المقارنة.',
				'فقرتا العرض (Body Paragraphs): تبدأ كل فقرة بجملة رئيسية (Topic Sentence) تليها شواهد وأمثلة محددة وروابط مقارنة واستدراك.',
				'الخاتمة (Conclusion): إعادة صياغة للأطروحة بأسلوب جديد + خلاصة متوازنة (دون إدخال فكرة جديدة غير مناقشة).',
				'توزيع معايير 6 نقاط في 2AS LE: ملاءمة المحتوى والأفكار (2 pts)، التنظيم والروابط (1.5 pt)، دقة القواعد والمفردات المتنوعة (1.5 pt)، والهجاء والترقيم والأسلوب الأصيل (1 pt).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'High-Score Linkers for Compare & Contrast',
				rootLabel: 'Academic Essay Linkers',
				rootSub: 'Balance similarities and differences',
				branches: [
					{
						label: 'Similarities',
						rule: 'Show shared values',
						example: 'Similarly, / Likewise, / Both...'
					},
					{
						label: 'Differences',
						rule: 'Highlight contrast',
						example: 'By contrast, / Whereas / Unlike'
					},
					{
						label: 'Concession',
						rule: 'Add nuance & depth',
						example: 'Although / Despite / However,'
					},
					{
						label: 'Conclusion',
						rule: 'Synthesize clearly',
						example: 'All in all, / To conclude,'
					}
				]
			}),
			visualCaptionAr: 'دليل الروابط الأكاديمية للتميز في مقال المقارنة والمقابلة لشعبة اللغات',
			examples: [
				{
					problemAr: 'Write a Topic Sentence for Body Paragraph 2 comparing past vs modern study methods.',
					solutionAr: 'By contrast, modern Algerian learners rely on digital archives and interactive courses, whereas previous generations depended almost exclusively on printed manuals and handwritten notes.'
				},
				{
					problemAr: 'Write a concise balanced conclusion for an essay on social change in Algeria.',
					solutionAr: 'All in all, while modern conveniences have accelerated daily life, preserving our Islamic heritage of mutual respect and family warmth remains the true measure of progress.'
				}
			],
			watchOutAr:
				'في مقال 2AS LE لا تكتب فقرة واحدة طويلة بلا تقسيم! احرص على 4 فقرات واضحة المعالم مع مسافة بادئة أو سطر فاصل، ولا تكرر كلمة but في كل سطر بل نوع الروابط الأكاديمية.'
		},
		practice: [
			{
				questionAr: 'Where does the Thesis Statement normally appear in a compare-and-contrast essay?',
				options: [
					'As the final sentence of the introduction',
					'In the middle of the conclusion',
					'As a bullet point before the title',
					'Only inside the second body paragraph'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! تقع الأطروحة في نهاية المقدمة لتمهد لمحاور العرض.',
					'خطأ: الخاتمة تعيد صياغة الأطروحة ولا تقدمها لأول مرة.',
					'خطأ: المقال الأكاديمي يكتب بفقرات مترابطة لا قوائم نقطية.',
					'خطأ: يجب إعلان مسار المقال منذ المقدمة.'
				],
				explanationAr: 'توضع جملة الأطروحة (Thesis Statement) في ختام المقدمة لتحديد نطاق المقارنة.'
			},
			{
				questionAr: 'Which transition signals a SIMILARITY between past and present Algerian society?',
				options: ['By contrast,', 'Similarly,', 'Whereas', 'Unlike'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: By contrast تشير إلى الاختلاف.',
					'ممتاز! Similarly (وكذلك Likewise) تشير إلى التشابه.',
					'خطأ: Whereas للمقابلة والاختلاف.',
					'خطأ: Unlike للاختلاف.'
				],
				explanationAr: 'نستخدم Similarly و Likewise لإبراز أوجه التشابه بين الطرفين.'
			},
			{
				questionAr: 'What is the main advantage of starting every body paragraph with a clear Topic Sentence?',
				options: [
					'It replaces the need for examples',
					'It tells the reader immediately what aspect is being compared in that paragraph',
					'It allows the writer to skip the conclusion',
					'It makes the essay shorter than 50 words'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الجملة الرئيسية تحتاج شواهد وأمثلة تدعمها.',
					'صحيح! الجملة الرئيسية تضبط وحدة الفقرة وتوضح محور المقارنة فورا.',
					'خطأ: الخاتمة تبقى ركنا أساسيا في المقال.',
					'خطأ: مقال شعبة اللغات يحتاج عادة 120 إلى 150 كلمة.'
				],
				explanationAr: 'الجملة الرئيسية (Topic Sentence) تعلن الفكرة المحورية للفقرة وتقوي التماسك.'
			},
			{
				questionAr: 'What should you AVOID doing in the conclusion of an academic essay?',
				options: [
					'Restating the thesis in fresh words',
					'Summarizing the main points of comparison',
					'Introducing a completely new, unexamined argument',
					'Ending with a balanced closing reflection'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: إعادة صياغة الأطروحة مطلوبة في الخاتمة.',
					'خطأ: التلخيص الموجز جزء أصيل من الخاتمة.',
					'صحيح! لا نفتح حجة جديدة تماما في الخاتمة بل نغلق ما ناقشناه في العرض.',
					'خطأ: الملاحظة الختامية المتوازنة ترفع جودة المقال.'
				],
				explanationAr: 'الخاتمة تلخص وتغلق المقال ولا تضيف محاور جديدة لم تناقش في العرض.'
			},
			{
				questionAr: 'Choose the most cohesive sentence for a 2AS LE compare-and-contrast essay:',
				options: [
					'Past life was simple, and modern life is fast, and people use phones, and it is nice.',
					'Whereas past communication relied on handwritten letters, today instant platforms connect families across continents within seconds.',
					'Letters were old. Phones are new. Both are things.',
					'Unlike past communication relied on letters, today phones are quick.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تكرار and بشكل رتيب يضعف الأسلوب الأكاديمي.',
					'أحسنت! جملة متوازنة تجمع بين دقة التركيب وثراء المفردات ورابط مقابلة سليم.',
					'خطأ: جمل مقتضبة وسطحية جدا لمستوى شعبة اللغات.',
					'خطأ: Unlike لا يتبعها فاعل وفعل.'
				],
				explanationAr: 'الجملة الثانية تحقق الدقة النحوية والتوازن الدلالي المطلوب في شعبة اللغات الأجنبية.'
			}
		]
	}
];
