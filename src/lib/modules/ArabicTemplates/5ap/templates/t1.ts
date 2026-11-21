import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIrabTableBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import {
	buildIllustratedFigureBlock,
	type IllustrationId
} from '../../../VisualAssets/illustrations-registry';

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين والاختبارات — السنة الخامسة ابتدائي — اللغة العربية — الفصل الأول
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. البناء الفكري: نص نثري جزائري عن القيم الإنسانية والإخلاص وحب الوطن
// ───────────────────────────────────────────────────────────────────────────────
interface T1PassagePack {
	title: string;
	paragraphs: string[];
	author: string;
	vocabulary: Array<{ word: string; meaning: string }>;
	bestTitle: string;
	wrongTitles: [string, string, string];
	compQ1: string;
	compA1: string;
	compQ2: string;
	compA2: string;
	synWord: string;
	synAnswer: string;
	antWord: string;
	antAnswer: string;
	quizPrompt: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
	valueAr: string;
}

const T1_PASSAGES: readonly T1PassagePack[] = [
	{
		title: 'الإخلاص في العمل والتعاون',
		paragraphs: [
			'الإخلاصُ في العملِ قيمةٌ عظيمةٌ أوصى بها دينُنا الإسلاميُّ الحنيفُ، فالمؤمنُ الصادقُ يُتقنُ [[واجبه]] ويُحسنُ إلى جيرانهِ ولا ينتظرُ ثناءَ الناسِ، لأنَّ اللهَ تعالى يرى عملهُ ويُجازيهِ عليهِ خيرَ الجزاءِ.',
			'وفي حيِّنا الجزائريِّ الأصيلِ، يجتمعُ [[المتطوعون]] صباحَ يومِ الجمعةِ لتنظيفِ الساحةِ ومساعدةِ الأسرِ [[المحتاجةِ]]، وقد علَّمنا الإمامُ عبدُ الحميدِ بنُ باديس رحمه اللهُ أنَّ خدمةَ الأمةِ بالعلمِ والعملِ المخلصِ هي سبيلُ العزةِ والنهوضِ.'
		],
		author: 'نص تربوي جزائري',
		vocabulary: [
			{ word: 'ثناء', meaning: 'مدح وشكر' },
			{ word: 'سبيل', meaning: 'طريق' }
		],
		bestTitle: 'الإخلاص في العمل وثمار التعاون',
		wrongTitles: ['رحلة إلى شاطئ البحر', 'أنواع الألعاب الرياضية', 'فصول السنة الأربعة'],
		compQ1: 'لماذا يُتقن المؤمن الصادق عمله دون أن ينتظر ثناء الناس؟',
		compA1: 'لأن الله تعالى يرى عمله ويجازيه عليه خير الجزاء.',
		compQ2: 'ماذا يفعل المتطوعون في الحي صباح يوم الجمعة؟ وما السبيل الذي دلّنا عليه الإمام عبد الحميد بن باديس رحمه الله للنهوض بالأمة؟',
		compA2: 'يجتمعون لتنظيف الساحة ومساعدة الأسر المحتاجة؛ والسبيل هو خدمة الأمة بالعلم والعمل المخلص.',
		synWord: 'المدح',
		synAnswer: 'ثناء',
		antWord: 'الكاذب',
		antAnswer: 'الصادق',
		quizPrompt: 'ما الفكرة العامة الأنسب لنص «الإخلاص في العمل والتعاون»؟',
		quizCorrect: 'أهمية الإخلاص في العمل والتعاون التطوعي في رقي المجتمع والأمة',
		quizDistractors: [
			{ text: 'وصف نزهة عائلية في الغابة خلال فصل الربيع', diagnosticFeedback: 'النص يتحدث عن الإخلاص والتعاون لا عن النزهة.' },
			{ text: 'التعريف بوسائل النقل الحديثة في المدن الكبرى', diagnosticFeedback: 'لم يرد في النص ذكر لوسائل النقل.' },
			{ text: 'قواعد ممارسة الرياضة الصباحية للأطفال', diagnosticFeedback: 'موضوع النص أخلاقي واجتماعي حول الإخلاص والتعاون.' }
		],
		valueAr: 'الإخلاص لله في العمل، والتعاون على البر والتقوى.'
	},
	{
		title: 'حب الوطن ووفاء الأجيال',
		paragraphs: [
			'الجزائرُ وطنٌ غالٍ سقاهُ [[الشهداءُ]] الأبرارُ بدمائهمُ الزكيةِ كي نعيشَ أحراراً كرماءَ، وقد ظلَّتِ [[المجاهداتُ]] صابراتٍ مخلصاتٍ يقفنَ إلى جانبِ إخوانهنَّ في سبيلِ الحريةِ والاستقلالِ.',
			'إنَّ حبَّ [[الوطنِ]] لا يكونُ بالكلامِ وحدهُ، بل بالجدِّ في طلبِ العلمِ واحترامِ المعلمينَ والحفاظِ على الممتلكاتِ العامةِ، كما أوصى العلامةُ محمدٌ البشيرُ الإبراهيميُّ رحمه اللهُ أبناءَ الجزائرِ بالاجتهادِ وبناءِ مستقبلٍ مشرقٍ.'
		],
		author: 'نص تربوي وطني جزائري',
		vocabulary: [
			{ word: 'الزكية', meaning: 'الطاهرة المباركة' },
			{ word: 'الممتلكات العامة', meaning: 'ما يشترك فيه جميع المواطنين كالمدارس والحدائق' }
		],
		bestTitle: 'الوفاء للوطن بالعلم والاجتهاد',
		wrongTitles: ['فوائد الفواكه الصيفية', 'حياة الحيوانات في الصحراء', 'صناعة السفن القديمة'],
		compQ1: 'كيف نعبّر تعبيراً حقيقياً عن حبنا لوطننا الجزائر حسب النص؟',
		compA1: 'بالجد في طلب العلم واحترام المعلمين والحفاظ على الممتلكات العامة.',
		compQ2: 'بمَ أوصى العلامة محمد البشير الإبراهيمي رحمه الله أبناء الجزائر؟',
		compA2: 'أوصاهم بالاجتهاد وبناء مستقبل مشرق للوطن.',
		synWord: 'الطاهرة',
		synAnswer: 'الزكية',
		antWord: 'الاستعمار (أو العبودية)',
		antAnswer: 'الحرية والاستقلال',
		quizPrompt: 'كيف يبرهن التلميذ على حبه الصادق لوطنه الجزائر كما ورد في النص؟',
		quizCorrect: 'بالجد في طلب العلم واحترام المعلمين والحفاظ على الممتلكات العامة',
		quizDistractors: [
			{ text: 'بالكلام والشعارات دون عمل أو اجتهاد', diagnosticFeedback: 'النص يؤكد أن حب الوطن لا يكون بالكلام وحده!' },
			{ text: 'بترك الدراسة والاكتفاء باللعب', diagnosticFeedback: 'الاجتهاد في العلم هو أساس بناء الوطن.' },
			{ text: 'بإهمال المرافق والمدارس العمومية', diagnosticFeedback: 'المحافظة على الممتلكات العامة واجب وطني.' }
		],
		valueAr: 'حب الوطن، الوفاء للشهداء، والاجتهاد في طلب العلم.'
	},
	{
		title: 'الصحبة الصالحة وبر الوالدين',
		paragraphs: [
			'أوصى الأبُ ابنهُ أميناً قائلاً: «يا بنيَّ، اِخترِ [[الصديقَ]] الصالحَ الذي يُعينكَ على طاعةِ اللهِ ويُذكِّركَ بدروسكَ، فإنَّ [[المخلصين]] في صحبتهم كحاملِ المسكِ تنالُ منهم خيراً وخلقاً رفيعاً».',
			'وبعدَ عودةِ أمينٍ إلى البيتِ، قبَّلَ يدَ أمِّهِ وساعدها في ترتيبِ المائدةِ، لأنَّ برَّ [[الوالدين]] بابٌ عظيمٌ لرضى اللهِ والنجاحِ في الدنيا والآخرةِ.'
		],
		author: 'نص تربوي إسلامي جزائري',
		vocabulary: [
			{ word: 'يُعينك', meaning: 'يساعدك' },
			{ word: 'رفيعاً', meaning: 'عالياً وكريماً' }
		],
		bestTitle: 'أثر الصحبة الصالحة وبر الوالدين',
		wrongTitles: ['وصف سوق المدينة', 'الأمطار والثلوج شتاء', 'رحلة القطار السريع'],
		compQ1: 'ما صفات الصديق الصالح التي ذكرها الأب لابنه أمين؟',
		compA1: 'هو الذي يعينه على طاعة الله ويذكّره بدروسه ويُكتسب منه الخير والخلق الرفيع.',
		compQ2: 'كيف عبّر أمين عن برّه بأمّه عند عودته إلى البيت؟',
		compA2: 'قبّل يد أمّه وساعدها في ترتيب المائدة.',
		synWord: 'يساعدك',
		synAnswer: 'يُعينك',
		antWord: 'عقوق',
		antAnswer: 'برّ',
		quizPrompt: 'بمَ شبّه الأبُ الصديقَ الصالح المخلصَ في النص؟',
		quizCorrect: 'بحامل المسك الذي تنال منه خيراً وخلقاً رفيعاً',
		quizDistractors: [
			{ text: 'بالمسافر الذي يغيب طويلاً عن وطنه', diagnosticFeedback: 'لم يرد هذا التشبيه في النص.' },
			{ text: 'بالمنافس الذي يخفي دروسه عن زملائه', diagnosticFeedback: 'الصديق الصالح يعين صاحبه ويذكّره بدروسه.' },
			{ text: 'بالتاجر الذي يهتم بالمال فقط', diagnosticFeedback: 'ورد في النص تشبيهه بحامل المسك في الخير والخلق.' }
		],
		valueAr: 'حسن اختيار الصحبة الصالحة وبر الوالدين.'
	}
];

