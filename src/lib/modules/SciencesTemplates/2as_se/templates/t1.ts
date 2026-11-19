import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { SHARED_SCIENCES_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart
} from '../../svg-sciences';

// ============================================================================
// 2AS SE Exclusive Templates — Trimester 1 (التنسيق العصبي الهرموني للدورة المبيضية)
// ============================================================================

// SE Exclusive 1 — Recall (5 pts): Hypothalamic-Pituitary-Ovarian Axis & Feedback
export const tpl2asSeT1OvarianAxisRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t1_ovarian_axis_recall',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'hormonal_regulation',
	titleAr: 'التنسيق العصبي الهرموني: المعقد تحت السريري-النخامي والمراقبة الرجعية للدورة المبيضية',
	curriculumLessonId: 'sci_lesson_2as_se_t1_neurohormonal_ovarian_cycle',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const lhPeakDay = rng.pick(difficulty === 'easy' ? [14] : [13, 14]);
		const estradiolThreshold = rng.pick([200, 220, 250]);

		const svg = svgBioFlowchart({
			title: 'التنسيق العصبي الهرموني وحلقة المراقبة الرجعية للدورة المبيضية',
			orientation: 'vertical',
			steps: [
				{ label: '1. تحت السرير البصري', sublabel: 'إفراز نبضي عصبي-هرموني نحو النخامية', color: '#7c3aed', bg: '#f5f3ff' },
				{ label: '2. الفص الأمامي للنخامية', sublabel: 'إفراز مثيرات الغدد التناسلية في الدم', color: '#1d4ed8', bg: '#eff6ff', arrowLabel: 'طريق دموي' },
				{ label: '3. المبيض (جريبات ثم جسم أصفر)', sublabel: 'تطوير الجريب ← الإباضة ← إفراز الأستراديول والبروجسترون', color: '#dc2626', bg: '#fef2f2' },
				{ label: '4. المراقبة الرجعية على المعقد', sublabel: 'سالبة (أغلب الدورة) وموجبة قبيل الإباضة', color: '#15803d', bg: '#f0fdf4' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_se_t1_ovarian_axis_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تجاوز الأستراديول عتبة $${estradiolThreshold}\\text{ pg/mL}$ يمارس مراقبة رجعية موجبة على المعقد تحت السريري-النخامي محدثاً ذروة $\\text{LH}$ والإباضة في اليوم $${lhPeakDay}$`,
			[
				{
					text: 'يمارس البروجسترون مراقبة رجعية موجبة تحفّز ذروة $\\text{LH}$ في اليوم 14',
					diagnosticFeedback: 'البروجسترون يرتفع بعد الإباضة ويمارس دائماً مراقبة رجعية سالبة تثبط النخامية.'
				},
				{
					text: 'يؤثر تحت السرير البصري على المبيض عبر أعصاب شوكية مباشرة دون الغدة النخامية',
					diagnosticFeedback: 'تحت السرير البصري يفرز GnRH نحو الفص الأمامي للنخامية التي تفرز بدورها LH و FSH في الدم نحو المبيض.'
				},
				{
					text: 'استئصال المبيضين يؤدي إلى توقف إفراز $\\text{LH}$ و $\\text{FSH}$ كلياً من النخامية',
					diagnosticFeedback: 'بل يؤدي غياب الهرمونات المبيضية إلى زوال المراقبة الرجعية السالبة فيرتفع إفراز LH و FSH بقوة!'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مخطط وظيفي يبيّن مستويات التنسيق العصبي الهرموني للدورة المبيضية',
				width: 350
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الوثيقة (1)، سمِّ الهرمون العصبي الذي يفرزه العنصر (1) وهرموني العنصر (2) محدّداً دور كل منهما في المبيض، ثم ميّز بين المراقبة الرجعية السالبة والمراقبة الرجعية الموجبة (علماً أن عتبة الأستراديول تبلغ $${estradiolThreshold}" pg/mL"$ قبيل اليوم $${lhPeakDay}$).`,
				answer: `1) الهرمونات والمراقبة الرجعية:\n- العنصر (1) تحت السرير البصري: يفرز **$"GnRH"$** بشكل نبضي (دفقي).\n- العنصر (2) الفص الأمامي للنخامية: يفرز **$"FSH"$** (ينشط نمو الجريبات وإفراز الأستراديول) و **$"LH"$** (ذروته في اليوم $${lhPeakDay}$ تُحدث الإباضة وتحوّل الجريب إلى جسم أصفر).\n- المراقبة الرجعية السالبة: كبح إفراز $"GnRH"$ و $"LH/FSH"$ عند التراكيز الضعيفة للأستراديول أو المرتفعة للبروجسترون.\n- المراقبة الرجعية الموجبة: تنشيط حاد للمعقد عندما يتجاوز الأستراديول عتبة $${estradiolThreshold}" pg/mL"$ قبيل اليوم $${lhPeakDay}$، مما يطلق ذروة $"LH"$ والإباضة.`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تشرح فيه كيف يضمن التنسيق العصبي الهرموني والمراقبة الرجعية التنظيم الدوري المنتظم للدورة المبيضية وتزامنها مع الدورة الرحمية.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: تخضع الوظيفة التكاثرية الأنثوية لإيقاع شهري منظم تتزامن فيه تطورات المبيض والرحم. فكيف ينسّق المعقد تحت السريري-النخامي مع المبيض لضبط مراحل الدورة المبيضية وتزامنها مع الرحم؟\n- العرض: تفرز عصبونات تحت السرير البصري هرمون $"GnRH"$ بنبضات تحفز الفص الأمامي للنخامية على إفراز $"FSH"$ الذي ينمّي الجريبات في الطور الجريبي فتفرز الأستراديول (الذي يبدأ ببناء مخاطية الرحم ويمارس مراقبة رجعية سالبة في البداية). قرب اليوم $${lhPeakDay}$ يفرز الجريب الناضج أستراديول يتجاوز عتبة $${estradiolThreshold}" pg/mL"$، فتنقلب المراقبة الرجعية إلى **موجبة** وتُطلق ذروة $"LH"$ المسؤولة عن الإباضة وتحول الجريب إلى جسم أصفر. في الطور اللوتيئيني يفرز الجسم الأصفر البروجسترون والأستراديول اللذين يكثفان مخاطية الرحم لتهيئتها للتعشيش ويمارسان مراقبة رجعية **سالبة** تكبح $"LH"$ و $"FSH"$. وفي غياب الإلقاح يضمر الجسم الأصفر فتهبط الهرمونات المبيضية مما يسبب الطمث ويرفع الكبح عن النخامية لتنطلق دورة جديدة.\n- الخاتمة: يرتكز انتظام الدورة المبيضية والرحمية على حوار هرموني مزدوج الاتجاه بين المعقد تحت السريري-النخامي والمبيض عبر المراقبة الرجعية السالبة والموجبة.`,
				mark: '3.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `خلال الدورة المبيضية الطبيعية، يرتفع الأستراديول قبيل اليوم $${lhPeakDay}$ متجاوزاً عتبة $${estradiolThreshold}\\text{ pg/mL}$.\nما العبارة العلمية الدقيقة حول أثر ذلك على المعقد تحت السريري-النخامي؟`,
				questionTextAr: 'اختر العبارة الصحيحة حول آلية المراقبة الرجعية:',
				imageUrl: svgUrl,
				imageCaption: 'التنسيق العصبي الهرموني للدورة المبيضية',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تجاوز الأستراديول عتبة $${estradiolThreshold}\\text{ pg/mL}$ يقلب المراقبة الرجعية إلى موجبة على تحت السرير والنخامية مما يُحدث ذروة $\\text{LH}$ والإباضة في اليوم $${lhPeakDay}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُعدّ تنظيم الدورة المبيضية والرحمية نموذجاً دقيقاً للتنسيق العصبي الهرموني في العضوية. تمثل الوثيقة (1) العناصر المتدخلة في هذا التنسيق.`,
				content
			},
			hints: [
				'تذكّر الهرمونات الثلاثة للمعقد: GnRH (تحت السرير)، FSH و LH (النخامية الأمامية).',
				'الأستراديول فوق العتبة قبيل الإباضة هو المحفّز الوحيد للمراقبة الرجعية الموجبة.',
				'اربط نهاية الطور اللوتيئيني وضمور الجسم الأصفر بحدوث الطمث وبداية دورة جديدة.'
			],
			solutionStepsAr: [
				'تسمية GnRH و FSH و LH وأدوارها في المبيض.',
				`التمييز الدقيق بين المراقبة الرجعية السالبة والموجبة (عتبة $${estradiolThreshold}\\text{ pg/mL}$).`,
				'تحرير النص العلمي المهيكل حول تزامن الدورتين المبيضية والرحمية.'
			],
			finalAnswer: 'GnRH ← (FSH, LH) ← مبيض (أستراديول/بروجسترون) ← مراقبة رجعية (− و +)'
		};
	}
};

