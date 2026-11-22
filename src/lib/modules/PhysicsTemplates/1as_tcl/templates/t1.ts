import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { chemSpecies } from '../../chem-helpers';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// FreeMono-Free Custom SVG Builders for 1AS TCL T1
// ═══════════════════════════════════════════════════════════════════════════════

function buildCopperSulfateTestSvg(sampleName: string, hasWater: boolean, boilTemp: number): string {
	let body = `<defs>
		<marker id="csArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="178" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">اختبار الكشف عن الماء بكبريتات النحاس اللامائية</text>`;

	// Left: White powder before
	body += `<rect x="20" y="40" width="150" height="92" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="95" y="57" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#334155">كبريتات النحاس اللامائية</text>`;
	body += `<path d="M 52 96 Q 95 112 138 96 Z" fill="#f1f5f9" stroke="#475569" stroke-width="1.3"/>`;
	body += `<path d="M 70 96 Q 95 76 120 96 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.1"/>`;
	body += `<text x="95" y="122" text-anchor="middle" font-size="10" fill="#64748b">مسحوق أبيض</text>`;

	// Arrow
	body += `<line x1="175" y1="86" x2="225" y2="86" stroke="#2563eb" stroke-width="2" marker-end="url(#csArr)"/>`;
	body += `<text x="200" y="75" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">+ ${sampleName}</text>`;

	// Right: After test
	body += `<rect x="230" y="40" width="150" height="92" rx="6" fill="${hasWater ? '#eff6ff' : '#ffffff'}" stroke="${hasWater ? '#3b82f6' : '#94a3b8'}" stroke-width="1.3"/>`;
	body += `<text x="305" y="57" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">النتيجة المشاهدة</text>`;
	body += `<path d="M 262 96 Q 305 112 348 96 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>`;
	body += `<path d="M 280 96 Q 305 76 330 96 Z" fill="${hasWater ? '#2563eb' : '#ffffff'}" stroke="${hasWater ? '#1d4ed8' : '#cbd5e1'}" stroke-width="1.1"/>`;
	body += `<text x="305" y="122" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${hasWater ? '#1d4ed8' : '#475569'}">${hasWater ? 'لون أزرق مميز' : 'يبقى أبيض'}</text>`;

	// Footer: boiling test info
	body += `<rect x="20" y="142" width="360" height="32" rx="5" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.1"/>`;
	body += `<text x="200" y="162" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0c4a6e">اختبار نقاوة السائل المقطر بالمحرار: درجة الغليان = ${boilTemp} °C</text>`;
	return wrapPhysicsSvg(400, 194, body);
}

function buildSeparationApparatusSvg(mode: 'filtration' | 'distillation'): string {
	let body = `<defs>
		<marker id="saArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#0284c7"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="190" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	if (mode === 'filtration') {
		body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">جهاز فصل خليط غير متجانس (التركيب التجريبي للترشيح)</text>`;
		// Funnel & Filter paper
		body += `<polygon points="150,58 230,58 196,104 184,104" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<polygon points="160,62 220,62 190,98" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>`;
		body += `<rect x="187" y="104" width="6" height="28" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>`;
		// Beaker below
		body += `<rect x="155" y="136" width="70" height="48" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<rect x="156" y="156" width="68" height="27" fill="#dbeafe"/>`;
		// Numbered badges 1..4
		const badges = [
			{ num: '1', x: 118, y: 66, lx: 162, ly: 66, desc: 'ورق الترشيح' },
			{ num: '2', x: 266, y: 78, lx: 215, ly: 78, desc: 'قمع زجاجي' },
			{ num: '3', x: 118, y: 118, lx: 185, ly: 100, desc: 'عوالق محتجزة' },
			{ num: '4', x: 266, y: 166, lx: 220, ly: 166, desc: 'الرشاحة' }
		];
		for (const b of badges) {
			body += `<line x1="${b.x}" y1="${b.y}" x2="${b.lx}" y2="${b.ly}" stroke="#64748b" stroke-width="1.1" stroke-dasharray="3,2"/>`;
			body += `<circle cx="${b.x}" cy="${b.y}" r="10" fill="#1d4ed8"/><text x="${b.x}" y="${b.y + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">${b.num}</text>`;
			void b.desc;
		}
		body += `<text x="200" y="192" text-anchor="middle" font-size="10" fill="#475569">تعرّف على العناصر المرقمة من 1 إلى 4</text>`;
	} else {
		body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">جهاز فصل خليط متجانس (التقطير المخبري)</text>`;
		// Heater & flask
		body += `<rect x="52" y="158" width="58" height="14" rx="2" fill="#475569"/>`;
		body += `<circle cx="81" cy="124" r="24" fill="#dbeafe" stroke="#0f172a" stroke-width="1.6"/>`;
		body += `<rect x="76" y="72" width="10" height="30" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>`;
		body += `<line x1="81" y1="50" x2="81" y2="98" stroke="#dc2626" stroke-width="2"/>`;
		// Condenser
		body += `<line x1="86" y1="80" x2="278" y2="124" stroke="#0f172a" stroke-width="2.2"/>`;
		body += `<polygon points="124,78 242,106 237,124 119,96" fill="#bae6fd" fill-opacity="0.7" stroke="#0284c7" stroke-width="1.4"/>`;
		// Receiving beaker
		body += `<rect x="276" y="128" width="52" height="46" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
		body += `<rect x="277" y="148" width="50" height="25" fill="#e0f2fe"/>`;
		const badges = [
			{ num: '1', x: 38, y: 124, lx: 57, ly: 124 },
			{ num: '2', x: 118, y: 50, lx: 82, ly: 56 },
			{ num: '3', x: 190, y: 62, lx: 185, ly: 92 },
			{ num: '4', x: 356, y: 158, lx: 328, ly: 158 }
		];
		for (const b of badges) {
			body += `<line x1="${b.x}" y1="${b.y}" x2="${b.lx}" y2="${b.ly}" stroke="#64748b" stroke-width="1.1" stroke-dasharray="3,2"/>`;
			body += `<circle cx="${b.x}" cy="${b.y}" r="10" fill="#1d4ed8"/><text x="${b.x}" y="${b.y + 4}" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">${b.num}</text>`;
		}
		body += `<text x="200" y="191" text-anchor="middle" font-size="10" fill="#475569">سمّ البيانات المرقمة (1، 2، 3، 4) في التركيب التجريبي</text>`;
	}
	return wrapPhysicsSvg(400, 206, body);
}