const tplIntellectualT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t1_intellectual_values_passage',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: نص نثري حول القيم الإنسانية والوطنية',
	curriculumLessonId: 'arb_lesson_5ap_t1_verbal_sentence_pillars',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 31 + 7);
		const pack = T1_PASSAGES[Math.abs(seed - 1) % T1_PASSAGES.length];

		const mcq = buildUniqueMcqOptions(pack.quizCorrect, pack.quizDistractors, rng);

		const passagePlain = pack.paragraphs
			.map((p) => p.replace(/\[\[([^\]]+)\]\]/g, '$1'))
			.join(' ');

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `اقرأ النص الآتي بتمعّن ثم أجب:\n\n> ${passagePlain}\n\n**السؤال:** ${pack.quizPrompt}`,
			questionTextAr: pack.quizPrompt,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة الصحيحة مستخرجة مباشرة من معاني النص: ${pack.quizCorrect}.`
		};

		const illustrationId: IllustrationId =
			pack.title === 'الإخلاص في العمل والتعاون'
				? 'pri_ara_03_algerian_village_orchard'
				: pack.title === 'حب الوطن ووفاء الأجيال'
					? 'pri_ara_04_algeria_flag_martyrs_memorial'
					: 'pri_ara_01_school_bag_supplies';

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock(illustrationId, {
				mode: 'image_only',
				title: pack.title,
				maxHeight: 112,
				width: '58%'
			}),
			buildProsePassageBlock({
				title: pack.title,
				paragraphs: pack.paragraphs,
				author: pack.author,
				vocabulary: pack.vocabulary
			}),
			{
				type: 'text',
				content: '1) هاتِ عنواناً مناسباً للنص.',
				answer: `1) العنوان المناسب: «${pack.bestTitle}» (وتُقبل كل صياغة تؤدي المعنى نفسه).`,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `2) ${pack.compQ1}`,
				answer: `2) ${pack.compA1}`,
				mark: '0.75'
			},
			{
				type: 'text',
				content: `3) ${pack.compQ2}`,
				answer: `3) ${pack.compA2}`,
				mark: '0.75'
			},
			{
				type: 'text',
				content: `4) استخرج من النص مرادف كلمة «${pack.synWord}»، وضدّ كلمة «${pack.antWord}»، ثم اذكر قيمة أخلاقية مستخلصة من النص.`,
				answer: `4) مرادف «${pack.synWord}»: «${pack.synAnswer}» | ضد «${pack.antWord}»: «${pack.antAnswer}» | القيمة المستخلصة: ${pack.valueAr}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'أولاً: السند وأسئلة البناء الفكري',
			points: 3,
			instruction: 'اقرأ السند الآتي قراءة متأنية ثم أجب عن أسئلة البناء الفكري:',
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
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص مرتين كاملتين وحدّد الفكرة التي تدور حولها الفقرتان.',
				'أعد قراءة الجملة التي تتضمن المفاتيح المطلوبة في السؤال قبل صياغة إجابتك.',
				'تحقق من أن المرادف والضد مأخوذان من النص نفسه.'
			],
			solutionStepsAr: [
				`عنوان النص المناسب: «${pack.bestTitle}».`,
				`إجابة الفهم الأولى: ${pack.compA1}`,
				`إجابة الفهم الثانية: ${pack.compA2}`,
				`المفردات: مرادف «${pack.synWord}» هو «${pack.synAnswer}»، وضد «${pack.antWord}» هو «${pack.antAnswer}».`
			],
			finalAnswer: pack.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. البناء اللغوي 1: الجملة الفعلية والاسمية والنواسخ (كان وإنّ)
