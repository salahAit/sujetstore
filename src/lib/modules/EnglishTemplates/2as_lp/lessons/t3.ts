import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_LP_T3: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_lp_t3_reported_speech',
		slug: 'eng-2as-lp-t3-reported-speech',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: No Man is an Island (التضامن والكوارث والتطوع)',
		order: 1,
		titleAr: 'الكلام المنقول للجمل الخبرية والأوامر والأسئلة (Reported Speech)',
		objectives: [
			'نقل الجمل الخبرية مع التحويل السليم للأزمنة والضمائر وظروف الزمان والمكان',
			'نقل الأوامر والنصائح بصيغة (told / advised / asked + Object + to / not to + Stem)',
			'نقل الأسئلة المباشرة بنوعيها (Yes/No Questions بـ if و Wh-Questions دون قلب الفعل)'
		],
		keywordsAr: ['Reported Speech', 'Direct Speech', 'backshift', 'orders', 'questions', 'الكلام المنقول'],
		discover: {
			scenarioAr:
				'أثناء حملة إغاثة بعد فيضانات، صرح منسق الهلال الأحمر قائلا: "We need warm blankets today." ثم طلب من المتطوعين: "Stay calm and help the elderly." كيف ينقل الصحفي هاتين العبارتين في تقريره؟',
			svg: svgEnglishGrammarMap({
				title: 'Reported Speech Three Forms',
				rootLabel: 'Direct to Reported Speech',
				rootSub: 'Reporting verb in Past (said / told / asked)',
				branches: [
					{
						label: 'Statements',
						rule: 'said (that) + Tense Backshift',
						example: 'He said that they needed blankets.'
					},
					{
						label: 'Orders / Requests',
						rule: 'told + Obj + (not) to + Stem',
						example: 'He told us to stay calm.'
					},
					{
						label: 'Yes/No Questions',
						rule: 'asked + if/whether + S + V',
						example: 'She asked if everyone was safe.'
					},
					{
						label: 'Wh- Questions',
						rule: 'asked + Wh- + S + V (no do/did)',
						example: 'He asked where the tent was.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل التحويل: Direct: "We need blankets today." ثم Reported: He said that they needed blankets that day. ما التغييرات الثلاثة التي حدثت؟',
					hintAr: 'راقب الضمير (We)، وزمن الفعل (need)، والظرف الزمني (today).',
					expectedInput: 'تحول الضمير إلى they والفعل للماضي needed والظرف إلى that day',
					revealAr:
						'عندما يكون فعل النقل في الماضي (said / told)، نرجع الزمن درجة للوراء (Present Simple تصبح Past Simple)، ونغير الضمائر والظروف (today تصبح that day).'
				},
				{
					promptAr:
						'كيف ننقل الأمر المنفي: The rescue leader said to volunteers, "Do not panic during the drill."؟',
					hintAr: 'نستعمل told + volunteers + not to + Stem.',
					expectedInput: 'The rescue leader told volunteers not to panic during the drill.',
					revealAr:
						'في نقل الأمر المنفي نحذف Do not ونضع مكانها not to قبل المصدر: told them not to panic.'
				},
				{
					promptAr:
						'في نقل السؤال: "Where is the medical tent?" لماذا نكتب He asked where the medical tent was وليس where was the medical tent؟',
					hintAr: 'تذكر أن السؤال المنقول يتحول إلى جملة خبرية بترتيب (فاعل ثم فعل).',
					expectedInput: 'لأن السؤال المنقول يأخذ ترتيب الجملة الخبرية (Subject + Verb)',
					revealAr:
						'في السؤال المنقول نحذف علامة الاستفهام ونحذف do/does/did ونضع الفاعل قبل الفعل مباشرة: where the medical tent was.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تحويل الأزمنة (Tense Backshift مع فعل نقل ماض مثل said/told): Present Simple يصبح Past Simple، و Present Continuous يصبح Past Continuous، و Past Simple يصبح Past Perfect (had + V3)، و will تصبح would، و can تصبح could، و must تصبح had to.',
				'تحويل الظروف: today تصبح that day، tomorrow تصبح the next/following day، yesterday تصبح the day before، here تصبح there، now تصبح then.',
				'الأوامر والطلبات: told / ordered / advised / asked + Object + to + Stem (وفي النفي: not to + Stem).',
				'الأسئلة المنقولة: نضع if / whether لأسئلة Yes/No، ونبقي أداة الاستفهام (where, when, why, how) لأسئلة Wh، مع ترتيب خبري (Subject + Verb) ودون علامة استفهام.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Backshift Rule in Reported Speech',
				tenseName: 'One Step Back in Time',
				formula: 'Present to Past | Past to Past Perfect | will to would',
				activeZone: 'two_past',
				example: '"We helped victims." = He said they had helped victims.',
				markers: 'now: then | today: that day | yesterday: the day before'
			}),
			visualCaptionAr: 'قاعدة تراجع الزمن خطوة واحدة للخلف عند وجود فعل نقل في الماضي',
			examples: [
				{
					problemAr: 'Report the statement: The doctor said, "The volunteers will deliver medicine tomorrow."',
					solutionAr: 'The doctor said that the volunteers would deliver medicine the following day.'
				},
				{
					problemAr: 'Report the question: The journalist asked the mayor, "Did the flood damage the main road?"',
					solutionAr: 'The journalist asked the mayor if the flood had damaged the main road.'
				}
			],
			watchOutAr:
				'إذا كان فعل النقل في المضارع (says / tells / asks) فلا نغير زمن الفعل داخل الجملة المنقولة! ولا تنس حذف علامتي التنصيص وعلامة الاستفهام وحذف do/does/did في الأسئلة المنقولة.'
		},
		practice: [
			{
				questionAr: 'Report accurately: Karim said, "I am collecting food parcels for affected families."',
				options: [
					'Karim said that he is collecting food parcels for affected families.',
					'Karim said that he was collecting food parcels for affected families.',
					'Karim said that I was collecting food parcels for affected families.',
					'Karim said that he collected food parcels for affected families.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يجب إرجاع Present Continuous إلى Past Continuous بعد said.',
					'صحيح! تغير الضمير I إلى he وتغير am collecting إلى was collecting.',
					'خطأ: يجب تغيير الضمير I إلى he.',
					'خطأ: المضارع المستمر يتحول إلى ماض مستمر لا ماض بسيط.'
				],
				explanationAr: 'يتحول المضارع المستمر (am collecting) إلى ماض مستمر (was collecting) مع تحويل الضمير.'
			},
			{
				questionAr: 'Choose the right reported order: The coordinator told us, "Check the emergency kit carefully."',
				options: [
					'The coordinator told us check the emergency kit carefully.',
					'The coordinator told us to check the emergency kit carefully.',
					'The coordinator told us that we checked the emergency kit carefully.',
					'The coordinator told us checking the emergency kit carefully.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأمر المنقول يحتاج to قبل المصدر.',
					'ممتاز! told + Object + to + Stem هي الصيغة السليمة.',
					'خطأ: هذه صيغة خبر لا أمر.',
					'خطأ: لا نستخدم V-ing بعد told us هنا.'
				],
				explanationAr: 'ننقل الأمر المثبت بصيغة: told + Object + to + Stem.'
			},
			{
				questionAr: 'Report the negative advice: The nurse advised the residents, "Do not drink untreated water."',
				options: [
					'The nurse advised the residents to not drink untreated water.',
					'The nurse advised the residents not to drink untreated water.',
					'The nurse advised the residents did not drink untreated water.',
					'The nurse advised the residents do not drink untreated water.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الترتيب القياسي الصحيح هو not to وليس to not.',
					'صحيح! advised + Object + not to + Stem.',
					'خطأ: هذا ليس أسلوب نقل للأوامر.',
					'خطأ: لم تحول الجملة إلى كلام منقول.'
				],
				explanationAr: 'في نقل النهي والأمر المنفي نستخدم not to + Stem.'
			},
			{
				questionAr: 'Select the accurately reported Yes/No question: She asked me, "Can your classmates join the charity drive?"',
				options: [
					'She asked me if could my classmates join the charity drive.',
					'She asked me if my classmates could join the charity drive.',
					'She asked me that my classmates could join the charity drive.',
					'She asked me if my classmates can join the charity drive?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نقلب الفعل والفاعل في السؤال المنقول.',
					'أحسنت! استعملنا if + Subject + could وحذفنا علامة الاستفهام.',
					'خطأ: لا نستخدم that لنقل سؤال Yes/No بل if أو whether.',
					'خطأ: يجب تحويل can إلى could وحذف علامة الاستفهام.'
				],
				explanationAr: 'ننقل سؤال Yes/No باستخدام if متبوعا بترتيب خبري (فاعل + فعل محول).'
			},
			{
				questionAr: 'Report the Wh-question: The reporter asked, "When did the rescue team arrive?"',
				options: [
					'The reporter asked when did the rescue team arrive.',
					'The reporter asked when the rescue team had arrived.',
					'The reporter asked when had the rescue team arrived.',
					'The reporter asked if the rescue team had arrived.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: نحذف الفعل المساعد did في السؤال المنقول.',
					'صحيح! حذفنا did وأرجعنا الماضي البسيط إلى Past Perfect بترتيب خبري.',
					'خطأ: لا نقدم had على الفاعل في السؤال المنقول.',
					'خطأ: يجب الإبقاء على أداة الاستفهام when لا استبدالها بـ if.'
				],
				explanationAr: 'في Wh-Question المنقول نحتفظ بأداة الاستفهام ونحذف did ونحول الماضي البسيط إلى Past Perfect.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t3_concession',
		slug: 'eng-2as-lp-t3-concession',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: No Man is an Island (التضامن والكوارث والتطوع)',
		order: 2,
		titleAr: 'التعبير عن الاستدراك والتعارض (Although, Even though, Despite, In spite of)',
		objectives: [
			'التمييز الدقيق بين أدوات الاستدراك المتبوعة بجملة (although, even though) والمتبوعة باسم (despite, in spite of)',
			'تحويل الجمل بسلاسة بين although و despite / in spite of في تمارين التحويل الامتحانية',
			'استعمال صيغة despite the fact that كجسر آمن عند وجود جملة كاملة'
		],
		keywordsAr: ['Concession', 'although', 'even though', 'despite', 'in spite of', 'الاستدراك'],
		discover: {
			scenarioAr:
				'في قصة تضامن إنساني: "Although the weather was freezing, volunteers reached the isolated village." يمكننا صياغة المعنى نفسه بـ Despite: "Despite the freezing weather, volunteers reached the isolated village." قارن بين التركيبين!',
			svg: svgEnglishGrammarMap({
				title: 'Concession Linkers Formula',
				rootLabel: 'Expressing Concession',
				rootSub: 'Unexpected result despite an obstacle',
				branches: [
					{
						label: 'although / though',
						rule: '+ Subject + Verb',
						example: 'Although it rained, they helped.'
					},
					{
						label: 'even though',
						rule: '+ Subject + Verb (stronger)',
						example: 'Even though roads broke, aid came.'
					},
					{
						label: 'despite',
						rule: '+ Noun / V-ing (NO "of")',
						example: 'Despite the storm, teams worked.'
					},
					{
						label: 'in spite of',
						rule: '+ Noun / V-ing',
						example: 'In spite of being tired, he stayed.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل التركيب: "Despite the heavy rain" و "In spite of feeling tired". هل يوجد فعل مصرف (Subject + Verb) مباشرة بعد Despite أو In spite of؟',
					hintAr: 'انظر إلى the heavy rain (عبارة اسمية) و feeling (اسم فعل V-ing).',
					expectedInput: 'لا، يتبعها اسم أو V-ing فقط',
					revealAr:
						'بعد despite و in spite of نضع اسما (Noun Phrase) أو فعلا ينتهي بـ ing (Gerund)، ولا نضع جملة كاملة إلا إذا أضفنا عبارة the fact that.'
				},
				{
					promptAr:
						'حول الجملة: "Although the volunteers were exhausted, they distributed all the parcels." باستعمال In spite of.',
					hintAr: 'حول الجملة the volunteers were exhausted إلى V-ing (being exhausted) أو اسم (their exhaustion).',
					expectedInput: 'In spite of their exhaustion, the volunteers distributed all the parcels.',
					revealAr:
						'يمكن الحل بطريقتين صحيحتين: "In spite of their exhaustion, ..." أو "In spite of being exhausted, the volunteers distributed all the parcels."'
				},
				{
					promptAr:
						'اكتشف الخطأ في هذه الجملة الشائعة: "Despite of the earthquake, neighbours stayed united."',
					hintAr: 'هل تأخذ كلمة despite حرف الجر of؟',
					expectedInput: 'حذف كلمة of لأن despite لا تأخذ of',
					revealAr:
						'لا نكتب أبدا despite of! إما أن نكتب despite وحدها وإما أن نكتب in spite of.'
				}
			]
		},
		summary: {
			rulesAr: [
				'although / though / even though + Subject + Verb: تعبر عن استدراك (نتيجة مخالفة للمتوقع) ولا يجوز جمعها مع but في نفس الجملة.',
				'despite / in spite of + Noun Phrase أو V-ing: تفيد نفس المعنى الاستدراكي ولكن يليها اسم أو مصدر بـ ing.',
				'قاعدة مساعدة للامتحان: despite the fact that / in spite of the fact that + Subject + Verb تسمح بإبقاء الجملة الكاملة كما هي.',
				'التحويل السريع: الصفة بعد be تتحول إلى اسم (was difficult تصبح the difficulty) أو إلى being + Adjective (being difficult).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Converting Although to Despite (Exam Method)',
				steps: [
					{ stage: 'Check Clause', detail: 'Locate the obstacle clause after Although.' },
					{ stage: 'Nominalize', detail: 'Turn verb/adj into a Noun (heavy rain / difficulty).' },
					{ stage: 'Or Use V-ing', detail: 'Use V-ing when both clauses share the same subject.' },
					{ stage: 'No "of" / "but"', detail: 'Never write "despite of" and never add "but".' }
				]
			}),
			visualCaptionAr: 'طريقة مضمونة لتحويل جمل although إلى despite في الامتحانات',
			examples: [
				{
					problemAr: 'Rewrite using "despite": "Although the village is remote, medical teams visit it regularly."',
					solutionAr: 'Despite its remoteness, medical teams visit the village regularly. (أو: Despite being remote, the village is visited regularly.)'
				},
				{
					problemAr: 'Combine using "although": "The damage was severe. The community rebuilt the school quickly."',
					solutionAr: 'Although the damage was severe, the community rebuilt the school quickly.'
				}
			],
			watchOutAr:
				'احذر من خطأين يضيعان النقطة في الامتحان: كتابة despite of (الصحيح despite فقط)، والجمع بين although و but في جملة واحدة مثل "Although it rained, but they came" (الصحيح حذف but).'
		},
		practice: [
			{
				questionAr: 'Choose the right concession linker: "...... the severe snowstorm, Algerian volunteers delivered food to mountain villages."',
				options: ['Although', 'Despite', 'Even though', 'Despite of'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Although تتطلب فعلا مصرفا، و the severe snowstorm عبارة اسمية.',
					'صحيح! Despite تتبعها عبارة اسمية مباشرة بدون of.',
					'خطأ: Even though تتطلب فاعلا وفعلا.',
					'خطأ: لا يوجد تركيب اسمه despite of.'
				],
				explanationAr: 'لأن ما بعد الفراغ عبارة اسمية (the severe snowstorm) نستعمل Despite.'
			},
			{
				questionAr: 'Complete correctly: "...... the shelter had limited space, every family received a warm meal."',
				options: ['Despite', 'In spite of', 'Although', 'Unlike'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: Despite لا يتبعها فاعل وفعل مباشر.',
					'خطأ: In spite of يتبعها اسم أو V-ing.',
					'أحسنت! لوجود جملة كاملة (the shelter had...) نستعمل Although.',
					'خطأ: Unlike للمقارنة مع عبارة اسمية.'
				],
				explanationAr: 'يتبع الرابط Although جملة كاملة (Subject + Verb).'
			},
			{
				questionAr: 'Which sentence is 100% grammatically correct?',
				options: [
					'Although the road was blocked, but the doctors walked on foot.',
					'Despite of being tired, the students cleaned the courtyard.',
					'In spite of being tired, the students cleaned the courtyard.',
					'In spite the rain, the charity drive succeeded.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا يجوز الجمع بين Although و but في جملة واحدة.',
					'خطأ: despite لا تأخذ of.',
					'ممتاز! In spite of + V-ing صيغة سليمة تماما.',
					'خطأ: سقطت كلمة of من In spite of.'
				],
				explanationAr: 'التركيب الصحيح هو In spite of + V-ing دون أخطاء في حروف الجر.'
			},
			{
				questionAr: 'Rewrite using "despite": "Although he had little money, he donated generously."',
				options: [
					'Despite he had little money, he donated generously.',
					'Despite having little money, he donated generously.',
					'Despite of having little money, he donated generously.',
					'Despite had little money, he donated generously.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضع جملة كاملة مباشرة بعد Despite.',
					'صحيح! الفاعل واحد في الجملتين فحولنا الفعل إلى V-ing: Despite having...',
					'خطأ: لا نكتب of بعد Despite.',
					'خطأ: had فعل ماض لا يصلح بعد Despite.'
				],
				explanationAr: 'عندما يتحد الفاعل في الجملتين، نحول الفعل بعد Despite إلى صيغة V-ing.'
			},
			{
				questionAr: 'Choose the safe bridge phrase that allows a full clause after "in spite of":',
				options: [
					'in spite of the fact that',
					'in spite of that fact',
					'in spite of because',
					'in spite of what'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! عبارة in spite of the fact that يتبعها فاعل وفعل كامل.',
					'خطأ: الصيغة القياسية هي the fact that.',
					'خطأ: لا يجتمع استدراك مع because.',
					'خطأ: صيغة غير صحيحة للاستدراك.'
				],
				explanationAr: 'تعمل العبارة in spite of the fact that كجسر يسمح بوضع جملة كاملة بعدها.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t3_final_ed_s',
		slug: 'eng-2as-lp-t3-final-ed-s',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: No Man is an Island (التضامن والكوارث والتطوع)',
		order: 3,
		titleAr: 'قواعد نطق النهايتين Final -ed و Final -s',
		objectives: [
			'تصنيف نطق النهاية -ed بدقة بين الأصوات الثلاثة /t/ و /d/ و /id/',
			'تصنيف نطق النهاية -s / -es بدقة بين الأصوات الثلاثة /s/ و /z/ و /iz/',
			'تجنب الخلط بين الحرف المكتوب والصوت المنطوق (مثل laughed و boxes و phoned)'
		],
		keywordsAr: ['Final -ed', 'Final -s', 'Phonology', 'Pronunciation', 'النطق الصوتي'],
		discover: {
			scenarioAr:
				'في تمارين الصوتيات بالثانوي يطلب منك تصنيف أفعال وكلمات من نص التضامن مثل: helped, saved, donated, boxes, blankets, volunteers في جدول النطق الصحيح. المفتاح هو الصوت الأخير قبل الإضافة لا مجرد الحرف!',
			svg: svgEnglishPhoneticsChart({
				title: 'Final -ed Pronunciation Rules',
				subtitle: 'Look at the LAST SOUND before -ed',
				columns: [
					{
						sound: '/t/',
						rule: 'p, k, f, s, sh, ch, x',
						examples: 'helped, worked, washed'
					},
					{
						sound: '/d/',
						rule: 'vowels + b,g,l,m,n,r,v,z',
						examples: 'saved, cleaned, offered'
					},
					{
						sound: '/id/',
						rule: 'Only after /t/ or /d/',
						examples: 'donated, needed, aided'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'انظر إلى الأفعال: donated, needed, protected, visited. ما الصوت الأخير في أصل كل فعل قبل إضافة -ed؟',
					hintAr: 'اقرأ آخر صوت في donate, need, protect, visit (تجاهل حرف e الصامت في donate).',
					expectedInput: 'الصوت /t/ أو /d/ فتنطق النهاية /id/',
					revealAr:
						'قاعدة سهلة ومضمونة: إذا انتهى أصل الفعل بالصوت /t/ أو /d/ ننطق -ed مقطعا إضافيا هو /id/.'
				},
				{
					promptAr:
						'لماذا تنطق كلمة "laughed" بالصوت /t/ رغم أنها تنتهي بالحرفين gh؟',
					hintAr: 'كيف تنطق الحرفين gh في كلمة laugh؟',
					expectedInput: 'لأن gh تنطق /f/ وهو صوت مهموس يأخذ /t/',
					revealAr:
						'العبرة دائما بالصوت المنطوق الأخير لا الحرف المكتوب؛ في laugh ينطق آخر صوت /f/ فيأخذ /t/.'
				},
				{
					promptAr:
						'قارن الآن بنطق النهاية -s في: blankets (/s/), volunteers (/z/), bridges (/iz/). ما الأصوات التي تجعل -s تنطق /iz/؟',
					hintAr: 'أصوات الصفير والتفشي: s, z, sh, ch, x, ge/dge.',
					expectedInput: 'أصوات الصفير والتفشي (s, z, sh, ch, x, ge)',
					revealAr:
						'تنطق -s / -es بالصوت /iz/ بعد أصوات الصفير: /s/, /z/, /sh/, /ch/, /ge/ مثل boxes, washes, reaches, bridges.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Final -ed تنطق /id/ فقط بعد الصوتين /t/ و /d/ (donated, needed, visited, flooded).',
				'Final -ed تنطق /t/ بعد الأصوات المهموسة (Voiceless): /p, k, f, s, sh, ch, x/ (helped, cooked, laughed, passed, washed, reached).',
				'Final -ed تنطق /d/ بعد بقية الأصوات المجهورة وحروف العلة (Voiced & Vowels): /b, g, l, m, n, r, v, z, vowels/ (saved, cleaned, carried, offered).',
				'Final -s تنطق /iz/ بعد أصوات الصفير (s, z, sh, ch, x, ce, ge)، وتنطق /s/ بعد الأصوات المهموسة (/p, t, k, f, th/)، وتنطق /z/ بعد بقية الأصوات المجهورة وحروف العلة.'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Final -s / -es Pronunciation Rules',
				subtitle: 'Look at the LAST SOUND before -s / -es',
				columns: [
					{
						sound: '/s/',
						rule: 'p, t, k, f, th (voiceless)',
						examples: 'tents, maps, roofs'
					},
					{
						sound: '/z/',
						rule: 'vowels + b,d,g,l,m,n,r,v',
						examples: 'teams, meals, roads'
					},
					{
						sound: '/iz/',
						rule: 's, z, sh, ch, x, ge, ce',
						examples: 'boxes, bridges, villages'
					}
				]
			}),
			visualCaptionAr: 'الجدول المختصر لتصنيف النهاية -s في التمارين الصوتية',
			examples: [
				{
					problemAr: 'Classify the final -ed: rescued, assisted, packed, damaged.',
					solutionAr: '/t/: packed | /d/: rescued, damaged | /id/: assisted.'
				},
				{
					problemAr: 'Classify the final -s: blankets, shelters, crises, volunteers.',
					solutionAr: '/s/: blankets | /z/: shelters, volunteers | /iz/: crises.'
				}
			],
			watchOutAr:
				'انتبه للحروف الخادعة: كلمة damaged تنتهي بصوت /d3/ (مجهور) فتأخذ /d/، وكلمة places تنتهي بصوت /s/ فتأخذ /iz/، وكلمة cliffs تنتهي بصوت /f/ فتأخذ /s/، وكلمة clothes تنتهي بصوت /dh/ مجهور فتأخذ /z/.'
		},
		practice: [
			{
				questionAr: 'How is the final "-ed" pronounced in the verb "donated"?',
				options: ['/t/', '/d/', '/id/', 'Silent'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: أصل الفعل donate ينتهي بالصوت /t/.',
					'خطأ: بعد الصوت /t/ ننطق مقطعا إضافيا.',
					'صحيح! ينتهي donate بالصوت /t/ فتأخذ النهاية /id/.',
					'خطأ: النهاية -ed ليست صامتة هنا.'
				],
				explanationAr: 'كل فعل ينتهي أصله بالصوت /t/ أو /d/ تنطق نهايته -ed بالصوت /id/.'
			},
			{
				questionAr: 'Which verb has its final "-ed" pronounced /t/?',
				options: ['saved', 'helped', 'needed', 'shared'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: save ينتهي بالصوت المجهور /v/ فيأخذ /d/.',
					'أحسنت! help ينتهي بالصوت المهموس /p/ فيأخذ /t/.',
					'خطأ: need ينتهي بـ /d/ فيأخذ /id/.',
					'خطأ: share ينتهي بصوت علة/r فيأخذ /d/.'
				],
				explanationAr: 'الفعل helped ينتهي أصله بالصوت المهموس /p/ فينطق -ed بصوت /t/.'
			},
			{
				questionAr: 'Which word has its final "-s" pronounced /iz/?',
				options: ['volunteers', 'blankets', 'villages', 'doctors'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: volunteers تنتهي بصوت /r/ مجهور فتأخذ /z/.',
					'خطأ: blankets تنتهي بصوت /t/ مهموس فتأخذ /s/.',
					'صحيح! village تنتهي بصوت /ge/ الصفيري فتأخذ /iz/.',
					'خطأ: doctors تأخذ /z/.'
				],
				explanationAr: 'الكلمات المنتهية بأصوات الصفير مثل -ge في villages تنطق نهايتها /iz/.'
			},
			{
				questionAr: 'Identify the pronunciation of final "-s" in "tents, packs, roofs":',
				options: ['/s/', '/z/', '/iz/', '/id/'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! تنتهي الكلمات الثلاث بأصوات مهموسة (/t/, /k/, /f/) فتأخذ /s/.',
					'خطأ: الأصوات /t, k, f/ مهموسة لا مجهورة.',
					'خطأ: ليست من أصوات الصفير.',
					'خطأ: /id/ خاص بنهاية -ed لا -s.'
				],
				explanationAr: 'الأصوات المهموسة /p, t, k, f, th/ تجعل النهاية -s تنطق /s/.'
			},
			{
				questionAr: 'Find the ODD word out in final "-ed" pronunciation:',
				options: ['cleaned', 'offered', 'carried', 'reached'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: cleaned تنطق /d/.',
					'خطأ: offered تنطق /d/.',
					'خطأ: carried تنطق /d/.',
					'صحيح! reached تنتهي بصوت /ch/ المهموس فتنطق /t/ بينما البقية تنطق /d/.'
				],
				explanationAr: 'الكلمات الثلاث الأولى تنطق /d/، أما reached فتنطق /t/ لأن /ch/ صوت مهموس.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t3_opinion_speech',
		slug: 'eng-2as-lp-t3-opinion-speech',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: No Man is an Island (التضامن والكوارث والتطوع)',
		order: 4,
		titleAr: 'كتابة مقال رأي أو خطاب تضامني (Opinion Essay / Speech — 5 pts)',
		objectives: [
			'بناء مقال رأي أو خطاب إنساني منظم من مقدمة وعرض وخاتمة (100 إلى 120 كلمة)',
			'استعمال عبارات إبداء الرأي والخطابة والتسلسل المنطقي (First, Moreover, In conclusion)',
			'الالتزام بمعايير التنقيط الرسمية للوضعية الإدماجية في شعبة آداب وفلسفة (5 نقاط)'
		],
		keywordsAr: ['Opinion Essay', 'Humanitarian Speech', 'Written Expression', 'Solidarity', 'التعبير الكتابي'],
		discover: {
			scenarioAr:
				'في ختام وحدة No Man is an Island يطلب منك كتابة خطاب قصير لزملائك (Speech) أو مقال رأي (Opinion Essay) لحثهم على المشاركة في حملة تضامن مدرسية وتطوعية. سر العلامة الكاملة هو البناء الواضح والروابط المنطقية والأمثلة الواقعية.',
			svg: svgEnglishWritingStructure({
				title: 'Opinion Essay / Humanitarian Speech Blueprint (5 pts)',
				steps: [
					{ stage: 'Opening', detail: 'Greet audience (Speech) or state clear thesis (Essay).' },
					{ stage: 'Body 1', detail: 'First argument + real solidarity example (First, ...).' },
					{ stage: 'Body 2', detail: 'Second argument + concession (Moreover, Although...).' },
					{ stage: 'Closing', detail: 'Call to action + memorable closing (In conclusion, ...).' }
				]
			}),
			steps: [
				{
					promptAr:
						'ما الفرق الأساسي في البداية بين خطاب موجه للتلاميذ (Speech) ومقال رأي (Opinion Essay)؟',
					hintAr: 'كيف يخاطب المتحدث جمهوره مباشرة مقارنة بكاتب المقال؟',
					expectedInput: 'الخطاب يبدأ بتحية الجمهور وضمائر المخاطب (we/you) والمقال يبدأ بجملة تمهيدية موضوعية',
					revealAr:
						'الخطاب (Speech) يبدأ بتحية مثل "Dear teachers and fellow students," ويستخدم ضمير الجماعة we ونداء للعمل، أما المقال (Opinion Essay) فيبدأ بجملة تمهيدية وأطروحة رأي واضحة مثل "I firmly believe that...".'
				},
				{
					promptAr:
						'أي من هذه الروابط أنسب للانتقال إلى الحجة الثانية: (a) Furthermore / Moreover أم (b) Yesterday؟',
					hintAr: 'نحتاج أداة إضافة منطقية للحجج.',
					expectedInput: 'Furthermore / Moreover',
					revealAr:
						'نستخدم أدوات الترتيب والإضافة (First, Second, Moreover, Furthermore, In addition) لمنح الفقرة تماسكا منطقيا يرفع علامة التماسك (Coherence).'
				},
				{
					promptAr:
						'اقرأ الجملة الختامية: "In conclusion, solidarity turns small acts of kindness into real hope for families in need." ما العنصر الذي يميز هذه الخاتمة؟',
					hintAr: 'هل تلخص الرسالة الأساسية بإيجاز وقوة؟',
					expectedInput: 'تلخيص الفكرة الجامعة بوضوح وإيجاز مؤثر',
					revealAr:
						'الخاتمة الجيدة تلخص الموقف دون تكرار حرفي وتترك رسالة أخلاقية وإنسانية محفزة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'البنية القياسية (3 فقرات موجزة): مقدمة (Opening & Thesis) + عرض بحجتين ومثال واقعي (Body) + خاتمة ودعوة إيجابية (Conclusion).',
				'عبارات إبداء الرأي: In my view, / I firmly believe that... / It is essential that we...',
				'روابط التماسك: للترتيب (First, Secondly)، للإضافة (Moreover, Furthermore)، للاستدراك (Although, Despite)، للختم (In conclusion, To sum up).',
				'معايير تقييم الوضعية الإدماجية (5 نقاط في 2AS LP): ملاءمة الموضوع واستثمار الملاحظات (Relevance)، ترابط الأفكار (Coherence)، سلامة اللغة والهجاء (Correctness)، والإبداع والوضوح (Excellence).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Essential Phrases for Opinion & Speech',
				rootLabel: 'Cohesive Writing Toolkit',
				rootSub: 'Use 1 phrase per paragraph stage',
				branches: [
					{
						label: 'Opening',
						rule: 'Speech vs Essay',
						example: 'Dear friends, / I firmly believe...'
					},
					{
						label: 'Adding Ideas',
						rule: 'Support arguments',
						example: 'First, ... Moreover, ...'
					},
					{
						label: 'Examples',
						rule: 'Make ideas concrete',
						example: 'For instance, youth volunteers...'
					},
					{
						label: 'Conclusion',
						rule: 'Summarize & inspire',
						example: 'To sum up, let us act together.'
					}
				]
			}),
			visualCaptionAr: 'بنك العبارات الجاهزة لصياغة مقال رأي أو خطاب تضامني متماسك',
			examples: [
				{
					problemAr: 'Write a strong opening for a speech about school volunteering during winter.',
					solutionAr: 'Dear teachers and classmates, today I invite you all to remember that no man is an island. Every winter, families in remote areas need our warmth and support.'
				},
				{
					problemAr: 'Write a body sentence combining concession and opinion about youth charity.',
					solutionAr: 'Although students have busy schedules, I strongly believe that dedicating one hour a week to charity builds a compassionate society.'
				}
			],
			watchOutAr:
				'تجنب كتابة جمل طويلة جدا بلا نقاط أو فواصل، وتجنب نسخ جمل نص الفهم حرفيا؛ استثمر الملاحظات المعطاة في الموضوع الأول (Topic One) بأسلوبك الخاص مع مراجعة الأزمنة والهجاء.'
		},
		practice: [
			{
				questionAr: 'Which opening is most appropriate for a humanitarian SPEECH to classmates?',
				options: [
					'Dear Sir or Madam, I am writing to apply for a job.',
					'Dear teachers and fellow students, let us join hands to support flood victims.',
					'Once upon a time in a quiet village, there was a bridge.',
					'In conclusion, volunteering is very helpful for everyone.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذه بداية رسالة طلب عمل رسمية.',
					'صحيح! تحية مباشرة للجمهور مع إعلان موضوع الخطاب.',
					'خطأ: هذه بداية قصة سردية خيالية.',
					'خطأ: In conclusion تستعمل في الخاتمة لا المقدمة.'
				],
				explanationAr: 'يبدأ الخطاب بتحية الحضور وتوجيه نداء واضح ومباشر حول الموضوع.'
			},
			{
				questionAr: 'Which connector best introduces a SECOND supporting argument in an opinion essay?',
				options: ['Finally', 'Moreover', 'Because of', 'Despite'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Finally للختام أو النقطة الأخيرة.',
					'أحسنت! Moreover أداة إضافة قوية لتقديم الحجة الثانية.',
					'خطأ: Because of للسبب متبوعا باسم.',
					'خطأ: Despite للاستدراك لا للإضافة.'
				],
				explanationAr: 'نستخدم Moreover أو Furthermore لإضافة حجة جديدة تدعم الرأي نفسه.'
			},
			{
				questionAr: 'What should a student do with the bullet notes in Topic One (Guided)?',
				options: [
					'Copy them as an unpunctuated list without verbs',
					'Ignore them completely and write about another subject',
					'Expand them into full, linked sentences with examples and connectors',
					'Translate them into Arabic inside the English paragraph'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: يجب صياغتها في جمل تامة ومتماسكة لا مجرد قائمة.',
					'خطأ: تجاهل الملاحظات ينقص علامة الملاءمة.',
					'ممتاز! توسيع الملاحظات إلى فقرات متماسكة بالروابط هو المطلوب.',
					'خطأ: التعبير يجب أن يكون بالإنجليزية السليمة فقط.'
				],
				explanationAr: 'الملاحظات المرفقة بالموضوع الموجه توظف وتوسع إلى جمل تامة مترابطة.'
			},
			{
				questionAr: 'Choose the strongest concluding sentence for a solidarity opinion essay:',
				options: [
					'That is all I know about disasters.',
					'In conclusion, active solidarity strengthens social bonds and brings dignity to those in hardship.',
					'First, people should donate blankets and food.',
					'Volunteering is good and okay.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عبارة ضعيفة وغير أكاديمية.',
					'صحيح! خاتمة رسمية تلخص القيمة الإنسانية بوضوح وأناقة.',
					'خطأ: First لبداية العرض لا الخاتمة.',
					'خطأ: تعبير سطحي وغير رسمي.'
				],
				explanationAr: 'تتميز الخاتمة الجيدة بلغة رسمية موجزة تلخص الرسالة المركزية.'
			},
			{
				questionAr: 'Which sentence combines a concession linker and a clear opinion smoothly?',
				options: [
					'Although volunteering takes time, it teaches youth empathy and responsibility.',
					'Although volunteering takes time, but it teaches youth empathy.',
					'Despite volunteering takes time, it teaches youth empathy.',
					'Volunteering takes time. Although, it teaches empathy.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! جملة استدراك سليمة نحويا ومقنعة في مقال الرأي.',
					'خطأ: لا يجوز الجمع بين Although و but.',
					'خطأ: Despite لا يتبعها فاعل وفعل مباشر.',
					'خطأ: Although لا تقع وحدها قبل فاصلة بهذه الطريقة.'
				],
				explanationAr: 'الجملة الأولى توظف Although + Clause + comma + Main Clause بدقة نحوية كاملة.'
			}
		]
	}
];
