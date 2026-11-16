import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import type { ContentBlock, TableCell } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import {
	saveSvgAsset,
	svgBarChart,
	svgCartesianPlane,
	svgNumberLine,
	svgRectangle
} from '../../svg-helpers';

// ============================================================================
// Shared Helpers (1AM T3 — strictly deterministic, KaTeX / Typst separated)
// ============================================================================

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const diffOffset = difficulty === 'easy' ? 13 : difficulty === 'medium' ? 41 : 79;
	return new SeededRng(Math.trunc(seed) * 977 + salt * 131 + diffOffset);
}

function fmtNum(n: number): string {
	const r = roundTo(n, 2);
	return Object.is(r, -0) ? '0' : String(r);
}

function acceptNum(n: number): string[] {
	const s = fmtNum(n);
	return s.includes('.') ? [s, s.replace('.', ',')] : [s];
}

function fmtSigned(n: number): string {
	const r = roundTo(n, 2);
	if (Object.is(r, -0) || r === 0) return '0';
	return r > 0 ? `+${r}` : `${r}`;
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:Arial,sans-serif">${body}</svg>`;
}

/**
 * Custom SVG generator 1: Isometric / perspective cuboid or cube (متوازي المستطيلات أو المكعب)
 * Supports optional water fill level for aquarium / pool integration problems.
 */
function svgCuboidIsometric(opts: {
	L: number;
	l: number;
	h: number;
	LLabel: string;
	lLabel: string;
	hLabel: string;
	isCube?: boolean;
	fillRatio?: number;
	fillLabel?: string;
}): string {
	const w = 320;
	const h = 215;

	const wPx = opts.isCube ? 94 : 128;
	const hPx = opts.isCube
		? 94
		: Math.max(66, Math.min(104, Math.round(128 * (opts.h / Math.max(opts.L, 1)))));
	const dx = opts.isCube ? 38 : 46;
	const dy = opts.isCube ? 30 : 34;

	const x0 = 46;
	const y0 = Math.round((h - hPx + dy) / 2) - 4;

	// Front face
	const fTL = { x: x0, y: y0 };
	const fTR = { x: x0 + wPx, y: y0 };
	const fBR = { x: x0 + wPx, y: y0 + hPx };
	const fBL = { x: x0, y: y0 + hPx };

	// Back face
	const bTL = { x: x0 + dx, y: y0 - dy };
	const bTR = { x: x0 + wPx + dx, y: y0 - dy };
	const bBR = { x: x0 + wPx + dx, y: y0 + hPx - dy };
	const bBL = { x: x0 + dx, y: y0 + hPx - dy };

	const parts: string[] = [];

	// Shaded top, right, and front faces
	parts.push(
		`<polygon points="${fTL.x},${fTL.y} ${bTL.x},${bTL.y} ${bTR.x},${bTR.y} ${fTR.x},${fTR.y}" fill="#dbeafe" fill-opacity="0.6"/>`,
		`<polygon points="${fTR.x},${fTR.y} ${bTR.x},${bTR.y} ${bBR.x},${bBR.y} ${fBR.x},${fBR.y}" fill="#bfdbfe" fill-opacity="0.65"/>`,
		`<polygon points="${fTL.x},${fTL.y} ${fTR.x},${fTR.y} ${fBR.x},${fBR.y} ${fBL.x},${fBL.y}" fill="#eff6ff" fill-opacity="0.55"/>`
	);

	// Optional water volume fill (aquarium / pool)
	if (opts.fillRatio !== undefined && opts.fillRatio > 0 && opts.fillRatio <= 1) {
		const fh = Math.round(hPx * opts.fillRatio);
		const wy = fBL.y - fh;
		const wTL = { x: x0, y: wy };
		const wTR = { x: x0 + wPx, y: wy };
		const wBTL = { x: x0 + dx, y: wy - dy };
		const wBTR = { x: x0 + wPx + dx, y: wy - dy };
		parts.push(
			`<polygon points="${wTL.x},${wTL.y} ${wTR.x},${wTR.y} ${fBR.x},${fBR.y} ${fBL.x},${fBL.y}" fill="#38bdf8" fill-opacity="0.32"/>`,
			`<polygon points="${wTR.x},${wTR.y} ${wBTR.x},${wBTR.y} ${bBR.x},${bBR.y} ${fBR.x},${fBR.y}" fill="#0284c7" fill-opacity="0.28"/>`,
			`<polygon points="${wTL.x},${wTL.y} ${wBTL.x},${wBTL.y} ${wBTR.x},${wBTR.y} ${wTR.x},${wTR.y}" fill="#7dd3fc" fill-opacity="0.52" stroke="#0284c7" stroke-width="1.3" stroke-dasharray="4 2"/>`
		);
		if (opts.fillLabel) {
			parts.push(
				`<text x="${x0 + wPx / 2}" y="${wy + Math.max(20, fh / 2)}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">${escapeXml(opts.fillLabel)}</text>`
			);
		}
	}

	// Hidden back edges (dashed)
	parts.push(
		`<line x1="${bBL.x}" y1="${bBL.y}" x2="${bTL.x}" y2="${bTL.y}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 3"/>`,
		`<line x1="${bBL.x}" y1="${bBL.y}" x2="${bBR.x}" y2="${bBR.y}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 3"/>`,
		`<line x1="${bBL.x}" y1="${bBL.y}" x2="${fBL.x}" y2="${fBL.y}" stroke="#64748b" stroke-width="1.4" stroke-dasharray="4 3"/>`
	);

	// Visible edges (solid)
	const visibleEdges: [typeof fTL, typeof fTL][] = [
		[fTL, fTR],
		[fTR, fBR],
		[fBR, fBL],
		[fBL, fTL],
		[fTL, bTL],
		[fTR, bTR],
		[fBR, bBR],
		[bTL, bTR],
		[bTR, bBR]
	];
	for (const [p1, p2] of visibleEdges) {
		parts.push(
			`<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1d4ed8" stroke-width="2" stroke-linejoin="round"/>`
		);
	}

	// Cube equal-edge tick marks
	if (opts.isCube) {
		const mx = (fBL.x + fBR.x) / 2;
		const my = fBL.y;
		parts.push(`<line x1="${mx}" y1="${my - 4}" x2="${mx}" y2="${my + 4}" stroke="#dc2626" stroke-width="1.8"/>`);
		const rx = fBL.x;
		const ry = (fTL.y + fBL.y) / 2;
		parts.push(`<line x1="${rx - 4}" y1="${ry}" x2="${rx + 4}" y2="${ry}" stroke="#dc2626" stroke-width="1.8"/>`);
	}

	// Dimension labels
	parts.push(
		`<text x="${fBL.x + wPx / 2}" y="${fBL.y + 19}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.LLabel)}</text>`,
		`<text x="${fBR.x + dx / 2 + 22}" y="${fBR.y - dy / 2 + 14}" text-anchor="start" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.lLabel)}</text>`,
		`<text x="${bBR.x + 10}" y="${(bTR.y + bBR.y) / 2 + 4}" text-anchor="start" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.hLabel)}</text>`
	);

	return wrapSvg(w, h, parts.join(''));
}

/**
 * Custom SVG generator 2: Unfolded 2D net (تصميم) of a cuboid or cube.
 */
function svgCuboidNet(opts: {
	aLabel: string;
	bLabel?: string;
	cLabel?: string;
	isCube?: boolean;
}): string {
	const w = 280;
	const h = 230;

	const wa = opts.isCube ? 40 : 76;
	const hb = opts.isCube ? 40 : 32;
	const hc = opts.isCube ? 40 : 46;

	const startX = Math.round((w - (wa + 2 * hb)) / 2);
	const startY = Math.round((h - (2 * hb + 2 * hc)) / 2) - 4;

	const cx = startX + hb;
	const y0 = startY;
	const y1 = y0 + hb;
	const y2 = y1 + hc;
	const y3 = y2 + hb;
	const y4 = y3 + hc;

	const parts: string[] = [
		// Top base
		`<rect x="${cx}" y="${y0}" width="${wa}" height="${hb}" fill="#eff6ff" stroke="#1e293b" stroke-width="1.6"/>`,
		// Front face
		`<rect x="${cx}" y="${y1}" width="${wa}" height="${hc}" fill="#dbeafe" stroke="#1e293b" stroke-width="1.6"/>`,
		// Left flap
		`<rect x="${startX}" y="${y1}" width="${hb}" height="${hc}" fill="#fef3c7" stroke="#1e293b" stroke-width="1.6"/>`,
		// Right flap
		`<rect x="${cx + wa}" y="${y1}" width="${hb}" height="${hc}" fill="#fef3c7" stroke="#1e293b" stroke-width="1.6"/>`,
		// Bottom base
		`<rect x="${cx}" y="${y2}" width="${wa}" height="${hb}" fill="#eff6ff" stroke="#1e293b" stroke-width="1.6"/>`,
		// Back face
		`<rect x="${cx}" y="${y3}" width="${wa}" height="${hc}" fill="#dbeafe" stroke="#1e293b" stroke-width="1.6"/>`
	];

	// Highlight fold seams in dashed blue
	const foldLines: [number, number, number, number][] = [
		[cx, y1, cx + wa, y1],
		[cx, y2, cx + wa, y2],
		[cx, y3, cx + wa, y3],
		[cx, y1, cx, y2],
		[cx + wa, y1, cx + wa, y2]
	];
	for (const [x1, yy1, x2, yy2] of foldLines) {
		parts.push(
			`<line x1="${x1}" y1="${yy1}" x2="${x2}" y2="${yy2}" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="4 3"/>`
		);
	}

	if (opts.isCube) {
		// Equal-segment ticks + single side length label
		parts.push(
			`<line x1="${cx + wa / 2}" y1="${y4 - 4}" x2="${cx + wa / 2}" y2="${y4 + 4}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<line x1="${cx - 4}" y1="${y0 + hb / 2}" x2="${cx + 4}" y2="${y0 + hb / 2}" stroke="#dc2626" stroke-width="1.8"/>`,
			`<text x="${cx + wa / 2}" y="${y4 + 18}" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${escapeXml(opts.aLabel)}</text>`
		);
	} else {
		parts.push(
			`<text x="${cx + wa / 2}" y="${y4 + 18}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${escapeXml(opts.aLabel)}</text>`,
			`<text x="${startX + hb / 2}" y="${y1 - 6}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b45309">${escapeXml(opts.bLabel || '')}</text>`,
			`<text x="${cx + wa + 8}" y="${y3 + hc / 2 + 4}" text-anchor="start" font-size="11.5" font-weight="bold" fill="#1d4ed8">${escapeXml(opts.cLabel || '')}</text>`
		);
	}

	return wrapSvg(w, h, parts.join(''));
}

// ============================================================================
// 1. Literal Expressions & Simple Equations (a + □ = b, a - □ = b, a × □ = b)
// ============================================================================

