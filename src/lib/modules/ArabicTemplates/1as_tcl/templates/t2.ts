import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	buildArudScansionBlock,
	buildIrabTableBlock,
	buildPoetryPassageBlock
} from '../../arabic-helpers';

// ============================================================================
// 5 Parameterized ONEC Templates — 1AS TCL Trimester 2 (10 + 6 + 4 = 20)
// (1 intellectual_building [10pts], 2 linguistic_building [6pts, 1 with العروض], 2 critical_evaluation [4pts])
// ============================================================================

// 1. البناء الفكري (10 ن) — شعر الدعوة والفتوح في عصر صدر الإسلام
const tpl1asTclT2ShiirDawaIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t2_shiir_dawa_ib',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — شعر الدعوة والفتوح في صدر الإسلام',
	curriculumLessonId: 'arb_lesson_1as_tcl_t2_quran_shiir_dawa',
	defaultPoints: 10,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'نور النبوة وقيام الليل',
				author: 'عبد الله بن رواحة رضي الله عنه',
				source: 'صحيح البخاري والسيرة النبوية',
				verses: [
					['فِينَا رَسُولُ اللَّهِ يَتْلُو [[كِتَابَهُ]]', 'إِذَا انْشَقَّ مَعْرُوفٌ مِنَ الصُّبْحِ سَاطِعُ'],
					['أَرَانَا الْهُدَى بَعْدَ الْعَمَى فَقُلُوبُنَا', 'بِهِ مُوقِنَاتٌ ((أَنَّ مَا قَالَ وَاقِعُ))'],
					['يَبِيتُ يُجَافِي جَنْبَهُ عَنْ فِرَاشِهِ', 'إِذَا اسْتَثْقَلَتْ بِالْمُشْرِكِينَ [[الْمَضَاجِعُ]]']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'انشق الصبح', meaning: 'انبلج وظهر نور الفجر' },
					{ word: 'موقنات', meaning: 'مصدّقات بيقين جازم' },
					{ word: 'يجافي جنبه', meaning: 'يفارق فراشه للتهجد وقيام الليل' },
					{ word: 'استثقلت المضاجع', meaning: 'غلبتهم الغفلة والنوم الثقيل' }
				],
				theme: 'تعظيم النبي صلى الله عليه وسلم وبيان أثر القرآن في هداية القلوب وتصوير عبادته وقيامه الليل',
				q1: 'ما الصفات النبوية التي أبرزها عبد الله بن رواحة رضي الله عنه في هذه الأبيات؟',
				a1: 'أبرز تلاوته الدائمة لكتاب الله وقت الفجر، وإخراجه الناس من ظلمات الضلال إلى نور الهداية، وصدق ما يخبر به، وكثرة تهجده وقيامه الليل.',
				q2: 'ما أثر بعثة النبي صلى الله عليه وسلم في قلوب المؤمنين كما ورد في البيت الثاني؟',
				a2: 'أرشدهم إلى الهدى بعد العمى والضلال فامتلأت قلوبهم يقينا وتصديقا جازما بكل ما أخبر به الوحي.',
				q3: 'عقد الشاعر مقارنة ضمنية في البيت الثالث بين حال النبي صلى الله عليه وسلم وحال المشركين؛ وضّحها.',
				a3: 'النبي صلى الله عليه وسلم متيقظ يقوم الليل مجافيا لفراشه في طاعة ربه، بينما المشركون غارقون في النوم الثقيل والغفلة عن ذكر الله.',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
				a4: 'النمط الغالب هو الوصفي؛ ومن مؤشراته: الأفعال المضارعة الدالة على الاستمرار والتجدد (يتلو، يبيت، يجافي)، والنعوت والأخبار الواصفة (ساطع، موقنات)، والصور البيانية (العمى، يجافي جنبه عن فراشه).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يعتز الصحابي عبد الله بن رواحة رضي الله عنه بوجود النبي صلى الله عليه وسلم بين الصحابة تاليا كتاب الله عند انبلاج الفجر، مؤكدا أنه هداهم بعد الضلال حتى استقر اليقين في قلوبهم، ومصوّرا إقباله على قيام الليل والتهجد بينما يغرق المشركون في سبات الغفلة.',
				mcqCorrect: 'مدح النبي صلى الله عليه وسلم بتلاوة القرآن والهداية واليقين وقيام الليل',
				mcqDistractors: [
					{ text: 'وصف المعارك الحربية في الشام', diagnosticFeedback: 'الأبيات تصف تلاوة القرآن والهداية وقيام الليل.' },
					{ text: 'رثاء الصحابة في غزوة مؤتة', diagnosticFeedback: 'النص في المديح النبوي وبيان أثر الوحي.' },
					{ text: 'الفخر بنسب الأنصار فقط', diagnosticFeedback: 'محور النص هو شخص النبي صلى الله عليه وسلم والقرآن.' }
				]
			},
			{
				title: 'الفتح المبين والدفاع عن الدعوة',
				author: 'حسان بن ثابت رضي الله عنه',
				source: 'ديوان حسان بن ثابت',
				verses: [
					['فَإِمَّا تُعْرِضُوا عَنَّا اعْتَمَرْنَا', 'وَكَانَ [[الْفَتْحُ]] وَانْكَشَفَ الْغِطَاءُ'],
					['وَإِلَّا فَاصْبِرُوا لِجِلَادِ يَوْمٍ', '((يُعِزُّ اللَّهُ فِيهِ مَنْ يَشَاءُ))'],
					['وَجِبْرِيلٌ أَمِينُ اللَّهِ فِينَا', 'وَرُوحُ الْقُدْسِ لَيْسَ لَهُ كِفَاءُ'],
					['هَجَوْتَ مُحَمَّدًا فَأَجَبْتُ عَنْهُ', 'وَعِنْدَ اللَّهِ فِي ذَاكَ [[الْجَزَاءُ]]'],
					['لِسَانِي صَارِمٌ لَا عَيْبَ فِيهِ', 'وَبَحْرِي لَا تُكَدِّرُهُ الدِّلَاءُ']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'جلاد', meaning: 'قتال ومضاربة بالسيوف' },
					{ word: 'كفاء', meaning: 'نظير ومثيل' },
					{ word: 'صارم', meaning: 'سيف قاطع' },
					{ word: 'لا تكدره الدلاء', meaning: 'غزير عميق لا ينفد' }
				],
				theme: 'الدفاع عن النبي صلى الله عليه وسلم وتأكيد النصر الرباني يوم الفتح واعتزاز الشاعر ببيانه',
				q1: 'ما الخياران اللذان عرضهما حسان بن ثابت رضي الله عنه على قريش في البيتين الأول والثاني؟',
				a1: 'إما إخلاء الطريق للمسلمين ليعتمروا ويتحقق الفتح سلميا، وإما الاستعداد ليوم قتال يعز الله فيه جنده.',
				q2: 'من أين يستمد المسلمون ثقتهم بالنصر كما يظهر في البيتين الثاني والثالث؟',
				a2: 'يستمدونها من إيمانهم بأن الله يعزّ من يشاء ومن تأييد الوحي وجبريل عليه السلام للدعوة النبوية.',
				q3: 'بمَ افتخر الشاعر في البيتين الرابع والخامس؟ وهل كان دافعه دنيويا؟ علّل.',
				a3: 'افتخر بالدفاع عن النبي صلى الله عليه وسلم وبقوة شعره وغزارة بيانه؛ ولم يكن دافعه دنيويا بل احتساب الأجر من الله لقوله «وعند الله في ذاك الجزاء».',
				q4: 'ما النمط الغالب على الأبيات؟ اذكر مؤشرين له مع التمثيل.',
				a4: 'النمط الغالب هو الحجاجي التحدّي الممزوج بالإيعاز؛ ومن مؤشراته: أسلوب الشرط والتخيير (فإما تعرضوا... وإلا فاصبروا)، وأسلوب الأمر للتحدي (فاصبروا)، وتقديم الحجج الإيمانية (وجبريل أمين الله فينا).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يُمهل شاعر الرسول حسان بن ثابت رضي الله عنه قريشا بين فتح الطريق للعمرة أو مواجهة يوم ينصر الله فيه المؤمنين بتأييد السماء، ثم يؤكد أنه تصدى للرد عن النبي صلى الله عليه وسلم ابتغاء الأجر من الله بلسان قاطع كالسيف وشعر غزير كالبحر.',
				mcqCorrect: 'نصرة النبي صلى الله عليه وسلم وبيان تأييد الله للمسلمين يوم الفتح والاعتزاز ببيان الدعوة',
				mcqDistractors: [
					{ text: 'الاعتذار لقريش والتراجع عن العمرة', diagnosticFeedback: 'الأبيات في قمة الثبات والعزة والتحدي.' },
					{ text: 'طلب العطاء المادي مقابل المدح', diagnosticFeedback: 'أكد الشاعر أن جزاءه عند الله وحده.' },
					{ text: 'وصف الرحلة البحرية والتجارة', diagnosticFeedback: 'لفظ «بحري» استعارة لغزارة شعره لا للبحر الحقيقي.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildPoetryPassageBlock({
				title: variant.title,
				verses: variant.verses,
				author: variant.author,
				source: variant.source,
				vocabulary: variant.vocabulary
			}),
			{ type: 'text', content: `1) ${variant.q1}`, answer: `1) ${variant.a1}`, mark: '2.0' },
			{ type: 'text', content: `2) ${variant.q2}`, answer: `2) ${variant.a2}`, mark: '2.0' },
			{ type: 'text', content: `3) ${variant.q3}`, answer: `3) ${variant.a3}`, mark: '2.0' },
			{ type: 'text', content: `4) ${variant.q4}`, answer: `4) ${variant.a4}`, mark: '2.0' },
			{ type: 'text', content: `5) ${variant.q5}`, answer: `5) ${variant.a5}`, mark: '2.0' }
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `في أبيات «${variant.title}» لـ ${variant.author}، ما الفكرة العامة للنص؟`,
				questionTextAr: 'اختر الفكرة الأدق:',
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
				instruction: 'اقرأ السند الشعري الآتي قراءة متمعنة ثم أجب عن أسئلة البناء الفكري:',
				content
			},
			hints: [
				'اربط النص بسياقه الإيماني والتاريخي في عصر صدر الإسلام.',
				'انتبه للمعجم القرآني الجديد المستعمل في الأبيات.',
				'لخّص الأفكار بلغة واضحة دون إعادة نسخ الأبيات.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 2. البناء اللغوي (6 ن) — النواسخ والمفاعيل + الاستعارة والطباق والمقابلة
const tpl1asTclT2NawasikhIstiaraLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t2_nawasikh_istiara_lb',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — النواسخ والمفاعيل والاستعارة والمقابلة',
	curriculumLessonId: 'arb_lesson_1as_tcl_t2_nawasikh_mafail',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«وكانَ الفتحُ، وإنَّ الرسولَ لنورٌ، وقد جاهدَ الصحابةُ جهادًا عظيمًا ابتغاءَ مرضاةِ اللهِ.»',
				entries: [
					{ target: 'الفتحُ', irab: 'فاعل لـ «كان» التامة مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' },
					{ target: 'جهادًا', irab: 'مفعول مطلق مبين للنوع منصوب وعلامة نصبه الفتحة الظاهرة.', mark: '1.0' },
					{ target: 'ابتغاءَ', irab: 'مفعول لأجله منصوب وعلامة نصبه الفتحة الظاهرة وهو مضاف.', mark: '1.0' }
				],
				balaghaQ: 'اشرح الصورة البيانية في «أرانا الهدى بعد العمى» (كلمة العمى)، ثم استخرج المحسن البديعي بين «الهدى» و«العمى» وأثره.',
				balaghaA: 'في «العمى» استعارة تصريحية (شبه الضلال بالعمى وحذف المشبه وصرح بالمشبه به، أثرها التجسيم). وبين «الهدى / العمى» طباق إيجاب يقوي المعنى ويوضحه بالتضاد.',
				mcqQ: 'في قول حسان رضي الله عنه: «وكان الفتحُ وانكشف الغطاءُ»، ما إعراب «الفتحُ»؟',
				mcqCorrect: 'فاعل لـ «كان» التامة مرفوع بالضمة الظاهرة',
				mcqDistractors: [
					{ text: 'اسم كان ناقصة مرفوع', diagnosticFeedback: 'لا يوجد خبر لـ كان؛ المعنى «ووقع الفتح» فهي تامة.' },
					{ text: 'مفعول به منصوب', diagnosticFeedback: 'الكلمة مرفوعة و«كان» لا تنصب مفعولا به.' },
					{ text: 'مبتدأ مرفوع', diagnosticFeedback: 'سبقها الفعل «كان» التام.' }
				]
			},
			{
				sentence: '«أوشكَ الحقُّ أن ينتصرَ، وأخذَ الخطباءُ يوجّهونَ الناسَ توجيهًا حكيمًا حرصًا على وحدتِهم.»',
				entries: [
					{ target: 'الحقُّ', irab: 'اسم أوشك مرفوع وعلامة رفعه الضمة الظاهرة، وجملة «أن ينتصر» في محل نصب خبرها.', mark: '1.0' },
					{ target: 'توجيهًا', irab: 'مفعول مطلق مبين للنوع منصوب وعلامة نصبه الفتحة الظاهرة.', mark: '1.0' },
					{ target: 'حرصًا', irab: 'مفعول لأجله منصوب وعلامة نصبه الفتحة الظاهرة على آخره.', mark: '1.0' }
				],
				balaghaQ: 'اشرح الصورة البيانية في «على أكتافها الأسلُ الظماءُ»، ثم استخرج المحسن البديعي في «الصدق أمانة والكذب خيانة» وأثره.',
				balaghaA: '«الأسل الظماء» استعارة مكنية (شبه الرماح بكائنات تعطش وحذف المشبه به ورمز له بالظماء، أثرها التجسيم). وفي «الصدق أمانة / الكذب خيانة» مقابلة تقوي المعنى وتوضحه بالتضاد (مع سجع).',
				mcqQ: 'ما حكم اقتران خبر «أخذَ» (من أفعال الشروع) بـ «أنْ» المصدرية؟',
				mcqCorrect: 'يمتنع اقترانه بـ «أنْ»',
				mcqDistractors: [
					{ text: 'يجب اقترانه بـ «أنْ»', diagnosticFeedback: 'الوجوب يكون مع «حرى» و«اخلولق» فقط.' },
					{ text: 'يكثر اقترانه بـ «أنْ»', diagnosticFeedback: 'الكثرة مع «عسى» و«أوشك».' },
					{ text: 'يجوز عند الضرورة فقط', diagnosticFeedback: 'يمتنع مع جميع أفعال الشروع لأنها تدل على الحال.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: `1) أعرب الكلمات المحددة في الجملة الآتية: ${variant.sentence}` },
			buildIrabTableBlock(variant.entries),
			{
				type: 'text',
				content: `2) ${variant.balaghaQ}`,
				answer: `2) ${variant.balaghaA}`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة النحوية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الإجابة الصحيحة: ${variant.mcqCorrect}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة القواعد والبلاغة الآتية بدقة:',
				content
			},
			hints: [
				'تحقق من اكتمال المعنى بعد «كان» لتمييز التامة من الناقصة.',
				'خبر كاد وأخواتها جملة فعلية مضارعية في محل نصب دائما.',
				'فرّق بين الاستعارة المكنية (حذف المشبه به) والتصريحية (التصريح به).'
			],
			solutionStepsAr: [...variant.entries.map((e) => `${e.target}: ${e.irab}`), variant.balaghaA],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. البناء اللغوي (6 ن) مع العروض (بحرا الكامل والرجز!)
const tpl1asTclT2ArudKamilRajazLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t2_arud_kamil_rajaz_lb',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'prosody_arud',
	titleAr: 'البناء اللغوي — الإعراب والبديع والتقطيع العروضي (الكامل والرجز)',
	curriculumLessonId: 'arb_lesson_1as_tcl_t2_arud_kamil_rajaz',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				verseSadr: 'مِنْ مَعْشَرٍ سَنَّتْ لَهُمْ آبَاؤُهُمْ',
				verseAjuz: 'وَلِكُلِّ قَوْمٍ سُنَّةٌ وَإِمَامُهَا',
				arudWriting: 'مِنْ مَعْشَرِنْ سَنْنَتْ لَهُمْ أَابَاؤُهُمْ — وَلِكُلْلِ قَوْ مِنْ سُنْنَتُنْ وَإِمَامُهَا',
				symbols: '|ه|ه||ه |ه|ه||ه |ه|ه||ه — |||ه||ه |ه|ه||ه |||ه||ه',
				tafilat: 'مُتْفَاعِلُنْ مُتْفَاعِلُنْ مُتْفَاعِلُنْ — مُتَفَاعِلُنْ مُتْفَاعِلُنْ مُتَفَاعِلُنْ',
				meterName: 'بحر الكامل التام',
				irabEntries: [
					{ target: 'آبَاؤُهُمْ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة، و«هم» مضاف إليه.', mark: '1.0' },
					{ target: 'سُنَّةٌ', irab: 'مبتدأ مؤخر وجوبا مرفوع وعلامة رفعه الضمة الظاهرة.', mark: '1.0' }
				],
				extraQ: 'ما الزحاف العروضي الذي دخل التفعيلات الأولى في هذا البيت؟ وما الدليل القاطع أنه من الكامل لا من الرجز؟',
				extraA: 'الزحاف هو الإضمار (تسكين الثاني المتحرك فصارت مُتَفَاعِلُنْ مُتْفَاعِلُنْ)، والدليل القاطع أنه من الكامل ظهور «مُتَفَاعِلُنْ» (|||ه||ه) في عجز البيت.',
				mcqQ: 'ما البحر الشعري لقول لبيد رضي الله عنه: «مِنْ مَعْشَرٍ سَنَّتْ لَهُمْ آبَاؤُهُمْ ... وَلِكُلِّ قَوْمٍ سُنَّةٌ وَإِمَامُهَا»؟',
				mcqCorrect: 'بحر الكامل التام (لظهور تفعيلة مُتَفَاعِلُنْ |||ه||ه)',
				mcqDistractors: [
					{ text: 'بحر الرجز التام', diagnosticFeedback: 'ظهور مُتَفَاعِلُنْ (|||ه||ه) في العجز يقطع بأنه الكامل لا الرجز.' },
					{ text: 'بحر الوافر التام', diagnosticFeedback: 'الوافر يختم بـ فعولن.' },
					{ text: 'بحر البسيط التام', diagnosticFeedback: 'البسيط من أربع تفعيلات ممزوجة.' }
				]
			},
			{
				verseSadr: 'مَنْ يَطْلُبِ الْعَلْيَاءَ يَصْبِرْ لِلْعَنَا',
				verseAjuz: 'وَمَنْ يَزُرْ أَهْلَ التُّقَى نَالَ الْمُنَى',
				arudWriting: 'مَنْ يَطْلُبِلْ عَلْيَاءَ يَصْ بِرْ لِلْعَنَا — وَمَنْ يَزُرْ أَهْلَتْتُقَى نَالَلْمُنَى',
				symbols: '|ه|ه||ه |ه|ه||ه |ه|ه||ه — ||ه||ه |ه|ه||ه |ه|ه||ه',
				tafilat: 'مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ — مُتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ',
				meterName: 'بحر الرجز التام',
				irabEntries: [
					{ target: 'يَطْلُبِ', irab: 'فعل مضارع فعل الشرط مجزوم بـ «مَنْ» وعلامة جزمه السكون وحرّك بالكسر لالتقاء الساكنين.', mark: '1.0' },
					{ target: 'يَصْبِرْ', irab: 'فعل مضارع جواب الشرط مجزوم وعلامة جزمه السكون الظاهر.', mark: '1.0' }
				],
				extraQ: 'ما الدليل العروضي القاطع على أن هذا البيت من بحر الرجز لا من بحر الكامل؟ وما المحسن البديعي بين العنا والمنى؟',
				extraA: 'الدليل القاطع ظهور تفعيلة «مُتَفْعِلُنْ» (||ه||ه) المخبونة في أول العجز وهي خاصة بالرجز. وبين «العنا» و«المنى» تصريع وجناس ناقص يعطي جرسا موسيقيا.',
				mcqQ: 'شطر بيت تقطيعه «مُتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ» ينتمي قطعا إلى:',
				mcqCorrect: 'بحر الرجز التام (لظهور مُتَفْعِلُنْ ||ه||ه)',
				mcqDistractors: [
					{ text: 'بحر الكامل التام', diagnosticFeedback: '«مُتَفْعِلُنْ» (||ه||ه) لا ترد في الكامل أبدا.' },
					{ text: 'بحر المتقارب التام', diagnosticFeedback: 'المتقارب تفعيلته فعولن.' },
					{ text: 'بحر الطويل', diagnosticFeedback: 'الطويل تفعيلاته فعولن مفاعيلن.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			buildArudScansionBlock({
				verseSadr: variant.verseSadr,
				verseAjuz: variant.verseAjuz,
				arudWriting: variant.arudWriting,
				symbols: variant.symbols,
				tafilat: variant.tafilat,
				meterName: variant.meterName,
				mark: '2.5'
			}),
			{ type: 'text', content: '2) أعرب الكلمتين المحددتين من البيت السابق:' },
			buildIrabTableBlock(variant.irabEntries),
			{
				type: 'text',
				content: `3) ${variant.extraQ}`,
				answer: `3) ${variant.extraA}`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة العروضية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `التفعيلات: ${variant.tafilat}، فهو من ${variant.meterName}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي (مع العروض)',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة العروض والإعراب الآتية بدقة:',
				content
			},
			hints: [
				'فكّ المدّ «آ» إلى همزة متحركة وألف ساكنة «أَا».',
				'تفعيلة «مُتَفَاعِلُنْ» (|||ه||ه) دليل قاطع على بحر الكامل.',
				'تفعيلة «مُتَفْعِلُنْ» (||ه||ه) دليل قاطع على بحر الرجز.'
			],
			solutionStepsAr: [
				`الكتابة العروضية: ${variant.arudWriting}`,
				`الرموز: ${variant.symbols}`,
				`التفعيلات: ${variant.tafilat} (${variant.meterName})`
			],
			finalAnswer: variant.meterName
		};
	}
};

// 4. التقييم النقدي (4 ن) — أثر القرآن الكريم والإسلام في الشعر
const tpl1asTclT2NaqdAtharIslamShiirCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t2_naqd_athar_islam_shiir_ce',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — أثر القرآن الكريم والإسلام في تهذيب الشعر وتجديده',
	curriculumLessonId: 'arb_lesson_1as_tcl_t2_quran_shiir_dawa',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'أحدث الإسلام والقرآن الكريم تحوّلا عميقا في مسيرة الشعر العربي. المطلوب: بيّن موقف الإسلام الصحيح من الشعر، ثم اشرح ثلاثة مظاهر للتجديد الذي أحدثه القرآن الكريم في الشعر (اللغة، المعاني، الأغراض) مستشهدا بأعلام شعراء الصحابة رضي الله عنهم.',
				answer:
					'1) موقف الإسلام من الشعر (1.5 ن): لم يحرّم الإسلام الشعر لذاته، بل هذّبه فرفض شعر الفحش والكذب والعصبية القبلية، وشجّع الشعر الهادف المدافع عن العقيدة والأخلاق.\n2) مظاهر التجديد (2.5 ن):\n- في اللغة والألفاظ: رقة الألفاظ وسلاستها وإثراء المعجم بمصطلحات إسلامية (الهدى، الفتح، التقوى، الجزاء).\n- في المعاني: الاقتباس من القرآن والحديث وصدق العاطفة الإيمانية ونبذ العصبية.\n- في الأغراض: ازدهار شعر الدعوة والمديح النبوي وشعر الفتوح عند حسان بن ثابت وعبد الله بن رواحة وكعب بن زهير رضي الله عنهم.',
				mcqQ: 'ما الموقف الدقيق للإسلام من الشعر في عصر صدر الإسلام؟',
				mcqCorrect: 'هذّبه ووجّهه؛ فأقرّ الشعر الملتزم بالحق والأخلاق وذمّ شعر الفحش والعصبية',
				mcqDistractors: [
					{ text: 'حرّم قول الشعر في جميع الأغراض مطلقا', diagnosticFeedback: 'النبي صلى الله عليه وسلم استمع لكعب وحسان وابن رواحة وأثنى عليهم.' },
					{ text: 'أقرّ الهجاء القبلي الجاهلي كما كان', diagnosticFeedback: 'الإسلام نبذ العصبية والهجاء المذموم.' },
					{ text: 'لم يُحدث أي تغيير في ألفاظ الشعر ومعانيه', diagnosticFeedback: 'أحدث تغييرا عميقا في المعجم والمعاني والأغراض.' }
				]
			},
			{
				prompt: 'يزعم بعض الدارسين أن الشعر ضعف في عصر صدر الإسلام. المطلوب: فنّد هذا الزعم في فقرة نقدية منظمة، مبرزا دور شعراء الدعوة والفتوح وخصائص شعرهم مع التمثيل بشاهد من شعر الصحابة رضي الله عنهم.',
				answer:
					'1) تفنيد الزعم (1.5 ن): لم يضعف الشعر في صدر الإسلام، بل تراجعت الأغراض الجاهلية المذمومة وارتقى الشعر ليصبح سلاحا إعلاميا وأخلاقيا في نصرة الدعوة والفتوح.\n2) دور شعراء الدعوة وخصائصهم (2.5 ن): دافع حسان بن ثابت وعبد الله بن رواحة وكعب بن مالك وكعب بن زهير رضي الله عنهم عن النبي صلى الله عليه وسلم، وامتاز شعرهم بسلاسة اللفظ وصدق الإيمان والاقتباس القرآني؛ مثل قول كعب رضي الله عنه: «إن الرسول لنور يستضاء به ... مهند من سيوف الله مسلول».',
				mcqQ: 'كيف يردّ النقد الأدبي المنصف على دعوى «ضعف الشعر في صدر الإسلام»؟',
				mcqCorrect: 'الشعر لم يضعف بل تهذّب وارتقت أغراضه إلى الدعوة والمديح النبوي والفتوح',
				mcqDistractors: [
					{ text: 'لم يقل الصحابة أي قصيدة شعرية بعد الهجرة', diagnosticFeedback: 'بل خلّف حسان وكعب وابن رواحة دواوين وأشعارا خالدة.' },
					{ text: 'الشعر صار كله نثرا مسجوعا', diagnosticFeedback: 'الشعر بقي شعرا موزونا على البحور العربية.' },
					{ text: 'تراجع الشعر بسبب جهل العرب باللغة', diagnosticFeedback: 'عصر صدر الإسلام هو ذروة الفصاحة العربية.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `السؤال النقدي: ${variant.prompt}`,
				answer: `عناصر الإجابة النموذجية (4 ن):\n${variant.answer}`,
				mark: '4.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الحكم النقدي الصائب:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'ثالثا: التقييم النقدي',
				points: this.defaultPoints,
				instruction: 'أجب عن سؤال التقييم النقدي الآتي بمنهجية واضحة وشواهد صحيحة:',
				content
			},
			hints: [
				'ميّز بين موقف الإسلام من الشعر الهادف وموقفه من شعر الغواية والعصبية.',
				'نظّم مظاهر التجديد في ثلاثة محاور: اللغة، المعاني، والأغراض.',
				'استشهد ببيت صحيح من شعر حسان أو كعب أو عبد الله بن رواحة رضي الله عنهم.'
			],
			solutionStepsAr: [variant.answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. التقييم النقدي (4 ن) — الخطابة في عصر صدر الإسلام
const tpl1asTclT2NaqdKhatabaIslamCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t2_naqd_khataba_islam_ce',
	grade: '1as_tcl',
	trimesterId: 't2',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — ازدهار الخطابة في صدر الإسلام وبنيتها وخصائصها',
	curriculumLessonId: 'arb_lesson_1as_tcl_t2_khataba_taqyim_naqdi',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'بلغت الخطابة ذروتها في عصر صدر الإسلام فصارت أداة الدعوة والسياسة والجهاد. المطلوب: اذكر أربعة عوامل لازدهار الخطابة في هذا العصر، ثم بيّن بنيتها الفنية وأبرز خصائصها الأسلوبية مع التمثيل من خطب الخلفاء الراشدين رضي الله عنهم.',
				answer:
					'1) عوامل الازدهار (1.5 ن): نشر الدعوة الإسلامية، ارتباطها بالشعائر (الجمعة، العيدان، الحج)، تنظيم شؤون الدولة والخلافة والشورى، وتحميس الجند في الفتوح.\n2) البنية والخصائص (2.5 ن): تبدأ بالتحميد والصلاة على النبي و«أما بعد» ثم العرض ثم الخاتمة والدعاء؛ وتمتاز بالإيجاز، والاقتباس من القرآن، ووضوح الألفاظ، وقوة الإقناع والمقابلة، كخطبة أبي بكر الصديق رضي الله عنه: «الصدق أمانة والكذب خيانة».',
				mcqQ: 'أيّ عنصر يُعدّ جزءا أصيلا من بنية الخطبة الإسلامية في صدر الإسلام؟',
				mcqCorrect: 'الاستهلال بحمد الله والصلاة على رسوله و«أما بعد» ثم عرض الحجج ثم الختام بالدعاء',
				mcqDistractors: [
					{ text: 'البدء بالوقوف على الأطلال', diagnosticFeedback: 'الوقوف على الأطلال خاص ببعض القصائد لا بالخطابة الإسلامية.' },
					{ text: 'الالتزام بالقافية الموحدة والوزن العروضي', diagnosticFeedback: 'الخطبة فن نثري غير موزون.' },
					{ text: 'خلوّها التام من الاقتباس القرآني', diagnosticFeedback: 'الخطبة الخالية من القرآن سُميت شوهاء لنقصها.' }
				]
			},
			{
				prompt: 'طبع القرآن الكريم خطابة صدر الإسلام بطابع فكري وفني متميز. المطلوب: قارن بإيجاز بين الخطابة في العصر الجاهلي والخطابة في صدر الإسلام من حيث الاستهلال والمضمون والأسلوب، مع ذكر مثالين من أعلامها.',
				answer:
					'1) الاستهلال والمضمون (2.0 ن): أصبحت الخطبة الإسلامية تُفتتح بالحمد والشهادة والصلاة على النبي و«أما بعد»، وتحوّل مضمونها من المفاخرات القبلية إلى الدعوة والتقوى والعدل والشورى والجهاد في سبيل الله.\n2) الأسلوب والأعلام (2.0 ن): تخلصت من سجع الكهان وتزينت بنور القرآن والإيجاز والمقابلة؛ ومن أعظم أعلامها بعد النبي صلى الله عليه وسلم الخلفاء الراشدون: أبو بكر الصديق، وعمر بن الخطاب، وعثمان بن عفان، وعلي بن أبي طالب رضي الله عنهم.',
				mcqQ: 'بمَ تميّز أسلوب الخطابة في صدر الإسلام عن سجع الكهان القديم؟',
				mcqCorrect: 'بالوضوح والصدق والإيجاز والاقتباس القرآني والبعد عن الغموض والتكلف',
				mcqDistractors: [
					{ text: 'بالغموض والإلغاز واستخدام الألفاظ الوحشية', diagnosticFeedback: 'بل تخلصت الخطابة الإسلامية من الغموض والسجع المتكلف.' },
					{ text: 'بالتطويل الممل وتكرار الكلام', diagnosticFeedback: 'امتازت خطب صدر الإسلام بالإيجاز الشديد.' },
					{ text: 'بغياب أساليب النداء والأمر', diagnosticFeedback: 'كثرت فيها أساليب النداء والأمر لتوجيه الجمهور.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `السؤال النقدي: ${variant.prompt}`,
				answer: `عناصر الإجابة النموذجية (4 ن):\n${variant.answer}`,
				mark: '4.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة النقدية الصحيحة:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'ثالثا: التقييم النقدي',
				points: this.defaultPoints,
				instruction: 'أجب عن سؤال التقييم النقدي الآتي في فقرة مركزة ومنظمة:',
				content
			},
			hints: [
				'اربط ازدهار الخطابة بالجمعة والعيدين والدعوة والسياسة الراشدة والفتوح.',
				'اذكر أجزاء الخطبة الإسلامية الثلاثة: المقدمة، العرض، والخاتمة.',
				'استشهد بقبس من خطبة أبي بكر أو عمر رضي الله عنهما.'
			],
			solutionStepsAr: [variant.answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T2: ArabicParameterizedTemplate[] = [
	tpl1asTclT2ShiirDawaIb,
	tpl1asTclT2NawasikhIstiaraLb,
	tpl1asTclT2ArudKamilRajazLb,
	tpl1asTclT2NaqdAtharIslamShiirCe,
	tpl1asTclT2NaqdKhatabaIslamCe
];
