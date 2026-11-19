import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishWordFormation,
	svgEnglishWritingStructure
} from '../../svg-english';

// ============================================================================
// 4 Concise Interactive Lessons — 1AS TCST Trimester 3 (Unit 4: Eureka!)
// ============================================================================

export const LESSONS_1AS_TCST_T3: EnglishInteractiveLessonData[] = [
	// 1. Expressing Concession (although, however, despite)
	{
		id: 'eng_lesson_1as_tcst_t3_concession',
		slug: 'eng-1as-tcst-t3-concession',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Eureka! — العلوم والابتكارات وإنجازات العلماء المسلمين',
		order: 1,
		titleAr: 'التعبير عن الاستدراك والتقابل (Expressing Concession: although, however, despite)',
		objectives: [
			'التمييز بين أدوات الاستدراك التي تتبعها جملة كاملة (although, even though, however)',
			'استعمال الأدوات التي يتبعها اسم أو مصدر (despite, in spite of)',
			'ربط أفكار متقابلة حول فوائد التكنولوجيا وتحدياتها بدقة'
		],
		keywordsAr: ['Concession', 'Although', 'Even though', 'However', 'Despite', 'In spite of'],
		discover: {
			scenarioAr:
				'في عرض علمي حول إنجازات العلماء المسلمين، قرأ التلاميذ جملتين: "Although ancient tools were simple, Ibn al-Haytham conducted accurate optical experiments." و "Despite the lack of modern computers, Al-Khwarizmi founded algebra." لاحظ الفرق بين ما جاء بعد Although وما جاء بعد Despite.',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Concession (Contrast)',
				rootLabel: 'Two Contrasting Ideas',
				rootSub: 'Check what follows the connector!',
				branches: [
					{
						label: 'Clause Connectors',
						rule: 'Although / Even though + S + V',
						example: 'Although it was hard, he succeeded.'
					},
					{
						label: 'Phrase Connectors',
						rule: 'Despite / In spite of + Noun / V-ing',
						example: 'Despite the difficulty, he succeeded.'
					},
					{
						label: 'Sentence Linker',
						rule: 'Sentence 1. However, Sentence 2.',
						example: 'It saves time. However, it costs a lot.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما البنية النحوية التي جاءت بعد Although في جملة ابن الهيثم؟',
					hintAr: 'انظر إلى: ancient tools (فاعل) + were (فعل).',
					expectedInput: 'جملة كاملة تتكون من فاعل وفعل (Subject + Verb)',
					revealAr: 'بعد although و even though و though نضع دائما جملة كاملة (فاعل + فعل).'
				},
				{
					promptAr: 'ما الذي جاء بعد Despite في جملة الخوارزمي؟',
					hintAr: 'هل يوجد فعل مصرف في "the lack of modern computers"؟',
					expectedInput: 'مركب اسمي (Noun phrase) أو فعل بـ ing',
					revealAr:
						'بعد despite و in spite of نضع اسما أو مركبا اسميا أو فعلا بصيغة Verb-ing، ولا نضع جملة كاملة مباشرة (إلا بإضافة the fact that).'
				},
				{
					promptAr: 'كيف نضع علامات الترقيم مع أداة الربط However؟',
					hintAr: 'تأتي However عادة في بداية الجملة الثانية.',
					expectedInput: 'نقطة أو فاصلة منقوطة قبلها وفاصلة بعدها',
					revealAr: 'نكتب: Sentence 1. However, Sentence 2. (تُتبع However دائما بفاصلة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'Although / Even though + Subject + Verb: تعبر عن التقابل وتتبعها جملة تامة. مثال: Although solar panels are expensive, they reduce bills.',
				'However (لكن / ومع ذلك): تربط جملتين مستقلتين وتأتي متبوعة بفاصلة: Technology is helpful. However, overuse harms health.',
				'Despite / In spite of + Noun / Noun Phrase / Verb-ing: لا يأتي بعدها فاعل وفعل مباشرة. مثال: Despite being old, the astrolabe was very precise.',
				'انتبه: كلمة despite لا تأخذ حرف الجر of أبدا (خطأ: despite of)، بينما in spite تأخذ of دائما (in spite of).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting Although as Despite',
				rootLabel: 'Converting Clause to Noun Phrase',
				branches: [
					{
						label: 'Original (Although)',
						rule: 'Although the machine was heavy,',
						example: 'Subject + be + Adjective'
					},
					{
						label: 'With Noun',
						rule: 'Despite the heaviness of the machine,',
						example: 'Despite + Noun Phrase'
					},
					{
						label: 'With V-ing',
						rule: 'Despite being heavy,',
						example: 'Despite + being + Adjective'
					}
				]
			}),
			visualCaptionAr: 'طريقتان سهلتان لتحويل جملة Although إلى Despite',
			examples: [
				{
					problemAr: 'اربط الجملتين باستعمال Although: "Smartphones make research easy. They can distract students."',
					solutionAr: 'Although smartphones make research easy, they can distract students.'
				},
				{
					problemAr: 'أعد كتابة الجملة باستعمال Despite: "Although the experiment was complex, the team completed it."',
					solutionAr: 'Despite the complexity of the experiment (OR Despite being complex), the team completed it.'
				}
			],
			watchOutAr:
				'احذر من خطأين متكررين في الامتحان: الجمع بين Although و but في جملة واحدة (خطأ: Although it is useful, but it is expensive)، وكتابة "despite of" (الصحيح despite وحدها أو in spite of).'
		},
		practice: [
			{
				questionAr: 'أكمل الجملة: ".......... the heavy rain, the science exhibition welcomed many visitors."',
				options: ['Although', 'Despite', 'However', 'Even though'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Although تحتاج فاعلا وفعلا بعدها.',
					'أحسنت! "the heavy rain" مركب اسمي يناسبه Despite.',
					'However تربط جملتين تامتين وتأتي بعدها فاصلة.',
					'Even though تحتاج جملة كاملة.'
				],
				explanationAr: 'لعدم وجود فعل مصرف بعد الفراغ نختار حرف الجر Despite.'
			},
			{
				questionAr: 'اختر الجملة السليمة نحويا:',
				options: [
					'Although Al-Jazari lived centuries ago, but his machines inspire engineers today.',
					'Although Al-Jazari lived centuries ago, his machines inspire engineers today.',
					'Despite Al-Jazari lived centuries ago, his machines inspire engineers today.',
					'Despite of living centuries ago, Al-Jazari inspires engineers.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نجمع بين Although و but في نفس الجملة.',
					'ممتاز! جملة كاملة بعد Although ثم فاصلة ثم الجملة الرئيسية.',
					'Despite لا تتبعها جملة كاملة مباشرة.',
					'لا نكتب of بعد despite.'
				],
				explanationAr: 'نستخدم Although + Subject + Verb ثم فاصلة بدون but.'
			},
			{
				questionAr: 'أكمل الفراغ: "The new microscope is accurate. .........., it requires careful maintenance."',
				options: ['Despite', 'In spite of', 'However', 'Although'],
				correctIndex: 2,
				diagnosticFeedback: [
					'Despite تحتاج اسما بعدها دون فاصلة مباشرة.',
					'In spite of تحتاج اسما أو ing.',
					'صحيح! However تأتي بعد نقطة ومتبوعة بفاصلة لبدء فكرة مقابلة.',
					'Although لا تتبعها فاصلة مباشرة.'
				],
				explanationAr: 'However ظرف ربط يأتي بين جملتين متبوعا بفاصلة.'
			},
			{
				questionAr: 'اختر الصيغة الصحيحة بعد In spite of: "In spite of .......... limited equipment, the scholar made a great discovery."',
				options: ['have', 'had', 'having', 'has'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد حرف الجر of لا نضع الفعل المجرد.',
					'الماضي لا يصلح بعد of.',
					'أحسنت! بعد in spite of نضع الفعل بصيغة Verb-ing (having).',
					'المضارع بـ s لا يصلح بعد حرف الجر.'
				],
				explanationAr: 'حروف الجر مثل in spite of و despite يتبعها اسم أو Verb-ing.'
			},
			{
				questionAr: 'أي خيار يحوّل الجملة التالية بدقة إلى Despite: "Although he was tired, he finished the laboratory report."؟',
				options: [
					'Despite he was tired, he finished the laboratory report.',
					'Despite of being tired, he finished the laboratory report.',
					'Despite being tired, he finished the laboratory report.',
					'Despite was tired, he finished the laboratory report.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا نضع فاعلا وفعلا مصرفا بعد Despite.',
					'despite لا تأخذ of.',
					'إجابة موفقة! حوّلنا was إلى being بعد Despite.',
					'was فعل مصرف ولا يصلح بعد Despite.'
				],
				explanationAr: 'عند تطابق الفاعل في الجملتين نحوّل (S + be + adj) إلى (Despite + being + adj).'
			}
		]
	},

	// 2. Passive Voice in Scientific Descriptions
	{
		id: 'eng_lesson_1as_tcst_t3_passive_voice',
		slug: 'eng-1as-tcst-t3-passive-voice',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Eureka! — العلوم والابتكارات وإنجازات العلماء المسلمين',
		order: 2,
		titleAr: 'المبني للمجهول في النصوص العلمية (Passive Voice in Scientific Descriptions)',
		objectives: [
			'تحويل الجملة من المبني للمعلوم إلى المبني للمجهول في المضارع البسيط والماضي البسيط ومع الأفعال الناقصة',
			'فهم سبب شيوع المبني للمجهول في وصف الاختراعات والتجارب العلمية (التركيز على الفعل والمنتج)',
			'استعمال by لتحديد المخترع أو العالم عند الحاجة'
		],
		keywordsAr: ['Passive Voice', 'Past Participle', 'was invented by', 'is used to', 'Modals Passive'],
		discover: {
			scenarioAr:
				'في النصوص العلمية نركز على الاختراع أو التجربة أكثر من الشخص. قارن الجملتين: "Al-Jazari designed the water clock in 1206." (معلوم) و "The water clock was designed by Al-Jazari in 1206." (مجهول). و"Solar panels convert sunlight into electricity." تصبح "Sunlight is converted into electricity by solar panels."',
			svg: svgEnglishGrammarMap({
				title: 'Passive Voice Formulas in Science Texts',
				rootLabel: 'Object becomes Subject + be (in tense) + Past Participle',
				rootSub: 'Add "by + agent" only when important',
				branches: [
					{
						label: 'Present Simple',
						rule: 'am / is / are + P.P.',
						example: 'Glass is made from sand.'
					},
					{
						label: 'Past Simple',
						rule: 'was / were + P.P.',
						example: 'Algebra was founded by Al-Khwarizmi.'
					},
					{
						label: 'Modals (can/will)',
						rule: 'modal + be + P.P.',
						example: 'Energy can be stored in batteries.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما خطوات تحويل "Ibn al-Haytham wrote the Book of Optics" إلى المبني للمجهول؟',
					hintAr: 'ابدأ بالمفعول به (The Book of Optics) وحدد زمن الفعل wrote.',
					expectedInput: 'The Book of Optics was written by Ibn al-Haytham.',
					revealAr:
						'1) نقدم المفعول به (The Book of Optics). 2) نضع was لأن الفعل في الماضي والمفعول مفرد. 3) نضع التصريف الثالث (written). 4) نضيف by Ibn al-Haytham.'
				},
				{
					promptAr: 'ماذا نستخدم مع الفاعل الجمع في المضارع البسيط المجهول: "Microscopes .......... in school labs"؟',
					hintAr: 'المفعول به الجديد جمع (Microscopes) والزمن مضارع بسيط.',
					expectedInput: 'are used',
					revealAr: 'مع الجمع في المضارع البسيط نستعمل are + التصريف الثالث: Microscopes are used in school labs.'
				},
				{
					promptAr: 'كيف نصوغ المبني للمجهول مع الأفعال الناقصة مثل can أو must أو will؟',
					hintAr: 'بعد الفعل الناقص يأتي الفعل be مجردا.',
					expectedInput: 'modal + be + Past Participle',
					revealAr: 'القاعدة: can/must/will + be + P.P. مثال: Lab rules must be respected.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة العامة للمبني للمجهول: New Subject (المفعول به سابقا) + Verb to be (في زمن الجملة الأصلية) + Past Participle (التصريف الثالث).',
				'المضارع البسيط المجهول: is / are + P.P. (لوصف الحقائق والعمليات التقنية: Water is filtered before distribution).',
				'الماضي البسيط المجهول: was / were + P.P. (لوصف تاريخ الاختراعات: The camera obscura was explained by Ibn al-Haytham).',
				'الأفعال الناقصة في المجهول: can / must / will / should + be + P.P. (Clean energy can be produced from the sun).',
				'احفظ التصريف الثالث للأفعال الشاذة الشائعة في العلوم: write-written, make-made, build-built, find-found, draw-drawn.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Active to Passive Transformation Steps',
				rootLabel: 'Scientists test the device every year.',
				branches: [
					{
						label: '1. Move Object',
						rule: 'The device ...',
						example: 'Becomes the new subject'
					},
					{
						label: '2. Conjugate "be"',
						rule: 'test (Present) becomes is',
						example: 'Matches tense + singular/plural'
					},
					{
						label: '3. Add P.P. (+ by)',
						rule: 'tested (by scientists)',
						example: 'The device is tested every year.'
					}
				]
			}),
			visualCaptionAr: 'الخطوات الثلاث المضمونة لتحويل أي جملة علمية إلى المبني للمجهول',
			examples: [
				{
					problemAr: 'حوّل إلى المبني للمجهول: "Engineers build wind turbines in open areas."',
					solutionAr: 'Wind turbines are built in open areas by engineers.'
				},
				{
					problemAr: 'حوّل إلى المبني للمجهول: "Al-Zahrawi invented many surgical instruments."',
					solutionAr: 'Many surgical instruments were invented by Al-Zahrawi.'
				}
			],
			watchOutAr:
				'انتبه لمطابقة الفعل المساعد مع الفاعل الجديد (المفرد يأخذ is/was والجمع يأخذ are/were)، ولا تنس التصريف الثالث للفعل الشاذ (written وليس wrote).'
		},
		practice: [
			{
				questionAr: 'اختر التحويل الصحيح للمبني للمجهول: "Al-Khwarizmi introduced the concept of algorithms."',
				options: [
					'The concept of algorithms is introduced by Al-Khwarizmi.',
					'The concept of algorithms was introduced by Al-Khwarizmi.',
					'The concept of algorithms were introduced by Al-Khwarizmi.',
					'The concept of algorithms introduced by Al-Khwarizmi.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'introduced في الماضي وليس في المضارع.',
					'أحسنت! الفاعل الجديد مفرد والزمن ماض بسيط فنستعمل was introduced.',
					'the concept مفرد يأخذ was لا were.',
					'ينقصها الفعل المساعد was.'
				],
				explanationAr: 'الزمن ماض بسيط والفاعل الجديد (the concept) مفرد، لذا نختار was introduced.'
			},
			{
				questionAr: 'أكمل الجملة العلمية: "Today, satellites .......... to forecast the weather accurately."',
				options: ['is used', 'are used', 'was used', 'used'],
				correctIndex: 1,
				diagnosticFeedback: [
					'satellites جمع لا تأخذ is.',
					'ممتاز! مضارع بسيط مجهول مع جمع: are used.',
					'Today تدل على المضارع و satellites جمع.',
					'نحتاج الفعل المساعد are لصياغة المجهول.'
				],
				explanationAr: 'في المضارع البسيط المجهول مع الجمع نستعمل are + Past Participle.'
			},
			{
				questionAr: 'حوّل إلى المجهول: "Students must follow safety instructions in the chemistry lab."',
				options: [
					'Safety instructions must followed in the chemistry lab.',
					'Safety instructions must be follow in the chemistry lab.',
					'Safety instructions must be followed in the chemistry lab.',
					'Safety instructions must been followed in the chemistry lab.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'ينقصها الفعل be بعد must.',
					'يجب استعمال التصريف الثالث followed لا المجرد follow.',
					'صحيح تماما! must + be + followed.',
					'بعد must نضع be المجردة لا been.'
				],
				explanationAr: 'المبني للمجهول مع الأفعال الناقصة هو: modal + be + Past Participle.'
			},
			{
				questionAr: 'أكمل الجملة: "Several famous books on optics .......... by Ibn al-Haytham in the eleventh century."',
				options: ['was written', 'were written', 'are wrote', 'were wrote'],
				correctIndex: 1,
				diagnosticFeedback: [
					'Several famous books جمع يأخذ were.',
					'أحسنت! جمع في الماضي البسيط المجهول + التصريف الثالث written.',
					'الزمن ماض و wrote ليست التصريف الثالث.',
					'التصريف الثالث من write هو written وليس wrote.'
				],
				explanationAr: 'الفاعل جمع والزمن ماض والتصريف الثالث من write هو written.'
			},
			{
				questionAr: 'أي جملة من الآتي مبنية للمجهول بشكل صحيح؟',
				options: [
					'The solar battery is recharge by sunlight.',
					'The solar battery is recharged by sunlight.',
					'The solar battery recharged by sunlight.',
					'Sunlight is recharged by the solar battery.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقص التصريف الثالث recharged.',
					'إجابة صحيحة! is + recharged + by sunlight.',
					'ينقص الفعل المساعد is.',
					'عكس المعنى العلمي للجملة.'
				],
				explanationAr: 'البطارية الشمسية هي التي تُشحن بواسطة ضوء الشمس: is recharged by.'
			}
		]
	},

	// 3. Prepositions & Word Formation (-tion, -ment, -er, -ist)
	{
		id: 'eng_lesson_1as_tcst_t3_prepositions_word_formation',
		slug: 'eng-1as-tcst-t3-prepositions-word-formation',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Eureka! — العلوم والابتكارات وإنجازات العلماء المسلمين',
		order: 3,
		titleAr: 'حروف الجر وبناء الكلمات باللواحق (Prepositions and Word Formation Suffixes)',
		objectives: [
			'اشتقاق أسماء الأشياء والعمليات باستخدام اللاحقتين -tion و -ment',
			'اشتقاق أسماء الأشخاص والمهن العلمية باستخدام اللاحقات -er و -or و -ist',
			'توظيف حروف الجر التقنية بدقة (made of, used for, consist of, depend on, interested in)'
		],
		keywordsAr: ['Word Formation', 'Suffixes', '-tion', '-ment', '-er', '-ist', 'Prepositions'],
		discover: {
			scenarioAr:
				'تأمّل عائلة الكلمات العلمية في نص حول الابتكار: الفعل invent (يخترع) يعطينا الاسم invention (اختراع) والفاعل inventor (مخترع)، والفعل develop يعطينا development (تطوير)، وكلمة science تعطينا scientist (عالِم). كما نقول: "A thermometer is used for measuring temperature and consists of a glass tube."',
			svg: svgEnglishWordFormation({
				title: 'Scientific Word Formation (Root + Suffix)',
				prefix: '—',
				root: 'invent / develop / science',
				suffix: '-tion / -ment / -ist',
				derivedWord: 'invention  |  development  |  scientist',
				meaningNote: 'Suffixes change the part of speech (Verb to Noun / Person)'
			}),
			steps: [
				{
					promptAr: 'ما اللاحقة التي نحول بها الفعل "invent" إلى اسم "اختراع" والفعل "develop" إلى اسم "تطوير"؟',
					hintAr: 'تأمل الكلمتين في سيناريو الدرس.',
					expectedInput: '-tion لـ invention و -ment لـ development',
					revealAr: 'نضيف -tion / -ion لبعض الأفعال مثل invent-invention و educate-education، ونضيف -ment مثل develop-development و improve-improvement.'
				},
				{
					promptAr: 'ما الفرق في المعنى بين اللاحقة -tion واللاحقة -or / -er / -ist؟',
					hintAr: 'قارن بين invention و inventor، وبين science و scientist.',
					expectedInput: '-tion تدل على الشيء أو العملية، بينما -er/-or/-ist تدل على الشخص',
					revealAr: 'اللواحق -er (teacher, researcher) و -or (inventor, creator) و -ist (scientist, chemist, physicist) تشير إلى الشخص أو صاحب المهنة.'
				},
				{
					promptAr: 'ما حرف الجر الصحيح بعد "used" عندما يتبعه فعل بصيغة ing مثل: "A compass is used .......... finding direction"؟',
					hintAr: 'نستعمل for مع Verb-ing و to مع الفعل المجرد.',
					expectedInput: 'for',
					revealAr: 'نكتب: used for + Verb-ing (used for finding)، أو used to + Stem (used to find).'
				}
			]
		},
		summary: {
			rulesAr: [
				'لواحق تكوين الأسماء المجردة والأعمال: -tion / -ation (invent: invention, observe: observation) و -ment (develop: development, equip: equipment, measure: measurement).',
				'لواحق أسماء الأشخاص والعلماء: -er (design: designer, research: researcher)، و -or (invent: inventor, calculate: calculator)، و -ist (science: scientist, biology: biologist, chemistry: chemist).',
				'حروف جر أساسية في وصف الأجهزة والعلوم: used for + V-ing (يُستعمل لـ) — used to + Stem — made of (مصنوع من) — consists of (يتكون من) — depends on (يعتمد على) — interested in (مهتم بـ).',
				'تذكّر التعديل الإملائي عند إضافة اللاحقة: نحذف e الصامتة قبل -ation أو -ist (observe: observation, science: scientist).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Essential Technical Prepositions',
				rootLabel: 'Verb / Adjective + Fixed Preposition',
				branches: [
					{
						label: 'Function',
						rule: 'used for + V-ing | used to + Stem',
						example: 'It is used for measuring heat.'
					},
					{
						label: 'Composition',
						rule: 'made of / consists of',
						example: 'The lens is made of glass.'
					},
					{
						label: 'Relation',
						rule: 'depend on / interested in',
						example: 'Results depend on accuracy.'
					}
				]
			}),
			visualCaptionAr: 'أهم حروف الجر الثابتة في وصف الاختراعات العلمية',
			examples: [
				{
					problemAr: 'كوّن الاسم واسم الفاعل من الفعل "research" والاسم من الفعل "equip".',
					solutionAr: 'research: researcher (شخص) / research (اسم) | equip: equipment (معدات).'
				},
				{
					problemAr: 'املأ الفراغ بحرف الجر المناسب: "Modern medicine depends .......... scientific research and is interested .......... patient safety."',
					solutionAr: 'depends on / interested in.'
				}
			],
			watchOutAr:
				'لا تخلط بين "used for + Verb-ing" و "used to + Stem"! خطأ أن تكتب "used for measure" والصحيح "used for measuring" أو "used to measure".'
		},
		practice: [
			{
				questionAr: 'اختر الاسم الصحيح المشتق من الفعل "develop":',
				options: ['develoption', 'development', 'developist', 'developness'],
				correctIndex: 1,
				diagnosticFeedback: [
					'لاحقة خاطئة لهذا الفعل.',
					'أحسنت! develop + ment = development.',
					'لاحقة -ist لا تتبع develop.',
					'لاحقة خاطئة.'
				],
				explanationAr: 'الفعل develop يأخذ اللاحقة -ment لتكوين الاسم development.'
			},
			{
				questionAr: 'ما اسم الشخص المتخصص في علم الفيزياء (physics)؟',
				options: ['physicment', 'physicer', 'physicist', 'physiction'],
				correctIndex: 2,
				diagnosticFeedback: [
					'ment لا تدل على الشخص.',
					'لا نستعمل er مع physics.',
					'ممتاز! نضيف اللاحقة -ist لتكوين physicist (عالم فيزياء).',
					'لاحقة غير صحيحة.'
				],
				explanationAr: 'تخصصات العلوم مثل physics و chemistry و biology تأخذ اللاحقة -ist للدلالة على العالِم.'
			},
			{
				questionAr: 'أكمل الجملة: "A microscope is used .......... observing tiny cells."',
				options: ['to', 'for', 'of', 'on'],
				correctIndex: 1,
				diagnosticFeedback: [
					'to يتبعها الفعل المجرد observe لا observing.',
					'صحيح! بعد used for يأتي الفعل بصيغة ing (observing).',
					'of لا تعبر عن الوظيفة هنا.',
					'on لا تأتي مع used هنا.'
				],
				explanationAr: 'القاعدة: be used for + Verb-ing.'
			},
			{
				questionAr: 'أكمل بحرف الجر المناسب: "The laboratory kit consists .......... ten glass tubes and a balance."',
				options: ['in', 'on', 'of', 'at'],
				correctIndex: 2,
				diagnosticFeedback: [
					'consist لا يأخذ in بهذا المعنى.',
					'on تستعمل مع depend لا consist.',
					'أحسنت! التركيب الثابت هو consist of (يتكون من).',
					'at غير صحيح هنا.'
				],
				explanationAr: 'الفعل consist يلازمه دائما حرف الجر of.'
			},
			{
				questionAr: 'اختر الاسم الصحيح المشتق من الفعل "observe" (يلاحظ):',
				options: ['observement', 'observation', 'observist', 'observity'],
				correctIndex: 1,
				diagnosticFeedback: [
					'observe لا يأخذ -ment.',
					'إجابة صحيحة! نحذف e ونضيف -ation فتصبح observation.',
					'لاحقة غير صحيحة.',
					'لاحقة غير صحيحة.'
				],
				explanationAr: 'الاسم من observe هو observation (ملاحظة علمية).'
			}
		]
	},

	// 4. Writing a Short Scientific Biography / Invention Report
	{
		id: 'eng_lesson_1as_tcst_t3_scientific_biography',
		slug: 'eng-1as-tcst-t3-scientific-biography',
		grade: '1as_tcst',
		yearSubjectId: 658,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: Eureka! — العلوم والابتكارات وإنجازات العلماء المسلمين',
		order: 4,
		titleAr: 'كتابة سيرة علمية قصيرة أو بطاقة اختراع (Scientific Biography and Invention Report)',
		objectives: [
			'تنظيم سيرة عالم مسلم (مثل ابن الهيثم أو الخوارزمي أو الجزري) زمنيا في فقرة متماسكة',
			'استعمال الزمن الماضي البسيط والمبني للمجهول والروابط الزمنية في السيرة العلمية',
			'وصف اختراع علمي من حيث المخترع والتاريخ والوظيفة والأثر الإيجابي على البشرية'
		],
		keywordsAr: ['Scientific Biography', 'Invention Report', 'Ibn al-Haytham', 'Al-Khwarizmi', 'Al-Jazari'],
		discover: {
			scenarioAr:
				'في الوضعيات الإدماجية للفصل الثالث يُطلب غالبا كتابة فقرة قصيرة عن عالم مسلم أو اختراع مفيد باستخدام بطاقة معلومات (Fact File). انظر كيف نحوّل بطاقة معلومات عن "Ibn al-Haytham (965-1040, Basra, Optics, Book of Optics, experimental method)" إلى فقرة علمية سليمة ومترابطة.',
			svg: svgEnglishWritingStructure({
				title: 'Blueprint for a Scientific Biography Paragraph',
				steps: [
					{ stage: 'Introduction', detail: 'Full name, birth date/place, field (was born in... / was a Muslim scholar)' },
					{ stage: 'Major Work', detail: 'Key book or invention (He wrote... / He invented... / It was designed to...)' },
					{ stage: 'Method / Impact', detail: 'Why it mattered (His work laid the foundation for modern science)' },
					{ stage: 'Conclusion', detail: 'Death date and lasting legacy (He died in..., yet he is still remembered)' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الزمنان الأساسيان المستعملان عند كتابة سيرة عالم عاش في الماضي وبيان أثره اليوم؟',
					hintAr: 'حياته واختراعه في الماضي، وأثره لا يزال قائما اليوم.',
					expectedInput: 'الماضي البسيط لحياته وإنجازاته، والمضارع البسيط لأثره المستمر اليوم',
					revealAr:
						'نستعمل Past Simple (Active & Passive) لأحداث حياته (was born, wrote, invented, died)، ونستعمل Present Simple عند ذكر أثره اليوم (is still remembered, is used today).'
				},
				{
					promptAr: 'ما العبارة الجاهزة الصحيحة لذكر تاريخ ومكان ميلاد العالم؟',
					hintAr: 'نستعمل التركيب المجهول مع born.',
					expectedInput: 'was born in (year) in (place)',
					revealAr: 'نكتب دائما: Ibn al-Haytham was born in 965 in Basra. (انتبه: born تأتي دائما مع was/were).'
				},
				{
					promptAr: 'كيف نربط بين جملة التعريف بالاختراع وجملة وظيفته وفائدته؟',
					hintAr: 'تذكر روابط الغاية (in order to / used for) وروابط الاستدراك (Although).',
					expectedInput: 'باستعمال in order to أو used for أو which',
					revealAr:
						'نستعمل جملا مركبة واضحة مثل: Al-Jazari built mechanical water pumps in order to supply cities with water.'
				}
			]
		},
		summary: {
			rulesAr: [
				'قبل الكتابة، اقسم بطاقة المعلومات (Fact File) إلى أربعة محاور: الميلاد والنشأة — المجال العلمي — أهم الإنجازات والكتب — الوفاة والأثر الباقي.',
				'جمل مفتاحية جاهزة للسيرة العلمية: "(Name) was born in ... in ...", "He was a brilliant Muslim mathematician / engineer", "He is best known for ...", "His masterpiece was written in ...".',
				'جمل مفتاحية لبطاقة الاختراع: "(Invention) was invented by ... in ...", "It is used for + V-ing / to + Stem", "Although early models were simple, it improved human life."',
				'راجع أربع نقاط قبل تسليم الفقرة: الحروف الكبيرة للأعلام والمدن (Capital letters)، صحة أفعال الماضي، علامات الترقيم، والربط بين الجمل.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Muslim Pioneers Featured in Eureka! Unit',
				rootLabel: 'Golden Age of Islamic Science',
				branches: [
					{
						label: 'Al-Khwarizmi',
						rule: 'Mathematics and Algebra',
						example: 'Founded algebra and algorithms'
					},
					{
						label: 'Ibn al-Haytham',
						rule: 'Optics and Scientific Method',
						example: 'Wrote Book of Optics (Kitab al-Manazir)'
					},
					{
						label: 'Al-Jazari',
						rule: 'Mechanical Engineering',
						example: 'Designed water clocks and pumps'
					}
				]
			}),
			visualCaptionAr: 'نماذج مشرقة من علماء المسلمين لتوظيفها في الوضعيات الإدماجية للوحدة الرابعة',
			examples: [
				{
					problemAr: 'حوّل الملاحظات التالية إلى جملتين متصلتين: (Al-Khwarizmi / born 780 / mathematician / write book on Algebra).',
					solutionAr: 'Al-Khwarizmi was born in 780 and became one of the greatest Muslim mathematicians. He wrote the foundational book on algebra, which shaped modern mathematics.'
				},
				{
					problemAr: 'صغ جملة تصف وظيفة اختراع الجزري باستعمال Passive Voice و Purpose.',
					solutionAr: 'The crank-connecting rod pump was invented by Al-Jazari in order to raise water easily for farming and households.'
				}
			],
			watchOutAr:
				'لا تكتب أبدا "He born in 965"! الصيغة الصحيحة دائما هي "He was born in 965" بوجود الفعل المساعد was.'
		},
		practice: [
			{
				questionAr: 'اختر الجملة الصحيحة لذكر ميلاد العالم الجزري:',
				options: [
					'Al-Jazari born in 1136.',
					'Al-Jazari was born in 1136.',
					'Al-Jazari is born in 1136.',
					'Al-Jazari were born in 1136.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'ينقصها الفعل المساعد was.',
					'أحسنت! نستخدم دائما was born في الماضي المفرد.',
					'الحدث في الماضي سنة 1136 فلا نستعمل is.',
					'Al-Jazari مفرد يأخذ was لا were.'
				],
				explanationAr: 'للتعبير عن الميلاد في الماضي نستعمل التركيب الثابت was born.'
			},
			{
				questionAr: 'أي جملة تستخدم لختم سيرة علمية وبيان أثر العالم المستمر اليوم؟',
				options: [
					'He died in 1040 and nobody reads him.',
					'Although he died centuries ago, his scientific method is still respected today.',
					'He was dying tomorrow in Basra.',
					'He born and died.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عبارة غير دقيقة وتخالف الحقيقة التاريخية.',
					'ممتاز! جمعت بين الماضي (died) والمضارع المجهول (is still respected) ورابط الاستدراك Although.',
					'خطأ في الزمن والمعنى.',
					'جملة مبتورة وخاطئة نحويا.'
				],
				explanationAr: 'الخاتمة القوية تربط بين الوفاة في الماضي وبقاء الأثر العلمي في الحاضر.'
			},
			{
				questionAr: 'أكمل الجملة: "Ibn al-Haytham is best known .......... his groundbreaking research in optics."',
				options: ['at', 'for', 'on', 'to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'at لا تأتي مع known بهذا المعنى.',
					'صحيح! التعبير الثابت هو be known for (يُعرف بـ).',
					'on غير صحيحة هنا.',
					'to تعني معروف لدى أشخاص، أما for فلسبب الشهرة.'
				],
				explanationAr: 'التعبير be best known for يتبعه سبب شهرة العالم أو إنجازه.'
			},
			{
				questionAr: 'ما الترتيب المنطقي لأفكار فقرة حول اختراع علمي؟',
				options: [
					'الأثر المستقبلي ثم اسم الاختراع ثم تاريخ الاختراع',
					'تعريف الاختراع والمخترع والتاريخ ثم وظيفته ثم فوائده وأثره',
					'الوفاة ثم الوظيفة ثم الميلاد',
					'كتابة قائمة كلمات غير متصلة بدون أفعال'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب البدء بتعريف الاختراع أولا.',
					'أحسنت! هذا هو التنظيم المنطقي السليم لتقرير اختراع.',
					'الترتيب الزمني معكوس.',
					'يجب كتابة جمل كاملة مترابطة لا قائمة رؤوس أقلام.'
				],
				explanationAr: 'تقرير الاختراع يبدأ بالتعريف والتاريخ والمخترع ثم الوظيفة ثم الفوائد والأثر.'
			},
			{
				questionAr: 'أي جملة تصف اختراعا باستعمال المبني للمجهول ورابط الغاية معا؟',
				options: [
					'Water clocks were designed by Al-Jazari in order to measure time accurately.',
					'Water clocks designed by Al-Jazari for measure time.',
					'Water clocks was designed by Al-Jazari so as measure time.',
					'Al-Jazari were designed water clocks to measuring time.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! were designed (مجهول جمع) + in order to measure (غاية).',
					'ينقصها were و بعد for نضع ing.',
					'clocks جمع تأخذ were و so as ينقصها to.',
					'التركيب معكوس وخاطئ في المجهول والغاية.'
				],
				explanationAr: 'الجمع بين المبني للمجهول (were designed) ورابط الغاية (in order to measure) يعطي جملة علمية نموذجية.'
			}
		]
	}
];
