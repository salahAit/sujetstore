import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate,
	QuizQuestionPayload
} from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import {
	savePhysicsSvgAsset,
	svgCircuitDiagram,
	wrapPhysicsSvg
} from '../../svg-physics';

// ─── Helper SVG Builders for 3AM T2 ──────────────────────────────────────────

function svgEnergyChainAndBalance(opts: {
	title: string;
	blocks: Array<{ name: string; storage: string }>;
	transfers: string[];
	showWasteQ?: boolean;
}): string {
	const w = 440;
	const h = 175;
	const n = opts.blocks.length;
	const stepX = (w - 40) / n;
	let body = `<defs><marker id="ecArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/></marker><marker id="qLossArr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#dc2626"/></marker></defs>`;
	body += `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="${w / 2}" y="26" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">${opts.title}</text>`;

	for (let i = 0; i < n; i++) {
		const cx = 20 + stepX * i + stepX / 2;
		const rx = Math.min(46, stepX * 0.37);
		body += `<ellipse cx="${cx.toFixed(1)}" cy="78" rx="${rx.toFixed(1)}" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>`;
		body += `<text x="${cx.toFixed(1)}" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">${opts.blocks[i].name}</text>`;
		body += `<text x="${cx.toFixed(1)}" y="118" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#059669">${opts.blocks[i].storage}</text>`;
		if (opts.showWasteQ && i > 0) {
			body += `<line x1="${cx.toFixed(1)}" y1="100" x2="${cx.toFixed(1)}" y2="144" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3,2" marker-end="url(#qLossArr)"/>`;
			body += `<text x="${(cx + 18).toFixed(1)}" y="142" font-size="10" font-weight="bold" fill="#dc2626">Q</text>`;
		}
		if (i < n - 1) {
			const nextCx = 20 + stepX * (i + 1) + stepX / 2;
			const x1 = cx + rx + 2;
			const x2 = nextCx - rx - 3;
			body += `<line x1="${x1.toFixed(1)}" y1="78" x2="${x2.toFixed(1)}" y2="78" stroke="#2563eb" stroke-width="1.8" marker-end="url(#ecArr)"/>`;
			body += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">${opts.transfers[i]}</text>`;
		}
	}
	return wrapPhysicsSvg(w, h, body);
}

function svgAnalogMeterDial(opts: {
	unit: 'A' | 'V' | 'mA';
	readingL: number;
	scaleN: number;
	caliberC: number;
}): string {
	const w = 320;
	const h = 180;
	const cx = 160;
	const cy = 128;
	const r = 78;
	const ratio = Math.min(1, Math.max(0, opts.readingL / opts.scaleN));
	const angleDeg = 180 - ratio * 180;
	const rad = (angleDeg * Math.PI) / 180;
	const nx = cx + (r - 8) * Math.cos(rad);
	const ny = cy - (r - 8) * Math.sin(rad);

	let body = `<rect x="8" y="8" width="304" height="164" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="${cx}" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">ميناء جهاز ${
		opts.unit === 'V' ? 'الفولطمتر (V)' : 'الأمبيرمتر (A)'
	}</text>`;
	body += `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="#1e293b" stroke-width="2.2"/>`;
	for (let k = 0; k <= 10; k++) {
		const a = ((180 - k * 18) * Math.PI) / 180;
		const x1 = cx + (r - 6) * Math.cos(a);
		const y1 = cy - (r - 6) * Math.sin(a);
		const x2 = cx + r * Math.cos(a);
		const y2 = cy - r * Math.sin(a);
		body += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#334155" stroke-width="1.3"/>`;
	}
	body += `<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#dc2626" stroke-width="2.4"/>`;
	body += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="#0f172a"/>`;
	body += `<text x="${cx - r - 6}" y="${cy + 14}" font-size="10.5" font-weight="bold" fill="#475569">0</text>`;
	body += `<text x="${cx + r + 4}" y="${cy + 14}" font-size="10.5" font-weight="bold" fill="#475569">N=${opts.scaleN}</text>`;
	body += `<text x="${cx}" y="158" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1d4ed8">L = ${opts.readingL}  |  C = ${opts.caliberC} ${opts.unit}  |  N = ${opts.scaleN}</text>`;
	return wrapPhysicsSvg(w, h, body);
}

interface ColorCodeBand {
	digit: number;
	nameAr: string;
	hex: string;
}

const COLOR_BANDS: ColorCodeBand[] = [
	{ digit: 0, nameAr: 'أسود', hex: '#0f172a' },
	{ digit: 1, nameAr: 'بني', hex: '#78350f' },
	{ digit: 2, nameAr: 'أحمر', hex: '#dc2626' },
	{ digit: 3, nameAr: 'برتقالي', hex: '#f97316' },
	{ digit: 4, nameAr: 'أصفر', hex: '#eab308' },
	{ digit: 5, nameAr: 'أخضر', hex: '#16a34a' },
	{ digit: 6, nameAr: 'أزرق', hex: '#2563eb' },
	{ digit: 7, nameAr: 'بنفسجي', hex: '#7c3aed' },
	{ digit: 8, nameAr: 'رمادي', hex: '#64748b' },
	{ digit: 9, nameAr: 'أبيض', hex: '#ffffff' }
];

function svgColorResistor(
	b1: ColorCodeBand,
	b2: ColorCodeBand,
	b3: ColorCodeBand,
	tol: { nameAr: string; hex: string; pct: string }
): string {
	const w = 360;
	const h = 165;
	let body = `<rect x="8" y="8" width="344" height="149" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>`;
	body += `<text x="180" y="28" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#0f172a">ناقل أومي ذو حلقات ملونة</text>`;
	body += `<line x1="36" y1="76" x2="324" y2="76" stroke="#64748b" stroke-width="4"/>`;
	body += `<rect x="88" y="52" width="184" height="48" rx="14" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>`;
	body += `<rect x="110" y="52" width="16" height="48" fill="${b1.hex}" stroke="#94a3b8" stroke-width="0.4"/>`;
	body += `<rect x="144" y="52" width="16" height="48" fill="${b2.hex}" stroke="#94a3b8" stroke-width="0.4"/>`;
	body += `<rect x="178" y="52" width="16" height="48" fill="${b3.hex}" stroke="#94a3b8" stroke-width="0.4"/>`;
	body += `<rect x="234" y="52" width="14" height="48" fill="${tol.hex}"/>`;
	body += `<text x="180" y="124" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">${b1.nameAr}  —  ${b2.nameAr}  —  ${b3.nameAr}  —  ${tol.nameAr}</text>`;
	body += `<text x="180" y="144" text-anchor="middle" font-size="10.5" fill="#475569">(من اليسار إلى اليمين)</text>`;
	return wrapPhysicsSvg(w, h, body);
}

