import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildArudScansionBlock,
	buildIrabTableBlock,
	buildPoetryPassageBlock
} from '../../arabic-helpers';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty,
	QuizQuestionPayload
} from '../../types';

/**
 * 3AS BAC Literature & Philosophy (آداب وفلسفة — ARB-LP, coeff 6, 10+6+4=20)
 * Parameterized Exam & Quiz Templates — Trimester 2 (5 templates)
 * Roles: 2 intellectual_building (10 pts) + 2 linguistic_building (6 pts with العروض/التفعيلة) + 1 critical_evaluation (4 pts)
 */
export const TEMPLATES_3AS_LP_T2: ArabicParameterizedTemplate[] = [
	// ─────────────────────────────────────────────────────────────────────────
	// 1. INTELLECTUAL BUILDING (10 pts — Poetry): شعر الالتزام والثورة الجزائرية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t2_ib_algeria_iltizam',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري (شعر): شعر الالتزام والثورة التحريرية الجزائرية',
		curriculumLessonId: 'arb_lesson_3as_lp_t2_iltizam_algeria',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'من وحي الإلياذة الجزائرية وملاحم نوفمبر',
					author: 'الشاعر مفدي زكرياء رحمه الله',
					source: 'ديوان اللهب المقدس والإلياذة الجزائرية (مختارات)',
					verses: [
						['جَزَائِرُ يَا مَطْلَعَ [[المُعْجِزَاتْ]]', 'وَيَا حُجَّةَ اللهِ فِي الكَائِنَاتْ'],
						['وَيَا قِصَّةً ((خَطَّهَا بِالدِّمَاءِ))', 'شَهِيدٌ تَسَامَى عَلَى العَادِيَاتْ'],
						['بِحَقِّ الشَّهِيدِ وَصَوْتِ الوَطَنْ', 'نَصُونُ العُهُودَ وَنَبْنِي الزَّمَنْ'],
						['وَنَمْضِي إِلَى المَجْدِ عَزْماً [[قَوِيّاً]]', 'فَأَوْرَاسُ يَشْهَدُ أَنَّا الوُفَاةُ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'العاديات', meaning: 'نوائب الدهر وقوى العدوان' },
						{ word: 'أوراس', meaning: 'جبل الأوراس الأشم رمز انطلاق الثورة الجزائرية' }
					],
					theme: 'تمجيد الجزائر وثورة نوفمبر وتخليد تضحيات الشهداء وتجديد العهد بالوفاء للوطن',
					tendency: 'النزعة الوطنية الثورية التحررية الممتزجة بالنزعة الدينية',
					values: 'قيمة تاريخية (تخليد ملاحم الثورة والأوراس)، قيمة سياسية (رفض الاستعمار والتمسك بالسيادة)، وقيمة إنسانية (حق الشعوب في الحرية)',
					summaryModel:
						'يمجد الشاعر وطنه الجزائر وتضحيات شهداء نوفمبر الذين صنعوا بدمائهم ملحمة الحرية، مؤكداً عزم الشعب على الوفاء للعهد ومواصلة البناء.',
					quizEasyCorrect: 'النزعة الوطنية الثورية التحررية',
					quizMediumCorrect: 'الالتزام بقضية الوطن وتوظيف ضمير الجمع ورمز الأوراس والشهيد',
					quizHardCorrect: 'قيمة تاريخية وسياسية تحررية وإنسانية تمجد الفداء والسيادة'
				},
				{
					title: 'صيحة الإصلاح والنهوض الوطني',
					author: 'الشاعر محمد العيد آل خليفة رحمه الله',
					source: 'ديوان محمد العيد آل خليفة (بتصرف تربوي)',
					verses: [
						['بَنِي وَطَنِي هُبُّوا لِطَلَبِ [[العُلَا]]', 'فَمَا نَالَ مَجْداً مَنْ أَقَامَ عَلَى الوَهَنْ'],
						['تَآخَوْا عَلَى الإِسْلَامِ وَالعِلْمِ وَالهُدَى', 'فَإِنَّ التَّآخِي ((يَدْفَعُ الضُّرَّ وَالمِحَنْ))'],
						['سَلُوا الأَرْضَ عَنَّا إِذْ ثَبَتْنَا لِغَاصِبٍ', 'فَلَمْ نَنْحَنِ يَوْماً لِظُلْمٍ وَلَا فِتَنْ'],
						['نَصُونُ لِسَانَ الضَّادِ دِيناً وَمَبْدَأً', 'وَنَحْفَظُ [[عَهْداً]] قَدْ أُقِيمَ عَلَى السُّنَنْ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'الوهن', meaning: 'الضعف والتخاذل' },
						{ word: 'لسان الضاد', meaning: 'اللغة العربية الفصيحة' }
					],
					theme: 'استنهاض همم الجزائريين للاتحاد والعلم وصون الهوية العربية الإسلامية ومقاومة الاحتلال',
					tendency: 'النزعة الوطنية الإصلاحية الإسلامية',
					values: 'قيمة دينية (التمسك بالإسلام والسنة)، قيمة تربوية وطنية (الوحدة والعلم وصون اللغة العربية)، وقيمة تحررية (رفض الغاصب)',
					summaryModel:
						'يدعو الشاعر أبناء وطنه إلى التآخي والنهوض بالعلم والدين، مؤكداً صمود الشعب في وجه المستعمر وتمسكه بهويته العربية الإسلامية.',
					quizEasyCorrect: 'النزعة الوطنية الإصلاحية الإسلامية',
					quizMediumCorrect: 'النمط الإيعازي والحجاجي لاستنهاض الهمم بأفعال الأمر والتعليل',
					quizHardCorrect: 'ربط التحرر الوطني بصون العقيدة الإسلامية واللغة العربية والوحدة'
				},
				{
					title: 'في رحاب الشهادة وفجر الحرية',
					author: 'الشيخ أحمد سحنون رحمه الله',
					source: 'ديوان الشيخ أحمد سحنون (مختارات)',
					verses: [
						['أَيَا شُهَدَاءَ الحَقِّ نِلْتُمْ [[كَرَامَةً]]', 'تَظَلُّ مَنَاراً ((يَهْتَدِي بِسَنَاهَا)) الشَّعْبُ'],
						['رَفَعْتُمْ لِوَاءَ النَّصْرِ فَوْقَ جِبَالِنَا', 'فَفَرَّ الظَّلَامُ الجَائِرُ الغَاشِمُ الصَّعْبُ'],
						['وَمَا كَانَ لَيْلُ الِاسْتِعْمَارِ بِدَائِمٍ', 'إِذَا صَدَقَتْ فِي أُمَّةٍ عَزْمَةٌ [[صُلْبُ]]'],
						['فَسِيرُوا عَلَى دَرْبِ الوَفَاءِ لِعَهْدِهِمْ', 'فَبِالصَّبْرِ وَالإِيمَانِ يَنْتَصِرُ الحَقُّ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'سناها', meaning: 'ضوؤها ونورها الساطع' },
						{ word: 'الغاشم', meaning: 'الظالم المعتدي' }
					],
					theme: 'تخليد مناقب الشهداء وتأكيد حتمية زوال الاستعمار بفضل الصبر والإيمان والوفاء للعهد',
					tendency: 'النزعة الوطنية الدينية الثورية',
					values: 'قيمة دينية وأخلاقية (الإيمان والوفاء)، وقيمة وطنية وتاريخية (تخليد الشهداء وحتمية انتصار الحق)',
					summaryModel:
						'يشيد الشاعر بكرامة الشهداء الذين أناروا بتضحياتهم طريق الاستقلال، ويبشر بزوال ليل الاستعمار داعياً الأجيال إلى الوفاء لرسالتهم بالإيمان والعمل.',
					quizEasyCorrect: 'النزعة الوطنية الدينية الثورية',
					quizMediumCorrect: 'المقابلة الرمزية بين نور الشهداء وظلام الاستعمار للتعبير عن الأمل',
					quizHardCorrect: 'الالتزام الإيماني والوطني الذي يربط انتصار الثورة بالصبر والثبات'
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
						{ text: 'النزعة الذاتية التشاؤمية المنعزلة', diagnosticFeedback: 'النص جماعي حماسي متفائل بالنصر لا ذاتي متشائم.' },
						{ text: 'النزعة الهزلية الساخرة', diagnosticFeedback: 'خطاب النص جاد ومهيب يمجد الشهداء والوطن.' },
						{ text: 'النزعة العلمية التقريرية الجافة', diagnosticFeedback: 'الأبيات شعرية حماسية ثورية لا تقريرية علمية.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما النزعة البارزة في أبيات «${chosen.title}» (${chosen.author})؟`,
					questionTextAr: 'اختر النزعة الصحيحة في النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `النزعة البارزة في الأبيات هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'التقليد الآلي للمقدمة الطللية والغزل التقليدي', diagnosticFeedback: 'الأبيات تدخل مباشرة في صلب القضية الوطنية دون مقدمة طللية.' },
						{ text: 'استخدام اللهجة العامية للتقرب من الجمهور', diagnosticFeedback: 'الشاعر يلتزم الفصحى الجزلة الراقية.' },
						{ text: 'الحياد السلبي والابتعاد عن هموم المجتمع', diagnosticFeedback: 'النص في صميم الأدب الملتزم بقضايا الشعب.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما أبرز مظهر فني أو فكري للالتزام في نص «${chosen.title}»؟`,
					questionTextAr: 'اختر مظهر الالتزام الأدق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يتجلى الالتزام بوضوح من خلال: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'قيمة اقتصادية تجارية صرفة', diagnosticFeedback: 'النص يحمل قيماً وطنية وتاريخية ودينية وإنسانية لا تجارية.' },
						{ text: 'قيمة ترفيهية شكلية خالية من الالتزام', diagnosticFeedback: 'شعر الثورة الجزائرية شعر رسالة ونضال لا ترفيه.' },
						{ text: 'قيمة فلسفية عبثية تدعو إلى التشكيك', diagnosticFeedback: 'النص مشبع باليقين الإيماني والثقة بنصر الله.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما القيم الكبرى التي يستخلصها الناقد من نص «${chosen.title}»؟`,
					questionTextAr: 'حدد القيم الصحيحة في الأبيات:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `تتضافر في النص القيم التالية: ${chosen.values}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند الشعري الآتي من شعر الثورة التحريرية الجزائرية، ثم أجب عن أسئلة البناء الفكري:',
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
						content: '1) ما القضية المحورية التي يعالجها الشاعر؟ وما الرسالة التي يوجهها إلى أبناء وطنه؟',
						answer: `1) يعالج الشاعر قضية: ${chosen.theme}، ورسالته الدعوة إلى الوفاء لتضحيات الشهداء والتمسك بالوحدة والهوية والعزم.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) هل يُعد الشاعر ملتزماً؟ علّل إجابتك بمظهرين واضحين من النص.',
						answer: '2) نعم، الشاعر ملتزم التزاماً صادقاً؛ ومن مظاهره: (أ) تسخير قلمه لقضية التحرر الوطني وتمجيد الشهداء، (ب) توظيف ضمير الجماعة «نحن» للتعبير عن وحدة المصير، (جـ) اقتراح سبل النهوض والثبات.',
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) استخرج النزعة البارزة وقيمتين مختلفتين متضمنتين في الأبيات مع الشرح.',
						answer: `3) النزعة: ${chosen.tendency}. القيم: ${chosen.values}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون النص بأسلوبك الخاص مراعياً تقنية التلخيص السليم.',
						answer: `4) التلخيص المقترح: ${chosen.summaryModel}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر مظاهر الالتزام: ضمير الجمع «نحن»، فضح الاستعمار، تمجيد الشهداء، وتوظيف الرموز الثورية.',
					'ميّز بين النزعات (وطنية، ثورية، دينية) وبين القيم (تاريخية، سياسية، دينية، إنسانية).',
					'لخّص الأفكار الأساسية بلغة منسجمة بعيدة عن النقل الحرفي.'
				],
				solutionStepsAr: [
					`تحديد الموضوع والرسالة: ${chosen.theme}.`,
					'إثبات الالتزام بمظهرين نصيين دقيقين.',
					`استخراج النزعة (${chosen.tendency}) والقيم.`,
					`تحرير التلخيص: ${chosen.summaryModel}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 2. INTELLECTUAL BUILDING (10 pts — Poetry): القضية الفلسطينية والنزعة الإنسانية الإسلامية
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t2_ib_palestine_humanitarian',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'reading_comprehension',
		titleAr: 'البناء الفكري (شعر): القضية الفلسطينية والنزعة الإنسانية والتأملية الإسلامية',
		curriculumLessonId: 'arb_lesson_3as_lp_t2_palestine_poetry',
		defaultPoints: 10,
		onecRole: 'intellectual_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					title: 'الفداء في سبيل المسجد الأقصى',
					author: 'الشاعر الشهيد عبد الرحيم محمود',
					source: 'ديوان عبد الرحيم محمود (مختارات)',
					verses: [
						['سَأَحْمِلُ [[رُوحِي]] عَلَى رَاحَتِي', 'وَأُلْقِي بِهَا فِي مَهَاوِي الرَّدَى'],
						['فَإِمَّا حَيَاةٌ ((تَسُرُّ الصَّدِيقَ))', 'وَإِمَّا مَمَاتٌ يَغِيظُ العِدَا'],
						['وَنَفْسُ الشَّرِيفِ لَهَا غَايَتَانِ', 'وُرُودُ المَنَايَا وَنَيْلُ المُنَى'],
						['لَعَمْرُكَ هَذَا [[مَمَاتُ]] الرِّجَالِ', 'وَمَنْ رَامَ مَوْتاً شَرِيفاً فَذَا']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'مهاوي الردى', meaning: 'مواطن الخطر والموت في ساحة الجهاد' },
						{ word: 'رام', meaning: 'طلب وقصد' }
					],
					theme: 'الإقدام والشجاعة والاستعداد للتضحية بالروح دفاعاً عن الأرض المقدسة والكرامة',
					tendency: 'النزعة الوطنية الفلسطينية والتحررية الإبائية',
					pattern: 'الوصفي والحجاجي التحفيزي (تقسيم الخيارات الحاسمة: إما حياة كريمة وإما شهادة)',
					summaryModel:
						'يعلن الشاعر استعداده التام لبذل روحه فداءً لوطنه، مؤكداً أن صاحب النفس الأبية لا يرضى إلا بحياة عزيزة أو شهادة شريفة ترد كيد الأعداء.',
					quizEasyCorrect: 'الإقدام والاستشهاد دفاعاً عن فلسطين والكرامة',
					quizMediumCorrect: 'المقابلة الحاسمة بين الحياة العزيزة والممات الشريف لإظهار صدق الالتزام',
					quizHardCorrect: 'النزعة الوطنية الفلسطينية (لأن الشاعر فلسطيني يدافع عن وطنه) مع النزعة التحررية'
				},
				{
					title: 'صرخة القدس في ضمير الأمة',
					author: 'الشاعر هاشم الرفاعي (وعبد الرحمن العشماوي — نماذج ملتزمة)',
					source: 'من روائع الشعر الإسلامي في قضية فلسطين',
					verses: [
						['يَا قُدْسُ يَا مَسْرَى النَّبِيِّ المُصْطَفَى', 'نَادَيْتِ ((فَانْتَفَضَتْ)) قُلُوبُ الأُمَّةِ'],
						['إِنَّ العَدُوَّ الغَاصِبَ المُحْتَلَّ لَمْ', 'يُطْفِئْ بِبَغْيِهِ شُعْلَةَ الحُرِّيَّةِ'],
						['سَيَظَلُّ أَقْصَانَا [[مَنَاراً]] لِلْهُدَى', 'وَتَعُودُ رَايَتُنَا بِعَزْمِ الوَحْدَةِ'],
						['هَذَا [[الصُّمُودُ]] عَلَى الثَّرَى بُرْهَانُنَا', 'أَنَّ الحُقُوقَ تُصَانُ بِالتَّضْحِيَةِ']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'مسرى النبي', meaning: 'المسجد الأقصى الذي أُسري إليه النبي صلى الله عليه وسلم' },
						{ word: 'الثرى', meaning: 'تراب الأرض المقدسة' }
					],
					theme: 'الدفاع عن قدسية القدس والمسجد الأقصى، والتأكيد على حتمية عودة الحق بالوحدة والتضحية',
					tendency: 'النزعة الدينية الإسلامية والنزعة القومية العربية التحررية',
					pattern: 'الحجاجي الوصفي (استعمال التوكيد بـ «إن»، والنداء التعظيمي، والربط بين الصمود واسترداد الحق)',
					summaryModel:
						'ينادي الشاعر مدينة القدس مؤكداً أن جرائم المحتل لن تطفئ شعلة الحرية، وأن المسجد الأقصى سيبقى مناراً للهدى حتى تعود الراية بوحدة الأمة وصمودها.',
					quizEasyCorrect: 'قدسية المسجد الأقصى وصمود الشعب الفلسطيني حتى النصر',
					quizMediumCorrect: 'النزعة الدينية الإسلامية والنزعة القومية العربية معاً',
					quizHardCorrect: 'ترسيخ اليقين بحتمية انتصار الحق عبر الوحدة والتضحية ورفض الاستسلام'
				},
				{
					title: 'نداء الرحمة والأمل الإنساني',
					author: 'الشاعر محمد العيد آل خليفة والشيخ أحمد سحنون (نموذج تربوي إنساني)',
					source: 'من الشعر الإنساني والتأملي الإسلامي الحديث',
					verses: [
						['قُمْ يَا أَخِي نَزْرَعْ بِأَرْضِ العَالَمِ', 'خَيْراً وَعَدْلاً ((يَمْسَحَانِ الأَلَمَا))'],
						['إِنَّ الحَيَاةَ عَطَاءُ نَفْسٍ حُرَّةٍ', 'تَسْمُو بِإِيمَانٍ وَتَبْنِي [[القِيَمَا]]'],
						['لَا تَيْأَسَنْ إِنْ طَالَ لَيْلُ الغَافِلِ', 'فَالفَجْرُ يَبْسِمُ لِلَّذِي قَدْ أَقْدَمَا'],
						['تِلْكَ [[الطَّبِيعَةُ]] فِي سَنَاهَا آيَةٌ', 'تَهْدِي البَصِيرَ إِلَى العُلَا وَالهِمَمَا']
					] as Array<[string, string]>,
					vocabulary: [
						{ word: 'أقدما', meaning: 'شجع وبادر بالعمل الإيجابي' },
						{ word: 'البصير', meaning: 'صاحب العقل المستنير والتأمل الصادق' }
					],
					theme: 'الدعوة إلى الأخوة الإنسانية والعطاء والتفاؤل الإيماني واستلهام الهمة من التأمل في الطبيعة',
					tendency: 'النزعة الإنسانية والتأملية التفاؤلية الإسلامية',
					pattern: 'الإيعازي والوصفي التأملي (الأمر والنهي التوجيهي مع تشخيص الطبيعة بـ «الفجر يبسم»)',
					summaryModel:
						'يخاطب الشاعر الإنسان داعياً إياه إلى نشر الخير والعدل والعطاء ونبذ اليأس، لأن الفجر يشرق للمبادرين، والكون كله آية تدعو إلى السمو والعمل.',
					quizEasyCorrect: 'الدعوة إلى الأخوة الإنسانية والعطاء والتفاؤل الإيماني',
					quizMediumCorrect: 'النزعة الإنسانية والتأملية المتوازنة وتوظيف الطبيعة الحية',
					quizHardCorrect: 'تحقق الوحدة العضوية وربط التأمل الكوني بالعمل البناء لا بالعزلة واليأس'
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
						{ text: 'وصف الرحلات البحرية والجغرافية في القرون الوسطى', diagnosticFeedback: 'النص شعري وجداني أو ملتزم حديث وليس أدب رحلات.' },
						{ text: 'الهجاء الشخصي والتنافس القبلي القديم', diagnosticFeedback: 'النص يسمو بقيم التضحية أو الأخوة الإنسانية بعيداً عن الهجاء.' },
						{ text: 'شرح قواعد العروض والزحافات نظماً', diagnosticFeedback: 'هذا شعر وجداني ملتزم وليس نظماً تعليمياً.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الفكرة المحورية التي يعبر عنها نص «${chosen.title}» (${chosen.author})؟`,
					questionTextAr: 'اختر الفكرة المحورية الصحيحة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `يدور النص حول: ${chosen.theme}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الإكثار من الألغاز اللفظية والغريب المعجمي كما في عصر الضعف', diagnosticFeedback: 'لغة النص معاصرة مشرقة وموحية خالية من الألغاز.' },
						{ text: 'الاعتماد على الإرشادات المسرحية وتقسيم المشاهد', diagnosticFeedback: 'النص قصيدة شعرية وليس مسرحية.' },
						{ text: 'نشر روح القنوط والانهزام أمام الصعوبات', diagnosticFeedback: 'النص يبث الأمل والثبات والعزة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي سمة فكرية أو فنية تميّز أبيات «${chosen.title}»؟`,
					questionTextAr: 'اختر السمة الأدق في النص:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `السمة الأدق هي: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'تفكك الأبيات وتعدد الأغراض دون رابط نفسي واحد', diagnosticFeedback: 'تسود القصيدة وحدة الموضوع والعاطفة (الوحدة العضوية).' },
						{ text: 'انفصال الشاعر عن قيم أمته وهويتها الإيمانية', diagnosticFeedback: 'الشاعر متجذر في قيمه الدينية والإنسانية والوطنية.' },
						{ text: 'رفض الفصحى واستعمال الألفاظ الأعجمية', diagnosticFeedback: 'النص مكتوب بعربية فصيحة موحية سليمة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما الحكم النقدي الأعمق الذي يصح على نص «${chosen.title}»؟`,
					questionTextAr: 'اختر الحكم النقدي الأصوب:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `النزعة في النص هي ${chosen.tendency}، والحكم الأعمق هو: ${finalAnswer}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء الفكري',
				points: 10,
				instruction: 'اقرأ السند الشعري الآتي قراءة متفحصة ثم أجب عن أسئلة البناء الفكري:',
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
						content: '1) ما موضوع القصيدة؟ وكيف عبّر الشاعر عن موقفه الوجداني والفكري فيه؟',
						answer: `1) موضوع النص هو: ${chosen.theme}، وقد عبّر عنه بعاطفة صادقة ولغة إيحائية واضحة ترفض الاستسلام وتدعو للسمو.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '2) حدّد النزعة البارزة في النص، ثم بيّن هل تحققت «الوحدة العضوية» في الأبيات مع التعليل.',
						answer: `2) النزعة البارزة: ${chosen.tendency}. نعم، تحققت الوحدة العضوية لوحدة الموضوع ووحدة الجو النفسي وترابط الأبيات وتكاملها بحيث يخل الحذف أو التقديم بمعناها.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: '3) ما النمط الموظف في النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
						answer: `3) النمط هو: ${chosen.pattern}.`,
						mark: '2'
					},
					{
						type: 'text',
						content: '4) لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
						answer: `4) التلخيص المقترح: ${chosen.summaryModel}`,
						mark: '3'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_lp',
				trimesterId: 't2',
				difficulty,
				domain: 'reading_comprehension',
				titleAr: this.titleAr,
				onecRole: 'intellectual_building',
				passageKind: 'poetry',
				quizQuestion,
				sujetExercise,
				hints: [
					'فرّق بين النزعة الوطنية (شاعر يكتب عن بلده) والنزعة القومية والإسلامية والنزعة الإنسانية.',
					'للتحقق من الوحدة العضوية اذكر أركانها الثلاثة: وحدة الموضوع، وحدة الجو النفسي، وترابط الأبيات.',
					'استثمر الألفاظ المفتاحية لصياغة تلخيص دقيق ومركّز.'
				],
				solutionStepsAr: [
					`تحديد الموضوع: ${chosen.theme}.`,
					`استنتاج النزعة (${chosen.tendency}) وإثبات الوحدة العضوية.`,
					`استخراج النمط ومؤشراته: ${chosen.pattern}.`,
					`التلخيص النموذجي: ${chosen.summaryModel}`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 3. LINGUISTIC BUILDING (6 pts — Irab + Majaz + Free Verse Arud)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t2_lb_irab_majaz_arud',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'rhetoric_balagha',
		titleAr: 'البناء اللغوي (إعراب ومجاز وتفعيلة): الجمل التي لا محل لها، المجاز العقلي والمرسل، وشعر التفعيلة',
		curriculumLessonId: 'arb_lesson_3as_lp_t2_qawaid_balagha_t2',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sentence: 'هَذَا [[الشَّهِيدُ]] الَّذِي ((ضَحَّى بِرُوحِهِ)) أَكْثَرُ النَّاسِ [[صِدْقاً]] فِي عَهْدِهِ.',
					irabRows: [
						{
							target: 'الشَّهِيدُ',
							irab: 'بدل مطابق (أو عطف بيان) مرفوع وعلامة رفعه الضمة الظاهرة (اسم معرف جامد بعد اسم الإشارة).',
							mark: '0.75'
						},
						{
							target: 'صِدْقاً',
							irab: 'تمييز نسبة منصوب وعلامة نصبه الفتحة الظاهرة (بعد اسم التفضيل «أكثر»).',
							mark: '0.75'
						},
						{
							target: '((ضَحَّى بِرُوحِهِ))',
							irab: 'جملة صلة الموصول لا محل لها من الإعراب (لوقوعها بعد الاسم الموصول «الذي»).',
							mark: '1'
						}
					],
					majazExpr: '«بَنَى القَائِدُ المَدِينَةَ» و«أَطْلَقَ الجَيْشُ عَيْناً لِاسْتِطْلَاعِ العَدُوِّ»',
					majazAnswer:
						'في الأولى «بنى القائد المدينة»: مجاز عقلي علاقته السببية (لأن القائد أمر بالبناء والعمال بنوا). وفي الثانية «عيناً»: مجاز مرسل علاقته الجزئية (أطلق الجزء وأراد الجاسوس كله). وسر بلاغتهما الإيجاز والدقة وتأكيد المعنى.',
					arud: {
						verseSadr: 'وَقَفْنَا عَلَى قِمَّةِ الفَجْرِ نَشْدُو',
						verseAjuz: 'وَنَمْضِي',
						arudWriting: 'وَقَفْنَا - عَلَى قِمْ - مَتِلْفَجْ - رِنَشْدُو — وَنَمْضِي',
						symbols: '||0|0 - ||0|0 - ||0|0 - ||0|0 — ||0|0',
						tafilat: 'فَعُولُنْ - فَعُولُنْ - فَعُولُنْ - فَعُولُنْ (4 تفعيلات) — فَعُولُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة (الشعر الحر) على بحر المتقارب الصافي (فَعُولُنْ)'
					},
					quizEasyCorrect: 'مجاز مرسل علاقته الجزئية (ذكر العين وإرادة الجاسوس)',
					quizMediumCorrect: 'جملة صلة الموصول لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر المتقارب الصافي بتكرار تفعيلة فعولن (||0|0)'
				},
				{
					sentence: 'وَقَفَ المُجَاهِدُ [[ثَابِتاً]]، إِنَّ الأُمَّةَ — ((حَمَاهَا اللهُ)) — لَا تَرْضَى بِالذُّلِّ أَبَداً.',
					irabRows: [
						{
							target: 'ثَابِتاً',
							irab: 'حال منصوبة وعلامة نصبها الفتحة الظاهرة (مشتق يبين هيئة الفاعل عند الوقوف).',
							mark: '0.75'
						},
						{
							target: 'الأُمَّةَ',
							irab: 'اسم «إنّ» منصوب وعلامة نصبه الفتحة الظاهرة.',
							mark: '0.75'
						},
						{
							target: '((حَمَاهَا اللهُ))',
							irab: 'جملة اعتراضية دعائية لا محل لها من الإعراب (اعترضت بين اسم إنّ وخبرها).',
							mark: '1'
						}
					],
					majazExpr: '«وَاسْأَلِ القَرْيَةَ» و«نَهَارُ المُرَابِطِ صَائِمٌ»',
					majazAnswer:
						'في «اسأل القرية»: مجاز مرسل علاقته المحلية (ذكر المحل وأراد أهله). وفي «نهار المرابط صائم»: مجاز عقلي علاقته الزمانية (أُسند الصيام إلى زمانه). وسر بلاغتهما الإيجاز والمبالغة المقبولة وتقوية التصوير.',
					arud: {
						verseSadr: 'وَتَضِيءُ فِي أُفُقِ الكَرَامَةِ شَمْسُنَا',
						verseAjuz: 'لَا تَنْحَنِي',
						arudWriting: 'وَتَضِيءُفِي - أُفُقِلْكَرَا - مَتِشَمْسُنَا — لَاتَنْحَنِي',
						symbols: '|||0||0 - |||0||0 - |||0||0 — |0|0||0',
						tafilat: 'مُتَفَاعِلُنْ - مُتَفَاعِلُنْ - مُتَفَاعِلُنْ (3 تفعيلات) — مُتْفَاعِلُنْ (تفعيلة واحدة مضمرة)',
						meterName: 'شعر التفعيلة (الشعر الحر) على بحر الكامل الصافي (مُتَفَاعِلُنْ)'
					},
					quizEasyCorrect: 'مجاز عقلي علاقته الزمانية (إسناد الصيام إلى النهار)',
					quizMediumCorrect: 'جملة اعتراضية لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر الكامل الصافي بتكرار تفعيلة متفاعلن (|||0||0)'
				},
				{
					sentence: 'وَلَوْ صَدَقَ النَّاسُ ((لَعَمَّ السَّلَامُ))، وَقَدِ امْتَلَأَ القَلْبُ [[يَقِيناً]] بِنَصْرِ الحَقِّ.',
					irabRows: [
						{
							target: 'يَقِيناً',
							irab: 'تمييز منصوب وعلامة نصبه الفتحة الظاهرة (بعد فعل الامتلاء «امتلأ»).',
							mark: '0.75'
						},
						{
							target: 'السَّلَامُ',
							irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة.',
							mark: '0.75'
						},
						{
							target: '((لَعَمَّ السَّلَامُ))',
							irab: 'جملة جواب الشرط غير الجازم «لو» لا محل لها من الإعراب.',
							mark: '1'
						}
					],
					majazExpr: '«أَزْهَرَتِ الأَرْضُ بِالحُرِّيَّةِ» و«أَلْقَى الخَطِيبُ كَلِمَةً بَلِيغَةً»',
					majazAnswer:
						'في «أزهرت الأرض»: مجاز عقلي علاقته المكانية (أو استعارة مكنية في إزهار الحرية). وفي «كلمة»: مجاز مرسل علاقته الجزئية (أطلق الكلمة وأراد الخطبة كلها). وسر بلاغته الإيجاز وتأكيد الأثر البليغ.',
					arud: {
						verseSadr: 'سِرْنَا عَلَى دَرْبِ العُلَا لَا نَنْثَنِي',
						verseAjuz: 'نَحْوَ المُنَى',
						arudWriting: 'سِرْنَاعَلَى - دَرْبِلْعُلَا - لَانَنْثَنِي — نَحْوَلْمُنَى',
						symbols: '|0|0||0 - |0|0||0 - |0|0||0 — |0|0||0',
						tafilat: 'مُسْتَفْعِلُنْ - مُسْتَفْعِلُنْ - مُسْتَفْعِلُنْ (3 تفعيلات) — مُسْتَفْعِلُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة (الشعر الحر) على بحر الرجز الصافي (مُسْتَفْعِلُنْ)'
					},
					quizEasyCorrect: 'مجاز مرسل علاقته الجزئية (إطلاق الكلمة وإرادة الخطبة)',
					quizMediumCorrect: 'جملة جواب الشرط غير الجازم لو لا محل لها من الإعراب',
					quizHardCorrect: 'شعر التفعيلة على بحر الرجز الصافي بتكرار تفعيلة مستفعلن (|0|0||0)'
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
						{ text: 'تشبيه تمثيلي مفصّل الأركان', diagnosticFeedback: 'لا توجد أداة تشبيه ولا صورة منتزعة من متعدد.' },
						{ text: 'جناس تام بين لفظين متماثلين', diagnosticFeedback: 'البلاغة هنا في علم البيان (المجاز) لا في المحسنات البديعية.' },
						{ text: 'طباق سلب بين فعلين متضادين', diagnosticFeedback: 'لا يوجد تضاد نفي وإثبات في العبارة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التحليل البلاغي للعبارة الواردة ضمن: ${chosen.majazExpr}، أي تصنيف بياني صحيح مما يلي؟`,
					questionTextAr: 'اختر التحليل البياني الدقيق:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${chosen.majazAnswer}`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'جملة فعلية في محل نصب مفعول به', diagnosticFeedback: 'الجملة هنا من الجمل التي لا محل لها من الإعراب.' },
						{ text: 'جملة فعلية في محل جر مضاف إليه', diagnosticFeedback: 'لم تُسبق الجملة بظرف مضاف مثل «إذا» أو «إذ».' },
						{ text: 'جملة فعلية في محل رفع خبر', diagnosticFeedback: 'تحقق من موقع الجملة داخل التركيب النحوي.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `ما المحل الإعرابي للجملة بين قوسين في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»؟`,
					questionTextAr: 'حدد المحل الإعرابي الصحيح للجملة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'الشعر العمودي على البحر الطويل الممتزج', diagnosticFeedback: 'لاحظ تفاوت عدد التفعيلات بين السطرين واعتماد تفعيلة واحدة صافية.' },
						{ text: 'الشعر العمودي على البحر البسيط التام', diagnosticFeedback: 'البسيط بحر ممتزج من مستفعلن وفاعلن، والسطران من شعر التفعيلة.' },
						{ text: 'نثر مرسل خالٍ من الوزن العروضي', diagnosticFeedback: 'السطران موزونان بدقة على تفعيلة بحر صافٍ.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `قطّع السطرين الشعريين: «${chosen.arud.verseSadr}» / «${chosen.arud.verseAjuz}». ما نظامهما الموسيقي وبحرهما؟`,
					questionTextAr: 'حدد النظام الشعري والبحر الصافي:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفعيلات: ${chosen.arud.tafilat}، فهو ${chosen.arud.meterName}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي (إعراب، مجاز، وتقطيع شعر التفعيلة):',
				content: [
					{
						type: 'text',
						content: `1) أعرب المفردات والجملة المبينة في العبارة الآتية: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: `2) حدّد نوع المجاز وعلاقته وسر بلاغته في العبارتين: ${chosen.majazExpr}.`,
						answer: `2) ${chosen.majazAnswer}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'rhetoric_balagha',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'تذكر الجمل التي لا محل لها: صلة الموصول، الاعتراضية، وجواب الشرط غير الجازم (لو، لولا، إذا).',
					'في المجاز: إن كان الخروج في إسناد الفعل فهو مجاز عقلي، وإن كان في اللفظ المفرد لعلاقة غير المشابهة فهو مجاز مرسل.',
					'في شعر التفعيلة قارن عدد التفعيلات في السطر الأول والثاني واستخرج التفعيلة الصافية المكررة.'
				],
				solutionStepsAr: [
					'إعراب المفردات (البدل / الحال / التمييز) والجمل التي لا محل لها.',
					`تحليل المجاز العقلي والمرسل: ${chosen.majazAnswer}`,
					`تقطيع السطرين: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 4. LINGUISTIC BUILDING (6 pts — Jumuu + Badal + Free Verse Arud)
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t2_lb_jumuu_tafila',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'prosody_arud',
		titleAr: 'البناء اللغوي (صرف وإعراب وعروض): جموع القلة والكثرة، البدل، وموسيقى التفعيلة',
		curriculumLessonId: 'arb_lesson_3as_lp_t2_free_verse_prosody',
		defaultPoints: 6,
		onecRole: 'linguistic_building',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					sentence: 'أَعْجَبَنِي الشَّاعِرُ [[صِدْقُهُ]]، وَوَقَفَ [[الفِتْيَةُ]] فِي المَيَادِينِ أَيَّ ((أَبْطَالاً مُخْلِصِينَ)).',
					irabRows: [
						{
							target: 'صِدْقُهُ',
							irab: 'بدل اشتمال مرفوع وعلامة رفعه الضمة الظاهرة، والهاء ضمير متصل في محل جر مضاف إليه.',
							mark: '1'
						},
						{
							target: 'الفِتْيَةُ',
							irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة (وهو جمع قلة على وزن فِعْلَة).',
							mark: '0.75'
						},
						{
							target: '((أَبْطَالاً مُخْلِصِينَ)) (بعد أي التفسيرية)',
							irab: 'عطف بيان / تفسير (وإن جاءت جملة بعد «أي» فهي جملة تفسيرية لا محل لها من الإعراب).',
							mark: '0.75'
						}
					],
					jumuuList: '«أَقْلَام، أَزْمِنَة، شُهَدَاء، مَنَابِر»',
					jumuuAnswer:
						'جموع القلة: «أقلام» (أَفْعَال) و«أزمنة» (أَفْعِلَة). جموع الكثرة: «شهداء» (فُعَلَاء) و«منابر» (مَفَاعِل — صيغة منتهى الجموع الممنوعة من الصرف).',
					arud: {
						verseSadr: 'فَجْرُ أَوْطَانِنَا قَادِمٌ',
						verseAjuz: 'فِي الضِّيَا',
						arudWriting: 'فَجْرُأَوْ - طَانِنَا - قَادِمُنْ — فِضْضِيَا',
						symbols: '|0||0 - |0||0 - |0||0 — |0||0',
						tafilat: 'فَاعِلُنْ - فَاعِلُنْ - فَاعِلُنْ (3 تفعيلات) — فَاعِلُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة على بحر المتدارك الصافي (فَاعِلُنْ)'
					},
					quizEasyCorrect: '«أقلام» (أَفْعَال) و«أزمنة» (أَفْعِلَة) من جموع القلة',
					quizMediumCorrect: 'بدل اشتمال مرفوع لأن الصدق صفة معنوية يشتمل عليها الشاعر',
					quizHardCorrect: 'بحر المتدارك الصافي بتفعيلة فَاعِلُنْ (|0||0)'
				},
				{
					sentence: 'قَرَأْتُ الدِّيوَانَ [[نِصْفَهُ]]، وَاللهِ ((لَيَنْتَصِرَنَّ الحَقُّ)) مَهْمَا طَالَ الظَّلَامُ.',
					irabRows: [
						{
							target: 'نِصْفَهُ',
							irab: 'بدل بعض من كل منصوب وعلامة نصبه الفتحة الظاهرة، والهاء ضمير متصل في محل جر مضاف إليه.',
							mark: '1'
						},
						{
							target: 'الحَقُّ',
							irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة.',
							mark: '0.75'
						},
						{
							target: '((لَيَنْتَصِرَنَّ الحَقُّ))',
							irab: 'جملة جواب القسم لا محل لها من الإعراب.',
							mark: '0.75'
						}
					],
					jumuuList: '«أَنْفُس، أَحْرَار، مَسَاجِد، جِبَال»',
					jumuuAnswer:
						'جموع القلة: «أنفس» (أَفْعُل) و«أحرار» (أَفْعَال). جموع الكثرة: «جبال» (فِعَال) و«مساجد» (مَفَاعِل — صيغة منتهى الجموع الممنوعة من الصرف).',
					arud: {
						verseSadr: 'بِحَقِّ الشَّهِيدِ وَصَوْتِ الوَطَنْ',
						verseAjuz: 'نَصُونُ العُهُودَ وَنَبْنِي الزَّمَنْ',
						arudWriting: 'بِحَقْقِشْ - شَهِيدِ - وَصَوْتِلْ - وَطَنْ — نَصُونُلْ - عُهُودَ - وَنَبْنِزْ - زَمَنْ',
						symbols: '||0|0 - ||0| - ||0|0 - ||0 — ||0|0 - ||0| - ||0|0 - ||0',
						tafilat: 'فَعُولُنْ - فَعُولُ - فَعُولُنْ - فَعَلْ — فَعُولُنْ - فَعُولُ - فَعُولُنْ - فَعَلْ',
						meterName: 'البحر المتقارب التام (زحاف القبض في فَعُولُ وعلة الحذف في العروض والضرب فَعَلْ)'
					},
					quizEasyCorrect: '«أنفس» (أَفْعُل) و«أحرار» (أَفْعَال) من جموع القلة',
					quizMediumCorrect: 'جملة جواب القسم لا محل لها من الإعراب',
					quizHardCorrect: 'البحر المتقارب التام مع زحاف القبض وعلة الحذف (فَعَلْ)'
				},
				{
					sentence: 'قَادَ الإِمَامُ [[ابْنُ بَادِيسَ]] النَّهْضَةَ ((وَهُوَ يُعَلِّمُ الأَجْيَالَ)) فِي مَسَاجِدَ عَامِرَةٍ.',
					irabRows: [
						{
							target: 'ابْنُ',
							irab: 'بدل مطابق (أو عطف بيان) مرفوع وعلامة رفعه الضمة الظاهرة (من «الإمامُ»).',
							mark: '1'
						},
						{
							target: 'مَسَاجِدَ',
							irab: 'اسم مجرور بـ «في» وعلامة جره الفتحة نيابة عن الكسرة لأنه ممنوع من الصرف (صيغة منتهى الجموع).',
							mark: '0.75'
						},
						{
							target: '((وَهُوَ يُعَلِّمُ الأَجْيَالَ))',
							irab: 'جملة اسمية في محل نصب حال (سبقتها واو الحال وصاحبها معرفة).',
							mark: '0.75'
						}
					],
					jumuuList: '«أَعْمِدَة، فِتْيَة، مَصَابِيح، قُلُوب»',
					jumuuAnswer:
						'جموع القلة: «أعمدة» (أَفْعِلَة) و«فتية» (فِعْلَة). جموع الكثرة: «قلوب» (فُعُول) و«مصابيح» (مَفَاعِيل — صيغة منتهى الجموع الممنوعة من الصرف).',
					arud: {
						verseSadr: 'وَتَضِيءُ فِي أُفُقِ الكَرَامَةِ شَمْسُنَا',
						verseAjuz: 'لَا تَنْحَنِي',
						arudWriting: 'وَتَضِيءُفِي - أُفُقِلْكَرَا - مَتِشَمْسُنَا — لَاتَنْحَنِي',
						symbols: '|||0||0 - |||0||0 - |||0||0 — |0|0||0',
						tafilat: 'مُتَفَاعِلُنْ - مُتَفَاعِلُنْ - مُتَفَاعِلُنْ (3 تفعيلات) — مُتْفَاعِلُنْ (تفعيلة واحدة)',
						meterName: 'شعر التفعيلة على بحر الكامل الصافي (مُتَفَاعِلُنْ)'
					},
					quizEasyCorrect: '«أعمدة» (أَفْعِلَة) و«فتية» (فِعْلَة) من جموع القلة',
					quizMediumCorrect: 'اسم مجرور وعلامة جره الفتحة نيابة عن الكسرة لأنه صيغة منتهى الجموع',
					quizHardCorrect: 'شعر التفعيلة على بحر الكامل الصافي بتفعيلة متفاعلن (|||0||0)'
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
						{ text: 'جميع الألفاظ الأربعة من جموع القلة', diagnosticFeedback: 'تأكد من الأوزان الأربعة المحفوظة لجموع القلة: أَفْعُل، أَفْعَال، أَفْعِلَة، فِعْلَة.' },
						{ text: 'صيغة منتهى الجموع تُصنف ضمن جموع القلة دائماً', diagnosticFeedback: 'صيغة منتهى الجموع من جموع الكثرة وهي ممنوعة من الصرف.' },
						{ text: 'كل الكلمات المذكورة جمع مذكر سالم', diagnosticFeedback: 'هذه كلها جموع تكسير تتغير فيها بنية المفرد.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في مجموعة جموع التكسير: ${chosen.jumuuList}، أي تصنيف صحيح لجموع القلة؟`,
					questionTextAr: 'اختر التصنيف الصرفي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `${chosen.jumuuAnswer}`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'مضاف إليه مجرور بالكسرة الظاهرة', diagnosticFeedback: 'أعد قراءة الجملة وحدد العلاقة النحوية بدقة.' },
						{ text: 'خبر كان منصوب بالفتحة الظاهرة', diagnosticFeedback: 'لا يوجد فعل ناسخ «كان» يعمل هنا.' },
						{ text: 'مفعول مطلق منصوب بالفتحة', diagnosticFeedback: 'الكلمة ليست مصدراً مؤكداً لفعله.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في الجملة: «${chosen.sentence.replace(/\[\[|\]\]|\(\(|\)\)/g, '')}»، أي تحليل إعرابي صحيح مما يلي؟`,
					questionTextAr: 'اختر التحليل الإعرابي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التحليل الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'البحر البسيط التام الممتزج', diagnosticFeedback: 'قطّع السطرين/الشطرين عروضياً وتحقق من الرموز والتفعيلة المكررة.' },
						{ text: 'البحر الطويل التام الممتزج', diagnosticFeedback: 'لا توجد تفعيلة مفاعيلن في هذا التقطيع.' },
						{ text: 'البحر الوافر التام بعلة القطف', diagnosticFeedback: 'لا تطابق الرموز تفعيلة مفاعلتن (||0|||0).' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `عند تقطيع: «${chosen.arud.verseSadr} ... ${chosen.arud.verseAjuz}»، ما البحر الشعري الصحيح؟`,
					questionTextAr: 'اختر البحر والتفعيلة الصحيحين:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `التفعيلات: ${chosen.arud.tafilat}، والبحر: ${chosen.arud.meterName}.`
				};
			}

			const sujetExercise: ExerciseBlock = {
				customTitle: 'البناء اللغوي',
				points: 6,
				instruction: 'أجب عن أسئلة البناء اللغوي (إعراب، صرف الجموع، وتقطيع عروضي):',
				content: [
					{
						type: 'text',
						content: `1) أعرب المفردات والجملة المطلوبة في: «${chosen.sentence.replace(/\[\[|\]\]/g, '')}»`
					},
					buildIrabTableBlock(chosen.irabRows),
					{
						type: 'text',
						content: `2) صنّف جموع التكسير الآتية إلى جموع قلة وجموع كثرة مع تحديد وزن كل جمع واستخراج صيغة منتهى الجموع: ${chosen.jumuuList}.`,
						answer: `2) ${chosen.jumuuAnswer}`,
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
				trimesterId: 't2',
				difficulty,
				domain: 'prosody_arud',
				titleAr: this.titleAr,
				onecRole: 'linguistic_building',
				quizQuestion,
				sujetExercise,
				hints: [
					'احفظ أوزان جموع القلة الأربعة: أَفْعُل، أَفْعَال، أَفْعِلَة، فِعْلَة؛ وكل ما عداها جمع كثرة.',
					'صيغة منتهى الجموع (مفاعل، مفاعيل) تُجر بالفتحة نيابة عن الكسرة إذا خلت من «أل» والإضافة.',
					'ميّز أنواع البدل الثلاثة: المطابق، بعض من كل (مادي)، والاشتمال (معنوي).'
				],
				solutionStepsAr: [
					'إعراب البدل والجمل والجموع الممنوعة من الصرف بدقة.',
					`تصنيف الجموع: ${chosen.jumuuAnswer}`,
					`التقطيع العروضي: ${chosen.arud.tafilat} — ${chosen.arud.meterName}.`
				],
				finalAnswer
			};
		}
	},

	// ─────────────────────────────────────────────────────────────────────────
	// 5. CRITICAL EVALUATION (4 pts — التقييم النقدي): الالتزام وفلسطين والشعر الحر
	// ─────────────────────────────────────────────────────────────────────────
	{
		id: 'arb_tpl_3as_lp_t2_ce_iltizam_modern',
		grade: '3as_lp',
		trimesterId: 't2',
		domain: 'literary_criticism',
		titleAr: 'التقييم النقدي (4ن): ظاهرة الالتزام، القضية الفلسطينية، وموسيقى الشعر الحر',
		curriculumLessonId: 'arb_lesson_3as_lp_t2_iltizam_algeria',
		defaultPoints: 4,
		onecRole: 'critical_evaluation',
		generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
			const rng = new SeededRng(seed);
			const pool = [
				{
					topicTitle: 'ظاهرة الالتزام في شعر الثورة الجزائرية',
					quote: '«واكب الشعر الجزائري ثورة نوفمبر التحريرية بصدق ووعي، فصار الالتزام سمة جوهرية في القصيدة الثورية»',
					qPrompt:
						'حرر فقرة نقدية منهجية تجيب فيها عن: (أ) تعريف الالتزام والفرق بينه وبين الإلزام، (ب) ثلاث مظاهر بارزة للالتزام في شعر الثورة الجزائرية، (جـ) ذكر أربعة من أعلام هذا الاتجاه.',
					modelAnswer:
						'تمهيد (0.5ن): كان للأدب الجزائري دور طليعي في مرافقة الكفاح المسلح ضد الاستعمار الفرنسي.\n1) التعريف والفرق (1ن): الالتزام هو تسخير الأديب قلمه لخدمة قضايا أمته بوعي وحرية وصدق وجداني، بخلاف الإلزام الذي يُفرض قسراً من الخارج فيُفقد العمل صدقه الفني.\n2) مظاهر الالتزام (1.5ن): توظيف ضمير الجمع (نحن) للتعبير عن وحدة المصير، تخليد الشهداء ورموز الثورة (الأوراس، نوفمبر، العلم)، فضح جرائم الاحتلال، واستنهاض الهمم للصمود والتحرر.\n3) الأعلام والمنهجية (1ن): مفدي زكرياء، محمد العيد آل خليفة، الشيخ أحمد سحنون، ومحمد الأخضر السائحي.',
					quizEasyCorrect: 'تسخير الأديب قلمه لقضايا أمته بحرية وقناعة ذاتية صادقة',
					quizMediumCorrect: 'ضمير الجمع، تمجيد الشهداء ورموز الأوراس ونوفمبر، وفضح الاستعمار',
					quizHardCorrect: 'مفدي زكرياء ومحمد العيد آل خليفة والشيخ أحمد سحنون ومحمد الأخضر السائحي'
				},
				{
					topicTitle: 'القضية الفلسطينية في الشعر العربي الملتزم',
					quote: '«لم تكن فلسطين في الشعر العربي المعاصر قضية قطرية ضيقة، بل غدت قضية الأمة الإسلامية والعربية جمعاء»',
					qPrompt:
						'في فقرة نقدية محكمة: (أ) علّل الحضور القوي لقضية فلسطين في الشعر العربي المعاصر، (ب) ميّز بين النزعات الثلاث (الوطنية، القومية، الدينية) في شعر فلسطين، (جـ) اذكر أربعة شعراء تغنّوا بالقدس والمقاومة.',
					modelAnswer:
						'تمهيد (0.5ن): احتلت القضية الفلسطينية قلب القصيدة العربية المعاصرة بوصفها قضية حق ومقدسات.\n1) التعليل (1ن): لأن فلسطين أرض المسجد الأقصى أولى القبلتين ومسرى النبي صلى الله عليه وسلم، ولما تعرض له شعبها من احتلال وتهجير يمس كرامة الأمة كلها.\n2) التمييز بين النزعات (1.5ن): النزعة الوطنية عند الشعراء الفلسطينيين المدافعين عن أرضهم، والنزعة القومية عند شعراء الأقطار العربية الشقيقة المتضامنين معها، والنزعة الدينية في استحضار قدسية الأقصى والشهادة.\n3) الأعلام والمنهجية (1ن): إبراهيم طوقان، عبد الرحيم محمود، هاشم الرفاعي، عبد الرحمن العشماوي، ومفدي زكرياء.',
					quizEasyCorrect: 'قدسية المسجد الأقصى وعدالة القضية ورفض الاحتلال والتهجير',
					quizMediumCorrect: 'وطنية للفلسطيني، وقومية للعربي المتضامن، ودينية لتعظيم الأقصى والشهادة',
					quizHardCorrect: 'إبراهيم طوقان وعبد الرحيم محمود وهاشم الرفاعي وعبد الرحمن العشماوي'
				},
				{
					topicTitle: 'خصائص الشعر الحر (شعر التفعيلة) والنزعة الإنسانية الحديثة',
					quote: '«جدّد الشعر المعاصر أدواته الموسيقية والفنية عبر شعر التفعيلة وتعميق النزعة الإنسانية والتأملية»',
					qPrompt:
						'اكتب تقييماً نقدياً منظماً تتناول فيه: (أ) مفهوم شعر التفعيلة والفرق بينه وبين الشعر العمودي، (ب) ثلاث خصائص فنية وموسيقية لشعر التفعيلة مع ذكر أربعة من بحوره الصافية، (جـ) مفهوم النزعة الإنسانية المنضبطة ومثالين من أعلامها.',
					modelAnswer:
						'تمهيد (0.5ن): عرف الشعر العربي الحديث تطوراً عميقاً في البنية الموسيقية والوظيفة الإنسانية.\n1) مفهوم شعر التفعيلة والفرق (1ن): شعر موزون يستبدل بالبيت ذي الشطرين «السطر الشعري» المرن، ويعتمد تكرار تفعيلة واحدة تتفاوت عدداً حسب الدفقة الشعورية، بينما يلتزم العمودي بتساوي الشطرين ووحدة القافية والروي.\n2) الخصائص والبحور الصافية (1.5ن): الوحدة العضوية، تنوع القافية والروي، التدوير والرمز واللغة الموحية؛ ومن بحوره الصافية: الكامل (متفاعلن)، المتقارب (فعولن)، الرجز (مستفعلن)، الرمل (فاعلاتن)، والمتدارك (فاعلن).\n3) النزعة الإنسانية والأعلام (1ن): خطاب الإنسان بقيم الرحمة والأخوة والتفاؤل الإيماني كما عند محمد العيد آل خليفة والشيخ أحمد سحنون ومحمد الأخضر السائحي وعبد الرحمن العشماوي.',
					quizEasyCorrect: 'اعتماد السطر الشعري وتكرار تفعيلة واحدة من بحر صافٍ وفق الدفقة الشعورية',
					quizMediumCorrect: 'الكامل (متفاعلن)، المتقارب (فعولن)، الرجز (مستفعلن)، والرمل (فاعلاتن)',
					quizHardCorrect: 'النزعة الإنسانية الإيمانية والوحدة العضوية عند محمد العيد آل خليفة والشيخ أحمد سحنون والسائحي'
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
						{ text: 'الكتابة النثرية الخالية من أي إيقاع أو وزن', diagnosticFeedback: 'هذه الفكرة غير دقيقة في وصف الظاهرة الشعرية المدروسة.' },
						{ text: 'التزام السجع المتكلف والألغاز البديعية كما في عصر الضعف', diagnosticFeedback: 'هذا يخص عصر الضعف وليس الشعر المعاصر الملتزم.' },
						{ text: 'الابتعاد التام عن قضايا المجتمع والأمة', diagnosticFeedback: 'الشعر الملتزم والإنساني منغرس في قضايا الإنسان والأمة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في التقييم النقدي حول «${chosen.topicTitle}»، ما التعريف أو التعليل الأدق؟`,
					questionTextAr: 'اختر الإجابة النقدية الدقيقة:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الإجابة الدقيقة هي: ${finalAnswer}.`
				};
			} else if (difficulty === 'medium') {
				finalAnswer = chosen.quizMediumCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'البحر الطويل والبسيط والمنسرح فقط', diagnosticFeedback: 'الطويل والبسيط بحران ممتزجان لا يتبعان هذا الوصف.' },
						{ text: 'الإرشادات الركحية والفصول المسرحية', diagnosticFeedback: 'تلك من خصائص الفن المسرحي في الفصل الثالث.' },
						{ text: 'الاقتصار على النثر العلمي التقريري', diagnosticFeedback: 'نحن بصدد ظاهرة شعرية حديثة.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `في محور «${chosen.topicTitle}»، أي عنصر تحليلي يُعد صحيحاً ومطلوباً في إجابة البكالوريا؟`,
					questionTextAr: 'اختر العنصر التحليلي الصحيح:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `العنصر الصحيح هو: ${finalAnswer}.`
				};
			} else {
				finalAnswer = chosen.quizHardCorrect;
				const mcq = buildUniqueMcqOptions(
					finalAnswer,
					[
						{ text: 'ابن خلدون وابن الوردي فقط', diagnosticFeedback: 'هما من أعلام عصر الضعف في الفصل الأول.' },
						{ text: 'أحمد رضا حوحو والشيخ الطيب العقبي فقط', diagnosticFeedback: 'هما من أعلام القصة والمقال الإصلاحي في الفصل الثالث.' },
						{ text: 'البشير الإبراهيمي والشيخ مبارك الميلي فقط', diagnosticFeedback: 'هما من أبرز أعلام المقال والتاريخ الإصلاحي في الفصل الثالث.' }
					],
					rng
				);
				quizQuestion = {
					type: 'mcq',
					questionText: `أي قائمة أعلام أو توثيق نقدي يوافق محور «${chosen.topicTitle}» بدقة؟`,
					questionTextAr: 'اختر التوثيق الصحيح للأعلام:',
					questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
					explanation: `الأعلام والتوثيق الصحيح: ${finalAnswer}.`
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
				trimesterId: 't2',
				difficulty,
				domain: 'literary_criticism',
				titleAr: this.titleAr,
				onecRole: 'critical_evaluation',
				quizQuestion,
				sujetExercise,
				hints: [
					'ابدأ بتمهيد قصير ثم عالج كل مطلب في فقرة أو عنصر واضح ومنسجم.',
					'دعّم إجابتك بمصطلحات نقدية دقيقة (الالتزام، الوحدة العضوية، البحور الصافية، الدفقة الشعورية).',
					'اذكر 3 إلى 4 أعلام موثوقين مرتبطين مباشرة بالمحور المطلوب.'
				],
				solutionStepsAr: [
					`تأطير القضية النقدية: ${chosen.topicTitle}.`,
					'تفصيل المفاهيم والخصائص والمقارنات المطلوبة.',
					'توثيق الإجابة بالأعلام المعتمدين وسلامة اللغة.'
				],
				finalAnswer
			};
		}
	}
];
