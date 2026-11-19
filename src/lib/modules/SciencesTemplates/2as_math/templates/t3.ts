import type { ContentBlock } from '../../../SujetBuilder/types';
import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import { adaptSciencesTemplateForTrack } from '../../types';
import { SHARED_SCIENCES_TEMPLATES_2AS_T3 } from '../../secondary_shared_2as/templates/t3';

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

function adaptSharedMathT3(
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

// 4 Focused Templates for 2AS MATH T3 (8 + 12 = 20 pts two-exercise format!)
export const SCIENCES_TEMPLATES_2AS_MATH_T3: SciencesParameterizedTemplate[] = [
	adaptSharedMathT3(SHARED_SCIENCES_TEMPLATES_2AS_T3[0], 8, 'recall'),
	adaptSharedMathT3(SHARED_SCIENCES_TEMPLATES_2AS_T3[1], 8, 'reasoning'),
	adaptSharedMathT3(SHARED_SCIENCES_TEMPLATES_2AS_T3[2], 12, 'scientific_approach'),
	adaptSharedMathT3(SHARED_SCIENCES_TEMPLATES_2AS_T3[3], 12, 'scientific_approach')
];
