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

// ═══════════════════════════════════════════════════════════════════════════════
// قوالب التمارين والاختبارات — السنة الخامسة ابتدائي — اللغة العربية — الفصل الثاني
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 1. البناء الفكري: نص نثري حول البيئة والصحة والعلم
// ───────────────────────────────────────────────────────────────────────────────
interface T2PassagePack {
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

const T2_PASSAGES: readonly T2PassagePack[] = [
	{
		title: 'حملة التشجير وحماية البيئة',
		paragraphs: [
			'البيئةُ النظيفةُ نعمةٌ عظيمةٌ من اللهِ تعالى، ولذلكَ خرجَ [[التلميذانِ]] صباحَ السبتِ إلى غابةِ القريةِ [[مبتسمَيْنِ]] للمشاركةِ في حملةِ [[التشجيرِ]] التي نظّمتها الجمعيةُ الخيريةُ.',
			'قالَ المشرفُ للأطفالِ: «يا أبنائي، أنتم [[تغرسون]] اليومَ شجيراتٍ صغيرةً، وغداً ستكبرُ وتمنحنا الهواءَ النقيَّ والظلَّ الوارفَ، ولن تُفرّطوا أبداً في نظافةِ وطنكم الجميلِ».'
		],
		author: 'نص تربوي بيئي جزائري',
		vocabulary: [
			{ word: 'الوارف', meaning: 'الممتد والواسع' },
			{ word: 'تُفرّطوا', meaning: 'تُهملوا وتُقصّروا' }
		],
		bestTitle: 'أهمية التشجير وحماية البيئة',
		compQ1: 'لماذا خرج التلميذان إلى غابة القرية صباح يوم السبت؟',
		compA1: 'للمشاركة في حملة التشجير التي نظّمتها الجمعية الخيرية.',
		compQ2: 'ما الفوائد التي تمنحنا إياها الأشجار عندما تكبر حسب النص؟',
		compA2: 'تمنحنا الهواء النقي والظل الوارف وتجعل الوطن جميلاً.',
		synWord: 'تُهملوا',
		synAnswer: 'تُفرّطوا',
		antWord: 'المُلوَّث',
		antAnswer: 'النقيّ',
		quizPrompt: 'ما الفكرة الأساسية التي يدعو إليها نص «حملة التشجير وحماية البيئة»؟',
		quizCorrect: 'ضرورة غرس الأشجار والمحافظة على نظافة البيئة بوصفها نعمة ومسؤولية جماعية',
		quizDistractors: [
			{ text: 'طريقة صناعة الأثاث الخشبي في المصانع', diagnosticFeedback: 'النص يدعو إلى غرس الأشجار لا قطعها لصناعة الأثاث.' },
			{ text: 'قواعد لعبة كرة القدم في الملاعب المدرسية', diagnosticFeedback: 'موضوع النص بيئي يتعلق بالتشجير ونظافة الغابة.' },
			{ text: 'أخطار السفر بالقطار في فصل الشتاء', diagnosticFeedback: 'لم يرد ذكر للقطار أو السفر في النص.' }
		],
		valueAr: 'الحفاظ على البيئة وغرس الأشجار وشكر الله على نعمه.'
	},
	{
		title: 'الصحة تاج والرياضة نشاط',
		paragraphs: [
			'الإنسانُ العاقلُ يحافظُ على صحتهِ بتناولِ الغذاءِ [[المتوازنِ]] وممارسةِ [[الرياضةِ]] بانتظامٍ، فيستيقظُ صباحاً [[نشيطاً]] ليؤدّيَ صلاتهُ ويقبلَ على دروسهِ بهمةٍ عاليةٍ.',
			'وقد نصحَ الطبيبُ التلاميذَ قائلاً: «لا [[تُكثروا]] من الحلوياتِ والمشروباتِ الغازيةِ، واشربوا الماءَ الصافيَ، وتذكّروا أنَّ الوقايةَ خيرٌ من العلاجِ».'
		],
		author: 'نص تربوي صحي جزائري',
		vocabulary: [
			{ word: 'بانتظام', meaning: 'باستمرار وترتيب' },
			{ word: 'همة عالية', meaning: 'عزيمة قوية ونشاط' }
		],
		bestTitle: 'الغذاء المتوازن والرياضة أساس الصحة',
		compQ1: 'كيف يحافظ الإنسان العاقل على صحته حسب الفقرة الأولى؟',
		compA1: 'بتناول الغذاء المتوازن وممارسة الرياضة بانتظام والاستيقاظ المبكر.',
		compQ2: 'ما النصائح التي قدّمها الطبيب للتلاميذ في الفقرة الثانية؟',
		compA2: 'نصحهم بعدم الإكثار من الحلويات والمشروبات الغازية، وبشرب الماء الصافي، وتذكيرهم بأن الوقاية خير من العلاج.',
		synWord: 'عزيمة قوية',
		synAnswer: 'همة عالية',
		antWord: 'كسولاً',
		antAnswer: 'نشيطاً',
		quizPrompt: 'ما النصيحة التي حذّر منها الطبيب التلاميذ في النص؟',
		quizCorrect: 'عدم الإكثار من الحلويات والمشروبات الغازية والحرص على شرب الماء الصافي',
		quizDistractors: [
			{ text: 'الامتناع عن ممارسة الرياضة الصباحية', diagnosticFeedback: 'النص يشجع على ممارسة الرياضة بانتظام!' },
			{ text: 'السهر طويلاً أمام شاشات الألعاب ليلاً', diagnosticFeedback: 'النص يوصي بالاستيقاظ باكراً بنشاط.' },
			{ text: 'تناول وجبة واحدة فقط في اليوم', diagnosticFeedback: 'النص يدعو إلى الغذاء المتوازن وليس تقليل الوجبات.' }
		],
		valueAr: 'المحافظة على نعمة الصحة بالغذاء المتوازن والرياضة.'
	},
	{
		title: 'العلم مفتاح الاكتشافات النافعة',
		paragraphs: [
			'منذُ قرونٍ طويلةٍ، ساهمَ [[علماءُ]] المسلمينَ في نهضةِ الطبِّ والفلكِ والرياضياتِ، فكانَ الواحدُ منهم [[قارئاً]] نهماً يبحثُ عن الحقيقةِ ويجيبُ عن كلِّ [[سؤالٍ]] بالتجربةِ والملاحظةِ الدقيقةِ.',
			'وأبوكَ ذو علمٍ وخبرةٍ يذكّركَ دوماً أنَّ التكنولوجيا الحديثةَ ثمرةُ اجتهادٍ وصبرٍ، وأنَّ أمتَنا الجزائريةَ تنتظرُ منكم أن [[تُبدعوا]] في العلومِ النافعةِ لخدمةِ الإنسانيةِ.'
		],
		author: 'نص علمي تربوي جزائري',
		vocabulary: [
			{ word: 'نهماً', meaning: 'شغوفاً ومحبّاً بكثرة للمطالعة' },
			{ word: 'ثمرة', meaning: 'نتيجة' }
		],
		bestTitle: 'طلب العلم ودوره في الاكتشافات النافعة',
		compQ1: 'كيف كان علماء المسلمين يبحثون عن الحقيقة العلمية حسب النص؟',
		compA1: 'بالمطالعة المستمرة والتجربة والملاحظة الدقيقة للإجابة عن الأسئلة العلمية.',
		compQ2: 'ماذا تنتظر الأمة الجزائرية من تلاميذها اليوم كما جاء في الفقرة الثانية؟',
		compA2: 'تنتظر منهم أن يُبدعوا في العلوم النافعة لخدمة الوطن والإنسانية.',
		synWord: 'نتيجة',
		synAnswer: 'ثمرة',
		antWord: 'القديمة',
		antAnswer: 'الحديثة',
		quizPrompt: 'في أي مجالات علمية ساهم علماء المسلمين كما ذُكر في النص؟',
		quizCorrect: 'في الطب والفلك والرياضيات عبر التجربة والملاحظة الدقيقة',
		quizDistractors: [
			{ text: 'في الرياضة المائية والصيد البحري فقط', diagnosticFeedback: 'لم ترد هذه المجالات في النص.' },
			{ text: 'في صناعة السيارات والطائرات الحديثة قديماً', diagnosticFeedback: 'ذُكر في النص الطب والفلك والرياضيات.' },
			{ text: 'في حفظ الأساطير والقصص الخيالية دون تجربة', diagnosticFeedback: 'اعتمد علماء المسلمين على التجربة والملاحظة الدقيقة.' }
		],
		valueAr: 'طلب العلم النافع والاقتداء بعلماء الأمة في الجد والابتكار.'
	}
];

const tplIntellectualT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t2_intellectual_env_health_science',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري: نص نثري حول البيئة والصحة والعلوم',
	curriculumLessonId: 'arb_lesson_5ap_t2_sifa_and_mudaf_ilayh',
	defaultPoints: 3,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 37 + 19);
		const pack = T2_PASSAGES[Math.abs(seed - 1) % T2_PASSAGES.length];
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
			explanation: `الإجابة الدقيقة من السند: ${pack.quizCorrect}.`
		};

		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: pack.title,
				paragraphs: pack.paragraphs,
				author: pack.author,
				vocabulary: pack.vocabulary
			}),
			{
				type: 'text',
				content: '1) اقترح عنواناً مناسباً للنص.',
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
				content: `4) هاتِ من النص مرادف «${pack.synWord}» وضدّ «${pack.antWord}»، ثم استخلص قيمة تربوية من السند.`,
				answer: `4) مرادف «${pack.synWord}»: «${pack.synAnswer}» | ضد «${pack.antWord}»: «${pack.antAnswer}» | القيمة: ${pack.valueAr}`,
				mark: '1'
			}
		];

		const sujetExercise: ExerciseBlock = {
			customTitle: 'أولاً: السند وأسئلة البناء الفكري',
			points: 3,
			instruction: 'اقرأ السند قراءة فاحصة ثم أجب عن أسئلة البناء الفكري:',
			content
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			passageKind: 'prose',
			quizQuestion,
			sujetExercise,
			hints: [
				'اقرأ النص جيداً ثم لخّص فكرته في ثلاث أو أربع كلمات لاقتراح عنوان مناسب.',
				'استخرج الإجابات من السند بأسلوبك الواضح والمختصر.',
				'تأكد أن الكلمة المرادفة أو المضادة موجودة فعلاً داخل السند.'
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
// 2. البناء اللغوي 1: المثنى والأسماء الخمسة والصفة والمضاف إليه
// ───────────────────────────────────────────────────────────────────────────────
interface T2Grammar1Case {
	sentence: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	transformPrompt: string;
	transformAnswer: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_GRAMMAR1_CASES: readonly T2Grammar1Case[] = [
	{
		sentence: 'غَرَسَ الفَلَّاحَانِ شَجَرَتَيْنِ فِي حَدِيقَةِ الحَيِّ الوَاسِعَةِ.',
		irabEntries: [
			{ target: 'الفَلَّاحَانِ', irab: 'فاعل مرفوع وعلامة رفعه الألف لأنه مثنى.', mark: '0.5' },
			{ target: 'الحَيِّ', irab: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة على آخره.', mark: '0.5' }
		],
		transformPrompt: 'حوّل الجملة الآتية إلى المثنى واضبطها بالشكل: «إِنَّ الشَّجَرَةَ المُثْمِرَةَ نَافِعَةٌ».',
		transformAnswer: 'إِنَّ الشَّجَرَتَيْنِ المُثْمِرَتَيْنِ نَافِعَتَانِ.',
		quizQ: 'ما إعراب «شَجَرَتَيْنِ» في الجملة: «غَرَسَ الفَلَّاحَانِ شَجَرَتَيْنِ»؟',
		quizCorrect: 'مفعول به منصوب وعلامة نصبه الياء لأنه مثنى',
		quizDistractors: [
			{ text: 'فاعل مرفوع بالألف لأنه مثنى', diagnosticFeedback: 'الفاعل هو «الفلاحانِ»، أما «شجرتينِ» فوقع عليها الغرس.' },
			{ text: 'مفعول به منصوب بالفتحة الظاهرة', diagnosticFeedback: 'المثنى يُنصب بالياء لا بالفتحة!' },
			{ text: 'مضاف إليه مجرور بالياء', diagnosticFeedback: '«شجرتين» مفعول به وليست مضافاً إليه.' }
		]
	},
	{
		sentence: 'أَبُوكَ ذُو خُلُقٍ كَرِيمٍ يُحَافِظُ عَلَى نَظَافَةِ البِيئَةِ.',
		irabEntries: [
			{ target: 'أَبُوكَ', irab: 'مبتدأ مرفوع وعلامة رفعه الواو لأنه من الأسماء الخمسة، وهو مضاف، والكاف ضمير متصل في محل جر مضاف إليه.', mark: '0.5' },
			{ target: 'البِيئَةِ', irab: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة على آخره.', mark: '0.5' }
		],
		transformPrompt: 'أدخل «إِنَّ» على الجملة واضبطها بالشكل: «أَخُوكَ ذُو عِلْمٍ نَافِعٍ».',
		transformAnswer: 'إِنَّ أَخَاكَ ذُو عِلْمٍ نَافِعٍ.',
		quizQ: 'ما الشكل الصحيح للجملة «أَخُوكَ ذُو عِلْمٍ» بعد إدخال «إِنَّ» عليها؟',
		quizCorrect: 'إِنَّ أَخَاكَ ذُو عِلْمٍ.',
		quizDistractors: [
			{ text: 'إِنَّ أَخُوكَ ذَا عِلْمٍ.', diagnosticFeedback: '«إنّ» تنصب اسمها بالألف «أخاكَ» وترفع خبرها بالواو «ذو»!' },
			{ text: 'إِنَّ أَخِيكَ ذُو عِلْمٍ.', diagnosticFeedback: 'الياء علامة الجر في الأسماء الخمسة، أما النصب فبالألف.' },
			{ text: 'إِنَّ أَخَاكَ ذَا عِلْمٍ.', diagnosticFeedback: 'خبر إنّ يكون مرفوعاً بالواو «ذو» لا منصوباً.' }
		]
	},
	{
		sentence: 'قَرَأَ التِّلْمِيذُ المُجْتَهِدُ كِتَابَيْنِ مِنْ مَكْتَبَةِ المَدْرَسَةِ.',
		irabEntries: [
			{ target: 'المُجْتَهِدُ', irab: 'صفة مرفوعة وعلامة رفعها الضمة الظاهرة على آخرها.', mark: '0.5' },
			{ target: 'كِتَابَيْنِ', irab: 'مفعول به منصوب وعلامة نصبه الياء لأنه مثنى.', mark: '0.5' }
		],
		transformPrompt: 'ميّز الصفة من المضاف إليه في التركيبين: «الهَوَاءُ النَّقِيُّ» و«قَاعَةُ العُلُومِ».',
		transformAnswer: '«النَّقِيُّ»: صفة مرفوعة | «العُلُومِ»: مضاف إليه مجرور بالكسرة.',
		quizQ: 'في الجملة «زُرْتُ مَكْتَبَةَ المَدْرَسَةِ النَّظِيفَةَ»، ما إعراب كلمة «المَدْرَسَةِ»؟',
		quizCorrect: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة',
		quizDistractors: [
			{ text: 'صفة مجرورة وعلامة جرها الكسرة', diagnosticFeedback: '«مكتبةَ» نكرة بلا «ال» ومنصوبة، و«المدرسةِ» معرفة مجرورة توضحها فهي مضاف إليه.' },
			{ text: 'مفعول به منصوب بالكسرة', diagnosticFeedback: 'المفعول به هو «مكتبةَ» المنصوب بالفتحة.' },
			{ text: 'فاعل مجرور بالكسرة', diagnosticFeedback: 'الفاعل مرفوع دائماً، وهو هنا التاء المتصلة في «زرتُ».' }
		]
	}
];

const tplDualSifaMudafT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t2_dual_sifa_mudaf_five_nouns',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: المثنى والأسماء الخمسة والصفة والمضاف إليه',
	curriculumLessonId: 'arb_lesson_5ap_t2_dual_and_five_nouns',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 59 + 11);
		const c = T2_GRAMMAR1_CASES[Math.abs(seed - 1) % T2_GRAMMAR1_CASES.length];
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
			customTitle: 'البناء اللغوي (المثنى، الأسماء الخمسة، الصفة والمضاف إليه)',
			points: 2,
			instruction: `اقرأ الجملة الآتية بتركيز ثم أجب: «${c.sentence}»`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمتين المطلوبتين في الجدول الآتي:',
					mark: '1'
				},
				buildIrabTableBlock(c.irabEntries),
				{
					type: 'text',
					content: `2) ${c.transformPrompt}`,
					answer: c.transformAnswer,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'المثنى يرفع بالألف وينصب ويجر بالياء.',
				'الأسماء الخمسة ترفع بالواو وتنصب بالألف وتجر بالياء.',
				'الصفة تطابق موصوفها في 4 أمور، والمضاف إليه مجرور دائماً بعد نكرة بلا «ال».'
			],
			solutionStepsAr: [
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				`إجابة السؤال الثاني: ${c.transformAnswer}`
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 3. البناء اللغوي 2: الحال والأفعال الخمسة
// ───────────────────────────────────────────────────────────────────────────────
interface T2HalFiveVerbsCase {
	sentence: string;
	irabEntries: Array<{ target: string; irab: string; mark: string }>;
	fiveVerbsPrompt: string;
	fiveVerbsAnswer: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_HAL_FIVE_CASES: readonly T2HalFiveVerbsCase[] = [
	{
		sentence: 'عَادَ التَّلَامِيذُ مِنَ السِّبَاقِ مَسْرُورِينَ وَهُمْ يَبْتَسِمُونَ.',
		irabEntries: [
			{ target: 'مَسْرُورِينَ', irab: 'حال منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم.', mark: '0.5' },
			{ target: 'يَبْتَسِمُونَ', irab: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، وواو الجماعة ضمير متصل في محل رفع فاعل.', mark: '0.5' }
		],
		fiveVerbsPrompt: 'أدخل «لَنْ» ثم «لَمْ» على الجملة: «أَنْتُمْ تُهْمِلُونَ الصِّحَّةَ» مع الضبط التام.',
		fiveVerbsAnswer: 'مع «لن»: «أَنْتُمْ لَنْ تُهْمِلُوا الصِّحَّةَ» | مع «لم»: «أَنْتُمْ لَمْ تُهْمِلُوا الصِّحَّةَ» (بحذف النون وإضافة الألف الفارقة).',
		quizQ: 'ما إعراب «يَبْتَسِمُونَ» في الجملة: «التَّلَامِيذُ يَبْتَسِمُونَ بَعْدَ الفَوْزِ»؟',
		quizCorrect: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، والواو فاعل',
		quizDistractors: [
			{ text: 'جمع مذكر سالم مرفوع بالواو', diagnosticFeedback: '«يبتسمون» فعل مضارع لا يقبل «ال» وليس اسماً!' },
			{ text: 'فعل مضارع مرفوع وعلامة رفعه الواو', diagnosticFeedback: 'الأفعال الخمسة تُرفع بثبوت النون، أما الواو فهي ضمير متصل فاعل.' },
			{ text: 'فعل مضارع منصوب بحذف النون', diagnosticFeedback: 'النون ثابتة ولم يسبقه حرف نصب.' }
		]
	},
	{
		sentence: 'تَعْمَلُ الطَّبِيبَاتُ مُخْلِصَاتٍ، وَلَنْ يُقَصِّرَ العَامِلُونَ وَلَا تَتَكَاسَلُوا.',
		irabEntries: [
			{ target: 'مُخْلِصَاتٍ', irab: 'حال منصوب وعلامة نصبه الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم.', mark: '0.5' },
			{ target: 'تَتَكَاسَلُوا', irab: 'فعل مضارع مجزوم بـ«لا» الناهية وعلامة جزمه حذف النون لأنه من الأفعال الخمسة، وواو الجماعة فاعل.', mark: '0.5' }
		],
		fiveVerbsPrompt: 'حوّل الصفة إلى حال في الجملة: «جَاءَ العَدَّاءُ السَّرِيعُ»، ثم أدخل «لَمْ» على «يَتَعَاوَنَانِ».',
		fiveVerbsAnswer: 'التحويل إلى حال: «جَاءَ العَدَّاءُ سَرِيعاً» | مع «لم»: «لَمْ يَتَعَاوَنَا» (بحذف النون).',
		quizQ: 'ما علامة نصب الحال في الجملة: «تُؤَدِّي التِّلْمِيذَاتُ الوَاجِبَ نَشِيطَاتٍ»؟',
		quizCorrect: 'الكسرة النائبة عن الفتحة لأنه جمع مؤنث سالم',
		quizDistractors: [
			{ text: 'الفتحة الظاهرة على آخره', diagnosticFeedback: 'جمع المؤنث السالم لا يُنصب بالفتحة أبداً!' },
			{ text: 'الياء لأنه جمع مذكر سالم', diagnosticFeedback: '«نشيطاتٍ» جمع مؤنث سالم لا جمع مذكر سالم.' },
			{ text: 'ثبوت النون', diagnosticFeedback: 'ثبوت النون علامة رفع للأفعال الخمسة لا للحال.' }
		]
	},
	{
		sentence: 'يَسْتَيْقِظُ الفَلَّاحُ بَاكِراً، وَالتِّلْمِيذَانِ لَنْ يُهْمِلَا دُرُوسَهُمَا.',
		irabEntries: [
			{ target: 'بَاكِراً', irab: 'حال منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '0.5' },
			{ target: 'يُهْمِلَا', irab: 'فعل مضارع منصوب بـ«لن» وعلامة نصبه حذف النون لأنه من الأفعال الخمسة، وألف الاثنين فاعل.', mark: '0.5' }
		],
		fiveVerbsPrompt: 'استخرج صاحب الحال من «شَرِبْتُ المَاءَ صَافِياً»، ثم أدخل «لَا الناهية» على الفعل «تُهْمِلِينَ» في جملة مفيدة.',
		fiveVerbsAnswer: 'صاحب الحال: «المَاءَ» (معرفة) | مع لا الناهية: «لَا تُهْمِلِي دُرُوسَكِ» (بحذف النون لأنه من الأفعال الخمسة).',
		quizQ: 'ما الضبط الصحيح للجملة: «العُلَمَاءُ لَنْ ... عَنِ البَحْثِ»؟',
		quizCorrect: 'يَتَوَقَّفُوا',
		quizDistractors: [
			{ text: 'يَتَوَقَّفُونَ', diagnosticFeedback: '«لن» أداة نصب تحذف النون من الأفعال الخمسة!' },
			{ text: 'يَتَوَقَّفُو', diagnosticFeedback: 'لا تنسَ الألف الفارقة بعد واو الجماعة: «يَتَوَقَّفُوا».' },
			{ text: 'تَوَقَّفُوا', diagnosticFeedback: '«لن» تدخل على الفعل المضارع لا الماضي.' }
		]
	}
];

const tplHalFiveVerbsT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t2_hal_and_five_verbs',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي: الحال وصاحب الحال والأفعال الخمسة',
	curriculumLessonId: 'arb_lesson_5ap_t2_al_hal',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 67 + 23);
		const c = T2_HAL_FIVE_CASES[Math.abs(seed - 1) % T2_HAL_FIVE_CASES.length];
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
			customTitle: 'البناء اللغوي (الحال والأفعال الخمسة)',
			points: 2,
			instruction: `اقرأ الجملة الآتية بتركيز ثم أجب: «${c.sentence}»`,
			content: [
				{
					type: 'text',
					content: '1) أعرب الكلمتين المسطّرتين في الجدول الآتي:',
					mark: '1'
				},
				buildIrabTableBlock(c.irabEntries),
				{
					type: 'text',
					content: `2) ${c.fiveVerbsPrompt}`,
					answer: c.fiveVerbsAnswer,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'الحال اسم نكرة منصوب يُجاب به عن السؤال «كيف؟» وصاحبه معرفة.',
				'الأفعال الخمسة تُرفع بثبوت النون وتُنصب وتُجزم بحذف النون.',
				'أضف الألف الفارقة بعد واو الجماعة عند حذف النون (يتوقفوا، يكتبوا).'
			],
			solutionStepsAr: [
				...c.irabEntries.map((e) => `${e.target}: ${e.irab}`),
				c.fiveVerbsAnswer
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 4. البناء اللغوي 3: الفعل الصحيح وأنواعه + الهمزة المتوسطة والمتطرفة
// ───────────────────────────────────────────────────────────────────────────────
interface T2SoundHamzaCase {
	verbs: Array<{ verb: string; root: string; kind: string }>;
	medialWord: string;
	medialReason: string;
	finalWord: string;
	finalReason: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const T2_SOUND_HAMZA_CASES: readonly T2SoundHamzaCase[] = [
	{
		verbs: [
			{ verb: 'يَكْتُبُونَ', root: 'كَتَبَ', kind: 'صحيح سالم' },
			{ verb: 'تَسْأَلِينَ', root: 'سَأَلَ', kind: 'صحيح مهموز' },
			{ verb: 'يَشُدُّونَ', root: 'شَدَّ', kind: 'صحيح مضعّف' }
		],
		medialWord: 'سُئِلَ',
		medialReason: 'كُتبت الهمزة المتوسطة على النبرة لأنها مكسورة وما قبلها مضموم، والكسرة أقوى من الضمة.',
		finalWord: 'شَاطِئ',
		finalReason: 'كُتبت الهمزة المتطرفة على الياء غير المنقوطة لأن ما قبلها مكسور.',
		quizQ: 'لماذا كُتبت الهمزة المتوسطة على النبرة في كلمة «بِئْر»؟',
		quizCorrect: 'لأنها ساكنة وما قبلها مكسور، والكسرة أقوى من السكون',
		quizDistractors: [
			{ text: 'لأنها مكسورة وما قبلها مفتوح', diagnosticFeedback: 'الباء مكسورة والهمزة ساكنة (بِئْر)!' },
			{ text: 'لأنها مفتوحة بعد ألف مد', diagnosticFeedback: 'الهمزة المفتوحة بعد ألف مد تُكتب على السطر مثل «قراءة».' },
			{ text: 'لأنها همزة متطرفة في آخر الكلمة', diagnosticFeedback: 'الهمزة في وسط الكلمة فهي متوسطة.' }
		]
	},
	{
		verbs: [
			{ verb: 'سَمِعْتُمْ', root: 'سَمِعَ', kind: 'صحيح سالم' },
			{ verb: 'يَقْرَؤُونَ', root: 'قَرَأَ', kind: 'صحيح مهموز' },
			{ verb: 'مَدَّتْ', root: 'مَدَّ', kind: 'صحيح مضعّف' }
		],
		medialWord: 'مُؤْمِن',
		medialReason: 'كُتبت الهمزة المتوسطة على الواو لأنها ساكنة وما قبلها مضموم، والضمة أقوى من السكون.',
		finalWord: 'هُدُوء',
		finalReason: 'كُتبت الهمزة المتطرفة على السطر لأن ما قبلها حرف مد ساكن (واو المد).',
		quizQ: 'صنّف الفعل الصحيح «يَعُدُّونَ» بعد إرجاعه إلى الماضي مع «هو»:',
		quizCorrect: 'صحيح مضعّف (ماضيه: عَدَّ)',
		quizDistractors: [
			{ text: 'صحيح سالم', diagnosticFeedback: 'ماضيه «عَدَّ» وفيه دال مضعّفة.' },
			{ text: 'صحيح مهموز', diagnosticFeedback: 'لا توجد همزة في «عَدَّ».' },
			{ text: 'فعل معتل مثال', diagnosticFeedback: 'الياء في «يعدّون» للمضارعة وليست أصلية.' }
		]
	},
	{
		verbs: [
			{ verb: 'أَخْرَجَ', root: 'خَرَجَ', kind: 'صحيح سالم' },
			{ verb: 'يَأْخُذُ', root: 'أَخَذَ', kind: 'صحيح مهموز' },
			{ verb: 'زَلْزَلَ', root: 'زَلْزَلَ', kind: 'صحيح مضعّف رباعي' }
		],
		medialWord: 'مَسْأَلَة',
		medialReason: 'كُتبت الهمزة المتوسطة على الألف لأنها مفتوحة وما قبلها ساكن، والفتحة أقوى من السكون.',
		finalWord: 'دِفْء',
		finalReason: 'كُتبت الهمزة المتطرفة على السطر لأن ما قبلها حرف ساكن.',
		quizQ: 'اختر الكتابة الإملائية الصحيحة للكلمات الثلاث الآتية:',
		quizCorrect: 'بِيئَة — سُؤَال — شَيْء',
		quizDistractors: [
			{ text: 'بِيأَة — سُئَال — شَئْ', diagnosticFeedback: 'في «بيئة» بعد ياء ساكنة على النبرة، و«سؤال» بعد ضم على الواو، و«شيء» بعد ساكن على السطر!' },
			{ text: 'بِيئَة — سُأَال — شَيْء', diagnosticFeedback: 'في «سؤال» ما قبلها مضموم والضمة أقوى من الفتحة فتُكتب على الواو.' },
			{ text: 'بِيئَة — سُؤَال — شَئْ', diagnosticFeedback: 'في «شيء» الياء ساكنة فتُكتب الهمزة المتطرفة على السطر.' }
		]
	}
];

const tplSoundHamzaT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t2_sound_verbs_and_hamza',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'spelling_imla',
	titleAr: 'البناء اللغوي: الفعل الصحيح وأنواعه والهمزة المتوسطة والمتطرفة',
	curriculumLessonId: 'arb_lesson_5ap_t2_medial_and_final_hamza',
	defaultPoints: 2,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 79 + 3);
		const c = T2_SOUND_HAMZA_CASES[Math.abs(seed - 1) % T2_SOUND_HAMZA_CASES.length];
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
			customTitle: 'البناء اللغوي (الفعل الصحيح والهمزة المتوسطة والمتطرفة)',
			points: 2,
			instruction: 'أنجز تماريني الصرف والإملاء الآتيين:',
			content: [
				{
					type: 'table',
					headers: ['الفعل', 'أصله (الماضي المجرد مع هو)', 'نوع الفعل الصحيح'],
					cells: [],
					rows: c.verbs.map((v, idx) => [
						{ content: v.verb, bold: true },
						{ content: '................', answer: v.root },
						{ content: '................................', answer: v.kind, mark: idx === 0 ? '0.5' : '0.25' }
					]),
					align: 'right',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `2) علّل سبب رسم الهمزة المتوسطة في كلمة «${c.medialWord}»، والهمزة المتطرفة في كلمة «${c.finalWord}».`,
					answer: `«${c.medialWord}»: ${c.medialReason} | «${c.finalWord}»: ${c.finalReason}`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '5ap',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'ردّ الفعل إلى الماضي المجرد مع «هو» لتحديد نوعه (سالم، مهموز، مضعّف).',
				'في الهمزة المتوسطة قارن حركتها بحركة ما قبلها حسب القوة: كسرة ثم ضمة ثم فتحة ثم سكون.',
				'في الهمزة المتطرفة انظر إلى حركة الحرف الذي قبلها فقط.'
			],
			solutionStepsAr: [
				...c.verbs.map((v) => `${v.verb} -> ${v.root} (${v.kind}).`),
				c.medialReason,
				c.finalReason
			],
			finalAnswer: c.quizCorrect
		};
	}
};

// ───────────────────────────────────────────────────────────────────────────────
// 5. الوضعية الإدماجية للفصل الثاني (الإنتاج الكتابي)
// ───────────────────────────────────────────────────────────────────────────────
interface IntegrationT2Case {
	context: string;
	supportQuote: string;
	instruction: string;
	rubricCriteria: string[];
	modelOutline: string;
	quizQ: string;
	quizCorrect: string;
	quizDistractors: Array<{ text: string; diagnosticFeedback: string }>;
}

const INTEGRATION_T2_CASES: readonly IntegrationT2Case[] = [
	{
		context: 'لاحظتَ تزايد النفايات وقلة الأشجار في حديقة حيك، فبادرتَ مع زملائك لتنظيم يوم بيئي للتشجير والتوعية.',
		supportQuote: 'ما من مسلم يغرس غرساً أو يزرع زرعاً فيأكل منه طير أو إنسان أو بهيمة إلا كان له به صدقة',
		instruction:
			'اكتب نصاً من 8 إلى 12 سطراً تصف فيه حملة التشجير وأهمية المحافظة على البيئة، موظفاً مثنى وحالاً وصفةً، ومسطّراً تحتها.',
		rubricCriteria: [
			'الملاءمة والهيكلة (مقدمة، عرض، خاتمة) واحترام الحجم (1 ن)',
			'سلامة اللغة وتوظيف المثنى والحال والصفة (1.5 ن)',
			'الانسجام وأدوات الربط وعلامات الوقف (1 ن)',
			'الإبداع وجودة العرض والاستشهاد (0.5 ن)'
		],
		modelOutline:
			'مقدمة: وصف حالة الحديقة قبل الحملة والدعوة للتشجير. العرض: مشاركة التلاميذ والأهالي («غرس التلميذان شجرتين»، «عمل الجميع مخلصين»، «أصبحت الحديقة الجميلة نظيفة»)، وتذكيرهم بفضل الغرس في الإسلام. الخاتمة: نصيحة للحفاظ على النظافة والبيئة.',
		quizQ: 'أي جملة من الآتي تصلح لتوظيف **المثنى والحال** معاً بسلامة لغوية في وضعية عن «التشجير»؟',
		quizCorrect: 'غَرَسَ التِّلْمِيذَانِ شُجَيْرَتَيْنِ فِي الحَدِيقَةِ مَسْرُورَيْنِ.',
		quizDistractors: [
			{ text: 'غَرَسَ التِّلْمِيذَيْنِ شُجَيْرَتَانِ مَسْرُورَانِ.', diagnosticFeedback: 'الفاعل مثنى مرفوع بالألف، والمفعول به والحال منصوبان بالياء!' },
			{ text: 'غَرَسَ التِّلْمِيذَانِ شُجَيْرَتَيْنِ المَسْرُورَيْنِ.', diagnosticFeedback: 'الحال يجب أن يكون نكرة بلا «ال»!' },
			{ text: 'قرأتُ قصةً ممتعةً عن رحلةٍ بحريةٍ.', diagnosticFeedback: 'هذه الجملة خارج موضوع التشجير وحماية البيئة.' }
		]
	},
	{
		context: 'أصيب أحد زملائك بضعف وتعب بسبب إكثاره من الحلويات وقلة ممارسته للرياضة.',
		supportQuote: 'المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف وفي كل خير',
		instruction:
			'اكتب نصاً من 8 إلى 12 سطراً تقدّم فيه لزميلك نصائح واضحة حول الغذاء الصحي وممارسة الرياضة، موظفاً فعلاً من الأفعال الخمسة ومضافاً إليه وحالاً، ومسطّراً تحتها.',
		rubricCriteria: [
			'احترام موضوع النصيحة الصحية وهيكلة النص (1 ن)',
			'سلامة الإعراب والإملاء وتوظيف المطلوب (1.5 ن)',
			'الانسجام وترابط النصائح بأدوات الربط (1 ن)',
			'وضوح الخط وتنظيم الورقة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: مكانة الصحة بوصفها نعمة عظيمة. العرض: شرح فوائد الغذاء المتوازن والرياضة («التلاميذ يحافظون على نظافة أجسامهم»، «يستيقظ الرياضي نشيطاً»)، والتحذير من الوجبات السريعة والحلويات. الخاتمة: دعوة الزميل إلى الالتزام بالنظام الصحي.',
		quizQ: 'أي جملة توظف **فعلاً من الأفعال الخمسة مجزوماً** بسلامة تامة في نصيحة صحية؟',
		quizCorrect: 'يا أصدقائي، لَا تُفْرِطُوا فِي تَنَاوُلِ الحَلَوِيَّاتِ وَحَافِظُوا عَلَى نَشَاطِكُمْ.',
		quizDistractors: [
			{ text: 'يا أصدقائي، لَا تُفْرِطُونَ فِي الحَلَوِيَّاتِ.', diagnosticFeedback: 'بعد «لا الناهية» تُحذف النون من الأفعال الخمسة: «لا تُفرطوا»!' },
			{ text: 'يا أصدقائي، لَا تَفْرِطُو فِي الحَلَوِيَّاتِ.', diagnosticFeedback: 'لا تنسَ الألف الفارقة بعد واو الجماعة: «تُفرطوا».' },
			{ text: 'لعبَ الفريقُ مباراةً جميلةً أمسِ.', diagnosticFeedback: 'لا يوجد فيها فعل من الأفعال الخمسة مجزوم.' }
		]
	},
	{
		context: 'شاهدتَ مع أسرتك شريطاً وثائقياً عن إنجازات العلماء واكتشافات الطب والفضاء، فأُعجبت بدور العلم في تقدم الأمم.',
		supportQuote: 'قل هل يستوي الذين يعلمون والذين لا يعلمون',
		instruction:
			'حرّر فقرة من 8 إلى 12 سطراً تتحدث فيها عن فضل العلم والاكتشافات النافعة وطموحك المستقبلي لخدمة الجزائر، موظفاً اسماً من الأسماء الخمسة وهمزة متوسطة وأخرى متطرفة، ومسطّراً تحتها.',
		rubricCriteria: [
			'الملاءمة والهيكلة وعدد الأسطر (1 ن)',
			'توظيف اسم من الأسماء الخمسة والهمزتين بدقة إملائية (1.5 ن)',
			'الانسجام واستعمال أدوات الربط (1 ن)',
			'ثراء التعبير وتنظيم الورقة (0.5 ن)'
		],
		modelOutline:
			'مقدمة: أثر العلم في نهضة الأمم وتسهيل حياة الإنسان. العرض: ذكر جهود العلماء والاختراعات النافعة («إنّ العالمَ ذو فضلٍ عظيمٍ»، «تضيءُ المعرفةُ العقولَ»، «يجدُ القارئُ إجابةً عن كلِّ سؤالٍ»)، وطموحك في المستقبل لخدمة وطنك. الخاتمة: العزم على الجد والمطالعة.',
		quizQ: 'أي جملة توظف **اسماً من الأسماء الخمسة** مع كتابة إملائية صحيحة للهمزتين المتوسطة والمتطرفة؟',
		quizCorrect: 'إِنَّ العَالِمَ ذُو فَضْلٍ عَظِيمٍ، يُجِيبُ عَنْ كُلِّ سُؤَالٍ وَيُضِيءُ طَرِيقَ الأُمَّةِ.',
		quizDistractors: [
			{ text: 'إِنَّ العَالِمَ ذَا فَضْلٍ، يُجِيبُ عَنْ كُلِّ سُأَالٍ.', diagnosticFeedback: 'خبر إنّ مرفوع بالواو «ذو»، و«سؤال» تُكتب همزتها على الواو!' },
			{ text: 'كَانَ أَبَاكَ مُؤْمِناً صَادِقاً.', diagnosticFeedback: 'اسم كان يُرفع بالواو: «كان أبوكَ».' },
			{ text: 'سَمَاءُ القَرْيَةِ صَافِيَةٌ اليَوْمَ.', diagnosticFeedback: 'لا يوجد فيها اسم من الأسماء الخمسة.' }
		]
	}
];

const tplIntegrationT2: ArabicParameterizedTemplate = {
	id: 'arb_tpl_5ap_t2_written_integration',
	grade: '5ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (الإنتاج الكتابي — الفصل الثاني)',
	curriculumLessonId: 'arb_lesson_5ap_t2_al_hal',
	defaultPoints: 4,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed * 107 + 31);
		const c = INTEGRATION_T2_CASES[Math.abs(seed - 1) % INTEGRATION_T2_CASES.length];
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
			customTitle: 'الوضعية الإدماجية (الإنتاج الكتابي)',
			points: 4,
			instruction: 'اقرأ السياق والسند والتعليمة بعناية، ثم أنتج نصاً منظماً بلغة سليمة:',
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
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: this.onecRole,
			quizQuestion,
			sujetExercise,
			hints: [
				'قسّم موضوعك إلى مقدمة وعرض وخاتمة مع ترك بياض في بداية كل فقرة.',
				'استحضر القواعد المطلوبة في التعليمة وسطّر تحت كل توظيف.',
				'راجع رسم الهمزات المتوسطة والمتطرفة وعلامات الوقف.'
			],
			solutionStepsAr: [
				'تحليل التعليمة وتحديد التوظيف النحوي والإملائي المطلوب.',
				`التخطيط: ${c.modelOutline}`,
				'المراجعة والتنقيح قبل التسليم.'
			],
			finalAnswer: c.quizCorrect
		};
	}
};

export const TEMPLATES_5AP_T2: ArabicParameterizedTemplate[] = [
	tplIntellectualT2,
	tplDualSifaMudafT2,
	tplHalFiveVerbsT2,
	tplSoundHamzaT2,
	tplIntegrationT2
];
