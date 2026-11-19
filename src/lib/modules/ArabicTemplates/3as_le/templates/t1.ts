import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
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
 * 3AS BAC Foreign Languages (لغات أجنبية — ARB-LE, coeff 5, 4h00, 10+6+4=20)
 * Parameterized Exam & Quiz Templates — Trimester 1 (4 templates)
 * Roles: intellectual_building (10 pts) + linguistic_building (6 pts) + critical_evaluation (4 pts) + critical_evaluation alt (4 pts)
 */
export const TEMPLATES_3AS_LE_T1: ArabicParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. INTELLECTUAL BUILDING (10 pts): شعر المنفى / المديح المنضبط / النثر العلمي المتأدب
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t1_ib_manfa_khaldun',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري: شعر المنفى والإحياء والزهد والمديح المنضبط (3AS لغات أجنبية)',
		curriculumLessonId: 'arb_lesson_3as_le_t1_ihya_manfa',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'حنين الغريب وإباء النفس في المنفى',
					author: 'محمود سامي البارودي',
					source: 'ديوان البارودي (مدرسة الإحياء)',
					verses: [
						['إِذَا [[المَرْءُ]] لَمْ يَدْفَعْ يَدَ الجَوْرِ إِنْ سَطَتْ', 'عَلَيْهِ فَلَا يَأْسَفْ إِذَا ضَاعَ مَجْدُهُ'],
						['وَمَنْ يَكُ ذَا عَزْمٍ يَسُدْ فِي زَمَانِهِ', 'وَيَبْلُغْ مِنَ العَلْيَاءِ مَا كَانَ ((يَرْتَجِي))'],
						['وَمَا نَالَنِي المَنْفَى بِذُلٍّ وَلَا وَهَنْ', 'وَلَكِنَّ شَوْقِي لِلْحِمَى بَاتَ مُوقَدَا'],
						['أُحِنُّ إِلَى أَرْضِي وَأَهْلِي وَمَوْطِنِي', 'وَلَوْلَا [[اصْطِبَارِي]] ذَابَ قَلْبِي تَوَجُّدَا']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'الجور', meaning: 'الظلم والاعتداء' },
						{ word: 'توجداً', meaning: 'حزناً وشوقاً شديداً' }
					],
					theme: 'الجمع بين الإباء ورفض الظلم في الغربة وبين الشوق الحار إلى الوطن والأهل',
					pattern: 'الوصفي والحجاجي الحكمي',
					indicators: 'أسلوب الشرط والحكمة (إذا المرء، من يكُ)، وتصوير المعاناة والحنين بالعبارات الموحية',
					tendency: 'النزعة الوطنية والذاتية الإبائية (مدرسة الإحياء)',
					summaryModel:
						'يؤكد الشاعر من منفاه أن الحر لا يستسلم للظلم بل يصون مجده بالعزم والثبات، معبراً في الوقت نفسه عن شوقه العميق إلى وطنه وأهله الذي يهونه بالصبر.',
					quizEasyCorrect: 'شعر المنفى والحنين (مدرسة الإحياء والبعث)',
					quizMediumCorrect: 'الجمع بين إباء النفس ورفض الظلم وبين حرارة الشوق للوطن',
					quizHardCorrect: 'محافظة شكلية على التراث مع صدق التجربة الذاتية والوطنية في الغربة'
				},
				{
					title: 'من شعر المديح النبوي المنضبط',
					author: 'حسان بن ثابت وكعب بن زهير رضي الله عنهما (مختارات)',
					source: 'الأدب الإسلامي المنضبط',
					verses: [
						['وَأَحْسَنُ مِنْكَ لَمْ تَرَ قَطُّ [[عَيْنِي]]', 'وَأَجْمَلُ مِنْكَ لَمْ تَلِدِ النِّسَاءُ'],
						['خُلِقْتَ مُبَرَّأً مِنْ كُلِّ عَيْبٍ', 'كَأَنَّكَ ((قَدْ خُلِقْتَ)) كَمَا تَشَاءُ'],
						['إِنَّ الرَّسُولَ لَنُورٌ ((يُسْتَضَاءُ بِهِ))', 'مُهَنَّدٌ مِنْ سُيُوفِ اللَّهِ مَسْلُولُ'],
						['لَوْلَا [[الهُدَى]] المَبْعُوثُ فِينَا رَحْمَةً', 'لَمَا اسْتَقَامَ لِذِي البَصِيرَةِ مَنْهَجُ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'مبرّأً', meaning: 'مطهّراً وسالماً من كل عيب' },
						{ word: 'مهند', meaning: 'سيف قاطع نقي المعدن' }
					],
					theme: 'الثناء الصادق على الشمائل النبوية ونور الهداية المحمدية دون غلو',
					pattern: 'الوصفي',
					indicators: 'النعوت الدالة على الكمال الخلقي (أحسن، أجمل، مبرأ، نور، مهند) والصور التشبيهية',
					tendency: 'النزعة الدينية الإسلامية المنضبطة على منهج أهل السنة',
					summaryModel:
						'يشيد السند بكمال خلق النبي صلى الله عليه وسلم وجمال شمائله، ويبرز أن رسالته نور إلهي يهدي العقول والقلوب إلى الحق والاستقامة.',
					quizEasyCorrect: 'شعر المديح النبوي المنضبط الخالي من الغلو',
					quizMediumCorrect: 'الثناء على الشمائل النبوية ونور الهداية في إطار التوحيد الصافي',
					quizHardCorrect: 'صفاء العاطفة وسلامة اللفظ والابتعاد عن التكلف والغلو المذموم'
				},
				{
					title: 'من شعر الزهد والحكمة وطلب العلم',
					author: 'زين الدين ابن الوردي',
					source: 'لامية ابن الوردي (مختارات منضبطة)',
					verses: [
						['اُطْلُبِ [[العِلْمَ]] وَلَا تَكْسَلْ فَمَا', 'أَبْعَدَ الخَيْرَ عَلَى أَهْلِ الكَسَلْ'],
						['اهْجُرِ النَّوْمَ وَحَصِّلْهُ فَمَنْ', '((يَعْرِفِ المَطْلُوبَ)) يَحْقِرْ مَا بَذَلْ'],
						['لَا تَقُلْ قَدْ ذَهَبَتْ أَرْبَابُهُ', 'كُلُّ مَنْ سَارَ عَلَى الدَّرْبِ وَصَلْ'],
						['وَاتَّقِ اللهَ فَتَقْوَى اللهِ مَا', 'جَاوَرَتْ قَلْبَ امْرِئٍ إِلَّا وَصَلْ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'أربابه', meaning: 'علماؤه المتقدمون' },
						{ word: 'يحقر ما بذل', meaning: 'يرى تعبه هيناً أمام شرف الغاية' }
					],
					theme: 'الحث على طلب العلم والمثابرة وهجر الكسل والتحلي بتقوى الله',
					pattern: 'الإيعازي التوجيهي (الوعظي)',
					indicators: 'أفعال الأمر والنهي المتتابعة (اطلب، لا تكسل، اهجر، حصله، لا تقل، اتق) والحكمة التعليلية',
					tendency: 'النزعة الدينية الإصلاحية الوعظية',
					summaryModel:
						'يحث الشاعر طالب العلم على الجد والصبر وهجر التراخي واليأس، مبيناً أن النجاح ثمرة الاجتهاد الصادق المقترن بتقوى الله.',
					quizEasyCorrect: 'شعر الزهد والحكمة الوعظية',
					quizMediumCorrect: 'النمط الإيعازي الوعظي لكثرة أفعال الأمر والنهي والتعليل بالحكمة',
					quizHardCorrect: 'الجمع بين الإقبال الجاد على العلم وبين التقوى والزهد في الكسل والتوافه'
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
						{ text: 'المقال النقدي الصحفي الحديث', diagnosticFeedback: 'النص قصيدة شعرية عمودية وليس مقالاً نثرياً.' },
						{ text: 'القصة القصيرة الاجتماعية', diagnosticFeedback: 'لا توجد شخصيات سردية ولا عقدة وحل.' },
						{ text: 'المسرحية الحوارية ذات المشاهد', diagnosticFeedback: 'النص قصيدة عمودية لا نص مسرحي.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الغرض الشعري لنص «${chosen.title}» (${chosen.author})؟`,
					questionTextAr: 'اختر الغرض الشعري الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `ينتمي النص إلى ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الهجاء السياسي العابر والسخرية المرة', diagnosticFeedback: 'النص يسمو بمعانٍ وطنية أو إيمانية أو حكمية راقية.' },
						{ text: 'النمط الحواري المسرحي لتبادل الأدوار', diagnosticFeedback: 'النص خطاب شعري واحد خالٍ من الحوار المسرحي.' },
						{ text: 'وصف الرحلات البحرية والجغرافية', diagnosticFeedback: 'لا ينتمي النص لأدب الرحلات.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي فكرة أو سمة تعبر بدقة عن مضمون نص «${chosen.title}»؟`,
					questionTextAr: 'اختر الإجابة الأدق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'التخلي عن البحور الخليلية واعتماد السطر الحر', diagnosticFeedback: 'القصيدة عمودية ملتزمة بنظام الشطرين.' },
						{ text: 'الاستسلام التام لليأس والتشكيك في القيم', diagnosticFeedback: 'الأبيات تفيض بالثبات والإيمان والأمل.' },
						{ text: 'الاقتصار على السجع النثري المرسل', diagnosticFeedback: 'النص شعر موزون وليس نثراً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما التقييم الأدبي الأعمق لخصائص نص «${chosen.title}»؟`,
					questionTextAr: 'اختر التقييم الأدبي الأصوب:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التقييم الصحيح: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند الشعري الآتي قراءة واعية ثم أجب عن أسئلة البناء الفكري:',
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
						content: '1) ما الفكرة العامة التي يعالجها النص الشعري؟ وما الغاية التربوية أو الوطنية منه؟',
						answer: `1) يدور النص حول ${chosen.theme}، وغايته ترسيخ القيم السامية والثبات الأخلاقي.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) حدّد النزعة البارزة في الأبيات مع التعليل والاستشهاد بلفظين دالين.',
						answer: `2) النزعة البارزة: ${chosen.tendency}، وتظهر بوضوح من خلال صدق العاطفة وتوظيف المعجم الدال على القيم المذكورة في الأبيات.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) ما النمط الغالب في النص؟ اذكر مؤشرين بارزين له مع التمثيل.',
						answer: `3) النمط الغالب: ${chosen.pattern}، ومن مؤشراته: ${chosen.indicators}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون الأبيات بأسلوبك الخاص محافظاً على الأمانة الفكرية.',
						answer: `4) التلخيص المقترح: ${chosen.summaryModel}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion,
				sujetExercise,
				hints: [
					'تأمل اسم الشاعر ومطلع النص لتحديد الغرض والنزعة بدقة.',
					'استخرج مؤشرات النمط مباشرة من الأفعال والأساليب في الأبيات.',
					'اكتب التلخيص في نحو ثلث الحجم بأسلوبك الشخصي دون نسخ حرفي.'
				],
				solutionStepsAr: [
					`استخراج الفكرة العامة: ${chosen.theme}.`,
					`تحديد النزعة: ${chosen.tendency}.`,
					`بيان النمط (${chosen.pattern}) ومؤشراته.`,
					`تحرير التلخيص: ${chosen.summaryModel}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. LINGUISTIC BUILDING (6 pts): إذا/إذ/لو/لولا + الجمل التي لها محل + المسند والمسند إليه + البلاغة
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t1_lb_irab_musnad_balagha',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'grammar_irab',
		titleAr: 'البناء اللغوي: إذا ولولا والجمل التي لها محل، المسند والمسند إليه، والبلاغة',
		curriculumLessonId: 'arb_lesson_3as_le_t1_qawaid_idha_law_jumal',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sentence: 'لَوْلَا [[التَّعْلِيمُ]] لَضَاعَتِ المَلَكَةُ، وَإِذَا ((صَدَقَتِ النِّيَّةُ)) أَثْمَرَ العَمَلُ، وَالحِكْمَةُ نُورٌ لِلْقَلْبِ.',
					irabRows: [
						{
							target: 'التَّعْلِيمُ',
							irab: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة، وخبره محذوف وجوباً تقديره «موجود» (بعد لولا الامتناعية).',
							mark: '1'
						},
						{
							target: '((صَدَقَتِ النِّيَّةُ))',
							irab: 'جملة فعلية في محل جر مضاف إليه (واقعة بعد الظرف الشرطي «إذا»).',
							mark: '1'
						}
					],
					musnadQ: '2) عيّن المسند والمسند إليه والفضلة في: «أَثْمَرَ العَمَلُ» و«الحِكْمَةُ نُورٌ لِلْقَلْبِ».',
					musnadA:
						'2) في «أثمر العملُ»: الفعل «أثمر» مسند، والفاعل «العملُ» مسند إليه. وفي «الحكمةُ نورٌ للقلبِ»: «الحكمةُ» مسند إليه (مبتدأ)، و«نورٌ» مسند (خبر)، و«للقلبِ» فضلة (جار ومجرور).',
					balaghaQ: '3) اشرح الصورة البيانية في «الحكمةُ نورٌ» وبيّن نوعها وأثرها البلاغي.',
					balaghaA:
						'3) تشبيه بليغ (حُذفت الأداة ووجه الشبه): شبّه الحكمة المعنوية بالنور الحسي؛ وأثره تقوية المعنى وتجسيد قيمة الحكمة في إرشاد الإنسان.',
					quizEasyCorrect: 'مبتدأ مرفوع وخبره محذوف وجوباً تقديره موجود',
					quizMediumCorrect: 'جملة فعلية في محل جر مضاف إليه بعد الظرف إذا',
					quizHardCorrect: '«الحكمةُ» مسند إليه و«نورٌ» مسند و«للقلبِ» فضلة'
				},
				{
					sentence: 'خَرَجْتُ فَ[[إِذَا]] الفَجْرُ سَاطِعٌ، وَشَاهَدْتُ عَالِماً ((يُرْشِدُ النَّاسَ)) بِرِفْقٍ وَبَصِيرَةٍ.',
					irabRows: [
						{
							target: 'إِذَا',
							irab: 'حرف مفاجأة مبني على السكون لا محل له من الإعراب (لوقوعه بعد الفاء قبل جملة اسمية).',
							mark: '1'
						},
						{
							target: '((يُرْشِدُ النَّاسَ))',
							irab: 'جملة فعلية في محل نصب نعت للمفعول به النكرة «عالماً».',
							mark: '1'
						}
					],
					musnadQ: '2) حدّد المسند والمسند إليه والفضلة في الجملتين: «الفَجْرُ سَاطِعٌ» و«شَاهَدْتُ عَالِماً».',
					musnadA:
						'2) في «الفجرُ ساطعٌ»: «الفجرُ» مسند إليه، و«ساطعٌ» مسند. وفي «شاهدتُ عالماً»: الفعل «شاهد» مسند، وتاء الفاعل «تُ» مسند إليه، و«عالماً» فضلة (مفعول به).',
					balaghaQ: '3) اشرح الصورة البيانية في «أَشْرَقَتْ شَمْسُ العِلْمِ فِي القُلُوبِ» وبيّن نوعها وأثرها.',
					balaghaA:
						'3) تشبيه بليغ بإضافة المشبه به إلى المشبه «شمس العلم» (مع استعارة مكنية في إشراق العلم في القلوب)؛ وأثرها تجسيد المعنوي وإبراز أثر العلم في تبديد الجهل.',
					quizEasyCorrect: 'حرف مفاجأة مبني على السكون لا محل له من الإعراب',
					quizMediumCorrect: 'جملة فعلية في محل نصب نعت لأنها وقعت بعد اسم نكرة منصوب',
					quizHardCorrect: 'الفعل «شاهد» مسند، وتاء الفاعل مسند إليه، و«عالماً» فضلة'
				},
				{
					sentence: 'مَنْ يَجْتَهِدْ ((فَسَيَبْلُغُ القِمَّةَ))، وَإِذْ [[صَدَقَ]] المُتَعَلِّمُ رَسَخَتِ المَلَكَةُ فِي ذِهْنِهِ.',
					irabRows: [
						{
							target: 'إِذْ',
							irab: 'ظرف لما مضى من الزمان مبني على السكون في محل نصب مفعول فيه (وهو مضاف إلى الجملة بعده)، أو تعليلية حسب السياق.',
							mark: '1'
						},
						{
							target: '((فَسَيَبْلُغُ القِمَّةَ))',
							irab: 'جملة فعلية مقترنة بالفاء في محل جزم جواب الشرط الجازم «مَنْ».',
							mark: '1'
						}
					],
					musnadQ: '2) حدّد المسند والمسند إليه والفضلة في: «رَسَخَتِ المَلَكَةُ فِي ذِهْنِهِ».',
					musnadA:
						'2) الفعل «رسختْ» مسند، والفاعل «الملكةُ» مسند إليه، والجار والمجرور «في ذهنه» فضلة متممة للمعنى.',
					balaghaQ: '3) بيّن نوع الصورة البيانية في «يَدُ الجَوْرِ تَسْطُو عَلَى الضُّعَفَاءِ» وسر بلاغتها.',
					balaghaA:
						'3) استعارة مكنية: شبّه الجور بإنسان معتدٍ وحذف المشبه به وأبقى على لازمته «يد / تسطو»؛ وأثرها تشخيص الظلم وإبراز قسوته.',
					quizEasyCorrect: 'ظرف لما مضى من الزمان مبني على السكون في محل نصب مفعول فيه',
					quizMediumCorrect: 'جملة فعلية مقترنة بالفاء في محل جزم جواب الشرط الجازم',
					quizHardCorrect: 'الفعل «رسخت» مسند، والفاعل «الملكة» مسند إليه، و«في ذهنه» فضلة'
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
						{ text: 'مفعول به منصوب بالفتحة الظاهرة', diagnosticFeedback: 'راجع إعراب الأدوات (لولا، إذا الفجائية، إذ) بدقة.' },
						{ text: 'خبر مقدم مرفوع بالضمة', diagnosticFeedback: 'الموقع الإعرابي هنا ليس خبراً مقدماً.' },
						{ text: 'تمييز منصوب بالفتحة الظاهرة', diagnosticFeedback: 'الكلمة ليست تمييزاً منصوباً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في الجملة: «${chosen.sentence.replace(/\[\[|\]\]|\(\(|\)\)/g, '')}»، ما الإعراب الصحيح للكلمة المسطرة «${chosen.irabRows[0].target}»؟`,
					questionTextAr: 'اختر الإعراب النموذجي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإعراب الصحيح: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'جملة ابتدائية لا محل لها من الإعراب', diagnosticFeedback: 'الجملة واقعة في موضع إعرابي يؤوّل بمفرد.' },
						{ text: 'جملة صلة الموصول لا محل لها من الإعراب', diagnosticFeedback: 'لا يوجد اسم موصول يسبق الجملة.' },
						{ text: 'جملة اعتراضية لا محل لها من الإعراب', diagnosticFeedback: 'الجملة ليست اعتراضية بين ركنين متلازمين.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما المحل الإعرابي للجملة بين قوسين في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»؟`,
					questionTextAr: 'حدد المحل الإعرابي الصحيح للجملة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المحل الإعرابي هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الفعل والخبر يُعربان دائماً مسنداً إليهما', diagnosticFeedback: 'عكست القاعدة: الفعل والخبر هما المسند، والفاعل والمبتدأ هما المسند إليه.' },
						{ text: 'الجار والمجرور والمفعول به هما ركنا الإسناد الأساسيان', diagnosticFeedback: 'الجار والمجرور والمفعول به من الفضلات لا من ركني الإسناد.' },
						{ text: 'لا يوجد مسند إليه في الجملة الفعلية', diagnosticFeedback: 'في الجملة الفعلية يكون الفاعل أو نائب الفاعل هو المسند إليه.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أي تحليل إسنادي (المسند والمسند إليه والفضلة) يُعد صحيحاً مما يلي؟',
					questionTextAr: 'اختر التحليل الإسنادي الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${chosen.musnadA}`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي الآتية بدقة وإتقان:',
				content: [
					{
						type: 'text',
						content: `1) أعرب الكلمة المسطرة والجملة الواقعة بين قوسين في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: chosen.musnadQ,
						answer: chosen.musnadA,
						mark: '2'
					},
					{
						type: 'text',
						content: chosen.balaghaQ,
						answer: chosen.balaghaA,
						mark: '2'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'grammar_irab',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'تحقق دائماً من نوع «إذا» (ظرفية شرطية أم فجائية) ومن الاسم بعد «لولا» (مبتدأ خبره محذوف وجوباً).',
					'في الإسناد: الفاعل والمبتدأ = مسند إليه؛ الفعل والخبر = مسند؛ المفعول به والجار والمجرور = فضلة.',
					'في البلاغة اذكر نوع الصورة + الشرح + الأثر في المعنى لتضمن العلامة الكاملة.'
				],
				solutionStepsAr: [
					'إعراب المفردة والجملة في الجدول النموذجي.',
					`تحديد أركان الإسناد: ${chosen.musnadA}`,
					`تحليل الصورة البيانية: ${chosen.balaghaA}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. CRITICAL EVALUATION (4 pts — Primary): عصر الضعف والنثر العلمي المتأدب لابن خلدون
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t1_ce_decline_nathr',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن — أساسي): أدب عصر الضعف والنثر العلمي المتأدب لابن خلدون',
		curriculumLessonId: 'arb_lesson_3as_le_t1_madaeh_zuhd_khaldun',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					quote: '«ازدهر النثر العلمي المتأدب في عصر الضعف ليحفظ تراث الأمة، وتصدّر عبد الرحمن بن خلدون هذا الميدان بمنهجه العلمي المتوازن»',
					prompt:
						'حرر فقرة نقدية منهجية تجيب فيها عن: (أ) تعريف النثر العلمي المتأدب والتمييز بينه وبين النثر العلمي المحض، (ب) سبب ازدهار التأليف الموسوعي في عصر الضعف، (جـ) أربع خصائص لمنهج وأسلوب ابن خلدون في المقدمة.',
					answer:
						'تمهيد (0.5ن): عرفت الثقافة العربية في عصر الضعف نشاطاً موسوعياً لافتاً رغم ركود الشعر.\n1) التعريف والتمييز (1ن): النثر العلمي المتأدب يعرض قضايا التاريخ والاجتماع والتربية بأسلوب أدبي مشرق غير متكلف، بينما يقتصر النثر العلمي المحض على الحقائق والمصطلحات المجردة الخالية من البيان.\n2) سبب الازدهار (1ن): خوف العلماء على ضياع التراث بعد سقوط بغداد (656هـ) فاجتهدوا في جمع المعارف وتصنيفها.\n3) خصائص منهج ابن خلدون والمنهجية (1.5ن): الموضوعية، منهج الإجمال ثم التفصيل والتعليل، توظيف المصطلحات الدقيقة (العمران، الملكة)، والبعد عن السجع المتكلف.',
					quizEasyCorrect: 'معالجة قضايا علمية وتاريخية بأسلوب أدبي مشرق غير متكلف',
					quizMediumCorrect: 'الإجمال ثم التفصيل والتعليل والموضوعية والبعد عن السجع المتكلف',
					quizHardCorrect: 'حرص العلماء على جمع التراث الإسلامي وحفظه من الضياع بعد سقوط بغداد'
				},
				{
					quote: '«اتجه الشعر في عصر الضعف نحو الزهد والمدائح النبوية، فغلب عليه التقليد والزخرف اللفظي إلا ما سلم من الغلو والتكلف»',
					prompt:
						'في فقرة نقدية مركزة: (أ) اذكر ثلاثة أسباب لضعف الشعر في عصر الانحطاط، (ب) بيّن ضوابط المديح النبوي المنضبط على هدي الصحابة، (جـ) حدّد أبرز خصائص شعر الزهد والحكمة مع ذكر مثالين من الأعلام.',
					answer:
						'تمهيد (0.5ن): مرّ الشعر العربي بعد سقوط بغداد بمرحلة ركود وتقليد عُرفت بعصر الضعف.\n1) أسباب الضعف (1ن): سقوط بغداد وإتلاف المكتبات، غياب رعاية الحكام للغة العربية، وتراجع الابتكار لصالح الصنعة البديعية.\n2) ضوابط المديح النبوي المنضبط (1.5ن): الثناء على أخلاق النبي صلى الله عليه وسلم ونور الوحي والدعوة لاتباع سنته مع نقاء التوحيد والبعد عن الغلو والاستغاثة بغير الله، اقتداءً بحسان بن ثابت وكعب بن زهير رضي الله عنهما.\n3) خصائص الزهد والأعلام (1ن): الوعظ المباشر، الحكمة، الإكثار من الأمر والنهي والاقتباس، كما في لامية ابن الوردي وامتداده النقي عند محمد العيد آل خليفة.',
					quizEasyCorrect: 'سقوط بغداد وتراجع رعاية الحكام وطغيان التقليد والصنعة البديعية',
					quizMediumCorrect: 'تعظيم الشمائل النبوية واتباع السنة مع صيانة التوحيد من الغلو',
					quizHardCorrect: 'حسان بن ثابت وكعب بن زهير رضي الله عنهما وابن الوردي ومحمد العيد آل خليفة'
				},
				{
					quote: '«يمثل النمط التفسيري في نصوص ابن خلدون أداة علمية دقيقة تختلف عن الطابع الوعظي في شعر عصر الضعف»',
					prompt:
						'اكتب فقرة نقدية مقارنة تبيّن فيها: (أ) خصائص النمط التفسيري عند ابن خلدون، (ب) خصائص النمط الإيعازي والوصفي في شعر الزهد والمديح، (جـ) أثر كل فن في حفظ الهوية واللغة خلال عصر الضعف.',
					answer:
						'تمهيد (0.5ن): تنوعت أساليب الكتابة في عصر الضعف بين النثر الموسوعي التحليلي والشعر الوعظي.\n1) النمط التفسيري عند ابن خلدون (1.5ن): يقوم على الإجمال ثم التفصيل، التعليل المنطقي، المصطلحات التربوية والاجتماعية، والموضوعية.\n2) النمط الوعظي والوصفي في الشعر (1ن): يقوم على الأمر والنهي والنداء في الزهد، والنعوت والصور والاقتباس في المديح النبوي.\n3) الأثر الثقافي والمنهجية (1ن): أسهم كلاهما في حفظ اللغة العربية الفصحى والقيم الأخلاقية والعلوم التراثية حتى قيام النهضة الحديثة.',
					quizEasyCorrect: 'الإجمال ثم التفصيل والتعليل والمصطلح العلمي والموضوعية',
					quizMediumCorrect: 'الأمر والنهي والحكمة في الزهد، والنعوت والاقتباس في المديح',
					quizHardCorrect: 'حفظ الفصحى والتراث العلمي والقيم الأخلاقية حتى مطلع النهضة الحديثة'
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
						{ text: 'السطر الشعري الحر وتكرار تفعيلة واحدة', diagnosticFeedback: 'هذا يخص شعر التفعيلة المعاصر لا أدب عصر الضعف.' },
						{ text: 'الحوار الركحي والصراع المسرحي', diagnosticFeedback: 'هذا يخص المسرح الحديث في الفصل الثالث.' },
						{ text: 'الصحافة اليومية والمقال السياسي القصير', diagnosticFeedback: 'المقال الصحفي فن حديث لم يكن معروفاً في عصر الضعف.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `انطلاقاً من السند النقدي: ${chosen.quote}، ما الفكرة التأسيسية الأدق؟`,
					questionTextAr: 'اختر الفكرة الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'التخلي عن الفصحى وكتابة النصوص بالعامية', diagnosticFeedback: 'حافظ أدباء العصر على العربية الفصحى.' },
						{ text: 'الوحدة العضوية الحديثة والرمز الأسطوري', diagnosticFeedback: 'الوحدة العضوية والرمز من خصائص الشعر المعاصر.' },
						{ text: 'الغياب التام للتعليل والمنهج العلمي', diagnosticFeedback: 'منهج ابن خلدون قائم أساساً على التعليل والموضوعية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أي خاصية نقدية مطلوبة في عرض هذا التقييم النقدي؟',
					questionTextAr: 'اختر الخاصية النقدية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الخاصية الصحيحة: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'مفدي زكرياء وعبد الرحيم محمود فقط', diagnosticFeedback: 'هما من أعلام شعر الالتزام في الفصل الثاني.' },
						{ text: 'أحمد رضا حوحو وأبو القاسم سعد الله فقط', diagnosticFeedback: 'هما من أعلام القصة والمقال النقدي الحديث في الفصل الثالث.' },
						{ text: 'ظهور البث الإذاعي والطباعة الحديثة سنة 656 هـ', diagnosticFeedback: 'الطباعة الحديثة ظهرت بعد قرون طويلة من عصر الضعف.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما التعليل أو التوثيق الختامي الأصوب لهذا التقييم النقدي؟',
					questionTextAr: 'اختر الإجابة الختامية الأدق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التوثيق الدقيق: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'التقييم النقدي',
				points: 4,
				instruction: `السند النقدي: ${chosen.quote}.`,
				content: [
					{
						type: 'text',
						content: `المطلوب: ${chosen.prompt}`,
						answer: chosen.answer,
						mark: '4'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'رتب إجابتك في عناصر واضحة توافق المطالب (أ، ب، جـ) مع تمهيد وجيز وخاتمة.',
					'فرّق بدقة بين واقع الشعر في عصر الضعف وبين نهضة التأليف الموسوعي في النثر العلمي المتأدب.',
					'اذكر الأعلام المعتمدين وتجنب الإطالة الخارجة عن المطلوب.'
				],
				solutionStepsAr: [
					'تأطير عصر الضعف والانحطاط تاريخياً وأدبياً.',
					'تحديد الخصائص والأسباب والضوابط المطلوبة.',
					'توثيق الإجابة بالأعلام والمنهجية السليمة.'
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. CRITICAL EVALUATION (4 pts — Alt): مدرسة الإحياء وشعر المنفى
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_le_t1_ce_ihya_manfa_alt',
		grade: '3as_le',
		trimesterId: 't1',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن — بديل): مدرسة الإحياء والبعث وخصائص شعر المنفى',
		curriculumLessonId: 'arb_lesson_3as_le_t1_critical_eval_method',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					quote: '«نهضت مدرسة الإحياء والبعث بالشعر العربي الحديث، فكان شعر المنفى أصدق تعبير عن الجمع بين الأصالة التراثية وصدق التجربة الوطنية»',
					prompt:
						'حرر فقرة نقدية منظمة تجيب فيها عن: (أ) تعريف مدرسة الإحياء وشعر المنفى، (ب) مظاهر التقليد ومظاهر التجديد في قصائد المنفى، (جـ) ذكر أربعة من أبرز أعلام مدرسة الإحياء.',
					answer:
						'تمهيد (0.5ن): مثّلت مدرسة الإحياء الانطلاقة الحقيقية لنهضة الشعر العربي الحديث بعد ركود عصر الضعف.\n1) التعريف (1ن): الإحياء والبعث اتجاه كلاسيكي أعاد للشعر ديباجته العباسية القوية، وشعر المنفى غرض حديث يعبر عن معاناة الشاعر المبعد عن وطنه وحنينه وثباته.\n2) التقليد والتجديد (1.5ن): التقليد في وحدة الوزن والقافية، التصريع، جزالة الألفاظ، والمعارضة الشعرية؛ والتجديد في صدق العاطفة الذاتية، الهم الوطني، والتحرر من التكلف البديعي.\n3) الأعلام والمنهجية (1ن): محمود سامي البارودي، أحمد شوقي، حافظ إبراهيم، ومحمد العيد آل خليفة.',
					quizEasyCorrect: 'إعادة متانة الشعر العربي التراثي مع التعبير الصادق عن قضايا العصر',
					quizMediumCorrect: 'التقليد في البنية العمودية والمعارضة، والتجديد في صدق التجربة الوطنية والذاتية',
					quizHardCorrect: 'محمود سامي البارودي وأحمد شوقي وحافظ إبراهيم ومحمد العيد آل خليفة'
				},
				{
					quote: '«تُعد المعارضة الشعرية من أبرز السمات الفنية التي طبعت قصائد شعراء المنفى في مدرسة الإحياء»',
					prompt:
						'في فقرة نقدية محكمة: (أ) عرّف المعارضة الشعرية وبيّن دافع الإحيائيين إليها، (ب) أبرز العواطف والموضوعات الغالبة في شعر المنفى، (جـ) وضّح كيف أسهمت مدرسة الإحياء في تمهيد الطريق للتجديد الشعري اللاحق.',
					answer:
						'تمهيد (0.5ن): ارتبط شعراء الإحياء بقمم التراث العربي ليبرهنوا على قدرة الفصحى على النهوض مجدداً.\n1) المعارضة الشعرية ودافعها (1.5ن): هي نظم قصيدة على وزن وقافية وموضوع قصيدة قديمة مجاراةً وتنافساً فنياً، ودافعها وصل الحاضر بالماضي المزدهر وإحياء القاموس الفصيح.\n2) عواطف المنفى وموضوعاته (1ن): الحنين الجارف إلى الوطن والأهل، ألم الغربة، الفخر بالإباء والصبر، والحكمة.\n3) أثر المدرسة والمنهجية (1ن): خلّصت الشعر من ركاكة عصر الضعف وفتحت الباب أمام صدق التجربة والشعر الوطني الملتزم.',
					quizEasyCorrect: 'نظم قصيدة على وزن وقافية وموضوع قصيدة تراثية محاكاةً وتنافساً فنياً',
					quizMediumCorrect: 'الحنين للوطن والأهل، ألم الغربة، الاعتزاز بالإباء، والحكمة',
					quizHardCorrect: 'تخليص الشعر من التكلف والركاكة وإعادة صدق العاطفة والهم الوطني'
				},
				{
					quote: '«قارن النقاد بين شعر عصر الضعف وشعر مدرسة الإحياء، فوجدوا بينهما بوناً شاسعاً في صدق التجربة وقوة الأسلوب»',
					prompt:
						'حرر فقرة نقدية مقارنة تبيّن فيها: (أ) وجه الاختلاف بين شعر عصر الضعف وشعر الإحياء من حيث اللغة والعاطفة والبديع، (ب) سبب تسمية مدرسة البارودي بمدرسة الإحياء والبعث، (جـ) مكانة محمد العيد آل خليفة في امتداد الفصاحة الإحيائية بالجزائر.',
					answer:
						'تمهيد (0.5ن): شكلت مدرسة الإحياء نقطة تحول فارقة بين عصر الضعف والعصر الحديث.\n1) المقارنة (1.5ن): في عصر الضعف فترت العاطفة وطغى البديع المتكلف والتقليد الضيق؛ أما في مدرسة الإحياء فقد عادت جزالة اللفظ وقوة التركيب وصدق العاطفة الذاتية والوطنية وتوظيف الصور البيانية لخدمة المعنى.\n2) سبب التسمية (1ن): لأنها بعثت الشعر العربي حياً قوياً بعد قرون من الجمود.\n3) الامتداد الجزائري والمنهجية (1ن): جسد الشاعر محمد العيد آل خليفة في الجزائر قوة الديباجة الفصيحة وسخّرها للإصلاح والوطنية.',
					quizEasyCorrect: 'بعث الشعر العربي حياً قوياً بعد قرون من الضعف والجمود',
					quizMediumCorrect: 'عودة صدق العاطفة وجزالة اللفظ والتخلص من البديع المتكلف',
					quizHardCorrect: 'محمد العيد آل خليفة الذي جمع بين متانة الفصحى والرسالة الإصلاحية الوطنية'
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
						{ text: 'إلغاء الوزن الشعري والقافية في القصيدة الحديثة', diagnosticFeedback: 'مدرسة الإحياء التزمت بالوزن الخليلي والقافية الموحدة.' },
						{ text: 'كتابة المسرحيات النثرية باللهجة الدارجة', diagnosticFeedback: 'مدرسة الإحياء مدرسة شعرية فصيحة.' },
						{ text: 'الاقتصار على النثر العلمي الجغرافي', diagnosticFeedback: 'مدرسة الإحياء حركة شعرية نهضوية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التقييم النقدي البديل حول مدرسة الإحياء: ${chosen.quote}، ما المفهوم الأساسي الصحيح؟`,
					questionTextAr: 'اختر المفهوم الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `المفهوم الدقيق: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'توظيف السطر الشعري الحر وتنويع حرف الروي', diagnosticFeedback: 'تلك من خصائص شعر التفعيلة لا مدرسة الإحياء.' },
						{ text: 'نشر روح التشاؤم المطلق وهجاء الوطن', diagnosticFeedback: 'شعراء المنفى أحبوا أوطانهم وثبتوا على مبادئهم.' },
						{ text: 'التكلف البديعي الفارغ من العاطفة', diagnosticFeedback: 'حاربت مدرسة الإحياء التكلف الفارغ.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'أي تحليل نقدي يوافق خصائص مدرسة الإحياء وشعر المنفى؟',
					questionTextAr: 'اختر التحليل النقدي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'ابن خلدون وابن بطوطة فقط', diagnosticFeedback: 'هما من أعلام النثر والرحلات في القرن الثامن الهجري.' },
						{ text: 'أحمد رضا حوحو وأبو القاسم سعد الله فقط', diagnosticFeedback: 'هما من أعلام القصة والمقال النقدي في الفصل الثالث.' },
						{ text: 'إبراهيم طوقان وعبد الرحيم محمود فقط', diagnosticFeedback: 'هما من شعراء القضية الفلسطينية في الفصل الثاني.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: 'ما التوثيق أو الاستنتاج النقدي الأدق لختام هذه الإجابة؟',
					questionTextAr: 'اختر الإجابة الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'التقييم النقدي',
				points: 4,
				instruction: `السند النقدي: ${chosen.quote}.`,
				content: [
					{
						type: 'text',
						content: `المطلوب: ${chosen.prompt}`,
						answer: chosen.answer,
						mark: '4'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_le',
				trimesterId: 't1',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'وازن دائماً في تقييم مدرسة الإحياء بين الأصالة الشكلية وصدق التجربة الحديثة.',
					'اشرح مصطلح «المعارضة الشعرية» بدقة إن ورد في المطلوب.',
					'اختم بذكر أبرز أعلام المدرسة (البارودي، شوقي، حافظ، وآل خليفة).'
				],
				solutionStepsAr: [
					'تأطير مدرسة الإحياء وشعر المنفى.',
					'بيان مظاهر التقليد والتجديد أو المقارنة المطلوبة.',
					'توثيق الإجابة بالأعلام وخاتمة مركزة.'
				],
				finalAnswer
			};
		}
	}
];
