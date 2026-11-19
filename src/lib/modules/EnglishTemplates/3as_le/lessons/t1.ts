import {
	svgEnglishGrammarMap,
	svgEnglishPhoneticsChart,
	svgEnglishTenseTimeline,
	svgEnglishWordFormation
} from '../../svg-english';
import type { EnglishInteractiveLessonData } from '../../types';

/**
 * 3AS BAC Foreign Languages (لغات أجنبية — yearSubjectId: 789, coeff 5, 3h30, 7+7+6=20)
 * Interactive Lessons — Trimester 1: Unit 1 "Exploring the Past" (4 lessons)
 */
export const LESSONS_3AS_LE_T1: EnglishInteractiveLessonData[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 1: Advanced Past Time Clauses (After / Before / Until) & Used to / Was able to
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t1_past_perfect_time',
		slug: 'eng-3as-le-t1-past-perfect-time',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية والجزائرية)',
		order: 1,
		titleAr: 'الروابط الزمنية المتقدمة في الماضي (After / Before / Until) وصيغ used to و was able to',
		objectives: [
			'ضبط الترتيب الزمني الدقيق بين الماضي التام والماضي البسيط مع after و as soon as و before و by the time و until',
			'استعمال الصيغ المتقدمة للماضي التام المبني للمجهول (had been + V3) في نصوص الحضارات',
			'إتقان التمييز الدقيق بين used to (عادة ماضية) و was/were able to (إنجاز محدد) و had to (ضرورة تاريخية)'
		],
		keywordsAr: ['Past Perfect', 'After', 'Before', 'Until', 'Used to', 'Was able to'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية (معامل 5)، تتسم نصوص وحدة Exploring the Past بكثافة الروابط الزمنية والمبني للمجهول في الماضي التام عند تتبع صعود الحضارة الإسلامية والأندلسية والجزائرية.',
			svg: svgEnglishTenseTimeline({
				title: 'Advanced Past Sequencing (3AS LE)',
				tenseName: 'Past Perfect (Active / Passive) + Past Simple',
				formula: 'After / As soon as + had (been) + V3, S + V2',
				activeZone: 'two_past',
				example: 'Cordoba did not reach its peak until libraries had been established.',
				markers: 'after, as soon as, before, by the time, until, once'
			}),
			steps: [
				{
					promptAr: 'في الجملة: The Great Mosque of Tlemcen was restored after it had endured centuries of history. لماذا استعملنا had endured؟',
					hintAr: 'حدد الحدث الأسبق زمنياً.',
					expectedInput: 'لأن صمود المسجد عبر القرون سبق عملية الترميم',
					revealAr: 'الحدث الأول (صمود المسجد) يوضع في Past Perfect (had endured)، والحدث الثاني (الترميم) يوضع في Past Simple (was restored).'
				},
				{
					promptAr: 'حوّل الجملتين باستعمال until: Andalusian medicine did not advance rapidly. Al-Zahrawi wrote Kitab al-Tasrif first.',
					hintAr: 'ابدأ بالجملة المنفية في الماضي البسيط ثم until ثم الماضي التام.',
					expectedInput: 'Andalusian medicine did not advance rapidly until Al-Zahrawi had written Kitab al-Tasrif.',
					revealAr: 'القاعدة مع until: Past Simple (غالباً منفي) + until + Past Perfect. لاحظ حذف كلمة first لأن الزمن التام يعبر عن الأسبقية.'
				},
				{
					promptAr: 'لماذا نستخدم were able to بدلاً من could في الجملة: Despite the drought, M-Zab engineers were able to build an ingenious water system؟',
					hintAr: 'هل الحديث عن قدرة عامة أم إنجاز فعلي واحد تحقق بصعوبة؟',
					expectedInput: 'لأنه إنجاز محدد تحقق فعلاً في موقف صعب (ترادف managed to)',
					revealAr: 'في الإنجليزية الأكاديمية (3AS LE)، للتعبير عن النجاح في موقف محدد في الماضي نستعمل was/were able to أو managed to وليس could.'
				}
			]
		},
		summary: {
			rulesAr: [
				'After / As soon as / Once + Past Perfect (had + V3 / had been + V3) , Past Simple (V2).',
				'Before / By the time + Past Simple (V2) , Past Perfect (had + V3).',
				'Past Simple (Negative: did not + Stem) + until + Past Perfect (had + V3). وتُحذف ظروف الترتيب مثل first / then عند الربط.',
				'used to + Stem (عادة منتهية؛ نفيها did not use to) | had to + Stem (إلزام تاريخي) | was/were able to + Stem (نجاح وإنجاز محدد في الماضي = managed to).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BAC LE Past Time & Modals Toolkit',
				rootLabel: 'Historical Narrative Precision',
				rootSub: 'Delete redundant words like "first" or "then" when combining',
				branches: [
					{
						label: 'After / Once',
						rule: '+ Past Perfect (Action 1)',
						example: 'Once paper had spread, books multiplied.'
					},
					{
						label: 'Before / By the time',
						rule: '+ Past Simple (Action 2)',
						example: 'By the time he died, he had authored 30 works.'
					},
					{
						label: 'Until',
						rule: 'Neg Past Simple + until + Past Perf',
						example: 'Cities did not grow until trade had revived.'
					},
					{
						label: 'was/were able to',
						rule: '= managed to (Specific success)',
						example: 'They were able to preserve Tassili art.'
					}
				]
			}),
			visualCaptionAr: 'دليل الروابط الزمنية وصيغ القدرة والالتزام في نصوص الحضارات لشعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Combine with (before): First, Muslim scholars refined surgical tools. Then, European universities translated their manuals.',
					solutionAr: 'Muslim scholars had refined surgical tools before European universities translated their manuals.'
				},
				{
					problemAr: 'Combine with (until): Maritime trade did not expand. Accurate astrolabes were designed first.',
					solutionAr: 'Maritime trade did not expand until accurate astrolabes had been designed.'
				},
				{
					problemAr: 'Rewrite: a) Builders succeeded in erecting Beni Hammad Fort on steep terrain. | b) Builders were ..........',
					solutionAr: 'b) Builders were able to erect Beni Hammad Fort on steep terrain.'
				}
			],
			watchOutAr: 'في بكالوريا اللغات الأجنبية، قد يكون الحدث الأول مبنياً للمجهول؛ انتبه لصيغة Past Perfect Passive وهي had been + V3 وليس had + V3!'
		},
		practice: [
			{
				questionAr: 'Combine accurately with "until": Trade did not stabilize. Safe caravanserais were built first.',
				options: [
					'Trade did not stabilize until safe caravanserais had been built.',
					'Trade had not stabilized until safe caravanserais were built.',
					'Trade did not stabilized until safe caravanserais had been built.',
					'Trade did not stabilize until safe caravanserais had built.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح 100%: الماضي البسيط المنفي قبل until، والماضي التام المبني للمجهول (had been built) بعدها.',
					'خطأ: عكست الأزمنة حول until.',
					'خطأ: بعد did not يجب وضع المصدر stabilize بلا d.',
					'خطأ: caravanserais مفعول به (بُنيت) فيلزم المبني للمجهول had been built.'
				],
				explanationAr: 'الحدث الأول مبني للمجهول (had been built) ويأتي بعد until.'
			},
			{
				questionAr: 'Complete: By the time Ibn Battuta returned to North Africa, he .......... over 117,000 kilometres.',
				options: ['had travelled', 'travelled', 'has travelled', 'was travelling'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: بعد By the time + Past Simple يكون الشطر الرئيسي في Past Perfect (had travelled).',
					'خطأ: نحتاج Past Perfect لإظهار أن السفر تم قبل العودة.',
					'خطأ: المضارع التام لا يتوافق مع returned.',
					'خطأ: السفر قد اكتمل قبل العودة.'
				],
				explanationAr: 'By the time + Past Simple , Past Perfect.'
			},
			{
				questionAr: 'Choose the best academic substitute for "managed to decipher": Archaeologists managed to decipher the ancient inscription.',
				options: ['were able to decipher', 'used to decipher', 'had to decipher', 'did not use to decipher'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: were able to ترادف managed to للإنجاز المحدد في الماضي.',
					'خطأ: used to تفيد عادة متكررة.',
					'خطأ: had to تفيد الإلزام لا الإنجاز.',
					'خطأ: نفي للعادة.'
				],
				explanationAr: 'managed to + Stem ترادف was/were able to + Stem.'
			},
			{
				questionAr: 'Correct the verbs: Once Fatima al-Fihri (inherit) her father wealth, she (found) Al-Qarawiyyin.',
				options: ['had inherited / founded', 'inherited / had founded', 'had inherited / had founded', 'inherits / founded'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: Once تعمل مثل After فتأخذ Past Perfect ثم Past Simple.',
					'خطأ: الإرث سبق التأسيس وليس العكس.',
					'خطأ: لا نضع Past Perfect في الجملتين معاً.',
					'خطأ: عدم توافق زمني.'
				],
				explanationAr: 'Once + Past Perfect (الحدث الأول), Past Simple (الحدث الثاني).'
			},
			{
				questionAr: 'Choose the correct negative sentence about ancient habits:',
				options: [
					'Early historians did not use to rely on digital archives.',
					'Early historians did not used to rely on digital archives.',
					'Early historians used not to relied on digital archives.',
					'Early historians were not use to rely on digital archives.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: did not use to + Verb Stem هي الصيغة القياسية الوحيدة.',
					'خطأ: لا نضع d في use بعد did not.',
					'خطأ: لا نضع تصريفاً ماضياً بعد to.',
					'خطأ: نفي العادة يكون بـ did not لا were not.'
				],
				explanationAr: 'النفي القياسي لـ used to هو did not use to + Stem.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 2: Expressing Concession & Contrast (even though, despite the fact that, whereas)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t1_concession_contrast',
		slug: 'eng-3as-le-t1-concession-contrast',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية والجزائرية)',
		order: 2,
		titleAr: 'التعبير عن الاستدراك والتباين المتقدم: Even though / Despite the fact that / Whereas',
		objectives: [
			'التمييز الدلالي والنحوي بين الاستدراك (Concession: even though, despite the fact that, however) والتباين المباشر (Contrast: whereas, while, unlike)',
			'إعادة كتابة الجمل الأكاديمية بتحويل الجمل إلى عبارات اسمية (Nominalization) بعد despite و in spite of',
			'توظيف روابط الاستدراك والتباين لرفع جودة المقال في بكالوريا اللغات الأجنبية (6 نقاط)'
		],
		keywordsAr: ['Concession', 'Contrast', 'even though', 'despite the fact that', 'whereas', 'however'],
		discover: {
			scenarioAr:
				'يحتاج مترشح اللغات الأجنبية إلى التفريق بين الاستدراك (نتيجة غير متوقعة رغم عائق: even though / despite) وبين التباين والمقارنة بين عنصرين مختلفين (whereas / while / unlike).',
			svg: svgEnglishGrammarMap({
				title: 'Concession vs Contrast (3AS LE)',
				rootLabel: 'Advanced Logical Linking',
				rootSub: 'Concession = Unexpected Result | Contrast = Two Different Facts',
				branches: [
					{
						label: 'Clause Concession',
						rule: 'Even though / Although / Despite the fact that + S + V',
						example: 'Even though tools were basic, bridges lasted.'
					},
					{
						label: 'Nominal Concession',
						rule: 'Despite / In spite of + Noun Phrase / V-ing',
						example: 'Despite harsh climates, Tassili art survived.'
					},
					{
						label: 'Direct Contrast',
						rule: 'Clause 1, whereas / while Clause 2',
						example: 'Timgad was Roman, whereas Tlemcen is Islamic.'
					}
				]
			}),
			steps: [
				{
					promptAr: 'ما الفرق بين Even though و Whereas من حيث المعنى؟',
					hintAr: 'أيهما يعبر عن «رغم أن» (استدراك) وأيهما يعبر عن «في حين أن» (مقارنة بين طرفين)؟',
					expectedInput: 'Even though للاستدراك (رغم أن)، و Whereas للتباين والمقارنة (في حين أن)',
					revealAr: 'Even though تربط عائقاً بنتيجة مفاجئة، أما whereas فتقارن بين شيئين أو حضارتين مختلفتين دون وجود عائق.'
				},
				{
					promptAr: 'حوّل الجملة بـ Nominalization: Although the manuscripts were fragile, librarians preserved them. ابدأ بـ Despite...',
					hintAr: 'ما الاسم المشتق من الصفة fragile؟',
					expectedInput: 'Despite the fragility of the manuscripts, librarians preserved them.',
					revealAr: 'الاسم من fragile هو fragility؛ ويمكن أيضاً كتابة: Despite being fragile أو Despite the fact that the manuscripts were fragile.'
				},
				{
					promptAr: 'ما علامات الترقيم الصحيحة عند استعمال However في وسط الكلام للربط بين جملتين؟',
					hintAr: 'تأتي نقطة أو فاصلة منقوطة قبلها وفاصلة بعدها.',
					expectedInput: 'Clause 1; however, Clause 2 (أو نقطة ثم However,)',
					revealAr: 'تُعامل however و nevertheless كظروف ربط (Conjunctive Adverbs)، فنكتب قبلها نقطة أو فاصلة منقوطة وبعدها فاصلة دائماً.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الاستدراك مع جملة كاملة: Although / Though / Even though / Despite the fact that / In spite of the fact that + Subject + Verb.',
				'الاستدراك مع عبارة اسمية أو مصدر: Despite / In spite of + Noun Phrase OR Verb-ing (مثال: Despite facing invasions, the library survived).',
				'الاستدراك بالظروف الرابطة: Clause 1. However, / Nevertheless, / Yet, Clause 2 (تمنح أسلوباً راقياً في التعبير الكتابي).',
				'التباين المباشر بين طرفين (Contrast): Clause 1, whereas / while Clause 2 | Unlike + Noun A, Noun B + Verb.'
			],
			visualSvg: svgEnglishWordFormation({
				title: 'Nominalization After Despite / In spite of',
				prefix: 'Despite',
				root: 'the prosperity / decline / distance',
				suffix: 'of + Noun',
				derivedWord: 'Despite the decline of trade, scholars kept teaching.',
				meaningNote: 'Verb/Adj clause transforms cleanly into a formal Noun Phrase!'
			}),
			visualCaptionAr: 'تقنية التحويل الاسمي (Nominalization) لإعادة كتابة الجمل بمستوى متقدم في شعبة اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Rewrite: a) Even though the Sahara was vast, trade caravans connected North and West Africa. | b) Despite ..........',
					solutionAr: 'b) Despite the vastness of the Sahara (OR Despite the fact that the Sahara was vast), trade caravans connected North and West Africa.'
				},
				{
					problemAr: 'Combine with (whereas): Ancient Mesopotamia developed cuneiform on clay. Ancient Egypt developed hieroglyphs on papyrus.',
					solutionAr: 'Ancient Mesopotamia developed cuneiform on clay, whereas ancient Egypt developed hieroglyphs on papyrus.'
				},
				{
					problemAr: 'Combine with (however): Some dynasties collapsed due to internal conflict. Their architectural heritage endures today.',
					solutionAr: 'Some dynasties collapsed due to internal conflict; however, their architectural heritage endures today.'
				}
			],
			watchOutAr: 'انتبه: لا تستبدل whereas بـ unlike إذا كان بعدها فاعل وفعل، ولا تضع of بعد despite، ولا تنس الفاصلة بعد However!'
		},
		practice: [
			{
				questionAr: 'Choose the best nominalized rewrite: Although the Casbah alleys are narrow, they keep houses cool. Complete: Despite ..........',
				options: [
					'the narrowness of the Casbah alleys, they keep houses cool.',
					'the Casbah alleys are narrow, they keep houses cool.',
					'of the narrowness of the Casbah alleys, they keep houses cool.',
					'narrow the Casbah alleys, they keep houses cool.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: تحويل اسمي أكاديمي سليم (the narrowness of...) بعد Despite.',
					'خطأ: لا نضع جملة كاملة مباشرة بعد Despite دون the fact that.',
					'خطأ: لا نضع of بعد Despite.',
					'خطأ: تركيب غير نحوي.'
				],
				explanationAr: 'بعد Despite نستعمل عبارة اسمية مثل the narrowness of the Casbah alleys.'
			},
			{
				questionAr: 'Choose the right connector for direct contrast: Ibn Khaldun focused on history and sociology, .......... Ibn al-Haytham specialized in optics.',
				options: ['whereas', 'despite', 'unlike', 'in spite of'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: مقارنة مباشرة بين جملتين تامتين فنستعمل whereas.',
					'خطأ: despite للاستدراك وتُتبع باسم.',
					'خطأ: unlike تُتبع باسم وليس بجملة كاملة.',
					'خطأ: in spite of للاستدراك وتُتبع باسم.'
				],
				explanationAr: 'نستعمل whereas / while للمقارنة والتباين بين جملتين تامتين.'
			},
			{
				questionAr: 'Select the sentence with correct punctuation and grammar:',
				options: [
					'The manuscript was damaged; however, experts restored every page.',
					'The manuscript was damaged, however experts restored every page.',
					'Even though the manuscript was damaged, but experts restored every page.',
					'Despite the fact that damaged, experts restored every page.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: فاصلة منقوطة قبل however وفاصلة بعدها.',
					'خطأ: comma splice وغياب الفاصلة بعد however.',
					'خطأ: لا نجمع بين Even though و but.',
					'خطأ: Despite the fact that تحتاج فاعلاً وفعلاً.'
				],
				explanationAr: 'توضع فاصلة منقوطة (أو نقطة) قبل however وتوضع فاصلة بعدها.'
			},
			{
				questionAr: 'Complete: .......... the fact that printing presses did not exist then, Cordoba libraries held hundreds of thousands of volumes.',
				options: ['Despite', 'Although', 'Whereas', 'However'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: التركيب الكامل هو Despite the fact that (أو In spite of the fact that).',
					'خطأ: لا نقول Although the fact that.',
					'خطأ: لا نقول Whereas the fact that.',
					'خطأ: لا نقول However the fact that.'
				],
				explanationAr: 'Despite the fact that + Subject + Verb تعادل Although + Subject + Verb.'
			},
			{
				questionAr: 'Complete with Gerund: In spite of .......... far from the sea, Beni Hammad Fort became a thriving political centre.',
				options: ['being located', 'it was located', 'was located', 'located was'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: بعد In spite of نستعمل Gerund المبني للمجهول (being located) لتطابق الفاعل.',
					'خطأ: لا نضع جملة كاملة مباشرة بعد In spite of.',
					'خطأ: لا نضع فعلاً مصرفاً مباشرة بعد حرف الجر of.',
					'خطأ: ترتيب غير صحيح.'
				],
				explanationAr: 'عندما يكون الفعل مبنياً للمجهول والفاعل موحداً نستعمل In spite of + being + V3.'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 3: Advanced Morphology (Prefix + Root + Suffix Division Tables)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t1_advanced_morphology',
		slug: 'eng-3as-le-t1-advanced-morphology',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية والجزائرية)',
		order: 3,
		titleAr: 'التصريف البنيوي المتقدم: تفكيك الكلمات (Prefix + Root + Suffix) وجداول الاشتقاق',
		objectives: [
			'تفكيك الكلمات المركبة بدقة إلى بادئة (Prefix) وجذر (Root) ولاحقة (Suffix) كما في بكالوريا اللغات الأجنبية',
			'تمييز الجذر الأصلي عند تغير الإملاء الطفيف (مثل prosperity من prosper، و historical من history)',
			'إتقان بناء الأضداد والمشتقات الأكاديمية في سياق الحضارات والتاريخ'
		],
		keywordsAr: ['Morphology', 'Prefix', 'Root', 'Suffix', 'Word Division', 'Derivation'],
		discover: {
			scenarioAr:
				'السؤال الكلاسيكي في بكالوريا اللغات الأجنبية هو جدول تفكيك الكلمات: Divide the following words into roots and affixes (Prefix | Root | Suffix). نقطة ونصف إلى نقطتين مضمونتان بالتدريب الصحيح!',
			svg: svgEnglishWordFormation({
				title: 'BAC LE Affix Division Model',
				prefix: 'un- / dis- / pre- / re-',
				root: 'civilize / appear / history / build',
				suffix: '-ation / -ed / -ic / -ing',
				derivedWord: 'prehistoric | disappearance | reconstruction',
				meaningNote: 'Always strip prefixes from the left and suffixes from the right to reveal the true root!'
			}),
			steps: [
				{
					promptAr: 'كيف نفكك كلمة prehistoric إلى Prefix + Root + Suffix؟',
					hintAr: 'ما البادئة التي تعني «قبل»، وما الأصل، وما اللاحقة الوصفية؟',
					expectedInput: 'Prefix: pre- | Root: history (histor) | Suffix: -ic',
					revealAr: 'pre- تعني قبل، والجذر هو history (تُحذف y عند اتصالها بـ -ic)، واللاحقة -ic تحولها إلى صفة (ما قبل التاريخ).'
				},
				{
					promptAr: 'كيف نفكك كلمة disappearance؟',
					hintAr: 'ابحث عن بادئة النفي ولاحقة الاسم.',
					expectedInput: 'Prefix: dis- | Root: appear | Suffix: -ance',
					revealAr: 'dis- (بادئة ضد) + appear (الجذر الفعلي) + -ance (لاحقة اسم).'
				},
				{
					promptAr: 'ماذا نضع في خانة Prefix إذا لم تكن للكلمة بادئة (مثل civilization)؟',
					hintAr: 'هل كل كلمة يجب أن تحتوي على بادئة؟',
					expectedInput: 'نتركها فارغة بعلامة شرطة (—) أو None',
					revealAr: 'ليست كل كلمة تحتوي على بادئة ولاحقة معاً! في civilization نكتب: Prefix = — | Root = civil (أو civilize) | Suffix = -ization (أو -ation).'
				}
			]
		},
		summary: {
			rulesAr: [
				'خطوات التفكيك الصحيحة: (1) استخرج البادئة من اليسار إن وُجدت (un-, in-, im-, il-, ir-, dis-, pre-, re-, mis-, over-, inter-). (2) استخرج اللاحقة أو اللواحق من اليمين (-tion, -ment, -ity, -ance, -al, -ic, -ous, -ful, -less, -able, -ed, -ing, -ly). (3) اكتب الجذر المتبقي بوضوح.',
				'كلمات قد تحتوي على لاحقتين متتابعتين (Double Suffixes): مثل historically (histor + ic + al + ly)، و unforgettably (un + forget + able + ly). في جدول البكالوريا تُجمع اللواحق في خانة Suffix (مثل -ically).',
				'انتبه للكلمات ذات الجذر الصريح بلا بادئة مثل: architectural (— | architect | -ural)، prosperity (— | prosper | -ity)، archaeological (— | archaeology | -ical).',
				'تذكّر التحولات الإملائية عند إعادة الجذر: حذف e الصامتة (civilize تصبح civilization)، وتحول y إلى i (history تصبح historical، unify تصبح unification).'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'BAC LE Prefix / Root / Suffix Examples',
				rootLabel: 'High-Frequency Exam Words',
				rootSub: 'Clean Division Without Losing Points',
				branches: [
					{
						label: 'unbelievable',
						rule: 'un- | believe | -able',
						example: 'Prefix + Root + Suffix'
					},
					{
						label: 'reconstruction',
						rule: 're- | construct | -ion',
						example: 'Prefix + Root + Suffix'
					},
					{
						label: 'prosperity',
						rule: '(none) | prosper | -ity',
						example: 'Root + Suffix only'
					},
					{
						label: 'misunderstand',
						rule: 'mis- | understand | (none)',
						example: 'Prefix + Root only'
					}
				]
			}),
			visualCaptionAr: 'نماذج جاهزة لجدول تفكيك الكلمات في بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Divide into Prefix / Root / Suffix: disappearance | prehistoric | international | preservation',
					solutionAr: 'dis / appear / ance | pre / histor(y) / ic | inter / nation / al | — / preserv(e) / ation'
				},
				{
					problemAr: 'Divide: illiterate | unforgettable | instability | achievement',
					solutionAr: 'il / literate / — | un / forget / able | in / stabl(e) / ity | — / achieve / ment'
				},
				{
					problemAr: 'Complete Verb / Noun / Adjective: to preserve | .......... | ..........',
					solutionAr: 'Noun: preservation | Adjective: preserved / preservative'
				}
			],
			watchOutAr: 'لا تفصل حروفاً أصلية من الجذر على أنها بادئة! فمثلاً في كلمة preservation ليس pre- بادئة هنا لأن الجذر هو preserve، وفي كلمة discover الجذر الشائع في البكالوريا يُقبل dis + cover أو discover كجذر واحد حسب الاشتقاق (discovery = discover + y).'
		},
		practice: [
			{
				questionAr: 'How is the word "international" correctly divided into Prefix + Root + Suffix?',
				options: [
					'inter- + nation + -al',
					'in- + ternation + -al',
					'inter- + nat + -ional',
					'— + internation + -al'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: البادئة inter- (بين) + الجذر nation (أمة) + اللاحقة الوصفية -al.',
					'خطأ: ternation ليست كلمة ولا جذراً.',
					'خطأ: الجذر هو nation وليس nat.',
					'خطأ: أهملت البادئة الواضحة inter-.'
				],
				explanationAr: 'inter- (بين) + nation (الجذر) + -al (لاحقة صفة).'
			},
			{
				questionAr: 'Identify the correct division of "instability":',
				options: [
					'in- + stable + -ity',
					'ins- + table + -ity',
					'— + instable + -ity',
					'in- + stabil + -ty'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: البادئة in- للنفي + الجذر stable + اللاحقة الاسمية -ity.',
					'خطأ: لا توجد بادئة ins-.',
					'خطأ: أهملت بادئة النفي in-.',
					'خطأ: اللاحقة القياسية هنا هي -ity.'
				],
				explanationAr: 'instability تتكون من البادئة in- والجذر stable واللاحقة -ity.'
			},
			{
				questionAr: 'Which word has ONLY a Root and a Suffix (no Prefix)?',
				options: ['prosperity', 'prehistoric', 'disappearance', 'reconstruction'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: prosper (جذر) + -ity (لاحقة) ولا توجد بادئة.',
					'خطأ: تبدأ بالبادئة pre-.',
					'خطأ: تبدأ بالبادئة dis-.',
					'خطأ: تبدأ بالبادئة re-.'
				],
				explanationAr: 'prosperity تحتوي على جذر ولاحقة فقط دون بادئة.'
			},
			{
				questionAr: 'What is the root of the word "unification"?',
				options: ['unify (or uni-)', 'nify', 'fication', 'unific'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: الفعل الجذري هو unify، وتتحول y إلى i قبل -cation.',
					'خطأ: nify ليست جذراً.',
					'خطأ: هذه هي اللاحقة.',
					'خطأ: ليست كلمة إنجليزية قائمة.'
				],
				explanationAr: 'تشتق unification من الفعل unify (يوحّد).'
			},
			{
				questionAr: 'Divide "irreplaceable" into Prefix + Root + Suffix:',
				options: [
					'ir- + replace + -able',
					'ir- + place + -able',
					'irre- + place + -able',
					'— + irreplace + -able'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: البادئة ir- (نفي قبل r) + الجذر replace (أو re+place) + اللاحقة -able.',
					'خطأ: حذفت re- التي تعطي معنى الاستبدال.',
					'خطأ: irre- ليست بادئة واحدة.',
					'خطأ: أهملت بادئة النفي ir-.'
				],
				explanationAr: 'البادئة السالبة ir- تسبق الكلمات المبدوءة بحرف r مثل replace (irreplaceable).'
			}
		]
	},

	// ─────────────────────────────────────────────────────────────────────────
	// Lesson 4: Word Stress in Multi-Syllable Academic Words
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'eng_lesson_3as_le_t1_stress_multisyllable',
		slug: 'eng-3as-le-t1-stress-multisyllable',
		grade: '3as_le',
		yearSubjectId: 789,
		trimesterId: 't1',
		sequenceId: 'unit1',
		sequenceTitleAr: 'الوحدة 1: Exploring the Past (الحضارات القديمة والإسلامية والجزائرية)',
		order: 4,
		titleAr: 'النبر الصوتي في الكلمات الأكاديمية متعددة المقاطع (Multi-Syllable Word Stress)',
		objectives: [
			'ضبط قواعد النبر المتقدمة للواحق الأكاديمية في بكالوريا اللغات الأجنبية (-tion, -sion, -ic, -ical, -ty, -gy, -phy, -al, -ate)',
			'تصنيف كلمات من 3 و 4 و 5 مقاطع حسب موقع المقطع المنبور (1st, 2nd, 3rd, 4th syllable)',
			'التمييز بين انتقال النبر داخل العائلة الواحدة (مثل CIV-i-lize مقابل civ-i-li-ZA-tion)'
		],
		keywordsAr: ['Word Stress', 'Multi-Syllable', '-ical', '-gy', '-phy', '-tion', 'Stress Shift'],
		discover: {
			scenarioAr:
				'في شعبة اللغات الأجنبية لا يقتصر سؤال النبر على الكلمات القصيرة، بل يمتد إلى كلمات أكاديمية طويلة مثل civilization و archaeological و astronomy و philosophy. معرفة قاعدة «العدّ من الخلف» تجعل الإجابة دقيقة 100%.',
			svg: svgEnglishPhoneticsChart({
				title: 'Multi-Syllable Word Stress (BAC LE)',
				subtitle: 'Suffixes control where the stress lands!',
				columns: [
					{
						sound: '2nd from End',
						rule: '-tion / -sion / -ic / -ian',
						examples: 'civ-i-li-ZA-tion, his-TO-ri-an'
					},
					{
						sound: '3rd from End',
						rule: '-ty / -gy / -phy / -ical / -ate',
						examples: 'ar-chae-OL-o-gy, his-TOR-i-cal'
					},
					{
						sound: 'Stress Shift',
						rule: 'Adding a suffix moves stress!',
						examples: 'HIS-to-ry vs his-TOR-ic'
					}
				]
			}),
			steps: [
				{
					promptAr: 'قارن بين موقع النبر في history و historic و historical!',
					hintAr: 'استخدم قاعدة المقطع قبل -ic وقاعدة المقطع الثالث من النهاية لـ -ical.',
					expectedInput: 'HIS-to-ry (1st) | his-TOR-ic (2nd) | his-TOR-i-cal (2nd)',
					revealAr: 'إضافة اللاحقة -ic أو -ical تنقل النبر إلى المقطع الذي يسبقها مباشرة (TOR)، وهو المقطع الثاني في historic و historical.'
				},
				{
					promptAr: 'أين يقع النبر في كلمة civilization (خمسة مقاطع: civ-i-li-za-tion)؟',
					hintAr: 'تنتهي بـ -tion، إذن النبر على المقطع قبل الأخير مباشرة.',
					expectedInput: 'المقطع الرابع (civ-i-li-ZA-tion)',
					revealAr: 'المقطع قبل -tion هو ZA، وبترتيبه من البداية يكون المقطع الرابع (4th syllable).'
				},
				{
					promptAr: 'أين يقع النبر في الكلمات المنتهية بـ -gy و -phy مثل archaeology و geography؟',
					hintAr: 'عد ثلاثة مقاطع من نهاية الكلمة.',
					expectedInput: 'المقطع الثالث من النهاية (ar-chae-OL-o-gy / ge-OG-ra-phy)',
					revealAr: 'كل الكلمات المنتهية بـ -gy أو -phy أو -my (مثل astronomy) يُنبر فيها المقطع الثالث من النهاية: as-TRON-o-my.'
				}
			]
		},
		summary: {
			rulesAr: [
				'القاعدة 1 (المقطع الثاني من النهاية — Penultimate): الكلمات المنتهية بـ -tion, -sion, -ic, -ics, -ian, -ious (civ-i-li-ZA-tion, in-VA-sion, sci-en-TIF-ic, his-TO-ri-an).',
				'القاعدة 2 (المقطع الثالث من النهاية — Antepenultimate): الكلمات المنتهية بـ -ty, -cy, -gy, -phy, -my, -ical, -ate (pros-PER-i-ty, ar-chae-OL-o-gy, ge-OG-ra-phy, as-TRON-o-my, CUL-tur-al, ED-u-cate).',
				'القاعدة 3 (اللواحق المحايدة لا تغير النبر): -ment, -ness, -ful, -less, -er, -ing, -ed (a-CHIEVE تصبح a-CHIEVE-ment؛ DE-vel-op تصبح de-VEL-op-ment).',
				'طريقة جدول البكالوريا: قسّم الكلمة أولاً إلى مقاطع، ثم حدد المقطع المنبور بالعدّ من الخلف، ثم عدّ رقمه من البداية (1st / 2nd / 3rd / 4th) لتضعه في العمود الصحيح!'
			],
			visualSvg: svgEnglishGrammarMap({
				title: 'Step-by-Step BAC Stress Table Method',
				rootLabel: '1. Divide | 2. Suffix Rule | 3. Count from Left',
				rootSub: 'Example: ar-chae-o-LOG-i-cal (6 syllables)',
				branches: [
					{
						label: '1st Syllable',
						rule: '3-syl -ty/-al/-ate',
						example: 'HER-i-tage, CUL-tur-al'
					},
					{
						label: '2nd Syllable',
						rule: '3-syl -tion / 4-syl -gy',
						example: 'tra-DI-tion, as-TRON-o-my'
					},
					{
						label: '3rd Syllable',
						rule: '4-syl -tion/-ic / 5-syl -gy',
						example: 'e-co-NOM-ic, ar-chae-OL-o-gy'
					},
					{
						label: '4th Syllable',
						rule: '5-syl -tion',
						example: 'civ-i-li-ZA-tion'
					}
				]
			}),
			visualCaptionAr: 'تصنيف الكلمات الأكاديمية في أعمدة النبر الأربعة كما ترد في بكالوريا اللغات الأجنبية.',
			examples: [
				{
					problemAr: 'Classify by stressed syllable (1st / 2nd / 3rd / 4th): heritage, astronomy, scientific, civilization',
					solutionAr: '1st: HER-i-tage | 2nd: as-TRON-o-my | 3rd: sci-en-TIF-ic | 4th: civ-i-li-ZA-tion'
				},
				{
					problemAr: 'Compare stress shift: geography vs geographical',
					solutionAr: 'ge-OG-ra-phy (2nd syllable) | ge-o-GRAPH-i-cal (3rd syllable, right before -ical)'
				},
				{
					problemAr: 'Check neutral suffix: preserve vs preservation vs preserved',
					solutionAr: 'pre-SERVE (2nd) | pre-SERVED (2nd — unchanged!) | pres-er-VA-tion (3rd — shifted before -tion!)'
				}
			],
			watchOutAr: 'انتبه جيداً: جدول البكالوريا يرتب الأعمدة من اليسار (1st / 2nd / 3rd syllable)، بينما القاعدة تحسب من اليمين (الثاني أو الثالث من النهاية) — فلا تخلط بين العدّين!'
		},
		practice: [
			{
				questionAr: 'On which syllable does the main stress fall in "civilization" (civ-i-li-za-tion)?',
				options: ['4th syllable (ZA)', '1st syllable (CIV)', '2nd syllable (i)', '3rd syllable (li)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: قبل -tion مباشرة يقع المقطع ZA وهو الرابع من البداية.',
					'خطأ: المقطع الأول يحمل نبراً ثانوياً فقط.',
					'خطأ: المقطع الثاني غير منبور.',
					'خطأ: المقطع الثالث غير منبور.'
				],
				explanationAr: 'civ-i-li-ZA-tion: 5 syllables، والنبر الرئيسي على المقطع الرابع (قبل -tion).'
			},
			{
				questionAr: 'Which syllable is stressed in "archaeology" (ar-chae-ol-o-gy)?',
				options: ['3rd syllable (OL)', '1st syllable (AR)', '2nd syllable (chae)', '4th syllable (o)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز: مع اللاحقة -gy نعد ثلاثة مقاطع من النهاية: gy (1) - o (2) - OL (3)، وهو الثالث من البداية.',
					'خطأ: الأول ليس منبوراً رئيسياً.',
					'خطأ: الثاني غير منبور.',
					'خطأ: الرابع غير منبور.'
				],
				explanationAr: 'الكلمات المنتهية بـ -gy مثل ar-chae-OL-o-gy يُنبر فيها المقطع الثالث من النهاية.'
			},
			{
				questionAr: 'Where does the stress fall in "astronomy" (as-tron-o-my)?',
				options: ['2nd syllable (TRON)', '1st syllable (AS)', '3rd syllable (o)', '4th syllable (my)'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: الثالث من النهاية في كلمة من 4 مقاطع هو الثاني من البداية (as-TRON-o-my).',
					'خطأ: الأول غير منبور.',
					'خطأ: الثالث غير منبور.',
					'خطأ: الأخير غير منبور.'
				],
				explanationAr: 'الكلمات المنتهية بـ -my مثل as-TRON-o-my و e-CON-o-my تُنبر على المقطع الثالث من النهاية.'
			},
			{
				questionAr: 'Which word has its primary stress on the 1st syllable?',
				options: ['heritage', 'tradition', 'historic', 'invention'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت: HER-i-tage منبورة على المقطع الأول.',
					'خطأ: tra-DI-tion على الثاني (قبل -tion).',
					'خطأ: his-TOR-ic على الثاني (قبل -ic).',
					'خطأ: in-VEN-tion على الثاني (قبل -tion).'
				],
				explanationAr: 'HER-i-tage منبورة على المقطع الأول، بينما باقي الخيارات على المقطع الثاني.'
			},
			{
				questionAr: 'Which suffix is stress-neutral (does NOT shift the stress of the root)?',
				options: ['-ment', '-tion', '-ic', '-ity'],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح: اللاحقة -ment لا تغير موقع النبر (a-CHIEVE تصبح a-CHIEVE-ment).',
					'خطأ: -tion تجذب النبر إلى المقطع قبلها مباشرة.',
					'خطأ: -ic تجذب النبر إلى المقطع قبلها مباشرة.',
					'خطأ: -ity تجذب النبر إلى المقطع الثالث من النهاية.'
				],
				explanationAr: 'اللواحق -ment و -ness و -ful و -ed محايدة لا تنقل النبر.'
			}
		]
	}
];