function svgSonelgazCard(oldIdx: number, newIdx: number, consumedKwh: number): string {
	const w = 360;
	const h = 165;
	let body = `<rect x="8" y="8" width="344" height="149" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>`;
	body += `<text x="180" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="#854d0e">مقتطف من فاتورة الكهرباء (سونلغاز)</text>`;
	body += `<rect x="26" y="44" width="308" height="94" rx="8" fill="#ffffff" stroke="#eab308" stroke-width="1.2"/>`;
	body += `<text x="180" y="68" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الرقم القديم للعداد: ${oldIdx} kWh</text>`;
	body += `<text x="180" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الرقم الجديد للعداد: ${newIdx} kWh</text>`;
	body += `<text x="180" y="120" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#15803d">الاستهلاك الصافي = ${consumedKwh} kWh (أو ؟)</text>`;
	return wrapPhysicsSvg(w, h, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. السلسلة الطاقوية ومبدأ انحفاظ الطاقة والحصيلة الطاقوية
// ═══════════════════════════════════════════════════════════════════════════════
const energyChainBalanceTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_energy_chain_balance',
	grade: '3am',
	trimesterId: 't2',
	domain: 'energy',
	titleAr: 'السلسلة الطاقوية، مبدأ انحفاظ الطاقة، والحصيلة الطاقوية',
	curriculumLessonId: 'phy_lesson_3am_t2_energy_chain',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const setups = [
			{
				name: 'سقوط حجر لإشعال مصباح',
				blocks: [
					{ name: 'الحجر+الأرض', storage: 'Epp + Ec' },
					{ name: 'البكرة', storage: 'Ec' },
					{ name: 'المنوبة', storage: 'Ec' },
					{ name: 'المصباح', storage: 'Ei' }
				],
				transfers: ['W', 'W', 'We'],
				usefulTarget: 'المصباح'
			},
			{
				name: 'تغذية مروحة كهربائية ببطارية',
				blocks: [
					{ name: 'البطارية', storage: 'Ei' },
					{ name: 'المحرك', storage: 'Ec' },
					{ name: 'المروحة', storage: 'Ec' }
				],
				transfers: ['We', 'W'],
				usefulTarget: 'المروحة'
			},
			{
				name: 'شحن بطارية عبر لوح شمسي',
				blocks: [
					{ name: 'الشمس', storage: 'Ei' },
					{ name: 'اللوح الشمسي', storage: 'Ei' },
					{ name: 'البطارية', storage: 'Ei' }
				],
				transfers: ['Er', 'We'],
				usefulTarget: 'البطارية'
			}
		];

		const setup =
			difficulty === 'easy'
				? setups[1]
				: difficulty === 'medium'
					? setups[rng.int(0, 1)]
					: setups[rng.int(0, 2)];

		const eInit = rng.int(4, 10) * 100;
		const eGained = rng.int(2, 6) * 50;
		const eLost = rng.int(1, 3) * 50;
		const eFinal = eInit + eGained - eLost;

		const eInput = rng.int(3, 8) * 100;
		const eUseful = Math.round(eInput * rng.pick([0.6, 0.7, 0.75, 0.8]));
		const eWasteQ = eInput - eUseful;

		const svg = svgEnergyChainAndBalance({
			title: `السلسلة الطاقوية: ${setup.name}`,
			blocks: setup.blocks.map((b, idx) => ({
				name: b.name,
				storage: idx === setup.blocks.length - 1 ? '؟' : b.storage
			})),
			transfers: setup.transfers,
			showWasteQ: true
		});
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t2_ec_${difficulty}_s${cleanSeed}`, svg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			const mcq = buildUniqueMcqOptions(
				`${setup.blocks[setup.blocks.length - 1].storage} (التحويل الضائع هو $Q$)`,
				[
					{
						text: `${setup.blocks[0].storage === 'Ei' ? 'Epp' : 'Epe'} (التحويل الضائع هو $W_e$)`,
						diagnosticFeedback: 'راجع نمط التخزين في الجملة الأخيرة ونوع التحويل الضائع إلى المحيط.'
					},
					{
						text: `We (التحويل الضائع هو $E_r$)`,
						diagnosticFeedback: '$W_e$ نمط تحويل كهربائي وليس نمط تخزين، والضياع في المحيط حراري $Q$.'
					},
					{
						text: `Epe (التحويل الضائع هو $W$)`,
						diagnosticFeedback: '$E_{pe}$ تخص الأجسام المرنة مثل النابض المشدود.'
					}
				],
				rng
			);
			finalAnswer = setup.blocks[setup.blocks.length - 1].storage;
			quizQuestion = {
				type: 'mcq',
				questionText: `في السلسلة الطاقوية المرفقة لـ **${setup.name}**، ما نمط التخزين الناقص تحت الفقاعة الأخيرة (**${setup.usefulTarget}**) وما رمز التحويل غير المفيد الضائع إلى المحيط؟`,
				questionTextAr: `أكمل نمط التخزين في السلسلة الطاقوية لـ ${setup.name}:`,
				imageUrl,
				imageCaption: 'السلسلة الطاقوية المراد إكمالها',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `تحت فقاعة ${setup.usefulTarget} نكتب ${finalAnswer}، والتحويل الحراري غير المفيد نحو المحيط هو دوماً $Q$.`
			};
		} else {
			finalAnswer = `${eWasteQ} J`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في التركيبة الطاقوية الموضحة (**${setup.name}**)، تتلقى الجملة المستقبلة طاقة قدرها $E_{\\text{مكتسبة}} = ${eInput}\\text{ J}$ وتقدّم طاقة مفيدة قدرها $${eUseful}\\text{ J}$ دون أن يتغيّر مخزونها الداخلي.\n\nبتطبيق مبدأ انحفاظ الطاقة، ما مقدار الطاقة الحرارية غير المفيدة الضائعة $Q$ بالجول ($\\text{J}$)؟`,
				questionTextAr: `احسب الطاقة الحرارية الضائعة $Q$ علماً أن المكتسبة $${eInput}\\text{ J}$ والمفيدة $${eUseful}\\text{ J}$:`,
				imageUrl,
				imageCaption: 'السلسلة الطاقوية وتحويلاتها',
				questionData: {
					answer: eWasteQ,
					displayTemplate: 'Q = ? J',
					variables: [],
					tolerance: 0
				},
				explanation: `حسب انحفاظ الطاقة لجملة ثابتة المخزون: $E_{\\text{مكتسبة}} = E_{\\text{مفيدة}} + Q \\implies Q = ${eInput} - ${eUseful} = ${eWasteQ}\\text{ J}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `ندرس التركيبة التكنولوجية الموضحة في السلسلة الطاقوية غير المكتملة (${setup.name}):`,
				content: [
					{
						type: 'image',
						src: imageUrl,
						caption: 'السلسلة الطاقوية للتركيبة'
					},
					{
						type: 'text',
						content: `1) أكمل السلسلة الطاقوية بتحديد نمط التخزين الناقص تحت الفقاعة الأخيرة، ووضّح دلالة الرموز (${setup.transfers.join('، ')}) ورمز السهم المتقطع $Q$.`,
						answer: `1) نمط التخزين الناقص تحت (${setup.usefulTarget}) هو: $${setup.blocks[setup.blocks.length - 1].storage}$.\nالرموز: $W_e$ تحويل كهربائي، $W$ تحويل ميكانيكي، $E_r$ تحويل إشعاعي، و $Q$ تحويل حراري غير مفيد نحو المحيط.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `2) تتلقى جملة ثابتة المخزون طاقة مكتسبة قدرها $${eInput}$ جول، وتقدّم طاقة مفيدة قدرها $${eUseful}$ جول.\nأ) اكتب نص مبدأ انحفاظ الطاقة والعلاقة الرمزية له.\nب) احسب الطاقة الحرارية غير المفيدة $Q$ الضائعة في المحيط.`,
						answer: `2) أ) الطاقة لا تُستحدث ولا تزول، وإنما تتحوّل من شكل إلى آخر: $E_(\"نهائية\") = E_(\"ابتدائية\") + E_(\"مكتسبة\") - E_(\"مقدمة\")$.\nب) بما أن المخزون ثابت: $Q = ${eInput} - ${eUseful} = ${eWasteQ}$ جول.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) خزّان طاقة كانت طاقته الابتدائية $E_1 = ${eInit}$ جول، فاكتسب $E_(\"مكتسبة\") = ${eGained}$ جول وقدّم $E_(\"مقدمة\") = ${eLost}$ جول. احسب طاقته النهائية $E_2$، وصف اتجاه سهم العمود في الحصيلة الطاقوية للخزان.`,
						answer: `3) $E_2 = ${eInit} + ${eGained} - ${eLost} = ${eFinal}$ جول.\nبما أن $E_2 > E_1$ فإن الطاقة المخزنة تزايدت، لذا يُرسم داخل فقاعة الحصيلة الطاقوية عمود يتزايد بسهم صاعد نحو الأعلى.`,
						mark: '2'
					}
				]
			},
			hints: [
				'أنماط التخزين هي Ec, Epp, Epe, Ei وأنماط التحويل هي W, We, Q, Er.',
				'مبدأ انحفاظ الطاقة لجملة ثابتة المخزون يعطي: المكتسبة = المفيدة + الضائعة.',
				`لحساب $E_2$ طبق: $E_2 = E_1 + E_{\\text{مكتسبة}} - E_{\\text{مقدمة}}$.`
			],
			solutionStepsAr: [
				`نمط التخزين الأخير: $${setup.blocks[setup.blocks.length - 1].storage}$.`,
				`الطاقة الضائعة: $Q = ${eInput} - ${eUseful} = ${eWasteQ}\\text{ J}$.`,
				`الطاقة النهائية للخزان: $E_2 = ${eInit} + ${eGained} - ${eLost} = ${eFinal}\\text{ J}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. استطاعة التحويل الطاقوي وتحويل الوحدات (J, Wh, kWh)
// ═══════════════════════════════════════════════════════════════════════════════
const powerEnergyUnitsTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_power_energy_units',
	grade: '3am',
	trimesterId: 't2',
	domain: 'energy',
	titleAr: 'استطاعة التحويل الطاقوي (P = E / t) وتحويل الوحدات',
	curriculumLessonId: 'phy_lesson_3am_t2_power_energy_billing',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const appliances = [
			{ name: 'مكواة كهربائية', pW: 1500, hours: 2 },
			{ name: 'مجفف شعر', pW: 1200, hours: 0.5 },
			{ name: 'مسخن ماء كهربائي', pW: 2000, hours: 1.5 },
			{ name: 'مكيف هواء', pW: 1800, hours: 3 },
			{ name: 'غسالة ملابس', pW: 1000, hours: 2 }
		];
		const app = rng.pick(appliances);
		const pKW = roundTo(app.pW / 1000, 2);
		const eWh = roundTo(app.pW * app.hours, 2);
		const eKwh = roundTo(eWh / 1000, 3);
		const eJ = Math.round(eWh * 3600);
		const tSec = Math.round(app.hours * 3600);

		const pricePerKwh = rng.pick([4, 4.5, 5]);
		const days = rng.pick([10, 20, 30]);
		const monthlyKwh = roundTo(eKwh * days, 2);
		const monthlyCost = roundTo(monthlyKwh * pricePerKwh, 2);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${eWh} Wh`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تشتغل **${app.name}** تحمل الدلالة $${app.pW}\\text{ W}$ لمدة $t = ${app.hours}\\text{ h}$.\n\nاحسب الطاقة الكهربائية المستهلكة $E$ بوحدة الواط ساعي ($\\text{Wh}$).`,
				questionTextAr: `ما الطاقة المستهلكة لـ ${app.name} ($${app.pW}\\text{ W}$) خلال $${app.hours}\\text{ h}$ بوحدة $\\text{Wh}$؟`,
				questionData: {
					answer: eWh,
					displayTemplate: 'E = ? Wh',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نطبق العلاقة $E = P \\times t = ${app.pW} \\times ${app.hours} = ${eWh}\\text{ Wh}$.`
			};
		} else if (difficulty === 'medium') {
			const mcq = buildUniqueMcqOptions(
				`$${eKwh}\\text{ kWh}$ و $${eJ.toLocaleString('en-US')}\\text{ J}$`,
				[
					{
						text: `$${eWh}\\text{ kWh}$ و $${eWh * 60}\\text{ J}$`,
						diagnosticFeedback: 'لم تحوّل من الواط ساعي إلى الكيلوواط ساعي (÷ 1000)، و 1 ساعة = 3600 ثانية وليس 60!'
					},
					{
						text: `$${eKwh}\\text{ kWh}$ و $${eWh}\\text{ J}$`,
						diagnosticFeedback: 'الواط ساعي لا يساوي الجول؛ تذكّر أن $1\\text{ Wh} = 3600\\text{ J}$.'
					},
					{
						text: `$${roundTo(app.pW / app.hours, 1)}\\text{ kWh}$ و $${eJ}\\text{ J}$`,
						diagnosticFeedback: 'الطاقة هي الجداء $P \\times t$ وليس القسمة $P / t$.'
					}
				],
				rng
			);
			finalAnswer = `${eKwh} kWh = ${eJ} J`;
			quizQuestion = {
				type: 'mcq',
				questionText: `يُشغَّل **${app.name}** استطاعته $P = ${app.pW}\\text{ W}$ لمدة $t = ${app.hours}\\text{ h}$.\n\nما قيمة الطاقة المحوّلة بالكيلوواط ساعي ($\\text{kWh}$) وبالجول ($\\text{J}$)؟`,
				questionTextAr: `حوّل طاقة ${app.name} ($${app.pW}\\text{ W}$ لمدة $${app.hours}\\text{ h}$) إلى $\\text{kWh}$ و $\\text{J}$:`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$E = ${pKW}\\text{ kW} \\times ${app.hours}\\text{ h} = ${eKwh}\\text{ kWh} = ${eWh}\\text{ Wh} = ${eWh} \\times 3600 = ${eJ}\\text{ J}$.`
			};
		} else {
			finalAnswer = `${monthlyCost} DA`;
			quizQuestion = {
				type: 'calculated',
				questionText: `تشتغل **${app.name}** ($P = ${app.pW}\\text{ W}$) يومياً لمدة $${app.hours}\\text{ h}$ طوال $${days}$ يوماً. إذا كان سعر الكيلوواط ساعي الواحد هو $${pricePerKwh}\\text{ DA/kWh}$، فما تكلفة استهلاكها الإجمالية بالدينار الجزائري ($\\text{DA}$)؟`,
				questionTextAr: `احسب تكلفة تشغيل ${app.name} ($${app.pW}\\text{ W}$) لمدة $${app.hours}\\text{ h}$ يومياً طوال $${days}$ يوماً بسعر $${pricePerKwh}\\text{ DA/kWh}$:`,
				questionData: {
					answer: monthlyCost,
					displayTemplate: 'Cost = ? DA',
					variables: [],
					tolerance: 0.1
				},
				explanation: `يومياً: $E = ${pKW} \\times ${app.hours} = ${eKwh}\\text{ kWh}$. خلال $${days}$ يوماً: $${eKwh} \\times ${days} = ${monthlyKwh}\\text{ kWh}$. التكلفة: $${monthlyKwh} \\times ${pricePerKwh} = ${monthlyCost}\\text{ DA}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تحمل بطاقة بيانات *${app.name}* في منزل جزائري الدلالة $${app.pW}$ واط ($"W"$). يُشغّل هذا الجهاز يومياً لمدة $t = ${app.hours}$ ساعة.`,
				content: [
					{
						type: 'text',
						content: `1) ماذا تمثّل الدلالة $${app.pW}$ واط؟ اكتب العلاقة الرياضية التي تربط الاستطاعة $P$ والطاقة $E$ والزمن $t$.`,
						answer: `1) تمثل الدلالة *استطاعة التحويل الطاقوي* للجهاز (يحوّل $${app.pW}$ جول في كل ثانية).\nالعلاقة: $P = frac(E, t) arrow.l.r.double E = P times t$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) احسب الطاقة الكهربائية المستهلكة في اليوم الواحد بوحدة الواط ساعي ($"Wh"$)، ثم بالكيلوواط ساعي ($"kWh"$).`,
						answer: `2) $E = ${app.pW} times ${app.hours} = ${eWh}$ واط ساعي ($"Wh"$).\nوبالتحويل: $E = frac(${eWh}, 1000) = ${eKwh}$ كيلوواط ساعي ($"kWh"$).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) عبّر عن هذه الطاقة اليومية بوحدة الجول ($"J"$) في الجملة الدولية ($"SI"$).`,
						answer: `3) $t = ${app.hours} times 3600 = ${tSec}$ ثا، ومنه $E = ${app.pW} times ${tSec} = ${eJ}$ جول (أو مباشرة $${eWh} times 3600 = ${eJ}$ جول).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) احسب تكلفة تشغيل هذا الجهاز خلال $${days}$ يوماً علماً أن تسعيرة الكهرباء هي $${pricePerKwh}$ دج/$"kWh"$.`,
						answer: `4) الطاقة خلال $${days}$ يوماً: $E_("كلية") = ${eKwh} times ${days} = ${monthlyKwh}$ $"kWh"$.\nالتكلفة: $${monthlyKwh} times ${pricePerKwh} = ${monthlyCost}$ دج.`,
						mark: '1.5'
					}
				]
			},
			hints: [
				'طبّق العلاقة $E = P \\times t$ مع مراقبة تجانس الوحدات.',
				'تذكّر التحويلين الأساسيين: $1\\text{ kWh} = 1000\\text{ Wh}$ و $1\\text{ Wh} = 3600\\text{ J}$.',
				'لحساب التكلفة، اضرب الطاقة الإجمالية بالكيلوواط ساعي في سعر الكيلوواط ساعي الواحد.'
			],
			solutionStepsAr: [
				`الاستهلاك اليومي: $E = ${app.pW} \\times ${app.hours} = ${eWh}\\text{ Wh} = ${eKwh}\\text{ kWh}$.`,
				`بالجول: $E = ${eWh} \\times 3600 = ${eJ}\\text{ J}$.`,
				`خلال $${days}$ يوماً: $${monthlyKwh}\\text{ kWh}$ بتكلفة $${monthlyCost}\\text{ DA}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. التيار الكهربائي المستمر: القياس وقانونا الشدات والتوترات