const literalExpressionsEquationsTemplate: ParameterizedTemplate = {
	id: '1am_t3_literal_expressions_equations',
	grade: '1am',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الحساب الحرفي وإنتاج عبارة حرفية وحل معادلات بسيطة',
	curriculumLessonId: 'lesson_1am_t3_literal_expressions_simple_equations',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 1, difficulty);

		if (difficulty === 'easy') {
			const k = rng.int(2, 6);
			const p = rng.int(3, 12);
			const xVal = rng.int(4, 11);
			const evalA = k * xVal + p;

			const a1 = rng.int(12, 34);
			const sol1 = rng.int(8, 25);
			const b1 = a1 + sol1;

			const a2 = rng.int(3, 9);
			const sol2 = rng.int(4, 12);
			const b2 = a2 * sol2;

			const rectW = rng.int(3, 7);
			const rectX = rng.int(6, 12);
			const areaRect = rectW * rectX;
			const rectSvg = saveSvgAsset(
				`1am_t3_lit_rect_easy_s${seed}`,
				svgRectangle({
					lengthLabel: 'x',
					widthLabel: `${rectW} cm`,
					vertices: ['A', 'B', 'C', 'D']
				})
			);

			const mcq = buildUniqueMcqOptions(
				`$${sol1}$`,
				[
					{
						text: `$${b1 + a1}$`,
						diagnosticFeedback: 'جمعت العددين بدلاً من طرحهما! لإيجاد المجهول في عملية جمع نطرح الجزء المعلوم من المجموع.'
					},
					{
						text: `$${sol1 + 2}$`,
						diagnosticFeedback: `تحقق من الحساب الذهني لعملية الطرح: $${b1} - ${a1}$.`
					},
					{
						text: `$${a1}$`,
						diagnosticFeedback: `العدد $${a1}$ هو الحد المعلوم في المساواة، وليس قيمة العدد المجهول.`
					}
				],
				rng
			);

			const qText = `أوجد العدد الناقص $\\square$ في المساواة: $${a1} + \\square = ${b1}$.`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: mcq,
					explanation: `اعتماداً على معنى الجمع: $\\square = ${b1} - ${a1} = ${sol1}$ (لأن $${a1} + ${sol1} = ${b1}$).`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الأسئلة الآتية اعتماداً على قواعد الكتابة الحرفية ومعنى العمليات:',
					content: [
						{
							type: 'text',
							content: `1) احسب قيمة العبارة الحرفية $E = ${k}x + ${p}$ من أجل $x = ${xVal}$.`,
							answer: `1) $E = ${k} times ${xVal} + ${p} = ${k * xVal} + ${p} = ${evalA}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) أوجد العدد المجهول $square$ في كل مساواة:\n\nأ) $${a1} + square = ${b1}$ #h(24pt) ب) $${a2} times square = ${b2}$`,
							answer: `2) أ) $square = ${b1} - ${a1} = ${sol1}$ #h(24pt) ب) $square = ${b2} div ${a2} = ${sol2}$.`,
							mark: '1'
						},
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `3) عبّر بدلالة $x$ عن مساحة المستطيل $A B C D$ الموضح جانباً، ثم احسب هذه المساحة من أجل $x = ${rectX}$ سم.`,
									answer: `3) $S = ${rectW} times x = ${rectW}x$. من أجل $x = ${rectX}$ سم: $S = ${rectW} times ${rectX} = ${areaRect}$ سم².`,
									mark: '1'
								},
								{ type: 'image', src: rectSvg }
							]
						}
					]
				},
				hints: [
					'في الكتابة الحرفية نحذف علامة الضرب (×) بين عدد وحرف: 4 × x تُكتب 4x.',
					`لحل المساواة ${a1} + □ = ${b1}، نستعمل عملية الطرح: □ = ${b1} - ${a1}.`,
					'مساحة المستطيل تساوي الطول × العرض.'
				],
				solutionStepsAr: [
					`تعويض x = ${xVal} في العبارة E: ${k} × ${xVal} + ${p} = ${evalA}.`,
					`حل المساواة الأولى: □ = ${b1} - ${a1} = ${sol1}.`,
					`حل المساواة الثانية: □ = ${b2} ÷ ${a2} = ${sol2}.`,
					`مساحة المستطيل بدلالة x هي S = ${rectW}x، وعند x = ${rectX} تكون S = ${areaRect} cm².`
				],
				finalAnswer: `${sol1}`
			};
		}

		if (difficulty === 'medium') {
			const rectW = rng.int(4, 9);
			const rectX = rng.int(7, 15);
			const perimRect = 2 * (rectX + rectW);

			const sol1 = rng.int(7, 22);
			const b1 = rng.int(11, 29);
			const a1 = b1 + sol1; // a1 - □ = b1 => □ = a1 - b1

			const a2 = rng.pick([2, 4, 6, 8]);
			const sol2 = rng.int(3, 11) + 0.5;
			const b2 = a2 * sol2; // Exact integer since a2 is even!

			const rectSvg = saveSvgAsset(
				`1am_t3_lit_rect_med_s${seed}`,
				svgRectangle({
					lengthLabel: 'x',
					widthLabel: `${rectW} cm`,
					vertices: ['E', 'F', 'G', 'H']
				})
			);

			const qText = `حل المعادلة البسيطة الآتية: $${a2} \\times \\square = ${b2}$ (اعتماداً على معنى القسمة).`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						answer: sol2,
						displayTemplate: '\\square = ?',
						variables: [],
						tolerance: 0.01
					},
					explanation: `لإيجاد العامل المجهول في جداء، نقسم الناتج على العامل المعلوم: $\\square = ${b2} \\div ${a2} = ${fmtNum(sol2)}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الأسئلة الآتية بدقة:',
					content: [
						{
							type: 'columns',
							widths: ['2fr', '1fr'],
							children: [
								{
									type: 'text',
									content: `1) يمثل الشكل المقابل مستطيلاً $E F G H$ طوله $x$ وعرضه $${rectW}$ سم.\n\nأ) اكتب عبارة محيط المستطيل $P$ بدلالة $x$ باستعمال قواعد الكتابة الحرفية.\n\nب) احسب قيمة $P$ من أجل $x = ${rectX}$ سم.`,
									answer: `1) أ) $P = 2 times (x + ${rectW}) = 2(x + ${rectW})$.\n\nب) من أجل $x = ${rectX}$ سم: $P = 2 times (${rectX} + ${rectW}) = 2 times ${rectX + rectW} = ${perimRect}$ سم.`,
									mark: '1.5'
								},
								{ type: 'image', src: rectSvg }
							]
						},
						{
							type: 'text',
							content: `2) أوجد قيمة المجهول $square$ في كل معادلة:\n\nأ) $${a1} - square = ${b1}$ #h(24pt) ب) $${a2} times square = ${b2}$`,
							answer: `2) أ) $square = ${a1} - ${b1} = ${sol1}$ #h(24pt) ب) $square = ${b2} div ${a2} = ${fmtNum(sol2)}$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'محيط المستطيل هو ضعف مجموع الطول والعرض: P = 2 × (الطول + العرض).',
					`في عملية الطرح ${a1} - □ = ${b1}، نبحث عن العدد الذي نطرحه من ${a1} لنحصل على ${b1}، أي □ = ${a1} - ${b1}.`,
					`في معادلة الضرب ${a2} × □ = ${b2}، نحسب □ = ${b2} ÷ ${a2} (لاحظ أن الناتج عدد عشري).`
				],
				solutionStepsAr: [
					`محيط المستطيل بدلالة x هو P = 2(x + ${rectW}).`,
					`من أجل x = ${rectX}: P = 2 × (${rectX} + ${rectW}) = ${perimRect} cm.`,
					`حل المعادلة الأولى: □ = ${a1} - ${b1} = ${sol1}.`,
					`حل المعادلة الثانية: □ = ${b2} ÷ ${a2} = ${fmtNum(sol2)}.`
				],
				finalAnswer: fmtNum(sol2)
			};
		}

		// Hard: literal production from shopping scenario + two-step diagram / decimal equation
		const p1 = rng.pick([45, 50, 60, 75, 80, 90]);
		const p2 = rng.priceDA(140, 360, 20);
		const nTest = rng.int(4, 9);
		const totalTest = p1 * nTest + p2;

		const nTarget = rng.int(5, 12) === nTest ? nTest + 2 : rng.int(5, 12);
		const totalTarget = p1 * nTarget + p2;

		const d1 = roundTo(rng.int(14, 48) / 10, 1);
		const d2 = roundTo(rng.int(16, 65) / 10, 1);
		const solDec = roundTo(d1 + d2, 1); // □ - d1 = d2 => □ = d1 + d2

		const items = [
			{ plural: 'كراريس', defPlural: 'الكراريس', extra: 'مقلمة' },
			{ plural: 'أقلام جافة', defPlural: 'الأقلام الجافة', extra: 'علبة أدوات هندسية' },
			{ plural: 'مجلات علمية', defPlural: 'المجلات العلمية', extra: 'مذكرة' }
		];
		const ctx = rng.pick(items);

		const mcq = buildUniqueMcqOptions(
			`$M = ${p1}n + ${p2}$`,
			[
				{
					text: `$M = ${p2}n + ${p1}$`,
					diagnosticFeedback: `الثمن ${p1} DA هو سعر الوحدة الواحدة من ${ctx.defPlural} (أي يضرب في n)، وليس ${p2} DA.`
				},
				{
					text: `$M = (${p1} + ${p2})n$`,
					diagnosticFeedback: `اشترى التلميذ ${ctx.extra} واحدة فقط، فلا يجب ضرب سعرها في العدد n.`
				},
				{
					text: `$M = ${p1} + ${p2} + n$`,
					diagnosticFeedback: `لإيجاد ثمن n قطعة نضرب سعر القطعة (${p1}) في عددها (n) وليس جمعهما.`
				}
			],
			rng
		);

		const qText = `اشترى تلميذ $n$ من ${ctx.defPlural} بسعر $${p1}\\text{ DA}$ للواحد، بالإضافة إلى ${ctx.extra} واحدة بسعر $${p2}\\text{ DA}$. أيّ عبارة حرفية تعبر عن المبلغ الإجمالي $M$ بدلالة $n$؟`;

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: mcq,
				explanation: `ثمن $n$ قطعة هو $${p1} \\times n = ${p1}n$، ونضيف إليه ثمن ${ctx.extra} ($${p2}$)، فنحصل على $M = ${p1}n + ${p2}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `اشترى تلميذ $n$ من ${ctx.defPlural} بسعر $${p1}$ دج للواحد، و${ctx.extra} واحدة بسعر $${p2}$ دج.`,
				content: [
					{
						type: 'text',
						content: `1) عبّر عن المبلغ الإجمالي $M$ بدلالة $n$، ثم احسب $M$ من أجل $n = ${nTest}$.`,
						answer: `1) $M = ${p1}n + ${p2}$. من أجل $n = ${nTest}$: $M = ${p1} times ${nTest} + ${p2} = ${p1 * nTest} + ${p2} = ${totalTest}$ دج.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `2) إذا دفع التلميذ مبلغاً إجمالياً قدره $${totalTarget}$ دج، فأوجد عدد ${ctx.defPlural} المشتراة بحل المساواة $${p1} times square + ${p2} = ${totalTarget}$ اعتماداً على معنى العمليات.`,
						answer: `2) نبحث أولاً عن ثمن ${ctx.defPlural}: $${p1} times square = ${totalTarget} - ${p2} = ${p1 * nTarget}$، ثم $square = ${p1 * nTarget} div ${p1} = ${nTarget}$.`,
						mark: '1'
					},
					{
						type: 'text',
						content: `3) أوجد العدد العشري $square$ الذي يحقق: $square - ${fmtNum(d1)} = ${fmtNum(d2)}$.`,
						answer: `3) $square = ${fmtNum(d2)} + ${fmtNum(d1)} = ${fmtNum(solDec)}$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`ثمن n وحدة يساوي ${p1} × n = ${p1}n، ثم نضيف ثمن القطعة الإضافية (${p2} DA).`,
				`لإيجاد قيمة □ في ${p1} × □ + ${p2} = ${totalTarget}، اطرح أولاً ${p2} من ${totalTarget} ثم اقسم على ${p1}.`,
				`في المساواة □ - ${fmtNum(d1)} = ${fmtNum(d2)}، العدد المطروح منه يساوي مجموع الفرق والمطروح.`
			],
			solutionStepsAr: [
				`العبارة الحرفية للمبلغ الإجمالي: M = ${p1}n + ${p2}.`,
				`من أجل n = ${nTest}: M = ${p1} × ${nTest} + ${p2} = ${totalTest} DA.`,
				`إيجاد n عند المبلغ ${totalTarget} DA: ${p1} × □ = ${totalTarget} - ${p2} = ${p1 * nTarget}، ومنه □ = ${nTarget}.`,
				`حل المعادلة العشرية: □ = ${fmtNum(d2)} + ${fmtNum(d1)} = ${fmtNum(solDec)}.`
			],
			finalAnswer: `M = ${p1}n + ${p2}`
		};
	}
};

// ============================================================================
// 2. Signed Numbers: Number Line & Coordinate Plane (Reading & Comparing ONLY)
// ============================================================================

