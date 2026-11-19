import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';

export const LESSONS_2AS_LE_T2: EnglishInteractiveLessonData[] = [
	{
		id: 'eng_lesson_2as_le_t2_passive_all_tenses',
		slug: 'eng-2as-le-t2-passive-all-tenses',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not & Science and Society',
		order: 1,
		titleAr: 'المبني للمجهول في جميع الأزمنة (Simple, Continuous, Perfect & Modals)',
		objectives: [
			'بناء المبني للمجهول بدقة في الأزمنة المستمرة (is/was being + V3) والأزمنة التامة (has/had been + V3)',
			'تحويل الجمل العلمية والبيئية التي تضم أفعالا ناقصة أو فعلين مفعولين (by + agent عند الحاجة)',
			'تجنب أخطاء الخلط بين being (للمستمر) و been (للتام) في امتحانات شعبة اللغات'
		],
		keywordsAr: ['Passive Voice', 'Continuous Passive', 'Perfect Passive', 'Modals Passive', 'Waste Not Want Not'],
		discover: {
			scenarioAr:
				'في مقال علمي عن السد الأخضر والطاقة الشمسية في الجزائر نقرأ: "New solar farms are being constructed in the south, and millions of trees have already been planted to stop desertification." تأمل كلمتي being و been.',
			svg: svgEnglishGrammarMap({
				title: 'Full Passive Matrix Across Tenses (2AS LE)',
				rootLabel: 'Object + BE (exact tense) + V3',
				rootSub: 'being = Continuous | been = Perfect | be = Modals',
				branches: [
					{
						label: 'Simple (Pres/Past)',
						rule: 'is/are or was/were + V3',
						example: 'Solar heat is captured.'
					},
					{
						label: 'Continuous',
						rule: 'is/are/was/were + being + V3',
						example: 'Canals are being repaired.'
					},
					{
						label: 'Perfect',
						rule: 'has/have/had + been + V3',
						example: 'Waste has been reduced.'
					},
					{
						label: 'Modals & Future',
						rule: 'will/must/should + be + V3',
						example: 'Soils must be protected.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'حول الجملة المستمرة: "Researchers are testing a new water filter." إلى المبني للمجهول. ما الكلمة التي تحفظ معنى الاستمرار (-ing)؟',
					hintAr: 'نحتاج صيغة -ing من الفعل be وهي being.',
					expectedInput: 'A new water filter is being tested by researchers.',
					revealAr:
						'في الأزمنة المستمرة (Present / Past Continuous) نضع being قبل التصريف الثالث: is / are / was / were + being + V3.'
				},
				{
					promptAr:
						'حول الجملة التامة: "Algeria has expanded renewable energy stations." إلى المبني للمجهول. انتبه للمفرد والجمع!',
					hintAr: 'المفعول به الجديد جمع (renewable energy stations) فيأخذ have لا has.',
					expectedInput: 'Renewable energy stations have been expanded by Algeria.',
					revealAr:
						'في المضارع التام (Present Perfect) نستخدم has / have + been + V3 مع مطابقة نائب الفاعل الجديد في العدد (stations = جمع فيأخذ have been).'
				},
				{
					promptAr:
						'ماذا لو كانت الجملة بصيغة Past Perfect أو Modal Perfect مثل: "Engineers had solved the leak" أو "They should have recycled the glass"؟',
					hintAr: 'حافظ على had أو should have ثم أضف been + V3.',
					expectedInput: 'The leak had been solved / The glass should have been recycled',
					revealAr:
						'كل صيغة تامة تحتوي have/has/had تأخذ been + V3 في المبني للمجهول: had been solved و should have been recycled.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الجامعة: حدد زمن الفعل المعلوم أولا، ثم صرف الفعل (to be) في ذلك الزمن نفسه، ثم أضف التصريف الثالث (V3).',
				'الأزمنة المستمرة (Continuous): am/is/are/was/were + being + V3. مثال: Fresh water is being wasted.',
				'الأزمنة التامة (Perfect): has/have/had + been + V3. مثال: Smart meters have been installed.',
				'الأفعال الناقصة (Modals): modal + be + V3 (للحاضر والمستقبل)، و modal + have been + V3 (للماضي مثل must have been built).'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Choosing be / being / been in Passive Voice',
				tenseName: 'Three Forms of BE',
				formula: 'Modal + be + V3 | Continuous + being + V3 | Perfect + been + V3',
				activeZone: 'past_to_present',
				example: 'Water has been saved and clean stations are being built.',
				markers: 'now (being) | already, since, recently (been) | must, will (be)'
			}),
			visualCaptionAr: 'التمييز البصري السريع بين be و being و been في المبني للمجهول',
			examples: [
				{
					problemAr: 'Rewrite in the passive: "Scientists were studying solar desalination when the grant arrived."',
					solutionAr: 'Solar desalination was being studied by scientists when the grant arrived.'
				},
				{
					problemAr: 'Rewrite in the passive: "The municipality has planted two thousand olive trees since autumn."',
					solutionAr: 'Two thousand olive trees have been planted by the municipality since autumn.'
				}
			],
			watchOutAr:
				'أشهر خطأين في شعبة اللغات: (1) نسيان تحويل has إلى have عندما يكون نائب الفاعل جمعا (two thousand trees have been لا has been). (2) الخلط بين being و been؛ تذكر دائما: ing للمستمر و een للتام.'
		},
		practice: [
			{
				questionAr: 'Transform accurately: "Technicians are installing solar panels on the school roof."',
				options: [
					'Solar panels are installed on the school roof.',
					'Solar panels are being installed on the school roof.',
					'Solar panels have been installed on the school roof.',
					'Solar panels is being installed on the school roof.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: حذفت معنى الاستمرار (Present Continuous).',
					'صحيح! الفاعل الجديد جمع والزمن مضارع مستمر فنكتب are being installed.',
					'خطأ: غيرت الزمن إلى مضارع تام.',
					'خطأ: Solar panels جمع وتأخذ are لا is.'
				],
				explanationAr: 'المضارع المستمر المبني للمجهول يتكون من am/is/are + being + V3.'
			},
			{
				questionAr: 'Choose the correct Present Perfect Passive: "Strict recycling rules ...... by the city council recently."',
				options: ['has been adopted', 'have been adopted', 'are being adopted', 'were been adopted'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: rules جمع فتأخذ have لا has.',
					'ممتاز! rules جمع + recently (مضارع تام) = have been adopted.',
					'خطأ: recently تدل على المضارع التام لا المستمر.',
					'خطأ: لا يجتمع were مع been.'
				],
				explanationAr: 'الفاعل جمع (rules) والزمن مضارع تام فنستعمل have been + V3.'
			},
			{
				questionAr: 'Rewrite in the Past Continuous Passive: "The team was recording weather data all morning."',
				options: [
					'Weather data was recorded all morning.',
					'Weather data was being recorded all morning.',
					'Weather data had been recorded all morning.',
					'Weather data were being recorded all morning.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: فقدت دلالة الاستمرار (was being).',
					'أحسنت! data تعامل كمفرد غير معدود هنا والزمن ماض مستمر (was being recorded).',
					'خطأ: هذا ماض تام لا ماض مستمر.',
					'خطأ: مع سياق المفرد/الكتلة العلمية المستقر في المنهج هنا was being recorded هي الأصح والأكثر اتساقا مع الجملة.'
				],
				explanationAr: 'في الماضي المستمر المبني للمجهول نستخدم was/were + being + V3.'
			},
			{
				questionAr: 'Select the accurate Past Perfect Passive: "Before the drought began, villagers ...... rainwater in deep cisterns." (Passive version)',
				options: [
					'Rainwater had stored in deep cisterns.',
					'Rainwater had been stored in deep cisterns.',
					'Rainwater has been stored in deep cisterns.',
					'Rainwater was being stored in deep cisterns.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: تنقص كلمة been لبناء المجهول.',
					'صحيح! Past Perfect Passive يتكون من had been + V3.',
					'خطأ: السياق ماض (Before the drought began) لا مضارع تام.',
					'خطأ: هذا ماض مستمر لا ماض تام.'
				],
				explanationAr: 'يتكون الماضي التام المبني للمجهول من had been + Past Participle.'
			},
			{
				questionAr: 'Choose the right Modal Perfect Passive: "That leaking pipe ...... weeks ago."',
				options: [
					'should have repaired',
					'should have been repaired',
					'should be being repaired',
					'should had been repaired'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الأنبوب لا يصلح نفسه بل يصلح (مبني للمجهول).',
					'صحيح! modal + have been + V3 للمجهول في الماضي.',
					'خطأ: صيغة غير قياسية هنا.',
					'خطأ: بعد should نضع المصدر have لا had.'
				],
				explanationAr: 'صيغة المبني للمجهول مع should في الماضي هي should have been + V3.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t2_conditionals',
		slug: 'eng-2as-le-t2-conditionals',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not & Science and Society',
		order: 2,
		titleAr: 'الجمل الشرطية بأنواعها الأربعة (Conditional Types 0, 1, 2 & 3)',
		objectives: [
			'التمييز الدقيق بين الحقائق العلمية (Type 0) والشرط المحتمل (Type 1) والافتراضي في الحاضر (Type 2) والندم في الماضي (Type 3)',
			'تصريف فعلي الشرط وجواب الشرط بدقة في جميع الأنواع الأربعة مع unless',
			'استعمال were مع جميع الضمائر في النوع الثاني (If I were) وإعادة صياغة جمل الندم بالنوع الثالث'
		],
		keywordsAr: ['Conditionals', 'Type 0', 'Type 1', 'Type 2', 'Type 3', 'unless', 'الجمل الشرطية'],
		discover: {
			scenarioAr:
				'في وحدة Science and Society نقرأ أربع جمل شرطية متدرجة: (0) "If you heat water to 100 C, it boils." (1) "If we recycle glass, we will save energy." (2) "If every home used solar power, bills would drop." (3) "If they had protected the forest, the soil would not have eroded."',
			svg: svgEnglishGrammarMap({
				title: 'Four English Conditional Types (2AS LE)',
				rootLabel: 'IF-Clause + Main Clause',
				rootSub: 'Match tense to degree of reality',
				branches: [
					{
						label: 'Type 0 (Fact)',
						rule: 'If + Present, Present',
						example: 'If ice melts, it turns to water.'
					},
					{
						label: 'Type 1 (Likely)',
						rule: 'If + Present, will + Stem',
						example: 'If we plant trees, air will clear.'
					},
					{
						label: 'Type 2 (Unreal Now)',
						rule: 'If + Past Simple, would + Stem',
						example: 'If I were mayor, I would build parks.'
					},
					{
						label: 'Type 3 (Unreal Past)',
						rule: 'If + had + V3, would have + V3',
						example: 'If he had checked, it would have worked.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين Type 0 و Type 1: متى نضع Present Simple في الطرفين، ومتى نضع will + Stem في جواب الشرط؟',
					hintAr: 'هل الجملة قانون علمي ثابت دائما أم نتيجة مستقبلية محتملة؟',
					expectedInput: 'Type 0 للحقائق العلمية الثابتة و Type 1 للنتائج المستقبلية المحتملة',
					revealAr:
						'نستخدم Type 0 (Present + Present) مع الحقائق العلمية والقوانين الطبيعية الثابتة، و Type 1 (Present + will) مع المواقف المستقبلية الممكنة.'
				},
				{
					promptAr:
						'في Type 2 نقول: "If factories reduced smoke, cities would breathe cleaner air." هل الفعل reduced هنا يشير إلى الزمن الماضي فعلا أم إلى افتراض غير واقع الآن؟',
					hintAr: 'تأمل المعنى: المصانع لم تقلل الدخان بعد، فنحن نتخيل واقعا أفضل في الحاضر.',
					expectedInput: 'يشير إلى افتراض غير واقع في الحاضر أو المستقبل القريب',
					revealAr:
						'في النوع الثاني نستخدم صيغة الماضي البسيط شكليا للتعبير عن موقف خيالي أو غير محتمل في الحاضر، مع would + Stem في جواب الشرط.'
				},
				{
					promptAr:
						'اقرأ الجملة: "The laboratory did not test the sample, so the experiment failed." كيف نحولها إلى شرط من النوع الثالث (Type 3)؟',
					hintAr: 'نعكس النفي إلى إثبات في الماضي التام (had tested) ونستعمل would not have failed.',
					expectedInput: 'If the laboratory had tested the sample, the experiment would not have failed.',
					revealAr:
						'في النوع الثالث نعبر عن ماض مستحيل التغيير (ندم أو استنتاج معاكس للواقع): If + Past Perfect (had + V3), Subject + would (not) have + V3.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Type 0 (Scientific Truth): If + Present Simple, Present Simple. مثال: If plants lack light, they die.',
				'Type 1 (Real Future): If + Present Simple, will / can / may + Stem. (وتساوي Unless = If ... not مع فعل مثبت بعدها).',
				'Type 2 (Imaginary Present): If + Past Simple (were مع be غالبا), would / could + Stem.',
				'Type 3 (Past Regret — Intro): If + Past Perfect (had + V3), would / could + have + V3. ولا نضع will أو would أبدا داخل جملة If!'
			],
			visualSvg: svgEnglishTenseTimeline({
				title: 'Type 3 Conditional — Reflecting on the Past',
				tenseName: 'Past Perfect + would have + V3',
				formula: 'If + Subj + had + V3, Subj + would have + V3',
				activeZone: 'two_past',
				example: 'If they had saved rainwater, the garden would have survived.',
				markers: 'yesterday, last summer, earlier, in the past'
			}),
			visualCaptionAr: 'التركيب الزمني للشرط من النوع الثالث للتعبير عن الندم أو افتراض ماض مختلف',
			examples: [
				{
					problemAr: 'Put the verbs in brackets into the right tense: If clean technology (be) cheaper today, developing nations (adopt) it faster.',
					solutionAr: 'If clean technology were cheaper today, developing nations would adopt it faster. (Type 2)'
				},
				{
					problemAr: 'Rewrite with "Unless": "If we do not conserve water, reservoirs will dry up."',
					solutionAr: 'Unless we conserve water, reservoirs will dry up.'
				}
			],
			watchOutAr:
				'قاعدة ذهبية لا تنساها أبدا: لا تضع will ولا would داخل جملة If (لا تقل If it will rain ولا If I would have)! وانتبه أن unless تعني if not فلا نضع بعدها نفيا (لا تقل Unless we do not save).'
		},
		practice: [
			{
				questionAr: 'Complete this scientific fact (Type 0): "If you cool water vapour, it ...... back into liquid."',
				options: ['turned', 'will turning', 'turns', 'would turn'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الحقيقة العلمية لا تصرف في الماضي.',
					'خطأ: صيغة غير صحيحة.',
					'صحيح! Type 0 يأخذ Present Simple في كلا الطرفين (cool / turns).',
					'خطأ: would للشرط الخيالي لا الحقيقة العلمية.'
				],
				explanationAr: 'الحقائق الفيزيائية الثابتة تصرف في Conditional Type 0 (Present Simple + Present Simple).'
			},
			{
				questionAr: 'Choose the correct Type 1 conditional: "If our school installs solar lamps, electricity bills ...... significantly."',
				options: ['drop would', 'will drop', 'dropped', 'would have dropped'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ترتيب غير صحيح.',
					'ممتاز! If + Present Simple (installs) يتبعه will + Stem (will drop).',
					'خطأ: dropped ماض بسيط لا يطابق installs.',
					'خطأ: هذا جواب شرط للنوع الثالث.'
				],
				explanationAr: 'في النوع الأول يتبع جملة If بالمضارع البسيط جواب شرط بـ will + Stem.'
			},
			{
				questionAr: 'Complete this Type 2 conditional: "If I ...... an environmental engineer, I would design low-cost water purifiers."',
				options: ['am', 'were', 'had been', 'will be'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: وجود would design يدل على النوع الثاني لا الأول.',
					'أحسنت! في النوع الثاني نستعمل were مع I في الأسلوب الأكاديمي القياسي.',
					'خطأ: had been للنوع الثالث.',
					'خطأ: لا نضع will داخل جملة If.'
				],
				explanationAr: 'مع جواب الشرط would + Stem (النوع الثاني) نستعمل الماضي الافتراضي were.'
			},
			{
				questionAr: 'Select the accurate Type 3 conditional sentence:',
				options: [
					'If the factory had filtered its fumes, the air would not have become polluted.',
					'If the factory filtered its fumes, the air would not have become polluted.',
					'If the factory would have filtered its fumes, the air stayed clean.',
					'If the factory has filtered its fumes, the air would stay clean.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! If + Past Perfect (had filtered) + would not have + V3 (become).',
					'خطأ: جملة If تحتاج Past Perfect (had filtered) لتوافق would not have become.',
					'خطأ: لا نضع would have داخل جملة If.',
					'خطأ: لا يتطابق المضارع التام مع would stay.'
				],
				explanationAr: 'النوع الثالث يجمع بين had + V3 في جملة If و would (not) have + V3 في جواب الشرط.'
			},
			{
				questionAr: 'Rewrite accurately with "Unless": "If citizens do not reduce plastic waste, rivers will suffer."',
				options: [
					'Unless citizens do not reduce plastic waste, rivers will suffer.',
					'Unless citizens reduce plastic waste, rivers will suffer.',
					'Unless citizens reduced plastic waste, rivers will suffer.',
					'Unless citizens will reduce plastic waste, rivers suffer.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Unless تحمل النفي في ذاتها فلا نجمعها مع do not.',
					'صحيح! حذفنا If ... do not وعوضناها بـ Unless مع فعل مثبت.',
					'خطأ: حافظ على المضارع البسيط لأن الجملة من النوع الأول.',
					'خطأ: لا نضع will داخل جملة Unless.'
				],
				explanationAr: 'تحل Unless محل If ... not فيبقى الفعل بعدها مثبتا في المضارع البسيط.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t2_cause_effect_purpose',
		slug: 'eng-2as-le-t2-cause-effect-purpose',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not & Science and Society',
		order: 3,
		titleAr: 'التعبير عن السبب والنتيجة والغاية (So that, In order to, Owing to, Consequently)',
		objectives: [
			'التمييز الدقيق بين روابط السبب المتبوعة بجملة (because, since, as) والمتبوعة باسم (owing to, due to, because of)',
			'توظيف روابط النتيجة (consequently, therefore, as a result, so ... that) بدقة نحوية وترقيمية',
			'الربط السليم بين الفكرة وغايتها باستعمال (in order to / so as to + Stem) و (so that + Subject + modal + Stem)'
		],
		keywordsAr: ['so that', 'in order to', 'owing to', 'consequently', 'cause effect purpose', 'السبب والنتيجة والغاية'],
		discover: {
			scenarioAr:
				'في النصوص العلمية والبيئية تترابط الأفكار بثلاث علاقات منطقية: السبب (Owing to drought)، والنتيجة (Consequently, crops shrank)، والغاية (Engineers built dams so that farms could survive / in order to store water).',
			svg: svgEnglishGrammarMap({
				title: 'Cause, Effect and Purpose Linkers (2AS LE)',
				rootLabel: 'Logical Relations',
				rootSub: 'Check meaning + grammatical complement',
				branches: [
					{
						label: 'Cause (+ Noun)',
						rule: 'owing to / due to / because of',
						example: 'Owing to heat, lakes shrank.'
					},
					{
						label: 'Cause (+ Clause)',
						rule: 'because / since / as',
						example: 'Since heat rose, lakes shrank.'
					},
					{
						label: 'Effect / Result',
						rule: 'Consequently, / Therefore,',
						example: 'Rainfall fell; consequently, dams dropped.'
					},
					{
						label: 'Purpose (Goal)',
						rule: 'in order to + Stem | so that + S + can/could',
						example: 'We recycle so that cities stay clean.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن بين: "Owing to excessive waste, landfills overflowed." و "Because waste was excessive, landfills overflowed." لماذا جاءت excessive waste بدون فعل بعد Owing to؟',
					hintAr: 'تذكر أن owing to و due to و because of حروف جر مركبة.',
					expectedInput: 'لأن owing to تتبعها عبارة اسمية (Noun Phrase) فقط',
					revealAr:
						'تتبع owing to و due to و because of عبارة اسمية فقط (Noun Phrase)، بينما تتبع because و since و as جملة كاملة (Subject + Verb).'
				},
				{
					promptAr:
						'قارن بين صيغتي الغاية: (1) "Scientists use solar labs in order to save fuel." و (2) "Scientists use solar labs so that communities can enjoy clean air." متى نفضل so that؟',
					hintAr: 'انظر هل الفاعل في الجملتين واحد أم مختلف (Scientists مقابل communities).',
					expectedInput: 'نستعمل so that خاصة عندما يختلف الفاعل ويتبعها فاعل + فعل ناقص (can/could/may)',
					revealAr:
						'نستعمل in order to / so as to + Stem عندما يكون الفاعل واحدا (والنفي: in order not to)، ونستعمل so that + Subject + can / will / could / might + Stem سواء اتحد الفاعل أم اختلف.'
				},
				{
					promptAr:
						'كيف تربط بين السبب والنتيجة بـ Consequently: "The oasis adopted drip irrigation. Water loss dropped by half."',
					hintAr: 'ضع نقطة أو فاصلة منقوطة قبل consequently ثم فاصلة بعدها.',
					expectedInput: 'The oasis adopted drip irrigation; consequently, water loss dropped by half.',
					revealAr:
						'تسبق Consequently و Therefore و As a result نقطة أو فاصلة منقوطة، وتتبعها فاصلة مباشرة قبل جملة النتيجة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'السبب (Cause): because / since / as + Clause (فاعل + فعل)، أما owing to / due to / because of + Noun Phrase (عبارة اسمية).',
				'النتيجة (Effect): Consequently, / Therefore, / As a result, / Thus, (تبدأ جملة النتيجة بعد نقطة أو فاصلة منقوطة وتليها فاصلة)؛ أو صيغة so + Adj + that / such + Noun Phrase + that.',
				'الغاية (Purpose — نفس الفاعل): to / in order (not) to / so as (not) to + Stem (مثال: We plant trees in order to stop erosion).',
				'الغاية (Purpose — جملة كاملة): so that / in order that + Subject + can / will / may (في الحاضر) أو could / would / might (في الماضي) + Stem.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Negative Purpose and Result Patterns',
				rootLabel: 'High-Frequency Exam Traps',
				rootSub: 'Master these exact word orders',
				branches: [
					{
						label: 'Negative Purpose (1)',
						rule: 'in order NOT to + Stem',
						example: 'Act wisely in order not to waste water.'
					},
					{
						label: 'Negative Purpose (2)',
						rule: 'so as NOT to + Stem',
						example: 'Drive slowly so as not to pollute.'
					},
					{
						label: 'So ... that',
						rule: 'so + Adjective/Adverb + that',
						example: 'The filter is so effective that it purifies all water.'
					},
					{
						label: 'Such ... that',
						rule: 'such + (a/an) Adj + Noun + that',
						example: 'It was such a useful tool that labs bought it.'
					}
				]
			}),
			visualCaptionAr: 'التراكيب الدقيقة للنفي في الغاية وصيغتي so...that و such...that في شعبة اللغات',
			examples: [
				{
					problemAr: 'Combine using "owing to": "Many springs dried up because rainfall was scarce."',
					solutionAr: 'Many springs dried up owing to scarce rainfall. (أو: owing to the scarcity of rainfall.)'
				},
				{
					problemAr: 'Combine using "so that": "Al-Biruni built precise instruments. He wanted to measure the Earth accurately."',
					solutionAr: 'Al-Biruni built precise instruments so that he could measure the Earth accurately.'
				}
			],
			watchOutAr:
				'انتبه لتوافق الزمن مع so that: إذا كان الفعل الأول ماضيا (built) نستخدم could أو would بعد so that لا can! وانتبه لموضع not في الغاية المنفية: in order not to وليس in order to not.'
		},
		practice: [
			{
				questionAr: 'Choose the correct cause linker: "...... the rapid expansion of green belts, sandstorms decreased near the town."',
				options: ['Because', 'Owing to', 'Consequently', 'So that'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: Because تحتاج جملة كاملة فيها فعل مصرف.',
					'صحيح! ما بعد الفراغ عبارة اسمية (the rapid expansion...) فتأخذ Owing to.',
					'خطأ: Consequently للنتيجة لا للسبب.',
					'خطأ: So that للغاية.'
				],
				explanationAr: 'يتبع التعبير Owing to عبارة اسمية للتعبير عن السبب.'
			},
			{
				questionAr: 'Select the accurate negative purpose structure: "Farmers use drip pipes ...... waste precious groundwater."',
				options: [
					'in order to not',
					'in order not to',
					'so that not to',
					'owing to not'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الترتيب القياسي يضع not قبل to.',
					'ممتاز! in order not to + Stem هي الصيغة السليمة.',
					'خطأ: so that يتبعها فاعل وفعل ناقص لا to.',
					'خطأ: owing to للسبب لا للغاية.'
				],
				explanationAr: 'نفي الغاية مع المصدر يكون بصيغة in order not to + Stem أو so as not to + Stem.'
			},
			{
				questionAr: 'Complete with the right tense agreement: "Ibn al-Haytham designed dark-room experiments so that he ...... prove how light travels."',
				options: ['can', 'could', 'will', 'may'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الفعل الأول designed في الماضي فيحتاج فعلا ناقصا ماضيا.',
					'صحيح! التوافق الزمني مع الماضي designed يقتضي could.',
					'خطأ: will للحاضر والمستقبل لا الماضي.',
					'خطأ: may للحاضر والماضي منها might.'
				],
				explanationAr: 'عندما يكون فعل الجملة الرئيسية ماضيا (designed) نستخدم could/would/might بعد so that.'
			},
			{
				questionAr: 'Which sentence expresses EFFECT (Result) accurately?',
				options: [
					'The lab calibrated its sensors; consequently, the readings became highly reliable.',
					'The lab calibrated its sensors; owing to, the readings became highly reliable.',
					'Consequently the lab calibrated its sensors, the readings became reliable.',
					'The lab calibrated its sensors in order to the readings became reliable.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! فاصلة منقوطة + consequently + فاصلة + جملة النتيجة.',
					'خطأ: owing to للسبب وتتبعها عبارة اسمية.',
					'خطأ: Consequently لا تقع قبل السبب بل قبل النتيجة.',
					'خطأ: in order to يتبعها مصدر لا جملة كاملة.'
				],
				explanationAr: 'تقدم أداة النتيجة Consequently الجملة الناتجة بعد فاصلة منقوطة أو نقطة وتليها فاصلة.'
			},
			{
				questionAr: 'Choose between "so ... that" and "such ... that": "Renewable energy is ...... a vital investment that every region should support it."',
				options: ['so', 'such', 'owing', 'therefore'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: وجود أداة التنكير والاسم (a vital investment) يتطلب such لا so.',
					'صحيح! such + a + Adjective + Noun + that.',
					'خطأ: owing لا تدخل في هذا التركيب.',
					'خطأ: therefore لا تدخل في هذا التركيب.'
				],
				explanationAr: 'تستخدم such قبل العبارة الاسمية (a vital investment)، بينما تستخدم so قبل الصفة وحدها.'
			}
		]
	},
	{
		id: 'eng_lesson_2as_le_t2_morphology_stress_shift',
		slug: 'eng-2as-le-t2-morphology-stress-shift',
		grade: '2as_le',
		yearSubjectId: 778,
		trimesterId: 't2',
		sequenceId: 'seq2',
		sequenceTitleAr: 'الوحدة 2: Waste Not, Want Not & Science and Society',
		order: 4,
		titleAr: 'الصرف وتكوين الكلمات وانزياح النبر (Prefixes, Suffixes & Stress Shift)',
		objectives: [
			'تفكيك الكلمات العلمية والبيئية المركبة إلى سابقة وجذر ولاحقة (Prefix + Root + Suffix)',
			'إدراك ظاهرة انزياح النبر الصوتي (Stress Shift) عند إضافة لواحق مثل -tion و -ic و -ity و -al',
			'إتقان التمييز الصوتي بين الاسم والفعل المتطابقين إملائيا (CON-duct vs con-DUCT, PRO-duce vs pro-DUCE)'
		],
		keywordsAr: ['Morphology', 'Prefixes', 'Suffixes', 'Stress Shift', 'انزياح النبر'],
		discover: {
			scenarioAr:
				'انطق زوج الكلمات التالي بصوت مسموع: E-co-no-my ثم e-co-NO-mic، و SCI-ence ثم sci-en-TI-fic، و IN-crease (اسم) ثم in-CREASE (فعل). لاحظ كيف يتحرك النبر الصوتي من مقطع إلى آخر بتغير اللاحقة أو الوظيفة النحوية!',
			svg: svgEnglishWordFormation({
				title: 'Morphology Analysis Table (2AS LE)',
				prefix: 'un-',
				root: 'sustain',
				suffix: '-able',
				derivedWord: 'unsustainable',
				meaningNote: 'Prefix = negative meaning | Root = core idea | Suffix = Adjective'
			}),
			steps: [
				{
					promptAr:
						'قارن موضع النبر في: "e-CO-lo-gy" و "e-co-LO-gi-cal". أي مقطع حمل النبر في الكلمة الأولى وأي مقطع حمله في الثانية؟',
					hintAr: 'اللاحقة -gy تضع النبر على الثالث من النهاية (CO)، واللاحقة -ical تضع النبر قبل -ic مباشرة (LO).',
					expectedInput: 'انزاح النبر من المقطع الثاني CO إلى المقطع الثالث LO',
					revealAr:
						'إضافة اللاحقة -ical سحبت النبر درجة نحو النهاية: من e-CO-lo-gy إلى e-co-LO-gi-cal. هذه الظاهرة تسمى انزياح النبر (Stress Shift).'
				},
				{
					promptAr:
						'قارن بين الكلمة نفسها اسما وفعلا: "Algeria boosts solar EX-port" (اسم) مقابل "Algeria aims to ex-PORT clean energy" (فعل). أين يقع النبر في الحالتين؟',
					hintAr: 'تذكر قاعدة المقاطع الثنائية للأسماء والأفعال.',
					expectedInput: 'على الأول في الاسم (EX-port) وعلى الثاني في الفعل (ex-PORT)',
					revealAr:
						'في كثير من الكلمات الثنائية المشتركة بين الاسم والفعل (export, import, record, progress, produce, increase)، يقع النبر على المقطع الأول للاسم وعلى الثاني للفعل.'
				},
				{
					promptAr:
						'فكك الكلمات التالية إلى Prefix + Root + Suffix: "deforestation" و "irreplaceable".',
					hintAr: 'في الأولى: de + forest + ation؛ وفي الثانية: ir + re + place + able.',
					expectedInput: 'de + forest + ation و ir + replace + able',
					revealAr:
						'فهم السوابق المعنوية مثل de- (إزالة)، re- (إعادة)، over- (إفراط)، mis- (خطأ) واللواحق الاشتقاقية يسهل فك أي كلمة أكاديمية في النص.'
				}
			]
		},
		summary: {
			rulesAr: [
				'تفكيك الكلمة (Word Division): Prefix (يغير المعنى: re-, de-, over-, mis-, un-, im-, il-, ir-) + Root (الجذر الأساسي) + Suffix (يحدد النوع النحوي: -tion, -ity, -able, -ize, -ic, -al).',
				'انزياح النبر باللواحق (Stress-Shifting Suffixes): اللواحق -tion / -sion / -ic / -ical / -ity تسحب النبر نحوها، مثال: NA-tion تصبح na-TION-al ثم na-tio-NA-li-ty؛ و E-ner-gy تصبح e-ner-GE-tic.',
				'اللواحق المحايدة للنبر (Stress-Neutral Suffixes): مثل -ful, -less, -ment, -ness, -er, -able غالبا لا تغير موضع النبر في الجذر (PEACE تصبح PEACE-ful، و de-VE-lop تصبح de-VE-lop-ment).',
				'الأسماء مقابل الأفعال المتطابقة إملائيا (Homographs): الاسم منبور على الأول (RE-cord, PRO-gress, IM-port, PRO-duce)، والفعل منبور على الثاني (re-CORD, pro-GRESS, im-PORT, pro-DUCE).'
			],
			visualSvg: svgEnglishPhoneticsChart({
				title: 'Stress Shift Patterns in 2AS LE',
				subtitle: 'Notice how the stressed syllable moves',
				columns: [
					{
						sound: 'Base + -ic',
						rule: 'Moves right before -ic',
						examples: 'SCI-ence / sci-en-TI-fic'
					},
					{
						sound: 'Base + -ity',
						rule: 'Moves to 3rd from end',
						examples: 'E-qual / e-QUA-li-ty'
					},
					{
						sound: 'Noun vs Verb',
						rule: '1st (Noun) vs 2nd (Verb)',
						examples: 'PRO-gress / pro-GRESS'
					}
				]
			}),
			visualCaptionAr: 'أنماط انزياح النبر الثلاثة الأكثر ورودا في تمارين الصوتيات لشعبة اللغات',
			examples: [
				{
					problemAr: 'Divide into Prefix / Root / Suffix: reforestation, overuse, unscientific.',
					solutionAr: 're + forest + ation | over + use + (none) | un + scient + ific (root: science).'
				},
				{
					problemAr: 'Mark the stressed syllable in each pair: (1) ATOM / ATOMIC (2) RECORD (noun) / RECORD (verb).',
					solutionAr: '(1) A-tom (1st) / a-TO-mic (2nd). (2) RE-cord (1st) / re-CORD (2nd).'
				}
			],
			watchOutAr:
				'في جدول تفكيك الكلمات (Prefix / Root / Suffix) لا تخترع سابقة غير موجودة! مثلا في كلمة "preservation" لا توجد سابقة منفصلة بل الجذر preserve واللاحقة -ation، بينما في "deforestation" توجد سابقة de- وجذر forest ولاحقة -ation.'
		},
		practice: [
			{
				questionAr: 'How is the word "reforestation" divided into Prefix / Root / Suffix?',
				options: [
					'Prefix: re- | Root: forest | Suffix: -ation',
					'Prefix: ref- | Root: orest | Suffix: -ation',
					'Prefix: none | Root: reforest | Suffix: -tion',
					'Prefix: re- | Root: for | Suffix: -estation'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! re- (إعادة) + forest (غابة) + -ation (لاحقة الاسم).',
					'خطأ: الجذر هو forest وليس orest.',
					'خطأ: re- سابقة واضحة تعني إعادة.',
					'خطأ: تقسيم غير صحيح للجذر.'
				],
				explanationAr: 'تتكون reforestation من السابقة re- والجذر forest واللاحقة الاسمية -ation.'
			},
			{
				questionAr: 'Which pair shows a clear STRESS SHIFT caused by adding a suffix?',
				options: [
					'PEACE and PEACE-ful',
					'de-VE-lop and de-VE-lop-ment',
					'E-ner-gy and e-ner-GE-tic',
					'CARE and CARE-less'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: اللاحقة -ful محايدة لا تحرك النبر.',
					'خطأ: اللاحقة -ment لا تحرك النبر هنا.',
					'أحسنت! اللاحقة -ic سحبت النبر من المقطع الأول (E) إلى الثالث (GE).',
					'خطأ: اللاحقة -less محايدة لا تحرك النبر.'
				],
				explanationAr: 'اللاحقة -ic تجذب النبر إلى المقطع الذي يسبقها مباشرة فتحدث انزياحا للنبر.'
			},
			{
				questionAr: 'Where does the stress fall in "increase" in the sentence: "Solar stations will increase clean output"?',
				options: ['1st syllable (IN-crease)', '2nd syllable (in-CREASE)', 'Both syllables equally', 'Neither syllable'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: increase هنا فعل بعد will وليس اسما.',
					'صحيح! لأن increase هنا فعل (بعد will) فالنبر على المقطع الثاني in-CREASE.',
					'خطأ: في الإنجليزية يحمل مقطع واحد النبر الأساسي.',
					'خطأ: الكلمة منبورة على المقطع الثاني.'
				],
				explanationAr: 'في الكلمات الثنائية المشتركة بين الاسم والفعل، ينبر الفعل على المقطع الثاني (in-CREASE).'
			},
			{
				questionAr: 'What does the prefix "over-" mean in "overconsumption of water"?',
				options: ['Not enough', 'Again', 'Too much / excessive', 'Opposite of'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: هذا معنى under-.',
					'خطأ: هذا معنى re-.',
					'ممتاز! over- تفيد الإفراط وتجاوز الحد (الاستهلاك المفرط).',
					'خطأ: هذا معنى un- أو dis-.'
				],
				explanationAr: 'السابقة over- تضيف معنى الإفراط والزيادة عن الحد الطبيعي.'
			},
			{
				questionAr: 'Identify the stressed syllable in "responsibility" (re-spon-si-bi-li-ty):',
				options: ['2nd syllable (SPON)', '3rd syllable (SI)', '4th syllable (BI)', '5th syllable (LI)'],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: SPON هو المقطع المنبور في responsible قبل إضافة -ity.',
					'خطأ: عد ثلاثة مقاطع من النهاية: ty (1), li (2), bi (3).',
					'صحيح! اللاحقة -ity أزاحت النبر إلى المقطع الرابع: re-spon-si-BI-li-ty.',
					'خطأ: LI هو المقطع الثاني من النهاية لا الثالث.'
				],
				explanationAr: 'أزاحت اللاحقة -ity النبر من SPON في responsible إلى BI في re-spon-si-BI-li-ty.'
			}
		]
	}
];
