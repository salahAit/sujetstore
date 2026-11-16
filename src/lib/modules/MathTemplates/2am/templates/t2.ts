import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../rng';
import { saveSvgAsset, svgNumberLine, svgParallelogram, svgTriangle } from '../../svg-helpers';

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 11,
	medium: 23,
	hard: 37
};

function makeRng(seed: number, difficulty: Difficulty, templateSalt: number): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 1009 + templateSalt * 137 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

function fmtSigned(n: number): string {
	const v = roundTo(n, 2);
	if (v === 0) return '0';
	return v > 0 ? `+${v}` : `${v}`;
}

function fmtParenSigned(n: number): string {
	const v = roundTo(n, 2);
	if (v === 0) return '0';
	return `(${v > 0 ? `+${v}` : `${v}`})`;
}

function fmtNum(n: number): string {
	return String(roundTo(n, 2));
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

/**
 * Orthogonal orthonormal coordinate plane (O; I, J) for 2AM signed coordinates (x, y).
 * Uses Typst-safe SVG primitives (no rgba(), solid hex + stroke-dasharray).
 */
function svgCoordinatePlane(
	points: { label: string; x: number; y: number; color?: string }[]
): string {
	const w = 296;
	const h = 236;
	const cx = 148;
	const cy = 118;
	const unit = 24;
	const xRange = 5;
	const yRange = 4;
	const parts: string[] = [];

	// Light grid lines
	for (let gx = -xRange; gx <= xRange; gx++) {
		const px = cx + gx * unit;
		parts.push(
			`<line x1="${px}" y1="${cy - yRange * unit}" x2="${px}" y2="${cy + yRange * unit}" stroke="#e2e8f0" stroke-width="1"/>`
		);
	}
	for (let gy = -yRange; gy <= yRange; gy++) {
		const py = cy - gy * unit;
		parts.push(
			`<line x1="${cx - xRange * unit}" y1="${py}" x2="${cx + xRange * unit}" y2="${py}" stroke="#e2e8f0" stroke-width="1"/>`
		);
	}

	// Axes
	const xLeft = cx - xRange * unit - 10;
	const xRight = cx + xRange * unit + 12;
	const yTop = cy - yRange * unit - 12;
	const yBottom = cy + yRange * unit + 10;
	parts.push(
		`<line x1="${xLeft}" y1="${cy}" x2="${xRight}" y2="${cy}" stroke="#1e293b" stroke-width="1.8"/>`,
		`<polygon points="${xRight + 6},${cy} ${xRight - 2},${cy - 4} ${xRight - 2},${cy + 4}" fill="#1e293b"/>`,
		`<line x1="${cx}" y1="${yBottom}" x2="${cx}" y2="${yTop}" stroke="#1e293b" stroke-width="1.8"/>`,
		`<polygon points="${cx},${yTop - 6} ${cx - 4},${yTop + 2} ${cx + 4},${yTop + 2}" fill="#1e293b"/>`,
		`<text x="${cx - 10}" y="${cy + 13}" font-size="11" font-weight="bold" fill="#0f172a">O</text>`
	);

	// Tick marks & numbers
	for (let gx = -4; gx <= 4; gx++) {
		if (gx === 0) continue;
		const px = cx + gx * unit;
		parts.push(
			`<line x1="${px}" y1="${cy - 3}" x2="${px}" y2="${cy + 3}" stroke="#334155" stroke-width="1.3"/>`,
			`<text x="${px}" y="${cy + 14}" text-anchor="middle" font-size="9" fill="#475569">${gx}</text>`
		);
	}
	for (let gy = -3; gy <= 3; gy++) {
		if (gy === 0) continue;
		const py = cy - gy * unit;
		parts.push(
			`<line x1="${cx - 3}" y1="${py}" x2="${cx + 3}" y2="${py}" stroke="#334155" stroke-width="1.3"/>`,
			`<text x="${cx - 10}" y="${py + 3}" text-anchor="end" font-size="9" fill="#475569">${gy}</text>`
		);
	}

	// Points and dashed projection guides
	for (const pt of points) {
		const px = cx + pt.x * unit;
		const py = cy - pt.y * unit;
		const col = pt.color || '#dc2626';
		parts.push(
			`<line x1="${px}" y1="${py}" x2="${px}" y2="${cy}" stroke="${col}" stroke-dasharray="3 3" stroke-width="1.1"/>`,
			`<line x1="${px}" y1="${py}" x2="${cx}" y2="${py}" stroke="${col}" stroke-dasharray="3 3" stroke-width="1.1"/>`,
			`<circle cx="${px}" cy="${py}" r="4.5" fill="${col}"/>`
		);
		const dx = pt.x >= 0 ? 8 : -16;
		const dy = pt.y >= 0 ? -7 : 15;
		parts.push(
			`<text x="${px + dx}" y="${py + dy}" font-size="12" font-weight="bold" fill="${col}">${escapeXml(pt.label)}</text>`
		);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

/**
 * Composite mountain park SVG: Parallelogram ABCD + adjoining right triangle CDE (right-angled at D).
 */
function svgParkComposite(opts: { b1: number; h1: number; b2: number; h2: number }): string {
	const w = 360;
	const h = 175;
	// Parallelogram ABCD: A(80,35), B(225,35), C(195,125), D(50,125)
	// Adjoining right triangle CDE (right at D? Wait: D is bottom-left, C is bottom-right; let's attach right triangle at C: D-C-E with right angle at C and E to the right, or attach at C with vertical leg CF = h2 going up/down!
	// Even cleaner geometrically: Parallelogram ABCD with A(75,38), B(210,38), C(180,126), D(45,126), height AH perpendicular to DC at H(75,126), and right triangle BCE right-angled at B (Wait: or right-angled triangle CEF on DC extended to E(270,126) with vertical leg EF or BF? Let's draw D(45,126), C(185,126), E(275,126), and F(185,54) so triangle CFE is right-angled at C!).
	// Let's check: A(75,38), B(215,38), C(185,126), D(45,126) -> AB = 140, DC = 140, top-to-bottom offset (-30, +88).
	// Wait: triangle CDE with right angle at D on the left, or triangle CFE with right angle at C? Actually let's draw right triangle CDE on the right of BC where D is shared or C-E-F:
	// Simplest unambiguous figure: Parallelogram ABCD [A(70,38), B(205,38), C(175,126), D(40,126)] AND right triangle EFG right at C? Wait: let's name vertices A,B,C,D for parallelogram and C,E,F for right triangle at C: base CE horizontal from C(175,126) to E(285,126), vertical leg CF from C(175,126) up to F(175,54)? No, CF crosses BC!
	// If A(70,38), B(205,38), C(175,126), D(40,126), and right triangle BEG with right angle at E on DC extended! Wait: drop perpendicular from B(205,38) to DC extended at H'(205,126), and extend to E(295,126) -> then B-H'-E is right-angled at H', whereas B-C-E is NOT right-angled!
	// What if parallelogram ABCD leans RIGHT instead of left, OR leans LEFT and right triangle is attached on the LEFT side (A-D-E with vertical AE? Wait: A is (70,38), D is (40,126), so A is right of D!).
	// Look: if parallelogram ABCD leans LEFT (top-left A(40,38), top-right B(175,38), bottom-right C(205,126), bottom-left D(70,126)), then B(175,38) is TO THE LEFT of C(205,126)! Still crosses if going up from C.
	// What if we draw them cleanly side by side OR attached along shared height/side?
	// Look: Rectangle/parallelogram ABCD: A(70,38), B(205,38), C(175,126), D(40,126). Attach right triangle DEF on the LEFT of AD? No, on the RIGHT: draw right triangle C E F SEPARATELY on the right (x=235..330) OR sharing base line y=126 with C(200,126), right angle at E(250,126), top F(250,48), hypotenuse from E/C? Wait: C(175,126), E(295,126), F(295,48) -> right-angled triangle CEF at E!
	// Look at those coordinates:
	// Parallelogram ABCD: A(68,38), B(198,38), C(168,126), D(38,126)
	// Right triangle CEF (sharing vertex C): C(168,126), E(305,126), F(305,46) — right angle at E! Zero overlapping lines, base CE = b2, height EF = h2!
	// That is 100% geometrically clean and crystal clear!
	const A = { x: 68, y: 38 };
	const B = { x: 198, y: 38 };
	const C = { x: 168, y: 126 };
	const D = { x: 38, y: 126 };
	const H = { x: 68, y: 126 };
	const E = { x: 305, y: 126 };
	const F = { x: 305, y: 46 };

	const parts = [
		// Parallelogram ABCD
		`<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" fill="#fefce8" stroke="#ca8a04" stroke-width="2.2"/>`,
		`<line x1="${A.x}" y1="${A.y}" x2="${H.x}" y2="${H.y}" stroke="#dc2626" stroke-dasharray="4 3" stroke-width="1.8"/>`,
		`<rect x="${H.x}" y="${H.y - 8}" width="8" height="8" fill="none" stroke="#dc2626" stroke-width="1.3"/>`,
		// Right triangle CEF
		`<polygon points="${C.x},${C.y} ${E.x},${E.y} ${F.x},${F.y}" fill="#f0fdf4" stroke="#15803d" stroke-width="2.2"/>`,
		`<rect x="${E.x - 9}" y="${E.y - 9}" width="9" height="9" fill="none" stroke="#dc2626" stroke-width="1.3"/>`,
		// Vertex labels
		`<text x="${A.x - 10}" y="${A.y - 8}" font-size="12" font-weight="bold" fill="#0f172a">A</text>`,
		`<text x="${B.x + 5}" y="${B.y - 8}" font-size="12" font-weight="bold" fill="#0f172a">B</text>`,
		`<text x="${C.x - 4}" y="${C.y + 15}" font-size="12" font-weight="bold" fill="#0f172a">C</text>`,
		`<text x="${D.x - 12}" y="${D.y + 15}" font-size="12" font-weight="bold" fill="#0f172a">D</text>`,
		`<text x="${E.x + 6}" y="${E.y + 15}" font-size="12" font-weight="bold" fill="#0f172a">E</text>`,
		`<text x="${F.x + 6}" y="${F.y - 4}" font-size="12" font-weight="bold" fill="#0f172a">F</text>`,
		// Dimension labels
		`<text x="${(D.x + C.x) / 2}" y="${D.y + 24}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${opts.b1} m</text>`,
		`<text x="${A.x + 5}" y="${(A.y + H.y) / 2}" font-size="11" font-weight="bold" fill="#dc2626">${opts.h1} m</text>`,
		`<text x="${(C.x + E.x) / 2}" y="${E.y + 24}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e293b">${opts.b2} m</text>`,
		`<text x="${E.x + 8}" y="${(E.y + F.y) / 2 + 4}" font-size="11" font-weight="bold" fill="#15803d">${opts.h2} m</text>`
	];

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

// ---------------------------------------------------------------------------
// 1. Signed Relative Numbers: Number-line reading, ordering, coordinates, distance AB
// ---------------------------------------------------------------------------
const tmpl1SignedNumbersAxisCoords: ParameterizedTemplate = {
	id: '2am_t2_signed_numbers_axis_coords',
	grade: '2am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الأعداد النسبية: المستقيم المدرج، الترتيب، المعلم والمسافة',
	curriculumLessonId: 'lesson_2am_t2_signed_numbers_ordering_coords',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 1);

		const isHalf = difficulty === 'medium';
		const minVal = isHalf ? -6 : -5;
		const maxVal = isHalf ? 6 : 5;

		let xA: number;
		let xB: number;
		let xC: number;
		if (isHalf) {
			xA = rng.pick([-5.5, -4.5, -3.5, -2.5]);
			xC = rng.pick([-1, -0.5, 0.5, 1]);
			xB = rng.pick([2.5, 3.5, 4.5, 5.5]);
		} else {
			xA = rng.pick([-5, -4, -3]);
			xC = rng.pick([-1, 0, 1]);
			xB = rng.pick([3, 4, 5]);
		}

		// Ensure fourth distinct number for ordering
		const fourthCandidates = [-4.5, -2, -1.5, 1.5, 2, 4.5].filter(
			(v) => v !== xA && v !== xB && v !== xC
		);
		const xD = rng.pick(fourthCandidates);
		const distAB = roundTo(xB - xA, 1);

		const axisSvg = svgNumberLine({
			min: minVal,
			max: maxVal,
			step: 1,
			subTicks: isHalf ? 2 : 1,
			marks: [
				{ value: xA, label: 'A', color: '#dc2626' },
				{ value: xC, label: 'C', color: '#16a34a' },
				{ value: xB, label: 'B', color: '#2563eb' }
			]
		});
		const axisUrl = saveSvgAsset(`2am_t2_axis_${difficulty}_${cleanSeed}`, axisSvg);

		// Coordinate plane points with |px| != |py| and away from crowded origin ticks
		const coordX = [-4, -3, -2, 2, 3, 4];
		const coordY = [-3, -2, 2, 3];
		const px1 = rng.pick(coordX);
		const pyCandidates = coordY.filter((y) => Math.abs(y) !== Math.abs(px1));
		const py1 = rng.pick(pyCandidates);

		const px2Candidates = coordX.filter((x) => x !== px1 && Math.abs(x) !== Math.abs(py1));
		const px2 = rng.pick(px2Candidates);
		const py2 = rng.pick(coordY.filter((y) => y !== py1 && Math.abs(y) !== Math.abs(px2)));

		const planeSvg = svgCoordinatePlane([
			{ label: 'M', x: px1, y: py1, color: '#dc2626' },
			{ label: 'N', x: px2, y: py2, color: '#2563eb' }
		]);
		const planeUrl = saveSvgAsset(`2am_t2_plane_${difficulty}_${cleanSeed}`, planeSvg);

		const orderedAsc = [xA, xB, xC, xD].sort((u, v) => u - v);
		const orderedAscStr = orderedAsc.map((v) => fmtParenSigned(v)).join(' < ');

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy') {
			quizQuestion = {
				type: 'calculated',
				questionText: `انطلاقاً من المستقيم المدرج المقابل، ما هي فاصلة النقطة $A$؟`,
				questionTextAr: `انطلاقاً من المستقيم المدرج المقابل، ما هي فاصلة النقطة $A$؟`,
				imageUrl: axisUrl,
				imageCaption: 'مستقيم مدرج وحدة تدريجه 1',
				questionData: {
					answer: xA,
					displayTemplate: 'x_A = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `النقطة A تقع على يسار الصفر بـ ${Math.abs(xA)} وحدات، إذن فاصلتها هي ${fmtSigned(xA)}.`
			};
			hints = [
				'انظر إلى موقع النقطة $A$ بالنسبة إلى المبدأ $0$ (الصفر).',
				'الأعداد الواقعة على يسار الصفر أعداد سالبة، وعلى يمينه أعداد موجبة.',
				`عدّ التدريجات انطلاقاً من $0$ نحو اليسار حتى تصل إلى النقطة $A$ لتجد $${fmtSigned(xA)}$.`
			];
			solutionStepsAr = [
				`قراءة الفواصل: $A(${fmtSigned(xA)})$، $C(${fmtSigned(xC)})$، $B(${fmtSigned(xB)})$.`,
				`الترتيب التصاعدي: $${orderedAscStr}$.`,
				`المسافة $AB = ${fmtSigned(xB)} - ${fmtParenSigned(xA)} = ${fmtNum(distAB)}$.`,
				`إحداثيا النقطة $M$ في المعلم هما $(${fmtSigned(px1)} ; ${fmtSigned(py1)})$.`
			];
			finalAnswer = fmtSigned(xA);
		} else if (difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `على المستقيم المدرج المقابل، احسب المسافة $AB$ بين النقطتين $A(${fmtSigned(xA)})$ و $B(${fmtSigned(xB)})$.`,
				questionTextAr: `على المستقيم المدرج المقابل، احسب المسافة $AB$ بين النقطتين $A(${fmtSigned(xA)})$ و $B(${fmtSigned(xB)})$.`,
				imageUrl: axisUrl,
				imageCaption: 'مستقيم مدرج بنصف وحدة (0.5)',
				questionData: {
					answer: distAB,
					displayTemplate: 'AB = x_B - x_A = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `المسافة بين نقطتين على مستقيم مدرج تساوي الفاصلة الكبرى ناقص الفاصلة الصغرى: AB = (${fmtSigned(xB)}) - (${fmtSigned(xA)}) = ${fmtNum(distAB)}.`
			};
			hints = [
				'تذكّر أن المسافة بين نقطتين تكون دائماً عدداً موجباً.',
				'لحساب المسافة $AB$ نطرح الفاصلة الصغرى من الفاصلة الكبرى: $AB = x_B - x_A$.',
				`عوّض الفاصلتين: $${fmtParenSigned(xB)} - ${fmtParenSigned(xA)} = ${fmtNum(distAB)}$.`
			];
			solutionStepsAr = [
				`الفاصلة الكبرى هي $x_B = ${fmtSigned(xB)}$ والفاصلة الصغرى هي $x_A = ${fmtSigned(xA)}$.`,
				`حساب المسافة: $AB = ${fmtParenSigned(xB)} - ${fmtParenSigned(xA)} = ${fmtNum(xB)} + ${fmtNum(-xA)} = ${fmtNum(distAB)}$.`,
				`الترتيب التصاعدي: $${orderedAscStr}$.`,
				`إحداثيا $M$ هما $(${fmtSigned(px1)} ; ${fmtSigned(py1)})$ وإحداثيا $N$ هما $(${fmtSigned(px2)} ; ${fmtSigned(py2)})$.`
			];
			finalAnswer = fmtNum(distAB);
		} else {
			const correctStr = `$(${fmtSigned(px1)} ; ${fmtSigned(py1)})$`;
			const mcqBuilt = buildUniqueMcqOptions(
				correctStr,
				[
					{
						text: `$(${fmtSigned(py1)} ; ${fmtSigned(px1)})$`,
						diagnosticFeedback:
							'انتبه للترتيب: نكتب الفاصلة (المحور الأفقي) أولاً ثم الترتيب (المحور العمودي) ثانياً.'
					},
					{
						text: `$(${fmtSigned(-px1)} ; ${fmtSigned(py1)})$`,
						diagnosticFeedback:
							'خطأ في إشارة الفاصلة: على يمين المبدأ O الفواصل موجبة وعلى يساره سالبة.'
					},
					{
						text: `$(${fmtSigned(px1)} ; ${fmtSigned(-py1)})$`,
						diagnosticFeedback:
							'خطأ في إشارة الترتيب: فوق المبدأ O التراتيب موجبة وتحته سالبة.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في المعلم المتعامد والمتجانس المقابل، ما هما إحداثيا النقطة $M$؟`,
				questionTextAr: `في المعلم المتعامد والمتجانس المقابل، ما هما إحداثيا النقطة $M$؟`,
				imageUrl: planeUrl,
				imageCaption: 'معلم متعامد ومتجانس (O; I, J)',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نقرأ الفاصلة على محور الفواصل الأفقي (${fmtSigned(px1)}) ثم الترتيب على محور التراتيب العمودي (${fmtSigned(py1)})، إذن M(${fmtSigned(px1)} ; ${fmtSigned(py1)}).`
			};
			hints = [
				'الإحداثي الأول هو الفاصلة (على المحور الأفقي)، والثاني هو الترتيب (على المحور العمودي).',
				'أسقط النقطة $M$ عمودياً على محور الفواصل لقراءة الفاصلة، ثم على محور التراتيب لقراءة الترتيب.',
				`فاصلة $M$ هي $${fmtSigned(px1)}$ وترتيبها هو $${fmtSigned(py1)}$.`
			];
			solutionStepsAr = [
				`فاصلة النقطة $M$ هي $${fmtSigned(px1)}$ وترتيبها هو $${fmtSigned(py1)}$، أي $M(${fmtSigned(px1)} ; ${fmtSigned(py1)})$.`,
				`فواصل المستقيم المدرج: $A(${fmtSigned(xA)})$، $C(${fmtSigned(xC)})$، $B(${fmtSigned(xB)})$.`,
				`الترتيب التصاعدي: $${orderedAscStr}$.`,
				`المسافة $AB = ${fmtParenSigned(xB)} - ${fmtParenSigned(xA)} = ${fmtNum(distAB)}$.`
			];
			finalAnswer = `(${fmtSigned(px1)} ; ${fmtSigned(py1)})`;
		}

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: axisUrl,
				caption: 'المستقيم المدرج'
			},
			{
				type: 'text',
				content: '1) اقرأ من المستقيم المدرج فاصلتي النقطتين $A$ و $B$ وعيّن معاكس فاصلة $A$.',
				answer: `1) فاصلة $A$ هي $${fmtSigned(xA)}$ وفاصلة $B$ هي $${fmtSigned(xB)}$، ومعاكس فاصلة $A$ هو $${fmtSigned(-xA)}$.`,
				mark: '1'
			},
			{
				type: 'text',
				content: `2) رتّب الأعداد النسبية الآتية ترتيباً تصاعدياً: $${fmtParenSigned(xB)}$ ، $${fmtParenSigned(xA)}$ ، $${fmtParenSigned(xD)}$ ، $${fmtParenSigned(xC)}$ ثم احسب المسافة $A B$.`,
				answer: `2) الترتيب التصاعدي: $${orderedAscStr}$.\n\nالمسافة: $A B = ${fmtParenSigned(xB)} - ${fmtParenSigned(xA)} = ${fmtNum(distAB)}$.`,
				mark: '1'
			},
			{
				type: 'columns',
				widths: ['1.3fr', '1fr'],
				children: [
					{
						type: 'text',
						content:
							'3) في المعلم المتعامد والمتجانس المقابل، اقرأ إحداثيي النقطتين $M$ و $N$ ثم استنتج إحداثيي النقطة $M\'$ نظيرة $M$ بالنسبة إلى المبدأ $O$.',
						answer: `3) $M(${fmtSigned(px1)} ; ${fmtSigned(py1)})$ و $N(${fmtSigned(px2)} ; ${fmtSigned(py2)})$، ونظيرة $M$ بالنسبة إلى $O$ هي $M'(${fmtSigned(-px1)} ; ${fmtSigned(-py1)})$.`,
						mark: '1'
					},
					{
						type: 'image',
						src: planeUrl,
						caption: 'المعلم المتعامد والمتجانس'
					}
				]
			}
		];

		const sujetExercise: ExerciseBlock = {
			points: 3,
			instruction: 'إليك المستقيم المدرج والمعلم المتعامد والمتجانس الموضحين في الشكلين:',
			content
		};

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 2. Algebraic Sum of Signed Numbers (+ and - ONLY; NO signed mul/div!)
// ---------------------------------------------------------------------------
const tmpl2AlgebraicSum: ParameterizedTemplate = {
	id: '2am_t2_algebraic_sum',
	grade: '2am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'جمع وطرح الأعداد النسبية والمجموع الجبري',
	curriculumLessonId: 'lesson_2am_t2_signed_numbers_add_sub_distance',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 2);

		let quizExprDisplay: string;
		let quizExprTypst: string;
		let ans: number;
		let distractors: { text: string; diagnosticFeedback: string }[];
		let quizSteps: string[];
		let explanation: string;

		// Additional expressions for the 3-pt SujetExercise
		const exA1 = -rng.int(4, 12);
		const exA2 = rng.int(3, 10);
		const exA = exA1 + exA2;

		const exB1 = rng.int(3, 11);
		const exB2 = -rng.int(4, 13);
		const exB = exB1 - exB2;

		if (difficulty === 'easy') {
			const isSub = rng.int(0, 1) === 1;
			let a = rng.pick([-1, 1]) * rng.int(4, 15);
			let b = rng.pick([-1, 1]) * rng.int(3, 14);
			if (!isSub && a > 0 && b > 0) a = -a;
			if (Math.abs(a) === Math.abs(b)) b = b > 0 ? b + 2 : b - 2;

			if (!isSub) {
				ans = a + b;
				quizExprDisplay = `A = ${fmtParenSigned(a)} + ${fmtParenSigned(b)}`;
				quizExprTypst = `A = ${fmtParenSigned(a)} + ${fmtParenSigned(b)}`;
				const wrongSign = -ans;
				const sumMags =
					(a > 0) !== (b > 0)
						? (Math.abs(a) + Math.abs(b)) * (ans >= 0 ? 1 : -1)
						: (Math.abs(a) - Math.abs(b)) * (ans >= 0 ? 1 : -1);
				const subInstead = a - b;
				distractors = [
					{
						text: `$${fmtSigned(wrongSign)}$`,
						diagnosticFeedback:
							'خطأ في الإشارة: عند جمع عددين نسبيين مختلفي الإشارة نأخذ إشارة العدد الذي مسافته إلى الصفر أكبر.'
					},
					{
						text: `$${fmtSigned(sumMags)}$`,
						diagnosticFeedback:
							(a > 0) !== (b > 0)
								? 'تذكّر: عند جمع عددين مختلفي الإشارة نطرح المسافتين إلى الصفر ولا نجمعهما.'
								: 'عند جمع عددين من نفس الإشارة نجمع المسافتين إلى الصفر ولا نطرحهما.'
					},
					{
						text: `$${fmtSigned(subInstead)}$`,
						diagnosticFeedback: 'انتبه للعملية المعطاة: العملية جمع وليست طرحاً.'
					}
				];
				quizSteps = [
					`نلاحظ إشارتي العددين ${fmtParenSigned(a)} و ${fmtParenSigned(b)}.`,
					(a > 0) !== (b > 0)
						? 'العددان مختلفان في الإشارة: نطرح المسافتين إلى الصفر ونأخذ إشارة العدد الأكبر مسافة إلى الصفر.'
						: 'العددان لهما نفس الإشارة: نجمع المسافتين إلى الصفر ونحتفظ بالإشارة المشتركة.',
					`نجد: $${quizExprDisplay} = ${fmtSigned(ans)}$.`
				];
				explanation = `عند جمع ${fmtParenSigned(a)} و ${fmtParenSigned(b)} نطبق قاعدة جمع عددين نسبيين فنجد ${fmtSigned(ans)}.`;
			} else {
				// Ensure b is negative half the time to drill subtracting negative
				if (b > 0) b = -b;
				ans = a - b;
				quizExprDisplay = `A = ${fmtParenSigned(a)} - ${fmtParenSigned(b)}`;
				quizExprTypst = `A = ${fmtParenSigned(a)} - ${fmtParenSigned(b)}`;
				distractors = [
					{
						text: `$${fmtSigned(a + b)}$`,
						diagnosticFeedback:
							'نسيت قاعدة الطرح: لطرح عدد نسبي نضيف معاكسه، أي يتحول طرح السالب إلى جمع موجب.'
					},
					{
						text: `$${fmtSigned(-ans)}$`,
						diagnosticFeedback:
							'خطأ في إشارة الناتج النهائي بعد تحويل الطرح إلى جمع مع المعاكس.'
					},
					{
						text: `$${fmtSigned(-(Math.abs(a) + Math.abs(b)))}$`,
						diagnosticFeedback:
							'تذكّر: طرح عدد سالب يتحول إلى إضافة عدد موجب: $-(-b) = +b$.'
					}
				];
				quizSteps = [
					`نحوّل الطرح إلى جمع مع المعاكس: $${fmtParenSigned(a)} + ${fmtParenSigned(-b)}$.`,
					`نجمع العددين النسبيين فنجد: $A = ${fmtSigned(ans)}$.`
				];
				explanation = `نحوّل الطرح إلى جمع مع المعاكس: ${fmtParenSigned(a)} + ${fmtParenSigned(-b)} = ${fmtSigned(ans)}.`;
			}
		} else if (difficulty === 'medium') {
			const n1 = -rng.int(4, 12);
			const n2 = -rng.int(3, 11); // -(-n2) -> +|n2|
			const n3 = rng.pick([-1, 1]) * rng.int(2, 9);
			let n4 = rng.int(3, 10); // -(+n4) -> -n4
			ans = n1 - n2 + n3 - n4;
			if (ans === 0) {
				n4 += 2;
				ans = n1 - n2 + n3 - n4;
			}
			quizExprDisplay = `S = ${fmtParenSigned(n1)} - ${fmtParenSigned(n2)} + ${fmtParenSigned(n3)} - ${fmtParenSigned(n4)}`;
			quizExprTypst = `S = ${fmtParenSigned(n1)} - ${fmtParenSigned(n2)} + ${fmtParenSigned(n3)} - ${fmtParenSigned(n4)}`;

			const simplifiedStr = `${n1} + ${-n2} ${n3 >= 0 ? `+ ${n3}` : `- ${-n3}`} - ${n4}`;
			distractors = [
				{
					text: `$${fmtSigned(n1 + n2 + n3 - n4)}$`,
					diagnosticFeedback: `انتبه عند تحويل الطرح $- ${fmtParenSigned(n2)}$ إلى جمع: يصبح $+${-n2}$ وليس $-${-n2}$.`
				},
				{
					text: `$${fmtSigned(n1 - n2 + n3 + n4)}$`,
					diagnosticFeedback: `انتبه عند طرح $+${n4}$: نضيف معاكسه $-${n4}$ وليس $+${n4}$.`
				},
				{
					text: `$${fmtSigned(-ans)}$`,
					diagnosticFeedback:
						'تحقق من الإشارة الغالبة عند جمع الحدود الموجبة معاً والحدود السالبة معاً.'
				}
			];
			quizSteps = [
				`نحوّل عمليات الطرح إلى جمع مع المعاكس: $S = ${fmtParenSigned(n1)} + ${fmtParenSigned(-n2)} + ${fmtParenSigned(n3)} + ${fmtParenSigned(-n4)}$.`,
				`نبسّط الكتابة: $S = ${simplifiedStr}$.`,
				`نجمع الموجب معاً والسالب معاً فنجد $S = ${fmtSigned(ans)}$.`
			];
			explanation = `بتحويل الطرح إلى جمع مع المعاكس تصبح العبارة ${simplifiedStr} = ${fmtSigned(ans)}.`;
		} else {
			// Hard: 4-term decimal algebraic sum (tenths, exact)
			const t1 = -rng.pick([25, 35, 42, 55, 64, 75, 85]);
			const t2 = -rng.pick([15, 25, 32, 45, 58, 65]);
			const t3 = rng.pick([-45, -35, -24, 24, 35, 48, 55]);
			let t4 = rng.pick([15, 22, 35, 44, 52]);
			if (t1 - t2 + t3 - t4 === 0) t4 += 10;

			const d1 = t1 / 10;
			const d2 = t2 / 10;
			const d3 = t3 / 10;
			const d4 = t4 / 10;
			ans = roundTo((t1 - t2 + t3 - t4) / 10, 1);

			quizExprDisplay = `S = ${fmtParenSigned(d1)} - ${fmtParenSigned(d2)} + ${fmtParenSigned(d3)} - ${fmtParenSigned(d4)}`;
			quizExprTypst = `S = ${fmtParenSigned(d1)} - ${fmtParenSigned(d2)} + ${fmtParenSigned(d3)} - ${fmtParenSigned(d4)}`;

			distractors = [
				{
					text: `$${fmtSigned(roundTo((t1 + t2 + t3 - t4) / 10, 1))}$`,
					diagnosticFeedback: `نسيت عكس إشارة ${fmtParenSigned(d2)} عند تحويل الطرح إلى جمع مع المعاكس.`
				},
				{
					text: `$${fmtSigned(roundTo((t1 - t2 + t3 + t4) / 10, 1))}$`,
					diagnosticFeedback: `لطرح ${fmtParenSigned(d4)} يجب إضافة معاكسه ${fmtParenSigned(-d4)}.`
				},
				{
					text: `$${fmtSigned(roundTo(-ans, 1))}$`,
					diagnosticFeedback:
						'خطأ في إشارة الناتج: قارن بين مجموع الحدود الموجبة ومجموع الحدود السالبة.'
				}
			];
			quizSteps = [
				`نحوّل الطرح إلى جمع مع المعاكس: $S = ${fmtParenSigned(d1)} + ${fmtParenSigned(-d2)} + ${fmtParenSigned(d3)} + ${fmtParenSigned(-d4)}$.`,
				`نجمع الحدود الموجبة معاً والحدود السالبة معاً.`,
				`نجد في النهاية $S = ${fmtSigned(ans)}$.`
			];
			explanation = `نحوّل الطرح إلى جمع مع المعاكس ثم نجمع الأعداد العشرية الموجبة معاً والسالبة معاً لنحصل على ${fmtSigned(ans)}.`;
		}

		const mcqBuilt = buildUniqueMcqOptions(`$${fmtSigned(ans)}$`, distractors, rng);

		const quizQuestion: QuizQuestionPayload = {
			type: 'mcq',
			questionText: `احسب ناتج العبارة الآتية:\n$${quizExprDisplay}$`,
			questionTextAr: `احسب ناتج العبارة الآتية:\n$${quizExprDisplay}$`,
			questionData: {
				options: mcqBuilt.options,
				correctIndices: mcqBuilt.correctIndices,
				correctIndexes: mcqBuilt.correctIndices
			},
			explanation
		};

		const hints: [string, string, string] = [
			'تذكّر أن طرح عدد نسبي يؤول إلى إضافة معاكسه: $-(-b) = +b$ و $-(+b) = -b$.',
			'بعد تحويل كل عمليات الطرح إلى جمع، اجمع الحدود الموجبة معاً والحدود السالبة معاً.',
			'عند جمع عددين مختلفي الإشارة نطرح المسافتين إلى الصفر ونأخذ إشارة الأكبر مسافة إلى الصفر.'
		];

		const sujetExercise: ExerciseBlock = {
			points: 3,
			instruction: 'احسب العبارات الآتية مع توضيح مراحل التبسيط والحساب:',
			content: [
				{
					type: 'text',
					content: `1) احسب المجموع والفرق: $E = ${fmtParenSigned(exA1)} + ${fmtParenSigned(exA2)}$ و $F = ${fmtParenSigned(exB1)} - ${fmtParenSigned(exB2)}$.`,
					answer: `1) $E = ${fmtSigned(exA)}$ ، و $F = ${fmtParenSigned(exB1)} + ${fmtParenSigned(-exB2)} = ${fmtSigned(exB)}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) بسّط ثم احسب المجموع الجبري: $${quizExprTypst}$.`,
					answer: `2) بعد تحويل الطرح إلى جمع مع المعاكس وتجميع الحدود:\n\n$${quizExprTypst} = ${fmtSigned(ans)}$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: '3) قارن بين النتيجتين $E$ و $F$.',
					answer: `3) بما أن $${fmtSigned(exA)} < ${fmtSigned(exB)}$ فإن $E < F$.`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr: quizSteps,
			finalAnswer: fmtSigned(ans)
		};
	}
};

// ---------------------------------------------------------------------------
// 3. Literal Expressions, Testing Equality/Inequality, Solving a+x=b / ax=b
// ---------------------------------------------------------------------------
const tmpl3LiteralExpressionsEquations: ParameterizedTemplate = {
	id: '2am_t2_literal_expressions_equations',
	grade: '2am',
	trimesterId: 't2',
	domain: 'numeric',
	titleAr: 'الحساب الحرفي، اختبار مساواة أو متباينة وحل معادلات بسيطة',
	curriculumLessonId: 'lesson_2am_t2_literal_expressions_equations',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 3);

		// Shared positive parameters for SujetExercise
		const addA = rng.int(7, 24);
		const solAdd = rng.int(5, 22);
		const addB = addA + solAdd;

		const mulA = rng.int(3, 9);
		const solMul = rng.int(4, 14);
		const mulB = mulA * solMul;

		const rectWidth = rng.int(3, 8);
		const xEval = rng.int(4, 10);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let part2Text: string;
		let part2Answer: string;

		if (difficulty === 'easy') {
			const useMul = rng.int(0, 1) === 1;
			const targetSol = useMul ? solMul : solAdd;
			const eqStr = useMul ? `${mulA}x = ${mulB}` : `${addA} + x = ${addB}`;
			const eqPlain = useMul ? `${mulA} × x = ${mulB}` : `${addA} + x = ${addB}`;

			quizQuestion = {
				type: 'fill_blank',
				questionText: `أوجد قيمة العدد المجهول $x$ التي تحقق المعادلة: $${eqStr}$`,
				questionTextAr: `أوجد قيمة العدد المجهول $x$ التي تحقق المعادلة: $${eqStr}$`,
				questionData: {
					sentence: `في المعادلة ${eqPlain} ، قيمة x تساوي ___`,
					acceptedAnswers: [String(targetSol)],
					answers: [String(targetSol)]
				},
				explanation: useMul
					? `العدد الذي نضربه في ${mulA} للحصول على ${mulB} هو ${mulB} ÷ ${mulA} = ${solMul}.`
					: `العدد الذي نضيفه إلى ${addA} للحصول على ${addB} هو ${addB} - ${addA} = ${solAdd}.`
			};
			hints = [
				useMul
					? 'فكّر في معنى عملية الضرب: ما هو العدد الذي إذا ضربناه في العامل المعلوم يعطي الجداء؟'
					: 'فكّر في معنى عملية الجمع: ما هو العدد الذي نضيفه للحد الأول للحصول على المجموع؟',
				useMul ? `اقسم ${mulB} على ${mulA}.` : `اطرح ${addA} من ${addB}.`,
				`نجد $x = ${targetSol}$ ويمكنك التحقق بالتعويض في المعادلة.`
			];
			solutionStepsAr = [
				useMul
					? `لحل المعادلة $${mulA}x = ${mulB}$ نعتمد على معنى الضرب: $x = ${mulB} \\div ${mulA} = ${solMul}$.`
					: `لحل المعادلة $${addA} + x = ${addB}$ نعتمد على معنى الجمع: $x = ${addB} - ${addA} = ${solAdd}$.`,
				`التحقق: نعوض $x = ${targetSol}$ في المعادلة فنجد المساواة صحيحة.`
			];
			finalAnswer = String(targetSol);

			part2Text = `2) اختبر صحة المساواة $2 x + ${rectWidth} = ${2 * xEval + rectWidth}$ من أجل $x = ${xEval}$.`;
			part2Answer = `2) عند $x = ${xEval}$، قيمة الطرف الأول هي $2 times ${xEval} + ${rectWidth} = ${2 * xEval + rectWidth}$ وتساوي الطرف الثاني، فالمساواة صحيحة.`;
		} else if (difficulty === 'medium') {
			// True/False: testing equality by substitution (NO solving ax+b=cx+d!)
			const c1 = rng.int(3, 6);
			const c2 = rng.int(1, c1 - 1);
			const xTest = rng.int(2, 7);
			const d1 = rng.int(3, 12);
			const lhsVal = c1 * xTest + d1;
			const makeTrue = rng.int(0, 1) === 1;
			let d2 = lhsVal - c2 * xTest;
			if (!makeTrue) {
				const shift = rng.pick([-3, -2, 2, 3]);
				d2 = Math.max(1, d2 + shift);
				if (c2 * xTest + d2 === lhsVal) d2 += 2;
			}
			const rhsVal = c2 * xTest + d2;
			const isTrue = lhsVal === rhsVal;

			quizQuestion = {
				type: 'true_false',
				questionText: `اختبر صحة المساواة الآتية من أجل $x = ${xTest}$:\n$${c1}x + ${d1} = ${c2}x + ${d2}$`,
				questionTextAr: `اختبر صحة المساواة الآتية من أجل $x = ${xTest}$:\n$${c1}x + ${d1} = ${c2}x + ${d2}$`,
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `الطرف الأول = ${c1} × ${xTest} + ${d1} = ${lhsVal}، والطرف الثاني = ${c2} × ${xTest} + ${d2} = ${rhsVal}، إذن المساواة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			};
			hints = [
				`لاختبار صحة مساواة، نعوّض الحرف $x$ بالقيمة المعطاة $${xTest}$ في كل طرف على حدة.`,
				`احسب الطرف الأول: $${c1} \\times ${xTest} + ${d1}$، ثم احسب الطرف الثاني: $${c2} \\times ${xTest} + ${d2}$.`,
				isTrue
					? `بما أن الطرفين متساويان (${lhsVal} = ${rhsVal}) فالمساواة صحيحة.`
					: `بما أن الطرفين مختلفان (${lhsVal} \\neq ${rhsVal}) فالمساواة خاطئة.`
			];
			solutionStepsAr = [
				`حساب الطرف الأول من أجل $x = ${xTest}$: $${c1} \\times ${xTest} + ${d1} = ${lhsVal}$.`,
				`حساب الطرف الثاني من أجل $x = ${xTest}$: $${c2} \\times ${xTest} + ${d2} = ${rhsVal}$.`,
				`المقارنة: $${lhsVal} ${isTrue ? '=' : '\\neq'} ${rhsVal}$، إذن المساواة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			];
			finalAnswer = isTrue ? 'صحيح' : 'خطأ';

			part2Text = `2) اختبر صحة المساواة $${c1} x + ${d1} = ${c2} x + ${d2}$ من أجل $x = ${xTest}$.`;
			part2Answer = `2) قيمة الطرف الأول هي $${c1} times ${xTest} + ${d1} = ${lhsVal}$، وقيمة الطرف الثاني هي $${c2} times ${xTest} + ${d2} = ${rhsVal}$، إذن المساواة ${isTrue ? 'صحيحة' : 'خاطئة'}.`;
		} else {
			// Hard: True/False testing inequality
			const c1 = rng.int(3, 7);
			const d1 = rng.int(2, 11);
			const xTest = rng.int(3, 8);
			const lhsVal = c1 * xTest + d1;
			const useLessThan = rng.int(0, 1) === 1;
			const makeTrue = rng.int(0, 1) === 1;
			const delta = rng.int(2, 7);
			const limit = useLessThan
				? makeTrue
					? lhsVal + delta
					: Math.max(1, lhsVal - delta)
				: makeTrue
					? Math.max(1, lhsVal - delta)
					: lhsVal + delta;
			const isTrue = useLessThan ? lhsVal < limit : lhsVal > limit;
			const op = useLessThan ? '<' : '>';

			quizQuestion = {
				type: 'true_false',
				questionText: `اختبر صحة المتباينة الآتية من أجل $x = ${xTest}$:\n$${c1}x + ${d1} ${op} ${limit}$`,
				questionTextAr: `اختبر صحة المتباينة الآتية من أجل $x = ${xTest}$:\n$${c1}x + ${d1} ${op} ${limit}$`,
				questionData: {
					correctAnswer: isTrue
				},
				explanation: `بالتعويض بـ x = ${xTest}: الطرف الأيسر = ${c1} × ${xTest} + ${d1} = ${lhsVal}. وبما أن ${lhsVal} ${isTrue ? op : useLessThan ? '≥' : '≤'} ${limit} فإن المتباينة ${isTrue ? 'صحيحة' : 'خاطئة'}.`
			};
			hints = [
				`عوّض $x$ بالعدد $${xTest}$ في الطرف المتضمن للمجهول.`,
				`احسب أولاً $${c1} \\times ${xTest} + ${d1}$ مع احترام أولوية الضرب على الجمع.`,
				`قارن الناتج $${lhsVal}$ بالعدد $${limit}$ باستعمال رمز المتباينة $${op}$.`
			];
			solutionStepsAr = [
				`نعوّض $x = ${xTest}$ في العبارة: $${c1} \\times ${xTest} + ${d1} = ${c1 * xTest} + ${d1} = ${lhsVal}$.`,
				`نقارن $${lhsVal}$ مع $${limit}$: ${isTrue ? `$${lhsVal} ${op} ${limit}$ محققة` : `$${lhsVal} ${op} ${limit}$ غير محققة`}.`,
				`إذن المتباينة ${isTrue ? 'صحيحة' : 'خاطئة'} من أجل $x = ${xTest}$.`
			];
			finalAnswer = isTrue ? 'صحيح' : 'خطأ';

			part2Text = `2) اختبر صحة المتباينة $${c1} x + ${d1} ${op} ${limit}$ من أجل $x = ${xTest}$.`;
			part2Answer = `2) بالتعويض بـ $x = ${xTest}$ ، قيمة الطرف الأول هي $${lhsVal}$. وبما أن $${lhsVal} ${isTrue ? op : useLessThan ? '>=' : '<='} ${limit}$ فالمتباينة ${isTrue ? 'صحيحة' : 'خاطئة'}.`;
		}

		const perimVal = 2 * (xEval + rectWidth);
		const sujetExercise: ExerciseBlock = {
			points: 3,
			instruction: 'أجب عن الأسئلة الآتية بدقة:',
			content: [
				{
					type: 'text',
					content: `1) مستطيل طوله $x$ وعرضه $${rectWidth}$ سم. عبّر بدلالة $x$ عن محيطه $P$، ثم احسب $P$ من أجل $x = ${xEval}$ سم.`,
					answer: `1) المحيط: $P = 2 times (x + ${rectWidth}) = 2 x + ${2 * rectWidth}$. عند $x = ${xEval}$ نجد $P = ${perimVal}$ سم.`,
					mark: '1'
				},
				{
					type: 'text',
					content: part2Text,
					answer: part2Answer,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) حل المعادلتين البسيطتين: $${addA} + x = ${addB}$ و $${mulA} x = ${mulB}$.`,
					answer: `3) من المعادلة الأولى $x = ${addB} - ${addA} = ${solAdd}$، ومن المعادلة الثانية $x = ${mulB} div ${mulA} = ${solMul}$.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'numeric',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 4. Triangles: Inequality, Angle sum 180°, Circumcircle, Area
// ---------------------------------------------------------------------------
const tmpl4TrianglesAnglesArea: ParameterizedTemplate = {
	id: '2am_t2_triangles_angles_area',
	grade: '2am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'المثلثات: المتباينة المثلثية، مجموع الزوايا، الدائرة المحيطة والمساحة',
	curriculumLessonId: 'lesson_2am_t2_triangles_inequality_angles_construction',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 4);

		// Valid angle triple summing to 180°
		const angA = rng.pick([40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 95]);
		const angB = rng.pick([25, 30, 35, 40, 45, 50, 55]);
		const angC = 180 - angA - angB;

		// Valid triangle inequality triple for Part 1 (or tested triple in medium)
		const triS1 = rng.int(4, 8);
		const triS2 = rng.int(5, 9);
		const isConstructible = rng.int(0, 1) === 1;
		const triS3 = isConstructible
			? rng.int(Math.max(triS1, triS2), triS1 + triS2 - 1)
			: triS1 + triS2 + rng.pick([0, 1, 2, 3]);
		const sidesShuffled = rng.shuffle([triS1, triS2, triS3]);

		// Right-triangle legs for exact area
		const legAB = rng.int(4, 10);
		const legAC = rng.pick([4, 6, 8, 10, 12]);
		const rightArea = roundTo((legAB * legAC) / 2, 1);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let svgUrl: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				angleLabels: [`${angA}°`, `${angB}°`, '?'],
				circumcircle: false
			});
			svgUrl = saveSvgAsset(`2am_t2_tri_easy_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في المثلث $ABC$ المقابل، إذا كان $\\widehat{A} = ${angA}^\\circ$ و $\\widehat{B} = ${angB}^\\circ$، فما قيس الزاوية $\\widehat{C}$ بالدرجات؟`,
				questionTextAr: `في المثلث $ABC$ المقابل، إذا كان $\\widehat{A} = ${angA}^\\circ$ و $\\widehat{B} = ${angB}^\\circ$، فما قيس الزاوية $\\widehat{C}$ بالدرجات؟`,
				imageUrl: svgUrl,
				imageCaption: 'المثلث ABC',
				questionData: {
					answer: angC,
					displayTemplate: 'C = 180 - (A + B) = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `مجموع أقياس زوايا أي مثلث هو 180°، إذن قيس الزاوية C = 180° - (${angA}° + ${angB}°) = ${angC}°.`,
			};
			hints = [
				'تذكّر خاصية مجموع أقياس زوايا المثلث.',
				'مجموع أقياس زوايا المثلث يساوي $180^\\circ$.',
				`احسب $180 - (${angA} + ${angB})$ لتجد قيس الزاوية $\\widehat{C}$.`
			];
			solutionStepsAr = [
				`نعلم أن مجموع أقياس زوايا مثلث يساوي $180^\\circ$: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.`,
				`نعوّض: $\\widehat{C} = 180^\\circ - (${angA}^\\circ + ${angB}^\\circ) = 180^\\circ - ${angA + angB}^\\circ = ${angC}^\\circ$.`
			];
			finalAnswer = `${angC}°`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في المثلث $A B C$ المقابل، لدينا $hat(A) = ${angA}°$ و $hat(B) = ${angB}°$. احسب قيس الزاوية $hat(C)$.`,
							answer: `1) مجموع زوايا المثلث $180°$، إذن $hat(C) = 180° - (${angA}° + ${angB}°) = ${angC}°$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'المثلث ABC'
						}
					]
				},
				{
					type: 'text',
					content:
						'2) كيف ننشئ مركز الدائرة المحيطة بالمثلث $A B C$؟',
					answer: '2) مركز الدائرة المحيطة بمثلث هو نقطة تلاقي محاور أضلاعه الثلاثة.',
					mark: '1'
				},
				{
					type: 'text',
					content: `3) هل يمكن إنشاء مثلث أطوال أضلاعه $${sidesShuffled[0]}$ سم، $${sidesShuffled[1]}$ سم، $${sidesShuffled[2]}$ سم؟ علّل إجابتك.`,
					answer: isConstructible
						? `3) نعم يمكن، لأن مجموع طولي الضلعين الأصغرين $${triS1} + ${triS2} = ${triS1 + triS2} > ${triS3}$ (المتباينة المثلثية محققة).`
						: `3) لا يمكن، لأن مجموع طولي الضلعين الأصغرين $${triS1} + ${triS2} = ${triS1 + triS2} ${triS1 + triS2 === triS3 ? '=' : '<'} ${triS3}$ (غير أكبر تماماً من الضلع الأكبر).`,
					mark: '1'
				}
			];
		} else if (difficulty === 'medium') {
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				angleLabels: [`${angA}°`, `${angB}°`, `${angC}°`],
				circumcircle: true
			});
			svgUrl = saveSvgAsset(`2am_t2_tri_medium_${cleanSeed}`, triSvg);

			const sumTwoSmaller = triS1 + triS2;
			const correctOpt = isConstructible
				? `نعم، لأن $${triS1} + ${triS2} = ${sumTwoSmaller} > ${triS3}$`
				: sumTwoSmaller === triS3
					? `لا، لأن $${triS1} + ${triS2} = ${sumTwoSmaller} = ${triS3}$ (النقط في استقامية)`
					: `لا، لأن $${triS1} + ${triS2} = ${sumTwoSmaller} < ${triS3}$`;

			const distractors = isConstructible
				? [
						{
							text: `لا، لأن الضلع الأكبر طوله $${triS3}\\text{ cm}$`,
							diagnosticFeedback:
								'الشرط هو مقارنة الضلع الأكبر بمجموع الضلعين الأصغرين؛ وبما أن المجموع أكبر تماماً فإن الإنشاء ممكن.'
						},
						{
							text: `لا، لأن الأضلاع غير متساوية`,
							diagnosticFeedback:
								'لا يشترط أن تكون الأضلاع متساوية لإنشاء مثلث؛ يكفي تحقق المتباينة المثلثية.'
						},
						{
							text: `نعم، لأن $${triS3} + ${triS2} > ${triS1}$ فقط`,
							diagnosticFeedback:
								'التحقق الحاسم في المتباينة المثلثية يكون بمقارنة مجموع الضلعين الأصغرين مع الضلع الأكبر.'
						}
					]
				: [
						{
							text: `نعم، لأن $${triS3} + ${triS2} > ${triS1}$`,
							diagnosticFeedback:
								'يكفي أن ينكسر الشرط مع الضلع الأكبر: يجب أن يكون مجموع الضلعين الأصغرين أكبر تماماً من الضلع الأكبر.'
						},
						{
							text: `نعم، لأن $${sumTwoSmaller}$ قريب من $${triS3}$`,
							diagnosticFeedback:
								'المتباينة المثلثية شرط صارم: يجب أن يكون مجموع الضلعين الأصغرين أكبر تماماً من الضلع الأكبر.'
						},
						{
							text: `نعم، لأن كل مثلث له 3 أضلاع`,
							diagnosticFeedback:
								'ليست كل ثلاثة أطوال تشكّل مثلثاً؛ يجب تحقق المتباينة المثلثية.'
						}
					];

			const mcqBuilt = buildUniqueMcqOptions(correctOpt, distractors, rng);
			quizQuestion = {
				type: 'mcq',
				questionText: `هل يمكن إنشاء مثلث أطوال أضلاعه $${sidesShuffled[0]}\\text{ cm}$ و $${sidesShuffled[1]}\\text{ cm}$ و $${sidesShuffled[2]}\\text{ cm}$؟`,
				questionTextAr: `هل يمكن إنشاء مثلث أطوال أضلاعه $${sidesShuffled[0]}\\text{ cm}$ و $${sidesShuffled[1]}\\text{ cm}$ و $${sidesShuffled[2]}\\text{ cm}$؟`,
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: isConstructible
					? `الضلع الأكبر هو ${triS3} سم ومجموع الضلعين الآخرين ${triS1} + ${triS2} = ${sumTwoSmaller} > ${triS3}، إذن يمكن إنشاء المثلث.`
					: `الضلع الأكبر هو ${triS3} سم ومجموع الضلعين الآخرين ${triS1} + ${triS2} = ${sumTwoSmaller} ${sumTwoSmaller === triS3 ? '=' : '<'} ${triS3}، إذن لا يمكن إنشاء المثلث.`
			};
			hints = [
				'استعمل المتباينة المثلثية بالبحث أولاً عن أطول ضلع بين الأطوال الثلاثة.',
				`أطول ضلع هو $${triS3}$، ومجموع الضلعين الأصغرين هو $${triS1} + ${triS2} = ${sumTwoSmaller}$.`,
				isConstructible
					? 'بما أن مجموع الضلعين الأصغرين أكبر تماماً من الضلع الأكبر فالإنشاء ممكن.'
					: 'بما أن مجموع الضلعين الأصغرين ليس أكبر تماماً من الضلع الأكبر فالإنشاء غير ممكن.'
			];
			solutionStepsAr = [
				`نرتب الأطوال ونحدد الضلع الأكبر وهو $${triS3}\\text{ cm}$.`,
				`نحسب مجموع طولي الضلعين الأصغرين: $${triS1} + ${triS2} = ${sumTwoSmaller}\\text{ cm}$.`,
				isConstructible
					? `بما أن $${sumTwoSmaller} > ${triS3}$ فإن المتباينة المثلثية محققة، ويمكن إنشاء المثلث.`
					: `بما أن $${sumTwoSmaller} ${sumTwoSmaller === triS3 ? '=' : '<'} ${triS3}$ فإن المتباينة المثلثية غير محققة، فلا يمكن إنشاء المثلث.`
			];
			finalAnswer = isConstructible ? 'نعم' : 'لا';

			content = [
				{
					type: 'text',
					content: `1) هل يمكن إنشاء مثلث $E F G$ أطوال أضلاعه $${sidesShuffled[0]}$ سم، $${sidesShuffled[1]}$ سم، $${sidesShuffled[2]}$ سم؟ علّل باستعمال المتباينة المثلثية.`,
					answer: isConstructible
						? `1) نعم يمكن، لأن مجموع الضلعين الأصغرين $${triS1} + ${triS2} = ${sumTwoSmaller} > ${triS3}$.`
						: `1) لا يمكن، لأن مجموع الضلعين الأصغرين $${triS1} + ${triS2} = ${sumTwoSmaller} ${sumTwoSmaller === triS3 ? '=' : '<'} ${triS3}$.`,
					mark: '1'
				},
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `2) في المثلث $A B C$ المقابل المرسوم داخل دائرته المحيطة: إذا كان $hat(A) = ${angA}°$ و $hat(B) = ${angB}°$، احسب $hat(C)$ واذكر كيف نحدد مركز الدائرة المحيطة به.`,
							answer: `2) $hat(C) = 180° - (${angA}° + ${angB}°) = ${angC}°$. مركز الدائرة المحيطة هو نقطة تلاقي محاور أضلاع المثلث $A B C$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'الدائرة المحيطة بالمثلث ABC'
						}
					]
				},
				{
					type: 'text',
					content: `3) احسب مساحة مثلث طول قاعدته $${legAC}$ سم والارتفاع المتعلق بها $${legAB}$ سم.`,
					answer: `3) $S = frac(${legAC} times ${legAB}, 2) = ${rightArea}$ سم² .`,
					mark: '1'
				}
			];
		} else {
			// Hard: Right-angled triangle area + circumcircle center at hypotenuse midpoint
			const triSvg = svgTriangle({
				labels: ['A', 'B', 'C'],
				rightAngleAtA: true,
				sideAB: `${legAB} cm`,
				sideAC: `${legAC} cm`,
				circumcircle: true
			});
			svgUrl = saveSvgAsset(`2am_t2_tri_hard_${cleanSeed}`, triSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في الشكل المقابل، $ABC$ مثلث قائم في $A$ حيث $AB = ${legAB}\\text{ cm}$ و $AC = ${legAC}\\text{ cm}$. احسب مساحة المثلث $ABC$ بـ $\\text{cm}^2$.`,
				questionTextAr: `في الشكل المقابل، $ABC$ مثلث قائم في $A$ حيث $AB = ${legAB}\\text{ cm}$ و $AC = ${legAC}\\text{ cm}$. احسب مساحة المثلث $ABC$ بـ $\\text{cm}^2$.`,
				imageUrl: svgUrl,
				imageCaption: 'مثلث قائم في A ودائرته المحيطة',
				questionData: {
					answer: rightArea,
					displayTemplate: 'S = (AB * AC) / 2 = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `مساحة المثلث القائم تساوي نصف جداء ضلعي الزاوية القائمة: المساحة S = (${legAB} × ${legAC}) ÷ 2 = ${rightArea} سم².`,
			};
			hints = [
				'في المثلث القائم، أحد ضلعي الزاوية القائمة يُعتبر قاعدة والضلع الآخر هو الارتفاع المتعلق بها.',
				'قانون مساحة المثلث هو $S = \\frac{b \\times h}{2}$.',
				`احسب $\\frac{${legAB} \\times ${legAC}}{2} = ${rightArea}$.`
			];
			solutionStepsAr = [
				`بما أن $ABC$ قائم في $A$ فإن $[AB]$ و $[AC]$ هما ضلعا الزاوية القائمة.`,
				`نطبق قانون المساحة: $S = \\frac{AB \\times AC}{2} = \\frac{${legAB} \\times ${legAC}}{2} = ${rightArea}\\text{ cm}^2$.`,
				`مركز الدائرة المحيطة بالمثلث القائم $ABC$ هو منتصف وتره $[BC]$.`
			];
			finalAnswer = `${rightArea} cm²`;

			const rightAngB = rng.pick([28, 32, 35, 38, 42]);
			const rightAngC = 90 - rightAngB;
			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في الشكل المقابل $A B C$ مثلث قائم في $A$، حيث $A B = ${legAB}$ سم و $A C = ${legAC}$ سم. احسب مساحته $S$.`,
							answer: `1) $S = frac(A B times A C, 2) = frac(${legAB} times ${legAC}, 2) = ${rightArea}$ سم² .`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'مثلث قائم في A ودائرته المحيطة'
						}
					]
				},
				{
					type: 'text',
					content: `2) إذا علمت أن $hat(B) = ${rightAngB}°$، احسب قيس الزاوية $hat(C)$، ثم حدّد بدقة موضع مركز الدائرة المحيطة بالمثلث القائم $A B C$.`,
					answer: `2) $hat(C) = 180° - (90° + ${rightAngB}°) = ${rightAngC}°$. مركز الدائرة المحيطة بالمثلث القائم هو منتصف الوتر $[B C]$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) تحقق إن كان بالإمكان إنشاء مثلث أطوال أضلاعه $${sidesShuffled[0]}$ سم، $${sidesShuffled[1]}$ سم، $${sidesShuffled[2]}$ سم.`,
					answer: isConstructible
						? `3) نعم، لأن $${triS1} + ${triS2} = ${triS1 + triS2} > ${triS3}$ (المتباينة المثلثية محققة).`
						: `3) لا، لأن $${triS1} + ${triS2} = ${triS1 + triS2} ${triS1 + triS2 === triS3 ? '=' : '<'} ${triS3}$ (المتباينة المثلثية غير محققة).`,
					mark: '1'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 3,
				instruction: 'إليك المعطيات الهندسية الآتية، أجب عن جميع الأسئلة مع التعليل:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 5. Parallelogram Properties & Special Parallelograms & Area
// ---------------------------------------------------------------------------
const tmpl5ParallelogramPropertiesArea: ParameterizedTemplate = {
	id: '2am_t2_parallelogram_properties_area',
	grade: '2am',
	trimesterId: 't2',
	domain: 'geometry',
	titleAr: 'متوازي الأضلاع: الخواص، متوازيات الأضلاع الخاصة والمساحة',
	curriculumLessonId: 'lesson_2am_t2_parallelogram_and_special_quads',
	defaultPoints: 3,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 5);

		const baseDC = rng.int(6, 14);
		const heightH = rng.int(3, 8);
		const areaS = baseDC * heightH;
		const halfAC = rng.int(3, 7);
		const diagAC = 2 * halfAC;
		const angleADC = rng.pick([50, 55, 65, 70, 75, 80]);
		const angleDAB = 180 - angleADC;

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;
		let svgUrl: string;
		let content: ContentBlock[];

		if (difficulty === 'easy') {
			const paraSvg = svgParallelogram({
				baseLabel: `${baseDC} cm`,
				heightLabel: `${heightH} cm`,
				vertices: ['A', 'B', 'C', 'D'],
				showDiagonals: false
			});
			svgUrl = saveSvgAsset(`2am_t2_para_easy_${cleanSeed}`, paraSvg);

			quizQuestion = {
				type: 'calculated',
				questionText: `في الشكل المقابل، $ABCD$ متوازي أضلاع طول قاعدته $DC = ${baseDC}\\text{ cm}$ والارتفاع المتعلق بها $h = ${heightH}\\text{ cm}$. احسب مساحته $S$ بـ $\\text{cm}^2$.`,
				questionTextAr: `في الشكل المقابل، $ABCD$ متوازي أضلاع طول قاعدته $DC = ${baseDC}\\text{ cm}$ والارتفاع المتعلق بها $h = ${heightH}\\text{ cm}$. احسب مساحته $S$ بـ $\\text{cm}^2$.`,
				imageUrl: svgUrl,
				imageCaption: 'متوازي الأضلاع ABCD',
				questionData: {
					answer: areaS,
					displayTemplate: 'S = b * h = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `مساحة متوازي الأضلاع تساوي القاعدة في الارتفاع المتعلق بها: المساحة S = ${baseDC} × ${heightH} = ${areaS} سم².`,
			};
			hints = [
				'استعمل قاعدة حساب مساحة متوازي الأضلاع.',
				'مساحة متوازي الأضلاع تساوي جداء طول القاعدة والارتفاع المتعلق بها: $S = b \\times h$.',
				`اضرب $${baseDC} \\times ${heightH}$ لتجد $${areaS}\\text{ cm}^2$.`
			];
			solutionStepsAr = [
				`نطبق قانون مساحة متوازي الأضلاع: $S = DC \\times h$.`,
				`نعوّض: $S = ${baseDC} \\times ${heightH} = ${areaS}\\text{ cm}^2$.`
			];
			finalAnswer = `${areaS} cm²`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) استنتج طول الضلع $[A B]$ وقيس الزاوية $hat(A B C)$ علماً أن $A B C D$ متوازي أضلاع فيه $D C = ${baseDC}$ سم و $hat(A D C) = ${angleADC}°$.`,
							answer: `1) في متوازي الأضلاع كل ضلعين متقابلين متقايسان وكل زاويتين متقابلتين متقايستان، إذن $A B = ${baseDC}$ سم و $hat(A B C) = ${angleADC}°$.`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'متوازي الأضلاع ABCD'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب مساحة متوازي الأضلاع $A B C D$ إذا كان الارتفاع المتعلق بالقاعدة $[D C]$ هو $h = ${heightH}$ سم.`,
					answer: `2) $S = D C times h = ${baseDC} times ${heightH} = ${areaS}$ سم² .`,
					mark: '1'
				},
				{
					type: 'text',
					content: '3) إذا كان قطراه $[A C]$ و $[B D]$ متقايسين، ما طبيعة الرباعي $A B C D$؟',
					answer: '3) متوازي أضلاع قطراه متقايسان هو مستطيل.',
					mark: '1'
				}
			];
		} else if (difficulty === 'medium') {
			const paraSvg = svgParallelogram({
				baseLabel: `${baseDC} cm`,
				heightLabel: `${heightH} cm`,
				vertices: ['A', 'B', 'C', 'D'],
				showDiagonals: true
			});
			svgUrl = saveSvgAsset(`2am_t2_para_medium_${cleanSeed}`, paraSvg);

			const mcqBuilt = buildUniqueMcqOptions(
				`$${angleDAB}^\\circ$`,
				[
					{
						text: `$${angleADC}^\\circ$`,
						diagnosticFeedback:
							'الزاويتان متتاليتان وليستا متقابلتين! كل زاويتين متتاليتين في متوازي الأضلاع متكاملتان مجموعهما 180°.'
					},
					{
						text: `$${90 - angleADC}^\\circ$`,
						diagnosticFeedback:
							'الزاويتان المتتاليتان في متوازي الأضلاع متكاملتان (مجموعهما 180°) وليستا متتامتين (90°).'
					},
					{
						text: `$${360 - angleADC}^\\circ$`,
						diagnosticFeedback:
							'مجموع كل زاويتين متتاليتين في متوازي الأضلاع يساوي 180° وليس 360°.'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `في متوازي الأضلاع $ABCD$ المقابل، إذا كان $\\widehat{ADC} = ${angleADC}^\\circ$، فما هو قيس الزاوية $\\widehat{DAB}$؟`,
				questionTextAr: `في متوازي الأضلاع $ABCD$ المقابل، إذا كان $\\widehat{ADC} = ${angleADC}^\\circ$، فما هو قيس الزاوية $\\widehat{DAB}$؟`,
				imageUrl: svgUrl,
				imageCaption: 'متوازي الأضلاع ABCD وقطراه',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `في متوازي الأضلاع كل زاويتين متتاليتين متكاملتان (مجموعهما 180°)، إذن قيس الزاوية DAB يساوي 180° - ${angleADC}° = ${angleDAB}°.`,
			};
			hints = [
				'لاحظ موقع الزاويتين $\\widehat{ADC}$ و $\\widehat{DAB}$ في متوازي الأضلاع.',
				'هما زاويتان متتاليتان، وفي متوازي الأضلاع كل زاويتين متتاليتين متكاملتان.',
				`احسب $180^\\circ - ${angleADC}^\\circ = ${angleDAB}^\\circ$.`
			];
			solutionStepsAr = [
				`في متوازي الأضلاع $ABCD$، الزاويتان $\\widehat{ADC}$ و $\\widehat{DAB}$ متتاليتان، إذن مجموعهما $180^\\circ$.`,
				`$\\widehat{DAB} = 180^\\circ - ${angleADC}^\\circ = ${angleDAB}^\\circ$.`
			];
			finalAnswer = `${angleDAB}°`;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في متوازي الأضلاع $A B C D$ المقابل، القطران $[A C]$ و $[B D]$ يتقاطعان في $O$، حيث $A C = ${diagAC}$ سم و $hat(A D C) = ${angleADC}°$. احسب الطول $O A$ وقيس الزاوية $hat(D A B)$.`,
							answer: `1) القطران متناصفان إذن $O A = frac(${diagAC}, 2) = ${halfAC}$ سم. والزاويتان $hat(A D C)$ و $hat(D A B)$ متتاليتان متكاملتان إذن $hat(D A B) = 180° - ${angleADC}° = ${angleDAB}°$.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'متوازي الأضلاع ABCD وقطراه'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب مساحة متوازي الأضلاع $A B C D$ علماً أن $D C = ${baseDC}$ سم و $h = ${heightH}$ سم.`,
					answer: `2) $S = ${baseDC} times ${heightH} = ${areaS}$ سم² .`,
					mark: '1'
				},
				{
					type: 'text',
					content: '3) إذا تعامد القطران $(A C) perp (B D)$، فما طبيعة الرباعي $A B C D$؟ علّل.',
					answer: '3) هو معين، لأن كل متوازي أضلاع قطراه متعامدان هو معين.',
					mark: '0.75'
				}
			];
		} else {
			// Hard: Special parallelograms classification + reverse height calculation h2 = S / sideAD
			const sideDivisors = [2, 3, 4, 5, 6].filter((d) => (areaS * 2) % d === 0 && d < baseDC);
			const sideAD = rng.pick(sideDivisors.length ? sideDivisors : [2]);
			const secondH = roundTo(areaS / sideAD, 1);

			const paraSvg = svgParallelogram({
				baseLabel: `${baseDC} cm`,
				heightLabel: `${heightH} cm`,
				vertices: ['A', 'B', 'C', 'D'],
				showDiagonals: true
			});
			svgUrl = saveSvgAsset(`2am_t2_para_hard_${cleanSeed}`, paraSvg);

			const kind = rng.int(0, 2); // 0=rectangle, 1=rhombus, 2=square
			const promptCond =
				kind === 0
					? 'قطراه $[AC]$ و $[BD]$ متقايسان'
					: kind === 1
						? 'قطراه $[AC]$ و $[BD]$ متعامدان'
						: 'قطراه $[AC]$ و $[BD]$ متقايسان ومتعامدان';
			const correctShape = kind === 0 ? 'مستطيل' : kind === 1 ? 'معين' : 'مربع';
			const allShapes = [
				{
					name: 'مستطيل',
					fb: 'المستطيل متوازي أضلاع قطراه متقايسان (دون اشتراط تعامدهما).'
				},
				{
					name: 'معين',
					fb: 'المعين متوازي أضلاع قطراه متعامدان (دون اشتراط تقايسهما).'
				},
				{
					name: 'مربع',
					fb: 'المربع متوازي أضلاع قطراه متقايسان ومتعامدان معاً.'
				},
				{
					name: 'متوازي أضلاع كيفي فقط',
					fb: 'توفّر خاصية إضافية في القطرين يحوّل متوازي الأضلاع إلى متوازي أضلاع خاص.'
				}
			];

			const mcqBuilt = buildUniqueMcqOptions(
				correctShape,
				allShapes.filter((s) => s.name !== correctShape).map((s) => ({
					text: s.name,
					diagnosticFeedback: s.fb
				})),
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `$ABCD$ متوازي أضلاع فيه ${promptCond}. ما هي الطبيعة الدقيقة للرباعي $ABCD$؟`,
				questionTextAr: `$ABCD$ متوازي أضلاع فيه ${promptCond}. ما هي الطبيعة الدقيقة للرباعي $ABCD$؟`,
				imageUrl: svgUrl,
				imageCaption: 'متوازي الأضلاع ABCD وقطراه',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `متوازي الأضلاع الذي ${promptCond.replace(/\$/g, '')} هو ${correctShape}.`
			};
			hints = [
				'استحضر خواص أقطار متوازيات الأضلاع الخاصة (المستطيل، المعين، المربع).',
				'تقايس القطرين يعطي المستطيل، وتعامد القطرين يعطي المعين، واجتماع الخاصيتين يعطي المربع.',
				`الخاصية المعطاة تطابق تعريف الـ${correctShape}.`
			];
			solutionStepsAr = [
				`المعطى: $ABCD$ متوازي أضلاع فيه ${promptCond}.`,
				`الخاصية المميزة للأقطار تجعل الرباعي $ABCD$ عبارة عن ${correctShape}.`
			];
			finalAnswer = correctShape;

			content = [
				{
					type: 'columns',
					widths: ['1.4fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) في متوازي الأضلاع $A B C D$ المقابل، $D C = ${baseDC}$ سم، والارتفاع المتعلق به $h = ${heightH}$ سم، وطول الضلع $A D = ${sideAD}$ سم. احسب المساحة $S$ ثم استنتج الارتفاع $h'$ المتعلق بالضلع $[A D]$.`,
							answer: `1) المساحة $S = ${baseDC} times ${heightH} = ${areaS}$ سم² ، والارتفاع $h' = ${areaS} div ${sideAD} = ${fmtNum(secondH)}$ سم.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: svgUrl,
							caption: 'متوازي الأضلاع ABCD وقطراه'
						}
					]
				},
				{
					type: 'text',
					content: `2) إذا علمت أن $hat(A D C) = ${angleADC}°$ و $A C = ${diagAC}$ سم، أوجد قيس $hat(D A B)$ والطول $O A$.`,
					answer: `2) $hat(D A B) = 180° - ${angleADC}° = ${angleDAB}°$، و $O A = ${diagAC} div 2 = ${halfAC}$ سم (القطران متناصفان).`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) إذا أضفنا الشرط: ${promptCond}، ما هي الطبيعة الدقيقة للرباعي $A B C D$؟`,
					answer: `3) الرباعي $A B C D$ هو ${correctShape}.`,
					mark: '0.75'
				}
			];
		}

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: 3,
				instruction: 'لاحظ الشكل المقابل وأجب عن الأسئلة الآتية بالتعليل:',
				content
			},
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ---------------------------------------------------------------------------
// 6. T2 Integration Situation (8-pt format: signed temp/altitude + park area + inequality/budget)
// ---------------------------------------------------------------------------
const tmpl6IntegrationSituation: ParameterizedTemplate = {
	id: '2am_t2_integration_situation',
	grade: '2am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'الوضعية الإدماجية: تهيئة حديقة جبلية',
	curriculumLessonId: 'lesson_2am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = makeRng(cleanSeed, difficulty, 6);

		const region = rng.pick(['تيكجدة', 'الشريعة', 'جرجرة', 'الأوراس']);
		const tMorning = -rng.int(2, 7);
		const tRise = rng.int(9, 16);
		const tNoon = tMorning + tRise; // positive
		const tDrop = rng.int(5, 11);
		const tNight = tNoon - tDrop;
		const tempRange = tNoon - tMorning; // equals tRise

		// Park dimensions: Parallelogram ABCD + Right triangle CEF
		const b1 = rng.int(12, 22);
		const h1 = rng.int(7, 13);
		const areaPara = b1 * h1;

		const b2 = rng.pick([6, 8, 10, 12, 14]);
		const h2 = rng.int(5, 11);
		const areaTri = roundTo((b2 * h2) / 2, 1);
		const totalArea = roundTo(areaPara + areaTri, 1);

		// Budget & literal inequality parameters
		const unitPrice = rng.priceDA(150, 350, 50);
		const fixedFee = rng.priceDA(1000, 3000, 500);
		const actualCost = unitPrice * totalArea + fixedFee;

		const isBudgetEnough = cleanSeed % 2 === 0;
		const deltaBudget = rng.priceDA(1500, 4500, 500);
		const budget = isBudgetEnough ? actualCost + deltaBudget : Math.max(5000, actualCost - deltaBudget);
		const realEnough = actualCost <= budget;

		// Simple equation part for decorative trees
		const treeCount = rng.pick([4, 5, 6, 8]);
		const treePrice = rng.priceDA(300, 700, 50);
		const treesTotal = treeCount * treePrice;

		const parkSvg = svgParkComposite({ b1, h1, b2, h2 });
		const parkUrl = saveSvgAsset(`2am_t2_park_${difficulty}_${cleanSeed}`, parkSvg);

		let quizQuestion: QuizQuestionPayload;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (difficulty === 'easy' || difficulty === 'medium') {
			quizQuestion = {
				type: 'calculated',
				questionText: `تتكون حديقة جبلية من منطقة زهور على شكل متوازي أضلاع $ABCD$ قاعدته $DC = ${b1}\\text{ m}$ وارتفاعه $h_1 = ${h1}\\text{ m}$، ومنطقة عشب مثلثة الشكل $CEF$ قائمة في $E$ حيث $CE = ${b2}\\text{ m}$ و $EF = ${h2}\\text{ m}$. احسب المساحة الكلية للحديقة بـ $\\text{m}^2$.`,
				questionTextAr: `تتكون حديقة جبلية من منطقة زهور على شكل متوازي أضلاع $ABCD$ قاعدته $DC = ${b1}\\text{ m}$ وارتفاعه $h_1 = ${h1}\\text{ m}$، ومنطقة عشب مثلثة الشكل $CEF$ قائمة في $E$ حيث $CE = ${b2}\\text{ m}$ و $EF = ${h2}\\text{ m}$. احسب المساحة الكلية للحديقة بـ $\\text{m}^2$.`,
				imageUrl: parkUrl,
				imageCaption: 'مخطط الحديقة الجبلية',
				questionData: {
					answer: totalArea,
					displayTemplate: 'S_total = (b1 * h1) + (b2 * h2) / 2 = ?',
					variables: [],
					tolerance: 0.01
				},
				explanation: `مساحة متوازي الأضلاع: ${b1} × ${h1} = ${areaPara} م²، ومساحة المثلث القائم: (${b2} × ${h2}) ÷ 2 = ${areaTri} م²، إذن المساحة الكلية = ${areaPara} + ${areaTri} = ${totalArea} م².`,
			};
			hints = [
				'جزّئ الحديقة إلى شكلين مألوفين: متوازي أضلاع $ABCD$ ومثلث قائم $CEF$.',
				'مساحة متوازي الأضلاع $S_1 = b_1 \\times h_1$ ومساحة المثلث القائم $S_2 = \\frac{b_2 \\times h_2}{2}$.',
				`اجمع المساحتين: $${areaPara} + ${areaTri} = ${totalArea}\\text{ m}^2$.`
			];
			solutionStepsAr = [
				`درجة الحرارة ليلاً: $(${fmtSigned(tMorning)}) + (+${tRise}) - (+${tDrop}) = ${fmtSigned(tNight)}^\\circ\\text{C}$، والمدى الحراري $= (${fmtSigned(tNoon)}) - (${fmtSigned(tMorning)}) = ${tempRange}^\\circ\\text{C}$.`,
				`مساحة متوازي الأضلاع: $S_1 = ${b1} \\times ${h1} = ${areaPara}\\text{ m}^2$.`,
				`مساحة المثلث القائم: $S_2 = \\frac{${b2} \\times ${h2}}{2} = ${areaTri}\\text{ m}^2$.`,
				`المساحة الكلية: $S = ${areaPara} + ${areaTri} = ${totalArea}\\text{ m}^2$.`,
				`التكلفة: $C = ${unitPrice} \\times ${totalArea} + ${fixedFee} = ${actualCost}\\text{ DA}$، وهي ${realEnough ? 'أصغر من أو تساوي' : 'أكبر من'} الميزانية $${budget}\\text{ DA}$، وسعر الشجيرة الواحدة $= ${treesTotal} \\div ${treeCount} = ${treePrice}\\text{ DA}$.`
			];
			finalAnswer = `${totalArea} m²`;
		} else {
			// Hard: MCQ testing budget inequality for fencing/grassing totalArea
			const correctStr = realEnough
				? `تكفي، لأن التكلفة $${actualCost}\\text{ DA} \\leq ${budget}\\text{ DA}$`
				: `لا تكفي، لأن التكلفة $${actualCost}\\text{ DA} > ${budget}\\text{ DA}$`;

			const mcqBuilt = buildUniqueMcqOptions(
				correctStr,
				[
					{
						text: realEnough
							? `لا تكفي، لأن التكلفة $${actualCost}\\text{ DA} > ${budget}\\text{ DA}$`
							: `تكفي، لأن التكلفة $${actualCost}\\text{ DA} \\leq ${budget}\\text{ DA}$`,
						diagnosticFeedback:
							'أعد مقارنة التكلفة الإجمالية المحسوبة مع الميزانية المتوفرة بدقة.'
					},
					{
						text: realEnough
							? `لا تكفي، لأن التكلفة $${unitPrice * totalArea}\\text{ DA}$ بدون المصاريف الثابتة تتجاوز الميزانية`
							: `تكفي، لأن التكلفة دون المصاريف الثابتة هي $${unitPrice * totalArea}\\text{ DA}$`,
						diagnosticFeedback:
							'لا تنسَ إضافة المصاريف الثابتة للنقل والتركيب في العبارة الحرفية للتكلفة.'
					},
					{
						text: `تكفي، لأن التكلفة $${unitPrice * areaPara + fixedFee}\\text{ DA}$`,
						diagnosticFeedback:
							'لقد حسبت مساحة متوازي الأضلاع فقط ونسيت مساحة المثلث القائم!'
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `مساحة حديقة جبلية تساوي $S = ${totalArea}\\text{ m}^2$. إذا كانت تكلفة تهيئة $x\\text{ m}^2$ تُعطى بالعبارة $C = ${unitPrice}x + ${fixedFee}$ وميزانية البلدية هي $${budget}\\text{ DA}$، فهل تكفي الميزانية لتهيئة كل الحديقة؟`,
				questionTextAr: `مساحة حديقة جبلية تساوي $S = ${totalArea}\\text{ m}^2$. إذا كانت تكلفة تهيئة $x\\text{ m}^2$ تُعطى بالعبارة $C = ${unitPrice}x + ${fixedFee}$ وميزانية البلدية هي $${budget}\\text{ DA}$، فهل تكفي الميزانية لتهيئة كل الحديقة؟`,
				imageUrl: parkUrl,
				imageCaption: 'مخطط الحديقة الجبلية',
				questionData: {
					options: mcqBuilt.options,
					correctIndices: mcqBuilt.correctIndices,
					correctIndexes: mcqBuilt.correctIndices
				},
				explanation: `نعوّض x = ${totalArea} في العبارة: C = ${unitPrice} × ${totalArea} + ${fixedFee} = ${actualCost} دج. بمقارنة ${actualCost} دج مع الميزانية ${budget} دج نجد أن الميزانية ${realEnough ? 'تكفي' : 'لا تكفي'}.`
			};
			hints = [
				`اختبر صحة المتباينة $${unitPrice}x + ${fixedFee} \\leq ${budget}$ من أجل $x = ${totalArea}$.`,
				`احسب التكلفة أولاً باحترام أولوية الضرب: $${unitPrice} \\times ${totalArea} + ${fixedFee}$.`,
				`قارن الناتج $${actualCost}$ مع الميزانية $${budget}$.`
			];
			solutionStepsAr = [
				`حساب التكلفة الإجمالية من أجل $x = ${totalArea}$: $C = ${unitPrice} \\times ${totalArea} + ${fixedFee} = ${actualCost}\\text{ DA}$.`,
				`اختبار المتباينة $C \\leq ${budget}$: نجد $${actualCost} ${realEnough ? '\\leq' : '>'} ${budget}$.`,
				`الاستنتاج: الميزانية ${realEnough ? 'تكفي' : 'لا تكفي'} لتهيئة الحديقة كاملة.`
			];
			finalAnswer = realEnough ? `تكفي (${actualCost} دج)` : `لا تكفي (${actualCost} دج)`;
		}

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `قررت بلدية في منطقة ${region} الجبلية تهيئة حديقة عمومية وفق المعطيات الآتية:`,
			content: [
				{
					type: 'text',
					content: `الجزء الأول (الأعداد النسبية): سُجّلت في الحديقة درجة حرارة صباحية قدرها $${fmtParenSigned(tMorning)}°$، ثم ارتفعت عند الظهيرة بمقدار $(+${tRise})°$، ثم انخفضت ليلاً بمقدار $${tDrop}°$. احسب درجة الحرارة المسجلة ليلاً، ثم احسب الفرق (المسافة) بين درجتي حرارة الظهيرة والصباح.`,
					answer: `الجزء الأول:\n\nدرجة حرارة الظهيرة: $${fmtParenSigned(tMorning)} + (+${tRise}) = ${fmtSigned(tNoon)}°$.\n\nدرجة الحرارة ليلاً: $${fmtParenSigned(tMorning)} + (+${tRise}) - (+${tDrop}) = ${fmtSigned(tNight)}°$.\n\nالفرق بين الظهيرة والصباح: $${fmtParenSigned(tNoon)} - ${fmtParenSigned(tMorning)} = ${tempRange}°$.`,
					mark: '2'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `الجزء الثاني (الهندسة والمساحة): الحديقة مكوّنة من حوض زهور على شكل متوازي أضلاع $A B C D$ ($D C = ${b1}$ م وارتفاعه $h_1 = ${h1}$ م) ومسطح عشب مثلث الشكل $C E F$ قائم في $E$ ($C E = ${b2}$ م و $E F = ${h2}$ م). احسب المساحة الكلية $S$ للحديقة.`,
							answer: `الجزء الثاني:\n\nمساحة $A B C D$: $S_1 = ${b1} times ${h1} = ${areaPara}$ م².\n\nمساحة المثلث $C E F$: $S_2 = frac(${b2} times ${h2}, 2) = ${areaTri}$ م².\n\nالمساحة الكلية: $S = ${areaPara} + ${areaTri} = ${totalArea}$ م².`,
							mark: '3'
						},
						{
							type: 'image',
							src: parkUrl,
							caption: 'مخطط الحديقة الجبلية'
						}
					]
				},
				{
					type: 'text',
					content: `الجزء الثالث (الحساب الحرفي واختبار متباينة ومعادلة): تبلغ كلفة تهيئة المتر المربع الواحد $${unitPrice}$ دج مع مصاريف ثابتة للنقل قدرها $${fixedFee}$ دج، وتتوفر البلدية على ميزانية قدرها $${budget}$ دج. أ) عبّر بدلالة $x$ (المساحة) عن الكلفة الكلية $C$. ب) اختبر صحة المتباينة $${unitPrice} x + ${fixedFee} <= ${budget}$ من أجل $x = ${totalArea}$ وهل تكفي الميزانية؟ ج) خصصت البلدية مبلغ $${treesTotal}$ دج لشراء $${treeCount}$ شجيرات متماثلة، حل المعادلة $${treeCount} y = ${treesTotal}$ لإيجاد ثمن الشجيرة الواحدة.`,
					answer: `الجزء الثالث:\n\nأ) العبارة الحرفية للكلفة: $C = ${unitPrice} x + ${fixedFee}$.\n\nب) بالتعويض بـ $x = ${totalArea}$ نجد $C = ${unitPrice} times ${totalArea} + ${fixedFee} = ${actualCost}$ دج. وبما أن $${actualCost} ${realEnough ? '<=' : '>'} ${budget}$ فإن الميزانية ${realEnough ? 'تكفي' : 'لا تكفي'}.\n\nج) ثمن الشجيرة الواحدة: $y = ${treesTotal} div ${treeCount} = ${treePrice}$ دج.`,
					mark: '3'
				}
			]
		};

		return {
			templateId: this.id,
			seed: cleanSeed,
			grade: '2am',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const TEMPLATES_2AM_T2: ParameterizedTemplate[] = [
	tmpl1SignedNumbersAxisCoords,
	tmpl2AlgebraicSum,
	tmpl3LiteralExpressionsEquations,
	tmpl4TrianglesAnglesArea,
	tmpl5ParallelogramPropertiesArea,
	tmpl6IntegrationSituation
];