const signedNumbersCoordsTemplate: ParameterizedTemplate = {
	id: '1am_t3_signed_numbers_coords',
	grade: '1am',
	trimesterId: 't3',
	domain: 'numeric',
	titleAr: 'الأعداد النسبية: التعليم على مستقيم مدرج وفي معلم للمستوي',
	curriculumLessonId: 'lesson_1am_t3_signed_numbers_number_line_coordinate_plane',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 2, difficulty);

		if (difficulty === 'easy') {
			const xA = rng.pick([-5, -4, -3, -2]);
			const xB = rng.pick([-1, 0, 1]);
			const xC = rng.pick([2, 3, 4, 5]);
			const xD = rng.pick(
				[-4, -3, -2, -1, 1, 2, 3, 4].filter((v) => v !== xA && v !== xB && v !== xC)
			);

			const axisUrl = saveSvgAsset(
				`1am_t3_numline_easy_s${seed}`,
				svgNumberLine({
					min: -5,
					max: 5,
					step: 1,
					subTicks: 1,
					marks: [
						{ value: xA, label: 'A', color: '#dc2626' },
						{ value: xB, label: 'B', color: '#16a34a' },
						{ value: xC, label: 'C', color: '#2563eb' }
					]
				})
			);

			// Coordinate plane: M and N with distinct |x| != |y| so (x;y) and (y;x) are always distinct
			const mx = rng.pick([-4, -3, -2, 2, 3, 4]);
			const my = rng.pick([-3, -2, 2, 3].filter((y) => Math.abs(y) !== Math.abs(mx)));
			const nx = rng.pick([-4, -3, -2, 2, 3, 4].filter((x) => x !== mx && Math.abs(x - mx) >= 2));
			const ny = rng.pick([-3, -2, 2, 3].filter((y) => y !== my && Math.abs(y) !== Math.abs(nx)));

			const planeUrl = saveSvgAsset(
				`1am_t3_plane_easy_s${seed}`,
				svgCartesianPlane({
					xMin: -4,
					xMax: 4,
					yMin: -3,
					yMax: 3,
					points: [
						{ x: mx, y: my, label: 'M', color: '#dc2626' },
						{ x: nx, y: ny, label: 'N', color: '#2563eb' }
					]
				})
			);

			const asc = [xA, xB, xC, xD].sort((u, v) => u - v);
			const correctCoords = `$(${fmtSigned(mx)} ; ${fmtSigned(my)})$`;

			const mcq = buildUniqueMcqOptions(
				correctCoords,
				[
					{
						text: `$(${fmtSigned(my)} ; ${fmtSigned(mx)})$`,
						diagnosticFeedback: 'انتبه إلى الترتيب: نكتب أولاً الفاصلة (المحور الأفقي) ثم ثانياً الترتيب (المحور العمودي).'
					},
					{
						text: `$(${fmtSigned(-mx)} ; ${fmtSigned(my)})$`,
						diagnosticFeedback: 'تحقق من إشارة الفاصلة على المحور الأفقي: على يمين المبدأ O موجبة وعلى يساره سالبة.'
					},
					{
						text: `$(${fmtSigned(mx)} ; ${fmtSigned(-my)})$`,
						diagnosticFeedback: 'تحقق من إشارة الترتيب على المحور العمودي: فوق المبدأ O موجبة وتحته سالبة.'
					}
				],
				rng
			);

			const qText = `انطلاقاً من المعلم المتعامد المقابل، ما هما إحداثيا النقطة $M$؟`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: planeUrl,
					imageCaption: 'معلم متعامد للمستوي مبدؤه O',
					questionData: mcq,
					explanation: `نسقط النقطة $M$ على محور الفواصل الأفقي فنجد $${fmtSigned(mx)}$، وعلى محور التراتيب العمودي فنجد $${fmtSigned(my)}$، إذن $M(${fmtSigned(mx)} ; ${fmtSigned(my)})$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'لاحظ المستقيم المدرج والمعلم المتعامد للمستوي ثم أجب عن الأسئلة الآتية:',
					content: [
						{
							type: 'columns',
							widths: ['1.3fr', '1.7fr'],
							children: [
								{
									type: 'text',
									content: `1) اقرأ فواصل النقط $A$ و $B$ و $C$ من المستقيم المدرج.\n\n2) رتّب تصاعدياً الأعداد النسبية الآتية: $${fmtSigned(xA)}$، $${fmtSigned(xB)}$، $${fmtSigned(xC)}$، $${fmtSigned(xD)}$.`,
									answer: `1) $A(${fmtSigned(xA)})$، $B(${fmtSigned(xB)})$، $C(${fmtSigned(xC)})$.\n\n2) الترتيب التصاعدي: $${asc.map(fmtSigned).join(' < ')}$.`,
									mark: '1.5'
								},
								{ type: 'image', src: axisUrl }
							]
						},
						{
							type: 'columns',
							widths: ['1.3fr', '1.7fr'],
							children: [
								{
									type: 'text',
									content: `3) اقرأ إحداثيي كل من النقطتين $M$ و $N$ في المعلم المتعامد للمستوي.`,
									answer: `3) $M(${fmtSigned(mx)} ; ${fmtSigned(my)})$ و $N(${fmtSigned(nx)} ; ${fmtSigned(ny)})$.`,
									mark: '1.5'
								},
								{ type: 'image', src: planeUrl }
							]
						}
					]
				},
				hints: [
					'على المستقيم المدرج، الأعداد السالبة تقع على يسار الصفر والأعداد الموجبة على يمينه.',
					'في الترتيب التصاعدي، نرتب الأعداد من اليسار إلى اليمين على المستقيم المدرج (من الأصغر إلى الأكبر).',
					'في المعلم المتعامد، نكتب إحداثيي نقطة على الشكل (الفاصلة ; الترتيب): نقرأ المحور الأفقي أولاً ثم العمودي.'
				],
				solutionStepsAr: [
					`قراءة الفواصل على المستقيم المدرج: A(${fmtSigned(xA)})، B(${fmtSigned(xB)})، C(${fmtSigned(xC)}).`,
					`الترتيب التصاعدي للأعداد الأربعة: ${asc.map(fmtSigned).join(' < ')}.`,
					`إحداثيا النقطة M هما (${fmtSigned(mx)} ; ${fmtSigned(my)}) وإحداثيا N هما (${fmtSigned(nx)} ; ${fmtSigned(ny)}).`
				],
				finalAnswer: `M(${fmtSigned(mx)} ; ${fmtSigned(my)})`
			};
		}

		if (difficulty === 'medium') {
			const xA = rng.pick([-3.5, -2.5, -1.5]);
			const xB = rng.pick([-0.5, 0.5, 1.5]);
			const xC = rng.pick([2, 2.5, 3.5]);
			const xD = rng.pick([-3, -2, -1, 1, 3].filter((v) => v !== xA && v !== xB && v !== xC));

			const axisUrl = saveSvgAsset(
				`1am_t3_numline_med_s${seed}`,
				svgNumberLine({
					min: -4,
					max: 4,
					step: 1,
					subTicks: 2,
					marks: [
						{ value: xA, label: 'A', color: '#dc2626' },
						{ value: xB, label: 'B', color: '#16a34a' },
						{ value: xC, label: 'C', color: '#2563eb' }
					]
				})
			);

			// 3 distinct points across quadrants, well separated
			const quadCoords: [number, number][] = [
				[rng.pick([-4, -3]), rng.pick([2, 3])],
				[rng.pick([-3, -2]), rng.pick([-3, -2])],
				[rng.pick([2, 3, 4]), rng.pick([-2, 2, 3])]
			];
			// Ensure distinct x and y separation
			if (quadCoords[0][0] === quadCoords[1][0]) quadCoords[1][0] = quadCoords[0][0] === -3 ? -2 : -3;
			const [m, n, kPt] = quadCoords;

			const planeUrl = saveSvgAsset(
				`1am_t3_plane_med_s${seed}`,
				svgCartesianPlane({
					xMin: -4,
					xMax: 4,
					yMin: -3,
					yMax: 3,
					points: [
						{ x: m[0], y: m[1], label: 'M', color: '#dc2626' },
						{ x: n[0], y: n[1], label: 'N', color: '#16a34a' },
						{ x: kPt[0], y: kPt[1], label: 'K', color: '#2563eb' }
					]
				})
			);

			const rawSet = [xA, xB, xC, xD];
			const sortedSet = [...rawSet].sort((u, v) => u - v);
			const shuffled = rng.shuffle(rawSet);
			const correctOrder = sortedSet.map((val) => shuffled.indexOf(val));
			const items = shuffled.map((val, idx) => ({
				id: `ord_${idx}`,
				text: `$${fmtSigned(val)}$`
			}));

			const qText = `بالاستعانة بالمستقيم المدرج المقابل، رتّب الأعداد النسبية الآتية ترتيباً تصاعدياً (من الأصغر إلى الأكبر):`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'ordering',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: axisUrl,
					imageCaption: 'مستقيم مدرج بنصف وحدة (0.5)',
					questionData: {
						items,
						correctOrder
					},
					explanation: `على المستقيم المدرج، كلما اتجهنا من اليسار إلى اليمين زادت قيمة العدد، إذن: $${sortedSet.map(fmtSigned).join(' < ')}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'لاحظ المستقيم المدرج (كل تدريجة صغيرة تمثل $0.5$) والمعلم المتعامد ثم أجب:',
					content: [
						{
							type: 'columns',
							widths: ['1.3fr', '1.7fr'],
							children: [
								{
									type: 'text',
									content: `1) اقرأ فواصل النقط $A$ و $B$ و $C$، ثم قارن بين $${fmtSigned(xA)}$ و $${fmtSigned(xD)}$ باستعمال الرمز المناسب ($<$ أو $>$).`,
									answer: `1) $A(${fmtSigned(xA)})$، $B(${fmtSigned(xB)})$، $C(${fmtSigned(xC)})$. المقارنة: $${xA < xD ? `${fmtSigned(xA)} < ${fmtSigned(xD)}` : `${fmtSigned(xA)} > ${fmtSigned(xD)}`}$.`,
									mark: '1.5'
								},
								{ type: 'image', src: axisUrl }
							]
						},
						{
							type: 'columns',
							widths: ['1.3fr', '1.7fr'],
							children: [
								{
									type: 'text',
									content: `2) اقرأ إحداثيي كل من النقط $M$ و $N$ و $K$ في المعلم المتعامد المقابل.`,
									answer: `2) $M(${fmtSigned(m[0])} ; ${fmtSigned(m[1])})$، $N(${fmtSigned(n[0])} ; ${fmtSigned(n[1])})$، $K(${fmtSigned(kPt[0])} ; ${fmtSigned(kPt[1])})$.`,
									mark: '1.5'
								},
								{ type: 'image', src: planeUrl }
							]
						}
					]
				},
				hints: [
					'كل تدريجة رئيسية مقسمة إلى نصفين، أي أن منتصف المسافة بين تدريجتين متتاليتين يمثل 0.5.',
					'تذكّر أن العدد السالب الذي مسافته عن الصفر أكبر يكون أصغر (مثلاً -3.5 أصغر من -2).',
					'اقرأ أولاً إحداثي النقطة على محور الفواصل الأفقي، ثم إحداثيها على محور التراتيب العمودي.'
				],
				solutionStepsAr: [
					`فواصل النقط على المستقيم المدرج: A(${fmtSigned(xA)})، B(${fmtSigned(xB)})، C(${fmtSigned(xC)}).`,
					`الترتيب التصاعدي: ${sortedSet.map(fmtSigned).join(' < ')}.`,
					`إحداثيات النقط في المعلم: M(${fmtSigned(m[0])} ; ${fmtSigned(m[1])})، N(${fmtSigned(n[0])} ; ${fmtSigned(n[1])})، K(${fmtSigned(kPt[0])} ; ${fmtSigned(kPt[1])}).`
				],
				finalAnswer: sortedSet.map(fmtSigned).join(' < ')
			};
		}

		// Hard: axis-lying point in coordinate plane + bracketing negative decimal between consecutive integers
		const xA = rng.pick([-4.5, -3.5, -2.5]);
		const xB = rng.pick([-1.5, -0.5, 0.5]);
		const xC = rng.pick([1.5, 2.5, 3.5, 4.5]);
		const intLow = Math.floor(xA);
		const intHigh = Math.ceil(xA);

		const axisUrl = saveSvgAsset(
			`1am_t3_numline_hard_s${seed}`,
			svgNumberLine({
				min: -5,
				max: 5,
				step: 1,
				subTicks: 2,
				marks: [
					{ value: xA, label: 'A', color: '#dc2626' },
					{ value: xB, label: 'B', color: '#16a34a' },
					{ value: xC, label: 'C', color: '#2563eb' }
				]
			})
		);

		const onYAxis = seed % 2 === 0;
		const axisVal = onYAxis ? rng.pick([-3, -2, 2, 3]) : rng.pick([-4, -3, -2, 2, 3, 4]);
		const mx = onYAxis ? 0 : axisVal;
		const my = onYAxis ? axisVal : 0;

		const nx = rng.pick([-3, -2, 2, 3].filter((x) => Math.abs(x - mx) >= 2));
		const ny = rng.pick([-3, -2, 2, 3].filter((y) => Math.abs(y - my) >= 2));
		const kx = rng.pick([-4, -3, 2, 3, 4].filter((x) => Math.abs(x - mx) >= 2 && x !== nx));
		const ky = rng.pick([-3, -2, 2, 3].filter((y) => Math.abs(y - my) >= 2 && y !== ny));

		const planeUrl = saveSvgAsset(
			`1am_t3_plane_hard_s${seed}`,
			svgCartesianPlane({
				xMin: -4,
				xMax: 4,
				yMin: -3,
				yMax: 3,
				points: [
					{ x: mx, y: my, label: 'M', color: '#dc2626' },
					{ x: nx, y: ny, label: 'N', color: '#16a34a' },
					{ x: kx, y: ky, label: 'K', color: '#2563eb' }
				]
			})
		);

		const correctM = `$(${fmtSigned(mx)} ; ${fmtSigned(my)})$`;
		const swappedM = `$(${fmtSigned(my)} ; ${fmtSigned(mx)})$`;
		const oppZero = `$(${fmtSigned(-mx)} ; ${fmtSigned(-my)})$`;
		const samePair = onYAxis ? `$(${fmtSigned(axisVal)} ; ${fmtSigned(axisVal)})$` : `$(${fmtSigned(axisVal)} ; ${fmtSigned(axisVal)})$`;

		const mcq = buildUniqueMcqOptions(
			correctM,
			[
				{
					text: swappedM,
					diagnosticFeedback: onYAxis
						? 'النقطة M تقع على محور التراتيب، إذن فاصلتها معدومة (0) وليس ترتيبها!'
						: 'النقطة M تقع على محور الفواصل، إذن ترتيبها معدوم (0) وليس فاصلتها!'
				},
				{
					text: oppZero,
					diagnosticFeedback: 'تحقق من إشارة الإحداثي غير المعدوم على المحور.'
				},
				{
					text: samePair,
					diagnosticFeedback: 'أي نقطة تقع على أحد المحورين يكون أحد إحداثييها مساوياً للصفر (0).'
				}
			],
			rng
		);

		const qText = `انطلاقاً من المعلم المتعامد المقابل، ما هما إحداثيا النقطة $M$ الواقعة على أحد المحورين؟`;

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: planeUrl,
				imageCaption: 'معلم متعامد للمستوي مبدؤه O',
				questionData: mcq,
				explanation: onYAxis
					? `النقطة $M$ تنتمي إلى محور التراتيب ففاصلتها $0$ وترتيبها $${fmtSigned(my)}$، إذن $M(0 ; ${fmtSigned(my)})$.`
					: `النقطة $M$ تنتمي إلى محور الفواصل ففاصلتها $${fmtSigned(mx)}$ وترتيبها $0$، إذن $M(${fmtSigned(mx)} ; 0)$.`
			},
			sujetExercise: {
				points: 3,
				instruction: 'استعن بالمستقيم المدرج وبالمعلم المتعامد للمستوي للإجابة عن الأسئلة:',
				content: [
					{
						type: 'columns',
						widths: ['1.3fr', '1.7fr'],
						children: [
							{
								type: 'text',
								content: `1) عيّن فواصل النقط $A$ و $B$ و $C$، ثم احصر فاصلة النقطة $A$ بين عددين صحيحين نسبيين متتاليين.\n\n2) سُجّلت في ثلاث مدن درجات الحرارة: $${fmtSigned(xA)}$ °C، $${fmtSigned(xB)}$ °C، $${fmtSigned(xC)}$ °C. أيّ درجة تمثل الجو الأكثر برودة؟`,
								answer: `1) $A(${fmtSigned(xA)})$، $B(${fmtSigned(xB)})$، $C(${fmtSigned(xC)})$. الحصر: $${intLow} < ${fmtSigned(xA)} < ${intHigh}$.\n\n2) الدرجة الأكثر برودة هي الأصغر: $${fmtSigned(xA)}$ °C.`,
								mark: '1.5'
							},
							{ type: 'image', src: axisUrl }
						]
					},
					{
						type: 'columns',
						widths: ['1.3fr', '1.7fr'],
						children: [
							{
								type: 'text',
								content: `3) اقرأ إحداثيي كل من النقط $M$ و $N$ و $K$ (انتبه لموضع النقطة $M$).`,
								answer: `3) $M(${fmtSigned(mx)} ; ${fmtSigned(my)})$، $N(${fmtSigned(nx)} ; ${fmtSigned(ny)})$، $K(${fmtSigned(kx)} ; ${fmtSigned(ky)})$.`,
								mark: '1.5'
							},
							{ type: 'image', src: planeUrl }
						]
					}
				]
			},
			hints: [
				'النقطة الواقعة على محور الفواصل ترتيبها 0، والنقطة الواقعة على محور التراتيب فاصلتها 0.',
				`لحصر العدد السالب ${fmtSigned(xA)} بين صحيحين متتاليين، انظر إلى التدريجتين الصحيحتين اللتين تحيطان به على المستقيم المدرج.`,
				'الدرجة الأكثر برودة توافق أصغر عدد نسبي (الأبعد يساراً عن الصفر).'
			],
			solutionStepsAr: [
				`قراءة الفواصل: A(${fmtSigned(xA)})، B(${fmtSigned(xB)})، C(${fmtSigned(xC)}).`,
				`حصر فاصلة A: ${intLow} < ${fmtSigned(xA)} < ${intHigh}.`,
				`أصغر درجة حرارة هي ${fmtSigned(xA)} °C لأنها الأبعد نحو يسار الصفر.`,
				`إحداثيات المعلم: M(${fmtSigned(mx)} ; ${fmtSigned(my)})، N(${fmtSigned(nx)} ; ${fmtSigned(ny)})، K(${fmtSigned(kx)} ; ${fmtSigned(ky)}).`
			],
			finalAnswer: `M(${fmtSigned(mx)} ; ${fmtSigned(my)})`
		};
	}
};

