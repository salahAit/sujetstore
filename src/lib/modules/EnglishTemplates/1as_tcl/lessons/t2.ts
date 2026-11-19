import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCL Trimester 2 (Unit 2: Once Upon a Time)
// 100% Original Wholesome Algerian & Islamic Moral Tales (ZERO non-Muslim authors)
// ============================================================================

export const LESSONS_1AS_TCL_T2: EnglishInteractiveLessonData[] = [
	// 1. Past Simple vs Past Continuous (while / when)
	{
		id: 'eng_lesson_1as_tcl_t2_past_simple_continuous',
		slug: 'eng-1as-tcl-t2-past-simple-continuous',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Once Upon a Time — الحكايات الهادفة وفن السرد',
		order: 1,
		titleAr: 'الماضي البسيط والماضي المستمر مع الروابط (Past Simple vs Past Continuous: while, when)',
		objectives: [
			'التمييز بين الحدث الطويل المستمر في الماضي (Past Continuous) والحدث القصير القاطع (Past Simple)',
			'توظيف الروابط الزمنية while و as و when بدقة في سرد الحكايات الهادفة',
			'تصريف الأفعال المنتظمة والشاذة في الماضي البسيط وتشكيل was/were + Verb-ing'
		],
		keywordsAr: ['Past Simple', 'Past Continuous', 'while', 'when', 'Interrupted Action'],
		discover: {
			scenarioAr:
				'اقرأ مقتطفا من حكاية "التاجر الأمين في تلمسان": "While the merchant was arranging his spices in the market, a weary traveller dropped a leather pouch of gold coins near the stall. When the merchant noticed the pouch, he immediately ran after the traveller and returned it." تأمل الفرق بين الحدث الطويل (was arranging) والحدثين القصيرين (dropped / noticed).',
			svg: svgEnglishTenseTimeline({
				title: 'Interrupted Action in Narrative Storytelling',
				tenseName: 'Past Continuous + Past Simple',
				formula: 'While + S + was/were + V-ing, S + V-ed (Past Simple)',
				activeZone: 'two_past',
				example: 'While he was arranging spices, a traveller dropped a pouch.',
				markers: 'while, as (long action) | when, suddenly (short action)'
			}),
			steps: [
				{
					promptAr: 'أي الفعلين استغرق مدة طويلة وكان مستمرا في الخلفية: was arranging أم dropped؟',
					hintAr: 'ترتيب التوابل يستغرق وقتا، أما سقوط الكيس فيحدث في لحظة.',
					expectedInput: 'was arranging هو الحدث الطويل (Past Continuous)',
					revealAr: 'نستعمل Past Continuous (was/were + Verb-ing) للحدث الطويل المستمر، و Past Simple (dropped) للحدث القصير الذي قطعه.'
				},
				{
					promptAr: 'ما الزمن الذي يأتي عادة مباشرة بعد الرابط "While" أو "As"؟',
					hintAr: 'ارجع إلى بداية الجملة: While the merchant was arranging...',
					expectedInput: 'الماضي المستمر (Past Continuous)',
					revealAr: 'يأتي بعد while و as عادة الماضي المستمر (was/were + V-ing). أما when فيأتي بعدها غالبا الماضي البسيط (Past Simple).'
				},
				{
					promptAr: 'ماذا نفعل إذا وقع حدثان طويلان في نفس الوقت دون أن يقطع أحدهما الآخر؟',
					hintAr: 'مثال: كان الفلاح يسقي النخيل بينما كان ابنه يجمع التمر.',
					expectedInput: 'نضع الفعلين معا في الماضي المستمر (Past Continuous)',
					revealAr:
						'للحدثين المتوازيين (Simultaneous actions) نضع كلا الفعلين في الماضي المستمر: While the farmer was watering the palms, his son was collecting dates.'
				}
			]
		},
		summary: {
			rulesAr: [
				'صيغة الماضي المستمر (Past Continuous): I/He/She/It + was + V-ing | We/You/They + were + V-ing. يعبر عن حدث كان جاريا في وقت محدد في الماضي.',
				'صيغة الماضي البسيط (Past Simple): Verb + ed (أو التصريف الثاني الشاذ مثل found, gave, ran, spoke). يعبر عن حدث قصير مكتمل أو سلسلة أحداث متتابعة.',
				'الحدث القاطع (Interruption): While / As + Past Continuous, Past Simple. أو: Past Continuous + when + Past Simple.',
				'الحدثان المتوازيان (Parallel Actions): While + Past Continuous, Past Continuous.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Using while and when in Past Narratives',
				rootLabel: 'Choose Tense by Action Length',
				branches: [
					{
						label: 'Long + Short',
						rule: 'While + was/were V-ing, Past Simple',
						example: 'While I was reading, he knocked.'
					},
					{
						label: 'Short Interrupts Long',
						rule: 'Past Continuous + when + Past Simple',
						example: 'They were walking when rain fell.'
					},
					{
						label: 'Two Long Actions',
						rule: 'While + Past Cont., Past Cont.',
						example: 'While he was speaking, we were listening.'
					}
				]
			}),
			visualCaptionAr: 'خريطة توظيف الماضي البسيط والماضي المستمر مع while و when',
			examples: [
				{
					problemAr: 'صرّف الفعلين: "While the shepherd (watch) his flock in the valley, he (spot) a lost lamb."',
					solutionAr: 'While the shepherd was watching his flock in the valley, he spotted a lost lamb.'
				},
				{
					problemAr: 'صرّف الفعلين: "The villagers (harvest) olives when a sudden sandstorm (arrive)."',
					solutionAr: 'The villagers were harvesting olives when a sudden sandstorm arrived.'
				}
			],
			watchOutAr:
				'تذكّر مضاعفة الحرف الساكن الأخير في الأفعال القصيرة قبل ing/ed مثل (drop: dropped, stop: stopped, sit: sitting)، ولا تنس حذف e الصامتة قبل ing مثل (write: writing, arrange: arranging).'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة: "While the old scholar .......... a manuscript, a young pupil knocked politely on the door."',
				options: ['copied', 'was copying', 'were copying', 'copies'],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدث بعد While هنا طويل مستمر يحتاج الماضي المستمر.',
					'أحسنت! The old scholar مفرد والحدث طويل مستمر: was copying.',
					'were للجمع وليس للمفرد.',
					'السياق في الماضي (knocked) وليس المضارع.'
				],
				explanationAr: 'بعد While نضع الماضي المستمر للحدث الطويل الذي قاطعه حدث قصير (knocked).'
			},
			{
				questionAr: 'أكمل الجملة: "The travellers were crossing the mountain pass when the sun .........."',
				options: ['was setting', 'sets', 'set', 'setting'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد when مع الحدث القاطع/القصير نستخدم الماضي البسيط.',
					'sets مضارع بسيط.',
					'صحيح! الفعل الشاذ set ماضيه البسيط set.',
					'صيغة ناقصة بدون فعل مساعد.'
				],
				explanationAr: 'التركيب: Past Continuous + when + Past Simple (set).'
			},
			{
				questionAr: 'أكمل جملة الحدثين المتوازيين: "While the grandfather was telling a moral tale, the children .......... attentively."',
				options: ['were listening', 'was listening', 'listen', 'listened were'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! حدثان طويلان في آن واحد مع فاعل جمع (the children): were listening.',
					'the children جمع تأخذ were لا was.',
					'السياق ماض لا مضارع.',
					'ترتيب خاطئ.'
				],
				explanationAr: 'عند وقوع حدثين طويلين معا نضع كليهما في الماضي المستمر.'
			},
			{
				questionAr: 'أي جملة من الجمل الآتية صحيحة نحويا؟',
				options: [
					'When the merchant was finding the bag, he returned it.',
					'While the boy was helping his neighbour, he found a silver ring.',
					'While the boy helped his neighbour, he was finding a silver ring.',
					'The boy was help his neighbour when it rained.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'فعل find لحظي قصير لا يستمر عادة بصيغة was finding.',
					'أحسنت! الحدث الطويل (was helping) في الماضي المستمر واللحظي (found) في الماضي البسيط.',
					'تم عكس الزمنين بين الحدث الطويل والقصير.',
					'بعد was نضع helping وليس help.'
				],
				explanationAr: 'نضع الحدث المستمر (was helping) بعد While والحدث اللحظي (found) في الماضي البسيط.'
			},
			{
				questionAr: 'أكمل الفراغ بالرابط المناسب: "The baker was sharing bread with the needy .......... a wise judge passed by."',
				options: ['while', 'when', 'although', 'unless'],
				correctIndex: 1,
				diagnosticFeedback: [
					'while يأتي بعدها عادة الحدث المستمر لا الماضي البسيط passed by.',
					'صحيح! when تربط بين الحدث المستمر (was sharing) والحدث القاطع (passed by).',
					'although للاستدراك لا للزمن.',
					'unless للشرط.'
				],
				explanationAr: 'الرابط when يأتي قبل الحدث القصير في الماضي البسيط (passed by).'
			}
		]
	},

	// 2. Relative Pronouns (who, whom, which, whose)
	{
		id: 'eng_lesson_1as_tcl_t2_relative_pronouns',
		slug: 'eng-1as-tcl-t2-relative-pronouns',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Once Upon a Time — الحكايات الهادفة وفن السرد',
		order: 2,
		titleAr: 'ضمائر الوصل (Relative Pronouns: who, whom, which, whose)',
		objectives: [
			'التمييز الدقيق بين who (للعاقل الفاعل) و whom (للعاقل المفعول) و which (لغير العاقل) و whose (للملكية)',
			'ربط جملتين وصفيتين في قصة قصيرة دون تكرار الضمائر',
			'إغناء وصف الشخصيات والأماكن في الحكايات الهادفة بجمل وصل سليمة'
		],
		keywordsAr: ['Relative Pronouns', 'who', 'whom', 'which', 'whose'],
		discover: {
			scenarioAr:
				'تأمّل وصف شخصيات حكاية جزائرية هادفة: "1. Tariq was a generous farmer who planted date palms in Biskra. 2. The neighbour whom Tariq helped never forgot his kindness. 3. The oasis, which had clear springs, flourished for years. 4. Tariq met a traveller whose horse was exhausted." لاحظ الكلمة التي قبل وبعد كل ضمير وصل.',
			svg: svgEnglishGrammarMap({
				title: 'Relative Pronouns in Story Descriptions',
				rootLabel: 'Choose the Relative Pronoun by Antecedent and Role',
				branches: [
					{
						label: 'who / whom (Person)',
						rule: 'who + Verb | whom + Subject + Verb',
						example: 'The judge who spoke / whom we met'
					},
					{
						label: 'which (Thing/Animal)',
						rule: 'Refers to objects, places, animals',
						example: 'The caravan which crossed the Sahara'
					},
					{
						label: 'whose (Possession)',
						rule: 'whose + Noun (replaces his/her/their/its)',
						example: 'The boy whose honesty amazed everyone'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق العملي السريع بين who و whom عندما نتحدث عن شخص عاقل؟',
					hintAr: 'انظر إلى ما جاء مباشرة بعد who (فعل planted) وما جاء بعد whom (فاعل Tariq + فعل helped).',
					expectedInput: 'who تحل محل الفاعل ويتبعها فعل، أما whom فتحل محل المفعول ويتبعها فاعل وفعل',
					revealAr:
						'إذا جاء بعد الفراغ فعل مباشرة نستعمل who (The farmer who planted). وإذا جاء فاعل وفعل وكان الشخص مفعولا به نستعمل whom (The neighbour whom Tariq helped).'
				},
				{
					promptAr: 'ما الذي يحل ضمير الوصل "whose" محله عند دمج جملتين؟',
					hintAr: 'قارن: "Tariq met a traveller. His horse was exhausted."',
					expectedInput: 'يحل محل صفات الملكية (his / her / their / its)',
					revealAr: 'whose تعبر عن الملكية ويتبعها دائما اسم مملوك مباشرة (whose horse, whose wisdom, whose kindness).'
				},
				{
					promptAr: 'متى نستعمل which؟',
					hintAr: 'انظر إلى الجملة الثالثة في المثال: The oasis, which had clear springs...',
					expectedInput: 'لغير العاقل (الأشياء والحيوانات والأماكن كأشياء)',
					revealAr: 'نستعمل which للأشياء والحيوانات والأفكار والكتب والمدن عند وصفها بصفة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'who (الذي/التي للعاقل الفاعل): تقع بعد اسم عاقل ويتبعها فعل. مثال: The merchant who returned the gold became respected.',
				'whom (الذي/التي للعاقل المفعول به): تقع بعد اسم عاقل ويتبعها فاعل + فعل (أو بعد حرف جر: the scholar to whom he spoke).',
				'which (الذي/التي لغير العاقل): تقع بعد شيء أو حيوان أو فكرة. مثال: The parable which our grandfather told us was memorable.',
				'whose (الذي له/التي لها للملكية): تحل محل his / her / their / its ويتبعها اسم مباشرة بدون the: The villager whose well gave sweet water shared it freely.',
				'عند الدمج، احذف الضمير المكرر (he / him / it / his) بعد إدخال ضمير الوصل!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Combining Two Sentences with Relative Pronouns',
				rootLabel: 'Avoid Repeating the Replaced Pronoun!',
				branches: [
					{
						label: 'Replacing "he / she"',
						rule: 'Use who + drop he/she',
						example: 'The man who lives here is wise.'
					},
					{
						label: 'Replacing "him / her"',
						rule: 'Use whom + drop him/her',
						example: 'The guest whom we welcomed smiled.'
					},
					{
						label: 'Replacing "his / her"',
						rule: 'Use whose + Noun + drop his/her',
						example: 'The girl whose story won is proud.'
					}
				]
			}),
			visualCaptionAr: 'قاعدة حذف الضمير المكرر عند الربط بضمائر الوصل',
			examples: [
				{
					problemAr: 'اربط الجملتين بضمير وصل مناسب: "We visited the craftsman. His pottery won first prize."',
					solutionAr: 'We visited the craftsman whose pottery won first prize.'
				},
				{
					problemAr: 'اربط الجملتين بضمير وصل مناسب: "This is the wise judge. Everybody respected him."',
					solutionAr: 'This is the wise judge whom everybody respected.'
				}
			],
			watchOutAr:
				'خطأ شائع جدا: ترك الضمير المكرر في نهاية الجملة! لا تكتب "The book which I read it was useful" بل احذف it وقل "The book which I read was useful".'
		},
		practice: [
			{
				questionAr: 'أكمل بضمير الوصل المناسب: "The old weaver .......... lived in the Casbah taught young apprentices for free."',
				options: ['which', 'who', 'whose', 'whom'],
				correctIndex: 1,
				diagnosticFeedback: [
					'which لغير العاقل والنساج عاقل.',
					'أحسنت! العاقل الفاعل المتبوع بفعل (lived) يأخذ who.',
					'whose تحتاج اسما مملوكا بعدها لا فعلا.',
					'whom للمفعول به وليس للفاعل.'
				],
				explanationAr: 'الكلمة السابقة عاقل (weaver) وبعد الفراغ فعل مباشر (lived) فنستعمل who.'
			},
			{
				questionAr: 'أكمل بضمير الوصل المناسب: "The honest shepherd .......... honesty impressed the governor refused any reward."',
				options: ['who', 'whom', 'whose', 'which'],
				correctIndex: 2,
				diagnosticFeedback: [
					'who لا تعبر عن الملكية.',
					'whom للمفعول به لا للملكية.',
					'ممتاز! honesty اسم مملوك للراعي (his honesty) فنستعمل whose.',
					'which لغير العاقل.'
				],
				explanationAr: 'ضمير الوصل whose يحل محل his قبل الاسم honesty.'
			},
			{
				questionAr: 'أكمل بضمير الوصل المناسب: "The lantern .......... guided the caravan through the night belonged to an elder."',
				options: ['who', 'whom', 'which', 'whose'],
				correctIndex: 2,
				diagnosticFeedback: [
					'who للعاقل، والمصباح غير عاقل.',
					'whom للعاقل.',
					'صحيح! الفانوس (lantern) غير عاقل فيأخذ which.',
					'guided فعل وليس اسما مملوكا.'
				],
				explanationAr: 'لغير العاقل نستعمل which.'
			},
			{
				questionAr: 'اختر الجملة السليمة عند دمج: "The elder was very kind. The travellers thanked him."',
				options: [
					'The elder whom the travellers thanked him was very kind.',
					'The elder whom the travellers thanked was very kind.',
					'The elder which the travellers thanked was very kind.',
					'The elder whose the travellers thanked was very kind.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب حذف الضمير المكرر him بعد استخدام whom.',
					'أحسنت! whom حلت محل him وحذفنا الضمير المكرر.',
					'which لغير العاقل.',
					'whose للملكية ويتبعها اسم مملوك.'
				],
				explanationAr: 'نستبدل المفعول به العاقل him بضمير الوصل whom ونحذف him.'
			},
			{
				questionAr: 'أكمل الجملة: "That is the teacher to .......... all the pupils owe their love of reading."',
				options: ['who', 'whom', 'which', 'whose'],
				correctIndex: 1,
				diagnosticFeedback: [
					'بعد حرف الجر مباشرة (to) نستعمل whom لا who.',
					'إجابة دقيقة! بعد حرف الجر + عاقل نستعمل دائما whom (to whom).',
					'which لغير العاقل.',
					'whose للملكية.'
				],
				explanationAr: 'بعد حروف الجر (to, with, for) مع العاقل نستعمل دائما whom.'
			}
		]
	},

	// 3. Describing Characters, Setting & Moral Lessons in Wholesome Tales
	{
		id: 'eng_lesson_1as_tcl_t2_moral_tales_characters',
		slug: 'eng-1as-tcl-t2-moral-tales-characters',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Once Upon a Time — الحكايات الهادفة وفن السرد',
		order: 3,
		titleAr: 'وصف الشخصيات والمكان واستخلاص العبرة في الحكايات الهادفة (Characters, Setting and Moral)',
		objectives: [
			'توظيف الصفات الإيجابية والسلبية الدقيقة لوصف شخصيات الحكايات (honest, wise, generous, patient, greedy, hasty)',
			'تحديد عناصر الحكاية الهادفة (الزمان والمكان Setting، الشخصيات Characters، الحبكة Plot، والعبرة Moral)',
			'استخلاص المغزى الأخلاقي من حكاية جزائرية أو إسلامية هادفة بأسلوب إنجليزي سليم'
		],
		keywordsAr: ['Characters', 'Setting', 'Moral Lesson', 'Personality Adjectives', 'Wholesome Tales'],
		discover: {
			scenarioAr:
				'في حكاية "بستان النخيل في بسكرة"، عاش شيخ صبور وكريم يغرس فسائل النخيل رغم كبر سنه. مرّ به شاب متعجّل وقال: "لماذا تغرس نخلا لن تأكل من ثمره؟" فابتسم الشيخ الحكيم وقال: "غرس من قبلنا فأكلنا، ونحن نغرس ليأكل من بعدنا." تأمل صفات الشخصيتين والعبرة السامية من القصة.',
			svg: svgEnglishGrammarMap({
				title: 'Four Pillars of a Wholesome Moral Tale',
				rootLabel: 'Story Analysis Elements',
				branches: [
					{
						label: 'Setting',
						rule: 'Time and Place of events',
						example: 'Long ago, in a sunny oasis in Biskra'
					},
					{
						label: 'Characters',
						rule: 'Physical and moral traits',
						example: 'wise, patient, generous vs hasty, selfish'
					},
					{
						label: 'Moral Lesson',
						rule: 'Core ethical value taught',
						example: 'True generosity serves future generations.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الصفتان الإنجليزيتان اللتان تصفان الشيخ، وما الصفة التي تصف الشاب في حكاية بسكرة؟',
					hintAr: 'الشيخ: حكيم/كريم/صبور؛ الشاب: متعجّل.',
					expectedInput: 'الشيخ: wise, generous, patient — الشاب: hasty / impatient',
					revealAr: 'الشيخ يتصف بـ wise, generous, patient, far-sighted، بينما الشاب يتصف بـ hasty / impatient.'
				},
				{
					promptAr: 'ما الفرق بين المظهر الخارجي (Physical appearance) والطبع الأخلاقي (Moral traits)؟',
					hintAr: 'قارن بين tall, grey-bearded و honest, humble.',
					expectedInput: 'المظهر الخارجي يصف الشكل والسن، والطبع يصف الأخلاق والسلوك',
					revealAr:
						'المظهر الخارجي مثل (elderly, tall, neat, smiling) يصف الشكل، أما الصفات الأخلاقية مثل (honest, trustworthy, humble, courageous) فتصف السلوك والقلب.'
				},
				{
					promptAr: 'كيف نصوغ العبرة (Moral Lesson) في ختام تحليل الحكاية بالإنجليزية؟',
					hintAr: 'نبدأ بـ The moral of the story is that...',
					expectedInput: 'The moral of the story is that generosity benefits future generations.',
					revealAr:
						'نستعمل عبارات واضحة مثل: "The moral of the tale is that..." أو "This story teaches us that honesty and patience always bring blessing."'
				}
			]
		},
		summary: {
			rulesAr: [
				'عناصر الحكاية الأربع: Setting (الزمان والمكان: Long ago, in a quiet village in Constantine) — Characters (الشخصيات الرئيسية والثانوية) — Events / Plot (تسلسل الأحداث) — Moral (العبرة الأخلاقية).',
				'صفات أخلاقية إيجابية لوصف الشخصيات: honest (أمين) — wise (حكيم) — generous (كريم) — humble (متواضع) — patient (صبور) — trustworthy (موثوق) — hardworking (مجتهد).',
				'صفات سلبية تُقابلها في الحكايات للتحذير منها: greedy (طماع) — arrogant (متكبر) — hasty (متعجل) — lazy (كسول) — selfish (أناني).',
				'لتعزيز الوصف نربط الصفات بضمائر الوصل أو الأفعال: "He was a humble craftsman whose honesty won every neighbour-s trust."'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Character Trait Opposites in Moral Stories',
				rootLabel: 'Virtue vs Vice Vocabulary',
				branches: [
					{
						label: 'Honesty / Greed',
						rule: 'honest, trustworthy',
						example: 'Opposite: greedy, dishonest'
					},
					{
						label: 'Wisdom / Haste',
						rule: 'wise, patient, calm',
						example: 'Opposite: hasty, foolish'
					},
					{
						label: 'Generosity / Pride',
						rule: 'generous, humble, kind',
						example: 'Opposite: selfish, arrogant'
					}
				]
			}),
			visualCaptionAr: 'أهم أزواج الصفات المتضادة في وصف شخصيات الحكايات الهادفة',
			examples: [
				{
					problemAr: 'استخرج المظهر والصفة الأخلاقية من الجملة: "The elderly merchant, who had a gentle smile, was known for his strict honesty."',
					solutionAr: 'Physical appearance: elderly, gentle smile | Moral trait: honest (strict honesty).'
				},
				{
					problemAr: 'اكتب عبرة (Moral) لحكاية التاجر الذي أعاد كيس الذهب لصاحبه دون أخذ أجر.',
					solutionAr: 'The moral of the tale is that honesty and trustworthiness are more valuable than gold.'
				}
			],
			watchOutAr:
				'في الحكايات الهادفة نبتعد تماما عن قصص السحر والخرافات غير النافعة، ونركز على القيم الإسلامية والجزائرية الأصيلة كالأمانة والصدق وبر الوالدين وإتقان العمل والكرم.'
		},
		practice: [
			{
				questionAr: 'ما الصفة الإنجليزية المناسبة لشخص يعيد أمانة وجدها في السوق دون أن يطلب مالا؟',
				options: ['greedy', 'honest', 'arrogant', 'hasty'],
				correctIndex: 1,
				diagnosticFeedback: [
					'greedy تعني طماع وهي عكس سلوكه.',
					'أحسنت! honest تعني أمين وصادق.',
					'arrogant تعني متكبر.',
					'hasty تعني متعجل.'
				],
				explanationAr: 'الأمانة ورد الحقوق توصف بالصفة honest أو trustworthy.'
			},
			{
				questionAr: 'ماذا يمثل قولنا: "Long ago, in a peaceful mountain village in the Aures" داخل الحكاية؟',
				options: ['The moral lesson', 'The setting (time and place)', 'The main conflict', 'The dialogue'],
				correctIndex: 1,
				diagnosticFeedback: [
					'العبرة تأتي في النهاية.',
					'ممتاز! تحدد الجملة الزمان (Long ago) والمكان (a village in the Aures) أي Setting.',
					'ليس هناك صراع أو مشكلة في هذه الجملة.',
					'لا يوجد حوار مباشر هنا.'
				],
				explanationAr: 'الـ Setting هو الإطار الزماني والمكاني الذي تجري فيه أحداث الحكاية.'
			},
			{
				questionAr: 'ما ضد الصفة الإيجابية "humble" (متواضع)؟',
				options: ['patient', 'arrogant', 'generous', 'wise'],
				correctIndex: 1,
				diagnosticFeedback: [
					'patient تعني صبور.',
					'صحيح! ضد التواضع (humble) هو التكبر (arrogant).',
					'generous صفة إيجابية تعني كريم.',
					'wise صفة إيجابية تعني حكيم.'
				],
				explanationAr: 'التقابل الأخلاقي هو humble (متواضع) مقابل arrogant (متكبر).'
			},
			{
				questionAr: 'أي جملة تصوغ العبرة (Moral) من حكاية الفلاح الذي يغرس النخيل للأجيال القادمة؟',
				options: [
					'Never plant trees if you are old.',
					'The moral of the tale is that noble deeds continue to benefit future generations.',
					'Farming is only for young travellers.',
					'Always hurry without thinking.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا عكس المغزى تماما.',
					'أحسنت! العبرة تؤكد استمرار نفع العمل الصالح للأجيال اللاحقة.',
					'مخالف لرسالة الحكاية.',
					'العجلة صفة مذمومة في القصة.'
				],
				explanationAr: 'العبرة المستخلصة هي أن العمل الصالح والغرس النافع يمتد أثره للأجيال القادمة.'
			},
			{
				questionAr: 'أي صفة مما يلي تصف المظهر الخارجي (Physical appearance) لا الطبع الداخلي؟',
				options: ['trustworthy', 'tall and grey-bearded', 'generous', 'patient'],
				correctIndex: 1,
				diagnosticFeedback: [
					'trustworthy صفة أخلاقية داخلية.',
					'إجابة صحيحة! الطول واللحية الشائبة من أوصاف المظهر الخارجي.',
					'generous صفة أخلاقية.',
					'patient صفة سلوكية داخلية.'
				],
				explanationAr: 'tall and grey-bearded تصف الشكل الظاهري للشخصية.'
			}
		]
	},

	// 4. Writing a Wholesome Narrative Paragraph
	{
		id: 'eng_lesson_1as_tcl_t2_narrative_paragraph',
		slug: 'eng-1as-tcl-t2-narrative-paragraph',
		grade: '1as_tcl',
		yearSubjectId: 666,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Once Upon a Time — الحكايات الهادفة وفن السرد',
		order: 4,
		titleAr: 'كتابة فقرة سردية لحكاية هادفة (Writing a Wholesome Narrative Paragraph)',
		objectives: [
			'بناء فقرة سردية متماسكة وفق مراحل الحكاية الأربع: البداية، العقدة، الحل، والعبرة',
			'استخدام الروابط السردية الزمنية (Once upon a time, One day, Suddenly, After that, Finally)',
			'توظيف الماضي البسيط والماضي المستمر وضمائر الوصل في قصة أخلاقية قصيرة'
		],
		keywordsAr: ['Narrative Paragraph', 'Orientation', 'Complication', 'Resolution', 'Story Connectors'],
		discover: {
			scenarioAr:
				'لكتابة حكاية قصيرة متقنة في فرض الفصل الثاني، تحتاج إلى خريطة واضحة من أربع خطوات: تبدأ بالزمان والمكان والشخصية (Orientation)، ثم تذكر المشكلة أو الاختبار الأخلاقي (Complication)، ثم كيف تصرفت الشخصية بحكمة وأمانة لحلها (Resolution)، وتختم بالعبرة (Moral).',
			svg: svgEnglishWritingStructure({
				title: 'Four-Stage Narrative Paragraph Blueprint',
				steps: [
					{ stage: '1. Orientation', detail: 'Once upon a time / Long ago + Setting + Main character' },
					{ stage: '2. Complication', detail: 'One day, while ... was ..., suddenly + unexpected test or problem' },
					{ stage: '3. Resolution', detail: 'Instead of being greedy/hasty, the character acted wisely and honestly' },
					{ stage: '4. Moral Lesson', detail: 'From that day on... / The story teaches us that...' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الجملة الافتتاحية المناسبة لبدء حكاية تراثية هادفة؟',
					hintAr: 'تذكر عبارات الزمان البعيد (Long ago / Once upon a time).',
					expectedInput: 'Long ago, in a quiet Algerian town, there lived a...',
					revealAr: 'نبدأ بـ "Long ago, in a quiet town in Constantine, there lived a humble bookseller who..."'
				},
				{
					promptAr: 'ما الروابط التي تنقل القارئ بسلاسة من الهدوء إلى الحدث المفاجئ (Complication)؟',
					hintAr: 'فكّر في One day و Suddenly و While.',
					expectedInput: 'One day, While ... was ..., suddenly ...',
					revealAr: 'نستخدم One day + جملة While (ماض مستمر) + Suddenly (ماض بسيط) لإدخال الحدث الرئيسي بحيوية.'
				},
				{
					promptAr: 'ما الأخطاء الزمنية التي يجب تجنبها عند كتابة فقرة سردية؟',
					hintAr: 'هل ننتقل فجأة للمضارع البسيط وسط سرد أحداث الماضي؟',
					expectedInput: 'يجب الحفاظ على أزمنة الماضي (Past Simple & Past Continuous) طوال السرد',
					revealAr:
						'نلتزم بالماضي البسيط والماضي المستمر طوال السرد، ولا نستخدم المضارع البسيط إلا في جملة العبرة العامة في النهاية (This tale teaches us that...).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المرحلة 1 (Orientation): قدّم الزمان والمكان والشخصية بصفتها (Long ago, in Tlemcen, there lived an honest carpenter who worked diligently).',
				'المرحلة 2 (Complication): قدّم الحدث المفاجئ باستعمال One day / While / Suddenly (One day, while he was repairing an old chest, he discovered a hidden bag of silver coins).',
				'المرحلة 3 (Resolution): اذكر الحل الأخلاقي بوضوح (Without hesitation, he returned the coins to the rightful owner, who was amazed by his honesty).',
				'المرحلة 4 (Moral): اختم بحكمة بليغة (The moral of the story is that honesty brings peace of heart and lasting respect).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Narrative Linking Words Toolkit',
				rootLabel: 'Connect Events Smoothly',
				branches: [
					{
						label: 'Opening',
						rule: 'Once upon a time / Long ago',
						example: 'Long ago, in a peaceful oasis...'
					},
					{
						label: 'Turning Point',
						rule: 'One day / While / Suddenly',
						example: 'Suddenly, a traveller arrived.'
					},
					{
						label: 'Ending & Moral',
						rule: 'Finally / From that day on',
						example: 'Finally, honesty was rewarded.'
					}
				]
			}),
			visualCaptionAr: 'حقيبة الروابط الزمنية السردية لكتابة فقرة قصصية متماسكة',
			examples: [
				{
					problemAr: 'وسّع الفكرة التالية إلى جملة عقدة (Complication) باستعمال While و Suddenly: (a poor woodcutter / walk by the river / find a lost purse).',
					solutionAr: 'One afternoon, while the poor woodcutter was walking by the river, he suddenly noticed a lost leather purse on the bank.'
				},
				{
					problemAr: 'اكتب جملة ختامية تعبّر عن العبرة لحكاية حول التعاون بين الجيران.',
					solutionAr: 'In the end, the villagers learned that unity and mutual help can overcome every hardship.'
				}
			],
			watchOutAr:
				'احرص على عدم الانتقال العشوائي بين الماضي والمضارع داخل القصة؛ استعمل الماضي لسرد الأحداث والمضارع فقط عند صياغة العبرة الخالدة في الجملة الأخيرة.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب الصحيح لمراحل الفقرة السردية الهادفة؟',
				options: [
					'Moral — Resolution — Complication — Orientation',
					'Orientation — Complication — Resolution — Moral',
					'Complication — Moral — Orientation — Resolution',
					'Resolution — Orientation — Moral — Complication'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الترتيب معكوس تماما.',
					'أحسنت! نبدأ بالتمهيد ثم المشكلة ثم الحل ثم العبرة.',
					'لا نذكر العبرة قبل التمهيد والحل.',
					'الحل لا يسبق التمهيد والعقدة.'
				],
				explanationAr: 'البنية القصصية السليمة: Orientation ثم Complication ثم Resolution وأخيرا Moral.'
			},
			{
				questionAr: 'أي جملة تمثل مرحلة التمهيد (Orientation) في حكاية قصيرة؟',
				options: [
					'Finally, the honest boy received the gratitude of the entire town.',
					'Long ago, in a quiet village in Kabylia, there lived a wise olive grower named Yusuf.',
					'Suddenly, a heavy storm broke the wooden bridge.',
					'This story reminds us that patience is a virtue.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذه مرحلة الحل والخاتمة.',
					'ممتاز! تحدد الزمان والمكان والشخصية الرئيسية.',
					'هذه مرحلة العقدة والمفاجأة.',
					'هذه جملة العبرة الأخلاقية.'
				],
				explanationAr: 'التمهيد (Orientation) يقدم الزمان والمكان والشخصية.'
			},
			{
				questionAr: 'أي جملة تحافظ على اتساق أزمنة السرد في الماضي؟',
				options: [
					'While the baker worked, a hungry child comes and asks for bread.',
					'While the baker was working, a hungry child arrived and asked for bread.',
					'While the baker is working, a hungry child arrived and will ask for bread.',
					'The baker working and a child ask for bread.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خلط خاطئ بين الماضي worked والمضارع comes/asks.',
					'صحيح! ماض مستمر (was working) مع ماض بسيط (arrived, asked).',
					'خلط بين المضارع والماضي والمستقبل.',
					'أفعال غير مصرفه بشكل صحيح.'
				],
				explanationAr: 'أحداث الحكاية تُسرد بانسجام تام في الماضي المستمر والماضي البسيط.'
			},
			{
				questionAr: 'أي رابط أنسب لبدء حدث مفاجئ يغيّر مجرى الحكاية؟',
				options: ['In conclusion,', 'Suddenly,', 'Firstly,', 'For example,'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تستعمل للخاتمة لا للعقدة.',
					'أحسنت! Suddenly تبرز نقطة التحول والمفاجأة في السرد.',
					'تستعمل للخطوات الإجرائية لا للتحول الدرامي.',
					'تستعمل لإعطاء مثال في نص تفسيري.'
				],
				explanationAr: 'الظرف Suddenly مثالي لإدخال العقدة أو الحدث غير المتوقع في السرد.'
			},
			{
				questionAr: 'في أي جزء من الحكاية يمكن استعمال المضارع البسيط بشكل صحيح؟',
				options: [
					'عند سرد الحدث المفاجئ',
					'عند صياغة العبرة العامة الخالدة في الجملة الأخيرة',
					'عند ذكر زمان القصة (Long ago)',
					'في وصف حركة الشخصيات أثناء الحدث'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحدث المفاجئ يكون في الماضي البسيط.',
					'إجابة دقيقة! الحكمة العامة حقيقة دائمة فتُكتب بالمضارع البسيط (teaches us / brings).',
					'Long ago تستوجب الماضي.',
					'الأحداث الجارية في القصة تكون في الماضي.'
				],
				explanationAr: 'العبرة الأخلاقية حقيقة عامة صالحة لكل زمان لذا تُصاغ غالبا بالمضارع البسيط.'
			}
		]
	}
];