// ═══════════════════════════════════════════════════════════════════════════════
const dcLawsMetersTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_dc_laws_meters',
	grade: '3am',
	trimesterId: 't2',
	domain: 'electricity',
	titleAr: 'قياس الشدة والتوتر وقانونا الشدات والتوترات في الدارة المستمرة',
	curriculumLessonId: 'phy_lesson_3am_t2_dc_current_voltage_laws',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const isParallel = difficulty !== 'easy' ? seed % 2 === 0 : false;
		const scaleN = 100;
		const caliberC = rng.pick([1, 2, 5]);
		const readingL = rng.pick([20, 30, 40, 50, 60, 70, 80]);
		const iMain = roundTo((readingL * caliberC) / scaleN, 2);

		const i1 = roundTo(iMain * rng.pick([0.4, 0.5, 0.6]), 2);
		const i2 = roundTo(iMain - i1, 2);

		const uGen = rng.pick([6, 9, 12]);
		const u1 = roundTo(uGen * rng.pick([0.3, 0.4, 0.5]), 1);
		const u2 = roundTo(uGen - u1, 1);

		const dialSvg = svgAnalogMeterDial({
			unit: 'A',
			readingL,
			scaleN,
			caliberC
		});
		const dialUrl = savePhysicsSvgAsset(`phy_3am_t2_dial_${difficulty}_s${cleanSeed}`, dialSvg);

		const circuitSvg = svgCircuitDiagram({
			kind: isParallel ? 'parallel' : 'series',
			labels: {
				e: `${uGen}V`,
				lamp1: 'L1',
				lamp2: 'L2',
				ammeter: true
			}
		});
		const circuitUrl = savePhysicsSvgAsset(
			`phy_3am_t2_ckt_${isParallel ? 'par' : 'ser'}_s${cleanSeed}`,
			circuitSvg
		);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${iMain} A`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نستعمل أمبيرمتراً ذا إبرة موصولاً على التسلسل لقراءة شدة التيار الرئيسي في الدارة. كما يظهر على الميناء المرفق: القراءة $L = ${readingL}$، السلم $N = ${scaleN}$، والعيار $C = ${caliberC}\\text{ A}$.\n\nاحسب شدة التيار الكهربائي $I$ بالأمبير ($\\text{A}$).`,
				questionTextAr: `احسب شدة التيار $I$ علماً أن $L=${readingL}$ و $N=${scaleN}$ و $C=${caliberC}\\text{ A}$:`,
				imageUrl: dialUrl,
				imageCaption: 'ميناء جهاز الأمبيرمتر',
				questionData: {
					answer: iMain,
					displayTemplate: 'I = ? A',
					variables: [],
					tolerance: 0.01
				},
				explanation: `نطبق العلاقة: $I = \\frac{L \\times C}{N} = \\frac{${readingL} \\times ${caliberC}}{${scaleN}} = ${iMain}\\text{ A}$.`
			};
		} else {
			const correctStr = isParallel
				? `$U_2 = ${uGen}\\text{ V}$ و $I_2 = ${i2}\\text{ A}$`
				: `$U_2 = ${u2}\\text{ V}$ و $I_2 = ${iMain}\\text{ A}$`;

			const mcq = buildUniqueMcqOptions(
				correctStr,
				[
					{
						text: isParallel
							? `$U_2 = ${u2}\\text{ V}$ و $I_2 = ${iMain}\\text{ A}$`
							: `$U_2 = ${uGen}\\text{ V}$ و $I_2 = ${i2}\\text{ A}$`,
						diagnosticFeedback: isParallel
							? 'طبّقت قوانين التسلسل على دارة التفرع! في التفرع التوتر متساوٍ والشدات تُجمع.'
							: 'طبّقت قوانين التفرع على دارة التسلسل! في التسلسل الشدة متساوية والتوترات تُجمع.'
					},
					{
						text: `$U_2 = ${uGen}\\text{ V}$ و $I_2 = ${roundTo(iMain + i1, 2)}\\text{ A}$`,
						diagnosticFeedback: 'الشدة في فرع لا يمكن أن تفوق الشدة الكلية!'
					},
					{
						text: `$U_2 = ${roundTo(uGen + u1, 1)}\\text{ V}$ و $I_2 = ${i1}\\text{ A}$`,
						diagnosticFeedback: 'التوتر في المصباح الثاني لا يفوق توتر المولد في الدارة البسيطة.'
					}
				],
				rng
			);
			finalAnswer = isParallel ? `U2=${uGen}V, I2=${i2}A` : `U2=${u2}V, I2=${iMain}A`;
			quizQuestion = {
				type: 'mcq',
				questionText: isParallel
					? `في دارة **الربط على التفرع** الممثلة في المخطط المقابل، توتر المولد $U = ${uGen}\\text{ V}$، الشدة الرئيسية $I = ${iMain}\\text{ A}$، والشدة في المصباح $L_1$ هي $I_1 = ${i1}\\text{ A}$.\n\nما توتر المصباح $L_2$ وشدة تياره $I_2$؟`
					: `في دارة **الربط على التسلسل** الممثلة في المخطط المقابل، توتر المولد $U = ${uGen}\\text{ V}$، شدة التيار التي يقيسها الأمبيرمتر $I = ${iMain}\\text{ A}$، والتوتر بين طرفي $L_1$ هو $U_1 = ${u1}\\text{ V}$.\n\nما توتر المصباح $L_2$ وشدة تياره $I_2$؟`,
				questionTextAr: `أوجد $U_2$ و $I_2$ في الدارة المرفقة:`,
				imageUrl: circuitUrl,
				imageCaption: isParallel ? 'دارة على التفرع' : 'دارة على التسلسل',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: isParallel
					? `في التفرع: $U_2 = U = ${uGen}\\text{ V}$، و $I_2 = I - I_1 = ${iMain} - ${i1} = ${i2}\\text{ A}$.`
					: `في التسلسل: $I_2 = I = ${iMain}\\text{ A}$، و $U_2 = U - U_1 = ${uGen} - ${u1} = ${u2}\\text{ V}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أنجز فوج من التلاميذ الدارة الكهربائية الموضحة في الشكل باستعمال مولد تيار مستمر توتره $U = ${uGen}$ فولط ومصباحين $L_1$ و $L_2$ وأمبيرمتر ذي إبرة:`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{
								type: 'image',
								src: circuitUrl,
								caption: isParallel ? 'مخطط الدارة (ربط على التفرع)' : 'مخطط الدارة (ربط على التسلسل)'
							},
							{
								type: 'image',
								src: dialUrl,
								caption: 'قراءة جهاز الأمبيرمتر'
							}
						]
					},
					{
						type: 'text',
						content: `1) كيف يُربط كل من الأمبيرمتر والفولطمتر في الدارة؟ وحدّد الجهة الاصطلاحية للتيار المستمر خارج المولد.`,
						answer: `1) يُربط الأمبيرمتر *على التسلسل* والفولطمتر *على التفرع*.\nالجهة الاصطلاحية للتيار المستمر خارج المولد هي *من القطب الموجب ($+$) إلى القطب السالب ($-$)*.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) انطلاقاً من ميناء الأمبيرمتر ($L = ${readingL}$، $N = ${scaleN}$، $C = ${caliberC}$ أمبير)، احسب شدة التيار الرئيسية $I$ بالأمبير ثم بالميلي أمبير.`,
						answer: `2) $I = frac(L times C, N) = frac(${readingL} times ${caliberC}, ${scaleN}) = ${iMain}$ أمبير $= ${Math.round(iMain * 1000)}$ ميلي أمبير.`,
						mark: '2'
					},
					{
						type: 'text',
						content: isParallel
							? `3) إذا كانت شدة التيار المارة في المصباح $L_1$ هي $I_1 = ${i1}$ أمبير، فاحسب شدة التيار $I_2$ المارة في $L_2$ والتوتر $U_2$ بين طرفيه مع ذكر القوانين المطبقة.`
							: `3) إذا كان التوتر بين طرفي المصباح $L_1$ هو $U_1 = ${u1}$ فولط، فاحسب التوتر $U_2$ بين طرفي $L_2$ وشدة التيار $I_2$ المارة فيه مع ذكر القوانين المطبقة.`,
						answer: isParallel
							? `3) نوع الربط على التفرع:\n- قانون الشدات: $I = I_1 + I_2 arrow.r.double I_2 = ${iMain} - ${i1} = ${i2}$ أمبير.\n- قانون التوترات: $U = U_1 = U_2 = ${uGen}$ فولط.`
							: `3) نوع الربط على التسلسل:\n- قانون الشدات: $I = I_1 = I_2 = ${iMain}$ أمبير.\n- قانون التوترات: $U = U_1 + U_2 arrow.r.double U_2 = ${uGen} - ${u1} = ${u2}$ فولط.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'شدة التيار بالميناء: $I = \\frac{L \\times C}{N}$.',
				isParallel
					? 'في التفرع: الشدات تُجمع ($I = I_1 + I_2$) والتوتر متساوٍ ($U = U_1 = U_2$).'
					: 'في التسلسل: الشدة متساوية ($I = I_1 = I_2$) والتوترات تُجمع ($U = U_1 + U_2$).',
				'الأمبيرمتر على التسلسل والفولطمتر على التفرع.'
			],
			solutionStepsAr: [
				`الشدة الرئيسية: $I = \\frac{${readingL} \\times ${caliberC}}{${scaleN}} = ${iMain}\\text{ A}$.`,
				isParallel
					? `في التفرع: $I_2 = ${iMain} - ${i1} = ${i2}\\text{ A}$ و $U_2 = ${uGen}\\text{ V}$.`
					: `في التسلسل: $I_2 = ${iMain}\\text{ A}$ و $U_2 = ${uGen} - ${u1} = ${u2}\\text{ V}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. المقاومة الكهربائية: شفرة الألوان والأومتر
// ═══════════════════════════════════════════════════════════════════════════════
const resistorColorCodeTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_resistor_color_code',
	grade: '3am',
	trimesterId: 't2',
	domain: 'electricity',
	titleAr: 'المقاومة الكهربائية: القراءة بشفرات الألوان والأومتر',
	curriculumLessonId: 'phy_lesson_3am_t2_resistance_measurement',
	defaultPoints: 6,
	isExperimental: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const b1 = COLOR_BANDS[rng.int(1, 7)];
		const b2 = COLOR_BANDS[rng.int(0, 8)];
		const multIdx = difficulty === 'easy' ? rng.int(0, 2) : rng.int(1, 3);
		const b3 = COLOR_BANDS[multIdx];
		const tol = seed % 2 === 0
			? { nameAr: 'ذهبي', hex: '#eab308', pct: '±5%' }
			: { nameAr: 'فضي', hex: '#94a3b8', pct: '±10%' };

		const baseDigits = b1.digit * 10 + b2.digit;
		const resistanceOhm = baseDigits * Math.pow(10, b3.digit);
		const resistanceKOhm = roundTo(resistanceOhm / 1000, 3);

		const svg = svgColorResistor(b1, b2, b3, tol);
		const imageUrl = savePhysicsSvgAsset(`phy_3am_t2_res_${difficulty}_s${cleanSeed}`, svg);

		const wrongConcat = Number(`${b1.digit}${b2.digit}${b3.digit}`);
		const wrongOneZeroMore = resistanceOhm * 10;
		const wrongSwapped = (b2.digit * 10 + b1.digit) * Math.pow(10, b3.digit);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${resistanceOhm} Ω`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نقرأ ألوان الناقل الأومي الموضح في الشكل من اليسار إلى اليمين: **${b1.nameAr} (${b1.digit}) – ${b2.nameAr} (${b2.digit}) – ${b3.nameAr} (${b3.digit}) – ${tol.nameAr}**.\n\nما قيمة مقاومته الكهربائية $R$ بالأوم ($\\Omega$)؟`,
				questionTextAr: `احسب قيمة المقاومة بالأوم للناقل الأومي ذي الألوان (${b1.nameAr}، ${b2.nameAr}، ${b3.nameAr}):`,
				imageUrl,
				imageCaption: 'ناقل أومي بشفرات الألوان',
				questionData: {
					answer: resistanceOhm,
					displayTemplate: 'R = ? Ω',
					variables: [],
					tolerance: 0
				},
				explanation: `الحلقة 1 (${b1.digit}) والحلقة 2 (${b2.digit}) تعطيان $${baseDigits}$، والحلقة 3 (${b3.nameAr} = ${b3.digit}) تعني إضافة ${b3.digit} أصفار ($\\times 10^{${b3.digit}}$): $R = ${baseDigits} \\times 10^{${b3.digit}} = ${resistanceOhm}\\,\\Omega$.`
			};
		} else {
			const mcq = buildUniqueMcqOptions(
				`$${resistanceOhm}\\,\\Omega$ (${resistanceKOhm}\\text{ k}\\Omega) ${tol.pct}`,
				[
					{
						text: `$${wrongConcat}\\,\\Omega$ ${tol.pct}`,
						diagnosticFeedback: 'الحلقة الثالثة تمثل عدد الأصفار (المضاعف $10^n$) وليس رقماً يُلصق بجانب الرقمين!'
					},
					{
						text: `$${wrongOneZeroMore}\\,\\Omega$ ${tol.pct}`,
						diagnosticFeedback: `تحقق من قيمة المضاعف للون ${b3.nameAr} (${b3.digit} أصفار أي $\\times 10^{${b3.digit}}$).`
					},
					{
						text: `$${wrongSwapped}\\,\\Omega$ ${tol.pct === '±5%' ? '±10%' : '±5%'}`,
						diagnosticFeedback: 'عكست ترتيب الحلقتين الأولى والثانية أو قيمة حلقة الدقة!'
					}
				],
				rng
			);
			finalAnswer = `${resistanceOhm} Ω (${tol.pct})`;
			quizQuestion = {
				type: 'mcq',
				questionText: `باستعمال جدول شفرات الألوان، ما قيمة المقاومة الكهربائية ودقتها للناقل الأومي الموضح في الشكل: **${b1.nameAr} – ${b2.nameAr} – ${b3.nameAr} – ${tol.nameAr}**؟`,
				questionTextAr: `ما قيمة المقاومة ودقتها (${b1.nameAr} – ${b2.nameAr} – ${b3.nameAr} – ${tol.nameAr})؟`,
				imageUrl,
				imageCaption: 'ناقل أومي ملون',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${b1.nameAr} (${b1.digit})، ${b2.nameAr} (${b2.digit}) $\\leftarrow ${baseDigits}$، ${b3.nameAr} ($\\times 10^{${b3.digit}}$) $\\leftarrow ${resistanceOhm}\\,\\Omega = ${resistanceKOhm}\\text{ k}\\Omega$، و${tol.nameAr} يعطي دقة $${tol.pct}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `عثر تلميذ في بطاقة إلكترونية قديمة على ناقل أومي يحمل الحلقات الملونة التالية من اليسار إلى اليمين: (${b1.nameAr} – ${b2.nameAr} – ${b3.nameAr} – ${tol.nameAr}).`,
				content: [
					{
						type: 'columns',
						widths: ['1.4fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `1) اذكر دور الناقل الأومي عند إدراجه على التسلسل في دارة كهربائية بسيطة تحتوي على مصباح ومولد.\n\n2) باستعمال شفرة الألوان، احسب قيمة هذه المقاومة بالأوم ($Omega$) ثم بالكيلوأوم ($"k"Omega$) وحدّد نسبة الدقة.`,
								answer: `1) يعيق الناقل الأومي مرور التيار الكهربائي فيقلّل من شدته ويحمي المصباح أو العناصر الإلكترونية من التلف.\n\n2) ${b1.nameAr} ($${b1.digit}$)، ${b2.nameAr} ($${b2.digit}$)، ${b3.nameAr} ($times 10^${b3.digit}$):\n$R = ${baseDigits} times 10^${b3.digit} = ${resistanceOhm} Omega = ${resistanceKOhm}$ $"k"Omega$، والدقة (${tol.nameAr}): ${tol.pct}.`,
								mark: '3.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'الناقل الأومي المدروس'
							}
						]
					},
					{
						type: 'text',
						content: `3) للتحقق من هذه القيمة تجريبياً، أراد التلميذ استعمال جهاز متعدد القياسات مضبوط على وضعية الأومتر ($Omega$). ما الاحتياط الأساسي الذي يجب التقيد به أثناء القياس؟\n\n4) إذا استبدلنا هذا الناقل الأومي بآخر قيمته أصغر بكثير، كيف تتغيّر شدة التيار وإضاءة المصباح؟`,
						answer: `3) يجب *فصل الناقل الأومي كلياً عن الدارة الكهربائية* (عدم وصله بالمولد) قبل قياسه بالأومتر.\n\n4) كلما صغرت المقاومة قلت الإعاقة، فـ *تزداد* شدة التيار وتقوى إضاءة المصباح.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'الترتيب: أسود 0، بني 1، أحمر 2، برتقالي 3، أصفر 4، أخضر 5، أزرق 6، بنفسجي 7، رمادي 8، أبيض 9.',
				'الحلقة الثالثة تعني عدد الأصفار المضافة (× 10^n).',
				'الحلقة الرابعة: ذهبي ±5%، فضي ±10%.'
			],
			solutionStepsAr: [
				`الرقمان الأولان: $${b1.digit}$ و $${b2.digit}$ يعطيان $${baseDigits}$.`,
				`المضاعف ${b3.nameAr}: $\\times 10^{${b3.digit}}$ أي $R = ${resistanceOhm}\\,\\Omega = ${resistanceKOhm}\\text{ k}\\Omega$.`,
				`الدقة (${tol.nameAr}): $${tol.pct}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. وضعية إدماجية 1: فاتورة الكهرباء (سونلغاز) والطاقات المنزلية
// ═══════════════════════════════════════════════════════════════════════════════
const integrationSonelgazTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_integration_sonelgaz',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: قراءة فاتورة الكهرباء (سونلغاز) وترشيد الاستهلاك',
	curriculumLessonId: 'phy_lesson_3am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const oldIdx = rng.int(120, 240) * 100;
		const tranche1Limit = 125;
		const consumedKwh = difficulty === 'easy' ? rng.int(2, 4) * 50 : rng.int(22, 48) * 10;
		const newIdx = oldIdx + consumedKwh;

		const rate1 = 1.8;
		const rate2 = 4.2;
		const costT1 = roundTo(Math.min(consumedKwh, tranche1Limit) * rate1, 2);
		const remKwh = Math.max(0, consumedKwh - tranche1Limit);
		const costT2 = roundTo(remKwh * rate2, 2);
		const totalEnergyCost = roundTo(costT1 + costT2, 2);

		// Household appliance comparison: incandescent lamps vs LED
		const lampCount = rng.int(4, 8);
		const pOldLamp = 75;
		const pLedLamp = 10;
		const dailyHours = rng.pick([4, 5]);
		const days = 90; // trimester
		const oldLampsKwh = roundTo((lampCount * pOldLamp * dailyHours * days) / 1000, 2);
		const ledLampsKwh = roundTo((lampCount * pLedLamp * dailyHours * days) / 1000, 2);
		const savedKwh = roundTo(oldLampsKwh - ledLampsKwh, 2);

		const svg = svgSonelgazCard(oldIdx, newIdx, consumedKwh);
		const imageUrl = savePhysicsSvgAsset(
			`phy_3am_t2_int_sonelgaz_${difficulty}_s${cleanSeed}`,
			svg
		);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${consumedKwh} kWh`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في فاتورة الكهرباء المرفقة لثلاثي كامل، سجّل العداد الرقم القديم $${oldIdx}\\text{ kWh}$ والرقم الجديد $${newIdx}\\text{ kWh}$.\n\nاحسب الطاقة الكهربائية المستهلكة خلال هذا الثلاثي بوحدة الكيلوواط ساعي ($\\text{kWh}$).`,
				questionTextAr: `احسب الاستهلاك الكهربائي بالفرق بين الرقم الجديد $${newIdx}$ والقديم $${oldIdx}$:`,
				imageUrl,
				imageCaption: 'مقتطف عداد سونلغاز',
				questionData: {
					answer: consumedKwh,
					displayTemplate: 'E = ? kWh',
					variables: [],
					tolerance: 0
				},
				explanation: `الطاقة المستهلكة = الرقم الجديد $-$ الرقم القديم $= ${newIdx} - ${oldIdx} = ${consumedKwh}\\text{ kWh}$.`
			};
		} else {
			finalAnswer = `${totalEnergyCost} DA`;
			quizQuestion = {
				type: 'calculated',
				questionText: `استهلكت عائلة خلال الثلاثي كمية كهرباء $E = ${consumedKwh}\\text{ kWh}$ (من المؤشر $${oldIdx}$ إلى $${newIdx}$). تُحسَب التسعيرة على شطرين:\n- الشطر الأول (حتى $${tranche1Limit}\\text{ kWh}$): $${rate1}\\text{ DA/kWh}$\n- الشطر الثاني (ما فاق $${tranche1Limit}\\text{ kWh}$): $${rate2}\\text{ DA/kWh}$\n\nاحسب مبلغ استهلاك الكهرباء الإجمالي بالدينار الجزائري ($\\text{DA}$).`,
				questionTextAr: `احسب مبلغ استهلاك $${consumedKwh}\\text{ kWh}$ حسب نظام الشطرين ($${rate1}$ ثم $${rate2}\\text{ DA/kWh}$):`,
				imageUrl,
				imageCaption: 'مقتطف فاتورة سونلغاز',
				questionData: {
					answer: totalEnergyCost,
					displayTemplate: 'المبلغ = ? DA',
					variables: [],
					tolerance: 0.5
				},
				explanation: `الشطر الأول: $${tranche1Limit} \\times ${rate1} = ${costT1}\\text{ DA}$. المتبقي للشطر الثاني: $${consumedKwh} - ${tranche1Limit} = ${remKwh}\\text{ kWh}$، ومبلغه $${remKwh} \\times ${rate2} = ${costT2}\\text{ DA}$. المجموع $= ${totalEnergyCost}\\text{ DA}$.`
			};
		}

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `تفاجأ ربّ أسرة جزائرية بارتفاع مبلغ فاتورة الكهرباء للثلاثي الأخير، فاستعان بابنته التي تدرس السنة الثالثة متوسط لتحليل الفاتورة وترشيد استهلاك الطاقة في المنزل.`,
				content: [
					{
						type: 'columns',
						widths: ['1.45fr', '1fr'],
						children: [
							{
								type: 'text',
								content: `الجزء الأول (قراءة الفاتورة وحساب التكلفة):\n\n1) انطلاقاً من مقتطف العداد، احسب الطاقة الكهربائية المستهلكة $E$ بوحدة $"kWh"$ ثم عبّر عنها بالجول ($"J"$).\n\n2) احسب تكلفة هذا الاستهلاك علماً أن الشطر الأول (حتى $${tranche1Limit}$ $"kWh"$) يُسعّر بـ $${rate1}$ دج/$"kWh"$ والشطر الثاني (ما فاق ذلك) يُسعّر بـ $${rate2}$ دج/$"kWh"$.`,
								answer: `1) الطاقة المستهلكة: $E = ${newIdx} - ${oldIdx} = ${consumedKwh}$ $"kWh"$.\nبالجول: $E = ${consumedKwh} times 3.6 times 10^6 = ${roundTo(consumedKwh * 3.6, 2)} times 10^6$ جول.\n\n2) الشطر الأول: $${tranche1Limit} times ${rate1} = ${costT1}$ دج.\nالشطر الثاني ($${consumedKwh} - ${tranche1Limit} = ${remKwh}$ $"kWh"$): $${remKwh} times ${rate2} = ${costT2}$ دج.\nالمبلغ الإجمالي: $${costT1} + ${costT2} = ${totalEnergyCost}$ دج.`,
								mark: '3.5'
							},
							{
								type: 'image',
								src: imageUrl,
								caption: 'سند: مؤشر عداد الكهرباء'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الثاني (التحولات الطاقوية والترشيد):\n\n3) يحتوي المنزل على $${lampCount}$ مصابيح متوهجة قديمة استطاعة كل منها $${pOldLamp}$ واط تشتغل $${dailyHours}$ ساعات يومياً خلال $${days}$ يوماً. احسب الطاقة التي تستهلكها هذه المصابيح وحدها، ثم قارنها باستهلاك $${lampCount}$ مصابيح اقتصادية $"LED"$ استطاعة كل منها $${pLedLamp}$ واط. كم توفر الأسرة من $"kWh"$؟\n\n4) أنشئ السلسلة الطاقوية لمصباح مشتعل يغذيـه مأخذ الشبكة (` +
							`الشبكة ← المصباح` +
							`) مع إبراز التحويل المفيد وغير المفيد، واقترح سلوكين إضافيين لترشيد الطاقة.`,
						answer: `3) استهلاك المصابيح المتوهجة: $E_1 = frac(${lampCount} times ${pOldLamp} times ${dailyHours} times ${days}, 1000) = ${oldLampsKwh}$ $"kWh"$.\nاستهلاك مصابيح $"LED"$: $E_2 = frac(${lampCount} times ${pLedLamp} times ${dailyHours} times ${days}, 1000) = ${ledLampsKwh}$ $"kWh"$.\nالطاقة الموفّرة: $Delta E = ${oldLampsKwh} - ${ledLampsKwh} = ${savedKwh}$ $"kWh"$.\n\n4) السلسلة الطاقوية: الشبكة ($E_i$) $arrow.r^(W_e)$ المصباح ($E_i$) $arrow.r^(E_r " (مفيد)" + Q " (غير مفيد)")$ الغرفة/المحيط.\nسلوكان إضافيان: إطفاء الأجهزة كلياً بدل تركها في وضع الاستعداد، واستغلال الإنارة الطبيعية نهاراً.`,
						mark: '4.5'
					}
				]
			},
			hints: [
				'الاستهلاك = الرقم الجديد - الرقم القديم.',
				`في التسعيرة ذات الشطرين، لا تضرب الكل في ${rate2}؛ احسب الـ ${tranche1Limit} kWh الأولى بالسعر ${rate1} والباقي بالسعر ${rate2}.`,
				'المصباح يحوّل الطاقة الكهربائية إلى إشعاع مفيد (Er) وحرارة غير مفيدة (Q).'
			],
			solutionStepsAr: [
				`الاستهلاك: $E = ${newIdx} - ${oldIdx} = ${consumedKwh}\\text{ kWh}$.`,
				`التكلفة: $(${tranche1Limit} \\times ${rate1}) + (${remKwh} \\times ${rate2}) = ${totalEnergyCost}\\text{ DA}$.`,
				`توفير مصابيح LED خلال ${days} يوماً: $${oldLampsKwh} - ${ledLampsKwh} = ${savedKwh}\\text{ kWh}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. وضعية إدماجية 2: دارة إنارة وتبريد لمركب علمي (الدارة المستمرة + الطاقة)
// ═══════════════════════════════════════════════════════════════════════════════
const integrationDcEnergyTemplate: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_3am_t2_integration_dc_energy',
	grade: '3am',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وضعية إدماجية: تصميم دارة مستمرة محمية بمقاومة وحصيلتها الطاقوية',
	curriculumLessonId: 'phy_lesson_3am_t2_integration',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const uGen = rng.pick([6, 9, 12]);
		const i1 = rng.pick([0.2, 0.3, 0.4]);
		const i2 = rng.pick([0.25, 0.35, 0.5]);
		const iTot = roundTo(i1 + i2, 2);

		const b1 = COLOR_BANDS[rng.int(1, 4)];
		const b2 = COLOR_BANDS[rng.int(0, 6)];
		const b3 = COLOR_BANDS[1]; // ×10^1
		const resVal = (b1.digit * 10 + b2.digit) * 10;

		const tMin = rng.pick([10, 15, 20]);
		const pCircuit = roundTo(uGen * iTot, 2);
		const eJ = Math.round(pCircuit * tMin * 60);

		const circuitSvg = svgCircuitDiagram({
			kind: 'parallel',
			labels: {
				e: `${uGen}V`,
				lamp1: 'L1',
				lamp2: 'مروحة/L2',
				ammeter: true
			}
		});
		const circuitUrl = savePhysicsSvgAsset(
			`phy_3am_t2_int_ckt_${difficulty}_s${cleanSeed}`,
			circuitSvg
		);

		const resSvg = svgColorResistor(b1, b2, b3, {
			nameAr: 'ذهبي',
			hex: '#eab308',
			pct: '±5%'
		});
		const resUrl = savePhysicsSvgAsset(`phy_3am_t2_int_res_${difficulty}_s${cleanSeed}`, resSvg);

		const mcq = buildUniqueMcqOptions(
			`الربط على التفرع لأن التوتر متساوٍ ($${uGen}\\text{ V}$)، والشدة الرئيسية $I = ${iTot}\\text{ A}$، والمقاومة $R = ${resVal}\\,\\Omega$`,
			[
				{
					text: `الربط على التسلسل والشدة الرئيسية $I = ${i1}\\text{ A}$ والمقاومة $R = ${b1.digit}${b2.digit}1\\,\\Omega$`,
					diagnosticFeedback: 'في التسلسل تنطفئ الدارة كلها عند عطل فرع، والحلقة الثالثة تعني عدد الأصفار.'
				},
				{
					text: `الربط على التفرع والشدة الرئيسية $I = ${roundTo(Math.abs(i2 - i1), 2)}\\text{ A}$ والمقاومة $R = ${resVal}\\,\\Omega$`,
					diagnosticFeedback: 'في التفرع نجمع شدات الفروع ($I = I_1 + I_2$) ولا نطرحها!'
				},
				{
					text: `الربط على التفرع والتوتر يتقسم إلى $${uGen / 2}\\text{ V}$ لكل فرع`,
					diagnosticFeedback: 'في الربط على التفرع التوتر متساوٍ في جميع الفروع ($U = U_1 = U_2$).'
				}
			],
			rng
		);

		return {
			templateId: this.id,
			seed,
			grade: '3am',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في نموذج لخيمة مخيم علمي، ربطنا مصباحاً $L_1$ ($I_1 = ${i1}\\text{ A}$) ومروحة/مصباحاً ثانياً $L_2$ ($I_2 = ${i2}\\text{ A}$) ببطارية توترها $${uGen}\\text{ V}$ كما في المخطط، ولدينا مقاومة حماية ألوانها (**${b1.nameAr} – ${b2.nameAr} – ${b3.nameAr} – ذهبي**).\n\nما نوع الربط وما الشدة الرئيسية $I$ وما قيمة المقاومة $R$؟`,
				questionTextAr: `تحديد نوع الربط والشدة الرئيسية وقيمة المقاومة (${b1.nameAr}–${b2.nameAr}–${b3.nameAr}):`,
				imageUrl: circuitUrl,
				imageCaption: 'مخطط الدارة المستمرة للخيمة',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الربط على التفرع يضمن استقلالية الفروع وتساوي التوتر ($${uGen}\\text{ V}$). الشدة الرئيسية $I = ${i1} + ${i2} = ${iTot}\\text{ A}$. المقاومة: ${b1.digit}${b2.digit} $\\times 10^1 = ${resVal}\\,\\Omega$.`
			},
			sujetExercise: {
				customTitle: 'الوضعية الإدماجية',
				points: 8,
				instruction: `أراد تلاميذ النادي العلمي تزويد مجسّم لخيمة ذكية بالإنارة والتهوية بواسطة بطارية تيار مستمر توترها $U = ${uGen}$ فولط، حيث يستهلك فرع المصباح $L_1$ شدة $I_1 = ${i1}$ أمبير وفرع المروحة $L_2$ شدة $I_2 = ${i2}$ أمبير، ومعهم مقاومة حماية موضحة في السند 2.`,
				content: [
					{
						type: 'columns',
						widths: ['1fr', '1fr'],
						children: [
							{
								type: 'image',
								src: circuitUrl,
								caption: 'سند 1: مخطط الدارة الكهربائية'
							},
							{
								type: 'image',
								src: resUrl,
								caption: 'سند 2: مقاومة الحماية'
							}
						]
					},
					{
						type: 'text',
						content: `الجزء الأول (قوانين التيار المستمر والمقاومة):\n\n1) ما نوع الربط المعتمد في السند 1؟ وما فائدته العملية في الإنارة؟\n\n2) احسب التوتر بين طرفي كل فرع والشدة الكلية $I$ التي يقيسها الأمبيرمتر الرئيسي.\n\n3) اقرأ قيمة مقاومة الحماية في السند 2 (${b1.nameAr} – ${b2.nameAr} – ${b3.nameAr} – ذهبي) ودقتها، وهل يجوز قياسها بالأومتر وهي موصولة داخل الدارة المغلقة؟ علّل.`,
						answer: `1) الربط على *التفرع*؛ وفائدته أن يتغذى كل جهاز بتوتر البطارية كاملاً وبشكل مستقل (إذا تلف أحدهما لا ينطفئ الآخر).\n\n2) في التفرع: التوتر $U_1 = U_2 = U = ${uGen}$ فولط.\nالشدة الكلية: $I = I_1 + I_2 = ${i1} + ${i2} = ${iTot}$ أمبير.\n\n3) قيمة المقاومة: ${b1.nameAr} ($${b1.digit}$)، ${b2.nameAr} ($${b2.digit}$)، ${b3.nameAr} ($times 10^1$) $arrow.r R = ${resVal} Omega$ بدقة $plus.minus 5%$.\nلا يجوز قياسها بالأومتر وهي داخل الدارة المغلقة لتفادي إتلاف الأومتر وتشوّه القياس؛ يجب فصلها تماماً عن البطارية.`,
						mark: '5'
					},
					{
						type: 'text',
						content: `الجزء الثاني (السلسلة والحصيلة الطاقوية):\n\n4) ارسم السلسلة الطاقوية لتشغيل المروحة بالبطارية (` +
							`البطارية ← المحرك ← المروحة` +
							`)، ومثّل الحصيلة الطاقوية لجملة *البطارية* أثناء اشتغال الدارة لمدة $${tMin}$ دقيقة (تتناقص طاقتها بمقدار $${eJ}$ جول، منها طاقة مفيدة وضائعة).`,
						answer: `4) السلسلة الطاقوية:\nالبطارية ($E_i$) $arrow.r^(W_e)$ المحرك ($E_c$) $arrow.r^(W)$ المروحة ($E_c$)، مع أسهم متقطعة $Q$ نحو المحيط.\nالحصيلة الطاقوية للبطارية: فقاعة بداخلها عمود $E_i$ يتناقص بسهم نازل، وسهم خارج من الفقاعة يحمل التحويل $W_e$ (و $Q$).`,
						mark: '3'
					}
				]
			},
			hints: [
				'في التفرع: U ثابتة و I = I₁ + I₂.',
				`استعمل شفرة الألوان: ${b1.nameAr}=${b1.digit}، ${b2.nameAr}=${b2.digit}، ${b3.nameAr}=×10^1.`,
				'طاقة البطارية الداخلية Ei تتناقص أثناء التفرغ (سهم نازل في عمود الحصيلة الطاقوية).'
			],
			solutionStepsAr: [
				`الربط على التفرع: $U_1 = U_2 = ${uGen}\\text{ V}$ و $I = ${i1} + ${i2} = ${iTot}\\text{ A}$.`,
				`المقاومة: $R = ${resVal}\\,\\Omega \\pm 5\\%$.`,
				'السلسلة الطاقوية: البطارية ($E_i$) $\\xrightarrow{W_e}$ المحرك ($E_c$) $\\xrightarrow{W}$ المروحة ($E_c$).'
			],
			finalAnswer: `I = ${iTot} A, R = ${resVal} Ω`
		};
	}
};

export const PHYSICS_TEMPLATES_3AM_T2: PhysicsParameterizedTemplate[] = [
	energyChainBalanceTemplate,
	powerEnergyUnitsTemplate,
	dcLawsMetersTemplate,
	resistorColorCodeTemplate,
	integrationSonelgazTemplate,
	integrationDcEnergyTemplate
];
