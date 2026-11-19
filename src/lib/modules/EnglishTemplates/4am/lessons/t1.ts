import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_4AM_T1: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. Comparative of Equality & Inferiority (as...as / not as...as)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t1_comparative_equality',
		slug: 'eng-4am-t1-comparative-equality',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، المعالم العالمية والشخصيات البارزة (Me, Universal Landmarks and Outstanding Figures)',
		order: 1,
		titleAr: 'المقارنة بالتساوي وعدم التساوي (as ... as / not as ... as)',
		objectives: [
			'استعمال (as + adjective + as) للتعبير عن التساوي بين معلمين أو شخصيتين في صفة مشتركة',
			'استعمال (not as + adjective + as) للتعبير عن عدم التساوي وتحويل جمل المقارنة في BEM بدقة'
		],
		keywordsAr: ['comparative of equality', 'as...as', 'not as...as', 'inferiority', 'landmarks'],
		discover: {
			scenarioAr:
				'قارن بين معلمين جزائريين عريقين: 1) "The Casbah of Algiers is as historic as Timgad." 2) "The Bridges of Constantine are not as old as Timgad." لاحظ أن الصفة بين (as ... as) بقيت بصيغتها الأصلية دون (-er) ودون (more)!',
			svg: svgEnglishGrammarMap({
				title: 'Comparative of Equality & Inferiority (BEM)',
				rootLabel: 'Comparing Two Landmarks or Figures',
				rootSub: 'Adjective stays in BASE FORM (never add -er or more!)',
				branches: [
					{ label: 'Equality (=)', rule: 'as + base adj + as', example: 'Tlemcen is as charming as Bejaia.', color: '#047857' },
					{ label: 'Inferiority (not =)', rule: 'not as + base adj + as', example: 'Tower A is not as tall as Djamaa El Djazair.', color: '#b45309' },
					{ label: 'BEM Rewrite Tip', rule: 'A is taller than B', example: 'B is not as tall as A.', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى "is as historic as"، هل أضفنا (more) أو (-er) إلى الصفة (historic)؟',
					hintAr: 'انظر إلى الكلمة الواقعة بين as و as.',
					expectedInput: 'لا، بقيت الصفة في صورتها الأصلية (historic)',
					revealAr: 'ممتاز! بين (as ... as) نضع دائماً الصفة الأصلية المجردة (base adjective) سواء كانت قصيرة أو طويلة.'
				},
				{
					promptAr: 'كيف عبّرنا عن عدم التساوي (Inferiority) في الجملة الثانية؟',
					hintAr: 'أضفنا كلمة النفي قبل as الأولى.',
					expectedInput: 'not as + adjective + as',
					revealAr: 'نستعمل (not as + base adjective + as)، مثل: Timgad is not as tall as Djamaa El Djazair.'
				},
				{
					promptAr: 'إذا كان (Djamaa El Djazair is taller than Maqam Echahid)، كيف نعيد كتابتها بـ (not as ... as)؟',
					hintAr: 'ابدأ بالمعلم الأصغر (Maqam Echahid) وضع الصفة الأصلية (tall).',
					expectedInput: 'Maqam Echahid is not as tall as Djamaa El Djazair.',
					revealAr: 'نقلب الطرفين ونحذف (-er / than) فنحصل على: Maqam Echahid is not as tall as Djamaa El Djazair.'
				}
			]
		},
		summary: {
			rulesAr: [
				'المقارنة بالتساوي (Equality): Subject 1 + verb + as + base adjective + as + Subject 2 — مثال: Beni Hammad Fort is as impressive as The Casbah of Algiers.',
				'المقارنة بعدم التساوي (Inferiority): Subject 1 + negative verb + not as + base adjective + as + Subject 2 — مثال: Timgad is not as modern as Djamaa El Djazair.',
				'تحويل BEM الشهير: إذا كانت الجملة (A is taller / more famous than B)، فإن التحويل المكافئ بـ (not as...as) هو: (B is not as tall / famous as A).',
				'قاعدة حاسمة: لا تُدخل أبداً (-er) ولا (more) ولا (than) داخل صيغة (as ... as).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'BEM Conversion Rule: than vs not as...as',
				steps: [
					{ stage: 'Given Sentence', detail: 'Djamaa El Djazair minaret is higher than other minarets.' },
					{ stage: 'Swap A and B', detail: 'Start with the second item (Other minarets).' },
					{ stage: 'Use not as...as', detail: 'Other minarets are not as high as Djamaa El Djazair minaret.' }
				]
			}),
			visualCaptionAr: 'طريقة التحويل السريعة بين صيغة التفوق وصيغة عدم التساوي في امتحان شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'أعد كتابة الجملة بـ (not as ... as): "The Great Mosque of Tlemcen is older than Djamaa El Djazair."',
					solutionAr: 'Djamaa El Djazair is not as old as The Great Mosque of Tlemcen.'
				},
				{
					problemAr: 'صحّح الخطأ: "Tassili n-Ajjer is as more ancient as Timgad."',
					solutionAr: 'Tassili n-Ajjer is as ancient as Timgad. (نحذف more).'
				}
			],
			watchOutAr:
				'في BEM انتبه لتطابق الفعل مع الفاعل الجديد بعد قلب الطرفين (is للمفرد / are للجمع)، وتذكّر حذف (-er) و (more) و (than) وإرجاع الصفة إلى أصلها!'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة للمقارنة بالتساوي:',
				options: [
					'The Casbah is as older as Timgad.',
					'The Casbah is as famous as The Great Mosque of Tlemcen.',
					'The Casbah is as more famous as Timgad.',
					'The Casbah is famous as Timgad.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضيف -er بين as ... as.',
					'ممتاز! as + base adjective (famous) + as.',
					'لا نضع more داخل صيغة as ... as.',
					'ينقصها as الأولى قبل الصفة.'
				],
				explanationAr: 'صيغة التساوي تتطلب: as + الصفة المجردة + as.'
			},
			{
				questionAr: 'أعد كتابة الجملة بـ (not as ... as): "The Sahara is larger than the Atlas region."',
				options: [
					'The Sahara is not as large as the Atlas region.',
					'The Atlas region is not as large as the Sahara.',
					'The Atlas region is not as larger as the Sahara.',
					'The Atlas region is not as large than the Sahara.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا يعكس الحقيقة الجغرافية في الجملة الأصلية.',
					'أحسنت! قلبنا الطرفين واستعملنا الصفة الأصلية (large).',
					'لا نكتب larger مع as ... as.',
					'نستعمل as الثانية وليس than.'
				],
				explanationAr: 'عند التحويل من (A is larger than B) نكتب: (B is not as large as A).'
			},
			{
				questionAr: 'أكمل الجملة: "Beni Hammad Fort is ...... famous ...... Timgad in Algerian history."',
				options: ['more / as', 'as / than', 'as / as', 'not / than'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نجمع بين more و as.',
					'لا نجمع بين as و than.',
					'صحيح! as + famous + as.',
					'لا توجد صيغة not ... than.'
				],
				explanationAr: 'صيغة التساوي هي (as ... as).'
			},
			{
				questionAr: 'ما الجملة المكافئة لـ: "Imam Ben Badis was as dedicated as Sheikh El Ibrahimi."',
				options: [
					'Imam Ben Badis was less dedicated than Sheikh El Ibrahimi.',
					'Both scholars shared the same level of dedication.',
					'Sheikh El Ibrahimi was not dedicated at all.',
					'Imam Ben Badis was more dedicated than Sheikh El Ibrahimi.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'as...as تعبّر عن التساوي لا النقصان.',
					'صحيح! as ... as تفيد تساوي الصفة بين الطرفين.',
					'كلاهما متساوٍ في الصفة الإيجابية.',
					'as...as تعني التساوي وليس التفوق.'
				],
				explanationAr: 'المقارنة بالتساوي (as...as) تدل على اشتراك الطرفين في نفس الدرجة من الصفة.'
			},
			{
				questionAr: 'صحّح الجملة: "The Bridges of Constantine is not as ancient than Tassili n-Ajjer."',
				options: [
					'The Bridges of Constantine are not as ancient as Tassili n-Ajjer.',
					'The Bridges of Constantine is not as ancient as Tassili n-Ajjer.',
					'The Bridges of Constantine are not as more ancient as Tassili n-Ajjer.',
					'The Bridges of Constantine are not ancient than Tassili n-Ajjer.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! صحّحنا الجمع (are) واستبدلنا than بـ as.',
					'Bridges جمع فتحتاج إلى are وليس is.',
					'لا نستعمل more داخل not as...as.',
					'تحتاج صيغة التساوي إلى as ... as.'
				],
				explanationAr: 'الفاعل جمع (Bridges) فيأخذ (are)، وصيغة عدم التساوي هي (not as + ancient + as).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Passive Voice in the Past Simple (was / were + Past Participle + by)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t1_passive_voice_past',
		slug: 'eng-4am-t1-passive-voice-past',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، المعالم العالمية والشخصيات البارزة (Me, Universal Landmarks and Outstanding Figures)',
		order: 2,
		titleAr: 'المبني للمجهول في الماضي البسيط (Passive Voice: was / were + P.P)',
		objectives: [
			'تحويل الجملة من المبني للمعلوم (Active) إلى المبني للمجهول في الماضي البسيط (Past Simple Passive)',
			'توظيف صيغ (was built by / was founded in / was written by) لوصف المعالم العالمية والشخصيات البارزة في BEM'
		],
		keywordsAr: ['Passive Voice', 'was/were + Past Participle', 'by', 'landmarks', 'BEM grammar'],
		discover: {
			scenarioAr:
				'تأمّل الجملتين عن معلم جزائري مشهور: Active: "Almoravid architects built The Great Mosque of Tlemcen in 1082." | Passive: "The Great Mosque of Tlemcen was built by Almoravid architects in 1082." كيف تغيّر موقع المفعول به وشكل الفعل؟',
			svg: svgEnglishTenseTimeline({
				title: 'Past Simple Passive Voice (BEM)',
				tenseName: 'was / were + Past Participle',
				formula: 'Object + was / were + Past Participle (V3) + by + Agent',
				activeZone: 'past',
				example: 'The Association of Algerian Muslim Scholars was founded by Imam Ben Badis in 1931.',
				markers: 'in 1082, in 1931, in the 11th century, centuries ago'
			}),
			steps: [
				{
					promptAr: 'ما الكلمة التي أصبحت في بداية جملة المبني للمجهول (Passive)؟',
					hintAr: 'هي المعلم الذي وقع عليه فعل البناء (المفعول به).',
					expectedInput: 'The Great Mosque of Tlemcen (المفعول به)',
					revealAr: 'في المبني للمجهول نبدأ دائماً بالمفعول به (Object) ليصبح هو الفاعل النحوي الجديد.'
				},
				{
					promptAr: 'لماذا استعملنا (was built) ولم نستعمل (were built)؟',
					hintAr: 'هل الجامع الكبير بتلمسان مفرد أم جمع؟',
					expectedInput: 'لأن المفعول به مفرد فيأخذ was + التصريف الثالث built',
					revealAr: 'مع المفرد نستعمل (was + P.P) ومع الجمع نستعمل (were + P.P)، مثل: The Bridges of Constantine were built...'
				},
				{
					promptAr: 'ما حرف الجر الذي يسبق الفاعل الحقيقي (Agent) في آخر الجملة المجهولة؟',
					hintAr: 'كلمة من حرفين تعني (من قِبل / بواسطة).',
					expectedInput: 'by',
					revealAr: 'نستعمل (by + Agent) عند ذكر صانع الفعل، مثل: Kassaman was written by Moufdi Zakaria.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الذهبية للمبني للمجهول في الماضي البسيط: Object + was (singular) / were (plural) + Past Participle (V3) + (by + Subject).',
				'خطوات التحويل الأربعة في BEM: 1) ضع المفعول به في البداية، 2) اختر was (للمفرد) أو were (للجمع)، 3) حوّل الفعل إلى التصريف الثالث (P.P)، 4) أضف (by + الفاعل الأصلي) إن لزم الأمر.',
				'أشهر التصاريف الثالثة (Past Participles) في BEM: build (built), write (written), found (founded), design (designed), construct (constructed), paint (painted), discover (discovered), classify (classified).',
				'أمثلة BEM نموذجية: Beni Hammad Fort was built in 1007. | The Muqaddimah was written by Ibn Khaldun. | Timgad and The Casbah were classified by UNESCO.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Active to Passive Transformation (Past Simple)',
				rootLabel: 'Imam Ben Badis founded the Association in 1931.',
				rootSub: 'Subject (Ben Badis) + Past Verb (founded) + Object (the Association)',
				branches: [
					{ label: '1. Move Object', rule: 'Object becomes subject', example: 'The Association...', color: '#1d4ed8' },
					{ label: '2. Add was/were + V3', rule: 'Singular: was + founded', example: '...was founded...', color: '#047857' },
					{ label: '3. Add by + Agent', rule: 'Keep time/place at end', example: '...by Imam Ben Badis in 1931.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'الخطوات الثلاث المضمونة لتحويل أي جملة في الماضي البسيط إلى المبني للمجهول في BEM',
			examples: [
				{
					problemAr: 'حوّل إلى المبني للمجهول (Passive): "Moufdi Zakaria wrote the Algerian national anthem Kassaman in 1955."',
					solutionAr: 'The Algerian national anthem Kassaman was written by Moufdi Zakaria in 1955.'
				},
				{
					problemAr: 'حوّل إلى المبني للمجهول: "UNESCO classified The Casbah of Algiers and Tassili n-Ajjer as World Heritage Sites."',
					solutionAr: 'The Casbah of Algiers and Tassili n-Ajjer were classified as World Heritage Sites by UNESCO. (لاحظ استعمال were لأن المعلمين جمع!).'
				}
			],
			watchOutAr:
				'أكبر فخ في BEM هو الفرق بين (find / found / found = وجد) و (found / founded / founded = أسّس)! مثلاً: Al-Qarawiyyin was founded (أُسّست) by Fatima al-Fihri — ولا تنسَ (were) إذا كان المفعول به جمعاً!'
		},
		practice: [
			{
				questionAr: 'حوّل إلى المبني للمجهول: "Ibn Khaldun wrote Al-Muqaddimah in 1377."',
				options: [
					'Al-Muqaddimah is written by Ibn Khaldun in 1377.',
					'Al-Muqaddimah was wrote by Ibn Khaldun in 1377.',
					'Al-Muqaddimah was written by Ibn Khaldun in 1377.',
					'Al-Muqaddimah were written by Ibn Khaldun in 1377.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'التاريخ في الماضي (1377) فيلزم was وليس is.',
					'نحتاج إلى التصريف الثالث (written) وليس الماضي البسيط (wrote).',
					'ممتاز! was + التصريف الثالث written + by Ibn Khaldun.',
					'Al-Muqaddimah كتاب مفرد فيأخذ was وليس were.'
				],
				explanationAr: 'في الماضي البسيط المجهول: مفرد + was + التصريف الثالث (written).'
			},
			{
				questionAr: 'أكمل الجملة بالصيغة الصحيحة: "The famous Bridges of Constantine ...... in the 19th and 20th centuries."',
				options: ['was built', 'were built', 'were build', 'are builded'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Bridges اسم جمع يحتاج إلى were.',
					'أحسنت! جمع + were + التصريف الثالث built.',
					'build ليس التصريف الثالث؛ التصريف الثالث هو built.',
					'الفعل build شاذ والتاريخ في الماضي.'
				],
				explanationAr: 'الفاعل جمع (The Bridges) والزمن ماضٍ، لذا نستعمل: were built.'
			},
			{
				questionAr: 'اختر الفعل الصحيح للتأسيس: "Al-Qarawiyyin University ...... by Fatima al-Fihri in 859 CE."',
				options: ['was find', 'was found', 'was founded', 'were founded'],
				correctIndex: 2,
				diagnosticFeedback: [
					'find هو أصل الفعل (يجد).',
					'was found تعني (وُجدت) وليس (أُسّست).',
					'صحيح! الفعل found (يؤسس) منتظم وتصريفه الثالث founded.',
					'الجامعة مفرد فتأخذ was.'
				],
				explanationAr: 'فعل التأسيس هو found وتصريفه الثالث founded: was founded by.'
			},
			{
				questionAr: 'اختر جملة المبني للمجهول الصحيحة لـ: "Hammad ibn Buluggin built Beni Hammad Fort in 1007."',
				options: [
					'Beni Hammad Fort was built by Hammad ibn Buluggin in 1007.',
					'Beni Hammad Fort built by Hammad ibn Buluggin in 1007.',
					'Hammad ibn Buluggin was built by Beni Hammad Fort in 1007.',
					'Beni Hammad Fort were built by Hammad ibn Buluggin in 1007.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تركيب كامل وسليم للمبني للمجهول في الماضي.',
					'ينقصها الفعل المساعد was قبل built.',
					'قلبت المعنى فأصبح القائد هو المبني!',
					'Beni Hammad Fort مفرد فيأخذ was.'
				],
				explanationAr: 'المفعول به (Beni Hammad Fort) مفرد + was + built + by + الفاعل.'
			},
			{
				questionAr: 'أكمل الجملة: "The Great Mosque of Algiers (Djamaa El Djazair) ...... in 2020."',
				options: ['was inaugurate', 'was inaugurated', 'were inaugurated', 'inaugurated'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نحتاج إلى التصريف الثالث بإضافة -d.',
					'صحيح! الجامع مفرد والزمن ماضٍ: was inaugurated.',
					'الفاعل مفرد فيأخذ was وليس were.',
					'الجامع لم يفتتح نفسه، بل افتُتح (مبني للمجهول).'
				],
				explanationAr: 'في المبني للمجهول للفعل المنتظم inaugurate نكتب: was inaugurated.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Discourse Markers of Cause & Effect (because, since, as a result, therefore)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t1_cause_effect_discourse',
		slug: 'eng-4am-t1-cause-effect-discourse',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، المعالم العالمية والشخصيات البارزة (Me, Universal Landmarks and Outstanding Figures)',
		order: 3,
		titleAr: 'أدوات السبب والنتيجة في نصوص BEM (because, since, as a result, therefore)',
		objectives: [
			'توظيف أدوات السبب (because, since, as) وأدوات النتيجة (so, therefore, as a result, consequently) في سياق المعالم والشخصيات',
			'التمييز بين (because + clause) و (because of + noun phrase) والالتزام بعلامات الترقيم الدقيقة'
		],
		keywordsAr: ['because', 'since', 'as', 'as a result', 'therefore', 'consequently'],
		discover: {
			scenarioAr:
				'اقرأ الجملتين عن العلامة محمد البشير الإبراهيمي: 1) "Since Sheikh Mohamed Bachir El Ibrahimi mastered Arabic eloquence, his articles inspired Algerian youth." 2) "The Casbah of Algiers has unique Ottoman-Islamic architecture; as a result, UNESCO listed it in 1992." قارن بين وظيفة (Since) ووظيفة (as a result)!',
			svg: svgEnglishGrammarMap({
				title: 'Discourse Markers of Cause & Effect (4AM BEM)',
				rootLabel: 'Logical Connectors in BEM Mastery of Language',
				rootSub: 'Never mix a Cause connector and an Effect connector in the same sentence',
				branches: [
					{ label: 'Cause (+ Clause)', rule: 'because / since / as + S + V', example: 'Since Timgad is historic, tourists visit it.', color: '#1d4ed8' },
					{ label: 'Cause (+ Noun)', rule: 'because of + Noun phrase', example: 'Famous because of its bridges.', color: '#7c3aed' },
					{ label: 'Effect (Result)', rule: 'so / therefore / as a result', example: 'He worked hard; therefore, he succeeded.', color: '#047857' }
				]
			}),
			steps: [
				{
					promptAr: 'هل تحمل كلمة (Since) في الجملة الأولى معنى الزمن أم معنى السبب (مثل because)؟',
					hintAr: 'جرّب تعويضها بـ Because في الجملة الأولى.',
					expectedInput: 'معنى السبب (لأن / بما أن)',
					revealAr: 'هنا (Since) و (As) تعنيان (لأن / بما أن) وتُستعملان مثل (because) في بداية الجملة أو وسطها للتعبير عن السبب.'
				},
				{
					promptAr: 'ما العبارة التي قدّمت النتيجة في الجملة الثانية؟ وما علامتا الترقيم اللتان تحيطان بها؟',
					hintAr: 'تتكون من ثلاث كلمات وتقع بعد الفاصلة المنقوطة.',
					expectedInput: 'as a result، وتسبقها فاصلة منقوطة وتليها فاصلة',
					revealAr: 'نكتب: (Cause; as a result, Effect.) أو (Cause. As a result, Effect.) تماماً مثل (therefore).'
				},
				{
					promptAr: 'ما الفرق بين (because) و (because of)؟',
					hintAr: 'إحداهما يتبعها فاعل وفعل، والأخرى يتبعها اسم فقط.',
					expectedInput: 'because يتبعها جملة كاملة، و because of يتبعها اسم',
					revealAr: 'نقول: Constantine is famous because it has high bridges (جملة) | Constantine is famous because of its high bridges (اسم).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات السبب (Cause + Subject + Verb): because / since / as. مثال: Imam Ben Badis is respected because he defended Algerian Islamic identity.',
				'أداة السبب المتبوعة باسم (Cause + Noun Phrase): because of. مثال: Timgad attracts visitors because of its well-preserved ruins.',
				'أدوات النتيجة (Effect): so (تسبقها فاصلة فقط)، و therefore / as a result / consequently (تسبقها نقطة أو فاصلة منقوطة وتليها فاصلة).',
				'القاعدة الذهبية في BEM: حدّد السبب (Cause) والنتيجة (Effect) أولاً، ثم استخدم أداة واحدة فقط في الجملة المركبة.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Punctuation Cheat-Sheet for BEM Connectors',
				steps: [
					{ stage: 'Middle because', detail: 'Effect + because / since / as + Cause. (No comma needed)' },
					{ stage: 'Initial Since/As', detail: 'Since / As + Cause, + Effect. (Comma in the middle)' },
					{ stage: 'Middle so', detail: 'Cause, + so + Effect. (Comma before so)' },
					{ stage: 'therefore / result', detail: 'Cause. Therefore, / As a result, + Effect. (Period + Comma)' }
				]
			}),
			visualCaptionAr: 'دليل علامات الترقيم الدقيقة لأدوات السبب والنتيجة في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'اربط الجملتين باستعمال (therefore): "Tassili n-Ajjer contains ancient rock art. Historians study it closely."',
					solutionAr: 'Tassili n-Ajjer contains ancient rock art; therefore, historians study it closely.'
				},
				{
					problemAr: 'اربط الجملتين باستعمال (Since): "Imam Ben Badis built many schools. Education spread across Algeria."',
					solutionAr: 'Since Imam Ben Badis built many schools, education spread across Algeria.'
				}
			],
			watchOutAr:
				'في BEM: احذر الخلط بين (Since للسبب) و (Since للمضارع التام)! إذا جاء بعدها فاعل وفعل (Since it was built in 1082, ...) فهي أداة سبب، وإذا جاء بعدها تاريخ فقط مع Present Perfect (since 1992) فهي ظرف زمني.'
		},
		practice: [
			{
				questionAr: 'اختر الرابط الصحيح: "The Great Mosque of Tlemcen is a jewel of architecture; ......, thousands of people visit it every year."',
				options: ['because', 'since', 'as a result', 'because of'],
				correctIndex: 2,
				diagnosticFeedback: [
					'because للسبب وليس للنتيجة.',
					'since للسبب.',
					'ممتاز! زيارة الآلاف هي النتيجة، وتناسبها عبارة as a result.',
					'because of يتبعها اسم للسبب.'
				],
				explanationAr: 'الجملة الثانية نتيجة للجمال المعماري، فنستعمل as a result.'
			},
			{
				questionAr: 'أكمل الجملة: "...... Ibn Khaldun analysed societies scientifically, he is called the founder of sociology."',
				options: ['Therefore', 'So', 'Since', 'As a result'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Therefore لا تُفتتح بها جملة السبب.',
					'So لا تأتي في بداية الجملة لتقديم السبب.',
					'أحسنت! Since تأتي في البداية لتقديم السبب وتفصل بفاصلة عن النتيجة.',
					'As a result للنتيجة لا للسبب.'
				],
				explanationAr: 'الجزء الأول هو السبب، فنبدأه بـ Since متبوعة بفاصلة قبل النتيجة.'
			},
			{
				questionAr: 'اختر الصيغة الصحيحة: "Constantine is called the City of Bridges ...... its breathtaking canyons and bridges."',
				options: ['because', 'because of', 'so', 'therefore'],
				correctIndex: 1,
				diagnosticFeedback: [
					'because تتطلب جملة فيها فاعل وفعل.',
					'صحيح! (its breathtaking canyons and bridges) عبارة اسمية فتأخذ because of.',
					'so للنتيجة.',
					'therefore للنتيجة.'
				],
				explanationAr: 'نستعمل because of قبل العبارة الاسمية (Noun phrase).'
			},
			{
				questionAr: 'اختر الجملة الخالية من الأخطاء:',
				options: [
					'Because Beni Hammad Fort is ancient, therefore tourists admire it.',
					'Beni Hammad Fort is ancient; therefore, tourists admire it.',
					'Tourists admire Beni Hammad Fort; therefore, it is ancient.',
					'Beni Hammad Fort is ancient because tourists admire it.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نجمع بين because و therefore في نفس الجملة.',
					'ممتاز! سبب واضح ثم أداة نتيجة بعلامات ترقيم سليمة.',
					'عكست الجملة السبب والنتيجة منطقياً.',
					'إعجاب السياح هو النتيجة وليس سبب قدم القلعة.'
				],
				explanationAr: 'استعمال أداة واحدة صحيحة مع الترتيب المنطقي (السبب ثم النتيجة).'
			},
			{
				questionAr: 'ما المعنى الذي تفيده كلمة (as) في الجملة: "As he travelled widely, Ibn Battuta wrote a rich travel book."؟',
				options: ['التساوي', 'السبب (مثل because)', 'النتيجة (مثل so)', 'الشرط (مثل if)'],
				correctIndex: 1,
				diagnosticFeedback: [
					'التساوي يتطلب صيغة as + adj + as.',
					'صحيح! As في بداية الجملة قبل فاعل وفعل تعني السبب.',
					'النتيجة تُعبّر عنها بـ so أو therefore.',
					'الشرط يُعبّر عنه بـ if.'
				],
				explanationAr: 'As هنا أداة سبب تعادل because و since.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. Chronology Sequencers & Describing Algerian Landmarks / Figures
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t1_chronology_itinerary',
		slug: 'eng-4am-t1-chronology-itinerary',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، المعالم العالمية والشخصيات البارزة (Me, Universal Landmarks and Outstanding Figures)',
		order: 4,
		titleAr: 'أدوات الترتيب الزمني (Chronology Sequencers) ووصف مسار رحلة أو معلم',
		objectives: [
			'استعمال أدوات الترتيب الزمني (First, Next, Then, After that, Finally) لتنظيم مسار رحلة أو سيرة شخصية بارزة',
			'بناء فقرة BEM متكاملة تصف معالم جزائرية (القصبة، الجامع الكبير بتلمسان، جسور قسنطينة، تيمقاد)'
		],
		keywordsAr: ['First', 'Next', 'Then', 'After that', 'Finally', 'itinerary', 'landmarks'],
		discover: {
			scenarioAr:
				'اقرأ خطة رحلة مدرسية إلى معالم الجزائر: "First, our school bus will depart from Algiers to visit The Casbah and Djamaa El Djazair. Next, we will travel east to admire the Bridges of Constantine. After that, we will explore ancient Timgad in Batna. Finally, we will return home with unforgettable memories." ما دور الكلمات في بداية كل جملة؟',
			svg: svgEnglishWritingStructure({
				title: 'Chronology Sequencers for Travel Itineraries (4AM)',
				steps: [
					{ stage: '1. First,', detail: 'Start the journey or first milestone (e.g. Casbah of Algiers).' },
					{ stage: '2. Next, / Then,', detail: 'Move to the second stop (e.g. Bridges of Constantine).' },
					{ stage: '3. After that,', detail: 'Add the third destination or event (e.g. Timgad, Batna).' },
					{ stage: '4. Finally,', detail: 'Conclude the trip or life achievement cleanly.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الوظيفة النصية للكلمات (First, Next, After that, Finally)؟',
					hintAr: 'هل ترتب الأحداث زمنياً أم تعبّر عن السبب؟',
					expectedInput: 'ترتيب المراحل والأحداث زمنياً بتسلسل منطقي',
					revealAr: 'تُسمّى أدوات الترتيب الزمني (Chronology Sequencers)، وتجعل الفقرة متماسكة (Coherent) ومنظمة.'
				},
				{
					promptAr: 'ما علامة الترقيم التي نضعها مباشرة بعد (First / Next / After that / Finally) في أول الجملة؟',
					hintAr: 'علامة توقف قصيرة.',
					expectedInput: 'الفاصلة (Comma)',
					revealAr: 'نضع دائماً فاصلة بعد أداة الترتيب في بداية الجملة (First, ... / Finally, ...).'
				},
				{
					promptAr: 'ما الزمن الأنسب عند وصف خطة رحلة مستقبلية، وما الزمن الأنسب عند سرد رحلة قمتَ بها في الماضي؟',
					hintAr: 'خطة قادمة = المستقبل (will)، ورحلة منتهية = الماضي البسيط (Past Simple).',
					expectedInput: 'المستقبل (will) للخطة، والماضي البسيط للرحلة السابقة',
					revealAr: 'لخطة رحلة قادمة نستعمل (will + stem)، ولسرد رحلة انتهت أو سيرة شخصية نستعمل (Past Simple + Past Passive).'
				}
			]
		},
		summary: {
			rulesAr: [
				'أدوات الترتيب الزمني الأساسية: First (أولاً)، Second / Next / Then (ثانياً / بعد ذلك)، After that (عقب ذلك)، Finally / Lastly (أخيراً).',
				'قاعدة الترقيم: نكتب أداة الترتيب بحرف كبير في أول الجملة متبوعة بفاصلة: First, we visited The Great Mosque of Tlemcen.',
				'مفردات وصف المعالم (Landmarks Fact File): located in (يقع في)، was built in / by (بُني في/بواسطة)، height (الارتفاع)، famous for (مشهور بـ)، World Heritage Site (موقع تراث عالمي).',
				'معالم جزائرية معتمدة للوضعية الإدماجية في BEM: The Casbah of Algiers، The Great Mosque of Tlemcen، Djamaa El Djazair، The Bridges of Constantine، Timgad (Batna)، Beni Hammad Fort (M-Sila)، M-Zab Valley (Ghardaia)، Tassili n-Ajjer.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Describing an Algerian Landmark (Fact File)',
				rootLabel: 'Essential Details for a 6/6 BEM Paragraph',
				rootSub: 'Combine Passive Voice + as...as + Chronology Sequencers',
				branches: [
					{ label: 'Location', rule: 'is located in...', example: 'Tlemcen, western Algeria', color: '#1d4ed8' },
					{ label: 'History (Passive)', rule: 'was built in / by...', example: 'was built in 1082', color: '#047857' },
					{ label: 'Significance', rule: 'is famous for / as...as', example: 'as historic as The Casbah', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'عناصر بطاقة المعلم الجزائري التي يوظّفها تلميذ 4AM في الوضعية الإدماجية',
			examples: [
				{
					problemAr: 'رتّب الجمل الثلاث بـ (First / Then / Finally) عن رحلة إلى الغرب الجزائري: visit The Great Mosque of Tlemcen / depart from Algiers / explore M-Zab Valley.',
					solutionAr: 'First, we will depart from Algiers. Then, we will visit The Great Mosque of Tlemcen. Finally, we will explore M-Zab Valley in Ghardaia.'
				},
				{
					problemAr: 'صف معلماً في جملتين باستعمال (located in) و (was built): Beni Hammad Fort / M-Sila / 1007.',
					solutionAr: 'Beni Hammad Fort is located in M-Sila, Algeria. It was built in 1007 and classified as a World Heritage Site.'
				}
			],
			watchOutAr:
				'في الوضعية الإدماجية للـ BEM لا تكتب جملاً مبعثرة على شكل مطّات! اربط أفكارك بأدوات الترتيب الزمني (First, Next, Then, Finally) وبأدوات السبب والنتيجة (because, therefore) لتحصل على علامة التماسك الكاملة.'
		},
		practice: [
			{
				questionAr: 'ما الترتيب الصحيح لأدوات التسلسل الزمني في فقرة وصف رحلة؟',
				options: [
					'Finally - First - Then - Next',
					'First - Next - After that - Finally',
					'Then - Finally - First - After that',
					'After that - First - Finally - Next'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'Finally تأتي في نهاية الفقرة لا في بدايتها.',
					'ممتاز! First في البداية ثم Next و After that وفي الختام Finally.',
					'لا نبدأ بـ Then قبل First.',
					'يجب البدء بـ First والختم بـ Finally.'
				],
				explanationAr: 'التسلسل المنطقي هو: First، ثم Next / Then، ثم After that، ثم Finally.'
			},
			{
				questionAr: 'أكمل الجملة بعبارة الموقع الصحيحة: "Beni Hammad Fort ...... in the province of M-Sila."',
				options: ['is locate', 'is located', 'was locate', 'are located'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تحتاج الصيغة إلى التصريف الثالث located.',
					'صحيح! (is located in) هي العبارة الدقيقة لتحديد موقع معلم مفرد.',
					'locate بدون -d خاطئة.',
					'Beni Hammad Fort مفرد فيأخذ is.'
				],
				explanationAr: 'لتحديد الموقع الجغرافي نستعمل: is located in (للمفرد) / are located in (للجمع).'
			},
			{
				questionAr: 'اختر الجملة المضبوطة بعلامات الترقيم الصحيحة:',
				options: [
					'First we visited The Casbah, then, we went to Djamaa El Djazair.',
					'First, we visited The Casbah. Then, we went to Djamaa El Djazair.',
					'First. we visited The Casbah. Finally we returned.',
					'first, we visited The Casbah.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها فاصلة بعد First ونقطة قبل Then.',
					'ممتاز! حرف كبير في بداية الجملة وفاصلة مباشرة بعد First و Then.',
					'لا نضع نقطة مباشرة بعد First بل فاصلة.',
					'يجب بدء الجملة بحرف كبير (First).'
				],
				explanationAr: 'أدوات الترتيب في بداية الجملة تبدأ بحرف كبير وتُتبع بفاصلة.'
			},
			{
				questionAr: 'في أي ولاية جزائرية يقع معلم تيمقاد الأثري (Timgad)؟',
				options: ['Tlemcen', 'Batna', 'Oran', 'Bejaia'],
				correctIndex: 1,
				diagnosticFeedback: [
					'تلمسان تشتهر بالجامع الكبير والمنصورة.',
					'صحيح! تيمقاد تقع في ولاية باتنة شرق الجزائر.',
					'وهران في الغرب الجزائري.',
					'بجاية ساحلية في الوسط الشرقي.'
				],
				explanationAr: 'تيمقاد (Timgad) معلم أثري عالمي يقع في ولاية باتنة.'
			},
			{
				questionAr: 'أي جملة تجمع بين أداة ترتيب زمني والمبني للمجهول في الماضي؟',
				options: [
					'First, we visit Tlemcen Mosque which is built tomorrow.',
					'Next, we explored The Great Mosque of Tlemcen, which was built in 1082.',
					'Finally, they build the fort in 1007.',
					'Then, he is going to was built the bridge.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا يجتمع was/is built مع tomorrow بهذه الصيغة.',
					'ممتاز! Next للترتيب الزمني + was built للمبني للمجهول في الماضي.',
					'1007 تاريخ ماضٍ ويتطلب الماضي المبني للمجهول.',
					'تركيب غير صحيح نحوياً.'
				],
				explanationAr: 'وظّفت الجملة الثانية أداة الترتيب (Next,) مع المبني للمجهول في الماضي (was built in 1082).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. Diphthongs, Consonant Clusters & Final -ed (/t/, /d/, /id/)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t1_diphthongs_clusters_ed',
		slug: 'eng-4am-t1-diphthongs-clusters-ed',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'المقطع الأول: أنا، المعالم العالمية والشخصيات البارزة (Me, Universal Landmarks and Outstanding Figures)',
		order: 5,
		titleAr: 'الأصوات المزدوجة (Diphthongs) وتتابع السواكن ونطق -ed في BEM',
		objectives: [
			'تمييز أشهر الأصوات المزدوجة (Diphthongs) عبر أنماطها الإملائية الواضحة في كلمات BEM (مثل day / time / go / now)',
			'إتقان تحديد تتابع السواكن (Consonant Clusters) وتصنيف النهاية (-ed) بدقة مضمونة في شهادة التعليم المتوسط'
		],
		keywordsAr: ['diphthongs', 'consonant clusters', 'final -ed', '/t/', '/d/', '/id/', 'BEM phonology'],
		discover: {
			scenarioAr:
				'انطق المجموعات الأربع الآتية في كلمات من المقطع الأول: 1) (name, great, day) 2) (time, site, high) 3) (old, stone, road) 4) (town, south, tower). في كل مجموعة نسمع صوت علة مزدوجاً (Diphthong) يتكوّن من انزلاق صوتي واضح!',
			svg: svgEnglishPhoneticsChart({
				title: 'Key BEM Diphthongs (Clear Spelling Patterns)',
				subtitle: 'Listen to the gliding vowel sound inside each group',
				columns: [
					{ sound: '/ei/ (day)', rule: 'a-e, ai, ay, ea(great)', examples: 'name, place, say, great', color: '#1d4ed8' },
					{ sound: '/ai/ (time)', rule: 'i-e, igh, y(my), ie', examples: 'site, high, height, sky', color: '#047857' },
					{ sound: '/au/ vs /ou/', rule: 'ou/ow (town) | o-e/oa (road)', examples: 'south, tower | stone, old', color: '#b45309' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الصوت المزدوج المشترك بين الكلمات: (place, famous, day, great)؟',
					hintAr: 'مثل صوت حرف A في الأبجدية الإنجليزية.',
					expectedInput: '/ei/ (مثل day / name)',
					revealAr: 'كلها تشترك في الصوت المزدوج /ei/ (مثل day, name, place, famous, great).'
				},
				{
					promptAr: 'ما الصوت المزدوج المشترك بين الكلمات: (site, high, write, life)؟',
					hintAr: 'مثل صوت الضمير I في الإنجليزية.',
					expectedInput: '/ai/ (مثل time / high)',
					revealAr: 'كلها تشترك في الصوت المزدوج /ai/ (مثل site, high, write, life, guide).'
				},
				{
					promptAr: 'ماذا نسمي تتابع حرفين ساكنين أو أكثر دون علة بينهما كما في (bridge: br) و (land: nd)؟',
					hintAr: 'يُسمّى بالانجليزية Consonant Cluster.',
					expectedInput: 'Consonant Cluster (تتابع السواكن)',
					revealAr: 'يُسمّى تتابع السواكن (Consonant Cluster): في البداية (Initial: br-, st-, tr-, pl-) أو في النهاية (Final: -nd, -st, -lt, -nt).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأصوات المزدوجة الأربعة الأهم في BEM: /ei/ (day, name, place, famous)، /ai/ (time, site, high, guide)، /ou/ (old, stone, dome, road)، /au/ (south, town, tower, found).',
				'تتابع السواكن (Consonant Clusters): التقاء صوتين ساكنين أو أكثر في نفس المقطع دون حرف علة فاصل: في البداية (bridge, stone, travel, strong) أو في النهاية (built, landmark, ancient, east).',
				'مراجعة سريعة للنهاية (-ed) في BEM: /id/ بعد (/t/, /d/) مثل (founded, constructed, visited)؛ /t/ بعد (p, k, f, s, sh, ch, x) مثل (classified? لا! انتبه: classify تنتهي بصوت علة /ai/ فتُنطق classified بـ /d/، أما watched و worked فتُنطق /t/)؛ و /d/ بعد بقية الأصوات المجهورة وحروف العلة (designed, discovered, travelled, classified).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Final -ed Mastery Check for BEM',
				subtitle: 'Always check the LAST SPOKEN SOUND before -ed',
				columns: [
					{ sound: '/t/', rule: 'p, k, f, s, sh, ch, x', examples: 'worked, built(no!), watched, finished', color: '#1d4ed8' },
					{ sound: '/d/', rule: 'vowels & b,g,l,m,n,r,v,z', examples: 'designed, classified, named', color: '#047857' },
					{ sound: '/id/', rule: 'ONLY /t/ and /d/', examples: 'founded, constructed, visited', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'قاعدة النهاية -ed مع التنبيه إلى الكلمات الخادعة في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'استخرج الكلمة الدخيلة (Odd one out) في النطق: (name - place - day - site).',
					solutionAr: 'الكلمة الدخيلة هي (site) لأنها تنطق بصوت /ai/، بينما (name, place, day) تنطق كلها بصوت /ei/.'
				},
				{
					problemAr: 'صنّف في جدول (-ed): (constructed - designed - worked - visited - classified - helped).',
					solutionAr: '/t/: worked, helped | /d/: designed, classified | /id/: constructed, visited.'
				}
			],
			watchOutAr:
				'احذر كلمة (classified) في BEM! تنتهي قبل (-ed) بالصوت المجهور /ai/ (من classify)، لذا نضعها في عمود /d/ وليس /id/. ولا تخلط بين (great = /ei/) و (east = /i:/ الطويلة).'
		},
		practice: [
			{
				questionAr: 'اختر الكلمة الدخيلة (Odd one out) حسب الصوت المزدوج (Diphthong):',
				options: ['name', 'famous', 'place', 'high'],
				correctIndex: 3,
				diagnosticFeedback: [
					'name فيها صوت /ei/.',
					'famous فيها صوت /ei/.',
					'place فيها صوت /ei/.',
					'أحسنت! high فيها صوت /ai/ بينما البقية /ei/.'
				],
				explanationAr: 'name, famous, place تشترك في /ei/ أما high فصوتها /ai/.'
			},
			{
				questionAr: 'أي كلمة تشترك مع كلمة (tower) في الصوت المزدوج /au/؟',
				options: ['stone', 'south', 'road', 'dome'],
				correctIndex: 1,
				diagnosticFeedback: [
					'stone فيها صوت /ou/.',
					'ممتاز! tower و south و town تشترك في الصوت /au/.',
					'road فيها صوت /ou/.',
					'dome فيها صوت /ou/.'
				],
				explanationAr: 'south و tower تشتركان في الصوت المزدوج /au/.'
			},
			{
				questionAr: 'في أي عمود نصنّف الفعل (constructed)؟',
				options: ['/t/', '/d/', '/id/', '/s/'],
				correctIndex: 2,
				diagnosticFeedback: [
					'construct ينتهي بصوت /t/ فيأخذ /id/.',
					'ليس /d/ لأن آخر صوت هو /t/.',
					'صحيح! بعد /t/ أو /d/ تُنطق النهاية /id/.',
					'/s/ خاص بنهاية الجمع لا الماضي.'
				],
				explanationAr: 'أصل الفعل construct ينتهي بصوت /t/، لذا تُنطق النهاية /id/.'
			},
			{
				questionAr: 'في أي عمود نصنّف الفعل (classified)؟',
				options: ['/t/', '/d/', '/id/', '/iz/'],
				correctIndex: 1,
				diagnosticFeedback: [
					'classify لا ينتهي بصوت مهموس.',
					'ممتاز! أصل الفعل classify ينتهي بصوت علة مجهور /ai/ فتُنطق /d/.',
					'لا ينتهي بـ /t/ أو /d/ قبل الإضافة.',
					'/iz/ خاص بنهاية -s.'
				],
				explanationAr: 'جميع الأفعال المنتهية بحرف علة منطوق (مثل studied, classified, stayed) تأخذ /d/.'
			},
			{
				questionAr: 'أي كلمة تبدأ بتتابع ساكنين (Initial Consonant Cluster)؟',
				options: ['ancient', 'bridge', 'east', 'old'],
				correctIndex: 1,
				diagnosticFeedback: [
					'ancient تبدأ بحرف علة a.',
					'صحيح! bridge تبدأ بتتابع الساكنين (br-).',
					'east تبدأ بعلة (ea) والتتابع (-st) في نهايتها.',
					'old تبدأ بعلة o والتتابع (-ld) في نهايتها.'
				],
				explanationAr: 'bridge تبدأ بالتتابع الساكن الأولي (br-).'
			}
		]
	}
];
