import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildArudScansionBlock,
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock
} from '../../arabic-helpers';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — ARB-LP, coeff 6, 10+6+4=20)
 * Parameterized Exam & Quiz Templates — Trimester 1 (5 templates)
 * Roles: 2 intellectual_building (10 pts) + 2 linguistic_building (6 pts with العروض) + 1 critical_evaluation (4 pts)
 */
export const TEMPLATES_3AS_LP_T1: ArabicParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. INTELLECTUAL BUILDING (10 pts — Poetry): المديح النبوي المنضبط والزهد وشعر المنفى
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t1_ib_madaeh_manfa',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري (شعر): المديح النبوي المنضبط والزهد وشعر المنفى',
		curriculumLessonId: 'arb_lesson_3as_lp_t1_ihya_manfa',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'من شعر المديح النبوي المنضبط',
					author: 'حسان بن ثابت وكعب بن زهير رضي الله عنهما (نموذج مقتبس للدرس)',
					source: 'الأدب الإسلامي المنضبط',
					verses: [
						['وَأَحْسَنُ مِنْكَ لَمْ تَرَ قَطُّ [[عَيْنِي]]', 'وَأَجْمَلُ مِنْكَ لَمْ تَلِدِ النِّسَاءُ'],
						['خُلِقْتَ مُبَرَّأً مِنْ كُلِّ عَيْبٍ', 'كَأَنَّكَ ((قَدْ خُلِقْتَ)) كَمَا تَشَاءُ'],
						['إِنَّ الرَّسُولَ لَنُورٌ ((يُسْتَضَاءُ بِهِ))', 'مُهَنَّدٌ مِنْ سُيُوفِ اللَّهِ مَسْلُولُ'],
						['لَوْلَا [[الهُدَى]] الَّذِي أَتَى بِهِ نَاطِقاً', 'لَبَقِيَتِ القُلُوبُ فِي الظُّلَمِ تَائِهَةً']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'مبرّأً', meaning: 'مطهّراً وسالماً من كل نقص' },
						{ word: 'مهنّد', meaning: 'سيف قاطع منسوب إلى أجود سيوف الهند' }
					],
					theme: 'الثناء الصادق على الشمائل النبوية ونور الوحي وهداية الرسالة المحمدية دون غلو',
					pattern: 'الوصفي',
					patternIndicators: 'كثرة النعوت والأوصاف (أحسن، أجمل، مبرّأً، نور، مهند) والصور البيانية التوضيحية',
					tendency: 'النزعة الدينية الإسلامية المنضبطة على منهج أهل السنة والجماعة',
					summaryModel:
						'يشيد النص بكمال الخلق النبوي وصفاء شمائله صلى الله عليه وسلم، ويبرز أن رسالته نور يبدد ظلمات الجهل ويقود القلوب إلى الحق والاستقامة.',
					quizEasyCorrect: 'المديح النبوي الصادق الخالي من الغلو',
					quizMediumCorrect: 'النمط الوصفي لغلبة النعوت والصور المبرزة للشمائل النبوية',
					quizHardCorrect: 'الثناء على الشمائل ونور الهداية واتباع السنة مع صيانة التوحيد'
				},
				{
					title: 'من شعر الزهد والحكمة والعلم',
					author: 'زين الدين ابن الوردي',
					source: 'لامية ابن الوردي (مختارات منضبطة)',
					verses: [
						['اُطْلُبِ [[العِلْمَ]] وَلَا تَكْسَلْ فَمَا', 'أَبْعَدَ الخَيْرَ عَلَى أَهْلِ الكَسَلْ'],
						['اهْجُرِ النَّوْمَ وَحَصِّلْهُ فَمَنْ', '((يَعْرِفِ المَطْلُوبَ)) يَحْقِرْ مَا بَذَلْ'],
						['لَا تَقُلْ قَدْ ذَهَبَتْ أَرْبَابُهُ', 'كُلُّ مَنْ سَارَ عَلَى الدَّرْبِ وَصَلْ'],
						['وَاتَّقِ اللهَ فَتَقْوَى اللهِ مَا', 'جَاوَرَتْ قَلْبَ امْرِئٍ إِلَّا وَصَلْ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'أربابه', meaning: 'أصحابه وعلماؤه السابقون' },
						{ word: 'يحقر ما بذل', meaning: 'يستصغر الجهد المبذول في سبيل الغاية السامية' }
					],
					theme: 'الدعوة إلى طلب العلم النافع ونبذ الكسل والتحلي بتقوى الله والزهد في التوافه',
					pattern: 'الإيعازي (الأمري الوعظي)',
					patternIndicators: 'تتابع أفعال الأمر والنهي (اطلب، لا تكسل، اهجر، حصّله، لا تقل، اتقِ) وأسلوب الحكمة والتعليل',
					tendency: 'النزعة الإصلاحية الوعظية الدينية',
					summaryModel:
						'يدعو الشاعر طالب العلم إلى الجد والمثابرة وهجر الكسل واليأس، مؤكداً أن بلوغ المراتب العليا ثمرة الصبر والعمل المقترن بتقوى الله.',
					quizEasyCorrect: 'شعر الزهد والحكمة التربوية',
					quizMediumCorrect: 'النمط الإيعازي الوعظي لكثرة أفعال الأمر والنهي والتوجيه',
					quizHardCorrect: 'الربط بين الاجتهاد العلمي والمثابرة وبين تقوى الله وصلاح القلب'
				},
				{
					title: 'من شعر المنفى والحنين والثبات',
					author: 'محمود سامي البارودي (من وحي المنفى بسرنديب)',
					source: 'ديوان البارودي (مدرسة الإحياء)',
					verses: [
						['إِذَا [[المَرْءُ]] لَمْ يَدْفَعْ يَدَ الجَوْرِ إِنْ سَطَتْ', 'عَلَيْهِ فَلَا يَأْسَفْ إِذَا ضَاعَ مَجْدُهُ'],
						['وَمَنْ يَكُ ذَا عَزْمٍ يَسُدْ فِي زَمَانِهِ', 'وَيَبْلُغْ مِنَ العَلْيَاءِ مَا كَانَ ((يَرْتَجِي))'],
						['مَحَا البُعْدُ مَا أَبْقَى الزَّمَانُ مِنَ الصِّبَا', 'وَلَمْ يَمْحُ مِنْ قَلْبِي حَنِيناً إِلَى الحِمَى'],
						['فَيَا وَطَناً نَاءَتْ بِهِ الدَّارُ عَنْ يَدِي', 'رَعَى اللهُ أَرْضاً ((صَانَ فِيهَا)) الكِرَامُ عَهْدَهُ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'الجور', meaning: 'الظلم والعدوان' },
						{ word: 'الحمى', meaning: 'الوطن والأرض التي يُدافع عنها' }
					],
					theme: 'الاعتزاز بالإباء ورفض الظلم في الغربة مع شدة الحنين والوفاء للوطن',
					pattern: 'الوصفي والحجاجي الحكمي',
					patternIndicators: 'استعمال أسلوب الشرط والحكمة (إذا المرء، من يك)، وتصوير المعاناة والشوق للوطن بالنداء والنعوت',
					tendency: 'النزعة الوطنية والذاتية الإبائية',
					summaryModel:
						'يعبر الشاعر من منفاه عن رفضه القاطع للظلم وتمسكه بالعزيمة والكرامة، مؤكداً أن طول الغربة لم يُضعف شوقه العميق إلى وطنه وأهله.',
					quizEasyCorrect: 'شعر المنفى والحنين (مدرسة الإحياء والبعث)',
					quizMediumCorrect: 'امتزاج النمط الوصفي بالنمط الحجاجي الحكمي',
					quizHardCorrect: 'الجمع بين قوالب التراث الرصينة وبين صدق المعاناة الذاتية والوطنية'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الشعر المسرحي الحواري', diagnosticFeedback: 'النص قصيدة عمودية ذات شطرين وليس مسرحية حوارية.' },
						{ text: 'المقال النقدي الصحفي', diagnosticFeedback: 'النص شعر موزون وليس مقالاً نثرياً.' },
						{ text: 'القصة القصيرة الواقعية', diagnosticFeedback: 'لا يتبع النص بناء السرد القصصي والعقدة والحل.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في النص الشعري بعنوان «${chosen.title}» (${chosen.author})، ما الغرض أو الاتجاه الأدبي الذي ينتمي إليه النص؟`,
					questionTextAr: 'حدد الغرض الشعري الصحيح للنص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يعالج النص موضوع: ${chosen.theme}، ولذلك ينتمي إلى ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'النمط السردي القصصي لتسلسل الأحداث والعقدة والحل', diagnosticFeedback: 'لا توجد قصة ذات أحداث متأزمة وشخصيات متصارعة.' },
						{ text: 'النمط الحواري المسرحي لتناوب المتحدثين', diagnosticFeedback: 'النص خطاب شعري واحد وليس حواراً مسرحياً.' },
						{ text: 'النمط العلمي الإحصائي المعتمد على الأرقام', diagnosticFeedback: 'الشعر الوجداني والوعظي لا يعتمد لغة الأرقام المجردة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `اعتماداً على أبيات «${chosen.title}» ومؤشراتها الأسلوبية، ما النمط الغالب في النص؟`,
					questionTextAr: 'اختر النمط الغالب وتعليله الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `النمط هو ${chosen.pattern}، ومن أبرز مؤشراته: ${chosen.patternIndicators}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'التخلي عن البحور الخليلية واستعمال السطر الشعري الحر', diagnosticFeedback: 'النص ملتزم بالبنية العمودية ذات الشطرين.' },
						{ text: 'طغيان التشاؤم المطلق والدعوة إلى الاستسلام واليأس', diagnosticFeedback: 'النص يبث الأمل والثبات والارتقاء الأخلاقي لا اليأس.' },
						{ text: 'الاقتصار على الألغاز الشكلية الخالية من أي مضمون قيمي', diagnosticFeedback: 'النص يحمل رسالة قيمية وتربوية أو وطنية واضحة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما السمة الفكرية والقيمية الأعمق التي يرسخها نص «${chosen.title}»؟`,
					questionTextAr: 'استنتج السمة الفكرية الأعمق في الأبيات:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `النزعة السائدة هي ${chosen.tendency}، ويرسخ النص: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند الشعري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري بدقة ووضوح:',
				content: [
					buildPoetryPassageBlock({
						title: chosen.title,
						verses: chosen.verses,
						author: chosen.author,
						source: chosen.source,
						vocabulary: chosen.vocabulary
					}),
					{
						type: 'text',
						content: '1) ما الموضوع المحوري الذي يدور حوله السند الشعري؟ وما الغاية التي يرمي إليها الشاعر؟',
						answer: `1) يدور النص حول ${chosen.theme}، وغايته ترسيخ القيم السامية وإيقاظ الوعي والوجدان لدى القارئ.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) استخرج من الأبيات النزعة البارزة للشاعر، ثم بيّن مدى صدق عاطفته مدعماً إجابتك بقرائن من النص.',
						answer: `2) تبرز ${chosen.tendency}؛ وتبدو العاطفة صادقة متدفقة بعيدة عن التصنع، بدليل جزالة العبارات وحرارة الأسلوب وتكامل المعاني.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) حدّد النمط الغالب في النص مع التمثيل له بمؤشرين بارزين من الأبيات.',
						answer: `3) النمط الغالب هو ${chosen.pattern}، ومن مؤشراته: ${chosen.patternIndicators}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون الأبيات بأسلوبك الخاص محافظاً على الفكرة العامة وحجم التلخيص المناسب.',
						answer: `4) التلخيص المقترح: ${chosen.summaryModel}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion,
				sujetExercise,
				hints: [
					'اقرأ الأبيات كاملة وحدد الغرض الشعري (مديح نبوي منضبط، زهد وحكمة، أو شعر منفى).',
					'استنتج النمط من طبيعة الجمل: النعوت للوصفي، والأمر والنهي للإيعازي، والشرط والتعليل للحجاجي.',
					'في التلخيص استعمل أسلوبك الخاص وتجنب النسخ الحرفي للأبيات أو ذكر عبارة «يقول الشاعر».'
				],
				solutionStepsAr: [
					`تحديد الموضوع المحوري: ${chosen.theme}.`,
					`استخراج النزعة: ${chosen.tendency}.`,
					`تحديد النمط (${chosen.pattern}) مع مؤشراته: ${chosen.patternIndicators}.`,
					`صياغة تلخيص مركز ووافٍ: ${chosen.summaryModel}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. INTELLECTUAL BUILDING (10 pts — Prose): النثر العلمي المتأدب لابن خلدون
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t1_ib_nathr_khaldun',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري (نثر): النثر العلمي المتأدب في مقدمة ابن خلدون',
		curriculumLessonId: 'arb_lesson_3as_lp_t1_nathr_ilmi_mutaaddib',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'في أن الشدة على المتعلمين مضرة بهم',
					paragraphs: [
						'إِنَّ إِرْهَافَ [[الحَدِّ]] فِي التَّعْلِيمِ مُضِرٌّ بِالمُتَعَلِّمِ، سِيَّمَا فِي أَصَاغِرِ الوَلَدِ، لِأَنَّهُ مِنْ سُوءِ المَلَكَةِ. وَمَنْ كَانَ مَرْبَاهُ بِالعَسْفِ وَالقَهْرِ مِنَ المُتَعَلِّمِينَ سَطَا بِهِ القَهْرُ، وَضَيَّقَ عَلَى النَّفْسِ فِي انْبِسَاطِهَا، وَذَهَبَ بِنَشَاطِهَا.',
						'وَإِذَا ((تَعَوَّدَ التِّلْمِيذُ)) القَهْرَ وَالعُنْفَ، فَسَدَتْ مَعَانِي الإِنْسَانِيَّةِ الَّتِي لَهُ، وَصَارَ عِيَالاً عَلَى غَيْرِهِ. فَيَنْبَغِي لِلْمُعَلِّمِ فِي مُتَعَلِّمِهِ أَلَّا يَسْتَبِدَّ عَلَيْهِ، بَلْ يَأْخُذَهُ بِالرِّفْقِ وَالتَّدْرِيجِ حَتَّى تَرْسَخَ [[المَلَكَةُ]] فِي نَفْسِهِ.'
					],
					vocabulary: [
						{ word: 'إرهاف الحد', meaning: 'المبالغة في القسوة والشدة' },
						{ word: 'الملكة', meaning: 'الصفة الراسخة والقدرة المكتسبة بالتكرار' }
					],
					mainIdea: 'بيان الآثار النفسية والتربوية الضارة للشدة والقهر في التعليم، والدعوة إلى الرفق والتدريج',
					method: 'الإجمال ثم التفصيل والتعليل المنطقي (طرح الحكم التربوي مجملاً ثم شرح نتائجه السلبية وتقديم البديل التربوي)',
					quizEasyCorrect: 'النثر العلمي المتأدب',
					quizMediumCorrect: 'النمط التفسيري لاعتماده التعليل والمصطلح التربوي ومنهج الإجمال والتفصيل',
					quizHardCorrect: 'إفساد معاني الإنسانية وإضعاف النشاط والهمة لدى المتعلم'
				},
				{
					title: 'في أن الإنسان مدني بالطبع وحاجة العمران للتعاون',
					paragraphs: [
						'اعْلَمْ أَنَّ الِاجْتِمَاعَ الإِنْسَانِيَّ ضَرُورِيٌّ، فَقُدْرَةُ الوَاحِدِ مِنَ البَشَرِ قَاصِرَةٌ عَنْ تَحْصِيلِ حَاجَتِهِ مِنَ الغِذَاءِ، لِأَنَّ القُوتَ لَا يَتِمُّ إِلَّا بِصَنَائِعَ مُتَعَدِّدَةٍ تَسْتَدْعِي [[تَعَاوُناً]] بَيْنَ أَبْنَاءِ الجِنْسِ.',
						'وَلَوْلَا [[الِاجْتِمَاعُ]] وَالتَّعَاوُنُ لَمَا حَصَلَ لِلْإِنْسَانِ قُوتٌ وَلَا حَيَاةٌ، وَلَمَا اسْتَطَاعَ دَفْعَ العُدْوَانِ عَنْ نَفْسِهِ؛ فَإِذَا ((تَآزَرَ النَّاسُ)) وَانْتَظَمَ عُمْرَانُهُمْ، عَمَرَتِ الأَرْضُ وَازْدَهَرَتِ العُلُومُ وَالصَّنَائِعُ.'
					],
					vocabulary: [
						{ word: 'قاصرة', meaning: 'عاجزة غير كافية وحدها' },
						{ word: 'العمران', meaning: 'التساكن والتعاون البشري المنظم لبناء المجتمع' }
					],
					mainIdea: 'إثبات ضرورة الاجتماع البشري والتعاون لتأمين حاجات الحياة والدفاع عن النفس وبناء العمران',
					method: 'الاستدلال العقلي المنطقي القائم على المقدمة والتعليل والنتيجة (إجمال ثم تفصيل)',
					quizEasyCorrect: 'النثر العلمي المتأدب',
					quizMediumCorrect: 'النمط التفسيري الحجاجي لاستخدام التعليل والشرط والمصطلح الاجتماعي',
					quizHardCorrect: 'عجز الفرد وحده عن تأمين قوته وحمايته دون تعاون الصنائع والمجتمع'
				},
				{
					title: 'في أن التعليم للعلم من جملة الصنائع والتدريج فيه',
					paragraphs: [
						'اعْلَمْ أَنَّ تَلْقِينَ العُلُومِ لِلْمُتَعَلِّمِينَ إِنَّمَا يَكُونُ مُفِيداً إِذَا كَانَ عَلَى [[التَّدْرِيجِ]] شَيْئاً فَشَيْئاً وَقَلِيلاً قَلِيلاً؛ يُلْقِي المُعَلِّمُ أَوَّلاً مَسَائِلَ كُلِّ بَابٍ مِنَ الفَنِّ هِيَ أُصُولُ ذَلِكَ البَابِ وَيُقَرِّبُهَا إِجْمَالاً.',
						'ثُمَّ يَرْجِعُ بِهِ إِلَى الفَنِّ ثَانِيَةً فَيَرْفَعُهُ فِي التَّلْقِينِ عَنْ تِلْكَ الرُّتْبَةِ إِلَى أَعْلَى مِنْهَا، حَتَّى ((تَحْصُلَ لَهُ)) المَلَكَةُ التَّامَّةُ. فَلَوْ أُلْقِيَتِ الغَايَاتُ فِي البِدَايَاتِ لَكَلَّ [[ذِهْنُ]] المُتَعَلِّمِ وَظَنَّ أَنَّ العِلْمَ صَعْبٌ فَانْصَرَفَ عَنْهُ.'
					],
					vocabulary: [
						{ word: 'أصول الباب', meaning: 'القواعد والمبادئ الأساسية فيه' },
						{ word: 'كلّ ذهنه', meaning: 'تعب عقله وعجز عن الاستيعاب' }
					],
					mainIdea: 'بيان قاعدة التدرج المنهجي في تعليم العلوم من الإجمال إلى التفصيل لبناء الملكة العلمية',
					method: 'التدرج التعليمي الواضح: طرح القاعدة مجملة ثم تفصيل خطواتها ثم التحذير من مخالفتها',
					quizEasyCorrect: 'النثر العلمي المتأدب',
					quizMediumCorrect: 'النمط التفسيري التعليمي لتحديد الخطوات والتعليل والتمثيل',
					quizHardCorrect: 'الانتقال المتدرج من الأصول المجملة إلى التفصيل حتى ترسخ الملكة'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'المقال الصحفي الساخر', diagnosticFeedback: 'هذا النص من «مقدمة ابن خلدون» التراثية وليس مقالاً صحفياً حديثاً.' },
						{ text: 'القصة القصيرة الاجتماعية', diagnosticFeedback: 'لا يتضمن النص شخصيات قصصية ولا سرداً لحبكة وعقدة.' },
						{ text: 'الرسالة الإخوانية المسجوعة', diagnosticFeedback: 'أسلوب ابن خلدون علمي تحليلي مرسل خالٍ من السجع المتكلف.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `إلى أي فن نثري ينتمي نص «${chosen.title}» لعبد الرحمن بن خلدون؟`,
					questionTextAr: 'اختر الفن النثري الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يمثل نص ابن خلدون نموذجاً أصيلاً لـ ${finalAnswer} لجمعه بين الدقة العلمية وجمال الصياغة.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'النمط السردي لوجود أحداث تاريخية خيالية', diagnosticFeedback: 'ابن خلدون يشرح ويعلل قوانين تربوية واجتماعية لا يسرد قصة.' },
						{ text: 'النمط الوصفي الوجداني لطغيان العاطفة', diagnosticFeedback: 'لغة ابن خلدون موضوعية عقلية بعيدة عن الطغيان العاطفي.' },
						{ text: 'النمط الحواري لتعدد المتكلمين في النص', diagnosticFeedback: 'لا يوجد حوار بين شخصيات في النص.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما النمط الغالب في نص «${chosen.title}» لابن خلدون مع التعليل؟`,
					questionTextAr: 'حدد النمط الغالب وتعليله:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${finalAnswer}، حيث يعتمد ابن خلدون منهج ${chosen.method}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تأكيد ضرورة السجع المتكلف في تدريس العلوم', diagnosticFeedback: 'ابن خلدون يناقش قانوناً تربوياً واجتماعياً لا السجع اللفظي.' },
						{ text: 'الدعوة إلى العزلة التامة وترك التعليم والعمل', diagnosticFeedback: 'ابن خلدون يدعو للاجتماع والتعاون والتدرج العلمي لا العزلة.' },
						{ text: 'إثبات أن الشدة والقهر هما السبيل الوحيد للنبوغ', diagnosticFeedback: 'هذا عكس رأي ابن خلدون الذي حذر من القسوة والعنف.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما النتيجة العلمية أو التربوية الرئيسة التي أثبتها ابن خلدون في نص «${chosen.title}»؟`,
					questionTextAr: 'اختر الخلاصة العلمية الدقيقة للنص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `محور النص هو: ${chosen.mainIdea}، والنتيجة الدقيقة هي: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند النثري الآتي لعبد الرحمن بن خلدون ثم أجب عن أسئلة البناء الفكري:',
				content: [
					buildProsePassageBlock({
						title: chosen.title,
						paragraphs: chosen.paragraphs,
						author: 'عبد الرحمن بن خلدون',
						source: 'المقدمة (بتصرف تربوي يسير)',
						vocabulary: chosen.vocabulary
					}),
					{
						type: 'text',
						content: '1) ما القضية التربوية أو الاجتماعية التي يعالجها ابن خلدون في النص؟ وما موقفه منها؟',
						answer: `1) يعالج النص قضية: ${chosen.mainIdea}، وموقف ابن خلدون موضوعي علمي مبني على الملاحظة والتعليل المنطقي.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) استخلص المنهج الذي اعتمده الكاتب في عرض أفكاره، مع التمثيل من النص.',
						answer: `2) اعتمد ابن خلدون منهج ${chosen.method}، مستعملاً عبارات دالة كالتوكيد والتعليل والاستنتاج.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) حدّد الفن النثري للنص والنمط الغالب فيه، مع ذكر مؤشرين للنمط.',
						answer: '3) الفن النثري: النثر العلمي المتأدب. النمط الغالب: التفسيري (ومؤشراته: المصطلحات العلمية الدقيقة، أدوات التعليل والشرط والاستنتاج، والموضوعية ومنهج الإجمال والتفصيل).',
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون النص بأسلوبك الخاص في فقرة موجزة ومنسجمة.',
						answer: `4) التلخيص المقترح: يؤكد ابن خلدون عبر طرح علمي متدرج ضرورة مراعاة القوانين التربوية والاجتماعية السليمة في ${chosen.title}، لأن الأخذ بالتدرج والرفق والتعاون يحفظ نشاط النفس ويبني الملكة العلمية والعمران.`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'prose',
				quizQuestion,
				sujetExercise,
				hints: [
					'تأمل مطلع النص لتكتشف القاعدة المجملة التي يبدأ بها ابن خلدون.',
					'ابحث عن روابط التعليل (لأنه، فإذا، لولا) لتحديد مؤشرات النمط التفسيري.',
					'حافظ في التلخيص على الموضوعية والأفكار الأساسية دون إقحام رأيك الشخصي.'
				],
				solutionStepsAr: [
					`تحديد القضية الرئيسة: ${chosen.mainIdea}.`,
					`تحليل منهج ابن خلدون: ${chosen.method}.`,
					'تحديد الفن (النثر العلمي المتأدب) والنمط التفسيري ومؤشراته.',
					'تحرير تلخيص مركز يراعي الأمانة الفكرية وحسن الربط.'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC BUILDING (6 pts — Grammar + Rhetoric + Arud): إذا/لو/لولا + الجمل + العروض
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t1_lb_irab_arud_t1',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'grammar_irab',
		titleAr: 'البناء اللغوي (قواعد وبلاغة وعروض): إذا ولولا والجمل التي لها محل وتقطيع البحور التامة',
		curriculumLessonId: 'arb_lesson_3as_lp_t1_qawaid_idha_law_jumal',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					contextSentence: 'لَوْلَا [[العِلْمُ]] لَضَاعَتِ الأُمَمُ، وَإِذَا ((صَدَقَ العَزْمُ)) وَضَحَ السَّبِيلُ، وَقَدْ أَكْرَمَ[[نِي]] أُسْتَاذِي بِتَوْجِيهِهِ.',
					irabRows: [
						{
							target: 'العِلْمُ',
							irab: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة، وخبره محذوف وجوباً تقديره «موجود» (لوقوعه بعد لولا الامتناعية).',
							mark: '1'
						},
						{
							target: 'نِي (في أكرمني)',
							irab: 'النون: نون الوقاية حرف مبني على الكسر لا محل له. والياء: ضمير متصل مبني على السكون في محل نصب مفعول به.',
							mark: '0.5'
						},
						{
							target: '((صَدَقَ العَزْمُ))',
							irab: 'جملة فعلية في محل جر مضاف إليه (واقعة بعد الظرف «إذا»).',
							mark: '1'
						}
					],
					balaghaExpr: '«العِلْمُ نُورٌ يُبَدِّدُ ظَلَامَ الجَهْلِ»',
					balaghaAnswer:
						'تشبيه بليغ في «العلم نور» (حُذفت الأداة ووجه الشبه)، واستعارة مكنية في «يبدد ظلام الجهل» (شبّه الجهل بظلام حسي)؛ وأثرها توضيح الفكرة وتجسيد المعنوي في صورة حسية مؤثرة.',
					arud: {
						verseSadr: 'وَأَحْسَنُ مِنْكَ لَمْ تَرَ قَطُّ عَيْنِي',
						verseAjuz: 'وَأَجْمَلُ مِنْكَ لَمْ تَلِدِ النِّسَاءُ',
						arudWriting: 'وَأَحْسَنُ مِنْ - كَ لَمْ تَرَ قَطْ - طُ عَيْنِي — وَأَجْمَلُ مِنْ - كَ لَمْ تَلِدِنْ - نِسَاءُو',
						symbols: '||0|||0 - ||0|||0 - ||0|0 — ||0|||0 - ||0|||0 - ||0|0',
						tafilat: 'مُفَاعَلَتُنْ - مُفَاعَلَتُنْ - فَعُولُنْ — مُفَاعَلَتُنْ - مُفَاعَلَتُنْ - فَعُولُنْ',
						meterName: 'البحر الوافر التام (عروضه وضربه مقطوفان: فَعُولُنْ)'
					},
					quizEasyTarget: 'العِلْمُ بعد لولا',
					quizEasyCorrect: 'مبتدأ مرفوع وخبره محذوف وجوباً تقديره موجود',
					quizMediumCorrect: 'جملة فعلية في محل جر مضاف إليه بعد الظرف إذا',
					quizHardCorrect: 'البحر الوافر التام بعلة القطف في العروض والضرب (فعولن)'
				},
				{
					contextSentence: 'وَجَدْتُ [[الصَّبْرَ]] ((يَصْنَعُ الرِّجَالَ))، وَخَرَجْتُ فَ[[إِذَا]] الفَجْرُ مُشْرِقٌ بِالأَمَلِ.',
					irabRows: [
						{
							target: 'الصَّبْرَ',
							irab: 'مفعول به أول منصوب وعلامة نصبه الفتحة الظاهرة (للفعل «وجد» من أفعال اليقين المتعدية لمفعولين).',
							mark: '1'
						},
						{
							target: 'إِذَا',
							irab: 'حرف مفاجأة مبني على السكون لا محل له من الإعراب (لوقوعه بعد الفاء ودخوله على جملة اسمية).',
							mark: '0.5'
						},
						{
							target: '((يَصْنَعُ الرِّجَالَ))',
							irab: 'جملة فعلية في محل نصب مفعول به ثانٍ للفعل «وجد».',
							mark: '1'
						}
					],
					balaghaExpr: '«أَشْرَقَ فَجْرُ الأَمَلِ فِي قَلْبِ الغَرِيبِ»',
					balaghaAnswer:
						'تشبيه بليغ بإضافة المشبه به إلى المشبه «فجر الأمل» (أو استعارة مكنية في «أشرق الأمل»)، أثرها تجسيد المعنوي وبث التفاؤل والانشراح في النفس.',
					arud: {
						verseSadr: 'إِنَّ الرَّسُولَ لَنُورٌ يُسْتَضَاءُ بِهِ',
						verseAjuz: 'مُهَنَّدٌ مِنْ سُيُوفِ اللَّهِ مَسْلُولُ',
						arudWriting: 'إِنْنَرْرَسُو - لَلَنُو - رُنْيُسْتَضَا - ءُبِهِي — مُهَنْنَدُنْ - مِنْ سُيُو - فِلْلَاهِ مَسْ - لُولُو',
						symbols: '|0|0||0 - |||0 - |0|0||0 - |||0 — ||0||0 - |0||0 - |0|0||0 - |0|0',
						tafilat: 'مُسْتَفْعِلُنْ - فَعِلُنْ - مُسْتَفْعِلُنْ - فَعِلُنْ — مُتَفْعِلُنْ - فَاعِلُنْ - مُسْتَفْعِلُنْ - فَعْلُنْ',
						meterName: 'البحر البسيط التام (زحاف الخبن في فَعِلُنْ ومُتَفْعِلُنْ، وعلة القطع في الضرب فَعْلُنْ)'
					},
					quizEasyTarget: 'إذا في: خرجتُ فإذا الفجرُ مشرقٌ',
					quizEasyCorrect: 'حرف مفاجأة مبني على السكون لا محل له من الإعراب',
					quizMediumCorrect: 'جملة فعلية في محل نصب مفعول به ثانٍ للفعل وجد',
					quizHardCorrect: 'البحر البسيط التام مع زحاف الخبن وعلة القطع في الضرب'
				},
				{
					contextSentence: 'إِذَا [[المَرْءُ]] صَبَرَ نَالَ العُلَا، وَأَعْلَمْتُ الطَّالِبَ العِلْمَ نَافِعاً، وَرَأَيْتُ الحَقَّ ((يَسْطَعُ نُورُهُ)).',
					irabRows: [
						{
							target: 'المَرْءُ',
							irab: 'فاعل لفعل محذوف يفسره المذكور بعده «صبر» مرفوع وعلامة رفعه الضمة الظاهرة.',
							mark: '1'
						},
						{
							target: 'نَافِعاً',
							irab: 'مفعول به ثالث منصوب وعلامة نصبه الفتحة الظاهرة (للفعل «أعلم» المتعدي إلى ثلاثة مفاعيل).',
							mark: '0.5'
						},
						{
							target: '((يَسْطَعُ نُورُهُ))',
							irab: 'جملة فعلية في محل نصب حال (أو مفعول به ثانٍ إن كانت الرؤية قلبية).',
							mark: '1'
						}
					],
					balaghaExpr: '«يَدُ الجَوْرِ تَسْطُو عَلَى الضُّعَفَاءِ»',
					balaghaAnswer:
						'استعارة مكنية حيث شبّه الجور (الظلم) بإنسان ظالم له يد تسطو، وحذف المشبه به وأبقى على لازمته «يد / تسطو»؛ وأثرها تجسيد بشاعة الظلم وتشخيصه.',
					arud: {
						verseSadr: 'إِذَا المَرْءُ لَمْ يَدْفَعْ يَدَ الجَوْرِ إِنْ سَطَتْ',
						verseAjuz: 'عَلَيْهِ فَلَا يَأْسَفْ إِذَا ضَاعَ مَجْدُهُ',
						arudWriting: 'إِذَلْمَرْ - ءُلَمْيَدْفَعْ - يَدَلْجَوْ - رِإِنْسَطَتْ — عَلَيْهِ - فَلَايَأْسَفْ - إِذَاضَا - عَمَجْدُهُو',
						symbols: '||0|0 - ||0|0|0 - ||0|0 - ||0||0 — ||0| - ||0|0|0 - ||0|0 - ||0||0',
						tafilat: 'فَعُولُنْ - مَفَاعِيلُنْ - فَعُولُنْ - مَفَاعِلُنْ — فَعُولُ - مَفَاعِيلُنْ - فَعُولُنْ - مَفَاعِلُنْ',
						meterName: 'البحر الطويل التام (زحاف القبض في فَعُولُ ومَفَاعِلُنْ)'
					},
					quizEasyTarget: 'المرءُ في: إذا المرءُ صبرَ',
					quizEasyCorrect: 'فاعل مرفوع لفعل محذوف يفسره المذكور بعده',
					quizMediumCorrect: 'جملة فعلية في محل نصب حال (أو مفعول به ثانٍ للرؤية القلبية)',
					quizHardCorrect: 'البحر الطويل التام مع زحاف القبض في فعولُ ومفاعلن'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'مفعول به منصوب بالفتحة الظاهرة', diagnosticFeedback: 'تأكد من الموقع الإعرابي للكلمة بعد الأداة.' },
						{ text: 'تمييز منصوب بالفتحة الظاهرة', diagnosticFeedback: 'الكلمة ليست اسماً نكرة جامداً مزيلاً لإبهام.' },
						{ text: 'خبر مرفوع وعلامة رفعه الضمة', diagnosticFeedback: 'راجع قاعدة ما يقع بعد «إذا» و«لولا» بدقة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الإعراب الصحيح لـ (${chosen.quizEasyTarget}) في سياق الجملة: «${chosen.contextSentence.replace(/\[\[|\]\]|\(\(|\)\)/g, '')}»؟`,
					questionTextAr: 'اختر الإعراب النموذجي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإعراب الصحيح هو: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'جملة صلة الموصول لا محل لها من الإعراب', diagnosticFeedback: 'لم تُسبق الجملة باسم موصول.' },
						{ text: 'جملة ابتدائية لا محل لها من الإعراب', diagnosticFeedback: 'الجملة واقعة داخل تركيب نحوي له محل إعرابي.' },
						{ text: 'جملة جواب قسم لا محل لها من الإعراب', diagnosticFeedback: 'لا يوجد قسم قبل هذه الجملة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما المحل الإعرابي للجملة الواقعة بين قوسين في: «${chosen.contextSentence.replace(/\[\[|\]\]/g, '')}»؟`,
					questionTextAr: 'حدد المحل الإعرابي الصحيح للجملة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المحل الإعرابي الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'البحر المتقارب الصافي بتفعيلة فعولن أربعاً', diagnosticFeedback: 'قطّع البيت عروضياً وتحقق من توالي التفعيلات.' },
						{ text: 'البحر الرمل التام بتفعيلة فاعلاتن ثلاثاً', diagnosticFeedback: 'الرموز العروضية لا تطابق تفعيلة فاعلاتن.' },
						{ text: 'شعر التفعيلة الحر غير المرتبط بنظام الشطرين', diagnosticFeedback: 'البيت عمودي من شطرين على بحر خليلي تام.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند تقطيع البيت: «${chosen.arud.verseSadr} ... ${chosen.arud.verseAjuz}»، ما بحره الشعري وما التغيير العروضي الظاهر فيه؟`,
					questionTextAr: 'حدد البحر الشعري والتغيير العروضي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفعيلات هي: ${chosen.arud.tafilat}، والبحر هو: ${chosen.arud.meterName}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي الآتية (إعراب، بلاغة، وعروض) بدقة منهجية:',
				content: [
					{
						type: 'text',
						content: `1) تأمل الجملة الآتية ثم أعرب المفردات والجمل المطلوبة في الجدول: «${chosen.contextSentence.replace(/\[\[/g, '').replace(/\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: `2) اشرح الصورة البيانية الواردة في العبارة الآتية وبيّن نوعها وأثرها البلاغي: ${chosen.balaghaExpr}.`,
						answer: `2) ${chosen.balaghaAnswer}`,
						mark: '1.5'
					},
					buildArudScansionBlock({
						...chosen.arud,
						mark: '2'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'grammar_irab',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'راجع قاعدة الاسم بعد «لولا» (مبتدأ خبره محذوف) والاسم بعد «إذا» (فاعل لفعل محذوف يفسره المذكور).',
					'في البلاغة: حدد نوع الصورة (تشبيه أو استعارة) ثم اشرح أركانها ثم اذكر سر بلاغتها.',
					'في العروض: اكتب ما يُنطق فقط ثم ضع (|) للمتحرك و(0) للساكن لاستخراج التفعيلات والبحر.'
				],
				solutionStepsAr: [
					'إعراب المفردات والجمل وفق السياق النحوي بدقة.',
					`تحليل الصورة البيانية: ${chosen.balaghaAnswer}`,
					`التقطيع العروضي: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC BUILDING (6 pts — Arud + Cohesion + Irab): الزحافات والعلل والاتساق
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t1_lb_balagha_arud_t1',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'prosody_arud',
		titleAr: 'البناء اللغوي (عروض وإعراب واتساق): الزحافات والعلل والإحالة والجمل التي لها محل',
		curriculumLessonId: 'arb_lesson_3as_lp_t1_arud_zihafat_ilal',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sentence: 'مَنَحَ الإِسْلَامُ العَقْلَ ((مَكَانَةً تَسْمُو بِهِ))، إِذْ [[شَرَّعَ]] العِلْمَ فَرِيضَةً، وَإِذَنْ يَرْتَقِيَ الفَرْدُ.',
					irabRows: [
						{
							target: 'إِذْ',
							irab: 'حرف تعليل مبني على السكون لا محل له من الإعراب (بمعنى لأن).',
							mark: '0.75'
						},
						{
							target: '((تَسْمُو بِهِ))',
							irab: 'جملة فعلية في محل نصب نعت للمفعول به الثاني النكرة «مكانةً».',
							mark: '1'
						},
						{
							target: 'يَرْتَقِيَ',
							irab: 'فعل مضارع منصوب بـ «إذن» وعلامة نصبه الفتحة الظاهرة على الياء.',
							mark: '0.75'
						}
					],
					cohesionQ: 'ما نوع الإحالة في الضمير «بِهِ»؟ وما وظيفة الضمائر وأدوات الربط في اتساق النص؟',
					cohesionA:
						'إحالة نصية قبلية تعود على «العقل». وتسهم الإحالة في تجنب التكرار الممل، وربط أجزاء الجملة، وتحقيق الاتساق والانسجام المعنوي.',
					arud: {
						verseSadr: 'اُطْلُبِ العِلْمَ وَلَا تَكْسَلْ فَمَا',
						verseAjuz: 'أَبْعَدَ الخَيْرَ عَلَى أَهْلِ الكَسَلْ',
						arudWriting: 'أُطْلُبِلْعِلْ - مَوَلَاتَكْ - سَلْفَمَا — أَبْعَدَلْخَيْ - رَعَلَى أَهْ - لِلْكَسَلْ',
						symbols: '|0||0|0 - |||0|0 - |0||0 — |0||0|0 - |||0|0 - |0||0',
						tafilat: 'فَاعِلَاتُنْ - فَعِلَاتُنْ - فَاعِلُنْ — فَاعِلَاتُنْ - فَعِلَاتُنْ - فَاعِلُنْ',
						meterName: 'البحر الرمل التام (زحاف الخبن في فَعِلَاتُنْ وعلة الحذف في العروض والضرب فَاعِلُنْ)'
					},
					quizEasyCorrect: 'فَاعِلَاتُنْ (|0||0|0) — بحر الرمل',
					quizMediumCorrect: 'جملة فعلية في محل نصب نعت لأنها وقعت بعد اسم نكرة منصوب',
					quizHardCorrect: 'زحاف الخبن (حذف الثاني الساكن) في فَعِلَاتُنْ وعلة الحذف في فَاعِلُنْ'
				},
				{
					sentence: 'إِنَّ الطَّالِبَ ((يَبْنِي مَجْدَهُ)) بِالصَّبْرِ، وَلَوْ [[تَقَاعَسَ]] لَخَسِرَ ثَمَرَةَ السَّنَةِ، وَيَنْصَحُ[[نِي]] شَيْخِي بِالحِكْمَةِ.',
					irabRows: [
						{
							target: '((يَبْنِي مَجْدَهُ))',
							irab: 'جملة فعلية في محل رفع خبر «إنّ».',
							mark: '1'
						},
						{
							target: 'لَوْ',
							irab: 'حرف امتناع لامتناع (أداة شرط غير جازمة) مبني على السكون لا محل له من الإعراب.',
							mark: '0.75'
						},
						{
							target: 'نِي (في ينصحني)',
							irab: 'النون: نون الوقاية مبنية على الكسر لا محل لها. والياء: ضمير متصل مبني في محل نصب مفعول به.',
							mark: '0.75'
						}
					],
					cohesionQ: 'حدّد عائد الضمير المتصل في «مَجْدَهُ» ونوع الإحالة، وبيّن دورها في بناء النص.',
					cohesionA:
						'يعود الضمير «الهاء» على «الطالب»، وهي إحالة نصية قبلية تحقق الترابط التركيبي وتمنع التكرار وتقوي اتساق المعنى.',
					arud: {
						verseSadr: 'خُلِقْتَ مُبَرَّأً مِنْ كُلِّ عَيْبٍ',
						verseAjuz: 'كَأَنَّكَ قَدْ خُلِقْتَ كَمَا تَشَاءُ',
						arudWriting: 'خُلِقْتَ مُبَرْ - رَأَنْ مِنْ كُلْ - لِ عَيْبِنْ — كَأَنْنَكَ قَدْ - خُلِقْتَ كَمَا - تَشَاءُو',
						symbols: '||0|||0 - ||0|0|0 - ||0|0 — ||0|||0 - ||0|||0 - ||0|0',
						tafilat: 'مُفَاعَلَتُنْ - مُفَاعَلْتُنْ - فَعُولُنْ — مُفَاعَلَتُنْ - مُفَاعَلَتُنْ - فَعُولُنْ',
						meterName: 'البحر الوافر التام (زحاف العصب في مُفَاعَلْتُنْ وعلة القطف في العروض والضرب فَعُولُنْ)'
					},
					quizEasyCorrect: 'مُفَاعَلَتُنْ (||0|||0) — بحر الوافر',
					quizMediumCorrect: 'جملة فعلية في محل رفع خبر إنّ',
					quizHardCorrect: 'زحاف العصب (تسكين الخامس المتحرك) وعلة القطف (فَعُولُنْ)'
				},
				{
					sentence: 'مَنْ يَثْبُتْ عَلَى المَبْدَإِ ((فَهُوَ المُنْتَصِرُ))، وَحَسِبَ الجَاهِلُ الغُرْبَةَ [[سِجْناً]] لِلْأَحْرَارِ.',
					irabRows: [
						{
							target: '((فَهُوَ المُنْتَصِرُ))',
							irab: 'جملة اسمية مقترنة بالفاء في محل جزم جواب الشرط الجازم «مَنْ».',
							mark: '1'
						},
						{
							target: 'سِجْناً',
							irab: 'مفعول به ثانٍ منصوب وعلامة نصبه الفتحة الظاهرة (للفعل «حسب» من أفعال الظن).',
							mark: '0.75'
						},
						{
							target: 'يَثْبُتْ',
							irab: 'فعل مضارع مجزوم (فعل الشرط) وعلامة جزمه السكون الظاهر، والفاعل مستتر تقديره هو.',
							mark: '0.75'
						}
					],
					cohesionQ: 'حدّد نوع الإحالة في الضمير «هُوَ» وبيّن أثرها في تماسك الجملة الشرطية.',
					cohesionA:
						'إحالة نصية قبلية تعود على اسم الشرط «مَنْ»، وتقوم بربط جملة الجواب بجملة الشرط مما يضمن الاتساق الدلالي والتركيبي.',
					arud: {
						verseSadr: 'وَلَرُبَّ عَزْمٍ فِي النُّفُوسِ يَقُودُهَا',
						verseAjuz: 'نَحْوَ العُلَا وَيُضِيءُ دَرْبَ السَّائِرِ',
						arudWriting: 'وَلَرُبْبَعَزْ - مِنْفِنْنُفُو - سِيَقُودُهَا — نَحْوَلْعُلَا - وَيُضِيئُدَرْ - بَسْسَائِرِي',
						symbols: '|||0||0 - |0|0||0 - |||0||0 — |0|0||0 - |||0||0 - |0|0||0',
						tafilat: 'مُتَفَاعِلُنْ - مُتْفَاعِلُنْ - مُتَفَاعِلُنْ — مُتْفَاعِلُنْ - مُتَفَاعِلُنْ - مُتْفَاعِلُنْ',
						meterName: 'البحر الكامل التام (دخل زحاف الإضمار بتسكين الثاني المتحرك: مُتْفَاعِلُنْ)'
					},
					quizEasyCorrect: 'مُتَفَاعِلُنْ (|||0||0) — بحر الكامل',
					quizMediumCorrect: 'جملة اسمية في محل جزم جواب الشرط الجازم لاقترانها بالفاء',
					quizHardCorrect: 'زحاف الإضمار (تسكين الثاني المتحرك من متفاعلن فتصير متْفاعلن)'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'مَفَاعِيلُنْ (||0|0|0) — بحر الهزج', diagnosticFeedback: 'تأكد من تقطيع مطلع البيت ومقارنته برموز التفعيلات.' },
						{ text: 'فَاعِلُنْ (|0||0) — بحر المتدارك', diagnosticFeedback: 'تفعيلات البيت سباعية وليست خماسية متكررة.' },
						{ text: 'فَعُولُنْ (||0|0) — بحر المتقارب', diagnosticFeedback: 'رموز البيت لا تطابق تكرار فعولن أربعاً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما التفعيلة الرئيسة والبحر الشعري للبيت: «${chosen.arud.verseSadr} ... ${chosen.arud.verseAjuz}»؟`,
					questionTextAr: 'اختر التفعيلة والبحر الصحيحين:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `تقطيع البيت يعطي: ${chosen.arud.tafilat}، فهو من ${chosen.arud.meterName}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'جملة اعتراضية لا محل لها من الإعراب', diagnosticFeedback: 'الجملة ركن أساسي أو تابع في المعنى وليست اعتراضية.' },
						{ text: 'جملة تفسيرية لا محل لها من الإعراب', diagnosticFeedback: 'لم تُسبق الجملة بحرف تفسير مثل «أي» أو «أنْ».' },
						{ text: 'جملة صلة الموصول لا محل لها من الإعراب', diagnosticFeedback: 'لا يوجد اسم موصول قبل الجملة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما المحل الإعرابي للجملة بين قوسين في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»؟`,
					questionTextAr: 'حدد المحل الإعرابي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المحل الإعرابي الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'علة التذييل والترفيل فقط دون أي زحاف', diagnosticFeedback: 'التذييل والترفيل من علل الزيادة ولا تنطبق على هذا البيت.' },
						{ text: 'خلل عروضي يخرج البيت عن البحور الخليلية', diagnosticFeedback: 'البيت سليم الوزن تماماً وخاضع لقواعد الخليل.' },
						{ text: 'انتقال البيت إلى شعر التفعيلة الحر', diagnosticFeedback: 'البيت عمودي تام الشطرين ومتساوي التفعيلات.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الزحاف أو العلة العروضية التي طرأت على بيت «${chosen.arud.verseSadr} ... ${chosen.arud.verseAjuz}»؟`,
					questionTextAr: 'اختر التغيير العروضي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفعيلات: ${chosen.arud.tafilat}؛ والتغيير العروضي هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي (قواعد، اتساق، وتقطيع عروضي):',
				content: [
					{
						type: 'text',
						content: `1) أعرب المفردات والجملة المبينة في السياق الآتي: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: `2) ${chosen.cohesionQ}`,
						answer: `2) ${chosen.cohesionA}`,
						mark: '1.5'
					},
					buildArudScansionBlock({
						...chosen.arud,
						mark: '2'
					})
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'prosody_arud',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر الفرق بين الجملة بعد النكرة (نعت) وبعد المعرفة (حال) وجواب الشرط الجازم المقترن بالفاء (في محل جزم).',
					'الإحالة بالضمير إلى اسم سابق تُسمى إحالة نصية قبلية وتمنع التكرار وتحقق الاتساق.',
					'في العروض تحقق من الزحاف في الحشو والعلة في العروض والضرب بعد وضع الرموز (| و0).'
				],
				solutionStepsAr: [
					'إنجاز جدول الإعراب للمفردات والجمل.',
					`تحليل الإحالة والاتساق: ${chosen.cohesionA}`,
					`تقطيع البيت: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. CRITICAL EVALUATION (4 pts — التقييم النقدي): عصر الضعف / ابن خلدون / الإحياء والمنفى
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t1_ce_decline_ihya',
		grade: '3as_lp',
		trimesterId: 't1',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن): عصر الضعف، النثر العلمي المتأدب، ومدرسة الإحياء وشعر المنفى',
		curriculumLessonId: 'arb_lesson_3as_lp_t1_ihya_manfa',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicTitle: 'أدب عصر الضعف: الزهد والمديح النبوي المنضبط',
					quote: '«اتجه كثير من أدباء عصر المماليك والعثمانيين إلى شعر الزهد والمدائح النبوية، غير أن الضعف العام مسّ الابتكار الشعري وطغت عليه الصنعة اللفظية»',
					qPrompt:
						'في فقرة منهجية متماسكة: (أ) اذكر ثلاثة أسباب رئيسة لضعف الشعر في هذا العصر، (ب) بيّن ضوابط المديح النبوي المنضبط ومظاهر التكلف البديعي في عصر الضعف، (جـ) اذكر ثلاثة أعلام في الزهد والمديح المنضبط عبر العصور.',
					modelAnswer:
						'تمهيد (0.5ن): عرفت الحياة الأدبية بعد سقوط بغداد (656هـ) تراجعاً ملحوظاً في الإبداع الشعري.\n1) أسباب الضعف (1ن): سقوط بغداد وإتلاف المكتبات، اضطراب الأوضاع السياسية، غياب تشجيع الحكام للشعر العربي، والانشغال بالجمع والتقليد.\n2) الضابط والخصائص (1.5ن): يقوم المديح النبوي المنضبط على الثناء الصادق على شمائل الرسول صلى الله عليه وسلم واتباع سنته دون غلو أو دعاء لغير الله؛ وقد شاع في عصر الضعف الإكثار من الجناس والطباق والتورية والاقتباس والتقليد الشكلي.\n3) الأعلام والمنهجية (1ن): حسان بن ثابت وكعب بن زهير رضي الله عنهما قدوةً، ابن الوردي في الزهد والحكمة، ومحمد العيد آل خليفة والشيخ أحمد سحنون في الامتداد الجزائري المنضبط.',
					quizEasyCorrect: 'سقوط بغداد وتراجع تشجيع الحكام وطغيان التقليد والصنعة اللفظية',
					quizMediumCorrect: 'الثناء الصادق على الشمائل النبوية ونور الوحي دون غلو ولا استغاثة بغير الله',
					quizHardCorrect: 'حسان بن ثابت وكعب بن زهير رضي الله عنهما وابن الوردي ومحمد العيد آل خليفة'
				},
				{
					topicTitle: 'النثر العلمي المتأدب ومنهج ابن خلدون',
					quote: '«رغم جمود الشعر في عصر الضعف، ازدهرت الحركة الموسوعية وبرز عبد الرحمن بن خلدون في مقدمته رائداً للنثر العلمي المتأدب»',
					qPrompt:
						'حرر فقرة نقدية منظمة تجيب فيها عن: (أ) تعريف النثر العلمي المتأدب والفرق بينه وبين النثر العلمي المحض، (ب) أربع خصائص لمنهج وأسلوب ابن خلدون في المقدمة، (جـ) تعليل ازدهار التأليف الموسوعي في ذلك العصر.',
					modelAnswer:
						'تمهيد (0.5ن): شهد عصر الضعف مفارقة لافتة تمثلت في تراجع الشعر مقابل نهضة التأليف العلمي الموسوعي.\n1) التعريف والفرق (1ن): النثر العلمي المتأدب يعالج قضايا علمية وتاريخية واجتماعية بأسلوب أدبي مشرق غير متكلف، بينما يقتصر النثر العلمي المحض على الحقائق والمصطلحات المجردة الخالية من البيان.\n2) خصائص منهج ابن خلدون (1.5ن): الموضوعية والدقة العلمية، منهج الإجمال ثم التفصيل والتعليل، توظيف المصطلحات الخاصة (العمران، الملكة، العصبية)، والأسلوب المرسل البعيد عن السجع المتكلف.\n3) سبب الازدهار والمنهجية (1ن): خوف العلماء على ضياع التراث الإسلامي بعد النكبات فهبّوا لتصنيف الموسوعات في التاريخ واللغة والاجتماع.',
					quizEasyCorrect: 'معالجة قضايا علمية وتاريخية بأسلوب أدبي مشرق خالٍ من التكلف',
					quizMediumCorrect: 'الإجمال ثم التفصيل والتعليل والموضوعية والبعد عن السجع المتكلف',
					quizHardCorrect: 'خوف العلماء من ضياع التراث الإسلامي بعد سقوط بغداد وحرصهم على جمعه وحفظه'
				},
				{
					topicTitle: 'مدرسة الإحياء وشعر المنفى بين التقليد والتجديد',
					quote: '«مثّل شعر المنفى عند محمود سامي البارودي وأحمد شوقي الجسر الذي أعاد للشعر العربي أصالته العباسية مع صدق التجربة الوطنية والذاتية»',
					qPrompt:
						'حرر تقييماً نقدياً محكماً تتناول فيه: (أ) مفهوم مدرسة الإحياء والبعث وشعر المنفى، (ب) مظاهر التقليد ومظاهر التجديد في قصائد شعر المنفى، (جـ) ذكر أبرز أعلام مدرسة الإحياء وأثرهم في نهضة الشعر الحديث.',
					modelAnswer:
						'تمهيد (0.5ن): انطلقت النهضة الشعرية الحديثة بفضل مدرسة الإحياء التي انتشلت الشعر من جمود عصر الضعف.\n1) المفهوم (1ن): مدرسة الإحياء اتجاه كلاسيكي أعاد للشعر متانته التراثية، وشعر المنفى غرض حديث نظمه شعراء أُبعدوا عن أوطانهم فمزجوا الحنين بالإباء والحكمة.\n2) التقليد والتجديد (1.5ن): ظهر التقليد في وحدة الوزن والقافية التامة، وجزالة القاموس التراثي، والتصريع والمعارضة الشعرية؛ أما التجديد فتجلى في صدق التجربة الذاتية، والهم الوطني التحرري، والتخلص من الزخرف البديعي الفارغ.\n3) الأعلام والمنهجية (1ن): محمود سامي البارودي، أحمد شوقي، حافظ إبراهيم، ومحمد العيد آل خليفة.',
					quizEasyCorrect: 'إحياء ديباجة الشعر العربي الفصيح وإعادته إلى قوته وجزالته الموروثة',
					quizMediumCorrect: 'التقليد في القالب والبحر والمعارضة، والتجديد في صدق المعاناة الذاتية والوطنية',
					quizHardCorrect: 'محمود سامي البارودي وأحمد شوقي وحافظ إبراهيم ومحمد العيد آل خليفة'
				}
			];
			const chosen = rng.pick(pool);

			let quizQuestion: QuizQuestionPayload;
			let finalAnswer: string;
			if (difficulty === 'easy') {
				finalAnswer = chosen.quizEasyCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الدعوة إلى التخلي عن اللغة الفصحى لصالح العامية', diagnosticFeedback: 'لم يدعُ أي من هذه الاتجاهات إلى هجر العربية الفصحى.' },
						{ text: 'اعتماد السطر الشعري الحر وتنوع القوافي', diagnosticFeedback: 'شعر التفعيلة ظهر لاحقاً في منتصف القرن العشرين.' },
						{ text: 'التركيز على الصراع المسرحي والإرشادات الركحية', diagnosticFeedback: 'هذا يخص الفن المسرحي في الفصل الثالث.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في سياق التقييم النقدي حول «${chosen.topicTitle}»، ما الفكرة التأسيسية الأدق؟`,
					questionTextAr: 'اختر الفكرة التأسيسية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الإغراق في الرمز الأسطوري والغموض الفلسفي', diagnosticFeedback: 'الغموض الأسطوري لا يميز أدب الفصل الأول.' },
						{ text: 'الاعتماد المطلق على السرد القصصي والعقدة والحل', diagnosticFeedback: 'العقدة والحل من مقومات القصة القصيرة.' },
						{ text: 'الحياد التام وغياب أي رسالة فكرية أو قيمية', diagnosticFeedback: 'جميع هذه النصوص تحمل رسالة معرفية أو أخلاقية أو وطنية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في تحليل خصائص «${chosen.topicTitle}»، أي عبارة تمثل الحكم النقدي الأصوب؟`,
					questionTextAr: 'اختر الحكم النقدي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الحكم النقدي الدقيق هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'أحمد رضا حوحو والشيخ العربي التبسي فقط', diagnosticFeedback: 'حوحو رائد القصة والتبسي من أعلام المقال الإصلاحي في الفصل الثالث.' },
						{ text: 'إبراهيم طوقان وعبد الرحيم محمود فقط', diagnosticFeedback: 'هما من أبرز شعراء القضية الفلسطينية في الفصل الثاني.' },
						{ text: 'الشيخ مبارك الميلي وأبو القاسم سعد الله فقط', diagnosticFeedback: 'هما من أعلام التاريخ والمقال النقدي والإصلاحي في الفصل الثالث.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي إجابة تمثل التوثيق الدقيق المطلوب في التقييم النقدي لمحور «${chosen.topicTitle}»؟`,
					questionTextAr: 'اختر الإجابة التوثيقية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التوثيق الدقيق لهذا المحور هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'التقييم النقدي',
				points: 4,
				instruction: `السند النقدي: ${chosen.quote}.`,
				content: [
					{
						type: 'text',
						content: `المطلوب: ${chosen.qPrompt}`,
						answer: chosen.modelAnswer,
						mark: '4'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't1',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'قسّم إجابتك إلى: تمهيد قصير، عناصر تحليلية مرقمة، وتمثيل بالأعلام والشواهد، وخاتمة مركزة.',
					'انتبه لكل فعل أمري في السؤال (عرّف، علّل، بيّن، اذكر الأعلام) حتى تستوفي 4/4.',
					'حافظ على سلامة اللغة النحوية والإملائية وتجنب الإطالة المملة.'
				],
				solutionStepsAr: [
					`تأطير الموضوع: ${chosen.topicTitle}.`,
					'تفصيل الأسباب أو الخصائص المطلوبة بوضوح ودقة.',
					'توثيق الإجابة بالأعلام المعتمدين والتمثيل النصي.'
				],
				finalAnswer
			};
		}
	}
];
