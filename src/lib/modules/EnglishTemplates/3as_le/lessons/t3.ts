import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishWritingStructure
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Interactive Lessons — Trimester 3: "Safety First", "Solidarity & Human Values" & BAC LE 6-Point Essay Mastery (4 lessons)
 */
export const LESSONS_3AS_LE_T3: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Cause, Result & Purpose (owing to, consequently, so as to, in order that)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t3_cause_result_purpose',
		slug: 'eng-3as-le-t3-cause-result-purpose',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't3',
		sequenceId: 'unit4',
		sequenceTitleAr: 'الوحدة 4 و 5: Safety First & Solidarity (سلامة المستهلك والتضامن وإتقان مقال البكالوريا)',
		order: 1,
		titleAr: 'التعبير عن السبب والنتيجة والغاية: Owing to / Consequently / So as to / In order that',
		objectives: [
			'التمييز البنيوي بين أدوات السبب المتبوعة بجملة (because, since, as) والمتبوعة بعبارة اسمية (owing to, due to, because of)',
			'إتقان التمييز بين أدوات الغاية المتبوعة بالمصدر (to, in order to, so as to) والمتبوعة بجملة وفاعل (so that, in order that + can/could/will/would)',
			'توظيف روابط النتيجة الأكاديمية (consequently, as a result, therefore, thus) في التحويل والمقال'
		],
		keywordsAr: ['Cause', 'Result', 'Purpose', 'owing to', 'consequently', 'so as to', 'in order that'],
		discover: {
			scenarioAr:
				'في وحدتي «سلامة المستهلك» (Safety First) و «التضامن والقيم الإنسانية» (Solidarity)، نربط باستمرار بين الأسباب (أغذية غير صحية / كوارث)، والنتائج (أمراض / تكاتف)، والغايات (لحماية الصحة ومساعدة المحتاجين).',
			svg: svgEnglishGrammarMap({
				title: 'Cause, Result & Purpose Connectors (3AS LE)',
				rootLabel: 'Match the Connector to Its Grammar Frame',
				rootSub: 'Clause (S + V) vs Noun Phrase vs Infinitive (Stem)',
				branches: [
					{
						label: 'Cause',
						rule: 'because/since + S+V | owing to/due to + Noun',
						example: 'Owing to fast food, obesity rises.'
					},
					{
						label: 'Result',
						rule: 'consequently / therefore / thus + S+V',
						example: 'Labels were unclear; consequently, buyers complained.'
					},
					{
						label: 'Purpose (Same S)',
						rule: 'so as (not) to / in order (not) to + Stem',
						example: 'Read labels so as to avoid additives.'
					},
					{
						label: 'Purpose (Clause)',
						rule: 'in order that / so that + S + can/will/could',
						example: 'We donate so that needy families can thrive.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الذي يأتي مباشرة بعد owing to و due to و because of؟',
					hintAr: 'هل يأتي فاعل وفعل أم عبارة اسمية؟',
					expectedInput: 'عبارة اسمية (Noun Phrase) أو Verb-ing',
					revealAr: 'تُتبع owing to / due to / because of بعبارة اسمية أو مصدر بـ ing (مثل: Owing to excessive sugar، Due to poor storage). ولإدخال جملة كاملة نكتب owing to the fact that.'
				},
				{
					promptAr: 'كيف ننفي أداة الغاية so as to في جملة: Consumers check expiry dates .......... buy spoiled food؟',
					hintAr: 'أين نضع كلمة not بالنسبة إلى to؟',
					expectedInput: 'so as not to (أو in order not to)',
					revealAr: 'في النفي نكتب دائماً so as not to + Stem أو in order not to + Stem (وليس not so as to).'
				},
				{
					promptAr: 'ما الفعل الناقص المناسب بعد in order that / so that عندما يكون فعل الجملة الرئيسية في الماضي؟',
					hintAr: 'في المضارع نستخدم can / will / may، فماذا نستخدم في الماضي؟',
					expectedInput: 'could / would / might + Stem',
					revealAr: 'نطابق زمن الفعل المساعد: مع المضارع (can / will / may)، ومع الماضي (could / would / might). مثال: Volunteers organized Touiza so that neighbours could rebuild the house.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Cause (السبب): Because / Since / As + Subject + Verb | Because of / Owing to / Due to + Noun Phrase / Verb-ing.',
				'Result (النتيجة): Clause 1; therefore, / consequently, / thus, / as a result, Clause 2.',
				'Purpose — نفس الفاعل (الغاية): to / in order to / so as to + Verb Stem (وفي النفي: in order not to / so as not to + Stem).',
				'Purpose — جملة كاملة (الغاية): so that / in order that + Subject + can / will / may (للمضارع) أو could / would / might (للماضي) + Verb Stem.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Transforming Cause & Purpose (BAC LE)',
				rootLabel: 'Same Meaning, Different Grammar Structure',
				rootSub: 'Zero Mistakes in Sentence Rewriting',
				branches: [
					{
						label: 'because to owing to',
						rule: 'Turn S + V into Noun Phrase',
						example: 'because ads mislead = owing to misleading ads'
					},
					{
						label: 'so as to to so that',
						rule: 'Add Subject + can / could',
						example: 'so as to stay fit = so that we can stay fit'
					},
					{
						label: 'because to consequently',
						rule: 'Swap order: Cause first, Result second!',
						example: 'Cause; consequently, Result.'
					}
				]
			}),
			visualCaptionAr: 'قواعد التحويل المتبادل بين السبب والنتيجة والغاية في تمارين البكالوريا.',
			examples: [
				{
					problemAr: 'Rewrite: a) Many families suffered because food prices rose sharply. | b) Owing to ..........',
					solutionAr: 'b) Owing to the sharp rise in food prices (OR Owing to the fact that food prices rose sharply), many families suffered.'
				},
				{
					problemAr: 'Combine with (in order that): Charities collected warm coats. Poor villagers could face the winter safely.',
					solutionAr: 'Charities collected warm coats in order that poor villagers could face the winter safely.'
				},
				{
					problemAr: 'Combine with (so as not to): Shoppers inspect ingredients carefully. They want to avoid harmful preservatives.',
					solutionAr: 'Shoppers inspect ingredients carefully so as not to consume harmful preservatives.'
				}
			],
			watchOutAr: 'انتبه عند التحويل من because إلى consequently: يجب عكس ترتيب الجملتين بحيث تأتي جملة السبب أولاً ثم consequently ثم جملة النتيجة!'
		},
		practice: [
			{
				questionAr: 'Choose the correct connector: .......... excessive salt consumption, blood pressure problems have increased.',
				options: ['Owing to', 'Because', 'Since', 'Consequently'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعدها عبارة اسمية (excessive salt consumption) فتناسبها Owing to أو Due to.',
					'خطأ: Because تتطلب فاعلاً وفعلاً.',
					'خطأ: Since للسبب تتطلب جملة كاملة.',
					'خطأ: Consequently تعبر عن النتيجة لا السبب.'
				],
				explanationAr: 'Owing to / Due to / Because of تُتبع بعبارة اسمية للتعبير عن السبب.'
			},
			{
				questionAr: 'Complete with negative purpose: Manufacturers must list allergens clearly .......... endanger sensitive consumers.',
				options: ['so as not to', 'not so as to', 'so that not', 'in order to not'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الصيغة القياسية للغرض المنفي هي so as not to + Stem (أو in order not to).',
					'خطأ: موضع not يأتي قبل to مباشرة.',
					'خطأ: so that تحتاج فاعلاً وفعلاً ناقصاً.',
					'خطأ: الترتيب القياسي هو in order not to.'
				],
				explanationAr: 'للتعبير عن الغاية المنفية نكتب so as not to + Stem أو in order not to + Stem.'
			},
			{
				questionAr: 'Complete: Algerian youth launched a charity drive in order that orphans .......... receive school bags before September.',
				options: ['could', 'can', 'will', 'may'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: فعل الجملة الرئيسية في الماضي (launched)، فنطابقه بـ could بعد in order that.',
					'خطأ: can للمضارع.',
					'خطأ: will للمضارع.',
					'خطأ: may للمضارع (الماضي might).'
				],
				explanationAr: 'بعد in order that / so that نستخدم could / would / might عندما يكون الفعل الرئيسي ماضياً.'
			},
			{
				questionAr: 'Rewrite using "consequently": Many consumers fell ill because the dairy products were poorly refrigerated.',
				options: [
					'The dairy products were poorly refrigerated; consequently, many consumers fell ill.',
					'Many consumers fell ill; consequently, the dairy products were poorly refrigerated.',
					'Because the dairy products were poorly refrigerated; consequently, many consumers fell ill.',
					'Consequently the dairy products were poorly refrigerated, many consumers fell ill.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: وضعنا السبب أولاً ثم consequently ثم النتيجة مع حذف because.',
					'خطأ: عكست السبب والنتيجة فأصبح المرض سبباً لسوء التبريد!',
					'خطأ: لا نجمع بين because و consequently.',
					'خطأ: موضع وترقيم خاطئان.'
				],
				explanationAr: 'عند التحويل إلى consequently نبدأ بجملة السبب ثم نضع الفاصلة المنقوطة + consequently, + جملة النتيجة.'
			},
			{
				questionAr: 'Which structure correctly expresses purpose with TWO DIFFERENT subjects?',
				options: [
					'Parents cook healthy meals so that children can grow strong.',
					'Parents cook healthy meals so as to children grow strong.',
					'Parents cook healthy meals in order to children can grow strong.',
					'Parents cook healthy meals owing to children grow strong.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: عند اختلاف الفاعلين (Parents / children) نستعمل so that / in order that + S + can/could.',
					'خطأ: so as to لا تُتبع بفاعل جديد.',
					'خطأ: in order to تُتبع بالمصدر المجرد مباشرة.',
					'خطأ: owing to للسبب وتتبع باسم.'
				],
				explanationAr: 'عندما يختلف فاعل الغاية عن فاعل الجملة الرئيسية نستعمل so that / in order that.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Modals of Deduction & Advice (must have, cannot have, might have, ought to)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t3_modals_deduction_advice',
		slug: 'eng-3as-le-t3-modals-deduction-advice',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't3',
		sequenceId: 'unit4',
		sequenceTitleAr: 'الوحدة 4 و 5: Safety First & Solidarity (سلامة المستهلك والتضامن وإتقان مقال البكالوريا)',
		order: 2,
		titleAr: 'الأفعال الناقصة للاستنتاج والنصح: Must have / Cannot have / Might have / Ought to',
		objectives: [
			'التمييز الدقيق بين درجات الاستنتاج في الماضي: يقين إيجابي (must have + V3)، استحالة (cannot have + V3)، واحتمال (might/may have + V3)',
			'توظيف أفعال النصح والواجب الأخلاقي (ought to, should, had better) في قضايا الصحة والتضامن',
			'استعمال should have + V3 للتعبير عن اللوم أو الندم على أمر واجب لم يُنجز في الماضي'
		],
		keywordsAr: ['Modals of Deduction', 'must have', 'cannot have', 'might have', 'ought to', 'should have'],
		discover: {
			scenarioAr:
				'عندما نرى طفلاً أصيب بتسمم غذائي أو مجتمعاً تغلب على كارثة بالتضامن، نستنتج ما حدث في الماضي بدرجات يقين مختلفة، ونوجه نصائح أخلاقية ووقائية للمستقبل.',
			svg: svgEnglishGrammarMap({
				title: 'Past Deduction & Moral Advice Modals',
				rootLabel: 'Modal + have + Past Participle (Past) vs Modal + Stem (Present)',
				rootSub: 'Choose the exact degree of certainty!',
				branches: [
					{
						label: 'Certainty (True)',
						rule: 'must have + V3 (95% sure)',
						example: 'They must have eaten spoiled food.'
					},
					{
						label: 'Impossibility',
						rule: 'cannot have + V3 (Impossible!)',
						example: 'She cannot have ignored the warning.'
					},
					{
						label: 'Possibility',
						rule: 'might / may / could have + V3',
						example: 'The ad might have misled buyers.'
					},
					{
						label: 'Advice & Regret',
						rule: 'ought to + Stem | should have + V3',
						example: 'We ought to assist elderly neighbours.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما النفي الصحيح للاستنتاج اليقيني must have + V3 (أي للتعبير عن «يستحيل أنه فعل ذلك» في الماضي)؟',
					hintAr: 'احذر: ليس must not have!',
					expectedInput: 'cannot have + V3 (أو could not have + V3)',
					revealAr: 'نفي اليقين الاستنتاجي must have + V3 هو cannot have + V3 (وليس must not have). مثال: He was abroad, so he cannot have signed the contract.'
				},
				{
					promptAr: 'ما الفرق في المعنى بين You ought to read food labels و You ought to have read the label؟',
					hintAr: 'قارن الزمن بين المصدر المجرد (read) والمصدر التام (have read).',
					expectedInput: 'الأولى نصيحة للحاضر/المستقبل، والثانية لوم أو ندم على الماضي',
					revealAr: 'ought to / should + Stem تفيد النصيحة الحالية، أما ought to have / should have + V3 فتفيد اللوم والندم على واجب فات في الماضي.'
				},
				{
					promptAr: 'أعد كتابة الجملة بفعل استنتاج: I am sure that local volunteers helped the flood victims quickly.',
					hintAr: 'I am sure + Past = must have + V3.',
					expectedInput: 'Local volunteers must have helped the flood victims quickly.',
					revealAr: 'عبارات اليقين (I am sure / certainly / definitely) مع فعل ماضٍ تُحوّل إلى must have + V3.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستنتاج القوي بالإيجاب (Past Certainty): Subject + must have + V3 (تعوض: I am sure / certainly + Past).',
				'الاستنتاج بالاستحالة (Past Impossibility): Subject + cannot have / could not have + V3 (تعوض: It is impossible that + Past).',
				'الاستنتاج بالاحتمال (Past Possibility): Subject + may have / might have / could have + V3 (تعوض: Perhaps / Maybe / It is possible that + Past).',
				'النصح والواجب الأخلاقي (Advice): Subject + ought to / should / had better + Stem. وللوم على الماضي: Subject + should (not) have / ought (not) to have + V3.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Rewriting Clues to Modals (BAC LE)',
				rootLabel: 'Spot the Clue Word in Sentence (a)',
				rootSub: 'Instant Modal Match',
				branches: [
					{
						label: 'sure / certainly',
						rule: 'must (have + V3)',
						example: 'Certainly he helped = He must have helped.'
					},
					{
						label: 'impossible',
						rule: 'cannot (have + V3)',
						example: 'Impossible she lied = She cannot have lied.'
					},
					{
						label: 'perhaps / maybe',
						rule: 'might / may (have + V3)',
						example: 'Maybe it expired = It might have expired.'
					}
				]
			}),
			visualCaptionAr: 'مفاتيح التحويل الفوري من عبارات اليقين والاحتمال إلى الأفعال الناقصة.',
			examples: [
				{
					problemAr: 'Rewrite: a) It is impossible that the certified lab approved toxic oil. | b) The certified lab ..........',
					solutionAr: 'b) The certified lab cannot have approved toxic oil.'
				},
				{
					problemAr: 'Rewrite: a) Perhaps the advert exaggerated the health benefits. | b) The advert ..........',
					solutionAr: 'b) The advert might (OR may) have exaggerated the health benefits.'
				},
				{
					problemAr: 'Rewrite: a) Consumers are strongly advised to avoid excessive sugary drinks. | b) Consumers ought ..........',
					solutionAr: 'b) Consumers ought to avoid excessive sugary drinks.'
				}
			],
			watchOutAr: 'انتبه للخطأ الكلاسيكي: نفي الاستنتاج must have هو cannot have وليس must not have! وكذلك لا تنس حرف الجر to بعد ought (ought to + Stem).'
		},
		practice: [
			{
				questionAr: 'Rewrite: I am certain that the charity team reached the mountain village early. Complete: The charity team .......... the mountain village early.',
				options: ['must have reached', 'cannot have reached', 'might have reached', 'must reach'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: اليقين في الماضي (certain + reached) يتحول إلى must have + V3.',
					'خطأ: cannot have تفيد الاستحالة لا اليقين الإيجابي.',
					'خطأ: might have تفيد مجرد احتمال.',
					'خطأ: must reach للحاضر وليس للماضي.'
				],
				explanationAr: 'اليقين بشأن حدث ماضٍ يُعبر عنه بـ must have + Past Participle.'
			},
			{
				questionAr: 'Choose the correct modal of impossibility: He was at home all day; he .......... caused the traffic accident.',
				options: ['cannot have', 'must not have', 'might not', 'ought not'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: للاستحالة في الماضي نستخدم cannot have + V3.',
					'خطأ: لا نستخدم must not have للاستنتاج بالنفي.',
					'خطأ: تنقص have كما أن المعنى استحالة لا مجرد احتمال.',
					'خطأ: ought not للنصح وليس للاستحالة.'
				],
				explanationAr: 'الاستحالة في الماضي = cannot have / could not have + V3.'
			},
			{
				questionAr: 'Rewrite: Maybe the shopkeeper forgot to turn on the refrigerator. Complete: The shopkeeper .......... to turn on the refrigerator.',
				options: ['might have forgotten', 'must have forgotten', 'cannot have forgotten', 'ought to forget'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: كلمة Maybe تدل على الاحتمال في الماضي فنستعمل might have + V3.',
					'خطأ: must have لليقين لا الاحتمال.',
					'خطأ: cannot have للاستحالة.',
					'خطأ: ought to للنصيحة.'
				],
				explanationAr: 'الاحتمال في الماضي (Maybe / Perhaps + Past) يتحول إلى might / may have + V3.'
			},
			{
				questionAr: 'Choose the right expression of past blame/regret: The company .......... tested the product before selling it.',
				options: ['should have', 'should', 'must', 'cannot have'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: should have + V3 (tested) تعبر عن واجب كان ينبغي فعله في الماضي ولم يُفعل.',
					'خطأ: should لا تُتبع بـ V3 مباشرة.',
					'خطأ: must لا تُتبع بـ V3 مباشرة.',
					'خطأ: لا تناسب معنى اللوم والواجب.'
				],
				explanationAr: 'should have + V3 و ought to have + V3 تستعملان للوم على تقصير ماضٍ.'
			},
			{
				questionAr: 'Choose the grammatically correct sentence with "ought":',
				options: [
					'Wealthy citizens ought to support community solidarity funds.',
					'Wealthy citizens ought support community solidarity funds.',
					'Wealthy citizens ought to supporting community solidarity funds.',
					'Wealthy citizens should to support community solidarity funds.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الصيغة القياسية هي ought to + Verb Stem.',
					'خطأ: نسيت to بعد ought.',
					'خطأ: بعد ought to يأتي المصدر المجرد لا -ing.',
					'خطأ: should لا تأخذ to.'
				],
				explanationAr: 'ought to + Stem، بخلاف should و had better اللتين تأتيان بلا to.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Comprehensive BAC LE Phonology Review
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t3_phonology_comprehensive',
		slug: 'eng-3as-le-t3-phonology-comprehensive',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't3',
		sequenceId: 'unit4',
		sequenceTitleAr: 'الوحدة 4 و 5: Safety First & Solidarity (سلامة المستهلك والتضامن وإتقان مقال البكالوريا)',
		order: 3,
		titleAr: 'المراجعة الصوتية الشاملة لبكالوريا اللغات الأجنبية: Final -ed / -s / Silent Letters / Stress / Syllables',
		objectives: [
			'مراجعة وتثبيت جميع أنماط السؤال الصوتي الخمسة المحتملة في بكالوريا اللغات الأجنبية',
			'تفادي الفخاخ الصوتية الدقيقة في كلمات جميع الوحدات (الحضارات، الأخلاقيات، التعليم، سلامة المستهلك، التضامن)',
			'ضمان العلامة الكاملة (1 إلى 1.5 نقطة) في سؤال الصوتيات في أقل من ثلاث دقائق'
		],
		keywordsAr: ['Phonology Review', 'Final -ed', 'Final -s', 'Silent Letters', 'Word Stress', 'Syllables'],
		discover: {
			scenarioAr:
				'في قسم Text Exploration من بكالوريا اللغات الأجنبية، يأتي السؤال الرابع دائماً في الصوتيات بأحد خمسة أشكال: نطق -ed، أو نطق -s، أو الحروف الصامتة، أو عدد المقاطع، أو المقطع المنبور. هذه المراجعة تجمع لك القواعد الخمس في لوحة واحدة!',
			svg: svgEnglishPhoneticsChart({
				title: 'BAC LE 5-in-1 Phonology Master Sheet',
				subtitle: 'Sound first, spelling second!',
				columns: [
					{
						sound: '-ed & -s',
						rule: '-ed: /t, d, id/ | -s: /s, z, iz/',
						examples: 'helped /t/, donated /id/ | labels /z/, boxes /iz/'
					},
					{
						sound: 'Silent Letters',
						rule: 'kn-, wr-, -mb, -bt, hon-, -sten',
						examples: 'knowledge (k), doubt (b), honest (h), listen (t)'
					},
					{
						sound: 'Stress & Syllables',
						rule: '-tion/-ic: 2nd end | -ty/-gy: 3rd end',
						examples: 'sol-i-DAR-i-ty (3rd), nu-TRI-tion (2nd)'
					}
				]
			}),
			steps: [
				{
					promptAr: 'صنّف الكلمات الأربع حسب نطق -ed: donated, consumed, packaged, produced.',
					hintAr: 'انظر للصوت الأخير قبل -ed: donate (/t/), consume (/m/), package (/dge/), produce (/s/).',
					expectedInput: '/t/: produced | /d/: consumed, packaged | /id/: donated',
					revealAr: 'produce تنتهي بصوت /s/ فتأخذ /t/؛ consume (/m/) و package (/dge/) مجهوران فيأخذان /d/؛ donate تنتهي بـ /t/ فتأخذ /id/.'
				},
				{
					promptAr: 'أين يقع النبر في كلمة solidarity (sol-i-dar-i-ty) و كلمة nutrition (nu-tri-tion)؟',
					hintAr: 'طبق قاعدة -ty (الثالث من النهاية) وقاعدة -tion (الثاني من النهاية).',
					expectedInput: 'sol-i-DAR-i-ty (3rd syllable) | nu-TRI-tion (2nd syllable)',
					revealAr: 'في solidarity (5 مقاطع) المقطع الثالث من النهاية هو DAR (الثالث من البداية). وفي nutrition (3 مقاطع) المقطع قبل -tion هو TRI (الثاني من البداية).'
				},
				{
					promptAr: 'ما الحرف الصامت في الكلمات: campaign, biscuit, honest, psychology؟',
					hintAr: 'راجع الحروف الصامتة: g قبل n، و u في gui/cui، و h، و p قبل s.',
					expectedInput: 'campaign: g | biscuit: u | honest: h | psychology: p',
					revealAr: 'كلمات وحدة التضامن والسلامة غنية بهذه الفخاخ: campaign (صامت g)، و foreign (صامت g)، و honest (صامت h)، و receipt (صامت p).'
				}
			]
		},
		summary: {
			rulesAr: [
				'Final -ed: /id/ بعد /t, d/ (donated, protected) | /t/ بعد /p, k, f, s, sh, ch, x/ (helped, cooked, produced, washed) | /d/ مع الباقي (shared, volunteered, saved).',
				'Final -s: /iz/ بعد /s, z, sh, ch, x, ce, ge/ (packages, charities لا بل surfaces, bridges, watches) | /s/ بعد /p, t, k, f, th/ (diets, snacks, myths) | /z/ مع الباقي (charities, citizens, consumers).',
				'Silent Letters: kn- (know), wr- (write), -mb/-bt (climb, doubt), -gn (campaign, foreign, sign), sch-/hon- (school, honest), -sten (listen), ps-/rcpt (psychology, receipt).',
				'Word Stress & Syllables: كل صوت علة منطوق = مقطع واحد (تجاهل e الصامتة في آخر الكلمة). النبر: قبل -tion/-sion/-ic مباشرة، وعلى الثالث من النهاية مع -ty/-gy/-phy/-al/-ical.'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Common Phonology Traps to Avoid',
				rootLabel: 'Do Not Let Spelling Trick You!',
				rootSub: 'Pronounce the Root Before Classifying',
				branches: [
					{
						label: 'Ending in -ce / -se',
						rule: 'produce (/s/) takes /t/',
						example: 'advise (/z/) takes /d/'
					},
					{
						label: 'Ending in -ies',
						rule: 'Always pronounced /z/!',
						example: 'charities /z/, calories /z/'
					},
					{
						label: 'Vowel Pairs',
						rule: 'ea / ou / ai = 1 sound',
						example: 'health (1), food (1), aid (1)'
					}
				]
			}),
			visualCaptionAr: 'تنبيهات ذكية لأكثر الأخطاء شيوعاً في سؤال الصوتيات بالبكالوريا.',
			examples: [
				{
					problemAr: 'Classify (-s): calories, diets, packages, volunteers',
					solutionAr: '/s/: diets | /z/: calories, volunteers | /iz/: packages'
				},
				{
					problemAr: 'Count syllables: aid / safety / solidarity / advertising',
					solutionAr: 'aid (1) | safe-ty (2) | sol-i-dar-i-ty (5) | ad-ver-tis-ing (4)'
				},
				{
					problemAr: 'Mark stressed syllable: charity / generosity / donation / organic',
					solutionAr: 'CHAR-i-ty (1st) | gen-er-OS-i-ty (3rd) | do-NA-tion (2nd) | or-GAN-ic (2nd)'
				}
			],
			watchOutAr: 'انتبه لكلمة charities و calories: رغم أنها تنتهي بـ -es فإنها جاءت من y (charity) وتُنطق دائماً في خانة /z/ وليس /iz/!'
		},
		practice: [
			{
				questionAr: 'In which column is "charities" classified for the pronunciation of final "-s"?',
				options: ['/z/', '/iz/', '/s/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: أصلها charity وتنتهي بصوت علة مجهور /i/ فتأخذ /z/ وليس /iz/.',
					'خطأ: فخ شائع! -ies من أصل y تُنطق /z/.',
					'خطأ: صوت العلة مجهور لا مهموس.',
					'خطأ: النهاية منطوقة.'
				],
				explanationAr: 'الجمع المنتهي بـ -ies (cities, charities, calories) يُصنف دائماً في خانة /z/.'
			},
			{
				questionAr: 'Where does the primary stress fall in "generosity" (gen-er-os-i-ty)?',
				options: ['3rd syllable (OS)', '1st syllable (GEN)', '2nd syllable (er)', '4th syllable (i)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: مع -ty نعد 3 مقاطع من الخلف: ty (1) - i (2) - OS (3)، وهو الثالث من البداية.',
					'خطأ: الأول يحمل نبراً ثانوياً فقط.',
					'خطأ: الثاني غير منبور.',
					'خطأ: الرابع غير منبور.'
				],
				explanationAr: 'قاعدة -ty: النبر يقع على المقطع الثالث من النهاية (gen-er-OS-i-ty).'
			},
			{
				questionAr: 'Which letter is silent in the word "campaign"?',
				options: ['g', 'c', 'p', 'n'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الحرف g صامت قبل n في نهاية -gn (campaign, sign, foreign).',
					'خطأ: c منطوق /k/.',
					'خطأ: p منطوق.',
					'خطأ: n منطوق في النهاية.'
				],
				explanationAr: 'في التركيب -gn (campaign, design, foreign) يكون الحرف g صامتاً.'
			},
			{
				questionAr: 'How is final "-ed" pronounced in "produced"?',
				options: ['/t/', '/d/', '/id/', 'silent'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: أصل الفعل produce ينتهي بصوت /s/ المهموس فتُنطق -ed بصوت /t/.',
					'خطأ: /s/ صوت مهموس وليس مجهوراً.',
					'خطأ: /id/ بعد /t/ و /d/ فقط.',
					'خطأ: النهاية منطوقة.'
				],
				explanationAr: 'الأفعال المنتهية بصوت /s/ (produced, balanced, announced) تُنطق فيها -ed بصوت /t/.'
			},
			{
				questionAr: 'How many syllables are in the word "health"?',
				options: ['1 syllable', '2 syllables', '3 syllables', '4 syllables'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: حرفا العلة ea ينطقان صوتاً واحداً قصيراً /e/، إذن مقطع واحد فقط.',
					'خطأ: ea ليسا صوتين منفصلين هنا.',
					'خطأ: كلمة قصيرة من مقطع واحد.',
					'خطأ: كلمة قصيرة من مقطع واحد.'
				],
				explanationAr: 'تُحسب المقاطع حسب أصوات العلة المنطوقة لا عدد حروف العلة المكتوبة.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: BAC LE 6-Point Essay Mastery (Argumentative, Expository, Speech, Article)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t3_bac_le_essay_mastery',
		slug: 'eng-3as-le-t3-bac-le-essay-mastery',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't3',
		sequenceId: 'unit4',
		sequenceTitleAr: 'الوحدة 4 و 5: Safety First & Solidarity (سلامة المستهلك والتضامن وإتقان مقال البكالوريا)',
		order: 4,
		titleAr: 'إتقان التعبير الكتابي لشعبة اللغات الأجنبية (6 نقاط): المقال الحجاجي والتفسيري والخطاب الرسمي والمقال الصحفي',
		objectives: [
			'استيعاب التوزيع الرسمي لبكالوريا اللغات الأجنبية (7 فهم + 7 بناء لغوي + 6 تعبير كتابي = 20 نقطة، معامل 5، المدة 3h30)',
			'التمييز الشكلي والأسلبي بين الأنواع الأربعة المطلوبة: المقال التفسيري (Expository)، والحجاجي (Argumentative)، والخطاب الرسمي (Speech)، والمقال الصحفي (Article)',
			'توظيف الروابط الأكاديمية وبناء الفقرات المتوازنة لنيل 5 إلى 6 نقاط كاملة من أصل 6'
		],
		keywordsAr: ['BAC LE 6 pts', 'Argumentative Essay', 'Expository Essay', 'Formal Speech', 'Article'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية (معامل 5، المدة ثلاث ساعات ونصف)، يُخصص للتعبير الكتابي 6 نقاط كاملة (تقريباً ثلث العلامة!). إتقان قالب كل نوع كتابي مع لغة دقيقة ومتنوعة هو مفتاح الامتياز (17+ من 20).',
			svg: svgEnglishWritingStructure({
				title: 'BAC LE 6-Point Essay Architecture (120 - 150 words)',
				steps: [
					{
						stage: 'Introduction (1 para)',
						detail: 'Hook + background context + clear Thesis Statement (2 to 3 sentences)'
					},
					{
						stage: 'Body Para 1',
						detail: 'Topic sentence + Arguments / Causes / Pros + concrete example'
					},
					{
						stage: 'Body Para 2',
						detail: 'Second angle / Counter-argument & rebuttal / Solutions + evidence'
					},
					{
						stage: 'Conclusion (1 para)',
						detail: 'Restate thesis + synthesis + strong closing call to action'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق الأساسي في الشكل بين المقال الصحفي (Article) والخطاب الرسمي (Formal Speech)؟',
					hintAr: 'انظر إلى العنوان في المقال مقابل التحية الافتتاحية والختامية في الخطاب.',
					expectedInput: 'المقال يبدأ بعنوان جذاب (Title)، والخطاب يبدأ بتحية الجمهور (Ladies and gentlemen,) ويختم بالشكر',
					revealAr: 'المقال الصحفي يحتاج عنواناً واضحاً (Headline/Title) وفقرات منظمة؛ أما الخطاب الرسمي فيخاطب جمهوراً مباشرة (Ladies and gentlemen, Dear fellow citizens...) ويختم بعبارة شكر (Thank you for your kind attention).'
				},
				{
					promptAr: 'كيف نبني فقرة حجاجية (Argumentative Essay) قوية عندما نناقش قضية خلافية مثل تأثير الإشهار؟',
					hintAr: 'اعرض الرأي المقابل باختصار ثم فنده بحججك المقنعة.',
					expectedInput: 'عرض الرأي المخالف بـ (While some argue that...) ثم تفنيده بـ (However, evidence proves that...)',
					revealAr: 'عرض الفكرة المقابلة وتفنيدها (Counter-argument + Rebuttal) يرفع تقييم Coherence و Excellence إلى أعلى درجة في بكالوريا اللغات الأجنبية.'
				},
				{
					promptAr: 'كيف نوزع الوقت خلال 3 ساعات ونصف (210 دقائق) في بكالوريا اللغات الأجنبية؟',
					hintAr: 'لا تستهلك الوقت كله في الفهم وتهمل التعبير ذا الـ 6 نقاط!',
					expectedInput: '15 د اختيار الموضوع + 50 د فهم + 55 د بناء لغوي + 70 د تعبير كتابي (مسودة وتحرير) + 20 د مراجعة',
					revealAr: 'تخصيص أكثر من ساعة كاملة للتعبير الكتابي (التخطيط + المسودة + تنقيح اللغة + التحرير النظيف) هو سر التفوق في شعبة اللغات الأجنبية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'Expository Essay (المقال التفسيري): يشرح أسباباً ونتائج وحلولاً بلهجة موضوعية (مثال: أسباب التزوير أو فوائد التعليم). يعتمد على: Firstly, Moreover, Consequently, To address this issue.',
				'Argumentative Essay (المقال الحجاجي): يدافع عن موقف واضح بالأدلة ويفنّد الرأي المخالف (مثال: هل الإشهار يضر بالأطفال؟). يعتمد على: In my view, Supporters claim that..., Nevertheless, It is undeniable that...',
				'Formal Speech (الخطاب الرسمي): يبدأ بتحية (Ladies and gentlemen, / Dear classmates and teachers,)، يستخدم ضمير الجمع we / our لإشراك الجمهور، ويختم بدعوة للعمل وشكر (Thank you for listening).',
				'Newspaper / Magazine Article (المقال الصحفي): يتصدره عنوان موجز وجذاب، وفقرة افتتاحية لافتة، وعرض منظم بلغة واضحة، وخاتمة تترك أثراً لدى القارئ.',
				'سلم تصحيح التعبير في 3AS LE (6 نقاط): Relevance (1.5 pt) + Semantic Coherence (1 pt) + Correct Use of English (2 pts) + Excellence / Vocabulary & Style (1.5 pt).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: '4 Text Types Required in BAC LE',
				rootLabel: 'Read the Prompt Carefully to Identify the Format!',
				rootSub: 'Wrong Format Costs Relevance Points',
				branches: [
					{
						label: 'Expository',
						rule: 'Explain causes, effects, steps',
						example: 'Objective tone, clear linkers'
					},
					{
						label: 'Argumentative',
						rule: 'Take a stand + rebut opposite view',
						example: 'Convincing evidence & concession'
					},
					{
						label: 'Speech',
						rule: 'Address audience directly',
						example: 'Ladies and gentlemen... Thank you.'
					},
					{
						label: 'Article',
						rule: 'Catchy title + engaging paragraphs',
						example: 'Title: Protecting Our Young Consumers'
					}
				]
			}),
			visualCaptionAr: 'التمييز الفوري بين القوالب الأربعة المطلوبة في التعبير الكتابي لشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Write an opening for a Formal Speech on Solidarity (Touiza):',
					solutionAr: 'Ladies and gentlemen, dear fellow citizens, today I stand before you to remind us all of a noble Algerian value that has united our ancestors for centuries: community solidarity.'
				},
				{
					problemAr: 'Write a Counter-Argument + Rebuttal sentence for an Argumentative Essay on Advertising:',
					solutionAr: 'Although some claim that commercial advertising merely informs shoppers about new goods, in reality misleading adverts frequently push young consumers toward unhealthy eating habits.'
				},
				{
					problemAr: 'Upgrade a basic sentence into a 6-point BAC LE sentence: Basic = Fast food is bad. People get sick.',
					solutionAr: 'Upgraded = Owing to the high levels of refined sugar and saturated fat in fast food, regular consumption leads to serious health complications such as obesity and diabetes.'
				}
			],
			watchOutAr: 'لا تستخدم اختصارات غير رسمية (gonna, wanna, kids, stuff) في المقال الأكاديمي أو الخطاب الرسمي! واستخدم علامات الترقيم (النقطة والفاصلة) والحروف الكبيرة بدقة.'
		},
		practice: [
			{
				questionAr: 'What is the official points split for the 3AS BAC Foreign Languages (LE) English exam?',
				options: [
					'7 pts Comprehension + 7 pts Text Exploration + 6 pts Written Expression',
					'7 pts Comprehension + 8 pts Text Exploration + 5 pts Written Expression',
					'8 pts Comprehension + 7 pts Text Exploration + 5 pts Written Expression',
					'6 pts Comprehension + 6 pts Text Exploration + 8 pts Written Expression'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: توزيع شعبة اللغات الأجنبية هو 7 + 7 + 6 = 20 نقطة، ومعاملها 5، ومدتها 3 ساعات ونصف.',
					'خطأ: هذا توزيع شعبة آداب وفلسفة (LP).',
					'خطأ: هذا توزيع الشعب العلمية وتسيير واقتصاد.',
					'خطأ: توزيع غير صحيح.'
				],
				explanationAr: 'شعبة اللغات الأجنبية (3AS LE) تتميز بـ 6 نقاط كاملة للتعبير الكتابي (7 + 7 + 6).'
			},
			{
				questionAr: 'Which feature is essential when the exam prompt asks you to write a "Speech"?',
				options: [
					'Addressing the audience at the beginning and thanking them at the end',
					'Writing a postal address in the top right corner',
					'Using bullet points without full paragraphs',
					'Writing in informal text-message abbreviations'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: الخطاب الرسمي يستهل بتحية الجمهور ويختم بعبارة شكر ودعوة مؤثرة.',
					'خطأ: العنوان البريدي يخص الرسالة الرسمية (Formal Letter).',
					'خطأ: الخطاب يُكتب في فقرات متصلة لا رؤوس أقلام.',
					'خطأ: الاختصارات العامية ممنوعة في الخطاب الرسمي.'
				],
				explanationAr: 'يتميز الخطاب الرسمي بمخاطبة الجمهور مباشرة (Ladies and gentlemen...) والخاتمة بالشكر.'
			},
			{
				questionAr: 'What strengthens an Argumentative Essay the most in BAC LE?',
				options: [
					'A clear thesis, logical arguments, and a polite rebuttal of the opposing view',
					'Repeating the same sentence three times in different paragraphs',
					'Copying sentences directly from the reading passage',
					'Avoiding linking words completely'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: وضوح الأطروحة وتنوع الحجج وتفنيد الرأي المخالف عناصر أساسية للمقال الحجاجي الممتاز.',
					'خطأ: التكرار يضعف التماسك والأسلوب.',
					'خطأ: النسخ من النص يُفقدك علامة التعبير.',
					'خطأ: الروابط ضرورية لتماسك الفقرات.'
				],
				explanationAr: 'المقال الحجاجي المتكامل يجمع بين الأطروحة الواضحة والأدلة وتفنيد الرأي المقابل.'
			},
			{
				questionAr: 'Which expression is the most formal and academic for a BAC LE essay?',
				options: [
					'Consequently, strict regulations must be enforced.',
					'So yeah, they gotta make strict rules.',
					'And like, rules are super needed.',
					'Anyway, lots of stuff should change.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: أسلوب أكاديمي رسمي سليم (رابط منطقي + مبني للمجهول + مفردات دقيقة).',
					'خطأ: عامية شديدة (yeah, gotta) غير مقبولة في البكالوريا.',
					'خطأ: لغة شفهية غير رسمية.',
					'خطأ: لغة ضعيفة وعامية (stuff).'
				],
				explanationAr: 'المقالات الأكاديمية في البكالوريا تتطلب لغة رسمية خالية من العامية والاختصارات.'
			},
			{
				questionAr: 'Which opening is best for a Newspaper Article about protecting children from unhealthy fast food?',
				options: [
					'Title: Safeguarding Young Minds and Bodies from Fast Food + engaging hook paragraph',
					'Dear Sir or Madam, I am writing to apply for a job...',
					'Once upon a time in a distant kingdom...',
					'Note 1: fast food bad. Note 2: eat fruit.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: المقال الصحفي يبدأ بعنوان معبر وفقرة افتتاحية جذابة.',
					'خطأ: هذه افتتاحية رسالة طلب عمل.',
					'خطأ: هذه افتتاحية قصة خيالية.',
					'خطأ: رؤوس أقلام مفككة لا تشكل مقالاً.'
				],
				explanationAr: 'المقال الصحفي يتميز بعنوان واضح وجذاب وفقرات منظمة ومترابطة.'
			}
		]
	}
];