// ───────────────────────────────────────────────────────────────────────────────
interface NawasikhCase {
	nominalSentence: string;
	kanaWord: string;
	kanaSentence: string;
	innaWord: string;
	innaSentence: string;
	irabSentence: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const NAWASIKH_CASES: readonly NawasikhCase[] = [
	{
		nominalSentence: 'الصِّدْقُ مَنْجَاةٌ لِلْمُؤْمِنِ.',
		kanaWord: 'أَصْبَحَ',
		kanaSentence: 'أَصْبَحَ الصِّدْقُ مَنْجَاةً لِلْمُؤْمِنِ.',
		innaWord: 'إِنَّ',
		innaSentence: 'إِنَّ الصِّدْقَ مَنْجَاةٌ لِلْمُؤْمِنِ.',
		irabSentence: 'أَتْقَنَ المُؤْمِنُ العَمَلَ، إِنَّ الإِخْلَاصَ نُورٌ.',
		irabEntries: [
			{ target: 'المُؤْمِنُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'الإِخْلَاصَ', irab: 'اسم إنّ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' }
		],
		quizQ: 'ما الضبط الصحيح للجملة «الصِّدْقُ مَنْجَاةٌ» بعد إدخال «إِنَّ» عليها؟',
		quizCorrect: 'إِنَّ الصِّدْقَ مَنْجَاةٌ.',
		quizDistractors: [
			{ text: 'إِنَّ الصِّدْقُ مَنْجَاةً.', diagnosticFeedback: 'هذا عمل «كان» وليس عمل «إنّ»!' },
			{ text: 'إِنَّ الصِّدْقَ مَنْجَاةً.', diagnosticFeedback: 'خبر إنّ يكون مرفوعاً لا منصوباً.' },
			{ text: 'إِنَّ الصِّدْقُ مَنْجَاةٌ.', diagnosticFeedback: 'نسيت نصب اسم إنّ «الصِّدْقَ».' }
		]
	},
	{
		nominalSentence: 'التَّعَاوُنُ مُفِيدٌ لِلْجَمِيعِ.',
		kanaWord: 'ظَلَّ',
		kanaSentence: 'ظَلَّ التَّعَاوُنُ مُفِيداً لِلْجَمِيعِ.',
		innaWord: 'لَعَلَّ',
		innaSentence: 'لَعَلَّ التَّعَاوُنَ مُفِيدٌ لِلْجَمِيعِ.',
		irabSentence: 'سَاعَدَ المُحْسِنُ الفَقِيرَ، وَظَلَّ العَمَلُ مُثْمِراً.',
		irabEntries: [
			{ target: 'الفَقِيرَ', irab: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'مُثْمِراً', irab: 'خبر ظلّ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' }
		],
		quizQ: 'ما الشكل الصحيح للجملة «التَّعَاوُنُ مُفِيدٌ» بعد إدخال «ظَلَّ» عليها؟',
		quizCorrect: 'ظَلَّ التَّعَاوُنُ مُفِيداً.',
		quizDistractors: [
			{ text: 'ظَلَّ التَّعَاوُنَ مُفِيدٌ.', diagnosticFeedback: '«ظلّ» من أخوات كان، ترفع الاسم وتنصب الخبر.' },
			{ text: 'ظَلَّ التَّعَاوُنَ مُفِيداً.', diagnosticFeedback: 'اسم «ظلّ» يبقى مرفوعاً بالضمة.' },
			{ text: 'ظَلَّ التَّعَاوُنُ مُفِيدٌ.', diagnosticFeedback: 'نسيت نصب خبر «ظلّ»: «مُفِيداً».' }
		]
	},
	{
		nominalSentence: 'العِلْمُ طَرِيقُ النَّجَاحِ.',
		kanaWord: 'كَانَ',
		kanaSentence: 'كَانَ العِلْمُ طَرِيقَ النَّجَاحِ.',
		innaWord: 'إِنَّ',
		innaSentence: 'إِنَّ العِلْمَ طَرِيقُ النَّجَاحِ.',
		irabSentence: 'يَحْفَظُ التِّلْمِيذُ الدَّرْسَ، وَلَيْسَ النَّجَاحُ صَعْباً.',
		irabEntries: [
			{ target: 'يَحْفَظُ', irab: 'فعل مضارع مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'صَعْباً', irab: 'خبر ليس منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' }
		],
		quizQ: 'ما إعراب كلمة «صَعْباً» في الجملة: «لَيْسَ النَّجَاحُ صَعْباً»؟',
		quizCorrect: 'خبر ليس منصوب وعلامة نصبه الفتحة الظاهرة',
		quizDistractors: [
			{ text: 'مفعول به منصوب بالفتحة', diagnosticFeedback: '«ليس» فعل ماضٍ ناقص من أخوات كان لا ينصب مفعولاً به.' },
			{ text: 'اسم ليس منصوب بالفتحة', diagnosticFeedback: 'اسم ليس هو «النجاحُ» وهو مرفوع.' },
			{ text: 'صفة منصوبة بالفتحة', diagnosticFeedback: '«النجاحُ» مرفوع و«صعباً» يتمم المعنى فهو خبر ليس.' }
		]
	},
	{
		nominalSentence: 'الجَزَائِرُ بَلَدٌ آمِنٌ.',
		kanaWord: 'أَمْسَى',
		kanaSentence: 'أَمْسَتِ الجَزَائِرُ بَلَداً آمِناً.',
		innaWord: 'إِنَّ',
		innaSentence: 'إِنَّ الجَزَائِرَ بَلَدٌ آمِنٌ.',
		irabSentence: 'رَفَعَ البَطَلُ الرَّايَةَ، وَإِنَّ النَّصْرَ قَرِيبٌ.',
		irabEntries: [
			{ target: 'الرَّايَةَ', irab: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'قَرِيبٌ', irab: 'خبر إنّ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' }
		],
		quizQ: 'ما إعراب كلمة «قَرِيبٌ» في الجملة: «إِنَّ النَّصْرَ قَرِيبٌ»؟',
		quizCorrect: 'خبر إنّ مرفوع وعلامة رفعه الضمة الظاهرة',
		quizDistractors: [
			{ text: 'اسم إنّ مرفوع بالضمة', diagnosticFeedback: 'اسم إنّ هو «النصرَ» وهو منصوب بالفتحة.' },
			{ text: 'فاعل مرفوع بالضمة', diagnosticFeedback: '«إنّ» حرف ناسخ وليس فعلاً.' },
			{ text: 'خبر إنّ منصوب بالفتحة', diagnosticFeedback: 'خبر إنّ يكون مرفوعاً دائماً.' }
		]
	}
];

const tplNawasikhT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t1_verbal_nominal_nawasikh',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: الجملة الفعلية والاسمية والنواسخ (كان وإنّ)',
	curriculumLessonId: 'arb_lesson_5ap_t1_nominal_sentence_nawasikh',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 53 + 17);
		const c = NAWASIKH_CASES[Math.abs(seed - 1) % NAWASIKH_CASES.length];
		const mcq = buildUniqueMcqOptions(c.quizCorrect, c.quizDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: c.quizQ,
			questionTextAr: c.quizQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تذكّر القاعدة: كان وأخواتها ترفع الاسم وتنصب الخبر، أما إنّ وأخواتها فتنصب الاسم وترفع الخبر. الصواب: ${c.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (الجملة الفعلية والنواسخ)',
			points: 2,
			instruction: `اقرأ الجملة الآتية ثم أنجز المطلوب: «${c.irabSentence}»`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمتين المسطّرتين في الجدول الآتي إعراباً تاماً:',
					mark: '1'
				},
				buildIrabTableBlock(c.irabEntries),
				{
					type: 'text',
					content: `2) أدخل الناسخ الفعلي «${c.kanaWord}» مرة، والناسخ الحرفي «${c.innaWord}» مرة أخرى على الجملة الاسمية: «${c.nominalSentence}» مع ضبط الشكل التام.`,
					answer: `مع «${c.kanaWord}»: «${c.kanaSentence}» | مع «${c.innaWord}»: «${c.innaSentence}»`,
					mark: '1'
				}
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
				'ميّز أولاً نوع الجملة: هل تبدأ بفعل أم باسم أم بناسخ؟',
				'كان وأخواتها: ترفع الأول وتنصب الثاني.',
				'إنّ وأخواتها: تنصب الأول وترفع الثاني.'
			],
			solutionStepsAr: [
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`بعد إدخال «${c.kanaWord}»: ${c.kanaSentence}`,
				`بعد إدخال «${c.innaWord}»: ${c.innaSentence}`
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. البناء اللغوي 2: أنواع الجموع الثلاثة وإعرابها والتحويل
// ───────────────────────────────────────────────────────────────────────────────
interface PluralCase {
	sentence: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	singularSource: string;
	pluralTarget: string;
	classifyWords: Array<{ word: string; kind: string }>;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const PLURAL_CASES: readonly PluralCase[] = [
	{
		sentence: 'شَجَّعَ المُعَلِّمُونَ المُتَفَوِّقَاتِ وَوَزَّعُوا الجَوَائِزَ.',
		irabEntries: [
			{ target: 'المُعَلِّمُونَ', irab: 'فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'المُتَفَوِّقَاتِ', irab: 'مفعول به منصوب وعلامة نصبه الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم.', mark: '0.5' }
		],
		singularSource: 'كَانَ المُهَنْدِسُ مُخْلِصاً فِي عَمَلِهِ.',
		pluralTarget: 'كَانَ المُهَنْدِسُونَ مُخْلِصِينَ فِي عَمَلِهِمْ.',
		classifyWords: [
			{ word: 'المؤمنون', kind: 'جمع مذكر سالم' },
			{ word: 'المعلمات', kind: 'جمع مؤنث سالم' },
			{ word: 'مساكين', kind: 'جمع تكسير' }
		],
		quizQ: 'ما إعراب «المُتَفَوِّقَاتِ» في الجملة: «شَجَّعَ المُعَلِّمُونَ المُتَفَوِّقَاتِ»؟',
		quizCorrect: 'مفعول به منصوب وعلامة نصبه الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم',
		quizDistractors: [
			{ text: 'اسم مجرور وعلامة جره الكسرة الظاهرة', diagnosticFeedback: 'لا يسبقها حرف جر؛ هي مَن وقع عليه فعل التشجيع.' },
			{ text: 'مفعول به منصوب وعلامة نصبه الفتحة', diagnosticFeedback: 'جمع المؤنث السالم لا تظهر عليه الفتحة، بل يُنصب بالكسرة نيابة عنها.' },
			{ text: 'فاعل مرفوع بالكسرة', diagnosticFeedback: 'الفاعل هو «المعلمون»، والفاعل لا يُرفع بالكسرة.' }
		]
	},
	{
		sentence: 'إِنَّ المُجَاهِدِينَ أَبْطَالٌ قَدَّمُوا تَضْحِيَاتٍ عَظِيمَةً.',
		irabEntries: [
			{ target: 'المُجَاهِدِينَ', irab: 'اسم إنّ منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'تَضْحِيَاتٍ', irab: 'مفعول به منصوب وعلامة نصبه الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم.', mark: '0.5' }
		],
		singularSource: 'إِنَّ الفَلَّاحَ نَشِيطٌ فِي حَقْلِهِ.',
		pluralTarget: 'إِنَّ الفَلَّاحِينَ نَشِيطُونَ فِي حَقْلِهِمْ.',
		classifyWords: [
			{ word: 'الصادقين', kind: 'جمع مذكر سالم' },
			{ word: 'الشجيرات', kind: 'جمع مؤنث سالم' },
			{ word: 'أوقات', kind: 'جمع تكسير' }
		],
		quizQ: 'كيف نحوّل «إِنَّ الفَلَّاحَ نَشِيطٌ» إلى جمع المذكر السالم بشكل صحيح؟',
		quizCorrect: 'إِنَّ الفَلَّاحِينَ نَشِيطُونَ.',
		quizDistractors: [
			{ text: 'إِنَّ الفَلَّاحُونَ نَشِيطِينَ.', diagnosticFeedback: 'عكست عمل «إنّ»! اسمها منصوب بالياء وخبرها مرفوع بالواو.' },
			{ text: 'إِنَّ الفَلَّاحُونَ نَشِيطُونَ.', diagnosticFeedback: 'اسم إنّ يجب أن يكون منصوباً بالياء: «الفلاحين».' },
			{ text: 'إِنَّ الفَلَّاحِينَ نَشِيطِينَ.', diagnosticFeedback: 'خبر إنّ يكون مرفوعاً بالواو: «نشيطون».' }
		]
	},
	{
		sentence: 'يُكْرِمُ المُسْلِمُونَ الضُّيُوفَ وَيَحْتَرِمُونَ الأُمَّهَاتِ.',
		irabEntries: [
			{ target: 'المُسْلِمُونَ', irab: 'فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'الأُمَّهَاتِ', irab: 'مفعول به منصوب وعلامة نصبه الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم.', mark: '0.5' }
		],
		singularSource: 'أَصْبَحَ الطَّبِيبُ سَاهِراً عَلَى رَاحَةِ المَرْضَى.',
		pluralTarget: 'أَصْبَحَ الأَطِبَّاءُ سَاهِرِينَ عَلَى رَاحَةِ المَرْضَى.',
		classifyWords: [
			{ word: 'المحسنون', kind: 'جمع مذكر سالم' },
			{ word: 'الطالبات', kind: 'جمع مؤنث سالم' },
			{ word: 'علماء', kind: 'جمع تكسير' }
		],
		quizQ: 'أي الكلمات الآتية تُعدّ **جمع تكسير** وليست جمع مؤنث سالم؟',
		quizCorrect: 'أَصْوَات',
		quizDistractors: [
			{ text: 'مُعَلِّمَات', diagnosticFeedback: 'مفردها «معلمة» والتاء زائدة للجمع فهي جمع مؤنث سالم.' },
			{ text: 'تِلْمِيذَات', diagnosticFeedback: 'جمع مؤنث سالم لمفرده «تلميذة».' },
			{ text: 'مُمَرِّضَات', diagnosticFeedback: 'جمع مؤنث سالم لمفرده «ممرضة».' }
		]
	}
];

const tplPluralsT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t1_plurals_irab_transform',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: أنواع الجموع الثلاثة وإعرابها والتحويل',
	curriculumLessonId: 'arb_lesson_5ap_t1_plural_types_irab',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 71 + 13);
		const c = PLURAL_CASES[Math.abs(seed - 1) % PLURAL_CASES.length];
		const mcq = buildUniqueMcqOptions(c.quizCorrect, c.quizDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: c.quizQ,
			questionTextAr: c.quizQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الصواب: ${c.quizCorrect}. تذكّر: جمع المذكر السالم يرفع بالواو وينصب بالياء، وجمع المؤنث السالم ينصب بالكسرة نيابة عن الفتحة.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (أنواع الجموع والتحويل)',
			points: 2,
			instruction: `تأمل الجملة الآتية ثم أجب عن الأسئلة: «${c.sentence}»`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمتين المطلوبتين في الجدول الآتي:',
					mark: '1'
				},
				buildIrabTableBlock(c.irabEntries),
				{
					type: 'text',
					content: `2) حوّل الجملة الآتية إلى الجمع واضبطها بالشكل: «${c.singularSource}»`,
					answer: `التحويل الصحيح: «${c.pluralTarget}»`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) صنّف الكلمات الآتية حسب نوع الجمع: ${c.classifyWords.map((w) => `«${w.word}»`).join('، ')}.`,
					answer: c.classifyWords.map((w) => `${w.word}: ${w.kind}`).join(' | '),
					mark: '0.5'
				}
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
				'جمع المذكر السالم: يرفع بالواو وينصب ويجر بالياء.',
				'جمع المؤنث السالم: يُنصب بالكسرة نيابة عن الفتحة.',
				'للتحقق من جمع التكسير، انظر هل تغيّر بناء المفرد أو كانت التاء/النون أصلية في المفرد.'
			],
			solutionStepsAr: [
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`التحويل للجمع: ${c.pluralTarget}`,
				`التصنيف: ${c.classifyWords.map((w) => `${w.word} (${w.kind})`).join(' — ')}`
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. البناء اللغوي 3: الفعل المجرد والمزيد + التاء المفتوحة والمربوطة والهمزة الأولية
// ───────────────────────────────────────────────────────────────────────────────
interface SarfImlaT1Case {
	verbs: Array<{ verb: string; type: string; root: string }>;
	taaWord: string;
	taaReason: string;
	hamzaWord: string;
	hamzaReason: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const SARF_IMLA_T1_CASES: readonly SarfImlaT1Case[] = [
	{
		verbs: [
			{ verb: 'يَكْتُبُونَ', type: 'مجرد ثلاثي', root: 'كَتَبَ' },
			{ verb: 'اِنْتَصَرَ', type: 'مزيد بحرفين (الألف والتاء)', root: 'نَصَرَ' },
			{ verb: 'اِسْتَغْفَرَ', type: 'مزيد بثلاثة أحرف (ا، س، ت)', root: 'غَفَرَ' }
		],
		taaWord: 'تَضْحِيَات',
		taaReason: 'كُتبت التاء مفتوحة لأنها في آخر جمع المؤنث السالم.',
		hamzaWord: 'اِسْتِقْلَال',
		hamzaReason: 'كُتبت همزة وصل لأنه مصدر فعل سداسي (اِسْتَقَلَّ).',
		quizQ: 'أي الأفعال الآتية يُعدّ **مجرداً ثلاثياً** بعد إرجاعه إلى الماضي مع «هو»؟',
		quizCorrect: 'يَكْتُبُونَ',
		quizDistractors: [
			{ text: 'اِنْتَصَرَ', diagnosticFeedback: 'أصله «نَصَرَ» فهو مزيد بحرفين (الألف والتاء).' },
			{ text: 'أَكْرَمَ', diagnosticFeedback: 'أصله «كَرُمَ» فهو مزيد بحرف واحد (الهمزة).' },
			{ text: 'اِسْتَغْفَرَ', diagnosticFeedback: 'أصله «غَفَرَ» فهو مزيد بثلاثة أحرف (ا، س، ت).' }
		]
	},
	{
		verbs: [
			{ verb: 'قَرَأَتْ', type: 'مجرد ثلاثي', root: 'قَرَأَ' },
			{ verb: 'عَلَّمَ', type: 'مزيد بحرف واحد (التضعيف)', root: 'عَلِمَ' },
			{ verb: 'تَعَاوَنَ', type: 'مزيد بحرفين (التاء والألف)', root: 'عَوَنَ' }
		],
		taaWord: 'وَقْت',
		taaReason: 'كُتبت التاء مفتوحة لأنه اسم ثلاثي ساكن الوسط.',
		hamzaWord: 'أَتْقَنَ',
		hamzaReason: 'كُتبت همزة قطع لأنه فعل ماضٍ رباعي.',
		quizQ: 'لماذا كُتبت التاء مفتوحة في كلمة «وَقْت»؟',
		quizCorrect: 'لأنه اسم ثلاثي ساكن الوسط',
		quizDistractors: [
			{ text: 'لأنه فعل ماضٍ', diagnosticFeedback: '«وقت» اسم يقبل «ال» (الوقت) وليس فعلاً.' },
			{ text: 'لأنه جمع مؤنث سالم', diagnosticFeedback: '«وقت» مفرد وليس جمعاً.' },
			{ text: 'لأنه اسم مفرد مؤنث', diagnosticFeedback: 'الاسم المفرد المؤنث تُكتب تاؤه مربوطة.' }
		]
	},
	{
		verbs: [
			{ verb: 'دَحْرَجَ', type: 'مجرد رباعي', root: 'دَحْرَجَ' },
			{ verb: 'أَحْسَنَ', type: 'مزيد بحرف واحد (الهمزة)', root: 'حَسُنَ' },
			{ verb: 'اِسْتَخْرَجَ', type: 'مزيد بثلاثة أحرف (ا، س، ت)', root: 'خَرَجَ' }
		],
		taaWord: 'شَهِيدَة',
		taaReason: 'كُتبت التاء مربوطة لأنه اسم مفرد مؤنث.',
		hamzaWord: 'اُكْتُبْ',
		hamzaReason: 'كُتبت همزة وصل لأنه أمر الفعل الثلاثي (كَتَبَ).',
		quizQ: 'ما نوع الهمزة في الفعل «اُكْتُبْ»؟ وما السبب؟',
		quizCorrect: 'همزة وصل لأنه أمر الفعل الثلاثي',
		quizDistractors: [
			{ text: 'همزة قطع لأنه فعل مضارع للمتكلم', diagnosticFeedback: 'المضارع هو «أَكْتُبُ» بالقطع، أما «اُكْتُبْ» فأمر ثلاثي بالوصل.' },
			{ text: 'همزة قطع لأنه فعل ماضٍ رباعي', diagnosticFeedback: '«اكتبْ» فعل أمر وليس ماضياً رباعياً.' },
			{ text: 'همزة وصل لأنه مصدر سداسي', diagnosticFeedback: '«اكتبْ» فعل أمر ثلاثي وليس مصدراً.' }
		]
	}
];

const tplSarfImlaT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t1_mujarrad_mazid_imla',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'spelling_imla',
	titleAr: 'البناء اللغوي: الفعل المجرد والمزيد والتاء والهمزة في أول الكلمة',
	curriculumLessonId: 'arb_lesson_5ap_t1_taa_and_initial_hamza',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 89 + 5);
		const c = SARF_IMLA_T1_CASES[Math.abs(seed - 1) % SARF_IMLA_T1_CASES.length];
		const mcq = buildUniqueMcqOptions(c.quizCorrect, c.quizDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: c.quizQ,
			questionTextAr: c.quizQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الصواب: ${c.quizCorrect}. تذكّر ردّ الفعل إلى الماضي مع «هو» قبل تصنيفه، وتطبيق اختبار «الواو» للهمزة الأولية.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (الصرف والإملاء)',
			points: 2,
			instruction: 'أجب عن سؤالي الصرف والإملاء الآتيين بدقة:',
			content: [
				{
					type: 'table',
					headers: ['الفعل', 'أصله (الماضي مع هو)', 'مجرد أم مزيد؟'],
					cells: [],
					rows: c.verbs.map((v, idx) => [
						{ content: v.verb, bold: true },
						{ content: '................', answer: v.root },
						{ content: '................................', answer: v.type, mark: idx === 0 ? '0.5' : '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `2) علّل سبب كتابة التاء في كلمة «${c.taaWord}»، وسبب كتابة الهمزة في أول كلمة «${c.hamzaWord}».`,
					answer: `«${c.taaWord}»: ${c.taaReason} | «${c.hamzaWord}»: ${c.hamzaReason}`,
					mark: '1'
				}
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
				'قبل الحكم على الفعل أهو مجرد أم مزيد، أرجعه إلى الماضي مع الضمير «هو».',
				'حروف المضارعة وتاء التأنيث والضمائر المتصلة ليست من أحرف الزيادة.',
				'ضع «وَ» قبل الكلمة لاختبار همزة الوصل من همزة القطع.'
			],
			solutionStepsAr: [
				...c.verbs.map((v) => `${v.verb} -> أصله «${v.root}» -> ${v.type}.`),
				`تعليل التاء في «${c.taaWord}»: ${c.taaReason}`,
				`تعليل الهمزة في «${c.hamzaWord}»: ${c.hamzaReason}`
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 5. الوضعية الإدماجية للفصل الأول (الإنتاج الكتابي)
// ───────────────────────────────────────────────────────────────────────────────
interface IntegrationT1Case {
	context: string;
	supportQuote: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const INTEGRATION_T1_CASES: readonly IntegrationT1Case[] = [
	{
		context: 'بمناسبة يوم النظافة والتطوع في حيك، شاركتَ مع جيرانك وأصدقائك في تنظيف الحي وتزيين ساحته.',
		supportQuote: 'وتعاونوا على البرّ والتقوى',
		instruction:
			'اكتب فقرة من 8 إلى 10 أسطر تصف فيها هذه الحملة التطوعية وأثر التعاون والإخلاص في العمل، موظفاً ناسخاً (كان أو إنّ) وجمع مذكر سالم ومسطّراً تحتهما.',
		rubricCriteria: [
			'الملاءمة واحترام الحجم والهيكلة (1 ن)',
			'توظيف ناسخ وجمع مذكر سالم بسلامة لغوية (1.5 ن)',
			'الانسجام وترابط الأفكار وعلامات الوقف (1 ن)',
			'تنظيم الورقة ووضوح الخط والاستشهاد (0.5 ن)'
		],
		modelOutline:
			'مقدمة: تحديد صباح يوم الجمعة وبداية حملة التنظيف في الحي. العرض: وصف تعاون الجيران والمتطوعين («كان المتطوعون نشيطين» / «إنّ التعاونَ مثمرٌ»)، تقسيم المهام، جمع النفايات وغرس الورود. الخاتمة: فرح الجميع بجمال الحي والدعوة إلى الإخلاص والتعاون الدائم.',
		quizQ: 'عند تحرير وضعية إدماجية حول «حملة تطوعية في الحي» مع توظيف «إنّ» وجمع مذكر سالم، أي جملة تحقق المطلوب بنجاح وسلامة لغوية؟',
		quizCorrect: 'إنَّ المتطوعينَ مخلصونَ في خدمةِ حيِّهم، وقد أصبحتِ الساحةُ نظيفةً.',
		quizDistractors: [
			{ text: 'إنَّ المتطوعونَ مخلصينَ في خدمةِ حيِّهم.', diagnosticFeedback: 'خطأ نحوي! اسم إنّ منصوب بالياء «المتطوعين» وخبرها مرفوع بالواو «مخلصون».' },
			{ text: 'ذهبتُ إلى الشاطئ وسبحتُ في البحرِ الصافي.', diagnosticFeedback: 'خروج تام عن موضوع الحملة التطوعية في الحي!' },
			{ text: 'كانَ المتطوعونَ مخلصونَ في العملِ.', diagnosticFeedback: 'خبر كان يجب أن يكون منصوباً بالياء «مخلصين».' }
		]
	},
	{
		context: 'احتفلت مدرستك بذكرى أول نوفمبر المجيد، فطلب منك أستاذك كتابة كلمة تعبّر فيها عن حبك للوطن ووفائك للشهداء.',
		supportQuote: 'شعب الجزائر مسلم وإلى العروبة ينتسب — الإمام عبد الحميد بن باديس رحمه الله',
		instruction:
			'حرّر نصاً من 8 إلى 10 أسطر تبيّن فيه فضل الشهداء والمجاهدات في تحرير الجزائر وواجبك نحو وطنك، موظفاً جملة اسمية منسوخة بـ«إنّ» وجمع مؤنث سالم، ومسطّراً تحتهما.',
		rubricCriteria: [
			'الالتزام بالموضوع وهيكلة النص (1 ن)',
			'سلامة اللغة وتوظيف «إنّ» وجمع المؤنث السالم (1.5 ن)',
			'الانسجام واستعمال أدوات الربط والترقيم (1 ن)',
			'جمال الأسلوب ونظافة الورقة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: التعريف بذكرى أول نوفمبر ومكانة الجزائر في قلوب أبنائها. العرض: ذكر تضحيات الشهداء والمجاهدات («إنّ الجزائرَ أمانةٌ في أعناقنا»، «قدّم الأبطالُ تضحياتٍ عظيمةً»)، وبيان واجبنا اليوم في الاجتهاد والعلم. الخاتمة: الدعاء للشهداء والعزم على بناء الوطن.',
		quizQ: 'في وضعية إدماجية عن «حب الوطن» يُشترط فيها توظيف «إنّ» وجمع مؤنث سالم منصوب، أي جملة سليمة نحوياً ومناسبة للموضوع؟',
		quizCorrect: 'إنَّ الوطنَ غالٍ، فقد قدَّمتِ المجاهداتُ تضحياتٍ عظيمةً لتحريرِ الجزائرِ.',
		quizDistractors: [
			{ text: 'إنَّ الوطنُ غالياً، وقد قدَّمتِ المجاهداتُ تضحياتَ عظيمةً.', diagnosticFeedback: 'خطآن: اسم إنّ منصوب «الوطنَ»، وجمع المؤنث السالم يُنصب بالكسرة «تضحياتٍ»!' },
			{ text: 'كانَ الوطنَ غالٍ في قلوبنا.', diagnosticFeedback: 'اسم كان مرفوع وخبرها منصوب، كما أن المطلوب «إنّ».' },
			{ text: 'أحبُّ قراءةَ القصصِ الخياليةِ في العطلةِ.', diagnosticFeedback: 'هذه الجملة خارج موضوع حب الوطن وتضحيات الشهداء.' }
		]
	},
	{
		context: 'لاحظتَ أن زميلك الجديد يبحث عن أصدقاء صالحين يعينونه على الاجتهاد في السنة الخامسة ابتدائي.',
		supportQuote: 'المرء على دين خليله فلينظر أحدكم من يخالل',
		instruction:
			'اكتب فقرة من 8 إلى 10 أسطر تنصح فيها زميلك بحسن اختيار الصحبة الصالحة وتبيّن صفاتها، موظفاً فعلاً ناقصاً من أخوات «كان» وجمع تكسير، ومسطّراً تحتهما.',
		rubricCriteria: [
			'الملاءمة واحترام التعليمة والأسطر (1 ن)',
			'سلامة النحو والإملاء وتوظيف ناسخ فعلي وجمع تكسير (1.5 ن)',
			'الانسجام وترابط الجمل (1 ن)',
			'وضوح الخط وتنظيم الورقة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: أهمية الصداقة الصالحة في حياة التلميذ. العرض: ذكر صفات الصديق الصالح («أصبح الصديقُ الصالحُ سنداً في طلبِ العلمِ»، «نطالعُ الكتبَ معاً»)، وتجنب رفاق السوء. الخاتمة: نصيحة ختامية للزميل بالحرص على الصحبة الطيبة.',
		quizQ: 'ما التخطيط الهيكلي الصحيح للوضعية الإدماجية في السنة الخامسة ابتدائي؟',
		quizCorrect: 'مقدمة تمهيدية قصيرة + عرض مفصّل يجيب عن التعليمة ويوظّف المطلوب + خاتمة موجزة مع ترك بياض أول كل فقرة',
		quizDistractors: [
			{ text: 'كتابة فقرة واحدة طويلة دون علامات وقف أو فواصل', diagnosticFeedback: 'تقسيم النص إلى مقدمة وعرض وخاتمة مع علامات الوقف ضروري للانسجام.' },
			{ text: 'نسخ السند المعطى في الامتحان حرفياً دون تغيير', diagnosticFeedback: 'نسخ السند يُفقد التلميذ علامة الوضعية الإدماجية.' },
			{ text: 'الاكتفاء بسطرين فقط دون توظيف الظواهر النحوية المطلوبة', diagnosticFeedback: 'احترام الحجم (8 إلى 10 أسطر) وتوظيف المطلوب معياران أساسيان.' }
		]
	}
];

const tplIntegrationT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t1_written_integration',
	grade: '5ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (الإنتاج الكتابي — الفصل الأول)',
	curriculumLessonId: 'arb_lesson_5ap_t1_nominal_sentence_nawasikh',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 101 + 29);
		const c = INTEGRATION_T1_CASES[Math.abs(seed - 1) % INTEGRATION_T1_CASES.length];
		const mcq = buildUniqueMcqOptions(c.quizCorrect, c.quizDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: c.quizQ,
			questionTextAr: c.quizQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الإجابة السليمة: ${c.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية (الإنتاج الكتابي)',
			points: 4,
			instruction: 'اقرأ السياق والسند والتعليمة بتركيز، ثم حرّر موضوعك بخط واضح ومنظم:',
			content: [
				buildWrittenProductionBlock({
					context: c.context,
					supportQuote: c.supportQuote,
					instruction: c.instruction,
					rubricCriteria: c.rubricCriteria,
					modelOutline: c.modelOutline,
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
				'اترك بياضاً في بداية كل فقرة (مقدمة، عرض، خاتمة).',
				'لا تنسَ التسطير تحت الظواهر اللغوية المطلوبة في التعليمة.',
				'راجع التاء المفتوحة والمربوطة وهمزتي الوصل والقطع وعلامات الوقف قبل التسليم.'
			],
			solutionStepsAr: [
				'قراءة التعليمة وتحديد المطالب والظواهر النحوية الواجب توظيفها.',
				`بناء الخطة: ${c.modelOutline}`,
				'المراجعة اللغوية والإملائية وتسطير التوظيف المطلوب.'
			],
			finalAnswer: c.quizCorrect
		};
	}
};

export const TEMPLATES_5AP_T1: ArabicParameterizedTemplate[] = [
	tplIntellectualT1,
	tplNawasikhT1,
	tplPluralsT1,
	tplSarfImlaT1,
	tplIntegrationT1
];
