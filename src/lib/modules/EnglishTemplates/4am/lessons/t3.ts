import type { EnglishInteractiveLessonData } from '../../types';
import {
	svgEnglishGrammarMap,
	svgEnglishTenseTimeline,
	svgEnglishWritingStructure
} from '../../svg-english';

export const LESSONS_4AM_T3: EnglishInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 1. The Imperative for Advice, Instructions & Civic Duties
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t3_imperative_advice',
		slug: 'eng-4am-t3-imperative-advice',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا، مجتمعي والمواطنة (Me, My Community and Citizenship)',
		order: 1,
		titleAr: 'صيغة الأمر لتقديم النصيحة والتوجيهات المدنية والأخلاقية (The Imperative)',
		objectives: [
			'توظيف صيغة الأمر المثبت والمنفي (Verb stem / Do not + stem) لإسداء النصيحة وكتابة رسائل توجيهية للمواطنة',
			'ربط النصائح الأخلاقية والمدنية بالقيم الإسلامية والوطنية الجزائرية (الصدق، برّ الوالدين، إكرام الجار، مساعدة اليتيم)'
		],
		keywordsAr: ['Imperative', 'advice', 'instructions', 'citizenship', 'Do not'],
		discover: {
			scenarioAr:
				'اقرأ وصايا أستاذ لتلاميذه قبيل التخرّج من المتوسطة: "Be honest in your words and deeds. Respect your parents and neighbours. Help orphans and the needy. Do not waste your youth on useless habits." بمَ بدأت كل جملة ولماذا؟',
			svg: svgEnglishGrammarMap({
				title: 'The Imperative for Civic & Moral Advice (4AM)',
				rootLabel: 'Direct Advice & Instructions (No subject "You")',
				rootSub: 'Used in open letters, charters, recipes, and exam tips',
				branches: [
					{ label: 'Positive Advice', rule: 'Bare verb stem + ...', example: 'Help your neighbours.', color: '#047857' },
					{ label: 'Negative Advice', rule: 'Do not / Never + stem', example: 'Do not neglect your duties.', color: '#b45309' },
					{ label: 'Polite / Group', rule: 'Please... / Let us...', example: 'Let us serve our community.', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى "Be honest"، لماذا استعملنا (Be) وليس (Are) أو (Is)؟',
					hintAr: 'أصل الفعل (Bare stem) لـ am / is / are هو Be.',
					expectedInput: 'لأن صيغة الأمر تستعمل أصل الفعل المجرد وهو Be',
					revealAr: 'ممتاز! أصل الفعل (to be) هو (Be)، لذلك نقول في الأمر: Be polite! Be patient! Do not be selfish!'
				},
				{
					promptAr: 'كيف نصوغ دعوة جماعية تشمل المتكلم والمخاطب للمشاركة في عمل تطوعي؟',
					hintAr: 'تبدأ بعبارة من كلمتين (هيا بنا...).',
					expectedInput: 'Let us + bare stem',
					revealAr: 'نستعمل (Let us + bare stem)، مثل: Let us clean our neighbourhood and support orphans!'
				},
				{
					promptAr: 'كيف نحول جملة (You should respect elderly people) إلى صيغة أمر مباشرة؟',
					hintAr: 'نحذف You should ونبدأ بأصل الفعل.',
					expectedInput: 'Respect elderly people.',
					revealAr: 'نحذف (You should) فنحصل على جملة أمر واضحة: Respect elderly people.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الأمر المثبت (Positive Imperative): Bare verb stem في أول الجملة (Help, Respect, Be, Keep, Donate).',
				'الأمر المنفي (Negative Imperative): Do not + bare stem أو Never + bare stem (Do not be lazy. Never tell lies.).',
				'الدعوة الجماعية (Suggestion): Let us + bare stem (Let us plant trees. Let us volunteer together.).',
				'تُستعمل صيغة الأمر بكثرة في المقطع الثالث من 4AM لكتابة: رسالة نصيحة (Open letter of advice)، ميثاق المواطنة (Citizenship charter)، أو وصفة طبق جزائري تقليدي.'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Good Citizenship Charter (Islamic & Algerian Values)',
				steps: [
					{ stage: 'Honesty & Respect', detail: 'Be truthful, honour your parents, and respect your teachers.' },
					{ stage: 'Solidarity', detail: 'Support orphans, visit the sick, and share with needy neighbours.' },
					{ stage: 'Public Care', detail: 'Keep mosques, schools, and streets clean; do not vandalize property.' },
					{ stage: 'Active Youth', detail: 'Join charity clubs and work hard to build a strong Algeria.' }
				]
			}),
			visualCaptionAr: 'قيم المواطنة الصالحة والتكافل الاجتماعي في صيغة الأمر للسنة الرابعة متوسط',
			examples: [
				{
					problemAr: 'حوّل إلى صيغة الأمر المنفي: "You should not ignore a neighbour in need."',
					solutionAr: 'Do not ignore a neighbour in need.'
				},
				{
					problemAr: 'صحّح الخطأ: "Being patient and not forget to help the poor."',
					solutionAr: 'Be patient and do not forget to help the poor.'
				}
			],
			watchOutAr:
				'احذر الخطأ الشهير مع الفعل (to be) في الأمر: لا تقل (Are honest!) ولا (Do not are selfish!) — الصواب دائماً: (Be honest!) و (Do not be selfish!).'
		},
		practice: [
			{
				questionAr: 'اختر جملة الأمر الصحيحة مع الفعل (to be):',
				options: [
					'Are kind to orphans and the elderly.',
					'Being kind to orphans and the elderly.',
					'Be kind to orphans and the elderly.',
					'To be kind to orphans and the elderly.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'في الأمر نستخدم أصل الفعل (Be) لا (Are).',
					'لا نستخدم -ing لبداية جملة الأمر.',
					'أحسنت! Be + adjective هي صيغة الأمر الصحيحة.',
					'لا نضع to قبل فعل الأمر.'
				],
				explanationAr: 'أصل الفعل (to be) في صيغة الأمر هو Be.'
			},
			{
				questionAr: 'اختر جملة النهي الصحيحة:',
				options: [
					'Do not being selfish with your classmates.',
					'Not be selfish with your classmates.',
					'Do not be selfish with your classmates.',
					'Does not be selfish with your classmates.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد Do not يأتي أصل الفعل (be) لا being.',
					'تحتاج صيغة النهي إلى الفعل المساعد Do.',
					'ممتاز! Do not + bare stem (be).',
					'الأمر المنفي يستعمل Do not دائماً.'
				],
				explanationAr: 'صيغة النهي السليمة: Do not + bare stem.'
			},
			{
				questionAr: 'أكمل الدعوة الجماعية للعمل التطوعي: "...... collect winter clothes for needy families."',
				options: ['Let us', 'Let we', 'Let is', 'We let'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! Let us + bare stem (collect) للدعوة الجماعية.',
					'بعد Let نضع ضمير المفعول us وليس we.',
					'صيغة غير صحيحة.',
					'صيغة غير صحيحة.'
				],
				explanationAr: 'نستعمل (Let us + bare stem) لدعوة المجموعة إلى عمل نافع.'
			},
			{
				questionAr: 'حوّل النصيحة إلى أمر مباشر: "You must respect public property."',
				options: [
					'Respecting public property.',
					'Respect public property.',
					'You respect public property.',
					'Respects public property.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الأمر يستعمل أصل الفعل دون -ing.',
					'أحسنت! حذفنا You must وبدأنا بأصل الفعل Respect.',
					'إبقاء You يجعلها جملة خبرية لا أمرية.',
					'فعل الأمر لا يأخذ -s.'
				],
				explanationAr: 'الأمر المباشر يبدأ بأصل الفعل المجرد (Respect).'
			},
			{
				questionAr: 'ما الكلمة الأنسب لإكمال الوصية الأخلاقية: "...... your word and never break a promise."',
				options: ['Keep', 'Kept', 'Keeping', 'To keep'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! Keep your word (أوفِ بوعدك) في صيغة الأمر.',
					'kept في الماضي ولا تصلح للأمر.',
					'keeping ليست صيغة أمر.',
					'لا نبدأ جملة الأمر بـ to.'
				],
				explanationAr: 'نبدأ جملة الأمر بأصل الفعل (Keep).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 2. Conditional Sentence Type 1 (If + Present Simple, will / will not + stem)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t3_conditional_type1',
		slug: 'eng-4am-t3-conditional-type1',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا، مجتمعي والمواطنة (Me, My Community and Citizenship)',
		order: 2,
		titleAr: 'الجملة الشرطية من النوع الأول في BEM (Conditional Sentence Type 1)',
		objectives: [
			'تصريف فعلي الشرط وجواب الشرط في النوع الأول بدقة: (If + Present Simple, Future Simple: will + stem)',
			'إتقان موقع الفاصلة وتبديل موضع جملة (if) في منتصف الجملة دون أي خطأ في تصريف الأزمنة'
		],
		keywordsAr: ['Conditional Type 1', 'If + Present Simple', 'will + stem', 'BEM grammar'],
		discover: {
			scenarioAr:
				'تأمّل الجملتين عن العمل الخيري والاجتهاد: 1) "If every citizen helps the needy, our society will become stronger." 2) "You will succeed in the BEM exam if you revise steadily." ما زمن الفعل الذي يلي (If) مباشرة، وما زمن جواب الشرط؟',
			svg: svgEnglishTenseTimeline({
				title: 'Conditional Sentence Type 1 (BEM Essential)',
				tenseName: 'Real / Possible Future Condition',
				formula: 'If + S + Present Simple, S + will / will not + bare stem',
				activeZone: 'future',
				example: 'If we plant trees today, Algeria will stay green tomorrow.',
				markers: 'if + Present Simple | Result: will / will not + stem'
			}),
			steps: [
				{
					promptAr: 'في الجملة الأولى، ما زمن الفعل (helps) الواقع مباشرة بعد (If)؟',
					hintAr: 'ينتهي بـ -s مع الفاعل المفرد every citizen.',
					expectedInput: 'الحاضر البسيط (Present Simple)',
					revealAr: 'بعد (If) مباشرة يأتي دائماً الحاضر البسيط (Present Simple)، ولا نضع (will) بعد (If) أبداً!'
				},
				{
					promptAr: 'ما زمن جواب الشرط (will become)؟',
					hintAr: 'يتكون من will + أصل الفعل.',
					expectedInput: 'المستقبل البسيط (Future Simple: will + stem)',
					revealAr: 'في جملة النتيجة (Main Clause) نستعمل المستقبل البسيط (will / will not + bare stem).'
				},
				{
					promptAr: 'في الجملة الثانية وضعنا (if) في الوسط؛ هل وضعنا فاصلة قبل (if)؟',
					hintAr: 'انظر إلى: You will succeed in the BEM exam if you revise steadily.',
					expectedInput: 'لا، نحذف الفاصلة عندما تأتي if في الوسط',
					revealAr: 'إذا بدأت الجملة بـ (If) نضع فاصلة في الوسط، وإذا جاءت (if) في الوسط نحذف الفاصلة تماماً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة الأساسية (If في البداية): If + Subject + Present Simple, Subject + will / will not + bare stem.',
				'القاعدة المقلوبة (if في الوسط): Subject + will / will not + bare stem + if + Subject + Present Simple (بدون فاصلة!).',
				'قاعدة حاسمة في BEM: لا تضع (will) أبداً في نفس الجزء مع (if)! خطأ قاتل: "If you will study, you will pass." الصواب: "If you study, you will pass."',
				'انتبه لتصريف الحاضر البسيط مع (he / she / it) في جملة if: نضيف (-s / -es) في الإثبات (If he works)، وننفي بـ (does not + stem) للمفرد و (do not + stem) للجمع، وتصريف (be) هو (am / is / are).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Conditional Type 1 — Both Orders (BEM)',
				rootLabel: 'Real Condition + Probable Future Result',
				rootSub: 'Golden Rule: NEVER put "will" inside the IF-clause!',
				branches: [
					{ label: 'If First (Comma)', rule: 'If + Present, will + stem', example: 'If she revises, she will pass.', color: '#1d4ed8' },
					{ label: 'If Middle (No Comma)', rule: 'will + stem + if + Present', example: 'She will pass if she revises.', color: '#047857' },
					{ label: 'Negative Form', rule: 'do/does not | will not', example: 'If he does not try, he will not win.', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'صيغتا الجملة الشرطية من النوع الأول في الإثبات والنفي لشهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'صرّف الفعلين بين قوسين: "If our class (organize) a charity drive, many orphans (receive) school bags."',
					solutionAr: 'If our class organizes a charity drive, many orphans will receive school bags.'
				},
				{
					problemAr: 'صرّف الفعلين: "We (not / build) a clean city if citizens (not / stop) throwing litter."',
					solutionAr: 'We will not build a clean city if citizens do not stop throwing litter.'
				}
			],
			watchOutAr:
				'في BEM انتبه للفعل (be) في جملة الشرط: "If you (be) honest, people (trust) you" تصبح: "If you are honest, people will trust you." (وليس If you be!).'
		},
		practice: [
			{
				questionAr: 'اختر التصريف الصحيح: "If Amine ...... hard this term, he ...... high marks in BEM."',
				options: [
					'will work / gets',
					'works / will get',
					'work / will get',
					'will work / will get'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'لا نضع will بعد If أبداً.',
					'ممتاز! الحاضر البسيط مع المفرد (works) ثم المستقبل (will get).',
					'الفاعل Amine مفرد فيحتاج إلى works بإضافة -s.',
					'لا نضع will في شطر If.'
				],
				explanationAr: 'القاعدة: If + Present Simple (works), Future Simple (will get).'
			},
			{
				questionAr: 'أكمل الجملة عندما تكون (if) في الوسط: "Our neighbourhood ...... cleaner if everyone ...... the bins."',
				options: [
					'becomes / will use',
					'will become / uses',
					'will become / use',
					'become / uses'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الشطر الأول هو جواب الشرط (will become) والثاني بعد if حاضر بسيط.',
					'صحيح! will become (نتيجة) + if everyone uses (شرط، و everyone مفرد!).',
					'الضمير everyone يُعامل معاملة المفرد فيأخذ uses.',
					'جواب الشرط يحتاج إلى will become.'
				],
				explanationAr: 'جواب الشرط يأخذ will become، وبعد if نضع الحاضر البسيط مع المفرد everyone (uses).'
			},
			{
				questionAr: 'صرّف الفعل (be) في جملة الشرط: "If a pupil ...... respectful, teachers will appreciate him."',
				options: ['be', 'is', 'will be', 'was'],
				correctIndex: 1,
				diagnosticFeedback: [
					'نصرّف be في الحاضر البسيط (is).',
					'أحسنت! a pupil مفرد فيأخذ is في الحاضر البسيط.',
					'لا نضع will في شطر If.',
					'النوع الأول يستعمل الحاضر البسيط لا الماضي.'
				],
				explanationAr: 'تصريف الفعل to be في الحاضر البسيط مع المفرد هو is.'
			},
			{
				questionAr: 'اختر النفي الصحيح في Conditional Type 1:',
				options: [
					'If we do not save water, rivers will dry up.',
					'If we will not save water, rivers dry up.',
					'If we does not save water, rivers will dry up.',
					'If we not save water, rivers will dry up.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! النفي في الحاضر البسيط مع we هو do not save، وفي النتيجة will dry up.',
					'لا نضع will not في شطر If.',
					'الضمير we يأخذ do not وليس does not.',
					'نحتاج إلى الفعل المساعد do قبل not.'
				],
				explanationAr: 'النفي السليم في النوع الأول: If + S + do/does not + stem, S + will + stem.'
			},
			{
				questionAr: 'اختر الجملة المضبوطة بعلامات الترقيم الصحيحة:',
				options: [
					'We will help the needy, if we work together.',
					'If we work together, we will help the needy.',
					'If we work together we will help the needy.',
					'If, we work together we will help the needy.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عندما تأتي if في الوسط لا نضع فاصلة قبلها.',
					'صحيح! نضع فاصلة في الوسط عندما تبدأ الجملة بـ If.',
					'عندما تبدأ الجملة بـ If نحتاج إلى فاصلة بين الشطرين.',
					'لا نضع فاصلة بعد If مباشرة.'
				],
				explanationAr: 'الترقيم القياسي: If + clause 1, clause 2.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 3. Expressing Likes / Dislikes (+ V-ing) & Charity / Volunteering
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t3_likes_charity_citizenship',
		slug: 'eng-4am-t3-likes-charity-citizenship',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: أنا، مجتمعي والمواطنة (Me, My Community and Citizenship)',
		order: 3,
		titleAr: 'التعبير عن الميول (enjoy + V-ing) والتطوع والتكافل الإسلامي والجزائري',
		objectives: [
			'استعمال أفعال الميل وعدم الميل (enjoy, love, like, prefer, dislike, hate + V-ing) بدقة نحوية',
			'إتقان رصيد المفردات الخاصة بالتكافل الاجتماعي والعمل الخيري (charity, solidarity, volunteer, orphan, donate, neighbour)'
		],
		keywordsAr: ['enjoy + V-ing', 'charity', 'solidarity', 'volunteering', 'orphans', 'citizenship'],
		discover: {
			scenarioAr:
				'اقرأ ما كتبته سلمى عن نادي التضامن بمتوسطتها: "I enjoy helping elderly neighbours and I love donating books to orphans. My classmates prefer organizing Ramadan food baskets, and we all hate seeing anyone in need." لاحظ شكل الأفعال التي جاءت بعد (enjoy, love, prefer, hate)!',
			svg: svgEnglishGrammarMap({
				title: 'Expressing Likes / Dislikes in Community Work',
				rootLabel: 'enjoy / love / like / prefer / dislike / hate + V-ing',
				rootSub: 'Use Gerund (Verb + ing) to talk about activities & volunteering',
				branches: [
					{ label: 'Positive (+)', rule: 'enjoy / love / prefer + V-ing', example: 'I enjoy volunteering.', color: '#047857' },
					{ label: 'Negative (-)', rule: 'dislike / hate + V-ing', example: 'We hate wasting food.', color: '#b45309' },
					{ label: 'Islamic Solidarity', rule: 'Key BEM Vocabulary', example: 'charity, orphans, donate, share', color: '#1d4ed8' }
				]
			}),
			steps: [
				{
					promptAr: 'ماذا أضفنا إلى الأفعال (help, donate, organize, see) بعد أفعال الميول؟',
					hintAr: 'انظر إلى آخر الكلمات: helping, donating, organizing, seeing.',
					expectedInput: '-ing (صيغة Gerund)',
					revealAr: 'بعد (enjoy / love / like / prefer / dislike / hate) نضع الفعل مضافاً إليه (-ing) للحديث عن الأنشطة والهوايات والتطوع.'
				},
				{
					promptAr: 'هل الفعل (enjoy) يقبل (to + stem) مثلاً (enjoy to help)؟',
					hintAr: 'لا! enjoy يُتبع دائماً بـ V-ing أو اسم فقط.',
					expectedInput: 'لا، enjoy يُتبع دائماً بـ V-ing فقط (enjoy helping)',
					revealAr: 'قاعدة مهمة جداً: الفعل (enjoy) والفعل (dislike) يأتي بعدهما (V-ing) دائماً ولا يقبلان (to + stem)!'
				},
				{
					promptAr: 'ما الكلمة الإنجليزية التي تعني (التضامن/التكافل)، والكلمة التي تعني (اليتيم)، والكلمة التي تعني (يتبرع)؟',
					hintAr: 'تبدأ بـ s و o و d.',
					expectedInput: 'solidarity / orphan / donate',
					revealAr: 'أحسنت: solidarity (التضامن)، orphan (اليتيم)، donate (يتبرّع)، volunteer (متطوّع / يتطوّع)، charity (الصدقة والعمل الخيري).'
				}
			]
		},
		summary: {
			rulesAr: [
				'التعبير عن الإعجاب والميل: Subject + enjoy / love / like / prefer + Verb-ing (مثال: Young Algerians enjoy volunteering in charity campaigns).',
				'التعبير عن النفور وعدم الإعجاب: Subject + dislike / hate / cannot stand + Verb-ing (مثال: Good citizens hate seeing litter in the street).',
				'الفعل (enjoy) و (dislike) يأخذان (V-ing) دائماً (لا نقول enjoy to donate أبداً!).',
				'مفردات المواطنة والتكافل المعتمدة في BEM: charity (الخير/الصدقة)، solidarity (التكافل)، volunteering (التطوع)، orphans (الأيتام)، needy families (الأسر المحتاجة)، generous (كريم)، donate (يتبرع)، community (المجتمع)، responsible citizen (مواطن مسؤول).'
			],
			visualSvg: svgEnglishWritingStructure({
				title: 'Algerian & Islamic Solidarity Actions (BEM Vocab)',
				steps: [
					{ stage: 'Supporting Orphans', detail: 'Donating school supplies, warm coats, and kind care.' },
					{ stage: 'Helping Neighbours', detail: 'Assisting elderly neighbours and sharing Ramadan meals.' },
					{ stage: 'School Charity Club', detail: 'Organizing book drives and tree-planting campaigns.' },
					{ stage: 'Moral Reward', detail: 'Charity builds love, brotherhood, and a united Algeria.' }
				]
			}),
			visualCaptionAr: 'أبرز صور التضامن والتكافل الجزائري والإسلامي لتوظيفها في نصوص ووضعيات BEM',
			examples: [
				{
					problemAr: 'صحّح الخطأ: "Karim enjoys to help his elderly neighbour and dislikes waste food."',
					solutionAr: 'Karim enjoys helping his elderly neighbour and dislikes wasting food.'
				},
				{
					problemAr: 'كوّن جملة عن العمل التطوعي باستعمال (prefer + V-ing) و (solidarity).',
					solutionAr: 'Our classmates prefer organizing charity campaigns to strengthen social solidarity.'
				}
			],
			watchOutAr:
				'لا تنسَ (-s) المفرد الغائب مع الفاعل المفرد: "She enjoys helping" و "He dislikes wasting"، وتذكّر حذف الحرف (e) الصامت قبل إضافة (-ing) كما في: donate (donating) و organize (organizing).'
		},
		practice: [
			{
				questionAr: 'اختر الصيغة الصحيحة: "Every Ramadan, our youth association enjoys ...... food baskets to needy families."',
				options: ['prepare', 'to prepare', 'preparing', 'prepared'],
				correctIndex: 2,
				diagnosticFeedback: [
					'بعد enjoy نضيف -ing للفعل.',
					'الفعل enjoy لا يقبل to + stem أبداً.',
					'ممتاز! enjoy + V-ing (preparing بحذف e).',
					'لا نستعمل الماضي بعد enjoy.'
				],
				explanationAr: 'الفعل enjoy يُتبع دائماً بصيغة (V-ing).'
			},
			{
				questionAr: 'ما معنى كلمة (solidarity) في نصوص المواطنة لـ 4AM؟',
				options: ['التضامن والتكافل', 'التلوث البيئي', 'السفر البحري', 'المبنى الأثري'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! solidarity تعني التضامن والتكافل الاجتماعي.',
					'التلوث يعني pollution.',
					'السفر يعني travel.',
					'المبنى الأثري يعني historic monument.'
				],
				explanationAr: 'solidarity هي التضامن والتكافل بين أفراد المجتمع.'
			},
			{
				questionAr: 'أكمل الجملة بدقة: "Good citizens dislike ...... public spaces dirty."',
				options: ['see', 'seeing', 'to seeing', 'saw'],
				correctIndex: 1,
				diagnosticFeedback: [
					'dislike تتبع بـ V-ing.',
					'صحيح! dislike + seeing.',
					'لا نضع to قبل seeing هنا.',
					'saw في الماضي لا تصلح بعد dislike.'
				],
				explanationAr: 'مثل enjoy، يُتبع الفعل dislike بصيغة V-ing.'
			},
			{
				questionAr: 'ما الكلمة الإنجليزية التي تعني (شخص يعمل مجاناً لخدمة مجتمعه)؟',
				options: ['architect', 'volunteer', 'tourist', 'passenger'],
				correctIndex: 1,
				diagnosticFeedback: [
					'architect تعني مهندس معماري.',
					'ممتاز! volunteer تعني متطوّع.',
					'tourist تعني سائح.',
					'passenger تعني مسافر.'
				],
				explanationAr: 'المتطوع الذي يخدم المجتمع دون مقابل هو volunteer.'
			},
			{
				questionAr: 'اختر الجملة الصحيحة إملائياً ونحوياً:',
				options: [
					'Nadia loves donateing books to orphans.',
					'Nadia love donating books to orphans.',
					'Nadia loves donating books to orphans.',
					'Nadia loves donated books to orphans.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'نحذف e الصامتة في donate قبل إضافة -ing: donating.',
					'الفاعل Nadia مفرد فيأخذ loves.',
					'رائع! loves + donating (بحذف e).',
					'نريد النشاط (donating) بعد loves.'
				],
				explanationAr: 'الفاعل مفرد (loves) والفعل بعده V-ing بحذف e الصامتة (donating).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 4. BEM Exam Methodology: Reading Comprehension (7 pts) & Mastery of Language (7 pts)
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t3_bem_reading_mastery',
		slug: 'eng-4am-t3-bem-reading-mastery',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المراجعة الشاملة ومنهجية شهادة التعليم المتوسط (Full BEM Exam Revision & Strategy)',
		order: 4,
		titleAr: 'منهجية الإجابة في شهادة التعليم المتوسط BEM: الفهم (7 ن) والقواعد (7 ن)',
		objectives: [
			'تطبيق منهجية مضمونة لحصد 7/7 في فهم النص (Reading Comprehension) في امتحان BEM (مدة 1h30، معامل 2)',
			'تجنّب الفخاخ الخمسة الأكثر شيوعاً في قواعد اللغة (Mastery of Language — 7 نقاط) وتوزيع الوقت بذكاء'
		],
		keywordsAr: ['BEM methodology', 'Reading Comprehension', 'Mastery of Language', '7+7+6', 'time management'],
		discover: {
			scenarioAr:
				'امتحان اللغة الإنجليزية في شهادة التعليم المتوسط (BEM) مدته ساعة ونصف (1h30) ومعامله (2)، ويتكون دائماً من 3 أجزاء ثابتة: Reading Comprehension (07 pts) + Mastery of Language (07 pts) + Situation of Integration (06 pts) = 20 نقطة! كيف تنظّم وقتك وتضمن 14/14 في الجزء الأول؟',
			svg: svgEnglishWritingStructure({
				title: 'Official BEM English Structure (20 pts — 1h30 — Coeff 2)',
				steps: [
					{ stage: 'Reading (7 pts)', detail: '25 min: Skim text, Fact file/T-F/Wh-Qs, Reference words, Lexis.' },
					{ stage: 'Mastery (7 pts)', detail: '25 min: Spot mistakes / Rewrite, Tenses & Affixes, Phonology (2 pts).' },
					{ stage: 'Writing (6 pts)', detail: '30 min: Plan 3 parts, use notes + connectors, check grammar.' },
					{ stage: 'Final Review', detail: '10 min: Check capitals, punctuation, verb tenses, and neatness.' }
				]
			}),
			steps: [
				{
					promptAr: 'في سؤال (True / False / Not Mentioned)، متى نختار (Not Mentioned) ومتى نختار (False)؟',
					hintAr: 'False تعني وجود معلومة مناقضة في النص، و Not Mentioned تعني أن المعلومة غير موجودة إطلاقاً.',
					expectedInput: 'False عند وجود تناقض صريح، و Not Mentioned عند غياب المعلومة',
					revealAr: 'قاعدة BEM الذهبية: إذا ناقضت الجملة ما في النص فهي (False)، وإذا لم يذكر النص المعلومة لا بالإيجاب ولا بالنفي فهي (Not Mentioned).'
				},
				{
					promptAr: 'كيف نجد المرادف (Synonym) والضد (Opposite) من النص دون خطأ في نوع الكلمة؟',
					hintAr: 'اسم = اسم، فعل = فعل، صفة = صفة، وفي نفس الزمن!',
					expectedInput: 'مرادف الفعل فعل ومرادف الصفة صفة داخل الفقرة المحددة',
					revealAr: 'ابحث في الفقرة المحددة بين قوسين عن كلمة من نفس الصنف النحوي (Verb = Verb, Adj = Adj, Noun = Noun).'
				},
				{
					promptAr: 'ما القواعد السبع الأكثر تكراراً في جزء Mastery of Language (7 pts) في شهادة التعليم المتوسط؟',
					hintAr: 'تذكّر دروس الفصول الثلاثة: المبني للمجهول، التفضيل، المضارع التام، الشرط، البادئات، والروابط والصوتيات.',
					expectedInput: 'Passive, Superlative/as...as, Present Perfect, Conditional 1, Prefixes, Connectors, -ed/-s/Silent letters',
					revealAr: 'نعم! هذه القواعد السبع تغطي قرابة 100% من أسئلة Mastery of Language في BEM.'
				}
			]
		},
		summary: {
			rulesAr: [
				'استراتيجية Reading Comprehension (7 نقاط): اقرأ الأسئلة أولاً لتعرف عمّ تبحث، ثم اقرأ النص مرتين بتركيز؛ أجب بجمل كاملة عن Wh-Questions، وابدأ بـ Yes/No في أسئلة الأفعال المساعدة (Did/Was/Has/Is).',
				'في سؤال الكلمات المسطّرة (Who/Which/He/It/They/There): اقرأ الجملة السابقة مباشرة وتأكد من المفرد والجمع والعاقل وغير العاقل.',
				'في سؤال اكتشف الأخطاء (Spot and correct mistakes): ابحث دائماً عن: الحروف الكبيرة (Capitals)، علامات الترقيم، تصريف الفعل مع الزمن، -s المفرد الغائب، و أخطاء (to) بعد الأفعال الناقصة.',
				'سؤال الصوتيات (Phonology — نقطتان مضمونتان): إما النهاية (-ed: /t/, /d/, /id/)، أو النهاية (-s: /s/, /z/, /iz/)، أو الحروف الصامتة (k, w, h, l, t, b)، أو الأصوات المزدوجة (Diphthongs).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: '7-Point Mastery of Language Checklist (BEM)',
				rootLabel: 'Mastery of Language (07 pts)',
				rootSub: '3 Standard Tasks: Syntax/Editing + Grammar/Morphology + Phonology',
				branches: [
					{ label: 'Task 1 (2 pts)', rule: 'Spot mistakes / Affixes', example: 'im-, un-, dis-, -ful/-less', color: '#1d4ed8' },
					{ label: 'Task 2 (3 pts)', rule: 'Tenses / Passive / If', example: 'was built | have+P.P | If+Pres', color: '#047857' },
					{ label: 'Task 3 (2 pts)', rule: 'Phonology Table', example: '-ed / -s / silent / diphthongs', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'التقسيم الرسمي الموحّد لتمارين قواعد اللغة في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'صحّح 3 أخطاء في جملة BEM نموذجية: "imam ben badis were born in constantine in 1889."',
					solutionAr: 'Imam Ben Badis was born in Constantine in 1889. (الأخطاء: أحرف كبيرة لـ Imam Ben Badis و Constantine، وتصحيح were إلى was للمفرد).'
				},
				{
					problemAr: 'كيف تجيب على سؤال (Did Ibn Khaldun write Al-Muqaddimah?) إجابة نموذجية؟',
					solutionAr: 'Yes, he did. (أو: Yes, Ibn Khaldun wrote Al-Muqaddimah.)'
				}
			],
			watchOutAr:
				'لا تترك أي خانة فارغة في جدول الصوتيات أو التلخيص! وإذا وجدت في سؤال الفهم سؤالاً يبدأ بـ (Why...?) فأجب دائماً بـ (Because ...) أو (To ...).'
		},
		practice: [
			{
				questionAr: 'ما التوزيع الرسمي للنقاط في امتحان اللغة الإنجليزية بشهادة التعليم المتوسط (BEM)؟',
				options: [
					'10 + 5 + 5 = 20',
					'7 + 7 + 6 = 20',
					'8 + 7 + 5 = 20',
					'6 + 8 + 6 = 20'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'هذا ليس التوزيع المعتمد.',
					'ممتاز! 7 نقاط فهم + 7 نقاط قواعد + 6 نقاط وضعية إدماجية = 20 (معامل 2، ساعة ونصف).',
					'8 + 7 + 5 هو توزيع الشعب العلمية في البكالوريا.',
					'هذا التوزيع غير مطابق لمنهجية BEM.'
				],
				explanationAr: 'التوزيع الرسمي للـ BEM هو: Reading (7) + Mastery of Language (7) + Written Expression (6) = 20 pts.'
			},
			{
				questionAr: 'إذا لم يرد في النص أي ذكر لعمر الشخصية، وسُئلت: "He died at the age of 70." ماذا تختار في (True / False / Not Mentioned)؟',
				options: ['True', 'False', 'Not Mentioned', 'Yes, he did'],
				correctIndex: 2,
				diagnosticFeedback: [
					'لا يمكن اختيار True دون دليل في النص.',
					'False تكون عند وجود معلومة مناقضة في النص.',
					'صحيح! عند غياب المعلومة تماماً عن النص نختار Not Mentioned.',
					'هذه صيغة إجابة لسؤال استفهامي وليست لصح وخطأ.'
				],
				explanationAr: 'Not Mentioned تعني أن المعلومة غير مذكورة في النص.'
			},
			{
				questionAr: 'إذا طلب سؤال المعجم (Lexis) مرادف فعل في الماضي (built)، فبأي شكل نبحث عنه في النص؟',
				options: [
					'اسم جمع',
					'فعل في الماضي مثل constructed أو erected',
					'صفة طويلة',
					'حرف جر'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب مطابقة الصنف النحوي للكلمة.',
					'ممتاز! مرادف الفعل الماضي يكون فعلاً في الماضي (مثل constructed).',
					'الصفة لا ترادف الفعل.',
					'حرف الجر لا يرادف الفعل.'
				],
				explanationAr: 'قاعدة المعجم في BEM: نفس الصنف النحوي ونفس الزمن (Verb = Verb).'
			},
			{
				questionAr: 'اكتشف الخطأين في الجملة: "if you visits timgad, you will admire its ruins."',
				options: [
					'If بحرف كبير، و visit دون -s مع you، و Timgad بحرف كبير (3 تصويبات دقيقة)',
					'تحويل will admire إلى admired',
					'حذف الفاصلة في الوسط',
					'تغيير its إلى their'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'رائع! If (حرف كبير في البداية)، visit (مع you لا نضيف -s)، Timgad (اسم علم بحرف كبير).',
					'في Conditional Type 1 يبقى جواب الشرط في المستقبل (will admire).',
					'الفاصلة ضرورية لأن If في البداية.',
					'Timgad مدينة مفردة فتأخذ its.'
				],
				explanationAr: 'التصحيح الكامل: If you visit Timgad, you will admire its ruins.'
			},
			{
				questionAr: 'ما أفضل طريقة للإجابة عن سؤال يبدأ بـ (Why did Imam Ben Badis found the Association in 1931?)؟',
				options: [
					'Yes, he did.',
					'In 1931 in Algiers.',
					'Because he wanted to educate Algerian youth and defend Islamic identity.',
					'Imam Ben Badis was born in Constantine.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'سؤال Why لا يُجاب عنه بـ Yes/No.',
					'هذه إجابة لسؤال When و Where.',
					'أحسنت! سؤال Why يُجاب عنه دائماً ببيان السبب أو الغاية (Because / To).',
					'هذه معلومة عن الميلاد لا عن السبب.'
				],
				explanationAr: 'أداة الاستفهام Why تستلزم جواباً يبدأ بـ Because أو To.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 5. BEM Written Expression (6 pts) Mastery: All 3 Sequences Blueprint
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'eng_lesson_4am_t3_bem_written_expression',
		slug: 'eng-4am-t3-bem-written-expression',
		grade: '4am',
		yearSubjectId: 646,
		trimesterId: 't3',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المراجعة الشاملة ومنهجية شهادة التعليم المتوسط (Full BEM Exam Revision & Strategy)',
		order: 5,
		titleAr: 'منهجية الوضعية الإدماجية (6 نقاط) في شهادة التعليم المتوسط BEM',
		objectives: [
			'بناء وضعية إدماجية متقنة (8 إلى 12 سطراً) تغطي محاور BEM الثلاثة: المعالم والشخصيات، التجارب الحياتية، والمواطنة والتكافل',
			'استيفاء معايير التنقيط الأربعة الرسمية في BEM (الملاءمة، التماسك، سلامة اللغة، والإتقان) لنيل 5.5 أو 6/6'
		],
		keywordsAr: ['BEM Written Expression', 'Situation of Integration', '6 points', 'rubric', 'essay structure'],
		discover: {
			scenarioAr:
				'تساوي الوضعية الإدماجية في شهادة التعليم المتوسط (6 نقاط من 20)، أي 30% من العلامة الإجمالية! وكثير من التلاميذ يفقدون نقاطاً سهلة بسبب غياب الخطة أو نسيان الروابط أو الخروج عن الشكل المطلوب (رسالة / مقال / بطاقة معلم / سيرة).',
			svg: svgEnglishWritingStructure({
				title: '4-Part Formula for 6/6 in BEM Written Expression',
				steps: [
					{ stage: '1. Format & Intro', detail: 'Respect format (letter/article/bio) + clear opening topic sentence.' },
					{ stage: '2. Body (Notes)', detail: 'Turn ALL given fact-file notes into smooth sentences with connectors.' },
					{ stage: '3. Target Grammar', detail: 'Include 2-3 BEM grammar rules (Passive, Superlative, If, Sequencers).' },
					{ stage: '4. Conclusion', detail: 'Short closing sentence + check capitals, spelling, and periods.' }
				]
			}),
			steps: [
				{
					promptAr: 'ما الأشكال النصية الأربعة التي تتكرر في الوضعية الإدماجية للـ BEM؟',
					hintAr: 'رسالة أو إيميل، مقال مدرسي، سيرة شخصية أو وصف معلم، ورسالة مفتوحة للمواطنة.',
					expectedInput: 'Email/Letter، Article، Biography/Landmark description، Open Letter',
					revealAr: 'ممتاز! احفظ شكل كل نوع: في الرسالة/الإيميل نكتب (Dear ...,) في البداية و (Best regards, / Yours,) في الختام؛ وفي المقال نضع عنواناً واضحاً.'
				},
				{
					promptAr: 'ماذا يحدث إذا أهمل التلميذ الملاحظات أو الجدول المعطى (Fact File) في الموضوع؟',
					hintAr: 'معيار الملاءمة (Relevance) يراقب توظيف الملاحظات المطلوبة.',
					expectedInput: 'يفقد جزءاً كبيراً من علامة الملاءمة (Relevance)',
					revealAr: 'الالتزام بالموضوع والشكل وتوظيف جميع معطيات الجدول يضمن لك فوراً نقطتي الملاءمة (2/2 pts)!'
				},
				{
					promptAr: 'ما معايير التصحيح الأربعة في الوضعية الإدماجية للـ BEM؟',
					hintAr: 'الملاءمة + التماسك + سلامة اللغة + الإبداع والإتقان.',
					expectedInput: 'Relevance + Coherence + Language Accuracy + Excellence',
					revealAr: 'التنقيط الرسمي: 1) الملاءمة (Relevance: 2 pts)، 2) التماسك والتنظيم (Coherence: 1.5 pts)، 3) سلامة القواعد والمفردات (Accuracy: 1.5 pts)، 4) التميز ونظافة الورقة (Excellence: 1 pt).'
				}
			]
		},
		summary: {
			rulesAr: [
				'المحور 1 (معلم جزائري أو شخصية بارزة): استعمل Past Simple Passive (was built by / was founded in)، المقارنة (as...as)، وأدوات الترتيب (First, Next, Finally) — مثل القصبة، تيمقاد، الجامع الكبير بتلمسان، الإمام ابن باديس، الشيخ الإبراهيمي، مفدي زكريا، ابن خلدون.',
				'المحور 2 (شخصيتي وتجاربي المدرسية): استعمل Superlative (the best / the most inspiring)، Present Perfect (I have never forgotten / since)، و Past Continuous + Past Simple (while / when).',
				'المحور 3 (المواطنة والتكافل): استعمل Imperative (Be honest, Help orphans, Do not waste)، Conditional Type 1 (If we help the needy, our society will prosper)، و (enjoy / prefer + V-ing).',
				'قاعدة الجودة الذهبية: اكتب جملاً قصيرة وواضحة وصحيحة (10 إلى 14 كلمة في الجملة) أفضل بكثير من جمل طويلة مليئة بالأخطاء!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BEM Written Expression: Grammar by Theme',
				rootLabel: 'Match Your Grammar to the BEM Topic',
				rootSub: 'Use 8-12 neat lines with clear punctuation & connectors',
				branches: [
					{ label: 'Seq 1: Landmarks', rule: 'was built / as...as / First', example: 'The Casbah was built... First...', color: '#1d4ed8' },
					{ label: 'Seq 2: Memories', rule: 'the best / have+P.P / while', example: 'The best day I have ever had...', color: '#047857' },
					{ label: 'Seq 3: Citizenship', rule: 'Imperative / If+Pres / V-ing', example: 'Help orphans! If we unite, ...', color: '#b45309' }
				]
			}),
			visualCaptionAr: 'دليل اختيار القواعد المناسبة لكل محور من محاور الوضعية الإدماجية في شهادة التعليم المتوسط',
			examples: [
				{
					problemAr: 'اكتب جملة افتتاحية وخاتمة نموذجية لمقال عن المواطنة والتكافل.',
					solutionAr: 'Opening: Being a good Algerian citizen starts with honesty, solidarity, and caring for our community. | Closing: If every young citizen helps others today, Algeria will shine even brighter tomorrow.'
				},
				{
					problemAr: 'اكتب جملة افتتاحية نموذجية لسيرة الإمام عبد الحميد بن باديس.',
					solutionAr: 'Imam Abdelhamid Ben Badis was one of the greatest Algerian scholars and reformers who dedicated his life to education and Islamic identity.'
				}
			],
			watchOutAr:
				'احذر نسخ فقرات كاملة من نص الفهم (Reading Passage) لأن ذلك يحرمك من علامة الوضعية! استعن فقط بالمفردات والأفكار، واصنع جملك الخاصة بأسلوب واضح ومنظم.'
		},
		practice: [
			{
				questionAr: 'ما الخطأ الذي يحرم التلميذ من علامة الوضعية الإدماجية في BEM؟',
				options: [
					'استعمال أدوات الربط (First, Because, Therefore)',
					'نسخ فقرة كاملة حرفياً من نص الفهم',
					'توظيف معطيات الجدول المعطى في الموضوع',
					'ترك هامش وكتابة خط واضح ومقروء'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'أدوات الربط ترفع علامة التماسك.',
					'صحيح! النسخ الحرفي من نص القراءة يُعدّ غياباً للإنتاج الشخصي.',
					'توظيف الجدول مطلوب ويرفع علامة الملاءمة.',
					'تنظيم الورقة يرفع علامة الإتقان.'
				],
				explanationAr: 'يجب صياغة جمل شخصية سليمة لا نسخ نص الفهم.'
			},
			{
				questionAr: 'إذا كان موضوع الوضعية الإدماجية هو وصف معلم جزائري (The Great Mosque of Tlemcen)، أي قاعدة تُعدّ الأنسب لتوظيفها؟',
				options: [
					'Past Simple Passive (was built in 1082) + as...as',
					'Negative Imperative (Do not run)',
					'Conditional Type 1 فقط',
					'Present Continuous للحديث عن المستقبل'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! المبني للمجهول في الماضي والمقارنة هما صميم المقطع الأول.',
					'الأمر المنفي يناسب ميثاق المواطنة أو البيئة.',
					'الشرط يناسب المواطنة والنتائج المستقبلية.',
					'المعلم التاريخي يُوصف بالماضي المجهول والحاضر للوصف.'
				],
				explanationAr: 'وصف المعالم يعتمد أساساً على (is located in / was built in / as...as / the most famous).'
			},
			{
				questionAr: 'إذا طُلب منك كتابة رسالة مفتوحة (Open Letter / Email) لصديقك حول العمل الخيري، ماذا يجب أن يتضمن الشكل؟',
				options: [
					'جدول أرقام بدون جمل',
					'تحية في البداية (Dear friend,) وجسم منظم وخاتمة وتوقيع (Best regards,)',
					'كلمات مفردة بلا علامات ترقيم',
					'قائمة أفعال شاذة فقط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'المطلوب رسالة متماسكة لا جدولاً.',
					'أحسنت! احترام الشكل (Layout) جزء أساسي من معيار الملاءمة.',
					'علامات الترقيم والجمل الكاملة إلزامية.',
					'المطلوب فقرة تعبيرية كاملة.'
				],
				explanationAr: 'الرسالة/الإيميل تتطلب تحية افتتاحية، فقرة منظمة، وخاتمة وتوقيعاً.'
			},
			{
				questionAr: 'أي جملة تصلح كخاتمة قوية لوضعية إدماجية حول المواطنة والتضامن في BEM؟',
				options: [
					'Yesterday I ate apples.',
					'If we unite and help orphans and neighbours, our community will become happier and stronger.',
					'Timgad was built by Romans.',
					'Can you swim fast?'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خارج الموضوع تماماً.',
					'ممتاز! جمعت بين موضوع التكافل وقاعدة الشرط من النوع الأول بوضوح.',
					'تخص المقطع الأول (المعالم) لا المواطنة.',
					'سؤال غير مرتبط بخاتمة مقال المواطنة.'
				],
				explanationAr: 'توظيف Conditional Type 1 في خاتمة موضوع المواطنة يمنحها قوة لغوية ومنهجية عالية.'
			},
			{
				questionAr: 'كم دقيقة يُنصح بتخصيصها لكتابة الوضعية الإدماجية ومراجعتها في امتحان BEM (1h30)؟',
				options: [
					'5 دقائق فقط في آخر الوقت',
					'حوالي 30 دقيقة للكتابة + 10 دقائق للمراجعة الشاملة للورقة',
					'ساعة و25 دقيقة للوضعية وحدها',
					'دقيقتان بدون مسوّدة'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'5 دقائق غير كافية لإنتاج 6 نقاط متقنة.',
					'أحسنت! توزيع متوازن: 25 د للفهم + 25 د للقواعد + 30 د للوضعية + 10 د للمراجعة.',
					'هذا يضيّع الجزء الأول (14 نقطة).',
					'التخطيط والمراجعة ضروريان لتفادي الأخطاء الإملائية والنحوية.'
				],
				explanationAr: 'التوزيع المثالي لـ 90 دقيقة هو: 25 للفهم + 25 للقواعد + 30 للوضعية + 10 للمراجعة النهائية.'
			}
		]
	}
];
