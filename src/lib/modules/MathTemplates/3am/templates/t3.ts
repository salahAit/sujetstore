import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import type { ContentBlock, TableCell } from '../../../SujetBuilder/types';
import { SeededRng, buildUniqueMcqOptions, lcm, roundTo, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgBarChart, svgGridPoints } from '../../svg-helpers';

const PI = 3.14;

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function fmtNum(n: number): string {
	const r = roundTo(n, 3);
	return Object.is(r, -0) ? '0' : String(r);
}

function acceptNum(n: number): string[] {
	const s = fmtNum(n);
	return s.includes('.') ? [s, s.replace('.', ',')] : [s];
}

function fmtFracKatex(num: number, den: number): string {
	const [n, d] = simplifyFraction(num, den);
	if (d === 1) return `${n}`;
	return n < 0 ? `-\\frac{${Math.abs(n)}}{${d}}` : `\\frac{${n}}{${d}}`;
}

function fmtFracTypst(num: number, den: number): string {
	const [n, d] = simplifyFraction(num, den);
	if (d === 1) return `${n}`;
	return n < 0 ? `-frac(${Math.abs(n)}, ${d})` : `frac(${n}, ${d})`;
}

/** Formats a*x + b cleanly without "+ -" or "+ 0". Valid in both KaTeX and Typst math. */
function fmtLinearExpr(a: number, b: number, variable = 'x'): string {
	let head = '';
	if (a !== 0) {
		if (a === 1) head = variable;
		else if (a === -1) head = `-${variable}`;
		else head = `${a}${variable}`;
	}
	if (b === 0) return head || '0';
	if (!head) return `${b}`;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

/** Formats signed second term b after an expression, e.g. " + 3" or " - 4". */
function fmtSignedConst(b: number): string {
	if (b === 0) return '';
	return b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
}

/** Custom SVG: Translation arrow A -> B with triangle MNP -> M'N'P' or circle (C) -> (C'). */
function svgTranslationDiagram(
	opts:
		| {
				mode: 'triangle';
				triLabel?: [string, string, string];
				sideMNLabel: string;
				sideMPLabel: string;
				angleLabel: string;
				shiftLabel: string;
		  }
		| {
				mode: 'circle';
				radiusLabel: string;
				shiftLabel: string;
		  }
): string {
	const w = 340;
	const h = 205;
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`
	];

	if (opts.mode === 'triangle') {
		const [mLbl, nLbl, pLbl] = opts.triLabel || ['M', 'N', 'P'];
		const A = { x: 42, y: 165 };
		const B = { x: 148, y: 139 };
		const M = { x: 74, y: 110 };
		const N = { x: 74, y: 46 };
		const P = { x: 146, y: 110 };
		const dx = B.x - A.x;
		const dy = B.y - A.y;
		const Mp = { x: M.x + dx, y: M.y + dy };
		const Np = { x: N.x + dx, y: N.y + dy };
		const Pp = { x: P.x + dx, y: P.y + dy };

		// Translation guide lines (parallelogram ABM'M)
		parts.push(
			`<line x1="${M.x}" y1="${M.y}" x2="${Mp.x}" y2="${Mp.y}" stroke="#94a3b8" stroke-dasharray="4 3" stroke-width="1.4"/>`,
			`<line x1="${A.x}" y1="${A.y}" x2="${M.x}" y2="${M.y}" stroke="#cbd5e1" stroke-dasharray="3 3" stroke-width="1.2"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${Mp.x}" y2="${Mp.y}" stroke="#cbd5e1" stroke-dasharray="3 3" stroke-width="1.2"/>`
		);

		// A -> B shift segment with directional head
		parts.push(
			`<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#dc2626" stroke-width="2.4"/>`,
			`<polygon points="${B.x},${B.y} ${B.x - 10},${B.y - 2} ${B.x - 7},${B.y + 7}" fill="#dc2626"/>`,
			`<circle cx="${A.x}" cy="${A.y}" r="3.8" fill="#dc2626"/>`,
			`<circle cx="${B.x}" cy="${B.y}" r="3.8" fill="#dc2626"/>`,
			`<text x="${A.x - 14}" y="${A.y + 14}" font-size="12" font-weight="bold" fill="#dc2626">A</text>`,
			`<text x="${B.x + 6}" y="${B.y + 15}" font-size="12" font-weight="bold" fill="#dc2626">B</text>`,
			`<text x="${(A.x + B.x) / 2}" y="${(A.y + B.y) / 2 + 22}" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c">${escapeXml(opts.shiftLabel)}</text>`
		);

		// Original right triangle MNP
		parts.push(
			`<polygon points="${M.x},${M.y} ${N.x},${N.y} ${P.x},${P.y}" fill="#dbeafe" fill-opacity="0.75" stroke="#1d4ed8" stroke-width="2"/>`,
			`<rect x="${M.x}" y="${M.y - 10}" width="10" height="10" fill="none" stroke="#1d4ed8" stroke-width="1.4"/>`,
			`<text x="${M.x - 14}" y="${M.y + 12}" font-size="12" font-weight="bold" fill="#1e3a8a">${escapeXml(mLbl)}</text>`,
			`<text x="${N.x - 14}" y="${N.y - 4}" font-size="12" font-weight="bold" fill="#1e3a8a">${escapeXml(nLbl)}</text>`,
			`<text x="${P.x + 4}" y="${P.y + 14}" font-size="12" font-weight="bold" fill="#1e3a8a">${escapeXml(pLbl)}</text>`,
			`<text x="${M.x - 36}" y="${(M.y + N.y) / 2 + 4}" font-size="10.5" font-weight="bold" fill="#1e293b">${escapeXml(opts.sideMNLabel)}</text>`,
			`<text x="${(M.x + P.x) / 2}" y="${M.y + 14}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e293b">${escapeXml(opts.sideMPLabel)}</text>`,
			`<text x="${P.x - 28}" y="${P.y - 6}" font-size="10" font-weight="bold" fill="#dc2626">${escapeXml(opts.angleLabel)}</text>`
		);

		// Image triangle M'N'P'
		parts.push(
			`<polygon points="${Mp.x},${Mp.y} ${Np.x},${Np.y} ${Pp.x},${Pp.y}" fill="#dcfce7" fill-opacity="0.78" stroke="#15803d" stroke-width="2"/>`,
			`<rect x="${Mp.x}" y="${Mp.y - 10}" width="10" height="10" fill="none" stroke="#15803d" stroke-width="1.4"/>`,
			`<text x="${Mp.x - 15}" y="${Mp.y + 15}" font-size="12" font-weight="bold" fill="#166534">${escapeXml(mLbl)}'</text>`,
			`<text x="${Np.x - 4}" y="${Np.y - 6}" font-size="12" font-weight="bold" fill="#166534">${escapeXml(nLbl)}'</text>`,
			`<text x="${Pp.x + 5}" y="${Pp.y + 12}" font-size="12" font-weight="bold" fill="#166534">${escapeXml(pLbl)}'</text>`
		);
	} else {
		const A = { x: 64, y: 170 };
		const B = { x: 204, y: 150 };
		const O = { x: 96, y: 88 };
		const Op = { x: 236, y: 68 };
		const R = 42;

		parts.push(
			`<line x1="${O.x}" y1="${O.y}" x2="${Op.x}" y2="${Op.y}" stroke="#64748b" stroke-dasharray="4 3" stroke-width="1.5"/>`,
			`<line x1="${A.x}" y1="${A.y}" x2="${O.x}" y2="${O.y}" stroke="#cbd5e1" stroke-dasharray="3 3" stroke-width="1.2"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${Op.x}" y2="${Op.y}" stroke="#cbd5e1" stroke-dasharray="3 3" stroke-width="1.2"/>`,
			`<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#dc2626" stroke-width="2.4"/>`,
			`<polygon points="${B.x},${B.y} ${B.x - 10},${B.y - 3} ${B.x - 8},${B.y + 6}" fill="#dc2626"/>`,
			`<circle cx="${A.x}" cy="${A.y}" r="3.8" fill="#dc2626"/>`,
			`<circle cx="${B.x}" cy="${B.y}" r="3.8" fill="#dc2626"/>`,
			`<text x="${A.x - 14}" y="${A.y + 14}" font-size="12" font-weight="bold" fill="#dc2626">A</text>`,
			`<text x="${B.x + 6}" y="${B.y + 14}" font-size="12" font-weight="bold" fill="#dc2626">B</text>`,
			`<text x="${(A.x + B.x) / 2}" y="${(A.y + B.y) / 2 + 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c">${escapeXml(opts.shiftLabel)}</text>`,
			`<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="#dbeafe" fill-opacity="0.45" stroke="#1d4ed8" stroke-width="2"/>`,
			`<circle cx="${O.x}" cy="${O.y}" r="3.5" fill="#1d4ed8"/>`,
			`<line x1="${O.x}" y1="${O.y}" x2="${O.x + R}" y2="${O.y}" stroke="#1d4ed8" stroke-width="1.6"/>`,
			`<text x="${O.x - 14}" y="${O.y - 4}" font-size="12" font-weight="bold" fill="#1e3a8a">O</text>`,
			`<text x="${O.x + R / 2}" y="${O.y - 6}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${escapeXml(opts.radiusLabel)}</text>`,
			`<text x="${O.x - R - 14}" y="${O.y - R + 10}" font-size="11" font-weight="bold" fill="#1d4ed8">(C)</text>`,
			`<circle cx="${Op.x}" cy="${Op.y}" r="${R}" fill="#dcfce7" fill-opacity="0.45" stroke="#15803d" stroke-width="2"/>`,
			`<circle cx="${Op.x}" cy="${Op.y}" r="3.5" fill="#15803d"/>`,
			`<line x1="${Op.x}" y1="${Op.y}" x2="${Op.x + R}" y2="${Op.y}" stroke="#15803d" stroke-width="1.6"/>`,
			`<text x="${Op.x - 16}" y="${Op.y - 4}" font-size="12" font-weight="bold" fill="#166534">O'</text>`,
			`<text x="${Op.x + R + 4}" y="${Op.y - R + 12}" font-size="11" font-weight="bold" fill="#15803d">(C')</text>`
		);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/** Custom SVG: Pyramid or Cone of revolution in cavalier perspective (3AM T3). */
function svgPyramidOrCone(
	opts:
		| {
				kind: 'pyramid';
				baseLabelA: string;
				baseLabelB?: string;
				heightLabel: string;
				slantLabel?: string;
		  }
		| {
				kind: 'cone';
				radiusLabel: string;
				heightLabel: string;
				slantLabel?: string;
		  }
): string {
	const w = 260;
	const h = 195;
	const parts: string[] = [
		`<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`
	];

	if (opts.kind === 'pyramid') {
		const S = { x: 130, y: 28 };
		const A = { x: 54, y: 152 };
		const B = { x: 166, y: 152 };
		const C = { x: 208, y: 118 };
		const D = { x: 96, y: 118 };
		const H = { x: 131, y: 135 };
		const M = { x: 187, y: 135 };

		parts.push(
			`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" fill="#dbeafe" fill-opacity="0.55" stroke="#1d4ed8" stroke-width="1.7"/>`,
			`<line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#64748b" stroke-dasharray="4 3" stroke-width="1.4"/>`,
			`<line x1="${D.x}" y1="${D.y}" x2="${C.x}" y2="${C.y}" stroke="#64748b" stroke-dasharray="4 3" stroke-width="1.4"/>`,
			`<line x1="${D.x}" y1="${D.y}" x2="${S.x}" y2="${S.y}" stroke="#94a3b8" stroke-dasharray="4 3" stroke-width="1.4"/>`,
			`<line x1="${A.x}" y1="${A.y}" x2="${S.x}" y2="${S.y}" stroke="#1d4ed8" stroke-width="2"/>`,
			`<line x1="${B.x}" y1="${B.y}" x2="${S.x}" y2="${S.y}" stroke="#1d4ed8" stroke-width="2"/>`,
			`<line x1="${C.x}" y1="${C.y}" x2="${S.x}" y2="${S.y}" stroke="#1d4ed8" stroke-width="2"/>`,
			`<line x1="${S.x}" y1="${S.y}" x2="${H.x}" y2="${H.y}" stroke="#dc2626" stroke-dasharray="4 3" stroke-width="2"/>`,
			`<polyline points="${H.x},${H.y - 8} ${H.x + 8},${H.y - 8} ${H.x + 8},${H.y}" fill="none" stroke="#dc2626" stroke-width="1.3"/>`,
			`<circle cx="${S.x}" cy="${S.y}" r="3.5" fill="#0f172a"/>`,
			`<circle cx="${H.x}" cy="${H.y}" r="3" fill="#dc2626"/>`,
			`<text x="${S.x + 8}" y="${S.y + 2}" font-size="12" font-weight="bold" fill="#0f172a">S</text>`,
			`<text x="${H.x - 14}" y="${H.y + 4}" font-size="11" font-weight="bold" fill="#dc2626">H</text>`,
			`<text x="${S.x + 6}" y="${(S.y + H.y) / 2 + 4}" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.heightLabel)}</text>`,
			`<text x="${(A.x + B.x) / 2}" y="${A.y + 18}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">${escapeXml(opts.baseLabelA)}</text>`
		);
		if (opts.baseLabelB) {
			parts.push(
				`<text x="${B.x + 28}" y="${(B.y + C.y) / 2 + 6}" font-size="11" font-weight="bold" fill="#1e3a8a">${escapeXml(opts.baseLabelB)}</text>`
			);
		}
		if (opts.slantLabel) {
			parts.push(
				`<line x1="${S.x}" y1="${S.y}" x2="${M.x}" y2="${M.y}" stroke="#059669" stroke-dasharray="3 2" stroke-width="1.6"/>`,
				`<text x="${(S.x + M.x) / 2 + 12}" y="${(S.y + M.y) / 2}" font-size="10.5" font-weight="bold" fill="#047857">${escapeXml(opts.slantLabel)}</text>`
			);
		}
	} else {
		const S = { x: 126, y: 28 };
		const O = { x: 126, y: 145 };
		const rx = 68;
		const ry = 20;
		const L = { x: O.x - rx, y: O.y };
		const R = { x: O.x + rx, y: O.y };

		parts.push(
			`<path d="M ${L.x} ${L.y} A ${rx} ${ry} 0 0 0 ${R.x} ${R.y}" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>`,
			`<path d="M ${L.x} ${L.y} A ${rx} ${ry} 0 0 1 ${R.x} ${R.y}" fill="none" stroke="#94a3b8" stroke-dasharray="4 3" stroke-width="1.4"/>`,
			`<line x1="${L.x}" y1="${L.y}" x2="${S.x}" y2="${S.y}" stroke="#059669" stroke-width="2"/>`,
			`<line x1="${R.x}" y1="${R.y}" x2="${S.x}" y2="${S.y}" stroke="#059669" stroke-width="2"/>`,
			`<line x1="${S.x}" y1="${S.y}" x2="${O.x}" y2="${O.y}" stroke="#dc2626" stroke-dasharray="4 3" stroke-width="2"/>`,
			`<line x1="${O.x}" y1="${O.y}" x2="${R.x}" y2="${R.y}" stroke="#1d4ed8" stroke-width="2"/>`,
			`<polyline points="${O.x},${O.y - 8} ${O.x + 8},${O.y - 8} ${O.x + 8},${O.y}" fill="none" stroke="#dc2626" stroke-width="1.3"/>`,
			`<circle cx="${S.x}" cy="${S.y}" r="3.5" fill="#0f172a"/>`,
			`<circle cx="${O.x}" cy="${O.y}" r="3" fill="#dc2626"/>`,
			`<text x="${S.x + 8}" y="${S.y + 2}" font-size="12" font-weight="bold" fill="#0f172a">S</text>`,
			`<text x="${O.x - 14}" y="${O.y + 4}" font-size="11" font-weight="bold" fill="#dc2626">O</text>`,
			`<text x="${O.x - 36}" y="${(S.y + O.y) / 2 + 4}" font-size="11" font-weight="bold" fill="#dc2626">${escapeXml(opts.heightLabel)}</text>`,
			`<text x="${(O.x + R.x) / 2}" y="${O.y - 5}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.radiusLabel)}</text>`
		);
		if (opts.slantLabel) {
			parts.push(
				`<text x="${(S.x + R.x) / 2 + 12}" y="${(S.y + R.y) / 2}" font-size="11" font-weight="bold" fill="#047857">${escapeXml(opts.slantLabel)}</text>`
			);
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ============================================================================
// 1. Equalities, Inequalities & Framing by Rounding (numeric)
// ============================================================================

const equalitiesInequalitiesFramingTemplate: ParameterizedTemplate = {
	id: '3am_t3_equalities_inequalities_framing',
	grade: '3am',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'المساويات والمتباينات والعمليات والحصر بالتدوير',
	curriculumLessonId: 'lesson_3am_t3_equalities_inequalities_framing',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const m = rng.int(3, 9);
			const kPos = rng.int(2, 5);
			const cPos = rng.pick([-4, -3, -2, 1, 2, 3, 5]);
			const resPos = kPos * m + cPos;

			const n = rng.int(2, 7);
			const pNeg = rng.int(2, 5);
			const cNeg = rng.pick([1, 2, 3, -2, -3]);
			const resNeg = -pNeg * n + cNeg;

			// Positive decimal framing to 0.01 (avoid carry by keeping d3 in [1..8] and d4 != 5 if desired, or test both <5 and >=5)
			const intPart = rng.int(2, 14);
			const d1 = rng.int(1, 9);
			const d2 = rng.int(1, 8);
			const d3 = rng.pick([1, 2, 3, 4, 6, 7, 8, 9]);
			const valStr = `${intPart}.${d1}${d2}${d3}`;
			const low001 = `${intPart}.${d1}${d2}`;
			const high001 = `${intPart}.${d1}${d2 + 1}`;
			const rounded001 = d3 < 5 ? low001 : high001;

			const mcq = buildUniqueMcqOptions(
				`$-${pNeg}x${fmtSignedConst(cNeg)} < ${resNeg}$`,
				[
					{
						text: `$-${pNeg}x${fmtSignedConst(cNeg)} > ${resNeg}$`,
						diagnosticFeedback: `خطأ شائع: عند ضرب طرفي متباينة في عدد سالب ($-${pNeg} < 0$) يجب قلب اتجاه المتباينة من $>$ إلى $<$.`
					},
					{
						text: `$-${pNeg}x${fmtSignedConst(cNeg)} < ${pNeg * n + cNeg}$`,
						diagnosticFeedback: `تذكّر أن ضرب العدد الموجب $${n}$ في العدد السالب $-${pNeg}$ يعطي عدداً سالباً ($-${pNeg * n}$).`
					},
					{
						text: `$-${pNeg}x${fmtSignedConst(cNeg)} > ${-pNeg * n - cNeg}$`,
						diagnosticFeedback: `انتبه إلى قاعدة الإشارات عند الضرب في $-${pNeg}$ وإضافة ${cNeg}، وكذلك قلب اتجاه المتباينة.`
					}
				],
				rng
			);

			const qText = `ليكن $x$ عدداً ناطقاً يحقق $x > ${n}$. أيُّ متباينة صحيحة للعبارة $-${pNeg}x${fmtSignedConst(cNeg)}$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `بضرب طرفي المتباينة $x > ${n}$ في العدد السالب $-${pNeg}$ ينقلب الاتجاه: $-${pNeg}x < -${pNeg * n}$، وبإضافة $${cNeg}$ يبقى الاتجاه محفوظاً فنحصل على $-${pNeg}x${fmtSignedConst(cNeg)} < ${resNeg}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الأسئلة الآتية باستعمال خواص المساويات والمتباينات والحصر:',
					content: [
						{
							type: 'text',
							content: `1) ليكن $a$ عدداً ناطقاً حيث $a < ${m}$. بيّن أن $${kPos}a${fmtSignedConst(cPos)} < ${resPos}$.`,
							answer: `1) بضرب طرفي المتباينة في العدد الموجب $${kPos} > 0$ يحافظ الاتجاه: $${kPos}a < ${kPos * m}$، ثم بإضافة $${cPos}$ نجد $${kPos}a${fmtSignedConst(cPos)} < ${resPos}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) ليكن $x$ عدداً ناطقاً حيث $x > ${n}$. قارن بين $-${pNeg}x${fmtSignedConst(cNeg)}$ والعدد $${resNeg}$ مع التعليل.`,
							answer: `2) نضرب طرفي $x > ${n}$ في $-${pNeg} < 0$ فينقلب الاتجاه: $-${pNeg}x < -${pNeg * n}$، وبإضافة $${cNeg}$ نجد $-${pNeg}x${fmtSignedConst(cNeg)} < ${resNeg}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) أعطِ حصراً للعدد العشري $L = ${valStr}$ إلى $0.01$ (جزء من مئة)، ثم عيّن مدوّره إلى $0.01$.`,
							answer: `3) الحصر إلى $0.01$: $${low001} < ${valStr} < ${high001}$، وبما أن رقم الأجزاء من الألف هو $${d3}$ فإن المدوّر إلى $0.01$ هو $${rounded001}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'الضرب في عدد موجب أو إضافة/طرح نفس العدد لا يغيران اتجاه المتباينة.',
					`عند الضرب في العدد السالب $-${pNeg}$ ينقلب اتجاه المتباينة من $>$ إلى $<$.`,
					'في التدوير إلى $0.01$ ننظر إلى رقم الأجزاء من الألف: إذا كان أصغر من $5$ نأخذ القيمة بالنقصان، وإذا كان $5$ فأكثر نأخذ القيمة بالزيادة.'
				],
				solutionStepsAr: [
					`من $a < ${m}$ وبالضرب في $${kPos} > 0$ ثم إضافة $${cPos}$ نجد $${kPos}a${fmtSignedConst(cPos)} < ${resPos}$.`,
					`من $x > ${n}$ وبالضرب في $-${pNeg} < 0$ ينقلب الاتجاه فنحصل على $-${pNeg}x < -${pNeg * n}$، ثم بإضافة $${cNeg}$ نجد $-${pNeg}x${fmtSignedConst(cNeg)} < ${resNeg}$.`,
					`الحصر إلى $0.01$ للعدد $${valStr}$ هو $${low001} < ${valStr} < ${high001}$، والمدوّر إلى $0.01$ هو $${rounded001}$.`
				],
				finalAnswer: `-${pNeg}x${fmtSignedConst(cNeg)} < ${resNeg}`
			};
		}

		if (difficulty === 'medium') {
			const cAdd = rng.int(2, 9);
			const kNeg = rng.int(2, 6);
			const cShift = rng.pick([-5, -2, 3, 4, 7]);
			const divPos = rng.int(2, 5);

			const lowBound = rng.pick([1.2, 1.5, 2.1, 2.4, 3.2]);
			const highBound = roundTo(lowBound + 0.1, 1);
			const kMult = rng.int(2, 4);
			const cFrame = rng.pick([-2, -1, 3, 5]);
			const framedLow = roundTo(kMult * lowBound + cFrame, 2);
			const framedHigh = roundTo(kMult * highBound + cFrame, 2);

			const decInt = rng.int(3, 12);
			const dec1 = rng.int(1, 8);
			const dec2 = rng.pick([2, 3, 4, 6, 7, 8]);
			const dec3 = rng.int(1, 9);
			const decStr = `${decInt}.${dec1}${dec2}${dec3}`;
			const approxLow01 = `${decInt}.${dec1}`;
			const approxHigh01 = `${decInt}.${dec1 + 1}`;
			const round01 = dec2 < 5 ? approxLow01 : approxHigh01;

			const statements = [
				`$a + ${cAdd} < b + ${cAdd}$`,
				`$-${kNeg}a < -${kNeg}b$`,
				`$\\frac{a}{${divPos}} < \\frac{b}{${divPos}}$`,
				`$-${kNeg}a${fmtSignedConst(cShift)} > -${kNeg}b${fmtSignedConst(cShift)}$`
			];
			const correctAnswers = [0, 1, 0, 0];

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'matrix',
					questionText: 'ليكن $a$ و $b$ عددين ناطقين بحيث $a < b$. حدّد صحة أو خطأ كل متباينة مما يلي:',
					questionTextAr: 'ليكن $a$ و $b$ عددين ناطقين بحيث $a < b$. حدّد صحة أو خطأ كل متباينة مما يلي:',
					questionData: {
						statements,
						columns: ['صحيح', 'خطأ'],
						correctAnswers
					},
					explanation: `إضافة $${cAdd}$ والقسمة على $${divPos} > 0$ يحافظان على الاتجاه، بينما الضرب في العدد السالب $-${kNeg}$ يقلب الاتجاه من $<$ إلى $>$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الأسئلة الآتية بدقة مع تبرير كل خطوة:',
					content: [
						{
							type: 'text',
							content: `1) ليكن $a$ و $b$ عددين ناطقين بحيث $a < b$. قارن مع التعليل بين: أ) $a + ${cAdd}$ و $b + ${cAdd}$ ؛ ب) $-${kNeg}a${fmtSignedConst(cShift)}$ و $-${kNeg}b${fmtSignedConst(cShift)}$.`,
							answer: `1) أ) إضافة نفس العدد $${cAdd}$ تحفظ الاتجاه، إذن $a + ${cAdd} < b + ${cAdd}$. ب) بالضرب في $-${kNeg} < 0$ ينقلب الاتجاه: $-${kNeg}a > -${kNeg}b$، وبإضافة $${cShift}$ نجد $-${kNeg}a${fmtSignedConst(cShift)} > -${kNeg}b${fmtSignedConst(cShift)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) إذا علمت أن $${fmtNum(lowBound)} < x < ${fmtNum(highBound)}$، أعطِ حصراً للعبارة $A = ${kMult}x${fmtSignedConst(cFrame)}$.`,
							answer: `2) نضرب أطراف الحصر في $${kMult} > 0$: $${fmtNum(kMult * lowBound)} < ${kMult}x < ${fmtNum(kMult * highBound)}$، ثم نضيف $${cFrame}$ فنجد: $${fmtNum(framedLow)} < A < ${fmtNum(framedHigh)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) ليكن العدد العشري $M = ${decStr}$. أعطِ القيمتين المقربتين بالنقصان وبالزيادة للعدد $M$ إلى $0.1$، ثم استنتج مدوّره إلى $0.1$.`,
							answer: `3) القيمة المقربة بالنقصان إلى $0.1$ هي $${approxLow01}$ وبالزيادة هي $${approxHigh01}$ (أي $${approxLow01} < M < ${approxHigh01}$). وبما أن رقم الأجزاء من مئة هو $${dec2}$ فإن المدوّر إلى $0.1$ هو $${round01}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					'إضافة عدد أو طرحه يحافظ دائماً على اتجاه المتباينة.',
					`الضرب في عدد سالب مثل $-${kNeg}$ يقلب اتجاه المتباينة؛ لذا تصبح علامة $<$ علامة $>$.`,
					`لحصر $A = ${kMult}x${fmtSignedConst(cFrame)}$ ابدأ بالضرب في $${kMult}$ على الأطراف الثلاثة ثم أضف ${cFrame}.`
				],
				solutionStepsAr: [
					`بما أن $a < b$ فإن $a + ${cAdd} < b + ${cAdd}$ و $\\frac{a}{${divPos}} < \\frac{b}{${divPos}}$.`,
					`بضرب $a < b$ في $-${kNeg} < 0$ ينقلب الاتجاه إلى $-${kNeg}a > -${kNeg}b$، ومنه $-${kNeg}a${fmtSignedConst(cShift)} > -${kNeg}b${fmtSignedConst(cShift)}$.`,
					`حصر $A$: $${fmtNum(framedLow)} < ${kMult}x${fmtSignedConst(cFrame)} < ${fmtNum(framedHigh)}$، ومدوّر $${decStr}$ إلى $0.1$ هو $${round01}$.`
				],
				finalAnswer: `${fmtNum(framedLow)} < A < ${fmtNum(framedHigh)}`
			};
		}

		// Hard: Rational number comparison via difference + negative multiplier framing
		const pairs: { n1: number; d1: number; n2: number; d2: number; comDen: number; diffNum: number }[] = [
			{ n1: 7, d1: 6, n2: 9, d2: 8, comDen: 24, diffNum: 1 },
			{ n1: 5, d1: 4, n2: 7, d2: 6, comDen: 12, diffNum: 1 },
			{ n1: 11, d1: 6, n2: 17, d2: 9, comDen: 18, diffNum: -1 },
			{ n1: 8, d1: 5, n2: 11, d2: 7, comDen: 35, diffNum: 1 },
			{ n1: 13, d1: 10, n2: 9, d2: 7, comDen: 70, diffNum: 1 }
		];
		const pair = rng.pick(pairs);
		const aGTb = pair.diffNum > 0;

		const kScale = rng.int(2, 4);
		const mShift = rng.int(3, 9);
		const lowX = rng.int(2, 5);
		const highX = lowX + rng.int(1, 3);
		// Frame B = -kScale * x + mShift
		const lowB = -kScale * highX + mShift;
		const highB = -kScale * lowX + mShift;

		const mcq = buildUniqueMcqOptions(
			`$${lowB} < B < ${highB}$`,
			[
				{
					text: `$${-kScale * lowX + mShift} < B < ${-kScale * highX + mShift}$`,
					diagnosticFeedback: `عند الضرب في العدد السالب $-${kScale}$ ينقلب اتجاه المتباينات، لذا يجب تبديل الطرفين الأصغر والأكبر!`
				},
				{
					text: `$${kScale * lowX + mShift} < B < ${kScale * highX + mShift}$`,
					diagnosticFeedback: `نسيت الإشارة السالبة في المعامل $-${kScale}$ عند حساب حصر $B$.`
				},
				{
					text: `$${-kScale * highX} < B < ${-kScale * lowX}$`,
					diagnosticFeedback: `قمت بقلب الحصر بعد الضرب في $-${kScale}$، ولكن نسيت إضافة $${mShift}$ إلى الطرفين.`
				}
			],
			rng
		);

		const qText = `إذا كان $${lowX} < x < ${highX}$، فما هو الحصر الصحيح للعدد $B = -${kScale}x + ${mShift}$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نضرب أطراف الحصر $${lowX} < x < ${highX}$ في العدد السالب $-${kScale}$ فينقلب الاتجاه: $-${kScale * highX} < -${kScale}x < -${kScale * lowX}$، ثم نضيف $${mShift}$ فنجد $${lowB} < B < ${highB}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: 'حلّ المسائل الآتية باستعمال خواص المقارنة والمتباينات:',
				content: [
					{
						type: 'text',
						content: `1) ليكن العددان الناطقان $X = ${fmtFracTypst(pair.n1, pair.d1)}$ و $Y = ${fmtFracTypst(pair.n2, pair.d2)}$. احسب الفرق $X - Y$ ثم قارن بين $X$ و $Y$.`,
						answer: `1) نوحد المقامين على $${pair.comDen}$: $X - Y = ${fmtFracTypst(pair.diffNum, pair.comDen)}$. بما أن الفرق ${aGTb ? 'موجب تماماً ($> 0$) فإن $X > Y$' : 'سالب تماماً ($< 0$) فإن $X < Y$'}.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) استنتج دون حساب مقارنة العددين $-${kScale}X + ${mShift}$ و $-${kScale}Y + ${mShift}$ مع التعليل.`,
						answer: `2) بضرب المتباينة في العدد السالب $-${kScale} < 0$ ينقلب الاتجاه ثم بإضافة $${mShift}$ يبقى الاتجاه، إذن $-${kScale}X + ${mShift} ${aGTb ? '<' : '>'} -${kScale}Y + ${mShift}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) ليكن $x$ عدداً ناطقاً يحقق $${lowX} < x < ${highX}$. أعطِ حصراً للعدد $B = -${kScale}x + ${mShift}$.`,
						answer: `3) نضرب في $-${kScale}$ مع عكس ترتيب الطرفين: $-${kScale * highX} < -${kScale}x < -${kScale * lowX}$، ثم نضيف $${mShift}$ فنجد $${lowB} < B < ${highB}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`نضرب أطراف $${lowX} < x < ${highX}$ في $-${kScale}$؛ وبما أنه سالب تماماً فإن $-${kScale} \\times ${highX}$ يصبح الحد الأصغر و $-${kScale} \\times ${lowX}$ يصبح الحد الأكبر.`,
				`بعد إيجاد حصر $-${kScale}x$، أضف العدد $${mShift}$ إلى الحدود الثلاثة دون تغيير الاتجاه.`,
				`في مقارنة $X$ و $Y$ احسب $X - Y$ بتوحيد المقامين على $${pair.comDen}$ وادرس إشارته.`
			],
			solutionStepsAr: [
				`بتوحيد المقامين على $${pair.comDen}$ نجد $X - Y = ${fmtFracKatex(pair.diffNum, pair.comDen)}$، ومنه $${aGTb ? 'X > Y' : 'X < Y'}$.`,
				`بالضرب في $-${kScale}$ ينقلب الاتجاه، وبإضافة $${mShift}$ نجد $-${kScale}X + ${mShift} ${aGTb ? '<' : '>'} -${kScale}Y + ${mShift}$.`,
				`للحصر: $-${kScale * highX} < -${kScale}x < -${kScale * lowX}$، وبإضافة $${mShift}$ نحصل على $${lowB} < B < ${highB}$.`
			],
			finalAnswer: `${lowB} < B < ${highB}`
		};
	}
};

// ============================================================================
// 2. First-Degree Equations ax + b = cx + d & Word Problem Modeling (numeric)
// ============================================================================

const equationsModelingTemplate: ParameterizedTemplate = {
	id: '3am_t3_equations_modeling',
	grade: '3am',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'حل معادلات من الدرجة الأولى بمجهول واحد وترييض مشكلات',
	curriculumLessonId: 'lesson_3am_t3_first_degree_equations_modeling',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const c = rng.int(2, 5);
			const diffAC = rng.int(2, 5);
			const a = c + diffAC;
			const x0 = rng.int(2, 11);
			const b = rng.int(3, 18);
			const d = diffAC * x0 + b;
			const wrongTest = x0 + rng.pick([1, 2, -1]);

			// Simple word problem: Library/club pricing p1*x + fixed = p2*x
			const p1 = rng.pick([30, 40, 50, 60]);
			const deltaP = rng.pick([20, 25, 30, 40]);
			const p2 = p1 + deltaP;
			const xBooks = rng.int(5, 15);
			const fixedFee = deltaP * xBooks;

			const eqStr = `${fmtLinearExpr(a, b)} = ${fmtLinearExpr(c, d)}`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `حلّ المعادلة من الدرجة الأولى ذات المجهول $x$ الآتية:\n\n$$${eqStr}$$`,
					questionTextAr: `حلّ المعادلة الآتية لإيجاد قيمة $x$: $${eqStr}$`,
					questionData: {
						answer: x0,
						displayTemplate: 'x = {answer}',
						variables: [],
						tolerance: 0
					},
					explanation: `نعزل الحدود المجهولة في طرف والمعلومة في الطرف الآخر: $${a}x - ${c}x = ${d} - ${b}$، أي $${diffAC}x = ${d - b}$، ومنه $x = \\frac{${d - b}}{${diffAC}} = ${x0}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الجزأين الآتيين مع إظهار خطوات الحل:',
					content: [
						{
							type: 'text',
							content: `1) اختبر هل العدد $${wrongTest}$ حلّ للمعادلة $${eqStr}$، ثم حلّ هذه المعادلة.`,
							answer: `1) عند $x = ${wrongTest}$: الطرف الأيسر $= ${a * wrongTest + b}$ والطرف الأيمن $= ${c * wrongTest + d}$ (غير متساويين، إذن $${wrongTest}$ ليس حلاً). بحل المعادلة: $${diffAC}x = ${d - b}$ ومنه $x = ${x0}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) ترييض مشكلة: تعرض مكتبة صيغتين لاستعارة الكتب: الصيغة (أ) باشتراك سنوي قدره $${fixedFee}$ دج و$${p1}$ دج لكل كتاب، والصيغة (ب) دون اشتراك مقابل $${p2}$ دج لكل كتاب. أوجد عدد الكتب $x$ الذي تتساوى فيه الكلفتان.`,
							answer: `2) نضع $x$ عدد الكتب. المعادلة: $${p1}x + ${fixedFee} = ${p2}x$. ومنه $${fixedFee} = ${deltaP}x$ أي $x = frac(${fixedFee}, ${deltaP}) = ${xBooks}$ كتاباً.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`اجمع الحدود التي تحتوي على $x$ في طرف واحد بطرح $${c}x$ من الطرفين.`,
					`اطرح $${b}$ من الطرفين لتصل إلى معادلة من الشكل $Ax = B$.`,
					`اقسم الطرفين على معامل $x$ ($${diffAC}$) وتحقق بتعويض القيمة في طرفي المعادلة.`
				],
				solutionStepsAr: [
					`نطرح $${c}x$ من طرفي المعادلة: $${diffAC}x + ${b} = ${d}$.`,
					`نطرح $${b}$ من طرفي المعادلة: $${diffAC}x = ${d - b}$.`,
					`نقسم على $${diffAC}$: $x = \\frac{${d - b}}{${diffAC}} = ${x0}$.`,
					`التحقق: $${a}(${x0}) + ${b} = ${a * x0 + b}$ و $${c}(${x0}) + ${d} = ${c * x0 + d}$.`
				],
				finalAnswer: `x = ${x0}`
			};
		}

		if (difficulty === 'medium') {
			// Equation with brackets: k(x + p) = m*x + q, where k != m and x0 can be positive or negative integer
			const k = rng.int(2, 5);
			const m = k + rng.pick([-3, -2, 2, 3].filter((d) => k + d !== 0 && k + d !== 1));
			const diffKM = k - m;
			const p = rng.pick([-4, -3, -2, 2, 3, 4]);
			const x0 = rng.pick([-6, -4, -3, -2, 3, 4, 5, 7, 8]);
			const q = k * (x0 + p) - m * x0;

			// Word problem: Father & son age problem: Father age F = kAge*S + offset? No, find years y so Father (F + y) = 2*(S + y)
			// Choose son age S in [8..14], years y0 in [4..12], then F + y0 = 2*(S + y0) => F = 2*S + y0!
			const sonAge = rng.int(8, 14);
			const y0 = rng.int(4, 12);
			const fatherAge = 2 * sonAge + y0;

			const bracketExpr = `${k}(${fmtLinearExpr(1, p)})`;
			const rhsExpr = fmtLinearExpr(m, q);

			const wrongSignSol = Math.round((k * p - q) / diffKM);
			const wrongDistSol = Math.round((q - p) / diffKM);

			const mcq = buildUniqueMcqOptions(
				`$x = ${x0}$`,
				[
					{
						text: `$x = ${-x0}$`,
						diagnosticFeedback: 'تحقق من إشارات الحدود عند نقلها بين طرفي المعادلة.'
					},
					{
						text: `$x = ${wrongSignSol === x0 ? x0 + 2 : wrongSignSol}$`,
						diagnosticFeedback: 'انتبه لإشارة الناتج عند القسمة على معامل المجهول.'
					},
					{
						text: `$x = ${wrongDistSol === x0 ? x0 - 3 : wrongDistSol}$`,
						diagnosticFeedback: `عند النشر، يجب ضرب العامل $${k}$ في كل من $x$ والعدد $${p}$ معاً.`
					}
				],
				rng
			);

			const qText = `ما هو حلّ المعادلة ذات المجهول $x$ الآتية:\n\n$$${bracketExpr} = ${rhsExpr}$$`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: `ما هو حلّ المعادلة: $${bracketExpr} = ${rhsExpr}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `ننشر الطرف الأيسر: $${fmtLinearExpr(k, k * p)} = ${rhsExpr}$، نعزل $x$: $${diffKM}x = ${q - k * p}$، ومنه $x = ${x0}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'حلّ المعادلة ثم ريّض المشكلة الآتية:',
					content: [
						{
							type: 'text',
							content: `1) حلّ المعادلة الآتية: $${bracketExpr} = ${rhsExpr}$.`,
							answer: `1) ننشر القوس: $${fmtLinearExpr(k, k * p)} = ${rhsExpr}$. نعزل المجهول: $${diffKM}x = ${q - k * p}$، ومنه $x = ${x0}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) ترييض مشكلة: يبلغ عمر أب $${fatherAge}$ سنة، وعمر ابنه $${sonAge}$ سنوات. بعد كم سنة يصبح عمر الأب ضعف عمر ابنه؟ (اتّبع مراحل الترييض الأربع).`,
							answer: `2) ليكن $y$ عدد السنوات. بعد $y$ سنة يصبح عمر الأب $${fatherAge} + y$ وعمر الابن $${sonAge} + y$. المعادلة: $${fatherAge} + y = 2(${sonAge} + y)$ أي $${fatherAge} + y = ${2 * sonAge} + 2y$، ومنه $y = ${fatherAge} - ${2 * sonAge} = ${y0}$ سنوات.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`ابدأ بنشر القوس في الطرف الأيسر بتوزيع $${k}$ على الحدين داخل القوس.`,
					`اجمع الحدود المتضمنة لـ $x$ في طرف والأعداد المعلومة في الطرف الآخر.`,
					'في مسألة الأعمار، يزيد عمر كل من الأب والابن بنفس العدد $y$ بعد $y$ سنة.'
				],
				solutionStepsAr: [
					`النشر: $${fmtLinearExpr(k, k * p)} = ${rhsExpr}$.`,
					`العزل: $${k}x - ${m < 0 ? `(${m}x)` : `${m}x`} = ${q} - ${k * p < 0 ? `(${k * p})` : `${k * p}`}$، أي $${diffKM}x = ${q - k * p}$.`,
					`القسمة: $x = ${x0}$.`,
					`مسألة الأعمار: $${fatherAge} + y = 2(${sonAge} + y) \\implies y = ${y0}$ سنوات.`
				],
				finalAnswer: `x = ${x0}`
			};
		}

		// Hard: Fractional coefficients x/p + b = x/q + d + geometric perimeter word problem
		const fracPairs: [number, number][] = [
			[2, 3],
			[3, 4],
			[2, 5],
			[3, 5],
			[4, 5]
		];
		const [pDen, qDen] = rng.pick(fracPairs);
		const commonLcm = lcm(pDen, qDen);
		const multK = rng.int(1, 3);
		const x0 = commonLcm * multK;
		const bVal = rng.int(2, 8);
		const dVal = x0 / pDen + bVal - x0 / qDen;

		// Geometric problem: Rectangle length L = 2x + extraL, width W = x + extraW, perimeter P = 2*(3x + extraL + extraW)
		const xRect = rng.int(4, 10);
		const extraL = rng.int(3, 8);
		const extraW = rng.int(1, 4);
		const rectLen = 2 * xRect + extraL;
		const rectWid = xRect + extraW;
		const perimeter = 2 * (rectLen + rectWid);

		const eqKatex = `\\frac{x}{${pDen}}${fmtSignedConst(bVal)} = \\frac{x}{${qDen}}${fmtSignedConst(dVal)}`;
		const eqTypst = `frac(x, ${pDen})${fmtSignedConst(bVal)} = frac(x, ${qDen})${fmtSignedConst(dVal)}`;

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'fill_blank',
				questionText: `حلّ المعادلة ذات المعاملات الكسرية الآتية (أدخل قيمة $x$ فقط):\n\n$$${eqKatex}$$`,
				questionTextAr: `ما قيمة $x$ التي تحقّق المعادلة: $${eqKatex}$؟`,
				questionData: {
					sentence: 'حلّ المعادلة هو x = ___.',
					acceptedAnswers: acceptNum(x0)
				},
				explanation: `نضرب طرفي المعادلة في المضاعف المشترك للمقامين ($${commonLcm}$) فنجد $${qDen}x + ${bVal * commonLcm} = ${pDen}x + ${dVal * commonLcm}$، ومنه $${qDen - pDen}x = ${(dVal - bVal) * commonLcm}$، أي $x = ${x0}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: 'حلّ المعادلة ثم عالج المشكلة الهندسية الآتية:',
				content: [
					{
						type: 'text',
						content: `1) حلّ المعادلة ذات المعاملات الكسرية الآتية: $${eqTypst}$.`,
						answer: `1) نضرب جميع حدود المعادلة في $${commonLcm}$: $${qDen}x + ${bVal * commonLcm} = ${pDen}x + ${dVal * commonLcm}$، ومنه $${qDen - pDen}x = ${(dVal - bVal) * commonLcm}$، أي $x = ${x0}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) مستطيل $A B C D$ طوله $A B = 2x + ${extraL}$ سم وعرضه $B C = x + ${extraW}$ سم ($x > 0$). أوجد قيمة $x$ إذا علمت أن محيط هذا المستطيل يساوي $${perimeter}$ سم، ثم استنتج طوله وعرضه.`,
						answer: `2) المحيط $2(A B + B C) = ${perimeter}$، أي $2(3x + ${extraL + extraW}) = ${perimeter}$ ومنه $6x + ${2 * (extraL + extraW)} = ${perimeter}$، أي $6x = ${6 * xRect}$ و $x = ${xRect}$ سم. الطول $A B = ${rectLen}$ سم والعرض $B C = ${rectWid}$ سم.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				`تخلّص من المقامين بضرب كل حدود المعادلة في المضاعف المشترك $${commonLcm}$.`,
				`بعد الضرب في $${commonLcm}$ تحصل على معادلة خطية بأعداد صحيحة من الشكل $ax + b = cx + d$.`,
				'تذكّر أن محيط المستطيل يساوي ضعف مجموع الطول والعرض: $2 \\times (L + l)$.'
			],
			solutionStepsAr: [
				`بضرب المعادلة في $${commonLcm}$ نحصل على $${qDen}x + ${bVal * commonLcm} = ${pDen}x + ${dVal * commonLcm}$.`,
				`نعزل المجهول: $${qDen - pDen}x = ${(dVal - bVal) * commonLcm}$، ومنه $x = ${x0}$.`,
				`في المستطيل: $2((2x + ${extraL}) + (x + ${extraW})) = ${perimeter} \\implies 6x = ${6 * xRect} \\implies x = ${xRect}\\text{ cm}$.`
			],
			finalAnswer: `x = ${x0}`
		};
	}
};

