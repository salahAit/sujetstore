import { buildUniqueMcqOptions, SeededRng } from '../../rng';
import { buildIllustratedFigureBlock } from '../../../VisualAssets/illustrations-registry';
import {
	saveSvgAsset,
	svgNumberLine,
	svgRectangle,
	svgShapesStrip
} from '../../svg-helpers';
import type {
	Difficulty,
	GeneratedExerciseInstance,
	ParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';

function createRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const s = Math.trunc(seed) >>> 0;
	const diffCode = difficulty === 'easy' ? 11 : difficulty === 'medium' ? 23 : 37;
	return new SeededRng(((s * 1009 + diffCode * 97 + salt) >>> 0) || 1);
}

/** Formats an integer >= 10000 with space separator for Arabic prose (e.g. 34 752). */
function fmtSpace(n: number): string {
	const clean = Math.trunc(n);
	if (clean < 10000) return String(clean);
	const thousands = Math.floor(clean / 1000);
	const rem = String(clean % 1000).padStart(3, '0');
	return `${thousands} ${rem}`;
}

/** Formats an integer for KaTeX math mode (e.g. 34\,752 for 5-digit numbers). */
function fmtKatex(n: number): string {
	const clean = Math.trunc(n);
	if (clean < 10000) return String(clean);
	const thousands = Math.floor(clean / 1000);
	const rem = String(clean % 1000).padStart(3, '0');
	return `${thousands}\\,${rem}`;
}

/** Ensures inline `$...$` delimiters satisfy marked-katex-extension spacing rules with Arabic punctuation. */
function safeKatex(text: string): string {
	const parts = text.split('$');
	if (parts.length < 3 || parts.length % 2 === 0) return text;
	for (let i = 0; i < parts.length - 1; i += 2) {
		if (parts[i].length > 0 && !/\s$/.test(parts[i])) {
			parts[i] += ' ';
		}
		const next = parts[i + 2];
		if (next.length > 0 && !/^[\s.!?:]/.test(next)) {
			parts[i + 2] = ' ' + next;
		}
	}
	return parts.join('$');
}

function withSafeKatex(tpl: ParameterizedTemplate): ParameterizedTemplate {
	return {
		...tpl,
		generate(seed, difficulty) {
			const inst = tpl.generate(seed, difficulty);
			const q = inst.quizQuestion;
			const qd = { ...q.questionData };
			if (q.type === 'mcq' && Array.isArray(qd.options)) {
				qd.options = qd.options.map((o: any) => ({
					...o,
					text: typeof o.text === 'string' ? safeKatex(o.text) : o.text,
					...(o.diagnosticFeedback ? { diagnosticFeedback: safeKatex(o.diagnosticFeedback) } : {})
				}));
			}
			return {
				...inst,
				quizQuestion: {
					...q,
					questionText: safeKatex(q.questionText),
					...(q.questionTextAr ? { questionTextAr: safeKatex(q.questionTextAr) } : {}),
					explanation: safeKatex(q.explanation),
					questionData: qd
				},
				hints: [safeKatex(inst.hints[0]), safeKatex(inst.hints[1]), safeKatex(inst.hints[2])],
				solutionStepsAr: inst.solutionStepsAr.map(safeKatex)
			};
		}
	};
}

function escapeXml(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

// ---------------------------------------------------------------------------
// Local SVG Helpers (strictly Western digits, explicit viewBox)
// ---------------------------------------------------------------------------

function svgMultPow10Card(a: number, b: number, m: number, p: number): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 130" width="420" height="130" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="408" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="20" y="20" width="180" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
<text x="110" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e40af" direction="rtl">جدول الضرب</text>
<text x="110" y="82" text-anchor="middle" font-size="22" font-weight="bold" fill="#1d4ed8" direction="ltr">${a} x ${b} = ?</text>
<rect x="220" y="20" width="180" height="90" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>
<text x="310" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534" direction="rtl">الضرب في ${p}</text>
<text x="310" y="82" text-anchor="middle" font-size="20" font-weight="bold" fill="#15803d" direction="ltr">${m} x ${p} = ?</text>
</svg>`;
}

function svgVerticalMult(n: number, k: number): string {
	const digits = String(n).split('');
	const w = 260;
	const h = 140;
	const rightX = 196;
	const stepX = 30;
	const parts: string[] = [
		`<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`,
		`<rect x="34" y="18" width="${w - 68}" height="${h - 36}" rx="8" fill="#ffffff" stroke="#475569" stroke-width="1.5"/>`
	];
	digits.forEach((d, idx) => {
		const posFromRight = digits.length - 1 - idx;
		const x = rightX - posFromRight * stepX;
		parts.push(
			`<text x="${x}" y="54" text-anchor="middle" font-size="23" font-weight="bold" fill="#0f172a" direction="ltr">${d}</text>`
		);
	});
	parts.push(
		`<text x="64" y="86" text-anchor="middle" font-size="20" font-weight="bold" fill="#2563eb" direction="ltr">x</text>`,
		`<text x="${rightX}" y="86" text-anchor="middle" font-size="23" font-weight="bold" fill="#2563eb" direction="ltr">${k}</text>`,
		`<line x1="52" y1="96" x2="${rightX + 18}" y2="96" stroke="#0f172a" stroke-width="2.2"/>`,
		`<text x="${rightX - 30}" y="122" text-anchor="middle" font-size="22" font-weight="bold" fill="#dc2626" direction="ltr">?</text>`
	);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Arial,sans-serif">${parts.join('')}</svg>`;
}

function svgBalanceMass(itemName: string, kgVal: number, gVal: number): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 145" width="380" height="145" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="368" height="133" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<line x1="190" y1="24" x2="190" y2="118" stroke="#475569" stroke-width="4"/>
<rect x="142" y="116" width="96" height="10" rx="4" fill="#334155"/>
<line x1="78" y1="42" x2="302" y2="42" stroke="#0f172a" stroke-width="3"/>
<line x1="78" y1="42" x2="78" y2="86" stroke="#64748b" stroke-width="1.5"/>
<line x1="302" y1="42" x2="302" y2="86" stroke="#64748b" stroke-width="1.5"/>
<rect x="40" y="86" width="76" height="9" rx="3" fill="#94a3b8"/>
<rect x="242" y="86" width="120" height="9" rx="3" fill="#94a3b8"/>
<rect x="48" y="48" width="60" height="38" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
<text x="78" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" direction="rtl">${escapeXml(itemName)}</text>
<rect x="246" y="50" width="52" height="36" rx="5" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
<text x="272" y="72" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e40af" direction="ltr">${kgVal} kg</text>
<rect x="304" y="56" width="54" height="30" rx="5" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
<text x="331" y="75" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534" direction="ltr">${gVal} g</text>
</svg>`;
}

function svgCapacityBeakers(lVal: number, clVal: number): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 140" width="340" height="140" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="328" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="46" y="24" width="90" height="92" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
<rect x="49" y="46" width="84" height="67" rx="5" fill="#38bdf8" opacity="0.45"/>
<text x="91" y="84" text-anchor="middle" font-size="16" font-weight="bold" fill="#0c4a6e" direction="ltr">${lVal} L</text>
<text x="170" y="76" text-anchor="middle" font-size="22" font-weight="bold" fill="#0f172a">+</text>
<rect x="204" y="46" width="86" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
<rect x="207" y="64" width="80" height="49" rx="5" fill="#38bdf8" opacity="0.45"/>
<text x="247" y="94" text-anchor="middle" font-size="15" font-weight="bold" fill="#0c4a6e" direction="ltr">${clVal} cL</text>
</svg>`;
}

function svgRhombusAndSquare(): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 145" width="340" height="145" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="328" height="133" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="44" y="28" width="76" height="76" fill="#dcfce7" stroke="#16a34a" stroke-width="2.2"/>
<rect x="44" y="28" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<rect x="110" y="28" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<rect x="44" y="94" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<rect x="110" y="94" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.5"/>
<text x="82" y="126" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d" direction="rtl">الشكل 1</text>
<polygon points="244,22 292,66 244,110 196,66" fill="#fef3c7" stroke="#d97706" stroke-width="2.2"/>
<line x1="216" y1="40" x2="224" y2="48" stroke="#b45309" stroke-width="2"/>
<line x1="264" y1="48" x2="272" y2="40" stroke="#b45309" stroke-width="2"/>
<line x1="216" y1="92" x2="224" y2="84" stroke="#b45309" stroke-width="2"/>
<line x1="264" y1="84" x2="272" y2="92" stroke="#b45309" stroke-width="2"/>
<text x="244" y="126" text-anchor="middle" font-size="13" font-weight="bold" fill="#b45309" direction="rtl">الشكل 2</text>
</svg>`;
}

function svgCircleDiagram(rCm: number): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 175" width="320" height="175" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="308" height="163" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<circle cx="150" cy="88" r="58" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2"/>
<line x1="92" y1="88" x2="208" y2="88" stroke="#dc2626" stroke-width="2.2"/>
<line x1="150" y1="88" x2="150" y2="30" stroke="#16a34a" stroke-width="2.4"/>
<line x1="112" y1="132" x2="188" y2="132" stroke="#d97706" stroke-width="2"/>
<circle cx="150" cy="88" r="3.8" fill="#0f172a"/>
<text x="158" y="103" font-size="13" font-weight="bold" fill="#0f172a" direction="ltr">O</text>
<text x="79" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626" direction="ltr">A</text>
<text x="221" y="92" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626" direction="ltr">B</text>
<text x="150" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d" direction="ltr">M</text>
<text x="172" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d" direction="ltr">${rCm} cm</text>
<text x="102" y="138" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309" direction="ltr">E</text>
<text x="198" y="138" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309" direction="ltr">F</text>
<circle cx="256" cy="56" r="4" fill="#7c3aed"/>
<text x="270" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#7c3aed" direction="ltr">K</text>
</svg>`;
}

