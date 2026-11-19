import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock
} from '../../arabic-helpers';

// ============================================================================
// 4 Parameterized ONEC Templates — 1AS TCST Trimester 1 (12 + 8 = 20)
// (2 intellectual_building [12pts], 2 linguistic_building [8pts])
// ============================================================================

// 1. البناء الفكري (12 ن) — السند الشعري من شعر الصحابة المخضرمين (لبيد بن ربيعة / الخنساء رضي الله عنهما)
const tpl1asTcstT1PoetryIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t1_qiyam_mukhadram_ib',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — القيم النبيلة والحكمة في شعر الصحابة المخضرمين',
	curriculumLessonId: 'arb_lesson_1as_tcst_t1_qiyam_shiir_qadim',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'في الحكمة والاعتبار بزوال الدنيا',
				author: 'لبيد بن ربيعة العامري رضي الله عنه',
				source: 'ديوان لبيد',
				verses: [
					['بَلِينَا وَمَا تَبْلَى النُّجُومُ [[الطَّوَالِعُ]]', 'وَتَبْقَى الْجِبَالُ بَعْدَنَا وَالْمَصَانِعُ'],
					['فَلَا جَزَعٌ إِنْ فَرَّقَ الدَّهْرُ بَيْنَنَا', 'وَكُلُّ فَتًى يَوْمًا ((بِهِ الدَّهْرُ فَاجِعُ))'],
					['وَمَا النَّاسُ إِلَّا كَالدِّيَارِ وَأَهْلِهَا', 'بِهَا يَوْمَ حَلُّوهَا وَغَدْوًا بَلَاقِعُ'],
					['وَمَا الْمَرْءُ إِلَّا كَالشِّهَابِ وَضَوْئِهِ', 'يَحُورُ [[رَمَادًا]] بَعْدَ إِذْ هُوَ سَاطِعُ'],
					['وَمَا الْبِرُّ إِلَّا مُضْمَرَاتٌ مِنَ التُّقَى', 'وَمَا الْمَالُ إِلَّا عَارِيَاتٌ وَدَائِعُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'بَلِينا', meaning: 'فَنينا وذهب شبابنا' },
					{ word: 'بَلاقع', meaning: 'خاليات مقفرات' },
					{ word: 'يحور', meaning: 'يرجع ويتحول' },
					{ word: 'عاريات', meaning: 'مستعارات مؤقتات' }
				],
				theme: 'الحكمة والاعتبار بزوال الدنيا وبيان حقيقة البر والتقوى',
				q1: 'إلامَ يدعو الشاعر في هذا النص؟ وما الحقيقة الكونية التي يقررها في البيت الأول؟',
				a1: 'يدعو الشاعر إلى التأمل والاعتبار بزوال الدنيا والإقبال على التقوى والبر. ويقرر في البيت الأول أن الإنسان يفنى بينما تبقى النجوم الطوالع والجبال والمصانع شاهدة على تعاقب الأجيال.',
				q2: 'بمَ شبّه الشاعر الإنسان والمال في البيتين الرابع والخامس؟ وما دلالة ذلك؟',
				a2: 'شبّه الإنسان بالشهاب المضيء الذي يسطع حينا ثم يعود رمادا، وشبّه المال بالعارية والوديعة المؤقتة، ليدل على سرعة فناء العمر وزوال المتاع وحثّ الإنسان على البذل والكرم.',
				q3: 'استخرج من الأبيات قيمتين إنسانيتين وأخلاقيتين أقرّهما الإسلام، مع التمثيل.',
				a3: '1) الصبر وعدم الجزع عند المصائب (فلا جزع إن فرّق الدهر بيننا). 2) التقوى والإخلاص والزهد في التعلق بالمال (وما البر إلا مضمرات من التقى، وما المال إلا عاريات ودائع).',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
				a4: 'النمط الغالب هو الحجاجي (الإقناعي) الممزوج بالوصفي؛ ومن مؤشراته: توظيف أسلوب القصر والحصر (وما الناس إلا...، وما البر إلا...)، وضرب الأمثلة والتشبيهات الحسية للإقناع (كالديار، كالشهاب).',
				q5: 'انثر مضمون الأبيات في فقرة موجزة لا تتجاوز أربعة أسطر بأسلوبك الخاص.',
				a5: 'يؤكد الشاعر الصحابي لبيد بن ربيعة رضي الله عنه أن الإنسان فانٍ مهما طال عمره، بينما تظل مظاهر الكون كالنجوم والجبال باقية بعده؛ لذلك يجدر بالعاقل أن يصبر على نوائب الدهر ويدرك أن حياته كالشهاب السريع الزوال، وأن ماله وديعة مؤقتة، فلا يبقى له بعد رحيله إلا ما أخلص فيه من البر والتقوى.',
				mcqCorrect: 'الاعتبار بفناء الدنيا والتأكيد على أن البر الحقيقي في التقوى وأن المال وديعة زائلة',
				mcqDistractors: [
					{
						text: 'الفخر بكثرة الأموال والديار والخلود في الدنيا',
						diagnosticFeedback: 'النص يقرر فناء الناس والمال لا الخلود والتفاخر بالثروة.'
					},
					{
						text: 'الدعوة إلى الجزع والحزن الدائم عند المصائب',
						diagnosticFeedback: 'الشاعر قال صراحة «فلا جزع إن فرق الدهر بيننا».'
					},
					{
						text: 'وصف الرحلة والصيد في الصحراء فقط',
						diagnosticFeedback: 'محور الأبيات هو الحكمة والاعتبار لا وصف الصيد.'
					}
				]
			},
			{
				title: 'في الكرم والسيادة وحفظ الجوار',
				author: 'الخنساء رضي الله عنها',
				source: 'ديوان الخنساء',
				verses: [
					['وَإِنَّ صَخْرًا لَوَالِينَا وَسَيِّدُنَا', 'وَإِنَّ صَخْرًا إِذَا [[نَشْتُو]] لَنَحَّارُ'],
					['وَإِنَّ صَخْرًا ((لَتَأْتَمُّ الْهُدَاةُ بِهِ))', 'كَأَنَّهُ عَلَمٌ فِي رَأْسِهِ نَارُ'],
					['جَلْدٌ جَمِيلُ الْمُحَيَّا كَامِلٌ وَرِعٌ', 'وَلِلْحُرُوبِ غَدَاةَ الرَّوْعِ مِسْعَارُ'],
					['حَمَّالُ أَلْوِيَةٍ هَبَّاطُ أَوْدِيَةٍ', 'شَهَّادُ أَنْدِيَةٍ لِلْجَيْشِ [[جَرَّارُ]]'],
					['وَإِنَّ صَخْرًا لَمِقْدَامٌ إِذَا رَكِبُوا', 'وَإِنَّ صَخْرًا إِذَا جَاعُوا لَعَقَّارُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'نشتو', meaning: 'ندخل في الشتاء والقحط' },
					{ word: 'تأتم الهداة', meaning: 'يقتدي به المرشدون' },
					{ word: 'علم', meaning: 'جبل مرتفع' },
					{ word: 'عقّار', meaning: 'كثير النحر لإطعام الضيوف والجياع' }
				],
				theme: 'تمجيد قيم الكرم والشجاعة والقيادة وحفظ الذكر الجميل',
				q1: 'ما العاطفة المسيطرة على الشاعرة في النص؟ وما الصفات التي خلّدتها في أخيها؟',
				a1: 'تسيطر عاطفة الحزن والوفاء والإعجاب الصادق، وقد خلّدت في أخيها صفات السيادة والكرم في أوقات الشدة، والشجاعة والقيادة، والوقار والورع، وحضور مجالس القوم.',
				q2: 'لماذا خصّت الشاعرة زمن الشتاء بذكر الكرم في قولها «إذا نشتو لنحّار»؟',
				a2: 'لأن الشتاء في البادية زمن قحط وجدب يقل فيه الطعام ويشتد فيه جوع الناس، فإطعام الضيوف والفقراء فيه أدلّ على حقيقة الكرم والمروءة.',
				q3: 'اشرح الصورة التي رسمتها الشاعرة في البيت الثاني مبيّنةً أثرها في إبراز مكانة المرثي.',
				a3: 'صوّرته كجبل شامخ على قمته نار مشتعلة يهتدي بها السائرون ليلا، ما يبرز علوّ مكانته ووضوح فضله وكونه قدوة للناس في الملمات.',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
				a4: 'النمط الغالب هو الوصفي؛ ومن مؤشراته: كثرة النعوت والأخبار الدالة على الصفات (نحّار، جلد، جميل المحيا، ورع، حمّال ألوية)، وتوظيف الصور البيانية والتشبيه (كأنه علم في رأسه نار).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص محافظا على أفكارها الأساسية.',
				a5: 'تُشيد الشاعرة الصحابية الخنساء رضي الله عنها بمناقب أخيها الذي جمع بين السيادة والكرم الفياض في أوقات الجدب والجوع، فكان قدوة يُهتدى برأيه كالجبل المضيء، وفارسا شجاعا وقورا مقداما يقود الجيوش ويشهد مجالس الحل والعقد وينحر الإبل لإطعام الناس.',
				mcqCorrect: 'تمجيد الكرم والشجاعة والقيادة والوفاء في رثاء صادق حزين',
				mcqDistractors: [
					{
						text: 'الهجاء والسخرية من قبائل العرب',
						diagnosticFeedback: 'الأبيات في الرثاء الصادق وذكر الخصال النبيلة لا في الهجاء.'
					},
					{
						text: 'وصف الطبيعة والربيع والمطر فقط',
						diagnosticFeedback: 'ذُكر الشتاء والشمس لخدمة الرثاء والكرم لا لوصف الطبيعة لذاتها.'
					},
					{
						text: 'الحث على الانعزال وترك شؤون القوم',
						diagnosticFeedback: 'مدحت الشاعرة حضور أخيها للمجالس وقيادته للناس لا انعزاله.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const markSet = difficulty === 'hard' ? ['2.5', '2.5', '2.0', '2.5', '2.5'] : ['2.5', '2.5', '2.0', '2.5', '2.5'];

		const content: ContentBlock[] = [
			buildPoetryPassageBlock({
				title: variant.title,
				verses: variant.verses,
				author: variant.author,
				source: variant.source,
				vocabulary: variant.vocabulary
			}),
			{ type: 'text', content: `1) ${variant.q1}`, answer: `1) ${variant.a1}`, mark: markSet[0] },
			{ type: 'text', content: `2) ${variant.q2}`, answer: `2) ${variant.a2}`, mark: markSet[1] },
			{ type: 'text', content: `3) ${variant.q3}`, answer: `3) ${variant.a3}`, mark: markSet[2] },
			{ type: 'text', content: `4) ${variant.q4}`, answer: `4) ${variant.a4}`, mark: markSet[3] },
			{ type: 'text', content: `5) ${variant.q5}`, answer: `5) ${variant.a5}`, mark: markSet[4] }
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `في قصيدة «${variant.title}» لـ ${variant.author}، ما الفكرة العامة المحورية التي يدور حولها النص؟`,
				questionTextAr: 'اختر الفكرة العامة الأدق للنص الشعري:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يدور النص حول ${variant.theme} بروح رصينة وألفاظ جزلة.`
			},
			sujetExercise: {
				customTitle: 'أولا: البناء الفكري',
				points: this.defaultPoints,
				instruction: 'اقرأ السند الشعري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'اقرأ شرح المفردات أسفل السند لتفهم دلالة الألفاظ القديمة بدقة.',
				'عند تحديد النمط الغالب اذكر دائما مؤشرين واضحين مع التمثيل من النص.',
				'في التلخيص حافظ على أفكار الشاعر الأساسية دون نسخ الأبيات حرفيا.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 2. البناء الفكري (12 ن) — السند النثري حول الأمثال والحكم العربية
const tpl1asTcstT1ProseAmthalIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t1_amthal_prose_ib',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — الأمثال والحكم العربية وخصائصها الفنية',
	curriculumLessonId: 'arb_lesson_1as_tcst_t1_amthal_hikam',
	defaultPoints: 12,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'بلاغة الأمثال والحكم في التراث العربي',
				author: 'نص أدبي تربوي مستوحى من تراث النقد العربي',
				source: 'في الأدب العربي القديم',
				paragraphs: [
					'تُعدّ الأمثالُ والحكمُ مرآةَ العقلِ العربيِّ وخلاصةَ تجاربِ الأجيالِ؛ فهي [[عباراتٌ]] موجزةٌ صاغتْها الفطرةُ السليمةُ لِتَخْتَصِرَ المواعظَ الطويلةَ في كلماتٍ قليلةٍ سريعةِ الحفظِ والدورانِ على الألسنةِ.',
					'ويمتازُ المثلُ بأنّ له [[موردًا]] أصليًّا ارتبط بحادثةٍ واقعيةٍ، و((مضربًا يتجددُ في كلِّ عصرٍ)) حين تتشابهُ المواقفُ؛ كقولِهم «إنّكَ لا تَجني من الشوكِ العنبَ» تحذيرًا من انتظارِ الخيرِ من أهلِ الشرِّ، وقولِهم «عندَ الصباحِ يَحمدُ القومُ السُّرى» حثًّا على الصبرِ لتحقيقِ الغاياتِ.',
					'أمّا الحكمةُ فقولٌ صائبٌ يَصدرُ عن ذوي العقلِ والبصيرةِ دون اشتراطِ قصةٍ سابقةٍ، نحو: «المرءُ بأصغريهِ: قلبِهِ ولسانِهِ»، و«آفةُ الرأيِ الهوى». وقد اجتمع في المثلِ أربعٌ لا تجتمعُ في غيرهِ من الكلامِ: إيجازُ اللفظِ، وإصابةُ المعنى، وحسنُ التشبيهِ، وجودةُ الكنايةِ.'
				],
				vocabulary: [
					{ word: 'المورد', meaning: 'المناسبة الأصلية للمثل' },
					{ word: 'السرى', meaning: 'السير ليلا' },
					{ word: 'آفة الرأي', meaning: 'ما يفسد الصواب فيه' }
				],
				theme: 'بيان قيمة الأمثال والحكم العربية والتمييز بينهما ورصد خصائصهما البلاغية',
				mcqCorrect: 'الأمثال والحكم خلاصة تجارب العرب، وللمثل مورد ومضرب ويجمع الإيجاز وإصابة المعنى',
				mcqDistractors: [
					{
						text: 'الأمثال قصائد شعرية طويلة لا تُستعمل إلا في عصرها الأول',
						diagnosticFeedback: 'الأمثال عبارات نثرية موجزة تتجدد مضاربها في كل عصر.'
					},
					{
						text: 'الحكمة يشترط فيها دائما وجود قصة قديمة لا تتغير',
						diagnosticFeedback: 'اشتراط القصة (المورد) خاص بالمثل لا بالحكمة.'
					},
					{
						text: 'الأمثال تعتمد على الإطالة والتعقيد اللفظي',
						diagnosticFeedback: 'بل تقوم على إيجاز اللفظ ووضوح المعنى.'
					}
				]
			},
			{
				title: 'وظيفة الحكمة والمثل في تقويم السلوك',
				author: 'نص أدبي تربوي مستوحى من منهج الإصلاح اللغوي',
				source: 'في البلاغة والأدب القديم',
				paragraphs: [
					'لم تَكُنْ الأمثالُ والحكمُ عند العربِ مجردَ زينةٍ لفظيةٍ، بل [[كانتْ]] أداةً تربويةً وحجاجيةً يَحسمُ بها الخطباءُ الخلافَ ويُقنعونَ السامعينَ بأقصرِ طريقٍ؛ لأنّ النفسَ تَستجيبُ للعبارةِ ((التي تجمعُ الصدقَ والإيجازَ)).',
					'وحين يقولُ القائلُ: «سبقَ السيفُ العذلَ»، فإنّه يُوقِفُ اللومَ غيرَ المجدي بعد فواتِ الأوانِ، وحين يَستشهدُ بقولِهم: «يداكَ أوكتا وفوكَ نفخَ»، يُنبّهُ المفرّطَ إلى تحمّلِ مسؤوليةِ [[تقصيرِهِ]] بدلَ إلقاءِ اللومِ على غيرِهِ.',
					'ومن هنا حَرصَ علماءُ العربيةِ والأدباءُ على تدوينِ هذه الذخائرِ، لأنّها تحفظُ فصاحةَ اللسانِ، وتمدّ المتعلّمَ بقيمِ العقلِ والحزمِ والصبرِ والتثبتِ.'
				],
				vocabulary: [
					{ word: 'العذل', meaning: 'اللوم والعتاب' },
					{ word: 'أوكتا', meaning: 'ربطتا القربة بالوكاء' },
					{ word: 'ذخائر', meaning: 'كنوز نفيسة' }
				],
				theme: 'الدور التربوي والحجاجي للأمثال والحكم وأهمية حفظها وتوظيفها',
				mcqCorrect: 'تؤدي الأمثال والحكم وظيفة تربوية وحجاجية وتدعو إلى المسؤولية والحزم والإيجاز',
				mcqDistractors: [
					{
						text: 'الأمثال مجرد ترف لغوي لا أثر له في الإقناع',
						diagnosticFeedback: 'النص ينفي ذلك صراحة ويؤكد وظيفتها التربوية والحجاجية.'
					},
					{
						text: 'مثل «يداك أوكتا» يعفي الإنسان من نتائج أخطائه',
						diagnosticFeedback: 'بل ينبهه إلى تحمّل مسؤولية تقصيره.'
					},
					{
						text: 'تدوين الأمثال أضعف فصاحة اللغة العربية',
						diagnosticFeedback: 'بل حفظ فصاحة اللسان وزاد المتعلم حكمة وبيانا.'
					}
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildProsePassageBlock({
				title: variant.title,
				paragraphs: variant.paragraphs,
				author: variant.author,
				source: variant.source,
				vocabulary: variant.vocabulary
			}),
			{
				type: 'text',
				content: '1) ما الفكرة العامة التي يعالجها النص؟',
				answer: `1) الفكرة العامة: ${variant.theme}.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: '2) فرّق من خلال النص ومكتسباتك بين «المثل» و«الحكمة» من حيث النشأة (المورد).',
				answer: '2) المثل قول موجز سائر له قصة أصلية (مورد) ومواقف مشابهة (مضرب)، أما الحكمة فقول عقلي صائب يصدر عن التجربة والبصيرة دون اشتراط قصة مورد.',
				mark: '2.5'
			},
			{
				type: 'text',
				content: '3) اذكر ثلاث خصائص فنية تميّز أسلوب الأمثال والحكم العربية مع بيان أثرها في سرعة انتشارها.',
				answer: '3) من خصائصها: إيجاز اللفظ، إصابة المعنى، حسن التشبيه، وجودة الكناية؛ وهذه الخصائص تسهل حفظها على الألسنة وتزيد قوتها الإقناعية.',
				mark: '2.5'
			},
			{
				type: 'text',
				content: '4) ما النمط الغالب على هذا النص؟ اذكر مؤشرين له مع التمثيل من النص.',
				answer: '4) النمط الغالب هو التفسيري؛ ومن مؤشراته: أسلوب التعريف والشرح (تعد الأمثال...، أما الحكمة فقول...)، واستعمال التمثيل والتوضيح (كقولهم...، نحو...)، وروابط التعليل (لأنّ، فهي).',
				mark: '2.5'
			},
			{
				type: 'text',
				content: '5) لخّص مضمون النص في فقرة موجزة لا تتجاوز أربعة أسطر بأسلوبك الخاص.',
				answer: '5) يبرز النص مكانة الأمثال والحكم بوصفها خلاصة التجربة والعقل العربي، مبينا أن المثل يرتبط بمورد ومضرب بينما تصدر الحكمة عن البصيرة دون قصة شرطية، وتتميز جميعها بالإيجاز وإصابة المعنى وجمال التصوير، مما جعلها أداة تربوية وحجاجية حية عبر العصور.',
				mark: '2.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقا من السند النثري «${variant.title}»، ما الخلاصة الأدق لمضمون النص؟`,
				questionTextAr: 'اختر الإجابة الصحيحة حول مضمون النص:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.theme
			},
			sujetExercise: {
				customTitle: 'أولا: البناء الفكري',
				points: this.defaultPoints,
				instruction: 'اقرأ السند النثري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'ميّز بين خصائص المثل (له مورد ومضرب) وخصائص الحكمة (قول عقلي مباشر).',
				'النصوص النقدية التي تشرح فنا أدبيا يغلب عليها النمط التفسيري.',
				'استخرج مؤشرات النمط مع أمثلة حرفية قصيرة من النص.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.theme}`,
				'الفرق بين المثل والحكمة في شرط المورد.',
				'الخصائص الفنية: الإيجاز وإصابة المعنى وحسن التشبيه وجودة الكناية.',
				'النمط التفسيري ومؤشراته.'
			],
			finalAnswer: variant.theme
		};
	}
};

// 3. البناء اللغوي (8 ن) — بناء الفعل الماضي والمضارع وإعراب المضارع
const tpl1asTcstT1VerbsIrabLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t1_verbs_irab_lb',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — بناء الأفعال وإعراب المضارع والحقل الدلالي',
	curriculumLessonId: 'arb_lesson_1as_tcst_t1_bina_irab_afal',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«حَفِظَ المسلمونَ التراثَ، والفتياتُ يُتْقِنَّ العربيةَ، ولن يَتَخَلَّفَ مَن لم يَدْعُ إلى الكسلِ.»',
				entries: [
					{
						target: 'حَفِظَ',
						irab: 'فعل ماض مبني على الفتح الظاهر على آخره.',
						mark: '0.75'
					},
					{
						target: 'يُتْقِنَّ',
						irab: 'فعل مضارع مبني على السكون لاتصاله بنون النسوة، والنون ضمير متصل مبني على الفتح في محل رفع فاعل.',
						mark: '1.0'
					},
					{
						target: 'يَتَخَلَّفَ',
						irab: 'فعل مضارع منصوب بـ «لن» وعلامة نصبه الفتحة الظاهرة على آخره.',
						mark: '0.75'
					},
					{
						target: 'يَدْعُ',
						irab: 'فعل مضارع مجزوم بـ «لم» وعلامة جزمه حذف حرف العلة (الواو) لأنه معتل الآخر.',
						mark: '1.0'
					}
				],
				mcqQ: 'في العبارة: «الفتياتُ يُتْقِنَّ العربيةَ»، ما حالة الفعل المضارع «يُتْقِنَّ»؟',
				mcqCorrect: 'مبني على السكون لاتصاله بنون النسوة',
				mcqDistractors: [
					{ text: 'مرفوع بثبوت النون لأنه من الأفعال الخمسة', diagnosticFeedback: 'النون هنا نون النسوة وهي ضمير فاعل تبني المضارع على السكون.' },
					{ text: 'مبني على الفتح لاتصاله بنون التوكيد', diagnosticFeedback: 'المتحدث عن جمع المؤنث (الفتيات) فنون الفعل نون النسوة.' },
					{ text: 'مجزوم بحذف حرف العلة', diagnosticFeedback: 'لم تسبقه أداة جزم وهو صحيح الآخر.' }
				],
				fieldPrompt: 'صنّف الألفاظ الآتية في حقلين دلاليين مناسبين مع التسمية: «التقوى، الجبال، البر، النجوم، الديار، الصبر».',
				fieldAnswer: 'حقل الأخلاق والقيم: التقوى، البر، الصبر. حقل الطبيعة والكون: الجبال، النجوم، الديار.'
			},
			{
				sentence: '«أدرَكْتُ قيمةَ الصبرِ، والعلماءُ بَذَلُوا جهدَهُم كي يَسْعَوْا للخيرِ، ولم يَقْضِ الحكيمُ بالهوى.»',
				entries: [
					{
						target: 'أدرَكْتُ',
						irab: 'فعل ماض مبني على السكون لاتصاله بتاء الفاعل، والتاء ضمير متصل مبني على الضم في محل رفع فاعل.',
						mark: '1.0'
					},
					{
						target: 'بَذَلُوا',
						irab: 'فعل ماض مبني على الضم لاتصاله بواو الجماعة، والواو ضمير متصل مبني في محل رفع فاعل.',
						mark: '0.75'
					},
					{
						target: 'يَسْعَوْا',
						irab: 'فعل مضارع منصوب بـ «كي» وعلامة نصبه حذف النون لأنه من الأفعال الخمسة، والواو فاعل.',
						mark: '0.75'
					},
					{
						target: 'يَقْضِ',
						irab: 'فعل مضارع مجزوم بـ «لم» وعلامة جزمه حذف حرف العلة (الياء) لأنه معتل الآخر.',
						mark: '1.0'
					}
				],
				mcqQ: 'ما علامة بناء الفعل الماضي «بَذَلُوا» في الجملة السابقة؟',
				mcqCorrect: 'الضم لاتصاله بواو الجماعة',
				mcqDistractors: [
					{ text: 'الفتح الظاهر', diagnosticFeedback: 'اتصال واو الجماعة بالماضي يبنيه على الضم.' },
					{ text: 'السكون لاتصاله بضمير رفع', diagnosticFeedback: 'السكون مع ضمائر الرفع المتحركة لا مع واو الجماعة.' },
					{ text: 'حذف النون', diagnosticFeedback: 'حذف النون لا يكون في الفعل الماضي.' }
				],
				fieldPrompt: 'صنّف الألفاظ الآتية في حقلين دلاليين مناسبين: «الكرم، السيف، المروءة، الرمح، الوفاء، الجيش».',
				fieldAnswer: 'حقل القيم الخلقية: الكرم، المروءة، الوفاء. حقل الفروسية والحرب: السيف، الرمح، الجيش.'
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) أعرب الكلمات المحددة في العبارة الآتية إعرابا تاما: ${variant.sentence}`
			},
			buildIrabTableBlock(variant.entries),
			{
				type: 'text',
				content: '2) حوّل الفعل «يَحْفَظُ» في جملة «يحفظُ المؤمنُ عهدَهُ» إلى مضارع مبني على الفتح مرة، ومبني على السكون مرة أخرى، مع التعليل.',
				answer: '2) مبني على الفتح: «واللهِ ليحفظَنَّ المؤمنُ عهدَهُ» (لاتصاله بنون التوكيد المباشرة). مبني على السكون: «المؤمناتُ يحفظْنَ عهدَهُنَّ» (لاتصاله بنون النسوة).',
				mark: '2.5'
			},
			{
				type: 'text',
				content: `3) ${variant.fieldPrompt}`,
				answer: `3) ${variant.fieldAnswer}`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإعراب الصحيح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة هي: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة القواعد واللغة الآتية بدقة وإيجاز:',
				content
			},
			hints: [
				'حدّد أولا نوع الفعل (ماضٍ أم مضارع) وما اتصل بآخره أو سبقه.',
				'تذكّر علامات الجزم الثلاث: السكون، حذف حرف العلة، حذف النون.',
				'اجمع الكلمات المتقاربة دلاليا تحت عنوان جامع واضح.'
			],
			solutionStepsAr: variant.entries.map((e) => `${e.target}: ${e.irab}`),
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 4. البناء اللغوي (8 ن) — التشبيه البليغ والكناية والإعراب التطبيقي
const tpl1asTcstT1BalaghaTashbihLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcst_t1_balagha_tashbih_lb',
	grade: '1as_tcst',
	trimesterId: 't1',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي — التشبيه البليغ والكناية وإعراب الشواهد',
	curriculumLessonId: 'arb_lesson_1as_tcst_t1_tashbih_kinaya',
	defaultPoints: 8,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				tashbihQuote: '«وما المالُ إلّا عارياتٌ ودائعُ» (لبيد بن ربيعة رضي الله عنه)',
				tashbihAnswer:
					'تشبيه بليغ؛ شبّه المال (مشبه) بالعاريات والودائع (مشبه به)، وحُذفت الأداة ووجه الشبه. أثره: توضيح سرعة زوال المال والمبالغة في عدم دوامه لصاحبه.',
				kinayaQuote: '«فلانٌ كثيرُ الرمادِ، نقيُّ الثوبِ»',
				kinayaAnswer:
					'«كثير الرماد»: كناية عن صفة الكرم والجود. «نقي الثوب»: كناية عن صفة العفة والطهارة. أثرهما: الإتيان بالمعنى مصحوبا بالدليل في إيجاز وتجسيم.',
				irabEntries: [
					{
						target: 'المالُ',
						irab: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
						mark: '1.0'
					},
					{
						target: 'عارياتٌ',
						irab: 'خبر مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
						mark: '1.0'
					}
				],
				mcqQ: 'ما نوع الصورة البيانية في قول لبيد رضي الله عنه: «وما المال إلا عاريات ودائع»؟',
				mcqCorrect: 'تشبيه بليغ (ذُكر المشبه والمشبه به وحُذفت الأداة ووجه الشبه)',
				mcqDistractors: [
					{ text: 'تشبيه تام ذُكرت أركانه الأربعة', diagnosticFeedback: 'لا توجد أداة تشبيه ولا وجه شبه في البيت.' },
					{ text: 'كناية عن موصوف', diagnosticFeedback: 'المشبه (المال) والمشبه به (عاريات) مذكوران معا.' },
					{ text: 'استعارة تصريحية', diagnosticFeedback: 'المشبه «المال» مذكور ولم يُحذف.' }
				]
			},
			{
				tashbihQuote: '«لساني صارمٌ لا عيبَ فيهِ» (حسان بن ثابت رضي الله عنه)',
				tashbihAnswer:
					'تشبيه بليغ؛ شبّه لسانه (مشبه) بالسيف الصارم القاطع (مشبه به)، وحُذفت الأداة ووجه الشبه. أثره: تقوية المعنى وبيان حدة شعره وقوة حجته في الدفاع عن الحق.',
				kinayaQuote: '«يَبيتُ يُجافي جنبَهُ عن فراشِهِ» (عبد الله بن رواحة رضي الله عنه)',
				kinayaAnswer:
					'كناية عن صفة قيام الليل وكثرة التهجد والعبادة، مع جواز المعنى الحقيقي؛ أثرها: الإتيان بالمعنى مصحوبا بدليله الحسي في إيجاز وتجسيم.',
				irabEntries: [
					{
						target: 'صارمٌ',
						irab: 'خبر مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
						mark: '1.0'
					},
					{
						target: 'يُجافي',
						irab: 'فعل مضارع مرفوع وعلامة رفعه الضمة المقدرة على الياء منع من ظهورها الثقل، والفاعل ضمير مستتر تقديره هو.',
						mark: '1.0'
					}
				],
				mcqQ: 'في قول حسان بن ثابت رضي الله عنه: «لساني صارمٌ لا عيب فيه»، الصورة البيانية هي:',
				mcqCorrect: 'تشبيه بليغ (شبه لسانه بالسيف القاطع بحذف الأداة ووجه الشبه)',
				mcqDistractors: [
					{ text: 'كناية عن صفة', diagnosticFeedback: 'ذُكر المشبه «لساني» والمشبه به «صارم» فالصورة تشبيه بليغ.' },
					{ text: 'تشبيه مرسل مفصل', diagnosticFeedback: 'لا توجد أداة تشبيه ولا وجه شبه.' },
					{ text: 'جناس تام', diagnosticFeedback: 'ليست محسنا لفظيا بل صورة بيانية.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `1) اشرح الصورة البيانية في القول الآتي وبيّن نوعها وأثرها في المعنى: ${variant.tashbihQuote}`,
				answer: `1) ${variant.tashbihAnswer}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) استخرج الكناية من العبارة الآتية، وحدّد نوعها وسرّ جمالها: ${variant.kinayaQuote}`,
				answer: `2) ${variant.kinayaAnswer}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: '3) أعرب الكلمتين المحددتين من الشاهدين السابقين إعرابا تاما:'
			},
			buildIrabTableBlock(variant.irabEntries),
			{
				type: 'text',
				content: '4) كوّن من إنشائك جملة تتضمن تشبيها بليغا على صورة الإضافة (إضافة المشبه به إلى المشبه).',
				answer: '4) مثال صحيح: «اهتدينا بنورِ العلمِ» أو «شربنا من معينِ الحكمةِ» (أضيف المشبه به إلى المشبه).',
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcst',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر التحليل البلاغي الصحيح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.tashbihAnswer
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة البلاغة والإعراب الآتية بمنهجية واضحة:',
				content
			},
			hints: [
				'التشبيه البليغ يقتصر على المشبه والمشبه به فقط دون أداة أو وجه شبه.',
				'الكناية يُطلق فيها اللفظ ويُراد لازم معناه مع جواز المعنى الحقيقي.',
				'اذكر دائما في كل صورة بيانية: التسمية، الشرح، ثم الأثر البلاغي.'
			],
			solutionStepsAr: [variant.tashbihAnswer, variant.kinayaAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCST_T1: ArabicParameterizedTemplate[] = [
	tpl1asTcstT1PoetryIb,
	tpl1asTcstT1ProseAmthalIb,
	tpl1asTcstT1VerbsIrabLb,
	tpl1asTcstT1BalaghaTashbihLb
];
