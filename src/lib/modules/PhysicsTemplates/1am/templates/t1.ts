import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

function esc(str: string): string {
	return str
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

// ═══════════════════════════════════════════════════════════════════════════════
// Custom 1AM T1 SVG Generators
// ═══════════════════════════════════════════════════════════════════════════════

function buildTestCircuitSvg(opts: {
	voltageLabel: string;
	sampleName: string;
	isConductor: boolean;
	withLed: boolean;
}): string {
	return wrapPhysicsSvg(
		360,
		200,
		`<rect x="10" y="10" width="340" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<rect x="65" y="48" width="230" height="114" fill="none" stroke="#0f172a" stroke-width="1.8"/>` +
			// Cell on left
			`<rect x="50" y="92" width="30" height="22" fill="#ffffff"/>` +
			`<line x1="50" y1="98" x2="80" y2="98" stroke="#0f172a" stroke-width="2"/>` +
			`<line x1="57" y1="108" x2="73" y2="108" stroke="#0f172a" stroke-width="3.2"/>` +
			`<text x="42" y="94" font-size="11" font-weight="bold" fill="#dc2626">+</text>` +
			`<text x="42" y="116" font-size="11" font-weight="bold" fill="#2563eb">-</text>` +
			`<text x="86" y="108" font-size="11" font-weight="bold" fill="#1e3a8a">${esc(opts.voltageLabel)}</text>` +
			// Test gap A-B on top
			`<rect x="125" y="40" width="90" height="16" fill="#ffffff"/>` +
			`<circle cx="128" cy="48" r="3" fill="#dc2626"/>` +
			`<circle cx="212" cy="48" r="3" fill="#dc2626"/>` +
			`<text x="128" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">A</text>` +
			`<text x="212" y="34" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">B</text>` +
			`<rect x="136" y="39" width="68" height="18" rx="3" fill="${opts.isConductor ? '#dcfce7' : '#fee2e2'}" stroke="${opts.isConductor ? '#16a34a' : '#dc2626'}" stroke-width="1.4"/>` +
			`<text x="170" y="52" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">${esc(opts.sampleName)}</text>` +
			// Lamp or LED on right
			(opts.withLed
				? `<polygon points="283,95 307,95 295,115" fill="${opts.isConductor ? '#fde047' : '#e2e8f0'}" stroke="#0f172a" stroke-width="1.6"/>` +
					`<line x1="283" y1="115" x2="307" y2="115" stroke="#0f172a" stroke-width="1.8"/>` +
					`<text x="316" y="109" font-size="11" font-weight="bold" fill="#1e3a8a">LED</text>`
				: `<circle cx="295" cy="105" r="14" fill="${opts.isConductor ? '#fef08a' : '#f1f5f9'}" stroke="#0f172a" stroke-width="1.7"/>` +
					`<line x1="285" y1="95" x2="305" y2="115" stroke="#0f172a" stroke-width="1.5"/>` +
					`<line x1="285" y1="115" x2="305" y2="95" stroke="#0f172a" stroke-width="1.5"/>` +
					`<text x="316" y="109" font-size="11" font-weight="bold" fill="#1e3a8a">L</text>`) +
			// Switch on bottom
			`<rect x="160" y="154" width="40" height="16" fill="#ffffff"/>` +
			`<circle cx="164" cy="162" r="2.6" fill="#0f172a"/>` +
			`<circle cx="196" cy="162" r="2.6" fill="#0f172a"/>` +
			`<line x1="164" y1="162" x2="196" y2="162" stroke="#0f172a" stroke-width="2"/>` +
			`<text x="180" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">K (مغلقة)</text>`
	);
}

function buildCellsAndLampsSvg(opts: {
	cellCount: number;
	reversedIdx: number | null;
	mode: 'series' | 'parallel';
	lampLabels: [string, string];
}): string {
	let cellsBody = '';
	const startX = 65;
	const step = 30;
	for (let i = 0; i < opts.cellCount; i++) {
		const cx = startX + i * step;
		const rev = opts.reversedIdx === i;
		cellsBody += `<rect x="${cx - 10}" y="150" width="20" height="22" fill="#ffffff"/>`;
		if (!rev) {
			cellsBody += `<line x1="${cx - 6}" y1="149" x2="${cx - 6}" y2="175" stroke="#0f172a" stroke-width="2"/>`;
			cellsBody += `<line x1="${cx + 6}" y1="154" x2="${cx + 6}" y2="170" stroke="#0f172a" stroke-width="3.2"/>`;
			cellsBody += `<text x="${cx - 12}" y="144" font-size="10" font-weight="bold" fill="#dc2626">+</text>`;
			cellsBody += `<text x="${cx + 6}" y="144" font-size="10" font-weight="bold" fill="#2563eb">-</text>`;
		} else {
			cellsBody += `<line x1="${cx - 6}" y1="154" x2="${cx - 6}" y2="170" stroke="#0f172a" stroke-width="3.2"/>`;
			cellsBody += `<line x1="${cx + 6}" y1="149" x2="${cx + 6}" y2="175" stroke="#0f172a" stroke-width="2"/>`;
			cellsBody += `<text x="${cx - 12}" y="144" font-size="10" font-weight="bold" fill="#2563eb">-</text>`;
			cellsBody += `<text x="${cx + 6}" y="144" font-size="10" font-weight="bold" fill="#dc2626">+</text>`;
		}
	}

	const drawLamp = (cx: number, cy: number, lbl: string) =>
		`<circle cx="${cx}" cy="${cy}" r="13" fill="#fef9c3" stroke="#0f172a" stroke-width="1.7"/>` +
		`<line x1="${cx - 9}" y1="${cy - 9}" x2="${cx + 9}" y2="${cy + 9}" stroke="#0f172a" stroke-width="1.5"/>` +
		`<line x1="${cx - 9}" y1="${cy + 9}" x2="${cx + 9}" y2="${cy - 9}" stroke="#0f172a" stroke-width="1.5"/>` +
		`<text x="${cx}" y="${cy - 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">${esc(lbl)}</text>`;

	let lampsBody = '';
	if (opts.mode === 'series') {
		lampsBody =
			`<rect x="45" y="46" width="270" height="116" fill="none" stroke="#0f172a" stroke-width="1.8"/>` +
			drawLamp(140, 46, opts.lampLabels[0]) +
			drawLamp(230, 46, opts.lampLabels[1]);
	} else {
		lampsBody =
			`<rect x="45" y="40" width="270" height="122" fill="none" stroke="#0f172a" stroke-width="1.8"/>` +
			`<line x1="125" y1="100" x2="315" y2="100" stroke="#0f172a" stroke-width="1.8"/>` +
			`<line x1="125" y1="40" x2="125" y2="100" stroke="#0f172a" stroke-width="1.8"/>` +
			`<circle cx="125" cy="100" r="3" fill="#0f172a"/><circle cx="315" cy="100" r="3" fill="#0f172a"/>` +
			drawLamp(220, 40, opts.lampLabels[0]) +
			drawLamp(220, 100, opts.lampLabels[1]);
	}

	return wrapPhysicsSvg(
		360,
		200,
		`<rect x="10" y="10" width="340" height="180" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>` +
			lampsBody +
			cellsBody +
			`<text x="260" y="182" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#475569">أعمدة 1.5V على التسلسل</text>`
	);
}

function buildTwoWaySvg(k1Pos: 1 | 2, k2Pos: 1 | 2, lit: boolean): string {
	const k1TargetY = k1Pos === 1 ? 52 : 84;
	const k2TargetY = k2Pos === 1 ? 52 : 84;
	return wrapPhysicsSvg(
		380,
		190,
		`<rect x="10" y="10" width="360" height="170" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>` +
			`<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="55,68 55,148 325,148 325,68 290,68"/>` +
			`<line x1="55" y1="68" x2="92" y2="68" stroke="#0f172a" stroke-width="1.8"/>` +
			// Cell
			`<rect x="40" y="96" width="30" height="20" fill="#ffffff"/>` +
			`<line x1="40" y1="101" x2="70" y2="101" stroke="#0f172a" stroke-width="2"/>` +
			`<line x1="47" y1="109" x2="63" y2="109" stroke="#0f172a" stroke-width="3.2"/>` +
			`<text x="33" y="98" font-size="10.5" font-weight="bold" fill="#dc2626">+</text>` +
			`<text x="33" y="118" font-size="10.5" font-weight="bold" fill="#2563eb">-</text>` +
			// K1
			`<circle cx="92" cy="68" r="2.8" fill="#0f172a"/>` +
			`<circle cx="132" cy="52" r="2.8" fill="#0f172a"/>` +
			`<circle cx="132" cy="84" r="2.8" fill="#0f172a"/>` +
			`<line x1="92" y1="68" x2="130" y2="${k1TargetY}" stroke="#dc2626" stroke-width="2.1"/>` +
			`<text x="110" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">K₁ (وضع ${k1Pos})</text>` +
			`<text x="137" y="48" font-size="10" font-weight="bold">1</text>` +
			`<text x="137" y="95" font-size="10" font-weight="bold">2</text>` +
			// Shuttles
			`<line x1="132" y1="52" x2="225" y2="52" stroke="#2563eb" stroke-width="1.7"/>` +
			`<line x1="132" y1="84" x2="225" y2="84" stroke="#059669" stroke-width="1.7"/>` +
			// K2
			`<circle cx="225" cy="52" r="2.8" fill="#0f172a"/>` +
			`<circle cx="225" cy="84" r="2.8" fill="#0f172a"/>` +
			`<circle cx="265" cy="68" r="2.8" fill="#0f172a"/>` +
			`<line x1="265" y1="68" x2="227" y2="${k2TargetY}" stroke="#dc2626" stroke-width="2.1"/>` +
			`<text x="245" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">K₂ (وضع ${k2Pos})</text>` +
			`<text x="215" y="48" font-size="10" font-weight="bold">1</text>` +
			`<text x="215" y="95" font-size="10" font-weight="bold">2</text>` +
			`<line x1="265" y1="68" x2="290" y2="68" stroke="#0f172a" stroke-width="1.8"/>` +
			// Lamp
			`<circle cx="325" cy="108" r="14" fill="${lit ? '#fde047' : '#f1f5f9'}" stroke="#0f172a" stroke-width="1.7"/>` +
			`<line x1="315" y1="98" x2="335" y2="118" stroke="#0f172a" stroke-width="1.5"/>` +
			`<line x1="315" y1="118" x2="335" y2="98" stroke="#0f172a" stroke-width="1.5"/>` +
			`<text x="346" y="112" font-size="11" font-weight="bold" fill="#1e3a8a">L</text>`
	);
}

function buildShortCircuitSvg(opts: {
	mode: 'series_l1' | 'series_l2' | 'parallel_l1';
	withFuse: boolean;
}): string {
	let body = `<rect x="10" y="10" width="340" height="175" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>`;
	if (opts.mode === 'parallel_l1') {
		body += `<rect x="55" y="42" width="245" height="118" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<line x1="130" y1="100" x2="300" y2="100" stroke="#0f172a" stroke-width="1.8"/>`;
		body += `<line x1="130" y1="42" x2="130" y2="100" stroke="#0f172a" stroke-width="1.8"/>`;
		// L1 shorted
		body += `<circle cx="215" cy="42" r="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<line x1="207" y1="34" x2="223" y2="50" stroke="#0f172a" stroke-width="1.4"/><line x1="207" y1="50" x2="223" y2="34" stroke="#0f172a" stroke-width="1.4"/>`;
		body += `<text x="215" y="25" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₁</text>`;
		body += `<polyline fill="none" stroke="#dc2626" stroke-width="1.9" stroke-dasharray="4,3" points="193,42 193,72 237,72 237,42"/>`;
		body += `<text x="215" y="84" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">سلك استقصار</text>`;
		// L2
		body += `<circle cx="215" cy="100" r="12" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<line x1="207" y1="92" x2="223" y2="108" stroke="#0f172a" stroke-width="1.4"/><line x1="207" y1="108" x2="223" y2="92" stroke="#0f172a" stroke-width="1.4"/>`;
		body += `<text x="215" y="124" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₂</text>`;
	} else {
		body += `<rect x="55" y="48" width="245" height="112" fill="none" stroke="#0f172a" stroke-width="1.8"/>`;
		const l1Lit = opts.mode === 'series_l2';
		const l2Lit = opts.mode === 'series_l1';
		body += `<circle cx="155" cy="48" r="12" fill="${l1Lit ? '#fde047' : '#e2e8f0'}" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<line x1="147" y1="40" x2="163" y2="56" stroke="#0f172a" stroke-width="1.4"/><line x1="147" y1="56" x2="163" y2="40" stroke="#0f172a" stroke-width="1.4"/>`;
		body += `<text x="155" y="30" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₁</text>`;
		body += `<circle cx="235" cy="48" r="12" fill="${l2Lit ? '#fde047' : '#e2e8f0'}" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<line x1="227" y1="40" x2="243" y2="56" stroke="#0f172a" stroke-width="1.4"/><line x1="227" y1="56" x2="243" y2="40" stroke="#0f172a" stroke-width="1.4"/>`;
		body += `<text x="235" y="30" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₂</text>`;
		const sx = opts.mode === 'series_l1' ? 155 : 235;
		body += `<polyline fill="none" stroke="#dc2626" stroke-width="1.9" stroke-dasharray="4,3" points="${sx - 20},48 ${sx - 20},78 ${sx + 20},78 ${sx + 20},48"/>`;
		body += `<text x="${sx}" y="92" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">استقصار</text>`;
	}
	// Cell on left
	body += `<rect x="40" y="90" width="30" height="20" fill="#ffffff"/>`;
	body += `<line x1="40" y1="95" x2="70" y2="95" stroke="#0f172a" stroke-width="2"/>`;
	body += `<line x1="47" y1="103" x2="63" y2="103" stroke="#0f172a" stroke-width="3.2"/>`;
	body += `<text x="33" y="92" font-size="10.5" font-weight="bold" fill="#dc2626">+</text>`;
	body += `<text x="33" y="112" font-size="10.5" font-weight="bold" fill="#2563eb">-</text>`;
	if (opts.withFuse) {
		body += `<rect x="82" y="152" width="30" height="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
		body += `<line x1="82" y1="159" x2="112" y2="159" stroke="#dc2626" stroke-width="1.3"/>`;
		body += `<text x="97" y="177" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">منصهرة</text>`;
	}
	return wrapPhysicsSvg(360, 195, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Simple Circuit, Symbols & Conductors/Insulators
// ═══════════════════════════════════════════════════════════════════════════════
const circuitSymbolsConductorsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_circuit_symbols_conductors',
	grade: '1am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'الدارة الكهربائية البسيطة، الرموز النظامية، النواقل والعوازل',
	curriculumLessonId: 'phy_lesson_1am_t1_simple_circuit_symbols',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const conductors = [
			{ name: 'مسمار نحاسي', material: 'النحاس' },
			{ name: 'ورقة ألمنيوم', material: 'الألمنيوم' },
			{ name: 'قلم غرافيت', material: 'الغرافيت' },
			{ name: 'محلول ماء مالح', material: 'الماء المالح' }
		];
		const insulators = [
			{ name: 'مسطرة بلاستيكية', material: 'البلاستيك' },
			{ name: 'قطعة خشب جاف', material: 'الخشب الجاف' },
			{ name: 'أنبوب زجاجي', material: 'الزجاج' },
			{ name: 'ماء مقطر', material: 'الماء المقطر' }
		];
		const chosenCond = rng.pick(conductors);
		const chosenIns = rng.pick(insulators);
		const testConductive = seed % 2 === 0;
		const testedItem = testConductive ? chosenCond : chosenIns;
		const voltage = rng.pick([4.5, 6]);
		const withLed = difficulty === 'hard';

		const svg = buildTestCircuitSvg({
			voltageLabel: `${voltage}V`,
			sampleName: testedItem.name,
			isConductor: testConductive,
			withLed
		});
		const imageUrl = savePhysicsSvgAsset(`phy_1am_circuit_conductors_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			testConductive
				? `يشتعل العنصر لأن ${testedItem.material} ناقل كهربائي`
				: `لا يشتعل العنصر لأن ${testedItem.material} عازل كهربائي`,
			[
				{
					text: testConductive
						? `لا يشتعل العنصر لأن ${testedItem.material} عازل كهربائي`
						: `يشتعل العنصر لأن ${testedItem.material} ناقل كهربائي`,
					diagnosticFeedback: testConductive
						? `${testedItem.material} يسمح بمرور الدقائق الكهربائية، لذا فهو ناقل وليس عازلاً.`
						: `${testedItem.material} يمنع مرور الدقائق الكهربائية، لذا فهو عازل وليس ناقلاً.`
				},
				{
					text: 'يشتعل العنصر ثم ينطفئ فوراً لأن القاطعة مفتوحة',
					diagnosticFeedback: 'لاحظ أن القاطعة K في المخطط مغلقة، والتحكم هنا يعود لنوع المادة بين A و B.'
				},
				{
					text: 'يتلف المولد فوراً بسبب وجود قطعة اختبار بين A و B',
					diagnosticFeedback: 'إدراج مادة بين A و B لا يسبب استقصاراً للمولد لوجود مستقبل (المصباح/الصمام) في الدارة.'
				}
			],
			rng
		);

		const correctObs = testConductive ? 'يتوهج' : 'لا يتوهج';
		const correctClass = testConductive ? 'ناقل كهربائي' : 'عازل كهربائي';

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في الدارة الكهربائية المقابلة (دلالة العمود $${voltage}\\text{ V}$ والقاطعة $K$ مغلقة)، أدرجنا بين المربطين $A$ و $B$ عينة من **${testedItem.name}**. ماذا نلاحظ ولماذا؟`,
			questionTextAr: `أدرجنا ${testedItem.name} بين A و B في الدارة المغلقة. ماذا يحدث؟`,
			imageUrl,
			imageCaption: `دارة اختبار الناقلية الكهربائية (${testedItem.name})`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `تُغلق الدارة عبر النواقل وتبقى مفتوحة عبر العوازل. وبما أن ${testedItem.material} **${correctClass}**، فإن المستقبل **${correctObs}**.`
		};

		const hints: [string, string, string] = [
			'تحقق أولاً من حالة القاطعة K ومن وجود مولد ومستقبل في الحلقة.',
			`صنّف مادة (${testedItem.material}): هل تسمح بمرور التيار الكهربائي أم تمنعه؟`,
			'الناقل يغلق الدارة فيشتعل المصباح، والعازل يتركها مفتوحة فلا يشتعل.'
		];
		const solutionStepsAr = [
			`المادة المدرجة بين $A$ و $B$ هي ${testedItem.name} (${testedItem.material}).`,
			`${testedItem.material} هو **${correctClass}**.`,
			`إذن: ${testConductive ? 'تُغلق الدارة وتتحرك الدقائق الكهربائية من (+) إلى (-) فيشتعل المستقبل' : 'تبقى الدارة مفتوحة ولا تتحرك الدقائق الكهربائية فلا يشتعل المستقبل'}.`
		];
		const finalAnswer = `${correctClass} — ${correctObs}`;

		const otherCond = conductors.find((c) => c.material !== chosenCond.material) ?? conductors[0];
		const otherIns = insulators.find((c) => c.material !== chosenIns.material) ?? insulators[0];

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `أنجز التلميذ سامي دارة كهربائية اختبارية باستعمال عمود كهربائي دلالته $${voltage}$ فولط ومصباح وقاطعة مغلقة، كما يوضح المخطط المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) سمِّ العناصر الكهربائية المكونة للدارة، وحدد مربطي مصباح التوهج اللذين يجب وصلهما بالأسلاك ليشتعل.`,
							answer: `1) العناصر: عمود كهربائي (مولد)، قاطعة $K$، ${withLed ? 'صمام ضوئي LED' : 'مصباح توهج $L$'}، أسلاك توصيل، وعينة اختبار بين $A$ و $B$. مربطا المصباح هما: *القتير المركزي* و *العقب*.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'دارة اختبار النواقل والعوازل'
						}
					]
				},
				{
					type: 'table',
					headers: ['المادة الموضوعة بين A و B', 'حالة المصباح (يتوهج / لا يتوهج)', 'التصنيف (ناقل / عازل)'],
					cells: [],
					rows: [
						[
							testedItem.name,
							{ content: '....................', answer: correctObs, mark: '0.5' },
							{ content: '....................', answer: correctClass, mark: '0.5' }
						],
						[
							otherCond.name,
							{ content: '....................', answer: 'يتوهج', mark: '0.5' },
							{ content: '....................', answer: 'ناقل كهربائي', mark: '0.5' }
						],
						[
							otherIns.name,
							{ content: '....................', answer: 'لا يتوهج', mark: '0.5' },
							{ content: '....................', answer: 'عازل كهربائي', mark: '0.5' }
						]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `3) عند استبدال المصباح العادي بصمام ضوئي (LED) مع وجود مادة ناقلة بين $A$ و $B$، كيف نربطه ليشتعل؟ وما جهة حركة الدقائق الكهربائية خارج المولد حسب النموذج الدوراني؟`,
					answer: `3) يجب وصل القطب الموجب للصمام الضوئي جهة القطب الموجب $(+)$ للمولد لأنه يمرر التيار في جهة واحدة فقط. وحسب النموذج الدوراني تتحرك الدقائق الكهربائية خارج المولد من القطب $(+)$ نحو القطب $(-)$.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Cell Grouping, Series & Parallel Connections
// ═══════════════════════════════════════════════════════════════════════════════
const seriesParallelCellsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_series_parallel_cells',
	grade: '1am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'ضم الأعمدة الكهربائية، الربط على التسلسل والربط على التفرع',
	curriculumLessonId: 'phy_lesson_1am_t1_circuit_connections_two_way',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cellCount = difficulty === 'easy' ? 3 : 4;
		const reversedIdx = difficulty === 'hard' ? rng.int(1, cellCount - 1) : null;
		const totalVoltage = reversedIdx === null ? cellCount * 1.5 : (cellCount - 2) * 1.5;
		const mode: 'series' | 'parallel' = seed % 2 === 0 ? 'parallel' : 'series';
		const lampRating = cellCount === 4 ? 6 : 4.5;

		const svg = buildCellsAndLampsSvg({
			cellCount,
			reversedIdx,
			mode,
			lampLabels: ['L₁', 'L₂']
		});
		const imageUrl = savePhysicsSvgAsset(`phy_1am_series_parallel_s${seed}`, svg);

		const isVoltageQuestion = difficulty === 'hard' || seed % 3 === 0;
		let quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'];
		let hints: [string, string, string];
		let solutionStepsAr: string[];
		let finalAnswer: string;

		if (isVoltageQuestion) {
			const wrongSumAll = cellCount * 1.5;
			const wrongSub = Math.max(0, totalVoltage - 1.5);
			const wrongSingle = 1.5;
			const mcq = buildUniqueMcqOptions(
				`$${totalVoltage}\\text{ V}$`,
				[
					{
						text: `$${reversedIdx !== null ? wrongSumAll : wrongSub}\\text{ V}$`,
						diagnosticFeedback:
							reversedIdx !== null
								? 'انتبه! أحد الأعمدة موضوع بشكل معكوس، لذا يجب طرح دلالته وليس جمعها.'
								: 'جميع الأعمدة في نفس الاتجاه (+ مع -)، لذا نجمع كل الدلالات.'
					},
					{
						text: `$${wrongSingle}\\text{ V}$`,
						diagnosticFeedback: 'عند ضم الأعمدة على التسلسل تزداد الدلالة الكلية ولا تبقى مساوية لعمود واحد.'
					},
					{
						text: `$${totalVoltage + 1.5}\\text{ V}$`,
						diagnosticFeedback: 'أعد عدّ الأعمدة المضمومة في المخطط وتأكد من أقطابها.'
					}
				],
				rng
			);
			finalAnswer = `${totalVoltage} V`;
			quizQuestion = {
				type: 'mcq',
				questionText: `في المخطط المقابل ضُمّت $${cellCount}$ أعمدة أسطوانية دلالة كل منها $1.5\\text{ V}$ على التسلسل${reversedIdx !== null ? ' (لاحظ أقطاب الأعمدة بدقة!)' : ' في نفس الاتجاه'}. ما هي الدلالة الكلية للمولد الناتج؟`,
				questionTextAr: `ما الدلالة الكلية للأعمدة المضمومة في المخطط؟`,
				imageUrl,
				imageCaption: 'تركيب أعمدة 1.5V مع مصباحين',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					reversedIdx === null
						? `جميع الأعمدة في نفس الاتجاه: $U = ${cellCount} \\times 1.5 = ${totalVoltage}\\text{ V}$.`
						: `عُكس عمود واحد، فـ $3$ أعمدة في جهة وعمود في الجهة المعاكسة: $U = ${(cellCount - 1) * 1.5} - 1.5 = ${totalVoltage}\\text{ V}$.`
			};
			hints = [
				'تفحص علامتي (+) و (-) لكل عمود أسطواني في أسفل المخطط.',
				'العمودان المربوطان (+ مع -) تُجمع دلالتهما، والعمود المعكوس تُطرح دلالته.',
				`دلالة كل عمود هي $1.5\\text{ V}$، اجمع وطبق الإشارة حسب اتجاه كل عمود.`
			];
			solutionStepsAr = [
				`عدد الأعمدة الكلي هو $${cellCount}$، دلالة كل عمود $1.5\\text{ V}$.`,
				reversedIdx === null
					? `كل الأعمدة موصولة (+ مع -): $U = ${cellCount} \\times 1.5 = ${totalVoltage}\\text{ V}$.`
					: `أحد الأعمدة معكوس القطبية، فالدلالة الصافية هي $U = ${totalVoltage}\\text{ V}$.`
			];
		} else {
			const correctAns =
				mode === 'parallel'
					? 'يبقى المصباح L₂ مشتعلاً بإضاءة عادية'
					: 'ينطفئ المصباح L₂ لأن الدارة أصبحت مفتوحة';
			const mcq = buildUniqueMcqOptions(
				correctAns,
				[
					{
						text:
							mode === 'parallel'
								? 'ينطفئ المصباح L₂ فوراً'
								: 'يبقى المصباح L₂ مشتعلاً وبشدة أكبر',
						diagnosticFeedback:
							mode === 'parallel'
								? 'المصباحان مربوطان على التفرع! لكل مصباح حلقة مستقلة مع المولد.'
								: 'المصباحان مربوطان على التسلسل في حلقة واحدة؛ نزع أحدهما يفتح الدارة.'
					},
					{
						text: 'يتلف المولد الكهربائي فوراً',
						diagnosticFeedback: 'نزع مصباح لا يسبب استقصاراً للمولد ولا يتلفه.'
					},
					{
						text: 'تتضاعف دلالة العمود تلقائياً',
						diagnosticFeedback: 'دلالة العمود ثابتة ولا تتغير بنزع مصباح.'
					}
				],
				rng
			);
			finalAnswer = correctAns;
			quizQuestion = {
				type: 'mcq',
				questionText: `انظر إلى المخطط المقابل (المصباحان $L_1$ و $L_2$ مربوطان على **${mode === 'parallel' ? 'التفرع' : 'التسلسل'}**). إذا نزعنا المصباح $L_1$ من غمده، ماذا يحدث للمصباح $L_2$؟`,
				questionTextAr: `في المخطط المقابل، ماذا يحدث للمصباح L₂ عند نزع L₁؟`,
				imageUrl,
				imageCaption: `دارة مصباحين على ${mode === 'parallel' ? 'التفرع' : 'التسلسل'}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					mode === 'parallel'
						? 'في الربط على التفرع لكل مصباح حلقة مستقلة مع المولد، لذا يبقى $L_2$ مشتعلاً.'
						: 'في الربط على التسلسل توجد حلقة واحدة فقط، ونزع $L_1$ يفتح الدارة فينطفئ $L_2$.'
			};
			hints = [
				'حدد نوع ربط المصباحين $L_1$ و $L_2$: هل هما في حلقة واحدة أم في حلقتين متوازيتين؟',
				'تتبع مسار الدقائق الكهربائية من المولد إلى $L_2$ بعد إزالة $L_1$.',
				mode === 'parallel'
					? 'في التفرع تبقى حلقة $L_2$ مغلقة.'
					: 'في التسلسل تنقطع الحلقة الوحيدة.'
			];
			solutionStepsAr = [
				`المصباحان $L_1$ و $L_2$ مربوطان على **${mode === 'parallel' ? 'التفرع' : 'التسلسل'}**.`,
				`عند نزع $L_1$: ${correctAns}.`
			];
		}

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `يتوفر التلميذ في المخبر على $${cellCount}$ أعمدة كهربائية دلالة كل منها $1.5$ فولط ومصباحين متماثلين $L_1$ و $L_2$ دلالة كل منهما $${lampRating}$ فولط.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد نوع ربط المصباحين $L_1$ و $L_2$ في المخطط المقابل، ثم احسب الدلالة الكلية لمجموعة الأعمدة المضمومة (مع مراعاة الأقطاب في الرسم).`,
							answer: `1) الربط بين المصباحين هو ربط على *${mode === 'parallel' ? 'التفرع' : 'التسلسل'}*. الدلالة الكلية للأعمدة: $${reversedIdx === null ? `${cellCount} times 1.5 = ${totalVoltage}` : `${(cellCount - 1) * 1.5} - 1.5 = ${totalVoltage}`}$ فولط.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط ضم الأعمدة والمصباحين'
						}
					]
				},
				{
					type: 'text',
					content: `2) ${reversedIdx !== null ? 'هل تتوافق الدلالة الناتجة مع دلالة المصباحين؟ كيف نصحح تركيب الأعمدة؟' : `لماذا يشتعل المصباحان بشكل ${mode === 'parallel' ? 'عادي وقوي' : 'ضعيف'} في هذا التركيب؟`}`,
					answer:
						reversedIdx !== null
							? `2) لا تتوافق لأن $${totalVoltage} < ${lampRating}$ فولط (إضاءة ضعيفة). نصحح التركيب بقلب العمود المعكوس ليصبح الربط $(+ " مع " -)$ فتصبح الدلالة $${lampRating}$ فولط.`
							: `2) ${mode === 'parallel' ? `في التفرع يتغذى كل مصباح مباشرة بدلالة $${totalVoltage}$ فولط المطابقة لدلالته فتكون الإضاءة عادية.` : `في التسلسل تتوزع دلالة المولد ($${totalVoltage}$ فولط) بين المصباحين فتكون إضاءتهما ضعيفة.`}`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) عند نزع المصباح $L_1$ من غمده، ماذا يحدث لإضاءة المصباح $L_2$؟ علل إجابتك.`,
					answer: `3) ${mode === 'parallel' ? 'يبقى المصباح $L_2$ مشتعلاً لأن لكل مصباح حلقة مستقلة مع المولد.' : 'ينطفئ المصباح $L_2$ لأن الربط على التسلسل يشكل حلقة واحدة تنفتح بنزع $L_1$.'}`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Two-Way Switch Circuit (ذهاب-إياب) & Truth Table
// ═══════════════════════════════════════════════════════════════════════════════
const twoWayTruthTableTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_two_way_truth_table',
	grade: '1am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'دارة الإنارة من مكانين (ذهاب - إياب) وجدول الحقيقة',
	curriculumLessonId: 'phy_lesson_1am_t1_circuit_connections_two_way',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const k1Pos: 1 | 2 = seed % 2 === 0 ? 1 : 2;
		const k2Pos: 1 | 2 = difficulty === 'easy' ? k1Pos : (seed % 3 === 0 ? k1Pos : k1Pos === 1 ? 2 : 1);
		const lit = k1Pos === k2Pos;
		const place = rng.pick(['رواق المنزل', 'السلالم', 'قاعة الاستقبال', 'غرفة النوم']);

		const svg = buildTwoWaySvg(k1Pos, k2Pos, lit);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_two_way_s${seed}`, svg);

		const toggleTarget = rng.pick(['K₁', 'K₂']);
		const nextLit = !lit;
		const correctChoice =
			difficulty === 'hard'
				? nextLit
					? 'يشتعل المصباح L'
					: 'ينطفئ المصباح L'
				: lit
					? 'يشتعل المصباح L لأن الدارة مغلقة'
					: 'لا يشتعل المصباح L لأن الدارة مفتوحة';

		const mcq = buildUniqueMcqOptions(
			correctChoice,
			difficulty === 'hard'
				? [
						{
							text: nextLit ? 'يبقى المصباح منطفئاً' : 'يبقى المصباح مشتعلاً',
							diagnosticFeedback: `تغيير موضع القاطعة ${toggleTarget} يقلب حالة التوافق بين القاطعتين ($1$-$1$ أو $2$-$2$).`
						},
						{
							text: 'يحدث استقصار في الدارة',
							diagnosticFeedback: 'تغيير موضع قاطعة ذهاب-إياب لا يربط قطبي المولد مباشرة ببعضهما.'
						},
						{
							text: 'يتلف المصباح فوراً',
							diagnosticFeedback: 'الدارة سليمة وتتحكم فقط في فتح وغلق المسار.'
						}
					]
				: [
						{
							text: lit
								? 'لا يشتعل المصباح L لأن الدارة مفتوحة'
								: 'يشتعل المصباح L لأن الدارة مغلقة',
							diagnosticFeedback:
								'تتبع السلك الواصل بين القاطعتين K₁ و K₂: هل يشكلان مساراً متصلاً أم منقطعاً؟'
						},
						{
							text: 'يحدث استقصار للمولد الكهربائي',
							diagnosticFeedback: 'في دارة ذهاب-إياب لا تتصل أطراف المولد مباشرة دون المرور بالمصباح.'
						},
						{
							text: 'يضيء المصباح بنصف شدته فقط',
							diagnosticFeedback: 'المصباح إما أن يشتعل بشكل عادي أو ينطفئ تماماً.'
						}
					],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText:
				difficulty === 'hard'
					? `في دارة إنارة **${place}** المبينة في المخطط، القاطعة $K_1$ في الوضع $${k1Pos}$ والقاطعة $K_2$ في الوضع $${k2Pos}$. إذا غيّرنا موضع القاطعة **$${toggleTarget}$** فقط، ماذا يحدث للمصباح $L$؟`
					: `في المخطط المقابل لدارة **ذهاب-إياب** الخاصة بإنارة **${place}**، القاطعة $K_1$ في الوضع $${k1Pos}$ والقاطعة $K_2$ في الوضع $${k2Pos}$. ما حالة المصباح $L$ في هذا الوضع؟`,
			questionTextAr: `K₁ في الوضع ${k1Pos} و K₂ في الوضع ${k2Pos}. ما حالة المصباح L؟`,
			imageUrl,
			imageCaption: `دارة ذهاب-إياب: K₁=${k1Pos} و K₂=${k2Pos}`,
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation:
				difficulty === 'hard'
					? `كان المصباح ${lit ? 'مشتعلاً' : 'منطفئاً'}، وبتغيير موضع ${toggleTarget} ${nextLit ? 'تصبح القاطعتان في نفس الوضع فيشتعل' : 'تختلف القاطعتان في الوضع فينطفئ'} المصباح.`
					: lit
						? `بما أن $K_1$ و $K_2$ في نفس الوضع ($${k1Pos}$)، فالدارة مغلقة ويشتعل المصباح.`
						: `بما أن $K_1$ في الوضع $${k1Pos}$ و $K_2$ في الوضع $${k2Pos}$، فالدارة مفتوحة ولا يشتعل المصباح.`
		};

		const hints: [string, string, string] = [
			'تأمل موضع ذراع القاطعة K₁ وموضع ذراع القاطعة K₂.',
			'تُغلق الدارة فقط عندما تتصل القاطعتان بنفس السلك الناقل بينهما (1-1 أو 2-2).',
			'إذا كانا في وضعين مختلفين (1-2 أو 2-1) تكون الدارة مفتوحة.'
		];
		const solutionStepsAr = [
			`في الرسم: القاطعة $K_1$ في الوضع $${k1Pos}$ و $K_2$ في الوضع $${k2Pos}$.`,
			`حالة المصباح الابتدائية: ${lit ? 'يشتعل (الوضعان متماثلان)' : 'منطفئ (الوضعان مختلفان)'}.`,
			difficulty === 'hard' ? `بعد تغيير ${toggleTarget}: ${correctChoice}.` : `إذن: ${correctChoice}.`
		];
		const finalAnswer = correctChoice;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `أراد كهربائي تركيب دارة لإنارة مصباح **${place}** بحيث يمكن تشغيله وإطفاؤه من مكانين متباعدين باستعمال قاطعتين $K_1$ و $K_2$ كما في المخطط المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) ما اسم هذه الدارة الكهربائية؟ وما نوع القاطعتين $K_1$ و $K_2$ المستعملتين فيها؟\n\n2) في الوضع المرسوم ($K_1 = ${k1Pos}$ و $K_2 = ${k2Pos}$)، هل يشتعل المصباح $L$؟ علل.`,
							answer: `1) تسمى دارة *ذهاب - إياب*، وتُستعمل فيها قاطعتان من نوع *ذهاب - إياب* (بثلاثة مرابط).\n\n2) ${lit ? `نعم، يشتعل المصباح لأن القاطعتين في نفس الوضع ($${k1Pos}$–$${k2Pos}$) فالدارة مغلقة.` : `لا، لا يشتعل المصباح لأن القاطعتين في وضعين مختلفين ($${k1Pos}$–$${k2Pos}$) فالدارة مفتوحة.`}`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط دارة ذهاب - إياب'
						}
					]
				},
				{
					type: 'text',
					content: `3) أكمل جدول الحقيقة التالي للدارة (اكتب: متوهج / منطفئ، أو 1 / 0):`,
					mark: '0'
				},
				{
					type: 'table',
					headers: ['وضع القاطعة K₁', 'وضع القاطعة K₂', 'حالة المصباح L'],
					cells: [],
					rows: [
						['1', '1', { content: '................', answer: 'متوهج (1)', mark: '0.75' }],
						['1', '2', { content: '................', answer: 'منطفئ (0)', mark: '0.75' }],
						['2', '1', { content: '................', answer: 'منطفئ (0)', mark: '0.75' }],
						['2', '2', { content: '................', answer: 'متوهج (1)', mark: '0.75' }]
					],
					headerBackground: true,
					borders: 'grid',
					width: 'full'
				},
				{
					type: 'text',
					content: `4) اذكر مثالاً آخر من المنزل تُستعمل فيه هذه الدارة، ووضح ما يحدث للمصباح إذا ضغطنا على القاطعة ${toggleTarget} انطلاقاً من الوضع المرسوم.`,
					answer: `4) مثال: السلالم أو غرفة النوم بمدخلين. عند الضغط على ${toggleTarget} يتغير وضعه، وبالتالي ${nextLit ? 'يشتعل المصباح' : 'ينطفئ المصباح'}.`,
					mark: '1'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Short Circuit & Electrical Protection (Fuse / Insulation)
// ═══════════════════════════════════════════════════════════════════════════════
const shortCircuitFuseTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_short_circuit_fuse',
	grade: '1am',
	trimesterId: 't1',
	domain: 'electricity',
	titleAr: 'الدارة المستقصرة وآثارها ووسائل الحماية الكهربائية',
	curriculumLessonId: 'phy_lesson_1am_t1_short_circuit_safety',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const modes: Array<'series_l1' | 'series_l2' | 'parallel_l1'> =
			difficulty === 'easy'
				? ['series_l1', 'series_l2']
				: ['series_l1', 'series_l2', 'parallel_l1'];
		const mode = rng.pick(modes);
		const withFuse = difficulty !== 'easy';

		const svg = buildShortCircuitSvg({ mode, withFuse });
		const imageUrl = savePhysicsSvgAsset(`phy_1am_short_circuit_s${seed}`, svg);

		const correctObs =
			mode === 'series_l1'
				? 'ينطفئ L₁ ويزداد توهج L₂'
				: mode === 'series_l2'
					? 'ينطفئ L₂ ويزداد توهج L₁'
					: 'ينطفئ كل من L₁ و L₂ ويسخن المولد (وتنصهر المنصهرة)';

		const mcq = buildUniqueMcqOptions(
			correctObs,
			[
				{
					text: mode === 'parallel_l1' ? 'ينطفئ L₁ ويزداد توهج L₂' : 'ينطفئ L₁ و L₂ معاً ولا يمر أي تيار',
					diagnosticFeedback:
						mode === 'parallel_l1'
							? 'في التفرع، استقصار فرع واحد يعني استقصار المولد نفسه فينطفئ كل شيء!'
							: 'في التسلسل يبقى المصباح غير المستقصر في مسار التيار عبر سلك الاستقصار فيزداد توهجه.'
				},
				{
					text: mode === 'series_l1' ? 'ينطفئ L₂ ويزداد توهج L₁' : 'يبقى المصباحان بنفس التوهج العادي',
					diagnosticFeedback: 'المصباح الموصول على طرفيه سلك الاستقصار هو الذي ينطفئ لأن التيار يمر عبر السلك.'
				},
				{
					text: 'ينفجر المصباح المستقصر فقط دون تأثر الدارة',
					diagnosticFeedback: 'لا ينفجر المصباح المستقصر بل ينطفئ لأن الدقائق الكهربائية تتجنبه وتمر في السلك الناقل.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في الدارة الموضحة بالمخطط (ربط على **${mode === 'parallel_l1' ? 'التفرع' : 'التسلسل'}**)، وصلنا سلكاً ناقلاً بين مربطي ${mode === 'series_l2' ? '$L_2$' : '$L_1$'}. ما النتيجة الصحيحة؟`,
			questionTextAr: `وصلنا سلك استقصار في المخطط المقابل. ماذا يحدث للمصباحين؟`,
			imageUrl,
			imageCaption: 'مخطط الدارة المستقصرة',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation:
				mode === 'parallel_l1'
					? 'استقصار فرع في دارة التفرع يربط قطبي المولد مباشرة ببعضهما فيستقصر المولد، وينطفئ المصباحان وتنصهر المنصهرة.'
					: `يمر التيار عبر السلك المستقصر بدل المصباح المستقصر فينطفئ هذا الأخير وتصل دلالة المولد كاملة للمصباح الآخر فيزداد توهجه.`
		};

		const hints: [string, string, string] = [
			'حدد أولاً نوع الربط بين المصباحين $L_1$ و $L_2$ (تسلسل أم تفرع).',
			'تتبع مسار الدقائق الكهربائية من القطب (+) إلى (-): تفضّل السلك الناقل الخالي من المصابيح.',
			mode === 'parallel_l1'
				? 'في التفرع، استقصار مصباح يساوي استقصار المولد!'
				: 'في التسلسل، المصباح الذي يمر عبره السلك البديل ينطفئ ويزداد توهج الآخر.'
		];
		const solutionStepsAr = [
			`المصباحان مربوطان على **${mode === 'parallel_l1' ? 'التفرع' : 'التسلسل'}**.`,
			`تم استقصار ${mode === 'series_l2' ? '$L_2$' : '$L_1$'} بسلك ناقل.`,
			`النتيجة: ${correctObs}.`
		];
		const finalAnswer = correctObs;

		const sujetExercise: ExerciseBlock = {
			points: 6,
			instruction: `ركّب تلميذ دارة كهربائية تضم مولداً $4.5$ فولط ومصباحين $L_1$ و $L_2$ على **${mode === 'parallel_l1' ? 'التفرع' : 'التسلسل'}**${withFuse ? ' مع منصهرة للحماية' : ''}، ثم وصل بالخطأ سلكاً ناقلاً بين مربطي ${mode === 'series_l2' ? '$L_2$' : '$L_1$'} كما في الشكل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) كيف نسمي هذه الحالة الفيزيائية الحادثة في الدارة؟\n\n2) صف ماذا يحدث للمصباحين $L_1$ و $L_2$ وفسّر ذلك باستعمال النموذج الدوراني للتيار الكهربائي.`,
							answer: `1) تسمى *الدارة المستقصرة* (الاستقصار).\n\n2) ${correctObs}؛ لأن الدقائق الكهربائية تمر عبر السلك الناقل الأسهل ولا تمر عبر المصباح المستقصر.`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'مخطط الدارة المستقصرة'
						}
					]
				},
				{
					type: 'true_false',
					items: [
						{
							q: 'يؤدي استقصار المولد الكهربائي إلى سخونة الأسلاك وتلف المولد وقد يسبب حريقاً.',
							a: 'صحيح',
							c: 'العبارة صحيحة تماماً.',
							mark: '1'
						},
						{
							q: 'تُركب المنصهرة على التفرع مع المولد وتعمل على زيادة إضاءة المصابيح.',
							a: 'خاطئ',
							c: 'تُركب المنصهرة على التسلسل وتفتح الدارة بانصهار شعيرتها عند حدوث استقصار.',
							mark: '1'
						}
					]
				},
				{
					type: 'text',
					content: `4) اذكر وسيلتين أساسيتين لحماية التركيبة المنزلية والأشخاص من أخطار الاستقصار الكهربائي (مع التذكير بخطورة كهرباء القطاع $220$ فولط مقارنة ببطارية $4.5$ فولط).`,
					answer: `4) عزل الأسلاك النحاسية بتغليفها بالبلاستيك، وتركيب المنصهرة والقاطع الآلي/التفاضلي. كهرباء القطاع ($220$ فولط) خطيرة وقاتلة للإنسان عكس بطاريات الأعمدة المنخفضة التوتر ($4.5$ فولط).`,
					mark: '2'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration T1 #1: Home Hallway & Bedroom Electrical Troubleshooting
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHomeHallwayTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_integration_home_hallway',
	grade: '1am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (1): صيانة إنارة رواق وغرف المنزل والأمن الكهربائي',
	curriculumLessonId: 'phy_lesson_1am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const lampV = rng.pick([4.5, 6]);
		const neededCells = lampV === 4.5 ? 3 : 4;
		const k1Pos: 1 | 2 = seed % 2 === 0 ? 1 : 2;
		const k2Pos: 1 | 2 = k1Pos === 1 ? 2 : 1;

		const svg = wrapPhysicsSvg(
			420,
			195,
			`<rect x="10" y="10" width="400" height="175" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وثيقة (1): تركيبة مصباح الرواق (ذهاب-إياب) وغرفتين على التفرع</text>` +
				`<rect x="35" y="48" width="165" height="118" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>` +
				`<text x="117" y="66" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">الرواق: K₁=${k1Pos} و K₂=${k2Pos}</text>` +
				`<circle cx="117" cy="108" r="14" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.6"/>` +
				`<line x1="107" y1="98" x2="127" y2="118" stroke="#0f172a" stroke-width="1.4"/><line x1="107" y1="118" x2="127" y2="98" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="117" y="144" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">مصباح L₁ (${lampV}V)</text>` +
				`<rect x="220" y="48" width="165" height="118" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>` +
				`<text x="302" y="66" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">الغرفتان: L₂ و L₃ على التفرع</text>` +
				`<line x1="245" y1="102" x2="360" y2="102" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4,2"/>` +
				`<text x="302" y="94" text-anchor="middle" font-size="10" font-weight="bold" fill="#dc2626">تلامس سلكين عاريين عند L₂!</text>` +
				`<rect x="255" y="122" width="95" height="26" rx="4" fill="#fee2e2" stroke="#dc2626"/>` +
				`<text x="302" y="139" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">القاطع يفصل الدارة</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t1_integ_home_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`استعمال ${neededCells} أعمدة 1.5V على التسلسل (+ مع -) وعزل الأسلاك العارية وإغلاق K₁ أو K₂ لتوافقهما`,
			[
				{
					text: `استعمال عمودين 1.5V فقط وترك الأسلاك العارية دون تغيير`,
					diagnosticFeedback: `عمودان يعطيان 3V فقط وهي غير كافية لمصباح ${lampV}V، وترك الأسلاك العارية يسبب استقصاراً.`
				},
				{
					text: `ربط المصباحين L₂ و L₃ على التسلسل لكي لا ينطفئا معاً`,
					diagnosticFeedback: 'في التسلسل إضاءة المصابيح ضعيفة وإذا تلف أحدها تنطفئ كلها!'
				},
				{
					text: `استبدال القاطع بسلك نحاسي سميك لكي لا يفصل الدارة`,
					diagnosticFeedback: 'هذا تصرف خطير جداً! القاطع يحمي المنزل من الحريق عند الاستقصار.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في مجسم بيت أنجزه أمين، مصابيحه دلالتها $${lampV}\\text{ V}$. لا يشتعل مصباح الرواق ($K_1=${k1Pos}, K_2=${k2Pos}$)، وفي دارة الغرفتين (تفرع) تلامس سلكان عاريان عند $L_2$ ففصل القاطع الدارة. ما التصرف العلمي الصحيح لإصلاح كل المجسم؟`,
			questionTextAr: `كيف نصلح مصباح الرواق (${lampV}V) وعطب الغرفتين في المجسم؟`,
			imageUrl,
			imageCaption: 'سند الوضعية الإدماجية: مجسم إنارة المنزل',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: `نحتاج $${neededCells}$ أعمدة من $1.5\\text{ V}$ على التسلسل لمطابقة $${lampV}\\text{ V}$، ونعزل الأسلاك العارية لمنع الاستقصار، ونضع $K_1$ و $K_2$ في نفس الوضع لإشعال مصباح الرواق.`
		};

		const hints: [string, string, string] = [
			'اقسم دلالة المصباح على $1.5\\text{ V}$ لتحديد عدد الأعمدة اللازمة.',
			'تلامس سلكين عاريين في دارة التفرع يسبب دارة مستقصرة.',
			'يضيء مصباح ذهاب-إياب عندما تتوافق القاطعتان ($1$-$1$ أو $2$-$2$).'
		];
		const solutionStepsAr = [
			`عدد الأعمدة اللازمة: $${lampV} \\div 1.5 = ${neededCells}$ أعمدة مضمومة على التسلسل (+ مع -).`,
			`فصل القاطع سببه **دارة مستقصرة** نتيجة تلامس السلكين العاريين عند $L_2$.`,
			`إصلاح الخلل: عزل الأسلاك العارية بشريط عازل، وضبط $K_1$ و $K_2$ في نفس الوضع.`
		];
		const finalAnswer = `${neededCells} أعمدة + عزل الأسلاك لمنع الاستقصار + توفيق K₁ و K₂`;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `بمناسبة معرض العلوم في المتوسطة، أنجز أمين مجسماً كهربائياً لمنزل يضم مصباح الرواق $L_1$ ومصباحي غرفتين $L_2$ و $L_3$، دلالة كل مصباح $${lampV}$ فولط، لكن عند التجريب واجه عدة مشاكل كما يبيّن السند المقابل:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) يملك أمين أعمدة أسطوانية صغيرة دلالة كل منها $1.5$ فولط فقط. كم عموداً يحتاج لتشغيل المصابيح بإضاءة عادية؟ وكيف يربط أقطابها؟`,
							answer: `1) يحتاج إلى $${neededCells}$ أعمدة ($${neededCells} times 1.5 = ${lampV}$ فولط)، ويربطها على التسلسل بحيث يتصل القطب الموجب $(+)$ للعمود الأول بالقطب السالب $(-)$ للعمود الثاني وهكذا.`,
							mark: '2.5'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'سند الوضعية الإدماجية'
						}
					]
				},
				{
					type: 'text',
					content: `2) في دارة الغرفتين المربوطة على التفرع، لاحظ أمين تلامس سلكين عاريين قرب $L_2$ مما أدى لانطفاء كل المجسم وسخونة البطارية. سمّ هذه الظاهرة وفسّر انطفاء $L_3$ أيضاً رغم عدم تلامس أسلاكه، ثم اقترح حلاً وقائياً.`,
					answer: `2) الظاهرة هي *الدارة المستقصرة* (استقصار المولد). بما أن $L_2$ و $L_3$ على التفرع، فإن استقصار فرع $L_2$ يستقصر المولد مباشرة فينطفئ كل من $L_2$ و $L_3$. الحل: عزل الأسلاك بشريط بلاستيكي وإدراج *منصهرة* للحماية.`,
							mark: '3'
				},
				{
					type: 'text',
					content: `3) في الرواق، كانت القاطعتان $K_1$ في الوضع $${k1Pos}$ و $K_2$ في الوضع $${k2Pos}$ فلم يشتعل $L_1$. لماذا لم يشتعل؟ وماذا يفعل أمين من أمام باب الغرفة لإشعاله؟`,
					answer: `3) لم يشتعل $L_1$ لأن القاطعتين في وضعين مختلفين ($${k1Pos}$ و $${k2Pos}$) فالدارة مفتوحة. لإشعاله يغيّر القاطعة $K_2$ إلى الوضع $${k1Pos}$ لتتطابق القاطعتان في نفس الوضع ($${k1Pos}$–$${k1Pos}$).`,
					mark: '2.5'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Integration T1 #2: School Workshop Mixed Circuit & Safety Design
// ═══════════════════════════════════════════════════════════════════════════════
const integrationLabInstallationTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1am_t1_integration_lab_installation',
	grade: '1am',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وضعية إدماجية (2): دراسة تركيبة كهربائية مختلطة وصيانة كاشف الناقلية',
	curriculumLessonId: 'phy_lesson_1am_t1_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const sampleLiquid = rng.pick([
			{ name: 'ماء معدني (مالح)', conductive: true },
			{ name: 'ماء مقطر', conductive: false }
		]);
		const faultyLamp = seed % 2 === 0 ? 'L₁' : 'L₂';

		const svg = wrapPhysicsSvg(
			420,
			195,
			`<rect x="10" y="10" width="400" height="175" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">وثيقة التركيبة المختلطة (L₁ في الفرع الرئيسي، L₂ و L₃ على التفرع)</text>` +
				`<polyline fill="none" stroke="#0f172a" stroke-width="1.8" points="48,52 48,158 370,158 370,52 48,52"/>` +
				`<line x1="215" y1="52" x2="215" y2="110" stroke="#0f172a" stroke-width="1.8"/>` +
				`<line x1="215" y1="110" x2="370" y2="110" stroke="#0f172a" stroke-width="1.8"/>` +
				// Cell
				`<rect x="33" y="94" width="30" height="20" fill="#ffffff"/>` +
				`<line x1="33" y1="99" x2="63" y2="99" stroke="#0f172a" stroke-width="2"/>` +
				`<line x1="40" y1="107" x2="56" y2="107" stroke="#0f172a" stroke-width="3.2"/>` +
				`<text x="72" y="108" font-size="10.5" font-weight="bold" fill="#1e3a8a">4.5V</text>` +
				// L1 on main top branch
				`<circle cx="130" cy="52" r="12" fill="#fef9c3" stroke="#0f172a" stroke-width="1.6"/>` +
				`<line x1="122" y1="44" x2="138" y2="60" stroke="#0f172a" stroke-width="1.4"/><line x1="122" y1="60" x2="138" y2="44" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="130" y="37" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₁</text>` +
				// L2 and L3 parallel
				`<circle cx="292" cy="52" r="12" fill="#fef9c3" stroke="#0f172a" stroke-width="1.6"/>` +
				`<line x1="284" y1="44" x2="300" y2="60" stroke="#0f172a" stroke-width="1.4"/><line x1="284" y1="60" x2="300" y2="44" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="292" y="37" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₂</text>` +
				`<circle cx="292" cy="110" r="12" fill="#fef9c3" stroke="#0f172a" stroke-width="1.6"/>` +
				`<line x1="284" y1="102" x2="300" y2="118" stroke="#0f172a" stroke-width="1.4"/><line x1="284" y1="118" x2="300" y2="102" stroke="#0f172a" stroke-width="1.4"/>` +
				`<text x="292" y="135" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">L₃</text>` +
				// Terminals A-B at bottom
				`<circle cx="135" cy="158" r="3" fill="#dc2626"/><circle cx="195" cy="158" r="3" fill="#dc2626"/>` +
				`<rect x="140" y="148" width="50" height="20" rx="3" fill="#dbeafe" stroke="#2563eb"/>` +
				`<text x="165" y="162" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1e40af">A  B</text>` +
				`<text x="275" y="176" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">اختبار ${esc(sampleLiquid.name)} بين A و B</text>`
		);
		const imageUrl = savePhysicsSvgAsset(`phy_1am_t1_integ_lab_s${seed}`, svg);

		const correctOutcome = !sampleLiquid.conductive
			? 'تنطفئ جميع المصابيح لأن السائل عازل يفتح الفرع الرئيسي'
			: faultyLamp === 'L₁'
				? 'تنطفئ جميع المصابيح لأن L₁ في الفرع الرئيسي'
				: 'يبقى L₁ و L₃ مشتعلين وينطفئ L₂ فقط';

		const mcq = buildUniqueMcqOptions(
			correctOutcome,
			[
				{
					text: sampleLiquid.conductive
						? faultyLamp === 'L₁'
							? 'يبقى L₂ و L₃ مشتعلين'
							: 'تنطفئ جميع المصابيح لأن الدارة كلها على التسلسل'
						: 'تشتعل المصابيح كلها لأن الماء ناقل دائماً',
					diagnosticFeedback: !sampleLiquid.conductive
						? 'الماء المقطر عازل كهربائي! أما الماء المعدني/المالح فناقل.'
						: faultyLamp === 'L₁'
							? 'المصباح L₁ موجود في الفرع الرئيسي للدارة، فتلفه يقطع التيار عن الكل.'
							: 'المصباحان L₂ و L₃ مربوطان على التفرع فيما بينهما، فتلف L₂ لا يقطع التيار عن L₃.'
				},
				{
					text: 'يزداد توهج كل المصابيح المتبقية للضعف',
					diagnosticFeedback: 'تلف مصباح يفتح فرعه فقط ولا يسبب زيادة مفاجئة للضعف في كل الدارة.'
				},
				{
					text: 'يحدث استقصار في العمود الكهربائي',
					diagnosticFeedback: 'تلف مصباح أو وضع عازل يفتح الدارة ولا يسبب استقصاراً.'
				}
			],
			rng
		);

		const quizQuestion: PhysicsGeneratedExerciseInstance['quizQuestion'] = {
			type: 'mcq',
			questionText: `في التركيبة المختلطة المقابلة، وضعنا بين المربطين $A$ و $B$ وعاءً به **${sampleLiquid.name}**، ثم تلف المصباح **$${faultyLamp}$**. ماذا نلاحظ؟`,
			questionTextAr: `وضعنا ${sampleLiquid.name} بين A و B وتلف ${faultyLamp}. ما النتيجة؟`,
			imageUrl,
			imageCaption: 'تركيبة مختلطة مع نقطتي اختبار A و B',
			questionData: {
				options: mcq.options,
				correctIndices: mcq.correctIndices,
				correctIndexes: mcq.correctIndices
			},
			explanation: !sampleLiquid.conductive
				? `${sampleLiquid.name} عازل كهربائي في الفرع الرئيسي، لذا تنطفئ جميع المصابيح.`
				: faultyLamp === 'L₁'
					? `الماء المالح ناقل، لكن تلف $L_1$ في الفرع الرئيسي يقطع الدارة عن كل المصابيح.`
					: `الماء المالح ناقل، وبما أن $L_2$ و $L_3$ على التفرع فإن تلف $L_2$ يترك $L_1$ و $L_3$ مشتعلين.`
		};

		const hints: [string, string, string] = [
			`تحقق أولاً هل (${sampleLiquid.name}) ناقل أم عازل كهربائي.`,
			'انظر إلى موقع $L_1$ (في الفرع الرئيسي) وموقع $L_2, L_3$ (متفرعان).',
			'إذا انقطع الفرع الرئيسي تنطفئ كل المصابيح، وإذا انقطع فرع $L_2$ فقط يبقى $L_3$ و $L_1$ مشتعلين.'
		];
		const solutionStepsAr = [
			`تصنيف السائل: ${sampleLiquid.name} هو ${sampleLiquid.conductive ? 'ناقل كهربائي' : 'عازل كهربائي'}.`,
			`موقع المصباح التالف $${faultyLamp}$: ${faultyLamp === 'L₁' ? 'في الفرع الرئيسي' : 'في أحد الفرعين المتوازيين'}.`,
			`النتيجة النهائية: ${correctOutcome}.`
		];
		const finalAnswer = correctOutcome;

		const sujetExercise: ExerciseBlock = {
			customTitle: 'الوضعية الإدماجية',
			points: 8,
			instruction: `في حصة الأعمال المخبرية، أنجز فوج من التلاميذ تركيبة مختلطة لثلاثة مصابيح متماثلة $L_1, L_2, L_3$ مع بطارية $4.5$ فولط ونقطتي اختبار $A$ و $B$ كما في الوثيقة المقابلة:`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1.15fr'],
					children: [
						{
							type: 'text',
							content: `1) حدد كيف رُبط المصباحان $L_2$ و $L_3$ فيما بينهما، وكيف رُبط المصباح $L_1$ بالنسبة لهما.`,
							answer: `1) المصباحان $L_2$ و $L_3$ مربوطان على *التفرع* فيما بينهما، والمصباح $L_1$ مربوط معهما على *التسلسل* في الفرع الرئيسي (ربط مختلط).`,
							mark: '2'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'التركيبة المختلطة مع المربطين A و B'
						}
					]
				},
				{
					type: 'text',
					content: `2) غمرنا سلكي $A$ و $B$ في **${sampleLiquid.name}**. هل تشتعل المصابيح؟ علّل إجابتك، ثم وضح ماذا يحدث إذا استبدلنا هذا السائل بالماء ${sampleLiquid.conductive ? 'المقطر' : 'المعدني المالح'}.`,
					answer: `2) ${sampleLiquid.conductive ? 'نعم، تشتعل المصابيح لأن الماء المعدني/المالح ناقل كهربائي يغلق الدارة. وعند استبداله بالماء المقطر لا تشتعل المصابيح لأنه عازل.' : 'لا تشتعل المصابيح لأن الماء المقطر عازل كهربائي يترك الدارة مفتوحة. وعند استبداله بالماء المالح تشتعل المصابيح لأنه ناقل.'}`,
					mark: '3'
				},
				{
					type: 'text',
					content: `3) في حالة اشتغال الدارة بسائل ناقل بين $A$ و $B$:\n\nأ) إذا تلف المصباح $${faultyLamp}$، أي المصابيح تبقى مشتعلة؟ علل.\n\nب) اقترح تعديلاً واحداً لإضافة الحماية إلى هذه الدارة المخبرية وتجنب خطورة استقصار البطارية.`,
					answer: `3) أ) ${faultyLamp === 'L₁' ? 'تنطفئ جميع المصابيح لأن $L_1$ يقع في الفرع الرئيسي فيقطع مرور الدقائق الكهربائية.' : 'يبقى $L_1$ و $L_3$ مشتعلين لأن $L_3$ موصول على التفرع ويمر عبره التيار من وإلى $L_1$.'}\n\nب) إدراج *منصهرة* على التسلسل في الفرع الرئيسي وعزل جميع الأسلاك المكشوفة.`,
					mark: '3'
				}
			] as ContentBlock[]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1am',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints,
			solutionStepsAr,
			finalAnswer
		};
	}
};

export const PHYSICS_TEMPLATES_1AM_T1: PhysicsParameterizedTemplate[] = [
	circuitSymbolsConductorsTemplate,
	seriesParallelCellsTemplate,
	twoWayTruthTableTemplate,
	shortCircuitFuseTemplate,
	integrationHomeHallwayTemplate,
	integrationLabInstallationTemplate
];