// SE Exclusive 2 — Scientific Approach (8 pts): Oral contraceptive pill mechanism & LH peak abolition
export const tpl2asSeT1PillFeedbackApproach: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_se_t1_pill_feedback_approach',
	grade: '2as_se',
	trimesterId: 't1',
	domain: 'hormonal_regulation',
	titleAr: 'المسعى العلمي: آلية تأثير حبوب منع الحمل على المعقد تحت السريري-النخامي والإباضة',
	curriculumLessonId: 'sci_lesson_2as_se_t1_neurohormonal_ovarian_cycle',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const lhPeakNorm = rng.pick(difficulty === 'easy' ? [85, 95] : [80, 90, 98]);
		const lhPill = rng.pick([8, 10, 12]);
		const dropPct = roundTo(((lhPeakNorm - lhPill) / lhPeakNorm) * 100, 0);

		const svg = svgBioCurvePlot({
			xMin: 0,
			xMax: 28,
			yMin: 0,
			yMax: 108,
			xStep: 7,
			yStep: 20,
			xLabel: 't (j)',
			yLabel: 'LH (mUI/mL)',
			title: 'تطور نسبة الهرمون النخامي في دورة طبيعية وعند تناول حبوب منع الحمل',
			eventArrows: [{ x: 14, label: 'يوم الإباضة', color: '#dc2626' }],
			curves: [
				{
					fn: (d) => 10 + (lhPeakNorm - 10) * Math.exp(-Math.pow((d - 14) / 1.15, 2)),
					color: '#dc2626',
					label: 'دورة طبيعية'
				},
				{
					fn: (d) => lhPill + 1.2 * Math.sin(d * 0.4),
					color: '#2563eb',
					dashed: true,
					label: 'تحت حبوب منع الحمل'
				}
			],
			points: [
				{ x: 14, y: lhPeakNorm, label: `ذروة ${lhPeakNorm}`, color: '#dc2626' },
				{ x: 14, y: lhPill, label: 'غياب الذروة', color: '#1d4ed8' }
			]
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_se_t1_pill_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`تُمارس الهرمونات الاصطناعية في الحبوب مراقبة رجعية سالبة دائمة تكبح نبضات $\\text{GnRH}$ وتلغي ذروة $\\text{LH}$ (انخفاض بنحو $${dropPct}\\%$) فتمنع الإباضة`,
			[
				{
					text: 'تدمر الحبوب الجريبات المبيضية نهائياً وتجعل المرأة عقيماً مدى الحياة',
					diagnosticFeedback: 'مفعول الحبوب عكوس تماماً؛ إذ تستأنف الإباضة فور التوقف عن تناولها.'
				},
				{
					text: 'تُحفّز الحبوب مراقبة رجعية موجبة ترفع $\\text{LH}$ إلى ضعف القيمة الطبيعية',
					diagnosticFeedback: `المنحنى الأزرق المتقطع يظهر هبوط LH إلى ${lhPill} mUI/mL وغياباً تاماً للذروة!`
				},
				{
					text: 'تمنع الحبوب وصول الدم إلى الرحم دون أي تأثير على الغدة النخامية وتحت السرير',
					diagnosticFeedback: 'انعدام ذروة LH يثبت التأثير المباشر عبر المراقبة الرجعية السالبة على المعقد تحت السريري-النخامي.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'text',
				content: `الجزء الأول (2.5 نقطتان): تُستعمل حبوب منع الحمل الأسترو-بروجستيرونية لتنظيم النسل بصورة مؤقتة وعكوسة (تستعيد المرأة خصوبتها فور التوقف عنها). أظهر الفحص بالموجات فوق الصوتية توقف نمو الجريبات وغياب الإباضة طوال فترة تناول هذه الحبوب.`
			},
			{
				type: 'text',
				content: `1) اطرح المشكل العلمي حول آلية تأثير هذه الحبوب الهرمونية في منع حدوث الإباضة دون تخريب المبيض.`,
				answer: `1) المشكل العلمي: كيف تمنع حبوب منع الحمل الأسترو-بروجستيرونية نضج الجريبات وحدوث الإباضة بصورة عكوسة؟`,
				mark: '1.0'
			},
			{
				type: 'text',
				content: `2) بالاعتماد على مكتسباتك حول التنسيق العصبي الهرموني، اقترح فرضيتين تفسّران آلية عمل هذه الحبوب.`,
				answer: `2) الفرضيتان:\n- الفرضية 1: تمارس الهرمونات الاصطناعية في الحبوب **مراقبة رجعية سالبة دائمة** على المعقد تحت السريري-النخامي فتكبح إفراز $"GnRH"$ و $"FSH"$ وتلغي ذروة $"LH"$ المسؤولة عن الإباضة.\n- الفرضية 2: تؤثر الحبوب مباشرةً على المبيض بغلق مستقبلات $"LH"$ و $"FSH"$ رغم استمرار حدوث ذروة $"LH"$ النخامية بصورة طبيعية.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثاني (3.5 نقاط): للتحقق من الفرضيتين، عُويرت تراكيز هرمون $"LH"$ خلال $28$ يوماً لدى امرأة في دورة طبيعية ثم أثناء تناول الحبوب (الوثيقة 1)، كما قيس تواتر نبضات $"GnRH"$ ومستوى $"FSH"$ والبروجسترون الطبيعي (الجدول).`
			},
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مقارنة تطور هرمون LH في دورة طبيعية وتحت تأثير حبوب منع الحمل',
				width: 360
			},
			{
				type: 'table',
				headers: ['المؤشر الهرموني (اليوم 14 و 21)', 'دورة طبيعية شاهدة', 'دورة تحت حبوب منع الحمل'],
				cells: [],
				rows: [
					['نبضات GnRH (نبضة/ساعة)', 'مرتفعة (ذروة قبيل اليوم 14)', 'ضعيفة جداً وثابتة'],
					['تركيز FSH (mUI/mL)', 'مرتفع في البداية + ذروة اليوم 14', 'منخفض جداً ومستمر'],
					['تركيز البروجسترون المبيضي الطبيعي (اليوم 21)', 'مرتفع (وجود جسم أصفر)', 'شبه منعدم (غياب جسم أصفر)']
				]
			},
			{
				type: 'text',
				content: `1) حلّل منحنى الوثيقة (1) ومعطيات الجدول، واحسب نسبة انخفاض هرمون $"LH"$ في اليوم 14 تحت تأثير الحبوب مقارنة بالدورة الطبيعية.`,
				answer: `1) التحليل والحساب:\n- في الدورة الطبيعية يبلغ $"LH"$ ذروة حادة قدرها $${lhPeakNorm}" mUI/mL"$ في اليوم $14$ مسبوقة بارتفاع نبضات $"GnRH"$ وذروة $"FSH"$، ويتبعها تشكل جسم أصفر يفرز البروجسترون الطبيعي.\n- تحت تأثير الحبوب يختفي تماماً ارتفاع $"GnRH"$ و $"FSH"$ وتُمحى ذروة $"LH"$ حيث يبقى ثابتاً عند $${lhPill}" mUI/mL"$ (انخفاض بنحو $${dropPct} "%"$ عند اليوم 14)، وينعدم البروجسترون الطبيعي (دليل غياب الإباضة والجسم الأصفر).`,
				mark: '2.0'
			},
			{
				type: 'text',
				content: `2) ناقش الفرضيتين وصادق على الفرضية الصحيحة، ثم فسّر لماذا يُعدّ تأثير هذه الحبوب عكوساً تماماً عند التوقف عن تناولها.`,
				answer: `2) المصادقة والتفسير:\n- غياب ذروة $"LH"$ وهبوط $"GnRH"$ و $"FSH"$ يدحض الفرضية (2) و**يصادق على الفرضية (1)**: تحتوي الحبوب مركبات مشابهة للأستراديول والبروجسترون تحاكي الطور اللوتيئيني فتبقي **المراقبة الرجعية السالبة** مفعّلة على تحت السرير البصري والنخامية فتُمنع الإباضة.\n- مفعولها عكوس لأنها لا تخرب المبيض ولا النخامية؛ وبمجرد التوقف عن تناولها يزول الكبح الهرموني الخارجي فتستأنف نبضات $"GnRH"$ و $"FSH/LH"$ وتعود الإباضة الطبيعية.`,
				mark: '1.5'
			},
			{
				type: 'text',
				content: `الجزء الثالث (2.0 نقطتان): أنجز مخططاً تحصيلياً يبيّن آلية منع الإباضة بواسطة حبوب منع الحمل انطلاقاً من مبدأ المراقبة الرجعية السالبة.`,
				answer: `الجزء الثالث — المخطط التحصيلي:\n[تناول حبوب أسترو-بروجستيرونية (جرعة يومية منتظمة)] $arrow.r$ [مراقبة رجعية سالبة دائمة (−) على تحت السرير البصري والفص الأمامي للنخامية] $arrow.r$ [كبح نبضات GnRH وانخفاض FSH وغياب ذروة LH ($${lhPill}" mUI/mL"$ بدل $${lhPeakNorm}$)] $arrow.r$ [عدم نضج الجريب وتوقف الإباضة وعدم تشكل الجسم الأصفر = منع حمل عكوس].`,
				mark: '2.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_se',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion: {
				type: 'mcq',
				questionText: `أظهرت المعايرة الهرمونية أثناء تناول حبوب منع الحمل غياب ذروة $\\text{LH}$ ($${lhPill}$ بدل $${lhPeakNorm}\\text{ mUI/mL}$، انخفاض $${dropPct}\\%$) وهبوط $\\text{GnRH}$ و $\\text{FSH}$ مع غياب الجسم الأصفر.\nما الآلية الفيزيولوجية المصادق عليها؟`,
				questionTextAr: 'اختر التفسير المصادق عليه لعمل حبوب منع الحمل:',
				imageUrl: svgUrl,
				imageCaption: 'مقارنة هرمون LH في دورة طبيعية وتحت الحبوب',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تمارس الهرمونات الاصطناعية مراقبة رجعية سالبة دائمة على المعقد تحت السريري-النخامي، فتكبح $\\text{GnRH}$ و $\\text{FSH}$ وتلغي ذروة $\\text{LH}$ فتُمنع الإباضة بصورة عكوسة.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يستثمر الطب الحديث فهم آليات المراقبة الرجعية في الدورة المبيضية لتطوير وسائل تنظيم النسل (حبوب منع الحمل). لتحديد آلية عملها بدقة ندرس الوثيقة (1) والجدول.`,
				content
			},
			hints: [
				'لاحظ انعدام ذروة LH عند اليوم 14 وهبوط نبضات GnRH.',
				'غياب البروجسترون الطبيعي في اليوم 21 دليل على عدم تشكل الجسم الأصفر (أي غياب الإباضة).',
				'تذكّر أن الحبوب تحاكي حالة المراقبة الرجعية السالبة الدائمة.'
			],
			solutionStepsAr: [
				'طرح المشكل العلمي وفرضيتي المراقبة الرجعية السالبة مقابل غلق مستقبلات المبيض.',
				`تحليل منحنى LH (انخفاض $${dropPct}\\%$) والجدول للمصادقة على الفرضية (1).`,
				'تبرير عكوسية المفعول وبناء المخطط التحصيلي لآلية عمل الحبوب.'
			],
			finalAnswer: `\\text{مراقبة رجعية سالبة دائمة} \\Rightarrow \\text{غياب ذروة LH } (-${dropPct}\\%) \\Rightarrow \\text{توقف الإباضة}`
		};
	}
};

export const SCIENCES_TEMPLATES_2AS_SE_T1: SciencesParameterizedTemplate[] = [
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T1[0], '2as_se'),
	tpl2asSeT1OvarianAxisRecall,
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T1[1], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T1[2], '2as_se'),
	adaptSciencesTemplateForTrack(SHARED_SCIENCES_TEMPLATES_2AS_T1[3], '2as_se'),
	tpl2asSeT1PillFeedbackApproach
];