// ============================================================================
// 3. Proportionality Tables, Percentages (%) & Map Scale (1AM: coeff & unitary)
// ============================================================================

const proportionalityPctScaleTemplate: ParameterizedTemplate = {
	id: '1am_t3_proportionality_pct_scale',
	grade: '1am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'التناسبية والنسبة المئوية ومقياس الخريطة',
	curriculumLessonId: 'lesson_1am_t3_proportionality_tables_coefficient',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 3, difficulty);

		if (difficulty === 'easy') {
			const contexts = [
				{
					intro: 'يمثل الجدول الآتي ثمن كراريس متماثلة بدلالة عددها.',
					row1: 'عدد الكراريس',
					row2: 'الثمن (دج)',
					unitOut: 'دج',
					kPool: [40, 50, 60, 80, 100]
				},
				{
					intro: 'يمثل الجدول الآتي كتلة البرتقال وثمنها في سوق الخضر.',
					row1: 'الكتلة (كغ)',
					row2: 'الثمن (دج)',
					unitOut: 'دج',
					kPool: [120, 140, 150, 160, 200]
				},
				{
					intro: 'تقطع دراجة نارية مسافة ثابتة كل ساعة وفق جدول التناسبية الآتي:',
					row1: 'المدة (سا)',
					row2: 'المسافة (كلم)',
					unitOut: 'كلم',
					kPool: [40, 50, 60, 70, 80]
				}
			];
			const ctx = rng.pick(contexts);
			const k = rng.pick(ctx.kPool);
			const xs = rng.pickDistinct([2, 3, 4, 5, 6, 8, 10], 4).sort((a, b) => a - b);
			const [x1, x2, x3, x4] = xs;
			const [y1, y2, y3, y4] = xs.map((x) => x * k);

			// Clean 10% or 20% of y4 (y4 is multiple of 20 -> (y4 * pct) % 100 === 0 when pct = 10 or 20 and y4 div by 10, which holds for all k in kPool!)
			const pct = rng.pick([10, 20]);
			const pctAmount = Math.round((y4 * pct) / 100);

			const qText = `${ctx.intro} إذا كان ما يوافق $${x1}$ هو $${y1}$، فما هي القيمة الموافقة للعدد $${x2}$؟ (اكتب العدد فقط).`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'fill_blank',
					questionText: qText,
					questionTextAr: qText,
					questionData: {
						sentence: `القيمة الموافقة للعدد ${x2} هي ___ ${ctx.unitOut}.`,
						acceptedAnswers: acceptNum(y2)
					},
					explanation: `معامل التناسبية هو $${y1} \\div ${x1} = ${k}$، إذن القيمة الموافقة لـ $${x2}$ هي $${x2} \\times ${k} = ${y2}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `${ctx.intro}`,
					content: [
						{
							type: 'table',
							headerBackground: true,
							headers: [ctx.row1, `$${x1}$`, `$${x2}$`, { content: '......', answer: `$${x3}$`, mark: '0.5' }, `$${x4}$`],
							cells: [],
							rows: [
								[
									ctx.row2,
									`$${y1}$`,
									{ content: '......', answer: `$${y2}$`, mark: '0.5' },
									`$${y3}$`,
									{ content: '......', answer: `$${y4}$`, mark: '0.5' }
								]
							]
						},
						{
							type: 'text',
							content: '1) احسب معامل التناسبية الذي يمكّن من الانتقال من السطر الأول إلى السطر الثاني، ثم أتمم الجدول.',
							answer: `1) معامل التناسبية: $k = ${y1} div ${x1} = ${k}$. نحسب: $${x2} times ${k} = ${y2}$، $${y3} div ${k} = ${x3}$، $${x4} times ${k} = ${y4}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب $${pct}%$ من القيمة $${y4}$ (${ctx.unitOut}).`,
							answer: `2) $${y4} times frac(${pct}, 100) = ${pctAmount}$ ${ctx.unitOut}.`,
							mark: '0.5'
						}
					]
				},
				hints: [
					'لإيجاد معامل التناسبية، اقسم قيمة السطر الثاني على قيمة السطر الأول في العمود الكامل.',
					`احسب ${y1} ÷ ${x1} لتعرف قيمة الوحدة الواحدة.`,
					`اضرب ${x2} في معامل التناسبية لإيجاد القيمة المجهولة.`
				],
				solutionStepsAr: [
					`معامل التناسبية: ${y1} ÷ ${x1} = ${k}.`,
					`القيمة الموافقة لـ ${x2}: ${x2} × ${k} = ${y2}.`,
					`القيمة المجهولة في السطر الأول: ${y3} ÷ ${k} = ${x3}، والموافقة لـ ${x4}: ${x4} × ${k} = ${y4}.`,
					`حساب ${pct}% من ${y4}: (${y4} × ${pct}) ÷ 100 = ${pctAmount}.`
				],
				finalAnswer: `${y2} ${ctx.unitOut}`
			};
		}

		if (difficulty === 'medium') {
			const isDiscountVariant = seed % 2 === 0;
			// Non-proportionality check table (e.g. square side vs area, or child age vs height)
			const side1 = rng.int(2, 4);
			const side2 = side1 + 2;
			const side3 = side2 + 3;
			const area1 = side1 * side1;
			const area2 = side2 * side2;
			const area3 = side3 * side3;

			if (isDiscountVariant) {
				const items = ['محفظة مدرسية', 'معطف رياضي', 'حاسبة علمية', 'حذاء رياضي'];
				const item = rng.pick(items);
				const price = rng.priceDA(1200, 4800, 200);
				const rate = rng.pick([10, 15, 20, 25, 30]);
				const delta = Math.round((price * rate) / 100);
				const isIncrease = seed % 4 === 2;
				const newPrice = isIncrease ? price + delta : price - delta;
				const opWord = isIncrease ? 'زيادة' : 'تخفيض';
				const defOpWord = isIncrease ? 'الزيادة' : 'التخفيض';
				const opLabel = isIncrease ? 'بعد الزيادة' : 'بعد التخفيض';

				const mcq = buildUniqueMcqOptions(
					`$${newPrice}\\text{ DA}$`,
					[
						{
							text: `$${delta}\\text{ DA}$`,
							diagnosticFeedback: `هذا هو مبلغ ${defOpWord} فقط، وليس السعر الجديد ${opLabel}.`
						},
						{
							text: `$${isIncrease ? price - delta : price + delta}\\text{ DA}$`,
							diagnosticFeedback: isIncrease
								? 'الزيادة تُجمع مع السعر الأصلي ولا تُطرح منه.'
								: 'التخفيض يُطرح من السعر الأصلي ولا يُجمع معه.'
						},
						{
							text: `$${isIncrease ? price + rate : price - rate}\\text{ DA}$`,
							diagnosticFeedback: 'لا نجمع أو نطرح النسبة المئوية مباشرة، بل نحسب أولاً (السعر × النسبة) ÷ 100.'
						}
					],
					rng
				);

				const qText = `يبلغ سعر ${item} $${price}\\text{ DA}$، وطُبّق عليه ${opWord} بنسبة $${rate}\\%$. ما هو السعر الجديد ${opLabel}؟`;

				return {
					templateId: this.id,
					seed,
					grade: '1am',
					trimesterId: 't3',
					difficulty,
					domain: this.domain,
					titleAr: this.titleAr,
					quizQuestion: {
						type: 'mcq',
						questionText: qText,
						questionTextAr: qText,
						questionData: mcq,
						explanation: `قيمة ${defOpWord} هي $${price} \\times \\frac{${rate}}{100} = ${delta}\\text{ DA}$، إذن السعر الجديد $= ${price} ${isIncrease ? '+' : '-'} ${delta} = ${newPrice}\\text{ DA}$.`
					},
					sujetExercise: {
						points: 3,
						instruction: 'أجب عن الجزأين المستقلين الآتيين:',
						content: [
							{
								type: 'text',
								content: `1) يُعرض ${item} بسعر $${price}$ دج، وطُبّق عليه ${opWord} بنسبة $${rate}%$. احسب مبلغ ${defOpWord} ثم استنتج السعر الجديد ${opLabel}.`,
								answer: `1) مبلغ ${defOpWord}: $${price} times frac(${rate}, 100) = ${delta}$ دج. السعر الجديد: $${price} ${isIncrease ? '+' : '-'} ${delta} = ${newPrice}$ دج.`,
								mark: '1.5'
							},
							{
								type: 'text',
								content: '2) يربط الجدول الآتي طول ضلع مربع بمساحته. هل هذا الجدول جدول تناسبية؟ برّر إجابتك.',
								answer: `2) نحسب الحواصل: $${area1} div ${side1} = ${side1}$ بينما $${area2} div ${side2} = ${side2}$. الحواصل غير متساوية، إذن الجدول لا يمثل وضعية تناسبية.`,
								mark: '1.5'
							},
							{
								type: 'table',
								headerBackground: true,
								headers: ['طول الضلع (سم)', `$${side1}$`, `$${side2}$`, `$${side3}$`],
								cells: [],
								rows: [['المساحة (سم²)', `$${area1}$`, `$${area2}$`, `$${area3}$`]]
							}
						]
					},
					hints: [
						`لحساب ${rate}% من ${price}، احسب (${price} × ${rate}) ÷ 100.`,
						isIncrease ? 'أضف قيمة الزيادة إلى السعر الأصلي.' : 'اطرح قيمة التخفيض من السعر الأصلي.',
						'لمعرفة هل الجدول جدول تناسبية، نقسم كل عدد من السطر الثاني على العدد الموافق له من السطر الأول ونقارن النواتج.'
					],
					solutionStepsAr: [
						`مبلغ ${defOpWord}: (${price} × ${rate}) ÷ 100 = ${delta} DA.`,
						`السعر الجديد: ${price} ${isIncrease ? '+' : '-'} ${delta} = ${newPrice} DA.`,
						`فحص التناسبية: ${area1} ÷ ${side1} = ${side1} ≠ ${area2} ÷ ${side2} = ${side2}، إذن الجدول ليس جدول تناسبية.`
					],
					finalAnswer: `${newPrice} DA`
				};
			}

			// School percentage variant
			const totalStudents = rng.pick([25, 40, 50, 80, 100, 200]);
			const validRates = [20, 25, 30, 40, 60, 75, 80].filter((r) => ((totalStudents * r) / 100) % 1 === 0);
			const passRate = rng.pick(validRates);
			const passed = (totalStudents * passRate) / 100;
			const failed = totalStudents - passed;
			const failRate = 100 - passRate;

			const mcq = buildUniqueMcqOptions(
				`$${passRate}\\%$`,
				[
					{
						text: `$${failRate}\\%$`,
						diagnosticFeedback: 'هذه نسبة التلاميذ غير الناجحين (المكملة إلى 100%) وليست نسبة الناجحين.'
					},
					{
						text: `$${passed}\\%$`,
						diagnosticFeedback: `العدد ${passed} هو عدد الناجحين وليس نسبتهم المئوية، يجب قسمته على العدد الكلي (${totalStudents}) ثم الضرب في 100.`
					},
					{
						text: `$${roundTo((passed * 10) / totalStudents, 1)}\\%$`,
						diagnosticFeedback: 'تحقق من الضرب في 100 وليس في 10 عند حساب النسبة المئوية.'
					}
				],
				rng
			);

			const qText = `تقدم لاختبار الرياضيات $${totalStudents}$ تلميذاً من السنة الأولى متوسط، فنجح منهم $${passed}$ تلميذاً. ما هي النسبة المئوية للنجاح؟`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					questionData: mcq,
					explanation: `النسبة المئوية للنجاح هي $\\frac{${passed}}{${totalStudents}} \\times 100 = ${passRate}\\%$.`
				},
				sujetExercise: {
					points: 3,
					instruction: 'أجب عن الجزأين الآتيين:',
					content: [
						{
							type: 'text',
							content: `1) اجتاز اختبار الرياضيات $${totalStudents}$ تلميذاً فنجح منهم $${passed}$ تلميذاً. احسب النسبة المئوية للنجاح، ثم استنتج عدد التلاميذ غير الناجحين ونسبتهم المئوية.`,
							answer: `1) نسبة النجاح: $frac(${passed}, ${totalStudents}) times 100 = ${passRate}%$. غير الناجحين: $${totalStudents} - ${passed} = ${failed}$ تلميذاً، ونسبتهم $100% - ${passRate}% = ${failRate}%$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: '2) هل الجدول الآتي (طول ضلع مربع ومساحته) يمثل وضعية تناسبية؟ برّر.',
							answer: `2) $${area1} div ${side1} = ${side1}$ و $${area2} div ${side2} = ${side2}$. بما أن $${side1} != ${side2}$ فالجدول لا يمثل وضعية تناسبية.`,
							mark: '1.5'
						},
						{
							type: 'table',
							headerBackground: true,
							headers: ['طول الضلع (سم)', `$${side1}$`, `$${side2}$`, `$${side3}$`],
							cells: [],
							rows: [['المساحة (سم²)', `$${area1}$`, `$${area2}$`, `$${area3}$`]]
						}
					]
				},
				hints: [
					'النسبة المئوية للناجحين تساوي (عدد الناجحين ÷ العدد الكلي) × 100.',
					`اقسم ${passed} على ${totalStudents} ثم اضرب الناتج في 100.`,
					'الجدول يمثل وضعية تناسبية إذا كانت نواتج قسمة السطر الثاني على السطر الأول متساوية في كل الأعمدة.'
				],
				solutionStepsAr: [
					`نسبة النجاح: (${passed} ÷ ${totalStudents}) × 100 = ${passRate}%.`,
					`عدد غير الناجحين: ${totalStudents} - ${passed} = ${failed}، ونسبتهم: 100% - ${passRate}% = ${failRate}%.`,
					`في الجدول: ${area1} ÷ ${side1} = ${side1} ≠ ${area2} ÷ ${side2} = ${side2}، إذن الجدول ليس جدول تناسبية.`
				],
				finalAnswer: `${passRate}%`
			};
		}

		// Hard: Map / Plan Scale (مقياس الخريطة أو التصميم) + proportionality table (NO cross-multiplication!)
		const useMap = seed % 2 === 0;
		const scaleE = useMap ? rng.pick([25000, 50000, 100000, 200000]) : rng.pick([200, 500, 1000, 2000]);
		const factorToCm = useMap ? 100000 : 100;
		const realUnitAr = useMap ? 'كلم' : 'م';
		const realUnitEn = useMap ? 'km' : 'm';

		const stepCm = useMap && scaleE === 25000 ? 4 : useMap && scaleE === 50000 ? 2 : 1;
		const mults = rng.pickDistinct([2, 3, 4, 5, 6, 7], 3).sort((a, b) => a - b);
		const d1 = mults[0] * stepCm;
		const d2 = mults[1] * stepCm;
		const d3 = mults[2] * stepCm;
		const D1 = (d1 * scaleE) / factorToCm;
		const D2 = (d2 * scaleE) / factorToCm;
		const D3 = (d3 * scaleE) / factorToCm;
		const D1Cm = D1 * factorToCm;

		const introTypst = useMap
			? `على خريطة، قيسَت المسافة بين مدينتين فكانت $${d1}$ سم، بينما المسافة الحقيقية بينهما هي $${D1}$ كلم.`
			: `يمثل تصميم ساحة مدرسية قطعة مستقيم طولها على التصميم $${d1}$ سم وطولها الحقيقي $${D1}$ م.`;

		const introKaTeX = useMap
			? `على خريطة، قيسَت المسافة بين مدينتين فكانت $${d1}\\text{ cm}$، بينما المسافة الحقيقية بينهما هي $${D1}\\text{ km}$.`
			: `يمثل تصميم ساحة مدرسية طولاً قدره $${d1}\\text{ cm}$ على التصميم لمسافة حقيقية تساوي $${D1}\\text{ m}$.`;

		const mcq = buildUniqueMcqOptions(
			`$\\frac{1}{${scaleE}}$`,
			[
				{
					text: D1 % d1 === 0 ? `$\\frac{1}{${D1 / d1}}$` : `$\\frac{${d1}}{${D1}}$`,
					diagnosticFeedback: `تذكّر تحويل المسافة الحقيقية (${D1} ${realUnitEn}) إلى السنتيمتر (cm) قبل حساب المقياس.`
				},
				{
					text: `$\\frac{1}{${scaleE * 10}}$`,
					diagnosticFeedback: `تحقق من معامل التحويل بين ${realUnitEn} و cm (1 km = 100000 cm، و 1 m = 100 cm).`
				},
				{
					text: `$${scaleE}$`,
					diagnosticFeedback: 'مقياس التصغير هو كسر بسطه 1 (المسافة على التصميم ÷ المسافة الحقيقية).'
				}
			],
			rng
		);

		const qText = `${introKaTeX} ما هو مقياس هذا الرسم؟`;

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				questionData: mcq,
				explanation: `نحول $${D1}\\text{ ${realUnitEn}}$ إلى السنتيمتر: $${D1Cm}\\text{ cm}$، ثم نختزل الكسر بقسمة البسط والمقام على $${d1}$: $\\frac{${d1}}{${D1Cm}} = \\frac{1}{${scaleE}}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: introTypst,
				content: [
					{
						type: 'text',
						content: `1) حوّل المسافة الحقيقية إلى السنتيمتر، ثم احسب مقياس هذا الرسم على الشكل $frac(1, a)$.`,
						answer: `1) $${D1}$ ${realUnitAr} = $${D1Cm}$ سم. المقياس: $frac(${d1}, ${D1Cm}) = frac(1, ${scaleE})$ (بقسمة البسط والمقام على $${d1}$).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: '2) باستعمال معامل التناسبية (أو المقياس)، أتمم الجدول الآتي:',
						answer: `2) نضرب المسافة على التصميم في $${scaleE}$ ثم نحول إلى (${realUnitAr}): $${d2} times ${scaleE} = ${d2 * scaleE}$ سم = $${D2}$ ${realUnitAr}؛ وبالعكس: $${D3 * factorToCm} div ${scaleE} = ${d3}$ سم.`,
						mark: '0.5'
					},
					{
						type: 'table',
						headerBackground: true,
						headers: ['المسافة على التصميم (سم)', `$${d1}$`, `$${d2}$`, { content: '......', answer: `$${d3}$`, mark: '0.5' }],
						cells: [],
						rows: [
							[
								`المسافة الحقيقية (${realUnitAr})`,
								`$${D1}$`,
								{ content: '......', answer: `$${D2}$`, mark: '0.5' },
								`$${D3}$`
							]
						]
					}
				]
			},
			hints: [
				'المقياس هو المسافة على التصميم مقسومة على المسافة الحقيقية بنفس الوحدة (سم).',
				`حوّل ${D1} ${realUnitEn} إلى cm بالضرب في ${factorToCm}.`,
				`اختزل الكسر بقسمة البسط والمقام على ${d1} لتكتب المقياس على الشكل 1 على عدد طبيعي.`
			],
			solutionStepsAr: [
				`تحويل المسافة الحقيقية: ${D1} × ${factorToCm} = ${D1Cm} cm.`,
				`حساب المقياس بالاختزال على ${d1}: ${d1} / ${D1Cm} = 1 / ${scaleE}.`,
				`حساب المسافة الحقيقية الموافقة لـ ${d2} cm: (${d2} × ${scaleE}) ÷ ${factorToCm} = ${D2} ${realUnitEn}.`,
				`حساب المسافة على التصميم الموافقة لـ ${D3} ${realUnitEn}: (${D3} × ${factorToCm}) ÷ ${scaleE} = ${d3} cm.`
			],
			finalAnswer: `1/${scaleE}`
		};
	}
};

