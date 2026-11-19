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
// 5 Parameterized ONEC Templates — 1AS TCL Trimester 1 (10 + 6 + 4 = 20)
// (1 intellectual_building [10pts], 2 linguistic_building [6pts, 1 with العروض], 2 critical_evaluation [4pts])
// ============================================================================

// 1. البناء الفكري (10 ن) — السند الشعري من شعر الصحابة المخضرمين
const tpl1asTclT1QiyamMukhadramIb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t1_qiyam_mukhadram_ib',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري — الكرم والعدل والحكمة في شعر الصحابة المخضرمين',
	curriculumLessonId: 'arb_lesson_1as_tcl_t1_shiir_qadim_qiyam',
	defaultPoints: 10,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'في الكرم والعدل والقناعة',
				author: 'لبيد بن ربيعة العامري رضي الله عنه',
				source: 'معلقة لبيد بن ربيعة',
				verses: [
					['إِنَّا إِذَا الْتَقَتِ الْمَجَامِعُ [[لَمْ يَزَلْ]]', 'مِنَّا لِزَازُ عَظِيمَةٍ جَشَّامُهَا'],
					['وَمُقَسِّمٌ يُعْطِي الْعَشِيرَةَ حَقَّهَا', 'وَمُغَذْمِرٌ لِحُقُوقِهَا هَضَّامُهَا'],
					['فَضْلًا وَذُو كَرَمٍ ((يُعِينُ عَلَى النَّدَى))', 'سَمْحٌ كَسُوبُ رَغَائِبٍ غَنَّامُهَا'],
					['مِنْ مَعْشَرٍ سَنَّتْ لَهُمْ آبَاؤُهُمْ', 'وَلِكُلِّ قَوْمٍ [[سُنَّةٌ]] وَإِمَامُهَا'],
					['لَا يَطْبَعُونَ وَلَا يَبُورُ فَعَالُهُمْ', 'إِذْ لَا يَمِيلُ مَعَ الْهَوَى أَحْلَامُهَا'],
					['فَاقْنَعْ بِمَا قَسَمَ الْمَلِيكُ فَإِنَّمَا', 'قَسَمَ الْخَلَائِقَ بَيْنَنَا عَلَّامُهَا']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'لزاز عظيمة', meaning: 'قادر على حل الأمور الصعبة' },
					{ word: 'الندى', meaning: 'الكرم والجود' },
					{ word: 'لا يطبعون', meaning: 'لا يدنّس عرضهم بعيب' },
					{ word: 'أحلامها', meaning: 'عقولها الراجحة' }
				],
				theme: 'تمجيد قيم العدل والكرم ورجاحة العقل والقناعة بقسمة الله في المجتمع العربي القديم',
				q1: 'بمَ افتخر الشاعر في الأبيات الثلاثة الأولى؟ وما القيم الاجتماعية التي تبرز فيها؟',
				a1: 'افتخر بقدرة قومه على التصدي للأمور الجسام، والعدل في إعطاء الحقوق، والكرم الواسع والسماحة؛ وتبرز قيم القيادة العادلة، والنجدة، والبذل، وإصلاح ذات البين.',
				q2: 'لماذا لا تفسد أفعال القوم الممدوحين في البيت الخامس؟ وما الحكمة التي ختم بها الشاعر الأبيات؟',
				a2: 'لأن عقولهم (أحلامهم) راجحة متزنة لا تميل مع الهوى. وختم بالحكمة الداعية إلى القناعة والرضا بما قسمه الله العليم الحكيم بين العباد.',
				q3: 'استخرج من الأبيات مؤشرين على «وحدة البيت» وخاصية لغوية من خصائص الشعر القديم.',
				a3: 'يستقل البيت السادس بحكمة عامة (فاقنع بما قسم المليك...) كما يستقل الرابع بقاعدة اجتماعية (ولكل قوم سنة وإمامها) دون توقف على غيرهما، وتبرز جزالة الألفاظ وفصاحتها (لزاز، جشامها، أحلامها).',
				q4: 'ما النمط الغالب على النص؟ اذكر مؤشرين له مع التمثيل من الأبيات.',
				a4: 'النمط الغالب هو الوصفي (مع نزعة توجيهية في البيت الأخير)؛ ومن مؤشراته: كثرة النعوت والصفات الدالة على الأخلاق (مقسم، ذو كرم، سمح، كسوب)، وتوظيف الأفعال المضارعة الدالة على الاستمرار (يعطي، يعين، لا يطبعون).',
				q5: 'لخّص مضمون الأبيات في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يفخر الصحابي لبيد بن ربيعة رضي الله عنه بمكارم قومه الذين يتولون العظائم ويقيمون العدل ويبذلون الكرم بسماحة، سائرين على سنن شريفة تحمي أفعالهم من الفساد لرجاحة عقولهم وبعدهم عن الهوى، ثم يختم بحكمة سامية تدعو إلى القناعة بقسمة الله العليم.',
				mcqCorrect: 'تمجيد العدل والكرم ورجاحة العقل وختم ذلك بالحكمة والدعوة إلى القناعة',
				mcqDistractors: [
					{ text: 'وصف الرحلة في الصحراء ومعاناة السفر', diagnosticFeedback: 'محور الأبيات هو الأخلاق الاجتماعية والحكمة لا وصف الرحلة.' },
					{ text: 'الهجاء اللاذع للقبائل المجاورة', diagnosticFeedback: 'النص فخر نبيل بالأخلاق وحكمة خالصة خالٍ من الهجاء.' },
					{ text: 'الدعوة إلى اتباع الهوى والتفاخر بالظلم', diagnosticFeedback: 'الشاعر أثنى صراحة على عدم ميل العقول مع الهوى.' }
				]
			},
			{
				title: 'الحلم المتوازن والحكمة في الشعر القديم',
				author: 'النابغة الجعدي رضي الله عنه',
				source: 'ديوان النابغة الجعدي',
				verses: [
					['أَتَيْتُ رَسُولَ اللَّهِ إِذْ جَاءَ بِالْهُدَى', '((وَيَتْلُو كِتَابًا كَالْمَجَرَّةِ نَيِّرَا))'],
					['بَلَغْنَا السَّمَاءَ [[مَجْدُنَا]] وَجُدُودُنَا', 'وَإِنَّا لَنَرْجُو فَوْقَ ذَلِكَ مَظْهَرَا'],
					['وَلَا خَيْرَ فِي حِلْمٍ إِذَا [[لَمْ يَكُنْ]] لَهُ', 'بَوَادِرُ تَحْمِي صَفْوَهُ أَنْ يُكَدَّرَا'],
					['وَلَا خَيْرَ فِي جَهْلٍ إِذَا لَمْ يَكُنْ لَهُ', 'حَلِيمٌ إِذَا مَا أَوْرَدَ الأَمْرَ أَصْدَرَا']
				] as Array<[string, string]>,
				vocabulary: [
					{ word: 'المجرة', meaning: 'مجموعة النجوم المضيئة في السماء' },
					{ word: 'مظهرا', meaning: 'مرتقى وعلوا (ويقصد به الجنة)' },
					{ word: 'بوادر', meaning: 'هيبة وقوة تردع المعتدي' },
					{ word: 'أورد وأصدر', meaning: 'عالج الأمر من بدايته إلى نهايته' }
				],
				theme: 'الجمع بين الإقبال على هدى الرسالة النبوية والحكمة في التوازن بين الحلم والحزم',
				q1: 'ما المناسبة الإيمانية التي يُعلنها الشاعر في البيت الأول؟ وبمَ شبّه القرآن الكريم؟',
				a1: 'أعلن قدومه مسلما إلى رسول الله صلى الله عليه وسلم حين جاء بالهدى، وشبّه كتاب الله بالمجرة النيرة المضيئة لشدة وضوحه وهدايته للناس.',
				q2: 'اشرح العلاقة المتوازنة بين «الحلم» و«القوة» كما يراها الشاعر في البيتين الثالث والرابع.',
				a2: 'يرى الشاعر أن الحلم لا يثمر خيرا إلا إذا سندته هيبة وقوة تحميه من استغلال المعتدين، وأن الحمية والاندفاع لا يصلحان إلا إذا ضبطهما حليم عاقل يحسن تدبير الأمور.',
				q3: 'بمَ تبرز شخصية الشاعر المخضرم في هذا النص من خلال المزج بين الأصالة القديمة والقيم الإسلامية؟',
				a3: 'حافظ على جزالة اللفظ وعلو الهمة والحكمة العربية الأصيلة، وارتقى بطموحه من مجرد المجد الدنيوي إلى رجاء الجنة والاهتداء بكتاب الله ورسوله صلى الله عليه وسلم.',
				q4: 'ما النمط الغالب على البيتين الثالث والرابع؟ اذكر مؤشرين له مع التمثيل.',
				a4: 'النمط الغالب هو الحجاجي التقريري؛ ومن مؤشراته: أسلوب النفي الجازم للتعميم (ولا خير في حلم... ولا خير في جهل...)، وأداة الشرط للتعليل والتقييد (إذا لم يكن له...)، والمقابلة والتضاد (حلم/جهل، أورد/أصدرا).',
				q5: 'لخّص مضمون الأبيات الأربعة في فقرة موجزة بأسلوبك الخاص.',
				a5: 'يعلن الصحابي النابغة الجعدي رضي الله عنه إقباله على رسول الله صلى الله عليه وسلم وكتابه المضيء بالهدى، راجيا بعلو همته الفوز بالجنة، ثم يقدّم حكمة بليغة تؤكد أن الحلم المحمود ما حمته الهيبة، وأن الاندفاع يحتاج دائما إلى عاقل حليم يحسن إدارة الأمور.',
				mcqCorrect: 'الاهتداء برسالة النبي صلى الله عليه وسلم وتقرير حكمة التوازن بين الحلم والحزم',
				mcqDistractors: [
					{ text: 'مدح الطيش والغضب دون عقل', diagnosticFeedback: 'الشاعر اشترط للحمية وجود حليم يضبطها ويدبرها.' },
					{ text: 'الاكتفاء بالفخر الدنيوي وترك الآخرة', diagnosticFeedback: 'قال صراحة «وإنا لنرجو فوق ذلك مظهرا» أي الجنة.' },
					{ text: 'وصف الطبيعة والنجوم بمعزل عن الإنسان', diagnosticFeedback: 'ذُكرت المجرة لتشبيه إشراق كتاب الله وهداه.' }
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `في قصيدة «${variant.title}» لـ ${variant.author}، ما الفكرة العامة الأدق؟`,
				questionTextAr: 'اختر الإجابة الصحيحة:',
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
				'استعن بشرح المفردات لفهم التراكيب القديمة بدقة.',
				'بيّن دائما العلاقة بين معاني النص والقيم الخلقية للمجتمع القديم.',
				'أعطِ لكل مؤشر نمط مثالا حرفيا قصيرا من الأبيات.'
			],
			solutionStepsAr: [variant.a1, variant.a2, variant.a3, variant.a4, variant.a5],
			finalAnswer: variant.theme
		};
	}
};

