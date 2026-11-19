import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { SHARED_SCIENCES_TEMPLATES_2AS_T1 } from '../../secondary_shared_2as/templates/t1';
import { saveSciencesSvgAsset, svgPhysiologyDiagram } from '../../svg-sciences';

function rescaleBlocksForMath(content: ContentBlock[], targetPoints: number): ContentBlock[] {
	const markIndices: number[] = [];
	const origMarks: number[] = [];
	content.forEach((b, i) => {
		if ('mark' in b && b.mark !== undefined) {
			const val = Number.parseFloat(String(b.mark));
			if (Number.isFinite(val) && val > 0) {
				markIndices.push(i);
				origMarks.push(val);
			}
		}
	});
	const origTotal = origMarks.reduce((a, b) => a + b, 0);
	if (!markIndices.length || origTotal <= 0) return content;

	const factor = targetPoints / origTotal;
	const scaled = origMarks.map((m) => Math.max(0.5, Math.round(m * factor * 4) / 4));
	const diff = Math.round((targetPoints - scaled.reduce((a, b) => a + b, 0)) * 4) / 4;
	scaled[scaled.length - 1] = Math.round((scaled[scaled.length - 1] + diff) * 4) / 4;

	const out = content.map((b) => ({ ...b })) as ContentBlock[];
	markIndices.forEach((idx, k) => {
		const block = out[idx] as ContentBlock & { mark?: string };
		block.mark = Number.isInteger(scaled[k]) ? scaled[k].toFixed(1) : String(scaled[k]);
	});

	// Update part header point labels to match exact sum of marks inside each part
	const partHeaderIndices: number[] = [];
	out.forEach((b, i) => {
		if (b.type === 'text' && /^الجزء\s+(الأول|الثاني|الثالث)\s*\([^)]+\)/.test(b.content)) {
			partHeaderIndices.push(i);
		}
	});
	partHeaderIndices.forEach((pIdx, pPos) => {
		const nextIdx = pPos + 1 < partHeaderIndices.length ? partHeaderIndices[pPos + 1] : out.length;
		let partSum = 0;
		for (let j = pIdx; j < nextIdx; j++) {
			const blk = out[j];
			if ('mark' in blk && blk.mark) {
				const v = Number.parseFloat(blk.mark);
				if (Number.isFinite(v)) partSum += v;
			}
		}
		partSum = Math.round(partSum * 4) / 4;
		const hdr = out[pIdx];
		if (hdr.type === 'text' && partSum > 0) {
			const fmt = Number.isInteger(partSum) ? partSum.toFixed(1) : String(partSum);
			hdr.content = hdr.content.replace(
				/^(الجزء\s+(?:الأول|الثاني|الثالث))\s*\([^)]+\)/,
				`$1 (${fmt} نقاط)`
			);
		}
	});

	return out;
}

function adaptSharedMathT1(
	base: SciencesParameterizedTemplate,
	targetPoints: 8 | 12,
	overrideRole?: 'recall' | 'reasoning' | 'scientific_approach'
): SciencesParameterizedTemplate {
	const adapted = adaptSciencesTemplateForTrack(base, '2as_math');
	const role = overrideRole ?? base.onecRole;
	return {
		...adapted,
		defaultPoints: targetPoints,
		onecRole: role,
		generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
			const out = adapted.generate(seed, difficulty);
			return {
				...out,
				onecRole: role,
				sujetExercise: {
					...out.sujetExercise,
					points: targetPoints,
					content: rescaleBlocksForMath(out.sujetExercise.content, targetPoints)
				}
			};
		}
	};
}

// ============================================================================
// Dedicated 2AS MATH T1 Recall Template (8 pts — Exercise 1 in 8+12 MATH format)
// ============================================================================

