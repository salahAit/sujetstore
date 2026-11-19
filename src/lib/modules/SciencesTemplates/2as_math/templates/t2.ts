import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { SHARED_SCIENCES_TEMPLATES_2AS_T2 } from '../../secondary_shared_2as/templates/t2';
import { saveSciencesSvgAsset, svgGeneticsDiagram } from '../../svg-sciences';

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

function adaptSharedMathT2(
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
// Dedicated 2AS MATH T2 Recall Template (8 pts — Exercise 1 in 8+12 MATH format)
// ============================================================================

export const tpl2asMathT2MeiosisRecall: SciencesParameterizedTemplate = {
	id: 'sci_tpl_2as_math_t2_meiosis_recall',
	grade: '2as_math',
	trimesterId: 't2',
	domain: 'reproduction_genetics',
	titleAr: 'أسس التنوع البيولوجي: الانقسام المنصف، آليتا الاختلاط الصبغي وحساب التراكيب',
	curriculumLessonId: 'sci_lesson_2as_math_t2_meiosis_diversity',
	defaultPoints: 8,
	onecRole: 'recall',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const twoN = rng.pick(difficulty === 'easy' ? [6, 8] : [8, 10, 12]);
		const n = twoN / 2;
		const gametes = Math.pow(2, n);
		const zygotes = Math.pow(2, twoN);

		const svg = svgGeneticsDiagram('meiosis_stages', {
			title: 'مراحل الانقسام المنصف واختزال الصيغة الصبغية'
		});
		const svgUrl = saveSciencesSvgAsset(`sci_2as_math_t2_meiosis_s${seed}_${difficulty}`, svg);

		const mcq = buildUniqueMcqOptions(
			`ينتج 4 أمشاج أحادية ($n = ${n}$)، ويعطي الاختلاط بين الصبغي $2^{${n}} = ${gametes}$ نمطاً للأمشاج و $2^{${twoN}} = ${zygotes}$ تركيبة للبيضة الملقحة`,
			[
				{
					text: `ينتج خليتان ثنائيتا الصيغة ($2n = ${twoN}$) ويعطي الاختلاط بين الصبغي $${twoN}$ أنماط فقط`,
					diagnosticFeedback: 'الانقسام المنصف ينتج 4 أمشاج أحادية (n) وعدد أنماطها بالاختلاط بين الصبغي هو 2 أس n.'
				},
				{
					text: `يعطي الاختلاط بين الصبغي $2^{${twoN}} = ${zygotes}$ نمطاً للأمشاج عند أحد الأبوين وحده`,
					diagnosticFeedback: `عدد أنماط الأمشاج عند كل أب هو 2 أس n (${gametes})، أما 2 أس 2n (${zygotes}) فهو عدد تراكيب البيضة الملقحة.`
				},
				{
					text: 'يحدث العبور الصبغي في المرحلة النهائية الثانية فقط',
					diagnosticFeedback: 'يحدث العبور (الاختلاط داخل الصبغي) في المرحلة التمهيدية I أثناء تشكل الرباعيات.'
				}
			],
			rng
		);

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: svgUrl,
				caption: `الوثيقة (1): رسم تخطيطي لمراحل الانقسام المنصف لخلية أم للأمشاج ($2n = ${twoN}$)`,
				width: 360
			},
			{
				type: 'text',
				content: `1) انطلاقاً من الوثيقة (1) لنوع حي صيغته $2n = ${twoN}$، قارن بين الانقسام الاختزالي (I) والانقسام المتساوي (II)، ثم احسب عدد أنماط الأمشاج بالاختلاط بين الصبغي ($2^n$) وعدد التراكيب الممكنة للبيضة الملقحة ($2^(2n)$).`,
				answer: `1) المقارنة والحساب:\n- الانقسام الاختزالي (I): تفترق فيه الصبغيات المتماثلة المضاعفة دون انشطار الجزء المركزي ($2n = ${twoN} arrow.r n = ${n}$ صبغي مضاعف).\n- الانقسام المتساوي (II): ينشطر الجزء المركزي وتنفصل الكروماتيدات الشقيقة ($n = ${n}$ صبغي بسيط في 4 أمشاج أحادية).\n- الحساب التوافقي (حيث $n = ${n}$):\n  • عدد أنماط الأمشاج بالاختلاط بين الصبغي: $2^n = 2^${n} = ${gametes}$ نمطاً.\n  • عدد تراكيب البيضة الملقحة عند الإلقاح: $2^(2n) = 2^${twoN} = ${zygotes}$ تركيبة محتملة.`,
				mark: '3.0'
			},
			{
				type: 'text',
				content: `2) اكتب نصاً علمياً مهيكلاً تبيّن فيه كيف يضمن تعاقب الانقسام المنصف (بآليتي الاختلاط داخل الصبغي وبين الصبغي) والإلقاح العشوائي استمرارية النوع مع التفرد الوراثي لكل فرد.`,
				answer: `2) النص العلمي المهيكل:\n- المقدمة والإشكالية: يحافظ التكاثر الجنسي على الصيغة الصبغية المميزة للنوع ($2n = ${twoN}$) مع توليد تنوع هائل بين الأفراد. فكيف يحقق الانقسام المنصف والإلقاح هذا التوازن بين الثبات والتنوع؟\n- العرض: يتألف الانقسام المنصف من انقسامين متتاليين مسبوقين بتضاعف وحيد للـ $upright("ADN")$، فيختزل الصيغة من $2n$ إلى $n$ ويحدث خلاله نوعان من الاختلاط: (1) **الاختلاط داخل الصبغي (العبور)** في التمهيدية I بتبادل قطع كروماتيدية بين الصبغيات المتماثلة المقترنة مما يولّد توليفات أليلية جديدة؛ (2) **الاختلاط بين الصبغي** في الانفصالية I بالتوزع العشوائي المستقل للأزواج الصبغية ($2^${n} = ${gametes}$ نمطاً مختلفاً للأمشاج دون احتساب العبور). وعند **الإلقاح** يلتقي مشيجان أحاديان عشوائياً ($n + n = 2n$) فتُستعاد الصيغة الصبغية للنوع وتتضاعف التراكيب الوراثية الممكنة إلى $2^${twoN} = ${zygotes}$ تركيبة فأكثر بفضل العبور.\n- الخاتمة: يضمن تكامل الانقسام المنصف والإلقاح ثبات الصيغة الصبغية للنوع والتفرد الوراثي لكل كائن حي.`,
				mark: '5.0'
			}
		];

		return {
			templateId: this.id,
			seed,
			grade: '2as_math',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: `في نوع حي صيغته الصبغية $2n = ${twoN}$ (الوثيقة 1)، ما عدد الأمشاج الناتجة عن خلية أم واحدة، وما عدد التراكيب الممكنة للأمشاج ($2^n$) وللبيوض الملقحة ($2^{2n}$) بالاختلاط بين الصبغي وحده؟`,
				questionTextAr: 'اختر الإجابة الرياضية والبيولوجية الصحيحة:',
				imageUrl: svgUrl,
				imageCaption: 'مراحل الانقسام المنصف',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تنتج 4 أمشاج بصيغة $n = ${n}$، ويعطي الاختلاط بين الصبغي $2^{${n}} = ${gametes}$ نمطاً للأمشاج و $2^{${twoN}} = ${zygotes}$ تركيبة ممكنة للبيضة الملقحة.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يشكّل الانقسام المنصف (الوثيقة 1) والإلقاح الأساس الخلوي والرياضي للتنوع البيولوجي عند الكائنات ثنائية الصيغة الصبغية.`,
				content
			},
			hints: [
				`اقسم $2n = ${twoN}$ على 2 لتحديد $n = ${n}$.`,
				'احسب $2^n$ لعدد أنماط الأمشاج و $2^{2n}$ لعدد التراكيب بعد الإلقاح.',
				'أبرز في النص العلمي مرحلتي الاختلاط: التمهيدية I (عبور) والانفصالية I (توزع مستقل).'
			],
			solutionStepsAr: [
				'مقارنة الانقسام I (اختزالي) والانقسام II (متساوٍ).',
				`حساب $2^{${n}} = ${gametes}$ مشيجاً و $2^{${twoN}} = ${zygotes}$ بيضة ملقحة.`,
				'تحرير النص العلمي المهيكل حول ثبات النوع والتنوع الوراثي.'
			],
			finalAnswer: `2^{${n}} = ${gametes}\\text{ أمشاج}\\; ;\\; 2^{${twoN}} = ${zygotes}\\text{ بيوض ملقحة}`
		};
	}
};

// 5 Focused Templates for 2AS MATH T2 (8 + 12 = 20 pts two-exercise format!)
export const SCIENCES_TEMPLATES_2AS_MATH_T2: SciencesParameterizedTemplate[] = [
	adaptSharedMathT2(SHARED_SCIENCES_TEMPLATES_2AS_T2[0], 8, 'recall'),
	tpl2asMathT2MeiosisRecall,
	adaptSharedMathT2(SHARED_SCIENCES_TEMPLATES_2AS_T2[1], 8, 'reasoning'),
	adaptSharedMathT2(SHARED_SCIENCES_TEMPLATES_2AS_T2[2], 12, 'scientific_approach'),
	adaptSharedMathT2(SHARED_SCIENCES_TEMPLATES_2AS_T2[3], 12, 'scientific_approach')
];
