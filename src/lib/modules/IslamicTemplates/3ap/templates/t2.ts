import type {
	Difficulty,
	IslamicGeneratedExerciseInstance,
	IslamicParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildHadithPassageBlock,
	buildIslamicContextBlock,
	buildIslamicIntegrationBlock,
	buildIslamicTableBlock,
	buildQuranPassageBlock
} from '../../islamic-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. الوضعية الأولى (3 ن) — القرآن الكريم: سورتا القارعة والعاديات
// ═══════════════════════════════════════════════════════════════════════════════
const quranQariahAdiyat3apT2: IslamicParameterizedTemplate = {
	id: 'isl_tpl_3ap_t2_surah_qariah_adiyat',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'quran_tafsir',
	titleAr: 'الوضعية الأولى: سورتا القارعة والعاديات',
	curriculumLessonId: 'isl_lesson_3ap_t2_surah_qariah',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variants = [
			{
				surah: 'القارعة',
				ayahRange: '1-5',
				verses: 'الْقَارِعَةُ (1) مَا الْقَارِعَةُ (2) وَمَا أَدْرَاكَ مَا الْقَارِعَةُ (3) يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ (4) وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ (5)',
				vocab: [
					{ word: 'الْقَارِعَةُ', meaning: 'اسم من أسماء يوم القيامة' },
					{ word: 'الْعِهْنِ الْمَنْفُوشِ', meaning: 'الصوف المصبوغ المتطاير' }
				],
				q1: 'أكمل كتابة سورة القارعة من الآية 6 إلى آخر السورة: ................................................',
				a1: 'فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ (6) فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ (7) وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ (8) فَأُمُّهُ هَاوِيَةٌ (9) وَمَا أَدْرَاكَ مَا هِيَهْ (10) نَارٌ حَامِيَةٌ (11).',
				q2: 'بمَ شبّه الله تعالى الناس والجبال يوم القيامة في السند؟',
				a2: 'شبّه الناس بالفراش المبثوث (المنتشر المتفرق)، وشبّه الجبال بالعهن المنفوش (الصوف المصبوغ المتطاير).',
				q3: 'ما جزاء من ثقلت موازينه، وما جزاء من خفت موازينه؟',
				a3: 'من ثقلت موازينه فهو في عيشة راضية في الجنة، ومن خفت موازينه فأمه هاوية وهي نار حامية.',
				mcqQ: 'ما معنى «الْعِهْنِ الْمَنْفُوشِ» في سورة القارعة؟',
				mcqCorrect: 'الصوف المصبوغ المتفرق المتطاير',
				mcqDistractors: [
					{ text: 'الجبال الصلبة الثابتة', diagnosticFeedback: 'الجبال الصلبة هي التي تصير كالعهن المنفوش يوم القيامة.' },
					{ text: 'الخيول المسرعة في الصباح', diagnosticFeedback: 'الخيل المسرعة وردت في سورة العاديات لا القارعة.' },
					{ text: 'الأنهار الجارية في الجنة', diagnosticFeedback: 'العهن في اللغة هو الصوف المصبوغ.' }
				]
			},
			{
				surah: 'القارعة',
				ayahRange: '6-11',
				verses: 'فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ (6) فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ (7) وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ (8) فَأُمُّهُ هَاوِيَةٌ (9) وَمَا أَدْرَاكَ مَا هِيَهْ (10) نَارٌ حَامِيَةٌ (11)',
				vocab: [
					{ word: 'عِيشَةٍ رَاضِيَةٍ', meaning: 'حياة هنيئة مرضية في الجنة' },
					{ word: 'هَاوِيَةٌ', meaning: 'نار جهنم العميقة' }
				],
				q1: 'استظهر كتابياً الآيات الخمس الأولى من سورة القارعة: ................................................',
				a1: 'الْقَارِعَةُ (1) مَا الْقَارِعَةُ (2) وَمَا أَدْرَاكَ مَا الْقَارِعَةُ (3) يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ (4) وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ (5).',
				q2: 'ما المقصود بـ«نَارٌ حَامِيَةٌ»؟',
				a2: 'هي نار جهنم الشديدة الحرارة التي أعدّها الله جزاء للكافرين والعصاة.',
				q3: 'اذكر عملين صالحين يثقّلان ميزان المسلم يوم القيامة.',
				a3: '1) المحافظة على الصلاة في وقتها وبر الوالدين. 2) الصدق والذكر والإحسان إلى الناس.',
				mcqQ: 'ما مصير من ثقلت موازين حسناته كما ورد في سورة القارعة؟',
				mcqCorrect: 'فهو في عيشة راضية في الجنة',
				mcqDistractors: [
					{ text: 'فأمه هاوية ونار حامية', diagnosticFeedback: 'الهاوية مصير من خفّت موازينه لا من ثقلت.' },
					{ text: 'يبقى في الدنيا لا يموت', diagnosticFeedback: 'كل نفس ذائقة الموت والبقاء في الآخرة.' },
					{ text: 'يُعاد إلى الأرض مرة أخرى', diagnosticFeedback: 'لا رجوع إلى الدنيا بعد الحساب.' }
				]
			},
			{
				surah: 'العاديات',
				ayahRange: '1-5',
				verses: 'وَالْعَادِيَاتِ ضَبْحًا (1) فَالْمُورِيَاتِ قَدْحًا (2) فَالْمُغِيرَاتِ صُبْحًا (3) فَأَثَرْنَ بِهِ نَقْعًا (4) فَوَسَطْنَ بِهِ جَمْعًا (5)',
				vocab: [
					{ word: 'ضَبْحًا', meaning: 'صوت أنفاس الخيل عند الجري' },
					{ word: 'نَقْعًا', meaning: 'غباراً كثيراً' }
				],
				q1: 'أكمل الآيات الست الأخيرة من سورة العاديات: ................................................',
				a1: 'إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ (6) وَإِنَّهُ عَلَى ذَلِكَ لَشَهِيدٌ (7) وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ (8) أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ (9) وَحُصِّلَ مَا فِي الصُّدُورِ (10) إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ (11).',
				q2: 'ما المقصود بـ«الْعَادِيَاتِ» في مطلع السورة؟ وما معنى «قَدْحًا»؟',
				a2: 'العاديات هي الخيل المسرعة في سبيل الله، وقدحاً تعني إخراج الشرر بضرب حوافرها على الحجارة.',
				q3: 'بمَ وصفت السورة الإنسان الغافل تجاه نعم ربه؟ وكيف نكون شاكرين؟',
				a3: 'وصفته بأنه كنود أي كثير الجحود للنعم، ونكون شاكرين بحمد الله وطاعته والإنفاق في الخير.',
				mcqQ: 'ما معنى كلمة «نَقْعًا» في قوله تعالى في سورة العاديات: ﴿فَأَثَرْنَ بِهِ نَقْعًا﴾؟',
				mcqCorrect: 'غباراً كثيراً تثيره الخيل بجريها',
				mcqDistractors: [
					{ text: 'ماءً عذباً جارياً', diagnosticFeedback: 'النقع في الآية هو الغبار المثار من سرعة الخيل.' },
					{ text: 'صوت الرعد في السماء', diagnosticFeedback: 'صوت أنفاس الخيل هو «ضبحاً»، أما «نقعاً» فهو الغبار.' },
					{ text: 'أزهاراً وثماراً ناضجة', diagnosticFeedback: 'تأمل شرح مفردات سورة العاديات.' }
				]
			},
			{
				surah: 'العاديات',
				ayahRange: '6-11',
				verses: 'إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ (6) وَإِنَّهُ عَلَى ذَلِكَ لَشَهِيدٌ (7) وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ (8) أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ (9) وَحُصِّلَ مَا فِي الصُّدُورِ (10) إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ (11)',
				vocab: [
					{ word: 'لَكَنُودٌ', meaning: 'كثير الجحود لنعم ربه' },
					{ word: 'بُعْثِرَ', meaning: 'أُخرج الأموات من قبورهم' }
				],
				q1: 'اكتب الآيات الخمس الأولى من سورة العاديات: ................................................',
				a1: 'وَالْعَادِيَاتِ ضَبْحًا (1) فَالْمُورِيَاتِ قَدْحًا (2) فَالْمُغِيرَاتِ صُبْحًا (3) فَأَثَرْنَ بِهِ نَقْعًا (4) فَوَسَطْنَ بِهِ جَمْعًا (5).',
				q2: 'اشرح معنى «الْخَيْرِ» و«حُصِّلَ مَا فِي الصُّدُورِ» في الآيات.',
				a2: 'الْخَيْرِ: المال — حُصِّلَ مَا فِي الصُّدُورِ: أُظهر وجُمع ما في القلوب من نوايا الخير والشر.',
				q3: 'ما أثر إيمانك بأن الله خبير بما في الصدور على قلبك وعملك؟',
				a3: 'أُخلص نيتي لله وحده، وأحفظ قلبي من الحسد والبخل، وأراقب الله في السر والعلن.',
				mcqQ: 'ما معنى «لَكَنُودٌ» في قوله تعالى: ﴿إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ﴾؟',
				mcqCorrect: 'كثير الجحود والكفران لنعم الله تعالى',
				mcqDistractors: [
					{ text: 'كثير الحمد والشكر في كل وقت', diagnosticFeedback: 'الكنود هو الجحود وهو عكس الشاكر.' },
					{ text: 'قوي البنية وشجاع في السفر', diagnosticFeedback: 'تصف الآية جحود الإنسان الغافل لنعم الله.' },
					{ text: 'شديد الحرص على صلاة الجماعة', diagnosticFeedback: 'الكنود صفة ذميمة تعني جحود النعم.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `من سورة ${v.surah}:\n${v.mcqQ}`,
			questionTextAr: v.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${v.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: `الوضعية الأولى: القرآن الكريم (سورة ${v.surah})`,
			points: 3,
			instruction: 'اقرأ السند القرآني ثم أجب عن الأسئلة الآتية:',
			content: [
				buildQuranPassageBlock({
					verses: v.verses,
					surah: v.surah,
					ayahRange: v.ayahRange,
					vocabulary: v.vocab
				}),
				{ type: 'text', content: `1) ${v.q1}`, answer: v.a1, mark: '1' },
				{ type: 'text', content: `2) ${v.q2}`, answer: v.a2, mark: '1' },
				{ type: 'text', content: `3) ${v.q3}`, answer: v.a3, mark: '1' }
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'رتّب آيات السورة في ذهنك أولاً ثم اكتبها بخط واضح ومشكول.',
				'تأمل معاني المفردات الواردة في السند القرآني.',
				'استخرج العبرة الإيمانية في سطر واضح ومباشر.'
			],
			solutionStepsAr: [v.a1, v.a2, v.a3],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. الوضعية الأولى (3 ن) — العقيدة: الإيمان بالكتب السماوية
// ═══════════════════════════════════════════════════════════════════════════════
const imanKutub3apT2: IslamicParameterizedTemplate = {
	id: 'isl_tpl_3ap_t2_iman_kutub',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'aqeedah',
	titleAr: 'الوضعية الأولى: الإيمان بالكتب السماوية',
	curriculumLessonId: 'isl_lesson_3ap_t2_iman_kutub',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variants = [
			{
				q1: 'ما ترتيب الإيمان بالكتب السماوية ضمن أركان الإيمان الستة؟ وما الكتاب الخاتم المحفوظ من التحريف؟',
				a1: 'هو الركن الثالث من أركان الإيمان، والكتاب الخاتم المحفوظ من التحريف هو القرآن الكريم.',
				rows: [
					[{ label: 'القرآن الكريم', bold: true }, { answer: 'سيدنا محمد صلى الله عليه وسلم', mark: '0.5' }],
					[{ label: 'التوراة', bold: true }, { answer: 'موسى عليه السلام', mark: '0.5' }],
					[{ label: 'الإنجيل', bold: true }, { answer: 'عيسى عليه السلام', mark: '0.5' }],
					[{ label: 'الزبور', bold: true }, { answer: 'داود عليه السلام', mark: '0.5' }]
				],
				mcqQ: 'على أيّ نبيّ أُنزل كتاب التوراة؟',
				mcqCorrect: 'موسى عليه السلام',
				mcqDistractors: [
					{ text: 'داود عليه السلام', diagnosticFeedback: 'أُنزل الزبور على داود عليه السلام.' },
					{ text: 'عيسى عليه السلام', diagnosticFeedback: 'أُنزل الإنجيل على عيسى عليه السلام.' },
					{ text: 'محمد صلى الله عليه وسلم', diagnosticFeedback: 'أُنزل القرآن الكريم على محمد صلى الله عليه وسلم.' }
				]
			},
			{
				q1: 'اذكر ميزتين للقرآن الكريم تميزانه عن سائر الكتب السماوية السابقة.',
				a1: '1) محفوظ من التحريف والتبديل بحفظ الله تعالى. 2) شامل لجميع البشر وناسخ للكتب السابقة فلا يُعمل اليوم إلا به.',
				rows: [
					[{ label: 'صحف إبراهيم وموسى', bold: true }, { answer: 'إبراهيم وموسى عليهما السلام', mark: '0.5' }],
					[{ label: 'الزبور', bold: true }, { answer: 'داود عليه السلام', mark: '0.5' }],
					[{ label: 'الإنجيل', bold: true }, { answer: 'عيسى عليه السلام', mark: '0.5' }],
					[{ label: 'القرآن الكريم', bold: true }, { answer: 'محمد صلى الله عليه وسلم', mark: '0.5' }]
				],
				mcqQ: 'على أيّ نبيّ أُنزل كتاب الإنجيل؟',
				mcqCorrect: 'عيسى عليه السلام',
				mcqDistractors: [
					{ text: 'موسى عليه السلام', diagnosticFeedback: 'أُنزلت التوراة على موسى عليه السلام.' },
					{ text: 'داود عليه السلام', diagnosticFeedback: 'أُنزل الزبور على داود عليه السلام.' },
					{ text: 'إبراهيم عليه السلام', diagnosticFeedback: 'أُنزلت الصحف على إبراهيم عليه السلام.' }
				]
			},
			{
				q1: 'كيف يكون واجبنا نحن المسلمين نحو القرآن الكريم؟ اذكر واجبين.',
				a1: '1) تعظيمه وتلاوته وحفظه وتدبر معانيه. 2) العمل بأحكامه وأوامره واجتناب نواهيه.',
				rows: [
					[{ label: 'التوراة', bold: true }, { answer: 'موسى عليه السلام', mark: '0.5' }],
					[{ label: 'الزبور', bold: true }, { answer: 'داود عليه السلام', mark: '0.5' }],
					[{ label: 'الصحف', bold: true }, { answer: 'إبراهيم وموسى عليهما السلام', mark: '0.5' }],
					[{ label: 'القرآن الكريم', bold: true }, { answer: 'محمد صلى الله عليه وسلم', mark: '0.5' }]
				],
				mcqQ: 'ما الكتاب السماوي الذي تكفّل الله بحفظه من التحريف والتبديل إلى يوم القيامة؟',
				mcqCorrect: 'القرآن الكريم',
				mcqDistractors: [
					{ text: 'التوراة', diagnosticFeedback: 'القرآن الكريم هو وحده الكتاب المحفوظ من كل تحريف.' },
					{ text: 'الإنجيل', diagnosticFeedback: 'القرآن الكريم هو الكتاب الخاتم المحفوظ بحفظ الله.' },
					{ text: 'الزبور', diagnosticFeedback: 'حفظ الله القرآن الكريم ليكون حجة باقية إلى يوم القيامة.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.mcqQ,
			questionTextAr: v.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${v.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الأولى: الإيمان بالكتب السماوية',
			points: 3,
			instruction: 'تأمل الآية الكريمة ثم أجب عن السؤالين:',
			content: [
				buildIllustratedFigureBlock('pri_isl_04_mushaf_wooden_stand', {
					maxHeight: 112,
					width: '58%',
					mode: 'image_only',
					title: 'القُرْآنُ الكَرِيمُ — خَاتَمُ الكُتُبِ السَّمَاوِيَّةِ المُنَزَّلَةِ'
				}),
				buildQuranPassageBlock({
					verses: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ',
					surah: 'البقرة',
					ayahRange: '285'
				}),
				{ type: 'text', content: `1) ${v.q1}`, answer: v.a1, mark: '1' },
				{ type: 'text', content: '2) أكمل الجدول الآتي بذكر النبي الذي أُنزل عليه كل كتاب سماوي:' },
				buildIslamicTableBlock(['الكتاب السماوي', 'النبي الذي أُنزل عليه'], v.rows)
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الإيمان بالكتب السماوية هو الركن الثالث من أركان الإيمان.',
				'تذكر: التوراة لموسى، الزبور لداود، الإنجيل لعيسى، الصحف لإبراهيم وموسى، والقرآن لمحمد صلى الله عليه وسلم.',
				'القرآن الكريم هو خاتم الكتب والمحفوظ من التحريف.'
			],
			solutionStepsAr: [v.a1, 'ربط كل كتاب سماوي بالنبي الذي أُنزل عليه بدقة.'],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. الوضعية الثانية (3 ن) — العبادات: صلاة الجماعة وفضلها
// ═══════════════════════════════════════════════════════════════════════════════
const salatJamaah3apT2: IslamicParameterizedTemplate = {
	id: 'isl_tpl_3ap_t2_salat_jamaah',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'fiqh_ibadat',
	titleAr: 'الوضعية الثانية: صلاة الجماعة وفضلها وآدابها',
	curriculumLessonId: 'isl_lesson_3ap_t2_salat_jamaah',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variants = [
			{
				q1: 'اشرح معنى «صلاة الفذّ»، وبيّن أقل عدد تنعقد به صلاة الجماعة.',
				a1: 'صلاة الفذّ هي صلاة المنفرد وحده، وأقل عدد لصلاة الجماعة اثنان: إمام ومأموم.',
				tfItems: [
					{ q: 'تفضل صلاة الجماعة صلاة المنفرد بسبع وعشرين درجة.', a: 'صحيح', c: 'العبارة صحيحة كما ورد في الصحيحين.', mark: '0.5' },
					{ q: 'يجوز للمأموم أن يسبق الإمام في الركوع والسجود.', a: 'خطأ', c: 'يجب على المأموم متابعة الإمام وعدم مسابقته.', mark: '0.5' },
					{ q: 'من آداب صلاة الجماعة تسوية الصفوف وسد الفرج.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' },
					{ q: 'نركض بسرعة ونرفع أصواتنا عند دخول المسجد لإدراك الجماعة.', a: 'خطأ', c: 'نمشي إلى المسجد بسكينة ووقار وهدوء.', mark: '0.5' }
				],
				mcqQ: 'بكم درجة تفضل صلاة الجماعة صلاة الفذّ في حديث عبد الله بن عمر رضي الله عنهما؟',
				mcqCorrect: 'بسبع وعشرين درجة',
				mcqDistractors: [
					{ text: 'بسبع درجات فقط', diagnosticFeedback: 'العدد الثابت في الحديث المتفق عليه هو سبع وعشرون درجة.' },
					{ text: 'بعشر درجات', diagnosticFeedback: 'تفضلها بسبع وعشرين درجة.' },
					{ text: 'بثلاث درجات', diagnosticFeedback: 'أجر صلاة الجماعة عظيم جداً: 27 درجة.' }
				]
			},
			{
				q1: 'اذكر فائدتين عظيمتين لصلاة الجماعة في حياة المسلمين.',
				a1: '1) تنشر المحبة والتآلف والتعارف بين الجيران والمسلمين. 2) تعلّم النظام والانضباط والوقوف صفاً واحداً خلف الإمام وتفقد أحوال الإخوان.',
				tfItems: [
					{ q: 'يدخل المسلم المسجد برجله اليمنى ويقول: اللهم افتح لي أبواب رحمتك.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' },
					{ q: 'لا تصح صلاة الجماعة إلا إذا بلغ عدد المصلين عشرة أشخاص.', a: 'خطأ', c: 'تنعقد صلاة الجماعة باثنين على الأقل: إمام ومأموم.', mark: '0.5' },
					{ q: 'ينصت المأموم بخشوع لتلاوة الإمام في الصلاة الجهرية.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' },
					{ q: 'راوي حديث فضل صلاة الجماعة بسبع وعشرين درجة هو عبد الله بن عمر رضي الله عنهما.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' }
				],
				mcqQ: 'ما أقل عدد تنعقد به صلاة الجماعة؟',
				mcqCorrect: 'اثنان: إمام ومأموم',
				mcqDistractors: [
					{ text: 'شخص واحد يصلي منفرداً', diagnosticFeedback: 'الشخص الواحد يُسمى فذّاً لا جماعة.' },
					{ text: 'خمسة مصلين على الأقل', diagnosticFeedback: 'تنعقد الجماعة بإمام ومأموم واحد فأكثر.' },
					{ text: 'اثنا عشر مصلياً', diagnosticFeedback: 'يكفي إمام ومأموم لتتحقق الجماعة.' }
				]
			},
			{
				q1: 'اذكر أربعة آداب تلتزم بها عند ذهابك لصلاة الجماعة في المسجد.',
				a1: '1) الوضوء والمشي بسكينة ووقار. 2) دخول المسجد باليمنى والدعاء. 3) تسوية الصفوف والتراص فيها. 4) الخشوع ومتابعة الإمام دون مسابقته.',
				tfItems: [
					{ q: 'المقصود بصلاة الفذّ في الحديث هو صلاة المنفرد وحده.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' },
					{ q: 'يجوز اللعب والحديث أثناء انتظار الصلاة وإزعاج المصلين.', a: 'خطأ', c: 'المسجد بيت الله ويجب احترامه والهدوء والاشتغال بالذكر.', mark: '0.5' },
					{ q: 'إذا فاتتني ركعة مع الإمام أقوم بعد تسليمه فأتمّ ما فاتني.', a: 'صحيح', c: 'العبارة صحيحة.', mark: '0.5' },
					{ q: 'صلاة الجماعة تضعف الروابط بين سكان الحي.', a: 'خطأ', c: 'صلاة الجماعة تقوّي المحبة والأخوة والتعاون بين سكان الحي.', mark: '0.5' }
				],
				mcqQ: 'أيّ سلوك يوافق آداب صلاة الجماعة في المسجد؟',
				mcqCorrect: 'المشي بسكينة وتسوية الصفوف ومتابعة الإمام بخشوع',
				mcqDistractors: [
					{ text: 'الركض داخل المسجد ومسابقة الإمام في السجود', diagnosticFeedback: 'الركض ومسابقة الإمام يخالفان السنة النبوية.' },
					{ text: 'ترك فراغات كبيرة بين المصلين في الصف', diagnosticFeedback: 'السنة تسوية الصفوف والتراص وسدّ الفرج.' },
					{ text: 'التحدث بصوت مرتفع أثناء قراءة الإمام', diagnosticFeedback: 'الواجب الإنصات التام والخشوع في الصلاة.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.mcqQ,
			questionTextAr: v.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${v.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الثانية: صلاة الجماعة وفضلها',
			points: 3,
			instruction: 'اقرأ الحديث الشريف ثم أجب عن السؤالين:',
			content: [
				buildIllustratedFigureBlock('pri_isl_03_masjid_al_aqsa', {
					maxHeight: 112,
					width: '58%',
					mode: 'image_only',
					title: 'اجْتِمَاعُ المُسْلِمِينَ وَتَرَاصُّهُمْ فِي بُيُوتِ اللَّهِ'
				}),
				buildHadithPassageBlock({
					narrator: 'عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ:',
					text: 'صَلَاةُ الْجَمَاعَةِ تَفْضُلُ صَلَاةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً',
					source: 'متفق عليه'
				}),
				{ type: 'text', content: `1) ${v.q1}`, answer: v.a1, mark: '1' },
				{ type: 'text', content: '2) أجب بـ «صحيح» أو «خطأ» مع تصحيح الخطأ:' },
				{ type: 'true_false', items: v.tfItems }
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'تذكر حديث ابن عمر رضي الله عنهما: 27 درجة.',
				'الفذّ هو المنفرد، وأقل الجماعة إمام ومأموم.',
				'راجع آداب دخول المسجد وتسوية الصفوف ومتابعة الإمام.'
			],
			solutionStepsAr: [v.a1, ...v.tfItems.map((t) => `${t.q} ← ${t.a} (${t.c})`)],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. الوضعية الثانية (3 ن) — العبادات: المسح على الخفين
// ═══════════════════════════════════════════════════════════════════════════════
const mashKhuffayn3apT2: IslamicParameterizedTemplate = {
	id: 'isl_tpl_3ap_t2_mash_khuffayn',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'fiqh_ibadat',
	titleAr: 'الوضعية الثانية: المسح على الخفين وأحكامه',
	curriculumLessonId: 'isl_lesson_3ap_t2_mash_khuffayn',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variants = [
			{
				q1: 'ما الحكمة من مشروعية المسح على الخفين؟ وما الشرط الأساسي المذكور في الحديث الشريف؟',
				a1: 'الحكمة هي التيسير ورفع الحرج والمشقة خاصة في البرد والسفر. والشرط الأساسي هو لبس الخفين على طهارة كاملة (وضوء تام).',
				q2: 'اذكر مدة المسح على الخفين لكل من المقيم والمسافر.',
				a2: 'للمقيم يوم وليلة (24 ساعة)، وللمسافر ثلاثة أيام بلياليها (72 ساعة).',
				q3: 'اذكر مبطلين من مبطلات المسح على الخفين.',
				a3: '1) انتهاء المدة المحددة شرعاً. 2) نزع الخفين أو أحدهما (أو حدوث ما يوجب الغسل).',
				mcqQ: 'ما مدة المسح على الخفين للمسافر كما ثبت في صحيح مسلم؟',
				mcqCorrect: 'ثلاثة أيام بلياليها',
				mcqDistractors: [
					{ text: 'يوم وليلة فقط', diagnosticFeedback: 'يوم وليلة هي مدة المسح للمقيم لا للمسافر.' },
					{ text: 'أسبوع كامل', diagnosticFeedback: 'المدة الثابتة في الحديث للمسافر هي ثلاثة أيام بلياليها.' },
					{ text: 'صلاة واحدة فقط', diagnosticFeedback: 'شرع الله التيسير على المسافر بثلاثة أيام بلياليها.' }
				]
			},
			{
				q1: 'صف كيفية المسح الصحيحة على الخفين أثناء الوضوء.',
				a1: 'يبل المسلم يديه بالماء ثم يمسح ظاهر الخف (أعلاه) مرة واحدة من أطراف الأصابع إلى بداية الساق، ولا يمسح أسفله.',
				q2: 'توضأ «سعد» وغسل قدميه ثم لبس جوربين صفيقين ساترين للكعبين، وبعد ساعات نقض وضوءه. هل يجوز له المسح عليهما؟ ولماذا؟',
				a2: 'نعم يجوز له المسح عليهما؛ لأنه لبسهما على طهارة كاملة وكانا طاهرين ساترين للقدمين مع الكعبين.',
				q3: 'لماذا لا يجوز المسح على الخفين عند وجوب الغسل (الحدث الأكبر)؟',
				a3: 'لأن رخصة المسح على الخفين خاصة بالوضوء (الحدث الأصغر) فقط، أما الحدث الأكبر فيجب فيه نزع الخفين وغسل الجسم كله.',
				mcqQ: 'أي جزء من الخف يمسحه المتوضئ وفق السنة النبوية؟',
				mcqCorrect: 'أعلى الخف (ظاهره) مرة واحدة',
				mcqDistractors: [
					{ text: 'أسفل الخف فقط', diagnosticFeedback: 'ثبت في السنة المسح على أعلى الخف لا أسفله.' },
					{ text: 'كعب الخف من الخلف فقط', diagnosticFeedback: 'يمسح أعلى الخف من الأصابع نحو الساق.' },
					{ text: 'لا يمسح بالماء بل ينفض الغبار عنه', diagnosticFeedback: 'المسح يكون بيد مبللة بالماء على ظاهر الخف.' }
				]
			},
			{
				q1: 'اذكر ثلاثة شروط يجب توفرها لصحة المسح على الخفين.',
				a1: '1) لبسهما على طهارة كاملة (بعد وضوء). 2) أن يكونا طاهرين وساترين للقدمين مع الكعبين. 3) أن يكون المسح في المدة الشرعية وفي الحدث الأصغر.',
				q2: 'لبست «سارة» جوربيها دون وضوء ثم أرادت المسح عليهما لصلاة العصر. ما الحكم الشرعي؟',
				a2: 'لا يصح مسحها؛ لأنها لم تلبسهما على طهارة، فعليها نزعهما وغسل قدميها في الوضوء.',
				q3: 'كم تبلغ مدة المسح على الخفين للمقيم؟ ومتى تبدأ؟',
				a3: 'تبلغ يوماً وليلة (24 ساعة)، وتبدأ من أول مسح بعد الحدث.',
				mcqQ: 'متى يبطل المسح على الخفين؟',
				mcqCorrect: 'بانتهاء المدة الشرعية أو بنزع الخفين أو بوجوب الغسل',
				mcqDistractors: [
					{ text: 'بمجرد المشي بهما داخل البيت', diagnosticFeedback: 'المشي بالخفين الطاهرين لا يبطل المسح.' },
					{ text: 'بعد صلاة واحدة مباشرة', diagnosticFeedback: 'المسح يستمر يوماً وليلة للمقيم وثلاثة أيام للمسافر.' },
					{ text: 'عند دخول فصل الصيف', diagnosticFeedback: 'رخصة المسح مشروعة في الصيف والشتاء ما توفرت شروطها.' }
				]
			}
		];

		const v = rng.pick(variants);
		const mcq = buildUniqueMcqOptions(v.mcqCorrect, v.mcqDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.mcqQ,
			questionTextAr: v.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة هي: «${v.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الثانية: المسح على الخفين',
			points: 3,
			instruction: 'اقرأ الحديث الشريف ثم أجب عن الأسئلة الآتية:',
			content: [
				buildIllustratedFigureBlock('pri_isl_05_wudu_water_pitcher', {
					maxHeight: 112,
					width: '58%',
					mode: 'image_only',
					title: 'تَيْسِيرُ الطَّهَارَةِ وَالوُضُوءِ فِي الإِسْلَامِ'
				}),
				buildHadithPassageBlock({
					narrator: 'عَنِ الْمُغِيرَةِ بْنِ شُعْبَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّهُ أَهْوَى لِيَنْزِعَ خُفَّيِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ:',
					text: 'دَعْهُمَا، فَإِنِّي أَدْخَلْتُهُمَا طَاهِرَتَيْنِ',
					source: 'متفق عليه'
				}),
				{ type: 'text', content: `1) ${v.q1}`, answer: v.a1, mark: '1' },
				{ type: 'text', content: `2) ${v.q2}`, answer: v.a2, mark: '1' },
				{ type: 'text', content: `3) ${v.q3}`, answer: v.a3, mark: '1' }
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الشرط الأساسي مذكور في الحديث: إدخال القدمين في الخفين على طهارة.',
				'تذكر المدة: يوم وليلة للمقيم، وثلاثة أيام بلياليها للمسافر.',
				'المسح يكون على أعلى الخف مرة واحدة في الوضوء فقط.'
			],
			solutionStepsAr: [v.a1, v.a2, v.a3],
			finalAnswer: v.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. الوضعية الإدماجية (4 ن) — إدماج معارف الفصل الثاني (3AP T2)
// ═══════════════════════════════════════════════════════════════════════════════
const integration3apT2: IslamicParameterizedTemplate = {
	id: 'isl_tpl_3ap_t2_integration',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تعظيم القرآن وصلاة الجماعة والتيسير في الطهارة',
	curriculumLessonId: 'isl_lesson_3ap_t2_salat_jamaah',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const prompts = [
			{
				context: 'في يوم شتوي بارد، تكاسل صديقك عن الذهاب إلى المسجد لصلاة العصر جماعة بحجة شدة البرد عند غسل القدمين في الوضوء.',
				supportQuote: 'قال رسول الله صلى الله عليه وسلم: صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة.',
				instruction: 'اكتب فقرة من 5 إلى 6 أسطر تشجع فيها صديقك على صلاة الجماعة، مبيّناً فضلها وآدابها، ومذكراً إياه برخصة المسح على الخفين وشروطها، وحثّه على تثقيل موازين حسناته ليوم القيامة.',
				rubricCriteria: [
					'الوجاهة وتناول المحاور الثلاثة (فضل صلاة الجماعة + المسح على الخفين + تثقيل الموازين): 1.5 ن',
					'توظيف دليل شرعي صحيح (حديث الجماعة أو المسح أو آية من سورة القارعة): 1 ن',
					'سلامة اللغة وترابط الجمل: 1 ن',
					'وضوح الخط وتنظيم الفقرة: 0.5 ن'
				],
				modelOutline:
					'يا صديقي العزيز، إن صلاة الجماعة لها أجر عظيم؛ فقد قال النبي صلى الله عليه وسلم: صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة. وقد يسّر الله لنا الطهارة في البرد برخصة المسح على الخفين بشرط لبسهما على طهارة، لمدة يوم وليلة للمقيم. فلنذهب معاً إلى المسجد بسكينة ووقار ولنسوّ الصفوف خلف الإمام، حتى تثقل موازين حسناتنا يوم القارعة ونفوز بعيشة راضية في الجنة.',
				mcqQ: 'كيف تساعد صديقك المتكاسل عن صلاة الجماعة في البرد؟',
				mcqCorrect: 'أذكره بأجر الجماعة (27 درجة) وأرشده لرخصة المسح على الخفين بشروطها',
				mcqDistractors: [
					{ text: 'أنصحه بترك الصلاة حتى يصبح الجو دافئاً', diagnosticFeedback: 'لا يجوز ترك الصلاة بأي حال.' },
					{ text: 'أخبره بأن المسح على الخفين لا يشترط الطهارة قبله', diagnosticFeedback: 'يشترط لبس الخفين على طهارة كاملة.' },
					{ text: 'أقول له إن صلاة المنفرد أفضل من الجماعة', diagnosticFeedback: 'صلاة الجماعة تفضل صلاة الفذ بسبع وعشرين درجة.' }
				]
			},
			{
				context: 'سألك أخوك الصغير بعد تلاوة سورتي القارعة والعاديات: لماذا أنزل الله القرآن الكريم علينا؟ وكيف نستعد ليوم القيامة؟',
				supportQuote: 'قال الله تعالى: فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ.',
				instruction: 'حرّر إجابة واضحة من 5 إلى 6 أسطر توضح فيها لأخيك مكانة القرآن الكريم بين الكتب السماوية، وواجبنا نحوه، وكيف نثقّل موازيننا بشكر النعم وصلاة الجماعة.',
				rubricCriteria: [
					'الوجاهة (مكانة القرآن الكريم + شكر النعم + صلاة الجماعة وتثقيل الموازين): 1.5 ن',
					'توظيف شاهد قرآني أو نبوي صحيح: 1 ن',
					'سلامة الأسلوب واللغة: 1 ن',
					'الإتقان وجودة الخط: 0.5 ن'
				],
				modelOutline:
					'أنزل الله القرآن الكريم على نبينا محمد صلى الله عليه وسلم لهداية الناس، وهو خاتم الكتب السماوية والمحفوظ من التحريف. وواجبنا أن نعظمه ونتلوه ونعمل به. كما نستعد ليوم القيامة بشكر الله على نعمه وعدم جحودها، والمحافظة على صلاة الجماعة لأنها تفضل صلاة الفذ بسبع وعشرين درجة، حتى تثقل موازيننا فنكون في عيشة راضية كما قال تعالى في سورة القارعة.',
				mcqQ: 'أيّ فكرة تجمع بين دروس الإيمان بالكتب وسورة القارعة في سلوك المسلم؟',
				mcqCorrect: 'العمل بالقرآن الكريم المحفوظ والمحافظة على الصالحات لتثقل الموازين يوم القيامة',
				mcqDistractors: [
					{ text: 'ترك قراءة القرآن والانشغال بحب المال وحده', diagnosticFeedback: 'القرآن دستور حياتنا وحب المال المفرط مذموم في سورة العاديات.' },
					{ text: 'العمل بالكتب المحرفة وترك القرآن الكريم', diagnosticFeedback: 'القرآن ناسخ لما قبله وهو وحده المحفوظ من التحريف.' },
					{ text: 'الظن أن الأعمال لا توزن يوم القيامة', diagnosticFeedback: 'أثبتت سورة القارعة وزن الأعمال يوم القيامة.' }
				]
			},
			{
				context: 'أثناء سفر عائلتك لزيارة الجدّة، حلّ وقت صلاة الظهر وتوقفتم عند مسجد على الطريق، فتوضأ أبوك ومسح على خفّيه ثم صليتم جماعة.',
				supportQuote: 'عن المغيرة بن شعبة رضي الله عنه قال النبي صلى الله عليه وسلم: دعهما فإني أدخلتهما طاهرتين.',
				instruction: 'اكتب فقرة من 5 إلى 6 أسطر تشرح فيها ما تعلمته في هذه الرحلة عن شروط المسح على الخفين ومدته للمسافر، وفضل صلاة الجماعة، وشكر الله على نعمة التيسير في الإسلام.',
				rubricCriteria: [
					'الوجاهة (المسح على الخفين ومدته للمسافر + فضل صلاة الجماعة + شكر الله): 1.5 ن',
					'توظيف دليل صحيح من السنة أو القرآن: 1 ن',
					'سلامة اللغة والترابط: 1 ن',
					'جودة التنظيم والخط: 0.5 ن'
				],
				modelOutline:
					'ديننا الإسلامي دين يسر ورحمة؛ ففي سفرنا توضأ أبي ومسح على ظاهر خفّيه لأنه لبسهما على طهارة كاملة كما فعل النبي صلى الله عليه وسلم، وللمسافر أن يمسح ثلاثة أيام بلياليها. ثم صلينا الظهر جماعة لننال أجر سبع وعشرين درجة، وحمدنا الله وشكرناه على نعمه الكثيرة حتى لا نكون من الكنود الجاحدين لنعم الله.',
				mcqQ: 'كم مدة المسح على الخفين التي يستفيد منها المسلم في سفره إذا لبسهما على طهارة؟',
				mcqCorrect: 'ثلاثة أيام بلياليها',
				mcqDistractors: [
					{ text: 'يوم وليلة فقط', diagnosticFeedback: 'يوم وليلة للمقيم، أما المسافر فله ثلاثة أيام بلياليها.' },
					{ text: 'ست ساعات فقط', diagnosticFeedback: 'مدة المسح للمسافر 72 ساعة أي ثلاثة أيام بلياليها.' },
					{ text: 'لا يجوز المسح في السفر', diagnosticFeedback: 'ثبت مسح النبي صلى الله عليه وسلم على خفيه في السفر في الصحيحين.' }
				]
			}
		];

		const pr = rng.pick(prompts);
		const mcq = buildUniqueMcqOptions(pr.mcqCorrect, pr.mcqDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: pr.mcqQ,
			questionTextAr: pr.mcqQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الخيار الصحيح هو: «${pr.mcqCorrect}».`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 4,
			content: [
				buildIslamicIntegrationBlock({
					context: pr.context,
					supportQuote: pr.supportQuote,
					instruction: pr.instruction,
					rubricCriteria: pr.rubricCriteria,
					modelOutline: pr.modelOutline,
					mark: '4'
				})
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اذكر جميع الأفكار المطلوبة في التعليمة بترتيب واضح.',
				'استشهد بحديث صحيح أو آية كريمة من محفوظات الفصل الثاني.',
				'راجع سلامة الأخطاء الإملائية ووضوح الخط.'
			],
			solutionStepsAr: [
				'فهم السياق وتحديد عناصر الإجابة (5 إلى 6 أسطر).',
				'ربط الدروس الشرعية بواقع التلميذ اليومي مع الشاهد الصحيح.',
				`نموذج مقترح: ${pr.modelOutline}`
			],
			finalAnswer: pr.mcqCorrect
		};
	}
};

export const TEMPLATES_3AP_T2: IslamicParameterizedTemplate[] = [
	quranQariahAdiyat3apT2,
	imanKutub3apT2,
	salatJamaah3apT2,
	mashKhuffayn3apT2,
	integration3apT2
];