export const tpl2asMathT1GlycemiaLoopRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_math_t1_glycemia_loop_recall',
	grade: '2as_math',
	trimesterId: 't1',
	domain: 'hormonal_regulation',
	titleAr: 'التنظيم الهرموني: حلقة التنظيم الذاتي لتحلون الدم (الأنسولين والغلوكاغون)',
	curriculumLessonId: 'sci_lesson_2as_math_t1_glycemia_loop_diabetes',
	defaultPoints: 8,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const highGlyc = rng.pick(difficulty === 'easy' ? [1.6, 1.8] : [1.55, 1.75, 1.9]);
		const lowGlyc = rng.pick([0.65, 0.7, 0.72]);

		const svg = svgPhysiologyDiagram('glycemia_loop', {
			title: 'مخطط حلقة التنظيم الذاتي لتحلون الدم'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_math_t1_glycemia_loop_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`في الإفراط السكري ($${highGlyc}\\text{ g/L}$) تفرز خلايا $\\beta$ الأنسولين لتخزين الغلوكوز، وفي القصور ($${lowGlyc}\\text{ g/L}$) تفرز خلايا $\\alpha$ الغلوكاغون لإماهة الغليكوجين الكبدي`,
			[
				{
					text: `في الإفراط السكري ($${highGlyc}\\text{ g/L}$) تفرز خلايا $\\alpha$ الغلوكاغون لتخزين الغلوكوز في الكبد`,
					diagnosticFeedback: 'الإفراط السكري ينشط خلايا β المفرزة للأنسولين وليس خلايا α المفرزة للغلوكاغون.'
				},
				{
					text: 'تقوم العضلات بإماهة غليكوجينها وتحرير الغلوكوز في الدم لتصحيح القصور السكري',
					diagnosticFeedback: 'العضلات تستهلك غليكوجينها لنشاطها الخاص فقط؛ الكبد هو العضو المنفذ المحرر للغلوكوز في الدم.'
				},
				{
					text: 'يتحكم الجهاز العصبي وحده في ضبط تحلون الدم دون أي هرمونات بنكرياسية',
					diagnosticFeedback: 'تنظيم تحلون الدم تنظيم هرموني ذاتي تتحكم فيه خلايا α و β بجزر لانغرهانس.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: 'الوثيقة (1): مخطط وظيفي لحلقة التنظيم الذاتي لتحلون الدم',
				width: 360
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الوثيقة (1)، حدّد عناصر **الجهاز المنظَّم** و**الجهاز المنظِّم** (اللواقط الحساسة، جهاز الاتصال، والأعضاء المنفذة) في حلقة التنظيم الذاتي لتحلون الدم، وقارن الاستجابة التصحيحية في حالتي الإفراط السكري ($${highGlyc}" g/L"$) والقصور السكري ($${lowGlyc}" g/L"$).`,
				answer: `1) عناصر نظام التنظيم الذاتي والمقارنة:\n- **الجهاز المنظَّم**: الدم (الوسط الداخلي) بقيمة مرجعية للغلوكوز $approx 1" g/L"$.\n- **الجهاز المنظِّم**:\n  • اللواقط الحساسة: خلايا $beta$ المركزية وخلايا $alpha$ المحيطية في جزر لانغرهانس.\n  • جهاز الاتصال: الدم الناقل للهرمونات (الأنسولين والغلوكاغون).\n  • الأعضاء المنفذة: الكبد والعضلات والنسيج الدهني (للإفراط)، والكبد أساساً (للقصور).\n- المقارنة: عند $${highGlyc}" g/L"$ يُفرز الأنسولين لتنشيط دخول الغلوكوز وتخزينه كغليكوجين ودسم؛ وعند $${lowGlyc}" g/L"$ يُفرز الغلوكاغون لتحفيز إماهة الغليكوجين الكبدي وتحرير الغلوكوز في الدم.`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً (مقدمة، عرض، خاتمة) تشرح فيه كيف يعمل البنكرياس والكبد والعضلات والنسيج الدهني في إطار حلقة تنظيم ذاتي للحفاظ على ثبات تحلون الدم حول $1" g/L"$ رغم تناوب الوجبات وفترات الصيام.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: رغم التغيرات اليومية في الإمداد الغذائي والنشاط العضلي، يحافظ الجسم على ثبات تحلون الدم قريباً من $1" g/L"$. فكيف تضمن حلقة التنظيم الذاتي الهرموني هذا التوازن المستمر؟\n- العرض: يعمل البنكرياس عبر جزر لانغرهانس كمنظّم مزدوج (لاقط حساس ومنفذ إفرازي). بعد وجبة غذائية (إفراط سكري مثل $${highGlyc}" g/L"$), تتحسس الخلايا $beta$ المركزية الارتفاع فتفرز الأنسولين في الدم؛ يرفع الأنسولين نفاذية خلايا الكبد والعضلات والنسيج الدهني للغلوكوز وينشّط تخزينه على شكل غليكوجين وثلاثي غليسيريد، مما يعيد تحلون الدم إلى $1" g/L"$. وبالمقابل، أثناء الصيام أو الجهد العضلي (قصور سكري مثل $${lowGlyc}" g/L"$), تتحسس الخلايا $alpha$ المحيطية الانخفاض فتفرز الغلوكاغون الذي يحفز إماهة الغليكوجين الكبدي وتحرير الغلوكوز في الدم ليعود إلى القيمة المرجعية.\n- الخاتمة: يضمن العمل المتضاد والمتكامل للأنسولين والغلوكاغون ضمن حلقة التنظيم الذاتي الحفاظ على توازن الوسط الداخلي وتغذية الخلايا.`,
				mark: '5.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `انطلاقاً من حلقة التنظيم الذاتي لتحلون الدم (الوثيقة 1)، كيف تتدخل جزر لانغرهانس والأعضاء المنفذة عند تسجيل $${highGlyc}\\text{ g/L}$ (إفراط) وعند تسجيل $${lowGlyc}\\text{ g/L}$ (قصور)؟`,
				questionTextAr: 'اختر الآلية التنظيمية الصحيحة في الحالتين:',
				imageUrl: svgUrl,
				imageCaption: 'حلقة التنظيم الذاتي لتحلون الدم',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عند الإفراط ($${highGlyc}\\text{ g/L}$) تفرز خلايا $\\beta$ الأنسولين لتخزين الغلوكوز، وعند القصور ($${lowGlyc}\\text{ g/L}$) تفرز خلايا $\\alpha$ الغلوكاغون لتحرير الغلوكوز من الغليكوجين الكبدي.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُعدّ تنظيم تحلون الدم حول القيمة المرجعية $1" g/L"$ نموذجاً مثالياً لأنظمة التنظيم الذاتي البيولوجية (الوثيقة 1).`,
				content
			},
			hints: [
				'فرّق بدقة بين الجهاز المنظَّم (الدم والغلوكوز) والجهاز المنظِّم (لواقط + اتصال دموي + منفذات).',
				'تذكّر أن الكبد وحده يحرر الغلوكوز في الدم أثناء الصيام تحت تأثير الغلوكاغون.',
				'نظّم النص العلمي ليشمل حالتي الإفراط السكري والقصور السكري بوضوح.'
			],
			solutionStepsAr: [
				'تحديد عناصر الجهاز المنظَّم والجهاز المنظِّم ومقارنة الإفراط والقصور.',
				'تحرير النص العلمي المهيكل حول التنظيم الذاتي لتحلون الدم.'
			],
			finalAnswer: 'إفراط: خلايا β ← أنسولين (تخزين) | قصور: خلايا α ← غلوكاغون (إماهة كبدية)'
		};
	}
};

// 5 Focused Templates for 2AS MATH T1 (8 + 12 = 20 pts two-exercise format!)
export const SCIENCES_TEMPLATES_2AS_MATH_T1: SciencesParameterizedTemplate[] = [
	adaptSharedMathT1(SHARED_SCIENCES_TEMPLATES_2AS_T1[0], 8, 'recall'),
	tpl2asMathT1GlycemiaLoopRecall,
	adaptSharedMathT1(SHARED_SCIENCES_TEMPLATES_2AS_T1[1], 8, 'reasoning'),
	adaptSharedMathT1(SHARED_SCIENCES_TEMPLATES_2AS_T1[2], 12, 'scientific_approach'),
	adaptSharedMathT1(SHARED_SCIENCES_TEMPLATES_2AS_T1[3], 12, 'scientific_approach')
];