function svgPurchaseCard(opts: {
	budget: number;
	line1Label: string;
	line1Price: string;
	line2Label: string;
	line2Price: string;
}): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 155" width="360" height="155" style="background:#ffffff;font-family:Arial,sans-serif">
<rect x="6" y="6" width="348" height="143" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="20" y="18" width="320" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
<text x="180" y="40" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534" direction="rtl">المبلغ المتوفر: ${fmtSpace(opts.budget)} DA</text>
<rect x="20" y="62" width="320" height="36" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.3"/>
<text x="328" y="85" text-anchor="end" font-size="13" font-weight="bold" fill="#1e3a8a" direction="rtl">${escapeXml(opts.line1Label)}</text>
<text x="32" y="85" text-anchor="start" font-size="13" font-weight="bold" fill="#1d4ed8" direction="ltr">${escapeXml(opts.line1Price)}</text>
<rect x="20" y="106" width="320" height="36" rx="8" fill="#fff7ed" stroke="#f97316" stroke-width="1.3"/>
<text x="328" y="129" text-anchor="end" font-size="13" font-weight="bold" fill="#9a3412" direction="rtl">${escapeXml(opts.line2Label)}</text>
<text x="32" y="129" text-anchor="start" font-size="13" font-weight="bold" fill="#c2410c" direction="ltr">${escapeXml(opts.line2Price)}</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 1. Numeric: Numbers to 99,999 — Decompose & Bound (svgNumberLine)
// ---------------------------------------------------------------------------
const tplNumbers99999: ParameterizedTemplate = {
	id: '3ap_t2_numbers_99999_decomp_bound',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_3ap_t2_numbers_to_99999',
	titleAr: 'الأعداد إلى 99 999: التفكيك والحصر والمستقيم المدرج',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 1);

		const dt =
			difficulty === 'easy'
				? rng.int(1, 2)
				: difficulty === 'medium'
					? rng.int(3, 6)
					: rng.int(7, 9);
		const thCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== dt);
		const th = difficulty === 'hard' && cleanSeed % 2 === 0 ? 0 : rng.pick(thCandidates);
		const h = difficulty === 'hard' && cleanSeed % 2 === 1 ? 0 : rng.int(1, 8);
		const tCandidates = [1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x !== h);
		const t = rng.pick(tCandidates);
		const u = rng.int(1, 8);
		const n = dt * 10000 + th * 1000 + h * 100 + t * 10 + u;

		const k0 = Math.floor(n / 1000) * 1000;
		const k1 = k0 + 1000;
		const h0 = Math.floor(n / 100) * 100;
		const h1 = h0 + 100;
		const t0 = Math.floor(n / 10) * 10;
		const t1 = t0 + 10;

		const boundMode: 'thousands' | 'hundreds' | 'tens' =
			difficulty === 'easy'
				? 'thousands'
				: difficulty === 'medium'
					? cleanSeed % 2 === 0
						? 'thousands'
						: 'hundreds'
					: cleanSeed % 2 === 0
						? 'hundreds'
						: 'tens';

		let nlMin: number;
		let nlMax: number;
		let nlStep: number;
		let lowBound: number;
		let highBound: number;
		let boundTitleAr: string;

		if (boundMode === 'thousands') {
			nlMin = Math.min(Math.max(0, k0 - 1000), 95000);
			nlMax = nlMin + 4000;
			nlStep = 1000;
			lowBound = k0;
			highBound = k1;
			boundTitleAr = 'ألفين متتاليين';
		} else if (boundMode === 'hundreds') {
			nlMin = Math.min(Math.max(0, h0 - 100), 99500);
			nlMax = nlMin + 400;
			nlStep = 100;
			lowBound = h0;
			highBound = h1;
			boundTitleAr = 'مئتين متتاليتين';
		} else {
			nlMin = Math.min(Math.max(0, t0 - 10), 99950);
			nlMax = nlMin + 40;
			nlStep = 10;
			lowBound = t0;
			highBound = t1;
			boundTitleAr = 'عشرتين متتاليتين';
		}

		const svg = svgNumberLine({
			min: nlMin,
			max: nlMax,
			step: nlStep,
			subTicks: 2,
			marks: [{ value: n, label: String(n), color: '#dc2626' }]
		});
		const svgPath = saveSvgAsset(`3ap_t2_nl_${difficulty}_s${cleanSeed}`, svg);

		const katexTerms: string[] = [`${dt} \\times 10\\,000`];
		const typstTerms: string[] = [`${dt} times 10000`];
		if (th > 0) {
			katexTerms.push(`${th} \\times 1000`);
			typstTerms.push(`${th} times 1000`);
		}
		if (h > 0) {
			katexTerms.push(`${h} \\times 100`);
			typstTerms.push(`${h} times 100`);
		}
		katexTerms.push(`${t} \\times 10`, `${u}`);
		typstTerms.push(`${t} times 10`, `${u}`);

		const decompKatex = katexTerms.join(' + ');
		const decompTypst = typstTerms.join(' + ');

		const variant = ((cleanSeed % 3) + 3) % 3;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (variant === 0) {
			const correctOpt = `$${fmtKatex(lowBound)} < ${fmtKatex(n)} < ${fmtKatex(highBound)}$`;
			const wrongShiftUp = `$${fmtKatex(highBound)} < ${fmtKatex(n)} < ${fmtKatex(Math.min(99999, highBound + nlStep))}$`;
			const wrongScale =
				boundMode === 'thousands'
					? `$${fmtKatex(h0)} < ${fmtKatex(n)} < ${fmtKatex(h1)}$`
					: `$${fmtKatex(k0)} < ${fmtKatex(n)} < ${fmtKatex(k1)}$`;
			const wrongReversed = `$${fmtKatex(Math.max(0, lowBound - nlStep))} < ${fmtKatex(n)} < ${fmtKatex(lowBound)}$`;

			const built = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: wrongShiftUp,
						diagnosticFeedback: `انظر إلى المستقيم المدرج: العدد $${fmtKatex(n)}$ أصغر من $${fmtKatex(highBound)}$ وليس أكبر منه.`
					},
					{
						text: wrongScale,
						diagnosticFeedback:
							boundMode === 'thousands'
								? 'هذا حصر بين مئتين متتاليتين، بينما المطلوب الحصر بين ألفين متتاليين.'
								: 'هذا حصر بين ألفين متتاليين، اقرأ المطلوب جيدا على المستقيم المدرج.'
					},
					{
						text: wrongReversed,
						diagnosticFeedback: `انتبه إلى موضع العدد $${fmtKatex(n)}$ على المستقيم المدرج: إنه أكبر من $${fmtKatex(lowBound)}$ وليس أصغر منه.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `تأمل المستقيم المدرج المقابل. ما هو الحصر الصحيح للعدد $${fmtKatex(n)}$ بين **${boundTitleAr}**؟`,
				questionTextAr: `تأمل المستقيم المدرج المقابل. ما هو الحصر الصحيح للعدد $${fmtKatex(n)}$ بين **${boundTitleAr}**؟`,
				imageUrl: svgPath,
				imageCaption: `تعليم العدد ${fmtSpace(n)} على المستقيم المدرج`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `على المستقيم المدرج يقع العدد $${fmtKatex(n)}$ مباشرة بين $${fmtKatex(lowBound)}$ و $${fmtKatex(highBound)}$، إذن: $${fmtKatex(lowBound)} < ${fmtKatex(n)} < ${fmtKatex(highBound)}$.`
			};
			finalAnswer = `${lowBound} < ${n} < ${highBound}`;
			hints = [
				`حدد على المستقيم المدرج التدريجتين الكبيرتين اللتين تحيطان بالعدد $${fmtKatex(n)}$.`,
				`لحصر عدد بين ${boundTitleAr} نحتفظ بالمرتبة المطلوبة ونعوض المراتب الأصغر بأصفار لإيجاد الطرف الأصغر.`,
				`نضيف $${fmtKatex(nlStep)}$ إلى $${fmtKatex(lowBound)}$ فنجد الطرف الأكبر $${fmtKatex(highBound)}$.`
			];
			solutionStepsAr = [
				`نلاحظ على المستقيم المدرج أن العدد $${fmtKatex(n)}$ أكبر من $${fmtKatex(lowBound)}$ وأصغر من $${fmtKatex(highBound)}$.`,
				`إذن الحصر الصحيح بين ${boundTitleAr} هو: $${fmtKatex(lowBound)} < ${fmtKatex(n)} < ${fmtKatex(highBound)}$.`
			];
		} else if (variant === 1) {
			const correctOpt = `$${decompKatex}$`;
			const wrongDtAsTh = `$${dt} \\times 1000${th > 0 ? ` + ${th} \\times 100` : ''}${h > 0 ? ` + ${h} \\times 10` : ''} + ${t} \\times 10 + ${u}$`;
			const wrongSwapTensHundreds =
				h > 0
					? `$${dt} \\times 10\\,000${th > 0 ? ` + ${th} \\times 1000` : ''} + ${t} \\times 100 + ${h} \\times 10 + ${u}$`
					: `$${dt} \\times 10\\,000${th > 0 ? ` + ${th} \\times 1000` : ''} + ${t} \\times 100 + ${u}$`;
			const wrongSwapDtTh =
				th > 0
					? `$${th} \\times 10\\,000 + ${dt} \\times 1000${h > 0 ? ` + ${h} \\times 100` : ''} + ${t} \\times 10 + ${u}$`
					: `$${dt} \\times 10\\,000 + ${t} \\times 1000 + ${u}$`;

			const built = buildUniqueMcqOptions(
				correctOpt,
				[
					{
						text: wrongDtAsTh,
						diagnosticFeedback: `الرقم $${dt}$ يقع في مرتبة عشرات الآلاف ($10\\,000$) وليس في الآلاف ($1000$).`
					},
					{
						text: wrongSwapTensHundreds,
						diagnosticFeedback: `انتبه لترتيب المراتب: رقم المئات هو $${h}$ ورقم العشرات هو $${t}$.`
					},
					{
						text: wrongSwapDtTh,
						diagnosticFeedback: `عكست منزلة الآلاف: عشرات الآلاف هي $${dt}$ والآلاف هي $${th}$.`
					}
				],
				rng
			);

			quizQuestion = {
				type: 'mcq',
				questionText: `ما هو **التفكيك النموذجي** الصحيح للعدد $${fmtKatex(n)}$ ؟`,
				questionTextAr: `ما هو **التفكيك النموذجي** الصحيح للعدد $${fmtKatex(n)}$ ؟`,
				imageUrl: svgPath,
				imageCaption: `العدد ${fmtSpace(n)} على المستقيم المدرج`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نقرأ مراتب العدد $${fmtKatex(n)}$ من اليسار إلى اليمين: $${dt}$ عشرات آلاف، $${th}$ آلاف، $${h}$ مئات، $${t}$ عشرات، و $${u}$ وحدات، فيكون التفكيك: $${decompKatex}$.`
			};
			finalAnswer = decompKatex;
			hints = [
				'استعن بجدول المراتب: عشرات الآلاف، الآلاف، المئات، العشرات، الوحدات.',
				`الرقم الأيسر $${dt}$ في عشرات الآلاف يضرب في $10\\,000$.`,
				`أكمل ضرب كل رقم غير معدوم في قيمة مرتبته: $${decompKatex}$.`
			];
			solutionStepsAr = [
				`نحدد قيمة كل رقم في العدد $${fmtKatex(n)}$: عشرات الآلاف ($${dt}$)، الآلاف ($${th}$)، المئات ($${h}$)، العشرات ($${t}$)، الوحدات ($${u}$).`,
				`التفكيك النموذجي هو: $${decompKatex}$.`
			];
		} else {
			const askHundredsCount = difficulty === 'hard';
			const expectedCount = askHundredsCount ? Math.floor(n / 100) : Math.floor(n / 1000);
			const rankLabel = askHundredsCount ? 'عدد المئات' : 'عدد الآلاف';
			const questionText = `تأمل العدد $${fmtKatex(n)}$ الممثل على المستقيم المدرج. ما هو **${rankLabel}** في هذا العدد؟`;

			quizQuestion = {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `العدد ${fmtSpace(n)}`,
				questionData: {
					answer: expectedCount,
					displayTemplate: `${rankLabel} في ${fmtSpace(n)} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نميز بين رقم المرتبة وعدد المرتبة: لإيجاد **${rankLabel}** في $${fmtKatex(n)}$ نأخذ كل الأرقام بدءا من خانة ${askHundredsCount ? 'المئات' : 'الآلاف'} نحو اليسار، فنجد $${expectedCount}$.`
			};
			finalAnswer = String(expectedCount);
			hints = [
				'ميز بين رقم المرتبة (رقم الخانة وحدها) وعدد المرتبة (كل الوحدات من تلك المرتبة).',
				`لإيجاد ${rankLabel}، نغطي الأرقام التي تقع على يمين خانة ${askHundredsCount ? 'المئات' : 'الآلاف'}.`,
				`نجد أن ${rankLabel} في $${fmtKatex(n)}$ هو $${expectedCount}$.`
			];
			solutionStepsAr = [
				`في العدد $${fmtKatex(n)}$، نحدد خانة ${askHundredsCount ? 'المئات' : 'الآلاف'} ثم نقرأ العدد كاملا من تلك الخانة إلى اليسار.`,
				`إذن ${rankLabel} هو $${expectedCount}$.`
			];
		}

		const thousandsCount = Math.floor(n / 1000);
		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'تأمل المستقيم المدرج والعدد الممثل عليه، ثم أجب عن المطلوب:',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) اكتب التفكيك النموذجي للعدد $${n}$، ثم حدد عدد آلافه.`,
							answer: `1) التفكيك النموذجي: $${n} = ${decompTypst}$. وعدد الآلاف هو $${thousandsCount}$.`,
							mark: '0.75'
						},
						{
							type: 'image',
							src: svgPath,
							caption: `المستقيم المدرج للعدد ${fmtSpace(n)}`
						}
					]
				},
				{
					type: 'text',
					content: `2) احصر العدد $${n}$ بين ${boundTitleAr} باستعمال المستقيم المدرج.`,
					answer: `2) الحصر: $${lowBound} < ${n} < ${highBound}$.`,
					mark: '0.75'
				}
			]
		};

		return {
			templateId: '3ap_t2_numbers_99999_decomp_bound',
			seed: cleanSeed,
			grade: '3ap',
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
// 2. Numeric: Multiplication Tables 2..9 & × 10, 100, 1000 (< 100,000)
// ---------------------------------------------------------------------------
const tplMultTablesPowers10: ParameterizedTemplate = {
	id: '3ap_t2_mult_tables_powers_10',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_3ap_t2_multiplication_tables_powers_10',
	titleAr: 'جداول الضرب من 2 إلى 9 والضرب في 10 و100 و1000',
	defaultPoints: 1,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 2);

		const a = difficulty === 'easy' ? rng.int(2, 5) : rng.int(6, 9);
		const b = difficulty === 'hard' ? rng.int(6, 9) : rng.int(3, 9);
		const prodTable = a * b;

		const a2 = difficulty === 'easy' ? rng.int(2, 5) : rng.int(5, 9);
		const b2 = rng.int(4, 9);
		const prodTable2 = a2 * b2;

		const powers = [10, 100, 1000] as const;
		const p1 = difficulty === 'easy' ? rng.pick([10, 100] as const) : rng.pick(powers);
		const p2 = p1 === 1000 ? 100 : p1 === 100 ? (difficulty === 'easy' ? 10 : 1000) : 100;

		const pickMultForPower = (p: 10 | 100 | 1000): number => {
			if (p === 10) {
				if (difficulty === 'easy') return rng.int(12, 89);
				if (difficulty === 'medium') return rng.int(105, 890);
				return rng.int(120, 9450);
			}
			if (p === 100) {
				if (difficulty === 'easy') return rng.int(3, 9);
				if (difficulty === 'medium') return rng.int(12, 89);
				return rng.int(105, 945);
			}
			// p === 1000
			if (difficulty === 'easy') return rng.int(2, 9);
			if (difficulty === 'medium') return rng.int(12, 48);
			return rng.int(15, 96);
		};

		const m1 = pickMultForPower(p1);
		const m2 = pickMultForPower(p2);
		const prodPow1 = m1 * p1;
		const prodPow2 = m2 * p2;

		const svg = svgMultPow10Card(a, b, m1, p1);
		const svgPath = saveSvgAsset(`3ap_t2_mult10_${difficulty}_s${cleanSeed}`, svg);

		const variant = ((cleanSeed % 3) + 3) % 3;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (variant === 0) {
			const wrongZeroLess = m1 * (p1 === 10 ? 1 : p1 / 10);
			const wrongZeroMore = m1 * (p1 * 10) < 100000 ? m1 * p1 * 10 : m1 * p1 - 10;
			const wrongAdded = m1 + p1;

			const built = buildUniqueMcqOptions(
				`$${fmtKatex(prodPow1)}$`,
				[
					{
						text: `$${fmtKatex(wrongZeroLess)}$`,
						diagnosticFeedback: `راجع عدد الأصفار! عند الضرب في $${p1}$ نضيف $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار على يمين العدد.`
					},
					{
						text: `$${fmtKatex(wrongZeroMore)}$`,
						diagnosticFeedback: `أضفت عددا زائدا من الأصفار؛ تذكر أن العدد $${p1}$ يحتوي على $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار فقط.`
					},
					{
						text: `$${fmtKatex(wrongAdded)}$`,
						diagnosticFeedback: `لقد جمعت ($+$) بدل الضرب ($\\times$)!`
					}
				],
				rng
			);

			const qText = `احسب ذهنيا الجداء التالي: $${fmtKatex(m1)} \\times ${p1}$`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'الضرب في 10 و 100 و 1000',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `عند الضرب في $${p1}$ نكتب العدد $${fmtKatex(m1)}$ ونضيف ${p1 === 10 ? 'صفرا واحدا' : p1 === 100 ? 'صفرين' : 'ثلاثة أصفار'} على يمينه، فنحصل على $${fmtKatex(prodPow1)}$.`
			};
			finalAnswer = String(prodPow1);
			hints = [
				`تذكر قاعدة الأصفار عند الضرب في $10$ و $100$ و $1000$.`,
				`العدد $${p1}$ فيه $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار.`,
				`اكتب $${fmtKatex(m1)}$ وأضف على يمينه $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار.`
			];
			solutionStepsAr = [
				`عند ضرب عدد طبيعي في $${p1}$ نحرك كل مرتبة ونضيف $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار على اليمين.`,
				`إذن: $${fmtKatex(m1)} \\times ${p1} = ${fmtKatex(prodPow1)}$.`
			];
		} else if (variant === 1) {
			const isMissingFactor = difficulty === 'hard';
			const expectedVal = isMissingFactor ? b : prodTable;
			const qText = isMissingFactor
				? `أكمل المساواة الضربية باستعمال جداول الضرب: $${a} \\times \\dots = ${prodTable}$`
				: `احسب الجداء باستعمال جداول الضرب: $${a} \\times ${b}$`;

			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: 'جداول الضرب من 2 إلى 9',
				questionData: {
					answer: expectedVal,
					displayTemplate: isMissingFactor ? `${a} × ? = ${prodTable}` : `${a} × ${b} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `من جدول ضرب $${a}$ نجد أن $${a} \\times ${b} = ${prodTable}$.`
			};
			finalAnswer = String(expectedVal);
			hints = [
				`استحضر جدول ضرب العدد $${a}$.`,
				isMissingFactor
					? `ابحث عن العدد الذي إذا ضربناه في $${a}$ نحصل على $${prodTable}$.`
					: `الضرب يختصر جمع العدد $${b}$ مكررا $${a}$ مرات.`,
				`$${a} \\times ${b} = ${prodTable}$.`
			];
			solutionStepsAr = [
				`نستعمل جدول ضرب العدد $${a}$.`,
				`$${a} \\times ${b} = ${prodTable}$، إذن الجواب هو $${expectedVal}$.`
			];
		} else {
			const qText = `احسب ذهنيا ناتج العملية: $${fmtKatex(m1)} \\times ${p1}$`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				questionData: {
					answer: prodPow1,
					displayTemplate: `${m1} × ${p1} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نكتب $${fmtKatex(m1)}$ ثم نضيف $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار على اليمين: $${fmtKatex(m1)} \\times ${p1} = ${fmtKatex(prodPow1)}$.`
			};
			finalAnswer = String(prodPow1);
			hints = [
				`لا نحتاج إلى وضع عملية عمودية للضرب في $${p1}$.`,
				`عُدّ أصفار العدد $${p1}$: إنها $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار.`,
				`أضف هذه الأصفار على يمين العدد $${fmtKatex(m1)}$.`
			];
			solutionStepsAr = [
				`نكتب العدد $${fmtKatex(m1)}$ كما هو.`,
				`نضيف $${p1 === 10 ? 1 : p1 === 100 ? 2 : 3}$ أصفار على يمينه فنحصل على $${fmtKatex(prodPow1)}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 1,
			instruction: 'احسب ذهنيا وأكمل الجدول التالي:',
			content: [
				{
					type: 'table',
					headers: ['العملية', 'النتيجة'],
					cells: [],
					rows: [
						[
							{ content: `$${a} times ${b}$`, bold: true },
							{ content: '.....', answer: `$${prodTable}$`, mark: '0.25' }
						],
						[
							{
								content:
									difficulty === 'hard'
										? `$${a2} times$ ..... $= ${prodTable2}$`
										: `$${a2} times ${b2}$`,
								bold: true
							},
							{
								content: '.....',
								answer: difficulty === 'hard' ? `$${b2}$` : `$${prodTable2}$`,
								mark: '0.25'
							}
						],
						[
							{ content: `$${m1} times ${p1}$`, bold: true },
							{ content: '.....', answer: `$${prodPow1}$`, mark: '0.25' }
						],
						[
							{ content: `$${m2} times ${p2}$`, bold: true },
							{ content: '.....', answer: `$${prodPow2}$`, mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				}
			]
		};

		return {
			templateId: '3ap_t2_mult_tables_powers_10',
			seed: cleanSeed,
			grade: '3ap',
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
// 3. Numeric: Vertical Multiplication by 1-digit & Distributive Property
// ---------------------------------------------------------------------------
const tplVerticalMult1Digit: ParameterizedTemplate = {
	id: '3ap_t2_vertical_mult_1digit',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'numeric',
	curriculumLessonId: 'lesson_3ap_t2_vertical_multiplication_1digit',
	titleAr: 'الضرب العمودي في عدد مكون من رقم واحد وخاصية التوزيع',
	defaultPoints: 1.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 3);

		let n: number;
		let k: number;

		if (difficulty === 'easy') {
			k = rng.int(2, 5);
			const u = rng.int(Math.ceil(10 / k), 9); // ensures ones carry
			const t = rng.int(1, 3);
			const h = rng.int(1, 4);
			n = h * 100 + t * 10 + u;
		} else if (difficulty === 'medium') {
			k = rng.int(3, 7);
			const u = rng.int(Math.ceil(10 / k), 9);
			const t = rng.int(2, 8);
			const h = rng.int(2, 8);
			n = h * 100 + t * 10 + u;
		} else {
			k = rng.int(6, 9);
			const u = rng.int(3, 9);
			const t = rng.int(2, 9);
			const h = rng.int(2, 9);
			const th = rng.int(1, 8);
			n = th * 1000 + h * 100 + t * 10 + u;
		}

		const prod = n * k;

		// Smaller pair for distributive property
		const dT = rng.int(2, 8);
		const dU = rng.int(2, 9);
		const dNum = dT * 10 + dU;
		const dMul = difficulty === 'easy' ? rng.int(2, 4) : rng.int(3, 7);
		const dPart1 = dT * 10 * dMul;
		const dPart2 = dU * dMul;
		const dProd = dNum * dMul;

		// Step-by-step carries for explanation & solution
		const digitsAsc = String(n)
			.split('')
			.reverse()
			.map((ch) => Number(ch));
		let carry = 0;
		const stepStringsKatex: string[] = [];
		const rankNames = ['الوحدات', 'العشرات', 'المئات', 'الآلاف'];
		digitsAsc.forEach((dig, idx) => {
			const raw = dig * k + carry;
			const writeDig = raw % 10;
			const nextCarry = Math.floor(raw / 10);
			const rank = rankNames[idx] || `المرتبة ${idx + 1}`;
			if (idx < digitsAsc.length - 1) {
				stepStringsKatex.push(
					`${rank}: $${k} \\times ${dig}${carry > 0 ? ` + ${carry}` : ''} = ${raw}$ (نكتب $${writeDig}$ ونحتفظ بـ $${nextCarry}$)`
				);
			} else {
				stepStringsKatex.push(
					`${rank}: $${k} \\times ${dig}${carry > 0 ? ` + ${carry}` : ''} = ${raw}$`
				);
			}
			carry = nextCarry;
		});

		const svg = svgVerticalMult(n, k);
		const svgPath = saveSvgAsset(`3ap_t2_vmult_${difficulty}_s${cleanSeed}`, svg);

		const variant = cleanSeed % 2;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (variant === 0) {
			const qText = `أنجز عملية الضرب العمودي الموضحة في الصورة: $${fmtKatex(n)} \\times ${k}$`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `الضرب العمودي: ${n} × ${k}`,
				questionData: {
					answer: prod,
					displayTemplate: `${n} × ${k} = ?`,
					variables: [],
					tolerance: 0
				},
				explanation: `نضرب من اليمين إلى اليسار مع الاحتفاظ: ${stepStringsKatex.join('، ثم ')}. النتيجة: $${fmtKatex(prod)}$.`
			};
			finalAnswer = String(prod);
			hints = [
				`ابدأ الضرب من خانة الوحدات (اليمين) نحو اليسار: $${k} \\times ${digitsAsc[0]} = ${k * digitsAsc[0]}$.`,
				'تذكر: ننفذ الضرب أولا ثم نضيف رقم الاحتفاظ بعد الضرب.',
				`تحقق من ناتج المراتب خطوة بخطوة: ${stepStringsKatex[0]}.`
			];
			solutionStepsAr = stepStringsKatex.concat([`النتيجة النهائية: $${fmtKatex(n)} \\times ${k} = ${fmtKatex(prod)}$.`]);
		} else {
			const onesCarry = Math.floor((digitsAsc[0] * k) / 10);
			const forgotOnesCarry = prod - onesCarry * 10;
			const addCarryBeforeMult = prod + (k - 1) * onesCarry * 10;
			const offBy100 = prod >= 200 ? prod - 100 : prod + 100;

			const built = buildUniqueMcqOptions(
				`$${fmtKatex(prod)}$`,
				[
					{
						text: `$${fmtKatex(forgotOnesCarry)}$`,
						diagnosticFeedback: `نسيت إضافة الاحتفاظ ($${onesCarry}$) عند ضرب رقم العشرات!`
					},
					{
						text: `$${fmtKatex(addCarryBeforeMult)}$`,
						diagnosticFeedback: 'أخطأت بإضافة الاحتفاظ قبل الضرب؛ القاعدة هي أن نضرب أولا ثم نضيف الاحتفاظ.'
					},
					{
						text: `$${fmtKatex(offBy100)}$`,
						diagnosticFeedback: 'راجع ضرب المئات وإضافة الاحتفاظ بدقة.'
					}
				],
				rng
			);

			const qText = `تأمل عملية الضرب العمودي في الصورة. ما هو الناتج الصحيح للعملية $${fmtKatex(n)} \\times ${k}$ ؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgPath,
				imageCaption: `الضرب العمودي: ${n} × ${k}`,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `${stepStringsKatex.join('، ثم ')}. إذن النتيجة الصحيحة هي $${fmtKatex(prod)}$.`
			};
			finalAnswer = String(prod);
			hints = [
				`نبدأ بضرب رقم الوحدات: $${k} \\times ${digitsAsc[0]} = ${k * digitsAsc[0]}$.`,
				'نضرب الرقم في المرتبة التالية أولا، ثم نضيف إليه رقم الاحتفاظ.',
				`راجع كل مرتبة من اليمين إلى اليسار للحصول على $${fmtKatex(prod)}$.`
			];
			solutionStepsAr = stepStringsKatex.concat([`إذن: $${fmtKatex(n)} \\times ${k} = ${fmtKatex(prod)}$.`]);
		}

		const sujetExercise: ExerciseBlock = {
			points: 1.5,
			instruction: 'أنجز العمليات التالية باحترام المراتب والاحتفاظ:',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) ضع ثم أنجز عموديا العملية: $${n} times ${k}$.`,
							answer: `1) ناتج الضرب العمودي:\n$ ${n} times ${k} = ${prod} $`,
							mark: '1'
						},
						{
							type: 'image',
							src: svgPath,
							caption: 'عملية الضرب العمودي'
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب باستعمال خاصية توزيع الضرب على الجمع: $${dNum} times ${dMul}$.`,
					answer: `2) $${dNum} times ${dMul} = (${dT * 10} times ${dMul}) + (${dU} times ${dMul}) = ${dPart1} + ${dPart2} = ${dProd}$.`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '3ap_t2_vertical_mult_1digit',
			seed: cleanSeed,
			grade: '3ap',
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
// 4. Measurement: Mass (kg/g) & Capacity (L/cL) Conversions
// ---------------------------------------------------------------------------
const tplMassCapacity: ParameterizedTemplate = {
	id: '3ap_t2_mass_capacity_conversions',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'measurement',
	curriculumLessonId: 'lesson_3ap_t2_mass_and_capacity',
	titleAr: 'قياس الكتل (kg، g) والسعات (L، cL) والتحويل والمقارنة',
	defaultPoints: 1,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 4);

		const kg =
			difficulty === 'easy'
				? rng.int(1, 5)
				: difficulty === 'medium'
					? rng.int(2, 9)
					: rng.int(10, 38);
		const gPool =
			difficulty === 'easy'
				? [200, 250, 300, 400, 500, 750]
				: difficulty === 'medium'
					? [50, 80, 125, 250, 350, 650, 805]
					: [5, 8, 25, 40, 75, 105, 305, 850];
		const g = rng.pick(gPool);
		const totalG = kg * 1000 + g;

		const lVal =
			difficulty === 'easy'
				? rng.int(1, 6)
				: difficulty === 'medium'
					? rng.int(3, 12)
					: rng.int(12, 35);
		const clPool =
			difficulty === 'easy'
				? [10, 20, 25, 30, 50, 75]
				: difficulty === 'medium'
					? [5, 8, 15, 35, 45, 60, 85]
					: [4, 7, 9, 15, 40, 85];
		const clVal = rng.pick(clPool);
		const totalCl = lVal * 100 + clVal;

		// Extra conversion & comparison values for SujetBuilder table
		const kg2 = rng.int(2, 8);
		const g2 = rng.pick([150, 300, 450, 600, 750]);
		const totalG2 = kg2 * 1000 + g2;

		const cmpKg = rng.int(2, 6);
		const cmpG = rng.pick([300, 400, 500]);
		const cmpLeftTotalG = cmpKg * 1000 + cmpG;
		const cmpRightG = cleanSeed % 2 === 0 ? cmpKg * 1000 + cmpG - 250 : cmpKg * 1000 + cmpG + 350;
		const cmpSymbol = cmpLeftTotalG > cmpRightG ? '>' : '<';

		const itemName = rng.pick(['كيس تمر', 'سلة برتقال', 'إناء فخاري', 'علبة عسل']);
		const svgMassPath = saveSvgAsset(
			`3ap_t2_mass_${difficulty}_s${cleanSeed}`,
			svgBalanceMass(itemName, kg, g)
		);
		const svgCapPath = saveSvgAsset(
			`3ap_t2_cap_${difficulty}_s${cleanSeed}`,
			svgCapacityBeakers(lVal, clVal)
		);

		const variant = ((cleanSeed % 3) + 3) % 3;
		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let activeSvgPath = svgMassPath;
		let activeSvgCaption = `توازن الميزان: ${kg} kg و ${g} g`;

		if (variant === 0) {
			const qText = `انظر إلى الميزان المتوازن المقابل. ما هي كتلة الـ${itemName} بالغرام ($\\text{g}$)؟`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgMassPath,
				imageCaption: activeSvgCaption,
				questionData: {
					answer: totalG,
					displayTemplate: `${kg} kg ${g} g = ? g`,
					variables: [],
					tolerance: 0
				},
				explanation: `نحول الكيلوغرام إلى الغرام: $${kg}\\text{ kg} = ${fmtKatex(kg * 1000)}\\text{ g}$، ثم نضيف $${g}\\text{ g}$ فنحصل على $${fmtKatex(totalG)}\\text{ g}$.`
			};
			finalAnswer = `${totalG} g`;
			hints = [
				`تذكر العلاقة الأساسية في قياس الكتل: $1\\text{ kg} = 1000\\text{ g}$.`,
				`حول أولا $${kg}\\text{ kg}$ إلى الغرام بضرب $${kg}$ في $1000$.`,
				`اجمع الناتج ($${fmtKatex(kg * 1000)}\\text{ g}$) مع $${g}\\text{ g}$.`
			];
			solutionStepsAr = [
				`تحويل الكيلوغرام إلى الغرام: $${kg}\\text{ kg} = ${fmtKatex(kg * 1000)}\\text{ g}$.`,
				`الكتلة الكلية بالغرام: $${fmtKatex(kg * 1000)} + ${g} = ${fmtKatex(totalG)}\\text{ g}$.`
			];
		} else if (variant === 1) {
			activeSvgPath = svgCapPath;
			activeSvgCaption = `سعة السائل: ${lVal} L و ${clVal} cL`;
			const wrong1000 = lVal * 1000 + clVal;
			const wrong10 = lVal * 10 + clVal;
			const wrongZeroPad = clVal < 10 ? lVal * 100 + clVal * 10 : lVal + clVal;

			const built = buildUniqueMcqOptions(
				`$${totalCl}\\text{ cL}$`,
				[
					{
						text: `$${fmtKatex(wrong1000)}\\text{ cL}$`,
						diagnosticFeedback: `انتبه! اللتر يساوي $100\\text{ cL}$ (صفران فقط) وليس $1000\\text{ cL}$.`
					},
					{
						text: `$${wrong10}\\text{ cL}$`,
						diagnosticFeedback: `للتحويل من اللتر إلى السنتيلتر نضرب في $100$ وليس في $10$.`
					},
					{
						text: `$${wrongZeroPad}\\text{ cL}$`,
						diagnosticFeedback: `راجع منزلة المئات والعشرات عند التحويل: $${lVal}\\text{ L} = ${lVal * 100}\\text{ cL}$، ثم نضيف $${clVal}\\text{ cL}$.`
					}
				],
				rng
			);

			const qText = `لاحظ الأوعية المدرجة في الصورة. ما هي السعة الكلية للسائل بالسنتيلتر ($\\text{cL}$)؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgCapPath,
				imageCaption: activeSvgCaption,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `بما أن $1\\text{ L} = 100\\text{ cL}$ فإن $${lVal}\\text{ L} = ${lVal * 100}\\text{ cL}$، وبإضافة $${clVal}\\text{ cL}$ نحصل على $${totalCl}\\text{ cL}$.`
			};
			finalAnswer = `${totalCl} cL`;
			hints = [
				`تذكر العلاقة الأساسية في قياس السعات: $1\\text{ L} = 100\\text{ cL}$.`,
				`حول $${lVal}\\text{ L}$ إلى السنتيلتر: $${lVal} \\times 100 = ${lVal * 100}\\text{ cL}$.`,
				`أضف $${clVal}\\text{ cL}$ إلى $${lVal * 100}\\text{ cL}$.`
			];
			solutionStepsAr = [
				`تحويل اللتر إلى السنتيلتر: $${lVal}\\text{ L} = ${lVal * 100}\\text{ cL}$.`,
				`السعة الكلية: $${lVal * 100} + ${clVal} = ${totalCl}\\text{ cL}$.`
			];
		} else {
			activeSvgPath = svgCapPath;
			activeSvgCaption = `سعة الوعاء: ${lVal} L ${clVal} cL`;
			const addCl = rng.pick([25, 45, 75, 120]);
			const sumCl = totalCl + addCl;
			const wrongForget100 = lVal * 1000 + clVal + addCl;
			const wrongIgnoreL = clVal + addCl;
			const wrongSub = totalCl - addCl !== wrongIgnoreL ? Math.abs(totalCl - addCl) : sumCl + 100;

			const built = buildUniqueMcqOptions(
				`$${sumCl}\\text{ cL}$`,
				[
					{
						text: `$${fmtKatex(wrongForget100)}\\text{ cL}$`,
						diagnosticFeedback: `تذكر أن $1\\text{ L} = 100\\text{ cL}$ وليس $1000\\text{ cL}$.`
					},
					{
						text: `$${wrongIgnoreL}\\text{ cL}$`,
						diagnosticFeedback: `نسيت إضافة سعة اللترات ($${lVal}\\text{ L} = ${lVal * 100}\\text{ cL}$) قبل الجمع.`
					},
					{
						text: `$${wrongSub}\\text{ cL}$`,
						diagnosticFeedback: `المطلوب حساب مجموع السعتين (عملية الجمع) وليس الفرق بينهما.`
					}
				],
				rng
			);

			const qText = `في إناء سعة $${lVal}\\text{ L } ${clVal}\\text{ cL}$ من العصير، أفرغنا فيه كوبا سعته $${addCl}\\text{ cL}$. ما السعة الكلية بالعصير بـ $\\text{cL}$؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgCapPath,
				imageCaption: activeSvgCaption,
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: `نوحد الوحدة إلى $\\text{cL}$: $${lVal}\\text{ L } ${clVal}\\text{ cL} = ${totalCl}\\text{ cL}$، ثم نجمع: $${totalCl} + ${addCl} = ${sumCl}\\text{ cL}$.`
			};
			finalAnswer = `${sumCl} cL`;
			hints = [
				'قبل جمع سعتين، يجب تحويلهما إلى نفس الوحدة ($\\text{cL}$).',
				`حول $${lVal}\\text{ L } ${clVal}\\text{ cL}$ إلى $${totalCl}\\text{ cL}$.`,
				`اجمع $${totalCl} + ${addCl}$.`
			];
			solutionStepsAr = [
				`التحويل إلى السنتيلتر: $${lVal}\\text{ L } ${clVal}\\text{ cL} = ${totalCl}\\text{ cL}$.`,
				`حساب المجموع: $${totalCl} + ${addCl} = ${sumCl}\\text{ cL}$.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 1,
			instruction: 'لاحظ المقادير التالية وأكمل التحويلات والمقارنة:',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) أكمل الفراغات في الجدول بالوحدة المناسبة:`,
							answer: `1) راجع التحويلات المكتملة باللون الأزرق في الجدول أدناه.`,
							mark: '0.75'
						},
						{
							type: 'image',
							src: activeSvgPath,
							caption: activeSvgCaption
						}
					]
				},
				{
					type: 'table',
					headers: ['المقدار الأول', 'التحويل إلى الوحدة الصغرى'],
					cells: [],
					rows: [
						[
							{ content: `$${kg}$ kg $${g}$ g`, bold: true },
							{ content: '..... g', answer: `$${totalG}$ g`, mark: '0.25' }
						],
						[
							{ content: `$${lVal}$ L $${clVal}$ cL`, bold: true },
							{ content: '..... cL', answer: `$${totalCl}$ cL`, mark: '0.25' }
						],
						[
							{ content: `$${totalG2}$ g`, bold: true },
							{ content: '..... kg ..... g', answer: `$${kg2}$ kg $${g2}$ g`, mark: '0.25' }
						]
					],
					align: 'center',
					borders: 'grid',
					headerBackground: true,
					width: 'full'
				},
				{
					type: 'text',
					content: `2) قارن باستعمال أحد الرموز ($<$ أو $>$ أو $=$): $${cmpKg}$ kg $${cmpG}$ g  .....  $${cmpRightG}$ g.`,
					answer: `2) نحول إلى الغرام: $${cmpLeftTotalG} ${cmpSymbol} ${cmpRightG}$، إذن $${cmpKg}$ kg $${cmpG}$ g $${cmpSymbol}$ $${cmpRightG}$ g.`,
					mark: '0.25'
				},
				buildIllustratedFigureBlock(
					variant === 0 ? 'pri_math_07_measuring_vessels_liter' : 'pri_math_04_two_pan_balance',
					{
						maxHeight: 112,
						width: '58%',
						mode: 'image_only',
						title:
							variant === 0
								? 'الأَوَانِي المُدَرَّجَةُ لِقِيَاسِ السِّعَاتِ (1 L = 100 cL)'
								: 'المِيزَانُ ذُو الكِفَّتَيْنِ لِقِيَاسِ الكُتَلِ (1 kg = 1000 g)'
					}
				)
			]
		};

		return {
			templateId: '3ap_t2_mass_capacity_conversions',
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'measurement',
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
// 5. Geometry: Polygons (Square / Rectangle / Rhombus) & Circle
// ---------------------------------------------------------------------------
const tplPolygonsAndCircle: ParameterizedTemplate = {
	id: '3ap_t2_polygons_and_circle',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'geometry',
	curriculumLessonId: 'lesson_3ap_t2_polygons_familiar_shapes',
	titleAr: 'المضلعات المألوفة (المربع، المستطيل، المعين) والدائرة',
	defaultPoints: 1,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 5);

		const variant = ((cleanSeed % 3) + 3) % 3;

		if (variant === 0) {
			// Variant 0: svgShapesStrip (Polygons vs Circle + Square/Rectangle/Triangle)
			const baseShapes: ('square' | 'rectangle' | 'triangle' | 'circle')[] = rng.shuffle([
				'square',
				'rectangle',
				'triangle',
				'circle'
			]);
			const labels = ['1', '2', '3', '4'];
			const circleIdx = baseShapes.indexOf('circle');
			const squareIdx = baseShapes.indexOf('square');
			const rectIdx = baseShapes.indexOf('rectangle');
			const triIdx = baseShapes.indexOf('triangle');

			const askTarget: 'non_polygon' | 'square' | 'rectangle' =
				difficulty === 'easy'
					? 'non_polygon'
					: difficulty === 'medium'
						? cleanSeed % 2 === 0
							? 'square'
							: 'non_polygon'
						: 'rectangle';

			const targetIdx =
				askTarget === 'non_polygon'
					? circleIdx
					: askTarget === 'square'
						? squareIdx
						: rectIdx;

			const svg = svgShapesStrip({
				shapes: baseShapes,
				labels
			});
			const svgPath = saveSvgAsset(`3ap_t2_strip_${difficulty}_s${cleanSeed}`, svg);

			const shapeArabicName = (s: 'square' | 'rectangle' | 'triangle' | 'circle') =>
				s === 'square'
					? 'مربع'
					: s === 'rectangle'
						? 'مستطيل'
						: s === 'triangle'
							? 'مثلث'
							: 'دائرة';

			const built = buildUniqueMcqOptions(
				`الشكل $${labels[targetIdx]}$`,
				[0, 1, 2, 3]
					.filter((i) => i !== targetIdx)
					.map((i) => ({
						text: `الشكل $${labels[i]}$`,
						diagnosticFeedback:
							askTarget === 'non_polygon'
								? `الشكل $${labels[i]}$ هو ${shapeArabicName(baseShapes[i])}؛ جميع حدوده قطع مستقيمة فهو مضلع.`
								: `الشكل $${labels[i]}$ يمثل ${shapeArabicName(baseShapes[i])} وليس الشكل المطلوب.`
					})),
				rng
			);

			const qText =
				askTarget === 'non_polygon'
					? 'تأمل الأشكال المرقمة من $1$ إلى $4$ في الصورة. أي شكل منها **ليس مضلعا**؟'
					: askTarget === 'square'
						? 'تأمل الأشكال المرقمة في الصورة. أي شكل يمثل **المربع** (4 أضلاع متقايسة و 4 زوايا قائمة)؟'
						: 'تأمل الأشكال المرقمة في الصورة. أي شكل يمثل **المستطيل** (كل ضلعين متقابلين متقايسان و 4 زوايا قائمة)؟';

			const explanation =
				askTarget === 'non_polygon'
					? `الشكل $${labels[circleIdx]}$ هو الدائرة، وهو ليس مضلعا لأن حافته منحنية وليست قطعا مستقيمة.`
					: askTarget === 'square'
						? `الشكل $${labels[squareIdx]}$ هو المربع لأن أضلاعه الأربعة متقايسة وزواياه الأربع قائمة.`
						: `الشكل $${labels[rectIdx]}$ هو المستطيل لأن له 4 زوايا قائمة وكل ضلعين متقابلين فيه متقايسان.`;

			const sujetExercise: ExerciseBlock = {
				points: 1,
				instruction: 'لاحظ الأشكال الهندسية المرفقة ثم أجب:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اذكر رقم الشكل الذي لا يمثل مضلعا مع التعليل، ثم سمّ الأشكال الأخرى.`,
								answer: `1) الشكل الذي ليس مضلعا هو الشكل $${labels[circleIdx]}$ (دائرة لأن حافته منحنية). الشكل $${labels[squareIdx]}$ مربع، والشكل $${labels[rectIdx]}$ مستطيل، والشكل $${labels[triIdx]}$ مثلث.`,
								mark: '0.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'المضلعات والأشكال المألوفة'
							}
						]
					},
					{
						type: 'true_false',
						items: [
							{
								q: 'للمربع و للمعين 4 أضلاع متقايسة، ويمتاز المربع بـ 4 زوايا قائمة.',
								a: 'صحيح',
								c: 'العبارة صحيحة.',
								mark: '0.25'
							},
							{
								q: 'المعين له 4 زوايا قائمة نتحقق منها بالكوس.',
								a: 'خطأ',
								c: 'المعين المألوف ليس له زوايا قائمة، أما المربع والمستطيل فلهما 4 زوايا قائمة.',
								mark: '0.25'
							}
						]
					}
				]
			};

			return {
				templateId: '3ap_t2_polygons_and_circle',
				seed: cleanSeed,
				grade: '3ap',
				trimesterId: 't2',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: svgPath,
					imageCaption: 'الأشكال المرقمة من 1 إلى 4',
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation
				},
				sujetExercise,
				hints: [
					'المضلع هو شكل مغلق جميع حدوده قطع مستقيمة.',
					'للمربع 4 أضلاع متقايسة و 4 زوايا قائمة، وللمستطيل كل ضلعين متقابلين متقايسان و 4 زوايا قائمة.',
					`راجع الشكل رقم $${labels[targetIdx]}$ في الصورة.`
				],
				solutionStepsAr: [
					'نتحقق من حواف كل شكل: الدائرة حافتها منحنية وليست قطعا مستقيمة، فهي ليست مضلعا.',
					explanation
				],
				finalAnswer: `الشكل ${labels[targetIdx]}`
			};
		}

		if (variant === 1) {
			// Variant 1: svgRectangle (Rectangle properties & Rhombus vs Square)
			const vertexSets: [string, string, string, string][] = [
				['A', 'B', 'C', 'D'],
				['E', 'F', 'G', 'H'],
				['K', 'L', 'M', 'N']
			];
			const vertices = rng.pick(vertexSets);
			const shapeName = vertices.join('');
			const typstVertices = vertices.join(' ');
			const L = rng.int(7, 15);
			const W = rng.int(3, 5);

			const rectSvg = svgRectangle({
				lengthLabel: `${L} cm`,
				widthLabel: `${W} cm`,
				shapeLabel: 'مستطيل',
				vertices
			});
			const rectPath = saveSvgAsset(`3ap_t2_rect_${difficulty}_s${cleanSeed}`, rectSvg);
			const rhombPath = saveSvgAsset(`3ap_t2_rhomb_${difficulty}_s${cleanSeed}`, svgRhombusAndSquare());

			let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
			let finalAnswer: string;
			let hints: [string, string, string];
			let solutionStepsAr: string[];

			if (difficulty === 'hard') {
				const isTrueStmt = cleanSeed % 2 === 0;
				const qText = isTrueStmt
					? 'يشترك **المربع** و**المعين** في أن لهما $4$ أضلاع متقايسة الطول، لكن المربع يمتاز بـ $4$ زوايا قائمة.'
					: `في المستطيل $${shapeName}$ المرسوم (طوله $${L}\\text{ cm}$ وعرضه $${W}\\text{ cm}$)، جميع أضلاعه الأربعة متقايسة الطول.`;
				const explanation = isTrueStmt
					? 'صحيح! المربع والمعين كلاهما رباعي أضلاعه الأربعة متقايسة، ويمتاز المربع بوجود $4$ زوايا قائمة.'
					: `خطأ! في المستطيل كل ضلعين متقابلين متقايسان فقط ($${L}\\text{ cm}$ و $${W}\\text{ cm}$)، وليست جميع أضلاعه متقايسة.`;

				quizQuestion = {
					type: 'true_false',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: isTrueStmt ? rhombPath : rectPath,
					imageCaption: isTrueStmt ? 'مقارنة المربع والمعين' : `المستطيل ${shapeName}`,
					questionData: { correctAnswer: isTrueStmt },
					explanation
				};
				finalAnswer = isTrueStmt ? 'صحيح' : 'خطأ';
				hints = [
					'تذكر خواص الرباعيات المألوفة: عدد الأضلاع المتقايسة وعدد الزوايا القائمة.',
					'نستعمل المسطرة لمقارنة أطوال الأضلاع، والكوس للتحقق من الزوايا القائمة.',
					explanation
				];
				solutionStepsAr = [
					'المربع له 4 أضلاع متقايسة و 4 زوايا قائمة؛ المعين له 4 أضلاع متقايسة دون زوايا قائمة.',
					explanation
				];
			} else {
				const askOppositeLength = cleanSeed % 2 === 0;
				const targetLen = askOppositeLength ? L : W;
				const otherLen = askOppositeLength ? W : L;
				const sideName = askOppositeLength
					? `[${vertices[0]}${vertices[1]}]`
					: `[${vertices[0]}${vertices[3]}]`;
				const oppSideName = askOppositeLength
					? `[${vertices[2]}${vertices[3]}]`
					: `[${vertices[1]}${vertices[2]}]`;

				const built = buildUniqueMcqOptions(
					`$${targetLen}\\text{ cm}$`,
					[
						{
							text: `$${otherLen}\\text{ cm}$`,
							diagnosticFeedback: `هذا طول الضلع المجاور (${otherLen} cm) وليس الضلع المقابل لـ ${oppSideName}.`
						},
						{
							text: `$${L + W}\\text{ cm}$`,
							diagnosticFeedback: 'المطلوب طول الضلع الواحد فقط وليس مجموع الطول والعرض.'
						},
						{
							text: `$${targetLen + 1}\\text{ cm}$`,
							diagnosticFeedback: `في المستطيل كل ضلعين متقابلين متساويان تماما في الطول ($${targetLen}\\text{ cm}$).`
						}
					],
					rng
				);

				const qText = `تأمل المستطيل $${shapeName}$ في الصورة. طول الضلع $${oppSideName}$ هو $${targetLen}\\text{ cm}$، فما طول الضلع المقابل له $${sideName}$؟`;
				quizQuestion = {
					type: 'mcq',
					questionText: qText,
					questionTextAr: qText,
					imageUrl: rectPath,
					imageCaption: `المستطيل ${shapeName}`,
					questionData: {
						options: built.options,
						correctIndices: built.correctIndices,
						correctIndexes: built.correctIndices
					},
					explanation: `في المستطيل، كل ضلعين متقابلين متقايسان، إذن طول $${sideName}$ يساوي طول $${oppSideName}$ أي $${targetLen}\\text{ cm}$.`
				};
				finalAnswer = `${targetLen} cm`;
				hints = [
					'المستطيل مضلع رباعي له 4 زوايا قائمة.',
					'في المستطيل، كل ضلعين متقابلين لهما نفس الطول.',
					`الضلع $${sideName}$ يقابل الضلع $${oppSideName}$ الذي طوله $${targetLen}\\text{ cm}$.`
				];
				solutionStepsAr = [
					`من خواص المستطيل: كل ضلعين متقابلين متقايسان.`,
					`إذن طول $${sideName}$ يساوي $${targetLen}\\text{ cm}$.`
				];
			}

			const sujetExercise: ExerciseBlock = {
				points: 1,
				instruction: 'تأمل الشكل الهندسي المرفق ثم أجب عن الأسئلة:',
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) ما اسم المضلع $${typstVertices}$؟ وكم زاوية قائمة يوجد فيه؟`,
								answer: `1) المضلع $${typstVertices}$ مستطيل، وله $4$ زوايا قائمة.`,
								mark: '0.5'
							},
							{
								type: 'image',
								src: rectPath,
								caption: `المستطيل ${shapeName}`
							}
						]
					},
					{
						type: 'text',
						content: `2) استنتج طول الضلع $[${vertices[0]} ${vertices[1]}]$ وطول الضلع $[${vertices[0]} ${vertices[3]}]$.`,
						answer: `2) كل ضلعين متقابلين متقايسان: طول $[${vertices[0]} ${vertices[1]}]$ هو $${L}$ cm، وطول $[${vertices[0]} ${vertices[3]}]$ هو $${W}$ cm.`,
						mark: '0.5'
					}
				]
			};

			return {
				templateId: '3ap_t2_polygons_and_circle',
				seed: cleanSeed,
				grade: '3ap',
				trimesterId: 't2',
				difficulty,
				domain: 'geometry',
				titleAr: this.titleAr,
				quizQuestion,
				sujetExercise,
				hints,
				solutionStepsAr,
				finalAnswer
			};
		}

		// Variant 2: Circle & Compass (Center, Radius, Diameter, Point membership)
		const r =
			difficulty === 'easy'
				? rng.int(3, 6)
				: difficulty === 'medium'
					? rng.int(4, 8)
					: rng.int(5, 9);
		const d = r * 2;
		const svgCirclePath = saveSvgAsset(
			`3ap_t2_circle_${difficulty}_s${cleanSeed}`,
			svgCircleDiagram(r)
		);

		let quizQuestion: GeneratedExerciseInstance['quizQuestion'];
		let finalAnswer: string;
		let hints: [string, string, string];
		let solutionStepsAr: string[];

		if (difficulty === 'easy') {
			const qText = `تأمل الدائرة التي مركزها $O$ في الصورة، وطول نصف قطرها $OM = ${r}\\text{ cm}$. ما هو طول قطرها $[AB]$ بالسنتيمتر ($\\text{cm}$)؟`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgCirclePath,
				imageCaption: `الدائرة التي مركزها O ونصف قطرها ${r} cm`,
				questionData: {
					answer: d,
					displayTemplate: `r = ${r} cm  →  d = ? cm`,
					variables: [],
					tolerance: 0
				},
				explanation: `طول القطر يساوي ضعف نصف القطر: $${r} + ${r} = ${d}\\text{ cm}$ (أي $${r} \\times 2 = ${d}\\text{ cm}$).`
			};
			finalAnswer = `${d} cm`;
			hints = [
				'القطر هو قطعة مستقيم تصل بين نقطتين من الدائرة وتمر بالمركز $O$.',
				'طول القطر يساوي ضعف طول نصف القطر.',
				`احسب: $${r} + ${r}$ أو $${r} \\times 2$.`
			];
			solutionStepsAr = [
				`نصف القطر هو $OM = ${r}\\text{ cm}$.`,
				`القطر $AB = ${r} \\times 2 = ${d}\\text{ cm}$.`
			];
		} else if (difficulty === 'medium') {
			const qText = `أراد تلميذ رسم دائرة **قطرها** $[AB]$ يساوي $${d}\\text{ cm}$ باستعمال المدور. كم سنتيمترا ($\\text{cm}$) يجب أن يفتح المدور على المسطرة؟`;
			quizQuestion = {
				type: 'calculated',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgCirclePath,
				imageCaption: `الدائرة التي قطرها ${d} cm`,
				questionData: {
					answer: r,
					displayTemplate: `d = ${d} cm  →  r = ? cm`,
					variables: [],
					tolerance: 0
				},
				explanation: `فتحة المدور تساوي **نصف القطر**، وبما أن $${r} + ${r} = ${d}$ (أي $${r} \\times 2 = ${d}$)، نفتح المدور على $${r}\\text{ cm}$.`
			};
			finalAnswer = `${r} cm`;
			hints = [
				'عند رسم دائرة بالمدور، نفتح المدور بقدر طول **نصف القطر** وليس القطر كله.',
				`نبحث عن العدد الذي ضعفه يساوي $${d}$ ($\\dots + \\dots = ${d}$).`,
				`بما أن $${r} + ${r} = ${d}$، فإن فتحة المدور هي $${r}\\text{ cm}$.`
			];
			solutionStepsAr = [
				'فتحة المدور تساوي نصف قطر الدائرة.',
				`بما أن القطر $${d}\\text{ cm}$ و $${r} \\times 2 = ${d}$، نفتح المدور على $${r}\\text{ cm}$.`
			];
		} else {
			// hard: Identify diameter [AB] vs chord [EF] vs radius [OM] vs outside [OK]
			const built = buildUniqueMcqOptions(
				'$[AB]$',
				[
					{
						text: '$[OM]$',
						diagnosticFeedback: 'القطعة $[OM]$ تصل المركز بنقطة من الدائرة، فهي **نصف قطر** وليست قطرا.'
					},
					{
						text: '$[EF]$',
						diagnosticFeedback: 'القطعة $[EF]$ تصل بين نقطتين من الدائرة ولكنها **لا تمر بالمركز** $O$، لذا فهي ليست قطرا.'
					},
					{
						text: '$[OK]$',
						diagnosticFeedback: 'النقطة $K$ تقع خارج الدائرة، لذا فالقطعة $[OK]$ ليست قطرا ولا نصف قطر.'
					}
				],
				rng
			);

			const qText = `تأمل الدائرة التي مركزها $O$ في الصورة. أي قطعة مستقيم تمثل **قطر** هذه الدائرة؟`;
			quizQuestion = {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl: svgCirclePath,
				imageCaption: 'عناصر الدائرة',
				questionData: {
					options: built.options,
					correctIndices: built.correctIndices,
					correctIndexes: built.correctIndices
				},
				explanation: 'قطر الدائرة يصل بين نقطتين من الدائرة ويمر بالمركز $O$، والقطعة الوحيدة التي تحقق الشرطين هي $[AB]$.'
			};
			finalAnswer = '[AB]';
			hints = [
				'قطر الدائرة يجب أن يحقق شرطين: طرفاه على الدائرة ويمر بالمركز $O$.',
				'القطعة $[EF]$ لا تمر بالمركز $O$، والقطعة $[OM]$ تبدأ من المركز فقط.',
				'انظر إلى القطعة الحمراء المارة بالمركز $O$.'
			];
			solutionStepsAr = [
				'نصف القطر يصل المركز بنقطة من الدائرة ($[OM]$).',
				'القطر يصل بين نقطتين من الدائرة ويمر بالمركز $O$، وهو $[AB]$.'
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 1,
			instruction: 'لاحظ الدائرة المقابلة التي مركزها $O$ ونصف قطرها $[O M]$ طوله $' + r + '$ cm، ثم أجب:',
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) سمّ نصف قطر الدائرة وقطرها، ثم اذكر هل النقطة $K$ تنتمي إلى الدائرة؟`,
							answer: `1) نصف القطر هو $[O M]$، والقطر هو $[A B]$. النقطة $K$ لا تنتمي إلى الدائرة لأنها تقع خارجها.`,
							mark: '0.5'
						},
						{
							type: 'image',
							src: svgCirclePath,
							caption: `الدائرة التي مركزها O`
						}
					]
				},
				{
					type: 'text',
					content: `2) احسب طول القطر $[A B]$ بالسنتيمتر، ثم حدد فتحة المدور اللازمة لرسم هذه الدائرة.`,
					answer: `2) طول القطر: $${r} times 2 = ${d}$ cm. وفتحة المدور تساوي نصف القطر أي $${r}$ cm.`,
					mark: '0.5'
				}
			]
		};

		return {
			templateId: '3ap_t2_polygons_and_circle',
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'geometry',
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
// 6. Integration: Buying Packs (Mult by 1-digit + Add/Sub < 100,000)
// ---------------------------------------------------------------------------
const tplIntegrationBuyingPacks: ParameterizedTemplate = {
	id: '3ap_t2_integration_buying_packs',
	grade: '3ap',
	trimesterId: 't2',
	domain: 'integration',
	curriculumLessonId: 'lesson_3ap_t2_integration',
	titleAr: 'الوضعية الإدماجية: شراء رزم وحساب التكاليف بالدينار الجزائري',
	defaultPoints: 4,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const cleanSeed = Math.trunc(seed);
		const rng = createRng(cleanSeed, difficulty, 6);

		const actors = [
			{ name: 'أمين', fem: false },
			{ name: 'سارة', fem: true },
			{ name: 'ياسين', fem: false },
			{ name: 'مريم', fem: true },
			{ name: 'كريم', fem: false },
			{ name: 'إيناس', fem: true }
		] as const;

		const contexts = [
			{
				place: 'المكتبة',
				packSing: 'رزمة كراريس',
				packPlur: 'رزم كراريس',
				item2Sing: 'علبة أقلام',
				item2Plur: 'علب أقلام',
				singleItem: 'حقيبة مدرسية'
			},
			{
				place: 'متجر الرياضة',
				packSing: 'قميصا رياضيا',
				packPlur: 'أقمصة رياضية',
				item2Sing: 'زوج جوارب',
				item2Plur: 'أزواج جوارب',
				singleItem: 'كرة قدم'
			},
			{
				place: 'معرض الصناعة التقليدية',
				packSing: 'طبقا فخاريا',
				packPlur: 'أطباق فخارية',
				item2Sing: 'سلة تقليدية',
				item2Plur: 'سلال تقليدية',
				singleItem: 'إبريق نحاسي'
			},
			{
				place: 'المحل التجاري',
				packSing: 'علبة عصير',
				packPlur: 'علب عصير',
				item2Sing: 'علبة حلوى',
				item2Plur: 'علب حلوى',
				singleItem: 'كعكة كبيرة'
			}
		] as const;

		const actor = rng.pick(actors);
		const ctx = rng.pick(contexts);
		const vHas = actor.fem ? 'تملك' : 'يملك';
		const vBought = actor.fem ? 'اشترت' : 'اشترى';
		const pronWith = actor.fem ? 'معها' : 'معه';

		let k1: number;
		let p1: number;
		let k2: number;
		let p2: number;

		if (difficulty === 'easy') {
			k1 = rng.int(2, 5);
			p1 = rng.priceDA(120, 480, 10);
			k2 = 1;
			p2 = rng.priceDA(150, 850, 10);
		} else if (difficulty === 'medium') {
			k1 = rng.int(3, 8);
			p1 = rng.priceDA(320, 1450, 10);
			k2 = rng.int(2, 6);
			p2 = rng.priceDA(140, 650, 10);
		} else {
			k1 = rng.int(4, 9);
			p1 = rng.priceDA(1250, 4850, 10);
			k2 = rng.int(3, 8);
			p2 = rng.priceDA(450, 2250, 10);
		}

		const cost1 = k1 * p1;
		const cost2 = k2 * p2;
		const totalCost = cost1 + cost2;
		const margin =
			difficulty === 'easy'
				? rng.int(300, 1500)
				: difficulty === 'medium'
					? rng.int(800, 4000)
					: rng.int(2500, 12000);
		const budget = Math.min(99500, Math.ceil((totalCost + margin) / 500) * 500);
		const remaining = budget - totalCost;

		const line1Label =
			difficulty === 'easy'
				? `${k1} ${ctx.packPlur} (${p1} DA للواحدة)`
				: `${k1} ${ctx.packPlur} (${p1} DA للواحدة)`;
		const line2Label =
			difficulty === 'easy'
				? `${ctx.singleItem} واحدة`
				: `${k2} ${ctx.item2Plur} (${p2} DA للواحدة)`;

		const svgPath = saveSvgAsset(
			`3ap_t2_integ_${difficulty}_s${cleanSeed}`,
			svgPurchaseCard({
				budget,
				line1Label,
				line1Price: `${k1} x ${p1} DA`,
				line2Label,
				line2Price: difficulty === 'easy' ? `${p2} DA` : `${k2} x ${p2} DA`
			})
		);

		const introKatex =
			difficulty === 'easy'
				? `${vHas} ${actor.name} مبلغا قدره $${fmtKatex(budget)}\\text{ DA}$. ذهب إلى ${ctx.place} فـ${vBought} $${k1}$ ${ctx.packPlur} بسعر $${fmtKatex(p1)}\\text{ DA}$ للواحدة، و${ctx.singleItem} بسعر $${fmtKatex(p2)}\\text{ DA}$.`
				: `${vHas} ${actor.name} مبلغا قدره $${fmtKatex(budget)}\\text{ DA}$. ${vBought} من ${ctx.place} $${k1}$ ${ctx.packPlur} بسعر $${fmtKatex(p1)}\\text{ DA}$ للواحدة، و$${k2}$ ${ctx.item2Plur} بسعر $${fmtKatex(p2)}\\text{ DA}$ للواحدة.`;

		const introTypst =
			difficulty === 'easy'
				? `${vHas} ${actor.name} مبلغا قدره $${budget}$ DA. توجه إلى ${ctx.place} فـ${vBought} $${k1}$ ${ctx.packPlur} بسعر $${p1}$ DA للواحدة، و${ctx.singleItem} بسعر $${p2}$ DA.`
				: `${vHas} ${actor.name} مبلغا قدره $${budget}$ DA. ${vBought} من ${ctx.place} $${k1}$ ${ctx.packPlur} بسعر $${p1}$ DA للواحدة، و$${k2}$ ${ctx.item2Plur} بسعر $${p2}$ DA للواحدة.`;

		const questionText = `${introKatex} احسب **المبلغ المتبقي** ${pronWith} بعد دفع ثمن جميع المشتريات (بالدينار الجزائري).`;

		const stepsKatex =
			difficulty === 'easy'
				? [
						`1) ثمن ${ctx.packPlur}: $${fmtKatex(p1)} \\times ${k1} = ${fmtKatex(cost1)}\\text{ DA}$.`,
						`2) الثمن الكلي للمشتريات: $${fmtKatex(cost1)} + ${fmtKatex(p2)} = ${fmtKatex(totalCost)}\\text{ DA}$.`,
						`3) المبلغ المتبقي: $${fmtKatex(budget)} - ${fmtKatex(totalCost)} = ${fmtKatex(remaining)}\\text{ DA}$.`
					]
				: [
						`1) ثمن ${ctx.packPlur}: $${fmtKatex(p1)} \\times ${k1} = ${fmtKatex(cost1)}\\text{ DA}$، وثمن ${ctx.item2Plur}: $${fmtKatex(p2)} \\times ${k2} = ${fmtKatex(cost2)}\\text{ DA}$.`,
						`2) المبلغ الكلي للمشتريات: $${fmtKatex(cost1)} + ${fmtKatex(cost2)} = ${fmtKatex(totalCost)}\\text{ DA}$.`,
						`3) المبلغ المتبقي: $${fmtKatex(budget)} - ${fmtKatex(totalCost)} = ${fmtKatex(remaining)}\\text{ DA}$.`
					];

		const sujetBlocks: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.35fr', '1fr'],
				children: [
					{ type: 'text', content: introTypst },
					{ type: 'image', src: svgPath, caption: 'معطيات المشتريات' }
				]
			},
			difficulty === 'easy'
				? {
						type: 'text',
						content: `1) احسب ثمن ${ctx.packPlur}.`,
						answer: `1) ثمن ${ctx.packPlur}:\n$ ${p1} times ${k1} = ${cost1} $\nالثمن هو $${cost1}$ DA.`,
						mark: '1.5'
					}
				: {
						type: 'text',
						content: `1) احسب ثمن ${ctx.packPlur} ثم ثمن ${ctx.item2Plur}.`,
						answer: `1) ثمن ${ctx.packPlur}: $${p1} times ${k1} = ${cost1}$ DA.\nثمن ${ctx.item2Plur}: $${p2} times ${k2} = ${cost2}$ DA.`,
						mark: '1.5'
					},
			{
				type: 'text',
				content: `2) ما هو الثمن الكلي لجميع المشتريات؟`,
				answer:
					difficulty === 'easy'
						? `2) الثمن الكلي:\n$ ${cost1} + ${p2} = ${totalCost} $\nدفع ${actor.name} مبلغ $${totalCost}$ DA.`
						: `2) الثمن الكلي:\n$ ${cost1} + ${cost2} = ${totalCost} $\nدفع ${actor.name} مبلغ $${totalCost}$ DA.`,
				mark: '1.25'
			},
			{
				type: 'text',
				content: `3) كم دينارا بقي ${pronWith}؟`,
				answer: `3) المبلغ المتبقي:\n$ ${budget} - ${totalCost} = ${remaining} $\nبقي ${pronWith} مبلغ $${remaining}$ DA.`,
				mark: '1.25'
			}
		];

		return {
			templateId: '3ap_t2_integration_buying_packs',
			seed: cleanSeed,
			grade: '3ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText,
				questionTextAr: questionText,
				imageUrl: svgPath,
				imageCaption: `ميزانية ${actor.name}: ${fmtSpace(budget)} DA`,
				questionData: {
					answer: remaining,
					displayTemplate: `${fmtSpace(budget)} - (${k1} × ${p1} + ${difficulty === 'easy' ? p2 : `${k2} × ${p2}`}) = ? DA`,
					variables: [],
					tolerance: 0
				},
				explanation: stepsKatex.join(' ')
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 4,
				instruction: 'اقرأ الوضعية جيدا ثم أجب عن الأسئلة الثلاثة بوضع العمليات العمودية والأفقية:',
				content: sujetBlocks
			},
			hints: [
				`الخطوة 1: احسب أولا ثمن ${ctx.packPlur} بعملية الضرب: $${fmtKatex(p1)} \\times ${k1}$.`,
				difficulty === 'easy'
					? `الخطوة 2: أضف ثمن ${ctx.singleItem} ($${fmtKatex(p2)}\\text{ DA}$) لإيجاد الثمن الكلي للمشتريات ($${fmtKatex(totalCost)}\\text{ DA}$).`
					: `الخطوة 2: احسب ثمن ${ctx.item2Plur} ($${fmtKatex(p2)} \\times ${k2} = ${fmtKatex(cost2)}\\text{ DA}$) ثم اجمعه مع $${fmtKatex(cost1)}\\text{ DA}$.`,
				`الخطوة 3: اطرح الثمن الكلي ($${fmtKatex(totalCost)}\\text{ DA}$) من المبلغ المتوفر ($${fmtKatex(budget)}\\text{ DA}$).`
			],
			solutionStepsAr: stepsKatex,
			finalAnswer: `${remaining} DA`
		};
	}
};

export const TEMPLATES_3AP_T2: ParameterizedTemplate[] = [
	tplNumbers99999,
	tplMultTablesPowers10,
	tplVerticalMult1Digit,
	tplMassCapacity,
	tplPolygonsAndCircle,
	tplIntegrationBuyingPacks
].map(withSafeKatex);
