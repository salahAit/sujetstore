import type {
	Difficulty,
	IslamicGeneratedExerciseInstance,
	IslamicParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildHadithPassageBlock,
	buildIslamicContextBlock,
	buildIslamicIntegrationBlock,
	buildIslamicTableBlock,
	buildQuranPassageBlock
} from '../../islamic-helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين والاختبارات — السنة الخامسة ابتدائي — التربية الإسلامية — الفصل الأول
// (تشمل مهام امتحان تقييم المكتسبات: فهم السند الشرعي، توظيف الأحكام، الإنتاج القيمي)
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. الجزء الأول (كفاءة تلاوة وفهم السند القرآني): سورة البلد
// ───────────────────────────────────────────────────────────────────────────────
interface BaladVariant {
	verses: string;
	ayahRange: string;
	vocabulary: Array<{ word: string; meaning: string }>;
	completePrompt: string;
	completeAnswer: string;
	vocabRows: Array<{ word: string; meaning: string }>;
	guidancePrompt: string;
	guidanceAnswer: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const BALAD_VARIANTS: readonly BaladVariant[] = [
	{
		verses: 'لَا أُقْسِمُ بِهَذَا الْبَلَدِ (1) وَأَنْتَ حِلٌّ بِهَذَا الْبَلَدِ (2) وَوَالِدٍ وَمَا وَلَدَ (3) لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي كَبَدٍ (4) أَيَحْسَبُ أَنْ لَنْ يَقْدِرَ عَلَيْهِ أَحَدٌ (5) يَقُولُ أَهْلَكْتُ مَالًا لُبَدًا (6) أَيَحْسَبُ أَنْ لَمْ يَرَهُ أَحَدٌ (7) أَلَمْ نَجْعَلْ لَهُ عَيْنَيْنِ (8) وَلِسَانًا وَشَفَتَيْنِ (9) وَهَدَيْنَاهُ النَّجْدَيْنِ (10)',
		ayahRange: '1 – 10',
		vocabulary: [
			{ word: 'كبد', meaning: 'مشقة وتعب ومكابدة' },
			{ word: 'لبدا', meaning: 'مالاً كثيراً متراكماً' }
		],
		completePrompt: '1) اذكر المقصود بـ«البلد» الذي أقسم الله به في مطلع السورة، وعدّد ثلاث نعم أنعم الله بها على الإنسان في الآيات (8 – 10).',
		completeAnswer: '1) المقصود بالبلد: مكة المكرمة (البلد الحرام). النعم المذكورة: العينان، اللسان والشفتان، وهدايته النجدين (بيان طريق الخير وطريق الشر).',
		vocabRows: [
			{ word: 'الْبَلَدِ', meaning: 'مكة المكرمة (البلد الحرام)' },
			{ word: 'فِي كَبَدٍ', meaning: 'في مشقة وتعب ومكابدة' },
			{ word: 'مَالًا لُبَدًا', meaning: 'مالاً كثيراً متراكماً' },
			{ word: 'النَّجْدَيْنِ', meaning: 'طريق الخير وطريق الشر' }
		],
		guidancePrompt: '3) ما الأثر الإيماني الذي يغرسه قوله تعالى: ﴿أَيَحْسَبُ أَنْ لَمْ يَرَهُ أَحَدٌ﴾ في نفس المسلم؟',
		guidanceAnswer: '3) يغرس في نفسه استشعار مراقبة الله تعالى له في السر والعلن، فيُخلص عمله ويترك المعاصي.',
		quizPrompt: 'ما المقصود بقوله تعالى في سورة البلد: ﴿وَهَدَيْنَاهُ النَّجْدَيْنِ﴾؟',
		quizCorrect: 'بيّن الله للإنسان طريق الخير وطريق الشر ليميز بينهما',
		quizDistractors: [
			{ text: 'أعطاه الله جبلين من ذهب وفضة', diagnosticFeedback: 'النجدان في السورة هما طريقا الخير والشر لا جبلان من مال.' },
			{ text: 'خلق له عينين يبصر بهما فقط', diagnosticFeedback: 'العينان ذُكرتا في الآية السابقة، أما النجدان فهما طريقا الخير والشر.' },
			{ text: 'أمره بالسفر بين مدينتين مختلفتين', diagnosticFeedback: 'المعنى المراد هو الهداية وبيان طريقي الحق والباطل.' }
		]
	},
	{
		verses: 'فَلَا اقْتَحَمَ الْعَقَبَةَ (11) وَمَا أَدْرَاكَ مَا الْعَقَبَةُ (12) فَكُّ رَقَبَةٍ (13) أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ (14) يَتِيمًا ذَا مَقْرَبَةٍ (15) أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ (16)',
		ayahRange: '11 – 16',
		vocabulary: [
			{ word: 'مسغبة', meaning: 'مجاعة وشدة جوع' },
			{ word: 'متربة', meaning: 'فقر شديد' }
		],
		completePrompt: '1) عدّد أعمال البر التي بيّنها الله تعالى لتجاوز العقبة ونيل الأجر العظيم انطلاقاً من السند القرآني.',
		completeAnswer: '1) فكّ الرقبة (عتق المملوك)، وإطعام الطعام وقت المجاعة والشدة ليتيم قريب أو مسكين شديد الفقر.',
		vocabRows: [
			{ word: 'فَكُّ رَقَبَةٍ', meaning: 'عتق المملوك وتحريره لوجه الله' },
			{ word: 'ذِي مَسْغَبَةٍ', meaning: 'يوم فيه مجاعة وشدة جوع' },
			{ word: 'ذَا مَقْرَبَةٍ', meaning: 'يتيماً له صلة قرابة ورحم' },
			{ word: 'ذَا مَتْرَبَةٍ', meaning: 'مسكيناً شديد الفقر والحاجة' }
		],
		guidancePrompt: '3) لماذا كان إطعام اليتيم ذي المقربة أعظم أجراً في الإسلام؟',
		guidanceAnswer: '3) لأنه يجمع بين أجر الصدقة والإحسان إلى اليتيم وأجر صلة الرحم معاً.',
		quizPrompt: 'أيّ وصفٍ في سورة البلد يدلّ على المسكين الشديد الفقر الذي لا يجد قوت يومه؟',
		quizCorrect: 'مِسْكِينًا ذَا مَتْرَبَةٍ',
		quizDistractors: [
			{ text: 'مَالًا لُبَدًا', diagnosticFeedback: 'مالاً لبداً معناها مالاً كثيراً متراكماً.' },
			{ text: 'يَتِيمًا ذَا مَقْرَبَةٍ', diagnosticFeedback: 'هذا وصف اليتيم القريب، أما المسكين الشديد الفقر فوصفته الآية بـ«ذا متربة».' },
			{ text: 'نَارٌ مُؤْصَدَةٌ', diagnosticFeedback: 'هذا وصف عذاب الكافرين في ختام السورة.' }
		]
	},
	{
		verses: 'ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ (17) أُولَئِكَ أَصْحَابُ الْمَيْمَنَةِ (18) وَالَّذِينَ كَفَرُوا بِآيَاتِنَا هُمْ أَصْحَابُ الْمَشْأَمَةِ (19) عَلَيْهِمْ نَارٌ مُؤْصَدَةٌ (20)',
		ayahRange: '17 – 20',
		vocabulary: [
			{ word: 'المرحمة', meaning: 'الرحمة والتعاطف بين المؤمنين' },
			{ word: 'مؤصدة', meaning: 'مغلقة مطبقة' }
		],
		completePrompt: '1) اذكر ثلاث صفات تميّز أصحاب الميمنة كما وردت في الآية السابعة عشرة من سورة البلد.',
		completeAnswer: '1) الإيمان الصادق بالله، والتواصي بالصبر على الطاعة وعن المعصية، والتواصي بالمرحمة والرفق بالخلق.',
		vocabRows: [
			{ word: 'تَوَاصَوْا بِالصَّبْرِ', meaning: 'أوصى بعضهم بعضاً بالصبر والثبات' },
			{ word: 'الْمَرْحَمَةِ', meaning: 'التراحم والرفق والشفقة على الخلق' },
			{ word: 'أَصْحَابُ الْمَيْمَنَةِ', meaning: 'أهل اليمين السعداء أهل الجنة' },
			{ word: 'نَارٌ مُؤْصَدَةٌ', meaning: 'نار مغلقة مطبقة على الكافرين' }
		],
		guidancePrompt: '3) بيّن لماذا قرن الله تعالى أعمال البرّ بالإيمان قبل الحكم بدخول صفوف أصحاب الميمنة.',
		guidanceAnswer: '3) لأن الإيمان بالله تعالى هو شرط قبول الأعمال الصالحة، ولا ينفع عمل برٍّ يوم القيامة دون إيمان وتوحيد.',
		quizPrompt: 'ما جزاء أصحاب المشأمة الذين كفروا بآيات الله في ختام سورة البلد؟',
		quizCorrect: 'عليهم نارٌ مُؤصدةٌ مغلقة ومطبقة عليهم',
		quizDistractors: [
			{ text: 'هم أصحاب الميمنة الفائزون بالجنة', diagnosticFeedback: 'أصحاب الميمنة هم المؤمنون المتواصون بالصبر والمرحمة.' },
			{ text: 'يُغفر لهم دون إيمان أو عمل صالح', diagnosticFeedback: 'الآيات تؤكد أن الكافرين هم أصحاب المشأمة ولهم نار مؤصدة.' },
			{ text: 'لا يُحاسبون على أعمالهم يوم القيامة', diagnosticFeedback: 'الله تعالى يحاسب جميع الخلائق بالعدل يوم القيامة.' }
		]
	}
];

const tplBaladRecitationT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_balad_recitation_understanding',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'quran_tafsir',
	titleAr: 'تقييم المكتسبات (القرآن الكريم): فهم سورة البلد ومفرداتها',
	curriculumLessonId: 'isl_lesson_5ap_t1_surah_al_balad',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 31 + 11);
		const v = rng.pick(BALAD_VARIANTS);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ الآيات الكريمة من سورة البلد (${v.ayahRange}) ثم أجب:\n\n> ﴿${v.verses}﴾\n\n**السؤال:** ${v.quizPrompt}`,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة وفق معاني سورة البلد: ${v.quizCorrect}.`
		};

		const content: ContentBlock[] = [
			buildQuranPassageBlock({
				verses: v.verses,
				surah: 'البلد',
				ayahRange: v.ayahRange,
				vocabulary: v.vocabulary
			}),
			{
				type: 'text',
				content: v.completePrompt,
				answer: v.completeAnswer,
				mark: '0.5'
			},
			{
				type: 'text',
				content: '2) أكمل جدول شرح المفردات القرآنية الآتي بدقة:'
			},
			buildIslamicTableBlock(
				['الكلمة أو العبارة القرآنية', 'معناها الصحيح'],
				v.vocabRows.map((row) => [
					{ label: row.word, bold: true },
					{ answer: row.meaning, mark: '0.5' }
				])
			),
			{
				type: 'text',
				content: v.guidancePrompt,
				answer: v.guidanceAnswer,
				mark: '0.5'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الأولى: كفاءة تلاوة وفهم السند القرآني (سورة البلد)',
			points: 3,
			instruction: 'اقرأ السند القرآني الآتي قراءة متدبّرة ثم أجب عن الأسئلة:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ الآيات الكريمة ببطء واستعن بشرح المفردات لفهم المعنى العام.',
				'تذكّر أن سورة البلد مكية وتدعو إلى الإيمان والإحسان لليتيم والمسكين.',
				'اربط بين المعنى اللغوي للمفردة وسياقها داخل الآية.'
			],
			solutionStepsAr: [
				v.completeAnswer,
				`شرح المفردات: ${v.vocabRows.map((r) => `${r.word}: ${r.meaning}`).join(' — ')}.`,
				v.guidanceAnswer
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. الجزء الأول (العقيدة والحديث): الإيمان باليوم الآخر والاستعداد له
// ───────────────────────────────────────────────────────────────────────────────
interface YawmAkhirVariant {
	stimulusKind: 'quran' | 'hadith';
	quran?: { verses: string; surah: string; ayahRange: string };
	hadith?: { narrator: string; text: string; source: string };
	tfItems: Array<{ q: string; a: string; c: string; mark: string }>;
	openQ: string;
	openA: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const YAWM_AKHIR_VARIANTS: readonly YawmAkhirVariant[] = [
	{
		stimulusKind: 'hadith',
		hadith: {
			narrator: 'عن عمر بن الخطاب رضي الله عنه أن النبي صلى الله عليه وسلم قال لما سأله جبريل عليه السلام عن الإيمان:',
			text: 'أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
			source: 'رواه مسلم'
		},
		tfItems: [
			{
				q: 'الإيمان باليوم الآخر هو الركن الخامس من أركان الإيمان الستة.',
				a: 'صحيح',
				c: 'العبارة صحيحة بنص حديث جبريل عليه السلام في صحيح مسلم.',
				mark: '0.5'
			},
			{
				q: 'يستطيع بعض البشر معرفة موعد قيام الساعة بدقة.',
				a: 'خطأ',
				c: 'لا يعلم وقت قيام الساعة إلا الله وحده سبحانه وتعالى.',
				mark: '0.5'
			},
			{
				q: 'من مشاهد اليوم الآخر: البعث والحشر والحساب والميزان والجنة والنار.',
				a: 'صحيح',
				c: 'العبارة صحيحة وتجب الإيمان بها جميعاً.',
				mark: '0.5'
			},
			{
				q: 'الإيمان باليوم الآخر يدفع المسلم إلى التكاسل عن العمل الصالح.',
				a: 'خطأ',
				c: 'الإيمان باليوم الآخر يحفّز المسلم على مراقبة الله والإكثار من الأعمال الصالحة.',
				mark: '0.5'
			}
		],
		openQ: '2) لماذا سُمّي يوم القيامة بـ«اليوم الآخر»؟ واذكر اسمين آخرين له من القرآن الكريم.',
		openA: '2) سُمّي باليوم الآخر لأنه لا يوم بعده؛ ومن أسمائه في القرآن: يوم الدين، يوم الحساب، يوم الفصل، الغاشية، القارعة.',
		quizPrompt: 'ما ترتيب الإيمان باليوم الآخر ضمن أركان الإيمان الستة في حديث جبريل عليه السلام؟',
		quizCorrect: 'الركن الخامس من أركان الإيمان الستة',
		quizDistractors: [
			{ text: 'الركن الأول من أركان الإسلام', diagnosticFeedback: 'الركن الأول من أركان الإسلام هو الشهادتان، أما اليوم الآخر فمن أركان الإيمان.' },
			{ text: 'الركن الثاني من أركان الإيمان', diagnosticFeedback: 'الركن الثاني من أركان الإيمان هو الإيمان بالملائكة.' },
			{ text: 'ليس ركناً وإنما أمر مستحب فقط', diagnosticFeedback: 'الإيمان باليوم الآخر ركن واجب لا يصح الإيمان بدونه.' }
		]
	},
	{
		stimulusKind: 'quran',
		quran: {
			verses: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ (7) وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ (8)',
			surah: 'الزلزلة',
			ayahRange: '7 – 8'
		},
		tfItems: [
			{
				q: 'يحاسب الله العباد يوم القيامة على أعمالهم الكبيرة فقط ويترك الصغيرة.',
				a: 'خطأ',
				c: 'يحاسب الله العباد على كل عمل صغيراً كان أم كبيراً ولو كان مثقال ذرة.',
				mark: '0.5'
			},
			{
				q: 'الميزان يوم القيامة ميزان حق وعدل لا يُظلم فيه أحد.',
				a: 'صحيح',
				c: 'العبارة صحيحة، قال تعالى: ﴿وَهُمْ لَا يُظْلَمُونَ﴾.',
				mark: '0.5'
			},
			{
				q: 'من الأعمال التي يستعد بها التلميذ لليوم الآخر: المحافظة على الصلاة وبر الوالدين والصدق.',
				a: 'صحيح',
				c: 'العبارة صحيحة؛ فالفرائض والأخلاق الحسنة زاد المؤمن لآخرته.',
				mark: '0.5'
			},
			{
				q: 'المال والأهل يدخلان مع الميت قبره وينفعانه دون عمل صالح.',
				a: 'خطأ',
				c: 'يرجع الأهل والمال ولا يبقى مع الإنسان في قبره إلا عمله.',
				mark: '0.5'
			}
		],
		openQ: '2) كيف تؤثر آيتا سورة الزلزلة في سلوك التلميذ داخل القسم والبيت؟',
		openA: '2) تجعل التلميذ يراقب الله في كل قول وفعل، فيحرص على فعل الخير ولو كان يسيراً كالكلمة الطيبة وإماطة الأذى، ويجتنب الشر ولو كان صغيراً.',
		quizPrompt: 'على أي أصلٍ إيماني عظيم تدلّ آيتا سورة الزلزلة: ﴿فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ...﴾؟',
		quizCorrect: 'كمال عدل الله في الحساب والجزاء على كل عمل صغر أم كبر يوم القيامة',
		quizDistractors: [
			{ text: 'أن الأعمال الصغيرة لا قيمة لها في ميزان الحسنات', diagnosticFeedback: 'الآية تثبت أن مثقال ذرة من خير يُثاب عليه العبد.' },
			{ text: 'أن الإنسان لا يُبعث بعد الموت', diagnosticFeedback: 'الآية تثبت البعث والحساب ورؤية جزاء الأعمال.' },
			{ text: 'أن الحساب خاص ببعض الناس دون غيرهم', diagnosticFeedback: 'كلمة «من يعمل» عامة تشمل جميع المكلفين.' }
		]
	},
	{
		stimulusKind: 'hadith',
		hadith: {
			narrator: 'عن أبي هريرة رضي الله عنه أن رسول الله صلى الله عليه وسلم قال:',
			text: 'إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
			source: 'رواه مسلم'
		},
		tfItems: [
			{
				q: 'ينقطع أجر الصدقة الجارية بمجرد وفاة صاحبها.',
				a: 'خطأ',
				c: 'يستمر أجر الصدقة الجارية لصاحبها ما دام الناس ينتفعون بها.',
				mark: '0.5'
			},
			{
				q: 'غرس شجرة مثمرة أو المساهمة في بناء مسجد من أمثلة الصدقة الجارية.',
				a: 'صحيح',
				c: 'العبارة صحيحة لأن نفعها مستمر وجارٍ للناس.',
				mark: '0.5'
			},
			{
				q: 'دعاء الولد الصالح لوالديه ينفعهما بعد موتهما.',
				a: 'صحيح',
				c: 'العبارة صحيحة بنص الحديث الصحيح في صحيح مسلم.',
				mark: '0.5'
			},
			{
				q: 'البعث بعد الموت ليس من الإيمان باليوم الآخر.',
				a: 'خطأ',
				c: 'البعث بعد الموت أصل عظيم من أصول الإيمان باليوم الآخر.',
				mark: '0.5'
			}
		],
		openQ: '2) اذكر الأعمال الثلاثة التي يستمر ثوابها بعد موت الإنسان، مع إعطاء مثال واحد على «العلم النافع».',
		openA: '2) الأعمال الثلاثة: الصدقة الجارية، والعلم الذي يُنتفع به، والولد الصالح الذي يدعو لوالديه. مثال العلم النافع: تعليم القرآن والعلوم المفيدة أو تأليف كتاب نافع.',
		quizPrompt: 'ما الأعمال الثلاثة التي لا ينقطع أجرها بعد موت الإنسان في حديث أبي هريرة رضي الله عنه (رواه مسلم)؟',
		quizCorrect: 'صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له',
		quizDistractors: [
			{ text: 'كثرة الذهب والفضة والقصور فقط', diagnosticFeedback: 'المال الذي لا يُنفق في الصدقة الجارية يرجع للورثة ولا ينفع الميت.' },
			{ text: 'المدح والشهرة بين الناس فقط', diagnosticFeedback: 'الشهرة لا تنفع بعد الموت ما لم تقترن بعمل صالح مخلص.' },
			{ text: 'الغفلة والتسويف وترك الفرائض', diagnosticFeedback: 'التسويف يضيّع العمر عن الاستعداد لليوم الآخر.' }
		]
	}
];

const tplImanYawmAkhirT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_iman_yawm_akhir_aqeedah',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'aqeedah',
	titleAr: 'العقيدة الإسلامية: الإيمان باليوم الآخر والاستعداد له',
	curriculumLessonId: 'isl_lesson_5ap_t1_iman_yawm_akhir',
	defaultPoints: 3,
	onecRole: 'part1_knowledge',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 43 + 17);
		const v = rng.pick(YAWM_AKHIR_VARIANTS);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.quizPrompt,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الجواب الصحيح وفق العقيدة الإسلامية: ${v.quizCorrect}.`
		};

		const stimulusBlock: ContentBlock =
			v.stimulusKind === 'quran' && v.quran
				? buildQuranPassageBlock({
						verses: v.quran.verses,
						surah: v.quran.surah,
						ayahRange: v.quran.ayahRange
					})
				: buildHadithPassageBlock({
						narrator: v.hadith!.narrator,
						text: v.hadith!.text,
						source: v.hadith!.source
					});

		const content: ContentBlock[] = [
			stimulusBlock,
			{
				type: 'text',
				content: '1) أجب بـ«صحيح» أو «خطأ» مع تصحيح الخطأ إن وُجد:'
			},
			{
				type: 'true_false',
				items: v.tfItems
			},
			{
				type: 'text',
				content: v.openQ,
				answer: v.openA,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الأولى (العقيدة): الإيمان باليوم الآخر والاستعداد له',
			points: 3,
			instruction: 'اقرأ السند الشرعي الآتي ثم أجب بدقة عن المطلوب:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'تذكّر أركان الإيمان الستة في حديث جبريل عليه السلام.',
				'اقرأ كل عبارة في (صحيح / خطأ) كاملة قبل الحكم عليها ولا تنسَ التصحيح.',
				'اربط الإيمان باليوم الآخر بالاستعداد له بالعمل الصالح والصدقة الجارية.'
			],
			solutionStepsAr: [
				...v.tfItems.map((it) => `${it.q} -> ${it.a} (${it.c})`),
				v.openA
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. الجزء الثاني (تقييم المكتسبات — توظيف الأحكام الشرعية): التيمم وأحكامه
// ───────────────────────────────────────────────────────────────────────────────
interface TayammumVariant {
	caseTitle: string;
	caseText: string;
	tableHeaders: [string, string];
	tableRows: Array<{ label: string; answer: string }>;
	applyQ: string;
	applyA: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const TAYAMMUM_VARIANTS: readonly TayammumVariant[] = [
	{
		caseTitle: 'حالة فقهية: المسافر وانقطاع الماء',
		caseText:
			'سافر خالد مع أبيه عبر طريق صحراوي طويل، فدخل وقت صلاة العصر ولم يجدوا ماءً للوضوء بعد البحث، وكان معهما ماء قليل يكفي للشرب فقط. فتذكّر خالد درس التيمم في التربية الإسلامية وتلا آية سورة المائدة عن الصعيد الطيب.',
		tableHeaders: ['العنصر الفقهي', 'الحكم أو التوضيح الصحيح'],
		tableRows: [
			{ label: 'حكم التيمم في هذه الحالة', answer: 'مشروع وجائز لعدم وجود ماء يكفي للوضوء' },
			{ label: 'ما يُتيمم به', answer: 'الصعيد الطاهر كالتراب أو الرمل أو الحجر الطاهر' },
			{ label: 'العضوان الممسوحان في التيمم', answer: 'الوجه واليدان فقط' },
			{ label: 'الركن القلبي الأول في التيمم', answer: 'النية لاستباحة الصلاة' }
		],
		applyQ: '2) اشرح لخالد كيفية التيمم الصحيحة في أربع خطوات مرتّبة، واذكر حكمة تشريع التيمم.',
		applyA: '2) الخطوات: النية والتسمية، ثم الضرب بالكفين على الصعيد الطاهر والنفخ فيهما بلطف، ثم مسح الوجه كاملاً، ثم مسح اليدين (الكفين). الحكمة: التيسير ورفع الحرج والمحافظة على الصلاة في وقتها.',
		quizPrompt: 'مع المسافر ماء قليل يكفي للشرب فقط ودخل وقت الصلاة. ما الحكم الشرعي الصحيح؟',
		quizCorrect: 'يحتفظ بالماء للشرب ويتيمم بالصعيد الطاهر ويصلي في الوقت',
		quizDistractors: [
			{ text: 'يترك الصلاة حتى يصل إلى المدينة ولو خرج وقتها', diagnosticFeedback: 'لا يجوز ترك الصلاة أو تأخيرها عن وقتها مع إمكانية التيمم.' },
			{ text: 'يتوضأ بالماء ويترك نفسه للعطش الشديد', diagnosticFeedback: 'حفظ النفس مقدم، ولذلك شرع الله التيمم في هذه الحالة.' },
			{ text: 'يصلي دون وضوء ولا تيمم', diagnosticFeedback: 'الطهارة شرط لصحة الصلاة، وبفقد ماء الوضوء ينتقل إلى التيمم.' }
		]
	},
	{
		caseTitle: 'حالة فقهية: المريض والعجز عن استعمال الماء',
		caseText:
			'أُصيبت سلمى بكسر وحروق في ذراعها، فأخبرها الطبيب أن وصول الماء إلى الجرح يؤخر الشفاء ويزيد الألم. احترت سلمى عند دخول وقت صلاة المغرب، فشرحت لها أمها أن الإسلام دين يسر ورفع حرج.',
		tableHeaders: ['السؤال التطبيقي', 'الحكم الشرعي المناسب'],
		tableRows: [
			{ label: 'هل يجوز لسلمى التيمم رغم وجود الماء في البيت؟', answer: 'نعم يجوز للعجز عن استعمال الماء بسبب المرض والضرر' },
			{ label: 'حكم التيمم على الزجاج أو البلاستيك النظيف', answer: 'لا يصح لأنه ليس صعيداً طاهراً من جنس الأرض' },
			{ label: 'حكم صلاة سلمى بعد التيمم الصحيح', answer: 'صحيحة ومقبولة بإذن الله' },
			{ label: 'إذا شُفيت سلمى تماماً قبل صلاة العشاء', answer: 'يزول عذرها ويجب عليها الوضوء بالماء' }
		],
		applyQ: '2) اذكر سببين آخرين يُبيحان التيمم غير المرض، واستشهد بآية أو حديث صحيح على مشروعية التيمم.',
		applyA: '2) سببان آخران: فقدان الماء بعد البحث عنه، وخوف البرد الشديد مع عدم القدرة على تسخين الماء. الدليل: قوله تعالى: ﴿فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ﴾ أو حديث «وجعلت لي الأرض مسجداً وطهوراً» (متفق عليه).',
		quizPrompt: 'ما حكم التيمم لمريض منعه الطبيب من استعمال الماء لأنه يضر بجرحه رغم توفر الماء في البيت؟',
		quizCorrect: 'يجوز له التيمم بالصعيد الطاهر لوجود العذر الشرعي (المرض)',
		quizDistractors: [
			{ text: 'لا يجوز التيمم أبداً ما دام الماء موجوداً في الصنبور', diagnosticFeedback: 'العجز عن استعمال الماء لمرض يضرّه يُبيح التيمم كفقدان الماء.' },
			{ text: 'تسقط عنه الصلاة تماماً حتى يُشفى', diagnosticFeedback: 'الصلاة لا تسقط عن المريض العاقل، بل يصلي بالتيمم على قدر استطاعته.' },
			{ text: 'يتيمم على الثياب النظيفة أو السجاد', diagnosticFeedback: 'يُشترط في التيمم الصعيد الطاهر من جنس الأرض كالتراب أو الحجر الطاهر.' }
		]
	},
	{
		caseTitle: 'حالة فقهية: مبطلات التيمم والفرق بينه وبين الوضوء',
		caseText:
			'انقطع الماء عن الحي فبحث أمين فلم يجد ماءً، فتيمم بحجر طاهر لصلاة الظهر، لكن قبل أن يبدأ الصلاة عاد الماء إلى الصنابير. كما سأله أخوه الصغير عن مبطلات التيمم والفرق بينه وبين الوضوء.',
		tableHeaders: ['الموقف الفقهي', 'الحكم الصحيح'],
		tableRows: [
			{ label: 'عودة الماء قبل الشروع في الصلاة', answer: 'يبطل التيمم ويجب عليه الوضوء بالماء' },
			{ label: 'حدوث ناقض من نواقض الوضوء بعد التيمم', answer: 'يبطل التيمم كما يبطل الوضوء' },
			{ label: 'تيمم تلميذ سليم متكاسلاً مع توفر الماء', answer: 'لا يصح تيممه لعدم وجود عذر شرعي' },
			{ label: 'مسح الرأس وغسل الرجلين في التيمم', answer: 'لا يُفعلان؛ التيمم في الوجه واليدين فقط' }
		],
		applyQ: '2) عدّد أربع فرائض من فرائض التيمم، وبيّن مبطلين من مبطلاته.',
		applyA: '2) الفرائض: النية، الصعيد الطاهر، الضربة الأولى، مسح الوجه واليدين (مع الموالاة). المبطلات: كل ما يُبطل الوضوء، ووجود الماء والقدرة على استعماله قبل الصلاة (وزوال العذر).',
		quizPrompt: 'تيمم مصلٍّ لعدم وجود الماء، ثم جاء الماء وتوفر بكثرة قبل أن يُكبّر للصلاة. ماذا يفعل؟',
		quizCorrect: 'يبطل تيممه ويجب عليه الوضوء بالماء للصلاة',
		quizDistractors: [
			{ text: 'يصلي بتيممه لأن التيمم لا يبطل بوجود الماء', diagnosticFeedback: 'وجود الماء والقدرة على استعماله قبل الدخول في الصلاة من مبطلات التيمم.' },
			{ text: 'يجمع بين الوضوء والتيمم معاً', diagnosticFeedback: 'يكفي الوضوء بالماء لأنه الأصل عند وجوده.' },
			{ text: 'يؤجل الصلاة إلى اليوم التالي', diagnosticFeedback: 'تأخير الصلاة عن وقتها حرام؛ بل يتوضأ بالماء ويصلي فوراً.' }
		]
	}
];

const tplTayammumFiqhT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_tayammum_fiqh_application',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'fiqh_ibadat',
	titleAr: 'تقييم المكتسبات (توظيف الأحكام): تطبيق أحكام التيمم وفرائضه ومبطلاته',
	curriculumLessonId: 'isl_lesson_5ap_t1_tayammum_rulings',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 53 + 19);
		const v = rng.pick(TAYAMMUM_VARIANTS);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `${v.caseText}\n\n**السؤال:** ${v.quizPrompt}`,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الحكم الفقهي الصحيح: ${v.quizCorrect}.`
		};

		const content: ContentBlock[] = [
			buildIslamicContextBlock({
				title: v.caseTitle,
				text: v.caseText
			}),
			{
				type: 'text',
				content: '1) وظّف مكتسباتك الفقهية لإتمام الجدول الآتي:'
			},
			buildIslamicTableBlock(
				v.tableHeaders,
				v.tableRows.map((row) => [
					{ label: row.label, bold: true },
					{ answer: row.answer, mark: '0.5' }
				])
			),
			{
				type: 'text',
				content: v.applyQ,
				answer: v.applyA,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الثانية: كفاءة توظيف الأحكام الشرعية (التيمم)',
			points: 3,
			instruction: 'اقرأ الوضعية الفقهية الآتية ووظّف أحكام التيمم في الإجابة:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'تحقّق أولاً من وجود سبب شرعي يبيح التيمم (فقد الماء أو العجز عن استعماله).',
				'تذكّر أن التيمم يكون بالصعيد الطاهر وفي عضوين فقط: الوجه واليدين.',
				'مبطلات التيمم هي نواقض الوضوء بالإضافة إلى وجود الماء والقدرة على استعماله قبل الصلاة.'
			],
			solutionStepsAr: [
				...v.tableRows.map((r) => `${r.label}: ${r.answer}`),
				v.applyA
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الجزء الثاني (السيرة والأخلاق): غزوة بدر الكبرى والاستقامة وحفظ اللسان
// ───────────────────────────────────────────────────────────────────────────────
interface BadrIstiqamahVariant {
	stimulusKind: 'hadith' | 'context';
	hadith?: { narrator: string; text: string; source: string };
	context?: { title: string; text: string };
	q1: string;
	a1: string;
	q2: string;
	a2: string;
	q3: string;
	a3: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const BADR_ISTIQAMAH_VARIANTS: readonly BadrIstiqamahVariant[] = [
	{
		stimulusKind: 'context',
		context: {
			title: 'غزوة بدر الكبرى (يوم الفرقان)',
			text: 'في السابع عشر من رمضان للسنة الثانية للهجرة، التقى جيش المسلمين المؤلف من نحو 313 صحابياً بجيش قريش البالغ نحو 1000 مقاتل عند ماء بدر. استشار النبي صلى الله عليه وسلم أصحابه، وقبل مشورة الحباب بن المنذر رضي الله عنه في اختيار الموقع، ثم ألحّ في الدعاء والتضرع إلى الله تعالى فأنزل الله الملائكة مدداً للمؤمنين ونصرهم نصراً عظيماً.'
		},
		q1: '1) حدّد تاريخ ومكان غزوة بدر الكبرى، وبيّن سبب تسمية ذلك اليوم بـ«يوم الفرقان».',
		a1: '1) التاريخ: 17 رمضان من السنة الثانية للهجرة (2 هـ). المكان: عند ماء بدر بين مكة والمدينة. سُمّي يوم الفرقان لأن الله فرّق به بين الحق والباطل.',
		q2: '2) استخرج ثلاثة عوامل رئيسية حقّقت النصر للمسلمين في غزوة بدر رغم قلة عددهم.',
		a2: '2) صدق الإيمان والتوكل على الله وكثرة الدعاء، الشورى وتعاون القائد مع أصحابه، الأخذ بالأسباب وتنظيم الصفوف، وتأييد الله للمؤمنين بالملائكة.',
		q3: '3) اذكر موقفاً من غزوة بدر يبرز عناية النبي صلى الله عليه وسلم بنشر العلم ومحو الأمية.',
		a3: '3) جعل النبي صلى الله عليه وسلم فداء الأسرى المتعلمين الذين لا يملكون مالاً تعليم عشرة من صبيان المدينة القراءة والكتابة.',
		quizPrompt: 'ما المبدأ القيادي الذي جسّده النبي صلى الله عليه وسلم بقبول رأي الحباب بن المنذر رضي الله عنه في غزوة بدر؟',
		quizCorrect: 'مبدأ الشورى والأخذ بالرأي الصواب والأسباب',
		quizDistractors: [
			{ text: 'التفرد بالرأي وعدم الاستماع للآخرين', diagnosticFeedback: 'قبول رأي الحباب رضي الله عنه هو عين الشورى وليس التفرد.' },
			{ text: 'التواكل وترك التخطيط', diagnosticFeedback: 'اختيار موقع الماء من أعظم صور الأخذ بالأسباب والتخطيط.' },
			{ text: 'الانسحاب قبل بدء المعركة', diagnosticFeedback: 'ثبت النبي صلى الله عليه وسلم والصحابة وانتصروا بإذن الله.' }
		]
	},
	{
		stimulusKind: 'hadith',
		hadith: {
			narrator: 'عن سفيان بن عبد الله الثقفي رضي الله عنه قال: قلت: يا رسول الله، قل لي في الإسلام قولاً لا أسأل عنه أحداً بعدك، قال:',
			text: 'قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ',
			source: 'رواه مسلم'
		},
		q1: '1) عرّف «الاستقامة» تعريفاً واضحاً كما فهمته من الحديث النبوي الشريف.',
		a1: '1) الاستقامة هي الثبات على الإيمان بالله تعالى وتوحيده، والالتزام بطاعته واجتناب نواهيه في الأقوال والأفعال.',
		q2: '2) اذكر ثلاث مظاهر عملية للاستقامة في حياة التلميذ داخل المدرسة والأسرة.',
		a2: '2) المحافظة على الصلوات في أوقاتها، الصدق والأمانة وتجنب الغش، بر الوالدين واحترام المعلمين، وحفظ اللسان عن الأذى.',
		q3: '3) ما البشارة العظيمة التي أعدّها الله للمستقيمين في سورة فصلت؟',
		a3: '3) تتنزل عليهم الملائكة تبشّرهم بألا خوف عليهم ولا حزن، وتبشرهم بالجنة: ﴿أَلَّا تَخَافُوا وَلَا تَحْزَنُوا وَأَبْشِرُوا بِالْجَنَّةِ الَّتِي كُنْتُمْ تُوعَدُونَ﴾.',
		quizPrompt: 'ما الأمران اللذان جمعتهما وصية النبي صلى الله عليه وسلم لسفيان الثقفي رضي الله عنه في صحيح مسلم؟',
		quizCorrect: 'الإيمان الصادق بالله تعالى ثم الاستقامة والثبات على طاعته',
		quizDistractors: [
			{ text: 'جمع المال والسفر في التجارة', diagnosticFeedback: 'الوصية النبوية الجامعة هي الإيمان بالله ثم الاستقامة.' },
			{ text: 'كثرة الكلام والجدال مع الناس', diagnosticFeedback: 'الإسلام يأمر بحفظ اللسان والاستقامة لا كثرة الجدال.' },
			{ text: 'القول باللسان دون عمل بالجوارح', diagnosticFeedback: 'الاستقامة تجمع بين إيمان القلب وعمل الجوارح.' }
		]
	},
	{
		stimulusKind: 'hadith',
		hadith: {
			narrator: 'عن أبي هريرة رضي الله عنه أن رسول الله صلى الله عليه وسلم قال:',
			text: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
			source: 'متفق عليه'
		},
		q1: '1) اشرح القاعدة النبوية التي يرشدنا إليها الحديث الشريف في التعامل مع اللسان.',
		a1: '1) يجب على المؤمن أن يزن كلامه قبل أن ينطق به؛ فإن كان خيراً نافعاً تكلّم به، وإن كان شراً أو لغواً لا فائدة فيه أمسك لسانه وصمت.',
		q2: '2) اذكر ثلاث آفات محرّمة من آفات اللسان، وثلاثة أعمال صالحة يُستعمل فيها اللسان.',
		a2: '2) آفات اللسان: الكذب، الغيبة، النميمة، السخرية والسب. أعمال اللسان الصالحة: تلاوة القرآن، ذكر الله، الصدق، الكلمة الطيبة والإصلاح بين الناس.',
		q3: '3) كيف تربط بين هذا الحديث وقول الله تعالى: ﴿مَا يَلْفِظُ مِنْ قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ﴾؟',
		a3: '3) كلاهما يرسّخ مراقبة الله عند الكلام؛ فالملائكة تسجّل كل لفظة ينطق بها الإنسان، والمؤمن باليوم الآخر يحفظ لسانه لينجو يوم الحساب.',
		quizPrompt: 'ما الموقف الإسلامي الصحيح حين يُغتاب زميل غائب في مجلس تجلس فيه؟',
		quizCorrect: 'أنصحهم بلطف بحرمة الغيبة وأدافع عن عرض الزميل الغائب وأغيّر الحديث للخير',
		quizDistractors: [
			{ text: 'أشاركهم في الحديث عن عيوبه ما دام الكلام صحيحاً', diagnosticFeedback: 'ذكرك أخاك بما يكره وإن كان فيه هو الغيبة المحرّمة.' },
			{ text: 'أنقل كلامهم للزميل الغائب لإشعال الخصومة بينهم', diagnosticFeedback: 'نقل الكلام للإفساد بين الناس هو النميمة المحرّمة.' },
			{ text: 'أضحك وأشجعهم على السخرية منه', diagnosticFeedback: 'السخرية والاستهزاء من آفات اللسان المحرّمة.' }
		]
	}
];

const tplIstiqamahBadrT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_istiqamah_badr_application',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'seerah',
	titleAr: 'السيرة والأخلاق: دروس غزوة بدر والاستقامة وحفظ اللسان',
	curriculumLessonId: 'isl_lesson_5ap_t1_badr_battle',
	defaultPoints: 3,
	onecRole: 'part2_application',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 67 + 23);
		const v = rng.pick(BADR_ISTIQAMAH_VARIANTS);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.quizPrompt,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصائبة: ${v.quizCorrect}.`
		};

		const stimulusBlock: ContentBlock =
			v.stimulusKind === 'hadith' && v.hadith
				? buildHadithPassageBlock({
						narrator: v.hadith.narrator,
						text: v.hadith.text,
						source: v.hadith.source
					})
				: buildIslamicContextBlock({
						title: v.context!.title,
						text: v.context!.text
					});

		const content: ContentBlock[] = [
			stimulusBlock,
			{ type: 'text', content: v.q1, answer: v.a1, mark: '1' },
			{ type: 'text', content: v.q2, answer: v.a2, mark: '1' },
			{ type: 'text', content: v.q3, answer: v.a3, mark: '1' }
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الثانية (السيرة والأخلاق): غزوة بدر والاستقامة وحفظ اللسان',
			points: 3,
			instruction: 'اقرأ السند بتركيز ثم أجب عن الأسئلة الثلاثة الآتية:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'استخرج المعطيات التاريخية أو الشرعية بدقة من السند ومكتسبات الدرس.',
				'تذكّر أن التوكل لا ينفصل عن الأخذ بالأسباب والشورى.',
				'اربط القيم الإسلامية بسلوكك اليومي في المدرسة والبيت.'
			],
			solutionStepsAr: [v.a1, v.a2, v.a3],
			finalAnswer: v.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 5. الوضعية الإدماجية 1 (كفاءة إنتاج وضعية قيمية): الاستقامة وحفظ اللسان وسورة البلد
// ───────────────────────────────────────────────────────────────────────────────
interface IntegrationT1Variant {
	context: string;
	supportQuote: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const INTEGRATION_VALUES_T1: readonly IntegrationT1Variant[] = [
	{
		context:
			'لاحظتَ في ساحة المدرسة أن بعض زملائك يسخرون من زميل لهم ويتحدثون عنه بسوء في غيابه، فأردت أن تنصحهم بأدب ولطف بأهمية حفظ اللسان والاستقامة.',
		supportQuote:
			'قال رسول الله صلى الله عليه وسلم: «مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ» (متفق عليه).',
		instruction:
			'اكتب فقرة من 6 إلى 8 أسطر تنصح فيها زملاءك بوجوب الاستقامة وحفظ اللسان، مبيّناً خطورة الغيبة والسخرية وثمرات الكلمة الطيبة، ومستشهداً بآية قرآنية أو حديث نبوي صحيح مما حفظت.',
		rubricCriteria: [
			'الملاءمة واحترام التعليمة وتناول موضوع الاستقامة وحفظ اللسان (1 ن)',
			'توظيف آية قرآنية أو حديث نبوي صحيح بشكل سليم (1 ن)',
			'ذكر خطورة آفات اللسان وثمرات الكلمة الطيبة (1.5 ن)',
			'سلامة اللغة وتنظيم الفقرة ووضوح الخط (0.5 ن)'
		],
		modelOutline:
			'مقدمة: الاستقامة وحفظ اللسان من أعظم علامات الإيمان الصادق. العرض: التحذير من الغيبة والسخرية والنميمة لأن كل لفظة مسجلة عند الله بقوله تعالى ﴿مَا يَلْفِظُ مِنْ قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ﴾، وتذكيرهم بحديث «المسلم من سلم المسلمون من لسانه ويده» (متفق عليه)، وبيان ثمرات الكلمة الطيبة في نشر المحبة. الخاتمة: دعوة الزملاء للاقتداء بأخلاق النبي صلى الله عليه وسلم.',
		quizPrompt: 'ما الشاهد الشرعي الأنسب لتوظيفه في وضعية إدماجية حول حفظ اللسان؟',
		quizCorrect: 'قوله تعالى: ﴿مَا يَلْفِظُ مِنْ قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ﴾ وحديث: «فليقل خيراً أو ليصمت» (متفق عليه)',
		quizDistractors: [
			{ text: 'آية فرضية التيمم عند فقدان الماء', diagnosticFeedback: 'آية التيمم تتعلق بالطهارة ولا تناسب موضوع حفظ اللسان.' },
			{ text: 'الاستغناء عن الشواهد الشرعية تماماً', diagnosticFeedback: 'توظيف الشاهد الشرعي الصحيح معيار أساسي في تقييم المكتسبات.' },
			{ text: 'نقل كلام عامي غير منضبط بدل الحديث الصحيح', diagnosticFeedback: 'الاستشهاد يكون بالقرآن الكريم والسنة النبوية الصحيحة.' }
		]
	},
	{
		context:
			'نظّمت مدرستك مبادرة خيرية لفائدة الأطفال الأيتام والأسر المحتاجة في الحي مع بداية فصل الشتاء، فطُلب منك إعداد كلمة توجيهية لتشجيع زملائك على المساهمة.',
		supportQuote:
			'قال الله تعالى في سورة البلد: ﴿أَوْ إِطْعَامٌ فِي يَوْمٍ ذِي مَسْغَبَةٍ (14) يَتِيمًا ذَا مَقْرَبَةٍ (15) أَوْ مِسْكِينًا ذَا مَتْرَبَةٍ (16)﴾.',
		instruction:
			'حرّر فقرة من 6 إلى 8 أسطر تحثّ فيها زملاءك على الإحسان لليتيم والمسكين واقتحام العقبة بالخيرات، مبيّناً صفات أصحاب الميمنة في سورة البلد وثواب الإنفاق في سبيل الله، ومستشهداً بما تحفظه من السورة.',
		rubricCriteria: [
			'الالتزام بموضوع المبادرة الخيرية والإحسان لليتيم والمسكين (1 ن)',
			'توظيف آيات صحيحة من سورة البلد حول اقتحام العقبة وأصحاب الميمنة (1 ن)',
			'بيان أثر التواصي بالصبر والمرحمة في تماسك المجتمع (1.5 ن)',
			'ترابط الأفكار وسلامة اللغة والتنظيم (0.5 ن)'
		],
		modelOutline:
			'مقدمة: حثّ الإسلام على التراحم ورعاية اليتيم والمسكين. العرض: بيان طريق اقتحام العقبة في سورة البلد بإطعام اليتيم القريب والمسكين المحتاج وقت الشدة، وذكر صفات أصحاب الميمنة: الإيمان والتواصي بالصبر والمرحمة، وتشجيع الزملاء على المساهمة بمصروفهم وثيابهم وأدواتهم. الخاتمة: دعوة صادقة للتسابق في الخيرات طلباً لرضا الله.',
		quizPrompt: 'ما الصفات التي ذكرتها سورة البلد لأصحاب الميمنة ويمكن توظيفها في الوضعية القيمية؟',
		quizCorrect: 'الإيمان بالله، إطعام اليتيم والمسكين، والتواصي بالصبر والمرحمة',
		quizDistractors: [
			{ text: 'التفاخر بالمال وإنفاقه للسمعة فقط', diagnosticFeedback: 'التفاخر بالمال مذموم في سورة البلد.' },
			{ text: 'البخل على المحتاجين وترك المساعدة', diagnosticFeedback: 'البخل يخالف روح سورة البلد.' },
			{ text: 'إهمال الإيمان والاكتفاء بالأقوال', diagnosticFeedback: 'أصحاب الميمنة جمعوا بين الإيمان والعمل الصالح.' }
		]
	},
	{
		context:
			'سألك أخوك الأصغر عن معنى الإيمان باليوم الآخر وكيف يستعد التلميذ الصالح لهذا اليوم العظيم بأعماله اليومية.',
		supportQuote:
			'قال الله تعالى: ﴿فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ (7) وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ (8)﴾ (سورة الزلزلة).',
		instruction:
			'اكتب فقرة من 6 إلى 8 أسطر تشرح فيها لأخيك حقيقة الإيمان باليوم الآخر ومكانته بين أركان الإيمان، وتذكر له أربعة أعمال صالحة يستعد بها للقاء الله، مع الاستشهاد بحديث صحيح مما حفظت.',
		rubricCriteria: [
			'تعريف الإيمان باليوم الآخر وذكر مكانته (الركن الخامس) (1 ن)',
			'توظيف شاهد نبوي أو قرآني صحيح حول العمل الباقي (1 ن)',
			'ذكر أربعة أعمال صالحة عملية للاستعداد للآخرة (1.5 ن)',
			'وضوح التعبير وسلامة اللغة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: الإيمان باليوم الآخر هو الركن الخامس من أركان الإيمان الستة. العرض: بيان أن الناس يُبعثون ويُحاسبون بالعدل ولا يبقى مع الإنسان إلا عمله كما جاء في حديث الصدقة الجارية والعلم النافع والولد الصالح (رواه مسلم)، وذكر أعمال الاستعداد: إقامة الصلاة، بر الوالدين، الصدق وحفظ اللسان، وطلب العلم النافع والصدقة. الخاتمة: دعاء لله بحسن الخاتمة والفوز بالجنة.',
		quizPrompt: 'أيّ توجيهٍ عملي ينبغي التركيز عليه عند شرح الاستعداد لليوم الآخر لأخيك الصغير؟',
		quizCorrect: 'المحافظة على الصلاة وبر الوالدين والصدق وفعل الخيرات ومراقبة الله',
		quizDistractors: [
			{ text: 'تخويفه دون ذكر رحمة الله وعدله وثواب المحسنين', diagnosticFeedback: 'التربية الإسلامية توازن بين الترغيب في الجنة والترهيب من المعصية.' },
			{ text: 'إخباره بأن الأطفال لا يتعلمون أعمال الخير', diagnosticFeedback: 'التلميذ يتعوّد على الصلاة والصدق وبر الوالدين منذ صغره.' },
			{ text: 'ترك الدراسة والاكتفاء بالجلوس في البيت', diagnosticFeedback: 'طلب العلم النافع من أفضل الأعمال الصالحة التي يُستعد بها للآخرة.' }
		]
	}
];

const tplIntegrationValuesT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_integration_values_balad_tongue',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (إنتاج وضعية قيمية): الاستقامة وحفظ اللسان وسورة البلد',
	curriculumLessonId: 'isl_lesson_5ap_t1_istiqamah_tongue',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 79 + 31);
		const v = rng.pick(INTEGRATION_VALUES_T1);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: v.quizPrompt,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة النموذجية للوضعية القيمية: ${v.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية: كفاءة الإنتاج القيمي والسلوكي',
			points: 4,
			instruction: 'اقرأ السياق والسند والتعليمة بعناية، ثم حرّر فقرة منظّمة متماسكة:',
			content: [
				buildIslamicIntegrationBlock({
					context: v.context,
					supportQuote: v.supportQuote,
					instruction: v.instruction,
					rubricCriteria: v.rubricCriteria,
					modelOutline: v.modelOutline,
					mark: '4'
				})
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ابدأ بمقدمة قصيرة تعرّف فيها بالقيمة الإسلامية المطلوبة.',
				'أجب عن جميع مطالب التعليمة ووظّف آية أو حديثاً صحيحاً في مكانه المناسب.',
				'اختم الفقرة بنصيحة لطيفة أو دعاء، وراجع علامات الوقف والإملاء.'
			],
			solutionStepsAr: [
				'تحديد القيمة المركزية والمطالب الفرعية في التعليمة.',
				`خطة التحرير: ${v.modelOutline}`,
				'المراجعة اللغوية والتأكد من كتابة الآية أو الحديث وعبارة صلى الله عليه وسلم بدقة.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 6. الوضعية الإدماجية 2 (تقييم المكتسبات المركّبة): دمج التيمم ودروس بدر والاستقامة
// ───────────────────────────────────────────────────────────────────────────────
interface CompetencyT1Variant {
	quran: { verses: string; surah: string; ayahRange: string };
	context: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const COMPETENCY_T1_VARIANTS: readonly CompetencyT1Variant[] = [
	{
		quran: {
			verses: 'فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ',
			surah: 'المائدة',
			ayahRange: '6'
		},
		context:
			'شاركتَ مع فوج الكشافة الإسلامية في خرجة تربوية إلى منطقة جبلية، فانقطع الماء قبل صلاة العصر، فاقترح أحد الزملاء تأجيل الصلاة إلى الليل عند العودة إلى البيت.',
		instruction:
			'اكتب فقرة من 6 إلى 8 أسطر تصحّح فيها خطأ زميلك برفق، مبيّناً له حكم التيمم وكيفيته الصحيحة ومبطلاته، ومستخلصاً منه مظهر يسر الإسلام ورحمته بعباده مع توظيف السند القرآني.',
		rubricCriteria: [
			'تصحيح الخطأ الفقهي (عدم تأجيل الصلاة والانتقال للتيمم) (1 ن)',
			'بيان كيفية التيمم وفرائضه ومبطلاته بدقة (1.5 ن)',
			'إبراز قيمة يسر الإسلام وتوظيف السند القرآني (1 ن)',
			'التنظيم وسلامة الأسلوب ووضوح الخط (0.5 ن)'
		],
		modelOutline:
			'مقدمة: المحافظة على الصلاة في وقتها فريضة لا تسقط في سفر ولا حضر. العرض: تذكير الزميل بقوله تعالى في سورة المائدة عن التيمم عند فقد الماء، وشرح خطوات التيمم (النية، ضرب الصعيد الطاهر، مسح الوجه واليدين)، وبيان مبطلاته (نواقض الوضوء ووجود الماء قبل الصلاة). الخاتمة: شكر الله على يسر شريعة الإسلام ورفع الحرج.',
		quizPrompt: 'ما الخطأ الذي وقع فيه الزميل في الرحلة الكشفية عند انقطاع الماء؟',
		quizCorrect: 'اقتراح تأجيل الصلاة عن وقتها بدلاً من تطبيق رخصة التيمم بالصعيد الطاهر',
		quizDistractors: [
			{ text: 'مشاركته في الخرجة التربوية الكشفية', diagnosticFeedback: 'المشاركة في الأنشطة التربوية النافعة أمر محمود.' },
			{ text: 'التذكير بأهمية الماء للوضوء في الأحوال العادية', diagnosticFeedback: 'المشكلة كانت في اقتراح تأخير الصلاة عن وقتها رغم مشروعية التيمم.' },
			{ text: 'السؤال عن كيفية الطهارة في السفر', diagnosticFeedback: 'السؤال للتعلم محمود، لكن تأجيل الصلاة عن وقتها غير جائز.' }
		]
	},
	{
		quran: {
			verses: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنْتُمْ أَذِلَّةٌ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
			surah: 'آل عمران',
			ayahRange: '123'
		},
		context:
			'مع اقتراب موعد الامتحانات الفصلية، شعر صديقك أمين بالخوف واليأس وقال: «البرنامج طويل ولن أنجح»، بينما تكاسل صديق آخر وقال: «سأنجح بالدعاء وحده دون مراجعة».',
		instruction:
			'اكتب فقرة من 6 إلى 8 أسطر توجه فيها نصيحة حكيمة لصديقيك مستلهماً دروس غزوة بدر الكبرى، مبيّناً كيف نجمع بين التوكل على الله والدعاء وبين الأخذ بالأسباب والشورى وتنظيم الوقت، مع توظيف الآية الكريمة.',
		rubricCriteria: [
			'الربط السليم بين دروس غزوة بدر وموقف الصديقين (1 ن)',
			'التمييز الدقيق بين التوكل الصحيح والتواكل واليأس (1.5 ن)',
			'توظيف الآية الكريمة وأمثلة عملية من غزوة بدر (الشورى وتنظيم الصفوف) (1 ن)',
			'تماسك النص وسلامة التعبير (0.5 ن)'
		],
		modelOutline:
			'مقدمة: في سيرة النبي صلى الله عليه وسلم يوم بدر أعظم الدروس للنجاح. العرض: تذكير الصديق اليائس أن الله نصر قلة المؤمنين في بدر بصدق الإيمان والدعاء، وتذكير الصديق المتكاسل أن النبي صلى الله عليه وسلم أخذ بالأسباب فاستشار أصحابه ونظّم الصفوف قبل الدعاء؛ فالمؤمن يجتهد وينظم وقته ويستعين بالله. الخاتمة: تشجيعهما على الجد والتفاؤل والتوكل الصادق.',
		quizPrompt: 'كيف يجمع التلميذ الناجح بين دروس غزوة بدر الكبرى عند التحضير للامتحان؟',
		quizCorrect: 'يأخذ بالأسباب عبر المراجعة المنظمة والاستشارة، ويتوكل على الله ويدعوه بصدق',
		quizDistractors: [
			{ text: 'يعتمد على الدعاء وحده ويترك المراجعة والاجتهاد', diagnosticFeedback: 'ترك الأخذ بالأسباب تواكل مذموم يخالف هدي النبي صلى الله عليه وسلم في بدر.' },
			{ text: 'يستسلم لليأس لأن الدروس كثيرة', diagnosticFeedback: 'المؤمن يتفاءل ويثق بعون الله ولا ييأس.' },
			{ text: 'يعتمد على الغش لتحصيل النقاط', diagnosticFeedback: 'الغش حرام ويخالف الاستقامة والأمانة.' }
		]
	},
	{
		quran: {
			verses: 'إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا تَتَنَزَّلُ عَلَيْهِمُ الْمَلَائِكَةُ أَلَّا تَخَافُوا وَلَا تَحْزَنُوا وَأَبْشِرُوا بِالْجَنَّةِ الَّتِي كُنْتُمْ تُوعَدُونَ',
			surah: 'فصلت',
			ayahRange: '30'
		},
		context:
			'زارك عمّك المريض الذي منعه الطبيب من استعمال الماء مؤقتاً، فحزن لظنه أنه سيفقد أجر صلاته، كما اشتكى من قلة صبر بعض الناس على المرض.',
		instruction:
			'اكتب فقرة من 6 إلى 8 أسطر تواسي فيها عمّك وتبشّره برحمة الله، شارحاً له رخصة التيمم للمريض وأهمية الاستقامة والصبر والاستعداد للآخرة، وموظفاً الآية الكريمة أعلاه.',
		rubricCriteria: [
			'مواساة المريض وبيان أجر الصبر والاستقامة (1 ن)',
			'توظيف الحكم الشرعي الصحيح لرخصة التيمم للمريض وكيفيته (1.5 ن)',
			'توظيف الآية الكريمة وربطها بحسن الظن بالله والاستعداد للآخرة (1 ن)',
			'سلامة اللغة والأدب في مخاطبة الكبار (0.5 ن)'
		],
		modelOutline:
			'مقدمة: عيادة المريض وإدخال السرور على قلبه من أخلاق الإسلام العظيمة. العرض: طمأنة العم بأن الإسلام شرع للمريض الذي يضرّه الماء رخصة التيمم بالصعيد الطاهر فيمسح وجهه ويديه ويصلي وله الأجر الكامل، وتذكيره ببشرى الملائكة للمستقيمين الصابرين في سورة فصلت. الخاتمة: الدعاء له بالشفاء العاجل والثبات على الطاعة.',
		quizPrompt: 'ما الكفاءات الشرعية التي تدمجها هذه الوضعية التقييمية؟',
		quizCorrect: 'توظيف رخصة التيمم للمريض مع قيم الاستقامة والصبر ومواساة المريض',
		quizDistractors: [
			{ text: 'أحكام الحج ومناسك منى وعرفة فقط', diagnosticFeedback: 'الوضعية تتناول التيمم للمريض والاستقامة لا مناسك الحج.' },
			{ text: 'وقائع فتح مكة وحجة الوداع فقط', diagnosticFeedback: 'هذه موضوعات الفصل الثالث لا هذه الوضعية.' },
			{ text: 'سرد قصة خيالية دون أحكام شرعية', diagnosticFeedback: 'امتحان تقييم المكتسبات يقوم على توظيف الأحكام والقيم الصحيحة.' }
		]
	}
];

const tplIntegrationCompetencyT1: IslamicParameterizedTemplate = {
	id: 'isl_tpl_5ap_t1_integration_tayammum_badr_competency',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'امتحان تقييم المكتسبات (وضعية مركّبة): دمج السند والحكم الفقهي والقيم — ف1',
	curriculumLessonId: 'isl_lesson_5ap_t1_tayammum_rulings',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): IslamicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 97 + 41);
		const v = rng.pick(COMPETENCY_T1_VARIANTS);
		const mcq = buildUniqueMcqOptions(v.quizCorrect, v.quizDistractors, rng);

		const quizQuestion: IslamicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `${v.context}\n\n**السؤال:** ${v.quizPrompt}`,
			questionTextAr: v.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `التوجيه السليم في الوضعية المركّبة: ${v.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'وضعية تقييم المكتسبات المركّبة (الفصل الأول)',
			points: 4,
			instruction: 'تأمل السند القرآني والسياق الآتيين ثم حرّر إجابتك المتكاملة وفق التعليمة:',
			content: [
				buildQuranPassageBlock({
					verses: v.quran.verses,
					surah: v.quran.surah,
					ayahRange: v.quran.ayahRange
				}),
				buildIslamicIntegrationBlock({
					context: v.context,
					instruction: v.instruction,
					rubricCriteria: v.rubricCriteria,
					modelOutline: v.modelOutline,
					mark: '4'
				})
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ السند القرآني أولاً لتعرف الدليل الشرعي الذي ستستثمره في فقرتك.',
				'اجمع في إجابتك بين الحكم الشرعي الدقيق والتوجيه الأخلاقي اللطيف.',
				'احرص على تنظيم الفقرة (مقدمة، عرض، خاتمة) ومراجعة الإملاء.'
			],
			solutionStepsAr: [
				'فهم الإشكال المطروح في السياق وربطه بالسند القرآني.',
				`بناء الفقرة: ${v.modelOutline}`,
				'التحقق من استيفاء جميع معايير شبكة تقييم المكتسبات.'
			],
			finalAnswer: v.quizCorrect
		};
	}
};

export const TEMPLATES_5AP_T1: IslamicParameterizedTemplate[] = [
	tplBaladRecitationT1,
	tplImanYawmAkhirT1,
	tplTayammumFiqhT1,
	tplIstiqamahBadrT1,
	tplIntegrationValuesT1,
	tplIntegrationCompetencyT1
];
