import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { BIO_EQUATIONS, buildMiniCodonTableRows, transcribeAndTranslate } from '../../bio-helpers';
import {
	saveSciencesSvgAsset,
	svgBioCurvePlot,
	svgBioFlowchart,
	svgCellUltrastructure,
	svgGeologyDiagram
} from '../../svg-sciences';
import type {
	Difficulty,
	QuizQuestionPayload,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';

/**
 * 3AS SE (Sciences Expérimentales — علوم تجريبية) Parameterized Templates — Trimester 3 (7 templates)
 * SE-EXCLUSIVE: Domain 2 (Bioenergetics: Photosynthesis, Respiration & Fermentation)
 *             + Domain 3 (Plate Tectonics: Earth Structure, Discontinuities, Ridge, Subduction)
 *             + Cross-Domain BAC SE Integration (Domain 1 + Domain 2).
 * Official ONEC roles: 2 recall (5 pts) + 2 reasoning (7 pts) + 3 scientific_approach (8 pts).
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. RECALL (5 pts): Chloroplast Ultrastructure, Photochemical & Biochemical Integration
// ─────────────────────────────────────────────────────────────────────────────
const tplRecallChloroplast: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_recall_chloroplast_photosynthesis',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'استرجاع منظم: فوق بنية الصانعة الخضراء وتكامل مرحلتي التركيب الضوئي (+ نص علمي)',
	curriculumLessonId: 'sci_lesson_3as_se_t3_photosynthesis_photochemical',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const o2Rate = rng.pick([28, 34, 40]);

		const chloroSvg = svgCellUltrastructure('chloroplast', {
			numbered: true,
			title: 'رسم تخطيطي مرقم لفوق بنية الصانعة الخضراء'
		});
		const hillSvg = svgBioCurvePlot({
			title: 'تطور تركيز الأكسجين في تجربة هيل',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 260,
			xStep: 2,
			yStep: 50,
			xLabel: 't (min)',
			yLabel: 'O₂ (umol/L)',
			shadedZones: [
				{ x1: 0, x2: 2, fill: 'rgba(148,163,184,0.28)', label: 'ظلام', textColor: '#334155' },
				{ x1: 2, x2: 7, fill: 'rgba(254,249,195,0.55)', label: 'إضاءة', textColor: '#854d0e' },
				{ x1: 7, x2: 10, fill: 'rgba(148,163,184,0.28)', label: 'ظلام', textColor: '#334155' }
			],
			eventArrows: [{ x: 3.5, label: 'كاشف هيل', color: '#dc2626' }],
			curves: [
				{
					fn: (t) => (t < 3.5 ? 100 : t < 7 ? Math.min(250, 100 + o2Rate * (t - 3.5)) : Math.min(250, 100 + o2Rate * 3.5)),
					color: '#16a34a',
					label: 'O₂'
				}
			]
		});
		const chloroUrl = saveSciencesSvgAsset(`sci_3as_se_t3_chloro_${difficulty}_s${seed}`, chloroSvg);
		const hillUrl = saveSciencesSvgAsset(`sci_3as_se_t3_hill_${difficulty}_s${seed}`, hillSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = 'غشاء التيلاكوئيد (رقم 2) للمرحلة الكيموضوئية والحشوة (رقم 5) للمرحلة الكيموحيوية';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'الحشوة للمرحلة الكيموضوئية والغشاء الخارجي للكيموحيوية', diagnosticFeedback: 'تحتوي أغشية التيلاكوئيد على الأنظمة الضوئية بينما تحوي الحشوة إنزيمات كالفن.' },
					{ text: 'حبيبة النشاء للمرحلتين معاً', diagnosticFeedback: 'حبيبة النشاء ناتج تخزين نهائي للسكريات وليست مقر التفاعلات.' },
					{ text: 'النواة للمرحلة الكيموضوئية والهيولى لحلقة كالفن', diagnosticFeedback: 'كلتا المرحلتين تجريان داخل الصانعة الخضراء.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: 'انطلاقاً من الرسم التخطيطي المرقم لفوق بنية الصانعة الخضراء، حدد مقر كل من المرحلة الكيموضوئية والمرحلة الكيموحيوية.',
				questionTextAr: 'اختر المقرات الخلوية الصحيحة:',
				imageUrl: chloroUrl,
				imageCaption: 'فوق بنية الصانعة الخضراء',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: 'تتم المرحلة الكيموضوئية في غشاء التيلاكوئيد (PSII, PSI، نواقل وATP سينتاز) وتتم المرحلة الكيموحيوية (حلقة كالفن) في الحشوة (الستروما).'
			};
		} else {
			finalAnswer = 'التحلل الضوئي للماء بوجود الضوء ومستقبل مؤكسد للإلكترونات (NADP⁺)';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'تفكك غاز CO₂ مباشرة في الحشوة', diagnosticFeedback: 'وسط تجربة هيل خالٍ تماماً من CO₂ ومع ذلك انطلق O₂!' },
					{ text: 'إماهة جزيئات النشاء في الظلام', diagnosticFeedback: 'انطلاق O₂ يتطلب الضوء وتفاعلات الأكسدة الإرجاعية في التيلاكوئيد.' },
					{ text: 'تنفس الصانعة الخضراء', diagnosticFeedback: 'التنفس يستهلك O₂ ولا يطلقه.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: 'في تجربة هيل الموضحة بالوثيقة (وسط خالٍ من $\\text{CO}_2$)، ما مصدر الأكسجين المنطلق وما شرطه الأساسي؟',
				questionTextAr: 'اختر التفسير الدقيق لتجربة هيل:',
				imageUrl: hillUrl,
				imageCaption: 'تجربة هيل على صانعات خضراء معزولة',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `مصدر O₂ هو التحلل الضوئي للماء (${BIO_EQUATIONS.waterPhotolysis.katex}) بشرط توفر الضوء ومستقبل إلكترونات مؤكسد.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 5,
			instruction: `تقوم النباتات اليخضورية بتحويل الطاقة الضوئية إلى طاقة كيميائية كامنة مخزنة في جزيئات عضوية على مستوى عضيات متخصصة هي الصانعات الخضراء. تمثل الوثيقة (1) فوق بنية الصانعة الخضراء، وتبيّن الوثيقة (2) نتائج تجربة هيل على صانعات خضراء معزولة في وسط خالٍ من $upright("CO")_2$.`,
			content: [
				{
					type: 'columns',
					widths: ['1fr', '1fr'],
					children: [
						{ type: 'image', src: chloroUrl, caption: 'الوثيقة (1): رسم تخطيطي مرقم للصانعة الخضراء' },
						{ type: 'image', src: hillUrl, caption: 'الوثيقة (2): تطور تركيز O₂ في تجربة هيل' }
					]
				},
				{
					type: 'text',
					content: `1) سمِّ البيانات المرقمة (1 إلى 5) في الوثيقة (1)، ثم اكتب معادلة التحلل الضوئي للماء والمعادلة الإجمالية للتركيب الضوئي مبرزاً دلالة تجربة هيل.`,
					answer: `1) **البيانات**: (1) غلاف مضاعف (غشاء خارجي وداخلي)، (2) تيلاكوئيد/بذيرة (مقر المرحلة الكيموضوئية)، (3) حبيبة نشاء، (4) $upright("ADN")$ حلقي، (5) الحشوة/الستروما (مقر المرحلة الكيموحيوية).\n- **التحلل الضوئي للماء**: ${BIO_EQUATIONS.waterPhotolysis.typst}.\n- **المعادلة الإجمالية**: ${BIO_EQUATIONS.photosynthesis.typst}.\n- **دلالة هيل**: إثبات أن انطلاق $upright("O")_2$ مصدره أكسدة الماء في وجود الضوء ومستقبل مؤكسد للإلكترونات (دون الحاجة المباشرة لـ $upright("CO")_2$).`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) اكتب **نصاً علمياً مهيكلاً** تشرح فيه تفاعلات المرحلة الكيموضوئية على مستوى غشاء التيلاكوئيد وكيف تتكامل مع المرحلة الكيموحيوية في الحشوة لتركيب المادة العضوية.`,
					answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: يعتمد تحويل الطاقة الضوئية إلى طاقة كيميائية كامنة في الصانعة الخضراء على مرحلتين متكاملتين. فكيف تتم تفاعلات المرحلة الكيموضوئية وما أوجه تكاملها مع حلقة كالفن في الحشوة؟\n- **العرض**: على مستوى **غشاء التيلاكوئيد**، يمتص اليخضور الفوتونات فتُستثار مراكز التفاعل ($upright("PSII")$ و $upright("PSI")$) وتتحرر إلكترونات عالية الطاقة؛ تُعوّض إلكترونات $upright("PSII")$ بالتحلل الضوئي للماء ($2 upright("H")_2 upright("O") arrow.r upright("O")_2 + 4 upright("H")^+ + 4 upright("e")^-$) فينطلق $upright("O")_2$. تنتقل الإلكترونات عبر نواقل السلسلة التركيبية الضوئية نحو المستقبل النهائي $upright("NADP")^+$ ليُرجع إلى $upright("NADPH,H")^+$. وبالموازاة يؤدي تراكم البروتونات $upright("H")^+$ في تجويف التيلاكوئيد (من أكسدة الماء وضخ الناقل $T_2$) إلى تدفقها نحو الحشوة عبر الكرية المذنبة ($upright("ATP")$ سينتاز) لفسفرة $upright("ADP") + upright("P")_i$ إلى $upright("ATP")$. في **الحشوة**، تستغل حلقة كالفن نواتج المرحلة الكيموضوئية ($upright("ATP")$ و $upright("NADPH,H")^+$) لإرجاع $upright("APG")$ الناتج عن تثبيت $upright("CO")_2$ على $upright("RudP")$ (بإنزيم $upright("RuBisCO")$) لإنتاج سكريات ثلاثية ($upright("TP")$) ثم سكريات سداسية وتجديد $upright("RudP")$، مع تحرير $upright("ADP + P")_i$ و $upright("NADP")^+$ الضروريين لاستمرار المرحلة الكيموضوئية.\n- **الخاتمة**: يضمن الازدواج الوظيفي بين التيلاكوئيد والحشوة التحويل المستمر للطاقة الضوئية إلى مادة عضوية.`,
					mark: '3'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'bioenergetics',
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion,
			sujetExercise,
			hints: [
				'اربط كل بنية في الصانعة الخضراء بالمرحلة التي تحتضنها (التيلاكوئيد ← كيموضوئية، الحشوة ← كيموحيوية).',
				'اذكر تدرج البروتونات H⁺ عبر الكرية المذنبة لتفسير الفسفرة الضوئية.',
				'أبرز في النص العلمي التبادل المزدوج بين المرحلتين (ATP + NADPH,H⁺ مقابل ADP + NADP⁺).'
			],
			solutionStepsAr: [
				'البيانات 1-5 للصانعة الخضراء ومعادلتا التحلل الضوئي والتركيب الضوئي.',
				'نص علمي مهيكل حول تفاعلات التيلاكوئيد والازدواج مع حلقة كالفن.'
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. REASONING (7 pts): Calvin-Benson Cycle Coupling (APG / RudP transitions + stoichiometry)
// ─────────────────────────────────────────────────────────────────────────────
const tplReasoningCalvin: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_reasoning_calvin_coupling',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'استدلال علمي: اقتران المرحلتين الكيموضوئية والكيموحيوية وحلقة كالفن-بنسون (APG و RudP)',
	curriculumLessonId: 'sci_lesson_3as_se_t3_photosynthesis_calvin_herbicides',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const mode = rng.pick(['dark_cut', 'co2_cut'] as const);
		const isDark = mode === 'dark_cut';
		const nGluc = rng.pick([2, 3, 4]);
		const atpNeeded = nGluc * 18;
		const nadphNeeded = nGluc * 12;

		const calvinSvg = svgBioCurvePlot({
			title: isDark
				? 'تغير تركيزي المركبين عند الانتقال المفاجئ للظلام'
				: 'تغير تركيزي المركبين عند قطع غاز ثاني أكسيد الكربون',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 110,
			xStep: 2,
			yStep: 20,
			xLabel: 't (min)',
			yLabel: 'C (UA)',
			shadedZones: [
				{ x1: 0, x2: 5, fill: 'rgba(254,249,195,0.55)', label: 'شروط مثلى', textColor: '#854d0e' },
				{ x1: 5, x2: 10, fill: 'rgba(226,232,240,0.6)', label: isDark ? 'ظلام مفاجئ' : 'غياب الكربون', textColor: '#334155' }
			],
			curves: isDark
				? [
						{ fn: (t) => (t < 5 ? 44 : 44 + 52 * (1 - Math.exp(-(t - 5) / 1.3))), color: '#dc2626', label: 'APG' },
						{ fn: (t) => (t < 5 ? 56 : 56 * Math.exp(-(t - 5) / 1.3)), color: '#2563eb', dashed: true, label: 'RudP' }
					]
				: [
						{ fn: (t) => (t < 5 ? 46 : 46 * Math.exp(-(t - 5) / 1.3)), color: '#dc2626', label: 'APG' },
						{ fn: (t) => (t < 5 ? 54 : 54 + 44 * (1 - Math.exp(-(t - 5) / 1.3))), color: '#2563eb', dashed: true, label: 'RudP' }
					]
		});
		const calvinUrl = saveSciencesSvgAsset(`sci_3as_se_t3_calv_${mode}_${difficulty}_s${seed}`, calvinSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = isDark
				? 'تراكم APG ونفاد RudP لتوقف إرجاع APG وتجديد RudP في غياب ATP و NADPH,H⁺'
				: 'انخفاض APG وتراكم RudP لتوقف تثبيت CO₂ بإنزيم RuBisCO واستمرار تجديد RudP بالضوء';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{
						text: isDark
							? 'انخفاض APG وتراكم RudP لتوقف إنزيم RuBisCO'
							: 'تراكم APG ونفاد RudP لغياب الضوء',
						diagnosticFeedback: 'قارن المنحنيين الأحمر (APG) والأزرق المتقطع (RudP) بعد الدقيقة 5!'
					},
					{ text: 'تحول APG مباشرة إلى غاز الأكسجين O₂', diagnosticFeedback: 'O₂ مصدره التحلل الضوئي للماء لا APG.' },
					{ text: 'انفجار الصانعة الخضراء', diagnosticFeedback: 'التغيرات ناتجة عن اختلال توازن تفاعلات حلقة كالفن.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `انطلاقاً من منحنى تجربة كالفن (${isDark ? 'الانتقال من الضوء للظلام عند الدقيقة 5' : 'قطع CO₂ في الإضاءة عند الدقيقة 5'})، ما التفسير الكيموحيوي الدقيق لما حدث؟`,
				questionTextAr: 'اختر التفسير العلمي الصحيح:',
				imageUrl: calvinUrl,
				imageCaption: 'تطور تركيزي APG و RudP في الحشوة',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: finalAnswer
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${atpNeeded}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `علماً أن تركيب جزيئة غلوكوز واحدة ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) في حلقة كالفن يستهلك $18\\text{ ATP}$ و $12\\text{ NADPH,H}^+$، احسب عدد جزيئات الـ $\\text{ATP}$ المستهلكة لتركيب **$${nGluc}$ جزيئات غلوكوز**.`,
				questionTextAr: 'أدخل عدد جزيئات ATP المستهلكة:',
				imageUrl: calvinUrl,
				imageCaption: 'الحصيلة الطاقوية لحلقة كالفن',
				questionData: { answer: atpNeeded, displayTemplate: 'ATP = ?', variables: [], tolerance: 0 },
				explanation: `لتركيب ${nGluc} جزيئات غلوكوز: $${nGluc} \\times 18 = ${atpNeeded}\\text{ ATP}$ (و $${nGluc} \\times 12 = ${nadphNeeded}\\text{ NADPH,H}^+$).`
			};
		} else {
			finalAnswer = `${nadphNeeded}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `كم عدد جزيئات المرافق الإنزيمي المرجع **$\\text{NADPH,H}^+$** المستهلكة في حلقة كالفن لدمج $${nGluc * 6}$ جزيئات $\\text{CO}_2$ وإنتاج **$${nGluc}$ جزيئات غلوكوز**؟`,
				questionTextAr: 'أدخل عدد جزيئات NADPH,H+:',
				imageUrl: calvinUrl,
				imageCaption: 'استهلاك القوة المرجعة في حلقة كالفن',
				questionData: { answer: nadphNeeded, displayTemplate: 'NADPH,H+ = ?', variables: [], tolerance: 0 },
				explanation: `كل جزيئة غلوكوز (6 CO₂) تستهلك 12 NADPH,H⁺، إذن لـ ${nGluc} جزيئات نستهلك $${nGluc} \\times 12 = ${nadphNeeded}\\text{ NADPH,H}^+$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 7,
			instruction: `أجرى العالمان كالفن وبنسون تجارب دقيقة على طحالب الكلوريلا باستعمال الكربون المشع $""^(14) upright("CO")_2$ لكشف تفاعلات المرحلة الكيموحيوية وعلاقتها بالمرحلة الكيموضوئية. تمثل الوثيقة (1) تطور تركيزي $upright("APG")$ و $upright("RudP")$ قبل وبعد الدقيقة 5 (${isDark ? 'الانتقال المفاجئ من الضوء إلى الظلام مع بقاء CO₂' : 'قطع التزويد بـ CO₂ مع استمرار الإضاءة'}).`,
			content: [
				{
					type: 'image',
					src: calvinUrl,
					caption: 'الوثيقة (1): تطور كميتي APG و RudP في حشوة الصانعة الخضراء'
				},
				{
					type: 'text',
					content: `**الجزء الأول**: 1) حلّل منحنيي الوثيقة (1) قبل وبعد الدقيقة 5، ثم فسّر بدقة تغيّر كميتي $upright("APG")$ و $upright("RudP")$ بالاعتماد على تفاعلات حلقة كالفن.`,
					answer: `1) **التحليل**: قبل الدقيقة 5 (شروط مثلى: ضوء + $upright("CO")_2$) يثبت تركيزا $upright("APG")$ و $upright("RudP")$ عند حالة توازن ديناميكي (تساوي سرعة الاستهلاك والتجديد). بعد الدقيقة 5 (${isDark ? 'الانتقال للظلام' : 'قطع CO₂'}): ${isDark ? 'يرتفع تركيز $upright("APG")$ بسرعة نحو ~96 UA بينما ينهار $upright("RudP")$ نحو الصفر.' : 'ينخفض تركيز $upright("APG")$ نحو الصفر بينما يتراكم $upright("RudP")$ نحو ~98 UA.'}\n- **التفسير**: ${isDark ? 'في الظلام يتوقف إنتاج $upright("ATP")$ و $upright("NADPH,H")^+$، فيستمر مؤقتاً تثبيت $upright("CO")_2$ على $upright("RudP")$ لإنتاج $upright("APG")$ بينما يتوقف إرجاع $upright("APG")$ وتجديد $upright("RudP")$، مما يؤدي لتراكم $upright("APG")$ ونفاد $upright("RudP")$.' : 'في غياب $upright("CO")_2$ يتوقف تثبيته على $upright("RudP")$ بإنزيم $upright("RuBisCO")$ (يتوقف إنتاج $upright("APG")$)، بينما يستمر في الضوء إرجاع $upright("APG")$ المتبقي وتجديد $upright("RudP")$ بفضل $upright("ATP")$ و $upright("NADPH,H")^+$، فينفد $upright("APG")$ ويتراكم $upright("RudP")$.'}`,
					mark: '3.5'
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) حدد دور إنزيم $upright("RuBisCO")$ في هذه الحلقة، ثم احسب كمية $upright("ATP")$ و $upright("NADPH,H")^+$ و $upright("CO")_2$ اللازمة لتركيب **$${nGluc}$ جزيئات غلوكوز**، مبيّناً لماذا يتوقف انطلاق $upright("O")_2$ تبعياً عند انقطاع $upright("CO")_2$ لمدة طويلة.`,
					answer: `2) **دور $upright("RuBisCO")$**: يحفز تثبيت $upright("CO")_2$ على المستقبل الخماسي $upright("RudP")$ لتشكيل جزيئتي $upright("APG")$.\n- **الحصيلة الكمية لـ $${nGluc}$ غلوكوز**: يستهلك كل غلوكوز $6 upright("CO")_2 + 18 upright("ATP") + 12 upright("NADPH,H")^+$, ومنه لـ $${nGluc}$ غلوكوز نحتاج: **$${nGluc * 6} upright("CO")_2$** و **$${atpNeeded} upright("ATP")$** و **$${nadphNeeded} upright("NADPH,H")^+$**.\n- **توقف انطلاق $upright("O")_2$**: انقطاع $upright("CO")_2$ يوقف حلقة كالفن فلا يُجدَّد $upright("NADP")^+$ و $upright("ADP + P")_i$، وبغياب المستقبل النهائي للإلكترونات ($upright("NADP")^+$) تتوقف السلسلة الضوئية والتحلل الضوئي للماء وينعدم انطلاق $upright("O")_2$.`,
					mark: '3.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'bioenergetics',
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion,
			sujetExercise,
			hints: [
				'قبل الدقيقة 5: التوازن الديناميكي يفسّر ثبات التركيزين.',
				'تذكّر: الظلام يوقف الإرجاع والتجديد (↑APG, ↓RudP)، وقطع CO₂ يوقف التثبيت (↓APG, ↑RudP).',
				'الحصيلة لكل جزيئة غلوكوز: 6 CO₂ + 18 ATP + 12 NADPH,H⁺.'
			],
			solutionStepsAr: [
				`الظرف المدروس: ${isDark ? 'الظلام المفاجئ (↑APG, ↓RudP)' : 'قطع CO₂ في الضوء (↓APG, ↑RudP)'}.`,
				`دور RuBisCO: تثبيت CO₂ على RudP لتشكيل 2 APG.`,
				`حصيلة ${nGluc} غلوكوز: ${nGluc * 6} CO₂ + ${atpNeeded} ATP + ${nadphNeeded} NADPH,H⁺.`
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SCIENTIFIC APPROACH (8 pts): Herbicide Mode of Action (DCMU / Atrazine / Paraquat)
// ─────────────────────────────────────────────────────────────────────────────
const tplApproachHerbicides: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_approach_herbicides_dcmu',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'مسعى علمي: آلية تأثير مبيدات الأعشاب (DCMU / الأترازين) على سلسلة الأكسدة الضوئية والتركيب الضوئي',
	curriculumLessonId: 'sci_lesson_3as_se_t3_photosynthesis_calvin_herbicides',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const herbs = [
			{
				nameAr: 'مبيد الديورون (DCMU)',
				siteAr: 'منع انتقال الإلكترونات من النظام الضوئي PSII إلى الناقل T₁ (البلاستوكينون)',
				o2After: 112,
				atpDrop: '8%',
				apgState: 'يتراكم بشدة (+185%)'
			},
			{
				nameAr: 'مبيد الأترازين الزراعي',
				siteAr: 'التنافس مع البلاستوكينون في بروتين D1 للنظام PSII وحجب تدفق الإلكترونات',
				o2After: 118,
				atpDrop: '10%',
				apgState: 'يتراكم بشدة (+175%)'
			}
		];
		const h = rng.pick(herbs);

		const o2Svg = svgBioCurvePlot({
			title: 'تأثير مبيد الأعشاب على انطلاق الأكسجين في الإضاءة',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 260,
			xStep: 2,
			yStep: 50,
			xLabel: 't (min)',
			yLabel: 'O₂ (umol/L)',
			eventArrows: [{ x: 4, label: 'إضافة المبيد', color: '#dc2626' }],
			curves: [
				{ fn: (t) => Math.min(250, 90 + 18 * t), color: '#16a34a', label: 'شاهد بدون مبيد' },
				{
					fn: (t) => (t < 4 ? 90 + 18 * t : 162 - 3 * (t - 4)),
					color: '#dc2626',
					dashed: true,
					label: 'بوجود المبيد'
				}
			]
		});
		const flowSvg = svgBioFlowchart({
			title: 'مخطط تحصيلي لآلية قتل العشب الضار بالمبيد',
			orientation: 'horizontal',
			width: 470,
			steps: [
				{ label: 'تثبت المبيد', sublabel: 'حجب نقل الإلكترونات', color: '#dc2626', bg: '#fef2f2', arrowLabel: 'توقف' },
				{ label: 'تعطل التيلاكوئيد', sublabel: 'انعدام الطاقة والمرجع', color: '#b45309', bg: '#fffbeb', arrowLabel: 'أثر' },
				{ label: 'شلل حلقة كالفن', sublabel: 'توقف إرجاع الكربون', color: '#2563eb', bg: '#eff6ff', arrowLabel: 'نتيجة' },
				{ label: 'موت العشب', sublabel: 'انعدام المادة العضوية', color: '#0f172a', bg: '#f1f5f9' }
			]
		});
		const o2Url = saveSciencesSvgAsset(`sci_3as_se_t3_herb_o2_${difficulty}_s${seed}`, o2Svg);
		const flowUrl = saveSciencesSvgAsset(`sci_3as_se_t3_herb_fl_${difficulty}_s${seed}`, flowSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = h.siteAr;
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'تثبيط مباشر لإنزيم RuBisCO في الحشوة مع استمرار انطلاق O₂', diagnosticFeedback: 'توقف انطلاق O₂ الفوري يثبت استهداف المرحلة الكيموضوئية في التيلاكوئيد!' },
					{ text: 'زيادة نشاط الكرية المذنبة ATP سينتاز', diagnosticFeedback: 'تركيب ATP انخفض إلى قرابة 8–10% فقط.' },
					{ text: 'تخريب الغشاء السليلوزي الخارجي', diagnosticFeedback: 'المبيد يعمل على مستوى السلسلة التركيبية الضوئية في PSII.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `أدى إضافة **${h.nameAr}** عند الدقيقة 4 إلى توقف فوري لانطلاق $\\text{O}_2$ وهبوط تركيب $\\text{ATP}$ إلى ${h.atpDrop} وتراكم $\\text{APG}$. ما آلية تأثير هذا المبيد؟`,
				questionTextAr: 'اختر الآلية الجزيئية للمبيد:',
				imageUrl: o2Url,
				imageCaption: 'أثر إضافة المبيد على انطلاق O₂ في الإضاءة',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `يعمل ${h.nameAr} عبر ${h.siteAr}، مما يوقف التحلل الضوئي للماء وإنتاج ATP و NADPH,H⁺ ثم يشلّ حلقة كالفن.`
			};
		} else {
			finalAnswer = 'توقف إنتاج ATP و NADPH,H⁺ في التيلاكوئيد يمنع إرجاع APG إلى TP فيتراكم APG';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'تنشيط مفرط لإنزيم RuBisCO بواسطة المبيد', diagnosticFeedback: 'تراكم APG ناتج عن توقف استهلاكه (إرجاعه) وليس زيادة إنتاجه.' },
					{ text: 'تحول المبيد مباشرة إلى APG', diagnosticFeedback: 'APG ينتج من تثبيت CO₂ على RudP.' },
					{ text: 'دخول APG من التربة عبر الجذور', diagnosticFeedback: 'APG مركب استقلابي داخل حشوة الصانعة الخضراء.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `كيف تفسر تراكم مركب **$\\text{APG}$** في الحشوة بعد إضافة **${h.nameAr}** رغم أن المبيد يؤثر على غشاء التيلاكوئيد فقط؟`,
				questionTextAr: 'اختر التفسير المعتمد على تكامل المرحلتين:',
				imageUrl: flowUrl,
				imageCaption: 'المخطط الوظيفي لتأثير المبيد',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: finalAnswer
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 8,
			instruction: `يلجأ الفلاحون إلى مبيدات الأعشاب الضارة مثل **${h.nameAr}** لحماية المحاصيل الزراعية. نريد تحديد المستوى الدقيق لتأثير هذا المبيد على آلية التركيب الضوئي وكيفية تسبّبه في ذبول وموت العشب الضار.`,
			content: [
				{
					type: 'text',
					content: `**الجزء الأول**: 1) اقترح فرضيتين تفسّران بهما توقف نمو النبات الضار وتركيب المادة العضوية عند رشه بـ **${h.nameAr}**.`,
					answer: `1) الفرضيتان:\n- **الفرضية 1**: يثبط ${h.nameAr} المرحلة الكيموضوئية في غشاء التيلاكوئيد (حجب انتقال الإلكترونات من $upright("PSII")$ أو تثبيط $upright("ATP")$ سينتاز).\n- **الفرضية 2**: يثبط ${h.nameAr} مباشرة إنزيم $upright("RuBisCO")$ في الحشوة فيمنع تثبيت $upright("CO")_2$.`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1.15fr', '1fr'],
					children: [
						{ type: 'image', src: o2Url, caption: 'الوثيقة (1): تطور تركيز O₂ في معلق صانعات خضراء مضاءة' },
						{
							type: 'table',
							headers: ['المؤشر البيوكيميائي في الإضاءة', 'شاهد', `بوجود ${h.nameAr}`],
							cells: [],
							rows: [
								['إنتاج ATP و NADPH,H⁺', '100%', h.atpDrop],
								['تراكم APG في الحشوة', 'ثابت (100%)', h.apgState],
								['انطلاق O₂ بإضافة مستقبل يرتبط بعد T₁ فقط', 'مرتفع', 'منعدم (0%)']
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) باستغلال الوثيقة (1) ومعطيات الجدول التجريبي، اشرح بدقة الآلية الجزيئية لتأثير **${h.nameAr}** على المرحلتين الكيموضوئية والكيموحيوية، ثم صادق على الفرضية الصحيحة.`,
					answer: `2) **استغلال الوثيقة (1) والجدول**: قبل الدقيقة 4 يرتفع تركيز $upright("O")_2$ خطياً في الإضاءة دلالة على حدوث المرحلة الكيموضوئية. فور إضافة **${h.nameAr}** يتوقف انطلاق $upright("O")_2$ فوراً، وينخفض إنتاج $upright("ATP")$ و $upright("NADPH,H")^+$ إلى ${h.atpDrop}، كما يتراكم $upright("APG")$ (${h.apgState}) مما ينفي تثبيط $upright("RuBisCO")$ (لأن $upright("APG")$ ما زال يتشكل!).\n- **الآلية والمصادقة**: يعمل ${h.nameAr} عبر **${h.siteAr}**، فيتوقف التحلل الضوئي للماء ($upright("O")_2$)، وتدرج البروتونات ($upright("ATP")$)، وإرجاع $upright("NADP")^+$؛ وبغياب نواتج التيلاكوئيد يتوقف إرجاع $upright("APG")$ وتجديد $upright("RudP")$ في حلقة كالفن، فتتوقف تغذية النبات ويموت. ومنه **نصادق على الفرضية 1** وننفي الفرضية 2.`,
					mark: '5'
				},
				{
					type: 'text',
					content: `**الجزء الثالث**: 3) أنجز **مخططاً تحصيلياً وظيفياً** يوضّح التكامل بين مرحلتي التركيب الضوئي وموقع تأثير **${h.nameAr}**.`,
					answer: `3) **المخطط التحصيلي**: ضوء + $upright("H")_2 upright("O")$ ← استثارة $upright("PSII")$ ← [⛔ حجب انتقال الإلكترونات إلى $T_1$ بـ **${h.nameAr}**] ← توقف انطلاق $upright("O")_2$ وتوقف إنتاج $upright("ATP")$ و $upright("NADPH,H")^+$ ← توقف إرجاع $upright("APG")$ وتجديد $upright("RudP")$ في الحشوة ← توقف تركيب السكريات وموت العشب الضار.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'bioenergetics',
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion,
			sujetExercise,
			hints: [
				'التوقف الفوري لانطلاق O₂ يدل على إصابة المرحلة الكيموضوئية في التيلاكوئيد.',
				'تراكم APG يثبت أن RuBisCO سليم وأن إرجاع APG هو الذي توقف لنقص ATP و NADPH,H⁺.',
				'اربط في المخطط التحصيلي بين توقف نقل الإلكترونات في PSII وشلل حلقة كالفن.'
			],
			solutionStepsAr: [
				`إضافة ${h.nameAr} أوقفت انطلاق O₂ وخفضت ATP إلى ${h.atpDrop} وسبّبت تراكم APG.`,
				`الموقع الدقيق: ${h.siteAr}.`,
				'المصادقة على الفرضية 1 ونفي تثبيط RuBisCO.'
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. RECALL (5 pts): Mitochondrion Ultrastructure, Respiration vs Fermentation (+ Text)
// ─────────────────────────────────────────────────────────────────────────────
const tplRecallMitochondria: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_recall_mitochondria_respiration',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'استرجاع منظم: فوق بنية الميتوكوندري، مراحل التنفس الخلوي، ومقارنته بالتخمر (+ نص علمي)',
	curriculumLessonId: 'sci_lesson_3as_se_t3_respiration_fermentation',
	defaultPoints: 5,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const nGluc = rng.pick([2, 3, 5]);
		const atpResp = nGluc * 38;
		const atpFerm = nGluc * 2;

		const mitoSvg = svgCellUltrastructure('mitochondria', {
			numbered: true,
			title: 'رسم تخطيطي مرقم لفوق بنية الميتوكوندري'
		});
		const mitoUrl = saveSciencesSvgAsset(`sci_3as_se_t3_mito_${difficulty}_s${seed}`, mitoSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = 'المادة الأساسية (رقم 3) لحلقة كريبس، والأعراف/الغشاء الداخلي (رقم 2 و 4) للفسفرة التأكسدية';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'الغشاء الخارجي لحلقة كريبس والهيولى للفسفرة التأكسدية', diagnosticFeedback: 'التحلل السكري فقط في الهيولى؛ كريبس في المادة الأساسية والأكسدة التنفسية في الأعراف.' },
					{ text: 'الميتوكوندري بأكملها للتحلل السكري فقط', diagnosticFeedback: 'التحلل السكري يحدث خارج الميتوكوندري (في الهيولى الأساسية).' },
					{ text: 'النواة لحلقة كريبس والريبوزوم للفسفرة', diagnosticFeedback: 'الميتوكوندري هي عضية التنفس الخلوي.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: 'انطلاقاً من الرسم التخطيطي المرقم للميتوكوندري، حدد مقر كل من حلقة كريبس والسلسلة التنفسية (الفسفرة التأكسدية).',
				questionTextAr: 'اختر المقرات الصحيحة داخل الميتوكوندري:',
				imageUrl: mitoUrl,
				imageCaption: 'فوق بنية الميتوكوندري',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: 'تتم حلقة كريبس في المادة الأساسية (الماتريس رقم 3) بينما تتم السلسلة التنفسية والفسفرة التأكسدية في الأعراف (رقم 2) عبر الكريات المذنبة (رقم 4).'
			};
		} else {
			finalAnswer = `${atpResp - atpFerm}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تهدم خلية خميرة **$${nGluc}$ جزيئات غلوكوز** هوائياً (التنفس: $38\\text{ ATP}$/غلوكوز) مقابل هدمها لا هوائياً (التخمر: $2\\text{ ATP}$/غلوكوز). احسب الفرق في كمية الـ $\\text{ATP}$ المنتجة بين الظاهرتين.`,
				questionTextAr: 'احسب الفرق في عدد جزيئات ATP:',
				imageUrl: mitoUrl,
				imageCaption: 'المقارنة الطاقوية بين التنفس والتخمر',
				questionData: { answer: atpResp - atpFerm, displayTemplate: 'الفرق = ? ATP', variables: [], tolerance: 0 },
				explanation: `في التنفس: $${nGluc} \\times 38 = ${atpResp}\\text{ ATP}$؛ في التخمر: $${nGluc} \\times 2 = ${atpFerm}\\text{ ATP}$. الفرق = $${atpResp} - ${atpFerm} = ${atpResp - atpFerm}\\text{ ATP}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 5,
			instruction: `تحوّل الخلايا الحية الطاقة الكيميائية الكامنة في الجزيئات العضوية (الغلوكوز) إلى طاقة قابلة للاستعمال المباشر ($upright("ATP")$) عبر ظاهرتين استقلابيتين أساسيتين هما التنفس الخلوي والتخمر. تمثل الوثيقة (1) فوق بنية الميتوكوندري.`,
			content: [
				{ type: 'image', src: mitoUrl, caption: 'الوثيقة (1): رسم تخطيطي مرقم لفوق بنية الميتوكوندري' },
				{
					type: 'table',
					headers: ['معيار المقارنة', 'التنفس الخلوي', 'التخمر الكحولي'],
					cells: [],
					rows: [
						['شرط الوسط (الأكسجين)', { content: '........', answer: 'هوائي (وجود O₂)' }, { content: '........', answer: 'لاهوائي (غياب O₂)' }],
						['نوع الهدم والمقر الخلوي', { content: '........', answer: 'هدم كلي (الهيولى + الميتوكوندري)' }, { content: '........', answer: 'هدم جزئي (الهيولى فقط)' }],
						['الحصيلة الطاقوية لكل غلوكوز', { content: '........', answer: '38 ATP (مردود عالٍ)' }, { content: '........', answer: '2 ATP (مردود ضعيف + إيثانول غني بالطاقة)' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `1) تعرّف على البيانات المرقمة (1 إلى 4) في الوثيقة (1)، ثم أكمل جدول المقارنة أعلاه مع كتابة المعادلتين الإجماليتين للتنفس والتخمر الكحولي.`,
					answer: `1) **البيانات**: (1) غشاء خارجي، (2) أعراف (الغشاء الداخلي — مقر السلسلة التنفسية)، (3) المادة الأساسية/الماتريس (مقر حلقة كريبس)، (4) كرية مذنبة ($upright("ATP")$ سينتاز).\n- **معادلة التنفس**: ${BIO_EQUATIONS.cellularRespiration.typst}.\n- **معادلة التخمر الكحولي**: ${BIO_EQUATIONS.alcoholicFermentation.typst}.`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) اكتب **نصاً علمياً مهيكلاً** تشرح فيه مراحل الهدم الكلي للغلوكوز في التنفس الخلوي بدءاً من التحلل السكري في الهيولى حتى الفسفرة التأكسدية في الأعراف وتوليد $38 upright("ATP")$.`,
					answer: `2) **نص علمي مهيكل**:\n- **المقدمة والإشكالية**: يوفّر التنفس الخلوي للخلايا الهوائية الطاقة اللازمة لنشاطها في صورة $upright("ATP")$ عبر هدم كلي للغلوكوز بالتعاون بين الهيولى والميتوكوندري. فما هي مراحل هذا الهدم وكيف تُحوَّل الطاقة الكامنة إلى $38 upright("ATP")$؟\n- **العرض**: يبدأ التنفس في **الهيولى الأساسية** بـ **التحلل السكري** (مرحلة مشتركة مع التخمر) حيث يتأكسد الغلوكوز إلى جزيئتي حمض البيروفيك مع إنتاج $2 upright("ATP")$ و $2 upright("NADH,H")^+$. ينفذ حمض البيروفيك إلى **المادة الأساسية للميتوكوندري** حيث يتعرض لنزع الكربوكسيل والهيدروجين (المرحلة التحضيرية ثم **حلقة كريبس**) فينتج $6 upright("CO")_2$ و $2 upright("ATP")$ وكمية كبيرة من النواقل المرجعة ($8 upright("NADH,H")^+$ و $2 upright("FADH")_2$). وأخيراً في **الأعراف (الغشاء الداخلي)** تتم **الفسفرة التأكسدية**: تُعاد أكسدة النواقل المرجعة وتنتقل إلكتروناتها عبر السلسلة التنفسية نحو المستقبل النهائي $upright("O")_2$ لتشكيل الماء، وتُستغل الطاقة المحررة في ضخ البروتونات $upright("H")^+$ نحو الفراغ بين الغشائين؛ ثم يؤدي تدفقها عائدة للمادة الأساسية عبر الكريات المذنبة ($upright("ATP")$ سينتاز) إلى تركيب $34 upright("ATP")$ (الإجمالي $38 upright("ATP")$).\n- **الخاتمة**: يضمن التآزر بين الهيولى والميتوكوندري الهدم الكلي للغلوكوز ومردوداً طاقوياً أعظمياً مقارنة بالتخمر.`,
					mark: '3'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'bioenergetics',
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion,
			sujetExercise,
			hints: [
				'ميز بين مقر التحلل السكري (الهيولى)، حلقة كريبس (المادة الأساسية)، والفسفرة التأكسدية (الأعراف).',
				'في التخمر يبقى جزء كبير من الطاقة الكامنة مخزناً داخل الإيثانول (هدم جزئي).',
				'اذكر الحصيلة الدقيقة لكل مرحلة لتصل إلى مجموع 38 ATP.'
			],
			solutionStepsAr: [
				'البيانات 1-4 للميتوكوندري + إكمال الجدول ومعادلتي التنفس والتخمر.',
				'نص علمي مهيكل يتدرج من التحلل السكري (2 ATP) إلى كريبس (2 ATP) إلى الفسفرة التأكسدية (34 ATP).'
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. SCIENTIFIC APPROACH (8 pts): Oxidative Phosphorylation & Respiratory Inhibitors
// ─────────────────────────────────────────────────────────────────────────────
const tplApproachOxPhos: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_approach_oxphos_inhibitors',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'bioenergetics',
	titleAr: 'مسعى علمي: الفسفرة التأكسدية وتأثير مثبطات السلسلة التنفسية (السيانور / الأوليغوميسين / DNP)',
	curriculumLessonId: 'sci_lesson_3as_se_t3_respiration_fermentation',
	defaultPoints: 8,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const agents = [
			{
				nameAr: 'السيانور (CN⁻)',
				o2Behavior: 'يتوقف استهلاك O₂ فوراً',
				atpBehavior: 'ينعدم تركيب ATP (0%)',
				phGradient: 'ينعدم ضخ H⁺ تدريجياً',
				mechanismAr: 'يثبط آخر ناقل في السلسلة التنفسية (سيتوكروم أوكسيداز) فيمنع انتقال الإلكترونات نحو O₂، مما يوقف أكسدة النواقل وضخ H⁺ وتركيب ATP',
				o2AfterSlope: 0
			},
			{
				nameAr: 'الأوليغوميسين (مضاد حيوي مثبط)',
				o2Behavior: 'يتباطأ بشدة ثم يتوقف',
				atpBehavior: 'يتوقف تركيب ATP فوراً',
				phGradient: 'يبقى مرتفعاً جداً في الفراغ بين الغشائين',
				mechanismAr: 'يغلق قناة البروتونات H⁺ في الكرية المذنبة (ATP سينتاز) فيمنع عودة H⁺ إلى المادة الأساسية وفسفرة ADP، ولتراكم تدرج H⁺ تتوقف السلسلة التنفسية واستهلاك O₂ تبعياً',
				o2AfterSlope: 5
			},
			{
				nameAr: 'ثنائي نيتروفينول (DNP — مادة فاكّة للاقتران)',
				o2Behavior: 'يستمر ويتسارع استهلاك O₂ بقوة',
				atpBehavior: 'ينعدم تركيب ATP مع ارتفاع حرارة الوسط',
				phGradient: 'ينهار تماماً (تساوي pH على جانبي الغشاء الداخلي)',
				mechanismAr: 'يجعل الغشاء الداخلي للميتوكوندري نفوذاً عشوائياً للبروتونات H⁺ فتهرب دون المرور بالكرية المذنبة وتضيع طاقتها حرارة، فتُفك العلاقة بين الأكسدة التنفسية (المستمرة) والفسفرة (المتوقفة)',
				o2AfterSlope: 45
			}
		];
		const ag = rng.pick(agents);

		const o2Svg = svgBioCurvePlot({
			title: 'تطور استهلاك الأكسجين في معلق ميتوكوندري معزولة',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 260,
			xStep: 2,
			yStep: 50,
			xLabel: 't (min)',
			yLabel: 'O₂ (umol/L)',
			eventArrows: [
				{ x: 2, label: 'بيروفيك + ADP', color: '#16a34a' },
				{ x: 5.5, label: 'إضافة المثبط', color: '#dc2626' }
			],
			curves: [
				{
					fn: (t) => {
						if (t < 2) return 240;
						if (t < 5.5) return 240 - 26 * (t - 2);
						return Math.max(15, 149 - ag.o2AfterSlope * (t - 5.5));
					},
					color: '#2563eb',
					label: 'O₂'
				}
			]
		});
		const o2Url = saveSciencesSvgAsset(`sci_3as_se_t3_oxphos_${difficulty}_s${seed}`, o2Svg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = ag.mechanismAr;
			const others = agents
				.filter((x) => x.nameAr !== ag.nameAr)
				.map((x) => ({
					text: x.mechanismAr,
					diagnosticFeedback: `تلك هي آلية ${x.nameAr}! قارن سلوك منحنى O₂ وتدرج الـ pH في الجدول.`
				}));
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					...others,
					{ text: 'ينشط التحلل السكري داخل الميتوكوندري لإنتاج 100 ATP', diagnosticFeedback: 'التحلل السكري يحدث في الهيولى لا الميتوكوندري، والمركب يوقف ATP.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في معلق ميتوكوندري بوجود البيروفيك و $\\text{ADP + P}_i$، أضاف الباحث **${ag.nameAr}** عند الدقيقة 5.5 فلوحظ: ${ag.o2Behavior}، و${ag.atpBehavior}. ما الآلية الدقيقة لهذه المادة؟`,
				questionTextAr: 'اختر التفسير البيوكيميائي الصحيح:',
				imageUrl: o2Url,
				imageCaption: 'أثر المادة المضافة على استهلاك O₂ في الميتوكوندري',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: ag.mechanismAr
			};
		} else {
			finalAnswer = ag.phGradient;
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					...agents.filter((x) => x.nameAr !== ag.nameAr).map((x) => ({
						text: x.phGradient,
						diagnosticFeedback: `راجع أثر ${ag.nameAr} على الغشاء الداخلي أو قناة الكرية المذنبة أو السلسلة التنفسية.`
					})),
					{ text: 'يرتفع تركيز O₂ في الفراغ بين الغشائين', diagnosticFeedback: 'الميتوكوندري تستهلك O₂ ولا تنتجه.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ماذا يحدث لتدرج البروتونات $\\text{H}^+$ عبر الغشاء الداخلي للميتوكوندري بعد إضافة **${ag.nameAr}**؟`,
				questionTextAr: 'اختر أثر المادة على تدرج H⁺:',
				imageUrl: o2Url,
				imageCaption: 'متابعة استهلاك الأكسجين في الميتوكوندري',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `${ag.phGradient}؛ لأن ${ag.mechanismAr}.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 8,
			instruction: `يتوقف إنتاج معظم طاقة الخلية ($34 upright("ATP")$) على الاقتران الوثيق بين أكسدة النواقل المرجعة في السلسلة التنفسية وفسفرة $upright("ADP")$ على مستوى أعراف الميتوكوندري. لدراسة آلية تأثير **${ag.nameAr}** على هذا الاقتران، نقدم لك المعطيات التجريبية التالية.`,
			content: [
				{
					type: 'text',
					content: `**الجزء الأول**: يُسبّب التعرّض لمادة **${ag.nameAr}** انخفاضاً حاداً ومميتاً في مخزون الـ $upright("ATP")$ الخلوي.\n1) اقترح ثلاث فرضيات تحدد بها المستويات الممكنة لتأثير هذه المادة على الفسفرة التأكسدية في الغشاء الداخلي للميتوكوندري.`,
					answer: `1) الفرضيات الثلاث:\n- **الفرضية 1**: تثبط المادة أحد نواقل السلسلة التنفسية فتمنع انتقال الإلكترونات نحو $upright("O")_2$.\n- **الفرضية 2**: تغلق المادة قناة $upright("H")^+$ في الكرية المذنبة ($upright("ATP")$ سينتاز) فتمنع فسفرة $upright("ADP")$.\n- **الفرضية 3**: تفك المادة الاقتران بجعل الغشاء الداخلي نفوذاً عشوائياً لـ $upright("H")^+$ فيتبدد التدرج حرارةً.`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1.15fr', '1fr'],
					children: [
						{ type: 'image', src: o2Url, caption: 'الوثيقة (1): استهلاك O₂ في معلق ميتوكوندري معزولة' },
						{
							type: 'table',
							headers: ['المؤشر المقاس بعد الدقيقة 5.5', 'النتيجة المسجلة'],
							cells: [],
							rows: [
								['استهلاك O₂', ag.o2Behavior],
								['إنتاج ATP', ag.atpBehavior],
								['تدرج البروتونات H⁺ عبر الأعراف', ag.phGradient]
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) باستغلال الوثيقة (1) ومعطيات الجدول، حلّل التغيرات المسجلة قبل وبعد الدقيقة 5.5، ثم اشرح الآلية الجزيئية الدقيقة لتأثير **${ag.nameAr}** وصادق على الفرضية الصحيحة.`,
					answer: `2) **التحليل والاستغلال**: بين الدقيقتين 2 و 5.5 (بوجود البيروفيك و $upright("ADP + P")_i$) يُسجَّل استهلاك سريع ومنتظم لـ $upright("O")_2$ (انخفاضه من $240$ إلى $149 upright("µmol/L")$) دلالة على نشاط السلسلة التنفسية والفسفرة التأكسدية. بعد إضافة **${ag.nameAr}** عند الدقيقة 5.5 نلاحظ: **${ag.o2Behavior}**، و**${ag.atpBehavior}**، مع **${ag.phGradient}**.\n- **الآلية والمصادقة**: ${ag.mechanismAr}. وهذا يصادق بدقة على الفرضية الموافقة (${ag.nameAr.includes('السيانور') ? 'الفرضية 1' : ag.nameAr.includes('الأوليغوميسين') ? 'الفرضية 2' : 'الفرضية 3'}) وينفي الفرضيتين الأخريين.`,
					mark: '5'
				},
				{
					type: 'text',
					content: `**الجزء الثالث**: 3) أنجز **مخططاً تحصيلياً وظيفياً** للأعراف الميتوكوندرية يبرز اقتران الأكسدة والفسفرة وموقع تدخل **${ag.nameAr}**.`,
					answer: `3) **المخطط التحصيلي**: أكسدة $upright("NADH,H")^+/upright("FADH")_2$ ← انتقال الإلكترونات عبر السلسلة التنفسية نحو $upright("O")_2$ (تشكل $upright("H")_2 upright("O")$) ← ضخ $upright("H")^+$ نحو الفراغ بين الغشائين ← تدفق $upright("H")^+$ عبر الكرية المذنبة ($upright("ATP")$ سينتاز) ← تركيب $upright("ATP")$ — مع إبراز موضع تدخل **${ag.nameAr}** الذي يُعطّل إنتاج الـ $upright("ATP")$.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'bioenergetics',
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion,
			sujetExercise,
			hints: [
				'قارن الثلاثية الحاسمة للتمييز: (استهلاك O₂ + إنتاج ATP + تدرج H⁺).',
				'وحده DNP يسرّع استهلاك O₂ مع انعدام ATP وانهيار تدرج H⁺!',
				'السيانور يوقف السلسلة مباشرة، والأوليغوميسين يغلق الكرية المذنبة.'
			],
			solutionStepsAr: [
				`المادة: ${ag.nameAr} ← O₂: ${ag.o2Behavior} | ATP: ${ag.atpBehavior}.`,
				`الآلية: ${ag.mechanismAr}.`
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. REASONING (7 pts): Plate Tectonics (Earth Interior, P/S Discontinuities & Subduction/Ridge)
// ─────────────────────────────────────────────────────────────────────────────
const tplReasoningPlateTectonics: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_reasoning_earth_tectonics',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'plate_tectonics',
	titleAr: 'استدلال علمي: البنية الداخلية للأرض (الموجات P و S) والنشاط التكتوني والماغماتي في مناطق الغوص والظهرات',
	curriculumLessonId: 'sci_lesson_3as_se_t3_earth_structure_tectonics',
	defaultPoints: 7,
	onecRole: 'reasoning',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const focusZone = rng.pick(['subduction', 'ridge'] as const);
		const isSub = focusZone === 'subduction';

		const waveSvg = svgBioCurvePlot({
			title: 'انتشار الموجات الزلزالية داخل الكرة الأرضية',
			xMin: 0,
			xMax: 6400,
			yMin: 0,
			yMax: 15,
			xStep: 1000,
			yStep: 3,
			xLabel: 'Profondeur (km)',
			yLabel: 'V (km/s)',
			curves: [
				{
					fn: (d) => (d < 2900 ? 7.8 + 5.9 * (d / 2900) : d < 5100 ? 8.1 + 2.2 * ((d - 2900) / 2200) : 11.2),
					color: '#2563eb',
					label: 'Vp'
				},
				{
					fn: (d) => (d < 2900 ? 4.4 + 2.9 * (d / 2900) : d < 5100 ? 0 : 3.6),
					color: '#dc2626',
					dashed: true,
					label: 'Vs'
				}
			],
			dashedGuides: [
				{ x1: 2900, y1: 0, x2: 2900, y2: 14.5, color: '#991b1b', label: 'غوتنبرغ', labelPos: 'left' },
				{ x1: 5100, y1: 0, x2: 5100, y2: 14.5, color: '#3730a3', label: 'ليمان', labelPos: 'left' }
			]
		});
		const geoSvg = svgGeologyDiagram(isSub ? 'plate_subduction' : 'oceanic_ridge', {
			numbered: true,
			title: isSub ? 'رسم تخطيطي لمنطقة غوص ونشاط ماغماتي' : 'رسم تخطيطي للظهرة المحيطية وتباعد الصفائح'
		});
		const waveUrl = saveSciencesSvgAsset(`sci_3as_se_t3_geo_wave_${difficulty}_s${seed}`, waveSvg);
		const geoUrl = saveSciencesSvgAsset(`sci_3as_se_t3_geo_diag_${focusZone}_${difficulty}_s${seed}`, geoSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = 'انقطاع غوتنبرغ (2900 km)؛ واختفاء الموجات S يثبت أن النواة الخارجية سائلة';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'انقطاع موهو (30 km) ويثبت أن القشرة سائلة', diagnosticFeedback: 'موهو يقع على عمق ضحل (7–30 km) بين القشرة والبرنس الصلبين.' },
					{ text: 'انقطاع ليمان (5100 km) ويثبت أن النواة الداخلية سائلة', diagnosticFeedback: 'عند ليمان تعاود الموجات S الظهور مما يثبت صلابة النواة الداخلية.' },
					{ text: 'منطقة LVZ وتثبت أن البرنس كله سائل', diagnosticFeedback: 'في LVZ تتباطأ الموجات S فقط ولا تختفي (الأستينوسفير صلب لدن).' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: 'انطلاقاً من منحنيي سرعة الموجات الزلزالية $V_P$ و $V_S$ بدلالة العمق، ما اسم الانقطاع الموجود عند العمق $2900\\text{ km}$ وما الحالة الفيزيائية التي يثبتها؟',
				questionTextAr: 'حدد الانقطاع والحالة الفيزيائية:',
				imageUrl: waveUrl,
				imageCaption: 'منحنيات سرعة الموجات الزلزالية P و S',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: 'عند 2900 km (انقطاع غوتنبرغ) تختفي الموجات S (لا تنتشر في السوائل) وتنخفض سرعة P فجأة، مما يثبت أن النواة الخارجية سائلة.'
			};
		} else {
			finalAnswer = isSub
				? 'تحرير الماء من تحول الصفيحة الغائصة يخفض نقطة انصهار بيريدوتيت البرنس العلوي منتجاً ماغما أنديزيتية'
				: 'صعود البيريدوتيت الأستينوسفيري يسبب انخفاض الضغط وانصهاره جزئياً منتجاً ماغما بازلتية';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{
						text: isSub
							? 'انخفاض الضغط الشديد يذيب الصفيحة المحيطية مباشرة إلى بازلت'
							: 'غوص قشرة قارية يحرر الماء ويولد ماغما أنديزيتية',
						diagnosticFeedback: 'عكست بين آلية الانصهار الجزئي في الظهرة (خفض الضغط) وآلية مناطق الغوص (إضافة الماء)!'
					},
					{ text: 'انصهار النواة الخارجية السائلة وصعودها للسطح', diagnosticFeedback: 'الماغما مصدرها البرنس العلوي (البيريدوتيت) وليس النواة.' },
					{ text: 'تفاعل غاز الأكسجين الجوي مع الصخور الرسوبية', diagnosticFeedback: 'مصدر الماغما داخلي في البرنس.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `ما الآلية الدقيقة لتشكل الماغما على مستوى **${isSub ? 'مناطق الغوص' : 'الظهرة المحيطية'}** الموضحة في الوثيقة؟`,
				questionTextAr: 'اختر آلية تشكل الماغما الصحيحة:',
				imageUrl: geoUrl,
				imageCaption: isSub ? 'مقطع في منطقة الغوص' : 'مقطع في الظهرة المحيطية',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: finalAnswer
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 7,
			instruction: `سمحت دراسة انتشار الموجات الزلزالية ($V_P$ و $V_S$) والصخور الماغماتية والمتحولة ببناء نموذج دقيق للبنية الداخلية للأرض وتفسير الديناميكية التكتونية في حدود الصفائح. تُمثّل الوثيقتان (1) و(2) معطيات زلزالية ومقطعاً في ${isSub ? 'منطقة غوص' : 'ظهرة محيطية'}.`,
			content: [
				{
					type: 'columns',
					widths: ['1.1fr', '1fr'],
					children: [
						{ type: 'image', src: waveUrl, caption: 'الوثيقة (1): تغير سرعة الموجات الزلزالية P و S بدلالة العمق' },
						{ type: 'image', src: geoUrl, caption: isSub ? 'الوثيقة (2): بنية منطقة الغوص' : 'الوثيقة (2): بنية الظهرة المحيطية' }
					]
				},
				{
					type: 'text',
					content: `**الجزء الأول**: 1) حلّل منحنيي الوثيقة (1) وحدد الانقطاعات الزلزالية الكبرى وأعماقها، ثم استنتج الحالة الفيزيائية للأغلفة الداخلية للأرض (البرنس، النواة الخارجية، النواة الداخلية) مع تمييز الليتوسفير عن الأستينوسفير.`,
					answer: `1) **التحليل والاستنتاج**: تزداد سرعتا $V_P$ و $V_S$ عموماً مع العمق، مع انقطاعات فجائية: (أ) **انقطاع موهو** ($7-30 upright("km")$): بين القشرة والبرنس الصلبين؛ (ب) **منطقة $upright("LVZ")$** ($~100 upright("km")$): تباطؤ طفيف يفصل **الليتوسفير الصلب** عن **الأستينوسفير اللدن**؛ (جـ) **انقطاع غوتنبرغ** ($2900 upright("km")$): هبوط حاد لـ $V_P$ واختفاء كلي لـ $V_S$ يثبت أن **النواة الخارجية سائلة**؛ (د) **انقطاع ليمان** ($5100 upright("km")$): تسارع $V_P$ وعودة $V_S$ يثبت أن **النواة الداخلية صلبة**.`,
					mark: '3.5'
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) تعرّف على البيانات المرقمة في الوثيقة (2)، ثم فسّر بدقة شروط الانصهار الجزئي لبيريدوتيت البرنس في **${isSub ? 'منطقة الغوص (ودور سلاسل التحول الصخري: شيست أخضر → أزرق → إيكلوجيت)' : 'الظهرة المحيطية'}** مع تحديد الصخور الماغماتية الناتجة (السطحية والعميقة).`,
					answer: isSub
						? `2) **البيانات**: (1) صفيحة محيطية غائصة، (2) خندق محيطي، (3) بركان انفجاري أنديزيتي.\n- **التفسير والتحول**: أثناء انغراز الليتوسفير المحيطي البارد المميّه، يرتفع الضغط والحرارة فتتحول صخور القشرة المحيطية تدريجياً ($upright("غابرو") arrow.r upright("شيست أخضر") arrow.r upright("شيست أزرق") arrow.r upright("إيكلوجيت")$) مع **تحرير الماء** في البرنس العلوي المجاور. يُخفّض الماء درجة انصهار البيريدوتيت فيحدث انصهار جزئي يعطي ماغما غنية بالسيليس والغازات تتصلب سطحياً إلى **الأنديزيت** (براكين انفجارية) وعمقياً إلى **الغرانوديوريت**.`
						: `2) **البيانات**: (1) رفت الظهرة ومصدر صعود الماغما، (2) تيارات الحمل الحراري الصاعدة.\n- **التفسير**: تحت الظهرة المحيطية تصعد تيارات الحمل الحراري للبيريدوتيت الساخن، فيتعرض لـ **انخفاض الضغط مع بقاء الحرارة مرتفعة**، ما يؤدي لانصهار جزئي ينتج ماغما بازلتية مائعة تتبرد سريعاً على السطح مشكلة **البازلت** (وسائد بازلتية) وببطء في العمق مشكلة **الغابرو**، مما يجدّد القشرة المحيطية ويوسّع المحيط.`,
					mark: '3.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'plate_tectonics',
			titleAr: this.titleAr,
			onecRole: 'reasoning',
			quizQuestion,
			sujetExercise,
			hints: [
				'اختفاء الموجات S عند 2900 km هو البرهان الحاسم على سيولة النواة الخارجية.',
				'فرّق بين سبب الانصهار الجزئي في الظهرة (انخفاض الضغط → بازلت/غابرو) وفي الغوص (تحرير الماء بالتجفيف التحولي → أنديزيت/غرانوديوريت).',
				'الأستينوسفير صلب لدن (لا تختفي فيه S بل تتباطأ فقط في LVZ).'
			],
			solutionStepsAr: [
				'الانقطاعات: موهو (7-30 km)، غوتنبرغ (2900 km — نواة خارجية سائلة)، ليمان (5100 km — نواة داخلية صلبة).',
				isSub
					? 'الغوص: تجفيف تحولي (شيست أخضر → أزرق → إيكلوجيت) ← انصهار البيريدوتيت بالماء ← أنديزيت + غرانوديوريت.'
					: 'الظهرة: انصهار البيريدوتيت بخفض الضغط ← بازلت سطحي + غابرو عميق ← توسع المحيط.'
			],
			finalAnswer
		};
	}
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. SCIENTIFIC APPROACH — BAC SE CROSS-DOMAIN INTEGRATION (8 pts):
//    Point Mutation in PSII D1 Protein Conferring Herbicide Resistance (Domain 1 + Domain 2!)
// ─────────────────────────────────────────────────────────────────────────────
const tplApproachBacSeCrossDomain: SciencesParameterizedTemplate = {
	id: 'sci_tpl_3as_se_t3_approach_bac_se_d1_resistance',
	grade: '3as_se',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'مسعى علمي شامل (بكالوريا علوم تجريبية): مقاومة الأعشاب الضارة للأترازين (دمج المجال 1 + المجال 2)',
	curriculumLessonId: 'sci_lesson_3as_se_t3_bac_se_integration',
	defaultPoints: 8,
	isIntegration: true,
	onecRole: 'scientific_approach',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		// Authentic PSII D1 protein Ser264 -> Gly264 mutation computed live with transcribeAndTranslate!
		// Template 3'->5': TAC GGT AGC CAT TTC -> mRNA: AUG CCA UCG GUA AAG -> Met-Pro-Ser-Val-Lys
		// Mutant   3'->5': TAC GGT CCG CAT TTC -> mRNA: AUG CCA GGC GUA AAG -> Met-Pro-Gly-Val-Lys
		const variants = [
			{
				herbAr: 'الأترازين',
				sens3to5: 'TACGGTAGCCATTTC',
				res3to5: 'TACGGTCCGCATTTC',
				changeAr: 'استبدال السيرين القطبي (Ser) بالغليسين (Gly) في الموضع 264 من بروتين D1',
				o2SensHerb: 6,
				o2ResHerb: rng.pick([84, 88, 92])
			},
			{
				herbAr: 'الديورون (DCMU)',
				sens3to5: 'TACTTCTCGGAACTG',
				res3to5: 'TACTTCCCGGAACTG',
				changeAr: 'استبدال السيرين القطبي (Ser) بالغليسين (Gly) في موقع تثبيت البلاستوكينون من بروتين D1',
				o2SensHerb: 5,
				o2ResHerb: rng.pick([82, 86, 90])
			}
		];
		const v = rng.pick(variants);
		const sensSeq = transcribeAndTranslate(v.sens3to5);
		const resSeq = transcribeAndTranslate(v.res3to5);
		const codonTable = buildMiniCodonTableRows([...sensSeq.codons, ...resSeq.codons]);

		const o2CompSvg = svgBioCurvePlot({
			title: 'نشاط انطلاق الأكسجين بوجود مبيد الأعشاب',
			xMin: 0,
			xMax: 10,
			yMin: 0,
			yMax: 110,
			xStep: 2,
			yStep: 20,
			xLabel: 'C (umol/L)',
			yLabel: 'O₂ (%)',
			curves: [
				{ fn: (c) => v.o2ResHerb + (100 - v.o2ResHerb) * Math.exp(-c / 6), color: '#16a34a', label: 'سلالة مقاومة' },
				{ fn: (c) => v.o2SensHerb + (100 - v.o2SensHerb) * Math.exp(-c / 1.5), color: '#dc2626', dashed: true, label: 'سلالة حساسة' }
			]
		});
		const o2Url = saveSciencesSvgAsset(`sci_3as_se_t3_bacint_o2_${difficulty}_s${seed}`, o2CompSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;
		if (difficulty === 'easy') {
			finalAnswer = resSeq.peptideStr;
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: sensSeq.peptideStr, diagnosticFeedback: 'هذه السلسلة الببتيدية للسلالة الحساسة قبل الطفرة.' },
					{ text: [...resSeq.peptide].reverse().join(' - '), diagnosticFeedback: 'عكست اتجاه قراءة الـ ARNm.' },
					{ text: 'Met - Ala - Asp - Val - Glu', diagnosticFeedback: 'استعمل جدول الشفرة الوراثية للرامزات المعطاة.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في دراسة مقاومة العشب الضار لمبيد **${v.herbAr}**، تُعطى السلسلة المستنسخة لمورثة بروتين $\\text{D1}$ في السلالة المقاومة: \`${resSeq.dnaTriplets.join('-')}\`. ما متتالية الأحماض الأمينية الناتجة؟`,
				questionTextAr: 'اختر المتتالية الببتيدية للسلالة المقاومة:',
				imageUrl: o2Url,
				imageCaption: 'مقارنة انطلاق O₂ بين السلالتين الحساسة والمقاومة',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: `الـ ARNm الطافر هو \`${resSeq.codons.join('-')}\` ويُترجم إلى \`${resSeq.peptideStr}\` بينما الحساس هو \`${sensSeq.peptideStr}\`.`
			};
		} else {
			finalAnswer = 'تغيّر حمض أميني في موقع تثبيت المبيد على بروتين D1 يمنع ارتباط المبيد مع بقاء نقل الإلكترونات سليماً';
			const mcq = buildUniqueMcqOptions(
				finalAnswer,
				[
					{ text: 'توقف تام للتركيب الضوئي واستغناء السلالة المقاومة عن الضوء', diagnosticFeedback: 'السلالة المقاومة تواصل إطلاق O₂ بنسبة تفوق 80% في الإضاءة!' },
					{ text: 'إنتاج أجسام مضادة في الصانعة الخضراء ضد المبيد', diagnosticFeedback: 'النباتات لا تنتج أجساماً مضادة؛ المقاومة ناتجة عن طفرة في بروتين D1.' },
					{ text: 'غياب النظام الضوئي PSII تماماً من التيلاكوئيد', diagnosticFeedback: 'غياب PSII يمنع التحلل الضوئي للماء وانطلاق O₂.' }
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `كيف تفسر استمرار انطلاق $\\text{O}_2$ بنسبة $${v.o2ResHerb}\\%$ لدى السلالة المقاومة بوجود تركيز عالٍ من **${v.herbAr}**؟`,
				questionTextAr: 'اختر التفسير المدمج للمجالين 1 و 2:',
				imageUrl: o2Url,
				imageCaption: 'نشاط PSII بدلالة تركيز المبيد',
				questionData: { options: mcq.options, correctIndices: mcq.correctIndices, correctIndexes: mcq.correctIndices },
				explanation: finalAnswer
			};
		}

		const sujetExercise: ExerciseBlock = {
			points: 8,
			instruction: `لوحظ في بعض الحقول الزراعية ظهور سلالات من الأعشاب الضارة مقاومة تماماً لمبيد **${v.herbAr}** الذي يستهدف بروتين $upright("D1")$ في النظام الضوئي الثاني ($upright("PSII")$) بغشاء التيلاكوئيد. لتفسير الأصل الوراثي والبيوكيميائي لهذه المقاومة (دمج المجالين 1 و 2)، نعرض عليك المعطيات التالية.`,
			content: [
				{
					type: 'text',
					content: `**الجزء الأول**: 1) اقترح فرضية علمية تفسّر بها قدرة السلالة المقاومة على مواصلة التركيب الضوئي والنمو رغم رشّها بـ **${v.herbAr}**.`,
					answer: `1) **الفرضية**: حدوث طفرة وراثية في مورثة بروتين $upright("D1")$ للنظام الضوئي $upright("PSII")$ أدت لتغير موضعي في البنية الفراغية لموضع تثبيت ${v.herbAr} فمنعت ارتباطه، مع احتفاظ البروتين بقدرته على نقل الإلكترونات نحو $T_1$.`,
					mark: '1.5'
				},
				{
					type: 'columns',
					widths: ['1.15fr', '1fr'],
					children: [
						{ type: 'image', src: o2Url, caption: 'الوثيقة (1): نشاط انطلاق O₂ بدلالة تركيز المبيد' },
						{
							type: 'table',
							headers: ['السلالة', 'قطعة السلسلة المستنسخة لمورثة D1 (3\' → 5\')'],
							cells: [],
							rows: [
								['سلالة حساسة', sensSeq.dnaTriplets.join(' - ')],
								['سلالة مقاومة', resSeq.dnaTriplets.join(' - ')]
							],
							headerBackground: true,
							borders: 'grid',
							width: 'full'
						}
					]
				},
				{
					type: 'table',
					headers: codonTable.headers,
					cells: [],
					rows: codonTable.rows,
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `**الجزء الثاني**: 2) استخرج متتاليتي $upright("ARNm")$ والأحماض الأمينية لبروتين $upright("D1")$ في السلالتين الحساسة والمقاومة، ثم باستغلال الوثيقة (1) اشرح الآلية الجزيئية للمقاومة وصادق على فرضيتك.`,
					answer: `2) **الاستنساخ والترجمة**:\n- السلالة الحساسة: $upright("ARNm")$ = ${sensSeq.codons.join(' - ')} ← الببتيد: **${sensSeq.peptideStr}**.\n- السلالة المقاومة: $upright("ARNm")$ = ${resSeq.codons.join(' - ')} ← الببتيد: **${resSeq.peptideStr}**.\n- **تحليل الوثيقة (1) والتفسير**: في السلالة الحساسة ينهار انطلاق $upright("O")_2$ إلى $${v.o2SensHerb}\\%$ لأن ${v.herbAr} يرتبط تكاملياً ببروتين $upright("D1")$ (عبر رابطة هيدروجينية مع السيرين) ويحجب نقل الإلكترونات. أما في السلالة المقاومة فأدت طفرة الاستبدال إلى **${v.changeAr}**، ففقد الموقع قدرته على تثبيت ${v.herbAr} بينما بقي البلاستوكينون يتثبت فاستمر نقل الإلكترونات وانطلاق $upright("O")_2$ ($${v.o2ResHerb}\\%$) وإنتاج $upright("ATP/NADPH,H")^+$ وحلقة كالفن. ومنه **نصادق على صحة الفرضية**.`,
					mark: '5'
				},
				{
					type: 'text',
					content: `**الجزء الثالث**: 3) أنجز **مخططاً تحصيلياً مزدوجاً** يقارن بين السلالة الحساسة والسلالة المقاومة بوجود **${v.herbAr}**، مبرزاً العلاقة بين المورثة وبنية البروتين والتركيب الضوئي.`,
					answer: `3) **المخطط التحصيلي**:\n- **السلالة الحساسة**: مورثة $upright("D1")$ طبيعية ($upright("Ser")$) ← تثبت ${v.herbAr} على $upright("PSII")$ ← حجب نقل الإلكترونات ← توقف انطلاق $upright("O")_2$ و $upright("ATP/NADPH,H")^+$ ← توقف كالفن وموت العشب.\n- **السلالة المقاومة**: طفرة استبدال في $upright("D1")$ ($upright("Gly")$ بدل $upright("Ser")$) ← فقدان التكامل مع ${v.herbAr} ← استمرار نقل الإلكترونات ($upright("O")_2 = ${v.o2ResHerb}\\%$) وإنتاج $upright("ATP/NADPH,H")^+$ ← استمرار حلقة كالفن ونمو العشب.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't3',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			onecRole: 'scientific_approach',
			quizQuestion,
			sujetExercise,
			hints: [
				'قارن السلسلتين المستنسختين ثم ترجمهما بجدول الشفرة الوراثية المصغر لتحديد الحمض المستبدَل.',
				'الطفرة تمنع تثبت المبيد في بروتين D1 لكنها لا تعطل وظيفة نقل الإلكترونات في PSII.',
				'أبرز في المخطط التحصيلي الربط بين المجال 1 (طفرة ← بنية D1) والمجال 2 (استمرار المرحلة الكيموضوئية وكالفن).'
			],
			solutionStepsAr: [
				`الحساسة: ${sensSeq.peptideStr} | المقاومة: ${resSeq.peptideStr}.`,
				`الطفرة: ${v.changeAr}.`,
				`استمرار انطلاق O₂ بنسبة ${v.o2ResHerb}% يثبت منع ارتباط ${v.herbAr} وبقاء التركيب الضوئي نشطاً.`
			],
			finalAnswer
		};
	}
};

export const SCIENCES_TEMPLATES_3AS_SE_T3: SciencesParameterizedTemplate[] = [
	tplRecallChloroplast,
	tplReasoningCalvin,
	tplApproachHerbicides,
	tplRecallMitochondria,
	tplApproachOxPhos,
	tplReasoningPlateTectonics,
	tplApproachBacSeCrossDomain
];
