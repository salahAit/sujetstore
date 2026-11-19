import type {
	ArabicGeneratedExerciseInstance,
	ArabicParameterizedTemplate,
	Difficulty
} from '../../types';
import {
	buildIrabTableBlock,
	buildPoetryPassageBlock,
	buildProsePassageBlock,
	buildWrittenProductionBlock
} from '../../arabic-helpers';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. البناء الفكري BEM (نثري) — التكافل الاجتماعي ونبذ الآفات (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualSocialSolidarity4amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t1_intellectual_social_solidarity',
	grade: '4am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري (BEM): التكافل الاجتماعي ونبذ الآفات في نص نثري',
	curriculumLessonId: 'arb_lesson_4am_t1_namat_tafsiri_hijaji',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'الرحمةُ والتكافلُ قوامُ الأمة',
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				source: 'عيون البصائر',
				paragraphs: [
					'إنّ هذا [[التكافلَ]] الاجتماعيَّ ليسَ منّةً يمنّ بها الغنيُّ على الفقيرِ، بل هو فريضةٌ إنسانيةٌ ودينيةٌ ((تُقيمُ أودَ المجتمعِ)) وتصونُ كرامةَ الضعفاءِ. ولقد عُرفتْ أمتُنا منذُ صدرِ الإسلامِ بالتراحمِ والإيثارِ، فكانتِ القريةُ كلُّها أسرةً واحدةً يواسي فيها الجارُ جارَهُ عند الشدائدِ.',
					'غيرَ أنّ طغيانَ الأنانيةِ في عصرِنا أضعفَ هذهِ الروابطَ، وفتحَ البابَ أمام آفاتٍ خطيرةٍ كالتشرّدِ والتفككِ الأسريِّ. ولذلك لا بدّ للشبابِ الجزائريِّ أن يُحييَ روحَ التعاونِ والعملِ التطوّعيِّ، لأنّ الأمةَ التي تتضامنُ في السرّاءِ والضرّاءِ لا تنكسرُ أبداً.'
				],
				vocab: [
					{ word: 'منّةً', meaning: 'تفضّلاً يُؤذي الفقيرَ بالتذكيرِ به' },
					{ word: 'تُقيمُ أودَ', meaning: 'تُصلحُ اعوجاجَهُ وتحفظُ استقامتَهُ' }
				],
				generalIdea: 'إبراز مكانة التكافل الاجتماعي كفريضة دينية وإنسانية تحفظ تماسك الأمة وتقيها من الآفات',
				q2: 'لأن طغيان الأنانية أضعف الروابط الأسرية والاجتماعية وفتح الباب للتشرّد والتفكك، ودعا الشباب إلى إحياء روح التعاون والعمل التطوعي.',
				synWord: 'الإيثار',
				synMeaning: 'تفضيل الغير على النفس',
				antWord: 'السرّاءِ',
				antMeaning: 'الضرّاءِ (موجودة في النص)',
				pattern: 'النمط الحجاجي (يخدمه التفسير)',
				patternProof: 'أدوات التوكيد («إنّ»، «ولقد»)، الاستدراك والإضراب («بل»، «غيرَ أنّ»)، والتعليل («لأنّ»، «ولذلك»)',
				value: 'التكافل والإيثار فريضة إسلامية ووطنية تحفظ كرامة الفقير وتماسك المجتمع'
			},
			{
				title: 'العملُ التضامنيُّ وحفظُ الكرامة',
				author: 'الشيخ العربي التبسي رحمه الله (بتصرّف)',
				source: 'مقالات الإصلاح الاجتماعي',
				paragraphs: [
					'لا يَشعرُ بلذةِ الحياةِ إنسانٌ يعيشُ لنفسِهِ وحدَها، وإنّما السعادةُ الحقيقيةُ في يدٍ تمتدُّ ((تُخفّفُ ألمَ محتاجٍ)) أو تُمسحُ دمعةَ يتيمٍ. فكم من أسرةٍ عفيفةٍ أنهكها الفقرُ فلمْ تمدَّ يدَها للناسِ حياءً وتعففاً، فكان حقاً على الموسرينَ أن يبحثُوا عنها في صمتٍ وتواضعٍ.',
					'إنّ الإحسانَ الخفيَّ يبني جسورَ المحبةِ بين فئاتِ المجتمعِ، ويقتلعُ جذورَ الحقدِ والحسدِ، لأنّ الفقيرَ متى وجدَ أخاهُ إلى جانبِهِ أحبّ وطنَهُ وأخلصَ في خدمتِهِ.'
				],
				vocab: [
					{ word: 'تعففاً', meaning: 'تَرفّعاً عن سؤال الناس وحفظاً للكرامة' },
					{ word: 'الموسرينَ', meaning: 'الأغنياء أصحاب اليسار والغنى' }
				],
				generalIdea: 'الدعوة إلى الإحسان الخفي وتفقّد الأسر المتعففة بوصفه أساس السعادة والتماسك الاجتماعي',
				q2: 'لأن الأسر العفيفة تتعفف عن السؤال حياءً، والإحسان الخفي يبني المحبة ويقتلع الحقد والحسد ويزيد إخلاص الفقير لوطنه.',
				synWord: 'الموسرينَ',
				synMeaning: 'الأغنياء المقتدرين',
				antWord: 'الحقدِ',
				antMeaning: 'المحبةِ (واردة في النص)',
				pattern: 'النمط الحجاجي والتفسيري',
				patternProof: 'التوكيد («إنّ»، «إنّما»)، التعليل («لأنّ»)، وتقديم الحجة الأخلاقية والاجتماعية',
				value: 'الإحسان الخفي وحفظ كرامة المتعففين يرسخان المحبة والأمن الاجتماعي'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'تمجيد الأنانية الفردية واعتبار مساعدة الفقراء أمراً غير ضروري',
					diagnosticFeedback: 'النص ينتقد الأنانية ويدعو بقوة للتكافل والإحسان.'
				},
				{
					text: 'وصف الرحلات العلمية والأسفار البحرية في العصر الحديث',
					diagnosticFeedback: 'النص اجتماعي أخلاقي حول التكافل والإحسان.'
				},
				{
					text: 'تفضيل الجاه والمال على القيم الأخلاقية والرحمة',
					diagnosticFeedback: 'النص يربط قيمة المال بخدمة الضعفاء والرحمة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: `اقرأ نص «${variant.title}» (${variant.author})، ثم اختر الفكرة العامة الأدقّ على منهجية BEM:`,
				questionTextAr: `ما الفكرة العامة الأنسب لسند «${variant.title}»؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.generalIdea
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الأولى (البناء الفكري)',
				points: 6,
				instruction: 'اقرأ السند الآتي قراءة متأنية ثم أجب عن الأسئلة وفق منهجية شهادة التعليم المتوسط:',
				content: [
					buildProsePassageBlock({
						title: variant.title,
						paragraphs: variant.paragraphs,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					}),
					{
						type: 'text',
						content: '1) صُغْ فكرةً عامةً شاملةً وموجزةً للسند.',
						answer: `1) الفكرة العامة: ${variant.generalIdea}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) وضّح من السند أثر ضعف التكافل (أو أثر الإحسان الخفي) كما بيّنه الكاتب، مع ذكر دور الشباب أو الموسرين.',
						answer: `2) ${variant.q2}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كلمة «${variant.synWord}» حسب سياقها، وهاتِ من السند ضدّ كلمة «${variant.antWord}».`,
						answer: `3) شرح «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '4) حدّد النمط الغالب على السند وعلّل إجابتك بمؤشرين مع التمثيل من النص.',
						answer: `4) النمط: ${variant.pattern}. التعليل بالتمثيل: ${variant.patternProof}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استخلص قيمةً إنسانيةً تربويةً من السند.',
						answer: `5) القيمة التربوية: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'صُغ الفكرة العامة في جملة اسمية واحدة تبدأ بمصدر (إبراز / بيان / دعوة).',
				'في سؤال النمط لا تنسَ التمثيل الحرفي من السند لكل مؤشر تذكره.',
				'استخرج الضد من داخل النص نفسه إن طُلب من السند.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				variant.q2,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				`النمط والمؤشرات: ${variant.pattern} — ${variant.patternProof}.`,
				`القيمة: ${variant.value}.`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. البناء الفكري BEM (شعري) — الهوية الجزائرية وحب الوطن (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const intellectualAlgerianIdentity4amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t1_intellectual_algerian_identity',
	grade: '4am',
	trimesterId: 't1',
	domain: 'reading_comprehension',
	titleAr: 'البناء الفكري (BEM): الهوية الجزائرية والانتماء الوطني في نص شعري',
	curriculumLessonId: 'arb_lesson_4am_t1_tashbih_istiara_kinaya',
	defaultPoints: 6,
	onecRole: 'intellectual_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				title: 'شعبُ الجزائرِ مسلمٌ',
				author: 'الإمام عبد الحميد بن باديس رحمه الله',
				source: 'من أشهر قصائده الوطنية',
				verses: [
					['شعبُ الجزائرِ [[مسلمٌ]]', 'وإلى العروبةِ ((ينتسبْ))'],
					['مَنْ قالَ حادَ عن اصلِهِ', 'أو قالَ ماتَ فقد كذبْ'],
					['أو رامَ إدماجاً لهُ', 'رامَ المحالَ من الطلبْ'],
					['يا نشءُ أنتَ رجاؤُنا', 'وبكَ الصباحُ قدِ اقتربْ'],
					['خذْ للحياةِ سلاحَها', 'وخُضِ الخطوبَ ولا تهبْ']
				] as Array<[string, string]>,
				vocab: [
					{ word: 'حادَ', meaning: 'مالَ وانحرفَ عن طريقِهِ' },
					{ word: 'رامَ', meaning: 'طلبَ وقصدَ وأرادَ' },
					{ word: 'الخطوبَ', meaning: 'الشدائدَ والمحنَ العظيمةَ' }
				],
				generalIdea: 'تأكيد الهوية الإسلامية العربية الأصيلة للشعب الجزائري ودعوة النشء إلى العلم والشجاعة',
				q2: 'رفض الشاعر ادعاءات المستعمر بانسلاخ الشعب الجزائري عن أصله وموته ومحاولات إدماجه، ووجّه للشباب رسالة أمل وحثّ على التسلّح بسلاح الحياة (العلم والأخلاق) ومواجهة الصعاب بشجاعة.',
				synWord: 'رامَ',
				synMeaning: 'أرادَ وطلبَ',
				antWord: 'الصباحُ',
				antMeaning: 'المساءُ أو الليلُ (ويرمز الصباح هنا للاستقلال والنهضة)',
				imageryQ: 'اشرح الصورة البيانية في «خذْ للحياةِ سلاحَها» (المقصود بالسلاح: العلم والوعي).',
				imageryA: 'استعارة تصريحية؛ شبّه العلم والوعي بالسلاح فحذف المشبّه (العلم) وصرّح بالمشبّه به (سلاحها) لإبراز قوة العلم في الدفاع عن الوطن.',
				value: 'الاعتزاز بالهوية الإسلامية والعربية للجزائر والتسلّح بالعلم لبناء المستقبل'
			},
			{
				title: 'نشيدُ الأملِ والعلم',
				author: 'الشاعر محمد العيد آل خليفة رحمه الله (بتصرّف)',
				source: 'ديوان محمد العيد آل خليفة',
				verses: [
					['يا أمةَ المجدِ التليدِ تنبّهي', 'فالعلمُ [[مصباحٌ]] ((يُضيءُ الدربا))'],
					['لا يبلغُ العلياءَ شعبٌ غافلٌ', 'عن دينِهِ أو مَنْ أضاعَ الأدبا'],
					['إنّ الجزائرَ جنّةٌ في أرضِنا', 'أبناؤُها حفظُوا العهودَ الأرحبا'],
					['هيا إلى الدرسِ المفيدِ بهمةٍ', 'كي نرفعَ الوطنَ العزيزَ الأحبّا']
				] as Array<[string, string]>,
				vocab: [
					{ word: 'التليدِ', meaning: 'الأصيلِ القديمِ الموروثِ' },
					{ word: 'العلياءَ', meaning: 'المنزلةَ الرفيعةَ والمجدَ' }
				],
				generalIdea: 'دعوة الأمة الجزائرية إلى اليقظة والتمسك بالدين والعلم والأدب لرفعة الوطن',
				q2: 'يربط الشاعر بلوغ المجد بالتمسك بالدين والأدب والعلم، ويدعو الأبناء إلى الإقبال على الدرس بهمة عالية لرفع مكانة الجزائر.',
				synWord: 'التليدِ',
				synMeaning: 'الأصيلِ العريقِ',
				antWord: 'غافلٌ',
				antMeaning: 'يقظٌ منتبهٌ',
				imageryQ: 'اشرح الصورة البيانية في «فالعلمُ مصباحٌ».',
				imageryA: 'تشبيه بليغ؛ شبّه العلم بالمصباح وحذف أداة التشبيه ووجه الشبه لتوضيح دور العلم في الهداية وتنوير العقول.',
				value: 'اليقظة والتمسك بالدين والعلم والأدب أساس نهضة الجزائر وعزتها'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.generalIdea,
			[
				{
					text: 'اليأس من نهضة الشعب الجزائري والتسليم للجهل',
					diagnosticFeedback: 'القصيدة تفيض بالأمل والاعتزاز بالهوية وتدعو إلى النهوض.'
				},
				{
					text: 'وصف الطبيعة الصحراوية وحياة الرعاة فقط',
					diagnosticFeedback: 'القصيدة وطنية إصلاحية تتناول الهوية والعلم ودور الشباب.'
				},
				{
					text: 'الدعوة إلى التخلي عن اللغة العربية والتاريخ الوطني',
					diagnosticFeedback: 'القصيدة تؤكد التمسك بالإسلام والعروبة والأصالة.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'intellectual_building',
			passageKind: 'poetry',
			quizQuestion: {
				type: 'mcq',
				questionText: `ما الفكرة العامة التي تعبّر عن مضمون قصيدة «${variant.title}» (${variant.author})؟`,
				questionTextAr: `اختر الفكرة العامة الدقيقة لقصيدة «${variant.title}»:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.generalIdea
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الأولى (البناء الفكري — نص شعري)',
				points: 6,
				instruction: 'اقرأ الأبيات الشعرية الآتية بتمعّن ثم أجب عن الأسئلة:',
				content: [
					buildPoetryPassageBlock({
						title: variant.title,
						verses: variant.verses,
						author: variant.author,
						source: variant.source,
						vocabulary: variant.vocab
					}),
					{
						type: 'text',
						content: '1) صُغْ فكرةً عامةً مناسبةً للأبيات.',
						answer: `1) الفكرة العامة: ${variant.generalIdea}.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) ما الموقف الذي عبّر عنه الشاعر، وما الرسالة التي وجّهها إلى الشباب؟',
						answer: `2) ${variant.q2}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) اشرح كلمة «${variant.synWord}» وهاتِ ضدّ كلمة «${variant.antWord}».`,
						answer: `3) شرح «${variant.synWord}»: ${variant.synMeaning}. ضدّ «${variant.antWord}»: ${variant.antMeaning}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `4) ${variant.imageryQ}`,
						answer: `4) ${variant.imageryA}`,
						mark: '1'
					},
					{
						type: 'text',
						content: '5) استخلص قيمةً وطنيةً دينيةً من القصيدة.',
						answer: `5) القيمة: ${variant.value}.`,
						mark: '1'
					}
				]
			},
			hints: [
				'اربط بين اعتزاز الشاعر بالهوية الوطنية ودعوته الموجهة للشباب.',
				'في شرح الصورة البيانية اذكر: النوع + الشرح + الأثر البلاغي.',
				'القصيدة من روائع الشعر الإصلاحي الوطني الجزائري.'
			],
			solutionStepsAr: [
				`الفكرة العامة: ${variant.generalIdea}.`,
				variant.q2,
				`المعجم: ${variant.synMeaning} / ${variant.antMeaning}.`,
				variant.imageryA,
				`القيمة: ${variant.value}.`
			],
			finalAnswer: variant.generalIdea
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. البناء اللغوي BEM — عطف النسق وعطف البيان والبدل والعدد والمعدود (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticAtfBadalAdad4amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t1_linguistic_atf_badal_adad',
	grade: '4am',
	trimesterId: 't1',
	domain: 'grammar_irab',
	titleAr: 'البناء اللغوي (BEM): عطف النسق وعطف البيان والبدل والعدد والمعدود',
	curriculumLessonId: 'arb_lesson_4am_t1_badal_anwa',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'المؤرخ أبو القاسم سعد الله رحمه الله (بتصرّف)',
				passage:
					'أَسّسَ الشيخُ [[عبدُ]] الحميدِ بنُ باديسَ جمعيةَ العلماءِ، فأنشأَ مدارسَ لا تُعدّ بل ((تُضيءُ الوطنَ))، وقرأَ التلاميذُ ذلكَ [[المنهجَ]] [[نصفَهُ]] في عامٍ واحدٍ، وأعجبني العلامةُ [[أسلوبُهُ]]. وقد حضرَ الملتقى [[أربعةَ عشرَ]] [[عالماً]] و[[اثنتا]] عشرةَ أستاذةً.',
				irabRows: [
					{
						target: 'عبدُ',
						irab: 'عطف بيان (أو بدل مطابق) مرفوع وعلامة رفعه الضمة الظاهرة (تابع للشيخُ) وهو مضاف.',
						mark: '0.5'
					},
					{
						target: 'نصفَهُ',
						irab: 'بدل بعض من كل منصوب وعلامة نصبه الفتحة الظاهرة (تابع لـ المنهجَ) وهو مضاف، والهاء مضاف إليه.',
						mark: '0.5'
					},
					{
						target: 'أسلوبُهُ',
						irab: 'بدل اشتمال مرفوع وعلامة رفعه الضمة الظاهرة (تابع لـ العلامةُ) وهو مضاف، والهاء مضاف إليه.',
						mark: '0.5'
					},
					{
						target: 'أربعةَ عشرَ (عالماً)',
						irab: 'أربعةَ عشرَ: عدد مركب مبني على فتح الجزأين في محل رفع فاعل. عالماً: تمييز منصوب بالفتحة الظاهرة.',
						mark: '0.5'
					}
				],
				atfExtract: 'حرف العطف «بل» يفيد الإضراب، والواو تفيد مطلق الجمع، والفاء تفيد الترتيب والتعقيب.',
				numTask: 'اكتب الأعداد الآتية بالحروف مع ضبط المعدود بالشكل: «في الخزانة (15) (قصة) و(23) (كتاب) و(12) (مجلة)».',
				numAnswer: 'في الخزانة خمسَ عشرةَ قصةً، وثلاثةٌ وعشرونَ كتاباً، واثنتا عشرةَ مجلةً.',
				clauseQuestion: 'بيّن المحل الإعرابي للجملة الواقعة بين قوسين ((تُضيءُ الوطنَ)) في الفقرة.',
				clauseAnswer: 'جملة فعلية معطوفة على جملة النعت (لا تُعدّ) في محل نصب (تابعة للمنعوت النكرة «مدارسَ»).',
				mcqPrompt: 'ما نوع البدل وإعرابه في كلمة «أسلوبُهُ» في جملة «أعجبني العلامةُ أسلوبُهُ»؟',
				mcqCorrect: 'بدل اشتمال مرفوع وعلامة رفعه الضمة وهو مضاف والهاء مضاف إليه',
				mcqWrong1: 'بدل بعض من كل مرفوع بالضمة',
				mcqWrong2: 'بدل مطابق منصوب بالفتحة',
				mcqWrong3: 'توكيد معنوي مرفوع بالضمة'
			},
			{
				author: 'الشيخ مبارك بن محمد الميلي رحمه الله (بتصرّف)',
				passage:
					'قادَ الخليفةُ [[عمرُ]] بنُ الخطابِ الفتوحاتِ ثمّ ((أرسى قواعدَ العدلِ)) في التاريخِ، وحفظتُ من شعرِ الصحابيِّ حسانَ هذهِ [[القصيدةَ]] [[ثلثَها]]، وراقني القائدُ [[عزيمتُهُ]]. وقد قرأتُ عن سيرتِهِ [[سبعَ عشرةَ]] [[صفحةً]] وحفظتُ ثلاثينَ حكمةً.',
				irabRows: [
					{
						target: 'عمرُ',
						irab: 'عطف بيان (أو بدل مطابق) مرفوع وعلامة رفعه الضمة الظاهرة (تابع لـ الخليفةُ).',
						mark: '0.5'
					},
					{
						target: 'القصيدةَ',
						irab: 'بدل مطابق (أو عطف بيان) منصوب وعلامة نصبه الفتحة الظاهرة (بعد اسم الإشارة هذهِ).',
						mark: '0.5'
					},
					{
						target: 'ثلثَها',
						irab: 'بدل بعض من كل منصوب وعلامة نصبه الفتحة وهو مضاف، و«ها» ضمير متصل في محل جر مضاف إليه.',
						mark: '0.5'
					},
					{
						target: 'سبعَ عشرةَ (صفحةً)',
						irab: 'سبعَ عشرةَ: عدد مركب مبني على فتح الجزأين في محل نصب مفعول به. صفحةً: تمييز منصوب بالفتحة.',
						mark: '0.5'
					}
				],
				atfExtract: 'حرف العطف «ثمّ» يفيد الترتيب والتراخي، و«الواو» تفيد مطلق الجمع والاشتراك.',
				numTask: 'اكتب الأعداد الآتية بالحروف واضبط المعدود: «قرأتُ (19) (صفحة) و(12) (كتاب) و(7) (مقالات)».',
				numAnswer: 'قرأتُ تسعَ عشرةَ صفحةً، واثنيْ عشرَ كتاباً، وسبعَ مقالاتٍ (لأن مفرد مقالات «مقالة» مؤنث فالعدد 7 يخالفه).',
				clauseQuestion: 'بيّن نوع البدل في «عزيمتُهُ» في جملة «راقني القائدُ عزيمتُهُ»، وأعربه.',
				clauseAnswer: '«عزيمتُهُ»: بدل اشتمال مرفوع وعلامة رفعه الضمة الظاهرة (لأن العزيمة صفة معنوية) وهو مضاف، والهاء مضاف إليه.',
				mcqPrompt: 'ما الكتابة الصحيحة بالحروف لجملة: «قرأتُ (12) (كتاب)»؟',
				mcqCorrect: 'قرأتُ اثنيْ عشرَ كتاباً',
				mcqWrong1: 'قرأتُ اثنا عشرَ كتاباً',
				mcqWrong2: 'قرأتُ اثنتيْ عشرةَ كتاباً',
				mcqWrong3: 'قرأتُ اثنيْ عشرَ كتبٍ'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'تثبّت من الحالة الإعرابية للمثنى (اثنا رفعاً، اثني نصباً) ومن نوع البدل (معنوي أم مادي).' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'راجع قاعدة مطابقة العدد 12 للمعدود المذكر، والفرق بين بدل الاشتمال والمطابق.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'معدود الأعداد 11-99 يكون مفرداً منصوباً (تمييزاً)، و«أسلوب» ليس من ألفاظ التوكيد.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqPrompt,
				questionTextAr: variant.mcqPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الثانية (البناء اللغوي)',
				points: 6,
				instruction: 'اقرأ الفقرة الآتية ثم أجب عن أسئلة القواعد على نمط BEM:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب ما تحته خط في الفقرة إعراباً نموذجياً كاملاً:',
						answer: '1) الإعراب النموذجي موضح في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) ${variant.numTask}`,
						answer: `2) ${variant.numAnswer}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '3) استخرج من الفقرة حرفي عطف مختلفين وبيّن المعنى الذي أفاده كل منهما.',
						answer: `3) ${variant.atfExtract}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ${variant.clauseQuestion}`,
						answer: `4) ${variant.clauseAnswer}`,
						mark: '1'
					}
				]
			},
			hints: [
				'البدل يتبع المبدل منه في الرفع والنصب والجر، وبدل الاشتمال للمعنوي وبعض من كل للمادي.',
				'العدد 12 يطابق المعدود بجزأيه، وجزؤه الأول يُعرب إعراب المثنى بالألف رفعاً وبالياء نصباً وجراً.',
				'العدد المركب (11 و13-19) مبني على فتح الجزأين، ومعدود 11-99 مفرد منصوب تمييز.'
			],
			solutionStepsAr: [
				'إعراب عطف البيان والبدل (المطابق وبعض من كل واشتمال) والعدد المركب والتمييز.',
				variant.numAnswer,
				variant.atfExtract,
				variant.clauseAnswer
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. البناء اللغوي BEM — التشبيه البليغ والاستعارة والكناية والنمط (6 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const linguisticBayanNamat4amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t1_linguistic_bayan_namat',
	grade: '4am',
	trimesterId: 't1',
	domain: 'rhetoric_balagha',
	titleAr: 'البناء اللغوي (BEM): التشبيه البليغ والاستعارة والكناية والأنماط النصية',
	curriculumLessonId: 'arb_lesson_4am_t1_tashbih_istiara_kinaya',
	defaultPoints: 6,
	onecRole: 'linguistic_building',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const variant = rng.pick([
			{
				author: 'العلامة محمد البشير الإبراهيمي رحمه الله (بتصرّف)',
				passage:
					'إنّ [[اللغةَ]] العربيةَ — لغةَ الضادِ — حصنٌ حصينٌ للأمةِ، يبتسمُ التاريخُ حين يذكرُ علماءَها الذين كانوا مصابيحَ الهدى؛ فـمَنْ أرادَ أن يعرفَ مجدَهُم فليقرأْ ما سطّرُوهُ بأيدٍ نظيفةٍ. أليسَ هذا دليلاً قاطعاً على أنّ اللغةَ روحُ الأمةِ؟',
				irabRows: [
					{
						target: 'اللغةَ',
						irab: 'اسم «إنّ» منصوب وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'مصابيحَ',
						irab: 'خبر «كانوا» منصوب وعلامة نصبه الفتحة الظاهرة (وهو صيغة منتهى الجموع مضاف إلى الهدى).',
						mark: '0.5'
					}
				],
				qBayan1: 'اشرح الصورة البيانية في «يبتسمُ التاريخُ» وبيّن نوعها وأثرها.',
				aBayan1: 'استعارة مكنية؛ شبّه التاريخ بإنسان فحذف المشبّه به وترك قرينة «يبتسمُ»، وأثرها التشخيص وإبراز الاعتزاز بأمجاد العلماء.',
				qBayan2: 'بيّن نوع الكناية في العبارتين: (أ) «لغةَ الضادِ»، (ب) «بأيدٍ نظيفةٍ»، مع ذكر أثر الكناية البلاغي.',
				aBayan2: '(أ) «لغةَ الضادِ»: كناية عن موصوف وهو اللغة العربية. (ب) «بأيدٍ نظيفةٍ»: كناية عن صفة العفة والأمانة والإخلاص. أثرها: الإتيان بالمعنى مصحوباً بالدليل عليه في إيجاز وتجسيم.',
				qBayan3: 'استخرج من الفقرة تشبيهاً بليغاً وحدّد طرفيه، ثم اذكر مؤشرين للنمط الحجاجي في الفقرة.',
				aBayan3: 'التشبيه البليغ: «اللغةَ روحُ الأمةِ» (المشبّه: اللغة، المشبّه به: روح الأمة، حُذفت الأداة ووجه الشبه). مؤشرا الحجاج: التوكيد («إنّ»، «أنّ») والاستفهام التقريري الاستدلالي («أليسَ هذا دليلاً قاطعاً»).',
				mcqPrompt: 'ما نوع الصورة البيانية في عبارة «لغةُ الضادِ»؟',
				mcqCorrect: 'كناية عن موصوف وهو اللغة العربية',
				mcqWrong1: 'كناية عن صفة',
				mcqWrong2: 'استعارة مكنية',
				mcqWrong3: 'تشبيه تام'
			},
			{
				author: 'الكاتب أحمد رضا حوحو رحمه الله (بتصرّف)',
				passage:
					'إنّ [[الكتابَ]] صديقٌ وفيٌّ لا يملُّ صحبَتَكَ، يُخاطبُ عقلَكَ بلطفٍ ويُشعلُ في قلبِكَ حبَّ المعرفةِ؛ وكم من عالمٍ يُشارُ إليه بالبنانِ بفضلِ ملازمتِهِ للمكتباتِ! فهل يرتقي مجتمعٌ يعرضُ عن القراءةِ؟ كلاّ، بل القراءةُ [[مفتاحُ]] النهضةِ.',
				irabRows: [
					{
						target: 'الكتابَ',
						irab: 'اسم «إنّ» منصوب وعلامة نصبه الفتحة الظاهرة.',
						mark: '0.5'
					},
					{
						target: 'مفتاحُ',
						irab: 'خبر مرفوع وعلامة رفعه الضمة الظاهرة (للمبتدأ القراءةُ) وهو مضاف.',
						mark: '0.5'
					}
				],
				qBayan1: 'اشرح الصورة البيانية في «يُخاطبُ عقلَكَ بلطفٍ» وبيّن نوعها وأثرها.',
				aBayan1: 'استعارة مكنية؛ شبّه الكتاب بإنسان يتحدث فحذف المشبّه به (الإنسان) وترك قرينة «يخاطبُ»، أثرها التشخيص وتقريب قيمة القراءة.',
				qBayan2: 'حدّد الصورة البيانية في «يُشارُ إليه بالبنانِ» وبيّن نوعها وأثرها البلاغي.',
				aBayan2: 'كناية عن صفة الشهرة والنبوغ؛ أثرها الإتيان بالمعنى مصحوباً بالدليل عليه في إيجاز وتجسيم.',
				qBayan3: 'استخرج تشبيهاً بليغاً من الفقرة وحدّد طرفيه، ثم بيّن النمط الغالب ومؤشراً له.',
				aBayan3: 'التشبيه البليغ: «القراءةُ مفتاحُ النهضةِ» (أو «الكتابُ صديقٌ»). النمط الغالب: حجاجي؛ من مؤشراته التوكيد («إنّ») والإضراب («كلاّ، بل») والاستفهام الاستنكاري.',
				mcqPrompt: 'ما نوع الصورة البيانية في عبارة «القراءةُ مفتاحُ النهضةِ»؟',
				mcqCorrect: 'تشبيه بليغ حُذفت فيه الأداة ووجه الشبه',
				mcqWrong1: 'استعارة تصريحية',
				mcqWrong2: 'كناية عن موصوف',
				mcqWrong3: 'جناس ناقص'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			variant.mcqCorrect,
			[
				{ text: variant.mcqWrong1, diagnosticFeedback: 'قارن بين الكناية (يجوز فيها المعنى الحقيقي) والتشبيه البليغ (ذكر الطرفين فقط).' },
				{ text: variant.mcqWrong2, diagnosticFeedback: 'في الاستعارة يُحذف أحد طرفي التشبيه، أما هنا فالحالة مختلفة.' },
				{ text: variant.mcqWrong3, diagnosticFeedback: 'تأكد من الفرق بين الصور البيانية والمحسنات البديعية.' }
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'linguistic_building',
			passageKind: 'prose',
			quizQuestion: {
				type: 'mcq',
				questionText: variant.mcqPrompt,
				questionTextAr: variant.mcqPrompt,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: variant.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الأول — الوضعية الثانية (التذوّق البلاغي واللغوي)',
				points: 6,
				instruction: 'اقرأ الفقرة الآتية ثم أجب عن الأسئلة بدقة:',
				content: [
					buildProsePassageBlock({
						paragraphs: [variant.passage],
						author: variant.author
					}),
					{
						type: 'text',
						content: '1) أعرب الكلمتين المسطّرتين في الفقرة:',
						answer: '1) الإعراب النموذجي في الجدول أدناه:',
						mark: '0'
					},
					buildIrabTableBlock(variant.irabRows),
					{
						type: 'text',
						content: `2) ${variant.qBayan1}`,
						answer: `2) ${variant.aBayan1}`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) ${variant.qBayan2}`,
						answer: `3) ${variant.aBayan2}`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) ${variant.qBayan3}`,
						answer: `4) ${variant.aBayan3}`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'التشبيه البليغ يقتصر على المشبّه والمشبّه به دون أداة ولا وجه شبه.',
				'الكناية عن موصوف تشير إلى ذات (لغة الضاد = العربية)، وعن صفة تشير إلى خلق أو حال (نظيف اليد = العفة).',
				'لا تنسَ الأثر البلاغي في شرح كل صورة بيانية.'
			],
			solutionStepsAr: [
				'إعراب المفردات المسطّرة.',
				variant.aBayan1,
				variant.aBayan2,
				variant.aBayan3
			],
			finalAnswer: variant.mcqCorrect
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. الوضعية الإدماجية BEM — التضامن الاجتماعي أو الهوية الوطنية (8 نقاط)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSolidarityBem4amT1: ArabicParameterizedTemplate = {
	id: 'arb_tpl_4am_t1_integration_solidarity_bem',
	grade: '4am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية (BEM): نص تفسيري حجاجي حول التضامن الاجتماعي أو الانتماء الوطني',
	curriculumLessonId: 'arb_lesson_4am_t1_namat_tafsiri_hijaji',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): ArabicGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const topic = rng.pick([
			{
				context:
					'بمناسبة فصل الشتاء وتضامن الجزائريين مع العائلات المعوزة في المناطق النائية، نظّمت متوسطتك حملة «قفة الأخوّة»، فطلب منك أستاذك كتابة مقال لموقع المتوسطة تدعو فيه إلى التكافل الاجتماعي.',
				quote: 'قال النبي صلى الله عليه وسلم: «مَثَلُ المؤمنينَ في توادِّهِم وتراحمِهِم وتعاطفِهِم مَثَلُ الجسدِ الواحدِ».',
				instruction:
					'أنتج نصاً تفسيرياً حجاجياً من 14 إلى 16 سطراً تبيّن فيه مفهوم التكافل الاجتماعي وأثره في القضاء على الآفات، وتُقنع زملاءك بضرورة المساهمة العملية في الحملة، موظّفاً: بدلاً مطابقاً أو بدل اشتمال، وعطف نسق بـ «بل»، وعدداً مركباً مضبوطاً، وتشبيهاً بليغاً أو كنايةً.',
				modelOutline:
					'المقدمة (3 أسطر): التعريف بالتكافل كقيمة إسلامية راسخة في المجتمع الجزائري وطرح الإشكالية. العرض (9-10 أسطر في فقرتين): الأولى تفسيرية تشرح صور التكافل وأسبابه وآثاره في سد حاجات الفقراء وحماية الشباب؛ والثانية حجاجية تقنع المترددين بالحجج الدينية والواقعية مع الاستشهاد بالحديث الشريف. الخاتمة (3 أسطر): دعوة عملية منظمة للمشاركة في «قفة الأخوّة». أمثلة التوظيف: «إنّ هذا التكافلَ» (بدل مطابق) أو «أعجبني المجتمعُ تراحمُهُ» (بدل اشتمال)، «ليس العطاءُ ترفاً بل واجباً» (عطف بـ بل)، «شارك في الحملةِ خمسةَ عشرَ تلميذاً» (عدد مركب)، «التضامنُ حصنٌ منيعٌ» (تشبيه بليغ).',
				mcqCorrect: 'الالتزام بالنمط التفسيري الحجاجي وحجم 14-16 سطراً وتوظيف البدل والعطف والعدد المركب والصورة البيانية'
			},
			{
				context:
					'احتفلت متوسطتك بذكرى ثورة التحرير المباركة، فقرّرتَ تحرير كلمة تُلقيها أمام زملائك تُبرز فيها مقومات الهوية الوطنية وتدعوهم لخدمة الجزائر بالعلم والأخلاق.',
				quote: 'قال الإمام عبد الحميد بن باديس رحمه الله: «شعبُ الجزائرِ مسلمٌ ... وإلى العروبةِ ينتسبْ».',
				instruction:
					'حرّر نصاً حجاجياً تفسيرياً من 14 إلى 16 سطراً تشرح فيه واجب الجيل الحاضر تجاه وطنه وتُقنع زملاءك بأن حب الوطن عملٌ واجتهادٌ لا شعاراتٌ، موظّفاً: عطف بيان، وبدل بعض من كل، وعدداً معطوفاً، واستعارةً مكنيةً.',
				modelOutline:
					'المقدمة: الإشادة بتضحيات الشهداء والاعتزاز بالهوية الوطنية الإسلامية والعربية. العرض: فقرة تفسيرية توضّح مقومات الهوية ومسؤوليات التلميذ؛ وفقرة حجاجية تقنع بأن الوطنية الحقيقية تظهر في الجدّ والعلم واحترام الممتلكات العامة، مع الاستشهاد ببيت ابن باديس. الخاتمة: عهد شبابي على الوفاء لرسالة الشهداء. التوظيف: «أسّسَ الإمامُ عبدُ الحميدِ مدارسَ العلمِ» (عطف بيان)، «قرأتُ تاريخَ الثورةِ نصفَهُ» (بدل بعض من كل)، «حفظتُ أربعةً وعشرينَ بيتاً وطنياً» (عدد معطوف)، «يبتسمُ الوطنُ لجهودِ أبنائِهِ» (استعارة مكنية).',
				mcqCorrect: 'الجمع بين شرح مقومات الهوية والإقناع بواجب خدمة الوطن مع احترام الحجم والموارد المطلوبة'
			}
		]);

		const mcq = buildUniqueMcqOptions(
			topic.mcqCorrect,
			[
				{
					text: 'كتابة فقرة سردية قصيرة من سبعة أسطر خالية من الحجج والموارد المطلوبة',
					diagnosticFeedback: 'في BEM يجب احترام الحجم (14-16 سطراً) والنمط المطلوب والموارد المحددة.'
				},
				{
					text: 'الاكتفاء بكتابة الشاهد فقط دون تفسير ولا حجاج',
					diagnosticFeedback: 'الشاهد يدعم الأفكار ولا يعوّض التحرير المنهجي.'
				},
				{
					text: 'كتابة العدد المركب بالأرقام بدل الحروف وتجاهل البدل',
					diagnosticFeedback: 'توظيف العدد المركب يقتضي كتابته بالحروف وضبطه وضبط معدوده بالشكل.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '4am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: 'ما المعيار الحاسم لتحقيق التميّز في هذه الوضعية الإدماجية على نمط BEM؟',
				questionTextAr: 'اختر الخيار الذي يحقّق معيار الملاءمة الكامل في هذه الوضعية:',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: topic.mcqCorrect
			},
			sujetExercise: {
				customTitle: 'الجزء الثاني — الوضعية الإدماجية (BEM)',
				points: 8,
				instruction: 'أنجز الوضعية الإدماجية الآتية مراعياً شبكة تقويم شهادة التعليم المتوسط:',
				content: [
					buildWrittenProductionBlock({
						context: topic.context,
						supportQuote: topic.quote,
						instruction: topic.instruction,
						rubricCriteria: [
							'الملاءمة (الموضوع، النمط التفسيري الحجاجي، 14-16 سطراً، الموارد الأربع: 2.5 ن)',
							'الانسجام (مقدمة وعرض فقرتين وخاتمة، الروابط والإحالة النصية: 2 ن)',
							'سلامة اللغة (ضبط البدل والعدد والعطف، سلامة الإملاء والنحو: 2.5 ن)',
							'الإبداع والإتقان (توظيف الشاهد، علامات الوقف، خط مقروء ونظيف: 1 ن)'
						],
						modelOutline: topic.modelOutline,
						mark: '8'
					})
				]
			},
			hints: [
				'اكتب الأعداد بالحروف واضبط المعدود بعدها تمييزاً مفرداً منصوباً.',
				'وزّع النص على أربع فقرات ببياض واضح في أول كل فقرة (مقدمة، فقرتا عرض، خاتمة).',
				'وظّف الشاهد الوارد في السند لتقوية حجتك ونيل نقطة الإتقان.'
			],
			solutionStepsAr: [
				'تفكيك التعليمة وحصر النمط والحجم والموارد النحوية والبلاغية.',
				'بناء مسودة مختصرة تتضمن الأفكار وجمل التوظيف والشاهد.',
				'تحرير النص بلغة فصيحة ومراجعة الشكل والإملاء وعلامات الترقيم.'
			],
			finalAnswer: topic.mcqCorrect
		};
	}
};

export const TEMPLATES_4AM_T1: ArabicParameterizedTemplate[] = [
	intellectualSocialSolidarity4amT1,
	intellectualAlgerianIdentity4amT1,
	linguisticAtfBadalAdad4amT1,
	linguisticBayanNamat4amT1,
	integrationSolidarityBem4amT1
];