// ============================================================================
// 3. Translation (الانسحاب) via Parallelogram & Properties (geometry)
// ============================================================================

const translationTemplate: ParameterizedTemplate = {
	id: '3am_t3_translation',
	grade: '3am',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'الانسحاب: إنشاء صور الأشكال وخواص الانسحاب',
	curriculumLessonId: 'lesson_3am_t3_translation',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			// Grid translation (المرصوفة) using svgGridPoints
			// Note: In svgGridPoints, col increases rightwards, row increases downwards.
			const cols = 9;
			const rows = 6;
			const colLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
			const rowLabels = ['1', '2', '3', '4', '5', '6'];

			const dc = rng.pick([2, 3]);
			const dr = rng.pick([-2, -1]); // upwards (smaller row index)
			const cA = rng.int(1, 3);
			const rA = rng.int(4, 5);
			const cB = cA + dc;
			const rB = rA + dr;

			// Segment [MN] on grid, locate image M' of M among P1, P2, P3, P4
			const cM = rng.int(3, 5);
			const rM = rng.int(3, 4);
			const cN = cM - 1;
			const rN = rM + 1;

			// True image of M: P1 = (cM + dc, rM + dr)
			const p1 = { col: cM + dc, row: rM + dr };
			// Distractor P2: opposite translation (cM - dc, rM - dr)
			const p2 = { col: cM - dc, row: rM - dr };
			// Distractor P3: wrong vertical direction (cM + dc, rM - dr)
			const p3 = { col: cM + dc, row: Math.min(rows - 1, rM - dr) };
			// Distractor P4: off by 1 horizontally (cM + dc - 1, rM + dr)
			const p4 = { col: cM + dc - 1, row: rM + dr };

			const svgPath = saveSvgAsset(
				`3am_t3_translation_${difficulty}_s${seed}`,
				svgGridPoints({
					cols,
					rows,
					colLabels,
					rowLabels,
					polygon: [
						{ col: cM, row: rM },
						{ col: cN, row: rN }
					],
					points: [
						{ col: cA, row: rA, label: 'A', color: '#dc2626' },
						{ col: cB, row: rB, label: 'B', color: '#dc2626' },
						{ col: cM, row: rM, label: 'M', color: '#1d4ed8' },
						{ col: cN, row: rN, label: 'N', color: '#1d4ed8' },
						{ col: p1.col, row: p1.row, label: 'P1', color: '#15803d' },
						{ col: p2.col, row: p2.row, label: 'P2', color: '#7c3aed' },
						{ col: p3.col, row: p3.row, label: 'P3', color: '#d97706' },
						{ col: p4.col, row: p4.row, label: 'P4', color: '#475569' }
					]
				})
			);

			const segLen = rng.int(4, 9);
			const upSteps = Math.abs(dr);

			const mcq = buildUniqueMcqOptions(
				'النقطة $P_1$',
				[
					{
						text: 'النقطة $P_2$',
						diagnosticFeedback: `النقطة $P_2$ توافق الانسحاب المعاكس الذي يحوّل $B$ إلى $A$ ($${dc}$ إلى اليسار و$${upSteps}$ إلى الأسفل).`
					},
					{
						text: 'النقطة $P_3$',
						diagnosticFeedback: `عند $P_3$ تحرّكتَ إلى الأسفل بدلاً من التحرّك للأعلى بمقدار $${upSteps}$ ${upSteps === 1 ? 'وحدة' : 'وحدات'}.`
					},
					{
						text: 'النقطة $P_4$',
						diagnosticFeedback: `عند $P_4$ تحرّكتَ أفقياً بمقدار $${dc - 1}$ فقط بدلاً من $${dc}$ وحدات نحو اليمين.`
					}
				],
				rng
			);

			const qText = 'على المرصوفة المقابلة، أيٌّ من النقاط الأربع ($P_1$ أو $P_2$ أو $P_3$ أو $P_4$) هي صورة النقطة $M$ بالانسحاب الذي يحوّل $A$ إلى $B$؟';

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'الانسحاب الذي يحوّل A إلى B على المرصوفة',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `للانتقال من $A$ إلى $B$ نتحرك $${dc}$ وحدات إلى اليمين و$${upSteps}$ ${upSteps === 1 ? 'وحدة' : 'وحدات'} إلى الأعلى. نطبّق نفس الإزاحة انطلاقاً من $M$ فنصل إلى $P_1$، ويكون الرباعي $ABP_1M$ متوازي أضلاع.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'تأمل المرصوفة المقابلة وأجب عن الأسئلة الآتية:',
					content: [
						{
							type: 'columns',
							widths: ['1.3fr', '1.2fr'],
							children: [
								{
									type: 'text',
									content: `1) صف الانتقال من النقطة $A$ إلى النقطة $B$، ثم حدّد أي نقطة من ($P_1, P_2, P_3, P_4$) هي صورة $M$ بالانسحاب الذي يحوّل $A$ إلى $B$.`,
									answer: `1) ننتقل من $A$ إلى $B$ بـ $${dc}$ وحدات يميناً و$${upSteps}$ ${upSteps === 1 ? 'وحدة' : 'وحدات'} للأعلى؛ ومنه صورة $M$ هي النقطة $P_1$.`,
									mark: '1'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) ما طبيعة الرباعي $A B P_1 M$؟ علّل إجابتك.`,
							answer: `2) بما أن $P_1$ هي صورة $M$ بالانسحاب الذي يحوّل $A$ إلى $B$ (وليست على المستقيم $(A B)$)، فإن الرباعي $A B P_1 M$ متوازي أضلاع.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) إذا كان طول القطعة $[M N]$ يساوي $${segLen}$ سم، فما طول صورتها $[M' N']$ بهذا الانسحاب؟ وما الوضع النسبي للمستقيمين $(M N)$ و $(M' N')$؟`,
							answer: `3) الانسحاب يحفظ الأطوال، إذن $M' N' = M N = ${segLen}$ سم. كما أن صورة قطعة مستقيم بانسحاب هي قطعة مستقيم توازيها، إذن $(M' N') parallel (M N)$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`عدّ الوحدات الأفقية والعمودية للانتقال من النقطة $A$ إلى النقطة $B$.`,
					`طبّق نفس الإزاحة ($${dc}$ يميناً و$${upSteps}$ للأعلى) انطلاقاً من النقطة $M$.`,
					'الانسحاب يحفظ الأطوال ويجعل صورة قطعة مستقيم موازية للقطعة الأصلية.'
				],
				solutionStepsAr: [
					`من $A$ إلى $B$ نتحرك $${dc}$ وحدات يميناً و$${upSteps}$ ${upSteps === 1 ? 'وحدة' : 'وحدات'} للأعلى.`,
					`بتطبيق نفس الإزاحة على $M$ نحصل على النقطة $P_1$، ويكون $ABP_1M$ متوازي أضلاع.`,
					`بما أن الانسحاب يحفظ الأطوال ويحول القطعة إلى قطعة موازية لها، فإن $M'N' = ${segLen}\\text{ cm}$ و $(M'N') \\parallel (MN)$.`
				],
				finalAnswer: 'النقطة P1'
			};
		}

		if (difficulty === 'medium') {
			// Triangle MNP right at M -> M'N'P' by translation A -> B
			const legMN = rng.pick([3, 4, 6, 8]);
			const legMP = rng.pick([4, 5, 6, 9]);
			const angP = rng.pick([32, 37, 42, 53]);
			const area = (legMN * legMP) / 2;
			const abLen = rng.int(4, 9);

			const svgPath = saveSvgAsset(
				`3am_t3_translation_${difficulty}_s${seed}`,
				svgTranslationDiagram({
					mode: 'triangle',
					triLabel: ['M', 'N', 'P'],
					sideMNLabel: `${legMN} cm`,
					sideMPLabel: `${legMP} cm`,
					angleLabel: `${angP}°`,
					shiftLabel: `AB=${abLen} cm`
				})
			);

			const wrongDoubleArea = legMN * legMP;
			const wrongAddShift = area + abLen;
			const wrongPerim = legMN + legMP;

			const mcq = buildUniqueMcqOptions(
				`$${fmtNum(area)}\\text{ cm}^2$`,
				[
					{
						text: `$${fmtNum(wrongDoubleArea)}\\text{ cm}^2$`,
						diagnosticFeedback: 'نسيت القسمة على 2 عند حساب مساحة المثلث القائم!'
					},
					{
						text: `$${fmtNum(wrongAddShift)}\\text{ cm}^2$`,
						diagnosticFeedback: 'الانسحاب يحفظ المساحات؛ لا نجمع طول الانسحاب $AB$ إلى المساحة.'
					},
					{
						text: `$${fmtNum(wrongPerim)}\\text{ cm}^2$`,
						diagnosticFeedback: 'جمعتَ طولي الضلعين القائمين بدلاً من ضربهما والقسمة على 2.'
					}
				],
				rng
			);

			const qText = `ليكن $MNP$ مثلثاً قائماً في $M$ حيث $MN = ${legMN}\\text{ cm}$ و $MP = ${legMP}\\text{ cm}$. أنشأنا المثلث $M'N'P'$ صورة $MNP$ بالانسحاب الذي يحوّل $A$ إلى $B$ ($AB = ${abLen}\\text{ cm}$). ما هي مساحة المثلث $M'N'P'$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'صورة مثلث بالانسحاب الذي يحوّل A إلى B',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `الانسحاب يحفظ المساحات (والأطوال وأقياس الزوايا)، إذن مساحة $M'N'P'$ تساوي مساحة $MNP$، أي $\\frac{${legMN} \\times ${legMP}}{2} = ${fmtNum(area)}\\text{ cm}^2$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `ليكن $M N P$ مثلثاً قائماً في $M$ حيث $M N = ${legMN}$ سم، $M P = ${legMP}$ سم، و $hat(M P N) = ${angP} degree$. أنشأنا المثلث $M' N' P'$ صورة $M N P$ بالانسحاب الذي يحوّل $A$ إلى $B$ ($A B = ${abLen}$ سم).`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1.1fr'],
							children: [
								{
									type: 'text',
									content: `1) ما طبيعة الرباعي $A B M' M$؟ وما طول القطعة $[M M']$؟ علّل.`,
									answer: `1) بما أن $M'$ صورة $M$ بالانسحاب الذي يحوّل $A$ إلى $B$، فإن الرباعي $A B M' M$ متوازي أضلاع، ومنه $M M' = A B = ${abLen}$ سم.`,
									mark: '1'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) ما نوع المثلث $M' N' P'$؟ وما قيس الزاوية $hat(M' P' N')$؟ علّل باستعمال خواص الانسحاب.`,
							answer: `2) بما أن الانسحاب يحفظ أقياس الزوايا، فإن $hat(N' M' P') = hat(N M P) = 90 degree$ فالمثلث $M' N' P'$ قائم في $M'$، و $hat(M' P' N') = hat(M P N) = ${angP} degree$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب مساحة المثلث $M' N' P'$.`,
							answer: `3) الانسحاب يحفظ المساحات (والأطوال)، إذن مساحة $M' N' P'$ تساوي مساحة $M N P$: $frac(${legMN} times ${legMP}, 2) = ${fmtNum(area)}$ سم².`,
							mark: '1'
						}
					]
				},
				hints: [
					"تذكّر تعريف الانسحاب الذي يحوّل $A$ إلى $B$: صورة $M$ هي $M'$ بحيث يكون $ABM'M$ متوازي أضلاع.",
					'الانسحاب يحفظ أقياس الزوايا، فصورة مثلث قائم هي مثلث قائم له نفس أقياس الزوايا.',
					"الانسحاب يحفظ المساحات، فمساحة $M'N'P'$ تساوي $\\frac{MN \\times MP}{2}$."
				],
				solutionStepsAr: [
					`بما أن $M'$ صورة $M$ بالانسحاب الذي يحوّل $A$ إلى $B$ فإن $ABM'M$ متوازي أضلاع و $MM' = AB = ${abLen}\\text{ cm}$.`,
					`الانسحاب يحفظ أقياس الزوايا، ومنه $\\widehat{N'M'P'} = 90^\\circ$ والمثلث $M'N'P'$ قائم في $M'$، و $\\widehat{M'P'N'} = ${angP}^\\circ$.`,
					`بما أن الانسحاب يحفظ المساحات، فإن مساحة $M'N'P'$ هي $\\frac{${legMN} \\times ${legMP}}{2} = ${fmtNum(area)}\\text{ cm}^2$.`
				],
				finalAnswer: `${fmtNum(area)} cm²`
			};
		}

		// Hard: Circle (C) of center O and radius r -> (C') of center O' by translation A -> B
		const r = rng.pick([3, 4, 5, 6]);
		const ab = rng.int(5, 11);
		const perim = roundTo(2 * PI * r, 2);
		const diskArea = roundTo(PI * r * r, 2);

		const svgPath = saveSvgAsset(
			`3am_t3_translation_${difficulty}_s${seed}`,
			svgTranslationDiagram({
				mode: 'circle',
				radiusLabel: `r=${r} cm`,
				shiftLabel: `AB=${ab} cm`
			})
		);

		const mcq = buildUniqueMcqOptions(
			`نصف القطر $${r}\\text{ cm}$ و $OO' = ${ab}\\text{ cm}$`,
			[
				{
					text: `نصف القطر $${ab}\\text{ cm}$ و $OO' = ${r}\\text{ cm}$`,
					diagnosticFeedback: `عكستَ القيمتين! مسافة الانسحاب $OO'$ تساوي $AB = ${ab}\\text{ cm}$، بينما نصف القطر محفوظ ويساوي $${r}\\text{ cm}$.`
				},
				{
					text: `نصف القطر $${r + ab}\\text{ cm}$ و $OO' = ${ab}\\text{ cm}$`,
					diagnosticFeedback: 'الانسحاب لا يغيّر نصف قطر الدائرة ولا يضيف إليه مسافة الإزاحة.'
				},
				{
					text: `نصف القطر $${2 * r}\\text{ cm}$ و $OO' = ${ab}\\text{ cm}$`,
					diagnosticFeedback: `القيمة $${2 * r}\\text{ cm}$ هي القطر وليس نصف القطر.`
				}
			],
			rng
		);

		const qText = `دائرة $(C)$ مركزها $O$ ونصف قطرها $r = ${r}\\text{ cm}$. أنشأنا صورتها $(C')$ بالانسحاب الذي يحوّل $A$ إلى $B$ حيث $AB = ${ab}\\text{ cm}$. ما هو نصف قطر $(C')$ وما طول القطعة $[OO']$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'صورة دائرة (C) بالانسحاب الذي يحوّل A إلى B',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `صورة دائرة بانسحاب هي دائرة مركزها $O'$ (صورة $O$) ولها نفس نصف القطر $r = ${r}\\text{ cm}$. وبما أن $ABO'O$ متوازي أضلاع فإن $OO' = AB = ${ab}\\text{ cm}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `دائرة $(C)$ مركزها $O$ ونصف قطرها $r = ${r}$ سم. لتكن $(C')$ صورة $(C)$ بالانسحاب الذي يحوّل $A$ إلى $B$ حيث $A B = ${ab}$ سم (نأخذ $pi approx 3.14$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1.1fr'],
						children: [
							{
								type: 'text',
								content: `1) حدّد عناصر الدائرة $(C')$ (مركزها ونصف قطرها)، ثم استنتج طول القطعة $[O O']$ مع التبرير.`,
								answer: `1) صورة الدائرة $(C)$ هي الدائرة $(C')$ التي مركزها $O'$ (صورة $O$) ونصف قطرها $r = ${r}$ سم. ولأن $A B O' O$ متوازي أضلاع فإن $O O' = A B = ${ab}$ سم.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath
							}
						]
					},
					{
						type: 'text',
						content: `2) لتكن $K$ نقطة من الدائرة $(C)$ و $K'$ صورتها بهذا الانسحاب. برّر أن $K'$ تنتمي إلى $(C')$ وأن $(O' K') parallel (O K)$.`,
						answer: `2) بما أن الانسحاب يحفظ الأطوال فإن $O' K' = O K = ${r}$ سم، ومنه $K'$ تنتمي إلى $(C')$. وبما أن الانسحاب يحول المستقيم إلى مستقيم يوازيه فإن $(O' K') parallel (O K)$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) احسب محيط الدائرة $(C')$ ومساحة قرصها.`,
						answer: `3) المحيط: $P = 2 times 3.14 times ${r} = ${fmtNum(perim)}$ سم. المساحة: $S = 3.14 times ${r}^2 = ${fmtNum(diskArea)}$ سم².`,
						mark: '1'
					}
				]
			},
			hints: [
				'صورة دائرة بانسحاب هي دائرة مركزها صورة المركز ولها نفس نصف القطر.',
				`الرباعي $ABO'O$ متوازي أضلاع، إذن $OO' = AB = ${ab}\\text{ cm}$.`,
				'بما أن الانسحاب يحفظ الأطوال، إذا انتمت $K$ إلى $(C)$ فإن $O\'K\' = OK = r$.'
			],
			solutionStepsAr: [
				`مركز $(C')$ هو $O'$ صورة $O$، ونصف قطرها محفوظ ويساوي $r = ${r}\\text{ cm}$.`,
				`الرباعي $ABO'O$ متوازي أضلاع، ومنه $OO' = AB = ${ab}\\text{ cm}$.`,
				`بما أن $O'K' = OK = ${r}\\text{ cm}$ فإن $K' \\in (C')$، كما أن $(O'K') \\parallel (OK)$.`,
				`محيط $(C')$: $2 \\times 3.14 \\times ${r} = ${fmtNum(perim)}\\text{ cm}$، ومساحة قرصها: $3.14 \\times ${r}^2 = ${fmtNum(diskArea)}\\text{ cm}^2$.`
			],
			finalAnswer: `r = ${r} cm، OO' = ${ab} cm`
		};
	}
};