function buildConcentrationBeakerSvg(soluteName: string, mSolute: number, mWater: number, volMl: number): string {
	let body = `<defs>
		<marker id="cbArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#16a34a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="176" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">تحضير محلول مائي (${soluteName})</text>`;

	// Water beaker + solute
	body += `<rect x="26" y="48" width="76" height="66" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<rect x="27" y="70" width="74" height="43" fill="#dbeafe"/>`;
	body += `<text x="64" y="96" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e40af">ماء: ${mWater} g</text>`;
	body += `<rect x="114" y="82" width="66" height="32" rx="4" fill="#fef3c7" stroke="#d97706"/>`;
	body += `<text x="147" y="102" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">${mSolute} g ${soluteName}</text>`;

	body += `<line x1="188" y1="84" x2="224" y2="84" stroke="#16a34a" stroke-width="2" marker-end="url(#cbArr)"/>`;

	// Resulting solution flask
	body += `<rect x="234" y="48" width="142" height="66" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>`;
	body += `<rect x="235" y="68" width="140" height="45" fill="#bfdbfe"/>`;
	body += `<text x="305" y="88" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">محلول متجانس</text>`;
	body += `<text x="305" y="105" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">V = ${volMl} mL</text>`;

	body += `<rect x="26" y="128" width="350" height="36" rx="5" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.1"/>`;
	body += `<text x="200" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">C<tspan dy="3" font-size="72%">m</tspan><tspan dy="-3"> = m / V  (تحويل الحجم إلى اللتر L قبل الحساب)</tspan></text>`;
	return wrapPhysicsSvg(400, 192, body);
}

function buildAtmosphereAndPhSvg(targetPh: number, targetSample: string, roomVol: number): string {
	const colors = [
		'#dc2626', '#ea580c', '#f97316', '#f59e0b', '#eab308', '#a3e635', '#84cc16',
		'#22c55e',
		'#14b8a6', '#06b6d4', '#3b82f6', '#2563eb', '#4f46e5', '#6d28d9', '#7e22ce'
	];
	let body = `<defs>
		<marker id="phPin" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
			<path d="M0,0 L6,0 L3,6 Z" fill="#0f172a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="196" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;

	// Top section: Atmosphere bar
	body += `<text x="200" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">تركيب الهواء (حجم الغرفة = ${roomVol} m<tspan dy="-4" font-size="72%">3</tspan><tspan dy="4">)</tspan></text>`;
	body += `<rect x="24" y="36" width="274" height="30" fill="#3b82f6"/>`;
	body += `<rect x="298" y="36" width="74" height="30" fill="#10b981"/>`;
	body += `<rect x="372" y="36" width="6" height="30" fill="#f59e0b"/>`;
	body += `<text x="161" y="55" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">78% N<tspan dy="3" font-size="72%">2</tspan></text>`;
	body += `<text x="335" y="55" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">21% O<tspan dy="3" font-size="72%">2</tspan></text>`;
	body += `<text x="200" y="80" text-anchor="middle" font-size="9.5" fill="#475569">1% غازات أخرى (CO<tspan dy="3" font-size="72%">2</tspan><tspan dy="-3">, Ar) | كتلة 1 m</tspan><tspan dy="-4" font-size="72%">3</tspan><tspan dy="4"> هواء = 1.3 kg</tspan></text>`;

	// Bottom section: pH bar
	body += `<text x="200" y="108" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">سلم الـ pH (قياس العينة: ${targetSample} = ${targetPh})</text>`;
	const startX = 24;
	const cellW = 23.6;
	for (let v = 0; v <= 14; v++) {
		const x = startX + v * cellW;
		body += `<rect x="${x.toFixed(1)}" y="130" width="${cellW.toFixed(1)}" height="24" fill="${colors[v]}" stroke="#ffffff" stroke-width="0.8"/>`;
		body += `<text x="${(x + cellW / 2).toFixed(1)}" y="146" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${v >= 4 && v <= 8 ? '#0f172a' : '#ffffff'}">${v}</text>`;
	}
	const pinX = startX + (targetPh + 0.5) * cellW;
	body += `<line x1="${pinX.toFixed(1)}" y1="115" x2="${pinX.toFixed(1)}" y2="127" stroke="#0f172a" stroke-width="2" marker-end="url(#phPin)"/>`;
	body += `<text x="80" y="172" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">حمضي (&lt; 7)</text>`;
	body += `<text x="200" y="172" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">معتدل (= 7)</text>`;
	body += `<text x="320" y="172" text-anchor="middle" font-size="10" font-weight="bold" fill="#3730a3">أساسي (&gt; 7)</text>`;
	body += `<text x="200" y="192" text-anchor="middle" font-size="9.5" fill="#475569">العينة المقاسة عند المؤشر الأسود</text>`;

	return wrapPhysicsSvg(400, 212, body);
}