// 2. البناء اللغوي (6 ن) — الإعراب + التشبيه البليغ والكناية
const tpl1asTclT1IrabBalaghaLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t1_irab_balagha_lb',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي — بناء الأفعال وإعراب المضارع والتشبيه البليغ والكناية',
	curriculumLessonId: 'arb_lesson_1as_tcl_t1_bina_irab_afal',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				sentence: '«بَلِينا وما تَبلى النجومُ الطوالعُ، ولم يَزَلْ أهلُ الفضلِ يَسعون للخير.»',
				entries: [
					{
						target: 'بَلِينا',
						irab: 'فعل ماض مبني على السكون لاتصاله بـ نا الفاعلين، و«نا» ضمير متصل في محل رفع فاعل.',
						mark: '1.0'
					},
					{
						target: 'تَبلى',
						irab: 'فعل مضارع مرفوع وعلامة رفعه الضمة المقدرة على الألف منع من ظهورها التعذر.',
						mark: '1.0'
					},
					{
						target: 'يَزَلْ',
						irab: 'فعل مضارع ناقص مجزوم بـ «لم» وعلامة جزمه السكون الظاهر على آخره.',
						mark: '1.0'
					}
				],
				balaghaPrompt: 'اشرح الصورة البيانية وبيّن نوعها وأثرها في: «طويل النجاد، رفيع العماد، كثير الرماد» (الخنساء رضي الله عنها).',
				balaghaAnswer: 'كنايات عن صفات نبيلة: «طويل النجاد» كناية عن طول القامة والشجاعة، و«رفيع العماد» كناية عن السيادة والشرف، و«كثير الرماد» كناية عن الكرم. أثرها: الإتيان بالمعنى مصحوبا بالدليل في إيجاز وتجسيم.',
				mcqQ: 'ما علامة إعراب الفعل «تَبلى» في قول لبيد رضي الله عنه: «وما تبلى النجومُ الطوالعُ»؟',
				mcqCorrect: 'مرفوع وعلامة رفعه الضمة المقدرة على الألف للتعذر',
				mcqDistractors: [
					{ text: 'مجزوم بحذف حرف العلة', diagnosticFeedback: '«ما» هنا نافية غير جازمة وبقيت الألف في آخر الفعل.' },
					{ text: 'مرفوع بالضمة المقدرة للثقل', diagnosticFeedback: 'الألف يُقدّر عليها للتعذر، أما الواو والياء فللثقل.' },
					{ text: 'منصوب بالفتحة الظاهرة', diagnosticFeedback: 'لم يسبقه ناصب.' }
				]
			},
			{
				sentence: '«لا يَطْبَعونَ ولا يَميلُ مع الهوى عقلٌ، ولن يَضيعَ برٌّ عند الله.»',
				entries: [
					{
						target: 'يَطْبَعونَ',
						irab: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، وواو الجماعة فاعل.',
						mark: '1.0'
					},
					{
						target: 'يَميلُ',
						irab: 'فعل مضارع مرفوع وعلامة رفعه الضمة الظاهرة على آخره (لا نافية غير عاملة).',
						mark: '1.0'
					},
					{
						target: 'يَضيعَ',
						irab: 'فعل مضارع منصوب بـ «لن» وعلامة نصبه الفتحة الظاهرة على آخره.',
						mark: '1.0'
					}
				],
				balaghaPrompt: 'اشرح الصورة البيانية وبيّن نوعها وأثرها في: «وما المالُ إلّا عارياتٌ ودائعُ» (لبيد رضي الله عنه).',
				balaghaAnswer: 'تشبيه بليغ؛ شبّه المال (مشبه) بالعاريات والودائع (مشبه به) وحذف الأداة ووجه الشبه. أثره: توضيح سرعة زوال المال والمبالغة في عدم دوامه لصاحبه.',
				mcqQ: 'ما إعراب الفعل «يَطْبَعونَ» في قول لبيد: «لا يطبعون ولا يبور فعالهم»؟',
				mcqCorrect: 'فعل مضارع مرفوع بثبوت النون لأن «لا» نافية غير عاملة',
				mcqDistractors: [
					{ text: 'فعل مضارع مجزوم بـ لا الناهية', diagnosticFeedback: '«لا» هنا تنفي العيب عنهم ولا تنهى، والنون ثابتة.' },
					{ text: 'فعل ماض مبني على الضم', diagnosticFeedback: 'هو فعل مضارع من الأفعال الخمسة.' },
					{ text: 'فعل مضارع منصوب', diagnosticFeedback: 'لم تسبقه أداة نصب.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{ type: 'text', content: `1) أعرب الأفعال المحددة في العبارة الآتية: ${variant.sentence}` },
			buildIrabTableBlock(variant.entries),
			{
				type: 'text',
				content: `2) ${variant.balaghaPrompt}`,
				answer: `2) ${variant.balaghaAnswer}`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: '3) ابنِ الفعل «يَسْعَى» على السكون مرة في جملة مفيدة، واجزمه مرة أخرى.',
				answer: '3) مبني على السكون: «المؤمناتُ يَسْعَيْنَ إلى الخيرِ». مجزوم: «لم يَسْعَ العاقلُ إلى الفتنةِ».',
				mark: '1.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإعراب الأدق:',
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
				instruction: 'أجب عن أسئلة البناء اللغوي الآتية بدقة وإيجاز:',
				content
			},
			hints: [
				'فرّق بين «لا النافية» غير العاملة و«لا الناهية» الجازمة.',
				'قدّر الضمة على الألف للتعذر وعلى الواو والياء للثقل.',
				'اذكر في الصورة البيانية: التسمية، الشرح، والأثر البلاغي.'
			],
			solutionStepsAr: [...variant.entries.map((e) => `${e.target}: ${e.irab}`), variant.balaghaAnswer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 3. البناء اللغوي (6 ن) مع العروض (بحرا الوافر والمتقارب!)
const tpl1asTclT1ArudWafirMutaqaribLb: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t1_arud_wafir_mutaqarib_lb',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'prosody_arud',
	titleAr: 'البناء اللغوي — الإعراب والصورة البيانية والتقطيع العروضي (الوافر والمتقارب)',
	curriculumLessonId: 'arb_lesson_1as_tcl_t1_arud_wafir_mutaqarib',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				verseSadr: 'لِسَانِي صَارِمٌ لَا عَيْبَ فِيهِ',
				verseAjuz: 'وَبَحْرِي لَا تُكَدِّرُهُ الدِّلَاءُ',
				arudWriting: 'لِسَانِي صَارِمُنْ لَا عَيْبَ فِيهِي — وَبَحْرِي لَا تُكَدْدِرُهُدْ دِلَاءُو',
				symbols: '||ه|ه|ه ||ه|ه|ه ||ه|ه — ||ه|ه|ه ||ه|||ه ||ه|ه',
				tafilat: 'مُفَاعَلْتُنْ مُفَاعَلْتُنْ فَعُولُنْ — مُفَاعَلْتُنْ مُفَاعَلَتُنْ فَعُولُنْ',
				meterName: 'بحر الوافر التام',
				irabEntries: [
					{ target: 'صَارِمٌ', irab: 'خبر مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' },
					{ target: 'الدِّلَاءُ', irab: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.', mark: '1.0' }
				],
				balaghaQ: 'اشرح التشبيه البليغ في صدر البيت السابق مبيّنا أثره في المعنى.',
				balaghaA: '«لساني صارم»: تشبيه بليغ شبّه لسانه بالسيف القاطع وحذف الأداة ووجه الشبه، أثره توضيح حدة شعره وقوة حجته في نصرة الحق.',
				mcqQ: 'ما البحر الشعري لقول حسان بن ثابت رضي الله عنه: «لِسَانِي صَارِمٌ لَا عَيْبَ فِيهِ ... وَبَحْرِي لَا تُكَدِّرُهُ الدِّلَاءُ»؟',
				mcqCorrect: 'بحر الوافر التام (مُفَاعَلَتُنْ مُفَاعَلَتُنْ فَعُولُنْ)',
				mcqDistractors: [
					{ text: 'بحر المتقارب (فَعُولُنْ أربع مرات)', diagnosticFeedback: 'التقطيع يعطي مفاعلْتن مفاعلتن فعولن وهو بحر الوافر.' },
					{ text: 'بحر الرجز (مُسْتَفْعِلُنْ ثلاث مرات)', diagnosticFeedback: 'البداية ||ه|ه|ه هي مفاعلْتن لا مستفعلن.' },
					{ text: 'بحر الطويل', diagnosticFeedback: 'البيت من ثلاث تفعيلات في كل شطر لا أربع.' }
				]
			},
			{
				verseSadr: 'أَعَيْنَيَّ جُودَا وَلَا تَجْمُدَا',
				verseAjuz: 'أَلَا تَبْكِيَانِ لِصَخْرِ النَّدَى',
				arudWriting: 'أَعَيْنَيْيَ جُودَا وَلَا تَجْمُدَا — أَلَا تَبْكِيَانِ لِصَخْرِنْ نَدَا',
				symbols: '||ه|ه ||ه|ه ||ه|ه ||ه — ||ه|ه ||ه| ||ه|ه ||ه',
				tafilat: 'فَعُولُنْ فَعُولُنْ فَعُولُنْ فَعُو — فَعُولُنْ فَعُولُ فَعُولُنْ فَعُو',
				meterName: 'بحر المتقارب التام (عروضه وضربه محذوفان)',
				irabEntries: [
					{ target: 'تَجْمُدَا', irab: 'فعل مضارع مجزوم بـ لا الناهية وعلامة جزمه حذف النون، وألف الاثنين فاعل.', mark: '1.0' },
					{ target: 'تَبْكِيَانِ', irab: 'فعل مضارع مرفوع وعلامة رفعه ثبوت النون لأنه من الأفعال الخمسة، والألف فاعل.', mark: '1.0' }
				],
				balaghaQ: 'استخرج من البيت السابق صورة بيانية (أو كناية في «صخر الندى») واشرحها.',
				balaghaA: 'في «أعينيّ جودا» استعارة مكنية حيث شبّهت عينيها بشخصين تخاطبهما وتأمرهما بالجود، وأثرها التشخيص وإبراز شدة اللوعة؛ وفي «صخر الندى» إضافة دالة على اشتهاره بالكرم.',
				mcqQ: 'ما البحر الشعري لقول الخنساء رضي الله عنها: «أَعَيْنَيَّ جُودَا وَلَا تَجْمُدَا ... أَلَا تَبْكِيَانِ لِصَخْرِ النَّدَى»؟',
				mcqCorrect: 'بحر المتقارب (فَعُولُنْ فَعُولُنْ فَعُولُنْ فَعُو)',
				mcqDistractors: [
					{ text: 'بحر الوافر', diagnosticFeedback: 'تكررت تفعيلة «فعولن» أربع مرات في الشطر فهو المتقارب.' },
					{ text: 'بحر الكامل', diagnosticFeedback: 'الكامل تفعيلته متفاعلن.' },
					{ text: 'بحر البسيط', diagnosticFeedback: 'البسيط تفعيلاته مستفعلن فاعلن.' }
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
				content: `3) ${variant.balaghaQ}`,
				answer: `3) ${variant.balaghaA}`,
				mark: '1.5'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر البحر الشعري الصحيح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تفعيلات البيت: ${variant.tafilat}، فهو من ${variant.meterName}.`
			},
			sujetExercise: {
				customTitle: 'ثانيا: البناء اللغوي (مع العروض)',
				points: this.defaultPoints,
				instruction: 'أجب عن أسئلة العروض والإعراب والبلاغة الآتية:',
				content
			},
			hints: [
				'فكّ الإدغام واحذف اللام الشمسية واكتب التنوين نونا ساكنة قبل وضع الرموز.',
				'يرمز للحرف المتحرك بـ (|) وللحرف الساكن بـ (ه).',
				'الوافر: مفاعلتن مفاعلتن فعولن | المتقارب: فعولن أربع مرات.'
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

// 4. التقييم النقدي (4 ن) — القيم النبيلة والخصائص الفنية للشعر القديم
const tpl1asTclT1NaqdShiirQadimCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t1_naqd_biah_qadima_ce',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — القيم الاجتماعية والخصائص الفنية للشعر العربي القديم',
	curriculumLessonId: 'arb_lesson_1as_tcl_t1_shiir_qadim_qiyam',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'عكس الشعر العربي القديم مكارم الأخلاق التي حافظت عليها الفطرة السليمة وأقرّها الإسلام، كما تميز ببناء فني محكم. المطلوب: في فقرة منهجية موجزة، بيّن أبرز القيم الخلقية في الشعر القديم (مع التمثيل من شعر الصحابة المخضرمين)، ثم اذكر ثلاث خصائص فنية للقصيدة القديمة.',
				part1Answer:
					'القيم الخلقية: الكرم وإقراء الضيف (الخنساء رضي الله عنها)، العدل وإصلاح ذات البين والقناعة (لبيد بن ربيعة رضي الله عنه)، والحلم المتوازن (النابغة الجعدي رضي الله عنه)، والشجاعة والوفاء بالعهد.',
				part2Answer:
					'الخصائص الفنية: 1) جزالة الألفاظ ومتانة التراكيب وبعدها عن التكلف. 2) الاعتماد على وحدة البيت (استقلال كل بيت بمعناه) مع وحدة الوزن والقافية. 3) الصور البيانية الحسية المستمدة من بيئة البادية.',
				mcqQ: 'أيّ مجموعة تلخّص بدقة الخصائص الفنية للشعر العربي القديم في التقييم النقدي؟',
				mcqCorrect: 'جزالة الألفاظ، الصور الحسية المستمدة من البادية، وحدة البيت، والالتزام بعمود الشعر',
				mcqDistractors: [
					{ text: 'التحرر من الوزن والقافية وتوظيف الرموز الغامضة', diagnosticFeedback: 'هذه سمات الشعر الحديث الحر لا الشعر القديم.' },
					{ text: 'الإغراق في السجع النثري والمحسنات المتكلفة', diagnosticFeedback: 'الشعر القديم مطبوع بعيد عن التكلف البديعي.' },
					{ text: 'الاقتصار على الوحدة العضوية دون وحدة البيت', diagnosticFeedback: 'القصيدة القديمة تقوم أساسا على وحدة البيت.' }
				]
			},
			{
				prompt: 'مثّل الصحابة الشعراء المخضرمون جسرا أصيلا بين فصاحة العصر الجاهلي وهداية الإسلام. المطلوب: عرّف الشاعر المخضرم ذاكرا ثلاثة أعلام منه، ثم وضّح كيف جمع شعرهم بين جزالة البناء القديم وسموّ الحكمة والقيم.',
				part1Answer:
					'الشاعر المخضرم هو من عاش في الجاهلية وأدرك الإسلام فأسلم وحسن إسلامه، ومن أبرز أعلامه: لبيد بن ربيعة العامري، كعب بن زهير، حسان بن ثابت، الخنساء، والنابغة الجعدي رضي الله عنهم.',
				part2Answer:
					'جمع شعرهم بين متانة اللغة وفحولة التراكيب ووضوح الصور الحسية من جهة، وبين معاني الحكمة والاعتبار بزوال الدنيا والقناعة ومكارم الأخلاق من جهة أخرى (مثل قول لبيد: «ألا كل شيء ما خلا الله باطل»).',
				mcqQ: 'ما التعريف الأدبي الدقيق لـ «الشاعر المخضرم»؟',
				mcqCorrect: 'الشاعر الذي أدرك العصر الجاهلي ثم أدرك الإسلام وأسلم',
				mcqDistractors: [
					{ text: 'الشاعر الذي عاش في العصر الأموي فقط', diagnosticFeedback: 'الأمويون جاءوا بعد جيل المخضرمين.' },
					{ text: 'الشاعر الذي يكتب النثر فقط', diagnosticFeedback: 'المخضرمون من فحول الشعراء.' },
					{ text: 'الشاعر الذي نظم في العصر العباسي', diagnosticFeedback: 'العصر العباسي متأخر عن المخضرمين.' }
				]
			}
		]);

		const mcq = buildUniqueMcqOptions(variant.mcqCorrect, variant.mcqDistractors, rng);
		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `السؤال النقدي: ${variant.prompt}`,
				answer: `عناصر الإجابة النموذجية (4 ن):\n1) ${variant.part1Answer} (2.0 ن)\n2) ${variant.part2Answer} (2.0 ن)`,
				mark: '4.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الحكم النقدي الصحيح:',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.part2Answer
			},
			sujetExercise: {
				customTitle: 'ثالثا: التقييم النقدي',
				points: this.defaultPoints,
				instruction: 'أجب عن سؤال التقييم النقدي الآتي في فقرة مركزة ومنظمة مدعومة بالشواهد:',
				content
			},
			hints: [
				'ابدأ بجملة تمهيدية موجزة تربط الموضوع بعصره الأدبي.',
				'أجب عن شقي السؤال بوضوح (القيم/التعريف أولا، ثم الخصائص/التحليل).',
				'استشهد بأعلام الصحابة المخضرمين (لبيد، الخنساء، النابغة الجعدي، كعب، حسان رضي الله عنهم).'
			],
			solutionStepsAr: [variant.part1Answer, variant.part2Answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// 5. التقييم النقدي (4 ن) — فن الأمثال والحكم العربية
const tpl1asTclT1NaqdAmthalHikamCe: ArabicParameterizedTemplate = {
	id: 'arb_tpl_1as_tcl_t1_naqd_amthal_hikam_ce',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'literary_criticism',
	titleAr: 'التقييم النقدي — فن الأمثال والحكم العربية وخصائصهما الأسلوبية',
	curriculumLessonId: 'arb_lesson_1as_tcl_t1_amthal_hikam_naqd',
	defaultPoints: 4,
	onecRole: 'critical_evaluation',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				prompt: 'تُعدّ الأمثال والحكم أرقى نماذج النثر الموجز في العصر الجاهلي. المطلوب: فرّق بين المثل والحكمة مبيّنا مفهومي «المورد» و«المضرب»، ثم اذكر الخصائص الفنية الأربع التي ميّزت المثل العربي مع التمثيل.',
				answer:
					'1) الفرق والمورد والمضرب (2.0 ن): المثل قول موجز سائر له مورد (القصة أو المناسبة الأصلية التي قيل فيها أول مرة) ومضرب (كل موقف مشابه لاحق يُستشهد به فيه) ويُحفظ بلفظه؛ أما الحكمة فقول عقلي صائب يصدر عن ذوي التجربة دون اشتراط قصة مورد (مثل: آفة الرأي الهوى).\n2) الخصائص الأربع (2.0 ن): إيجاز اللفظ، إصابة المعنى، حسن التشبيه، وجودة الكناية؛ نحو: «إنك لا تجني من الشوك العنب» و«عند الصباح يحمد القوم السرى».',
				mcqQ: 'أيّ عبارة توضّح بدقة الفرق بين المثل والحكمة؟',
				mcqCorrect: 'المثل يرتبط بمورد أصلي ومضرب متجدد ولا يُغيَّر لفظه، أما الحكمة فقول عقلي صائب بلا شرط مورد',
				mcqDistractors: [
					{ text: 'الحكمة لها مورد قصصي دائما والمثل لا مورد له', diagnosticFeedback: 'العكس هو الصحيح؛ المورد شرط في المثل لا الحكمة.' },
					{ text: 'المثل يكون شعرا فقط والحكمة نثرا فقط', diagnosticFeedback: 'الأمثال نثرية في الأصل وقد تأتي الحكم شعرا أو نثرا.' },
					{ text: 'لا يوجد أي فرق بين المثل والحكمة', diagnosticFeedback: 'يختلفان في شرط المورد وثبات الصيغة اللفظية.' }
				]
			},
			{
				prompt: 'احتفظت اللغة العربية بذخيرة غنية من الأمثال والحكم عبر القرون. المطلوب: علّل سرّ بقاء الأمثال العربية وانتشارها على الألسنة، واذكر وظيفتها التربوية والحجاجية مع الاستشهاد بمثلين عربيين وبيان مضربهما.',
				answer:
					'1) سرّ البقاء والوظيفة (2.0 ن): بقيت الأمثال بفضل إيجازها الشديد وإصابتها للمعنى وجمال تصويرها وإيقاعها السهل، وتؤدي وظيفة تربوية وحجاجية تختصر البرهان وتقنع المخاطب سريعا.\n2) الشاهدان (2.0 ن): «سبق السيف العذل» (يُضرب لما فات ولا يُستدرك باللوم)، و«عند الصباح يحمد القوم السرى» (يُضرب لمن يصبر على مشقة العمل فيحمد عاقبة النجاح).',
				mcqQ: 'ما الوظيفة البلاغية والاجتماعية الأبرز للأمثال والحكم في الخطاب العربي؟',
				mcqCorrect: 'اختصار التجربة وإقناع المخاطب بسرعة وتقويم السلوك',
				mcqDistractors: [
					{ text: 'إطالة الكلام وإغراقه في الغموض', diagnosticFeedback: 'تقوم الأمثال على الإيجاز والوضوح.' },
					{ text: 'مخاطبة المتخصصين في العروض فقط', diagnosticFeedback: 'الأمثال متداولة بين الخاصة والعامة.' },
					{ text: 'استبدال النصوص الشرعية', diagnosticFeedback: 'الأمثال خلاصة تجارب إنسانية تخدم الموعظة ولا تستبدل الوحي.' }
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
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'critical_evaluation',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqQ,
				questionTextAr: 'اختر الإجابة النقدية الدقيقة:',
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
				instruction: 'أجب عن سؤال التقييم النقدي الآتي بإيجاز وتنظيم:',
				content
			},
			hints: [
				'استحضر الخصائص الأربع: إيجاز اللفظ، إصابة المعنى، حسن التشبيه، جودة الكناية.',
				'بيّن المورد والمضرب بوضوح عند الحديث عن المثل.',
				'دعّم إجابتك بمثل أو حكمة عربية أصيلة.'
			],
			solutionStepsAr: [variant.answer],
			finalAnswer: variant.mcqCorrect
		};
	}
};

export const TEMPLATES_1AS_TCL_T1: ArabicParameterizedTemplate[] = [
	tpl1asTclT1QiyamMukhadramIb,
	tpl1asTclT1IrabBalaghaLb,
	tpl1asTclT1ArudWafirMutaqaribLb,
	tpl1asTclT1NaqdShiirQadimCe,
	tpl1asTclT1NaqdAmthalHikamCe
];