// ============================================================================
// 4. Pyramid & Cone of Revolution Volume V = (1/3) B h (measurement)
// ============================================================================

const pyramidConeTemplate: ParameterizedTemplate = {
	id: '3am_t3_pyramid_cone',
	grade: '3am',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'الهرم ومخروط الدوران: التصميم والمساحات والحجم',
	curriculumLessonId: 'lesson_3am_t3_pyramid_and_cone',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			// Regular square pyramid with consistent Pythagorean triple (a/2, h, slant) and 3 | a^2 * h
			const configs = [
				{ a: 6, h: 4, slant: 5 },
				{ a: 8, h: 3, slant: 5 },
				{ a: 10, h: 12, slant: 13 },
				{ a: 12, h: 8, slant: 10 },
				{ a: 16, h: 15, slant: 17 },
				{ a: 18, h: 12, slant: 15 }
			];
			const cfg = rng.pick(configs);
			const B = cfg.a * cfg.a;
			const V = (B * cfg.h) / 3;
			const faceArea = (cfg.a * cfg.slant) / 2;
			const AL = 4 * faceArea;
			const AT = AL + B;

			const svgPath = saveSvgAsset(
				`3am_t3_solid_${difficulty}_s${seed}`,
				svgPyramidOrCone({
					kind: 'pyramid',
					baseLabelA: `c = ${cfg.a} cm`,
					heightLabel: `h = ${cfg.h} cm`,
					slantLabel: `${cfg.slant} cm`
				})
			);

			const mcq = buildUniqueMcqOptions(
				`$${V}\\text{ cm}^3$`,
				[
					{
						text: `$${B * cfg.h}\\text{ cm}^3$`,
						diagnosticFeedback: 'نسيتَ الضرب في $\\frac{1}{3}$ (أي القسمة على $3$) في قانون حجم الهرم!'
					},
					{
						text: `$${Math.round((4 * cfg.a * cfg.h) / 3)}\\text{ cm}^3$`,
						diagnosticFeedback: 'استعملتَ محيط القاعدة ($4a$) بدلاً من مساحة القاعدة المربعة ($a^2$).'
					},
					{
						text: `$${Math.round((B * cfg.slant) / 3)}\\text{ cm}^3$`,
						diagnosticFeedback: `استعملتَ ارتفاع الوجه الجانبي (${cfg.slant} cm) بدلاً من ارتفاع الهرم العمودي (${cfg.h} cm).`
					}
				],
				rng
			);

			const qText = `هرم رباعي منتظم قاعدته مربع ضلعه $${cfg.a}\\text{ cm}$ وارتفاعه $h = ${cfg.h}\\text{ cm}$. ما هو حجم هذا الهرم؟`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'هرم رباعي منتظم',
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `مساحة القاعدة المربعة $B = ${cfg.a} \\times ${cfg.a} = ${B}\\text{ cm}^2$، ومنه الحجم $V = \\frac{1}{3} \\times ${B} \\times ${cfg.h} = ${V}\\text{ cm}^3$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `هرم رباعي منتظم $S A B C D$ قاعدته مربع ضلعه $c = ${cfg.a}$ سم، ارتفاعه $S H = ${cfg.h}$ سم، وارتفاع كل وجه جانبي مثلثي يساوي $${cfg.slant}$ سم.`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب مساحة القاعدة $B$، ثم المساحة الجانبية $A_L$ والمساحة الكلية $A_T$ لهذا الهرم.`,
									answer: `1) مساحة القاعدة: $B = ${cfg.a} times ${cfg.a} = ${B}$ سم². مساحة وجه واحد: $frac(${cfg.a} times ${cfg.slant}, 2) = ${faceArea}$ سم²، ومنه $A_L = 4 times ${faceArea} = ${AL}$ سم²، و$A_T = ${AL} + ${B} = ${AT}$ سم².`,
									mark: '1.5'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) احسب حجم هذا الهرم $V$ بوحدة سم³.`,
							answer: `2) الحجم: $V = frac(1, 3) times B times h = frac(1, 3) times ${B} times ${cfg.h} = ${V}$ سم³.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`مساحة القاعدة المربعة هي $B = ${cfg.a} \\times ${cfg.a} = ${B}\\text{ cm}^2$.`,
					'المساحة الجانبية لهرم رباعي منتظم تساوي مجموع مساحات المثلثات الجانبية الأربعة.',
					'حجم الهرم هو ثلث مساحة القاعدة في الارتفاع: $V = \\frac{1}{3} \\times B \\times h$.'
				],
				solutionStepsAr: [
					`مساحة القاعدة المربعة: $B = ${cfg.a}^2 = ${B}\\text{ cm}^2$.`,
					`المساحة الجانبية: $A_L = 4 \\times \\frac{${cfg.a} \\times ${cfg.slant}}{2} = ${AL}\\text{ cm}^2$، والمساحة الكلية: $A_T = ${AL} + ${B} = ${AT}\\text{ cm}^2$.`,
					`الحجم: $V = \\frac{1}{3} \\times ${B} \\times ${cfg.h} = ${V}\\text{ cm}^3$.`
				],
				finalAnswer: `${V} cm³`
			};
		}

		if (difficulty === 'medium') {
			// Cone of revolution with exact integer (r, h, g), exact integer sector angle alpha, and exact 2-dec volume
			const coneConfigs = [
				{ r: 3, h: 4, g: 5 },
				{ r: 4, h: 3, g: 5 },
				{ r: 6, h: 8, g: 10 },
				{ r: 8, h: 6, g: 10 },
				{ r: 9, h: 12, g: 15 },
				{ r: 12, h: 9, g: 15 },
				{ r: 12, h: 16, g: 20 }
			];
			const cfg = rng.pick(coneConfigs);
			const alpha = Math.round((cfg.r / cfg.g) * 360);
			const B = roundTo(PI * cfg.r * cfg.r, 2);
			const V = roundTo((PI * cfg.r * cfg.r * cfg.h) / 3, 2);

			const svgPath = saveSvgAsset(
				`3am_t3_solid_${difficulty}_s${seed}`,
				svgPyramidOrCone({
					kind: 'cone',
					radiusLabel: `r = ${cfg.r} cm`,
					heightLabel: 'h = ?',
					slantLabel: `g = ${cfg.g} cm`
				})
			);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `مخروط دوران نصف قطر قاعدته $r = ${cfg.r}\\text{ cm}$ وطول مولّده $g = ${cfg.g}\\text{ cm}$. احسب حجم هذا المخروط بوحدة $\\text{cm}^3$ بأخذ $\\pi = 3.14$.`,
					questionTextAr: `ما حجم مخروط الدوران الذي نصف قطره $r = ${cfg.r}\\text{ cm}$ ومولّده $g = ${cfg.g}\\text{ cm}$ ($\\pi = 3.14$)؟`,
					imageUrl: svgPath,
					imageCaption: 'مخروط الدوران',
					questionData: {
						answer: V,
						displayTemplate: 'V = {answer} cm³',
						variables: [],
						tolerance: 0.05
					},
					explanation: `نحسب الارتفاع بخاصية فيثاغورس: $h^2 = ${cfg.g}^2 - ${cfg.r}^2 = ${cfg.h * cfg.h}$ أي $h = ${cfg.h}\\text{ cm}$. ثم $V = \\frac{1}{3} \\times 3.14 \\times ${cfg.r}^2 \\times ${cfg.h} = ${fmtNum(V)}\\text{ cm}^3$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `مخروط دوران رأسه $S$، نصف قطر قاعدته $r = ${cfg.r}$ سم، وطول مولّده $g = ${cfg.g}$ سم (نأخذ $pi approx 3.14$).`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) احسب ارتفاع المخروط $h = S O$ بتطبيق خاصية فيثاغورس.`,
									answer: `1) في المثلث القائم $S O A$ وتره $g = ${cfg.g}$ سم: $h^2 = ${cfg.g}^2 - ${cfg.r}^2 = ${cfg.g * cfg.g} - ${cfg.r * cfg.r} = ${cfg.h * cfg.h}$، ومنه $h = ${cfg.h}$ سم.`,
									mark: '1'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) يريد تلميذ إنجاز تصميم لهذا المخروط؛ احسب قيس زاوية القطاع الدائري $alpha$ بالتناسبية.`,
							answer: `2) $alpha = frac(r, g) times 360 degree = frac(${cfg.r}, ${cfg.g}) times 360 degree = ${alpha} degree$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب حجم المخروط $V$ بوحدة سم³.`,
							answer: `3) $B = 3.14 times ${cfg.r}^2 = ${fmtNum(B)}$ سم²، ومنه $V = frac(1, 3) times ${fmtNum(B)} times ${cfg.h} = ${fmtNum(V)}$ سم³.`,
							mark: '1'
						}
					]
				},
				hints: [
					`استعمل خاصية فيثاغورس في المثلث القائم الذي وتره المولّد $g = ${cfg.g}$ لإيجاد الارتفاع $h$.`,
					`في تصميم المخروط، زاوية القطاع الدائري تحسب بالعلاقة $\\alpha = \\frac{r}{g} \\times 360^\\circ$.`,
					`طبّق قانون الحجم $V = \\frac{1}{3} \\times \\pi \\times r^2 \\times h$ باستعمال الارتفاع العمودي $h$ وليس $g$.`
				],
				solutionStepsAr: [
					`بفيثاغورس: $h^2 = ${cfg.g}^2 - ${cfg.r}^2 = ${cfg.h * cfg.h}$، إذن $h = ${cfg.h}\\text{ cm}$.`,
					`زاوية القطاع الدائري: $\\alpha = \\frac{${cfg.r}}{${cfg.g}} \\times 360^\\circ = ${alpha}^\\circ$.`,
					`حجم المخروط: $V = \\frac{1}{3} \\times 3.14 \\times ${cfg.r}^2 \\times ${cfg.h} = ${fmtNum(V)}\\text{ cm}^3$.`
				],
				finalAnswer: `${fmtNum(V)} cm³`
			};
		}

		// Hard: Alternate between reverse height of rectangular pyramid (dm -> L) and cone capacity (cm³ -> mL)
		if (seed % 2 === 0) {
			const L = rng.pick([6, 9, 12]);
			const W = rng.pick([4, 5, 8]);
			const hTrue = rng.int(5, 12);
			const B = L * W;
			const V_dm3 = (B * hTrue) / 3; // exact integer since 3 | L

			const svgPath = saveSvgAsset(
				`3am_t3_solid_${difficulty}_s${seed}`,
				svgPyramidOrCone({
					kind: 'pyramid',
					baseLabelA: `L = ${L} dm`,
					baseLabelB: `l = ${W} dm`,
					heightLabel: 'h = ?'
				})
			);

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: `خزان زجاجي هرمي الشكل قاعدته مستطيل بُعداه $${L}\\text{ dm}$ و $${W}\\text{ dm}$، وسعته تساوي $${V_dm3}\\text{ L}$. ما هو ارتفاع هذا الهرم $h$ بالديسمتر؟ (أدخل العدد فقط)`,
					questionTextAr: `أوجد ارتفاع الهرم $h$ (بالديسمتر) علماً أن قاعدته مستطيل $${L}\\text{ dm} \\times ${W}\\text{ dm}$ وسعته $${V_dm3}\\text{ L}$:`,
					imageUrl: svgPath,
					imageCaption: 'هرم قاعدته مستطيل وسعته معلومة',
					questionData: {
						sentence: 'ارتفاع الهرم يساوي h = ___ dm.',
						acceptedAnswers: acceptNum(hTrue)
					},
					explanation: `بما أن $1\\text{ L} = 1\\text{ dm}^3$ فإن الحجم $V = ${V_dm3}\\text{ dm}^3$. ومساحة القاعدة $B = ${L} \\times ${W} = ${B}\\text{ dm}^2$، ومن $V = \\frac{1}{3} B h$ نجد $h = \\frac{3 \\times ${V_dm3}}{${B}} = ${hTrue}\\text{ dm}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `حوض على شكل هرم قاعدته مستطيل طوله $L = ${L}$ دسم وعرضه $l = ${W}$ دسم، سعته الكلية $${V_dm3}$ لتراً.`,
					content: [
						{
							type: 'columns',
							widths: ['1.5fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) عبّر عن سعة الحوض بوحدة دسم³، ثم احسب مساحة قاعدته $B$ بوحدة دسم².`,
									answer: `1) بما أن $1$ لتر = $1$ دسم³ فإن $V = ${V_dm3}$ دسم³. مساحة القاعدة: $B = ${L} times ${W} = ${B}$ دسم².`,
									mark: '1'
								},
								{
									type: 'image',
									src: svgPath
								}
							]
						},
						{
							type: 'text',
							content: `2) باستعمال قانون حجم الهرم، احسب الارتفاع $h$ لهذا الحوض بوحدة دسم.`,
							answer: `2) لدينا $V = frac(1, 3) times B times h$ أي $${V_dm3} = frac(1, 3) times ${B} times h = ${B / 3} h$، ومنه $h = frac(${3 * V_dm3}, ${B}) = ${hTrue}$ دسم.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) نملأ الحوض بنسبة $75%$ من سعته؛ كم لتراً من الماء يحتويه الحوض؟`,
							answer: `3) كمية الماء: $frac(${V_dm3} times 75, 100) = ${fmtNum(V_dm3 * 0.75)}$ لتراً.`,
							mark: '1'
						}
					]
				},
				hints: [
					'تذكّر العلاقة بين السعة والحجم: $1\\text{ L} = 1\\text{ dm}^3$.',
					`احسب مساحة القاعدة المستطيلة $B = ${L} \\times ${W} = ${B}\\text{ dm}^2$.`,
					'من القانون $V = \\frac{1}{3} \\times B \\times h$ نستنتج $h = \\frac{3 \\times V}{B}$.'
				],
				solutionStepsAr: [
					`السعة بالحجم: $V = ${V_dm3}\\text{ dm}^3$ ومساحة القاعدة $B = ${L} \\times ${W} = ${B}\\text{ dm}^2$.`,
					`حساب الارتفاع: $h = \\frac{3 \\times ${V_dm3}}{${B}} = ${hTrue}\\text{ dm}$.`,
					`كمية الماء عند $75\\%$: $${V_dm3} \\times 0.75 = ${fmtNum(V_dm3 * 0.75)}\\text{ L}$.`
				],
				finalAnswer: `${hTrue} dm`
			};
		}

		// Odd seeds (Hard): Conical cup with r, g -> h via Pythagoras, capacity in mL, cups to fill a jug
		const cupConfigs = [
			{ r: 3, h: 4, g: 5 },
			{ r: 6, h: 8, g: 10 },
			{ r: 5, h: 12, g: 13 },
			{ r: 9, h: 12, g: 15 }
		];
		const cCfg = rng.pick(cupConfigs);
		const V_cm3 = roundTo((PI * cCfg.r * cCfg.r * cCfg.h) / 3, 2);
		const bottleMl = rng.pick([1000, 1500, 2000]);
		const fullCups = Math.floor(bottleMl / V_cm3);

		const svgPath = saveSvgAsset(
			`3am_t3_solid_${difficulty}_s${seed}`,
			svgPyramidOrCone({
				kind: 'cone',
				radiusLabel: `r = ${cCfg.r} cm`,
				heightLabel: 'h = ?',
				slantLabel: `g = ${cCfg.g} cm`
			})
		);

		const wrongNoThird = roundTo(PI * cCfg.r * cCfg.r * cCfg.h, 2);
		const wrongSlant = roundTo((PI * cCfg.r * cCfg.r * cCfg.g) / 3, 2);
		const wrongDiam = roundTo((PI * (2 * cCfg.r) * (2 * cCfg.r) * cCfg.h) / 3, 2);

		const mcq = buildUniqueMcqOptions(
			`$${fmtNum(V_cm3)}\\text{ mL}$`,
			[
				{
					text: `$${fmtNum(wrongNoThird)}\\text{ mL}$`,
					diagnosticFeedback: 'نسيتَ الضرب في $\\frac{1}{3}$ في قانون حجم مخروط الدوران!'
				},
				{
					text: `$${fmtNum(wrongSlant)}\\text{ mL}$`,
					diagnosticFeedback: `استعملتَ طول المولّد $g = ${cCfg.g}\\text{ cm}$ بدلاً من الارتفاع $h = ${cCfg.h}\\text{ cm}$ المحسوب بفيثاغورس.`
				},
				{
					text: `$${fmtNum(wrongDiam)}\\text{ mL}$`,
					diagnosticFeedback: 'عوضت بالقطر بدلاً من نصف القطر $r$ في القانون $\\frac{1}{3} \\pi r^2 h$.'
				}
			],
			rng
		);

		const qText = `كأس مخروطي الشكل نصف قطر قاعدته $r = ${cCfg.r}\\text{ cm}$ وطول مولّده $g = ${cCfg.g}\\text{ cm}$ ($\\pi \\approx 3.14$). ما سعته بالمليلتر ($1\\text{ cm}^3 = 1\\text{ mL}$)؟`;

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'كأس مخروطي الشكل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `أولاً نحسب الارتفاع بفيثاغورس: $h^2 = ${cCfg.g}^2 - ${cCfg.r}^2 = ${cCfg.h * cCfg.h}$ أي $h = ${cCfg.h}\\text{ cm}$. ثم السعة $V = \\frac{1}{3} \\times 3.14 \\times ${cCfg.r}^2 \\times ${cCfg.h} = ${fmtNum(V_cm3)}\\text{ cm}^3 = ${fmtNum(V_cm3)}\\text{ mL}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `قمع مخروطي الشكل نصف قطر فوهته $r = ${cCfg.r}$ سم وطول مولّده $g = ${cCfg.g}$ سم (نأخذ $pi approx 3.14$).`,
				content: [
					{
						type: 'columns',
						widths: ['1.5fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب ارتفاع القمع $h$ بتطبيق خاصية فيثاغورس.`,
								answer: `1) $h^2 = ${cCfg.g}^2 - ${cCfg.r}^2 = ${cCfg.h * cCfg.h}$، ومنه $h = ${cCfg.h}$ سم.`,
								mark: '1'
							},
							{
								type: 'image',
								src: svgPath
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب حجم القمع بوحدة سم³ ثم استنتج سعته بالمليلتر ($1$ سم³ = $1$ مل).`,
						answer: `2) $V = frac(1, 3) times 3.14 times ${cCfg.r}^2 times ${cCfg.h} = ${fmtNum(V_cm3)}$ سم³ = $${fmtNum(V_cm3)}$ مل.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) كم قمعاً مملوءاً بالكامل يمكن تفريغه دون فيضان داخل إناء سعته $${bottleMl}$ مل؟`,
						answer: `3) نقسم $${bottleMl} div ${fmtNum(V_cm3)} approx ${fmtNum(bottleMl / V_cm3)}$، إذن يمكن تفريغ $${fullCups}$ أقماع كاملة.`,
						mark: '1'
					}
				]
			},
			hints: [
				`طبّق خاصية فيثاغورس لإيجاد الارتفاع $h$ انطلاقاً من $g = ${cCfg.g}$ و $r = ${cCfg.r}$.`,
				'تذكّر أن $1\\text{ cm}^3 = 1\\text{ mL}$ لتحويل الحجم إلى سعة بالمليلتر.',
				`اقسم سعة الإناء ($${bottleMl}\\text{ mL}$) على سعة القمع الواحد وخذ الجزء الصحيح.`
			],
			solutionStepsAr: [
				`الارتفاع بفيثاغورس: $h^2 = ${cCfg.g}^2 - ${cCfg.r}^2 = ${cCfg.h * cCfg.h}$، إذن $h = ${cCfg.h}\\text{ cm}$.`,
				`السعة: $V = \\frac{1}{3} \\times 3.14 \\times ${cCfg.r}^2 \\times ${cCfg.h} = ${fmtNum(V_cm3)}\\text{ mL}$.`,
				`عدد الأقماع الكاملة: الجزء الصحيح لحاصل القسمة $${bottleMl} \\div ${fmtNum(V_cm3)}$ هو $${fullCups}$.`
			],
			finalAnswer: `${fmtNum(V_cm3)} mL`
		};
	}
};

// ============================================================================
// 5. Uniform Motion (d = v*t), Percentages & Grouped Statistics Weighted Mean
// ============================================================================

const motionPercentStatsTemplate: ParameterizedTemplate = {
	id: '3am_t3_motion_percent_stats',
	grade: '3am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'الحركة المنتظمة والنسبة المئوية والإحصاء المتوازن',
	curriculumLessonId: 'lesson_3am_t3_proportionality_motion_percent',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part A data: Uniform motion + speed conversion + percentage
		const motionConfigs = [
			{ vKmH: 72, vMS: 20, tHoursDec: 1.25, tLabelAr: '$1$ سا و $15$ د', tLabelKaTeX: '1\\text{ h } 15\\text{ min}' },
			{ vKmH: 54, vMS: 15, tHoursDec: 1.5, tLabelAr: '$1$ سا و $30$ د', tLabelKaTeX: '1\\text{ h } 30\\text{ min}' },
			{ vKmH: 90, vMS: 25, tHoursDec: 2.2, tLabelAr: '$2$ سا و $12$ د', tLabelKaTeX: '2\\text{ h } 12\\text{ min}' },
			{ vKmH: 108, vMS: 30, tHoursDec: 1.75, tLabelAr: '$1$ سا و $45$ د', tLabelKaTeX: '1\\text{ h } 45\\text{ min}' }
		];
		const mc = rng.pick(motionConfigs);
		const distKm = roundTo(mc.vKmH * mc.tHoursDec, 2);

		const ticketBase = rng.pick([800, 1000, 1200, 1600, 2000]);
		const discPct = rng.pick([10, 15, 20, 25]);
		const ticketNew = Math.round(ticketBase * (1 - discPct / 100));

		// Part B data: Grouped statistics in 4 equal-width classes with clean weighted mean & svgBarChart
		// Pick N = 20 or 25 and 4 integer frequencies whose weighted sum gives clean decimal
		const statThemes = [
			{
				title: 'توزيع علامات فرض الرياضيات لتلاميذ قسم في 4 فئات متساوية الطول',
				header: 'فئة العلامات',
				classLabels: ['[0;5[', '[5;10[', '[10;15[', '[15;20]'],
				typstHeaders: ['$[0 ; 5[$', '$[5 ; 10[$', '$[10 ; 15[$', '$[15 ; 20]$'],
				centers: [2.5, 7.5, 12.5, 17.5],
				unit: 'نقطة'
			},
			{
				title: 'توزيع مدد المطالعة الأسبوعية (بالدقائق) لمجموعة تلاميذ في 4 فئات متساوية الطول',
				header: 'فئة المدة (د)',
				classLabels: ['[0;20[', '[20;40[', '[40;60[', '[60;80]'],
				typstHeaders: ['$[0 ; 20[$', '$[20 ; 40[$', '$[40 ; 60[$', '$[60 ; 80]$'],
				centers: [10, 30, 50, 70],
				unit: 'دقيقة'
			}
		];
		const st = rng.pick(statThemes);
		const freqPresets = [
			[3, 7, 10, 5], // N = 25 -> exact with both center sets!
			[2, 6, 8, 4],  // N = 20 -> exact!
			[4, 8, 6, 2],  // N = 20 -> exact!
			[3, 6, 11, 5], // N = 25 -> sum(c_i*n_i) for 2.5.. is 7.5+45+137.5+87.5 = 277.5 / 25 = 11.1!
			[4, 9, 8, 4]   // N = 25 -> 10+67.5+100+70 = 247.5 / 25 = 9.9!
		];
		const freqs = rng.pick(freqPresets);
		const N = freqs.reduce((s, v) => s + v, 0);

		const cumAsc: number[] = [];
		const cumDesc: number[] = [];
		let acc = 0;
		for (let i = 0; i < freqs.length; i++) {
			acc += freqs[i];
			cumAsc.push(acc);
		}
		let rem = N;
		for (let i = 0; i < freqs.length; i++) {
			cumDesc.push(rem);
			rem -= freqs[i];
		}

		const weightedSum = freqs.reduce((s, f, i) => s + f * st.centers[i], 0);
		const weightedMean = roundTo(weightedSum / N, 2);
		const unweightedMean = roundTo(st.centers.reduce((s, c) => s + c, 0) / 4, 2);

		const bars = st.classLabels.map((label, idx) => ({ label, value: freqs[idx] }));
		const svgPath = saveSvgAsset(
			`3am_t3_stats_${difficulty}_s${seed}`,
			svgBarChart(bars, Math.max(...freqs) + 3)
		);

		const tableBlock: ContentBlock = {
			type: 'table',
			headerBackground: true,
			headers: [st.header, ...st.typstHeaders, 'المجموع'],
			cells: [],
			rows: [
				['مركز الفئة $c_i$', ...st.centers.map((c) => `$${fmtNum(c)}$`), '—'],
				['التكرار $n_i$', ...freqs.map((f) => `$${f}$`), `$${N}$`],
				[
					'التكرار المجمع الصاعد',
					...cumAsc.map((v, i) =>
						i >= 1 ? { content: '......', answer: `$${v}$`, mark: i === 2 ? '0.5' : undefined } : `$${v}$`
					),
					'—'
				],
				[
					'التكرار المجمع النازل',
					...cumDesc.map((v, i) =>
						i === 1 || i === 2 ? { content: '......', answer: `$${v}$` } : `$${v}$`
					),
					'—'
				]
			]
		};

		if (difficulty === 'easy') {
			const wrongSpeedMult = roundTo(mc.vKmH * 3.6, 1);
			const wrongTimeSyntax = roundTo(distKm / (Math.floor(mc.tHoursDec) + (mc.tHoursDec % 1) * 0.6), 1);

			const mcq = buildUniqueMcqOptions(
				`$${mc.vKmH}\\text{ km/h}$ ($${mc.vMS}\\text{ m/s}$)`,
				[
					{
						text: `$${mc.vKmH}\\text{ km/h}$ ($${wrongSpeedMult}\\text{ m/s}$)`,
						diagnosticFeedback: 'للتحويل من $\\text{km/h}$ إلى $\\text{m/s}$ نقسم على $3.6$ لا نضرب في $3.6$.'
					},
					{
						text: `$${wrongTimeSyntax}\\text{ km/h}$ ($${mc.vMS}\\text{ m/s}$)`,
						diagnosticFeedback: `انتبه عند تحويل الزمن: $${mc.tLabelKaTeX}$ تساوي $${mc.tHoursDec}\\text{ h}$ بالقسمة على $60$، وليس $${Math.floor(mc.tHoursDec)}.${Math.round((mc.tHoursDec % 1) * 60)}$.`
					},
					{
						text: `$${mc.vMS}\\text{ km/h}$ ($${mc.vKmH}\\text{ m/s}$)`,
						diagnosticFeedback: 'عكستَ وحدتي السرعة $\\text{km/h}$ و $\\text{m/s}$.'
					}
				],
				rng
			);

			const qText = `قطعت حافلة مسافة $${fmtNum(distKm)}\\text{ km}$ بحركة منتظمة خلال مدة $${mc.tLabelKaTeX}$. ما هي سرعتها المتوسطة بوحدة $\\text{km/h}$ ثم بوحدة $\\text{m/s}$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `المدة بالساعات العشرية هي $${mc.tHoursDec}\\text{ h}$، إذن $v = \\frac{${fmtNum(distKm)}}{${mc.tHoursDec}} = ${mc.vKmH}\\text{ km/h}$، وبالقسمة على $3.6$ نجد $${mc.vMS}\\text{ m/s}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الجزأين الآتيين:',
					content: [
						{
							type: 'text',
							content: `1) قطعت حافلة مسافة $${fmtNum(distKm)}$ كلم بحركة منتظمة خلال مدة ${mc.tLabelAr}. احسب سرعتها المتوسطة بوحدة كلم/سا ثم حوّلها إلى م/ثا. وبعد تخفيض بنسبة $${discPct}%$ على تذكرة ثمنها $${ticketBase}$ دج، احسب السعر الجديد.`,
							answer: `1) المدة: $${mc.tHoursDec}$ سا. السرعة: $v = frac(${fmtNum(distKm)}, ${mc.tHoursDec}) = ${mc.vKmH}$ كلم/سا $= ${mc.vKmH} div 3.6 = ${mc.vMS}$ م/ثا. السعر المخفّض: $${ticketBase} times (1 - frac(${discPct}, 100)) = ${ticketNew}$ دج.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) يمثّل المخطط والجدول الآتيان ${st.title} (التكرار الكلي $N = ${N}$): أتمم الجدول ثم احسب المتوسط الحسابي المتوازن $bar(x)$.`
						},
						{ type: 'image', src: svgPath, caption: st.title },
						tableBlock,
						{
							type: 'text',
							content: `احسب المتوسط الحسابي المتوازن $bar(x)$ لهذه السلسلة.`,
							answer: `2) $bar(x) = frac(${freqs.map((f, i) => `${f} times ${fmtNum(st.centers[i])}`).join(' + ')}, ${N}) = frac(${fmtNum(weightedSum)}, ${N}) = ${fmtNum(weightedMean)}$.`,
							mark: '1'
						}
					]
				},
				hints: [
					`حوّل المدة $${mc.tLabelKaTeX}$ إلى ساعات عشرية بقسمة الدقائق على $60$ لتجد $${mc.tHoursDec}\\text{ h}$.`,
					'استعمل العلاقة $v = \\frac{d}{t}$ ثم اقسم على $3.6$ للتحويل من $\\text{km/h}$ إلى $\\text{m/s}$.',
					`المتوسط الحسابي المتوازن يُحسب بضرب كل مركز فئة في تكراره ثم القسمة على التكرار الكلي ($${N}$).`
				],
				solutionStepsAr: [
					`تحويل المدة: $${mc.tLabelKaTeX}$ يساوي $${mc.tHoursDec}\\text{ h}$.`,
					`السرعة المتوسطة: $v = \\frac{${fmtNum(distKm)}}{${mc.tHoursDec}} = ${mc.vKmH}\\text{ km/h} = ${mc.vMS}\\text{ m/s}$.`,
					`السعر بعد التخفيض: $${ticketBase} \\times ${fmtNum(1 - discPct / 100)} = ${ticketNew}\\text{ DA}$.`,
					`المتوسط المتوازن: $\\bar{x} = \\frac{${fmtNum(weightedSum)}}{${N}} = ${fmtNum(weightedMean)}$.`
				],
				finalAnswer: `${mc.vKmH} km/h (${mc.vMS} m/s)`
			};
		}

		if (difficulty === 'medium') {
			const wrongForgetDivide = roundTo(weightedSum, 2);
			const wrongUnweighted = unweightedMean === weightedMean ? roundTo(weightedMean + 1.5, 2) : unweightedMean;
			const wrongDivBy4 = roundTo(weightedSum / 4, 2);

			const mcq = buildUniqueMcqOptions(
				`$${fmtNum(weightedMean)}$`,
				[
					{
						text: `$${fmtNum(wrongUnweighted)}$`,
						diagnosticFeedback: 'حسبتَ متوسط مراكز الفئات دون وزنها بالتكرارات؛ يجب ضرب كل مركز فئة في تكراره ثم القسمة على التكرار الكلي.'
					},
					{
						text: `$${fmtNum(wrongDivBy4)}$`,
						diagnosticFeedback: `قسمتَ مجموع الجداءات على عدد الفئات ($4$) بدلاً من التكرار الكلي ($N = ${N}$).`
					},
					{
						text: `$${fmtNum(wrongForgetDivide)}$`,
						diagnosticFeedback: `هذا مجموع الجداءات $\\sum n_i c_i$ فقط؛ يجب قسمته على التكرار الكلي $N = ${N}$.`
					}
				],
				rng
			);

			const qText = `يمثل المخطط المقابل ${st.title} في الفئات $${st.classLabels.join('$ و $')}$ بتكرارات $${freqs.join('$ و $')}$ (المجموع $N = ${N}$). ما هو **المتوسط الحسابي المتوازن** $\\bar{x}$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '3am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: st.title,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `مراكز الفئات هي $${st.centers.map(fmtNum).join('$، $')}$. ومنه $\\bar{x} = \\frac{${freqs.map((f, i) => `${f} \\times ${fmtNum(st.centers[i])}`).join(' + ')}}{${N}} = \\frac{${fmtNum(weightedSum)}}{${N}} = ${fmtNum(weightedMean)}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الجزأين الآتيين:',
					content: [
						{
							type: 'text',
							content: `1) ${st.title}. أتمم الجدول الآتي ثم احسب المتوسط الحسابي المتوازن $bar(x)$.`
						},
						{ type: 'image', src: svgPath, caption: st.title },
						tableBlock,
						{
							type: 'text',
							content: `احسب المتوسط الحسابي المتوازن $bar(x)$، ثم أعطِ عدد الأفراد الذين قيمتهم أصغر من الحد الأعلى للفئة الثالثة.`,
							answer: `1) $bar(x) = frac(${fmtNum(weightedSum)}, ${N}) = ${fmtNum(weightedMean)}$. والعدد المطلوب يوافق التكرار المجمع الصاعد للفئة الثالثة وهو $${cumAsc[2]}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) تسير سيارة بسرعة منتظمة $v = ${mc.vKmH}$ كلم/سا خلال مدة ${mc.tLabelAr}. احسب المسافة المقطوعة $d$، ثم احسب السعر الجديد لتذكرة قيمتها $${ticketBase}$ دج بعد تخفيض بنسبة $${discPct}%$.`,
							answer: `2) المدة: $${mc.tHoursDec}$ سا، ومنه $d = ${mc.vKmH} times ${mc.tHoursDec} = ${fmtNum(distKm)}$ كلم. السعر الجديد: $${ticketBase} times ${fmtNum(1 - discPct / 100)} = ${ticketNew}$ دج.`,
							mark: '1'
						}
					]
				},
				hints: [
					'مركز الفئة $[a ; b[$ يساوي $\\frac{a + b}{2}$.',
					`المتوسط الحسابي المتوازن يساوي $\\frac{n_1 c_1 + n_2 c_2 + n_3 c_3 + n_4 c_4}{${N}}$.`,
					'التكرار المجمع الصاعد لفئة هو مجموع تكرارها وتكرارات الفئات السابقة لها.'
				],
				solutionStepsAr: [
					`مراكز الفئات هي: $${st.centers.map(fmtNum).join('$ ، $')}$.`,
					`مجموع الجداءات: $${freqs.map((f, i) => `${f} \\times ${fmtNum(st.centers[i])}`).join(' + ')} = ${fmtNum(weightedSum)}$.`,
					`المتوسط الحسابي المتوازن: $\\bar{x} = \\frac{${fmtNum(weightedSum)}}{${N}} = ${fmtNum(weightedMean)}$.`,
					`التكرار المجمع الصاعد للفئة الثالثة: $${freqs[0]} + ${freqs[1]} + ${freqs[2]} = ${cumAsc[2]}$.`
				],
				finalAnswer: fmtNum(weightedMean)
			};
		}

		// Hard: 2-stage average speed v_m = (d1 + d2) / (t1 + t2) + successive % or reverse % + grouped stats weighted mean
		const stageConfigs = [
			{ d1: 120, t1: 2, d2: 180, t2: 2, vm: 75, wrongMean: 75 }, // make sure v1 != v2 and vm != (v1+v2)/2!
			{ d1: 90, t1: 1.5, d2: 110, t2: 1, vm: 80, wrongMean: 85 },   // v1 = 60, v2 = 110 -> (60+110)/2 = 85 != 80!
			{ d1: 100, t1: 2, d2: 140, t2: 1, vm: 80, wrongMean: 95 },     // v1 = 50, v2 = 140 -> avg = 95 != 80!
			{ d1: 120, t1: 2, d2: 90, t2: 1, vm: 70, wrongMean: 75 },      // v1 = 60, v2 = 90 -> avg = 75 != 70!
			{ d1: 160, t1: 2, d2: 90, t2: 1, vm: 83.33, wrongMean: 85 },
			{ d1: 150, t1: 2.5, d2: 120, t2: 1.5, vm: 67.5, wrongMean: 70 } // v1 = 60, v2 = 80 -> avg = 70 != 67.5!
		];
		const sc = rng.pick(stageConfigs.filter((s) => s.vm !== s.wrongMean));
		const v1 = roundTo(sc.d1 / sc.t1, 2);
		const v2 = roundTo(sc.d2 / sc.t2, 2);
		const dTot = sc.d1 + sc.d2;
		const tTot = sc.t1 + sc.t2;

		const mcq = buildUniqueMcqOptions(
			`$${fmtNum(sc.vm)}\\text{ km/h}$`,
			[
				{
					text: `$${fmtNum(sc.wrongMean)}\\text{ km/h}$`,
					diagnosticFeedback: `خطأ شائع! السرعة المتوسطة لرحلة ذات مرحلتين ليست متوسط السرعتين ($\\frac{${fmtNum(v1)} + ${fmtNum(v2)}}{2}$)، بل هي المسافة الكلية مقسومة على المدة الكلية.`
				},
				{
					text: `$${fmtNum(roundTo(dTot / 2, 1))}\\text{ km/h}$`,
					diagnosticFeedback: 'قسمتَ المسافة الكلية على $2$ بدلاً من قسمتها على المدة الكلية للرحلة.'
				},
				{
					text: `$${fmtNum(roundTo(sc.vm * 1.2, 2))}\\text{ km/h}$`,
					diagnosticFeedback: 'تحقق من مجموع المسافتين ومجموع المدتين الزمنيتين.'
				}
			],
			rng
		);

		const qText = `قطعت سيارة مسافة $${sc.d1}\\text{ km}$ في مدة $${fmtNum(sc.t1)}\\text{ h}$ (بسرعة $${fmtNum(v1)}\\text{ km/h}$)، ثم قطعت مسافة $${sc.d2}\\text{ km}$ في مدة $${fmtNum(sc.t2)}\\text{ h}$ (بسرعة $${fmtNum(v2)}\\text{ km/h}$). ما هي السرعة المتوسطة $v_m$ للرحلة الكاملة؟`;

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المسافة الكلية $d_{\\text{total}} = ${sc.d1} + ${sc.d2} = ${dTot}\\text{ km}$ والمدة الكلية $t_{\\text{total}} = ${fmtNum(sc.t1)} + ${fmtNum(sc.t2)} = ${fmtNum(tTot)}\\text{ h}$، ومنه $v_m = \\frac{${dTot}}{${fmtNum(tTot)}} = ${fmtNum(sc.vm)}\\text{ km/h}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: 'أجب عن الجزأين الآتيين مع تبرير خطوات الحساب:',
				content: [
					{
						type: 'text',
						content: `1) قطعت سيارة مسافة $${sc.d1}$ كلم في مدة $${fmtNum(sc.t1)}$ سا، ثم $${sc.d2}$ كلم في مدة $${fmtNum(sc.t2)}$ سا. احسب السرعة المتوسطة $v_m$ للرحلة الكاملة. وبعد تخفيض بنسبة $${discPct}%$ على تذكرة ثمنها الأصلي مجهول ليصبح سعرها $${ticketNew}$ دج، أوجد السعر الأصلي قبل التخفيض.`,
						answer: `1) $v_m = frac(${sc.d1} + ${sc.d2}, ${fmtNum(sc.t1)} + ${fmtNum(sc.t2)}) = frac(${dTot}, ${fmtNum(tTot)}) = ${fmtNum(sc.vm)}$ كلم/سا. وبما أن $P_0 times ${fmtNum(1 - discPct / 100)} = ${ticketNew}$ فإن السعر الأصلي $P_0 = frac(${ticketNew}, ${fmtNum(1 - discPct / 100)}) = ${ticketBase}$ دج.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) ${st.title} (التكرار الكلي $N = ${N}$): أتمم الجدول ثم احسب المتوسط الحسابي المتوازن $bar(x)$.`
					},
					{ type: 'image', src: svgPath, caption: st.title },
					tableBlock,
					{
						type: 'text',
						content: `احسب المتوسط الحسابي المتوازن $bar(x)$ لهذه السلسلة.`,
						answer: `2) $bar(x) = frac(${fmtNum(weightedSum)}, ${N}) = ${fmtNum(weightedMean)}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`السرعة المتوسطة للرحلة الكاملة تساوي المسافة الكلية ($${sc.d1} + ${sc.d2}$) مقسومة على المدة الكلية ($${fmtNum(sc.t1)} + ${fmtNum(sc.t2)}$).`,
				'لا تحسب المتوسط الحسابي البسيط للسرعتين؛ استعمل دوماً $v_m = \\frac{d_{\\text{total}}}{t_{\\text{total}}}$.',
				`لحساب السعر قبل تخفيض بنسبة $${discPct}\\%$، اقسم السعر الجديد على $(1 - ${fmtNum(discPct / 100)})$.`
			],
			solutionStepsAr: [
				`المسافة الكلية $= ${sc.d1} + ${sc.d2} = ${dTot}\\text{ km}$، والمدة الكلية $= ${fmtNum(sc.t1)} + ${fmtNum(sc.t2)} = ${fmtNum(tTot)}\\text{ h}$.`,
				`السرعة المتوسطة: $v_m = \\frac{${dTot}}{${fmtNum(tTot)}} = ${fmtNum(sc.vm)}\\text{ km/h}$.`,
				`السعر الأصلي قبل التخفيض: $\\frac{${ticketNew}}{${fmtNum(1 - discPct / 100)}} = ${ticketBase}\\text{ DA}$.`,
				`المتوسط الحسابي المتوازن للجدول: $\\bar{x} = \\frac{${fmtNum(weightedSum)}}{${N}} = ${fmtNum(weightedMean)}$.`
			],
			finalAnswer: `${fmtNum(sc.vm)} km/h`
		};
	}
};

// ============================================================================
// 6. T3 Integration Situation (الوضعية الإدماجية: 8-pt format)
//    Equation modeling ax + b = cx + d + Cone/Pyramid volume + Motion/Percent
// ============================================================================

const integrationProjectTemplate: ParameterizedTemplate = {
	id: '3am_t3_integration_project',
	grade: '3am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: المعادلات والحجم والحركة المنتظمة',
	curriculumLessonId: 'lesson_3am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Part 1: Equation modeling ax + b = cx + d (water/equipment rental or delivery subscription)
		const aRate = rng.pick([150, 200, 250, 300]);
		const deltaRate = rng.pick([100, 150, 200]);
		const cRate = aRate + deltaRate;
		const xBreak = rng.int(12, 30);
		const dFixed = difficulty === 'easy' ? 0 : rng.pick([1000, 1500, 2000]);
		const bFixed = dFixed + deltaRate * xBreak;
		const xTest = xBreak + rng.pick([5, 8, 10]);
		const cost1Test = aRate * xTest + bFixed;
		const cost2Test = cRate * xTest + dFixed;

		// Part 2: Conical or pyramidal water reservoir (easy: pyramid or cone with given h; medium/hard: cone with Pythagoras or m³->L)
		const usePyramid = difficulty === 'easy' && seed % 2 === 0;
		let solidDescTypst: string;
		let solidDescKatex: string;
		let solidImgPath: string;
		let solidVolM3: number;
		let capacityL: number;
		let solidSolutionTypst: string;
		let solidSolutionKatex: string;

		if (usePyramid) {
			const side = rng.pick([3, 6]);
			const height = rng.pick([2, 3, 4]);
			const B_m2 = side * side;
			solidVolM3 = (B_m2 * height) / 3;
			capacityL = solidVolM3 * 1000;
			solidImgPath = saveSvgAsset(
				`3am_t3_integration_${difficulty}_s${seed}`,
				svgPyramidOrCone({
					kind: 'pyramid',
					baseLabelA: `c = ${side} m`,
					heightLabel: `h = ${height} m`
				})
			);
			solidDescTypst = `حوض ماء على شكل هرم رباعي منتظم قاعدته مربع ضلعه $c = ${side}$ م وارتفاعه $h = ${height}$ م`;
			solidDescKatex = `حوض ماء على شكل هرم رباعي منتظم قاعدته مربع ضلعه $c = ${side}\\text{ m}$ وارتفاعه $h = ${height}\\text{ m}$`;
			solidSolutionTypst = `مساحة القاعدة: $B = ${side}^2 = ${B_m2}$ م². الحجم: $V = frac(1, 3) times ${B_m2} times ${height} = ${solidVolM3}$ م³، أي سعة قدرها $${solidVolM3} times 1000 = ${capacityL}$ لتراً.`;
			solidSolutionKatex = `مساحة القاعدة $B = ${side}^2 = ${B_m2}\\text{ m}^2$، والحجم $V = \\frac{1}{3} \\times ${B_m2} \\times ${height} = ${solidVolM3}\\text{ m}^3 = ${capacityL}\\text{ L}$.`;
		} else {
			// Cone with radius r and height h (for hard, give slant g so h is found via Pythagoras!)
			const coneDim = difficulty === 'hard'
				? rng.pick([
						{ r: 3, h: 4, g: 5 },
						{ r: 6, h: 8, g: 10 }
				  ])
				: rng.pick([
						{ r: 3, h: 2, g: 0 },
						{ r: 3, h: 4, g: 0 },
						{ r: 6, h: 3, g: 0 },
						{ r: 2, h: 3, g: 0 }
				  ]);
			solidVolM3 = roundTo((PI * coneDim.r * coneDim.r * coneDim.h) / 3, 2);
			capacityL = Math.round(solidVolM3 * 1000);
			solidImgPath = saveSvgAsset(
				`3am_t3_integration_${difficulty}_s${seed}`,
				svgPyramidOrCone({
					kind: 'cone',
					radiusLabel: `r = ${coneDim.r} m`,
					heightLabel: difficulty === 'hard' ? 'h = ?' : `h = ${coneDim.h} m`,
					slantLabel: difficulty === 'hard' ? `g = ${coneDim.g} m` : undefined
				})
			);
			if (difficulty === 'hard') {
				solidDescTypst = `خزان ماء على شكل مخروط دوران نصف قطر قاعدته $r = ${coneDim.r}$ م وطول مولّده $g = ${coneDim.g}$ م (نأخذ $pi approx 3.14$)`;
				solidDescKatex = `خزان ماء على شكل مخروط دوران نصف قطر قاعدته $r = ${coneDim.r}\\text{ m}$ وطول مولّده $g = ${coneDim.g}\\text{ m}$ ($\\pi \\approx 3.14$)`;
				solidSolutionTypst = `الارتفاع بفيثاغورس: $h^2 = ${coneDim.g}^2 - ${coneDim.r}^2 = ${coneDim.h * coneDim.h}$ ومنه $h = ${coneDim.h}$ م. الحجم: $V = frac(1, 3) times 3.14 times ${coneDim.r}^2 times ${coneDim.h} = ${fmtNum(solidVolM3)}$ م³، والسعة $= ${capacityL}$ لتراً.`;
				solidSolutionKatex = `الارتفاع بفيثاغورس $h = ${coneDim.h}\\text{ m}$، والحجم $V = \\frac{1}{3} \\times 3.14 \\times ${coneDim.r}^2 \\times ${coneDim.h} = ${fmtNum(solidVolM3)}\\text{ m}^3 = ${capacityL}\\text{ L}$.`;
			} else {
				solidDescTypst = `خزان ماء على شكل مخروط دوران نصف قطر قاعدته $r = ${coneDim.r}$ م وارتفاعه $h = ${coneDim.h}$ م (نأخذ $pi approx 3.14$)`;
				solidDescKatex = `خزان ماء على شكل مخروط دوران نصف قطر قاعدته $r = ${coneDim.r}\\text{ m}$ وارتفاعه $h = ${coneDim.h}\\text{ m}$ ($\\pi \\approx 3.14$)`;
				solidSolutionTypst = `الحجم: $V = frac(1, 3) times 3.14 times ${coneDim.r}^2 times ${coneDim.h} = ${fmtNum(solidVolM3)}$ م³، وبما أن $1$ م³ = $1000$ لتر فإن السعة $= ${capacityL}$ لتراً.`;
				solidSolutionKatex = `الحجم $V = \\frac{1}{3} \\times 3.14 \\times ${coneDim.r}^2 \\times ${coneDim.h} = ${fmtNum(solidVolM3)}\\text{ m}^3 = ${capacityL}\\text{ L}$.`;
			}
		}

		// Part 3: Uniform motion / Average speed d = v*t
		const tripConfigs = [
			{ vKmH: 72, vMS: 20, tDec: 1.5, tAr: '$1$ سا و $30$ د', tKaTeX: '1\\text{ h } 30\\text{ min}' },
			{ vKmH: 54, vMS: 15, tDec: 1.5, tAr: '$1$ سا و $30$ د', tKaTeX: '1\\text{ h } 30\\text{ min}' },
			{ vKmH: 72, vMS: 20, tDec: 2.25, tAr: '$2$ سا و $15$ د', tKaTeX: '2\\text{ h } 15\\text{ min}' },
			{ vKmH: 90, vMS: 25, tDec: 1.2, tAr: '$1$ سا و $12$ د', tKaTeX: '1\\text{ h } 12\\text{ min}' }
		];
		const tc = rng.pick(tripConfigs);
		const tripDistKm = roundTo(tc.vKmH * tc.tDec, 1);

		const contexts = [
			'في إطار مشروع تهيئة مزرعة بستانية نموذجية',
			'أطلقت متوسطة في إطار ناديها البيئي مشروع سقي الحديقة المدرسية',
			'تعاقدت بلدية مع مقاولة لتجهيز فضاء فلاحـي نموذجي'
		];
		const intro = rng.pick(contexts);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.8fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `${intro}: تحتاج إدارة المشروع إلى تعبئة ${solidDescTypst}. كما اتفقت مع ناقل للمعدات يعرض صيغتين لنقل الصناديق (عدد الصناديق هو $x$):\n- الصيغة (1): دفع مبلغ ثابت قدره $${bFixed}$ دج زائد $${aRate}$ دج عن كل صندوق.\n- الصيغة (2): ${dFixed === 0 ? `دفع $${cRate}$ دج عن كل صندوق دون مبلغ ثابت.` : `دفع مبلغ ثابت قدره $${dFixed}$ دج زائد $${cRate}$ دج عن كل صندوق.`}`
					},
					{
						type: 'image',
						src: solidImgPath
					}
				]
			},
			{
				type: 'text',
				content: `1) عبّر بدلالة $x$ عن كلفة كل صيغة، ثم حلّ معادلة من الدرجة الأولى لإيجاد عدد الصناديق $x$ الذي تتساوى فيه الصيغتان. أيّ الصيغتين أنسب إذا كان عدد الصناديق $${xTest}$ صندوقاً؟`,
				answer: `1) كلفة الصيغة (1): $${fmtLinearExpr(aRate, bFixed)}$؛ وكلفة الصيغة (2): $${fmtLinearExpr(cRate, dFixed)}$. المساواة: $${fmtLinearExpr(aRate, bFixed)} = ${fmtLinearExpr(cRate, dFixed)}$، ومنه $${bFixed - dFixed} = ${deltaRate}x$ أي $x = ${xBreak}$ صندوقاً. ومن أجل $x = ${xTest}$: كلفة (1) $= ${cost1Test}$ دج وكلفة (2) $= ${cost2Test}$ دج، فالصيغة (1) أوفر.`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) احسب حجم الخزان/الحوض بالمتر المكعب (م³)، ثم استنتج سعته باللتر ($1$ م³ = $1000$ لتر).`,
				answer: `2) ${solidSolutionTypst}`,
				mark: '3'
			},
			{
				type: 'text',
				content: `3) انطلقت شاحنة التموين من المخزن نحو موقع المشروع الذي يبعد مسافة $${fmtNum(tripDistKm)}$ كلم فوصلت بعد مدة قدرها ${tc.tAr}. احسب سرعتها المتوسطة بوحدة كلم/سا ثم حوّلها إلى م/ثا.`,
				answer: `3) المدة بالساعات العشرية: $${tc.tDec}$ سا. السرعة المتوسطة: $v = frac(${fmtNum(tripDistKm)}, ${tc.tDec}) = ${tc.vKmH}$ كلم/سا $= ${tc.vKmH} div 3.6 = ${tc.vMS}$ م/ثا.`,
				mark: '2.5'
			}
		];

		let qText: string;
		let explanation: string;
		let mcqData: ReturnType<typeof buildUniqueMcqOptions>;
		let finalAns: string;

		if (difficulty === 'easy') {
			const wrongSum = Math.round((bFixed + dFixed) / deltaRate) + 5;
			qText = `${intro} عرضت شركة صيغتين لنقل $x$ صندوقاً: الصيغة (1) تكلفتها $${fmtLinearExpr(aRate, bFixed)}\\text{ DA}$ والصيغة (2) تكلفتها $${fmtLinearExpr(cRate, dFixed)}\\text{ DA}$. ما عدد الصناديق $x$ الذي تتساوى فيه الكلفتان؟`;
			mcqData = buildUniqueMcqOptions(
				`$${xBreak}$`,
				[
					{
						text: `$${Math.round(bFixed / aRate)}$`,
						diagnosticFeedback: `قسمتَ المبلغ الثابت $${bFixed}$ على $${aRate}$ بدلاً من القسمة على الفرق بين السعرين (${deltaRate}).`
					},
					{
						text: `$${wrongSum}$`,
						diagnosticFeedback: 'راجع خطوة عزل الحدود المجهولة في المعادلة وطرح المعاملات.'
					},
					{
						text: `$${xBreak + 4}$`,
						diagnosticFeedback: 'تحقق من الحل بتعويض $x$ في كلتا الصيغتين للتأكد من تساويهما.'
					}
				],
				rng
			);
			explanation = `نحل المعادلة $${fmtLinearExpr(aRate, bFixed)} = ${fmtLinearExpr(cRate, dFixed)}$ فنجد $${deltaRate}x = ${bFixed - dFixed}$، ومنه $x = ${xBreak}$.`;
			finalAns = `${xBreak} صندوقاً`;
		} else if (difficulty === 'medium') {
			qText = `${intro} يوجد ${solidDescKatex}. ما هي سعة هذا الخزان باللتر ($1\\text{ m}^3 = 1000\\text{ L}$)؟`;
			mcqData = buildUniqueMcqOptions(
				`$${capacityL}\\text{ L}$`,
				[
					{
						text: `$${capacityL * 3}\\text{ L}$`,
						diagnosticFeedback: 'نسيتَ الضرب في $\\frac{1}{3}$ في قانون حجم مخروط الدوران $V = \\frac{1}{3} \\pi r^2 h$!'
					},
					{
						text: `$${fmtNum(solidVolM3)}\\text{ L}$`,
						diagnosticFeedback: 'هذا هو الحجم بالمتر المكعب ($\\text{m}^3$)؛ يجب الضرب في $1000$ للتحويل إلى اللتر.'
					},
					{
						text: `$${Math.round(capacityL / 10)}\\text{ L}$`,
						diagnosticFeedback: 'تذكّر أن $1\\text{ m}^3 = 1000\\text{ L}$ وليس $100\\text{ L}$.'
					}
				],
				rng
			);
			explanation = `${solidSolutionKatex}`;
			finalAns = `${capacityL} L`;
		} else {
			const wrongMultSpeed = roundTo(tc.vKmH * 3.6, 1);
			qText = `${intro} قطعت شاحنة التموين مسافة $${fmtNum(tripDistKm)}\\text{ km}$ خلال مدة $${tc.tKaTeX}$، وتحتاج لملء ${solidDescKatex}. ما هي السرعة المتوسطة للشاحنة بوحدة $\\text{m/s}$ وما سعة الخزان باللتر؟`;
			mcqData = buildUniqueMcqOptions(
				`$${tc.vMS}\\text{ m/s}$ و $${capacityL}\\text{ L}$`,
				[
					{
						text: `$${wrongMultSpeed}\\text{ m/s}$ و $${capacityL}\\text{ L}$`,
						diagnosticFeedback: 'للتحويل من $\\text{km/h}$ إلى $\\text{m/s}$ نقسم على $3.6$ لا نضرب في $3.6$.'
					},
					{
						text: `$${tc.vMS}\\text{ m/s}$ و $${capacityL * 3}\\text{ L}$`,
						diagnosticFeedback: 'السرعة صحيحة، لكن في حجم مخروط الدوران نسيتَ الضرب في $\\frac{1}{3}$.'
					},
					{
						text: `$${tc.vKmH}\\text{ m/s}$ و $${fmtNum(solidVolM3)}\\text{ L}$`,
						diagnosticFeedback: `القيمة $${tc.vKmH}$ هي بوحدة $\\text{km/h}$ والقيمة $${fmtNum(solidVolM3)}$ هي بوحدة $\\text{m}^3$؛ يجب تحويل الوحدات.`
					}
				],
				rng
			);
			explanation = `السرعة $v = \\frac{${fmtNum(tripDistKm)}}{${tc.tDec}} = ${tc.vKmH}\\text{ km/h} = ${tc.vMS}\\text{ m/s}$. وفي المخروط: ${solidSolutionKatex}`;
			finalAns = `${tc.vMS} m/s و ${capacityL} L`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: solidImgPath,
				imageCaption: 'الخزان المائي للمشروع',
				questionData: {
					options: mcqData.options,
					correctIndices: mcqData.correctIndices,
					correctIndexes: mcqData.correctIndices
				},
				explanation
			},
			sujetExercise: {
				points: 8,
				customTitle: 'الوضعية الإدماجية',
				instruction: 'اقرأ السند جيداً وأجب عن الأسئلة الثلاثة مع تبرير خطوات الحل والوحدات:',
				content
			},
			hints: [
				`في الجزء (1): صُغ معادلة تساوي الصيغتين $${fmtLinearExpr(aRate, bFixed)} = ${fmtLinearExpr(cRate, dFixed)}$ ثم حلّها لإيجاد $x$.`,
				`في الجزء (2): طبّق قانون الحجم $V = \\frac{1}{3} \\times B \\times h$ وحوّل من $\\text{m}^3$ إلى اللتر بالضرب في $1000$.`,
				`في الجزء (3): حوّل المدة $${tc.tKaTeX}$ إلى ساعات عشرية ($${tc.tDec}\\text{ h}$) ثم استعمل $v = \\frac{d}{t}$ واقسم على $3.6$ للتحويل إلى $\\text{m/s}$.`
			],
			solutionStepsAr: [
				`المعادلة: $${fmtLinearExpr(aRate, bFixed)} = ${fmtLinearExpr(cRate, dFixed)} \\implies ${deltaRate}x = ${bFixed - dFixed} \\implies x = ${xBreak}$.`,
				solidSolutionKatex,
				`تحويل المدة: $${tc.tKaTeX}$ تساوي $${tc.tDec}\\text{ h}$، والسرعة المتوسطة $v = \\frac{${fmtNum(tripDistKm)}}{${tc.tDec}} = ${tc.vKmH}\\text{ km/h} = ${tc.vMS}\\text{ m/s}$.`
			],
			finalAnswer: finalAns
		};
	}
};

export const TEMPLATES_3AM_T3: ParameterizedTemplate[] = [
	equalitiesInequalitiesFramingTemplate,
	equationsModelingTemplate,
	translationTemplate,
	pyramidConeTemplate,
	motionPercentStatsTemplate,
	integrationProjectTemplate
];