function buildEnvAuditSvg(riverPh: number, saltMass: number, volMl: number): string {
	let body = `<defs>
		<marker id="eaArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="184" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">بطاقة تشخيص بيئي لعينة ماء وهواء</text>`;

	// Water treatment chain
	const steps = [
		{ x: 18, t: 'عينة طبيعية', s: 'ماء+زيت+رمل+ملح', bg: '#fef3c7', st: '#d97706' },
		{ x: 112, t: '1. الإبانة', s: 'فصل الزيت', bg: '#eff6ff', st: '#2563eb' },
		{ x: 206, t: '2. الترشيح', s: 'فصل الرمل', bg: '#ecfdf5', st: '#16a34a' },
		{ x: 300, t: '3. التقطير', s: 'ماء مقطر نقي', bg: '#e0f2fe', st: '#0284c7' }
	];
	for (let i = 0; i < steps.length; i++) {
		const st = steps[i];
		body += `<rect x="${st.x}" y="42" width="80" height="52" rx="6" fill="${st.bg}" stroke="${st.st}" stroke-width="1.3"/>`;
		body += `<text x="${st.x + 40}" y="62" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f172a">${st.t}</text>`;
		body += `<text x="${st.x + 40}" y="80" text-anchor="middle" font-size="8.5" fill="#334155">${st.s}</text>`;
		if (i < steps.length - 1) {
			body += `<line x1="${st.x + 81}" y1="68" x2="${steps[i + 1].x - 2}" y2="68" stroke="#1d4ed8" stroke-width="1.6" marker-end="url(#eaArr)"/>`;
		}
	}

	// Data box
	body += `<rect x="18" y="108" width="362" height="70" rx="7" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="199" y="128" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">نتائج القياس: pH ماء النهر = ${riverPh} (أمطار حمضية ملوثة)</text>`;
	body += `<text x="199" y="148" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">الأملاح المنحلة في V = ${volMl} mL تزن m = ${saltMass} g</text>`;
	body += `<text x="199" y="167" text-anchor="middle" font-size="10" fill="#059669">الهواء المحيط: 78% N<tspan dy="3" font-size="72%">2</tspan><tspan dy="-3"> و 21% O</tspan><tspan dy="3" font-size="72%">2</tspan></text>`;

	return wrapPhysicsSvg(400, 200, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Water Detection (CuSO4) & Water Cycle (Experimental)
// ═══════════════════════════════════════════════════════════════════════════════

const tplWaterDetectionCycle: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t1_water_detection_cycle',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'matter',
	isExperimental: true,
	titleAr: 'الكشف عن الماء بكبريتات النحاس اللامائية ودورة الماء في الطبيعة',
	curriculumLessonId: 'phy_lesson_1as_tcl_t1_water_nature_detection_cycle',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const samples = [
			{ name: 'عصير البرتقال', hasWater: true },
			{ name: 'الحليب الطازج', hasWater: true },
			{ name: 'قطعة طماطم', hasWater: true },
			{ name: 'زيت الزيتون النقي', hasWater: false },
			{ name: 'العسل المجفف تماماً', hasWater: false }
		];
		const chosen = difficulty === 'easy' ? samples[rng.int(0, 3)] : rng.pick(samples);
		const isPureBoil = seed % 2 === 0;
		const boilTemp = isPureBoil ? 100 : rng.pick([103, 105]);

		const svg = buildCopperSulfateTestSvg(chosen.name, chosen.hasWater, boilTemp);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t1_water_${difficulty}_s${cleanSeed}`, svg);

		const cuso4 = chemSpecies('CuSO4');
		const h2o = chemSpecies('H2O');

		const correctMcq = chosen.hasWater
			? `تحتوي عينة ${chosen.name} على الماء لأن كبريتات النحاس اللامائية تحولت من الأبيض إلى الأزرق`
			: `لا تحتوي عينة ${chosen.name} على الماء لأن كبريتات النحاس اللامائية بقيت بيضاء اللون`;

		const mcq = buildUniqueMcqOptions(
			correctMcq,
			[
				{
					text: chosen.hasWater
						? `لا تحتوي عينة ${chosen.name} على الماء لأن لون الكاشف تغير للأزرق`
						: `تحتوي عينة ${chosen.name} على الماء لأن الكاشف بقي أبيض اللون`,
					diagnosticFeedback:
						'انتبه للقاعدة: تحول كبريتات النحاس اللامائية البيضاء إلى الأزرق هو الدليل على وجود الماء.'
				},
				{
					text: `يستعمل ماء الجير للكشف عن الماء فيتحول إلى اللون الأزرق`,
					diagnosticFeedback: 'ماء الجير يكشف عن غاز $\\ce{CO2}$ وليس عن الماء!'
				},
				{
					text: `تحتوي العينة على الماء فقط عندما يتعكر السائل ويصبح لونه أحمر`,
					diagnosticFeedback: 'كبريتات النحاس المميهة لونها أزرق سماوي مميز وليست حمراء.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في تجربة مخبرية، وضعنا قطرة من **${chosen.name}** على مسحوق كبريتات النحاس اللامائية (${cuso4.katex}) البيضاء كما هو موضح في الوثيقة. ماذا نستنتج؟`,
				questionTextAr: `ما الاستنتاج الصحيح لتجربة الكشف عن الماء في ${chosen.name}؟`,
				imageUrl: svgPath,
				imageCaption: `تجربة كبريتات النحاس اللامائية مع ${chosen.name}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: chosen.hasWater
					? `يتغير لون كبريتات النحاس اللامائية من الأبيض إلى الأزرق عند التماس مع الماء (${h2o.katex})، لذا فعينة ${chosen.name} تحتوي على الماء.`
					: `بقيت كبريتات النحاس اللامائية بيضاء اللون، مما يثبت خلو ${chosen.name} من الماء.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `في حصة الأعمال التطبيقية، أراد التلاميذ الكشف عن وجود الماء (${h2o.typst}) في عينة *${chosen.name}* باستعمال مسحوق كبريتات النحاس اللامائية ${cuso4.typst}، ثم تتبعوا دورة الماء في الطبيعة واختبار نقاوة سائل مائي بالمحرار.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) ما اللون الأصلي لكبريتات النحاس اللامائية الجافة؟ وانطلاقاً من الوثيقة، هل تحتوي عينة *${chosen.name}* على الماء؟ علل إجابتك.`,
								answer: `1) اللون الأصلي الجاف هو *الأبيض*.\n${chosen.hasWater ? `نعم، تحتوي عينة ${chosen.name} على الماء لأن المسحوق تحول إلى اللون *الأزرق*.` : `لا، لا تحتوي عينة ${chosen.name} على الماء لأن المسحوق بقي *أبيض* ولم يتلون بالأزرق.`}`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `اختبار كبريتات النحاس مع ${chosen.name}`
							}
						]
					},
					{
						type: 'text',
						content: `2) أظهر المحرار عند غليان السائل المدروس تحت الضغط العادي القيمة $${boilTemp} degree "C"$ ثابتة. هل هذا السائل ماء نقي أم خليط مائي؟ اذكر معياري النقاوة للماء النقي.`,
						answer: `2) ${isPureBoil ? `السائل *ماء نقي* لأن درجة غليانه ثبتت عند $100 degree "C"$.` : `السائل *خليط مائي (غير نقي)* لأن درجة غليانه فاقت $100 degree "C"$.`}\nمعيارا النقاوة تحت الضغط العادي: يتجمد الماء النقي عند $0 degree "C"$ ويغلي عند $100 degree "C"$.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['المرحلة في دورة الماء', 'التحول الفيزيائي أو الظاهرة الموافقة'],
						cells: [],
						rows: [
							[
								'صعود الماء من البحار بفعل حرارة الشمس',
								{ content: '................', answer: 'التبخر', mark: '0.5' }
							],
							[
								'تشكل السحب في طبقات الجو العليا الباردة',
								{ content: '................', answer: 'التكاثف', mark: '0.5' }
							],
							[
								'نزول الأمطار والثلوج نحو اليابسة',
								{ content: '................', answer: 'التساقط', mark: '0.5' }
							],
							[
								'نفاذ جزء من مياه الأمطار داخل التربة',
								{ content: '................', answer: 'التسرب نحو المياه الجوفية', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `4) صحح العبارة الخاطئة التالية: "السحب البيضاء في السماء تتكون من بخار الماء الغازي غير المرئي".`,
						answer: `4) التصحيح: بخار الماء غاز غير مرئي، أما *السحب* فتتكون من ملايين *قطيرات الماء السائلة الدقيقة* (أو بلورات الجليد) الناتجة عن التكاثف.`,
						mark: '1'
					}
				]
			},
			hints: [
				'كبريتات النحاس اللامائية لونها أبيض وتصبح زرقاء عند ملامسة الماء.',
				'درجة غليان الماء النقي عند الضغط العادي هي $100^\\circ\\text{C}$ وتجمده $0^\\circ\\text{C}$.',
				'في دورة الماء: تبخر ثم تكاثف (سحب) ثم تساقط ثم جريان وتسرب.'
			],
			solutionStepsAr: [
				`الكشف بـ ${cuso4.katex}: ${chosen.hasWater ? 'تحول للأزرق يدل على وجود الماء' : 'بقاء اللون الأبيض يدل على خلو العينة من الماء'}.`,
				`الماء النقي يغلي عند $100^\\circ\\text{C}$؛ العينة في السند (${boilTemp}°C) هي ${isPureBoil ? 'ماء نقي' : 'خليط غير نقي'}.`,
				`دورة الماء: التبخر ← التكاثف ← التساقط ← التسرب والجريان.`
			],
			finalAnswer: chosen.hasWater ? 'تحتوي على الماء (لون أزرق)' : 'خالية من الماء (لون أبيض)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Aqueous Mixtures & Separation Apparatus (Experimental)
// ═══════════════════════════════════════════════════════════════════════════════

const tplMixturesSeparationApparatus: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t1_mixtures_separation_apparatus',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'matter',
	isExperimental: true,
	titleAr: 'الخلائط المائية وطرق الفصل (الإبانة، الترشيح، التقطير)',
	curriculumLessonId: 'phy_lesson_1as_tcl_t1_aqueous_mixtures_separation',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));
		const mode: 'filtration' | 'distillation' = seed % 2 === 0 ? 'filtration' : 'distillation';

		const svg = buildSeparationApparatusSvg(mode);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t1_sep_${mode}_${difficulty}_s${cleanSeed}`, svg);

		const correctMcq =
			mode === 'filtration'
				? 'تقنية الترشيح: تفصل العوالق الصلبة عن الماء وتعطي رشاحة صافية وليست نقية كيميائياً'
				: 'تقنية التقطير: تفصل الأملاح المنحلة عن الماء بالتبخر ثم التكثيف وتعطي ماءً مقطراً نقياً';

		const mcq = buildUniqueMcqOptions(
			correctMcq,
			[
				{
					text:
						mode === 'filtration'
							? 'تقنية الترشيح: تفصل الأملاح المنحلة كالملح لتعطي ماءً مقطراً نقياً'
							: 'تقنية التقطير: مخصصة لفصل الرمل والطين العالق عن الزيت فقط',
					diagnosticFeedback:
						mode === 'filtration'
							? 'الترشيح لا يحجز الأملاح الذائبة بل تمر مع الرشاحة!'
							: 'التقطير يستعمل لفصل الخلائط المتجانسة كالماء المالح للحصول على الماء المقطر.'
				},
				{
					text: 'تقنية الإبانة: تستعمل لفصل الماء عن الملح المذاب بالاعتماد على الكثافة',
					diagnosticFeedback: 'الإبانة تفصل سائلين غير ممتزجين كالماء والزيت وليس الملح المنحل.'
				},
				{
					text: 'تقنية التركيد: تسخين الخليط حتى الغليان داخل أنبوبة الإبانة',
					diagnosticFeedback: 'التركيد هو ترك الخليط ساكناً لتترسب المواد الصلبة الثقيلة دون تسخين.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `يمثل الرسم التخطيطي المقابل تركيباً مخبرياً لفصل مكونات خليط مائي. ما اسم هذه التقنية وما الناتج المحصل عليه في الكأس (رقم 4)؟`,
				questionTextAr: `ما اسم التقنية الممثلة في الوثيقة وما طبيعة السائل الناتج في (4)؟`,
				imageUrl: svgPath,
				imageCaption: mode === 'filtration' ? 'التركيب المخبري 1' : 'التركيب المخبري 2',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					mode === 'filtration'
						? 'التركيب يمثل عملية **الترشيح**؛ يحجز ورق الترشيح المواد الصلبة العالقة ويمر سائل صافٍ يسمى **الرشاحة**.'
						: 'التركيب يمثل عملية **التقطير**؛ يتبخر الماء في الدورق ويتكثف في المبرد لنجمع **الماء المقطر النقي**.'
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `انطلاقاً من الرسم التخطيطي للتركيب المخبري الموضح أدناه، أجب عن الأسئلة التالية:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content:
									mode === 'filtration'
										? `1) سمِّ عملية الفصل الممثلة في الشكل، واكتب البيانات المرقمة: (1)، (2)، (3)، (4).`
										: `1) سمِّ عملية الفصل الممثلة في الشكل، واكتب البيانات المرقمة: (1)، (2)، (3)، (4).`,
								answer:
									mode === 'filtration'
										? `1) العملية هي *الترشيح*.\nالبيانات: (1) ورق الترشيح، (2) قمع زجاجي، (3) عوالق صلبة محتجزة (حثالة)، (4) الرشاحة.`
										: `1) العملية هي *التقطير*.\nالبيانات: (1) دورق التسخين (ماء مالح)، (2) محرار، (3) المبرد (المكثف)، (4) الماء المقطر النقي.`,
								mark: '2'
							},
							{
								type: 'image',
								src: svgPath,
								caption: mode === 'filtration' ? 'تركيب الترشيح' : 'تركيب التقطير'
							}
						]
					},
					{
						type: 'table',
						headers: ['الخليط المائي', 'نوع الخليط (متجانس / غير متجانس)', 'تقنية الفصل المناسبة'],
						cells: [],
						rows: [
							[
								'ماء + زيت الزيتون',
								{ content: '................', answer: 'غير متجانس', mark: '0.5' },
								{ content: '................', answer: 'الإبانة (أنبوبة الإبانة)', mark: '0.5' }
							],
							[
								'ماء + طمي ورمل',
								{ content: '................', answer: 'غير متجانس', mark: '0.5' },
								{ content: '................', answer: 'التركيد ثم الترشيح', mark: '0.5' }
							],
							[
								'ماء البحر (ماء + ملح منحل)',
								{ content: '................', answer: 'متجانس', mark: '0.5' },
								{ content: '................', answer: 'التقطير', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `3) هل الماء الصافي المحصل عليه بعد عملية الترشيح (الرشاحة) صالح للشرب مباشرة أو نقي كيميائياً؟ علل إجابتك.`,
						answer: `3) *لا*، الرشاحة صافية بالعين لكنها *ليست ماءً نقياً* لأنها قد تحتوي على أملاح منحلة أو جراثيم تمر عبر مسام ورق الترشيح؛ لذلك نحتاج للتعقيم أو التقطير.`,
						mark: '1'
					}
				]
			},
			hints: [
				mode === 'filtration'
					? 'الورق المسامي داخل القمع يحجز الشوائب الصلبة ويسمح بمرور السائل.'
					: 'يتبخر الماء بالتسخين ثم يتحول لسائل نقي داخل المبرد.',
				'الماء والزيت سائلان غير ممتزجين يُفصلان بأنبوبة الإبانة.',
				'المحلول المالح خليط متجانس لا يُفصل بالترشيح بل بالتقطير.'
			],
			solutionStepsAr: [
				mode === 'filtration'
					? 'التقنية: الترشيح (1: ورق الترشيح، 2: قمع، 3: عوالق، 4: الرشاحة).'
					: 'التقنية: التقطير (1: دورق التقطير، 2: محرار، 3: المبرد، 4: ماء مقطر).',
				'تصنيف الخلائط: (ماء+زيت) غير متجانس ← إبانة؛ (ماء+طمي) غير متجانس ← تركيد وترشيح؛ (ماء+ملح) متجانس ← تقطير.',
				'الرشاحة صافية وليست نقية لوجود أملاح مذابة.'
			],
			finalAnswer: mode === 'filtration' ? 'الترشيح (الرشاحة)' : 'التقطير (ماء مقطر)'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Aqueous Solutions, Mass Concentration Cm = m/V & Dilution
// ═══════════════════════════════════════════════════════════════════════════════

const tplConcentrationMassConservation: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t1_concentration_mass_conservation',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'المحاليل المائية، انحفاظ الكتلة، وحساب التركيز الكتلي Cm = m / V',
	curriculumLessonId: 'phy_lesson_1as_tcl_t1_solutions_mass_concentration_ph',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const solutes = ['ملح الطعام', 'السكر', 'كبريتات النحاس'];
		const solute = rng.pick(solutes);
		const mWater = rng.pick([200, 250, 400, 500]);
		const volMl = mWater; // 1 g/mL water baseline
		const volL = roundTo(volMl / 1000, 2);
		const cmTarget = difficulty === 'easy' ? rng.pick([20, 40, 50]) : rng.pick([15, 25, 30, 40, 60]);
		const mSolute = roundTo(cmTarget * volL, 2);
		const mTotal = roundTo(mWater + mSolute, 2);

		// Dilution step: add same volume of distilled water -> concentration halves!
		const addWaterMl = mWater;
		const volFinalL = roundTo((volMl + addWaterMl) / 1000, 2);
		const cmDiluted = roundTo(mSolute / volFinalL, 2);

		const svg = buildConcentrationBeakerSvg(solute, mSolute, mWater, volMl);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t1_cm_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$C_m = ${cmTarget}\\,\\text{g/L}$`,
			[
				{
					text: `$C_m = ${roundTo(mSolute / volMl, 4)}\\,\\text{g/L}$`,
					diagnosticFeedback: 'خطأ: قسمت على الحجم بالمليلتر ($\\text{mL}$) دون تحويله إلى اللتر ($\\text{L}$)!'
				},
				{
					text: `$C_m = ${roundTo(mSolute * volL, 2)}\\,\\text{g/L}$`,
					diagnosticFeedback: 'خطأ: التركيز الكتلي هو القسمة $\\frac{m}{V}$ وليس الضرب $m \\times V$.'
				},
				{
					text: `$C_m = ${roundTo(mTotal / volL, 1)}\\,\\text{g/L}$`,
					diagnosticFeedback: 'خطأ: في البسط نضع كتلة المُنحل ($m$) فقط وليس كتلة المحلول الكلية!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `نذيب كتلة $m = ${mSolute}\\,\\text{g}$ من **${solute}** في الماء للحصول على محلول مائي حجمه $V = ${volMl}\\,\\text{mL}$. ما قيمة التركيز الكتلي $C_m$ لهذا المحلول؟`,
				questionTextAr: `احسب التركيز الكتلي $C_m$ للمحلول بوحدة $\\text{g/L}$:`,
				imageUrl: svgPath,
				imageCaption: `تحضير محلول ${solute}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نحوّل الحجم إلى اللتر: $V = \\frac{${volMl}}{1000} = ${volL}\\,\\text{L}$، ثم نطبق: $C_m = \\frac{m}{V} = \\frac{${mSolute}}{${volL}} = ${cmTarget}\\,\\text{g/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يُحضّر تلميذ في المخبر محلولاً مائياً بإذابة كتلة $m = ${mSolute} "g"$ من *${solute}* في $m_("ماء") = ${mWater} "g"$ من الماء النقي، فيحصل على محلول متجانس حجمه $V = ${volMl} "mL"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) حدد كلاً من *المُحل* و *المُنحل* في هذا المحلول، ثم احسب الكتلة الكلية للمحلول $m_("محلول")$ مع ذكر المبدأ الفيزيائي المعتمد.`,
								answer: `1) *المُحل*: الماء النقي. *المُنحل*: ${solute}.\nحسب مبدأ *انحفاظ الكتلة*، كتلة المحلول تساوي مجموع كتلة المحل وكتلة المنحل:\n$m_("محلول") = ${mWater} + ${mSolute} = ${mTotal} "g"$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `مخطط تحضير محلول ${solute}`
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب قانون التركيز الكتلي $C_m$، ثم احسب قيمته بوحدة $"g/L"$ بعد تحويل الحجم إلى اللتر.`,
						answer: `2) نحول الحجم: $V = frac(${volMl}, 1000) = ${volL} "L"$.\nالتركيز الكتلي: $C_m = frac(m, V) = frac(${mSolute}, ${volL}) = ${cmTarget} "g/L"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) نضيف إلى هذا المحلول حجماً قدره $${addWaterMl} "mL"$ من الماء المقطر (عملية التمديد). كيف يتغير التركيز الكتلي؟ احسب التركيز الجديد $C_("m2")$.`,
						answer: `3) عند التمديد *ينقص* التركيز الكتلي بينما تبقى كتلة المنحل ثابتة ($m = ${mSolute} "g"$).\nالحجم الجديد: $V_2 = ${volMl} + ${addWaterMl} = ${volMl + addWaterMl} "mL" = ${volFinalL} "L"$.\nالتركيز الجديد: $C_("m2") = frac(${mSolute}, ${volFinalL}) = ${cmDiluted} "g/L"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) متى يصبح المحلول المائي *مشبعاً* عند إضافة المزيد من ${solute}؟`,
						answer: `4) يصبح المحلول *مشبعاً* عندما يعجز الماء عن إذابة أي كمية إضافية من ${solute} عند درجة حرارة معينة، فيترسب الفائض في قاع الكأس.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الكتلة تبقى محفوظة أثناء الانحلال: $m_{\\text{محلول}} = m_{\\text{ماء}} + m_{\\text{منحل}}$.',
				`حوّل الحجم أولاً من $\\text{mL}$ إلى $\\text{L}$ بالقسمة على $1000$: $V = ${volL}\\,\\text{L}$.`,
				'عند التمديد بالماء المقطر، تبقى كتلة المنحل $m$ ثابتة ويزداد الحجم الكلي.'
			],
			solutionStepsAr: [
				`المحل: الماء، المنحل: ${solute}، والكتلة الكلية محفوظة: $${mTotal}\\,\\text{g}$.`,
				`$C_m = \\frac{${mSolute}}{${volL}} = ${cmTarget}\\,\\text{g/L}$.`,
				`بعد التمديد إلى $${volFinalL}\\,\\text{L}$: $C_{m2} = \\frac{${mSolute}}{${volFinalL}} = ${cmDiluted}\\,\\text{g/L}$.`
			],
			finalAnswer: `${cmTarget} g/L`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: pH Scale, Atmosphere Composition & Atmospheric Pressure
// ═══════════════════════════════════════════════════════════════════════════════

const tplPhAtmosphereAir: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t1_ph_atmosphere_air',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'matter',
	titleAr: 'درجة الحموضة pH، مكونات الهواء الجوي، والضغط الجوي',
	curriculumLessonId: 'phy_lesson_1as_tcl_t1_air_atmosphere_pressure_pollution',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const roomVol = difficulty === 'easy' ? rng.pick([100, 200]) : rng.pick([80, 100, 120, 150, 200]);
		const vO2 = roundTo(roomVol * 0.21, 1);
		const vN2 = roundTo(roomVol * 0.78, 1);
		const airMassKg = roundTo(roomVol * 1.3, 1);

		const phCases = [
			{ name: 'عصير الليمون', ph: 2, nature: 'حمضي', dirAr: 'يزداد الـ pH مقترباً من 7' },
			{ name: 'الخل التجاري', ph: 3, nature: 'حمضي', dirAr: 'يزداد الـ pH مقترباً من 7' },
			{ name: 'ماء مقطر', ph: 7, nature: 'معتدل', dirAr: 'يبقى ثابتاً عند 7' },
			{ name: 'ماء الصابون', ph: 9, nature: 'أساسي (قاعدي)', dirAr: 'ينخفض الـ pH مقترباً من 7' },
			{ name: 'ماء جافيل', ph: 11, nature: 'أساسي (قاعدي)', dirAr: 'ينخفض الـ pH مقترباً من 7' }
		];
		const target = rng.pick(phCases);

		const svg = buildAtmosphereAndPhSvg(target.ph, target.name, roomVol);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t1_airph_${difficulty}_s${cleanSeed}`, svg);

		const n2 = chemSpecies('N2');
		const o2 = chemSpecies('O2');

		const mcq = buildUniqueMcqOptions(
			`$V(\\ce{O2}) = ${vO2}\\,\\text{m}^3$ و $V(\\ce{N2}) = ${vN2}\\,\\text{m}^3$`,
			[
				{
					text: `$V(\\ce{O2}) = ${vN2}\\,\\text{m}^3$ و $V(\\ce{N2}) = ${vO2}\\,\\text{m}^3$`,
					diagnosticFeedback: 'خطأ: عكست النسبتين! ثنائي الآزوت (78%) أكبر حجماً من ثنائي الأكسجين (21%).'
				},
				{
					text: `$V(\\ce{O2}) = ${roundTo(roomVol * 0.5, 1)}\\,\\text{m}^3$ و $V(\\ce{N2}) = ${roundTo(roomVol * 0.5, 1)}\\,\\text{m}^3$`,
					diagnosticFeedback: 'خطأ: الغازان ليسا متساويين في الهواء الجوي.'
				},
				{
					text: `$V(\\ce{O2}) = 21\\,\\text{m}^3$ و $V(\\ce{N2}) = 78\\,\\text{m}^3$`,
					diagnosticFeedback: 'هذه القيم تخص $100\\,\\text{m}^3$ من الهواء وليس $' + roomVol + '\\,\\text{m}^3$!'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `تحتوي قاعة مطالعة على حجم من الهواء الجاف قدره $V = ${roomVol}\\,\\text{m}^3$. ما هو الحجم التقريبي لكل من غاز ثنائي الأكسجين (${o2.katex}) وغاز ثنائي الآزوت (${n2.katex}) في القاعة؟`,
				questionTextAr: `احسب حجم ${o2.katex} وحجم ${n2.katex} في $${roomVol}\\,\\text{m}^3$ من الهواء:`,
				imageUrl: svgPath,
				imageCaption: 'مكونات الهواء الجوي وسلم الـ pH',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نسبة الأكسجين $21\\%$ ونسبة الآزوت $78\\%$، إذن: $V(\\ce{O2}) = ${roomVol} \\times 0.21 = ${vO2}\\,\\text{m}^3$ و$V(\\ce{N2}) = ${roomVol} \\times 0.78 = ${vN2}\\,\\text{m}^3$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس تلاميذ المخبر الغلاف الجوي المحيط بقاعة حجمها $V = ${roomVol} "m"^3$، كما يقيسون درجة الحموضة $"pH"$ لعينة *${target.name}* باستعمال جهاز الـ $"pH"$ متر.\nنعطي: كتلة $1 "m"^3$ من الهواء تساوي $1.3 "kg"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب حجم كل من غاز ثنائي الأكسجين ${o2.typst} ($21%$) وغاز ثنائي الآزوت ${n2.typst} ($78%$) داخل القاعة، ثم احسب كتلة الهواء الموجود فيها بالكيلوغرام.`,
								answer: `1) حجم ${o2.typst}: $V("O"_2) = ${roomVol} times frac(21, 100) = ${vO2} "m"^3$.\nحجم ${n2.typst}: $V("N"_2) = ${roomVol} times frac(78, 100) = ${vN2} "m"^3$.\nكتلة الهواء: $m = ${roomVol} times 1.3 = ${airMassKg} "kg"$.`,
								mark: '2'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `مخطط الهواء الجوي وموضع العينة على سلم الـ pH`
							}
						]
					},
					{
						type: 'text',
						content: `2) ما اسم الجهاز المستعمل لقياس *الضغط الجوي*؟ وما قيمته المرجعية عند سطح البحر؟ وكيف يتغير عند الصعود إلى قمة جبل؟`,
						answer: `2) الجهاز هو *البارومتر*. القيمة المرجعية عند سطح البحر هي $1013 "hPa"$ (أو $76 "cmHg"$).\nعند الصعود إلى قمة جبل *يتناقص* الضغط الجوي لأن سمك ووزن عمود الهواء فوقنا يتناقص.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['المحلول المائي', 'قيمة الـ pH المقاسة', 'طبيعة الوسط (حمضي / معتدل / أساسي)'],
						cells: [],
						rows: [
							[
								target.name,
								`$${target.ph}$`,
								{ content: '................', answer: target.nature, mark: '0.5' }
							],
							[
								'الماء المقطر النقي',
								'$7$',
								{ content: '................', answer: 'معتدل', mark: '0.5' }
							],
							[
								'حمض كلور الماء المخفف',
								'$1.5$',
								{ content: '................', answer: 'حمضي', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `4) عند تمديد عينة *${target.name}* ($"pH" = ${target.ph}$) بكمية من الماء المقطر، كيف تتغير قيمة الـ $"pH"$؟`,
						answer: `4) ${target.dirAr}.`,
						mark: '1'
					}
				]
			},
			hints: [
				`احسب $21\\%$ و$78\\%$ من الحجم $${roomVol}\\,\\text{m}^3$، واضرب الحجم في $1.3$ لإيجاد الكتلة بالكيلوغرام.`,
				'البارومتر يقيس الضغط الجوي؛ ويتناقص الضغط كلما ارتفعنا.',
				'يكون المحلول حمضياً إذا كان $\\text{pH} < 7$، معتدلاً عند $7$، وأساسياً إذا كان $\\text{pH} > 7$.'
			],
			solutionStepsAr: [
				`$V(\\ce{O2}) = ${vO2}\\,\\text{m}^3$، $V(\\ce{N2}) = ${vN2}\\,\\text{m}^3$، والكتلة $m = ${airMassKg}\\,\\text{kg}$.`,
				'الجهاز هو البارومتر ($1013\\,\\text{hPa}$) ويتناقص الضغط بالارتفاع.',
				`تصنيف ${target.name} ($\\text{pH}=${target.ph}$): ${target.nature}، وعند التمديد ${target.dirAr}.`
			],
			finalAnswer: `V(O₂) = ${vO2} m³, V(N₂) = ${vN2} m³`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Environment Synthesis (Water, Separation, pH, Air)
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationEnvironmentWaterAir: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t1_integration_environment_water_air',
	grade: '1as_tcl',
	trimesterId: 't1',
	domain: 'integration',
	isIntegration: true,
	isExperimental: true,
	titleAr: 'وضعية إدماجية (الإنسان والبيئة): تنقية المياه، التركيز، الـ pH وتلوث الهواء',
	curriculumLessonId: 'phy_lesson_1as_tcl_t1_air_atmosphere_pressure_pollution',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const riverPh = rng.pick([4.2, 4.5, 4.8, 5.1]);
		const volMl = rng.pick([250, 400, 500]);
		const volL = roundTo(volMl / 1000, 2);
		const cmSalt = difficulty === 'easy' ? rng.pick([20, 30]) : rng.pick([16, 24, 32, 36]);
		const saltMass = roundTo(cmSalt * volL, 2);
		const airSampleL = rng.pick([100, 200, 500]);
		const o2L = roundTo(airSampleL * 0.21, 1);

		const svg = buildEnvAuditSvg(riverPh, saltMass, volMl);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t1_int_env_${difficulty}_s${cleanSeed}`, svg);

		const cuso4 = chemSpecies('CuSO4');
		const co2 = chemSpecies('CO2');
		const so2 = chemSpecies('SO2');
		const o2 = chemSpecies('O2');

		const mcq = buildUniqueMcqOptions(
			`الإبانة ثم الترشيح ثم التقطير؛ والماء حمضي ($\\text{pH} = ${riverPh}$) والتركيز $C_m = ${cmSalt}\\,\\text{g/L}$`,
			[
				{
					text: `الترشيح وحده يكفي لإزالة الملح والزيت؛ والماء أساسي والتركيز $C_m = ${cmSalt}\\,\\text{g/L}$`,
					diagnosticFeedback: 'خطأ: الترشيح لا يفصل الأملاح المذابة ولا يُفضل للزيت، وقيمة $\\text{pH} < 7$ تعني وسطاً حمضياً!'
				},
				{
					text: `الإبانة ثم الترشيح ثم التقطير؛ والماء حمضي والتركيز $C_m = ${roundTo(saltMass / volMl, 4)}\\,\\text{g/L}$`,
					diagnosticFeedback: 'خطأ: لم تحول الحجم من المليلتر إلى اللتر عند حساب التركيز الكتلي!'
				},
				{
					text: `التقطير أولاً قبل إزالة الرمل والزيت؛ والماء معتدل ($\\text{pH} = ${riverPh}$)`,
					diagnosticFeedback: 'خطأ: المعتدل $\\text{pH} = 7$ فقط، كما تُزال الشوائب غير المتجانسة أولاً قبل التقطير.'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't1',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `جمع نادي البيئة عينة ماء نهر عكر يحتوي على رمل، قطرات زيت، وأملاح منحلة، وسجل جهاز الـ $\\text{pH}$ القيمة $${riverPh}$. أظهر تبخير حجم $V = ${volMl}\\,\\text{mL}$ من الماء المصفى وجود $m = ${saltMass}\\,\\text{g}$ من الأملاح. ما الترتيب الصحيح لتنقية الماء، وطبيعته، وتركيزه الكتلي؟`,
				questionTextAr: `ما التشخيص الصحيح لعينة الماء الملوث؟`,
				imageUrl: svgPath,
				imageCaption: 'مراحل معالجة العينة المائية ونتائج القياس',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نبدأ بالإبانة (للزيت) ثم الترشيح (للرمل) ثم التقطير (للأملاح). وبما أن $\\text{pH} = ${riverPh} < 7$ فالماء حمضي، وتركيزه الكتلي $C_m = \\frac{${saltMass}}{${volL}} = ${cmSalt}\\,\\text{g/L}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الوضعية الإدماجية — الإنسان والبيئة',
				instruction: `أخذ فوج من التلاميذ عينة من ماء وادٍ يمر بقرب منطقة صناعية، فلاحظوا أنه عكر ويحمل بقع زيت طافية ورواسب رملية، كما سجل جهاز الـ $"pH"$ متر القيمة $"pH" = ${riverPh}$.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'وثيقة التشخيص البيئي لعينة الماء والهواء',
						width: 350
					},
					{
						type: 'text',
						content: `*الجزء الأول: الكشف عن الماء وفصل الخليط (2.5 نقطة)*\n1) كيف يكشف التلاميذ مخبرياً عن وجود الماء في تربة ضفاف الوادي باستعمال كبريتات النحاس اللامائية ${cuso4.typst}؟\n2) رتب التقنيات الثلاث المناسبة للحصول على *ماء مقطر نقي* انطلاقاً من عينة الوادي (ماء + زيت + رمل + أملاح منحلة)، موضحاً دور كل تقنية.`,
						answer: `1) بوضع قليل من مسحوق ${cuso4.typst} الأبيض على التربة؛ إذا تحول لونه إلى *الأزرق* فهذا يثبت وجود الماء.\n2) الترتيب: *الإبانة* (لفصل الزيت الطافي بأنبوبة الإبانة) $arrow.r$ *التركيد ثم الترشيح* (لفصل الرمل والحصول على رشاحة صافية) $arrow.r$ *التقطير* (لتبخير الماء وتكثيفه للحصول على ماء مقطر نقي خالٍ من الأملاح).`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: التركيز الكتلي ودرجة الحموضة pH (3 نقاط)*\n1) أظهرت التجربة أن حجماً $V = ${volMl} "mL"$ من الرشاحة الصافية يحتوي على كتلة $m = ${saltMass} "g"$ من الأملاح المنحلة. احسب التركيز الكتلي $C_m$ للأملاح بوحدة $"g/L"$.\n2) حدد طبيعة ماء الوادي ($"pH" = ${riverPh}$)، واذكر سبباً بيئياً رئيسياً من الغلاف الجوي يفسر تحمض مياه الأمطار والأودية قرب المصانع.`,
						answer: `1) التحويل: $V = ${volL} "L"$.\nالتركيز الكتلي: $C_m = frac(${saltMass}, ${volL}) = ${cmSalt} "g/L"$.\n2) بما أن $"pH" = ${riverPh} < 7$ فالوسط *حمضي*. يعود ذلك إلى ظاهرة *الأمطار الحمضية* الناتجة عن ذوبان غازات المصانع مثل ${so2.typst} وأكاسيد الآزوت و${co2.typst} في بخار ماء السحب.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: الهواء وحماية البيئة (2.5 نقطة)*\n1) في عينة هواء جاف نقي حجمها $${airSampleL} "L"$، كم يبلغ حجم غاز ثنائي الأكسجين ${o2.typst} الضروري لتنفس الكائنات الحية؟\n2) اقترح إجراءين عمليين للحد من تلوث الهواء والماء في هذه المنطقة.`,
						answer: `1) $V("O"_2) = ${airSampleL} times frac(21, 100) = ${o2L} "L"$.\n2) تركيب مصافٍ (فلاتر) لمداخن المصانع ومعالجة المياه الصناعية قبل طرحها، والتوسيع في التشجير واستعمال الطاقات المتجددة النظيفة.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'في الفصل المتعدد المراحل: نفصل الزيت (إبانة) ثم الرمل (ترشيح) ثم الملح (تقطير).',
				`لا تنسَ تحويل $V = ${volMl}\\,\\text{mL}$ إلى ${volL}\\,\\text{L}$ قبل قسمة $m / V$.`,
				'الأمطار الحمضية ($\\text{pH} < 5.6$) سببها غازات مثل $\\ce{SO2}$ و$\\ce{CO2}$.'
			],
			solutionStepsAr: [
				'الترتيب: إبانة ← تركيد وترشيح ← تقطير؛ والكشف بـ $\\ce{CuSO4}$ يتحول للأزرق.',
				`التركيز: $C_m = \\frac{${saltMass}}{${volL}} = ${cmSalt}\\,\\text{g/L}$، والوسط حمضي ($\\text{pH} = ${riverPh} < 7$) بسبب الأمطار الحمضية.`,
				`حجم الأكسجين: $${airSampleL} \\times 0.21 = ${o2L}\\,\\text{L}$.`
			],
			finalAnswer: `Cm = ${cmSalt} g/L (وسط حمضي)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 1 Parameterized Templates for 1AS TCL Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCL_T1: PhysicsParameterizedTemplate[] = [
	tplWaterDetectionCycle,
	tplMixturesSeparationApparatus,
	tplConcentrationMassConservation,
	tplPhAtmosphereAir,
	tplIntegrationEnvironmentWaterAir
];
