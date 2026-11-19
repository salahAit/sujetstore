import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation,
	svgEnglishWritingStructure
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

// ═══════════════════════════════════════════════════════════════════════════════
// 3AS BAC Scientific & Management Shared (3as_se, 3as_tm, 3as_math, 3as_ge) — T3
// Unit 3: Are We Alone? (Astronomy & Solar System)
// Unit 4: We Are a Family! (Solidarity & Moral Values) + BAC Methodology (8+7+5)
// 5 Concise, Self-Sufficient BAC Lessons
// ═══════════════════════════════════════════════════════════════════════════════

export const LESSONS_3AS_SCI_T3: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 1: Conditionals Types 1, 2 & 3 + Unless (If...not)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t3_conditionals_unless',
		slug: 'eng-3as-sci-conditionals-unless',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Are We Alone? (علم الفلك والمجموعة الشمسية)',
		order: 1,
		titleAr: 'الجمل الشرطية (Conditionals 1, 2, 3) واستعمال Unless في البكالوريا',
		objectives: [
			'التمييز الدقيق بين أنواع الجمل الشرطية الثلاثة (Type 1, Type 2, Type 3) وأزمنة أفعالها',
			'إتقان قاعدة التحويل الذهبية بين If...not و Unless دون الوقوع في خطأ النفي المزدوج',
			'تطبيق الشرط التخيلي (Type 2) في نصوص الفلك والفضاء بدقة نحوية كاملة'
		],
		keywordsAr: ['Conditional Type 1', 'Conditional Type 2', 'Conditional Type 3', 'Unless', 'Astronomy'],
		discover: {
			scenarioAr:
				'في نصوص علم الفلك، يتأمل العلماء دقة خلق الكون ويتصورون فرضيات فضائية: "If Earth were closer to the Sun, oceans would evaporate" (Type 2: خيالي)، و "Unless satellites orbit accurately, weather forecasts will fail" (Unless = If...not).',
			svg: svgEnglishGrammarMap({
				title: 'BAC Conditionals Types 1, 2 & 3',
				rootLabel: 'Match the Two Halves Correctly',
				rootSub: 'If-clause determines the exact Main-clause form',
				branches: [
					{
						label: 'Type 1 (Real Future)',
						rule: 'If + Present Simple, will + stem',
						example: 'If skies clear, we will see Mars.'
					},
					{
						label: 'Type 2 (Imaginary)',
						rule: 'If + Past Simple, would + stem',
						example: 'If I had a telescope, I would study stars.'
					},
					{
						label: 'Type 3 (Past Regret)',
						rule: 'If + had + PP, would have + PP',
						example: 'If it had hit Earth, craters would have formed.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما نوع الشرط في الجملة: "If a giant comet hit Earth, temperatures would drop sharply"؟',
					hintAr: 'تأمل الفعل hit (ماضٍ بسيط هنا) والفعل would drop.',
					expectedInput: 'Type 2',
					revealAr:
						'إنه الشرط من النوع الثاني (Type 2): If + Past Simple, Subject + would + stem، ويستعمل للفرضيات العلمية التخيلية في الحاضر أو المستقبل.'
				},
				{
					promptAr: 'ما المعنى الحرفي لأداة الشرط "Unless"؟',
					hintAr: 'إنها تختصر كلمتين: أداة الشرط مع النفي.',
					expectedInput: 'If not',
					revealAr:
						'تساوي كلمة Unless تماما "If ... not" (إذا لم / ما لم)، لذا تحمل النفي في داخلها!'
				},
				{
					promptAr: 'عند تحويل "If astronomers do not calibrate the mirror, images will be blurred" إلى "Unless"، ماذا نحذف؟',
					hintAr: 'تذكر أن Unless تحمل معنى النفي أصلا.',
					expectedInput: 'do not',
					revealAr:
						'نحذف If والنفي (do not)، فتصبح الجملة مثبتة بعد Unless: Unless astronomers calibrate the mirror, images will be blurred.'
				}
			]
		},
		summary: {
			rulesAr: [
				'النوع الأول (Type 1 - ممكن التحقق): If + Present Simple, S + will (can/may) + stem.',
				'النوع الثاني (Type 2 - تخيلي غير واقعي الآن): If + Past Simple (were مع to be لكل الضمائر), S + would (could/might) + stem.',
				'النوع الثالث (Type 3 - ندم أو فرضية في الماضي): If + Past Perfect (had + PP), S + would have + PP.',
				'قاعدة التحويل مع Unless (مضمونة في البكالوريا): (1) إذا كانت جملة If منفية: نحذف if + النفي (do not / does not / did not) ونضع Unless ونصرف الفعل في الإثبات (مع s للغائب المفرد في المضارع!). (2) إذا كانت جملة If مثبتة: نضع Unless مكان If ونعكس إثبات/نفي الجملة الثانية (جواب الشرط) للحفاظ على المعنى!'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Unless = If ... not Golden Transformation',
				tenseName: 'Never put a negative verb right after Unless!',
				formula: 'If S + do not/does not + V  becomes  Unless + S + V(positive)',
				activeZone: 'future',
				example: 'If he does not study, he will fail = Unless he studies, he will fail.',
				markers: 'unless, if...not, Type 1, Type 2, Type 3'
			}),
			visualCaptionAr: 'القاعدة البصرية لتحويل If...not إلى Unless دون خطأ في تصريف الغائب المفرد',
			examples: [
				{
					problemAr: 'a) If the probe does not receive solar energy, it will stop sending data. (Rewrite with: Unless)',
					solutionAr: 'b) Unless the probe receives solar energy, it will stop sending data.'
				},
				{
					problemAr: 'a) If governments invest in space science, weather prediction will improve. (Rewrite with: Unless)',
					solutionAr: 'b) Unless governments invest in space science, weather prediction will not improve.'
				},
				{
					problemAr: 'a) Put in the right tense: "If Mars (have) a thick atmosphere, liquid water (remain) on its surface."',
					solutionAr: 'b) If Mars had a thick atmosphere, liquid water would remain on its surface. (Type 2)'
				}
			],
			watchOutAr:
				'انتبه لخطأ الغائب المفرد عند حذف "does not"! في الجملة "If the satellite does not orbit properly"، عندما تحذف does not بعد Unless يجب إعادة الحرف -s إلى الفعل: "Unless the satellite orbits properly"!'
		},
		practice: [
			{
				questionAr: 'Rewrite: "If the telescope does not focus clearly, astronomers will miss the eclipse." Start with "Unless":',
				options: [
					'Unless the telescope focuses clearly, astronomers will miss the eclipse.',
					'Unless the telescope does not focus clearly, astronomers will miss the eclipse.',
					'Unless the telescope focus clearly, astronomers will miss the eclipse.',
					'Unless the telescope focuses clearly, astronomers will not miss the eclipse.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! حذفنا does not وأعدنا -es للفعل focuses لأن الفاعل مفرد (the telescope).',
					'خطأ: لا نجمع بين Unless والنفي does not في نفس الجملة.',
					'خطأ: نسيت إضافة -es للفعل مع الفاعل المفرد the telescope.',
					'خطأ: غيّرت معنى الجملة الثانية دون داعٍ لأن الجملة الأولى كانت منفية أصلا.'
				],
				explanationAr: 'حذفنا if و does not وأضفنا es للفعل focus لأن الفاعل مفرد غائب: Unless the telescope focuses clearly.'
			},
			{
				questionAr: 'Complete (Conditional Type 2): "If humans ........ on Mercury, they would face extreme heat."',
				options: ['live', 'lived', 'will live', 'have lived'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: جواب الشرط فيه would face (النوع الثاني) لذا نحتاج الماضي البسيط.',
					'صحيح! Conditional Type 2 يجمع بين Past Simple (lived) و would + stem.',
					'خطأ: لا نضع will في جملة If.',
					'خطأ: لا نستعمل Present Perfect في النوع الثاني.'
				],
				explanationAr: 'وجود would face في جواب الشرط يفرض Past Simple في جملة الشرط: lived.'
			},
			{
				questionAr: 'Complete (Conditional Type 3): "If early engineers had noticed the leak, the rocket ........ safely."',
				options: ['will launch', 'would launch', 'would have launched', 'launched'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا زمن النوع الأول.',
					'خطأ: هذا جواب النوع الثاني، أما جملة الشرط هنا فهي Past Perfect (had noticed).',
					'رائع! Type 3: If + had + PP يأخذ في جواب الشرط would have + Past Participle.',
					'خطأ: نحتاج would have + PP في جواب الشرط من النوع الثالث.'
				],
				explanationAr: 'بما أن فعل الشرط في الماضي التام (had noticed)، فجواب الشرط من النوع الثالث هو would have launched.'
			},
			{
				questionAr: 'Rewrite a POSITIVE If-clause with "Unless": "If we protect our atmosphere, life will stay balanced."',
				options: [
					'Unless we protect our atmosphere, life will stay balanced.',
					'Unless we do not protect our atmosphere, life will stay balanced.',
					'Unless we protected our atmosphere, life will stay balanced.',
					'Unless we protect our atmosphere, life will not stay balanced.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: عكست معنى الجملة الأصلية تماما.',
					'خطأ: لا نضع do not بعد Unless.',
					'خطأ: حولت الزمن للماضي وعكست المعنى.',
					'ممتاز! بما أن جملة If الأصلية مثبتة، نضع Unless وننفي جواب الشرط (will not stay) للحفاظ على نفس المعنى.'
				],
				explanationAr: 'عندما تكون جملة If مثبتة، نحول If إلى Unless ونعكس قطبية الجملة الثانية (will stay تصبح will not stay).'
			},
			{
				questionAr: 'Which sentence is grammatically CORRECT for Conditional Type 2 with "to be"?',
				options: [
					'If Jupiter were closer to the Sun, its icy moons would melt.',
					'If Jupiter is closer to the Sun, its icy moons would melt.',
					'If Jupiter were closer to the Sun, its icy moons will melt.',
					'If Jupiter had been closer to the Sun, its icy moons would melt tomorrow.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! If + Past Simple (were) مع would + stem (would melt).',
					'خطأ: لا نخلط بين المضارع is وبين would.',
					'خطأ: لا نخلط بين were وبين will.',
					'خطأ: لا نخلط النوع الثالث (had been) بظرف مستقبل (tomorrow) هنا.'
				],
				explanationAr: 'في الشرط التخيلي (Type 2) نستعمل were مع المفرد والجمع في جملة الشرط و would + stem في النتيجة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 2: Reported Speech (Statements, Questions & Advice)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t3_reported_speech',
		slug: 'eng-3as-sci-reported-speech',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Are We Alone? (علم الفلك والمجموعة الشمسية)',
		order: 2,
		titleAr: 'الكلام المنقول (Reported Speech): الجمل الخبرية والأسئلة والنصائح',
		objectives: [
			'تطبيق جدول تراجع الأزمنة (Backshift) والضمائر وظروف الزمان والمكان بدقة عند وجود فعل نقل في الماضي',
			'نقل أسئلة Yes/No باستعمال if/whether وأسئلة Wh- بترتيب جملة خبرية دون do/does/did',
			'معرفة متى لا نغيّر الزمن في الكلام المنقول (فعل نقل مضارع أو حقيقة علمية فلكية ثابتة)'
		],
		keywordsAr: ['Reported Speech', 'Backshift', 'Reported Questions', 'If / Whether', 'Advice'],
		discover: {
			scenarioAr:
				'في تقارير الفضاء والمقابلات العلمية بالبكالوريا، يُطلب منك نقل أقوال العلماء وأسئلتهم. قارن: المباشر: The astronomer said, "We discovered a new comet yesterday." المنقول: The astronomer said that they had discovered a new comet the day before.',
			svg: svgEnglishTenseTimeline({
				title: 'Reported Speech Tense Backshift',
				tenseName: 'Reporting Verb in Past (said / asked / told)',
				formula: 'Present becomes Past | Past / Present Perfect becomes Past Perfect | will becomes would',
				activeZone: 'two_past',
				example: '"Mars is dry," he said. He said that Mars was dry.',
				markers: 'now=then, today=that day, yesterday=the day before, tomorrow=the next day'
			}),
			steps: [
				{
					promptAr: 'عند نقل سؤال "Where does the satellite orbit?" باستعمال "The journalist asked"، هل نُبقي الفعل المساعد "does"؟',
					hintAr: 'السؤال المنقول يصبح جملة خبرية عادية دون علامة استفهام.',
					expectedInput: 'no',
					revealAr:
						'نحذف do / does / did تماما ونرتب الجملة (فاعل ثم فعل في الماضي): The journalist asked where the satellite orbited.'
				},
				{
					promptAr: 'بم نربط سؤال Yes/No (الذي يبدأ بـ Do / Did / Is / Can / Will) عند نقله؟',
					hintAr: 'كلمتان مترادفتان للربط في الأسئلة التي جوابها نعم أو لا.',
					expectedInput: 'if / whether',
					revealAr:
						'نربط أسئلة Yes/No بـ if أو whether، ثم نكتب الفاعل ثم الفعل المصرف ونحذف علامة الاستفهام (مثال: He asked if astronauts could land on Mars).'
				},
				{
					promptAr: 'هل نغيّر زمن الجملة إذا كان فعل النقل في المضارع (The scientist says, "...") أو كانت حقيقة علمية ثابتة؟',
					hintAr: 'تأمل جملة: The teacher explains that the Earth orbits the Sun.',
					expectedInput: 'no',
					revealAr:
						'لا نغيّر الزمن أبدا عندما يكون فعل النقل في المضارع (says / asks / tells) أو عند نقل حقيقة علمية كونية ثابتة (مثل دوران الأرض حول الشمس)!'
				}
			]
		},
		summary: {
			rulesAr: [
				'جدول تراجع الأزمنة (عندما يكون فعل النقل في الماضي: said, told, asked): Present Simple يصبح Past Simple | Present Continuous يصبح Past Continuous | Past Simple و Present Perfect يصبحان Past Perfect (had + PP) | will=would, can=could, may=might, must=had to.',
				'تغيير الظروف: now=then | today=that day | yesterday=the day before | tomorrow=the following day | here=there | this=that | these=those.',
				'نقل الأسئلة (Reported Questions): نحذف علامة الاستفهام ونعيد الترتيب (Subject + Verb) ونحذف do/does/did! مع Wh- نحتفظ بأداة السؤال (what, where, how)، ومع Yes/No نربط بـ if أو whether.',
				'نقل الأوامر والنصائح (Imperatives): الفعل المثبت يصبح (told / advised / warned + object + to + stem)، والنهي Don\'t يصبح (not to + stem).',
				'استثناء البكالوريا الذهبي: إذا كان فعل النقل مضارعا (He says / He asks) نغيّر الضمائر فقط ولا نغيّر الأزمنة!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Reported Speech: 3 Sentence Types',
				rootLabel: 'Drop Quotation Marks & Adjust Pronouns',
				rootSub: 'No backshift if reporting verb is Present (says / asks)',
				branches: [
					{
						label: 'Statements',
						rule: 'said (that) + S + backshift V',
						example: 'He said that they had seen Saturn.'
					},
					{
						label: 'Questions',
						rule: 'asked + wh / if + S + V (no ?)',
						example: 'She asked if Mars had water.'
					},
					{
						label: 'Orders & Advice',
						rule: 'told / advised + obj + (not) to + stem',
						example: 'He advised us not to look at the Sun.'
					}
				]
			}),
			visualCaptionAr: 'ملخص الأنواع الثلاثة للكلام المنقول التي تتكرر في البكالوريا العلمية',
			examples: [
				{
					problemAr: 'a) The astronomer said: "We will launch a weather satellite tomorrow." (Rewrite starting with: The astronomer said)',
					solutionAr: 'b) The astronomer said that they would launch a weather satellite the following day.'
				},
				{
					problemAr: 'a) The student asked: "How far is the Moon from Earth?" (Rewrite starting with: The student asked)',
					solutionAr: 'b) The student asked how far the Moon was (or: is) from Earth.'
				},
				{
					problemAr: 'a) The teacher told us: "Do not look directly at the solar eclipse." (Rewrite starting with: The teacher warned us)',
					solutionAr: 'b) The teacher warned us not to look directly at the solar eclipse.'
				}
			],
			watchOutAr:
				'احذر فخ الأسئلة المنقولة في البكالوريا: لا تكتب أبدا "He asked where did the comet go?"؛ احذف did وعلامة الاستفهام وحول go إلى had gone: "He asked where the comet had gone."!'
		},
		practice: [
			{
				questionAr: 'Report: The scientist said, "Our observatory tracked an asteroid last night."',
				options: [
					'The scientist said that their observatory had tracked an asteroid the previous night.',
					'The scientist said that our observatory tracked an asteroid last night.',
					'The scientist said that their observatory tracks an asteroid the previous night.',
					'The scientist said that their observatory will track an asteroid last night.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! غيّرنا الضمير (our إلى their) والزمن (Past Simple إلى Past Perfect) والظرف (last night إلى the previous night).',
					'خطأ: لم تغيّر الضمير ولا الزمن ولا ظرف الزمان.',
					'خطأ: حوّلت الزمن للمضارع بدل Past Perfect.',
					'خطأ: الزمن وظرف الزمان خاطئان.'
				],
				explanationAr: 'لأن فعل النقل في الماضي (said)، يتحول الماضي البسيط tracked إلى الماضي التام had tracked، و our إلى their، و last night إلى the previous night.'
			},
			{
				questionAr: 'Report: The reporter asked, "Do space probes send clear photos?"',
				options: [
					'The reporter asked if did space probes send clear photos.',
					'The reporter asked if space probes sent clear photos.',
					'The reporter asked that space probes sent clear photos.',
					'The reporter asked whether space probes send clear photos?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نُبقي الفعل المساعد did في السؤال المنقول.',
					'صحيح! ربطنا بـ if وحذفنا Do وحولنا الفعل إلى الماضي sent مع نقطة في النهاية.',
					'خطأ: لا نربط الأسئلة بـ that بل بـ if/whether.',
					'خطأ: يجب تحويل الزمن للماضي وحذف علامة الاستفهام.'
				],
				explanationAr: 'في سؤال Yes/No نربط بـ if، نحذف Do، ونضع الفاعل ثم الفعل في الماضي البسيط (sent) دون علامة استفهام.'
			},
			{
				questionAr: 'Report (Present reporting verb): The lecturer says, "Satellites help predict storms."',
				options: [
					'The lecturer says that satellites had helped predict storms.',
					'The lecturer says that satellites would help predict storms.',
					'The lecturer says that satellites help predict storms.',
					'The lecturer said that satellites helped predict storms yesterday.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: فعل النقل says في المضارع فلا نرجع الزمن للوراء.',
					'خطأ: لا نغيّر الزمن عندما يكون فعل النقل في المضارع.',
					'رائع! فعل النقل في المضارع (says) لذا يبقى الزمن كما هو (help).',
					'خطأ: غيّرت فعل النقل وأضفت ظرفا غير موجود.'
				],
				explanationAr: 'إذا كان فعل النقل مضارعا (says) لا يحدث تراجع للأزمنة (No backshift).'
			},
			{
				questionAr: 'Report the advice: The guide told the visitors, "Never touch the telescope lens."',
				options: [
					'The guide told the visitors to never touched the telescope lens.',
					'The guide told the visitors that do not touch the telescope lens.',
					'The guide told the visitors not touching the telescope lens.',
					'The guide told the visitors not to touch the telescope lens.'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: بعد to يأتي المصدر المجرد لا الماضي.',
					'خطأ: الأوامر والنواهي تُنقل بـ (not) to + stem لا بـ that.',
					'خطأ: نحتاج not to + stem لا Gerund.',
					'أحسنت! النهي يُنقل بصيغة: told + object + not to + stem.'
				],
				explanationAr: 'صيغة نقل النهي أو التحذير هي: told / warned + object + not to + bare infinitive.'
			},
			{
				questionAr: 'Report the Wh-question: He asked me, "Why did Al-Biruni measure the Earth?"',
				options: [
					'He asked me why Al-Biruni had measured the Earth.',
					'He asked me why did Al-Biruni measure the Earth.',
					'He asked me if why Al-Biruni had measured the Earth.',
					'He asked me why had Al-Biruni measured the Earth?'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! حذفنا did، وأبقينا أداة السؤال why ثم الفاعل ثم had measured.',
					'خطأ: يجب حذف did من السؤال المنقول.',
					'خطأ: لا نجمع بين if وأداة السؤال why.',
					'خطأ: عكست الترتيب (had قبل الفاعل) وأبقيت علامة الاستفهام.'
				],
				explanationAr: 'في سؤال Wh- المنقول نحذف did ونرتب (أداة السؤال + الفاعل + had + PP) دون علامة استفهام.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 3: Comparing Planets (Similarity & Difference) & Space Measurements
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t3_similarity_astronomy',
		slug: 'eng-3as-sci-similarity-astronomy',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'الوحدة 3: Are We Alone? (علم الفلك والمجموعة الشمسية)',
		order: 3,
		titleAr: 'المقارنة والاختلاف (Similarity & Difference) وقياسات الفضاء وإسهامات علماء المسلمين في الفلك',
		objectives: [
			'المقارنة بين الكواكب والأجرام بدقة باستعمال أدوات التشابه (like, similar to, both...and) والاختلاف (unlike, whereas, while)',
			'طرح الأسئلة والإجابة عن الأبعاد والقياسات الفضائية (How far / wide / heavy / deep + Passive Voice)',
			'استثمار رصيد علمي مشرف حول رواد الفلك المسلمين (Al-Biruni, Al-Khwarizmi, Ibn al-Haytham) ودقة خلق الكون'
		],
		keywordsAr: ['Unlike', 'Whereas', 'Both...and', 'Dimensions', 'Al-Biruni', 'Ibn al-Haytham'],
		discover: {
			scenarioAr:
				'تأمل في دقة خلق السماوات والأرض ونظام المدارات الكونية، وكيف أسهم علماء المسلمين مثل البيروني (Al-Biruni) والخوارزمي (Al-Khwarizmi) وابن الهيثم (Ibn al-Haytham) في تأسيس علم الفلك والبصريات. اقرأ المقارنة: "Unlike Mars, which is a rocky planet, Jupiter is a gas giant." و "Both Earth and Venus orbit the Sun."',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Similarity and Difference in Unit 3',
				rootLabel: 'Comparing Planets & Celestial Bodies',
				rootSub: 'Check whether you compare NOUNS or FULL CLAUSES!',
				branches: [
					{
						label: 'Similarity (+ Noun)',
						rule: 'Like / Similar to / Both...and',
						example: 'Like Earth, Mars has polar ice.'
					},
					{
						label: 'Difference (+ Noun)',
						rule: 'Unlike / Different from',
						example: 'Unlike Venus, Earth supports life.'
					},
					{
						label: 'Difference (+ Clause)',
						rule: 'Whereas / While + S + V',
						example: 'Earth has 1 moon, whereas Mars has 2.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق النحوي بين "Unlike" و "Whereas" عند المقارنة بين كوكبين؟',
					hintAr: 'انظر ما يأتي بعد كل أداة: اسم فقط أم فاعل وفعل؟',
					expectedInput: 'noun vs clause',
					revealAr:
						'يأتي بعد Unlike اسم (Unlike Saturn, Mercury has no rings)، أما Whereas و While فتتبعها جملة كاملة (فاعل + فعل): Saturn has rings, whereas Mercury has none.'
				},
				{
					promptAr: 'كيف نسأل عن المسافة (distance) وعن القطر/العرض (diameter/width) وعن الوزن/الكتلة في الفضاء؟',
					hintAr: 'نبدأ دائما بـ How متبوعة بالصفة المناسبة.',
					expectedInput: 'How far / How wide / How heavy',
					revealAr:
						'للمسافة: How far is the Moon from Earth? للقطر أو العرض: How wide is Mars? للوزن: How heavy is the satellite? وللسرعة: How fast does Earth orbit?'
				},
				{
					promptAr: 'اذكر عالما مسلما رائدا حسب نصف قطر الأرض بدقة مذهلة قبل ألف عام وآخر أسس علم البصريات اللازم للتلسكوبات.',
					hintAr: 'درست اسمهما في التراث العلمي الإسلامي: البيروني وابن الهيثم.',
					expectedInput: 'Al-Biruni and Ibn al-Haytham',
					revealAr:
						'حسَب العالم المسلم Al-Biruni نصف قطر الأرض بدقة مذهلة، وأرسى Ibn al-Haytham قواعد علم البصريات (Optics)، ووضع Al-Khwarizmi جداول فلكية (Zij) دقيقة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن التشابه (Similarity): Like + Noun, S + V | Both A and B + plural verb | A is similar to B | Neither A nor B (للنفي المشترك).',
				'التعبير عن الاختلاف (Difference): Unlike + Noun, S + V | A is different from B | Clause 1, whereas / while Clause 2 | In contrast to + Noun.',
				'وصف القياسات والأبعاد (Space Measurements): Earth has a diameter of 12,742 km | The Moon is about 384,400 km away from Earth | It takes 365.25 days to orbit the Sun (التركيب: It takes + time + to + stem).',
				'المبني للمجهول في الفلك: يكثر لوصف الاكتشافات والأقمار الصناعية (Weather satellites are used for forecasting / The radius of Earth was calculated by Al-Biruni).'
			],
			visualSvg: svgEnglishWordFormation({
				title: 'Astronomy Measurements & Vocabulary',
				prefix: 'astro-',
				root: 'nom',
				suffix: '-y',
				derivedWord: 'astronomy (علم الفلك)',
				meaningNote: 'Key roots: orbit (يدور/مدار), gravity (جاذبية), diameter (قطر), telescope (تلسكوب), satellite (قمر صناعي)'
			}),
			visualCaptionAr: 'جذور ومفردات وحدة علم الفلك الأساسية لفهم النص والكتابة في البكالوريا',
			examples: [
				{
					problemAr: 'a) Mercury is very hot. Neptune is freezing cold. (Combine with: whereas)',
					solutionAr: 'b) Mercury is very hot, whereas Neptune is freezing cold.'
				},
				{
					problemAr: 'a) Earth rotates around its axis. Mars rotates around its axis too. (Combine with: Both...and)',
					solutionAr: 'b) Both Earth and Mars rotate around their axes.'
				},
				{
					problemAr: 'a) Ask a question on the underlined info: "The Moon is 384,400 km away from Earth."',
					solutionAr: 'b) How far is the Moon from Earth?'
				}
			],
			watchOutAr:
				'انتبه لقاعدة الفعل مع "Both ... and": الفاعل جمع دائما! فنقول "Both Al-Biruni and Al-Khwarizmi were great scholars" (وليس was)، و "Both Earth and Mars orbit the Sun" (دون s).'
		},
		practice: [
			{
				questionAr: 'Combine with "Unlike": "Earth has a breathable atmosphere. The Moon has no atmosphere."',
				options: [
					'Unlike Earth, the Moon has no atmosphere.',
					'Unlike Earth has a breathable atmosphere, the Moon has no atmosphere.',
					'Earth has a breathable atmosphere unlike the Moon has no atmosphere.',
					'Unlike the Moon has no atmosphere, Earth has one.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! Unlike يتبعها اسم فقط (Earth) ثم فاصلة ثم جملة المقارنة.',
					'خطأ: لا نضع جملة فعلية كاملة مباشرة بعد Unlike.',
					'خطأ: Unlike لا تربط بين جملتين فعليتين كاملتين.',
					'خطأ: جاءت جملة فعلية بعد Unlike بدل اسم.'
				],
				explanationAr: 'أداة المقارنة Unlike يتبعها اسم أو عبارة اسمية فقط (Unlike Earth, ...).'
			},
			{
				questionAr: 'Choose the right connector: "Inner planets are rocky, ........ outer planets are mainly gaseous."',
				options: ['unlike', 'whereas', 'similar to', 'both'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد الفراغ جملة كاملة (فاعل وفعل) وليس اسما فقط.',
					'صحيح! whereas تربط بين جملتين كاملتين متقابلتين في المعنى.',
					'خطأ: similar to للتشابه وتتبعها عبارة اسمية.',
					'خطأ: both للتشابه وتأتي مع and.'
				],
				explanationAr: 'للمقابلة بين جملتين كاملتين (Subject + Verb) نستعمل whereas أو while.'
			},
			{
				questionAr: 'Complete with the correct verb form: "Both Al-Biruni and Ibn al-Haytham ........ accurate scientific methods."',
				options: ['uses', 'was using', 'used', 'has used'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الفاعل جمع (شخصان) والزمن ماضٍ تاريخي.',
					'خطأ: was للمفرد وليس للجمع.',
					'رائع! الماضي البسيط used يطابق السياق التاريخي والفاعل الجمع.',
					'خطأ: has للمفرد لا للجمع.'
				],
				explanationAr: 'التركيب Both A and B يعامل معاملة الجمع، والسياق التاريخي يقتضي الماضي البسيط: used.'
			},
			{
				questionAr: 'Which question asks about the distance between Earth and the Sun?',
				options: [
					'How heavy is the Sun?',
					'How wide is the Sun?',
					'How long is the Sun?',
					'How far is the Sun from Earth?'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: How heavy تسأل عن الوزن/الكتلة.',
					'خطأ: How wide تسأل عن العرض أو القطر.',
					'خطأ: How long تسأل عن الطول أو المدة الزمنية.',
					'أحسنت! How far هي الصيغة الدقيقة للسؤال عن المسافة.'
				],
				explanationAr: 'للسؤال عن المسافة (distance) نستعمل دائما How far.'
			},
			{
				questionAr: 'Complete the passive sentence: "Weather satellites ........ to monitor storms and protect communities."',
				options: ['are used', 'is used', 'using', 'was used'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الفاعل جمع (satellites) والحقيقة علمية حاضرة فنستعمل are used.',
					'خطأ: is للمفرد لا للجمع.',
					'خطأ: نحتاج المبني للمجهول (be + PP).',
					'خطأ: was للمفرد الماضي.'
				],
				explanationAr: 'للحقائق العلمية الحاضرة مع فاعل جمع في المبني للمجهول نستعمل are + Past Participle.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 4: Unit 4 — Solidarity, Empathy & Community Values (We Are a Family!)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t3_solidarity_values',
		slug: 'eng-3as-sci-solidarity-values',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'الوحدة 4: We Are a Family! (التضامن والقيم الإنسانية)',
		order: 4,
		titleAr: 'التضامن والتكافل والقيم الأخلاقية (We Are a Family!): القواعد والمفردات',
		objectives: [
			'استعمال الضمائر المتبادلة (each other / one another) والأفعال الناقصة للنصح الأخلاقي (should / ought to)',
			'إتقان اشتقاق أسماء القيم الإنسانية والصفات الإيجابية (generosity, kindness, solidarity, voluntary)',
			'بناء رصيد لغوي وأخلاقي حول الصدقة والعمل التطوعي وإغاثة الجار والمحتاج للوضعية الإدماجية'
		],
		keywordsAr: ['Solidarity', 'Charity', 'Empathy', 'Each other', 'Volunteering', 'Moral Values'],
		discover: {
			scenarioAr:
				'تقوم الوحدة الرابعة على قيم التكافل والرحمة وصلة الرحم والتطوع ومساعدة المحتاجين وقت الشدة، كما في التويزة الجزائرية الأصيلة وحملات الإغاثة: "Neighbours should support one another in hard times. Generosity and kindness strengthen community solidarity."',
			svg: svgEnglishWordFormation({
				title: 'Moral Values Word Formation (Unit 4)',
				prefix: '—',
				root: 'generous',
				suffix: '-ity',
				derivedWord: 'generosity (الكرم والسخاء)',
				meaningNote: 'Adjective to Abstract Noun: kind = kindness | generous = generosity | loyal = loyalty | solid = solidarity'
			}),
			steps: [
				{
					promptAr: 'ما الاسم المجرد (Abstract Noun) المشتق من الصفات: kind و generous و compassionate؟',
					hintAr: 'تذكر لواحق الأسماء: -ness و -ity و -ion.',
					expectedInput: 'kindness / generosity / compassion',
					revealAr:
						'kind تصبح kindness (الرحمة واللطف)، و generous تصبح generosity (الكرم)، و compassionate تصبح compassion (الشفقة والرحمة).'
				},
				{
					promptAr: 'ماذا تعني العبارتان "each other" و "one another" في جملة "Citizens must help one another"؟',
					hintAr: 'إنها تفيد الفعل المتبادل بين أفراد المجتمع (بعضهم بعضا).',
					expectedInput: 'mutual action',
					revealAr:
						'تُسميان الضمائر التبادلية (Reciprocal Pronouns) وتعنيان "بعضهم بعضا" (عادة each other لاثنين و one another لمجموعة أو مجتمع كامل).'
				},
				{
					promptAr: 'كيف نحوّل الفعل "volunteer" (يتطوع) إلى صفة (مثال: عمل تطوعي)؟',
					hintAr: 'تنتهي الصفة باللاحقة -ary.',
					expectedInput: 'voluntary',
					revealAr:
						'الصفة هي voluntary (مثل: voluntary work = عمل تطوعي)، أما الفاعل/الاسم فهو volunteer (متطوع) والنشاط volunteering (التطوع).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الضمائر التبادلية (Reciprocal Pronouns): نستخدم each other (غالبا بين طرفين) و one another (بين أفراد الأسرة والمجتمع): Strong communities support one another during crises.',
				'تقديم النصح والواجب الأخلاقي: Subject + should / ought to + stem (للفعل المستحسن والواجب الأخلاقي) مقابل should not / ought not to + stem.',
				'مقارنة العادات الماضية بالحاضر (Used to): Subject + used to + stem (مثال: Families used to gather regularly to help neighbours harvest crops).',
				'عائلات كلمات الوحدة 4 الأساسية للبكالوريا: generous / generosity | kind / kindness | charity / charitable | volunteer / voluntary | empathy / empathetic | solid / solidarity | cooperate / cooperation / cooperative.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Unit 4: Solidarity Vocabulary & Grammar',
				rootLabel: 'We Are a Family! (Community Values)',
				rootSub: 'Charity, Volunteering, Empathy & Family Ties',
				branches: [
					{
						label: 'Reciprocal Pronouns',
						rule: 'each other / one another',
						example: 'Neighbours help one another.'
					},
					{
						label: 'Moral Duty',
						rule: 'should / ought to + stem',
						example: 'We ought to assist the needy.'
					},
					{
						label: 'Value Nouns',
						rule: '-ness / -ity / -tion',
						example: 'kindness, generosity, cooperation'
					}
				]
			}),
			visualCaptionAr: 'خريطة المراجعة السريعة لقواعد ومفردات الوحدة الرابعة (التضامن والقيم)',
			examples: [
				{
					problemAr: 'Complete with the right noun form: "True (generous) and (kind) bring peace to every neighbourhood."',
					solutionAr: 'True generosity and kindness bring peace to every neighbourhood.'
				},
				{
					problemAr: 'Rewrite using "ought to": "It is our moral duty to visit the elderly and help poor families."',
					solutionAr: 'We ought to visit the elderly and help poor families.'
				},
				{
					problemAr: 'Complete with a reciprocal pronoun: "During snowstorms, villagers share food and shelter with ........ ."',
					solutionAr: 'During snowstorms, villagers share food and shelter with one another (or: each other).'
				}
			],
			watchOutAr:
				'احذر الخطأ الإملائي الشائع في الاشتقاق: عند اشتقاق الاسم من "generous" نحذف u فتصبح "generosity" (وليس generousity)! وعند استعمال "ought" لا تنس أبدا حرف الجر "to" قبل الفعل: ought to help.'
		},
		practice: [
			{
				questionAr: 'Choose the correctly spelled abstract noun derived from "generous":',
				options: ['generosity', 'generousity', 'generousness', 'generotion'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! نحذف الحرف u ونضيف -ity فتصبح generosity.',
					'خطأ إملائي: يجب حذف الحرف u قبل -ity.',
					'خطأ: الاسم القياسي المعتمد هو generosity.',
					'خطأ: هذه الكلمة غير صحيحة.'
				],
				explanationAr: 'الاسم القياسي من generous هو generosity بحذف u وإضافة اللاحقة -ity.'
			},
			{
				questionAr: 'Complete: "Members of a caring society respect and support ........ ."',
				options: ['himself', 'one another', 'itself', 'themselves to'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفاعل جمع وليس مفردا مذكرا.',
					'صحيح! one another ضمير تبادلي يعني بعضهم بعضا.',
					'خطأ: itself لغير العاقل المفرد.',
					'خطأ: لا نضيف to بعد themselves هنا.'
				],
				explanationAr: 'للتعبير عن التضامن المتبادل بين أفراد المجتمع نستعمل الضمير التبادلي one another.'
			},
			{
				questionAr: 'Choose the grammatically CORRECT sentence with "ought to":',
				options: [
					'Young people ought help elderly neighbours.',
					'Young people ought to helping elderly neighbours.',
					'Young people ought to help elderly neighbours.',
					'Young people should to help elderly neighbours.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: نسيت حرف الجر to بعد ought.',
					'خطأ: بعد ought to يأتي المصدر المجرد لا V-ing.',
					'رائع! ought to + bare infinitive (help).',
					'خطأ: should لا يأخذ to بعده أبدا.'
				],
				explanationAr: 'الفعل الناقص ought يرافقه دائما to ثم المصدر المجرد (ought to help)، عكس should.'
			},
			{
				questionAr: 'Choose the adjective form in: "Students organized a ........ campaign to collect winter coats."',
				options: ['volunteer', 'volunteering to', 'voluntarily', 'voluntary'],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: volunteer اسم أو فعل ونحتاج هنا صفة قبل campaign.',
					'خطأ: صيغة غير سليمة قبل الاسم.',
					'خطأ: voluntarily ظرف حال لا صفة.',
					'أحسنت! voluntary صفة تعني تطوعي وتصف الاسم campaign.'
				],
				explanationAr: 'قبل الاسم campaign نحتاج الصفة voluntary (حملة تطوعية).'
			},
			{
				questionAr: 'Which sentence correctly uses "used to" for a past social habit?',
				options: [
					'Algerian villagers used to cooperate in Touiza to build homes together.',
					'Algerian villagers used to cooperating in Touiza to build homes together.',
					'Algerian villagers use to cooperated in Touiza to build homes together.',
					'Algerian villagers used cooperate in Touiza to build homes together.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! التركيب السليم للعادة الماضية هو used to + stem (cooperate).',
					'خطأ: used to (دون be قبلها) يتبعها المصدر المجرد لا V-ing.',
					'خطأ: يجب أن تكون used في الماضي والفعل بعدها في المصدر.',
					'خطأ: نسيت to بين used و cooperate.'
				],
				explanationAr: 'للتعبير عن عادة اجتماعية قديمة نستعمل: Subject + used to + bare infinitive.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// LESSON 5: Complete BAC Scientific English Methodology (8 + 7 + 5 = 20 pts)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_sci_t3_bac_methodology',
		slug: 'eng-3as-sci-bac-methodology',
		grade: '3as_se',
		yearSubjectId: 686,
		trimesterId: 't3',
		sequenceId: 'seq5',
		sequenceTitleAr: 'المحور 5: منهجية البكالوريا الكاملة (8 + 7 + 5 = 20 نقطة)',
		order: 5,
		titleAr: 'منهجية الإجابة النموذجية في بكالوريا الإنجليزية للشعب العلمية والتسيير (8 + 7 + 5)',
		objectives: [
			'توزيع وقت الامتحان (ساعتان ونصف) بذكاء على الأجزاء الثلاثة: الفهم (8ن) + البناء اللغوي (7ن) + التعبير الكتابي (5ن)',
			'تفادي الفخاخ الشائعة في أسئلة الفهم (True/False، المرجعيات، الأسئلة المفتوحة) وإعادة الصياغة (Sentence Rewriting)',
			'إتقان هيكل المقال النموذجي للموضوع الأول الموجه (Topic One Guided) لضمان 4.5 إلى 5/5'
		],
		keywordsAr: ['BAC Methodology', 'Comprehension 8pts', 'Text Exploration 7pts', 'Written Expression 5pts', 'Essay Blueprint'],
		discover: {
			scenarioAr:
				'يمتد امتحان اللغة الإنجليزية للشعب العلمية والتسيير (علوم تجريبية، تقني رياضي، رياضيات، تسيير واقتصاد) لمدة ساعتين ونصف (02h30) بسلم تنقيط ثابت: Part One A Reading Comprehension (8 pts) + Part One B Text Exploration (7 pts) + Part Two Written Expression (5 pts) = 20 pts. التلميذ المنظم يحصد 18 إلى 20/20 بسهولة!',
			svg: svgEnglishWritingStructure({
				title: 'BAC Scientific English Exam Map (02h30 = 20 pts)',
				steps: [
					{ stage: '1. Reading (8 pts)', detail: '40 min: Skim text, T/F, Paragraph match, Wh-Qs, Pronouns' },
					{ stage: '2. Exploration (7 pts)', detail: '45 min: Vocab, Word table, Rewrite b=a, Phonology, Gap-fill' },
					{ stage: '3. Writing (5 pts)', detail: '50 min: Topic 1 Guided (notes) OR Topic 2 Free (80-120 words)' },
					{ stage: '4. Final Check', detail: '15 min: Check tenses, spelling, punctuation & question numbers' }
				]
			}),
			steps: [
				{
					promptAr: 'في سؤال "What or who do the underlined words refer to?" (الضمير العائد)، أين نبحث غالبا عن الكلمة المقصودة؟',
					hintAr: 'الضمير يعوض اسما ذُكر قبله لا بعده في الغالب.',
					expectedInput: 'before the pronoun',
					revealAr:
						'نبحث دائما في نفس الجملة أو الجملة التي تسبق الضمير مباشرة، ونتحقق من التطابق في العدد (مفرد/جمع) والعاقل/غير العاقل (it/which لغير العاقل المفرد، they/them/their للجمع).'
				},
				{
					promptAr: 'في سؤال "True or False" بأسئلة الفهم، ما الكلمات الصغيرة التي تقلب صحة الجملة فجأة؟',
					hintAr: 'راقب كلمات النفي والكمية المطلقة مثل never و only و all.',
					expectedInput: 'never / only / not',
					revealAr:
						'احذر فخاخ التطرف والنفي: all مقابل some، و always مقابل sometimes، و never / rarely / only / less / more؛ قارن الجملة بمعنى النص بدقة قبل الحكم!'
				},
				{
					promptAr: 'أيهما يُنصح به غالبا لتلاميذ الشعب العلمية في التعبير الكتابي: Topic One (الموجه بالنقاط) أم Topic Two (الحر)؟',
					hintAr: 'أحدهما يعطيك الأفكار الجاهزة ويضمن لك عدم الخروج عن الموضوع.',
					expectedInput: 'Topic One',
					revealAr:
						'يُنصح غالبا بـ Topic One (الموجه) لأن النقاط المعطاة (notes) تضمن لك تغطية الأفكار المطلوبة (Relevance) وترتيب الفقرة بوضوح دون تشتت، بشرط تحويل النقاط إلى جمل كاملة وربطها بالروابط المنطقية!'
				}
			]
		},
		summary: {
			rulesAr: [
				'Part 1A — Comprehension (8 pts): اقرأ الأسئلة قبل القراءة الثانية للنص. في Wh-questions أجب إجابة مباشرة واضحة ولا تنسخ فقرة كاملة عشوائيا. في "In which paragraph is it mentioned that..." اكتب رقم الفقرة بوضوح (Paragraph 2 / §2).',
				'Part 1B — Text Exploration (7 pts): (1) في المرادفات والأضداد احترم نفس الفئة النحوية (فعل=فعل، اسم=اسم، صفة=صفة)؛ (2) في إعادة الكتابة (b means same as a) حدد القاعدة أولا (Condition / Wish / Passive / Concession / Reported / Unless)؛ (3) في Gap-Fill حدد نوع الكلمة الناقصة قبل اختيارها (اسم، فعل، صفة، رابط).',
				'Part 2 — Written Expression (5 pts): معايير التصحيح أربعة: Relevance (الملاءمة للموضوع)، Semantic Coherence (ترابط الأفكار)، Correct Use of English (سلامة القواعد والإملاء)، Excellence (ثراء المفردات والروابط).',
				'قالب المقال المضمون (80–120 كلمة): (1) Introduction (جملة تمهيدية عامة + أطروحة واضحة)، (2) Body Paragraph (توسيع النقاط المعطاة بروابط: First, Moreover, Furthermore, In addition, Consequently)، (3) Conclusion (خاتمة موجزة بنصيحة أو حل عملي: To sum up / In conclusion, ...).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: '5/5 BAC Essay Blueprint (80 to 120 Words)',
				steps: [
					{ stage: 'Introduction', detail: '2 lines: General hook + Clear topic statement (Thesis)' },
					{ stage: 'Body (Point 1+2)', detail: 'First, ... + explanation. Moreover, ... + concrete example.' },
					{ stage: 'Body (Point 3)', detail: 'Furthermore, ... / On the other hand, ... (cause & effect)' },
					{ stage: 'Conclusion', detail: 'To sum up, ... + clear advice (should / must / had better)' }
				]
			}),
			visualCaptionAr: 'المخطط الجاهز لبناء فقرة أو مقال متكامل يحصد العلامة الممتازة في التعبير الكتابي',
			examples: [
				{
					problemAr: 'How do you expand a note like "- enforce strict laws / punish fraudsters" into a BAC essay sentence?',
					solutionAr: 'First, authorities should enforce strict laws in order to punish fraudsters and protect honest citizens.'
				},
				{
					problemAr: 'In Comprehension, how do you answer: "Does the text encourage fast food? Justify." when the answer is No?',
					solutionAr: 'No, it does not. The author clearly warns that fast food leads to obesity and chronic health problems.'
				},
				{
					problemAr: 'In Gap-Fill (4 blanks, 4 words), how do you avoid losing two marks by swapping two words?',
					solutionAr: 'Label each given word by grammar type first (Verb, Noun, Adjective, Connector), then check the word right before each blank (a/the + Noun, modal + Stem, to be + Adjective).'
				}
			],
			watchOutAr:
				'في التعبير الكتابي (Written Expression) لا تكتب أبدا النقاط المعطاة على شكل عوارض (bullet points) كما هي في الموضوع، بل حوّلها إلى فقرة أو مقال مترابط بعلامات الترقيم (النقطة والفاصلة والحروف الكبيرة) دون أخطاء إملائية.'
		},
		practice: [
			{
				questionAr: 'What is the official points breakdown for 3AS BAC Scientific & Management English (20 pts)?',
				options: [
					'Comprehension 8 pts + Text Exploration 7 pts + Written Expression 5 pts',
					'Comprehension 7 pts + Text Exploration 8 pts + Written Expression 5 pts',
					'Comprehension 7 pts + Text Exploration 7 pts + Written Expression 6 pts',
					'Comprehension 10 pts + Text Exploration 5 pts + Written Expression 5 pts'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! هذا هو السلم الرسمي الدقيق للشعب العلمية والتسيير (8 + 7 + 5 = 20).',
					'خطأ: تقسيم 7 + 8 + 5 يخص شعبة آداب وفلسفة.',
					'خطأ: تقسيم 7 + 7 + 6 يخص شعبة لغات أجنبية.',
					'خطأ: هذا التقسيم غير معتمد في البكالوريا.'
				],
				explanationAr: 'الشعب العلمية الأربعة (SE, TM, MATH, GE) لها تقسيم موحد: 8 للفهم + 7 للاستكشاف اللغوي + 5 للتعبير الكتابي.'
			},
			{
				questionAr: 'In a synonym-finding task (Text Exploration), if the given word is an ADJECTIVE ("dangerous"), what must your answer from the text be?',
				options: [
					'A verb in the past tense',
					'An adjective with the same meaning (e.g., hazardous / harmful)',
					'A plural noun',
					'Any word from the same paragraph'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: يجب احترام تطابق الفئة النحوية.',
					'صحيح! الصفة تُقابلها صفة، والفعل يقابله فعل، والاسم يقابله اسم.',
					'خطأ: الاسم لا يرادف الصفة نحويا.',
					'خطأ: يجب تطابق المعنى والفئة النحوية معا.'
				],
				explanationAr: 'القاعدة الذهبية في المرادفات والأضداد هي تطابق الفئة النحوية (Same Part of Speech).'
			},
			{
				questionAr: 'Where should you normally look to find what a pronoun like "they" or "which" refers to in a reading passage?',
				options: [
					'Always in the title only',
					'Always in the last sentence of the text',
					'In the same sentence or the preceding sentence before the pronoun',
					'In the Written Expression section'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الضمائر داخل الفقرات تعود على أسماء داخل الفقرة نفسها غالبا.',
					'خطأ: الضمير يشير لما سبقه لا لآخر النص.',
					'رائع! نبحث قبل الضمير مباشرة في نفس الجملة أو الجملة السابقة مع مطابقة العدد والعاقل.',
					'خطأ: التعبير الكتابي قسم منفصل.'
				],
				explanationAr: 'الضمائر العائدة (Reference Words) تحيل غالبا على اسم ذُكر قبلها مباشرة في نفس الجملة أو السابقة لها.'
			},
			{
				questionAr: 'In Topic One (Guided Written Expression), what is the BEST way to use the given notes?',
				options: [
					'Copy the notes as a bulleted list without verbs',
					'Ignore the notes and write about a different unit',
					'Write one single sentence without punctuation',
					'Expand the notes into full sentences organized into Introduction, Body with linkers, and Conclusion'
				],
				correctIndex: 3,
				diagnosticFeedback: [
					'خطأ: نسخ العوارض يفقدك علامة الترابط والسلامة اللغوية.',
					'خطأ: تجاهل الموضوع يؤدي إلى الخروج عن المطلوب.',
					'خطأ: غياب الترقيم والفقرات يضعف التقييم.',
					'ممتاز! توسيع النقاط إلى جمل تامة مترابطة بمقدمة وعرض وخاتمة يضمن أعلى علامة.'
				],
				explanationAr: 'لتحقيق 5/5 في Topic One نحول النقاط إلى جمل كاملة مترابطة باستعمال الروابط المنطقية وعلامات الترقيم.'
			},
			{
				questionAr: 'Which transition group is BEST for adding ideas smoothly in the body of a BAC essay?',
				options: [
					'First, Moreover, Furthermore, In addition',
					'Yesterday, Suddenly, Once upon a time',
					'Hello, Bye, See you soon',
					'Because of, Unless, Neither'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! هذه روابط الإضافة الأكاديمية المعتمدة لتنظيم أفكار العرض.',
					'خطأ: هذه عبارات سرد قصصي غير مناسبة للمقال التفسيري/الحجاجي.',
					'خطأ: هذه عبارات محادثة غير رسمية.',
					'خطأ: هذه أدوات ربط داخل الجملة لا روابط تسلسل أفكار.'
				],
				explanationAr: 'تنظيم العرض باستعمال First / Moreover / Furthermore / In addition يمنح المقال تماسكا منطقيا رفيعا.'
			}
		]
	}
];