// ============================================================================
// 4. Organizing Data in Tables & Bar Chart Reading (1AM: counts, two-way tables, %)
// ============================================================================

const organizingDataChartsTemplate: ParameterizedTemplate = {
	id: '1am_t3_organizing_data_charts',
	grade: '1am',
	trimesterId: 't3',
	domain: 'proportionality',
	titleAr: 'تنظيم المعطيات في جداول ومخططات بالأعمدة',
	curriculumLessonId: 'lesson_1am_t3_organizing_data_tables_charts',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 4, difficulty);

		const themes = [
			{
				intro: 'يمثل المخطط بالأعمدة توزيع تلاميذ قسم حسب الرياضة المفضلة لديهم.',
				headerCol: 'الرياضة',
				labels: ['كرة القدم', 'السباحة', 'الجودو', 'العدو']
			},
			{
				intro: 'يمثل المخطط بالأعمدة الهواية المفضلة لدى تلاميذ السنة الأولى متوسط.',
				headerCol: 'الهواية',
				labels: ['المطالعة', 'الرسم', 'الشطرنج', 'المسرح']
			},
			{
				intro: 'يمثل المخطط بالأعمدة وسيلة النقل التي يستعملها التلاميذ للوصول إلى المتوسطة.',
				headerCol: 'وسيلة النقل',
				labels: ['مشياً', 'الحافلة', 'السيارة', 'الدراجة']
			}
		];
		const th = rng.pick(themes);

		if (difficulty === 'easy') {
			const counts = rng.pickDistinct([5, 7, 8, 9, 11, 12, 14, 15, 17, 19], 4);
			const total = counts[0] + counts[1] + counts[2] + counts[3];
			const maxCount = Math.max(...counts);
			const minCount = Math.min(...counts);
			const maxLabel = th.labels[counts.indexOf(maxCount)];
			const diffMaxMin = maxCount - minCount;

			const bars = th.labels.map((label, idx) => ({ label, value: counts[idx] }));
			const svgPath = saveSvgAsset(`1am_t3_bar_easy_s${seed}`, svgBarChart(bars, maxCount + 3));

			const blankIdx1 = rng.int(0, 1);
			const blankIdx2 = rng.int(2, 3);

			const qText = `${th.intro} احسب العدد الإجمالي للتلاميذ في هذا القسم.`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'مخطط بالأعمدة لعدد التلاميذ في كل فئة',
					questionData: {
						answer: total,
						displayTemplate: 'العدد الإجمالي = ?',
						variables: [],
						tolerance: 0
					},
					explanation: `نجمع القيم الموافقة للأعمدة الأربعة: $${counts.join(' + ')} = ${total}$ تلميذاً.`
				},
				sujetExercise: {
					points: 3,
					instruction: th.intro,
					content: [
						{ type: 'image', src: svgPath, caption: 'مخطط بالأعمدة' },
						{
							type: 'text',
							content: '1) انطلاقاً من المخطط، انقل ثم أتمم الجدول الآتي:',
							answer: `1) نملأ الجدول بقراءة قيم الأعمدة: ${counts.map((c, i) => `${th.labels[i]} (${c})`).join('، ')}، والمجموع $= ${total}$.`,
							mark: '1.5'
						},
						{
							type: 'table',
							headerBackground: true,
							headers: [th.headerCol, ...th.labels, 'المجموع'],
							cells: [],
							rows: [
								[
									'عدد التلاميذ',
									...counts.map((c, i) =>
										i === blankIdx1 || i === blankIdx2 ? { content: '......', answer: `$${c}$`, mark: '0.5' } : `$${c}$`
									),
									{ content: '......', answer: `$${total}$`, mark: '0.5' }
								]
							]
						},
						{
							type: 'text',
							content: `2) ما هي الفئة الأكثر تفضيلاً؟ وما هو الفرق بين أكبر عدد وأصغر عدد؟`,
							answer: `2) الفئة الأكثر تفضيلاً هي ${maxLabel} (${maxCount} تلميذاً)، والفرق هو: $${maxCount} - ${minCount} = ${diffMaxMin}$ تلميذاً.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					'اقرأ العدد المكتوب فوق كل عمود في المخطط لتتعرف على عدد التلاميذ في كل فئة.',
					'لحساب العدد الإجمالي، اجمع أعداد الفئات الأربع.',
					`الفئة الأكثر تفضيلاً هي ذات العمود الأطول (${maxCount})، والفرق يساوي أكبر قيمة ناقص أصغر قيمة.`
				],
				solutionStepsAr: [
					`قراءة القيم من المخطط: ${counts.join(' ، ')}.`,
					`حساب العدد الإجمالي: ${counts.join(' + ')} = ${total}.`,
					`الفئة الأكثر تفضيلاً: ${maxLabel} بعدد ${maxCount}، والفرق = ${maxCount} - ${minCount} = ${diffMaxMin}.`
				],
				finalAnswer: `${total}`
			};
		}

		if (difficulty === 'medium') {
			// Two-way table (جدول ذو مدخلين: ذكور / إناث) paired with bar chart of category totals
			const totals = rng.pickDistinct([10, 12, 14, 15, 16, 18, 20, 22], 4);
			const boys = totals.map((t) => rng.int(3, t - 3));
			const girls = totals.map((t, i) => t - boys[i]);

			const totalBoys = boys.reduce((s, v) => s + v, 0);
			const totalGirls = girls.reduce((s, v) => s + v, 0);
			const grandTotal = totalBoys + totalGirls;

			const bars = th.labels.map((label, idx) => ({ label, value: totals[idx] }));
			const svgPath = saveSvgAsset(`1am_t3_bar_med_s${seed}`, svgBarChart(bars, Math.max(...totals) + 3));

			const idxGirlsMissing = rng.int(0, 1);
			const idxBoysMissing = rng.int(2, 3);

			const qText = `يمثل المخطط بالأعمدة العدد الإجمالي للتلاميذ في كل فئة. إذا كان عدد الذكور في فئة (${th.labels[idxGirlsMissing]}) هو $${boys[idxGirlsMissing]}$، فكم عدد الإناث في هذه الفئة؟`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'العدد الإجمالي للتلاميذ حسب الفئة',
					questionData: {
						answer: girls[idxGirlsMissing],
						displayTemplate: 'عدد الإناث = ?',
						variables: [],
						tolerance: 0
					},
					explanation: `من المخطط، مجموع فئة (${th.labels[idxGirlsMissing]}) هو $${totals[idxGirlsMissing]}$، ومنه عدد الإناث $= ${totals[idxGirlsMissing]} - ${boys[idxGirlsMissing]} = ${girls[idxGirlsMissing]}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `${th.intro} يوضّح المخطط العدد الإجمالي للتلاميذ في كل فئة، بينما يوزعهم الجدول ذو المدخلين حسب الجنس:`,
					content: [
						{ type: 'image', src: svgPath, caption: 'العدد الإجمالي لكل فئة' },
						{
							type: 'text',
							content: '1) استعن بالمخطط بالأعمدة لإتمام الجدول ذي المدخلين الآتي:',
							answer: `1) في فئة ${th.labels[idxGirlsMissing]}: الإناث $= ${totals[idxGirlsMissing]} - ${boys[idxGirlsMissing]} = ${girls[idxGirlsMissing]}$؛ في فئة ${th.labels[idxBoysMissing]}: الذكور $= ${totals[idxBoysMissing]} - ${girls[idxBoysMissing]} = ${boys[idxBoysMissing]}$؛ ومجموع الإناث $= ${totalGirls}$.`,
							mark: '2'
						},
						{
							type: 'table',
							headerBackground: true,
							headers: [th.headerCol, ...th.labels, 'المجموع'],
							cells: [],
							rows: [
								[
									'ذكور',
									...boys.map((b, i) =>
										i === idxBoysMissing ? { content: '......', answer: `$${b}$`, mark: '0.5' } : `$${b}$`
									),
									`$${totalBoys}$`
								],
								[
									'إناث',
									...girls.map((g, i) =>
										i === idxGirlsMissing ? { content: '......', answer: `$${g}$`, mark: '0.5' } : `$${g}$`
									),
									{ content: '......', answer: `$${totalGirls}$`, mark: '0.5' }
								],
								[
									'المجموع',
									...totals.map((t) => `$${t}$`),
									{ content: '......', answer: `$${grandTotal}$`, mark: '0.5' }
								]
							]
						},
						{
							type: 'text',
							content: `2) ما هو الفرق بين العدد الكلي للذكور والعدد الكلي للإناث؟`,
							answer: `2) الفرق هو: $|${totalBoys} - ${totalGirls}|$ أي $${Math.max(totalBoys, totalGirls)} - ${Math.min(totalBoys, totalGirls)} = ${Math.abs(totalBoys - totalGirls)}$ تلميذاً.`,
							mark: '1'
						}
					]
				},
				hints: [
					'مجموع كل عمود في الجدول (ذكور + إناث) يساوي ارتفاع العمود الموافق له في المخطط.',
					`لحساب عدد الإناث في فئة (${th.labels[idxGirlsMissing]})، اطرح عدد الذكور (${boys[idxGirlsMissing]}) من المجموع (${totals[idxGirlsMissing]}).`,
					'المجموع العام للتلاميذ هو مجموع السطر الأخير (أو مجموع الذكور + مجموع الإناث).'
				],
				solutionStepsAr: [
					`قراءة مجموع فئة (${th.labels[idxGirlsMissing]}) من المخطط: ${totals[idxGirlsMissing]}، إذن الإناث = ${totals[idxGirlsMissing]} - ${boys[idxGirlsMissing]} = ${girls[idxGirlsMissing]}.`,
					`عدد الذكور في فئة (${th.labels[idxBoysMissing]}) = ${totals[idxBoysMissing]} - ${girls[idxBoysMissing]} = ${boys[idxBoysMissing]}.`,
					`مجموع الإناث الكلي = ${girls.join(' + ')} = ${totalGirls}، والمجموع العام = ${grandTotal}.`,
					`الفرق بين الذكور والإناث = ${Math.max(totalBoys, totalGirls)} - ${Math.min(totalBoys, totalGirls)} = ${Math.abs(totalBoys - totalGirls)}.`
				],
				finalAnswer: `${girls[idxGirlsMissing]}`
			};
		}

		// Hard: Total N in {20, 25, 50, 100} so EVERY percentage is an exact integer (1AM T3: percentages, NO relative frequency!)
		const N = rng.pick([20, 25, 50, 100]);
		const minPart = Math.max(2, Math.floor(N * 0.1));
		const p0 = rng.int(minPart, Math.floor(N * 0.34));
		let p1 = rng.int(minPart, Math.floor((N - p0) * 0.44));
		if (p1 === p0) p1 = Math.max(minPart, p0 - 1);
		let p2 = rng.int(minPart, Math.floor((N - p0 - p1) * 0.58));
		if (p2 === p0 || p2 === p1) p2 = Math.max(minPart, p2 + 1);
		const p3 = N - p0 - p1 - p2;
		const counts = [p0, p1, p2, p3];
		const pcts = counts.map((c) => Math.round((c * 100) / N));

		const bars = th.labels.map((label, idx) => ({ label, value: counts[idx] }));
		const svgPath = saveSvgAsset(`1am_t3_bar_hard_s${seed}`, svgBarChart(bars, Math.max(...counts) + Math.ceil(N * 0.08)));

		const targetIdx = rng.int(0, 3);
		const targetCount = counts[targetIdx];
		const targetPct = pcts[targetIdx];
		const complementPct = 100 - targetPct;
		const sumTopTwo = counts[0] + counts[1];
		const pctTopTwo = pcts[0] + pcts[1];

		const mcq = buildUniqueMcqOptions(
			`$${targetPct}\\%$`,
			[
				{
					text: `$${complementPct}\\%$`,
					diagnosticFeedback: 'هذه النسبة تمثل بقية الفئات الأخرى وليست النسبة المئوية للفئة المطلوبة.'
				},
				{
					text: `$${targetCount}\\%$`,
					diagnosticFeedback: `العدد ${targetCount} هو عدد التلاميذ وليس النسبة المئوية؛ اقسم على العدد الكلي (${N}) ثم اضرب في 100.`
				},
				{
					text: `$${Math.round((targetCount * 10) / N)}\\%$`,
					diagnosticFeedback: 'انتبه: لحساب النسبة المئوية نضرب حاصل القسمة في 100 وليس في 10.'
				}
			],
			rng
		);

		const qText = `${th.intro} ما هي النسبة المئوية للتلاميذ الذين اختاروا (${th.labels[targetIdx]})؟`;

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مخطط بالأعمدة لتوزيع التلاميذ',
				questionData: mcq,
				explanation: `العدد الكلي للتلاميذ هو $${counts.join(' + ')} = ${N}$، وعدد فئة (${th.labels[targetIdx]}) هو $${targetCount}$، ومنه النسبة المئوية $= \\frac{${targetCount}}{${N}} \\times 100 = ${targetPct}\\%$.`
			},
			sujetExercise: {
				points: 3,
				instruction: th.intro,
				content: [
					{ type: 'image', src: svgPath, caption: 'مخطط بالأعمدة' },
					{
						type: 'text',
						content: '1) احسب العدد الكلي للتلاميذ، ثم أتمم الجدول الآتي بحساب النسبة المئوية لكل فئة:',
						answer: `1) العدد الكلي $= ${counts.join(' + ')} = ${N}$ تلميذاً. نحسب كل نسبة مئوية باستعمال القاعدة $frac("الجزء", "الكل") times 100$.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headerBackground: true,
						headers: [th.headerCol, ...th.labels, 'المجموع'],
						cells: [],
						rows: [
							[
								'عدد التلاميذ',
								...counts.map((c, i) =>
									i === targetIdx ? { content: '......', answer: `$${c}$`, mark: '0.5' } : `$${c}$`
								),
								`$${N}$`
							],
							[
								'النسبة المئوية',
								...pcts.map((p, i) =>
									i === targetIdx
										? { content: '......', answer: `$${p}%$`, mark: '0.5' }
										: { content: '......', answer: `$${p}%$` }
								),
								'$100%$'
							]
						]
					},
					{
						type: 'text',
						content: `2) ما هي النسبة المئوية للتلاميذ الذين اختاروا (${th.labels[0]}) أو (${th.labels[1]}) معاً؟`,
						answer: `2) العدد هو $${counts[0]} + ${counts[1]} = ${sumTopTwo}$، ونسبتهم المئوية هي $${pcts[0]}% + ${pcts[1]}% = ${pctTopTwo}%$.`,
						mark: '0.5'
					}
				]
			},
			hints: [
				'اجمع أولاً أعداد الأعمدة الأربعة لتجد العدد الكلي للتلاميذ.',
				`لحساب النسبة المئوية لفئة (${th.labels[targetIdx]})، احسب: (${targetCount} ÷ ${N}) × 100.`,
				'مجموع النسب المئوية لجميع الفئات يساوي 100%.'
			],
			solutionStepsAr: [
				`حساب العدد الكلي: ${counts.join(' + ')} = ${N}.`,
				`النسبة المئوية لفئة (${th.labels[targetIdx]}): (${targetCount} ÷ ${N}) × 100 = ${targetPct}%.`,
				`النسب المئوية للفئات الأربع: ${pcts.map((p) => `${p}%`).join(' ، ')} (مجموعها 100%).`,
				`نسبة الفئتين الأولى والثانية معاً: ${pcts[0]}% + ${pcts[1]}% = ${pctTopTwo}%.`
			],
			finalAnswer: `${targetPct}%`
		};
	}
};

// ============================================================================
// 5. Cuboid & Cube: Isometric View, Net (تصميم) & Volume / Capacity (Custom SVGs)
// ============================================================================

const cuboidCubeNetVolumeTemplate: ParameterizedTemplate = {
	id: '1am_t3_cuboid_cube_net_volume',
	grade: '1am',
	trimesterId: 't3',
	domain: 'measurement',
	titleAr: 'متوازي المستطيلات والمكعب: التصميم والحجم والسعة',
	curriculumLessonId: 'lesson_1am_t3_cuboid_cube_net_volume',
	defaultPoints: 3,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 5, difficulty);

		if (difficulty === 'easy') {
			// Cube (المكعب) — avoid a = 6 so 6*a^2 != a^3
			const a = rng.pick([3, 4, 5, 7, 8, 9]);
			const faceArea = a * a;
			const totalArea = 6 * faceArea;
			const edgeSum = 12 * a;
			const vol = a * a * a;

			const isoUrl = saveSvgAsset(
				`1am_t3_cube_iso_easy_s${seed}`,
				svgCuboidIsometric({
					L: a,
					l: a,
					h: a,
					LLabel: `a = ${a} cm`,
					lLabel: '',
					hLabel: '',
					isCube: true
				})
			);

			const netUrl = saveSvgAsset(
				`1am_t3_cube_net_easy_s${seed}`,
				svgCuboidNet({
					aLabel: `a = ${a} cm`,
					isCube: true
				})
			);

			const mcq = buildUniqueMcqOptions(
				`$${vol}\\text{ cm}^3$`,
				[
					{
						text: `$${totalArea}\\text{ cm}^3$`,
						diagnosticFeedback: 'هذه هي المساحة الكلية للأوجه الستة (6 × a × a)، بينما حجم المكعب يساوي a × a × a.'
					},
					{
						text: `$${edgeSum}\\text{ cm}^3$`,
						diagnosticFeedback: 'هذا هو مجموع أطوال الأحرف الاثني عشر (12 × a) وليس الحجم.'
					},
					{
						text: `$${faceArea}\\text{ cm}^3$`,
						diagnosticFeedback: 'حسبت مساحة وجه واحد فقط (a × a) ونسيت الضرب في الارتفاع a.'
					}
				],
				rng
			);

			const qText = `يمثل الشكل المقابل تصميماً لمكعب طول حرفه $a = ${a}\\text{ cm}$. ما هو حجم هذا المكعب؟`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: netUrl,
					imageCaption: 'تصميم مكعب طول حرفه a',
					questionData: mcq,
					explanation: `حجم المكعب يساوي طول الحرف × نفسه × نفسه: $V = ${a} \\times ${a} \\times ${a} = ${vol}\\text{ cm}^3$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `تأمّل تصميم المكعب وتمثيله بالمنظور متساوي القياس حيث طول حرفه $a = ${a}$ سم:`,
					content: [
						{
							type: 'columns',
							widths: ['1fr', '1fr'],
							children: [
								{ type: 'image', src: netUrl, caption: 'تصميم المكعب' },
								{ type: 'image', src: isoUrl, caption: 'المنظور متساوي القياس' }
							]
						},
						{
							type: 'text',
							content: '1) أتمم ما يلي: للمكعب ...... أوجه متقايسة كل منها على شكل ......، وله ...... حرفاً و ...... رؤوس.',
							answer: '1) للمكعب $6$ أوجه متقايسة كل منها على شكل مربع، وله $12$ حرفاً و $8$ رؤوس.',
							mark: '1'
						},
						{
							type: 'text',
							content: `2) احسب مجموع أطوال أحرف هذا المكعب، ثم احسب مساحة أحد أوجهه.`,
							answer: `2) مجموع أطوال الأحرف: $12 times ${a} = ${edgeSum}$ سم. مساحة الوجه الواحد: $${a} times ${a} = ${faceArea}$ سم².`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) احسب حجم هذا المكعب بوحدة السنتيمتر المكعب (سم³).`,
							answer: `3) $V = ${a} times ${a} times ${a} = ${vol}$ سم³.`,
							mark: '1'
						}
					]
				},
				hints: [
					'للمكعب 6 أوجه مربعة الشكل متقايسة، و 12 حرفاً متقايسة، و 8 رؤوس.',
					'لحساب حجم المكعب نضرب طول الحرف في نفسه ثلاث مرات: V = a × a × a.',
					`احسب ${a} × ${a} = ${faceArea} أولاً، ثم اضرب الناتج في ${a}.`
				],
				solutionStepsAr: [
					'خصائص المكعب: 6 أوجه مربعة، 12 حرفاً، 8 رؤوس.',
					`مجموع أطوال الأحرف = 12 × ${a} = ${edgeSum} cm، ومساحة الوجه الواحد = ${a} × ${a} = ${faceArea} cm².`,
					`حجم المكعب: V = ${a} × ${a} × ${a} = ${vol} cm³.`
				],
				finalAnswer: `${vol} cm³`
			};
		}

		if (difficulty === 'medium') {
			// Cuboid with cm multiples of 10 -> clean conversion to dm³ = L
			const Ldm = rng.pick([4, 5, 6, 7, 8]);
			const ldm = rng.pick([2, 3, 4].filter((v) => v < Ldm));
			const hdm = rng.pick([2, 3, 4, 5]);

			const Lcm = Ldm * 10;
			const lcm = ldm * 10;
			const hcm = hdm * 10;

			const Vcm3 = Lcm * lcm * hcm;
			const Vdm3 = Ldm * ldm * hdm;

			const isoUrl = saveSvgAsset(
				`1am_t3_cuboid_iso_med_s${seed}`,
				svgCuboidIsometric({
					L: Ldm,
					l: ldm,
					h: hdm,
					LLabel: `L = ${Lcm} cm`,
					lLabel: `l = ${lcm} cm`,
					hLabel: `h = ${hcm} cm`
				})
			);

			const netUrl = saveSvgAsset(
				`1am_t3_cuboid_net_med_s${seed}`,
				svgCuboidNet({
					aLabel: `L = ${Lcm} cm`,
					bLabel: `l = ${lcm} cm`,
					cLabel: `h = ${hcm} cm`
				})
			);

			const qText = `علبة على شكل متوازي مستطيلات أبعادها $L = ${Lcm}\\text{ cm}$ و $l = ${lcm}\\text{ cm}$ و $h = ${hcm}\\text{ cm}$. ما هي سعتها باللتر ($\\text{L}$)؟`;

			return {
				templateId: this.id,
				seed,
				grade: '1am',
				trimesterId: 't3',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: isoUrl,
					imageCaption: 'متوازي المستطيلات بالمنظور متساوي القياس',
					questionData: {
						answer: Vdm3,
						displayTemplate: 'السعة = ? L',
						variables: [],
						tolerance: 0
					},
					explanation: `نحسب الحجم بالسنتيمتر المكعب: $V = ${Lcm} \\times ${lcm} \\times ${hcm} = ${Vcm3}\\text{ cm}^3$، ثم نقسم على $1000$ للتحويل إلى الديسمتر المكعب واللتر: $V = ${Vdm3}\\text{ dm}^3 = ${Vdm3}\\text{ L}$.`
				},
				sujetExercise: {
					points: 3,
					instruction: `علبة زجاجية على شكل متوازي مستطيلات أبعادها $L = ${Lcm}$ سم، $l = ${lcm}$ سم، $h = ${hcm}$ سم:`,
					content: [
						{
							type: 'columns',
							widths: ['1fr', '1fr'],
							children: [
								{ type: 'image', src: isoUrl, caption: 'المجسم' },
								{ type: 'image', src: netUrl, caption: 'التصميم' }
							]
						},
						{
							type: 'text',
							content: '1) اذكر أبعاد المستطيلات الثلاثة المختلفة المكونة لتصميم متوازي المستطيلات هذا.',
							answer: `1) يتكون التصميم من وجهين أبعادهما ($${Lcm}$ سم $times$ $${lcm}$ سم)، ووجهين ($${Lcm}$ سم $times$ $${hcm}$ سم)، ووجهين ($${lcm}$ سم $times$ $${hcm}$ سم).`,
							mark: '1'
						},
						{
							type: 'text',
							content: '2) احسب حجم هذه العلبة بوحدة السنتيمتر المكعب (سم³)، ثم حوّله إلى الديسمتر المكعب (دسم³) واستنتج سعتها باللتر.',
							answer: `2) $V = ${Lcm} times ${lcm} times ${hcm} = ${Vcm3}$ سم³. وبما أن $1$ دسم³ = $1000$ سم³ = $1$ لتر، فإن السعة $= ${Vdm3}$ دسم³ = $${Vdm3}$ لتر.`,
							mark: '2'
						}
					]
				},
				hints: [
					'حجم متوازي المستطيلات يساوي الطول × العرض × الارتفاع: V = L × l × h.',
					'تذكّر العلاقة بين وحدات الحجم والسعة: 1 dm³ = 1 L و 1 L = 1000 cm³.',
					`يمكنك تحويل الأبعاد أولاً إلى الديسمتر (${Ldm} dm و ${ldm} dm و ${hdm} dm) ثم حساب الجداء.`
				],
				solutionStepsAr: [
					`تحويل الأبعاد إلى الديسمتر: ${Lcm} cm = ${Ldm} dm، ${lcm} cm = ${ldm} dm، ${hcm} cm = ${hdm} dm.`,
					`حساب الحجم: V = ${Lcm} × ${lcm} × ${hcm} = ${Vcm3} cm³ = ${Vdm3} dm³.`,
					`السعة باللتر (1 dm³ = 1 L): السعة = ${Vdm3} L.`
				],
				finalAnswer: `${Vdm3} L`
			};
		}

		// Hard: mixed units (L in dm, l in cm) + given capacity in L -> find missing height h in cm, plus net total area!
		const Ldm = rng.pick([4, 5, 6, 8]);
		const ldm = rng.pick([2, 3, 4]);
		const hdm = rng.pick([2, 3, 4, 5]);
		const lcm = ldm * 10;
		const hcm = hdm * 10;
		const baseAreaDm2 = Ldm * ldm;
		const capacityL = baseAreaDm2 * hdm;
		const totalAreaDm2 = 2 * (Ldm * ldm + Ldm * hdm + ldm * hdm);

		const isoUrl = saveSvgAsset(
			`1am_t3_cuboid_iso_hard_s${seed}`,
			svgCuboidIsometric({
				L: Ldm,
				l: ldm,
				h: hdm,
				LLabel: `L = ${Ldm} dm`,
				lLabel: `l = ${lcm} cm`,
				hLabel: 'h = ?'
			})
		);

		const netUrl = saveSvgAsset(
			`1am_t3_cuboid_net_hard_s${seed}`,
			svgCuboidNet({
				aLabel: `L = ${Ldm} dm`,
				bLabel: `l = ${ldm} dm`,
				cLabel: `h = ?`
			})
		);

		const wrongSum = roundTo(capacityL / (Ldm + ldm), 1);

		const mcq = buildUniqueMcqOptions(
			`$${hcm}\\text{ cm}$`,
			[
				{
					text: `$${hdm}\\text{ cm}$`,
					diagnosticFeedback: `العدد ${hdm} هو الارتفاع بوحدة الديسمتر (dm)، لا تنسَ التحويل إلى السنتيمتر (× 10).`
				},
				{
					text: `$${hdm * 100}\\text{ cm}$`,
					diagnosticFeedback: 'تحقق من التحويل: 1 dm = 10 cm (وليس 100 cm).'
				},
				{
					text: `$${fmtNum(wrongSum)}\\text{ cm}$`,
					diagnosticFeedback: 'مساحة القاعدة هي L × l (بالضرب) وليس (L + l) (بالجمع).'
				}
			],
			rng
		);

		const qText = `صندوق على شكل متوازي مستطيلات طوله $L = ${Ldm}\\text{ dm}$ وعرضه $l = ${lcm}\\text{ cm}$ وسعته الكلية $${capacityL}\\text{ L}$. ما هو ارتفاعه $h$ بوحدة السنتيمتر ($\\text{cm}$)؟`;

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: isoUrl,
				imageCaption: 'متوازي مستطيلات بوحدات مختلفة',
				questionData: mcq,
				explanation: `نحوّل العرض: $l = ${lcm}\\text{ cm} = ${ldm}\\text{ dm}$. السعة $${capacityL}\\text{ L} = ${capacityL}\\text{ dm}^3$. مساحة القاعدة $= ${Ldm} \\times ${ldm} = ${baseAreaDm2}\\text{ dm}^2$، ومنه $h = ${capacityL} \\div ${baseAreaDm2} = ${hdm}\\text{ dm} = ${hcm}\\text{ cm}$.`
			},
			sujetExercise: {
				points: 3,
				instruction: `صندوق كرتوني على شكل متوازي مستطيلات طوله $L = ${Ldm}$ دسم، وعرضه $l = ${lcm}$ سم، وسعته الكلية $${capacityL}$ لتراً:`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{ type: 'image', src: isoUrl, caption: 'المجسم' },
							{ type: 'image', src: netUrl, caption: 'التصميم' }
						]
					},
					{
						type: 'text',
						content: '1) حوّل العرض إلى الديسمتر ثم احسب مساحة قاعدة الصندوق بوحدة دسم².',
						answer: `1) $l = ${lcm}$ سم = $${ldm}$ دسم. مساحة القاعدة: $S = ${Ldm} times ${ldm} = ${baseAreaDm2}$ دسم².`,
						mark: '1'
					},
					{
						type: 'text',
						content: '2) أوجد ارتفاع الصندوق $h$ بالدسم ثم بالسم اعتماداً على العلاقة $S times h = V$.',
						answer: `2) $V = ${capacityL}$ لتر = $${capacityL}$ دسم³، ومنه $${baseAreaDm2} times h = ${capacityL}$ أي $h = ${capacityL} div ${baseAreaDm2} = ${hdm}$ دسم = $${hcm}$ سم.`,
						mark: '1'
					},
					{
						type: 'text',
						content: '3) انطلاقاً من تصميم الصندوق، احسب المساحة الكلية للورق المقوّى المستعمل لصنع الصندوق (بـ دسم²).',
						answer: `3) $A = 2 times (${Ldm} times ${ldm} + ${Ldm} times ${hdm} + ${ldm} times ${hdm}) = 2 times (${Ldm * ldm} + ${Ldm * hdm} + ${ldm * hdm}) = ${totalAreaDm2}$ دسم².`,
						mark: '1'
					}
				]
			},
			hints: [
				'وحّد القياسات أولاً بتحويل العرض إلى الديسمتر (1 dm = 10 cm) واللتر إلى dm³ (1 L = 1 dm³).',
				`بما أن الحجم V = مساحة القاعدة × الارتفاع، فإن الارتفاع h = ${capacityL} ÷ (${Ldm} × ${ldm}).`,
				'لا تنسَ تحويل الارتفاع المحسوب بوحدة الديسمتر إلى السنتيمتر في الإجابة.'
			],
			solutionStepsAr: [
				`توحيد الوحدات: l = ${lcm} cm = ${ldm} dm، والحجم V = ${capacityL} L = ${capacityL} dm³.`,
				`مساحة القاعدة: S = ${Ldm} × ${ldm} = ${baseAreaDm2} dm².`,
				`الارتفاع: h = ${capacityL} ÷ ${baseAreaDm2} = ${hdm} dm = ${hcm} cm.`,
				`المساحة الكلية للتصميم: A = 2 × (${Ldm * ldm} + ${Ldm * hdm} + ${ldm * hdm}) = ${totalAreaDm2} dm².`
			],
			finalAnswer: `${hcm} cm`
		};
	}
};

// ============================================================================
// 6. T3 Integration Situation (الوضعية الإدماجية — 8 pts)
//    Aquarium / Pool cuboid volume & capacity + proportionality + % discount/increase on supplies
// ============================================================================

const integrationAquariumSuppliesTemplate: ParameterizedTemplate = {
	id: '1am_t3_integration',
	grade: '1am',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: الحوض المائي والتناسبية والنسبة المئوية',
	curriculumLessonId: 'lesson_1am_t3_integration',
	defaultPoints: 8,
	isIntegration: true,

	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 6, difficulty);

		// Dimensions & units depend on difficulty; guaranteed exact integers everywhere
		let LDispTypst: string;
		let lDispTypst: string;
		let hDispTypst: string;
		let LDispKaTeX: string;
		let lDispKaTeX: string;
		let hDispKaTeX: string;
		let LSvgLabel: string;
		let lSvgLabel: string;
		let hSvgLabel: string;

		let LVal: number;
		let lVal: number;
		let hVal: number;
		let capacityL: number;
		let volStepTypst: string;
		let volStepKaTeX: string;
		let volStepAr: string;
		let isPool = false;

		if (difficulty === 'easy') {
			// Aquarium in dm (V_dm3 divisible by 10: l = 5 dm and L even)
			LVal = rng.pick([6, 8, 10]);
			lVal = 5;
			hVal = rng.pick([4, 6]);
			capacityL = LVal * lVal * hVal; // Multiple of 10 or 20
			LDispTypst = `$${LVal}$ دسم`;
			lDispTypst = `$${lVal}$ دسم`;
			hDispTypst = `$${hVal}$ دسم`;
			LDispKaTeX = `$${LVal}\\text{ dm}$`;
			lDispKaTeX = `$${lVal}\\text{ dm}$`;
			hDispKaTeX = `$${hVal}\\text{ dm}$`;
			LSvgLabel = `L = ${LVal} dm`;
			lSvgLabel = `l = ${lVal} dm`;
			hSvgLabel = `h = ${hVal} dm`;
			volStepTypst = `$V = ${LVal} times ${lVal} times ${hVal} = ${capacityL}$ دسم³، وبما أن $1$ دسم³ = $1$ لتر فإن السعة $= ${capacityL}$ لتراً.`;
			volStepKaTeX = `V = ${LVal} \\times ${lVal} \\times ${hVal} = ${capacityL}\\text{ dm}^3 = ${capacityL}\\text{ L}`;
			volStepAr = `حساب حجم الحوض: V = ${LVal} × ${lVal} × ${hVal} = ${capacityL} dm³ = ${capacityL} L.`;
		} else if (difficulty === 'medium') {
			// Aquarium in cm (V_dm3 divisible by 20 so 75% and 80% are exact integers)
			const Ldm = rng.pick([8, 10]);
			const ldm = 5;
			const hdm = rng.pick([4, 6]);
			LVal = Ldm * 10;
			lVal = ldm * 10;
			hVal = hdm * 10;
			const Vcm3 = LVal * lVal * hVal;
			capacityL = Ldm * ldm * hdm;
			LDispTypst = `$${LVal}$ سم`;
			lDispTypst = `$${lVal}$ سم`;
			hDispTypst = `$${hVal}$ سم`;
			LDispKaTeX = `$${LVal}\\text{ cm}$`;
			lDispKaTeX = `$${lVal}\\text{ cm}$`;
			hDispKaTeX = `$${hVal}\\text{ cm}$`;
			LSvgLabel = `L = ${LVal} cm`;
			lSvgLabel = `l = ${lVal} cm`;
			hSvgLabel = `h = ${hVal} cm`;
			volStepTypst = `$V = ${LVal} times ${lVal} times ${hVal} = ${Vcm3}$ سم³، وبما أن $1$ لتر = $1000$ سم³ فإن السعة $= ${Vcm3} div 1000 = ${capacityL}$ لتراً.`;
			volStepKaTeX = `V = ${LVal} \\times ${lVal} \\times ${hVal} = ${Vcm3}\\text{ cm}^3 = ${capacityL}\\text{ L}`;
			volStepAr = `حساب حجم الحوض: V = ${LVal} × ${lVal} × ${hVal} = ${Vcm3} cm³، وبالتحويل إلى اللتر (÷ 1000) نجد السعة = ${capacityL} L.`;
		} else {
			// Hard: Pool (مسبح) with mixed units (L, l in m, h in cm) -> 1 m³ = 1000 L
			isPool = true;
			LVal = rng.pick([4, 5, 6]);
			lVal = rng.pick([2, 3]);
			const hCm = rng.pick([120, 150]);
			hVal = hCm / 100; // 1.2 or 1.5 m
			const Vm3 = roundTo(LVal * lVal * hVal, 2);
			capacityL = Math.round(Vm3 * 1000); // Always multiple of 100!
			LDispTypst = `$${LVal}$ م`;
			lDispTypst = `$${lVal}$ م`;
			hDispTypst = `$${hCm}$ سم`;
			LDispKaTeX = `$${LVal}\\text{ m}$`;
			lDispKaTeX = `$${lVal}\\text{ m}$`;
			hDispKaTeX = `$${hCm}\\text{ cm}$`;
			LSvgLabel = `L = ${LVal} m`;
			lSvgLabel = `l = ${lVal} m`;
			hSvgLabel = `h = ${hCm} cm`;
			volStepTypst = `نحوّل الارتفاع: $${hCm}$ سم = $${fmtNum(hVal)}$ م. الحجم: $V = ${LVal} times ${lVal} times ${fmtNum(hVal)} = ${fmtNum(Vm3)}$ م³. وبما أن $1$ م³ = $1000$ لتر فإن السعة $= ${fmtNum(Vm3)} times 1000 = ${capacityL}$ لتراً.`;
			volStepKaTeX = `h = ${fmtNum(hVal)}\\text{ m} \\Rightarrow V = ${LVal} \\times ${lVal} \\times ${fmtNum(hVal)} = ${fmtNum(Vm3)}\\text{ m}^3 = ${capacityL}\\text{ L}`;
			volStepAr = `تحويل الارتفاع إلى المتر (${fmtNum(hVal)} m)، ثم حساب الحجم V = ${LVal} × ${lVal} × ${fmtNum(hVal)} = ${fmtNum(Vm3)} m³، وسعته = ${capacityL} L.`;
		}

		const fillPct = difficulty === 'easy' ? rng.pick([60, 80]) : rng.pick([75, 80]);
		const waterL = Math.round((capacityL * fillPct) / 100);

		// Proportionality filling check (unitary method: q1 L in t1 min -> ratePerMin -> pumpedL in t2 min)
		const ratePerMin = isPool ? rng.pick([80, 100, 120, 150]) : rng.pick([4, 5, 6, 8]);
		const t1 = rng.pick([3, 4, 5]);
		const q1 = ratePerMin * t1;
		const t2 = isPool ? rng.pick([60, 90, 120]) : rng.pick([15, 20, 25]);
		const pumpedL = ratePerMin * t2;
		const isEnough = pumpedL >= waterL;

		// Supplies cost + % discount or % increase (multiple of 100 DA -> exact integer DA!)
		const isIncrease = difficulty === 'hard' || (difficulty === 'medium' && seed % 2 === 1);
		const item1Price = isPool ? rng.priceDA(4000, 9000, 500) : rng.priceDA(1200, 2600, 100);
		const item2Price = isPool ? rng.priceDA(2000, 5000, 500) : rng.priceDA(800, 1800, 100);
		const baseCost = item1Price + item2Price;
		const ratePct = rng.pick([10, 15, 20, 25]);
		const deltaAmount = Math.round((baseCost * ratePct) / 100);
		const finalCost = isIncrease ? baseCost + deltaAmount : baseCost - deltaAmount;
		const budget = finalCost + (seed % 3 === 0 ? -300 : 500);
		const canAfford = budget >= finalCost;

		const containerName = isPool ? 'مسبحاً عائلياً' : 'حوض أسماك زجاجياً';
		const containerShort = isPool ? 'المسبح' : 'الحوض';
		const containerFor = isPool ? 'للمسبح' : 'للحوض';
		const suppliesDesc = isPool
			? `مضخة تصفية بسعر $${item1Price}$ دج وغطاءً واقياً بسعر $${item2Price}$ دج، مع ${isIncrease ? `تكلفة إضافية للتوصيل والتركيب تمثل زيادة بنسبة $${ratePct}%$` : `تخفيض تجاري بنسبة $${ratePct}%$`}`
			: `مصفاة ماء بسعر $${item1Price}$ دج ومصابيح وحصى تزيين بسعر $${item2Price}$ دج، مع ${isIncrease ? `رسوم توصيل تمثل زيادة بنسبة $${ratePct}%$` : `تخفيض بنسبة $${ratePct}%$`}`;

		const svgPath = saveSvgAsset(
			`1am_t3_integ_${difficulty}_s${seed}`,
			svgCuboidIsometric({
				L: LVal,
				l: lVal,
				h: hVal,
				LLabel: LSvgLabel,
				lLabel: lSvgLabel,
				hLabel: hSvgLabel,
				fillRatio: fillPct / 100,
				fillLabel: `${fillPct}%`
			})
		);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.8fr', '1.2fr'],
				children: [
					{
						type: 'text',
						content: `اشترت عائلة ${containerName} على شكل متوازي مستطيلات أبعاده: الطول ${LDispTypst}، العرض ${lDispTypst}، والارتفاع ${hDispTypst}. تريد العائلة ملء ${containerShort} بالماء بنسبة $${fillPct}%$ من سعته الكلية.`
					},
					{ type: 'image', src: svgPath }
				]
			},
			{
				type: 'text',
				content: `1) احسب الحجم الكلي ${containerFor} ثم استنتج سعته الكلية باللتر.`,
				answer: `1) ${volStepTypst}`,
				mark: '2.5'
			},
			{
				type: 'text',
				content: `2) احسب كمية الماء اللازمة لملء ${containerShort} بنسبة $${fillPct}%$ من سعته. إذا استُعمل صنبور يضخ $${q1}$ لتراً كل $${t1}$ دقائق، فهل تكفي مدة $${t2}$ دقيقة لتوفير كمية الماء المطلوبة؟ برّر إجابتك.`,
				answer: `2) كمية الماء المطلوبة: $frac(${capacityL} times ${fillPct}, 100) = ${waterL}$ لتراً.\n\nبالرجوع إلى الوحدة، يضخ الصنبور في الدقيقة الواحدة: $${q1} div ${t1} = ${ratePerMin}$ لتراً. في $${t2}$ دقيقة يضخ: $${ratePerMin} times ${t2} = ${pumpedL}$ لتراً. ${isEnough ? `بما أن $${pumpedL} >= ${waterL}$ فإن المدة تكفي.` : `بما أن $${pumpedL} < ${waterL}$ فإن المدة لا تكفي.`}`,
				mark: '3'
			},
			{
				type: 'text',
				content: `3) لتجهيز ${containerShort}، اشترت العائلة ${suppliesDesc}. احسب المبلغ النهائي الواجب دفعه. وهل يكفي مبلغ $${budget}$ دج لتسديد هذه الفاتورة؟`,
				answer: `3) المبلغ قبل ${isIncrease ? 'الزيادة' : 'التخفيض'}: $${item1Price} + ${item2Price} = ${baseCost}$ دج.\n\nقيمة ${isIncrease ? 'الزيادة' : 'التخفيض'}: $frac(${baseCost} times ${ratePct}, 100) = ${deltaAmount}$ دج.\n\nالمبلغ النهائي: $${baseCost} ${isIncrease ? '+' : '-'} ${deltaAmount} = ${finalCost}$ دج. ${canAfford ? `بما أن $${budget} >= ${finalCost}$ فإن المبلغ يكفي.` : `بما أن $${budget} < ${finalCost}$ فإن المبلغ لا يكفي.`}`,
				mark: '2.5'
			}
		];

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const wrongSum = LVal + lVal + hVal;
			const wrongSurf = 2 * (LVal * lVal + LVal * hVal + lVal * hVal);
			const mcq = buildUniqueMcqOptions(
				`$${capacityL}\\text{ L}$`,
				[
					{
						text: `$${wrongSum}\\text{ L}$`,
						diagnosticFeedback: 'جمعت الأبعاد بدلاً من ضربها! حجم متوازي المستطيلات يساوي الطول × العرض × الارتفاع.'
					},
					{
						text: `$${wrongSurf}\\text{ L}$`,
						diagnosticFeedback: 'هذه قيمة المساحة الكلية وليست الحجم/السعة.'
					},
					{
						text: `$${capacityL * 10}\\text{ L}$`,
						diagnosticFeedback: 'تذكّر أن 1 dm³ يساوي 1 L تماماً (دون ضرب في 10).'
					}
				],
				rng
			);
			const qText = `حوض أسماك على شكل متوازي مستطيلات أبعاده ${LDispKaTeX} و ${lDispKaTeX} و ${hDispKaTeX}. ما هي سعته الكلية باللتر؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'حوض أسماك متوازي المستطيلات',
				questionData: mcq,
				explanation: `نحسب الحجم: $${volStepKaTeX}$.`
			};
			finalAnswer = `${capacityL} L`;
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$${waterL}\\text{ L}$`,
				[
					{
						text: `$${capacityL}\\text{ L}$`,
						diagnosticFeedback: `هذه هي السعة الكلية للحوض (100%)، بينما المطلوب هو ملء ${fillPct}% فقط من السعة.`
					},
					{
						text: `$${capacityL - waterL}\\text{ L}$`,
						diagnosticFeedback: 'هذه الكمية تمثل الجزء الفارغ المتبقي من الحوض وليس كمية الماء المملوءة.'
					},
					{
						text: `$${waterL * 100}\\text{ L}$`,
						diagnosticFeedback: 'انتبه عند التحويل من cm³ إلى L: نقسم على 1000 (لأن 1 L = 1000 cm³).'
					}
				],
				rng
			);
			const qText = `حوض أسماك على شكل متوازي مستطيلات أبعاده ${LDispKaTeX} و ${lDispKaTeX} و ${hDispKaTeX}. كم لتراً من الماء يلزم لملئه بنسبة $${fillPct}\\%$ من سعته؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `ملء الحوض بنسبة ${fillPct}%`,
				questionData: mcq,
				explanation: `$${volStepKaTeX}$، ومنه كمية الماء المطلوبة $= ${capacityL} \\times \\frac{${fillPct}}{100} = ${waterL}\\text{ L}$.`
			};
			finalAnswer = `${waterL} L`;
		} else {
			const mcq = buildUniqueMcqOptions(
				`$${finalCost}\\text{ DA}$`,
				[
					{
						text: `$${baseCost}\\text{ DA}$`,
						diagnosticFeedback: `هذا هو المبلغ الأصلي للمشتريات قبل حساب ${isIncrease ? 'الزيادة' : 'التخفيض'} (${ratePct}%).`
					},
					{
						text: `$${deltaAmount}\\text{ DA}$`,
						diagnosticFeedback: `هذا هو مبلغ ${isIncrease ? 'الزيادة' : 'التخفيض'} فقط، وليس المبلغ النهائي الواجب دفعه.`
					},
					{
						text: `$${isIncrease ? baseCost - deltaAmount : baseCost + deltaAmount}\\text{ DA}$`,
						diagnosticFeedback: isIncrease
							? 'الزيادة تُضاف إلى المبلغ الأصلي ولا تُطرح منه.'
							: 'التخفيض يُطرح من المبلغ الأصلي ولا يُضاف إليه.'
					}
				],
				rng
			);
			const qText = `لتجهيز مسبح، اشترت عائلة مستلزمات بمبلغ إجمالي قدره $${baseCost}\\text{ DA}$ قبل تطبيق ${isIncrease ? 'زيادة للتوصيل' : 'تخفيض'} بنسبة $${ratePct}\\%$. ما هو المبلغ النهائي الواجب دفعه؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'مسبح عائلي متوازي المستطيلات',
				questionData: mcq,
				explanation: `قيمة ${isIncrease ? 'الزيادة' : 'التخفيض'} $= ${baseCost} \\times \\frac{${ratePct}}{100} = ${deltaAmount}\\text{ DA}$، إذن المبلغ النهائي $= ${baseCost} ${isIncrease ? '+' : '-'} ${deltaAmount} = ${finalCost}\\text{ DA}$.`
			};
			finalAnswer = `${finalCost} DA`;
		}

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 8,
				customTitle: 'الوضعية الإدماجية',
				instruction: 'اقرأ الوضعية جيداً وأجب عن الأسئلة الثلاثة مع إبراز مراحل الحساب والوحدات:',
				content
			},
			hints: [
				'تذكّر توحيد وحدات الأبعاد قبل حساب الحجم: V = L × l × h، واستعمل 1 dm³ = 1 L أو 1 m³ = 1000 L.',
				`لحساب ${fillPct}% من السعة، اضرب السعة الكلية في ${fillPct} ثم اقسم على 100؛ وللتحقق من الصنبور احسب ما يضخه في الدقيقة الواحدة أولاً.`,
				`اجمع سعري التجهيزات (${item1Price} + ${item2Price}) ثم احسب قيمة ${ratePct}% منه و${isIncrease ? 'أضفها' : 'اطرحها'}.`
			],
			solutionStepsAr: [
				volStepAr,
				`كمية الماء المطلوبة لـ ${fillPct}% = (${capacityL} × ${fillPct}) ÷ 100 = ${waterL} L.`,
				`تدفق الصنبور = ${q1} ÷ ${t1} = ${ratePerMin} L/min، وفي ${t2} دقيقة يضخ ${pumpedL} L (${isEnough ? 'يكفي' : 'لا يكفي'}).`,
				`تكلفة المستلزمات الأساسية = ${baseCost} DA، وقيمة ${ratePct}% = ${deltaAmount} DA، والمبلغ النهائي = ${finalCost} DA (${canAfford ? 'يكفي' : 'لا يكفي'} مبلغ ${budget} DA).`
			],
			finalAnswer
		};
	}
};

// ============================================================================
// Export 1AM T3 Templates Array (5 domain + 1 integration = 6 templates)
// ============================================================================

export const TEMPLATES_1AM_T3: ParameterizedTemplate[] = [
	literalExpressionsEquationsTemplate,
	signedNumbersCoordsTemplate,
	proportionalityPctScaleTemplate,
	organizingDataChartsTemplate,
	cuboidCubeNetVolumeTemplate,
	integrationAquariumSuppliesTemplate
];
