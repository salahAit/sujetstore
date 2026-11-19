import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_2AS_LP_T1: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_lp_t1_used_to_present',
		slug: 'eng-2as-lp-t1-used-to-present',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time (مظاهر تغير أنماط الحياة)',
		order: 1,
		titleAr: 'التعبير عن العادات الماضية والحاضرة (Used to vs Present Simple)',
		objectives: [
			'التمييز الدقيق بين العادات الماضية المنتهية (used to) والعادات الحاضرة المستمرة (Present Simple)',
			'صياغة جمل الإثبات والنفي والاستفهام باستخدام used to دون أخطاء صرفية',
			'وصف تطور الحياة الأسرية والاجتماعية في الجزائر بين الماضي والحاضر بلغة سليمة'
		],
		keywordsAr: ['Signs of the Time', 'used to', 'Present Simple', 'عادات الماضي', 'نمط الحياة الجزائري'],
		discover: {
			scenarioAr:
				'في جلسة عائلية بمدينة تلمسان، يصف الجد لابنه كيف كان الجيران يجتمعون كل مساء لتبادل الكتب والأخبار، بينما يعتمد الشباب اليوم على المكتبات الرقمية والرسائل الفورية. لاحظ الفرق بين زمن الفعلين.',
			svg: svgEnglishTenseTimeline({
				title: 'Past Habit vs Present Routine',
				tenseName: 'used to / Present Simple',
				formula: 'Subj + used to + Stem | Subj + V(s/es)',
				activeZone: 'past',
				example: 'Families used to write letters; today they send messages.',
				markers: 'in the past, decades ago / nowadays, today, usually'
			}),
			steps: [
				{
					promptAr:
						'تأمل الجملة: "Algerian artisans used to make copper trays by hand in the old Casbah." هل هذه العادة ما تزال سائدة بالطريقة نفسها أم كانت شائعة في الماضي؟',
					hintAr: 'انظر إلى العبارة used to وإلى السياق الزمني.',
					expectedInput: 'عادة كانت شائعة في الماضي ولم تعد كما كانت',
					revealAr:
						'نستعمل used to + Stem للدلالة على عادة أو حالة كانت قائمة في الماضي وتغيرت أو توقفت في الحاضر.'
				},
				{
					promptAr:
						'إذا أردنا نفي الجملة السابقة باستخدام did not، كيف نكتب الفعل used to؟ هل نحتفظ بحرف d أم نحذفه؟',
					hintAr: 'تذكر أن did يأخذ علامة الماضي فيعود الفعل بعده إلى المصدر.',
					expectedInput: 'did not use to',
					revealAr:
						'في النفي والاستفهام نحذف حرف d فتصبح الصيغة: did not use to + Stem، و Did + Subject + use to + Stem؟'
				},
				{
					promptAr:
						'للمقارنة مع الحاضر نقول: "Today, students usually read e-books." ما الزمن المستعمل هنا ولماذا؟',
					hintAr: 'انظر إلى الظرف usually و Today.',
					expectedInput: 'Present Simple للتعبير عن عادة حاضرة',
					revealAr:
						'نستعمل المضارع البسيط (Present Simple) مع ظروف التكرار مثل always و usually و nowadays لوصف العادات الحاضرة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الإثبات في الماضي (Past Habit/State): Subject + used to + Verb (Stem). مثال: People used to travel by train.',
				'النفي في الماضي: Subject + did not (didn\'t) + use to + Verb (Stem). نحذف d من used لأن did يحمل زمن الماضي.',
				'الاستفهام في الماضي: Did + Subject + use to + Verb (Stem)? مثال: Did your grandfather use to live in Constantine?',
				'العادة الحاضرة (Present Habit): نستعمل Present Simple (Verb أو Verb + s/es مع he, she, it) مع دلائل الحاضر: nowadays, today, currently, usually.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Used to vs Present Simple Structure',
				rootLabel: 'Habits Across Time',
				rootSub: 'Past Change vs Present Routine',
				branches: [
					{
						label: 'Affirmative Past',
						rule: 'Subj + used to + Stem',
						example: 'They used to walk to school.'
					},
					{
						label: 'Negative Past',
						rule: 'Subj + did not use to + Stem',
						example: 'They did not use to own phones.'
					},
					{
						label: 'Question Past',
						rule: 'Did + Subj + use to + Stem?',
						example: 'Did you use to read paper maps?'
					},
					{
						label: 'Present Routine',
						rule: 'Subj + V(s/es) + nowadays',
						example: 'She checks news online today.'
					}
				]
			}),
			visualCaptionAr: 'مقارنة شاملة لصيغ used to مع المضارع البسيط في المقارنة الزمنية',
			examples: [
				{
					problemAr: 'Put the verbs in brackets into the right form: Fifty years ago, neighbours (visit) each other daily, but today they often (call) by phone.',
					solutionAr: 'Fifty years ago, neighbours used to visit each other daily, but today they often call by phone.'
				},
				{
					problemAr: 'Rewrite in the negative and interrogative: "My uncle used to work in a traditional bookshop."',
					solutionAr: 'Negative: My uncle did not use to work in a traditional bookshop. Interrogative: Did my uncle use to work in a traditional bookshop?'
				}
			],
			watchOutAr:
				'خطأ شائع جدا في الفروض: كتابة did not used to أو Did you used to بحرف d. الصحيح دائما حذف d بعد did فتكتب use to. ولا تستعمل used to لحدث وقع مرة واحدة في الماضي، بل استعمل Past Simple.'
		},
		practice: [
			{
				questionAr: 'Choose the correct form: "In the past, Algerian families ...... share warm couscous every Friday afternoon."',
				options: ['used to', 'use to', 'are used', 'using to'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! جملة إثبات عن عادة ماضية تأخذ used to + Stem.',
					'خطأ: نكتب use to فقط في النفي أو السؤال بعد did.',
					'خطأ: are used لا تعبر عن عادة ماضية منتظمة هنا.',
					'خطأ: لا توجد صيغة using to للتعبير عن عادات الماضي.'
				],
				explanationAr: 'في الإثبات عن عادة ماضية نستخدم Subject + used to + Stem.'
			},
			{
				questionAr: 'Select the grammatically correct negative sentence:',
				options: [
					'Students did not used to study with tablets.',
					'Students did not use to study with tablets.',
					'Students not used to study with tablets.',
					'Students do not used to study with tablets.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بعد did not يجب حذف حرف d من used.',
					'صحيح! الصيغة السليمة للنفي هي did not use to + Stem.',
					'خطأ: نفي used to يحتاج الفعل المساعد did.',
					'خطأ: do not للمضارع ولا يجتمع مع used to.'
				],
				explanationAr: 'لأن did يحمل علامة الزمن الماضي، يعود الفعل بعده إلى المصدر use to.'
			},
			{
				questionAr: 'Which question is correctly formed about a past habit?',
				options: [
					'Did people used to fetch water from public fountains?',
					'Do people used to fetch water from public fountains?',
					'Did people use to fetch water from public fountains?',
					'Used people to fetch water from public fountains?'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: احذف حرف d بعد Did.',
					'خطأ: للسؤال عن الماضي نستخدم Did وليس Do.',
					'ممتاز! Did + Subject + use to + Stem هي الصيغة الصحيحة.',
					'خطأ: في الإنجليزية المدرسية الحديثة نستخدم الفعل المساعد Did.'
				],
				explanationAr: 'صيغة الاستفهام القياسية هي: Did + Subject + use to + Stem?'
			},
			{
				questionAr: 'Complete with the right present routine verb: "Nowadays, Amina ...... her lessons in the school library every afternoon."',
				options: ['used to revise', 'revised', 'revises', 'revise'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: وجود Nowadays يدل على الحاضر لا الماضي.',
					'خطأ: revised ماض بسيط لا يوافق Nowadays.',
					'صحيح! الفاعل مفرد غائب (Amina) والزمن مضارع بسيط فنضيف s.',
					'خطأ: مع المفرد الغائب في المضارع البسيط نضيف s للفعل.'
				],
				explanationAr: 'كلمة Nowadays تدل على المضارع البسيط ومع المفرد الغائب نضيف s للفعل.'
			},
			{
				questionAr: 'Which sentence CANNOT use "used to" because it refers to a single past event?',
				options: [
					'My father visited the Great Mosque of Tlemcen once in 2018.',
					'My father walked to the mosque every morning when he was young.',
					'Children played traditional outdoor games in our street.',
					'We lived in a stone house near the hills.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! الحدث وقع مرة واحدة في سنة محددة (once in 2018) فيأخذ Past Simple فقط.',
					'خطأ: هذه عادة متكررة في الماضي ويمكن التعبير عنها بـ used to.',
					'خطأ: هذه عادة جماعية ماضية تقبل used to.',
					'خطأ: هذه حالة مستمرة في الماضي وتقبل used to.'
				],
				explanationAr: 'لا تستعمل used to مع الأحداث الفردية التي وقعت مرة واحدة في تاريخ محدد.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t1_possibility_prediction',
		slug: 'eng-2as-lp-t1-possibility-prediction',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time (مظاهر تغير أنماط الحياة)',
		order: 2,
		titleAr: 'التعبير عن الاحتمال والتوقع المستقبلي (May, Might, Will probably)',
		objectives: [
			'التمييز بين درجات اليقين والتوقع المستقبلي في الإنجليزية (certainty vs possibility)',
			'توظيف الأفعال الناقصة may و might و could و will probably في سياق توقعات المستقبل',
			'تحويل الجمل من تعبيرات مثل perhaps و it is possible إلى صيغ الأفعال الناقصة بدقة'
		],
		keywordsAr: ['may', 'might', 'will probably', 'possibility', 'prediction', 'التوقع المستقبلي'],
		discover: {
			scenarioAr:
				'يناقش تلاميذ السنة الثانية آداب مستقبل المدن الجزائرية والتعليم سنة 2040: بعض الأمور شبه مؤكدة (will certainly)، وبعضها مرجح (will probably)، وبعضها محتمل فقط (may / might).',
			svg: svgEnglishGrammarMap({
				title: 'Degrees of Future Certainty and Possibility',
				rootLabel: 'Predicting the Future',
				rootSub: 'Modal + Verb (Stem)',
				branches: [
					{
						label: 'High Certainty',
						rule: 'will certainly / will definitely',
						example: 'Solar power will definitely grow.'
					},
					{
						label: 'Strong Probability',
						rule: 'will probably / is likely to',
						example: 'Trains will probably be faster.'
					},
					{
						label: 'Possibility (50%)',
						rule: 'may / may not + Stem',
						example: 'Books may remain printed.'
					},
					{
						label: 'Remote Possibility',
						rule: 'might / could + Stem',
						example: 'Deserts might host green farms.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين الجملتين: (A) "Solar panels will probably power most homes." و (B) "Smart boards might replace chalk in rural schools." أيهما تعبر عن احتمال أضعف؟',
					hintAr: 'لاحظ الفرق بين will probably (ترجيح قوي) و might (احتمال أضعف).',
					expectedInput: 'الجملة B لأن might تفيد احتمالا أضعف',
					revealAr:
						'تستعمل might للتعبير عن احتمال أضعف أو أقل يقينا من may ومن will probably.'
				},
				{
					promptAr:
						'لاحظ موضع ظرف الترجيح probably في الإثبات وفي النفي: "Cities will probably expand" مقابل "Paper books probably won\'t disappear". أين يقع probably مع won\'t؟',
					hintAr: 'انظر هل يأتي probably قبل won\'t أم بعدها.',
					expectedInput: 'يأتي قبل won\'t وبعد will',
					revealAr:
						'قاعدة مهمة في الامتحانات: نضع probably بعد will (will probably)، ولكن نضعه قبل won\'t (probably won\'t).'
				},
				{
					promptAr:
						'كيف تعيد كتابة الجملة: "Perhaps Algerian universities will offer more online courses." باستعمال may؟',
					hintAr: 'احذف Perhaps و will واستبدلهما بـ may + Stem.',
					expectedInput: 'Algerian universities may offer more online courses.',
					revealAr:
						'عند استعمال may أو might نحذف كلمات الشك مثل perhaps و maybe و probably حتى لا نقع في التكرار المعنوي.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأساسية: جميع الأفعال الناقصة (will, may, might, could) يتبعها الفعل في المصدر المجرد (Stem بدون to وبدون s).',
				'سلم اليقين من الأقوى إلى الأضعف: will certainly (مؤكد) ثم will probably (مرجح) ثم may (محتمل) ثم might / could (احتمال أضعف).',
				'النفي: نكتب may not و might not دون اختصار شائع في الكتابة الرسمية، ونكتب probably won\'t (حيث تسبق probably كلمة won\'t).',
				'عند إعادة الصياغة (Sentence Transformation): تحل may / might محل عبارات مثل Perhaps / Maybe / It is possible that، ونحذف تلك العبارات تماما.'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Future Prediction Scale',
				tenseName: 'will probably / may / might',
				formula: 'Subj + may / might / will probably + Stem',
				activeZone: 'future',
				example: 'Clean transport may reduce city pollution by 2035.',
				markers: 'in the future, by 2040, in coming decades, next century'
			}),
			visualCaptionAr: 'تمثيل زمني للتوقع المستقبلي مع صيغة الأفعال الناقصة',
			examples: [
				{
					problemAr: 'Rewrite sentence (b) so that it means the same as (a): (a) It is possible that schools will use digital labs everywhere. (b) Schools ......',
					solutionAr: 'Schools may use digital labs everywhere. (أو Schools might use digital labs everywhere.)'
				},
				{
					problemAr: 'Put the words in the correct order: disappear / probably / libraries / won\'t / traditional .',
					solutionAr: 'Traditional libraries probably won\'t disappear.'
				}
			],
			watchOutAr:
				'تجنب خطأين متكررين: أولا لا تضع to بعد may أو might (لا تقل may to change بل may change). ثانيا لا تجمع بين perhaps و may في جملة واحدة لأن ذلك تكرار في المعنى.'
		},
		practice: [
			{
				questionAr: 'Choose the sentence with the correct verb form after a modal:',
				options: [
					'Future homes may to save more rainwater.',
					'Future homes may saves more rainwater.',
					'Future homes may save more rainwater.',
					'Future homes may saving more rainwater.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: لا نضع to بعد الفعل الناقص may.',
					'خطأ: لا نضيف s للفعل بعد may.',
					'ممتاز! الفعل بعد may يأتي دائما في المصدر المجرد (Stem).',
					'خطأ: لا نضيف ing مباشرة بعد may هنا.'
				],
				explanationAr: 'الأفعال الناقصة may و might و will يتبعها دائما المصدر المجرد (Stem).'
			},
			{
				questionAr: 'Which sentence expresses a weaker possibility than the others?',
				options: [
					'Electric buses will certainly serve large cities.',
					'Electric buses will probably serve large cities.',
					'Electric buses might serve small desert villages soon.',
					'Electric buses will serve Algiers next year.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: will certainly تفيد يقينا عاليا.',
					'خطأ: will probably تفيد ترجيحا قويا.',
					'صحيح! might تعبر عن احتمال أضعف أو أقل تأكيدا.',
					'خطأ: will وحدها تعبر عن توقع مباشر قوي.'
				],
				explanationAr: 'في سلم الاحتمال، might تفيد درجة احتمال أضعف من may و will probably و will certainly.'
			},
			{
				questionAr: 'Rewrite accurately: "Perhaps citizens will work four days a week in the future."',
				options: [
					'Citizens perhaps may work four days a week in the future.',
					'Citizens may work four days a week in the future.',
					'Citizens will may work four days a week in the future.',
					'Citizens may worked four days a week in the future.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نجمع بين perhaps و may في الجملة نفسها.',
					'أحسنت! حذفنا perhaps و will واستعملنا may + Stem.',
					'خطأ: لا يصح تتابع فعلين ناقصين مثل will may.',
					'خطأ: بعد may نستعمل المصدر work لا الماضي worked.'
				],
				explanationAr: 'نحذف perhaps و will ونستعمل may متبوعا بالمصدر المجرد.'
			},
			{
				questionAr: 'Choose the right word order for a negative prediction:',
				options: [
					'Handwritten calligraphy won\'t probably vanish.',
					'Handwritten calligraphy probably won\'t vanish.',
					'Handwritten calligraphy not probably will vanish.',
					'Handwritten calligraphy won\'t vanish probably.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: مع النفي won\'t تأتي probably قبل won\'t.',
					'صحيح! القاعدة: will probably في الإثبات، و probably won\'t في النفي.',
					'خطأ: ترتيب النفي غير سليم نحويا.',
					'خطأ: الموضع القياسي لـ probably هو قبل won\'t.'
				],
				explanationAr: 'يأتي الظرف probably قبل صيغة النفي المختصرة won\'t.'
			},
			{
				questionAr: 'Which expression is closest in meaning to "might not happen"?',
				options: [
					'will definitely happen',
					'is impossible to stop',
					'may perhaps not occur',
					'has already happened'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا يعبر عن اليقين لا الاحتمال المنفي.',
					'خطأ: المعنى مختلف تماما.',
					'صحيح! might not تفيد احتمال عدم وقوع الفعل.',
					'خطأ: هذا يشير إلى الماضي المنتهي.'
				],
				explanationAr: 'صيغة might not + Stem تعبر عن احتمال عدم حدوث أمر في المستقبل.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t1_relative_clauses',
		slug: 'eng-2as-lp-t1-relative-clauses',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time (مظاهر تغير أنماط الحياة)',
		order: 3,
		titleAr: 'جمل الوصل وضمائرها (Relative Clauses: who, which, where, when)',
		objectives: [
			'اختيار ضمير الوصل المناسب (who, which, where, when, whose) بحسب الكلمة الموصوفة',
			'الربط بين جملتين قصيرتين في جملة مركبة متماسكة دون تكرار الضمير',
			'التمييز بين الجملة الوصلية التعريفية (Defining) وغير التعريفية (Non-defining)'
		],
		keywordsAr: ['Relative Clauses', 'who', 'which', 'where', 'when', 'whose', 'ضمائر الوصل'],
		discover: {
			scenarioAr:
				'يقرأ التلاميذ نصا عن مدينة قسنطينة وعن الإمام عبد الحميد بن باديس رحمه الله: "Constantine is the historic city where Imam Abdelhamid Ben Badis taught students who sought authentic knowledge." لاحظ دور where و who في ربط الأفكار.',
			svg: svgEnglishGrammarMap({
				title: 'Relative Pronouns and Adverbs',
				rootLabel: 'Relative Clauses',
				rootSub: 'Link a noun to extra information',
				branches: [
					{
						label: 'who / whose',
						rule: 'People / Possession',
						example: 'The scholar who wrote the book'
					},
					{
						label: 'which / that',
						rule: 'Things and animals',
						example: 'The craft which survived ages'
					},
					{
						label: 'where',
						rule: 'Places (in which)',
						example: 'The town where he was born'
					},
					{
						label: 'when',
						rule: 'Time (in/on which)',
						example: 'The year when schools opened'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'انظر إلى الجملتين: "The Casbah is an old quarter. Many craftsmen lived there." ما ضمير الوصل الأنسب لحذف كلمة there وربط الجملتين؟',
					hintAr: 'كلمة there تدل على المكان (في ذلك الحي).',
					expectedInput: 'where',
					revealAr:
						'نستعمل where للربط بالمكان ونحذف كلمة there: "The Casbah is an old quarter where many craftsmen lived."'
				},
				{
					promptAr:
						'في الجملة: "The historian ...... books inspire youth lives in Algiers." لماذا نستعمل whose بدل who؟',
					hintAr: 'لاحظ وجود الاسم books مباشرة بعد الفراغ (كتبه).',
					expectedInput: 'لأن whose تدل على الملكية ويتبعها اسم',
					revealAr:
						'نستعمل whose للدلالة على الملكية (تحل محل his / her / their) ويتبعها دائما اسم مملوك مثل whose books.'
				},
				{
					promptAr:
						'قارن بين: "The city which has seven bridges is Constantine." و "The city where I studied is Constantine." لماذا استعملنا which في الأولى مع أن city مكان؟',
					hintAr: 'هل المدينة هنا فاعل لفعل has أم ظرف مكان يقع فيه الفعل؟',
					expectedInput: 'لأن city فاعل للفعل has وليست ظرف مكان',
					revealAr:
						'إذا كان المكان فاعلا أو مفعولا للفعل (has / attracts / visited) نستعمل which، أما إذا وقع الفعل داخله (lived / studied) فنستعمل where.'
				}
			]
		},
		summary: {
			rulesAr: [
				'who للعاقل (People)، و which لغير العاقل والأشياء والحيوانات (Things)، ويمكن استعمال that بدلا منهما في الجمل التعريفية فقط.',
				'where للمكان عندما يقع الحدث فيه (بمعنى in which)، و when للزمان (بمعنى in/on which)، و whose للملكية ويتبعها اسم مباشرة.',
				'عند دمج جملتين بضمير وصل، نحذف الضمير المكرر (he, she, it, they, there, then) من الجملة الثانية.',
				'الجملة التعريفية (Defining) ضرورية لتحديد الاسم ولا توضع بين فاصلتين؛ أما غير التعريفية (Non-defining) فتضيف معلومة جانبية وتوضع بين فاصلتين ولا نستخدم فيها that.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'How to Combine Two Sentences with a Relative Clause',
				steps: [
					{ stage: 'Identify', detail: 'Find the repeated noun or pronoun (he, it, there).' },
					{ stage: 'Choose', detail: 'Pick who, which, where, when, or whose.' },
					{ stage: 'Delete', detail: 'Remove the repeated pronoun from the second clause.' },
					{ stage: 'Check', detail: 'Use commas only for extra non-defining information.' }
				]
			}),
			visualCaptionAr: 'خطوات منهجية للربط السليم بضمائر الوصل دون تكرار',
			examples: [
				{
					problemAr: 'Combine with a relative pronoun: "Ramadan is a blessed month. Muslims strengthen family ties in this month."',
					solutionAr: 'Ramadan is a blessed month when Muslims strengthen family ties.'
				},
				{
					problemAr: 'Combine with a relative pronoun: "Traditional pottery is an art. Artisans still preserve it in Kabylia."',
					solutionAr: 'Traditional pottery is an art which artisans still preserve in Kabylia.'
				}
			],
			watchOutAr:
				'انتبه من خطأين مشهورين: لا تترك الضمير المكرر بعد الربط (لا تقل the book which I read it بل the book which I read)، ولا تستعمل where إذا جاء بعدها فعل مباشرة بل استعمل which (the city which attracts visitors).'
		},
		practice: [
			{
				questionAr: 'Choose the right relative word: "Al-Khwarizmi was a great Muslim scholar ...... laid the foundations of algebra."',
				options: ['which', 'who', 'where', 'when'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: which لغير العاقل.',
					'صحيح! الفاعل شخص عاقل (scholar) فنستعمل who.',
					'خطأ: where للمكان.',
					'خطأ: when للزمان.'
				],
				explanationAr: 'لربط جملة الوصل بشخص عاقل (Al-Khwarizmi) نستخدم who.'
			},
			{
				questionAr: 'Choose the correct connector: "Tlemcen is a peaceful city ...... scholars built famous historic mosques."',
				options: ['where', 'who', 'when', 'whose'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! الفعل built وقع داخل المدينة فنستعمل where.',
					'خطأ: who للأشخاص فقط.',
					'خطأ: when للتعبير عن الزمن.',
					'خطأ: whose للملكية ويتبعها اسم مملوك.'
				],
				explanationAr: 'لأن الحدث وقع داخل المكان (in Tlemcen) نستعمل where.'
			},
			{
				questionAr: 'Select the right option: "M-Zab Valley is a heritage site ...... attracts architects from many countries."',
				options: ['where', 'who', 'which', 'when'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: جاء بعد الفراغ فعل مباشر (attracts) فالمكان هنا فاعل لا ظرف.',
					'خطأ: who للعاقل فقط.',
					'صحيح! الموقع فاعل للفعل attracts فنستعمل which.',
					'خطأ: when للزمان.'
				],
				explanationAr: 'عندما يكون المكان فاعلا للفعل مباشرة نستعمل which وليس where.'
			},
			{
				questionAr: 'Choose the accurate relative word for possession: "The student ...... essay won the prize thanked her teacher."',
				options: ['who', 'which', 'whose', 'where'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: essay اسم مملوك للتلميذة فيحتاج ضمير ملكية.',
					'خطأ: which لا تعبر عن الملكية هنا.',
					'أحسنت! whose essay تعني مقالها.',
					'خطأ: where للمكان.'
				],
				explanationAr: 'ضمير الوصل whose يعبر عن الملكية ويتبعه الاسم المملوك مباشرة.'
			},
			{
				questionAr: 'Which combined sentence is completely error-free?',
				options: [
					'The library which we visited it yesterday is very quiet.',
					'The library which we visited yesterday is very quiet.',
					'The library where we visited yesterday is very quiet.',
					'The library who we visited yesterday is very quiet.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: بقاء الضمير it تكرار غير صحيح بعد which.',
					'صحيح! حذفنا الضمير المكرر it واستعملنا which لأن visited يتعدى لمفعول.',
					'خطأ: الفعل visited يحتاج مفعولا به مباشرا فيأخذ which لا where.',
					'خطأ: المكتبة غير عاقل فلا تأخذ who.'
				],
				explanationAr: 'يجب حذف المفعول المكرر it عند الربط بضمير الوصل which.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_lp_t1_comparing_lifestyles',
		slug: 'eng-2as-lp-t1-comparing-lifestyles',
		grade: '2as_lp',
		yearSubjectId: 762,
		trimesterId: 't1',
		sequenceId: 'seq1',
		sequenceTitleAr: 'الوحدة 1: Signs of the Time (مظاهر تغير أنماط الحياة)',
		order: 4,
		titleAr: 'المقارنة والتقابل بين الماضي والحاضر (Whereas, While, Unlike)',
		objectives: [
			'التمييز النحوي بين روابط الجمل (whereas, while) وحروف الجر المتبوعة باسم (unlike, in contrast to)',
			'استعمال علامات الترقيم المناسبة مع روابط المقارنة والتقابل في الفقرات',
			'كتابة جمل مقارنة واضحة بين أنماط السكن والغذاء واللباس والتواصل في الجزائر'
		],
		keywordsAr: ['whereas', 'while', 'unlike', 'in contrast to', 'comparing lifestyles', 'المقارنة'],
		discover: {
			scenarioAr:
				'في مقال قصير عن تغير أنماط الغذاء والسكن في الجزائر، يكتب التلميذ: "Unlike the fast meals of modern cities, traditional home-cooked dishes took hours to prepare, whereas today families often prefer quicker recipes."',
			svg: svgEnglishGrammarMap({
				title: 'Linkers of Contrast and Comparison',
				rootLabel: 'Past vs Present Contrast',
				rootSub: 'Clause vs Noun Phrase',
				branches: [
					{
						label: 'whereas / while',
						rule: '+ Subject + Verb (Clause)',
						example: 'Past life was slow, whereas modern life is fast.'
					},
					{
						label: 'Unlike',
						rule: '+ Noun / Noun Phrase',
						example: 'Unlike old houses, flats have small balconies.'
					},
					{
						label: 'In contrast to',
						rule: '+ Noun Phrase, Clause',
						example: 'In contrast to radio, online media is instant.'
					},
					{
						label: 'On the other hand',
						rule: 'New sentence transition',
						example: 'Emails are quick. On the other hand, letters feel warm.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'تأمل المثالين: "Unlike traditional villages, modern towns are crowded." و "Traditional villages were quiet, whereas modern towns are crowded." ما نوع التركيب الذي جاء بعد Unlike مباشرة؟',
					hintAr: 'هل جاء بعد Unlike فاعل وفعل أم عبارة اسمية فقط؟',
					expectedInput: 'عبارة اسمية (Noun Phrase) بدون فعل',
					revealAr:
						'تتبع Unlike و In contrast to عبارة اسمية فقط (Noun Phrase)، بينما تتبع whereas و while جملة كاملة (Subject + Verb).'
				},
				{
					promptAr:
						'أين نضع الفاصلة (Comma) عند استعمال whereas في وسط الجملة؟',
					hintAr: 'انظر إلى المثال السابق قبل كلمة whereas.',
					expectedInput: 'نضع فاصلة قبل whereas مباشرة',
					revealAr:
						'نضع فاصلة قبل whereas في وسط الجملة، وإذا بدأت الجملة بـ While أو Whereas نضع الفاصلة بين الجملتين.'
				},
				{
					promptAr:
						'كيف تربط الجملتين باستعمال unlike: "Old courtyards were wide. Modern apartments are compact."',
					hintAr: 'ضع Unlike قبل الاسم الأول ثم فاصلة ثم الجملة الثانية.',
					expectedInput: 'Unlike old courtyards, modern apartments are compact.',
					revealAr:
						'نحذف الفعل were wide من العبارة الأولى لأن unlike تأخذ اسما فقط: "Unlike old courtyards, modern apartments are compact."'
				}
			]
		},
		summary: {
			rulesAr: [
				'whereas / while + Subject + Verb: تربط بين جملتين متقابلتين في المعنى، وتقع في بداية الجملة أو وسطها (مع فاصلة قبل whereas).',
				'unlike / in contrast to + Noun Phrase: يليها اسم أو عبارة اسمية (بدون فعل مصرف)، وتفصلها فاصلة عن الجملة الرئيسية.',
				'however / on the other hand: أدوات انتقال تبدأ بها الجملة الثانية بعد نقطة (.) أو فاصلة منقوطة (;) ويتبعها فاصلة.',
				'في التعبير الكتابي عن Signs of the Time، اجعل المقارنة متوازنة: قارن النقطة نفسها في الماضي والحاضر (السكن، الغذاء، الدراسة، الروابط الأسرية).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Compare-and-Contrast Paragraph Plan (2AS LP)',
				steps: [
					{ stage: 'Topic Sentence', detail: 'State clearly that Algerian daily life has changed.' },
					{ stage: 'Past Habit', detail: 'Describe past habits with used to + Stem.' },
					{ stage: 'Contrast Link', detail: 'Shift to today using whereas, while, or unlike.' },
					{ stage: 'Conclusion', detail: 'Value modern progress while keeping noble traditions.' }
				]
			}),
			visualCaptionAr: 'خطة مبسطة لكتابة فقرة مقارنة متماسكة بين الماضي والحاضر',
			examples: [
				{
					problemAr: 'Combine using "whereas": "Grandparents used to read printed newspapers. Youth today read digital news."',
					solutionAr: 'Grandparents used to read printed newspapers, whereas youth today read digital news.'
				},
				{
					problemAr: 'Combine using "unlike": "Past markets were open only once a week. Today supermarkets open daily."',
					solutionAr: 'Unlike past markets, today supermarkets open daily.'
				}
			],
			watchOutAr:
				'لا تكتب جملة كاملة (فاعل + فعل) بعد unlike! جملة "Unlike past markets were weekly" خاطئة نحويا؛ الصحيح "Unlike past markets, ..." أو استخدام whereas مع جملة كاملة.'
		},
		practice: [
			{
				questionAr: 'Choose the right linker: "...... traditional letters took weeks to arrive, emails reach recipients in seconds."',
				options: ['Unlike', 'Whereas', 'In contrast to', 'Despite'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Unlike تتبعها عبارة اسمية لا جملة فيها فعل took.',
					'صحيح! تلا الفراغ فاعل وفعل (traditional letters took) فنستعمل Whereas.',
					'خطأ: In contrast to يتبعها اسم فقط.',
					'خطأ: Despite يتبعها اسم أو V-ing.'
				],
				explanationAr: 'لوجود جملة كاملة (Subject + Verb) نستخدم Whereas أو While.'
			},
			{
				questionAr: 'Complete correctly: "...... past students, learners today have instant access to digital dictionaries."',
				options: ['Whereas', 'While', 'Unlike', 'However'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: Whereas تحتاج فعلا مصرفا في عبارتها.',
					'خطأ: While تحتاج جملة كاملة هنا.',
					'ممتاز! past students عبارة اسمية فتأخذ Unlike.',
					'خطأ: However لا تسبق عبارة اسمية بهذا الشكل.'
				],
				explanationAr: 'العبارة past students عبارة اسمية (Noun Phrase) فتناسبها Unlike.'
			},
			{
				questionAr: 'Which sentence is punctuated and structured accurately?',
				options: [
					'In the past people wore woollen burnous, unlike today they wear light jackets.',
					'In the past people wore woollen burnous, whereas today they wear light jackets.',
					'Whereas the woollen burnous, modern jackets are light.',
					'Unlike wore woollen burnous, people wear light jackets.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: unlike لا يتبعها فاعل وفعل (they wear).',
					'صحيح! استعملنا whereas قبل الجملة الثانية مع فاصلة قبلها.',
					'خطأ: بعد Whereas لم يرد فعل مصرف.',
					'خطأ: لا نضع فعلا ماضيا مباشرة بعد Unlike.'
				],
				explanationAr: 'تتبع whereas جملة كاملة وتسبقها فاصلة في وسط الجملة.'
			},
			{
				questionAr: 'Identify the correct rewrite using "In contrast to": "Old alleys were narrow. New avenues are wide."',
				options: [
					'In contrast to old alleys were narrow, new avenues are wide.',
					'In contrast to old alleys, new avenues are wide.',
					'Old alleys in contrast to new avenues are wide.',
					'In contrast to narrow, new avenues are wide.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نضع الفعل were بعد In contrast to.',
					'أحسنت! In contrast to + Noun Phrase + comma + Main Clause.',
					'خطأ: ترتيب الجملة غير سليم ويفقد المعنى المقارن.',
					'خطأ: يجب ذكر الاسم المقارن (old alleys).'
				],
				explanationAr: 'يتبع التعبير In contrast to عبارة اسمية متبوعة بفاصلة ثم الجملة الثانية.'
			},
			{
				questionAr: 'Which transition properly starts a separate second sentence of contrast?',
				options: [
					'Traditional crafts take patience. On the other hand, factory goods are produced quickly.',
					'Traditional crafts take patience. Unlike, factory goods are produced quickly.',
					'Traditional crafts take patience. Whereas, factory goods are produced quickly.',
					'Traditional crafts take patience. While, factory goods are produced quickly.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! On the other hand تبدأ جملة مستقلة وتُتبع بفاصلة.',
					'خطأ: Unlike لا تقف بمفردها قبل فاصلة.',
					'خطأ: Whereas رابط داخل جملة واحدة ولا يتبعها فاصلة هكذا.',
					'خطأ: While رابط داخل جملة واحدة لا أداة انتقال مستقلة.'
				],
				explanationAr: 'العبارة On the other hand أداة انتقال تبدأ جملة جديدة وتفصل بفاصلة.'
			}
		]
	}
];
