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
// قوالب التمارين والاختبارات — السنة الخامسة ابتدائي — اللغة العربية — الفصل الثالث
// بما في ذلك موضوع امتحان تقييم المكتسبات المحدّث (2024–2025)
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. البناء الفكري: التراث الجزائري، الأسفار والرحلات، والتكنولوجيا النافعة
// ───────────────────────────────────────────────────────────────────────────────
interface T3PassagePack {
	title: string;
	paragraphs: string[];
	author: string;
	vocabulary: Array<{ word: string; meaning: string }>;
	bestTitle: string;
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

const T3_PASSAGES: readonly T3PassagePack[] = [
	{
		title: 'رحلة إلى مدينة الجسور المعلقة',
		paragraphs: [
			'في عطلةِ الربيعِ، سافرَ [[أمينٌ]] مع أسرتهِ إلى مدينةِ قسنطينةَ العريقةِ، فوقفَ مندهشاً أمامَ جسورِها الشامخةِ التي [[بُنِيَتْ]] فوقَ صخرٍ عظيمٍ، وتذكّرَ سيرةَ الإمامِ عبدِ الحميدِ بنِ باديس رحمه اللهُ الذي نَشَرَ العلمَ في جامعِها الأخضرِ.',
			'لقد عَلَّمَتْ هذهِ الرحلةُ التلميذَ أنَّ الجزائرَ تزخرُ بمعالمَ تاريخيةٍ وحضاريةٍ [[تُصانُ]] بوعيِ أبنائِها، فعادَ إلى مدينتهِ وقد ازدادَ فخراً بتاريخِ وطنهِ وتراثهِ الأصيلِ.'
		],
		author: 'نص تربوي ثقافي جزائري',
		vocabulary: [
			{ word: 'الشامخة', meaning: 'العالية والمرتفعة' },
			{ word: 'تزخر', meaning: 'تمتلئ وتغتني' }
		],
		bestTitle: 'رحلة علمية وتاريخية إلى قسنطينة',
		compQ1: 'ما أبرز ما أدهش أميناً خلال زيارته لمدينة قسنطينة العريقة؟',
		compA1: 'أدهشته جسورها الشامخة التي بُنيت فوق صخر عظيم، كما تذكّر سيرة الإمام عبد الحميد بن باديس رحمه الله في الجامع الأخضر.',
		compQ2: 'بمَ تُصان المعالم التاريخية والحضارية للجزائر حسب الفقرة الثانية؟',
		compA2: 'تُصان بوعي أبنائها واعتزازهم بتاريخ وطنهم وتراثهم الأصيل.',
		synWord: 'تمتلئ',
		synAnswer: 'تزخر',
		antWord: 'الحديثة',
		antAnswer: 'العريقة',
		quizPrompt: 'ما الفائدة التربوية التي خرج بها أمين من رحلته إلى قسنطينة؟',
		quizCorrect: 'الاعتزاز بتاريخ الجزائر ومعالمها الحضارية والوعي بضرورة صيانتها',
		quizDistractors: [
			{ text: 'تفضيل السفر خارج الوطن وإهمال المدن الجزائرية', diagnosticFeedback: 'النص يبرز جمال المدن الجزائرية ومعالمها.' },
			{ text: 'الاكتفاء باللعب وترك زيارة المساجد والمعالم التاريخية', diagnosticFeedback: 'زار أمين الجسور وتذكّر تاريخ الجامع الأخضر.' },
			{ text: 'تعلّم السباحة وصيد الأسماك في البحر', diagnosticFeedback: 'قسنطينة مدينة داخلية عريقة وليست شاطئية.' }
		],
		valueAr: 'الاعتزاز بالتراث الجزائري والوفاء لعلماء الوطن.'
	},
	{
		title: 'الاستعمال الراشد للتكنولوجيا والإنترنت',
		paragraphs: [
			'أصبحتِ التكنولوجيا الحديثةُ وسيلةً نافعةً إذا أُحسنَ استعمالُها، فالحاسوبُ والإنترنتُ [[يُسَاعِدَانِ]] التلميذَ على البحثِ العلميِّ ومراجعةِ الدروسِ وتعلّمِ اللغاتِ والبرمجةِ في وقتٍ وجيزٍ.',
			'غيرَ أنَّ الإفراطَ في الجلوسِ أمامَ الشاشاتِ يُضِرُّ بالبصرِ ويُضيّعُ الأوقاتَ، ولذلكَ ينبغي أن [[يُنظَّمَ]] الوقتُ بين المطالعةِ واللعبِ المفيدِ، وأن يُستشارَ الوالدانِ عند تصفّحِ المواقعِ التعليميةِ.'
		],
		author: 'نص تربوي تكنولوجي جزائري',
		vocabulary: [
			{ word: 'وجيز', meaning: 'قصير' },
			{ word: 'الإفراط', meaning: 'الإكثار والمبالغة' }
		],
		bestTitle: 'الاستعمال الراشد للتكنولوجيا النافعة',
		compQ1: 'فيمَ تساعد التكنولوجيا الحديثة التلميذ عندما يُحسن استعمالها؟',
		compA1: 'تساعده على البحث العلمي ومراجعة الدروس وتعلّم اللغات والبرمجة في وقت وجيز.',
		compQ2: 'ما أضرار الإفراط في الجلوس أمام الشاشات؟ وكيف نتجنّبها؟',
		compA2: 'يضر بالبصر ويضيّع الأوقات؛ ونتجنّبها بتنظيم الوقت بين المطالعة واللعب المفيد واستشارة الوالدين عند التصفح.',
		synWord: 'المبالغة',
		synAnswer: 'الإفراط',
		antWord: 'الضارة',
		antAnswer: 'النافعة',
		quizPrompt: 'ما الشرط الأساسي للاستفادة من التكنولوجيا والإنترنت حسب النص؟',
		quizCorrect: 'تنظيم الوقت وحسن الاستعمال في البحث والمراجعة مع استشارة الوالدين',
		quizDistractors: [
			{ text: 'الجلوس ساعات طويلة بلا توقف أمام الألعاب الإلكترونية', diagnosticFeedback: 'النص يحذّر من الإفراط لأنه يضر بالبصر ويضيّع الوقت.' },
			{ text: 'منع استعمال الحاسوب نهائياً في الدراسة والبحث', diagnosticFeedback: 'النص يؤكد أن التكنولوجيا نافعة إذا أُحسن استعمالها.' },
			{ text: 'تصفح أي موقع مجهول دون علم الأسرة', diagnosticFeedback: 'النص يوصي باستشارة الوالدين عند تصفح المواقع التعليمية.' }
		],
		valueAr: 'تنظيم الوقت والاستعمال الآمن والنافع للتكنولوجيا.'
	},
	{
		title: 'الأمانة والتراث الجزائري الأصيل',
		paragraphs: [
			'في قريةٍ جبليةٍ هادئةٍ من قُرَى [[الجزائرِ]]، عاشَ الحرفيُّ الصالحُ عمّي مسعودٌ يصنعُ الفخارَ المزخرفَ والزرابيَ التقليديةَ، وقد [[وَعَدَ]] أبناءَهُ أن يعلّمهم هذهِ الحرفةَ العريقةَ كي لا تندثرَ مع مرورِ الزمنِ.',
			'كانَ عمّي مسعودٌ يتقنُ صناعتهُ ويقولُ لأحفادهِ: «التراثُ أمانةٌ في أعناقنا، ومَن [[سَعَى]] إلى حفظِ إرثِ أجدادهِ فقد حفظَ هويةَ وطنهِ وكرامتهُ».'
		],
		author: 'نص تراثي جزائري',
		vocabulary: [
			{ word: 'تندثر', meaning: 'تزول وتختفي' },
			{ word: 'إرث', meaning: 'تراث وما يتركه الأجداد للأجيال' }
		],
		bestTitle: 'صيانة الحرف التقليدية والتراث الجزائري',
		compQ1: 'ما الحرفة التي يمارسها عمّي مسعود؟ وبمَ وعد أبناءه؟',
		compA1: 'يصنع الفخار المزخرف والزرابي التقليدية، ووعد أبناءه أن يعلّمهم هذه الحرفة كي لا تندثر.',
		compQ2: 'لماذا يُعدّ الحفاظ على التراث واجباً وطنياً حسب قول عمّي مسعود؟',
		compA2: 'لأن التراث أمانة في أعناقنا، وحفظ إرث الأجداد هو حفظ لهوية الوطن وكرامته.',
		synWord: 'تختفي',
		synAnswer: 'تندثر',
		antWord: 'صاخبة',
		antAnswer: 'هادئة',
		quizPrompt: 'ما الرسالة التي وجّهها عمّي مسعود لأحفاده في النص؟',
		quizCorrect: 'إن التراث والحرف التقليدية أمانة يجب حفظها لأنها تحمي هوية الوطن',
		quizDistractors: [
			{ text: 'إن الحرف التقليدية قديمة ولا فائدة من تعلّمها اليوم', diagnosticFeedback: 'بل وعد بتعليمها لأبنائه حتى لا تندثر!' },
			{ text: 'إن الانتقال إلى المدن الكبرى يغني عن احترام الأجداد', diagnosticFeedback: 'النص يمجّد إرث الأجداد والاعتزاز بالهوية.' },
			{ text: 'إن الصناعة اليدوية لا تحتاج إلى إتقان أو صبر', diagnosticFeedback: 'ذُكر في النص أن عمي مسعود كان يتقن صناعته.' }
		],
		valueAr: 'الحفاظ على التراث الوطني وإتقان الحرف الأصيلة.'
	}
];

const tplIntellectualT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t3_intellectual_heritage_travel_tech',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: نص نثري حول التراث والرحلات والتكنولوجيا النافعة',
	curriculumLessonId: 'arb_lesson_5ap_t3_defective_verbs',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 41 + 9);
		const pack = T3_PASSAGES[Math.abs(seed - 1) % T3_PASSAGES.length];
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
			explanation: `الصواب المستخلص من السند: ${pack.quizCorrect}.`
		};

		const illustrationId: IllustrationId =
			pack.title === 'رحلة إلى مدينة الجسور المعلقة'
				? 'pri_ara_08_sahara_oasis_dunes'
				: pack.title === 'الاستعمال الراشد للتكنولوجيا والإنترنت'
					? 'pri_ara_07_science_library_telescope'
					: 'pri_ara_03_algerian_village_orchard';

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
				answer: `1) العنوان المناسب: «${pack.bestTitle}».`,
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
				content: `4) استخرج من النص مرادف «${pack.synWord}» وضدّ «${pack.antWord}»، ثم اذكر العبرة المستفادة من النص.`,
				answer: `4) مرادف «${pack.synWord}»: «${pack.synAnswer}» | ضد «${pack.antWord}»: «${pack.antAnswer}» | العبرة: ${pack.valueAr}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'أولاً: السند وأسئلة البناء الفكري',
			points: 3,
			instruction: 'اقرأ السند الآتي بتركيز ثم أجب عن أسئلة البناء الفكري:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص ببطء لفهم الموضوع العام والأفكار الجزئية.',
				'أجب بجمل تامة وواضحة مرتبطة بالسند.',
				'استخرج المرادف والضد من كلمات النص ذاته.'
			],
			solutionStepsAr: [
				`العنوان: «${pack.bestTitle}».`,
				pack.compA1,
				pack.compA2,
				`المفردات: مرادف «${pack.synWord}» = «${pack.synAnswer}»، ضد «${pack.antWord}» = «${pack.antAnswer}».`
			],
			finalAnswer: pack.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 2. البناء اللغوي 1: الفعل المعتل وأنواعه + المبني للمجهول ونائب الفاعل
// ───────────────────────────────────────────────────────────────────────────────
interface T3DefectivePassiveCase {
	sentence: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	activeSentence: string;
	passiveSentence: string;
	defectiveVerbs: Array<{ verb: string; root: string; kind: string }>;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T3_DEFECTIVE_PASSIVE_CASES: readonly T3DefectivePassiveCase[] = [
	{
		sentence: 'كُرِّمَ المُتَفَوِّقُونَ فِي الحَفْلِ، وَيُصَانُ التُّرَاثُ بِوَعْيِ الأَبْنَاءِ.',
		irabEntries: [
			{ target: 'المُتَفَوِّقُونَ', irab: 'نائب فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'التُّرَاثُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' }
		],
		activeSentence: 'كَتَبَ التِّلْمِيذُ القِصَّةَ.',
		passiveSentence: 'كُتِبَتِ القِصَّةُ.',
		defectiveVerbs: [
			{ verb: 'يَقِفُ', root: 'وَقَفَ', kind: 'معتل مثال' },
			{ verb: 'قُلْتُ', root: 'قَالَ', kind: 'معتل أجوف' },
			{ verb: 'يَسْعَى', root: 'سَعَى', kind: 'معتل ناقص' }
		],
		quizQ: 'ما التحويل الصحيح للجملة «شَجَّعَ المُدِيرُ المُجْتَهِدِينَ» إلى المبني للمجهول؟',
		quizCorrect: 'شُجِّعَ المُجْتَهِدُونَ.',
		quizDistractors: [
			{ text: 'شُجِّعَ المُجْتَهِدِينَ.', diagnosticFeedback: 'نائب الفاعل يكون مرفوعاً دائماً (بالواو هنا: «المجتهدون»)!' },
			{ text: 'يُشَجَّعُ المُجْتَهِدُونَ.', diagnosticFeedback: 'الجملة الأصلية في الزمن الماضي لا المضارع.' },
			{ text: 'شَجَّعَ المُجْتَهِدُونَ.', diagnosticFeedback: 'نسيت بناء الفعل الماضي للمجهول بضم أوله وكسر ما قبل آخره: «شُجِّعَ».' }
		]
	},
	{
		sentence: 'فُتِحَتْ مَكْتَبَةُ القَرْيَةِ، وَقِيلَ الحَقُّ بِشَجَاعَةٍ.',
		irabEntries: [
			{ target: 'مَكْتَبَةُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة وهو مضاف.', mark: '0.5' },
			{ target: 'الحَقُّ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' }
		],
		activeSentence: 'يَغْرِسُ الفَلَّاحُ الشُّجَيْرَاتِ.',
		passiveSentence: 'تُغْرَسُ الشُّجَيْرَاتُ.',
		defectiveVerbs: [
			{ verb: 'وَصَلَ', root: 'وَصَلَ', kind: 'معتل مثال' },
			{ verb: 'يَصُومُ', root: 'صَامَ', kind: 'معتل أجوف' },
			{ verb: 'دَعَا', root: 'دَعَا', kind: 'معتل ناقص' }
		],
		quizQ: 'ما نوع الفعل المعتل «يَصُومُ» بعد إرجاعه إلى الماضي مع «هو»؟',
		quizCorrect: 'معتل أجوف (ماضيه: صَامَ)',
		quizDistractors: [
			{ text: 'معتل مثال', diagnosticFeedback: 'الياء في «يصومُ» للمضارعة؛ ماضيه «صَامَ» وحرف العلة في وسطه.' },
			{ text: 'معتل ناقص', diagnosticFeedback: 'حرف العلة في وسط «صامَ» وليس في آخره.' },
			{ text: 'صحيح سالم', diagnosticFeedback: 'في وسط «صَامَ» ألف علة فهو فعل معتل أجوف.' }
		]
	},
	{
		sentence: 'يُحْتَرَمُ العَالِمَانِ، وَبُنِيَتِ الجُسُورُ فَوْقَ الصَّخْرِ.',
		irabEntries: [
			{ target: 'العَالِمَانِ', irab: 'نائب فاعل مرفوع وعلامة رفعه الألف لأنه مثنى.', mark: '0.5' },
			{ target: 'الجُسُورُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '0.5' }
		],
		activeSentence: 'بَاعَ التَّاجِرُ البِضَاعَةَ.',
		passiveSentence: 'بِيعَتِ البِضَاعَةُ.',
		defectiveVerbs: [
			{ verb: 'وَعَدَ', root: 'وَعَدَ', kind: 'معتل مثال' },
			{ verb: 'يَبِيعُ', root: 'بَاعَ', kind: 'معتل أجوف' },
			{ verb: 'جَرَى', root: 'جَرَى', kind: 'معتل ناقص' }
		],
		quizQ: 'ما إعراب «العَالِمَانِ» في الجملة: «يُحْتَرَمُ العَالِمَانِ»؟',
		quizCorrect: 'نائب فاعل مرفوع وعلامة رفعه الألف لأنه مثنى',
		quizDistractors: [
			{ text: 'فاعل مرفوع بالألف لأنه مثنى', diagnosticFeedback: 'الفعل «يُحْتَرَمُ» مبني للمجهول، والاسم المرفوع بعده نائب فاعل!' },
			{ text: 'مفعول به مرفوع بالألف', diagnosticFeedback: 'المفعول به يكون منصوباً ولا يأتي بعد المبني للمجهول هنا.' },
			{ text: 'نائب فاعل مرفوع بالواو', diagnosticFeedback: '«العالمانِ» مثنى وعلامة رفعه الألف لا الواو.' }
		]
	}
];

const tplDefectivePassiveT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t3_defective_and_passive_voice',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: الفعل المعتل وأنواعه والمبني للمجهول ونائب الفاعل',
	curriculumLessonId: 'arb_lesson_5ap_t3_passive_voice_naib_fail',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 61 + 17);
		const c = T3_DEFECTIVE_PASSIVE_CASES[Math.abs(seed - 1) % T3_DEFECTIVE_PASSIVE_CASES.length];
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
			explanation: `الصواب: ${c.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (الفعل المعتل والمبني للمجهول)',
			points: 2,
			instruction: `اقرأ الجملة الآتية ثم أجب عن الأسئلة: «${c.sentence}»`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمتين المطلوبتين في الجدول الآتي:',
					mark: '1'
				},
				buildIrabTableBlock(c.irabEntries),
				{
					type: 'text',
					content: `2) حوّل الجملة الآتية من المبني للمعلوم إلى المبني للمجهول مع الضبط: «${c.activeSentence}»`,
					answer: `التحويل: «${c.passiveSentence}»`,
					mark: '0.5'
				},
				{
					type: 'text',
					content: `3) صنّف الأفعال المعتلة الآتية (مثال، أجوف، ناقص): ${c.defectiveVerbs.map((v) => `«${v.verb}»`).join('، ')}.`,
					answer: c.defectiveVerbs.map((v) => `${v.verb} (${v.root}): ${v.kind}`).join(' | '),
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'في المبني للمجهول نحذف الفاعل ونرفع المفعول به ليصير نائب فاعل.',
				'الماضي المبني للمجهول: ضمّ أوله وكسر ما قبل آخره | المضارع: ضمّ أوله وفتح ما قبل آخره.',
				'أرجع الفعل المعتل إلى الماضي مع «هو» لتعرف هل العلة في الأول (مثال) أم الوسط (أجوف) أم الآخر (ناقص).'
			],
			solutionStepsAr: [
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`المبني للمجهول: ${c.passiveSentence}`,
				...c.defectiveVerbs.map((v) => `${v.verb} -> ${v.root} (${v.kind}).`)
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. البناء اللغوي 2: الفعل اللازم والمتعدي + الألف اللينة في الأفعال والأسماء
// ───────────────────────────────────────────────────────────────────────────────
interface T3TransitiveAlifCase {
	classifySentences: Array<{ sentence: string; verb: string; kind: string }>;
	alifWords: Array<{ word: string; reason: string }>;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T3_TRANSITIVE_ALIF_CASES: readonly T3TransitiveAlifCase[] = [
	{
		classifySentences: [
			{ sentence: 'سَافَرَ المُهَنْدِسُ إِلَى قُسَنْطِينَةَ.', verb: 'سَافَرَ', kind: 'فعل لازم (اكتفى بفاعله)' },
			{ sentence: 'اِخْتَرَعَ العَالِمُ جِهَازاً ذَكِيّاً.', verb: 'اِخْتَرَعَ', kind: 'فعل متعدٍّ (نصب المفعول به: جهازاً)' }
		],
		alifWords: [
			{ word: 'دَعَا', reason: 'كُتبت الألف ممدودة لأنه فعل ثلاثي أصل ألفه واو (يَدْعُو).' },
			{ word: 'مُسْتَشْفَى', reason: 'كُتبت الألف مقصورة لأنه اسم غير ثلاثي ولم تسبق ألفه ياء.' }
		],
		quizQ: 'في أي جملة ورد الفعل **لازماً** (يكتفي بفاعله ولا ينصب مفعولاً به)؟',
		quizCorrect: 'سَافَرَ المُهَنْدِسُ إِلَى قُسَنْطِينَةَ صَبَاحاً.',
		quizDistractors: [
			{ text: 'اِخْتَرَعَ العَالِمُ جِهَازاً ذَكِيّاً.', diagnosticFeedback: '«جهازاً» مفعول به، إذن «اخترعَ» فعل متعدٍّ.' },
			{ text: 'قَرَأَ التِّلْمِيذُ كِتَاباً مُفِيداً.', diagnosticFeedback: '«كتاباً» مفعول به، إذن «قرأَ» فعل متعدٍّ.' },
			{ text: 'صَنَعَ الحِرَفِيُّ فُخَّاراً جَمِيلاً.', diagnosticFeedback: '«فخاراً» مفعول به، إذن «صنعَ» فعل متعدٍّ.' }
		]
	},
	{
		classifySentences: [
			{ sentence: 'نَجَحَ المُجْتَهِدُ فِي الامْتِحَانِ.', verb: 'نَجَحَ', kind: 'فعل لازم (اكتفى بفاعله)' },
			{ sentence: 'تَعَلَّمَ الطِّفْلُ البَرْمَجَةَ النَّافِعَةَ.', verb: 'تَعَلَّمَ', kind: 'فعل متعدٍّ (نصب المفعول به: البرمجةَ)' }
		],
		alifWords: [
			{ word: 'بَنَى', reason: 'كُتبت الألف مقصورة لأنه فعل ثلاثي أصل ألفه ياء (يَبْنِي).' },
			{ word: 'هَدَايَا', reason: 'كُتبت الألف ممدودة لأنه اسم غير ثلاثي سبقت ألفه ياء.' }
		],
		quizQ: 'لماذا كُتبت الألف اللينة ممدودة في كلمة «هَدَايَا»؟',
		quizCorrect: 'لأنه اسم غير ثلاثي سبقت ألفه ياء',
		quizDistractors: [
			{ text: 'لأنه فعل ثلاثي أصل ألفه واو', diagnosticFeedback: '«هدايا» اسم غير ثلاثي (5 أحرف) وليس فعلاً ثلاثياً.' },
			{ text: 'لأنه اسم ثلاثي أصل ألفه ياء', diagnosticFeedback: 'الاسم الثلاثي الذي أصل ألفه ياء تُكتب ألفه مقصورة مثل «فتى».' },
			{ text: 'لأنه اسم علم للتفريق عن الفعل', diagnosticFeedback: 'قاعدة التفريق خاصة بالاسم العَلَم «يحيى» والفعل «يحيا».' }
		]
	},
	{
		classifySentences: [
			{ sentence: 'جَلَسَ الجَدُّ فِي الحَدِيقَةِ مَسْرُوراً.', verb: 'جَلَسَ', kind: 'فعل لازم (اكتفى بفاعله)' },
			{ sentence: 'أَخْرَجَ أَمِينٌ الكِتَابَ مِنَ المِحْفَظَةِ.', verb: 'أَخْرَجَ', kind: 'فعل متعدٍّ (تعدّى بالهمزة ونصب: الكتابَ)' }
		],
		alifWords: [
			{ word: 'عَصَا', reason: 'كُتبت الألف ممدودة لأنه اسم ثلاثي أصل ألفه واو (مثناه: عَصَوَان).' },
			{ word: 'اِسْتَدْعَى', reason: 'كُتبت الألف مقصورة لأنه فعل غير ثلاثي ولم تسبق ألفه ياء.' }
		],
		quizQ: 'اختر المجموعة التي كُتبت فيها جميع الألفات اللينة كتابةً **صحيحة**:',
		quizCorrect: 'سَمَا — جَرَى — مُنْتَدَى — دُنْيَا',
		quizDistractors: [
			{ text: 'سَمَى — جَرَا — مُنْتَدَا — دُنْيَى', diagnosticFeedback: 'عكست جميع الكلمات الأربع! «سما» من يسمو، و«جرى» من يجري، و«منتدى» غير ثلاثي، و«دنيا» بعد ياء.' },
			{ text: 'سَمَا — جَرَى — مُنْتَدَا — دُنْيَا', diagnosticFeedback: '«منتدى» اسم غير ثلاثي لم تسبق ألفه ياء فيُكتب مقصوراً.' },
			{ text: 'سَمَا — جَرَى — مُنْتَدَى — دُنْيَى', diagnosticFeedback: '«دنيا» سبقت ألفها ياء فتُكتب ممدودة.' }
		]
	}
];

const tplTransitiveAlifT3: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t3_transitive_and_soft_alif',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'spelling_imla',
	titleAr: 'البناء اللغوي: الفعل اللازم والمتعدي والألف اللينة في الأفعال والأسماء',
	curriculumLessonId: 'arb_lesson_5ap_t3_soft_alif_verbs_nouns',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 83 + 21);
		const c = T3_TRANSITIVE_ALIF_CASES[Math.abs(seed - 1) % T3_TRANSITIVE_ALIF_CASES.length];
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
			explanation: `الصواب: ${c.quizCorrect}.`
		};

		const sujetExercise: ExerciseBlock = {
			customTitle: 'البناء اللغوي (اللازم والمتعدي والألف اللينة)',
			points: 2,
			instruction: 'أنجز المطلوب في النحو والإملاء بدقة:',
			content: [
				{
					type: 'table',
					headers: ['الجملة', 'الفعل', 'نوعه (لازم أم متعدٍّ؟)'],
					cells: [],
					rows: c.classifySentences.map((s) => [
						{ content: s.sentence },
						{ content: s.verb, bold: true },
						{ content: '................................', answer: s.kind, mark: '0.5' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `2) علّل سبب رسم الألف اللينة في الكلمتين: «${c.alifWords[0].word}» و«${c.alifWords[1].word}».`,
					answer: `«${c.alifWords[0].word}»: ${c.alifWords[0].reason} | «${c.alifWords[1].word}»: ${c.alifWords[1].reason}`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'اختبر الفعل بهاء الغائب (ـهُ): إن صحّ فهو متعدٍّ، وإلا فهو لازم.',
				'في الثلاثي: أصل الألف واو -> ممدودة (ا)، أصلها ياء -> مقصورة (ى).',
				'في غير الثلاثي: مقصورة دائماً إلا إذا سبقتها ياء فتُكتب ممدودة.'
			],
			solutionStepsAr: [
				...c.classifySentences.map((s) => `${s.verb}: ${s.kind}.`),
				...c.alifWords.map((a) => `${a.word}: ${a.reason}`)
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. الوضعية الإدماجية القياسية للفصل الثالث
// ───────────────────────────────────────────────────────────────────────────────
interface IntegrationT3StandardCase {
	context: string;
	supportQuote: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const INTEGRATION_T3_STANDARD_CASES: readonly IntegrationT3StandardCase[] = [
	{
		context: 'شاركتَ في رحلة مدرسية إلى معلم تاريخي عريق في الجزائر (كقسنطينة أو تلمسان أو القصبة) وأُعجبتَ بجماله وعبق تاريخه.',
		supportQuote: 'الاعتزاز بالوطن وصيانة معالمه وتراثه الحضاري واجب كل مواطن واعٍ مخلص',
		instruction:
			'اكتب نصاً من 8 إلى 12 سطراً تصف فيه هذه الرحلة ومعالمها وتدعو فيه إلى صيانة التراث الجزائري، موظفاً فعلاً مبنياً للمجهول وفعلاً معتلاً وكلمة تنتهي بألف لينة، ومسطّراً تحتها.',
		rubricCriteria: [
			'الملاءمة والهيكلة (مقدمة، عرض، خاتمة) واحترام الحجم (1 ن)',
			'سلامة اللغة وتوظيف المبني للمجهول والمعتل والألف اللينة (1.5 ن)',
			'الانسجام وأدوات الربط وعلامات الوقف (1 ن)',
			'جمال الأسلوب وتنظيم الورقة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: تحديد موعد الرحلة ووجهتها. العرض: وصف المعلم التاريخي («بُنِيَ المعلمُ منذ قرون»، «وقفتُ مبهوراً»، «زُرنا القرى والمناظر العليا»)، وتقدير جهود الأجداد. الخاتمة: الدعوة إلى حماية التراث الوطني.',
		quizQ: 'أي جملة توظّف **فعلاً مبنياً للمجهول** و**كلمة بألف لينة صحيحة** في وضعية عن زيارة معلم تاريخي؟',
		quizCorrect: 'بُنِيَتْ جُسُورُ قُسَنْطِينَةَ بِإِتْقَانٍ عَجِيبٍ، وَسَمَا تَارِيخُهَا عَالِياً.',
		quizDistractors: [
			{ text: 'بُنِيَ جُسُورَ قُسَنْطِينَةَ، وَسَمَى تَارِيخُهَا.', diagnosticFeedback: 'نائب الفاعل مرفوع «جسورُ» مع تأنيث الفعل، و«سما» أصلها واو فتُكتب ممدودة!' },
			{ text: 'بَنَى المِهَنْدِسُ جِسْراً جَدِيداً.', diagnosticFeedback: 'الفعل هنا مبني للمعلوم وليس مبنياً للمجهول.' },
			{ text: 'أحبُّ تناولَ الفواكه الطازجة في الصيف.', diagnosticFeedback: 'الجملة خارج موضوع الرحلة والمعالم التاريخية.' }
		]
	},
	{
		context: 'لاحظتَ أن أخاك الصغير يقضي وقتاً طويلاً أمام الهاتف الذكي والألعاب الإلكترونية، ويهمل دروسه ومطالعته.',
		supportQuote: 'نعمتان مغبون فيهما كثير من الناس: الصحة والفراغ',
		instruction:
			'حرّر نصاً توجيهياً من 8 إلى 12 سطراً تنصح فيه أخاك بالاستعمال الراشد للتكنولوجيا النافعة وتنظيم وقته، موظفاً فعلاً لازماً وفعلاً متعدياً وفعلاً مبنياً للمجهول، ومسطّراً تحتها.',
		rubricCriteria: [
			'احترام النمط التوجيهي والموضوع والهيكلة (1 ن)',
			'سلامة اللغة وتوظيف الفعل اللازم والمتعدي والمبني للمجهول (1.5 ن)',
			'الانسجام وعلامات الترقيم (1 ن)',
			'جودة العرض والاستشهاد (0.5 ن)'
		],
		modelOutline:
			'مقدمة: أهمية التكنولوجيا في عصرنا وخطورة سوء استعمالها. العرض: تقديم نصائح عملية للأخ («تعلّمَ التلميذُ البرمجةَ»، «اجلسْ للعب وقتاً قصيراً فقط»، «يُنظَّمُ الوقتُ بين الدراسة والراحة»). الخاتمة: التشجيع على استثمار الوقت فيما ينفع.',
		quizQ: 'أي جملة مناسبة لوضعية «الاستعمال الراشد للتكنولوجيا» وتحتوي على **فعل مبني للمجهول مضبوط بالشكل**؟',
		quizCorrect: 'يُسْتَعْمَلُ الحَاسُوبُ فِي البَحْثِ العِلْمِيِّ وَمُرَاجَعَةِ الدُّرُوسِ.',
		quizDistractors: [
			{ text: 'يُسْتَعْمَلُ الحَاسُوبَ فِي اللَّعِبِ دَائِماً.', diagnosticFeedback: 'نائب الفاعل مرفوع بالضمة «الحاسوبُ»، كما أن الفكرة تخالف الاستعمال الراشد!' },
			{ text: 'يَسْتَعْمِلُ التِّلْمِيذُ الحَاسُوبَ.', diagnosticFeedback: 'هذا فعل مبني للمعلوم لأن الفاعل «التلميذُ» مذكور.' },
			{ text: 'سافرتُ إلى الصحراء في العطلة.', diagnosticFeedback: 'خروج عن موضوع الاستعمال الراشد للتكنولوجيا.' }
		]
	}
];

const tplIntegrationT3Standard: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t3_written_integration_standard',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية القياسية (الإنتاج الكتابي — الفصل الثالث)',
	curriculumLessonId: 'arb_lesson_5ap_t3_intransitive_transitive_verbs',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 113 + 7);
		const c = INTEGRATION_T3_STANDARD_CASES[Math.abs(seed - 1) % INTEGRATION_T3_STANDARD_CASES.length];
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
			explanation: `الصواب: ${c.quizCorrect}.`
		};

		const cIllustrationId: IllustrationId = c.context.includes('رحلة مدرسية')
			? 'pri_ara_08_sahara_oasis_dunes'
			: 'pri_ara_07_science_library_telescope';

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية (الإنتاج الكتابي)',
			points: 4,
			instruction: 'اقرأ السياق والسند والتعليمة بعناية ثم حرّر موضوعك منظماً ومضبوطاً:',
			content: [
				buildIllustratedFigureBlock(cIllustrationId, {
					mode: 'image_only',
					maxHeight: 112,
					width: '58%'
				}),
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
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'نظّم نصك في مقدمة وعرض وخاتمة مع ترك البياض في أول كل فقرة.',
				'سطّر تحت كل ظاهرة لغوية طلبتها التعليمة وتحقق من صحتها النحوية.',
				'راجع الألف اللينة والهمزات والتاء وعلامات الوقف.'
			],
			solutionStepsAr: [
				'فهم السياق والمطالب اللغوية المحددة في التعليمة.',
				`خطة التحرير: ${c.modelOutline}`,
				'المراجعة والتنقيح قبل التسليم.'
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 5. موضوع امتحان تقييم المكتسبات 2025 الكامل (فهم المكتوب + الإنتاج الكتابي بمعايير التملك الـ4)
// ───────────────────────────────────────────────────────────────────────────────
interface Taqyeem2025Pack {
	title: string;
	paragraphs: string[];
	author: string;
	vocabulary: Array<{ word: string; meaning: string }>;
	mainIdea: string;
	explicitQ: string;
	explicitA: string;
	vocabTaskQ: string;
	vocabTaskA: string;
	opinionQ: string;
	opinionA: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	transformTaskQ: string;
	transformTaskA: string;
	spellingTaskQ: string;
	spellingTaskA: string;
	prodContext: string;
	prodQuote: string;
	prodInstruction: string;
	prodOutline: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const TAQYEEM_2025_PACKS: readonly Taqyeem2025Pack[] = [
	{
		title: 'برّ الوالدين والاجتهاد في طلب العلم',
		paragraphs: [
			'في كلِّ صباحٍ باكرٍ، يستيقظُ سالمٌ [[نشيطاً]]، فيُصلّي الفجرَ ويُقبّلُ يدَ والديهِ اللذينِ [[يَسْهَرَانِ]] على تربيتهِ وتعليمهِ، ثم يتوجّهُ إلى مدرستهِ وهو عازمٌ على الاجتهادِ ونيلِ أعلى الدرجاتِ.',
			'لقد أدركَ سالمٌ أنَّ النجاحَ ثمرةُ الصبرِ والإخلاصِ، وأنَّ برَّ الوالدينِ وطاعةَ المعلمينَ هما الطريقُ القويمُ لخدمةِ وطنهِ الجزائرِ، فبمثلِ هؤلاءِ الأبناءِ تُبْنَى [[الأوطانُ]] وتزدهرُ الحضارةُ.'
		],
		author: 'سند تدريبي لامتحان تقييم المكتسبات — 5 ابتدائي',
		vocabulary: [
			{ word: 'القويم', meaning: 'المستقيم والصحيح' },
			{ word: 'تزدهر', meaning: 'تتقدم وتنمو' }
		],
		mainIdea: 'أثر برّ الوالدين والاجتهاد في طلب العلم في تحقيق النجاح وبناء الوطن.',
		explicitQ: 'ماذا يفعل سالم كل صباح قبل توجهه إلى المدرسة؟ وما الطريق القويم لخدمة الوطن حسب النص؟',
		explicitA: 'يستيقظ باكراً نشيطاً فيصلي الفجر ويقبّل يد والديه؛ والطريق القويم هو برّ الوالدين وطاعة المعلمين والاجتهاد في العلم.',
		vocabTaskQ: 'اشرح كلمة «القويم» ثم وظّفها في جملة مفيدة من إنشائك.',
		vocabTaskA: 'القويم: المستقيم والصحيح. | التوظيف: «يهدي الإسلامُ المسلمَ إلى الصراطِ القويمِ».',
		opinionQ: 'يقول النص: «بمثل هؤلاء الأبناء تُبنى الأوطان». هل توافق هذا الرأي؟ علّل إجابتك في سطرين.',
		opinionA: 'نعم، أوافق هذا الرأي تماماً؛ لأن التلميذ البارّ بوالديه والمجتهد في دراسته يصبح مواطناً صالحاً ومخلصاً يخدم وطنه بعلمه وأخلاقه ويسهم في نهضته.',
		irabEntries: [
			{ target: 'نشيطاً', irab: 'حال منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'يَسْهَرَانِ', irab: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، وألف الاثنين فاعل.', mark: '0.5' },
			{ target: 'الأوطانُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة (بعد الفعل المبني للمجهول «تُبْنَى»).', mark: '0.5' }
		],
		transformTaskQ: 'حوّل الجملة «تُبْنَى الأوطانُ بالعلمِ» إلى المبني للمعلوم بفاعل مناسب، وبيّن نوع الفعل «بَنَى».',
		transformTaskA: 'المبني للمعلوم: «يَبْنِي المُخْلِصُونَ الأوطانَ بالعلمِ» | نوع الفعل «بَنَى»: فعل معتل ناقص.',
		spellingTaskQ: 'علّل رسم الألف اللينة في الفعل «بَنَى»، ورسم الهمزة المتوسطة في كلمة «يَسْأَلُ».',
		spellingTaskA: 'بَنَى: ألف لينة مقصورة لأنه فعل ثلاثي أصل ألفه ياء (يبني). | يَسْأَلُ: همزة متوسطة على الألف لأنها مفتوحة وما قبلها ساكن والفتحة أقوى من السكون.',
		prodContext: 'اقترب موعد انتقالك إلى الطور المتوسط بعد نجاحك في السنة الخامسة ابتدائي، وأردتَ أن تعبّر لوالديك ومعلميك عن امتنانك وخطتك للمستقبل.',
		prodQuote: 'وقضى ربك ألا تعبدوا إلا إياه وبالوالدين إحساناً',
		prodInstruction:
			'اكتب نصاً منظماً من 8 إلى 12 سطراً تشكر فيه والديك ومعلميك على جهودهم، وتبيّن كيف ستجتهد في الأولى متوسط لخدمة دينك ووطنك الجزائر، موظفاً ناسخاً وحالاً وفعلاً مبنياً للمجهول، مع احترام علامات الوقف وهيكلة النص.',
		prodOutline:
			'المقدمة (سطران): التعبير عن فرحة إنهاء الطور الابتدائي وفضل الوالدين والمعلمين. العرض (7 أسطر): ذكر تضحيات الأسرة والمعلمين، والعزم على مواصلة الاجتهاد في الأولى متوسط («إنّ العلمَ سبيلُ الرقيّ»، «أقبلُ على دروسي نشيطاً»، «يُكرَّمُ المجتهدون في كل محفل»). الخاتمة (سطران): الدعاء للوالدين والمعلمين والعهد بخدمة الجزائر.',
		quizQ: 'في امتحان تقييم المكتسبات 2025 (معيار إبداء الرأي المعلّل حول «بمثل هؤلاء الأبناء تُبنى الأوطان»)، أي إجابة تستحق تقدير **التملك الأقصى (أ)**؟',
		quizCorrect: 'نعم أوافق؛ لأن التلميذ البارّ بوالديه والمجتهد في علمه يكبر مواطناً مخلصاً يخدم وطنه الجزائر ويسهم في نهضته.',
		quizDistractors: [
			{ text: 'نعم أوافق.', diagnosticFeedback: 'هذه إجابة مختصرة بلا تعليل، فتُصنّف في التملك الجزئي (ج) أو الأدنى (د) لا الأقصى!' },
			{ text: 'الأوطان جميلة وكبيرة جداً.', diagnosticFeedback: 'لم تُبدِ رأياً واضحاً ولم تُعلّل العلاقة بين برّ الوالدين والعلم وبناء الوطن.' },
			{ text: 'لا أعرف الإجابة.', diagnosticFeedback: 'عجز عن الإجابة يوافق التملك الأدنى (د).' }
		]
	},
	{
		title: 'تضحيات شهداء الجزائر وأمانة الاستقلال',
		paragraphs: [
			'في الفاتحِ من نوفمبرَ سنةَ أربعٍ وخمسينَ وتسعمئةٍ وألفٍ، هبَّ [[المجاهدون]] الأحرارُ يدافعونَ عن أرضِ الجزائرِ [[مخلصينَ]] للهِ وللوطنِ، فبذلوا أرواحَهُم الغاليةَ حتّى نِيلَ [[الاستقلالُ]] وعادَتِ الحريةُ إلى ربوعِ بلادِنا.',
			'واليومَ تقعُ علينا مسؤوليةٌ كبيرةٌ لنصونَ هذهِ الأمانةَ بالعلمِ والعملِ المتقنِ والأخلاقِ الفاضلةِ، كما نادى بذلكَ الإمامُ عبدُ الحميدِ بنُ باديس والعلامةُ البشيرُ الإبراهيميُّ رحمهما اللهُ.'
		],
		author: 'سند تدريبي لامتحان تقييم المكتسبات — 5 ابتدائي',
		vocabulary: [
			{ word: 'هبَّ', meaning: 'نهض وأسرع بعزيمة' },
			{ word: 'ربوع', meaning: 'أنحاء وأرجاء' }
		],
		mainIdea: 'بطولات الشهداء والمجاهدين لنيل الاستقلال وواجب الأجيال الصاعدة في صيانة الأمانة بالعلم والأخلاق.',
		explicitQ: 'متى اندلعت ثورة التحرير المباركة حسب النص؟ وبمَ نصون أمانة الاستقلال اليوم؟',
		explicitA: 'اندلعت في الفاتح من نوفمبر 1954م؛ ونصون أمانة الاستقلال اليوم بالعلم والعمل المتقن والأخلاق الفاضلة.',
		vocabTaskQ: 'اشرح كلمة «هبَّ» حسب سياق النص، ثم وظّفها في جملة مفيدة.',
		vocabTaskA: 'هبَّ: نهض وأسرع بعزيمة. | التوظيف: «هبَّ المتطوعون لمساعدة المتضررين من الثلوج».',
		opinionQ: 'كيف يمكن لتلميذ في السنة الخامسة ابتدائي أن يردّ الجميل لشهداء الجزائر؟ علّل إجابتك.',
		opinionA: 'يمكنه ذلك بالاجتهاد في دراسته، والتحلي بالأخلاق الإسلامية الفاضلة، والحفاظ على نظافة مدرسته ووطنه، والاعتزاز بهويته وتاريخه.',
		irabEntries: [
			{ target: 'المجاهدون', irab: 'فاعل مرفوع وعلامة رفعه الواو لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'مخلصينَ', irab: 'حال منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'الاستقلالُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة (بعد الفعل المبني للمجهول «نِيلَ»).', mark: '0.5' }
		],
		transformTaskQ: 'ما نوع الفعل «نَالَ» (أصل «نِيلَ»)؟ وما نوع الفعل «عَادَ»؟',
		transformTaskA: 'كلاهما فعل معتل أجوف لأن حرف العلة (الألف) وقع في وسطهما.',
		spellingTaskQ: 'علّل رسم التاء في «تضحيات» و«مسؤولية»، ورسم همزة «اِسْتِقْلَال».',
		spellingTaskA: 'تضحيات: تاء مفتوحة لأنها جمع مؤنث سالم. | مسؤولية: تاء مربوطة لأنها اسم مفرد مؤنث. | استقلال: همزة وصل لأنه مصدر فعل سداسي.',
		prodContext: 'بمناسبة عيد الاستقلال (5 جويلية)، طلبتْ منك مدرستك كتابة نصّ يُقرأ في الإذاعة المدرسية حول الوفاء للشهداء ودور التلميذ المجتهد في بناء الجزائر.',
		prodQuote: 'إنما تُدرك المعالي بالجدّ والاجتهاد',
		prodInstruction:
			'حرّر نصاً من 8 إلى 12 سطراً تبرز فيه قيمة الاستقلال وواجبك نحو وطنك الجزائر، موظفاً جمع مذكر سالم وحالاً وصفةً ومضافاً إليه، ومراعياً معايير التملك الأقصى (الملاءمة، سلامة اللغة، الانسجام، وجودة العرض).',
		prodOutline:
			'المقدمة: ذكرى عيد الاستقلال ومكانة شهداء الجزائر. العرض: شكر الله على نعمة الحرية، وبيان واجب التلاميذ اليوم («المخلصون يجتهدون لخدمة وطنهم»، «يعمل التلميذ الجزائري مخلصاً»، «نحافظ على ممتلكات الوطن»). الخاتمة: الدعاء للشهداء والعزم على بناء مستقبل مزدهر.',
		quizQ: 'في شبكة تقويم الإنتاج الكتابي لامتحان تقييم المكتسبات 2025، ما الترتيب الصحيح لمستويات التملك الأربعة من الأعلى إلى الأدنى؟',
		quizCorrect: 'تملك أقصى (أ) — تملك مقبول (ب) — تملك جزئي (ج) — تملك أدنى (د)',
		quizDistractors: [
			{ text: 'تملك أدنى (أ) — تملك جزئي (ب) — تملك مقبول (ج) — تملك أقصى (د)', diagnosticFeedback: 'عكست الترتيب! التملك الأقصى (أ) هو أعلى مستوى في الشبكة.' },
			{ text: 'تملك ممتاز — تملك جيد — تملك متوسط — راسب', diagnosticFeedback: 'تقييم المكتسبات يستخدم مصطلحات التملك الرسمية الأربعة: أقصى، مقبول، جزئي، أدنى.' },
			{ text: 'تملك كلي — تملك نصفي — تملك قليل — منعدم', diagnosticFeedback: 'المسميات الرسمية المعتمدة هي: أقصى (أ)، مقبول (ب)، جزئي (ج)، أدنى (د).' }
		]
	},
	{
		title: 'تطوع التلاميذ لحماية الماء والبيئة',
		paragraphs: [
			'الماءُ سرُّ الحياةِ ونعمةٌ كبرى من اللهِ تعالى، ولذلكَ اجتمعَ تلاميذُ السنةِ الخامسةِ في نادي البيئةِ [[متحمسينَ]] لإعدادِ لافتاتٍ توعويةٍ تحثُّ الجميعَ على ترشيدِ استهلاكِ الماءِ ومنعِ التبذيرِ.',
			'وفي نهايةِ اليومِ، عُلِّقَتِ [[اللافتاتُ]] في أروقةِ المدرسةِ، فشكرَ المديرُ التلاميذَ وقالَ لهم: «أنتم [[تُساهمون]] بوعيكم في حمايةِ مواردِ بلادنا وصيانةِ بيئتها النقيةِ».'
		],
		author: 'سند تدريبي لامتحان تقييم المكتسبات — 5 ابتدائي',
		vocabulary: [
			{ word: 'ترشيد', meaning: 'حسن التدبير وعدم الإسراف' },
			{ word: 'أروقة', meaning: 'ممرات' }
		],
		mainIdea: 'مبادرة تلاميذ السنة الخامسة لتوعية زملائهم بأهمية ترشيد استهلاك الماء وحماية البيئة.',
		explicitQ: 'لماذا اجتمع تلاميذ السنة الخامسة في نادي البيئة؟ وبمَ شكرهم المدير؟',
		explicitA: 'اجتمعوا لإعداد لافتات توعوية تحث على ترشيد استهلاك الماء ومنع التبذير؛ وشكرهم المدير على وعيهم ومساهمتهم في حماية موارد البلاد وبيئتها.',
		vocabTaskQ: 'اشرح كلمة «ترشيد» ثم وظّفها في جملة مفيدة.',
		vocabTaskA: 'ترشيد: حسن التدبير وعدم الإسراف. | التوظيف: «علينا ترشيد استهلاك الكهرباء والماء في بيوتنا».',
		opinionQ: 'ما رأيك في مبادرة هؤلاء التلاميذ؟ واقترح سلوكاً عملياً واحداً تطبّقه في بيتك لترشيد الماء.',
		opinionA: 'مبادرة رائعة ومسؤولة لأن الإسلام نهى عن الإسراف؛ ومن السلوكات العملية غلق الحنفية جيداً أثناء غسل الأسنان وإصلاح أي تسرب مائي فوراً.',
		irabEntries: [
			{ target: 'متحمسينَ', irab: 'حال منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'اللافتاتُ', irab: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة (بعد المبني للمجهول «عُلِّقَتْ»).', mark: '0.5' },
			{ target: 'تُساهمون', irab: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، وواو الجماعة فاعل.', mark: '0.5' }
		],
		transformTaskQ: 'أدخل «لَنْ» على الفعل «تُسرفون» في جملة، وبيّن هل الفعل «اجتمعَ» لازم أم متعدٍّ.',
		transformTaskA: 'مع «لن»: «أنتُم لن تُسرفوا في الماءِ» (منصوب بحذف النون). | «اجتمعَ»: فعل لازم اكتفى بفاعله.',
		spellingTaskQ: 'علّل رسم الهمزة المتطرفة في «الماء» والهمزة المتوسطة في «البيئة».',
		spellingTaskA: 'الماء: همزة متطرفة على السطر لأن ما قبلها حرف مد ساكن (ألف المد). | البيئة: همزة متوسطة على النبرة لأنها مفتوحة بعد ياء ساكنة.',
		prodContext: 'لاحظتَ في مدرستك أن بعض الأطفال يتركون حنفيات الماء مفتوحة بعد الاستعمال، فقررتَ كتابة موضوع توعوي يُنشر في مجلة المدرسة.',
		prodQuote: 'ولا تُسرفوا إنه لا يحب المسرفين',
		prodInstruction:
			'اكتب نصاً من 8 إلى 12 سطراً تبيّن فيه قيمة الماء وتقترح خطوات عملية لترشيد استهلاكه في البيت والمدرسة، موظفاً فعلاً من الأفعال الخمسة وحالاً ومضافاً إليه، مع احترام معايير التملك الأقصى الأربعة.',
		prodOutline:
			'المقدمة: أهمية الماء بوصفه سرّ الحياة ونعمة عظيمة. العرض: ذكر مظاهر التبذير والتحذير منها، ثم اقتراح خطوات الترشيد («يا زملائي لا تُسرفوا في الماء»، «نستعمل الماء مقتصدين»، «حماية موارد الوطن واجبنا»). الخاتمة: دعوة صادقة لشكر الله بالمحافظة على نعمته.',
		quizQ: 'أي عنصر مما يأتي يضمن نيل **التملك الأقصى (أ)** في معيار «الملاءمة والهيكلة» خلال اختبار الإنتاج الكتابي لتقييم المكتسبات؟',
		quizCorrect: 'الالتزام الكامل بموضوع التعليمة واحترام عدد الأسطر وتقسيم النص إلى مقدمة وعرض وخاتمة مع ترك البياض',
		quizDistractors: [
			{ text: 'كتابة سطرين فقط دون مقدمة أو خاتمة', diagnosticFeedback: 'عدم احترام الحجم والهيكلة يُنزل التقدير إلى التملك الجزئي أو الأدنى.' },
			{ text: 'كتابة نص طويل عن موضوع آخر مختلف عن التعليمة', diagnosticFeedback: 'الخروج عن الموضوع يُعطي تملكاً أدنى (د) في معيار الملاءمة.' },
			{ text: 'نسخ نص السند كما هو مع تغيير العنوان فقط', diagnosticFeedback: 'نسخ السند لا يُعدّ إنتاجاً كتابياً ذاتياً.' }
		]
	}
];

const tplTaqyeemMuktasabat2025: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t3_taqyeem_muktasabat_2025',
	grade: '5ap',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'موضوع امتحان تقييم المكتسبات 2025 (فهم المكتوب + الإنتاج الكتابي بمعايير التملك الأربعة)',
	curriculumLessonId: 'arb_lesson_5ap_t3_taqyeem_muktasabat_2025',
	defaultPoints: 10,
	isIntegration: true,
	isFullSubjectPack: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 127 + 43);
		const p = TAQYEEM_2025_PACKS[Math.abs(seed - 1) % TAQYEEM_2025_PACKS.length];
		const mcq = buildUniqueMcqOptions(p.quizCorrect, p.quizDistractors, rng);

		const quizQuestion: ArabicGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: p.quizQ,
			questionTextAr: p.quizQ,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `الصواب: ${p.quizCorrect}.`
		};

		const pIllustrationId: IllustrationId =
			p.title === 'برّ الوالدين والاجتهاد في طلب العلم'
				? 'pri_ara_01_school_bag_supplies'
				: p.title === 'تضحيات شهداء الجزائر وأمانة الاستقلال'
					? 'pri_ara_04_algeria_flag_martyrs_memorial'
					: 'pri_ara_06_four_seasons_trees';

		const content: ContentBlock[] = [
			buildIllustratedFigureBlock(pIllustrationId, {
				mode: 'image_only',
				title: p.title,
				maxHeight: 112,
				width: '58%'
			}),
			buildProsePassageBlock({
				title: p.title,
				paragraphs: p.paragraphs,
				author: p.author,
				vocabulary: p.vocabulary
			}),
			{
				type: 'text',
				content: 'أولاً — كفاءة فهم المكتوب (المحمول الفكري — تقدير التملك: أقصى أ / مقبول ب / جزئي ج / أدنى د):\n1) صُغ الفكرة العامة للسند في جملة واضحة.',
				answer: `الفكرة العامة (تملك أقصى أ): ${p.mainIdea}`,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) ${p.explicitQ}`,
				answer: p.explicitA,
				mark: '1'
			},
			{
				type: 'text',
				content: `3) ${p.vocabTaskQ}`,
				answer: p.vocabTaskA,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `4) ${p.opinionQ}`,
				answer: p.opinionA,
				mark: '1'
			},
			{
				type: 'text',
				content: 'ثانياً — كفاءة فهم المكتوب (فهم النظام اللغوي — النحو والصرف والإملاء):\n5) أعرب الكلمات المسطّرة في السند إعراباً نموذجياً:',
				mark: '1.5'
			},
			buildIrabTableBlock(p.irabEntries),
			{
				type: 'text',
				content: `6) ${p.transformTaskQ}`,
				answer: p.transformTaskA,
				mark: '0.5'
			},
			{
				type: 'text',
				content: `7) ${p.spellingTaskQ}`,
				answer: p.spellingTaskA,
				mark: '0.5'
			},
			buildWrittenProductionBlock({
				context: `ثالثاً — كفاءة الإنتاج الكتابي: ${p.prodContext}`,
				supportQuote: p.prodQuote,
				instruction: p.prodInstruction,
				rubricCriteria: [
					'معيار 1: الملاءمة والهيكلة (احترام الموضوع والحجم ومقدمة وعرض وخاتمة)',
					'معيار 2: سلامة اللغة (النحو والصرف والإملاء وتوظيف المطلوب)',
					'معيار 3: الانسجام وترابط الأفكار وأدوات الربط وعلامات الوقف',
					'معيار 4: الإبداع وجودة العرض ونظافة الورقة ووضوح الخط'
				],
				modelOutline: p.prodOutline,
				mark: '4'
			}),
			{
				type: 'table',
				headers: ['معيار التقويم (تقييم المكتسبات 2025)', 'تملك أقصى (أ)', 'تملك مقبول (ب)', 'تملك جزئي (ج)', 'تملك أدنى (د)'],
				cells: [],
				rows: [
					[
						{ content: '1. الملاءمة والهيكلة', bold: true },
						{ content: 'استيفاء تام للموضوع والحجم والفقرات' },
						{ content: 'احترام الموضوع مع نقص طفيف في الهيكلة' },
						{ content: 'إجابة جزئية أو إخلال بالحجم والفقرات' },
						{ content: 'خروج عن الموضوع أو نسخ السند' }
					],
					[
						{ content: '2. سلامة اللغة والتوظيف', bold: true },
						{ content: 'أخطاء نادرة وتوظيف سليم لكل المطلوب' },
						{ content: 'أخطاء قليلة مع توظيف أغلب المطلوب' },
						{ content: 'أخطاء متعددة ونقص في التوظيف' },
						{ content: 'أخطاء كثيرة تعيق الفهم وغياب التوظيف' }
					],
					[
						{ content: '3. الانسجام والترقيم', bold: true },
						{ content: 'أفكار مترابطة وأدوات ربط وعلامات وقف دقيقة' },
						{ content: 'ترابط جيد مع نقص يسير في الترقيم' },
						{ content: 'تكرار أو ضعف في الربط بين الجمل' },
						{ content: 'تفكك الأفكار وغياب علامات الوقف' }
					],
					[
						{ content: '4. الإبداع وتنظيم الورقة', bold: true },
						{ content: 'أسلوب جميل وشاهد مناسب وخط واضح ونظيف' },
						{ content: 'أسلوب جيد وتنظيم مقبول للورقة' },
						{ content: 'رصيد لغوي بسيط مع بعض التشطيب' },
						{ content: 'سوء تنظيم واضح وخط غير مقروء' }
					]
				],
				align: 'right',
				borders: 'grid',
				headerBackground: true,
				width: 'full'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'موضوع تدريبي شامل — امتحان تقييم المكتسبات في اللغة العربية (2025)',
			points: 10,
			instruction:
				'يُقيّم هذا الموضوع الشامل كفاءتي فهم المكتوب (الفكري واللغوي) والإنتاج الكتابي وفق شبكة التملك الرسمية المحدّثة (أقصى أ — مقبول ب — جزئي ج — أدنى د):',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'في فهم المكتوب: أجب بجمل تامة، وعلّل رأيك الشخصي بسببين واضحين لبلوغ التملك الأقصى (أ).',
				'في النظام اللغوي: راجع علامات الإعراب الفرعية والمبني للمجهول والمعتل والإملاء قبل الكتابة.',
				'في الإنتاج الكتابي: احترم المعايير الأربعة (الملاءمة، سلامة اللغة، الانسجام، الإبداع وتنظيم الورقة).'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${p.mainIdea}`,
				`فهم النص: ${p.explicitA}`,
				`الرأي المعلّل (تملك أقصى): ${p.opinionA}`,
				`الإعراب: ${p.irabEntries.map((e) => `${e.target}: ${e.irab}`).join(' | ')}`,
				`خطة الإنتاج الكتابي: ${p.prodOutline}`
			],
			finalAnswer: p.quizCorrect
		};
	}
};

export const TEMPLATES_5AP_T3: ArabicParameterizedTemplate[] = [
	tplIntellectualT3,
	tplDefectivePassiveT3,
	tplTransitiveAlifT3,
	tplIntegrationT3Standard,
	tplTaqyeemMuktasabat2025
];
